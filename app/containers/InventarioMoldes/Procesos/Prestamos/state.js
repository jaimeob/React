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
  prestamoTabla: {
    stepper: 0,
    snackbar: 0,
    update: false,
    updateRegistro: false,
    idxRegistro: '',
    prestamoSlc: null,
    disabled: {
      agregar: true,
      guardar: true,
    },
    almacenes: [],
    insumos: [],
    almacenesPlazas: [],
    moldesAlmacenes: [],
    cabeceras: [
      {
        name: 'PrestamoId',
        label: 'Folio',
        options: {
          filter: false,
        },
      },
      {
        name: 'Descripcion',
        label: 'Descripción',
        options: {
          filter: false,
        },
      },
      {
        name: 'MoldeOrigen',
        label: 'Origen',
      },
      {
        name: 'MoldeDestino',
        label: 'Destino',
      },
      {
        name: 'Plaza',
        label: 'Plaza',
      },
      {
        name: 'Almacen',
        label: 'Almacén',
      },
      {
        name: 'FechaCreacion',
        label: 'Fecha',
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
    nuevoPrestamo: {
      campos: {
        descripcion: {
          valor: '',
          campoValido: false,
          disabled: false,
        },
        plaza: {
          valor: '',
          campoValido: false,
          disabled: false,
        },
        almacen: {
          valor: '',
          campoValido: false,
          disabled: true,
        },
        moldeOrigen: {
          valor: '',
          campoValido: false,
          disabled: true,
        },
        moldeDestino: {
          valor: '',
          campoValido: false,
          disabled: true,
        },
        piezaOrigen: {
          valor: '',
          campoValido: false,
          disabled: true,
        },
        piezaDestino: {
          valor: '',
          campoValido: false,
          disabled: true,
        },
      },
      combos: {
        plazas: [],
        almacenes: [],
        moldesOrigen: [],
        moldesDestino: [],
        piezasOrigen: [],
        piezasDestino: [],
      },
      tablas: {
        prestamos:{
          seleccionados: [],
          datos: [],
        },
      },
    },
    modal: {
      value: false,
      stepper: 0,
      text: '',
      options: 'Select',
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

