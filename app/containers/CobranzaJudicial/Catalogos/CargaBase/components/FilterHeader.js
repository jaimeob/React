import React from 'react';
import PropTypes from 'prop-types';
import { 
  withStyles,
  TextField,
  MenuItem,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Select,
  Input,
  InputLabel,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { uniqueId } from 'lodash';

const stylesFilterHeader = () => ({
  root: {
    
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
  container: {
  },
  labelRoot: {
    fontSize: '12px !important',
  },
  inputRoot: {
    fontSize: '10px !important',
  },
});

const FilterHeader = props => {
  const {
    classes,
    propsFilterHeader: {
      data: {
        Year,
        Week,
        company:{
          companys,
          selectedCompany,
        },
        weeks: {
          weeksRetail,
          selectedWeek,
        },
      },
      function: {
        handleSelectedCompany,
        handleSelectedWeek,
      },
    },
  } = props;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1} style={{marginRight: '2rem'}}>
          <TextField
            disabled
            id="text-year"
            label="Año"
            value={Year}
            margin="normal"
            InputProps={{ classes: { root: classes.inputRoot } }}
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.labelRoot,
              },
            }}
          />
        </Grid>
        <Grid item xs={2} style={{marginRight: '2rem'}}>
          <TextField
            id="select-company"
            select
            label="Empresa"
            value={selectedCompany}
            onChange={handleSelectedCompany}
            margin="normal"
            fullWidth
            InputProps={{ classes: { root: classes.inputRoot } }}
            InputLabelProps={{
              FormLabelClasses: {
                root: classes.labelRoot,
              },
            }}
          >
            <MenuItem key="company_0" value="0" disabled>
              Seleccione
            </MenuItem>
            {companys.map(company => (
              <MenuItem 
                key={`company_${company.EmpresaId}`} 
                value={company.EmpresaId}>
                {company.Nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={3} lg={2} style={{marginTop: '.7rem'}}>
          <InputLabel htmlFor="select-week" style={{fontSize: '.84rem'}} className={classes.labelRoot}>Semana Retail</InputLabel>
          <Select
            className={classes.inputRoot}
            value={selectedWeek}
            onChange={handleSelectedWeek}
            input={<Input id="select-week" />}
            renderValue={selected => (
              selected ? `${selected.FechaInicio} - ${selected.FechaFin}` : "Seleccione"
            )}
            fullWidth
            disabled={selectedCompany === 0}
          >
            <MenuItem key="week_0" value="0" disabled>
              Seleccione
            </MenuItem>
            {weeksRetail.map(week => (
              <MenuItem 
                disableGutters
                key={uniqueId('week_month_retail')} 
                value={week}
              >
                <List>
                  <ListItem>
                    <ListItemText 
                      primary={week.SemanaRetail || week.MesRetail}
                      secondary={`${week.FechaInicio} - ${week.FechaFin}`} 
                    />
                  </ListItem>
                </List>
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3} lg={6} style={{textAlign: 'right'}}>
          <Typography 
            variant="h6" 
            style={{fontSize:'14px', paddingRight: '10px', paddingTop: '5px'}}
          >
            {
              `Semana: ${selectedWeek.SemanaRetail ? selectedWeek.SemanaRetail : Week}`
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