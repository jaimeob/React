/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import { Divider, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
// import Button from '@material-ui/core/Button';
import Clock from '@material-ui/icons/QueryBuilder';
import Timer from "react-compound-timer";
import { connect } from 'react-redux';
import { compose, withHandlers} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import {
  startCase,
  // uniqueId,
} from 'lodash';
// import BotonCancelar from 'components/BotonCancelar';
// import BotonSuccess from 'components/BotonSuccess';
import { Container } from '../../../../ConfiguracionTicket/styledComponents';
import DatosPlantilla from "./DatosPlantilla";

// import ModalJustificacion from '../ModalJustificacion';
// import AsignarA from '../AsignarA';
// import TablaEtapas from './tablaEtapas';


import Chat from './Chat';
// import {propTypes} from './types';

const FORM_HANDLERS = {}

const styles = theme => ({
  root: {
    width: '100%',
    height: 'calc(100% - 58px)',
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: '4px',
    overflowY: 'auto',
    // marginTop:'7px',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  avatar: {
    backgroundColor: '#263238 !important',
  },
  paper: {
    paddingLeft: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 2,
  },
  paper2: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    margin: 'auto',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
  },
  TextField: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    margin: theme.spacing.unit * 1,
  },
  formControll: {
    margin: theme.spacing.unit,
    minWidth: 280,
  },
  list: {
    paddingLeft: theme.spacing.unit * 2,
  },
  itemTextL: {
    textAlign: 'left', 
    margin: 'auto', 
    width: '49%', 
    display: 'inline-block', 
    fontSize: '0.85em',
  },
  itemTextR: {
    textAlign: 'right', 
    margin: 'auto', 
    width: '49%', 
    display: 'inline-block', 
    fontSize: '0.85em',
  },
  iconSmall: {
    fontSize: 20,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
export class TicketDetalle extends React.Component{


  render(){
    const { 
      classes,
      tabSelectedDetails,
      idTicketSelected,
      chatActions,
      chatMounted,
      mensajesChat,
      onChangeTextFieldEscribirMensaje,
      mensajeValue,
      valueTextModal,
      numUsuarioLogeado,
      plazasAutorizadas,
      nomUsuarioLogeado,
      ticketSelected,
      estatusTicketSelected,
      tabSelected,
      tabEtapas,
      indiceEtapa,
      setMensajesChat,
      IdTicket,
      IdTicketLineaBase,
    } = this.props;
   
    const upperText = (nombre) =>
      nombre.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

      
    switch (tabSelectedDetails) {
      case 0:
        return(
          <div className={classes.root}>
            <Grid item container md={12} sm={12} xs={12} style={{ height: '100%'}}>
              {tabEtapas ===  false && Object.entries(ticketSelected).length !== 0 && (
                <Container flexDirection="column">          
                  <Container flexDirection="row" className={classes.list} style={{paddingTop:-5,paddingBottom:-5}}>
                    <ListItem 
                      key={`list_${ticketSelected.IdTicket}`}
                      className={styles.nested}>
                      <Avatar className={classes.avatar}>
                        {ticketSelected.SoloNombre.match(/\b(\w)/g).join('').toUpperCase()}
                      </Avatar>
                      <ListItemText 
                        inset 
                        primary={
                          `Folio: <${ticketSelected.IdTicket}> - 
                        ${upperText(ticketSelected.NomSolicitante)}`
                        } 

                      />
                    </ListItem>
                    
                  </Container>
                 
                  {ticketSelected.etapas !== undefined && indiceEtapa !== ''?
                    <Typography
                      style={{
                        paddingLeft:'40px',
                        fontWeight:'bold',
                        fontSize:'15px',
                      }}
                      variant="body2"
                      gutterBottom
                    >
                      
                      {`Etapa: ${startCase(ticketSelected.etapas[indiceEtapa].Etapa)}`}
                    </Typography> : null} 
                  
                  <Divider />
                                
                  {ticketSelected.IdTicket ?
                    <DatosPlantilla 
                      datos={ticketSelected} 
                      inhabilitado={1}
                      especiales={0}
                      tabSelected={tabSelected}
                    />
                    : null}
                </Container>
              )} 
            </Grid>
          </div>
        );
      case 1:
        return(
          <div className={classes.root}>
            <Chat
              tabSelected={tabSelected}
              numUsuarioLogeado={numUsuarioLogeado}
              nomUsuarioLogeado={nomUsuarioLogeado}
              estatusTicketSelected={estatusTicketSelected}
              valueTextModal={valueTextModal}
              // openModal={openModal}
              mensajesChat={mensajesChat}
              chatMounted={chatMounted}
              chatActions={chatActions}
              idTicketSelected={idTicketSelected}
              onChangeTextFieldEscribirMensaje={onChangeTextFieldEscribirMensaje}
              mensajeValue={mensajeValue}
              // onClickEnviarMensaje={onClickEnviarMensaje}
              ref={(ins) => { this.chatRef = ins; }}
              // imagenAvatar = {imagenAvatar}
              indiceEtapa={indiceEtapa}
              setMensajesChat = {setMensajesChat}
            />
          </div>
        );
    
      default:
        return null;
    }
  }
}

// TicketDetalle.propTypes = propTypes;


export default compose(
  withStyles(styles),
  withHandlers({
    onChangeTab: (props) => (tab) => () => {
      const {
        getTickets,
        bandejaTickets: {
          tabSelected,
        },
      } = props;
      if(tab !== (tabSelected + 1))
        getTickets(tab);
    },
  }),
  connect(
    null,
    (dispatch) => ({
      dispatch,
      cambiarEstatus: (ticketSelected, tipo) => () => {       
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_ESTATUS_ACTION',
          ticketSelected,
          tipo,
        })
      }, 
    })
  ),
  withHandlers(FORM_HANDLERS),
)(TicketDetalle);
