
import axios from 'axios';
import config from 'config/config.development';
export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getCombos = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtenerCombos/`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getPuestosPorDepartamento = (idPuesto) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtenerPuestosPorDepartamento/${idPuesto}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getDependenciasPorModulo = (idModulo) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtenerDependenciasPorModulo/${idModulo}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getDescripcionIndicador = (idIndicador) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtener-descripcion-indicador/${idIndicador}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const postIndicator = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/indicadores/guardar-configuracion-indicador/`,
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getPuestoTotalIndicadores = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtenerPuestoTotalIndicadores/`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getPesoIndicadores = (idDepartamento, idPuesto, idIndicadorDetalle) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtenerPesoTotalIndicadores/departamento/${idDepartamento}/puesto/${idPuesto}/indicador-detalle/${idIndicadorDetalle}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getIndicatorsDepartmentPosition = (idDepartamento, idPuesto, estatus = 1) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtenerIndicadoresDepartamentoPuesto/departamento/${idDepartamento}/puesto/${idPuesto}/estatus/${estatus}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const postChangeIndicatorStatus = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/indicadores/activarDesactivarIndicador/`,
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getIndicatorDetail = (idIndicador, idDepartamento, idPuesto) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtenerDetalleIndicador/${idIndicador}/departamento/${idDepartamento}/puesto/${idPuesto}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getGrupos = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/grupo`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export default api