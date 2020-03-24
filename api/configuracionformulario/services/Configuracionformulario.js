/* eslint-disable no-undef */
'use strict';

/**
 * Configuracionformulario.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const { poolPromise } = require('./../../../config/functions/bootstrap');

module.exports = {

  /**
   * Promise to fetch all configuracionformularios.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('configuracionformulario', params);
    // Select field to populate.
    const populate = Configuracionformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Configuracionformulario
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an configuracionformulario.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.

    const populateCfg = Configuracionformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const populate = Configuracionformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Configuracionformulario
      .findOne(_.pick(params, _.keys(Configuracionformulario.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count configuracionformularios.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('configuracionformulario', params);

    return Configuracionformulario
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an configuracionformulario.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Configuracionformulario.associations.map(ast => ast.alias));
    const data = _.omit(values, Configuracionformulario.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Configuracionformulario.create(data);

    // Create relational data and return the entry.
    return Configuracionformulario.updateRelations({ _id: entry.id, values: relations });
  },
  crearFormulario: async (ctx, data = {}) => {
    try {
      const {
        id,
        nombre,
        departamento: {
          departamentoId,
        },
        componentesformularios,
        logoUrl,
        fechaPublicacion,
      } = data;
      console.log('data in crearFormulario', data);
      const jsonstrComponents = await JSON.stringify(componentesformularios);
      // TODO: REEMPLAZAR DATOS DUROS POR EL USUARIO EN SESIÓN.
      const empleadoId = 27197; // Erubiel Id
      const pool = await poolPromise;
      const req = await pool.request();
      const parametros = [
        { param: 'Nombre',
          type: sql.VarChar(100),
          value: nombre },
        { param: 'NoEmpleadoAsigna',
          type: sql.Int,
          value: empleadoId },
        { param: 'IdDepartamento',
          type: sql.Int,
          value: departamentoId },
        { param: 'IdConfigFormulario',
          type: sql.VarChar(24),
          value: id },
        { param: 'Componentes',
          type: sql.VarChar(sql.MAX),
          value: jsonstrComponents },
        { param: 'FechaPublicacion',
          type: sql.DateTime,
          value: fechaPublicacion },
        { param: 'RutaLogo',
          type: sql.VarChar(150),
          value: logoUrl },
        { param: 'EnUso',
          type: sql.Bit,
          value: 0 },
      ];
      console.log('Crear parámetros'. parametros)
      parametros.forEach(
        async ({ param, type, value }) => {
          await req.input(param, type, value);
        }
      );
      const res = await req.execute('proc_crearFormulario');
      return res.recordset;
    } catch (error) {
      console.log('error catch', error);
      return ctx
        .badImplementation(
          'Ocurrió un error al publicar la configuración de formulario',
          error,
        );
    }
   
  },

  /**
   * Promise to edit a/an configuracionformulario.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Configuracionformulario.associations.map(a => a.alias));
    const data = _.omit(values, Configuracionformulario.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Configuracionformulario.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Configuracionformulario.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an configuracionformulario.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Configuracionformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Configuracionformulario
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Configuracionformulario.associations.map(async association => {
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
   * Promise to search a/an configuracionformulario.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('configuracionformulario', params);
    // Select field to populate.
    const populate = Configuracionformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Configuracionformulario.attributes).reduce((acc, curr) => {
      switch (Configuracionformulario.attributes[curr].type) {
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

    return Configuracionformulario
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },
  obtenertodos: async (params) => {
    const filters = strapi.utils.models.convertParams('configuracionformulario', params);
    console.log('filteredParams', filters);
    console.log('params', params);
    // Select field to populate.
    const populate = Configuracionformulario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Configuracionformulario
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },  
  obtenerConfiguracionFormulariosSQL: async (ctx) => {
    try {
      const {
        request: {
          url: requestUrl,
          header: {
            host,
          },
        },
      } = ctx;
      const currentUrl = new URL(`http://${host}${requestUrl}`);
      const searchParams = currentUrl.searchParams;
      // url params
      const FormularioId = searchParams.get('FormularioId') || null;
      const NoEmpleado = searchParams.get('NoEmpleado') || null;
      const NoEmpleadoAsigna = searchParams.get('NoEmpleadoAsigna') || null;
      const IdDepartamento = searchParams.get('IdDepartamento') || null;
      const IdConfigFormulario = searchParams.get('IdConfigFormulario') || null;
      
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        // { param: 'FormularioId',
        //   type: sql.Int,
        //   value: FormularioId },
        // { param: 'NoEmpleado',
        //   type: sql.Int,
        //   value: NoEmpleado },
        // { param: 'NoEmpleadoAsigna',
        //   type: sql.Int,
        //   value: NoEmpleadoAsigna },
        // { param: 'IdDepartamento',
        //   type: sql.Int,
        //   value: IdDepartamento },
        { param: 'IdConfigFormulario',
          type: sql.VarChar(24),
          value: IdConfigFormulario },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_listarFormulariosConEstatus',
          parameters
        );
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método obtenerFormulariosEstatus',
        error,
      );
    }
  }
};
