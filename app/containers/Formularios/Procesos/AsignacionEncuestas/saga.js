/* eslint-disable object-shorthand */
import { takeLatest, call, put, select} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import ActionsSpinner from 'components/Spinner/store/actions';

import moment from 'moment';
import Actions from './actions';
import { obtenerPermisos } from '../../../../services/api';


import {
  getAsignaciones,
  getDepartamentos,
  getPuestos,
  getUsuarios,
  getFormularios,
  postAsignacion,
  getAsignacionDetalle,
  updateAsignacion,
  checkUsuario,
} from './api';

export const {
  OBTENER_PERMISOS,
  GET_DATOS_GENERALES,
  GET_ASIGNACION_DETALLE,
  POST_ASIGNACION,
  UPDATE_ASIGNACION,
  CHECK_USER,
} = Actions.getConstants();
// Individual exports for testing

const {
  CHANGE_SPINNER,
} = ActionsSpinner.getConstants();

export function* obtenerPermisosAction(){
  // const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
  const paramsPermisos = {
    idModulo: 2247,
    funcionId: 2499,
    idRolEmpresa: 1250,
  }
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

export function* getDatosGeneralesAction() {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  try {
    const global = yield select((state) => state.getIn(['global']).toJS()); 
    
    const asignaciones = yield call(getAsignaciones, global.currentUser.UsuarioId)
    const departamentos = yield call(getDepartamentos);
    const puestos = yield call(getPuestos);
    const usuarios = yield call(getUsuarios);
    const formularios = yield call(getFormularios, {idUsuario: global.currentUser.UsuarioId});

    departamentos.data.unshift(
      {IdDepartamento: -1, Nombre: 'Todos'}
    )
    puestos.data.unshift(
      { IdPuesto: 0, IdDepartamento: -1, Nombre: 'Todos'}
    )
    const forms = formularios.data.map(el=> ({ value:el.IdFormulario, label:el.Nombre.trim(), referencia: el.Referencia }));
    const departments = departamentos.data.map(el=> ({ value:el.IdDepartamento, label:el.Nombre.trim() }));
    const positions = puestos.data.map(el=> ({ value:el.IdPuesto, label:el.Nombre.trim(), idDepartamento:el.IdDepartamento }));
    
    asignaciones.data.forEach(registro => {
      if(!registro.FechaFinal){
        registro.FechaFinal = 'Indefinida'
      }
    });

    const datosGenerales = {
      formularios: forms.filter(registro => registro.referencia === 'REFENC'),
      asignaciones: asignaciones.data.filter(registro => registro.TipoFormulario === 'REFENC'),
      departamentos: departments,
      puestos: positions,
      usuarios: usuarios.data,
    }

    if(asignaciones.status === 200){
      yield put(
        Actions.get('SET_DATOS_GENERALES').fn(datosGenerales)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los prestamos',
        options: {
          variant: 'error',
        },
      })
    );
  }
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* getFormularioDetalleAction(action){
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  
  const {
    status,
    data,
  } = yield call(getAsignacionDetalle, action.idAsignacion);
  
  const departamentos = yield select((state) => state.getIn(['asignacionEncuestas','asignacionTabla', 'nuevaAsignacion', 'combos', 'departamentos']).toJS());
  const puestos = yield select((state) => state.getIn(['asignacionEncuestas','asignacionTabla', 'nuevaAsignacion', 'combos', 'puestos']).toJS());
  const formularios = yield select((state) => state.getIn(['asignacionEncuestas','asignacionTabla', 'nuevaAsignacion', 'combos', 'formularios']).toJS());
  const usuarios = yield select((state) => state.getIn(['asignacionEncuestas','asignacionTabla', 'nuevaAsignacion', 'combos', 'usuarios']).toJS());

  const asignaciones = []
  const seleccionados = []

  data[1].forEach((registro1, index) => {
    if(registro1.Seleccionado) {
      seleccionados.push(index)
    }
    
    const departamento = departamentos.filter(depto => depto.value === registro1.IdDepartamento)[0]
    const puesto = puestos.filter(psto => psto.value === registro1.IdPuesto)[0]

    const evaluadores = data[2].filter(evaluador => evaluador.IdDetalle === registro1.IdDetalle)
    const asignacionesUsuarios = []
    const seleccionadosU = []
    
    evaluadores.forEach((registro2, idx) => {
      if(registro2.Seleccionado) {
        seleccionadosU.push(idx)
      }

      const departamentoU = departamentos.filter(depto => depto.value === registro2.IdDepartamento)[0]
      const puestoU = puestos.filter(psto => psto.value === registro2.IdPuesto)[0]
      
      const registroU = {
        IdAsignacion : idx + 1,
        IdAsignacionUsuario : registro2.IDAUsuario,
        IdUsuario : registro2.IdUsuario,
        Usuario : registro2.Usuario,
        IdPlaza : registro2.IdPlaza,
        Plaza : registro2.Plaza,
        IdDepartamento : departamentoU.value,
        Departamento : departamentoU.label,
        IdPuesto : puestoU.value,
        Puesto : puestoU.label,
        Seleccionado: 1,
        update: true,
      }

      asignacionesUsuarios.push(registroU)
    });

    const registro = {
      IdAsignacion : index + 1,
      IdAsignacionDetalle : registro1.IdDetalle,
      IdUsuario : registro1.IdUsuario,
      Usuario : registro1.Usuario,
      IdPlaza : registro1.IdPlaza,
      Plaza : registro1.Plaza,
      IdDepartamento : departamento.value,
      Departamento : departamento.label,
      IdPuesto : puesto.value,
      Puesto : puesto.label,
      Seleccionado: 1,
      info: false,
      update: true,
      Campos: {
        departamentosSlc: {
          valor: [],
          campoValido: true,
          disabled: false,
        },
        puestosSlc: {
          valor: [],
          campoValido: true,
          disabled: false,
        },
        usuario: {
          valor: '',
          campoValido: true,
          disabled: false,
        },
      },
      Tablas : {
        asignaciones: {
          seleccionados: seleccionadosU,
          datos: asignacionesUsuarios,
        },
      },
    }
    asignaciones.push(registro)
  });
  const idPuestos =[]
  const idDepartamentos =[]
  asignaciones.forEach(asignacion => {
    idPuestos.push(asignacion.IdPuesto)
    idDepartamentos.push(asignacion.IdDepartamento)
  });
  
  const puestosSlc = puestos.filter(el => idPuestos.some(elem => elem === el.value))
  const departamentosSlc = departamentos.filter(el => idDepartamentos.some(elem => elem === el.value))
  const fechaInicio = moment(data[0][0].FechaInicio).utc();
  const fechaFinal = data[0][0].FechaFin ? moment(data[0][0].FechaFin).utc() : null;
  
  const nuevaAsignacion = {
    tipoFormulario: data[0][0].Referencia,
    stepper: 0,
    campos: {
      descripcion: {
        valor: data[0][0].Descripcion,
        campoValido: true,
        disabled: false,
      },
      formulario: {
        valor: {value: data[0][0].IdFormulario, label: data[0][0].Formulario, referencia: data[0][0].Referencia},
        campoValido: true,
        disabled: false,
      },
      fechaInicio: {
        valor: fechaInicio,
        campoValido: true,
        disabled: false,
      },
      fechaFinal: {
        valor: fechaFinal,
        campoValido: true,
        disabled: false,
      },
      departamentosSlc: {
        valor: departamentosSlc,
        campoValido: true,
        disabled: false,
      },
      puestosSlc: {
        valor: puestosSlc,
        campoValido: true,
        disabled: false,
      },
      usuario: {
        valor: '',
        campoValido: true,
        disabled: false,
      },
    },
    combos: {
      formularios: formularios,
      departamentos: departamentos,
      puestos: puestos,
      usuarios: usuarios,
    },
    tablas: {
      asignaciones: {
        seleccionados: seleccionados,
        datos: asignaciones,
      },
    },
  }

  if(status === 200){

    yield put(
      Actions.get('SET_ASIGNACION_DETALLE').fn(action.idAsignacion,nuevaAsignacion)
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener el detalle',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* postAsignacionAction(){

  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });

  const nuevaAsignacion = yield select((state) => state.getIn(['asignacionEncuestas','asignacionTabla', 'nuevaAsignacion']).toJS());
  const global = yield select((state) => state.getIn(['global']).toJS()); 
  const {
    campos,
    tablas: {
      asignaciones,
    },
  } = nuevaAsignacion;

  const asignacion = {
    campos : campos,
    asignaciones : asignaciones.datos,
    usuario: global.currentUser,
  }

  const {
    status,
  } = yield call(postAsignacion, asignacion);

  if(status === 200){
    yield put(
      Actions.get('REGRESAR').fn(),
    );
    yield put(
      Actions.get('GET_DATOS_GENERALES').fn()
    );
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'La asignación se realizo con exito',
        options: { 
          variant: 'success', 
        }, 
      })
    )
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener las asignaciones',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }

  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* updateAsignacionAction(){
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });

  const nuevaAsignacion = yield select((state) => state.getIn(['asignacionEncuestas','asignacionTabla', 'nuevaAsignacion']).toJS());
  const global = yield select((state) => state.getIn(['global']).toJS());
  const idAsignacion = yield select((state) => state.getIn(['asignacionEncuestas','asignacionTabla', 'idAsignacion']))

  const {
    campos,
    tablas: {
      asignaciones,
    },
  } = nuevaAsignacion;


  const asignacion = {
    idAsignacion: idAsignacion,
    campos : campos,
    asignaciones : asignaciones.datos,
    usuario: global.currentUser,
  }

  const {
    status,
  } = yield call(updateAsignacion, asignacion);

  if(status === 200){
    yield put(
      Actions.get('REGRESAR').fn(),
    );
    yield put(
      Actions.get('GET_DATOS_GENERALES').fn()
    );
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'La asignación se actualizo con exito',
        options: { 
          variant: 'success', 
        }, 
      })
    )
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al actualizar la asignación',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* checkUserAction(action){
  try {
    const {
      IdAsignacion,
      bandera,
    } = action

    const asignaciones = yield select((state) => state.getIn(['asignacionEncuestas','asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos']).toJS());
    const asignacion = asignaciones.filter(registro => IdAsignacion === registro.IdAsignacion)[0]
    const idFormulario = yield select((state) => state.getIn(['asignacionEncuestas','asignacionTabla', 'nuevaAsignacion', 'campos', 'formulario', 'valor']).toJS());
    let idAsignacionDetalle = yield select((state) => state.getIn(['asignacionEncuestas','asignacionTabla', 'idAsignacion']));
    
    if(idAsignacionDetalle === '') {
      idAsignacionDetalle = null;
    }

    const {
      status,
      data,
    } = yield call(checkUsuario, idAsignacionDetalle, idFormulario.value, asignacion.IdUsuario);

    if(status === 200){
      yield put(
        Actions.get('REMOVE_ROW').fn(IdAsignacion, data, bandera),
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al verificar el usuario',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los prestamos',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Individual exports for testing
export default function* asignacionEncuestasSaga() {
  yield[
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosAction
    ),
    takeLatest(
      GET_DATOS_GENERALES,
      getDatosGeneralesAction
    ),
    takeLatest(
      GET_ASIGNACION_DETALLE,
      getFormularioDetalleAction
    ),
    takeLatest(
      POST_ASIGNACION,
      postAsignacionAction
    ),
    takeLatest(
      UPDATE_ASIGNACION,
      updateAsignacionAction
    ),
    takeLatest(
      CHECK_USER,
      checkUserAction
    ),
  ]
}