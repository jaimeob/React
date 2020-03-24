/*
  Formularios / index
*/

/* (IMPA) ABSOLUTE IMPORTS */ 
import React from 'react';
import T from 'prop-types';
import {
  connect,
} from 'react-redux';
import {
  Helmet,
} from 'react-helmet';
import {
  createStructuredSelector,
} from 'reselect';

// lodash Functions
import isInteger from 'lodash/isInteger';
import every from 'lodash/every';
import isEmpty from 'lodash/isEmpty';
import isBoolean from 'lodash/isBoolean';
import {
  compose,
  bindActionCreators,
} from 'redux';
import { MIME_TYPES, REGEXS, DAEMON } from 'utils/constants';
import withNotifier from 'components/HOC/withNotifier';
import AlertDialogExt from 'components/Dialog/alertDialog';
import {
  withHandlers,
  setPropTypes,
  defaultProps,
} from 'recompose';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import withWidth from '@material-ui/core/withWidth';
import Grey from '@material-ui/core/colors/grey';
import {
  AppBar,
  Toolbar,
  Grid,  
  IconButton,
  Icon,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  noop,
} from 'redux-saga/utils';
import {
  makeSelectConfigProject,
} from 'containers/Main/store/selectors';
/* (IMPR) RELATIVE IMPORTS */
import makeSelectFormularios from './store/selectors';
/* STORE */
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
/** CUSTOM COMPONENTS */
import NuevoFormulario from './components/NuevoFormulario';
import ConfiguracionFormulario from './components/ConfiguracionFormulario';
import ListadoFormulario from './components/ListadoFormulario';

const dfOptionsCompProp = {
  useEventInputValue: false,
  useEventInputName: false,
  useEventInputChecked: false,
  filterType: 'none',
};

const validatePattern = {
  none:
    () =>
      true,
  number:
    (txt = '') =>
      REGEXS.numeric.test(txt),
};

