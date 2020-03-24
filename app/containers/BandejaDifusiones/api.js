import axios from 'axios';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

// export const api2 =axios.create({
//   "baseURL":'http://172.17.10.35:1337/tickets/comentarios/'
// });


// INSERTA DIFUSIONES  A SQL
export const postInsertDifusionsApi = (data) => {
  // console.log(data,"si agarra")
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/tickets/insdifusiones`,
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postCambiarEstatusApi = (datos) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'put',
    url: `/tickets/cambiarEstatus`,
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)

};

export const formatOptions = (opts = {}) => isPlainObject(opts) ?
  omit(
    opts, [
      'method',
      'url',
      'headers',
    ]) : {};

export const getDepartamentos = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: '/departamentos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDepartamentosPlantillas = (idDepartamento) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/departamentos/plantillatickets/${idDepartamento}`,
  })

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
export const getTicketsComentariosApi = (id) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/tickets/comentarios/${id}`,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postUploadFileComentariosApi = (files) => {
  ;
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/upload`,
    data: files,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)

};





export const cambiarEstatusApi = (datos) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url:`/tickets/cambiarEstatusDifusion`,
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDifusionSelectedApi = (id) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url:`/obtenerDifusionSeleccionada/${id}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDifusionesApi = (data) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url:`/difusiones/${data.DepartamentoId}/${data.EmpleadoId}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export default api;
