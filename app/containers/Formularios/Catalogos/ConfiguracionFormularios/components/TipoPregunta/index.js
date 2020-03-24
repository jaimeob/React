import React from 'react';
import T from 'prop-types';
// import { uniqueId} from 'lodash';
import { compose } from 'redux';
// import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import Input from 'components/FormInput';
import {
  Grid,
  Card, 
  Typography,
  FormControlLabel,
  TextField,
  IconButton,
  Tooltip,
  // AppBar,
} from '@material-ui/core';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import AnadirIcon from '@material-ui/icons/PlaylistAddOutlined';
import Seleccion from 'components/Seleccion';
import Switch from 'components/Switch';
import Divider from '@material-ui/core/Divider';

import Pregunta from '../Pregunta';
import Opcion from '../Opcion';


function TipoPregunta(props){
  const {
    // classes,
    // datos,
    // cabeceras,
    tipoFormulario,
    validacion,
    totalPreguntas,
    regresarAction,
    onInputPreguntaChangeProxy,
    onInputRespuestaChangeProxy,
    ordenarPreguntaProxy,
    eliminarPreguntaProxy,
    copiarPreguntaProxy,
    pregunta,
    tipoPreguntas,
    onInputTipoPreguntaChangeProxy,
    onInputDatoPreguntaChangeProxy,
    onInputValorPreguntaChangeProxy,
    onInputCheckPreguntaChange,
    onInputCheckOpcionChange,
    ordenarDatosPreguntaProxy,
    eliminarDatosPreguntaProxy,
    onAgregarDatoPregunta,
    indice,
    arrayPreguntas,    

  } = props;
  // usar pregunta.datosValidos? colorNormal : colorRojo
  // const colorBorde = pregunta.datosValidos? 'white':'red'
  const mostrarValor = tipoFormulario === 'REFEVA' || (tipoFormulario === 'REFENC' && validacion)
  // console.log("Las preguntas",arrayPreguntas)
  // const totalPreguntasSeccion = arrayPreguntas.filter(dato => dato.idSeccionTemporal === pregunta.idSeccionTemporal)
  // console.log("Las preguntas",totalPreguntasSeccion)
  // console.log("La logitug",totalPreguntasSeccion.length)
  return (
    <Card
      style={
        pregunta.datosValidos?
          {
            marginBottom: '10px',
            boxShadow: '0px 1px 3px 2px rgba(0,0,0,0.2)',
            borderLeft:`3px solid ${pregunta.colorSeccion}`,
            // borderLeftStyle: 'solid',
            // borderLeftColor: 'blue',
            margin:'8px 8px 16px 8px',
          }:{
            marginBottom: '10px',
            boxShadow: '0px 1px 3px 2px rgba(0,0,0,0.2)',
            border:`1px solid red`,
            // borderLeftStyle: 'solid',
            // borderLeftColor: 'blue',
            margin:'8px 8px 16px 8px',
          }}
      
      // style={{margin:'8px 8px 16px 8px'}}
    > 
      <Grid
        container
        // xs={12}
        // sm={12}
        // md={12}
        // lg={12}
        xl={12}
        style={{padding:15,
          borderBottom: '2px solid rgba(224, 224, 224, 1)',
          position:'relative',
        }}
      > 
        <Tooltip title="Mover pregunta hacia arriba" placement="bottom">
          <IconButton 
            onClick={ordenarPreguntaProxy(1,1,indice)}
            style={{position:'absolute', right:3, top:-2, width:'2.5rem', height:'2.5rem'}}
            disabled={totalPreguntas<2 || indice === 0 || indice === 1}
          > 
            <ArrowUp 
              style={{position:'absolute',width:'2rem', height:'2rem'}}
            /> 
          </IconButton>
        </Tooltip>
        <Tooltip title="Mover pregunta hacia abajo" placement="bottom">
          <IconButton 
            onClick={ordenarPreguntaProxy(1,0,indice)}
            style={{position:'absolute', right:3, bottom: -2, width:'2.5rem', height:'2.5rem'}}
            disabled={totalPreguntas<2 || indice+1 === totalPreguntas}
          > 
            <ArrowDown 
              style={{position:'absolute',width:'2rem', height:'2rem'}}
            /> 
          </IconButton>
        </Tooltip>
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
            <Input
              onChange={onInputPreguntaChangeProxy}
              // onChange={onInputChangeProxy(0,i)}
              nomCampo='Pregunta'
              requerido
              focus
              isComplete={!pregunta.errorNombrePregunta}
              width='100%'
              mostrarShrink
              label = "Label"
              tipoInput='text'
              longitud='150'
              valor={pregunta.nombrePregunta}
              indice={indice}
            />
          </Grid>
          {pregunta.tipoPregunta !== '' && pregunta.tipoPregunta !== 'PA'? 
            <Pregunta
              regresarAction  = {regresarAction}
              indicePregunta={indice}
              pregunta = {pregunta}
              onInputDatoPreguntaChangeProxy = {onInputDatoPreguntaChangeProxy}
              onInputValorPreguntaChangeProxy = {onInputValorPreguntaChangeProxy}
              onInputCheckPreguntaChange = {onInputCheckPreguntaChange}
              onAgregarDatoPregunta={onAgregarDatoPregunta}
              ordenarDatosPreguntaProxy={ordenarDatosPreguntaProxy}
              eliminarDatosPreguntaProxy={eliminarDatosPreguntaProxy}
              tipoFormulario={tipoFormulario}
              validacion={validacion}
            />
            :null}
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
            <Seleccion
              opciones={tipoPreguntas}
              idOpcion='Referencia'
              nomOpcion='Nombre'
              fullWidth
              requerido
              valor={pregunta.tipoPregunta}
              onChange={onInputTipoPreguntaChangeProxy}
              label='Tipo de pregunta:'
              indice={indice}
              campoValido={!pregunta.errorTipoPregunta}
            />
          </Grid>
          {pregunta.tipoPregunta !== '' && pregunta.tipoPregunta === 'CVO'? 
            <Opcion
              regresarAction  = {regresarAction}
              tipoPregunta = {pregunta.tipoPregunta}
              indicePregunta={indice}
              pregunta = {pregunta}
              onInputDatoPreguntaChangeProxy = {onInputDatoPreguntaChangeProxy}
              onInputValorPreguntaChangeProxy= {onInputValorPreguntaChangeProxy}
              onAgregarDatoPregunta={onAgregarDatoPregunta}
              ordenarDatosPreguntaProxy={ordenarDatosPreguntaProxy}
              eliminarDatosPreguntaProxy={eliminarDatosPreguntaProxy}
              tipoFormulario={tipoFormulario}
              validacion={validacion}
              onInputCheckOpcionChange={onInputCheckOpcionChange}
            />
            :null}
        </Grid>
        {pregunta.tipoPregunta === 'PA' ? 
          <Grid
            container
            // xs={11}
            // sm={11}
            // md={11}
            // lg={11}
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
              <Typography 
                variant="body1" 
                // color="primary" 
                style={{marginTop:'10px'}}
              > 
          Respuesta
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
              <TextField
                disabled
                id="standard-full-width"
                fullWidth
                multiline
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse arcu tortor, lacinia in ornare id, posuere porttitor orci. Quisque auctor neque egestas libero pharetra, eu euismod ligula molestie. Praesent congue sit amet velit vitae posuere. Integer eget orci ac purus iaculis porttitor id vel sapien."
                margin="normal"
              />
            </Grid>
          </Grid>
          :null}
      </Grid>
      <Grid
        container
        // xs={12}
        // sm={12}
        // md={12}
        // lg={12}
        xl={12}
      // style={{position:'relative'}}
      > 
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          justify='flex-end'
          // style={{position:'relative'}}
        > 
          {(pregunta.tipoPregunta === 'SM' || pregunta.tipoPregunta === 'LD' || pregunta.tipoPregunta === 'CVO') && mostrarValor ?
              <>
                <FormControlLabel
                  style={{ margin:0 }}
                  control={
                    <Switch
                      checked={pregunta.tieneCalificacion}
                      onChange={onInputRespuestaChangeProxy(indice,1)}  
                    />
                  }
                  label="Tiene calificación"
                  labelPlacement="start"
                />
              <Divider style={{height: 40,width:2,margin:3}} orientation="vertical" />
            </>
            :null
          }

          <FormControlLabel
            style={{ margin:0 }}
            control={
              <Switch
                checked={pregunta.solicitarRespuesta}
                onChange={onInputRespuestaChangeProxy(indice,0)}  
              />
            }
            label="Solicitar una respuesta"
            labelPlacement="start"
          />
          <Tooltip title="Copiar pregunta" placement="bottom">
            <IconButton 
              onClick={copiarPreguntaProxy(indice,0)}
            > 
              <CopyIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar pregunta" placement="bottom">
            <IconButton 
              onClick={eliminarPreguntaProxy(indice)}
            > 
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
          <Divider style={{height: 40,width:2,margin:3}} orientation="vertical" />
          <Tooltip title="Agregar pregunta" placement="bottom">
            <IconButton 
              onClick={copiarPreguntaProxy(indice,1)}
            > 
              <AnadirIcon/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  )
}

