
import React from "react";
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import { Close } from "@material-ui/icons";

const stylesReasonChange = () => ({
  root:{
  },
  title:{
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: '5px',
    top: '5px',
    color: grey[500],
    padding: '0',
  },
  dialogTitle: {
    height: '2rem',
    background: '#E0E0E0',
    padding: '.5rem',
  },
  buttonSuccess: {
    backgroundColor: '#007F00',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
    textTransform: 'initial',
  },
  reasonChange:{
    '& p': {
      textAlign: 'right',
    },
  },
})

const ReasonChange = props => {
  const {
    classes,
    propsReasonChange: {
      data:{
        modalReasonChange,
        needPlazaSelected,
      },
      foo:{
        handleCloseModalReasonChange,
        handleAcceptReasonChange,
        handleChangeReasonChange,
      },
    },
  } = props;
  const maxLengthReason = 255

  return (
    <div>
      <Dialog
        open={modalReasonChange}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth>
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          <Typography className={classes.title}>Motivo de cambio</Typography>
          <IconButton className={classes.closeButton} aria-label="close" onClick={handleCloseModalReasonChange}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            className={classes.reasonChange}
            id="reasonChange"
            label="Descripción"
            margin="normal"
            value={needPlazaSelected.motivoEdita}
            onChange={handleChangeReasonChange}
            helperText={`${needPlazaSelected.motivoEdita.length}/${maxLengthReason}`}
            fullWidth
            inputProps={
              {maxLength: maxLengthReason}
            }/>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.buttonSuccess}
            onClick={handleAcceptReasonChange}
            disabled={!needPlazaSelected.motivoEdita}
            variant="contained">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

ReasonChange.propTypes = {
  classes: PropTypes.object,
  propsReasonChange: PropTypes.object,
}

export default withStyles(stylesReasonChange)(ReasonChange)
