/* eslint-disable no-undef */
'use strict';

/**
 * Empleados.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const { SQLHandler, poolPromiseServDesarrollo } = require('./../../../config/functions/bootstrap');
const config = require('../../../config/environments/development/server.json');

const upperText = (nombre) =>
  nombre.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

module.exports = {

  /**
   * Promise to fetch all empleados.
   *
   * @return {Promise}
   */

  fetchAll: () => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('empleados', {'estatus' : true});
    // Select field to populate.
    const populate = Empleados.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Empleados
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an empleados.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Empleados.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Empleados
      .findOne(_.pick(params, _.keys(Empleados.schema.paths)))
      .where({'estatus' : true})
      .populate(populate);
  },

  /**
   * Promise to count empleados.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('empleados', params);

    return Empleados
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an empleados.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Empleados.associations.map(ast => ast.alias));
    const data = _.omit(values, Empleados.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Empleados.create(data);

    // Create relational data and return the entry.
    return Empleados.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an empleados.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Empleados.associations.map(a => a.alias));
    const data = _.omit(values, Empleados.associations.map(a => a.alias));

    // Update entry with no-relational data.
    await Empleados.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Empleados.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an empleados.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Empleados.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Empleados
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Empleados.associations.map(async association => {
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
   * Promise to search a/an empleados.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('empleados', params);
    // Select field to populate.
    const populate = Empleados.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Empleados.attributes).reduce((acc, curr) => {
      switch (Empleados.attributes[curr].type) {
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

    return Empleados
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },
  obtenerPorFormularioAsignado: async (ctx) => {
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
      // const FormularioId = searchParams.get('FormularioId') || null;
      // const NoEmpleado = searchParams.get('NoEmpleado') || null;
      // const NoEmpleadoAsigna = searchParams.get('NoEmpleadoAsigna') || null;
      const IdDepartamento = searchParams.get('IdDepartamento') || null;
      // const IdConfigFormulario = searchParams.get('IdConfigFormulario') || null;
      
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'IdDepartamento',
          type: sql.Int,
          value: IdDepartamento },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_listarEmpleadosAsignadosPorDep',
          parameters
        );
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método obtenerPorFormularioAsignado',
        error,
      );
    }
  },
  obtenerPorDepartamento: async (ctx) => {
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
      const IdDepartamento = searchParams.get('IdDepartamento') || null;
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'IdDepartamento',
          type: sql.Int,
          value: IdDepartamento },
        { param: 'Activo',
          type: sql.Int,
          value: 1 },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_listarEmpleados',
          parameters
        );
      return res.recordset;
    } catch (error) {
      console.log(error);
      return badRequest(
        'Ocurrió un error al ejecutar el método obtenerPorDepartamento',
        error,
      );
    }
  },
  obtenerEmpleadosSinUsuario: async(ctx) => {
    try{
      const pool = await poolPromiseServDesarrollo;
      const empleados = await pool.request()
        .execute('proc_obtenerEmpleadosSinUsuarios');
      
      for (let i = 0; i < empleados.recordset.length; i++) {
        empleados.recordset[i].label = upperText(empleados.recordset[i].label);
      }

      return empleados.recordset;
    }catch(err){
      return ctx.response.badRequest('Error al obtener los empleados');
    }
  },

  obtenerEmpleadoInformacion: async(ctx) => {
    try{
      const response = {
        info: [],
        modulos: [],
      };

      const pool = await poolPromiseServDesarrollo;
      const idEmpleado = ctx.params.idEmpleado;
      const empleado = await pool.request()
        .input('IdEmpleado', sql.Int, idEmpleado)
        .execute('proc_obtenerEmpleadoInformacion');
      
      empleado.recordset[0].nombreEmpleado = upperText(
        empleado.recordset[0].nombreEmpleado
      );
      
      if(empleado.recordset[0].Imagen != null){
        const hexStr = empleado.recordset[0].Imagen.slice(2);
        const buf = new ArrayBuffer(hexStr.length);
        const byteBuf = new Uint8Array(buf);

        for (let i=0; i<hexStr.length; i+=2) {
          byteBuf[i/2] = parseInt(hexStr.slice(i,i+2),16);
        }

        const directorioImagen =  __dirname+'/../../../public/uploads/';
        const n = empleado.recordset[0].Correo.indexOf('@');
        const usuarioDominio = empleado.recordset[0].Correo.substring(0, n);

        require('fs').writeFile(directorioImagen+usuarioDominio+'.jpg', byteBuf, 'binary', (err) => {
          if(!err)
          {
            empleado.recordset[0].Imagen = 'http://'+config.host+':'+config.port+'/uploads/'+usuarioDominio+'.jpg';
          } else {
            console.log('err',err);
          }
        });
      }

      
      response.info = empleado.recordset;
      ctx.params.idPuesto = empleado.recordset[0].idPuesto;

      const modulos = await strapi.services.rol.obtenerModulosPorPuesto(ctx);
        
      response.modulos = modulos;
      return response;
    }catch(err){
      console.log(err)
      return ctx.response.badRequest('Error al obtener los empleados');
    }
  },
};
