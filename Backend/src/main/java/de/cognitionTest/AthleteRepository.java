package de.cognitionTest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AthleteRepository extends JpaRepository<Athlete, Integer> {
    List<Athlete> findByCoachid(int id);
}
