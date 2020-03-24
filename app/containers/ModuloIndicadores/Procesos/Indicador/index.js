/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/**
 *
 * Indicador
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { DAEMON } from 'utils/constants';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import XLSX from 'xlsx';
import { withHandlers } from 'recompose';
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
  IconButton,
  Fab,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FincamexLogo from 'images/logo/fincamex-logo.png';
import Spinner from 'components/Spinner';
import PopperTexto from 'components/PopperTexto';
import ReactToPrint from 'react-to-print';
import Success from 'components/BotonSuccess';
import Ventana from 'components/Ventana';
import Nubesita from '@material-ui/icons/CloudDownload';
import Informacion from '@material-ui/icons/PriorityHighRounded';
import Empty from 'images/iconos/emptyIndicador.svg';
import { uniqueId } from 'lodash';
import TablaPeriodo from './components/TablaPeriodo';
import makeSelectIndicador from './selectors';
import Actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.css'

const styles = () => ({
  paperPrincipal: {
    width: '98%',
    height: 'calc(100% - 14px)',
    overflow: 'auto',
    margin: 'auto',
  },
  heightMax: {
    height: 'calc(100% - 56px)',
  },
  heightTablaPeriodo: {
    height: '100%',
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
  informacion: {
    // marginLeft: 4,
    padding: '4px 0px 4px 0px',
  },
  iconInformacion:{
    height: '0.8em',
    width: '0.8em',
    color: 'orange',
  },
  disabled: {
    height: '0.8em',
    width: '0.8em',
    color: 'rgba(0, 0, 0, 0.26)',
  },
})

/* eslint-disable react/prefer-stateless-function */
export class Indicador extends React.Component {

  componentDidMount(){
    const {
      actions: {
        // getIndicadoresAction,
        getHistorialAction,
        getPuestosUsuariosIndicadoresAction,
      },
    } = this.props;
    getHistorialAction();

    if(this.props.permisos.especiales.descargararchivo){
      getPuestosUsuariosIndicadoresAction();
    }
  }

