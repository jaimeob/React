
import axios from 'axios';
import config from 'config/config.development';
export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getConsultaEmpresas = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/rols/consultaEmpresas/${params}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getClientesSeguimiento = ({idEmpresa, idUsuario}) => {
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/consultaSeguimientoAbogado/empresa/${idEmpresa}/usuario/${idUsuario}`,
    //  url: `/cobranzajudicial/consultaSeguimientoAbogado/empresa/${idEmpresa}/usuario/4111`,

  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
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

export const getConsultaEtapas = ({idEmpresa, clienteId}) => {
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/consultaEtapasSeguimientoAbogado/empresa/${idEmpresa}/cliente/${clienteId}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDescargarArchivos = (clienteId) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'GET',
    url: `/cobranzajudicial/${clienteId}/descargar`,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const contarArchivos = (clienteId, selectedEmpresa) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'GET',
    url: `/cobranzajudicial/${clienteId}/empresa/${selectedEmpresa}/contar-archivos`,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const descargarArchivos = (clienteId, selectedEmpresa) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'GET',
    url: `/cobranzajudicial/${clienteId}/empresa/${selectedEmpresa}/descargar-archivos`,
    responseType: 'blob',
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const postSeguimientoCliente = (data) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'POST',
    url: `/cobranzajudicial/guardaSeguimientoEtapas`,
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export default api