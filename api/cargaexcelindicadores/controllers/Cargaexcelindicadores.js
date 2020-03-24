'use strict';

/**
 * Cargaexcelindicadores.js controller
 *
 * @description: A set of functions called "actions" for managing `Cargaexcelindicadores`.
 */

module.exports = {
  obtenerLayoutCargaBase: async (ctx) => {
    return strapi.services.cargaexcelindicadores.obtenerLayoutCargaBase(ctx);
  },

  GrabarCargaIndicadores: async (ctx) => {
    return strapi.services.cargaexcelindicadores.GrabarCargaIndicadores(ctx);
  },

  ObtenerListadoCargas: async (ctx) => {
    return strapi.services.cargaexcelindicadores.ObtenerListadoCargas(ctx);
  },
};
