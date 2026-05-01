package com.alumni.network.controllers;

import com.alumni.network.models.Post;
import com.alumni.network.models.Profile;
import com.alumni.network.models.User;
import com.alumni.network.payload.PostDto;
import com.alumni.network.repositories.PostRepository;
import com.alumni.network.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private PostDto convertToDto(Post post) {
        PostDto dto = new PostDto();
        dto.setId(post.getId());
        dto.setContent(post.getContent());
        dto.setCreatedAt(post.getCreatedAt());
        
        User author = post.getAuthor();
        dto.setAuthorId(author.getId());
        dto.setAuthorUsername(author.getUsername());
        dto.setAuthorRole(author.getRole().name());
        
        // Fetch fullName from profile if it exists
        Profile profile = author.getProfile();
        if (profile != null && profile.getFullName() != null) {
            dto.setAuthorFullName(profile.getFullName());
        } else {
            dto.setAuthorFullName(author.getUsername());
        }
        
        return dto;
    }

    @PostMapping
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postRequest) {
        User user = getCurrentUser();
        Post post = new Post(postRequest.getContent(), user);
        Post savedPost = postRepository.save(post);
        return ResponseEntity.ok(convertToDto(savedPost));
    }

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts() {
        List<Post> posts = postRepository.findAllByOrderByCreatedAtDesc();
        List<PostDto> dtos = posts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
