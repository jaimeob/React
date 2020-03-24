import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  TextField,
  MenuItem,
  Typography,
  Grid,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const stylesFilterHeader = () => ({
  root: {},
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
  container: {
  },

});

const FilterHeader = props => {
  const {
    classes,
    propsFilterHeader: {
      data: {
        Year,
        selectedYear,
        company:{
          companys,
          selectedCompany,
        },
      },
      foo: {
        handleSelectedCompany,
      },
    },
  }=props;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <TextField
            id="select-company"
            select
            label="Empresa"
            value={selectedCompany}
            onChange={handleSelectedCompany}
            margin="normal"
            fullWidth>
            <MenuItem key="company_0" value="0" disabled>
            Seleccione
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
        <Grid item xs={6}></Grid>
        <Grid item xs={3} style={{textAlign: 'right'}}>
          <Typography variant="h6" style={{paddingRight: '10px', paddingTop: '5px'}}>
            { `Año: ${ selectedYear || Year }` }
          </Typography>
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
