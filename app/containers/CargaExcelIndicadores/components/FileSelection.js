import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Paper, Grid, Tooltip, IconButton, Divider, InputBase,
} from '@material-ui/core';
import { ContactSupport, Folder, RemoveRedEye } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
const stylesFilterSelection = () => ({
  root: {
    marginTop: '1rem',
  },
  paper: {
    padding: '1.5rem',
  },
  subtitle: {
    marginBottom: '.5rem',
    paddingLeft: '.2rem',
    fontSize: 16,
  },
  iconButtonPadding: {
    padding: 10,
  },
  containerIconHelper:{
    margin: '0 .7rem 0 .5rem',
  },
  iconHelper:{
    '&:hover': {
      color: '#42a5f5',
    },
  },
  iconFile:{
    padding: 10,
    '&:hover': {
      color: '#ffc107',
    },
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
    marginTop: '1rem',
  },
  buttonError: {
    backgroundColor: '#FF0023',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
  },
  buttonExport: {
    float: 'right',
    marginBottom: '1rem',
    marginRight: '1rem',
    marginTop: '1rem',
  },
  buttonClass: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  spacing: [0,2,3,5,8],
  card: {
    padding: '.5rem',
  },
  container: {
  },
  enabledIconViewExplotion: {
    color: 'green',
  },
});

const FilterSelection = props => {
  const {
    classes,
    propsFilterSelection: {
      data: {
        selectedPlaza = null,
        selectedMonth = null,
        selectedWeek = null,
        selectedDay = null,
        nombreArchivo,
        enabledIconViewExplotion,
        currentTypeLoad,
      },
      foo: {
        handleModalContentLayout,
        fileHandler,
        handleModalLoadDetails,
      },
    },
  } = props;

  let enabledFolder = false;
  let enabledHelper = false;
  const enabledButtonsIcons = () => {
    if (selectedPlaza && selectedMonth && !!selectedMonth.MesRetail) {
      enabledFolder = true
      enabledHelper = true
    } else if (selectedMonth && !!selectedMonth.MesRetail && currentTypeLoad !== 3) {
      enabledFolder = true
      enabledHelper = true
    } else if (selectedWeek && !!selectedWeek.SemanaRetail) {
      enabledFolder = true
      enabledHelper = true
    } else if (selectedDay) {
      enabledFolder = true
      enabledHelper = true
    }
  }

  enabledButtonsIcons();

  // let enabledFolder = false
  // enabledFolder = !!selectedMonth.MesRetail


  return (
    <div className={classes.root}>
      <h3 className={classes.subtitle}>Selección de archivo</h3>
      <Paper className={classes.paper}>
        <Grid container >
          <Grid item xs={12} md={7} lg={5}>
            <Paper>
              <Grid container alignContent='center' alignItems='center'>
                <Grid item xs={2} md={1} lg={1} className={classes.containerIconHelper}>
                  <Tooltip
                    title="Ayuda de Layout"
                    aria-label="Ayuda de Layout"
                    disableHoverListener={enabledHelper}
                    disableFocusListener={enabledHelper}
                    disableTouchListener={enabledHelper}
                  >
                    <span>
                      <IconButton
                        className={classes.iconHelper}
                        aria-label="ContactSupport"
                        onClick={() => handleModalContentLayout(true)}
                        disabled={!enabledHelper}
                      >
                        <ContactSupport />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={6} md={8} lg={8}>
                  <input
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    style={{display:"none"}}
                    id="contained-button-file"
                    multiple
                    type="file"
                    disabled={!enabledFolder}
                    onChange={fileHandler}
                    value=""
                    title="Seleccionar Archivo"
                    aria-label="Seleccionar Archivo"
                  />
                  <label htmlFor="contained-button-file" style={{marginBottom: 0}}>
                    <Tooltip
                      title="Favor de seleccionar fecha"
                      aria-label="Favor de seleccionar fecha"
                      disableHoverListener={enabledFolder}
                      disableFocusListener={enabledFolder}
                      disableTouchListener={enabledFolder}
                    >
                      <span>
                        <IconButton
                          component="span"
                          className={classes.iconFile}
                          aria-label="Folder"
                          {...(!enabledFolder ? {disabled: true} : {} )}
                        >
                          <Folder />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </label>
                  <InputBase
                    className={classes.input}
                    placeholder={nombreArchivo || 'Sin archivo...'}
                    disabled
                  />
                </Grid>
                <Divider className={classes.divider} />
                <Grid item xs={2} md={1} lg={1}>
                  <IconButton
                    className={`
                      ${classes.icon}
                      ${enabledIconViewExplotion ? classes.enabledIconViewExplotion : null}
                    `}
                    disabled={!enabledIconViewExplotion}
                    aria-label="RemoveRedEye"
                    onClick={() => handleModalLoadDetails(true)}
                  >
                    <RemoveRedEye />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

FilterSelection.propTypes = {
  classes: PropTypes.object,
  propsFilterSelection: PropTypes.object,
}

export default withStyles(stylesFilterSelection)(FilterSelection)
