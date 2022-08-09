package de.cognitionTest;

import de.security.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controller {
    private UserRepository userRepository;

    @Autowired
    public CoachRepository coachRep;
    @Autowired
    public AthleteRepository athleteRep;
    @Autowired
    public CognitionTestRepository testRep;

    // not in use
    @GetMapping("admin/getCoach/{id}")
    public Coach getCoach(@PathVariable int id){
        Coach coach = new Coach();
        coach.setId(coachRep.getReferenceById(id).getId());
        coach.setFirstname(coachRep.getReferenceById(id).getFirstname());
        coach.setLastname(coachRep.getReferenceById(id).getLastname());
        return coach;
    }

    @GetMapping("admin/getAthletes/{coachID}")
    public List<Athlete> getAthletes(@PathVariable int coachID){
        return athleteRep.findByCoachid(coachID);
    }

    // not in use
    @GetMapping("admin/getAthlete/{id}")
    public Athlete getAthlete(@PathVariable int id){
        Athlete athlete = new Athlete();
        athlete.setId(athleteRep.getReferenceById(id).getId());
        athlete.setFirstname(athleteRep.getReferenceById(id).getFirstname());
        athlete.setLastname(athleteRep.getReferenceById(id).getLastname());
        athlete.setCoachid(athleteRep.getReferenceById(id).getCoachid());
        return athlete;
    }

    @GetMapping("admin/getStats/{id}")
    public List<CognitionTest> getStats(@PathVariable int id){
        return testRep.findByAthleteidAndFinished(id, true);
    }

    // not in use but should be used in test screen
    @GetMapping("user/getTestID/{id}")
    public CognitionTest getTestId(@PathVariable int id){
        List<CognitionTest> unfinishedTests = testRep.findByAthleteidAndFinished(id, false);
        // returns the topmost test thats not finished, NOT the test with the lowest ID.
        return unfinishedTests.get(0);
    }

    // not in use
    @PostMapping("user/setTestResults")
    public CognitionTest setTestResults(@RequestBody CognitionTest testResults) throws IllegalAccessException {
        /*
        int testID = testResults.getId();
        CognitionTest returnTest;

        CognitionTest checkTest = testRep.getReferenceById(testID);
        if(checkTest.isFinished()){
            throw new IllegalAccessException("The test is already finished.");
        } else if (checkTest.getAthleteid() != testResults.getAthleteid()) {
            throw new IllegalAccessException("AthleteID of accessed test invalid.");
        } else {
            returnTest = testRep.save(testResults);
        }
        */

        return testRep.save(testResults);
    }

    // not in use
    @PostMapping("admin/createCoach")
    public Coach createCoach(){
        Coach coach = new Coach();
        coach.setFirstname("Peter");
        coach.setLastname("Magath");
        coach.setId(1);
        return coachRep.save(coach);
    }

    // not in use
    @PostMapping("admin/createAthlete")
    public Athlete createAthlete(@RequestBody Athlete athlete){
        return athleteRep.save(athlete);
    }

    // not in use
    @PostMapping("admin/createTest/{athleteid}")
    public CognitionTest createTest(@PathVariable int athleteid){
        CognitionTest test = new CognitionTest();
        test.setAthleteid(athleteid);
        test.setFinished(false);
        return testRep.save(test);
    }

}
