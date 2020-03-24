import api from 'services/api';

export const getGoalPorcentSaveApi = year => {
  const req = Object.assign({
    method: 'get',
    url: `/negociaciones/ObtenerMetaPorcentajeAhorro/${year}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getPorcentSavePlazaApi = params => {
  const {
    dateStart,
    dateEnd,
  } = params;

  const req = Object.assign({
    method: 'get',
    url: `/negociaciones/ObtenerPorcentajeAhorroPlazas/${dateStart}/${dateEnd}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
