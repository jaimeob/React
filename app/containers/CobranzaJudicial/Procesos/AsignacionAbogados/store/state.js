// const DUMMY_YEAR = 2019

/*
const DUMMY_COMPANYS = [
  {
    EmpresaId: 1,
    Nombre: 'Finamo',
  },
  {EmpresaId: 2,Nombre: 'Credi Recursos'},
  {EmpresaId: 3,Nombre: 'Patrimonio'},
]
*/
/*
const DUMMY_DATES = [
  {
    SemanaRetail: 25,
    MesRetail: 6,
    FechaInicio: '06/17',
    FechaFin: '06/23',
    AnioRetail: 2019,
  },
  {SemanaRetail: 26, MesRetail: 6, FechaInicio: '06/24',FechaFin: '06/30', AnioRetail: 2019},
  {SemanaRetail: 27, MesRetail: 7, FechaInicio: '07/01',FechaFin: '07/07', AnioRetail: 2019},
  {SemanaRetail: 28, MesRetail: 7, FechaInicio: '07/08',FechaFin: '07/14', AnioRetail: 2019},
]
*/
/*
const DUMMY_COLUMNS = [
  {
    id: "Id",
    align: "center",
    disablePadding: false,
    label: "No. Cliente",
  },
  { id: "Nombre", align: "left", disablePadding: false, label: "Nombre" },
  { id: "Plaza", align: "left", disablePadding: false, label: "Plaza" },
  { id: "Cartera", align: "left", disablePadding: false, label: "Cartera" },
  { id: "Etapa", align: "left", disablePadding: false, label: "Etapa" },
  { id: "Abogado", align: "left", disablePadding: false, label: "Abogado Asignado" },
  { id: "Acciones", align: "right", disablePadding: false, label: "Acciones" },
]
*/

const DUMMY_FILTER = [
  {Id: 1, option: 'Activos'},
  {Id: 2, option: 'Inactivos'},
]

const DUMMY_CARTERA = [
  {Id: 1, Nombre: 'JUDICIAL'},
  {Id: 2, Nombre: 'EXTRA JUDICIAL'},
]

/*
const DUMMY_LAWYERS = [
  {Id: 1, Nombre: 'JUAN GARCIA'},
  {Id: 2, Nombre: 'DANIELA MANJARREZ'},
]
*/
/*
const DUMMY_ROWS = [
  {
    Id: 1,
    Nombre: 'Juan',
    Plaza: 'Culiacan',
    Cartera: 'Judicial',
    Etapa: 'Notificación',
    Abogado: 'Pedro',
  },
  { Id: 2, Nombre: 'Ana', Plaza: 'Culiacan', Cartera: 'Judicial', Etapa: 'Toma de Poseción', Abogado: 'Pablo' },
  { Id: 3, Nombre: 'Maria', Plaza: 'Mazaclan', Cartera: 'Judicial', Etapa: 'Notificación', Abogado: 'Luisa' },
  { Id: 4, Nombre: 'Patricia', Plaza: 'Mazaclan', Cartera: 'Judicial', Etapa: 'Notificación', Abogado: '' },
  { Id: 5, Nombre: 'Pepe', Plaza: 'Mazaclan', Cartera: 'Judicial', Etapa: 'Toma de Poseción', Abogado: 'Jaqueline' },
  { Id: 6, Nombre: 'Carlos', Plaza: 'Tuxpan', Cartera: 'Judicial', Etapa: 'Toma de Poseción', Abogado: 'Jorge' },
  { Id: 7, Nombre: 'Saul', Plaza: 'Tuxpan', Cartera: 'Judicial', Etapa: 'Toma de Poseción', Abogado: 'Valiriano' },
  { Id: 8, Nombre: 'Gabriel', Plaza: 'Los cabos', Cartera: 'Judicial', Etapa: 'Embargo', Abogado: 'Mitchel' },
  { Id: 9, Nombre: 'Luis', Plaza: 'Los cabos', Cartera: 'Judicial', Etapa: 'Embargo', Abogado: 'Ricardo' },
  { Id: 10, Nombre: 'la chona', Plaza: 'Los cabos', Cartera: 'Judicial', Etapa: 'Embargo', Abogado: 'del diablo' },
  { Id: 11, Nombre: 'Sergio el bailador', Plaza: 'Los cabos', Cartera: 'Judicial', Etapa: 'Notificación', Abogado: '' },
]
*/
/*
const DUMMY_COLUMNS_SEARCH = [
  "Id",
  "Nombre",
]
*/

export default {
  topbarTitle: 'Asignación de abogados',
  selectedStep: 0,
  backend: {
    plazas: [],
    rows: [],
  },
  frontend: {
    year: 0,
    companys: [],
    dates: [],
    companySelected: 0,
    dateSelected: {},
    retailWeek: 0,
    textComboDate: 'Semana',
    columns: [],
    activeSearch: false,
    searchText: '',
    columnsToSearch: [],
    menuFilterIndex: 1,
    menuFilters: DUMMY_FILTER,
    modalDelete: false,
    reason: '',
    modalAssign: false,
    comboCartera: [],
    carteraSelected: 0,
    comboLawyer: [],
    lawyerSelected: 0,
    clientSelected: 0,
  },
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
};