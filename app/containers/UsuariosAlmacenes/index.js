/**
 *
 * UsuariosAlmacenes
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { Grid, AppBar, Toolbar, Typography, TextField, MenuItem} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


import grey from '@material-ui/core/colors/grey';
import withNotifier from 'components/HOC/withNotifier';
import {enqueueSnackbar} from 'reducers/notifications/actions';
import ComboMultiple from 'components/FiltroSeleccion';
import { withHandlers } from 'recompose';
import { Container, Section, FormContainer } from './styledComponents';


import makeSelectUsuariosAlmacenes from './selectors';
import Tabla from '../../components/DataTable';
import Modal from '../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import BotonSuccess from "../../components/BotonSuccess";

import saga from './saga';
import Actions from './actions';
import reducer from './reducer';

const styles = ({
  formControl: {
    marginTop: 0,
    marginBottom: 0,
    width: '100%',
  },
  tab: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 1,
  },
  boton: {
    marginTop: 5,
  },
  paddingNone: {
    paddingTop : '0 !important',
    paddingBottom: '0 !important',
  },
})

export class UsuariosAlmacenes extends React.Component {

  componentDidMount() {
    const {
      actions: {
        getPlazasAction,
        getAlmacenesAction,
        getUsuariosAction,
        getAlmacenesPlazasAction,
        getUsuariosAlmacenesAction,
      },
    } = this.props;
    getAlmacenesPlazasAction();
    getUsuariosAlmacenesAction();
    getPlazasAction();
    getAlmacenesAction();
    getUsuariosAction();
  }

  componentWillUnmount() {
    const {
      actions: {
        limpiarApAction,
        limpiarAuAction,
      },
    } = this.props;

    limpiarApAction();
    limpiarAuAction();
  }

  render() {
    
    const {
      actions: {
        onInputChangeAction,
        postApAction,
        getDetalleApAction,
        updateApAction,
        eliminarApAction,
        postAuAction,
        getDetalleAuAction,
        updateAuAction,
        eliminarAuAction,
        openModalAction,
        closeModalAction,
      },
      usuariosAlmacenes: {
        usuariosAlmacenes: {
          cabecerasAP,
          cabecerasAU,
          configuracion,
          nuevoAP,
          nuevoAU,
          update,
          updateAU,
          modal,
        },
      },
      classes,
      onInputChangeUsuarioProxy,
    } = this.props;
    return (
      <div>
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}>
            <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
              Configuración de usuario de almacén
            </Typography> 
          </Toolbar> 
        </AppBar>
        <Container>
          <Section
            style={{backgroundColor: '#fff', marginRight: 4}}
          >
            <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', marginLeft: 25, marginTop: 15}}> 
              Asignar almacén a plaza
            </Typography>
            <FormContainer>
              <Grid
                container
                spacing={16}
              >               
                <Grid
                  item
                  xs={5}
                  sm={5}
                  className={classes.paddingNone}
                >
                  <TextField
                    select
                    className={classes.formControl}
                    label="Plaza"
                    margin="normal"
                    onChange={(e) => onInputChangeAction(0, e, 1)}
                    error={nuevoAP.campos.plaza.error}
                    value={nuevoAP.campos.plaza.valor}
                    helperText="* Requerido"
                    fullWidth
                  >
                    {nuevoAP.combos.plazas.map(plazaInd => (
                      <MenuItem key={plazaInd.IdPlaza} value={plazaInd.IdPlaza}>
                        {plazaInd.Nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={5}
                  className={classes.paddingNone}
                >
                  <TextField
                    select
                    className={classes.formControl}
                    label="Almacén"
                    margin="normal"
                    onChange={(e) => onInputChangeAction(1, e, 1)}
                    error={nuevoAP.campos.almacen.error}
                    value={nuevoAP.campos.almacen.valor}
                    helperText="* Requerido"
                    fullWidth
                  >
                    {nuevoAP.combos.almacenes.map(almacenInd => (
                      <MenuItem key={almacenInd.IdAlmacen} value={almacenInd.IdAlmacen}>
                        {almacenInd.Almacen}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={2}
                >
                  <div className={classes.boton}>
                    <BotonSuccess
                      label={!update ? 'Agregar' : 'Editar'}
                      disabled={nuevoAP.disabled.boton}
                      onClick={!update ? postApAction : updateApAction}
                    />
                  </div>
                </Grid>
              </Grid>
            </FormContainer>
            <Tabla
              headers={cabecerasAP}
              data={nuevoAP.tablas.tablaAP}
              configuracion={configuracion}
              idPosition = "IdRegistro"
              admin
              mensajeTexto='Seleccione una plaza y un almacén'
              opciones = {
                [
                  {'icon' : 'editar', 'action':(index) => getDetalleApAction(nuevoAP.tablas.tablaAP[index].IdRegistro)},
                  {'icon' : 'eliminar', 'action': (index) => openModalAction(nuevoAP.tablas.tablaAP[index].IdRegistro, 1)},
                ]
              }
              params= {
                {
                  height: 45,
                  backgroundColor: '#fff',
                }
              }
              temporal
              elevacion={0}
            />
          </Section>
          <Section
            style={{backgroundColor: '#fff', marginLeft: 4}}
          >
            <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', marginLeft: 25, marginTop: 15}}> 
              Asignar usuario a almacén
            </Typography>
            <FormContainer>
              <Grid
                container
                spacing={16}
              >               
                <Grid
                  item
                  xs={5}
                  sm={5}
                  className={classes.paddingNone}
                >
                  <TextField
                    select
                    className={classes.formControl}
                    label="Plaza"
                    margin="normal"
                    onChange={(e) => onInputChangeAction(0, e, 2)}
                    error={nuevoAU.campos.plaza.error}
                    value={nuevoAU.campos.plaza.valor}
                    helperText="* Requerido"
                    fullWidth
                  >
                    {nuevoAU.combos.plazas.map(plazaInd => (
                      <MenuItem key={plazaInd.IdPlaza} value={plazaInd.IdPlaza}>
                        {plazaInd.Nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={5}
                  className={classes.paddingNone}
                >
                  <TextField
                    select
                    className={classes.formControl}
                    label="Almacén"
                    margin="normal"
                    onChange={(e) => onInputChangeAction(1, e, 2)}
                    error={nuevoAU.campos.almacen.error}
                    value={nuevoAU.campos.almacen.valor}
                    helperText="* Requerido"
                    fullWidth
                  >
                    {nuevoAU.combos.almacenes.map(almacenInd => (
                      <MenuItem key={almacenInd.IdAlmacen} value={almacenInd.IdAlmacen}>
                        {almacenInd.Almacen}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={10}
                  sm={10}
                  className={classes.paddingNone}
                >

                  <ComboMultiple
                    className={classes.formControl}
                    // inhabilitado={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                    valor={nuevoAU.campos.usuario.valor}
                    onChange={onInputChangeUsuarioProxy}
                    // onChange={(e) => onInputChangeAction(2, e, 2)}
                    opciones={nuevoAU.combos.usuarios}
                    campoValido
                    requerido
                    label='Selecciona el usuario'
                    indice={1}
                  />
                  {/* <TextField
                    select
                    className={classes.formControl}
                    label="Usuario"
                    margin="normal"
                    onChange={(e) => onInputChangeAction(2, e, 2)}
                    error={nuevoAU.campos.usuario.error}
                    value={nuevoAU.campos.usuario.valor}
                    helperText="* Requerido"
                    fullWidth
                  >
                    {nuevoAU.combos.usuarios.map(usuarioInd => (
                      <MenuItem key={usuarioInd.UsuarioId} value={usuarioInd.UsuarioId}>
                        {usuarioInd.NoEmpleado} - {usuarioInd.Nombre}
                      </MenuItem>
                    ))}
                  </TextField> */}


                </Grid>
                <Grid
                  item
                  xs={2}
                >
                  <div className={classes.boton}>
                    <BotonSuccess
                      label={!updateAU ? 'Agregar' : 'Editar'}
                      disabled={nuevoAU.disabled.boton} 
                      onClick={!updateAU ? postAuAction : updateAuAction}
                    />
                  </div>
                </Grid>
              </Grid>
            </FormContainer>
            <Tabla
              headers={cabecerasAU}
              data={nuevoAU.tablas.tablaAU}
              configuracion={configuracion}
              idPosition = "IdRegistro"
              admin
              mensajeTexto='Seleccione un usuario y un almacén'
              opciones = {
                [
                  {'icon' : 'editar', 'action':(index) => getDetalleAuAction(nuevoAU.tablas.tablaAU[index].IdRegistro)},
                  {'icon' : 'eliminar', 'action': (index) => openModalAction(nuevoAU.tablas.tablaAU[index].IdRegistro, 2)},
                ]
              }
              params= {
                {
                  height: 35,
                  backgroundColor: '#fff',
                }
              }
              temporal
              elevacion={0}
            />
          </Section>
        </Container>
        <Modal  
          open={modal.value} 
          typeAlert='Report' 
          typeOptions='Select' 
          title='Confirmar....' 
          message={modal.text}
          onClickCancel={closeModalAction}
          onClickAccept={() => {
            switch (modal.stepper){
              case 1:
                eliminarApAction()
                break;
              case 2:
                eliminarAuAction()
                break;
              default:
                break;
            }
          }}
        />
      </div>
      
    )   
  }
}

UsuariosAlmacenes.propTypes = {
  actions: T.object,
  classes: T.object,
  onInputChangeUsuarioProxy: T.object,
  usuariosAlmacenes: T.object,
};

const mapStateToProps = createStructuredSelector({
  usuariosAlmacenes: makeSelectUsuariosAlmacenes(),
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

const withReducer = injectReducer({ key: 'usuariosAlmacenes', reducer });
const withSaga = injectSaga({ key: 'usuariosAlmacenes', saga,  mode:DAEMON});
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyles(styles),
  withHandlers({
    onInputChangeUsuarioProxy: (props) => () => (e) => { 
      const {
        actions: {
          onInputChangeAction,
        },
      } = props;
      onInputChangeAction(2,e,2)
    },
  })
)(UsuariosAlmacenes);
