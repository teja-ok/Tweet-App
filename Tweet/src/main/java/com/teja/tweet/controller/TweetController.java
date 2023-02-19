package com.teja.tweet.controller;

import com.teja.tweet.dto.request.RequestTweet;
import com.teja.tweet.dto.response.ResponseTweet;
import com.teja.tweet.service.implementation.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("tweet-app")
public class TweetController {

    @Autowired
    TweetService tweetService;

    @PostMapping("/post/tweet")
    public ResponseEntity<ResponseTweet> saveTweet(@RequestBody RequestTweet requestTweet){
        return ResponseEntity.ok(tweetService.saveTweet(requestTweet));
    }

    @GetMapping("/get/allTweets")
    public ResponseEntity<List<ResponseTweet>> getAllTweets(){
        System.out.println("get all tweets called....");
        System.out.println("requested");
        return ResponseEntity.ok(tweetService.getAllTweets());
    }

    @PostMapping("/replyToTweet/{tweetId}")
    public ResponseEntity<ResponseTweet> replyToTweet(@PathVariable Integer tweetId,@RequestBody RequestTweet requestTweet){
        return ResponseEntity.ok(tweetService.replyToTweet(tweetId,requestTweet));
    }
}
