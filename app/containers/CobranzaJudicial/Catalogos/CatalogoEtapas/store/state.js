// const COMBO = [
//   {"Id": 1, "Nombre": "Mercantil"},
//   {"Id": 2, "Nombre": "Civil"},
// ]

const COLUMN = [
  {
    id: "Id",
    disablePadding: false,
    label: "ID",
    direction: 'center',
  },
  { id: "Nombre", disablePadding: false, label: "Descripción", direction: 'left' },
  { id: "DiasPlazaForanea", disablePadding: false, label: "Plaza Foránea", direction: 'center' },
  { id: "DiasPlazaLocal", disablePadding: false, label: "Plaza Local", direction: 'center' },
  { id: "Dependencia", disablePadding: false, label: "Dependencia", direction: 'center' },
  { id: "Estatus", disablePadding: false, label: "Estatus", direction: 'left' },
  { id: "Acciones", disablePadding: false, label: "", direction: 'center' },
]
/*
const DUMMY_ROWS = [
  {
    Id: 1,
    Nombre: "Notificación",
    DiasPlazaForanea: 5,
    DiasPlazaLocal: 10,
    Dependencia: 0,
    Estatus: "Activo",
  },
  { Id: 2, Nombre: "Sentencia", DiasPlazaForanea: 10, DiasPlazaLocal: 12, Dependencia: 1, Estatus: "Activo" },
  { Id: 3, Nombre: "Embargo", DiasPlazaForanea: 11, DiasPlazaLocal: 1, Dependencia: 2, Estatus: "Activo" },
  { Id: 4, Nombre: "Adjudicación", DiasPlazaForanea: 2, DiasPlazaLocal: 3, Dependencia: 3, Estatus: "Activo" },
  { Id: 5, Nombre: "Toma de Poseción", DiasPlazaForanea: 8, DiasPlazaLocal: 4, Dependencia: 4, Estatus: "Inactivo" },
]
*/
const DUMMY_FILTER_OPTION = [
  'Activo',
  'Inactivo',
]

const DUMMY_OPTION_OPTION = [
  'Activar',
  'Desactivar',
]

export default {
  selectedStep: 0,
  topbarTitle: "Catálogo de Etapas",
  showModalNew: false,
  showDialogDelete: false,
  changeWithButton: false,
  backend: {
    plazas: [],
    rows: [],
  },
  frontend: {
    processType: [],
    processSelected: 0,
    columns: COLUMN,
    searchText: "",
    activeSearch: false,
    filterOptions: DUMMY_FILTER_OPTION,
    menuFilterIndex: 0,
    menuOptions: DUMMY_OPTION_OPTION,
    rowSelected: [],
    rowSelectedButton: [],
    titleModalNew: "",
    tipoMovto: 1,
    idEtapa: 0,
    nameEtapa: "",
    DaysPlazaForeign: '0',
    DaysPlazaLocal: '0',
    comboEtapas: [],
    positionEtapaSelected: -1,
    idEtapaCombo: 0,
    titleComboModal: "",
    estatus: "",
  },
};