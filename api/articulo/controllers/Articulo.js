'use strict';
/**
 * Articulo.js controller
 *
 * @description: A set of functions called "actions" for managing `Articulo`.
 */

module.exports = {

  /**
   * Retrieve articulo records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.articulo.search(ctx.query);
    } else {
      return strapi.services.articulo.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a articulo record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.articulo.fetch(ctx);
  },

  /**
   * Count articulo records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.articulo.count(ctx.query);
  },

  agrupadores: async(ctx) => {
    return strapi.services.articulo.agrupadores(ctx);
  },

  obtenerArticulosAgrupador: async(ctx) => {
    return strapi.services.articulo.obtenerArticulosAgrupador(ctx);
  },

  obtenerExistenciaArticulo: async(ctx) => {
    return strapi.services.articulo.obtenerExistenciaArticulo(ctx);
  },

  /**
   * Create a/an articulo record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.articulo.add(ctx);
  },

  eliminar: async (ctx) => {
    return strapi.services.articulo.eliminar(ctx);
  },

  actualizar: async (ctx) => {
    return strapi.services.articulo.actualizar(ctx);
  },

  /**
   * Update a/an articulo record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    return strapi.services.articulo.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an articulo record.
   *
   * @return {Object}
   */

  destroy: async (ctx) => {
    return strapi.services.articulo.remove(ctx.params);
  }
};
