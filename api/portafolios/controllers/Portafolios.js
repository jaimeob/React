'use strict';

/**
 * portafolios.js controller
 *
 * @description: A set of functions called "actions" for managing `Portafolios`.
 */

module.exports = {

  /**
   * Retrieve portafolios records.
   *
   * @return {Object|Array}
   */

  obtenerPortafolios: async(ctx) => {
    return strapi.services.portafolios.obtenerPortafolios(ctx);
  },

  obtenerReportePedido: async(ctx) => {
    return strapi.services.portafolios.obtenerReportePedido(ctx);
  },
  /**
   * Retrieve a portafolios record.
   *
   * @return {Object}
   */

  obtenerDetalle: async (ctx) => {
    if (!ctx.params.idPedido.match(/^[0-9]+?$/)) {
      return ctx.notFound();
    }

    return strapi.services.portafolios.obtenerDetalle(ctx);
  },

  /**
   * Count portafolios records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.portafolios.count(ctx.query);
  },

  /**
   * Create a/an portafolios record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.portafolios.add(ctx);
  },

  /**
   * Update a/an portafolios record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.portafolios.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an portafolios record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.portafolios.remove(ctx.params);
  }
};
