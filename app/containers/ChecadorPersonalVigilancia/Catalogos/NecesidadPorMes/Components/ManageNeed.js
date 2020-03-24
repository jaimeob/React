
import React from "react";
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SwitchCustom from 'components/SwitchCustom';
import ReasonChange from "./ReasonChange";

const stylesManageNeed = () => ({
  root:{
    justifyContent: 'center',
    minWidth: '70%',
    margin: '0 15%',
  },
  buttonSuccess: {
    backgroundColor: '#007F00',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
    textTransform: 'initial',
  },
  buttonDanger: {
    backgroundColor: '#FF0023',
    color: 'white',
    '&:hover': {
      background: 'rgb(154, 0, 54)',
    },
    textTransform: 'initial',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: '1rem 10%',
  },
})

const plazasComplete = (typeNeedSelected, plazas, needs) => {
  let result = []

  if( typeNeedSelected === 1 ){
    result = plazas.filter( plaza => {
      const plazaNeed = needs.find( need => need.IdPlaza === plaza.IdPlaza)
      return plazaNeed.IdMesNuevo && plaza
    })
  }else{
    result = plazas
  }
  return result
}

const ManageNeed = props => {
  const [errorField, setErrorField] = React.useState(false);
  const {
    classes,
    propsManageNeed: {
      data:{
        plaza: {
          plazas,
          needs,
          selectedPlaza,
        },
        typeNeedSelected,
        needPlazaSelected,
      },
      foo:{
        handleSelectedPlaza,
        handleChangeStatusSpecialService,
        handleChangeNeedSpecialService,
        handleChangeNeed,
        requestCancelNewNeed,
        validateRequiredFiles,
      },
    },
    propsReasonChange,
  }=props;
  return (
    <div className={classes.root}>
      <h5 className={classes.subtitle}> Indique la necesidad del mes</h5>
      <ReasonChange propsReasonChange={propsReasonChange}/>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid>
            <Grid item xs={6}>
              <TextField
                required
                error={!selectedPlaza && errorField}
                disabled={typeNeedSelected === 2}
                id="select-plaza"
                select
                label="Plazas"
                value={selectedPlaza}
                onChange={handleSelectedPlaza}
                margin="normal"
                fullWidth>
                <MenuItem key="plaza_0" value="0" disabled>
                Seleccione
                </MenuItem>
                {plazasComplete(typeNeedSelected, plazas, needs).map(plaza => (
                  <MenuItem
                    key={`plaza_${plaza.IdPlaza}`}
                    value={plaza.IdPlaza}>
                    {plaza.Nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> <Grid item xs={6} />
            <Grid item xs={6}>
              <TextField
                required
                disabled
                id={needPlazaSelected.IdMes.toString()}
                label="Mes"
                value={needPlazaSelected.NombreMes}
                fullWidth
                margin="normal"/>
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                error={!needPlazaSelected.necesidad && errorField}
                id="need"
                label="Necesidad"
                value={needPlazaSelected.necesidad}
                margin="normal"
                onChange={handleChangeNeed}
                inputProps={{maxLength: 3}}/>
            </Grid>
            <Grid item xs={12}>
              <SwitchCustom
                checked={needPlazaSelected.especialActivo}
                onChange={handleChangeStatusSpecialService}
                label="Servicios especiales"/>
              { needPlazaSelected.especialActivo ?
                <TextField
                  required
                  error={!needPlazaSelected.especial && errorField}
                  style={{margin: '0 0 0 1rem'}}
                  id="special-service-bare"
                  margin="normal"
                  value={needPlazaSelected.especial}
                  inputProps={{ 'aria-label': 'bare', maxLength: 3 }}
                  onChange={handleChangeNeedSpecialService}/>
                : null
              }
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            className={classes.buttonDanger}
            onClick={requestCancelNewNeed}
            variant="contained">
              Cerrar
          </Button>
          <Button
            className={classes.buttonSuccess}
            onClick={ ()=>{validateRequiredFiles(); setErrorField(true)} }
            variant="contained">
              Guardar
          </Button>
        </CardActions>
      </Card>
    </div>
  )
};

ManageNeed.propTypes = {
  classes: PropTypes.object,
  propsManageNeed: PropTypes.object,
  propsReasonChange: PropTypes.object,
}

export default withStyles(stylesManageNeed)(ManageNeed)
