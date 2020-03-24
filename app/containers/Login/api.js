import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
import AES from 'crypto-js/aes';
export const api = axios.create(config.api);

export const getUsuarioLogin = (params) => {
  const contrasena = AES.encrypt(params.contrasena, 'ng:NARJtCHH*f/d').toString();

  const req = Object.assign({
    method: 'POST',
    url: '/usuarios/login',
    data : {
      usuarioDominio: params.usuarioDominio,
      contrasena,
    },
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setUsuarioIntentoLogin = (params) => {
  const req = Object.assign({
    method: 'POST',
    url: '/usuarios/intentos-login',
    data: params,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getUsuarioImagen = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/usuarios/imagen?usuariodominio=${params}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};