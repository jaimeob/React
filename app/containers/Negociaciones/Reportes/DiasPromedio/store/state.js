
const COLUMNS_TABLE = [
  {
    id: "Nombre",
    disablePadding: false,
    label: "Nombre de Empleado",
    direction: 'left',
  },
  { id: "Promedio", disablePadding: false, label: "Promedio Cierre", direction: 'center' },
  { id: "CumplimientoMeta", disablePadding: false, label: "Cumplimiento Meta", direction: 'right' },
]

const COLUMNS_MODAL = [
  {
    id: "Id",
    disablePadding: false,
    label: "Ticket",
    direction: 'center',
  },
  { id: "Nombre", disablePadding: false, label: "Descripcion", direction: 'left' },
  { id: "FechaAsignacion", disablePadding: false, label: "Fecha Creacion", direction: 'left' },
  { id: "FechaActualizacion", disablePadding: false, label: "Fecha Solucion", direction: 'left' },
  { id: "DiasResolver", disablePadding: false, label: "Dias Resolver", direction: 'center' },
]
/*
const ROWS_MODAL = [
  {
    Id: 1,
    Nombre: 'algo aqui',
    PromedioCierre: 15.6,
    FechaAsignacion: '2019-01-01',
    FechaActualizacion: '2019-01-01',
    DiasResolver: 15,
  },
  { Id: 2, Nombre: 'otra des', PromedioCierre: 20.5, FechaAsignacion: '2019-01-01', FechaActualizacion: '2019-01-01', DiasResolver: 20},
  { Id: 3, Nombre: 'descrip', PromedioCierre: 40, FechaAsignacion: '2019-01-01', FechaActualizacion: '2019-01-01', DiasResolver: 5},
  { Id: 4, Nombre: 'descripcion', PromedioCierre: 55, FechaAsignacion: '2019-01-01', FechaActualizacion: '2019-01-01', DiasResolver: 10},
  { Id: 5, Nombre: 'algo', PromedioCierre: 10.6, FechaAsignacion: '2019-01-01', FechaActualizacion: '2019-01-01', DiasResolver: 1},
]
*/
/*
const ROWS_TABLE = [
  {
    Id: 1,
    NombreEmpleado: 'Juanito',
    PromedioCierre: 15.6,
  },
  { Id: 2, NombreEmpleado: 'Anita Huerfanita', PromedioCierre: 1.00},
  { Id: 3, NombreEmpleado: 'Tito Camotito', PromedioCierre: 12.5},
  { Id: 4, NombreEmpleado: 'Pepe Pecas', PromedioCierre: 4.5},
  { Id: 5, NombreEmpleado: 'Pica Papas', PromedioCierre: 8.00},
  { Id: 6, NombreEmpleado: 'Maria Maria', PromedioCierre: 10.00},
  { Id: 7, NombreEmpleado: 'Cecilia', PromedioCierre: 1.12},
  { Id: 8, NombreEmpleado: 'Martha', PromedioCierre: 0.05},
  { Id: 9, NombreEmpleado: 'Pedro', PromedioCierre: 7.77},
  { Id: 10, NombreEmpleado: 'Pablo', PromedioCierre: 0.00},
]
*/

export default {
  topbarTitle: "Días Promedio Negociación",
  goal: 0,
  showInfo: false,
  progressActive: false,
  openDetail: false,
  stepper: {
    selectedStep: 0,
  },
  dateStart: null,
  dateEnd: null,
  dateInput: null,
  Table: {
    columns: COLUMNS_TABLE,
    rows: [],
  },
  Modal :{
    columnsM: COLUMNS_MODAL,
    rowsM: [],
  },
};