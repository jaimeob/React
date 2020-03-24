import React from 'react';
import T from 'prop-types';
// import { uniqueId} from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import Input from 'components/FormInput';
import {uniqueId} from 'lodash';
import {
  Grid,
  Card, 
  Typography,
  FormControlLabel,
  FormControl,
  TextField,
  IconButton,
  FormGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Tooltip,
  Chip,
  Badge,
  Avatar,
  // AppBar,
} from '@material-ui/core';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import AnadirIcon from '@material-ui/icons/PlaylistAddOutlined';
import Archivo from '@material-ui/icons/Attachment';
import SubirArchivoIcon from '@material-ui/icons/CloudUploadOutlined';
import Seleccion from 'components/Seleccion';
import Switch from 'components/Switch';
import Divider from '@material-ui/core/Divider';
import Tabla from 'components/DataTable';
import { Container } from './styledComponents';

// import Pregunta from '.';
// import Opcion from '../Opcion';
const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 2,
  },
  formGroup: {
    // width:"100px",
    justifyContent:'center', 
    border: '1px solid blue',
    // minWidth: '15%',
    minWidth: '12%',
    display: 'block',
    // textAlign: 'center',
  },
  formControlLabel: {
    margin: '0',
    // minWidth: '15%',
    minWidth: '12%',
    display: 'block',
    textAlign: 'center',
  },
  formControlPreguntas: {
    // margin: '0',
    minWidth: '20%',
    display: 'block',
    // textAlign: 'center',
  },
  MuiBadge: {    
    badge: {
      backgroundColor: 'red',
    },
  },
});

