// const DUMMY_LIST_FORMS = [
//   { _id: '123456789',
//     nombre: 'Administración',
//     open: true,
//     plantillaformularios: [
//       { id: '123456789', nombreFormulario: 'uno'},
//       { id: '323456789', nombreFormulario: 'tres'},
//       { id: '43456789', nombreFormulario: 'cuatro'},
//     ]},
//   { _id: '223456789',
//     nombre: 'Finanzas',
//     open: true,
//     plantillaformularios: [
//       { id: '223456789', nombreFormulario: 'dos'},
//     ]},
//   { _id: '323456789',
//     open: true,
//     nombre: 'Sistemas',
//     plantillaformularios: [
//       { id: '523456789', nombreFormulario: 'cinco'},
//       { id: '623456789', nombreFormulario: 'seis'},
//     ]},
//   { _id: '423456789',
//     nombre: 'Recursos Humanos',
//     open: true,
//     plantillaformularios: [
//       { id: '723456789', nombreFormulario: 'siete'},
//       { id: '823456789', nombreFormulario: 'ocho'},
//       { id: '93456789', nombreFormulario: 'nueve'},
//     ]},
//   { _id: '523456789',
//     nombre: 'Finanzas',
//     open: true,
//     plantillaformularios: [
//       { id: '133456789', nombreFormulario: 'diez'},
//     ]},
// ]

const COLUMNS_LIST_FINALIZED = [
  { width: 160, flexGrow: 1.0, label: 'Usuario', dataKey: 'usuario', display: true, align: 'L' },
  { width: 120, label: 'Fecha Asignación', dataKey: 'FechaAsignacion', display: true, align: 'L' },
  { width: 120, label: 'Fecha Realización', dataKey: 'FechaRealizacion', display: true, align: 'L' },
  { width: 120, label: 'Fecha Finalización', dataKey: 'FechaFinalizacion', display: true, align: 'L' },
]

const COLUMNS_LIST_INPROCESS = [
  { width: 160, flexGrow: 1.0, label: 'Usuario', dataKey: 'usuario', display: true, align: 'L' },
  { width: 120, label: 'Fecha Asignación', dataKey: 'FechaAsignacion', display: true, align: 'L' },
  { width: 120, label: 'Fecha Realización', dataKey: 'FechaRealizacion', display: true, align: 'L' },
]

const COLUMNS_LIST_PENDING = [
  { width: 160, flexGrow: 1.0, label: 'Usuario', dataKey: 'usuario', display: true, align: 'L' },
  { width: 160, label: 'Fecha Asignación', dataKey: 'FechaAsignacion', display: true, align: 'L' },
]

// const DUMMY_LIST_FORMS_EMP_FINISH = [
//   { id: '723456789', usuario: 'Juan Escutia', fechaAsignacion: '01-02-19', fechaRealizacion: '02-04-19', fechaFinalizacion: '02-04-19', archivo: [] },
//   { id: '823456789', usuario: 'Miguel Hidalgo', fechaAsignacion: '01-02-19', fechaRealizacion: '02-04-19', fechaFinalizacion: '02-04-19', archivo: [] },
//   { id: '93456789', usuario: 'Benito Juarez', fechaAsignacion: '01-02-19', fechaRealizacion: '02-04-19', fechaFinalizacion: '02-04-19', archivo: [] },
// ]

// const DUMMY_LIST_FORMS_EMP_PROCESS = [
//   { id: '523456789', usuario: 'Emiliano Zapata', fechaAsignacion: '01-02-19', fechaRealizacion: '02-04-19', archivo: [] },
//   { id: '623456789', usuario: 'Francisco Villa', fechaAsignacion: '01-02-19', fechaRealizacion: '02-04-19', archivo: [] },
// ]

// const DUMMY_LIST_FORMS_EMP_PENDING = [
//   { id: '123456789', usuario: 'Jose María', fechaAsignacion: '01-02-19', fechaRealizacion: '02-04-19', archivo: [] },
//   { id: '323456789', usuario: 'Porfirio Diaz', fechaAsignacion: '01-02-19', fechaRealizacion: '02-04-19', archivo: [] },
//   { id: '43456789', usuario: 'Juana de la Cruz', fechaAsignacion: '01-02-19', fechaRealizacion: '02-04-19', archivo: [] },
// ]

export default {
  backend: {
    dataSource: {
      depasFormularios: [],
      employees: [],
    },
    request:{
    },
  },
  frontend: {
    selectedTemplate: false,
    tabViewActive: false,
    idMongoDepartament: '',
    departamentId: 0,
    ui: {
      loadingAssignedUsers: false,
      loadingFrmConfig: false,
    },
    search: {
      searchActive: false,
      textSearch: '',
    },
    list: {
      data: [],
    },
    firstTabs: {
      indexTab: 0,
    },
    selectedConfig: {},
    configuracionformulario: {
      id: '',
      Componentes: [],
    },
    preview: {
      view: [],
    },
    tabList: {
      indexTabList: 0,
      dataList: {
        finalized: [],
        inProcess: [],
        pending: [],
        assigned: [],
      },
    },
    assignList: {
      /* --- nuevo state */
      assignedUsers: [],
      /* ----- */
      dataSent: [],
      dataUsers: [],
      allUser: false,
      allUserSent: false,
      textSearchAssing: '',
      addUsers: false,
      flagMessage: false,
    },
  },
}

export const columnas = {
  finalized: COLUMNS_LIST_FINALIZED,
  inProcess: COLUMNS_LIST_INPROCESS,
  pending: COLUMNS_LIST_PENDING,
}
