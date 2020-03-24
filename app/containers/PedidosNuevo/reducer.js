/*
 *
 * PedidosNuevo reducer
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
  SET_ROW,
  REMOVE_ROW,
  SET_ROW_EMPTY,
  LIMPIAR_STATE,
  CLEAR_MODAL,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL2,
  CLOSE_MODAL2,
  OPEN_MODAL3,
  CLOSE_MODAL3,
  OPEN_MODAL4,
  CLOSE_MODAL4,
  SET_ID,
  SET_CANTIDAD,
  SET_COMENTARIO,
  SET_ARTICULO_DETALLE,
  REGRESAR,
  CLEAR_ID,
  SET_PLAZA,
} = Actions.getConstants();

function pedidosNuevoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:
      return state;
    case SET_PLAZA: {
      return state.setIn(['pedidosNuevoTabla', 'pedido', 'plaza', 'Id'], action.usuario.IdPlaza)
        .setIn(['pedidosNuevoTabla', 'pedido', 'plaza', 'Nombre'], action.usuario.Plaza)
    }
    case SET_MATERIALES: {
      return state.setIn(['pedidosNuevoTabla', 'articulos'], List(action.datos))
        .setIn(['pedidosNuevoTabla', 'agrupadorSlc'], action.agrupador)
    }
    case SET_AGRUPADORES: {
      return state.setIn(['pedidosNuevoTabla', 'agrupadores'], List(action.datos))
    }
    case SET_ROW: {
      return state.updateIn(['pedidosNuevoTabla', 'pedido', 'rows'], rows => rows.push(
        action.row
      )).setIn(['pedidosNuevoTabla', 'modal'], false)
        .setIn(['pedidosNuevoTabla', 'agrupadorSlc'], [])
        .setIn(['pedidosNuevoTabla', 'materialSlc'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Id'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'StockMaximo'], 0)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Existencia'], 0)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'IdArticulo'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'IdModulo'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Cantidad'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Comentario'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Agrupador'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Nombre'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Precio'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'CantidadAutorizada'], 0)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'CantidadSolicitada'], 0)
        .setIn(['pedidosNuevoTabla', 'disabled'], true)
    }
    case CLEAR_MODAL: {
      return state
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Cantidad'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Comentario'], []);
    }
    case REMOVE_ROW: {
      let rows = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['pedidosNuevoTabla', 'pedido', 'rows']
          )
        )
      );
      
      const {
        row,
      } = action;
      const filteredKeywords = rows.filter((word) => word.IdArticulo !== row.IdArticulo);
      rows = filteredKeywords;
      return state.setIn(['pedidosNuevoTabla', 'pedido','rows'], List(rows))
        .setIn(['pedidosNuevoTabla', 'pedido', 'row'], List())
        .setIn(['pedidosNuevoTabla', 'modal4'], false)
    }
    case SET_ROW_EMPTY: {
      return state.setIn(['pedidosNuevoTabla', 'pedido', 'rows'], List([]))
        .setIn(['pedidosNuevoTabla', 'guardo'], true)
    }
    case OPEN_MODAL: {
      return state.setIn(['pedidosNuevoTabla', 'modal'], true)
    }
    case CLEAR_ID: {
      return state.setIn(['pedidosNuevoTabla', 'materialSlc'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Id'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'StockMaximo'], 0)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Existencia'], 0)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'IdArticulo'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'IdModulo'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Cantidad'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Comentario'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Agrupador'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Nombre'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Precio'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'CantidadAutorizada'], 0)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'CantidadSolicitada'], 0)
    }
    case CLOSE_MODAL: {
      return state.setIn(['pedidosNuevoTabla', 'modal'], false)
        .setIn(['pedidosNuevoTabla', 'modal3'], false)
        .setIn(['pedidosNuevoTabla', 'agrupadorSlc'], [])
        .setIn(['pedidosNuevoTabla', 'materialSlc'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Id'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'StockMaximo'], 0)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Existencia'], 0)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'IdArticulo'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'IdModulo'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Cantidad'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Comentario'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Agrupador'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Nombre'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Precio'], [])
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'CantidadAutorizada'], 0)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'CantidadSolicitada'], 0)
        .setIn(['pedidosNuevoTabla', 'error', 'value'], false)
        .setIn(['pedidosNuevoTabla', 'error', 'texto'], '')
    }
    case OPEN_MODAL2: {
      return state.setIn(['pedidosNuevoTabla', 'modal2'], true)
    }
    case CLOSE_MODAL2: {
      return state.setIn(['pedidosNuevoTabla', 'modal2'], false)
    }
    case OPEN_MODAL3: {
      return state.setIn(['pedidosNuevoTabla', 'modal3'], true)
    }
    case CLOSE_MODAL3: {
      return state.setIn(['pedidosNuevoTabla', 'modal3'], false)
    }
    case OPEN_MODAL4: {
      return state.setIn(['pedidosNuevoTabla', 'modal4'], true)
        .setIn(['pedidosNuevoTabla', 'pedido', 'row'], action.datos)
    }
    case CLOSE_MODAL4: {
      return state.setIn(['pedidosNuevoTabla', 'modal4'], false)
    }
    case LIMPIAR_STATE: {
      return initialState;
    }
    case SET_ID: {
      const {
        id,
      } = action;
      return state.setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Id'], id)
    }
    case SET_CANTIDAD: {
      const {
        cantidad,
      } = action;

      const artDet = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['pedidosNuevoTabla', 'pedido', 'datos']
          )
        )
      );

      let cantidadSolicitada = 0;
      let error = false;
      let texto = "";

      // eslint-disable-next-line radix
      if(parseInt(cantidad) < 0) {
        cantidadSolicitada = 0
      } else {
        // eslint-disable-next-line radix
        cantidadSolicitada = parseInt(cantidad);
        // error = false;
        // texto = "";
        if(cantidad > ((artDet.StockMaximo - artDet.Existencia - artDet.CantidadSolicitada - artDet.CantidadAutorizada))){
          cantidadSolicitada = artDet.StockMaximo - artDet.Existencia - artDet.CantidadSolicitada - artDet.CantidadAutorizada;
          error = true;
          texto = "La cantidad no puede ser mayor al stock máximo";
        }
      }

      return state.setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Cantidad'], cantidadSolicitada)
        .setIn(['pedidosNuevoTabla', 'error', 'value'], error)
        .setIn(['pedidosNuevoTabla', 'error', 'texto'], texto)
    }
    case SET_COMENTARIO: {
      const {
        comentario,
      } = action;
      return state.setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Comentario'], comentario)
    }
    case SET_ARTICULO_DETALLE: {
      const {
        datos,
      } = action;
      return state.setIn(['pedidosNuevoTabla', 'agrupadorSlc'], datos.IdAgrupador)
        .setIn(['pedidosNuevoTabla', 'materialSlc'], datos.IdArticulo)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Id'], datos.IdArticulo)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'StockMaximo'], datos.StockMaximo)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Existencia'], datos.ExistencialActual)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'IdArticulo'], datos.IdArticulo)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'IdModulo'], datos.IdAgrupador)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Agrupador'], datos.Agrupador)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Nombre'], datos.Nombre)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'Precio'], datos.Precio)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'CantidadAutorizada'], datos.CantidadAutorizada)
        .setIn(['pedidosNuevoTabla', 'pedido', 'datos', 'CantidadSolicitada'], datos.CantidadSolicitada)
        .setIn(['pedidosNuevoTabla', 'disabled'], false)
    }
    case REGRESAR: {
      return state.setIn(['pedidosNuevoTabla', 'regresar'], true)
        .setIn(['pedidosNuevoTabla', 'modal2'], false)
        .setIn(['pedidosNuevoTabla', 'modal3'], false)
    }
    default:
      return state;
  }
}

export default pedidosNuevoReducer;