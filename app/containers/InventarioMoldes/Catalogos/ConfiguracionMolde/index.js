/**
 *
 * ConfiguracionMolde
 *
 */

import React from 'react';
import T from 'prop-types';
import { compose, bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { DAEMON } from 'utils/constants';
import { withHandlers } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {enqueueSnackbar} from 'reducers/notifications/actions';
import injectSaga from 'utils/injectSaga';
import Spinner from 'components/Spinner';
import withNotifier from 'components/HOC/withNotifier';
import injectReducer from 'utils/injectReducer';
import DataTable from 'components/DataTable';
import { withStyles } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Modal from 'components/Dialog/alertDialog';
import {
  AppBar,
  Toolbar,
  // Paper,
  Typography,
  Grid,
  IconButton,
} from '@material-ui/core';
import Grey from '@material-ui/core/colors/grey'
import makeSelectConfiguracionMolde from './selectors';
import reducer from './reducer';
import Actions from './actions';
import saga from './saga';
import NuevoMolde from './components/NuevoMolde';



const styles = () => ({
  tab: {
    width: '50%',
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 1,
  },
})
/* eslint-disable react/prefer-stateless-function */
export class ConfiguracionMolde extends React.Component {

  componentDidMount(){
    const {
      actions: {
        getCombosAction,
        getMoldesAction,
        setUsuarioAction,
      },
      usuarioId,
    } = this.props;
    getCombosAction();
    getMoldesAction();
    setUsuarioAction(usuarioId);
  }

  componentWillUnmount() {
    const {
      actions: {
        limpiarStateAction,
      },
    } = this.props;
    limpiarStateAction();
  }

  render() {

    const {
      permisos,
      configuracionMolde: {
        stepper,
        // usuario,
        catalogo: {
          datos,
          cabeceras,
        },
        configuracion: {
          documentacion,
          combos: {
            proveedores,
            materiales,
            pisos,
            plantas,
            tipos,
          },
          general: {
            nombre,
            version,
            numPlantas,
            costo,
            proveedor,
            material,
          },
          secciones,
          guardarCompleto,
          pestañaSlc,
          etapaNuevoMolde,
          primerPaso,
          segundoPaso,
          tercerPaso,
          esDetalleMolde,
          eliminarModal,
        },
      },
      actions: {
        onInputChangeAction,
        onClickDetalleAction,
        onClickAgregarAction,
        onChangeSeccionTabAction,
        onEliminarMoldeModalAction,
        onInputChangeSeccionAction,
        uploadPlanoAction,
        // verPlanoAction,
        onClickSiguienteAction,
        guardarMoldeAction,
        handleDownloadArchivoAction,
        handleDownloadArchivoPlanoAction,
        // handleDeleteArchivoAction,
        handleDeleteArchivoPlanoAction,
        handleChangeArchivoAction,
        handleChangeArchivoPlanoAction,
        // onClickGuardarAction,
        onEditarAccesorioAction,
        onEditarPiezaAction,
        onEditarMoldeAction,
        onClickCancelarAccesorioAction,
        onEliminarAccesorioAction,
        onEliminarMoldeAction,
        onHandleClickListAction,
        onClickGuardarAccesorioAction,
        onClickGuardarPiezaAction,
        onClickCerrarAction,
        onInputChangeAccesorioAction,
        onInputChangePiezaAction,
        onClickAgregarAccesorioAction,
        // onChangeConfiguracionTabAction,
        onClickAgregarPiezaAction,
        onClickAgregarMoldeAction,
        onEliminarArchivoDocumentacionAction,
        getMoldesAction,
        handleImportarExcelAction,
        onAgregarSeccionesAction,
        onActivarModalAvisoAction,
      },
      // classes,
      enqueueSnackbar : enqueueSnackbarAction,
      onCancelarConfiguracionProxy,
      onEliminarMoldeModalProxy,
    } = this.props;
    
    //console.log(permisos)
    const configuracion = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: 'none',
      paginado: true,
      registrosPorPagina: 10,
      ordenar: false,
    };



    const cabecerasC = cabeceras.map((ele, idx) => {
      if(ele.name === 'costo'){
        return {
          name: ele.name,
          label: ele.label,
          options: {
            customHeadRender: (columnMeta) => (
              <th 
                // eslint-disable-next-line react/no-array-index-key
                key={`cabecera${idx}`} 
                style={
                  {
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    color: 'rgba(0, 0, 0, 0.54)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    padding : 16,
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }
                }
              >
                {columnMeta.label}
              </th>
            ),
            setCellProps: () => ({
              style: {
                textAlign: 'right',
                paddingRight: 16,
                width: '15%',
              },
            }),
          },
        }
      }
      if(ele.name === 'area'){
        return {
          name: ele.name,
          label: ele.label,
          options: {
            customHeadRender: (columnMeta) => (
              <th 
                // eslint-disable-next-line react/no-array-index-key
                key={`cabecera${idx}`} 
                style={
                  {
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    color: 'rgba(0, 0, 0, 0.54)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    padding : 16,
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }
                }
              >
                {columnMeta.label}
              </th>
            ),
            setCellProps: () => ({
              style: {
                width: '15%',
                textAlign: 'center',
              },
            }),
          },
        }
      }
      return ele;
    }) 
    if(stepper === 1)
      return (
        <div style={{height: '85vh'}}>
          <AppBar 
            position="static"
            style={
              {
                backgroundColor: Grey[200], 
                marginBottom: 16,
              }
            } 
          >
            <Toolbar variant="dense" style={{paddingLeft: 8}}>
              <IconButton onClick={getMoldesAction}>
                <ArrowBack/>
              </IconButton>
              <Typography
                variant='h5'
              >
                Configuración de molde
              </Typography>
            </Toolbar>
          </AppBar>
          <AppBar
            color="inherit" 
            position="static"
            style={
              {
                backgroundColor: 'white',
              }
            }
          >
            {/* <Toolbar 
              variant="dense" 
              style={
                {
                  padding: 'initial',
                }
              }
            >
              <Tabs value={pestañaSlc} onChange={onChangeConfiguracionTabAction} variant="fullWidth" style={{width: '100%'}}>
                <Tab className={classes.tab} label="Configuración de Molde" id="0"/>
                <Tab className={classes.tab} label="Documentación" id="1"/>
              </Tabs>
            </Toolbar> */}
          </AppBar>
          {/* <Paper 
            elevation={2} 
            style={
              {
                height: '120vh',
                borderRadius: 0,
              }
            }
          > */}
          {pestañaSlc === 0 ? 
            <NuevoMolde
              onInputChange={onInputChangeAction}
              onInputChangeSeccion={onInputChangeSeccionAction}
              nombre={nombre}
              version={version}
              numPlantas={numPlantas}
              costo={costo}
              proveedor={proveedor}
              tipos={tipos}
              material={material}
              secciones={secciones}
              proveedores={proveedores}
              materiales={materiales}
              pisos={pisos}
              plantas={plantas}
              guardarCompleto={guardarCompleto}
              notificacion={enqueueSnackbarAction}
              verDetalleSeccion={onClickDetalleAction}
              agregarSeccion={onClickAgregarAction}
              uploadPlano={uploadPlanoAction}
              cambiarPestaña={onChangeSeccionTabAction}
              onClickSiguiente={onClickSiguienteAction}
              onClickAgregar={onClickAgregarAction}
              onClickCerrar={onClickCerrarAction}
              onClickAgregarAccesorio={onClickAgregarAccesorioAction}
              onInputChangePieza={onInputChangePiezaAction}
              onInputChangeAccesorio={onInputChangeAccesorioAction}
              onClickGuardarAccesorio={onClickGuardarAccesorioAction}
              onClickGuardarPieza={onClickGuardarPiezaAction}
              onEliminarAccesorio={onEliminarAccesorioAction}
              onEditarAccesorio={onEditarAccesorioAction}
              onEditarPieza={onEditarPiezaAction}
              onGuardarConfiguracion={guardarMoldeAction}
              onClickCancelarAccesorio={onClickCancelarAccesorioAction}
              onCancelarConfiguracion={onClickAgregarMoldeAction}
              onClickAgregarPieza={onClickAgregarPiezaAction}
              etapaNuevoMolde={etapaNuevoMolde}
              primerPaso = {primerPaso}
              segundoPaso = {segundoPaso}
              tercerPaso = {tercerPaso}
              esDetalleMolde={esDetalleMolde}
              handleClickList={onHandleClickListAction}
              documentacion={documentacion}
              handleChangeArchivo={handleChangeArchivoAction}
              handleChangeArchivoPlano={handleChangeArchivoPlanoAction}
              handleDownloadArchivo={handleDownloadArchivoAction}
              handleDownloadArchivoPlano={handleDownloadArchivoPlanoAction}
              handleDeleteArchivo={onEliminarArchivoDocumentacionAction}
              handleDeleteArchivoPlano={handleDeleteArchivoPlanoAction}
              handleImportarExcel={handleImportarExcelAction}
              onAgregarSecciones={onAgregarSeccionesAction}
              activarModalAviso={onActivarModalAvisoAction}
            /> : 
          // <Documentacion 
          //   handleClickList={onHandleClickListAction}
          //   documentacion={documentacion}
          //   secciones={secciones}
          //   verPlano={verPlanoAction}
          //   onEliminarArchivoDocumentacion={onEliminarArchivoDocumentacionAction}
          //   handleDownloadArchivo={handleDownloadArchivoAction}
          //   handleDeleteArchivo={handleDeleteArchivoAction}
          //   notificacion={enqueueSnackbarAction}
          //   handleChangeArchivo={handleChangeArchivoAction}
          // />}
            null}
          {/* </Paper> */}
        </div>
      )
    return (
      <div>
        <Spinner />
        <Modal 
          open={eliminarModal}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message='¿Esta seguro que desea eliminar la configuración del molde?'
          onClickAccept={onEliminarMoldeAction}
          onClickCancel={onEliminarMoldeModalProxy(false)}
        />
        <AppBar 
          position="static"
          style={
            {
              backgroundColor: Grey[200], 
              marginBottom: 16,
            }
          } 
        >
          <Toolbar variant="dense" style={{paddingLeft: 8}}>
            <Typography
              variant='h5'
            >
              Moldes
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
        >
          <DataTable 
            permisos={permisos}
            data = {datos}
            headers = {cabecerasC}
            configuracion = {configuracion}
            idPosition = 'idMolde'
            onClickAgregar = {onCancelarConfiguracionProxy(false)}
            admin
            opciones = {
              [
                {'icon' : 'ver', 'action': onEditarMoldeAction},
                {'icon' : 'eliminar', 'action': onEliminarMoldeModalAction},
              ]
            }
            // acciones = {acciones}
            temporal
            message='¿Esta seguro que desea eliminar la(s) NuevoMolde(s)?'
            params= {
              {
                height: 40,
              }
            }
            titulo='Secciones'
          />
        </Grid>
      </div>
    );
  }
}

