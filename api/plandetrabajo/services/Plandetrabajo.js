'use strict';

/**
 * Plandetrabajo.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const {
  poolPromiseServDesarrollo,
} = require('./../../../config/functions/bootstrap');

module.exports = {

  /**
   * Promise to fetch all plandetrabajos.
   *
   * @return {Promise}
   */

  obtenerPlantilla:async (ctx) => {
    try {
      const {
        IdPlantilla,
        IdProyecto,
        IdLineaBase,
        Copia,
        IdUsuario,
      } = ctx;
      
      const pool = await poolPromiseServDesarrollo;
      if(pool){

        const res = await pool.request() 
          .input('IdPlantilla', IdPlantilla)
          .input('IdProyecto', IdProyecto)
          .input('IdLineaBase', IdLineaBase)
          .input('Copia', Copia)
          .input('IdUsuario', IdUsuario)
          .execute('pt_obtenerPlantillaLineaBase');
        return res.recordsets;

      }else{
        return null;
      }
    } catch (error) {
      return error;
    }
  },

  obtPlantillas:async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      if(pool){
        const datos = ctx.params;
        const res = await pool.request() 
          .input('IdDepartamento', datos.IdDepartamento)
          .execute('pt_obtenerTicketPlantillas');
        return res.recordsets[0];

      }else{
        return null;
      }
    } catch (error) {
      return error;
    }
  },

  obtenerEmpleados:async () => {
    try {
      const pool = await poolPromiseServDesarrollo;
      if(pool){

        const res = await pool.request() 
          .execute('proc_obtenerEmpleados');
        return res.recordsets[0];

      }else{
        return null;
      }
    } catch (error) {
      return error;
    }
  },

  guardarProyecto: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const datos = ctx.request.body;
      
      const proyecto = await req
        .input('IdProyecto', datos.idProyecto)
        .input('IdPortafolio', datos.idPortafolio)
        .input('NombreProyecto', sql.VarChar(255), datos.nombreProyecto)
        .input('Color', sql.VarChar(50), datos.colorProyecto)
        .input('Tipo', sql.NVarChar(50), datos.IdPlantilla)
        .input('Prioridad', sql.VarChar(50), datos.prioridad)
        .input('Responsable', sql.VarChar(50), datos.empleado)
        .input('Estatus', sql.Int, datos.estatus)
        .input('IdUsuarioInserto',  datos.idUsuario )
        .input('IdAutorizador',  datos.autorizador )
        .input('IdPuesto', sql.Int, datos.IdPuesto )
        .execute('pt_guardarProyectoPDP');
      
      let msj = 'Portafolio generado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      return ctx.response.badRequest('Error al generar el portafolio');
    }
  },

  obtenerProyectos : async (ctx) => {
    try{      
      const pool = await poolPromiseServDesarrollo;
      const request = await pool.request();
      const res = await request
      
        .input('IdPortafolio',ctx.params._id)
        .input('IdUsuario',ctx.params._idUser)
        .execute('pt_obtenerProyectosPDP');
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },

  obtenerProyectosPendientes : async (ctx) => {
    try{      
      const pool = await poolPromiseServDesarrollo;
      const request = await pool.request();
      const res = await request
      
        .input('IdUsuario',ctx.params._id)
        .execute('pt_obtenerProyectosPendientesPDP');
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },

  
  cambiarProyectoEstatus : async (ctx) => {
    try{      
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdProyecto',ctx.params._IdProyecto)
        .input('IdLineaBase',ctx.params._IdLineaBase)
        .input('Estatus',ctx.params._IdEstatus)
        .execute('pt_cambiarEstatusAutorizacion');
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },

  
  obtenerProyectosPorFecha : async (ctx) => {
    try{      
      const datos = ctx.request.body;
      const pool = await poolPromiseServDesarrollo;
      const request = await pool.request();
      const res = await request
        .input('Portafolio', datos.IdPortafolio)
        .input('Responsable', datos.responsable)
        .input('Estatus', datos.estatus)
        .input('AutorizacionEstatus', datos.autorizacionEstatus)
        .input('IdUsuarioEnvia', datos.idUsuarioEnvia)
        .input('FechaInicio', datos.fechaInicio)
        .input('FechaFin', datos.fechaFin)
        .execute('pt_obtenerProyectosPorFechasPDP');
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },

  obtenerProyectosPorFechaPendientes : async (ctx) => {
    try{      
      const datos = ctx.request.body;
      const pool = await poolPromiseServDesarrollo;
      const request = await pool.request();
      const res = await request
        // .input('Portafolio', datos.IdPortafolio)
        .input('Responsable', datos.responsable)
        .input('Estatus', datos.estatus)
        .input('IdUsuarioEnvia', datos.idUsuarioEnvia)
        .input('FechaInicio', datos.fechaInicio)
        .input('FechaFin', datos.fechaFin)
        .execute('pt_obtenerProyectosPorFechasPendientesPDP');
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },

  obtenerEmpleadoPorId: async (ctx) => {
    try{

      const pool = await poolPromiseServDesarrollo;
      const request = await pool.request();
      const res = await request
      
        .input('IdEmpleado', ctx.params._id)
        .execute('proc_obtenerEmpleadosPorId');
      return res;
    } catch (err) {
      return ctx.response.badRequest('Error Al Obtener Los Empleados');
    }

  },

  obtenerCatalogosPDP: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        // .input('Catalogo', Catalogo)
        .execute('pt_obtenerCatalogosPDP');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },
  obtenerEmpleadosPDP: async (ctx) => {
    try {
      const {
        Tipo,
        Plaza,
        Departamento,
        Puesto,
      } = ctx;
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('Tipo',Tipo)
        .input('Plaza', Plaza)
        .input('Departamento', Departamento)
        .input('Puesto', Puesto)
        .execute('pt_filtrarEmpleados');
      return res.recordsets[0];
    } catch (error) {
      return ctx.response.badRequest('Error al obtener empleados PDP');
    }
  },
  obtenerEmpleadosDepartamento: async (ctx) => {
    try {
      const {
        Plaza,
        Departamento,
        Puesto,
      } = ctx;
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('Plaza', Plaza)
        .input('Departamento', Departamento)
        .input('Puesto', Puesto)
        .execute('pt_obtenerEmpleadoPDP');
      return res.recordsets[0];
    } catch (error) {
      return ctx.response.badRequest('Error al obtener empleados PDP');
    }
  },
  guardarLineaBase: async (ctx) => {
    try {
      const {
        IdLineaBase,
        IdProyecto,
        IdPlantilla,
        Componentes,
        ComponentesExtras,
        CabecerasExtras,
        CabeceraComponente,
        arrColumnaComponente,
        arrCabeceraEtapas,
      } = ctx;
      
      const lineaBaseType = new sql.Table('LineaBase');
      lineaBaseType.columns.add('IdDetalle', sql.Int);
      lineaBaseType.columns.add('Nombre', sql.NVarChar(200));
      lineaBaseType.columns.add('IdTicket', sql.Int);
      lineaBaseType.columns.add('Avance', sql.Int);
      lineaBaseType.columns.add('Padre', sql.Bit);
      lineaBaseType.columns.add('Recurso', sql.Int);
      lineaBaseType.columns.add('NomRecurso', sql.NVarChar(200));
      lineaBaseType.columns.add('NumOrdenamiento', sql.Int);
      lineaBaseType.columns.add('Dependencia', sql.NVarChar(50));
      lineaBaseType.columns.add('Configuracion', sql.NVarChar(sql.MAX));
      lineaBaseType.columns.add('Orden', sql.Int);
      lineaBaseType.columns.add('Copia', sql.Bit);

      Componentes[0].map((componente) => {
        lineaBaseType.rows.add(
          componente.IdDetalle,
          componente.Configuracion[0].config.valor,
          componente.IdTicket,
          componente.Avance,
          componente.Padre,
          componente.Recurso,
          componente.NomRecurso,
          componente.NumOrdenamiento,
          componente.Dependencia,
          JSON.stringify(componente.Configuracion),
          componente.Orden,
          componente.Copia,
          
        );
      });

      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdLineaBase', IdLineaBase)
        .input('IdProyecto', IdProyecto)
        .input('IdPlantilla', IdPlantilla)
        .input('LineaBaseType', lineaBaseType)
        .input('CabecerasExtras', JSON.stringify(CabecerasExtras))
        .input('ComponentesExtras', JSON.stringify(ComponentesExtras))
        .input('CabeceraComponente', JSON.stringify(CabeceraComponente))
        .input('arrColumnaComponente', JSON.stringify(arrColumnaComponente))
        .input('arrCabeceraEtapas', JSON.stringify(arrCabeceraEtapas))
        .execute('pt_guardarLineaBase');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al guardar linea base');
    }
  },

  obtenerAutorizador: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdDepartamento', ctx.params._idDepartamento)
        .input('Puesto', ctx.params._idPuesto)
        .execute('pt_obtenerJerarquia');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },
  invitarAmigo: async (ctx) => {
    console.log(ctx,'NOTICIAS');
    
    try {
      const {
        Recurso,
        IdPortafolio,
        IdProyecto,
      } = ctx;
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('Recurso', Recurso)
        .input('IdPortafolio', IdPortafolio)
        .input('IdProyecto', IdProyecto)
        .execute('pt_invitarAmigo');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },
  enviarLineaBase: async (ctx) => {
    try {
      const {
        IdProyecto,
        IdLineaBase,
      } = ctx;
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdProyecto', IdProyecto)
        .input('IdLineaBase', IdLineaBase)
        .execute('pt_enviarLineaBase');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },
  editarLineaBase: async (ctx) => {
    try {
      const {
        IdLineaBase,
        IdProyecto,
      } = ctx;
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdLineaBase', IdLineaBase)
        .input('IdProyecto', IdProyecto)
        .execute('pt_generarCopiaLineaBase');
      return res.recordsets;
    } catch (error) {
      //
    }
  },
  cancelarCopiaLineaBase: async (ctx) => {
    try {
      const {
        IdProyecto,
        IdLineaBase,
      } = ctx;
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdProyecto', IdProyecto)
        .input('IdLineaBase', IdLineaBase)
        .execute('pt_cancelarCopiaLineaBase');
      return res.recordsets;
    } catch (error) {
      //
    }
  },
  
  guardarObservaciones: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const datos = ctx.request.body;
     
      const observacion = await req
        .input('IdProyecto', datos.idProyecto)
        .input('IdLineaBase', datos.IdLineaBase)
        .input('Observacion', sql.VarChar(300), datos.observacion)
        .execute('pt_guardarObservacion');
      
      let msj = 'Observacion generada correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      return ctx.response.badRequest('Error al generar la observacion');
    }
  },

  obtenerObservaciones: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdProyecto', ctx.params._idProyecto)
        .execute('pt_obtenerObservacionesPDP');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },

  guardarImpactosDocumentos: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const datos = ctx.request.body;
      
      const documento = await req
        .input('IdImpactoDocumento', datos.idImpactoDocumento)
        .input('IdProyecto',sql.Int, datos.IdProyecto)
        .input('Nombre', sql.VarChar(255), datos.nombreDocumentos)
        .input('Objetivo', sql.NVarChar(255), datos.objetivoDocumentos)
        .input('Real', sql.Int, datos.realDocumentos)
        .input('Unidad', sql.NVarChar(255), datos.unidadDocumentos)
        .input('Cumplimiento', sql.Int, datos.cumplimientoDocumentos)
        .input('Ponderacion', sql.Int, datos.ponderacionDocumentos)
        .input('Calificacion', sql.Int, datos.calificacion)
        .input('Condicion', sql.NVarChar(50), datos.condicionDocumentos)
        .execute('pt_guardarImpactosDocumentos');
      
      
      let msj = 'Registro generado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      return ctx.response.badRequest('Error al generar el registro');
    }
  },

  obtenerImpactosDocumentos: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo; 
      const res = await pool.request()
        .input('IdProyecto', ctx.params._IdProyecto)
        .execute('pt_obtenerImpactosDocumentosPDP');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },

  guardarImpactosRiesgos: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();
      const datos = ctx.request.body;
      
      const documento = await req
        .input('IdImpactoRiesgo', datos.IdImpactoRiesgo)
        .input('IdProyecto',sql.Int, datos.IdProyecto)
        .input('Nombre', sql.VarChar(255), datos.nombreDocumentos)
        .input('Objetivo', sql.NVarChar(255), datos.objetivoDocumentos)
        .input('Real', sql.Int, datos.realDocumentos)
        .input('Unidad', sql.NVarChar(255), datos.unidadDocumentos)
        .input('Cumplimiento', sql.Int, datos.cumplimientoDocumentos)
        .input('Ponderacion', sql.Int, datos.ponderacionDocumentos)
        .input('Calificacion', sql.Int, datos.calificacion)
        .input('Condicion', sql.NVarChar(50), datos.condicionDocumentos)
        .execute('pt_guardarImpactosRiesgosPDP');
      
      
      let msj = 'Registro generado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;  
    } catch (error) {
      return ctx.response.badRequest('Error al generar el registro');
    }
  },

  obtenerImpactosRiesgos: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo; 
      const res = await pool.request()
        .input('IdProyecto', ctx.params._IdProyecto)
        .execute('pt_obtenerImpactosRiesgosPDP');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },
  
  cambiarEstatusImpactos : async (ctx) => {
    try{      
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdProyecto',ctx.params._IdProyecto)
        .execute('pt_cambiarEstatusImpacto');
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },
  cambiarEstatusProyecto: async (ctx) => {
    try{      
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdProyecto',ctx.params._IdProyecto)
        .input('Estatus',ctx.params.Estatus)
        .execute('pt_cambiarEstatusProyecto');
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },

  obtenerLineasBasesPorProyecto: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo; 
      const res = await pool.request()
        .input('IdProyecto', ctx.params._IdProyecto)
        .input('IdLineaBaseActiva', ctx.params.IdLineaBaseActiva)
        .execute('pt_obtenerLineaBasePorProyecto');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },

  cambiarEstatusTicket: async (ctx) => {
    try{      
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdTicket',ctx.params.IdTicket)
        .input('Estatus',ctx.params.Estatus)
        .execute('pt_cambiarEstatusTcket');
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },

  cambiarEstatusImpactosDocumentos: async (ctx) => {
    try{      
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdImpacto',ctx.params.IdImpacto)
        .execute('pt_cambiarEstatusImpactoDocumentos');

      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },

  cambiarEstatusImpactosRiesgos: async (ctx) => {
    try{      
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdImpacto',ctx.params.IdImpacto)
        .execute('pt_cambiarEstatusImpactoRiesgos');
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },

  obtenerTicket: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo; 
      const res = await pool.request()
        .input('IdTicket', ctx.params.IdTicket)
        .execute('pt_obtenerTicketPDP');

      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },
  obtenerTicketsCancelacion: async (ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo; 
      const res = await pool.request()
        .input('IdProyecto', ctx.params.IdProyecto)
        .execute('pt_obtenerTicketsCancelacion');

      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },
  obtenerJefeId: async(ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo; 
      const request = await pool.request();
      const res = await request
        .input('IdPuesto', ctx.params.IdPuesto)
        .execute('pt_obtenerIdJefeAreaPDP');

      return res;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener catalogos PDP');
    }
  },
};
