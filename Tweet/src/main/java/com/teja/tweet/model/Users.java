package com.teja.tweet.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    String firstName;
    String lastName;
    String email;
    String mobileNumber;
    String password;
    String confirmPassword;
    LocalDate dateOfBirth;
    String sex;
    Integer numberOfFollowers;
    Integer numberOfFollowing;
    String role="USER";
    Integer[] followers;
    Integer[] following;
}
