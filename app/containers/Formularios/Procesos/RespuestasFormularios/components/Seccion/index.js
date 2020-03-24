import React from 'react';
import T from 'prop-types';
// import { uniqueId} from 'lodash';
import { compose } from 'redux';
// import { withStyles } from '@material-ui/core/styles';
import { withHandlers,lifecycle} from 'recompose';
import Input from 'components/FormInput';
import {
  Grid,
  Card,
  Typography,
  InputBase,
  // AppBar,
} from '@material-ui/core';

function TipoSeccion(props){
  const {
    mostrarPreguntasProxy,
    pregunta,
    indice,
    arrayPreguntas,
  } = props;
  // usar pregunta.datosValidos? colorNormal : colorRojo
  const numeroPreguntas = arrayPreguntas.filter(dato => dato.idSeccionTemporal === pregunta.idSeccionTemporal)

  return (
    <Card
      style={
        pregunta.datosValidos?
          {
            marginBottom: '10px',
            borderLeft:`3px solid ${pregunta.colorSeccion}`,
            borderBottom:`3px solid ${pregunta.colorSeccion}`,
            // borderLeftStyle: 'solid',
            // borderLeftColor: 'blue',
            margin:'8px 8px 15px 8px',
          }:{
            marginBottom: '10px',
            // boxShadow: '0px 1px 3px 2px rgba(0,0,0,0.2)',
            border:`1px solid red`,
            // borderLeftStyle: 'solid',
            // borderLeftColor: 'blue',
            margin:'8px 8px 15px 8px',
          }}
      
      // style={{margin:'8px 8px 15px 8px'}}
    > 
      <Grid
        container
        xl={12}
        style={{padding:15,
          borderBottom: '2px solid rgba(224, 224, 224, 1)',
          position:'relative',
        }}
      > 
        {/* <IconButton 
          onClick={ordenarPreguntaProxy(0,1,indice)}
          style={{position:'absolute', right:3, top:-2, width:'2.5rem', height:'2.5rem'}}
          disabled={totalPreguntas<2 || indice === 0}
        > 
          <ArrowUp 
            style={{position:'absolute',width:'2rem', height:'2rem'}}
          /> 
        </IconButton>
        <IconButton 
          onClick={ordenarPreguntaProxy(0,0,indice)}
          style={{position:'absolute', right:3, bottom: -2, width:'2.5rem', height:'2.5rem'}}
          disabled={totalPreguntas<2 || indice+1 === totalPreguntas}
        > 
          <ArrowDown 
            style={{position:'absolute',width:'2rem', height:'2rem'}}
          /> 
        </IconButton> */}
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
            {/* Aqui va el nombre de la seccion que ya dee */}
            <Typography className="pestaña" variant="h5" color="primary" style={{color: '#616161', fontSize: 20, flexGrow: 1, textTransform: 'none'}}> 
              {pregunta.nombreSeccion}
            </Typography> 
            {/* <Input
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
            /> */}
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
            style={{paddingTop:'3px'}}
          >
            {/* <Typography 
              className="letras" 
              variant="h4" 
              color="primary" 
              style={{marginTop: 10, paddingLeft: 16, color: 'rgba(75, 75, 75, 0.87)', flexGrow: 1, textTransform: 'none', fontSize: '0.875rem'}}> 
              {pregunta.descripcionSeccion}
            </Typography>  */}
            <InputBase
              id="standard-full-width"
              fullWidth
              multiline
              style={{color: '#616161',paddingLeft: 16, marginTop: 0}}
              // onChange={onChangeRespuestaProxy(0,indice)} 
              value={pregunta.descripcionSeccion}
              margin="normal"
              disabled
              inputProps={{ 'aria-label': 'naked' }}
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
          style={{position:'relative', padding: '8px 4px'}}
        > 
          {numeroPreguntas.length>0
            ?
            <Typography
              variant="subtitle2"
              // className={classes.typography}
              style={{cursor: 'pointer', fontWeight: '400', textTransform:'inherit', margin: '0 4px', color:'blue'}} 
              onClick = {mostrarPreguntasProxy(indice,!pregunta.mostrarSeccion)}
              disabled = {numeroPreguntas.length === 0}
            >
              {pregunta.mostrarSeccion?`Ocultar preguntas`:`Mostrar preguntas`}
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
          {/* <IconButton 
            onClick={eliminarPreguntaProxy(indice)}
            disabled={totalSecciones === 1}
          > 
            <DeleteIcon/>
          </IconButton>
          <Divider style={{height: 40,width:2,margin:3}}  orientation="vertical" />
          <IconButton 
            onClick={copiarPreguntaProxy(indice,1)}
          > 
            <AnadirIcon/>
          </IconButton> */}
        </Grid>
      </Grid>
    </Card>
  )
}

TipoSeccion.propTypes = {
//   pestañaSeleccionada: T.number,
//   classes: T.object,
  pregunta: T.object,
  mostrarPreguntasProxy:T.func,
  indice: T.number,
  arrayPreguntas: T.array,
};

export default compose(
  // withStyles(styles),
  // withLifecycle,
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

