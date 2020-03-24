import { 
  // take,
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import {
  getCombos,
  getPuestosPorDepartamento,
  getDependenciasPorModulo,
  getDescripcionIndicador,
  postIndicator,
  getPuestoTotalIndicadores,
  getPesoIndicadores,
  getIndicatorsDepartmentPosition,
  postChangeIndicatorStatus,
  getIndicatorDetail,
  getGrupos,
} from './api';
import Actions from './actions';
import { obtenerPermisos } from '../../../services/api';
import { func } from 'prop-types';

const {
  REQUEST_GET_COMBOS,
  SET_COMBOS,
  ON_CHANGE_COMBO,
  REQUEST_POST_INDICATOR,
  REQUEST_INDICATOR_CONFIGURATION,
  REQUEST_INDICATORS_WEIGHT,
  REQUEST_INDICATORS_DEPARTMENT_POSITION,
  HANDLE_CHANGE_TYPE_PROCESS,
  REQUEST_CHANGE_INDICATOR_STATUS,
  REQUEST_EDIT_INDICATOR,
  OBTENER_PERMISOS,
  GET_GRUPOS,
  SET_GRUPOS,
} = Actions.getConstants();

export function* requestGetCombosSaga() {
  const {
    status,
    data,
  } = yield call(getCombos);

  if(status === 200) {
    yield put({
      type: SET_COMBOS,
      data,
    });
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener las plazas',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* requestDependingCombos(action) {

  const selectGrupo = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedGrupo']).toJS().value);
  
  if(action.index === 1){
    const {
      status,
      data,
    } = yield call(getDescripcionIndicador, action.selected.value);
   
    if(status === 200) {
      yield put(
        Actions.get('SET_TEXT_FIELD').fn('indicatorDescription', data.recordset[0].Descripcion)
      );
    } else {
      yield put(
        enqueueSnackbar({ 
          // message: data.message,
          message: 'Error al obtener la descripción del indicador',
          options: { 
            variant: 'error', 
          }, 
        })
      )
    }
  }
  
  if(action.index === 2 && selectGrupo ===2){
    if(action.selected!==null)
    {
      const {
        status,
        data,
      } = yield call(getPuestosPorDepartamento, action.selected.value);

      yield put(
        Actions.get('CLEAN_DEPENDING_COMBOS').fn('selectedPosition')
      );
      
      if(status === 200) {
        if(data.puestos.length > 0){
          yield put(
            Actions.get('SET_DEPENDING_COMBOS').fn('positions', data.puestos)
          );
        } else {
          yield put(
            Actions.get('SET_DEPENDING_COMBOS').fn('positions', [])
          );
        
          yield put(
            enqueueSnackbar({ 
              // message: data.message,
              message: 'El departamento no cuenta con puestos',
              options: { 
                variant: 'warning', 
              }, 
            })
          )
        }
      } else {
        yield put(
          enqueueSnackbar({ 
            // message: data.message,
            message: 'Error al obtener los puestos',
            options: { 
              variant: 'error', 
            }, 
          })
        )
      }
    }
  }

  if(action.index === 8){
    try {
      const {
        status,
        data,
      } = yield call(getDependenciasPorModulo, action.selected.value);

      yield put(
        Actions.get('CLEAN_DEPENDING_COMBOS').fn('selectedStoredProcedure')
      );

      if(status === 200 && data.procedimientos.length > 0) {
        yield put(
          Actions.get('SET_DEPENDING_COMBOS').fn('storedProcedures', data.procedimientos)
        );
        yield put(
          Actions.get('CLEAN_DEPENDING_COMBOS').fn('selectedStoredProcedure')
        );
      } else {
        yield put(
          Actions.get('SET_DEPENDING_COMBOS').fn('storedProcedures', [])
        );
        yield put(
          Actions.get('CLEAN_DEPENDING_COMBOS').fn('selectedStoredProcedure')
        );
        yield put(
          enqueueSnackbar({ 
            // message: data.message,
            message: 'El módulo no cuenta con procedimientos almacenados',
            options: { 
              variant: 'warning', 
            }, 
          })
        )
      }
      
      if(status === 200 && data.opciones.length > 0) {
        yield put(
          Actions.get('SET_DEPENDING_COMBOS').fn('moduleOptions', data.opciones)
        );
      } else {
        yield put(
          Actions.get('SET_DEPENDING_COMBOS').fn('moduleOptions', [])
        );
        yield put(
          Actions.get('CLEAN_DEPENDING_COMBOS').fn('selectedModuleOption')
        );
      }
  
    } catch(e){
      yield put(
        enqueueSnackbar({ 
          // message: data.message,
          message: 'Error al obtener los registros',
          options: { 
            variant: 'error', 
          }, 
        })
      )
    }
  }
}

export function* requestPostIndicatorSaga() {
  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  const idIndicador = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedIndicator']).toJS().value);
  const idIndicadorDetalle = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedIndicatorDetail']));
  let idDepartamento = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedDepartment']));
  let nombreDepartamento = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedDepartment']));
  let idPuesto = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedPosition']));
  let nombrePuesto = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedPosition']));
  const idTipoIndicador = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedIndicatorType']).toJS().value);
  const idMedida = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedIndicatorMeasurement']).toJS().value);
  const idPeso = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'indicatorWeight']));
  const objetivoMin = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'indicatorMinimum']));
  const objetivoMax = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'indicatorMaximum']));
  const objetivo = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'indicatorObjective']));
  const detonaBono = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'bonus']));
  const idReglaCondicion = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedIndicatorDataType']).toJS().value);
  const valor = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'comparisonValue']));
  const maximizar = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedOptimization']).toJS().value);
  const idModulo = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedModule']).toJS().value);
  const idProcedimiento = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedStoredProcedure']).toJS().value);
  const selectGrupo = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedGrupo']).toJS().value);
  
  let masDeUnDepartamento = false;
  if(idDepartamento !== null)
  {
    if(idDepartamento.size>2)
    {
      idDepartamento = idDepartamento.toJS().map(departamento => departamento.value).join();
      masDeUnDepartamento = true;
    } else {
      if(selectGrupo===2)
      {
        const nombredep= idDepartamento;
        idDepartamento=idDepartamento.toJS().value;
        nombreDepartamento=nombredep.toJS().label;
      } else if (selectGrupo===3){
        idDepartamento=idDepartamento.toJS()[0].value;
      }
    }
  } else {
    idDepartamento = [];
    nombrePuesto = ' '
  }

  let masDeUnPuesto = false;
  
  if(idPuesto !== null)
  {
    idPuesto=idPuesto.toJS()
    if(idPuesto.length>=1)//COMPARO CON A TOJS
    {
      idPuesto = idPuesto.map(puesto => puesto.value).join();
      masDeUnPuesto = true;
    } else{
      const nombrePue= idPuesto;
      idPuesto=idPuesto.value;
      nombrePuesto = nombrePue.label;
    }   
  } else {
    idPuesto = [];
    nombrePuesto =' ';
  }

  let idModuloOpcion = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedModuleOption']));

  if(idModuloOpcion){
    idModuloOpcion = idModuloOpcion.toJS().value;
  }
  
  

  const idGrupo = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedGrupo']).toJS().value);
 
  const idCorteIndicador = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedIndicatorCut']).toJS().value);
  const idCortePeriodo = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedIndicatorCutPeriod']).toJS().value);
  const maloMin = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'maloMin']));
  const maloMax = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'maloMax']));
  const regularMin = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'regularMin']));
  const regularMax = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'regularMax']));
  const buenoMin = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'buenoMin']));
  const buenoMax = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'buenoMax'])); 
  
  const IndicadorDetalle = {
    idUsuario,
    idIndicador,
    idDepartamento,
    idPuesto,
    idTipoIndicador,
    idMedida,
    idPeso,
    objetivoMin,
    objetivoMax,
    objetivo,
    detonaBono,
    idReglaCondicion,
    valor,
    maximizar,
    idModulo,
    idProcedimiento,
    idModuloOpcion,
    idCorteIndicador,
    idCortePeriodo,
    maloMin,
    maloMax,
    regularMin,
    regularMax,
    buenoMin,
    buenoMax,
    idIndicadorDetalle,
  }

  const {
    status,
    data,
  } = yield call(postIndicator, {IndicadorDetalle});
  
  if(status === 200) {

    // if(Object.prototype.hasOwnProperty.call(data, 'recordset')){
    //   if(data.recordset.length > 0){
    //     if( Object.prototype.hasOwnProperty.call(data.recordset[0], 'existe')  ){
    //       if(data.recordset[0].existe === 1) {
    //         yield put(
    //           enqueueSnackbar({ 
    //             message: 'El indicador ya se encuentra configurado a ese departamento - puesto',
    //             options: { 
    //               variant: 'warning', 
    //             }, 
    //           })
    //         )
    //         return;
    //       }
    //     }
    //   }
    // }

    const rowSelected = {
      id: idPuesto,
      IdDepartamento: idDepartamento,
      NombreDepartamento: nombreDepartamento,
      NombrePuesto: nombrePuesto,
    }

    yield put(
      Actions.get('RESET_INDICATOR_DATA').fn()
    );
  
    yield put(
      Actions.get('REQUEST_INDICATORS_DEPARTMENT_POSITION').fn(rowSelected)
    );

    yield put(
      Actions.get('REQUEST_INDICATOR_CONFIGURATION').fn()
    );
    
    yield put(
      Actions.get('SET_EDIT').fn(false)
    );
    
    if(idGrupo === 2 && masDeUnPuesto===false)
    {
      yield put(
        Actions.get('SET_STEPPER').fn(1)
      );
    } else {
      yield put(
        Actions.get('SET_STEPPER').fn(0)
      );
    }
  
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Los datos fueron guardados con éxito',
        options: { 
          variant: 'success', 
        }, 
      })
    )
    
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener las registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* requestIndicatorConfigurationSaga() {
  const {
    status,
    data,
  } = yield call(getPuestoTotalIndicadores);
  
  if(status === 200) {
    yield put(
      Actions.get('SET_INDICATOR_CONFIGURATION').fn(data.data)
    );
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* requestIndicatorsWeightSaga() {
  let idDepartamento = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedDepartment']));
  let idPuesto = yield select((state) => state.getIn(['configuracionIndicadores' ,'registrarIndicador', 'frontend', 'ui', 'selectedPosition'])) ;
  const indicatorWeight = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'indicatorWeight'])) ;
  const idIndicadorDetalle = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedIndicatorDetail']));
  const selectGrupo = yield select((state) => state.getIn(['configuracionIndicadores', 'registrarIndicador', 'frontend', 'ui', 'selectedGrupo']).toJS().value);
  
  if(selectGrupo ===2){
    if(idDepartamento !== null)
    {
      idDepartamento = idDepartamento.toJS().value;
    } else {
      idDepartamento = 0;
    }
    
    if(idPuesto !== null){
      idPuesto=idPuesto.toJS()
      if(idPuesto.length>=1)
      {
        idPuesto = idPuesto.map(puesto => puesto.value);
      } else{
        idPuesto=idPuesto.value;
      }
    } else {
      idPuesto = [];
    }
    
    let dato;
    if(idPuesto.length>=1)
    {
      dato = yield all(idPuesto.map(idPuestos => call(getPesoIndicadores,idDepartamento,idPuestos,idIndicadorDetalle)));
      let messages=' ';
      let sobrePasaPeso = false;
      
      
      dato.forEach(datos => {
        if((parseInt(indicatorWeight, 0) > datos.data.recordset[0].pesorestante)){
          messages+=`La suma del peso del puesto ${datos.data.recordset[0].nombre}: sobrepasa 100, el peso sugerido es ${datos.data.recordset[0].pesorestante} `
          sobrePasaPeso=true;
        }  
      });
      
      if(sobrePasaPeso){
        yield put(
          enqueueSnackbar({ 
            message: messages,
            options: { 
              variant: 'warning', 
            }, 
          })
        )
        yield put(
          Actions.get('SET_TEXT_FIELD').fn('indicatorWeight', '')
        );
      }
    } else{
      const {
        status,
        data,
      } = yield call(getPesoIndicadores,idDepartamento,idPuesto,idIndicadorDetalle);
      if((parseInt(indicatorWeight, 0) > data.recordset[0].pesorestante)){
        yield put(
          enqueueSnackbar({ 
            message: `La suma del peso sobrepasa 100, el peso sugerido es ${data.recordset[0].pesorestante} `,
            options: { 
              variant: 'warning', 
            }, 
          })
        )
        yield put(
          Actions.get('SET_TEXT_FIELD').fn('indicatorWeight', data.recordset[0].pesorestante)
        );
      }
    }
    
    

    
    // if(status === 200) {
    //   if((parseInt(indicatorWeight, 0) > data.recordset[0].pesorestante)){
    //     yield put(
    //       enqueueSnackbar({ 
    //         message: `La suma del peso sobrepasa 100, el peso sugerido es ${data.recordset[0].pesorestante} `,
    //         options: { 
    //           variant: 'warning', 
    //         }, 
    //       })
    //     )
    //     yield put(
    //       Actions.get('SET_TEXT_FIELD').fn('indicatorWeight', data.recordset[0].pesorestante)
    //     );
    //   }
    
    // } else {
    //   yield put(
    //     enqueueSnackbar({ 
    //       // message: data.message,
    //       message: 'Error al obtener los registros',
    //       options: { 
    //         variant: 'error', 
    //       }, 
    //     })
    //   )
    // }
  } else if(indicatorWeight > 100){
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'El peso no debe ser mayor de 100',
        options: { 
          variant: 'error', 
        }, 
      })
    )
    yield put(
      Actions.get('SET_TEXT_FIELD').fn('indicatorWeight', '')
    );
  }
}

