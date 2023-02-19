import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavigationBar from './NavigationBar';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import './TweetCard.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import ReplyForm from './ReplyForm';
import { getValue } from '@testing-library/user-event/dist/utils';

function TweetCard(props) {
  // const [like,setLike]=useState(false);
  const [tweet,setTweet] = useState([{username:"teja@gmail.com",message:"Hello"},{username:"teja@gmail.com",message:"Hello"}]);
  const [flag,setFlag] = useState(false);
  
  // async function getAllTweets(){
  //   const res= await axios.get(`http://localhost:8080/tweet-app/get/allTweets`);
  //   setTweet(res.data);
  //   likeArray=new Array(res.data.length).fill(false);
  //   dislikeArray=new Array(res.data.length).fill(false);
  // }

  // useEffect(() => 
  //    {
  //    getAllTweets();
  //    },[])
     const [like,setLike]=useState(false);  
  const handleLike = () => {
    if(like)
    setLike(false);
    else{
      setLike(true);
      setDislike(false);
    }
  }
  const [dislike,setDislike]=useState(false);  
  const handleDislike = () => {
    if(dislike){
      setDislike(false);
    }
    else{
      setDislike(true);
      setLike(false);
    }
  }
  return (
    <>
    {/* <Card.Title>Tweet</Card.Title> */}
    <Card>
    <Card.Header >{props.props.username}</Card.Header>
      <Card.Body>
      {/* <Card.Header >{props.props.username}</Card.Header> */}
        <Card.Text type="button">
        {props.props.message}
        </Card.Text>
        {/* <Button variant="primary">Reply</Button>   */}
        <ReplyForm props={props}/>
        {/* {likeArray[index]?<ThumbUpOutlinedIcon className="icon" type="button" onClick={()=>handleLike(index)} color="primary" /> : 
    <ThumbUpOutlinedIcon className="icon" type="button" onClick={()=>handleLike(index)}  />}
    {dislikeArray[index]? <ThumbDownOffAltIcon className="icon" type="button" onClick={()=>handleDislike(index)} color="primary"/> :
    <ThumbDownOffAltIcon className="icon" type="button" onClick={()=>handleDislike(index)} />} */}
    {like?<ThumbUpOutlinedIcon className="icon" type="button" onClick={()=>handleLike()} color="primary" /> : 
    <ThumbUpOutlinedIcon className="icon" type="button" onClick={()=>handleLike()}  />}
    {dislike? <ThumbDownOffAltIcon className="icon" type="button" onClick={()=>handleDislike()} color="primary"/> :
    <ThumbDownOffAltIcon className="icon" type="button" onClick={()=>handleDislike()} />}
      </Card.Body>
    </Card>
    </>
  );
}

export default TweetCard;