package de.cognitionTest;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity(name="cognitiontest")
public class CognitionTest {
    @Id
    @GeneratedValue
    private int id;

    private java.sql.Date date;
    private int athleteid;
    private float time_to_complete;
    private int mistakes;
    private boolean finished;

    public boolean isFinished(){
        boolean isFinished = false;
        if (finished){
            isFinished = true;
        }
        return isFinished;
    }
}
