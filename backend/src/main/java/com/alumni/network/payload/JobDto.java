package com.alumni.network.payload;

import java.time.LocalDateTime;

public class JobDto {
    private Long id;
    private String title;
    private String company;
    private String location;
    private String type;
    private String description;
    private String applyLink;
    private LocalDateTime postedAt;

    // Poster details
    private Long postedById;
    private String postedByUsername;
    private String postedByFullName;

    public JobDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getApplyLink() { return applyLink; }
    public void setApplyLink(String applyLink) { this.applyLink = applyLink; }

    public LocalDateTime getPostedAt() { return postedAt; }
    public void setPostedAt(LocalDateTime postedAt) { this.postedAt = postedAt; }

    public Long getPostedById() { return postedById; }
    public void setPostedById(Long postedById) { this.postedById = postedById; }

    public String getPostedByUsername() { return postedByUsername; }
    public void setPostedByUsername(String postedByUsername) { this.postedByUsername = postedByUsername; }

    public String getPostedByFullName() { return postedByFullName; }
    public void setPostedByFullName(String postedByFullName) { this.postedByFullName = postedByFullName; }
}
