'use strict';

/**
 * Transformacion.js controller
 *
 * @description: A set of functions called "actions" for managing `Transformacion`.
 */

module.exports = {

  /**
   * Retrieve transformacion records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.transformacion.search(ctx.query);
    } else {
      return strapi.services.transformacion.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a transformacion record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.transformacion.fetch(ctx);
  },

  movimientosTransformaciones: async (ctx) => {
    return strapi.services.transformacion.movimientosTransformaciones(ctx);
  },

  /**
   * Count transformacion records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.transformacion.count(ctx.query);
  },

  /**
   * Create a/an transformacion record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.transformacion.add(ctx);
  },

  devolverTransformacion: async (ctx) => {
    return strapi.services.transformacion.devolverTransformacion(ctx);
  },

  movimientoTransformacion: async (ctx) => {
    return strapi.services.transformacion.movimientoTransformacion(ctx);
  },

  moldesDestino: async (ctx) => {
    return strapi.services.transformacion.moldesDestino(ctx);
  },
  
  insumos: async (ctx) => {
    return strapi.services.transformacion.insumos(ctx);
  },

  movimientoDetalle: async (ctx) => {
    return strapi.services.transformacion.movimientoDetalle(ctx);
  },

  moldes: async (ctx) => {
    return strapi.services.transformacion.moldes(ctx);
  },

  secciones: async (ctx) => {
    return strapi.services.transformacion.secciones(ctx);
  },

  piezas: async (ctx) => {
    return strapi.services.transformacion.piezas(ctx);
  },

  eliminar: async (ctx) => {
    return strapi.services.transformacion.eliminar(ctx);
  },

  /**
   * Update a/an transformacion record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    return strapi.services.transformacion.edit(ctx) ;
  },

  /**
   * Destroy a/an transformacion record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.transformacion.remove(ctx.params);
  }
};
