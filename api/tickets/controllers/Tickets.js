'use strict';

/**
 * Tickets.js controller
 *
 * @description: A set of functions called "actions" for managing `Tickets`.
 */

module.exports = {

  /**
   * Retrieve tickets records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      console.log('hola mundo');
      return strapi.services.tickets.search(ctx.query);
    } else {
      return strapi.services.tickets.fetchAll(ctx);
    }
  },

  /**
   * Retrieve a tickets record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9]{1}$/)) {
      return ctx.notFound();
    }
    return strapi.services.tickets.fetch(ctx);
  },

  /**
   * Count tickets records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.tickets.count(ctx.query);
  },

  /**
   * Create a/an tickets record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.tickets.add(ctx.request.body);
  },

  /**
   * Update a/an tickets record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.tickets.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an tickets record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.tickets.remove(ctx.params);
  },

  obtenerComentarios: async (ctx,next) => {
    return strapi.services.tickets.obtenerComentarios(ctx.params);
  },
  
  obtenerTicketEspecifico: async (ctx) => {
    return strapi.services.tickets.obtenerTicketEspecifico(ctx.params);
  },

  insertarComentarios: async (ctx) => {
    return strapi.services.tickets.insertarComentarios(ctx);
  },
  obtenerDifusiones: async (ctx) => {
    return strapi.services.tickets.obtenerDifusiones(ctx);
  },

  insertarDifusiones: async (ctx) => {
    return strapi.services.tickets.insertarDifusiones(ctx);
  },
  send: async (ctx) => {
    return strapi.services.tickets.send(ctx);
  },

  cambiarEstatus: async (ctx) => {
    return strapi.services.tickets.cambiarEstatus(ctx);
  },
  obtenerPlazasUsuario: async (ctx) => {
    return strapi.services.tickets.obtenerPlazasUsuario(ctx);
  },
  autorizarTicket: async (ctx) => {
    return strapi.services.tickets.autorizarTicket(ctx);
  },
  obtenerEmpleados: async(ctx) => {
    return strapi.services.tickets.obtenerEmpleados(ctx);
  },
  obtenerImagenUrl: async(ctx) => {
    return strapi.services.tickets.obtenerImagenUrl(ctx);
  },
  
  obtenerPrioridades: async(ctx) => {
    return strapi.services.tickets.obtenerPrioridades(ctx);
  },

  asignarUsuario: async(ctx) => {
    return strapi.services.tickets.asignarUsuario(ctx);
  },

  obtenerTicketsPorDepartamento: async(ctx) => {
    return strapi.services.tickets.obtenerTicketsPorDepartamento(ctx);
  },
  
  obtenerTicket: async(ctx) => {
    return strapi.services.tickets.obtenerTicket(ctx);
  },

  obtenerTicketsPorEmpleado: async(ctx) => {
    return strapi.services.tickets.obtenerTicketsPorEmpleado(ctx);
  },
  
  
  cambiarEstatusDifusion: async(ctx) => {
    return strapi.services.tickets.cambiarEstatusDifusion(ctx);
  },
  cambiarEstatusNotificaciones: async(ctx) => {
    return strapi.services.tickets.cambiarEstatusDifusion(ctx);
  },
  datosIndicadoresDesempenioOCKyOE: async(ctx) => {
    return strapi.services.tickets.datosIndicadoresDesempenioOCKyOE(ctx);
  },
  datosGraficaDesempenioPuesto: async(ctx) => {
    return strapi.services.tickets.datosGraficaDesempenioPuesto(ctx);
  },
  datosGraficaDesempenioProceso: async(ctx) => {
    return strapi.services.tickets.datosGraficaDesempenioProceso(ctx);
  },
  datosCombosIndicadores: async(ctx) => {
    return strapi.services.tickets.datosCombosIndicadores(ctx);
  },
  obtenerDifusionSeleccionada: async(ctx) => {
    return strapi.services.tickets.obtenerDifusionSeleccionada(ctx);
  },
  obtenerCatalogos: async(ctx) => {
    return strapi.services.tickets.obtenerCatalogos(ctx);
  },
  obtenerItemsCatalogos: async(ctx) => {
    return strapi.services.tickets.obtenerItemsCatalogos(ctx);
  },
  obtenerItemsCatalogos2: async(ctx) => {
    return strapi.services.tickets.obtenerItemsCatalogos2(ctx);
  },
  obtenerRelacion: async(ctx) => {
    return strapi.services.tickets.obtenerRelacion(ctx);
  },
  estatusEnviar: async(ctx) => {
    return strapi.services.tickets.estatusEnviar(ctx);
  },
  obtenerPlazas: async(ctx) => {
    return strapi.services.tickets.obtenerPlazas(ctx);
  },
  obtenerRoles: async(ctx) => {
    return strapi.services.tickets.obtenerRoles(ctx);
  },
  obtenerUsuariosPlaza: async(ctx) => {
    return strapi.services.tickets.obtenerUsuariosPlaza(ctx);
  },
  obtenerTodasPlazas: async(ctx) => {
    return strapi.services.tickets.obtenerTodasPlazas(ctx);
  },
  obtenerNotificaciones: async(ctx) => {
    return strapi.services.tickets.obtenerNotificaciones(ctx);
  },
  obtenerFecha: async(ctx) => {
    return strapi.services.tickets.obtenerFecha(ctx);
  },
  obtenerEtapa: async(ctx) => {
    return strapi.services.tickets.obtenerEtapa(ctx);
  },
  guardarEtapa: async(ctx) => {
    return strapi.services.tickets.guardarEtapa(ctx);
  },
  obtenerEstatusTicketsEtapas: async(ctx) => {
    return strapi.services.tickets.obtenerEstatusTicketsEtapas(ctx);
  },
 
};
