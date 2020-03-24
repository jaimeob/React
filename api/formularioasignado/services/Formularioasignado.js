'use strict';

/**
 * Formularioasignado.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const url = require('url');
const async = require('async');

const isNull = require('lodash/isNull')
const {
  SQLHandler,
} = require('./../../../config/functions/bootstrap');

module.exports = {

  /**
   * Promise to fetch all formularioasignados.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('formularioasignado', params);
    // Select field to populate.
    const populate = Formularioasignado.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Formularioasignado
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an formularioasignado.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Formularioasignado.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Formularioasignado
      .findOne(_.pick(params, _.keys(Formularioasignado.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count formularioasignados.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('formularioasignado', params);

    return Formularioasignado
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an formularioasignado.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Formularioasignado.associations.map(ast => ast.alias));
    const data = _.omit(values, Formularioasignado.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Formularioasignado.create(data);

    // Create relational data and return the entry.
    return Formularioasignado.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an formularioasignado.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Formularioasignado.associations.map(a => a.alias));
    const data = _.omit(values, Formularioasignado.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Formularioasignado.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Formularioasignado.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an formularioasignado.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Formularioasignado.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Formularioasignado
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Formularioasignado.associations.map(async association => {
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
   * Promise to search a/an formularioasignado.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('formularioasignado', params);
    // Select field to populate.
    const populate = Formularioasignado.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Formularioasignado.attributes).reduce((acc, curr) => {
      switch (Formularioasignado.attributes[curr].type) {
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

    return Formularioasignado
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },
  /* CUSTOM METHODS */
  obtenerFormulariosEstatus: async (ctx) => {
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
      const NoEmpleadoAsigna = searchParams.get('NoEmpleadoAsigna') || null;
      const IdDepartamento = searchParams.get('IdDepartamento') || null;
      const IdConfigFormulario = searchParams.get('IdConfigFormulario') || null;
      
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'FormularioId',
          type: sql.Int,
          value: FormularioId },
        { param: 'NoEmpleadoAsigna',
          type: sql.Int,
          value: NoEmpleadoAsigna },
        { param: 'IdDepartamento',
          type: sql.Int,
          value: IdDepartamento },
        { param: 'IdConfigFormulario',
          type: sql.VarChar(24),
          value: IdConfigFormulario },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_listarFormulariosConEstatus',
          parameters
        );
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método obtenerFormulariosEstatus',
        error,
      );
    }
  },
  actualizarComponentesFormularios: async (ctx) => {
    try {
      console.log('aqui si entra: actualizarComponentesFormularios')
      const {
        request: {
          body: {
            Componentes = [],
            FechaActualizacion = '',
            Finalizar = false,
          }
        },
        params: {
          FormularioId = null,
        },
      } = ctx;
      const parameters = [
        { param: 'FormularioId',
          type: sql.Int,
          value: FormularioId },
        { param: 'Componentes',
          type: sql.VarChar(sql.MAX),
          value: JSON.stringify(Componentes) },
        { param: 'FechaActualizacion',
          type: sql.DateTime,
          value: new Date(FechaActualizacion) },
        { param: 'Finalizar',
          type: sql.Bit,
          value: Finalizar },
      ];
      const sqlh = new SQLHandler();
      const resp = await sqlh.execProcedure(
        'proc_actualizarComponentesFormulario',
        parameters,
      );
      console.log('resp', resp);
      // const sqlData = await resp.recordset;
      const {
        recordset: [
          sqlData = {}
        ],
      } = resp;
      const formatedData = {
        ...sqlData,
        Componentes: JSON.parse(sqlData.Componentes),
      };
      // console.log('formatedData', formatedData)
      return formatedData; 
    } catch (error) {
      ctx.badRequest('Ocurrió un error inesperado', error);
    }
  },
  asignarEstatusFormularios: async (body, estatus = '', ctx) => {
    try {
      const {
        empleados,
        NoEmpleadoAsigna,
        IdConfigFormulario,
        IdDepartamento,
        FormularioId = null,
      } = body;
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const transaction = await sqlh.createTransaction();
      
      if (!Array.isArray(empleados))
        return ctx
          .badData(
            'Lista de empleados dentro del JSON no válida',
          );
      const responses = [];
      return new Promise((resolve, reject) => {
        transaction.begin(async (err) => {
          if (err) reject(err);
          try {
            for(let empleadoId of empleados) {
              const req = transaction.request();
              const parameters = [
                { param: 'NoEmpleadoAsigna',
                  type: sql.Int,
                  value: NoEmpleadoAsigna },
                { param: 'NoEmpleado',
                  type: sql.Int,
                  value: empleadoId },
                { param: 'IdDepartamento',
                  type: sql.Int,
                  value: IdDepartamento },
                { param: 'IdConfigFormulario',
                  type: sql.VarChar(24),
                  value: IdConfigFormulario },
                { param: 'Estatus',
                  type: sql.VarChar,
                  value: estatus.toUpperCase() },
              ];
              if (_.isInteger(FormularioId)) {
                parameters.push({
                  param: 'FormularioId',
                  type: sql.Int,
                  value: FormularioId
                });
              }
              let p;
              for(p of parameters) {
                await req
                  .input(
                    p.param,
                    p.type,
                    p.value
                  );
              }
              const resp = await req.execute('proc_cambiarEstatusFormularios');
              console.log('resp', resp);
              responses.push({
                empleado: empleadoId, 
                rowsAffected: resp.rowsAffected[1],
              });
            }
            await transaction.commit();
            Promise
              .all(responses)
              .then((r) => {
                console.log('responses', responses)
                return resolve(r);
              })
              .catch(err => reject(err));
          } catch (error) {
            console.log('catch error', error);
            
            await transaction
              .rollback(
                (err) => err && ctx
                  .badRequest(
                    'Ocurrió un error interno'
                  )
              );
            reject(error);
          }
        });
      });
    } catch (error) {
      console.log('error catch', error)
      return ctx
        .badRequest(
          'Ocurrió un error al ejecutar el método asignarEstatusFormularios',
          error,
        );
    }
  },
  listarFormularioPorEmpleado: async (ctx) => {
    try {
      const {
        request: {
          url: requestUrl,
          header: {
            host,
          },
        },
        params: {
          NoEmpleado,
        },
      } = ctx;
      console.log('ctx.params', ctx.params)
      const currentUrl = new URL(`http://${host}${requestUrl}`);
      const searchParams = currentUrl.searchParams;
      // url params
      // const FormularioId = searchParams.get('FormularioId') || null;
      // const NoEmpleado = searchParams.get('NoEmpleado') || null;
      const NoEmpleadoAsigna = searchParams.get('NoEmpleadoAsigna') || null;
      const IdDepartamento = searchParams.get('IdDepartamento') || null;
      const IdConfigFormulario = searchParams.get('IdConfigFormulario') || null;
      
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'IdDepartamento',
          type: sql.Int,
          value: IdDepartamento },
        { param: 'IdConfigFormulario',
          type: sql.VarChar(24),
          value: IdConfigFormulario },
        // { param: 'NoEmpleadoAsigna',
        //   type: sql.Int,
        //   value: NoEmpleadoAsigna },
      ];

      if (!_.isNull(NoEmpleado) && _.toSafeInteger(NoEmpleado) > 0) {
        parameters.push({
          param: 'NoEmpleado',
          type: sql.Int,
          value: parseInt(NoEmpleado)
        });
      }
      // if (!_.isNull(NoEmpleadoAsigna) && _.toSafeInteger(NoEmpleadoAsigna) > 0) {
      //   parameters.push({
      //     param: 'NoEmpleadoAsigna',
      //     type: sql.Int,
      //     value: parseInt(NoEmpleadoAsigna)
      //   });
      // }
      const res = await sqlh
        .execProcedure(
          'proc_listarFormulariosAsignados',
          parameters
        );
        // console.log('res from proc_listarFormulariosAsignados', res)
      const formulariosSQL = await res.recordset;
      console.log('formulariosSQL', formulariosSQL);
      return {
        grouped: _(formulariosSQL)
          .map((item) => ({
            ...item,
            NombreDepartamento: item.NombreDepartamento,
          }))
          .groupBy((item) => item.IdDepartamento && item.NombreDepartamento)
          .map((value, key) => {
            console.log('value', value)     
            return {
              nombre: key,
              formulario: value.map((item) => ({
                ...item,
                Componentes: JSON.parse(item.Componentes)
              })),
            };
          })
          .value(),
        users: _(formulariosSQL)
          .uniqBy((item) => item.NoEmpleado)
          .map((item) => ({
            NoEmpleado: item.NoEmpleado,
            NombreCompletoEmpleado: item.NombreCompletoEmpleado,
            Nombre: item.Nombre,
            ApellidoPaterno: item.ApellidoPaterno,
            ApellidoMaterno: item.ApellidoMaterno,
            Puesto: item.PuestoEmpleado,
            Componentes: item.Componentes
          }))
          .value(),
      };
    } catch (error) {
      console.log('error', error);
      return ctx.badRequest('Ocurrió un error en [listarFormularioPorEmpleado]', error);
    }
  }
};
