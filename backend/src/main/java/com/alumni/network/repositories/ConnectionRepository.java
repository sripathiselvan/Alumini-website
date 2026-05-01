package com.alumni.network.repositories;

import com.alumni.network.models.Connection;
import com.alumni.network.models.ConnectionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, Long> {

    // Check if a direct (directional) connection exists
    Optional<Connection> findBySenderIdAndReceiverId(Long senderId, Long receiverId);

    // Pending requests sent TO a user (i.e., incoming)
    List<Connection> findByReceiverIdAndStatus(Long receiverId, ConnectionStatus status);

    // Get all accepted connections for a user (bidirectional)
    @Query("SELECT c FROM Connection c WHERE (c.sender.id = :userId OR c.receiver.id = :userId) AND c.status = 'ACCEPTED'")
    List<Connection> findAcceptedConnectionsByUserId(@Param("userId") Long userId);

    // Get all connections for a user (any status, any direction) — for status map
    @Query("SELECT c FROM Connection c WHERE c.sender.id = :userId OR c.receiver.id = :userId")
    List<Connection> findAllConnectionsForUser(@Param("userId") Long userId);

    // Find any connection between two users regardless of direction
    @Query("SELECT c FROM Connection c WHERE (c.sender.id = :a AND c.receiver.id = :b) OR (c.sender.id = :b AND c.receiver.id = :a)")
    Optional<Connection> findConnectionBetween(@Param("a") Long a, @Param("b") Long b);

    // Count accepted connections
    @Query("SELECT COUNT(c) FROM Connection c WHERE c.status = 'ACCEPTED'")
    long countAccepted();
}
