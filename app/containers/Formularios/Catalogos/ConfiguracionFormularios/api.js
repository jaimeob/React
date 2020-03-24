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
export const getFormularios = () => {
  const req = Object.assign({
    method: 'POST',
    url: '/formularios',
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

export const postGuardarFormularioApi = (datos) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'POST',
    url: `/formularios/guardarConfiguracionFormulario`,
    data: datos,
  });
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getFormularioDetalleApi = (idFormulario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/formularios/obtenerDetalle/${idFormulario}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};
export const deleteFormularioApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/formularios/eliminar',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

// obtenerTiposPreguntasApi
