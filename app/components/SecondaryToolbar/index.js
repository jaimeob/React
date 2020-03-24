
import React from 'react';
import noop from 'lodash/noop';
import T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core/styles';
import Grey from '@material-ui/core/colors/grey';
import {
  compose,
  setPropTypes,
  defaultProps,
} from 'recompose';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconoPortafolio from 'images/iconos/iconoPortafolio.svg';
import { AppBar, Toolbar, Grid, IconButton, Icon, Typography } from '@material-ui/core';


export const SecondaryToolbar = compose(
  withStyles(() => ({
    appbar: {
      backgroundColor: Grey[200],
    },
    listItemText:{
      fontSize:'14px',
    },
  })),
  setPropTypes({
    onClickBackButton: T.func,
    leftIcon: T.string,
    title: T.string,
    classes: T.object,
    showIcon: T.bool,
    secondIcon:T.bool,
    colorPortafolio:T.string,
    portafolioNombre:T.string,
  }),
  defaultProps({
    onClickBackButton: noop,
    leftIcon: 'menu',
    title: '',
    classes: {},
    showIcon: false,
    secondIcon:false,
    colorPortafolio:{hex:""},
    portafolioNombre:"",
  }),
)((props) => {
  const {
    onClickBackButton,
    leftIcon,
    title,
    classes,
    showIcon,
    secondIcon,
    colorPortafolio,
    portafolioNombre,
  } = props;
  return (
    <AppBar
      position="static"
    >
      <Toolbar
        variant="dense"
        disableGutters
        className={classes.appbar}
      >
        <Grid
          container
          alignItems="center"
          justify="flex-start"
        >
          <Grid
            item
          >
            {showIcon && (
              <IconButton
                onClick={onClickBackButton}
              >
                <Icon>{leftIcon}</Icon>
              </IconButton>
             
             
            )}
          </Grid>
          {secondIcon  && (

            <List style={{padding:'0 0 0 0'}} >
              <ListItem style={{padding:'0 0 0 0'}} >
                <ListItemIcon style={{padding:'0 0 0 0',marginRight:'-140px'}} >
                  <img src={IconoPortafolio} alt="" style={{marginLeft:'-12px',width:'25%',backgroundColor:colorPortafolio, borderRadius:'12px'}} /> 
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" primary={portafolioNombre}  classes={{primary:classes.listItemText}}/>
              </ListItem>
            </List>
            
            
          )}
          <Grid
            item
          > 
            <Typography
              variant="h5"
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
});

export default SecondaryToolbar;
