/*
 *
 * Puesto Rol reducer
 *
 */

import { fromJS, List } from 'immutable';
import { find, isPlainObject, isBoolean } from 'lodash';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  SET_LISTADO,
  SET_LISTADO_GUARDAR,
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
  SET_PUESTOS,
  SET_ROLES,
  ON_CHANGE_PARAMETROS,
  ON_CHANGE_PUESTO,
  ON_CLICK_ASIGNAR,
  HANDLE_CLICK_LISTA,
  HANDLE_CLICK_LISTA_ARCHIVO,
  SET_MODULOS,
  SUBIR_ARCHIVOS,
  ON_CANCELAR_CONFIGURACION,
  ON_ELIMINAR_ARCHIVO,
  ON_CANCELAR_ARCHIVO,
  SET_CONFIGURACION,
  SET_MOUNTED,
  LIMPIAR_STATE,
  SET_PERMISOS,
} = Actions.getConstants();

function puestoRolReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:
      return state;
    case SET_MOUNTED: {
      return state.set('mounted', true)
    }
    case LIMPIAR_STATE: {
      return initialState;
    }
    case ON_CANCELAR_ARCHIVO: {
      if(isBoolean(action.band)){
        return state.update(
          'registrar',
          stt => stt.merge({
            abrirModalArchivo: false,
            idArchivo: null,
          })
        )
      }

      return state.update(
        'registrar',
        stt => stt.merge({
          abrirModalArchivo: true,
          idArchivo: action.band,
        })
      )
    }
    case ON_ELIMINAR_ARCHIVO: {
      const idArchivo = state.getIn(
        ['registrar', 'idArchivo']
      );

      const datos = state.getIn(
        ['registrar', 'lista', 0, 'datos']
      ).toJS();
      const archivos = state.getIn(
        ['registrar', 'parametros', 'archivo', 'archivos']
      ).toJS()
    
      datos.splice(idArchivo, 1);
      archivos.splice(idArchivo, 1);
        
      const formData = new FormData();
      formData.append('refId', 'formato');

      for (let i = 0; i < archivos.length; i+=1) {
        if(archivos[i].size)
          formData.append('files', archivos[i], archivos[i].name);
      }

      const stt = state.setIn(
        ['registrar', 'lista', 0, 'datos'],
        fromJS(datos)
      ).updateIn(
        ['registrar', 'parametros', 'archivo'],
        stt2 => stt2.merge({
          formData,
          archivos: fromJS(archivos),
        })
      ).setIn(
        ['registrar', 'abrirModalArchivo'],
        false,
      )
        
      if(archivos.length > 0)
        return stt;

      const lista = state.getIn(
        ['registrar', 'lista']
      ).toJS();

      lista.shift();
      return stt.setIn(
        ['registrar', 'lista'],
        fromJS(lista),
      )
      
    }

    case SET_CONFIGURACION: {
      return state.setIn(
        ['modulosTabla', 'stepper'], 
        1
      ).updateIn(
        ['registrar', 'parametros'],
        stt => stt.merge({
          rol: action.datos.rol,
          puesto: {
            valor: {
              value: action.id,
              label: action.datos.rol.valor[0].nombrePuesto,
            },
            campoValido: true,
          },
          idPuesto: action.id,
          activo: action.datos.rol.valor[0].Activo,
          archivo: action.datos.archivo,
        })
      ).setIn(
        ['registrar', 'lista'],
        fromJS(action.datos.lista),
      )
    }
    case ON_CANCELAR_CONFIGURACION: {
      const hayCambio = state.getIn(['registrar', 'hayCambio'])
      
      if(action.band)
        return state.update('registrar', stt => stt.merge({
          abrirModal: false,
          hayCambio: true,
        }))
      if(hayCambio)
        return state.update('registrar', stt => stt.merge({
          abrirModal: true,
          hayCambio: false,
        }))
      const modulosTabla = state.get('modulosTabla').set('stepper', 0);

      return initialState.set('modulosTabla', modulosTabla);
    }
    case HANDLE_CLICK_LISTA_ARCHIVO: {
      return state.setIn(
        ['registrar', 'lista', action.id, 'seleccionado'],
        !state.getIn(['registrar', 'lista', action.id, 'seleccionado'])
      )
    }
    case SUBIR_ARCHIVOS: {
      const lista = state.getIn(['registrar', 'lista']).toJS()
      
      if(lista[0].esArchivo){
        lista[0] = action.arreglo;
      } else {
        lista.splice(0, 0, action.arreglo)
      }
      return state.updateIn(
        ['registrar','parametros', 'archivo'],
        stt => stt.merge({
          formData: action.formData,
          archivos: fromJS(action.archivos),
        })
      ).setIn(['registrar', 'lista'], fromJS(lista))
    }

    case SET_PUESTOS: {
      return state.setIn(
        ['modulosTabla', 'combos','puestos'],
        fromJS(action.datos),
      )
    }

    case SET_MODULOS:{
      return state.setIn(
        ['registrar', 'lista', action.id, 'datos'],
        action.datos,
      );
    }

    case SET_ROLES: {
      return state.setIn(
        ['modulosTabla', 'combos', 'roles'],
        fromJS(action.datos),
      )
    }

    case HANDLE_CLICK_LISTA: {
      return state.setIn(
        ['registrar', 'lista', action.id, 'seleccionado'],
        !state.getIn(
          ['registrar', 'lista', action.id, 'seleccionado']
        )
      )
    }

    case ON_CHANGE_PUESTO: {
      return state.setIn(
        ['registrar', 'parametros','puesto','valor'],
        fromJS(action.valor),
      ).setIn(['registrar', 'hayCambio'], true)
        .setIn(['registrar', 'parametros', 'activo'], 1);
    }

    case ON_CHANGE_PARAMETROS: {
      const arreglo = action.valor || [];
      if(action.campo === 1){
        const lista = state.getIn(['registrar', 'lista']).toJS();
        const listaAux = [];
        if(lista.length === 0)
          for (let i = 0; i < arreglo.length; i+=1) {
            listaAux.push(
              {
                seleccionado: false,
                datos: [],
                ...arreglo[i],
              }
            )
          }
        else
          for (let i = 0; i < arreglo.length; i+=1) {
            const obj = find(lista, {'value': arreglo[i].value})
            // debugger;
            // if(!isPlainObject(obj))
            listaAux.push(
              {
                seleccionado: isPlainObject(obj) ? obj.seleccionado : false,
                datos: isPlainObject(obj) ? obj.datos : [],
                ...arreglo[i],
              }
            )
          }
        return state.setIn(
          ['registrar', 'parametros','rol','valor'],
          fromJS(arreglo),
        ).update('registrar', stt => stt.merge({
          lista: fromJS(listaAux),
          hayCambio: true,
        }))
      }
      return state;
    }
    case SET_LISTADO: {
      return state.update(
        'modulosTabla',
        stt => stt.merge({
          data: List(action.datos),
          usuario: fromJS(action.usuario),
        })
      )
    }
    case SET_LISTADO_GUARDAR: {
      const modulosTabla = state.get('modulosTabla').merge({
        stepper: 0,
        data: fromJS(action.datos),
        filterData: action.datos.filter((modulo) => modulo.Activo),
      })

      return initialState.set('modulosTabla', modulosTabla);
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
    case SET_LISTADO_ACTIVAR: {
      //return state.setIn(['modulosTabla', 'stepper'], action.datos)
    }
    case SET_LISTADO_DESACTIVAR: {
      //return state.setIn(['modulosTabla', 'stepper'], action.datos)
    }
    case SET_ACTIVAR_REGISTROS: {
      return state.setIn(['modulosTabla', 'activarRegistros'], action.datos)
    }
    case SET_LOADING: {
      return state.setIn(['modulosTabla', 'loading'], action.datos)
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    default:
      return state;
  }
}

export default puestoRolReducer;
