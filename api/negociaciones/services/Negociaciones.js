'use strict';

/**
 * Negociaciones.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');

// const env = process.env.NODE_ENV;
const {
  env: {
    NODE_ENV: n = 'development',
    driver : d = 'mssql'
  }
} = process;
process.env.NODE_ENV; // ['development', 'production', 'staging']

const getConfigProp = (prop = '') => {
  return strapi.config.environments[n][d][prop] || {};
};
const {
  poolPromiseSifWeb,
  poolPromise
  // poolPromise
} = require('./../../../config/functions/bootstrap');

module.exports = {
  /**
   * Promise to fetch all negociaciones.
   *
   * @return {Promise}
   */
  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('negociaciones', params);
    // Select field to populate.
    const populate = Negociaciones.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Negociaciones
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an negociaciones.
   *
   * @return {Promise}
   */
  fetch: (params) => {
    // Select field to populate.
    const populate = Negociaciones.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Negociaciones
      .findOne(_.pick(params, _.keys(Negociaciones.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count negociaciones.
   *
   * @return {Promise}
   */
  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('negociaciones', params);

    return Negociaciones
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an negociaciones.
   *
   * @return {Promise}
   */
  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Negociaciones.associations.map(ast => ast.alias));
    const data = _.omit(values, Negociaciones.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Negociaciones.create(data);

    // Create relational data and return the entry.
    return Negociaciones.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an negociaciones.
   *
   * @return {Promise}
   */
  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Negociaciones.associations.map(a => a.alias));
    const data = _.omit(values, Negociaciones.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Negociaciones.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Negociaciones.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an negociaciones.
   *
   * @return {Promise}
   */
  remove: async params => {
    // Select field to populate.
    const populate = Negociaciones.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Negociaciones
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Negociaciones.associations.map(async association => {
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
   * Promise to search a/an negociaciones.
   *
   * @return {Promise}
   */
  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('negociaciones', params);
    // Select field to populate.
    const populate = Negociaciones.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Negociaciones.attributes).reduce((acc, curr) => {
      switch (Negociaciones.attributes[curr].type) {
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

    return Negociaciones
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise para obtener el listado de familias.
   *
   * @return {Promise}
   */
  obtenerFamilias: async (ctx) => {
    try{
      // const config = getConfigProp('cnx');
      let responseSQL = {};
      const pool = await sql.connect(getConfigProp('cnx'));
      const estatus = ctx.params.estatus.toUpperCase() === 'TODOS' ? '' : ctx.params.estatus;
      const requestSQL = await pool.request()
        .input('estatus', sql.VarChar, _.toString(estatus))
        .execute('plng_ObtenerFamilias');
      sql.close();
      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;
      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener las familias');
      /**
       * {
          "statusCode": 400,
          "error": "Bad Request",
          "message": "Error al obtener los empleados"
         }
      */
    }
  },

  /**
   * Promise para actualizar estatus de familias.
   *
   * @return {Promise}
   */
  actualizarEstatusFamilias: async (ctx) => {
    try{
      // const config = getConfigProp('cnx');
      let responseSQL = {};
      const pool = await sql.connect(getConfigProp('cnx'));
      const familias = ctx.request.body.idFamilias;
      const estatus = ctx.params.estatus.toUpperCase() === 'ACTIVAR' ? 1 : 0;

      const requestSQL = await pool.request()
        .input('IdFamilia', sql.VarChar, _.toString(familias))
        .input('Estatus', sql.Bit, estatus)
        .execute('plng_ActualizarEstatusFamilia');
      sql.close();

      responseSQL.statusCode = requestSQL.recordset[0].Codigo === 0 ? '200'
        : requestSQL.recordset[0].Codigo.toString();
      responseSQL.error = requestSQL.recordset[0].Codigo;
      responseSQL.message = requestSQL.recordset[0].Codigo === 0 ? ''
        : 'Error al intentar actualizar el estatus';

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al intentar actualizar el estatus');
    }
  },

  /**
   * Promise para obtener el listado de subfamilias.
   *
   * @return {Promise}
   */
  obtenerSubFamilias: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await sql.connect(getConfigProp('cnx'));

      const requestSQL = await pool.request()
        .input('FamiliaId', sql.Int, _.toInteger(ctx.params.id))
        .execute('plng_ObtenerSubFamilias');
      sql.close();

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener las subfamilias');
    }
  },

  /**
   * Promise para agregar puesto familia.
   *
   * @return {Promise}
   */
  agregarPuestoFamilia: async (ctx) => {
    try{
      const pool = await poolPromise;
      let responseSQL = await pool.request();

      const requestSQL = await pool.request()
        .input('IdFamilia', sql.Int, ctx.params.IdFamilia)
        .input('PuestosEliminados', sql.VarChar,ctx.request.body.PuestosEliminados)
        .input('PuestosAgregados', sql.VarChar,ctx.request.body.PuestosAgregados)
        .input('PuestosActualizados', sql.VarChar,ctx.request.body.PuestosActualizados)
        .execute('spng_asignarPuestoFamilia');
      sql.close();

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al agregar las puesto a familias');
    }
  },

  /**
   * Promise para grabar o eliminar subfamilias de las familias.
   *
   * @return {Promise}
   */
  asignarsubfamilias: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await sql.connect(getConfigProp('cnx'));

      const requestSQL = await pool.request()
        .input('IdFamilia', sql.Int, _.toInteger(ctx.params.IdFamilia))
        .input('NombreFamilia', sql.VarChar, _.toString(ctx.params.NombreFamilia))
        .input('Empleado', sql.Int, _.toInteger(ctx.params.Empleado))
        .input('SubFamilias', sql.VarChar, JSON.stringify(ctx.request.body))
        .execute('plng_GrabarAsignacionSubFamilias');
      sql.close();

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al asignar subfamilias');
    }
  },

  /**
   * Promise to get details inputs negociaciones.
   *
   * @return {Promise}
   */
  obtenerLayoutNegociaciones: async(ctx) => {
    try{
      const pool = await poolPromise;
      let request = await pool.request()
        .input('IdPrototipo', sql.Int, ctx.params._idPrototipo)
        .execute('plng_obtenerLayoutExplosiones');
      const data = {
        Labels: _.map(JSON.parse(request.recordset[0].Contenido), c =>  _.capitalize(c.Label)),
        Columns: _.map(JSON.parse(request.recordset[0].Contenido), c =>  _.lowerCase(c.Column)),
        Rows: _.map(request.recordset, function(row){
          return {
            Id: row.Id,
            Contenido: JSON.parse(row.Contenido)
          };
        })
      };
      return data;
    }catch(err){
      console.log('Error, obtenerLayoutNegociaciones', err);
      return ctx.response.badRequest('Error al obtener layout');
    }
  },

  /**
   * Promise to get details inputs negociaciones.
   *
   * @return {Promise}
   */
  obtenerDetalleInsumo: async( ctx ) => {
    try{
      const pool = await poolPromise;
      let request = await pool.request()
        .input('Insumos', sql.Text, ctx.request.body.Insumos)
        .execute('plng_obtenerDetalleInsumos');
      return request.recordset;
    }catch(err){
      console.log('Error, obtenerDetalleInsumo', err);
      return ctx.response.badRequest('Error al obtener layout');
    }
  },

  /**
   * Promise to get details inputs negociaciones.
   *
   * @return {Promise}
   */
  agregarExplosion: async( ctx ) => {
    try{
      const data = {
        message: '',
        codigo: false,
      };
      const pool = await poolPromise;
      let request = await pool.request()
        .input('JsonExplotion', sql.VarChar, JSON.stringify(ctx.request.body.JsonExplotion))
        .input('JsonExplotionDetails', sql.VarChar, JSON.stringify(ctx.request.body.JsonExplotionDetails))
        .execute('plng_agregarExplosionDetallada');
      if(request.recordset[0].Codigo === 0){
        data.message = 'Explosión agregada correctamente.';
        data.codigo = true;
      }else {
        data.message = 'Ocurrio un error, favor de comunicarse con Soporte Técnico.';
      }
      return data;
    }catch(err){
      console.log('Error, agregarExplosion', err);
      return ctx.response.badRequest('Error al agregar Explosion');
    }
  },

  /**
   * Promise to get details inputs negociaciones.
   *
   * @return {Promise}
   */
  obtenerExplosiones: async( ctx ) => {
    try{
      const pool = await poolPromise;
      let request = await pool.request()
        .input('IdExplosion', sql.Int, ctx.params.idExplosion)
        .input('IdPlaza', sql.Int, ctx.params.idPlaza)
        .input('Anio', sql.Int, ctx.params.anio)
        .execute('plng_obtenerExplosiones');
      const response = {
        HeaderList: [
          { Label: 'Plaza', Name:'NombrePlaza', Align: 'left' },
          { Label: 'Nombre de archivo', Name:'Nombre', Align: 'left' },
          { Label: 'Cantidad de insumos', Name:'Insumos', Align: 'center' },
          { Label: 'Empleado', Name:'NombreEmpleado', Align: 'left' },
          { Label: 'Fecha de Carga', Name:'FechaCreacion', Align: 'right' }
        ],
        RowsList: request.recordset,
      };
      return response;
    }catch(err){
      console.log('Error, obtenerExplosiones', err);
      return ctx.response.badRequest('Error al obtener Explosiones');
    }
  },

  /**
   * Promise to get details inputs negociaciones.
   *
   * @return {Promise}
   */
  obtenerExplosionesDetalle: async( ctx ) => {
    try{
      const pool = await poolPromise;
      let request = await pool.request()
        .input('IdExplosion', sql.Int, ctx.params._idExplosion)
        .execute('plng_obtenerExplosionesDetalle');
      const response = {
        HeaderList: [
          { Label: 'Insumo', Name: 'InsumoId'},
          { Label: 'Cantidad', Name: 'Cantidad'},
          { Label: 'Enero', Name: 'Enero'},
          { Label: 'Febrero', Name: 'Febrero'},
          { Label: 'Marzo', Name: 'Marzo'},
          { Label: 'Abril', Name: 'Abril'},
          { Label: 'Mayo', Name: 'Mayo'},
          { Label: 'Junio', Name: 'Junio'},
          { Label: 'Julio', Name: 'Julio'},
          { Label: 'Agosto', Name: 'Agosto'},
          { Label: 'Septiembre', Name: 'Septiembre'},
          { Label: 'Octubre', Name: 'Octubre'},
          { Label: 'Noviembre', Name: 'Noviembre'},
          { Label: 'Diciembre', Name: 'Diciembre'},
        ],
        RowsList: request.recordset.map(row => {
          return {
            Id: row.InsumoId,
            Contenido: row,
          };
        }),
      };
      return response;
    }catch(err){
      console.log('Error, obtenerExplosiones', err);
      return ctx.response.badRequest('Error al obtener Explosiones');
    }
  },

  /**
   * Promise para obtener los anios para porcentaje de impacto.
   *
   * @return {Promise}
   */

  obtenerAniosPorcentajeImpacto: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromise;

      const requestSQL = await pool.request()
        .execute('plng_ObtenerAniosPorcentajeImpactoNegociaciones');
      sql.close();

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset.map(n => n.Anio);

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener los años');
    }
  },

  /**
   * Promise para obtener los anios para porcentaje de impacto.
   *
   * @return {Promise}
   */

  obtenerPorcentajeImpactoXAnio: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromise;

      const requestSQL = await pool.request()
        .input('Anio', sql.Int, ctx.params.anio)
        .execute('plng_ObtenerPorcentajeImpactoXAnioNegociaciones');
      sql.close();

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset[0].Porcentaje;

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener el procentaje de impacto');
    }
  },

  /**
   * Promise para obtener los datos generales del procentaje de impacto.
   *
   * @return {Promise}
   */

  obtenerDatosGeneralesImpacto: async (ctx) => {
    try{
      let responseSQL = {};
      let responseSQL2 = {};
      let response = {};
      let detail = {};
      const pool = await poolPromise;

      const requestSQL = await pool.request()
        .input('Anio', sql.Int, ctx.params.anio)
        .execute('plng_ObtenerFamiliasConvenio');
      // sql.close();

      const requestSQL2 = await pool.request()
        .input('Anio', sql.Int, ctx.params.anio)
        .execute('plng_ObtenerPrecioConvenio');
      sql.close();

      responseSQL = requestSQL.recordset.map(family => {
        return {
          ...family,
          Clave: _.camelCase(family.Nombre),
        }
      });

      responseSQL2 = requestSQL2.recordset;

      responseSQL.map(family => {
        detail[`${family.Clave}`] = responseSQL2.find(detail => detail.Id === family.Id);
      });
      detail[`totalEdificacion`] = responseSQL2.find(detail => detail.Id === -1);

      response.statusCode = '200';
      response.error = '';
      response.message = 'Exito';
      response.data = {
        familys: responseSQL,
        detail: detail
      }

      return response;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener los datos de impacto');
    }
  },

  /**
   * Promise para obtener el detalle del procentaje de impacto por familia.
   *
   * @return {Promise}
   */

  obtenerDetalleImpacto: async (ctx) => {
    try{
      // let responseSQL = {};
      let response = {};
      const pool = await poolPromise;

      const requestSQL = await pool.request()
        .input('Anio', sql.Int, ctx.params.anio)
        .input('Familia', sql.Int, ctx.params.idFamilia)
        .execute('plng_ObtenerPrecioConvenioDetalle');

      response.statusCode = '200';
      response.error = '';
      response.message = 'Exito';
      response.data = requestSQL.recordset;

      return response;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener el detalle de impacto');
    }
  },

  /**
   * Promise para obtener la meta de porcentaje de Ahorro.
   *
   * @return {Promise}
   */

  obtenerMetaPorcentajeAhorro: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromise;

      const requestSQL = await pool.request()
        .input('Anio', sql.Int, ctx.params.anio)
        .execute('plng_ObtenerMetaPorcentajeAhorro');
      sql.close();

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset[0].Porcentaje;

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener el procentaje de Ahorro');
    }
  },

  /**
   * Promise para obtener el porcentaje de Ahorro.
   *
   * @return {Promise}
   */

  obtenerPorcentajeAhorroPlazas: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromise;

      const requestSQL = await pool.request()
        .input('FechaInicio', sql.VarChar, ctx.params.fechainicio)
        .input('FechaFin', sql.VarChar, ctx.params.fechafin)
        .execute('plng_ObtenerPorcentajeAhorroPlazas');
      sql.close();

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener el procentaje de Ahorro por plaza');
    }
  },

  /**
   * Promise para obtener la meta de dias promedio.
   *
   * @return {Promise}
   */

  obtenerMetaDiasPromedio: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromise;

      const requestSQL = await pool.request()
        .input('Anio', sql.Int, ctx.params.anio)
        .execute('plng_ObtenerMetaDiasPromedio');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset[0].Dias;

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener la meta');
    }
  },

  /**
   * Promise para obtener los dias promedio de los empleados.
   *
   * @return {Promise}
   */

  obtenerListadoDiasPromedio: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromise;

      const requestSQL = await pool.request()
        .input('FechaInicio', sql.VarChar, ctx.params.fechainicio)
        .input('FechaFin', sql.VarChar, ctx.params.fechafin)
        .execute('plng_ObtenerDiasPromedioNegociaciones');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener el listado de empleados');
    }
  },

  /**
   * Promise para obtener los dias promedio detalle por empleado.
   *
   * @return {Promise}
   */

  obtenerDiasPromedioDetalleXEmpleado: async (ctx) => {
    try{
      let responseSQL = {};
      const pool = await poolPromise;
      console.log(
        sql.VarChar, ctx.params.fechainicio,
        ctx.params.fechafin,
        ctx.params.idEmpleado
      );
      const requestSQL = await pool.request()
        .input('FechaInicio', sql.VarChar, ctx.params.fechainicio)
        .input('FechaFin', sql.VarChar, ctx.params.fechafin)
        .input('IdEmpleado', sql.Int, ctx.params.idEmpleado)
        .execute('plng_ObtenerDiasPromedioDetalleXEmpleado');

      responseSQL.statusCode = '200';
      responseSQL.error = '';
      responseSQL.message = 'Exito';
      responseSQL.data = requestSQL.recordset;

      return responseSQL;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener el detalle del empleados');
    }
  },

  /**
   * Promise to get details inputs negociaciones.
   *
   * @return {Promise}
   */
  obtenerMontoNegociado: async( ctx ) => {
    try{
      const pool = await poolPromise;
      let request = await pool.request()
        .input('PlazaId', sql.Int, ctx.params.PlazaId)
        .input('FamiliaId', sql.Int, ctx.params.FamiliaId)
        .execute('plng_ObtenerMontoNegociado');
      const response = {
        Headers: [
          { Label: 'Sub-Familia', Name: 'SubFamilia', Align: 'left', Type: 'string', Static: true},
          { Label: 'Por negociar', Name: 'PorNegociar', Align: 'right', Type: 'money', Static: true},
          { Label: 'Negociado', Name: 'Negociado', Align: 'right', Type: 'money', Static: true},
          { Label: '% avance', Name: 'PorcentajeAvance', Align: 'right', Type: 'percent', Static: true},
          { Label: 'Sum. Vol. Ene.', Name: 'SumVolEnero', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. Feb.', Name: 'SumVolFebrero', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. Mar.', Name: 'SumVolMarzo', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. Abr.', Name: 'SumVolAbril', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. May.', Name: 'SumVolMayo', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. Jun.', Name: 'SumVolJunio', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. Jul.', Name: 'SumVolJulio', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. Ago.', Name: 'SumVolAgosto', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. Sep.', Name: 'SumVolSeptiembre', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. Oct.', Name: 'SumVolOctubre', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. Nov.', Name: 'SumVolNoviembre', Align: 'right', Type: 'money', Static: false},
          { Label: 'Sum. Vol. Dic.', Name: 'SumVolDiciembre', Align: 'right', Type: 'money', Static: false},
        ],
        Rows: request.recordset,
      };
      console.log('obtenerMontoNegociado', request);
      return response;
    }catch(err){
      console.log('Error, obtenerMontoNegociado', err);
      return ctx.response.badRequest('Error al obtener monto negociado');
    }
  },
  /**
   * Promise to get details inputs negociaciones.
   *
   * @return {Promise}
   */
  obtenerPorcentajeCumplimiento: async( ctx ) => {
    try{
      const pool = await poolPromise;
      let request = await pool.request()
        .input('PlazaId', sql.Int, parseInt(ctx.params.PlazaId))
        .input('InitialDate', sql.VarChar, ctx.params.InitialDate)
        .input('FinalDate', sql.VarChar, ctx.params.FinalDate)
        .execute('plng_ObtenerPorcentajeCumplimiento');
      const response = {
        Headers: [
          { Label: 'Plaza', Name:'Plaza', Align: 'left', Type: 'string' },
          { Label: 'Salidas', Name:'Salidas', Align: 'center', Type: 'number' },
          { Label: 'Negados', Name:'Negados', Align: 'center', Type: 'number' },
          { Label: 'Tot. Necesidad', Name:'TotNececidad', Align: 'center', Type: 'number' },
          { Label: '% Cumplimiento', Name:'PorcCumplimiento', Align: 'right', Type: 'percent' },
        ],
        Rows: request.recordset,
      };
      // const response = {
      //   Headers: [
      //     { Label: 'Plaza', Name:'Plaza', Align: 'left', Type: 'string' },
      //     { Label: 'Salidas', Name:'Salidas', Align: 'center', Type: 'number' },
      //     { Label: 'Negados', Name:'Negados', Align: 'center', Type: 'number' },
      //     { Label: 'Tot. Necesidad', Name:'TotNececidad', Align: 'center', Type: 'number' },
      //     { Label: '% Cumplimiento', Name:'PorcCumplimiento', Align: 'right', Type: 'percent' },
      //   ],
      //   Rows: [
      //     { Plaza: 'Culiacán', Salidas:'947', Negados: '8', TotNececidad: '955', PorcCumplimiento: '99.16'},
      //     { Plaza: 'Mazatlan', Salidas:'2775', Negados: '17', TotNececidad: '2792', PorcCumplimiento: '99.30'},
      //     { Plaza: 'Poza Rica', Salidas:'35', Negados: '0', TotNececidad: '35', PorcCumplimiento: '100'},
      //     { Plaza: 'Ensenada', Salidas:'21', Negados: '0', TotNececidad: '21', PorcCumplimiento: '100'},
      //     { Plaza: 'La Paz', Salidas:'166', Negados: '1', TotNececidad: '167', PorcCumplimiento: '99.40'},
      //     { Plaza: 'Los Cabos', Salidas:'324', Negados: '2', TotNececidad: '326', PorcCumplimiento: '99.39'},
      //     { Plaza: 'Tuxpan', Salidas:'25', Negados: '0', TotNececidad: '25', PorcCumplimiento: '100'},
      //   ]
      // };
      return response;
    }catch(err){
      console.log('Error, obtenerPorcentajeCumplimiento', err);
      return ctx.response.badRequest('Error al obtener porcentaje cumplimiento');
    }
  },


  obtenerDepartamentoPuestoFamilia: async( ctx ) => {
    try{
      const pool = await poolPromise;
      let request = await pool.request()
        .input('IdDepartamento', sql.Int, ctx.params.IdDepartamento)
        .input('IdFamilia', sql.Int, ctx.params.IdFamilia)
        .execute('spng_obtenerPuestoFamilia');
      return request.recordset;
    }catch(err){
      console.log('Error, spng_obtenerPuestoFamilia', err);
      return ctx.response.badRequest('Error al obtener puestos departamentos');
    }
  },

  guardarPuestoFamilia: async( ctx ) => {
    try{
      const responseSQL = {};
      const pool = await poolPromise;
      let request = await pool.request()
        .input('IdFamilia', sql.Int, ctx.params.IdFamilia)
        .input('PuestosAgregados', sql.NVarChar, ctx.request.body.add)
        .input('PuestosEliminados', sql.NVarChar, ctx.request.body.del)
        .execute('spng_asignarPuestoFamilia');
      Object.assign(responseSQL, { status: 200, message: 'Exito' });
      return responseSQL;
    }catch(err){
      console.log('Error, spng_asignarPuestoFamilia', err);
      return ctx.response.badRequest('Error al asignar puesto a la familia');
    }
  },
};