TipoPregunta.propTypes = {
//   pestañaSeleccionada: T.number,
//   classes: T.object,
  totalPreguntas:T.number,
  pregunta: T.object,
  regresarAction: T.func,
  onInputPreguntaChangeProxy: T.func,
  onInputRespuestaChangeProxy:T.func,
  ordenarPreguntaProxy: T.func,
  eliminarPreguntaProxy:T.func,
  copiarPreguntaProxy: T.func,
  onInputTipoPreguntaChangeProxy: T.func,
  tipoPreguntas: T.array,
  arrayPreguntas:T.object,
  onInputDatoPreguntaChangeProxy: T.func,
  onInputValorPreguntaChangeProxy: T.func,
  onInputCheckPreguntaChange: T.func,
  onInputCheckOpcionChange:T.func,
  onAgregarDatoPregunta: T.func,
  ordenarDatosPreguntaProxy: T.func,
  eliminarDatosPreguntaProxy:T.func,
  indice: T.number,
  tipoFormulario:T.string,
  validacion: T.bool,
};



export default compose(
  // withStyles(styles),
  withHandlers({
    onInputDatoPreguntaChangeProxy: (props) => (tipo,indice, indicePregunta) => (event) => {
      const {
        onInputDatoPreguntaChange,
      } = props;
      // if (!isUndefined(event))
      onInputDatoPreguntaChange(tipo,indice,indicePregunta,event.target.value);
    },
    onInputValorPreguntaChangeProxy: (props) => (tipo,tipoValor,indice, indicePregunta) => (event) => {
      const {
        onInputValorPreguntaChange,
      } = props;
      // if (!isUndefined(event))
      onInputValorPreguntaChange(tipo,tipoValor,indice,indicePregunta,event.target.value);
    },
    ordenarDatosPreguntaProxy: (props) => (tipo,tipoOrdenamiento,indice, indicePregunta) => () => {
      const {
        ordenarDatosPregunta,
      } = props;
      ordenarDatosPregunta(tipo,tipoOrdenamiento,indice,indicePregunta);
    },
    eliminarDatosPreguntaProxy: (props) => (tipo,indice, indicePregunta) => () => {
      const {
        eliminarDatosPregunta,
      } = props;
      eliminarDatosPregunta(tipo,indice,indicePregunta);
    },
  })
)(TipoPregunta);

