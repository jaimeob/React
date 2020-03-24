/* eslint-disable react/prop-types */
/**
 *
 * ConfiguracionCamposEspeciales
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withHandlers } from 'recompose';
import withNotifier from 'components/HOC/withNotifier';
// import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import makeSelectConfiguracionCamposEspeciales from './selectors';
import reducer from './reducer';
import saga from './saga';
import { TablaEtapas } from './components/TablaEtapas';
import ConfEtapas from './components/ConfEtapas'
import { Configuracion } from './components/Configuracion';
import Actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ConfiguracionCamposEspeciales extends React.Component {
  componentWillUnmount() {    
    const {
      configuracionCamposEspeciales:{
        redirect,
      },
      actions: {
        changeRedirectAction,
      },
    } = this.props    
    if(redirect){
      changeRedirectAction()
    }
  }

  componentDidMount() {
    // console.log("componentDidMount ",this.props.location);
    const {
      configuracionCamposEspeciales:{
        configuracion:{
          salirConfiguracion,
        },
        redirect,
        tabla: {
          idPlantilla,
        },
      },
     
      actions: {
        getPlazasAction,
        getPlazasHabilitadasAction,
        changeRedirectAction,
        vaciarPlazasAction,
        setComponentesConfiguracionAction,
        ajustarCampoEtapasAction,
        inicializarEstadoAction,
        
      },
      redirigirCamposEspeciales,
      ajustarCamposEspeciales,
    } = this.props

    // eslint-disable-next-line react/prop-typesW
    console.log(this.props.location.state,'this.state ------------------------------------------');
    if(this.props.location.state.redirectCamposEspeciales){
      
      if(this.props.location.state.camposEspeciales.length > 0 && !salirConfiguracion){
        ajustarCamposEspeciales(
          this.props.location.state.camposEspeciales,
          this.props.location.state.IdEtapa,
          this.props.location.state.tiempos,
        )
      }
      redirigirCamposEspeciales(
        this.props.location.state.componentes,        
      )
    }
    
    if(idPlantilla !== this.props.location.state.IdPlantilla){
      if(idPlantilla !== 0)
        inicializarEstadoAction()
    }
    
    ajustarCampoEtapasAction()
    // getPlazasAction(this.props.location.state);

    if(redirect)
      changeRedirectAction()
    else{
      // console.log("this.props.location.state // configuracion-campos-especiales",this.props.location.state)
      // eslint-disable-next-line react/prop-types
      if(this.props.location.state){
        // eslint-disable-next-line react/prop-types
        if(!this.props.location.state.redirectCamposEspeciales){
          if(this.props.location.state.Etapas.length > 0){         
            getPlazasAction(this.props.location.state);
            getPlazasHabilitadasAction()
          }else{
            inicializarEstadoAction()
          }
          // eslint-disable-next-line react/prop-types
          if(this.props.location.state.Etapas.length === 0){
            vaciarPlazasAction()
          }
        }
      }
      getPlazasHabilitadasAction()  
      setComponentesConfiguracionAction(this.props.location.state)
    }
  }

  render() { 
    const {
      configuracionCamposEspeciales:{
        configuracion,
        configuracionComponentes,
        componentesFiltrados,
        nuevoValor,
        etapas,
        stepper,
        redirect,
        tabla: {
          datosEtapa,
          cabecerasEtapa,
          datosPlaza,
          cabecerasPlaza,
          etapa,
          plaza,
          modal,
          idPlaza,
          etapasTemporales,
          idPlantilla,
          modalClonar,
          plazaClonSeleccionada,
          datosEtapasBorradas,
          modalBorrado,
          idEtapaBorrar,
        },
        confEtapas,
        
      },
      actions:{
        checkSeguimientoAction,
        handleChangePlazaAction,
        handleChangePlazaDestinoAction,
        changeNombreEtapaAction,
        seleccionarUsariosRolesAction,
        handleChangeTipoAction,
        permitirCancelacionAction,
        handleChangeDependenciaAction,
        redireccionarCamposAction,
        getEtapasAction,
        redireccionarEtapasAction,
        changeHoraInicioAction,
        deleteEtapaAction,
        deletePlazaAction,
        // eslint-disable-next-line no-unused-vars
        getPlazasAction,
        changeRedirectAction,
        getPlazasHabilitadasAction,
        changeStepperAction,
        cancelarEtapaAction,
        openModalAction,
        agregarEtapaPlazaAction,
        changeEtapaAction,
        actualizarEtapaTemporalAction,
        insertarTiempoSla1Action,
        insertarTiempoSla2Action,
        changeHoraFinAction,
        changeHoraFin2Action,
        changeHoraInicio2Action,
        handleChangePlazaClonAction,
        validarEtapasAction,
        ajustarCampoEtapasAction,
        cerrarModalBorradoAction,
        abrirModalBorradoAction,
      },
      enqueueSnackbar : enqueueSnackbarAction,
      onClickAgregarProxy,
      editarEtapa,
      cerrarClonacion,
      onClonarEtapa,
      clonarEtapasPlazas,
      obtenerNumeroDePuestos,
      permisos,
    } = this.props;
    // console.log(this.props,"ESPECIALES");
    
    const accionesConfiguracion = {
      handleClickField: this.props.handleClickField,
      handleChangeTipo: this.props.handleChangeTipo,
      onChangeLongitud: this.props.onChangeLongitud,
      onChangeTitle:    this.props.onChangeTitle,
      onClickedDelCampo:this.props.onClickedDelCampo,
      agregarCampo:     this.props.agregarCampo,
      onChangeTipoTextoCorto: this.props.onChangeTipoTextoCorto,
      onChangeErrorTipo: this.props.onChangeErrorTipo,
      onChangeErrorLongitud: this.props.onChangeErrorLongitud,
      onChangeErrorComponente: this.props.onChangeErrorComponente,
      onChangeErrorOpcion: this.props.onChangeErrorOpcion,
      onChangeErrorCantidadArchivos: this.props.onChangeErrorCantidadArchivos,
      onChangeErrorTamañoArchivos: this.props.onChangeErrorTamañoArchivos,
      onChangeErrorCatalogo: this.props.onChangeErrorCatalogo,
      onChangeObligatorio: this.props.onChangeObligatorio,
      onChangeText:     this.props.onChangeText,
      onClickedAdd:     this.props.onClickedAdd,
      onClickedDelete:  this.props.onClickedDelete,
      onInputChange:    this.props.onInputChange,
      onChangeTamañosArchivos:  this.props.onChangeTamañosArchivos,
      onChangeTipoArchivo:      this.props.onChangeTipoArchivo,
      redireccionarCofig:       this.props.redireccionarCofig,
      cancelarCofigCampos:      this.props.cancelarCofigCampos,
      agregarCamposEspecialesEtapa:this.props.agregarCamposEspecialesEtapa,
      obtenerCatalogos:         this.props.obtenerCatalogos,
      onChangeValueCatalogo:    this.props.onChangeValueCatalogo,
      onChangeSwitchRelacion:   this.props.onChangeSwitchRelacion,
      onChangeSwitchRelacionaOtro:  this.props.onChangeSwitchRelacionaOtro,
      notificacion:             enqueueSnackbarAction,
      guardarConfig:            this.props.guardarConfig,
      desactivarCamposEspeciales:  this.props.desactivarCamposEspeciales,
      redirectConf:this.props.redirectConf,
    };
    
    const accionesModal = {
      onHandleChangeValueModal:    this.props.onHandleChangeValueModal,
      onHandleChangeInputValueModal:    this.props.onHandleChangeInputValueModal,
      onChangeErrorReglas:         this.props.onChangeErrorReglas,
      onClickAgregarRegla:         this.props.onClickAgregarRegla,
      onClickBorrarRegla:          this.props.onClickBorrarRegla,
      handleChangeRegla:           this.props.handleChangeRegla,
      redireccionarCofig: this.props.redireccionarCofig,
      cancelarCofigCampos: this.props.cancelarCofigCampos,
      onClickDeleteStateRegla:this.props.onClickDeleteStateRegla,
      agregarReglaTemporal:this.props.agregarReglaTemporal,
      onClickAddStateRegla:this.props.onClickAddStateRegla,
      guardarConfig:this.props.guardarConfig,
      onClickPutStateRegla:this.props.onClickPutStateRegla,
    }
    
    // console.log(this.props.configuracionCamposEspeciales,"STATE TABLA")
    // console.log(configuracionComponentes,"configuracionCampos");
    switch (stepper) {
      case 0:
      // COMPONENTE DE ALEXIS
        return(
          <Configuracion
            configuracion = {configuracion}
            actions       = {accionesConfiguracion}
          />
        );
      case 1:
      // COMPONENTE DE JAIME
        return (          
          <ConfEtapas
            confEtapas = {confEtapas}
            handleChangePlaza = {handleChangePlazaAction}
            handleChangePlazaDestino = {handleChangePlazaDestinoAction}
            iniciarSeguimiento = {checkSeguimientoAction}
            changeNombreEtapa = {changeNombreEtapaAction}
            seleccionarTipoBusqueda = {seleccionarUsariosRolesAction}
            handleChangeTipo = {handleChangeTipoAction}
            permitirCancelacionAction = {permitirCancelacionAction}
            handleChangeDependencia = {handleChangeDependenciaAction}
            redireccionarCampos={redireccionarCamposAction}
            redireccionarEtapas={redireccionarEtapasAction}
            changeHoraInicio={changeHoraInicioAction}
            accionesModal={accionesModal}
            etapas={etapas}
            componentesEspeciales={configuracion.componentes}
            configuracionCampos={configuracionComponentes}
            componentesFiltrados = {componentesFiltrados}
            // nuevoValor={nuevoValor}
            idPlaza={idPlaza}
            changeStepper= {changeStepperAction}
            agregarEtapaPlaza = {agregarEtapaPlazaAction}
            actualizarEtapaTemporal = {actualizarEtapaTemporalAction}
            etapasTemporales= {etapasTemporales}
            insertarTiempoSla1 ={insertarTiempoSla1Action}
            insertarTiempoSla2 = {insertarTiempoSla2Action}
            changeHoraFin = {changeHoraFinAction}
            changeHoraInicio2 = {changeHoraInicio2Action}
            changeHoraFin2 ={changeHoraFin2Action}
            idPlantilla ={idPlantilla}
            datosEtapa= {datosEtapa}
            validarEtapas={validarEtapasAction()}
            obtenerNumeroDePuestos={obtenerNumeroDePuestos}
            nuevoValor={nuevoValor}
            
          
          />         
        );
      
      case 2:
      // COMPONENTE DE JAVIER
        return(
          <TablaEtapas
            datosEtapa={datosEtapa}
            cabecerasEtapa={cabecerasEtapa}
            datosPlaza={datosPlaza}
            cabecerasPlaza={cabecerasPlaza}
            onClickPlaza={getEtapasAction}
            etapa={etapa}
            plaza={plaza}
            idPlaza={idPlaza}
            // onCancelar={getPlazasAction}
            onCancelar={() => cancelarEtapaAction(2)}
            onClickAgregar={onClickAgregarProxy(1)}
            onDeleteEtapa={deleteEtapaAction}
            onDeletePlaza={deletePlazaAction}
            onClonarEtapa={onClonarEtapa}
            redirect={redirect}
            onClickRedirect={changeRedirectAction}
            getPlazasHabilitadas={getPlazasHabilitadasAction}
            // redirigirConfTickets={redirigirConfTicketsAction}
            confEtapas = {confEtapas}
            configuracionCampos = {configuracion}
            modal={modal}
            openModal={openModalAction}
            changeEtapa ={changeEtapaAction}
            editEtapa={editarEtapa}
            etapasTemporales ={etapasTemporales}
            modalClonar = {modalClonar}
            handleChangePlazaClon = {handleChangePlazaClonAction}
            plazaClonSeleccionada={plazaClonSeleccionada}
            cerrarClonacion={cerrarClonacion}
            clonarEtapasPlazas={clonarEtapasPlazas}
            ajustarCampoEtapas= {ajustarCampoEtapasAction}
            stepper= {stepper}
            datosEtapasBorradas = {datosEtapasBorradas}
            cerrarModalBorrado ={cerrarModalBorradoAction}
            abrirModalBorrado ={abrirModalBorradoAction}
            modalBorrado={modalBorrado}
            idEtapaBorrar = {idEtapaBorrar}
            permisos = {permisos}
          />
        );

      default:
        return null;
    }
    
  }
}

ConfiguracionCamposEspeciales.propTypes = {
  configuracionCamposEspeciales: T.object,
  handleClickField:   T.func,
  handleChangeTipo:   T.func,
  onChangeLongitud:   T.func,
  onChangeTitle:      T.func,
  onClickedDelCampo:  T.func,
  agregarCampo:       T.func,
  onChangeTipoTextoCorto:  T.func,
  onChangeErrorTipo:       T.func,
  onChangeErrorLongitud:   T.func,
  onChangeErrorOpcion:     T.func,
  onChangeErrorComponente: T.func,
  onChangeErrorCantidadArchivos: T.func,
  onChangeErrorTamañoArchivos:   T.func,
  onChangeErrorCatalogo:         T.func,
  onChangeObligatorio:     T.func,
  onChangeText:       T.func,
  onClickedAdd:       T.func,
  onClickedDelete:    T.func,
  onInputChange:      T.func,
  onChangeTamañosArchivos: T.func,
  onChangeTipoArchivo:T.func,
  actions: T.object,
  onClickAgregarProxy: T.func,
  onHandleChangeValueModal: T.func,
  onHandleChangeInputValueModal: T.func,
  onChangeErrorReglas:      T.func,
  onClickAgregarRegla:      T.func,
  onClickBorrarRegla:       T.func,
  handleChangeRegla:        T.func, 
  redireccionarCofig: T.func,
  cancelarCofigCampos: T.func,
  onClickDeleteStateRegla:T.func,
  agregarReglaTemporal:T.func,
  editarEtapa:T.func,
  // changeEtapaAction:T.func,
  agregarCamposEspecialesEtapa:T.func,
  cerrarClonacion:T.func,
  onClonarEtapa:T.func,
  clonarEtapasPlazas:T.func,
  obtenerCatalogos:T.func,
  onChangeValueCatalogo: T.func,
  enqueueSnackbar: T.func,
  onClickAddStateRegla:T.func,
  onClickPutStateRegla:T.func,
  onChangeSwitchRelacion:T.func,
  onChangeSwitchRelacionaOtro:T.func,
  obtenerNumeroDePuestos:T.func,
  permisos:T.object,
  guardarConfig:T.func,
};

const mapStateToProps = createStructuredSelector({
  configuracionCamposEspeciales: makeSelectConfiguracionCamposEspeciales(),
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

const withReducer = injectReducer({
  key: 'configuracionCamposEspeciales', 
  reducer,
});

const withSaga = injectSaga({ key: 'configuracionCamposEspeciales', saga });
const withActions = Actions.bindReduxStore();
export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
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
    editarEtapa: (props) => (id) =>  {   
      const {
        actions: {
          editarEtapaAction,
          getPlazasHabilitadasAction,
        },
      } = props;
      editarEtapaAction(id)
      getPlazasHabilitadasAction()  
    },
  }),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      handleClickField: (index) => (event) => {
        // console.log('datos al clickear index: ',index,' event: ',event)
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/HANDLE_CHANGE_COMPONENTE_ACTION',
          index,
        });
        event.stopPropagation();
      },
      handleChangeTipo:  (index) => cls => {
        debugger
        const tipo = cls.target.value;
        // const longitud = tipo > 1 ? 0 : 0;
        const valor = tipo > 1 ? [] : '';
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/HANDLE_CHANGE_TIPO_COMPONENTE_ACTION',
          index,
          tipo,
          valor,
          // longitud,
        });
        // onChangeLongitud('0',0,1);
      },
      onChangeTitle: (value,index) =>{
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/HANDLE_CHANGE_TEXT_COMPONENTE_ACTION',
          value,
          index,
        });
      },
      onClickedDelCampo: (nombre,index) => (event) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICKK_COMPONENTE_ACTION',
          index,
          nombre,
        });
        event.stopPropagation();
      },
      onChangeTipoTextoCorto: (value,divSelecionado) => {
        const valor = value;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_TEXT_COMPONENTE_TXTCORTO_ACTION',
          divSelecionado,
          valor,
        });
      },
      onChangeErrorTipo: (errorTipo,index) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERRORTIPO_ACTION',
          index,
          errorTipo,
        });
      },
      onChangeErrorLongitud: (errorLongitud,index) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERRORLONGITUD_ACTION',
          index,
          errorLongitud,
        });
      },
      onChangeErrorOpcion: (errorOpcion,index,indexOpcion) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERROROPCION_ACTION',
          index,
          indexOpcion,
          errorOpcion,
        });
      },
      onChangeErrorComponente: (error,index) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERRORCOMPONENTE_ACTION',
          index,
          error,
        });
      },
      onChangeErrorCantidadArchivos: (errorCantidadArchivos,index) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERROR_CANTIDADARCHIVOS_ACTION',
          index,
          errorCantidadArchivos,
        });
      },
      onChangeErrorTamañoArchivos: (errorTamañoArchivos,index) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERROR_TAMAÑOARCHIVOS_ACTION',
          index,
          errorTamañoArchivos,
        });
      },
      onChangeErrorCatalogo: (errorCatalogo,index) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERROR_CATALOGO_ACTION',
          index,
          errorCatalogo,
        });
      },
      // onChangeErrorCantidadArchivos,
      // onChangeErrorTamañoArchivos,
      // onChangeErrorCatalogo,

      onChangeLongitud: (value,divSelecionado,idTipoComponente) => {
        const valor = value;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_LONGITUD_COMPONENTE_TXTCORTO_ACTION',
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
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_OBLIGATORIO_COMPONENTE_TXTCORTO_ACTION',
          checked,
          divSelecionado,
        });
      },
      onChangeText: (name,valor,divSelecionado) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_TEXT_COMPONENTE_ARCHIVOS_ACTION',
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
            requeridoRelacion: false,
            relacionaOtro: false,
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
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_AGREGAR_COMPONENTE_ACTION',
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
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_AGREGAR_OPCION_LISTA_ACTION',
          opcion,
          divSelecionado,
        });
      },
      onClickedDelete: (divSelecionado,index) => {
        // type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_BORRAR_OPCION_LISTA_ACTION',
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_BORRAR_OPCION_LISTA_ACTION',
          index,
          divSelecionado,
        });
      },
      onChangeTamañosArchivos: (valor,divSelecionado,idTipoComponente) => {
        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONINPUT_TEXT_CARGAR_ARCHIVO_ACTION',
          valor,
          idTipoComponente,
          divSelecionado,
        });
        
      },
      onInputChange: (valor, index, idTipoComponenteId, divSelecionado) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONINPUT_TEXT_LISTA_ACTION',
          valor,
          index,
          divSelecionado,
        });
      },
      onChangeTipoArchivo: (tipoArchivo,divSelecionado) =>{
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_TIPO_ARCHIVO_ACTION',
          tipoArchivo,
          divSelecionado,
        });
      },
      onHandleChangeValueModal: (event,index,reglaSeleccionada) => {
        const nombreComponente = event.target.name;
        const nuevoValor = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_VALOR_COMP_MODAL_ACTION',
          nombreComponente,
          nuevoValor,
          index,
          reglaSeleccionada,
        });
      },


      onHandleChangeInputValueModal: (reglaSeleccionada)=>(index) =>(event) => {
        
        const nombreComponente = event.target.name;
        const nuevoValor = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_VALOR_COMP_MODAL_INPUT_ACTION',
          nombreComponente,
          nuevoValor,
          index,
          reglaSeleccionada,
        });
      },
      onChangeErrorReglas: (regla,reglaSeleccionada,indexRegla) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_VALOR_ERROR_COMP_MODAL_ACTION',
          regla,
          reglaSeleccionada,
          indexRegla,
        });
      },
      onClickAgregarRegla: (reglaSeleccionada) => () =>{
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_AGREGAR_REGLA_ACTION',
          reglaSeleccionada,
        });
      },
      onClickBorrarRegla: (index,reglaSeleccionada) => () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_BORRAR_REGLA_ACTION',
          index,
          reglaSeleccionada,
        });
      },
      handleChangeRegla: (event) => {
        const valor = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_REGLA_ACTION',
          valor,
        });
      },
      redireccionarCofig: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REDIRECCIONAR_CONFIGURACIONES',
        });
      },
      
      cancelarCofigCampos: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/CANCELAR_CAMPOS',
        });
      },
      onClickDeleteStateRegla: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/VACIAR_ESTADO_REGLAS',
        });
      },
      agregarReglaTemporal: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/AGREGAR_REGLA_TEMPORAL',
        });
      },
      onClickAddStateRegla: () => {        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/AGREGAR_REGLAS',
        });
      },
      onClickPutStateRegla: () => {        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/AJUSTAR_REGLAS',
        });
      },
      
      redirigirConfTickets: () => {        
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REDIRIGIR_CONF_TICKETS',
        });
      },
      onClonarEtapa: (array,rows) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/CLONAR_ETAPAS',
          data:array,
          rows,
        });
      },
      cerrarClonacion: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/CERRAR_CLONACION',

        });
      },
      clonarEtapasPlazas: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/CLONAR_ETAPAS_PLAZAS',

        });
      },
      obtenerCatalogos: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/OBTENER_CATALOGOS_ACTION',
        });
      },
      onChangeValueCatalogo: (divSelecionado,index) => event => {
        const {
          name,
          value,
        } = event.target;
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_VALUE_SELECTS_CATALOGOS_SAGA_ACTION',
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
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_OBLIGATORIO_RELACION_ACTION',
          checked,
          divSelecionado,
        });
      },
      onChangeSwitchRelacionaOtro: (divSelecionado) => event => {
        const {
          checked,
        } = event.target;
        // console.log(divSelecionado,"divSelecionado");
        // console.log(checked,"checked");
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_SWITCH_RELACIONA_OTRO_ACTION',
          checked,
          divSelecionado,
        });
      },
      redirigirCamposEspeciales: ()  => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REDIRIGIR_CAMPOS_ESPECIALES',
        });
      },
      desactivarCamposEspeciales: ()  => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/DESACTIVAR_CONF',
        });
      },
      guardarConfig: (componentes) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/GUARDAR_ESPECIALES_PDP',
          componentes,
        })
      },
      ajustarCamposEspeciales: (componentes,IdEtapa,tiempos) => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/AJUSTAR_CAMPOS_ESPECIALES',
          componentes,
          IdEtapa,
          tiempos,
        })
      },
      redirectConf: () => {
        dispatch({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REDIRIGIR_CONF',
        })
      },
     
    }),
  ),
)(ConfiguracionCamposEspeciales);
