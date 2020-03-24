import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

// TIPO SERVICIOS,DEPARTAMENTOS,PRIORIZADOR,PUESTO
export const getTiposServicios = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/tipostickets`,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDepartamentos = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: '/departamentos/rd',
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPriorizadores = (id) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/departamentos/empleados/${id}`,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPuestos = () => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: '/rolesPuestos',
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export function savePlantillaTickets(data) {
  return api.request({
    url: '/plantillatickets',
    method: 'post',
    data,
  }).then((resp) => 

    resp   
   
  ).catch((err) => err)
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

export const eliminarEtapaApi = (etapas) => {  
  console.log(etapas,"etapas");
  return api.request({
    url: '/plantillatickets/etapas/estatus',
    method: 'post',
    data: etapas,
  }).then((resp) => 
    resp   
  ).catch((err) => err)
}

export const cambiarEstatusApi = (IdEtapa) => {
  const req = Object.assign({ 
    method: 'post',
    url: `/plantillatickets/cambiarEstatusEtapasPlantillas/${IdEtapa}`,  
  });
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

