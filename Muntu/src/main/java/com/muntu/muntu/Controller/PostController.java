package com.muntu.muntu.Controller;

import com.muntu.muntu.Entity.Document.Post;
import com.muntu.muntu.Services.Impl.PostServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/post")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class PostController {

    private final PostServiceImpl postService;



    @PostMapping("/add/{userId}")
    public ResponseEntity<Post> addPostForUser(
            @PathVariable Long userId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        Post post = postService.savePostForUser(userId, title, description, image);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUser(@PathVariable Long userId) {
        List<Post> posts = postService.getPostsByUser(userId);
        return ResponseEntity.ok(posts);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPostsForAgent() {
        List<Post> posts = postService.getAllPostsForAgent();
        return ResponseEntity.ok(posts);
    }


}
