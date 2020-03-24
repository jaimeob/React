'use strict';
const moment = require('moment-timezone');
const _ = require('lodash');
/**
 * Configuracionformulario.js controller
 *
 * @description: A set of functions called "actions" for managing `Configuracionformulario`.
 */

const isObjectId = (val = '') =>
  /^[0-9a-fA-F]{24}$/.test(val);

const getCurrentDateTime = () => {
  const {
    locale: {
      format = '',
      timezone = '',
    },
  } = strapi.config;
  const timestamp = Date.now();
  return moment
    .tz(timestamp, timezone)
    .format(format);
};
  

module.exports = {
/**
   * @description
   * Retorna las configuraciones realizadas de formularios con un formato 
   * personalizato
   *
   * @return {Object}
   */
  obtenertodos: async (ctx) => {
    return strapi.services.configuracionformulario.obtenertodos(ctx.query);
  },
  /**
   * Retrieve configuracionformulario records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.configuracionformulario.search(ctx.query);
    } else {
      return strapi.services.configuracionformulario.fetchAll(ctx.query);
    }
  },
  /**
   * Desactiva un registro de configuraciónformulario actualizando
   * el campo activo.
   *
   * @return {Object}
   */
  deactivate: async (ctx)  => {
    try {
      if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
        return ctx.notFound('Identificador desconocido');
      }
      return strapi.services.configuracionformulario.edit(ctx.params, { 'activo': false });
      
    } catch (error) {
      return ctx.badImplementation('cfgform03');
    }
  },
  activate: async (ctx)  => {
    try {
      if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
        return ctx
          .notFound(
            'Identificador desconocido'
          );
      }
      return strapi.services.configuracionformulario.edit(ctx.params, { 'activo': true });
      
    } catch (error) {
      return ctx
        .badImplementation(
          'cfgform04'
        );
    }
  },
  publishFormulario: async (ctx) => {
    try {
      if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
        return ctx
          .notFound(
            'Identificador desconocido'
          );
      }
      // guardamos primero los valores que trae para modificar
      const savedComponents = await strapi
        .services
        .configuracionformulario
        .edit(
          ctx.params,
          ctx.request.body
        );
      // console.log('savedComponents', savedComponents)
      if (isObjectId(savedComponents.id)) {
        // console.log('publishFormulario body for publish: ', body)
        // const published = await strapi
        //   .services
        //   .configuracionformulario
        //   .edit(
        //     ctx.params, {
        //       'fechaPublicacion': getCurrentDateTime()
        //     }
        //   );
        savedComponents.fechaPublicacion = getCurrentDateTime();
        await savedComponents.save();
        if (_.isDate(savedComponents.fechaPublicacion)) {
          return strapi
            .services
            .configuracionformulario
            .crearFormulario(ctx, savedComponents);
        } else {
          return ctx
            .badImplementation(
              'No fue posible crear un formulario en RDB',
            );
        }
      }
    } catch (error) {
      return ctx
        .badImplementation(
          'crgform05',
          error,
        );
    }
  },
  
  
  /**
   * Retrieve a configuracionformulario record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.configuracionformulario.fetch(ctx.params);
  },

  /**
   * Count configuracionformulario records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.configuracionformulario.count(ctx.query);
  },
  /**
   * Create a/an configuracionformulario record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.configuracionformulario.add(ctx.request.body);
  },
  /**
   * Update a/an configuracionformulario record.
   *
   * @return {Object}
   */
  update: async (ctx, next) => {
    return strapi.services.configuracionformulario.edit(ctx.params, ctx.request.body) ;
  },
  /**
   * Destroy a/an configuracionformulario record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.configuracionformulario.remove(ctx.params);
  },
  obtenerConfiguracionFormulariosSQL: async (ctx) => {
    try {
      return strapi
        .services
        .configuracionformulario
        .obtenerConfiguracionFormulariosSQL(ctx);
    } catch (error) {
      return ctx
        .badRequest(
          'Ocurrió un error interno en obtenerConfiguracionFormulariosSQL',
          error
        );
    }
  }
};
