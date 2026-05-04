package com.alumni.network.repositories;

import com.alumni.network.models.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByOrderByPostedAtDesc();
    List<Job> findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrderByPostedAtDesc(
            String title, String company);
}
