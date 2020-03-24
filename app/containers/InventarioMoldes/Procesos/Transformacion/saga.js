// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, select} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';

import { groupBy, pick, uniqBy, values, flatten, partialRight, flow} from 'lodash';

import Actions from './actions';
import { obtenerPermisos } from '../../../../services/api';

import {
  getMovimientosTransformaciones,
  getPlazas,
  getTransformaciones,
  getMoldes,
  postMovimiento,
  getInsumos,
  getMovimientoDetalle,
  getAlmacenes,
  getMoldesDestino,
  devolverMovimiento,
} from './api';

export const {
  GET_MOVIMIENTOS_TRANSFORMACIONES,
  GET_PLAZAS,
  GET_TRANSFORMACIONES,
  GET_MOLDES,
  POST_MOVIMIENTO,
  SET_MOLDE_SELECCIONADO,
  GET_MOVIMIENTO_TRANSFORMACION_DETALLE,
  GET_MOLDES_DESTINO,
  OBTENER_PERMISOS,
  DEVOLVER,
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

export function* getMovimientosTransformacionesAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getMovimientosTransformaciones);

    if(status === 200){
      yield put(
        Actions.get('SET_MOVIMIENTOS_TRANSFORMACIONES').fn(data)
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

// export function* getMovimientoTransformacionDetalleAction(action) {
//   try {
//     const {
//       status,
//       data = [],
//     } = yield call(getMovimientoDetalle, action.idTransformacion);

//     const plazas = yield select((state) => state.getIn(['transformacion','transformacionTabla', 'nuevaTransformacion', 'combos', 'plazas']).toJS());
//     const transformaciones = yield call(getTransformaciones)

//     const moldes = yield call(getMoldes)

//     const piezas = []
//     const accesorios = []
    
//     const arraryTransOrigen = []
//     transformaciones.data.forEach(transformacion => {
//       arraryTransOrigen.push(transformacion.IdMoldeOrigen)
//     });

//     const arraryTransDestino = []
//     transformaciones.data.forEach(transformacion => {
//       arraryTransDestino.push(transformacion.IdMoldeDestino)
//     });
    
//     // const obj = flow(
//     //   partialRight(groupBy, x => x.identificador),
//     //   partialRight(map, (value, key) => ({identificador: key, arreglos: value})),
//     // )(pieza.datos)

//     const moldesOrigen = flow(
//       partialRight(groupBy, x => x.idConfiguracionMolde),
//       partialRight(pick, uniqBy(arraryTransOrigen)),
//       values,
//       flatten
//     )(moldes.data)


//     const moldesDestino = flow(
//       partialRight(groupBy, x => x.idConfiguracionMolde),
//       partialRight(pick, uniqBy(arraryTransDestino)),
//       values,
//       flatten
//     )(moldes.data)
    
    
//     const moldeOrigen = 
//     // uniqBy(
//       moldesOrigen.filter(
//         molde => molde.idPlaza === data[0][0].IdPlaza && molde.idInventario === data[0][0].IdInventario && molde.idMolde === data[0][0].IdMoldeOrigen
//       )
//       // , 'idConfiguracionMolde'
//     // )
//     // .filter(molde => molde.idMolde === data[0][0].IdMoldeOrigen)
//     const moldeDestino =
//     //  _.uniqBy(
//       moldesDestino.filter(
//         molde => molde.idPlaza === data[0][0].IdPlaza && molde.idInventario === data[0][0].IdInventario && molde.idMolde === data[0][0].IdMoldeDestino
//       )
//     //   , 'idConfiguracionMolde').filter(
//     //   molde => molde.idMolde === data[0][0].IdMoldeDestino
//     // )

//     const idMoldes = {
//       idMoldeOrigen: data[0][0].IdMoldeOrigen,
//       idMoldeDestino: data[0][0].IdMoldeDestino,
//       idPlaza: data[0][0].IdPlaza,
//       idInventario: data[0][0].IdInventario,
//       idMolde : moldeDestino[0].idMolde,
//       bandera : 1,
//     }

//     const insumos = yield call(getInsumos, idMoldes);
//     // const filterInsumos = insumos.data[0]
//     const filterInsumos = insumos.data[0].filter(insumo => insumo.Existencia)
//     const plantasIds= []
//     filterInsumos.forEach(insumo => {
//       plantasIds.push(insumo.IdPlanta)
//       if(insumo.EsPieza) {
//         piezas.push(insumo)
//       } else {
//         accesorios.push(insumo)
//       }
//     });
    
//     if(uniqBy(plantasIds).length > 1) {
//       moldeOrigen[0].planta = `Todas`
//     } else {
//       // eslint-disable-next-line no-lonely-if
//       if(uniqBy(plantasIds)[0] === 1) {
//         moldeOrigen[0].planta = `planta baja`
//       } else {
//         moldeOrigen[0].planta = `nivel-${uniqBy(plantasIds)[0] - 1}`
//       }
//     }
    
//     const nuevaTransformacion = {
//       campos: {
//         descripcion: {
//           valor: data[0][0].Descripcion,
//           campoValido: false,
//         },
//         plaza: {
//           valor: data[0][0].IdPlaza,
//           campoValido: false,
//         },
//         idMoldeOrigen: {
//           valor: data[0][0].IdMoldeOrigen,
//           campoValido: false,
//         },
//         idMoldeDestino: {
//           valor: data[0][0].IdMoldeDestino,
//           campoValido: false,
//         },
//         observaciones: {
//           valor: data[0][0].Observaciones,
//           campoValido: false,
//         },
//       },
//       combos: {
//         // eslint-disable-next-line object-shorthand
//         plazas: plazas,
//         plantas: [],
//       },
//       tablas: {
//         moldesOrigen:{
//           seleccionados: [],
//           datos: moldeOrigen,
//         },
//         moldesDestino:{
//           seleccionados: [],
//           datos: moldeDestino,
//         },
//         piezas: {
//           seleccionados: [],
//           datos: flow(
//             partialRight(groupBy, x => x.IdPlanta),
//             partialRight(pick, uniqBy(plantasIds)),
//             values,
//             flatten,
//             // value,
//           )(piezas),

//           // datos: _(piezas)
//           //   .groupBy('IdPlanta')
//           //   .pick(_.uniqBy(plantasIds))
//           //   .values()
//           //   .flatten()
//           //   .value(),
//         },
//         accesorios: {
//           seleccionados: [],
//           datos: flow(
//             partialRight(groupBy, x => x.IdPlanta),
//             partialRight(pick, uniqBy(plantasIds)),
//             values,
//             flatten,
//             // value,
//           )(accesorios),

//           // datos: _(accesorios)
//           //   .groupBy('IdPlanta')
//           //   .pick(_.uniqBy(plantasIds))
//           //   .values()
//           //   .flatten()
//           //   .value(),
//         },
//       },
//     }
//     if(status === 200){
//       yield put(
//         Actions.get('SET_MOVIMIENTO_TRANSFORMACION_DETALLE').fn(nuevaTransformacion)
//       );
//     }
//   } catch (error) {
//     yield put(
//       enqueueSnackbar({
//         message: 'Hubo un error al obtener el detalle',
//         options: {
//           variant: 'error',
//         },
//       })
//     );
//   }
// }

export function* getMovimientoTransformacionDetalleAction(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getMovimientoDetalle, action.idTransformacion);
    const plazas = yield select((state) => state.getIn(['transformacion','transformacionTabla', 'nuevaTransformacion', 'combos', 'plazas']).toJS());
    const moldeOrigen = data[2]
    const moldeDestino = data[3]
    
    const piezas = []
    const accesorios = []

    const idMoldes = {
      idMoldeOrigen: data[0][0].IdMoldeOrigen,
      idMoldeDestino: data[0][0].IdMoldeDestino,
      idPlaza: data[0][0].IdPlaza,
      idInventario: data[0][0].IdInventario,
      idMolde : moldeDestino[0].idMolde,
      bandera : 1,
    }
    
    const insumos = yield call(getInsumos, idMoldes);

    // const filterInsumos = insumos.data[0]
    const filterInsumos = insumos.data[0].filter(insumo => insumo.Existencia)
    const plantasIds= []
    filterInsumos.forEach(insumo => {
      plantasIds.push(insumo.IdPlanta)
      if(insumo.EsPieza) {
        piezas.push(insumo)
      } else {
        accesorios.push(insumo)
      }
    });
    
    if(uniqBy(plantasIds).length > 1) {
      moldeOrigen[0].planta = `Todas`
    } else {
      // eslint-disable-next-line no-lonely-if
      if(uniqBy(plantasIds)[0] === 1) {
        moldeOrigen[0].planta = `planta baja`
      } else {
        moldeOrigen[0].planta = `nivel-${uniqBy(plantasIds)[0] - 1}`
      }
    }
    
    const nuevaTransformacion = {
      idTransformacion : action.idTransformacion,
      estatus: data[0][0].Estatus,
      campos: {
        descripcion: {
          valor: data[0][0].Descripcion,
          campoValido: false,
        },
        plaza: {
          valor: data[0][0].IdPlaza,
          campoValido: false,
        },
        inventario: {
          valor: data[0][0].IdInventario,
          campoValido: false,
        },
        idMoldeOrigen: {
          valor: data[0][0].IdMoldeOrigen,
          campoValido: false,
        },
        idMoldeDestino: {
          valor: data[0][0].IdMoldeDestino,
          campoValido: false,
        },
        observaciones: {
          valor: data[0][0].Observaciones,
          campoValido: false,
        },
      },
      combos: {
        // eslint-disable-next-line object-shorthand
        plazas: plazas,
        plantas: [],
      },
      tablas: {
        moldesOrigen:{
          seleccionados: [],
          datos: moldeOrigen,
        },
        moldesDestino:{
          seleccionados: [],
          datos: moldeDestino,
        },
        piezas: {
          seleccionados: [],
          datos: flow(
            partialRight(groupBy, x => x.IdPlanta),
            partialRight(pick, uniqBy(plantasIds)),
            values,
            flatten,
            // value,
          )(piezas),

          // datos: _(piezas)
          //   .groupBy('IdPlanta')
          //   .pick(_.uniqBy(plantasIds))
          //   .values()
          //   .flatten()
          //   .value(),
        },
        accesorios: {
          seleccionados: [],
          datos: flow(
            partialRight(groupBy, x => x.IdPlanta),
            partialRight(pick, uniqBy(plantasIds)),
            values,
            flatten,
            // value,
          )(accesorios),

          // datos: _(accesorios)
          //   .groupBy('IdPlanta')
          //   .pick(_.uniqBy(plantasIds))
          //   .values()
          //   .flatten()
          //   .value(),
        },
      },
    }
    
    if(status === 200){
      yield put(
        Actions.get('SET_MOVIMIENTO_TRANSFORMACION_DETALLE').fn(nuevaTransformacion)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el detalle',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getTransformacionesAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getTransformaciones);

    if(status === 200){
      yield put(
        Actions.get('SET_TRANSFORMACIONES').fn(data)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las transformaciones',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getMoldesDestinoAction(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getMoldesDestino, action.idMolde);
    if(status === 200){
      yield put(
        Actions.get('SET_MOLDES_DESTINO').fn(action.idMolde, action.idConfiguracionMolde, data, action.plantas)
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

export function* getMoldesAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getMoldes);
    
    const transformaciones = yield call(getTransformaciones);
    const filterMoldes = data.filter(molde => molde.refAlmacen === 'ALMIDMALM')
    let moldes = []
    for (let i = 0; i < transformaciones.data.length; i+= 1) {
      moldes = filterMoldes.filter(molde => molde.idConfiguracionMolde === transformaciones.data[i].IdMoldeOrigen && molde.refAlmacen === 'ALMIDMALM')
      for (let j = 0; j < moldes.length; j+=1) {

        const idMoldes = {
          idMoldeOrigen: transformaciones.data[i].IdMoldeOrigen,
          idMoldeDestino: transformaciones.data[i].IdMoldeDestino,
          idPlaza: moldes[j].idPlaza,
          idMolde : moldes[j].idMolde,
          idInventario : moldes[j].idInventario,
          bandera: 0,
        }
        const insumos = yield call(getInsumos, idMoldes)

        const filterInsumos = insumos.data[0].filter(insumo => insumo.Existencia && insumo.Existencia > 0)
        moldes[j].insumos = filterInsumos
      }
    }
    
    if(status === 200){
      yield put(
        Actions.get('SET_MOLDES').fn(filterMoldes)
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

export function* setMoldeSeleccionadoAction(action) {
  try {
    if(action.data.length > 0) {
      const nuevoMovimiento = yield select((state) => state.getIn(['transformacion','transformacionTabla', 'nuevaTransformacion']).toJS());
      const moldesOrigen = nuevoMovimiento.tablas.moldesOrigen.datos;
      const moldesDestino = nuevoMovimiento.tablas.moldesDestino.datos;
      const filterMolde = moldesOrigen.filter(molde => molde.idMolde === nuevoMovimiento.campos.idMoldeOrigen.valor)

      const idMoldes = {
        idMoldeOrigen: nuevoMovimiento.campos.idCMoldeOrigen.valor,
        idMoldeDestino: moldesDestino[action.data[0]].idConfiguracionMolde,
        idPlaza: nuevoMovimiento.campos.plaza.valor,
        idInventario: nuevoMovimiento.campos.inventario.valor,
        idMolde : filterMolde[0].idMolde,
        bandera: 0,
      }
      
      const {
        status,
        data = [],
      } = yield call(getInsumos, idMoldes);
      
      const piezas = []
      const accesorios = []

      let filterInsumos = []
      if(action.planta === 0) {
        filterInsumos = data[0].filter(insumo => insumo.Existencia)
      } else {
        filterInsumos = data[0].filter(insumo => insumo.Existencia && insumo.IdPlanta === action.planta)
      }
      
      if (filterInsumos.length === 0) {
        yield put(
          enqueueSnackbar({
            message: 'No existen piezas a transformar de la planta seleccionada',
            options: {
              variant: 'warning',
            },
          })
        );
        return;
      }


      filterInsumos.forEach(insumo => {
        if(insumo.EsPieza) {
          piezas.push(insumo)
        } else {
          accesorios.push(insumo)
        }
      });
      
      if(status === 200){
        yield put(
          Actions.get('SET_INSUMOS').fn(action.data, piezas, accesorios)
        );
      }
    } else {
      yield put(
        Actions.get('SET_INSUMOS').fn([], [], [])
      );
    }
    
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los insumos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* postMovimientoAction() {
  try {
    const nuevoMovimiento = yield select((state) => state.getIn(['transformacion','transformacionTabla', 'nuevaTransformacion']).toJS());
    const global = yield select((state) => state.getIn(['global']).toJS());
    const campos = {...nuevoMovimiento.campos};
    const usuario = {IdUsuario: global.currentUser.UsuarioId, NoEmpleado: global.currentUser.IdEmpleado}
    // eslint-disable-next-line prefer-destructuring
    const piezas = [];
    const accesorios = [];
    const movimiento = [];
    const insumos = [];
    const update = [];
    const insert = [];

    nuevoMovimiento.tablas.piezas.datos.forEach(pieza => {
      pieza.Monto = 1
      piezas.push(pieza)
      insumos.push(pieza)
    });

    nuevoMovimiento.tablas.accesorios.datos.forEach(accesorio => {
      if (accesorio.Existencia > accesorio.Cantidad) {
        accesorio.Monto = accesorio.Cantidad
      } else {
        accesorio.Monto = accesorio.Existencia
      }
      accesorios.push(accesorio)
      insumos.push(accesorio)
    });

    let estatus;
    insumos.forEach(insumo => {

      if(insumo.Cantidad > insumo.Monto){
        estatus = 'REFINC' 
      } else {
        estatus = 'REFCOM' 
      }
      
      update.push(
        {
          IdInsumo : insumo.IdPiezaOrigen,
          IdAlmacen: 1002,
          IdInventario : campos.inventario.valor,
          IdPlaza: campos.plaza.valor,
          EsPieza : insumo.EsPieza,
          Usos: 0,
          Estatus : 'REFINC',
          Cantidad: insumo.Monto,
          IdMolde: insumo.Molde,
        }
      )

      insert.push(
        {
          IdInsumo : insumo.IdPiezaDestino,
          IdAlmacen: 1002,
          IdInventario : campos.inventario.valor,
          IdPlaza: campos.plaza.valor,
          EsPieza : insumo.EsPieza,
          Usos: 0,
          Estatus : estatus,
          Cantidad: insumo.Monto,
        }
      )
    });
    
    movimiento.push(campos);
    movimiento.push(piezas);
    movimiento.push(accesorios);
    movimiento.push(uniqBy(update,  insumo => [insumo.IdInsumo, insumo.EsPieza].join()));
    movimiento.push(uniqBy(insert,  insumo => [insumo.IdInsumo, insumo.EsPieza].join()));
    movimiento.push(usuario);

    const {
      status,
    } = yield call(postMovimiento, movimiento);

    if(status === 200){
      yield put(
        Actions.get('REGRESAR').fn()
      );
      yield put(
        Actions.get('GET_MOVIMIENTOS_TRANSFORMACIONES').fn()
      );
      yield put(
        Actions.get('GET_MOLDES').fn()
      );
      yield put(
        enqueueSnackbar({
          message: 'La transformacion fue realizada correctamente',
          options: {
            variant: 'success',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar la transformación',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* devolverAction() {
  try {

    const nuevaTransformacion = yield select((state) => state.getIn(['transformacion','transformacionTabla', 'nuevaTransformacion']).toJS());

    const {
      status,
    } = yield call(devolverMovimiento, nuevaTransformacion);

    if(status === 200){
      yield put(
        Actions.get('REGRESAR').fn()
      );
      yield put(
        Actions.get('GET_MOVIMIENTOS_TRANSFORMACIONES').fn()
      );
      yield put(
        Actions.get('GET_MOLDES').fn()
      );
      yield put(
        enqueueSnackbar({
          message: 'La devolución fue realizada correctamente',
          options: {
            variant: 'success',
          },
        })
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

// Individual exports for testing
export default function* transformacionSaga() {
  yield[
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosAction
    ),
    takeLatest(
      GET_MOVIMIENTOS_TRANSFORMACIONES,
      getMovimientosTransformacionesAction
    ),
    takeLatest(
      GET_MOVIMIENTO_TRANSFORMACION_DETALLE,
      getMovimientoTransformacionDetalleAction,
    ),
    takeLatest(
      GET_PLAZAS,
      getPlazasAction
    ),
    takeLatest(
      GET_TRANSFORMACIONES,
      getTransformacionesAction
    ),
    takeLatest(
      GET_MOLDES,
      getMoldesAction
    ),
    takeLatest(
      POST_MOVIMIENTO,
      postMovimientoAction
    ),
    takeLatest(
      SET_MOLDE_SELECCIONADO,
      setMoldeSeleccionadoAction
    ),
    takeLatest(
      GET_MOLDES_DESTINO,
      getMoldesDestinoAction
    ),
    takeLatest(
      DEVOLVER,
      devolverAction
    ),
  ]
}