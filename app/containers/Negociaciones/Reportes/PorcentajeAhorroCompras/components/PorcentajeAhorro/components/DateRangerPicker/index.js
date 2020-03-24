import React from 'react';
import T from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { compose } from 'redux';
import espanol from 'moment/src/locale/es';
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { DateRangePicker } from 'react-dates';
import './styles.css';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
})

function DateRangerPicker(props) {

  const {
    fecInicio,
    fecFin,
    fechaInput,
    isOutsideRange,
    onFechaInputProxy,
    onChangeFechaProxy,
    id,
    label,
    paddingRight,
    paddingLeft,
  } = props;

  return(
    <Grid
      item
      xs={6}
      sm={6}
      md={8}
      lg={8}
    >
      <Grid 
        item
        style={{paddingTop: 18, paddingRight: 8, fontSize: '8px'}}
      >
        <FormControl>
          <Typography 
            style=
              {
                {
                  fontSize: 12, 
                  fontWeight: 'bold',
                  paddingTop: 12,
                  paddingRight,
                  paddingLeft,
                }
              }
          >
            {label}
          </Typography>
        </FormControl>
        <DateRangePicker
          startDate={fecInicio}
          startDateId={`daterangerpicker1${id}`} 
          endDate={fecFin} 
          endDateId={`daterangerpicker12${id}`}
          onDatesChange={onChangeFechaProxy}
          focusedInput={fechaInput}
          onFocusChange={onFechaInputProxy(id)}
          numberOfMonths={1}
          showClearDates
          small
          isOutsideRange={isOutsideRange}
          startDatePlaceholderText="Fecha Inicio"
          endDatePlaceholderText="Fecha Fin"
          renderMonthElement={
            ({ month }) => moment(month).local('es', espanol).format('LL')
          }
          phrases={
            {
              closeDatePicker: 'Cerrar',
              clearDates: 'Limpiar',
              calendarLabel: 'Calendario',
            }
          }
          showDefaultInputIcon
        />
      </Grid>
    </Grid>
  );
}

DateRangerPicker.propTypes = {
  fecInicio: T.object,
  fecFin: T.object,
  fechaInput: T.string,
  label: T.string,
  isOutsideRange: T.func,
  onFechaInputProxy: T.func,
  onChangeFechaProxy: T.func,
  id: T.number,
  paddingRight: T.number,
  paddingLeft: T.number,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onFechaInputProxy: props => (id) => event => {
      const {
        onFechaInput,
      } = props;
      onFechaInput(id, event);
    },
    isOutsideRange: () => () => false,
    onChangeFechaProxy: (props) => (e) => {
      const {
        onChangeFecha,
      } = props;
      onChangeFecha(e.startDate,e.endDate);
    },
  }),
)(DateRangerPicker);
