/**
 *
 * Captura
 *
 */

import React from 'react';
import T from 'prop-types';
// import styled from 'styled-components';
import {
  // Typography,
  withStyles,
  // Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Chip,
  // Tooltip,
} from '@material-ui/core';
import {
  green,
  blueGrey,
} from '@material-ui/core/colors'
import {
  Backup,
  Attachment,
} from '@material-ui/icons'
import AlertDialog from 'components/Dialog/alertDialog';

const useStyles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    width: 300,
  },
  card: {
    width: '70%',
    height: 400,
    margin: '0 15%',
  },
  cardContent: {
    padding: '1rem 5%',
  },
  cardActions :{
    // marginTop: 100,
    height: '42%',
  },
  btnAccept: {
    background: green[700],
    color: "white",
    minWidth: 100,
    marginLeft: 5,
    '&:hover': {
      background: green[900],
    },
    textTransform: 'initial',
  },
  btnClean: {
    color: "rgb(63, 81, 181)",
    textTransform: 'initial',
    minWidth: 100,
    marginLeft: 5,
  },
  btnUpLoad: {
    minWidth: 100,
    textTransform: 'initial',
    // color: "red",
  },
  textField: {
    width: 200,
  },
  textFieldNumber: {
    width: 200,
  },
  containerBtn: {
    padding: '0 5%',
    height: '100%',
  },
});

const EXT_PERM = [
  'pdf',
  'png',
  'jpg',
  'xml',
]

const onChangeCombo = (props, value, option) => {
  const {
    params: {
      companySelected,
      plazaSelected,
    },
    actions: {
      handleChangeCompanyAction,
      requestGetWeekAction,
    },
  } = props
  handleChangeCompanyAction(value, option);
  if(option === 'plazaSelected') {
    requestGetWeekAction(companySelected, value)
  }

  if(option === 'companySelected' && plazaSelected > 0) {
    requestGetWeekAction(value, plazaSelected)
  }
}

const onChangeAbsence = (props, value) => {
  const {
    actions: {
      handleChangeAbsenceAction,
      notification,
    },
  } = props;
  const regexp = new RegExp(/^[0-9]*$/);

  if(regexp.test(value)){
    handleChangeAbsenceAction(value);
  } else {
    notification({
      message: 'Este campo solo acepta datos numericos',
      options: {
        variant: 'info',
      },
    })
  }
}

const onPrepareFiles = (props, event) => {
  const {
    params:{
      filesReady,
    },
    actions: {
      handlePrepareFilesAction,
      notification,
    },
  } = props;

  const {
    target:{
      files,
    },
  } = event

  const filesForm = new FormData();
  const filesAccepted = [...filesReady];
  let accepted = false;

  // eslint-disable-next-line array-callback-return
  Object.keys(files).map(idx => {
    const extFile = (files[idx].name.substring(files[idx].name.lastIndexOf('.') + 1)).toLowerCase();
    if(EXT_PERM.some(ext => ext === extFile) && files[idx].size <= 10485760) {
      if(!filesAccepted.some(file => file.name === files[idx].name)){
        filesAccepted.push(files[idx]);
        accepted = true;
      }
    } else {
      if(!EXT_PERM.some(ext => ext === extFile)) {
        notification({
          message: 'Alguno de los archivos no cuenta con el formato correcto, solo se admite PDF, .PNG,.JPG, .XML',
          options: {
            variant: 'warning',
          },
        })
      }
      if(files[idx].size > 10485760) {
        notification({
          message: 'Alguno de los archivos sobre pasa el tamaño maximo, el archivo no debe ser mayor a 10 MB',
          options: {
            variant: 'warning',
          },
        })
      }
    }
  })

  filesForm.append('files', [...filesAccepted]);

  if(accepted){
    handlePrepareFilesAction(filesAccepted);
  }

  // para limpiar y porder adjuntar el mismo archivo
  event.target.value = null;
}

const onClickSave = (props) => () => {
  const {
    params: {
      IdEmpleado,
      companySelected,
      plazaSelected,
      weekData,
      absence,
      filesReady,
    },
    actions: {
      handleClickSaveAction,
      notification,
      handleSearchRequiredAction,
    },
  } = props;

  if(!companySelected || !plazaSelected || !absence || !filesReady.length){

    handleSearchRequiredAction({
      company: !!companySelected,
      plaza: !!plazaSelected,
      absence: !!absence,
      files: filesReady.length > 0,
    })

    notification({
      message: 'Favor de capturar los campos requeridos',
      options: {
        variant: 'error',
      },
    })

  } else {

    handleClickSaveAction({
      user: IdEmpleado,
      company: companySelected,
      plaza: plazaSelected,
      year: weekData.AnioRetail,
      week: weekData.SemanaRetail,
      absence,
      filesReady,
    });
  }
}

const onClickClean = (props) => () => {
  const {
    params: {
      companySelected,
      plazaSelected,
      absence,
      filesReady,
    },
    actions:{
      handleClickDialogConfirmAction,
    },
  } = props

  if(companySelected || plazaSelected || absence || filesReady.length){
    handleClickDialogConfirmAction({nameDialog: 'dialogClean',value: true})
  }
}

const onClickAcceptClean = (props) => () => {
  const {
    actions:{
      handleCleanWindowsAction,
      handleClickDialogConfirmAction,
    },
  } = props

  handleClickDialogConfirmAction({nameDialog: 'dialogClean',value: false})
  handleCleanWindowsAction();
}

const onClickCancelClean = (props) => () => {
  const {
    actions:{
      handleClickDialogConfirmAction,
    },
  } = props
  handleClickDialogConfirmAction({nameDialog: 'dialogClean',value: false})
}

