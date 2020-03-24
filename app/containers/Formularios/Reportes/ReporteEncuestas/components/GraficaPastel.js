import React from 'react';
import T from 'prop-types';
import { Pie } from 'react-chartjs-2';

const GraficaPastel = (props) => {
  const data = {
    labels: props.labels,
    height: 50,
    datasets: [{  
      data: props.values,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#087CB8', 
        '#9b59b6', 
        '#e74c3c',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#087CB8', 
        '#9b59b6', 
        '#e74c3c',
      ],
    }],
  };
  return <Pie data={data} />
};

GraficaPastel.propTypes = {
  labels: T.array,
  values: T.array,
};

GraficaPastel.defaultProps = {
  labels: [],
  values: [],
};

export default GraficaPastel;