export function* requestIndicatorsDepartmentPositionSaga(action) {
  const {
    rowSelected: {
      id,
      IdDepartamento,
      NombreDepartamento,
      NombrePuesto,
    },
  } = action;

  yield put(
    Actions.get('SET_STEPPER').fn(1)
  );

  yield put(
    Actions.get('HANDLE_CLOSE_DIALOG').fn('showDialogDelete')
  );

  yield put(
    Actions.get('SET_DEPARTMENT_POSITION').fn(NombreDepartamento, NombrePuesto)
  );

  yield put(
    Actions.get('SET_DEPARTMENT_POSITION_ID').fn(IdDepartamento, id)
  );
    
  const {
    status,
    data,
  } = yield call(getIndicatorsDepartmentPosition, IdDepartamento, id);

  if(status === 200) {
    yield put(
      Actions.get('SET_INDICATORS').fn(data.data)
    );

    yield put(
      Actions.get('RESET_ROWS').fn()
    );
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* requestIndicatorsStatusSaga(action) {
  let estatus = null;
  const idDepartamento = yield select((state) => state.getIn(['configuracionIndicadores', 'detalleIndicador', 'frontend', 'ui', 'idDepartamento']));
  const idPuesto = yield select((state) => state.getIn(['configuracionIndicadores' ,'detalleIndicador', 'frontend', 'ui', 'idPuesto']));

  if(action.value.state === 'Inactivo'){
    estatus = 0;
  } else {
    estatus = 1;
  }
  
  const {
    status,
    data,
  } = yield call(getIndicatorsDepartmentPosition, idDepartamento, idPuesto, estatus);
  
  if(status === 200) {
    yield put(
      Actions.get('SET_INDICATORS').fn(data.data)
    );

    yield put(
      Actions.get('RESET_ROWS').fn()
    );
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* requestChangeConfigurationStatusSaga(action) {

  const {
    status,
  } = yield call(postChangeIndicatorStatus, action.rowSelected);

  if(status === 200) {
    yield put(
      Actions.get('REQUEST_INDICATOR_CONFIGURATION').fn()
    );
    
    yield put(
      Actions.get('SET_STEPPER').fn(0)
    );
    
    yield put(
      Actions.get('HANDLE_OPEN_DIALOG').fn('showDialogDelete')
    );

    yield put(
      Actions.get('RESET_ROWS').fn()
    );
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* requestEditIndicatorSaga(action) {
  const {
    selectedIndicator, 
    selectedDepartment, 
    selectedPosition,
  } = action;

  const {
    status,
    data,
  } = yield call(getIndicatorDetail, selectedIndicator, selectedDepartment, selectedPosition);

  if(status === 200) {
    const indicador = data.data[0];
    const indicadorSeleccionado = yield select((state) =>
      state.getIn([
        'configuracionIndicadores', 
        'registrarIndicador', 
        'backend', 
        'datasources', 
        'indicators',
      ]).toJS()
        .find(el => el.value === indicador.IdIndicador)
    );
    
    let departamentoSeleccionado;

    if(indicador.IdDepartamento !== null)
    {
      departamentoSeleccionado = yield select((state) =>
        state.getIn([
          'configuracionIndicadores', 
          'registrarIndicador', 
          'backend', 
          'datasources', 
          'departments',
        ]).toJS()
          .find(el => el.value === indicador.IdDepartamento)
      );
    } else {
      departamentoSeleccionado = null;
    }
    
    const tipoIndicadorSeleccionado = yield select((state) =>
      state.getIn([
        'configuracionIndicadores', 
        'registrarIndicador', 
        'backend', 
        'datasources', 
        'indicatorType',
      ]).toJS()
        .find(el => el.value === indicador.IdTipoIndicador)
    );

    const medidaIndicadorSeleccionado = yield select((state) =>
      state.getIn([
        'configuracionIndicadores', 
        'registrarIndicador', 
        'backend', 
        'datasources', 
        'indicatorMeasurement',
      ]).toJS()
        .find(el => el.value === indicador.IdMedida)
    );

    const tipoDeDatoSeleccionado = yield select((state) =>
      state.getIn([
        'configuracionIndicadores', 
        'registrarIndicador', 
        'backend', 
        'datasources', 
        'indicatorDataTypes',
      ]).toJS()
        .find(el => el.value === indicador.IdReglaCondicion)
    );

    const optimizacionSeleccionado = yield select((state) =>
      state.getIn([
        'configuracionIndicadores', 
        'registrarIndicador', 
        'backend', 
        'datasources', 
        'indicatorOptimization',
      ]).toJS()
        .find(el => el.value === (indicador.Maximizar ? 1 : 0))
    );

    const moduloSeleccionado = yield select((state) =>
      state.getIn([
        'configuracionIndicadores', 
        'registrarIndicador', 
        'backend', 
        'datasources', 
        'modules',
      ]).toJS()
        .find(el => el.value === indicador.IdModulo)
    );

    const corteSeleccionado = yield select((state) =>
      state.getIn([
        'configuracionIndicadores', 
        'registrarIndicador', 
        'backend', 
        'datasources', 
        'indicatorCuts',
      ]).toJS()
        .find(el => el.value === indicador.IdCorteIndicador)
    );

    const periodoSeleccionado = yield select((state) =>
      state.getIn([
        'configuracionIndicadores', 
        'registrarIndicador', 
        'backend', 
        'datasources', 
        'indicatorCutsPeriod',
      ]).toJS()
        .find(el => el.value === indicador.IdCortePeriodo)
    );

    yield put(
      Actions.get('SET_ID_INDICATOR_DETAIL').fn(indicador.IdIndicadorDetalle)
    );

    yield put(
      Actions.get('ON_CHANGE_COMBO').fn(1, indicadorSeleccionado)
    );

    if(indicador.IdPuesto === null && departamentoSeleccionado === null){
      yield put(
        Actions.get('ON_CHANGE_COMBO').fn(13, {value: 1, label: 'Todos'})
      );
    } else if (departamentoSeleccionado !== null && indicador.IdPuesto === null){
      yield put(
        Actions.get('ON_CHANGE_COMBO').fn(13, {value: 3, label: 'Departamento'})
      );
    } else if (departamentoSeleccionado !== null && indicador.IdPuesto !== null){
      yield put(
        Actions.get('ON_CHANGE_COMBO').fn(13, {value: 2, label: 'Puesto'})
      );
    }

    yield put(
      Actions.get('ON_CHANGE_COMBO').fn(2, departamentoSeleccionado)
    );

    yield put(
      Actions.get('ON_CHANGE_COMBO').fn(4, tipoIndicadorSeleccionado)
    );

    yield put(
      Actions.get('ON_CHANGE_COMBO').fn(5, medidaIndicadorSeleccionado)
    );

    yield put(
      Actions.get('ON_CHANGE_COMBO').fn(6, tipoDeDatoSeleccionado)
    );

    yield put(
      Actions.get('ON_CHANGE_COMBO').fn(7, optimizacionSeleccionado)
    );

    yield put(
      Actions.get('ON_CHANGE_COMBO').fn(8, moduloSeleccionado)
    );

    yield put(
      Actions.get('ON_CHANGE_COMBO').fn(10, corteSeleccionado)
    );

    yield put(
      Actions.get('ON_CHANGE_COMBO').fn(11, periodoSeleccionado)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('maloMin', indicador.MaloMin)
    );
    
    yield put(
      Actions.get('SET_TEXT_FIELD').fn('maloMax', indicador.MaloMax)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('regularMin', indicador.RegularMin)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('regularMax', indicador.RegularMax)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('buenoMin', indicador.BuenoMin)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('buenoMax', indicador.BuenoMax)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('indicatorWeight', indicador.Peso)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('indicatorMinimum', indicador.ObjetivoMin)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('indicatorObjective', indicador.Objetivo)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('indicatorMaximum', indicador.ObjetivoMax)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('indicatorDescription', indicador.Descripcion)
    );

    yield put(
      Actions.get('SET_BONUS_EDITAR').fn(indicador.DetonaBono)
    );

    yield put(
      Actions.get('SET_TEXT_FIELD').fn('comparisonValue', indicador.Valor)
    );

    // Setear combos dependientes
    let puestoSeleccionado
    if(indicador.IdPuesto !== null)
    {
      
      const {
        status: statusPuestos,
        data: dataPuestos,
      } = yield call(getPuestosPorDepartamento, indicador.IdDepartamento);

      if(statusPuestos === 200){
        if(dataPuestos.puestos.length > 0){
          yield put(
            Actions.get('SET_DEPENDING_COMBOS').fn('positions', dataPuestos.puestos)
          );
          
          puestoSeleccionado = yield select((state) =>
            state.getIn([
              'configuracionIndicadores', 
              'registrarIndicador', 
              'backend', 
              'datasources', 
              'positions',
            ]).toJS()
              .find(el => el.value === indicador.IdPuesto)
          );
          
          yield put(
            Actions.get('ON_CHANGE_COMBO').fn(3, puestoSeleccionado)
          );
        } 
      }
    }  else {
      puestoSeleccionado = null;
    }
    
    const {
      status: statusDependencia,
      data: dataDependencia,
    } = yield call(getDependenciasPorModulo, indicador.IdModulo);
    
    if(statusDependencia === 200 && dataDependencia.procedimientos.length > 0) {
      yield put(
        Actions.get('SET_DEPENDING_COMBOS').fn('storedProcedures', dataDependencia.procedimientos)
      );

      const procedimientoSeleccionado = yield select((state) =>
        state.getIn([
          'configuracionIndicadores', 
          'registrarIndicador', 
          'backend', 
          'datasources', 
          'storedProcedures',
        ]).toJS()
          .find(el => el.value === indicador.IdProcedimiento)
      );
      
      yield put(
        Actions.get('ON_CHANGE_COMBO').fn(9, procedimientoSeleccionado)
      );
    } 
    
    if(statusDependencia === 200 && dataDependencia.opciones.length > 0) {
      yield put(
        Actions.get('SET_DEPENDING_COMBOS').fn('moduleOptions', dataDependencia.opciones)
      );

      if(indicador.IdModuloOpcion){
        const opcionesSeleccionado = yield select((state) =>
          state.getIn([
            'configuracionIndicadores', 
            'registrarIndicador', 
            'backend', 
            'datasources', 
            'moduleOptions',
          ]).toJS()
            .find(el => el.value === indicador.IdModuloOpcion)
        );
        
        yield put(
          Actions.get('ON_CHANGE_COMBO').fn(12, opcionesSeleccionado)
        );
      }
    } 

    yield put(
      Actions.get('SET_EDIT').fn(true)
    );
    
    yield put(
      Actions.get('SET_STEPPER').fn(2)
    );
   
  } else {
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los registros',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* obtenerPermisosSaga(){
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

export function* obtenerGrupos(){

  const {
    status,
    data,
  } = yield call(getGrupos);

  if(status === 200){
    yield put(
      Actions.get('SET_GRUPOS').fn(data),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        message: 'Error al obtener los permisos',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

// Individual exports for testing
export default function* configuracionPeriodosSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(REQUEST_GET_COMBOS, requestGetCombosSaga),
    takeLatest(ON_CHANGE_COMBO, requestDependingCombos),
    takeLatest(REQUEST_POST_INDICATOR, requestPostIndicatorSaga),
    takeLatest(REQUEST_INDICATOR_CONFIGURATION, requestIndicatorConfigurationSaga),
    takeLatest(REQUEST_INDICATORS_WEIGHT, requestIndicatorsWeightSaga),
    takeLatest(REQUEST_INDICATORS_DEPARTMENT_POSITION, requestIndicatorsDepartmentPositionSaga),
    takeLatest(HANDLE_CHANGE_TYPE_PROCESS, requestIndicatorsStatusSaga),
    takeLatest(REQUEST_CHANGE_INDICATOR_STATUS, requestChangeConfigurationStatusSaga),
    takeLatest(REQUEST_EDIT_INDICATOR, requestEditIndicatorSaga),
    takeLatest(OBTENER_PERMISOS, obtenerPermisosSaga),
    takeLatest(GET_GRUPOS, obtenerGrupos),
  ];
}
