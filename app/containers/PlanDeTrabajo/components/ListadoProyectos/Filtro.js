/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import T from 'prop-types';
import { Grid,
  FormControl,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@material-ui/core';
import { compose } from 'redux';
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import { withHandlers } from 'recompose';
import AutoCompletable from 'components/FiltroSeleccion';
import Calendario from '../../../Pedidos/components/DateRangerPicker';

const styles = _theme => ({
  root: {
    borderTopLeftRadius: '4px',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
  },
  root2: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: _theme.palette.background.paper,
  },
  paper: {
    padding: _theme.spacing.unit * 2,
    textAlign: 'center',
    color: _theme.palette.text.secondary,
    height: '79vh',
  },
  title: {
    fontSize: 14,
  },
  typography: {
    padding: _theme.spacing.unit * 2,
  },
  formControl: {
    margin: _theme.spacing.unit,
    minWidth: '60%',
    maxWidth: '60%',
  },
});

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiDialogTitle: {
        root: {
          backgroundColor: "#989898",
          '& h6': {
            color: 'red',
          },
          padding:'5px 10px 5px',
        },
      },
    },
  })
// eslint-disable-next-line no-lone-blocks
{/* style={styles.formControl} */}
function Filtro(props) { 
  const { 
    classes,
    fechas,
    onFechaInput,
    onChangeEstatus,
    estatusSeleccionado,
    responsableSeleccionado,
    changeFecha,
    onClickLimpiar,
    onFiltroProxy,
    onFiltroPendientesProxy,
    estatusProyectos,
    empleados,
    onInputChangeProxy,
    responsableEstatus,
    idPortafolio,
    tablaPendientes,
  } = props;

  return (
    <div >
      <MuiThemeProvider theme={getMuiTheme}>
        <Grid container>
          <Grid container itemjustify="flex-start">
            <Grid item xs={2} sm={2} md={2} lg={2} style={{padding: '12px 8px 0px 16px'}}>
              <Typography style={{textAlign: 'left', fontSize: '0.9rem', fontWeight: 'bold'}} >
              FILTROS
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} style={{paddingTop: 5}}  >
              <Button style={{color: '#3f51b5'}} onClick={onClickLimpiar} >
              Limpiar
              </Button>
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}   >
            <Calendario 
              // label = 'Fecha Inicio:'
              fecInicio = {fechas.fechaInicio}
              fecFin = {fechas.fechaFin}
              fechaInput = {fechas.fechaInput}
              onChangeFecha = {changeFecha}
              onFechaInput = {onFechaInput}
              id = {0}
              paddingRight = {75}
              paddingLeft = {0}
            />
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3}  style={{marginLeft:"70px"}}>
            <FormControl className={classes.formControl} >
              <InputLabel 
                style={{fontSize: 14}} 
                htmlFor="estatusid"
              >
                Estatus
              </InputLabel>
              <Select
                value={estatusSeleccionado}
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
                  name: 'estatus',
                  id: 'estatusid',
                }}
              >
                {
                  estatusProyectos.map((elem) => 
                    <MenuItem 
                      style={{fontSize: 14}} 
                      key={`menu${elem.id}`} 
                      value={elem.id}>
                      {elem.nombre}
                    </MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} ></Grid>
       
          <Grid item xs={7} sm={7}  md={7} lg={7}  style={{marginLeft:"-45px"}}>
            <FormControl className={classes.formControl}>
         
              <AutoCompletable
                valor={responsableSeleccionado}
                onChange={onInputChangeProxy}
                opciones={empleados}
                campoValido={responsableEstatus}
                
                label='Nombre del responsable'
                indice={1}
                style={{fontSize:"14px"}}
              />
            </FormControl>
          </Grid>
          <Grid 
            container
            justify="flex-end"
            style={{paddingRight: 8, paddingTop: 8}}
          >
            <Grid  item xs={2} sm={2} md={2} lg={2} style={{marginRight: 16}}>
              <Button
                variant='contained'
                onClick={
                  tablaPendientes ? onFiltroPendientesProxy(fechas,estatusSeleccionado,responsableSeleccionado,idPortafolio)
                    : onFiltroProxy(fechas,estatusSeleccionado,responsableSeleccionado)
                }
                
                style={
                  {
                    marginBottom: 8,
                    backgroundColor: '#28950f',
                    color: 'white',
                  }
                }
              >
                {/* <Filtro /> */}
                 Filtrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
       
      </MuiThemeProvider>
    </div>
  );
}

Filtro.propTypes = {
  classes:T.object,
  onClickLimpiar:T.func,
  // onClickFiltrar,
  fechas:T.object,
  onFechaInput:T.func,
  onChangeEstatus:T.func,
  estatusSeleccionado:T.string,
  responsableSeleccionado:T.string,
  changeFecha:T.func,
  onFiltroProxy:T.func,
  estatusProyectos:T.func,
  empleados:T.func,
  onInputChangeProxy:T.func,
  responsableEstatus:T.func,
  idPortafolio:T.func,
  tablaPendientes:T.bool,
  onFiltroPendientesProxy:T.bool,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => () => (e) => {      
      const {
        onChangeResponsable,
      } = props;
      onChangeResponsable(e)
    },
    onFiltroProxy: (props) => (fechas,estatus,responsable,idPortafolio) => () => { 
      const {
        onClickFiltrar,
      } = props;

      if(responsable.length === 0 || responsable === undefined){
        responsable = undefined
      }else{
        responsable = responsable[0].value 
      }

      const autorizacionEstatus = null
     

      const item = {
        fechas,
        estatus,
        autorizacionEstatus,
        responsable,
        idPortafolio: autorizacionEstatus <= 0 ?  idPortafolio.item.IdPortafolio : null,
      }
      onClickFiltrar(item)
    },

    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------

    onFiltroPendientesProxy: (props) => (fechas,estatus,responsable) => () => {  
      const {
        onClickFiltrarPendientes,
      } = props;
      
      
      if(responsable.length === 0 || responsable === undefined){
        responsable = undefined
      }else{
        responsable = responsable[0].value 
      }

      // let autorizacionEstatus = null
   
      
      
      // if(estatus === null && autorizacionEstatus === "" ){
      //   // idPortafolio.item.IdPortafolio = null
      //   autorizacionEstatus = 1
      //   if(idPortafolio === ''){
      //     IdPortafolio = ""
      //   }else{
      //     IdPortafolio = null
      //   }
      // }
      
     

      const item = {
        fechas,
        estatus,
        autorizacionEstatus:1,
        responsable,
      }
      onClickFiltrarPendientes(item)
    },
  })
)(Filtro);
