'use strict';

/**
 * Movimientoalmacen.js controller
 *
 * @description: A set of functions called "actions" for managing `Movimientoalmacen`.
 */

module.exports = {

  /**
   * Retrieve movimientoalmacen records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.movimientoalmacen.search(ctx.query);
    } else {
      return strapi.services.movimientoalmacen.fetchAll(ctx.query);
    }
  },


  ubicaciones: async (ctx) => {  
    return strapi.services.movimientoalmacen.ubicaciones(ctx);
  },
  moldes: async (ctx) => {  
    return strapi.services.movimientoalmacen.moldes(ctx);
  },

  obtenerMovimientos: async (ctx) => {  
    return strapi.services.movimientoalmacen.obtenerMovimientos(ctx);
  },

  insumos: async (ctx) => {  
    return strapi.services.movimientoalmacen.insumos(ctx);
  },

  /**
   * Retrieve a movimientoalmacen record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.movimientoalmacen.fetch(ctx);
  },

  /**
   * Count movimientoalmacen records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.movimientoalmacen.count(ctx.query);
  },

  /**
   * Create a/an movimientoalmacen record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.movimientoalmacen.add(ctx);
  },
  
  plazasUsuario: async (ctx) => {
    return strapi.services.movimientoalmacen.plazasUsuario(ctx);
  },

  almacenesUsuario: async (ctx) => {
    return strapi.services.movimientoalmacen.almacenesUsuario(ctx);
  },

  /**
   * Update a/an movimientoalmacen record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.movimientoalmacen.edit(ctx.params, ctx.request.body) ;
  },

  eliminar: async (ctx) => {
    return strapi.services.movimientoalmacen.eliminar(ctx);
  },

  /**
   * Destroy a/an movimientoalmacen record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.movimientoalmacen.remove(ctx.params);
  }
};
