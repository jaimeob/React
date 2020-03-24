import React from 'react';
import T from 'prop-types';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import {parseInt} from 'lodash';
import Grid from '@material-ui/core/Grid';
import Tabla from 'components/TablaSencilla';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Input from 'components/FormInput';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Archivito from '@material-ui/icons/InsertDriveFile';
import Nubesita from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import DataTable from 'components/DataTable';
import Modal from 'components/Dialog/alertDialog';

const styles = () => ({
  success: {
    backgroundColor: '#28950F',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
  },
})

function DetallePlaza(props){
  
  const {
    pedidosDetalle,
    deleteFileProxy,
    handleChangeArchivoProxy,
    onClickRecibir,
    handleChangeRecibidoProxy,
    handleChangeComRecepcionProxy,
    handleFileProxy,
    onClickGuardar,
    onClickCancelar,
    onClickModal,
    openModal,
    classes,
    modificado,
  } = props;

  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    paginado : false,
    seleccionable: 'none',
    buscar: false,
  };
  
  const inputFile = (indice, ruta, nomArchivo, deleteOpc, evidencia) => 
    <React.Fragment>
      {!deleteOpc &&  
        <FormControl>
          <input
            accept="*"
            style={{display: 'none'}}
            id={`uploadFile${evidencia}${indice}`}
            onChange={handleChangeArchivoProxy(indice, evidencia)}
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
        </FormControl>}
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
      case 'Evidencia' : {
        pedidosDetalle.cabeceras[i].options.display = pedidosDetalle.recibir;
        if(pedidosDetalle.infoPedido.idEstatus === 11 ||
          pedidosDetalle.infoPedido.idEstatus === 13)
          pedidosDetalle.cabeceras[i].options.display = !pedidosDetalle.recibir;

        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' ?
            inputFile(
              tableMeta.rowIndex, 
              pedidosDetalle.datos[tableMeta.rowIndex].RutaEvidenciaEnvio,
              pedidosDetalle.datos[tableMeta.rowIndex].NomArchivo || 
              (pedidosDetalle.datos[tableMeta.rowIndex].File ? pedidosDetalle.datos[tableMeta.rowIndex].File.name : null),
              pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus !== 12,
              1,
            ) : null
        break;
      }
      case 'Recibido' : {
        
        if(pedidosDetalle.infoPedido.idEstatus === 7)
          pedidosDetalle.cabeceras[i].options.display = true;
        else
          pedidosDetalle.cabeceras[i].options.display = pedidosDetalle.recibir;
        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          // eslint-disable-next-line no-nested-ternary
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined'
            ? (pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus === 13 ?
              <Input 
                placeholder = 'Ingrese cantidad'
                // eslint-disable-next-line no-nested-ternary
                inhabilitado = {0}
                isComplete = {
                  pedidosDetalle.bandIntento ? 
                    (pedidosDetalle.datos[tableMeta.rowIndex].BandRecibida === 1) : 
                    true
                }
                requerido
                indice = {tableMeta.rowIndex}
                valor = {value === null ? '' : value}
                tipoInput = 'numero'
                onChange = {handleChangeRecibidoProxy}
              /> : value) : null
        break;
      }
      case 'ComentariosRecepcion' : {
        if(pedidosDetalle.infoPedido.idEstatus === 7)
          pedidosDetalle.cabeceras[i].options.display = true;
        else
          pedidosDetalle.cabeceras[i].options.display = pedidosDetalle.recibir;

        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          // eslint-disable-next-line no-nested-ternary
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' 
            ? (pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus === 13 ?
              <Input 
                placeholder = 'Ingrese comentarios'
                // eslint-disable-next-line no-nested-ternary
                inhabilitado = {0}
                isComplete = {
                  pedidosDetalle.bandIntento ? 
                    (pedidosDetalle.datos[tableMeta.rowIndex].BandRecepcion === 1) : 
                    true
                }
                requerido
                indice = {tableMeta.rowIndex}
                valor = {value || ''}
                onChange = {handleChangeComRecepcionProxy}
              /> 
              : value) : null
        break;
      }
      case 'Guia' : {
        pedidosDetalle.cabeceras[i].options.display = false;
        if(pedidosDetalle.infoPedido.idEstatus === 11 ||
          pedidosDetalle.infoPedido.idEstatus === 13)
          pedidosDetalle.cabeceras[i].options.display = !pedidosDetalle.recibir;
        break;
      }
      case 'Paqueteria' : {
        pedidosDetalle.cabeceras[i].options.display = false;
        if(pedidosDetalle.infoPedido.idEstatus === 11 ||
          pedidosDetalle.infoPedido.idEstatus === 13)
          pedidosDetalle.cabeceras[i].options.display = !pedidosDetalle.recibir;
        break;
      }
      case 'Comentarios' : {
        pedidosDetalle.cabeceras[i].options.display = 
          pedidosDetalle.infoPedido.idEstatus !== 7;
        if(pedidosDetalle.infoPedido.idEstatus === 11 ||
          pedidosDetalle.infoPedido.idEstatus === 13)
          pedidosDetalle.cabeceras[i].options.display = !pedidosDetalle.recibir;
        break;
      }
      case 'RutaEvidenciaRecepcion' : {
        if(pedidosDetalle.infoPedido.idEstatus === 7)
          pedidosDetalle.cabeceras[i].options.display = true;
        else
          pedidosDetalle.cabeceras[i].options.display = pedidosDetalle.recibir;

        pedidosDetalle.cabeceras[i].options.customBodyRender = (value, tableMeta) => 
          tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined'
          && (pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus === 13 || pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus === 7) ?
            inputFile(
              tableMeta.rowIndex, 
              pedidosDetalle.datos[tableMeta.rowIndex].RutaEvidenciaRecepcion,
              pedidosDetalle.datos[tableMeta.rowIndex].NomArchivoRec || 
              (pedidosDetalle.datos[tableMeta.rowIndex].FileRecepcion ? pedidosDetalle.datos[tableMeta.rowIndex].FileRecepcion.name : null),
              pedidosDetalle.datos[tableMeta.rowIndex].DetalleEstatus === 7,
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
          {pedidosDetalle.infoPedido.idEstatus === 13 ||
            pedidosDetalle.infoPedido.idEstatus === 11 ? 'Recibir Pedido' : 
            'Detalle del pedido'}
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
        <Modal 
          open={openModal}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message='¿Está seguro que desea salir?'
          onClickAccept={onClickCancelar}
          onClickCancel={onClickModal}
        />
        {/* <DataTable 
          headers = {pedidosDetalle.cabeceras}
          data = {pedidosDetalle.datos}
          configuracion = {configuracion}
          admin
          elevacion={0}
        />
         */}
        <Tabla
          // rowsTamano='small'
          sinBorde
          key='tablaPrincipal'
          id='tablaPrincipal'
          funcInput={handleChangeRecibidoProxy}
          funcFile={handleChangeArchivoProxy}
          funcDescargar={handleFileProxy}
          funcEliminar={deleteFileProxy}
          elevacion={0}
          cabeceras={pedidosDetalle.cabeceras}
          datos={pedidosDetalle.datos}
        />
      </Grid>
      <Grid
        container
        style={{textAlign: 'right', padding: 8}}
      >
        <Grid
          item
          xs={false}
          sm={false}
          md={8}
          lg={8}
          xl={10}
        />
        {(pedidosDetalle.infoPedido.idEstatus === 13 || 
          pedidosDetalle.infoPedido.idEstatus === 11) &&
          pedidosDetalle.infoPedido.recibir  ? 
          <React.Fragment>
            <Grid
              item
              xs={6}
              sm={6}
              md={2}
              lg={2}
              xl={1}
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
              {pedidosDetalle.infoPedido.idEstatus !== 7 ? 
                <Button 
                  color="primary" 
                  className={classes.success}
                  id="1" 
                  variant="contained"
                  disabled = {pedidosDetalle.bandGuardar}
                  onClick ={!pedidosDetalle.recibir ? onClickRecibir : onClickGuardar}
                >
                  {!pedidosDetalle.recibir ? 
                    'Recibir' : 
                    'Guardar'}
                </Button> : null}
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
          </Grid>}
      </Grid>
    </Paper>
  )
}

