import api, { formatOptions } from 'services/api';
import def from 'lodash/defaultTo';
import {
  isRequestOk,
} from 'utils/helpers';

const defaultResponse = {
  error: false,
  exists: false,
  data: [],
  config: {},
  response: null,
};

export const validarNombreFormulario = (nombre, options = {}) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/configuracionformularios?nombre=${def(nombre, '')}`,
    // headers: {
    //   Authorization:  `Bearer ${token}`,
    // },
    ...formatOptions(options),
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const validarNombreCfgFormulario =
  (nombre = '') =>
    api
      .request({
        method: 'GET',
        url: `/configuracionformularios?nombre=${def(nombre, '')}`,
      })
      .then(({
        data,
        status,
        config,
      }) => {
        if (isRequestOk(status) && data.length > 0) {
          return {
            ...defaultResponse,
            exists: true,
            data,
            config,
          };
        }
        return defaultResponse;
      })
      .catch((error) => ({
        ...defaultResponse,
        error: true,
        request: error.request || {},
        response: error.response || {},
        config: error.config || {},
      }))

// const DEF_data = {

// } 

// TODO
export const publicarConfiguracionFormApi = (data = {}) => {
  const {
    configuracionformularioId: id = '',
  } = data;
  return api
    .request({
      method: 'PUT',
      url: `/configuracionformularios/publicar/${id}`,
    })
    .then((resp) => resp)
    .catch((err) => err)
}

export const activarConfiguracionFormApi = (data = {}) => {
  const {
    configuracionformularioId: id = '',
  } = data;
  return api
    .request({
      method: 'PUT',
      url: `/configuracionformularios/activar/${id}`,
    })
    .then((resp) => resp)
    .catch((err) => err)
}

export const desactivarConfiguracionFormApi = (data = {}) => {
  const {
    configuracionformularioId: id = '',
  } = data;
  return api
    .request({
      method: 'PUT',
      url: `/configuracionformularios/desactivar/${id}`,
    })
    .then((resp) => resp)
    .catch((err) => err)
}

export const crearConfiguracionBaseFormApi = (data = {}) => {
  const {
    nombre: {
      value: nombre = '',
    } = '',
    logoUrl = '',
    fechaPublicacion = null,
    departamento: {
      value: departamento,
    } = null,
  } = data;  

  return api.request({
    method:  'POST',
    url: '/configuracionformularios',
    data: {
      nombre,
      logoUrl,
      fechaPublicacion,
      departamento,
    },
  }).then((resp) => resp)
    .catch((err) => err)
}

export const crearConfiguracionDetBaseFormApi = (data = {}) => {
  const {
    configuracionformularioId: confId = '',
    configuredComponents = [],
  } = data;
  let promiseResponses = [];
  if (configuredComponents.length > 0
    && confId.trim().length) {
    promiseResponses = configuredComponents.map((com) =>
      api
        .request({
          method:  'POST',
          url: '/componentesformularios',
          data: Object.assign({}, com, { configuracionformulario: confId }),
        })
        .then((resp) => resp)
        .catch((err) => err)
    )
  }
  return Promise
    .all(promiseResponses)
    .then((responses) => responses)
}

export const actualizarConfiguracionDetBaseFormApi = (data = {}) => {
  const {
    configuracionFormularioId = '',
    configuredComponents = [],
  } = data;
  return api
    .request({
      method:  'POST',
      url: '/componentesformularios',
      data: {
        configuracionFormularioId,
        configuredComponents,
      },
    })
    .then((resp) => resp)
    .catch((err) => err)
}

export const eliminarComponentesPorConfiguracion = (id = '') =>
  api
    .request({
      method: 'DELETE',
      url: `/componentesformularios/configuracionfrm/${id}`,
    })
    .then((resp) => resp)
    .catch((err) => err)


export const obtenerFormularios = (nombre, options = {}) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/plantillaformularios`,
    // headers: {
    //   Authorization:  `Bearer ${token}`,
    // },
    ...formatOptions(options),
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getFormsListApi = (activo = 'true') => {
  const request = Object.assign({
    method: 'get',
    url: `/configuracionformularios?activo=${activo}`,
  })

  return api.request(request)
    .then((resp) => resp)
    .catch((error) => error)
}

export const updateStatusFormsListApi = (options = {}) => {
  const request = Object.assign({
    method: 'put',
    url: `/plantillaformularios`,
    data: options,
    // ...formatOptions(options),
  })

  return api.request(request)
    .then((resp) => resp)
    .catch((error) => error)
}

