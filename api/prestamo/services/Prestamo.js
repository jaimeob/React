'use strict';

/**
 * Prestamo.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const { poolPromise } = require('./../../../config/functions/bootstrap');

module.exports = {

  /**
   * Promise to fetch all prestamos.
   *
   * @return {Promise}
   */

  fetchAll: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerPrestamos');
      return res.recordset;
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Error al obtener los insumos');
    }
  },

  prestamoDetalle: async(ctx) => {
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdPrestamo', ctx.params._id)
        .execute('proc_obtenerPrestamoDetalle');
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('No pudo obtenerce el detalle');
    }
  },

  /**
   * Promise to fetch a/an prestamo.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Prestamo.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Prestamo
      .findOne(_.pick(params, _.keys(Prestamo.schema.paths)))
      .populate(populate);
  },

  insumos: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerInsumosPrestamos');
      return res.recordset;
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Error al obtener los insumos');
    }
  },

  /**
   * Promise to count prestamos.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('prestamo', params);

    return Prestamo
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an prestamo.
   *
   * @return {Promise}
   */

  add: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      const registros = datos.tablas.prestamos.datos;

      const prestamo = await req
        .input('IdAlmacen', sql.Int, datos.campos.almacen.valor)
        .input('IdPlaza', sql.Int, datos.campos.plaza.valor)
        .input('IdMoldeOrigen', sql.Int, datos.campos.moldeOrigen.valor)
        .input('IdMoldeDestino', sql.Int, datos.campos.moldeDestino.valor)
        .input('Descripcion', sql.VarChar(50), datos.campos.descripcion.valor)
        .input('IdUsuario', sql.Int, 26921)
        .execute('proc_guardarPrestamo');

      for (let i = 0; i < registros.length; i++) {
        const req2 = await pool.request();
        await req2
          .input('IdInventario', sql.Int, datos.campos.almacen.valor)
          .input('IdPlaza', sql.Int, datos.campos.plaza.valor)
          .input('IdMoldeOrigen', sql.Int, datos.campos.moldeOrigen.valor)
          .input('IdMoldeDestino', sql.Int, datos.campos.moldeDestino.valor)
          .input('IdPrestamo', sql.Int, prestamo.recordset[0]['PrestamoId'])
          .input('CodigoOrigen', sql.Int, registros[i].CodigoOrigen)
          .input('CodigoDestino', sql.Int, registros[i].CodigoDestino)
          .input('Cantidad', sql.Int, registros[i].Monto)
          .input('Estatus', sql.VarChar(50), registros[i].Estatus)
          .input('EsPieza', sql.Int, registros[i].EsPieza)
          .input('IdUsuario', sql.Int, 26921)
          .execute('proc_guardarPrestamoDetalle'); 
      }

      let msj = 'Prestamo guardado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Error al obtener los insumos');
    }
  },

  devolver : async (ctx) => {
    
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const datos = ctx.request.body;
      const res = await req
        .input('IdPrestamoDetalle', datos.IdPrestamoDetalle)
        .input('IdPlaza', datos.IdPlaza)
        .input('IdInventario', datos.IdAlmacen)
        .input('IdMoldeOrigen', datos.IdMoldeOrigen)
        .input('IdMoldeDestino', datos.IdMoldeDestino)
        .input('Monto', datos.Monto)
        .input('CantAlm', datos.CantAlm)
        .input('CantObr', datos.CantObr)
        .input('ExistenciaTotal', datos.ExistenciaTotal)
        .input('Bandera', datos.Bandera)
        .execute('proc_devolverPrestamo');

      let msj = 'Prestamo fue devuelto correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      return ctx.response.badRequest('El prestamo no pudo ser devuelto');
    }
  },

  /**
   * Promise to edit a/an prestamo.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Prestamo.associations.map(a => a.alias));
    const data = _.omit(values, Prestamo.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Prestamo.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Prestamo.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an prestamo.
   *
   * @return {Promise}
   */

  existenciaPrestamos: async (ctx) => {
    // Convert `params` object to filters compatible with Mongo.
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      const res = await req
        .input('CodigoOrigen', datos.CodigoOrigen)
        .input('IdMoldeOrigen', datos.IdMoldeOrigen)
        .input('CodigoDestino', datos.CodigoDestino)
        .input('IdMoldeDestino', datos.IdMoldeDestino)
        .input('IdPlaza', datos.IdPlaza)
        .input('IdInventario', datos.IdInventario)
        .execute('proc_obtenerExistenciaPrestamos');
      return res.recordsets;
      
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Error al obtener los insumos');
    }
  },

  remove: async params => {
    // Select field to populate.
    const populate = Prestamo.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Prestamo
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Prestamo.associations.map(async association => {
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
   * Promise to search a/an prestamo.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('prestamo', params);
    // Select field to populate.
    const populate = Prestamo.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Prestamo.attributes).reduce((acc, curr) => {
      switch (Prestamo.attributes[curr].type) {
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

    return Prestamo
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
