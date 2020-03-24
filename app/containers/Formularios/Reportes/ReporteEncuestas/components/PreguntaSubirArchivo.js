import React from 'react';
import T from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import {CloudDownload} from '@material-ui/icons';
import { uniqueId } from 'lodash';
import Tabla from '../../../../../components/DataTable';

const PreguntaSubirArchivo = (props) => {
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
      padding: 17,
    },
  };

  const cabeceras = [
    {
      name: 'Nombre',
      label: 'Descripcion',
      options: {
        filter: false,
      },
    },
    {
      name: 'resultado',
      label: 'Evidencia',
      options: {
        customBodyRender: (value) => (
          <ul style={{padding: 0}}>
            {
              value.filter(evidencia => evidencia.RutaEvidencia).map(evidencia => (
                <li key={uniqueId('evidencia_')} style={{listStyle: 'none', margin: '10px 0'}}>
                  <a href={evidencia.RutaEvidencia}>
                    <CloudDownload style={{marginRight: 10}} />
                    {evidencia.NombreEvidencia}
                  </a>
                </li>
              ))
            }
          </ul>
        ),
      },
    },
    {
      name: 'resultado',
      label: 'Estatus',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <ul style={{padding: 0}}>
            {
              value.filter(evidencia => evidencia.RutaEvidencia).map(evidencia => (
                <li
                  key={uniqueId('evidencia_estatus_')} 
                  style={{
                    width:20, 
                    height:20, 
                    borderRadius: '50%',
                    margin: '10px 13px',
                    backgroundColor: evidencia.Estatus === 'REFCOM' ? '#00FF00' : '#FFFF00',
                    listStyle: 'none',
                    fontSize: 12, 
                  }}
                ></li>
              ))
            }
          </ul>
        ) 
        ,
      },
    },
    {
      name: 'options',
      label: [],
      options: {
        filter: false,
      },
    },
  ];

  const data = props.preguntas;

  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    ordenar: false,
    imprimir : false,
    buscar: false,
    seleccionable: 'none',
    registrosPorPagina: 10,
  };
  
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
        </div>
        <Grid container>
          <Grid item xs={12}>
            <Tabla
              params= {{
                sinToolbar: true,
              }}
              data={data}
              headers={cabeceras}
              configuracion={configuracion}
              idPosition="FormularioPreguntaDetalleId"
              admin
              small={0}
              elevacion={0}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

PreguntaSubirArchivo.propTypes = {
  nombre: T.string,
  preguntas: T.array,
};

export default PreguntaSubirArchivo;