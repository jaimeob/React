'use strict';

/**
 * Prestamo.js controller
 *
 * @description: A set of functions called "actions" for managing `Prestamo`.
 */

module.exports = {

  /**
   * Retrieve prestamo records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.prestamo.search(ctx.query);
    } else {
      return strapi.services.prestamo.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a prestamo record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.prestamo.fetch(ctx.params);
  },

  /**
   * Count prestamo records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.prestamo.count(ctx.query);
  },

  insumos: async (ctx) => {
    return strapi.services.prestamo.insumos(ctx);
  },

  prestamoDetalle: async (ctx) => {
    return strapi.services.prestamo.prestamoDetalle(ctx);
  },

  devolver: async (ctx) => {
    return strapi.services.prestamo.devolver(ctx);
  },

  /**
   * Create a/an prestamo record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.prestamo.add(ctx);
  },

  existenciaPrestamos: async (ctx) => {
    return strapi.services.prestamo.existenciaPrestamos(ctx);
  },
  

  /**
   * Update a/an prestamo record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.prestamo.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an prestamo record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.prestamo.remove(ctx.params);
  }
};
