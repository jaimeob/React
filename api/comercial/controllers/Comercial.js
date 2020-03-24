'use strict';

/**
 * Comercial.js controller
 *
 * @description: A set of functions called "actions" for managing `Comercial`.
 */

module.exports = {

  /**
   * Retrieve comercial records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.comercial.search(ctx.query);
    } else {
      return strapi.services.comercial.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a comercial record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.comercial.fetch(ctx.params);
  },

  /**
   * Count comercial records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.comercial.count(ctx.query);
  },

  /**
   * Create a/an comercial record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.comercial.add(ctx.request.body);
  },

  /**
   * Update a/an comercial record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.comercial.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an comercial record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.comercial.remove(ctx.params);
  }
};
