/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import {slice, parseInt} from 'lodash';
import Tabla from 'components/TablaSencilla';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Input from 'components/FormInput';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Nubesita from '@material-ui/icons/CloudUpload';
import Success from 'components/BotonSuccess';
import Archivito from '@material-ui/icons/InsertDriveFile';
import Button from '@material-ui/core/Button';
import DataTable from 'components/DataTable';
import Izquierda from "@material-ui/icons/KeyboardArrowLeft";
import Derecha from "@material-ui/icons/KeyboardArrowRight";
import Modal from 'components/Dialog/alertDialog';

const styles = () => ({
  success: {
    backgroundColor: '#28950F',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#1d7109',
    },
  },
  nubesita: {
    color : '#F9AA33',
  },
  nubesitaTriste: {
    color : 'rgba(0, 0, 0, 0.26)',
  },
})

function Detalle(props){
  const {
    pedidosDetalle,
    deleteFileProxy,
    handleChangeAutorizadoProxy,
    handleChangeComentariosProxy,
    handleChangeGuiaProxy,
    handleChangePaqueteriaProxy,
    handleChangeArchivoProxy,
    handleChangeCotizacionProxy,
    handleCotizacionProxy,
    handleFileProxy,
    obtenerCotizacionProxy,
    onClickGuardar,
    onClickCancelar,
    onClickModal,
    handleChangeGeneralesProxy,
    onClickSiguiente,
    openModal,
    modificado,
    classes,
  } = props;

  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'none',
    paginado: false,
    buscar: false,
  };
  
  // 

  const inputFile = (indice, ruta, nomArchivo, deleteOpc, evidencia) => 
    <React.Fragment>
      <FormControl>
        <input
          accept="*"
          style={{display: 'none'}}
          id={`uploadFile${evidencia}${indice}`}
          onChange={handleChangeArchivoProxy(indice)}
          disabled={
            Array.isArray(ruta) ||
            ruta !== null
          }
          type="file"
        />
        {!(Array.isArray(ruta) ||
                ruta !== null) ?  
          <label htmlFor={`uploadFile${evidencia}${indice}`}>
            <Button 
              variant="text" 
              component="span"
              disabled={
                Array.isArray(ruta) ||
                ruta !== null
              }
            >
              <Nubesita style={{color : '#F9AA33'}}/>
            </Button>
          </label> : null}
      </FormControl>
      {Array.isArray(ruta) ||
          ruta !== null ?
        <Tooltip 
          key={`fileInputTool${evidencia}${indice}`}
          title = {
            nomArchivo
          }
        >
          <Chip
            icon={<Archivito />}
            label={
              nomArchivo.substring(0,13)
            }
            id={indice}
            style={{fontSize: '0.7em'}}
            onClick={handleFileProxy(indice, evidencia)}
            onDelete={deleteOpc ? null 
              : deleteFileProxy(indice, evidencia)}
          />
        </Tooltip> : null}
    </React.Fragment>;
  
  for (let i = 0; i < pedidosDetalle.cabeceras.length; i+=1) {
    switch(pedidosDetalle.cabeceras[i].name){
      case 'ComentariosSol' : {
        pedidosDetalle.cabeceras[i].options.display = pedidosDetalle.infoPedido.idEstatus === 12;
        break;
      }
      case 'Autorizado' : {
        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) =>
          // eslint-disable-next-line no-nested-ternary
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' ?
            (pedidosDetalle.datos[tableMeta.rowIndex].Desactivado === 0 ? 
              <Input 
                requerido
                placeholder = 'Ingrese monto'
                tipoInput = 'numero'
                inhabilitado = {pedidosDetalle.datos[tableMeta.rowIndex].Desactivado}
                indice = {tableMeta.rowIndex}
                valor = {value === null ? '' : value}
                isComplete = {
                  pedidosDetalle.bandIntento ? 
                    (pedidosDetalle.datos[tableMeta.rowIndex].Band === 1 && 
                      (!Number.isNaN(value)) || value !== null) : 
                    true
                }
                onChange = {handleChangeAutorizadoProxy}
              />
              : value) : null
        break;
      }
      case 'Comentarios' : {
        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          // eslint-disable-next-line no-nested-ternary
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' ?
            (pedidosDetalle.datos[tableMeta.rowIndex].Desactivado === 0 ? 
              <Input 
                placeholder = 'Ingrese comentarios'
                multiline
                inhabilitado = {pedidosDetalle.datos[tableMeta.rowIndex].Desactivado}
                longitud = '60'
                isComplete = {
                  pedidosDetalle.bandIntento ? 
                    (pedidosDetalle.datos[tableMeta.rowIndex].BandComentarios === 1 && 
                      value !== null) : 
                    true
                }
                indice = {tableMeta.rowIndex}
                valor = {value || ''}
                onChange = {handleChangeComentariosProxy}
              />
              : value)
            : null
        break;
      }
      case 'Guia' : {
        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          // eslint-disable-next-line no-nested-ternary
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' && pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus !== 9 ?
            (pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus !== 13 && pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus !== 7 ?
              <Input 
                placeholder = 'Ingrese guía'
                // eslint-disable-next-line no-nested-ternary
                inhabilitado = {pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus === 13 || pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus === 7 ? 1 : 0}
                isComplete = {
                  pedidosDetalle.bandIntento ? 
                    (pedidosDetalle.datos[tableMeta.rowIndex].BandGuia === 1) : 
                    true
                }
                requerido
                indice = {tableMeta.rowIndex}
                valor = {value || ''}
                onChange = {handleChangeGuiaProxy}
              />
              : value)
            : null
        break;
      }
      case 'Paqueteria' : {
        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          // eslint-disable-next-line no-nested-ternary
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' && pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus !== 9 ?
            (pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus !== 13 && pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus !== 7 ? 
              <Input 
                placeholder = 'Ingrese paquetería'
                // eslint-disable-next-line no-nested-ternary
                inhabilitado = {pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus === 13 || pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus === 7 ? 1 : 0}
                isComplete = {
                  pedidosDetalle.bandIntento ? 
                    (pedidosDetalle.datos[tableMeta.rowIndex].BandPaqueteria === 1) : 
                    true
                }
                requerido
                indice = {tableMeta.rowIndex}
                valor = {value || ''}
                onChange = {handleChangePaqueteriaProxy}
              />
              : value)
            : null
        break;
      }
      case 'Evidencia' : {
        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' && pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus !== 9 ?
            inputFile(
              tableMeta.rowIndex, 
              pedidosDetalle.datos[tableMeta.rowIndex].RutaEvidenciaEnvio,
              pedidosDetalle.datos[tableMeta.rowIndex].NomArchivo || 
              (pedidosDetalle.datos[tableMeta.rowIndex].File ? pedidosDetalle.datos[tableMeta.rowIndex].NomArchivo : null),
              [11,13,7].includes(pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus),
              1,
            ) : null
        break;
      }
      case 'Recibido' : {
        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' ?
            value : null
        break;
      }
      case 'ComentariosRecepcion' : {
        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' ?
            value : null
        break;
      }
      case 'RutaEvidenciaRecepcion' : {
        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' ?
            inputFile(
              tableMeta.rowIndex, 
              pedidosDetalle.datos[tableMeta.rowIndex].RutaEvidenciaRecepcion,
              pedidosDetalle.datos[tableMeta.rowIndex].NomArchivoRec || 
              (pedidosDetalle.datos[tableMeta.rowIndex].File ? pedidosDetalle.datos[tableMeta.rowIndex].File.name : null),
              true,
              0,
            ) : null
        break;
      }
      case 'InformacionEnvio' : {
        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined'
          && pedidosDetalle.infoPedido.idEstatus === 7 ?
            inputFile(
              tableMeta.rowIndex, 
              pedidosDetalle.datos[tableMeta.rowIndex].RutaEvidenciaEnvio,
              value,
              true,
              2,
            ) : null
        break;
      }
      default : {
        break;
      }
    }
  }

  const upperText = (nombre) =>
    nombre.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return(
    <Paper>
      <Grid
        container
        style={{textAlign: 'left', paddingLeft: 8}}
      >
        <Typography
          variant="h6"
        >
          {pedidosDetalle.infoPedido.titulo}
        </Typography>
      </Grid>
      <Grid
        container
        style={{textAlign: 'left', paddingLeft: 8}}
      >
        <Typography
          variant="subtitle2"
        >
          Folio: {pedidosDetalle.infoPedido.folio}
        </Typography>
      </Grid>
      <Grid
        container
        style={{textAlign: 'left', paddingLeft: 8}}
      >
        <Typography
          variant="subtitle2"
        >
          Plaza: {upperText(pedidosDetalle.infoPedido.plaza)}
        </Typography>
      </Grid>
      <Grid
        container
        style={{textAlign: 'left', paddingLeft: 8}}
      >
        <Typography
          variant="subtitle2"
        >
          Solicitante: {upperText(pedidosDetalle.infoPedido.solicitante)}
        </Typography>
      </Grid>
      <Grid
        container
      >
        {/* <DataTable 
          headers = {pedidosDetalle.cabeceras}
          data = {pedidosDetalle.datos}
          configuracion = {configuracion}
          admin
          elevacion={0}
        /> */}
        <Tabla
          // rowsTamano='small'
          sinBorde
          key='tablaPrincipal'
          id='tablaPrincipal'
          funcInput={handleChangeAutorizadoProxy}
          funcFile={handleChangeArchivoProxy}
          funcDescargar={handleFileProxy}
          funcEliminar={deleteFileProxy}
          elevacion={0}
          bandGuardar={pedidosDetalle.bandIntento}
          cabeceras={pedidosDetalle.cabeceras}
          datos={pedidosDetalle.datos}
        />
      </Grid>
      <Grid
        container
        style={{
          paddingLeft: 8,
          paddingTop: 8,
        }}
      >
        <Modal 
          open={openModal}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message='¿Está seguro que desea salir?'
          onClickAccept={onClickCancelar}
          onClickCancel={onClickModal}
        />
        <Grid
          item
          xs={2}
          sm={2}
          md={4}
          lg={4}
        >
          <Input 
            nomCampo = 'Comentarios Generales'
            multiline
            rows = {4}
            variant = "outlined"
            inhabilitado={[7,9,13].includes(pedidosDetalle.infoPedido.idEstatus) ? 1 : 0}
            valor = {pedidosDetalle.ComentariosGeneral}
            onChange = {handleChangeGeneralesProxy}
          />
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          md={4}
          lg={4}
        >
          
        </Grid>
        <Grid
          container
          item
          xs={2}
          sm={2}
          md={4}
          lg={4}
        > 
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            style={{textAlign: 'left'}}
          >
            <Typography
              variant='h6'
            >
              Cotizaciones
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            style={{textAlign: 'right', paddingRight: 8}}
          >
            <FormControl>
              <input
                accept="*"
                style={{display: 'none'}}
                id='uploadFilegenerales'
                multiple
                onChange={handleChangeCotizacionProxy}
                disabled={
                  pedidosDetalle.cotizaciones.length === pedidosDetalle.datos.length + 3 ||
                  pedidosDetalle.infoPedido.idEstatus !== 12
                }
                type="file"
              />
              {[7,9,13].includes(pedidosDetalle.infoPedido.idEstatus) ? null : 
                <label htmlFor='uploadFilegenerales'>
                  <Button 
                    variant="text" 
                    component="span"
                    disabled={
                      pedidosDetalle.cotizaciones.length === pedidosDetalle.datos.length + 3 ||
                      pedidosDetalle.infoPedido.idEstatus !== 12
                    }
                  >
                    <Nubesita 
                      className={
                        pedidosDetalle.cotizaciones.length === pedidosDetalle.datos.length + 3 ? 
                          classes.nubesitaTriste : classes.nubesita}
                    />
                    &nbsp;&nbsp;Subir cotización
                  </Button>
                </label>}
            </FormControl>
          </Grid>
          <Grid
            item
            style={{paddingTop: 8}}
          >
            {pedidosDetalle.infoPedido.idEstatus === 7 || 
            pedidosDetalle.cotizacionesPageInicio === 0 ? null : 
              <IconButton
                disabled={pedidosDetalle.cotizacionesPageInicio === 0} 
                onClick={obtenerCotizacionProxy(0)}
              >
                <Izquierda fontSize="small" />
              </IconButton>}
            {pedidosDetalle.cotizacionesPaginado.map((cot, indice) => 
              <Tooltip 
                // eslint-disable-next-line react/no-array-index-key
                key={`fileInputTool${indice}`}
                title = {
                  cot.name}
              >
                <Chip
                  icon={<Archivito />}
                  label={
                    
                    cot.name.substring(0,15)}
                  id={indice}
                  style={{fontSize: '0.7em', marginRight: 8}}
                  onClick={handleCotizacionProxy(indice)}
                  onDelete={![7,9,13].includes(pedidosDetalle.infoPedido.idEstatus) && deleteFileProxy(indice, 0)}
                />
              </Tooltip>)}
            {pedidosDetalle.infoPedido.idEstatus === 7 || 
            (pedidosDetalle.cotizacionesPageFin >= pedidosDetalle.cotizaciones.length ||
              pedidosDetalle.cotizaciones.length < 4) ? null : 
              <IconButton
                disabled={pedidosDetalle.cotizacionesPageFin >= pedidosDetalle.cotizaciones.length ||
                  pedidosDetalle.cotizaciones.length < 4} 
                onClick={obtenerCotizacionProxy(1)}
              >
                <Derecha fontSize="small" />
              </IconButton>}
          </Grid>
        </Grid>

      </Grid>
      <Grid
        container
        style={{textAlign: 'right', padding: 8}}
      >
        <Grid
          item
          xs={false}
          sm={false}
          md={4}
          lg={3}
          xl={4}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={5}
          xl={4}
          style={{textAlign: 'center'}}
        >
          <Izquierda/>
          {pedidosDetalle.paginaActual} / {pedidosDetalle.totalPaginas}
          <Derecha/>
        </Grid>
        {pedidosDetalle.infoPedido.guardar ? 
          <React.Fragment>
            <Grid
              item
              xs={6}
              sm={6}
              md={2}
              lg={2}
              xl={3}
              style={{textAlign: 'right'}}
            >
              <Button 
                color="primary" 
                style={{backgroundColor: '#FF0023'}}
                id="1" 
                variant="contained"
                onClick={modificado ? onClickModal : onClickCancelar}
              >
                Cerrar
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={2}
              lg={2}
              xl={1}
              style={{textAlign: 'center'}}
            >
              <Success 
                disabled = {pedidosDetalle.bandGuardar}
                onClick = {onClickGuardar}
                label = {
                  pedidosDetalle.paginaActual < pedidosDetalle.totalPaginas ? 
                    'Siguiente' : 
                    'Guardar'
                }
              />
              {/* <Button 
                color="primary"
                className={classes.success}
                id="1" 
                variant="contained"
                disabled = {pedidosDetalle.bandGuardar}
                onClick ={onClickGuardar}
              >
                {pedidosDetalle.paginaActual < pedidosDetalle.totalPaginas ? 
                  'Siguiente' : 
                  'Guardar'}
              </Button> */}
            </Grid>
          </React.Fragment> : (pedidosDetalle.totalPaginas > 1 ? 
            <React.Fragment>
              <Grid
                item
                xs={6}
                sm={6}
                md={2}
                lg={2}
                xl={3}
                style={{textAlign: 'right'}}
              >
                <Button 
                  color="primary" 
                  style={{backgroundColor: '#FF0023'}}
                  id="1" 
                  variant="contained"
                  onClick={modificado ? onClickModal : onClickCancelar}
                >
                  Cerrar
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={2}
                lg={2}
                xl={1}
                style={{textAlign: 'center'}}
              >
                <Success 
                  disabled = {pedidosDetalle.bandGuardar}
                  onClick = {
                    [8, 10, 11, 12].includes(pedidosDetalle.infoPedido.idEstatus) 
                      ? onClickGuardar : onClickSiguiente}
                  label = {
                    pedidosDetalle.paginaActual < pedidosDetalle.totalPaginas ? 
                      'Siguiente' : 
                      'Guardar'
                  }
                />
                {/* <Button 
                  color="primary"
                  className={classes.success}
                  id="1" 
                  variant="contained"
                  disabled = {pedidosDetalle.bandGuardar}
                  onClick ={
                    [8, 10, 11, 12].includes(pedidosDetalle.infoPedido.idEstatus) 
                      ? onClickGuardar : onClickSiguiente}
                >
                  {pedidosDetalle.paginaActual < pedidosDetalle.totalPaginas ? 
                    'Siguiente' : 
                    'Guardar'}
                </Button> */}
              </Grid>
            </React.Fragment> : 
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              lg={4}
              xl={2}
              style={{textAlign: 'right'}}
            >
              <Button 
                color="primary"
                style={{backgroundColor: '#FF0023'}} 
                id="1" 
                variant="contained"
                onClick={onClickCancelar}
              >
                Regresar
              </Button>
            </Grid>
          )}
      </Grid>
    </Paper>
  )
}

