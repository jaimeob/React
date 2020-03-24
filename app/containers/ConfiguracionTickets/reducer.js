/* eslint-disable no-plusplus */
/*
 *
 * ConfiguracionTickets reducer
 *
 */

import { fromJS, List } from 'immutable';
import { size, parseInt } from 'lodash';

import { DEFAULT_ACTION } from './constants';
import STATE from './state';

export const initialState = fromJS(STATE);

function configuracionTicketsReducer(state = initialState, action) {
  switch (action.type) {


    case 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_TIPO_COMPONENTE_ACTION':{
      const {
        tipo,
        valor, 
      } = action;

      return state
        .setIn(['configuracion','componentes',action.index,'tipoComponenteId'], tipo)
        .setIn(['configuracion','componentes',action.index,'config','longitud'], '')
        .setIn(['configuracion','componentes',action.index,'config','valor'], valor);  
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_TEXT_COMPONENTE_ACTION':{
      return state
        .setIn(['configuracion','componentes',action.index,'config','nomCampo'], action.value);
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCLICK_COMPONENTE_ACTION':{
      
      const arregloComponentes = state.getIn(['configuracion','componentes']);

      if(size(arregloComponentes) > 1){
        const nuevoArreglo = arregloComponentes.splice(action.index,1);
        const toDo = state
          .setIn(['configuracion','divSelecionado'], 0)
          .setIn(['configuracion','componentes'], nuevoArreglo);
        return toDo;
      }
      return null;
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_COMPONENTE_ACTION':{
      
      const tipo = state.getIn(['configuracion','componentes',action.index,'tipoComponenteId']);
      return state
        .setIn(['configuracion','campoSelecionado'], tipo)
        .setIn(['configuracion','divSelecionado'], action.index);
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCLICK_AGREGAR_COMPONENTE_ACTION':{      
      const arreglo = state.getIn(['configuracion','componentes']);
      const nuevoArreglo = arreglo.push(fromJS(action.componente));
      return state.setIn(['configuracion','componentes'], nuevoArreglo)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_TEXT_COMPONENTE_TXTCORTO_ACTION':{
      return state
        .setIn(['configuracion','componentes',action.divSelecionado,'config','value'], action.valor)
        .setIn(['configuracion','componentes',action.divSelecionado,'config','longitud'], '')
    }
    case 'APP/CONTAINER/CONFIGURACIONTICKETS/INICIALIZAR_ESTADO_ACTION':{
      return state.set('configuracion', initialState.get('configuracion'))
        
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_LONGITUD_COMPONENTE_TXTCORTO_ACTION':{
      const {
        idTipoComponente,
        valor,
        divSelecionado,
      } = action;
      const componenteSeleccionadoArray = state.getIn(['configuracion','componentes',divSelecionado,'config']);
      const componenteSeleccionado =  JSON.parse(JSON.stringify(componenteSeleccionadoArray))
     
      let long = 20;
      let longitudMaxima = "";

      const error = state.getIn(['configuracion','componentes',divSelecionado,'config','error']);
      
      if(parseInt(idTipoComponente,0) === 0){        
        long = componenteSeleccionado.value === 'texto' ? 1000 :  10000000;
        longitudMaxima = "Longitud Maxima 10000000"
      }

      if(parseInt(idTipoComponente,0) === 1){
        long = componenteSeleccionado.value === 'texto' ? 1000 :  10000000;
        longitudMaxima = "Longitud Maxima 10000000"
      }
      // 
      if(parseInt(valor,0) > long){
        return state
          .updateIn(['configuracion','componentes',divSelecionado,'config'],(config) => config.merge({
            error: true,
            helpertext: longitudMaxima,
          }));
      }
      if(error === true && parseInt(valor,0) <= long) {
        return state
          .updateIn(['configuracion','componentes',divSelecionado,'config'],(config) => config.merge({
            error: false,
            helpertext: '',
            longitud: valor,
          }));
      }
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config','longitud'], valor);
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_OBLIGATORIO_COMPONENTE_TXTCORTO_ACTION':{
      return state
        .setIn(['configuracion','componentes',action.divSelecionado,'config','requerido'], action.checked)
        
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_TEXT_COMPONENTE_ARCHIVOS_ACTION':{
      const {
        name,
        divSelecionado,
        valor,
      } = action;
      
      if(name === "tamañoarchivos"){
        return state
          .setIn(['configuracion','componentes',divSelecionado,'config','tamañoarchivos'], valor);
      }
      if(name === "cantidadarchivos"){
        return state
          .setIn(['configuracion','componentes',divSelecionado,'config','cantidadarchivos'], valor);
      }
      return null;
    }
    
    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCLICK_AGREGAR_OPCION_LISTA_ACTION':{
      const {
        divSelecionado,
        opcion,
      } = action;
      const arreglo = state.getIn(['configuracion','componentes',divSelecionado,'config','opciones']);   
      const nuevoArreglo = arreglo.push(fromJS(opcion));
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config','opciones'],nuevoArreglo);
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/VALIDAR_CAMPOS_ACTION':{
      let errorComponente = false;
      let guardar = true;
      
      const arregloConfiguracion = state.getIn(['configuracion'])
      const configuracionTicket = JSON.parse(JSON.stringify(arregloConfiguracion)) 
      // console.log(configuracionTicket,"configuracionTicket ---------------------");
      

      
      // VALIDACIONES ---------
      let stt = state;
      // let stt2 = null;
      const siEtapas =state.getIn(['configuracion','etapasCheck'], action.event)
      // console.log(siEtapas,"siEtapas");
      

      configuracionTicket.componentes.forEach((componente,index) => {
        switch(componente.tipoComponenteId){
          case 0:
            stt = stt.setIn(['configuracion','componentes',index,'config','errorTipo'], configuracionTicket.componentes[index].config.value === "");
            stt = stt.setIn(['configuracion','componentes',index,'config','errorLongitud'], configuracionTicket.componentes[index].config.longitud <=0);
            errorComponente = configuracionTicket.componentes[index].config.value === ""
                           || configuracionTicket.componentes[index].config.longitud <=0
            break;
          case 1:
            stt = stt.setIn(['configuracion','componentes',index,'config','errorTipo'], configuracionTicket.componentes[index].config.value === "");
            stt = stt.setIn(['configuracion','componentes',index,'config','errorLongitud'], configuracionTicket.componentes[index].config.longitud <=0);
            errorComponente = configuracionTicket.componentes[index].config.value === ""
            || configuracionTicket.componentes[index].config.longitud <=0
            break;
          case 2:
            // eslint-disable-next-line no-return-assign
            componente.config.opciones.map((opt,indexOpcion) => (
              stt = stt.setIn(['configuracion','componentes',index,'config','opciones',indexOpcion,'error'], opt.value.trim() ==="")    
            ))
            errorComponente = componente.config.opciones.filter((opt) => opt.value.trim() === "").length > 0; 
            break;
          case 3:
            // eslint-disable-next-line no-return-assign
            componente.config.opciones.map((opt,indexOpcion) => (
              stt = stt.setIn(['configuracion','componentes',index,'config','opciones',indexOpcion,'error'], opt.value.trim() ==="")    
            ))
            errorComponente = componente.config.opciones.filter((opt) => opt.value.trim() === "").length > 0;
            break;
          case 4:
            // eslint-disable-next-line no-return-assign
            componente.config.opciones.map((opt,indexOpcion) => (
              stt = stt.setIn(['configuracion','componentes',index,'config','opciones',indexOpcion,'error'], opt.value.trim() ==="")    
            ))
            errorComponente = componente.config.opciones.filter((opt) => opt.value.trim() === "").length > 0;
            break;
          case 5:
            stt = stt.setIn(['configuracion','componentes',index,'config','error'], configuracionTicket.componentes[index].config.cantidadarchivos<=0);
            stt = stt.setIn(['configuracion','componentes',index,'config','error2'], configuracionTicket.componentes[index].config.tamañoarchivos<=0);
            errorComponente = configuracionTicket.componentes[index].config.cantidadarchivos<=0 
                          || configuracionTicket.componentes[index].config.tamañoarchivos<=0;
            break;
          case 6:
            stt = stt.setIn(['configuracion','componentes',index,'config','error'], configuracionTicket.componentes[index].config.valorNumero<=0);
            errorComponente = configuracionTicket.config.valorNumero<=0;
            break;

          // componentes[campoSelecionado].config.opciones.map((opt,index) => (
          //   error = true,
          //   ))
          default:
            errorComponente = true;
            break;
        }
        // Si hay algun error no dejara guardar
        if (errorComponente){
          guardar=false
        }

        stt = stt.setIn(['configuracion','componentes',index,'config','colorearBorde'], errorComponente);
      })
      console.log(configuracionTicket,"configuracionTicket ----------------------------------------");
      
      if(configuracionTicket.selectionTipo === 1 && !siEtapas ){
        return stt.setIn(['configuracion','camposInvalidos'],true)
          .setIn(['configuracion','errores','errorPriorizador'], configuracionTicket.selectionPrioriza.trim() === "")
        // .setIn(['configuracion','errores','errorCierreRespuesta'], configuracionTicket.selectionCierreRespuesta <=0)
      }

      if(configuracionTicket.selectionServicio.trim() === "" || configuracionTicket.selectionTiempoRespuesta <=0 
        || configuracionTicket.selectionCierreRespuesta <=0  || !guardar){
     
        return stt.setIn(['configuracion','camposInvalidos'],true)
          .setIn(['configuracion','errores','errorServicio'], configuracionTicket.selectionServicio.trim() === "")
          .setIn(['configuracion','errores','errorTiempoRespuesta'], configuracionTicket.selectionTiempoRespuesta <=0)
          .setIn(['configuracion','errores','errorCierreRespuesta'], configuracionTicket.selectionCierreRespuesta <=0)
      }
            
      return stt.setIn(['configuracion','camposInvalidos'],false)
        .setIn(['configuracion','errores','errorServicio'], configuracionTicket.selectionServicio.trim() === "")
        .setIn(['configuracion','errores','errorTiempoRespuesta'], configuracionTicket.selectionTiempoRespuesta <=0)
        .setIn(['configuracion','errores','errorCierreRespuesta'], configuracionTicket.selectionCierreRespuesta <=0)

    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCLICK_BORRAR_OPCION_LISTA_ACTION':{
      const {
        divSelecionado,
        index,
      } = action;
      const arreglo = state.getIn(['configuracion','componentes',divSelecionado,'config','opciones']);
      const nuevoArreglo = arreglo.splice(index,1);
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config','opciones'],nuevoArreglo);
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONINPUT_TEXT_LISTA_ACTION':{
      const {
        index,
        divSelecionado,
        valor,
      } = action;

      // eslint-disable-next-line no-unused-vars
      const jala = state.getIn(['configuracion','componentes',divSelecionado,'config','opciones',index,'value']);
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config','opciones',index,'value'],valor);
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONINPUT_TEXT_CARGAR_ARCHIVO_ACTION':{
      
      const {
        valor,
        divSelecionado,
        idTipoComponente,
      } = action;
      
      let long = 0;
      let longitudMaxima = "";
      
      if(parseInt(idTipoComponente,0) === 0){
        long = 5;
        longitudMaxima = "Cantidad Maxima 5"
      }
  
      if(parseInt(idTipoComponente,0) === 1){
        long = 100;
        longitudMaxima = "Tamaño Maximo 100"
      }
      
      if(idTipoComponente === 0 && valor > long){
        return state
          .setIn(['configuracion','componentes',divSelecionado,'config','error'], true)
          .setIn(['configuracion','componentes',divSelecionado,'config','helpertext'], longitudMaxima);
      }

      const error = state.getIn(['configuracion','componentes',divSelecionado,'config','error']);

      if (idTipoComponente === 0 && error === true && valor <= long) {
        return state
          .setIn(['configuracion','componentes',divSelecionado,'config','error'], false)
          .setIn(['configuracion','componentes',divSelecionado,'config','helpertext'], '')
          .setIn(['configuracion','componentes',divSelecionado,'config','cantidadarchivos'], valor);
      }

      if(idTipoComponente === 1 && valor > long){
        return state
          .setIn(['configuracion','componentes',divSelecionado,'config','error2'], true)
          .setIn(['configuracion','componentes',divSelecionado,'config','helpertext2'], longitudMaxima);
      }
  
      const error2 = state.getIn(['configuracion','componentes',divSelecionado,'config','error2']);
      
      if(idTipoComponente === 1 && error2 === true && valor <= long) {
        return state
          .setIn(['configuracion','componentes',divSelecionado,'config','error2'], false)
          .setIn(['configuracion','componentes',divSelecionado,'config','helpertext2'], '')
          .setIn(['configuracion','componentes',divSelecionado,'config','tamañoarchivos'], valor);
      }
        
      if(idTipoComponente === 0 && !error){
        return state
          .setIn(['configuracion','componentes',divSelecionado,'config','cantidadarchivos'], valor);
      }
      if(idTipoComponente === 1 && !error2){
        return state
          .setIn(['configuracion','componentes',divSelecionado,'config','tamañoarchivos'], valor);
      }

      return null;
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_TIPO_ARCHIVO_ACTION':{
      const {
        divSelecionado,
        tipoArchivo,
      } = action;
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config','tipoArchivo'],tipoArchivo);
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_NOMBRE_SERVICIO':{
      return state.setIn(['configuracion','selectionServicio'], action.event)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_TIPO_SERVICIO':{
      return state.setIn(['configuracion','selectionTipo'], action.event)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_TIPOS_SERVICIOS':{  
      const etapas = state.getIn(['configuracion','etapas']);
      const etapasArray = JSON.parse(JSON.stringify(etapas))
      
      if(etapasArray.length > 0){
        return state.setIn(['configuracion','servicioTipos'], action.tipoServicios.data)
          .setIn(['configuracion','etapasCheck'], true)
      }
      return state.setIn(['configuracion','servicioTipos'], action.tipoServicios.data)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_SERVICIO':{ 
      if(action.event === 2){
        return state.setIn(['configuracion','selectionTipo'], action.event)
          .setIn(['configuracion','etapasCheck'], false)
          .setIn(['configuracion','seguimiento'], true)
      }
      return state.setIn(['configuracion','selectionTipo'], action.event)
    }
    

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_DEPARTAMENTOS':{          
      return state.setIn(['configuracion','servicioDepartamentos'], action.departamentos.data)
    }


    case 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_DEPARTAMENTOS':{   
      // console.log(action,'ACCION DEL COMBO');
             
      return state.setIn(['configuracion','selectionDepartamento'], [{value:action.event,label:action.label}])
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_PRIORIZADORES':{ 
              
      return state.setIn(['configuracion','servicioPrioriza'], action.priorizadores.data)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_PUESTOS':{          
      return state.setIn(['configuracion','servicioPuestos'], action.puestos.data)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_PRIORIZADOR':{  
      return state.setIn(['configuracion','selectionPrioriza'], action.event)
        .setIn(['configuracion','selectionPuesto'], '')
        .setIn(['configuracion','autorizacion'], false)
        .setIn(['configuracion','etapas'], [])
        .setIn(['configuracion','etapasCheck'], false)
        .setIn(['configuracion','errores','errorPriorizador'],false)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_PERMISOS':{
      return state.setIn(['configuracion','selectionPermisosPuesto'], action.event)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_PUESTO':{  
      return state.setIn(['configuracion','selectionPuesto'], action.event)
        .setIn(['configuracion','selectionPrioriza'], '')
        .setIn(['configuracion','autorizacion'], true)
    }


    case 'APP/CONTAINER/CONFIGURACIONTICKETS/REDIRECT_ETAPAS':{  
      return state.setIn(['configuracion','redirect'], true)
    }
    case 'APP/CONTAINER/CONFIGURACIONTICKETS/CHANGE_REDIRECT': {
      return state.set('redirect', !state.get('redirect'))
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/CHECK_ETAPAS': {      
      return state.setIn(['configuracion','etapasCheck'], action.event)
        .setIn(['configuracion','selectionPrioriza'], '')
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/CHECK_SEGUIMIENTO': {
      return state.setIn(['configuracion','seguimiento'], action.event)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/CHECK_AUTORIZACION': {
      return state.setIn(['configuracion','autorizacion'], action.event)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_ETAPAS': {
      if(action.datosEtapas){  
        return state.setIn(['configEtapas'], action.datosEtapas.confEtapas)
          .setIn(['configuracionCampos'], action.datosEtapas.configuracionCampos)
          .setIn(['configuracion','etapas'], action.datosEtapas.etapasTemporales)
          .setIn(['configuracion','etapasParaBorrar'], action.datosEtapas.datosEtapasBorradas)
      }
      // return state
      
      // eslint-disable-next-line no-unreachable
      const permisos  = []
      action.ticket.permisos.forEach((item) => { 
        permisos.push(item.IdPuesto)
      })
      // action.ticket.etapas.forEach((etapa) => {
      //   etapa.IdDependencia -=1
      //   if(etapa.IdDependencia  < 0){
      //     etapa.IdDependencia = ""
      //   }
      // })
      // debugger
      return state.updateIn(['configuracion'], (configuracion) => configuracion.merge({
        // Activo: action.datos.ticket,
        componentes: action.ticket.tipoForma,
        selectionServicio: action.ticket.nombre,
        selectionTipo: action.ticket.idTipo,
        selectionDepartamento: action.ticket.idDepartamento,
        selectionPrioriza: action.ticket.idPriorizador,
        selectionPuesto: action.ticket.idPuesto,
        autorizacion: action.ticket.Autorizacion,
        seguimiento: action.ticket.Seguimiento,
        etapas: action.ticket.etapas,
        idPlantilla: action.ticket.IdPlantilla ? action.ticket.IdPlantilla : "",
        selectionCierreRespuesta: action.ticket.cierreRespuesta,
        selectionTiempoRespuesta:action.ticket.tiempoRespuesta,
        selectionPermisosPuesto: permisos,
        servicioDepartamentos: action.ticket.servicioDepartamentos,
        servicioPrioriza: action.ticket.servicioPrioriza,

      }))
      // .setIn(['configuracion, selectionDepartamento'],action.datos.ticket.idDepartamento)
      // .setIn(['configuracion, selectionPrioriza'],action.datos.ticket.idPriorizador)
    
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/REDIRIGIR_LISTADOTICKETS': {
      return state.setIn(['stepper'],1).set('configuracion', initialState.get('configuracion'))
    }
    
    case 'APP/CONTAINER/CONFIGURACIONTICKETS/CHANGE_STEPER': {      
      return state.setIn(['stepper'],0)
    }

    

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/AGREGAR_ESTADO_TICKET': {      
      return state
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SUMAR_HORAS_SLA': { 
      const etapas = state.getIn(['configuracion','etapas']);
      const etapasArray = JSON.parse(JSON.stringify(etapas)) 
      
      
      let sumar = 0;
      etapasArray.forEach((item) => { 
        item.tiempos.forEach((tiempo) => { 
          sumar+=  tiempo.SLA
        })
      }) 
      return state.setIn(['configuracion','selectionTiempoSLA'],sumar)
        .setIn(['configuracion','selectionTiempoRespuesta'],sumar)
        
    }
    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_TIEMPO_CIERRE': {      
      return state.setIn(['configuracion','selectionCierreRespuesta'], action.event)
    }
    

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_TIEMPO_RESPUESTA': {  
      return state.setIn(['configuracion','selectionTiempoRespuesta'], action.event)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_TIPO_RESPUESTA': {  
      return state.setIn(['configuracion','tipoTiempoRespuesta'], action.event)
    }


    case 'APP/CONTAINER/CONFIGURACIONTICKETS/CHANGE_TIPO_RESPUESTA': {  
      return state.setIn(['configuracion','tipoCierreRespuesta'], action.event)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/CANCELAR_CAMPOS': {
      return state.setIn(['stepper'],1).set('configuracion', initialState.get('configuracion'))
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_CATALOGOS_ACTION':{
      return state
        .setIn(['configuracion', 'arrCatalogos'], List(action.data))
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_VALUE_SELECTS_CATALOGOS_ACTION':{
      const {
        value,
        divSelecionado,
        data,
      } = action;
      const arr = JSON.parse(JSON.stringify(data))
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config', 'valorNumero'], fromJS(value))
        .setIn(['configuracion','componentes',divSelecionado,'config', 'relaciones'], List(arr))
    }
    
    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_OBLIGATORIO_RELACION_ACTION':{
      return state
        .setIn(['configuracion','componentes',action.divSelecionado,'config','requeridoRelacion'], action.checked);
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_SWITCH_RELACIONA_OTRO_ACTION':{
      return state
        .setIn(['configuracion','componentes',action.divSelecionado,'config','relacionaOtro'], action.checked);
    }
    //--------------------------------------------------------------------------------------
    case 'APP/CONTAINER/CONFIGURACIONTICKETS/REDIRGIR_CAMPOS_ESPECIALES': { 
      return state.setIn(['configuracion','redirectCamposEspeciales'],true)
    }

    case 'APP/CONTAINER/CONFIGURACIONTICKETS/DESACTIVAR_SALIR_CONFIG': { 
      return state.setIn(['configuracion','redirectCamposEspeciales'],false)
    }
    

    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default configuracionTicketsReducer;
