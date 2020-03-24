import React from 'react';
import PropTypes from 'prop-types';
import { 
  withStyles,
  TextField,
  MenuItem,
  Grid,
  Button,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

const stylesFilterHeader = () => ({
  root: {
    paddingLeft: '1rem',
  },
  datePicker: {
    marginTop: '1rem', 
    marginRight: '1rem',
  },
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
    marginTop: '1rem',
  },
  buttonExport: {
    float: 'right',
    marginBottom: '1rem',
    marginRight: '1rem',
    marginTop: '1rem',
  },
});

const FilterHeader = props => {
  const {
    classes,
    propsFilterHeader: {
      data: {
        plaza: {
          plazas,
          plazaSelected,
        },
        dates: {
          focusedInput,
          startDate,
          endDate,
        },
      },
      function: {
        handleSelectedPlaza,
        handleGetCompilancePercentage,
        onDatesChange,
        onFocusChange,
      },
    },
  } = props;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2} style={{marginRight: '2rem'}}>
          <TextField
            id="select-plaza"
            select
            label="Plaza"
            value={plazaSelected}
            onChange={handleSelectedPlaza}
            margin="normal"
            fullWidth
          >
            <MenuItem key="plaza_0" value="0" disabled>
              Seleccionar Plaza
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
        <Grid item xs={4} style={{marginTop: '1.5rem'}}>        
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
        <Grid item xs={2}>
          <Button
            variant="contained" 
            aria-label="CloudDownload" 
            disabled={ 
              !startDate 
                || 
              plazaSelected === 0 
                ||
              !endDate
            }
            onClick={handleGetCompilancePercentage}
            className={`${classes.buttonSuccess} ${classes.buttonExport}`}
          > 
            Consultar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}


FilterHeader.propTypes = {
  classes: PropTypes.object,
  propsFilterHeader: PropTypes.object,
}

export default withStyles(stylesFilterHeader)(FilterHeader)