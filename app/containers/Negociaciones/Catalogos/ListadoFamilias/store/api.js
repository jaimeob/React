import api from 'services/api';

// const defaultResponse = {
//   error: false,
//   exists: false,
//   data: [],
//   config: {},
//   response: null,
// };

export const getFamilysApi = (params = {}) => {
  const {
    state,
  } = params;
  const req = Object.assign({
    method: 'get',
    url: `/negociaciones/ObtenerFamilias/${state}`,
    // ...formatOptions(params),
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getSubFamilysFamilyApi = (params = {}) => {
  const {
    id,
  } = params;

  const req = Object.assign({
    method: 'get',
    url:`/negociaciones/ObtenerSubFamilias/${id}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const updateStatusFamilysApi = (params = {}) => {
  const {
    idFamilys,
    state,
  } = params;
  const req = Object.assign({
    method: 'put',
    url:`/negociaciones/ActualizarEstatusFamilias/${state}`,
    data: {idFamilias: idFamilys.toString()},
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const saveChangesSubfamilysApi = (params = {}) => {
  const {
    idFamilys,
    nameFamily,
    employe,
    subFamilys,
  } = params;

  const req = Object.assign({
    method: 'put',
    url:`/negociaciones/AsignarSubfamilias/${idFamilys}/${nameFamily}/${employe}`,
    data: subFamilys,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getChargesDepartamentsApi = (idDepartament = 22, idFamilySelected = 0) => {
  const req = Object.assign({
    method: 'get',
    url:`/negociaciones/obtenerDepartamentoPuestoFamilia/${idDepartament}/${idFamilySelected}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const saveChargeFamilyApi = ( IdFamily, add, del ) => {

  const req = Object.assign({
    method: 'post',
    url:`/negociaciones/guardarPuestoFamilia/${IdFamily}`,
    data: { add, del },
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
