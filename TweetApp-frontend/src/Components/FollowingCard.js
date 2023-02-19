import React, { useState,useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ClickableChip from './Chip';
import Button from 'react-bootstrap/Button';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function FollowingCard(props) {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const id = parseInt(decoded.jti,10);
    const [unfollow,setUnfollow] = useState();
    const navigate=useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (user) => {
      setUnfollow({userId:user});
      setOpen(true);
    };
    const handleClose = () => {
      navigate('/following');
      setOpen(false);
    };


  const handleUnfollow = async ()=>{
    console.log(token);
    console.log(unfollow);
    // console.log({userId:user});
      const res = await axios.put(`http://localhost:8080/tweet-app/unfollow/${id}`, unfollow,
        { headers: { Authorization: token }});
       
          console.log("before navigate");
          console.log(res.data);
          navigate('/following',{replace:true});
     
  }
  return (
    <>
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem > 
        <ListItemText primary = {props.props.username} />
        {/* <ClickableChip variant="primary"/> */}
        <Button variant="outline-primary" onClick={()=>{handleClickOpen(props.props.userId)}} >
            Unfollow
          </Button>
      </ListItem>
      {/* <Divider /> */}
    </List>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to Unfollow {props.props.username}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUnfollow} >
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
