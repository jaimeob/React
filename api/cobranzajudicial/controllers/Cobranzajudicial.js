'use strict';

/**
 * Cobranzajudicial.js controller
 *
 * @description: A set of functions called "actions" for managing `Cobranzajudicial`.
 */

module.exports = {

  /**
   * Retrieve cobranzajudicial records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.cobranzajudicial.search(ctx.query);
    } else {
      return strapi.services.cobranzajudicial.fetchAll(ctx.query);
    }
  },

  /**
   * Retorna los tipos de procesos judiciales.
   *
   * @return {Array}
   */

  ObtenerTipoProcesoJudicial: async (ctx) => {
    return strapi.services.cobranzajudicial.ObtenerTipoProcesoJudicial(ctx);
  },

  /**
   * Retorna el catalogo de etapas.
   *
   * @return {Array}
   */

  ObtenerListadoEtapasCobranzaJudicial: async (ctx) => {
    return strapi.services.cobranzajudicial.ObtenerListadoEtapasCobranzaJudicial(ctx);
  },

  /**
   * Retorna una confirmación.
   *
   * @return {Array}
   */

  ActualizarEstatusEtapasCobranzaJudicial: async (ctx) => {
    return strapi.services.cobranzajudicial.ActualizarEstatusEtapasCobranzaJudicial(ctx);
  },

  /**
   * Retorna las etapas.
   *
   * @return {Array}
   */

  ObtenerComboEtapasCobranzaJudicial: async (ctx) => {
    return strapi.services.cobranzajudicial.ObtenerComboEtapasCobranzaJudicial(ctx);
  },

  /**
   * Retorna una confirmación.
   *
   * @return {Array}
   */

  CrearEtapasCobranzaJudicial: async (ctx) => {
    return strapi.services.cobranzajudicial.CrearEtapasCobranzaJudicial(ctx);
  },

  /**
   * Retorna una confirmación.
   *
   * @return {Array}
   */

  EditarEtapasCobranzaJudicial: async (ctx) => {
    return strapi.services.cobranzajudicial.EditarEtapasCobranzaJudicial(ctx);
  },
  
  /**
   * Promise to get Year and Hours current.
   *
   * @return {Promise}
   */
  obtenerSemMesRetail: async (ctx) => {
    return strapi.services.cobranzajudicial.obtenerSemMesRetail(ctx);
  },
  /**
   * Promise to get Year and Hours current.
   *
   * @return {Promise}
   */
  obtenerEmpresasCobranzaJudicial: async (ctx) => {
    return strapi.services.cobranzajudicial.obtenerEmpresasCobranzaJudicial(ctx);
  },

  /**
   * Retorna los datos retail del dia actual.
   *
   * @return {Promise}
   */
  obtenerFechaRetail: async (ctx) => {
    return strapi.services.cobranzajudicial.obtenerFechaRetail(ctx);
  },

  /**
   * Retorna el listado de clientes de acuerdo al periodo.
   *
   * @return {Promise}
   */
  ObtenerListadoAsignaAbogado: async (ctx) => {
    return strapi.services.cobranzajudicial.ObtenerListadoAsignaAbogado(ctx);
  },

  /**
   * Retorna los abogados litigantes.
   *
   * @return {Promise}
   */
  ObtenerAbogadosLitigantes: async (ctx) => {
    return strapi.services.cobranzajudicial.ObtenerAbogadosLitigantes(ctx);
  },

  /**
   * Retorna los tipos de carteras.
   *
   * @return {Promise}
   */
  ObtenerTiposCartera: async (ctx) => {
    return strapi.services.cobranzajudicial.ObtenerTiposCartera(ctx);
  },

  /**
   * Retorna el layout de las empresas.
   *
   * @return {Promise}
   */
  ObtenerEmpresasLayout: async (ctx) => {
    return strapi.services.cobranzajudicial.ObtenerEmpresasLayout(ctx);
  },

  /**
   * guarda carga base.
   *
   * @return {Promise}
   */
  guardaCargaBase: async (ctx) => {
    return strapi.services.cobranzajudicial.guardaCargaBase(ctx);
  },

  /**
   * Retorna el la información para exportar a excel.
   *
   * @return {Promise}
   */
  ObtenerExcel: async (ctx) => {
    return strapi.services.cobranzajudicial.ObtenerExcel(ctx);
  },
  /**
   * Retorna el la información de asignacion de abogado.
   *
   * @return {Promise}
   */
  obtenerAsignacionAbogado: async (ctx) => {
    return strapi.services.cobranzajudicial.obtenerAsignacionAbogado(ctx);
  },
  /**
   * Retorna el la información de asignacion de abogado.
   *
   * @return {Promise}
   */
  ObtenerLayoutAsignacion: async (ctx) => {
    return strapi.services.cobranzajudicial.ObtenerLayoutAsignacion(ctx);
  },
  /**
   * guarda Asignacion de abogado.
   *
   * @return {Promise}
   */
  guardaAsignacionAbogado: async (ctx) => {
    return strapi.services.cobranzajudicial.guardaAsignacionAbogado(ctx);
  },
  /**
   * elimina Asignacion de abogado.
   *
   * @return {Promise}
   */
  desactivaAsignacionAbogado: async (ctx) => {
    return strapi.services.cobranzajudicial.desactivaAsignacionAbogado(ctx);
  },
  /**
   * consulta Asignacion de abogado.
   *
   * @return {Promise}
   */
  consultaSeguimientoAbogado: async (ctx) => {
    return strapi.services.cobranzajudicial.consultaSeguimientoAbogado(ctx);
  },
  /**
   * consulta Etapas Asignacion de abogado.
   *
   * @return {Promise}
   */
  consultaEtapasSeguimientoAbogado: async (ctx) => {
    return strapi.services.cobranzajudicial.consultaEtapasSeguimientoAbogado(ctx);
  },
  /**
  * guarda seguimiento etapas.
   *
   * @return {Promise}
   */
  guardaSeguimientoEtapas: async (ctx) => {
    return strapi.services.cobranzajudicial.guardaSeguimientoEtapas(ctx);
  },

  /**
   * contar archivos de los clientes.
   *
   * @return {Promise}
   */
  contarArchivosClientes: async (ctx) => {
    return strapi.services.cobranzajudicial.contarArchivosClientes(ctx);
  },

  /**
   * descargar archivos de los clientes.
   *
   * @return {Promise}
   */
  descargarArchivosClientes: async (ctx) => {
    return strapi.services.cobranzajudicial.descargarArchivosClientes(ctx);
  },
  /**
   * descargar archivos de los clientes.
   *
   * @return {Promise}
   */
  ObtenerListadoMes: async (ctx) => {
    return strapi.services.cobranzajudicial.obtenerListadoMes(ctx);
  },
};
