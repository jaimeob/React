/* eslint-disable no-multi-assign */
/*
 *
 * PlanDeTrabajo reducer
 *
 */

import { fromJS } from 'immutable';
import { filter,parseInt,isArray,startCase,find,isEqual} from 'lodash';
import STATE from './state';
import Actions from './actions';


export const initialState = fromJS(STATE);

const ACTION = (name = '') => Actions.get(name).id;

function planDeTrabajoReducer(state = initialState, action) {

  switch (action.type) {

    // ACCIONES JAIME  ---------------------------------------------------||   ( ͡° ͜ʖ ͡°)

    // PORTAFOLIOS ---------------------------//
    case ACTION('ABRIR_MODAL_FORMULARIO'):{
      return state.setIn(['portafolios','modalFormulario'], true)
        .setIn(['portafolios','nombrePortafolio'], '')
        .setIn(['portafolios','colorPortafolio'],{hex:"rgb(248, 231, 28)"})
        .setIn(['portafolios','idPortafolio'], '')
        .setIn(['portafolios','idxPortafolio'], "")
        
    }
    case ACTION('CERRAR_MODAL_FORMULARIO'):{
      return state.setIn(['portafolios','modalFormulario'], false)
        .setIn(['portafolios','nombrePortafolio'], "")
        .setIn(['portafolios','colorPortafolio'],{hex:"rgb(248, 231, 28)"})
        .setIn(['portafolios','abrirPop'], false)
        .setIn(['portafolios','errores','errorNombrePortafolio'], false)
    }
    case ACTION('MOSTRAR_FORM_COLOR'):{
      return state.setIn(['portafolios','mostrarColorPortafolio'], true)
    }
    case ACTION('CHANGE_COLOR_PORTAFOLIO'):{
      return state.setIn(['portafolios','colorPortafolio'], action.event)
    }

    case ACTION('SET_COLOR_PORTAFOLIO'):{
      return state.setIn(['portafolios','colorPortafolio'], action.event)
    }

    case ACTION('AJUSTAR_NOMBRE'):{
      return state.setIn(['portafolios','nombrePortafolio'], action.event)
        .setIn(['portafolios','errores','errorNombrePortafolio'], false);
    }

    case ACTION('ERROR_NOMBREPORTFOLIO'):{
      return state.setIn(['portafolios','errores','errorNombrePortafolio'], true)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_CARPETAS':{
      return state.setIn(['portafolios','carpetas'], action.data)
        .setIn(['portafolios','modalFormulario'], false)
        .setIn(['portafolios','nombrePortafolio'], "")
        .setIn(['portafolios','colorPortafolio'],{hex:"rgb(248, 231, 28)"})
        .setIn(['portafolios','abrirOpcionesPortafolio'],false)
        .setIn(['portafolios','abrirPop'], false)
    }

    case ACTION('MOSTRAR_OPCIONES_PORTAFOLIOS'):{
      return state.setIn(['portafolios','abrirOpcionesPortafolio'], true)
    }

    case ACTION('ABRIR_EDICION_PORTAFOLIO'):{
      
      return state
        .setIn(['portafolios','modalFormulario'], true)
        .setIn(['portafolios','nombrePortafolio'], action.item.NombrePortafolio)
        .setIn(['portafolios','colorPortafolio'], {hex:action.item.Color})
        .setIn(['portafolios','idPortafolio'], action.item.IdPortafolio)
        .setIn(['portafolios','idxPortafolio'], action.item.idx)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_PORTAFOLIO':{
      const portafolios = state.getIn(['portafolios','carpetas'])
      if(action.data.IdPortafolio !== ""){
        portafolios.forEach((item,idx) => {
          if(action.data.idxPortafolio === idx){
            item.NombrePortafolio = action.data.nombrePortafolio
            item.Color = action.data.colorPortafolio
          }
        })
      }
      
      return state.setIn(['portafolios','carpetas'], portafolios)
        .setIn(['portafolios','modalFormulario'], false)
        .setIn(['portafolios','nombrePortafolio'], "")
        .setIn(['portafolios','colorPortafolio'],{hex:"rgb(248, 231, 28)"})
        .setIn(['portafolios','abrirOpcionesPortafolio'],false)
        .setIn(['portafolios','abrirPop'], false)
    }

    case ACTION('ON_ABRIR_POP'):{
      return state.setIn(['portafolios','abrirPop'], action.bandera)
    }

    case ACTION('CHANGE_STEPPER'):{
      return state.setIn(['stepper'],1)
        .setIn(['listadoProyectos','idPortafolio'], action.obt)
        .setIn(['listadoProyectos','nombrePortafolioSeleccionado'], action.obt.item.NombrePortafolio)
        .setIn(['listadoProyectos','colorPortafolioSeleccionado'], action.obt.item.Color)
    }

    case ACTION('REDIRECCIONAR_PORTAFOLIOS'):{
      return state.setIn(['stepper'], 0)
        .setIn(['portafolios','modalFormulario'], false)
        .setIn(['portafolios','nombrePortafolio'], "")
        .setIn(['portafolios','colorPortafolio'],{hex:"rgb(248, 231, 28)"})
        .setIn(['portafolios','abrirOpcionesPortafolio'],false)
        .setIn(['portafolios','abrirPop'], false)
    }

    // LISTADO DE ACTIVIDADES ---------------------------//

    case ACTION('ABRIR_MODAL_PROYECTOS'):{
      return state.setIn(['listadoProyectos','modalProyectos'], true)
        .setIn(['listadoProyectos','idProyecto'], "")
        .setIn(['listadoProyectos','errores','errorRepetido'], false)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_PLANTILLAS':{
      return state
        .setIn(['listadoProyectos','plantillas'],action.plantillas)
    }
    case ACTION('ON_CHANGE_PLANTILLA'):{
      return state.setIn(['listadoProyectos','plantillaSeleccionada'], [action.event])
    }

    case ACTION('HANDLE_CHANGE_PRIORIDAD'):{      
      return state.setIn(['listadoProyectos','prioridadSeleccionada'], action.event)
    }

    case ACTION('SET_NOMBRE_PROYECTO'):{
      return state.setIn(['listadoProyectos','nombreProyecto'], action.event)
        .setIn(['listadoProyectos','errores','errorRepetido'], false)
    }

    case ACTION('CERRAR_MODAL_PROYECTOS'):{
      return state.setIn(['listadoProyectos','modalProyectos'], false)
        .setIn(['listadoProyectos','colorProyecto'], {hex:"rgb(248, 231, 28)"})
        .setIn(['listadoProyectos','nombreProyecto'], '')
        .setIn(['listadoProyectos','plantillaSeleccionada'], '')
        .setIn(['listadoProyectos','prioridadSeleccionada'], '')
        .setIn(['listadoProyectos','empleadoSeleccionado'], '')
        .setIn(['listadoProyectos','errores','errorTipoProyecto'], true)
        .setIn(['listadoProyectos','errores','errorNombreProyecto'], false)
        .setIn(['listadoProyectos','errores','errorPrioridad'], false)
        .setIn(['listadoProyectos','errores','errorResponsable'], true)
        .setIn(['listadoProyectos','modalGuardadoProyecto'], false)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_EMPLEADOS':{
      
      return state.setIn(['listadoProyectos','empleados'],action.data)
    }
    case ACTION('ON_CHANGE_EMPLEADO'):{
      // console.log(action,"----------------------------------------- pxndx")
      return state.setIn(['listadoProyectos','empleadoSeleccionado'], [action.event])
    }
    case ACTION('CHANGE_COLOR_PROYECTO'):{
      return state.setIn(['listadoProyectos','colorProyecto'], action.event)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_PROYECTOS':{
      
      return state.setIn(['listadoProyectos','proyectos'],action.data)
        .setIn(['listadoProyectos','colorProyecto'], {hex:"rgb(248, 231, 28)"})
        .setIn(['listadoProyectos','nombreProyecto'], '')
        .setIn(['listadoProyectos','plantillaSeleccionada'], '')
        .setIn(['listadoProyectos','prioridadSeleccionada'], '')
        .setIn(['listadoProyectos','empleadoSeleccionado'], '')
        .setIn(['listadoProyectos','modalProyectos'], false)
        .setIn(['listadoProyectos','errores','errorTipoProyecto'], true)
        .setIn(['listadoProyectos','errores','errorNombreProyecto'], false)
        .setIn(['listadoProyectos','errores','errorPrioridad'], false)
        .setIn(['listadoProyectos','errores','errorResponsable'], true)

    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_EDICION_PROYECTO_REDUCER':{
      const plantillas = state.getIn(['listadoProyectos','plantillas'])
      const numero = parseInt(action.data.proyecto.Tipo,10)
      let plantilla = filter(plantillas,['IdPlantilla',numero])
  
      
      if (plantilla.length === 0) {
        plantilla = [{nombre:'Plantilla General'}]
      }
      return state.setIn(['listadoProyectos','modalProyectos'], true)
        .setIn(['listadoProyectos','idProyecto'], action.data.proyecto.IdProyecto)
        .setIn(['listadoProyectos','colorProyecto'], {hex:action.data.proyecto.Color})
        .setIn(['listadoProyectos','nombreProyecto'], action.data.proyecto.NombreProyecto)
        .setIn(['listadoProyectos','plantillaSeleccionada'], [{value:action.data.proyecto.Tipo === undefined ? 'Plantilla General' : action.data.proyecto.Tipo,label:plantilla[0].nombre}])
        .setIn(['listadoProyectos','prioridadSeleccionada'], action.data.proyecto.Prioridad)
        .setIn(['listadoProyectos','empleadoSeleccionado'], [{label:action.data[0].NombreCompleto,value:action.data[0].NoEmpleado}])
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ERROR_TIPO_PROYECTO':{
      return state.setIn(['listadoProyectos','errores','errorTipoProyecto'], false)
    }
    case 'APP/CONTAINER/PLANDETRABAJO/ERROR_NOMBRE_PROYECTO':{
      return state.setIn(['listadoProyectos','errores','errorNombreProyecto'], true)
    }
    case 'APP/CONTAINER/PLANDETRABAJO/ERROR_PRIORIDAD':{
      return state.setIn(['listadoProyectos','errores','errorPrioridad'], true)
    }
    case 'APP/CONTAINER/PLANDETRABAJO/ERROR_RESPONSABLE':{
      return state.setIn(['listadoProyectos','errores','errorResponsable'], false)
    }
    case 'APP/CONTAINER/PLANDETRABAJO/ERROR_PROYECTO_REPETIDO':{
      return state.setIn(['listadoProyectos','errores','errorRepetido'], true)
    }

    case ACTION('ON_FECHA_INPUT'):{
      
      if(action.id){
        return state.setIn(['listadoProyectos', 'fechas', 'fechaInputRes'], action.event);
      }
      
      return state.setIn(
        [
          'listadoProyectos', 
          'fechas', 
          'fechaInput',
        ],
        action.event
      );
    }

    case ACTION('ON_FECHA_INPUT_RES'): {
      return state
    }

    case ACTION('ON_CHANGE_ESTATUS'):{
      return state.setIn(['listadoProyectos','estatusSeleccionado'],action.event)
    }
    
    case ACTION('CHANGE_FECHA'): {
      return state.setIn(['listadoProyectos','fechas','fechaInicio'], action.fechaIni)
        .setIn(['listadoProyectos','fechas','fechaFin'], action.fechaFin)
    }
    case ACTION('ON_CHANGE_RESPONSABLE'): {
      return state.setIn(['listadoProyectos','responsableSeleccionado'], [{label:action.event.label,value:action.event.value}])
    }

    case ACTION('CHANGE_FECHA_RESPONSABLE'): {      
      return state.setIn(['listadoProyectos','fechas','fechaInicioRes'], action.fechaIni)
        .setIn(['listadoProyectos','fechas','fechaFinRes'], action.fechaFin)
    }

    case ACTION('CAMBIAR_STEPPER'):{
      return state
        .setIn(['stepper'],action.data)
        .setIn(['IdProyecto'],action.IdProyecto)
        .setIn(['IdPlantilla'],action.IdPlantilla)
        .setIn(['IdPortafolio'],action.IdPortafolio)
        .setIn(['listadoProyectos','idProyecto'],action.IdProyecto)
        .setIn(['lineaBase','estatusProyectoSeleccionado'],action.Estatus)
    }

    case ACTION('ON_CLICK_LIMPIAR'):{
      return state.setIn(['listadoProyectos','fechas','fechaInicio'], null)
        .setIn(['listadoProyectos','fechas','fechaFin'], null)
        .setIn(['listadoProyectos','fechas','fechaInput'], null)
        .setIn(['listadoProyectos','fechas','fechaInicioRes'], null)
        .setIn(['listadoProyectos','fechas','fechaFinRes'], null)
        .setIn(['listadoProyectos','fechas','fechaInputRes'], null)
        .setIn(['listadoProyectos','responsableSeleccionado'], [])
        .setIn(['listadoProyectos','estatusSeleccionado'], "")
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_OBSERVACIONES':{
      return state.setIn(['listadoProyectos','openModalObservaciones'], true)
        .setIn(['listadoProyectos','observaciones'], action.event)
    }

    case ACTION('CERRAR_MODAL_OBSERVACIONES'):{
      return state.setIn(['listadoProyectos','openModalObservaciones'], false)
    }

    case ACTION('ASIGNAR_PROYECTO'):{
      
      return state.setIn(['lineaBase','idAutorizacion'], action.event.AutorizacionEstatus)
        .setIn(['lineaBase','idProyecto'], action.event.IdProyecto)
        .setIn(['lineaBase','Responsable'], action.event.Responsable)
        .setIn(['lineaBase','tablaPendientes'],true)
        
    }
    case 'APP/CONTAINER/PLANDETRABAJO/BORRAR_POYECTO':{
      return state.setIn(['lineaBase','idProyecto'], '')
    }
    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_AUTORIZACION_MODAL':{
      return state.setIn(['lineaBase','modalAutorizacion'], action.event)
        .setIn(['lineaBase', 'modalobservacionesFormulario'], false)
        .setIn(['lineaBase', 'observacion'], "")
        
    }


    //  ALEXIS'S ACTIONS   -----------------------------------------------------------

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
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ARREGLO_COMPONENTES_LINEA_BASE_ACTION':{
      return state
        .setIn(['lineaBase','arregloComponentes'],fromJS(action.arregloComponentes))
        .setIn(['lineaBase','cabeceras'],fromJS(action.arrCabeceras))
        .setIn(['lineaBase','plantilla'],fromJS(action.arrPlantilla))
        .setIn(['lineaBase','arregloComponentesExtras'],fromJS(action.arrComponentesExtras))
        .setIn(['lineaBase','arrCabecerasExtras'],fromJS(action.arrCabecerasExtras))
        .setIn(['lineaBase','arrCabeceraComponente'],fromJS(action.arrCabecerasComponente))
        .setIn(['lineaBase','arrColumnaComponente'],fromJS(action.arrColumnaComponente))
        .setIn(['lineaBase','tamanioTabla'],action.tamanioTabla)
        .setIn(['lineaBase','idAutorizacion'],action.AutorizacionEstatus)
        .setIn(['lineaBase','IdAutorizador'],action.IdAutorizador)
        .setIn(['lineaBase','IdLineaBase'],action.IdLineaBase)
        .setIn(['lineaBase','LineaBaseActiva'],action.LineaBaseActiva)
        .setIn(['lineaBase','arrLineasBase'],fromJS(action.arrLineasBase))
        .setIn(['lineaBase','Copia'],action.Copia)
        .setIn(['lineaBase','Editando'],action.Editando)
        .setIn(['lineaBase','Invitado'],action.Invitado)
        .setIn(['lineaBase','arrEtapas'],fromJS(action.arrEtapas))
        .setIn(['lineaBase','arrCabeceraEtapas'],fromJS(action.arrCabeceraEtapas))
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_SET_REGISTROS_ACTION':{
      return state
        .setIn(['lineaBase','arregloComponentes'],fromJS(action.arrRegistros))
        .setIn(['lineaBase','arregloComponentesExtras'],fromJS(action.arrRegistrosExtras))
        .setIn(['lineaBase','rowSelected'],action.arrRegistros[0].length-1)
        
    }
    case 'APP/CONTAINER/PLANDETRABAJO/LB_SET_REGISTROS_DRAGNDROP_ACTION':{
      return state
        .setIn(['lineaBase','arregloComponentes'],fromJS(action.arrRegistros))
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_SET_REGISTROS_BAJAR_NODO_ACTION':{
      return state
        .setIn(['lineaBase','arregloComponentes'],fromJS(action.arrRegistros))   
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_CERRAR_CONFIRMACION_ACTION':{
      const openModal = state.getIn(['lineaBase',action.nombreConfirmacion]);
      return state
        .setIn(['lineaBase',action.nombreConfirmacion],!openModal)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_SET_NUEVO_ARREGLO_MODAL_BORRAR_ACTION':{
      return state
        .setIn(['lineaBase','arregloComponentes'],fromJS(action.arrRegistros))
        .setIn(['lineaBase','openConfirmacionBorrar'],false)
    }
    
    case 'APP/CONTAINER/PLANDETRABAJO/LB_CAMBIAR_VALOR_INPUTBASE_ACTION':{
      const {
        row,
        cell,
        val,
      } = action;
      const datos = state.getIn(['lineaBase','arregloComponentes']).toJS();
      if(datos[0][row].Configuracion[cell].config.valor === ''){
        datos[0][row].Configuracion[cell].config.valor = startCase(val);  
      }else{
        datos[0][row].Configuracion[cell].config.valor = val;
      }
      
      
      return state
        .setIn(['lineaBase','arregloComponentes'],fromJS(datos))
    }
    // case 'APP/CONTAINER/PLANDETRABAJO/LB_CAMBIAR_VALOR_FECHAS_ACTION':{
    //   const {
    //     row,
    //     cell,
    //     val,
    //   } = action;
    //   const datos = state.getIn(['lineaBase','arregloComponentes']).toJS();
      
    //   if()
    //   datos[0][row].Configuracion[cell].config.valor = val;
      
    //   return state
    //     .setIn(['lineaBase','arregloComponentes'],fromJS(datos))
    // }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_ON_CHANGE_DATE_ACTION':{
      
      return state
        .setIn(['lineaBase','arregloComponentes',0,action.row,'Configuracion',action.cell,'config','valor'],action.result)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_ONCHANGE_FECHA_INPUT_ACTION':{
      
      return state
        .setIn(['lineaBase','fecInicio'], action.fechaIni)
        .setIn(['lineaBase','fecFin'], action.fechaFin)
        .setIn(['lineaBase','fechaValida'], (action.fechaFin && action.fechaIni))
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_ONCHANGE_VALUE_ACTION':{
      return state
        .setIn(['lineaBase','arregloComponentes',0,action.row,action.name],action.value)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_ON_CHANGE_OPEN_MODAL_ACTION':{
      const openModal = state.getIn(['lineaBase','openModal']);

      return state
        .setIn(['lineaBase','openModal'], !openModal)
        .setIn(['lineaBase','rowSelected'],action.row)
        .setIn(['lineaBase','cellSelected'],action.cell)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_OPEN_MODAL_CONFIRMACION_BORRAR_ACTION':{
      const openModal = state.getIn(['lineaBase','openConfirmacionBorrar']);

      return state
        .setIn(['lineaBase','openConfirmacionBorrar'], !openModal)
        .setIn(['lineaBase','rowSelected'], action.index)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_VALOR_RECURSO_ACTION':{
      const arrRecurso = state.getIn(['lineaBase','arrRecursos']);
      const recursos = arrRecurso.toJS();

      // BUSCAR EL NOMBRE DEL RECURSO EN BASE AL ID
      const result = recursos.filter(recurso => recurso.Id === action.value)

      return state
        .setIn(['lineaBase','recursoSeleccionadoRecurso'],result[0].Id)
        .setIn(['lineaBase','nomrecursoSeleccionadoRecurso'],result[0].Nombre)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_ASIGNARME_RECURSO_ACTION':{
      return state
        .setIn(['lineaBase','autoAsignarmelo'], action.checked)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_ASIGNAR_RECURSO_ACTION':{
      
      const autoAsignarmelo = state.getIn(['lineaBase','autoAsignarmelo']);
      const row = state.getIn(['lineaBase','rowSelected']);
      let IdEmpleado = 0;
      let NomEmpleado = '';

      if(autoAsignarmelo){
        IdEmpleado = state.getIn(['numUsuarioLogeado']);
        NomEmpleado = state.getIn(['nomUsuarioLogeado']);
      }else{
        IdEmpleado = state.getIn(['lineaBase','recursoSeleccionadoRecurso']);
        NomEmpleado = state.getIn(['lineaBase','nomrecursoSeleccionadoRecurso']);
      }

      return state
        .setIn(['lineaBase','arregloComponentes',0,row,'Recurso'], IdEmpleado)
        .setIn(['lineaBase','arregloComponentes',0,row,'NomRecurso'], NomEmpleado)
        .setIn(['lineaBase','openModal'], false)

    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_OPEN_MODAL_NUEVA_COLUMNA_ACTION':{
      const openModal = state.getIn(['lineaBase','openModalNColumna']);
      return state
        .setIn(['lineaBase','openModalNColumna'], !openModal)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_OPEN_MODAL_CONFIRMACION_ACTION':{    
      const openModal = state.getIn(['lineaBase',action.nomModal]);
      return state
        .setIn(['lineaBase',action.nomModal], !openModal)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_ON_SELECT_ROW_ACTION':{      
      // const pantallaTicket = state.getIn(['lineaBase','pantallaTickets']);
      // console.log(pantallaTicket,"pantallaTicket ----------------------");
      
      // if(pantallaTicket){
        
      //   const columnaSeleccionada = state.getIn(['lineaBase','rowSelected']);
      //   console.log('if',columnaSeleccionada);
      //   return state.setIn(['lineaBase','rowSelected'],columnaSeleccionada)
      // }
      // console.log('afuera',action);
      return state.setIn(['lineaBase','rowSelected'],action.rowSelected)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_SET_CATALOGOS_RECURSO_ACTION':{
      return state
        .setIn(['lineaBase','arrPlazas'],fromJS(action.arrPlazas))
        .setIn(['lineaBase','arrDepartamentosInvitar'],fromJS(action.arrDepartamentos))
        // .setIn(['lineaBase','arrPuestos'],fromJS(action.arrPuestos))
        .setIn(['lineaBase','arrRecursos'],fromJS(action.arrRecursos)) 
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_SET_CATALOGO_RECURSO_ACTION':{
      let newState;
      switch (action.tipo) {
        case 'Plaza':
          newState = state
            .setIn(['lineaBase','arrDepartamentos'],fromJS(action.data))
            .setIn(['lineaBase','departamentoSeleccionadoRecurso'],0)
            .setIn(['lineaBase','puestoSeleccionadoRecurso'],0)
            .setIn(['lineaBase','recursoSeleccionadoRecurso'],0)
            .setIn(['lineaBase','disabledDepartamento'],false)
            .setIn(['lineaBase',action.name],action.value)
          break;
        case 'Departamento':
          newState = state
            .setIn(['lineaBase','arrPuestos'],fromJS(action.data))
            .setIn(['lineaBase','puestoSeleccionadoRecurso'],0)
            .setIn(['lineaBase','recursoSeleccionadoRecurso'],0)
            .setIn(['lineaBase',action.name],action.value)
          break;
        case 'Puesto':
          newState = state
            .setIn(['lineaBase','arrRecursos'],fromJS(action.data))
            .setIn(['lineaBase','recursoSeleccionadoRecurso'],0)
            .setIn(['lineaBase',action.name],action.value)
          break;
        default:
          break;
      }

      return newState;
    }

    case 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_VALOR_ACTION':{
      return state
        .setIn(['lineaBase',action.name],action.value)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LB_SET_COLUMNAS_ACTION':{
      const tamanioTabla = state.getIn(['lineaBase','tamanioTabla']);
      return state
        .setIn(['lineaBase','arrCabecerasExtras'],fromJS(action.Columnas))
        .setIn(['lineaBase','arregloComponentesExtras'],fromJS(action.componentesExtras))
        .setIn(['lineaBase','openModalNColumna'],false)
        .setIn(['lineaBase','tamanioTabla'],tamanioTabla+10)
        .setIn(['lineaBase','nombreNColumna'],'')
        // .setIn(['lineaBase','tipoDatoNColumna'],'')
    }

    case 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_VALOR_INVITADO_ACTION':{
      return state
        .setIn(['lineaBase','valorInvitarAmigo'],action.value)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MENU_TABLA_ACTION':{
      const openMenuTabla = state.getIn(['lineaBase','openMenuTabla']);
      return state
        .setIn(['lineaBase','openMenuTabla'],!openMenuTabla)
        .setIn(['lineaBase','anchorElSeleccionado'],action.anchorEl)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_EDITAR_COLUMNA_ACTION':{
      const openModal = state.getIn(['lineaBase','openModalEditarColumna']);

      return state
        .setIn(['lineaBase','openModalEditarColumna'],!openModal)
        .setIn(['lineaBase','cabeceraSeleccionada'],action.idxCabeceras)
        .setIn(['lineaBase','nombreNColumna'],action.valor)
        .setIn(['lineaBase','tipoDatoNColumna'],action.tipo)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/EDITAR_COLUMNA_ACTION':{
      const arrCabeceras = state.getIn(['lineaBase','arrCabecerasExtras']);
      const cabeceraSeleccionada = state.getIn(['lineaBase','cabeceraSeleccionada']);
      const nombreNColumna = state.getIn(['lineaBase','nombreNColumna']);
      const tipoDatoNColumna = state.getIn(['lineaBase','tipoDatoNColumna']);
      
      const cabeceras = arrCabeceras.toJS();

      cabeceras[cabeceraSeleccionada].Nombre = nombreNColumna;
      cabeceras[cabeceraSeleccionada].Tipo = tipoDatoNColumna;
      return state
        .setIn(['lineaBase','arrCabecerasExtras'],fromJS(cabeceras))
        .setIn(['lineaBase','openModalEditarColumna'],false)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_OBSERVACIONES_ACTION':{
      const openModal = state.getIn(['lineaBase','openModalObservaciones']);
      return state
        .setIn(['lineaBase','openModalObservaciones'],!openModal)

    }

    case 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_INPUT_EXTRA_ACTION':{
      const arregloComponentesExtras = state.getIn(['lineaBase','arregloComponentesExtras']);
      const componentesExtras = arregloComponentesExtras.toJS(); 

      componentesExtras[0][action.idxRow][action.idxCell].Valor = action.value;
      return state
        .setIn(['lineaBase','arregloComponentesExtras'],fromJS(componentesExtras))
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_INVITAR_AMIGO_ACTION':{
      const openModal = state.getIn(['lineaBase','openModalInvitarAmigo']);
      return state
        .setIn(['lineaBase','openModalInvitarAmigo'],!openModal)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_RECURSOS_A_INVITAR_ACTION':{
      return state
        .setIn(['lineaBase','arrRecursosInvitarAmigo'],fromJS(action.arreglo))
        .setIn(['lineaBase','departamentoInvitarAmigo'],action.Departamento)
        .setIn(['lineaBase','valorInvitarAmigo'],'')
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SALIR_ADMINISTRADOR_ACTIVIDADES_ACTION':{
      const newState = initialState.toJS();
      return state
        .setIn(['stepper'],action.stepper)
        .setIn(['lineaBase'],fromJS(newState.lineaBase))
    }
    case 'APP/CONTAINER/PLANDETRABAJO/REORDENAR_FECHAS_ARREGLO_ACTION':{
      
      return state
        .setIn(['lineaBase','arregloComponentes'],fromJS(action.arreglo))
    }

    case  ACTION('HANDLE_CHANGE_TAB_DETAILS') : {
      return state.setIn(['lineaBase','bandejaTickets', 'tabSelectedDetails'],  parseInt(action.id));
    }

    case ACTION('SET_MENSAJES_CHAT') :  {
      const {
        data,
      } = action;
      const mensajesArray = state.getIn(['lineaBase','bandejaTickets', 'ticketsDetails', 'mensajes']);
      const mensajesArr = JSON.parse(JSON.stringify(mensajesArray));
      if( isEqual(mensajesArr, data)){
        return state
      }
      const updatedBandeja = state
        .updateIn(['lineaBase','bandejaTickets', 'ticketsDetails'], (detail) => 
          detail.merge(
            fromJS({
              chatMounted: true,
              mensajes: isArray(data) ? data.slice() : data,
            })
          )
        );
      return updatedBandeja;
    }

    case ACTION('ON_CHANGE_TEXT_FIELD_ESCRIBIR_MENSAJE') : {

      const mensaje = state.getIn(['lineaBase','bandejaTickets', 'ticketsDetails', 'mensajeValue']);
      const textoMensaje = JSON.parse(JSON.stringify(mensaje));
      const texto = textoMensaje === '' ? action.mensaje.toUpperCase() : action.mensaje
      return state
        .setIn(
          ['lineaBase','bandejaTickets', 'ticketsDetails', 'mensajeValue'], 
          texto
        )
    }

    case  ACTION('SET_IMAGEN_AVATAR') :{
      return state.set('imagenAvatar', action.data[0].Ruta);  
    }

    case 'APP/CONTAINER/PLANDETRABAJO/GUARDAR_IMG_ACTION': {
      return state.setIn(['lineaBase','bandejaTickets','ticketsDetails', 'dataBlop'], action.data);
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_AUTORIZADOR': {
      return state.setIn(['lineaBase', 'IdAutorizador'], action.event);
    }

   

    case 'APP/CONTAINER/PLANDETRABAJO/LB_SET_COLUMNAS_COMPONENTES_ACTION':{
      const tamanioTabla = state.getIn(['lineaBase','tamanioTabla']);
      return state
        .setIn(['lineaBase','arrColumnaComponente'],fromJS(action.arregloComp))
        .setIn(['lineaBase','arrCabeceraComponente'],fromJS(action.arregloCab))
        .setIn(['lineaBase','tamanioTabla'],tamanioTabla+10)
    }
    
    case 'APP/CONTAINER/PLANDETRABAJO/LB_SET_COLUMNAS_ETAPAS_ACTION':{
      const tamanioTabla = state.getIn(['lineaBase','tamanioTabla']);
      return state
        .setIn(['lineaBase','arrColumnaComponente'],fromJS(action.arregloComp))
        .setIn(['lineaBase','arrCabeceraEtapas'],fromJS(action.arregloCab))
        .setIn(['lineaBase','tamanioTabla'],tamanioTabla+10)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/OPEN_MODAL_OBSERVACIONES_FORM': {
      return state.setIn(['lineaBase', 'modalobservacionesFormulario'], action.event)
        .setIn(['lineaBase','modalAutorizacion'], false) 
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_INPUT_OBSERVACION': {
      return state.setIn(['lineaBase', 'observacion'], action.event)
    }

    case  ACTION('ABRIR_MODAL_DOCUMENTOS') :{
      return state.setIn(['listadoProyectos','modalImpactos'], action.event);  
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_NOMBRE_DOCUMENTOS': {
      return state.setIn(['listadoProyectos', 'nombreDocumentos'], action.event);
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_OBJETIVO': {
      return state.setIn(['listadoProyectos', 'objetivoDocumentos'], action.event);
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_REAL': {
      return state.setIn(['listadoProyectos', 'realDocumentos'], action.event);
    }
    case 'APP/CONTAINER/PLANDETRABAJO/SET_UNIDAD': {
      return state.setIn(['listadoProyectos', 'unidadDocumentos'], action.event);
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_CUMPLIMIENTO': {
      return state.setIn(['listadoProyectos', 'cumplimientoDocumentos'], action.event);
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_PONDERACION': {
      return state.setIn(['listadoProyectos', 'ponderacionDocumentos'], action.event);
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_CONDICION': {
      return state.setIn(['listadoProyectos', 'condicionDocumentos'], action.event);
    }

    case ACTION('LIMPIAR_STATE_PROYECTOS_PENDIENTES') :{
      return state.set('lineaBase', initialState.get('lineaBase'))
        .set('lineaBase', initialState.get('lineaBase'))
        .set('bandejaTickets', initialState.get('bandejaTickets'))
        // .set('portafolios', initialState.get('portafolios'))
        .set('listadoProyectos', initialState.get('listadoProyectos'))
        .setIn(['stepper'],0)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_POYECTO':{
      return state.setIn(['idProyecto'], action.event)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/OPEN_FORM_IMPACTOS_DOCUMENTOS':{
      return state.setIn(['listadoProyectos','modalImpactos'], action.event)
        .updateIn(['listadoProyectos'],(listadoProyectos) => listadoProyectos.merge({
          nombreDocumentos: '',
          objetivoDocumentos: '',
          realDocumentos: '',
          unidadDocumentos:'',
          cumplimientoDocumentos:'',
          ponderacionDocumentos:'',
          idImpactoDocumento:'',
          condicionDocumentos:'',
        }))
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_IMPACTOS_DOCUMENTOS':{
      return state.setIn(['listadoProyectos','impactosDocumentos'],action.event[0])
        .setIn(['listadoProyectos','modalImpactos'], false)
        .setIn(['listadoProyectos','openModalBorradoImpactos'], false)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/EDITAR_IMPACTOS_DOCUMENTOS':{
      const impactos = state.getIn(['listadoProyectos','impactosDocumentos'])
      const impactosDocumentos =  find(impactos,['IdImpactoDocumento',action.indice])
      
      return state 
        .updateIn(['listadoProyectos'],(listadoProyectos) => listadoProyectos.merge({
          nombreDocumentos: impactosDocumentos.Nombre,
          objetivoDocumentos: impactosDocumentos.Objetivo,
          realDocumentos: parseInt(impactosDocumentos.Real),
          unidadDocumentos: impactosDocumentos.Unidad,
          cumplimientoDocumentos:parseInt(impactosDocumentos.Cumplimiento),
          ponderacionDocumentos:parseInt(impactosDocumentos.Ponderacion),
          idImpactoDocumento:impactosDocumentos.IdImpactoDocumento,
          impactoEnEdicion: parseInt(impactosDocumentos.Ponderacion),
        }))
        .setIn(['listadoProyectos','modalImpactos'], true)
        // .setIn(['listadoProyectos','impactoEnEdicion'], parseInt(impactosDocumentos.Ponderacion));
    }

    case 'APP/CONTAINER/PLANDETRABAJO/EDITAR_IMPACTOS_RIESGOS':{
      const impactos = state.getIn(['listadoProyectos','impactosDocumentos'])
      const impactosDocumentos =  find(impactos,['IdImpactoRiesgo',action.indice])
      
      return state 
        .updateIn(['listadoProyectos'],(listadoProyectos) => listadoProyectos.merge({
          nombreDocumentos: impactosDocumentos.Nombre,
          objetivoDocumentos:impactosDocumentos.Objetivo,
          realDocumentos: parseInt(impactosDocumentos.Real),
          unidadDocumentos: impactosDocumentos.Unidad,
          cumplimientoDocumentos:parseInt(impactosDocumentos.Cumplimiento),
          ponderacionDocumentos:parseInt(impactosDocumentos.Ponderacion),
          IdImpactoRiesgo:impactosDocumentos.IdImpactoRiesgo,
        }))
        .setIn(['listadoProyectos','modalImpactos'], true); 
    }

    case 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_STP':{ 
      return state
        .setIn(['stepper'], action.stepper); 
    }

    case 'APP/CONTAINER/PLANDETRABAJO/LiMPIAR_IMPACTOS_DOCUMENTOS':{
      return state.updateIn(['listadoProyectos'],(listadoProyectos) => listadoProyectos.merge({
        nombreDocumentos: '',
        objetivoDocumentos: '',
        realDocumentos: '',
        unidadDocumentos:'',
        cumplimientoDocumentos:'',
        ponderacionDocumentos:'',
        idImpactoDocumento:'',
        IdImpactoRiesgo:'',
      }))
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_CERRADO_PROYECTO':{
      if(action.event === true ){
        return state.setIn(['listadoProyectos','openModalCerrarProyecto'], action.event)
          .setIn(['listadoProyectos','impactosVacios'], true)
      }
      return state.setIn(['listadoProyectos','openModalCerrarProyecto'], action.event)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_CANCELADO_PROYECTO':{
      // if(action.tickets.length > 0){
      //   return state.setIn(['listadoProyectos','openModalCanceladoProyecto'], action.event)
      //     .setIn(['listadoProyectos','ticketsEnCancelacion'], action.tickets)
      // }
      return state.setIn(['listadoProyectos','openModalCanceladoProyecto'], action.event)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_BORRADO_IMPACTOS':{
      if(action.event === true){
        return state.setIn(['listadoProyectos','openModalBorradoImpactos'], action.event)
          .setIn(['listadoProyectos','idImpactoSeleccionado'], action.IdImpacto)
      }
      return state.setIn(['listadoProyectos','openModalBorradoImpactos'], action.event)
    }
    
    case 'APP/CONTAINER/PLANDETRABAJO/SET_TICKET_SELECTED':{
      action.data.tipoForma = JSON.parse(action.configuracion);      
      return state.setIn(['lineaBase','bandejaTickets','ticketSelected'], action.data)
        .setIn(['lineaBase','IdTicketLineaBase'], action.data.IdTicket)
        .setIn(['lineaBase','bandejaTickets', 'tabSelectedDetails'],  0)
        .setIn(['lineaBase','pantallaTickets'],  true);
    }

    case 'APP/CONTAINER/PLANDETRABAJO/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION_SUCCESS':{
      return state.setIn(['lineaBase','bandejaTickets','ticketsDetails','mensajeValue'], '')
    }

    case 'APP/CONTAINER/PLANDETRABAJO/SET_REGISTRO_SELECCIONADO_LINEABASE_ACTION':{
      const arregloComponentes = state.getIn(['lineaBase','arregloComponentes']).toJS();
      return state
        .setIn(['lineaBase','bandejaTickets','ticketSelected'],arregloComponentes.length-1)
    }

    case 'APP/CONTAINER/PLANDETRABAJO/ABRIR_MODAL_GUARDADO_PROYECTOS':{
      return state.setIn(['listadoProyectos','modalGuardadoProyecto'], action.event)
       
    }

    default:
      return state;
  }
}

export default planDeTrabajoReducer;
