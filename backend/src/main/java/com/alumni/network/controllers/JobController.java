package com.alumni.network.controllers;

import com.alumni.network.models.Job;
import com.alumni.network.models.Profile;
import com.alumni.network.models.User;
import com.alumni.network.payload.JobDto;
import com.alumni.network.repositories.JobRepository;
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
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private JobDto convertToDto(Job job) {
        JobDto dto = new JobDto();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setCompany(job.getCompany());
        dto.setLocation(job.getLocation());
        dto.setType(job.getType());
        dto.setDescription(job.getDescription());
        dto.setApplyLink(job.getApplyLink());
        dto.setPostedAt(job.getPostedAt());

        User poster = job.getPostedBy();
        dto.setPostedById(poster.getId());
        dto.setPostedByUsername(poster.getUsername());

        Profile profile = poster.getProfile();
        if (profile != null && profile.getFullName() != null) {
            dto.setPostedByFullName(profile.getFullName());
        } else {
            dto.setPostedByFullName(poster.getUsername());
        }

        return dto;
    }

    @PostMapping
    public ResponseEntity<JobDto> createJob(@RequestBody JobDto jobRequest) {
        User user = getCurrentUser();
        Job job = new Job(
                jobRequest.getTitle(),
                jobRequest.getCompany(),
                jobRequest.getLocation(),
                jobRequest.getType(),
                jobRequest.getDescription(),
                jobRequest.getApplyLink(),
                user
        );
        Job savedJob = jobRepository.save(job);
        return ResponseEntity.ok(convertToDto(savedJob));
    }

    @GetMapping
    public ResponseEntity<List<JobDto>> getAllJobs(@RequestParam(required = false) String query) {
        List<Job> jobs;
        if (query != null && !query.isBlank()) {
            jobs = jobRepository
                    .findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrderByPostedAtDesc(query, query);
        } else {
            jobs = jobRepository.findAllByOrderByPostedAtDesc();
        }
        List<JobDto> dtos = jobs.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