DetallePlaza.propTypes = {
  pedidosDetalle: T.object,
  deleteFileProxy: T.func,
  handleChangeArchivoProxy: T.func,
  handleFileProxy: T.func,
  handleChangeRecibidoProxy: T.func,
  handleChangeComRecepcionProxy: T.func,
  onClickGuardar: T.func,
  onClickRecibir: T.func,
  onClickCancelar: T.func,
  onClickModal: T.func,
  openModal: T.bool,
  modificado: T.bool,
  classes: T.object,
};


export default compose(
  withStyles(styles),
  withHandlers({
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
    handleChangeRecibidoProxy: (props) => (opc, index) => (event) => {
      const {
        onInputRecibido,
        onInputComRecepcion,
        pedidosDetalle,
      } = props;
      let {
        target: { value },
      } = event;
      if(opc === 'RecibidoInput'){
        const {
          datos: {
            [index]:{
              RecibidoInput,
            },
          },
        } = pedidosDetalle;
        const max = pedidosDetalle.datos[index].Autorizado;
        // eslint-disable-next-line no-useless-escape
        const regExp = new RegExp('^[0-9]+(\\.[0-9]{0,2})?$');
        value = regExp.test(value) || value === '' ? value : RecibidoInput;
  
        if(!value || value < 0){
          value = '';
        } else if(parseInt(value) < max){
          value = parseInt(value);
        } else {
          value = max;
        }
      
        onInputRecibido(index, value)
      } else {
        value = value.replace(/^\s+/g,'');
        onInputComRecepcion(index, value)
      }
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
    handleFileProxy: (props) => (indice, evidencia) => () => {
      const {
        downloadFile,
        downloadFileRecepcion,
        pedidosDetalle,
      } = props;
      
      if(evidencia){
        const link = pedidosDetalle.datos[indice].InformacionEnvioInputFile;
        const nombre = pedidosDetalle.datos[indice].InformacionEnvioNombreArchivo;
        downloadFile(link, nombre, indice);
      } else {
        const link = pedidosDetalle.datos[indice].RutaEvidenciaRecepcionInputFile;
        const nombre = pedidosDetalle.datos[indice].RutaEvidenciaRecepcionNombreArchivo;
        downloadFileRecepcion(link, nombre, indice);
      }
    },
    handleChangeArchivoProxy: (props) => (index, evidencia) => (e) => {
      const formData = new FormData();
      const arreglo = [];
      const file = e.target.files[0];
      const {
        handleChangeArchivo,
        handleChangeRecepcionArchivo,
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
        if(evidencia)
          handleChangeArchivo(index, formData, arreglo, file);
        else
          handleChangeRecepcionArchivo(index, formData, arreglo, file);
      } else {
        notificacion({
          message: 'Archivo no admitido',
          options: {
            variant: 'warning',
          },
        })
      }
    },
    deleteFileProxy: (props) => (indice) => () => {
      
      const {
        handleDeleteRecepcionFile,
      } = props;
      handleDeleteRecepcionFile(indice)
    },
  }),
)(DetallePlaza);

