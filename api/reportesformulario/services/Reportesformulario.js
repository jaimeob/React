'use strict';

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

/**
 * Reportesformulario.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all reportesformularios.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('reportesformulario', params);
    // Select field to populate.
    const populate = Reportesformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Reportesformulario
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an reportesformulario.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Reportesformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Reportesformulario
      .findOne(_.pick(params, _.keys(Reportesformulario.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count reportesformularios.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('reportesformulario', params);

    return Reportesformulario
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an reportesformulario.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Reportesformulario.associations.map(ast => ast.alias));
    const data = _.omit(values, Reportesformulario.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Reportesformulario.create(data);

    // Create relational data and return the entry.
    return Reportesformulario.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an reportesformulario.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Reportesformulario.associations.map(a => a.alias));
    const data = _.omit(values, Reportesformulario.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Reportesformulario.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Reportesformulario.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an reportesformulario.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Reportesformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Reportesformulario
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Reportesformulario.associations.map(async association => {
        if (!association.via || !data._id) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an reportesformulario.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('reportesformulario', params);
    // Select field to populate.
    const populate = Reportesformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Reportesformulario.attributes).reduce((acc, curr) => {
      switch (Reportesformulario.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Reportesformulario
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },
  obtenerReportesEncuestas: async (ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      
      const res = await pool.request()
        .input('TipoFormulario', ctx.request.query.tipoFormulario.trim()) 
        .input('UsuarioId', ctx.request.query.usuarioId) 
        .execute('proc_obtenerReportesEncuestas');
        
      res.recordset.forEach((el) => {
        el.UsuariosDepartamentos = JSON.parse(el.UsuariosDepartamentos);
        el.UsuariosDepartamentos = el.UsuariosDepartamentos.Departamentos.filter(departamento => departamento.Usuarios !== null);
      });
      
      return res;

    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest(err);
    }
  },
  obtenerValidacionesFormularios: async (ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      
      const res = await pool.request()
        .input('TipoFormulario', ctx.request.query.tipoFormulario.trim()) 
        .input('UsuarioId', ctx.request.query.usuarioId) 
        .execute('proc_obtenerValidacionesFormularios');
        
      res.recordset.forEach((el) => {
        el.UsuariosDepartamentos = JSON.parse(el.UsuariosDepartamentos);
        el.UsuariosDepartamentos = el.UsuariosDepartamentos.Departamentos.filter(departamento => departamento.Usuarios !== null);
      });
      
      return res;

    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener las jerarquías');
    }
  },
  obtenerReporteEncuesta: async (ctx) => {
    try{

      const pool = await poolPromiseServDesarrollo;
  
      const res = await pool.request()
        .input('AsignacionFormularioId', ctx.id)
        .execute('proc_obtenerReporteEncuesta_v2');

      //  -- Asignacion
      // res.asignacion = res.recordsets[0];
      
      // -- Respuestas asignación
      // res.respuestasAsignacion = res.recordsets[1];

      // -- Secciones
      // res.secciones = res.recordsets[2];

      // -- Respuestas sección
      // res.respuestasSecciones = res.recordsets[3];

      // -- Preguntas
      //res.preguntas = res.recordsets[4];

      // -- Preguntitas
      //res.preguntitas = res.recordsets[5];

      // -- Respuestas diferentes de CVO
      //res.respuestasPreguntas = res.recordsets[6];

      // -- Preguntitas respuestas - PENDIENTE
      //res.respuestasPreguntitas = res.recordsets[7];

      // -- Usuarios a evaluar
      //res.usuariosEvaluados = res.recordsets[8];

      // -- Usuarios evaluadores
      //res.usuariosEvaluadores = res.recordsets[9];

      res.asignacion = {

        // Datos generales de la asignación
        ...res.recordset[0],

        // Respuestas asignación
        respuestasAsignacion: res.recordsets[1],

        // Secciones
        secciones: res.recordsets[2].map(seccion => ({
          ...seccion,

          // Respuestas sección
          respuestasSeccion: res.recordsets[3].filter(respuestaSeccion => respuestaSeccion.IdFormularioSeccion === seccion.FormularioSeccionId),
          
          // Preguntas
          preguntas: res.recordsets[4].filter(pregunta => pregunta.IdFormularioSeccion === seccion.FormularioSeccionId).map(pregunta => ({
            ...pregunta,
          
            // Respuestas de la pregunta
            respuestas: pregunta.TipoPregunta === 'CVO' 
              ? res.recordsets[5].filter(respuesta => pregunta.FormularioPreguntaId == respuesta.IdFormularioPregunta).map(respuesta => ({
                ...respuesta,
                resultado: res.recordsets[8].filter(resultado => respuesta.FormularioPreguntaDetalleId == resultado.IdFormularioPreguntaDetalle),
              }))
              : res.recordsets[6].filter(respuesta => pregunta.FormularioPreguntaId == respuesta.IdFormularioPregunta).map(respuesta => ({
                ...respuesta,
                resultado: res.recordsets[8].filter(resultado => respuesta.FormularioPreguntaDetalleId == resultado.IdFormularioPreguntaDetalle),
              })),

            // Respuestas de las preguntitas
            respuestasPreguntitas: res.recordsets[7]
              .filter(respuestaPreguntita => pregunta.FormularioPreguntaId == respuestaPreguntita.IdFormularioPregunta)
              .map(respuestaPreguntita => ({
                ...respuestaPreguntita,

                // Totales de las preguntitas
                // total: res.recordsets[8].filter(resultado => respuestaPreguntita.FormularioPreguntaDetalleId == resultado.IdRespuesta),
              }))
          })),
        })),
      };

      res.usuariosEvaluados = res.recordsets[9];
      res.usuariosEvaluadores =  res.recordsets[10];
      /*
      res.recordset.forEach((el) => {
        el.Secciones = JSON.parse(el.Secciones) || [];
        el.UsuariosAsignaciones = JSON.parse(el.UsuariosAsignaciones) || [];
        el.UsuariosRespuestas = JSON.parse(el.UsuariosRespuestas) || [];
        el.PromedioAsignacion = JSON.parse(el.PromedioAsignacion) || [];
        // el.UsuariosAutorizados = JSON.parse(el.UsuariosAutorizados) || [];


        el.Secciones.forEach((seccion) => {
          seccion.PromedioSeccion = seccion.PromedioSeccion || [];
          seccion.FormularioPreguntas.forEach(formulariopregunta => {
            formulariopregunta.FormularioPreguntasDetalle.forEach(formularioPreguntaDetalle => {
              formularioPreguntaDetalle.RespuestasPA = formularioPreguntaDetalle.RespuestasPA || [];
              formularioPreguntaDetalle.CalificacionRespuesta =  formularioPreguntaDetalle.CalificacionRespuesta || [];
              formularioPreguntaDetalle.Resultado =  formularioPreguntaDetalle.Resultado || [];
            })
          })
        })  
      });
      */
      return res;

    } catch (err) {
      console.log(err);
      // sql.close();
      return ctx.response.badRequest('Error al obtener los reportes');
    }
  },
};
