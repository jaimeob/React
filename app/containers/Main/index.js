/**
 *
 * Main
 *
 */

// ABSOLUTE IMPORTS

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { BrowserRouter as Router } from "react-router-dom";
import Helmet from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DAEMON } from 'utils/constants';

// import size from 'lodash/size';
/* ICONS */
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EventAvailable from '@material-ui/icons/EventAvailableOutlined';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Assessment from '@material-ui/icons/Assessment';
import ListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import MonetizationOn from '@material-ui/icons/MonetizationOnOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

/* CONTAINERS / COMPONENTS */
import Layout from 'components/Layout';
import Tableros from 'containers/Tableros';

import ConfiguracionCamposEspeciales from 'containers/ConfiguracionCamposEspeciales';
import ListadoTickets from 'containers/ListadoTickets';
import Formularios from 'containers/FormulariosViejo';
import FormulariosGerentes from 'containers/ListadoFormulario';
import FormulariosUsuarios from 'containers/FormulariosUsuarios';
import ConfiguracionTicket from 'containers/ConfiguracionTicket';
import PlanDeTrabajo from 'containers/PlanDeTrabajo';
import Prueba from 'containers/Prueba';


import Materiales from 'containers/Materiales';
import PedidosNuevo from 'containers/PedidosNuevo';
import InventarioPlaza from 'containers/InventarioPlaza';

import PedidosReporte from 'containers/PedidosReporte';
import Modulos from 'containers/Modulos';
import Roles from 'containers/Roles';
import Pedidos from 'containers/Pedidos';
import PuestoRol from 'containers/PuestoRol';
import Usuarios from 'containers/Usuarios';
import UsuariosAlmacenes from 'containers/UsuariosAlmacenes';

import { enqueueSnackbar } from 'reducers/notifications/actions';
import withNotifier from 'components/HOC/withNotifier';

// import SeguimientoTickets from 'containers/SeguimientoTickets';
import ConfiguracionTickets from 'containers/ConfiguracionTickets';
import Indicadores from 'containers/Indicadores';
import PorcentajeImpacto from 'containers/Negociaciones/Reportes/PorcentajeDeImpacto';
import ListadoFamilias from 'containers/Negociaciones/Catalogos/ListadoFamilias';
import ListadoExplosiones from 'containers/Negociaciones/Catalogos/ListadoExplosiones';
import PorcentajeAhorroCompras from 'containers/Negociaciones/Reportes/PorcentajeAhorroCompras';
import DiasPromedioNegociaciones from 'containers/Negociaciones/Reportes/DiasPromedio';
import PorcentajeMontoNegociado from 'containers/Negociaciones/Reportes/PorcentajeMontoNegociado';
import PorcentajeCumplimiento from 'containers/Negociaciones/Reportes/PorcentajeCumplimiento';
import Moldes from 'containers/InventarioMoldes/Catalogos/ConfiguracionMolde';
import Transformacion from 'containers/InventarioMoldes/Catalogos/ConfiguracionTransformacion';

// Modulo Indicadores
import ProcesoIndicador from 'containers/ModuloIndicadores/Procesos/Indicador';
import IndicadoresDireccion from 'containers/ModuloIndicadores/Reportes/IndicadoresDireccion';
import CambiarIndicador from 'containers/ModuloIndicadores/Procesos/CambiarIndicador';

// Modulo Cobranza Judicial
import CargaBase from 'containers/CobranzaJudicial/Catalogos/CargaBase';

import MovimientosInventario from 'containers/InventarioMoldes/Catalogos/MovimientosInventario';
import InventarioCiclico from 'containers/InventarioMoldes/Catalogos/InventarioCiclico';
import CatalogoEtapasCobranza from 'containers/CobranzaJudicial/Catalogos/CatalogoEtapas';
import AsignacionAbogados from 'containers/CobranzaJudicial/Procesos/AsignacionAbogados';

