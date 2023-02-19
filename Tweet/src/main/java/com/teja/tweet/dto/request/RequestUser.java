package com.teja.tweet.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestUser {
    String firstName;
    String lastName;
    String email;
    String mobileNumber;
    String password;
    String confirmPassword;
    Date dateOfBirth;
    String sex;
}
