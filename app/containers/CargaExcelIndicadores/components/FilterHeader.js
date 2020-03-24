import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  TextField,
  MenuItem,
  Grid,
  InputLabel,
  Select,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

const stylesFilterHeader = () => ({
  root: {},
  selectFilter: {
    marginRight: '2rem',
  },
  calendarDay: {
    display: 'grid',
    marginTop: '1rem',
  },
});

const FilterHeader = props => {
  const {
    classes,
    propsFilterHeader: {
      weekCurrent = null,
      propsYear = null,
      propsPlaza = null,
      propsWeek = null,
      propsMonth = null,
      propsDay = null,
      itemsDisabled,
    },
  } = props;

  const calcWidth = () => {
    let length = 11;
    length -= propsYear ? 2 : 0;
    length -= propsPlaza ? 2 : 0;
    length -= propsWeek ? 3 : 0;
    length -= propsMonth ? 3 : 0;
    length -= propsDay ? 3 : 0;
    return length
  }

  const disabledDayCalendar = date =>
    itemsDisabled.some(item =>
      new Date(moment(item)).toDateString() === new Date(moment(date)).toDateString()
    );

  const [minDate, maxDate] = [moment().startOf('year'), moment().endOf('year')];

  return (
    <div className={classes.root}>
      <Grid container>
        { propsYear && propsYear.yearCurrent ?
          <Grid item xs={2} style={{marginRight: '1rem'}}>
            <TextField
              id="year"
              label="Año"
              disabled
              value={propsYear.yearCurrent}
              margin="normal"
              fullWidth
            >
            </TextField>
          </Grid>
          :
          null
        }
        { propsPlaza && propsPlaza.plazas.length > 0 ?
          <Grid item xs={2} style={{marginRight: '1rem'}}>
            <TextField
              id="select-plaza"
              select
              label="Plaza"
              value={propsPlaza.selectedPlaza}
              onChange={propsPlaza.handleSelectedPlaza}
              margin="normal"
              fullWidth
              InputProps={{ classes: { root: classes.inputRoot } }}
              InputLabelProps={{
                FormLabelClasses: {
                  root: classes.labelRoot,
                },
              }}
            >
              <MenuItem key="plaza_0" value="0" disabled>
                Seleccione
              </MenuItem>
              {propsPlaza.plazas.map(plaza => (
                <MenuItem
                  key={`plaza_${plaza.IdPlaza}`}
                  value={plaza.IdPlaza}>
                  {plaza.Nombre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          :
          null
        }
        { propsDay ?
          <div className={classes.calendarDay}>
            <InputLabel
              htmlFor="calendar-day"
              style={{fontSize: '.84rem', margin: 0}}
              className={classes.labelRoot}
            >
              Fecha
            </InputLabel>
            <SingleDatePicker
              date= { propsDay.selectedDay }
              focused = {propsDay.focusedDay}
              onDateChange = { propsDay.onDateChange}
              onFocusChange={ () => propsDay.onFocusChange() }
              placeholder="Seleccionar Fecha"
              id="calendar-day"
              numberOfMonths={1}
              isOutsideRange={
                date =>
                  date.isBefore(minDate) ||
                  date.isAfter(maxDate) ||
                  disabledDayCalendar(date)
              }
              showDefaultInputIcon
              readOnly
              noBorder
              keepFocusOnInput={false}
              hideKeyboardShortcutsPanel
            />
          </div>
          :
          null
        }
        { propsWeek && propsWeek.weeks.length > 0 ?
          <Grid item xs={3} style={{marginRight: '1rem', paddingTop: '7px'}}>
            <Fragment>
              <InputLabel
                htmlFor="select-week"
                style={{fontSize: '.84rem'}}
                className={classes.labelRoot}
              >
                Semana
              </InputLabel>
              <Select
                className={classes.inputRoot}
                value={propsWeek.selectedWeek}
                onChange={propsWeek.handleSelectedWeek}
                input={<Input id="select-week" />}
                renderValue={selected => (
                  selected ?
                    `${selected.FechaInicio} - ${selected.FechaFin}`
                    :
                    "Seleccione"
                )}
                fullWidth
                {...(propsPlaza && !propsPlaza.selectedPlaza ? {disabled: true} : {} )}
              >
                <MenuItem key="week_0" value="0" disabled>
                  Seleccione
                </MenuItem>
                {propsWeek.weeks.map(week => (
                  <MenuItem
                    disableGutters
                    disabled={itemsDisabled.some(m => m === week.SemanaRetail)}
                    key={week.SemanaRetail}
                    value={week}
                  >
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={week.SemanaRetail}
                          secondary={`${week.FechaInicio} - ${week.FechaFin}`}
                        />
                      </ListItem>
                    </List>
                  </MenuItem>
                ))}
              </Select>
            </Fragment>
          </Grid>
          :
          null
        }
        { propsMonth && propsMonth.months.length > 0 ?
          <Grid item xs={3} style={{paddingTop: '7px'}}>
            <Fragment>
              <InputLabel
                htmlFor="select-month"
                style={{fontSize: '.84rem'}}
                className={classes.labelRoot}
              >
                Mes
              </InputLabel>
              <Select
                className={classes.inputRoot}
                value={propsMonth.selectedMonth}
                onChange={propsMonth.handleSelectedMonth}
                input={<Input id="select-month" />}
                renderValue={selected => (
                  selected ?
                    `${selected.FechaInicio} - ${selected.FechaFin}`
                    :
                    "Seleccione"
                )}
                fullWidth
                {...(propsPlaza && !propsPlaza.selectedPlaza ? {disabled: true} : {} )}
              >
                <MenuItem key="month_0" value="0" disabled>
                  Seleccione
                </MenuItem>
                {propsMonth.months.map(month => (
                  <MenuItem
                    disableGutters
                    disabled={itemsDisabled.some(m => m === month.MesRetail)}
                    key={month.MesRetail}
                    value={month}
                  >
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={month.MesRetail}
                          secondary={`${month.FechaInicio} - ${month.FechaFin}`}
                        />
                      </ListItem>
                    </List>
                  </MenuItem>
                ))}
              </Select>
            </Fragment>
          </Grid>
          :
          null
        }
        <Grid item xs={calcWidth()} style={{textAlign: 'right', alignSelf: 'center'}}>
          <Typography
            variant="h6"
            style={{fontSize:'14px', paddingRight: '10px', paddingTop: '5px'}}
          >
            { `Semana: ${weekCurrent}` }
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

FilterHeader.propTypes = {
  classes: PropTypes.object,
  propsFilterHeader:
  PropTypes.object,
}

export default withStyles(stylesFilterHeader)(FilterHeader)
