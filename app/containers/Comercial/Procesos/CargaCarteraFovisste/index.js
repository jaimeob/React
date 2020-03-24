/**
 *
 * CargaCarteraFovisste
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
import {
  withStyles,
  Paper,
  Grid,
} from '@material-ui/core';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import Spinner from 'components/Spinner';
// import { green } from '@material-ui/core/colors';
import Appbar from 'components/Appbar';
import{ DAEMON }from'utils/constants';
import moment from 'moment';
import espanol from 'moment/src/locale/es';
import makeSelectCargaCarteraFovisste from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import FileHeader from "../../components/FilterHeader";
import FileSelection from "../../components/FileSelection";
import LoadListGeneral from "../../components/LoadListGeneral";
import ModalLayout from "../../components/ModalLayout";
import ModalLoadDetails from "../../components/ModalLoadDetails";
import { LIST_HEADERS } from './store/constants';
const styles = () => ({
  paperRoot: {
    margin: '.5rem',
    padding: '.5rem 1rem .5rem 1rem',
    minHeight: '75vh',
  },
});

const errorsLayout= []

export class CargaCarteraFovisste extends Component {
  componentDidMount() {
    const {
      actions: {
        initialConfigurationAction,
      },
    } = this.props;
    initialConfigurationAction();
  }

  handleSelectedWeek = (e) => {
    const {
      actions: {
        setSelectedWeekAction,
      },
    } = this.props;
    setSelectedWeekAction(e.target.value);
  }

  handleSelectedMonth = (e) => {
    const {
      actions: {
        setSelectedMonthAction,
      },
    } = this.props;
    setSelectedMonthAction(e.target.value);
  }

  handleSelectedPlaza = (e) => {
    const {
      actions: {
        setSelectedPlazaAction,
      },
    } = this.props;
    setSelectedPlazaAction(e.target.value);
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
      },
      enqueueSnackbar: enqueueSnackbarAction,
      cargaCarteraFovisste: {
        backend:{
          layout:{
            content,
          },
        },
      },
    } = this.props;

    const columsRequired = content && content.length > 0 ? content[0].Content.map(cont => cont.Column) : [];
    const headers = content && content.length > 0 ? content[0].Content : [];
    setIconViewExplotionAction(false)
    const rowsExplotion = []
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
            if (workbook.Strings.length) {
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
                if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);
                columsContent.push(hdr);
              }
              if (!excelRows.length) {
                enqueueSnackbarAction({
                  message: 'Archivo sin información.',
                  options: { variant: 'warning' },
                })
              } else {
                const columsContentLowerCase = columsContent.map(col => col.toLocaleLowerCase().trim())
                validatedColumns = this.validateColumnRequired(columsRequired, columsContentLowerCase)
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
                  rowsExplotion.push(...excelRows)
                  // Si hay celdas no existentes  vacias las llena con espacio
                  columsContentLowerCase.forEach(col => {
                    rowsExplotion.forEach(row => {
                      if(!Object.keys(row).some(r => r === col)) {
                        Object.assign(row, { [col] : '' })
                      }
                    })
                  })
                  validatedDataType = this.validateDataTypes(excelRows, headers)
                  if(validatedDataType.result){
                    setIconViewExplotionAction(true)
                    setFileLoadAction({
                      cols: headers.map(head => ({ ...head, Column: head.Column.toLowerCase()})),
                      rows: rowsExplotion,
                      name: fileObj.name,
                      size: fileObj.size,
                    })
                    validatedFileAction(true)
                  } else {
                    enqueueSnackbarAction({
                      message: validatedDataType.msjError,
                      options: { variant: 'warning' },
                    })
                    setFileLoadAction({
                      cols: [],
                      rows: [],
                      name: '',
                      size: 0,
                    })
                    validatedFileAction(false)
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

  validateColumnRequired = ( columsRequired = [], columnsContent = []) => {
    const response = {
      result: false,
      errorsColumns: [],
      msjError: '',
    };
    const required = columsRequired.map(col =>  col.toLocaleLowerCase().trim())
    const content = columnsContent.map(col => col.toLocaleLowerCase().trim())
    if(content.length !== required.length) {
      response.msjError = 'Cantidad de columnas incorrectas, favor de consultar ayuda.'
    }else{
      required.forEach(cont => {
        if(!content.some(req => req === cont)) response.errorsColumns.push(cont)
      })
      if(response.errorsColumns.length > 0) {
        response.msjError = `Las siguientes columnas no coinciden "${response.errorsColumns}", favor de consultar ayuda.`
      }else{
        response.result = true
      }
    }
    return response
  }

  addErrorDataType = (idxRow, column, value) => {
    if(errorsLayout.some(error => error.row === idxRow)){
      errorsLayout[idxRow].cell.push(
        { column,
          value,
        })
    }else{
      errorsLayout.push({
        row: idxRow,
        cell: [
          {
            column,
            value,
          }],
      })
    }

  }

  handleExportLayout = () => {
    const {
      cargaCarteraFovisste: {
        backend:{
          layout: {
            content,
            layoutName,
          },
        },
        frontend:
        {
          ui: {
            selectedMonth: {
              MesRetail,
              AnioRetail,
            },
          },
        },
      },
    } = this.props;
    const headers = content && content.length > 0 ? content[0].Content.map(cont => cont.Column) : [];
    const rows = content.map(dt => dt.Content.map(cont => cont.Value))
    this.handleDownloadExcel(
      headers,
      rows,
      `${AnioRetail}-${MesRetail}-${layoutName}`,
    )
  }

  handleDownloadExcel = ( headers = [], rows = [], layoutName = 'Descarga') => {
    const {
      enqueueSnackbar: enqueueSnackbarAction,
    } = this.props ;
    if (rows && rows.length) {
      try{
        const data = [
          headers,
          ...rows,
        ]
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
        XLSX.writeFile(wb, layoutName.concat('.xlsx'));

      }catch(err){
        enqueueSnackbarAction({
          message: 'Ocurrio un problema al descargar, favor de comunicarse con Soporte.',
          options: { variant: 'error' },
        })
      }
    }else{
      enqueueSnackbarAction({
        message: 'No existe información para descargar, favor de verificar.',
        options: { variant: 'error' },
      })
    }
  }

  handleSave = () => {
    const {
      actions: {
        setLoadedIndicatorsAction,
      },
      cargaCarteraFovisste: {
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

  directionCell = (value) =>{
    const alignDefault = 'left'
    const directions = [
      {
        type: ['date', 'int'],
        align: 'center',
      },
      {
        type: ['varchar'],
        align: 'left',
      },
      {
        type: ['money', 'percent'],
        align: 'right',
      },
    ]
    value = value ? value.toLowerCase(): value
    const result = directions.find( items => items.type.some( item => item === value))
    return result ? result.align : alignDefault
  }

  transformValue = (type, value) =>{
    let result = ''
    switch (type) {
      case 'int':
        if (typeof value === 'undefined') {
          value = 0;
        } else {
          value = parseInt(value, 10);
        }
        result = value
        break;
      case 'percent':
        if (typeof value === 'undefined') {
          value = 0;
        } else{
          value = parseFloat(value).toLocaleString('es-MX', { style:'percent', minimumFractionDigits: 0, maximumFractionDigits: 4})
        }
        result = value;
        break;
      case 'nuemeric':
        if (typeof value === 'undefined') {
          value = 0.00;
        } else {
          value = parseFloat(value).toLocaleString('es-MX', { style:'currency', currency:'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
        result = value;
        break;
      default:
        if (typeof value === 'undefined') {
          value = "";
        } else {
          value = value.toString().toUpperCase();
        }
        result = value;
        break;
    }
    return result
  }

  validateDataTypes = (rows, headers) => {
    const response = {
      result: true,
      errorsLayout: [],
      msjError: '',
      rows: [],
    }
    response.rows = rows.map((row, idxRow) => {
      Object.keys(row).forEach((cell, idxCell) => {
        const type = headers[idxCell].Type
        const column = (headers[idxCell].Column).toLowerCase()
        let typeDate = ''
        let value = row[column]
        let [day, month, year] = ''
        let fullDate = ''
        switch (type) {
          case 'int':
          case 'numeric':
          case 'percent':
            // eslint-disable-next-line no-restricted-globals
            if (typeof value === 'undefined') { // devuelve true
              row[column] = 0;
            }
            if(typeof value === 'string'){
              row[column] = Number(value.replace(',', ''));
            }
            if(typeof value === 'string' && value.includes('.')){
              row[column] = Number(value);
            }
            // eslint-disable-next-line no-restricted-globals
            if(isNaN(Number(value))){
              this.addErrorDataType(idxRow, column, value)
            }
            break;
          case 'varchar':
            // eslint-disable-next-line no-restricted-globals
            if (typeof value === 'undefined') { // devuelve true
              row[column] = " ";
            }
            try{
              row[column].toString()
            }catch(err){
              this.addErrorDataType(idxRow, column, value)
            }
            break;
          case 'date':
            if (typeof value === 'undefined') { // devuelve true
              row[column] = " ";
            }
            try {
              if(value instanceof Date) {
                if(value.toLocaleDateString() === 'Invalid Date'){
                  this.addErrorDataType(idxRow, column, value)
                }
              } else if(value){
                [day, month, year] = value.split('/')
                if (day && month && year) {
                  fullDate = `${year}/${month}/${day}`
                  typeDate = new Date(fullDate);
                  if(typeDate.toLocaleDateString() === 'Invalid Date') {
                    this.addErrorDataType(idxRow, column, value)
                  }
                }else{
                  this.addErrorDataType(idxRow, column, value)
                }
              } else {
                this.addErrorDataType(idxRow, column, value)
              }
            } catch (err) {
              if(!value) value = 'SIN INFORMACIÓN'
              this.addErrorDataType(idxRow, column, value)
            }
            break;
          default:
            this.addErrorDataType(idxRow, column, value)
            break;
        }
        value = '';
      });
      return row;
    })

    if(errorsLayout.length > 0) {
      response.result = false
      response.errorsLayout = errorsLayout
      response.msjError = 'Uno o más celdas cuenta con datos corruptos'
    }
    return response
  }

  render() {
    const {
      classes,
      cargaCarteraFovisste: {
        backend:{
          currentDate: {
            Year: yearCurrent,
            Week: weekCurrent,
          },
          months = [],
          layout,
          listGeneral,
        },
        frontend: {
          ui: {
            selectedMonth = null,
            modalContentLayout = false,
            modalLoadDetails = false,
            iconViewExplotion = false,
          },
          fileLoad: { cols, rows, name },
          periodicity,
        },
      },
    } = this.props;

    const propsFileHeader = {
      propsYear: { yearCurrent },
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
        selectedMonth,
        nombreArchivo: name,
        enabledIconViewExplotion: iconViewExplotion,
      },
      foo: {
        handleModalContentLayout: this.handleModalContentLayout,
        handleModalLoadDetails: this.handleModalLoadDetails,
        fileHandler: this.fileHandler,
      },
    }
    const propsLoadListGeneral = {
      data: {
        periodicity,
        headers: LIST_HEADERS,
        rows: listGeneral,
      },
      foo: {
        directionCell: this.directionCell,
      },
    }
    const propsModalLayout = {
      data: {
        modalContentLayout,
        layout,
      },
      foo: {
        handleModalContentLayout: this.handleModalContentLayout,
        handleExportLayout: this.handleExportLayout,
        directionCell: this.directionCell,
        transformValue: this.transformValue,
      },
    }

    const propsModalLoadDetails = {
      data: {
        modalLoadDetails,
        cols, rows,
      },
      foo: {
        handleModalLoadDetails: this.handleModalLoadDetails,
        handleSave: this.handleSave,
        directionCell: this.directionCell,
        transformValue: this.transformValue,
      },
    }

    return (
      <div>
        <Helmet>
          <title>CargaCarteraFovisste</title>
          <meta
            name="description"
            content="Description of CargaCarteraFovisste"
          />
        </Helmet>
        <Spinner />
        <Appbar texto="Carga Cartera Fovisste"></Appbar>
        { modalContentLayout ? <ModalLayout propsModalLayout={propsModalLayout} /> : null }
        { modalLoadDetails ? <ModalLoadDetails propsModalLoadDetails={propsModalLoadDetails} /> : null }
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

CargaCarteraFovisste.propTypes = {
  enqueueSnackbar: PropTypes.func,
  actions: PropTypes.object,
  classes: PropTypes.object,
  cargaCarteraFovisste: PropTypes.object,
  usuarioGlobal: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  cargaCarteraFovisste: makeSelectCargaCarteraFovisste(),
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

const withReducer = injectReducer({ key: 'cargaCarteraFovisste', reducer });
const withSaga = injectSaga({ key: 'cargaCarteraFovisste', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(CargaCarteraFovisste);
