export default {
  socketCliente:"",
  numUsuarioLogeado: 0,
  nomUsuarioLogeado: '',
  idDepartamentoLogeado: 0,
  idRolUsuarioLogeado: 0,
  plazaUsuarioLogeado: 2,
  plazasAutorizadas: [],
  mounted: false,
  modal: false,
  imagenAvatar:'',
  tablaMounted: false,
  selected: {
    isMensaje: 0,
    text: '',
    isToggle: -1,
    isDifusions:-1,
    bandejaText: 'Consulta de Tickets',
  },
  backend: {
    request: {},
    mensajeError: '',
  },
  listadoTickets: {
    data :[],
    headers : [],
  },
  navBandejaTickets:{
    totalTickets: 0,
    totalDifusiones: 0,
  },
  bandejaTickets: {
    segundos:"",
    FechaHoy:'',
    FechaInicio:'',
    tabEtapas: false,
    tipoSelected: -1,
    ticketSelected: {},
    tipoContenedor: 0,
    idTicketSelected: 0,
    EstatusTicketSelected: '',
    platillas: 0,
    tabSelected: 0,
    tabSelectedDetails:0,
    empleadosAsignarA: [],
    listadoTickets: [],
    listadoFiltrado: [],
    empleadoAsignado:'',
    prioridadAsignada: 0,
    indiceEtapaSeleccionado:"",
    prioridades: [],
    tickets: [],
    ticketsDetails: {
      departamentos: [],
      departamento: {
        'id': '',
        'nombre': '',
      },
      openModal: false,
      tipoJustificacion: '',
      disabledChat: false,
      valueTextModal:'',
      mensajeValue:'',
      urlFile: '',
      dataBlop: '',
      chatMounted: false,
      mensajes:[],
      plantillas: [],
      plantillaSelected: {
        'id' : '',
      },
      plantilla: {
        tipoForma: [],
      },
    },
  },
  bandejaDifusiones: {

  },
}