/* eslint-disable no-case-declarations */
/*
 *
 * Tableros reducer
 *
 */
// import { stat } from 'fs';
import { fromJS, List } from 'immutable';
import { isArray, parseInt, compact} from 'lodash';
import moment from 'moment'
import Actions from './actions';
import STATE from './state';
import { log } from 'util';

export const initialState = fromJS(STATE);

function validarRequerido(state, opc){
  let band= false;
  const requerido = state.get('tipoForma').map((datos) => {
    band = false;
    const data = JSON.parse(JSON.stringify(datos));
    if(data.config.requerido && (data.config.valor === '' || (Array.isArray(data.config.valor) && data.config.valor.every(valor => valor === '')))){
      band = true;
      data.config.isComplete = false;
    }
    return opc ? fromJS(data) : band;
  });
  return opc ? requerido : JSON.parse(JSON.stringify(requerido)).some((data) => data)
}


export const {
  DEFAULT,
  CHANGE_MENU,
  HANDLE_CHANGE_TAB,
  HANDLE_CHANGE_TAB_DETAILS,
  TOGGLE_TIPO_TICKET,
  TICKET_SELECT,
  ON_CLICKED_TICKET_SELECTED,
  HANDLE_CHANGE_DEPARTAMENTO,
  GENERAR_TICKET,
  HANDLE_CHANGE_CHECKBOX,
  REQ_TICKETS_COMENTARIOS_SUCCESS,
  REQUEST_DEPARTAMENTOS,
  REQUEST_DEPARTAMENTOS_PLANTILLAS,
  HANDLE_CHANGE_PLANTILLA,
  HANDLE_CHANGE_COMPONENT,
  HANDLE_CHANGE_INPUT_FILE,
  SET_TICKETS,
  ON_CHANGE_TEXT_FIELD_ESCRIBIR_MENSAJE,
  SET_COMPONENT_MOUNTED,
  SET_TABLA_MOUNTED,
  SET_MENSAJES_CHAT,
  DISABLED_SEND_TICKET,
  DELETE_FILE,
  SET_TICKETS_TABLA,
  SET_TICKET,
  CERRAR_MODAL,
  SET_IMAGEN_AVATAR,
  SET_INDICE_ETAPA,
} = Actions.getConstants();
const pref = 'APP/CONTAINER/TABLEROS/';

function tablerosReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT: {
      return initialState;
    }
    case CHANGE_MENU: {
      const mensaje = action.id ? 'Mis Mensajes' : 'Mis Tickets';
      const toggle = action.id ? 0 : 1;
      const titulo = action.id ? 'Bandeja de Difusiones' : 'Bandeja de Tickets';
      return state.merge({
        selected: {
          isMensaje: action.id,
          text: action.id !== -1 ? mensaje : '', 
          bandejaText: action.id === -1 ? 
            'Consulta de Tickets' : 
            titulo,
          isToggle: action.id !== -1 ? toggle : action.id,
        },
        bandejaTickets: initialState.get('bandejaTickets'),
      });
    }

    case HANDLE_CHANGE_TAB: {
      const newState = state
        .setIn(
          ['bandejaTickets','tabSelected'], 
          parseInt(action.id)
        );
      return newState
        .setIn(
          ['bandejaTickets', 'tipoSelected'], 
          -1
        );
    }

    case HANDLE_CHANGE_TAB_DETAILS: {
      return state
        .setIn(
          ['bandejaTickets', 'tabSelectedDetails'], 
          parseInt(action.id)
        );
    }

    case TOGGLE_TIPO_TICKET: {
      const toggled = state
        .getIn(
          ['bandejaTickets', 'tickets', action.indice, 'toggled']
        );
      return state.setIn(
        ['bandejaTickets', 'tickets', parseInt(action.indice), 'toggled'],
        parseInt(action.id ) === toggled ? -1 : parseInt(action.id));
    }
    case TICKET_SELECT: {
      return (
        state.setIn(['bandejaTickets', 'tipoContenedor'], 2)
      );
    }

    case ON_CLICKED_TICKET_SELECTED: {   

      const rutaTicket = [
        'bandejaTickets', 
        'tickets', 
        action.cIndex, 
        'tickets', 
        action.index,
      ];
      const newState = state
        .setIn(
          ['bandejaTickets', 'tipoContenedor'], 
          action.idConteiner
        )
        .setIn(
          ['bandejaTickets', 'ticketSelected'], 
          state
            .getIn(rutaTicket)
        );

      return newState
        .updateIn(['bandejaTickets'],(bandejaTcks) => bandejaTcks.merge({
          idTicketSelected: parseInt(action.idTicket),
          EstatusTicketSelected: action.IdTipoEstatus,
          tabSelectedDetails: 0,
          empleadoAsignado:'',
          prioridadAsignada:0,
          indiceEtapaSeleccionado:action.index,
        }))
    }

    case HANDLE_CHANGE_DEPARTAMENTO: {
      
      return state
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'departamento'], 
          action.event
        )
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'plantilla'], 
          {}
        )
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'plantillaSelected', 'id'], 
          ''
        );
    }
    case GENERAR_TICKET: {
      return state.setIn(['bandejaTickets', 'tipoContenedor'], 1)
    }
    case HANDLE_CHANGE_CHECKBOX: {
      const rutaChecked = [
        'bandejaTickets', 
        'ticketsDetails', 
        'plantilla', 
        action.event.pIndex, 
        'opciones', 
        action.event.cIndex, 
        'isChecked',
      ];
      return state
        .setIn(
          rutaChecked, 
          !action.event.opcion
        ); 
    }
    case REQ_TICKETS_COMENTARIOS_SUCCESS: {
      const {
        data,
      } = action;
      const updatedBandeja = state
        .updateIn(
          ['bandejaTickets', 'ticketsDetails'], 
          (detail) => detail.merge(
            fromJS({
              chatMounted: true,
              mensajes: data,
            })
          ));
      return updatedBandeja;
    }
   
    case REQUEST_DEPARTAMENTOS: {
      return state
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'departamentos'], 
          List(action.datos)
        );
    }
    case REQUEST_DEPARTAMENTOS_PLANTILLAS: {
      return state
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'plantillas'], 
          fromJS(action.datos)
        );
    }
    case HANDLE_CHANGE_PLANTILLA: {
      const plantilla = state
        .getIn(
          ['bandejaTickets', 'ticketsDetails', 'plantillas', action.event.id]
        );
      const newState = state
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'plantilla'], 
          plantilla
        );
      const nexState = newState
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'plantilla', 'isComplete'], 
          true
        )
      return nexState
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'plantillaSelected', 'id'], 
          action.event.id
        );
    }
    case HANDLE_CHANGE_COMPONENT: {
      const {
        index,
        valor,
        campoIndex,
      } = action;
      const PATH = [
        'bandejaTickets',
        'ticketsDetails',
        'plantilla',
        'tipoForma',
        index,
        'config',
        'valor',
      ];  

      const rutaConf = [
        'bandejaTickets', 
        'ticketsDetails', 
        'plantilla', 
        'tipoForma', 
        index, 
        'config',
      ];

      const rutaComplete = [
        'bandejaTickets', 
        'ticketsDetails', 
        'plantilla', 
        'tipoForma', 
        index, 
        'config', 
        'isComplete',
      ];

      const arreglo = JSON.parse(JSON.stringify(state.getIn(PATH)));
      if(campoIndex !== -1)
        arreglo[campoIndex] =arreglo[campoIndex] ? '' : valor;
      const newState = campoIndex === -1 ? state.setIn(PATH, valor) : 
        state.setIn(PATH, List(arreglo));
        
      const plantilla = JSON.parse(JSON.stringify(newState.getIn(rutaConf)));
      const requerido = !(plantilla.requerido && 
        (plantilla.valor === '' || 
          (Array.isArray(plantilla.valor) && 
          plantilla.valor.every(val => val === ''))
        )
      );
      const nextState = newState
        .setIn(rutaComplete, requerido);
        
      const showError = validarRequerido(newState
        .getIn(
          ['bandejaTickets', 'ticketsDetails', 'plantilla']
        ), 0);
      return nextState
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'plantilla', 'showError'], 
          showError
        );
    }
    case HANDLE_CHANGE_INPUT_FILE: {
      const PATH = [
        'bandejaTickets',
        'ticketsDetails',
        'plantilla',
        'tipoForma',
        action.index,
        'config',
        'valor',
      ];
      
      const rutaFile = [
        'bandejaTickets', 
        'ticketsDetails', 
        'plantilla', 
        'tipoForma', 
        action.index, 
        'config', 
        'files',
      ];

      const rutaConfig = [
        'bandejaTickets', 
        'ticketsDetails', 
        'plantilla', 
        'tipoForma', 
        action.index, 
        'config',
      ];

      const rutaComplete  = [
        'bandejaTickets', 
        'ticketsDetails', 
        'plantilla', 
        'tipoForma', 
        action.index, 
        'config', 
        'isComplete',
      ];

      const newState = state.setIn(PATH, action.arreglo);
      const nextState = newState.setIn(rutaFile, action.formData)
      const plantilla = JSON.parse(JSON.stringify(nextState.getIn(rutaConfig)));
      const requerido = !(plantilla.requerido && (plantilla.valor === '' || 
        (Array.isArray(plantilla.valor) 
          && plantilla.valor.every(val => val === '')
        )));
      const lastState = nextState.setIn(rutaComplete, requerido);
      const showError = validarRequerido(newState.getIn(
        ['bandejaTickets', 'ticketsDetails', 'plantilla']
      ));
      return lastState.setIn(
        ['bandejaTickets', 'ticketsDetails', 'plantilla', 'showError'], 
        showError
      )
    }

    case SET_TICKETS: {
      const listadoTickets = state.get('listadoTickets');
      const numUsuarioLogeado = state.get('numUsuarioLogeado');
      const nomUsuarioLogeado = state.get('nomUsuarioLogeado');
      const imagenAvatar = state.get('imagenAvatar');
      const idDepartamentoLogeado = state.get('idDepartamentoLogeado');
      const idRolUsuarioLogeado = state.get('idRolUsuarioLogeado');
      const plazaUsuarioLogeado = state.get('plazaUsuarioLogeado');
      const selected = state.get('selected');
      const navBandejaTickets = state.get('navBandejaTickets');
      const avatar = state.get('imagenAvatar');
      let newState;
      
      if(action.ticket.length > 0){
        newState = state
          .setIn(['bandejaTickets', 'ticketSelected'], action.ticket[0])
          .setIn(['bandejaTickets', 'tipoContenedor'], 2)
          .setIn(
            ['bandejaTickets', 'EstatusTicketSelected'], 
            action.ticket[0].IdEstatus
          )
          .setIn(['bandejaTickets', 'tickets'], fromJS(action.data))
          .setIn(['bandejaTickets', 'tickets', 1, 'toggled'], 3);
      } else {        
        newState = state
          .merge(initialState)
          .setIn(['bandejaTickets', 'tickets'], fromJS(action.data))
          .set('imagenAvatar', avatar)
          ;
      }
      const nextState = newState
        .set('selected', selected)
        .set('listadoTickets', listadoTickets)
        .set('navBandejaTickets',navBandejaTickets)
        .set('numUsuarioLogeado', numUsuarioLogeado)
        .set('imagenAvatar', imagenAvatar)
        .set('idDepartamentoLogeado', idDepartamentoLogeado)
        .set('nomUsuarioLogeado', nomUsuarioLogeado)
        .set('idRolUsuarioLogeado', idRolUsuarioLogeado)
        .set('plazaUsuarioLogeado', plazaUsuarioLogeado);
      return nextState.setIn(['bandejaTickets' ,'tabSelected'], action.tipo);
    }

    case ON_CHANGE_TEXT_FIELD_ESCRIBIR_MENSAJE:

      const mensaje = state.getIn(['bandejaTickets', 'ticketsDetails', 'mensajeValue']);

      const textoMensaje = JSON.parse(JSON.stringify(mensaje));

      const texto = textoMensaje === '' ? action.mensaje.toUpperCase() : action.mensaje

      
      return state
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'mensajeValue'], 
          texto
        )
    
    case SET_COMPONENT_MOUNTED: 
      return state.set('mounted' , !state.get('mounted'));

    case SET_TABLA_MOUNTED:
      return state.set('tablaMounted', !state.get('tablaMounted'))
    
    case `${pref}REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION_SUCCESS`: {
      return state
        .updateIn(
          ['bandejaTickets','ticketsDetails'],
          (ticketsDet) => 
            ticketsDet.merge({
              mensajeValue: "",
              urlFile: "",
              valueTextModal: "",
              openModal: false,
              dataBlop: "",
            })
        );
      
      // return state.setIn(['bandejaTickets', 'ticketsDetails', 'mensajeValue'], "");
    }


    
    case `${pref}POST_INSERT_FILES_COMENTARIOS_ACTION_SUCCESS`: {
      return state.setIn(['bandejaTickets', 'ticketsDetails', 'urlFile'], action.data);
    }
    case `${pref}OPEN_MODAL_ACTION`: {
      return state
        .setIn(['bandejaTickets','ticketsDetails', 'openModal'], action.data)
        .setIn(['bandejaTickets','ticketsDetails', 'tipoJustificacion'], action.tipo)
    }
    case `${pref}CLOSE_MODAL_ACTION`: {
      return state.setIn(['bandejaTickets','ticketsDetails', 'openModal'], action.data);
    }
    case `${pref}CHANGE_TEXT_MODAL_ACTION`: {
      return state.setIn(['bandejaTickets','ticketsDetails', 'valueTextModal'], action.data);
    }
    case `${pref}GUARDAR_IMG_ACTION`: {
    
      return state.setIn(['bandejaTickets','ticketsDetails', 'dataBlop'], action.data);
    }

    case `${pref}SET_OBTENER_EMPLEADOS_ASIGNAR_A_SUCCESS_ACTION`: {
      return state.setIn(['bandejaTickets','empleadosAsignarA' ], action.dataApi);
    }

    case `${pref}SET_OBTENER_PRIORIDADES_ASIGNAR_A_SUCCESS_ACTION`: {
      return state.setIn(['bandejaTickets','prioridades' ], action.dataApi);  
    }

    case `${pref}ASIGNAR_EMPLEADO_ACTION`: {
      return state.setIn(['bandejaTickets','empleadoAsignado' ], action.data);  
    }

    case `${pref}ASIGNAR_PRIORIDAD_ACTION`: {
      return state.setIn(['bandejaTickets','prioridadAsignada' ], action.data);  
    }

    case `${pref}ASIGNAR_TOTAL_TICKETS_DIFUSIONES_ACTION`: {
      return state.updateIn(['navBandejaTickets'],(bandeja) => bandeja.merge({
        totalTickets : action.TotalTickets,
        totalDifusiones : action.TotalDifusiones,
      }));
    }

    case SET_MENSAJES_CHAT: {
      // return state.updateIn(['bandejaTickets','ticketsDetails'],(bandeja) => bandeja.merge({
      //   totalTickets : action.TotalTickets,
      //   totalDifusiones : action.TotalDifusiones,
      // }));
      // return state.setIn(['bandejaTickets','ticketsDetails','mensajes' ], action.data);
      const {
        data,
      } = action;
      
      const updatedBandeja = state
        .updateIn(['bandejaTickets', 'ticketsDetails'], (detail) => 
          detail.merge(
            fromJS({
              chatMounted: true,
              mensajes: isArray(data) ? data.slice() : data,
            })
          )
        );
      return updatedBandeja;
    }
    case DISABLED_SEND_TICKET: {
      const newState = state
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'plantilla', 'showError'], 
          true
        );
      const plantilla = state
        .getIn(['bandejaTickets', 'ticketsDetails', 'plantilla']);
      const plantillaError = validarRequerido(plantilla, 1);
      return newState
        .setIn(
          ['bandejaTickets', 'ticketsDetails', 'plantilla', 'tipoForma'], 
          fromJS(plantillaError)
        );
    }

    case DELETE_FILE:{
      const PATH = [
        'bandejaTickets',
        'ticketsDetails',
        'plantilla',
        'tipoForma',
        action.cIndex,
        'config',
        'valor',
      ];
      const arreglo = state
        .getIn(PATH);
      let newArreglo = arreglo.map((file, index) => 
        index !== action.id ? file : null)
      newArreglo = compact(newArreglo);
      return state.setIn(PATH, newArreglo);
    }
    case SET_TICKETS_TABLA: {
      const navBandejaTickets = state.get('navBandejaTickets');

      const numUsuarioLogeado = state.get('numUsuarioLogeado');
      const nomUsuarioLogeado = state.get('nomUsuarioLogeado');
      const imagenAvatar = state.get('imagenAvatar');
      const idDepartamentoLogeado = state.get('idDepartamentoLogeado');
      const idRolUsuarioLogeado = state.get('idRolUsuarioLogeado');
      const plazaUsuarioLogeado = state.get('plazaUsuarioLogeado');


      return initialState
        .setIn(['listadoTickets', 'data'], fromJS(action.data.data[0]))
        .setIn(['listadoTickets', 'headers'], fromJS(action.data.headers))
        .set('navBandejaTickets', navBandejaTickets)
        .set('numUsuarioLogeado', numUsuarioLogeado)
        .set('imagenAvatar', imagenAvatar)
        .set('idDepartamentoLogeado', idDepartamentoLogeado)
        .set('nomUsuarioLogeado', nomUsuarioLogeado)
        .set('idRolUsuarioLogeado', idRolUsuarioLogeado)
        .set('plazaUsuarioLogeado', plazaUsuarioLogeado)
    }

    case SET_TICKET: {
      const newState = state
        .setIn(['bandejaTickets', 'tipoContenedor'], 2)
        .setIn(['bandejaTickets', 'ticketSelected'], action.data[0])
      const nextState = newState
        .merge({
          selected: {
            isMensaje: 0, 
            text: 'Mis Tickets', 
            bandejaText : 'Bandeja de Tickets',
            isToggle: 1,
          },
        });
      return nextState
        .updateIn(['bandejaTickets'],(bandejaTcks) => bandejaTcks.merge({
          idTicketSelected: parseInt(action.data[0].IdTicket),
          EstatusTicketSelected: parseInt(action.data[0].IdEstatus),
          tabSelectedDetails: 0,
          empleadoAsignado:'',
          prioridadAsignada:0,
        }))
    }
    case CERRAR_MODAL : {
      return state.set('modal', !state.get('modal'))
    }
    case SET_IMAGEN_AVATAR: {
      return state.set('imagenAvatar', action.data[0].Ruta);  
      // return initialState
      //   .setIn(['listadoTickets', 'data'], fromJS(action.data.data[0]))
    }
    
    case 'APP/CONTAINER/TABLEROS/SET_ITEMS_CATALOGOS_ACTION':{
      
      const {
        data,
        indice,
        cambioA,
        value,
        idxCatalogoPadre,
        indiceEtapa,
        idxCatalogo,
        from,
      } = action;


      const arr = JSON.parse(JSON.stringify(data[0]))
      let newState = "";
      if(cambioA === 'propio'){
        if(from === 'DPE'){
          newState = state
            .setIn(['bandejaTickets','ticketSelected','etapas',indiceEtapa,'configuracion',idxCatalogo,'config','itemsCatalogo'],fromJS(arr))
            .setIn(['bandejaTickets','ticketSelected','etapas',indiceEtapa,'configuracion',idxCatalogoPadre,'config','value'],fromJS(value))
        }else{
          newState = state
            .setIn(['bandejaTickets','ticketsDetails','plantilla','tipoForma',indice,'config','itemsCatalogo'], fromJS(arr))
            .setIn(['bandejaTickets','ticketsDetails','plantilla','tipoForma',indice,'config','value'], fromJS(''))
            .setIn(['bandejaTickets','ticketsDetails','plantilla','tipoForma',idxCatalogoPadre,'config','value'], fromJS(value))
        }
      }
      return newState;
    }
    case 'APP/CONTAINER/TABLEROS/CAMBIAR_VALOR_CATALOGOS_ACTION':{
      const {
        value,
        idxCatalogo,
        indiceEtapa,
        from,
      } = action;
      let newState = "";
      
      if(from === 'DPE')
        newState = state.setIn(['bandejaTickets','ticketSelected','etapas',indiceEtapa,'configuracion',idxCatalogo,'config','value'],fromJS(value))
      if(from === 'DP')
        newState = state.setIn(['bandejaTickets','ticketsDetails','plantilla','tipoForma',idxCatalogo,'config','value'], fromJS(value))
      
      return newState
    }

    case 'APP/CONTAINER/TABLEROS/SET_RELACIONES_CATALOGOS_ACTION':{
      const {
        idxCatalogo,
        data,
      } = action;
      const {
        SP: sp,
        Parametros: parametros,
        Para: para,
        ParaNombre: paraNombre,
        Desde: desde,
        DesdeNombre: desdeNombre,
      } = data[0];

      const info = {
        sp,
        parametros,
        para,
        paraNombre,
        desde,
        desdeNombre,
      };

      return state
        .setIn(['bandejaTickets','ticketsDetails','plantilla','tipoForma',idxCatalogo,'config','relaciones'], fromJS(info));
    }

    case `${pref}TAB_ETAPAS_SELECT`: {
      return state.setIn(['bandejaTickets','tabEtapas' ], !action.event);  
    }

    case  'APP/CONTAINER/TABLEROS/SET_ETAPAS': {

      return state.setIn(['bandejaTickets' ,'ticketSelected','etapas'], fromJS(action.data))
        .setIn(['bandejaTickets', 'segundos'],0)
    }

    case 'APP/CONTAINER/TABLEROS/CAMBIAR_VALOR_CAMPOS_ESPECIALES_BANDEJA_ACTION':{
      
      return state
        .setIn(['bandejaTickets','ticketSelected','etapas',action.indiceEtapa,'configuracion',action.indice,'config','valor'], fromJS(action.value))
    }

    case 'APP/CONTAINER/TABLEROS/CAMBIAR_VALOR_CHECKBOX_CAMPOS_ESPECIALES_BANDEJA_ACTION':{
      
      const PATH = action.from === 'check' ? [
        'bandejaTickets',
        'ticketSelected',
        'etapas',
        action.indiceEtapa,
        'configuracion',
        action.indice,
        'config',
        'opciones',
        action.campoIndex,
        'id',
      ] : [
        'bandejaTickets',
        'ticketSelected',
        'etapas',
        action.indiceEtapa,
        'configuracion',
        action.indice,
        'config',
        'valor',
      ];

      return state
        .setIn(PATH,action.value);
    }

    case 'APP/CONTAINER/TABLEROS/SET_PLAZAS_AUTORIZADAS_ACTION':{
      
      return state
        .setIn(['plazasAutorizadas'],List(action.data));
    }
    
    case 'APP/CONTAINER/TABLEROS/SET_FILES_ACTION':{
      const {
        indiceEtapa,
        indice,
        files,
      } = action;
      
      return state
        .setIn(['bandejaTickets','ticketSelected','etapas',indiceEtapa,'configuracion',indice,'config','files'],files)
    }

    case 'APP/CONTAINER/TABLEROS/INPUTFILE_CAMPOS_ESPECIALES_BANDEJA_ACTION': {

      const pathFromData = [
        'bandejaTickets',
        'ticketSelected',
        'etapas',
        action.indiceEtapa,
        'configuracion',
        action.index,
        'config',
        'fromData'];
      
      const rutaFiles = [
        'bandejaTickets',
        'ticketSelected',
        'etapas',
        action.indiceEtapa,
        'configuracion',
        action.index,
        'config',
        'files'];

      return state
        .setIn(rutaFiles,fromJS(action.arreglo))
        .setIn(pathFromData, fromJS(action.formData));
    }

    case  'APP/CONTAINER/TABLEROS/SET_ETAPAS_ESTATUS': {
      return state.setIn(['bandejaTickets' ,'etapasEstatus'], fromJS(action.data));
    }

    case SET_INDICE_ETAPA: {
     
      
      const ticketSelectedInmutable = state.getIn(['bandejaTickets', 'ticketSelected'])
      const ticketSelected = JSON.parse(JSON.stringify(ticketSelectedInmutable))

      const segundosInmutables = state.getIn(['bandejaTickets', 'segundos'])
      const segundos = JSON.parse(JSON.stringify(segundosInmutables))
    
      if(action.index !== "" && ticketSelected.etapas.length > 0){
        // if(ticketSelected.etapas[action.index].IdEtapa){}
        ticketSelected.FechaInicio = ticketSelected.etapas[action.index].FechaInicio 
        const now = moment().format(ticketSelected.etapas[action.index].FechaHoy)
        const then = moment().format(ticketSelected.FechaInicio)
        ticketSelected.segundos= moment(now).diff(moment(then));
      }else{
        return state
      }
      const banderaSegundos = state.getIn(['bandejaTickets','segundos'])
      if(banderaSegundos > 0){

        return state
      }
      
      return state.setIn(['bandejaTickets', 'segundos'],ticketSelected.segundos)
    }

    case 'APP/CONTAINER/TABLEROS/INSERT_CURRENT_USER_ACTION':{

      const {
        IdDepartamento,
        IdEmpleado,
        IdPlaza,
        IdPuesto,
        Imagen,
        Nombre,
      } = action.currentUser;
   
      return state
        .setIn(['numUsuarioLogeado'],IdEmpleado)
        .setIn(['nomUsuarioLogeado'],Nombre)
        .setIn(['idDepartamentoLogeado'],IdDepartamento)
        .setIn(['idRolUsuarioLogeado'],IdPuesto)
        .setIn(['plazaUsuarioLogeado'],IdPlaza)
        .setIn(['imagenAvatar'],Imagen)
        .setIn(['socketCliente'],action.socketCliente)
    }



    default:
      return state;
  }
  
}

export default tablerosReducer;
