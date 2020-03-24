'use strict';

/**
 * Movimientoinventario.js controller
 *
 * @description: A set of functions called "actions" for managing `Movimientoinventario`.
 */

module.exports = {

  /**
   * Retrieve movimientoinventario records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.movimientoinventario.search(ctx.query);
    } else {
      return strapi.services.movimientoinventario.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a movimientoinventario record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.movimientoinventario.fetch(ctx);
  },

  /**
   * Count movimientoinventario records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.movimientoinventario.count(ctx.query);
  },

  reportes: async(ctx) => {
    return strapi.services.movimientoinventario.reportes(ctx);
  },

  /**
   * Create a/an movimientoinventario record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.movimientoinventario.add(ctx);
  },

  /**
   * Update a/an movimientoinventario record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.movimientoinventario.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an movimientoinventario record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.movimientoinventario.remove(ctx.params);
  }
};
