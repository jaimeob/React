
'use strict';

/**
 * Plantillatickets.js controller
 *
 * @description: A set of functions called "actions" for managing `Plantillatickets`.
 */

module.exports = {

  /**
   * Retrieve plantillatickets records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.plantillatickets.search(ctx.query);
    } else {
      return strapi.services.plantillatickets.fetchAll(ctx);
    }
  },

  /**
   * Retrieve a plantillatickets record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
   
    
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.plantillatickets.fetch(ctx.params);
  },

  /**
   * Count plantillatickets records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.plantillatickets.count(ctx.query);
  },

  /**
   * Create a/an plantillatickets record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.plantillatickets.add(ctx);
  },

  enviar: async (ctx) => {
    return strapi.services.plantillatickets.enviar(ctx.request.body);
  },

  /**
   * Update a/an plantillatickets record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.plantillatickets.edit(ctx) ;
  },

  /**
   * Destroy a/an plantillatickets record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.plantillatickets.remove(ctx.params, ctx.request.body);
  },

  /**
   * Promise para eliminar varias plantillatickets
   * 
   */
  eliminarPlantillaTickets: async(ctx) => {
    return strapi.services.plantillatickets.eliminarPlantillaTickets(ctx);
  },
  obtenerEtapas: async(ctx) => {
    return strapi.services.plantillatickets.obtenerEtapas(ctx);
  },
  obtenerPlazas: async(ctx) => {
    return strapi.services.plantillatickets.obtenerPlazas(ctx);
  },
  eliminarEtapa: async(ctx) => {
    return strapi.services.plantillatickets.eliminarEtapa(ctx);
  },
  eliminarPlaza: async(ctx) => {
    return strapi.services.plantillatickets.eliminarPlaza(ctx);
  },
  obtenerEtapa: async(ctx) => {
    return strapi.services.plantillatickets.obtenerEtapa(ctx);
  },
  obtenerNumeroDePuestos: async(ctx) => {
    return strapi.services.plantillatickets.obtenerNumeroDePuestos(ctx);
  },
  verPlantilla: async(ctx) => {
    return strapi.services.plantillatickets.verPlantilla(ctx);
  },
  cambiarEstatusEtapasPlantillas:async(ctx) => {
    return strapi.services.plantillatickets.cambiarEstatusEtapasPlantillas(ctx);
  },


};
