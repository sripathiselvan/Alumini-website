package com.alumni.network.payload;

public class ProfileDto {
    private Long id;
    private String username;
    private String email;
    private String role;
    
    private String fullName;
    private String department;
    private String batchYear;
    private String company;
    private String designation;
    private String location;
    private String skills;
    private String bio;
    private String linkedInUrl;
    private String githubUrl;
    private String avatarUrl;

    public ProfileDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

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
}
