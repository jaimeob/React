
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

export const getTypeProcessApi = () => {
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerTipoProcesoJudicial`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getListEtapasApi = (params) => {
  const {
    ProcesoId,
    Estatus,
  } = params
  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerListadoEtapasCobranzaJudicial/${ProcesoId}/${Estatus}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const updateStatusEtapasApi = (params) => {
  const {
    ProcesoId,
    Estatus,
    rows,
  } = params

  const req = Object.assign({
    method: 'PUT',
    url: `/cobranzajudicial/actualizarEstatusEtapasCobranzaJudicial/${ProcesoId}`,
    data: {
      estatus: Estatus,
      etapas: rows.toString(),
    },
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const getEtapasTypeProcessApi = (params) => {
  const {
    ProcesoId,
    TipoMovto,
  } = params

  const req = Object.assign({
    method: 'GET',
    url: `/cobranzajudicial/obtenerComboEtapasCobranzaJudicial/${ProcesoId}/${TipoMovto}`,
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}

export const createEtapaApi = (params) => {
  const {
    procesoId,
    nomEtapa,
    diasPlazaForanea,
    diasPlazaLocal,
    idEtapaDependencia,
    empleado,
  } = params

  const req = Object.assign({
    method: 'POST',
    url: `/cobranzajudicial/crearEtapasCobranzaJudicial`,
    data: {
      procesoId,
	    nomEtapa,
	    diasPlazaForanea,
	    diasPlazaLocal,
	    idEtapaDependencia,
	    empleado,
    },
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}


export const editEtapaApi = (params) => {
  const {
    procesoId,
    idEtapa,
    nomEtapa,
    diasPlazaForanea,
    diasPlazaLocal,
    idEtapaDependencia,
    empleado,
  } = params

  const req = Object.assign({
    method: 'PUT',
    url: `/cobranzajudicial/editarEtapasCobranzaJudicial/${idEtapa}`,
    data: {
      procesoId,
	    nomEtapa,
	    diasPlazaForanea,
	    diasPlazaLocal,
	    idEtapaDependencia,
	    empleado,
    },
  })

  return api.request(req)
    .then((resp) => resp)
    .catch((error) => error)
}
