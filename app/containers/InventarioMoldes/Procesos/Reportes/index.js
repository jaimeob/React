/**
 *
 * Reportes
 *
 */


import React from 'react';
import ReactToPrint from 'react-to-print';
import T from 'prop-types';
import { compose} from 'redux';
import { connect } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer'
import { withStyles,createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
// import { DAEMON } from 'utils/constants';
import { createStructuredSelector } from 'reselect';
// import {enqueueSnackbar} from 'reducers/notifications/actions';
import injectSaga from 'utils/injectSaga';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// import withNotifier from 'components/HOC/withNotifier';
import injectReducer from 'utils/injectReducer';
import DataTable from 'components/DataTable';
import Seleccion from 'components/Seleccion';
import Success from 'components/BotonSuccess'
import IconoDescarga from '@material-ui/icons/VerticalAlignBottomOutlined'
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import espanol from 'moment/src/locale/es';
import { DateRangePicker } from 'react-dates';

import {
  AppBar,
  Toolbar,
  // Paper,
  Typography,
  Grid,
  FormControl, 
  InputLabel, Select, 
  MenuItem, Card, 
  // IconButton, 
  Button,
} from '@material-ui/core';
// import Grey from '@material-ui/core/colors/grey'
import Input from 'components/FormInput';
import {ValuacionPDF} from './components/ValuacionPDF'
import {ExistenciaPDF} from './components/ExistenciaPDF'
import {KardexPDF} from './components/KardexPDF'

// import Calendario from './components/DateRangerPicker';
import reducer from './reducer';
import Actions from './actions';
import saga from './saga';
// import { withStyles } from '@material-ui/core/styles';
// import ArrowBack from '@material-ui/icons/ArrowBack';
// import Modal from 'components/Dialog/alertDialog';
// import ComboMultiple from 'components/FiltroSeleccion';
// import Combo from 'components/FormSelect';
import makeSelectReportes  from './selectors';
import { Container } from './styledComponents';
import ConfiabilidadInventario from './components/ConfiabilidadInventario';
// import NuevoMolde from './components/NuevoMolde';
// import Documentacion from './components/Documentacion';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textTransform:'inherit',
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  botonLila:{
    backgroundColor: '#3F51B5',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#3F51B5',
    },
    color: 'white',
    textTransform:'inherit',
  },
  leftIcon: {
    marginRight: 8,
  },
  Linear: {
    backGround:'#ff9100',
  },
  formControlSeleccion: {
    minWidth: '90%',
    maxWidth: '90%',
    marginTop: 2,
  },
  fullWidth: {
    width: '100%',
    marginTop: 2,
  },
  image: {
    width: '90px',
    // heigth: 'auto',
  },
  typography:{
    textTransform:'inherit',
  },
})