import Almacenes from 'containers/InventarioMoldes/Procesos/MovimientoAlmacen';
import Prestamos from 'containers/InventarioMoldes/Procesos/Prestamos';
import Transformaciones from 'containers/InventarioMoldes/Procesos/Transformacion';
import SeguimientoEtapas from 'containers/CobranzaJudicial/Procesos/SeguimientoEtapas';
import TablaPendientes from 'containers/PlanDeTrabajo/components/ListadoProyectos/TablaPendientes';

// Modulo Checador Personal Vigilancia
import NecesidadPorMes from "containers/ChecadorPersonalVigilancia/Catalogos/NecesidadPorMes";
import CapturaInasistencias from "containers/ChecadorPersonalVigilancia/Procesos/CapturaInasistencias";
import ReporteAsistencias from "containers/ChecadorPersonalVigilancia/Reportes/ReporteAsistencia";
import ReportesInventarioMoldes from 'containers/InventarioMoldes/Procesos/Reportes';
import Mantenimientos from 'containers/InventarioMoldes/Procesos/Mantenimientos';
import ConfiguracionBono from 'containers/ConfiguracionBono';
import CatalogoIndicadores from 'containers/CatalogoIndicadores';

import ConfiguracionFormularios from 'containers/Formularios/Catalogos/ConfiguracionFormularios';
import AsignacionFormularios from 'containers/Formularios/Procesos/AsignacionFormularios';
import AsignacionEncuestas from 'containers/Formularios/Procesos/AsignacionEncuestas';
import AsignacionEvaluaciones from 'containers/Formularios/Procesos/AsignacionEvaluaciones';
import ValidacionFormularios from 'containers/Formularios/Procesos/ValidacionFormularios';
import RespuestasFormularios from 'containers/Formularios/Procesos/RespuestasFormularios';
import ReporteEncuestas from 'containers/Formularios/Reportes/ReporteEncuestas';

// Modulo Comercial
import CargaCarteraFovisste from "containers/CargaExcelIndicadores/Procesos/CargaCarteraFovisste";
import CargaBuroCredito from "containers/CargaExcelIndicadores/Procesos/CargaBuroCredito";
import CargaEfectividadObra from "containers/CargaExcelIndicadores/Procesos/CargaEfectividadObra";
import CargaFlujoEfectivo from "containers/CargaExcelIndicadores/Procesos/CargaFlujoEfectivo";
import CargaRHAdom from "containers/CargaExcelIndicadores/Procesos/CargaRHAdom";
import CargaRHPrimaRiesgo from "containers/CargaExcelIndicadores/Procesos/CargaRHPrimaRiesgo";
import CargaActivoFijo from "containers/CargaExcelIndicadores/Procesos/CargaActivoFijo";
import CargaEntregaPrivadas from "containers/CargaExcelIndicadores/Procesos/CargaEntregaPrivadas";
import CargaProyectoAutorizadoATiempo from "containers/CargaExcelIndicadores/Procesos/CargaProyectoAutorizadoATiempo";
import CargaCreditoPuente from "containers/CargaExcelIndicadores/Procesos/CargaCreditoPuente";
import CargaPlaneacionCreditoPuente from "containers/CargaExcelIndicadores/Procesos/CargaPlaneacionCreditoPuente";

// Inventarios Enkontrol
import MonitorVale from "containers/InventariosEK/Reportes/MonitorVale";


import { ListAlt } from '@material-ui/icons';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import SpeakerNotesOutlinedIcon from '@material-ui/icons/SpeakerNotesOutlined';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import Actions from './store/actions';
import makeSelectMain, { makeSelectGlobal } from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import ConfiguracionPeriodos from '../ConfiguracionPeriodos';
import ConfiguracionIndicadores from '../ConfiguracionIndicadores';
import ConfiguracionEbitda from '../ConfiguracionEbitda';
import EntregaIndicador from '../EntregaIndicador';
import ConfiguracionJerarquia from '../ConfiguracionJerarquia';


