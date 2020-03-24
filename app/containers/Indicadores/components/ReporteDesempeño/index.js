/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React,{Fragment} from 'react';
import T from 'prop-types';
import { lowerCase, startCase, isEqual } from 'lodash';
import { compose } from 'redux';
import moment from 'moment';
// import Chart from 'chart.js';
// eslint-disable-next-line import/no-unresolved
import { 
  Line,
  Bar,
} from 'react-chartjs-2';

import { withStyles, createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/icons/Timeline';
import {Grid,AppBar, Toolbar, FormControl, InputLabel, Select, MenuItem, Card, IconButton, Button, Paper, FormLabel, FormGroup, TextField } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import DataTable from '../TablaIndicadores';
import { Container } from '../../../ConfiguracionTicket/styledComponents';




const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  Linear: {
    width: 100,
    backGround:'#ff9100',
  },

});

/* eslint-disable react/prefer-stateless-function */
export class ReporteDesempeño extends React.Component {

  componentDidMount() {
    const {
      acciones:{
        cargarDepartamentos,
      },
    } = this.props
   
    cargarDepartamentos();
    // this.funcLlenadoComboAñoCorte(); DESCOMENTAR EN CASO DE UTILIZAR CORTE A MESES
  }

  colores = [];

  componentDidUpdate(prevProps) {
    const {
      data:{
        datosProceso,
        datosPuesto,
        arrGrafPuesto,
      },
    } = this.props;

    const{
      data:{
        datosProceso: datosProceso2,
        datosPuesto:  datosPuesto2,
      },
    } = prevProps;

	  if (!isEqual(datosProceso, datosProceso2) && !isEqual(datosPuesto, datosPuesto2)) {
      const letters = '0123456789ABCDEF';
     
      for(let m = 0; m< arrGrafPuesto.length; m++){
        let color = '';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        this.colores.push(color)
      }
    }
	  }

