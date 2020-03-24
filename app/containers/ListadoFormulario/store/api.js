import api, { formatOptions } from 'services/api';

const responseThen = (resp) => resp;
const responseCatch = (err) => err; 

export const getDeptosFormsApi = (user, options = {}) => {
  const request = Object.assign({
    method: 'get',
    url: `/departamentos/plantillasFormularios/${user}`,
    ...formatOptions(options),
  })

  return api.request(request)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getUsersSentApi = (departamentoId, IdConfigFormulario, options = {}) => {
  // cambiar este método
  const request = Object.assign({
    method: 'get',
    url: `/departamentos/usuariosEnviados/${departamentoId}?IdConfigFormulario=${IdConfigFormulario}`,
    ...formatOptions(options),
  })

  return api.request(request)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getUsersDepartamentApi = (id, options = {}) => {
  const request = Object.assign({
    method: 'get',
    url: `/empleados/obtenerxdepa?IdDepartamento=${id}`,
    ...formatOptions(options),
  })

  return api.request(request)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getFormsAssingApi = (params, options = {}) => {
  const {
    departamentId: departamentoId,
    configFormularioId,
  } = params;
  const request = Object.assign({
    method: 'get',
    url: `/departamentos/formulariosAsignados/${departamentoId}/${configFormularioId}`,
    ...formatOptions(options),
  })

  return api.request(request)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getAsignedUsersByDepsApi = (data = {}) => {
  const {
    configFormularioId: IdConfigFormulario,
    departamentId: IdDepartamento, 
  } = data;
  // console.log('getAsignedUsersByDepsApi data', data);
  return api
    .request({
      method: 'GET',
      url: `/formularioasignados/conestatus?IdDepartamento=${IdDepartamento}&IdConfigFormulario=${IdConfigFormulario}`,
    })
    .then(rs => rs)
    .catch(err => err)
}

export const assignFormToEmployeeApi = (body = {}) =>
  api
    .request({
      method: 'PUT',
      url: '/formularioasignados/updtestatusfrms/asignado',
      data: body,
    })
    .then(responseThen)
    .catch(responseCatch)
