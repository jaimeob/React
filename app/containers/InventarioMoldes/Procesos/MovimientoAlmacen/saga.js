/* eslint-disable object-shorthand */
// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, select} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import { parseInt } from 'lodash';
import Actions from './actions';
import { obtenerPermisos } from '../../../../services/api';

import {
  getMovimientos,
  deleteMovimiento,
  getPlazas,
  getAlmacenes,
  getUbicaciones,
  getMoldes,
  getInsumos,
  postMovimiento,
  getMovimientoDetalle,
} from './api';

export const {
  GET_MOLDES,
  GET_MOVIMIENTOS,
  GET_PLAZAS,
  DELETE_MOVIMIENTO,
  GET_UBICACIONES,
  GET_INSUMOS_MOLDES,
  POST_MOVIMIENTO,
  GET_MOVIMIENTO_DETALLE,
  OBTENER_PERMISOS,

} = Actions.getConstants();
// Individual exports for testing

export function* obtenerPermisosAction(){
  const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  
  const {
    status,
    data,
  } = yield call(obtenerPermisos, {...paramsPermisos, idUsuario});

  if(status === 200){
    yield put(
      Actions.get('SET_PERMISOS').fn(data.permisos),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los permisos',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getMovimientosAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getMovimientos);

    if(status === 200){
      yield put(
        Actions.get('SET_MOVIMIENTOS').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los movimientos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getMovimientoDetalleAction(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getMovimientoDetalle, action.idMovimientoAlmacen);
    
    const movimiento = yield select((state) => state.getIn(['movimientoAlmacen','movimientosAlmacenesTabla', 'nuevoMovimiento']).toJS());
    const nuevoMovimiento = {...movimiento}
    
    nuevoMovimiento.IdDetalle = action.idMovimientoAlmacen;
    nuevoMovimiento.campos.descripcion.valor = data[0][0].Descripcion
    nuevoMovimiento.campos.almacenOrigen.valor = data[0][0].IdAlmacenOrigen
    nuevoMovimiento.campos.almacenDestino.valor = data[0][0].IdAlmacenDestino
    nuevoMovimiento.campos.observaciones.valor = data[0][0].Observaciones
    nuevoMovimiento.campos.plaza.valor = data[0][0].IdPlaza

    data[1].forEach(insumo => {
      if (!insumo.EsPieza) {
        insumo.Input = insumo.Cantidad
        nuevoMovimiento.tablas.accesorios.datos.push(insumo)
      } else {
        nuevoMovimiento.tablas.piezas.datos.push(insumo)
      }
    });
    
    const molde = {
      idMolde: data[0][0].IdConfiguracionMolde,
      Nombre: data[0][0].Molde,
      Version: data[0][0].Version,
      Estatus: data[0][0].Estatus,
    }
    
    nuevoMovimiento.tablas.moldes.datos.push(molde)
    const arrayFinal = {
      nuevoMovimiento : nuevoMovimiento,
      data : data,
    }

    if(status === 200){
      yield put(
        Actions.get('SET_MOVIMIENTO_DETALLE').fn(arrayFinal)
      );
      yield put(
        Actions.get('CLOSE_MODAL').fn(nuevoMovimiento)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los movimientos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postMovimientoAction() {
  try {
    const nuevoMovimiento = yield select((state) => state.getIn(['movimientoAlmacen','movimientosAlmacenesTabla', 'nuevoMovimiento']).toJS());
    const insumos = yield select((state) => state.getIn(['movimientoAlmacen', 'movimientosAlmacenesTabla','insumosSlc']).toJS());
    const global = yield select((state) => state.getIn(['global']).toJS());
    const usuario = {IdUsuario: global.currentUser.UsuarioId, NoEmpleado: global.currentUser.IdEmpleado}
    
    if(nuevoMovimiento.tablas.piezas.seleccionados.length === 0 && nuevoMovimiento.tablas.accesorios.seleccionados.length === 0){
      yield put(
        enqueueSnackbar({
          message: 'No se encuentran piezas y/o accesorios seleccionados',
          options: {
            variant: 'error',
          },
        })
      );
    } else {

      const campos = {...nuevoMovimiento.campos};
      // eslint-disable-next-line prefer-destructuring
      const IdMolde = nuevoMovimiento.IdMolde;
      const piezas = insumos.filter(pieza => pieza.EsPieza && pieza.Seleccionado);
      const accesorios = insumos.filter(pieza => !pieza.EsPieza && pieza.Seleccionado);
      const movimiento = [];

      // nuevoMovimiento.tablas.piezas.seleccionados.forEach(index => {
      //   piezas.push(nuevoMovimiento.tablas.piezas.datos[index])
      // });
      // nuevoMovimiento.tablas.accesorios.seleccionados.forEach(index => {
      //   accesorios.push(nuevoMovimiento.tablas.accesorios.datos[index])
      // });

      piezas.forEach(pieza => {
        pieza.CantUsos = pieza.Usos + parseInt(campos.usos.valor === '' ? 0 : campos.usos.valor)
      });

      accesorios.forEach(accesorio => {
        accesorio.CantUsos = accesorio.Usos + parseInt(campos.usos.valor === '' ? 0 : campos.usos.valor)
      });

      movimiento.push(campos);
      movimiento.push(piezas);
      movimiento.push(accesorios);
      movimiento.push(IdMolde);
      movimiento.push(usuario);
      const {
        status,
      } = yield call(postMovimiento, movimiento);

      if(status === 200){
        yield put(
          Actions.get('REGRESAR').fn()
        );
        yield put(
          Actions.get('GET_MOVIMIENTOS').fn()
        );
        yield put(
          Actions.get('GET_MOLDES').fn()
        );
        yield put(
          enqueueSnackbar({
            message: 'El movimiento fue realizado correctamente',
            options: {
              variant: 'success',
            },
          })
        );
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar el movimiento',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getPlazasAction() {
  try {
    const global = yield select((state) => state.getIn(['global']).toJS());

    const datos = {
      usuarioId : global.currentUser.UsuarioId,
      idPlaza : null,
    }

    const {
      status,
      data = [],
    } = yield call(getPlazas, datos);
    
    const almacenes =  yield call(getAlmacenes, datos);

    if(status === 200){
      yield put(
        Actions.get('SET_PLAZAS').fn(data)
      );
      yield put(
        Actions.get('SET_ALMACENES').fn(almacenes.data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las Plazas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getUbicacionesAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getUbicaciones);

    if(status === 200){
      yield put(
        Actions.get('SET_UBICACIONES').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las ubicaciones',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getMoldesAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getMoldes);
    const insumos = yield call(getInsumos)
    data.forEach(molde => {
      const filter = insumos.data.filter((insumo) => insumo.IdConfiguracionMolde === molde.idConfiguracionMolde && insumo.Cantidad > 0 && insumo.RefEstatus !== 'REFPRE')
      molde.insumos = filter;

      // const temp = [];
      // molde.insumos.forEach(insumo => {
      //   temp.push(insumo.RefEstatus)
      // });
      // const incompleto = temp.filter(inc => inc === 'REFINC')
      // const danado = temp.filter(dan => dan === 'REFDAN')
      // if(incompleto.length > 0) {
      //   molde.Estatus = 'Incompleto';
      // } else {
      //   // eslint-disable-next-line no-lonely-if
      //   if(danado > 0) {
      //     molde.Estatus = 'Piezas dañadas';
      //   } else {
      //     molde.Estatus = 'Completo';
      //   }
      // }
    });

    const filterMoldes = data.filter(molde => molde.insumos.length !== 0)
    if(status === 200){
      yield put(
        Actions.get('SET_MOLDES').fn(filterMoldes)
      );
      yield put(
        Actions.get('SET_INSUMOS').fn(insumos.data.filter(insumo => insumo.RefEstatus !== 'REFPRE'))
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los moldes',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getInsumosMoldesAction(action) {
  try {
    const {
      IdPlaza,
      IdConfiguracionMolde,
      IdAlmacen,
      Plantas,
      IdMolde,
      IdInventario,
    } = action

    const arrayPlantas = []

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < Plantas; i++) {
      if (i === 0) {
        arrayPlantas.push({Id: i + 1, Planta: 'Planta baja'})
      } else {
        arrayPlantas.push({Id: i + 1, Planta: `Nivel ${i}`})
      }
    }

    const {
      status,
      data = [],
    } = yield call(getInsumos, IdPlaza, IdConfiguracionMolde, IdAlmacen, IdMolde);
    
    data.forEach(insumo => {
      insumo.Seleccionado = false;
    });
    const piezas = data.filter(pieza => pieza.EsPieza && pieza.Cantidad > 0 && pieza.IdInventario === IdInventario && pieza.RefEstatus !== 'REFPRE')
    const accesorios = data.filter(accesorio => !accesorio.EsPieza && accesorio.Cantidad > 0 && accesorio.IdInventario === IdInventario && accesorio.RefEstatus !== 'REFPRE')
    const filter = data.filter(accesorio => accesorio.Cantidad > 0 && accesorio.IdInventario === IdInventario && accesorio.RefEstatus !== 'REFPRE')
    accesorios.forEach(accesorio => {
      const obj = {
        valor: '',
        campoValido: true,
      }

      accesorio.datos = obj
    });
    
    if(status === 200){
      yield put(
        Actions.get('SET_PIEZAS').fn(piezas, IdMolde)
      );
      yield put(
        Actions.get('SET_ACCESORIOS').fn(accesorios)
      );
      yield put(
        Actions.get('SET_PLANTAS').fn(arrayPlantas)
      );
      yield put(
        Actions.get('SET_INSUMOS_SLC').fn(filter)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las piezas y/o accesorios',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* deleteMovimientoAction(action) {
  try {
    const {
      status,
    } = yield call(deleteMovimiento, action.idMovimiento);
    
    if(status === 200){
      yield put(
        Actions.get('CLOSE_MODAL').fn()
      );
      yield put(
        Actions.get('GET_MOVIMIENTOS').fn()
      );
      yield put(
        enqueueSnackbar({
          message: 'El movimiento fue eliminado con éxito',
          options: {
            variant: 'success',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al eliminar el movimiento',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Individual exports for testing
export default function* movimientoAlmacenSaga() {
  // See example in containers/HomePage/saga.js
  yield[
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosAction
    ),
    takeLatest(
      GET_MOVIMIENTOS,
      getMovimientosAction
    ),
    takeLatest(
      DELETE_MOVIMIENTO,
      deleteMovimientoAction
    ),
    takeLatest(
      GET_PLAZAS,
      getPlazasAction
    ),
    takeLatest(
      GET_UBICACIONES,
      getUbicacionesAction
    ),
    takeLatest(
      GET_MOLDES,
      getMoldesAction
    ),
    takeLatest(
      GET_INSUMOS_MOLDES,
      getInsumosMoldesAction
    ),
    takeLatest(
      POST_MOVIMIENTO,
      postMovimientoAction
    ),
    takeLatest(
      GET_MOVIMIENTO_DETALLE,
      getMovimientoDetalleAction
    ),
  ]
}
