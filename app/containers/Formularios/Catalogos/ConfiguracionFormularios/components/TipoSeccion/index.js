import React from 'react';
import T from 'prop-types';
// import { uniqueId} from 'lodash';
import { compose } from 'redux';
// import { withStyles } from '@material-ui/core/styles';
import { withHandlers,lifecycle } from 'recompose';
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
// import Seleccion from 'components/Seleccion';
import Switch from 'components/Switch';
import randomColor from 'randomcolor';
import Divider from '@material-ui/core/Divider';

// import Pregunta from '../Pregunta';
// import Opcion from '../Opcion';


function TipoSeccion(props){
  const {
    // classes,
    // datos,
    // cabeceras,
    totalPreguntas,
    onInputSeccionChangeProxy,
    onInputDescripcionSeccionChangeProxy,
    ordenarPreguntaProxy,
    eliminarPreguntaProxy,
    mostrarPreguntasProxy,
    copiarPreguntaProxy,
    pregunta,
    indice,
    arrayPreguntas,
    totalSecciones,
  } = props;
  // usar pregunta.datosValidos? colorNormal : colorRojo

  
  const numeroPreguntas = arrayPreguntas.filter(dato => dato.idSeccionTemporal === pregunta.idSeccionTemporal)
  return (
    <Card

      style={
        pregunta.datosValidos?
          {
            marginBottom: '10px',
            boxShadow: '0px 1px 3px 2px rgba(0,0,0,0.2)',
            borderLeft:`3px solid ${pregunta.colorSeccion}`,
            borderBottom:`3px solid ${pregunta.colorSeccion}`,
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
        <Tooltip title="Mover sección hacia arriba" placement="bottom">
          <IconButton 
            onClick={ordenarPreguntaProxy(0,1,indice)}
            style={{position:'absolute', right:3, top:-2, width:'2.5rem', height:'2.5rem'}}
            disabled={totalPreguntas<2 || indice === 0}
          > 
            <ArrowUp 
              style={{position:'absolute',width:'2rem', height:'2rem'}}
            /> 
          </IconButton>
        </Tooltip>
        <Tooltip title="Mover sección hacia abajo" placement="bottom">
          <IconButton 
            onClick={ordenarPreguntaProxy(0,0,indice)}
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
              onChange={onInputSeccionChangeProxy}
              // onChange={onInputChangeProxy(0,i)}
              nomCampo='Nombre sección'
              requerido
              focus
              isComplete={!pregunta.errorNombreSeccion}
              width='100%'
              mostrarShrink
              label = "Label"
              tipoInput='text'
              longitud='150'
              valor={pregunta.nombreSeccion}
              indice={indice}
            />
          </Grid>
        </Grid>
        <Grid
          container
          // xs={11}
          // sm={11}
          // md={11}
          // lg={11}
          xl={10}>
          {/* <Grid
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
          Descri
            </Typography> 
          </Grid> */}
          <Grid
            // container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{paddingTop:'10px'}}
          >
            <Input
              onChange={onInputDescripcionSeccionChangeProxy}
              // onChange={onInputChangeProxy(0,i)}
              nomCampo='Descripción'
              // requerido
              focus
              multiline
              isComplete={!pregunta.errorDescripcionSeccion}
              width='90%'
              mostrarShrink
              label = "Label"
              tipoInput='text'
              fullwidth
              // longitud='150'
              valor={pregunta.descripcionSeccion}
              indice={indice}
            />
          </Grid>
        </Grid>
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
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          // justify='flex-end'
          // style={{position:'relative'}}
        > 
          {numeroPreguntas.length>0
            ?
            <Typography
              variant="subtitle2"
              // className={classes.typography}
              style={{cursor: 'pointer',fontWeight: '400',textTransform:'inherit',marginLeft:'10px',marginTop:'11px',color:'blue'}} 
              onClick = {mostrarPreguntasProxy(indice,!pregunta.mostrarSeccion)}
              disabled = {numeroPreguntas.length === 0}
            >
              {pregunta.mostrarSeccion?`Ocultar ${numeroPreguntas.length} preguntas`:`Mostrar ${numeroPreguntas.length} preguntas`}
            </Typography>
            :
            null}

        </Grid>

        <Grid
          container
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          xl={8}
          justify='flex-end'
          // style={{position:'relative'}}
        > 
          <Tooltip title="Eliminar seccion" placement="bottom">
            <IconButton 
              onClick={eliminarPreguntaProxy(indice)}
              disabled={totalSecciones === 1}
            > 
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
          <Divider style={{height: 40,width:2,margin:3}}  orientation="vertical" />
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

TipoSeccion.propTypes = {
//   pestañaSeleccionada: T.number,
//   classes: T.object,
  totalPreguntas:T.number,
  totalSecciones:T.number,
  pregunta: T.object,
  onInputSeccionChangeProxy: T.func,
  onInputDescripcionSeccionChangeProxy:T.func,
  onInputRespuestaChangeProxy:T.func,
  ordenarPreguntaProxy: T.func,
  eliminarPreguntaProxy:T.func,
  copiarPreguntaProxy: T.func,
  mostrarPreguntasProxy:T.func,
  indice: T.number,
  arrayPreguntas: T.object,
};

const withLifecycle = lifecycle({
  componentWillMount() {
    const {
      onColorSeccionChange,
      pregunta,
      indice,
    } = this.props;
    if(pregunta.colorSeccion === ''){
      const color = randomColor({
        luminosity: 'bright',
      });
      onColorSeccionChange(indice,color)
    }
  },
  componentDidUpdate() {
    const {
      onColorSeccionChange,
      pregunta,
      indice,
    } = this.props;
    if(pregunta.colorSeccion === ''){
      const color = randomColor({
        luminosity: 'bright',
      });
      onColorSeccionChange(indice,color)
    }
  },
});

export default compose(
  // withStyles(styles),
  withLifecycle,
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
)(TipoSeccion);

