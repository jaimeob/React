'use strict';

/**
 * General.js controller
 *
 * @description: A set of functions called "actions" for managing `General`.
 */

module.exports = {
  obtenerPlazasGeneral: async (ctx) => {
    return strapi.services.general.obtenerPlazasGeneral(ctx);
  },
  obtenerFechaHora: async (ctx) => {
    return strapi.services.general.obtenerFechaHora(ctx);
  },
  obtenerRoles: async (ctx) => {
    return strapi.services.general.obtenerRoles(ctx);
  },
  obtenerPuestos: async (ctx) => {
    return strapi.services.general.obtenerPuestos(ctx);
  },
  obtenerPuestosSinRol: async(ctx) => {
    return strapi.services.general.obtenerPuestosSinRol(ctx);
  },
  obtenerPermisos: async(ctx) => {
    return strapi.services.general.obtenerPermisos(ctx);
  },
  obtenerDepartamentoPuestos: async(ctx) => {
    return strapi.services.general.obtenerDepartamentoPuestos(ctx);
  },
  obtenerPuestoEmpleados: async(ctx) => {
    return strapi.services.general.obtenerPuestoEmpleados(ctx);
  },
  obtenerSemMesRetail: async (ctx) => {
    return strapi.services.general.obtenerSemMesRetail(ctx);
  },
  obtenerPlazasUsuario: async (ctx) => {
    return strapi.services.general.obtenerPlazasUsuario(ctx);
  }
};
