import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate= useNavigate();
    const handleLogout = () => {
      localStorage. removeItem('token');
        navigate('/',{replace:true});
    }
    const handleCancel = () => {
      navigate('/home',{replace:true});
  }
  return (
    <center>
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            TWEET APP
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Do you really want to logout?
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLogout}>Logout</Button>
        <Button size="small" onClick={handleCancel}>Cancel</Button>
      </CardActions>
    </Card>
    </center>
  );
}
