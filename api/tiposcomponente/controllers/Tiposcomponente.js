'use strict';

/**
 * Tiposcomponente.js controller
 *
 * @description: A set of functions called "actions" for managing `Tiposcomponente`.
 */

module.exports = {

  /**
   * Retrieve tiposcomponente records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.tiposcomponente.search(ctx.query);
    } else {
      return strapi.services.tiposcomponente.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a tiposcomponente record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.tiposcomponente.fetch(ctx.params);
  },

  /**
   * Count tiposcomponente records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.tiposcomponente.count(ctx.query);
  },

  /**
   * Create a/an tiposcomponente record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.tiposcomponente.add(ctx.request.body);
  },

  /**
   * Update a/an tiposcomponente record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.tiposcomponente.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an tiposcomponente record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.tiposcomponente.remove(ctx.params);
  }
};
