package de.security;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

// The security package is based on a public github repository, where most of the configuration was copied from.
// Source: https://github.com/dangeabunea/RomanianCoderExamples/tree/master/SpringBootSecurity/HttpBasic/src/main/java/rc/bootsecurity

// This service runs at the initialization of the project. It deletes all users from the user table
// and creates new ones to make sure the DB can be accessed. This should be deleted when using a productive DB.
@Service
@RequiredArgsConstructor
public class DbInit implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception{
        // Delete all
        this.userRepository.deleteAll();

        // Create users
        User user = new User("user", passwordEncoder.encode("password"), "USER", "");
        User admin = new User("admin", passwordEncoder.encode("password"), "ADMIN", "");

        List<User> users = Arrays.asList(user, admin);

        // Save to db
        this.userRepository.saveAll(users);
    }
}
