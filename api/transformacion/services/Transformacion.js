'use strict';

/**
 * Transformacion.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const { poolPromise } = require('./../../../config/functions/bootstrap');

module.exports = {

  /**
   * Promise to fetch all transformacions.
   *
   * @return {Promise}
   */

  fetchAll: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerTransformaciones');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener las Transformaciones');
    }
  },

  moldes: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerMolde');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los moldes');
    }
  },

  movimientosTransformaciones: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerMovimientosTransformaciones');
      return res.recordset;
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Error al obtener los movimientos');
    }
  },

  movimientoDetalle: async(ctx) => {
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdMovimientoTransformacion', ctx.params._id)
        .execute('proc_obtenerMovimientoTransformacionDetalle');
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('No pudo obtenerce el detalle');
    }
  },

  secciones : async (ctx) => {
    
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdMolde', ctx.params._id)
        .execute('proc_obtenerSeccionesMolde');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('No pudieron obtenerce las secciones');
    }
  },

  piezas : async (ctx) => {
    
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdMolde', ctx.params._id)
        .execute('proc_obtenerPiezasMolde');
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('No pudieron obtenerce las piezas');
    }
  },

  moldesDestino : async (ctx) => {
    
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdMolde', ctx.params._id)
        .execute('proc_obtenerMoldesDestino');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('No pudieron obtenerce los moldes');
    }
  },

  /**
   * Promise to fetch a/an transformacion.
   *
   * @return {Promise}
   */

  fetch: async (ctx) => {
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdTransformacion', ctx.params._id)
        .execute('proc_obtenerTransformacionDetalle');

      let result = [];
      result = res.recordsets[0][0];
      result.piezas = res.recordsets[1];
      
      return result;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('No pudo obtenerce el detalle de la transformacion');
    }
  },

  /**
   * Promise to count transformacions.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('transformacion', params);

    return Transformacion
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an transformacion.
   *
   * @return {Promise}
   */

  add: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      const transformacion = await req
        .input('IdMoldeOrigen', sql.Int, datos.idOrigen)
        .input('IdMoldeDestino', sql.Int, datos.idDestino)
        .input('IdUsuarioCreacion', sql.Int, 26921)
        .execute('proc_guardarTransformacion');
      for (let i = 1; i < datos.columns.length; i++) {
        for (const task of datos.columns[i].tasks) {
          let piezaDestino;
          let piezaOrigen;
          let esPieza;
          
          if(datos.columns[i].IdPieza){
            piezaDestino = datos.columns[i].IdPieza;
          } else {
            piezaDestino = datos.columns[i].IdAccesorio;
          }

          if (task.IdPieza) {
            piezaOrigen = task.IdPieza;
            esPieza = 1;
          } else {
            piezaOrigen = task.IdAccesorio;
            esPieza = 0;
          }

          const req2 = await pool.request();
          await req2
            .input('IdTransformacion', sql.Int, transformacion.recordset[0]['IdTransformacion'])
            .input('IdPiezaOrigen', sql.Int, piezaOrigen)
            .input('IdPiezaDestino', sql.Int, piezaDestino)
            .input('IdUsuarioCreacion', sql.Int, 26921)
            .input('EsPieza', sql.Int, esPieza)
            .execute('proc_guardarTransformacionDetalle');  
        }
        
      }
      let msj = 'Transformación guardada correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar la transformación');
    }
  },

  movimientoTransformacion: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const req2 = await pool.request();
      const datos = ctx.request.body;
      
      const insumos = [];

      datos[1].forEach(pieza => {
        insumos.push(pieza)
      });

      datos[2].forEach(accesorio => {
        insumos.push(accesorio)
      });

      const molde = await req
        .input('IdConfiguracionMolde', sql.Int, datos[0].idMoldeDestino.valor)
        .input('IdEstatus', sql.VarChar(50), 'REFINC')
        .input('IdUsuarioCreacion', sql.Int, datos[5].IdUsuario)
        .execute('proc_guardarMolde');

      const transformacion = await req2
        .input('IdPlaza', sql.Int, datos[0].plaza.valor)
        .input('IdMoldeOrigen', sql.Int, datos[0].idMoldeOrigen.valor)
        .input('IdMoldeDestino', sql.Int, molde.recordset[0]['IdMolde'])
        .input('IdAlmacen', sql.Int, datos[0].inventario.valor)
        .input('Descripcion', sql.VarChar(50), datos[0].descripcion.valor)
        .input('Observaciones', sql.VarChar(50), datos[0].observaciones.valor)
        .input('IdUsuarioCreacion', sql.Int, datos[5].IdUsuario)
        .execute('proc_guardarMovimientoTransformacion');

      insumos.forEach(async insumo => {
        const req3 = await pool.request();
        
        await req3
          .input('IdMovimientoTransformacion', sql.Int, transformacion.recordset[0]['IdMovimientoTransformacion'])
          .input('IdPiezaOrigen', sql.Int, insumo.IdPiezaOrigen)
          .input('IdPiezaDestino', sql.Int, insumo.IdPiezaDestino)
          .input('EsPieza', sql.Int, insumo.EsPieza)
          .input('Cantidad', sql.Int, insumo.Cantidad)
          .input('IdMolde', sql.Int, molde.recordset[0]['IdMolde'])
          .input('IdUsuarioCreacion', sql.Int, datos[5].IdUsuario)
          .execute('proc_guardarMovimientoTransformacionDetalle');
      });

      datos[3].forEach(async update => {
        const req4 = await pool.request();
        await req4
          .input('IdAlmacen', sql.Int, update.IdAlmacen)
          .input('IdPlaza', sql.Int, update.IdPlaza)
          .input('IdInventario', sql.Int, datos[0].inventario.valor)
          .input('Usos', sql.Int, update.Usos)
          .input('IdInsumo', sql.Int, update.IdInsumo)
          .input('Estatus', sql.VarChar(10), update.Estatus)
          .input('EsPieza', sql.Int, update.EsPieza)
          .input('Cantidad', sql.Int, update.Cantidad)
          .input('IdUsuarioCreacion', sql.Int, datos[5].IdUsuario)
          .input('IdMolde', sql.Int, update.IdMolde)
          .execute('proc_existenciaInventarioActualizar');
      });

      datos[4].forEach(async insert => {
        const req5 = await pool.request();
        await req5
          .input('IdAlmacen', sql.Int, insert.IdAlmacen)
          .input('IdPlaza', sql.Int, insert.IdPlaza)
          .input('IdInventario', sql.Int, datos[0].inventario.valor)
          .input('Usos', sql.Int, insert.Usos)
          .input('IdInsumo', sql.Int, insert.IdInsumo)
          .input('Estatus', sql.VarChar(10), insert.Estatus)
          .input('EsPieza', sql.Int, insert.EsPieza)
          .input('Cantidad', sql.Int, insert.Cantidad)
          .input('IdUsuarioCreacion', sql.Int, datos[5].IdUsuario)
          .input('IdMolde', sql.Int, molde.recordset[0]['IdMolde'])
          .execute('proc_existenciaInventarioCrear');
      });
      
      let msj = 'Transformación guardada correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar la transformación');
    }
  },

  insumos: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      const res = await req
        .input('IdMoldeOrigen', sql.Int, datos.idMoldeOrigen)
        .input('IdMoldeDestino', sql.Int, datos.idMoldeDestino)
        .input('IdPlaza', sql.Int, datos.idPlaza)
        .input('IdInventario', sql.Int, datos.idInventario)
        .input('IdMolde', sql.Int, datos.idMolde)
        .input('Bandera', sql.Int, datos.bandera)
        .execute('proc_obtenerInsumosTransformaciones');
      let msj = 'Los insumos se obtuvieron correctamente';
      
      ctx.response.status = 200;
      ctx.response.message = msj;
      // console.log("Que datos me trae aqui",res.recordsets)
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al Obtener los insumos');
    }
  },

  eliminar : async (ctx) => {
    
    try {
      const pool = await poolPromise; 
      const req = await pool.request();
      const res = await req
        .input('IdTransformacion', ctx.params._id)
        .execute('proc_eliminarTransformacion');
      const req2 = await pool.request();
      await req2
        .input('IdTransformacion', ctx.params._id)
        .execute('proc_eliminarTransformacionDetalle');
      return res;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('La Transformacion no pudo ser eliminada');
    }
  },

  /**
   * Promise to edit a/an transformacion.
   *
   * @return {Promise}
   */

  edit: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      const transformacion = await req
        .input('IdTransformacion', sql.Int, datos.idTransformacion)
        .execute('proc_eliminarTransformacionDetalle');
      for (let i = 1; i < datos.columns.length; i++) {
        for (const task of datos.columns[i].tasks) {
          let piezaDestino;
          let piezaOrigen;
          let esPieza;
          
          if(datos.columns[i].IdPieza){
            piezaDestino = datos.columns[i].IdPieza;
          } else {
            piezaDestino = datos.columns[i].IdAccesorio;
          }

          if (task.IdPieza) {
            piezaOrigen = task.IdPieza;
            esPieza = 1;
          } else {
            piezaOrigen = task.IdAccesorio;
            esPieza = 0;
          }

          const req2 = await pool.request();
          await req2
            .input('IdTransformacion', datos.idTransformacion)
            .input('IdPiezaOrigen', sql.Int, piezaOrigen)
            .input('IdPiezaDestino', sql.Int, piezaDestino)
            .input('IdUsuarioCreacion', sql.Int, 26921)
            .input('EsPieza', sql.Int, esPieza)
            .execute('proc_guardarTransformacionDetalle');  
        }
        
      }
      let msj = 'Transformación guardada correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar la transformación');
    }
  },

  devolverTransformacion: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      const campos = datos.campos;
      const accesorios = datos.tablas.accesorios.datos;
      const piezas = datos.tablas.piezas.datos;

      for (let i = 0; i < accesorios.length; i++) {
        console.log('entre al primero - accesorios')
        await req
          .input('IdTransformacion', sql.Int, datos.idTransformacion)
          .input('IdPlaza', sql.Int, campos.plaza.valor)
          .input('IdInventario', sql.Int, campos.inventario.valor)
          .input('IdMoldeOrigen', sql.Int, campos.idMoldeOrigen.valor)
          .input('IdMoldeDestino', sql.Int, campos.idMoldeDestino.valor)
          .input('Monto', sql.Int, accesorios[i].Cantidad)
          .input('IdPiezaOrigen', accesorios[i].IdPiezaOrigen)
          .input('EsPiezaOrigen', accesorios[i].EsPieza)
          .input('IdPiezaDestino', accesorios[i].IdPiezaDestino)
          .input('EsPiezaDestino', accesorios[i].EsPieza)
          .execute('proc_devolverTransformacion');
      }

      for (let i = 0; i < piezas.length; i++) {
        console.log('entre al segundo - piezas')

        await req
          .input('IdTransformacion', sql.Int, datos.idTransformacion)
          .input('IdPlaza', sql.Int, campos.plaza.valor)
          .input('IdInventario', sql.Int, campos.inventario.valor)
          .input('IdMoldeOrigen', sql.Int, campos.idMoldeOrigen.valor)
          .input('IdMoldeDestino', sql.Int, campos.idMoldeDestino.valor)
          .input('Monto', sql.Int, piezas[i].Cantidad)
          .input('IdPiezaOrigen', piezas[i].IdPiezaOrigen)
          .input('EsPiezaOrigen', piezas[i].EsPieza)
          .input('IdPiezaDestino', piezas[i].IdPiezaDestino)
          .input('EsPiezaDestino', piezas[i].EsPieza)
          .execute('proc_devolverTransformacion');
      }
      
      let msj = 'Transformación devuelta correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar la transformación');
    }
  },

  /**
   * Promise to remove a/an transformacion.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Transformacion.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Transformacion
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Transformacion.associations.map(async association => {
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
   * Promise to search a/an transformacion.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('transformacion', params);
    // Select field to populate.
    const populate = Transformacion.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Transformacion.attributes).reduce((acc, curr) => {
      switch (Transformacion.attributes[curr].type) {
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

    return Transformacion
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