Detalle.propTypes = {
  pedidosDetalle: T.object,
  deleteFileProxy: T.func,
  handleChangeAutorizadoProxy: T.func,
  handleChangeComentariosProxy: T.func,
  handleChangeGuiaProxy: T.func,
  handleChangePaqueteriaProxy: T.func,
  handleChangeArchivoProxy: T.func,
  handleChangeCotizacionProxy: T.func,
  handleChangeGeneralesProxy: T.func,
  handleFileProxy: T.func,
  handleCotizacionProxy: T.func,
  obtenerCotizacionProxy: T.func,
  onClickGuardar: T.func,
  onClickCancelar: T.func,
  onClickSiguiente: T.func,
  onClickModal: T.func,
  openModal: T.bool,
  modificado: T.bool,
  classes: T.object,
};


export default compose(
  withStyles(styles),
  withHandlers({
    handleChangeAutorizadoProxy: (props) => (opc, index) => (event) => {
      const {
        onInputAutorizacion,
        pedidosDetalle,
        onInputComentarios,
        onInputGuia,
        onInputPaqueteria,
        onInputImporte,
      } = props;
      let {
        target: { value },
      } = event;
      if(opc === 'AutorizadoInput'){
        const {
          datos: {
            [index]:{
              Restante,
              CantSolicitada,
              AutorizadoInput,
            },
          },
        } = pedidosDetalle;
        const max = Restante > CantSolicitada ? CantSolicitada : Restante;
        // eslint-disable-next-line no-useless-escape
        const regExp = new RegExp('^[0-9]+(\\.[0-9]{0,2})?$');
        value = regExp.test(value) || value === '' ? value : AutorizadoInput;
  
        if(value <= 0){
          value = value === '' ? '' : 0;
        } else if(parseInt(value) < max){
          value = parseInt(value);
        } else {
          value = max;
        }
        onInputAutorizacion(index, value)
      } else if(opc === 'ComentariosInput'){
        value = value.replace(/^\s+/g,'');
        onInputComentarios(index, value)
      } else if(opc === 'GuiaInput'){
        value = value.replace(/^\s+/g,'');
        onInputGuia(index, value)
      } else if(opc === 'PaqueteriaInput'){
        value = value.replace(/^\s+/g,'');
        onInputPaqueteria(index, value)
      } else if(opc === 'ImporteInput'){
        const {
          datos: {
            [index]:{
              ImporteInput,
            },
          },
        } = pedidosDetalle;
        // eslint-disable-next-line no-useless-escape
        const regExp = new RegExp('^[0-9]+(\\.[0-9]{0,2})?$');
        value = regExp.test(value) || value === '' ? value : ImporteInput;
  
        if(value <= 0){
          value = value === '' ? '' : 0;
        }
        onInputImporte(index, value)
      }
    },
    handleChangeComentariosProxy: (props) => (index) => (event) => {
      const {
        onInputComentarios,
      } = props;
      let {
        target: { value },
      } = event;
      value = value.replace(/^\s+/g,'');
    
      onInputComentarios(index, value)
    },
    handleChangeGeneralesProxy: (props) => () => (event) => {
      const {
        onInputComentariosGeneral,
      } = props;
      let {
        target: { value },
      } = event;
      value = value.replace(/^\s+/g,'');
    
      onInputComentariosGeneral( value)
    },
    handleChangeGuiaProxy: (props) => (index) => (event) => {
      const {
        onInputGuia,
      } = props;
      let {
        target: { value },
      } = event;
      value = value.replace(/^\s+/g,'');
    
      onInputGuia(index, value)
    },
    handleChangeRecibidoProxy: (props) => (index) => (event) => {
      const {
        onInputRecibido,
        pedidosDetalle,
      } = props;
      const max = pedidosDetalle.datos[index].Autorizado;
      let {
        target: { value },
      } = event;
      value = value.replace(/^\s+/g,'');
      if(value <= 0 ){
        value = 0;
      } else if(parseInt(value) < max){
        value = parseInt(value);
      } else {
        value = max;
      }
    
      onInputRecibido(index, value)
    },
    handleChangeComRecepcionProxy: (props) => (index) => (event) => {
      const {
        onInputComRecepcion,
      } = props;
      let {
        target: { value },
      } = event;
      value = value.replace(/^\s+/g,'');
    
      onInputComRecepcion(index, value)
    },
    handleChangePaqueteriaProxy: (props) => (index) => (event) => {
      const {
        onInputPaqueteria,
      } = props;
      let {
        target: { value },
      } = event;
      value = value.replace(/^\s+/g,'');
    
      onInputPaqueteria(index, value)
    },
    obtenerCotizacionProxy: (props) => (indice) => () => {
      const {
        obtenerCotizacion,
      } = props;
      obtenerCotizacion(indice);
    },
    handleFileProxy: (props) => (indice, evidencia) => () => {
      const {
        downloadFile,
        pedidosDetalle,
      } = props;
      
      let link = null;
      let nombre = null;
      if(evidencia === 1) {
        link = pedidosDetalle.datos[indice].InformacionEnvioInputFile;
        nombre = pedidosDetalle.datos[indice].InformacionEnvioNombreArchivo;
      } else if(evidencia === 2){
        const ruta = pedidosDetalle.datos[indice].InformacionEnvioInputFile;
        let tipo = ruta.substring(ruta.lastIndexOf('.') + 1);
        tipo = tipo.toLowerCase();
        link = ruta;
        nombre = `${pedidosDetalle.datos[indice].InformacionEnvioNombreArchivo}.${tipo}`;
      } else {
        link = pedidosDetalle.datos[indice].RutaEvidenciaRecepcionInputFile;
        nombre = pedidosDetalle.datos[indice].RutaEvidenciaRecepcionNombreArchivo;
      }
      
      downloadFile(link, nombre, indice);
    },
    handleCotizacionProxy: (props) => (indice) => () => {
      const {
        downloadCotizacion,
        pedidosDetalle,
      } = props;
      const link = pedidosDetalle.cotizaciones[indice].url;
      const nombre = pedidosDetalle.cotizaciones[indice].name;
      downloadCotizacion(link, nombre, indice);
    },
    handleChangeCotizacionProxy: (props) => (e) => {
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
        pedidosDetalle,
        notificacion,
        onUploadCotizacion,
      } = props;
      let tipo = '';
      let files = slice(
        Array.from(e.target.files), 
        0, 
        pedidosDetalle.datos.length + 3
      );
      if(pedidosDetalle.cotizaciones.length > 0){
        const long = Math.abs(pedidosDetalle.datos.length + 3 - pedidosDetalle.cotizaciones.length);
        files = files.slice(0, long);
      }
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
      e.target.value = null;
      if(band)
        onUploadCotizacion(formData, arreglo);
    },
    handleChangeArchivoProxy: (props) => (index, band) => (e) => {
      const formData = new FormData();
      const arreglo = [];
      const file = e.target.files[0];
      const {
        handleChangeArchivo,
        notificacion,
      } = props;
      const tipo = file.name.substring(file.name.lastIndexOf('.') + 1);
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
      if(archivosValidos.includes(tipo.toLowerCase())){
        if(file.size > 5242880)
          notificacion({
            message: 'El tamaño del archivo sobrepasa el limite permitido',
            options: {
              variant: 'warning',
            },
          })
        formData.append('files', file);
        arreglo.push(file);
        handleChangeArchivo(index, formData, arreglo, file, band);
      } else {
        notificacion({
          message: 'Archivo no admitido',
          options: {
            variant: 'warning',
          },
        })
      }
      e.target.value = null;
    },
    deleteFileProxy: (props) => (indice, evidencia) => () => {
      const {
        handleDeleteFile,
        handleDeleteCotizacionFile,
      } = props;
      
      if(evidencia === 1)
        handleDeleteFile(indice)
      else 
        handleDeleteCotizacionFile(indice);
    },
  }),
)(Detalle);

