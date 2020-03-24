'use strict';

/**
 * Plantillaformulario.js controller
 *
 * @description: A set of functions called "actions" for managing `Plantillaformulario`.
 */

module.exports = {

  /**
   * Retrieve plantillaformulario records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.plantillaformulario.search(ctx.query);
    } else {
      return strapi.services.plantillaformulario.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a plantillaformulario record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.plantillaformulario.fetch(ctx.params);
  },

  /**
   * Count plantillaformulario records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.plantillaformulario.count(ctx.query);
  },

  /**
   * Create a/an plantillaformulario record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.plantillaformulario.add(ctx.request.body);
  },

  /**
   * Update a/an plantillaformulario record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.plantillaformulario.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an plantillaformulario record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.plantillaformulario.remove(ctx.params);
  },


  /**
   * Obtiene las plantillas de los formularios de acuerdo al estatus
   * solicitado.
   *
   * @return {Object}
   */

  ObtenerPlantillasFormularios: async (ctx) => {
    if(['A','I','T'].includes(ctx.params.estatus.toUpperCase())){
      return strapi.services.plantillaformulario.ObtenerPlantillasFormularios(ctx.params);
    } else {

      let dataError = {
        message: 'EL parametro enviado no esta permitido',
        statusCode: 400,
        error: 'Parametro Invalido'
      };
      return dataError;
    }
  },

  /**
   * Valida si el nombre de la plantilla ya existe.
   *
   * @return {Object}
   */

  ValidarNombrePlantillaFormulario: async (ctx) => {
    const totalRegistros = await strapi.services.plantillaformulario.ValidarNombrePlantillaFormulario(ctx.params);
    if (totalRegistros) {
      const message = `El nombre del formulario ya se encuentra en uso.
        Favor de capturar un nombre diferente.`;
      ctx.response.conflict(message);
    } else {
      ctx.response.status = 200;
    }

    return ctx.response;
  },

  /**
   * Actualiza el estatus de los formularios seleccionados
   * 
   * @return {Object}
   */

  actualizarEstatus: async (ctx) => {
    const response = ctx.request.body.arrayParams.map(params => {
      return strapi.services.plantillaformulario.edit(params, ctx.request.body.values);
    });

    return response;
  },

  /**
   * Obtiene las plantillas de los formularios de acuerdo al estatus
   * solicitado.
   *
   * @return {Object}
   */

  obtenerPlantillasFormDeptos: async (ctx) => {
    if(['A','I','T'].includes(ctx.params.estatus.toUpperCase())){
      return strapi.services.plantillaformulario.obtenerPlantillasFormDeptos(ctx.params);
    } else {

      let dataError = {
        message: 'EL parametro enviado no esta permitido',
        statusCode: 400,
        error: 'Parametro Invalido'
      };
      return dataError;
    }
  },
};
