'use strict';

/**
 * Reportesformulario.js controller
 *
 * @description: A set of functions called "actions" for managing `Reportesformulario`.
 */

module.exports = {

  /**
   * Retrieve reportesformulario records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.reportesformulario.search(ctx.query);
    } else {
      return strapi.services.reportesformulario.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a reportesformulario record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.reportesformulario.fetch(ctx.params);
  },

  /**
   * Count reportesformulario records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.reportesformulario.count(ctx.query);
  },

  /**
   * Create a/an reportesformulario record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.reportesformulario.add(ctx.request.body);
  },

  /**
   * Update a/an reportesformulario record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.reportesformulario.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an reportesformulario record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.reportesformulario.remove(ctx.params);
  },

  
  /**
   * Destroy a/an reportesformulario record.
   *
   * @return {Object}
   */

  obtenerReportesEncuestas: async (ctx, next) => {
    return strapi.services.reportesformulario.obtenerReportesEncuestas(ctx);
  },

  obtenerValidacionesFormularios: async (ctx, next) => {
    return strapi.services.reportesformulario.obtenerValidacionesFormularios(ctx);
  },

  /**
   * Destroy a/an reportesformulario record.
   *
   * @return {Object}
   */

  obtenerReporteEncuesta: async (ctx, next) => {
    return strapi.services.reportesformulario.obtenerReporteEncuesta(ctx.params);
  },
};
