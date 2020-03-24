import React from 'react';
import T from 'prop-types';
import {
  Typography,
  Grid,
  TextField,
  withStyles,
  Button,
  CircularProgress,
  Dialog,
} from '@material-ui/core'
import {
//   TrendingDown,
//   TrendingFlat,
//   TrendingUp,
  SaveAlt,
} from '@material-ui/icons';
import GreenColor from '@material-ui/core/colors/green'
// import YellowColor from '@material-ui/core/colors/yellow'
// import RedColor from '@material-ui/core/colors/red'
import { enqueueSnackbar } from 'reducers/notifications/actions'
import XLSX from 'xlsx';

import Table from './components/simpleTable'
import ModalDetail from './components/modalDetail';
import Calendario from './components/DateRangerPicker'

const useStyles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  gridTable: {
    padding: 50,
  },
  gridConteinerData:{
    paddingTop: 40,
  },
  plaza: {
    paddingLeft: 40,
  },
  buttonExport: {
    width: 120,
    color: "white",
    backgroundColor: GreenColor[500],
    height: 40,
  },
  gridActions: {
    padding: '0px 50px',
  },
  backDrop: {
    backgroundColor: '#00000015',
  },
  paper: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'hidden',
  },
});

const PorcentajeAhorro = props => {
  const {
    classes,
    params:{
      goal,
      showInfo,
      progressActive,
      openDetail,
      columns,
      rows,
      dateStart,
      dateEnd,
      dateInput,
      columnsM,
      rowsM,
    },
    actions: {
      requestGoalDaysAction,
      requestDaysAverageDetailAction,
      handleCloseDetailAction,
      changeFechasAction,
      handleDateClickAction,
    },
  } = props;

  const checkFulfillGoal = obj => obj.CumpleMeta === 1 ? 'SI' : 'NO'

  const handleExportExcel = (FileName = 'Descarga') => {
    try{
      const header = columns.map(obj => obj.label)
      const contentExcel = []
      contentExcel.push(header)
      contentExcel.push(...rows.map(obj =>
        Object.keys(obj).filter(prop =>
          prop === 'Nombre' ||
          prop === 'Promedio' ||
          prop === 'CumpleMeta' ).map(prop =>
          prop === 'CumpleMeta' ? checkFulfillGoal(obj) : obj[prop]
        )
      ))
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.aoa_to_sheet(contentExcel);
      XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');/* add worksheet to workbook */
      XLSX.writeFile(wb, FileName.concat('.xlsx'))/* write workbook */
    }catch(err){
      enqueueSnackbar({
        message: 'Ocurrio un problema al descargar, favor de comunicarse con Soporte.',
        options: { variant: 'error' },
      })
    }
  }

  const plusAverage = () => {
    let plus = 0.00;
    if (rows.length > 0){
      rows.forEach(row => {plus += row.Promedio})
      return (plus/rows.length).toFixed(2);
    }
    return plus;

  }

  const showDetail = IdEmpleado => {
    requestDaysAverageDetailAction(IdEmpleado)
  }

  return <div>
    <Dialog
      open={progressActive}
      BackdropProps={{
        classes: { root: classes.backDrop },
      }}
      PaperProps={{
        classes: { root: classes.paper },
      }}
    >
      <CircularProgress
        color="secondary"
        size={60}
      />
    </Dialog>
    <ModalDetail
      open={openDetail}
      columns={columnsM}
      rows={rowsM}
      columnsP={columns}
      onClickLeave={() => handleCloseDetailAction()}
    />
    <Grid container>
      <Grid item sm={12} style={{height: 72}}>
        <Grid container alignItems='flex-end' style={{height: '100%'}}>
          <Grid item sm={6}>
            <Grid container justify='center'>
              <Grid item sm={10}>
                <Calendario
                  fecInicio ={dateStart}
                  fecFin = {dateEnd}
                  fechaInput = {dateInput}
                  onChangeFecha = {changeFechasAction}
                  onFechaInput = {handleDateClickAction}
                  id = {0}
                  paddingRight = {0}
                  paddingLeft = {4}
                />
              </Grid>
              <Grid item sm={2}>
                <Button
                  className={classes.buttonExport}
                  variant="contained"
                  onClick={() => requestGoalDaysAction()}
                  disabled={dateStart === null || dateEnd === null}
                >
                  Consultar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {showInfo &&
            <Grid item sm={6}>
              <Grid container justify='center'>
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Meta"
                  value={`${goal} Dias`}
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
            </Grid>
          }
        </Grid>
      </Grid>
      {showInfo &&
        <Grid item sm={12} className={classes.gridTable}>
          <Table
            columns={columns}
            rows={rows}
            showActions
            onClickDetail={showDetail}
          />
        </Grid>
      }
      {showInfo &&
        <Grid item sm={12}>
          <Typography variant="body2" style={{padding: '0 50px'}}>
            {`Promedio Departamento: ${plusAverage()}`}
          </Typography>
        </Grid>
      }
      {showInfo &&
        <Grid item sm={12}>
          <Grid
            container
            justify="flex-end"
            className={classes.gridActions}
          >
            <Button
              className={classes.buttonExport}
              variant="contained"
              onClick={() => handleExportExcel('Dias_Promedio_Negociaciones')}
              disabled={rows.length === 0}
            >
              <SaveAlt/>
              Exportar
            </Button>
          </Grid>
        </Grid>
      }
    </Grid>
  </div>
}

const paramsProps = T.shape({
  goal: T.number,
  showInfo: T.bool,
  progressActive: T.bool,
  openDetail: T.bool,
  columns: T.array,
  rows: T.array,
  dateStart: T.object,
  dateEnd: T.object,
  dateInput: T.string,
  columnsM: T.array,
  rowsM: T.array,
})

const actionList = T.shape({
  handleChangeDateAction: T.func,
  requestGoalDaysAction: T.func,
  requestDaysAverageDetailAction: T.func,
  handleCloseDetailAction: T.func,
  changeFechasAction: T.func,
  handleDateClickAction: T.func,
})

PorcentajeAhorro.propTypes = {
  classes: T.object.isRequired,
  params: paramsProps,
  actions: actionList,
}

export default withStyles(useStyles)(PorcentajeAhorro);