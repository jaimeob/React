/*
 *
 * Formularios reducer
 *
 */

// ABSOLUTE PATHS
import { fromJS, List, Map as IMap } from 'immutable';
// import isBoolean from 'lodash/isBoolean';
import toSafeInteger from 'lodash/toSafeInteger'
import isNull from 'lodash/isNull';
import omit from 'lodash/omit';
// RELATIVE PATHS
// import { DEFAULT_ACTION } from '../constants';
import INITIAL_STATE from './state';
import {
  ComponentTemplate,
  TableCols,
  TableRows,
  Opcion,
} from './records';
import Actions from './actions';

export const {
  ADD_NEW_ROW_DATA,
  ADD_SELECT_OPTION,
  DELETE_CELL_SELECT_OPTION,
  DELETE_TABLE_COLUMN,
  HANDLE_CLICK_BUTTON_SEARCH_LIST,
  HANDLE_STEP_GO_BACK,
  HANDLE_STEP_GO_NEXT,
  HANDLE_TEXT_SEARCH_CHANGE_LIST,
  HANDLE_STEP_GO_FIRST_PAGE,
  HANDLE_STEP_MERGE_STATE,
  ON_ADD_CONFIG_COMPONENT,
  ON_CLICK_COMPONENT_LAYOUT,
  ON_CLICK_COMPONENT_TABLE_ROW,
  ON_CLICK_EDIT,
  ON_CLICK_TABLE_CELL,
  ON_DELETE_CONFIG_COMPONENT,
  ON_SELECT_CONFIG_COMPONENT,
  REORDER_COMPONENTS,
  REQUEST_DEPARTAMENTOS_SUCCESS,
  REQUEST_FAILED,
  REQUEST_FORMS_LIST_SUCCESS,
  REQUEST_FORMULARIOS_SUCCESS,
  REQUEST_SAVE_CONFIGURACION_FORM_FAILED,
  REQUEST_SAVE_CONFIGURACION_FORM_SUCCESS,
  REQUEST_SAVE_DET_CONFIGURACION_FORM,
  REQUEST_SAVE_DET_CONFIGURACION_FORM_SUCCESS,
  REQUEST_VALIDATE_NOMBRE_FORM,
  REQUEST_VALIDATE_NOMBRE_FORM_FAILED,
  REQUEST_VALIDATE_NOMBRE_FORM_SUCCESS,
  REQUEST_PUBLISH_CFG_FORM,
  REQUEST_PUBLISH_CFG_FORM_SUCCESS,
  REQUEST_PUBLISH_CFG_FORM_FAILED,
  REQUEST_DESACTIVAR_CONFIGURACION,
  REQUEST_DESACTIVAR_CONFIGURACION_SUCCESS,
  REQUEST_DESACTIVAR_CONFIGURACION_FAILED,
  RESTORE_STORAGE,
  SAVE_CURRENT_STATE,
  TOGGLE_EDIT_MODE,
  UPDATE_COMPONENT_CELL_PROP,
  UPDATE_COMPONENT_ERROR_PROP,
  UPDATE_COMPONENT_PROP,
  UPDATE_COMPONENT_ROWGROUP,
  UPDATE_FILE_LOGO,
  UPDATE_INPUT,
  UPDATE_MODAL_STATE,
  UPDATE_PUBLISH_MODAL,
  CLONE_COMPONENTS,
  UPDATE_ROW_COL_DATA,
} = Actions.getConstants();

// local counters
let groupId = 0;
let uniqueRowId = 0;
let uniqueComponentId = 0;

const STATEPATH_FAILED = [
  'backend',
  'failed',
];
const initialState = fromJS(INITIAL_STATE);

