export default {
  stepper: 0,
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
  encuestasNuevo: {
    backend: {
      departamentos: [],
      puestos: [],
      asignacion: null,
      usuariosEvaluados: [],
      usuariosEvaluadores: [],
      usuariosAutorizados: [],
    },
    frontend: {
      departamentosSeleccionados: [],
      puestosSeleccionados: [],
      usuariosEvaluadosSeleccionados: [],
      usuariosEvaluadoresSeleccionados: [],
    },
  },
}