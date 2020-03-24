/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/*
 *
 * ConfiguracionCamposEspeciales reducer
 *
 */

import { fromJS,List} from 'immutable';
import { size, parseInt,find,findIndex,every,filter,remove,maxBy,isArray} from 'lodash';
import moment from 'moment';
import { isNumber, log } from 'util';
import { DEFAULT_ACTION } from './constants';
import Actions from './actions';
import STATE from './state';
// import reducer from '../ListadoTickets/reducer';

export const initialState = fromJS(STATE);
const ACTION = (name = '') => Actions.get(name).id;
export const {
  SET_ETAPAS,
  SET_PLAZAS,
  CANCELAR_ETAPA,
  CHANGE_STEPPER,
  CHANGE_REDIRECT,
  INICIALIZAR_ESTADO,
  OPEN_MODAL,
  ON_ACEPTAR_MODAL,
  VACIAR_ESTADO,
} = Actions.getConstants();

function configuracionCamposEspecialesReducer(state = initialState, action) {
  switch (action.type) {

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/HANDLE_CHANGE_TIPO_COMPONENTE_ACTION':{
      const {
        tipo,
        valor,
      } = action;
      
      const conf = state.getIn(['configuracion','componentes'])

      return state
        .setIn(['configuracion','componentes'],  fromJS(conf))
        .setIn(['configuracion','componentes',action.index,'tipoComponenteId'],  tipo)
        .setIn(['configuracion','componentes',action.index,'config','longitud'], '')
        .setIn(['configuracion','componentes',action.index,'config','valor'], valor);  
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/HANDLE_CHANGE_TEXT_COMPONENTE_ACTION':{
      const plazaImmutable = state.getIn(['confEtapas','plazaSelected']); 
      let plaza= JSON.parse(JSON.stringify(plazaImmutable));
      const plazaId = state.getIn(['tabla','idPlaza']); 
      if(plaza === undefined){
        plaza= {id:plazaId}
      }
      // console.log(plaza,'PLAZA');
      // console.log(plaza.id,"plaza");
     
      if(plaza.id === undefined){
        plaza = JSON.parse(JSON.stringify(plaza));
      }
      
      return state
        .setIn(['configuracion','componentes',action.index,'config','nomCampo'], action.value)
        .setIn(['configuracion','componentes',action.divSelecionado,'config','plazaId'],plaza.id);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_COMPONENTE_ACTION':{
      
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

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/HANDLE_CHANGE_COMPONENTE_ACTION':{
      const tipo = state.getIn(['configuracion','componentes',action.index,'tipoComponenteId']);
      const comps = state.getIn(['configuracion','componentes']);
      let tipo2 =""
      if(tipo === undefined){
        tipo2 = comps[action.index].tipoComponenteId;
      }
      const conf = state.getIn(['configuracion','componentes'])

      
        
      return state
        .setIn(['configuracion','componentes'],  fromJS(conf))
        .setIn(['configuracion','campoSelecionado'], tipo ===undefined ? tipo2 : tipo)
        .setIn(['configuracion','divSelecionado'], action.index);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_AGREGAR_COMPONENTE_ACTION':{
      const arr = state.getIn(['configuracion','componentes']);
      const arreglo =  fromJS(arr)
      const nuevoArreglo = arreglo.push(fromJS(action.componente));
      return state.setIn(['configuracion','componentes'], nuevoArreglo)
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_TEXT_COMPONENTE_TXTCORTO_ACTION':{
      const plazaImmutable = state.getIn(['confEtapas','plazaSelected']); 
      let plaza= JSON.parse(JSON.stringify(plazaImmutable));
      const plazaId = state.getIn(['tabla','idPlaza']); 
      if(plaza === undefined){
        plaza= {id:plazaId}
      }
      console.log( action,'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_TEXT_COMPONENTE_TXTCORTO_ACTION');
      const conf = state.getIn(['configuracion','componentes'])

      
      return state
        .setIn(['configuracion','componentes'],  fromJS(conf))
        .setIn(['configuracion','componentes',action.divSelecionado,'config','value'], fromJS(action.valor))
        .setIn(['configuracion','componentes',action.divSelecionado,'config','longitud'], '')
        .setIn(['configuracion','componentes',action.divSelecionado,'config','plazaId'],plaza.id);
    }

    // Hacer solo una funcion de validar propiedades del campo n_n >_< >w<
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERRORTIPO_ACTION':{
      return state.setIn(['configuracion','componentes',action.index,'config','errorTipo'], action.errorTipo);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERRORLONGITUD_ACTION':{
      return state.setIn(['configuracion','componentes',action.index,'config','errorLongitud'], action.errorLongitud);
    }
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERROROPCION_ACTION':{
      const {
        index,
        indexOpcion,
        errorOpcion,
      } = action;
      return state.setIn(['configuracion','componentes',index,'config','opciones',indexOpcion,'error'], errorOpcion);
    }
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERRORCOMPONENTE_ACTION':{
      const {
        index,
        error,
      } = action;
      return state.setIn(['configuracion','componentes',index,'config','colorearBorde'], error);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERROR_CANTIDADARCHIVOS_ACTION':{
      const conf = state.getIn(['configuracion','componentes'])
      return state.setIn(['configuracion','componentes',action.index,'config','error'], action.errorCantidadArchivos)
      .setIn(['configuracion','componentes'],  fromJS(conf))
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERROR_TAMAÑOARCHIVOS_ACTION':{
      return state.setIn(['configuracion','componentes',action.index,'config','error2'], action.errorTamañoArchivos);
    }
    
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ERROR_CATALOGO_ACTION':{
      return state.setIn(['configuracion','componentes',action.index,'config','error'], action.errorCatalogo);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_LONGITUD_COMPONENTE_TXTCORTO_ACTION':{
      const {
        idTipoComponente,
        valor,
        divSelecionado,
      } = action;
      const plazaImmutable = state.getIn(['confEtapas','plazaSelected']); 
      let plaza= JSON.parse(JSON.stringify(plazaImmutable));
      const plazaId = state.getIn(['tabla','idPlaza']); 
      if(plaza === undefined){
        plaza= {id:plazaId}
      }
      // console.log(plaza,'PLAZA'); 
      let long = 20;
      let longitudMaxima = "";
      console.log(divSelecionado,valor,idTipoComponente,"xxxxxxxx  --------------------------------------");

      const componenteSeleccionadoArray = state.getIn(['configuracion','componentes',divSelecionado,'config']);
      console.log(componenteSeleccionadoArray,"componenteSeleccionadoArray --------------------------------------");
      
      const componenteSeleccionado = componenteSeleccionadoArray !== undefined ? JSON.parse(JSON.stringify(componenteSeleccionadoArray)) : 0
  

      const error = state.getIn(['configuracion','componentes',divSelecionado,'config','error']);
      const conf = state.getIn(['configuracion','componentes'])
        
      if(parseInt(idTipoComponente,0) === 0){
        long = componenteSeleccionado.value === 'texto' ? 1000 :  10000000;
        longitudMaxima = "Longitud Maxima 255"
      }
  
      if(parseInt(idTipoComponente,0) === 1){
        long = componenteSeleccionado.value === 'texto' ? 1000 :  10000000;
        longitudMaxima = "Longitud Maxima 500"
      }
      if(parseInt(valor,0) > long){
        return state
          .setIn(['configuracion','componentes'],  fromJS(conf))
          .updateIn(['configuracion','componentes',divSelecionado,'config'],(config) => config.merge({
            error: true,
            helpertext: longitudMaxima,
          }));
      }
      if(error === true && parseInt(valor,0) <= long) {
        return state
          .setIn(['configuracion','componentes'],  fromJS(conf))
          .updateIn(['configuracion','componentes',divSelecionado,'config'],(config) => config.merge({
            error: false,
            helpertext: '',
            longitud: valor,
          }));
      }
      return state
        .setIn(['configuracion','componentes'],  fromJS(conf))
        .setIn(['configuracion','componentes',divSelecionado,'config','longitud'], valor)
        .setIn(['configuracion','componentes',action.divSelecionado,'config','plazaId'],plaza.id);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_OBLIGATORIO_COMPONENTE_TXTCORTO_ACTION':{
      const plazaImmutable = state.getIn(['confEtapas','plazaSelected']); 
      let plaza= JSON.parse(JSON.stringify(plazaImmutable));
      const plazaId = state.getIn(['tabla','idPlaza']); 
      const conf = state.getIn(['configuracion','componentes'])
      if(plaza === undefined){
        plaza= {id:plazaId}
      }
      // console.log(plaza,'PLAZA');
      return state
        .setIn(['configuracion','componentes'],  fromJS(conf))
        .setIn(['configuracion','componentes',action.divSelecionado,'config','requerido'], action.checked)
        .setIn(['configuracion','componentes',action.divSelecionado,'config','plazaId'],plaza.id);
        
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_TEXT_COMPONENTE_ARCHIVOS_ACTION':{
      const {
        name,
        divSelecionado,
        valor,
      } = action;
      const plazaImmutable = state.getIn(['confEtapas','plazaSelected']); 
      let plaza= JSON.parse(JSON.stringify(plazaImmutable));
      const plazaId = state.getIn(['tabla','idPlaza']); 
      const conf = state.getIn(['configuracion','componentes'])
      if(plaza === undefined){
        plaza= {id:plazaId}
      }
      // console.log(plaza,'PLAZA');
      if(name === "tamañoarchivos"){
        return state
          .setIn(['configuracion','componentes',divSelecionado,'config','tamañoarchivos'], valor)
          .setIn(['configuracion','componentes',divSelecionado,'config','plazaId'],plaza.id);
      }
      if(name === "cantidadarchivos"){
        return state
          .setIn(['configuracion','componentes',divSelecionado,'config','cantidadarchivos'], valor)
          .setIn(['configuracion','componentes',divSelecionado,'config','plazaId'],plaza.id);
      }
      return null;
    }
    
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_AGREGAR_OPCION_LISTA_ACTION':{
      const {
        divSelecionado,
        opcion,
      } = action;
      const plazaImmutable = state.getIn(['confEtapas','plazaSelected']); 
      let plaza= JSON.parse(JSON.stringify(plazaImmutable));
      const plazaId = state.getIn(['tabla','idPlaza']); 
      if(plaza === undefined){
        plaza= {id:plazaId}
      }
      // console.log(plaza,'PLAZA'); 
      const arreglo = state.getIn(['configuracion','componentes',divSelecionado,'config','opciones']);   
      const nuevoArreglo = arreglo.push(fromJS(opcion));
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config','opciones'],nuevoArreglo)
        .setIn(['configuracion','componentes',divSelecionado,'config','plazaId'],plaza.id);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_BORRAR_OPCION_LISTA_ACTION':{
      const {
        divSelecionado,
        index,
      } = action;
      const plazaImmutable = state.getIn(['confEtapas','plazaSelected']); 
      let plaza= JSON.parse(JSON.stringify(plazaImmutable));
      const plazaId = state.getIn(['tabla','idPlaza']); 
      if(plaza === undefined){
        plaza= {id:plazaId}
      }
      // console.log(plaza,'PLAZA');
      const arreglo = state.getIn(['configuracion','componentes',divSelecionado,'config','opciones']);
      const nuevoArreglo = arreglo.splice(index,1);
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config','opciones'],nuevoArreglo)
        .setIn(['configuracion','componentes',divSelecionado,'config','plazaId'],plaza.id);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONINPUT_TEXT_LISTA_ACTION':{
      const {
        index,
        divSelecionado,
        valor,
      } = action;
      const plazaImmutable = state.getIn(['confEtapas','plazaSelected']); 
      let plaza= JSON.parse(JSON.stringify(plazaImmutable));
      const plazaId = state.getIn(['tabla','idPlaza']); 
      if(plaza === undefined){
        plaza= {id:plazaId}
      }
      // console.log(plaza,'PLAZA');
      // eslint-disable-next-line no-unused-vars
      const jala = state.getIn(['configuracion','componentes',divSelecionado,'config','opciones',index,'value']);
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config','opciones',index,'value'],valor)
        .setIn(['configuracion','componentes',divSelecionado,'config','plazaId'],plaza.id);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONINPUT_TEXT_CARGAR_ARCHIVO_ACTION':{
      
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

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_TIPO_ARCHIVO_ACTION':{
      const {
        divSelecionado,
        tipoArchivo,
      } = action;
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config','tipoArchivo'],tipoArchivo);
    }

    // --------------------

    case SET_ETAPAS : {

      const reglaArray = state.getIn(['etapas']);
      const regla = JSON.parse(JSON.stringify(reglaArray)); 

      const etapasTemporalesArray= state.getIn(['tabla', 'etapasTemporales']);
      const etapasTemporales = JSON.parse(JSON.stringify(etapasTemporalesArray));

      //  const datosEtapasTemporales = JSON.parse(JSON.stringify(datosTemporales));

      const etapas = []
      let etapaModificada ={}

      const etapasTEMPO = action.data.data[0].length > 0 ?  action.data.data[0][0] : etapasTemporales

      etapasTEMPO.forEach((etapaSeleccionada,index) => {
      
        if(etapaSeleccionada.reglas.length === 0)
        {
          etapaSeleccionada.reglas = regla.reglas
        }
        let reglasArray = []
        if(etapaSeleccionada.reglas.length > 0)
        {
          reglasArray = etapaSeleccionada.reglas.config === undefined ? [{
            nombre:etapaSeleccionada.reglas[0].Nombre || etapaSeleccionada.reglas[0].nombre,
            config: etapaSeleccionada.reglas.map(item => ({
              campo: item.IdCampo,
              condicion: item.IdCondicion,
              valor: item.Valor,
              nombre: "Se muestra etapa si la regla se cumple",
              valores: item.Valores,
              campoEspecial:item.campoEspecial,
              componentes:item.componentes,
              IdEtapa:item.IdEtapa,
              IdRegla:item.IdRegla,
              nombreEtapa:item.nombreEtapa,
            })),
          }] : [
            {
              nombre:'Se muestra etapa si la regla se cumple',
              config:etapaSeleccionada.reglas,
            },
          ];
        }

        if(etapaSeleccionada.IdUsuario === null ){
          etapaSeleccionada.IdUsuario = undefined 
        }

        if(etapaSeleccionada.IdUsuario !== undefined){
          etapaSeleccionada.Puesto = "No Aplica"
        }

        let plaza = ""
        if(etapaSeleccionada.Plaza === undefined){
          const plazasArray = state.getIn(['tabla','datosPlaza']);
          const dataPlazaArray = JSON.parse(JSON.stringify(plazasArray));
          plaza =find(dataPlazaArray,['IdPlaza',etapaSeleccionada.IdPlaza])
          etapaSeleccionada.Plaza = plaza.Plaza
        }
        
        if(etapaSeleccionada.IdUsuario === undefined && etapaSeleccionada.rolUsuarioSelected){
          const puesto =  find(etapaSeleccionada.puestos,['IdPuesto',etapaSeleccionada.rolUsuarioSelected ]) ||
          find(etapaSeleccionada.puestos,['IdPuesto',etapaSeleccionada.rolUsuarioSelected.id ]) 
          etapaSeleccionada.Puesto = puesto.Nombre
        }
        
        if(etapaSeleccionada.IdUsuario === undefined && etapaSeleccionada.Puesto === "No Aplica" ||
        etapaSeleccionada.IdUsuario === null && etapaSeleccionada.Puesto === "No Aplica"){
          const puesto =  find(etapaSeleccionada.puestos,['IdPuesto',etapaSeleccionada.rolUsuarioSelected.id ]) || 
          find(etapaSeleccionada.puestos,['IdPuesto',etapaSeleccionada.rolUsuarioSelected ]) 
          etapaSeleccionada.Puesto = puesto.Nombre
          
        }
        
        if(etapaSeleccionada.rolUsuarioSelected === null && etapaSeleccionada.Puesto === "No Aplica" ||
        etapaSeleccionada.IdUsuario !== null && etapaSeleccionada.Puesto === "No Aplica"){
          const responsable =  find(etapaSeleccionada.usuarios,['NoEmpleado',etapaSeleccionada.IdUsuario]) 
          ||  find(etapaSeleccionada.usuarios,['NoEmpleado',etapaSeleccionada.IdUsuario.id])       
          etapaSeleccionada.Responsable = responsable.Nombre
        }

        // const idPlantilla= state.getIn(['tabla', 'idPlantilla']);

        // etapaSeleccionada.IdDependencia = idPlantilla > 0 ? etapaSeleccionada.IdDependencia-1 :etapaSeleccionada.IdDependencia
        // if(etapaSeleccionada.IdDependencia < 0){etapaSeleccionada.IdDependencia = ""}
     
        // if(index === 0){
        //   etapaSeleccionada.Dependencia = "Sin Dependencia"
        //   etapaSeleccionada.IdDependencia = ""
        // }
        // if(etapaSeleccionada.Dependencia ===undefined){
        //   etapaSeleccionada.Dependencia = "Sin Dependencia"
        // }
        let  depen = []
        if(etapaSeleccionada.Dependencia ===undefined){
          depen = etapasTEMPO[etapaSeleccionada.IdDependencia] 
          // debugger 
          if(depen !== undefined){
            // debugger
            etapaSeleccionada.Dependencia = depen.Etapa
          }else{
            // debugger
            etapaSeleccionada.Dependencia = "Sin Dependencia"
          }
        }        
       
        etapaModificada = {
          Dependencia:  etapaSeleccionada.IdDependencia === "" ? "Sin Dependencia" : etapaSeleccionada.Dependencia,
          Etapa:  etapaSeleccionada.Etapa,
          IdDependencia: etapaSeleccionada.IdDependencia === "" ? "Sin Dependencia" : etapaSeleccionada.IdDependencia,
          IdEtapa: etapaSeleccionada.IdEtapa,
          IdPlaza: etapaSeleccionada.IdPlaza,
          IdTempo: etapaSeleccionada.IdEtapa,
          plazaDestinoSeleccionada: etapaSeleccionada.IdPlazaDestino ||  etapaSeleccionada.plazaDestinoSeleccionada,
          plazaSelected: etapaSeleccionada.IdPlazaDestino ||  etapaSeleccionada.plazaDestinoSeleccionada,
          Plaza:  etapaSeleccionada.Plaza || plaza.nombre,
          Puesto: etapaSeleccionada.Responsable === "No Aplica" || etapaSeleccionada.Responsable === undefined ?   etapaSeleccionada.Puesto  : "No Aplica",
          Responsable: etapaSeleccionada.Puesto === "No Aplica" ? etapaSeleccionada.Responsable : "No Aplica",
          TiempoDeSLA:  etapaSeleccionada.tiempos[1] !== undefined ? etapaSeleccionada.tiempos[0].SLA + etapaSeleccionada.tiempos[1].SLA : etapaSeleccionada.tiempos[0].SLA,
          activarRadioRol: etapaSeleccionada.activarRadioRol,
          permitirCancelacion: etapaSeleccionada.permitirCancelacion ||  etapaSeleccionada.OpcionCancelar,
          reglas: reglasArray,
          configuracion:etapaSeleccionada.configuracion || [],
          requiereSeguimiento: etapaSeleccionada.requiereSeguimiento,
          rolUsuarioSelected: etapaSeleccionada.rolUsuarioSelected !==null ? etapaSeleccionada.rolUsuarioSelected || {id: etapaSeleccionada.IdRol, nombre: ""} : {id: etapaSeleccionada.IdUsuario}   ,
          tiempos: etapaSeleccionada.tiempos,
          Activo:true,
          usuarios:etapaSeleccionada.usuarios,
          IdUsuario : etapaSeleccionada.IdUsuario,
          puestos : etapaSeleccionada.puestos,
          IdEtapaMaximo : etapaSeleccionada.IdEtapaMaximo,
          temporal : etapaSeleccionada.temporal,
        }
        etapas.push(etapaModificada)
      })
      
      // const datosTemporales = JSON.parse(JSON.stringify(etapas))
      
      return state.updateIn(['tabla'], (tabla) => tabla.merge({
        datosEtapa: etapas,
        cabecerasEtapa: action.data.headers,
        etapa: 0,
        plaza: action.data.data[0][0][0].Plaza,
        idPlaza: action.idPlaza,
      }))
        .set('stepper', 2)
        .setIn(['tabla','idPlaza'],action.idPlaza)
        .setIn(['tabla','datosEtapasBorradas'],[])
    }

    // --------------------------------------------------------------


    case SET_PLAZAS : {
      const plazas = state.getIn(['tabla','datosPlaza']);
      const plazasArray = JSON.parse(JSON.stringify(plazas));

      return state.updateIn(['tabla'], (tabla) => tabla.merge({
        datosPlaza: plazasArray.length === 0 ? action.data.data[0]: plazasArray,
        cabecerasPlaza: action.data.headers,
        etapa: 1,
        idPlaza:0,
        etapasTemporales:action.data.etapasTemporales,
        datosEtapa:action.data.etapasTemporales,
        idPlantilla:action.data.IdPlantilla,

      })).set('stepper', 2)
    }

    case ACTION('DELETE_ETAPA'):{   
        
      const datosEtapasArray= state.getIn(['tabla', 'datosEtapa']);
      const datosEtapas = JSON.parse(JSON.stringify(datosEtapasArray));
      // ETAPAS TEMPORALES
      // const etapasTemporalesArray= state.getIn(['tabla', 'etapasTemporales']);
      // const etapasTemporales = JSON.parse(JSON.stringify(etapasTemporalesArray));

      const etapaTemporal =  find(datosEtapas, { 'IdEtapa': action.id });
      
      if(etapaTemporal.IdTempo){
        datosEtapas.forEach((etapa,index) => {
          if(etapa.IdEtapa=== etapaTemporal.IdEtapa && etapa.IdPlaza === etapaTemporal.IdPlaza){
            datosEtapas.splice(index,1)
          }
        });
      }
    
      return state.updateIn(['tabla'], (tabla) => tabla.merge({
        datosEtapa:  datosEtapas,
        modalBorrado: false,
        // datosPlaza: dataPlazaArray,
      }))
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_VALOR_COMP_MODAL_ACTION':{
      const componentesEspecialesArray = state.getIn(['configuracionComponentes']);
      const componentesEspeciales= JSON.parse(JSON.stringify(componentesEspecialesArray)); 
      const componentesArray = state.getIn(['configuracion','componentes']);
      const componentes= JSON.parse(JSON.stringify(componentesArray)); 
      const componentesEspecialesEtapas = []
      const etapasTempArry = state.getIn(['tabla','etapasTemporales']);
      const etapasTemporales= JSON.parse(JSON.stringify(etapasTempArry));
      const plazaImmutable = state.getIn(['confEtapas','plazaSelected']); 
      
      let EsCampoEspecial = ''
      let NombreEtapa = ''

      let plaza= JSON.parse(JSON.stringify(plazaImmutable));
      const plazaId = state.getIn(['tabla','idPlaza']); 
      if(plaza === undefined){
        plaza= {id:plazaId}
      }
      // console.log(etapasTemporales,"etapasTemporales");
       
      etapasTemporales.forEach((etapa) => {        
        if(etapa.configuracion.componentes){
          if(etapa.configuracion.componentes.length > 0){
            etapa.configuracion.componentes.forEach((comp) => {
              comp.campoEspecial = true
              if(comp.config.value === ""  && comp.tipoComponenteId !== 2 && comp.tipoComponenteId !== 5 && plaza.id === comp.config.plazaId
              || comp.config.value === 'texto'  && comp.tipoComponenteId !== 2 && comp.tipoComponenteId !== 5 
              && plaza.id === comp.config.plazaId
              || comp.config.value === 'numero'  && comp.tipoComponenteId !== 2 && comp.tipoComponenteId !== 5 
              && plaza.id === comp.config.plazaId
              ){
                componentesEspecialesEtapas.push(comp)
              }
            })
          }
        }
        
        if(etapa.configuracion.length > 0){
          // console.log(etapa.configuracion,"CONFIGURACION");
          
          etapa.configuracion.forEach((comp) => {
            comp.campoEspecial = true
            if(comp.config.value === ""  && comp.tipoComponenteId !== 2 && comp.tipoComponenteId !== 5  && plaza.id === comp.config.plazaId
              || comp.config.value === 'texto'  && comp.tipoComponenteId !== 2 && comp.tipoComponenteId !== 5 && plaza.id === comp.config.plazaId 
              || comp.config.value === 'numero'  && comp.tipoComponenteId !== 2 && comp.tipoComponenteId !== 5 
              && plaza.id === comp.config.plazaId
            ){
              componentesEspecialesEtapas.push(comp)
            }
          })
        }
      }) 
      // console.log(componentesEspecialesEtapas,"console.log(componentesEspecialesEtapas);");
      // SACAR TODOS LOS COMPONENTES TANTO DE CONF Y DE ESPECIALES 
      const {
        nombreComponente,
        nuevoValor,
        index,
        reglaSeleccionada,
      } = action;
      
      const componentesFiltrados = []
      const componentesMezclados = componentesEspecialesEtapas
      
      componentes.forEach((componente) => {
        componente.campoEspecial = true
        if(componente.tipoComponenteId !== 2 && componente.tipoComponenteId !== 5 ){
          componentesMezclados.push(componente)
        }
        
      })

      // console.log(componentesMezclados,"console.log(componentesMezclados);");

      componentesEspeciales.forEach((especial) => { 
        especial.campoEspecial = false
        if(especial.tipoComponenteId !== 2 && especial.tipoComponenteId !== 5 ){
          componentesMezclados.push(especial)
        }
        
      })

      if(nombreComponente === "valores"){
        if(nuevoValor === '1'){
          componentesMezclados.forEach((item) => {
            // console.log(item,"ITEM");
            if(item.tipoComponenteId === 0 && item.config.longitud !== "" && item.config.value !== 'numero' ||
               item.tipoComponenteId === 1 && item.config.longitud !== "" && item.config.value !== 'numero' ||
               item.tipoComponenteId > 1 
               // item.config.opciones[0].value !== "" && item.tipoComponenteId < 6 
            ){
              componentesFiltrados.push(item)
            }
          }) 
        }
        if(nuevoValor === '0'){
          componentesMezclados.forEach((item) => {
            if(item.config.value === 'numero' && plaza.id === item.config.plazaId ){
              componentesFiltrados.push(item)
            }
          }) 
        }
        return state.setIn(['etapas','reglas',reglaSeleccionada,'config',index,nombreComponente],nuevoValor)
          .setIn(['componentesFiltrados'],componentesFiltrados)
          .setIn(['etapas','reglas',reglaSeleccionada,'config',index,'componentes'],componentesFiltrados)
      }

      if(nombreComponente === "campo"){        
        componentesMezclados.forEach((item) => {
          if(item.config.nomCampo === nuevoValor){
            EsCampoEspecial = item.campoEspecial
            if( item.config.nombreEtapa !== undefined && item.config.nombreEtapa !==""){
              NombreEtapa = item.config.nombreEtapa
            }
          }
        })
        // console.log(NombreEtapa,"NombreEtapa");
        
        return state.setIn(['etapas','reglas',reglaSeleccionada,'config',index,nombreComponente],nuevoValor)
          .setIn(['etapas','reglas',reglaSeleccionada,'config',index,'campoEspecial'],EsCampoEspecial)
          .setIn(['etapas','reglas',reglaSeleccionada,'config',index,'nombreEtapa'],NombreEtapa)
      }
      return state.setIn(['etapas','reglas',reglaSeleccionada,'config',index,nombreComponente],nuevoValor)
    }

    
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_VALOR_COMP_MODAL_INPUT_ACTION':{
      const {
        nombreComponente,
        nuevoValor,
        index,
        reglaSeleccionada,
      } = action;
      return state
        .setIn(['etapas','reglas',reglaSeleccionada,'config',index,nombreComponente],nuevoValor);
    }
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_VALOR_ERROR_COMP_MODAL_ACTION':{
      const {
        regla,
        reglaSeleccionada,
        indexRegla,
      } = action;
      return state
        .setIn(['etapas','reglas',reglaSeleccionada,'config',indexRegla,'errorValores'],regla.valores ==="")
        .setIn(['etapas','reglas',reglaSeleccionada,'config',indexRegla,'errorCampo'],regla.campo ==="")
        .setIn(['etapas','reglas',reglaSeleccionada,'config',indexRegla,'errorCondicion'],regla.condicion ==="")
        .setIn(['etapas','reglas',reglaSeleccionada,'config',indexRegla,'errorValor'],regla.valor<=0)
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_AGREGAR_REGLA_ACTION':{
      const regla = {
        valores:'',
        errorValores:false,
        campo:'',
        errorCampo:false,
        condicion:'',
        errorCondicion:false,
        valor:'',
        errorValor:false,
        campoEspecial:false,
        componentes:[
          {config:{nomCampo:"titulo"}},
        ],
        IdEtapa :null,
        IdRegla: null,
        nombreEtapa:"",
      };

      const {
        reglaSeleccionada,
      } = action;
      const arreglo = state.getIn(['etapas','reglas',reglaSeleccionada,'config']);
      const nuevoArreglo = arreglo.push(fromJS(regla));      
      return state
        .setIn(['etapas','reglas',reglaSeleccionada,'config'],nuevoArreglo);
    }


    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_BORRAR_REGLA_ACTION':{
      const {
        index,
        reglaSeleccionada,
      } = action;

      const arreglo = state.getIn(['etapas','reglas',reglaSeleccionada,'config']);
      const nuevoArreglo = arreglo.splice(index,1);

      return state.setIn(['etapas','reglas',reglaSeleccionada,'config'],nuevoArreglo);
    }

    case CHANGE_STEPPER : {   
      const plazaId = state.getIn(['tabla','idPlaza']);
      const plazas = state.getIn(['tabla','datosPlaza']);
      const PlazasArray = JSON.parse(JSON.stringify(plazas)); 
      let  plazaSeleccionada =  find(PlazasArray, { 'IdPlaza': plazaId});   
      const datosEtapaArray = state.getIn(['tabla','datosEtapa'])
      const datosEtapa = JSON.parse(JSON.stringify(datosEtapaArray)) 
      let radioRol = 'Rol'

      if(plazaSeleccionada === undefined){  
        plazaSeleccionada = {IdPlaza: '',Plaza: ''} 
        radioRol = ''
      }

      return state
        .set('confEtapas', initialState.get('confEtapas'))
        .set('configuracion', initialState.get('configuracion'))
        .set('stepper', action.id)
        .setIn(['confEtapas','radioRol'], radioRol)
        .setIn(['confEtapas','plazaSelected'],{id:plazaSeleccionada.IdPlaza,nombre:plazaSeleccionada.Plaza})
        .updateIn(['tabla'], (tabla) => tabla.merge({
          etapa : 1,
          datosEtapa,
        }))
      
    }

    case CANCELAR_ETAPA : {

      const plazaId = state.getIn(['tabla','idPlaza']);
      const plazas = state.getIn(['tabla','datosPlaza']);
      const PlazasArray = JSON.parse(JSON.stringify(plazas)); 
      let   plazaSeleccionada =  find(PlazasArray, { 'IdPlaza': plazaId});

      // const datosEtapaArray = state.getIn(['tabla','datosEtapa'])
      // const datosEtapa = JSON.parse(JSON.stringify(datosEtapaArray))

      const etapasTemporalesArray = state.getIn(['tabla','etapasTemporales'])
      const etapasTemp = JSON.parse(JSON.stringify(etapasTemporalesArray))

      // const datosEtapaTemporalesArray = state.getIn(['tabla','datosEtapaTemporales']);
      // const datosEtapaTemp = JSON.parse(JSON.stringify(datosEtapaTemporalesArray))

      const plazasArray = state.getIn(['tabla','datosPlaza']);
      const dataPlazaArray = JSON.parse(JSON.stringify(plazasArray));


      // Esta parte esta mal por el sentido del cancelar no queda adecuadamente si se agrego la etapa

      // datosEtapa.forEach((etapaGuardar) => {
      //   etapasTemp.forEach((tempo,idx) => {
      //     if(tempo.IdEtapa === etapaGuardar.IdEtapa && tempo.Activo === false && etapaGuardar.Activo === false){
      //       etapasTemp.splice(idx,1)
      //     }
      //   })
      // })

      // if(!find(etapasTemp, {IdPlaza: plazaSeleccionada.IdPlaza})) {
      //   remove(dataPlazaArray, {
      //     IdPlaza: plazaSeleccionada.IdPlaza,
      //   });
      // }

      if(plazaSeleccionada === undefined){
        plazaSeleccionada = {id: '',nombre: ''} 
      }
      return state
        .set('confEtapas', initialState.get('confEtapas'))
        .set('stepper', action.id)
        .setIn(['confEtapas','plazaSelected'],{id:plazaSeleccionada.IdPlaza,nombre:plazaSeleccionada.Plaza})
        .updateIn(['tabla'], (tabla) => tabla.merge({
          etapa : 1,
        }))
        .updateIn(['tabla'], (tabla) => tabla.merge({
          etapasTemporales:etapasTemp,
          idPlaza : 0,
          datosPlaza : dataPlazaArray,
        }))
    }

    

    // Jaime Configuracion Etapas --------------------------------------------------------------

    case ACTION('REDIRECCIONAR_CAMPOS'):{
      const componentesTemporales = state.getIn(['configuracion','componentes']);
      // const componentesTemporales = JSON.parse(JSON.stringify(componentes));
      return state.setIn(['stepper'],0)
        .setIn(['configuracion','configuracionComponentesTemporales'], componentesTemporales)
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/GET_PLAZAS':{
      return state.setIn(['confEtapas','plazas'],action.plazas.data)
      
      // .setIn(['confEtapas','plazas'],action.plazas.data)
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/GET_PLAZAS_HABILITADAS':{ 
      const plazasArray = state.getIn(['confEtapas','plazasDestino']);
      const plazas = JSON.parse(JSON.stringify(plazasArray));
      const datosPlazasArray = state.getIn(['tabla','datosPlaza']);
      const datosPlaza =  JSON.parse(JSON.stringify(datosPlazasArray));
      const plazasHabilitadas = plazas
      plazasHabilitadas.forEach((plaza,index) => {
        datosPlaza.forEach(datoPlaza => {
          if(plaza.IdPlaza === datoPlaza.IdPlaza){
            
            plazasHabilitadas.splice(index,1)
          }
        });
      });

      return state.setIn(['confEtapas','plazas'],plazasHabilitadas)
    }

    case ACTION('HANDLE_CHANGE_PLAZA'):{
      return state.setIn(['confEtapas', 'plazaSelected'],action.event)
        .setIn(['confEtapas','tipoBusquedaUsuarios'], List())
        .setIn(['confEtapas','activarRadioRol'], action.event.id > 0)
        .setIn(['confEtapas','radioRol'], 'Rol')
    }

    case ACTION('HANDLE_CHANGE_PLAZA_DESTINO'):{      
      // let plazaSeleccionada = state.getIn(['confEtapas','plazaDestinoSeleccionada'])
      // console.log(plazaSeleccionada,"plazaSeleccionada");

      // if(plazaSeleccionada){
      //   if(plazaSeleccionada.id){
      //     plazaSeleccionada = plazaSeleccionada.id
      //   }
      // }
      return state.setIn(['confEtapas', 'plazaDestinoSeleccionada'],action.event)
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_RADIO_BUTTON':{ 
      // return state.setIn(['confEtapas','tipoBusquedaUsuarios'], action.tipoBusqueda.data)
      // const users =  state.getIn(['confEtapas','tipoBusquedaUsuarios'])
              
      return state.setIn(['confEtapas','radioRol'], action.action.event)
        .setIn(['confEtapas', 'plazaDestinoSeleccionada'],{
          'id': '',
          'nombre': '',
        })
      // .setIn(['confEtapas','tipoBusquedaUsuarios'], users)
    }

    case ACTION('CHANGE_NOMBRE_ETAPA'):{      
      return state.setIn(['confEtapas','nombreEtapa'], action.event);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_USUARIOS_ROLES':{
      return state.setIn(['confEtapas','tipoBusquedaUsuarios'], action.tipoBusqueda.data)
        .setIn(['confEtapas','rolUsuarioSelected'], {id:"",nombre:""})

    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_PUESTOS':{
      return state.setIn(['confEtapas','tipoBusquedaUsuarios'], action.tipoBusqueda.data)
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ERASE_RADIO_BUTTON':{  
      return state.setIn(['confEtapas','radioRol'], '')
    }

    case ACTION('HANDLE_CHANGE_TIPO'):{
      return state.setIn(['confEtapas', 'rolUsuarioSelected'],action.event)
    }

    case ACTION('PERMITIR_CANCELACION'):{
      const res = action.event === "si"      
      return state.setIn(['confEtapas', 'permitirCancelacion'],res)
    }

    case ACTION('HANDLE_CHANGE_DEPENDENCIA'):{      
      return state.setIn(['confEtapas', 'dependenciaSeleccionada'],action.event)
    }

    case ACTION('REDIRECCIONAR_ETAPAS'):{
      return state.setIn(['stepper'],2).set('confEtapas', initialState.get('confEtapas')) 
        .set('etapas', initialState.get('etapas'))
        // .setIn(['tabla','idPlaza'],0)
        
    }

    case ACTION('CHECK_SEGUIMIENTO'):{      
      return state.setIn(['confEtapas','requiereSeguimiento'], action.event);
    }
    
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_ETAPAS':{    
      return state.setIn([ 'confEtapas', 'dependencias'], List(action.etapasPorPlaza.data))
    }

    case ACTION('CHANGE_HORA_INICIO'):{      
      return state.setIn(['confEtapas','horaInicio1'], action.event);
    }
    case ACTION('CHANGE_HORA_INICIO_2'):{      
      return state.setIn(['confEtapas','horaInicio2'], action.event);
    }
    case ACTION('CHANGE_HORA_FIN'):{      
      return state.setIn(['confEtapas','horaFin1'], action.event);
    }
    case ACTION('CHANGE_HORA_FIN_2'):{      
      return state.setIn(['confEtapas','horaFin2'], action.event);
    }

    case ACTION('INSERTAR_TIEMPO_SLA1'):{ 
      return state.setIn(['confEtapas','tiempoSla1'], action.event);
    }

    case ACTION('INSERTAR_TIEMPO_SLA2'):{ 
      return state.setIn(['confEtapas','tiempoSla2'], action.event);
    }

    
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REDIRECCIONAR_CONFIGURACIONES':{ 
      return state.setIn(['stepper'],1)
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/CANCELAR_CAMPOS':{
      const componentesActuales = state.getIn(['configuracion','configuracionComponentesTemporales']);
      // const componentesActuales = JSON.parse(JSON.stringify(componentes));
      return state.setIn(['stepper'],1).set('configuracion', initialState.get('configuracion'))
        .setIn(['configuracion','componentes'], componentesActuales)
    }
    
    case'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/CHANGE_HORA_INICIO':{      
      return state.setIn(['confEtapas','horaInicio1'], action.event);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_REGLA_ACTION':{
      const {
        valor,
      } = action;
      
      return state.setIn(['etapas','reglaSeleccionada'],valor);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/VACIAR_ESTADO_REGLAS':{
      const reglasActuales = state.getIn(['etapas','reglasTemporales']);
      const reglasSeleccionadaActual = state.getIn(['etapas','reglaSeleccionadaTemporal']);
      const reglasConfEtapas= state.getIn(['etapas']);
      return state.set('etapas', initialState.get('etapas'))
        .setIn(['etapas','reglas'], reglasActuales)
        .setIn(['etapas','reglaSeleccionada'], reglasSeleccionadaActual)
        .setIn(['confEtapas','reglas'], reglasConfEtapas)
      // .setIn(['confEtapas','reglas'], reglasActuales)
      // const reglasArray = state.getIn(['etapas']);
      // const reglas = JSON.parse(JSON.stringify(reglasArray));
      // return state.setIn(['confEtapas','reglas'], reglas);


    }
    
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/AGREGAR_REGLA_TEMPORAL':{
      const reglasTemporales = state.getIn(['etapas','reglas']);
      const reglaSeleccionadaTemporal = state.getIn(['etapas','reglaSeleccionada']);
      const reglas = JSON.parse(JSON.stringify(reglasTemporales))
      let vacios = false
      let valor = 0
      reglas.forEach((regla) => {
        if (regla.config[0].valores === "" || regla.config[0].campo=== "" || regla.config[0].valor === "") {
          
          vacios = true
        }
        
      })
      if(vacios === true){
        valor = 99999999
        
      }
      
      return state.setIn(['etapas','reglasTemporales'], reglasTemporales)
        .setIn(['etapas','reglaSeleccionadaTemporal'], reglaSeleccionadaTemporal)
        .setIn(['etapas','reglaSeleccionada'],valor);
        
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/AGREGAR_REGLAS':{
      const reglasArray = state.getIn(['etapas']);
      const reglas = JSON.parse(JSON.stringify(reglasArray));
      return state.setIn(['confEtapas','reglas'], reglas);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/AJUSTAR_REGLAS':{
      const reglasArray = state.getIn(['confEtapas','reglas']);
      let reglas = JSON.parse(JSON.stringify(reglasArray));
      
      if(reglas.length === 0){
        const array = state.getIn(['etapas']);
        reglas = JSON.parse(JSON.stringify(array));
      }

      return state.setIn(['etapas'], reglas);
        
    }


    case ACTION('VACIAR_PLAZAS'):{      
      return state.updateIn(['tabla'], (tabla) => tabla.merge({
        idPlaza: 0,
        plaza: '',
      }));
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_TODAS_PLAZAS':{
      return state.setIn(['confEtapas','plazasDestino'], action.plazas.data);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REDIRIGIR_CONF_TICKETS':{
      return state.setIn(['confEtapas','plazasDestino'], action.plazas.data);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/AGREGAR_CAMPOS_CONFIG':{
      return state.setIn(['confEtapas','plazasDestino'], action.plazas.data);
    }
    
    case ACTION('AGREGAR_ETAPA_PLAZA'):{  
      const plazasArray = state.getIn(['tabla','datosPlaza']);
      const PlazaConfigurada = state.getIn(['confEtapas','plazaSelected']);
      const dataPlazaArray = JSON.parse(JSON.stringify(plazasArray));
      const flag = every(dataPlazaArray, (itm) => itm.IdPlaza === PlazaConfigurada.id);
      const plaza = {IdPlaza:PlazaConfigurada.id, Plaza:PlazaConfigurada.nombre,Etapas:"1"}
      
      // validando que no inserte la misma plaza
      if(!find(dataPlazaArray, { 'IdPlaza': PlazaConfigurada.id})){
        dataPlazaArray.push(plaza)
      }
  
      // ETAPAS
      const etapas = state.getIn(['confEtapas']);
      const etapasArray = JSON.parse(JSON.stringify(etapas));
      const getEtapasTemporales = state.getIn(['tabla','etapasTemporales'])
      const etapaTemporal = JSON.parse(JSON.stringify(getEtapasTemporales))
      const datosEt = state.getIn(['tabla','datosEtapa'])
      const datosEtapa = JSON.parse(JSON.stringify(datosEt))

      for (let index = 0; index < etapaTemporal.length; index++) {
        for (let idx = 0; idx < datosEtapa.length; idx++) {
          if(etapaTemporal[index].IdEtapa === datosEtapa[idx].IdEtapa && etapaTemporal[index].IdPlaza === datosEtapa[idx].IdPlaza ){
            const {reglas} = etapaTemporal[index]
            etapaTemporal[index] = datosEtapa[idx]
            etapaTemporal[index].reglas = reglas
          }
        }
      }

      // CHECAR ESTA WEA!!
      const nextId = state  // ID ETAPA
        .getIn(['tabla','etapasTemporales']) 
        .filter((item) => 
          item.get('IdPlaza') === PlazaConfigurada.id || item.get('IdPlaza') === item.IdPlaza)// Lista filtrada
        .size + 1

  
      // AGREGANDO CAMPOS ESPECIALES A LA ETAPA
      const camposEspeciales = state.getIn(['configuracion']);
      const camposEspecialesArray =JSON.parse(JSON.stringify(camposEspeciales));
      const EtapaConf = state.getIn(['confEtapas','nombreEtapa']);      
      camposEspecialesArray.componentes.forEach((item) => {        
        item.config.nombreEtapa = EtapaConf
      })
      
      //
      const reglaArray = state.getIn(['etapas']);
      const regla =JSON.parse(JSON.stringify(reglaArray));
      let reglaModificada = []
      if(regla.reglas.length > 0){
        reglaModificada = [{
          nombre:regla.reglas[0].nombre,
          config:regla.reglas[0].config,
          // idRegla:
        }]
      }else{  
        reglaModificada = []
      }

      const existe = find(datosEtapa, {IdPlaza: etapasArray.plazaSelected.id})
      const tiempoSla1 = parseInt(etapasArray.tiempoSla1) 
      const tiempoSla2 = parseInt(etapasArray.tiempoSla2) 
      const usuarios = state.getIn(['confEtapas','tipoBusquedaUsuarios'])
      const puestos = state.getIn(['confEtapas','tipoBusquedaUsuarios'])
      const errorDependencia = existe === undefined ? false: etapasArray.dependenciaSeleccionada.id === ""

      // Validaciones al agregar
      if(etapasArray.horaInicio1.trim() === "" || etapasArray.horaFin1.trim() === "" || etapasArray.tiempoSla1 <=0 || 
         etapasArray.plazaSelected.id === ""  || etapasArray.plazaSelected.nombre === ""||etapasArray.rolUsuarioSelected.id === "" 
         || etapasArray.nombreEtapa.trim() === "" || errorDependencia){

        return state.setIn(['confEtapas','validacionesConfEtapas'],false)
          .setIn(['confEtapas','errores','errorPlaza'],etapasArray.plazaSelected.id=== ""||etapasArray.plazaSelected.nombre === "")
          // .setIn(['confEtapas','errores','errorPlazaBusqueda'],etapasArray.plazaDestinoSeleccionada.id === "")
          .setIn(['confEtapas','errores','errorPuestoUsuario'],etapasArray.rolUsuarioSelected.id === "")
          .setIn(['confEtapas','errores','errorNombreEtapa'],etapasArray.nombreEtapa.trim() === "")
          .setIn(['confEtapas','errores','errorHoraInicio'],etapasArray.horaInicio1.trim() === "")
          .setIn(['confEtapas','errores','errorHoraFin'],etapasArray.horaFin1.trim() === "")
          .setIn(['confEtapas','errores','errorTiempoSLA'],etapasArray.tiempoSla1 <= 0)
          .setIn(['confEtapas','errores','errorDependencia'],errorDependencia)
      }
 
      const etapa = {
        // eslint-disable-next-line no-undef
        IdEtapa:nextId ,
        IdTempo: nextId,
        IdPlaza : etapasArray.plazaSelected.id,
        Etapa:etapasArray.nombreEtapa ,
        Plaza:etapasArray.plazaSelected.nombre,
        Puesto:etapasArray.radioRol==="Rol" ? etapasArray.rolUsuarioSelected.nombre : "No Aplica",
        Responsable:etapasArray.radioRol==="Usuario" ? etapasArray.rolUsuarioSelected.nombre : "No Aplica",
        TiempoDeSLA: tiempoSla1 + tiempoSla2, 
        IdDependencia:etapasArray.dependenciaSeleccionada.id !=="" ? etapasArray.dependenciaSeleccionada.id  : "",
        Dependencia:etapasArray.dependenciaSeleccionada.nombre !== "" ? etapasArray.dependenciaSeleccionada.nombre : 'Sin dependencia',
        configuracion:camposEspecialesArray,
        requiereSeguimiento: etapasArray.requiereSeguimiento,
        rolUsuarioSelected:etapasArray.rolUsuarioSelected,
        activarRadioRol: etapasArray.activarRadioRol,
        permitirCancelacion: etapasArray.permitirCancelacion,
        plazaDestinoSeleccionada: etapasArray.plazaDestinoSeleccionada,
        plazaSelected: etapasArray.plazaSelected,
        reglas:reglaModificada,
        tiempos:[
          {
            horaInicio : etapasArray.horaInicio1,
            horaFin: etapasArray.horaFin1,
            SLA: tiempoSla1,
          },
          {
            horaInicio : etapasArray.horaInicio2,
            horaFin: etapasArray.horaFin2,
            SLA: tiempoSla2,
          }],
        catalagos:[],
        Activo:false,
        usuarios,
        puestos,
        IdUsuario:etapasArray.radioRol==="Usuario" ? etapasArray.rolUsuarioSelected : null,
        orden: "",
        temporal:true,
      }
      // Quiza aqui no deberias agregar la etapa si no que en el guardar una vez ya agregada (Silva)
      // Este comportamiento pega para que se duplique

      etapaTemporal.push(etapa)

      // CABECERAS TABLA ETAPAS
      const cabeceras =  [{name: "IdEtapa",options: {display: "false"}},
        {name: "Etapa", label: "Etapa"},
        {name: "TiempoDeSLA", label: "Tiempo de SLA"},
        {name: "Plaza",options: {display: "false"}},
        {name: "Dependencia", label: "Dependencia"},  
        {name: "Responsable", label: "Responsable"},
        {name: "Puesto", label: "Puesto"},
        {name: "options",options: {sort: false, filter: false, searchable: false}}]
      const cabecerasPlazas =  [
        {name:""},
        {name: "IdPlaza"},
        "Plaza",
        {name: "Etapas"},
        {name: "options", label: " "}]

            
      if(flag === false || dataPlazaArray.length === 1  ){
        
        return state.updateIn(['tabla'], (tabla) => tabla.merge({
          datosPlaza: dataPlazaArray, 
          etapasTemporales: etapaTemporal,
          etapa : 0,
          datosEtapa : filter(etapaTemporal,['IdPlaza',PlazaConfigurada.id]),
          cabecerasEtapa:cabeceras,
          idPlaza : etapa.IdPlaza,
          cabecerasPlaza : cabecerasPlazas,
        }))
          .setIn(['stepper'],2)
          .set('configuracion', initialState.get('configuracion'))
          .set('etapas', initialState.get('etapas'))
          .setIn(['confEtapas','validacionesConfEtapas'],true)
          .setIn(['confEtapas','errores','errorPlaza'],etapasArray.plazaSelected.id === ""||etapasArray.plazaSelected.nombre === "")
          .setIn(['confEtapas','errores','errorPlazaBusqueda'],etapasArray.plazaDestinoSeleccionada.id === "")
          .setIn(['confEtapas','errores','errorPuestoUsuario'],etapasArray.rolUsuarioSelected.id === "")
          .setIn(['confEtapas','errores','errorNombreEtapa'],etapasArray.nombreEtapa.trim() === "")
          .setIn(['confEtapas','errores','errorHoraInicio'],etapasArray.horaInicio1.trim() === "")
          .setIn(['confEtapas','errores','errorHoraFin'],etapasArray.horaFin1.trim() === "")
          .setIn(['confEtapas','errores','errorTiempoSLA'],etapasArray.tiempoSla1 < 0)
          // .setIn(['confEtapas','errores','errorDependencia'],errorDependencia)
      }
      return state
    }

    // ---------------------------------------------------

    case ACTION('AGREGAR_CAMPOS_ESPECIALES_ETAPA'):{
      return state.updateIn(['tabla'], (tabla) => tabla.merge({ 
        etapa : 1,
        idPlaza : 0,

      }))
    }
  

    case ACTION('CHANGE_ETAPA'):{ 

      const plazasArray = state.getIn(['tabla','datosPlaza']);
      const dataPlazaArray = JSON.parse(JSON.stringify(plazasArray));

      const getEtapasTemporales = state.getIn(['tabla','etapasTemporales'])
      const etapasTemp = JSON.parse(JSON.stringify(getEtapasTemporales))

      const getDatosEtapa = state.getIn(['tabla','datosEtapa'])
      const datosEtapa = JSON.parse(JSON.stringify(getDatosEtapa))
      const datosEtapasBorradasArray= state.getIn(['tabla', 'datosEtapasBorradas']);
      const datosEtapasBorradas = JSON.parse(JSON.stringify(datosEtapasBorradasArray));

      datosEtapa.forEach((datos) => {
        datos.Activo = true
      })
      etapasTemp.forEach((datos) => {
        datos.Activo = true
      })

      // Validacion de las diferencias entre las etapasTemporales y las datosEtapa 
      // si ya no existen quedarme con los que ya no existen seran mis borrados

      const plazaId = state.getIn(['tabla','idPlaza']); 
      const plazaSeleccionada =  find(dataPlazaArray, { 'IdPlaza': plazaId});

      etapasTemp.forEach((etapaTemporal) => {

        let borrado = false

        if (etapaTemporal.IdPlaza === plazaSeleccionada.IdPlaza) {
          borrado = true
          datosEtapa.forEach((dEtapa) => {
            if(etapaTemporal.IdEtapa === dEtapa.IdEtapa){
              borrado = false
            }            
          })
        }

        if (borrado){
          etapaTemporal.Activo = false          
          datosEtapasBorradas.push(etapaTemporal);
          // etapasTemp.splice(index,1)
        }        
      })


      for (let index = 0; index < etapasTemp.length; index++) {
        datosEtapasBorradas.forEach((etapaB) => {
          if(etapasTemp[index].IdEtapa === etapaB.IdEtapa && etapasTemp[index].IdPlaza === etapaB.IdPlaza){
            etapasTemp.splice(index,1)
          }
        })
      }

      dataPlazaArray.forEach((plaza) => {
        plaza.numeroEtapas = 0
        etapasTemp.forEach((etapa) => {
          if(plaza.IdPlaza === etapa.IdPlaza){
            plaza.numeroEtapas += 1
          }
        })
        const pos = plaza.Etapas.replace(plaza.Etapas.charAt(0),plaza.numeroEtapas);
        plaza.Etapas = pos
        
      })
      
      const nuevosDatosBorrados =   datosEtapasBorradas
      
      if(!find(datosEtapa, {IdPlaza: plazaSeleccionada.IdPlaza})) {
        remove(dataPlazaArray, {
          IdPlaza: plazaSeleccionada.IdPlaza,
        });
      }      

      return state.updateIn(['tabla'], (tabla) => tabla.merge({
        etapa : 1,
        idPlaza : 0,
        datosPlaza:dataPlazaArray,
        etapasTemporales:etapasTemp,
        datosEtapasBorradas:nuevosDatosBorrados,
      }))
    }

    
    case ACTION('EDITAR_ETAPA'):{
      const getDatosEtapas = state.getIn(['tabla','datosEtapa'])
      const datosE = JSON.parse(JSON.stringify(getDatosEtapas))
      const configuracionEtapa =find(datosE,['IdEtapa',action.id])

      const getEtapasTempo = state.getIn(['tabla','etapasTemporales'])
      const etapasTemp = JSON.parse(JSON.stringify(getEtapasTempo))
      const etapaTempo =find(etapasTemp,['IdEtapa',action.id])

      const plazasArray = state.getIn(['confEtapas','plazasDestino']);
      const dataPlazaArray = JSON.parse(JSON.stringify(plazasArray));
      const pl = state.getIn(['tabla','idPlaza']);
      const plazaid = JSON.parse(JSON.stringify(pl));
      const plaza =find(dataPlazaArray,['IdPlaza',plazaid || configuracionEtapa.IdPlaza])     
      configuracionEtapa.reglas = etapaTempo.reglas
      configuracionEtapa.tiempos = etapaTempo.tiempos      

      let reglasArray = configuracionEtapa.reglas.length > 0 ?  
        reglasArray =  configuracionEtapa.reglas
        : [
          {
            nombre:'Se muestra etapa si la regla se cumple',
            config:[
              {
                valores:'',
                errorValores:false,
                campo:'',
                errorCampo:false,
                condicion:'',
                errorCondicion:false,
                valor:'',
                errorValor:false,
                campoEspecial:false,
                componentes:[
                  {config:{nomCampo:"titulo"}},
                ],
                IdEtapa:null,
                IdRegla:null,
                nombreEtapa:"",
              },
            ],
          },
        ]

      if(!reglasArray[0].config){
        reglasArray = [
          {
            nombre:'Se muestra etapa si la regla se cumple',
            config: reglasArray.map(item => ({
              campo: item.IdCampo,
              condicion: item.IdCondicion,
              valor: item.Valor,
              nombre: "Se muestra etapa si la regla se cumple",
              valores: item.Valores,
              campoEspecial:item.campoEspecial,
              componentes: item.componentes,
              IdEtapa:item.IdEtapa,
              IdRegla:item.IdRegla,
              nombreEtapa:item.nombreEtapa,
            })),
          },
        ];
        
      }

      // eslint-disable-next-line no-empty
      if(moment.utc(configuracionEtapa.tiempos[0].horaInicio).format("hh:mm:ss") === 'Invalid date'){
      }else{
        configuracionEtapa.tiempos[0].horaInicio = moment.utc(configuracionEtapa.tiempos[0].horaInicio).format("hh:mm:ss")
        configuracionEtapa.tiempos[0].horaFin = moment.utc(configuracionEtapa.tiempos[0].horaFin).format("hh:mm:ss")
      }

      if(configuracionEtapa.tiempos[1]){
        // eslint-disable-next-line no-empty
        if(moment.utc(configuracionEtapa.tiempos[1].horaInicio).format("hh:mm:ss") === 'Invalid date'){
        }
        else{
          configuracionEtapa.tiempos[1].horaInicio = moment.utc(configuracionEtapa.tiempos[1].horaInicio).format("hh:mm:ss")
          configuracionEtapa.tiempos[1].horaFin = moment.utc(configuracionEtapa.tiempos[1].horaFin).format("hh:mm:ss")
        }
      }

      let tipoBusquedaArray =[]
      if(configuracionEtapa.IdUsuario){
        if(configuracionEtapa.IdUsuario.id){
          configuracionEtapa.IdUsuario = configuracionEtapa.IdUsuario.id        
        }        
      }

      if(configuracionEtapa.IdUsuario !== undefined){
        tipoBusquedaArray = configuracionEtapa.usuarios
      }else{
        tipoBusquedaArray =configuracionEtapa.puestos
      }
       
      
      // if(configuracionEtapa.IdDependencia > 0){
      //   etapasTemporales.forEach((etapa,index) => { 
      //     if(index === configuracionEtapa.IdDependencia -1){
      //       configuracionEtapa.IdDependencia  =  etapa.IdEtapa
      //     }
      //   })
      // }
      // --------------------------------------------------------
      
      if(isArray(configuracionEtapa.configuracion)){
        if(configuracionEtapa.configuracion[0].componentes){
          // configuracionEtapa.configuracion.componentes = configuracionEtapa.configuracion[0].componentes 
          configuracionEtapa.configuracion.componentes = configuracionEtapa.configuracion.componentes 
        }else{
          // eslint-disable-next-line prefer-destructuring
          // configuracionEtapa.configuracion.componentes = configuracionEtapa.configuracion[0]
          configuracionEtapa.configuracion.componentes = configuracionEtapa.configuracion
        }
      }
      
      if(!isArray(configuracionEtapa.configuracion.componentes)){
        configuracionEtapa.configuracion.componentes = [configuracionEtapa.configuracion.componentes]
      }
      
      // --------------------------------------------------------
      //  return            
      return state
        .updateIn(['confEtapas'], (confEtapas) => confEtapas.merge({
          plazaDestinoSeleccionada:  {id:configuracionEtapa.plazaDestinoSeleccionada.id || configuracionEtapa.plazaDestinoSeleccionada || ''},
          plazaSelected: {
            'id':configuracionEtapa.IdPlaza,
            'nombre':configuracionEtapa.Plaza || plaza.Nombre || '' ,
          },
          rolUsuarioSelected: configuracionEtapa.rolUsuarioSelected !== null ?  {id:configuracionEtapa.rolUsuarioSelected.id || 
            
            configuracionEtapa.rolUsuarioSelected, nombre:configuracionEtapa.rolUsuarioSelected.nombre} :
            {id:configuracionEtapa.IdUsuario},

          requiereSeguimiento:configuracionEtapa.requiereSeguimiento,
          nombreEtapa:configuracionEtapa.Etapa || configuracionEtapa.NombreEtapa  ,
          dependenciaSeleccionada : {id:configuracionEtapa.IdDependencia},
          dependencias:configuracionEtapa.dependencias,
          tipoBusquedaUsuarios:tipoBusquedaArray,
          radioRol:configuracionEtapa.Puesto !== "No Aplica" ? "Rol" : "Usuario",
          activarRadioRol:configuracionEtapa.activarRadioRol,
          permitirCancelacion:configuracionEtapa.permitirCancelacion,
          puesto:configuracionEtapa.Puesto,
          responsable:configuracionEtapa.Responsable,
          actualizarEtapa:true,
          etapaEnEdicion:action.id,
          tiempoSla1:configuracionEtapa.tiempos[0].SLA,
          horaInicio1:configuracionEtapa.tiempos.length > 0 ? configuracionEtapa.tiempos[0].horaInicio : "",
          horaFin1:configuracionEtapa.tiempos.length > 0 ?  configuracionEtapa.tiempos[0].horaFin : "",
          tiempoSla2:configuracionEtapa.tiempos.length > 1 ? configuracionEtapa.tiempos[1].SLA : "",
          horaInicio2:configuracionEtapa.tiempos.length > 1 ? configuracionEtapa.tiempos[1].horaInicio : "",
          horaFin2:configuracionEtapa.tiempos.length > 1 ?  configuracionEtapa.tiempos[1].horaFin : "",
          temporal:configuracionEtapa.temporal,
        }))
        .updateIn(['configuracion'], (configuracion) => configuracion.merge({
          componentes:configuracionEtapa.configuracion !== undefined ? configuracionEtapa.configuracion.componentes : [],
        }))
        .updateIn(['etapas'], (etapas) => etapas.merge({
          reglas:reglasArray !== undefined ? reglasArray : [],
        }))
        .setIn(['stepper'],1)
        .setIn(['tabla','etapa'],0)
        .setIn(['confEtapas', 'plazaDestinoSeleccionada'],{id:configuracionEtapa.plazaDestinoSeleccionada.id || configuracionEtapa.plazaDestinoSeleccionada})
    }

    case ACTION('ACTUALIZAR_ETAPA_TEMPORAL'):{   
      const arregloEtapasTemporales = state.getIn(['tabla','etapasTemporales'])
      const etapasTemp = JSON.parse(JSON.stringify(arregloEtapasTemporales))
      const datosEtapasArray = state.getIn(['tabla','datosEtapa'])
      const datosEtapa = JSON.parse(JSON.stringify(datosEtapasArray))
      const arregloEtapa = state.getIn(['confEtapas'])
      const configuracionEtapa = JSON.parse(JSON.stringify(arregloEtapa)) 
      
      const etapaEnEdicion = find(etapasTemp,['IdEtapa',configuracionEtapa.etapaEnEdicion])
      // const array = _.filter(etapasTemp, { 'IdEtapa': configuracionEtapa.etapaEnEdicion, 'IdPlaza': configuracionEtapa.plazaSelected.id });

      const index = findIndex(etapasTemp, {IdEtapa: etapaEnEdicion.IdEtapa});      

      const tiempoSla1 = parseInt(configuracionEtapa.tiempoSla1) 
      const tiempoSla2 = parseInt(configuracionEtapa.tiempoSla2) 
      const camposEspeciales = state.getIn(['configuracion']);
      const camposEspecialesArray =JSON.parse(JSON.stringify(camposEspeciales));
      
      //  return
      const reglasArray = state.getIn(['etapas']); // regla
      const reglasEtapa =JSON.parse(JSON.stringify(reglasArray));
      
      let reglas = []
      if(reglasEtapa.reglas.length > 0){

        reglas = reglasEtapa.reglas.config === undefined ? [{
          nombre:reglasEtapa.reglas[0].Nombre || reglasEtapa.reglas[0].nombre,
          config: reglasEtapa.reglas[0].config.map(item => ({
            campo: item.campo,
            condicion: item.condicion,
            valor: item.valor,
            nombre: "Se muestra etapa si la regla se cumple",
            valores: item.valores,
            campoEspecial:item.campoEspecial,
            componentes: item.componentes,
            IdEtapa:item.IdEtapa,
            IdRegla:item.IdRegla,
            nombreEtapa:item.nombreEtapa,
  
          })),
        }] : [];
      }else{
        reglas=[
          {
            nombre:'Se muestra etapa si la regla se cumple',
            config:[
              {
                valores:'',
                errorValores:false,
                campo:'',
                errorCampo:false,
                condicion:'',
                errorCondicion:false,
                valor:'',
                errorValor:false,
                campoEspecial:false,
                componentes:[
                  {config:{nomCampo:"titulo"}},
                ],
                IdEtapa:null,
                IdRegla:null,
                nombreEtapa:'',
              },
            ],            
          },
        ]
        
      }      
      
      if(configuracionEtapa.rolUsuarioSelected){    
        if(configuracionEtapa.rolUsuarioSelected.id){
          configuracionEtapa.rolUsuarioSelected = configuracionEtapa.rolUsuarioSelected.id
        }
      }
      const busqueda = state.getIn(['confEtapas','tipoBusquedaUsuarios'])
      const tipoBusqueda = JSON.parse(JSON.stringify(busqueda))

      const usuarioPuesto =  find(tipoBusqueda, {NoEmpleado: configuracionEtapa.rolUsuarioSelected }) ||
      find( tipoBusqueda, {IdPuesto: configuracionEtapa.rolUsuarioSelected })

      const  TiempoDeSLA = tiempoSla1 + tiempoSla2
      if(configuracionEtapa.horaInicio1.trim() === "" || configuracionEtapa.horaFin1.trim() === "" || configuracionEtapa.tiempoSla1 <=0 || 
      configuracionEtapa.plazaSelected.id === ""  || configuracionEtapa.plazaSelected.nombre === ""||configuracionEtapa.rolUsuarioSelected.id === "" 
        || configuracionEtapa.plazaDestinoSeleccionada.id === "" || configuracionEtapa.nombreEtapa.trim() === "" ){
        return state.setIn(['confEtapas','validacionesConfEtapas'],false)
          .setIn(['confEtapas','errores','errorPlaza'],configuracionEtapa.plazaSelected.id=== ""||configuracionEtapa.plazaSelected.nombre === "")
          .setIn(['confEtapas','errores','errorPlazaBusqueda'],configuracionEtapa.plazaDestinoSeleccionada.id === "")
          .setIn(['confEtapas','errores','errorPuestoUsuario'],configuracionEtapa.rolUsuarioSelected.id === "")
          .setIn(['confEtapas','errores','errorNombreEtapa'],configuracionEtapa.nombreEtapa.trim() === "")
          .setIn(['confEtapas','errores','errorHoraInicio'],configuracionEtapa.horaInicio1.trim() === "")
          .setIn(['confEtapas','errores','errorHoraFin'],configuracionEtapa.horaFin1.trim() === "")
          .setIn(['confEtapas','errores','errorTiempoSLA'],configuracionEtapa.tiempoSla1 <= 0)
      }

      // camposEspecialesArray = camposEspecialesArray.push(camposEspecialesArray.componentes)
      if(isNumber(configuracionEtapa.dependenciaSeleccionada.id)){
        configuracionEtapa.Dependencia = datosEtapa[configuracionEtapa.dependenciaSeleccionada.id].Etapa
      }
      
      
      
      const etapa = {
        // eslint-disable-next-line no-undef
        IdEtapa:etapaEnEdicion.IdEtapa,
        IdTempo:etapaEnEdicion.IdTempo,
        IdPlaza : configuracionEtapa.plazaSelected.id,
        IdUsuario : configuracionEtapa.radioRol==="Usuario" ? configuracionEtapa.rolUsuarioSelected : null,
        Etapa:configuracionEtapa.nombreEtapa,
        Plaza:configuracionEtapa.plazaSelected.nombre,
        Puesto:configuracionEtapa.radioRol==="Rol" ? usuarioPuesto.Nombre : "No Aplica",
        Responsable:configuracionEtapa.radioRol==="Usuario" ? configuracionEtapa.responsable : "No Aplica",
        TiempoDeSLA,
        IdDependencia:configuracionEtapa.dependenciaSeleccionada.id,
        Dependencia:configuracionEtapa.Dependencia,
        configuracion:camposEspecialesArray.componentes,
        requiereSeguimiento: configuracionEtapa.requiereSeguimiento,
        rolUsuarioSelected:configuracionEtapa.rolUsuarioSelected,
        activarRadioRol: configuracionEtapa.activarRadioRol,
        permitirCancelacion: configuracionEtapa.permitirCancelacion,
        plazaDestinoSeleccionada: configuracionEtapa.plazaDestinoSeleccionada,
        plazaSelected:configuracionEtapa.plazaSelected,
        reglas,
        tiempos:[
          {
            horaInicio : configuracionEtapa.horaInicio1,
            horaFin: configuracionEtapa.horaFin1,
            SLA: tiempoSla1,
            IdEtapa: etapaEnEdicion.IdEtapa,
            idTiempo: etapaEnEdicion.tiempos[0].idTiempo,
          },
          {
            horaInicio : configuracionEtapa.horaInicio2,
            horaFin: configuracionEtapa.horaFin2,
            SLA: tiempoSla2,
            IdEtapa: etapaEnEdicion.IdEtapa,
            idTiempo: etapaEnEdicion.tiempos.length > 1? etapaEnEdicion.tiempos[1].idTiempo : null,
          }],
        catalagos:[],
        usuarios: configuracionEtapa.usuarios,
        puestos : configuracionEtapa.puestos,
        temporal : configuracionEtapa.temporal,
      }

      
      etapasTemp.forEach((item,idx) => {
        if(item.IdEtapa === etapa.IdEtapa && etapa.IdPlaza === item.IdPlaza){
          etapasTemp.splice(idx,1,etapa)
        }
        
      })
      // etapasTemp.splice(index, 1, etapa)
      const plazasArray = state.getIn(['tabla','datosPlaza']);
      const dataPlazaArray = JSON.parse(JSON.stringify(plazasArray));
      dataPlazaArray.forEach((plaza) => {
        plaza.numeroEtapas = 0
        etapasTemp.forEach((item) => {
          if(plaza.IdPlaza === item.IdPlaza){
            plaza.numeroEtapas += 1
          }
        })
        const pos = plaza.Etapas.replace(plaza.Etapas.charAt(0),plaza.numeroEtapas);
        plaza.Etapas = pos
        
      })
      return state.updateIn(['tabla'], (tabla) => tabla.merge({
        datosEtapa:   etapasTemp,
        etapasTemporales: etapasTemp,
        etapa : 1,
        datosPlaza:dataPlazaArray,
      }))
        .setIn(['stepper'],2)
        .set('confEtapas', initialState.get('confEtapas'))
        .setIn(['tabla','idPlaza'],0)
        .set('configuracion', initialState.get('configuracion'))
        .set('etapas', initialState.get('etapas'))
        .setIn(['confEtapas','validacionesConfEtapas'],true)
        .setIn(['confEtapas','errores','errorPlaza'],configuracionEtapa.plazaSelected.id=== ""||configuracionEtapa.plazaSelected.nombre === "")
        .setIn(['confEtapas','errores','errorPlazaBusqueda'],configuracionEtapa.plazaDestinoSeleccionada.id === "")
        .setIn(['confEtapas','errores','errorPuestoUsuario'],configuracionEtapa.rolUsuarioSelected.id === "")
        .setIn(['confEtapas','errores','errorNombreEtapa'],configuracionEtapa.nombreEtapa.trim() === "")
        .setIn(['confEtapas','errores','errorHoraInicio'],configuracionEtapa.horaInicio1.trim() === "")
        .setIn(['confEtapas','errores','errorHoraFin'],configuracionEtapa.horaFin1.trim() === "")
        .setIn(['confEtapas','errores','errorTiempoSLA'],configuracionEtapa.tiempoSla1 <= 0)
    }


    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/CLONAR_ETAPAS':{        
      const getEtapas = state.getIn(['tabla','datosEtapa'])
      const etapas = JSON.parse(JSON.stringify(getEtapas))
      const getEtapasTempo = state.getIn(['tabla','etapasTemporales'])
      const etapasTemporales = JSON.parse(JSON.stringify(getEtapasTempo))
      const rows = action.rows.data 

      etapas.forEach((etapa) => { 
        etapa.IdDependencia = ""
        etapa.Dependencia = "Sin Dependencia"
        etapasTemporales.forEach((tempo) => { 
          if(tempo.IdEtapa === etapa.IdEtapa){
            etapa.reglas = tempo.reglas
            etapa.reglas.forEach((regla) => {
              regla.IdRegla = null
              regla.IdEtapa = null
            })
            etapa.tiempos.forEach((tiempo) => {
              tiempo.IdEtapa = null
              tiempo.idTiempo = undefined
            })
          }          
        })
      })
      
      const etapasIndex = action.data
      const etapasSeleccionadas = []
      const etapasClon = []
      
      etapasIndex.forEach((etapa,index) => { 
        rows.forEach((row) => { 
          if(index === row.dataIndex){
            etapasSeleccionadas.push(etapa)
          }
        })
      })

      etapasSeleccionadas.forEach((item,indexEtapasSeleccionadas) => { 
        etapas.forEach((etapa,index) => { 
          if(index === indexEtapasSeleccionadas){
            etapasClon.push(etapa)
          }
        })
      })

      return state.setIn(['tabla','modalClonar'],true)
        .setIn(['tabla','etapasClonadas'],etapasClon)
    }
     
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/CLONAR_ETAPAS_PLAZAS':{      
      const getEtapasClon = state.getIn(['tabla','etapasClonadas'])
      const etapasClonadas = JSON.parse(JSON.stringify(getEtapasClon))
      const plazaId = state.getIn(['tabla','plazaClonSeleccionada'])
      const plazasArray = state.getIn(['tabla','datosPlaza']);
      const dataPlazaArray = JSON.parse(JSON.stringify(plazasArray));
      etapasClonadas.forEach((item) => {  
        item.idPlaza = plazaId
      })

      const getEtapas = state.getIn(['tabla','etapasTemporales'])
      const etapas = JSON.parse(JSON.stringify(getEtapas))
      const maximo = maxBy(etapas, 'IdEtapa');
      const plaza =find(dataPlazaArray,['IdPlaza',plazaId])
      
      etapasClonadas.forEach((clon) => {
        clon.IdPlaza = plazaId
        clon.IdEtapa = maximo.IdEtapa+1
        clon.IdTempo = maximo.IdTempo+1
        clon.Plaza = plaza.Plaza        
        etapas.push(clon)
      })
      

      return state.updateIn(['tabla'], (tabla) => tabla.merge({
        etapasTemporales: etapas,
        modalClonar : false,
      }))
    }

    case ACTION('HANDLE_CHANGE_PLAZA_CLON'):{  
      return state.setIn(['tabla', 'plazaClonSeleccionada'],action.event.id)
    }
    

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/CERRAR_CLONACION':{
      return state.setIn(['tabla', 'modalClonar'],false)
        .setIn(['tabla', 'plazaClonSeleccionada'],[])
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_CATALOGOS_ACTION':{
      return state
        .setIn(['configuracion', 'arrCatalogos'], List(action.data))
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_VALUE_SELECTS_CATALOGOS_ACTION':{
      const {
        value,
        divSelecionado,
        data,
      } = action;
      const plazaImmutable = state.getIn(['confEtapas','plazaSelected']); 
      let plaza= JSON.parse(JSON.stringify(plazaImmutable));
      const plazaId = state.getIn(['tabla','idPlaza']); 
      if(plaza === undefined){
        plaza= {id:plazaId}
      }
      const arr = JSON.parse(JSON.stringify(data))
      return state
        .setIn(['configuracion','componentes',divSelecionado,'config', 'valorNumero'], fromJS(value))
        .setIn(['configuracion','componentes',divSelecionado,'config', 'relaciones'], List(arr))
        .setIn(['configuracion','componentes',divSelecionado,'config','plazaId'],plaza.id);
    }

    case ACTION('SET_COMPONENTES_CONFIGURACION'):{            
      return state.setIn(['configuracionComponentes'], action.data.componentes)
    }
    
    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_OBLIGATORIO_RELACION_ACTION':{
      return state
        .setIn(['configuracion','componentes',action.divSelecionado,'config','requeridoRelacion'], action.checked);
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_SWITCH_RELACIONA_OTRO_ACTION':{
      return state
        .setIn(['configuracion','componentes',action.divSelecionado,'config','relacionaOtro'], action.checked);
    }

    case CHANGE_REDIRECT: {
      return state.set('redirect', !state.get('redirect'))
      // .set('configuracion', initialState.get('configuracion')).set('tabla', initialState.get('tabla'))
      // .set('confEtapas', initialState.get('confEtapas'))
    }

    case INICIALIZAR_ESTADO: {      
      return state
        .set('tabla', initialState.get('tabla'))
        // .set('configuracion', initialState.get('configuracion'))
        .set('etapas', initialState.get('etapas'))
        .set('confEtapas', initialState.get('confEtapas'))   
    }

    case VACIAR_ESTADO: {
      return state
        .set('tabla', initialState.get('tabla'))
    }

    case ACTION('AJUSTAR_CAMPO_ETAPAS'):{     
      const getEtapas = state.getIn(['tabla','etapasTemporales'])
      const etapas = JSON.parse(JSON.stringify(getEtapas))
      const plazasArray = state.getIn(['tabla','datosPlaza']);
      const dataPlazaArray = JSON.parse(JSON.stringify(plazasArray));
      dataPlazaArray.forEach((plaza) => {
        plaza.numeroEtapas = 0
        etapas.forEach((etapa) => {
          if(plaza.IdPlaza === etapa.IdPlaza){
            plaza.numeroEtapas += 1
          }
        })
        const pos = plaza.Etapas.replace("1",plaza.numeroEtapas);
        plaza.Etapas = pos
      })
      
      return state.updateIn(['tabla'], (tabla) => tabla.merge({
        datosPlaza:   dataPlazaArray,
      }))
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

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REQUIERE_SEGUIMIENTO':{
      
      return state.setIn(['confEtapas','requiereSeguimiento'], action.requiere.seguimiento)
        .setIn(['confEtapas','numeroPuestos'], action.requiere.numeroPuestos);
    }

    case ACTION('ABRIR_MODAL_BORRADO'):{      
      return state.setIn(['tabla','modalBorrado'], true)
        .setIn(['tabla','idEtapaBorrar'], action.id)
    }

    case ACTION('CERRAR_MODAL_BORRADO'):{      
      return state.setIn(['tabla','modalBorrado'], false)
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REDIRIGIR_CAMPOS_ESPECIALES':{   
      return state.setIn(['configuracion','soloConfigEspeciales'],true).setIn(['stepper'],0)
    }

    

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/DESACTIVAR_CONF':{
      
      return state.setIn(['configuracion','salirConfiguracion'],false)
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/GUARDAR_ESPECIALES_PDP':{
      
      const config = state.getIn(['configuracion']); 
      const configObject = JSON.parse(JSON.stringify(config))
      const IdEtapa = state.getIn(['configuracion','IdEtapa']); 
      const tiempos = state.getIn(['configuracion','tiempos']);
      

      const etapas = [{
        Activo:true,
        Dependencia:   "Sin Dependencia",
        Etapa:  "Etapa Plan de Trabajo",
        IdDependencia:'',
        IdEtapa: IdEtapa !=="" ? IdEtapa :"",
        IdPlaza: 2,
        IdTiempo: 1,
        IdUsuario:null,
        Plaza:  "CULIACAN",
        plazaDestinoSeleccionada: {id:2,nombre:"CULIACAN"},
        plazaSelected: {id:2,nombre:"CULIACAN"},
        Puesto: "Analista de Sistemas",
        Responsable: "No Aplica",
        TiempoDeSLA: 1,
        activarRadioRol: true,
        permitirCancelacion: false,
        reglas:[
          {
            nombre:'Se muestra etapa si la regla se cumple',
            config:[
              {
                valores:'',
                errorValores:false,
                campo:'',
                errorCampo:false,
                condicion:'',
                errorCondicion:false,
                valor:'',
                errorValor:false,
                campoEspecial:false,
                componentes:[
                  {config:{nomCampo:"titulo"}},
                ],
                IdEtapa:IdEtapa !=="" ? IdEtapa :null,
                IdRegla:null,
                nombreEtapa:'',
              },
            ],            
          },
        ],
        configuracion:configObject,
        requiereSeguimiento: false,
        rolUsuarioSelected:  {id: 531, nombre: "Analista de Sistemas"},
        tiempos: tiempos.length > 0 ? tiempos:
          [
            {horaInicio: "01:00", horaFin: "01:00", SLA: 1},
            {horaInicio: "", horaFin: "", SLA: 0},
          ],
        usuarios:[],
        puestos : [],
        IdEtapaMaximo : '',
        temporal : '',
      }]

      return state.setIn(['configuracion','datosEtapas'],etapas)
        .setIn(['configuracion','salirConfiguracion'],true)
        
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/AJUSTAR_CAMPOS_ESPECIALES':{
      const configObject = JSON.parse(JSON.stringify(action.componentes))
      const config = state.getIn(['configuracion']); 
      const IdEtapa = state.getIn(['configuracion','IdEtapa']); 
      const tiempos = state.getIn(['configuracion','tiempos']);
      
      const etapas = [{
        Activo:true,
        Dependencia:   "Sin Dependencia",
        Etapa:  "Etapa Plan de Trabajo",
        IdDependencia:'',
        IdEtapa: IdEtapa !=="" ? IdEtapa :"",
        IdPlaza: 9,
        IdTiempo: 1,
        IdUsuario:null,
        Plaza:  "CORPORATIVO",
        plazaDestinoSeleccionada: {id:9,nombre:"CORPORATIVO"},
        plazaSelected: {id:9,nombre:"CORPORATIVO"},
        Puesto: "Analista de Sistemas",
        Responsable: "No Aplica",
        TiempoDeSLA: 1,
        activarRadioRol: true,
        permitirCancelacion: false,
        reglas:[
          {
            nombre:'Se muestra etapa si la regla se cumple',
            config:[
              {
                valores:'',
                errorValores:false,
                campo:'',
                errorCampo:false,
                condicion:'',
                errorCondicion:false,
                valor:'',
                errorValor:false,
                campoEspecial:false,
                componentes:[
                  {config:{nomCampo:"titulo"}},
                ],
                IdEtapa:IdEtapa !=="" ? IdEtapa :null,
                IdRegla:null,
                nombreEtapa:'',
              },
            ],            
          },
        ],
        configuracion:configObject,
        requiereSeguimiento: true,
        rolUsuarioSelected:  {id: 531, nombre: "Analista de Sistemas"},
        tiempos: tiempos.length > 0 ? tiempos:
          [
            {horaInicio: "01:00", horaFin: "01:00", SLA: 1},
            {horaInicio: "", horaFin: "", SLA: 0},
          ],
        usuarios:[],
        puestos : [],
        IdEtapaMaximo : '',
        temporal : '',
      }]

      //       return state
      //         .setIn(['configuracion','salirConfiguracion'],true)
      return state.setIn(['configuracion','datosEtapas'],[])
        .set('configuracion', initialState.get('configuracion'))
        .setIn(['configuracion','componentes'],configObject)
        .setIn(['configuracion','IdEtapa'],action.IdEtapa !==""? action.IdEtapa : "")
        .setIn(['configuracion','tiempos'],action.tiempos !==""? action.tiempos : "")
        .setIn(['configuracion','componentesIniciales'],configObject)
        .setIn(['configuracion','datosEtapas'],etapas)
    }

    case 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REDIRIGIR_CONF':{
      const arr = state.getIn(['configuracion','componentes']); 
      console.log(coomponentes,"LOS COMPONENENTES INICIALES");
      
      const coomponentes = JSON.parse(JSON.stringify(arr))
      return state.setIn(['configuracion','salirConfiguracion'],true)
        .setIn(['configuracion','componentesIniciales'],coomponentes)
        // .set('configuracion', initialState.get('configuracion'))
        
    }
    // numeroPuestos

    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default configuracionCamposEspecialesReducer;
