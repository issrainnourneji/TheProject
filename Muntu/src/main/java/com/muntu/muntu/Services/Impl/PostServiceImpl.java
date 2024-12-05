package com.muntu.muntu.Services.Impl;


import com.muntu.muntu.Entity.Document.Post;
import com.muntu.muntu.Entity.User;
import com.muntu.muntu.Repository.Document.PostRepository;
import com.muntu.muntu.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
public class PostServiceImpl {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    private static final String uploadDir = "C:/Users/starinfo/Desktop/New/Muntu/uploads/";


    public Post savePostForUser(Long userId, String title, String description, MultipartFile image) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }

        String imagePath = uploadDir + image.getOriginalFilename();
        image.transferTo(new File(imagePath));

        Post post = new Post(title, description, "uploads/" + image.getOriginalFilename());
        post.setUser(user);
        return postRepository.save(post);
    }

    public List<Post> getPostsByUser(Long userId) {
        return postRepository.findByUserId(userId);
    }
    public List<Post> getAllPostsForAgent() {
        return postRepository.findAll();
    }
}

