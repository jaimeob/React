'use strict';

/**
 * Usuario.js controller
 *
 * @description: A set of functions called "actions" for managing `Usuario`.
 */

module.exports = {

  /**
   * Retrieve usuario records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.usuario.search(ctx.query);
    } else {
      return strapi.services.usuario.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a usuario record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.usuario.fetch(ctx.params);
  },

  /**
   * Count usuario records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.usuario.count(ctx.query);
  },

  /**
   * Create a/an usuario record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.usuario.add(ctx.request.body);
  },

  /**
   * Update a/an usuario record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    return strapi.services.usuario.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an usuario record.
   *
   * @return {Object}
   */

  destroy: async (ctx) => {
    return strapi.services.usuario.remove(ctx.params);
  },

  /**
   * Activar a/an rol record.
   *
   * @return {Object}
   */

  activar: async (ctx) => {
    return strapi.services.usuario.activar(ctx.params, ctx.request.body);
  },

  /**
   * Activar a/an rol record.
   *
   * @return {Object}
   */

  desactivar: async (ctx) => {
    return strapi.services.usuario.desactivar(ctx.params, ctx.request.body);
  },

  /**
   * Obtener a/an usuarios archivos record.
   *
   * @return {Object}
   */

  usuariosArchivos: async (ctx) => {
    return strapi.services.usuario.usuariosArchivos(ctx);
  },

  /**
   * Obtener multiple usuarios archivos record.
   *
   * @return {Object}
   */

  usuariosArchivosMultiple: async (ctx) => {
    return strapi.services.usuario.usuariosArchivosMultiple(ctx);
  },

  /**
   * Login a/an user record.
   *
   * @return {Object}
  */

  login: async (ctx) => {
    return strapi.services.usuario.login(ctx.params, ctx.request.body);
  },

  /**
   * Crea registro de intento fallido de login.
   *
   * @return {Object}
  */

  intentosLogin: async (ctx) => {
    return strapi.services.usuario.intentosLogin(ctx.params, ctx.request.body);
  },

  /**
   * consultaOpcionesUsuario a/an modulo record.
   * consulta todas las opciones del sistema a las que tiene derecho el usuario
   *Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */
  consultaOpcionesUsuario: async (ctx) => {
    return strapi.services.usuario.consultaOpcionesUsuario(ctx);
  },

  /**
   * Obtener la imagen del usuario
   *
   * @return {Object}
  */

  imagen: async (ctx) => {
    return strapi.services.usuario.imagen(ctx);
  },

  /**
   * Guardar funciones favoritas del usuario
   *
   * @return {Object}
  */

  guardarFuncionesFavoritas: async (ctx) => {
    return strapi.services.usuario.guardarFuncionesFavoritas(ctx.params, ctx.request.body);
  },
  obtenerDetalleUsuario: async(ctx) => {
    return strapi.services.usuario.obtenerDetalleUsuario(ctx);
  },
  guardarUsuario: async (ctx) => {
    return strapi.services.usuario.guardarUsuario(ctx);
  },
  activarEmpresas: async (ctx) => {
    return strapi.services.usuario.activarEmpresas(ctx);
  },
  desactivarEmpresas: async (ctx) => {
    return strapi.services.usuario.desactivarEmpresas(ctx);
  },
  usuariosContarArchivos: async (ctx) => {
    return strapi.services.usuario.usuariosContarArchivos(ctx);
  },
  obtenerArchivosHistorial: async(ctx) => {
    return strapi.services.usuario.obtenerArchivosHistorial(ctx);
  },
  
  
};
