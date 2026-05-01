package com.alumni.network.controllers;

import com.alumni.network.models.Profile;
import com.alumni.network.models.User;
import com.alumni.network.payload.AdminStatsDto;
import com.alumni.network.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ConnectionRepository connectionRepository;

    /** Platform-wide statistics */
    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDto> getStats() {
        AdminStatsDto stats = new AdminStatsDto(
                userRepository.count(),
                postRepository.count(),
                jobRepository.count(),
                eventRepository.count(),
                connectionRepository.countAccepted()
        );
        return ResponseEntity.ok(stats);
    }

    /** List all users with basic info */
    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (User u : users) {
            Profile profile = u.getProfile();
            Map<String, Object> row = new HashMap<>();
            row.put("id", u.getId());
            row.put("username", u.getUsername());
            row.put("email", u.getEmail());
            row.put("role", u.getRole().name());
            row.put("fullName", profile != null && profile.getFullName() != null
                    ? profile.getFullName() : u.getUsername());
            result.add(row);
        }
        return ResponseEntity.ok(result);
    }

    /** Delete any post */
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        if (!postRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        postRepository.deleteById(id);
        return ResponseEntity.ok("Post deleted.");
    }

    /** Delete any job */
    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        if (!jobRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        jobRepository.deleteById(id);
        return ResponseEntity.ok("Job deleted.");
    }

    /** Delete any event */
    @DeleteMapping("/events/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        eventRepository.deleteById(id);
        return ResponseEntity.ok("Event deleted.");
    }

    /** Get all posts for moderation */
    @GetMapping("/posts")
    public ResponseEntity<List<Map<String, Object>>> getAllPostsForModeration() {
        List<Map<String, Object>> result = new ArrayList<>();
        postRepository.findAllByOrderByCreatedAtDesc().forEach(p -> {
            Profile profile = p.getAuthor().getProfile();
            String name = profile != null && profile.getFullName() != null
                    ? profile.getFullName() : p.getAuthor().getUsername();
            Map<String, Object> row = new HashMap<>();
            row.put("id", p.getId());
            row.put("content", p.getContent());
            row.put("authorName", name);
            row.put("createdAt", p.getCreatedAt().toString());
            result.add(row);
        });
        return ResponseEntity.ok(result);
    }
}
