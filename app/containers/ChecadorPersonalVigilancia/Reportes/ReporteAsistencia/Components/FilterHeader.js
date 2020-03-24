import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  TextField,
  MenuItem,
  Grid,
  Paper,
  Button,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import SwitchCustom from 'components/SwitchCustom';

const stylesFilterHeader = () => ({
  root: {},
  paper:{
    padding: '1rem 1rem 1.5rem 1rem',
  },
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
    marginTop: '1rem',
    textTransform: 'initial',
  },
  buttonExport: {
    float: 'right',
    marginBottom: '1rem',
    marginRight: '1rem',
    marginTop: '1rem',
    textTransform: 'initial',
  },
  container: {
  },
});

const FilterHeader = props => {
  const {
    classes,
    propsFilterHeader: {
      data: {
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
        handleSelectedCompany,
        handleSelectedPlaza,
        handleChangeConcentratedState,
        onDatesChange,
        onFocusChange,
        handleReportAttendance,
      },
    },
  }=props;

  function disabledButtonGenerate(){
    return !!(selectedCompany && selectedPlaza && startDate && endDate)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container direction="row">
          <Grid item xs={2}>
            <TextField
              id="select-company"
              select
              label="Empresa"
              value={selectedCompany}
              onChange={handleSelectedCompany}
              fullWidth
            >
              <MenuItem key="company_0" value="0" disabled>
              Seleccione
              </MenuItem>
              <MenuItem key="company_TODOS" value="-1">
                TODOS
              </MenuItem>
              { companys.map(company => (
                <MenuItem
                  key={`company_${company.EmpresaId}`}
                  value={company.EmpresaId}>
                  {company.Nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={2} style={{marginLeft:'1rem'}}>
            <TextField
              id="select-plaza"
              select
              label="Plazas"
              value={selectedPlaza}
              onChange={handleSelectedPlaza}
              fullWidth
            >
              <MenuItem key="plaza_0" value="0" disabled>
                Seleccione
              </MenuItem>
              <MenuItem key="plaza_TODOS" value="-1">
                TODOS
              </MenuItem>
              {plazas.map(plaza => (
                <MenuItem
                  key={`plaza_${plaza.IdPlaza}`}
                  value={plaza.IdPlaza}>
                  {plaza.Nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3} style={{marginLeft: '1rem', marginTop: '.93rem'}}>
            <DateRangePicker
              startDate={ startDate }
              startDateId="your_unique_start_date_id"
              endDate={ endDate }
              endDateId="your_unique_end_date_id"
              onDatesChange={ onDatesChange }
              focusedInput={ focusedInput }
              onFocusChange={ onFocusChange }
              numberOfMonths={1}
              showClearDates
              small
              startDatePlaceholderText="Fecha Inicio"
              endDatePlaceholderText="Fecha Fin"
              phrases={
                {
                  closeDatePicker: 'Cerrar',
                  clearDates: 'Limpiar',
                  calendarLabel: 'Calendario',
                }
              }
              showDefaultInputIcon
              isOutsideRange={()=> false}
              hideKeyboardShortcutsPanel
            />
          </Grid>
          <Grid item xs={2} style={{paddingTop:'.5rem', marginLeft:'1rem'}}>
            <SwitchCustom
              checked={concentrated}
              onChange={handleChangeConcentratedState}
              label="Concentrado"/>
          </Grid>
          <Grid item xs={1} >
            <Button
              disabled={!disabledButtonGenerate()}
              variant="contained"
              className={classes.buttonSuccess}
              onClick={handleReportAttendance}
            >
              Generar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

FilterHeader.propTypes = {
  classes: PropTypes.object,
  propsFilterHeader: PropTypes.object,
}

export default withStyles(stylesFilterHeader)(FilterHeader)
