'use strict';

/**
 * Rol.js controller
 *
 * @description: A set of functions called "actions" for managing `Rol`.
 */

module.exports = {

  /**
   * Retrieve rol records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.rol.search(ctx.query);
    } else {
      return strapi.services.rol.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a rol record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.rol.fetch(ctx.params);
  },

  /**
   * Count rol records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.rol.count(ctx.query);
  },

  /**
   * Create a/an rol record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.rol.add(ctx.request.body);
  },

  /**
   * Update a/an rol record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    return strapi.services.rol.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an rol record.
   *
   * @return {Object}
   */

  destroy: async (ctx) => {
    return strapi.services.rol.remove(ctx.params);
  },

  /**
  * Activar a/an rol record.
  *
  * @return {Object}
  */
  activar: async (ctx) => {
    return strapi.services.rol.activar(ctx.params, ctx.request.body) ;
  },
  /**
   * consultaModulos a/an rol record.
   * fecha:2019-06-27
   *Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */
  consultaModulos: async (ctx) => {
    return strapi.services.rol.consultaModulos(ctx);
  },
  /**
   * consultaEmpresas a/an rol record.
   * fecha:2019-06-27
   *Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */
  consultaEmpresas: async (ctx) => {
    return strapi.services.rol.consultaEmpresas(ctx);
  },
  
  /**
   * Activar a/an rol record.
   *
   * @return {Object}
   */

  desactivar: async (ctx) => {
    return strapi.services.rol.desactivar(ctx.params, ctx.request.body) ;
  },
  /**
   * consultaNombreRol a/an rol record.
   *Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */
  consultaNombreRol: async (ctx) => {
    return strapi.services.rol.consultaNombreRol(ctx);
  },
  /**
   * consultaPermisosFunciones a/an rol record.
   *Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */
  consultaPermisosFunciones: async (ctx) => {
    return strapi.services.rol.consultaPermisosFunciones(ctx);
  },
  /**
   * consultaRoles a/an rol record.
   *Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */
  consultaRoles: async (ctx) => {
    return strapi.services.rol.consultaRoles(ctx);
  },
  /**
   * guardarRol a/an rol record.
   *Autor: Carlos Humberto Ochoa Perez
   * @return {Object}
   */
  guardarRol: async (ctx) => {
    return strapi.services.rol.guardarRol(ctx);
  },

  /**
   * desactivarEmpresas a/an modulo record.
   **Autor: Manuel Alejandro Verdugo Pérez
   * @return {Object}
   */

  desactivarEmpresas: async (ctx) => {
    return strapi.services.rol.desactivarEmpresas(ctx.params, ctx.request.body) ;
  },

  /**
   * desactivarEmpresas a/an modulo record.
   **Autor: Manuel Alejandro Verdugo Pérez
   * @return {Object}
   */

  activarEmpresas: async (ctx) => {
    return strapi.services.rol.activarEmpresas(ctx.params, ctx.request.body) ;
  },
  obtenerModulosPorEmpresa: async (ctx) => {
    return strapi.services.rol.obtenerModulosPorEmpresa(ctx);
  },
  generarFormatoPDF: async(ctx) => {
    return strapi.services.rol.generarFormatoPDF(ctx);
  },
  guardarPuestoRol: async(ctx) => {
    return strapi.services.rol.guardarPuestoRol(ctx);
  },
  obtenerConfiguracion: async(ctx) => {
    return strapi.services.rol.obtenerConfiguracion(ctx);
  },
  obtenerRolesAdicionales: async(ctx) => {
    return strapi.services.rol.obtenerRolesAdicionales(ctx);
  },
  obtenerEmpresasRol: async(ctx) => {
    return strapi.services.rol.obtenerEmpresasRol(ctx);
  },
  obtenerModulosPorPuesto: async(ctx) => {
    return strapi.services.rol.obtenerModulosPorPuesto(ctx);
  },
};
