/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import { Divider, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
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
import BotonCancelar from 'components/BotonCancelar';
import BotonSuccess from 'components/BotonSuccess';
import { Container } from '../../../ConfiguracionTicket/styledComponents';
import DatosPlantilla from '../DatosPlantilla';
import DatosPlantillaEspeciales from '../DatosPlantillaEspeciales';

import ModalJustificacion from '../ModalJustificacion';
import AsignarA from '../AsignarA';
import TablaEtapas from './tablaEtapas';


import Chat from '../Chat';
import {propTypes} from './types';

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
export class OneTicketDetails extends React.Component{

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
      onClickEnviarMensaje,
      openModal,
      tipoJustificacion,
      valueTextModal,
      numUsuarioLogeado,
      plazasAutorizadas,
      nomUsuarioLogeado,
      idRolUsuarioLogeado,
      ticketSelected,
      estatusTicketSelected,
      tabSelected,
      empleadosAsignarA,
      prioridades,
      prioridadAsignada,
      empleadoAsignado,
      downloadTicketFile,
      imagenAvatar,
      // setTime,  
      cambiarEstatus,
      autorizarTicket,
      finalizarTicket,
      handleClose,
      onChangeTextModal,
      onUploadFile,
      onClickEnviarMensajeModal,
      tabEtapas,
      indiceEtapa,
      etapasEstatus,
      segundos,
      // setIndiceEtapa,
      indiceEtapaSeleccionado,
    } = this.props;

    console.log(this.props,"PROPISA PAPA TABLEROS");
    

    const upperText = (nombre) =>
      nombre.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      
    switch (tabSelectedDetails) {
      case 0:
        return(
          <div className={classes.root}>
            <Grid item container md={12} sm={12} xs={12} style={{ height: '100%'}}>
              {tabEtapas ===  false  && (
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
   
                        secondary={
                          <React.Fragment>
                            <Typography 
                              component='span' 
                              className={classes.itemTextL}
                            >
                              {ticketSelected.Nombre}&nbsp;&nbsp;{ticketSelected.Fecha}
                            </Typography>
                            <Typography 
                              component='span' 
                              className={classes.itemTextR}
                            >
                              {/* {ticketSelected.Fecha} */}
                              {estatusTicketSelected ===  3 && segundos > 0  && (
                                <Timer
                                  initialTime={segundos}
                                  // startImmediately={false}
                                >
                                  {/* <Clock   className={clsx(classes.leftIcon, classes.iconSmall)}  /> */}
                                  {() => ( 
                                    // {({ start, pause, timerState }) => (
                                    <React.Fragment>
                                      <div>
                                        <Clock color="primary"   className={clsx(classes.leftIcon, classes.iconSmall)}   style={{marginTop:2,color:"#ff9100"}} />
                                        <Timer.Days />:
                                        <Timer.Hours />:
                                        <Timer.Minutes />:
                                        <Timer.Seconds /> 
                                      </div>
                                      {/* <div>{timerState}</div> */}
                                    </React.Fragment>
                                  )}
                                </Timer>)}
                            </Typography>
                          </React.Fragment>
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
                  

                  {/* <Container flexDirection="row"  style={{fontSize:15 ,paddingLeft: 20, paddingBottom:-12}}> 
                  <div>
                        {estatusTicketSelected ===  3 && segundos > 0  && (
                          <Timer
                            initialTime={segundos}
                          >
                            {({ start, pause, timerState }) => (
                              <React.Fragment>
                                <div>
                                  <Clock   className={clsx(classes.leftIcon, classes.iconSmall)}   style={{marginTop:2}} />
                                  <Timer.Days />:
                                  <Timer.Hours />:
                                  <Timer.Minutes />:
                                  <Timer.Seconds /> 
                                </div>
                                <br />
                                <div>
                                </div>
                              </React.Fragment>
                            )}
                          </Timer>)}
                  </div>
                </Container> */}
                                
                  {/* <Container flexDirection="row" style={{ height: tabSelected === 2 ? '50%' : '70%' }}> */}
                  {ticketSelected.IdTicket ?
                    <DatosPlantilla 
                      datos={ticketSelected} 
                      downloadTicketFile={downloadTicketFile} 
                      inhabilitado={1}
                      especiales={0}
                      plazasAutorizadas={plazasAutorizadas}
                      numUsuarioLogeado={numUsuarioLogeado}
                      tabSelected={tabSelected}
                    />
                    : null}

                  {ticketSelected.IdTicket && ticketSelected.etapas !== undefined && (estatusTicketSelected !== 1
                    && estatusTicketSelected !== 2 || ticketSelected.TipoTicket === 'Plan de Trabajo') ? 
                    
                    <DatosPlantillaEspeciales 
                      datos={ticketSelected} 
                      downloadTicketFile={downloadTicketFile} 
                      inhabilitado={estatusTicketSelected === 3 && tabSelected === 1 ? 0 : 1}
                      numUsuarioLogeado={numUsuarioLogeado}
                      idRolUsuarioLogeado={idRolUsuarioLogeado}
                    />
                        
                    // </Container>
                    : null}

                  <Divider />
                  {/* CAMPOS ESPECIALES DE PLAN DE TRABAJO ------------------------------------------ -- */}
                  


                  {/* {ticketSelected.IdPlantilla > 0  && ticketSelected.etapas !== undefined ?
                    <Container flexDirection="row" style={{ height: tabSelected === 2 ? '50%' : '70%', width:'100%' }}>
                      
                      {ticketSelected.IdTicket && ticketSelected.etapas !== undefined && (estatusTicketSelected !== 1
                      && estatusTicketSelected !== 2)?
                        <DatosPlantillaEspeciales 
                          datos={ticketSelected} 
                          downloadTicketFile={downloadTicketFile} 
                          inhabilitado={estatusTicketSelected === 3 ? 0 : 1}
                          numUsuarioLogeado={numUsuarioLogeado}
                          idRolUsuarioLogeado={idRolUsuarioLogeado}
                        />
                        : null}
                    </Container>

                    :  null} */}
                
                  <Container
                    className={classes.paper} 
                    flexDirection="row"
                    justify="flex-end"
                  >
                    { indiceEtapa !== '' ? (estatusTicketSelected === 2
                    && tabSelected === 1
                    // && ((band && (IdEstatusEtapa === 3 && FechaInicio !== null) || !band)) 
                    && ticketSelected.etapas[indiceEtapa].FechaAcepto === null)
                      ?

                      <Fragment>
                        <BotonCancelar 
                          color="secondary"
                          variant="contained"
                          className={classes.button}
                          // onClick={cambiarEstatus(idTicketSelected,'Rechazar')}
                          onClick={finalizarTicket('Regresar')}
                          size="small"
                          style={{ 
                            marginLeft: '20px',
                            backgroundColor:'#FF0023',
                            color:'#F7F7F7',
                          }}
                          label="RECHAZAR"
                        > 
                        Rechazar
                        </BotonCancelar>
                        
                        <Grid container style={{width:20}}></Grid>
                        <BotonSuccess
                          color="primary"
                          variant="contained"
                          className={classes.button}
                          onClick={cambiarEstatus(idTicketSelected,'Aceptar')}
                          style={{ 
                            marginLeft: '20px',
                            backgroundColor:'#28950F',
                            color:'#F7F7F7',
                          }}
                          size="small"
                          label="ACEPTAR"
                        > 
                        Aceptar
                        </BotonSuccess>
                      </Fragment>
                      : null  : null
                    }
                    { tabSelected === 1 
                    && estatusTicketSelected === 2 
                    && idRolUsuarioLogeado === ticketSelected.IdRolAsignado 
                    && ticketSelected.FechaAutorizacion === null ?
                      <Fragment>
                        <Grid container justify="flex-end">
                          <BotonCancelar
                            color="primary"
                            variant="contained"
                            className={classes.button}
                            // onClick={cambiarEstatus(idTicketSelected,'Regresar')}
                            onClick={finalizarTicket('Rechazar')}
                            style={{ 
                              marginLeft: '20px',
                              backgroundColor:'#FF0023',
                              color:'#F7F7F7',
                            }}
                            label="RECHAZAR"
                          >
                        Rechazar
                          </BotonCancelar>
                          
                        </Grid>
                        <Grid container style={{width:20}}></Grid>
                        
                        <Grid>
                        

                          <BotonSuccess
                            color="secondary"
                            variant="contained"
                            className={classes.button}
                            onClick={autorizarTicket(idTicketSelected)}
                            style={{ 
                              marginLeft: '20px',
                              backgroundColor:'#28950F',
                              color:'#F7F7F7',
                            }}
                            label="AUTORIZAR"
                          > 
                        Autorizar
                          </BotonSuccess>
                        </Grid>
                 

                        
                      </Fragment>
                      // : indiceEtapa !== '' ?
                      // ticketSelected.etapas[indiceEtapa].FechaAcepto !== null ?
                      // tabSelected === 1 && estatusTicketSelected === 2
                      // && ticketSelected.FechaAutorizacion !== null

                      : (tabSelected === 1 && estatusTicketSelected === 2 
                      && ticketSelected.FechaAutorizacion !== null
                      && (indiceEtapa !== '' ? ticketSelected.etapas[indiceEtapa].FechaAcepto !== null : false )) || ( tabSelected === 1 
                      && estatusTicketSelected === 2 && indiceEtapa === '') ?
                        (<Button 
                          color="secondary"
                          variant="contained"
                          className={classes.button}
                          onClick={cambiarEstatus(idTicketSelected,'IniciarSeguimiento')}
                        > 
                        Iniciar Seguimiento
                        </Button>)
                        : null
                    }
                    { indiceEtapa !== '' ? 
                      estatusTicketSelected === 3
                      && tabSelected === 1
                      && ticketSelected.etapas[indiceEtapa].permitirCancelacion === true ?
                        (<BotonCancelar
                          color='#F7F7F7'
                          variant="contained"
                          className={classes.button}
                          // onClick={cambiarEstatus(idTicketSelected,'Cancelar')}
                          onClick={finalizarTicket('Cancelar')}
                          style={{ 
                            marginLeft: '20px',
                            backgroundColor:'#FF0023',
                            color:'#F7F7F7',
                          }}
                          label="CANCELAR"
                        > 
                        Cancelar
                        </BotonCancelar>) 
                        : null : null
                    }
                    <Grid style={{width:20}}></Grid>
                   
                    { tabSelected === 1 && estatusTicketSelected === 3 ?
                      (<BotonSuccess
                        color='#F7F7F7'
                        variant="contained"
                        className={classes.button}
                        // onClick={cambiarEstatus(idTicketSelected,'Cerrar')}
                        onClick={finalizarTicket('Cerrar')}
                        style={{ 

                          backgroundColor:'#FF0023',
                          color:'#F7F7F7',
                        }}
                        label="CERRAR"
                      > 
                      Cerrar
                      </BotonSuccess>)
                      :null
                    }
                   
                    { tabSelected === 0
                    && ( estatusTicketSelected === 2
                      || estatusTicketSelected === 3 ) ?
                      (<BotonCancelar
                        color='#F7F7F7'
                        variant="contained"
                        className={classes.button}
                        // onClick={cam|biarEstatus(idTicketSelected,'Cancelar')}
                        onClick={finalizarTicket('Cancelar')}
                        style={{ 
                          marginLeft: '20px',
                          backgroundColor:'#FF0023',
                          color:'#F7F7F7',
                          '&:hover': {
                            backgroundColor: 'rgb(212, 8, 36)',
                          },
                        }}
                        label="CANCELAR"
                      > 
                      Cancelar
                      </BotonCancelar>) 
                      : null
                    }
                  </Container>
              
                  {tabSelected === 2
                
                    ? <div><Divider /><AsignarA
                      empleadosAsignarA={empleadosAsignarA}
                      prioridades={prioridades}
                      prioridadAsignada={prioridadAsignada}
                      empleadoAsignado={empleadoAsignado}

                      openModal={openModal}
                      idTicketSelected={idTicketSelected}
                      onChangeTextFieldEscribirMensaje={onChangeTextFieldEscribirMensaje}
                      valueTextModal={valueTextModal}
                      numUsuarioLogeado={numUsuarioLogeado}
                      nomUsuarioLogeado={nomUsuarioLogeado}
                      tabSelected={tabSelected}
                    /></div>
                    : null}
                </Container>
              )}
              {tabEtapas ===  true && ticketSelected.etapas && (
                <TablaEtapas ticketSelected = {ticketSelected}/>
              )}
              <Container
                style={{
                  position:'fixed',
                  bottom:'0',
                }}
              >
                {/* <AppBar color="inherit" position="static" style={{borderTopRightRadius: '8px', height: '48px'}}>
                  <Tabs variant="fullWidth" value={0}>
                    <Tab icon={<TabIcon />} id="0" onClick={() => tabEtapasSelect(tabEtapas)} />
                    
                  </Tabs>
                </AppBar> */}
              </Container>
            </Grid>
                
            <ModalJustificacion
              handleClose={handleClose}
              onChangeTextModal={onChangeTextModal}
              onUploadFile={onUploadFile}
              onClickEnviarMensajeModal={onClickEnviarMensajeModal}
              ticketSelected={ticketSelected}
              open={openModal}
              tipoJustificacion={tipoJustificacion}
              valueTextModal={valueTextModal}
              idTicketSelected={idTicketSelected}
              numUsuarioLogeado={numUsuarioLogeado}
              nomUsuarioLogeado={nomUsuarioLogeado}
              tabSelected={tabSelected}
              indiceEtapa={indiceEtapa !== "" ? indiceEtapaSeleccionado :indiceEtapa}
              indiceEtapaSeleccionado = {indiceEtapa}
              imagenAvatar={imagenAvatar}
            />           
          </div>
        );
      case 1:
        return(
          <div className={classes.root}>
            {/*           
            <Container className={classes.paper} style={{ marginTop: '6px' }}>
              <Typography variant="h6">
                Detalle de Ticket 2
              </Typography>
            </Container>
            <Divider /> */}
            <Chat
              tabSelected={tabSelected}
              numUsuarioLogeado={numUsuarioLogeado}
              nomUsuarioLogeado={nomUsuarioLogeado}
              estatusTicketSelected={estatusTicketSelected}
              valueTextModal={valueTextModal}
              openModal={openModal}
              mensajesChat={mensajesChat}
              chatMounted={chatMounted}
              chatActions={chatActions}
              idTicketSelected={idTicketSelected}
              onChangeTextFieldEscribirMensaje={onChangeTextFieldEscribirMensaje}
              mensajeValue={mensajeValue}
              onClickEnviarMensaje={onClickEnviarMensaje}
              ref={(ins) => { this.chatRef = ins; }}
              imagenAvatar = {imagenAvatar}
              indiceEtapa={indiceEtapa}
            />
          </div>
        );
      case 2:
        return(
          <div className={classes.root}>
            <TablaEtapas 
              ticketSelected = {ticketSelected}
              etapasEstatus = {etapasEstatus}/>
          </div>
        );
    
      default:
        return null;
    }
  }
}

