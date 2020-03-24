/*
 *
 * ConfiguracionIndicadores reducer
 *
 */

import { fromJS, List } from 'immutable';
import STATE from './state';
import Actions from './actions';

export const initialState = fromJS(STATE);

export const {
  DEFAULT_ACTION,
  SET_STEPPER,
  HANDLE_CLICK_BUTTON_SEARCH,
  HANDLE_CHANGE_TEXT_SEARCH,
  HANDLE_CHANGE_TYPE_PROCESS,
  HANDLE_CLICK_CHECK_TABLE,
  HANDLE_OPEN_DIALOG,
  HANDLE_CLICK_DELETE_ROW,
  HANDLE_CLICK_LEAVE_DIALOG,
  SET_TEXT_FIELD,
  ON_CHANGE_COMBO,
  SET_BONUS,
  SET_COMBOS,
  SET_DEPENDING_COMBOS,
  CLEAN_DEPENDING_COMBOS,
  VALIDATE_INPUT_MINIMUM_LENGTH,
  VALIDATE_SEMAPHORE,
  SET_INDICATOR_CONFIGURATION,
  SET_DEPARTMENT_POSITION,
  SET_INDICATORS,
  SET_DEPARTMENT_POSITION_ID,
  HANDLE_CLOSE_DIALOG,
  RESET_ROWS,
  SET_BONUS_EDITAR,
  SET_EDIT,
  SET_ID_INDICATOR_DETAIL,
  RESET_INDICATOR_DATA,
  SET_PERMISOS,
  SET_INDICATORS_COMBO,
  SET_MENU_FILTER_INDEX,
  SET_DIALOG_BACK,
  SET_GRUPOS,
  SET_ID_GRUPO,
} = Actions.getConstants();

function configuracionIndicadoresReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_STEPPER: {
      return state.setIn([
        'configuracionIndicadores',
        'frontend',
        'stepper',
      ], action.stepper)
    }
    case HANDLE_CLICK_BUTTON_SEARCH: {
      return state.setIn([
        'detalleIndicador',
        'frontend',
        'ui',
        'activeSearch',
      ], !state.getIn([
        'detalleIndicador',
        'frontend',
        'ui',
        'activeSearch',
      ]))
    }
    case HANDLE_CHANGE_TEXT_SEARCH: {
      return state.setIn([
        'detalleIndicador',
        'frontend',
        'ui',
        'searchText',
      ], action.text)
    }
    case HANDLE_CHANGE_TYPE_PROCESS: {
      return state.setIn([
        'detalleIndicador',
        'frontend',
        'ui',
        'menuFilterIndex',
      ], action.value.newIndex);
    }
    case HANDLE_CLICK_CHECK_TABLE: {
      return state.setIn([
        'detalleIndicador',
        'frontend',
        'ui',
        'rowSelected',
      ], action.rowSelected)
        .setIn([
          'detalleIndicador',
          'frontend',
          'ui',
          'changeWithButton',
        ], false);
    }
    case HANDLE_OPEN_DIALOG: {
      return state.setIn([
        'detalleIndicador',
        'frontend',
        'ui',
        action.dialog,
      ], !state.getIn([
        'detalleIndicador',
        'frontend',
        'ui',
        action.dialog,
      ]))  
    }

    case HANDLE_CLOSE_DIALOG: {
      return state.setIn([
        'detalleIndicador',
        'frontend',
        'ui',
        action.dialog,
      ], false)  
    }
    case HANDLE_CLICK_LEAVE_DIALOG: {
      return state.setIn([
        'detalleIndicador',
        'frontend',
        'ui',
        action.dialog,
      ], false)
        .setIn([
          'detalleIndicador',
          'frontend',
          'ui',
          'changeWithButton',
        ], false);
    }
    case HANDLE_CLICK_DELETE_ROW: {
      return state
        .setIn([
          'detalleIndicador',
          'frontend',
          'ui',
          'rowSelectedButton',
        ], action.rowSelected)
        .setIn([
          'detalleIndicador',
          'frontend',
          'ui',
          'changeWithButton',
        ], true)
    }
    case SET_TEXT_FIELD:
      return state.setIn([
        'registrarIndicador',
        'frontend',
        'ui',
        action.textfield,
      ], action.value);
    case ON_CHANGE_COMBO: {
   
      if(action.index === 1){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedIndicator',
        ], fromJS(action.selected))
      }

      if(action.index === 2){
         
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedDepartment',
        ], fromJS(action.selected))
      }

      if(action.index === 3){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedPosition',
        ], fromJS(action.selected))
      }
      /*
      if(action.index === 3){
        const arreglo = action.selected || [];
      
        const lista = [];
        for (let i = 0; i < arreglo.length; i+=1) {
          lista.push(
            {
              seleccionado: false,
              ...action.selected[i],
            }
          )
        }
        
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedPosition',
        ], List(lista));
      } */

      if(action.index === 4){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedIndicatorType',
        ], fromJS(action.selected))
      }

      if(action.index === 5){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedIndicatorMeasurement',
        ], fromJS(action.selected))
      }

      if(action.index === 6){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedIndicatorDataType',
        ], fromJS(action.selected))
      }

      if(action.index === 7){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedOptimization',
        ], fromJS(action.selected))
      }

      if(action.index === 8){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedModule',
        ], fromJS(action.selected))
          .setIn([
            'registrarIndicador',
            'frontend',
            'ui',
            'selectedModuleOption',
          ], null)
      }

      if(action.index === 9){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedStoredProcedure',
        ], fromJS(action.selected))
      }
      
      if(action.index === 10){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedIndicatorCut',
        ], fromJS(action.selected))
      }

      if(action.index === 11){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedIndicatorCutPeriod',
        ], fromJS(action.selected))
      }

      if(action.index === 12){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedModuleOption',
        ], fromJS(action.selected))
      }

      if(action.index === 13){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'selectedGrupo',
        ], fromJS(action.selected))
          .setIn([
            'registrarIndicador',
            'frontend',
            'ui',
            'selectedDepartment',
          ], fromJS(action.selected.label==='Todos' || action.selected.label==='Puesto' || action.selected.label==='Departamento' ? null : action.selected))
          .setIn([
            'registrarIndicador',
            'frontend',
            'ui',
            'selectedPosition',
          ], fromJS(action.selected.label==='Todos' || action.selected.label==='Puesto' || action.selected.label==='Departamento' ? null : action.selected))
      } 

      return state;
    }
    case SET_BONUS: {
      return state.setIn([
        'registrarIndicador',
        'frontend',
        'ui',
        'bonus',
      ], !state.getIn([
        'registrarIndicador',
        'frontend',
        'ui',
        'bonus',
      ]))
    }
    case SET_COMBOS: {
      return state.setIn([
        'registrarIndicador',
        'backend',
        'datasources',
        'indicators',
      ], List(action.data.indicadores))
        .setIn([
          'registrarIndicador',
          'backend',
          'datasources',
          'departments',
        ], List(action.data.departamentos))
        .setIn([
          'registrarIndicador',
          'backend',
          'datasources',
          'indicatorType',
        ], List(action.data.tipoIndicador))
        .setIn([
          'registrarIndicador',
          'backend',
          'datasources',
          'indicatorMeasurement',
        ], List(action.data.unidadMedida))
        .setIn([
          'registrarIndicador',
          'backend',
          'datasources',
          'indicatorDataTypes',
        ], List(action.data.reglaCondicion))
        .setIn([
          'registrarIndicador',
          'backend',
          'datasources',
          'modules',
        ], List(action.data.modulos))
        .setIn([
          'registrarIndicador',
          'backend',
          'datasources',
          'indicatorCuts',
        ], List(action.data.corteIndicador))
        .setIn([
          'registrarIndicador',
          'backend',
          'datasources',
          'indicatorCutsPeriod',
        ], List(action.data.cortePeriodo))
    }
    case SET_DEPENDING_COMBOS: {
      return state.setIn([
        'registrarIndicador',
        'backend',
        'datasources',
        action.combo,
      ], List(action.data))
    }
    case CLEAN_DEPENDING_COMBOS: {
      return state.setIn([
        'registrarIndicador',
        'frontend',
        'ui',
        action.combo,
      ], null)
    }
    case VALIDATE_INPUT_MINIMUM_LENGTH: {
      const value = state.getIn([
        'registrarIndicador',
        'frontend',
        'ui',
        action.input,
      ])

      if(value.length < action.length){
        return state.setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'errors',
          action.input,
          'error',
        ], true)
          .setIn([
            'registrarIndicador',
            'frontend',
            'ui',
            'errors',
            action.input,
            'message',
          ], action.message)
      }

      return state.setIn([
        'registrarIndicador',
        'frontend',
        'ui',
        'errors',
        action.input,
        'error',
      ], false)
        .setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'errors',
          action.input,
          'message',
        ], '*Requerido')
    }
    case VALIDATE_SEMAPHORE: {
      const value = state.getIn([
        'registrarIndicador',
        'frontend',
        'ui',
        action.input,
      ]);

      const valueLessThan = state.getIn([
        'registrarIndicador',
        'frontend',
        'ui',
        action.lessThan,
      ]);

      const valueGreaterThan = state.getIn([
        'registrarIndicador',
        'frontend',
        'ui',
        action.greaterThan,
      ]);

      if(action.lessThan !== '' && valueLessThan !== '' && value !== ''){
        if(Number(value) <= Number(valueLessThan)){
          return state.setIn([
            'registrarIndicador',
            'frontend',
            'ui',
            'errors',
            action.input,
            'error',
          ], true)
            .setIn([
              'registrarIndicador',
              'frontend',
              'ui',
              'errors',
              action.input,
              'message',
            ], 'El valor no puede ser menor o igual que el campo anterior')
        } 
      }

      if(action.greaterThan !== '' && valueGreaterThan !== '' && value !== ''){
        if(Number(value) >= Number(valueGreaterThan)){
          return state.setIn([
            'registrarIndicador',
            'frontend',
            'ui',
            'errors',
            action.input,
            'error',
          ], true)
            .setIn([
              'registrarIndicador',
              'frontend',
              'ui',
              'errors',
              action.input,
              'message',
            ], 'El valor no puede ser mayor o igual que el campo siguiente')
        } 
      }

      return state.setIn([
        'registrarIndicador',
        'frontend',
        'ui',
        'errors',
        action.input,
        'error',
      ], false)
        .setIn([
          'registrarIndicador',
          'frontend',
          'ui',
          'errors',
          action.input,
          'message',
        ], '')
    }
    case SET_INDICATOR_CONFIGURATION: {
      return state.setIn([
        'configuracionIndicadores',
        'backend',
        'datasources',
        'data',
      ], List(action.data))
        .setIn([
          'detalleIndicador',
          'frontend',
          'ui',
          'changeWithButton',
        ], false)
    }
    case SET_DEPARTMENT_POSITION: {
      
      return state
        .setIn([
          'configuracionIndicadores',
          'frontend',
          'stepper',
        ], 1)
        .updateIn(
          ['detalleIndicador',
            'frontend',
            'ui',
          ],
          stt => stt.merge({
            nombreDepartamento: action.selectedDepartment,
            nombrePuesto: action.selectedPosition,
          })
        )
    }
    case SET_INDICATORS: {
      return state.setIn([
        'detalleIndicador',
        'backend',
        'datasources',
        'dataIndicators',
      ], List(action.data));
    }
    case SET_DEPARTMENT_POSITION_ID: {
      return state.updateIn(
        ['detalleIndicador',
          'frontend',
          'ui',
        ],
        stt => stt.merge({
          idDepartamento: action.selectedDepartment,
          idPuesto: action.selectedPosition,
        })
      )
    }
    case RESET_ROWS: {
      return state.updateIn(
        ['detalleIndicador',
          'frontend',
          'ui',
        ],
        stt => stt.merge({
          rowSelected: [],
          rowSelectedButton: [],
          changeWithButton: false,
        })
      )
    }
    case SET_BONUS_EDITAR: {
      return state.setIn([
        'detalleIndicador',
        'frontend',
        'ui',
        'bonus',
      ], action.bonus)
    }
    case SET_EDIT: {
      return state.setIn([
        'detalleIndicador',
        'frontend',
        'ui',
        'edit',
      ], action.edit)
    }
    case SET_ID_INDICATOR_DETAIL: {
      return state.setIn([
        'registrarIndicador',
        'frontend',
        'ui',
        'selectedIndicatorDetail',
      ], action.selectedIndicatorDetail)
    }
    case RESET_INDICATOR_DATA: {
      return state.updateIn(
        ['registrarIndicador',
          'frontend',
          'ui',
        ],
        stt => stt.merge({
          indicatorDescription: '',
          selectedIndicator: null,
          selectedIndicatorDetail: 0,
          selectedDepartment: null,
          selectedPosition: null,
          selectedIndicatorType: null,
          selectedIndicatorMeasurement: null,
          indicatorWeight: '',
          indicatorMinimum: '',
          indicatorMaximum: '',
          indicatorObjective: '',
          bonus: false,
          selectedIndicatorDataType: null,
          comparisonValue: '',
          selectedOptimization: null,
          selectedModule: null,
          selectedStoredProcedure: null,
          selectedIndicatorCut: null,
          selectedIndicatorCutPeriod: null,
          selectedModuleOption: null,
          maloMin: '',
          maloMax: '',
          regularMin: '',
          regularMax: '',
          buenoMin: '',
          buenoMax: '',
          selectedGrupo: {value:null},
        })
      )
    }
    case SET_PERMISOS: {
      return state.setIn([
        'configuracionIndicadores',
        'permisos',
      ], fromJS(action.payload));
    }
    case SET_INDICATORS_COMBO: {
      return state.setIn([
        'registrarIndicador',
        'backend',
        'datasources',
        'indicators',
      ], List(action.data))
    }
    case SET_MENU_FILTER_INDEX: {
      return state.setIn([
        'detalleIndicador',
        'frontend',
        'ui',
        'menuFilterIndex',
      ], action.menuFilterIndex)
    }
    case SET_DIALOG_BACK: {

      const showDialogBack = state.getIn([
        'registrarIndicador',
        'frontend',
        'ui',
        'showDialogBack',
      ]);

      return state.setIn([
        'registrarIndicador',
        'frontend',
        'ui',
        'showDialogBack',
      ], !showDialogBack)
    }

    case SET_GRUPOS :{
      return state.setIn([
        'registrarIndicador',
        'backend',
        'datasources',
        'grupos',
      ], List(action.data))
    }
    default:
      return state;
  }
}

export default configuracionIndicadoresReducer;
