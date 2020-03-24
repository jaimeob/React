import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  TextField,
  MenuItem,
  Typography,
  Grid,
} from '@material-ui/core';
import {
  grey,
  green,
} from '@material-ui/core/colors';
import {uniqueId} from 'lodash';

const Styles = () => ({
  paperHeader: {
    padding: '10px',
  },
  paperTable: {
    padding: '10px',
    marginTop: '10px',
    // maxHeight: 100,
  },
  textFieldYear: {
    width: 100,
    margin: '0px 10px',
  },
  textFieldCompany: {
    width: 200,
    margin: '0px 10px',
  },
  textField: {
    width: 300,
    margin: '0px 10px',
  },
  menu: {
    width: 200,
  },
  btnAccept: {
    background: green[700],
    color: "white",
    minWidth: 100,
    margin: 10,
  },
});

const topbar = props => {
  const {
    classes,
    params: {
      nombreUsuario,
      selectedPlaza,
      plazas,
    },
    foo: {
      handleChangePlazaAction,
    },
  } = props;

  const onChangeCombo = (event,option) => {
    switch (option) {
      case 'COMPANY': {
        handleChangePlazaAction(event.target.value);
        break;
      }
      default:
        break;
    }
  }

  return(
    <Grid container style={{ backgroundColor: 'white', borderRadius: 5, padding:20, border: '1px solid #e6e6e6'}}>
      <Grid item xs={12} sm={4}>
        <Grid container>
          <TextField
            id="standard-select-currency"
            select
            label="Empresas"
            className={classes.textFieldCompany}
            value={selectedPlaza}
            onChange={event => onChangeCombo(event,'COMPANY')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            InputLabelProps={{
              style: {color: 'black'},
            }}
            margin="normal"
          >
            <MenuItem key="0" value="0">
              <Typography variant="caption">
                Todas
              </Typography>
            </MenuItem>
            {plazas.map(option => (
              <MenuItem key={uniqueId('empresa_')} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Grid container justify='flex-end'>
          <Typography variant="h6" style={{fontSize: 14}}>
            {`Abogado: ${nombreUsuario}`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

const paramsProps = T.shape({
  selectedPlaza: T.number,
})

const functionList = T.shape({
  handleChangePlazaAction: T.func,
})

topbar.propTypes ={
  classes: T.object.isRequired,
  params: paramsProps,
  foo: functionList,
}

export default withStyles(Styles)(topbar);
