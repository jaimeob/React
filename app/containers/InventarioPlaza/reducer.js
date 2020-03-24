/*
 *
 * InventarioPlaza reducer
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
  SET_MOVIMIENTOS,
  SET_REPORTES,
  SET_MOVIMIENTO_DETALLE,
  AGREGAR_NUEVO,
  REGRESAR,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_MODAL2,
  CLOSE_MODAL2,
  OPEN_MODAL3,
  CLOSE_MODAL3,
  OPEN_MODAL4,
  CLOSE_MODAL4,
  SET_ID,
  SET_ARTICULO_DETALLE,
  SET_CANTIDAD,
  SET_COMENTARIO,
  CLEAR_MODAL,
  CLEAR_ID,
  SET_PERMISOS,
} = Actions.getConstants();

function inventarioPlazaReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:
      return state;
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case SET_MATERIALES: {
      return state.setIn(['inventarioPlazaTabla', 'articulos'], List(action.datos))
        .setIn(['inventarioPlazaTabla', 'agrupadorSlc'], action.agrupador)
    }
    case SET_MOVIMIENTOS: {
      return state.setIn(['inventarioPlazaTabla', 'movimientos'], List(action.datos))
        .setIn(['inventarioPlazaTabla', 'plaza', 'id'], action.usuario.IdPlaza)
        .setIn(['inventarioPlazaTabla', 'plaza', 'nombre'], action.usuario.Plaza)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'plaza', 'Id'], action.usuario.IdPlaza)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'plaza', 'Nombre'], action.usuario.Plaza)
    }
    case SET_REPORTES: {
      return state.setIn(['inventarioPlazaTabla', 'reportes'], List(action.datos))
    }
    case SET_AGRUPADORES: {
      return state.setIn(['inventarioPlazaTabla', 'agrupadores'], List(action.datos))
    }
    case SET_ROW: {
      
      return state.updateIn(['inventarioPlazaTabla', 'movimiento', 'rows'], rows => rows.push(
        action.row
      )).setIn(['inventarioPlazaTabla', 'modal'], false)
        .setIn(['inventarioPlazaTabla', 'agrupadorSlc'], [])
        .setIn(['inventarioPlazaTabla', 'materialSlc'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Id'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'StockMaximo'], 0)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Existencia'], 0)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'IdArticulo'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'IdModulo'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Cantidad'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Comentario'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Agrupador'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Nombre'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Precio'], [])
        .setIn(['inventarioPlazaTabla', 'disabled'], true)
    }
    case CLEAR_MODAL: {
      return state
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Cantidad'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Comentario'], []);
    }
    case SET_MOVIMIENTO_DETALLE: {
      return state.setIn(['inventarioPlazaTabla', 'movimientoDetalle', 'rows'], List(action.datos))
        .setIn(['inventarioPlazaTabla', 'stepper'],1)
    }
    case REMOVE_ROW: {
      let rows = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['inventarioPlazaTabla', 'movimiento', 'rows']
          )
        )
      );
      const {
        row,
      } = action;
      const filteredKeywords = rows.filter((word) => word.IdArticulo !== row.IdArticulo);
      rows = filteredKeywords;
      return state.setIn(['inventarioPlazaTabla', 'movimiento','rows'], List(rows))
        .setIn(['inventarioPlazaTabla', 'movimiento', 'row'], List())
        .setIn(['inventarioPlazaTabla', 'modal4'], false)
    }
    case SET_ROW_EMPTY: {
      return state.setIn(['inventarioPlazaTabla', 'movimiento', 'rows'], List([]))
        .setIn(['inventarioPlazaTabla', 'stepper'], 0)
    }
    case AGREGAR_NUEVO: {
      return state.setIn(['inventarioPlazaTabla', 'stepper'], 2)
    }
    case REGRESAR: {
      return state.setIn(['inventarioPlazaTabla', 'stepper'], 0)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'rows'], List([]))
        .setIn(['inventarioPlazaTabla', 'modal2'], false)
        .setIn(['inventarioPlazaTabla', 'modal3'], false)
    }
    case OPEN_MODAL: {
      return state.setIn(['inventarioPlazaTabla', 'modal'], true)
    }
    case CLEAR_ID: {
      return state.setIn(['inventarioPlazaTabla', 'materialSlc'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Id'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'StockMaximo'], 0)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Existencia'], 0)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'IdArticulo'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'IdModulo'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Cantidad'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Comentario'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Agrupador'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Nombre'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Precio'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'CantidadAutorizada'], 0)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'CantidadSolicitada'], 0)
    }
    case CLOSE_MODAL: {
      return state.setIn(['inventarioPlazaTabla', 'modal'], false)
        .setIn(['inventarioPlazaTabla', 'agrupadorSlc'], [])
        .setIn(['inventarioPlazaTabla', 'materialSlc'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Id'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'StockMaximo'], 0)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Existencia'], 0)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'IdArticulo'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'IdModulo'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Cantidad'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Comentario'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Agrupador'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Nombre'], [])
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Precio'], [])
        .setIn(['inventarioPlazaTabla', 'disabled'], true)
        .setIn(['inventarioPlazaTabla', 'modal3'], false)
        .setIn(['inventarioPlazaTabla', 'error', 'value'], false)
        .setIn(['inventarioPlazaTabla', 'error', 'texto'], '')
    }
    case OPEN_MODAL2: {
      return state.setIn(['inventarioPlazaTabla', 'modal2'], true)
    }
    case CLOSE_MODAL2: {
      return state.setIn(['inventarioPlazaTabla', 'modal2'], false)
    }
    case OPEN_MODAL3: {
      return state.setIn(['inventarioPlazaTabla', 'modal3'], true)
    }
    case CLOSE_MODAL3: {
      return state.setIn(['inventarioPlazaTabla', 'modal3'], false)
    }
    case OPEN_MODAL4: {
      return state.setIn(['inventarioPlazaTabla', 'modal4'], true)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'row'], action.datos)
    }
    case CLOSE_MODAL4: {
      return state.setIn(['inventarioPlazaTabla', 'modal4'], false)
    }
    case SET_ID: {
      const {
        id,
      } = action;
      return state.setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Id'], id)
    }
    case SET_CANTIDAD: {
      const {
        cantidad,
      } = action;

      const artDet = JSON.parse(
        JSON.stringify(
          state.getIn(
            ['inventarioPlazaTabla', 'movimiento', 'datos']
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
        // eslint-disable-next-line no-lonely-if
        if(cantidad > artDet.Existencia){
          cantidadSolicitada = artDet.Existencia;
          error = true;
          texto = "La cantidad no puede ser mayor al stockMaximo";
        } else {
          // eslint-disable-next-line radix
          cantidadSolicitada = parseInt(cantidad);
          error = false;
          texto = "";
        }
      }

      return state.setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Cantidad'], cantidadSolicitada)
        .setIn(['inventarioPlazaTabla', 'error', 'value'], error)
        .setIn(['inventarioPlazaTabla', 'error', 'texto'], texto)
    }
    case SET_COMENTARIO: {
      const {
        comentario,
      } = action;
      return state.setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Comentario'], comentario)
    }
    case SET_ARTICULO_DETALLE: {
      const {
        datos,
      } = action;
      return state.setIn(['inventarioPlazaTabla', 'agrupadorSlc'], datos.IdAgrupador)
        .setIn(['inventarioPlazaTabla', 'materialSlc'], datos.IdArticulo)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Id'], datos.IdArticulo)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'StockMaximo'], datos.StockMaximo)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Existencia'], datos.ExistencialActual)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'IdArticulo'], datos.IdArticulo)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'IdModulo'], datos.IdAgrupador)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Agrupador'], datos.Agrupador)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Nombre'], datos.Nombre)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'Precio'], datos.Precio)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'CantidadAutorizada'], datos.CantidadAutorizada)
        .setIn(['inventarioPlazaTabla', 'movimiento', 'datos', 'CantidadSolicitada'], datos.CantidadSolicitada)
        .setIn(['inventarioPlazaTabla', 'disabled'], false)
    }
    default:
      return state;
  }
}

export default inventarioPlazaReducer;