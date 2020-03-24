/*
const DUMMY_PERIODS = [
  {
    id: 1,
    Anio: 2018,
    NumeroPlazas: 17,
    Estatus: 'Cerrado',
  },
  {
    id: 2,
    Anio: 2019,
    NumeroPlazas: 3,
    Estatus: 'Abierto',
  },
]
*/

const DUMMY_HEADERS = [
  {
    id: "id",
    disablePadding: true,
    label: "#",
    direction: 'center',
  },
  { id: "Anio", disablePadding: true, label: "Periodo", direction: 'left' },
  { id: "NumeroPlazas", disablePadding: true, label: "Número Plazas", direction: 'center' },
  { id: "Estatus", disablePadding: true, label: "Estatus", direction: 'left' }, 
  { id: "Acciones", disablePadding: true, label: "", direction: 'left' }, 
];

const DUMMY_PLAZAS = [
  {
    IdPlaza: 1,
    Nombre: 'Culiazan',
    Rentabilidad: '',
  },
]

const DUMMY_OPTION_OPTION = [
  'Abierto',
  'Cerrado',
];

export default {
  permisos: {
    normales: {
      sololectura: 0,
      registrar: 0,
      editar: 0,
      eliminar: 0,
    },
    especiales: {
  
    },
  },
  configuracionPeriodo: {
    backend: {
      datasources: {
        data: [],
        totalPlazas: 0,
      },
    },
    frontend: {
      stepper: 0,
      ui: {
        rows:DUMMY_HEADERS,
        filterData: [],
        options: DUMMY_OPTION_OPTION,
        order: 'asc',
        orderBy: '',
        selected: [],
        page: 0,
        rowsPerPage: 5,
        showFilters: false,
        showSearchText: false,
        searchText: '',
        disabledAddButton: false,
        modal: {
          show: false,
          title: 'ADVERTENCIA',
          variant: 'Warning',
          message: 'No se ha configurado la rentabilidad por plaza.',
          typeOptions: null,
        },
      },
    },
  },
  registrarPeriodo: {
    backend: {
      datasources: {
        plazas: [],
      },
    },
    frontend: {
      ui: {
        periodDetail: {
          periodId: 0,
          period: '',
          closePeriod: 0,
        },
        errors: {
          period: {
            error: false,
            message: 'Requerido*',
          },
        },
      },
    },
  },
};