import axios from 'axios';
// import isPlainObject from 'lodash/isPlainObject';
// import omit from 'lodash/omit';
// import isPlainObject from 'lodash/isPlainObject';
import config from 'config/config.development';
// import config from 'config';

export const api = axios.create(
  {"baseURL": config.api.baseURL}
);


// INSERTA DIFUSIONES  A SQL
export const postInsertarPortafolio= (data) => {
  const req = Object.assign({
    method: 'post',
    url: '/portafolios',  
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getDepartamentosPlantillas = (idDepartamento) => {
  const req = Object.assign({
    method: 'get',
    url: `/departamentos/plantillatickets/${idDepartamento}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};


export default api;
export const obtenerPortafoliosApi = (idUser) => {
  const req = Object.assign({
    method: 'get',
    url: `/portafolios/obtenerPortafolios/${idUser}`,

  });

  
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postObtenerPlantilla = (datos) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/obtenerPlantilla`,
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerPlantillas = (IdDepartamento) => {
  const req = Object.assign({
    method: 'get',
    url: `/plandetrabajo/obtPlantillas/${IdDepartamento}`, 
    // data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerCatalogosRecursoApi = () => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/obtenerCatalogosPDP`,
    data: {},
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerEmpleadosApi = (datos) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/obtenerEmpleadosPDP`,
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerEmpleadosDepartamentoApi = (datos) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/obtenerEmpleadosDepartamento`,
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerEmpleadosPorIdApi = (id) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/obtenerEmpleadoPorId/${id}`,
    // data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const setInvitarAmigoApi = (datos) => {
  console.log(datos,"datos -----");
  
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/invitarAmigo`,
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const editarLineaBaseApi = (datos) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/editarLineaBase`,
    data: datos,
  });
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const cancelarCopiaLineaBaseApi = (datos) =>{
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/cancelarCopiaLineaBase`,
    data: datos,
  });
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

// export const cambiarLineaBaseApi = (datos) => {
//   const req = Object.assign({
//     method: 'post',
//     url: `/plandetrabajo/cambiarLineaBase`,
//     data: datos,
//   });
  
//   return api.request(req)
//     .then((resp) => resp)
//     .catch((error) => error)
// };

export const enviarLineaBaseApi = (datos) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/enviarLineaBase`,
    data: datos,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};



// export const obtenerEmpleados = () => {
//   const req = Object.assign({
//     method: 'get',
//     url: `/plandetrabajo/obtenerEmpleados`,
//     // data: datos,
//   });

//   return api.request(req)
//     .then((resp) => resp)
//     .catch((error) => error)
// };


export const postInsertarProyecto = (data) => {
  const req = Object.assign({ 
    method: 'post',
    url: '/plandetrabajo/guardarProyecto',  
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerProyectos = (id,idUser) => {
  const req = Object.assign({
    method: 'get',
    url:  `/plandetrabajo/obtenerProyectos/${id}/${idUser}`, 
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerProyectosPendientes = (id) => {
  const req = Object.assign({
    method: 'get',
    url:  `/plandetrabajo/obtenerProyectosPendientes/${id}`, 
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerProyectosPorFecha = (data) => {
  const req = Object.assign({
    method: 'POST',
    url:  '/plandetrabajo/obtenerProyectosPorFecha', 
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerProyectosPorFechaPendientes = (data) => {
  const req = Object.assign({
    method: 'POST',
    url:  '/plandetrabajo/obtenerProyectosPorFechaPendientes', 
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const getUsuarioImagen = (params) => {
  const req = Object.assign({
    method: 'GET',
    url: `/usuarios/imagen?usuariodominio=${params}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerEmpleados = () => {
  const req = Object.assign({
    method: 'get',
    url: `/plandetrabajo/obtenerEmpleados`,
    // data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};
 
export const getTicketEspecificoApi = (idTicketSeleccionado) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/tickets/obtenerTicketEspecifico/${idTicketSeleccionado}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postUploadFileComentariosApi = (files) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'post',
    url: `/upload`,
    data: files,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)

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

export const getImagenAvatarApi = (idUsuario) => {
  const req = Object.assign({ // eslint-disable-line
    method: 'get',
    url: `/tickets/imagenUrl/${idUsuario}`,
  })
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const guardarLineaBaseApi = (datos) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/guardarLineaBase`,
    data: datos,
  });
 
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const cambiarProyectoEstatus = (idProyecto,idLineaBase,idAutorizacionEstatus) => {  
  const req = Object.assign({ 
    method: 'post',
    url: `/plandetrabajo/cambiarProyectoEstatus/${idProyecto}/${idLineaBase}/${idAutorizacionEstatus}`,  
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerAutorizadorApi = (idDepartamento,idPuesto) => {
  const req = Object.assign({ 
    method: 'get',
    url: `/plandetrabajo/obtenerAutorizador/${idDepartamento}/${idPuesto}`,  
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerDepartamentoApi = (idUsuario) => {
  const req = Object.assign({
    method: 'get',
    url: `/plandetrabajo/obtenerEmpleados/${idUsuario}`,
    // data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const postInsertarObservacion = (data) => {  
  const req = Object.assign({ 
    method: 'post',
    url: '/plandetrabajo/guardarObservacion',  
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerObservacionesApi = (idProyecto) => {
  const req = Object.assign({
    method: 'get',
    url: `/plandetrabajo/obtenerObservaciones/${idProyecto}`,
    // data: datos,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};



export const postInsertarDocumentosApi = (data) => {
  const req = Object.assign({ 
    method: 'post',
    url: `/plandetrabajo/guardarImpactosDocumentos`,  
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerImpactosDocumentosApi = (idProyecto) => {
  const req = Object.assign({
    method: 'get',
    url: `/plandetrabajo/obtenerImpactosDocumentos/${idProyecto}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};



export const postInsertarImpactosRiesgosApi = (data) => {
  const req = Object.assign({ 
    method: 'post',
    url: `/plandetrabajo/guardarImpactosRiesgos`,  
    data,
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerImpactosRiesgosApi = (idProyecto) => {
  const req = Object.assign({
    method: 'get',
    url: `/plandetrabajo/obtenerImpactosRiesgos/${idProyecto}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const cambiarEstatusImpactosApi = (idProyecto) => {  
  const req = Object.assign({ 
    method: 'post',
    url: `/plandetrabajo/cambiarEstatusImpactos/${idProyecto}`,  
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const cambiarEstatusApi = (idProyecto,estatus) => {
  const req = Object.assign({ 
    method: 'post',
    url: `/plandetrabajo/cambiarEstatusProyecto/${idProyecto}/${estatus}`,  
  });

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerLineasBasesPorApi = (IdProyecto,IdLineaBaseActiva) => {
  const req = Object.assign({
    method: 'get',
    url: `/plandetrabajo/obtenerLineasBasesPorProyecto/${IdProyecto}/${IdLineaBaseActiva}`,
  });  
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const cambiarEstatusTicket = (IdTicket,Estatus) => {
  
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/cambiarEstatusTicket/${IdTicket}/${Estatus}`,
  });  
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const cambiarEstatusImpactosDocumentosApi = (IdImpacto) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/cambiarEstatusImpactosDocumentos/${IdImpacto}`,
  });  
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const cambiarEstatusImpactosRiesgosApi = (IdImpacto) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/cambiarEstatusImpactosRiesgos/${IdImpacto}`,
  });  
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerTicketApi = (IdTicket) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/obtenerTicket/${IdTicket}`,
  });  
  
  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerTicketsCancelacionApi= (idProyecto) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/obtenerTicketsCancelacion/${idProyecto}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};

export const obtenerJefeIdApi = (IdPuesto) => {
  const req = Object.assign({
    method: 'post',
    url: `/plandetrabajo/obtenerJefeId/${IdPuesto}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
};