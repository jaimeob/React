/* eslint-disable no-nested-ternary */
/**
 *
 * Tableros
 *
 */

import React from 'react';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { withRouter } from "react-router";
import T from 'prop-types';
import config from 'config/config.development';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators} from 'redux';
import { withHandlers } from 'recompose';
import withNotifier from 'components/HOC/withNotifier';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// import config from 'config/config.development';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import DataTable from 'components/DataTable';
import BandejaDifusiones from 'containers/BandejaDifusiones';
// RELATIVE IMPORTS
import socketIOClient from "socket.io-client";
import BandejaTickets from './components/BandejaTickets';
import TableroBar from './components/TableroBar';
import Actions from './actions';// eslint-disable-line
import makeSelectTableros from './selectors';
import reducer from './reducer';
import saga from './saga';// eslint-disable-line

const socket = socketIOClient(config.api.socketURL);

export class Tableros extends React.Component {
  

  constructor(props) {
    super(props);
    this.imprimeTotalTicketsDifusiones = this.imprimeTotalTicketsDifusiones.bind(this);
  }

  componentWillUnmount () {
    socket.off('obtenerTotalesTicketsDifusiones')
    socket.close() 
  }

  componentDidMount() {    
    const {
      actions:{
        getTicketsPorDepartamentoAction,
        getImagenAvatarAction,
      },
      usuarioGlobal: {
        IdDepartamento,
        IdEmpleado,
        IdPlaza,
        IdPuesto,
        Imagen,
        Nombre,
        UsuarioDominio,
        UsuarioId,
      },
      insertCurrentUserState,
    } = this.props;

    const currentUser = {
      IdDepartamento,
      IdEmpleado,
      IdPlaza,
      IdPuesto,
      Imagen,
      Nombre,
    }
    // getDifusionesAction();
    // getTimeAction()
    insertCurrentUserState(currentUser,socket.id);
    socket.emit('obtenerTotalesTicketsDifusiones', IdDepartamento, IdPuesto, IdEmpleado);
    
    socket.on('enviarTotalesTicketsDifusiones',this.imprimeTotalTicketsDifusiones) ;

    getTicketsPorDepartamentoAction(IdDepartamento);
    getImagenAvatarAction(IdEmpleado);
    
  }

  imprimeTotalTicketsDifusiones = (response) => {

    const {
      actions:{
        asignarTotalTicketsDifusionesAction,
      },
    } = this.props;
    
    const {
      TotalTickets,
      TotalDifusiones,
    } = response[0];
    
    asignarTotalTicketsDifusionesAction(TotalTickets,TotalDifusiones)

    
  };

  render(){
    const {
      actions: {
        handleChangeTabAction,
        ticketSelectAction,
        toggleTipoTicketAction,
        handleChangeDepartamentoAction,
        generarTicketAction,
        handleChangePlantillaAction,
        handleChangeInputFileAction,
        handleSendTicketAction,
        getDepartamentosAction,
        handleChangeComponentAction,
        handleChangeTabDetailsAction,
        onClickedTicketSelectedAction,
        reqTicketsComentariosAction,
        deleteFileAction,
        getTicketsAction,
        onChangeTextFieldEscribirMensajeAction,
        postInsertTicketsComentariosSuccesAction,
        downloadTicketFileAction,
        setTablaMountedAction,
        getDifusionesAction,
        changeMenuAction,
        cerrarModalAction,
        setTimeAction,
        getTimeAction,
        getEtapasAction,
        getEtapasEstatusAction,
        setIndiceEtapaAction,

      },
      tableros: {
        bandejaTickets,
        numUsuarioLogeado,
        nomUsuarioLogeado,
        plazaUsuarioLogeado,
        plazasAutorizadas,
        idRolUsuarioLogeado,
        listadoTickets,
        selected,
        navBandejaTickets,
        modal,
        imagenAvatar,
        
      },
      usuarioGlobal: {
        IdDepartamento,
        IdEmpleado,
        IdPlaza,
        IdPuesto,
        Imagen,
        Nombre,
        UsuarioDominio,
        UsuarioId,
      },
      enqueueSnackbar : enqueueSnackbarAction,
      onSelectTicket,
    } = this.props;

    console.log(this.props,"TABLEROS ------------------------------------------");
    

    const configuracion = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: false,
      registrosPorPagina : 75,
      registrosPorPaginaMenu : [20,50,75],
    };

