'use strict';

/**
 * Plandetrabajo.js controller
 *
 * @description: A set of functions called "actions" for managing `Plandetrabajo`.
 */

module.exports = {

  /**
   * Retrieve plandetrabajo records.
   *
   * @return {Object|Array}
   */

  obtenerPlantilla: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerPlantilla(ctx.request.body);
  },
  obtPlantillas: async(ctx) => {
    return strapi.services.plandetrabajo.obtPlantillas(ctx);
  },
  obtenerEmpleados: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerEmpleados(ctx.request.body);
  },
  guardarProyecto: async(ctx) => {
    return strapi.services.plandetrabajo.guardarProyecto(ctx);
  },
  
  obtenerProyectos: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerProyectos(ctx);
  },
  obtenerProyectosPorFecha: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerProyectosPorFecha(ctx);
  },
  obtenerProyectosPorFechaPendientes: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerProyectosPorFechaPendientes(ctx);
  },
  obtenerEmpleadoPorId: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerEmpleadoPorId(ctx);
  },
  obtenerCatalogosPDP: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerCatalogosPDP(ctx.request.body);
  },
  obtenerEmpleadosPDP: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerEmpleadosPDP(ctx.request.body);
  },
  guardarLineaBase: async(ctx) => {
    return strapi.services.plandetrabajo.guardarLineaBase(ctx.request.body);
  },
  obtenerProyectosPendientes: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerProyectosPendientes(ctx);
  },
  obtenerAutorizador: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerAutorizador(ctx);
  },
  cambiarProyectoEstatus: async(ctx) => {
    return strapi.services.plandetrabajo.cambiarProyectoEstatus(ctx);
  },
  invitarAmigo: async(ctx) => {
    return strapi.services.plandetrabajo.invitarAmigo(ctx.request.body);
  },
  enviarLineaBase: async(ctx) => {
    return strapi.services.plandetrabajo.enviarLineaBase(ctx.request.body);
  },
  obtenerEmpleadosDepartamento: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerEmpleadosDepartamento(ctx.request.body);
  },
  guardarObservaciones: async(ctx) => {
    return strapi.services.plandetrabajo.guardarObservaciones(ctx);
  },
  obtenerObservaciones: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerObservaciones(ctx);
  },
  guardarImpactosDocumentos: async(ctx) => {
    return strapi.services.plandetrabajo.guardarImpactosDocumentos(ctx);
  },
  obtenerImpactosDocumentos: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerImpactosDocumentos(ctx);
  },
  guardarImpactosRiesgos: async(ctx) => {
    return strapi.services.plandetrabajo.guardarImpactosRiesgos(ctx);
  },
  obtenerImpactosRiesgos: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerImpactosRiesgos(ctx);
  },
  cambiarEstatusImpactos: async(ctx) => {
    return strapi.services.plandetrabajo.cambiarEstatusImpactos(ctx);
  },
  editarLineaBase: async(ctx) => {
    return strapi.services.plandetrabajo.editarLineaBase(ctx.request.body);
  },
  cancelarCopiaLineaBase: async(ctx) => {
    return strapi.services.plandetrabajo.cancelarCopiaLineaBase(ctx.request.body);
  },
  cambiarEstatusProyecto: async(ctx) => {
    return strapi.services.plandetrabajo.cambiarEstatusProyecto(ctx);
  },
  obtenerLineasBasesPorProyecto: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerLineasBasesPorProyecto(ctx);
  },
  cambiarEstatusTicket:async(ctx) => {
    return strapi.services.plandetrabajo.cambiarEstatusTicket(ctx);
  },
  cambiarEstatusImpactosDocumentos:async(ctx) => {
    return strapi.services.plandetrabajo.cambiarEstatusImpactosDocumentos(ctx);
  },
  cambiarEstatusImpactosRiesgos:async(ctx) => {
    return strapi.services.plandetrabajo.cambiarEstatusImpactosRiesgos(ctx);
  },
  obtenerTicket: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerTicket(ctx);
  },
  obtenerTicketsCancelacion: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerTicketsCancelacion(ctx);
  },
  obtenerJefeId: async(ctx) => {
    return strapi.services.plandetrabajo.obtenerJefeId(ctx);
  },
  
};
// obtenerProyectosPendientes: async(ctx) => {
//   return strapi.services.plandetrabajo.obtenerProyectosPendientes(ctx);
// },