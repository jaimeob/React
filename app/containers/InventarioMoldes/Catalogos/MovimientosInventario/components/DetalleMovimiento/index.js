import React from 'react';
import T from 'prop-types';
import { uniqueId} from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import Input from 'components/FormInput';
// import Modal from 'components/Dialog/alertDialog';
import Seleccion from 'components/Seleccion';
import {
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Chip,
  // FormControl,

  Tooltip,
} from '@material-ui/core';
import Cancelar from 'components/BotonCancelar'
import Empty from 'images/iconos/empty.svg';

import Archivito from '@material-ui/icons/Attachment';
// import Archivito from '@material-ui/icons/InsertDriveFile';
// import { debug } from 'util';
// import UploadFile from 'utils/lib/components/uploadFile';

import PestanaSecciones from "../PestanaSecciones";
// import PruebaTabla from "../PruebaTabla";
import { Container, Section, Grid100, Grid50, Grid30, OH } from './styledComponents';

import PdfCorrecto from '../PdfCorrecto';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
  padding: {
    padding: 8,
    height: '100%',
  },
  principal: {
    padding: 8,
    height: '100%',
  },
  tab: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 1,
  },
  nubesita: {
    color : '#F9AA33',
  },
  nubesitaTriste: {
    color : 'rgba(0, 0, 0, 0.26)',
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
  },
  typography:{
    textTransform:'inherit',
  },
})

