import React from 'react';
import T from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog(props) {
  const {
    open,
    message,
    title,
    handleCloseModal,
  } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
        >
          {title}
        </DialogTitle>
        <DialogContent>
          {message}
        </DialogContent>
        <DialogActions>
          <Button
            name="btnDialog_cancelar"
            onClick={handleCloseModal}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            name="btnDialog_aceptar"
            onClick={handleCloseModal}
            color="primary"
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.propTypes = {
  open: T.bool.isRequired,
  title: T.node,
  message: T.node,
  handleCloseModal: T.func,
}

// const omitOpen = mapProps((props) => omit(props, 'open'));

// const EnhancedDialog = compose(
//   omitOpen,
//   withState('open', 'handleOpenDialog', false),
//   withHandlers({
//     onDialogOpen: (props) => () => {
//       const {
//         handleOpenDialog,
//       } = props;
//       handleOpenDialog(() => true)
//     },
//     onDialogClose: (props) => () => {
//       const {
//         handleOpenDialog,
//       } = props;
//       handleOpenDialog(() => false)
//     },
//   })
// )(AlertDialog);

export default AlertDialog;



/*
  TODO: Crear componente re-utilizable
*/