'use strict';

/**
 * Proyecto.js controller
 *
 * @description: A set of functions called "actions" for managing `Proyecto`.
 */

module.exports = {

  /**
   * Retrieve proyecto records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.proyecto.search(ctx.query);
    } else {
      return strapi.services.proyecto.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a proyecto record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.proyecto.fetch(ctx.params);
  },

  /**
   * Count proyecto records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.proyecto.count(ctx.query);
  },

  /**
   * Create a/an proyecto record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.proyecto.add(ctx.request.body);
  },

  /**
   * Update a/an proyecto record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.proyecto.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an proyecto record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.proyecto.remove(ctx.params);
  }
};
