import React, { // eslint-disable-line
// Component,
} from 'react';
// import noop from 'lodash/noop';
// import uniqueId from 'lodash/uniqueId'
import T from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import every from 'lodash/every';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import withWidth from '@material-ui/core/withWidth';
// import posed, { PoseGroup } from 'react-pose';

import {
  withStyles,
} from '@material-ui/core/styles';

import {
  compose,
  onlyUpdateForKeys,
} from 'recompose';

import UploadFile from 'utils/lib/components/uploadFile';
// MATERIAL UI DEPENDENCIES
import {
  TextField,
  Grid,
  MenuItem,
  // FormGroup,
  FormControlLabel,
  Radio,
  Button,
  LinearProgress,
  Typography,
} from '@material-ui/core';
// import { Router, Switch } from 'react-router';

// ICONS
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

// RELATIVE IMPORTS
import {
  FormContainer,
  Container,
  Instructions,
  LoadingContainer,
} from './styledComponents';

const InfoText = () => (
  <Typography variant="caption" gutterBottom>
    Validando nombre del formulario
  </Typography>
);

const styles = (theme) => ({
  textField: {
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
  },
  button: {
    // marginRight: theme.spacing.unit,
    paddingLeft: 0,
    marginTop: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  submit: {
    margin: theme.spacing.unit,
  },
});


const getMenuItemsOpts  = {
  id: '',
  dataText: '',
  dataValue: '',
  MenuItemProps: {},
};

const getMenuItems = (data = [], options = getMenuItemsOpts) => {
  const {
    id = uniqueId('mnu_itm_'),
    dataText = '',
    dataValue = '',
    MenuItemProps = {},
  } = options;


  return (data.length && dataText.length && dataValue.length) ?
    data.map((item, index) =>
      <MenuItem
        key={item[dataValue]}  
        value={item[dataValue] || `${id}_idx_${index}`}
        {...MenuItemProps}
      >
        {item[dataText] || 'Seleccione'}
      </MenuItem>
    ) : (
      <MenuItem
        value=""
        {...MenuItemProps}
      >
        Sin opciones
      </MenuItem>
    )
}

const ITEM_HEIGHT = 48;

function NuevoFormulario (props) { // eslint-disable-line
  
  const {
    // theme,
    actions: {
      updateInputAction,
      validateNombreForm,
      // handleStepGoNextAction,
      handleSubmitNewFrmConfig,
    },
    sources: {
      departamentos = [],
      deptosFormularios: formularios = [],
    },
    formValues: {
      departamento,
      nombreFormulario,
      tipoFormulario,
      formulario,
      logoFile,
    },
    loadings: {
      loadingValidNombreForm: isLoadingVal,
    },
    classes,
    width: viewport,
  } = props
  // console.log('props', props);
  const disabledNext = every([
    !isEmpty(departamento.value),
    !isEmpty(nombreFormulario.value),
    !isEmpty(tipoFormulario.value),
    tipoFormulario.value === 'clonado' ?
      !isEmpty(formulario.value) : true ,
  ], Boolean);
  
  const optsDepartamentos = getMenuItems(departamentos, {
    dataText: 'nombre',
    dataValue: 'id',
  })

  const optsFormularios = getMenuItems(formularios, {
    dataText: 'nombre',
    dataValue: 'id',
  })

  const sty = {
    fileLoadedContainer: {
      position: 'relative',
      top: 0, 
      left: 0,
      width: '100%',
      heigth: '100%',
    },
    imgLoaded: {
      width: '80%',
      heigth: '80%',
    },
  };

  const logoComponent = logoFile.url.length ? (
    <div
      style={sty.fileLoadedContainer}
    >
      <img 
        src={logoFile.url}
        style={sty.imgLoaded}
        alt=""
      /> 
    </div>
  ) : (
    <UploadFile
      id="upload-file"
      afterOnload={props.afterLoadFile}
      label="upload file"
      createWebUrl
      transform="buffer"
    >
      <Button
        size="small"
        color="primary"
        component="span"
        className={classes.button}
      >
        <CloudUploadIcon
          className={classes.leftIcon}
        />
        Subir logo
      </Button>
    </UploadFile>
  )
  const smallViewports = ['xs', 'md'];
  const isFullWidth = smallViewports.includes(viewport);
  return (
    <Container>
      <div>
        <Instructions
          variant="body2"
          component="p"
        >
          Indique el departamento y nombre del formulario
        </Instructions>
      </div>
      <FormContainer>
        <Grid
          container
        >
          <Grid
            item
            xs={12}
          >
            <TextField
              select
              error={false}
              name="departamento"
              label="Seleccione el departamento"
              fullWidth
              className={classes.textField}
              onChange={updateInputAction}
              value={departamento.value}
              InputProps={{
                variant: 'dense',
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: 200,
                    },
                  },
                },
              }}
            >
              {optsDepartamentos}
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="column"
          >
            <TextField
              error={false}
              id="nombreFormulario_step1"
              name="nombreFormulario"
              label="Capture el nombre del formulario"
              className={classes.textField}
              onChange={updateInputAction}
              onBlur={validateNombreForm}
              value={nombreFormulario.value}
              InputProps={{
                variant: 'dense',
              }}
              fullWidth
            />
            { isLoadingVal && (
              <LoadingContainer>
                <InfoText/>
                <LinearProgress />
              </LoadingContainer>
            ) }
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="center"
          >
            
            <FormControlLabel
              label="En blanco"
              control={
                <Radio
                  checked={tipoFormulario.value === 'nuevo'}
                  value="nuevo"
                  name="tipoFormulario"
                  onChange={updateInputAction}
                  color="secondary"
                />
              }
            />
            <FormControlLabel
              label="Clonar uno existente"
              control={
                <Radio
                  checked={tipoFormulario.value === 'clonado'}
                  value="clonado"
                  name="tipoFormulario"
                  onChange={updateInputAction}
                  color="secondary"
                />
              }
            />
          
          </Grid>
          <Grid
            container
            item
            xs={12}
          >
            <Grid
              item
              xs={12}
              sm={5}
              container
              alignItems="center"
              justify="center"
            >
              {logoComponent}
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
            >
              {tipoFormulario.value === 'clonado' && (
                <TextField
                  select
                  error={false}
                  name="formulario"
                  label="Seleccione un formulario"
                  fullWidth
                  className={classes.textField}
                  onChange={updateInputAction}
                  value={formulario.value}
                  InputProps={{
                    variant: 'dense',
                  }}
                >
                  {optsFormularios}
                </TextField>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            justify="flex-end"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitNewFrmConfig}
              className={classes.submit}
              disabled={!disabledNext}
              fullWidth={isFullWidth}
            >
              Siguiente
            </Button>
          </Grid>      
        </Grid>
      </FormContainer>
    </Container>
  );

}

