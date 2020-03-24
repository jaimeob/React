import axios from 'axios';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);

export const getPrestamos = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/prestamos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const devolverPrestamo = (datos) => {
  const req = Object.assign({
    method: 'post',
    url: `/prestamos/devolver`,
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPrestamoDetalle = (idPrestamo) => {
  const req = Object.assign({
    method: 'GET',
    url: `/prestamos/${idPrestamo}/detalle`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getMoldesAlmacenes = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/molde/moldesAlmacen/0`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getPlazas = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/plazas/usuario',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getAlmacenes= (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/almacenes/usuario',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getInsumos = () => {
  const req = Object.assign({
    method: 'POST',
    url: '/insumos/prestamos',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postPrestamos = (datos) => {
  const req = Object.assign({
    method: 'POST',
    url: '/prestamos',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getExistencia = (datos) => {
  
  const req = Object.assign({
    method: 'POST',
    url: '/prestamos/existencia',
    data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

// export const getAlmacenes = () => {
//   const req = Object.assign({
//     method: 'GET',
//     url: '/almacenes/0',
//   })

//   return api.request(req)
//     .then((resp) => resp)
//     .catch((error) => error)
// };

export const getAlmacenesPlaza = () => {
  const req = Object.assign({
    method: 'GET',
    url: '/almacenesPlazas',
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};
