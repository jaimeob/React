import { ComponentType } from "./records";
/* DATOS DUMMY, REPRESENTAN LOS DATOS QUE VIENEN DEL SERVIDOR  */
// const DUMMY_DEPTOS_FORMULARIOS = [
//   {
//     departamentoId: 1,
//     nombre: "Administracion DG",
//     estatus: true,
//     createdAt: "2019-02-14 19:13:00",
//     updatedAt: "2019-02-20 19:13:00",
//     puestos: null,
//     plantillatickets: null,
//     empleados: null,
//     tickets: null,
//     plantillaformularios: [],
//     id: "DUMDEPFORM1",
//   },
// ]


const DUMMY_SOURCE_DEPARTAMENTO = [
  {
    id: 'DEPA001',
    nombre: 'Sistemas',
  },
]

const DUMMY_SOURCE_FORMULARIOS = [
  {
    id: 'FORM001',
    nombreFormulario: 'Seleccione',
  },
  {
    id: 'FORM001',
    nombreFormulario: 'Solicitud de datos personales',
  },
  {
    id: 'FORM002',
    nombreFormulario: 'Créditos',
  },
]

const DUMMY_COMPONENT_TYPES = [
  ComponentType({
    id: 'TIPCOMP001',
    nombre: 'Etiqueta',
    tipo: 'etiqueta',
    icon: 'local_offer',
  }),
  ComponentType({
    id: 'TIPCOMP002',
    nombre: 'Texto Corto',
    tipo: 'textocorto',
    icon: 'short_text',
  }),
  ComponentType({
    id: 'TIPCOMP003',
    nombre: 'Texto Largo',
    tipo: 'textolargo',
    icon: 'notes',
  }),
  ComponentType({
    id: 'TIPCOMP004',
    nombre: 'Tabla',
    tipo: 'tabla',
    icon: 'grid_on',
  }),
  ComponentType({
    id: 'TIPCOMP005',
    nombre: 'Archivo',
    tipo: 'archivo',
    icon: 'cloud_upload',
  }),
];

export default {
  backend: {
    datasources: {
      departamentos: DUMMY_SOURCE_DEPARTAMENTO,
      formularios: DUMMY_SOURCE_FORMULARIOS,
      componentTypes: DUMMY_COMPONENT_TYPES,
      deptosFormularios: [],
    },
    payloads: {
      configuracionformulario: {},
      configuracioncomponentes: [],
    },
    request: {},
    failed: {},
  },
  frontend: {
    topbarTitle: 'Configuración de formulario',
    tableOptions: {
      order: 'desc',
      orderBy: 'nombre',
      selected: [],
      page: 0,
      rowsPerPage: 5,
      rowIdHover: '',
      anchorElFilter: null,
      anchorElOption: null,
      filterList: 'A',
      modalChangeStatus: false,
      modalChangeStatusChecks: false,
      optionSelected: false,
    },
    actions: {
      selectedId: '', 
    },
    ui: {
      loadingDepartamentos: false,
      loadingFormularios: false,
      loadingValidNombreForm: false,
      openPublishModal: false,
      openSaveModal: false,
      openDeleteModal: false,
      saveModalMessage: '',
      saveModalTitle: 'Configuracion de componentes',
      saveModalVariant: 'Info',
      selectedComponentType: 0,
      selectedComponentId: '',
      loadingSaveRequest: false,
      isEditingCfrm: false,
      confirmPublish: false,
      selectedConfiguracionId: '',
    },
    selectedConfigComp: -1,
    selectedTableCell: -1,
    editMode: false,
    form: {
      departamento: {
        value: '',
        errorMessage: '',
        validators: {
          required: true,
          alphanumeric: true,
        },
      },
      nombreFormulario: {
        value: '',
        errorMessage: '',
        validators: {
          required: true,
          alphanumeric: true,
          maxlength: 100,
        },
      },
      tipoFormulario: {
        value: '',
        errorMessage: '',
        validators: {
          required: true,
        },
      },
      formulario: {
        value: '',
        errorMessage: '',
        validators: {
          required: false,
        },
      },
      logoFile: {
        buffer: null,
        name: '',
        type: '',
        size: 0,
        url: '',
      },
    },
    listForm: {
      selectSearch: false,
      textSearch: '',
      data: [],
    },
    stepper: {
      selectedStep: 0,
      totalSteps: 3,
    },
    configFormularioForm: {
      estatus: {
        value: '',
        errorMessage: '',
      },
      fecha: {
        value: '',
        errorMessage: '',
        disabled: false,
      },
      publicacion: {
        value: '',
        errorMessage: '',
        disabled: false,
      },
      configuredComponents: [
        /* DEBERÁ INCLUIR UN TEMPLATE */
      ],
      maxColumns: 8,
    },
    isValidForm: false,
  },
};
