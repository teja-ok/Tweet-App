package com.teja.tweet.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTweet {
    Integer tweetId;
    String message;
    String username;
    Integer likes;
    Integer disLikes;
}
