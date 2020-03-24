const HEADERS = [
  { id: 'id', numeric: false, disablePadding: true, label: '#',show:false },
  { id: 'Nombre', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'Direccion', numeric: false, disablePadding: true, label: 'Dirección' },
  { id: 'Plaza', numeric: false, disablePadding: true, label: 'Plaza' },
  { id: 'Departamento', numeric: false, disablePadding: true, label: 'Departamento' },
  { id: 'Puesto', numeric: false, disablePadding: true, label: 'Puesto' },
  { id: 'Periodo', numeric: false, disablePadding: true, label: 'Periodo' },
  { id: 'Etapa', numeric: false, disablePadding: true, label: 'Estatus' },
  { id: 'Estatus', numeric: false, disablePadding: true, label: 'Estatus',show:false },
]
const DUMMY_DATA = [
  {
    id: 1,
    Nombre: 'Sonia Gomez',
    Direccion: 'Dirección Uno',
    Plaza:'Corporativo' ,
    Departamento:'Recursos Humanos',
    Puesto:'Gerente RH',
    Periodo:'2018',
    Etapa:'Entregado',
    Estatus: true,
  },
  {
    id: 2,
    Nombre: 'Sonia Gomez',
    Direccion: 'Dirección dos',
    Plaza:'Culiacan' ,
    Departamento:'Recursos Humanos',
    Puesto:'Gerente Sistemas',
    Periodo:'2018',
    Etapa:'Entregado',
    Estatus: true,
  },
  {
    id: 3,
    Nombre: 'Sonia Gomez',
    Direccion: 'Dirección tres',
    Plaza:'Corporativo' ,
    Departamento:'Contabilidad',
    Puesto:'Gerente contabilidad',
    Periodo:'2018',
    Etapa:'Pendiente',
    Estatus: true,
  },
]

export default {
  permisos:{},
  modalDelete: false,
  listadoEntregaIndicador: {
    backend: {
      data: [],
    },
    frontend: {
      rows: HEADERS,
    },
  },
  selected:[],
  totalEvaluados:'',
  aplicaBono:'',
  pendienteEntrega:'',
  selectDireccion:[],
  Direccion:[],
  selectPlaza:[],
  Plaza:[],
  selectDepartamento:[],
  Departamento:[],
  selectPuesto:[],
  Puesto:[],
  selectEstatus:[],
  filtroDireccion:[],
  filtroPlaza:[],
  filtroDepartamento:[],
  filtroPuesto:[],
  filtroEstatus:[],
};