import React from 'react';
import T from 'prop-types';
// import { uniqueId} from 'lodash';
import { compose } from 'redux';
import { PDFDownloadLink } from '@react-pdf/renderer'
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
// import Badge from '@material-ui/core/Badge';
// import Input from 'components/FormInput';
// import Modal from 'components/Dialog/alertDialog';
// import Seleccion from 'components/Seleccion';
import {
  Grid,
  Typography,
  AppBar,
  // FormControl,
} from '@material-ui/core';
// import Success from 'components/BotonSuccess'
import Cancelar from 'components/BotonCancelar'
import Empty from 'images/iconos/empty.svg';
import SubirArchivoIcon from '@material-ui/icons/CloudUploadOutlined';
import BajarArchivoIcon from '@material-ui/icons/CloudDownloadOutlined';
// import DataTable from 'components/DataTable';
import ListItem from '@material-ui/core/ListItem';

import AccesorioIcon from '@material-ui/icons/BuildOutlined';
import PiezaIcon from '@material-ui/icons/ExtensionOutlined';
import SiguienteIcon from '@material-ui/icons/LastPageOutlined';
// import ClearIcon from '@material-ui/icons/Clear';
// import Archivito from '@material-ui/icons/Attachment';
// import Archivito from '@material-ui/icons/InsertDriveFile';
// import { debug } from 'util';
// import UploadFile from 'utils/lib/components/uploadFile';
// import Modal from 'components/Dialog/alertDialog';
import Modal from 'components/Dialog/alertDialog';
import CapturaInsumo from "../CapturaInsumo";
// import PruebaTabla from "../PruebaTabla";
import { Container } from './styledComponents';
import PdfCorrecto from '../PdfCorrecto'
// import {FormatoConteoPDF} from '../FormatoConteoPDF'
// import {ResultadosPDF} from '../ResultadosPDF'

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
    backgroundColor: '#FFFFFF',
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
  typographyList:{
    textTransform:'inherit',
    fontWeight: '400',
  },
  botones:{
    width: '2em', 
    height: '2em',
    color: '#28950F',
    opacity: 0.75,
  },
  botonSubir:{
    width: '2em', 
    height: '2em',
    opacity: 0.75,
  },
  botonList:{
    width: '1.5em', 
    height: '1.5em',
    color: '#828282',
  },
})




