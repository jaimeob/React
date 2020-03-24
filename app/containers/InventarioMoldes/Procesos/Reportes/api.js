import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getCombosReportesApi = (usuarioId) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/combosReportes/${usuarioId}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

// export const getAlmacenesApi = (IdPlaza) => {
//   const req = Object.assign({
//     method: 'GET',
//     url: `/molde/almacenesPlaza/${IdPlaza}`,
//   })

//   return api.request(req)
//     .then((resp) => resp)
//     .catch((error) => error.response) 
// };
export const getAlmacenesUsuarioApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/almacenesPlazaUsuario`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};


export const getMoldesAlmacenApi = (IdAlmacen) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/moldesAlmacenReporte/${IdAlmacen}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getOrigenesApi = (IdTipoMovimiento) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/origenesAlmacen/${IdTipoMovimiento}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};


export const getReporteApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/reporteInventarios`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getAñosAlmacenApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/aniosAlmacen`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getPeriodosAlmacenApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/periodosAlmacen`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getReporteKardexApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/reporteKardexInventario`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getReporteConfiabilidadApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/reporteConfiabilidadInventario`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};


