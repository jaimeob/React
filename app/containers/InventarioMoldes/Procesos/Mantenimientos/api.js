import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getDatosMantenimientosApi = (IdUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/datosMantenimiento/${IdUsuario}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};



export const getDetalleMantenimientosApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/DetalleMantenimientos`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};