function DetalleInventarioCiclico(props){
  const {
    classes,
    regresar,
    insumoSeleccionado,
    tablas,
    estatus,
    campos,
    setInsumoSeleccionadoProxy,
    datosInsumos,
    handleChangeEstatus,
    onInputMontoMolde,
    seleccionesRows,
    onRowsSeleccionadosChange,
    handleChangeArchivoProxy,
    handleDeleteArchivoProxy,
    handleDownloadArchivoProxy,
    documentacion,
    // guardarInventario,
    abrirModal,
    mensajeConfirmacion,
    bandModal,
    onCerrarInventarioProxy,
    onGuardarInventarioProxy,
    // onClickGuardarProxy,
    // handleDownloadExcel,
    esDetalleInventario,
    existeInventario,
  } = props;

  const permisoSubir = true
  // const configuracion = {
  //   filtro : false,
  //   descarga : false,
  //   columnas : false,
  //   imprimir : false,
  //   buscar: false,
  //   seleccionable: 'none',
  //   paginado: false,
  //   registrosPorPagina: 10,
  // };

  const onAceptarModal = bandModal === 2 ? onGuardarInventarioProxy(true) :
    onCerrarInventarioProxy(false);
  
  const onCerrarModal = bandModal === 2 ? onGuardarInventarioProxy(false) :
    onCerrarInventarioProxy(true);

  // const detalleInventarioCiclico = true;
  
  return (
    <Grid
      container
      style={
        {
          height: '100%',
        }
      }
    >
      <Modal 
        open={abrirModal}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message={mensajeConfirmacion}
        onClickAccept={onAceptarModal}
        onClickCancel={onCerrarModal}
      />
      <Grid
        container
        item
        xs={4}
        sm={4}
        md={4}
        lg={4}
        xl={4}
        className={classes.principal}
      >
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
              height: '100%',
              maxHeight: '100%',
              // backgroundColor: 'orange',
              overflow: 'auto',
            }
          }
        >
          <Grid
            item
            container
            spacing = {0}
            // style={{backgroundColor:'yellowgreen'}}
          >
            <Typography
              variant='h6'
              className={classes.typography}
            > 
              Formatos y planos
            </Typography>
          </Grid>
          <Grid
            item
            container
            spacing = {0}
            style={
              {
                height: '90%',
                maxHeight: '90%',
                
              }
            }
            // style={{backgroundColor:'red'}}
          >
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                xl={3}
              >   
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                // style={{
                // }} 
              >    
                <Grid
                  item
                  align="center"
                >
                  <BajarArchivoIcon
                    className={classes.botones}
                    style={{cursor: 'pointer'}} 
                    // onClick = {handleChangeArchivoProxy(0,i)}
                    disabled = {documentacion.planos.length>0}
                    onClick = {handleDownloadArchivoProxy(4)}
                  />
                </Grid>

                <Grid
                  item
                  align="center"
                >
                  <Typography
                    variant="subtitle2"
                    className={classes.typography}
                    style={{cursor: 'pointer',fontWeight: '400'}} 
                    onClick = {handleDownloadArchivoProxy(4)}
                    disabled = {documentacion.planos.length>0}
                  >
                    {'Descarga de planos'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
              >    
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
              >    
                <Grid
                  item
                  align="center"
                >
                  <PdfCorrecto
                    piezas={tablas.piezas.datos}
                    accesorios={tablas.accesorios.datos}
                    // onClickAccept={onClickAccept}
                    tipoPdf={0}
                    tipoBoton={0}
                    title="Formato-conteo"
                  />   

                  {/* <PDFDownloadLink 
                    document={<FormatoConteoPDF
                      piezas={tablas.piezas.datos}
                      accesorios={tablas.accesorios.datos}
                    />} 
                    fileName="Formato-conteo.pdf">
                    <BajarArchivoIcon
                      style={{cursor: 'pointer'}} 
                      className={classes.botones}
                      // onClick = {handleDownloadExcelProxy(0)}
                    />
                  </PDFDownloadLink> */}

                </Grid>
                <Grid
                  item
                  align="center"
                >
                  <PdfCorrecto
                    piezas={tablas.piezas.datos}
                    accesorios={tablas.accesorios.datos}
                    // onClickAccept={onClickAccept}
                    tipoPdf={0}
                    tipoBoton={1}
                    title="Formato-conteo"
                  />  
                  {/* <PDFDownloadLink 
                    document={<FormatoConteoPDF
                      piezas={tablas.piezas.datos}
                      accesorios={tablas.accesorios.datos}
                    />} 
                    fileName="Formato-conteo.pdf">
                    <Typography
                      variant="subtitle2"
                      className={classes.typography}
                      style={{cursor: 'pointer',fontWeight: '400'}} 
                      // onClick = {handleDownloadExcelProxy(0)}
                    >
                      {'Formato de conteo'}
                    </Typography>
                  </PDFDownloadLink> */}

                </Grid>
              </Grid>
            </Grid>
            
            {/* <Grid
              item
              style={{backgroundColor:'green',marginTop:'10px'}}
            >
              abc
            </Grid> */}
            <Grid item style={{marginTop:'20px'}}> 
              <Typography 
                variant="h6" 
                color="primary" 
                className={classes.typography}
              > 
              Conteo de inventario
              </Typography>
            </Grid>
            <ListItem  className="listaArriba" style={{fontSize: 14}} key={8909343}>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                
                // style={{backgroundColor:'green'}}
              > 
                <PiezaIcon
                  className={classes.botonList}
                  //                  style = {{marginRight: 15}}
                />   
                
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >    
                <Typography
                  color="default"
                  variant="h6"
                  className={classes.typographyList}
                  style={{marginLeft:'20px'}}
                >
                Piezas
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                // style={{backgroundColor:'green'}}
              >    
                <Typography
                  color="default"
                  variant="subtitle1"
                  className={classes.typographyList}
                >
                  {`${datosInsumos.piezasInventariadas}/${datosInsumos.piezasTotales}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                // style={{backgroundColor:'green'}}
              >    
                <SiguienteIcon
                  className={classes.botonList}
                  style={{cursor: 'pointer'}}
                  onClick = {() => setInsumoSeleccionadoProxy(1)}
                />
              </Grid>

            </ListItem>
            <ListItem  className="listaAbajo" style={{fontSize: 14}} key={98389293892}>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                // style={{backgroundColor:'green'}}
              >                    
                <AccesorioIcon
                  className={classes.botonList}
                />              
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                // style={{backgroundColor:'green'}}
              >    
                <Typography
                  color="default"
                  variant="h6"
                  className={classes.typographyList}
                  style={{marginLeft:'20px'}}
                >
                Accesorios
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                // style={{backgroundColor:'green'}}
              >    
                <Typography
                  color="default"
                  variant="subtitle1"
                  className={classes.typographyList}
                >
                  {`${datosInsumos.accesoriosInventariados}/${datosInsumos.accesoriosTotales}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                // style={{backgroundColor:'green'}}
              >    
                <SiguienteIcon
                  className={classes.botonList}
                  style={{cursor: 'pointer'}}
                  onClick = {() => setInsumoSeleccionadoProxy(2)}
                />
              </Grid>
            </ListItem>
            <Typography
              variant="h6"
              className={classes.typography}
              style={{marginTop:'20px'}}
            >
              Evidencias
            </Typography>
            <Grid
              item
              container
              style={
                {
                  // overflow: 'auto',
                  height: '42%',
                  maxHeight: '42%',
                  paddingTop: 8,
                }
              }
            >
              <Grid
                item
                container
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}

              >
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                >   
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                >    
                  {documentacion.formatoConteo.length>0 ? 
                    <Grid
                      item
                      align="center"
                    >
                      {/* <Badge
                        badgeContent={
                          <ClearIcon 
                            style={{cursor: 'pointer',width: '0.5em'}}
                            onClick = {handleDeleteArchivoProxy(2)}
                          />
                        }
                        color="secondary"
                      > */}
                      <BajarArchivoIcon
                        className={classes.botones}
                        style={{cursor: 'pointer'}} 
                        onClick = {handleDownloadArchivoProxy(2)}
                      />
                      {/* </Badge> */}
                    </Grid>
                    :
                    <Grid
                      item
                      align="center"
                    >
                      <input
                        accept="*"
                        style={{display: 'none'}}
                        id="subirArchivoFormato"
                        onChange={handleChangeArchivoProxy(2,0)}
                        disabled = {permisoSubir}
                        type="file"
                      />
                      <label htmlFor="subirArchivoFormato">
                        <SubirArchivoIcon
                          className={classes.botonSubir}
                          style={{cursor: 'inherit'}} 
                          disabled = {permisoSubir}
                        />
                      </label>
                    </Grid>}
                  {documentacion.formatoConteo.length>0 ? 
                    <Grid
                      item
                      align="center"
                    >
                      <Typography
                        variant="subtitle2"
                        className={classes.typography}
                        style={{cursor: 'pointer',fontWeight: '400'}} 
                        onClick = {handleDownloadArchivoProxy(2)}
                      >
                        {'Formato de conteo'}
                      </Typography>
                    </Grid>
                    :
                    <Grid
                      item
                      align="center"
                    >
                      <input
                        accept="*"
                        style={{display: 'none'}}
                        id="subirArchivoFormato"
                        onChange={handleChangeArchivoProxy(2,0)}
                        disabled = {permisoSubir}
                        type="file"
                      />
                      <label htmlFor="subirArchivoFormato">
                        <Typography
                          variant="subtitle2"
                          className={classes.typography}
                          style={{cursor: 'inherit',fontWeight: '400'}} 
                          disabled = {permisoSubir}
                        // onClick = {regresar}
                        >
                          {'Formato de conteo'}
                        </Typography>
                      </label>

                    </Grid>}
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                >    
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                >    
                  {documentacion.reporteResultados.length>0 ? 
                    <Grid
                      item
                      align="center"
                    >
                      {/* <Badge
                        badgeContent={
                          <ClearIcon 
                            style={{cursor: 'pointer',width: '0.5em'}}
                            onClick = {handleDeleteArchivoProxy(3)}
                          />
                        }
                        color="secondary"
                      > */}
                      <BajarArchivoIcon
                        className={classes.botones}
                        style={{cursor: 'pointer'}} 
                        // onClick = {handleChangeArchivoProxy(0,i)}
                        // className={classes.botones}
                        onClick = {handleDownloadArchivoProxy(3)}
                      />
                      {/* </Badge> */}
                    </Grid>
                    :
                    <Grid
                      item
                      align="center"
                    >
                      <input
                        accept="*"
                        style={{display: 'none'}}
                        id="subirArchivoResultados"
                        onChange={handleChangeArchivoProxy(3,0)}
                        disabled = {permisoSubir}
                        type="file"
                      />
                      <label htmlFor="subirArchivoResultados">
                        <SubirArchivoIcon
                          className={classes.botonSubir}
                          style={{cursor: 'inherit'}} 
                          disabled = {permisoSubir}
                        // onClick = {handleChangeArchivoProxy(0,i)}
                        // className={classes.botones}
                        // onClick = {regresar}
                        />
                      </label>
                    </Grid>
                  }
                  {documentacion.reporteResultados.length>0 ? 
                    <Grid
                      item
                      align="center"
                      // style={{backgroundColor:'red'}} 
                    >
                      <Typography
                        variant="subtitle2"
                        className={classes.typography}
                        style={{cursor: 'pointer',fontWeight: '400'}} 
                        onClick = {handleDownloadArchivoProxy(3)}
                      >
                        {'Reporte de resultados'}
                      </Typography>
                    </Grid>
                    :
                    <Grid
                      item
                      align="center"
                    // style={{backgroundColor:'red'}} 
                    >
                      <input
                        accept="*"
                        style={{display: 'none'}}
                        id="subirArchivoResultados"
                        onChange={handleChangeArchivoProxy(3,0)}
                        disabled = {permisoSubir}
                        type="file"
                      />
                      <label htmlFor="subirArchivoResultados">
                        <Typography
                          variant="subtitle2"
                          className={classes.typography}
                          style={{cursor: 'inherit',fontWeight: '400'}}
                          disabled = {permisoSubir} 
                        // onClick = {regresar}
                        >
                          {'Reporte de resultados'}
                        </Typography>
                      </label>

                    </Grid>
                  }
                </Grid>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
              // style={{backgroundColor:'blue'}}
              >    
              </Grid>
              <Grid
                item
                xs={10}
                sm={10}
                md={10}
                lg={10}
                xl={10}
                style={{marginTop:'10px'}}
              >    
                <Typography
                  variant="subtitle2"
                  align="center"
                  className={classes.typographyList}
                >
              *Es obligatorio subir la evidencia para validar y cerrar la captura de inventario
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
              // style={{backgroundColor:'blue'}}
              >    
              </Grid>
              <Container flexDirection="row" style={{ padding: '5px 5px'}}>
                <Grid item container sm={12} xs={12} md={12} >
                  <Container flexDirection="row" justify="flex-end">
                    <Grid
                      item
                    >  
                      <Cancelar 
                        label='Cerrar'
                        // onClick={onCerrarInventarioProxy(false)}
                        onClick={regresar}
                      />
                    </Grid>
                    {/* <Grid style={{marginLeft:'5px',marginRight:'8px'}}></Grid>
                    <Grid
                      item
                    >
                      <Success 
                        label='Guardar'
                        disabled={!guardarInventario}
                        onClick={onClickGuardarProxy(true)}
                      />
                    </Grid> */}

                  </Container>
                </Grid>
              </Container>
            </Grid>

          </Grid>
        </Grid>
      </Grid>



      <Grid
        container
        item
        xs={8}
        sm={8}
        md={8}
        lg={8}
        xl={8}
        style={
          {
            paddingTop: 4,
            height: '100%',
          }
        }
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

          {insumoSeleccionado > 0 
            ? 
            <CapturaInsumo
              insumoSeleccionado={insumoSeleccionado}
              tablas = {tablas}
              estatus = {estatus}
              campos = {campos}
              seleccionesRows = {seleccionesRows}
              handleChangeEstatus = {handleChangeEstatus}
              onRowsSeleccionadosChange = {onRowsSeleccionadosChange}
              onInputMontoMolde = {onInputMontoMolde}
              handleChangeArchivoProxy = {handleChangeArchivoProxy}
              handleDeleteArchivoProxy = {handleDeleteArchivoProxy}
              handleDownloadArchivoProxy = {handleDownloadArchivoProxy}
              documentacion={documentacion}
              esDetalleInventario={esDetalleInventario}
              existeInventario={existeInventario}
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
                  {'Selecciona una opción para iniciar la captura'}
                </Typography>
              </Grid>
            </Grid> 
          

          }


        </AppBar>
      </Grid>
    </Grid>
  )
}

