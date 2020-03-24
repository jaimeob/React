import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Button,
  Popover,
} from '@material-ui/core';
import { FilterList, AddCircle } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

const stylesFilterTable = () => ({
  root: {},
  menuPopPup: {
    padding: '1rem',
  },
  buttonClean:{
    textTransform: 'initial',
  },
  buttonFiltrar: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
    marginLeft: '1rem',
    textTransform: 'initial',
  },
});

const statusAddCircle = (selectedCompany, selectedYear, currentYear) => {
  let result = false
  if(!selectedCompany) {
    result = true
  }
  if(selectedYear && selectedYear !== currentYear){
    result = true
  }
  return result
}

const FilterTable = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const {
    classes,
    propsFilterTable: {
      data: {
        years,
        currentYear,
        selectedCompany,
        selectedYear,
      },
      foo: {
        handleFilterList,
        handleNewNeed,
      },
    },
  } = props;
  const [year, setYear] = useState(0)
  const changeYearSelected = (event)=>{
    setYear(event.target.value)
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={10}></Grid>
        <Grid item xs={2} style={{textAlign: 'right'}}>
          <IconButton
            aria-label="FilterList"
            aria-describedby="menu-popover"
            variant="contained"
            disabled={!selectedCompany}
            onClick={handleClick}>
            <FilterList />
          </IconButton>
          <Popover
            id="menu-popover"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <Grid
              container
              className={classes.menuPopPup}>
              <Grid item xs={12}>
                <span>FILTROS</span>
                <Button
                  className={classes.buttonClean}
                  color="primary"
                  style={{marginLeft: '1rem'}}
                  disabled>
                  Limpiar
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="select-year"
                  select
                  label="Año"
                  value={ year || 0}
                  onChange={changeYearSelected}
                  margin="normal"
                  fullWidth>
                  <MenuItem key="year_0" value="0" disabled>
                    Seleccione
                  </MenuItem>
                  { years.map(y => (
                    <MenuItem
                      key={`y_${y}`}
                      value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} style={{textAlign: 'right'}}>
                <Button
                  onClick={()=>handleFilterList(year)}
                  className={classes.buttonFiltrar}>
                  <FilterList style={{marginRight: '.5rem'}}/>
                  Filtar
                </Button>
              </Grid>
            </Grid>
          </Popover>
          <IconButton
            disabled={statusAddCircle(selectedCompany, selectedYear, currentYear)}
            aria-label="AddCircle"
            onClick={() => handleNewNeed(1)}>
            <AddCircle/>
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

FilterTable.propTypes = {
  classes: PropTypes.object,
  propsFilterTable: PropTypes.object,
}

export default withStyles(stylesFilterTable)(FilterTable)
