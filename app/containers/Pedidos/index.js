/**
 *
 * Pedidos
 *
 */

import React from 'react';
import T from 'prop-types';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux';
import { compose, bindActionCreators} from 'redux';
import { DAEMON } from 'utils/constants';
import { Redirect} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grey from '@material-ui/core/colors/grey'
import withNotifier from 'components/HOC/withNotifier';
import {enqueueSnackbar} from 'reducers/notifications/actions';
import { createStructuredSelector } from 'reselect';
// import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPedidos from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';
import Coorporativo from './components/Coorporativo';
import Detalle from './components/Detalle';
import DetallePlaza from './components/DetallePlaza';
import Plaza from './components/Plaza';

/* eslint-disable react/prefer-stateless-function */

export class Pedidos extends React.Component {

  componentDidMount() {
    const {
      actions: {
        getPedidosAction,
        getEstatusAction,
        getPlazasAction,
        setMountedAction,
      },
    } = this.props;
    getPedidosAction();
    getPlazasAction();
    getEstatusAction();
    setMountedAction();
  }

  componentWillUnmount() {
    const {
      actions: {
        limpiarStateAction,
        setMountedAction,
      },
      pedidos: {
        mounted,
      },
    } = this.props;
    
    if(mounted)
      limpiarStateAction();
    else
      setMountedAction();
  }

