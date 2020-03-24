/**
 *
 * Indicador
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Appbar from 'components/Appbar';
import Tabla from 'components/TablaSencilla';
// import Success from 'components/BotonSuccess';
import moment from 'moment';
import {
  Grid,
  Paper,
  Typography,
  Button,
  FormHelperText,
  FormControl,
  Tooltip,
  Chip,
  IconButton,
} from '@material-ui/core';
import Nubesita from '@material-ui/icons/CloudUpload';
import Archivito from '@material-ui/icons/InsertDriveFile';
import { withHandlers } from 'recompose';
import { DAEMON } from 'utils/constants';
import { withStyles } from '@material-ui/core/styles';
import FincamexLogo from 'images/logo/fincamex-logo.png';
import Spinner from 'components/Spinner';
import Success from 'components/BotonSuccess';
import FormInput from 'components/FormInput';
import Ventana from 'components/Ventana';
import Modal from 'components/Dialog/alertDialog';
import Cancelar from 'components/BotonCancelar';
import Combo from 'components/Seleccion';
import PopperTexto from 'components/PopperTexto';
import Izquierda from "@material-ui/icons/KeyboardArrowLeft";
import Derecha from "@material-ui/icons/KeyboardArrowRight";
import IconCambio from "@material-ui/icons/Autorenew";
import Empty from 'images/iconos/emptyIndicador.svg';
import makeSelectCambiarIndicador from './selectors';
import Actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.css'

const styles = () => ({
  paperPrincipal: {
    width: '98%',
    height: 'calc(100% - 16px)',
    overflow: 'auto',
    margin: 'auto',
  },
  paperCampos: {
    width: '98%',
    overflow: 'auto',
    margin: 'auto',
    padding: '0px 12px 16px 12px',
    marginBottom: 8,
  },
  gridImagen: {
    textAlign: 'center',
    paddingTop: '12px',
    margin: 'auto 0 auto 0',
  },
  gridEvaluacion: {
    textAlign: 'center',
    padding: '6px 0px 6px 0px',
    margin: '16px 1px 0px 1px',
    backgroundColor: '#BFBFBF',
    opacity: '0.8',
  },
  paperTitulo: {
    fontFamily: '"Roboto","Medium"',
    fontSize: '16px',
    color: '#424242',
  },
  paperFecha: {
    fontFamily: '"Roboto","Medium"',
    fontSize: '13px',
    color: '#424242',
    textTransform: 'initial',
  },
  paperPuesto: {
    margin: '32px 1px 0px 1px',
    backgroundColor: '#E0E0E0',
    width: '49.8%',
  },
  paperNombre: {
    marginLeft: '1px',
    backgroundColor: '#E0E0E0',
    width: '49.8%',
  },
  paperPlaza: {
    margin: '32px 1px 0px 0px',
    width: '49.77%',
  },
  paperPuestoTexto: {
    padding: '6px 0px 6px 0px',
    backgroundColor: '#F5F5F5',
  },
  puestoTexto: {
    paddingLeft: '8px',
  },
  paperPuestoCampo: {
    backgroundColor: '#E0E0E0',
    padding: '6px 0px 6px 0px',
  },
  textoSubtitulo: {
    textTransform: 'initial',
    color: '#424242', 
  },
  textoIndicadores: {
    textTransform: 'initial',
    color: '#424242', 
    textAlign: 'left',
    fontSize: '14px',
    fontFamily: '"Roboto","Medium"',
    paddingLeft: '8px',
  },
  textoEvalTotal: {
    textTransform: 'initial',
    color: '#424242', 
    textAlign: 'right',
    fontSize: '14px',
    fontFamily: '"Roboto","Medium"',
    display: 'inline-flex',
    paddingRight: '8px',
    verticalAlign: 'text-bottom',
  },
  textoTotal: {
    textTransform: 'initial',
    color: '#424242', 
    textAlign: 'right',
    fontSize: '23px',
    fontFamily: '"Roboto","Medium"',
    paddingRight: '8px',
    display: 'inline-flex',
  },
  gridIndicador: {
    textAlign: 'right',
    padding: '6px 0px 6px 0px',
    margin: '32px 1px 0px 1px',
    backgroundColor: '#BFBFBF',
    opacity: '0.8',
  },
  firmasTitulo: {
    backgroundColor: '#BFBFBF',
    opacity: 0.8,
    textAlign: 'center',
    border: '1px solid #BDBBBB',
  },
  evaluadorTitulo: {
    color: '#424242',
    fontFamily: "'Roboto','medium'",
    fontSize: '10px',
  },
  firmasTexto: {
    padding: '32px 0 32px 0',
    marginBottom: '12px',
    border: '1px solid #BDBBBB',
    borderTop: 'initial',
  },
  button: {
    height: '35px',
    margin: 'auto',
    backgroundColor: '#28950f',
    color: 'white',
    fontSize: '12px',
    "&:hover": {
      backgroundColor: '#1f710c',
    },
  },
  descargar: {
    marginRight: 8,
    width: '16px',
    heigth: '16px',
  },
  leftIcon: {
    marginRight: 8,
    fontSize: '20px',
    color: '#28950F',
  },
  verdesito:{
    backgroundColor: '#28950f5e',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#28950f8a',
    },
    color: '#545050',
    textTransform: 'initial',
  },
})

/* eslint-disable react/prefer-stateless-function */
export class CambiarIndicador extends React.Component {

