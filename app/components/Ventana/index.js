/**
 *
 * Modal
 *
 */

import React, { useState, useCallback } from 'react';
import T from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Grid,
  withStyles,
  Slide,
  Zoom,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Confirmacion from 'components/Dialog/alertDialog';
import Success from 'components/BotonSuccess';
import Cancelar from 'components/BotonCancelar'
import Grey from '@material-ui/core/colors/grey'
import './style.css';

const styles = () => ({

  titulo: {
    marginTop: 8,
    padding: '4px 0px 4px 0px',
    backgroundColor: '#F5F5F5',
  },
  botonCerrar:{
    padding: 4,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: Grey[200],
  },
  actions: {
    padding: '8px 16px 8px 16px',
  },
  overflow: {
    overflow: 'auto',
  },
  visible: {
    overflow: 'visible',
  },
  chico: {
    overflow: 'visible',
    width: '700px',
    maxWidth: '700px',
    height: '370',
  },
  mediano: {
    overflow: 'visible',
    width: 'auto',
    maxWidth: '80%',
    height: 'auto',
  },
});

function Transition(props) {
  return <Zoom {...props} />;
}

function Ventana(props) {
  const [bandModal, modalHandler] = useState(false);

  const {
    abrir,
    titulo,
    hayCambios,
    iconoTitulo,
    body,
    successLabel,
    cancelLabel,
    onClickSuccess,
    onClickCerrar,
    successDisabled,
    chico,
    overflow,
    classes,
  } = props;

  const modalHandlerProxy = useCallback((band) => () => {
    if(band === 1){
      band = false;
      onClickCerrar();
    }
    modalHandler(band)
  }, [bandModal])

  return (
    <React.Fragment>
      <Confirmacion 
        open={bandModal}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message='Existen datos no guardados, ¿Desea continuar?'
        onClickAccept={modalHandlerProxy(1)}
        onClickCancel={modalHandlerProxy(false)}
      />
      <Dialog
        onClose={hayCambios ? modalHandlerProxy(true) : onClickCerrar}
        aria-labelledby="customized-dialog-title"
        open={abrir}
        TransitionComponent={Transition}
        classes={
          {
            paper: chico ? classes.chico : classes.mediano,
          }
        }
      >
        <DialogTitle 
          id="dialogtittleventana" 
          classes={
            {
              root: classes.titulo,
            }
          }
          onClose={hayCambios ? modalHandlerProxy(true) : onClickCerrar}
        >
          <Grid
            container
            alignItems="center"
            style={
              {
                padding: '0px 8px 0px 8px',
              }
            }
          >
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              style={
                {
                  textAlign: 'left',
                }
              }
            >
              <Typography
                variant="subtitle2"
                style={{
                  whiteSpace: 'nowrap',
                }}
              >
                {iconoTitulo}{titulo}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              style={
                {
                  textAlign: 'right',
                }
              }
            >
              <IconButton 
                onClick={hayCambios ? modalHandlerProxy(true) : onClickCerrar}
                className={classes.botonCerrar}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent
          className={overflow ? classes.overflow : classes.visible}
          id='bodyVentana'
        >
          {body}
        </DialogContent>
        <DialogActions
          className={classes.actions}
        >
          <Grid
            container
            justify="flex-end"
            spacing={8}
          >
            {cancelLabel && 
              <Grid
                item
              >
                <Cancelar 
                  label={cancelLabel}
                  onClick={() => true}
                />
              </Grid>
            }
            {successLabel && 
              <Grid
                item
              >
                <Success 
                  label={successLabel}
                  onClick={onClickSuccess}
                  disabled={!successDisabled}
                />
              </Grid>
            }
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Ventana.propTypes = {
  abrir: T.bool,
  titulo: T.string,
  body: T.element,
  iconoTitulo: T.element,
  hayCambios: T.bool,
  successLabel: T.oneOfType([
    T.string,
    T.element,
  ]),
  cancelLabel: T.string,
  onClickSuccess: T.func,
  onClickCerrar: T.func,
  successDisabled: T.bool,
  chico: T.bool,
  overflow: T.bool,
  classes: T.object,
};

export default withStyles(styles)(Ventana);
