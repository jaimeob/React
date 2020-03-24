/* eslint-disable react/prefer-stateless-function */
import React, { Fragment } from 'react';
import T from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles,MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  uniqueId,
} from 'lodash';
import { 
  Select,
  InputBase,
  Icon,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  LinearProgress,
} from '@material-ui/core';
import {
  ProgressBar,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import DateRangerPicker from '../../../../components/DateRangerPicker';
import styled from 'styled-components';
// import GlobalStyle from '../../global-styles';
// import Calendario from "components/DateRangerPicker";
import DayPickerSingleDate from '../DayPickerSingleDate/index';
import './styles.css';
const styles = theme => ({
  checkbox: {
    padding:'0px !important',
  },
  input: {
    display: 'none',
  },
  textField:{
    textAlign:'center',
  },
  formControl:{
    width: '100%',
  },
  marginProgress: {
    // margin: theme.spacing(1),
  },
  progress:{
    height:'40%',
    width:'100%',
   
    borderRadius: '25px',
    // '&:nth-child(1)': {
    //   backgroundColor:'#28950f',
    // },
  },
})

const getMuiTheme = () =>
  createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    overrides: {
      DateInput:{
        fontSize:'14px',
      },
      MuiInputBase: {
        root:{
          fontSize:'14px',
        },
        fontSize:'14px',
        input: {
          textAlign:'center',
          fontSize:'14px',
        },
      },
    },
  })

// const BorderLinearProgress = withStyles({
//   root: {
//     height: 10,
//     backgroundColor:'#ff6c5c',
//     // backgroundColor: lighten('#ff6c5c', 0.5),
//   },
//   bar: {
//     borderRadius: 20,
//     backgroundColor: '#ff6c5c',
//   },
// })(LinearProgress);

// const ProgressBar2 = styled.ProgressBar2`
//   background-color:'#28950f';
// `;

class TipoComponente extends React.Component{
  
  render(){
    const {
      classes,
      padre,
      valor,
      tipo,
      row,
      cell,
      valorFecha,

      onChangeInputBase,
      onFechaInput,
      onChangeFecha,
      fechaValida,
      fecInicio,
      fecFin,
      fecInput,
      deshabilitar,
      onChangeValue,
      onChangeDate,
      validarOnChange,
    } = this.props

    switch (tipo) {
      case 7:
        return (
          <Fragment>
            <DayPickerSingleDate
              onChangeDate={onChangeDate}
              row={row}
              cell={cell}
              valor={valorFecha}
              padre={padre}
            />
          </Fragment>
        )
      
      case 1 :
        return (
          <Fragment>
            <InputBase
              // id={uniqueId('tipo_input_base_')}
              disabled={deshabilitar}
              className={classes.textField}
              // startAdornment={padre ? <Icon>arrow_right</Icon> : null}
              value={valor === null || valor === undefined ? '': valor}
              onChange={onChangeValue(row)}
              style={{
                fontSize: padre ? '12px' : '11px',
                fontWeight: padre ? 'bold': null,
                // paddingLeft: item[0].padding,
              }}
              inputProps={{ 
                'aria-label': 'bare',
                name: 'Dependencia',
                id: uniqueId('dependencia_'),
              }}
            />
          </Fragment>
        )

      case 4:
        return (
          <Fragment>
            <FormControl className={classes.formControl}>
              {/* <InputLabel htmlFor="age-simple">Age</InputLabel> */}
              <Select
                value={valor}
                onChange={onChangeValue(row)}
                inputProps={{
                  name: 'Recurso',
                  id: uniqueId('recurso_'),
                }}
              >
                <MenuItem value={10}>Alexis</MenuItem>
                <MenuItem value={20}>Jaime</MenuItem>
                <MenuItem value={30}>Rosario</MenuItem>
              </Select>
            </FormControl>
          </Fragment>
        )
      
      case 5: return(
        <Fragment
        >
          <input
            accept="image/*"
            className={classes.input}
            id="botonCargarArchivo"
            multiple
            type="file"
          />
          <label htmlFor="botonCargarArchivo">
            <Icon>
              cloud_upload
            </Icon>
          </label>
        </Fragment>
      )
      case 8: return (
        <Fragment
        >
          {/* <div 
            className="meter"
            >
            <span style="width: 25%"></span>
          </div> */}
          <ProgressBar
            className={classes.progress}
            animated
            striped
            // class='progressBar'
            variant="success"
            now={valor}
            label={`${valor}%`}
          />
          {/* <BorderLinearProgress
            className={classes.marginProgress}
            variant="determinate"
            color="secondary"
            value={50}
            valueBuffer={75}
          /> */}
        </Fragment>
      )
      case 9: return (
        <Fragment>
          <InputBase
            // id={uniqueId('tipo_input_base_')}
            disabled={deshabilitar}
            className={classes.textField}
            // startAdornment={padre ? <Icon>arrow_right</Icon> : null}
            value={valor === null || valor === undefined ? '': valor}
            onChange={validarOnChange(row)}
            style={{
              fontSize: padre ? '12px' : '11px',
              fontWeight: padre ? 'bold': null,
              // paddingLeft: item[0].padding,
            }}
            inputProps={{ 
              'aria-label': 'bare',
              name: 'Dependencia',
              id: uniqueId('dependencia_'),
            }}
          />
        </Fragment>
      )
    
      default:
        return null;
    }
  }
}

TipoComponente.propTypes = {
  tipo:               T.number,
  classes:            T.object,
  padre:              T.bool,
  valor:              T.string,
  valorFecha:         T.object,
  row:                T.number,
  cell:               T.number,
  onChangeInputBase:  T.func,
  onChangeDate:       T.func,
  onChangeFecha:      T.func,
  fechaValida:        T.bool,
  fecInicio:          T.object,
  fecFin:             T.object,
  fecInput:           T.string,

  onChangeValue:      T.func,
};

export default compose(
  withStyles(styles),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      // onChangeDate: (row, cell) => result => {
      //   dispatch({
      //     type: 'APP/CONTAINER/PLANDETRABAJO/LB_ON_CHANGE_DATE_ACTION',
      //     row,
      //     cell,
      //     result,
      //   })
      // },
      onChangeDate: (row, cell) => result => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_CAMBIAR_VALOR_FECHAS_ACTION',
          row,
          cell,
          result,
        })
      },
      onChangeValue: row => event => {
        const {
          name,
          value,
        } = event.target;

        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_ONCHANGE_VALUE_ACTION',
          name,
          value,
          row,
        })
      },
      validarOnChange: (row) => (event) =>{
        const {
          name,
          value,
        } = event.target;
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/LB_ONCHANGE_VALUE_DEPENDENCIA_ACTION',
          row,
          name,
          value,
        })
      },


    }))
)(TipoComponente);