  componentDidMount(){
    const {
      actions: {
        getDepartamentosAction,
      },
    } = this.props;
    getDepartamentosAction();
  }

  render() {
    
    const {
      classes,
      cambiarIndicador: {
        principales: {
          periodo,
          // renderEstatus,
          puesto,
          plaza,
          nombre,
          evalTotal,
          vacio,
          hayCambios,
          bandGuardar,
          archivos,
          archivosPaginado,
          archivoTempValido,
          abrirModalArchivo,
          bandModalCerrar,
          paginaInicio,
          paginaFin,
          bandAceptar,
          observaciones,
          observacionesValido,
          filtros: {
            departamentoSlc,
            departamentos,
            puestoSlc,
            puestos,
            empleadoSlc,
            empleados,
            filtrar,
          },
        },
        imagen: {
          imagenActiva,
          anchorEl,
        },
        cualitativos,
        cuantitativos,
      },
      actions: {
        poneImagenEstatusAction,
        quitaImagenEstatusAction,
        getIndicadoresAction,
        onClickAceptarVentanaAction,
        onClickCerrarVentanaAction,
        onEliminarArchivoAction,
        abrirModalGuardarAction,
        modalCerrarAction,
        limpiarStateAction,
        // onDescargarArchivoAction,
      },
      onChangeInputProxy,
      onChangeComboProxy,
      onUploadedFileTempProxy,
      obtenerArchivosProxy,
      eliminarArchivoProxy,
      onClickDescargarProxy,
    } = this.props;

    let body = null;    
    
    if(cuantitativos.datos.length > 0){
      for (let i = 0; i < cuantitativos.datos.length - 1; i+=1) {
        cuantitativos.datos[i].Estatus = <PopperTexto
          mostrarPopper={poneImagenEstatusAction}
          ocultarPopper={quitaImagenEstatusAction}
          anchorEl={anchorEl}
          imagenActiva={imagenActiva}
          id={`popperEstatus${i}`}
          estatus={cuantitativos.datos[i].Estatus}
        />
        // cuantitativos.datos[i].Resultado = Input(onChangeInputProxy, 'cuantitativos', i, cuantitativos.datos[i].Resultado);
      }
      body = 
      <React.Fragment>
        <Grid
          container
          alignItems="flex-end"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              paddingTop: 16,
            }}
          >
            <FormInput 
              multiline
              rows='7'
              placeholder=''
              fullWidth
              variant='outlined'
              requerido
              indice={4}
              width='100%'
              isComplete={observacionesValido}
              valor={observaciones}
              onChange={onChangeComboProxy}
            />
          </Grid>
        </Grid>
        <Grid
          container
          style={
            {
              paddingTop: 16,
            }
          }
        >
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            lg={3}
            xl={3}
          >
            <FormControl>
              <input
                accept="*"
                style={{display: 'none'}}
                id='subirArchivosTemp'
                onChange={onUploadedFileTempProxy}
                type="file"
                multiple
              />
              <label htmlFor='subirArchivosTemp'>
                <Button 
                  size="small"
                  variant="contained"
                  component="span"
                  className={classes.verdesito}
                >
                  <Nubesita 
                    className={classes.leftIcon}
                  /> Adjuntar evidencia
                </Button>
              </label>
              {archivos.length === 0 && 
                <FormHelperText
                  style={
                    {
                      color: !archivoTempValido ? 'red' : 'gray',
                    }
                  }
                >
                  *Requerido
                </FormHelperText>
              }
            </FormControl>
          </Grid>
          <Grid
            item
            xs={8}
            sm={8}
            md={9}
            lg={9}
            xl={9}
            style={{
              textAlign: 'center',
            }}
          >
            {archivos.length === 0 ? null : 
              <IconButton
                disabled={paginaInicio === 0} 
                onClick={obtenerArchivosProxy(0)}
                style={{
                  padding: 8,
                }}
              >
                <Izquierda fontSize="small" />
              </IconButton>}
            {archivosPaginado.map((cot, indice) => 
              <Tooltip 
                key={uniqueId('archivosTemp')}
                title = {
                  cot.name}
              >
                <Chip
                  icon={<Archivito />}
                  label={
                    
                    cot.name.substring(0,15)}
                  style={{fontSize: '0.7em', marginRight: 8}}
                  onClick={onClickDescargarProxy(indice)}
                  onDelete={eliminarArchivoProxy(indice)}
                />
              </Tooltip>)}
            {archivos.length === 0 ? null : 
              <IconButton
                disabled={paginaFin >= archivos.length || archivos.length < 3} 
                onClick={obtenerArchivosProxy(1)}
                style={{
                  padding: 8,
                }}
              >
                <Derecha fontSize="small" />
              </IconButton>}
          </Grid>
        </Grid>
      </React.Fragment>
    }
    const FechaActual = moment(new Date()).format("DD/MM/YYYY");
    const iconoTitulo = 
      <IconButton 
        style={{padding: 8}}
        disabled
      >
        <IconCambio />
      </IconButton>

    if(vacio === -1)
      return <Spinner />;

    return (
      <React.Fragment>
        <Appbar 
          texto='Cambiar indicador'
          // onClickRegresar={() => true}
          // hayCambios={true}
        />
        <Grid
          container
          style={
            {
              height: 'calc(100vh - 128px)',
            }
          }
          justify='flex-end'
        >
          <Ventana 
            abrir={bandGuardar}
            titulo='Observaciones'
            successLabel='Aceptar'
            onClickSuccess={onClickAceptarVentanaAction}
            successDisabled={bandAceptar}
            iconoTitulo={iconoTitulo}
            body={body}
            onClickCerrar={onClickCerrarVentanaAction}
            chico
          />
          <Modal 
            open={abrirModalArchivo}
            typeAlert='Report'
            typeOptions='Select'
            title='Confirmar....'
            message='¿Esta seguro que desea eliminar el archivo?'
            onClickAccept={onEliminarArchivoAction}
            onClickCancel={eliminarArchivoProxy(-1)}
          />
          <Modal 
            open={bandModalCerrar}
            typeAlert='Report'
            typeOptions='Select'
            title='Confirmar....'
            message='Existen datos no guardados. ¿Está seguro que desea cancelar?'
            onClickAccept={limpiarStateAction}
            onClickCancel={modalCerrarAction}
          />
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Paper
              id='paperIndicador'
              className={classes.paperCampos}
            >
              <Grid
                container
                style={{
                  paddingLeft: 24,
                }}
              >
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                >
                  <Combo 
                    indice={1}
                    label='Departamento:'
                    campoValido
                    valor={departamentoSlc}
                    onChange={onChangeComboProxy}
                    opciones={departamentos}
                    idOpcion='IdDepartamento'
                    nomOpcion='Nombre'
                    marginTop='25px'
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                >
                  <Combo 
                    indice={2}
                    label='Puesto:'
                    campoValido
                    valor={puestoSlc}
                    onChange={onChangeComboProxy}
                    opciones={puestos}
                    idOpcion='IdPuesto'
                    nomOpcion='Nombre'
                    marginTop='25px'
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                >
                  <Combo 
                    indice={3}
                    label='Empleado:'
                    campoValido
                    valor={empleadoSlc}
                    onChange={onChangeComboProxy}
                    opciones={empleados}
                    idOpcion='UsuarioId'
                    nomOpcion='Nombre'
                    marginTop='25px'
                  />
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                  style={{
                    marginTop: 'auto',
                    textAlign: 'center',
                    paddingTop: 12,
                  }}
                >
                  <Success 
                    label='Filtrar'
                    size='small'
                    disabled={!filtrar}
                    onClick={getIndicadoresAction}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              height: 'calc(100% - 132px)',
            }}
          >
            <Paper
              className={classes.paperPrincipal}
              id='paperIndicador'
            >
              {vacio === 1 ?
                <Grid 
                  container 
                  direction="column"
                  justify="center"
                  alignItems="center"
                  style={{
                    height: '100%',
                  }}
                >
                  <Grid
                    item
                  >
                    <img
                      src={Empty}
                      alt="Error al cargar la imagen"
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </Grid>
                  <Grid>
                    <Typography
                      style={{
                        fontSize: 24,
                      }}
                    >
                      Una vez que seleccione la información requerida se mostrarán los datos en este apartado.
                    </Typography>
                  </Grid>
                </Grid>
                :
                <Grid
                  container
                  id='containerPDF'
                >
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={2}
                    lg={2}
                    xl={2}
                    className={classes.gridImagen}
                  >
                    <img
                      alt='Error al cargar la imagen'
                      src={FincamexLogo}
                      style={{
                        width: '75%',
                        // height: '%',
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={8}
                    lg={8}
                    xl={8}
                    className={classes.gridImagen}
                  >
                    <Typography
                      className={classes.paperTitulo}
                    >
                      FINCAMEX / DIRECCION POR OBJETIVOS
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={2}
                    lg={2}
                    xl={2}
                    className={classes.gridImagen}
                  >
                    <Typography
                      variant='subtitle1'
                      className={classes.paperFecha}
                    >
                      Fecha: {FechaActual}
                    </Typography>
                  </Grid>
                  {/* Nueva Fila */}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className={classes.gridEvaluacion}
                  >
                    <Typography
                      variant='h6'
                      className={classes.textoSubtitulo}
                    >
                      EVALUACIÓN: {periodo}
                    </Typography>
                  </Grid>
                  {/* Nueva Fila */}
                  <Grid
                    item
                    container
                    className={classes.paperPuesto}
                  >
                    <Grid
                      item
                      xs={4}
                      sm={4}
                      md={4}
                      lg={4}
                      xl={4}
                      className={classes.paperPuestoCampo}
                    >
                      <Typography
                        className={classes.puestoTexto}
                      >
                        PUESTO
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      sm={8}
                      md={8}
                      lg={8}
                      xl={8}
                      className={classes.paperPuestoTexto}
                    >
                      <Typography
                        className={classes.puestoTexto}
                      >
                        {puesto.toUpperCase()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    className={classes.paperPlaza}
                  >
                    <Grid
                      item
                      xs={4}
                      sm={4}
                      md={4}
                      lg={4}
                      xl={4}
                      className={classes.paperPuestoCampo}
                    >
                      <Typography
                        className={classes.puestoTexto}
                      >
                        PLAZA
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      sm={8}
                      md={8}
                      lg={8}
                      xl={8}
                      className={classes.paperPuestoTexto}
                    >
                      <Typography
                        className={classes.puestoTexto}
                      >
                        {plaza.toUpperCase()}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* Nueva Fila */}
                  <Grid
                    item
                    container
                    className={classes.paperNombre}
                  >
                    <Grid
                      item
                      xs={4}
                      sm={4}
                      md={4}
                      lg={4}
                      xl={4}
                      className={classes.paperPuestoCampo}
                    >
                      <Typography
                        className={classes.puestoTexto}
                      >
                        NOMBRE
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      sm={8}
                      md={8}
                      lg={8}
                      xl={8}
                      className={classes.paperPuestoTexto}
                    >
                      <Typography
                        className={classes.puestoTexto}
                      >
                        {nombre.toUpperCase()}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* Nueva Fila */}
                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className={classes.gridIndicador}
                  >
                    <Grid
                      item
                      xs={4}
                      sm={4}
                      md={2}
                      lg={2}
                      xl={2}
                      style={{margin: 'auto'}}
                    >
                      <Typography
                        className={classes.textoIndicadores}
                      >
                        INDICADORES
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      sm={8}
                      md={8}
                      lg={10}
                      xl={10}
                    >
                      <Typography
                        className={classes.textoEvalTotal}
                      >
                        EVALUACIÓN TOTAL 
                      </Typography>
                      <Typography
                        className={classes.textoTotal}
                      >
                        {evalTotal}%
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* Nueva Fila */}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{
                      margin: '0 1px 8px 1px',
                    }}
                  >
                    <Tabla
                      rowsTamano='small'
                      sinBorde
                      key='tablaPrincipal'
                      id='tablaPrincipal'
                      idTabla='tablaCuantitativosInd'
                      funcInput={onChangeInputProxy}
                      opc='cuantitativos'
                      elevacion={0}
                      adorno='%'
                      encabezados={cuantitativos.encabezados}
                      cabeceras={cuantitativos.cabeceras}
                      datos={cuantitativos.datos}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={{
                      margin: '0 1px 8px 1px',
                    }}
                  >
                    <Tabla
                      rowsTamano='small'
                      id='tablaSecundaria'
                      idTabla='tablaCualitativosInd'
                      key='tablaSecundaria'
                      sinBorde
                      elevacion={0}
                      func={onChangeInputProxy}
                      opc='cualitativos'
                      cabeceras={cualitativos.cabeceras}
                      datos={cualitativos.datos}
                    />
                  </Grid>
                  {/* Nueva Fila */}
                  <Grid
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                  />
                  <Grid
                    item
                    xs={5}
                    sm={5}
                    md={5}
                    lg={5}
                    xl={5}
                    className={classes.firmasTitulo}
                  >
                    <Typography
                      className={classes.evaluadorTitulo}
                    >
                      EVALUADOR (FIRMA Y FECHA)
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    sm={5}
                    md={5}
                    lg={5}
                    xl={5}
                    className={classes.firmasTitulo}
                    style={{
                      borderLeft: 'initial',
                    }}
                  >
                    <Typography
                      className={classes.evaluadorTitulo}
                    >
                      EVALUADO (FIRMA Y FECHA)
                    </Typography>
                  </Grid>
                  <Grid 
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                  />
                  {/* Nueva Fila */}
                  <Grid
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                  />
                  <Grid
                    item
                    xs={5}
                    sm={5}
                    md={5}
                    lg={5}
                    xl={5}
                    className={classes.firmasTexto}
                  />
                  <Grid
                    item
                    xs={5}
                    sm={5}
                    md={5}
                    lg={5}
                    xl={5}
                    className={classes.firmasTexto}
                    style={{
                      borderLeft: 'initial',
                    }}
                  />
                  <Grid 
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                  />
                </Grid>
              }
            </Paper>
          </Grid>
          {vacio === 0 ? 
            <Grid
              container
              justify='flex-end'
              style={{
                width: '98%',
                margin: '0 auto',
              }}
            >
              <Grid
                item
                xs={3}
                sm={3}
                md={2}
                lg={1}
                xl={1}
                style={{
                  textAlign: 'right',
                }}
              >
                <Cancelar 
                  label='Cerrar'
                  size='small'
                  onClick={hayCambios ? modalCerrarAction : limpiarStateAction}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sm={3}
                md={2}
                lg={1}
                xl={1}
                style={{
                  marginLeft: 16,
                  textAlign: 'right',
                }}
              >
                <Success 
                  label='Guardar'
                  size='small'
                  onClick={abrirModalGuardarAction}
                />
              </Grid>
            </Grid> : null
          }
        </Grid>
      </React.Fragment>
    );
  }
}

