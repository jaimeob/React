/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers} from 'recompose';
import { withStyles } from "@material-ui/core/styles";
// import Paper from '@material-ui/core/Paper';
// import Appbar from 'components/Appbar';
import { Grid } from '@material-ui/core';
// import IconoPortafolio from 'images/iconos/iconoPortafolio.svg';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';

import SecondaryToolbar from 'components/SecondaryToolbar';
import Paper from '@material-ui/core/Paper';
import saga from '../../saga';
// import TablaPendientes from './TablaPendientes';
import { Container } from '../../styledComponents';
import Tabla from './Tabla'

const styles = _theme => ({
  root: {
    borderTopLeftRadius: '4px',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
  },
  root2: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: _theme.palette.background.paper,
  },
  paper: {
    padding: _theme.spacing.unit * 2,
    textAlign: 'center',
    color: _theme.palette.text.secondary,
    // height: '79vh',
  },
  title: {
    fontSize: 14,
  },

  typography: {
    padding: _theme.spacing.unit * 2,
  },
  formControl: {
    margin: _theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
  listItemText:{
    fontSize:'12px',
    fontfamily:'roboto',
  },
  chipMedio:{
    opacity:'100px',
  },
});

class ListadoProyectos extends React.Component {
  componentDidMount(){
    const {
      listadoProyectos:{
        idPortafolio:{
          item:{
            IdPortafolio,
          },
        },
     
      },
      IdDepartamento,
      obtenerPlantillas,
      obtenerEmpleados,
      obtenerProyectos,
    } = this.props;    
    obtenerEmpleados()
    obtenerPlantillas(IdDepartamento)
    obtenerProyectos(IdPortafolio)
    
  }