ConfiguracionMolde.propTypes = {
  // classes: T.object,
  actions: T.object,
  configuracionMolde: T.object,
  enqueueSnackbar: T.func,
  // location: T.object,
  // history: T.object,
  permisos: T.object,
  onCancelarConfiguracionProxy: T.func,
  onEliminarMoldeModalProxy: T.func,
  usuarioId: T.number,
};

const mapStateToProps = createStructuredSelector({
  configuracionMolde: makeSelectConfiguracionMolde(),
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

const withReducer = injectReducer({ key: 'configuracionMolde', reducer });
const withSaga = injectSaga({ key: 'configuracionMolde', saga, mode : DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withHandlers({
    onCancelarConfiguracionProxy: (props) => (band) => () => {
      const {
        actions: {
          onClickAgregarMoldeAction,
        },
      } = props;
      onClickAgregarMoldeAction(band);
    },
    onEliminarMoldeModalProxy: (props) => (band) => () => {
      const {
        actions: {
          onEliminarMoldeModalAction,
        },
      } = props;
      onEliminarMoldeModalAction(band);
    },
    onInputChangeProxy: (props) => (id) => (e) => {
      const {
        actions: {
          onChangePuestosAction,
        },
      } = props;
      onChangePuestosAction(id, e);
    },
  }),
)(ConfiguracionMolde);
