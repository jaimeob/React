export default {
  pedidosTabla: {
    agregar: false,
    modificado: false,
    cabeceras: [],
    openModal: false,
    datos: [],
    estatusCombo: [],
    idPedido: null,
    plazas: [],
    noCambio: false,
    parametros: {
      plaza: {
        id: '',
        nombre: '',
      },
      estatusSeleccionado: {
        id: '',
        nombre: '',
      },
      idEstatus: 0,
      fecSolicitudInicio: null,
      fecSolicitudFin: null,
      fecAutorizacionInicio: null,
      fecAutorizacionFin: null,
      fechaSolicitudInput: null,
      fechaAutorizacionInput: null,
    },
    stepper: 0,
    pedidoDetalle: {
      cabeceras: [],
      datos: [],
      infoPedido: {
        idPedido: null,
        solicitante: '',
        idEstatus: null,
        plaza: '',
        guardar: null,
        recibir: null,
      },
      bandIntento: false,
      ComentariosGeneral: '',
      bandComentariosGeneral: true,
      bandCotizacion: false,
      prevIntento: true,
      bandGuardar: false,
      paginaActual: 1,
      totalPaginas: 1,
      ids: [],
      cotizaciones: [],
      cotizacionesEliminadas: [],
      cotizacionesPaginado: [],
      cotizacionesForm: [],
      cotizacionesInput: null,
      recibir: false,
      cotizacionesPageFin: 3,
      cotizacionesPageInicio: 0,
    },
    idPlaza: null,
  },
  mounted: false,
}