
import axios from 'axios';
import config from 'config/config.development';
export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

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

export const getCurrentDate = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/generals/obtenerFechaHora`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getWeeksRetail = (companySelected) => {
  const tipoMovto = companySelected === 2 ? 1 : 0;
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerSemMesRetail/empresa/${companySelected}/tipomovimiento/${tipoMovto}/asignacion/0`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getCompanys = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerEmpresasCobranzaJudicial`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getCompanyLayout = (selectedCompany) => {
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerEmpresasLayout/${selectedCompany}`,
    data:{},
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const postFile = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/cobranzajudicial/guardaCargaBase/`,
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getListadoMes = ({selectedCompany, mesRetail}) => {
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/empresa/${selectedCompany}/listado-mes/${mesRetail}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getExportarExcel = ({idBaseCobranza, selectedCompany}) => {
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/excel/base-cobranza/${idBaseCobranza}/empresa/${selectedCompany}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}


export default api