  getMuiThemePuesto = () => createMuiTheme({
    overrides: {
      MUIDataTableHeadCell:{
        // root:{
        //   '&:nth-child(5,6,7)': {
        //     width: 30,
        //     backgroundColor:'#4dce56',
        //   },
        // },
        fixedHeader:{
          backgroundColor:'#263238',
        },
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#ffffff",
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

  temaSemana = {
    overrides:{
      MUIDataTableHeadCell:{
        root:{
          fontWeight:'700',
          textAlign: 'center',
          '&:nth-child(1)': {
            width: '33%',
            backgroundColor:'#263238;',
            color:'white',
            fontWeight:'700',
          },
          '&:nth-child(n+2)': {
            width: '33%',
            backgroundColor:'#ffbd66;',
            color:'black',
            fontWeight:'700',
          },
        },
      },
      MuiTableCell: {
        root:{
          padding: 0,
          textAlign:'center',
          borderRight: '1px solid #c7cbce',
        },
        body: {
          fontWeight:'700',
        },
      },
      
      MUIDataTableBodyCell:{
        root:{
          '&:nth-child(2)': {
            backgroundColor:'#d0c9c5',
          },
        },
      },
      MUIDataTableToolbar:{
        root:{
          minHeight:0,
        },
      },
    },
  };

  tema = {
    overrides: {
      MUIDataTable:{
        margin:0,
      },
      MUIDataTableToolbar:{
        root:{
          minHeight:0,
        },
      },
      MUIDataTableHeadCell:{
        root:{
          padding: 0,
          fontWeight:'700',
          textAlign: 'center',
          '&:nth-child(-n+3)': {
            width: '10%',
            backgroundColor:'#263238;',
            color:'white',
            fontWeight:'700',
          },
          '&:nth-child(4)': {
            width: '9%',
            backgroundColor:'#8b8e8e;',
            fontWeight:'700',
            color:'black',
          },
          '&:nth-child(5)': {
            width: '9%',
            backgroundColor:'#8b8e8e;',
            fontWeight:'700',
            color:'black',
          },
          '&:nth-child(6)': {
            width: '9%',
            backgroundColor:'#4dce56',
            fontWeight:'700',
            color:'black',
          },
          '&:nth-child(7)': {
            width: '9%',
            backgroundColor:'#4dce56',
            fontWeight:'700',
            color:'black',
          },
          '&:nth-child(8)': {
            width: '9%',
            backgroundColor:'#4dce56',
            color:'black',
          },
          '&:nth-child(9)': {
            width: '9%',
            backgroundColor: '#da4545',
            color: 'black',
          },
          '&:nth-child(10)': {
            width: '9%',
            backgroundColor:'#f9b53a',
            color:'black',
          },
          '&:nth-child(11)': {
            width: '9%',
            backgroundColor:'#489ac3;',
            color:'black',
          },
          '&:last-child': {
            paddingRight:0,
          },
        },
      },
      MuiTableCell: {
        root:{
          padding: 0,
          textAlign:'center',
          borderRight: '1px solid #c7cbce',
        },
        body: {
          fontWeight:'700',
        },
      },
      
      MUIDataTableBodyCell:{
        root:{
          '&:nth-child(4)': {

            backgroundColor:'#d0c9c5',
          },
          '&:last-child': {
            paddingRight:0,
          },
        },
      },
    },
  }

  temaDiasAtencion = {
    overrides:{
      MUIDataTableHeadCell:{
        root:{
          fontWeight:'700',
          textAlign: 'center',
          '&:nth-child(-n+2)': {
            width: '20%',
            backgroundColor:'#263238',
            color:'white',
            fontWeight:'700',
          },
          '&:nth-child(n+3)': {
            width: '20%',
            backgroundColor:' #fdb863',
            color:'black',
            fontWeight:'700',
          },
         
        },
      },
      MUIDataTableBodyCell:
      {
        root:{
          '&:nth-child(4)': {

            backgroundColor:'#d0c9c5',
          },
        },
      },
      MuiTableCell: {
        root:{
          padding: 0,
          textAlign:'center',
          borderRight: '1px solid #c7cbce',
        },
        body: {
          fontWeight:'700',
        },
      },
      MUIDataTableToolbar:{
        root:{
          minHeight:0,
        },
      },
    },
  }

  fechaActual = new Date();

  añoActual = this.fechaActual.getFullYear();

  arrAño = [];
  
  timeOut =  (getDatosIndicadores) => {
    setTimeout(getDatosIndicadores,2000)
  };

  funcLlenadoComboAñoCorte = () => {
    let añoActuall = this.añoActual;
    const añoFin = 2018;
    while (añoActuall >= añoFin ) {
      this.arrAño.push(añoActuall);
      añoActuall--;
    }
  };

  semanasCorte = [];

  render() {
    const {
      data:{
        cargando,
        arrDepartamentos,
        arrTipoTicket,
        arrPlazas,
        arrAnios,
        arrMeses,
        arrSemanas,
        departamento,
        tipoTicket,
        plazaSeleccionada,
        anioCorte,
        aCorteDe,
        periodoCorte,
        indicadorPor,
        mostrarGrafica,
        datosPuesto,
        datosPuestoTotales,
        datosProceso,
        arrSemanaRetailProceso,
        arrCumplimientoProceso,
        arrGrafPuesto,
        dataTablaPuesto,
        arrGrafBarrasPuesto,
      },
      acciones:{
        showCargando,
        onChangeDepartamento,
        onChangeTipoTicket,
        onChangeValue,
        onClickMostrarGrafica,
        getDatosIndicadores,
        onChangePlaza,
        onChangeAnio,
      },
    } = this.props;

    const classes = this.props;
    const dd = this.fechaActual.getDate();
    const mm = this.fechaActual.getMonth()+1;
    const fechaReal = `${this.añoActual}-${mm}-${dd}`;    
    const semanaActual = moment(fechaReal).week();
    
    const headersPuesto = [
      {
        name:'Responsable',
        label:'Responsable',
        option:'',
      },
      {
        name:'Actividad',
        label:'Actividad',
        option:'',
      },
      {
        name:'Pendientes',
        label:'Solicitudes Pendientes',
        option:'',
      },
      {
        name:'Meta',
        label:'Meta Semana (N)',
        option:'',
      },
      {
        name:'Cumplimiento',
        label:'% de Cumplimiento',
        option:'',
      },
      {
        name:'Adelantadas',
        label:'Adelantadas',
        option:'',
      },
      {
        name:'enTiempo',
        label:'En Tiempo',
        option:'',
      },
      {
        name:'fueraTiempo',
        label:'Fuera de Tiempo',
        option:'',
      },
      {
        name:'noCumplidasMeta',
        label:'No Cumplidas \n en Meta',
        fixedHeader: true,
        width:'5%',
      },
      {
        name:'fueraTiempoMeta',
        label:'Realizadas Fuera \n de Tiempo',
        option:'',
      },
      {
        name:'Promedio',
        label:'Tiempo Promedio de Respuesta',
        option:'',
      },
    ];
    
    const headersPuestoTotales = [
      {
        name:'Responsable',
        label:'Responsable',
        option:'',
      },
      {
        name:'Actividad',
        label:'Actividad',
        option:'',
      },
      {
        name:'Atendidas',
        label:'Solicitudes Atendidas',
        option:'',
      },
      {
        name:'Promedio',
        label:'Promedio de Días de Atención',
        option:'',
      },
      {
        name:'TiempoMeta',
        label:'Días Establecidos',
        option:'',
      },
    ];
    const headersProceso = [
      {
        name:'Responsable',
        label:'Responsable',
        option:'',
      },
      {
        name:'Actividad',
        label:'Actividad',
        option:'',
      },
      {
        name:'Pendientes',
        label:'Solicitudes Pendientes',
        option:'',
      },
      {
        name:'Meta',
        label:'Meta Semana (N)',
        option:'',
      },
      {
        name:'Cumplimiento',
        label:'%de Cumplimiento',
        option:'',
      },
      {
        name:'Adelantadas',
        label:'Adelantadas',
        option:'',
      },
      {
        name:'enTiempo',
        label:'En Tiempo',
        option:'',
      },
      {
        name:'fueraTiempo',
        label:'Fuera de Tiempo',
        option:'',
      },
      {
        name:'noCumplidasMeta',
        label:'No Cumplidas en Meta',
        option:'',
      },
      {
        name:'fueraTiempoMeta',
        label:'Realizadas Fuera de Tiempo',
        option:'',
      },
    ];
    const headersPuestoSemana = [];
    let varName;

    headersPuestoSemana.push({
      name: 'Responsable',
      label: 'Responsable',
      option: '',
    });


    for(varName in dataTablaPuesto[0]){
      if(varName !== 'Responsable'){
        headersPuestoSemana.push({
          name: varName,
          label: varName,
          option: '',
        });
      }
    }

    const configuracion = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: 'none',
      buscar  : false,
    };
  
    const arrResponsable = [];
    const arrPromedio = [];
    const arrEstablecido = [];
    const arrColorPromedio = [];
    const arrColorEstablecido = [];

    for(let q = 0; q < arrGrafBarrasPuesto.length; q++){
      arrResponsable.push(arrGrafBarrasPuesto[q].Responsable)
      arrPromedio.push(arrGrafBarrasPuesto[q].Promedio)
      arrEstablecido.push(arrGrafBarrasPuesto[q].Establecido)
      arrColorPromedio.push('rgba(38, 50, 56, 0.6)')
      arrColorEstablecido.push('rgba(255, 145, 0, 0.6)')
    }

    const chartData = {
      labels: arrResponsable,
      datasets: [
        {
          label: 'Días Promedio Atención',
          data: arrPromedio,
          backgroundColor: arrColorPromedio,
          borderColor: [
            'rgba(38, 50, 56, 1)',
            'rgba(38, 50, 56, 1)',
            'rgba(38, 50, 56, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: 'Días Establecido',
          data: arrEstablecido,
          backgroundColor: arrColorEstablecido,
          borderColor: [
            'rgba(255, 145, 0, 1)',
            'rgba(255, 145, 0, 1)',
            'rgba(255, 145, 0, 1)',
          ],
          borderWidth: 1,
        },
       
      ],
      options : {
        scales: {
          xAxes: [{
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            gridLines: {
              offsetGridLines: true,
            },
          }],
        },
      },
    };
   

    console.log('colores: ',this.colores)
    const datos = [];
    for(let i = 0; i < arrGrafPuesto.length; i ++){
      // colores = [
      //   'ff9100',
      //   '8e8c8a',
      //   '60e84f',
      //   'ff0000',
      //   'ff00eb',
      //   '3fd8d1',
      // ];
      const opciones =  {
        label: arrGrafPuesto[i].Nombre,
        fill: false,
        lineTension: 0.1,
        backgroundColor: this.colores[i] != null ? `#${this.colores[i]}` : '#ff9100',
        borderColor: this.colores[i] != null ? `#${this.colores[i]}` : '#ff9100',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'primary',
        pointBackgroundColor: 'primary',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: this.colores[i] != null ? `#${this.colores[i]}` : '#ff9100',
        pointHoverBorderColor: 'secondary',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: arrGrafPuesto[i].Cumpl,
      };
      datos.push(opciones);
    }

    const dataPuesto = {
      labels: arrGrafPuesto[0].Semana,
      // title:'Indicador Desempeño General OE Plaza',
      datasets: datos,
    };

    const dataPlaza = {
      labels: arrSemanaRetailProceso,
      // title:'Indicador Desempeño General OE Plaza',
      datasets: [
        {
          label: '% Porcentaje De Cumplimiento',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#ff9100',
          borderColor: '#ff9100',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'primary',
          pointBackgroundColor: 'primary',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#ff9100',
          pointHoverBorderColor: 'secondary',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: arrCumplimientoProceso,
        },
      ],
    };

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
                  Reportes de solicitudes de OCK
                </Typography>
              </Toolbar>
            </AppBar>
            <Card
              style={{
                margin:'10px 10px 1px 10px',
              }}
              elevation={4}
            >
              <Typography  
                color="primary"
                variant="h6"
                className={classes.grow}
                style={{
                  padding:'10px 20px 0px 20px',
                }}
              >
                Indicador de desempeño
              </Typography>

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
                    xs={9}
                    md={9}
                    sm={9}
                  >
                    <FormControl 
                      className={classes.formControl}
                      fullWidth
                      display="flex"
                      style={{ 
                        margin: '0vh 2.5vh 0vh 2.5vh',
                        width:'25vh',
                        fontSize:'14px',
                      }}
                    >
                      <InputLabel 
                        htmlFor="id_departamento"
                      >
                        Departamento
                      </InputLabel>
                      <Select
                        value={departamento}
                        onChange={onChangeDepartamento}
                        inputProps={{
                          name: 'departamento',
                          id: 'id_departamento',
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Seleccione una opcion</em>
                        </MenuItem>
                        
                        {arrDepartamentos.map((depart,index) => (
                          <MenuItem 
                            value={depart.IdDepartamento}
                            key={`departamento_${index}`}
                          >
                            {startCase(lowerCase(depart.Nombre))}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl 
                      className={classes.formControl}
                      fullWidth
                      display="flex"
                      style={{ 
                        margin: '0vh 2.5vh 0vh 2.5vh',
                        width:'25vh',
                        fontSize:'14px',
                      }}
                    >
                      <InputLabel 
                        htmlFor="id_tipoTicket"
                      >
                        Tipo Servicio
                      </InputLabel>
                      <Select
                        disabled={departamento === ''}
                        value={tipoTicket}
                        onChange={onChangeTipoTicket}
                        inputProps={{
                          name: 'tipoTicket',
                          id: 'id_tipoTicket',
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Seleccione una opcion</em>
                        </MenuItem>
                        
                        {arrTipoTicket.map((tipotckt,index) => (
                          <MenuItem 
                            value={tipotckt.IdPlantilla}
                            key={`tipoTicket_${index}`}
                          >
                            {startCase(lowerCase(tipotckt.Nombre))}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl 
                      className={classes.formControl}
                      fullWidth
                      display="flex"
                      style={{ 
                        margin: '0vh 2.5vh 0vh 2.5vh',
                        width:'25vh',
                        fontSize:'14px',
                      }}
                    >
                      <InputLabel 
                        htmlFor="id_plazaSeleccionada"
                      >
                        Plaza
                      </InputLabel>
                      <Select
                        disabled={tipoTicket === ''}
                        value={plazaSeleccionada}
                        onChange={onChangePlaza}
                        inputProps={{
                          name: 'plazaSeleccionada',
                          id: 'id_plazaSeleccionada',
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Seleccione una opcion</em>
                        </MenuItem>
                        
                        {arrPlazas.map((plaza,index) => (
                          <MenuItem 
                            value={plaza.IdPlaza}
                            key={`plaza_${index}`}
                          >
                            {startCase(lowerCase(plaza.Nombre))}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl 
                      disabled = {plazaSeleccionada === ''}
                      className={classes.formControl}
                      fullWidth
                      display="flex"
                      style={{ 
                        margin: '0vh 2.5vh 0vh 2.5vh',
                        width:'25vh',
                        fontSize:'14px',
                      }}
                    >
                      <InputLabel 
                        htmlFor="id_añoCorte"
                      >
                        Año corte
                      </InputLabel>
                      <Select
                        value={anioCorte}
                        onChange={onChangeAnio(plazaSeleccionada)}
                        inputProps={{
                          name: 'anioCorte',
                          id: 'id_añoCorte',
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Seleccione una opcion</em>
                        </MenuItem>
                        
                        {arrAnios.map((año,index) => (
                          <MenuItem
                            value={año.Anios}
                            key={`año_${index}`}
                          >{año.Anios}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl 
                      className={classes.formControl}
                      fullWidth
                      display="flex"
                      style={{ 
                        margin: '0vh 2.5vh 0vh 2.5vh',
                        width:'25vh',
                        fontSize:'14px',
                      }}
                    >
                      <InputLabel 
                        htmlFor="id_aCorteDe"
                      >
                        A corte de:
                      </InputLabel>
                      <Select
                        disabled = {anioCorte === ''}
                        value={aCorteDe}
                        onChange={onChangeValue}
                        inputProps={{
                          name: 'aCorteDe',
                          id: 'id_aCorteDe',
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Seleccione una opcion</em>
                        </MenuItem>
                        
                        
                        <MenuItem 
                          value="semanas"
                          key="aCorteDe_Semanas_1"
                        >Semanas</MenuItem>
                        {/* <MenuItem 
                          value="meses"
                          key="aCorteDe_Meses"
                        >Meses</MenuItem> */}
                        
                      </Select>
                    </FormControl>
                    <FormControl 
                      className={classes.formControl}
                      fullWidth
                      display="flex"
                      style={{ 
                        margin: '0vh 2.5vh 0vh 2.5vh',
                        width:'25vh',
                        fontSize:'14px',
                      }}
                    >
                      <InputLabel 
                        htmlFor="id_periodoCorte"
                      >
                        Periodo
                      </InputLabel>
                      <Select
                        disabled = { anioCorte === '' || aCorteDe === ''}
                        value={periodoCorte}
                        onChange={onChangeValue}
                        inputProps={{
                          name: 'periodoCorte',
                          id: 'id_periodoCorte',
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Seleccione una opción</em>
                        </MenuItem>
                        {aCorteDe === 'semanas' ? 
                          (arrSemanas.map((semana,index) => (
                            <MenuItem 
                              value={semana.SemanaRetail}
                              key = {`semana_${index}`}
                            >
                              {semana.SemanaRetail}
                            </MenuItem>
                          ))) : aCorteDe === 'meses' ?
                            (arrMeses.map((mes,index) => (
                              <MenuItem 
                                value={index}
                                key = {`semana_${index}`}
                              >
                                {mes}
                              </MenuItem>
                            ))): null }
                      </Select>
                    </FormControl>
                    <FormControl 
                      className={classes.formControl}
                      fullWidth
                      display="flex"
                      style={{ 
                        margin: '0vh 2.5vh 0vh 2.5vh',
                        width:'25vh',
                        fontSize:'14px',
                      }}
                    >
                      <InputLabel 
                        htmlFor="id_indicadorPor"
                      >
                        Indicador por
                      </InputLabel>
                      <Select
                        value={indicadorPor}
                        onChange={onChangeValue}
                        inputProps={{
                          name: 'indicadorPor',
                          id: 'id_indicadorPor',
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Seleccione una opción</em>
                        </MenuItem>
                        <MenuItem value="proceso">Proceso</MenuItem>
                        <MenuItem value="puesto">Puesto</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      disabled = {
                        departamento === '' || 
                        tipoTicket === '' || 
                        plazaSeleccionada === '' || 
                        anioCorte  === '' ||
                        aCorteDe  === '' ||
                        periodoCorte  === '' ||
                        indicadorPor  === ''
                      }
                      variant="contained"                      
                      color="primary"
                      size="medium"
                      className={classes.button}
                      style={{ 
                        margin: '18px 10px 10px 47px',
                        alignItems:"right",
                      }}
                      onClick={() => {
                        showCargando(true)
                        this.timeOut(getDatosIndicadores);
                      }}
                    >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Generar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Button>
                   

                  </Grid>

                  {/* ===================[ END SELECTIONS ]====================  */}
                  <Grid
                    item
                    xs={3}
                    md={3}
                    sm={3}
                  >
                    <Container
                      flexDirection="row"
                      // justify="space-between"
                      alignItems="center"
                      style={{
                        padding:'10px 20px',
                        alignItems: 'center',
                      }}
                    >
                      <Typography 
                        variant="h6"
                        color="primary"
                        className={classes.grow}
                        align='center'
                        style={{
                          marginRight:'2vh',
                          // paddingTop:'25px',
                        }}
                      >
                          Semana:
                      </Typography>
                      <Typography 
                        variant="h6"
                        color="primary"
                        style={{
                          marginRight:'4vh',
                          // paddingTop:'25px',
                          fontSize:'30px',
                        }}
                      >
                        {semanaActual}
                      </Typography> 
                      <IconButton
                        disabled = { arrGrafPuesto[0].Nombre === ''}
                        onClick={onClickMostrarGrafica(mostrarGrafica)}
                      >
                        <Timeline
                          color="secondary"
                          style={{ 
                            fontSize: '7vh',
                          }}
                        />
                      </IconButton>
                      
                    </Container>
                  </Grid>

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
            <Grid
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
                  padding: '10px',
                  
                }}
              > 

                <Card
                  elevation={4}
                  style={{
                    margin: ' 0px 0px 10px 0px',
                  }}
                >
                  {mostrarGrafica ?
                    <Fragment>
                      <Typography
                        color="primary"
                        variant="h6"
                        align="center"
                      >
                      Indicador Desempeño General
                      </Typography>  
                      {indicadorPor === 'proceso' ?
                        <Line 
                          data={dataPlaza}
                          // width='200vh'
                          height={70}
                        /> : 
                        <Fragment>
                          <Line 
                            data={dataPuesto}
                            // width='200vh'
                            height={70}
                          />          
                        </Fragment>
                      }
                    </Fragment>
                    : null}
                 
                </Card>
                
                {indicadorPor === 'puesto' && mostrarGrafica ?
                  <div
                    style={{
                      margin:'10px 0px 20px 0px',
                    }}
                  >
                    <DataTable
                      // theme={this.getMuiThemePuesto}
                      data = {dataTablaPuesto}
                      // data={datosPuesto}
                      // data = {datosReportesOCKyOE}
                      headers = {headersPuestoSemana}
                      // headers={headersPuesto}
                      configuracion = {configuracion}
                      getMuiThemeProps={this.temaSemana}
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
                      
                      // onClickAgregar = {onClickAgregar}
                      // onDelete = {onDeleteEtapa}
                    />
                  </div>
                  : null}
                {!(datosPuesto.length === 0 && datosProceso.length === 0) ?
                  <Fragment>
                    <DataTable
                      // theme={this.getMuiTheme()}
                      getMuiThemeProps={this.tema}
                      data = {indicadorPor === 'proceso' ? datosProceso : datosPuesto}
                      headers = {indicadorPor === 'proceso' ? headersProceso : headersPuesto}
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

                      // onClickAgregar = {onClickAgregar}
                      // onDelete = {onDeleteEtapa}
                    />
                    {
                      indicadorPor === 'puesto' ?
                        <div
                          style={{
                            marginTop:'20px',
                          }}
                        >
                          {mostrarGrafica ? 
                            <Card
                              style={{
                                marginBottom:'20px',
                              }}
                              elevation={4}
                            >
                              <Typography
                                color="primary"
                                variant="h6"
                                align="center"
                              >
                              Indicador Desempeño General
                              </Typography> 
                              <div
                                style={{
                                  height:'40vh',
                                  width:'80vw',
                                }}
                              >
                                <Bar
                                  data={chartData}
                                  options={{ 
                                    maintainAspectRatio: false,
                                    responsive:true,
                                  }}
                                />
                              </div>
                            </Card> : null}
                          <DataTable
                            // theme={this.getMuiTheme()}
                            data = {datosPuestoTotales}
                            // data={datosPuesto}
                            // data = {datosReportesOCKyOE}
                            headers = {headersPuestoTotales}
                            // headers={headersPuesto}
                            configuracion = {configuracion}
                            getMuiThemeProps={this.temaDiasAtencion}
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
                            
                            // onClickAgregar = {onClickAgregar}
                            // onDelete = {onDeleteEtapa}
                          />
                        </div> : null
                    }
                  </Fragment> : null
                }
                
              </Container>
            </Grid>
          </Container>
        </Grid>

      </div>
    );
  }
}

ReporteDesempeño.propTypes = {
  acciones:          T.object,
  data:              T.object,
  // dispatch: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
)(ReporteDesempeño);