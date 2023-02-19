package com.teja.tweet.controller;

import com.teja.tweet.dto.request.RequestTweet;
import com.teja.tweet.dto.response.ResponseTweet;
import com.teja.tweet.service.implementation.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReplyController {
//    @Autowired
//    ReplyService replyService;
//
//    @PostMapping("/reply/{tweetId}")
//    public ResponseEntity<ResponseTweet> replyToTweet(@PathVariable Integer tweetId, @RequestBody RequestTweet requestTweet){
//        return replyService.replyToTweet(tweetId,requestTweet);
//    }


}
