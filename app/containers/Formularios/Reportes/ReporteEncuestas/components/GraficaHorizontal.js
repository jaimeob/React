import React from 'react';
import T from 'prop-types';

import { HorizontalBar } from 'react-chartjs-2';

const GraficaHorizontal = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        backgroundColor: '#673ab7',
        borderColor: '#673ab7',
        borderWidth: 1,
        hoverBackgroundColor: '#673ab7',
        hoverBorderColor: '#673ab7',
        data:props.values,
      },
    ],
  };

  const options = {
    legend: false,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
        },
      }],
    },
  };
  
  return(
    <HorizontalBar 
      options={options}  
      data={data} 
    />
  );
};

GraficaHorizontal.propTypes = {
  labels: T.array,
  values: T.array,
};

export default GraficaHorizontal;