function TipoPregunta(props){
  const {
    classes,
    // datos,
    // cabeceras,
    onPreguntaListaChangeProxy,
    onChangeRespuestaProxy,
    onChangeInputRespuestaProxy,
    pregunta,
    indice,
    permiteEditar,
    cabecerasArchivos,
    documentacion,
    handleChangeArchivoProxy,
    handleDownloadArchivoProxy,
    handleDeleteArchivoProxy,
    onRowSelectProxy,
  } = props;

  if(pregunta.tipoPregunta === 'SA'){
    for (let i = 0; i < pregunta.datosArchivos.length; i+=1) {
      const archivo = documentacion.archivos.filter(datoArchivo=> datoArchivo.idPreguntaDetalle === pregunta.datosArchivos[i].idPreguntaDetalle)      
      // eslint-disable-next-line no-nested-ternary
      const nombre = archivo.length > 0 ? archivo[0].Nombre?`${archivo[0].Nombre}`:`${archivo[0].File.name}`: ''

      pregunta.datosArchivos[i].evidencia =
      // eslint-disable-next-line no-nested-ternary
      pregunta.datosArchivos[i].evidencia !== '' ?
        permiteEditar?
          <Grid
            item
            // margin-right: 31px;
          >
            <Tooltip 
              // eslint-disable-next-line react/no-array-index-key
              key={uniqueId('archivodocumentacion_')}
              title = {nombre}
            >
              <Chip
                icon={<Archivo/>}
                label={nombre.substring(0,40)}
                style={{fontSize: '1em', marginRight: 8}}
                onClick={handleDownloadArchivoProxy(indice,i)}
                onDelete={handleDeleteArchivoProxy(indice,i)}
              />
            </Tooltip>
          </Grid>
          :        
          <Grid
            item
            // margin-right: 31px;
          >
            <Tooltip 
              // eslint-disable-next-line react/no-array-index-key
              key={uniqueId('archivodocumentacion_')}
              title = {nombre}
            >
              <Chip
                icon={<Archivo/>}
                label={nombre.substring(0,40)}
                style={{fontSize: '1em', marginRight: 8}}
                onClick={handleDownloadArchivoProxy(indice,i)}
                // onDelete={handleDeleteArchivoProxy(indice,i)}
              />
            </Tooltip>
          </Grid>
        :
        <Container flexDirection="row" justify="flex-end" style={{ padding: '5px 5px',justifyContent:'left'}}>
          {permiteEditar?
          <>
          <input
            accept="*"
            style={{display: 'none'}}
            id={`subirArchivosAccesorio_${i}`}
            onChange={handleChangeArchivoProxy(indice,i)}
            type="file"
          />
          <label htmlFor={`subirArchivosAccesorio_${i}`}>
            {pregunta.datosArchivos[i].requerido?
              <Badge
                style={{color: 'red'}} 
                // className={classes.MuiBadge}
                variant="dot"
                color="error"
              >
                <SubirArchivoIcon
                  style={{cursor: 'pointer'}} 
                />
              </Badge>
              :
              <SubirArchivoIcon
                style={{cursor: 'pointer'}} 
              />
            }
          </label>
          </>
            :
            <Typography
              variant="subitile2"
              className={classes.typography}
            >
              No se subió evidencia
            </Typography>
          }
          {/* </UploadFile> */}
        </Container> 
        
      if(typeof pregunta.datosArchivos[i].estatus === 'string'){
        const colorEstatus = pregunta.datosArchivos[i].estatus === 'REFCOM'?'rgb(40, 149, 15)':'rgb(249, 170, 51)'
        const color = /\(([^)]+)\)/.exec(colorEstatus);
        pregunta.datosArchivos[i].estatus =
              <Chip
                avatar={<Avatar style={{backgroundColor: colorEstatus, width: '22px', height: '20px'}}></Avatar>}
                label={pregunta.datosArchivos[i].estatus === 'REFCOM'?'Completo':'Pendiente'} 
                style={{
                  backgroundColor: 'white',
                  borderColor: `rgba(${color[1]}, 0.5)`,
                  width: '110px',
                  height: '20px',
                  justifyContent: 'start',
                }}
                variant="outlined"
              />
      }


    }
  }
  const configuracion = {
    filtro : true,
    descarga : false,
    columnas : false,
    ordenar: false,
    imprimir : false,
    seleccionable: permiteEditar?'multiple':'none',
    deshabilitarSeleccionMultiple: true,
    registrosPorPagina: 10,
  };

  return (
    <Card
      style={
        pregunta.datosValidos?
          {
            marginBottom: '10px',
            borderLeft:`3px solid ${pregunta.colorSeccion}`,
            margin:'8px 8px 16px 8px',
          }:{
            marginBottom: '10px',
            border:`1px solid red`,
            margin:'8px 8px 16px 8px',
          }}
    > 
      <Grid
        container
        xl={12}
        style={{padding:15,
          borderBottom: '2px solid rgba(224, 224, 224, 1)',
          position:'relative',
        }}
      > 
        <Grid
          item
          xs={5}
          sm={5}
          md={5}
          lg={5}
          xl={5}
        >
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Typography variant="h6" color="primary" style={{color: 'rgb(97, 97, 97)', fontSize: 20, fontWeight: 400, flexGrow: 1, textTransform: 'none'}}> 
              {pregunta.nombrePregunta}
            </Typography> 
          </Grid>
        </Grid>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
        ></Grid>
        <Grid
          item
          xs={5}
          sm={5}
          md={5}
          lg={5}
          xl={5}
        >         
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          > 
          </Grid>
        </Grid>
        {pregunta.tipoPregunta === 'PA' ? 
          <Grid
            container
            xl={11}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              {/* Falta poner en esta parte que se guarden las cosas (basarse de cuando le daba nombre a las preguntas muajaja) */}
              <TextField
                id="standard-full-width"
                fullWidth
                multiline
                style={{paddingLeft: 16, marginTop: 0}}
                onChange={onChangeRespuestaProxy(0,indice)} 
                value={pregunta.respuesta}
                margin="normal"
                InputProps={{
                  style: {
                    color: 'rgba(75, 75, 75, 0.87)',
                    fontSize: 14,
                  },
                }}
                disabled={!permiteEditar}
              />
            </Grid>
          </Grid>
          :null}
        {pregunta.tipoPregunta === 'CV' ? 
          <Grid
            style={{paddingLeft: 16}}
            container
            xl={11}
          >
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <FormGroup
                style={{paddingLeft:'12px',paddingTop:'10px'}}
              >
                {pregunta.datosPreguntas.map((dato,index) => (
                  <>
                  <FormControlLabel
                    control={<Checkbox 
                      checked={dato.respuesta} 
                      onChange={onChangeRespuestaProxy(1,indice,index,true)} 
                      style={{color: '#28950f',padding:'0px 12px 0px 0px'}}/>
                    }
                    label={dato.nombre}
                    disabled={!permiteEditar}
                  />
                </>
                ))}
              </FormGroup>
              <FormGroup
                name="Casilla verificacion"
              >
                {pregunta.datosPreguntas.map((dato,index) => (
                  <TextField
                    id={`standard-full-width ${dato.nombre}`}
                    fullWidth
                    style={{marginTop: 5,marginBottom:0,visibility:dato.captura?'initial':'hidden'}}
                    onChange={onChangeInputRespuestaProxy(1,indice,index)}
                    value={dato.valorTexto}
                    margin="normal"
                    disabled = {!permiteEditar}
                    InputProps={{
                      style: {
                        color: 'rgba(75, 75, 75, 0.87)',
                        fontSize: 14,
                      },
                    }}
                  />
                ))}
              </FormGroup>
              {/* </FormControl> */}
            </Grid>
          </Grid>
          :null}
        {pregunta.tipoPregunta === 'SM' ? 
          <Grid
            container
            xl={11}>
            <Grid
              style={{paddingLeft: 16}}
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              {/* Aqui debe ir un radio group n_n */}
              <RadioGroup
                name="Seleccion multiple"
                value={pregunta.respuesta}
                onChange={onChangeRespuestaProxy(0,indice)}
                style={{paddingLeft:'12px',paddingTop:'10px'}}
              >
                {pregunta.datosPreguntas.map((dato) => (
                  <FormControlLabel
                    value={`${dato.idPreguntaDetalle}`} 
                    style={{marginRight:'0px'}}
                    control={
                      <Radio 
                        style={{padding:'0px 5px 0px 0px',color: '#28950f'}}
                      />
                    }
                    label={<span style={{color: 'rgba(75, 75, 75, 0.87)'}}>{dato.nombre}</span>}
                    disabled={!permiteEditar}
                  />
                ))}
                
              </RadioGroup>
              <FormGroup
                name="Seleccion multiple"
              >
                {pregunta.datosPreguntas.map((dato,index) => (
                  <TextField
                    id={`standard-full-width ${dato.nombre}`}
                    fullWidth
                    style={{paddingLeft: 10, marginTop: 5,marginBottom:0,visibility:dato.captura?'initial':'hidden'}}
                    onChange={onChangeInputRespuestaProxy(0,indice,index)}
                    value={dato.valorTexto}
                    margin="normal"
                    disabled = {pregunta.respuesta !==`${dato.idPreguntaDetalle}` || !permiteEditar}
                    InputProps={{
                      style: {
                        color: 'rgba(75, 75, 75, 0.87)',
                        fontSize: 14,
                      },
                    }}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
          :null}
        {pregunta.tipoPregunta === 'LD' ? 
          <Grid
            container
            xl={11}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Seleccion
                opciones={pregunta.datosPreguntas}
                idOpcion='idPreguntaDetalle'
                nomOpcion='nombre'
                // fullWidth
                valor={pregunta.respuesta}
                onChange={onPreguntaListaChangeProxy}
                label='Ejemplo'
                indice={indice}
                inhabilitado={!permiteEditar}
              />
            </Grid>
          </Grid>
          :null}
        {pregunta.tipoPregunta === 'SP' ? 
          <Grid
            container
            style={{paddingLeft:'18px'}}
            xl={11}>
            {pregunta.datosPreguntas.map((dato,index) => (
              <>
                <Grid
                // container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <Typography 
                    variant="body1" 
                  > 
                    {dato.nombre}
                  </Typography> 
                </Grid>
                <Grid
                // container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  {/* Falta poner en esta parte que se guarden las cosas (basarse de cuando le daba nombre a las preguntas muajaja) */}
                  <TextField
                    id="standard-full-width"
                    fullWidth
                    multiline
                    onChange={onChangeRespuestaProxy(1,indice,index,false)} 
                    value={dato.respuesta}
                    margin="normal"
                    disabled={!permiteEditar}
                  />
                </Grid>
              </>
            ))}
          </Grid>
          :null}
        {pregunta.tipoPregunta === 'CVO' ? 
          <Grid
            container
            xl={11}
            style={{overflowY:'auto'}}
          >
            <Grid
              // container
              item
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              style={{paddingLeft: 16}}
            >
              <Grid item xs={12} style={{display: 'block'}}>
                <Grid
                  container
                >
                  <Container 
                    flexDirection="row"
                  >
                    <Typography 
                      variant="body1" 
                      className={classes.formControlLabel}
                      // color="primary" 
                      style={{marginTop:'10px', color: 'rgba(75, 75, 75, 0.87)', fontWeight: 'bold', fontSize: 14}}
                    > 
                  Preguntas
                    </Typography> 
                  </Container>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={9}
              sm={9}
              md={9}
              lg={9}
              xl={9}
            >
              <Grid item xs={12} style={{display: 'block'}}>
                <Grid
                  container
                >
                  <Container 
                    flexDirection="row"
                  >
                    {pregunta.datosOpciones.map((dato) => (
                      <Typography 
                        variant="body1" 
                        className={classes.formControlLabel}
                        style={{marginTop:'10px',paddingLeft:'5px', color: 'rgba(75, 75, 75, 0.87)', fontSize: 14, fontWeight: 'bold', position: 'relative', minHeight: 35}}
                      > 
                        <span style={{position: 'absolute', bottom: 0, right: 0, left: 0}}>{dato.nombre}</span>
                      </Typography> 
                    ))}
                    {/* Hacer recorrido con las opciones  */}
                  </Container>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
            >
              {/* Aqui recorrer las preguntas */}
              {pregunta.datosPreguntas.map((datoPregunta,indicePregunta) => (
                <>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={3}
                    lg={3}
                    xl={3}
                  >
                    <Typography 
                      variant="body1" 
                      style={{padding:'12px', color: 'rgba(75, 75, 75, 0.87)', fontSize: 14}}
                    > 
                      {`${indicePregunta+1}. ${datoPregunta.nombre}`}
                    </Typography> 
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    sm={9}
                    md={9}
                    lg={9}
                    xl={9}
                    style={{display: 'block'}}
                  >
                    {/* Aqui recorrer las opciones */}
                    <RadioGroup 
                      name="Seleccion multiple" 
                      value={datoPregunta.respuesta}
                      onChange={onChangeRespuestaProxy(1,indice,indicePregunta,false)}
                      style={{flexDirection: 'row', flexWrap: 'inherit', height: '100%', alignItems: 'center'}}
                      // disabled={!permiteEditar}
                    >
                      {pregunta.datosOpciones.map((datoOpcion) => (
                        <FormControlLabel
                          className={classes.formControlLabel}
                          value={`${datoOpcion.idPreguntaDetalle}`} 
                          control={
                            <Radio style={{color: '#28950f'}}/>
                          }
                          disabled={!permiteEditar}
                        />
                      ))}
                    </RadioGroup>
                  </Grid>
                </>
              ))}
            </Grid>
          </Grid>
          :null}
        {pregunta.tipoPregunta === 'SA' ? 
          <Grid
            container
            xl={11}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              {/* Falta poner en esta parte que se guarden las cosas (basarse de cuando le daba nombre a las preguntas muajaja) */}
              <Tabla
                data = {pregunta.datosArchivos}
                headers = {cabecerasArchivos}
                idPosition = "idPreguntaDetalle"
                configuracion = {configuracion}
                onRowsSelect  = {onRowSelectProxy}
                rowsSelected = {pregunta.datosSeleccionados}
                admin
                small = {0}
                elevacion={0}
              />
            </Grid>
          </Grid>
          :null}
      </Grid>
    </Card>
  )
}

TipoPregunta.propTypes = {
  classes: T.object,
  pregunta: T.object,
  indice: T.number,
  onPreguntaListaChangeProxy:T.func,
  onChangeRespuestaProxy:T.func,
  onChangeInputRespuestaProxy:T.func,
  permiteEditar:T.bool,
  cabecerasArchivos:T.array,
  documentacion: T.object,
  handleChangeArchivoProxy: T.func,
  handleDeleteArchivoProxy: T.func,
  handleDownloadArchivoProxy: T.func,
  onRowSelectProxy:T.func,  
};



export default compose(
  withStyles(styles),
  withHandlers({
    onPreguntaListaChangeProxy: (props) => (indice) => (event) => {
      const {
        onPreguntaListaChange,
      } = props;
      // if (!isUndefined(event))
      onPreguntaListaChange(indice,event.target.value);
    },
    onChangeRespuestaProxy: (props) => (tipo,indice,idDato,tipoBooleano) => (event) => {
      const {
        onChangeRespuestaMultiple,
      } = props;
      const valor = tipo === 1 && tipoBooleano? event.target.checked:event.target.value
      // if (!isUndefined(event))
      onChangeRespuestaMultiple(tipo,indice,idDato,valor);
    },
    onChangeInputRespuestaProxy: (props) => (tipo,indice,idDato) => (event) => {
      const {
        onChangeInputRespuesta,
      } = props;
      // if (!isUndefined(event))
      onChangeInputRespuesta(tipo,indice,idDato,event.target.value);
    },
    handleChangeArchivoProxy: (props) => (indicePregunta,indiceDato) => (event) => {
      const archivosValidos =
        [ 'xlsx','xls', 
          'pdf', 'doc', 
          'docx','png', 
          'jpg','jpeg']


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
            message: 'Archivo incompatible',
            options: {
              variant: 'warning',
            },
          })
        }
      }
      event.target.value = null;
      if(band){
        handleChangeArchivo(formData, arreglo,indicePregunta,indiceDato);
      }
    },
    handleDownloadArchivoProxy: (props) => (indicePregunta,indiceDato) => () => {
      const {
        handleDownloadArchivo,
      } = props;
      handleDownloadArchivo(indicePregunta,indiceDato);
    },
    handleDeleteArchivoProxy: (props) => (indicePregunta,indiceDato) => () => {
      const {
        handleDeleteArchivo,
      } = props;
      handleDeleteArchivo(indicePregunta,indiceDato);
    },
    onRowSelectProxy: (props) => (rowSeleccionado,seleccionados) => {
      const {
        indice,
        pregunta,
        onRowsSeleccionadosChange,
        notificacion,
      } = props

      let seleccionar = true
      let row = -1
      const rowSeleccionados = [] 

      seleccionados.forEach((seleccionado) => {
        row = seleccionado.dataIndex
        const datoArchivo = pregunta.datosArchivos[row]
        if(datoArchivo.requerido && !datoArchivo.subioEvidencia){
          seleccionar=false
        }else{
          rowSeleccionados.push(seleccionado.dataIndex)
        }
      })

      if(seleccionar){
        onRowsSeleccionadosChange(indice,rowSeleccionados)  
      }else{
        onRowsSeleccionadosChange(indice,rowSeleccionados)  
        notificacion({
          message: 'Es necesario subir el archivo obligatorio.',
          options: {
            variant: 'warning',
          },
        })
      }
      
    },
  })
)(TipoPregunta);

