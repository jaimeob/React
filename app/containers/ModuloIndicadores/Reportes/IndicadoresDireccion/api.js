import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getFiltros = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/indicadores/parametros',
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
}

export const getDatos = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/indicadores/reporte/direccion',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
}

