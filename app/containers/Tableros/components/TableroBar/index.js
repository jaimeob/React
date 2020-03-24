/* eslint-disable react/no-array-index-key */
/**
 *
 * Funcionalidad: Tablero secundaria de tickets y difusiones
 *
 */

import React from 'react';
import T from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { toSafeInteger } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grey from '@material-ui/core/colors/grey'
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TicketIcon from '../../svg/chat.svg';
import EmailIcon from '../../svg/email.svg';
// import EmailIconB from '../../svg/emailb.svg';
// import TicketIconB from '../../svg/chatb.svg';

function TableroBar(props) {
  const { 
    isToggle,
    titulo,
    isMensaje,
    text,
    isDifusions,
    numDifusions,
    numTickets,
    onChangeMenu,
  } = props;

  const styles = {
    grow: {
      flexGrow: 1,
      fontSize:20,
    },
    ticketColor: {
      color: '#263238',
    },
    mensajesColor: {
      color: '#263238',
    },
  };

  return (
    <div>
      <AppBar style={{backgroundColor: Grey[200]}} position="static">
        <Toolbar variant="dense" style={{paddingLeft: 8}}>
          {
            isToggle !== -1 ? 
              <IconButton onClick={onChangeMenu(-1)}>
                <ArrowBack/>
              </IconButton> : 
              null
          }
          <Typography variant="h4" color="primary" style={styles.grow}>
            {titulo}
          </Typography>
          <Button size="small" onClick={onChangeMenu(0)}>
            {isToggle === 1 ? (
              <img src={TicketIcon} alt="" style={{ paddingRight: 6 }} />
            ) : (
              <img src={TicketIcon} alt="" />
            )}
            <Typography style={styles.ticketColor}>
              {isMensaje ? '' : text}
              <sub>&nbsp;({numTickets})</sub>
            </Typography>
          </Button>
          <Button size="small" onClick={onChangeMenu(1)}>
            {isDifusions === 0 ? (
              <img src={EmailIcon} alt="" style={{ paddingRight: 6 }} />
            ) : (
              <img src={EmailIcon} alt="" />
            )}
            <Typography style={styles.mensajesColor}>
              {isMensaje ? text : ''}
              <sub>&nbsp;({numDifusions})</sub>
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )  
}
TableroBar.propTypes = {
  isToggle: T.number,
  titulo: T.string,
  isMensaje: T.number,
  text: T.string,
  isDifusions: T.number,
  numDifusions: T.number,
  numTickets: T.number,
  onChangeMenu: T.func,
};

export default compose(
  withHandlers({
    onChangeMenu: props => (id) => () => {
      const {
        changeMenu,
        getTickets,
      } = props;
      changeMenu(id);
      if(toSafeInteger(id) === 0){
        getTickets(2)
      }
    },
  })
)(TableroBar);
