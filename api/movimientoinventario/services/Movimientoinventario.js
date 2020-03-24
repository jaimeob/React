'use strict';

/**
 * Movimientoinventario.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const { poolPromise } = require('./../../../config/functions/bootstrap');
// const env = process.env.NODE_ENV;
const {
  env: {
    NODE_ENV: n = 'development',
    driver : d = 'mssql'
  }
} = process;

const getConfigProp = (prop = '') => {
  return strapi.config.environments[n][d][prop] || {};
};

module.exports = {

  /**
   * Promise to fetch all movimientoinventarios.
   *
   * @return {Promise}
   */

  fetchAll: async() => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerMovimientos');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los Movimientos');
    }
  },

  /**
   * Promise to fetch a/an movimientoinventario.
   *
   * @return {Promise}
   */

  fetch: async (ctx) => {
    try {
      
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdMovimiento', ctx.params._id)
        .execute('proc_obtenerMovimientoDetalle');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener el Movimiento');
    }
  },

  /**
   * Promise to count movimientoinventarios.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('movimientoinventario', params);

    return Movimientoinventario
      .count()
      .where(filters.where);
  },

  reportes: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req
        .input('IdPlaza', ctx.params._id)
        .execute('proc_obtenerReporteInventario');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los Reportes');
    }
  },

  /**
   * Promise to add a/an movimientoinventario.
   *
   * @return {Promise}
   */

  add: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;

      const movimiento = await req
        .input('IdTipo', sql.Int, datos.tipoMovimiento)
        .input('IdPlaza', sql.Int, datos.plaza.Id)
        .input('Folio', sql.VarChar(50), datos.folio)
        .input('IdUsuarioCreacion', sql.Int, datos.IdUsuario)
        .input('IdProceso', sql.Int, 8)
        .execute('proc_guardarMovimiento');
      for(const row of datos.rows){
        console.log('row',row);
        let existencia = row.Existencia - row.Cantidad;
        const req2 = await pool.request();
        await req2
          .input('IdMovimiento', sql.Int, movimiento.recordset[0]['IdMovimiento'])
          .input('IdArticulo', sql.Int, row.IdArticulo)
          .input('Cantidad', sql.Decimal, row.Cantidad)
          .input('ExistencialActual', sql.Decimal, existencia)
          .input('IdUsuarioCreacion', sql.Int, datos.IdUsuario)
          .execute('proc_guardarMovimientoDetalle');
      };

      let msj = 'Movimiento realizado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al realizar el Movimiento');
    }
  },

  /**
   * Promise to edit a/an movimientoinventario.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Movimientoinventario.associations.map(a => a.alias));
    const data = _.omit(values, Movimientoinventario.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Movimientoinventario.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Movimientoinventario.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an movimientoinventario.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Movimientoinventario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Movimientoinventario
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Movimientoinventario.associations.map(async association => {
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
   * Promise to search a/an movimientoinventario.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('movimientoinventario', params);
    // Select field to populate.
    const populate = Movimientoinventario.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Movimientoinventario.attributes).reduce((acc, curr) => {
      switch (Movimientoinventario.attributes[curr].type) {
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

    return Movimientoinventario
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
