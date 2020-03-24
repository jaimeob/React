import React from 'react';
import T from 'prop-types';
import { Grid, Typography, List, ListItem } from '@material-ui/core';
import { uniqueId } from 'lodash';

const PreguntaAbierta = (props) => {
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
      color: 'rgba(75, 75, 75, 0.87)',
      fontWeight: 'bold',
      paddingLeft: 16,
    },
    answer: {
      padding: '0 0 0 16px',
      fontSize: 12,
    },
    option: {
      color: 'rgba(75, 75, 75, 0.87)',
      fontSize: 12,
    },
  };
   
  return (
    <Grid style={styles.grid} container>
      <Grid item xs={12}>
        <div>
          <Typography
            style={styles.tituloPregunta}
            inline
          >
            {props.nombre}
          </Typography>
        </div>
        <Grid container>
          <Grid item xs={12}>
            <Typography style={styles.questionLabel}>Respuestas</Typography>
            <List style={{paddingTop: 0}}>
              { 
                props.respuestas.map(respuesta => respuesta.resultado.filter(resultado => resultado.ValorTexto).map((resultado, index) => (
                  <ListItem key={uniqueId('respuesta_')} style={styles.answer}>
                    <Typography noWrap style={styles.option}>{`${index + 1} - ${resultado.ValorTexto}`}</Typography>
                  </ListItem>
                )))
              }
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

PreguntaAbierta.propTypes = {
  nombre: T.string,
  respuestas: T.array,
};

PreguntaAbierta.defaultProps = {
  nombre: '',
  respuestas: [],
};

export default PreguntaAbierta;
