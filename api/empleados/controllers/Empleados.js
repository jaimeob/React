'use strict';

/**
 * Empleados.js controller
 *
 * @description: A set of functions called "actions" for managing `Empleados`.
 */

module.exports = {

  /**
   * Retrieve empleados records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.empleados.search(ctx.query);
    } else {
      return strapi.services.empleados.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a empleados record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.empleados.fetch(ctx.params);
  },

  /**
   * Count empleados records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.empleados.count(ctx.query);
  },

  /**
   * Create a/an empleados record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.empleados.add(ctx.request.body);
  },

  /**
   * Update a/an empleados record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.empleados.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an empleados record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.empleados.remove(ctx.params);
  },
  obtenerTodosPorDepartamento: async (ctx) => {
    try {
      return strapi.services.empleados.obtenerPorDepartamento(ctx);
    } catch (error) {
      console.log(error);
      ctx.response.badRequest('Ocurrió un error interno.');
    }
  },
  obtenerEmpleadosSinUsuario: async(ctx) => {
    return strapi.services.empleados.obtenerEmpleadosSinUsuario(ctx);
  },
  obtenerEmpleadoInformacion: async(ctx) => {
    return strapi.services.empleados.obtenerEmpleadoInformacion(ctx);
  },
  
};
