package com.alumni.network.controllers;

import com.alumni.network.models.Connection;
import com.alumni.network.models.ConnectionStatus;
import com.alumni.network.models.Profile;
import com.alumni.network.models.User;
import com.alumni.network.payload.ConnectionDto;
import com.alumni.network.repositories.ConnectionRepository;
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
@RequestMapping("/api/connections")
public class ConnectionController {

    @Autowired
    private ConnectionRepository connectionRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserDetails) authentication.getPrincipal()).getUsername();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private String resolveFullName(User user) {
        Profile profile = user.getProfile();
        if (profile != null && profile.getFullName() != null) {
            return profile.getFullName();
        }
        return user.getUsername();
    }

    private ConnectionDto convertToDto(Connection c) {
        ConnectionDto dto = new ConnectionDto();
        dto.setId(c.getId());
        dto.setStatus(c.getStatus().name());
        dto.setCreatedAt(c.getCreatedAt());

        User sender = c.getSender();
        dto.setSenderId(sender.getId());
        dto.setSenderUsername(sender.getUsername());
        dto.setSenderFullName(resolveFullName(sender));

        User receiver = c.getReceiver();
        dto.setReceiverId(receiver.getId());
        dto.setReceiverUsername(receiver.getUsername());
        dto.setReceiverFullName(resolveFullName(receiver));

        return dto;
    }

    /** Send a connection request to another user */
    @PostMapping("/send/{userId}")
    public ResponseEntity<?> sendRequest(@PathVariable Long userId) {
        User me = getCurrentUser();
        if (me.getId().equals(userId)) {
            return ResponseEntity.badRequest().body("Cannot connect to yourself.");
        }

        User target = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if connection already exists in either direction
        Optional<Connection> existing = connectionRepository.findConnectionBetween(me.getId(), userId);
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("Connection already exists.");
        }

        Connection connection = new Connection(me, target);
        Connection saved = connectionRepository.save(connection);
        return ResponseEntity.ok(convertToDto(saved));
    }

    /** Accept an incoming connection request */
    @PutMapping("/accept/{connectionId}")
    public ResponseEntity<?> acceptRequest(@PathVariable Long connectionId) {
        User me = getCurrentUser();
        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow(() -> new RuntimeException("Connection not found"));

        if (!connection.getReceiver().getId().equals(me.getId())) {
            return ResponseEntity.status(403).body("Not authorized.");
        }
        if (connection.getStatus() != ConnectionStatus.PENDING) {
            return ResponseEntity.badRequest().body("Request is not pending.");
        }

        connection.setStatus(ConnectionStatus.ACCEPTED);
        return ResponseEntity.ok(convertToDto(connectionRepository.save(connection)));
    }

    /** Reject (or withdraw) a connection request */
    @PutMapping("/reject/{connectionId}")
    public ResponseEntity<?> rejectRequest(@PathVariable Long connectionId) {
        User me = getCurrentUser();
        Connection connection = connectionRepository.findById(connectionId)
                .orElseThrow(() -> new RuntimeException("Connection not found"));

        // Receiver can reject; sender can withdraw
        boolean isReceiver = connection.getReceiver().getId().equals(me.getId());
        boolean isSender = connection.getSender().getId().equals(me.getId());
        if (!isReceiver && !isSender) {
            return ResponseEntity.status(403).body("Not authorized.");
        }

        connectionRepository.delete(connection);
        return ResponseEntity.ok("Connection removed.");
    }

    /** Get all ACCEPTED connections for the current user */
    @GetMapping("/my")
    public ResponseEntity<List<ConnectionDto>> getMyConnections() {
        User me = getCurrentUser();
        List<Connection> connections = connectionRepository.findAcceptedConnectionsByUserId(me.getId());
        List<ConnectionDto> dtos = connections.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /** Get pending incoming requests for the current user */
    @GetMapping("/pending")
    public ResponseEntity<List<ConnectionDto>> getPendingRequests() {
        User me = getCurrentUser();
        List<Connection> pending = connectionRepository.findByReceiverIdAndStatus(me.getId(), ConnectionStatus.PENDING);
        List<ConnectionDto> dtos = pending.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /** Get ALL connections (any status, any direction) — used for building connection status map on frontend */
    @GetMapping("/all")
    public ResponseEntity<List<ConnectionDto>> getAllMyConnections() {
        User me = getCurrentUser();
        List<Connection> all = connectionRepository.findAllConnectionsForUser(me.getId());
        List<ConnectionDto> dtos = all.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}
