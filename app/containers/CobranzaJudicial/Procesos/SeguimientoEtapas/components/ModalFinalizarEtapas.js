import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import T from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import CambiarEtapaIcon from '@material-ui/icons/SwapVerticalCircle';
import { compose } from 'recompose';
import classNames from 'classnames';
import Nubesita from '@material-ui/icons/CloudUpload';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel'; 
import Select from '@material-ui/core/Select'; 
import MenuItem from '@material-ui/core/MenuItem'; 
import {uniqueId} from 'lodash';
import TextField from '@material-ui/core/TextField';
import Success from 'components/BotonSuccess';

import {
  grey,
  green,
} from '@material-ui/core/colors';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

const styles = () => ({
  leftIcon: {
    fontSize: '20px',
    color: '#F9AA33',
  },
  fuenteGris: {
    color: '#616161',
    textTransform: 'initial',
  },
  verdesito:{
    color: '#545050',
    textTransform: 'initial',
  },
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
  typographyEtapa: {
    display: 'inline-block',
    position: 'relative',
    top: 19,
    fontSize: 18,
    fontWeight: 500,
  },
  helperText: {
    textAlign: 'right',
  },
  divEtapas: {
    marginBottom: 30,
  }
})

const CustomizedDialogDemo = (props) => {
  
  const {
    classes,
    params: {
      showModalFinalizarEtapa,
      observacionFinalizarEtapa,
      archivoFinalizarEtapaSubido,
      archivoFinalizarEtapa,
      nombreArchivoFinalizarEtapa,
    },
    foo: {
      handleShowModalFinalizarEtapaAction,
      handleFileAction,
      handleChangeInputAction,
    },
    permisos,
  } = props;

  return (
    <div>
      <Dialog
        onClose={handleShowModalFinalizarEtapaAction}
        aria-labelledby="customized-dialog-title"
        open={showModalFinalizarEtapa}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleShowModalFinalizarEtapaAction}>
          <CambiarEtapaIcon 
            className={classNames(classes.leftIcon, classes.fuenteGris)}
          /> <span className={classes.fuenteGris}>Finalizar Etapa</span>
        </DialogTitle>
        <DialogContent>
         
          <div>
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              placeholder="Ingrese Observación"
              value={observacionFinalizarEtapa}
              onChange={(e) => handleChangeInputAction(7, e)}
              helperText={
                <FormHelperText
                  className={classes.helperText}
                >
                  255/255
                </FormHelperText>}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          {permisos.especiales.cargararchivos === 1 ?
            <div>
              <input
                accept="*"
                style={{display: 'none'}}
                id='subirArchivosTemp'
                onChange={(e) => handleFileAction(2, e)}
                type="file"
              />
              <label htmlFor='subirArchivosTemp'>
                <Button 
                  size="small"
                  variant="contained"
                  component="span"
                  className={classes.verdesito}
                >
                  <Nubesita 
                    className={classes.leftIcon}
                  /> Subir archivos
                </Button>
              </label>
              <FormHelperText>
                {nombreArchivoFinalizarEtapa || 'Sin archivo...'}
              </FormHelperText>
            </div>
            :null
          }
        </DialogContent>
        <DialogActions>
          <Success 
            onClick={handleShowModalFinalizarEtapaAction}
            // label={clienteId ? 'Actualizar' : 'Guardar'}
            label='Aceptar'
            // disabled={guardarConfiguracion}
            // onClick={onClickGuardar}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

const withStyle = withStyles(styles)

CustomizedDialogDemo.propTypes = {
  params: T.object,
  foo: T.object,
  classes: T.object,
  permisos:T.object,
};

export default compose(
  withStyle,
)(CustomizedDialogDemo);
