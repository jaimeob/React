import React from 'react';
import T from 'prop-types';
import {
  Grid,
  TextField,
  MenuItem,
  withStyles,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  Paper,
} from '@material-ui/core';
import {
  TrendingDown,
  TrendingFlat,
  TrendingUp,
} from '@material-ui/icons';
import GreenColor from '@material-ui/core/colors/green'
import YellowColor from '@material-ui/core/colors/yellow'
import RedColor from '@material-ui/core/colors/red'
import IndigoColor from '@material-ui/core/colors/indigo'
import GreyColor from '@material-ui/core/colors/grey'

const useStyles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  gridLeft: {
    paddingLeft: 100,
  },
  gridRight: {
    paddingRight: 100,
  },
  gridUnder: {
    padding: 100,
  },
  // contentGridUnder: {
  //   padding: 100,
  // },
  gridConteinerData:{
    paddingTop: 40,
  },
  button: {
    color: "white",
    backgroundColor: IndigoColor[500],
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

const showTrending = value => {
  if(value > 0){
    return <TrendingUp style={{color: GreenColor[700], width: 30, height: 30}}/>
  }
  if(value < 0){
    return <TrendingDown style={{color: RedColor[700], width: 30, height: 30}}/>
  }
  return <TrendingFlat style={{color: YellowColor[700], width: 30, height: 30}}/>
}

const generalScreen = props => {
  const {
    classes,
    params: {
      years,
      yearSelected,
      porcentImpact,
      generalFamily,
      generalData,
      progressActive,
    },
    onChangeYear,
    onClickDetail,
  } = props

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
    <Paper>
      <Grid container direction='row'>
        <Grid item sm={12}>
          <Grid container>
            <Grid item sm={6} className={classes.gridLeft}>
              <Grid container justify="flex-start">
                <TextField
                  id="standard-select-currency"
                  select
                  label="Año"
                  className={classes.textField}
                  value={yearSelected}
                  onChange={event => onChangeYear(event.target.value)}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  <MenuItem key="0" value="0" disabled>
                    <Typography style={{color: GreyColor[500]}}>
                      Seleccione el Año
                    </Typography>
                  </MenuItem>
                  {years.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item sm={6} className={classes.gridRight}>
              {yearSelected !== 0 &&
                <Grid container justify="flex-end">
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="% de Impacto"
                    value={`${porcentImpact} %`}
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} className={classes.gridUnder}>
          {yearSelected !== 0 &&
            <Grid container>
              {generalFamily.map( fam => 
                <Grid
                  className={classes.gridConteinerData}
                  item sm={4}
                  key={fam.Clave}
                >
                  {Object.keys(generalData).some(prop => prop === fam.Clave) ?
                    <div>
                      <Typography variant="h6">
                        {fam.Nombre}
                      </Typography>
                      <Grid container>
                        <Grid item sm={1}>
                          <Grid container alignItems="flex-end" style={{height: '100%'}}>
                            {showTrending(generalData[fam.Clave].Porcentaje)}
                          </Grid>
                        </Grid>
                        <Grid item sm={8}>
                          <Typography variant="h2">
                            {`${generalData[fam.Clave].Porcentaje}%`}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Typography variant="subtitle2" style={{marginRight: 5}}>
                          Conv. Anterior:
                        </Typography>
                        <Typography variant="caption">
                          {`$${generalData[fam.Clave].Anterior}`}
                        </Typography>
                      </Grid>
                      <Grid container>
                        <Typography variant="subtitle2" style={{marginRight: 5}}>
                          Conv. Actual:
                        </Typography>
                        <Typography variant="caption">
                          {`$${generalData[fam.Clave].Actual}`}
                        </Typography>
                      </Grid>
                      <Grid container>
                        <Typography variant="subtitle2" style={{marginRight: 5}}>
                          Diferencia:
                        </Typography>
                        <Typography variant="caption">
                          {`$${generalData[fam.Clave].Diferencia}`}
                        </Typography>
                      </Grid>
                      {fam.Id !== -1 &&
                      <Grid container justify="center">
                        <Button
                          className={classes.button}
                          variant="contained"
                          size="small"
                          onClick={() => onClickDetail(fam.Id, fam.Nombre)}
                        >
                          Ver detalle
                        </Button>
                      </Grid>
                      }
                    </div>
                    :
                    <div>
                      <Typography variant="h6">
                        {fam.Nombre}
                      </Typography>
                      <Grid container>
                        <Grid item sm={1}>
                          <Grid container alignItems="flex-end" style={{height: '100%'}}>
                            {showTrending(0.00)}
                          </Grid>
                        </Grid>
                        <Grid item sm={8}>
                          <Typography variant="h1">
                            {`${0.00}%`}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Typography variant="subtitle2" style={{marginRight: 5}}>
                          Conv. Anterior:
                        </Typography>
                        <Typography variant="caption">
                          {`$${0.00}`}
                        </Typography>
                      </Grid>
                      <Grid container>
                        <Typography variant="subtitle2" style={{marginRight: 5}}>
                          Conv. Actual:
                        </Typography>
                        <Typography variant="caption">
                          {`$${0.00}`}
                        </Typography>
                      </Grid>
                      <Grid container>
                        <Typography variant="subtitle2" style={{marginRight: 5}}>
                          Diferencia:
                        </Typography>
                        <Typography variant="caption">
                          {`$${0.00}`}
                        </Typography>
                      </Grid>
                    </div>
                  }
                </Grid>
              )}
            </Grid>
          }
        </Grid>
      </Grid>
    </Paper>
  </div>
};

const generalScreenParams = T.shape({
  years: T.array,
  yearSelected: T.number,
  porcentImpact: T.number,
  generalFamily: T.array,
  generalData: T.shape({
    ObraBlanca: T.shape({
      Porcentaje: T.number,
      Anterior: T.number,
      Actual: T.number,
      Diferencia: T.number,
    }),
    ObraNegra: T.shape({
      Porcentaje: T.number,
      Anterior: T.number,
      Actual: T.number,
      Diferencia: T.number,
    }),
    TotalEdificacion: T.shape({
      Porcentaje: T.number,
      Anterior: T.number,
      Actual: T.number,
      Diferencia: T.number,
    }),
  }),
  progressActive: T.bool,
})

generalScreen.propTypes = {
  classes: T.object.isRequired,
  params: generalScreenParams,
  onChangeYear: T.func,
  onClickDetail: T.func,
}

export default withStyles(useStyles)(generalScreen);