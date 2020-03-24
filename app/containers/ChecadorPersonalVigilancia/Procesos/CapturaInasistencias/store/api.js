
import api from 'services/api';

export const getCompanysApi = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/checadorpersonalvigilancias/obtenerEmpresasNecesidad`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getPlazasApi = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/checadorpersonalvigilancias/obtenerPlazas`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getWeekApi = (props) => {
  const {
    companyId,
    plazaId,
  } = props
  const req = Object.assign({
    method: 'GET',
    url: `/checadorpersonalvigilancias/obtenerSemanasCapturaInasistencia/${companyId}/${plazaId}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const uploadFilesApi = (files) => {
  const req = Object.assign({
    method: 'post',
    url: `/upload`,
    data: files,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
}

export const saveDataApi = (dataToSave) => {
  const {
    user,
    company,
    plaza,
    year,
    week,
    absence,
    arrayFiles,
  } = dataToSave;

  const req = Object.assign({
    method: 'POST',
    url: `/checadorpersonalvigilancias/grabarCapturaInasistencia`,
    data: {
      empresaId: company,
      plazaId: plaza,
      anioRetail: year,
      semanaRetail: week,
      inasistencia: absence,
      archivo: arrayFiles,
      empleadoId: user,
    },
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
}


/*
uploadFilesApi,
  saveDataApi,
*/