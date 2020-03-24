import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  Dialog,
  Grid,
  Button,
  Paper,
  TextField,
  MenuItem,
  Typography,
} from '@material-ui/core';
import {
  red,
  green,
  grey,
} from '@material-ui/core/colors';

const stylesDialog  = () => ({
  btnAccept: {
    background: green[700],
    color: "white",
    minWidth: 100,
    marginLeft: 5,
  },
  btnCancel: {
    background: red[700],
    color: "white",
    minWidth: 100,
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

const ListDialog = props => {
  // variables
  const {
    classes,
    title,
    open,
    nameEtapa,
    DaysPlazaForeign,
    DaysPlazaLocal,
    comboEtapas,
    positionEtapaSelected,
    titleCombo,
    estatus,
  } = props;
  // funciones
  const {
    onClickLeave,
    onClickSaveList,
    onChangeText,
    onChangeCombo,
    permisos,
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
                disabled={permisos.normales.sololectura === 1 && permisos.normales.editar === 0 || estatus === 'Inactivo'}
                id="standard-full-width"
                label="Etapa"
                placeholder="Ingrese una descripción"
                fullWidth
                className={classes.textField1}
                value={nameEtapa}
                onChange={event => onChangeText(event.target.value, 'nameEtapa')}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  style: {color: 'black'},
                }}
                inputProps={{maxLength: 50}}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <Grid container>
                <Grid item sm={6} xs={12}>
                  <TextField
                    disabled={permisos.normales.sololectura === 1 && permisos.normales.editar === 0 || estatus === 'Inactivo'}
                    id="standard-plazafo"
                    // type="number"
                    label="Plaza Foránea"
                    placeholder="Ingrese duración"
                    className={classes.textField2}
                    value={DaysPlazaForeign}
                    onChange={event => /^[0-9]*$/.exec(event.target.value) ? onChangeText(event.target.value, 'DaysPlazaForeign') : null}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                      style: {color: 'black'},
                    }}
                    inputProps={{maxLength: 3}}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    disabled={permisos.normales.sololectura === 1 && permisos.normales.editar === 0 || estatus === 'Inactivo'}
                    id="standard-plazalo"
                    type="number"
                    label="Plaza Local"
                    placeholder="Ingrese duración"
                    className={classes.textField2}
                    value={DaysPlazaLocal}
                    onChange={event => /^[0-9]*$/.exec(event.target.value) ? onChangeText(event.target.value, 'DaysPlazaLocal') : null}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                      style: {color: 'black'},
                    }}
                    inputProps={{maxLength: 3}}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled={permisos.normales.sololectura === 1 && permisos.normales.editar === 0 || estatus === 'Inactivo'}
                id="standard-select-currency"
                select
                label={titleCombo}
                className={classes.textField3}
                value={positionEtapaSelected}
                onChange={event => onChangeCombo(event.target.value)}
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
                <MenuItem key="-1" value="-1" disabled>
                  <Typography variant="caption" style={{color: grey[500]}}>
                    Seleccione una Etapa
                  </Typography>
                </MenuItem>
                {comboEtapas.map(option => (
                  <MenuItem key={option.IdEtapa} value={option.IdEtapa} disabled={estatus === 'Inactivo'}>
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
                  Salir
                </Button>
                {
                  permisos.normales.registrar === 1 ? (
                    <Button
                      variant="contained"
                      className={classes.btnAccept}
                      onClick={onClickSaveList}
                      disabled={
                        nameEtapa.length < 3 ||
                        DaysPlazaForeign === '' ||
                        DaysPlazaLocal === '' ||
                        positionEtapaSelected === -1 ||
                        estatus === 'Inactivo'
                      }
                    >
                      Guardar
                    </Button>
                  ) : null
                }
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    </div>
  );
}

ListDialog.propTypes = {
  classes: T.object.isRequired,
  title: T.string,
  open: T.oneOfType([
    T.bool,
  ]),
  onClickLeave: T.func,
  onClickSaveList: T.func,
  onChangeText: T.func,
  nameEtapa: T.string,
  DaysPlazaForeign: T.string,
  DaysPlazaLocal: T.string,
  comboEtapas: T.array,
  positionEtapaSelected: T.number,
  onChangeCombo: T.func,
  titleCombo: T.string,
  permisos: T.object,
  estatus: T.string,
}

ListDialog.defaultProps = {
  open: false,
}

export default withStyles(stylesDialog)(ListDialog);