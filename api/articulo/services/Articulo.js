/* eslint-disable no-undef */
'use strict';

/**
 * Articulo.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
// eslint-disable-next-line no-unused-vars
const _ = require('lodash');
const sql = require('mssql');
const { poolPromise } = require('./../../../config/functions/bootstrap');
// const env = process.env.NODE_ENV;

module.exports = {

  /**
   * Promise to fetch all articulo.
   *
   * @return {Promise}
   */

  fetchAll: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerArticulos');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los articulos');
    }
  },

  /**
   * Promise to fetch a/an articulo.
   *
   * @return {Promise}
   */

  fetch : async (ctx) => {
    
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdArticulo', ctx.params._id)
        .execute('proc_obtenerArticuloDetalle');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener el detalle del Articulo');
    }
  },

  /**
   * Promise to count articulo.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('articulo', params);

    return Articulo
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an articulo.
   *
   * @return {Promise}
   */

  add: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      await req
        .input('IdAgrupador', sql.Int, datos.idAgrupador.value)
        .input('Nombre', sql.VarChar(200), datos.nombre.value)
        .input('Precio', sql.Decimal(19,4), datos.precio.value)
        .input('StockMinimo', sql.Decimal, datos.stockMinimo.value)
        .input('StockMaximo', sql.Decimal, datos.stockMaximo.value)
        .input('IdUsuarioCreacion', sql.Int, datos.idUsuario)
        .input('Activo', sql.Bit, 1)
        .execute('proc_guardarArticulo');
      let msj = 'Material guardado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      return ctx.response.badRequest('Error al guardar el material');
    }

  },

  agrupadores: async() => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerAgrupador');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los Agrupadores');
    }
  },

  obtenerArticulosAgrupador : async (ctx) => {
    
    try {
      
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdAgrupador', ctx.params._id)
        .execute('proc_obtenerArticulosAgrupadores');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los Articulos');
    }
  },

  obtenerExistenciaArticulo : async (ctx) => {
    
    try {
      
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdArticulo', ctx.params._id)
        .input('IdPlaza', ctx.params._id2)
        .execute('proc_obtenerExistenciaActualArticulo');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener la existencia del Articulo');
    }
  },

  eliminar : async (ctx) => {
    
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdArticulo', ctx.params._id)
        .execute('proc_eliminarArticulo');
      return res;
    } catch (error) {
      return ctx.response.badRequest('El articulo fue eliminado con exito');
    }
  },

  actualizar : async (ctx) => {
    
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const datos = ctx.request.body;
      const res = await req
        .input('IdArticulo', sql.Int,datos.idMaterial.value)
        .input('IdAgrupador', sql.Int, datos.idAgrupador.value)
        .input('Nombre', sql.VarChar(200), datos.nombre.value)
        .input('Precio', sql.Decimal(19,4), datos.precio.value)
        .input('StockMinimo', sql.Decimal, datos.stockMinimo.value)
        .input('StockMaximo', sql.Decimal, datos.stockMaximo.value)
        .input('IdUsuarioActualizacion', sql.Int, datos.idUsuario)
        .execute('proc_editarArticulo');
      return res;
    } catch (error) { 
      console.log(error);
      return ctx.response.badRequest('Error al actualizar el articulo');
    }
  },

  /**
   * Promise to edit a/an articulo.
   *
   * @return {Promise}
   */
};
