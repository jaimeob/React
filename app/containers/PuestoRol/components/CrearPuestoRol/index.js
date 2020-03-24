import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import moment from 'moment';
import { uniqueId } from 'lodash';

import {
  Grid,
  FormControl,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  Paper,
} from '@material-ui/core';
import Nubesita from '@material-ui/icons/CloudUpload';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ComboMultiple from 'components/FiltroSeleccion';
import Combo from 'components/Seleccion';
import Modal from 'components/Dialog/alertDialog';
import Success from 'components/BotonSuccess';
import DataTable from 'components/DataTable';
import Cancelar from 'components/BotonCancelar'
import FormInput from 'components/FormInput';

pdfMake.vfs = pdfFonts.pdfMake.vfs; 


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
  root: {
    textTransform: 'initial',
  },
  success: {
    backgroundColor: '#28950F',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#1d7109',
    },
    color: 'white',
  },
  leftIcon: {
    marginRight: 8,
    fontSize: '20px',
  },
  lista: {
    height: '100%',
    padding: 'unset',
  },
})

function NuevoMolde(props){
  const {
    puesto,
    puestos,
    rol,
    roles,
    archivo,
    idPuesto,
    lista,
    abrirModalArchivo,
    onInputChangeProxy,
    handleClickListaProxy,
    // onClickAsignar,
    cabeceras,
    cabecerasArchivo,
    onDescargarArchivo,
    onGuardarConfiguracion,
    onUploadedFileProxy,
    onCancelarConfiguracionProxy,
    onDescargarFormato,
    onEliminarArchivo,
    onCancelarArchivo,
    onCancelarArchivoProxy,
    activo,
    classes,
  } = props;

  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: false,
    paginado: false,
    buscar: false,
    responsivo: "scroll",
  };
  // console.log(rol,"LOS ROLES");
  

  const noop = () => undefined;

  return (
    <div
      style={
        {
          height: '85vh',
          padding: 8,
          overflow: 'auto',
        }
      }
    >
      <Modal 
        open={abrirModalArchivo}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message='¿Esta seguro que desea eliminar el documento?'
        onClickAccept={onEliminarArchivo}
        onClickCancel={onCancelarArchivoProxy(true)}
      />
      <Paper
        elevation={2} 
        style={
          {
            height: '100%',
          }
        }
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          style={
            {
              padding: 8,
              height: '20%',
              overflow: 'auto',
            }
          }
        >
          <Grid
            item
            container
            justify="center"
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
          >
            <Grid
              item
              style={
                {
                  width: '80%',
                  paddingBottom: idPuesto ? 28 : 8,
                }
              }
            >
              {idPuesto ? 
                <ComboMultiple
                  valor={puesto.valor}
                  onChange={onInputChangeProxy}
                  opciones={puestos}
                  campoValido={puesto.campoValido}
                  inhabilitado
                  label='Puesto:'
                  indice={0}
                /> :
                <ComboMultiple
                  valor={puesto.valor}
                  onChange={onInputChangeProxy}
                  opciones={puestos}
                  campoValido={puesto.campoValido}
                  requerido
                  label='Puesto:'
                  indice={0}
                />
                // <Combo 
                //   requerido
                //   indice={0}
                //   campoValido={puesto.campoValido}
                //   label='Puesto:'
                //   valor={puesto.valor}
                //   onChange={onInputChangeProxy}
                //   opciones={puestos}
                //   idOpcion='IdPuesto'
                //   nomOpcion='Nombre'
                //   fullWidth
                //   marginTop='25px'
                // />
              }
            </Grid>
          </Grid>
          <Grid
            item
            container
            justify="center"
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
          >
            <Grid
              item
              style={
                {
                  width: '80%',
                  paddingBottom: 8,
                }
              }
            >
              <ComboMultiple
                valor={rol.valor}
                onChange={onInputChangeProxy}
                opciones={roles}
                multiple
                campoValido={rol.campoValido}
                requerido
                label='Seleccion los roles:'
                indice={1}
              />
            </Grid>
          </Grid>
        </Grid>
        {
          (rol.valor.length > 0 && puesto.valor !== '') && 
          <React.Fragment>
            <Divider />
            <Grid
              container
              direction="column"
              style={
                {
                  paddingTop: 8,
                }
              }
            >
              <Grid
                item
                container
                justify="flex-end"
                spacing={8}
                style={
                  {
                    padding: '8px 0px 8px 8px',
                  }
                }
              >
                <Grid
                  item
                >
                  <Success 
                    label='Imprimir Formato'
                    size='small'
                    onClick={onDescargarFormato}
                  />
                </Grid>
                <Grid
                  item
                  style={
                    {
                      paddingRight: 32,
                    }
                  }
                >
                  <FormControl>
                    <input
                      accept="*"
                      multiple
                      style={{display: 'none'}}
                      id='subirArchivos'
                      onChange={onUploadedFileProxy}
                      type="file"
                    />
                    <label htmlFor='subirArchivos'>
                      <Button 
                        size="small"
                        variant="contained"
                        component="span"
                        className={classes.success}
                        classes={
                          {
                            root: classes.root,
                          }
                        }
                      >
                        <Nubesita 
                          className={classes.leftIcon}
                        /> Subir Archivos
                      </Button>
                    </label>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              style={
                {
                  overflow: 'auto',
                  height: 'calc(70% - 54px)',
                  flexWrap: 'unset',
                }
              }
            >
              {lista.map((ele, index) => 
                <Grid
                  item
                  key={uniqueId('list_')}
                  style={
                    {
                      width: '100%',
                    }
                  }
                >
                  <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.lista}
                  >
                    <ListItem 
                      button 
                      onClick={handleClickListaProxy(index)} 
                      divider
                      style={
                        {
                          backgroundColor: '#E0E0E0',
                        }
                      }
                    >
                      {ele.seleccionado ? <ExpandMore /> : <ChevronRight />}
                      <ListItemText 
                        primary={ele.esArchivo ? ele.label : `Rol: ${ele.label}`} 
                      />
                    </ListItem>
                    <Collapse in={ele.seleccionado} timeout="auto" unmountOnExit>
                      <Grid
                        container
                      >
                        <DataTable 
                          data = {ele.datos}
                          headers = {ele.esArchivo ? cabecerasArchivo : cabeceras}
                          configuracion = {configuracion}
                          temporal
                          params= {
                            {
                              height: 30,
                            }
                          }
                          opciones = {
                            [
                              {
                                'icon' : 'descargar', 
                                'action': onDescargarArchivo,
                              },
                              {
                                'icon' : 'eliminar', 
                                'action': onCancelarArchivo,
                              },
                            ]
                          }
                          elevacion={0}
                        />
                      </Grid>
                    </Collapse>
                  </List>
                </Grid>
              )}
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={
                {
                  paddingRight: 32,
                  height: '10%',
                }
              }
            >
              <Grid
                item
                style={
                  {
                    paddingRight: 4,
                  }
                }
              >
                <Cancelar 
                  label='Cerrar'
                  onClick={onCancelarConfiguracionProxy(false)}
                />
              </Grid>
              <Grid
                item
                style={
                  {
                    paddingLeft: 4,
                  }
                }
              >
                {activo &&
                  <Success 
                    label={idPuesto ? 'Actualizar' : 'Guardar'}
                    onClick={onGuardarConfiguracion}
                  />
                }
              </Grid>
            </Grid>
          </React.Fragment>
        }
      </Paper>
    </div>
  )
}