CambiarIndicador.propTypes = {
  classes: T.object,
  cambiarIndicador: T.object,
  actions: T.object,
  onChangeInputProxy: T.func,
  onChangeComboProxy: T.func,
  onUploadedFileTempProxy: T.func,
  obtenerArchivosProxy: T.func,
  eliminarArchivoProxy: T.func,
};

const mapStateToProps = createStructuredSelector({
  cambiarIndicador: makeSelectCambiarIndicador(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
  }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'cambiarIndicador', reducer });
const withSaga = injectSaga({ key: 'cambiarIndicador', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withHandlers({
    onChangeInputProxy: (props) => (opcion, id) => (e) => {
      const {
        actions: {
          onChangeResultadoAction,
        },
      } = props;
      onChangeResultadoAction(opcion, id, e.target.value);
    },
    onChangeComboProxy: (props) => (id) => (e) => {
      const {
        actions: {
          onChangeComboAction,
          onChangeDepartamentoAction,
          onChangePuestoAction,
        },
      } = props;
      onChangeComboAction(id, e.target.value);
      if(id === 1) {
        onChangeDepartamentoAction(e.target.value);
      } else if (id === 2) {
        onChangePuestoAction(e.target.value);
      }
    },
    onUploadedFileTempProxy: (props) => (event)  => {
      const {
        actions: {
          subirArchivosTempAction,
        },
        cambiarIndicador: {
          principales: {
            archivos,
          },
        },
        enqueueSnackbar : notificacion,
      } = props;
      
      const {
        target: {
          files,
        },
      } = event;
      const archivosTemp = new FormData();
      archivosTemp.append('refId', 'formato');

      let tipo = '';
      let band = true;
      let existe = false;

      for(let i = 0; i < files.length; i+=1){
        tipo = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
        tipo = tipo.toLowerCase();
        if(['pdf', 'xlsx', 'docx', 'doc', 'png', 'jpg', 'jpeg', 'xls'].includes(tipo.toLowerCase())){
          for (let j = 0; j < archivos.length; j+=1) {
            if(archivos[j].name === files[i])
              existe = true;
          }
          if(!existe)
            archivos.push(files[i])
        } else {
          band = false;
        }
      }

      if(band){
        for (let j = 0; j < archivos.length; j+=1) {
          archivosTemp.append('files', archivos[j], archivos[j].name);
        }
        subirArchivosTempAction(archivos, archivosTemp)
      } else{
        notificacion({
          message: 'Existe uno o mas archivos con formato invalido',
          options: {
            variant: 'warning',
          },
        })
      }
    },
    obtenerArchivosProxy: (props) => (indice) => () => {
      const {
        actions: {
          obtenerArchivosAction,
        },
      } = props;
      obtenerArchivosAction(indice);
    },
    eliminarArchivoProxy: (props) => (indice) => () => {
      const {
        actions: {
          abrirModalAction,
        },
      } = props;
      abrirModalAction(indice);
    },
    onClickDescargarProxy: (props) => (indice) => () => {
      const {
        cambiarIndicador: {
          principales: {
            archivos,
            paginaInicio,
          },
        },
      } = props;
      // debugger;
      const img = archivos[(paginaInicio + indice)];
      const url = window.URL.createObjectURL(new Blob([img]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', img.name);
      document.body.appendChild(link);
      link.click();
    },
  }),
)(CambiarIndicador);
