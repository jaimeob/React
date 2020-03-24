import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getConfiguracionBono = (idConfiguracionBono) => {
  // console.log('nombreModulo',idConfiguracionBono);
  const req = Object.assign({
    method: 'GET',
    url:  `/indicadors/consultaConfiguracionBono/${idConfiguracionBono}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const puestosConfiguracionBono = (idConfiguracionBono) => {
  // console.log('puestosConfiguracionBono',idConfiguracionBono)
  const req = Object.assign({
    method: 'GET',
    url:  `/indicadors/consultaPuestosConfiguracionBono/${idConfiguracionBono}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getvalidaExiste = (nombre) => {
  const req = Object.assign({
    method: 'GET',
    url:  `/indicadors/consultaExisteNombreGrupo/${nombre}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postGuardar = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/indicadors/guardaConfiguracionBono',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoDesactivar = (params) => {
  
  const req = Object.assign({
    method: 'PUT',
    url: `/indicadors/activarDesactivarConfiguracionBono/idConfiguracionBono/${params.idConfiguracionBono}/usuario/${params.idUsuario}/activo/${params.activo}`,
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoActivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: `/indicadors/activarDesactivarConfiguracionBono/idConfiguracionBono/${params.idConfiguracionBono}/usuario/${params.idUsuario}/activo/${params.activo}`,
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};










