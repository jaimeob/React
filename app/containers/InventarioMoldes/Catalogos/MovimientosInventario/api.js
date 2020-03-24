import axios from 'axios';
// import config from 'config/config.development';
import config from 'config';
export const api = axios.create(config.api);

export const getPlazasApi = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/molde/plazas',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getPlazasUsuarioApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: '/molde/plazasUsuario',
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getTipoMovimientosApi = (referencia) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/tiposMovimientos/${referencia}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};


export const getMovimientosApi = (idUsuario) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/movimientos/${idUsuario}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getDatosFolioApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/datosFolio`,
    data,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getMoldesExistentesApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/moldesExistentes`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getInsumosExistentesApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/insumosExistentes`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getMovimientoDetalleApi = (IdMovimiento) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/movimientoDetalle/${IdMovimiento}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getTablasMovimientoDetalleApi = (IdMovimiento) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/obtenerTablasMovimiento/${IdMovimiento}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getMoldesInexistentesApi = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/moldesInexistentes`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getPiezasMoldeApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/piezasMolde`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getAccesoriosMoldeApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/accesoriosMolde`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getAlmacenesUsuarioApi = (data) => {
  const req = Object.assign({
    method: 'POST',
    url: `/molde/almacenesPlazaUsuario`,
    data,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};



export const postGuardarNuevoMovimientoApi = (files) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/molde/nuevoMovimiento`,
    data: files,
  });
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const postUploadFile = (files) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/upload`,
    data: files,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response)
};

export const getDownloadedFile = (url) => axios({
  url,
  method: 'GET',
  responseType: 'blob', // important
}).then((response) => response)
  .catch((error) => error.response);

export const getAlmacenesApi = (IdPlaza) => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/almacenesPlaza/${IdPlaza}`,
  })
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error.response) 
};


// export const getAlmacenesDestinoApi = (IdPlaza) => {
//   const req = Object.assign({
//     method: 'GET',
//     url: `/molde/almacenesDestinoPlaza/${IdPlaza}`,
//   })
  
//   return api.request(req)
//     .then((resp) => resp)
//     .catch((error) => error.response) 
// };



