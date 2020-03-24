import React from 'react';
import T from 'prop-types';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
// import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import Filtro from "@material-ui/icons/FilterList";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import DataTable from 'components/DataTable';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Procesar from '@material-ui/icons/Autorenew';
import Calendario from '../DateRangerPicker';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '60%',
    maxWidth: '60%',
  },
})

function Coorporativo(props){
  const {
    estatusSeleccionado,
    estatusCombo,
    fecSolicitudInicio,
    fecSolicitudFin,
    fechaSolicitudInput,
    fecAutorizacionInicio,
    fecAutorizacionFin,
    fechaAutorizacionInput,
    onChangeEstatus,
    onChangeFechaInicio,
    onChangeFechaAutorizacion,
    onClickFiltrar,
    onClickLimpiar,
    onClickVerPedido,
    onClickMultipleAutorizacion,
    onFechaInput,
    classes,
    datos,
    cabeceras,
    plaza,
    plazas,
    onChangePlaza,
    permisos,
  } = props;

  const header = cabeceras.map((ele) => {
    if(ele.name === 'Estatus'){
      return {
        name: ele.name,
        options: {
          setCellProps: () => ({
            style: {
              paddingRight: 16,
              width: '15%',
            },
          }),
          searchable: false,
        },
      }
    }
    return ele;
  }) 

  const menuItemUno =
  <React.Fragment>
    <Procesar 
      style={{
        paddingRight: 8,
      }} 
    />
    <Typography>Procesar</Typography>
  </React.Fragment>
  
  const filtros = 
  <Grid container>
    <Grid
      container 
      item
      justify="flex-start"
    >
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        lg={2}
        style={{padding: '12px 8px 0px 16px'}}
      >
        <Typography
          style={{textAlign: 'left', fontSize: '0.9rem', fontWeight: 'bold'}}
        >
          FILTROS
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        lg={2}
        style={{paddingTop: 5}}
      >
        <Button 
          style={{color: '#3f51b5'}}
          onClick={onClickLimpiar}
        >
          Limpiar
        </Button>
      </Grid>
      <Grid 
        item
        xs={8}
        sm={8}
        md={8}
        lg={8}
      />
    </Grid>
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      lg={4}
      style={{textAlign: 'center'}}
    >
      <FormControl className={classes.formControl}>
        <InputLabel 
          style={{fontSize: 14}} 
          htmlFor="plazasid"
        >
        Plaza
        </InputLabel>
        <Select
          value={plaza.id}
          onChange={onChangePlaza}
          name="Plazas"
          displayEmpty
          style={{fontSize: 14}}
          MenuProps= {{
            PaperProps: {
              style : {
                maxHeight: 45 * 4.5,
              },
            },
          }}
          inputProps={{
            name: 'Plazas',
            id: 'plazasid',
          }}
        >
          {
            plazas.map((elem) => 
              <MenuItem 
                style={{fontSize: 14}} 
                key={`menu${elem.IdPlaza}`} 
                value={elem.IdPlaza}>
                {elem.Nombre}
              </MenuItem>
            )
          }
        </Select>
      </FormControl>
    </Grid>
    <Calendario 
      label = 'Fecha Autorización:'
      fecInicio = {fecAutorizacionInicio}
      fecFin = {fecAutorizacionFin}
      fechaInput = {fechaAutorizacionInput}
      onChangeFecha = {onChangeFechaAutorizacion}
      onFechaInput = {onFechaInput}
      id = {0}
      paddingRight = {0}
      paddingLeft = {0}
    />
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      lg={4}
      style={{textAlign: 'center'}}
    >
      <FormControl className={classes.formControl}>
        <InputLabel 
          style={{fontSize: 14}} 
          htmlFor="estatusid"
        >
        Estatus
        </InputLabel>
        <Select
          value={estatusSeleccionado.id}
          onChange={onChangeEstatus}
          name="Estatus"
          displayEmpty
          style={{fontSize: 14}}
          MenuProps= {{
            PaperProps: {
              style : {
                maxHeight: 45 * 4.5,
              },
            },
          }}
          inputProps={{
            name: 'Estatus',
            id: 'estatusid',
          }}
        >
          {
            estatusCombo.map((elem) => 
              <MenuItem 
                style={{fontSize: 14}} 
                key={`menu${elem.IdEstatus}`} 
                value={elem.IdEstatus}>
                {elem.Nombre}
              </MenuItem>
            )
          }
        </Select>
      </FormControl>
    </Grid>
    <Calendario 
      label = 'Fecha Solicitud:'
      fecInicio = {fecSolicitudInicio}
      fecFin = {fecSolicitudFin}
      fechaInput = {fechaSolicitudInput}
      onChangeFecha = {onChangeFechaInicio}
      onFechaInput = {onFechaInput}
      id = {1}
      paddingRight = {22}
      paddingLeft = {0}
    />
    <Grid 
      container
      justify="flex-end"
      style={{paddingRight: 8, paddingTop: 8}}
    >
      <Grid 
        item
        xs={2}
        sm={2}
        md={2}
        lg={2}
        style={{marginRight: 16}}
      >
        <Button
          variant='contained'
          onClick={onClickFiltrar}
          style={
            {
              marginBottom: 8,
              backgroundColor: '#28950f',
              color: 'white',
            }
          }
        >
          <Filtro />
          Filtrar
        </Button>
      </Grid>
    </Grid>
  </Grid>

  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'multiple',
    registrosPorPagina: 10,
    disableToolbar: false,
  };
  return (
    <DataTable 
      data = {datos}
      headers = {header}
      configuracion = {configuracion}
      permisos = {permisos}
      opciones = {
        [
          {'icon' : 'ver', 'action': onClickVerPedido},
        ]
      }
      idPosition = "IdPedido"
      admin
      // onDelete = {onChangeEstatus}
      filtros = {filtros}
      onItemUno = {onClickMultipleAutorizacion}
      menuItemUno = {menuItemUno}
      message="¿Esta seguro que desea eliminar la(s) plaza(s)?"
    />
  )
}

Coorporativo.propTypes = {
  cabeceras: T.array,
  datos: T.array,
  estatusCombo: T.array,
  estatusSeleccionado: T.object,
  fecSolicitudInicio: T.object,
  fecSolicitudFin: T.object,
  fecAutorizacionInicio: T.object,
  fecAutorizacionFin: T.object,
  classes: T.object,
  fechaSolicitudInput: T.string,
  fechaAutorizacionInput: T.string,
  onChangeEstatus: T.func,
  onChangeFechaInicio: T.func,
  onChangeFechaAutorizacion: T.func,
  onClickFiltrar: T.func,
  onFechaInput: T.func,
  onClickLimpiar: T.func,
  onClickMultipleAutorizacion: T.func,
  onClickVerPedido: T.func,
  plaza: T.object,
  plazas: T.array,
  onChangePlaza: T.func,
  permisos: T.object,
};

export default compose(
  withStyles(styles),
)(Coorporativo);

