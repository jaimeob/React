'use strict';

/**
 * Departamentos.js controller
 *
 * @description: A set of functions called "actions" for managing `Departamentos`.
 */

module.exports = {

  /**
   * Retrieve departamentos records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.departamentos.search(ctx.query);
    } else {
      return strapi.services.departamentos.fetchAll(ctx);
    }
  },
  
  rdFind: async () => {
    return strapi.services.departamentos.obtenerSqlDepartamentoEmpleados();
  },

  /**
   * Retorna los departamentos que cuentan con formularios.
   *
   * @return {Object|Array}
   */

  obtenerDepartamentoPlantillasFormularios: async (ctx) => {
    // if (!ctx.params._id.match(/^[0-9]$/)) {
    //   return ctx.notFound();
    // }
    try {
      return strapi.services.departamentos.obtenerDepartamentoPlantillasFormularios(ctx); 
    } catch (error) {
      console.log('obtenerDepartamentoPlantillasFormularios error', error);
      return ctx.badRequest('Ocurrió un error inesperado', error);
    }
  },

  /**
   * Retrieve a departamentos record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.departamentos.fetch(ctx.params);
  },
  /**
   * 
   */
  obtenerDepartamentos: async(ctx) => {
    return strapi.services.departamentos.obtenerDepartamentos(ctx);
  },

  //Este trae todos los departamentos sin filtrar
  obtenerTodosDepartamentos: async(ctx) => {
    return strapi.services.departamentos.obtenerTodosDepartamentos(ctx);
  },

  /**
   * Retorna listado de los usuarios por id departamento enviado
   * 
   * @return {Object}
   */

  obtenerUsuariosDepartamento: async(ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }
    return strapi.services.departamentos.obtenerUsuariosDepartamento(ctx);
  },

  /**
   * Retorna listado de los empleados que han tenido formularios
   * por id departamento enviado
   * 
   * @return {Object}
   */

  obtenerUsuariosEnviadosDepartamentoSQL: async(ctx) => {
    // if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
    //   return ctx.notFound();
    // }
    return strapi.services.departamentos.obtenerUsuariosEnviadosDepartamentoSQL(ctx);
  },

  /**
   * Retorna listado de los empleados por id departamento enviado
   * 
   * @return {Object}
   */

  obtenerDepartamentoEmpleados: async(ctx) => {
    if (!ctx.params._id.match(/^[0-9]*$/)) {
      return ctx.notFound();
    }
    return strapi.services.departamentos.obtenerDepartamentoEmpleados(ctx);
  },
  /**
   * Retorn listado de las plantillas por id departamento enviado
   * 
   * @return {Object}
   */
  obtenerDepartamentoPlantillas: async(ctx) => {
    if (!ctx.params._id.match(/^[0-9]*$/)) {
      return ctx.notFound();
    }
    return strapi.services.departamentos.obtenerDepartamentoPlantillas(ctx);
  },

  /**
   * Count departamentos records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.departamentos.count(ctx.query);
  },

  /**
   * Create a/an departamentos record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.departamentos.add(ctx.request.body);
  },

  /**
   * Update a/an departamentos record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.departamentos.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an departamentos record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.departamentos.remove(ctx.params);
  },


  /**
   * Retorna las platillas de formularios que contiene el departamento.
   *
   * @return {Object}
   */

  obtenerPlantillasFormulariosDepto: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }
    return strapi.services.departamentos.obtenerPlantillasFormulariosDepto(ctx.params);
  },

  /**
   * Retorna los formularios que ya se asignaron.
   *
   * @return {Object}
   */

  obtenerFormulariosAsignados: async (ctx) => {
    return strapi.services.departamentos.obtenerFormulariosAsignados(ctx);
  },
  obtenerFormulariosEstatus: async (ctx) => {
    try {
      return strapi.services.departamentos.obtenerFormulariosEstatus(ctx);
    } catch (error) {
      return ctx.badRequest('Ocurrió un error interno');
    }
  },

  obtenerconformularios: async (ctx) => {
    try {
      return strapi.services.departamentos.obtenerconformularios(ctx.params, ctx.response);
    } catch (error) {
      console.log(error);
      ctx.response.badRequest('Ocurrió un error interno.');
    }
  },
};
