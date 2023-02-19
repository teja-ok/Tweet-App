import React, { useState,useEffect,Component } from 'react';
import FollowingCard from './FollowingCard'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import NavigationBar from './NavigationBar';

function FollowingFeed() {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const id=parseInt(decoded.jti,10);
    const [following,setFollowing] = useState([]);
    const getMyFollowing = async () =>{
        console.log("navigated...");
        const res= await axios.get(`http://localhost:8080/tweet-app/getMyFollowing/${id}`,
                                      { headers: { Authorization: token }});
        setFollowing(res.data);
            console.log(res.data);
            console.log(following);
    }
    useEffect(()=>{
        getMyFollowing();
    },[])
    return ( 
        <>
        <NavigationBar />
        {
            following.map((value, index)=>(
                <FollowingCard props={{username:value.username,userId:value.userId}}/>
            ))
        }
        </>
     );
}

export default FollowingFeed;