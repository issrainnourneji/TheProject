package com.muntu.muntu.Services.Impl;

import com.muntu.muntu.Dto.LoginRequest;
import com.muntu.muntu.Dto.Response;
import com.muntu.muntu.Dto.UserDto;
import com.muntu.muntu.Entity.EmailVerif.EmailTemplateName;
import com.muntu.muntu.Entity.EmailVerif.Token;
import com.muntu.muntu.Entity.Simulation.ProspectSelection;
import com.muntu.muntu.Entity.User;
import com.muntu.muntu.Enums.UserRole;
import com.muntu.muntu.Exception.InvalidCredentialsException;
import com.muntu.muntu.Exception.NotFoundException;
import com.muntu.muntu.Mapper.EntityDtoMapper;
import com.muntu.muntu.Repository.TokenRepository;
import com.muntu.muntu.Repository.UserRepository;
import com.muntu.muntu.Security.JwtUtils;
import com.muntu.muntu.Services.Interf.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EntityDtoMapper entityDtoMapper;
    private final EmailServiceImpl emailService;
    private final TokenRepository tokenRepository;

    private String activationUrl = "http://localhost:4200/activate-account";


    @Override
    public Response registerUser(UserDto registrationRequest) {
        UserRole role = UserRole.USER;

        if (registrationRequest.getRole() != null && registrationRequest.getRole().equalsIgnoreCase("admin")) {
            role = UserRole.ADMIN;
        }

        User user = User.builder()
                .name(registrationRequest.getName())
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .phoneNumber(registrationRequest.getPhoneNumber())
                .address(registrationRequest.getAddress())
                .accountLocked(false)
                .enabled(false)
                .role(role)
                .build();

        User savedUser = userRepo.save(user);
        System.out.println(savedUser);

        try {
            sendValidationEmail(savedUser);
        } catch (MessagingException e) {
            log.error("Failed to send validation email", e);
        }

        UserDto userDto = entityDtoMapper.mapUserToDtoBasic(savedUser);
        return Response.builder()
                .status(200)
                .message("User Successfully Added")
                .user(userDto)
                .build();
    }

    public Response registerAgent(UserDto registrationRequest) {
        // Validation des données d'entrée
        if (registrationRequest == null) {
            return Response.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("Registration request cannot be null")
                    .build();
        }

        if (registrationRequest.getEmail() == null || registrationRequest.getPassword() == null) {
            return Response.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("Email and password are required")
                    .build();
        }

        User user = User.builder()
                .name(registrationRequest.getName())
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .phoneNumber(registrationRequest.getPhoneNumber())
                .address(registrationRequest.getAddress())
                .accountLocked(false)
                .enabled(true)
                .role(UserRole.AGENT)
                .build();

        try {
            User savedUser = userRepo.save(user);
            sendValidationEmail(savedUser);

            UserDto userDto = entityDtoMapper.mapUserToDtoBasic(savedUser);
            return Response.builder()
                    .status(HttpStatus.OK.value())
                    .message("Agent successfully registered")
                    .user(userDto)
                    .build();
        } catch (MessagingException e) {
            log.error("Failed to send validation email", e);
            return Response.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("Failed to send validation email: " + e.getMessage())
                    .build();
        } catch (Exception e) {
            log.error("Failed to register agent", e);
            return Response.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("Failed to register agent: " + e.getMessage())
                    .build();
        }
    }

    public Response registerProspect(UserDto registrationRequest) {
        if (registrationRequest == null) {
            return Response.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("Informations request cannot be null")
                    .build();
        }

        if (registrationRequest.getEmail() == null || registrationRequest.getPassword() == null ||
                registrationRequest.getPhoneNumber() == null || registrationRequest.getAddress() == null) {
            return Response.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("All informations are required")
                    .build();
        }

        User user = User.builder()
                .name(registrationRequest.getName())
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .phoneNumber(registrationRequest.getPhoneNumber())
                .address(registrationRequest.getAddress())
                .accountLocked(false)
                .enabled(false)
                .role(UserRole.PROSPECT)
                .build();

        ProspectSelection selection = ProspectSelection.builder()
                .role(registrationRequest.getProspectSelection().getRole())
                .propertyType(registrationRequest.getProspectSelection().getPropertyType())
                .workType(registrationRequest.getProspectSelection().getWorkType())
                .budget(registrationRequest.getProspectSelection().getBudget())
                .user(user)
                .build();

        user.setProspectSelection(selection);

        try {
            User savedUser = userRepo.save(user);

            UserDto userDto = entityDtoMapper.mapUserToDtoBasic(savedUser);
            return Response.builder()
                    .status(HttpStatus.OK.value())
                    .message("Prospect successfully registered")
                    .user(userDto)
                    .build();
        } catch (Exception e) {
            log.error("Failed to register prospect", e);
            return Response.builder()
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .message("Failed to register prospect: " + e.getMessage())
                    .build();
        }
    }




    @Override
    public Response loginUser(LoginRequest loginRequest) {

        User user = userRepo.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new NotFoundException("Email not found"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Password does not match");
        }
        if (!user.isEnabled()) {
            throw new IllegalStateException("Account not activated. Please check your email for the activation link.");
        }

        String token = jwtUtils.generateToken(user);

        return Response.builder()
                .status(200)
                .message("User Successfully Logged In")
                .token(token)
                .expirationTime("6 Month")
                .role(user.getRole().name())
                .build();
    }

    @Override
    public Response getAllUsers() {

        List<User> users = userRepo.findAll();
        List<UserDto> userDtos = users.stream()
                .map(entityDtoMapper::mapUserToDtoBasic)
                .toList();

        return Response.builder()
                .status(200)
                .userList(userDtos)
                .build();
    }

    @Override
    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        log.info("User Email is: " + email);
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not found"));
    }

    @Override
    public Response getUserInfo() {
        User user = getLoginUser();
        UserDto userDto = entityDtoMapper.mapUserToDtoBasic(user);

        return Response.builder()
                .status(200)
                .user(userDto)
                .build();
    }

    @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid "));
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been send to the same email address");
        }

        var user = userRepo.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("Not found"));
        user.setEnabled(true);
        userRepo.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    private String generateAndSaveActivationToken(User user) {
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);

        return generatedToken;
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);

        emailService.sendEmail(
                user.getEmail(),
                user.getName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }

    public User findByEmail(String email) {
        Optional<User> optionalUser = userRepo.findByEmail(email);
        return optionalUser.orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public User findById(Long userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }
}