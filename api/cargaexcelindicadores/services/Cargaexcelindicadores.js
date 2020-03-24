'use strict';

/**
 * Cargaexcelindicadores.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const sql = require('mssql');
const { poolPromiseServDesarrollo } = require('./../../../config/functions/bootstrap');

module.exports = {
  obtenerLayoutCargaBase: async(ctx) => {
    try{
      let result = [];
      let response = {
        status: 200,
        message: 'Exito',
        content: [],
        layoutName: '',
        typeLoadId: 0
      };
      const pool = await poolPromiseServDesarrollo;
      let request = await pool.request()
        .input('TipoCargaId', sql.SmallInt, ctx.params.tipoCargaId)
        .execute('spci_ObtenerLayoutCargaBase');
      if (request.recordset) {
        result = JSON.parse(request.recordset[0].Contenido);
        Object.assign(response, {
          content: result.length > 0 && result.map((record, idx) => {
            return {
              Id: idx,
              Content: record
            };
          }),
          layoutName: request.recordset[0].NombreLayout,
          typeLoadId: request.recordset[0].TipoCargaId
        });
      }
      return response;
    }catch(err){
      console.error('Error, spci_ObtenerLayoutCargaBase', err);
      return ctx.response.badRequest('Error al obtener layout');
    }
  },


  GrabarCargaIndicadores: async(ctx) => {
    try {
      let response = {};
      const pool = await poolPromiseServDesarrollo;

      // console.log('ctx.request.body:', ctx.request.body);
      // console.log('ctx.request.body.rows:', ctx.request.body.rows);
      // console.log('ctx.request.body.rows STR:', JSON.stringify(ctx.request.body.rows));

      const requestSQL = await pool.request()
        .input('NombreArchivo', sql.VarChar, ctx.request.body.nombreArchivo)
        .input('TipoCarga', sql.SmallInt, ctx.params.tipoCargaId)
        .input('EmpresaId', sql.Int, ctx.params.empresaId)
        .input('PlazaId', ctx.request.body.plazaId)
        .input('Anio', sql.SmallInt, ctx.request.body.anio)
        .input('MesRetail', ctx.request.body.mesRetail)
        .input('SemanaRetail', ctx.request.body.semanaRetail)
        .input('Dia', ctx.request.body.dia)
        .input('Usuario', sql.Int, ctx.request.body.usuarioId)
        .input('Detalle', sql.NVarChar, JSON.stringify(ctx.request.body.rows))
        .execute('spci_GrabarCargaIndicador');

      response = {
        status: requestSQL.recordset[0].Error,
        message: requestSQL.recordset[0].Mensaje,
        data: requestSQL.recordset,
      };

      return response;
    } catch (error) {
      console.error('Error, spci_GrabarCargaIndicador', error);
      return ctx.response.badRequest('Error al intentar grabar la carga de indicadores');
    }
  },

  ObtenerListadoCargas: async(ctx) => {
    try {
      let response = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('TipoCarga', sql.SmallInt, ctx.params.tipoCargaId)
        .input('EmpresaId', sql.Int, ctx.params.empresaId)
        .input('Anio', sql.SmallInt, ctx.params.anio)
        .input('PlazaId', ctx.params.plazaId)
        .execute('spci_ObtenerListadoCargaIndicadores');

      response = {
        status: requestSQL.recordset.length > 0 ? requestSQL.recordset[0].Error : 201,
        message: requestSQL.recordset.length > 0 ? requestSQL.recordset[0].Mensaje : 'Sin rsultados',
        data: requestSQL.recordset,
      };

      return response;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener el listado de cargas');
    }
  }

};
