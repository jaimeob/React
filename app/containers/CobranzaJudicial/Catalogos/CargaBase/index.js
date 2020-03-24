/**
 *
 * CargaBase
 *
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import withNotifier from 'components/HOC/withNotifier';
import XLSX from 'xlsx';
import { 
  withStyles,
  Grid,
  Paper,
  // Button,

} from '@material-ui/core';
import moment from 'moment';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import Spinner from 'components/Spinner';
import { green } from '@material-ui/core/colors';
import espanol from 'moment/src/locale/es';
import Appbar from 'components/Appbar';
import { DAEMON } from 'utils/constants';
import makeSelectCargaBase from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import FilterHeader from './components/FilterHeader';
import SelectFile from './components/SelectFile';
import ComanyLayout from './components/CompanyLayout';
import CargaBaseModal from './components/CargaBaseModal';
import ListadoArchivos from './components/ListadoArchivos';

const styles = () => ({
  paperRoot: {
    margin: '.5rem',
    padding: '.5rem',
    minHeight: '75vh',
  },
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
  },
  buttonExport: {
    float: 'right',
    marginBottom: '1rem',
    marginRight: '1rem',
  },
  container: {
    padding: '.5rem',
  },
})

let errorsLayout= []

export class CargaBase extends Component {
  componentDidMount() {
    const {
      actions: {
        getCurrentDateAction,
        // getWeeksRetailAction,
        getCompanysAction,
        setIconViewExplotionAction,
      },
    } = this.props;
    getCurrentDateAction()
    // getWeeksRetailAction()
    getCompanysAction()
    setIconViewExplotionAction({enabled : false})
  }
  
  handleSelectedCompany = (event) => {
    
    const {
      target: {
        value: companySelectedValue,
      },
    } = event;
    const {
      actions: {
        setCompanySelectedAction,
        getWeeksRetailAction, 
      },
  
    } = this.props;
    setCompanySelectedAction(companySelectedValue)
    getWeeksRetailAction(companySelectedValue)
  }

  handleSelectedWeek = (event) => {
    const {
      target: {
        value: weekSelectedValue,
      },
    } = event;
    const {
      actions: {
        setWeekSelectedAction,
        
      },
    } = this.props;

    setWeekSelectedAction(weekSelectedValue)
  }

  onDatesChange = (event) => {
    const {
      actions: {
        setStartDateAction,
        setEndDateAction,
      },
    } = this.props;
    setStartDateAction(event.startDate)
    setEndDateAction(event.endDate)
  }

  onFocusChange = (event) => {
    const {
      actions: {
        setFocusedInputAction,
      },
    } = this.props;
    setFocusedInputAction(event)
  }

  handleModalContentLayout = (modalContentLayout) => {
    const {
      actions: {
        setModalContentLayoutAction,
      },
    } = this.props;
  
    setModalContentLayoutAction(modalContentLayout);
  }

  handleExportarExcel = (selected) => {
    const {
      actions: {
        getExportarExcelAction,
      },
      cargaBase: {
        frontend: {
          ui: {
            selectedCompany,
          },
        },
      },
    } = this.props;

    getExportarExcelAction({ idBaseCobranza: selected[0], selectedCompany });
  }

  handlePostFile = () => {
    const {
      cargaBase:{
       
        frontend:{
          fileLoad: {
            cols,
            name,
            rows,
          },
          ui: {
            selectedCompany,
            selectedWeek: {
              AnioRetail,
              MesRetail,
              SemanaRetail,
            },
          },
        },
      },
      actions:{
        postFileAction,
      },
    } = this.props;
  
    const datosGuardar = {
      base: {
        nombreArchivo: name,
        idEmpresa: selectedCompany,
        anio: AnioRetail,
        mesRetailId: MesRetail,
        semanaRetailId: SemanaRetail,
      },
      cols,
      rows,
    };
    postFileAction(datosGuardar); 
  }

  openModalViewExplotion = (modalCargaBase) => {
    const {
      actions: {
        setModalCargaBaseAction,
      },
    } = this.props;
    setModalCargaBaseAction(modalCargaBase);
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
      cargaBase: {
        backend:{
          datasources:{
            layout:{
              columsRequired,
            },
          },
        },
      },
    } = this.props;
    setIconViewExplotionAction({enabled : false})
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
                  validatedDataType = this.validateDataTypes(excelRows)
                  // console.log('validatedDataType',validatedDataType);
                  if(validatedDataType.result){
                    setIconViewExplotionAction({enabled : true})
                    setFileLoadAction({
                      cols: columsRequired,
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
    console.log('columnsContent',columnsContent);
    console.log('columsRequired',columsRequired);
    console.log('columnsContent.length',columnsContent.length);
    console.log('columsRequired.length',columsRequired.length);
    if(columnsContent.length !== columsRequired.length) {
      response.msjError = 'Cantidad de columnas incorrectas, favor de consultar ayuda.'
    }else{
      /*
      columnsContent.forEach(cont => {
        if(!columsRequired.some(req => req === cont)) response.errorsColumns.push(cont)
      }) */
      columsRequired.forEach(cont => {
        if(!columnsContent.some(req => req === cont)) response.errorsColumns.push(cont)
      })
      if(response.errorsColumns.length > 0) {
        response.msjError = `Las siguientes columnas no coinciden "${response.errorsColumns}", favor de consultar ayuda.`
      }else{
        response.result = true
      }
    }
    return response
  }

  validateDataTypes = (rows) => {
    const {
      enqueueSnackbar: enqueueSnackbarAction,
      cargaBase: {
        frontend: {
          ui: {
            companyLayout: {
              cabeceras, 
            },
          },
        },
      },
    } = this.props;
   
    const response = {
      result: true,
      errorsLayout: [],
      msjError: '',
    }
    errorsLayout = [];
   
    rows.forEach((row, idxRow) => {
      Object.keys(row).forEach((cell, idxCell) => {
        const type = cabeceras[idxCell].TipoDato
        const column = cabeceras[idxCell].Column
        let typeDate = ''
        let value = row[column.toLowerCase()] // rows[idxRow][cell]
        let [day, month, year] = ''
        let fullDate = ''
        
        if(column.toLowerCase() === 'estatus'){
          if(value.toLowerCase() !== 'extrajudicial' && value.toLowerCase() !== 'judicial'){
            enqueueSnackbarAction({
              message: 'Favor de poner tipo cartera JUDICIAL O EXTRAJUDICIAL',
              options: { variant: 'error' },
            })
            this.addErrorDataType(idxRow, column, value)
            return;
          }
        }

        switch (type) {
          case 'int':
          case 'money':
          case 'percent':
            // eslint-disable-next-line no-restricted-globals
            // x no fue declarada antes
            if (typeof value === 'undefined') { // devuelve true
              value=0;
            }
            
            if(typeof value === 'string'){
              value = Number(value.replace(',', ''));
            }

            if(typeof value === 'string' && value.includes('.')){
              value = Number(value);
            }
            
            // eslint-disable-next-line no-restricted-globals
            if(isNaN(Number(value))){
              this.addErrorDataType(idxRow, column, value)
            }

            break;
          case 'varchar':
            try{
              value.toString()
            }catch(err){
              // console.log('varchar','column',column,'idxRow',idxRow,'type',type,'value',value);
              this.addErrorDataType(idxRow, column, value)
            }
            break;
          case 'date':
            try {  
              if(value instanceof Date) {
                
                if(value.toLocaleDateString() === 'Invalid Date'){
                  // console.log('date','column',column,'idxRow',idxRow,'type',type,'value',value);
                  this.addErrorDataType(idxRow, column, value)
                } 
                
              } else{
                if(typeof value !== 'undefined')
                {
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
                } 
              }
            } catch (err) {
              if(!value) value = 'SIN INFORMACIÓN'
              
              this.addErrorDataType(idxRow, column, value)
            }
            break;
          default:
            // this.addErrorDataType(idxRow, column, value)
            break;
        }
        value = ''
      })
    })
    
    if(errorsLayout.length > 0) {
      response.result = false
      response.errorsLayout = errorsLayout
      // console.log(response);
      response.msjError = 'Uno o más celdas cuenta con datos corruptos'
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
      cargaBase: {
        backend:{
          datasources: {
            companys,
          },
        },
        frontend: {
          ui:{
            selectedCompany,
            companyLayout: {
              cabeceras,
              contenido,
            },
          },
        },
      },
    } = this.props;
    const companySelected = companys.find(company => company.EmpresaId === selectedCompany)
    const NombreArchivo = `LAYOUT_${companySelected.Nombre}`

    this.handleDownloadExcel(
      cabeceras.map( head => head.Column),
      contenido.map( content => content.map(cont => cont.Value)),
      NombreArchivo
    )
  }

  handleDownloadExcel = ( Columns = [], Rows = [], FileName = 'Descarga') => {
    const {
      enqueueSnackbar: enqueueSnackbarAction,
    } = this.props ;
    if (Rows && Rows.length) {  
      try{
        const data = [
          Columns, 
          ...Rows,
        ]
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');/* add worksheet to workbook */
        XLSX.writeFile(wb, FileName.concat('.xlsx'))/* write workbook */
        
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

  directionCell = (value) =>{
    const alignDefault = 'left'
    const directions = [
      {
        type: ['date'],
        align: 'center',
      },
      {
        type: ['varchar', 'int'],
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
        result = value
        break;
      case 'percent':
        result = parseFloat(value).toLocaleString('es-MX', { style:'percent', minimumFractionDigits: 0, maximumFractionDigits: 4})
        break;
      case 'money':
        result = parseFloat(value).toLocaleString('es-MX', { style:'currency', currency:'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2})
        break;
      default:
        result = value.toString().toLocaleUpperCase()
        break;
    }
    return result
  }

  render() {
    const {
      classes,
      cargaBase: rdxStore,
      permisos,
    } = this.props;
    
    const { 
      backend: {
        datasources: {
          companys,
          currentDate: {
            Year,
            Week,
          },
          weeksRetail,
        },
      },
      frontend: {
        ui: {
          selectedCompany,
          selectedWeek,
          modalContentLayout,
          companyLayout,
          modalCargaBase,
          listadoArchivosMes,
        },
        iconViewExplotion: {
          enabled,
        },
        fileLoad: {
          name,
        },
      },
    } = rdxStore;

    const propsFilterHeader = {
      data: {
        Year,
        Week,
        company:{
          companys,
          selectedCompany,
        },
        weeks: {
          weeksRetail,
          selectedWeek,
        },
      },
      function: {
        handleSelectedCompany: this.handleSelectedCompany,
        handleSelectedWeek: this.handleSelectedWeek,
        onDatesChange: this.onDatesChange,
        onFocusChange: this.onFocusChange,
      },
    }
    
    const propsSelectFile = {
      data: {
        selectedCompany,
        selectedWeek,
        nombreArchivo: name,
        enabledIconViewExplotion: enabled,

      }, 
      foo: {
        handleModalContentLayout: this.handleModalContentLayout,
        openModalViewExplotion: this.openModalViewExplotion,
        fileHandler: this.fileHandler,
      },
    }
    const propsCompanyLayout = {
      data: {
        modalContentLayout,
        companyLayout,
      },
      foo: {
        handleModalContentLayout: this.handleModalContentLayout,
        handleExportLayout: this.handleExportLayout,
        directionCell: this.directionCell,
        transformValue: this.transformValue,
      },
    }
    const propsCargaBaseModal = {
      data: {
        fileLoad: this.props.cargaBase.frontend.fileLoad,
        modalCargaBase,
        companyLayout,
      }, 
      foo: {
        openModalViewExplotion: this.openModalViewExplotion,
        handlePostFile: this.handlePostFile,
        directionCell: this.directionCell,
      },
    }

    const propsListadoArchivos = {
      data: {
        rows: listadoArchivosMes,
        idFila: 'IdBaseCobranza',
        headRows:[
          { id: 'IdBaseCobranza', numeric: false, disablePadding: true, label: '#' },
          { id: 'NombreArchivo', numeric: false, disablePadding: true, label: 'Nombre del Archivo' },
          { id: 'NombreEmpleado', numeric: false, disablePadding: true, label: 'Empleado' },
          { id: 'FechaCreacion', numeric: false, disablePadding: true, label: 'Fecha' },
        ],
      },
      foo: {
        handleExportarExcel: this.handleExportarExcel,
      },
    }
    return (
      <div>
        <Helmet>
          <title>CargaBase</title>
          <meta name="description" content="Description of CargaBase" />
        </Helmet>
        <Spinner/>
        <Appbar 
          texto='Carga Base'
        />
        <Paper className={classes.paperRoot}>
          <Grid
            container
            className={classes.container}
          >
            <Grid item xs={12}>
              <FilterHeader 
                propsFilterHeader={propsFilterHeader}
              />
            </Grid>
            {
              permisos.especiales.cargararchivos === 1 ? (
                <Grid item xs={12}>
                  <SelectFile 
                    propsSelectFile={propsSelectFile}
                  />
                </Grid>
              ) : null
            }
            {
              listadoArchivosMes.length > 0 ? <ListadoArchivos propsListadoArchivos={propsListadoArchivos} permisos={permisos} /> : null
            }
          </Grid>
        </Paper>
        <ComanyLayout propsCompanyLayout={propsCompanyLayout} />
        {
          modalCargaBase && <CargaBaseModal propsCargaBaseModal={propsCargaBaseModal} permisos={permisos}/>
        }
      </div>
    );
  }
}

CargaBase.propTypes = {
  enqueueSnackbar: PropTypes.func,
  actions: PropTypes.object,
  classes: PropTypes.object,
  cargaBase: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  cargaBase: makeSelectCargaBase(),
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

const withReducer = injectReducer({ key: 'cargaBase', reducer });
const withSaga = injectSaga({ key: 'cargaBase', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(CargaBase);