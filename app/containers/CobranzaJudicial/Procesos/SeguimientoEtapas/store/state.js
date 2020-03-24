const DUMMY_COLUMNS = [
  {
    id: "id",
    align: "center",
    disablePadding: true,
    label: "No. Cliente",
  },
  { id: "NomCliente", align: "left", disablePadding: true, label: "Nombre Cliente" },
  { id: "Plaza", align: "left", disablePadding: true, label: "Plaza" },
 //  { id: "PlazaId", align: "left", disablePadding: true, label: "PlazaId", show: false },
  { id: "Etapa", align: "left", disablePadding: true, label: "Etapa" },
  { id: "EtapaId", align: "left", disablePadding: true, label: "EtapaId", show: false },
  { id: "FechaAsignacionEtapa", align: "left", disablePadding: true, label: "Fecha Asignación" },
  
  { id: "FehaDemanda", align: "left", disablePadding: true, label: "Fecha Demanda" },
  { id: "IdSeguimientoCobranza", align: "left", disablePadding: true, label: "Id Seguimiento",  show: false},
  { id: "TipoCarteraId", align: "left", disablePadding: true, label: "Id Tipo Cartera",  show: false},
  { id: "AbogadoId", align: "left", disablePadding: true, label: "Id Abogado",  show: false},
  { id: "Antecedente", align: "left", disablePadding: true, label: "Antecedente",  show: false},
  { id: "Cartera", align: "left", disablePadding: true, label: "Cartera",  show: false},
  { id: "Juzgado", align: "left", disablePadding: true, label: "Juzgado", show: false },
  { id: "DiasEtapa", align: "left", disablePadding: true, label: "Días etapa" },
  { id: "DiasTranscurridos", align: "left", disablePadding: true, label: "Días transcurridos" },
  { id: "MontoReclamado", align: "left", disablePadding: true, label: "Monto reclamado", show: false },
  { id: "FechaEtapa", align: "left", disablePadding: true, label: "Fecha etapa", show: false },
  { id: "Expediente", align: "left", disablePadding: true, label: "Expediente", show: false },
  { id: "EmpresaId", align: "left", disablePadding: true, label: "Id Empresa", show: false },
  { id: "Estatus", align: "left", disablePadding: true, label: "Estatus" },
  { id: "Acciones", align: "left", disablePadding: true, label: "" },
]

const DUMMY_ROWS = [
  {
    id: 11,
    NomCliente: 'Juan',
    Plaza: 'Culiacan',
    PlazaId: 2,
    Cartera: 'Judicial',
    Etapa: 'Notificación',
    EtapaId: 1,
    EmpresaId: 10,
    FechaAsignacionEtapa: '27/08/2019',
    FehaDemanda: '01/09/2019',
    DiasEtapa: 10,
    DiasTranscurridos: 30,
    MontoReclamado: 4500,
    // FechaEtapa: '28/08/2018',
    Estatus: 'En Tiempo',
  },
  {
    id: 15,
    NomCliente: 'Manuel Verdugo',
    Plaza: 'Ensenada',
    PlazaId: 3,
    Cartera: 'ExtraJudicial',
    Etapa: 'Sentencia',
    EtapaId: 2,
    EmpresaId: 10,
    FechaAsignacionEtapa: '03/09/2019',
    FehaDemanda: '05/09/2019',
    DiasEtapa: 10,
    DiasTranscurridos: 30,
    MontoReclamado: 6798.30,
    // FechaEtapa: '28/08/2018',
    Estatus: 'Atrasado',
  },
 
]


export default {
  selectedStep: 0,
  seguimientoEtapas: {
    backend: {
      plazas: [],
      data: [],
    },
    frontend: {
      selectedPlaza: 0,
      stepper: 0,
      tabla: {
        rows: DUMMY_COLUMNS,
        order: 'asc',
        orderBy: '',
        selected: [],
        filterData:  [],
        showFilters: false,
        showSearchTextField: false,
        searchTextField: '',
        startDate: null,
        endDate: null,
        page: 0,
        rowsPerPage: 5,
        focusedInput: 'startDate',
        showAcciones: 0,
      },
    },
  },
  seguimientoAbogado: {
    frontend: {
      showModalEtapa: false,
      showModalFinalizarEtapa: false,
      cliente: {
        clienteId: null,
        etapaId: null,
        empresaId: 0,
        nombreCliente: '',
        plaza: '',
        fechaAsignacion: '',
        montoReclamado: 0,
        diasTranscurridos: 0,
      },
      etapa: {
        nombreEtapa: '',
        fechaEtapa: '',
        diasTranscurridosEtapa: '',
        archivoEtapaSubido: false,
        archivoEtapa: null,
        nombreArchivoEtapa: '',
        selectedEtapa: 0,
        notaEtapa: '',
        observacionEtapa: '',
        observacionFinalizarEtapa: '',
        archivoFinalizarEtapaSubido: false,
        archivoFinalizarEtapa: null,
        nombreArchivoFinalizarEtapa: '',
      },
      demanda: {
        antecedente: '',
        expediente: '',
        juzgado: '',
        fechaDemanda: '',
      },
    },
    backend: {
      etapas: [],
    },
    permisos:{},
  },
};