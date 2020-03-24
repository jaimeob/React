/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
import React, { useState }  from 'react';
import T from 'prop-types';
import { Grid, Typography, Button, List, ListItem, Fade } from '@material-ui/core';
import { BarChart } from '@material-ui/icons'
import { uniqueId } from 'lodash';
import GraficaHorizontal from './GraficaHorizontal';

const PreguntaListaDesplegable = (props) => {
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
    },
    answer: {
      width: '33.33333333333333%',
      paddingLeft: 16,
    },
    quantity: {
      width: '33.33333333333333%', 
      textAlign: 'center',
    },
    answerLabel: { 
      width: '33.33333333333333%', 
      float: 'left', 
      marginTop: 10,
      color: 'rgba(75, 75, 75, 0.87)',
      marginBottom: 10,
      fontWeight: 'bold',
      paddingLeft: 16,
      fontSize: 12,
    },
    quantityLabel: {
      width: '33.33333333333333%', 
      float: 'left', 
      textAlign: 'center',
      marginTop: 10,
      color: 'rgba(75, 75, 75, 0.87)',
      marginBottom: 10,
      fontWeight: 'bold',
      fontSize: 12,
    },
    containerGrafica: { 
      position: 'relative',
      whiteSpace: 'nowrap',
    },
    chartContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 400,
      right: 0,
      top: 10,
    },
    listItem: {
      padding: 0,
    },
    infoLabels: {
      overflow: 'hidden',
      marginBottom: 10,
    },
    option: {
      color: 'rgba(75, 75, 75, 0.87)',
      fontSize: 12,
    },
  };

  const promedio = props.respuestas.map(respuesta => 
  
    !isNaN(respuesta.resultado
      .filter(resultado => resultado.Calificacion > 0)
      .map(resultado => resultado.Calificacion)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
      / 
      respuesta.resultado.filter(resultado => resultado.Calificacion > 0).length)
      ? respuesta.resultado
        .filter(resultado => resultado.Calificacion > 0)
        .map(resultado => resultado.Calificacion)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
      / 
      respuesta.resultado.filter(resultado => resultado.Calificacion > 0).length
      : 0
  )
    .reduce((accumulator, currentValue) => accumulator + currentValue , 0) 
      / 
      props.respuestas.length



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
        <Grid container>
          <Grid item xs={6}>
            <div style={styles.wrapInfo}>
              <div>
                <Typography style={styles.answerLabel}>Respuestas</Typography>
                <Typography style={styles.quantityLabel}>Cantidad</Typography>
                <Typography style={styles.quantityLabel}>Calificación</Typography>
              </div>
              <List style={{paddingTop: 0}}>
                {
                  props.respuestas.map((respuesta, index) => (
                    <ListItem key={uniqueId('respuesta_')} style={styles.listItem}>
                      <div style={styles.answer}>
                        <Typography noWrap style={styles.option}>{`${index + 1} - ${respuesta.Nombre}`}</Typography>
                      </div>
                      <div style={styles.quantity}>
                        {
                          <Typography noWrap style={styles.option}>{respuesta.resultado.length}</Typography>
                        }
                      </div>
                      <div style={styles.quantity}>
                        {
                          props.requiereValidacion === true && (
                            <Typography noWrap style={styles.option}>
                              {
                                !isNaN(respuesta.resultado
                                  .filter(resultado => resultado.Calificacion > 0)
                                  .map(resultado => resultado.Calificacion)
                                  .reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
                                  / 
                                  respuesta.resultado.filter(resultado => resultado.Calificacion > 0).length)
                                  ? respuesta.resultado
                                    .filter(resultado => resultado.Calificacion > 0)
                                    .map(resultado => resultado.Calificacion)
                                    .reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
                                  / 
                                  respuesta.resultado.filter(resultado => resultado.Calificacion > 0).length
                                  : 0
                              }
                            </Typography>
                          )
                        }
                      </div>
                    </ListItem>
                  ))
                }
              </List>
            </div>
          </Grid>
          {
            <Grid item xs={6} style={styles.containerGrafica}>
              <Fade timeout={1000} in={!openCollapse.includes(props.id)}>
                <div style={styles.chartContainer}>
                  <GraficaHorizontal 
                    labels={props.respuestas.map(respuesta => respuesta.Nombre)}
                    values={
                      props.respuestas.map(respuesta => respuesta.resultado
                        .filter(resultado => resultado.Calificacion > 0)
                        .map(resultado => resultado.Calificacion)
                        .reduce( (accumulator, currentValue) => accumulator + currentValue, 0) 
                        / 
                        respuesta.resultado.filter(resultado => resultado.Calificacion > 0).length)
                    }                    
                  />
                </div>
              </Fade>
            </Grid>
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

PreguntaListaDesplegable.propTypes = {
  nombre: T.string,
  id: T.number,
  respuestas: T.array,
  tipoFormulario: T.string,
  requiereValidacion: T.bool,
};

export default PreguntaListaDesplegable;
