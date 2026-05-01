package com.alumni.network.payload;

import java.time.LocalDateTime;

public class PostDto {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    
    // Author details
    private Long authorId;
    private String authorUsername;
    private String authorFullName;
    private String authorRole;

    public PostDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Long getAuthorId() { return authorId; }
    public void setAuthorId(Long authorId) { this.authorId = authorId; }

    public String getAuthorUsername() { return authorUsername; }
    public void setAuthorUsername(String authorUsername) { this.authorUsername = authorUsername; }

    public String getAuthorFullName() { return authorFullName; }
    public void setAuthorFullName(String authorFullName) { this.authorFullName = authorFullName; }

    public String getAuthorRole() { return authorRole; }
    public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }
}
