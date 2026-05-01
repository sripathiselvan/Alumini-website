package com.alumni.network.models;

import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String department;
    private String batchYear;
    private String company;
    private String designation;
    private String location;
    
    @Column(columnDefinition = "TEXT")
    private String skills;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    private String linkedInUrl;
    private String githubUrl;
    private String avatarUrl;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    public Profile() {}

    public Profile(User user) {
        this.user = user;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getBatchYear() { return batchYear; }
    public void setBatchYear(String batchYear) { this.batchYear = batchYear; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getLinkedInUrl() { return linkedInUrl; }
    public void setLinkedInUrl(String linkedInUrl) { this.linkedInUrl = linkedInUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
