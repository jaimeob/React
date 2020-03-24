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
  },
  registrar: {
    hayCambios: false,
    pestañaSlc: 0,
    idUsuario: null,
    guardarConfiguracion: false,
    nomUsuario: '',
    abrirModalArchivo: false,
    guardoTemp: {},
    guardoRolAdi: {},
    abrirPlazaTemporal: false,
    abrirRolAdicional: false,
    historial: {
      cabecerasHistorial: [
        {
          name: 'NombreMovimiento',
          label: 'Tipo movimiento',
          options: {
            filter: true,
          },
        },
        {
          name: 'PlazaRol',
          label: 'Plaza/Rol',
          options: {
            filter: true,
          },
        },
        {
          name: 'Periodo',
          label: 'Periodo',
          options: {
            filter: false,
          },
        },
        {
          name: 'UsuarioMovimiento',
          label: 'Usuario movimiento',
          options: {
            filter: false,
          },
        },
        {
          name: 'FechaMovimiento',
          label: 'Fecha movimiento',
          options: {
            filter: true,
          },
        },
        {
          name: 'Estatus',
          label: 'Estatus',
          options: {
            filter: true,
          },
        },
        {
          name: 'options',
          label: ' ',
          options: {
            filter: false,
          },
        },
      ],
      datosHistorial: [],
    },
    combos: {
      empleados: [],
      plazas: [],
      plazasTemp: [],
      plazasCopia: [],
      puestosAdi: [],
      rolesAdi: [],
      empresasAdi: [],
      dominios: [
        {IdDominio: 0, Nombre: 'fincamex.com.mx'},
        {IdDominio: 1, Nombre: 'finamo.com.mx'},
      ],
    },
    parametros: {
      empleado: {
        valor: '',
        campoValido: true,
      },
      enkontrol: {
        valor: '',
        campoValido: true,
      },
      modulos: [],
      idsSelecionados: [],
      empresaDetalle: '',
      rolDetalle: '',
      idRolEmpresa: null,
      abrirDetalleRol: false,
      rolDatos: [],
      modulosCabecera: [
        {
          name: 'select',
          label: ' ',
        },
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
          name: 'options',
          label: ' ',
        },
      ],
      archivos: [],
      archivoValido: true,
      archivosPage: 0,
      plazaTemporal: {
        plazaTemp: {
          valor: '',
          campoValido: true,
        },
        fecInicio: null,
        fecFin: null,
        fecInput: null,
        fechaValida: true,
        archivosTemp: [],
        archivoTempValido: true,
        abrirModalPlaza: false,
        asignarValido: true,
        hayCambiosTemp: false,
      },
      rolAdicional: {
        puestoAdi: {
          valor: '',
          campoValido: true,
        },
        rolAdi:{
          valor: '',
          campoValido: true,
        },
        empresaAdi: {
          valor: [],
          campoValido: true,
        },
        fecInicioRol: null,
        fecFinRol: null,
        fecInputRol: null,
        fechaValidaRol: true,
        archivosRol: [],
        archivoRolValido: true,
        abrirModalRol: false,
        asignarValidoRol: true,
        hayCambiosRol: false,
      },
    },
    info: {
      nombre: '',
      puesto: '',
      idPuesto: null,
      correo: {
        valor: '',
        campoValido: true,
      },
      dominio: 0,
      plaza: {
        valor: '',
        campoValido: true,
      },
      plazaPrev: null,
      usuarioDominio: '',
      imagen: '',
    },
  },
  mounted: false,
}