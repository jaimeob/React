'use strict';

/**
 * Inventarios.js controller
 *
 * @description: A set of functions called "actions" for managing `Inventarios`.
 */

module.exports = {

  /**
   * Retrieve inventarios records.
   *
   * @return {Object|Array}
   */

  obtenerInventarios: async (ctx) => {
    return strapi.services.inventarios.obtenerInventarios(ctx);
  },

  /**
   * Retrieve a inventarios record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.inventarios.fetch(ctx.params);
  },

  /**
   * Count inventarios records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.inventarios.count(ctx.query);
  },

  /**
   * Create a/an inventarios record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.inventarios.add(ctx.request.body);
  },

  /**
   * Update a/an inventarios record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.inventarios.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an inventarios record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.inventarios.remove(ctx.params);
  }
};
