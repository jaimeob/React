const DUMMY_FILTER_OPTION = [
  'Activo',
  'Inactivo',
]

const DUMMY_OPTION_OPTION = [
  'Activar',
  'Desactivar',
]

const COLUMN = [
  {
    id: "Id",
    disablePadding: false,
    label: "#",
    direction: 'center',
  },
  { id: "Anio", disablePadding: false, label: "Ebitda Periodo", direction: 'center' },
  { id: "NumeroPlazas", disablePadding: false, label: "Número Plazas", direction: 'center' },
  { id: "Estatus", disablePadding: false, label: "Estatus", direction: 'left' },
  { id: "Acciones", disablePadding: false, label: "", direction: 'center' },
]

export default {
  stepper: 0,
  showDialogDelete: false,
  showDialogReturn: false,
  changeWithButton: false,
  permisos: {
    normales: {
      sololectura: 0,
      registrar: 0,
      editar: 0,
      eliminar: 0,
    },
    especiales: {
      activar: 0,
    },
  },
  configuracionEbitda: {
    backend: {
      datasources: {
        rows: [],
      },
    },
    frontend: {
      ui: {
        processType: [],
        processSelected: 0,
        columns: COLUMN,
        activeSearch: false,
        rowSelected: [],
        rowSelectedButton: [],
        searchText: "",
        filterOptions: DUMMY_FILTER_OPTION,
        menuFilterIndex: 0,
        menuOptions: DUMMY_OPTION_OPTION,
      },
    },
  },
  registrarEbitda: {
    backend: {
      datasources: {
        plazas: [],
      },
    },
    frontend: {
      ebitda: {
        period: '',
        ebitdaId: 0,
        active: true,
      },
      errors: {
        period: {
          error: false,
          message: 'Requerido*',
        },
      },
    },
  },
};