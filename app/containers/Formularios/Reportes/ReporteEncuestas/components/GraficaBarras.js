import React from 'react';
import T from 'prop-types';
import { Bar } from 'react-chartjs-2';

const GraficaBarras = (props) => {
  const colors = ['#1bbc9b', '#2dcc70', '#3598db', '#9b58b5', '#34495e', '#f1c40f', '#e77e23', '#c1392b', '#bec3c7', '#7e8c8d'];

  const data = {
    labels: props.labelsPreguntas.map((pregunta) => pregunta.length >= 23 ? `${pregunta.substring(0, 20)}...` : pregunta),
    datasets: props.datasetsGrafica.map((dataset, indexDataset) => ({
      label: dataset.respuesta,
      data: dataset.resultados,
      backgroundColor: props.labelsPreguntas.map(() => colors[indexDataset]),
      fill: true,
    })),
  }

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
        },
      }],
    },
  };
  
  return(
    <Bar 
      options={options}  
      data={data} 
    />
  );
};

GraficaBarras.propTypes = {
  labelsPreguntas: T.array,
  datasetsGrafica: T.array,
}

export default GraficaBarras;