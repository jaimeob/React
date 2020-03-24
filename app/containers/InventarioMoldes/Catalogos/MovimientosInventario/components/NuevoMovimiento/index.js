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
  Button,
  Tooltip,
  TextField,
} from '@material-ui/core';
import Success from 'components/BotonSuccess'
import Cancelar from 'components/BotonCancelar'
import Empty from 'images/iconos/empty.svg';
import Nubesita from '@material-ui/icons/CloudUpload';
import Archivito from '@material-ui/icons/Attachment';
// import Archivito from '@material-ui/icons/InsertDriveFile';
// import { debug } from 'util';
// import UploadFile from 'utils/lib/components/uploadFile';
import Modal from 'components/Dialog/alertDialog';
import PestanaSecciones from "../PestanaSecciones";
// import PruebaTabla from "../PruebaTabla";
import { Container, Section, Grid50, Grid30 } from './styledComponents';


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

function NuevoMovimiento(props){
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
    plazasDestino,   
    plantas,   
    // numPlantas,
    tiposMovimientos,
    almacenes,
    almacenesDestino,
    comboVacio,
    mostrarMolde,
    hayMoldeSeleccionado,
    // materiales,
    // plantas,
    // pisos,
    // tipos,
    // guardarCompleto,
    // verDetalleSeccion,
    onInputChangeProxy,
    onInputFolioChangeProxy,
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
    handleChangeArchivoProxy,
    handleDeleteArchivoProxy,
    handleDownloadArchivoProxy,
    onEliminarArchivoDocumentacion,
    onCancelarNuevoMovimientoProxy,
    onGuardarNuevoMovimientoProxy,
    onClickGuardarProxy,
    bandModal,
    abrirModalAgregar,
    mensajeConfirmacion,
    guardarMovimiento,
    esDetalleMovimiento,
    onInputFolio,
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

  const onAceptarModal = bandModal === 4 ? onGuardarNuevoMovimientoProxy(true) :
    onCancelarNuevoMovimientoProxy(false);
  
  const onCancelarModal = bandModal === 4 ? onGuardarNuevoMovimientoProxy(false) :
    onCancelarNuevoMovimientoProxy(true);

  return (
    <Container>
      <Section
        style={{backgroundColor: '#fff'}}
      >
        <div>
          <Typography
            variant='h6'
            className={classes.typography}
          > 
              Información general
          </Typography>
          <div>
            <Grid50>
              <Seleccion
                opciones={plazas}
                idOpcion='IdPlaza'
                nomOpcion='Nombre'
                requerido
                valor={campos.plaza.valor}
                onChange={onTipoMovimientoChangeProxy}
                label='Plazas:'
                indice={0}
                campoValido={campos.plaza.campoValido}
              />
            </Grid50>
            <Grid50>
              <Seleccion
                opciones={almacenes.length>0 ? almacenes : comboVacio}
                idOpcion='IdAlmacen'
                nomOpcion='Almacen'
                requerido
                valor={campos.almacen.valor}
                onChange={onTipoMovimientoChangeProxy}
                label={campos.tipoMovimiento.valor === 5 || campos.tipoMovimiento.valor === 6?labelTraspaso:'Almacén:'}
                indice={4}
                campoValido={campos.almacen.campoValido}
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
                campoValido={campos.tipoMovimiento.campoValido}
              />
            </Grid50>
            {campos.tipoMovimiento.valor === 5? 
              <div style={{overflow: 'hidden', width: '100%'}}>
                <Grid30>
                  <TextField
                    id="standard-name"
                    label="Folio"
                    className={classes.textField}
                    style={{marginTop: 0}}
                    margin="normal"
                    type="text"
                    value={campos.folio.valor}
                    error={!campos.folio.campoValido}
                    onChange={onInputFolioChangeProxy}
                    onKeyDown={event => {
                      if (event.keyCode === 13 || event.keyCode === 9) {
                        onInputFolio(campos.folio.valor)
                      }
                    }}
                  />
                </Grid30>
              </div>
              : null}
            <div style={{padding: '0 15px'}}>
              <Input
                onChange={onInputChangeProxy}
                nomCampo='Observaciones:'
                tipoInput='text'
                longitud='80'
                requerido
                isComplete={campos.observacion.campoValido}
                valor={campos.observacion.valor}
                indice={2}
              />
            </div>
          </div>
          <div
            style={{overflow: 'hidden', marginTop: 15}}
          >
            <Grid50>
              <Typography
                variant="h6"
                className={classes.typography}
              >
              Documentación
              </Typography>
            </Grid50>
            <Grid50>
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
                  className={classes.success}
                >
                  <Nubesita
                    className={classes.leftIcon}
                  />
                    Subir Archivos
                </Button>
              </label>
            </Grid50>
          </div>
          <div
            style={{overflow: 'hidden'}}
          >
            <Grid50>
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
                      icon={<Archivito/>}
                      label={
                        ele.name.substring(0,40)
                      }
                      style={{fontSize: '0.7em', marginRight: 8,backgroundColor:'white'}}
                      onClick={handleDownloadArchivoProxy(indice)}
                      onDelete={handleDeleteArchivoProxy(indice)}
                    />
                  </Tooltip>
                </Grid>
              )}
            </Grid50>
          </div>
          <div style={{overflow: 'hidden'}}>
            <div style={{position: 'absolute', bottom: 15, right: 15}}>
              <Success 
                label='Guardar'
                disabled={!guardarMovimiento}
                onClick={onClickGuardarProxy(true)}
              />
            </div>
            <div style={{position: 'absolute', bottom: 15, right: 115}}>
              <Cancelar 
                label='Cerrar'
                onClick={onCancelarNuevoMovimientoProxy(false)}
              />
            </div>
          </div>
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
              plazasDestino={plazasDestino}
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
              onSearchChange={onSearchChange}
            // onInputChangeAccesorio={onInputChangeAccesorioProxy}
            // onInputChangePieza={onInputChangePiezaProxy}
            // onUploadedFileProxy={onUploadedFileProxy}
            // onClickSiguiente={onClickSiguiente}
            // onClickAgregar={onClickAgregar}
            // onClickAgregarProxy={onClickAgregarProxy}
            // onClickGuardarProxy={onClickGuardarProxy}
            // onEliminarAccesorio={onEliminarAccesorio}
            // tipos={tipos}
            // onClickCerrar={onClickCerrarProxy}
            // onEditarAccesorio={onEditarAccesorioProxy}
            // onClickCancelarAccesorio={onClickCancelarAccesorio}
            // onClickAgregarPieza={onClickAgregarPieza}
            // onEditarPieza={onEditarPieza}
            />
            :
            // <PruebaTabla
            //   onRowsSelect = {onTableChangeMolde}
            // />

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
                  { campos.tipoMovimiento.valor !== 5 ? 'Selecciona un tipo de movimiento para iniciar':'Capture un folio para iniciar'}
                </Typography>
              </Grid>
            </Grid> 
          }
        </AppBar>
      </Section>
      <Modal 
        open={documentacion.eliminarArchivo}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message='¿Está seguro que desea eliminar el archivo seleccionado?'
        onClickAccept={onEliminarArchivoDocumentacion}
        onClickCancel={handleDeleteArchivoProxy(false)}
      />
      <Modal 
        open={abrirModalAgregar}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message={mensajeConfirmacion}
        onClickAccept={onAceptarModal}
        onClickCancel={onCancelarModal}
      />
    </Container>
  )
}

