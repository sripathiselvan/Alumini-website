package com.alumni.network.payload;

public class AdminStatsDto {
    private long totalUsers;
    private long totalPosts;
    private long totalJobs;
    private long totalEvents;
    private long totalConnections;

    public AdminStatsDto() {}

    public AdminStatsDto(long totalUsers, long totalPosts, long totalJobs,
                         long totalEvents, long totalConnections) {
        this.totalUsers = totalUsers;
        this.totalPosts = totalPosts;
        this.totalJobs = totalJobs;
        this.totalEvents = totalEvents;
        this.totalConnections = totalConnections;
    }

    // Getters and Setters
    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalPosts() { return totalPosts; }
    public void setTotalPosts(long totalPosts) { this.totalPosts = totalPosts; }

    public long getTotalJobs() { return totalJobs; }
    public void setTotalJobs(long totalJobs) { this.totalJobs = totalJobs; }

    public long getTotalEvents() { return totalEvents; }
    public void setTotalEvents(long totalEvents) { this.totalEvents = totalEvents; }

    public long getTotalConnections() { return totalConnections; }
    public void setTotalConnections(long totalConnections) { this.totalConnections = totalConnections; }
}
