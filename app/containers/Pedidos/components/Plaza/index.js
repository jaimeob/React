import React from 'react';
import T from 'prop-types';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Filtro from "@material-ui/icons/FilterList";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import DataTable from 'components/DataTable';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import Palomita from '@material-ui/icons/CheckCircleOutline';
// import Tachita from '@material-ui/icons/HighlightOff';
import Calendario from '../DateRangerPicker';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
})

function Plaza(props){
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
    onClickVerPedido,
    onClickLimpiar,
    onClickFiltrar,
    classes,
    datos,
    cabeceras,
    onAgregarPedido,
    onFechaInput,
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

  const acciones =
  <div>
    <MenuItem>
      <IconButton 
        tooltip="Exportar Tabla" 
        style={{
          padding: 0, 
          fontSize: 12,
          color: 'rgba(0, 0, 0, 0.87)',
        }}
      >
        <Palomita 
          style={{
            paddingRight: 8,
          }} 
        />
        Exportar Tabla
      </IconButton>
    </MenuItem>
  </div>;

  const filtros = 
  <Grid 
    container
  >
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
    <Calendario 
      label = 'Fecha Autorización:'
      fecInicio = {fecAutorizacionInicio}
      fecFin = {fecAutorizacionFin}
      fechaInput = {fechaAutorizacionInput}
      onChangeFecha = {onChangeFechaAutorizacion}
      onFechaInput = {onFechaInput}
      id = {0}
      paddingRight = {0}
      paddingLeft = {4}
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
      paddingLeft = {4}
    />
    <Grid 
      item 
      xs={2}
      sm={2}
      md={8}
      lg={8}
    ></Grid>
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
  
  for (let i = 0; i < datos.length; i+=1) {
    const color = /\(([^)]+)\)/.exec(datos[i].Color);
    if(typeof datos[i].Estatus === 'string')
      datos[i].Estatus = 
      <Chip
        avatar={<Avatar style={{backgroundColor: datos[i].Color}}></Avatar>}
        label={datos[i].Estatus} 
        style={{
          backgroundColor: 'white',
          borderColor: `rgba(${color[1]}, 0.5)`,
          width: '130px',
          justifyContent: 'start',
        }}
        variant="outlined"
      />
  }

  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'none',
    registrosPorPagina: 10,
  };
  return (
    <DataTable 
      data = {datos}
      headers = {header}
      permisos = {permisos}
      configuracion = {configuracion}
      onClickAgregar = {onAgregarPedido}
      opciones = {
        [
          {'icon' : 'ver', 'action': onClickVerPedido},
        ]
      }
      idPosition = "IdPedido"
      admin
      filtros = {filtros}
      acciones = {acciones}
    />
  )
}

Plaza.propTypes = {
  cabeceras: T.array,
  datos: T.array,
  estatusSeleccionado: T.object,
  estatusCombo: T.array,
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
  onClickVerPedido: T.func,
  onAgregarPedido: T.func,
  onClickLimpiar: T.func,
  onFechaInput: T.func,
  permisos: T.object,
};

export default compose(
  withStyles(styles),
)(Plaza);

