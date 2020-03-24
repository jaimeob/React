
import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getLayoutNegociaciones = (idPrototipo = -1) => {
  const req = Object.assign({
    method: 'GET',
    url: `/negociaciones/obtenerLayoutNegociaciones/${idPrototipo}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getExplotions = (IdExplotion = -1, IdPlaza = -1, Anio = -1) => {
  const req = Object.assign({
    method: 'GET',
    url: `/negociaciones/obtenerExplosiones/${IdExplotion}/${IdPlaza}/${Anio}`,
    data:{
      IdExplotion,
      IdPlaza,
      Anio,
    },
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getExplotionsDetails = (IdExplotion = -1) => {
  const req = Object.assign({
    method: 'GET',
    url: `/negociaciones/obtenerExplosionesDetalle/${IdExplotion}`,
    data:{
      IdExplotion,
    },
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
export const getPlazas = (IdPlaza = -1) => {
  const req = Object.assign({
    method: 'GET',
    url: `/generals/obtenerPlazasGeneral/${IdPlaza}`,
    data:{
      IdPlaza,
    },
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getCurrentDateTime = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/generals/obtenerFechaHora`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getDetalleInsumo = (Insumos = []) => {
  const req = Object.assign({
    method: 'POST',
    url: `/negociaciones/obtenerDetalleInsumo`,
    data:{
      Insumos,
    },
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const addExplotion = (data = {}) => {
  const req = Object.assign({
    method: 'POST',
    url: `/negociaciones/agregarExplosion`,
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
export default api