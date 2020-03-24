'use strict';

/**
 * Tipostickets.js controller
 *
 * @description: A set of functions called "actions" for managing `Tipostickets`.
 */

module.exports = {

  /**
   * Retrieve tipostickets records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.tipostickets.search(ctx.query);
    } else {
      return strapi.services.tipostickets.fetchAll(ctx);
    }
  },

  /**
   * Retrieve a tipostickets record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.tipostickets.fetch(ctx.params);
  },

  /**
   * Count tipostickets records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.tipostickets.count(ctx.query);
  },

  /**
   * Create a/an tipostickets record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.tipostickets.add(ctx.request.body);
  },

  /**
   * Update a/an tipostickets record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.tipostickets.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an tipostickets record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.tipostickets.remove(ctx.params);
  }
};
