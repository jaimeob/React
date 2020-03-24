'use strict';

/**
 * Checadorpersonalvigilancia.js controller
 *
 * @description: A set of functions called "actions" for managing `Checadorpersonalvigilancia`.
 */

module.exports = {

  ObtenerAnioNecesidad: async (ctx) => {
    return strapi.services.checadorpersonalvigilancia.ObtenerAnioNecesidad(ctx);
  },

  /**
   * Obtiene las necesidades.
   *
   * @return {Object}
   */

  ObtenerListadoNecesidad: async (ctx) => {
    return strapi.services.checadorpersonalvigilancia.ObtenerListadoNecesidad(ctx);
  },

  /**
   * Obtiene las necesidades.
   *
   * @return {Object}
   */

  ObtenerEmpresasNecesidad: async (ctx) => {
    return strapi.services.checadorpersonalvigilancia.ObtenerEmpresasNecesidad(ctx);
  },

  /**
   * Registra las necesidades.
   *
   * @return {Object}
   */

  RegistrarNecesidad: async (ctx) => {
    return strapi.services.checadorpersonalvigilancia.RegistrarNecesidad(ctx);
  },

  /**
   * Obtiene las Plazas.
   *
   * @return {Object}
   */

  ObtenerPlazas: async (ctx) => {
    return strapi.services.checadorpersonalvigilancia.ObtenerPlazas(ctx);
  },

  /**
   * Obtiene las semenas de inasistencias.
   *
   * @return {Object}
   */

  ObtenerSemanasCapturaInasistencia: async (ctx) => {
    return strapi.services.checadorpersonalvigilancia.ObtenerSemanasCapturaInasistencia(ctx);
  },

  /**
   * Guarda las inasistencias capturadas.
   *
   * @return {Object}
   */

  GrabarCapturaInasistencia: async (ctx) => {
    return strapi.services.checadorpersonalvigilancia.GrabarCapturaInasistencia(ctx);
  },

  /**
   * Obtiene el reporte de asistenacias.
   *
   * @return {Object}
   */

  ObtenerReporteAsistencias: async (ctx) => {
    return strapi.services.checadorpersonalvigilancia.ObtenerReporteAsistencias(ctx);
  }
};