  render() {

    const {
      actions: {
        changeFechaInicioAction,
        changeFechaAutorizacionAction,
        changePlazaAction,
        onFechaInputAction,
        onInputAutorizacionAction,
        onInputComentariosAction,
        onInputComentariosGeneralAction,
        onInputRecibidoAction,
        onInputComRecepcionAction,
        onInputGuiaAction,
        onInputPaqueteriaAction,
        onUploadFileAction,
        onUploadCotizacionAction,
        onUploadRecepcionAction,
        obtenerCotizacionAction,
        onDeleteFileAction,
        onDeleteCotizacionFileAction,
        onDeleteRecepcionFileAction,
        onRecibirAction,
        changeEstatusAction,
        downloadFileAction,
        downloadFileRecepcionAction,
        downloadCotizacionAction,
        getPedidosAction,
        limpiarFiltrosAction,
        agregarPedidoAction,
        recibirPedidoAction,
        getPedidoDetalleAction,
        autorizarPedidoAction,
        autorizarMultipleAction,
        cambiarPlazaAction,
        onClickSiguienteAction,
        onClickModalAction,
        setTablaMountedAction,
        onInputImporteAction,
      },
      pedidos: {
        pedidosTabla: {
          parametros: {
            plaza,
            fecSolicitudInicio,
            fecSolicitudFin,
            fecAutorizacionInicio,
            fecAutorizacionFin,
            fechaSolicitudInput,
            fechaAutorizacionInput,
            estatusSeleccionado,
          },
          pedidoDetalle,
          openModal,
          plazas,
          estatusCombo,
          stepper,
          cabeceras,
          datos,
          agregar,
          noCambio,
        },
        idPlaza,
        modificado,
      },
      enqueueSnackbar : enqueueSnackbarAction,
      permisos,
    } = this.props;
    
    const styles = {
      grow: {
        flexGrow: 1,
      },
    };
    
    if(agregar)
      return <Redirect to={{pathname: '/pedidos-nuevo'}}/>;
    
    if(stepper === 1){
      return(
        <div>
          <AppBar style={{backgroundColor: Grey[200]}} position="static">
            <Toolbar variant="dense" style={{paddingLeft: 8}}>
              <Typography variant="h6" color="primary" style={styles.grow}>
                Detalle del Pedido
              </Typography>
            </Toolbar>
          </AppBar>
          <br /> 
          <Detalle 
            onClickSiguiente = {onClickSiguienteAction}
            pedidosDetalle = {pedidoDetalle}
            onInputAutorizacion = {onInputAutorizacionAction}
            onInputComentarios = {onInputComentariosAction}
            onClickGuardar = {autorizarPedidoAction}
            onInputGuia = {onInputGuiaAction}
            onClickCancelar = {getPedidosAction}
            onInputPaqueteria = {onInputPaqueteriaAction}
            downloadFile = {downloadFileAction}
            notificacion = {enqueueSnackbarAction}
            handleChangeArchivo = {onUploadFileAction}
            handleDeleteFile = {onDeleteFileAction}
            handleDeleteCotizacionFile = {onDeleteCotizacionFileAction}
            onUploadCotizacion = {onUploadCotizacionAction}
            onInputComentariosGeneral = {onInputComentariosGeneralAction}
            onInputRecibido = {onInputRecibidoAction}
            onInputComRecepcion = {onInputComRecepcionAction}
            downloadCotizacion = {downloadCotizacionAction}
            obtenerCotizacion = {obtenerCotizacionAction}
            onClickModal = {onClickModalAction}
            openModal = {openModal}
            modificado = {modificado}
            plaza = {idPlaza !== 9}
            onInputImporte = {onInputImporteAction}
          />
        </div>
      )
    } 
    if(stepper === 2){
      return(
        <div>
          <AppBar style={{backgroundColor: Grey[200]}} position="static">
            <Toolbar variant="dense" style={{paddingLeft: 8}}>
              <Typography variant="h6" color="primary" style={styles.grow}>
                Detalle del Pedido
              </Typography>
            </Toolbar>
          </AppBar>
          <br /> 
          <DetallePlaza 
            pedidosDetalle = {pedidoDetalle}
            onInputAutorizacion = {onInputAutorizacionAction}
            onInputComentarios = {onInputComentariosAction}
            onClickGuardar = {recibirPedidoAction}
            onInputGuia = {onInputGuiaAction}
            onClickCancelar = {getPedidosAction}
            onInputPaqueteria = {onInputPaqueteriaAction}
            downloadFile = {downloadFileAction}
            downloadFileRecepcion = {downloadFileRecepcionAction}
            notificacion = {enqueueSnackbarAction}
            handleChangeArchivo = {onUploadFileAction}
            handleChangeRecepcionArchivo = {onUploadRecepcionAction}
            handleDeleteFile = {onDeleteFileAction}
            handleDeleteRecepcionFile = {onDeleteRecepcionFileAction}
            onUploadCotizacion = {onUploadCotizacionAction}
            onInputComentariosGeneral = {onInputComentariosGeneralAction}
            onInputRecibido = {onInputRecibidoAction}
            onInputComRecepcion = {onInputComRecepcionAction}
            downloadCotizacion = {downloadCotizacionAction}
            onClickRecibir = {onRecibirAction}
          />
        </div>
      )
    } 
    return (
      <div>
        <AppBar style={{backgroundColor: Grey[200]}} position="static">
          <Toolbar variant="dense" style={{paddingLeft: 8}}>
            <Typography variant="h6" color="primary" style={styles.grow}>
              Pedidos
            </Typography>
            {/* <Button onClick={cambiarPlazaAction}>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
            </Button> */}
          </Toolbar>
        </AppBar>
        {idPlaza === 9 ? 
          <Coorporativo 
            fecSolicitudInicio = {fecSolicitudInicio}
            fecSolicitudFin = {fecSolicitudFin}
            fechaSolicitudInput = {fechaSolicitudInput}
            fecAutorizacionInicio = {fecAutorizacionInicio}
            fecAutorizacionFin = {fecAutorizacionFin}
            fechaAutorizacionInput = {fechaAutorizacionInput}
            onChangePlaza = {changePlazaAction}
            onChangeEstatus = {changeEstatusAction}
            onChangeFechaInicio = {changeFechaInicioAction}
            onClickGuardar = {autorizarPedidoAction}
            onChangeFechaAutorizacion = {changeFechaAutorizacionAction}
            onFechaInput = {onFechaInputAction}
            estatusSeleccionado = {estatusSeleccionado}
            estatusCombo = {estatusCombo}
            cabeceras = {cabeceras}
            datos = {datos}
            onClickFiltrar = {getPedidosAction}
            onClickLimpiar = {limpiarFiltrosAction}
            onClickVerPedido = {getPedidoDetalleAction}
            onClickMultipleAutorizacion = {autorizarMultipleAction}
            plaza = {plaza}
            plazas = {plazas}
            noCambio={noCambio}
            setTablaMounted={setTablaMountedAction}
            permisos = {permisos}
          /> :
          <Plaza 
            fecSolicitudInicio = {fecSolicitudInicio}
            fecSolicitudFin = {fecSolicitudFin}
            fechaSolicitudInput = {fechaSolicitudInput}
            fecAutorizacionInicio = {fecAutorizacionInicio}
            fecAutorizacionFin = {fecAutorizacionFin}
            fechaAutorizacionInput = {fechaAutorizacionInput}
            onChangeEstatus = {changeEstatusAction}
            onChangeFechaInicio = {changeFechaInicioAction}
            onChangeFechaAutorizacion = {changeFechaAutorizacionAction}
            onAgregarPedido = {agregarPedidoAction}
            onFechaInput = {onFechaInputAction}
            onClickVerPedido = {getPedidoDetalleAction}
            estatusSeleccionado = {estatusSeleccionado}
            estatusCombo = {estatusCombo}
            cabeceras = {cabeceras}
            datos = {datos}
            onClickFiltrar = {getPedidosAction}
            onClickLimpiar= {limpiarFiltrosAction}
            permisos = {permisos}
          />}
      </div>
    );
  }
}

Pedidos.propTypes = {
  actions: T.object,
  pedidos: T.object,
  enqueueSnackbar: T.func,
  permisos: T.object,
};

const mapStateToProps = createStructuredSelector({
  pedidos: makeSelectPedidos(),
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

const withReducer = injectReducer({ key: 'pedidos', reducer });
const withSaga = injectSaga({ key: 'pedidos', saga, mode : DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(Pedidos);