const FORM_HANDLERS = {
  handleDeleteRowColumn: ({ actions }) =>
    (idxComp, idxCol, idxRow, elem = 'column') => {
      const {
        deleteTableColumnAction,
      } = actions;
      deleteTableColumnAction(idxComp, idxCol, idxRow, elem);
    },
  deleteCellSelectOpt: (props) => (index) => () => {
    const {
      actions: {
        deleteCellSelectOptionAction,
      },
    } = props;
    deleteCellSelectOptionAction(index)
  },
  handleAddOptions: (props) => () => {
    const {
      actions: {
        addSelectOptionAction,
      },
    } = props;
    addSelectOptionAction();
  },
  handleAddCellOptions: (props) => (event) => {
    const {
      actions: {
        updateComponentCellPropAction,
      },
    } = props;
    const {
      target: {
        value,
      },
    } = event;
    updateComponentCellPropAction(null, 'optionsText', value);
  },
  handleChangeRowColData: (props) => (
    idxComp,
    idxRow,
    idxCol,
    prop,
    value,
    opts = dfOptionsCompProp,
  ) => (event) => {
    const {
      actions: {
        updateRowColDataAction,
      },
    } = props;
    const {
      target: {
        value: eventValue = '',
        checked: checkedValue = null,
      },
    } = event;
    const {
      useEventInputValue = false,
      useEventInputChecked = false,
      filterType = 'none',
    } = opts;
    const isCheckedValue = useEventInputChecked && isBoolean(checkedValue)
    if (useEventInputValue) value = eventValue;
    if (isCheckedValue) value = checkedValue;
    if (validatePattern[filterType](value)) {
      updateRowColDataAction(
        idxComp,
        idxRow,
        idxCol,
        prop,
        value,
      )
    }
  },
  handleChangeGroupText: (props) => (idx, idr) => (event) => {
    const {
      actions: {
        updateComponentRowgroupAction,
      },
    } = props;
    const {
      target: {
        value,
      },
    } = event;
    updateComponentRowgroupAction(idx, idr, value);
  },
  handleSelectTableOption: (props) => (elemType = '', idx, onClose) => () => {
    const {
      actions: {
        addNewRowDataAction,
      },
    } = props;
    if (elemType !== '' && idx >= 0) {
      onClose();
      addNewRowDataAction(elemType, idx);
    }
  }, // 
  handleSelectCellTable: (props) => (col, idx, idc, idr) => () => {
    const {
      actions: {
        onClickTableCellAction,
      },
    } = props;
    onClickTableCellAction(col, idx, idc, idr);
  },
  handleAddComp: (props) => (data = {}, idx) => (event) => {
    event.stopPropagation();
    const {
      actions: {
        onAddConfigComponentAction,
      },
    } = props;
    onAddConfigComponentAction(data, idx)
  },
  handleDeleteComp: (props) =>  (idx) => (event) => {
    const {
      actions: {
        onDeleteConfigComponentAction,
      },
    } = props;
    event.stopPropagation()
    onDeleteConfigComponentAction(idx);
  },
  handleSelectComponent: (props) => (item, index) => () => {
    const {
      actions: {
        onSelectConfigComponentAction,
      },
    } = props;
    onSelectConfigComponentAction(item, index);
  },
  handleClickComponentLayout: (props) => (event) => { // TODO: SELECT CELL
    const {
      actions: {
        onClickComponentLayoutAction,
      },
    } = props;
    const {
      currentTarget: {
        id = '',
      },
    } = event;
    const [
      idx,
    ] = id.split('_');
    onClickComponentLayoutAction(idx);
  },
  onUploadedFile: (props) => (file) => {
    const {
      actions: {
        updateFileLogoAction,
      },
      enqueueSnackbar: enqueueSnackbarAction,
    } = props;
    const {
      type: mimeType,
    } = file;

    if (mimeType !== MIME_TYPES.PNG_IMAGES) {
      enqueueSnackbarAction({
        message: 'El tipo de archivo debe ser una imagen con formato válido',
        options: {
          variant: 'success',
        },
      })
    } else {
      updateFileLogoAction(file);
    }
  },
  handleClickPublishForm: (props) => () => {
    const {
      actions: {
        updatePublishModalAction,
      },
      formularios: {
        backend: {
          payloads: {
            configuracionformulario: {
              nombre: nombreFormulario,
            },
          },
        },
      },
    } = props;
    
    updatePublishModalAction({
      saveModalMessage: `¿Está seguro que desea publicar el formulario: "${nombreFormulario}"? SI/NO.`,
      saveModalVariant: 'Report',
      openSaveModal: true,
      loadingSaveRequest: true,
      confirmPublish: true,
    });
  },
  handleCloseSaveDialog: (props) => () => { // TODO
    const {
      actions: {
        updatePublishModalAction,
      },
    } = props;
    updatePublishModalAction({
      saveModalMessage: '',
      saveModalVariant: 'Info',
      openSaveModal: false,
    });
  },
  handleOpenSaveForm: (props) => () => {
    const {
      actions: {
        updateModalStateAction,
      },
    } = props;
    updateModalStateAction('openSaveModal', true);
  },
  handleClosePublishDialog: (props) => () => {
    const {
      actions: {
        updateModalStateAction,
      },
    } = props;
    updateModalStateAction('openPublishModal', false);
  },
  handleClickEditForm: (props) => () => {
    const {
      actions: {
        toggleEditModeAction,
      },
    } = props;
    toggleEditModeAction(true);
  },
  handleUpdateComponentCellProp: (props) => (
    idxCol = -1,
    prop = '',
    value = '',
    opts = dfOptionsCompProp,
  ) => (event) => {
    const {
      actions: {
        updateComponentCellPropAction,
      },
    } = props;
    const {
      target: {
        value: eventValue = '',
        checked: checkedValue = '',
      },
    } = event;
    const {
      useEventInputValue = false,
      useEventInputChecked = false,
      filterType = 'none',
    } = opts;
    const isCheckedValue = useEventInputChecked
      && isBoolean(checkedValue);
    if (useEventInputValue) value  = eventValue;
    if (isCheckedValue) value = checkedValue;
    if (validatePattern[filterType](value)) {
      updateComponentCellPropAction(idxCol, prop, value);
    }
  },
  handleUpdateComponentProp: (props) => (
    idx = null,
    prop = '',
    value = '',
    opts = dfOptionsCompProp,
  ) => (event) => {
    const {
      actions: {
        updateComponentPropAction,
      },
    } = props;
    const {
      target: {
        value: eventValue = '',
        checked: checkedValue = null,
      },
    } = event;
    const {
      useEventInputValue = false,
      useEventInputChecked = false,
    } = opts;
    const isCehckedValue = useEventInputChecked && isBoolean(checkedValue)
    if (useEventInputValue) value = eventValue;
    if (isCehckedValue) value = checkedValue;
    updateComponentPropAction(idx, prop, value);
  },
  handleUpdateMinMaxLengths: (props) => (prop = '') => (event) => {
    const {
      actions: {
        updateComponentPropAction,
        updateComponentPropErrorAction,
      },
      notifier,
      formularios: {
        frontend: {
          selectedConfigComp,
          configFormularioForm: {
            configuredComponents,
          },
        },
      },
    } = props;
    const {
      target: {
        value,
      },
    } = event;
    const errorMessages = {
      minVal: 'La longitud mínima no puede ser mayor que la longitud máxima',
      maxVal: 'La longitud máxima no puede ser menor que la longitud máxima',
    }
    const avaiableProps = [
      'longitudMinima',
      'longitudMaxima',
    ];
    const isValidValue = every([
      isInteger(parseInt(value, 10)),
      avaiableProps.includes(prop),
    ], Boolean)
    if (isValidValue || isEmpty(value)) {
      const {
        longitudMinima = '',
        longitudMaxima = '',
      } = (configuredComponents[selectedConfigComp] || {});
      let errorMessage = '';
      updateComponentPropAction(null, prop, value);
      if (prop === 'longitudMinima') {
        errorMessage = parseInt(value, 10) > parseInt(longitudMaxima, 10) ?
          errorMessages.minVal : '';
      } else {
        errorMessage = parseInt(value, 10) < parseInt(longitudMinima, 10) ?
          errorMessages.maxVal : '';
      }
      if (errorMessage.length) {
        updateComponentPropErrorAction(null, prop, errorMessage);
        notifier(errorMessage, {
          variant: 'error',
        });
      }
    }
  },
  handleUnactivateEdition: (props) => () => {
    const {
      actions: {
        toggleEditModeAction,
      },
    } = props;
    toggleEditModeAction(false);
  },
  handleClickSaveForm: (props) => () => {
    // TODO: SOLO SALDRÁ DEL MODO DE EDICIÓN POR EL MOMENTO.
    const {
      actions: {
        toggleEditModeAction,
      },
    } = props;
    toggleEditModeAction(false); 
  },
  validateNombreForm: (props) => ({ target }) => {
    const {
      formularios: {
        frontend: {
          form: {
            nombreFormulario: {
              value: nombreFormularioVal,
            },
          },
        },
      },
      actions: {
        requestValidateNombreFormAction,
      },
    } = props;
    const {
      name: inputName,
    } = target;
    const {
      value: newValue,
    } = target;
    requestValidateNombreFormAction(inputName, newValue, nombreFormularioVal);
  },
  handleSubmitNewFrmConfig: (props) => () => {
    const {
      actions: {
        // REQUEST_SAVE_CONFIGURACION_FORM
        requestSaveConfiguracionFormAction: submitForm,
      },
    } = props;
    submitForm();
  },
  handleSubmitGuardarDetConfiguracion: (props) => () => { // 
    const {
      actions: {
        requestSaveDetConfiguracionFormAction: submitForm,
        reorderComponentsAction,
      },
    } = props;
    reorderComponentsAction();
    submitForm();
  },
  redirectToList: (props) => () => {
    const {
      actions: {
        handleStepGoFirstPageAction,
        resetFrontendAction,
        updatePublishModalAction,
      },
    } = props;
    updatePublishModalAction({
      openSaveModal: false,
      saveModalMessage: '',
      confirmPublish: false,
    })
    resetFrontendAction();
    handleStepGoFirstPageAction();
  },
  publishConfiguration: (props) => () => () => {
    const {
      actions: {
        requestPublishCfgFormAction,
      },
    } = props;
    requestPublishCfgFormAction()
  },
  handleClickDeleteModal: (props) => (id = '') => () => {
    const {
      actions: {
        updatePublishModalAction,
      },
    } = props;
    updatePublishModalAction({
      openDeleteModal: true,
      selectedConfiguracionId: id,
    });
  },
  handleClickEdit: (props) => (id = '') => () => {
    const {
      actions: {
        onClickEditAction,
      },
    } = props;
    onClickEditAction(id);
  },
  handleClickPublishConfig: (props) => () => {
    const {
      actions: {
        requestPublishCfgFormAction,
      },
    } = props;
    requestPublishCfgFormAction();
  },
  handleClickDeactivateCfgForm: (props) => () => {
    const {
      actions: {
        requestDesactivarConfiguracionAction,
      },
    } = props;
    requestDesactivarConfiguracionAction();
  },
  handleClickCloseDeleteModal: (props) => () => {
    const {
      actions: {
        updatePublishModalAction,
      },
    } = props;
    updatePublishModalAction({
      openDeleteModal: false,
      selectedConfiguracionId: '',
    });
  },
}