// import ReportesInventario from '../InventarioPlaza/components/ReportesInventario';
// response = [ 'hola mundo', { direccion:  } ]
/* eslint-disable react/prefer-stateless-function */

let time;

export class Main extends React.Component {
  constructor(props){
    super(props);
    
    this.permisos = {
      normales: {},
      especiales: {},
    };
  }

  componentDidMount() {
    // configurar conexión a socket
    const {
      inactivityTime,
    } = this;

    inactivityTime();
  }

  // Cerrar sesión despues de 1 hora de inactividad
  logout = () => {
    clearTimeout(time);
    this.props.dispatch({
      type: 'boilerplate/App/LOGOUT_USUARIO_INACTIVO',
    });
  }

  resetTimer = () => {
    clearTimeout(time);
    time = setTimeout(this.logout, 10800000)
  }

  // Eventos para resetear el tiempo de la sesión
  inactivityTime = () => {
    window.onload = this.resetTimer;
    document.onmousemove = this.resetTimer;
    document.onkeypress = this.resetTimer;
  };

  render() {
    const {
      main:{
        toolbarTitle,
      },
      global:{
        currentUser,
        // permisos,
      },
    } = this.props;

    if(localStorage.getItem('permisos')){
      this.permisos = JSON.parse(localStorage.getItem('permisos'));
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <Helmet
          titleTemplate="%s - Sistema Integral de Indicadores Fincamex"
          defaultTitle="Sistema Integral de Indicadores Fincamex"
        >
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        <Router>
          <Layout
            toolbarTitle={toolbarTitle}
            usuario={currentUser}
            permisos={this.permisos}
            // Para las notificaciones (debe incluir evento para animar las notificaciones)
            colorNotificacion = "inherit"
            numeroNotificaciones = {50}
            // animarNotificacion = true
            drawerOptions={[
              {
                idModulo: 11,
                nomOpcion: 'Carga Cartera Fovisste',
                MUIIcon: <ViewListOutlinedIcon />,
                component: CargaCarteraFovisste,
                url: '/carga-cartera-fovisste',
              },
              {
                nomOpcion: 'Carga Buro Crédito',
                MUIIcon: <ListAlt />,
                component: CargaBuroCredito,
                url: '/carga-buro-credito',
              },
              {
                nomOpcion: 'Carga Efectividad Obra',
                MUIIcon: <ListAlt />,
                component: CargaEfectividadObra,
                url: '/carga-efectividad-obra',
              },
              {
                nomOpcion: 'Carga Flujo Efectivo',
                MUIIcon: <ListAlt />,
                component: CargaFlujoEfectivo,
                url: '/carga-flujo-efectivo',
              },
              {
                nomOpcion: 'Carga RH Administración',
                MUIIcon: <ListAlt />,
                component: CargaRHAdom,
                url: '/carga-rh-administracion',
              },
              {
                nomOpcion: 'Carga RH Prima Riesgo',
                MUIIcon: <ListAlt />,
                component: CargaRHPrimaRiesgo,
                url: '/carga-rh-prima-riesgo',
              },
              {
                nomOpcion: 'Carga Activo Fijo',
                MUIIcon: <ListAlt />,
                component: CargaActivoFijo,
                url: '/carga-activo-fijo',
              },
              {
                nomOpcion: 'Carga Entrega Privadas',
                MUIIcon: <ListAlt />,
                component: CargaEntregaPrivadas,
                url: '/carga-entrega-privadas',
              },
              {
                nomOpcion: 'Carga Proyecto Autorizado A Tiempo',
                MUIIcon: <ListAlt />,
                component: CargaProyectoAutorizadoATiempo,
                url: '/carga-proyecto-autorizado-tiempo',
              },
              {
                nomOpcion: 'Carga Crédito Pruente',
                MUIIcon: <ListAlt />,
                component: CargaCreditoPuente,
                url: '/carga-credito-puente',
              },
              {
                nomOpcion: 'Carga Planeación Crédito Puente',
                MUIIcon: <ListAlt />,
                component: CargaPlaneacionCreditoPuente,
                url: '/carga-planeacion-credito-puente',
              },
              {
                nomOpcion: 'Formularios',
                MUIIcon: <AssignmentIcon />,
                component: Formularios,
                url: '/formulariosViejo',
                permisos:{
                  soloLectura: true,
                  registrar: false,
                },
              },
              {
                idModulo: 3,
                nomOpcion: 'Indicadores',
                MUIIcon: <AssessmentOutlinedIcon />,
                component: Indicadores,
                url: '/Indicadores',
              },
              {
                idModulo: 8,
                nomOpcion: 'Configurar nuevo ticket',
                MUIIcon: <LocalOfferIcon />,
                component: ConfiguracionTicket,
                url: '/configurar-ticket',
                show:false,
              },
              {
                nomOpcion: 'Configurar campos especiales',
                MUIIcon: <SettingsIcon />,
                component: ConfiguracionCamposEspeciales,
                url: '/configuracion-campos-especiales',
                show:false,
              },
              {
                nomOpcion: 'Listado de tickets',
                MUIIcon: <DashboardIcon />,
                component: ListadoTickets,
                url: '/listado-tickets',
              },
              {
                nomOpcion: 'Tableros',
                MUIIcon: <ListBulletedIcon />,
                component: Tableros,
                url: '/Tableros',
              },
              {
                nomOpcion: 'PlanDeTrabajo',
                MUIIcon: <ListBulletedIcon />,
                component: PlanDeTrabajo,
                url: '/PlanDeTrabajo',
              },
              {
                nomOpcion: 'Formularios G',
                MUIIcon: <AssignmentInd />,
                component: FormulariosGerentes,
                url: '/formularios-priorizadores',
              },
              {
                nomOpcion: 'Formularios U',
                MUIIcon: <AssignmentIcon />,
                component: FormulariosUsuarios,
                url: '/formularios-usuarios',
              },
              {
                idModulo: 10,
                nomOpcion: 'Listado de Familias',
                MUIIcon: <LocalAtmOutlinedIcon />,
                component: ListadoFamilias,
                url: '/negociaciones-listadoFamilias',
              },
              {
                nomOpcion: 'Tableros',
                MUIIcon: <ListBulletedIcon />,
                component: Tableros,
                url: '/tableros',
              },
              {
                nomOpcion: 'Listado de Explosiones',
                MUIIcon: <AttachMoneyIcon />,
                component: ListadoExplosiones,
                url: '/listado-explosiones',
              },
              {
                nomOpcion: 'Porcentaje de Monto Negociado',
                MUIIcon: <AssignmentIcon />,
                component: PorcentajeMontoNegociado,
                url: '/porcentaje-monto-negociado',
              },
              {
                nomOpcion: 'Porcentaje de Cumplimiento',
                MUIIcon: <AssignmentIcon />,
                component: PorcentajeCumplimiento,
                url: '/porcentaje-cumplimiento',
              },
              {
                idModulo: 4,
                nomOpcion: 'Cargar Base',
                MUIIcon: <MonetizationOn />,
                component: CargaBase,
                url: '/carga-base',
              },
              {
                nomOpcion: 'Formularios G',
                MUIIcon: <AssignmentInd />,
                component: FormulariosGerentes,
                url: '/formularios-priorizadores',
              },
              {
                nomOpcion: 'Formularios U',
                MUIIcon: <AssignmentIcon />,
                component: FormulariosUsuarios,
                url: '/formularios-usuarios',
              },
              {
                nomOpcion: 'Porcentaje de Impacto',
                MUIIcon: <Assessment />,
                component: PorcentajeImpacto,
                url: '/negociaciones-porcentajeImpacto',
              },
              {
                nomOpcion: 'Porcentaje de Ahorro',
                MUIIcon: <MonetizationOn />,
                component: PorcentajeAhorroCompras,
                url: '/negociaciones-PorcentajeAhorro',
              },
              {
                nomOpcion: 'Días Promedio',
                MUIIcon: <Assessment />,
                component: DiasPromedioNegociaciones,
                url: '/negociaciones-DiasPromedioNegociaciones',
              },
              {
                nomOpcion: 'Catálogo de Materiales',
                MUIIcon: <AssignmentIcon />,
                component: Materiales,
                url: '/listado-materiales',
              },
              {
                idModulo: 6,
                nomOpcion: 'Pedidos nuevo',
                MUIIcon: <SpeakerNotesOutlinedIcon />,
                component: PedidosNuevo,
                url: '/pedidos-nuevo',
              },
              {
                nomOpcion: 'Inventario',
                MUIIcon: <AssignmentIcon />,
                component: InventarioPlaza,
                url: '/inventario-plaza',
              },
              {
                idModulo: 2,
                nomOpcion: 'Módulos',
                MUIIcon: <SettingsIcon />,
                component: Modulos,
                url: '/modulos',
              },
              {
                nomOpcion: 'Roles',
                MUIIcon: <AssignmentIcon />,
                component: Roles,
                url: '/roles',
              },
              {
                // idModulo:2,
                idFuncion:2453,
                nomOpcion: 'Puesto Rol',
                MUIIcon: <AssignmentIcon />,
                component: PuestoRol,
                url: '/puesto-rol',
              },
              {
                nomOpcion: 'Usuarios',
                MUIIcon: <AssignmentIcon />,
                component: Usuarios,
                url: '/usuarios',
              },
              {
                nomOpcion: 'Nuevo Config  ',
                MUIIcon: <AssignmentIcon />,
                component: ConfiguracionTickets,
                url: '/nuevo-configuracionTickets',
              },
              {
                nomOpcion: 'Reporte Inventarios Corporativo',
                MUIIcon: <AssignmentIcon />,
                component: PedidosReporte,
                url: '/reporte-inventarios-corporativo',
                state: {idReporte : 0},
              },
              {
                nomOpcion: 'Reporte de Inventarios',
                MUIIcon: <AssignmentIcon />,
                component: PedidosReporte,
                url: '/reporte-inventarios/',
                state: {idReporte : 1},
              },
              {
                idModulo: 7,
                nomOpcion: 'Configuración de Moldes',
                MUIIcon: <AssignmentTurnedInOutlinedIcon />,
                component: Moldes,
                url: '/configuracion-moldes/',
              },
              {
                nomOpcion: 'Configuración Transformación de Moldes',
                MUIIcon: <AssignmentIcon />,
                component: Transformacion,
                url: '/transformacion-moldes/',
              },
              {
                nomOpcion: 'Movimientos de Inventario',
                MUIIcon: <AssignmentIcon />,
                component: MovimientosInventario,
                url: '/movimientos-inventario/',
              },
              {
                nomOpcion: 'Inventario Ciclico',
                MUIIcon: <AssignmentIcon />,
                component: InventarioCiclico,
                url: '/inventario-ciclico/',
              },
              {
                nomOpcion: 'Pedidos',
                MUIIcon: <AssignmentIcon />,
                component: Pedidos,
                url: '/pedidos-detalle',
              },
              {
                idModulo: 9,
                nomOpcion: 'Plan De Trabajo',
                MUIIcon: <EventAvailable />,
                component: PlanDeTrabajo,
                url: '/plan-trabajo',
              },
              {
                nomOpcion: 'Movimientos Almacenes',
                MUIIcon: <AssignmentIcon />,
                component: Almacenes,
                url: '/movimientos-almacenes',
              },
              {
                nomOpcion: 'Transformación de Moldes',
                MUIIcon: <AssignmentIcon />,
                component: Transformaciones,
                url: '/transformaciones-moldes',
              },
              {
                nomOpcion: 'Reportes inventario de Moldes',
                MUIIcon: <AssignmentIcon />,
                component: ReportesInventarioMoldes,
                url: '/reportes-inventario-molde',
              },
              {
                nomOpcion: 'Reportes inventario de Moldes',
                MUIIcon: <AssignmentIcon />,
                component: Mantenimientos,
                url: '/mantenimientos-inventario',
              },
              {
                nomOpcion: 'Catalogo de Estapas',
                MUIIcon: <AssignmentIcon />,
                component: CatalogoEtapasCobranza,
                url: '/catalogo-etapas-cobranza',
              },
              {
                nomOpcion: 'Asignación de Abogados',
                MUIIcon: <AssignmentInd />,
                component: AsignacionAbogados,
                url: '/asignacion-abogados',
              },
              {
                nomOpcion: 'Seguimiento de Etapas',
                MUIIcon: <AssignmentInd />,
                component: SeguimientoEtapas,
                url: '/seguimiento-etapas',
              },
              {
                nomOpcion: 'PRUEBA',
                MUIIcon: <AssignmentIcon />,
                component: Prueba,
                url: '/prueba',
              },
              {
                nomOpcion: 'Configuración Bono',
                MUIIcon: <AssignmentIcon />,
                component: ConfiguracionBono,
                url: '/configuracion-bono',
              },
              {
                nomOpcion: 'Catálogo Indicador',
                MUIIcon: <AssignmentIcon />,
                component: CatalogoIndicadores,
                url: '/catalogo-indicadores',
              },
              {
                nomOpcion: 'Configuración Periodo',
                MUIIcon: <AssignmentIcon />,
                component: ConfiguracionPeriodos,
                url: '/configuracion-periodo',
              },
              {
                nomOpcion: 'Configuración Indicadores',
                MUIIcon: <AssignmentIcon />,
                component: ConfiguracionIndicadores,
                url: '/configuracion-indicadores',
              },
              {
                nomOpcion: 'Usuarios almacenes',
                MUIIcon: <AssignmentIcon />,
                component: UsuariosAlmacenes,
                url: '/usuarios-almacenes',
              },
              {
                nomOpcion: 'Prestamos de moldes',
                MUIIcon: <AssignmentIcon />,
                component: Prestamos,
                url: '/prestamos',
              },
              {
                nomOpcion: 'Necesidad por Mes',
                MUIIcon: <AssignmentIcon />,
                component: NecesidadPorMes,
                url: '/necesidad-por-mes',
              },
              {
                idModulo: 5,
                nomOpcion: 'Captura Inasistencias',
                MUIIcon: <AssignmentIndOutlinedIcon />,
                component: CapturaInasistencias,
                url: '/captura-inasistencias',
              },
              {
                nomOpcion: 'Reporte de Asistencias',
                MUIIcon: <AssignmentIcon />,
                component: ReporteAsistencias,
                url: '/reporte-asistencias',
              },
              {
                nomOpcion: 'Indicadores',
                MUIIcon: <AssignmentIcon />,
                component: ProcesoIndicador,
                url: '/proceso-indicador',
              },
              {
                nomOpcion: 'Indicadores Direccion',
                MUIIcon: <AssignmentIcon />,
                component: IndicadoresDireccion,
                url: '/reporte-indicadores-direccion',
              },
              {
                nomOpcion: 'Configuración Ebitda',
                MUIIcon: <AssignmentIcon />,
                component: ConfiguracionEbitda,
                url: '/configuracion-ebitda',
              },
              {
                nomOpcion: 'Cambiar indicador',
                MUIIcon: <AssignmentIcon />,
                component: CambiarIndicador,
                url: '/proceso-cambiar-indicador',
              },
              {
                nomOpcion: 'Entrega Indicador',
                MUIIcon: <AssignmentIcon />,
                component: EntregaIndicador,
                url: '/entrega-indicador',
              },
              {
                nomOpcion: 'Configuración Jerarquia',
                MUIIcon: <AssignmentIcon />,
                component: ConfiguracionJerarquia,
                url: '/configuracion-jerarquia',
              },
              {
                idModulo: 12,
                nomOpcion: 'Configuracion de formularios',
                MUIIcon: <CheckCircleOutlineIcon />,
                component: ConfiguracionFormularios,
                url: '/configuracion-formularios',
              },
              {
                nomOpcion: 'Asignación de formularios',
                MUIIcon: <AssignmentIcon />,
                component: AsignacionFormularios,
                url: '/asignacion-formularios',
              },
              {
                nomOpcion: 'Asignación de encuestas',
                MUIIcon: <AssignmentIcon />,
                component: AsignacionEncuestas,
                url: '/asignacion-encuestas',
              },
              {
                nomOpcion: 'Asignación de evaluaciones',
                MUIIcon: <AssignmentIcon />,
                component: AsignacionEvaluaciones,
                url: '/asignacion-evaluaciones',
              },
              {
                nomOpcion: 'Respuestas de formularios',
                MUIIcon: <AssignmentIcon />,
                component: RespuestasFormularios,
                url: '/respuestas-formularios',
                state: {tipoFormulario:'REFFOR'},
              },
              {
                nomOpcion: 'Respuestas de encuestas',
                MUIIcon: <AssignmentIcon />,
                component: RespuestasFormularios,
                url: '/respuestas-encuestas',
                state: {tipoFormulario:'REFENC'},
              },
              {
                nomOpcion: 'Respuestas de evaluaciones',
                MUIIcon: <AssignmentIcon />,
                component: RespuestasFormularios,
                url: '/respuestas-evaluaciones',
                state: {tipoFormulario:'REFEVA'},
              },
              {
                nomOpcion: 'Proyectos Pendientes - Plan de Trabajo',
                MUIIcon: <AssignmentInd />,
                component: TablaPendientes,
                url: '/proyectos-pendientes',
              },
              {
                nomOpcion: 'Reporte de encuestas',
                MUIIcon: <AssignmentInd />,
                component: ReporteEncuestas,
                url: '/reporte-encuestas',
                state: {tipoFormulario : 'REFENC'},
              },
              {
                nomOpcion: 'Reporte de evaluaciones',
                MUIIcon: <AssignmentInd />,
                component: ReporteEncuestas,
                url: '/reporte-evaluaciones',
                state: {tipoFormulario : 'REFEVA'},
              },
              {
                nomOpcion: 'Reporte de formularios',
                MUIIcon: <AssignmentInd />,
                component: ReporteEncuestas,
                url: '/reporte-formularios',
                state: {tipoFormulario : 'REFFOR'},
              },
              {
                nomOpcion: 'Validacion Formulario',
                MUIIcon: <AssignmentInd />,
                component: ValidacionFormularios,
                url: '/validacion-formularios',
                state: {tipoFormulario : 'REFFOR'},
              },
              {
                nomOpcion: 'Monitor',
                MUIIcon: <AssignmentInd />,
                component: MonitorVale,
                url: '/monitor-prevale',
              },
            ]}
          />
        </Router>
      </React.Fragment>
    );
  }
}

// const actionsTypes = T.shape({
//   requestConfigProyectoAction: T.func,
// })

Main.propTypes = {
  // dispatch: T.func.isRequired,
  main: T.shape({
    toolbarTitle: T.string,
  }),
  // handlers: T.object,
  // actions: T.object,
  global: T.object,
  dispatch: T.func,
};

const mapStateToProps = createStructuredSelector({
  main: makeSelectMain(),
  global: makeSelectGlobal(),
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

const withReducer = injectReducer({ key: 'main', reducer });
const withSaga = injectSaga({ key: 'main', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore();
export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(Main);
