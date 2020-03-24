/* eslint-disable no-undef */
'use strict';
// import _ from 'lodash';
/**
 * Departamentos.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const url = require('url');
const rutaArchivo = "API_SIIFMX\api\departamentos\services\Departamentos.js";
const {
  poolPromise,
  // poolPromiseServDesarrollo,
  SQLHandler,
} = require('./../../../config/functions/bootstrap');


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


const byFormularioId = (elem) => (item) =>
  item.IdConfigFormulario === elem.IdConfigFormulario
  && item.FormularioId === elem.FormularioId;

module.exports = {

  /**
   * Promise to fetch all departamentos.
   *
   * @return {Promise}
   */

  fetchAll: async() => {
    const filters = strapi.utils.models.convertParams('departamentos', {'estatus' : true});
    return Departamentos
      .find()
      .where(filters.where)
      .sort({'nombre': 1})
      .skip(filters.start)
      .limit(filters.limit);
  },
  obtenerSqlDepartamentoEmpleados: async () => {
    try {
      const pool = await poolPromise;
      const req = await pool.request(); 
      const res = await req.execute('proc_obtenerDepartamentosConEmpleados');  
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los departamentos');
    }
  },

  /**
   * Retorna los departamentos que cuentan con formularios.
   *
   * @return {Promise}
   */

  obtenerDepartamentoPlantillasFormularios: async (ctx) => {
    // Convert `params` object to filters compatible with Mongo.
    // const filters = strapi.utils.models.convertParams('departamentos', {'plantillaformulario' : null});
    try {
      const sqlh = new SQLHandler({ logResponses: true });
      const parameters = [];
      const res = await sqlh
        .execProcedure(
          'proc_listarCfgFormularioDepartamentos',
          parameters
        );
      const departamentosSQL = await res.recordset;
      console.log('departamentosSQL res', res);
      return _(departamentosSQL)
        .map((item) => ({
          ...item,
          nombre: item.Nombre,
        }))
        .groupBy((item) => item.IdDepartamento && item.Nombre)
        .map((value, key) => {        
          return {
            nombre: key,
            configuracionformulario: value,
          };
        })
        .value();
    } catch (error) {
      console.log('error', error);
      return ctx.badRequest('Ocurrió un error inesperado: ', error);
    }
  },

  /**
   * Promise to fetch a/an departamentos.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Departamentos.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');
    return Departamentos
      .findOne(_.pick(params, _.keys(Departamentos.schema.paths)))
      .where({'estatus' : true})
      .populate(populate);
  },
  /**
   * Promise para obtener los departamentos que tienen plantilla
   */
  obtenerDepartamentos: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request(); 
      const res = await req.execute('proc_obtenerDepartamentosPlantilla');  
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los departamentos');
    }
  },

  obtenerTodosDepartamentos: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request(); 
      const res = await req.execute('proc_obtenerDepartamentos');  
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los departamentos');
    }
  },

  /**
   * Promise para obtener empleados del departamento indicado
   * que se les haya enviado algun formulario.
   */
  obtenerUsuariosEnviadosDepartamentoSQL: async(ctx) => {
    try{
      const {
        request: {
          url: requestUrl,
          header: {
            host,
          },
        },
        params: {
          departamentoId = null,
          // IdConfigFormulario,
        }
      } = ctx;
      const currentUrl = new URL(`http://${host}${requestUrl}`);
      const searchParams = currentUrl.searchParams;
      const IdConfigFormulario = searchParams.get('IdConfigFormulario') || null;
      const sqlh = new SQLHandler({
        logResponses: true
      });
      const parameters = [
        { param: 'departamentoId',
          type: sql.SmallInt,
          value: departamentoId },
        { param: 'IdConfigFormulario',
          type: sql.VarChar(24),
          value: IdConfigFormulario },
      ];
      const res = await sqlh
        .execProcedure(
          'plfo_obtenerUsuariosFormulariosEnviados',
          parameters
        );
      return res.recordset;
    } catch (err) {
      return ctx.badRequest('Error al obtener los empleados', err);
    }
  },

  /**
   * Promise para obtener empleados por departamento
   */
  obtenerUsuariosDepartamento: async(ctx) => {
    try{
      const filters = strapi.utils.models.convertParams('departamentos', {'_id' : ctx.params._id});
      const config = getConfigProp('cnx');
      // const pool = await sql.connect(config);
      const empleadosDep = [];
      const empleadosEnviados = [];
      const response = [];

      const departaments = await Departamentos
        .find()
        .select('departamentoId empleados')
        .where(filters.where)
        .populate('empleados')
        .exec();
      departaments.map(dep =>
        dep.empleados.map(empleado =>
          empleadosDep.push(Object.assign(empleado.toObject(), {checked: false}))
        )
      );
      const pool = await poolPromise;
      const req = await pool.request();
      const [
        {
          departamentoId,
        },
      ] = departaments;

      const parameters = [
        { param: 'DepartamentoId',
          type: sql.Int,
          value: _.toSafeInteger(departamentoId) },
      ];
      parameters.forEach(
        async ({ param, type, value }) => {
          await req.input(param, type, value);
        }
      );
      const requestSQL = await pool.request()
        .input('DepartamentoId', sql.Int, _.toSafeInteger(departamentoId))
        .execute('plfo_obtenerUsuariosFormulariosEnviados');
      sql.close();
      const responseSQL = requestSQL.recordset;
      responseSQL.map(obj =>
        empleadosEnviados.push(obj.noEmpleado)
      );

      empleadosDep.map(emp => {
        const isEqual = _.includes(empleadosEnviados, emp.noEmpleado);
        if(!isEqual) response.push(emp);
      });

      return response;

    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener los empleados');
    }
  },

  /**
   * Promise para obtener empleados por departamento
   */
  obtenerDepartamentoEmpleados: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request(); 
      const res = await req
        .input('IdDepartamento', sql.Int, ctx.params._id)
        .execute('proc_obtenerEmpleadosPorDepartamento');  
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los departamentos');
    }
  },

  /**
   * Promise para obtener las plantillas por departamento
   */
  obtenerDepartamentoPlantillas: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const res = await req
        .input('IdDepartamento', sql.Int, ctx.params._id)
        .execute('proc_obtenerPlantillaPorDepartamento');  
      for (let i = 0; i < res.recordset.length; i++) {
        res.recordset[i].tipoForma = JSON.parse(res.recordset[i].tipoForma); 
      }
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener las plantillas');
    }
  },

  /**
   * Promise to count departamentos.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('departamentos', params);

    return Departamentos
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an departamentos.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Departamentos.associations.map(ast => ast.alias));
    const data = _.omit(values, Departamentos.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Departamentos.create(data);

    // Create relational data and return the entry.
    return Departamentos.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an departamentos.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Departamentos.associations.map(a => a.alias));
    const data = _.omit(values, Departamentos.associations.map(a => a.alias));

    // Update entry with no-relational data.
    await Departamentos.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Departamentos.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an departamentos.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Departamentos.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Departamentos
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Departamentos.associations.map(async association => {
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
   * Promise to search a/an departamentos.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('departamentos', params);
    // Select field to populate.
    const populate = Departamentos.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Departamentos.attributes).reduce((acc, curr) => {
      switch (Departamentos.attributes[curr].type) {
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

    return Departamentos
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Obtiene las plantillas de formularios del departamento.
   *
   * @return {Promise}
   */

  obtenerPlantillasFormulariosDepto: (params) => {
    // Select field to populate.
    const populate = Departamentos.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Departamentos
      .findOne(_.pick(params, _.keys(Departamentos.schema.paths)))
      .where({'estatus' : true})
      .populate(populate)
      .then((data, error) => {
        if(!error){
          const mapperData = (plantillas) => plantillas.estatus == true ? plantillas : false;
          const filterData = _.compact(data.plantillaformularios.map(mapperData));
          return filterData;
        } else {
          return [];
        }
      });
  },
  obtenerFormulariosEstatus: async (ctx) => {
    try {
      const {
        params: {
          FormularioId = null,
          NoEmpleado = null,
          NoEmpleadoAsignado = null,
          IdDepartamento = null,
          IdConfigFormulario = null,
        },
      } = ctx;
      const options = { logResponses: true };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'FormularioId',
          type: sql.Int,
          value: FormularioId },
        { param: 'NoEmpleado',
          type: sql.Int,
          value: NoEmpleado },
        { param: 'NoEmpleadoAsignado',
          type: sql.Int,
          value: NoEmpleadoAsignado },
        { param: 'IdDepartamento',
          type: sql.Int,
          value: IdDepartamento },
        { param: 'IdConfigFormulario',
          type: sql.Int,
          value: IdConfigFormulario },
      ];
      const res = await sqlh
        .execProcedure(
          'Proc_ObtenerFormulariosConEstatus',
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
  },
  obtenerFormulariosAsignados: async (ctx) => { // MARTINI METHOD
    try{
      const config = getConfigProp('cnx');
      const pool = await sql.connect(config);
      const departamentoId = ctx.params.departamentoId;
      const configFormularioId = ctx.params.configFormularioId;
      // const estado = ctx.params.estado.toUpperCase();
      const noEmpleado = ctx.params.noEmpleado;
      const response = {};
      const departamentos = [];
      const idDeptos = [];
      const respAssigns = [];
      const respFinished = [];
      
      if(_.isUndefined(noEmpleado)) {
        const requestFinSQL = await pool.request()
          .input('departamentoId', sql.SmallInt, _.toSafeInteger(departamentoId))
          .input('configFormularioId', sql.VarChar, configFormularioId)
          .input('estado', sql.VarChar, 'FINALIZADO')
          .execute('plfo_obtenerFormulariosAsignados');
        
        const requestEnPSQL = await pool.request()
          .input('DepartamentoId', sql.Int, _.toSafeInteger(departamentoId))
          .input('configFormularioId', sql.VarChar, configFormularioId)
          .input('Estado', sql.VarChar, 'ENPROCESO')
          .execute('plfo_obtenerFormulariosAsignados');

        const requestPenSQL = await pool.request()
          .input('DepartamentoId', sql.Int, _.toSafeInteger(departamentoId))
          .input('configFormularioId', sql.VarChar, configFormularioId)
          .input('Estado', sql.VarChar, 'PENDIENTE')
          .execute('plfo_obtenerFormulariosAsignados');

        sql.close();

        const finalizados = requestFinSQL.recordset;
        const enProceso = requestEnPSQL.recordset;
        const pendientes = requestPenSQL.recordset;

        response.finalized = finalizados;
        response.inProcess = enProceso;
        response.pending = pendientes;

      } else {

        const requesAsgSQL = await pool.request()
          .input('estado', sql.VarChar, 'ASIGNADOS')
          .input('noEmpleado', sql.Int, _.toSafeInteger(noEmpleado))
          .execute('plfo_obtenerFormulariosAsignados');

        const requesFinSQL = await pool.request()
          .input('estado', sql.VarChar, 'FINALIZADO')
          .input('noEmpleado', sql.Int, _.toSafeInteger(noEmpleado))
          .execute('plfo_obtenerFormulariosAsignados');

        sql.close();

        const assigns = requesAsgSQL.recordset;
        const finished = requesFinSQL.recordset;

        //Para filtrar los formularios que pertenecen al departamento
        const formulariosDep = (id, resp) => resp.filter( reg => reg.IdDepartamento === id );

        //Se obtienen los departamentos
        assigns.map(reg => {
          if(!_.includes(idDeptos, reg.IdDepartamento)){
            idDeptos.push(reg.IdDepartamento);
            departamentos.push({
              departamentoId: reg.IdDepartamento,
              nombre: reg.NombreDepartamento,
            });
          }
        });

        //Se forma la respuesta
        departamentos.map(dep => {
          respAssigns.push({
            departamentoId: dep.departamentoId,
            nombre: dep.nombre,
            open: true,
            formularios: formulariosDep(dep.departamentoId, assigns),
          });
        });

        //Se limpian
        departamentos.splice(0);
        idDeptos.splice(0);

        //Se obtienen los departamentos
        finished.map(reg => {
          if(!_.includes(idDeptos, reg.IdDepartamento)){
            idDeptos.push(reg.IdDepartamento);
            departamentos.push({
              departamentoId: reg.IdDepartamento,
              nombre: reg.NombreDepartamento,
            });
          }
        });
        
        //Se forma la respuesta
        departamentos.map(dep => {
          respFinished.push({
            departamentoId: dep.departamentoId,
            nombre: dep.nombre,
            open: true,
            formularios: formulariosDep(dep.departamentoId, finished),
          });
        });

        response.assigns = respAssigns;
        response.finished = respFinished;

      }

      // Object
      return response;
        
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener los formularios asignados');
    }
  },

  obtenerconformularios: async (params, response) => {
    try {
      const departamentosIds = [];
      const filters = strapi.utils.models.convertParams('departamentos', params);
      // se obtiene primero los departamentos que cuentan con una configuración gestionada.
      const populateCfg = Configuracionformulario.associations
        .filter(ast => ast.autoPopulate !== false)
        .map(ast => ast.alias)
        .join(' ');
      const configFormularios = await Configuracionformulario
        .find()
        .populate(populateCfg)
        .exec();
      configFormularios.forEach((cfg) => {
        const {
          departamento: depaId,
        } = cfg;
        departamentosIds.push(depaId);
      });     
      
      // const populate = {}
      return Departamentos
        .find()
        .populate('configuracionformularios')
        .where('_id').in(departamentosIds)
        .skip(filters.start)
        .limit(filters.limit);
        
    } catch (error) {
      console.log('error in obtenerconformularios', error);
      return error;
    }
  },
};