  render() {
    const {
      classes,
      indicador: {
        principales: {
          periodo,
          puesto,
          plaza,
          nombre,
          evalTotal,
          vacio,
          stepper,
          permisoAutorizar,
          usuarioIndicador,
          autorizador,
        },
        imagen: {
          imagenActiva,
          anchorEl,
        },
        historial,
        cualitativos,
        cuantitativos,
        resumido:{
          cabeceras,
          datos,
          bandPopover,
          nomIndicador,
        },
        descargaMasivaInfo: {
          usuarios,
        },
      },
      actions: {
        poneImagenEstatusAction,
        quitaImagenEstatusAction,
        getIndicadoresAction,
        onClickRegresarAction,
        onClickAutorizarAction,
      },
      onClickResultadoProxy,
      onClickDescargarProxy,
      permisos,
    } = this.props;

    if(cuantitativos.datos.length > 0 && typeof cuantitativos.datos[0].Estatus !== 'object'){
      for (let i = 0; i < cuantitativos.datos.length - 1; i+=1) {
        cuantitativos.datos[i].Estatus = <PopperTexto
          mostrarPopper={poneImagenEstatusAction}
          ocultarPopper={quitaImagenEstatusAction}
          anchorEl={anchorEl}
          imagenActiva={imagenActiva}
          id={`popperEstatus${i}`}
          estatus={cuantitativos.datos[i].Estatus}
        />
        cuantitativos.datos[i].Resultado = <React.Fragment>
          <Grid
            container
            style={{display: 'contents'}}
          >
            <Typography
              style={
                {
                  fontSize: '11px',
                  width: '42px',
                  display: 'inline-block',
                }
              }
            >
              {cuantitativos.datos[i].Resultado}
            </Typography>
            <IconButton 
              aria-label="Informacion" 
              className={classes.informacion}
              disabled={cuantitativos.datos[i].Resumido === '[]'}
              onClick={onClickResultadoProxy('cuantitativos', i)}
            >
              <Informacion className={cuantitativos.datos[i].Resumido !== '[]' ? classes.iconInformacion : classes.disabled} />
            </IconButton>
          </Grid>
        </React.Fragment>
      }
    }
    if(cualitativos.datos.length > 0 && typeof cualitativos.datos[0].Estatus !== 'object'){
      for (let i = 0; i < cualitativos.datos.length - 3; i+=1) {
        cualitativos.datos[i].Estatus = <PopperTexto
          mostrarPopper={poneImagenEstatusAction}
          ocultarPopper={quitaImagenEstatusAction}
          anchorEl={anchorEl}
          imagenActiva={imagenActiva}
          id={`popperEstatusCualitativa${i}`}
          estatus={cualitativos.datos[i].Estatus}
        />
        cualitativos.datos[i].Resultado = <React.Fragment>
          <Grid
            container
            style={{display: 'contents'}}
          >
            <Typography
              style={
                {
                  fontSize: '11px',
                  width: '42px',
                  display: 'inline-block',
                }
              }
            >
              {cualitativos.datos[i].Resultado}
            </Typography>
            <IconButton 
              aria-label="Informacion" 
              className={classes.informacion}
              onClick={onClickResultadoProxy('cualitativos', i)}
            >
              <Informacion className={classes.iconInformacion} />
            </IconButton>
          </Grid>
        </React.Fragment>
      }
    }
    const FechaActual = moment(new Date()).format("DD/MM/YYYY");
    let body = <React.Fragment></React.Fragment>
    
    if(bandPopover){
      body = <React.Fragment>
        <Tabla
          rowsTamano='small'
          id='tablaDetallado'
          sinBorde
          stickyHeader
          elevacion={0}
          cabeceras={cabeceras}
          datos={datos}
          scrollEnDialog
        />
      </React.Fragment>
    }
    
      
    // if(stepper === 1)
    //   return <TablaPeriodo 
    //     datos={historial.datos}
    //     cabeceras={historial.cabeceras}
    //     onClickDetalle={getIndicadoresAction}
    //   />
    return (
      <React.Fragment>
        <Spinner />
        <Appbar 
          texto='Indicadores'
          onClickRegresar={stepper === 0 ? onClickRegresarAction : null}
          // hayCambios={true}
        />
        <Grid
          container
          style={
            {
              height: 'calc(100vh - 128px)',
            }
          }
          alignContent='center'
          justify='flex-end'
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className={stepper === 1 ? classes.heightTablaPeriodo : classes.heightMax }
          >
            {stepper === 1 ? 
              <React.Fragment>
                {
                  permisos.especiales.descargararchivo 
                    ? (
                      <ReactToPrint
                        trigger={() => (
                          <Fab color="primary" aria-label="add" disabled={usuarios.length === 0} style={{position: 'absolute', zIndex: 2, right: 10, bottom: 10, backgroundColor: 'green'}}>
                            <Nubesita />
                          </Fab>)}
                        content={() => this.compRef}
                      />
                    )
                    : null
                }
                <div style={{display: 'none'}}>
                  <div ref={el => (this.compRef = el)}>
                    {
                      usuarios.map(usuario => (
                        <div key={uniqueId('usuarios_indicadores')} style={{ height:'100vh' }} >
                          <div>
                            <Grid
                              container
                              id='containerPDFTotales'
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
                                    marginTop: 50,
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
                                    {usuario.puesto.toUpperCase()}
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
                                    {usuario.plaza}
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
                                    {usuario.nombre.toUpperCase()}
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
                                    style={{marginRight: 50}}
                                  >
                                  
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
                                  idTabla='tablaCuantitativosInd'
                                  id='tablaPrincipal'
                                  elevacion={0}
                                  encabezados={cuantitativos.encabezados}
                                  cabeceras={cuantitativos.cabeceras}
                                  datos={usuario.cuantitativos}
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
                                  idTabla='tablaCualitativosInd'
                                  id='tablaSecundaria'
                                  sinBorde
                                  elevacion={0}
                                  cabeceras={cualitativos.cabeceras}
                                  datos={usuario.cualitativos}
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
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                                style={{
                                  textAlign: 'center',
                                }}
                              >
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      ))
                    }                   
                  </div>
                </div>
                <TablaPeriodo 
                  datos={historial.datos}
                  cabeceras={historial.cabeceras}
                  onClickDetalle={getIndicadoresAction}
                />
              </React.Fragment>
              :
              <Paper
                className={classes.paperPrincipal}
                id='paperIndicador'
              >
                <Ventana 
                  abrir={bandPopover}
                  overflow
                  titulo={`${nomIndicador} % de cumplimiento`}
                  successLabel={
                    <React.Fragment>
                      <Nubesita className={classes.descargar} />
                      Descargar
                    </React.Fragment>
                  }
                  successDisabled
                  onClickSuccess={onClickDescargarProxy}
                  iconoTitulo={
                    <IconButton 
                      aria-label="Informacion" 
                      style={{
                        padding: '4px 8px 8px 8px',
                      }}
                      disabled
                    >
                      <Informacion className={classes.iconInformacion} />
                    </IconButton>
                  }
                  body={body}
                  onClickCerrar={onClickResultadoProxy('', -1)}
                  // chico
                />
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
                        Una vez que se generen sus indicadores se mostrarán en este apartado.
                      </Typography>
                    </Grid>
                  </Grid>
                  :
                  <Grid
                    container
                    id='containerPDF'
                    // eslint-disable-next-line no-return-assign
                    ref={el => (this.componentRef = el)}
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
                        idTabla='tablaCuantitativosInd'
                        id='tablaPrincipal'
                        elevacion={0}
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
                        idTabla='tablaCualitativosInd'
                        id='tablaSecundaria'
                        sinBorde
                        elevacion={0}
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
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      style={{
                        textAlign: 'center',
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                        }}
                      >
                        {permisoAutorizar === 1 ? `Autorizado por: ${autorizador}` : '*Pendiente por autorizar'}
                      </Typography>
                    </Grid>
                  </Grid>
                }
              </Paper>
            }
          </Grid>
          <Grid
            item
            xs={3}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            style={{
              paddingRight: 24,
              textAlign: 'right',
            }}
          >
            {
              permisoAutorizar === 0 &&
              <Success 
                label='Autorizar'
                size='small'
                onClick={onClickAutorizarAction}
              />
            }
            {vacio === 0 && stepper === 0 && usuarioIndicador && permisoAutorizar === 1 &&
              <ReactToPrint
                trigger={() => 
                  <Button 
                    variant="contained" 
                    color="primary"
                    size='small'
                    className={classes.button}
                  >
                    <Nubesita className={classes.descargar} />
                    Imprimir
                  </Button>
                }
                content={() => this.componentRef}
              />
            }
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Indicador.propTypes = {
  classes: T.object,
  indicador: T.object,
  actions: T.object,
  onClickResultadoProxy: T.func,
  onClickDescargarProxy: T.func,
  permisos: T.object,
};

const mapStateToProps = createStructuredSelector({
  indicador: makeSelectIndicador(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'indicador', reducer });
const withSaga = injectSaga({ key: 'indicador', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withHandlers({
    onClickResultadoProxy: (props) => (tipoIndicador, indice) => () => {
      const {
        actions: {
          onClickResultadoAction,
        },
      } = props;
      if(tipoIndicador !== ''){
        const {
          actions: {
            onClickDescargarDetalleAction,
          },
          indicador: {
            [tipoIndicador]: {
              datos: {
                [indice]: {
                  IdBitacoraCambio,
                },
              },
            },
          },
        } = props;
        if(IdBitacoraCambio){
          onClickDescargarDetalleAction(IdBitacoraCambio);
        } else {
          onClickResultadoAction(tipoIndicador, indice);
        }
      } else{
        onClickResultadoAction(tipoIndicador, indice);
      }
    },
    onClickDescargarProxy: (props) => () => {
      const {
        indicador: {
          resumido: {
            detallado,
            nomIndicador,
          },
        },
      } = props
     
      const ws = XLSX.utils.json_to_sheet(
        detallado.Datos, 
        {header:[
          'A', 
          'B', 
          'C', 
          'D', 
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
        ], skipHeader:true});
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nomIndicador.substring(0, 25));
      /* generate XLSX file and send to client */
      XLSX.writeFile(wb, `${nomIndicador}.xlsx`)

    },
  }),
)(Indicador);
