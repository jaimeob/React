'use strict';

/**
 * Modulo.js controller
 *
 * @description: A set of functions called "actions" for managing `Modulo`.
 */

module.exports = {

  /**
   * Retrieve modulo records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.modulo.search(ctx.query);
    } else {
      return strapi.services.modulo.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a modulo record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.modulo.fetch(ctx.params);
  },

  /**
   * Count modulo records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.modulo.count(ctx.query);
  },

  /**
   * Create a/an modulo record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.modulo.add(ctx.request.body);
  },

  /**
   * Update a/an modulo record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    return strapi.services.modulo.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an modulo record.
   *
   * @return {Object}
   */

  destroy: async (ctx) => {
    return strapi.services.modulo.remove(ctx);
  },

  /**
   * Activar a/an modulo record.
   *
   * @return {Object}
   */

  activar: async (ctx) => {
    return strapi.services.modulo.activar(ctx.params, ctx.request.body);
  },

  /**
   * Activar a/an modulo record.
   *
   * @return {Object}
   */

  desactivar: async (ctx) => {
    return strapi.services.modulo.desactivar(ctx.params, ctx.request.body);
  },
  
  /**
   * Activar a/an modulo record.
   *
   * @return {Object}
   */

  consultaTipoAgrupador: async (ctx) => {
    return strapi.services.modulo.consultaTipoAgrupador(ctx) ;
  },
  /**
   * Activar a/an modulo record.
   *
   * @return {Object}
   */

  consultaUrl: async (ctx) => {
    return strapi.services.modulo.consultaUrl(ctx) ;
  },
  /**
   * Activar a/an modulo record.
   *
   * @return {Object}
   */
  cudModuloFuncion: async (ctx) => {
    return strapi.services.modulo.cudModuloFuncion(ctx);
  },
  /**
   * guardaModulo a/an modulo record.
   *Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */
  guardaModulo: async (ctx) => {
    return strapi.services.modulo.guardaModulo(ctx);
  },
  /**
   * consultaFunciones a/an modulo record.
   *Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */
  consultaFunciones: async (ctx) => {
    return strapi.services.modulo.consultaFunciones(ctx);
  },
  /**
   * consultaNombreModulo a/an modulo record.
   *Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */
  consultaNombreModulo: async (ctx) => {
    return strapi.services.modulo.consultaNombreModulo(ctx);
  },
  /**
   * desactivarFunciones a/an modulo record.
   **Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */

  desactivarFunciones: async (ctx) => {
    return strapi.services.modulo.desactivarFunciones(ctx.params, ctx.request.body) ;
  },
  /**
   * activarFunciones a/an modulo record.
   *Autor: Carlos Humberto Ochoa Perez
   *
   * @return {Object}
   */

  activarFunciones: async (ctx) => {
    return strapi.services.modulo.activarFunciones(ctx.params, ctx.request.body) ;
  },
};