/* eslint-disable react/prefer-stateless-function */
export class Reportes extends React.Component {
  componentDidMount(){
    const {
      actions: {
        getCombosAction,
        setUsuarioAction,
      },
      usuarioId,
    } = this.props;
    getCombosAction(usuarioId);
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

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#ff9100",
          color:'red',
        },
      },
      MuiTableCell:{
        root:{
          color:'red',
        },
        body:{
          color:'red !important',
        },
      },
    },
    typography: {
      useNextVariants: true,
    },
  });

  getMuiThemeLinear = () => createMuiTheme({
    overrides: {
      MuiLinearProgress: {
        barColorPrimary:{
          backgroundColor:'#ff9100',
        },
      },
    },
    typography: {
      useNextVariants: true,
    },
  });

  timeOut =  (getReporte) => {
    setTimeout(getReporte,2000)
  };

  render() {
    const {
      reportes: {
        configuracion:{
          combos: {
            tiposReportes,
            // tiposMovmiento,
            plazas,
            almacenes,
            moldes,
            años,
            periodos,
            comboVacio,
            origenes,
            destinos,
            // codigosInicio,
            // codigosFinal,
            tiposMovimientos,
          },
          campos: {
            tipoReporte,
            plaza,
            almacen,
            molde,
            año,
            periodo,
            fechaInicio,
            tipoMovimiento,
            origen,
            destino,
            codigoInicio,
            codigoFinal,
          },
          parametros,
          datosConfiabilidad:{
            cabeceras,
            datos,
          },
          datosReporte,
          headersReporteExistencia,
          headersReporteValuacion,
          headersReporteKardex,
          configuracion,
          // combos,
        },
        // stepper,
        // usuario,
        cargando,
        // habilitarConsulta,
        mostrarConfiabilidad,
      },
      actions: {
        mostrarCargandoAction,
        getReporteAction,
        limpiarCamposAction,
      },
      classes,
      onInputChangeProxy,
      // handleDownloadExcelProxy,
      onChangeFechaProxy,
      onFechaInputProxy,
      isOutsideRange,

    } = this.props;

    const tamaño = fechaInicio.mostrar ? 40 : 25
    const margen = fechaInicio.mostrar ? 1.8 : 0

    const comboPlazas = plazas.length>0?plazas:comboVacio
    let cabecerasReporte = []


    switch(tipoReporte.valor){
      case 1:
        cabecerasReporte = headersReporteExistencia
        break;
      case 2:
        cabecerasReporte = headersReporteValuacion
        break;
      case 3:
        cabecerasReporte = headersReporteKardex
        break;
      default:
        cabecerasReporte = [];
    }

    return (
      <div>
        <Grid
          container
          style={{
            display:'grid',
          }}
        > 
          <Container
            flexDirection="column"
          >
            <AppBar
              position="static"
              color="default"
            >
              <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Reportes de inventario de moldes
                </Typography>
              </Toolbar>
            </AppBar>
            <Card
              style={{
                margin:'10px 10px 1px 10px',
                overflow: 'initial',
                position:'relative',
              }}
              elevation={1}
            >
              {/* <Typography  
                color="primary"
                variant="h6"
                className={classes.grow}
                style={{
                  padding:'10px 20px 0px 20px',
                }}
              >
                Selecciona un reporte
              </Typography> */}
              <Grid
                container
                xs={12}
                md={12}
                sm={12}    
                style={{marginTop:'10px'}}     
              >
                <Grid
                  item
                  xs={10}
                  md={10}
                  sm={10}
                >
                  <FormControl 
                    // disabled = {plazaSeleccionada === ''}
                    className={classes.formControl}
                    fullWidth
                    display="flex"
                    style={{ 
                      margin: '0vh 1.5vh 0vh 2.5vh',
                      width:'50vh',
                      fontSize:'14px',
                    }}
                  >
                    <Seleccion
                      opciones={tiposReportes}
                      idOpcion='IdReporte'
                      nomOpcion='Nombre'
                      // requerido
                      valor={tipoReporte.valor}
                      onChange={onInputChangeProxy}
                      label='Seleccione un reporte:'
                      indice={0}
                      // campoValido={material.campoValido}
                    />
                  </FormControl>
                  <Button 
                    style={{color: '#3f51b5',position:'absolute',left:450,top:26}}
                    onClick={limpiarCamposAction}
                  >
                    Limpiar
                  </Button>
                  {/* <Typography
                    variant="subtitle2"
                    className={classes.typography}
                    style={{cursor: 'pointer',fontWeight: '400',position:'absolute',right:40,top:22}} 
                    // onClick = {handleDownloadArchivoProxy(4)}
                  >
                    
                  </Typography> */}
                </Grid>
                {tipoReporte.valor !=="" ? 
                  <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    // style={{marginLeft:'10px'}}
                  >  

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      style={{marginBottom:'5px',position:'absolute',right:40,top:22}}
                    >  
                              
                      <Success 
                        label='&nbsp;&nbsp;&nbsp;Consultar&nbsp;&nbsp;&nbsp;'
                        disabled={tipoReporte.valor===4?!periodo.valor>0:false}
                        // onClick={onCancelarConfiguracionProxy(false)}
                        onClick={() => {
                          mostrarCargandoAction(true)
                          this.timeOut(getReporteAction);
                        }}
                      />
                            
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      style={{marginBottom:'5px',position:'absolute',right:40,top:22}}
                    >  
                            
                    </Grid>
                    {/* <Grid style={{marginLeft:'5px',marginRight:'8px'}}></Grid> */}

                    {/* {tipoReporte.valor !== 4 ? */}
                    <Grid
                      item
                      style={{marginBottom:'5px',position:'absolute',right:40,top:69}}
                    >
                      {tipoReporte.valor === 1 ?
                        <PDFDownloadLink 
                          // style={{pointerEvents: datosReporte.length===0?'none':'inherit'}}
                          // disabled={datosReporte.length===0}
                          document={<ExistenciaPDF
                            registros={datosReporte}
                            valorPlaza={plaza.valor}
                            valorAlmacen={almacen.valor}
                            valorMolde={molde.valor}
                          />} 
                          fileName="Existencia-Inventario.pdf">
                          <Button 
                            className={classes.botonLila}
                            variant="contained"
                            classes={
                              {
                                root: classes.root,
                              }
                            }
                            size='medium'
                            disabled={datosReporte.length===0}
                          >
                            <IconoDescarga
                              className={classes.leftIcon}
                            />
                                    Exportar
                          </Button>
                        </PDFDownloadLink>
                        :null}
                      {tipoReporte.valor === 2 ?
                        <PDFDownloadLink
                          style={{pointerEvents: datosReporte.length===0?'none':'inherit'}}
                          // disabled={datosReporte.length===0} 
                          document={<ValuacionPDF 
                            registros={datosReporte}
                            valorPlaza={plaza.valor}
                            valorAlmacen={almacen.valor}
                            valorMolde={molde.valor}/>} 
                          fileName="Valuación-Inventario.pdf">
                          <Button 
                            className={classes.botonLila}
                            variant="contained"
                            classes={
                              {
                                root: classes.root,
                              }
                            }
                            size='medium'
                            disabled={datosReporte.length===0}
                          >
                            <IconoDescarga
                              className={classes.leftIcon}
                            />
                                    Exportar
                          </Button>
                        </PDFDownloadLink>
                        :null}
                      {tipoReporte.valor === 3 ?
                        <PDFDownloadLink 
                          style={{pointerEvents: datosReporte.length===0?'none':'inherit'}}
                          // disabled={datosReporte.length===0}
                          document={<KardexPDF
                            registros={datosReporte}
                          />} 
                          fileName="ReporteKardex.pdf">
                          <Button 
                            className={classes.botonLila}
                            variant="contained"
                            classes={
                              {
                                root: classes.root,
                              }
                            }
                            size='medium'
                            disabled={datosReporte.length===0}
                          >
                            <IconoDescarga
                              className={classes.leftIcon}
                            />
                                    Exportar
                          </Button>
                        </PDFDownloadLink>
                        :null}
                      {tipoReporte.valor === 4 ?
                        <ReactToPrint
                          trigger={() => 
                            <Button 
                              className={classes.botonLila}
                              // key={uniqueId('resultados_')} 
                              variant="contained"
                          
                              classes={
                                {
                                  root: classes.root,
                                }
                              }
                              // Para agregar excels
                              // onClick ={handleDownloadExcelProxy(tipoReporte.valor)}
                              size='medium'
                              disabled={!mostrarConfiabilidad}
                              // disabled = {disabled}
                            >
                              <IconoDescarga
                                className={classes.leftIcon}
                              />
                                Exportar
                            </Button>
                            
                          }
                          content={() => this.componentRef}
                        />
                        :null}
                    </Grid>
                  </Grid>
                  :null}
                {/* <IconButton
                        disabled = { arrGrafPuesto[0].Nombre === ''}
                        onClick={onClickMostrarGrafica(mostrarGrafica)}
                      >
                        <Timeline
                          color="secondary"
                          style={{ 
                            fontSize: '7vh',
                          }}
                        />
                      </IconButton> */}
                      
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}         
              >
                <Container
                  flexDirection="row"
                  justify="space-beetwen"
                  style={{
                    alignItems: 'center',
                  }}
                >
                  {/*  ====================[ SELECTIONS ]======================== */}
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                  >
                    <Grid
                      item       
                    >
                      <FormControl 
                        className={classes.formControl}
                        fullWidth
                        display="flex"
                        style={{ 
                          margin: '0vh 1.5vh 0vh 2.5vh',
                          width:'25vh',
                          fontSize:'14px',
                        }}
                      >
                        {/* <InputLabel 
                        htmlFor="id_plazaSeleccionada"
                      >
                        Plaza
                      </InputLabel>
                      <Select
                        // value={plazaSeleccionada}
                        // onChange={onChangePlaza}
                        inputProps={{
                          name: 'plazaSeleccionada',
                          id: 'id_plazaSeleccionada',
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Seleccione una opcion</em>
                        </MenuItem>
                      </Select> */}
                        {tipoReporte.valor !=="" ?

                          // <Seleccion
                          //   opciones={plazas.length>0?plazas:comboVacio}
                          //   idOpcion='IdPlaza'
                          //   nomOpcion='Nombre'
                          //   // requerido
                          //   valor={plaza.valor}
                          //   onChange={onInputChangeProxy}
                          //   label='Plaza'
                          //   indice={1}
                          //   // campoValido={material.campoValido}
                          // />
                          <FormControl 
                            // className={classes.formControlSeleccion}
                            // style={{marginTop:'15px'}} 
                          >
                            <InputLabel 
                              style={{fontSize: 14}} 
                            >
                              Plazas
                            </InputLabel>
                            <Select
                              value={plaza.valor}
                              variant="outlined"
                              onChange={onInputChangeProxy(1)}
                              displayEmpty
                              // input={<InputBase inputProps={{'aria-label': 'naked' }} />}
                              name="Plazas"
                            // id={1}
                            // disabled = {datosSeleccionados.almacenSeleccionado === ''}
                            // className="selectVacio"
                            >{tipoReporte.valor !== 4 && tipoReporte.valor !== 3 && plazas.length>0?
                                <MenuItem style={{fontSize: 14}} value={0}>
                                  {/* <em style= {{color:'blue'}}> */}
                              TODAS
                                  {/* </em> */}
                                </MenuItem>:null }
                              {comboPlazas.map((elem) => 
                                <MenuItem style={{fontSize: 14}}  id={`plaza_${elem.IdPlaza}`} key={`${elem.IdPlaza}`} value={elem.IdPlaza || -1}>{elem.Nombre}</MenuItem>)}

                            </Select> 
                          </FormControl>



                          :null}
                      </FormControl>
                      <FormControl 
                      // disabled = {plazaSeleccionada === ''}
                        className={classes.formControl}
                        fullWidth
                        display="flex"
                        style={{ 
                          margin: '0vh 1.5vh 0vh 2.5vh',
                          width:'25vh',
                          fontSize:'14px',
                        }}
                      >
                        {tipoReporte.valor !=="" ?
                          <Seleccion
                            opciones={almacenes.length>0?almacenes:comboVacio}
                            idOpcion='IdAlmacen'
                            nomOpcion={almacenes.length>0?'Almacen':'Nombre'}
                            // requerido
                            valor={almacen.valor}
                            onChange={onInputChangeProxy}
                            label='Almacén'
                            indice={2}
                            inhabilitado={plaza.valor===0}
                            // campoValido={material.campoValido}
                          />
                          :null}
                      </FormControl>
                      <FormControl 
                        className={classes.formControl}
                        fullWidth
                        display="flex"
                        style={{ 
                          margin: `${margen}vh 1.5vh 0vh 2.5vh`,
                          width:`${tamaño}vh`,
                          fontSize:'14px',
                        }}
                      >
                        {molde.mostrar?
                          <Seleccion
                            opciones={moldes.length>0?moldes:comboVacio}
                            idOpcion='IdMolde'
                            nomOpcion='Nombre'
                            // requerido
                            valor={molde.valor}
                            onChange={onInputChangeProxy}
                            label='Molde'
                            indice={3}
                            inhabilitado={plaza.valor===0}
                            // campoValido={material.campoValido}
                          />
                          :null}
                        {año.mostrar?
                          <Seleccion
                            opciones={años.length>0?años:comboVacio}
                            idOpcion='IdAño'
                            nomOpcion={años.length>0?'Año':'Nombre'}
                            // requerido
                            valor={año.valor}
                            onChange={onInputChangeProxy}
                            label='Año'
                            indice={4}
                            // campoValido={material.campoValido}
                          />
                          :null}
                        {/* aqui va la seleccion de fecha inicial */}
                        {fechaInicio.mostrar?
                          // <Seleccion
                          //   opciones={años.length>0?años:comboVacio}
                          //   idOpcion='Año'
                          //   nomOpcion={años.length>0?'Año':'Nombre'}
                          //   // requerido
                          //   valor={fechaInicio.valor}
                          //   onChange={onInputChangeProxy}
                          //   label='Fecha inicio'
                          //   indice={5}
                          //   // campoValido={material.campoValido}
                          // />
                          // <Calendario 
                          //   label = 'Fecha Autorización:'
                          //   fecInicio = {parametros.fechaInicio}
                          //   fecFin = {parametros.fechaFin}
                          //   fechaInput = {parametros.fechaInput}
                          //   onChangeFecha = {onChangeFechaAction}
                          //   onFechaInput = {onFechaInputAction}
                          //   id = {0}
                          //   paddingRight = {0}
                          //   paddingLeft = {4}
                          // />
                          <Grid
                            item
                            style={{ 
                              marginTop: '14',
                            }}>  
                            <DateRangePicker
                              startDate={parametros.fechaInicio}
                              startDateId={`daterangerpicker1${0}`} 
                              endDate={parametros.fechaFin} 
                              endDateId={`daterangerpicker12${0}`}
                              onDatesChange={onChangeFechaProxy}
                              focusedInput={parametros.fechaInput}
                              onFocusChange={onFechaInputProxy(0)}
                              numberOfMonths={1}
                              showClearDates
                              small
                              isOutsideRange={isOutsideRange}
                              startDatePlaceholderText="Fecha Inicio"
                              endDatePlaceholderText="Fecha Fin"
                              renderMonthElement={
                                ({ month }) => moment(month).local('es', espanol).format('LL')
                              }
                              phrases={
                                {
                                  closeDatePicker: 'Cerrar',
                                  clearDates: 'Limpiar',
                                  calendarLabel: 'Calendario',
                                }
                              }
                              showDefaultInputIcon
                            />
                          </Grid>  
                          :null}
                      </FormControl>

                      <FormControl 
                        className={classes.formControl}
                        fullWidth
                        display="flex"
                        style={{ 
                          margin: '0vh 1.5vh 0vh 2.5vh',
                          width:'25vh',
                          fontSize:'14px',
                        }}
                      >
                        {periodo.mostrar?
                          <Seleccion
                            opciones={periodos.length>0?periodos:comboVacio}
                            idOpcion='IdPeriodo'
                            nomOpcion='Nombre'
                            // requerido
                            valor={periodo.valor}
                            onChange={onInputChangeProxy}
                            label='Periodo'
                            indice={6}
                            // campoValido={material.campoValido}
                          />
                          :null}
                        {/* aqui va la seleccion de fecha final */}
                        {tipoMovimiento.mostrar?
                          <Seleccion
                            opciones={tiposMovimientos.length>0?tiposMovimientos:comboVacio}
                            idOpcion='IdTipoMovimiento'
                            nomOpcion='Nombre'
                            // requerido
                            valor={tipoMovimiento.valor}
                            onChange={onInputChangeProxy}
                            label='Tipo Movimiento'
                            indice={7}
                            // campoValido={material.campoValido}
                          />
                          :null}
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      style={{marginBottom:'10px'}}
                    >
                      {
                        tipoMovimiento.valor === 3 || tipoMovimiento.valor === 4 ? (
                          <FormControl 
                            className={classes.formControl}
                            fullWidth
                            display="flex"
                            style={{ 
                              margin: '0vh -1.5vh 0vh 2.5vh',
                              width:'28vh',
                              fontSize:'14px',
                            }}
                          >
                            {origen.mostrar?
                              <Seleccion
                                opciones={origenes.length>0?origenes:comboVacio}
                                idOpcion='IdOrigen'
                                nomOpcion='Nombre'
                                // requerido
                                valor={origen.valor}
                                onChange={onInputChangeProxy}
                                label='Origen'
                                indice={8}
                                // campoValido={material.campoValido}
                              />
                              :null}
                            {/* aqui va la seleccion de fecha final */}
                          </FormControl>) : null
                      }

{
                        tipoMovimiento.valor === 3 || tipoMovimiento.valor === 4 ? (
                          <FormControl 
                            className={classes.formControl}
                            fullWidth
                            display="flex"
                            style={{ 
                              margin: '0vh 1.5vh 0vh 2.5vh',
                              width:'25vh',
                              fontSize:'14px',
                            }}
                          >
                            {destino.mostrar?
                              <Seleccion
                                opciones={destinos.length>0?destinos:comboVacio}
                                idOpcion='IdOrigen'
                                nomOpcion='Nombre'
                                // requerido
                                valor={destino.valor}
                                onChange={onInputChangeProxy}
                                label='Destino'
                                indice={9}
                                // campoValido={material.campoValido}
                              />
                              :null}
                            {/* aqui va la seleccion de fecha final */}
                          </FormControl>) : null
                      }
                      <FormControl 
                        className={classes.formControl}
                        fullWidth
                        display="flex"
                        style={{ 
                          margin: '0.2vh 3.2vh 0vh 2.5vh',
                          width:'18vh',
                          fontSize:'14px',
                        }}
                      >
                        {codigoInicio.mostrar?
                          // <Seleccion
                          //   opciones={codigosInicio.length>0?codigosInicio:comboVacio}
                          //   idOpcion='IdOrigen'
                          //   nomOpcion='Nombre'
                          //   // requerido
                          //   valor={codigoInicio.valor}
                          //   onChange={onInputChangeProxy}
                          //   label='Codigo inicio'
                          //   indice={10}
                          //   // campoValido={material.campoValido}
                          // />
                          <Input
                            onChange={onInputChangeProxy}
                            nomCampo='Código Inicio'
                            tipoInput = 'numero'
                            valor={codigoInicio.valor}
                            indice={10}
                          />
                          :null}





                        {/* aqui va la seleccion de fecha final */}
                      </FormControl>
                      <FormControl 
                        className={classes.formControl}
                        fullWidth
                        display="flex"
                        style={{ 
                          margin: '0.2vh 1.5vh 0vh 2.5vh',
                          width:'18vh',
                          fontSize:'14px',
                          // marginLeft:10,
                        }}
                      >
                        {codigoFinal.mostrar?
                          // <Seleccion
                          //   opciones={codigosFinal.length>0?codigosFinal:comboVacio}
                          //   idOpcion='IdOrigen'
                          //   nomOpcion='Nombre'
                          //   // requerido
                          //   valor={codigoFinal.valor}
                          //   onChange={onInputChangeProxy}
                          //   label='Codigo final'
                          //   indice={11}
                          //   // campoValido={material.campoValido}
                          // />
                          <Input
                            onChange={onInputChangeProxy}
                            nomCampo='Código final'
                            tipoInput = 'numero'
                            valor={codigoFinal.valor}
                            indice={11}
                          />
                          :null}
                        {/* aqui va la seleccion de fecha final */}
                      </FormControl>
                    </Grid>

                  </Grid>

                  {/* ===================[ END SELECTIONS ]====================  */}
                  {/* <Grid
                    item
                    xs={2}
                    md={2}
                    sm={2}
                    // style={{marginLeft:'10px'}}
                  >
                  </Grid> */}
                </Container>
                {cargando ? 
                  <MuiThemeProvider theme={this.getMuiThemeLinear}>
                    <LinearProgress 
                      className={classes.Linear}
                      variant="query"
                    // value={this.state.completed}
                    />
                  </MuiThemeProvider>
                  : null}
              </Grid>
            </Card>
            <Card
              style={{
                margin:'10px 10px 1px 10px',
                overflow: 'initial',
                position:'relative',
              }}
              elevation={1}
            >
              {/* <Grid
                item
                md={12}
                xs={12}
                sm={12}
                style={{
                // margin:'2px',
                }}
              >
                <Container
                  flexDirection="column"
                  alignItems='center'
                  style={{
                  // width: '95%',
                  // padding: '0',
                  
                  }}
                >                 */}
              {datosReporte.length>0 && !mostrarConfiabilidad?
                <div
                  style={{
                    margin:'10px 0px 20px 0px',
                  }}
                >
                  <DataTable
                    theme={this.getMuiTheme()}
                    data = {datosReporte}
                    // data={datosPuesto}
                    // data = {datosReportesOCKyOE}
                    headers = {cabecerasReporte}
                    // headers={headersPuesto}
                    configuracion = {configuracion}
                    opciones = {
                      [
                        // {'icon' : 'editar', 'action': onDeleteEtapa},
                        // {'icon' : 'eliminar', 'action': onDeleteEtapa},
                        {'icon' : 'editar', 'action': ''},
                        {'icon' : 'eliminar', 'action': ''},
                          
                      ]
                    }
                    idPosition = "0"
                    admin
                    elevacion={0}
                      
                    // onClickAgregar = {onClickAgregar}
                    // onDelete = {onDeleteEtapa}
                  />
                </div>
                : null}
              {mostrarConfiabilidad?
                <AppBar 
                  color="inherit" 
                  position="static" 
                  style={
                    {
                      // backgroundColor: 'rgb(245, 245, 245)',
                      height: '100%',
                    }
                  }
                >  
                  <ConfiabilidadInventario 
                    // eslint-disable-next-line no-return-assign
                    ref={el => (this.componentRef = el)}
                    configuracion={configuracion}
                    datos={datos}
                    cabeceras={cabeceras}
                  />
                </AppBar>
                : null}
              {/* </Container>
              </Grid> */}
            </Card>
          </Container>
        </Grid>

      </div>
    );
  }
}