NuevoFormulario.defaultProps = {
  formValues: {
    departamento: {
      value: '',
      errorMessage: '',
    },
    nombreFormulario: {
      value: '',
      errorMessage: '',
    },
    tipoFormulario: {
      value: '',
      errorMessage: '',
    },
  },
  actions: {
    updateInputAction: noop,
  },
}

NuevoFormulario.propTypes = {
  // theme: T.object,
  width: T.string,
  classes: T.object,
  afterLoadFile: T.func,
  sources: T.shape({
    departamentos: T.array,
    formularios: T.array,
  }).isRequired,
  actions: T.shape({
    updateInputAction: T.func,
  }),
  // handleCheckNewFormulario: T.func,
  // handleChangeFormulario: T.func,
  formValues: T.shape({
    departamentos: T.shape({
      value: T.any,
      errorMessage: T.string,
    }),
    nombreFormulario: T.shape({
      value: T.any,
      errorMessage: T.string,
    }),
    tipoFormulario: T.shape({
      value: T.oneOf([
        '',
        'nuevo',
        'clonado',
      ]),
      errorMessage: T.string,
    }),
  }),
  loadings: T.shape({
    loadingValidNombreForm: T.bool,
  }),
}


export default compose(
  withStyles(styles),
  onlyUpdateForKeys([
    'loadings',
    'formValues',
    'sources',
    'classes',
    'afterLoadFile',
    'width',
  ]),
  withWidth(),
)(NuevoFormulario);