    const chatActions = {
      reqTicketsComentariosAction,
    };
    let componente = <React.Fragment></React.Fragment>

    switch(selected.isToggle) {
      case -1 : 
        componente = <DataTable 
          data = {listadoTickets.data}
          headers = {listadoTickets.headers}
          configuracion = {configuracion}
          opciones = {[{'icon' : 'ver', 'action': onSelectTicket}]}
          idPosition = "Folio"
          admin
          setTableMounted = {setTablaMountedAction}
        />
        break;
      case 0 : {
        componente = <BandejaDifusiones 
          getDifusiones={getDifusionesAction}
        />
        break;
      }
      case 1 : {
        componente = <BandejaTickets
          setTime = {setTimeAction}
          getTime={getTimeAction}
          chatActions={chatActions}
          reqTicketsComentarios={reqTicketsComentariosAction}
          onClickEnviarMensaje={postInsertTicketsComentariosSuccesAction}
          handleChangeTabDetails={handleChangeTabDetailsAction}
          onClickTicketSelected={onClickedTicketSelectedAction}
          onChangeTextFieldEscribirMensaje={onChangeTextFieldEscribirMensajeAction}
          getDepartamentos={getDepartamentosAction}
          numUsuarioLogeado={IdEmpleado}
          nomUsuarioLogeado={Nombre}
          plazaUsuarioLogeado={IdPlaza}
          plazasAutorizadas={plazasAutorizadas}
          idRolUsuarioLogeado={IdPuesto}
          handleChangeDepartamento={handleChangeDepartamentoAction}
          ticketSelect={ticketSelectAction} 
          bandejaTickets={bandejaTickets} 
          toggleTipoTicket={toggleTipoTicketAction}
          handleChangeTab={handleChangeTabAction}
          handleChangeComponent={handleChangeComponentAction}
          handleChangeInputFile={handleChangeInputFileAction}
          handleSendTicket={handleSendTicketAction}
          generarTicket={generarTicketAction}
          getTickets={getTicketsAction}
          deleteFile={deleteFileAction}
          downloadTicketFile={downloadTicketFileAction}
          notificacion={enqueueSnackbarAction}
          handleChangePlantilla={handleChangePlantillaAction}
          cerrarModal={cerrarModalAction}
          modal={modal}
          imagenAvatar={Imagen}
          onClickTicketEtapas = {getEtapasAction}
          getEtapasEstatus ={getEtapasEstatusAction}
          setIndiceEtapa ={setIndiceEtapaAction}
          socketCliente = {socket.id}
        />
         
        break;
      }
      default :
        componente = null;
        break;
    }

    return (
      <div style={{height: '85vh'}}>
        <TableroBar 
          changeMenu = {changeMenuAction}
          isToggle = {selected.isToggle}
          titulo = {selected.bandejaText}
          isMensaje = {selected.isMensaje}
          getTickets = {getTicketsAction}
          text = {selected.text}
          isDifusions = {selected.isDifusions}
          numDifusions = {navBandejaTickets.totalDifusiones}
          numTickets = {navBandejaTickets.totalTickets}
        />
        {componente}
      </div>
    );
  }
}

Tableros.displayName = 'Tableros';

Tableros.propTypes = {
  tableros: T.object,
  usuarioGlobal: T.object,
  actions: T.object,
  onSelectTicket: T.func,
  enqueueSnackbar: T.func,
  insertCurrentUserState: T.func,
};

export const mapStateToProps = createStructuredSelector({
  tableros: makeSelectTableros(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
  }, dispatch);

}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'tableros', reducer });
const withSaga = injectSaga({ key: 'tableros', saga, mode : DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withRouter,
  withConnect,
  withActions,
  withHandlers({
    onSelectTicket: props => id => {
      const {
        actions: {
          getTicketByIdAction,
        },
      } = props;
      getTicketByIdAction(id);
    },
  }),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      insertCurrentUserState: (currentUser,socketCliente) => {         
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/INSERT_CURRENT_USER_ACTION',
          currentUser,
          socketCliente,
        });

      },

    })
  ),
)(Tableros);
