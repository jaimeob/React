import React from 'react';
import T from 'prop-types';
import {Button, TextField, Grid, Dialog, DialogActions,DialogContent, DialogContentText, DialogTitle, Icon} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Cloud from '@material-ui/icons/CloudDownload';
import BotonCancelar from 'components/BotonCancelar';
import BotonSuccess from 'components/BotonSuccess';
import { Container } from '../../../ConfiguracionTicket/styledComponents';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  success: {
    backgroundColor: 'rgba(249, 170, 51, 0.7)',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: 'rgb(212, 8, 36)',
    },
    color: 'white',
    minWidth: 84.88,
  },
  root: {
    textTransform: 'initial',
  },
})

// backgroundColor:'rgba(249, 170, 51, 0.7)',
//                     background: 'rgba(249, 170, 51, 0.7)',

function ModalJustificacion(props) {
  
  
  const {
    classes,

    //  EVENTOS
    handleClose,
    onChangeTextModal,
    onUploadFile,
    onClickEnviarMensajeModal,
    ticketSelected,

    // VARIABLES
    open,
    tipoJustificacion,
    valueTextModal,
    idTicketSelected,
    numUsuarioLogeado,
    nomUsuarioLogeado,
    imagenAvatar,
    tabSelected,
    indiceEtapa,
    indiceEtapaSeleccionado,
  } = props;

  let titulo = '';
  let leyenda = '';

  switch (tipoJustificacion) {
    case 'Rechazar':
      // nomBotonCerrar = "CANCELAR TICKET"
      titulo='Razón de Rechazo'
      leyenda='Capture Razón'
      break;
    case 'Regresar':
      // nomBotonCerrar = "CERRAR TICKET"
      titulo='Razón de Rechazo'
      leyenda='Capture Razón'
      break;
    case 'Cerrar':
      titulo= 'Solución'
      leyenda = 'Capture Solución'
      break;
    case 'Cancelar':
      titulo = 'Razón de Cancelacion'
      leyenda = 'Capture Razón'
      break;
    default:
      break;
  }

  return (
    <Grid
      item
      container
      md={5}
      sm={5}
      xs={5}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle 
          id="form-dialog-title"
        >
          <Container justify="space-between">
            {titulo}
            <Icon
              style={{ alignSelf:'flex-end' }}
            >
            line_weight
            </Icon>
          </Container>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {leyenda}
          </DialogContentText>
          <TextField
            inputProps={
              {
                maxLength: 500,
                
              }
            }
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="text"
            fullWidth
            autoComplete='off'
            value={valueTextModal}
            onChange={onChangeTextModal}
          />
        </DialogContent>
        <DialogActions>
          <Container >
            <Container justify='flex-start'>
              <input
                accept="image/*"
                style={{display: 'none'}}
                id="contained-button-file-modal"
                onChange={onUploadFile}
                type="file"
              />
              <label htmlFor="contained-button-file-modal">
                <Button 
                  variant="contained"
                  component="span"
                  color="primary"
                  style={{ 
                    marginLeft:'30px', 
                    backgroundColor:'rgba(249, 170, 51, 0.7)',
                    background: 'rgba(249, 170, 51, 0.7)',
                    borderRadius: 5,
                    fontFamily: 'Roboto',
                    fontSize: 12,
                    letterspacing: '0.0357143em',
                    color: '#FFFFFF',
                    minWidth: 84.88,
                  }}
                  className={classes.success}
                  classes={
                    {
                      root: classes.root,
                    }
                  }
                >

                  
                  <Cloud>
                  </Cloud>
                  &nbsp; &nbsp;ADJUNTAR
                  
                </Button>             
              </label>

            </Container>
            <Container justify='flex-end'>
              <BotonCancelar
                className={classes.button}
                onClick={handleClose} 
                color="secondary"
                variant="contained"
                label="CANCELAR"    
              >
                Cancelar
              </BotonCancelar>
              <Grid container style={{width:20}}></Grid>
              <BotonSuccess
                className={classes.button}
                onClick={onClickEnviarMensajeModal({
                  IdTicket: idTicketSelected,
                  Mensaje: valueTextModal,
                  NomArchivo: "",
                  ArchivoAdjunto: "",
                  Emisor: numUsuarioLogeado,
                  NomEmisor: nomUsuarioLogeado,
                  UrlImagenEmisor: imagenAvatar,
                },tipoJustificacion
                ,indiceEtapaSeleccionado)}
                label="ENVIAR"
                color="primary"
                variant="contained"
              >
                Enviar
              </BotonSuccess>
            </Container>
          </Container>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
ModalJustificacion.propTypes = {
  classes: T.object,

  //  EVENTOS
  handleClose: T.func,
  onChangeTextModal: T.func,
  onUploadFile: T.func,
  onClickEnviarMensajeModal: T.func,

  // VARIABLES
  open: T.bool,
  tipoJustificacion: T.string,
  valueTextModal: T.string,
  idTicketSelected: T.number,
  numUsuarioLogeado: T.number,
  nomUsuarioLogeado: T.string,
  imagenAvatar: T.string,
  tabSelected: T.number,
};

export default withStyles(styles)(ModalJustificacion);