/* (STL) Styles */
const SecondaryToolbar = compose(
  withStyles(() => ({
    appbar: {
      backgroundColor: Grey[200],
    },
    toolbarContainer: {
      margin: 0,
    },
    appbar1: {
      border: '1px solid red',
    },
  })),
  setPropTypes({
    onClickBackButton: T.func,
    leftIcon: T.string,
    title: T.string,
    classes: T.object,
    showIcon: T.bool,
  }),
  defaultProps({
    onClickBackButton: noop,
    leftIcon: 'menu',
    title: 'topbarTitle',
    classes: {},
    showIcon: false,
  }),
)((props) => {
  const {
    onClickBackButton,
    leftIcon,
    title,
    classes,
    showIcon,
  } = props;
  const styles = {
    iconButton: {
      visibility: showIcon ? 'visible' : 'hidden',
    },
  }
  return (
    <AppBar position="static">
      <Toolbar
        variant="dense"
        disableGutters
        className={classes.appbar}
      >
        <Grid
          container
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <IconButton
              onClick={onClickBackButton}
              style={styles.iconButton}
            >
              <Icon>
                {leftIcon}
              </Icon>
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
});


/* (CMP) */
class Formularios extends React.PureComponent {
  constructor(props) {
    super(props);
    this.blured = false;
  }

  componentDidMount() {
    const {
      actions: {
        requestDepartamentosAction,
        requestFormulariosAction,
        requestFormsListAction,
        // requestDeptosFormsAction,
      },
    } = this.props;
    requestDepartamentosAction();
    requestFormulariosAction();
    requestFormsListAction('A');
    this.checkStore();
  }
  
  checkStore = () => {
    const {
      actions: {
        restoreStorageAction,
      },
    } = this.props;
    const formu = localStorage.getItem('formulariosData');
    if (formu && formu.length) {
      restoreStorageAction(JSON.parse(formu))
    }
  }

  getContentByStep = () => {
    const {
      formularios: {
        backend: {
          datasources,
        },
        frontend: {
          form,
          ui,
          editMode,
          stepper: {
            selectedStep,
          },
          configFormularioForm: {
            configuredComponents,  
          },
          selectedConfigComp,
          selectedTableCell,
          listForm: {
            selectSearch,
            data,
            textSearch,
          },
        },
      },
      onUploadedFile,
      validateNombreForm,
      actions: {
        updateInputAction,
        onSubmitToConfig,
        handleStepGoNextAction,
        handleStepGoBackAction,
        handleClickButtonSearchListAction,
        handleTextSearchChangeListAction,
        requestFormsListAction,
        requestUpdateStatusFormsListAction,
      },
      handleClickPublishConfig,
      handleUpdateComponentCellProp,
      handleClickComponentLayout,
      handleClickPublishForm,
      handleClosePublishDialog,
      handleClickEditForm,
      handleActivateEdition,
      handleUnactivateEdition,
      handleClickSaveForm,
      handleSelectComponent,
      handleDeleteComp,
      handleUpdateComponentProp,
      handleAddComp,
      hndlChangeNomComp,
      handleUpdateMinMaxLengths,
      handleSelectCellTable,
      handleSelectTableOption,
      handleChangeRowCellConfig,
      handleChangeGroupText,
      handleChangeRowColData,
      handleAddCellOptions,
      handleAddOptions,
      handleSubmitNewFrmConfig,
      deleteCellSelectOpt,
      handleSelectRowTable,
      handleDeleteRowColumn,
      handleSubmitGuardarDetConfiguracion,
      handleClickEdit,
      handleClickDeactivateCfgForm,
      handleClickDeleteModal,
      handleClickCloseDeleteModal,
    } = this.props;

    const NuevoFormularioActions = {
      updateInputAction,
      validateNombreForm,
      onSubmitToConfig,
      handleSubmitNewFrmConfig,
    };

    const configFormularioActions = {
      handleClickPublishForm,
      handleClosePublishDialog,
      handleClickEditForm,
      handleActivateEdition,
      handleUnactivateEdition,
      handleClickSaveForm,
      handleStepGoBackAction,
      handleSelectComponent,
      updateInputAction,
      handleClickComponentLayout,
      handleDeleteComp,
      handleUpdateComponentProp,
      handleAddComp,
      handleUpdateMinMaxLengths,
      hndlChangeNomComp,
      handleSelectCellTable,
      handleChangeRowColData,
      handleUpdateComponentCellProp,
      handleSelectTableOption,
      handleChangeRowCellConfig,
      handleChangeGroupText,
      handleAddCellOptions,
      handleAddOptions,
      deleteCellSelectOpt,
      handleSelectRowTable,
      handleDeleteRowColumn,
      validateNombreForm,
      handleSubmitGuardarDetConfiguracion,
      handleClickPublishConfig,
    }

    const ListadoFormularioActions = {
      handleClickButtonSearchListAction,
      handleTextSearchChangeListAction,
      handleStepGoNextAction,
      requestFormsListAction,
      requestUpdateStatusFormsListAction,
      handleClickEdit,
      handleClickDeleteModal,
      handleClickDeactivateCfgForm,
      /** click al botón de eliminar */
      handleClickCloseDeleteModal,
      /** click al botón de cancelar en el modal */
    }
    
    switch (selectedStep) {
      case 0:
        return (
          <ListadoFormulario
            selectSearch={selectSearch}
            data={data}
            actions={ListadoFormularioActions}
            textSearch={textSearch}
            ui={ui}
          />
        )
      case 1:
        return (
          <NuevoFormulario
            sources={datasources}
            actions={NuevoFormularioActions}
            formValues={form}
            afterLoadFile={onUploadedFile}
            loadings={ui}
          />
        );
      case 2:
        return (
          <ConfiguracionFormulario
            formValues={form}
            sources={datasources}
            actions={configFormularioActions}
            selectedConf={selectedConfigComp}
            selectedCell={selectedTableCell}
            ui={ui}
            editMode={editMode}
            configComponents={configuredComponents}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {
      formularios: {
        frontend: {
          ui: {
            confirmPublish,
            openSaveModal,
            saveModalMessage,
            saveModalTitle,
            saveModalVariant,
          },
          topbarTitle,
          stepper: {
            selectedStep,
          },
        },
      },
      actions: {
        handleStepGoBackAction,
        requestPublishCfgFormAction,
      },
      handleCloseSaveDialog,
      redirectToList,
    } = this.props;
    const Componente = this.getContentByStep();
    return (
      <div>
        <Helmet>
          <title>
            Formularios
          </title>
          <meta
            name="description"
            content="Description of Formularios"
          />
        </Helmet>
        <div>
          <SecondaryToolbar
            title={topbarTitle}
            onClickBackButton={handleStepGoBackAction}  
            showIcon={selectedStep > 0}
            leftIcon="arrow_back"
          />
          {Componente}
          <AlertDialogExt
            open={openSaveModal}
            title={saveModalTitle}
            message={saveModalMessage}
            handleCloseModal={handleCloseSaveDialog}
            onClickAccept={!confirmPublish ? redirectToList : requestPublishCfgFormAction}
            onClickCancel={handleCloseSaveDialog}
            typeAlert={saveModalVariant}
            typeOptions={confirmPublish ? 'Select': ''}
          />
        </div>
      </div>
    );
  }
}

/* (TYP) Prop Types */
const formulariosReduxType = T.shape({
  frontend: T.shape({
    form: T.shape({
      departamento: T.shape({
        value: T.any,
      }),
      nombreFormulario: T.shape({
        value: T.any,
      }),
      tipoFormulario: T.shape({
        value: T.any,
      }),
      formulario: T.shape({
        value: T.any,
      }),
      logoFile: T.shape({
        buffer: T.any,
        name: T.string,
        type: T.string,
        size: T.number,
      }),
    }),
    ListForm: T.shape({
      selectSearch: T.bool,
      data: T.array,
      textSearch: T.string,
    }),
  }),
});

const reduxActionsType = T.shape({
  updateInputAction: T.func,
  requestValidateNombreFormAction: T.func,
  HandleClickButtonSearchList: T.func,
  resetFrontendAction: T.func,
})

Formularios.propTypes = {
  formularios: formulariosReduxType,
  actions: reduxActionsType,
  onUploadedFile: T.func,
  validateNombreForm: T.func,
  /* HANDLER PROPS */
  redirectToList: T.func,
  handleClickCloseDeleteModal: T.func,
  handleClickPublishForm: T.func,
  handleClosePublishDialog: T.func,
  handleClickEditForm: T.func,
  handleActivateEdition: T.func,
  handleUnactivateEdition: T.func,
  handleClickDeactivateCfgForm: T.func,
  handleClickSaveForm: T.func,
  handleSelectComponent: T.func,
  handleDeleteComp: T.func,
  handleUpdateComponentProp: T.func,
  handleAddComp: T.func,
  hndlChangeNomComp: T.func,
  handleUpdateMinMaxLengths: T.func,
  handleSelectCellTable: T.func,
  handleSelectTableOption: T.func,
  handleChangeRowCellConfig: T.func,
  handleChangeGroupText: T.func,
  handleChangeRowColData: T.func,
  handleClickPublishConfig: T.func,
  handleAddCellOptions: T.func,
  handleAddOptions: T.func,
  deleteCellSelectOpt: T.func,
  handleUpdateComponentCellProp: T.func,
  handleClickDeleteModal: T.func,
  handleClickComponentLayout: T.func,
  handleSelectRowTable: T.func,
  handleDeleteRowColumn: T.func,
  handleSubmitNewFrmConfig: T.func,
  handleCloseSaveDialog: T.func,
  handleSubmitGuardarDetConfiguracion: T.func,
  handleClickEdit: T.func,
};

const mapStateToProps = createStructuredSelector({
  formularios: makeSelectFormularios(),
  proyecto: makeSelectConfigProject(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
  }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'formularios', reducer });
const withSaga = injectSaga({ key: 'formularios', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore();
const withReduxHandlers = withHandlers(FORM_HANDLERS);
const withViewport = withWidth();

/* (EXP) Exports */

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withReduxHandlers,
  withViewport,
)(Formularios);
