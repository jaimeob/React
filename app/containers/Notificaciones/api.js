import axios from 'axios';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

// export const api2 =axios.create({
//   "baseURL":'http://172.17.10.35:1337/tickets/comentarios/'
// });
export const postCambiarEstatusApi = (datos) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/tickets/cambiarEstatus`,
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)

};

// TODO CREAR FUNCION QUE CONSUME LA API
// export const getTicketsComentariosApi = (id) => {
//   const req = Object.assign({ // eslint-disable-line
//     method: 'get',
//     url: `/tickets/comentarios/${id}`,
//   });

//   return api.request(req)
//     .then((resp) => resp)
//     .catch((error) => error)
// }

// INSERTA COMENTARIOS DEL CHAT A SQL
// export const postInsertTicketsComentariosApi = (data) => {
//   console.log('Entro a Enviar Api',data);
 
//   const req = Object.assign({ // eslint-disable-line
//     method: 'post',
//     url: `/tickets/inscomentarios`,
//     data,
//   });
//   debugger
//   return api.request(req)
//   .then((resp) => resp)
//   .catch((error) => error)
// }
// TODO CREAR FUNCION QUE CONSUME LA API

//>>Obtener datos a traves de id

// export const getNotificacionesApi = (id) => {
//   const req = Object.assign({ // eslint-disable-line
//     method: 'get',
//     url: `/tickets/notificaciones/${id}`,
//   });

//   return api.request(req)
//     .then((resp) => resp)
//     .catch((error) => error)
// };

export const cambiarEstatusNotificacionesApi = (datos) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url:`/tickets/cambiarEstatusNotificaciones`,
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

// INSERTA COMENTARIOS DEL CHAT A SQL
export const postInsertTicketsComentariosApi = (data) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/tickets/inscomentarios`,
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export default api;
