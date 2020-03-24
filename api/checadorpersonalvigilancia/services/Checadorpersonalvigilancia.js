'use strict';

/**
 * Checadorpersonalvigilancia.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const _ = require('lodash');
const sql = require('mssql');

const {
  //poolPromiseSifWeb,
  poolPromiseServDesarrollo
} = require('./../../../config/functions/bootstrap');

module.exports = {

  /**
   * Promise para obtener los años con necesidad capturada.
   *
   * @return {Promise}
   */

  ObtenerAnioNecesidad: async (ctx) => {
   
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .execute('cpv_ObtenerAniosNecesidad');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset.map(obj => obj.AnioRetail);
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener los años disponibles');
    }
  },

  /**
   * Promise para obtener las necesidades.
   *
   * @return {Promise}
   */

  ObtenerListadoNecesidad: async (ctx) => {
   
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('IdEmpresa', sql.SmallInt, ctx.params.idEmpresa)
        .input('AnioRetail', sql.SmallInt, ctx.params.anioRetail)
        .execute('cpv_ObtenerListadoNecesidad');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener las necesidades');
    }
  },

  /**
   * Promise para obtener las empresas.
   *
   * @return {Promise}
   */

  ObtenerEmpresasNecesidad: async (ctx) => {
   
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .execute('cpv_ObtenerEmpresasNecesidad');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener las empresas');
    }
  },

  /**
   * Promise para generar y editar una necesidad.
   *
   * @return {Promise}
   */

  RegistrarNecesidad: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo; 
      const requestSQL = await pool.request()
        .input('TipoMovto', sql.SmallInt, parseInt(ctx.params.TipoMovto))
        .input('Empleado', sql.Int, ctx.request.body.Empleado)
        .input('IdEmpresa', sql.SmallInt, ctx.request.body.IdEmpresa)
        .input('AnioRetail', sql.SmallInt, ctx.request.body.AnioRetail)
        .input('IdPlaza', sql.SmallInt, ctx.request.body.IdPlaza)
        .input('MesRetail', sql.SmallInt, ctx.request.body.MesRetail)
        .input('Necesidad', sql.SmallInt, ctx.request.body.Necesidad)
        .input('EspecialActivo', sql.Bit, ctx.request.body.EspecialActivo)
        .input('Especial', sql.SmallInt, ctx.request.body.Especial)
        .input('MotivoEdita', sql.VarChar, JSON.stringify(ctx.request.body.MotivoEdita))
        .execute('cpv_GrabarNecesidad');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al intentar registrar los cambios');
    }
  },

  /**
   * Promise para generar y editar una necesidad.
   *
   * @return {Promise}
   */

  ObtenerPlazas: async (ctx) => {
   
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .execute('cpv_ObtenerPlazasChecadorV');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener las plazas');
    }
  },

  /**
   * Promise para obtener las semanas pendientes
   * de captura de inasistencia.
   *
   * @return {Promise}
   */

  ObtenerSemanasCapturaInasistencia: async (ctx) => {
   
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('EmpresaId', sql.Int, ctx.params.empresaId)
        .input('PlazaId', sql.Int, ctx.params.plazaId)
        .execute('cpv_ObtenerSemanasCapturaInasistencia');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset[0];
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener semanas');
    }
  },

  /**
   * Promise para guardar las inasistencias.
   *
   * @return {Promise}
   */

  GrabarCapturaInasistencia: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('EmpresaId', sql.Int, ctx.request.body.empresaId)
        .input('PlazaId', sql.Int, ctx.request.body.plazaId)
        .input('AnioRetail', sql.SmallInt, ctx.request.body.anioRetail)
        .input('SemanaRetail', sql.SmallInt, ctx.request.body.semanaRetail)
        .input('Inasistencia', sql.SmallInt, ctx.request.body.inasistencia)
        .input('Archivo', sql.NVarChar, JSON.stringify(ctx.request.body.archivo))
        .input('Empleado', sql.Int, ctx.request.body.empleadoId)
        .execute('cpv_GrabarCapturaInasistencia');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al intentar guardar inasistencias');
    }
  },

  /**
   * Promise para obtener reporte de asistencias.
   *
   * @return {Promise}
   */

  ObtenerReporteAsistencias: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('EmpresaId', sql.Int, ctx.params.empresaId)
        .input('PlazaId', sql.Int, ctx.params.plazaId)
        .input('Concentrado', sql.TinyInt, ctx.params.concentrado)
        .input('FechaInicio', sql.Date, ctx.params.fechaInicio)
        .input('FechaFin', sql.Date, ctx.params.fechaFin)
        .execute('cpv_ObtenerReporteAsistencias');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener reporte de asistencias');
    }
  }

};
