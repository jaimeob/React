export default {
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
  asignacionTabla: {
    stepper: 0,
    collapse: false,
    asignacionSlc: '',
    update: false,
    IdAsignacion: '',
    NombreUsuario: '',
    IdRegistro: '',
    disabled: {
      agregar: true,
      guardar: true,
    },
    modal: {
      open: false,
    },
    cabeceras: [
      {
        name: 'IdAsignacion',
        label: 'Folio',
        options: {
          filter: false,
        },
      },
      {
        name: 'Nombre',
        label: 'Nombre',
      },
      {
        name: 'Formulario',
        label: 'Formulario asignado',
      },
      {
        name: 'FechaInicio',
        label: 'Fecha inicio',
      },
      {
        name: 'FechaFinal',
        label: 'Fecha final',
      },
      {
        name: 'Responsable',
        label: 'Responsable',
      },
      {
        name: 'Estatus',
        label: 'Estatus',
      },
      {
        name: 'options',
        label: [],
        options: {
          filter: false,
        },
      },
    ],
    datos: [],
    nuevaAsignacion: {
      tipoFormulario: '',
      stepper: 0,
      requiereValidacion: false,
      campos: {
        descripcion: {
          valor: '',
          campoValido: true,
          disabled: false,
        },
        formulario: {
          valor: '',
          campoValido: true,
          disabled: false,
        },
        fechaInicio: {
          valor: null,
          campoValido: true,
          disabled: false,
        },
        fechaFinal: {
          valor: null,
          campoValido: true,
          disabled: false,
        },
        departamentosSlc: {
          valor: [],
          campoValido: true,
          disabled: false,
        },
        puestosSlc: {
          valor: [],
          campoValido: true,
          disabled: false,
        },
        usuario: {
          valor: '',
          campoValido: true,
          disabled: false,
        },
      },
      combos: {
        formularios: [],
        departamentos: [],
        puestos: [],
        usuarios: [],
      },
      tablas: {
        asignaciones: {
          seleccionados: [],
          datos: [],
        },
      },
    },
    configuracion : {
      filtro : true,
      descarga : false,
      columnas : false,
      ordenar: false,
      imprimir : false,
      seleccionable: 'none',
      registrosPorPagina: 10,
    },
  },
}