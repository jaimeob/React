import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton, Icon } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ImagenCampana from '../../../../images/ImagenCampana.png';

import './styles.css'

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    top	:50,
    width: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
});

function TemporaryDrawer() {
  const classes = styles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (posicion, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [posicion]: open });
  };

  const bandejaNotificaciones = () => (
    <div
      role="presentation"
      onKeyDown={toggleDrawer('right', false)}
    >
      {/* Esta parte aqui hecha es sin notificaciones */}
      <img
        className ="center"
        src={ImagenCampana}
        alt="Imagen_Campana"
        style={{ width:'200px',height: '200px'}}
      />
      <Typography  
        color="primary"
        variant="h6"
        className={classes.grow}
        style={{
          padding:'10px 20px 0px 70px',
        }}
      >
                ¡Sin notificaciones!
      </Typography>
 
      <Typography  
        color="primary"
        variant="subtitle1"
        className={classes.grow}
        style={{
          padding:'15px 20px 0px 70px',
        }}
      >
                      Una vez que se generen, 
      </Typography>
      <Typography  
        color="primary"
        variant="body1"
        className={classes.grow}
        style={{
          padding:'0px 20px 0px 50px',
        }}
      >
                      se mostrarán en este apartado
      </Typography>



      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  // const fullList = side => (
  //   <div
  //     className={classes.fullList}
  //     role="presentation"
  //     onClick={toggleDrawer(side, false)}
  //     onKeyDown={toggleDrawer(side, false)}
  //   >
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem button key={text}>
  //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
  //           <ListItemText primary={text} />
  //         </ListItem>
  //       ))}
  //     </List>
  //   </div>
  // );

  return (
    <div>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton> 
      <IconButton color = "inherit" onClick={toggleDrawer('right', true)} >
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Drawer
        PaperProps={{
          style: {
            marginTop: 65,
            width:300,
            zIndex:0,
          },
        }}
        anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        <IconButton 
          size="small" 
          onClick={toggleDrawer('right', false)}
          style={{
            padding: 0,
            width: 25,
            left: 'auto',
            right: '-270px',
          }}>
          <ClearIcon />
        </IconButton>

        {bandejaNotificaciones()}

      </Drawer>
      
    </div>
  );
}

export default withStyles(styles)(TemporaryDrawer);