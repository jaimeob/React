'use strict';

/**
 * Pedidos.js controller
 *
 * @description: A set of functions called "actions" for managing `Pedidos`.
 */

module.exports = {

  /**
   * Retrieve pedidos records.
   *
   * @return {Object|Array}
   */

  obtenerPedidos: async (ctx) => {
    return strapi.services.pedidos.obtenerPedidos(ctx);
  },
  autorizarPedido: async (ctx) => {
    return strapi.services.pedidos.autorizarPedido(ctx);
  },
  obtenerEstatus: async (ctx) => {
    return strapi.services.pedidos.obtenerEstatus(ctx);
  },
  obtenerArticulos: async(ctx) => {
    return strapi.services.pedidos.obtenerArticulos(ctx);
  },
  recibirPedido: async(ctx) => {
    return strapi.services.pedidos.recibirPedido(ctx);
  },
  obtenerReporte: async(ctx) => {
    return strapi.services.pedidos.obtenerReporte(ctx);
  },
  obtenerPlazasDos: async(ctx) => {
    console.log(ctx);
    return strapi.services.pedidos.obtenerPlazasDos(ctx);
  },
  obtenerReportePedido: async(ctx) => {
    return strapi.services.pedidos.obtenerReportePedido(ctx);
  },
  /**
   * Retrieve a pedidos record.
   *
   * @return {Object}
   */

  obtenerDetalle: async (ctx) => {
    if (!ctx.params.idPedido.match(/^[0-9]+?$/)) {
      return ctx.notFound();
    }

    return strapi.services.pedidos.obtenerDetalle(ctx);
  },

  /**
   * Count pedidos records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.pedidos.count(ctx.query);
  },

  /**
   * Create a/an pedidos record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.pedidos.add(ctx);
  },

  /**
   * Update a/an pedidos record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.pedidos.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an pedidos record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.pedidos.remove(ctx.params);
  }
};
