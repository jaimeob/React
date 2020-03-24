import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, 
  CardContent, 
  CardActions, 
  Card, 
  Grid,
  Slide,
} from '@material-ui/core';
import PreguntaCasillaDeVerificacion from './PreguntaCasillaDeVerificacion';
import PreguntaAbierta from './PreguntaAbierta';
import PreguntaListaDesplegable from './PreguntaListaDesplegable';
import SeriePreguntas from './SeriePreguntas';
import PreguntaCasillaDeVariasOpciones from './PreguntaCasillaDeVariasOpciones';
import PreguntaSubirArchivo from './PreguntaSubirArchivo';

function Seccion(props) {
  const [checked, setChecked] = useState(false);

  const styles = {
    card: {
      width: '100%',
      ...(props.color ? {
        borderLeft: `3px solid ${props.color}`,
        borderBottom: `3px solid ${props.color}`,
      } : {} ),
      // boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 3px 2px',
      marginBottom: 15,
      marginTop: 0,
    },
    cardContent: {
      padding: 15,
      borderBottom: '2px solid rgb(224, 224, 224)',
      position: 'relative',
    },
    label: {
      color: '#616161',
      fontSize: 14,
    },
    description: {
      marginTop: 10,
      paddingLeft: 16,
      color: 'rgba(75, 75, 75, 0.87)',
      fontSize: 12,
    },
    textField: {
      fontSize: 14,
    },
    showQuestions: {
      cursor: 'pointer',
      fontWeight: 400,
      textTransform: 'inherit',
      color: 'blue',
      fontSize: 12,
    },
  };

  const renderTipoPregunta = (pregunta) => {
    switch(pregunta.TipoPregunta){
      case 'PA': {
        return (
          <PreguntaAbierta 
            nombre={pregunta.Nombre}
            respuestas={pregunta.respuestas}
            tipoFormulario={props.tipoFormulario}
            requiereValidacion={props.requiereValidacion}
            tieneCalificacion={pregunta.TieneCalificacion}
          />
        )
      }
      case 'CV': 
      case 'SM': {
        return (
          <PreguntaCasillaDeVerificacion
            nombre={pregunta.Nombre}
            respuestas={pregunta.respuestas}
            tipoFormulario={props.tipoFormulario}
            requiereValidacion={props.requiereValidacion}
            tieneCalificacion={pregunta.TieneCalificacion}
          />
        )
      }
      case 'LD': {
        return (
          <PreguntaListaDesplegable  
            nombre={pregunta.Nombre}
            respuestas={pregunta.respuestas}
            tipoFormulario={props.tipoFormulario}
            requiereValidacion={props.requiereValidacion}
            tieneCalificacion={pregunta.TieneCalificacion} 
          />
        )
      }
      case 'SP': {
        return (
          <SeriePreguntas
            nombre={pregunta.Nombre}
            respuestas={pregunta.respuestas}
            tipoFormulario={props.tipoFormulario}
            requiereValidacion={props.requiereValidacion}
            tieneCalificacion={pregunta.TieneCalificacion}
          />
        )
      }
      case 'CVO': {
        return (
          <PreguntaCasillaDeVariasOpciones
            nombre={pregunta.Nombre}
            respuestas={pregunta.respuestasPreguntitas}
            preguntas={pregunta.respuestas}
            tipoFormulario={props.tipoFormulario}
            requiereValidacion={props.requiereValidacion}
            tieneCalificacion={pregunta.TieneCalificacion} 
          />
        )
      }
      case 'SA': {
        return (
          <PreguntaSubirArchivo 
            nombre={pregunta.Nombre}
            preguntas={pregunta.respuestas}
            tipoFormulario={props.tipoFormulario}
            requiereValidacion={props.requiereValidacion}
            tieneCalificacion={pregunta.TieneCalificacion} 
          />
        )
      }
      default: {
        return null;
      }
    }
  }
  
  const promedioSeccion = props.requiereValidacion && props.respuestas
    .filter(formularioRespuestaSeccion => formularioRespuestaSeccion.Calificacion > 0)
    .map(formularioRespuestaSeccion => formularioRespuestaSeccion.Calificacion)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0) /  props.respuestas
    .filter(formularioRespuestaSeccion => formularioRespuestaSeccion.Calificacion > 0).length;

  return (
    <React.Fragment>
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <Grid container>
            <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Typography style={styles.label}>{props.nombre}</Typography>
              {
                (props.requiereValidacion && promedioSeccion > 0)
                  ?  <Typography style={styles.label}>Promedio: {promedioSeccion.toFixed(2)}</Typography> 
                  : null
              }
            </Grid>
            <Grid item xs={10}>
              <Typography style={styles.description}>{props.descripcion}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Typography style={styles.showQuestions} onClick={() => setChecked(!checked)}>
            {
              !checked ? 'Mostrar preguntas' : 'Ocultar preguntas'
            }
          </Typography>
        </CardActions>
      </Card>
      {
        props.preguntas.map(pregunta => (
          <Slide key={pregunta.FormularioPreguntaId} direction="right" in={checked} mountOnEnter unmountOnExit>
            <Card style={{...styles.card, ...{borderBottom: 0, minHeight: 280}}}>
              <CardContent style={{...styles.cardContent, ...{borderBottom: 0}}}>
                <Grid container>
                  {
                    renderTipoPregunta(pregunta)
                  }
                </Grid>
              </CardContent>
            </Card> 
          </Slide> 
        ))
      }
    </React.Fragment>
  );
}

Seccion.propTypes = {
  color: PropTypes.string,
  nombre: PropTypes.string,
  preguntas: PropTypes.array,
  descripcion: PropTypes.string,
  respuestas: PropTypes.array,
  tipoFormulario: PropTypes.string,
  requiereValidacion: PropTypes.bool,
};

Seccion.defaultProps = {
  nombre: '',
};

export default Seccion;
