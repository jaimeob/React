import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import 'moment/src/locale/es';
import { uniqueId } from 'lodash';
import { SingleDatePicker  } from 'react-dates';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './styles.css'

const getMuiTheme = () =>
  createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    overrides: {
      DateInput:{
        fontSize:'12px !important',
      },
      DateInput_input:{
        fontSize:'12px !important',
      },
      SingleDatePickerInput_calendarIcon: {
        padding:'0px',
        border: '0px solid #dbdbdb',
        margin:0,
        fontSize:'11px !important',
      },
      Button:{
        padding:0,
        margin:0,
        fontSize: '13px',
      },

    },
  })

class DayPickerSingleDate extends React.Component {

  state = {
    focused : false,
  }
  
  

  render() {
    const { 
      row,
      cell,
      valor,
      padre,
      onChangeDate,
    } = this.props;

    const today = new Date(valor).toUTCString();
    const formato2 = moment(today).utcOffset(-120)
    const fecha = formato2.utcOffset(-120)

    return (
      <div>
        <MuiThemeProvider theme={getMuiTheme}>
          <SingleDatePicker
            date={fecha} // momentPropTypes.momentObj or null
            onDateChange={onChangeDate(row,cell)}
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })}
            id={uniqueId('date_picker_')}
            isOutsideRange={() => false}
            numberOfMonths = {1}
            readOnly
            showDefaultInputIcon
            noBorder
            disabled={padre}
            className='datepicker'
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

DayPickerSingleDate.propTypes = {
  onChangeDate:   T.func,
  row:            T.number,
  cell:           T.number,
  padre:          T.bool,
  valor:          T.object,
};

export default DayPickerSingleDate;