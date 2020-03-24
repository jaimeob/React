import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  Dialog,
  Grid,
  Button,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

const stylesDialog  = () => ({
  btnAccept: {
    background: '#28950F',
    color: "white",
    textTransform: 'initial',

    width: '84.88px',
    marginLeft: 5,
    '&:hover':{
      background: '#1d7109',
    },
  },
  btnCancel: {
    background: '#FF0023',
    color: "white",
    textTransform: 'initial',
    width: '84.88px',
    '&:hover': {
      backgroundColor: '#d40824',
    },
  },
  dialog: {
    minWidth: 500,
  },
  textField1: {
    width: '100%',
  },
  textField2: {
    width: 200,
  },
  textField3: {
    width: 200,
  },
});

const DeleteDialog = props => {
  // variables
  const {
    classes,
    title,
    open,
    reason,
    // positionEtapaSelected,
  } = props;
  // funciones
  const {
    onClickLeave,
    onClickSave,
    onChangeText,
  } = props

  return (
    <div>
      <Dialog
        open={open}
        disableBackdropClick
        // onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <Paper style={{padding: 10}} className={classes.dialog}>
          <Grid container direction="column">
            <Grid item sm={12} xs={12}>
              <Typography variant="h6" component="title">
                {title}
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                id="standard-full-width"
                label="Motivo"
                placeholder="Ingrese un Motivo"
                fullWidth
                className={classes.textField1}
                value={reason}
                onChange={event => onChangeText(event.target.value, 'reason')}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  style: {color: 'black'},
                }}
                inputProps={{maxLength: 50}}
              />
            </Grid>
            <Grid item sm={12} xs={12} style={{marginTop: 10}}>
              <Grid container justify="flex-end">
                <Button
                  variant="contained"
                  className={classes.btnCancel}
                  onClick={onClickLeave}
                >
                  Cerrar
                </Button>
                <Button
                  variant="contained"
                  className={classes.btnAccept}
                  onClick={onClickSave}
                  disabled={reason.length < 3}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    </div>
  );
}

DeleteDialog.propTypes = {
  classes: T.object.isRequired,
  title: T.string,
  open: T.oneOfType([
    T.bool,
  ]),
  onClickLeave: T.func,
  onClickSave: T.func,
  onChangeText: T.func,
  reason: T.string,
  // positionEtapaSelected: T.number,
}

DeleteDialog.defaultProps = {
  open: false,
}

export default withStyles(stylesDialog)(DeleteDialog);