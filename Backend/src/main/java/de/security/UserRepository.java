package de.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// The security package is based on a public github repository, where most of the configuration was copied from.
// Source: https://github.com/dangeabunea/RomanianCoderExamples/tree/master/SpringBootSecurity/HttpBasic/src/main/java/rc/bootsecurity
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
