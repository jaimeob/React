'use strict';

/**
 * Puestos.js controller
 *
 * @description: A set of functions called "actions" for managing `Puestos`.
 */

module.exports = {

  /**
   * Retrieve puestos records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.puestos.search(ctx.query);
    } else {
      return strapi.services.puestos.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a puestos record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.puestos.fetch(ctx.params);
  },

  /**
   * Count puestos records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.puestos.count(ctx.query);
  },

  /**
   * Create a/an puestos record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.puestos.add(ctx.request.body);
  },

  /**
   * Update a/an puestos record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.puestos.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an puestos record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.puestos.remove(ctx.params);
  },

  /**
   * Activar a/an puesto record.
   *
   * @return {Object}
   */

  activar: async (ctx, next) => {
    return strapi.services.puestos.activar(ctx.params, ctx.request.body);
  },

  /**
   * Activar a/an puestos record.
   *
   * @return {Object}
   */

  desactivar: async (ctx, next) => {
    return strapi.services.puestos.desactivar(ctx.params, ctx.request.body);
  },

  
  /**
   * Obtener a/an puestos roles record.
   *
   * @return {Object}
   */

  puestosRoles: async (ctx, next) => {
    return strapi.services.puestos.puestosRoles(ctx.query);
  },

  /**
   * Obtener a/an puestos roles archivos record.
   *
   * @return {Object}
   */

  puestosRolesArchivos: async (ctx, next) => {
    return strapi.services.puestos.puestosRolesArchivos(ctx);
  },

  /**
   * Obtener multiple puestos roles archivos record.
   *
   * @return {Object}
   */

  puestosRolesArchivosMultiple: async (ctx) => {
    return strapi.services.puestos.puestosRolesArchivosMultiple(ctx);
  },

  obtenerPuestosConRol: async(ctx) => {
    return strapi.services.puestos.obtenerPuestosConRol(ctx);
  },
  puestosRolesContarArchivos: async(ctx) => {
    return strapi.services.puestos.puestosRolesContarArchivos(ctx);
  },
};
