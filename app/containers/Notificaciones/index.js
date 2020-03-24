/* eslint-disable no-unused-expressions */
/**
 *
 * Notificaciones
 *
 */

import React from 'react';


import T from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import IconButton from '@material-ui/core/IconButton';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import config from 'config/config.development';
import { DAEMON } from 'utils/constants';

import socketIOClient from "socket.io-client";


import Actions from './actions';

// MUI
import makeSelectNotificaciones from './selectors';
import reducer from './reducer';
import saga from './saga';


import AnimacionNotificacion from './components/Animacion/AnimacionNotificacion';

import "./styles.css";


const socket = socketIOClient(config.api.socketURL);


// /* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prefer-stateless-function */
export class Notificaciones extends React.Component {

  constructor(props) {
    super(props);
    this.recibirNotificaciones = this.recibirNotificaciones.bind(this);
  }

  componentDidMount() { 
    const {
      // notificaciones: {
      //   numUsuarioLogeado,
      //   idDepartamentoLogeado,
      // },
      actions:{
        setUsuarioAction,
      },
      usuario: {
        IdEmpleado,
        IdDepartamento,
      },
    } = this.props;
    // reqTicketsComentariosAction(idTicketSelected);
    setUsuarioAction(IdEmpleado,IdDepartamento);
    socket.emit('obtenerNotificaciones',IdEmpleado,IdDepartamento);
    socket.on('enviarNotificaciones',this.recibirNotificaciones) ;
            
  }

  componentWillUnmount(){
   
    this.props.actions.limiparNotificacionesAction();
  }

  //
  recibirNotificaciones = (response) => {
    const { 
      actions:{
        obtenerNotificacionesAction,
      },
    } = this.props; 
    obtenerNotificacionesAction(response)
  };

  render() { 
    const {
      notificaciones:{
        notificaciones,
        animarNotificacion,
        numUsuarioLogeado,
        idDepartamentoLogeado,
      },
      actions: {
        cambiarEstatusNotificacionAction,
        cambiarAnimacionNotificacionAction,
        obtenerNotificacionesAction,
      },
    } = this.props;
    // Se actualiza las cosas
    // console.log("notificaciones recibidas",notificaciones)
    if (notificaciones.length > 0) {
      notificaciones.filter((not) => not.Leido === false && not.IdUsuarioRecibe === numUsuarioLogeado && not.IdDepartamentoRecibe === idDepartamentoLogeado).length > 0
        ? cambiarAnimacionNotificacionAction(true)
        : cambiarAnimacionNotificacionAction(false);
    } else {
      cambiarAnimacionNotificacionAction(false)
    }
    return (
      <React.Fragment>
        {/* Esta parte es la anterior con animacion ya funcionaba de manera correcta asi */}
        <AnimacionNotificacion 
          numUsuarioLogeado = {numUsuarioLogeado}
          animarNotificacion = {animarNotificacion}
          notificaciones = {notificaciones}
          cambiarEstatusNotificacionAction = {cambiarEstatusNotificacionAction} 
          obtenerNotificacionesAction = {obtenerNotificacionesAction}
          idDepartamentoLogeado = {idDepartamentoLogeado}
        />

      </React.Fragment>
    );
  }
}


Notificaciones.propTypes = {
  actions: T.object,
  notificaciones: T.object,
  usuario: T.object,
};

const mapStateToProps = createStructuredSelector({
  notificaciones: makeSelectNotificaciones(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'notificaciones', reducer });
const withSaga = injectSaga({ key: 'notificaciones', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore();


export default compose(
  withActions,
  withReducer,
  withSaga,
  withConnect,
  //   withHandlers({
  //     onClickAgregarProxy: (props) => (id) => () => {
  //       const {
  //         actions: {
  //           changeStepperAction,
  //           getPlazasHabilitadasAction,
  //         },
  //       } = props;
  //       getPlazasHabilitadasAction()
  //       changeStepperAction(id);
  //     },


  //   }),
  connect (
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS DEL CHAT ]===================================
      onClickEnviarNotificacion: (obj) => () => {
        const actionId = 'APP/CONTAINER/NOTIFICACIONES/REQ_POST_INSERT_NOTIFICACIONES_ACTION';
        dispatch({
          type: 'APP/CONTAINER/NOTIFICACIONES/REQ_POST_INSERT_NOTIFICACIONES_ACTION',
          data: obj,
          actionId,
          from: 'notificaciones',
        })
        
      },

    }),
  ),
)(Notificaciones);

 



//     imprimeNotificaciones = (response) => {
//         const {
//           actions:{
//             setImprimeNotificaciones,
//           },
//     } = this.props;

//     setImprimeNotificaciones(response);
// };


//   render() {
//      
    
//     return (
//         <React.Fragment>
//             <Notificacion/>
//         </React.Fragment>
//     );
//   }




// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps
// );



// export default compose(
//   withReducer,
//   withSaga,
//   withConnect
// )(Notificaciones);
