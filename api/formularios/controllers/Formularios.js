'use strict';

/**
 * Formularios.js controller
 *
 * @description: A set of functions called "actions" for managing `Formularios`.
 */

module.exports = {

  /**
   * Retrieve formularios records.
   *
   * @return {Object|Array}
   */

  obtenerTiposPreguntas: async (ctx) => {
    return strapi.services.formularios.obtenerTiposPreguntas(ctx);
  },

  validarFormulario: async (ctx) => {
    return strapi.services.formularios.validarFormulario(ctx);
  },

  obtenerEstatusFormulario: async (ctx) => {
    return strapi.services.formularios.obtenerEstatusFormulario(ctx);
  },

  // findOne: async (ctx) => {
  //   return strapi.services.formularios.fetch(ctx);
  // }, 

  detalleAsignacion: async (ctx) => {
    return strapi.services.formularios.detalleAsignacion(ctx);
  },  

  asignaciones: async (ctx) => {
    return strapi.services.formularios.asignaciones(ctx);
  },
  
  guardarConfiguracionFormulario: async (ctx) => {
    return strapi.services.formularios.guardarConfiguracionFormulario(ctx);
  },
  guardarRespuestasFormulario: async (ctx) => {
    return strapi.services.formularios.guardarRespuestasFormulario(ctx);
  },
  
  eliminarFormulario: async (ctx) => {
    return strapi.services.formularios.eliminarFormulario(ctx);
  },
  
  createAsignacion: async (ctx) => {
    return strapi.services.formularios.createAsignacion(ctx);
  },

  updateAsignacion: async (ctx) => {
    return strapi.services.formularios.updateAsignacion(ctx);
  },
  obtenerFormulariosTipo: async (ctx) => {
    return strapi.services.formularios.obtenerFormulariosTipo(ctx);
  },
  obtenerDetalleFormulario: async (ctx) => {
    return strapi.services.formularios.obtenerDetalleFormulario(ctx);
  },
  obtenerPreguntasFormulario: async (ctx) => {
    return strapi.services.formularios.obtenerPreguntasFormulario(ctx);
  },
  obtenerUsuariosEvaluar: async (ctx) => {
    return strapi.services.formularios.obtenerUsuariosEvaluar(ctx);
  },
  
  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.formularios.search(ctx);
    } else {
      return strapi.services.formularios.fetchAll(ctx);
    }
  }
};
