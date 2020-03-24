/* eslint-disable no-else-return */
/*
 *
 * MovimientoAlmacen reducer
 *
 */
import React, {Fragment} from 'react';
import { fromJS, List } from 'immutable';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  SET_MOVIMIENTOS,
  REGRESAR,
  OPEN_MODAL,
  CLOSE_MODAL,
  NUEVO_MOVIMIENTO,
  ON_INPUT_CHANGE,
  SET_PLAZAS,
  SET_UBICACIONES,
  ON_CHANGE_SECCION_TAB,
  SET_MOLDES,
  SET_INSUMOS,
  SET_PIEZAS,
  SET_ALMACENES,
  SET_ACCESORIOS,
  ON_INPUT_CANTIDAD_ACCESORIO,
  SET_INSUMOS_SELECCIONADOS,
  SET_MOVIMIENTO_DETALLE,
  SET_PLANTAS,
  PLANTA_FILTER,
  ON_SEARCH_CHANGE,
  SET_PERMISOS,
  SET_INSUMOS_SLC,
  REGRESAR_STEPPER,
} = Actions.getConstants();

function movimientoAlmacenReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT: {
      return state;
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case REGRESAR_STEPPER: {
      return state.setIn(['movimientosAlmacenesTabla', 'stepper'], 0);
    }
    case SET_MOVIMIENTOS:{
      return state.setIn(['movimientosAlmacenesTabla', 'datos'], List(action.datos));
    }
    case REGRESAR: {
      const combos = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos']).toJS()
      const nuevoMovimiento = {
        guardarCompleto: true,
        IdMolde: '',
        IdDetalle: '',
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
          almacenOrigen: {
            valor: '',
            campoValido: false,
          },
          almacenDestino: {
            valor: '',
            campoValido: false,
          },
          observaciones: {
            valor: '',
            campoValido: false,
          },
          usos: {
            valor: '',
            campoValido: false,
          },
        },
        combos: {
          almacenes: [],
          plazas: combos.plazas,
          ubicaciones: combos.ubicaciones,
          ubicacionesOrigen: combos.ubicaciones,
          ubicacionesDestino: combos.ubicaciones,
          plantasPiezas: [],
          plantasAccesorios: [],
        },
        tablas: {
          moldes:{
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
      return state.setIn(['movimientosAlmacenesTabla', 'stepper'], 0)
        .setIn(['movimientosAlmacenesTabla', 'pestanaSlc'], null)
        .setIn(['movimientosAlmacenesTabla', 'disabled', 'pestana'], true)
        .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento'], fromJS(nuevoMovimiento))
        .setIn(['movimientosAlmacenesTabla', 'PDF'], fromJS())
        .setIn(['movimientosAlmacenesTabla', 'modal'], false)
    }
    case SET_MOVIMIENTO_DETALLE:{
      let pestana = 0;
      if(action.data.nuevoMovimiento.tablas.piezas.datos.length === 0) {
        pestana = 1;
      }
      
      return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento'], fromJS(action.data.nuevoMovimiento))
        .setIn(['movimientosAlmacenesTabla', 'disabled', 'pestana'], false)
        .setIn(['movimientosAlmacenesTabla', 'stepper'], 2)
        .setIn(['movimientosAlmacenesTabla', 'PDF'], fromJS(action.data.data))
        .setIn(['movimientosAlmacenesTabla', 'pestanaSlc'], pestana);
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
          return state.setIn(['movimientosAlmacenesTabla', 'modal'], modal)
            .setIn(['movimientosAlmacenesTabla', 'movimientoSelec'], action.data);
        case 2:
          modal.value = true;
          modal.text = 'Existen datos no guardados, ¿Desea continuar?';
          modal.stepper = action.stepper;
          return state.setIn(['movimientosAlmacenesTabla', 'modal'], modal);
        case 3:
          modal.value = true;
          modal.text = <Fragment>Los datos no podran ser modificados, <br/> ¿Desea continuar?</Fragment>;
          modal.stepper = action.stepper;
          return state.setIn(['movimientosAlmacenesTabla', 'modal'], modal);
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
      return state.setIn(['movimientosAlmacenesTabla', 'modal'], modal)
        .setIn(['movimientosAlmacenesTabla', 'movimientoSelec'], 0)
    }
    case NUEVO_MOVIMIENTO: {
      return state.setIn(['movimientosAlmacenesTabla', 'stepper'], 1)
    }
    case SET_PIEZAS: {
      let pestana = 0
      if (action.data.length === 0) {
        pestana = 1
      }
      
      return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'datos'], action.data)
        .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'IdMolde'], action.IdMolde)
        .setIn(['movimientosAlmacenesTabla', 'pestanaSlc'], pestana)
        .setIn(['movimientosAlmacenesTabla', 'disabled', 'pestana'], false)
        .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'seleccionados'], List())
        .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'seleccionados'], List())
    }
    case SET_ACCESORIOS: {
      action.data.forEach(accesorio => {
        accesorio.Input = accesorio.Cantidad
      });
      return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'datos'], action.data)
    }
    case SET_PLANTAS: {
      return state.setIn(['movimientosAlmacenesTabla', 'plantas'], List(action.data))
        .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'plantasPiezas'], List(action.data))
        .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'plantasAccesorios'], List(action.data))
    }
    case PLANTA_FILTER: {
      const {
        idPlanta,
        tipo,
      } = action;

      const IdMolde = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'IdMolde']);
      const IdAlmacen = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenOrigen', 'valor']);
      const IdInventario = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'inventario', 'valor']);
      const IdPlaza = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'plaza', 'valor']);
      const insumos = state.getIn(['movimientosAlmacenesTabla', 'insumosSlc']).toJS();
      const piezas = [...insumos]
      
      if(tipo === 1) {

        if(idPlanta === 0) {

          const datosPiezasFiltradas = piezas.filter(datoPieza => datoPieza.EsPieza && datoPieza.Cantidad > 0 )
          const rowPiezasSeleccionadas = [] 
          datosPiezasFiltradas.forEach((datoPieza,index) => {
            if(datoPieza.Seleccionado)
              rowPiezasSeleccionadas.push(index)
          })

          const filteredInsumos = datosPiezasFiltradas
          return state.setIn(['movimientosAlmacenesTabla', 'plantaSlcP'], idPlanta)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'datos'], filteredInsumos)   
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'seleccionados'], fromJS(rowPiezasSeleccionadas))   
        } else {

          const datosPiezasFiltradas = piezas.filter(datoPieza => datoPieza.IdPlanta === idPlanta && datoPieza.EsPieza && datoPieza.Cantidad > 0 )
          const rowPiezasSeleccionadas = [] 
          datosPiezasFiltradas.forEach((datoPieza,index) => {
            if(datoPieza.Seleccionado)
              rowPiezasSeleccionadas.push(index)
          })

          const filteredInsumos = datosPiezasFiltradas
          return state.setIn(['movimientosAlmacenesTabla', 'plantaSlcP'], idPlanta)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'datos'], filteredInsumos)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'seleccionados'], fromJS(rowPiezasSeleccionadas))   
        }

      } else {

        // eslint-disable-next-line no-lonely-if
        if(idPlanta === 0) {
          const filteredInsumos = insumos.filter(insumo => insumo.IdConfiguracionMolde === IdMolde && !insumo.EsPieza && insumo.IdPlaza === IdPlaza && insumo.IdAlmacen === IdAlmacen && insumo.IdInventario === IdInventario && insumo.Cantidad > 0)
          filteredInsumos.forEach(accesorio => {
            const obj = {
              valor: '',
              campoValido: true,
            }

            accesorio.Input = accesorio.Cantidad
            accesorio.datos = obj
          });
          return state.setIn(['movimientosAlmacenesTabla', 'plantaSlcA'], idPlanta)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'datos'], filteredInsumos)
        } else {
          const filteredInsumos = insumos.filter(insumo => insumo.IdConfiguracionMolde === IdMolde && !insumo.EsPieza && insumo.IdPlanta === idPlanta && insumo.IdPlaza === IdPlaza && insumo.IdAlmacen === IdAlmacen && insumo.IdInventario === IdInventario && insumo.Cantidad > 0)
          filteredInsumos.forEach(accesorio => {
            const obj = {
              valor: '',
              campoValido: true,
            }

            accesorio.Input = accesorio.Cantidad
            accesorio.datos = obj
          });
          return state.setIn(['movimientosAlmacenesTabla', 'plantaSlcA'], idPlanta)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'datos'], filteredInsumos)
        }
             
      }
    }

    case ON_SEARCH_CHANGE: {
      const tipoInsumo = action.tipo === 0 ? 'piezas':'accesorios'
      return state.setIn(['movimientosAlmacenesTabla','nuevoMovimiento', 'tablas',tipoInsumo,'textoBusqueda'],action.textoBusqueda)
    }

    case ON_INPUT_CHANGE: {
      const {
        campo,
        valor,
      } = action;

      const campos = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos']).toJS()
      const ubicaciones = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'ubicaciones']).toJS()
      const moldes = state.getIn(['movimientosAlmacenesTabla', 'moldes'])
      const piezas = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'seleccionados']).toJS()
      const accesorios = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'seleccionados']).toJS()
      let id;
      let bandera;
      switch (campo) {
        case 0: {
          id = 'descripcion';
          bandera = valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.almacenOrigen.valor !== '' &&
          campos.almacenDestino.valor !== '' &&
          campos.inventario.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)
          break;
        }
        case 1: {
          id = 'plaza';
          bandera = valor !== '' &&
          campos.descripcion.valor !== '' &&
          campos.almacenOrigen.valor !== '' &&
          campos.almacenDestino.valor !== '' &&
          campos.inventario.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)
          break;
        }
        case 2: {
          id = 'almacenOrigen';
          bandera = valor !== '' &&
          campos.descripcion.valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.almacenDestino.valor !== '' &&
          campos.inventario.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)
          break;
        }
        case 3: {
          id = 'almacenDestino';
          bandera = valor !== '' &&
          campos.descripcion.valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.almacenOrigen.valor !== '' &&
          campos.inventario.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)
          break;
        }
        case 4: {
          id = 'observaciones';
          bandera = campos.descripcion.valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.almacenOrigen.valor !== '' &&
          campos.almacenDestino.valor !== '' &&
          campos.inventario.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)
          break;
        }
        case 5: {
          id = 'usos';
          bandera = campos.descripcion.valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.almacenOrigen.valor !== '' &&
          campos.almacenDestino.valor !== '' &&
          campos.inventario.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)
          break;
        }
        case 6: {
          id = 'inventario';
          bandera = campos.descripcion.valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.almacenOrigen.valor !== '' &&
          campos.almacenDestino.valor !== '' &&
          valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)
          break;
        }
        default: {
          break;
        }
      }

      let arrayMoldes = [];

      if(id === 'almacenOrigen') {
        if(campos.plaza.valor === "" && valor !== "") {
          const ubicacionInd = ubicaciones.filter(ubicacion => ubicacion.IdAlmacen === valor)
          let filterUbicaciones 

          if (ubicacionInd[0].Referencia === 'ALMIDMOBR') {
            filterUbicaciones = ubicaciones.filter(ubicacion => ubicacion.IdAlmacen !== valor && ubicacion.Referencia !== 'ALMIDMPRO')
          } else if (ubicacionInd[0].Referencia === 'ALMIDMPRO') {
            filterUbicaciones = ubicaciones.filter(ubicacion => ubicacion.IdAlmacen !== valor && ubicacion.Referencia !== 'ALMIDMOBR')
          } else {
            filterUbicaciones = ubicaciones.filter(ubicacion => ubicacion.IdAlmacen !== valor)
          }
          return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'plaza', 'campoValido'], true)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'valor'], valor)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'campoValido'], valor === '')
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'ubicacionesDestino'], fromJS(filterUbicaciones))
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenDestino', 'valor'], '')
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenDestino', 'campoValido'], false)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'guardarCompleto'], false)
            .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], true)
        // eslint-disable-next-line no-else-return
        } else {
          const ubicacionInd = ubicaciones.filter(ubicacion => ubicacion.IdAlmacen === valor)
          const moldesFilter = moldes.filter(molde => molde.idAlmacen === valor && molde.idPlaza === campos.plaza.valor && molde.idInventario === campos.inventario.valor)
          moldesFilter.forEach(molde => {
            const insumos = molde.insumos.filter(insumo => insumo.IdAlmacen === molde.idAlmacen && insumo.IdInventario === molde.idInventario)
            molde.insumos = insumos
          });
          arrayMoldes = moldesFilter.filter(molde => molde.insumos.length !== 0)
          bandera = valor !== '' &&
          campos.descripcion.valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.almacenDestino.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)

          let filterUbicaciones 
          if (ubicacionInd[0].Referencia === 'ALMIDMOBR') {
            filterUbicaciones = ubicaciones.filter(ubicacion => ubicacion.IdAlmacen !== valor && ubicacion.Referencia !== 'ALMIDMPRO')
          } else if (ubicacionInd[0].Referencia === 'ALMIDMPRO') {
            filterUbicaciones = ubicaciones.filter(ubicacion => ubicacion.IdAlmacen !== valor && ubicacion.Referencia !== 'ALMIDMOBR')
          } else {
            filterUbicaciones = ubicaciones.filter(ubicacion => ubicacion.IdAlmacen !== valor)
          }

          return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'valor'], valor)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'campoValido'], valor === '')
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'moldes', 'datos'], arrayMoldes)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'datos'], List())
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'datos'], List())
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'seleccionados'], List())
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'seleccionados'], List())
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'ubicacionesDestino'], filterUbicaciones)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenDestino', 'valor'], '')
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenDestino', 'campoValido'], false)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'guardarCompleto'], false)
            .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], true)
        }
      // eslint-disable-next-line no-else-return
      } else if(id === 'plaza') {
        const almacenes = state.getIn(['movimientosAlmacenesTabla', 'almacenes']);
        const filterAlmacenes = almacenes.filter(almacen => almacen.IdPlaza === valor);
        
        if(campos.almacenOrigen.valor !== "" && valor !== "") {
          bandera = valor !== '' &&
          campos.descripcion.valor !== '' &&
          campos.almacenOrigen.valor !== '' &&
          campos.almacenDestino.valor !== '' &&
          campos.inventario.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)

          arrayMoldes = moldes.filter(molde => molde.idPlaza === valor && molde.idAlmacen === campos.almacenOrigen.valor);
          return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'valor'], valor)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'campoValido'], valor === '')
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'moldes', 'datos'], arrayMoldes)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'datos'], List())
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'datos'], List())
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'seleccionados'], List())
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'seleccionados'], List())
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'guardarCompleto'], bandera)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'almacenes'], filterAlmacenes)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'inventario', 'disabled'], false)
            .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], !bandera)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'inventario', 'valor'], '')
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenOrigen', 'valor'], '')
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenOrigen', 'disabled'], true)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenDestino', 'valor'], '')
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenDestino', 'disabled'], true)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'moldes', 'datos'], List())
        } else {
          return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'valor'], valor)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'campoValido'], valor === '')
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'guardarCompleto'], bandera)
            .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], !bandera)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'almacenes'], filterAlmacenes)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'inventario', 'disabled'], false)

        }
      } else if(id === 'almacenDestino') {
        bandera = valor !== '' &&
          campos.descripcion.valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.almacenOrigen.valor !== '' &&
          campos.inventario.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)

        return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'valor'], valor)
          .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'campoValido'], valor === '')
          .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'guardarCompleto'], bandera)
          .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], !bandera)
      } else if (id === 'usos') {
        if (valor <= 1) {
          bandera = campos.descripcion.valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.almacenOrigen.valor !== '' &&
          campos.inventario.valor !== '' &&
          campos.almacenDestino.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)

          return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'valor'], 1)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'campoValido'], valor === '')
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'guardarCompleto'], bandera)
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'guardarCompleto'], bandera)
            .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], !bandera)
        }
      } else if (id === 'inventario') {
        bandera = valor !== '' &&
          campos.plaza.valor !== '' &&
          campos.descripcion.valor !== '' &&
          campos.almacenOrigen.valor !== '' &&
          campos.almacenDestino.valor !== '' &&
          (accesorios.length > 0 || piezas.length > 0)

        return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'valor'], valor)
          .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenOrigen', 'valor'], '')
          .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenOrigen', 'disabled'], false)
          .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenDestino', 'valor'], '')
          .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', 'almacenDestino', 'disabled'], false)
          .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'moldes', 'datos'], List())
          .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'campoValido'], valor === '')
          .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'guardarCompleto'], bandera)
          .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'guardarCompleto'], bandera)
          .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], !bandera)
      }

      return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'valor'], valor)
        .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos', id, 'campoValido'], valor === '')
        .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'guardarCompleto'], bandera)
        .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], !bandera)
    }
    case SET_PLAZAS: {
      return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'plazas'], action.data)
    }
    case SET_ALMACENES: {
      return state.setIn(['movimientosAlmacenesTabla', 'almacenes'], action.data)
    }
    case SET_MOLDES: {
      return state.setIn(['movimientosAlmacenesTabla', 'moldes'], action.data)
    }
    case SET_INSUMOS: {
      return state.setIn(['movimientosAlmacenesTabla', 'insumos'], action.data)
    }
    case SET_INSUMOS_SLC: {
      return state.setIn(['movimientosAlmacenesTabla', 'insumosSlc'], fromJS(action.data))
    }
    case SET_INSUMOS_SELECCIONADOS: {

      const {
        seleccionados,
        // IdMolde,
        pestana,
      } = action;
      
      const plantaSlcP = state.getIn(['movimientosAlmacenesTabla', 'plantaSlcP'])
      const plantaSlcA = state.getIn(['movimientosAlmacenesTabla', 'plantaSlcA'])
      const campos = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'campos']).toJS()
      const piezasSelec = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'seleccionados']).toJS()
      const accesoriosSelec = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'seleccionados']).toJS()
      const datosPiezas = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'datos'])
      const piezas = [...datosPiezas]
      const datosAccesorios = state.getIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'datos'])
      const accesorios = [...datosAccesorios]      
      const insumos = state.getIn(['movimientosAlmacenesTabla', 'insumosSlc']).toJS()
      const {
        descripcion,
        plaza,
        almacenOrigen,
        almacenDestino,
      } = campos;

      let selec;
      if(pestana === 0) {
        let datosPiezasFiltradas

        if(plantaSlcP === 0){
          datosPiezasFiltradas = insumos.filter(datoPieza => datoPieza.EsPieza);;
        } else {
          datosPiezasFiltradas = insumos.filter(datoPieza => datoPieza.IdPlanta === plantaSlcP && datoPieza.EsPieza);
        }

        datosPiezasFiltradas.forEach((pieza,index) => {
          datosPiezasFiltradas[index].Seleccionado = false
        })
        seleccionados.forEach((row) => {
          datosPiezasFiltradas[row].Seleccionado = true
        })
        
        datosPiezasFiltradas.forEach((piezaFiltrada) => {
          piezas.forEach((pieza,index) => {
            if (piezaFiltrada.IdInsumo === pieza.IdInsumo){
              piezas[index].Seleccionado = piezaFiltrada.Seleccionado
            }
          })
        })

        if (
          seleccionados.length === 0 && accesoriosSelec.length === 0 ||
          descripcion.valor === '' ||
          plaza.valor === '' ||
          almacenOrigen.valor === '' ||
          almacenDestino.valor === '' ||
          campos.inventario.valor === ''
        ){
          selec = state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'seleccionados'], fromJS(seleccionados))
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'datos'], piezas)
            .setIn(['movimientosAlmacenesTabla', 'insumosSlc'], fromJS(insumos))
            .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], true)
        } else {
          selec = state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'seleccionados'], fromJS(seleccionados))
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'piezas', 'datos'], piezas)         
            .setIn(['movimientosAlmacenesTabla', 'insumosSlc'], fromJS(insumos))         
            .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], false)
        }
        
      } else {

        let datosAccesoriosFiltrados

        if(plantaSlcA === 0){
          datosAccesoriosFiltrados = insumos.filter(datoPieza => !datoPieza.EsPieza);
        } else {
          datosAccesoriosFiltrados = insumos.filter(datoPieza => datoPieza.IdPlanta === plantaSlcA && !datoPieza.EsPieza);
        }
          
        datosAccesoriosFiltrados.forEach((pieza,index) => {
          datosAccesoriosFiltrados[index].Seleccionado = false
        })
 
        seleccionados.forEach((row) => {
          datosAccesoriosFiltrados[row].Seleccionado = true
        })
 
        datosAccesoriosFiltrados.forEach((piezaFiltrada) => {
          accesorios.forEach((pieza,index) => {
            if (piezaFiltrada.IdInsumo === pieza.IdInsumo    ){
              accesorios[index].Seleccionado = piezaFiltrada.Seleccionado
            }
          })
        })

        // eslint-disable-next-line no-lonely-if
        if (seleccionados.length === 0 && piezasSelec.length === 0 ||
          descripcion.valor === '' ||
          plaza.valor === '' ||
          almacenOrigen.valor === '' ||
          almacenDestino.valor === '' ||
          campos.inventario.valor === ''
        ){
          selec = state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'seleccionados'], fromJS(seleccionados))
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'datos'], accesorios)
            .setIn(['movimientosAlmacenesTabla', 'insumosSlc'], fromJS(insumos))         
            .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], true)
        } else {
          selec = state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'seleccionados'], fromJS(seleccionados))
            .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'datos'], accesorios)
            .setIn(['movimientosAlmacenesTabla', 'insumosSlc'], fromJS(insumos))
            .setIn(['movimientosAlmacenesTabla', 'disabled', 'boton'], false)
        }
        
      }

      return selec;
    }
    case SET_UBICACIONES: {
      return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'ubicaciones'], fromJS(action.data))
        .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'ubicacionesOrigen'], fromJS(action.data))
        .setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'combos', 'ubicacionesDestino'], fromJS(action.data))
    }
    case ON_CHANGE_SECCION_TAB: {
      return state.setIn(['movimientosAlmacenesTabla', 'pestanaSlc'],action.id)
    }
    case ON_INPUT_CANTIDAD_ACCESORIO:{
      const {
        cantidad,
        index,
      } = action
      const insumos = state.getIn(['movimientosAlmacenesTabla', 'insumosSlc']).toJS()
      const accesorios = insumos.filter(accesorio => !accesorio.EsPieza)
      accesorios[index].datos.valor = cantidad;
      accesorios[index].datos.campoValido = cantidad !== '' || cantidad === 0;
      accesorios[index].Input = cantidad;
      return state.setIn(['movimientosAlmacenesTabla', 'nuevoMovimiento', 'tablas', 'accesorios', 'datos'], accesorios)
        .setIn(['movimientosAlmacenesTabla', 'insumosSlc'], fromJS(insumos))
    }
    default: {
      return state;
    }
  }
}

export default movimientoAlmacenReducer;
