const DUMMY_TABLE_COLUMNS = [
  {
    id: "Id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  { id: "Nombre", numeric: true, disablePadding: false, label: "Nombre" },
  { id: "SubFamilias", numeric: true, disablePadding: false, label: "Sub-Familias" },
  { id: "Estatus", numeric: true, disablePadding: false, label: "Estatus" },
  { id: "Acciones", numeric: true, disablePadding: false, label: "Acciones" },
]

const DUMMY_TABLE_ROWS = [
  {
    Id: 1,
    Nombre: "Obra Blanca",
    SubFamilias: 15,
    Estatus: "Activo",
  },
  {Id: 2, Nombre: "Obra Negra", SubFamilias: 20, Estatus: "Activo"},
  {Id: 3, Nombre: "Obra Gris", SubFamilias: 50, Estatus: "Activo"},
  {Id: 4, Nombre: "Frozen yoghurt", SubFamilias: 159, Estatus: "Activo"},
  {Id: 5, Nombre: "Gingerbread", SubFamilias: 356, Estatus: "Activo"},
  {Id: 6, Nombre: "Honeycomb", SubFamilias: 408, Estatus: "Activo"},
  {Id: 7, Nombre: "Ice cream sandwich", SubFamilias: 237, Estatus: "Activo"},
  {Id: 8, Nombre: "Jelly Bean", SubFamilias: 375, Estatus: "Activo"},
  {Id: 9, Nombre: "KitKat", SubFamilias: 518, Estatus: "Activo"},
  {Id: 10 , Nombre: "Lollipop", SubFamilias: 392, Estatus: "Inactivo"},
  {Id: 11 , Nombre: "Marshmallow", SubFamilias: 318, Estatus: "Inactivo"},
  {Id: 12 , Nombre: "Nougat", SubFamilias: 360, Estatus: "Inactivo"},
  {Id: 13 , Nombre: "Oreo", SubFamilias: 437, Estatus: "Inactivo"},
]

const DUMMY_TABLE_COLUMNS_SEARCH = [
  'Nombre',
]

/*
const DUMMY_FILTER_OPTION = [
  'Todos',
  'Activos',
  'Inactivos',
]
*/

const DUMMY_FILTER_OPTION = [
  {checked: true, option: 'Todos'},
  {checked: false, option: 'Activos'},
  {checked: false, option: 'Inactivos'},
]

const DUMMY_OPTION_OPTION = [
  'Activar',
  'Desactivar',
]


const DUMMY_TABLE_COLUMNS_SUB = [
  {
    id: "Id",
    align: "left",
    disablePadding: false,
    label: "ID",
  },
  { id: "Nombre", align: "left", disablePadding: false, label: "Nombre" },
  { id: "Acciones", align: "right", disablePadding: false, label: "Acciones" },
]

/*
const DUMMY_TABLE_ROWS_SUB = [
  {
    Id: '0010001',
    Nombre: "COSA",
  },
  {Id: '0010001', Nombre: "COSA1"},
  {Id: '0010002', Nombre: "COSA2"},
  {Id: '0010003', Nombre: "COSA3"},
  {Id: '0010004', Nombre: "COSA4"},
  {Id: '0010005', Nombre: "COSA5"},
  {Id: '0010006', Nombre: "COSA6"},
  {Id: '0010007', Nombre: "COSA7"},
  {Id: '0010008', Nombre: "COSA8"},
  {Id: '0010009', Nombre: "COSA9"},
  {Id: '0010010', Nombre: "COSA10"},
  {Id: '0010011', Nombre: "COSA11"},
  {Id: '0010012', Nombre: "COSA12"},
]
*/


const DUMMY_ADD_SUB_COLUMNS_SEARCH = [
  'Nombre',
]

const DUMMY_ADD_SUB = [
  {
    id: "Id",
    align: "left",
    disablePadding: false,
    label: "ID",
  },
  { id: "Nombre", align: "left", disablePadding: false, label: "Nombre" },
]

const DUMMY_ADD_SUB_ROWS = [
  {
    Id: '0010001',
    Nombre: "COSA",
  },
  {Id: '0010001', Nombre: "COSA1"},
  {Id: '0010002', Nombre: "COSA2"},
  {Id: '0010003', Nombre: "COSA3"},
  {Id: '0010004', Nombre: "COSA4"},
  {Id: '0010005', Nombre: "COSA5"},
  {Id: '0010006', Nombre: "COSA6"},
  {Id: '0010007', Nombre: "COSA7"},
  {Id: '0010008', Nombre: "COSA8"},
  {Id: '0010009', Nombre: "COSA9"},
  {Id: '0010010', Nombre: "COSA10"},
  {Id: '0010011', Nombre: "COSA11"},
  {Id: '0010012', Nombre: "COSA12"},
]

export default {
  topbarTitle: "Listado de Familias",
  stepper: {
    selectedStep: 0,
    totalSteps: 2,
  },
  tableFamily: {
    messageEmptyFamily: "Una vez que se registren familias, se mostrarán en este apartado.",
    toolBar: {
      activeSearch: false,
      searchText: '',
      columnsToSearch: DUMMY_TABLE_COLUMNS_SEARCH,
      filterFamily: 'Todos',
      preMenuFilterIndex: 0,
      menuFilterIndex: 0,
      menuFilters: DUMMY_FILTER_OPTION,
      menuOptions: DUMMY_OPTION_OPTION,
    },
    Haeder: {
      headersFamily: DUMMY_TABLE_COLUMNS,
    },
    body: {
      dataFamily: DUMMY_TABLE_ROWS,
    },
  },
  adminFamily: {
    idFamily: 0,
    nameFamily: '',
    totalSubFamilys: 0,
    openList: false,
    openModalSave: false,
    saveSubFamilys: false,
    openModalSuccess: false,
    markRequired: false,
    openModalConfirmExit: false,
    openModalErrorSave: false,
    table: {
      toolBar: {
        titleTable: 'Listado de Sub-Familias',
        activeSearch: false,
        searchText: '',
        columnsToSearch: DUMMY_TABLE_COLUMNS_SEARCH,
      },
      Haeder: {
        headersFamily: DUMMY_TABLE_COLUMNS_SUB,
      },
      body: {
        dataSubFamily: [],
        rowsDeleteAdmin: [],
      },
    },
    listSubFamilys: {
      selectedList: [],
      toolBar: {
        activeSearch: false,
        searchText: '',
        columnsToSearch: DUMMY_ADD_SUB_COLUMNS_SEARCH,
      },
      Haeder: {
        headersListSubFamilys: DUMMY_ADD_SUB,
      },
      body: {
        dataListSubFamily: DUMMY_ADD_SUB_ROWS,
        rowsSelectedList: [],
      },
    },
  },
  chargesFamily: {
    idFamilySelected: 0,
    modalCharge: false,
    listChargesOrigin: [],
    listCharges: [],
  },
};
