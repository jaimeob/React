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
import { SingleDatePicker } from 'react-dates';
import './styles.css';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '100%',
    maxWidth: '100%',
    width: '100%',
  },
})

class DatePicker extends React.PureComponent {
  state = {
    focused : false,
  }

  render(){
  
    const {
      fecha,
      idPosition,
      label,
      onDateChange,
      disabled,
    } = this.props;

    return (
      <React.Fragment>
        <div
          style={
            {
              width: '100%',
            }
          }
        >
          <SingleDatePicker
            noBorder
            date={fecha}
            onDateChange={(e) => onDateChange(idPosition, e)}
            focused={this.state.focused}
            numberOfMonths={1}
            disabled={disabled}
            onFocusChange = {({ focused }) => this.setState({ focused })}
            id={idPosition}
            renderMonthElement={
              ({ month }) => moment(month).local('es', espanol).format('LL')
            }
            showDefaultInputIcon
            placeholder={label}
            phrases={
              {
                closeDatePicker: 'Cerrar',
                clearDates: 'Limpiar',
                calendarLabel: 'Calendario',
              }
            }
          />
          <div
            style={{borderBottom: '1px solid rgba(0, 0, 0, 0.42)'}}>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

DatePicker.propTypes = {
  fecha: T.object,
  label: T.string,
  onDateChange: T.func,
  idPosition: T.number,
  disabled: T.bool,
};

export default compose(
  withStyles(styles),
)(DatePicker);
