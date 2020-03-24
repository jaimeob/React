/* eslint-disable no-else-return */
/*
 *
 * Transformacion reducer
 *
 */

import { fromJS, List } from 'immutable';
import { groupBy, pick, omit, uniqBy, values, flatten, partialRight, flow, orderBy} from 'lodash';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  SET_DATOS_GENERALES,
  NUEVO_PRESTAMO,
  ON_INPUT_CHANGE,
  AGREGAR_PRESTAMO,
  REMOVE_ROW,
  EDITAR_PRESTAMO,
  EDIT_ROW,
  CLEAR_SNACKBAR,
  REGRESAR,
  SET_PRESTAMO_DETALLE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_PERMISOS,
} = Actions.getConstants();

function prestamoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:{
      return state;
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case REGRESAR: {
      const combos = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'combos']).toJS()
      const disabled = {
        agregar: true,
        guardar: true,
      }

      const modal = {
        value: false,
        stepper: 0,
        text: '',
        options: 'Select',
      }
    
      const nuevoPrestamo = {
        campos: {
          descripcion: {
            valor: '',
            campoValido: false,
            disabled: false,
          },
          plaza: {
            valor: '',
            campoValido: false,
            disabled: false,
          },
          almacen: {
            valor: '',
            campoValido: false,
            disabled: true,
          },
          moldeOrigen: {
            valor: '',
            campoValido: false,
            disabled: true,
          },
          moldeDestino: {
            valor: '',
            campoValido: false,
            disabled: true,
          },
          piezaOrigen: {
            valor: '',
            campoValido: false,
            disabled: true,
          },
          piezaDestino: {
            valor: '',
            campoValido: false,
            disabled: true,
          },
        },
        combos: {
          plazas: combos.plazas,
          almacenes: [],
          moldesOrigen: [],
          moldesDestino: [],
          piezasOrigen: [],
          piezasDestino: [],
        },
        tablas: {
          prestamos:{
            seleccionados: [],
            datos: [],
          },
        },
      }
      
      return state.setIn(['prestamoTabla', 'nuevoPrestamo'], fromJS(nuevoPrestamo))
        .setIn(['prestamoTabla', 'disabled'], fromJS(disabled))
        .setIn(['prestamoTabla', 'stepper'], 0)
        .setIn(['prestamoTabla', 'snackbar'], 0)
        .setIn(['prestamoTabla', 'modal'], fromJS(modal))
        .setIn(['prestamoTabla', 'update'], false)
        .setIn(['prestamoTabla', 'updateRegistro'], false)
        .setIn(['prestamoTabla', 'idxRegistro'], '')
    }
    case SET_DATOS_GENERALES: {
      const {
        datos: {
          almacenes,
          almacenesPlaza,
          plazas,
          prestamos,
          insumos,
          moldesAlmacenes,
        },
      } = action

      plazas.forEach(plaza => {
        const almacenesPlazaFilter = almacenesPlaza.filter(registro => registro.IdPlaza === plaza.IdPlaza)
        plaza.AlmacenPlazas = almacenesPlazaFilter;
      });
      const almacenesPlazaAP = plazas.filter(plaza => plaza.AlmacenPlazas.length > 0)

      return state.setIn(['prestamoTabla', 'datos'], List(prestamos))
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'plazas'], fromJS(almacenesPlazaAP))
        .setIn(['prestamoTabla', 'almacenes'], fromJS(almacenes))
        .setIn(['prestamoTabla', 'insumos'], fromJS(insumos))
        .setIn(['prestamoTabla', 'almacenesPlaza'], fromJS(almacenesPlaza))
        .setIn(['prestamoTabla', 'moldesAlmacenes'], fromJS(moldesAlmacenes))
    }
    case NUEVO_PRESTAMO: {
      return state.setIn(['prestamoTabla', 'stepper'], 1)
    }
    case ON_INPUT_CHANGE: {
      const {
        campo,
        valor,
      } = action;

      let id;
      let bandera;
      switch (campo) {
        case 0: {
          id = 'descripcion';
          break;
        }
        case 1: {
          id = 'plaza';
          break;
        }
        case 2: {
          id = 'almacen';
          break;
        }
        case 3: {
          id = 'moldeOrigen';
          break;
        }
        case 4: {
          id = 'piezaOrigen';
          break;
        }
        case 5: {
          id = 'moldeDestino';
          break;
        }
        case 6: {
          id = 'piezaDestino';
          break;
        }
        default: {
          break;
        }
      }

      const registros = state.getIn(['prestamoTabla', 'almacenesPlaza']).toJS()
      const almacenes = state.getIn(['prestamoTabla', 'almacenes']).toJS()
      const insumos = state.getIn(['prestamoTabla', 'insumos']).toJS()
      const moldesAlmacenes = state.getIn(['prestamoTabla', 'moldesAlmacenes']).toJS()
      const campos = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'campos']).toJS()

      if(id === 'descripcion') {
        const rows = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'tablas', 'prestamos', 'datos']).toJS()
        bandera = valor !== '' && rows.length > 0;

        return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', id, 'valor'], valor)
          .setIn(['prestamoTabla', 'disabled', 'guardar'], !bandera)
      } else if(id === 'plaza') {
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
        
        return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', id, 'valor'], valor)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'almacenes'], fromJS(almacenesFilter))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'almacen', 'disabled'], false)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'almacen', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeOrigen', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeDestino', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeOrigen', 'disabled'], true)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeDestino', 'disabled'], true)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'disabled'], true)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'disabled'], true)
          .setIn(['prestamoTabla', 'disabled', 'guardar'], true)
          .setIn(['prestamoTabla', 'disabled', 'agregar'], true)

      } else if (id === 'almacen') {
        
        const moldes = moldesAlmacenes.filter(molde => molde.IdInventario === valor)

        return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', id, 'valor'], valor)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'moldesOrigen'], fromJS(uniqBy(moldes, 'IdMolde')))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'moldesDestino'], fromJS(uniqBy(moldes, 'IdMolde')))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeOrigen', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeDestino', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeOrigen', 'disabled'], false)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeDestino', 'disabled'], false)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeOrigen', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeDestino', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'disabled'], true)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'disabled'], true)
          .setIn(['prestamoTabla', 'disabled', 'guardar'], true)
          .setIn(['prestamoTabla', 'disabled', 'agregar'], true)

      } else if(id === 'moldeOrigen') {

        const moldes = moldesAlmacenes.filter(molde => molde.IdInventario === campos.almacen.valor)
        const moldesDestino = moldes.filter(molde => molde.IdMolde !== valor)
        const moldesOrigen = moldes.filter(molde => molde.IdMolde !== campos.moldeDestino.valor)

        const insumosOrigen = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdMolde === valor && insumo.Existencia > 0 && insumo.Referencia === "ALMIDMALM")
        return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', id, 'valor'], valor)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'moldesOrigen'], fromJS(uniqBy(moldesOrigen, 'IdMolde')))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'moldesDestino'], fromJS(uniqBy(moldesDestino, 'IdMolde')))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'piezasOrigen'], fromJS(orderBy(insumosOrigen, ['EsPieza', 'IdCodigo'], ['desc', 'asc'])))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'disabled'], false)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'valor'], '')
          .setIn(['prestamoTabla', 'disabled', 'agregar'], true)
          .setIn(['prestamoTabla', 'disabled', 'guardar'], true)

      } else if(id === 'moldeDestino') {

        const moldes = moldesAlmacenes.filter(molde => molde.IdInventario === campos.almacen.valor)
        const moldesOrigen = moldes.filter(molde => molde.IdMolde !== valor)
        const moldesDestino = moldes.filter(molde => molde.IdMolde !== campos.moldeOrigen.valor)
        const moldeDestino = moldes.filter(molde => molde.IdMolde === valor)
        const insumosDestino = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdConfiguracionMolde === uniqBy(moldeDestino, 'IdMolde')[0].IdConfiguracionMolde && insumo.Existencia < insumo.CantidadMax || (!insumo.Existencia && insumo.IdConfiguracionMolde === uniqBy(moldeDestino, 'IdMolde')[0].IdConfiguracionMolde && !insumo.IdInventario))
        const insumosFaltantes = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdMolde === valor && insumo.Existencia < insumo.CantidadMax)
        const insumosExistencia = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdMolde === valor && insumo.Existencia === insumo.CantidadMax)
        
        const IFIds = []
        const IEIds = []
        insumosFaltantes.forEach(insumo => {
          IFIds.push(insumo.IdInsumo)
        });

        insumosExistencia.forEach(insumo => {
          IEIds.push(insumo.IdInsumo)
        });

        const filterInsumos1 = flow(
          partialRight(groupBy, x => x.IdInsumo),
          partialRight(omit, uniqBy(IEIds)),
          values,
          flatten
        )(insumosDestino)

        const filteredArray  = filterInsumos1.filter( insumo => {
          return IFIds.filter( InsumoId => {
            return InsumoId === insumo.IdInsumo && insumo.IdInventario === null;
          }).length === 0
        });

        const finalFilter = filteredArray.filter(insumo => (insumo.IdMolde === valor || insumo.IdMolde === null) && insumo.Referencia === 'ALMIDMALM')

        return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', id, 'valor'], valor)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'moldesOrigen'], fromJS(uniqBy(moldesOrigen, 'IdMolde')))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'moldesDestino'], fromJS(uniqBy(moldesDestino, 'IdMolde')))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'piezasDestino'], fromJS(orderBy(finalFilter, ['EsPieza', 'IdCodigo'], ['desc', 'asc'])))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'disabled'], false)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'valor'], '')
          .setIn(['prestamoTabla', 'disabled', 'guardar'], true)
          .setIn(['prestamoTabla', 'disabled', 'agregar'], true)

      } else if(id === 'piezaOrigen') {
        bandera = valor !== '' && campos.piezaDestino.valor !== '';
        return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', id, 'valor'], valor)
          .setIn(['prestamoTabla', 'disabled', 'agregar'], !bandera)
      } else if(id === 'piezaDestino') {
        bandera = valor !== '' && campos.piezaOrigen.valor !== '';

        return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', id, 'valor'], valor)
          .setIn(['prestamoTabla', 'disabled', 'agregar'], !bandera)
      }

      return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', id, 'valor'], valor)
    }
    case AGREGAR_PRESTAMO: {
      const combos = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'combos']).toJS()
      const campos = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'campos']).toJS()
      const tabla = [...state.getIn(['prestamoTabla', 'nuevoPrestamo', 'tablas', 'prestamos', 'datos']).toJS()]
      const insumoOrigen = combos.piezasOrigen.filter(insumo => insumo.IdCodigo === campos.piezaOrigen.valor)[0]
      const insumoDestino = combos.piezasDestino.filter(insumo => insumo.IdCodigo === campos.piezaDestino.valor)[0]
      const codigosOrigen = []
      const codigosDestino = []

      codigosOrigen.push(insumoOrigen.IdCodigo)
      codigosDestino.push(insumoDestino.IdCodigo)
      
      tabla.forEach(registro => {
        codigosOrigen.push(registro.CodigoOrigen)
        codigosDestino.push(registro.CodigoDestino)
      });

      const insumosOrigen = flow(
        partialRight(groupBy, x => x.IdCodigo),
        partialRight(omit, uniqBy(codigosOrigen)),
        values,
        flatten
      )(combos.piezasOrigen)

      const insumosDestino = flow(
        partialRight(groupBy, x => x.IdCodigo),
        partialRight(omit, uniqBy(codigosDestino)),
        values,
        flatten
      )(combos.piezasDestino)

      const diferencia = insumoDestino.CantidadMax - insumoDestino.Existencia
      let monto = 0;
      let estatus = 'REFINC'
      if(insumoOrigen.Existencia > diferencia) {
        monto = diferencia
        estatus = 'REFCOM'
      } else {
        monto = insumoOrigen.Existencia
      }
      const registro = {
        IdRegistro: `${insumoOrigen.IdCodigo}-${insumoDestino.IdCodigo}`,
        CodigoOrigen: insumoOrigen.IdCodigo,
        InsumoOrigen: insumoOrigen.Insumo,
        IdentificadorOrigen: insumoOrigen.Identificador,
        Monto: monto,
        CodigoDestino: insumoDestino.IdCodigo,
        InsumoDestino: insumoDestino.Insumo,
        IdentificadorDestino: insumoDestino.Identificador,
        MoldeOrigen: campos.moldeOrigen.valor,
        MoldeDestino: campos.moldeDestino.valor,
        EsPieza: insumoDestino.EsPieza ? 1 : 0,
        Estatus: estatus,
      }

      const existeOrigen = tabla.filter(ind => ind.CodigoOrigen === registro.CodigoOrigen)
      const existeDestino = tabla.filter(ind => ind.CodigoDestino === registro.CodigoDestino)
      
      if(insumoOrigen.EsPieza !== insumoDestino.EsPieza){
        return state.setIn(['prestamoTabla', 'snackbar'], `1.${Math.floor(Math.random() * 1000000)}`);
      }

      if(existeOrigen.length > 0) {
        return state.setIn(['prestamoTabla', 'snackbar'], `2.${Math.floor(Math.random() * 1000000)}`);
      } else if(existeDestino.length > 0) {
        return state.setIn(['prestamoTabla', 'snackbar'], `3.${Math.floor(Math.random() * 1000000)}`);
      }

      tabla.push(registro)

      const bandera = campos.descripcion.valor !== '' && tabla.length > 0

      return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'plaza', 'disabled'], true)
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'almacen', 'disabled'], true)
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeOrigen', 'disabled'], true)
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeDestino', 'disabled'], true)
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'tablas', 'prestamos', 'datos'], fromJS(tabla))
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'valor'], '')
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'valor'], '')
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'piezasOrigen'], fromJS(insumosOrigen))
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'piezasDestino'], fromJS(insumosDestino))
        .setIn(['prestamoTabla', 'disabled', 'agregar'], true)
        .setIn(['prestamoTabla', 'disabled', 'guardar'], !bandera)
        .setIn(['prestamoTabla', 'snackbar'], 0);
    }
    case REMOVE_ROW: {
        
      const rows = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'tablas', 'prestamos', 'datos']).toJS()
      const campos = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'campos']).toJS()
      const insumos = state.getIn(['prestamoTabla', 'insumos']).toJS()
      
      const {
        row,
      } = action;
      const filteredKeywords = rows.filter(ind => ind.IdRegistro !== row);
      const bandera = campos.descripcion.valor !== '' && rows.length > 0;
      
      const registro = rows.filter(reg => reg.IdRegistro === row)[0]
      const insumosOrigen = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdMolde === registro.MoldeOrigen && insumo.Existencia > 0 && insumo.Referencia === "ALMIDMALM")
      const insumoOrigen = insumosOrigen.filter(insumo => insumo.IdCodigo === registro.CodigoOrigen)[0]
      
      const moldesAlmacenes = state.getIn(['prestamoTabla', 'moldesAlmacenes']).toJS()
      const moldes = moldesAlmacenes.filter(molde => molde.IdInventario === campos.almacen.valor)
      const moldeDestino = moldes.filter(molde => molde.IdMolde === campos.moldeDestino.valor)
      const insumosDestino = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdConfiguracionMolde === uniqBy(moldeDestino, 'IdMolde')[0].IdConfiguracionMolde && insumo.Existencia < insumo.CantidadMax || (!insumo.Existencia && insumo.IdConfiguracionMolde === uniqBy(moldeDestino, 'IdMolde')[0].IdConfiguracionMolde && !insumo.IdInventario))
      const insumosFaltantes = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdMolde === registro.MoldeDestino && insumo.Existencia < insumo.CantidadMax)
      const insumosExistencia = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdMolde === registro.MoldeDestino && insumo.Existencia === insumo.CantidadMax)
      const codigosOrigen = []
      const codigosDestino = []
      
      filteredKeywords.forEach(reg => {
        codigosOrigen.push(reg.CodigoOrigen)
        codigosDestino.push(reg.CodigoDestino)
      });

      const insumosOrigenFilter = flow(
        partialRight(groupBy, x => x.IdCodigo),
        partialRight(omit, uniqBy(codigosOrigen)),
        values,
        flatten
      )(insumosOrigen)

      codigosOrigen.push(insumoOrigen.IdCodigo)

      const IFIds = []
      const IEIds = []
      insumosFaltantes.forEach(insumo => {
        IFIds.push(insumo.IdInsumo)
      });

      insumosExistencia.forEach(insumo => {
        IEIds.push(insumo.IdInsumo)
      });

      const filterInsumos1 = flow(
        partialRight(groupBy, x => x.IdInsumo),
        partialRight(omit, uniqBy(IEIds)),
        values,
        flatten
      )(insumosDestino)

      const filteredArray  = filterInsumos1.filter( insumo => {
        return IFIds.filter( InsumoId => {
          return InsumoId === insumo.IdInsumo && insumo.IdInventario === null;
        }).length === 0
      });

      const finalFilter = filteredArray.filter(insumo => (insumo.IdMolde === registro.MoldeDestino || insumo.IdMolde === null) && insumo.Referencia === 'ALMIDMALM')
      
      const insumosDestinoFilter = flow(
        partialRight(groupBy, x => x.IdCodigo),
        partialRight(omit, uniqBy(codigosDestino)),
        values,
        flatten
      )(finalFilter)

      if (filteredKeywords.length === 0) {
        return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'tablas', 'prestamos', 'datos'], fromJS(filteredKeywords))
          .setIn(['prestamoTabla', 'snackbar'], `5.${Math.floor(Math.random() * 1000000)}`)
          .setIn(['prestamoTabla', 'disabled', 'guardar'], true)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'piezasOrigen'], fromJS(insumosOrigenFilter))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'piezasDestino'], fromJS(insumosDestinoFilter))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'plaza', 'disabled'], false)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'almacen', 'disabled'], false)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeOrigen', 'disabled'], false)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeDestino', 'disabled'], false)
          .setIn(['prestamoTabla', 'updateRegistro'], false)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'valor'], '')
      } else {
        return state.setIn(['prestamoTabla', 'nuevoPrestamo', 'tablas', 'prestamos', 'datos'], fromJS(filteredKeywords))
          .setIn(['prestamoTabla', 'snackbar'], `5.${Math.floor(Math.random() * 1000000)}`)
          .setIn(['prestamoTabla', 'disabled', 'guardar'], !bandera)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'piezasOrigen'], fromJS(insumosOrigenFilter))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'piezasDestino'], fromJS(insumosDestinoFilter))
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'plaza', 'disabled'], true)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'almacen', 'disabled'], true)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeOrigen', 'disabled'], true)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'moldeDestino', 'disabled'], true)
          .setIn(['prestamoTabla', 'updateRegistro'], false)
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'valor'], '')
          .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'valor'], '')
      }
    }
    case EDIT_ROW: {
      const insumos = state.getIn(['prestamoTabla', 'insumos']).toJS()
      const rows = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'tablas', 'prestamos', 'datos']).toJS()
      const campos = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'campos']).toJS()
      const index =  rows.map(e => e.IdRegistro).indexOf(action.row);
      const registro = rows.filter(row => row.IdRegistro === action.row)[0]
      
      const insumosOrigen = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdMolde === registro.MoldeOrigen && insumo.Existencia > 0 && insumo.Referencia === "ALMIDMALM")
      const insumoOrigen = insumosOrigen.filter(insumo => insumo.IdCodigo === registro.CodigoOrigen)[0]
      const filteredKeywords = rows.filter(ind => ind.IdRegistro !== action.row);      
      const moldesAlmacenes = state.getIn(['prestamoTabla', 'moldesAlmacenes']).toJS()
      const moldes = moldesAlmacenes.filter(molde => molde.IdInventario === campos.almacen.valor)
      const moldeDestino = moldes.filter(molde => molde.IdMolde === campos.moldeDestino.valor)
      const insumosDestino = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdConfiguracionMolde === uniqBy(moldeDestino, 'IdMolde')[0].IdConfiguracionMolde && insumo.Existencia < insumo.CantidadMax || (!insumo.Existencia && insumo.IdConfiguracionMolde === uniqBy(moldeDestino, 'IdMolde')[0].IdConfiguracionMolde && !insumo.IdInventario))
      const insumosFaltantes = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdMolde === registro.MoldeDestino && insumo.Existencia < insumo.CantidadMax)
      const insumosExistencia = insumos.filter(insumo => insumo.IdPlaza === campos.plaza.valor && insumo.IdInventario === campos.almacen.valor && insumo.IdMolde === registro.MoldeDestino && insumo.Existencia === insumo.CantidadMax)

      const codigosOrigen = []
      const codigosDestino = []

      filteredKeywords.forEach(reg => {
        codigosOrigen.push(reg.CodigoOrigen)
        codigosDestino.push(reg.CodigoDestino)
      });

      const insumosOrigenFilter = flow(
        partialRight(groupBy, x => x.IdCodigo),
        partialRight(omit, uniqBy(codigosOrigen)),
        values,
        flatten
      )(insumosOrigen)

      codigosOrigen.push(insumoOrigen.IdCodigo)

      const IFIds = []
      const IEIds = []
      insumosFaltantes.forEach(insumo => {
        IFIds.push(insumo.IdInsumo)
      });

      insumosExistencia.forEach(insumo => {
        IEIds.push(insumo.IdInsumo)
      });

      const filterInsumos1 = flow(
        partialRight(groupBy, x => x.IdInsumo),
        partialRight(omit, uniqBy(IEIds)),
        values,
        flatten
      )(insumosDestino)

      const filteredArray  = filterInsumos1.filter( insumo => {
        return IFIds.filter( InsumoId => {
          return InsumoId === insumo.IdInsumo && insumo.IdInventario === null;
        }).length === 0
      });

      const finalFilter = filteredArray.filter(insumo => (insumo.IdMolde === registro.MoldeDestino || insumo.IdMolde === null) && insumo.Referencia === 'ALMIDMALM')
      
      const insumosDestinoFilter = flow(
        partialRight(groupBy, x => x.IdCodigo),
        partialRight(omit, uniqBy(codigosDestino)),
        values,
        flatten
      )(finalFilter)

      return state.setIn(['prestamoTabla', 'updateRegistro'], true)
        .setIn(['prestamoTabla', 'disabled', 'agregar'], false)
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'valor'], registro.CodigoOrigen)
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'valor'], registro.CodigoDestino)
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'piezasOrigen'], fromJS(insumosOrigenFilter))
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'combos', 'piezasDestino'], fromJS(insumosDestinoFilter))
        .setIn(['prestamoTabla', 'idxRegistro'], index)
    }
    case EDITAR_PRESTAMO : {
      const campos = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'campos']).toJS()
      const combos = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'combos']).toJS()
      const insumoOrigen = combos.piezasOrigen.filter(insumo => insumo.IdCodigo === campos.piezaOrigen.valor)[0]
      const insumoDestino = combos.piezasDestino.filter(insumo => insumo.IdCodigo === campos.piezaDestino.valor)[0]

      return state.setIn(['prestamoTabla', 'updateRegistro'], false)
        .setIn(['prestamoTabla', 'disabled', 'agregar'], true)
        .setIn(['prestamoTabla', 'snackbar'], `4.${Math.floor(Math.random() * 1000000)}`)
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaOrigen', 'valor'], '')
        .setIn(['prestamoTabla', 'nuevoPrestamo', 'campos', 'piezaDestino', 'valor'], '')
        .updateIn(
          ['prestamoTabla', 'nuevoPrestamo', 'tablas', 'prestamos', 'datos', action.idxRegistro],
          stt => stt.merge({
            IdRegistro: `${insumoOrigen.IdCodigo}-${insumoDestino.IdCodigo}`,
            CodigoOrigen: insumoOrigen.IdCodigo,
            InsumoOrigen: insumoOrigen.Insumo,
            IdentificadorOrigen: insumoOrigen.Identificador,
            CodigoDestino: insumoDestino.IdCodigo,
            InsumoDestino: insumoDestino.Insumo,
            IdentificadorDestino: insumoDestino.Identificador,
          })
        )
    }
    case CLEAR_SNACKBAR : {
      return state.setIn(['prestamoTabla', 'snackbar'], 0)
    }
    case SET_PRESTAMO_DETALLE : {

      return state.setIn(['prestamoTabla', 'stepper'], 2)
        .setIn(['prestamoTabla', 'update'], true)
        .setIn(['prestamoTabla', 'nuevoPrestamo'], fromJS(action.data))
    }
    case OPEN_MODAL: {
      const modal = {
        value: false,
        stepper: 0,
        text: '',
        options: 'Select',
      }

      const registros = state.getIn(['prestamoTabla', 'nuevoPrestamo', 'tablas', 'prestamos', 'datos']).toJS();

      switch (action.stepper) {
        case 1:
          modal.value = true;
          modal.text = 'Los datos no podran ser modificados, ¿Desea continuar?';
          modal.stepper = action.stepper;
          modal.options = 'Select';
          return state.setIn(['prestamoTabla', 'modal'], modal);
        case 2:
          modal.value = true;
          modal.text = 'Existen datos no guardados, ¿Desea continuar?';
          modal.stepper = action.stepper;
          modal.options = 'Select';
          return state.setIn(['prestamoTabla', 'modal'], modal);
        case 3:
          // eslint-disable-next-line no-case-declarations
          const registro = registros.filter(reg => reg.IdPrestamoDetalle === action.data)[0]
          if(registro.ExistenciaTotal === 0) {
            modal.value = true;
            modal.text = 'Esta pieza ya no existe en inventario, no es posible realizar la devolución';
            modal.stepper = 4;
            modal.options = '';
          } else if(registro.ExistenciaTotal > 0 && registro.ExistenciaTotal < registro.CantPrestada){
            modal.value = true;
            modal.text = `Existen solo ${registro.ExistenciaTotal} piezas de ${registro.CantPrestada} que se prestaron, ¿Desea realizar la devolucion de esta cantidad?`;
            modal.stepper = action.stepper;
          } else if(registro.ExistenciaTotal >= registro.CantPrestada && registro.CantAlm < registro.CantPrestada){
            modal.value = true;
            modal.text = `Actualmente no se encuentra disponible la cantidad prestada en almacén, favor de hacer un movimiento de obra a almacén`;
            modal.stepper = 4;
            modal.options = '';
          } else {
            modal.value = true;
            modal.text = 'La devolución no podra ser modificada, ¿Desea continuar?';
            modal.stepper = action.stepper;
          }
       
          return state.setIn(['prestamoTabla', 'modal'], modal)
            .setIn(['prestamoTabla', 'prestamoSlc'], action.data);
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
        options: 'Select',
      }
      return state.setIn(['prestamoTabla', 'modal'], modal)
        .setIn(['prestamoTabla', 'prestamoSelec'], null)
    }
    default: {
      return state;
    } 
  }
}

export default prestamoReducer;
