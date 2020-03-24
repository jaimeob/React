import React from 'react';
import PropTypes from 'prop-types';
import { 
  withStyles,
  Paper,
  Tooltip,
  IconButton,
  Divider,
  InputBase,
  Grid,
} from '@material-ui/core';

import { 
  Folder, 
  ContactSupport, 
  RemoveRedEye, 
} from "@material-ui/icons";

import { green } from '@material-ui/core/colors';

const stylesSelectFile = () => ({
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

const SelectFile = props => {
  const {
    classes,
    propsSelectFile: {
      data: {
        selectedCompany,
        selectedWeek,
        nombreArchivo,
        enabledIconViewExplotion,
      }, 
      foo: {
        handleModalContentLayout,
        fileHandler,
        openModalViewExplotion,
      },
    },
  } = props;

  let enabledFolder = false
  enabledFolder = selectedCompany === 2 ? !!selectedWeek.MesRetail : enabledFolder = !!selectedWeek.SemanaRetail

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
                    disableHoverListener={!!selectedCompany}
                    disableFocusListener={!!selectedCompany}
                    disableTouchListener={!!selectedCompany}
                  >
                    <span>
                      <IconButton 
                        className={classes.iconHelper} 
                        aria-label="ContactSupport"
                        onClick={() => handleModalContentLayout(true)}
                        disabled={selectedCompany === 0}
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
                  <label htmlFor="contained-button-file">
                    <Tooltip 
                      title="Favor de seleccionar semana retail"
                      aria-label="Favor de seleccionar semana retail"
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
                    onClick={() => openModalViewExplotion(true)}
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

SelectFile.propTypes = {
  classes: PropTypes.object,
  propsSelectFile: PropTypes.object,
}

export default withStyles(stylesSelectFile)(SelectFile)