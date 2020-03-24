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
  MenuItem,
  Divider,
} from '@material-ui/core';
import {
  red,
  green,
  grey,
} from '@material-ui/core/colors';

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
    minWidth: 300,
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
  menu: {
    width: 200,
  },
  textFieldCartera: {
    width: 200,
    margin: '40px 10px 20px 10px',
  },
  textFieldlawyer: {
    width: 350,
    margin: '40px 10px 20px 10px',
  },
  title: {
    margin: 10,
  },
});

const Modal = props => {
  // variables
  const {
    classes,
    title,
    open,
    reason,
    comboCartera,
    carteraSelected,
    comboLawyer,
    lawyerSelected,
    // positionEtapaSelected,
  } = props;
  // funciones
  const {
    onClickLeave,
    onClickSave,
    onChangeCombo,
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
              <Typography variant="h6" component="title" className={classes.title}>
                {title}
              </Typography>
              <Divider/>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                id="standard-select-cartera"
                select
                label="Tipo de Cartera"
                className={classes.textFieldCartera}
                value={carteraSelected}
                onChange={event => onChangeCombo(event,'CARTERA')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                InputLabelProps={{
                  style: {color: 'black'},
                }}
                margin="normal"
              >
                <MenuItem key="0" value="0" disabled>
                  <Typography variant="caption" style={{color: grey[500]}}>
                    Seleccione el tipo de cartera...
                  </Typography>
                </MenuItem>
                {comboCartera.map(option => (
                  <MenuItem key={option.Id} value={option.Id}>
                    {option.Nombre}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-lawyer"
                select
                label="Abogado"
                className={classes.textFieldlawyer}
                value={lawyerSelected}
                onChange={event => onChangeCombo(event,'LAWYER')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                InputLabelProps={{
                  style: {color: 'black'},
                }}
                margin="normal"
              >
                <MenuItem key="0" value="0" disabled>
                  <Typography variant="caption" style={{color: grey[500]}}>
                    Seleccione un Abogado...
                  </Typography>
                </MenuItem>
                {comboLawyer.map(option => (
                  <MenuItem key={option.Id} value={option.Id}>
                    {option.Nombre}
                  </MenuItem>
                ))}
              </TextField>
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
                  disabled={carteraSelected === 0 && lawyerSelected === 0}
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

Modal.propTypes = {
  classes: T.object.isRequired,
  title: T.string,
  open: T.oneOfType([
    T.bool,
  ]),
  onClickLeave: T.func,
  onClickSave: T.func,
  reason: T.string,
  comboCartera: T.array,
  carteraSelected: T.number,
  onChangeCombo: T.func,
  comboLawyer: T.array,
  lawyerSelected: T.number,
  // positionEtapaSelected: T.number,
}

Modal.defaultProps = {
  open: false,
}

export default withStyles(stylesDialog)(Modal);