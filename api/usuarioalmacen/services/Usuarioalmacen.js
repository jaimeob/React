'use strict';

/**
 * Usuarioalmacen.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const { poolPromise } = require('./../../../config/functions/bootstrap');

module.exports = {

  /**
   * Promise to fetch all usuarioalmacens.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('usuarioalmacen', params);
    // Select field to populate.
    const populate = Usuarioalmacen.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Usuarioalmacen
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an usuarioalmacen.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Usuarioalmacen.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Usuarioalmacen
      .findOne(_.pick(params, _.keys(Usuarioalmacen.schema.paths)))
      .populate(populate);
  },

  almacenes: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerAlmacenes');
      return res.recordset;
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Error al obtener los almacenes');
    }
  },

  almacenes: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerAlmacenes');
      return res.recordset;
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Error al obtener los almacenes');
    }
  },

  almacenPlaza: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_AlmacenPlazaObtener');
      return res.recordset;
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Error al obtener almacenes plazas');
    }
  },

  usuarioAlmacenes: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_UsuarioAlmacenObtener');
      return res.recordset;
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Error al obtener usuarios almacenes');
    }
  },

  /**
   * Promise to count usuarioalmacens.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('usuarioalmacen', params);

    return Usuarioalmacen
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an usuarioalmacen.
   *
   * @return {Promise}
   */

  add: async (ctx) => {
    try{
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      await req
        .input('IdAlmacen', sql.Int, datos.idAlmacen)
        .input('IdPlaza', sql.Int, datos.idPlaza)
        .input('IdUsuario', sql.Int, 26921)
        .input('Bandera', sql.Int, datos.bandera)
        .input('AlmacenPlazaID', sql.Int, datos.almacenPlazaID)
        .execute('proc_AlmacenPlaza');
      
      let msj = 'Proceso executado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al executar el proceso');
    }
  },

  usuarioAlmacen: async (ctx) => {
    try{
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      await req
        .input('IdAlmacen', sql.Int, datos.idAlmacen)
        .input('IdUsuario', sql.Int, datos.idUsuario)
        .input('IdUsuarioCreacion', sql.Int, 26921)
        .input('Bandera', sql.Int, datos.bandera)
        .input('UsuarioAlmacenID', sql.Int, datos.usuarioAlmacenID)
        .execute('proc_UsuarioAlmacen');
      console.log('datos', datos)
      
      let msj = 'Proceso executado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al executar el proceso');
    }
  },

  /**
   * Promise to edit a/an usuarioalmacen.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Usuarioalmacen.associations.map(a => a.alias));
    const data = _.omit(values, Usuarioalmacen.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Usuarioalmacen.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Usuarioalmacen.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an usuarioalmacen.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Usuarioalmacen.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Usuarioalmacen
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Usuarioalmacen.associations.map(async association => {
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
   * Promise to search a/an usuarioalmacen.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('usuarioalmacen', params);
    // Select field to populate.
    const populate = Usuarioalmacen.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Usuarioalmacen.attributes).reduce((acc, curr) => {
      switch (Usuarioalmacen.attributes[curr].type) {
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

    return Usuarioalmacen
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