  render(){
    const { 
      classes,
      listadoProyectos:{
        modalProyectos,
        plantillas,
        plantillaSeleccionada,
        prioridades,
        prioridadSeleccionada,
        nombreProyecto,
        colorProyecto,
        empleados,
        proyectos,
        nombrePortafolioSeleccionado,
        colorPortafolioSeleccionado,
        empleadoSeleccionado,
        enEdicion,
        errores,
        fechas,
        estatusSeleccionado,
        responsableSeleccionado,
        responsableEstatus,
        idPortafolio,
        idProyecto,
        cerrarFiltro,
        openModalObservaciones,
        cabecerasImpactoDocumentos,
        modalImpactos,
        observaciones,
        openModalCerrarProyecto,
        openModalCanceladoProyecto,
        ticketsEnCancelacion,
        modalGuardadoProyecto,
        
      },
      propsListadoProyectos,
      abrirModalProyectos,
      onChangePlantilla,
      handleChangePrioridad,
      setNombreProyecto,
      cerrarModalProyectos,
      onChangeEmpleado,
      changeColorProyecto,
      guardarProyecto,
      redireccionarPortafolios,
      abrirEdicionProyecto,
      onFechaInput,
      onChangeEstatus,
      onChangeResponsable,
      onFechaInputRes,
      changeFecha,
      changeFechaResponsable,
      onClickLimpiar,
      onClickFiltrar,
      onClickFiltrarPendientes,
      cambiarStepper,
      abrirModalObservaciones,
      cerrarModalObservaciones,
      IdDepartamento,
      IdPuesto,
      setAutorizadorAction,
      abrirModalDocumentos,
      obtenerObservaciones,
      abrirModalGuardado,
      abrirGuardarModal,
    } = this.props;

    // ESTATUS PROYECTOS 
    const estatusProyectos = [
      {id:2,nombre:"Por Iniciar"},
      {id:1,nombre:"En Proceso"},
      {id:3,nombre:"Retrasado"},
      {id:4,nombre:"Finalizado"},
      {id:5,nombre:"Cancelado"},
      {id:6,nombre:"Pendiente"},      
    ]

    return (
      <div className={classes.root}>
        <SecondaryToolbar
          portafolioNombre={nombrePortafolioSeleccionado}
          onClickBackButton={redireccionarPortafolios}  
          showIcon
          leftIcon="arrow_back"
          secondIcon
          colorPortafolio ={colorPortafolioSeleccionado}
        />
        <Paper className={classes.paper}  elevation={20}>
          <Grid container alignItems="center" >
            <Grid item xs={12} sm={12} md={12} >
              <Container flexDirection="column">
                <Tabla
                  propsListadoProyectos = {propsListadoProyectos}
                  classes ={classes}
                  abrirModalProyectos ={abrirModalProyectos}
                  modalProyectos = {modalProyectos}
                  plantillas = {plantillas}
                  onChangePlantilla = {onChangePlantilla}
                  plantillaSeleccionada = {plantillaSeleccionada}
                  prioridades = {prioridades}
                  prioridadSeleccionada ={prioridadSeleccionada}
                  handleChangePrioridad ={handleChangePrioridad}
                  nombreProyecto={nombreProyecto}
                  setNombreProyecto = {setNombreProyecto}
                  colorProyecto = {colorProyecto}
                  cerrarModalProyectos = {cerrarModalProyectos}
                  empleadoSeleccionado = {empleadoSeleccionado}
                  empleados = {empleados}
                  onChangeEmpleado = {onChangeEmpleado}
                  changeColorProyecto ={changeColorProyecto}
                  guardarProyecto ={guardarProyecto}
                  proyectos= {proyectos}
                  abrirEdicionProyecto = {abrirEdicionProyecto}
                  enEdicion = {enEdicion}
                  errores ={errores}
                  fechas = {fechas}
                  onFechaInput = {onFechaInput}
                  onChangeEstatus = {onChangeEstatus}
                  estatusSeleccionado = {estatusSeleccionado}
                  responsableSeleccionado = {responsableSeleccionado}
                  onChangeResponsable = {onChangeResponsable}
                  onFechaInputRes = {onFechaInputRes}
                  changeFecha= {changeFecha}
                  changeFechaResponsable ={changeFechaResponsable}
                  onClickLimpiar={onClickLimpiar}
                  onClickFiltrar ={onClickFiltrar}
                  onClickFiltrarPendientes ={onClickFiltrarPendientes}
                  estatusProyectos ={estatusProyectos}
                  responsableEstatus={responsableEstatus}
                  idPortafolio={idPortafolio}
                  cambiarStepper={cambiarStepper}
                  idProyecto={idProyecto}
                  cerrarFiltro={cerrarFiltro}
                  abrirModalObservaciones = {abrirModalObservaciones}
                  openModalObservaciones = {openModalObservaciones}
                  cerrarModalObservaciones = {cerrarModalObservaciones}
                  IdDepartamento={IdDepartamento}
                  IdPuesto = {IdPuesto}
                  cabecerasImpactoDocumentos = {cabecerasImpactoDocumentos}
                  modalImpactos ={modalImpactos}
                  abrirModalDocumentos={abrirModalDocumentos}
                  obtenerObservaciones={obtenerObservaciones}
                  observaciones = {observaciones}
                  openModalCerrarProyecto = {openModalCerrarProyecto}
                  openModalCanceladoProyecto = {openModalCanceladoProyecto}
                  ticketsEnCancelacion = {ticketsEnCancelacion}
                  modalGuardadoProyecto ={modalGuardadoProyecto}
                  abrirGuardarModal = {abrirGuardarModal}
                />
              </Container>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}


ListadoProyectos.propTypes = {
  // actions:T.object,
  classes: T.object,
  abrirModalProyectos:T.func,
  listadoProyectos:T.object,
  onChangePlantilla:T.func,
  handleChangePrioridad:T.func,
  setNombreProyecto:T.func,
  cerrarModalProyectos:T.func,
  obtenerPlantillas:T.func,
  obtenerEmpleados:T.func,
  onChangeEmpleado:T.func,
  changeColorProyecto:T.func,
  guardarProyecto:T.func,
  obtenerProyectos:T.func,
  redireccionarPortafolios:T.func,
  abrirEdicionProyecto:T.func,
  onFechaInput:T.func,
  onChangeEstatus:T.func,
  onChangeResponsable:T.func,
  onFechaInputRes:T.func,
  changeFechaResponsable:T.func,
  changeFecha:T.func,
  onClickLimpiar:T.func,
  onClickFiltrar:T.func,
  cambiarStepper:T.func,
  obtenerObservaciones:T.func,
  onClickFiltrarPendientes:T.func,
  abrirModalObservaciones:T.func,
  cerrarModalObservaciones:T.func,
  IdDepartamento:T.number,
  IdPuesto:T.number,
  setAutorizadorAction:T.func,
  abrirModalDocumentos:T.func,
};
// _theme.palette.background.paper,
// _theme.spacing.unit * 2,
const withSaga = injectSaga({ key: 'planDeTrabajo', saga,mode: DAEMON });

export default compose(
  withStyles(styles),
  withSaga,
  withHandlers({
    edicionPortafolio: (props)=> (item,idx)=> () => {
      item.idx = idx
      const {
        abrirEdicionPortafolio,
      } = props
      abrirEdicionPortafolio(item)
    },
    redireccionarListado: (props)=> (item)=> () => {
      const {
        changeStepper,
        setAutorizadorAction,
      } = props
      changeStepper(item)
      setAutorizadorAction
    },
  }),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS ]===================================
     


    })
  ),
)(ListadoProyectos);