function DetalleMovimiento(props){
  const {
    // nombre,
    // version,
    // numPlantas,
    // costo,
    // proveedor,
    // material,
    pestañaSeleccionada,
    secciones,
    campos,
    tablas,
    seleccionesRows,
    rowSeleccionado,
    classes,
    plazas,   
    plantas,   
    // numPlantas,
    tiposMovimientos,
    mostrarMolde,
    hayMoldeSeleccionado,
    // materiales,
    // plantas,
    // pisos,
    // tipos,
    // guardarCompleto,
    // verDetalleSeccion,
    onInputChangeProxy,
    // onEliminarAccesorio,
    onInputChangeSeccionProxy,
    onRowMoldeSelectProxy,
    onTipoMovimientoChangeProxy,
    onInputMontoMolde,
    // onClickAgregarProxy,
    // onInputChangeAccesorioProxy,
    // onInputChangePiezaProxy,
    // onUploadedFileProxy,
    // agregarSeccionProxy,
    // onClickCancelarAccesorio,
    // onCancelarConfiguracionProxy,
    // onEditarPieza,
    // onClickAgregarPieza,
    // onClickCerrarProxy,
    // onClickGuardarProxy,
    // // agregarSeccion,
    cambiarPestaña,
    // onClickSiguiente,
    // onClickAgregar,
    // onEditarAccesorioProxy,
    // onGuardarConfiguracion,
    documentacion,
    // handleChangeArchivoProxy,
    // handleDeleteArchivoProxy,
    handleDownloadArchivoProxy,
    // onEliminarArchivoDocumentacion,
    onCancelarNuevoMovimientoProxy,
    // onGuardarNuevoMovimientoProxy,
    // onClickGuardarProxy,
    // bandModal,
    // abrirModalAgregar,
    // mensajeConfirmacion,
    // guardarMovimiento,
    esDetalleMovimiento,
    pdf,
    almacenes,
    almacenesDestino,
    comboVacio,
    plazasDestino,
    onSearchChange,
  } = props;
  
  // const configuracion = {
  //   filtro : false,
  //   descarga : false,
  //   columnas : false,
  //   imprimir : false,
  //   seleccionable: 'none',
  //   paginado: false,
  //   responsivo: "scroll",
  // };
  const labelTraspaso = campos.tipoMovimiento.valor === 5? 'Almacén destino:' : 'Almacén origen:' 
  // const onAceptarModal = bandModal === 4 ? onGuardarNuevoMovimientoProxy(true) :
  //   onCancelarNuevoMovimientoProxy(false);
  
  // const onCancelarModal = bandModal === 4 ? onGuardarNuevoMovimientoProxy(false) :
  //   onCancelarNuevoMovimientoProxy(true);
  return (
    <Container>
      <Section
        style={{backgroundColor: '#fff'}}
      >
        <OH>
          <Grid50>
            <Typography
              variant='h6'
              className={classes.typography}
            > 
                Información general
            </Typography>
          </Grid50>
        </OH>
        <OH>
          <Grid50>
            <Seleccion
              opciones={plazas}
              idOpcion='IdPlaza'
              nomOpcion='Nombre'
              requerido
              valor={campos.plaza.valor}
              onChange={onInputChangeProxy}
              label='Plazas:'
              indice={0}
              campoValido={campos.plaza.campoValido}
              inhabilitado = {esDetalleMovimiento}
            />
          </Grid50>
          <Grid50>
            <Seleccion
              opciones={almacenes}
              idOpcion='IdAlmacen'
              nomOpcion='Almacen'
              requerido
              valor={campos.almacen.valor}
              onChange={onTipoMovimientoChangeProxy}
              label={campos.tipoMovimiento.valor === 5 || campos.tipoMovimiento.valor === 6?labelTraspaso:'Almacén:'}
              indice={3}
              campoValido={campos.almacen.campoValido}
              inhabilitado = {esDetalleMovimiento}
            />
          </Grid50>
          <Grid50>
            <Seleccion
              opciones={tiposMovimientos}
              idOpcion='IdTipo'
              nomOpcion='Nombre'
              requerido
              valor={campos.tipoMovimiento.valor}
              onChange={onTipoMovimientoChangeProxy}
              label='Tipos movimientos:'
              indice={1}
              campoValido={campos.tipoMovimiento.campoValido }
              inhabilitado = {esDetalleMovimiento}
            />
          </Grid50>
        </OH>
        <OH>
          <Grid100>
            <Input
              onChange={onInputChangeProxy}
              nomCampo='Observaciones:'
              tipoInput='text'
              longitud='80'
              // requerido
              isComplete={campos.observacion.campoValido}
              valor={campos.observacion.valor}
              indice={2}
              inhabilitado = {esDetalleMovimiento ? 1:0}
            />
          </Grid100>
        </OH>
        <OH>
          <Grid30>
            <Typography
              variant="h6"
              className={classes.typography}
              style={{marginTop: 15}}
            >
              Documentación
            </Typography>
          </Grid30>
        </OH>
        <OH>
          <Grid50>
            {documentacion.archivos.map((ele, indice) => 
              <div>
                <Tooltip 
                  // eslint-disable-next-line react/no-array-index-key
                  key={uniqueId('archivodocumentacion_')}
                  title = {
                    ele.Nombre}
                >
                  <Chip
                    icon={<Archivito/>}
                    label={
                      ele.Nombre.substring(0,40)
                    }
                    style={{fontSize: '0.7em', marginRight: 8,backgroundColor:'white'}}
                    onClick={handleDownloadArchivoProxy(indice)}
                    // onDelete={handleDeleteArchivoProxy(indice)}
                  />
                </Tooltip>
              </div>
            )}
          </Grid50>
        </OH>
        <div style={{position: 'absolute', bottom: 15, right: 175}}>
          <Cancelar 
            label='Cerrar'
            onClick={onCancelarNuevoMovimientoProxy(false)}
          />
        </div>
        <div style={{position: 'absolute', bottom: 15, right: 15}}>
          <PdfCorrecto
            pdf={pdf} 
            title="Movimiento-inventario"
          />
        </div>
      </Section>
      <Section
        style={{backgroundColor: '#fff', borderLeft: '2px solid rgb(195, 193, 193)'}}
      >
        <AppBar 
          color="inherit" 
          position="static" 
          style={
            {
              backgroundColor: '#fff',
              height: '100%',
            }
          }
        >
          <Toolbar 
            variant="dense" 
            style={
              {
                padding: 'initial',
                borderBottom: '2px solid rgb(195, 193, 193)',
              }
            }
          >
            <Tabs 
              value={pestañaSeleccionada} 
              onChange={cambiarPestaña} 
              // value = ""
              variant="fullWidth" 
              style={
                {
                  width: '100%',
                }
              }
            >
              <Tab className={classes.tab} label="Moldes"/>
              <Tab className={classes.tab} label="Piezas"/> :
              <Tab className={classes.tab} label="Accesorios"/>
              {/* {!secciones.esAccesorio &&  
              }
              {!secciones.esAccesorio ? 
              } */}
            </Tabs>
          </Toolbar>

          {/* Falta utilizarlo asi */}
          {/* {!isEmpty(secciones.seccionSlc) ?  */}

          {mostrarMolde ?
            <PestanaSecciones 
              pestañaSeleccionada={pestañaSeleccionada}
              plantas={plantas}
              secciones={secciones}
              campos={campos}
              seleccionesRows={seleccionesRows}
              tablas={tablas}
              rowSeleccionado={rowSeleccionado}
              onInputChange={onInputChangeSeccionProxy}
              mostrarMolde={mostrarMolde}
              hayMoldeSeleccionado = {hayMoldeSeleccionado}
              onRowMoldeSelectProxy={onRowMoldeSelectProxy}
              onInputMontoMolde={onInputMontoMolde}
              tipoMovimientoSeleccionado={campos.tipoMovimiento.valor}
              cambiarPestaña={cambiarPestaña}
              esDetalleMovimiento={esDetalleMovimiento}
              almacenesDestino={almacenesDestino}
              comboVacio={comboVacio}
              plazasDestino={plazasDestino}
              onSearchChange={onSearchChange}
            />
            :
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <img
                  key="imagenKey"
                  src={Empty}
                  alt="logo-Pfd"
                />
              </Grid>
              <Grid
                item
              >
                <Typography
                  variant='h5'
                >
                  Selecciona un tipo de movimiento para iniciar
                </Typography>
              </Grid>
            </Grid> 
          }
        </AppBar>
      </Section>
    </Container>
  )
}

