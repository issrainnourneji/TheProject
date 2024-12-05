package com.muntu.muntu.Controller;

import com.muntu.muntu.Dto.LoginRequest;
import com.muntu.muntu.Dto.Response;
import com.muntu.muntu.Dto.UserDto;
import com.muntu.muntu.Services.Impl.UserServiceImpl;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserServiceImpl userService;

    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@RequestBody UserDto registrationRequest){
        System.out.println(registrationRequest);
        return ResponseEntity.ok(userService.registerUser(registrationRequest));
    }
    @PostMapping("/login")
    public ResponseEntity<Response> loginUser(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(userService.loginUser(loginRequest));
    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        userService.activateAccount(token);
    }

    @PostMapping("/registerAgent")
    public ResponseEntity<Response> registerAgent(@RequestBody UserDto registrationRequest) {
        Response response = userService.registerAgent(registrationRequest);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }
    @PostMapping("/registerProspect")
    public Response registerProspect(@RequestBody UserDto registrationRequest) {
        return userService.registerProspect(registrationRequest);
    }
}