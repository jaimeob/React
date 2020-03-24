import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const header = (props) => (
  <AppBar 
    style={styles.appbar}
    position="static"
  >              
    <Toolbar>
      <Typography
        variant="h6"
        gutterBottom 
        style={styles.typography}
      >
        {props.title}
      </Typography>
    </Toolbar>
  </AppBar>
)

const styles = {
  appbar: {
    backgroundColor: '#eeeeee',
    boxShadow: 'none',
    marginBottom: 0,
  },
  typography:{
    marginBottom: 0,
    lineHeight: 0,
  },
} 

export default header;