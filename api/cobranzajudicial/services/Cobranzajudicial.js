'use strict';

/**
 * Cobranzajudicial.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');

// const env = process.env.NODE_ENV;
// const {
//   env: {
//     NODE_ENV: n = 'development',
//     driver : d = 'mssql'
//   }
// } = process;
// process.env.NODE_ENV; // ['development', 'production', 'staging']

// const getConfigProp = (prop = '') => {
//   return strapi.config.environments[n][d][prop] || {};
// };
const { poolPromiseSifWeb, poolPromiseServDesarrollo } = require('./../../../config/functions/bootstrap');
const request = require('request');
const JSZip = require('jszip');

module.exports = {

  /**
   * Promise to fetch all cobranzajudicials.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('cobranzajudicial', params);
    // Select field to populate.
    const populate = Cobranzajudicial.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Cobranzajudicial
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise para obtener el tipo de proceso judicial.
   *
   * @return {Promise}
   */

  ObtenerTipoProcesoJudicial: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .execute('plcj_ObtenerTipoProcesoJudicial');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      // sql.close();
      return ctx.response.badRequest('Error al obtener los procesos judiciales');
    }
  },

  /**
   * Promise para obtener las etapas de cobranza judicial.
   *
   * @return {Promise}
   */

  ObtenerListadoEtapasCobranzaJudicial: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('ProcesoJudicialId', sql.Int, ctx.params.procesoId)
        .input('Estatus', sql.VarChar, ctx.params.estatus)
        .execute('plcj_ObtenerListadoEtapasCobranzaJudicial');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      // sql.close();
      return ctx.response.badRequest('Error al obtener los procesos judiciales');
    }
  },

  /**
   * Promise para actualizar el estatus(activo, inactivo)
   * de las etapas de cobranza judicial.
   *
   * @return {Promise}
   */

  ActualizarEstatusEtapasCobranzaJudicial: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;
      const activo = ctx.request.body.estatus.toUpperCase() === 'ACTIVAR' ? 1 : 0;

      const requestSQL = await pool.request()
        .input('ProcesoJudicialId', sql.Int, ctx.params.procesoId)
        .input('Activo', sql.Bit, activo)
        .input('Etapas', sql.VarChar, _.toString(ctx.request.body.etapas))
        .execute('plcj_ActualizarEstatusEtapasCobranzaJudicial');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      return ctx.response.badRequest('Error al intentar actualizar el estatus');
    }
  },

  /**
   * Promise para obtener las etapas del tipo proceso judicial.
   *
   * @return {Promise}
   */

  ObtenerComboEtapasCobranzaJudicial: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('ProcesoJudicialId', sql.Int, ctx.params.procesoId)
        .input('tipoMovto', sql.TinyInt, ctx.params.tipoMovto)
        .execute('plcj_ObtenerComboEtapasCobranzaJudicial');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      return ctx.response.badRequest('Error al obtener las etapas');
    }
  },
  
  /**
   * Promise to get weey retail calendar.
   *
   * @return {Promise}
   */
  obtenerSemMesRetail: async(ctx) => {
    try{
      const tipoMovto = ctx.params.tipoMovto ? ctx.params.tipoMovto : 0;
      const pool = await poolPromiseServDesarrollo;
      let request = await pool.request()
        .input('TipoMovimiento', sql.SmallInt, tipoMovto)
        .input('IdEmpresa', sql.SmallInt, ctx.params.companySelected)
        .input('AsignacionAbogado', sql.SmallInt, ctx.params.asignacion)
        .execute('plcj_ObtenerSemanasMesRetail');
      return request.recordset;

    }catch(err){
      console.log('Error, obtenerSemMesRetail', err);
      return ctx.response.badRequest('Error al obtener semana retail');
    }
  },

  /**
   * Promise para dar de alta las etapas de cobranza judicial.
   *
   * @return {Promise}
   */

  CrearEtapasCobranzaJudicial: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('ProcesoJudicialId', sql.Int, ctx.request.body.procesoId)
        .input('NomEtapa', sql.VarChar, ctx.request.body.nomEtapa)
        .input('DiasPlazaForanea', sql.SmallInt, ctx.request.body.diasPlazaForanea)
        .input('DiasPlazaLocal', sql.SmallInt, ctx.request.body.diasPlazaLocal)
        .input('IdEtapaDependencia', sql.SmallInt, ctx.request.body.idEtapaDependencia)
        .input('EmpleadoCreacion', sql.Int, ctx.request.body.empleado)
        .execute('plcj_CrearEtapasCobranzaJudicial');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Se registro la etapa con Éxito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      return ctx.response.badRequest('Error al intentar dar de alta la etapa');
    }
  },

  /**
   * Promise para editar las etapas de cobranza judicial.
   *
   * @return {Promise}
   */

  EditarEtapasCobranzaJudicial: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('ProcesoJudicialId', sql.Int, ctx.request.body.procesoId)
        .input('NomEtapa', sql.VarChar, ctx.request.body.nomEtapa)
        .input('DiasPlazaForanea', sql.SmallInt, ctx.request.body.diasPlazaForanea)
        .input('DiasPlazaLocal', sql.SmallInt, ctx.request.body.diasPlazaLocal)
        .input('IdEtapa', sql.SmallInt, ctx.params.idEtapa)
        .input('IdEtapaDependencia', sql.SmallInt, ctx.request.body.idEtapaDependencia)
        .input('EmpleadoModifica', sql.Int, ctx.request.body.empleado)
        .execute('plcj_EditarEtapasCobranzaJudicial');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Se actualizo la etapa con Éxito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      return ctx.response.badRequest('Error al intentar editar la etapa');
    }
  },

  /**
   * Promise to get weey retail calendar.
   *
   * @return {Promise}
   */
  obtenerEmpresasCobranzaJudicial: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      let request = await pool.request()
        .execute('plcj_ObtenerEmpresasCobranzaJudicial');
      console.log('obtenerEmpresasCobranzaJudicial', request.recordset);
      return request.recordset;

    }catch(err){
      console.log('Error, obtenerEmpresasCobranzaJudicial', err);
      return ctx.response.badRequest('Error al obtener empresas de cobranza judicial');
    }
  },

  /**
   * Promise para obtener los datos retails del dia actual.
   *
   * @return {Promise}
   */
  obtenerFechaRetail: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      let request = await pool.request()
        .execute('plcj_obtenerFechaRetail');
      return request.recordset[0];

    }catch(err){
      console.log('Error, obtenerSemMesRetail', err);
      return ctx.response.badRequest('Error al obtener semana retail');
    }
  },

  /**
   * Promise para obtener el listado para asignar abogados.
   *
   * @return {Promise}
   */

  ObtenerListadoAsignaAbogado: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('AnioRetail', sql.SmallInt, ctx.params.anioRetail)
        .input('IdEmpresa', sql.SmallInt, ctx.params.empresaId)
        .input('PeriodoId', sql.SmallInt, ctx.params.periodoId)
        .execute('Proc_ConsultaAsignacionAbogado');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener el listado de clientes');
    }
  },

  /**
   * Promise para obtener los abogados litigantes.
   *
   * @return {Promise}
   */

  ObtenerAbogadosLitigantes: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .execute('plcj_ObtenerAbogadosLitigantes');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      // sql.close();
      return ctx.response.badRequest('Error al obtener los abogados');
    }
  },

  /**
   * Promise para obtener los tipos de carteras.
   *
   * @return {Promise}
   */

  ObtenerTiposCartera: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .execute('plcj_ObtenerTiposCarteraCobranzaJudicial');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      // sql.close();
      return ctx.response.badRequest('Error al obtener los tipos de carteras');
    }
  },

  ObtenerEmpresasLayout: async (ctx) => {
    
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('IdEmpresa', sql.Int, ctx.params.empresaId)
        .execute('proc_obtenerEmpresasLayout');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      if(responseSQL.data.length > 0){
        responseSQL.data[0].cabeceras = JSON.parse(responseSQL.data[0].cabeceras);
        responseSQL.data[0].contenido = JSON.parse(responseSQL.data[0].contenido);
      }

      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener el layout de la empresa');
    }
  },
  
  guardaCargaBase: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const datosBase = JSON.stringify(ctx.request.body.base);
      const datosBaseDetalle = JSON.stringify(ctx.request.body.rows);
      console.log('datos.datosBaseDetalle',datosBaseDetalle);
      await req
        .input('CargaBase', sql.VarChar(sql.MAX), datosBase)
        .input('CargaBaseDetalle', sql.VarChar(sql.MAX), datosBaseDetalle)
        .execute('Proc_guardaCargaBase');
      let msj = 'Datos guardados con éxito';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar Carga Base');
    }
  },

  obtenerListadoMes: async (ctx) => {
   
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('IdEmpresa', sql.Int, ctx.params.empresaId)
        .input('MesRetail', sql.Int, ctx.params.mesRetail)
        .execute('proc_obtenerListadoMesCargaBase');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener el layout de la empresa');
    }
  },

  ObtenerExcel: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('IdEmpresa', sql.Int, ctx.params.empresaId)
        .input('IdBaseCobranza', sql.Int, ctx.params.baseCobranzaId)
        .execute('proc_exportarArchivoExcel');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener el layout de la empresa');
    }
  },

  /**
   * Promise para obtener el layout.
   *
   * @return {Promise}
   */

  ObtenerLayoutAsignacion: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('IdEmpresa', sql.SmallInt, ctx.params.empresaId)
        .execute('proc_obtenerLayoutAsignacion');

      if(requestSQL.recordset.length > 0){
        requestSQL.recordset[0].cabeceras = JSON.parse(requestSQL.recordset[0].cabeceras);
      }

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener el layout');
    }
  },
  guardaAsignacionAbogado: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const datosAsignacionAbogado = JSON.stringify(ctx.request.body);
      console.log('datosdatosAsignacionAbogado',datosAsignacionAbogado);
      await req
        .input('AsignacionAbogado', sql.VarChar(sql.MAX), datosAsignacionAbogado)
        .execute('Proc_guardaAsignacionAbogado');
      let msj = 'Datos guardados con éxito';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar la asignacion de abogado');
    }
  },
  desactivaAsignacionAbogado: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const datosAsignacionAbogado = JSON.stringify(ctx.request.body);
      console.log(datosAsignacionAbogado);
      console.log('datosdatosAsignacionAbogado',datosAsignacionAbogado);
      await req
        .input('EliminaAsignacionAbogado', sql.VarChar(sql.MAX), datosAsignacionAbogado)
        .execute('Proc_EliminaAsignacionAbogado');
      let msj = 'Datos Eliminados con éxito';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al eliminar la asignacion de abogado');
    }
  },
  consultaSeguimientoAbogado: async (ctx) => {
   
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('idEmpresa', sql.Int, ctx.params.idEmpresa)
        .input('idUsuario', sql.Int, ctx.params.idUsuario)
        .execute('Proc_ConsultaSeguimientoCobranza');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener el layout de la empresa');
    }
  },
  consultaEtapasSeguimientoAbogado: async (ctx) => {
   
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('idEmpresa', sql.Int, ctx.params.idEmpresa)
        .input('idCliente', sql.Int, ctx.params.idCliente)
        .execute('Proc_ConsultaEtapaSeguimientoCobranza');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener el layout de la empresa');
    }
  },
  guardaSeguimientoEtapas: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const datosSeguimientoEtapas = JSON.stringify(ctx.request.body);
      console.log('datosSeguimientoEtapas',datosSeguimientoEtapas);
      await req
        .input('SeguimientoEtapas', sql.VarChar(sql.MAX), datosSeguimientoEtapas)
        .execute('Proc_guardaSeguimientoEtapas');
      let msj = 'Datos guardados con éxito';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar la asignacion de etapas');
    }
  },
  contarArchivosClientes: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('ClienteId', sql.Int, ctx.params.idCliente)
        .input('EmpresaId', sql.Int, ctx.params.idEmpresa)

        .execute('Proc_ContarArchivosSeguimiento');
   
      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener el total de archivos');
    }
  },
  descargarArchivosClientes: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('ClienteId', sql.Int, ctx.params.idCliente)
        .input('EmpresaId', sql.Int, ctx.params.idEmpresa)

        .execute('Proc_ContarArchivosSeguimiento');
   
      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
       
      var zip = new JSZip();

      for(let i = 0; i < responseSQL.data.length; i++){
        zip.file('Archivo_seguimiento_'+i+'.pdf', request(responseSQL.data[i].rutas));
      
      }

      const data = zip.generateAsync({type : 'nodebuffer'});

      return data;
      
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener el total de archivos');
    }
  },
};
