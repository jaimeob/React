/*
 *
 * Pedidos reducer
 *
 */

import { fromJS, List } from 'immutable';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  SET_MATERIALES,
  SET_AGRUPADORES,
  AGREGAR_NUEVO,
  REGRESAR,
  SET_AGRUPADOR,
  SET_NOMBRE,
  SET_PRECIO,
  SET_STOCK_MINIMO,
  SET_STOCK_MAXIMO,
  GET_MATERIAL_DETALLE,
  SET_MATERIAL_DETALLE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_ERROR_AGRUPADOR,
  SET_ERROR_NOMBRE,
  SET_ERROR_PRECIO,
  SET_ERROR_STOCK_MINIMO,
  SET_ERROR_STOCK_MAXIMO,
  SET_PERMISOS,
} = Actions.getConstants();

function materialesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:
      return state;
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case SET_MATERIALES: {
      const {
        datos,
      } = action;
      return state.setIn(['materialesTabla', 'datos'], List(datos))
    }
    case SET_AGRUPADORES: {
      const {
        datos,
      } = action;
      return state.setIn(['materialesTabla', 'agrupadores'], List(datos))
    }
    case SET_AGRUPADOR: {
      const {
        agrupador,
      } = action;
      return state.setIn(['materialesTabla', 'agrupadorSlc'], List(agrupador.key))
        .setIn(['materialesTabla', 'materialNuevo', 'idAgrupador', 'value'], List(agrupador.key))
        .setIn(['materialesTabla', 'materialNuevo', 'idAgrupador', 'error'], false)
        .setIn(['materialesTabla', 'materialNuevo', 'idAgrupador', 'texto'], "")
    }
    case AGREGAR_NUEVO: {
      return state.setIn(['materialesTabla', 'stepper'], 1)
        .setIn(['materialesTabla', 'update'], false)
    }
    case OPEN_MODAL: {
      return state.setIn(['materialesTabla', 'openModal'], true)
        .setIn(['materialesTabla', 'articuloSelec'], action.datos)
    }
    case CLOSE_MODAL: {
      return state.setIn(['materialesTabla', 'openModal'], false)
        .setIn(['materialesTabla', 'articuloSelec'], 0)
    }
    case GET_MATERIAL_DETALLE: {
      return state.setIn(['materialesTabla', 'stepper'], 1)
        .setIn(['materialesTabla', 'update'], true)
    }
    case SET_MATERIAL_DETALLE: {
      return state
        .setIn(['materialesTabla', 'agrupadorSlc'], action.datos[0].IdAgrupador)
        .setIn(['materialesTabla', 'materialNuevo', 'idMaterial', 'value'], action.datos[0].IdArticulo)
        .setIn(['materialesTabla', 'materialNuevo', 'idAgrupador', 'value'], parseInt(action.datos[0].IdAgrupador, 10))
        .setIn(['materialesTabla', 'materialNuevo', 'nombre', 'value'], action.datos[0].Nombre)
        .setIn(['materialesTabla', 'materialNuevo', 'precio', 'value'], action.datos[0].Precio)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMinimo', 'value'], action.datos[0].StockMinimo)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'value'], action.datos[0].StockMaximo)
    }
    case REGRESAR: {
      return state.setIn(['materialesTabla', 'stepper'], 0)
        .setIn(['materialesTabla', 'openModal'], false)
        .setIn(['materialesTabla', 'agrupadorSlc'], [])
        .setIn(['materialesTabla', 'materialNuevo', 'nombre', 'value'], [])
        .setIn(['materialesTabla', 'materialNuevo', 'precio', 'value'], [])
        .setIn(['materialesTabla', 'materialNuevo', 'stockMinimo', 'value'], [])
        .setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'value'], [])
        .setIn(['materialesTabla', 'materialNuevo', 'idAgrupador', 'error'], false)
        .setIn(['materialesTabla', 'materialNuevo', 'idAgrupador', 'texto'], "")
        .setIn(['materialesTabla', 'materialNuevo', 'nombre', 'error'], false)
        .setIn(['materialesTabla', 'materialNuevo', 'nombre', 'texto'], "")
        .setIn(['materialesTabla', 'materialNuevo', 'precio', 'error'], false)
        .setIn(['materialesTabla', 'materialNuevo', 'precio', 'texto'], "")
        .setIn(['materialesTabla', 'materialNuevo', 'stockMinimo', 'error'], false)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMinimo', 'texto'], "")
        .setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'error'], false)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'texto'], "")
    }
    case SET_NOMBRE: {
      const {
        nombre,
      } = action;
      return state.setIn(['materialesTabla', 'materialNuevo', 'nombre', 'value'], nombre)
        .setIn(['materialesTabla', 'materialNuevo', 'nombre', 'error'], false)
        .setIn(['materialesTabla', 'materialNuevo', 'nombre', 'texto'], "")
    }
    case SET_PRECIO: {
      const {
        precio,
      } = action;
      // eslint-disable-next-line radix
      const pre = parseInt(precio);
      const prevPrecio = state.getIn(['materialesTabla', 'materialNuevo', 'precio', 'value'])
      // eslint-disable-next-line no-nested-ternary
      let precioArticulo = precio < 0 ? precioArticulo = 0 : (pre > 9999999 ? prevPrecio : parseFloat(precio));
      const precio2 = precioArticulo.toString().split(".").map((el,i)=>i?el.split("").slice(0,2).join(""):el).join(".")
      return state.setIn(['materialesTabla', 'materialNuevo', 'precio', 'value'], precio2)
        .setIn(['materialesTabla', 'materialNuevo', 'precio', 'error'], false)
        .setIn(['materialesTabla', 'materialNuevo', 'precio', 'texto'], "")
    }
    case SET_STOCK_MINIMO: {
      const {
        stockMinimo,
      } = action;
      // eslint-disable-next-line radix
      const stkMin = parseInt(stockMinimo) < 0 ? 0 : parseInt(stockMinimo);

      return state.setIn(['materialesTabla', 'materialNuevo', 'stockMinimo', 'value'], stkMin)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMinimo', 'error'], false)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMinimo', 'texto'], "")
    }
    case SET_STOCK_MAXIMO: {

      const stockMinimo = state.getIn(['materialesTabla', 'materialNuevo', 'stockMinimo', 'value'])

      const {
        stockMaximo,
      } = action;
      let error = false;
      let texto = "";

      // eslint-disable-next-line radix
      const stkMax = parseInt(stockMaximo) < 0 ? 0 : parseInt(stockMaximo);

      // eslint-disable-next-line radix
      if (stkMax <= stockMinimo) {
        error = true;
        texto = "El stock máximo no puede ser menor al stock mínimo";
      } else {
        error = false;
        texto = "";
      }

      return state.setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'value'], stkMax)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'error'], error)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'texto'], texto)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'error'], false)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'texto'], "")
    }
    case SET_ERROR_AGRUPADOR: {
      return state.setIn(['materialesTabla', 'materialNuevo', 'idAgrupador', 'error'], true)
        .setIn(['materialesTabla', 'materialNuevo', 'idAgrupador', 'texto'], "*Requerido")
    }
    case SET_ERROR_NOMBRE: {
      return state.setIn(['materialesTabla', 'materialNuevo', 'nombre', 'error'], true)
        .setIn(['materialesTabla', 'materialNuevo', 'nombre', 'texto'], "*Requerido")
    }
    case SET_ERROR_PRECIO: {
      return state.setIn(['materialesTabla', 'materialNuevo', 'precio', 'error'], true)
        .setIn(['materialesTabla', 'materialNuevo', 'precio', 'texto'], "*Requerido")
    }
    case SET_ERROR_STOCK_MINIMO: {
      return state.setIn(['materialesTabla', 'materialNuevo', 'stockMinimo', 'error'], true)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMinimo', 'texto'], "*Requerido")
    }
    case SET_ERROR_STOCK_MAXIMO: {
      return state.setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'error'], true)
        .setIn(['materialesTabla', 'materialNuevo', 'stockMaximo', 'texto'], "*Requerido")
    }
    default:
      return state;
  }
}

export default materialesReducer;