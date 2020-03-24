import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getIndicadores = (idUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/resultados/${idUsuario}/-1`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getDepartamentos = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/departamentos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getPuestos = (idDepartamento) => {
  const req = Object.assign({
    method: 'GET',
    url: `/general/departamento/puestos/${idDepartamento}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getEmpleados = (idPuesto) => {
  const req = Object.assign({
    method: 'GET',
    url: `/indicadores/puestos/empleados/${idPuesto}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const postGuardarIndicador = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: 'indicadores/resultados',
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