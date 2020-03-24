/*
 *
 * Transformacion reducer
 *
 */
import React,{Fragment} from 'react';
import { fromJS, List } from 'immutable';
import { groupBy, pick, uniqBy, values, flatten, partialRight, flow} from 'lodash';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  SET_MOVIMIENTOS_TRANSFORMACIONES,
  NUEVA_TRANSFORMACION,
  REGRESAR,
  ON_CHANGE_SECCION_TAB,
  ON_INPUT_CHANGE,
  SET_PLAZAS,
  SET_ALMACENES,
  SET_TRANSFORMACIONES,
  SET_MOLDES,
  SET_MOLDES_DESTINO,
  SET_INSUMOS,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_MOVIMIENTO_TRANSFORMACION_DETALLE,
  PLANTA_FILTER,
  SET_PERMISOS,
  REGRESAR_STEPPER,
} = Actions.getConstants();

function transformacionReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:{
      return state;
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case REGRESAR_STEPPER: {
      return state.setIn(['transformacionTabla', 'stepper'], 0);
    }
    case SET_MOVIMIENTOS_TRANSFORMACIONES: {
      return state.setIn(['transformacionTabla', 'datos'], List(action.data))
    }
    case REGRESAR: {
      const plazas = state.getIn(['transformacionTabla', 'nuevaTransformacion', 'combos', 'plazas']).toJS()

      const nuevaTransformacion = {
        campos: {
          descripcion: {
            valor: '',
            campoValido: false,
          },
          plaza: {
            valor: '',
            campoValido: false,
          },
          inventario: {
            valor: '',
            campoValido: false,
            disabled: true,
          },
          idMoldeOrigen: {
            valor: '',
            campoValido: false,
          },
          idCMoldeOrigen: {
            valor: '',
            campoValido: false,
          },
          idMoldeDestino: {
            valor: '',
            campoValido: false,
          },
          observaciones: {
            valor: '',
            campoValido: false,
          },
        },
        combos: {
          almacenes: [],
          // eslint-disable-next-line object-shorthand
          plazas: plazas,
        },
        tablas: {
          moldesOrigen:{
            seleccionados: [],
            datos: [],
          },
          moldesDestino:{
            seleccionados: [],
            datos: [],
          },
          piezas: {
            seleccionados: [],
            datos: [],
          },
          accesorios: {
            seleccionados: [],
            datos: [],
          },
        },
      }

      const modal = {
        value: false,
        stepper: 0,
        text: '',
      }

      return state.setIn(['transformacionTabla', 'stepper'], 0)
        .setIn(['transformacionTabla', 'nuevaTransformacion'], fromJS(nuevaTransformacion))
        .setIn(['transformacionTabla', 'pestanaSlc'], null)
        .setIn(['transformacionTabla', 'plantaSlc'], null)
        .setIn(['transformacionTabla', 'tableText'],  "Seleccione una plaza y un almacen")
        .setIn(['transformacionTabla', 'modal'], modal)
    }
    case NUEVA_TRANSFORMACION: {
      return state.setIn(['transformacionTabla', 'stepper'], 1)
    }
    case SET_MOVIMIENTO_TRANSFORMACION_DETALLE: {
      return state.setIn(['transformacionTabla', 'nuevaTransformacion'], fromJS(action.data))
        .setIn(['transformacionTabla', 'stepper'], 2)
        .setIn(['transformacionTabla', 'pestanaSlc'], 0)
    }
    case ON_CHANGE_SECCION_TAB: {
      return state.setIn(['transformacionTabla', 'pestanaSlc'], action.id)
    }
    case ON_INPUT_CHANGE: {
      const {
        campo,
        valor,
      } = action;

      const moldes = state.getIn(['transformacionTabla', 'moldes']).toJS()
      const campos = state.getIn(['transformacionTabla', 'nuevaTransformacion', 'campos']).toJS()
      const transformaciones = state.getIn(['transformacionTabla', 'transformaciones']).toJS()

      let id;
      let bandera;
      switch (campo) {
        case 0: {
          id = 'descripcion';
          bandera = valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.inventario.valor !== '' &&
          campos.idMoldeOrigen.valor !== '' &&
          campos.idMoldeDestino.valor !== ''
          break;
        }
        case 1: {
          id = 'plaza';
          bandera = valor !== '' &&
          campos.descripcion.valor !== '' &&
          campos.inventario.valor !== '' &&
          campos.idMoldeOrigen.valor !== '' &&
          campos.idMoldeDestino.valor !== ''
          break;
        }
        case 2: {
          id = 'observaciones';
          bandera = campos.plaza.valor !== '' &&
          campos.inventario.valor !== '' &&
          campos.descripcion.valor !== '' &&
          campos.idMoldeOrigen.valor !== '' &&
          campos.idMoldeDestino.valor !== ''
          break;
        }
        case 3: {
          id = 'inventario';
          bandera = valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.descripcion.valor !== '' &&
          campos.idMoldeOrigen.valor !== '' &&
          campos.idMoldeDestino.valor !== ''
          break;
        }
        default: {
          break;
        }
      }
      
      if(id === 'plaza') {
        const almacenes = state.getIn(['transformacionTabla', 'almacenes']);
        const filterAlmacenes = almacenes.filter(almacen => almacen.IdPlaza === valor);

        return state.setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', id, 'valor'], valor)
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', id, 'campoValido'], valor === '')
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', 'inventario', 'valor'], '')
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'combos', 'almacenes'], fromJS(filterAlmacenes))
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'moldesDestino', 'datos'], List())
          .setIn(['transformacionTabla', 'pestanaSlc'], null)
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'moldesOrigen', 'datos'], List())
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', 'inventario', 'disabled'], false)
          .setIn(['transformacionTabla', 'disabled', 'boton'], true)
      // eslint-disable-next-line no-else-return
      } else if (id === 'inventario') {
        const arraryTrans = []
        transformaciones.forEach(transformacion => {
          arraryTrans.push(transformacion.IdMoldeOrigen)
        });
        
        const moldes2 = flow(
          partialRight(groupBy, x => x.idConfiguracionMolde),
          partialRight(pick, uniqBy(arraryTrans)),
          values,
          flatten,
        )(moldes);


        // const moldes3 = moldes2.filter(molde => molde.idPlaza === campos.plaza.valor && molde.idInventario === valor && molde.insumos.length > 0)
        const moldes3 = moldes2.filter(molde => molde.idPlaza === campos.plaza.valor && molde.idInventario === valor)
        let msg = "Seleccione una plaza y un almacen"
        if (moldes3.length === 0) {
          msg = 'No existen moldes en el almacen seleccionado'
        }
        
        return state.setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', id, 'valor'], valor)
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', id, 'campoValido'], valor === '')
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'moldesOrigen', 'datos'], List(moldes3))
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'moldesDestino', 'datos'], List())
          .setIn(['transformacionTabla', 'disabled', 'boton'], true)
          .setIn(['transformacionTabla', 'tableText'], msg)
      }

      return state.setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', id, 'valor'], valor)
        .setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', id, 'campoValido'], valor === '')
        .setIn(['transformacionTabla', 'disabled', 'boton'], !bandera)
    }
    case PLANTA_FILTER: {
      const {
        idPlanta,
      } = action;
      return state.setIn(['transformacionTabla', 'plantaSlc'], idPlanta)
        .setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'moldesDestino', 'seleccionados'], List())
        .setIn(['transformacionTabla', 'disabled', 'boton'], true)
    }
    case SET_MOLDES_DESTINO: {
      // const moldes = state.getIn(['transformacionTabla', 'moldes']).toJS()
      // const transformaciones = state.getIn(['transformacionTabla', 'transformaciones']).toJS()
      const arrayPlantas = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < action.plantas; i++) {
        if (i === 0) {
          arrayPlantas.push({Id: i + 1, Planta: 'Planta baja'})
        } else {
          arrayPlantas.push({Id: i + 1, Planta: `Nivel ${i}`})
        }
      }

      // const arraryTrans = []
      // transformaciones.filter(transformacion => transformacion.IdMoldeOrigen === action.idMolde).forEach(transformacion => {
      //   arraryTrans.push(transformacion.IdMoldeDestino)
      // });
      
      // const moldes2 = flow(
      //   partialRight(groupBy, x => x.idConfiguracionMolde),
      //   partialRight(pick, uniqBy(arraryTrans)),
      //   values,
      //   flatten,
      // )(moldes);
      
      // const moldes3 = uniqBy(moldes2, 'idConfiguracionMolde')
      return state.setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'moldesDestino', 'datos'], List(action.data))
        .setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'moldesDestino', 'seleccionados'], List())
        .setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', 'idMoldeOrigen', 'valor'], action.idMolde)
        .setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', 'idCMoldeOrigen', 'valor'], action.idConfiguracionMolde)
        .setIn(['transformacionTabla', 'nuevaTransformacion', 'combos', 'plantas'], fromJS(arrayPlantas))
        .setIn(['transformacionTabla', 'plantaSlc'], 0)
        .setIn(['transformacionTabla', 'pestanaSlc'], 0)
        .setIn(['transformacionTabla', 'disabled', 'boton'], true);

    }
    case SET_INSUMOS: {
      const campos = state.getIn(['transformacionTabla', 'nuevaTransformacion', 'campos']).toJS()    
      const moldes = state.getIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'moldesDestino', 'datos']).toJS()
      
      const bandera = action.seleccionados.length > 0 &&
      campos.plaza.valor !== '' &&
      campos.inventario.valor !== '' &&
      campos.descripcion.valor !== '' &&
      campos.idMoldeOrigen.valor !== ''

      if(action.seleccionados.length > 0) {
        return state.setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'moldesDestino', 'seleccionados'], List(action.seleccionados))
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', 'idMoldeDestino', 'valor'], moldes[action.seleccionados[0]].idConfiguracionMolde)
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'accesorios', 'datos'], List(action.accesorios))
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'piezas', 'datos'], List(action.piezas))
          .setIn(['transformacionTabla', 'disabled', 'boton'], !bandera)
      // eslint-disable-next-line no-else-return
      } else {
        return state.setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'moldesDestino', 'seleccionados'], List())
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'campos', 'idMoldeDestino', 'valor'], '')
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'accesorios', 'datos'], List())
          .setIn(['transformacionTabla', 'nuevaTransformacion', 'tablas', 'piezas', 'datos'], List())
          .setIn(['transformacionTabla', 'disabled', 'boton'], !bandera)
      }
    }
    case SET_PLAZAS: {
      return state.setIn(['transformacionTabla', 'nuevaTransformacion', 'combos', 'plazas'], List(action.data))
    }
    case SET_ALMACENES: {
      return state.setIn(['transformacionTabla', 'almacenes'], action.data)
    }
    case SET_TRANSFORMACIONES: {
      return state.setIn(['transformacionTabla', 'transformaciones'], List(action.data))
    }
    case SET_MOLDES: {
      return state.setIn(['transformacionTabla', 'moldes'], List(action.data))
    }
    case OPEN_MODAL: {
      const modal = {
        value: false,
        stepper: 0,
        text: '',
      }

      switch (action.stepper) {
        case 1:
          modal.value = true;
          modal.text = '¿Está seguro que desea eliminar el registro seleccionado?';
          modal.stepper = action.stepper;
          return state.setIn(['transformacionTabla', 'modal'], modal)
            .setIn(['transformacionTabla', 'movimientoSelec'], action.data);
        case 2:
          modal.value = true;
          modal.text = 'Existen datos no guardados, ¿Desea continuar?';
          modal.stepper = action.stepper;
          return state.setIn(['transformacionTabla', 'modal'], modal);
        case 3:
          modal.value = true;
          modal.text = <Fragment>Los datos no podran ser modificados, <br/> ¿Desea continuar?</Fragment>;
          modal.stepper = action.stepper;
          return state.setIn(['transformacionTabla', 'modal'], modal);
        case 4:
          modal.value = true;
          modal.text = <Fragment>La devolución no podra ser modificada, <br/> ¿Desea continuar?</Fragment>;
          modal.stepper = action.stepper;
          return state.setIn(['transformacionTabla', 'modal'], modal);
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
      return state.setIn(['transformacionTabla', 'modal'], modal)
        .setIn(['transformacionTabla', 'movimientoSelec'], 0)
    }
    default: {
      return state;
    } 
  }
}

export default transformacionReducer;
