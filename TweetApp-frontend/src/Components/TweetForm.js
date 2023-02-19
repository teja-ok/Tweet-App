import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './ReplyForm.css';
import { Navigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TweetForm() {
    const token = localStorage.getItem('token');
    var decoded = jwt_decode(token);
    var tokenEmail = decoded.sub;
    const [show, setShow] = useState(true);
    const [tweet,setTweet] = useState({username:tokenEmail});
    const [flag,setFlag] = useState(true);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

  const handleClose2 = () => {
    navigate('/home',{replace:true});
  };
  const handleShow = () => setShow(true);
  const handleTweet = ()=>{
    setFlag(false);
    axios.post(`http://localhost:8080/tweet-app/post/tweet`,tweet,
    { headers: { Authorization: token }})
    .then(res=>{
      setTweet({username:tokenEmail})
      setOpen(true);
    console.log(tweet);
      // navigate('/home');
    })
    console.log(tweet);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }
  const handleChange=(e)=>{
    console.log(tweet);
    setTweet({...tweet,[e.target.name]:e.target.value});
    if(e.target.value==="")
    setFlag(true);
    else
    setFlag(false);
}

    return (  
        <>
        {/* <Button variant="primary" onClick={handleShow}>
        Reply
      </Button> */}

      <Modal show={show} onHide={handleClose}>
      
       <div className="message">
        <h6>{tokenEmail}</h6>
        </div>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className='TweetYourReply'>Tweet</Form.Label>
              <Form.Control as="textarea" rows={3} name="message" onChange={handleChange} />
            </Form.Group>
            <Stack spacing={1} sx={{ width: '50%'}}  >
            <Button variant="primary" type="reset" disabled={flag} onClick={handleTweet}>
            Tweet
          </Button>
            <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Tweet Posted Successfully!
        </Alert>
      </Snackbar>
      </Stack>
          </Form>
        </Modal.Body>
      </Modal>
      </>
    );
}

export default TweetForm;