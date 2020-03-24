/**
 *
 * BandejaTickets
 *
 */

import React from 'react';
import { compose, withHandlers} from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import T from 'prop-types';
import config from 'config/config.development';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import Tickets from '../Tickets';
// import OneTicketDetails from '../OneTicketDetails';
import TicketsDetails from '../TicketsDetails';
import OneTicketDetails from '../OneTicketDetails';
import { Container } from '../../../ConfiguracionTicket/styledComponents';
import { propTypes } from './types';

// import {
//   StyledOneTicketDetails,// eslint-disable-line
// } from './styledComponents';
// import { debug } from 'util';

const socket = socketIOClient(config.api.socketURL);
// eslint-disable-next-line react/prefer-stateless-function
class Seguimiento extends React.Component {

  componentWillUnmount () {
    socket.off('obtenerMensajesChat')
    socket.close() 
  }
  
  render(){
    const {
      bandejaTickets,
      handleChangeDepartamento,
      handleChangeTabDetails,
      handleChangePlantilla,
      handleChangeInputFile,
      handleChangeComponent,
      handleSendTicket,
      getDepartamentos,
      chatActions,
      deleteFile,
      chatMounted,
      mensajeValue,
      onChangeTextFieldEscribirMensaje,
      onClickEnviarMensaje,
      downloadTicketFile,
      getTickets,
      // eslint-disable-next-line react/prop-types
      openModal,
      tipoJustificacion,
      // eslint-disable-next-line react/prop-types
      numUsuarioLogeado,
      notificacion,
      nomUsuarioLogeado,
      plazaUsuarioLogeado,
      plazasAutorizadas,
      idRolUsuarioLogeado,
      modal,
      cerrarModal,
      // eslint-disable-next-line react/prop-types
      valueTextModal,
      // eslint-disable-next-line react/prop-types
      estatusTicketSelected,
      tabSelected,// eslint-disable-line
      // eslint-disable-next-line react/prop-types
      imagenAvatar,
      setTime,
      // eslint-disable-next-line react/prop-types
      etapasEstatus,
      // segundos,
      // eslint-disable-next-line react/prop-types
      setIndiceEtapa,
    } = this.props;
  
    let indiceEtapa = '';
    
    if(bandejaTickets.ticketSelected.etapas !== undefined){
      const arrEtapas = JSON.parse(JSON.stringify(bandejaTickets.ticketSelected.etapas))
      for(let x=0; x< arrEtapas.length;x+=1){
        
        if((arrEtapas[x].IdUsuario === numUsuarioLogeado || arrEtapas[x].rolUsuarioSelected === idRolUsuarioLogeado) && arrEtapas[x].CerradaPorRegla === false && bandejaTickets.ticketSelected.EtapaSiguiente === arrEtapas[x].IdEtapa){
          indiceEtapa = x;
          break;
        }
      }

      if (bandejaTickets.EstatusTicketSelected === 3) {
        setIndiceEtapa(indiceEtapa)
      }
      
    }
    

    switch (bandejaTickets.tipoContenedor) {
      case 1:
        return(
          <Grid item xs={12} sm={7} md={7} style={{height: '100%'}}>
            <Container flexDirection="column" style={{height: '100%'}}>
              <Paper style={{height: '100%', overflowY: 'auto'}}>
                <AppBar color="inherit" position="static" style={{height: '100%', borderTopLeftRadius: '8px', borderBottomLeftRadius:  '6px'}}>
                  <TicketsDetails 
                    getDepartamentos={getDepartamentos}
                    ticketsDetails={bandejaTickets.ticketsDetails} 
                    handleChangeDepartamento={handleChangeDepartamento}
                    handleChangePlantilla={handleChangePlantilla}
                    handleChangeInputFile={handleChangeInputFile}
                    handleSendTicket={handleSendTicket}
                    deleteFile={deleteFile}
                    getTickets={getTickets}
                    notificacion={notificacion}
                    modal={modal}
                    cerrarModal={cerrarModal}
                    handleChangeComponent={handleChangeComponent}
                    nomUsuarioLogeado={nomUsuarioLogeado}
                    plazaUsuarioLogeado={plazaUsuarioLogeado}
                    plazasAutorizadas={plazasAutorizadas}
                    tabSelected={tabSelected}
                    numUsuarioLogeado={numUsuarioLogeado}
                    // getTime ={getTime}
                  >
                  </TicketsDetails> 
                </AppBar>
              </Paper>
            </Container>
          </Grid>
        )
      case 2:
        return(
          <Grid item xs={12} sm={7} md={7} style={{height: '100%'}}>
            <Container flexDirection="column" style={{height: '100%'}}>
              <Paper 
                style={{
                  height: '100%',
                  position:'relative',
                  // marginBottom: '5px',
                }}
              >
                {/* <AppBar color="inherit" position="static" style={{height: '100%', borderTopLeftRadius: '8px', borderBottomLeftRadius:  '6px'}}> */}
                <AppBar color="inherit" position="static" style={{borderTopRightRadius: '8px', height: '48px',marginBottom: '8px'}}>
                  <Tabs value={bandejaTickets.tabSelectedDetails} onChange={handleChangeTabDetails} variant="fullWidth" indicatorColor='primary'>
                    <Tab label="Detalles del Ticket" id="0" style={ {fontSize:9} }/>
                    <Tab label="Seguimiento del Ticket" id="1" style={ {fontSize:9} }/>
                    <Tab label="Reporte Seguimiento" id="2" style={ {fontSize:9} }/>
                  </Tabs>
                </AppBar>

                
                <OneTicketDetails
                  onClickEnviarMensaje={onClickEnviarMensaje}
                  handleChangeDepartamento={handleChangeDepartamento}
                  onChangeTextFieldEscribirMensaje={onChangeTextFieldEscribirMensaje}

                  estatusTicketSelected={estatusTicketSelected}
                  numUsuarioLogeado={numUsuarioLogeado}
                  nomUsuarioLogeado={nomUsuarioLogeado}
                  plazasAutorizadas={plazasAutorizadas}
                  idRolUsuarioLogeado = {idRolUsuarioLogeado}
                  openModal={openModal} 
                  tipoJustificacion={tipoJustificacion}
                  chatActions={chatActions}
                  chatMounted={chatMounted}
                  mensajesChat={bandejaTickets.ticketsDetails.mensajes}
                  // ticketsDetails={bandejaTickets.ticketsDetails}
                  indiceEtapa={indiceEtapa}
                  tabSelectedDetails={bandejaTickets.tabSelectedDetails}
                  idTicketSelected={bandejaTickets.idTicketSelected}
                  mensajeValue={mensajeValue}
                  usuarioPriorizador = {bandejaTickets.ticketSelected.IdPriorizador}
                  valueTextModal={valueTextModal}
                  ticketSelected={bandejaTickets.ticketSelected}
                  tabSelected={tabSelected}
                  empleadosAsignarA={bandejaTickets.empleadosAsignarA}
                  prioridades={bandejaTickets.prioridades}
                  empleadoAsignado={bandejaTickets.empleadoAsignado}
                  prioridadAsignada={bandejaTickets.prioridadAsignada}
                  downloadTicketFile={downloadTicketFile}
                  imagenAvatar = {imagenAvatar}
                  setTime ={setTime}
                  tabEtapas = {bandejaTickets.tabEtapas}
                  etapasEstatus={etapasEstatus}
                  segundos={bandejaTickets.segundos}
                  setIndiceEtapa ={setIndiceEtapa}
                  // indiceEtapaSeleccionado = {indiceEtapa}
                  
                />
                {/* </AppBar> */}
                
              </Paper>
            </Container>
          </Grid>
        );
      case 0 :
        return null;

      default:
        return null;
    }
  }
}


