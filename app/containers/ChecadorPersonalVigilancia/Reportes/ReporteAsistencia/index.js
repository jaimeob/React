/**
 *
 * ReporteAsistencia
 *
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { DAEMON } from 'utils/constants';
import moment from 'moment';
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
import Appbar from 'components/Appbar';
import JSZip from 'jszip'
import makeSelectReporteAsistencia from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import FilterHeader from './Components/FilterHeader';
import FilterTable from './Components/FilterTable';
import ReportList from './Components/ReportList';
import { REPORT_LIST } from './store/constants';


const styles = () => ({
  paperRoot: {
    margin: '.5rem',
    padding: '.5rem',
    minHeight: '75vh',
  },
  container: {
    padding: '.5rem',
  },
  title: {
    textTransform: 'capitalize',
  },
})

export class ReporteAsistencia extends Component {
  componentDidMount() {
    const {
      actions: {
        getCompanysAction,
        getCurrentDateAction,
        getPlazasAction,

      },
    }= this.props;
    getCompanysAction()
    getCurrentDateAction()
    getPlazasAction()
  }

  handleSelectedCompany = event => {
    const {
      target: {
        value: companySelectedValue,
      },
    } = event;
    const {
      actions:{
        setSelectedCompanyAction,
        setEmptyAttendanceAction,
      },
      reporteAsistencia:{
        backend:{
          attendance,
        },
      },
    }=this.props;
    setSelectedCompanyAction(companySelectedValue)
    if(attendance.length > 0) setEmptyAttendanceAction()
  }

  handleSelectedPlaza = event => {
    const {
      target: {
        value: plazaSelectedValue,
      },
    } = event;
    const {
      actions:{
        setSelectedPlazaAction,
        setEmptyAttendanceAction,
      },
      reporteAsistencia:{
        backend:{
          attendance,
        },
      },
    }=this.props;
    setSelectedPlazaAction(plazaSelectedValue)
    if(attendance.length > 0) setEmptyAttendanceAction()
  }

  /* Inicia Funciones del componente Fechas */
  onDatesChange = (event) => {
    const {
      actions: {
        setStartDateAction,
        setEndDateAction,
        setEmptyAttendanceAction,
      },
      reporteAsistencia:{
        backend:{
          attendance,
        },
      },
    } = this.props;
    setStartDateAction(event.startDate)
    setEndDateAction(event.endDate)
    if(attendance.length > 0) setEmptyAttendanceAction()
  }

  onFocusChange = (event) => {
    const {
      actions: {
        setFocusedInputAction,
      },
    } = this.props;
    setFocusedInputAction(event)
  }
  /* Finaliza fcunciones del componente Fechas */

  handleChangeConcentratedState = () => {
    const {
      actions:{
        setConcentratedStatusAction,
        setEmptyAttendanceAction,
      },
      reporteAsistencia:{
        frontend:{
          ui:{
            concentrated,
          },
        },
        backend:{
          attendance,
        },
      },
    }=this.props;
    setConcentratedStatusAction(!concentrated)
    if(attendance.length > 0) setEmptyAttendanceAction()
  }

  handleReportAttendance = () => {
    const {
      actions:{
        getAttendanceAction,
      },
      reporteAsistencia:{
        frontend:{
          ui:{
            selectedCompany,
            selectedPlaza,
            concentrated,
            startDate,
            endDate,
          },
        },
      },
    }=this.props;
    getAttendanceAction(
      selectedCompany,
      selectedPlaza,
      concentrated ? 1 : 0,
      moment(startDate).format('YYYY-MM-DD'),
      moment(endDate).format('YYYY-MM-DD')
    )
  }


  handleSelectAllClick = event => {
    const {
      actions:{
        setSelectedAllAction,
      },
    }=this.props;
    setSelectedAllAction(event.target.checked)
  }

  handleSelectAttendance = event => {
    const {
      actions:{
        setSelectedAttendanceAction,
      },
    }=this.props;
    setSelectedAttendanceAction(event.target.value)
  }

  handleGenerateZip = (alone=0) => {
    const zip = new JSZip();
    const misCabeceras = new Headers();
    const miInit = { method: 'GET',
      headers: misCabeceras,
      mode: 'cors',
      cache: 'default' };

    const {
      reporteAsistencia:{
        backend:{
          attendance,
        },
      },
    }=this.props;
    const files = []
    if(!alone){
      attendance.forEach( attend => {
        if(attend.Selected){
          const file = JSON.parse(attend.Archivo)
          if(file.length > 0) {
            file.forEach(f => files.push(f))
          }
        }
      })
    }else{
      attendance.forEach( attend => {
        if(attend.Id === alone){
          const file = JSON.parse(attend.Archivo)
          if(file.length > 0) {
            file.forEach(f => files.push(f))
          }
        }
      })
    }
    async function request(file, idxFile) {
      const response = await fetch(file.ruta, miInit);
      const miBlob = await response.blob();
      return zip.file(`${idxFile}_${file.nombre}`, miBlob);
    }
    Promise.all(files.map((file, idxFile) => request(file, idxFile)))
      .then(()=> {
        zip.generateAsync({
          type: "nodebuffer",
        })
          .then( content => {
            const blob = new Blob([content])
            const btnDownloadZip = document.createElement('a')
            btnDownloadZip.href = URL.createObjectURL(blob)
            btnDownloadZip.setAttribute('download', 'Evidencias.zip')
            btnDownloadZip.click()
          });
      })
  }

  handleExportExcel = () => {
    const {headers} = REPORT_LIST
    const {
      enqueueSnackbar: enqueueSnackbarAction,
      reporteAsistencia: {
        backend:{
          attendance,
          currentDate:{
            Day,
            Month,
            Year,
          },
        },
      },
    } = this.props ;
    const FileName = `ReporteDeAsistencias_${Year}${Month}${Day}`
    const Headers = headers.map(head => head.name)
    const Rows = []
    attendance.forEach( attend => {
      const row = []
      Headers.map( head => row.push(attend[head]) )
      Rows.push(row)
    })

    if (Rows && Rows.length) {
      try{
        const data = [
          Headers,
          ...Rows,
        ]
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'ReporteDeAsistencias');/* add worksheet to workbook */
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

  render() {
    const {
      classes,
      reporteAsistencia:{
        backend:{
          companys,
          plazas,
          attendance,
          currentDate:{
            Year,
          },
        },
        frontend:{
          ui:{
            selectedYear,
            selectedCompany,
            selectedPlaza,
            concentrated,
            focusedInput,
            startDate,
            endDate,
          },
          archiveZip,
        },
      },
    }=this.props;

    const propsFilterHeader = {
      data: {
        Year,
        selectedYear,
        concentrated,
        plaza:{
          plazas,
          selectedPlaza,
        },
        company:{
          companys,
          selectedCompany,
        },
        dates: {
          focusedInput,
          startDate,
          endDate,
        },
      },
      foo: {
        handleSelectedCompany: this.handleSelectedCompany,
        handleSelectedPlaza: this.handleSelectedPlaza,
        handleChangeConcentratedState: this.handleChangeConcentratedState,
        onDatesChange: this.onDatesChange,
        onFocusChange: this.onFocusChange,
        handleReportAttendance: this.handleReportAttendance,
      },
    }
    const propsFilterTable = {
      data:{
        company:{
          companys,
          selectedCompany,

        },
        attendance,
        archiveZip,
      },
      foo:{
        handleDownload: this.handleDownload,
        handleExportExcel: this.handleExportExcel,
        handleGenerateZip: this.handleGenerateZip,
      },
    }

    const propsReportList = {
      data:{
        attendance,
      },
      foo:{
        handleSelectAllClick: this.handleSelectAllClick,
        handleSelectAttendance: this.handleSelectAttendance,
        handleGenerateZip: this.handleGenerateZip,
      },
    }

    return (
      <div>
        <Helmet>
          <title>ReporteAsistencia</title>
          <meta name="description" content="Description of ReporteAsistencia" />
        </Helmet>
        <Spinner />
        <Appbar texto="Reporte de Asistencias" />
        <Paper className={classes.paperRoot}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              <FilterHeader
                propsFilterHeader={propsFilterHeader}/>
              <FilterTable
                propsFilterTable={propsFilterTable}/>
              <ReportList
                propsReportList={propsReportList}/>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

ReporteAsistencia.propTypes = {
  enqueueSnackbar: PropTypes.func,
  actions: PropTypes.object,
  classes: PropTypes.object,
  reporteAsistencia: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  reporteAsistencia: makeSelectReporteAsistencia(),
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

const withReducer = injectReducer({ key: 'reporteAsistencia', reducer });
const withSaga = injectSaga({ key: 'reporteAsistencia', saga, mode:DAEMON });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(ReporteAsistencia);
