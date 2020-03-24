import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getAlmacenesUsuarioApi = (usuarioLogeado) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/almacenesUsuario/${usuarioLogeado}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getAlmacenFechaInicialApi = (IdAlmacen) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/almacenFechaInicial/${IdAlmacen}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getEstatusInventarioApi = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/estatusInventario`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};


export const getMoldesAlmacenApi = (IdAlmacen) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/moldesAlmacen/${IdAlmacen}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getInsumosAlmacenApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/insumosAlmacen`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const setCantidadResultadosApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/cambiarResultados`,
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

export const postGuardarInventarioApi = (files) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/molde/guardarInventarioCiclico`,
    data: files,
  });
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getInventariosCiclicosApi = (almacen) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/inventariosCicliclos/${almacen}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};


export const getEvidenciasInventarioCiclicoApi = (almacen) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/evidenciasInventarioCicliclo/${almacen}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getObtenerDetalleInventarioApi = (idInventarioCiclico) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/detalleInventarioCiclico/${idInventarioCiclico}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};


export const postGuardarArchivoEvidenciaApi = (files) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/molde/archivosEvidencia`,
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


export const postEliminarArchivoEvidenciaApi = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/eliminarArchivoEvidencia`,
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};