OneTicketDetails.propTypes = propTypes;

// export default withStyles(styles)(OneTicketDetails);

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
      cambiarEstatus: (ticketSelected, tipo) => () => {
       
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CAMBIAR_ESTATUS_ACTION',
          ticketSelected,
          tipo,
        })
      }, 
      finalizarTicket: (tipo) => () => {
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/OPEN_MODAL_ACTION',
          data: true,
          tipo,
        })
      },
      handleClose: () => {
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CLOSE_MODAL_ACTION',
          data: false,
        })
      },
      onChangeTextModal: (event) => {
        
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CHANGE_TEXT_MODAL_ACTION',
          data: event.target.value,
        })
      },
      onUploadFile: (e) => {

        const files = Array.from(e.target.files);
        const formData = new FormData()
        const archivosValidos = ['xlsx', 'xls', 'pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'];
        
        const ext = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase();
        const tamaño = files[0].size;

        const tamañoRequerido = 100 * 1048576;

        if (archivosValidos.includes(ext) && tamaño <= tamañoRequerido) {
          formData.append('files',files[0]);
          
          dispatch({
            type: 'APP/CONTAINER/TABLEROS/GUARDAR_IMG_ACTION',
            data: formData,
          });
        };
      },
      onClickEnviarMensajeModal: (obj,tipoJustificacion,indiceEtapa) => () => {
        if (indiceEtapa !== undefined) {
          obj.indiceEtapa = indiceEtapa
        }
        
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION',
          data: obj,
          from: 'modal',
          tipoJustificacion,
        });

      },
      tabEtapasSelect: (event) => {
        
        const actionId = 'APP/CONTAINER/TABLEROS/TAB_ETAPAS_SELECT';
        
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/TAB_ETAPAS_SELECT',
          actionId,
          event,
        });

      },
      autorizarTicket: (ticketSelected) => () => {
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/AUTORIZAR_TICKET_ACTION',
          ticketSelected,
        });
      },
    })
  ),
  withHandlers(FORM_HANDLERS),
)(OneTicketDetails);
