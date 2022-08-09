package de.cognitionTest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CognitionTestRepository extends JpaRepository<CognitionTest, Integer> {
    List<CognitionTest> findByAthleteidAndFinished(int id, boolean bool);
}
