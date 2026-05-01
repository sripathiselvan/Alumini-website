package com.alumni.network.repositories;

import com.alumni.network.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    
    Optional<Profile> findByUserId(Long userId);

    @Query("SELECT p FROM Profile p WHERE " +
           "LOWER(p.fullName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.skills) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.company) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.department) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Profile> searchDirectory(@Param("query") String query);
}
