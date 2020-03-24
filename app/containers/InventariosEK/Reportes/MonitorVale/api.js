import axios from 'axios';
import config from 'config';

export const api = axios.create(config.api);

export const consultarPrevalesApi = (idUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/inventariosEks/prevales/${idUsuario}`,
  })
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
}