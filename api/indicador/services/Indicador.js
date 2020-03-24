'use strict';

/**
 * Indicador.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const {
  groupBy,
  sumBy,
} = require('lodash');
const { poolPromiseSifWeb, poolPromiseServDesarrollo, poolPromise } = require('./../../../config/functions/bootstrap');
const sql = require('mssql');
const {
  SQLHandler,
} = require('./../../../config/functions/bootstrap');
const request = require('request');
const JSZip = require('jszip');

module.exports = {

  //empieza tio
  consultaConfiguracionBono: async(ctx) => {
    try {
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdConfiguracionBono',ctx.id)
        .execute('Proc_ConsultaConfiguracionBonos');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar la configuracion de bonos');
    }
  },
  consultaPuestosConfiguracionBono: async(ctx) => {
    try {
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdConfiguracionBono',ctx.id)
        .execute('Proc_ConsultaPuestoConfiguracionBonos');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar puestos configuracion de bonos');
    }
  },
  guardaIndicadores: async(ctx) => {
    try {
      const pool = await poolPromise;
      const datos = ctx.request.body;
     
      let res = await pool.request()
        .input('IdIndicador',datos.idIndicador)
        .input('Nombre',datos.nombre)
        .input('Descripcion',datos.descripcion)
        .input('IdUsuario',datos.idUsuario)
        .execute('Proc_guardaIndicador');

      res = await pool.request()
        .execute('Proc_ConsultaIndicadores');
 
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar puestos configuracion de bonos');
    }
  },
  consultaIndicadores: async(ctx) => {
    try {
      const pool = await poolPromise;
      const res = await pool.request()
        .execute('Proc_ConsultaIndicadores');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar los indicadores');
    }
  },
  desactivaActivaIndicador: async(ctx) => {
    try {
      const pool = await poolPromise;
      let res = await pool.request()
      
        .input('IdIndicador',ctx.idIndicador)
        .input('IdUsuario',ctx.idUsuario)
        .input('Activo',ctx.Activo)
        .execute('Proc_ActivaDesactivaIndicador');

      res.status=0;   
      if(res.recordset[0].status===1)
      {
        res = await pool.request()
          .execute('Proc_ConsultaIndicadores');

        res.status=1;
      }

      return res;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al desactivar o activar indicador');
    }
  },

  consultaExisteNombre: async(ctx) => {
    try {
      const pool = await poolPromise;
      const res = await pool.request()
        .input('Nombre',ctx.nombre)
        .execute('Proc_ValidaExisteNombre');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al validar nombre indicador');
    }
  },

  consultaExisteNombreGrupo: async(ctx) => {
    try {
      const pool = await poolPromise;
      const res = await pool.request()
        .input('Nombre',ctx.nombre)
        .execute('Proc_ValidaExisteNombreGrupo');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al validar nombre indicador');
    }
  },
  guardaConfiguracionBono: async(ctx) => {
    try {
      const pool = await poolPromise;
      const datos = ctx.request.body;
      let res = await pool.request()
        .input('IdConfiguracionBono',datos.idConfiguracionBono)
        .input('Grupo',datos.grupo)
        .input('Dias',datos.dias)
        .input('PuestosAsigandos',datos.puestosAsigandos)
        .input('IdUsuario',datos.idUsuario)
        .execute('Proc_guardaConfiguracionBono');

      res = await pool.request()
        .input('IdConfiguracionBono',0)
        .execute('Proc_ConsultaConfiguracionBonos');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar puestos configuracion de bonos');
    }
  },
  activarDesactivarConfiguracionBono: async(ctx) => {
    try {
      const pool = await poolPromise;
      
      let res = await pool.request()
      
        .input('IdConfiguracionBono',ctx.idConfiguracionBono)
        .input('Activo',ctx.Activo)
        .input('IdUsuario',ctx.idUsuario)
        .execute('spin_activadesactivaconfiguracionbono');

      res = await pool.request()
        .input('IdConfiguracionBono',0)
        .execute('Proc_ConsultaConfiguracionBonos');
      res.status=1;
      
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al desactivar o activar indicador');
    }
  },
  consultaEntregaIndicadores: async(ctx) => {
    try {
      const pool = await poolPromise;
      const res = await pool.request()
        .execute('spin_consultaentregaindicador');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar entrega de indicadores');
    }
  },
  guardaEntregaIndicador: async(ctx) => {
    try {
      const pool = await poolPromise;
      const datos = ctx.request.body;
      
      let res = await pool.request()
        .input('CalificacionRecursoId',datos.data)
        .input('IdUsuario',datos.idUsuario)
        .execute('spin_guardaentregaindicador');

      res = await pool.request()
        .execute('spin_consultaentregaindicador');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar puestos configuracion de bonos');
    }
  },
  consultaValoresEtiquetas: async(ctx) => {
    try {
      const pool = await poolPromise;
      const res = await pool.request()
        .execute('spin_consultavaloresetiquetaentregaindicador');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar entrega de indicadores');
    }
  },
  consultaDepartamentoDireccionPlazaPuestoRechum: async(ctx) => {
    try {
      const pool = await poolPromise;
      let responce={
        direccion:[],
        plaza:[],
        departamento:[],
        puesto:[],
      };
      const direccion = await pool.request()
        .input('Combo','DIRECCION')
        .execute('spgn_consultacombosrechum');

      responce.direccion.push(direccion.recordset);

      const plaza = await pool.request()
        .input('Combo','PLAZA')
        .execute('spgn_consultacombosrechum');

      responce.plaza.push(plaza.recordset); 

      const departamento = await pool.request()
        .input('Combo','DEPARTAMENTO')
        .execute('spgn_consultacombosrechum');

      responce.departamento.push(departamento.recordset);

      const puesto = await pool.request()
        .input('Combo','PUESTO')
        .execute('spgn_consultacombosrechum');

      responce.puesto.push(puesto.recordset);
      
      return responce;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar entrega de indicadores');
    }
  },









































































































































































































































































































  //empieza manuel
  /**
   * Promise para obtener las etapas de cobranza judicial.
   *
   * @return {Promise}
   */

  obtenerListadoPeriodos: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .execute('proc_obtenerPeriodos');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los periodos');
    }
  },
  cerrarPeriodo: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;
      const {
        request: {
          body: {
            id,
            idUsuario,
          }
        },
      } = ctx;

      const requestSQL = await pool.request()
        .input('PeriodoId', id)
        .input('UsuarioId', idUsuario)

        .execute('proc_cerrarPeriodo');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      // sql.close();
      console.log(err);
      return ctx.response.badRequest('Error al obtener los periodos');
    }
  },
  guardarPeriodo: async (ctx) => {
    const periodo = ctx.request.body;
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('Periodo', sql.VarChar('MAX'), JSON.stringify(periodo))
        .execute('proc_guardarPeriodo');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los periodos');
    }
  },
  editarPeriodo: async (ctx) => {

    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('idPeriodo', ctx.request.params.idPeriodo)
        .execute('proc_editarPeriodo');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al editar el periodo');
    }
  },
  consultarAnioPeriodo: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;
      const requestSQL = await pool.request()
        .input('id', ctx.request.params.id)
        .input('anioPeriodo', ctx.request.params.anioPeriodo)
        .execute('proc_existePeriodo');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al editar el periodo');
    }
  },
  obtenerCombos: async (ctx) => {
    try{
      let responseSQL = {
        status: '200',
        error: '',
        message: 'Exito',
        indicadores: [],
      };
      const pool = await poolPromiseServDesarrollo;

      const indicadores = await pool.request()
        .execute('proc_consultaIndicadores');

      const departamentos = await pool.request()
        .execute('proc_obtenerDepartamentos');

      const tipoIndicador = await pool.request()
        .execute('proc_obtenerTipoIndicador');

      const unidadMedida = await pool.request()
        .execute('proc_obtenerUnidadMedida');
    
      const reglaCondicion = await pool.request()
        .execute('proc_obtenerReglaCondicion');

      const modulos = await pool.request()
        .execute('proc_obtenerModulos');

      const corteIndicador = await pool.request()
        .execute('proc_obtenerCorteIndicador');

      responseSQL.indicadores = indicadores.recordset.filter(el => el.Activo).map(el => ({ value: el.id, label: el.Nombre }));
      responseSQL.departamentos = departamentos.recordset.map(el => ({ value: el.IdDepartamento, label: el.Nombre }));
      responseSQL.tipoIndicador = tipoIndicador.recordset.map(el => ({ value: el.IdTipoIndicador, label: el.Nombre }));
      responseSQL.unidadMedida = unidadMedida.recordset.map(el => ({ value: el.IdUnidadMedida, label: el.Nombre }));
      responseSQL.reglaCondicion = reglaCondicion.recordset.map(el => ({ value: el.IdCondicion, label: el.Nombre }));
      responseSQL.modulos = modulos.recordset.filter(el => el.Activo == 1).map(el => ({ value: el.ModuloId, label: el.NombreModulo }));
      responseSQL.corteIndicador = corteIndicador.recordset.filter(el => el.CortePeriodo == 0).map(el => ({ value: el.IdTipoCorte, label: el.Nombre }));
      responseSQL.cortePeriodo = corteIndicador.recordset.filter(el => el.CortePeriodo == 1).map(el => ({ value: el.IdTipoCorte, label: el.Nombre }));

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los catálogos');
    }
  },
  obtenerPuestosPorDepartamento: async (ctx) => {
    try{
      let responseSQL = {
        status: '200',
        error: '',
        message: 'Exito',
        puestos: [],
      };

      const pool = await poolPromiseServDesarrollo;

      const puestos = await pool.request()
        .input('idDepartamento', ctx.request.params.idDepartamento)
        .execute('proc_obtenerPuestosPorDepartamento');

      responseSQL.puestos = puestos.recordset.map(el => ({ value: el.IdPuesto, label: el.Nombre }));
     
      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los periodos');
    }
  },
  obtenerDependenciasPorModulo: async (ctx) => {
    try{
      let responseSQL = {
        status: '200',
        error: '',
        message: 'Exito',
        procedimientos: [],
        opciones: [],
      };

      const pool = await poolPromiseServDesarrollo;

      const procedimientos = await pool.request()
        .input('idModulo', ctx.request.params.idModulo)
        .execute('proc_obtenerProcedimientosPorModulo');

      const opciones = await pool.request()
        .input('idModulo', ctx.request.params.idModulo)
        .execute('proc_obtenerOpcionesPorModulo');

      responseSQL.opciones = opciones.recordset || [];

      responseSQL.procedimientos = procedimientos.recordset.map(el => ({ value: el.ProcedimientoId, label: el.Nombre })) || [];
     
      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los registros');
    }
  },
  obtenerDescripcionIndicador: async (ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('idIndicador', ctx.request.params.idIndicador)
        .execute('proc_obtenerDescripcionIndicador');
     
      return res;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los registros');
    }
  },
  guardarConfiguracionIndicador: async (ctx) => {
    const IndicadorDetalle = ctx.request.body.IndicadorDetalle;
    const pool = await poolPromiseServDesarrollo;
    try{
      let responseSQL = {};
      console.log(JSON.stringify(IndicadorDetalle));
      const requestSQL = await pool.request()
        .input('IndicadorDetalle', sql.VarChar('MAX'), JSON.stringify(IndicadorDetalle))
        .execute('spin_guardaindicadordetalle');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener los periodos');
    }
  },
  obtenerPuestoTotalIndicadores: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;
      const requestSQL = await pool.request()
        .execute('proc_obtenerPuestoTotalIndicadores');
     
      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
  
      return responseSQL;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener los registros');
    }
  },

  obtenerPesoTotalIndicadores: async (ctx) => {
    const {
      request: {
        params: {
          idDepartamento,
          idPuesto,
          idIndicadorDetalle,
        }
      }
    } = ctx;

    const pool = await poolPromiseServDesarrollo;

    try{

      if(idIndicadorDetalle === 0) {
        const res = await pool.request()
          .input('IdDepartamento', idDepartamento)
          .input('IdPuesto', idPuesto)
          .execute('spin_validapesoindicador');

        return res;
          
      } else {
        const res = await pool.request()
          .input('IdDepartamento', idDepartamento)
          .input('IdPuesto', idPuesto)
          .input('IdIndicadorDetalle', idIndicadorDetalle)
          .execute('spin_validapesoindicadorDetalle');

        return res;
      }

    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los registros');
    }
  },

  obtenerIndicadoresDepartamentoPuesto: async (ctx) => {
    const {
      request: {
        params: {
          idDepartamento,
          idPuesto,
          estatus,
        }
      }
    } = ctx;

    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;
      const requestSQL = await pool.request()
        .input('IdDepartamento', idDepartamento)
        .input('IdPuesto', idPuesto === 'null' ?  null : idPuesto)
        .input('Estatus', estatus)
        .execute('proc_obtenerIndicadoresPorDepartamentoPuesto');
     
      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los registros');
    }
  },

  activarDesactivarIndicador: async (ctx) => { 
    const {
      request: {
        body,
      }
    } = ctx;

    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;
      const requestSQL = await pool.request()
        .input('IndicadorActivaDesactiva', sql.VarChar('MAX'), JSON.stringify(body))
        // .input('IndicadorActivaDesactiva ', idDepartamento)
        .execute('spin_activardesactivarindicadordetalle');
     
      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los registros');
    }
  },

  obtenerDetalleIndicador: async (ctx) => { 
    const {
      request: {
        params: {
          idIndicador, 
          idDepartamento, 
          idPuesto,
        }
      }
    } = ctx;

    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;
      const requestSQL = await pool.request()
        .input('IdIndicadorDetalle', sql.Int, idIndicador)
        .input('IdDepartamento', sql.Int, idDepartamento)
        .input('IdPuesto', sql.Int, idPuesto)
        .execute('spin_consultaindicadordetalleid');
     
      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los registros');
    }
  },
  obtenerListadoEbitdas: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('Estatus', ctx.request.params.estatus)
        .execute('proc_obtenerEbitdas');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los periodos');
    }
  },

  actualizarEstatusEbitda: async (ctx) => {
    const {
      request: {
        body: {
          ebitdas,
          estatus,
          idUsuario,
        }
      }
    } = ctx;
  
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('EbitdasId', ebitdas)
        .input('Estatus', estatus)
        .input('UsuarioId', idUsuario)

        .execute('proc_actualizaEstatusEbitda');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los periodos');
    }
  },
  consultarAnioEbitda: async (ctx) => {
 
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;
      const requestSQL = await pool.request()
        .input('id', ctx.request.params.id)
        .input('anioEbitda', ctx.request.params.anioEbitda)
        .execute('proc_existeEbitda');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al consultar el año');
    }
  },
  guardarEbitda: async (ctx) => {
    const ebitda = ctx.request.body;
  
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('Ebitda', sql.VarChar('MAX'), JSON.stringify(ebitda))
        .execute('proc_guardarEbitda');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los periodos');
    }
  },
  editarEbitda: async (ctx) => {

    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .input('idEbitda', ctx.request.params.idEbitda)
        .execute('proc_editarEbitda');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al editar el periodo');
    }
  },
  obtenerJerarquias: async (ctx) => {

    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const requestSQL = await pool.request()
        .execute('proc_obtenerJerarquias');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener las jerarquías');
    }
  },
  actualizarEstatusJerarquia: async (ctx) => {
    const {
      request: {
        body: {
          status,
          dataIds,
          idUsuario,
        }
      },
    } = ctx;
    
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      await pool.request()
        .input('IdJerarquia', sql.VarChar('MAX'), dataIds.join(','))
        .input('Estatus', sql.VarChar(1), status)
        .input('IdUsuario', sql.VarChar(9), idUsuario)
        .execute('proc_ActualizarEstatusJerarquias');

      const requestJerarquiasSQL = await pool.request().execute('proc_obtenerJerarquias');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestJerarquiasSQL.recordset;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener las jerarquías');
    }
  },
  obtenerDepartamentosPuestos: async (ctx) => {

    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const departamentos = await pool.request()
      // .execute('proc_obtenerDepartamentosSinJerarquia');
        .execute('proc_obtenerDepartamentos');
     
      const puestos = await pool.request()
        .input('IdPuesto', sql.Int, null)
        .execute('proc_obtenerPuestos');
      
      const resultado = {
        departments: departamentos.recordset.map(el => ({ value: el.IdDepartamento, label: el.Nombre.trim(), referencia: 'DEP' })),
        positions: puestos.recordset.map(el => ({ id: el.IdPuesto, title: el.Nombre.trim(), idDepartamento: el.IdDepartamento, children: [], referencia: 'PUE' }))
      };
      
      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = resultado;

      return responseSQL;
    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener las jerarquías');
    }
  },
  guardarJerarquia: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const {
        request: {
          body,
        }
      } = ctx;

      body.selectedDepartment = body.selectedDepartment.join(',');
 
      const res = await pool.request()
        .input('Jerarquia', sql.VarChar('MAX'), JSON.stringify(body))
        .execute('proc_guardarJerarquia');
      
      const requestJerarquias = await pool.request()
        .execute('proc_obtenerJerarquias');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.hijos = res.recordset || [];
      responseSQL.data = requestJerarquias.recordset;
      
      return responseSQL;

    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener las jerarquías');
    }
  },
  editarJerarquias: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const {
        request: {
          params: {
            idJerarquia,
          }
        }
      } = ctx;
 
      const jerarquia = await pool.request()
        .input('JerarquiaId', idJerarquia)
        .execute('proc_editarJerarquia');

      if(jerarquia.recordset.length > 0){
        jerarquia.recordset[0].IdsDepartamento = jerarquia.recordset[0].IdsDepartamento.split(',').map(el => (
          {
            value: Number(el.split('-')[0]),
            label: el.split('-')[1],
          }
        ));
        jerarquia.recordset[0].Jerarquia = JSON.parse(jerarquia.recordset[0].Jerarquia);
      }
    
      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = jerarquia.recordset;
      
      return responseSQL;

    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener las jerarquías');
    }
  },
  obtenerNombreJerarquia: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromiseServDesarrollo;

      const {
        request: {
          params: {
            idJerarquia,
            nombre,
          }
        }
      } = ctx;
 
      const res = await pool.request()
        .input('id', idJerarquia)
        .input('nombre', nombre)
        .execute('proc_existeJerarquia');

      responseSQL.status = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = res.recordset;
      
      return responseSQL;

    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener las jerarquías');
    }
  },




































































































































































































































































































  //empieza javi
  indicadoresPorUsuario: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
     
      const res = await request
        .input('IdUsuario', sql.Int, ctx.params.idUsuario)
        .input('IdPeriodo', sql.Int, ctx.params.idPeriodo)
        .execute('spin_obtenerIndicadorPorUsuario');

      let datos = {
        vacio: true,
      };
      if(res.recordset.length > 0){
        const puntosTotal = sumBy(res.recordset, 'Puntos');
        const pesoTotal = sumBy(res.recordset, 'Peso');
        let evalTotal = res.recordset[0].CalificacionFinal;
        if(!evalTotal){
          evalTotal = ((puntosTotal / pesoTotal ) * 100).toFixed(2);
        }
        const agrupados = groupBy(res.recordset, 'IdTipoIndicador');
        const pesoCuan = sumBy(agrupados[1], 'Peso') === 0 ? '' : sumBy(agrupados[1], 'Peso');
        const pesoCual = sumBy(agrupados[2], 'Peso') === 0 ? '' : sumBy(agrupados[2], 'Peso');

        datos = {
          indicadores: agrupados,
          evalTotal,
          pesoTotal,
          pesoCuan,
          pesoCual,
          plaza: res.recordset[0].Plaza,
          puesto: res.recordset[0].Puesto,
          nombre: res.recordset[0].Usuario,
          fecEval: res.recordset[0].FechaEvaluacion,
          idPeriodo: res.recordset[0].PeriodoId,
          autorizador: res.recordset[0].Autorizador
        };
      }

      return datos;
      
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener los indicadores');
    }
  },
  obtenerParametrosReporte: async(ctx) => {
    try{
      const pool = await poolPromise;
      
      const periodo = await pool.request()
        .execute('spin_obtenerPeriodo');
      const direccion = await pool.request()
        .execute('spin_obtenerDireccionRechum');
      const plaza = await pool.request()
        .execute('proc_obtenerPlazas');
      const departamento = await pool.request()
        .execute('spin_obtenerDepartamentosRechum');
      const formato = await pool.request()
        .execute('spin_obtenerFormatoEvaluacion');

      const datos = {
        periodo: periodo.recordset,
        direccion: direccion.recordset,
        plaza: plaza.recordset,
        departamento: departamento.recordset,
        formato: formato.recordset,
      };
      
      return datos;
      
    } catch (err) {
      return ctx.response.badRequest('Error al obtener los parametros');
    }
  },
  obtenerReporteDireccion: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const datos = ctx.request.body;

      const res = await request
        .input('IdPeriodo', sql.Int, datos.idPeriodo)
        .input('IdDireccion', sql.Int, datos.idDireccion)
        .input('IdPlaza', sql.Int, datos.idPlaza)
        .input('IdDepartamento', sql.Int, datos.idDepartamento)
        .input('IdPuesto', sql.Int, datos.idPuesto)
        .input('IdFormato', sql.Int, datos.idFormato)
        .execute('spin_generarReporteDireccion');

      return res.recordset;
      
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al generar el reporte');
    }
  },
  guardarResultados: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      const archivosType = new sql.Table('Archivo');
      const indicadoresType = new sql.Table('IndicadorResultado');

      archivosType.columns.add('Id', sql.Int);
      archivosType.columns.add('IdArchivo', sql.Int);
      archivosType.columns.add('Ruta', sql.VarChar(255));
      archivosType.columns.add('Nombre', sql.VarChar(255));

      indicadoresType.columns.add('IdIndicador', sql.Int);
      indicadoresType.columns.add('Resultado', sql.Decimal(19,4));

      for (let i = 0; i < datos.indicadores.length; i+=1) {
        indicadoresType.rows.add(
          datos.indicadores[i].idIndicadorDetalle,
          datos.indicadores[i].resultado,
        );
      }

      const archivos = datos.archivos;
      
      for (let i = 0; i < archivos.length; i++) {
        archivosType.rows.add(
          i+1,
          null,
          archivos[i].ruta,
          archivos[i].nombre,
        );
      }
      
      const req = await pool.request()
        .input('IdUsuarioIndicador', sql.Int, datos.idUsuarioIndicador)
        .input('IdPeriodo', sql.Int, datos.idPeriodo)
        .input('IdPuesto', sql.Int, datos.idPuesto)
        .input('Observaciones', sql.VarChar(255), datos.observaciones)
        .input('IndicadorType', indicadoresType)
        .input('ArchivosType', archivosType)
        .input('IdUsuario', sql.Int, datos.idUsuario)
        .execute('spin_cambiarIndicadorPorUsuario');
      return req.recordset;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Ocurrió un error al guardar en la base de datos');
    }
  },
  obtenerHistorialIndicador: async(ctx) => {
    try{
      const pool = await poolPromise;
      const idUsuario = ctx.request.params.idUsuario;
     
      const req = await pool.request()
        .input('IdUsuario', sql.Int, idUsuario)
        .execute('spin_obtenerHistorial');
      return req.recordset;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Ocurrió un error al obtener los datos');
    }
  },
  autorizarIndicador: async(ctx) => {
    try{
      const pool = await poolPromise;
      const {
        request: {
          body: {
            idUsuario,
            idPeriodo,
          },
        },
      } = ctx;

      const req = await pool.request()
        .input('IdUsuario', sql.Int, idUsuario)
        .input('IdPeriodo', sql.Int, idPeriodo)
        .execute('spin_autorizarResultadoIndicador');
      return req.recordset;
      
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Ocurrió un error al guardar en la base de datos');
    }
  },
  obtenerPuestoEmpleados: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      const empleados = await pool.request()
        .input('IdPuesto', sql.Int, ctx.params.idPuesto)
        .execute('spin_obtenerEmpleadosPorPuesto');

      return empleados.recordset;

    }catch(err){
      return ctx.response.badRequest('Error al obtener los empleados');
    }
  },
  obtenerArchivosCambio: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      const archivos = await pool.request()
        .input('IdBitacoraCambio', sql.Int, ctx.params.idBitacoraCambio)
        .execute('spin_obtenerEvidenciasCambioIndicador');

      if(archivos.recordset.length >= 1){
        var zip = new JSZip();

        for(let i = 0; i < archivos.recordset.length; i++){
          zip.file(archivos.recordset[i].Nombre, request(archivos.recordset[i].Ruta));
        }

        const data = zip.generateAsync({type : 'nodebuffer'});

        return data;
      } else {
        return archivos.recordset;
      }

    }catch(err){
      return ctx.response.badRequest('Error al obtener los archivos');
    }
  },
  obtenerGrupos: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .execute('spin_obtenerGrupos');

      return res.recordset;

    }catch(err){
      return ctx.response.badRequest('Error al obtener los grupos');
    }
  }
};
