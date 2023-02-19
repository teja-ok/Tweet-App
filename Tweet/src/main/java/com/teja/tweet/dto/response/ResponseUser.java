package com.teja.tweet.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseUser {
    Integer userId;
    String firstName;
    String lastName;
    String email;
    String mobileNumber;
    Date dateOfBirth;
    String sex;
    Integer numberOfFollowers;
    Integer numberOfFollowing;
}
