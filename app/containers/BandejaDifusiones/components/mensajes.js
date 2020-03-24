/**
 *
 * Tickets
 *
 */

import React from 'react';
import T from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Mail from '@material-ui/icons/MailOutline';
import OpenMail from '@material-ui/icons/Drafts';
import Grid from '@material-ui/core/Grid';
import { withHandlers } from 'recompose';
import Divider from '@material-ui/core/Divider'; 
import UserImage from 'images/iconos/user.png';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Container } from '../../ConfiguracionTicket/styledComponents';

const FORM_HANDLERS = {}
function Mensajes(props) {
  const { 
    difusiones,
    tabSelected,
    openDifusion,
    
  } = props;
  const styles = theme => ({
    root: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    },
  });
  
  if(tabSelected === 0){
    difusiones.forEach(item => {
      item.Tipo = 0

    });

  }else{  
    difusiones.forEach(item => {
      if(item.Leido === false){
        item.Tipo =1  
      }

    });
  }
  
  if( difusiones.length !== 0){
    return (
      <div className={styles.root}>
        <Container style={{height: '100%'}}>
          <Grid item xs={12} sm={12} md={12}>
            <List dense >
              {difusiones.map(value => parseInt(value.Tipo,10) === tabSelected  && (
                <ListItem key={value.length}  button onClick={() => openDifusion(value)}>
                  <ListItemAvatar>
                    <Avatar alt={`Avatar n°${value + 1}`} src={UserImage} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Typography component="span" color="textPrimary">
                        <div>
                          <Typography component="h4" variant="subtitle2" gutterBottom>
                            Jaime Ojeda
                          </Typography>
                        </div> {value.Asunto}
                      </Typography>
                    } 
                    secondary={
                      <React.Fragment>
                        {value.FechaInsercion.substring(0,10).concat(' ',value.FechaInsercion.substring(19,11))}
                        <Typography component="span" >
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    
                    {value.Leido === true  ? <OpenMail />  :  <Mail />}
                  
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <Divider variant="inset" component="li" />

            </List>
          </Grid>
        </Container>
      </div>
    );
  } 
  return (
    <div className={styles.root}>
      <List component="nav">
        <ListItem button>
          <ListItemText primary="No se encontro ningun mensaje" />
        </ListItem>
      </List>
    </div>
  );
  
}

Mensajes.propTypes = {
  tabSelected: T.number,
  difusiones: T.array,
  openDifusion: T.func,
};



export default compose(
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS]===================================

    })
  ),
  withHandlers(FORM_HANDLERS),
)(Mensajes);