NuevoMovimiento.propTypes = {
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
  plazasDestino: T.array,
  tiposMovimientos: T.array,
  almacenes: T.array,
  almacenesDestino: T.array,
  comboVacio:T.array,
  // verDetalleSeccion: T.func,
  onTipoMovimientoChangeProxy: T.func,
  onInputChangeProxy: T.func,
  onInputFolioChangeProxy: T.func,
  onInputChangeSeccionProxy: T.func,
  onRowMoldeSelectProxy: T.func,
  onInputMontoMolde:T.func,
  documentacion: T.object,
  handleChangeArchivoProxy: T.func,
  handleDeleteArchivoProxy: T.func,
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
  guardarMovimiento: T.bool,
  mostrarMolde: T.bool,
  hayMoldeSeleccionado: T.bool,
  onEliminarArchivoDocumentacion: T.func,
  onCancelarNuevoMovimientoProxy: T.func,
  onGuardarNuevoMovimientoProxy: T.func,
  onClickGuardarProxy: T.func,
  bandModal: T.number,
  abrirModalAgregar: T.bool,
  mensajeConfirmacion: T.string,
  esDetalleMovimiento: T.bool,
  onInputFolio: T.func,
  onSearchChange:T.func,
};



export default compose(
  withStyles(styles),
  withHandlers({
    onTipoMovimientoChangeProxy: (props) => (id) => (e) => {
      const {
        onTipoMovimientoChange,
        onInputPlazaChange,
      } = props;


      if(id === 0){
        onInputPlazaChange(id, e.target.value);
      }else{
        onTipoMovimientoChange(id, e.target.value);
      }
      // if(id === 4)
      //   onInputChange(id, e)
      // else
      //   onInputChange(id, e.target.value);
    },
    onInputFolioChangeProxy: (props) => (e) => {
      const {
        onInputFolioChange,
      } = props;
      onInputFolioChange(e.target.value)
    },

    onInputChangeProxy: (props) => (id) => (e) => {
      const {
        onInputChange,
        onInputFolio,
        campos,
      } = props;
      // Aqui mandar a llamar el molde con ese folio
      // onInputPlazaChangeAction(id, e.target.value);
      if (campos.tipoMovimiento.valor === 5 && id === 3 && e.keyCode === 13 || e.keyCode === 9){
        onInputFolio(id,e.target.value)
      }else{
        onInputChange(id, e.target.value);
      }
    },

    onInputChangeSeccionProxy: (props) => (id) => (e) => {
      const {
        onInputChangeSeccion,
        onInputPlazaDestinoChange,
      } = props;

      if(id === 2){
        onInputPlazaDestinoChange(id, e.target.value);
      }else{
        onInputChangeSeccion(id, e.target.value);
      }
    },

    onRowMoldeSelectProxy: (props) => (rowSeleccionado,seleccionados) => {
      const {
        tablas,
        pestañaSeleccionada,
        onMoldeSeleccionadoChange,
      } = props

      const rowSeleccionados = [] 

      seleccionados.forEach((seleccionado) => {
        rowSeleccionados.push(seleccionado.dataIndex)
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
)(NuevoMovimiento);