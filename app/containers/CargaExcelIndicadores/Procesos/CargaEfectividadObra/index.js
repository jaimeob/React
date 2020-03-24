/**
 *
 * CargaEfectividadObra
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import withNotifier from 'components/HOC/withNotifier';
import XLSX from 'xlsx';
import { withStyles, Paper, Grid } from '@material-ui/core';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import Spinner from 'components/Spinner';
import Appbar from 'components/Appbar';
import{ DAEMON }from'utils/constants';
import moment from 'moment';
import espanol from 'moment/src/locale/es';
import {
  makeSelectCargaGeneral,
} from '../../store/selectors';
import reducer from '../../store/reducer';
import saga from '../../store/saga';
import Actions from '../../store/actions';
import {
  directionCell,
  transformValue,
  validateDataTypes,
  validateColumnRequired,
  exportLayout,
} from '../../store/functions';
import { LIST_HEADERS } from '../../store/constants';
import FileHeader from "../../components/FilterHeader";
import FileSelection from "../../components/FileSelection";
import LoadListGeneral from "../../components/LoadListGeneral";
import ModalLayout from "../../components/ModalLayout";
import ModalLoadDetails from "../../components/ModalLoadDetails";
import ModalLoadingErrors from "../../components/ModalLoadingErrors";
const styles = () => ({
  paperRoot: {
    margin: '.5rem',
    padding: '.5rem 1rem .5rem 1rem',
    minHeight: '75vh',
  },
});

export class CargaEfectividadObra extends Component {
  componentDidMount() {
    const {
      actions: {
        defaultConfigurationAction,
        initialConfigurationAction,
      },
    } = this.props;
    /*
      TODO:
        tipoCargaId: 3 = Efectividad Obra,
        periodicity: 'M' = Mensual
    */
    defaultConfigurationAction();
    initialConfigurationAction(3, 'M');
  }

  handleSelectedPlaza = (e) => {
    const {
      target: {
        value: plazaId,
      },
    } = e;
    const {
      actions: {
        setSelectedPlazaAction,
        getListGeneralAction,
      },
    } = this.props;
    setSelectedPlazaAction(plazaId);
    getListGeneralAction(3, plazaId);
  }

  handleSelectedMonth = (e) => {
    const {
      actions: {
        setSelectedMonthAction,
      },
    } = this.props;
    setSelectedMonthAction(e.target.value);
  }

  handleModalContentLayout = (modalContentLayout) => {
    const {
      actions: {
        setModalContentLayoutAction,
      },
    } = this.props;
    setModalContentLayoutAction(modalContentLayout);
  }

  handleModalLoadDetails = (modalLoadDetails) => {
    const {
      actions: {
        setModalLoadDetailsAction,
      },
    } = this.props;
    setModalLoadDetailsAction(modalLoadDetails);
  }

  handleModalLoadingErrors = (modalLoadingErrors) => {
    const {
      actions: {
        setModalLoadingErrorsAction,
        setCleanErrorsLoadedAction,
      },
    } = this.props;
    setModalLoadingErrorsAction(modalLoadingErrors);
    if (!modalLoadingErrors) setCleanErrorsLoadedAction();
  }

  openModalViewExplotion = (modalLoadDetails) => {
    const {
      actions: {
        setModalLoadDetailsAction,
      },
    } = this.props;
    setModalLoadDetailsAction(modalLoadDetails);
  }

  fileHandler = (event) =>{
    const {
      target: {
        value,
      },
    } = event;

    const {
      actions: {
        setIconViewExplotionAction,
        setFileLoadAction,
        validatedFileAction,
        setModalLoadingErrorsAction,
      },
      enqueueSnackbar: enqueueSnackbarAction,
      cargaGeneral: {
        backend:{
          layout:{
            content,
          },
        },
      },
    } = this.props;

    setIconViewExplotionAction(false)
    const columsRequired = content && content.length > 0 ? content[0].Content.map(cont => cont.Column) : [];
    const headers = content && content.length > 0 ? content[0].Content : [];
    const rowsLoaded = []
    let validatedColumns = {
      result: false,
      errorsColumns: [],
      msjError: 'Error generico',
    }
    let validatedDataType = {
      result: false,
      errorsColumns: [],
      msjError: 'Error generico',
    }
    if (value) {
      const fileObj = event.target.files[0];
      if (fileObj.size < 20800000) {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = e => {
            const workbook = XLSX.read(e.target.result, {
              type: 'binary',
              cellDates: true,
            });
            if (workbook) {
              const firstSheet = workbook.SheetNames[0];
              const sheet = workbook.Sheets[firstSheet]
              const excelRows = XLSX.utils.sheet_to_json(sheet);
              const columsContent = [];
              const range = XLSX.utils.decode_range(sheet['!ref']);
              let C;
              const R = range.s.r;
              // eslint-disable-next-line no-plusplus
              for(C = range.s.c; C <= range.e.c; ++C) {
                const cell = sheet[XLSX.utils.encode_cell({c:C, r:R})]
                let hdr = `UNKNOWN  ${C}`;
                if(
                  cell &&
                  cell.t &&
                  cell.v !== undefined &&
                  cell.v.toString().trim()
                ) {
                  hdr = XLSX.utils.format_cell(cell);
                  columsContent.push(hdr);
                }
              }
              if (!excelRows.length) {
                enqueueSnackbarAction({
                  message: 'Archivo sin información.',
                  options: { variant: 'warning' },
                })
              } else {
                const columsContentLowerCase = columsContent.map(col => col.toLocaleLowerCase().trim())
                validatedColumns = validateColumnRequired(columsRequired, columsContentLowerCase)
                if ( validatedColumns.result){
                  excelRows.map( row => columsContent.forEach( k => {

                    // transformar a string las fechas que vienen ej:  06/05/2019 : 05/06/2019 en el archivo de fínamo
                    if(row[k] instanceof Date){
                      row[k] =  moment(row[k]).local('es', espanol).format('L');
                    }

                    // Validar si viene un valor tipo money (123,42.00), quitarle la coma y pasarlo a número
                    if( typeof row[k] === 'string' ){
                      if(row[k].search(/^\$?\d+(,\d{3})*(\.\d*)?$/) >= 0 || row[k] === "0,00"){
                        if(typeof value === 'string'){
                          row[k] = Number(row[k].replace(',', ''));
                        }
                      }
                    }

                    if(k.toLowerCase() !== k) {
                      delete Object.assign(row, {[k.toLowerCase().trim()]: row[k] })[k]
                    }
                  }))
                  rowsLoaded.push(...excelRows)
                  // Si hay celdas no existentes  vacias las llena con espacio
                  columsContentLowerCase.forEach(col => {
                    rowsLoaded.forEach(row => {
                      if(!Object.keys(row).some(r => r === col)) {
                        Object.assign(row, { [col] : '' })
                      }
                    })
                  })
                  validatedDataType = validateDataTypes(excelRows, headers)
                  if(validatedDataType.result){
                    setIconViewExplotionAction(true)
                    setFileLoadAction({
                      cols: headers.map(head => ({ ...head, Column: head.Column.toLowerCase()})),
                      rows: rowsLoaded,
                      name: fileObj.name,
                      size: fileObj.size,
                    })
                    validatedFileAction(true)
                  } else {
                    enqueueSnackbarAction({
                      message: validatedDataType.msjError,
                      options: { variant: 'warning' },
                    })
                    const loadingErrors = {
                      colsLayout: headers,
                      rowsLoaded,
                      rowsErrors: validatedDataType.errorsComplete,
                    };
                    setModalLoadingErrorsAction(true, loadingErrors);
                    setFileLoadAction({
                      cols: [],
                      rows: [],
                      name: '',
                      size: 0,
                    });
                    validatedFileAction(false);
                  }
                }else{
                  enqueueSnackbarAction({
                    message: validatedColumns.msjError,
                    options: { variant: 'warning' },
                  })
                  setFileLoadAction({
                    cols: [],
                    rows: [],
                    name: '',
                    size: 0,
                  })
                }
              }
            }else{
              enqueueSnackbarAction({
                message: 'Archivo sin información.',
                options: { variant: 'warning' },
              })
            }
          };
          reader.readAsBinaryString(event.target.files[0]);
        }
      }else{
        enqueueSnackbarAction({
          message: 'Peso máximo de archivo es 20mb, favor de validar.',
          options: { variant: 'warning' },
        })
      }
    }else{
      setFileLoadAction({
        cols: [],
        rows: [],
        name: '',
        size: 0,
      })
      enqueueSnackbarAction({
        message: 'No seleccionaste archivo.',
        options: { variant: 'warning' },
      })
    }
  }

  handleExportLayout = () => {
    const {
      enqueueSnackbar: enqueueSnackbarAction,
      cargaGeneral: {
        backend:{
          layout: {
            content,
            layoutName,
          },
        },
      },
    } = this.props;
    const {
      result,
      message,
      variant,
    } = exportLayout(content, layoutName);
    if (!result) {
      enqueueSnackbarAction({
        message,
        options: {
          variant,
        },
      })
    }
  }

  handleSave = () => {
    const {
      actions: {
        setLoadedIndicatorsAction,
      },
      cargaGeneral: {
        backend: {
          currentDate: {
            Year,
          },
        },
        frontend: {
          ui: {
            selectedMonth: {
              MesRetail,
            },
            selectedPlaza,
          },
          fileLoad: {
            name,
            rows,
          },
          currentTypeLoad,
        },
      },
      usuarioGlobal: {
        UsuarioId,
      },
    } = this.props;
    const params = {
      plazaId: selectedPlaza,
      nombreArchivo: name,
      anio: Year,
      mesRetail: MesRetail,
      semanaRetail: null,
      dia: null,
      usuarioId: UsuarioId,
      rows,
    }
    const empresaId = 1 // PROMOTORA
    setLoadedIndicatorsAction(currentTypeLoad, empresaId, params)
  }

  render() {
    const {
      classes,
      cargaGeneral: {
        backend:{
          currentDate: {
            Year: yearCurrent,
            Week: weekCurrent,
          },
          plazas = [],
          months = [],
          layout,
          listGeneral,
        },
        frontend: {
          ui: {
            selectedPlaza = null,
            selectedMonth = null,
            modalContentLayout = false,
            modalLoadDetails = false,
            modalLoadingErrors = false,
            iconViewExplotion = false,
          },
          fileLoad: { cols = [], rows = [], name="" },
          loadingErrors: {
            colsLayout,
            rowsLoaded,
            rowsErrors,
          },
          currentTypeLoad,
          periodicity,
        },
      },
    } = this.props;

    const propsFileHeader = {
      propsYear: { yearCurrent },
      propsPlaza: {
        plazas,
        selectedPlaza,
        handleSelectedPlaza: this.handleSelectedPlaza,
      },
      weekCurrent,
      propsMonth: {
        months,
        selectedMonth,
        handleSelectedMonth: this.handleSelectedMonth,
      },
      itemsDisabled: listGeneral.length > 0 ? listGeneral.map(list => parseInt(list.Periodo, 10)) : [],
    };
    const propsFileSelection = {
      data: {
        selectedPlaza,
        selectedMonth,
        nombreArchivo: name,
        enabledIconViewExplotion: iconViewExplotion,
        currentTypeLoad,
      },
      foo: {
        handleModalContentLayout: this.handleModalContentLayout,
        handleModalLoadDetails: this.handleModalLoadDetails,
        fileHandler: this.fileHandler,
      },
    };
    const propsLoadListGeneral = {
      data: {
        periodicity,
        headers: LIST_HEADERS,
        rows: listGeneral,
      },
      foo: {
        directionCell,
      },
    };
    const propsModalLayout = {
      data: {
        modalContentLayout,
        layout,
        currentTypeLoad,
      },
      foo: {
        handleModalContentLayout: this.handleModalContentLayout,
        handleExportLayout: this.handleExportLayout,
        directionCell,
        transformValue,
      },
    };
    const propsModalLoadDetails = {
      data: {
        modalLoadDetails,
        cols, rows,
      },
      foo: {
        handleModalLoadDetails: this.handleModalLoadDetails,
        handleSave: this.handleSave,
        directionCell,
        transformValue,
      },
    };
    const propsModalLoadingErrors = {
      data: {
        modalLoadingErrors,
        colsLayout,
        rowsLoaded,
        rowsErrors,
      },
      foo: {
        handleModalLoadingErrors: this.handleModalLoadingErrors,
      },
    };

    return (
      <div>
        <Helmet>
          <title>CargaEfectividadObra</title>
          <meta
            name="description"
            content="Description of CargaEfectividadObra"
          />
        </Helmet>
        <Spinner />
        <Appbar texto="Carga Efectividad de Obra"></Appbar>
        { modalContentLayout ? <ModalLayout propsModalLayout={propsModalLayout} /> : null }
        { modalLoadDetails ? <ModalLoadDetails propsModalLoadDetails={propsModalLoadDetails} /> : null }
        { modalLoadingErrors ? <ModalLoadingErrors propsModalLoadingErrors={propsModalLoadingErrors} /> : null }
        <Paper className={classes.paperRoot}>
          <Grid container>
            <Grid item xs={12}>
              <FileHeader propsFilterHeader={propsFileHeader} />
            </Grid>
            <Grid item xs={12}>
              <FileSelection propsFilterSelection={propsFileSelection} />
            </Grid>
            <Grid item xs={12}>
              <LoadListGeneral propsLoadListGeneral={propsLoadListGeneral} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

CargaEfectividadObra.propTypes = {
  enqueueSnackbar: PropTypes.func,
  actions: PropTypes.object,
  classes: PropTypes.object,
  cargaGeneral: PropTypes.object,
  usuarioGlobal: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  cargaGeneral: makeSelectCargaGeneral(),
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

const withReducer = injectReducer({ key: 'cargaGeneral', reducer });
const withSaga = injectSaga({ key: 'cargaGeneral', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(CargaEfectividadObra);
