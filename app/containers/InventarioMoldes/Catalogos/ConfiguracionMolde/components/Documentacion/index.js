import React from 'react';
import T from 'prop-types';
import { compact, uniqueId} from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import {
  Grid,
  ListItem,
  Chip,
  ListItemText,
  Collapse,
  List,
  FormControl,
  Typography,
  Button,
  Tooltip,
} from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DataTable from 'components/DataTable';
import Archivito from '@material-ui/icons/InsertDriveFile';
import Nubesita from '@material-ui/icons/CloudUpload';
import Modal from 'components/Dialog/alertDialog';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
  collapse: {
    height: 'calc(100% - 92px) !important',
  },
  wrapper: {
    height: '100%',
  },
})

function Documentacion(props){
  const {
    handleClickProxy,
    secciones,
    documentacion,
    handleDownloadArchivoProxy,
    handleDeleteArchivoProxy,
    handleChangeArchivoProxy,
    onEliminarArchivoDocumentacion,
    verPlano,
    classes,
  } = props;

  const datosTabla = 
    compact(
      secciones.datos.map((ele) => !ele.esAccesorio ? ele : null)
    )
  
  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'none',
    paginado: false,
    responsivo: "scroll",
  };

  return (
    <Grid
      container
      direction="column"
      style={
        {
          height: '100%',
        }
      }
    >
      <Modal 
        open={documentacion.eliminarArchivo}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message='¿Esta seguro que desea eliminar la configuración del molde?'
        onClickAccept={onEliminarArchivoDocumentacion}
        onClickCancel={handleDeleteArchivoProxy(false)}
      />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
        style={
          {
            height: '100%',
          }
        }
      >
        <ListItem 
          button 
          onClick={handleClickProxy(0)} 
          style={
            {
              borderBottom: '4px solid rgb(40,60,167)',
            }
          }
        >
          <ListItemText primary="Planos" />
          {documentacion.listaSlc === 0 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={documentacion.listaSlc === 0} timeout="auto" unmountOnExit>
          <Grid
            container
          >
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
            >
              <DataTable
                data = {datosTabla}
                elevacion={0}
                temporal
                headers = {secciones.cabeceras}
                configuracion = {configuracion}
                opciones = {
                  [
                    {'icon' : 'ver', 'action': verPlano},
                  ]
                }
              />
            </Grid>
            {documentacion.imagenSlc && 
              <Grid
                container
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <Typography
                    variant='h6'
                  >
                    Planos
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <img 
                    src={documentacion.imagenSlc}
                    style={{ width:'700px',height: '400px'}}
                    alt=""
                  />
                </Grid>
              </Grid>
            }
          </Grid>
        </Collapse>
        <ListItem 
          button
          onClick={handleClickProxy(1)}
          style={
            {
              borderBottom: '4px solid rgb(167,40,40)',
            }
          }  
        >
          <ListItemText primary="Otros" />
          {documentacion.listaSlc === 1 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse 
          in={documentacion.listaSlc === 1} 
          timeout="auto" 
          unmountOnExit
          className={classes.collapse}
          classes={
            {
              wrapper: classes.wrapper,
            }
          }
        >
          <Grid
            container
            style={
              {
                height: '100%',
              }
            }
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={
                {
                  height: '100%',
                }
              }
            >
              <FormControl
                style={
                  {
                    padding: 16,
                  }
                }
              >
                <input
                  accept="*"
                  multiple
                  style={{display: 'none'}}
                  id='subirArchivos'
                  onChange={handleChangeArchivoProxy}
                  type="file"
                />
                <label htmlFor='subirArchivos'>
                  <Button 
                    size="small"
                    variant="contained"
                    component="span"
                  >
                    <Nubesita /> Subir Archivos
                  </Button>
                </label>
              </FormControl>
              <Grid
                container
                direction="column"
                spacing={8}
                style={
                  {
                    height: 'calc(100% - 100px)',
                  }
                }
              >
                {documentacion.archivos.map((ele, indice) => 
                  <Grid
                    item
                    style={
                      {
                        paddingLeft: 16,
                      }
                    }
                  >
                    <Tooltip 
                    // eslint-disable-next-line react/no-array-index-key
                      key={uniqueId('archivodocumentacion_')}
                      title = {
                        ele.name}
                    >
                      <Chip
                        icon={<Archivito />}
                        label={
                          ele.name.substring(0,40)
                        }
                        style={{fontSize: '0.7em', marginRight: 8}}
                        onClick={handleDownloadArchivoProxy(indice)}
                        onDelete={handleDeleteArchivoProxy(indice)}
                      />
                    </Tooltip>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </List>
    </Grid>
  )
}

Documentacion.propTypes = {
  secciones: T.object,
  classes: T.object,
  handleClickProxy: T.func,
  documentacion: T.object,
  handleDownloadArchivoProxy: T.func,
  handleDeleteArchivoProxy: T.func,
  handleChangeArchivoProxy: T.func,
  verPlano: T.func,
  onEliminarArchivoDocumentacion: T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
    handleDownloadArchivoProxy: (props) => (band) => () => {
      const {
        handleDownloadArchivo,
      } = props;
      handleDownloadArchivo(band);
    },
    handleChangeArchivoProxy: (props) => (event) => {
      
      const archivosValidos = [
        'xlsx', 
        'xls', 
        'pdf', 
        'doc', 
        'docx', 
        'png', 
        'jpg', 
        'jpeg',
      ];
      const formData = new FormData();
      const arreglo = [];
      let band = false;
      const {
        notificacion,
        handleChangeArchivo,
      } = props;
      let tipo = '';

      const {
        target: {
          files,
        },
      } = event;

      for(let i = 0; i < files.length; i+=1){
        tipo = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
        tipo = tipo.toLowerCase();
        if(archivosValidos.includes(tipo.toLowerCase())){
          if(files[i].size > 5242880){
            notificacion({
              message: 'El tamaño del archivo sobrepasa el limite permitido',
              options: {
                variant: 'warning',
              },
            })
          } else {
            band = true;
            formData.append('files',files[i]);
            arreglo.push(files[i]);
          }
        } else {
          notificacion({
            message: 'Archivos no admitidos',
            options: {
              variant: 'warning',
            },
          })
        }
      }
      event.target.value = null;
      if(band)
        handleChangeArchivo(formData, arreglo);
    },
    handleDeleteArchivoProxy: (props) => (band) => () => {
      const {
        handleDeleteArchivo,
      } = props;
      handleDeleteArchivo(band);
    },
    handleClickProxy: (props) => (band) => () => {
      const {
        handleClickList,
      } = props;
      handleClickList(band);
    },
    onEditarAccesorioProxy: (props) => (id) => {
      const {
        onEditarAccesorio,
      } = props;
      onEditarAccesorio(id);
    },
    onCancelarConfiguracionProxy: (props) => (band) => () => {
      const {
        onCancelarConfiguracion,
      } = props;
      onCancelarConfiguracion(band);
    },
    onClickCerrarProxy: (props) => (band) => () => {
      const {
        onClickCerrar,
      } = props;
      onClickCerrar(band)
    },
    onClickGuardarProxy: (props) => (id) => () => {
      const {
        onClickGuardarAccesorio,
        onClickGuardarPieza,
      } = props;

      if(id === 0){
        onClickGuardarPieza();
      } else {
        onClickGuardarAccesorio();
      }
    },
    onClickAgregarProxy: (props) => (id) => () => {
      const {
        onClickAgregarAccesorio,
        onClickAgregarPieza,
      } = props;
      if(id === 0){
        onClickAgregarPieza();
      } else {
        onClickAgregarAccesorio();
      }
    },
    onInputChangeProxy: (props) => (id) => (e) => {
      const {
        onInputChange,
      } = props;
      if(id === 4)
        onInputChange(id, e)
      else
        onInputChange(id, e.target.value);
    },
    onInputChangeSeccionProxy: (props) => (id) => (e) => {
      const {
        onInputChangeSeccion,
      } = props;
      onInputChangeSeccion(id, e.target.value);
    },
    onInputChangePiezaProxy: (props) => (id) => (e) => {
      const {
        onInputChangePieza,
      } = props;

      let {
        target: {
          value,
        },
      } = e;
      
      if(id !== 0){
        value = value <= 0 && value !== '' ? 0 : value;
      }

      onInputChangePieza(id, value);
    },
    onInputChangeAccesorioProxy: (props) => (id) => (e) => {
      const {
        onInputChangeAccesorio,
      } = props;
      let {
        target: {
          value,
        },
      } = e;
      
      if(id !== 0){
        value = value <= 0 && value !== '' ? 0 : value;
      }

      onInputChangeAccesorio(id, value);
    },
    onUploadedFileProxy: (props) => (file) => {
      const {
        uploadPlano,
        notificacion,
      } = props;
      
      const fileJs = file.event;
      const formData = new FormData();
      const {
        type: mimeType,
      } = file;
  
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(mimeType)) {
        notificacion({
          message: 'El tipo de archivo debe ser una imagen con formato válido',
          options: {
            variant: 'warning',
          },
        })
      } else {
        formData.append('files', fileJs);
        uploadPlano(file, formData);
      }
    },
  })
)(Documentacion);