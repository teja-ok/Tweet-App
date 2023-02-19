package com.teja.tweet.model;

import lombok.*;

import javax.persistence.*;


@Entity
@Setter
@Getter
@AllArgsConstructor
public class Tweet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    String message;
    String username;
    Integer likes;
    Integer dislikes;
    Integer isReply;
    Tweet(){
        this.id=id;
        this.message=message;
        this.likes=0;
        this.dislikes=0;
        this.isReply=isReply;
    }
}
