'use strict';

/**
 * Catcomponentepf.js controller
 *
 * @description: A set of functions called "actions" for managing `Catcomponentepf`.
 */

module.exports = {

  /**
   * Retrieve catcomponentepf records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.catcomponentepf.search(ctx.query);
    } else {
      return strapi.services.catcomponentepf.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a catcomponentepf record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.catcomponentepf.fetch(ctx.params);
  },

  /**
   * Count catcomponentepf records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.catcomponentepf.count(ctx.query);
  },

  /**
   * Create a/an catcomponentepf record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.catcomponentepf.add(ctx.request.body);
  },

  /**
   * Update a/an catcomponentepf record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.catcomponentepf.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an catcomponentepf record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.catcomponentepf.remove(ctx.params);
  }
};
