import api from 'services/api';

export const getYearsGeneralScreenApi = () => {

  const req = Object.assign({
    method: 'get',
    url: `/negociaciones/ObtenerAniosPorcentajeImpacto`,
    // ...formatOptions(params),
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getPorcentImpactApi = (year) => {

  const req = Object.assign({
    method: 'get',
    url: `/negociaciones/ObtenerPorcentajeImpactoXAnio/${year}`,
    // ...formatOptions(params),
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getDataImpactApi = year => {
  const req = Object.assign({
    method: 'get',
    url: `/negociaciones/ObtenerDatosGeneralesImpacto/${year}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getDataDetailApi = params => {
  const {
    year,
    id,
  } = params
  const req = Object.assign({
    method: 'get',
    url: `/negociaciones/ObtenerDetalleImpacto/${year}/${id}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}