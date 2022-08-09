package de.cognitionTest;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity(name="athlete")
public class Athlete {
    @Id
    @GeneratedValue
    private int id;

    private String firstname;
    private String lastname;
    private int coachid;
}
