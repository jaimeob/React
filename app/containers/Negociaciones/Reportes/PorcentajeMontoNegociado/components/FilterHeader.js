import React from 'react';
import PropTypes from 'prop-types';
import { 
  withStyles,
  TextField,
  MenuItem,
  Grid,
  Typography,
} from '@material-ui/core';
import { startCase } from 'lodash'

const stylesFilterHeader = () => ({
  root: {
    paddingLeft: '1rem',
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
        family:{
          familys,
          familySelected,
        },
        percentTotal,
      },
      function: {
        handleSelectedPlaza,
        handleSelectedFamily,
      },
    },
  } = props;
  
  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid 
          item 
          xs={2} 
        >
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
        <Grid item xs={4}></Grid>
        <Grid 
          item 
          xs={2}
        >
          <TextField
            id="select-familias"
            select
            label="Familias"
            value={familySelected}
            onChange={handleSelectedFamily}
            margin="normal"
            fullWidth
          >
            <MenuItem key="fam_0" value="0" disabled>
              Seleccionar Familia
            </MenuItem>
            {familys.map(family => (
              <MenuItem 
                key={`fam_${family.Id}`} 
                value={family.Id}>
                {startCase(family.Nombre)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4} style={{textAlign: 'right'}}>

          <Typography 
            variant="h2" 
            style={{paddingRight: '10px', paddingTop: '5px'}}
          >
            { 
              percentTotal ? 
                percentTotal.toLocaleString('es-MX', { style:'percent'}) 
                : 
                null
            }
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