const DUMMY_COLUM = [
  {
    name: 'NombreDepartamento',
    label: 'Departamento',
  },
  {
    name: 'NombrePuesto',
    label: 'Puesto',
  },
  {
    name: 'NumeroIndicadores',
    label: 'Núm Indicadores',
    options: {
      filter: false,
    },
  },
  /*
  {
    name: 'Estatus',
    label: 'Estatus',
    options: {
      filter: false,
    },
  },
  */
  {
    name: 'options', 
    label: ' ',
    options: {
      sort : false,
      filter: false,
      searchable: false,
    },
  },
]

const DUMMY_COLUM_INDICATORS = [
  { id: "Nombre", disablePadding: false, label: "Indicador", direction: 'left' },
  { id: "Peso", disablePadding: false, label: "Peso", direction: 'center' },
  { id: "Objetivo", disablePadding: false, label: "Objetivo", direction: 'center' },
  { id: "ObjetivoMax", disablePadding: false, label: "Máximo", direction: 'center' },
  { id: "ObjetivoMin", disablePadding: false, label: "Mínimo", direction: 'center' },
  { id: "DetonaBono", disablePadding: false, label: "Detona bono", direction: 'center' },
  { id: "Estatus", disablePadding: false, label: "Estatus", direction: 'left' },
  { id: "Acciones", disablePadding: false, label: "", direction: 'center' },
]

const DUMMY_FILTER_OPTION = [
  'Activo',
  'Inactivo',
]

const DUMMY_OPTION_OPTION = [
  'Activar',
  'Desactivar',
]

const DUMMY_INDICATOR_OPTIMIZATION = [
  {
    value: 0,
    label: 'Minimizar',
  },
  {
    value: 1,
    label: 'Maximizar',
  },
]

export default {
  configuracionIndicadores: {
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
    backend: {
      datasources: {
        data: [],
      },
    },
    frontend: {
      stepper: 0,
      ui: {
        headers: DUMMY_COLUM,
        configuration: {
          filtro: true,
          descarga: false,
          columnas: false,
          imprimir: false,
          seleccionable: 'none',
          registrosPorPagina: 5,
        },
      },
    },
  },
  detalleIndicador: {
    backend: {
      datasources: {
        dataIndicators: [],
      },
    },
    frontend: {
      ui: {
        edit: false,
        processType: [],
        processSelected: 0,
        nombreDepartamento: '',
        nombrePuesto: '',
        idDepartamento: 0,
        idPuesto: 0,
        headersIndicators: DUMMY_COLUM_INDICATORS,
        activeSearch: false,
        searchText: '',
        filterOptions: DUMMY_FILTER_OPTION,
        menuFilterIndex: 0,
        menuOptions: DUMMY_OPTION_OPTION,
        rowSelected: [],
        showDialogDelete: false,
        changeWithButton: false,
        rowSelectedButton: [],
      },
    },
  },
  registrarIndicador : {
    backend: {
      datasources: {
        indicators: [],
        departments: [],
        positions: [],
        indicatorType: [],
        indicatorMeasurement: [],
        indicatorDataTypes: [],
        indicatorOptimization: DUMMY_INDICATOR_OPTIMIZATION,
        modules: [],
        storedProcedures: [],
        indicatorCuts: [],
        indicatorCutsPeriod: [],
        moduleOptions: [],
        grupos:[],
      },
    },
    frontend: {
      ui: {
        showDialogBack: false,
        indicatorDescription: '',
        selectedIndicator: null,
        selectedGrupo: {value:null,label:null},
        selectedIndicatorDetail: 0,
        selectedDepartment: [],
        selectedPosition: [],
        selectedIndicatorType: null,
        selectedIndicatorMeasurement: null,
        indicatorWeight: '',
        indicatorMinimum: '',
        indicatorMaximum: '',
        indicatorObjective: '',
        bonus: false,
        selectedIndicatorDataType: null,
        comparisonValue: '',
        selectedOptimization: null,
        selectedModule: null,
        selectedStoredProcedure: null,
        selectedIndicatorCut: null,
        selectedIndicatorCutPeriod: null,
        selectedModuleOption: null,
        maloMin: '',
        maloMax: '',
        regularMin: '',
        regularMax: '',
        buenoMin: '',
        buenoMax: '',
        errors:{
          indicatorMaximum: {
            error: false,
            message: '*Requerido',
          },
          indicatorObjective: {
            error: false,
            message: '*Requerido',
          },
          comparisonValue: {
            error: false,
            message: '*Requerido',
          },
          maloMin: {
            error: false,
            message: '',
          },
          maloMax: {
            error: false,
            message: '',
          },
          regularMin: {
            error: false,
            message: '',
          },
          regularMax: {
            error: false,
            message: '',
          },
          buenoMin: {
            error: false,
            message: '',
          },
          buenoMax: {
            error: false,
            message: '',
          },
        },
      },
    },
  },
};