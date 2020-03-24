import React from 'react';
import T from 'prop-types';
import { isEmpty,uniqueId,isString,isNumber,isUndefined,isInteger} from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import Input from 'components/FormInput';
import Modal from 'components/Dialog/alertDialog';
import Seleccion from 'components/Seleccion';
// import FiltroSeleccion from 'components/FiltroSeleccion';
import Button from '@material-ui/core/Button';
import XLSX from 'xlsx';
import {
  Grid,
  FormControl,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  ListItem,
  ListItemText,
  Chip,
  Tooltip,
  // InputBase,
} from '@material-ui/core';
import Empty from 'images/iconos/empty.svg';
import DataTable from 'components/DataTable';
import Success from 'components/BotonSuccess'
import Cancelar from 'components/BotonCancelar'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Nubesita from '@material-ui/icons/CloudUpload';
import Archivo from '@material-ui/icons/Attachment';
import SubirArchivoIcon from '@material-ui/icons/CloudUploadOutlined';
import PestanaSecciones from "../PestanaSecciones";
import PdfCorrecto from '../PdfCorrecto'
import { Container, Section, Grid50, Grid40,  Grid20, Grid60, Grid80} from './styledComponents';



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
    // padding: 8,
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
  botonPlano:{
    color: '#FF0023',
    opacity: 0.75,
  },
  botonImportar: {
    backgroundColor: 'transparent',
    '&:disabled': {
      backgroundColor: '#BFBFBF',
    },
    // '&:hover': {
    //   backgroundColor: '#1d7109',
    // },
    color: '#3f51b5',
    marginLeft: 15,
    marginTop: 15,
    // marginBottom: '-70px',
    position: 'relative', 
    zIndex: 1,
  },
  botonSiguiente: {
    backgroundColor: 'transparent',
    '&:disabled': {
      backgroundColor: '#BFBFBF',
    },
    color: '#3f51b5',
  },
})
// style={{color: '#3f51b5', marginLeft: 7, marginBottom: '-70px', position: 'relative', zIndex: 1, width: '100%'}}
// const changeCase = require('change-case')
// const deshabilitar = true
function NuevoMolde(props){
  const {
    nombre,
    version,
    numPlantas,
    costo,
    proveedor,
    material,
    secciones,
    classes,
    proveedores,
    materiales,
    plantas,
    // pisos,
    tipos,
    guardarCompleto,
    verDetalleSeccion,
    onInputChangeProxy,
    onEliminarAccesorio,
    onInputChangeSeccionProxy,
    onClickAgregarProxy,
    onInputChangeAccesorioProxy,
    onInputChangePiezaProxy,
    onUploadedFileProxy,
    agregarSeccionProxy,
    onClickCancelarAccesorio,
    onCancelarConfiguracionProxy,
    onEditarPieza,
    onClickAgregarPieza,
    onClickCerrarProxy,
    onClickGuardarProxy,
    // agregarSeccion,
    cambiarPestaña,
    onClickSiguiente,
    onClickAgregar,
    onEditarAccesorioProxy,
    onGuardarConfiguracion,
    etapaNuevoMolde,
    primerPaso,
    segundoPaso,
    tercerPaso,
    esDetalleMolde,
    handleClickItemProxy,
    handleChangeArchivoProxy,
    handleDeleteArchivoProxy,
    handleDownloadArchivoProxy,
    documentacion,
    handleImportarExcelProxy,
    onAceptarAvisoProxy,
    notificacion,
    // onInputChangePlantasProxy,
  } = props;
  
  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'none',
    paginado: false,
    responsivo: "scroll",
    ordenar: false,
  };
  // const existenDatos = false
  const arraySecciones = secciones.datos.filter(seccion =>  seccion.insumos >0)
  
  const tamañoApp = etapaNuevoMolde === 1 && arraySecciones.length>10 ?'120%':'100%'

  let guardarAccesorio = arraySecciones.length > 0
  for (let i = 0; i < arraySecciones.length; i+=1) {
    if (!arraySecciones[i].esAccesorio){
      guardarAccesorio = false
    }
  }


  const guardarTercerPaso = (guardarAccesorio || tercerPaso)

  // disabled={(!guardarCompleto || !guardarTercerPaso || etapaNuevoMolde !== 2)}

  // if (secciones.datos.length>0){
  //   const datosInsumos = secciones.datos.filter(seccion=> seccion.insumos>0)
  //   existenDatos=true
  // }

  const piezas = []
  const accesorios = []
  if(etapaNuevoMolde === 2){
    const seccionesPiezas = secciones.datos.filter(dato=> !dato.esAccesorio)
    seccionesPiezas.forEach((datoSeccion) => {
      datoSeccion.datos.forEach((pieza) => {
        piezas.push({planta: datoSeccion.plantaTabla, seccion: datoSeccion.nombreTabla, 
          idPieza: pieza.idPieza, nombre: pieza.nombre, pieza:pieza.pieza,
          cantPiezas: 1})
      })
    })
    
    const seccionesAccesorios= secciones.datos.filter(dato=> dato.esAccesorio)
    seccionesAccesorios.forEach((datoSeccion) => {
      datoSeccion.datos.forEach((accesorio) => {
        // accesorios.push(accesorio)
        accesorios.push({planta: datoSeccion.plantaTabla, seccion: datoSeccion.nombreTabla, 
          idAccesorio: accesorio.idAccesorio, nombre: accesorio.nombre,
          cantPiezas: accesorio.cantPiezas})
      })
    })
    // }
    // if (!isUndefined(accesorios)){
  }

  const onAceptarAviso = etapaNuevoMolde === 0 ? handleClickItemProxy(1,true): onAceptarAvisoProxy(true)
  const onCancelarAviso = onAceptarAvisoProxy(false)

  const onAceptarModal = secciones.bandModal === 4 ? agregarSeccionProxy(false) :
    onCancelarConfiguracionProxy(false);
  
  const onCancelarModal = secciones.bandModal === 4 ? agregarSeccionProxy(true) :
    onCancelarConfiguracionProxy(true);


  for (let i = 0; i < secciones.datos.length; i+=1) {
    secciones.datos[i].area = secciones.datos[i].area.toFixed(2)
  }
  

  for (let i = 0; i < secciones.planos.datos.length; i+=1) {
    const archivo = documentacion.planos.filter(datoArchivo=> datoArchivo.planta === secciones.planos.datos[i].planta)
    // eslint-disable-next-line no-nested-ternary
    const nombreArchivo = archivo.length>0?archivo[0].File? `${archivo[0].File.name}`: `${archivo[0].name}`:''
    secciones.planos.datos[i].planos =
    // eslint-disable-next-line no-nested-ternary
    // esDetalleInventario? 
      // tablas.piezas.datos[i].NombreEvidencia !== ''?
      //   <Grid
      //     item
      //   >
      //     <Tooltip 
      //     // eslint-disable-next-line react/no-array-index-key
      //       key={uniqueId('archivodocumentacion_')}
      //       title = {tablas.piezas.datos[i].NombreEvidencia}
      //     >
      //       <Chip
      //         icon={<Archivo/>}
      //         label={tablas.piezas.datos[i].NombreEvidencia.substring(0,40)}
      //         style={{fontSize: '1em', marginRight: 8}}
      //         onClick={handleDownloadArchivoProxy(0,i)}
      //         // onDelete={handleDeleteArchivoProxy(0,i)}
      //       />
      //     </Tooltip>
      //   </Grid>
      //   :null
      // :
      secciones.planos.datos[i].planos.length > 0 ?
        <div>
          <Tooltip 
          // eslint-disable-next-line react/no-array-index-key
            key={uniqueId('archivodocumentacion_')}
            title = {nombreArchivo}
          >
            <Chip
              icon={<Archivo/>}
              label={nombreArchivo.substring(0,40)}
              style={{fontSize: '1em', marginRight: 8}}
              onClick={handleDownloadArchivoProxy(i,1)}
              onDelete={handleDeleteArchivoProxy(i,1)}
            />
          </Tooltip>
        </div>
        :
        <div>
          <input
            accept="*"
            style={{display: 'none'}}
            id={`subirArchivosPlanos_${i}`}
            onChange={handleChangeArchivoProxy(1,secciones.planos.datos[i].planta)}
            type="file"
          />
          <label htmlFor={`subirArchivosPlanos_${i}`}>
            <SubirArchivoIcon
              style={{cursor: 'pointer'}} 
              className={classes.botonPlano}
            />
          </label>
        </div>
    
  }

  return (
    <Container>
      <Section
        style={{backgroundColor: '#fff'}}
      >
        <AppBar 
          color="inherit" 
          position="static" 
          style={
            {
              backgroundColor: '#fff',
              height: tamañoApp,
            }
          }
        >
          <ListItem
            style={
              {
                borderBottom: '4px solid rgb(40,60,167)',
              }
            }
          >
            <ListItemText primary="Información general" />
            {etapaNuevoMolde === 0 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {etapaNuevoMolde === 0 ? 
            <div>
              <Grid50>
                <Input
                  onChange={onInputChangeProxy}
                  nomCampo='Nombre de molde:'
                  requerido
                  focus
                  isComplete={nombre.campoValido}
                  tipoInput='text'
                  longitud='50'
                  valor={nombre.valor}
                  indice={0}
                />
              </Grid50>
              <Grid50>
                <Input
                  onChange={onInputChangeProxy}
                  nomCampo='Versión:'
                  tipoInput='numero'
                  longitud='50'
                  requerido
                  isComplete={version.campoValido}
                  valor={version.valor}
                  indice={1}
                />
              </Grid50>

              <Grid50>
                <Input
                  onChange={onInputChangeProxy}
                  nomCampo='Número de plantas:'
                  requerido
                  // focus
                  placeholder = 'plantas'
                  isComplete={numPlantas.campoValido}
                  tipoInput='numero'
                  longitud='50'
                  valor={numPlantas.valor}
                  indice={2}
                />
              </Grid50>
              <Grid50>
                <Input
                  onChange={onInputChangeProxy}
                  nomCampo='Costo:'
                  valor={costo.valor}
                  requerido
                  isComplete={costo.campoValido}
                  indice={3}
                  numero
                />
              </Grid50>
              <Grid50>
                <Seleccion
                  opciones={proveedores}
                  idOpcion='IdProveedor'
                  nomOpcion='Nombre'
                  requerido
                  valor={proveedor.valor}
                  onChange={onInputChangeProxy}
                  label='Proveedor:'
                  indice={4}
                  campoValido={proveedor.campoValido}
                />
              </Grid50>
              <Grid50>
                <Seleccion
                  opciones={materiales}
                  idOpcion='IdTipo'
                  nomOpcion='Nombre'
                  requerido
                  valor={material.valor}
                  onChange={onInputChangeProxy}
                  label='Tipo de material:'
                  indice={5}
                  campoValido={material.campoValido}
                />
              </Grid50>
              <div
                style={{float: 'right', marginRight: 35}}
              >
                <Button
                  className={classes.botonSiguiente}
                  onClick={handleClickItemProxy(1)}
                  disabled = {!primerPaso}
                >
                  Siguiente
                </Button>
              </div>
              
            </div> : null}

          <ListItem
            disabled = {!primerPaso} 
            style={
              {
                borderBottom: '4px solid #28A790',
              }
            }
          >
            <ListItemText primary="Secciones" />
            {etapaNuevoMolde === 1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          {etapaNuevoMolde === 1 ? 
            <div>
              <input
                accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{display: 'none'}}
                id='importarSeccion'
                onChange={handleImportarExcelProxy}
                disabled = {!secciones.permitirImportacion || esDetalleMolde}
                type="file"
              />
              <label htmlFor='importarSeccion'>
                <Button
                  component="span"
                  disabled = {!secciones.permitirImportacion || esDetalleMolde}
                  className={classes.botonImportar}
                >
                  Importar secciones
                </Button>
              </label>
              <DataTable 
                data = {secciones.datos}
                headers = {secciones.cabeceras}
                configuracion = {configuracion}
                onClickAgregar = {agregarSeccionProxy(false)}
                admin
                opciones = {
                  [
                    {'icon' : 'ver', 'action': verDetalleSeccion},
                  ]
                }
                temporal
                message='¿Esta seguro que desea eliminar la(s) NuevoMolde(s)?'
                params= {
                  {
                    backgroundColor: 'white',
                  }
                }
                elevacion={0}
                titulo='Secciones'
              />
              <div style={{overflow: 'hidden', backgroundColor: '#fff'}}>
                <div
                  style={{float: 'right', marginRight: 15}}              
                >
                  <Button 
                    className={classes.botonSiguiente}
                    onClick={handleClickItemProxy(2)}
                    disabled = {!segundoPaso}
                  >
                    Siguiente
                  </Button>
                </div>
                <div
                  style={{float: 'right', marginRight: 15}}
                >
                  <Button 
                    style={{color: '#3f51b5'}}
                    onClick={handleClickItemProxy(0)}
                  >
                    Anterior
                  </Button>
                </div>
              </div>
              
            </div> : null}
          <ListItem 
            disabled = {!segundoPaso} 
            style={
              {
                borderBottom: '4px solid rgb(167,40,40)',
              }
            }
          >
            <ListItemText primary="Documentación" />
            {etapaNuevoMolde === 2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {etapaNuevoMolde === 2 ? 
            <div>
              <Typography
                variant="h6"
                className={classes.typography}
              >
                Planos (*Requerido)
              </Typography>

              <DataTable 
                data = {secciones.planos.datos}
                headers = {secciones.planos.cabeceras}
                configuracion = {secciones.planos.configuracion}
                temporal
                message='¿Esta seguro que desea eliminar la(s) NuevoMolde(s)?'
                params= {
                  {
                    backgroundColor: 'white',
                    mostrarBarra: true,
                  }
                }
                elevacion={0}
                titulo='Secciones'
              />
              <Grid60>
                <Typography
                  variant="h6"
                  className={classes.typography}
                >
                  Otra documentación
                </Typography>
              </Grid60>
              <Grid40 style={{textAlign: 'right'}}>
                <input
                  accept="*"
                  multiple
                  style={{display: 'none'}}
                  id='subirArchivos'
                  onChange={handleChangeArchivoProxy(0)}
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
              </Grid40>
              <div>
                <div>
                  {documentacion.archivos.map((ele, indice) => 
                    <div style={{float: 'left'}}>
                      <Tooltip 
                      // eslint-disable-next-line react/no-array-index-key
                        key={uniqueId('archivodocumentacion_')}
                        title = {
                          ele.name}
                      >
                        <Chip
                          icon={<Archivo/>}
                          label={
                            ele.name.substring(0,40)
                          }
                          style={{fontSize: '0.7em', marginRight: 8,backgroundColor:'white'}}
                          onClick={handleDownloadArchivoProxy(indice)}
                          onDelete={handleDeleteArchivoProxy(indice)}
                        />
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            </div> : null}
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={
              {
              // height: '100%',
              // maxHeight: '100%',
              // backgroundColor: 'orange',
              // overflow: 'auto',
              }
            }
          >

            {/* style={
            {
              height: '100%',
              maxHeight: '100%',
              // backgroundColor: 'orange',
              overflow: 'auto',
            }
          } */}
            {etapaNuevoMolde >=0 ? null :
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}                
                style={{
                  // height:'60%',
                // backgroundColor:'blue',
                }}          
              />}
            {/* <Container flexDirection="row" style={{ padding: '5px 5px'}}> */}
            <Grid 
              container 
              item 
              sm={12} 
              xs={12} 
              md={12} 
              lg={12}
              xl={12} 
              justify="flex-end" 
              alignItems="flex-end" 
            >
              {/* <Container flexDirection="row" justify="flex-end"> */}
              {etapaNuevoMolde === 2 ? 
                <Grid
                  item
                  style={{marginBottom:15, marginRight: 15, marginTop:15}}
                >  
                  <Button 
                    style={{color: '#3f51b5'}}
                    onClick={handleClickItemProxy(1)}
                  >
                      Anterior
                  </Button>
                </Grid> : 
                null
              }
              <Grid
                item
                style={{marginBottom:15, marginRight: 15, marginTop:15}}
              >
                {etapaNuevoMolde === 2 && esDetalleMolde?
                  <PdfCorrecto
                    piezas={piezas}
                    accesorios={accesorios}
                    molde={nombre.valor}
                    version={version.valor}
                    title="Formato-conteo"
                  />:null}
                {/* (Aqui debe ir el pdf creo) muajaja */}
                {/* <Success 
                  label='Descargar configuración'
                  // onClick={onDescargarConfiguracion}
                  disabled = {etapaNuevoMolde !== 2}
                /> */}
              </Grid>
              <Grid
                item
                style={{marginBottom:15,marginTop:15}}
              >  
                <Cancelar 
                  label='Cerrar'
                  onClick={onCancelarConfiguracionProxy(false)}
                />
              </Grid>
              <Grid style={{marginLeft:'5px',marginRight:'8px'}}></Grid>
              <Grid
                item
                style={{marginBottom:15, marginRight: 15, marginTop:15}}
              >
                <Success 
                  label='Guardar'
                  disabled={(!guardarCompleto || !guardarTercerPaso || etapaNuevoMolde !== 2)}
                  onClick={onGuardarConfiguracion}
                />
              </Grid>

              {/* </Container> */}
            </Grid>
            {/* </Container> */}
          </Grid>
        </AppBar>
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
              value={secciones.pestañaSlc} 
              onChange={cambiarPestaña} 
              variant="fullWidth" 
              style={
                {
                  width: '100%',
                }
              }
            >
              {!secciones.esAccesorio && 
                <Tab className={classes.tab} label="Información General"/>
              }
              {!secciones.esAccesorio ? 
                <Tab className={classes.tab} label="Piezas"/> :
                <Tab className={classes.tab} label="Accesorios"/>
              }
            </Tabs>
          </Toolbar>
          {!isEmpty(secciones.seccionSlc) ? 
            <PestanaSecciones 
              pestana={secciones.pestañaSlc}
              plantas={plantas}
              secciones={secciones}
              onInputChange={onInputChangeSeccionProxy}
              onInputChangeAccesorio={onInputChangeAccesorioProxy}
              onInputChangePieza={onInputChangePiezaProxy}
              onUploadedFileProxy={onUploadedFileProxy}
              onClickSiguiente={onClickSiguiente}
              onClickAgregar={onClickAgregar}
              onClickAgregarProxy={onClickAgregarProxy}
              onClickGuardarProxy={onClickGuardarProxy}
              onEliminarAccesorio={onEliminarAccesorio}
              tipos={tipos}
              onClickCerrar={onClickCerrarProxy}
              onEditarAccesorio={onEditarAccesorioProxy}
              onClickCancelarAccesorio={onClickCancelarAccesorio}
              onClickAgregarPieza={onClickAgregarPieza}
              onEditarPieza={onEditarPieza}
              notificacion={notificacion}
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
                  Selecciona una opción para iniciar la captura
                </Typography>
              </Grid>
            </Grid>}
        </AppBar>
      </Section>
      <Modal
        open={secciones.abrirModalAviso}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message={secciones.mensajeConfirmacion}
        onClickAccept={onAceptarAviso}
        onClickCancel={onCancelarAviso}
      />
      <Modal
        open={secciones.abrirModalAgregar}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message={secciones.mensajeConfirmacion}
        onClickAccept={onAceptarModal}
        onClickCancel={onCancelarModal}
      />
    </Container>
    
  )
}

NuevoMolde.propTypes = {
  nombre: T.object,
  version: T.object,
  numPlantas: T.object,
  costo: T.object,
  proveedor: T.object,
  material: T.object,
  secciones: T.object,
  classes: T.object,
  proveedores: T.array,
  materiales: T.array,
  plantas: T.array,
  // pisos: T.array,
  tipos: T.array,
  verDetalleSeccion: T.func,
  onInputChangeProxy: T.func,
  onInputChangeSeccionProxy: T.func,
  onInputChangePiezaProxy: T.func,
  onInputChangeAccesorioProxy: T.func,
  onUploadedFileProxy: T.func,
  onClickAgregarProxy: T.func,
  agregarSeccionProxy: T.func,
  onEliminarAccesorio: T.func,
  onEditarPieza: T.func,
  onClickAgregarPieza: T.func,
  // agregarSeccion: T.func,
  cambiarPestaña: T.func,
  onClickSiguiente: T.func,
  onClickAgregar: T.func,
  onEditarAccesorioProxy: T.func,
  onClickCancelarAccesorio: T.func,
  onCancelarConfiguracionProxy: T.func,
  onClickCerrarProxy: T.func,
  onClickGuardarProxy: T.func,
  onGuardarConfiguracion: T.func,
  guardarCompleto: T.bool,
  documentacion: T.object,
  etapaNuevoMolde: T.number,
  handleClickItemProxy: T.func,
  primerPaso: T.bool,
  segundoPaso: T.bool,
  tercerPaso: T.bool,
  esDetalleMolde: T.bool,
  handleChangeArchivoProxy: T.func,
  handleDeleteArchivoProxy: T.func,
  handleDownloadArchivoProxy: T.func,
  handleImportarExcelProxy: T.func,
  onAceptarAvisoProxy: T.func,
  notificacion: T.func,
  // onInputChangePlantasProxy: T.func,
  // onAgregarSecciones: T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
    agregarSeccionProxy: (props) => (band) => () => {
      const {
        agregarSeccion,
      } = props;
      agregarSeccion(band);
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
        notificacion,
        secciones,
      } = props;

      let identificadorIgual = false

      if(id === 0){
        secciones.seccionSlc.datos.forEach((datoPieza) => {
          if(datoPieza.identificador === secciones.campos.identificador.valor && datoPieza.numeracion.toString() === secciones.campos.numeracion.valor && datoPieza.id !== secciones.idPiezaSeleccionada){
            identificadorIgual=true
          }
        })

        if (identificadorIgual){
          notificacion({
            message: 'Este identificador ya fue registrado.',
            options: {
              variant: 'warning',
            },
          })
        }else{
          onClickAgregarPieza();
        }

        
      } else {
        onClickAgregarAccesorio();
      }

    },
    // onInputChangePlantasProxy: (props) => (id) => (e) => {
    //   const {
    //     onInputChange,
    //     numPlantas,
    //     activarModalAviso,
    //   } = props;
      

    //   if(numPlantas.valor < e.target.value)
    //     activarModalAviso(true)
    //   else
    //     onInputChange(id, e.target.value);
    // },
    onInputChangeProxy: (props) => (id) => (e) => {
      const {
        onInputChange,
      } = props;
      // if(id === 4)
      //   onInputChange(id, e)
      // else
      onInputChange(id, e.target.value);
    },
    onInputChangeSeccionProxy: (props) => (id) => (e) => {
      const {
        onInputChangeSeccion,
      } = props;
      onInputChangeSeccion(id, e.target.value);
    },
    handleClickItemProxy: (props) => (id,agregar) => () => {
      // let valor
      const {
        // etapaNuevoMolde,
        handleClickList,
        numPlantas,
        activarModalAviso,
      } = props;
      // valor = id
      if (numPlantas.valor < numPlantas.valorAnterior && !agregar){
        activarModalAviso(true)
      }else{
        handleClickList(id);
      }
      // if(id === etapaNuevoMolde)
      //   valor=-1
    },
    onInputChangePiezaProxy: (props) => (id) => (e) => {
      const {
        onInputChangePieza,
        notificacion,
        secciones,
      } = props;

      let {
        target: {
          value,
        },
      } = e;
      
      let identificadorIgual = false
      if(id === 2){
        secciones.seccionSlc.datos.forEach((datoPieza) => {
          if(datoPieza.identificador === secciones.campos.identificador.valor && datoPieza.numeracion.toString() === value.toString() && datoPieza.id !== secciones.idPiezaSeleccionada){
            identificadorIgual=true
          }
        })
      }
      if(id !== 0){
        value = value <= 0 && value !== '' ? 0 : value;
      }
      if (identificadorIgual){
        notificacion({
          message: 'Este identificador ya fue registrado.',
          options: {
            variant: 'warning',
          },
        })
        onInputChangePieza(id, value);
      }else{
        onInputChangePieza(id, value);
      }



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

    handleChangeArchivoProxy: (props) => (tipoSubida,indice) => (event) => {
      let archivosValidos = []
      if (tipoSubida === 1 ){
        archivosValidos = [
          'pdf', 
          'png', 
          'jpg', 
          'jpeg',
          'zip',
          'rar',
        ];
      }else{
        archivosValidos = [
          'xlsx', 
          'xls', 
          'pdf', 
          'doc', 
          'docx', 
          'png', 
          'jpg', 
          'jpeg',
          'dxf',
          'cad',
        ];
      }


      const formData = new FormData();
      const arreglo = [];
      let band = false;

      const {
        notificacion,
        handleChangeArchivo,
        handleChangeArchivoPlano,
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
      if(band){
        if (tipoSubida > 0 ){
          handleChangeArchivoPlano(formData, arreglo,indice);
        } else{
          handleChangeArchivo(formData, arreglo);
        }
      }
      // if(band)
      //   handleChangeArchivo(formData, arreglo);
    },

    handleDownloadArchivoProxy: (props) => (indice,tipoSubida) => () => {
      const {
        handleDownloadArchivo,
        handleDownloadArchivoPlano,
      } = props;
      if (tipoSubida > 0 ){
        handleDownloadArchivoPlano(tipoSubida,indice);
      } else{
        handleDownloadArchivo(indice);
      }
      
    },

    handleImportarExcelProxy: (props) => (event) => {
      const archivosValidos = [
        'xlsx', 
        'xls',  
      ];
      const {
        notificacion,
        onAgregarSecciones,
        activarModalAviso,
        numPlantas,
      // handleChangeArchivo,
      // handleChangeArchivoPlano,
      } = props;
      let tipo = '';
      
      const fileObj = event.target.files[0];
      
      tipo = fileObj.name.substring(fileObj.name.lastIndexOf('.') + 1);
      tipo = tipo.toLowerCase();

      
      if(archivosValidos.includes(tipo.toLowerCase())){
        let arregloExcel = []
        const columnasRequeridas = ["planta", "seccion", "insumo", "alto", "ancho",
          "area", "limusos", "identificador", "numeracion", "cantidad", "costo"]
        let banderaImportar = true
        let datosCorrectos = false
        let columnaFaltante = ""
        let lineaError = 0


        if (event.target.value) {
          // const fileObj = event.target.files[0];
          if (fileObj.size < 20800000) {
            const reader = new FileReader();
            if (reader.readAsBinaryString) {
  
              reader.onload = e => {
                const workbook = XLSX.read(e.target.result, {
                  type: 'binary',
                });
              
                if (workbook.Strings.length) {              
                  const firstSheet = workbook.SheetNames[0];
                  const sheet = workbook.Sheets[firstSheet]
                  const columsContent = [];
                  const range = XLSX.utils.decode_range(sheet['!ref']);
                  let C; 
                  const R = range.s.r;

                  arregloExcel = XLSX.utils.sheet_to_json(sheet);

                  for(C = range.s.c; C <= range.e.c; C+=1) {
                    const cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] 
                    let hdr = `UNKNOWN  ${C}`;
                    if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);
                    columsContent.push(hdr);
                  }
                  const columnasExcel = columsContent.map(col => col.toLocaleLowerCase())


                  columnasRequeridas.forEach((columna) => {
                    if(columnasExcel.indexOf(columna)===-1)
                      columnaFaltante=columna
                  })

                  arregloExcel.every((secciones,indice) => {
                  // Comparacion de datos
                    if(secciones.seccion.toLowerCase() !== 'accesorios'){
                      datosCorrectos=isInteger(secciones.planta) && isString(secciones.seccion) && isString(secciones.insumo) 
                                  && (isNumber(secciones.alto)  || isUndefined(secciones.alto))
                                  && (isNumber(secciones.ancho) || isUndefined(secciones.ancho))
                                  && (isNumber(secciones.area)  || isUndefined(secciones.area))
                                  && isInteger(secciones.limusos) && isString(secciones.identificador)
                                  && (isString(secciones.numeracion) || isNumber(secciones.numeracion))
                                  && isInteger(secciones.cantidad)
                                  && (isNumber(secciones.costo) || isUndefined(secciones.costo))
                    }else{
                      datosCorrectos=isInteger(secciones.planta) && isString(secciones.seccion) && isString(secciones.insumo) 
                                  && (isNumber(secciones.alto)  || isUndefined(secciones.alto))
                                  && (isNumber(secciones.ancho) || isUndefined(secciones.ancho))
                                  && (isNumber(secciones.area)  || isUndefined(secciones.area))
                                  && isInteger(secciones.limusos) 
                                  // && isString(secciones.identificador)
                                  // && (isString(secciones.numeracion) || isNumber(secciones.numeracion))
                                  && isInteger(secciones.cantidad)
                                  && (isNumber(secciones.costo) || isUndefined(secciones.costo))

                    }

                    if(secciones.planta>numPlantas.valor){
                      banderaImportar=false
                    }
                    if(!datosCorrectos){
                      lineaError=indice+2
                    }

                    return datosCorrectos
                  })

                  if(columnaFaltante !== "" || !datosCorrectos){
                    notificacion({
                      message:columnaFaltante !== ""?
                        `La columna ${columnaFaltante} no se encuentra en el archivo.`
                        :`Los datos de la linea ${lineaError} no son correctos.`,
                      options: { variant: 'warning' },
                    })
                  }else if(banderaImportar){
                    onAgregarSecciones(arregloExcel)
                  }else{
                    activarModalAviso(true,arregloExcel)
                  }
                  

                  if (!arregloExcel.length) {
                    notificacion({
                      message: 'Archivo sin información.',
                      options: { variant: 'warning' },
                    })
                  } 
                }else{
                  notificacion({
                    message: 'Archivo sin información.',
                    options: { variant: 'warning' },
                  })
                }
              };
  
              reader.readAsBinaryString(event.target.files[0]);
            }
          }else{
            notificacion({
              message: 'Peso máximo de archivo es 20mb, favor de validar.',
              options: { variant: 'warning' },
            })
          }
        }else{
          notificacion({
            message: 'No seleccionaste archivo.',
            options: { variant: 'warning' },
          })
        }
      }else{
        notificacion({
          message: 'Archivo no admitido.',
          options: { variant: 'warning' },
        })
      }
    },


    handleDeleteArchivoProxy: (props) => (indice,tipoSubida) => () => {
      const {
        handleDeleteArchivo,
        handleDeleteArchivoPlano,
      } = props
      
      if (tipoSubida > 0 ){
        handleDeleteArchivoPlano(tipoSubida,indice);
      } else {
        handleDeleteArchivo(indice);
      }
    },
    onAceptarAvisoProxy: (props) => (band) => () => {
      const {
        onAgregarSecciones,
        activarModalAviso,
        secciones,
      } = props;
      activarModalAviso(false);
      if (band){
        onAgregarSecciones(secciones.datosTemporales);
      }
      
    },


  })
)(NuevoMolde);