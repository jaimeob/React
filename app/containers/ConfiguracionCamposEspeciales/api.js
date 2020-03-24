import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

// IdPlantilla y IdPlaza
export const getEtapas = (id,IdPlantilla) => {
  
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/plantillatickets/etapas/${IdPlantilla}/${id}`,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPlazas = (id) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/plantillatickets/etapas/${id}` ,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const deleteEtapa = (id) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/plantillatickets/etapas/estatus`,
    data: id,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const deletePlaza = (id) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/plantillatickets/plazas/estatus`,
    data: id,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPlazasHabilitadas = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: '/plazas',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPuestos = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: '/rolesPuestos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getUsuariosPlaza = (id) => {  
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/usuariosPlaza/${id}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};


export const getEtapasPlaza = (plazaId,plantillaId) => {  
  plantillaId = 1
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/plantillatickets/etapas/${plantillaId}/${plazaId}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getTodasPlazas = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: '/todasPlazas',
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerCatalogos = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/tickets/obtenerCatalogos`,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getRelacionesApi = (IdCatalogo) => {
  const body = {
    IdCatalogo,
  }
  const req = Object.assign({
    method: 'post',
    url: '/tickets/obtenerRelacion',
    data: body,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getNumeroDepuestos = (id) => {  
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/plantillatickets/obtenerNumeroDePuestos/${id}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};