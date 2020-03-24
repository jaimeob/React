import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getTiposPreguntasApi = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/formularios/tiposPreguntas',
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getUsuariosEvaluados = (idAsignacion, idUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/formularios/evaluacion/${idAsignacion}/usuario/${idUsuario}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getFormulariosApi = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: `/formularios/tipoFormulario`,
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getUsuarios = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/usuarios',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};


export const getFormularioPreguntasApi = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: `/formularios/obtenerPreguntas`,
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const postGuardarRespuestasApi = (datos) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'POST',
    url: `/formularios/guardarRespuestasFormulario`,
    data: datos,
  });
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
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
// obtenerTiposPreguntasApi
