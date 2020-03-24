export default {
  stepper: 0,
  show: false,
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
  encuestasTabla: {
    backend: {
      data: [],
    }, 
  },
  modal: {
    open: false,
  },
  encuestasNuevo: {
    backend: {
      departamentos: [],
      puestos: [],
      usuariosAsignados: [],
      reporte: {},
      usuarios: [],
    },
    frontend: {
      idAsignacion: null,
      usuario: null,
      estatus: null,
      comentario: null,
      departamentosSeleccionados: [],
      puestosSeleccionados: [],
      usuariosAsignadosSeleccionados: [],
    },
  },
}