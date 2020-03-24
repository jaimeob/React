export default {
  permisos: {
    normales: {
      sololectura: 1,
      registrar: 1,
      editar: 1,
      eliminar: 1,
    },
    especiales: {
  
    },
  },
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
    loading: false,
    combos: {
      puestos: [],
      roles: [],
    },
    usuario: {
      idUsuario: null,
      nombre: '',
    },
  },
  registrar: {
    parametros: {
      idPuesto: null,
      puesto: {
        valor: '',
        campoValido: true,
      },
      rol: {
        valor: [],
        campoValido: true,
      },
      archivo: {
        formData: null,
        archivos: [],
      },
      activo: null,
    },
    lista: [],
    abrirModal: false,
    abrirModalArchivo: false,
    idArchivo: null,
    hayCambio: false,
    cabeceras: [
      {
        name: 'id',
        label: '#',
      },
      {
        name: 'empresa',
        label: 'Empresa',
      },
      {
        name: 'modulos',
        label: 'Módulo(s)',
      },
      {
        name:'',
        label: '',
        options: {
          filter: false,
          sort: false,
        },
      },
    ],
    cabecerasArchivo: [
      {
        name: 'id',
        label: '#',
      },
      {
        name: 'nombre',
        label: 'Nombre',
      },
      {
        name: 'fecha',
        label: 'Fecha',
      },
      {
        name: 'usuario',
        label: 'Usuario',
      },
      {
        name: 'options', 
        label: ' ',
        options: {
          sort : false,
          filter: false,
          searchable: false,
        },
      },
    ],
  },
  mounted: false,
}