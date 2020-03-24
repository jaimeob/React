import api, { formatOptions } from 'services/api';


const responseThen = (resp) => resp;
const responseCatch = (err) => err; 

export const getFormsUserApi = (params, options = {}) => {
  const {
    user,
  } = params
  const request = Object.assign({
    method: 'get',
    url: `/departamentos/formulariosAsignadosEmpleado/${user}`,
    ...formatOptions(options),
  })

  return api.request(request)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getAssignedFormsApi = (NoEmpleado = null) =>
  api
    .request({
      method: 'GET',
      url: `/formularioasignados/listarporempleado/${NoEmpleado || 0}`,
    })
    .then(responseThen)
    .catch(responseCatch)

export const saveChangesFormulario = (data = {}, formularioId = '') =>
  api.
    request({
      method: 'PUT',
      url: `/formularioasignados/actualizar/${formularioId}`,
      data,
    })
    .then(responseThen)
    .catch(responseCatch)
