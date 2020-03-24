/* eslint-disable no-underscore-dangle */
/**
 *
 * Funcionalidad: Plantilla para enviar un ticket
 *
 */

import React from 'react';
import { compose } from 'redux';
import {
  lifecycle,
} from 'recompose';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Modal from 'containers/Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import DatosPlantilla from '../DatosPlantilla';
import {propTypes} from './types';
import { Container } from '../../../ConfiguracionTicket/styledComponents';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: '4px',
    // marginTop:'7px',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
  },
  encabezado: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    margin: 'auto',
    minHeight: '47px',
  },
  footer: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    margin: 'auto',
    height: '10%',
  },
  encabezadoText: {
    fontSize: 14, 
    fontWeight: 'bold',
  },
  paper2: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    margin: 'auto',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
  },
  TextField: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});


function TicketsDetails(props) {
  const { 
    ticketsDetails,
    handleChangeDepartamento,
    handleChangePlantilla,
    handleChangeComponent,
    handleSendTicket,
    handleChangeInput,
    deleteFile,
    getTickets,
    handleChangeInputFile,
    notificacion,
    modal,
    cerrarModal,
    numUsuarioLogeado,
    plazaUsuarioLogeado,
    plazasAutorizadas,
    tabSelected,
    classes,
  } = props;
  
  return (
    <div className={classes.root}>
      <Container className={classes.encabezado}>
        <Typography style={{fontSize: 12, fontWeight: 'bold'}}>
          ENVIAR NUEVO TICKET
        </Typography>
      </Container>
      <Divider />
      <Container 
        container 
        item 
        className={classes.paper} 
        style={{display: 'inline-block', paddingBottom: '20px'}}>
        <Typography style={{fontSize: 12, fontWeight: 'bold'}}>
          SELECCIÓN DE PLANTILLA
        </Typography>
        <Grid container style={{height: '100%'}}>
          <Grid item xs={12} sm={6} md={5}>
            <FormControl className={classes.formControl}>
              <InputLabel 
                style={{fontSize: 14}} 
                htmlFor="departamento-id"
              >
                {ticketsDetails.departamentos.length === 0 ? 
                  'No Existen Departamentos con Plantillas'
                  : 'Departamentos'
                }
              </InputLabel>
              <Select
                value={ticketsDetails.departamento.id}
                onChange={handleChangeDepartamento}
                displayEmpty
                style={{fontSize: 14}}
                name="departamentos"
                MenuProps= {{
                  PaperProps: {
                    style : {
                      maxHeight: 60 * 4.5,
                    },
                  },
                }}
                disabled={ticketsDetails.departamentos.length === 0}
                inputProps={{
                  name: 'departamento',
                  id: 'departamento-id',
                }}
              >
                {
                  ticketsDetails.departamentos.map((elem) => 
                    <MenuItem 
                      style={{fontSize: 14}} 
                      id={`departamentos_${elem.IdDepartamento}`} 
                      key={`menu${elem.IdDepartamento}`} 
                      value={elem.IdDepartamento}
                    >
                      {elem.Nombre}
                    </MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <FormControl className={classes.formControl}>
              <InputLabel 
                style={{fontSize: 14}} 
                htmlFor="plantillas-id"
              >
              Nombre de Servicio
              </InputLabel>
              <Select
                value={ticketsDetails.plantillaSelected.id}
                onChange={handleChangePlantilla}
                name="plantillas"
                displayEmpty
                style={{fontSize: 14}}
                disabled={ticketsDetails.departamento.id === ''}
                inputProps={{
                  name: 'plantillas',
                  id: 'plantillas-id',
                }}
              >
                {
                  ticketsDetails.plantillas.map((elem, indice) => 
                    <MenuItem 
                      style={{fontSize: 14}} 
                      id={`plantilla_${elem.IdPlantilla}`} 
                      key={`menu${elem.IdPlantilla}`} 
                      value={indice}>
                      {elem.Nombre}
                    </MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid 
            item 
            xs={12} 
            sm={12} 
            md={2}
            lg={2}
          >
            <FormControl className={classes.TextField}>
              <TextField
                disabled
                id="standard-disabled"
                label=""
                inputProps={{
                  style:{
                    fontSize: 14,
                  },
                }}
                value={
                  ticketsDetails.plantilla.IdPlantilla ? 
                    ticketsDetails.plantilla.TipoNombre : 
                    'Tipo'
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      {ticketsDetails.plantilla.IdPlantilla ? 
        <DatosPlantilla 
          plazasAutorizadas={plazasAutorizadas}
          numUsuarioLogeado={numUsuarioLogeado}
          plazaUsuarioLogeado={plazaUsuarioLogeado}
          handleChangeComponent={handleChangeComponent}
          handleChangeInput={handleChangeInput}
          handleChangeInputFile={handleChangeInputFile}
          deleteFile={deleteFile}
          inhabilitado={0}
          tabSelected={tabSelected}
          notificacion={notificacion}
          datos={ticketsDetails.plantilla}/> : null}
      {ticketsDetails.plantilla.IdPlantilla ? 
        <Grid 
          container 
          className={classes.footer}
        >
          <Grid 
            container 
            item 
            xs={12} 
            sm={12} 
            md={12} 
            lg={12}
            justify="flex-end" 
            direction="row" 
            style={{paddingBottom: 8}}
          >
            <Button 
              color="secondary" 
              onClick={cerrarModal} 
              id="1" 
              variant="contained"
              style={{ 
                marginLeft: 8,
                backgroundColor:'#FF0023',
                color:'#F7F7F7',
              }}
            >
              Cancelar
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSendTicket}
              // disabled={ticketsDetails.plantilla.showError}
              style={{ 
                marginLeft: 8,
                backgroundColor:'#28950F',
                color:'#F7F7F7',
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Enviar&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </Grid>
        </Grid> : null }
      <Modal 
        open={modal}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message='¿Está seguro que desea cancelar el ticket?'
        onClickAccept={getTickets}
        onClickCancel={cerrarModal}
      />
    </div>
  )  
}
TicketsDetails.propTypes = propTypes;

const withLifecycle = lifecycle({
  componentDidMount() {
    const {
      getDepartamentos,
    } = this.props;
    getDepartamentos()
  },
});

export default compose(
  withStyles(styles),
  withLifecycle,
)(TicketsDetails);

