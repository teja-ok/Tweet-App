package com.teja.tweet.repository;

import com.teja.tweet.model.Tweet;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TweetRepository extends CrudRepository<Tweet,Integer> {
}
