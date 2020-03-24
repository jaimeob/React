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
  formularioRespuesta: {
    stepper: 0,
    mostrarComponente: true,
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
        name: 'FechaLimite',
        label: 'Fecha Limite',
      },
      {
        name: 'Estatus',
        label: 'Estatus',
        options: {
          setCellProps: () => ({ 
            style: { 
              width: '10%', 
            }, 
          }),
        },
      },
      {
        name: 'options',
        label: [],
        options: {
          filter: false,
        },
      },
    ],
    cabecerasUsuarios: [
      {
        name: 'Usuario',
        label: 'Usuario a evaluar',
      },
      {
        name: 'Departamento',
        label: 'Departamento',
      },
      {
        name: 'Puesto',
        label: 'Puesto',
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
    datosUsuarios: [],
    idAsignacion: '',
    idUsuarioEvaluar: '',
    nombreEvaluado: '',
    datosModal: {
      abrirModal: false,
      mensajeConfirmacion: '',
    },
    nuevaRespuesta: {
      editar:false,
      preguntas:[],
      titulo:'',
      descripcion:'',
      idAsignacion:null,
      idRespuesta:null,
      requiereValidacion:false,
      permiteEditar:true,
      existeRespuesta:false,
      cabecerasArchivos: [
        {
          name: 'descripcion',
          label: 'Descripción',
          options: {
            filter: false,
          },
        },
        {
          name: 'evidencia',
          label: 'Evidencia',
        },
        {
          name: 'estatus',
          label: 'Estatus',
          options: {
            setCellProps: () => ({ 
              style: { 
                width: '10%', 
              }, 
            }),
          },
        },
      ],
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
    documentacion: {
      archivos: [],
      eliminarArchivo: false,
    },
    eliminarModal:false,
    tipoFormulario:'',
    calificacion:0,
  },
}