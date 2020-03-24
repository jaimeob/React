import React, { useState }  from 'react';
import T from 'prop-types';
import { Grid, Typography, Button, List, ListItem, Fade } from '@material-ui/core';
import { BarChart } from '@material-ui/icons'
import { uniqueId } from 'lodash';
import GraficaPastel from './GraficaPastel';

const PreguntaSeleccionMultiple = (props) => {
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
      fontSize: 20,
    },
    grid: {
      marginBottom: 20,
    },
    paper: {
      position: 'relative',
      padding: 37,
    },
    showGraph: {
      color: '#616161',
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 9999,
    },
    answer: {
      width: '50%',
    },
    quantity: {
      width: '50%', 
      textAlign: 'center',
    },
    answerLabel: { 
      width: '50%', 
      float: 'left', 
      paddingLeft: 16,
      marginTop: 10,
    },
    quantityLabel: {
      width: '50%', 
      float: 'left', 
      textAlign: 'center',
      marginTop: 10,
    },
    containerGrafica: { 
      position: 'relative',
      whiteSpace: 'nowrap',
    },
    chartContainer: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: -15,
      width: '100%',
    },
    wrapInfo: {
      maxWidth: 250,
    },
  };

  let totalRespuestas = 0;
  
  props.respuestas.forEach(respuesta => {
    totalRespuestas += respuesta.Resultados.length;
  });

  return (
    <Grid style={styles.grid} container>
      <Grid item xs={12} style={styles.paper}>
        <div>
          <Typography
            style={styles.tituloPregunta}
            inline
          >
            {props.nombre}
          </Typography>
          <Button style={styles.showGraph} onClick={(e) => handleClick(e, props.id)}>
            <BarChart />
          </Button>
        </div>
        <Grid container>
          <Grid item xs={6}>
            <div style={styles.wrapInfo}>
              <div>
                <Typography style={styles.answerLabel}>Respuestas</Typography>
                <Typography style={styles.quantityLabel}>Cantidad</Typography>
              </div>
              <List style={{paddingTop: 0}}>
                {
                  props.respuestas.map((el, index) => (
                    <ListItem key={uniqueId('respuesta_')}>
                      <div style={styles.answer}>
                        <Typography noWrap>{`${index + 1} - ${el.Nombre}`}</Typography>
                      </div>
                      <div style={styles.quantity}>
                        {
                          <Typography noWrap>{el.Resultados.length}</Typography>
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
              <Fade timeout={1000} in={openCollapse.includes(props.id)}>
                <div style={styles.chartContainer}>
                  <GraficaPastel 
                    labels={props.respuestas.map(respuesta => respuesta.Nombre)}
                    values={props.respuestas.map(respuesta => parseFloat((respuesta.Resultados.length/totalRespuestas*100).toFixed(1)))}
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

PreguntaSeleccionMultiple.propTypes = {
  nombre: T.string,
  id: T.number,
  respuestas: T.array,
};

export default PreguntaSeleccionMultiple;
