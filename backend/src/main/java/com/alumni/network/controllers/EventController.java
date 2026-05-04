package com.alumni.network.controllers;

import com.alumni.network.models.Event;
import com.alumni.network.models.Profile;
import com.alumni.network.models.User;
import com.alumni.network.payload.EventDto;
import com.alumni.network.repositories.EventRepository;
import com.alumni.network.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private EventDto convertToDto(Event event) {
        EventDto dto = new EventDto();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setEventDate(event.getEventDate());
        dto.setLocation(event.getLocation());
        dto.setOrganizer(event.getOrganizer());
        dto.setCreatedAt(event.getCreatedAt());

        User creator = event.getCreatedBy();
        dto.setCreatedById(creator.getId());
        dto.setCreatedByUsername(creator.getUsername());

        Profile profile = creator.getProfile();
        if (profile != null && profile.getFullName() != null) {
            dto.setCreatedByFullName(profile.getFullName());
        } else {
            dto.setCreatedByFullName(creator.getUsername());
        }

        return dto;
    }

    @PostMapping
    public ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventRequest) {
        User user = getCurrentUser();
        LocalDateTime eventDate = eventRequest.getEventDate() != null
                ? eventRequest.getEventDate()
                : LocalDateTime.now().plusDays(7);
        Event event = new Event(
                eventRequest.getTitle(),
                eventRequest.getDescription(),
                eventDate,
                eventRequest.getLocation(),
                eventRequest.getOrganizer(),
                user
        );
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.ok(convertToDto(savedEvent));
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents() {
        List<Event> events = eventRepository.findAllByOrderByEventDateAsc();
        List<EventDto> dtos = events.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
