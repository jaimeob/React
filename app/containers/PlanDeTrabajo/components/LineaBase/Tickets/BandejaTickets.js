/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prefer-stateless-function */
/**
 *
 * TICKETS
 *
 */
import React from 'react';
import T from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles  } from '@material-ui/core/styles';
import '@zendeskgarden/react-tables/dist/styles.css';
import {
  Grid,
  Tab,
  Tabs,
  AppBar,
  Paper,

} from '@material-ui/core';
import { Container } from '../../../../ConfiguracionTicket/styledComponents';
import TicketDetalle from './TicketDetalle';
import '../style.css';

const styles = theme => ({
  typography: {
    useNextVariants: true,
  },
  textField:{
    root:{
      padding:'0px',
      margin:'0px',
      width:'100%',
    },
    padding: '0px 13px 0px 13px',
    marginTop: '0px',
    marginBottom: '0px',
    width:'100%',
  },
  button:{
    color:'green',
    margin: '1vh 1vh',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding:0,
  },
  formControl: {
    margin: '10px 40px 10px 40px',
    minWidth: 200,
    maxWidth: 200,
  },
});

class Tickets extends React.Component {

  render() {
    const {
      bandejaTickets,
      tabSelected,
      estatusTicketSelected,
      plazasAutorizadas,
      chatActions,
      handleChangeTabDetails,
      setMensajesChat,
      onChangeTextFieldEscribirMensaje,
      numUsuarioLogeado,
      nomUsuarioLogeado,
      IdTicket,
      IdTicketLineaBase,
      // imagenAvatar,
    } = this.props;

    return (

      <Grid item xs={12} sm={12} md={12} style={{height: '100%'}}>
        <Container flexDirection="column" style={{height: '100%'}}>
          <Paper 
            style={{
              height: '80%',
              position:'absolute',
              // marginBottom: '5px',
            }}
          >
            {/* onChange={handleChangeTabDetails} */}
            {/* <AppBar color="inherit" position="static" style={{height: '100%', borderTopLeftRadius: '8px', borderBottomLeftRadius:  '6px'}}> */}
            <AppBar color="inherit" position="static" style={{borderTopRightRadius: '8px', height: '48px',marginBottom: '8px'}}>
              <Tabs value={bandejaTickets.tabSelectedDetails} onChange={handleChangeTabDetails} variant="fullWidth" indicatorColor='primary'>
                <Tab label="Detalles del Ticket" id="0" style={{fontSize:14}}/>
                <Tab label="Seguimiento del Ticket" id="1" style={{fontSize:14}}/>
              </Tabs>
            </AppBar>
               

            <TicketDetalle
              // onClickEnviarMensaje={onClickEnviarMensaje}
              // handleChangeDepartamento={handleChangeDepartamento}
              onChangeTextFieldEscribirMensaje={onChangeTextFieldEscribirMensaje}
              estatusTicketSelected={estatusTicketSelected}
              numUsuarioLogeado={numUsuarioLogeado}
              nomUsuarioLogeado={nomUsuarioLogeado}
              plazasAutorizadas={plazasAutorizadas}
              // idRolUsuarioLogeado = {idRolUsuarioLogeado}
              // tipoJustificacion={tipoJustificacion}
              chatActions={chatActions}
              chatMounted={bandejaTickets.ticketsDetails.chatMounted}
              mensajeValue={bandejaTickets.ticketsDetails.mensajeValue}
              mensajesChat={bandejaTickets.ticketsDetails.mensajes}
              ticketsDetails={bandejaTickets.ticketsDetails}
              tabSelectedDetails={bandejaTickets.tabSelectedDetails}
              idTicketSelected={bandejaTickets.ticketSelected.IdTicket}
              usuarioPriorizador = {bandejaTickets.ticketSelected.IdPriorizador}
              valueTextModal={bandejaTickets.ticketsDetails.valueTextModal}
              ticketSelected={bandejaTickets.ticketSelected}
              tabSelected={tabSelected}
              // empleadosAsignarA={bandejaTickets.empleadosAsignarA}
              // imagenAvatar = {imagenAvatar} CHECAR
              tabEtapas = {bandejaTickets.tabEtapas}
              setMensajesChat = {setMensajesChat}
              IdTicket = {IdTicket}
              IdTicketLineaBase = {IdTicketLineaBase}

            />
          </Paper>
        </Container>
      </Grid>
    );
  }
}

Tickets.propTypes = {
  bandejaTickets:T.object,
  // tabSelected,
  // estatusTicketSelected,
  // plazasAutorizadas,
  // chatActions,
  // handleChangeTabDetails,
  // setMensajesChat,
  // onChangeTextFieldEscribirMensaje,
  // numUsuarioLogeado,
  // nomUsuarioLogeado,
  // IdTicketLineaBase,
};

export default compose(
  withStyles(styles),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      getArreglo: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_ARREGLO_COMPONENTES_LINEA_BASE_ACTION',
        })
      },
      cambiarStepper: (data) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_STEPPER_ACTION',
          data,
        })
      },
    })
  ))(Tickets);
