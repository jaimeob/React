
import axios from 'axios';
import config from 'config/config.development';
export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getReportesEncuestas = (tipoFormulario, usuarioId) => {
  const req = Object.assign({
    method: 'GET',
    url: `/reportesformularios/obtener-validaciones-formularios?tipoFormulario=${tipoFormulario}&usuarioId=${usuarioId}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getReporteEncuesta = (id) => {
  const req = Object.assign({
    method: 'GET',
    url: `/reportesformularios/obtener-reportes-encuestas/${id}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getDepartamentosPuestos = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/obtener-departamentos-y-puestos/`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getUsuarios = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/usuarios',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const validarFormulario = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: `/formularios/validacion`,
    data: datos,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export default api