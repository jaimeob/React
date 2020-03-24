'use strict';

/**
 * Negociaciones.js controller
 *
 * @description: A set of functions called "actions" for managing `Negociaciones`.
 */

module.exports = {

  /**
   * Retrieve negociaciones records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.negociaciones.search(ctx.query);
    } else {
      return strapi.services.negociaciones.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a negociaciones record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.negociaciones.fetch(ctx.params);
  },

  count: async (ctx) => {
    return strapi.services.negociaciones.count(ctx.query);
  },

  /**
   * Create a/an negociaciones record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.negociaciones.add(ctx.request.body);
  },

  /**
   * Update a/an negociaciones record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.negociaciones.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an negociaciones record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.negociaciones.remove(ctx.params);
  },

  /**
   * Count negociaciones records.
   *
   * @return {Object}
   */

  obtenerLayoutNegociaciones: async (ctx) => {
    return strapi.services.negociaciones.obtenerLayoutNegociaciones(ctx);
  },

  /**
   * Obtiene el listado de familias.
   *
   * @return {Object}
   */

  obtenerFamilias: async (ctx) => {
    return strapi.services.negociaciones.obtenerFamilias(ctx);
  },

  /**
   * Actualiza estatus de familias.
   *
   * @return {Object}
   */

  actualizarEstatusFamilias: async (ctx) => {
    return strapi.services.negociaciones.actualizarEstatusFamilias(ctx);
  },

  /**
   * obtiene las subfamilias.
   *
   * @return {Object}
   */

  obtenerSubFamilias: async (ctx) => {
    return strapi.services.negociaciones.obtenerSubFamilias(ctx);
  },

  /**
   * graba y elimina subfamilias de las familias.
   *
   * @return {Object}
   */

  asignarsubfamilias: async (ctx) => {
    return strapi.services.negociaciones.asignarsubfamilias(ctx);
  },

  /**
   * Get negociaciones records.
   *
   * @return {Number}
   */

  obtenerDetalleInsumo: async (ctx) => {
    return strapi.services.negociaciones.obtenerDetalleInsumo(ctx);
  },

  /**
   * Get explotions records.
   *
   * @return {Number}
   */

  obtenerExplosiones: async (ctx) => {
    return strapi.services.negociaciones.obtenerExplosiones(ctx);
  },

  /**
   * Get explotions details  records.
   *
   * @return {Number}
   */

  obtenerExplosionesDetalle: async (ctx) => {
    return strapi.services.negociaciones.obtenerExplosionesDetalle(ctx);
  },

  /**
   * Get monto negociado  records.
   *
   * @return {Number}
   */

  obtenerMontoNegociado: async (ctx) => {
    return strapi.services.negociaciones.obtenerMontoNegociado(ctx);
  },

  /**
   * Post add new explotion.
   *
   * @return {Number}
   */

  agregarExplosion: async (ctx) => {
    return strapi.services.negociaciones.agregarExplosion(ctx);
  },

  /**
   * Post add new explotion.
   *
   * @return {Number}
   */

  agregarPuestoFamilia: async (ctx) => {
    return strapi.services.negociaciones.agregarPuestoFamilia(ctx);
  },

  /**
   * obtiene los anios para el procentaje de impacto.
   *
   * @return {Number}
   */

  obtenerAniosPorcentajeImpacto: async (ctx) => {
    return strapi.services.negociaciones.obtenerAniosPorcentajeImpacto(ctx);
  },

  /**
   * obtiene el porcentaje de impacto propuesto.
   *
   * @return {Number}
   */

  obtenerPorcentajeImpactoXAnio: async (ctx) => {
    return strapi.services.negociaciones.obtenerPorcentajeImpactoXAnio(ctx);
  },

  /**
   * obtiene los datos generales del procentaje de impacto.
   *
   * @return {Number}
   */

  obtenerDatosGeneralesImpacto: async (ctx) => {
    return strapi.services.negociaciones.obtenerDatosGeneralesImpacto(ctx);
  },


  /**
   * obtiene el detalle del procentaje de impacto por familia.
   *
   * @return {Number}
   */

  obtenerDetalleImpacto: async (ctx) => {
    return strapi.services.negociaciones.obtenerDetalleImpacto(ctx);
  },

  /**
   * obtiene la meta de procentaje de ahorro.
   *
   * @return {Number}
   */

  obtenerMetaPorcentajeAhorro: async (ctx) => {
    return strapi.services.negociaciones.obtenerMetaPorcentajeAhorro(ctx);
  },

  /**
   * obtiene el porcentaje de ahorro por plaza.
   *
   * @return {Number}
   */

  obtenerPorcentajeAhorroPlazas: async (ctx) => {
    return strapi.services.negociaciones.obtenerPorcentajeAhorroPlazas(ctx);
  },

  /**
   * obtiene la meta de dias promedio.
   *
   * @return {Number}
   */

  obtenerMetaDiasPromedio: async (ctx) => {
    return strapi.services.negociaciones.obtenerMetaDiasPromedio(ctx);
  },

  /**
   * obtiene los dias promedio de los empleados.
   *
   * @return {Number}
   */

  obtenerListadoDiasPromedio: async (ctx) => {
    return strapi.services.negociaciones.obtenerListadoDiasPromedio(ctx);
  },

  /**
   * obtiene porcentaje de cumplimiento.
   *
   * @return {Number}
   */

  obtenerPorcentajeCumplimiento: async (ctx) => {
    return strapi.services.negociaciones.obtenerPorcentajeCumplimiento(ctx);
  },

  /**
   * obtiene los dias promedio detalle por empleado.
   *
   * @return {Number}
   */

  obtenerDiasPromedioDetalleXEmpleado: async (ctx) => {
    return strapi.services.negociaciones.obtenerDiasPromedioDetalleXEmpleado(ctx);
  },

  /**
   * obtiene las puestos y familias.
   *
   * @return {Number}
   */

  obtenerDepartamentoPuestoFamilia: async (ctx) => {
    return strapi.services.negociaciones.obtenerDepartamentoPuestoFamilia(ctx);
  },
  guardarPuestoFamilia: async (ctx) => {
    return strapi.services.negociaciones.guardarPuestoFamilia(ctx);
  },
};
