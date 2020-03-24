import React from 'react';
import T from 'prop-types';
import { Grid, Typography, List, ListItem } from '@material-ui/core';
import { uniqueId } from 'lodash';

const SeriePreguntas = (props) => {
  const styles = {
    tituloPregunta: {
      color: '#616161',
      fontSize: 14,
    },
    grid: {
      marginBottom: 20,
    },
    questionLabel: {
      marginTop: 10,
      marginBottom: 10,
      paddingLeft: 16,
      color: 'rgba(75, 75, 75, 0.87)',
      fontWeight: 'bold',
      fontSize: 12,
    },
    listItem: {
      padding: 0,
      display: 'block',
    },
    innerListItem: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    infoLabels: {
      overflow: 'hidden',
      marginBottom: 10,
    },
    opcion: {
      color: 'rgba(75, 75, 75, 0.87)',
      paddingLeft: 16,
      fontSize: 12,
    },
  };

  return (
    <Grid style={styles.grid} container>
      <Grid item xs={12}>
        <div style={styles.infoLabels}>
          <Typography
            style={styles.tituloPregunta}
            inline
          >
            {props.nombre}
          </Typography>
        </div>
        <Grid container>
          <Grid item xs={12}>
            <Typography style={styles.questionLabel}>Preguntas</Typography>
            <List style={{paddingTop: 0}}>
              { 
                props.respuestas.map((respuesta, index) => (
                  <ListItem key={uniqueId('respuesta_')} style={styles.listItem}>
                    <Typography 
                      noWrap 
                      style={styles.opcion}
                    >
                      {`${index + 1} - ${respuesta.Nombre}`}
                    </Typography>
                    <List>
                      {
                        respuesta.resultado.map((resultado, indexResultado) => (
                          <ListItem 
                            key={uniqueId('resultado_')}
                            style={styles.innerListItem}
                          >
                            <Typography 
                              noWrap 
                              style={styles.opcion}
                            >
                              {`${indexResultado + 1} - ${resultado.ValorTexto}`}
                            </Typography>
                          </ListItem>
                        )) 
                      }
                    </List>
                  </ListItem>
                ))
              }
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

SeriePreguntas.propTypes = {
  nombre: T.string,
  respuestas: T.array,
};

SeriePreguntas.defaultProps = {
  nombre: '',
  respuestas: [],
};

export default SeriePreguntas;
