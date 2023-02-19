import React, { Component,useState,useEffect} from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import FollowersCard from './FollowersCard';

function FollowersFeed() {
    const token= localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const id = parseInt(decoded.jti ,10);
    const [followers,setFollowers] = useState([])
    const getFollowers = async () =>{
    const res= await axios.get(`http://localhost:8080/tweet-app/getFollowers/${id}`,
        {headers:{Authorization: token }})
        return res.data;
    }
    useEffect(async () =>{
        const res = await getFollowers();
        setFollowers(res);
    },[])
    return ( 
        <>
        {followers.map((value,index)=>(
            <FollowersCard props={{username:value.username}}/>
        ))}
        </>
     );
}

export default FollowersFeed;