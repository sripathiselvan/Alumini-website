package com.alumni.network.controllers;

import com.alumni.network.models.Profile;
import com.alumni.network.models.User;
import com.alumni.network.payload.ProfileDto;
import com.alumni.network.repositories.ProfileRepository;
import com.alumni.network.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    // Helper method to get the currently authenticated user
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Helper method to convert Profile to DTO
    private ProfileDto convertToDto(Profile profile, User user) {
        ProfileDto dto = new ProfileDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());

        if (profile != null) {
            dto.setFullName(profile.getFullName());
            dto.setDepartment(profile.getDepartment());
            dto.setBatchYear(profile.getBatchYear());
            dto.setCompany(profile.getCompany());
            dto.setDesignation(profile.getDesignation());
            dto.setLocation(profile.getLocation());
            dto.setSkills(profile.getSkills());
            dto.setBio(profile.getBio());
            dto.setLinkedInUrl(profile.getLinkedInUrl());
            dto.setGithubUrl(profile.getGithubUrl());
            dto.setAvatarUrl(profile.getAvatarUrl());
        }
        return dto;
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileDto> getMyProfile() {
        User user = getCurrentUser();
        Optional<Profile> profileOpt = profileRepository.findByUserId(user.getId());
        return ResponseEntity.ok(convertToDto(profileOpt.orElse(null), user));
    }

    @PutMapping("/me")
    public ResponseEntity<ProfileDto> updateMyProfile(@RequestBody ProfileDto profileDto) {
        User user = getCurrentUser();
        Profile profile = profileRepository.findByUserId(user.getId()).orElse(new Profile(user));

        profile.setFullName(profileDto.getFullName());
        profile.setDepartment(profileDto.getDepartment());
        profile.setBatchYear(profileDto.getBatchYear());
        profile.setCompany(profileDto.getCompany());
        profile.setDesignation(profileDto.getDesignation());
        profile.setLocation(profileDto.getLocation());
        profile.setSkills(profileDto.getSkills());
        profile.setBio(profileDto.getBio());
        profile.setLinkedInUrl(profileDto.getLinkedInUrl());
        profile.setGithubUrl(profileDto.getGithubUrl());
        profile.setAvatarUrl(profileDto.getAvatarUrl());

        Profile savedProfile = profileRepository.save(profile);
        return ResponseEntity.ok(convertToDto(savedProfile, user));
    }

    @GetMapping
    public ResponseEntity<List<ProfileDto>> getAllProfiles(@RequestParam(required = false) String query) {
        List<Profile> profiles;
        if (query != null && !query.trim().isEmpty()) {
            profiles = profileRepository.searchDirectory(query);
        } else {
            profiles = profileRepository.findAll();
        }

        List<ProfileDto> dtos = profiles.stream()
                .map(p -> convertToDto(p, p.getUser()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileDto> getProfileById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Profile profile = profileRepository.findByUserId(user.getId()).orElse(null);
        return ResponseEntity.ok(convertToDto(profile, user));
    }
}
