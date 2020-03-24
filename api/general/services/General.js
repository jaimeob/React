'use strict';
/**
 * General.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
// const _ = require('lodash');
const sql = require('mssql');
const { poolPromise, poolPromiseServDesarrollo } = require('./../../../config/functions/bootstrap');

module.exports = {

  /**
   * Promise to fetch all generals.
   *
   * @return {Promise}
   */

  obtenerPlazasGeneral: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdPlaza', sql.Int, ctx.params._IdPlaza)
        .execute('plng_obtenerPlazasGeneral');
      return res.recordset;
    } catch (error) {
      console.log('Error, obtenerPlazasGeneral', error);
      return ctx.response.badRequest('Error al obtener las plazas');
    }
  },

  /**
   * Promise to get Year and Hours current.
   *
   * @return {Promise}
   */
  obtenerFechaHora: async(ctx) => {
    try{
      const pool = await poolPromise;
      let request = await pool.request()
        .execute('plng_obtenerFechaHora');

      return {...request.recordset[0]};

    }catch(err){
      console.log('Error, obtenerFechaHora', err);
      return ctx.response.badRequest('Error al obtener fecha y hora actual');
    }
  },

  obtenerRoles: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      const roles = await pool.request()
        .execute('proc_obtenerRolComboBusqueda');
      return roles.recordset;

    }catch(err){
      return ctx.response.badRequest('Error al obtener los roles');
    }
  },

  obtenerPuestos: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      const puestos = await pool.request()
        .input('IdPuesto', sql.Int, null)
        .execute('proc_obtenerPuestos');

      return puestos.recordset;

    }catch(err){
      return ctx.response.badRequest('Error al obtener los puestos');
    }
  },
  obtenerPuestosSinRol: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      const puestos = await pool.request()
        .execute('proc_obtenerPuestosSinRol');

      return puestos.recordset;

    }catch(err){
      return ctx.response.badRequest('Error al obtener los puestos');
    }
  },
  obtenerPermisos: async(ctx) => {

    try{
      const pool = await poolPromiseServDesarrollo;
      const request = await pool.request();
      const res = await request
        .input('IdModulo', sql.Int, ctx.params.idModulo)
        .input('IdFuncion', sql.Int, ctx.params.funcionId)
        .input('IdUsuario', sql.Int, ctx.params.idUsuario)
        .input('IdRolEmpresa', sql.Int, ctx.params.idRolEmpresa)
        .execute('Proc_ConsultaPermisosFuncionesUsuario');

      const permisos = {
        normales: {},
        especiales: {},
      };

      res.recordset.forEach(el => {
        for(const key in el){
          if(key.includes('PERN_')){
            permisos.normales[key.replace('PERN_', '').toLowerCase()] = el[key];
          }

          if(el.permisoEspecial === 1){
            if(key.includes('PERE_')){
              permisos.especiales[el[key].replace(' ', '').toLowerCase()] = el.tienePermiso;
            }
          }
        }
      });

      res.permisos = permisos;

      return res;

    }catch(err){
      console.log(err);
      return ctx.response.badRequest('Error al obtener los puestos');
    }
  },
  obtenerDepartamentoPuestos: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      const puestos = await pool.request()
        .input('IdDepartamento', sql.Int, ctx.params.idDepartamento)
        .execute('proc_obtenerPuestosPorDepartamento');

      return puestos.recordset;

    }catch(err){
      return ctx.response.badRequest('Error al obtener los puestos');
    }
  },
  obtenerPuestoEmpleados: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      const empleados = await pool.request()
        .input('IdPuesto', sql.Int, ctx.params.idPuesto)
        .execute('proc_obtenerEmpleadosPorPuesto');

      return empleados.recordset;

    }catch(err){
      return ctx.response.badRequest('Error al obtener los empleados');
    }
  },
  obtenerSemMesRetail: async(ctx) => {
    try{
      let { response } = {};
      const pool = await poolPromiseServDesarrollo;
      let request = await pool.request()
        .input('Anio', sql.SmallInt, ctx.params.year)
        .input('Periodicidad', sql.Char, ctx.params.periodicity)
        .input('Periodo', sql.SmallInt, ctx.params.period)
        .execute('plgn_ObtenerSemanasMesRetail');
      response = {
        status: 200,
        message: 'Exito',
        weeks: ctx.params.periodicity === 'S' ? request.recordset: [],
        months: ctx.params.periodicity === 'M' ? request.recordset: [],
      };
      return response;

    }catch(err){
      console.error('Error, plgn_ObtenerSemanasMesRetail', err);
      return ctx.response.badRequest('Error al obtener semana mes retail');
    }
  },
  obtenerPlazasUsuario: async(ctx) => {
    try{
      let { response } = {};
      const pool = await poolPromiseServDesarrollo;
      let request = await pool.request()
        .input('IdUsuario', sql.Int, ctx.params.idUser)
        .execute('plgn_ObtenerPlazasUsuario');
      response = {
        status: 200,
        message: 'Exito',
        data: request.recordset,
      };
      return response;
    }catch(err){
      console.error('Error, plgn_ObtenerPlazasUsuario', err);
      return ctx.response.badRequest('Error al obtener plazas del usuario');
    }
  }
};
