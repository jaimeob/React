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

export const obtenerPlazasUsuarioApi = (datos) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/tickets/obtenerPlazasUsuario`,
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const guardarEtapaApi = (datos) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/tickets/guardarEtapa`,
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
    url: '/departamentos/plantillatickets',
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

export const getTicketEspecificoApi = (idTicketSeleccionado) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/tickets/obtenerTicketEspecifico/${idTicketSeleccionado}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

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

export const getObtejerEmpleadosAsignarApi = (idDepartamentoLogeado) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/tickets/obtenerEmpleados/${idDepartamentoLogeado}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getObtenerPrioridadesAsignarApi = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/tickets/obtenerPrioridades`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};


export const postTicket = (datosTicket) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/tickets/send`,
    data: datosTicket,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getDatosCatalogoApi = (datos) => {
  
  const req = Object.assign({
    method: 'post',
    url: '/tickets/obtenerItemsCatalogos',
    data: datos,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDatosCatalogoApi2 = (datos) => {
  const req = Object.assign({
    method: 'post',
    url: '/tickets/obtenerItemsCatalogos2',
    data: datos,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getRelacionesApi = (IdCatalogo) => {
  const body = {
    IdCatalogo,
  }
  const req = Object.assign({
    method: 'post',
    url: '/tickets/obtenerRelacion',
    data: body,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getTickets = (datos) => {
    const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/obtenerTicketsPorEmpleado`,
    data: datos,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const autorizarTicketApi = (datos) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/tickets/autorizarTicket`,
    data: datos,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postAsignarEmpleadoApi = (datos) => {
  const {
    idTicket,
    idEmpleado,
    idPrioridad,
  } = datos;
  
  const req = Object.assign({ // eslint-disable-line
    method: 'put',
    url: `/tickets/asignar/${idTicket}`,
    data: {
      idEmpleado,
      idPrioridad,
    },
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

export const getDownloadedTicketFile = (action) => axios({
  url: action.fileUrl,
  method: 'GET',
  responseType: 'blob', // important
}).then((response) => response)
  .catch((error) => error);

export const getTicketsPorDepartamento = (datos) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/tickets/departamentos`,
    data: datos,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getImagenAvatarApi = (idUsuario) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/tickets/imagenUrl/${idUsuario}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getTicketsById = (idTicket) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/tickets/${idTicket}
    `,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerFecha = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: '/tickets/obtenerFecha',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerTicketEtapas = (id) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/plantillatickets/obtenerEtapa/${id}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerTicketEtapasEstatus = (id) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/tickets/obtenerEstatusTicketsEtapas/${id}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postUploadFile = (files) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/upload`,
    data: files,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getDownloadedFile = (url) => axios({
  url,
  method: 'GET',
  responseType: 'blob', // important
}).then((response) => response)
  .catch((error) => error.response);


export default api;