DetalleMovimiento.propTypes = {
  // nombre: T.object,
  // version: T.object,
  // numPlantas: T.object,
  // costo: T.object,
  // proveedor: T.object,
  // material: T.object,
  pestañaSeleccionada: T.number,
  secciones: T.object,
  campos: T.object,
  seleccionesRows: T.object,
  classes: T.object,
  // proveedores: T.array,
  // materiales: T.array,
  plantas: T.array,
  tablas: T.array,
  rowSeleccionado: T.number,
  // tipos: T.array,
  plazas: T.array,
  tiposMovimientos: T.array,
  // verDetalleSeccion: T.func,
  onTipoMovimientoChangeProxy: T.func,
  onInputChangeProxy: T.func,
  onInputChangeSeccionProxy: T.func,
  onRowMoldeSelectProxy: T.func,
  onInputMontoMolde:T.func,
  documentacion: T.object,
  // handleChangeArchivoProxy: T.func,
  // handleDeleteArchivoProxy: T.func,
  handleDownloadArchivoProxy: T.func,
  // onInputChangePiezaProxy: T.func,
  // onInputChangeAccesorioProxy: T.func,
  // onUploadedFileProxy: T.func,
  // onClickAgregarProxy: T.func,
  // agregarSeccionProxy: T.func,
  // onEliminarAccesorio: T.func,
  // onEditarPieza: T.func,
  // onClickAgregarPieza: T.func,
  // agregarSeccion: T.func,
  cambiarPestaña: T.func,
  // onClickSiguiente: T.func,
  // onClickAgregar: T.func,
  // onEditarAccesorioProxy: T.func,
  // onClickCancelarAccesorio: T.func,
  
  // onClickCerrarProxy: T.func,
  // onClickGuardarProxy: T.func,
  // onGuardarConfiguracion: T.func,
  // guardarMovimiento: T.bool,
  mostrarMolde: T.bool,
  hayMoldeSeleccionado: T.bool,
  // onEliminarArchivoDocumentacion: T.func,
  onCancelarNuevoMovimientoProxy: T.func,
  // onGuardarNuevoMovimientoProxy: T.func,
  // onClickGuardarProxy: T.func,
  // bandModal: T.number,
  // abrirModalAgregar: T.bool,
  // mensajeConfirmacion: T.string,
  esDetalleMovimiento: T.bool,
  pdf: T.object,
  almacenes: T.array,
  almacenesDestino: T.array,
  comboVacio: T.array,
  plazasDestino: T.array,
  onSearchChange: T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
    // agregarSeccionProxy: (props) => (band) => () => {
    //   const {
    //     agregarSeccion,
    //   } = props;
    //   agregarSeccion(band);
    // },
    // onEditarAccesorioProxy: (props) => (id) => {
    //   const {
    //     onEditarAccesorio,
    //   } = props;
    //   onEditarAccesorio(id);
    // },
    // onCancelarNuevoMovimientoProxy: (props) => (band) => () => {
    //   const {
    //     onCancelarConfiguracion,
    //   } = props;
    //   onCancelarConfiguracion(band);
    // },
    // onClickCerrarProxy: (props) => (band) => () => {
    //   const {
    //     onClickCerrar,
    //   } = props;
    //   onClickCerrar(band)
    // },
    // onClickGuardarProxy: (props) => (id) => () => {
    //   const {
    //     onClickGuardarAccesorio,
    //     onClickGuardarPieza,
    //   } = props;

    //   if(id === 0){
    //     onClickGuardarPieza();
    //   } else {
    //     onClickGuardarAccesorio();
    //   }
    // },
    // onClickAgregarProxy: (props) => (id) => () => {
    //   const {
    //     onClickAgregarAccesorio,
    //     onClickAgregarPieza,
    //   } = props;
    //   if(id === 0){
    //     onClickAgregarPieza();
    //   } else {
    //     onClickAgregarAccesorio();
    //   }
    // },

    onTipoMovimientoChangeProxy: (props) => (id) => (e) => {
      const {
        onTipoMovimientoChange,
      } = props;
      onTipoMovimientoChange(id, e.target.value);
      // if(id === 4)
      //   onInputChange(id, e)
      // else
      //   onInputChange(id, e.target.value);
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

    onRowMoldeSelectProxy: (props) => (rowSeleccionado,seleccionados) => {
      const {
        tablas,
        pestañaSeleccionada,
        onMoldeSeleccionadoChange,
      } = props

      const rowSeleccionados = [] 

      seleccionados.forEach((seleccionado) => {
        rowSeleccionados.push(seleccionado.index)
      })

      
      let idMolde

      if (pestañaSeleccionada === 0 ){
        const {
          index,
        } = rowSeleccionado[0]

        if (seleccionados.length > 0){
          // eslint-disable-next-line prefer-destructuring
          idMolde = tablas.molde.datos[index].idMolde
        }
      }

      onMoldeSeleccionadoChange(rowSeleccionados,idMolde,pestañaSeleccionada)

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
    // onUploadedFileProxy: (props) => (file) => {
    //   const {
    //     uploadPlano,
    //     notificacion,
    //   } = props;
      
    //   const fileJs = file.event;
    //   const formData = new FormData();
    //   const {
    //     type: mimeType,
    //   } = file;
  
    //   if (!['image/jpeg', 'image/png', 'image/jpg'].includes(mimeType)) {
    //     notificacion({
    //       message: 'El tipo de archivo debe ser una imagen con formato válido',
    //       options: {
    //         variant: 'warning',
    //       },
    //     })
    //   } else {
    //     formData.append('files', fileJs);
    //     uploadPlano(file, formData);
    //   }
    // },
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
    onCancelarNuevoMovimientoProxy: (props) => (band) => () => {
      const {
        onCancelarNuevoMovimiento,
      } = props;
      onCancelarNuevoMovimiento(band);
    },

    onGuardarNuevoMovimientoProxy: (props) => (band) => () => {
      const {
        onAgregarNuevoMovimiento,
      } = props;
      onAgregarNuevoMovimiento(band);
    },

    onClickGuardarProxy: (props) => (band) => () => {
      const {
        handleAbrirModalAgregar,
      } = props;
      handleAbrirModalAgregar(band);
    },
    
    agregarMovimientoProxy: (props) => (band) => () => {
      const {
        agregarMovimiento,
      } = props;
      agregarMovimiento(band);


    },

  })
)(DetalleMovimiento);