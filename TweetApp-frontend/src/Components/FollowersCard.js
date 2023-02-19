import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import NavigationBar from './NavigationBar';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function FollowersCard(props) {
    const user_name = "@rameswara_Teja";
  return (
    <>
    <NavigationBar />
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button divider> 
        <ListItemText primary = {props.props.username} />
      </ListItem>
      {/* <Divider /> */}
    </List>
    </>
  );
}