Seguimiento.propTypes = {
  bandejaTickets: T.object,
  handleChangeDepartamento: T.func,
  handleChangeTabDetails: T.func,
  handleChangePlantilla: T.func,
  deleteFile: T.func,
  getDepartamentos: T.func,
  chatActions: T.object,
  chatMounted: T.bool,
  mensajeValue: T.string,
  numUsuarioLogeado: T.number,
  nomUsuarioLogeado: T.string,
  tipoJustificacion: T.string,
  plazaUsuarioLogeado: T.number,
  plazasAutorizadas:   T.array,
  idRolUsuarioLogeado: T.number,
  onChangeTextFieldEscribirMensaje: T.func,
  onClickEnviarMensaje: T.func,
  handleChangeInputFile: T.func,
  handleChangeComponent: T.func,
  handleSendTicket: T.func,
  downloadTicketFile: T.func,
  getTickets: T.func,
  notificacion: T.func,
  modal: T.bool,
  cerrarModal: T.func,
  setTime: T.func,
}

function BandejaTickets(props) {
  const {
    ticketSelect,
    toggleTipoTicket,
    bandejaTickets,
    handleChangeDepartamento,
    getTickets,
    handleChangeTabDetails,
    handleChangePlantilla,
    handleChangeComponent,
    handleSendTicket,
    getDepartamentos,
    handleChangeInputFile,
    deleteFile,
    // handleChangeInput,
    generarTicket,
    onClickTicketSelected,
    // eslint-disable-next-line no-unused-vars
    chatActions,
    // eslint-disable-next-line no-unused-vars
    onChangeTextFieldEscribirMensaje,
    // eslint-disable-next-line no-unused-vars
    onClickEnviarMensaje,
    reqTicketsComentarios,
    openModal,// eslint-disable-line
    numUsuarioLogeado,
    nomUsuarioLogeado,
    plazaUsuarioLogeado,
    plazasAutorizadas,
    idRolUsuarioLogeado,
    estatusTicketSelected,// eslint-disable-line
    downloadTicketFile,
    onChangeTab,
    notificacion,
    modal,
    cerrarModal,
    imagenAvatar,
    setTime,
    getTime,
    // tabEtapas,
    onClickTicketEtapas,
    getEtapasEstatus,
    setIndiceEtapa // eslint-disable-line
  } = props;
  

  const styles = ({
    fab: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      backgroundColor: "#232f34",
      color: "#ffffff",
    },
  });
  
  return (
    
    <div style={{height: '90%'}}>
      <Container container item xs={12} sm={12} md={12} style={{ display: 'inline-block', height: '100%', paddingTop: '5px'}}>
        <Grid container style={{height: '100%',paddingRight:'3px' }}>
          <Grid item xs={12} sm={5} md={5} style={{height: '100%', paddingRight: '4px',paddingLeft:'3px'}}>
            <Container flexDirection="column" style={{height: '100%', position: 'relative'}}>
              <Paper style={{height: '100%', overflowY: 'auto'}}>
                <AppBar color="inherit" position="static" style={{borderTopRightRadius: '8px', width: '100%'}}>
                  <Tabs value={bandejaTickets.tabSelected} indicatorColor='primary'>
                    <Tab label="Enviados" onClick={onChangeTab(1)} style={{minWidth: '33.33%', width: '33.33%', fontSize:9}}/>
                    <Tab label="Asignados" onClick={onChangeTab(2)} style={{minWidth: '33.33%', width: '33.33%', fontSize:9}}/>
                    <Tab label="Pendientes por Asignar" onClick={onChangeTab(3)} style={{minWidth: '33.33%', width: '33.33%', fontSize:9}}/>
                  </Tabs>
                </AppBar>
                <Tickets 
                  reqTicketsComentarios={reqTicketsComentarios}
                  tipo={bandejaTickets.tabSelected}
                  toggled={bandejaTickets.tipoSelected} 
                  toggleTipo={toggleTipoTicket}
                  ticketSelected={ticketSelect}
                  tickets={bandejaTickets.tickets}
                  onClickTicketSelected={onClickTicketSelected}
                  idTicket={bandejaTickets.idTicketSelected}
                  getTime={getTime}
                  onClickTicketEtapas ={onClickTicketEtapas}
                  getEtapasEstatus = {getEtapasEstatus}
                  
                />
                {bandejaTickets.tabSelected !== 0 ? null : <Fab style={styles.fab} color="primary" onClick={generarTicket}>
                  <AddIcon />
                </Fab>}
              </Paper>
            </Container>
          </Grid>
          
          <Seguimiento
            numUsuarioLogeado={numUsuarioLogeado}
            nomUsuarioLogeado={nomUsuarioLogeado}
            plazaUsuarioLogeado={plazaUsuarioLogeado}
            plazasAutorizadas={plazasAutorizadas}
            idRolUsuarioLogeado={idRolUsuarioLogeado}
            openModal={bandejaTickets.ticketsDetails.openModal}
            tipoJustificacion={bandejaTickets.ticketsDetails.tipoJustificacion}
            chatActions={chatActions}
            mensajeValue={bandejaTickets.ticketsDetails.mensajeValue}
            valueTextModal={bandejaTickets.ticketsDetails.valueTextModal}
            chatMounted={bandejaTickets.ticketsDetails.chatMounted}
            onClickEnviarMensaje={onClickEnviarMensaje}
            bandejaTickets ={bandejaTickets}
            handleChangeDepartamento={handleChangeDepartamento}
            handleSendTicket={handleSendTicket}
            getDepartamentos={getDepartamentos}
            handleChangeTabDetails={handleChangeTabDetails}
            handleChangePlantilla={handleChangePlantilla}
            idTicketSelected={bandejaTickets.idTicketSelected}
            handleChangeComponent={handleChangeComponent}
            handleChangeInputFile={handleChangeInputFile}
            deleteFile={deleteFile}
            getTickets={getTickets}
            onChangeTextFieldEscribirMensaje={onChangeTextFieldEscribirMensaje}
            estatusTicketSelected={bandejaTickets.EstatusTicketSelected}
            tabSelected={bandejaTickets.tabSelected}
            empleadoAsignado={bandejaTickets.empleadoAsignado}
            prioridadAsignada={bandejaTickets.prioridadAsignada}
            notificacion={notificacion}
            downloadTicketFile={downloadTicketFile}
            modal={modal}
            cerrarModal={cerrarModal}
            imagenAvatar={imagenAvatar}
            setTime = {setTime}
            getTime = {getTime}
            tabEtapas = {bandejaTickets.tabEtapas}
            onClickTicketEtapas ={onClickTicketEtapas}
            getEtapasEstatus = {getEtapasEstatus}
            etapasEstatus ={props.bandejaTickets.etapasEstatus}
            segundos={bandejaTickets.segundos}
            setIndiceEtapa ={setIndiceEtapa}
            
          />
        </Grid>
      </Container>
    </div>
  );
}

BandejaTickets.propTypes = propTypes;

export default compose(
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
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS ]===================================
      // cambiarEstatus: ( idTicketSelected, status, tipo, IdPlantilla) => () => {

      //   const actionId = 'APP/CONTAINER/TABLEROS/CAMBIAR_ESTATUS_ACTION';

      //   dispatch({
      //     type: 'APP/CONTAINER/TABLEROS/CAMBIAR_ESTATUS_ACTION',
      //     data: {
      //       IdTicket: idTicketSelected,
      //       IdEstatus: status,
      //       Tipo: tipo,
      //       IdPlantilla,
      //     },
      //     actionId,
      //   })
        
      // },

      tabEtapasSelect: (event) => {
        
        const actionId = 'APP/CONTAINER/TABLEROS/TAB_ETAPAS_SELECT';
        
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/TAB_ETAPAS_SELECT',
          actionId,
          event,
        });

      },

    })
  ),
)(BandejaTickets);

