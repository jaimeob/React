'use strict';

/**
 * Formularioasignado.js controller
 *
 * @description: A set of functions called "actions" for managing `Formularioasignado`.
 */

module.exports = {

  /**
   * Retrieve formularioasignado records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.formularioasignado.search(ctx.query);
    } else {
      return strapi.services.formularioasignado.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a formularioasignado record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.formularioasignado.fetch(ctx.params);
  },

  /**
   * Count formularioasignado records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.formularioasignado.count(ctx.query);
  },

  /**
   * Create a/an formularioasignado record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.formularioasignado.add(ctx.request.body);
  },

  /**
   * Update a/an formularioasignado record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.formularioasignado.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an formularioasignado record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.formularioasignado.remove(ctx.params);
  },
  /* CUSTOM METHODS */
  obtenerFormulariosConEstatus: async (ctx) => {
    try {
      return strapi.services.formularioasignado.obtenerFormulariosEstatus(ctx);
    } catch (error) {
      return ctx.badRequest('Ocurrió un error interno');
    }
  },
  asignarEstatusFormularios: async (ctx) => {
    try {
      const tiposEstatus = [
        'asignado',
        'proceso',
        'finalizado'
      ];
      const {
        params: {
          estatus = '',
        },
        request: {
          body,
        }
      } = ctx;
      if (!tiposEstatus.includes(estatus)) {
        return ctx
          .badData(
            'El estatus proporcionado no es válido',
          );
      }
      
      return strapi
        .services
        .formularioasignado
        .asignarEstatusFormularios(body, estatus, ctx);
    } catch (error) {
      console.log('catch asignarEstatusFormularios', error);
      return ctx
        .badRequest(
          'Ocurrió un error interno en asignarFormularios',
          error
        );
    }
  },
  listarPorEmpleado: async (ctx) => {
    try {
      return strapi.services.formularioasignado.listarFormularioPorEmpleado(ctx);
    } catch (error) {
      console.log('error in listarPorEmpleado', error);
      return ctx.badRequest('Ocurrió un error interno', error)
    }
  },
  actualizarComponentesFormularios: async (ctx) => {
    try {
      return strapi
        .services
        .formularioasignado
        .actualizarComponentesFormularios(ctx);
    } catch (error) {
      return ctx
        .badRequest(
          'Ocurrió un error inesperado en [actualizarComponentesFormularios]'
          ,error
        );
    }
  }
};
