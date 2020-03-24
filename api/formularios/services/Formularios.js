'use strict';

/**
 * Formularios.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
// const _ = require('lodash');
// const toNumber = require('lodash/toNumber');
// Public dependencies.
const sql = require('mssql');
const { 
  poolPromise,
  // poolPromiseServDesarrollo,
} = require('./../../../config/functions/bootstrap');
// const upperText = (nombre) =>
//   nombre.replace(/\w\S*/g, (txt) => 
//     txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
module.exports = {

  /**
   * Promise to fetch all formularios.
   *
   * @return {Promise}
   */
  detalleAsignacion: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
 
      const res = await req
        .input('IdAsignacionFormulario', ctx.params._id)
        .execute('proc_obtenerAsignacionFormularioDetalle');
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener el detalle de la asignación');
    }
  },

  obtenerEstatusFormulario: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      let idAsignacion;

      if(ctx.params._idAsignacion == 'null') {
        idAsignacion = null;
      } else {
        idAsignacion = ctx.params._idAsignacion;
      }
      
      const res = await req
        .input('IdAsignacion', idAsignacion)
        .input('IdUsuario', ctx.params._idUsuario)
        .input('IdFormulario', ctx.params._idFormulario)
        .execute('proc_obtenerEstatusFormulario');
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener el estatus del formulario');
    }
  },

  obtenerTiposPreguntas: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        // .input('IdProveedor', sql.Int, null)
        .execute('proc_obtenerTiposPreguntas');
      return res.recordsets[0];
    } catch (err) {
      return ctx.response.badRequest('Error al obtener los tipo de preguntas');
    }
  },
  
  fetchAll: async(ctx,ignorarUsuario) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      let usuario=datos.idUsuario;
      if(ignorarUsuario){
        usuario=null;
      }
      const res = await req
        .input('IdUsuario', sql.Int,usuario)
        .execute('proc_obtenerConfiguracionFormulario');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los Formularios');
    }
  },

  obtenerUsuariosEvaluar: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const res = await req
        .input('IdAsignacion', ctx.params._idAsignacion)
        .input('IdUsuarioCreacion', ctx.params._idUsuario)
        .execute('proc_obtenerUsuariosEvaluar');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los usuarios a evaluar');
    }
  },

  asignaciones: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req
        .input('IdResponsable', ctx.params._idResponsable) 
        .execute('proc_obtenerAsignacionFormulario');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener las asignaciones');
    }
  },

  createAsignacion: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;

      const fechaInicioValida = datos.campos.fechaInicio.valor !== null ? new Date(datos.campos.fechaInicio.valor) : null;
      const fechaFinValida = datos.campos.fechaFinal.valor !== null ? new Date(datos.campos.fechaFinal.valor) : null;
      
      const asignacion = await req
        .input('IdFormulario', sql.Int, datos.campos.formulario.valor.value)
        .input('Nombre', sql.VarChar(50), datos.campos.descripcion.valor)
        .input('FechaInicio', sql.Date, fechaInicioValida)
        .input('FechaFin', sql.Date, fechaFinValida)
        .input('Estatus', sql.VarChar(50), 'REFCOM')
        .input('IdUsuario', sql.Int, datos.usuario.UsuarioId)
        .execute('proc_guardarAsignacionFormulario');

      for (let i = 0; i < datos.asignaciones.length; i++) {
        const req2 = await pool.request();
        const asignacionDetalle = await req2
          .input('IdAsignacionFormulario', sql.Int, asignacion.recordset[0]['AsignacionFormularioId'])
          .input('IdUsuario', sql.Int, datos.asignaciones[i].IdUsuario)
          .input('Seleccionado', sql.Bit, datos.asignaciones[i].Seleccionado)
          .input('IdUsuarioCreacion', sql.Int, datos.usuario.UsuarioId)
          .execute('proc_guardarAsignacionFormularioDetalle');
          
        if (datos.campos.formulario.valor.referencia === 'REFEVA' || datos.requiereValidacion) {
          for (let j = 0; j < datos.asignaciones[i].Tablas.asignaciones.datos.length; j++) {
            const req3 = await pool.request();
            await req3
              .input('IdAsignacionFormularioDetalle', sql.Int, asignacionDetalle.recordset[0]['AsignacionFormularioDetalleId'])
              .input('IdUsuario', sql.Int, datos.asignaciones[i].Tablas.asignaciones.datos[j].IdUsuario)
              .input('Seleccionado', sql.Bit, datos.asignaciones[i].Tablas.asignaciones.datos[j].Seleccionado)
              .input('IdUsuarioCreacion', sql.Int, datos.usuario.UsuarioId)
              .execute('proc_guardarAsignacionFormularioUsuario');
          }
        }
      }

      let msj = 'Movimiento guardado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar la asignacion');
    }
  },

  validarFormulario: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      await req
        .input('IdAsignacion', sql.Int, datos.idAsignacion)
        .input('IdUsuario', sql.Int, datos.usuario)
        .input('Comentario', sql.VarChar(100), datos.comentario)
        .input('Estatus', sql.VarChar(50), datos.estatus)
        .input('IdUsuarioCreacion', sql.Int, datos.usuarioCreacion)
        .execute('proc_guardarAprobacionFormulario');

      let msj = 'La validación del formulario se realizo correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al realizar la validación');
    }
  },

  updateAsignacion: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const req4 = await pool.request();
      const datos = ctx.request.body;

      const fechaInicioValida = datos.campos.fechaInicio.valor !== null ? new Date(datos.campos.fechaInicio.valor) : null;
      const fechaFinValida = datos.campos.fechaFinal.valor !== null ? new Date(datos.campos.fechaFinal.valor) : null;
      
      await req
        .input('IdAsignacion', sql.Int, datos.idAsignacion)
        .input('IdFormulario', sql.Int, datos.campos.formulario.valor.value)
        .input('Nombre', sql.VarChar(50), datos.campos.descripcion.valor)
        .input('FechaInicio', sql.Date, fechaInicioValida)
        .input('FechaFin', sql.Date, fechaFinValida)
        .input('Estatus', sql.VarChar(50), 'REFCOM')
        .input('IdUsuario', sql.Int, datos.usuario.UsuarioId)
        .execute('proc_actualizarAsignacionFormulario');
        
      await req4
        .input('IdAsignacionFormulario', sql.Int, datos.idAsignacion)
        .execute('proc_eliminarAsignacionFormularioDetalle');

      for (let i = 0; i < datos.asignaciones.length; i++) {
        const req2 = await pool.request();
        const asignacionDetalle = await req2
          .input('IdAsignacionFormulario', sql.Int, datos.idAsignacion)
          .input('IdAsignacionFormularioDetalle', sql.Int, datos.asignaciones[i].IdAsignacionDetalle)
          .input('IdUsuario', sql.Int, datos.asignaciones[i].IdUsuario)
          .input('Seleccionado', sql.Bit, datos.asignaciones[i].Seleccionado)
          .input('Update', sql.Bit, datos.asignaciones[i].update)
          .input('IdUsuarioCreacion', sql.Int, datos.usuario.UsuarioId)
          .execute('proc_actualizarAsignacionFormularioDetalle');

        const req5 = await pool.request();
        await req5
          .input('IdAsignacionFormularioDetalle', sql.Int, datos.asignaciones[i].IdAsignacionDetalle)
          .execute('proc_eliminarAsignacionFormularioUsuario');
          
        if (datos.campos.formulario.valor.referencia === 'REFEVA' || datos.requiereValidacion) {
          for (let j = 0; j < datos.asignaciones[i].Tablas.asignaciones.datos.length; j++) {
            const req3 = await pool.request();
            await req3
              .input('IdAsignacionFormularioDetalle', sql.Int, datos.asignaciones[i].IdAsignacionDetalle || asignacionDetalle.recordset[0]['AsignacionFormularioDetalleId'])
              .input('IdAsignacionFormularioUsuario', sql.Int, datos.asignaciones[i].Tablas.asignaciones.datos[j].IdAsignacionUsuario)
              .input('IdUsuario', sql.Int, datos.asignaciones[i].Tablas.asignaciones.datos[j].IdUsuario)
              .input('Seleccionado', sql.Bit, datos.asignaciones[i].Tablas.asignaciones.datos[j].Seleccionado)
              .input('Update', sql.Bit, datos.asignaciones[i].Tablas.asignaciones.datos[j].update)
              .input('IdUsuarioCreacion', sql.Int, datos.usuario.UsuarioId)
              .execute('proc_actualizarAsignacionFormularioUsuario');
          }
        }
      }

      let msj = 'Asignación guardada correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar la asignación');
    }
  },
  
  obtenerFormulariosTipo: async (ctx,tipo) => {
    try{  
      let datos;

      if (tipo){
        datos = ctx;
      }else{
        datos = ctx.request.body;
      }
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdUsuario', sql.Int, datos.usuario)
        .input('TipoFormulario', sql.VarChar(10), datos.tipoFormulario)
        .execute('proc_obtenerFormulariosTipo');
      return res.recordset;
    } catch(err) {
      if(ctx.response){
        return ctx.response.badRequest('Error al obtener las configuraciones');
      }else{
        console.log('err',err);
        return ctx;
      }
      
    }
  },

  obtenerDetalleFormulario: async (ctx) => {
    try{  
      const response = {
        formulario: [],
        formularioSeccion: [],
        formularioPregunta: [],
        formularioPreguntaDetalle: [],
        usuariosAutorizados: [],
      };
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdFormulario', sql.VarChar(10), ctx.params._idFormulario)
        .execute('proc_obtenerDetalleFormulario');

      response.formulario = res.recordsets[0];
      response.formularioSeccion = res.recordsets[1];
      response.formularioPregunta = res.recordsets[2];
      response.formularioPreguntaDetalle = res.recordsets[3];
      response.usuariosAutorizados = res.recordsets[4];

      return response;
    } catch(err) {
      return ctx.response.badRequest('Error al obtener el detalle de formulario');
    }
  },
  obtenerPreguntasFormulario: async (ctx) => {
    try{  
      const response = {
        formulario: [],
        formularioSeccion: [],
        formularioPregunta: [],
        formularioPreguntaDetalle: [],
      };


      const datos = ctx.request.body;
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdAsignacion', sql.VarChar(10), datos.idFormulario)
        .input('IdUsuario', sql.Int, datos.usuario)
        .input('UsuarioEvaluar', sql.Int, datos.usuarioEvaluar)
        .execute('proc_obtenerPreguntasFormulario');

      response.formulario = res.recordsets[0];
      response.formularioSeccion = res.recordsets[1];
      response.formularioPregunta = res.recordsets[2];
      response.formularioPreguntaDetalle = res.recordsets[3];

      return response;
    } catch(err) {
      return ctx.response.badRequest('Error al obtener el detalle de formulario');
    }
  },
  eliminarFormulario: async(ctx) => {
    try{
      const datos = ctx.request.body;
      let response = {
        datos: [],
        message: '',
      };
      
      const idFormulario = datos.idFormulario;
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdFormulario', sql.Int, idFormulario)
        .execute('proc_eliminarConfiguracionFormulario');

      response.datos = await strapi.services.formularios.fetchAll(ctx,true);
      response.message = res.recordset.length > 0 ? 
        'Se ha eliminado correctamente' : 
        'Hubo un error al eliminar la configuración del formulario';
      ctx.response.status = res.recordset.length > 0 ? 200 : 404;
      return response;
    } catch (err) {
      return ctx.response.badRequest('Hubo un error al eliminar la configuración del formulario');
    }
  },

  guardarConfiguracionFormulario: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      const transaction = await pool.transaction();
      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            const confFormularioType = new sql.Table;
            const seccionType = new sql.Table;
            const preguntaType = new sql.Table;
            const usuariosAutorizadosType = new sql.Table;
            const preguntaDetalleType = new sql.Table;
            
          
            confFormularioType.columns.add('ConfiguracionFormularioId', sql.Int);
            confFormularioType.columns.add('Nombre', sql.VarChar(255));
            confFormularioType.columns.add('Descripcion', sql.VarChar(255));
            confFormularioType.columns.add('TipoFormulario', sql.VarChar(255));
            confFormularioType.columns.add('Validacion', sql.Bit);
            confFormularioType.columns.add('Referencia', sql.VarChar(255));
            confFormularioType.columns.add('PermiteEditar', sql.Bit);
            confFormularioType.columns.add('PermiteCapturaLibre', sql.Bit);

            seccionType.columns.add('FormularioSeccionId', sql.Int);
            seccionType.columns.add('IdConfiguracionFormulario', sql.Int);
            seccionType.columns.add('Nombre', sql.VarChar(255));
            seccionType.columns.add('Descripcion', sql.NVarChar(sql.MAX));
            seccionType.columns.add('Orden', sql.Int);
            seccionType.columns.add('Color', sql.VarChar(30));

            preguntaType.columns.add('FormularioPreguntaId', sql.Int);
            preguntaType.columns.add('IdFormularioSeccion', sql.Int);
            preguntaType.columns.add('Nombre', sql.VarChar(255));
            preguntaType.columns.add('Orden', sql.Int);
            preguntaType.columns.add('TipoPregunta', sql.VarChar(255));
            preguntaType.columns.add('SolicitarRespuesta', sql.Bit);
            preguntaType.columns.add('TieneCalificacion', sql.Bit);

            usuariosAutorizadosType.columns.add('UsuariosAutorizadosFormularioId', sql.Int);
            usuariosAutorizadosType.columns.add('IdConfiguracionFormulario', sql.Int);
            usuariosAutorizadosType.columns.add('IdUsuarioAutorizado', sql.Int);

            preguntaDetalleType.columns.add('FormularioPreguntaDetalleId', sql.Int);
            preguntaDetalleType.columns.add('IdFormularioPregunta', sql.Int);
            preguntaDetalleType.columns.add('Nombre', sql.VarChar(255));
            preguntaDetalleType.columns.add('Orden', sql.Int);
            preguntaDetalleType.columns.add('Valor', sql.Int);
            preguntaDetalleType.columns.add('ValorInvertido', sql.Int);
            preguntaDetalleType.columns.add('Requerido', sql.Bit);
            preguntaDetalleType.columns.add('Archivo', sql.Bit);
            preguntaDetalleType.columns.add('Invertido', sql.Bit);
            preguntaDetalleType.columns.add('Captura', sql.Bit);
            preguntaDetalleType.columns.add('EsOpcion', sql.Bit);
            preguntaDetalleType.columns.add('NoAplica', sql.Bit);

            const confFormulario = datos.configuracionFormulario;
            const preguntas = datos.preguntas;
            const usuariosAutorizados = datos.usuariosAutorizados;
            // const preguntasDetalle = datos.preguntasDetalle;
            let idNumeroSeccion=0;
            let indexSeccion=0;
            let idSeccion = 0;
            let idPregunta = 0;
            confFormularioType.rows.add(
              confFormulario.idConfiguracion || null,
              confFormulario.titulo,
              confFormulario.descripcion,
              confFormulario.tipoFormulario,
              confFormulario.validacion,
              '',
              confFormulario.permiteEditar,
              confFormulario.permiteCapturaLibre,
            );

            for (let i = 0; i < usuariosAutorizados.length; i++) {
              usuariosAutorizadosType.rows.add(
                usuariosAutorizados[i].UsuariosAutorizadosFormularioId || null,
                confFormulario.idConfiguracion || null,
                usuariosAutorizados[i].UsuarioId,
              );
            }

            for (let i = 0; i < preguntas.length; i++) {
              if(preguntas[i].tipoPregunta === 'SECCION'){
                indexSeccion=i;
                idNumeroSeccion++;
                seccionType.rows.add(
                  preguntas[i].idSeccion || null,
                  confFormulario.idConfiguracion || null,
                  preguntas[i].nombreSeccion,
                  preguntas[i].descripcionSeccion,
                  idNumeroSeccion,
                  preguntas[i].colorSeccion,
                );
                if(!preguntas[i].idSeccion)
                  idSeccion++;
              }else{
                preguntaType.rows.add(
                  preguntas[i].idPregunta || null,
                  preguntas[indexSeccion].idSeccion || idSeccion,
                  preguntas[i].nombrePregunta,
                  i+1, // orden
                  preguntas[i].tipoPregunta,
                  preguntas[i].solicitarRespuesta ? 1 : 0,
                  preguntas[i].tieneCalificacion ? 1 : 0,
                );
      
                const nombrePregunta = preguntas[i].nombrePregunta;
                if(!preguntas[i].idPregunta)
                  idPregunta++;
      
                for (let j = 0; j < preguntas[i].datosPreguntas.length; j++) {
                  preguntaDetalleType.rows.add(
                    preguntas[i].datosPreguntas[j].idPreguntaDetalle || null,
                    preguntas[i].idPregunta || idPregunta,
                    preguntas[i].tipoPregunta === 'PA'?nombrePregunta:preguntas[i].datosPreguntas[j].nombre,
                    j+1,// orden
                    preguntas[i].datosPreguntas[j].valor,
                    null,
                    preguntas[i].datosPreguntas[j].requerido,
                    preguntas[i].datosPreguntas[j].archivo,
                    preguntas[i].datosPreguntas[j].invertido,
                    preguntas[i].datosPreguntas[j].captura,
                    false,
                    preguntas[i].datosPreguntas[j].noAplica,
                  );
                }
                if(preguntas[i].tipoPregunta === 'CVO'){
                  for (let k = 0; k < preguntas[i].datosOpciones.length; k++) {
                    preguntaDetalleType.rows.add(
                      preguntas[i].datosOpciones[k].idPreguntaDetalle || null,
                      preguntas[i].idPregunta || idPregunta,
                      preguntas[i].datosOpciones[k].nombre,
                      k+1,// orden
                      preguntas[i].datosOpciones[k].valor,
                      preguntas[i].datosOpciones[k].valorInvertido,
                      false,
                      false,
                      false,
                      false,
                      true,
                      preguntas[i].datosOpciones[k].noAplica,
                    );
                  }
                }
              }
            }

            const req = transaction.request()
              .input('ConfiguracionFormularioType', confFormularioType)
              .input('FormularioSeccionType',seccionType)
              .input('FormularioPreguntaType',preguntaType)
              .input('FormularioPreguntaDetalleType', preguntaDetalleType)
              .input('UsuariosAutorizadosType', usuariosAutorizadosType)
              .input('IdUsuario', sql.Int, datos.idUsuario)
              .execute('proc_guardarFormulario');
          
            Promise.resolve(req)
              .then(async () => {
                await transaction.commit();
                const res = await strapi.services.formularios.fetchAll(ctx,true);
                await resolve(res);
              })
              .catch( (err) => {
                // console.log('error', err);
                transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
                reject('Ocurrio un error al guardar el formulario');
              });

          } catch(error) {
            console.log(error);
            await transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
            reject('Hubo un error al ejecutar el procedimiento almacenado');
          }
        });
      });
      return Promise.resolve(prom)
        .then(r => {
          return r;
        })
        .catch(err => ctx.response.badRequest(err));
    } catch (err) {
      return ctx.response.badRequest('Error al guardar la configuración de formulario');
    }
  },

  guardarRespuestasFormulario: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      const transaction = await pool.transaction();
      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            const archivosType = new sql.Table('ArchivoInventario');
            const respuestaSeccionType = new sql.Table;
            const respuestaPreguntaType = new sql.Table;
            const respuestaPreguntaDetalleType = new sql.Table;

            archivosType.columns.add('Id', sql.Int);
            archivosType.columns.add('IdArchivo', sql.Int);
            archivosType.columns.add('Ruta', sql.VarChar(255));
            archivosType.columns.add('Nombre', sql.VarChar(255));
            archivosType.columns.add('IdOrigen', sql.Int); 

            respuestaSeccionType.columns.add('FormularioRespuestaSeccionId', sql.Int);
            respuestaSeccionType.columns.add('IdFormularioRespuesta', sql.Int);
            respuestaSeccionType.columns.add('IdFormularioSeccion', sql.Int);
            respuestaSeccionType.columns.add('Calificacion', sql.Float);

            respuestaPreguntaType.columns.add('FormularioRespuestaPreguntaId', sql.Int);
            respuestaPreguntaType.columns.add('IdFormularioRespuestaSeccion', sql.Int);
            respuestaPreguntaType.columns.add('IdFormularioPregunta', sql.Int);
            respuestaPreguntaType.columns.add('Calificacion', sql.Float);
            respuestaPreguntaType.columns.add('Respondido', sql.Bit);

            respuestaPreguntaDetalleType.columns.add('FormularioRespuestaPreguntaDetalleId', sql.Int);
            respuestaPreguntaDetalleType.columns.add('IdFormularioRespuestaPregunta', sql.Int);
            respuestaPreguntaDetalleType.columns.add('IdFormularioPreguntaDetalle', sql.Int);
            respuestaPreguntaDetalleType.columns.add('IdRespuesta', sql.Int);
            respuestaPreguntaDetalleType.columns.add('IdArchivo', sql.Int);
            respuestaPreguntaDetalleType.columns.add('ValorTexto', sql.NVarChar(sql.MAX));
            respuestaPreguntaDetalleType.columns.add('Estatus', sql.VarChar(50));
            respuestaPreguntaDetalleType.columns.add('Calificacion', sql.Float);


            const preguntas = datos.preguntas;

            // const preguntasDetalle = datos.preguntasDetalle;
            let indexRespuestaSeccion=0;
            let idRespuestaSeccion = 0;
            let idRespuestaPregunta = 0;
            const archivos = datos.archivos;
            const datosUsuario = {
              tipoFormulario:datos.tipoFormulario,
              usuario:datos.idUsuario,
            };
            for (let i = 0; i < archivos.length; i++) {
              archivosType.rows.add(
                i+1,
                archivos[i].idArchivo,
                archivos[i].rutaArchivo,
                archivos[i].name,
                archivos[i].idPreguntaDetalle,
              );
            }
            for (let i = 0; i < preguntas.length; i++) {
              if(preguntas[i].tipoPregunta === 'SECCION'){
                indexRespuestaSeccion=i;
                // idNumeroSeccion++;
                respuestaSeccionType.rows.add(
                  preguntas[i].idRespuestaSeccion || null,
                  datos.idRespuesta || null,
                  preguntas[i].idSeccion,
                  preguntas[i].calificacion*100
                );
                if(!preguntas[i].idRespuestaSeccion)
                  idRespuestaSeccion++;
              }else{
                respuestaPreguntaType.rows.add(
                  preguntas[i].idRespuestaPregunta || null,
                  preguntas[indexRespuestaSeccion].idRespuestaSeccion || idRespuestaSeccion, //hecho bolas aqui
                  preguntas[i].idPregunta,
                  preguntas[i].calificacion*100,
                  true,
                );
      
                // Considerar el caso que aveces es una sola respuesta y construir la respuesta aqui n_n
                if(!preguntas[i].idRespuestaPregunta)
                  idRespuestaPregunta++;

                if(preguntas[i].tipoPregunta === 'PA' || preguntas[i].tipoPregunta === 'SM' || preguntas[i].tipoPregunta === 'LD'){
                  
                  let idRespuesta;
                  let textoRespuesta;
                  const respuestaSeleccionada = preguntas[i].tipoPregunta === 'PA' ? preguntas[i].datosPreguntas:preguntas[i].datosPreguntas.filter(dato => dato.idPreguntaDetalle === preguntas[i].respuesta);
                  if(preguntas[i].tipoPregunta === 'SM'){
                    idRespuesta = preguntas[i].respuesta;
                    textoRespuesta = respuestaSeleccionada.length> 0 && respuestaSeleccionada[0].valorTexto !== ''? preguntas[i].valorTexto:null;
                  }else{
                    idRespuesta = preguntas[i].tipoPregunta === 'PA'? null:preguntas[i].respuesta;
                    textoRespuesta = preguntas[i].tipoPregunta === 'PA'? preguntas[i].respuesta:null;
                  }

                  if(respuestaSeleccionada.length> 0){
                    respuestaPreguntaDetalleType.rows.add(
                      respuestaSeleccionada[0].idRespuestaPreguntaDetalleId || null,
                      preguntas[i].idRespuestaPregunta || idRespuestaPregunta,
                      respuestaSeleccionada[0].idPreguntaDetalle,
                      idRespuesta,
                      respuestaSeleccionada[0].idArchivo || null,
                      textoRespuesta,
                      respuestaSeleccionada[0].estatus || null,
                      respuestaSeleccionada[0].calificacion*100,
                    );
                  }
                }else{

                  for (let j = 0; j < preguntas[i].datosPreguntas.length; j++) {
                    const idRespuesta = preguntas[i].tipoPregunta === 'SP'|| preguntas[i].tipoPregunta === 'SA'? null:preguntas[i].datosPreguntas[j].respuesta;
                    let textoRespuesta = preguntas[i].tipoPregunta === 'SP'? preguntas[i].datosPreguntas[j].respuesta:null;
                    let respuestaBooleana;
                    if(preguntas[i].tipoPregunta === 'CV'){
                      respuestaBooleana = preguntas[i].datosPreguntas[j].respuesta?1:0;
                      textoRespuesta=preguntas[i].datosPreguntas[j].valorTexto !== ''?preguntas[i].datosPreguntas[j].valorTexto:null ;
                    }
                    if (preguntas[i].datosPreguntas[j].respuesta !== ''|| preguntas[i].tipoPregunta === 'SA'|| preguntas[i].tipoPregunta === 'CV'){
                      respuestaPreguntaDetalleType.rows.add(
                        preguntas[i].datosPreguntas[j].idRespuestaPreguntaDetalleId || null,
                        preguntas[i].idRespuestaPregunta || idRespuestaPregunta,
                        preguntas[i].datosPreguntas[j].idPreguntaDetalle,
                        preguntas[i].tipoPregunta === 'CV'? respuestaBooleana:idRespuesta,
                        preguntas[i].datosPreguntas[j].idArchivo || null,
                        textoRespuesta,
                        preguntas[i].datosPreguntas[j].estatus || null,
                        preguntas[i].datosPreguntas[j].calificacion*100,
                      );
                    }
                  }
                }
                // Caso en que la respuesta no viene en pregunta
              }
            }
          
            const req = transaction.request()
              .input('IdFormularioRespuesta', sql.Int, datos.idRespuesta)
              .input('IdUsuario', sql.Int, datos.idUsuario)
              .input('UsuarioEvaluado', sql.Int, datos.idUsuarioEvaluar)
              .input('IdAsignacionFormulario', sql.Int, datos.idAsignacion)
              .input('Calificacion', sql.Float, datos.calificacion*100)
              .input('TipoFormulario', sql.VarChar(50), datos.tipoFormulario)
              .input('FormularioRespuestaSeccionType',respuestaSeccionType)
              .input('FormularioRespuestaPreguntaType',respuestaPreguntaType)
              .input('FormularioRespuestaPreguntaDetalleType', respuestaPreguntaDetalleType)
              .input('ArchivosPreguntas', archivosType)
              .execute('proc_guardarRespuestasFormulario');
          
            Promise.resolve(req)
              .then(async () => {
                await transaction.commit();
                const res = await strapi.services.formularios.obtenerFormulariosTipo(datosUsuario,true);
                await resolve(res);
              })
              .catch( (err) => {
                console.log('error', err);
                transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
                reject('Ocurrio un error al guardar las respuestas');
              });

          } catch(error) {
            console.log(error);
            await transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
            reject('Hubo un error al ejecutar el procedimiento almacenado');
          }
        });
      });
      return Promise.resolve(prom)
        .then(r => {
          return r;
        })
        .catch(err => ctx.response.badRequest(err));
    } catch (err) {
      return ctx.response.badRequest('Error al guardar las respuestas');
    }
  },
  // guardarConfiguracionFormulario

};

