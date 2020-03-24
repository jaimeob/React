import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getListado = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/usuarios',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoActivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/usuarios/activar',
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setListadoDesactivar = (params) => {
  const req = Object.assign({
    method: 'PUT',
    url: '/usuarios/desactivar',
    data : params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDownloadFile = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/usuarios/${params}/archivos`,
    responseType: 'blob',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const countDownloadFiles = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/usuarios/${params}/contar-archivos`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDownloadFiles = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/usuarios/archivos?ids=${params}`,
    responseType: 'blob',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDownloadFilesHistorial = (idUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/usuarios/historial/${idUsuario}`,
    responseType: 'blob',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getEmpleados = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/empleados/sinusuario',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getInfoEmpleado = (id) => {
  const req = Object.assign({
    method: 'GET',
    url: `/empleados/informacion/${id}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getPlazas = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/todasPlazas',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getPuestos = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/puestos/conrol',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getRoles = (idPuesto, idEmpleado) => {
  const req = Object.assign({
    method: 'GET',
    url: `/rol/adicional/${idPuesto}/${idEmpleado}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getEmpresasPorRol = (idRol) => {
  const req = Object.assign({
    method: 'GET',
    url: `/rol/empresas/${idRol}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getConfiguracionRoles = (idRol, idRolEmpresa) => {
  const req = Object.assign({
    method: 'GET',
    url: `/rols/consultaRoles/${idRol}/${idRolEmpresa}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getDetalleUsuario = (idUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/usuarios/${idUsuario}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const postGuardarUsuario = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/usuarios/guardarUsuario',
    data,
  })

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
