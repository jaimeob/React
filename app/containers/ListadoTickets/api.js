import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getTickets = () => {
  
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: '/plantillatickets',
  });
  debugger
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};


// export const getTiposServicios = () => {
//   const req = Object.assign({ // eslint-disable-line
//     method: 'get',
//     url: `/tipostickets`,
//   });

//   return api.request(req)
//     .then((resp) => resp)
//     .catch((error) => error)
// };

// export const obtenerCatalogos = () => {
//   const req = Object.assign({ // eslint-disable-line
//     method: 'post',
//     url: `/tickets/obtenerCatalogos`,
//   });

//   return api.request(req)
//     .then((resp) => resp)
//     .catch((error) => error)
// };


