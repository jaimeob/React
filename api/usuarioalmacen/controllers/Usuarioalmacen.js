'use strict';

/**
 * Usuarioalmacen.js controller
 *
 * @description: A set of functions called "actions" for managing `Usuarioalmacen`.
 */

module.exports = {

  /**
   * Retrieve usuarioalmacen records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.usuarioalmacen.search(ctx.query);
    } else {
      return strapi.services.usuarioalmacen.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a usuarioalmacen record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.usuarioalmacen.fetch(ctx.params);
  },

  /**
   * Count usuarioalmacen records.
   *
   * @return {Number}
   */

  almacenes: async (ctx) => {
    return strapi.services.usuarioalmacen.almacenes(ctx);
  },

  count: async (ctx) => {
    return strapi.services.usuarioalmacen.count(ctx.query);
  },

  /**
   * Create a/an usuarioalmacen record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.usuarioalmacen.add(ctx);
  },

  usuarioAlmacen: async (ctx) => {
    return strapi.services.usuarioalmacen.usuarioAlmacen(ctx);
  },

  almacenPlaza: async (ctx) => {
    return strapi.services.usuarioalmacen.almacenPlaza(ctx);
  },

  usuarioAlmacenes: async (ctx) => {
    return strapi.services.usuarioalmacen.usuarioAlmacenes(ctx);
  },

  /**
   * Update a/an usuarioalmacen record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.usuarioalmacen.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an usuarioalmacen record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.usuarioalmacen.remove(ctx.params);
  }
};