export function reducer(state = initialState, action) { 
  switch (action.type) {
    case CLONE_COMPONENTS: {
      const {
        componentesformularios,
      } = action;
      const cloneWithoutIds = componentesformularios
        .map(
          (item) =>
            omit(item, [
              '_id',
              '__v',
              'createdAt',
              'updatedAt',
              'id',
            ])
        )
      return state
        .setIn([
          'frontend',
          'configFormularioForm',
          'configuredComponents',
        ],
        fromJS(cloneWithoutIds)
        );
    }
    case ADD_NEW_ROW_DATA: {
      const {
        elemType,
        idx,
      } = action;
      if (elemType === 'add_column') {
        return state
          .updateIn([
            'frontend',
            'configFormularioForm',
            'configuredComponents',
            idx,
            'tableCols',
          ], (tbc) => {
            const nextId = tbc.size + 1;
            return tbc.push(
              TableCols({
                id: `col_${idx}_${nextId}`,
                placeholder: `Columna_${nextId}`,
                textAlign: 'center',
              }),
            )
          })
      }
      if (elemType === 'add_group') {
        groupId += 1;
        return state
          .updateIn([
            'frontend',
            'configFormularioForm',
            'configuredComponents',
            idx,
            'tableRows',
          ], (tbr) => 
            tbr.push(
              TableRows({
                id: `tbl_${idx}_row_grp_${tbr.size + 1}`,
                isGroup: true,
                groupText: `Agrupador ${groupId}`,
                groupLabelText: '',
                backgroundColor: '#EAEAEA',
                groupId: `grp grp_${groupId}`,
              })
            )
          );
      }
      if (elemType === 'add_row') {
        // groupId += 1;
        return state
          .updateIn([
            'frontend',
            'configFormularioForm',
            'configuredComponents',
            idx,
          ], (cmp) =>  {
            const tbr = cmp.get('tableRows');
            const tbc = cmp.get('tableCols');
            const grpid = tbr.size > 0 ? tbr
              .last(IMap({ groupId: '' }))
              .get('groupId') : '';
            /*
              DATATYPE
              - text
              - alphanumeric
              - number
              - autoincrement * << solo si está checkeado number
              - dropdown
              - boolean
              - file
            */
            const newData = tbc.map((c) => c)
            // const newData = tbc.map((c) => {
            //   console.log('cell config in ADD_NEW_ROW_DATA', c)
            //   return c;
            // })

            uniqueRowId += 1;
            return cmp.update('tableRows', (tr) =>
              tr.push(
                TableRows({
                  id: `tbl_${idx}_row_body_${uniqueRowId}`,
                  groupId: grpid,
                  data: newData,
                })
              )
            )
          })
      }
      return state;
    }
    case REQUEST_DESACTIVAR_CONFIGURACION: {
      return state;
    }
    case REQUEST_DESACTIVAR_CONFIGURACION_SUCCESS: {
      return state
        .updateIn([
          'frontend',
          'ui',
        ], (ui) =>
          ui.merge({
            openDeleteModal: false,
            selectedConfiguracionId: '',
          })
        );
    }
    case REQUEST_DESACTIVAR_CONFIGURACION_FAILED: {
      return state;
    }
    case REQUEST_SAVE_DET_CONFIGURACION_FORM_SUCCESS: {
      const updatedFrontend = state.updateIn([
        'frontend',
        'ui',
      ], (ui) =>
        ui.merge({
          saveModalMessage: 'Componentes guardados correctamente',
          loadingSaveRequest: false,
          saveModalVariant: 'Check',
        })
      )
      return updatedFrontend;
    }
    case REQUEST_SAVE_DET_CONFIGURACION_FORM: {
      return state
        .updateIn([
          'frontend',
          'ui',
        ], (ui) =>
          ui.merge({
            openSaveModal: true,
            saveModalMessage: 'Guardando componentes',
            saveModalVariant: 'Info',
            loadingSaveRequest: true,
          })
        );
    }
    case REQUEST_SAVE_CONFIGURACION_FORM_FAILED: {
      const {
        requestAction,
        response,
      } = action;
      return state
        .updateIn(
          STATEPATH_FAILED,
          (fld) => fld.set(requestAction, response)
        );
    }
    case REQUEST_SAVE_CONFIGURACION_FORM_SUCCESS: {
      const {
        data,
      } = action;
      return state
        .setIn([
          'backend',
          'payloads',
          'configuracionformulario',
        ], fromJS(data));
    }
    case REQUEST_FORMS_LIST_SUCCESS: {
      const {
        payload: data,
      } = action;
      // console.log('REQUEST_FORMS_LIST_SUCCESS data', data);
      if (!data.length) return state;
      const immData = fromJS(data);
      return state
        .setIn([
          'backend',
          'datasources',
          'deptosFormularios',
        ], immData)
        .setIn([
          'frontend',
          'listForm',
          'data',
        ], immData); 
    }
    case REQUEST_PUBLISH_CFG_FORM_SUCCESS: {
      const {
        nombreFormulario = '',
      } = action;
      const saveModalMessage = `¡Formulario ${nombreFormulario} publicado correctamente!`;
      return state
        .mergeDeep({
          frontend: {
            ui: {
              saveModalMessage,
              saveModalVariant: 'Check',
              loadingSaveRequest: false,
              confirmPublish: false,
            },
          },
        })
    }
    case DELETE_TABLE_COLUMN: {
      const {
        idxComp = -1,
        idxCol = -1,
        idxRow = -1,
      } = action;
      const deleteTableCols = (col) => col.delete(idxCol);
      const skipDeleteTableCols = (col) => col;
      const deleteTableRowCols = (rows) =>
        rows.map((r) => {
          if (r.data.size) {
            return r.update('data',
              (d) => toSafeInteger(idxCol) > d.delete(idxCol)
            )
          }
          return r;
        })
      const deleteTableRows = (rows) => rows.delete(idxRow);
      const updateSelectedComponents = (frnt) =>
        frnt.merge({
          selectedConfigComp: -1,
          selectedTableCell: -1,
        });
      const nextState = state.updateIn([
        'frontend',
      ], updateSelectedComponents)
      return nextState.updateIn([
        'frontend',
        'configFormularioForm',
        'configuredComponents',
        idxComp,
      ], (cmp) =>
        cmp
          .update('tableCols',
            idxCol >= 0 ? deleteTableCols : skipDeleteTableCols)
          .update('tableRows',
            idxRow >= 0 ? deleteTableRows : deleteTableRowCols)
      );
    }
    case HANDLE_CLICK_BUTTON_SEARCH_LIST: {
      const status = state.getIn(['frontend','listForm','selectSearch'])
      return state
        .setIn([
          'frontend',
          'listForm',
          'selectSearch',
        ], !status)
        .setIn([
          'frontend',
          'listForm',
          'textSearch',
        ], '');
    }
    case HANDLE_TEXT_SEARCH_CHANGE_LIST: {
      const {
        text,
      } = action;

      return state
        .setIn([
          'frontend',
          'listForm',
          'textSearch',
        ], text);
    }
    case HANDLE_STEP_GO_FIRST_PAGE: {
      return state
        .setIn([
          'frontend',
          'stepper',
          'selectedStep',
        ], 0);
    }
    case HANDLE_STEP_GO_NEXT: {
      return state
        .updateIn([
          'frontend',
          'stepper',
        ], (stepper) => {
          const currentStep = stepper.get('selectedStep') 
          const nextStep = currentStep + 1;
          const maxSteps = stepper.get('totalSteps');
          return stepper.merge({
            selectedStep: nextStep < maxSteps
              ? nextStep : currentStep,
          }) 
        });
    }
    case UPDATE_ROW_COL_DATA: {
      const {
        idxComp = null,
        idxRow = null,
        idxCol = null,
        prop = '',
        value = '',
      } = action;
      return state.updateIn([
        'frontend',
        'configFormularioForm',
        'configuredComponents',
        idxComp,
        'tableRows',
        idxRow,
        'data',
        idxCol,
      ], (rowCol) =>
        rowCol.has(prop) ?
          rowCol.set(prop, value) : rowCol
      )
    }
    case DELETE_CELL_SELECT_OPTION: {
      return state.updateIn([
        'frontend',
      ], (fnt) => {
        const comIdx = fnt.get('selectedConfigComp');
        const colIdx = fnt.get('selectedTableCell');
        const deletedState = fnt
          .updateIn([
            'configFormularioForm',
            'configuredComponents',
            comIdx,
            'tableCols',
            colIdx,
            'options',
          ], (opt) => 
            opt.delete(action.index)
          );
        return deletedState
          .merge({
            selectedTableCell: -1,
            selectedConfigComp: -1,
          })
      });
    }
    case ADD_SELECT_OPTION: {
      return state.updateIn([
        'frontend',
      ], (fnt) => {
        const comIdx = fnt.get('selectedConfigComp');
        const colIdx = fnt.get('selectedTableCell');
        return fnt.updateIn([
          'configFormularioForm',
          'configuredComponents',
          comIdx,
          'tableCols',
          colIdx,
        ], (col) => {
          const optionText = col.optionsText
          const addedOption = col
            .update(
              'options',
              (op) => op.push(
                Opcion({
                  id: `opt_${comIdx}_${colIdx}_${op.size + 1}`,
                  valor: optionText,
                  label: optionText,
                  icon: 'delete',
                })
              )
            );
          const clearData = addedOption.set('optionsText', '');
          return clearData;
        })
      });
    }
    case UPDATE_COMPONENT_ROWGROUP: {
      const {
        idx,
        idxRow,
        value,
      } = action;
      return state.
        updateIn([
          'frontend',
          'configFormularioForm',
          'configuredComponents',
          idx,
          'tableRows',
          idxRow,
        ], (row) =>
          row.set('groupText', value)
        );
    }
    case UPDATE_COMPONENT_CELL_PROP: {
      const {
        // idxCol = -1,
        prop = '',
        value,
      } = action;
      return state.updateIn([
        'frontend',
      ], (fnt) => {
        const comIdx = fnt.get('selectedConfigComp');
        const colIdx = fnt.get('selectedTableCell');
        return fnt.updateIn([
          'configFormularioForm',
          'configuredComponents',
          comIdx,
          'tableCols',
          colIdx,
        ], (col) => 
          col.has(prop) ?
            col.set(prop, value) : col
        )
      });
    }
    case ON_CLICK_TABLE_CELL: {
      const {
        cmp = null,  // eslint-disable-line
        idx,
        idc,
      } = action;
      return state.mergeIn([
        'frontend',
      ], {
        selectedConfigComp: parseInt(idx, 10),
        selectedTableCell: idc, 
      })
      // return state;
    }
    case ON_CLICK_EDIT: {
      const {
        id: cfrmId,
      } = action;
      const confComponent = state
        .getIn([
          'backend',
          'datasources',
          'deptosFormularios',
        ])
        .find(
          (cfrm) =>
            cfrm.get('id') === cfrmId
        );
      if (!confComponent.size) return state;
      return state
        .setIn([
          'backend',
          'payloads',
          'configuracionformulario',
        ], confComponent)
        .setIn([
          'frontend',
          'editMode',
        ], true)
        .setIn([
          'frontend',
          'ui',
          'isEditingCfrm',
        ], true)
        .setIn([
          'frontend',
          'configFormularioForm',
          'configuredComponents',
        ],
        confComponent
          .get('componentesformularios')
        )
        .setIn([
          'frontend',
          'stepper',
          'selectedStep',
        ], 2)
        .setIn([
          'frontend',
          'form',
          'nombreFormulario',
          'value',
        ],
        confComponent
          .get('nombre')
        );
    }
    case UPDATE_COMPONENT_ERROR_PROP: {
      const {
        prop,
        value,
      } = action;
      let {
        idx,
      } = action;

      idx = isNull(idx) ? state.getIn([
        'frontend',
        'selectedConfigComp',
      ]) : idx;
      return state.updateIn([
        'frontend', 
        'configFormularioForm',
        'configuredComponents',
        idx,
        'errors',
      ], (cmp) =>
        cmp.has(prop) ?
          cmp.set(prop, value) : cmp
      );
    }
    case ON_CLICK_COMPONENT_TABLE_ROW: {
      const {
        idxComp,
        idxRow,
      } = action;
      return state.mergeIn([
        'frontend',
      ], {
        selectedConfigComp: parseInt(idxComp, 10),
        selectedTableCell: -1,
        selectedTableRow: idxRow,
      });
    }
    case ON_CLICK_COMPONENT_LAYOUT: {
      const {
        idx,
      } = action;
      return state.mergeIn([
        'frontend',
      ], {
        selectedConfigComp: parseInt(idx, 10),
        selectedTableCell: -1,
      });
    }
    case UPDATE_COMPONENT_PROP: {
      const {
        prop,
        value,
      } = action;
      let {
        idx,
      } = action;

      idx = isNull(idx) ? state.getIn([
        'frontend',
        'selectedConfigComp',
      ]) : idx;
      
      return state.updateIn([
        'frontend',
        'configFormularioForm',
        'configuredComponents',
        idx,
      ], (cmp) =>
        cmp.has(prop) ?
          cmp.set(prop, value) : cmp
      );
    }
    case ON_DELETE_CONFIG_COMPONENT: {
      const {
        idx,
      } = action;
      const PATH = [
        'frontend', 
        'configFormularioForm',
        'configuredComponents',
      ];
      return state
        .updateIn(PATH, (cfc) => cfc.delete(idx))
    }
    case ON_ADD_CONFIG_COMPONENT: {
      const {
        data: {
          componentId,
          tipo,
        },
        idx = -1,
      } = action;
      const PATH = [
        'frontend', 
        'configFormularioForm',
        'configuredComponents',
      ];
      uniqueComponentId += 1;
      const lastIdx = parseInt(
        List.isList(state.getIn(PATH)) ?
          state.getIn(PATH).size : 0
        , 10) + 1;
      const deleteFromIndexFN = (cfc) =>
        cfc
          .splice(idx + 1, 0, 
            ComponentTemplate({
              id: `${componentId}_${uniqueComponentId}`,
              componentId,
              tipo,
              placeholder: nomCampo,
              nomCampo,
              order: cfc.size,
            })
          )
          .map((it, i) => it.set('order', (i + 1)))
          .sortBy((it) => it.get('order'))
      const nomCampo = `${tipo}_${lastIdx}`;
      return state
        .updateIn(PATH,deleteFromIndexFN)
    }
    case ON_SELECT_CONFIG_COMPONENT: {
      const {
        comp: {
          tipo,
          nombre: nomCampo,
          id: componentId,
          icon,
        },
        // index,
      } = action;
      uniqueComponentId += 1;
      const addNewComponentFN = (cfc) =>
        cfc.push(
          ComponentTemplate({
            id: `${componentId}_${uniqueComponentId}`,
            componentId,
            tipo,
            nomCampo: `${nomCampo}_${lastIdx}`,
            icon,
            placeholder:  `${tipo}_${lastIdx}`,
            tableCols,
            order: (cfc.size + 1),
          })
        );
      // const reorderComponentFN = 
      const PATH = [
        'frontend', 
        'configFormularioForm',
        'configuredComponents',
      ];
      const lastIdx = parseInt(
        List.isList(state.getIn(PATH)) ?
          state.getIn(PATH).size : 0
        , 10) + 1;
      // const isTableType = tipo === 'tabla';
      const tableCols = tipo === 'tabla' ? List([
        TableCols({
          order: 0,
          id: `col_${lastIdx}_0`,
          placeholder: `Columna_1`,
          textAlign: 'center',
        }),
        TableCols({
          order: 1,
          id: `col_${lastIdx}_1`,
          placeholder: `Columna_2`,
          textAlign: 'center',
        }),
        TableCols({
          order: 2,
          id: `col_${lastIdx}_2`,
          placeholder: `Columna_3`,
          textAlign: 'center',
        }),
      ])  : List();
      return state
        .updateIn(PATH, addNewComponentFN)
    }
    case TOGGLE_EDIT_MODE: {
      const {
        active: editMode = false,
      } = action;
      return state
        .update('frontend',
          (frnt) => frnt
            .merge({
              selectedConfigComp: -1,
              selectedTableCell: -1,
              editMode,
            })
        );
    }
    case UPDATE_MODAL_STATE: {
      return state
        .updateIn([
          'frontend',
          'ui',
        ], (ui) => {
          const {
            uiProp,
            val,
          } = action;
          if (!ui.has(uiProp) || typeof(val) !== 'boolean') return ui;
          return ui.set(uiProp, val);
        })
    }
    case REQUEST_DEPARTAMENTOS_SUCCESS: {
      const {
        payload: data,
      } = action;
      return state
        .setIn([
          'backend',
          'datasources',
          'departamentos',
        ], data);
    }
    case REQUEST_FAILED: {
      const {
        actionId,
        payload,
      } = action;
      return state
        .updateIn([
          'backend',
          'request',
        ], (req) =>
          req.set(actionId, payload)
        );
    }
    case UPDATE_FILE_LOGO: {
      const {
        file: {
          name,
          size,
          type,
          buffer,
          url,
        },
      } = action;
      const filePathState = [
        'frontend',
        'form',
        'logoFile',
      ];
      if (buffer) {
        const fileState = state
          .getIn(filePathState);
        const updatedFileState = fileState
          .merge({
            name,
            size,
            type,
            buffer,
            url,
          });
        return state
          .setIn(filePathState, updatedFileState);
      }
      return state;
    }
    case UPDATE_INPUT: {
      const {
        name,
        value,
      } = action;
      const updatePath = [
        'frontend',
        'form',
        name,
        'value',
      ];
      return state.setIn(updatePath, value);
    }
    case UPDATE_PUBLISH_MODAL: {
      const {
        ui,
      } = action;
      return state
        .mergeDeep({
          frontend: {
            ui,
          },
        });
    }
    case REQUEST_VALIDATE_NOMBRE_FORM: {
      const {
        val = '',
        newVal = '',
      } = action;
      return val !== newVal ?
        state
          .setIn([
            'frontend',
            'ui',
            'loadingValidNombreForm',
          ], true) : state;
      // return state
      //   .setIn([
      //     'frontend',
      //     'ui',
      //     'loadingValidNombreForm',
      //   ], true)
    }
    case REQUEST_VALIDATE_NOMBRE_FORM_SUCCESS: {
      return state
        .setIn([
          'frontend',
          'ui',
          'loadingValidNombreForm',
        ], false);
    }
    case REQUEST_VALIDATE_NOMBRE_FORM_FAILED: {
      return state
        .setIn([
          'frontend',
          'ui',
          'loadingValidNombreForm',
        ], false);
    }
    case HANDLE_STEP_GO_BACK: {
      return state
        .updateIn([
          'frontend',
          'stepper',
        ], (stepper) => {
          const currentStep = stepper.get('selectedStep') 
          const prevStep = currentStep - 1;
          return stepper.merge({
            selectedStep: prevStep >= 0
              ? prevStep : currentStep,
          })
        });
    }
    case HANDLE_STEP_MERGE_STATE: {
      const {
        stepper = {},
      } = action;
      return state
        .mergeDeep({
          frontend: {
            stepper,
          },
        });
    }
    case REQUEST_FORMULARIOS_SUCCESS: {
      const {
        payload: data,
      } = action;
      return state
        .setIn([
          'backend',
          'datasources',
          'formularios',
        ], fromJS(data)); 
    }
    default:
      return state;
  }
}
export {
  initialState,
}
export default reducer;
