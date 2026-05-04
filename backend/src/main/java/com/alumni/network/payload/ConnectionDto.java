package com.alumni.network.payload;

import java.time.LocalDateTime;

public class ConnectionDto {
    private Long id;

    private Long senderId;
    private String senderUsername;
    private String senderFullName;

    private Long receiverId;
    private String receiverUsername;
    private String receiverFullName;

    private String status;
    private LocalDateTime createdAt;

    public ConnectionDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSenderId() { return senderId; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }

    public String getSenderUsername() { return senderUsername; }
    public void setSenderUsername(String senderUsername) { this.senderUsername = senderUsername; }

    public String getSenderFullName() { return senderFullName; }
    public void setSenderFullName(String senderFullName) { this.senderFullName = senderFullName; }

    public Long getReceiverId() { return receiverId; }
    public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }

    public String getReceiverUsername() { return receiverUsername; }
    public void setReceiverUsername(String receiverUsername) { this.receiverUsername = receiverUsername; }

    public String getReceiverFullName() { return receiverFullName; }
    public void setReceiverFullName(String receiverFullName) { this.receiverFullName = receiverFullName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
