import * as React from 'react';
import TweetCard from './TweetCard';
import axios from 'axios';
import {useState,useEffect} from 'react';
import NavigationBar from './NavigationBar';
import jwt_decode from "jwt-decode";

function TweetFeed(){
    const token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    var tokenEmail = decoded.sub;
    const [tweet,setTweet] = useState([{username:"value.username",message:"value.message"}]);
    async function getAllTweets(){
        console.log("entered tweet feed");
        console.log(token);
        console.log(decoded);
        console.log(tokenEmail);
        const res= await axios.get(`http://localhost:8080/tweet-app/get/allTweets`,
          { headers: { Authorization: token }});
          console.log(res);
          console.log(res.data);
          setTweet(res.data);
        }
      
        useEffect(() => 
           {
           getAllTweets();
           },[])
 return(
    <div>
        <NavigationBar />
    {tweet.map((value,index)=>(
        <TweetCard props={{username:value.username,message:value.message,tweetId:value.tweetId}}/>
    ))}
    </div>
           );
}

export default TweetFeed;