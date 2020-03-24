/*
  Configuración Formulario / Index
*/

import React, { // eslint-disable-line
  Fragment,
} from 'react';
import T from 'prop-types';
import Grey from '@material-ui/core/colors/grey';
import {
  withStyles,
  withTheme,
} from '@material-ui/core/styles';

import {
  compose,
} from 'recompose';
// MATERIAL UI DEPENDENCIES
import {
  TextField,
  Grid,
  Button,
  Typography,
  Paper,
  IconButton,
  Icon,
  Tooltip,
  Fade,
  Hidden,
  withWidth,
  LinearProgress,
} from '@material-ui/core';
import { noop } from 'redux-saga/utils';

// RELATIVE IMPORTS
import LayoutFormulario from './componentes/LayoutFormulario';
import PanelProperties from './componentes/PanelPropiedades';

const InfoText = () => (
  <Typography variant="caption" gutterBottom>
    Validando nombre del formulario
  </Typography>
);

/* (STL) */
const styles = (theme) => ({
  appbar: {
    backgroundColor: Grey[200],
  },
  toolbarTitle: {
    ...theme.mixins.toolbar,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  paper: { 
    maxWidth: 520,
    maxHeight: 600,
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  editor: {
    margin: theme.spacing.unit,
  },
  rightContainer: {
    padding: `0px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit,
      display: 'none',
    },
  },
  growItem: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  topRow: {
    margin: `${theme.spacing.unit}px 0`,
    paddingBottom: 16,
    [theme.breakpoints.down('sm')]: {
      margin: `${theme.spacing.unit * 2}px 0`,
    },
  },
  topButtons: {
    margin: `0px ${theme.spacing.unit * 2}px`,
    padding: `4px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit,
    },
  },
  bottomButtons: {
    margin: `0px ${theme.spacing.unit * 2}px`,
    padding: `4px ${theme.spacing.unit * 3}px`,
  },
  bottomButtonsEdited: {
    margin: `0px ${theme.spacing.unit}px`,
    padding: `4px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.down('sm')]: {
      marginTop: 8,
    },
  },
  leftPannelTitle: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
  },
  rightBottom: {
    alignSelf: 'flex-end',
  },
  iconContainer: {
    padding: theme.spacing.unit,
    border: `1px solid ${Grey[300]}`,
    alignSelf: 'center',
    marginBottom: theme.spacing.unit,
    justifyContent: 'center',
  },
  IconBClsRoot: {
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing.unit,
    },
  },
});

const messages = {
  howToUse: {
    components: 'Para agregar el control, basta con dar clic sobre el componente',
  },
  titles: 'Registrar configuración de formulario',
};

/* (CMP) */
function ConfiguracionFormulario(props) {
  const {
    classes,
    configComponents,
    formValues: {
      // departamento,
      nombreFormulario: {
        value: nombreFormVal,
        // disabled: disabledInputForm,
      },
      // tipoFormulario,
      // formulario,
      logoFile: {
        /* eslint-disable-next-line no-unused-vars */
        url,
      },
    },
    sources: {
      componentTypes,
    },
    actions: {
      handleSelectComponent,
      handleClickEditForm,
      handleClickPublishForm,
      // handleClickSaveForm,
      handleUnactivateEdition: handleClickDeleteForm,
      updateInputAction,
      // onClickComponentLayoutAction,
      handleClickComponentLayout,
      handleDeleteComp,
      handleUpdateComponentProp,
      handleAddComp,
      hndlChangeNomComp,
      handleUpdateMinMaxLengths,
      handleSelectCellTable,
      handleUpdateComponentCellProp,
      handleSelectTableOption,
      handleChangeRowCellConfig,
      handleChangeGroupText,
      handleChangeRowColData,
      handleAddCellOptions,
      handleAddOptions,
      deleteCellSelectOpt,
      handleDeleteRowColumn,
      validateNombreForm,
      handleSubmitGuardarDetConfiguracion,
      handleClickPublishConfig,
    },
    ui: {
      loadingValidNombreForm: isLoadingVal,
    },
    selectedConf,
    selectedCell,
    editMode,
    width,
  } = props;
  const isMobile = ['xs', 'sm', 'md'].includes(width);
  const layoutActions = {
    handleUpdateComponentProp,
    handleClickComponentLayout,
    handleSelectComponent,
    handleDeleteComp,
    handleAddComp,
    hndlChangeNomComp,
    handleSelectCellTable,
    handleSelectTableOption,
    handleChangeRowCellConfig,
    handleChangeGroupText,
    handleUpdateComponentCellProp,
    handleChangeRowColData,
    handleDeleteRowColumn,
  }
  const panelActions = {
    handleUpdateComponentProp,
    handleUpdateMinMaxLengths,
    handleUpdateComponentCellProp,
    handleSelectCellTable,
    handleAddCellOptions,
    handleAddOptions,
    deleteCellSelectOpt,
  };  
  return (
    <Fragment>
      <Grid
        id="idMainContainer"
        container
        direction="row"
        alignItems="center"
        justify="center"
        item
        style={{
          padding: 16,
        }}
      >
        {/* FORM ACTION ROW */}
        <Grid
          id="idHeaderRow"
          container
          item
          xs={12}
          alignItems="center"
          justify="space-between"
          className={classes.topRow}
        >
          <Grid
            container
            direction="column"
            id="idLefHeaderColumn"
            item
            xs={12}
            sm={6}
          >
            <Grid item>
              <TextField
                label="Nombre del formulario"
                id="nombreFormulario_step2"
                name="nombreFormulario"
                value={nombreFormVal}
                disabled={!editMode}
                onChange={updateInputAction}
                fullWidth={isMobile}
                onBlur={validateNombreForm}
              />
            </Grid>
            {
              isLoadingVal && (
                <Grid item>
                  <InfoText/>
                  <LinearProgress />
                </Grid>
              )
            }
          </Grid>
          <Grid
            id="idRigthHeaderColumn"
            container
            item
            xs={12}
            sm={6}
            justify={isMobile ? 'center' : 'flex-end'}
          >
            {!editMode && (
              <Fragment>
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    name="btnEditar"
                    onClick={handleClickEditForm}
                    className={classes.topButtons}
                    fullWidth={isMobile}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    name="btnPublicar"
                    onClick={handleClickPublishConfig}
                    className={classes.topButtons}
                    fullWidth={isMobile}
                  >
                    Publicar
                  </Button>
                </Grid>
              </Fragment>
            )}
          </Grid>
        </Grid>
        <Grid
          id="idContentContainer"
          container
          item
          xs={12}
          spacing={24}
        >
          {/* LEFT CONTENT */}
          <Hidden mdDown>
            <Grid
              item
              container
              sm
              justify="center"
              alignItems="flex-start"
              id="idPanelLeft"
              style={{
                padding: 0,
              }}
            >
              {editMode && (
                <Fade in={editMode}>
                  <Paper
                    elevation={4}
                    style={{
                      flexGrow: 1,
                      maxWidth: '40%',
                      justifyContent: 'flex-start',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      align="center"
                      className={classes.leftPannelTitle}
                      gutterBottom
                      noWrap
                    >
                      Componentes
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      color="textSecondary"
                      paragraph
                    >
                      <Tooltip
                        title={messages.howToUse.components}
                      >
                        <Icon>info</Icon>
                      </Tooltip>
                    </Typography>
                    {componentTypes.map((item, index) => (
                      <div
                        key={`KEYCOMP${item.id}`}
                        className={classes.iconContainer}
                      >
                        <Tooltip
                          title={item.nombre}
                          placement="right"
                        >
                          <IconButton
                            onClick={handleSelectComponent(item, index)}
                            classes={{
                              root: classes.IconBClsRoot,
                            }}
                            name={`conffg_${item.key}`}
                            color="primary"
                          >
                            <Icon>
                              {item.icon}
                            </Icon>
                          </IconButton>
                        </Tooltip>
                      </div>
                    ))}
                  </Paper>
                </Fade>
              )}
            </Grid>
          </Hidden>
          {/* CENTER PANNEL */}       
          <Grid
            container
            item
            xs={12}
            sm={6}
            justify="center"
            id="idPanelCenter"
            style={{
              padding: 0,
            }}
          >
            <Paper
              elevation={editMode ? 12 : 4}
              className={classes.paper}
              style={{
                overflow: 'hidden auto',
              }}
            >
              <div className={classes.editor}>
                <LayoutFormulario
                  components={configComponents}
                  layoutActions={layoutActions}
                />
              </div>
            </Paper>
          </Grid>
          {/* RIGHT PANNEL */}
          <Grid 
            container
            item
            xs
            justify="space-between"
            alignItems="stretch"
            id="idPanelRight"
            style={{
              padding: 0,
            }}
            // como si fuera content
          > 
            {/* (TODO): CONFIGURACIÓN PANEL */}
            <PanelProperties
              showTypesFor={configComponents[selectedConf]}
              selectedCell={selectedCell}
              idx={selectedConf}
              actions={panelActions}
              // como si fuera .box
            />
            <Fade in={!editMode}>
              <Grid
                item
                xs={12}
                container
                justify="center"
                direction="column"
                className={classes.rightContainer}
                // como si fuera .box
              >
                <TextField
                  label="Estatus"
                  InputProps={{
                    variant: 'dense',
                  }}
                  defaultValue="No publicado"
                  disabled
                  margin="dense"
                /> 
                <TextField
                  label="Fecha"
                  InputProps={{
                    variant: 'dense',
                  }}
                  disabled
                  defaultValue="Sin fecha de publicación"
                  margin="dense"
                />
              </Grid>
            </Fade>
            <Fade in={editMode}>
              <Grid
                item
                container
                xs={12}
                direction={width === 'sm' || width === 'xs' ? 'column' : 'row'}
                justify="flex-end"
                className={classes.rightBottom}
                // como si fuera .box
              >
                <Grid
                  container
                  item
                  sm={12}
                  md={4}
                  justify="center"
                >
                  <Button
                    color="primary"
                    name="btnEliminar"
                    onClick={handleClickDeleteForm}
                    className={classes.bottomButtonsEdited}
                    fullWidth
                  > 
                    Cerrar
                  </Button>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  md={4}
                  justify="center"
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    name="btnGuardar"
                    onClick={handleSubmitGuardarDetConfiguracion}
                    className={classes.bottomButtonsEdited}
                    fullWidth
                  >
                    Guardar
                  </Button>
                </Grid>
                <Grid
                  container
                  item
                  sm={12}
                  md={4}
                  justify="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    name="btnPublicar"
                    onClick={handleClickPublishForm}
                    className={classes.bottomButtonsEdited}
                    fullWidth
                  >
                    Publicar
                  </Button>
                </Grid>
              </Grid>
            </Fade>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}

ConfiguracionFormulario.propTypes = {
  classes: T.object,
  configComponents: T.array,
  sources: T.shape({
    componentTypes: T.arrayOf(
      T.shape({
        id: T.string,
        nombre: T.string,
        tipo: T.string,
        icon: T.string,
      })
    ),
  }).isRequired,
  formValues: T.shape({
    nombreFormulario: T.shape({
      value: T.any,
      errorMessage: T.string,
      disabled: T.bool,
    }),
    logoFile: T.shape({
      url: T.string,
    }),
  }),
  ui: T.shape({
    openPublishModal: T.bool,
    loadingValidNombreForm: T.bool,
  }),
  actions: T.shape({
    handleClickDeleteForm: T.func,
    handleClickCloneForm: T.func,
    handleClickEditForm: T.func,
    handleClickPublishForm: T.func,
    onClickComponentLayoutAction: T.func,
    handleDeleteComp: T.func,
  }),
  selectedCell: T.number,
  selectedConf: T.number,
  editMode: T.bool,
  width: T.string,
}

ConfiguracionFormulario.defaultProps = {
  formValues: {
    nombreFormulario: {
      value: '',
      errorMessage: '',
    },
  },
  selectedConf: -1,
  editMode: false,
  actions: {
    handleClickDeleteForm: noop,
    handleClickCloneForm: noop,
  },
}

export default compose(
  withStyles(styles),
  withTheme(),
  withWidth(),
)(ConfiguracionFormulario);
