'use strict';

/**
 * Indicador.js controller
 *
 * @description: A set of functions called "actions" for managing `Indicador`.
 */

module.exports = {

  consultaConfiguracionBono: async (ctx) => {
    return strapi.services.indicador.consultaConfiguracionBono(ctx.params);
  },
  /**
   * consultaPuestosConfiguracionBono consulta los bonos configurados por puestos.
   *
   * @return {Object}
   */

  consultaPuestosConfiguracionBono: async (ctx) => {
    return strapi.services.indicador.consultaPuestosConfiguracionBono(ctx.params);
  },

  /**
   * guardaIndicadores guarda los indicadores.
   *
   * @return {Object}
   */

  guardaIndicadores: async (ctx) => {
    return strapi.services.indicador.guardaIndicadores(ctx);
  },

  /**
   * Destroy a/an indicador record.
   *
   * @return {Object}
   */

  consultaIndicadores: async (ctx) => {
    return strapi.services.indicador.consultaIndicadores(ctx);
  },

  /**
   * desactivaActivaIndicador indicador .
   *
   * @return {Object}
   */

  desactivaActivaIndicador: async (ctx) => {
    return strapi.services.indicador.desactivaActivaIndicador(ctx.params);
  },

  /**
   * consultaExisteNombre indicador .
   *
   * @return {Object}
   */

  consultaExisteNombre: async (ctx) => {
    return strapi.services.indicador.consultaExisteNombre(ctx.params);
  },

  /**
   * consultaExisteNombreGrupo configuracion bono .
   *
   * @return {Object}
   */

  consultaExisteNombreGrupo: async (ctx) => {
    return strapi.services.indicador.consultaExisteNombreGrupo(ctx.params);
  },
  /**
   * guardaIndicadores guarda los indicadores.
   *
   * @return {Object}
   */

  guardaConfiguracionBono: async (ctx) => {
    return strapi.services.indicador.guardaConfiguracionBono(ctx);
  },
  /**
   * Activar o desactivar la configuración del bono.
   *
   * @return {Number}
   */

  activarDesactivarConfiguracionBono: async (ctx) => {
    return strapi.services.indicador.activarDesactivarConfiguracionBono(ctx.params);
  },
  /**
   * Destroy a/an indicador record.
   *
   * @return {Object}
   */

  consultaEntregaIndicadores: async (ctx) => {
    return strapi.services.indicador.consultaEntregaIndicadores(ctx);
  },
  /**
   * guardaIndicadores guarda los indicadores.
   *
   * @return {Object}
   */

  guardaEntregaIndicador: async (ctx) => {
    return strapi.services.indicador.guardaEntregaIndicador(ctx);
  },
  /**
   * consulta Valores Etiquetas Entrega Indicador .
   *
   * @return {Object}
   */

  consultaValoresEtiquetas: async (ctx) => {
    return strapi.services.indicador.consultaValoresEtiquetas(ctx);
  },
  /**
   * consulta Valores Etiquetas Entrega Indicador .
   *
   * @return {Object}
   */

  consultaDepartamentoDireccionPlazaPuestoRechum: async (ctx) => {
    return strapi.services.indicador.consultaDepartamentoDireccionPlazaPuestoRechum(ctx);
  },

  





























































































  //empieza manuel
  /**
   * Obtener listado de periodos.
   *
   * @return {Number}
   */
  
  obtenerListadoPeriodos: async (ctx) => {
    return strapi.services.indicador.obtenerListadoPeriodos(ctx);
  },

  /**
   * Cerrar periodo.
   *
   * @return {Number}
   */

  cerrarPeriodo: async (ctx) => {
    return strapi.services.indicador.cerrarPeriodo(ctx);
  },
    
  /**
   * Guardar periodo.
   *
   * @return {Number}
   */

  guardarPeriodo: async (ctx) => {
    return strapi.services.indicador.guardarPeriodo(ctx);
  },

  /**
   * Editar periodo.
   *
   * @return {Number}
   */

  editarPeriodo: async (ctx) => {
    return strapi.services.indicador.editarPeriodo(ctx);
  },

  /**
   * Consultar nombre periodo.
   *
   * @return {Number}
   */

  consultarAnioPeriodo: async (ctx) => {
    return strapi.services.indicador.consultarAnioPeriodo(ctx);
  },

  /**
   * Obtener listado de combos.
   *
   * @return {Number}
   */

  obtenerCombos: async (ctx) => {
    return strapi.services.indicador.obtenerCombos(ctx);
  },

  /**
   * Obtener listado de puestos por departamento.
   *
   * @return {Number}
   */

  obtenerPuestosPorDepartamento: async (ctx) => {
    return strapi.services.indicador.obtenerPuestosPorDepartamento(ctx);
  },

  /**
   * Obtener listado de procedimientos almacenados por modulo.
   *
   * @return {Number}
   */

  obtenerDependenciasPorModulo: async (ctx) => {
    return strapi.services.indicador.obtenerDependenciasPorModulo(ctx);
  },

  /**
   * Guardar el detalle del indicador.
   *
   * @return {Number}
   */

  guardarConfiguracionIndicador: async (ctx) => {
    return strapi.services.indicador.guardarConfiguracionIndicador(ctx);
  },

  /**
   * Obtener la descripción del indicador.
   *
   * @return {Number}
   */

  obtenerDescripcionIndicador: async (ctx) => {
    return strapi.services.indicador.obtenerDescripcionIndicador(ctx);
  },

  /**
   * Obtener puesto con el total de indicadores.
   *
   * @return {Number}
   */

  obtenerPuestoTotalIndicadores: async (ctx) => {
    return strapi.services.indicador.obtenerPuestoTotalIndicadores(ctx);
  },

  /**
   * Obtener peso total de indicadores por departamento y puesto.
   *
   * @return {Number}
   */

  obtenerPesoTotalIndicadores: async (ctx) => {
    return strapi.services.indicador.obtenerPesoTotalIndicadores(ctx);
  },

  /**
   * Obtener indicadores por departamento y puesto.
   *
   * @return {Number}
   */

  obtenerIndicadoresDepartamentoPuesto: async (ctx) => {
    return strapi.services.indicador.obtenerIndicadoresDepartamentoPuesto(ctx);
  },

  /**
   * Obtener indicadores por estatus.
   *
   * @return {Number}
   */

  obtenerIndicadoresEstatus: async (ctx) => {
    return strapi.services.indicador.obtenerIndicadoresEstatus(ctx);
  },

  /**
   * Activar o desactivar la configuración del indicador.
   *
   * @return {Number}
   */

  activarDesactivarIndicador: async (ctx) => {
    return strapi.services.indicador.activarDesactivarIndicador(ctx);
  },

  /**
   * Obtener detalle del indicador.
   *
   * @return {Number}
   */

  obtenerDetalleIndicador: async (ctx) => {
    return strapi.services.indicador.obtenerDetalleIndicador(ctx);
  },

  /**
   * Obtener listado de ebitdas.
   *
   * @return {Number}
   */

  obtenerListadoEbitdas: async (ctx) => {
    return strapi.services.indicador.obtenerListadoEbitdas(ctx);
  },

  /**
   * Actualizar estatus de ebitdas.
   *
   * @return {Number}
   */

  actualizarEstatusEbitda: async (ctx) => {
    return strapi.services.indicador.actualizarEstatusEbitda(ctx);
  },

  /**
   * Consultar año de ebitdas.
   *
   * @return {Number}
   */

  consultarAnioEbitda: async (ctx) => {
    return strapi.services.indicador.consultarAnioEbitda(ctx);
  },
  

  /**
   * Guardar ebitdas.
   *
   * @return {Number}
   */

  guardarEbitda: async (ctx) => {
    return strapi.services.indicador.guardarEbitda(ctx);
  },

  /**
   * Editar ebitdas.
   *
   * @return {Number}
   */

  editarEbitda: async (ctx) => {
    return strapi.services.indicador.editarEbitda(ctx);
  },

  /**
   * Obtener jerarquias.
   *
   * @return {Number}
   */

  obtenerJerarquias: async (ctx) => {
    return strapi.services.indicador.obtenerJerarquias(ctx);
  },

  /**
   * Actualizar estatus jerarquias.
   *
   * @return {Number}
   */

  actualizarEstatusJerarquia: async (ctx) => {
    return strapi.services.indicador.actualizarEstatusJerarquia(ctx);
  },

  /**
   * Obtener estatus jerarquias.
   *
   */

  obtenerDepartamentosPuestos: async (ctx) => {
    return strapi.services.indicador.obtenerDepartamentosPuestos(ctx);
  },

  /**
   * Guardar jerarquias.
   *
   */

  guardarJerarquia: async (ctx) => {
    return strapi.services.indicador.guardarJerarquia(ctx);
  },

  /**
   * Editar jerarquias.
   *
  */

  editarJerarquias: async (ctx) => {
    return strapi.services.indicador.editarJerarquias(ctx);
  },

  /**
   * Obtener nombre jerarquia.
   *
  */

  obtenerNombreJerarquia: async (ctx) => {
    return strapi.services.indicador.obtenerNombreJerarquia(ctx);
  },

































































  //empieza javi
  /**
   * info: Consulta los resultados de los indicadores
   *       por usuario
   * desarrollador: Javier L .
   * fecha: 30/09/2019
   * @return {Object}
   */

  indicadoresPorUsuario: async(ctx) => {
    return strapi.services.indicador.indicadoresPorUsuario(ctx);
  },
  obtenerParametrosReporte: async(ctx) => {
    return strapi.services.indicador.obtenerParametrosReporte(ctx);
  },
  obtenerReporteDireccion: async(ctx) => {
    return strapi.services.indicador.obtenerReporteDireccion(ctx);
  },
  guardarResultados: async(ctx) => {
    return strapi.services.indicador.guardarResultados(ctx);
  },
  obtenerHistorialIndicador: async(ctx) => {
    return strapi.services.indicador.obtenerHistorialIndicador(ctx);
  },
  autorizarIndicador: async(ctx) => {
    return strapi.services.indicador.autorizarIndicador(ctx);
  },
  obtenerPuestoEmpleados: async(ctx) => {
    return strapi.services.indicador.obtenerPuestoEmpleados(ctx);
  },
  obtenerArchivosCambio: async(ctx) => {
    return strapi.services.indicador.obtenerArchivosCambio(ctx);
  },
  obtenerGrupos: async(ctx) =>{
    return strapi.services.indicador.obtenerGrupos(ctx);
  }
};
