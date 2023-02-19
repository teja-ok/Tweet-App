package com.teja.tweet.service.implementation;

import com.teja.tweet.dto.request.RequestTweet;
import com.teja.tweet.dto.response.ResponseTweet;
import com.teja.tweet.model.Tweet;
import com.teja.tweet.repository.TweetRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TweetService {

    @Autowired
    TweetRepository tweetRepository;
    @Autowired
    ModelMapper modelMapper;
    public ResponseTweet saveTweet(RequestTweet requestTweet) {
        var tweet = modelMapper.map(requestTweet, Tweet.class);
        return modelMapper.map(tweetRepository.save(tweet),ResponseTweet.class);
    }

    public List<ResponseTweet> getAllTweets() {
        Iterable<Tweet> tweetsList=tweetRepository.findAll();
        List<ResponseTweet> responseTweetList = new ArrayList<>();
        tweetsList.forEach(tweet-> responseTweetList.add(modelMapper.map(tweet,ResponseTweet.class)));
        return responseTweetList;
    }

    public ResponseTweet replyToTweet(Integer tweetId, RequestTweet requestTweet) {
        var replyTweet = modelMapper.map(requestTweet, Tweet.class);
        replyTweet.setIsReply(tweetId);
        return modelMapper.map(tweetRepository.save(replyTweet),ResponseTweet.class);

    }
}
