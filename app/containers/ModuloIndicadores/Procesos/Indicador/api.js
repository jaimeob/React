import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getIndicadores = (idPeriodo, idUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/resultados/${idUsuario}/${idPeriodo}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getHistorial = (idUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/historial/${idUsuario}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const postAutorizarResultado = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/indicadores/autorizar',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getDownloadDetalle = (idBitacoraCambio) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/archivos/cambio/${idBitacoraCambio}`,
    responseType: 'blob',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getPuestosUsuariosIndicadores = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtener-puestos-usuarios-indicadores`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};
