
import api from 'services/api';

export const getPlazas = (IdPlaza = -1) => {
  const req = Object.assign({
    method: 'GET',
    url: `/generals/obtenerPlazasGeneral/${IdPlaza}`,
    data:{
      IdPlaza,
    },
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getYearApi = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/ObtenerFechaRetail`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getCompanysApi = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerEmpresasCobranzaJudicial`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getDatesApi = (companySelected) => {
  const tipoMovto = companySelected === 2 ? 1 : 0;
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerSemMesRetail/empresa/${companySelected}/tipomovimiento/${tipoMovto}/asignacion/1`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getListClientsApi = (params) => {
  const {
    year,
    companySelected,
    dateId,
  } = params;
  
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerListadoAsignaAbogado/${year}/${companySelected}/${dateId}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getLawyersApi = () => {
  
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerAbogadosLitigantes`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getTypesCarterasApi = () => {
  
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerTiposCartera`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getLayoutAsignacionApi = (companySelected) => {
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerLayoutAsignacion/${companySelected}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const postGuardarAsignacionAbogadoApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/cobranzajudicial/guardaAsignacionAbogado`,
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const postDesactivarAsignacionAbogadoApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/cobranzajudicial/desactivaAsignacionAbogado`,
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