const Captura = (props) => {
  const {
    classes,
    params: {
      companys,
      plazas,
      companySelected,
      plazaSelected,
      weekData,
      absence,
      filesReady,
      dialogClean,
      companysFill,
      plazasFill,
      absenceFill,
      filesFill,
    },
    actions:{
      handleDeleteFileAction,
    },
  } = props

  return <div>
    <AlertDialog
      open={dialogClean}
      typeAlert='Warning'
      typeOptions='Select'
      title='Advertencia'
      message='Existen modificaciones, al continuar se perderán los cambios, ¿Desea continuar?'
      onClickAccept={onClickAcceptClean(props)}
      onClickCancel={onClickCancelClean(props)}
    />
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container justify="center" spacing={8}>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl} error={!companysFill}>
              <InputLabel shrink htmlFor="age-label-placeholder">
                Empresa*
              </InputLabel>
              <Select
                value={companySelected}
                onChange={event => onChangeCombo(props, event.target.value,'companySelected')}
                inputProps={{
                  name: 'age',
                  id: 'age-label-placeholder',
                }}
                displayEmpty
                name="age"
                className={classes.selectEmpty}
              >
                <MenuItem
                  value={0}
                  disabled
                  key={0}
                >
                  <em>Seleccione una Empresa</em>
                </MenuItem>
                {companys.map(obj =>
                  <MenuItem key={obj.EmpresaId} value={obj.EmpresaId}>
                    {obj.Nombre}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl} error={!plazasFill}>
              <InputLabel shrink htmlFor="age-label-placeholder">
                Plazas*
              </InputLabel>
              <Select
                value={plazaSelected}
                onChange={event => onChangeCombo(props, event.target.value,'plazaSelected')}
                inputProps={{
                  name: 'age',
                  id: 'age-label-placeholder',
                }}
                displayEmpty
                name="age"
                className={classes.selectEmpty}
                disabled={companySelected === 0}
              >
                <MenuItem
                  value={0}
                  disabled
                  key={0}
                >
                  <em>Seleccione una plaza</em>
                </MenuItem>
                {plazas.map(obj =>
                  <MenuItem key={obj.PlazaId} value={obj.PlazaId}>
                    {obj.Nombre}
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              error={weekData.estatus === 'ATRASADO'}
              required
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              id="standard-disabled"
              label="Semana"
              value={weekData.Fecha ? weekData.Fecha : ''}
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              error={!absenceFill}
              required
              inputProps={{
                maxLength: 3,
              }}
              id="standard-number"
              onChange={event => onChangeAbsence(props, event.target.value)}
              value={absence}
              className={classes.textFieldNumber}
              margin="normal"
              placeholder="Ingrese Inasistencias*"
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Grid container className={classes.containerBtn}>
          <Grid item sm={6} xs={12}>
            <Grid container style={{height: '100%'}}>
              <Grid item sm={12} xs={12} style={{maxHeight:'100px', overflow:'auto'}}>
                {filesReady.map((file, index) =>
                  <Chip
                    key={file.name}
                    icon={<Attachment/>}
                    label={file.name}
                    style={{fontSize: '0.7em', margin: 1, backgroundColor: blueGrey[50]}}
                    onDelete={() => handleDeleteFileAction(index)}
                    // onClick={() => console.log('mostrado')}
                  />)
                }
              </Grid>
              <Grid item sm={12} xs={12}>
                <Grid
                  container
                  alignItems="flex-end"
                  style={{height: '100%'}}
                >
                  <input
                    accept="application/pdf, image/png, image/jpeg, text/xml"
                    multiple
                    style={{display: 'none'}}
                    id='adjuntarArchivo'
                    onChange={event => onPrepareFiles(props, event)}
                    type="file"
                  />
                  <label htmlFor='adjuntarArchivo'>
                    <Button
                      variant="contained"
                      component="span"
                      className={classes.btnUpLoad}
                      style={{ color: !filesFill ? "red" : "black" }}
                    >
                      <Backup color="secondary" style={{margin: '0 5'}}/>
                      Subir evidencia*
                    </Button>
                  </label>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Grid container alignItems='flex-end' className={classes.containerBtn}>
              <Grid item sm={12} xs={12}>
                <Grid container justify='flex-end'>
                  <Button
                    className={classes.btnClean}
                    onClick={onClickClean(props)}
                  >
                    Limpiar
                  </Button>
                  <Button
                    // disabled={
                    //   !companySelected ||
                    //   !plazaSelected ||
                    //   !absence ||
                    //   !filesReady.length
                    // }
                    variant="contained"
                    className={classes.btnAccept}
                    onClick={onClickSave(props)}
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  </div>;
}

Captura.propTypes = {
  classes: T.object,
  params: T.shape({
    IdEmpleado: T.number,
    companys: T.array,
    plazas: T.array,
    companySelected: T.number,
    plazaSelected: T.number,
    weekData: T.object,
    absence: T.string,
    filesReady: T.array,
    dialogClean: T.bool,
    companysFill: T.bool,
    plazasFill: T.bool,
    absenceFill: T.bool,
    filesFill: T.bool,
  }),
  actions: T.shape({
    handleChangeCompanyAction: T.func,
    requestGetWeekAction: T.func,
    handleChangeAbsenceAction: T.func,
    handlePrepareFilesAction: T.func,
    notification: T.func,
    handleDeleteFileAction: T.func,
    handleClickSaveAction: T.func,
    handleCleanWindowsAction: T.func,
    handleClickDialogConfirmAction: T.func,
    handleSearchRequiredAction: T.func,
  }),
};

export default withStyles(useStyles)(Captura);