NuevoMolde.propTypes = {
  puesto: T.object,
  puestos: T.array,
  rol: T.object,
  roles: T.array,
  lista: T.array,
  idPuesto: T.number,
  // estaAsignando: T.bool,
  cabeceras: T.array,
  onDescargarFormato: T.func,
  onInputChangeProxy: T.func,
  handleClickListaProxy: T.func,
  onCancelarConfiguracionProxy: T.func,
  // onClickAsignar: T.func,
  onUploadedFileProxy: T.func,
  onGuardarConfiguracion: T.func,
  onDescargarArchivo: T.func,
  onEliminarArchivo: T.func,
  onCancelarArchivoProxy: T.func,
  onCancelarArchivo: T.func,
  classes: T.object,
  abrirModalArchivo: T.bool,
  cabecerasArchivo: T.array,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => (id) => (e) => {
      const {
        onChangeParametros,
        onPuestoChange,
      } = props;
      if(id === 1)
        onChangeParametros(id, e);
      else if(id === 0)
        onPuestoChange(id, e)
      else
        onChangeParametros(id, e.target.value)
    },
    handleClickListaProxy: (props) => (id) => () => {
      const {
        handleClickLista,
        handleClickListaArchivo,
        archivo,
        lista,
      } = props;
      
      if((archivo.archivos.length > 0 && id === 0) || lista[id].seleccionado)
        handleClickListaArchivo(id);
      else
        handleClickLista(id);
    },
    onUploadedFileProxy: (props) => (event)  => {
      const {
        subirArchivos,
        notificacion,
        usuario,
        lista,
        archivo,
      } = props;

      const {
        target: {
          files,
        },
      } = event;
      const formData = new FormData();
      formData.append('refId', 'formato');
      const arreglo = lista[0].esArchivo ? lista[0].datos : [];
      const {
        archivos,
      } = archivo;

      const contador = lista[0].esArchivo ? (arreglo[arreglo.length - 1].id) : 0;
      const fecha = moment().format('DD/MM/YYYY');

      let tipo = '';
      let band = true;
      
      for(let i = 0; i < files.length; i+=1){
        tipo = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
        tipo = tipo.toLowerCase();
        if(tipo.toLowerCase() === 'pdf'){
          archivos.push(files[i])
          arreglo.push(
            {
              id: contador + (i+1),
              nombre: files[i].name,
              fecha,
              usuario: usuario.nombre,
            }
          );
        } else {
          band = false;
        }
      }

      if(band){
        for (let j = 0; j < archivos.length; j+=1) {
          formData.append('files', archivos[j], archivos[j].name);
        }
        const datos = {
          esArchivo: true,
          datos: arreglo,
          label: 'Archivos Adjuntos',
          seleccionado: archivo.formData !== null ? lista[0].seleccionado : false,
          archivos: files,
        };
        subirArchivos(datos, formData, archivos)
      } else{
        notificacion({
          message: 'El tipo de archivo debe estar en formato pdf',
          options: {
            variant: 'warning',
          },
        })
      }
      
    },
    onCancelarArchivoProxy: (props) => (band) => () => {
      const {
        onCancelarArchivo,
      } = props;
      onCancelarArchivo(band);
    },
  })
)(NuevoMolde);