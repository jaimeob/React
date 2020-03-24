'use strict';

/**
 * Ticketsarchivos.js controller
 *
 * @description: A set of functions called "actions" for managing `Ticketsarchivos`.
 */

module.exports = {

  /**
   * Retrieve ticketsarchivos records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.ticketsarchivos.search(ctx.query);
    } else {
      return strapi.services.ticketsarchivos.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a ticketsarchivos record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.ticketsarchivos.fetch(ctx.params);
  },

  /**
   * Count ticketsarchivos records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.ticketsarchivos.count(ctx.query);
  },

  /**
   * Create a/an ticketsarchivos record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.ticketsarchivos.add(ctx.request.body);
  },

  /**
   * Update a/an ticketsarchivos record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.ticketsarchivos.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an ticketsarchivos record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.ticketsarchivos.remove(ctx.params);
  }
};
