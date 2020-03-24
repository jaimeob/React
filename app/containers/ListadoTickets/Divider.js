import React from 'react';
import PropTypes from 'prop-types';// eslint-disable-line
import { withStyles } from '@material-ui/core/styles';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 10000,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  section2: {
    margin: theme.spacing.unit * 2,
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
});

function MiddleDividers() {
  return (
    <AppBar style={{backgroundColor: 'rgb(238, 238, 238)'}} position="static">
      <Toolbar>
        <Typography variant="h6" color="white" style={styles.grow}>
        Listado de servicios :
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

MiddleDividers.propTypes = {
};

export default withStyles(styles)(MiddleDividers);