/**
 *
 * Materiales
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DAEMON } from 'utils/constants';
import { compose, bindActionCreators } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withNotifier from 'components/HOC/withNotifier';
import {enqueueSnackbar} from 'reducers/notifications/actions';
import grey from '@material-ui/core/colors/grey';
import makeSelectMateriales from './selectors';
import MaterialesNuevo from './components/MaterialesNuevo';
import Tabla from '../../components/DataTable';
import Modal from '../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import saga from './saga';
import Actions from './actions';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */

export class Materiales extends React.Component {

  componentDidMount() {
    const {
      actions: {
        getMaterialesAction,
        getAgrupadoresAction,
      },
    } = this.props;
    getMaterialesAction();
    getAgrupadoresAction();
  }

  render() {
    const {
      actions : {
        postMaterialesAction,
        agregarNuevoAction,
        regresarAction,
        setAgrupadorAction,
        setNombreAction,
        setPrecioAction,
        setStockMinimoAction,
        setStockMaximoAction,
        deleteMaterialAction,
        openModalAction,
        closeModalAction,
        getMaterialDetalleAction,
        actualizarMaterialAction,
      },
      materiales : {
        materialesTabla :{
          cabeceras,
          datos,
          stepper,
          agrupadores,
          configuracion,
          agrupadorSlc,
          materialNuevo,
          update,
          openModal,
          articuloSelec,
        },
      },
      enqueueSnackbar : enqueueSnackbarAction,
      permisos,
      usuarioGlobal: {
        IdPlaza,
      }
    } = this.props;
    
    switch (stepper) {
      case 0 :
        return (
          <div
            container
            item
          >
            <AppBar style={{backgroundColor: grey[200]}} position="static"> 
              <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                <Typography variant="h6" color="primary" style={{flexGrow: 1}}> 
                Catálogo materiales 
                </Typography> 
              </Toolbar> 
            </AppBar>
            <Tabla
              notificacion = {enqueueSnackbarAction}
              onClickAgregar={agregarNuevoAction}
              data = {datos}
              headers = {cabeceras}
              configuracion = {configuracion}
              idPosition = "IdArticulo"
              admin
              permisos={permisos}
              opciones = {
                [
                  {...(IdPlaza === 9 ?  {'icon' : 'editar', 'action': getMaterialDetalleAction} : null )},
                  {...(IdPlaza === 9 ?  {'icon' : 'eliminar', 'action': openModalAction} : null )},
                ]
              }

              small = {0}
            />
            <Modal  
              open={openModal} 
              typeAlert='Report' 
              typeOptions='Select' 
              title='Confirmar....' 
              message='¿Está seguro que desea eliminar el registro seleccionado?' 
              onClickAccept={()=> deleteMaterialAction(articuloSelec)} 
              onClickCancel={closeModalAction} 
            />
          </div>
        )
      case 1 : 
        return (
          <div>
            {
              !update ? 
                (
                  <AppBar style={{backgroundColor: grey[200]}} position="static"> 
                    <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                      <Typography variant="h6" color="primary" style={{flexGrow: 1}}> 
                        Crear material
                      </Typography> 
                    </Toolbar> 
                  </AppBar>
                ):
                update && 
                (
                  <AppBar style={{backgroundColor: grey[200]}} position="static"> 
                    <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                      <Typography variant="h6" color="primary" style={{flexGrow: 1}}> 
                        Editar material
                      </Typography> 
                    </Toolbar> 
                  </AppBar>
                ) 
            }
            
            <MaterialesNuevo
              actualizarMaterialAction={actualizarMaterialAction}
              update={update}
              notificacion = {enqueueSnackbarAction}
              materialNuevo={materialNuevo}
              setNombreAction={setNombreAction}
              setPrecioAction={setPrecioAction}
              setStockMinimoAction={setStockMinimoAction}
              setStockMaximoAction={setStockMaximoAction}
              agrupadorSlc={agrupadorSlc}
              agrupadores={agrupadores}
              guardarMaterial={postMaterialesAction}
              regresarAction={regresarAction}
              setAgrupadorAction={setAgrupadorAction}
              closeModalAction={closeModalAction}
              openModalAction={openModalAction}
              openModal={openModal}
            />
          </div>
        );
      default: 
        return null;
    }
  }
}

Materiales.propTypes = {
  actions: T.object,
  materiales: T.object,
  enqueueSnackbar: T.func,
  permisos: T.object,
  usuarioGlobal: T.object,
};

const mapStateToProps = createStructuredSelector({
  materiales: makeSelectMateriales(),
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

const withReducer = injectReducer({ key: 'materiales', reducer });
const withSaga = injectSaga({ key: 'materiales', saga,  mode:DAEMON});

const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(Materiales);
