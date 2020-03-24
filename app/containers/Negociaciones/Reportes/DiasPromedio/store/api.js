import api from 'services/api';

export const getGoalDaysApi = year => {
  const req = Object.assign({
    method: 'get',
    url: `/negociaciones/obtenerMetaDiasPromedio/${year}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getDaysAverageApi = params => {
  const {
    dateStart,
    dateEnd,
  } = params;

  const req = Object.assign({
    method: 'get',
    url: `/negociaciones/obtenerListadoDiasPromedio/${dateStart}/${dateEnd}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getDaysAverageDetailApi = params => {
  const {
    dateStart,
    dateEnd,
    employe,
  } = params;

  const req = Object.assign({
    method: 'get',
    url: `/negociaciones/ObtenerDiasPromedioDetalleXEmpleado/${dateStart}/${dateEnd}/${employe}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}