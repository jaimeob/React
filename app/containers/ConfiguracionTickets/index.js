/**
 *
 * ConfiguraciontICKETS
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withHandlers } from 'recompose';
import withNotifier from 'components/HOC/withNotifier';
import { DAEMON } from 'utils/constants';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
// import { withStyles } from '@material-ui/core/styles'; 
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Redirect} from 'react-router-dom'
import makeSelectConfiguracionCamposEspeciales from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Configuracion } from './components/Configuracion';

export class ConfiguracionTickets extends React.Component {
  
  componentWillUnmount() {
    // console.log("componentWillUnmount")
    const {
      configuracionTickets:{
        redirect,
      },
    } = this.props;
    // this.props.inicializarEstadoAction()

    if(redirect)
      this.props.redirigirEtapas()
  }

  componentDidMount() {
    // this.handleChangeDepartamento() 
    console.log(this.props.location,"LAS PROPISAS");

    if(this.props.location.state.salirConfig === false){
      this.props.desactivarSalirconfig()
    }
    
    this.props.getTipos()
    if(this.props.location.state !== undefined){
      if(this.props.location.state.ticket !== undefined){
        this.props.agregarEstadoTicket(this.props.location.state)
      }
      if(this.props.location.state.datosEtapas !== undefined){
        this.props.agregarEtapas(this.props.location.state);
      }
      if(this.props.location.state.datosEtapas === undefined && this.props.location.state.ticket === undefined){
        this.props.inicializarEstadoAction()
      }
    }
   
    this.props.sumarHorasSLA()
  }

  render() { 
    // console.log("this.props.location.state // configuracion-campos-especiales",this.props.location.state)
    const {
      configuracionTickets:{
        configuracion,
        stepper,
        redirect,
      },
      permisos,
      // actions:{
      // },
    } = this.props;
    console.log(this.props,'Las props de esta onfa');
    
    this.props.changeStepper()
    const accionesConfiguracion = {
      handleClickField: this.props.handleClickField,
      handleChangeTipo: this.props.handleChangeTipo,
      onChangeLongitud: this.props.onChangeLongitud,
      onChangeTitle:    this.props.onChangeTitle,
      onClickedDelCampo:this.props.onClickedDelCampo,
      agregarCampo:     this.props.agregarCampo,
      onChangeTipoTextoCorto: this.props.onChangeTipoTextoCorto,
      onChangeObligatorio: this.props.onChangeObligatorio,
      onChangeText:     this.props.onChangeText,
      onClickedAdd:     this.props.onClickedAdd,
      onClickedDelete:  this.props.onClickedDelete,
      onInputChange:    this.props.onInputChange,
      onChangeTamañosArchivos:  this.props.onChangeTamañosArchivos,
      onChangeTipoArchivo: this.props.onChangeTipoArchivo,
      redireccionarCofig: this.props.redireccionarCofig,
      cancelarCofigCampos: this.props.cancelarCofigCampos,
      onChangeNomServicio: this.props.onChangeNomServicio,
      handleChangeTipoServicio: this.props.handleChangeTipoServicio,
      handleChangeDepartamento: this.props.handleChangeDepartamento,
      seleccionarDepartamento: this.props.seleccionarDepartamento,
      handleChangePriorizador: this.props.handleChangePriorizador,
      handleChangePuesto:this.props.handleChangePuesto,
      redirigirEtapas:this.props.redirigirEtapas,
      checkEtapas:this.props.checkEtapas,
      checkAutorizacion:this.props.checkAutorizacion,
      checkSeguimiento:this.props.checkSeguimiento,
      guardarTicket:this.props.guardarTicket,
      validarCampos:this.props.validarCampos,
      actualizarTicket:this.props.actualizarTicket,
      agregarEtapas:this.props.agregarEtapas,
      handleChangePermisos:this.props.handleChangePermisos,
      onChangeNomCierreFaltaRespuesta: this.props.onChangeNomCierreFaltaRespuesta,
      onChangeNomTiempoRespuesta:this.props.onChangeNomTiempoRespuesta, 
      onChangeTipoTiempoRespuesta:this.props.onChangeTipoTiempoRespuesta,
      onChangeTipoCierreRespuesta:this.props.onChangeTipoCierreRespuesta,
      obtenerCatalogos:      this.props.obtenerCatalogos,
      onChangeValueCatalogo: this.props.onChangeValueCatalogo,
      onChangeSwitchRelacion:this.props.onChangeSwitchRelacion,
      onChangeSwitchRelacionaOtro:  this.props.onChangeSwitchRelacionaOtro,
      redirigirEspeciales:this.props.redirigirEspeciales,
      desactivarSalirconfig:this.props.desactivarSalirconfig,
    };
    console.log(configuracion,"configuracion Principal");

    switch (stepper) {
      case 0:
      // COMPONENTE DE ALEXIS
        return(
          
          <Configuracion
            configuracion = {configuracion}
            actions = {accionesConfiguracion}
            redirect = {redirect}
            permisos = {permisos}
          />
        );
        
      case 1:
        return(
          stepper === 1 ?  <Redirect to='/listado-tickets'  />  : ""
        );
        
      default:
        return null;
    }
  }
}

ConfiguracionTickets.propTypes = {
  configuracionTickets: T.object,
  handleClickField:   T.func,
  handleChangeTipo:   T.func,
  onChangeLongitud:   T.func,
  onChangeTitle:      T.func,
  onClickedDelCampo:  T.func,
  agregarCampo:       T.func,
  onChangeTipoTextoCorto:   T.func,
  onChangeObligatorio:      T.func,
  onChangeText:       T.func,
  onClickedAdd:       T.func,
  onClickedDelete:    T.func,
  onInputChange:      T.func,
  onChangeTamañosArchivos: T.func,
  onChangeTipoArchivo:T.func,
  // actions: T.object,
  redireccionarCofig: T.func,
  cancelarCofigCampos: T.func,
  onChangeNomServicio: T.func,
  handleChangeTipoServicio: T.func,
  getTipos: T.func,
  handleChangeDepartamento:T.func,
  seleccionarDepartamento:T.func,
  handleChangePriorizador:T.func,
  handleChangePuesto:T.func,
  redirigirEtapas:T.func,
  inicializarEstadoAction: T.func,
  checkEtapas:T.func,
  checkAutorizacion:T.func,
  checkSeguimiento:T.func,
  guardarTicket:T.func,
  actualizarTicket:T.func,
  validarCampos: T.func,
  location:T.object,
  agregarEtapas:T.func,
  agregarEstadoTicket:T.func,
  changeStepper:T.func,
  handleChangePermisos:T.func,
  sumarHorasSLA:T.func,
  onChangeNomCierreFaltaRespuesta: T.func,
  onChangeNomTiempoRespuesta:  T.func,
  onChangeTipoTiempoRespuesta:  T.func,
  onChangeTipoCierreRespuesta:  T.func,
  obtenerCatalogos:   T.func,
  onChangeValueCatalogo:    T.func,
  onChangeSwitchRelacion:   T.func,
  onChangeSwitchRelacionaOtro:  T.func,
  permisos: T.object,
  redirigirEspeciales: T.func,
  
};

const mapStateToProps = createStructuredSelector({
  configuracionTickets: makeSelectConfiguracionCamposEspeciales(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
    dispatch,
  });

}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'configuracionTickets',
  reducer,
});
const withSaga = injectSaga({ key: 'configuracionTickets', saga, mode: DAEMON });
// const withActions = Actions.bindReduxStore();
export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  // withActions,
  withHandlers({
    onClickAgregarProxy: (props) => (id) => () => {
      const {
        actions: {
          changeStepperAction,
          getPlazasHabilitadasAction,
        },
      } = props;
      getPlazasHabilitadasAction()
      changeStepperAction(id);
    },
  }),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      handleClickField: (index) => (event) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_COMPONENTE_ACTION',
          index,
        });
        event.stopPropagation();
      },
      // GUARDADO ----------------------------------------****
      guardarTicket:  () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/GUARDAR_TICKET',
        });
      },
      // ACTUALIZAR -----------------------------------------****
      actualizarTicket: () => { 
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ACTUALIZAR_TICKET',
        });
      },
      
      handleChangeTipo:  (index) => cls => {
        const tipo = cls.target.value;
        // const longitud = tipo > 1 ? 0 : 0;
        const valor = tipo > 1 ? [] : '';
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_TIPO_COMPONENTE_ACTION',
          index,
          tipo,
          valor,
          // longitud,
        });
        // onChangeLongitud('0',0,1);
      },
      onChangeTitle: (value,index) =>{
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_TEXT_COMPONENTE_ACTION',
          value,
          index,
        });
      },
      onClickedDelCampo: (index) => (event) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCLICK_COMPONENTE_ACTION',
          index,
        });
        event.stopPropagation();
      },
      onChangeTipoTextoCorto: (value,divSelecionado) => {
        const valor = value;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_TEXT_COMPONENTE_TXTCORTO_ACTION',
          divSelecionado,
          valor,
        });
      },
      onChangeLongitud: (value,divSelecionado,idTipoComponente) => {
        const valor = value;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_LONGITUD_COMPONENTE_TXTCORTO_ACTION',
          divSelecionado,
          valor,
          idTipoComponente,
        });
      },
      onChangeObligatorio: (divSelecionado) => event => {
        const {
          checked,
        } = event.target;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_OBLIGATORIO_COMPONENTE_TXTCORTO_ACTION',
          checked,
          divSelecionado,
        });
      },
      validarCampos: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/VALIDAR_CAMPOS_ACTION',
        });
      },

      onChangeText: (name,valor,divSelecionado) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_TEXT_COMPONENTE_ARCHIVOS_ACTION',
          name,
          valor,
          divSelecionado,
        });
        
      },
      agregarCampo: () => {
        const componente = {
          tipoComponenteId: 0,
          config: {
            isComplete:true,
            valor: "",
            valorNumero:-1,
            nomCampo: 'Descripción',
            tipo: 'text',
            label: '',
            value: '',
            longitud: 0,
            error: false,
            helpertext:'',
            helpertext2:'',
            requerido: false,
            colorearBorde: false,
            relacionaOtro: false,
            requeridoRelacion: false,
            cantidadarchivos: '',
            tamañoarchivos: '',
            itemsCatalogo: [],
            relaciones: {},
            opciones: [
              {
                id: '',
                value: '',
                label:'Opcion',
                error:false,
                icon:'',
              },
            ],
            tipoCierreRespuesta:"",
            tipoTiempoRespuesta:"",
          },
        };
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCLICK_AGREGAR_COMPONENTE_ACTION',
          componente,
        });
      },
      onClickedAdd: (divSelecionado) => {
        const opcion =  {
          id:'',
          value: '',
          label:'Opcion',
          error:false,
          icon:'',
        };

        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCLICK_AGREGAR_OPCION_LISTA_ACTION',
          opcion,
          divSelecionado,
        });
      },
      onClickedDelete: (divSelecionado,index) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCLICK_BORRAR_OPCION_LISTA_ACTION',
          index,
          divSelecionado,
        });
      },
      onChangeTamañosArchivos: (valor,divSelecionado,idTipoComponente) => {
        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONINPUT_TEXT_CARGAR_ARCHIVO_ACTION',
          valor,
          idTipoComponente,
          divSelecionado,
        });
        
      },
      onInputChange: (valor, index, idTipoComponenteId, divSelecionado) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONINPUT_TEXT_LISTA_ACTION',
          valor,
          index,
          divSelecionado,
        });
      },
      onChangeTipoArchivo: (tipoArchivo,divSelecionado) =>{
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_TIPO_ARCHIVO_ACTION',
          tipoArchivo,
          divSelecionado,
        });
      },
      onHandleChangeValueModal: (event,index,reglaSeleccionada) => {
        const nombreComponente = event.target.name;
        const nuevoValor = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_VALOR_COMP_MODAL_ACTION',
          nombreComponente,
          nuevoValor,
          index,
          reglaSeleccionada,
        });
      },
      onClickAgregarRegla: (reglaSeleccionada) => () =>{
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCLICK_AGREGAR_REGLA_ACTION',
          reglaSeleccionada,
        });
      },
      onClickBorrarRegla: (index,reglaSeleccionada) => () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCLICK_BORRAR_REGLA_ACTION',
          index,
          reglaSeleccionada,
        });
      },
      handleChangeRegla: (event) => {
        const valor = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_REGLA_ACTION',
          valor,
        });
      },
      redireccionarCofig: () => {        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/REDIRECCIONAR_CONFIGURACIONES',
        });
      },
      cancelarCofigCampos: () => {                
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/CANCELAR_CAMPOS',
        });
      },
      onClickDeleteStateRegla: () => {        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/VACIAR_ESTADO_REGLAS',
        });
      },
      onChangeNomServicio: (event) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_NOMBRE_SERVICIO',
          event:event.target.value,
        });
      },
      getTipos: () => {      
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/OBTENER_TIPOS',
        });
      },
      handleChangeTipoServicio: (event) => {      
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_SERVICIO',
          event:event.target.value,
        });
      },
      handleChangeDepartamento: (e) => event => {       
        console.log(event,"LO QUE LLEGA COMPA");
        console.log(e,"mi event papa");
         
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_DEPARTAMENTOS',
          event:event.value,
          label:event.label,
        });
      },

 
      handleChangePriorizador: (event) => {      
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_PRIORIZADOR',
          event:event.target.value,
        });
      },
      handleChangePuesto: (event) => {              
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_PUESTO',
          event:event.target.value,
        });
      },
      handleChangePermisos: (event) => {              
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_PERMISOS',
          event:event.target.value,
        });
      },
      redirigirEtapas: () => {        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/CHANGE_REDIRECT',
        });
      },      
      inicializarEstadoAction: () => {        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/INICIALIZAR_ESTADO_ACTION',
        });
      },
      checkEtapas: (event) => {                
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/CHECK_ETAPAS',
          event: event.target.checked,
        });
      },
      checkAutorizacion: (event) => {        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/CHECK_AUTORIZACION',
          event:event.target.checked,
        });
      },
      checkSeguimiento: (event) => {        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/CHECK_SEGUIMIENTO',
          event:event.target.checked,
        });
      },
      agregarEtapas: (data) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_ETAPAS_CONF',
          datos:data,
        });
      },

      changeStepper: () => {        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/CHANGE_STEPER',
        });
      },
      onChangeNomTiempoRespuesta: (event) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_TIEMPO_RESPUESTA',
          event:event.target.value,
        });
      },
      agregarEstadoTicket: (data) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_ETAPAS_CONF',
          datos:data,
        });
      },
      sumarHorasSLA: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SUMAR_HORAS_SLA',
        });
      },
      onChangeNomCierreFaltaRespuesta: (event) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_TIEMPO_CIERRE',
          event:event.target.value,
        });
      },
      onChangeTipoTiempoRespuesta: (event) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_TIPO_RESPUESTA',
          event:event.target.value,
        });
      },
      onChangeTipoCierreRespuesta: (event) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/CHANGE_TIPO_RESPUESTA',
          event:event.target.value,
        });
      }, 
      obtenerCatalogos: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/OBTENER_CATALOGOS_ACTION',
        });
      },
      onChangeValueCatalogo: (divSelecionado,index) => event => {
        const {
          name,
          value,
        } = event.target;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_VALUE_SELECTS_CATALOGOS_SAGA_ACTION',
          index,
          name,
          value,
          divSelecionado,
        });
      },
      onChangeSwitchRelacion: (divSelecionado) => event => {
        const {
          checked,
        } = event.target;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_OBLIGATORIO_RELACION_ACTION',
          checked,
          divSelecionado,
        });
      },
      onChangeSwitchRelacionaOtro: (divSelecionado) => event => {
        const {
          checked,
        } = event.target;
        console.log(divSelecionado,"divSelecionado");
        console.log(checked,"checked");
        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_SWITCH_RELACIONA_OTRO_ACTION',
          checked,
          divSelecionado,
        });
      },
      redirigirEspeciales: () => {  
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/REDIRGIR_CAMPOS_ESPECIALES',
        });
      },
      desactivarSalirconfig: () => {  
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONTICKETS/DESACTIVAR_SALIR_CONFIG',
        });
      },
    }),
  ),
)(ConfiguracionTickets);
