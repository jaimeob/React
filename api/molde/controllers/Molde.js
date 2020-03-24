'use strict';

/**
 * Molde.js controller
 *
 * @description: A set of functions called "actions" for managing `Molde`.
 */

module.exports = {

  /**
   * Retrieve molde records.
   *
   * @return {Object|Array}
   */

  obtenerCombos: async(ctx) => {
    return strapi.services.molde.obtenerCombos(ctx);
  },
  obtenerCombosReportes: async(ctx) => {
    return strapi.services.molde.obtenerCombosReportes(ctx);
  },
  obtenerMoldes: async(ctx) => {
    return strapi.services.molde.obtenerMoldes(ctx);
  },
  obtenerPlazas: async(ctx) => {
    return strapi.services.molde.obtenerPlazas(ctx);
  },
  obtenerTiposMovimientos: async(ctx) => {
    return strapi.services.molde.obtenerTiposMovimientos(ctx);
  },
  eliminarMolde: async(ctx) => {
    return strapi.services.molde.eliminarMolde(ctx);
  },
  guardarConfiguracionMolde: async(ctx) => {
    return strapi.services.molde.guardarConfiguracionMolde(ctx);
  },
  guardarArchivosDocumentacion: async(ctx) => {
    return strapi.services.molde.guardarArchivosDocumentacion(ctx);
  },
  eliminarArchivosDocumentacion: async(ctx) => {
    return strapi.services.molde.eliminarArchivosDocumentacion(ctx);
  },
  obtenerPiezasMolde: async(ctx) => {
    return strapi.services.molde.obtenerPiezasMolde(ctx);
  },
  obtenerAccesoriosMolde: async(ctx) => {
    return strapi.services.molde.obtenerAccesoriosMolde(ctx);
  },
  guardarNuevoMovimiento: async(ctx) => {
    return strapi.services.molde.guardarNuevoMovimiento(ctx);
  },
  obtenerMovimientos: async(ctx) => {
    return strapi.services.molde.obtenerMovimientos(ctx);
  },
  obtenerMovimientoDetalle: async(ctx) => {
    return strapi.services.molde.obtenerMovimientoDetalle(ctx);
  },
  obtenerTablasMovimiento: async(ctx) => {
    return strapi.services.molde.obtenerTablasMovimiento(ctx);
  },
  
  obtenerMoldesInexistentes: async(ctx) => {
    return strapi.services.molde.obtenerMoldesInexistentes(ctx);
  },
  obtenerMoldesExistentes: async(ctx) => {
    return strapi.services.molde.obtenerMoldesExistentes(ctx);
  },
  obtenerInsumosExistentes: async(ctx) => {
    return strapi.services.molde.obtenerInsumosExistentes(ctx);
  },
  obtenerDatosFolio: async(ctx) => {
    return strapi.services.molde.obtenerDatosFolio(ctx);
  },
  obtenerAlmacenesPorUsuario: async(ctx) => {
    return strapi.services.molde.obtenerAlmacenesPorUsuario(ctx);
  },
  obtenerAlmacenPlaza: async(ctx) => {
    return strapi.services.molde.obtenerAlmacenPlaza(ctx);
  },
  obtenerMoldesAlmacen: async(ctx) => {
    return strapi.services.molde.obtenerMoldesAlmacen(ctx);
  },
  obtenerMoldesAlmacenReporte: async(ctx) => {
    return strapi.services.molde.obtenerMoldesAlmacenReporte(ctx);
  },
  obtenerInsumosAlmacen: async(ctx) => {
    return strapi.services.molde.obtenerInsumosAlmacen(ctx);
  },
  obtenerEstatusInventario: async(ctx) => {
    return strapi.services.molde.obtenerEstatusInventario(ctx);
  },
  guardarInventarioCiclico: async(ctx) => {
    return strapi.services.molde.guardarInventarioCiclico(ctx);
  },
  obtenerOrigenesAlmacen: async(ctx) => {
    return strapi.services.molde.obtenerOrigenesAlmacen(ctx);
  },
  obtenerReporteKardexInventario: async(ctx) => {
    return strapi.services.molde.obtenerReporteKardexInventario(ctx);
  },
  obtenerReporteConfiabilidadInventario: async(ctx) => {
    return strapi.services.molde.obtenerReporteConfiabilidadInventario(ctx);
  },
  obtenerAniosAlmacen: async(ctx) => {
    return strapi.services.molde.obtenerAniosAlmacen(ctx);
  },
  obtenerPeriodosAlmacen: async(ctx) => {
    return strapi.services.molde.obtenerPeriodosAlmacen(ctx);
  },
  obtenerInventarioCiclicos: async(ctx) => {
    return strapi.services.molde.obtenerInventarioCiclicos(ctx);
  },
  obtenerEvidenciasInventariosCiclicos: async(ctx) => {
    return strapi.services.molde.obtenerEvidenciasInventariosCiclicos(ctx);
  },
  guardarArchivosEvidencia: async(ctx) => {
    return strapi.services.molde.guardarArchivosEvidencia(ctx);
  },
  eliminarArchivoEvidencia: async(ctx) => {
    return strapi.services.molde.eliminarArchivoEvidencia(ctx);
  },
  obtenerDetalleInventarioCiclico: async(ctx) => {
    return strapi.services.molde.obtenerDetalleInventarioCiclico(ctx);
  },
  obtenerReporteInventarios: async(ctx) => {
    return strapi.services.molde.obtenerReporteInventarios(ctx);
  },
  obtenerDatosMantenimiento: async(ctx) => {
    return strapi.services.molde.obtenerDatosMantenimiento(ctx);
  },
  obtenerDetalleMantenimientos: async(ctx) => {
    return strapi.services.molde.obtenerDetalleMantenimientos(ctx);
  },
  obtenerAlmacenesPlazaUsuario: async(ctx) => {
    return strapi.services.molde.obtenerAlmacenesPlazaUsuario(ctx);
  },
  cambiarResultadosInventario: async(ctx) => {
    return strapi.services.molde.cambiarResultadosInventario(ctx);
  },
  obtenerAlmacenFechaInicial: async(ctx) => {
    return strapi.services.molde.obtenerAlmacenFechaInicial(ctx);
  },
  plazasUsuario: async (ctx) => {
    return strapi.services.molde.plazasUsuario(ctx);
  },
};
