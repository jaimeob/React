'use strict';

/**
 * Pedidos.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const { poolPromise, transporter } = require('./../../../config/functions/bootstrap');

const upperText = (nombre) =>
  nombre.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

module.exports = {
  obtenerPortafolios : async (ctx) => {
    try{
      console.log(ctx.params,'CTXxxx obtenerPortafolios ');
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
      .input('IdUsuario', ctx.params._idUser)
        .execute('pt_obtenerPortafolios2PDP');
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },
  /**
   * Promise to fetch a/an pedidos.
   *
   * @return {Promise}
   */

  /**
   * Promise to add a/an pedidos.
   *
   * @return {Promise}
   */

  add: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      console.log(datos,'datos');
      
      //const object = datos.reduce((o, a) => Object.assign(o, { [a.ds100]: a }));
      const portafolio = await req
        .input('IdPortafolio', datos.idPortafolio)
        // .input('IdUsuarioInserto', datos.idUsuarioInserto)
        .input('NombrePortafolio', sql.VarChar(255), datos.nombrePortafolio)
        .input('Color', sql.VarChar(255), datos.colorPortafolio)
        .input('IdUsuario', sql.Int, datos.IdUsuario)
        .execute('pt_guardarPortafolioPDP');

      let msj = 'Portafolio generado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al generar el portafolio');
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
};
