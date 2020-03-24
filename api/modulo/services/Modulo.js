/* eslint-disable no-undef */
'use strict';

/**
 * Plantillatickets.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const sql = require('mssql');
const { poolPromiseServDesarrollo } = require('./../../../config/functions/bootstrap');
const {
  SQLHandler,
} = require('./../../../config/functions/bootstrap');
// const env = process.env.NODE_ENV;

module.exports = {

  /**
   * Promise to fetch all modulo.
   *
   * @return {Promise}
   */

  fetchAll: async() => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const res = await req.execute('proc_obtenerModulos');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los módulos');
    }
  },
  /**
   * Promise to activar a/an modulo.
   *
   * @return {Promise}
   */
  activar: async (ctx, body) => {
    try {
      const ids = body.join(',');
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'Arreglo',
          type: sql.VarChar,
          value: ids 
        },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_activarModulo',
          parameters
        );
      return res.recordsets;

    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método activar',
        error,
      );
    }
  },
  /**
   * Promise to desactivar a/an modulo.
   *
   * @return {Promise}
   */
  desactivar: async (ctx, body) => {
    try {
      const ids = body.join(',');
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'Arreglo',
          type: sql.VarChar,
          value: ids 
        },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_desactivarModulo',
          parameters
        );
      return res;
    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método desactivar',
        error,
      );
    }
  },
  /**
   * Promise to remove a/an modulo.
   *
   * @return {Promise}
   */
  remove: async (ctx) => {
    try {
      const {
        params: {
          _id = ''
        },
      } = ctx;

      if(!_id.length){
        return ctx.badRequest('Id no definido');
      }
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'IdModulo',
          type: sql.Int,
          value: _id },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_eliminarModulo',
          parameters
        );
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método remove',
        error,
      );
    }  
  },

  consultaTipoAgrupador: async() => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const res = await req.execute('Proc_ConsultaTipoAgrupador');
      console.log(res);
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener tipo agrupador');
    }
  },
  consultaFunciones: async(ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdModulo',sql.Int,ctx.params._id)
        .execute('Proc_ConsultaFunciones');
      console.log('datos nuevos ',res.recordset);
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar las funciones');
    }
  },

  consultaUrl: async() => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const res = await req.execute('Proc_ConsultaUrl');
      console.log(res);
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener Url de agregar funcion');
    }
  },
  guardaModulo: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const datos = ctx.request.body;
      console.log(ctx);
      console.log('datos', datos);
      await req
        .input('Modulo', sql.VarChar(30000), JSON.stringify(datos))
        .execute('Proc_GuardarModulo');
      let msj = 'Datos guardados con éxito';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar Modulo');
    }
  },

  cudModuloFuncion: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const datos = ctx.request.body;
      console.log('datos', datos);
      console.log('datos.tipoAgrupadorSlc', datos.tipoAgrupadorSlc);
      await req
        .input('FuncionId', sql.Int, datos.FuncionId)
        .input('IdModulo', sql.Int, datos.IdModulo)
        .input('IdTipoAgrupador', datos.tipoAgrupadorSlc)
        .input('IdURLFuncion', sql.Int, datos.urlFuncionSlc)
        .input('NombreFuncion', sql.VarChar(150), datos.textFieldNombreFuncion)
        .input('UsuarioCreacion', sql.Int, datos.usuario)
        .input('UsuarioModificacion', sql.Int, datos.UsuarioModificacion)
        .input('Activo', sql.Bit, 1)
        .execute('Proc_GuardaModuloFuncion');
      let msj = 'Datos guardados con éxito';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar función');
    }
  },
  consultaNombreModulo: async(ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('NombreModulo',ctx.params._id)
        .execute('Proc_ValidaExisteModulo');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar las funciones');
    }
  },
  /**
  * Promise to desactivarFunciones a/an modulo.
  *
  * @return {Promise}
  */
  desactivarFunciones: async (ctx, body) => {
    try {
      const ids = body.join(',');
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'idFuncion',
          type: sql.VarChar,
          value: ids 
        },
        { param: 'opcion',
          type: sql.Int,
          value: 0 
        },
      ];
      const res = await sqlh
        .execProcedure(
          'Proc_EliminaFunciones',
          parameters
        );   
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al activar o desactivar las funciones',
        error,
      );
    }
  },
  /**
  * Promise to activarFunciones a/an modulo.
  *
  * @return {Promise}
  */
  activarFunciones: async (ctx, body) => {
    try {
      console.log(ctx);
      console.log(body);
      const ids = body.join(',');
      console.log(ids);
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'idFuncion',
          type: sql.VarChar,
          value: ids 
        },
        { param: 'opcion',
          type: sql.Int,
          value: 1 
        },
      ];
      const res = await sqlh
        .execProcedure(
          'Proc_EliminaFunciones',
          parameters
        );
      console.log(res);    
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al activar o desactivar las funciones',
        error,
      );
    }
  },
};


