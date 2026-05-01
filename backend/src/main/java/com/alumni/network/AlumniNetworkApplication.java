package com.alumni.network;

import com.alumni.network.models.Role;
import com.alumni.network.models.User;
import com.alumni.network.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AlumniNetworkApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlumniNetworkApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder encoder) {
		return args -> {
			if (!userRepository.existsByUsername("admin")) {
				User admin = new User("admin", "admin@alumninexus.com", 
						encoder.encode("admin123"), Role.ROLE_ADMIN);
				userRepository.save(admin);
				System.out.println("Default admin created: admin / admin123");
			}

			if (!userRepository.existsByUsername("teststudent")) {
				User student = new User("teststudent", "student@test.com", 
						encoder.encode("password123"), Role.ROLE_STUDENT);
				userRepository.save(student);
				System.out.println("Test student created: teststudent / password123");
			}

			if (!userRepository.existsByUsername("testalumni")) {
				User alumni = new User("testalumni", "alumni@test.com", 
						encoder.encode("password123"), Role.ROLE_ALUMNI);
				userRepository.save(alumni);
				System.out.println("Test alumni created: testalumni / password123");
			}
		};
	}
}
