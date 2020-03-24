export default {
  modulosTabla: {
    order: 'asc',
    orderBy: '',
    selected: [],
    data: [],
    filterData: [],
    page: 0,
    rowsPerPage: 5,
    open: false,
    openSearch: false,
    searchText: '',
    openModal: false,
    openMenuContextual: false,
    stepper: 0,
    activarRegistros: null,
  },
  nuevoModulo:{
    textFieldNombre:'',
    textFieldDescripcion:'',
    stepperaddmodulo:0,
    openM:false,
    textFieldNombreFuncion:'',
    nombreBottonModalAddFuncion:0,
    tipoAgrupador:[],
    tipoAgrupadorSlc:-1,
    idtipoagrupador:[],
    urlFuncion:[],
    urlFuncionSlc:-1,
    URLFuncionId:[],
    mensajeLabelGrupo:'',
    mensajeLabelDias:'',
    vacioGrupo:false,
    vacioDias:false,
    openModalAddModulo:false,
    IdModulo:0,
    FuncionId:0,
    usuario:2,
    errorTipoAgrupador:false,
    errorNombreFuncion:false,
    openMensajeSalirFuncion:false,
    visualizaTabla:false,
    nombreTipoAgrupador:'',
    datosGuardar:[],
    datosGuardarEliminados:[],
    actualiza:false,
    modalFuncionesDisable:false,
    moduloSoloLectura:false,
    nombreSinActualizar:'',
    puestos:[],
    puestosAsigandos:[],
    idIndicador:0,
  },
  permisos: {
    normales: {
      sololectura: 0,
      registrar: 0,
      editar: 0,
      eliminar: 0,
    },
    especiales: {
      activar:0,
    },
  },
};