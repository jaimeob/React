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
  Paper,
} from '@material-ui/core'
import {
  TrendingDown,
  TrendingFlat,
  TrendingUp,
  SaveAlt,
} from '@material-ui/icons';
import GreenColor from '@material-ui/core/colors/green'
import YellowColor from '@material-ui/core/colors/yellow'
import RedColor from '@material-ui/core/colors/red'
import { enqueueSnackbar } from 'reducers/notifications/actions'
import XLSX from 'xlsx';
// import Date from './components/picker'

import Table from './components/simpleTable'
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
    height: 40,
    color: "white",
    backgroundColor: GreenColor[500],
  },
  gridActions: {
    padding: '0rem 3rem 1rem 3rem',
  },
  backDrop: {
    backgroundColor: '#00000015',
  },
  paper: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'hidden',
  },
  paperP:{
    height: '100%',
    minHeight: '78vh',
  },
  dateRange: {
    margin: 10,
  },
});

const showTrending = value => {
  if(value > 0){
    return <TrendingUp style={{color: GreenColor[700], width: 40, height: 40}}/>
  }
  if(value < 0){
    return <TrendingDown style={{color: RedColor[700], width: 40, height: 40}}/>
  }
  return <TrendingFlat style={{color: YellowColor[700], width: 40, height: 40}}/>
}

const PorcentajeAhorro = props => {
  const {
    classes,
    params:{
      goalPorcent,
      showInfo,
      progressActive,
      columns,
      rows,
      dateStart,
      dateEnd,
      fechaInput,
    },
    actions: {
      // handleChangeDateAction,
      requestGoalPorcentSaveAction,
      handleDateClickAction,
      changeFechasAction,
    },
  } = props;

  const handleExportExcel = (FileName = 'Descarga') => {
    try{
      const header = columns.map(obj => obj.label)
      const contentExcel = []
      contentExcel.push(header)
      contentExcel.push(...rows.map(obj =>
        Object.keys(obj).filter(prop =>
          prop === 'NombrePlaza' ||
          prop === 'VsBase' ||
          prop === 'VsConvenio' ||
          prop === 'Ahorro' ||
          prop === 'PorcentAhorro' ||
          prop === 'ImporteCompra' ).map(prop =>
          obj[prop]
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
    <Paper className={classes.paperP}>
      <Grid container>
        <Grid item sm={12} style={{height: 72}}>
          <Grid container alignItems='flex-end' style={{height: '100%'}}>
            <Grid item sm={8}>
              <Grid container>
                <Grid item sm={8} style={{paddingLeft: '3rem', paddingBottom: 10}}>
                  <Grid container justify='flex-start' alignItems='flex-end'>
                    <Calendario
                      style={{marginLeft: '10'}}
                      fecInicio ={dateStart}
                      fecFin = {dateEnd}
                      fechaInput = {fechaInput}
                      onChangeFecha = {changeFechasAction}
                      onFechaInput = {handleDateClickAction}
                      id = {0}
                      paddingRight = {0}
                      paddingLeft = {0}
                    />
                  </Grid>
                </Grid>
                <Grid item sm={4}>
                  <Grid container style={{height:'100%'}} justify='flex-start' alignItems='flex-end'>
                    <Grid item sm={12}>
                      <Button
                        className={classes.buttonExport}
                        variant="contained"
                        onClick={() => requestGoalPorcentSaveAction()}
                        disabled={dateStart === null || dateEnd === null}
                      >
                        Consultar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4}>
              {showInfo &&
                <Grid container justify='flex-end' style={{paddingRight: '3rem'}}>
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Meta"
                    value={`${goalPorcent} %`}
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
        {/* {showInfo &&
          <Grid item sm={12} style={{padding: '10px 50px'}}>
            <Typography variant="h6">
              % Cumplimiento vs Meta
            </Typography>
          </Grid>
        } */}
        <Grid item sm={12} style={{padding: '0px 50px'}}>
          {showInfo &&
            <Grid container justify="center">
              {rows.map( plaza =>
                <Grid
                  className={classes.gridConteinerData}
                  item sm={4}
                  key={plaza.Id}
                >
                  <Grid container>
                    <Grid item sm={2}>
                      <Grid container alignItems="flex-end" style={{height: '100%'}}>
                        {showTrending(plaza.PorcentAhorro)}
                      </Grid>
                    </Grid>
                    <Grid item sm={8}>
                      <Typography variant="h2">
                        {`${plaza.PorcentAhorro}%`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="h6" className={classes.plaza}>
                    {plaza.NombrePlaza}
                  </Typography>
                </Grid>
              )}
            </Grid>
          }
        </Grid>
        {showInfo &&
          <Grid item sm={12} className={classes.gridTable}>
            <Table
              columns={columns}
              rows={rows}
            />
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
                onClick={() => handleExportExcel('Porcentaje_de_Ahorro_Negociaciones')}
                disabled={rows.length === 0}
              >
                <SaveAlt/>
                Exportar
              </Button>
            </Grid>
          </Grid>
        }
      </Grid>
    </Paper>
  </div>
}

const paramsProps = T.shape({
  goalPorcent: T.number,
  showInfo: T.bool,
  progressActive: T.bool,
  columns: T.array,
  rows: T.array,
  dateStart: T.object,
  dateEnd: T.object,
  fechaInput: T.string,
})

const actionList = T.shape({
  // handleChangeDateAction: T.func,
  requestGoalPorcentSaveAction: T.func,
  handleDateClickAction: T.func,
  changeFechasAction: T.func,
})

PorcentajeAhorro.propTypes = {
  classes: T.object.isRequired,
  params: paramsProps,
  actions: actionList,
}

export default withStyles(useStyles)(PorcentajeAhorro);