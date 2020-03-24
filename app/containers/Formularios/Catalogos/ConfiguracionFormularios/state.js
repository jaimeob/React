export default {
  // permisos: {
  //   normales: {
  //     sololectura: 0,
  //     registrar: 0,
  //     editar: 0,
  //     eliminar: 0,
  //   },
  //   especiales: {
  //   },
  // },
  formularioTabla: {
    stepper: 0,
    mostrarComponente: true,
    disabled: {
      agregar: true,
      guardar: true,
    },
    cabeceras: [
      {
        name: 'IdFormulario',
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
        name: 'Tipo',
        label: 'Tipo',
      },
      {
        name: 'Fecha',
        label: 'Fecha de registro',
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
    combos: {
      tipoPreguntas: [],
      usuarios: [],
    },
    datosModal: {
      abrirModal: false,
      mensajeConfirmacion: '',
    },
    nuevoFormulario: {
      editar:false,
      existeAsignacion:false,
      preguntas:[],
      idKey:0,
      campos: {
        idConfiguracion:null,
        titulo: {
          valor: '',
          campoValido: true,
          disabled: false,
        },
        descripcion: {
          valor: '',
          campoValido: true,
          disabled: false,
        },
        tipoFormulario: {
          valor: 'REFENC',
          campoValido: true,
          disabled:
           false,
        },
        validacion: {
          valor: false,
          campoValido: true,
          disabled: false,
        },
        permiteEditar: {
          valor: false,
          campoValido: true,
          disabled: false,
        },
        permiteCapturaLibre: {
          valor: false,
          campoValido: true,
          disabled: false,
        },
        usuario: {
          valor: '',
          campoValido: true,
          disabled: false,
        },
      },
      tablas: {
        usuariosAsignados: {
          datos: [],
          seleccionados: [],
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
    modal: {
      value: false,
      stepper: 0,
      text: '',
    },
    eliminarModal:false,
    idFormularioEliminar:0,
  },
}