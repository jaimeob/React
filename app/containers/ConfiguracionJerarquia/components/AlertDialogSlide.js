import React from 'react';
import T from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide} from '@material-ui/core';
import {CloudDownload} from '@material-ui/icons';
import Cancelar from 'components/BotonCancelar';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const AlertDialogSlide = (props) => {

  const {
    children,
    onClickModal,
    onClickDownload,
    open,
  } = props;

  const styles = {
    download: {
      float: 'right',
      color: 'white',
      backgroundColor: '#F9AA33',
    },
    downloadIcon: {
      marginRight: 5,
    },
    dialogAction: {
      marginRight: 18,
    },
    dialogTitle: {
      fontSize: 20,
    },
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClickModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle 
          id="alert-dialog-slide-title" 
          disableTypography
          style={styles.dialogTitle}
        >
          {"Vista previa"}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions style={styles.dialogAction}>
          {
            onClickModal && (
              <Cancelar label='Cerrar' onClick={onClickModal} /> 
            )
          }
          {
            onClickDownload && (
              <Button 
                style={styles.download} 
                onClick={onClickDownload} 
                color="primary"
                disableTypography
              >
                <CloudDownload style={styles.downloadIcon} />
                Descargar
              </Button>
            )
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialogSlide.propTypes = {
  open: T.bool,
  onClickDownload: T.func,
  onClickModal: T.func,
  children: T.object,
};

export default AlertDialogSlide;