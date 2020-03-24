/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-sequences */
/* eslint-disable no-return-assign */
import React, { useState }  from 'react';
import T from 'prop-types';
import { Grid, Typography, Button, List, ListItem, Fade  } from '@material-ui/core';
import { BarChart } from '@material-ui/icons'
import { uniqueId, groupBy } from 'lodash';
import {rotate270} from "2d-array-rotation";
import GraficaBarras from './GraficaBarras';
 
const PreguntaCasillaDeVariasOpciones = (props) => {
  const [openCollapse, setOpenCollapse] = useState([]);

  const handleClick = (event, id) => {
    const selectedIndex = openCollapse.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(openCollapse, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(openCollapse.slice(1));
    } else if (selectedIndex === openCollapse.length - 1) {
      newSelected = newSelected.concat(openCollapse.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        openCollapse.slice(0, selectedIndex),
        openCollapse.slice(selectedIndex + 1),
      );
    }

    setOpenCollapse(newSelected);
  };

  const styles = {
    tituloPregunta: {
      color: '#616161',
      fontSize: 14,
    },
    grid: {
      marginBottom: 20,
    },
    paper: {
      position: 'relative',
    },
    showGraph: {
      color: '#616161',
      // position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 9999,
      opacity: 1,
    },
    questionLabel: {
      marginTop: 10,
      paddingLeft: 16,
      color: 'rgba(75, 75, 75, 0.87)',
      fontWeight: 'bold',
      fontSize: 12,
    },
    answerText: {
      fontWeight: 'bold',
      width: '100%',
      textAlign: 'center',
      color: 'rgba(75, 75, 75, 0.87)',
    },
    answer: {
      width: 85,
      position: 'relative',
      marginTop: 0,
      padding: '8px',
    },
    listPuntaje: {
      // marginTop: 5,
      display: 'flex',
      padding: 0,
     
    },
    puntaje: {
      justifyContent: 'center',
    },
    listRespuesta: { 
      display: 'flex', 
      flexDirection: 'row', 
      padding: 0, 
      justifyContent: 'space-around',
    },
    containerRespuesta: {
      overflow:  openCollapse.includes(props.id) ? 'unset' : 'auto',
      overflowY:  openCollapse.includes(props.id) ? 'unset' :'auto',
      position: 'relative',
      whiteSpace: 'nowrap',
    },
    containerTotalRespuesta: {
      position: 'relative', 
      top: -13,
      marginTop: 4,
    },
    total: {
      width: '100%',
      textAlign: 'center',
      fontSize: 12,
    },
    option: {
      color: 'rgba(75, 75, 75, 0.87)',
      fontSize: 12,
    },
  };
  
  // Hacer constante donde traiga la cantidad de preguntas sobre la cual voy a dividir
  /*
  const preguntasCalificaciones = []
  for (let i = 0; i < props.preguntas.length; i+=1) {
    const pregunta = props.preguntas[i]
    const idPregunta = pregunta.FormularioPreguntaDetalleId
    let calificacion = 0
    let preguntasAplicadas = 0 
    let sumaPreguntas = 0 
    for (let j = 0; j < pregunta.CalificacionRespuesta.length; j+=1) {
      const preguntita = pregunta.CalificacionRespuesta[j]
      if(!preguntita.FPDO[0].NoAplica){
        preguntasAplicadas+=1
        sumaPreguntas += preguntita.CalificacionPreguntita
      }
    }
    if(preguntasAplicadas>0){
      calificacion = sumaPreguntas/preguntasAplicadas
    }
    preguntasCalificaciones.push({idPregunta,calificacion})
  }
*/
  // Agregar una respuesta por default si no han contestado nada
  props.respuestas.forEach(respuesta => {
    props.preguntas.forEach(pregunta => {
      const idsRespuesta = pregunta.resultado.map(res => res.IdRespuesta);
      if(!idsRespuesta.includes(respuesta.FormularioPreguntaDetalleId)){
        pregunta.resultado.push({
          IdRespuesta: respuesta.FormularioPreguntaDetalleId,
        })
      }
    });
  });

  const labelsPreguntas = props.preguntas.map(pregunta => pregunta.Nombre);

  const resultadosRespuestas = props.preguntas.map(pregunta => (
    Object.values(groupBy(pregunta.resultado, 'IdRespuesta')).map(resultado => (  
      // Filtrar por el atributo IdFormularioPreguntaDetalle, si lo tiene quiere decir que hay una respuesta si no, poner 0 por default
      resultado
        .filter(res =>Object.prototype.hasOwnProperty
          .call(res, 'IdFormularioPreguntaDetalle')).
        length > 0 ? resultado.length : 0
    ))
  ))

  const datasetsGrafica = props.respuestas.map((el, index) => ({
    respuesta: el.Nombre,
    resultados: rotate270(resultadosRespuestas).reverse()[index], 
  }))

  const promedio = props.preguntas.map(pregunta => (
    !isNaN(pregunta.resultado
      .filter(resultado => resultado.Calificacion > 0)
      .map(resultado => resultado.Calificacion)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
      / 
      pregunta.resultado.filter(resultado => resultado.Calificacion > 0).length)
      ? pregunta.resultado
        .filter(resultado => resultado.Calificacion > 0)
        .map(resultado => resultado.Calificacion)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
      / 
      pregunta.resultado.filter(resultado => resultado.Calificacion > 0).length
      : 0
  )).reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
    / 
  props.preguntas.filter(pregunta => pregunta.resultado.filter(resultado => resultado.Calificacion > 0).length > 0).length;

  

  return (
    <Grid style={styles.grid} container>
      <Grid item xs={12} style={styles.paper}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography
            style={styles.tituloPregunta}
            inline
          >
            {props.nombre}
          </Typography>
          <div>
            {
              props.requiereValidacion && (
                <Typography
                  style={styles.tituloPregunta}
                  inline
                >
                  Promedio: {promedio.toFixed(2)}
                </Typography>
              )
            }
            {
              props.tipoFormulario !== 'REFEVA'
                ? ( 
                  <Button style={styles.showGraph} onClick={(e) => handleClick(e, props.id)}>
                    <BarChart />
                  </Button>
                )
                : null  
            }
          </div>
        </div>
        <div hidden={openCollapse.includes(props.id)}>
          <Grid item xs={12}>
            <Fade timeout={1000} in={!openCollapse.includes(props.id)}>
              <div>
                {
                  <GraficaBarras 
                    datasetsGrafica={datasetsGrafica} 
                    labelsPreguntas={labelsPreguntas}
                  /> 
                }
              </div>
            </Fade>
          </Grid>
        </div>
        <Grid container>
          <Grid item xs={3}>
            <Typography style={styles.questionLabel}>Preguntas</Typography>
            <List style={{paddingTop: 0}}>
              {
                props.preguntas.map((pregunta, index) => (
                  <ListItem key={uniqueId('pregunta_')} style={{marginTop: 0}}>
                    <Typography 
                      noWrap 
                      style={styles.option}
                    >
                      {`${index + 1} - ${pregunta.Nombre}`}
                    </Typography>
                  </ListItem>
                ))
              }
            </List>
          </Grid>
          <Grid item xs={3}>
            {
              props.requiereValidacion && <Typography style={{...styles.questionLabel, textAlign: 'center'}}>Calificaciones</Typography>
            }
            <List style={{paddingTop: 0}}>
              {
                props.preguntas.map(pregunta => (
                  <ListItem style={{justifyContent: 'center', marginTop: 0}} key={uniqueId('respuesta_calificacion_')}>
                    <Typography noWrap style={styles.option}>
                      {
                        !isNaN(pregunta.resultado
                          .filter(resultado => resultado.Calificacion > 0)
                          .map(resultado => resultado.Calificacion)
                          .reduce( (accumulator, currentValue) => accumulator + currentValue, 0) 
                          / 
                          pregunta
                            .resultado
                            .filter(resultado => resultado.Calificacion > 0).length)
                          ? (pregunta.resultado
                            .filter(resultado => resultado.Calificacion > 0)
                            .map(resultado => resultado.Calificacion)
                            .reduce( (accumulator, currentValue) => accumulator + currentValue, 0) 
                          / 
                          pregunta
                            .resultado
                            .filter(resultado => resultado.Calificacion > 0).length).toFixed(2)
                          : 0
                      }
                    </Typography>
                  </ListItem>
                ))
              }
            </List>
          </Grid>
          <Grid item xs={6} style={styles.containerRespuesta}>
            <List style={styles.listRespuesta}>
              {
                props.respuestas.map((el) => (
                  <ListItem style={styles.answer} key={uniqueId('respuesta_')}>
                    <Typography style={styles.answerText} noWrap>{el.Nombre}</Typography>
                  </ListItem>
                ))
              }
            </List>
            <div style={styles.containerTotalRespuesta}>
              {
                props.preguntas.map(pregunta => (
                  <List  
                    key={uniqueId('preguntas_listado_')} 
                    style={styles.listPuntaje}
                  >
                    <ListItem key={uniqueId('puntaje_')}>
                      {
                        Object.values(groupBy(pregunta.resultado, 'IdRespuesta')).map(resultado => (
                          <Typography key={uniqueId('respuesta_resultado_')} style={styles.total} noWrap>
                            {
                              // Filtrar por el atributo IdFormularioPreguntaDetalle, si lo tiene quiere decir que hay una respuesta si no, poner 0 por default
                              resultado
                                .filter(res =>Object.prototype.hasOwnProperty
                                  .call(res, 'IdFormularioPreguntaDetalle')).
                                length > 0 ? resultado.length : 0}
                          </Typography>
                        ))
                      }
                    </ListItem>

                  </List>
                )
                )   
              }
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

PreguntaCasillaDeVariasOpciones.propTypes = {
  preguntas: T.array,
  respuestas: T.array,
  nombre: T.string,
  id: T.number,
  requiereValidacion: T.bool,
  tipoFormulario: T.string,
};

export default PreguntaCasillaDeVariasOpciones;
