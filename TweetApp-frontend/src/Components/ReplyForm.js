// import React, { Component } from 'react';

// function ReplyForm() {
//     return ( 
//         <>
//         </>
//      );
// }

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import './ReplyForm.css';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {useNavigate} from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ReplyForm(props) {
    const token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    var tokenEmail = decoded.sub;
  const [show, setShow] = useState(false);
  const [reply,setReply] = useState({username: tokenEmail});
  const [flag,setFlag] = useState(true);
  const [open, setOpen] = useState(false);
  const [tweetId,setTweetId] = useState(props.props.tweetId);
  const navigate= useNavigate();

  const handleClose2 = () => {
    setShow(false);
    navigate('/home',{replace: true});
  }
  const handleShow = () => setShow(true);
  const handleClick = ()=>{
    setOpen(true);
    console.log(tweetId);
    axios.post(`http://localhost:8080/tweet-app/replyToTweet/${tweetId}`,reply,
    { headers: { Authorization: token }})
    .then(res=>{
        console.log(res);
        console.log(res.data);
    })
  }
  const handleChange=(e)=>{
    console.log(reply);
    setReply({...reply,[e.target.name]:e.target.value});
    if(e.target.value==="")
    setFlag(true);
    else
    setFlag(false);
}
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
}

  return (
    <>

      <Button variant="primary" onClick={handleShow}>
        Reply
      </Button>

      <Modal show={show} onHide={handleClose}>
      
        {/* <Modal.Header closeButton> */}
          {/* <Modal.Title>{props.props.props.username}</Modal.Title> */}
        {/* </Modal.Header> */}
       <div className="message">
        <h6>{props.props.props.username}</h6>
        <p >{props.props.props.message}</p>
        </div>
        <Modal.Body>
          <Form>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group> */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className='TweetYourReply'>Tweet your reply</Form.Label>
              <Form.Control as="textarea" rows={3} name="message" onChange={handleChange} />
            </Form.Group>
        <Stack>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" type="reset" disabled={flag} onClick={handleClick}>
            Save Changes
          </Button>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Replied Successfully!
        </Alert>
      </Snackbar>
        </Stack>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

// render(<ReplyForm />);




export default ReplyForm;