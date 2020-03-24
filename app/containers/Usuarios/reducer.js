/*
 *
 * Usuarios reducer
 *
 */

import { fromJS, List } from 'immutable';
import { isBoolean, isEmpty, findIndex } from 'lodash';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  SET_LISTADO,
  SET_LISTADO_FILTER,
  SET_SELECTED,
  SET_OPEN_SEARCH,
  SET_SEARCH_TEXT,
  SET_OPEN_FILTER,
  SET_OPEN_MENU_CONTEXTUAL,
  SET_OPEN_MODAL,
  SET_ORDER,
  SET_ORDER_BY,
  SET_PAGE,
  SET_ROWS_PER_PAGE,
  SET_STEPPER,
  SET_LISTADO_ACTIVAR,
  SET_LISTADO_DESACTIVAR,
  SET_ACTIVAR_REGISTROS,
  SET_LOADING,
  ON_CLICK_REGRESAR,
  ON_CHANGE_PESTANA,
  ON_CHANGE_PARAMETROS,
  SET_EMPLEADOS,
  SET_INFO_EMPLEADOS,
  SET_PLAZAS,
  ON_CHANGE_ARCHIVO,
  ON_DELETE_ARCHIVO,
  ON_DELETE_ARCHIVO_MODAL,
  ON_CLICK_PLAZA_TEMPORAL,
  ON_CLICK_CERRAR_PLAZA_TEMPORAL,
  ON_CLICK_CERRAR_ROL_ADICIONAL,
  ON_FECHA_INPUT,
  ON_CHANGE_FECHA,
  ON_CHANGE_ARCHIVO_TEMP,
  ON_DELETE_ARCHIVO_TEMP,
  ON_DELETE_ARCHIVO_TEMP_MODAL,
  GET_NEXT_FILE,
  ON_ASIGNAR_PLAZA_TEMPORAL,
  ON_ASIGNAR_ROL_ADICIONAL,
  ON_CLICK_ROL_ADICIONAL,
  SET_PUESTOS,
  SET_ROLES,
  SET_EMPRESAS,
  ON_FECHA_INPUT_ROL,
  ON_CHANGE_FECHA_ROL,
  ON_CHANGE_ARCHIVO_ROL,
  HANDLE_CLICK_LISTA,
  ON_CLICK_CHECK,
  SET_DETALLE_ROL,
  ON_CLICK_LISTA_DETALLE_OPCIONES,
  ON_CLICK_LISTA_DETALLE_CERRAR,
  ON_CLICK_PERMISOS_ESPECIALES,
  ON_CLICK_CERRAR_ROL_DETALLE,
  SET_DETALLE_USUARIO,
  SET_CAMPOS_INVALIDOS,
  SET_LISTADO_GUARDAR,
  SET_MOUNTED,
  LIMPIAR_STATE,
} = Actions.getConstants();

function usuariosReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:
      return state;

    case SET_MOUNTED: {
      return state.set('mounted', true)
    }

    case LIMPIAR_STATE: {
      return initialState;
    }
    
    case SET_LISTADO: {
      return state.update(
        'modulosTabla',
        stt => stt.merge({
          data: List(action.datos),
          stepper: 0,
        })
      )
    }
    case SET_LISTADO_FILTER: {
      return state.setIn(['modulosTabla', 'filterData'], List(action.datos))
    }
    case SET_SELECTED: {
      return state.setIn(['modulosTabla', 'selected'], List(action.datos))
    }
    case SET_OPEN_SEARCH: {
      return state.setIn(['modulosTabla', 'openSearch'], action.datos)
    }
    case SET_SEARCH_TEXT: {
      return state.setIn(['modulosTabla', 'searchText'], action.datos)
    }
    case SET_OPEN_FILTER: {
      return state.setIn(['modulosTabla', 'open'], action.datos)
    }
    case SET_OPEN_MENU_CONTEXTUAL: {
      return state.setIn(['modulosTabla', 'openMenuContextual'], action.datos)
    }
    case SET_OPEN_MODAL: {
      return state.setIn(['modulosTabla', 'openModal'], action.datos)
    }
    case SET_ORDER: {
      return state.setIn(['modulosTabla', 'order'], action.datos)
    }
    case SET_ORDER_BY: {
      return state.setIn(['modulosTabla', 'orderBy'], action.datos)
    }
    case SET_PAGE: {
      return state.setIn(['modulosTabla', 'page'], action.datos)
    }
    case SET_ROWS_PER_PAGE: {
      return state.setIn(['modulosTabla', 'rowsPerPage'], action.datos)
    }
    case SET_STEPPER: {
      return state.setIn(['modulosTabla', 'stepper'], action.datos)
    }
    case SET_ACTIVAR_REGISTROS: {
      return state.setIn(['modulosTabla', 'activarRegistros'], action.datos)
    }
    case SET_LOADING: {
      return state.setIn(['modulosTabla', 'loading'], action.datos)
    }

    /**
   * Aqui empieza lo de registrar usuarios
   * Desarrollador : El Javi
   */
    case ON_CLICK_REGRESAR: {
      const combos = state.getIn(
        ['registrar', 'combos']
      ).toJS();

      const filterData = state.getIn([
        'modulosTabla',
        'data',
      ]).toJS().filter(el => el.Activo);

      return state.setIn(
        ['modulosTabla', 'stepper'],
        0
      ).set('registrar', initialState.get('registrar'))
        .setIn(['registrar', 'combos'], fromJS(combos))
        .setIn(['modulosTabla', 'openSearch'], false)
        .setIn(['modulosTabla', 'searchText'], '')
        .setIn(['modulosTabla', 'filterData'], filterData)
    }

    case ON_CHANGE_PESTANA: {
      return state.setIn(
        ['registrar', 'pestañaSlc'],
        action.id
      )
    }

    case SET_EMPLEADOS: {
      return state.setIn(
        ['registrar', 'combos', 'empleados'],
        fromJS(action.datos),
      )
    }

    case ON_CHANGE_PARAMETROS: {
      if(action.id === 1){
        const band = action.valor !== '';
        return state.updateIn(
          ['registrar', 'parametros', 'enkontrol'],
          stt => stt.merge({
            valor: action.valor,
            campoValido: band,
          })
        ).setIn(['registrar', 'hayCambios'], 
          true)
      }

      if(action.id === 2){
        const parametros = state.getIn(
          ['registrar', 'parametros']
        ).toJS()

        const plaza = state.getIn(
          ['registrar', 'info', 'plaza', 'valor']
        )

        const band = action.valor !== '';
        let bandGuardar = true;

        if(parametros.idsSelecionados.length > 0 &&
          parametros.archivos.length > 0 &&
          band && plaza !== ''
        ){
          bandGuardar = false;
        }
        
        return state.updateIn(
          ['registrar', 'info'],
          stt => stt.merge({
            correo: {
              valor: action.valor,
              campoValido: band,
            },
            usuarioDominio: action.valor,
          })
        ).setIn(
          ['registrar', 'guardarConfiguracion'],
          bandGuardar,
        )
      }
      
      if(action.id === 3){
        return state.setIn(
          ['registrar', 'info', 'dominio'],
          action.valor
        )
      }

      if(action.id === 4){
        const plTemp = state.getIn(
          ['registrar', 'parametros', 'plazaTemporal'],
        ).toJS()
  
        let band = false;
  
        if((plTemp.fecInicio && plTemp.fecInicio) && 
          plTemp.archivosTemp.length > 0
        ){
          band = true;
        }

        return state.updateIn(
          ['registrar', 'parametros', 'plazaTemporal', 'plazaTemp'],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        ).updateIn(
          ['registrar', 'parametros', 'plazaTemporal'],
          stt => stt.merge({
            asignarValido: band,
            hayCambiosTemp: true,
          })
        )
      }


      if(action.id === 5){
        const idsSelecionados = state.getIn(
          ['registrar', 'parametros', 'idsSelecionados']
        ).toJS()

        const correo = state.getIn(
          ['registrar', 'info', 'correo', 'valor']
        )

        const archivos = state.getIn(
          ['registrar', 'parametros', 'archivos']
        ).toJS()
        
        const idUsuario = state.getIn(
          ['registrar', 'idUsuario']
        )

        let bandGuardar = true;

        if(!idUsuario && idsSelecionados.length > 0 &&
          correo !== ''&&
          archivos.length > 0
        ){
          bandGuardar = false;
        } else if(idUsuario && archivos.length > 0){
          bandGuardar = false;
        }
        const plazas = state.getIn(
          ['registrar', 'combos', 'plazasCopia']
        ).toJS();
        
        const plazasTemp = plazas.filter(ele => ele.IdPlaza !== action.valor)
        
        return state.updateIn(
          ['registrar', 'info', 'plaza'],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        ).setIn(
          ['registrar', 'combos', 'plazasTemp'],
          fromJS(plazasTemp),
        ).setIn(
          ['registrar', 'guardarConfiguracion'],
          bandGuardar
        )
      }
      if(action.id === 8){
        const rolAdicional = state.getIn(
          ['registrar', 'parametros', 'rolAdicional'],
        ).toJS()
  
        let band = false;
  
        if(rolAdicional.puestoAdi.valor !== '' &&
          rolAdicional.rolAdi.valor !== '' && 
          action.valor.length > 0 && 
          (rolAdicional.fecInicioRol && rolAdicional.fecFinRol) &&
          rolAdicional.archivosRol.length > 0
        ){
          band = true;
        }

        return state.updateIn(
          ['registrar', 'parametros', 'rolAdicional', 'empresaAdi'],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        ).updateIn(
          ['registrar', 'parametros', 'rolAdicional'],
          stt => stt.merge({
            hayCambiosRol: true,
            asignarValidoRol: band,
          })
        )
      }

      return state;
    }

    case SET_INFO_EMPLEADOS: {
      const puestosAdi = state.getIn(
        ['registrar', 'combos', 'puestosAdi']
      ).toJS()
      
      const {
        datos: {
          info: {
            0: {
              idPuesto,
            },
          },
        },
      } = action;

      const puestosAdiFil = puestosAdi.filter(ele => ele.IdPuesto !== idPuesto)
      
      return state.updateIn(
        ['registrar', 'info'],
        stt => stt.merge({
          nombre: action.datos.info[0].nombreEmpleado,
          puesto: action.datos.info[0].nombrePuesto,
          idPuesto: action.datos.info[0].idPuesto,
          imagen: action.datos.info[0].Imagen,
          plaza: {
            valor: action.datos.info[0].PlazaId,
            campoValido: true,
          },
        })
      ).updateIn(['registrar', 'parametros'],
        stt => stt.merge({
          empleado: fromJS({
            valor: action.valor,
            campoValido: true,
          }),
          modulos: fromJS(action.datos.modulos),
        })
      ).setIn(['registrar', 'combos', 'puestosAdi'],
        fromJS(puestosAdiFil)
      ).setIn(['registrar', 'hayCambios'], 
        true)
    }

    case HANDLE_CLICK_LISTA: {
      return state.setIn(
        ['registrar', 'parametros', 'modulos', action.id, 'seleccionado'],
        !state.getIn(
          ['registrar', 'parametros', 'modulos', action.id, 'seleccionado']
        )
      )
    }

    case SET_PLAZAS: {
      return state.updateIn(
        ['registrar', 'combos'],
        stt => stt.merge({
          plazas: fromJS(action.datos),
          plazasCopia: fromJS(action.datos),
        })
      )
    }

    case SET_PUESTOS: {
      return state.updateIn(
        ['registrar', 'combos'],
        stt => stt.merge({
          puestosAdi: fromJS(action.datos),
        })
      )
    }

    case SET_ROLES: {
      const rolAdicional = state.getIn(
        ['registrar', 'parametros', 'rolAdicional']
      ).toJS()

      return state.setIn(
        ['registrar', 'combos', 'rolesAdi'],
        fromJS(action.datos),
      ).updateIn(
        ['registrar', 'parametros', 'rolAdicional'],
        stt => stt.merge({
          puestoAdi: fromJS({
            valor: action.idPuesto,
            campoValido: true,
          }),
          rolAdi: fromJS({
            valor: '',
            campoValido: rolAdicional.rolAdi.valor === '' && 
              rolAdicional.rolAdi.campoValido,
          }),
          empresaAdi: fromJS({
            valor: [],
            campoValido: !rolAdicional.empresaAdi.valor.length && 
            rolAdicional.empresaAdi.campoValido,
          }),
          asignarValidoRol: false,
          hayCambiosRol: true,
        })
      )
    }

    case SET_EMPRESAS: {
      const rolAdicional = state.getIn(
        ['registrar', 'parametros', 'rolAdicional']
      ).toJS()

      return state.setIn(
        ['registrar', 'combos', 'empresasAdi'],
        fromJS(action.datos),
      ).updateIn(
        ['registrar', 'parametros', 'rolAdicional'],
        stt => stt.merge({
          rolAdi: fromJS({
            valor: action.valor,
            campoValido: true,
          }),
          empresaAdi: fromJS({
            valor: [],
            campoValido: !rolAdicional.empresaAdi.valor.length &&
              rolAdicional.empresaAdi.campoValido,
          }),
          asignarValidoRol: false,
          hayCambiosRol: true,
        })
      )
    }

    case ON_CHANGE_ARCHIVO: {
      const idUsuario = state.getIn(
        ['registrar', 'idUsuario']
      )

      const idsSelecionados = state.getIn(
        ['registrar', 'parametros', 'idsSelecionados']
      ).toJS()

      const correo = state.getIn(
        ['registrar', 'info', 'correo', 'valor']
      )

      const plaza = state.getIn(
        ['registrar', 'info', 'plaza', 'valor']
      )

      const plazaPrev = state.getIn(
        ['registrar', 'info', 'plazaPrev']
      )
      
      let bandGuardar = true;

      if(!idUsuario && idsSelecionados.length > 0 &&
        correo !== ''&&
        plaza !== ''
      ){
        bandGuardar = false;
      } else if(idUsuario && (
        idsSelecionados.length > 0 || plazaPrev !== plaza
      )){
        bandGuardar = false;
      }


      return state.updateIn(
        ['registrar', 'parametros'],
        stt => stt.merge({
          archivos: fromJS(action.arreglo),
          archivoValido: true,
        })
      ).update(
        'registrar', 
        stt => stt.merge({
          guardarConfiguracion: bandGuardar,
          hayCambios: true,
        })
      )
    }
    

    case ON_CHANGE_ARCHIVO_TEMP: {
      const plTemp = state.getIn(
        ['registrar', 'parametros', 'plazaTemporal'],
      ).toJS()

      let band = false;

      if(plTemp.plazaTemp.valor !== '' && 
        (plTemp.fecInicio && plTemp.fecInicio) && 
        action.arreglo.length > 0
      ){
        band = true;
      }
      
      return state.updateIn(
        ['registrar', 'parametros', 'plazaTemporal'],
        stt => stt.merge({
          archivosTemp: fromJS(action.arreglo),
          archivoTempValido: true,
          asignarValido: band,
          hayCambiosTemp: true,
        })
      )
    }

    case ON_CHANGE_ARCHIVO_ROL: {
      const rolAdicional = state.getIn(
        ['registrar', 'parametros', 'rolAdicional'],
      ).toJS()

      let band = false;
        
      if(rolAdicional.puestoAdi.valor !== '' &&
        rolAdicional.rolAdi.valor !== '' && 
        rolAdicional.empresaAdi.valor.length > 0 && 
        (rolAdicional.fecFinRol && rolAdicional.fecInicioRol)
      ){
        band = true;
      }
      
      return state.updateIn(
        ['registrar', 'parametros', 'rolAdicional'],
        stt => stt.merge({
          archivosRol: fromJS(action.arreglo),
          archivoRolValido: true,
          asignarValidoRol: band,
          hayCambiosRol: true,
        })
      )
    }

    case ON_DELETE_ARCHIVO: {
      const idArchivo = state.getIn(
        ['registrar', 'idArchivo']
      );

      const page = state.getIn(
        ['registrar', 'parametros', 'archivosPage']
      )

      const archivos = state.getIn(
        ['registrar', 'parametros', 'archivos']
      ).toJS()

      archivos.splice(idArchivo, 1);
      return state.updateIn(
        ['registrar', 'parametros'],
        stt => stt.merge({
          archivos: fromJS(archivos),
          archivosPage: page > 0 ? page - 1 : page,
        })
      ).update('registrar',
        stt => stt.merge({
          abrirModalArchivo: false,
          idArchivo: null,
        })
      )
    }

    case ON_DELETE_ARCHIVO_TEMP: {
      return state.updateIn(
        ['registrar', 'parametros', 'plazaTemporal'],
        stt => stt.merge({
          archivosTemp: [],
          abrirModalPlaza: false,
        })
      )
    }

    case ON_DELETE_ARCHIVO_TEMP_MODAL: {
      return state.setIn(
        ['registrar', 'parametros', 'plazaTemporal', 'abrirModalPlaza'],
        !state.getIn(
          ['registrar', 'parametros', 'plazaTemporal', 'abrirModalPlaza']
        )
      )
    }

    case ON_DELETE_ARCHIVO_MODAL: {
      if(isBoolean(action.id)){
        return state.update('registrar', stt => stt.merge({
          idArchivo: null,
          abrirModalArchivo: false,
        }))
      }
      return state.update('registrar',
        stt => stt.merge({
          idArchivo: action.id,
          abrirModalArchivo: true,
        })
      )
    }

    case ON_CLICK_PLAZA_TEMPORAL: {
      const plazas = state.getIn(
        ['registrar', 'combos', 'plazasCopia']
      ).toJS();
      const idPlaza = state.getIn(
        ['registrar', 'info', 'plaza', 'valor'],

      )
      const plazasTemp = plazas.filter(ele => ele.IdPlaza !== idPlaza)

      return state.setIn(
        ['registrar', 'abrirPlazaTemporal'],
        !state.getIn(['registrar', 'abrirPlazaTemporal'])
      ).setIn(
        ['registrar', 'combos', 'plazasTemp'],
        fromJS(plazasTemp)
      )
    }

    case ON_CLICK_ROL_ADICIONAL: {
      return state.setIn(
        ['registrar', 'abrirRolAdicional'],
        !state.getIn(['registrar', 'abrirRolAdicional'])
      )
    }

    case ON_CLICK_CERRAR_PLAZA_TEMPORAL: {
      const registrar = state.get('registrar').toJS()
      // debugger;
      if(!isEmpty(registrar.guardoTemp)){
        registrar.guardoTemp.hayCambiosTemp = false;
        return state.setIn(
          ['registrar', 'abrirPlazaTemporal'],
          false,
        ).setIn(
          ['registrar', 'parametros', 'plazaTemporal'],
          fromJS(registrar.guardoTemp),
        )
      }

      return state.setIn(
        ['registrar', 'abrirPlazaTemporal'],
        false
      ).setIn(
        ['registrar', 'parametros', 'plazaTemporal'],
        initialState.getIn(
          ['registrar', 'parametros', 'plazaTemporal'],
        )
      )
    }

    case ON_CLICK_CERRAR_ROL_ADICIONAL: {
      const registrar = state.get('registrar').toJS()
      
      if(!isEmpty(registrar.guardoRolAdi)){
        registrar.guardoRolAdi.hayCambiosRol = false;
        return state.setIn(
          ['registrar', 'abrirRolAdicional'],
          false,
        ).setIn(
          ['registrar', 'parametros', 'rolAdicional'],
          fromJS(registrar.guardoRolAdi),
        )
      }

      return state.setIn(
        ['registrar', 'abrirRolAdicional'],
        false
      ).setIn(
        ['registrar', 'parametros', 'rolAdicional'],
        initialState.getIn(
          ['registrar', 'parametros', 'rolAdicional'],
        )
      )
    }

    case ON_FECHA_INPUT: {
      return state.setIn(
        [
          'registrar', 
          'parametros', 
          'plazaTemporal',
          'fecInput',
        ],
        action.valor
      );
    }

    case ON_FECHA_INPUT_ROL: {
      return state.setIn(
        [
          'registrar', 
          'parametros', 
          'rolAdicional',
          'fecInputRol',
        ],
        action.valor
      );
    }
    case ON_CHANGE_FECHA_ROL: {
      const rolAdicional = state.getIn(
        ['registrar', 'parametros', 'rolAdicional'],
      ).toJS()

      let band = false;

      if(rolAdicional.puestoAdi.valor !== '' &&
        rolAdicional.rolAdi.valor !== '' && 
        rolAdicional.empresaAdi.valor.length > 0 &&
        (action.fechaFin && action.fechaIni) && 
        rolAdicional.archivosRol.length > 0
      ){
        band = true;
      }

      return state.updateIn(
        ['registrar', 'parametros', 'rolAdicional'], 
        stt => stt.merge({
          fecInicioRol : action.fechaIni,
          fecFinRol : action.fechaFin,
          fechaValidaRol: (action.fechaFin && action.fechaIni),
          asignarValidoRol: band,
          hayCambiosRol: true,
        })
      )
    }

    case ON_CHANGE_FECHA: {
      const plTemp = state.getIn(
        ['registrar', 'parametros', 'plazaTemporal'],
      ).toJS()

      let band = false;

      if(plTemp.plazaTemp.valor !== '' && 
        (action.fechaFin && action.fechaIni) && 
        plTemp.archivosTemp.length > 0
      ){
        band = true;
      }

      return state.updateIn(
        ['registrar', 'parametros', 'plazaTemporal'], 
        stt => stt.merge({
          fecInicio : action.fechaIni,
          fecFin : action.fechaFin,
          fechaValida: (action.fechaFin && action.fechaIni),
          asignarValido: band,
          hayCambiosTemp: true,
        })
      )
    }

    case GET_NEXT_FILE: {
      if(action.band)
        return state.setIn(
          ['registrar', 'parametros', 'archivosPage'],
          state.getIn(
            ['registrar', 'parametros', 'archivosPage']
          ) + 1,
        )
      return state.setIn(
        ['registrar', 'parametros', 'archivosPage'],
        state.getIn(
          ['registrar', 'parametros', 'archivosPage']
        ) - 1,
      )
    }

    case ON_ASIGNAR_PLAZA_TEMPORAL: {
      const plTemp = state.getIn(
        ['registrar', 'parametros', 'plazaTemporal']
      ).toJS();

      if(plTemp.plazaTemp.valor !== '' && 
        (plTemp.fecInicio && plTemp.fecInicio) && 
        plTemp.archivosTemp.length > 0
      ){

        const plazas = state.getIn(
          ['registrar', 'combos', 'plazasCopia'],
        ).toJS()

        const nuevasPlazas = plazas.filter(ele => ele.IdPlaza !== plTemp.plazaTemp.valor)

        return state.update(
          'registrar',
          stt => stt.merge({
            abrirPlazaTemporal: false,
            guardoTemp: fromJS(plTemp),
          })
        ).setIn(
          ['registrar', 'parametros', 'plazaTemporal', 'hayCambiosTemp'],
          false,
        ).setIn(
          ['registrar', 'combos', 'plazas'],
          fromJS(nuevasPlazas)
        )
      }

      plTemp.plazaTemp.campoValido = plTemp.plazaTemp.valor !== '';
      plTemp.fechaValida = plTemp.fecInicio && plTemp.fecInicio;
      plTemp.archivoTempValido = plTemp.archivosTemp.length > 0;
      plTemp.asignarValido = false;

      return state.setIn(
        ['registrar', 'parametros', 'plazaTemporal'],
        fromJS(plTemp)
      );
    }

    case ON_ASIGNAR_ROL_ADICIONAL: {

      const rolAdicional = state.getIn(
        ['registrar', 'parametros', 'rolAdicional'],
      ).toJS()
        
      if(rolAdicional.puestoAdi.valor !== '' &&
        rolAdicional.rolAdi.valor !== '' && 
        rolAdicional.empresaAdi.valor.length > 0 &&
        (rolAdicional.fecFinRol && rolAdicional.fecInicioRol) && 
        rolAdicional.archivosRol.length > 0
      ){

        return state.update(
          'registrar',
          stt => stt.merge({
            abrirRolAdicional: false,
            guardoRolAdi: fromJS(rolAdicional),
          })
        ).setIn(
          ['registrar', 'parametros', 'rolAdicional', 'hayCambiosRol'],
          false,
        )
      }
      
      rolAdicional.puestoAdi.campoValido = rolAdicional.puestoAdi.valor !== '';
      rolAdicional.rolAdi.campoValido = rolAdicional.rolAdi.valor !== '';
      rolAdicional.fechaValidaRol = rolAdicional.fecInicioRol !== null && 
        rolAdicional.fecFinRol !== null;
      rolAdicional.empresaAdi.campoValido = rolAdicional.empresaAdi.valor.length > 0
      rolAdicional.archivoRolValido = rolAdicional.archivosRol.length > 0;
      rolAdicional.asignarValidoRol = false;

      return state.setIn(
        ['registrar', 'parametros', 'rolAdicional'],
        fromJS(rolAdicional)
      );
    }

    case ON_CLICK_CHECK: {
      let idsSeleccionados = state.getIn(
        ['registrar', 'parametros', 'idsSelecionados']
      ).toJS();

      const correo = state.getIn(
        ['registrar', 'info', 'correo', 'valor']
      )
      const plaza = state.getIn(
        ['registrar', 'info', 'plaza', 'valor']
      )

      const idUsuario = state.getIn(
        ['registrar', 'idUsuario']
      )

      const archivos = state.getIn(
        ['registrar', 'parametros', 'archivos']
      ).toJS()

      let bandGuardar = true;

      const idRolEmpresa = state.getIn(
        [
          'registrar', 
          'parametros', 
          'modulos', 
          action.i, 
          'datos', 
          action.j, 
          'IdRolEmpresa',
        ],
      )

      const checked = state.getIn(
        [
          'registrar', 
          'parametros', 
          'modulos', 
          action.i, 
          'datos', 
          action.j, 
          'checked',
        ],
      )

      if(checked === '1'){
        idsSeleccionados = idsSeleccionados.filter(ele => ele !== idRolEmpresa);
      } else {
        idsSeleccionados.push(idRolEmpresa);
      }

      if(!idUsuario && plaza !== '' && correo !== '' && idsSeleccionados.length > 0 &&
        archivos.length > 0
      ){
        bandGuardar = false;
      } else if(idUsuario && archivos.length > 0 && idsSeleccionados > 0){
        bandGuardar = false;
      }

      return state.setIn(
        [
          'registrar', 
          'parametros', 
          'modulos', 
          action.i, 
          'datos', 
          action.j, 
          'checked',
        ],
        checked === '1' ? '0' : '1',
      ).setIn(
        ['registrar', 'parametros', 'idsSelecionados'],
        fromJS(idsSeleccionados),
      ).setIn(
        ['registrar', 'guardarConfiguracion'],
        bandGuardar,
      )
    }

    case SET_DETALLE_ROL: {
      return state.updateIn(
        ['registrar', 'parametros'],
        stt => stt.merge({
          empresaDetalle: action.datos.datos[action.id].empresa,
          rolDetalle: action.datos.Nombre,
          rolDatos: fromJS(action.detalle[0].Opciones),
          idRolEmpresa: action.datos.datos[action.id].IdRolEmpresa,
          abrirDetalleRol: true,
        })
      )
    }

    case ON_CLICK_LISTA_DETALLE_OPCIONES: {
      const seleccionado = !state.getIn(
        ['registrar', 'parametros', 'rolDatos', action.id, 'seleccionado']
      )

      return state.updateIn(
        ['registrar', 'parametros', 'rolDatos', action.id],
        stt => stt.merge({
          seleccionado,
          opciones: fromJS(action.datos.permisos),
        })
        
      )
    }

    case ON_CLICK_LISTA_DETALLE_CERRAR: {
      const seleccionado = !state.getIn(
        ['registrar', 'parametros', 'rolDatos', action.id, 'seleccionado']
      )

      return state.setIn(
        ['registrar', 'parametros', 'rolDatos', action.id, 'seleccionado'],
        seleccionado,
      )
    }

    case ON_CLICK_PERMISOS_ESPECIALES:{
      const modulosSeleccionados = state.getIn(['registrar', 'parametros', 'rolDatos']).toJS();
      const indexModulo =  findIndex(modulosSeleccionados, (modulo) => ( modulo.value === action.datos.value ));
      const opcion =  modulosSeleccionados[indexModulo].opciones[action.datos.indexOpcion]
      const nuevaOpcion = {
        ...opcion,
        abrirModalPermisosEspeciales: !opcion.abrirModalPermisosEspeciales,
      }
      return state.setIn(
        ['registrar', 'parametros', 'rolDatos', indexModulo, 'opciones', action.datos.indexOpcion],
        fromJS(nuevaOpcion),
      );
    }

    case ON_CLICK_CERRAR_ROL_DETALLE: {
      return state.setIn(
        ['registrar', 'parametros', 'abrirDetalleRol'],
        false
      );
    }

    case SET_DETALLE_USUARIO: {
      
      return state.update(
        'registrar',
        stt => stt.merge({
          idUsuario: action.datos.idUsuario,
          nomUsuario: action.datos.nomUsuario,
        })
      ).updateIn(
        ['registrar', 'parametros'],
        stt2 => stt2.merge({
          empleado: {
            valor: action.datos.noEmpleado,
            campoValido: true,
          },
          enkontrol: {
            valor: action.datos.enkontrol,
          },
          modulos: fromJS(action.datos.roles),
        })
      ).updateIn(
        ['registrar', 'info'],
        stt2 => stt2.merge({
          nombre: action.datos.nomUsuario,
          puesto: action.datos.puesto,
          idPuesto: action.datos.idPuesto,
          correo: {
            valor: action.datos.correo.split('@')[0],
          },
          dominio: action.datos.correo.split('@')[1] === 'fincamex.com.mx' ? 0 : 1,
          plaza:{
            valor: action.datos.idPlaza,
            campoValido: true,
          },
          usuarioDominio: action.datos.usuarioDominio,
          imagen: action.datos.imagen,
        })
      ).setIn(
        ['modulosTabla', 'stepper'], 
        1
      ).setIn(
        ['registrar', 'historial', 'datosHistorial'],
        fromJS(action.datos.historial),
      );
    }

    case SET_CAMPOS_INVALIDOS: {
      return state.update(
        'registrar',
        stt => stt.merge({
          parametros: fromJS(action.parametros),
          info: fromJS(action.info),
          guardarConfiguracion: true,
        })
      )
    }
    case SET_LISTADO_GUARDAR: {
      const combos = state.getIn(
        ['registrar', 'combos']
      )

      const modulosTabla = state.get('modulosTabla').merge({
        stepper: 0,
        data: fromJS(action.datos),
        filterData: action.datos.filter((modulo) => modulo.Activo),
      })

      return initialState.set('modulosTabla', modulosTabla).setIn(
        ['registrar', 'combos'],
        combos
      );
    }

    default:
      return state;
  }
}

export default usuariosReducer;