Reportes.propTypes = {
  // dispatch: T.func.isRequired,
  classes: T.object,
  actions: T.object,
  reportes: T.object,
  onInputChangeProxy: T.func,
  // handleDownloadExcelProxy: T.func,
  onChangeFechaProxy: T.func,
  onFechaInputProxy: T.func,
  isOutsideRange: T.func,
  usuarioId: T.number,
};

const mapStateToProps = createStructuredSelector({
  reportes: makeSelectReportes(),
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

const withReducer = injectReducer({ key: 'reportes', reducer });
const withSaga = injectSaga({ key: 'reportes', saga });
const withActions = Actions.bindReduxStore();
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => (id) => (e) => {
      const {
        actions: {
          onInputChangeAction,
          onInputPlazaChangeAction,
          onInputAlmacenChangeAction,
          onInputTipoMovimientoAction,
          onInputAnioChangeAction,
        },
      } = props;
      // if(e.target.value){
      switch (id) {
        case 1:
          onInputPlazaChangeAction(id, e.target.value);
          break;
        case 2:
          onInputAlmacenChangeAction(id, e.target.value);
          break;
        case 4:
          onInputAnioChangeAction(id, e.target.value);
          break;
        case 7:
          onInputTipoMovimientoAction(id, e.target.value);
          break;
        default:
          onInputChangeAction(id, e.target.value);
          break;
      }
      // }
    },
    handleDownloadExcelProxy: (props) => (tipoReporte) =>() => {
      const {
        // reportes:{
        //   configuracion:{
        //     campos: {
        //       tipoReporte,
        //     },
        //   },
        // },
        actions: {
          handleDownloadExcelAction,
        },
      } = props;
      
      handleDownloadExcelAction(tipoReporte);
    },
    onFechaInputProxy: props => (id) => event => {
      
      const {
        actions: {
          onFechaInputAction,
        },
      } = props;
      onFechaInputAction(id, event);
    },
    isOutsideRange: () => () => false,
    onChangeFechaProxy: (props) => (e) => {
      const {
        actions: {
          onChangeFechaAction,
        },
      } = props;
      onChangeFechaAction(e.startDate,e.endDate);
    },
  })

)(Reportes);
