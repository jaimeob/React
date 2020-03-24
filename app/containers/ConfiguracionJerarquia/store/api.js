
import axios from 'axios';
import config from 'config/config.development';
export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getData = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtener-jerarquias/`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const updateStatusData = (status, dataIds, idUsuario) => {
  const req = Object.assign({
    method: 'POST',
    url: `/indicadores/actualizar-estatus-jerarquia`,
    data: {
      status,
      dataIds,
      idUsuario,
    },
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getDepartmentsAndPositions = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtener-departamentos-y-puestos/`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const postJerarquia = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/indicadores/registrar-jerarquia/`,
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const editJerarquia = (id) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtener-jerarquias/${id}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const postJerarquiaZip = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/indicadores/obtener-jerarquias/zip`,
    responseType: 'blob',
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getNombreJerarquia = (id, nombre) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtener-nombre-jerarquia/${id}/nombre/${nombre}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export default api