import React, { useState }  from 'react';
import T from 'prop-types';
import { Grid, Typography, Button, List, ListItem, Fade } from '@material-ui/core';
import { BarChart } from '@material-ui/icons'
import { uniqueId } from 'lodash';
import GraficaPastel from './GraficaPastel';

const PreguntaCasillaDeVerificacion = (props) => { 
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
      fontSize: 12,
    },
    quantity: {
      width: '33.33333333333333%', 
      textAlign: 'center',
      fontSize: 12,
    },
    answerLabel: { 
      width: '33.33333333333333%', 
      float: 'left', 
      marginTop: 10,
      color: 'rgba(75, 75, 75, 0.87)',
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
    },
    listItem: {
      padding: 0,
    },
    infoLabels: {
      overflow: 'hidden',
      marginBottom: 10,
      fontSize: 12,
    },
    option: {
      color: 'rgba(75, 75, 75, 0.87)',
      fontSize: 12,
    },
  };

  const promedio = props.respuestas
    .map(respuesta => respuesta.resultado
      .filter(res => res.Calificacion > 0)
      .map(res => res.Calificacion)
      .reduce( (accumulator, currentValue) => accumulator + currentValue, 0)  
    ).reduce( (accumulator, currentValue) => accumulator + currentValue, 0) / props.respuestas.length; 
    
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
              props.requiereValidacion && props.tieneCalificacion
                ? (<Typography
                  style={styles.tituloPregunta}
                  inline
                >
                  Promedio: {promedio}
                </Typography>)
                : null
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
            <div>
              <div style={styles.infoLabels}>
                <Typography style={styles.answerLabel}>Respuestas</Typography>
                <Typography style={styles.quantityLabel}>Cantidad</Typography>
                {
                  props.tipoFormulario === 'SM' && <Typography style={styles.quantityLabel}>Calificación</Typography>
                }
              </div>
              <List style={{paddingTop: 0}}>
                {
                  props.respuestas.map((el, index) => (
                    <ListItem key={uniqueId('respuesta_')} style={styles.listItem}>
                      <div style={styles.answer}>
                        <Typography noWrap style={styles.option}>{`${index + 1} - ${el.Nombre}`}</Typography>
                      </div>
                      <div style={styles.quantity}>
                        
                        <Typography noWrap style={styles.option}>{el.resultado.length}</Typography>
                        
                      </div>
                      {/*
                        props.tipoFormulario === 'SM' && <div style={styles.quantity}>
                          {
                            <Typography noWrap>
                              {
                                (
                                  el.CalificacionRespuesta
                                    .reduce((accumulator, currentValue) => accumulator.CalificacionPreguntita + currentValue.CalificacionPreguntita)
                                  / el.CalificacionRespuesta.length 
                                )
                              }
                            </Typography>
                          }
                        </div>
                        */ }
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
                  {
                    <GraficaPastel 
                      labels={props.respuestas.map(respuesta => respuesta.Nombre)}
                      values={props.respuestas.map(respuesta => respuesta.resultado && parseFloat((respuesta.resultado.length/props.respuestas.length*100).toFixed(1)))}
                    />
                  }
                </div>
              </Fade>
            </Grid>
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

PreguntaCasillaDeVerificacion.propTypes = {
  nombre: T.string,
  id: T.number,
  respuestas: T.array,
  tipoFormulario: T.string,
  requiereValidacion: T.bool,
  tieneCalificacion: T.bool,
};

export default PreguntaCasillaDeVerificacion;