DetalleInventarioCiclico.propTypes = {


  classes: T.object,
  regresar: T.func,
  insumoSeleccionado: T.number,
  // proveedores: T.array,
  // materiales: T.array,
  // plantas: T.array,
  tablas: T.object,
  estatus: T.array,
  campos: T.object,
  datosInsumos: T.object,
  handleChangeEstatus: T.func,
  onInputMontoMolde: T.func,
  // setInsumoSeleccionado: T.func,
  // pestañaSeleccionada: T.number,
  // secciones: T.object,
  // campos: T.object,
  seleccionesRows: T.object,
  onRowsSeleccionadosChange: T.func,
  // rowSeleccionado: T.number,
  // plazas: T.array,
  // plazasDestino: T.array,
  // tiposMovimientos: T.array,
  // onTipoMovimientoChangeProxy: T.func,
  // onInputChangeProxy: T.func,
  // onInputFolioChangeProxy: T.func,
  // onInputChangeSeccionProxy: T.func,
  setInsumoSeleccionadoProxy: T.func,
  // documentacion: T.object,
  handleChangeArchivoProxy: T.func,
  handleDeleteArchivoProxy: T.func,
  handleDownloadArchivoProxy: T.func,
  documentacion:T.object,
  // handleDeleteArchivoProxy: T.func,
  // handleDownloadArchivoProxy: T.func,
  // cambiarPestaña: T.func,
  // guardarInventario: T.bool,
  esDetalleInventario: T.bool,
  existeInventario: T.bool,
  // mostrarMolde: T.bool,
  // hayMoldeSeleccionado: T.bool,
  // onEliminarArchivoDocumentacion: T.func,
  onCerrarInventarioProxy: T.func,
  onGuardarInventarioProxy: T.func,
  // onClickGuardarProxy: T.func,
  bandModal: T.number,
  abrirModal: T.bool,
  mensajeConfirmacion: T.string,
  // esDetalleMovimiento: T.bool,
  // onInputFolio: T.func,
  // handleDownloadExcel: T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
    setInsumoSeleccionadoProxy: (props) => (insumoSeleccionado) => {
      const {
        setInsumoSeleccionado,
      } = props;
      setInsumoSeleccionado(insumoSeleccionado);
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
      if (campos.tipoMovimiento.valor === 5 && id === 3 && e.keyCode === 13 || e.keyCode === 9){
        onInputFolio(id,e.target.value)
      }else{
        onInputChange(id, e.target.value);
      }
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
    handleChangeArchivoProxy: (props) => (tipoInsumo,indice) => (event) => {
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
        handleChangeArchivoEvidencia,
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
        if (tipoInsumo > 1 ){
          handleChangeArchivoEvidencia(formData, arreglo,tipoInsumo);
        } else{
          handleChangeArchivo(formData, arreglo,tipoInsumo,indice);
        }
      }
    },
    handleDeleteArchivoProxy: (props) => (tipoInsumo,indice) => () => {
      const {
        handleDeleteArchivo,
        handleDeleteArchivoEvidencia,
      } = props;
      if (tipoInsumo > 1 ){
        handleDeleteArchivoEvidencia(tipoInsumo);
      }else{
        handleDeleteArchivo(tipoInsumo,indice);
      }
    },
    handleDownloadArchivoProxy: (props) => (tipoInsumo,indice) => () => {
      const {
        handleDownloadArchivo,
        handleDownloadArchivoEvidencia,
      } = props;
      if (tipoInsumo > 1 ){
        handleDownloadArchivoEvidencia(tipoInsumo);
      }else{
        handleDownloadArchivo(tipoInsumo,indice);
      }
      
    },
    onClickGuardarProxy: (props) => (band) => () => {
      const {
        handleAbrirModal,
      } = props;
      handleAbrirModal(band);
    },
    onGuardarInventarioProxy: (props) => (band) => () => {
      const {
        onGuardarInventario,
      } = props;
      onGuardarInventario(band);
    },

  })
)(DetalleInventarioCiclico);