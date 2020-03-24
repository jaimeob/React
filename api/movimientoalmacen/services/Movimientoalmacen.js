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
   * Promise to fetch all movimientoalmacens.
   *
   * @return {Promise}
   */

  fetchAll: async (ctx) => {
    // Convert `params` object to filters compatible with Mongo.
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerMovimientosAlmacenes');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los Movimientos');
    }
  },


  obtenerMovimientos: async (ctx) => {
    // Convert `params` object to filters compatible with Mongo.
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerMovimientosPedidos');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los Movimientos');
    }
  },

  insumos: async (ctx) => {
    // Convert `params` object to filters compatible with Mongo.
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      if(ctx.params._id == 'undefined') {
        const res = await req
          .execute('proc_obtenerInsumosPorUbicacion');
        return res.recordset;
      } else {
        const res = await req
          .input('IdPlaza', sql.Int, ctx.params._id)
          .input('IdConfiguracionMolde', sql.Int, ctx.params._id2)
          .input('IdAlmacen', sql.Int, ctx.params._id3)
          .input('IdMolde', sql.Int, ctx.params._id4)
          .execute('proc_obtenerInsumosPorUbicacion');
        return res.recordset;
      }
      
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Error al obtener los insumos');
    }
  },

  ubicaciones: async (ctx) => {
    // Convert `params` object to filters compatible with Mongo.
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerUbicaciones');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener las ubiaciones');
    }
  },

  moldes: async (ctx) => {
    // Convert `params` object to filters compatible with Mongo.
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerMoldesUbicacion');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los moldes');
    }
  },

  /**
   * Promise to fetch a/an movimientoalmacen.
   *
   * @return {Promise}
   */

  fetch: async (ctx) => {
    // Select field to populate.
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdMovimientoAlmacen', ctx.params._id)
        .execute('proc_obtenerMovimientosAlmacenesDetalle');
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('El movimiento no pudo obtener');
    }
  },

  /**
   * Promise to count movimientoalmacens.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('movimientoalmacen', params);

    return Movimientoalmacen
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an movimientoalmacen.
   *
   * @return {Promise}
   */

  add: async (ctx) => {
    try {

      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      const movimiento = await req
        .input('IdAlmacenOrigen', sql.Int, datos[0].almacenOrigen.valor)
        .input('IdAlmacenDestino', sql.Int, datos[0].almacenDestino.valor)
        .input('IdPlaza', sql.Int, datos[0].plaza.valor)
        .input('IdInventario', sql.Int, datos[0].inventario.valor)
        .input('Descripcion', sql.VarChar(50), datos[0].descripcion.valor)
        .input('Observaciones', sql.VarChar(50), datos[0].observaciones.valor)
        .input('IdUsuarioCreacion', sql.Int, datos[4].IdUsuario)
        .input('IdMolde', sql.Int, datos[3])
        .execute('proc_guardarMovimientoAlmacen');
      
      for (let i = 0; i < datos[1].length; i++) {
        let EsPieza = 0;
        if(datos[1][i].EsPieza === true) {
          EsPieza = 1;
        }

        if(datos[0].usos.valor === '') {
          datos[0].usos.valor = 0;
        }

        const req2 = await pool.request();
        const req3 = await pool.request();
        const req4 = await pool.request();
        await req2
          .input('IdMovimientoAlmacen', sql.Int, movimiento.recordset[0]['IdMovimientoAlmacen'])
          .input('IdInsumo', sql.Int, datos[1][i].IdInsumo)
          .input('EsPieza', sql.Int, EsPieza)
          .input('Cantidad', sql.Int, datos[1][i].Cantidad)
          .input('IdUsuarioCreacion', sql.Int, datos[4].IdUsuario)
          .execute('proc_guardarMovimientoAlmacenDetalle');
        await req3
          .input('IdAlmacenDestino', sql.Int, datos[0].almacenDestino.valor)
          .input('IdAlmacenOrigen', sql.Int, datos[0].almacenOrigen.valor)
          .input('IdPlaza', sql.Int, datos[0].plaza.valor)
          .input('Usos', sql.Int, datos[1][i].CantUsos)
          .input('IdInsumo', sql.Int, datos[1][i].IdInsumo)
          .input('IdInsumoDestino', sql.Int, datos[1][i].IdInsumo)
          .input('Estatus', sql.VarChar(50), 'REFCOM')
          .input('EsPieza', sql.Int, EsPieza)
          .input('Cantidad', sql.Int, datos[1][i].Cantidad)
          .input('IdInventario', sql.Int, datos[0].inventario.valor)
          .input('IdUsuarioCreacion', sql.Int, datos[4].IdUsuario)
          .input('IdMolde', sql.Int, datos[1][i].IdMolde)
          .input('IdMoldeN', sql.Int, datos[1][i].IdMolde)
          .execute('proc_guardarExistenciaInventario');

        // await req4
        //   .input('IdPlaza', sql.Int, datos[0].plaza.valor)
        //   .input('IdAlmacen', sql.Int, datos[0].almacenDestino.valor)
        //   .input('IdAlmacenOrigen', sql.Int, datos[0].almacenOrigen.valor)
        //   .input('IdMantenimiento', sql.Int, datos[1][i].IdMantenimiento)
        //   .input('Planta', sql.Int, datos[1][i].IdPlanta)
        //   .input('IdMolde', sql.Int, datos[1][i].IdMolde)
        //   .input('IdInsumo', sql.Int, datos[1][i].IdInsumo)
        //   .input('EsPieza', sql.Int, EsPieza)
        //   .input('Usos', sql.Int, datos[1][i].CantUsos)
        //   .input('Usuario', sql.Int, datos[4].IdUsuario)
        //   .execute('proc_guardarMantenimiento');
        
      }

      for (let i = 0; i < datos[2].length; i++) {
        let EsPieza = 0;

        if(datos[2][i].EsPieza === true) {
          EsPieza = 1
        }

        if(datos[0].usos.valor === '') {
          datos[0].usos.valor = 0;
        }
        
        const cantidad = datos[2][i].Input;

        const req2 = await pool.request();
        const req3 = await pool.request();
        const req4 = await pool.request();
        await req2
          .input('IdMovimientoAlmacen', sql.Int, movimiento.recordset[0]['IdMovimientoAlmacen'])
          .input('IdInsumo', sql.Int, datos[2][i].IdInsumo)
          .input('EsPieza', sql.Int, EsPieza)
          .input('Cantidad', sql.Int, datos[2][i].Input)
          .input('IdUsuarioCreacion', sql.Int, datos[4].IdUsuario)
          .execute('proc_guardarMovimientoAlmacenDetalle'); 

        await req3
          .input('IdAlmacenDestino', sql.Int, datos[0].almacenDestino.valor)
          .input('IdAlmacenOrigen', sql.Int, datos[0].almacenOrigen.valor)
          .input('IdPlaza', sql.Int, datos[0].plaza.valor)
          .input('Usos', sql.Int, datos[2][i].CantUsos)
          .input('IdInsumo', sql.Int, datos[2][i].IdInsumo)
          .input('IdInsumoDestino', sql.Int, datos[2][i].IdInsumo)
          .input('Estatus', sql.VarChar(50), 'REFCOM')
          .input('EsPieza', sql.Int, EsPieza)
          .input('Cantidad', sql.Int, cantidad)
          .input('IdInventario', sql.Int, datos[0].inventario.valor)
          .input('IdUsuarioCreacion', sql.Int, datos[4].IdUsuario)
          .input('IdMolde', sql.Int, datos[2][i].IdMolde)
          .input('IdMoldeN', sql.Int, datos[2][i].IdMolde)
          .execute('proc_guardarExistenciaInventario');

        // await req4
        //   .input('IdPlaza', sql.Int, datos[0].plaza.valor)
        //   .input('IdAlmacen', sql.Int, datos[0].almacenDestino.valor)
        //   .input('IdAlmacenOrigen', sql.Int, datos[0].almacenOrigen.valor)
        //   .input('IdMantenimiento', sql.Int, datos[2][i].IdMantenimiento)
        //   .input('Planta', sql.Int, datos[2][i].IdPlanta)
        //   .input('IdMolde', sql.Int, datos[2][i].IdMolde)
        //   .input('IdInsumo', sql.Int, datos[2][i].IdInsumo)
        //   .input('EsPieza', sql.Int, EsPieza)
        //   .input('Usos', sql.Int, datos[2][i].CantUsos)
        //   .input('Usuario', sql.Int, datos[4].IdUsuario)
        //   .execute('proc_guardarMantenimiento');
      }

      let msj = 'Movimiento guardado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar el movimiento');
    }
  },

  plazasUsuario: async (ctx) => {
    try {

      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      
      const res = await req
        .input('IdUsuario', sql.Int, datos.usuarioId)
        .execute('proc_obtenerPlazasPorUsuario');

      let msj = 'Las plazas se obtuvieron correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener las plazas');
    }
  },

  almacenesUsuario: async (ctx) => {
    try {

      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      
      const res = await req
        .input('IdUsuario', sql.Int, datos.usuarioId)
        .input('IdPlaza', sql.Int, datos.idPlaza)
        .execute('proc_obtenerAlmacenesPorUsuario');

      let msj = 'Los almacenes se obtuvieron correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los almacenes');
    }
  },

  /**
   * Promise to edit a/an movimientoalmacen.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Movimientoalmacen.associations.map(a => a.alias));
    const data = _.omit(values, Movimientoalmacen.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Movimientoalmacen.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Movimientoalmacen.updateRelations(Object.assign(params, { values: relations }));
  },

  eliminar : async (ctx) => {
    
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdMovimientoAlmacen', ctx.params._id)
        .execute('proc_eliminarMovimientoAlmacen');
      return res;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('El movimiento no pudo ser eliminado');
    }
  },

  /**
   * Promise to remove a/an movimientoalmacen.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Movimientoalmacen.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Movimientoalmacen
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Movimientoalmacen.associations.map(async association => {
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
   * Promise to search a/an movimientoalmacen.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('movimientoalmacen', params);
    // Select field to populate.
    const populate = Movimientoalmacen.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Movimientoalmacen.attributes).reduce((acc, curr) => {
      switch (Movimientoalmacen.attributes[curr].type) {
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

    return Movimientoalmacen
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
