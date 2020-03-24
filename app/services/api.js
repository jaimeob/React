import axios from 'axios';
import config from 'config';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';

const {
  api: CFG_API,
  proyecto: {
    clave: CLV_PROYECTO,
  },
} = config;


export const api = axios.create(CFG_API);

export const formatOptions = (opts = {}) => isPlainObject(opts) ?
  omit(
    opts, [
      'method',
      'url',
      'headers',
    ]) : {};

export const obtenerDepartamentos = (options = {}) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: '/departamentos',
    // headers: {
    //   Authorization:  `Bearer ${token}`,
    // },
    ...formatOptions(options),
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const obtenerConfiguracionProyecto = (options) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/proyectos?clave=${CLV_PROYECTO}`,
    // headers: {
    //   Authorization:  `Bearer ${token}`,
    // },
    ...formatOptions(options),
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getUsuarioConfiguracion = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/usuarios/consultaOpcionesUsuario/${params}`,
  })
 
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setUsuarioFavoritos = (params) => {
  const req = Object.assign({
    method: 'POST',
    url: '/usuarios/guardar-funciones-favoritas/',
    data: params,
  })
 
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerPermisos = ({idModulo, funcionId, idUsuario, idRolEmpresa}) => {
  const req = Object.assign({
    method: 'GET',
    url: `/permisos/modulos/${idModulo}/funciones/${funcionId}/usuarios/${idUsuario}/rol-empresa/${idRolEmpresa}`,
  })
 
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export default api;
