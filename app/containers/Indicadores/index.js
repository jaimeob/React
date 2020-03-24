/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/**
 *
 * Indicadores
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import withNotifier from 'components/HOC/withNotifier';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectIndicadores from './selectors';
import reducer from './reducer';
import saga from './saga';
import  ReporteDesempeño  from './components/ReporteDesempeño';


/* eslint-disable react/prefer-stateless-function */
export class Indicadores extends React.Component {


  render() {
    const {
      indicadores:{
        stepper,
      },
    } = this.props;

    const dataReporteDesempeño = {
      cargando:                 this.props.indicadores.cargando,
      departamento:             this.props.indicadores.departamento,
      tipoTicket:               this.props.indicadores.tipoTicket,
      plazaSeleccionada:        this.props.indicadores.plazaSeleccionada,
      anioCorte:                this.props.indicadores.anioCorte,
      aCorteDe:                 this.props.indicadores.aCorteDe,
      periodoCorte:             this.props.indicadores.periodoCorte,
      indicadorPor:             this.props.indicadores.indicadorPor,
      arrTipoTicket:            this.props.indicadores.arrTipoTicket,
      arrDepartamentos:         this.props.indicadores.arrDepartamentos,
      arrPlazas:                this.props.indicadores.arrPlazas,
      arrAnios:                 this.props.indicadores.arrAnios,
      arrSemanas:               this.props.indicadores.arrSemanas,
      arrMeses:                 this.props.indicadores.arrMeses,
      mostrarGrafica:           this.props.indicadores.mostrarGrafica,
      datosPuesto:              this.props.indicadores.datosReportesOCKyOEPuesto,
      datosProceso:             this.props.indicadores.datosReportesOCKyOEProceso,
      datosPuestoTotales:       this.props.indicadores.datosReportesOCKyOEPuestoTotales,
      arrSemanaRetailProceso:   this.props.indicadores.arrSemanaRetailProceso,
      arrCumplimientoProceso:   this.props.indicadores.arrCumplimientoProceso,
      arrGrafPuesto:            this.props.indicadores.arrGrafPuesto,
      dataTablaPuesto:          this.props.indicadores.dataTablaPuesto,
      arrGrafBarrasPuesto:      this.props.indicadores.arrGrafBarrasPuesto,
    }

    const accionesReporteDesempeño = {
      showCargando:             this.props.showCargando,
      onChangeDepartamento:     this.props.onChangeDepartamento,
      onChangeTipoTicket:       this.props.onChangeTipoTicket,
      cargarDepartamentos:      this.props.cargarDepartamentos,
      cargarTipoTicket:         this.props.cargarTipoTicket,
      cargarPlazas:             this.props.cargarPlazas,
      onChangePlaza:            this.props.onChangePlaza,
      onChangeValue:            this.props.onChangeValue,
      onClickMostrarGrafica:    this.props.onClickMostrarGrafica,
      getDatosIndicadores:      this.props.getDatosIndicadores,
      onChangeAnio:             this.props.onChangeAnio,
    }
    switch (stepper) {
      case 0:
        return (
          <ReporteDesempeño
            data={dataReporteDesempeño}
            acciones={accionesReporteDesempeño}
          />
        );
      
      case 1:
        return null;
       
   
      default:
        return null;
    }
  }
}

Indicadores.propTypes = {
  indicadores:        T.object,
  cargarDepartamentos:T.func,
  cargarTipoTicket:   T.func,
  cargarPlazas:       T.func,
  onChangeDepartamento:T.func,
  onChangeTipoTicket: T.func,
  onChangePlaza:      T.func,
  onChangeAnio:       T.func,
  onChangeValue:      T.func,
  onClickMostrarGrafica: T.func,
  getDatosIndicadores:T.func,
  arrSemanas:         T.func,
  showCargando:       T.func,

  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  indicadores: makeSelectIndicadores(),
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

const withReducer = injectReducer({ key: 'indicadores', reducer });
const withSaga = injectSaga({ key: 'indicadores', saga });

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  connect(
  /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      cargarDepartamentos: () => {
        dispatch({
          type: 'APP/CONTAINER/INDICADORES/GET_DATOS_COMBOS_INDICADORES_ACTION',
          tipo: 'departamento',
        });
        
      },
      onChangeDepartamento:(event) => {
        const IdDepartamento = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/INDICADORES/GET_DATOS_COMBOS_INDICADORES_ACTION',
          tipo: 'tipoTicket',
          IdDepartamento,
        });
      },
      onChangeTipoTicket:(event) => { 
        const idPlan = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/INDICADORES/GET_DATOS_COMBOS_INDICADORES_ACTION',
          tipo: 'Plaza',
          idPlan,
        });
      },
      onChangePlaza: (event) => {
        const IdPlaza = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/INDICADORES/GET_DATOS_COMBOS_INDICADORES_ACTION',
          tipo: 'Anio',
          IdPlaza,
        });
      },
      onChangeAnio: (IdPlaza) => event => {
        const Anio = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/INDICADORES/GET_DATOS_COMBOS_INDICADORES_ACTION',
          tipo: 'Periodo',
          IdPlaza,
          Anio,
        });
      },
      onChangeValue: (event) => {
        const nombre = event.target.name;
        const valor = event.target.value;

        dispatch({
          type: 'APP/CONTAINER/INDICADORES/ONCHANGE_VALUE_ACTION',
          nombre,
          valor,
        });
      },
      onClickMostrarGrafica: (mostrarGrafica) => () => {
        dispatch({
          type: 'APP/CONTAINER/INDICADORES/ONCLICK_MOSTRAR_GRAFICA_DESEMPEÑO_ACTION',
          mostrarGrafica,
        });
      },
      getDatosIndicadores: () => {
        dispatch({
          type: 'APP/CONTAINER/INDICADORES/ONCLICK_GENERAR_GRAFICOS_ACTION',
        });
      },
      showCargando: (bandera) => {
        dispatch({
          type: 'APP/CONTAINER/INDICADORES/CARGANDO_GRAFICOS_ACTION',
          bandera,
        });
      },
    }),
  ),
)(Indicadores);
