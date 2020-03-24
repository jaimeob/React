/* eslint-disable no-case-declarations */
/* eslint-disable object-shorthand */
/* eslint-disable no-else-return */
/*
 *
 * Pedidos reducer
 *
 */

import { fromJS } from 'immutable';
import { groupBy, pick, uniqBy, values, flatten, partialRight, flow} from 'lodash';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  ON_INPUT_CHANGE,
  SET_PLAZAS,
  SET_USUARIOS,
  SET_ALMACENES,
  SET_ALMACENES_PLAZAS,
  SET_USUARIOS_ALMACENES,
  GET_DETALLE_AP,
  GET_DETALLE_AU,
  LIMPIAR_AP,
  LIMPIAR_AU,
  OPEN_MODAL,
  CLOSE_MODAL,
  REGRESAR_STEPPER,
} = Actions.getConstants();

function usuariosAlmacenesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT: {
      return state;
    }
    case LIMPIAR_AP: {

      const plazas = state.getIn(['usuariosAlmacenes', 'nuevoAP', 'combos', 'plazas']).toJS()
      const almacenes = state.getIn(['usuariosAlmacenes', 'nuevoAP', 'combos', 'almacenes']).toJS()
      const tabla = state.getIn(['usuariosAlmacenes', 'nuevoAP', 'tablas', 'tablaAP']).toJS()
      const nuevoAP = {
        disabled: {
          boton: true,
        },
        combos: {
          plazas: plazas,
          almacenes: almacenes,
        },
        campos: {
          plaza: {
            valor: '',
            error: false,
          },
          almacen: {
            valor: '',
            error: false,
          },
        },
        tablas: {
          tablaAP: tabla,
        },
      }

      return state.setIn(['usuariosAlmacenes', 'nuevoAP'], fromJS(nuevoAP))
        .setIn(['usuariosAlmacenes', 'update'], false)
        .setIn(['usuariosAlmacenes', 'idRegistroSlc'], null)
    }
    case LIMPIAR_AU: {

      const plazas = state.getIn(['usuariosAlmacenes', 'nuevoAU', 'combos', 'plazas']).toJS()
      const almacenes = state.getIn(['usuariosAlmacenes', 'nuevoAU', 'combos', 'almacenes']).toJS()
      const usuarios = state.getIn(['usuariosAlmacenes', 'nuevoAU', 'combos', 'usuarios']).toJS()
      const tabla = state.getIn(['usuariosAlmacenes', 'nuevoAU', 'tablas', 'tablaAU']).toJS()
      const nuevoAU = {
        disabled: {
          boton: true,
        },
        combos: {
          plazas: plazas,
          almacenes: almacenes,
          usuarios: usuarios,
        },
        campos: {
          plaza: {
            valor: '',
            error: false,
          },
          almacen: {
            valor: '',
            error: false,
          },
          usuario: {
            valor: '',
            error: false,
          },
        },
        tablas: {
          tablaAU: tabla,
        },
      }
      
      return state.setIn(['usuariosAlmacenes', 'nuevoAU'], fromJS(nuevoAU))
        .setIn(['usuariosAlmacenes', 'updateAU'], false)
        .setIn(['usuariosAlmacenes', 'idRegistroSlc'], null)
    }
    case ON_INPUT_CHANGE: {
      const {
        campo,
        valor,
        tipo,
      } = action;

      
      const camposAP = state.getIn(['usuariosAlmacenes', 'nuevoAP', 'campos']).toJS()
      const camposAU = state.getIn(['usuariosAlmacenes', 'nuevoAU', 'campos']).toJS()

      let id;
      let bandera;

      if ( tipo === 1) {
        switch (campo) {
          case 0: {
            id = 'plaza';
            bandera = valor !== '' &&
            camposAP.almacen.valor !== ''
            break;
          }
          case 1: {
            id = 'almacen';
            bandera = valor !== '' &&
            camposAP.plaza.valor !== ''
            break;
          }
          default: {
            break;
          }
        }
        return state.setIn(['usuariosAlmacenes', 'nuevoAP', 'campos', id, 'valor'], valor)
          .setIn(['usuariosAlmacenes', 'nuevoAP', 'campos', id, 'campoValido'], valor === '')
          .setIn(['usuariosAlmacenes', 'nuevoAP', 'disabled', 'boton'], !bandera)

      } else {
        switch (campo) {
          case 0: {
            id = 'plaza';
            bandera = valor !== '' &&
            camposAU.almacen.valor !== '' &&
            camposAU.usuario.valor !== ''
            break;
          }
          case 1: {
            id = 'almacen';
            bandera = valor !== '' &&
            camposAU.plaza.valor !== '' &&
            camposAU.usuario.valor !== ''
            break;
          }
          case 2: {
            id = 'usuario';
            bandera = valor !== '' &&
            camposAU.plaza.valor !== '' &&
            camposAU.almacen.valor !== ''
            break;
          }
          default: {
            break;
          }
        }

        const registros = state.getIn(['usuariosAlmacenes', 'nuevoAP', 'tablas', 'tablaAP']).toJS()
        const almacenes = state.getIn(['usuariosAlmacenes', 'nuevoAP', 'combos', 'almacenes']).toJS()

        if (id === 'plaza') {
          const registrosFilter = registros.filter(registro => registro.IdPlaza === valor)
          const almacenIds = []
          registrosFilter.forEach(registro => {
            almacenIds.push(registro.IdAlmacen)
          });

          const almacenesFilter = flow(
            partialRight(groupBy, x => x.IdAlmacen),
            partialRight(pick, uniqBy(almacenIds)),
            values,
            flatten
          )(almacenes)

          return state.setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', id, 'valor'], valor)
            .setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', id, 'campoValido'], valor === '')
            .setIn(['usuariosAlmacenes', 'nuevoAU', 'disabled', 'boton'], !bandera)
            .setIn(['usuariosAlmacenes', 'nuevoAU', 'combos', 'almacenes'], fromJS(almacenesFilter))
        }

        if (id === 'usuario') {
          return state.setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', id, 'valor'], valor)
            .setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', id, 'campoValido'], valor === '')
            .setIn(['usuariosAlmacenes', 'nuevoAU', 'disabled', 'boton'], !bandera)
        }
        return state.setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', id, 'valor'], valor)
          .setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', id, 'campoValido'], valor === '')
          .setIn(['usuariosAlmacenes', 'nuevoAU', 'disabled', 'boton'], !bandera)
      }
    }
    case SET_ALMACENES_PLAZAS: {
      return state.setIn(['usuariosAlmacenes', 'nuevoAP', 'tablas', 'tablaAP'], fromJS(action.data))
    }
    case SET_USUARIOS_ALMACENES: {
      return state.setIn(['usuariosAlmacenes', 'nuevoAU', 'tablas', 'tablaAU'], fromJS(action.data))
    }
    case SET_PLAZAS: {
      const registros = state.getIn(['usuariosAlmacenes', 'nuevoAP', 'tablas', 'tablaAP']).toJS()
      action.data.forEach(plaza => {
        const registrosFilter = registros.filter(registro => registro.IdPlaza === plaza.IdPlaza)
        plaza.AlmacenPlazas = registrosFilter;
      });
      const registrosAU = action.data.filter(plaza => plaza.AlmacenPlazas.length > 0)
      return state.setIn(['usuariosAlmacenes', 'nuevoAP', 'combos', 'plazas'], fromJS(action.data))
        .setIn(['usuariosAlmacenes', 'nuevoAU', 'combos', 'plazas'], fromJS(registrosAU))
    }
    case SET_USUARIOS: {
      return state.setIn(['usuariosAlmacenes', 'nuevoAU', 'combos', 'usuarios'], fromJS(action.data))
    }
    case SET_ALMACENES: {
      return state.setIn(['usuariosAlmacenes', 'nuevoAP', 'combos', 'almacenes'], fromJS(action.data))
        .setIn(['usuariosAlmacenes', 'nuevoAU', 'combos', 'almacenes'], fromJS(action.data))
    }
    case GET_DETALLE_AP: {
      const registros = state.getIn(['usuariosAlmacenes', 'nuevoAP', 'tablas', 'tablaAP']).toJS()
      const detalle = registros.filter(registro => registro.IdRegistro === action.idRegistro)
      
      return state.setIn(['usuariosAlmacenes', 'nuevoAP', 'campos', 'plaza', 'valor'], detalle[0].IdPlaza)
        .setIn(['usuariosAlmacenes', 'nuevoAP', 'campos', 'plaza', 'error'], false)
        .setIn(['usuariosAlmacenes', 'nuevoAP', 'campos', 'almacen', 'valor'], detalle[0].IdAlmacen)
        .setIn(['usuariosAlmacenes', 'nuevoAP', 'campos', 'almacen', 'error'], false)
        .setIn(['usuariosAlmacenes', 'nuevoAP', 'disabled', 'boton'], false)
        .setIn(['usuariosAlmacenes', 'idRegistroSlc'], action.idRegistro)
        .setIn(['usuariosAlmacenes', 'update'], true)
    }
    case GET_DETALLE_AU: {
      const registros = state.getIn(['usuariosAlmacenes', 'nuevoAU', 'tablas', 'tablaAU']).toJS()
      const detalle = registros.filter(registro => registro.IdRegistro === action.idRegistro)
      
      return state.setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', 'usuario', 'valor'], detalle[0].IdUsuario)
        .setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', 'usuario', 'error'], false)
        .setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', 'almacen', 'valor'], detalle[0].IdAlmacen)
        .setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', 'almacen', 'error'], false)
        .setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', 'plaza', 'valor'], detalle[0].IdPlaza)
        .setIn(['usuariosAlmacenes', 'nuevoAU', 'campos', 'plaza', 'error'], false)
        .setIn(['usuariosAlmacenes', 'nuevoAU', 'disabled', 'boton'], false)
        .setIn(['usuariosAlmacenes', 'idRegistroSlc'], action.idRegistro)
        .setIn(['usuariosAlmacenes', 'updateAU'], true)
    }
    case OPEN_MODAL: {
      const modal = {
        value: false,
        stepper: 0,
        text: '',
      }

      switch (action.stepper) {
        case 1:
          const registros =  state.getIn(['usuariosAlmacenes', 'nuevoAP', 'tablas', 'tablaAP']).toJS();
          const registrosAU =  state.getIn(['usuariosAlmacenes', 'nuevoAU', 'tablas', 'tablaAU']).toJS();
          const idAlmacen = registros.filter(registro => registro.IdRegistro === action.data)[0].IdAlmacen    
          const registrosPorAlmacen = registrosAU.filter(registro => registro.IdAlmacen === idAlmacen)

          if(registrosPorAlmacen.length > 0) {
            modal.value = true;
            modal.text = 'Se encuentran usuarios asignados a este almacén ¿Desea continuar?';
            modal.stepper = action.stepper;
          } else {
            modal.value = true;
            modal.text = '¿Está seguro que desea eliminar el registro seleccionado?';
            modal.stepper = action.stepper;
          }
          
          return state.setIn(['usuariosAlmacenes', 'modal'], fromJS(modal))
            .setIn(['usuariosAlmacenes', 'idRegistroSlc'], action.data);
        case 2:
          modal.value = true;
          modal.text = '¿Está seguro que desea eliminar el registro seleccionado?';
          modal.stepper = action.stepper;
          return state.setIn(['usuariosAlmacenes', 'modal'], fromJS(modal))
            .setIn(['usuariosAlmacenes', 'idRegistroSlc'], action.data);
        
        default:
          break;
      }
      
      // eslint-disable-next-line consistent-return
      return;
    }
    case CLOSE_MODAL: {
      const modal = {
        value: false,
        stepper: 0,
        text: '',
      }
      return state.setIn(['usuariosAlmacenes', 'modal'], fromJS(modal))
        .setIn(['usuariosAlmacenes', 'idRegistroSlc'], null)
    }
    default:{
      return state;
    }
  }
}

export default usuariosAlmacenesReducer;