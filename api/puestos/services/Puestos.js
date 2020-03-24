/* eslint-disable no-undef */
'use strict';

/**
 * Plantillatickets.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const request = require('request');
const fs = require('fs');
const JSZip = require('jszip');

const { poolPromise, poolPromiseServDesarrollo } = require('./../../../config/functions/bootstrap');
const {
  SQLHandler,
} = require('./../../../config/functions/bootstrap');
// const env = process.env.NODE_ENV;
const {
  env: {
    NODE_ENV: n = 'development',
    driver : d = 'mssql'
  }
} = process;

module.exports = {

  /**
   * Promise to fetch all puestos.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('puestos', {'estatus' : true});
    // Select field to populate.
    const populate = Puestos.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Puestos
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an puestos.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Puestos.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Puestos
      .findOne(_.pick(params, _.keys(Puestos.schema.paths)))
      .where({'estatus' : true})
      .populate(populate);
  },

  /**
   * Promise to count puestos.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('puestos', params);

    return Puestos
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an puestos.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Puestos.associations.map(ast => ast.alias));
    const data = _.omit(values, Puestos.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Puestos.create(data);

    // Create relational data and return the entry.
    return Puestos.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an puestos.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Puestos.associations.map(a => a.alias));
    const data = _.omit(values, Puestos.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Puestos.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Puestos.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an puestos.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Puestos.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Puestos
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Puestos.associations.map(async association => {
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
   * Promise to search a/an puestos.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('puestos', params);
    // Select field to populate.
    const populate = Puestos.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Puestos.attributes).reduce((acc, curr) => {
      switch (Puestos.attributes[curr].type) {
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

    return Puestos
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  puestosRoles: async() => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const res = await req.execute('proc_obtenerPuestoRol');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los puestos - roles');
    }
  },

  /**
   * Promise to activar a/an puesto - rol.
   *
   * @return {Promise}
   */
  activar: async (ctx, body) => {
    try {
      const ids = body.join(',');
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'Arreglo',
          type: sql.VarChar,
          value: ids 
        },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_activarPuestoRol',
          parameters
        );
      
      return res.recordsets;

    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método activar',
        error,
      );
    }
  },

  /**
   * Promise to desactivar a/an modulo.
   *
   * @return {Promise}
   */
  desactivar: async (ctx, body) => {
    try {
      const ids = body.join(',');
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'Arreglo',
          type: sql.VarChar,
          value: ids 
        },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_desactivarPuestoRol',
          parameters
        );
      
      return res;

    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método desactivar',
        error,
      );
    }
  },

  puestosRolesArchivos: async(ctx) => {
    try {
      const {
        params:{
          _id = ''
        }
      } = ctx;

      if(!_id.length){
        return ctx.badRequest('Id no definido');
      }

      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'IdPuesto',
          type: sql.Int,
          value: _id },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_obtenerPuestoRolEvidencia',
          parameters
        );
    
      if(res.recordset.length == 1){
        return request(res.recordset[0].Ruta);
      } else if(res.recordset.length > 1) {
       
        var zip = new JSZip();

        for(let i = 0; i < res.recordset.length; i++){
          zip.file(res.recordset[i].NombreArchivo, request(res.recordset[i].Ruta));
        }

        const data = zip.generateAsync({type : 'nodebuffer'});

        return data;
      } else {
        return res.recordset;
      }
      
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al descargar los archivos');
    }
  },

  puestosRolesContarArchivos: async(ctx) => {
    try {
      const {
        params:{
          _id = ''
        }
      } = ctx;

      if(!_id.length){
        return ctx.badRequest('Id no definido');
      }

      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'IdPuesto',
          type: sql.Int,
          value: _id },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_obtenerPuestoRolEvidencia',
          parameters
        );
    
      return res.recordset.length;
        
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al descargar los archivos');
    }
  },


  puestosRolesArchivosMultiple: async(ctx) => {
    const ids = ctx.request.query.ids;
    
    try {
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'Arreglo',
          type: sql.VarChar,
          value: ids },
      ];
      
      const res = await sqlh
        .execProcedure(
          'proc_obtenerPuestoRolEvidenciaMultiple',
          parameters
        );

      if(res.recordset.length == 1){
        return request(res.recordset[0].Ruta);
      } else if(res.recordset.length > 1) {
        
        var zip = new JSZip();

        for(let i = 0; i < res.recordset.length; i++){
          let nombreArchivo = (`${res.recordset[i].NombrePuesto.trim()}_${res.recordset[i].NombreArchivo}`).replace(/\s/g, '_');

          zip.file(nombreArchivo, request(res.recordset[i].Ruta));
        }

        const data = zip.generateAsync({type : 'nodebuffer'});

        return data;
      } else {
        return res.recordset;
      }

      /*
      const zip = new JSZip();

      for(let i = 0; i < res.recordset.length; i++){
        let nombreArchivo = (`${res.recordset[i].NombrePuesto.trim()}_${res.recordset[i].NombreArchivo}`).replace(/\s/g, '_');

        zip.file(nombreArchivo, request(res.recordset[i].Ruta));
      }
      
      const data = zip.generateAsync({type : 'nodebuffer'});

      return data;
      */
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al descargar los archivos');
    }
  },

  obtenerPuestosConRol: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .execute('proc_obtenerPuestosConRol');
      
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los puestos');
    }
  },
};
