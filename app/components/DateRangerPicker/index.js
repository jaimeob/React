/**
 *
 * DateRangerPicker
 *
 */

import React from 'react';
import T from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { compose } from 'redux';
import espanol from 'moment/src/locale/es';
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import { DateRangePicker } from 'react-dates';
import './styles.css';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '100%',
    maxWidth: '100%',
    width: '100%',
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
    isOutsideRangeProxy,
    id,
    label,
    paddingRight,
    paddingLeft,
    requerido,
    campoValido,
    selectRange,
  } = props;

  return (
    <React.Fragment>
      <FormControl>
        <Typography 
          style=
            {
              {
                fontSize: 11,
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                paddingTop: 12,
                paddingRight,
                paddingLeft,
              }
            }
        >
          {label}
        </Typography>
      </FormControl>
      <div
        style={
          {
            width: '100%',
          }
        }
      >
        <DateRangePicker
          startDate={fecInicio}
          startDateId={`daterangerpicker1${id}`} 
          endDate={fecFin} 
          endDateId={`daterangerpicker12${id}`}
          onDatesChange={onChangeFechaProxy}
          focusedInput={fechaInput}
          onFocusChange={onFechaInputProxy(id)}
          numberOfMonths={1}
          selectRange
          showClearDates
          small
          isOutsideRange={!isOutsideRange ? undefined : isOutsideRangeProxy(false)}
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
        <FormHelperText
          style={{color: !campoValido ? 'red' : 'gray'}}
        >
          {requerido ? '*Requerido' : ''}
        </FormHelperText>
      </div>
    </React.Fragment>
  );
}

DateRangerPicker.propTypes = {
  fecInicio: T.object,
  fecFin: T.object,
  fechaInput: T.string,
  label: T.string,
  isOutsideRange: T.bool,
  isOutsideRangeProxy: T.func,
  onFechaInputProxy: T.func,
  onChangeFechaProxy: T.func,
  id: T.number,
  paddingRight: T.number,
  paddingLeft: T.number,
  requerido: T.bool,
  campoValido: T.bool,
  selectRange: T.bool,
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
    isOutsideRangeProxy: () => (band) => () => band,
    onChangeFechaProxy: (props) => (e) => {
      const {
        onChangeFecha,
      } = props;
      onChangeFecha(e.startDate,e.endDate);
    },
  })
)(DateRangerPicker);
