'use strict';

/**
 * Componentesformulario.js controller
 *
 * @description: A set of functions called "actions" for managing `Componentesformulario`.
 */

module.exports = {

  /**
   * Retrieve componentesformulario records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.componentesformulario.search(ctx.query);
    } else {
      return strapi.services.componentesformulario.fetchAll(ctx.query);
    }
  },
  findBycfgFormulario: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound('No se encontró la configuracion de formulario');
    }
    const {
      params: {
        _id: cfgFormularioId,
      },
    } = ctx;
    return strapi.services.componentesformulario.fetchAll({
      configuracionformulario: cfgFormularioId,
    });
  },

  /**
   * Retrieve a componentesformulario record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.componentesformulario.fetch(ctx.params);
  },

  /**
   * Count componentesformulario records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.componentesformulario.count(ctx.query);
  },

  /**
   * Create a/an componentesformulario record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.componentesformulario.add(ctx.request.body);
  },

  /**
   * Update a/an componentesformulario record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.componentesformulario.edit(ctx.params, ctx.request.body);
  },

  // updateAll: async (ctx, next) => {
  //   return strapi.services.componentesformulario.editAll(ctx.params, ctx.request.body) ;
  // },

  /**
   * Destroy a/an componentesformulario record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.componentesformulario.remove(ctx.params);
  },
  destroyAll: async (ctx, next) => {
    return strapi.services.componentesformulario.removeAll(ctx.params);
  },
};
