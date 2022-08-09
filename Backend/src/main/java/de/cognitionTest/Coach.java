package de.cognitionTest;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity(name="coach")
public class Coach {
    @Id
    @GeneratedValue
    private int id;

    private String firstname;
    private String lastname;
}
