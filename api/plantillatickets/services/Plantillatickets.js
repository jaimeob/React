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
const { 
  poolPromise,
  poolPromiseServDesarrollo,
} = require('./../../../config/functions/bootstrap');
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
   * Promise to fetch all plantillatickets.
   *
   * @return {Promise}
   */

  fetchAll: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const res = await req.execute('proc_obtenerTicketPlantillas');
      for (let i = 0; i < res.recordset.length; i++) {
        res.recordset[i].tipoForma = JSON.parse(res.recordset[i].tipoForma); 
        const permisos = await req
          .input('IdPlantilla', sql.Int, res.recordset[i].IdPlantilla)
          .execute('proc_obtenerPlantillasPermisosPuesto');
        res.recordset[i].permisos = permisos.recordset;
        // const etapas = await req
        //   .input('IdPlantilla', sql.Int, res.recordset[i].IdPlantilla)
        //   .execute('proc_obtenerPlantillaEtapasPorId');
        // res.recordset[i].etapas = etapas.recordset;

        // for (let j = 0; j < etapas.recordset.length; j++) {
        //   res.recordset[i].etapas[j].configuracion = JSON.parse(res.recordset[i].etapas[j].configuracion);
        //   res.recordset[i].etapas[j].Catalogos = JSON.parse(res.recordset[i].etapas[j].Catalogos);
        //   const tiempos = await pool.request()
        //     .input('IdEtapa', sql.Int, etapas.recordset[j].IdEtapa)
        //     .execute('proc_obtenerEtapasTiempoPorId');
        //   res.recordset[i].etapas[j].tiempos = tiempos.recordset;
        //   const reglas = await pool.request()
        //     .input('IdEtapa', sql.Int, etapas.recordset[j].IdEtapa)
        //     .execute('proc_obtenerEtapasReglaPorId');
        //   res.recordset[i].etapas[j].reglas = reglas.recordset;
        //   for (let z = 0; z <  reglas.recordset.length; z++) {
        //     reglas.recordset[z].componentes = JSON.parse(reglas.recordset[z].componentes);
        //   }
          
        // }
        
      }
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener las plantillas');
    }
  },


  verPlantilla: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      // const res = await req.execute('proc_obtenerTicketPlantillas');
      console.log(ctx.params,'ctx.params');
      
      const res = await req
        .input('IdPlantilla', sql.Int, ctx.params._id)
        .execute('proc_obtenerPlantillaEtapasPorId');
      console.log(res,'RESULTADO');
        

      for (let j = 0; j < res.recordset.length; j++) {
        res.recordset[j].configuracion = JSON.parse(res.recordset[j].configuracion);
        res.recordset[j].Catalogos = JSON.parse(res.recordset[j].Catalogos);
        const tiempos = await pool.request()
          .input('IdEtapa', sql.Int, res.recordset[j].IdEtapa)
          .execute('proc_obtenerEtapasTiempoPorId');
        res.recordset[j].tiempos = tiempos.recordset;
        const reglas = await pool.request()
          .input('IdEtapa', sql.Int, res.recordset[j].IdEtapa)
          .execute('proc_obtenerEtapasReglaPorId');
        res.recordset[j].reglas = reglas.recordset;
        for (let z = 0; z <  reglas.recordset.length; z++) {
          reglas.recordset[z].componentes = JSON.parse(reglas.recordset[z].componentes);
        }
          
      }
        
      
      // console.log("Datos",res.recordset)
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener las plantillas');
    }
  },

  /**
   * Promise to fetch a/an plantillatickets.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    
    console.log('entra');
    // Select field to populate.
    const populate = Plantillatickets.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Plantillatickets
      .findOne(_.pick(params, _.keys(Plantillatickets.schema.paths)))
      .where({'estatus' : true})
      .populate(populate);
  },

  /**
   * Promise to count plantillatickets.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('plantillatickets', params);

    return Plantillatickets
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an plantillatickets.
   *
   * @return {Promise}
   */

  add: async (ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      const transaction = await pool.transaction();
      return new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            const etapasType = new sql.Table('PlantillaEtapa');
            const tiemposType = new sql.Table('EtapaTiempo');
            const reglasType = new sql.Table('EtapaRegla');
            const PermisosPuestoType = new sql.Table('PermisosPuesto');

            // console.log(PermisosPuestoType,'');<
            etapasType.columns.add('Id', sql.Int);
            etapasType.columns.add('IdEtapa', sql.Int);
            etapasType.columns.add('Nombre', sql.VarChar(255)); //
            etapasType.columns.add('IdPlaza', sql.Int);
            etapasType.columns.add('IdPlazaDestino', sql.Int);
            etapasType.columns.add('Orden', sql.Int);
            etapasType.columns.add('IdRol', sql.Int);
            etapasType.columns.add('IdUSuario', sql.Int);
            etapasType.columns.add('Cancelar', sql.Bit); //
            etapasType.columns.add('Seguimiento', sql.Bit);
            etapasType.columns.add('Configuracion', sql.NVarChar(sql.MAX));
            etapasType.columns.add('Catalogos', sql.NVarChar(4000));
            etapasType.columns.add('Activo', sql.Bit);

            reglasType.columns.add('Id', sql.Int);
            reglasType.columns.add('IdRegla', sql.Int);
            reglasType.columns.add('Nombre', sql.VarChar(255));
            reglasType.columns.add('IdEtapa', sql.Int);
            reglasType.columns.add('IdCondicion', sql.Int);
            reglasType.columns.add('IdCampo', sql.VarChar(255));
            reglasType.columns.add('Valor', sql.NVarChar(200));
            reglasType.columns.add('Valores', sql.Int);
            reglasType.columns.add('Activo', sql.Bit);
            reglasType.columns.add('CampoEspecial', sql.Bit);
            reglasType.columns.add('Componentes', sql.NVarChar(sql.MAX));
            reglasType.columns.add('nombreEtapa', sql.VarChar(255));
            
            tiemposType.columns.add('Id', sql.Int);
            tiemposType.columns.add('IdTiempo', sql.Int);
            tiemposType.columns.add('IdEtapa', sql.Int);
            tiemposType.columns.add('HoraInicio', sql.VarChar(80));
            tiemposType.columns.add('HoraFin', sql.VarChar(80));
            tiemposType.columns.add('SLA', sql.Int);

            PermisosPuestoType.columns.add('IdPermisosPuesto', sql.Int);
            PermisosPuestoType.columns.add('IdPuesto', sql.Int);
            PermisosPuestoType.columns.add('IdPlantilla', sql.Int);

            const etapas = datos.etapas;
            const ppt = datos.permisosPuestos;
            let cont = 0;

            for (let i = 0; i < ppt.length; i++) {
              PermisosPuestoType.rows.add(
                ppt[i].IdPermisosPuesto ? ppt[i].IdPermisosPuesto : i+1,
                ppt[i],
                datos.idPlantilla,
              );
            }


            for (let i = 0; i < etapas.length; i++) {
              etapasType.rows.add(
                i+1,

                etapas[i].idEtapa ? etapas[i].idEtapa : null,
                etapas[i].nombre, 
                etapas[i].idPlaza,
                etapas[i].idPlazaDestino, 
                etapas[i].orden, 
                etapas[i].idRol,
                etapas[i].idUsuario,
                etapas[i].cancelar,
                etapas[i].seguimiento,
                etapas[i].configuracion,
                `[${etapas[i].catalogos}]`,
                1
              );
              // REGLAS
              for (let j = 0; j < etapas[i].reglas.length; j++) {
                cont++;
                reglasType.rows.add(
                  cont,
                  etapas[i].reglas[j].idRegla ? etapas[i].reglas[j].idRegla : null,
                  etapas[i].reglas[j].nombre, 
                  etapas[i].idEtapa ? etapas[i].idEtapa : i+1,
                  // IdRelacion
                  etapas[i].reglas[j].condicion, 
                  etapas[i].reglas[j].campo,
                  `${etapas[i].reglas[j].valor}`,
                  `${etapas[i].reglas[j].valores}`,
                  1,
                  etapas[i].reglas[j].campoEspecial,
                  etapas[i].reglas[j].componentes,
                  etapas[i].reglas[j].nombreEtapa
                );
              }
              // TIEMPOS
              for (let k = 0; k < etapas[i].tiempos.length; k++) {
                cont++;
                tiemposType.rows.add(
                  cont,
                  etapas[i].tiempos[k].idTiempo ? etapas[i].tiempos[k].idTiempo : null,
                  etapas[i].idEtapa ? etapas[i].idEtapa : i+1,
                  etapas[i].tiempos[k].horaInicio, 
                  etapas[i].tiempos[k].horaFin, 
                  etapas[i].tiempos[k].SLA,
                  
                );
              }
            }
            // console.log(etapas,'datisa compa');
            const req = await transaction.request()
              .input('IdPlantilla', sql.Int, datos.idPlantilla)
              .input('Nombre', sql.VarChar(255), datos.nombre)
              .input('IdTipo', sql.Int, datos.tipostickets)
              .input('IdDepartamento', sql.Int, datos.departamentos)
              .input('IdPriorizador', sql.Int, datos.priorizador)
              .input('IdPuesto', sql.Int, datos.idPuesto)
              .input('Autorizacion', sql.Int, datos.autorizacion)
              .input('Seguimiento', sql.Int, datos.seguimiento)
              .input('TiempoRespuesta', sql.Int, datos.tiempoRespuesta)
              .input('TiempoCierre', sql.Int, datos.cierreRespuesta)
              .input('Activo', sql.Bit, 1)
              .input('Configuracion', sql.NVarChar(sql.MAX), JSON.stringify(datos.tipoForma))
              .input('IdUsuario', sql.Int, 26921)
              .input('EtapasType', etapasType)
              .input('ReglasType', reglasType)
              .input('TiemposType', tiemposType)
              .input('PermisosPuestoType', PermisosPuestoType)
              
              .input('ConfEspecial', sql.NVarChar(sql.MAX), null)
              .input('Catalogos', sql.NVarChar(4000), null)
              .input('TieneEtapas',sql.Int,datos.tieneEtapas)
              
              .execute('proc_guardarTicketPlantilla');
            await transaction.commit();
            Promise.resolve(req)
              .then((r) => resolve(r))
              .catch(err => reject(err));
          } catch(error) {
            console.log(error);
            
            await transaction.rollback()
              .then((r) => resolve(r))
              .catch(() => ctx.response.badRequest('Ocurrió un error interno'));
            reject(new Error('Hubo un error al ejecutar el procedimiento almacenado'));
          }
        });
      });
    } catch (err) {
      return ctx.response.badRequest('Ocurrió un error al guardar en la base de datos');
    }
  },

  obtenerPlazas : async (ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const response = {
        headers: [
          {
            name: 'IdPlaza', 
            options: {
              filter: false, 
              display: false
            },
          },
          'Plaza',
          {
            name: 'Etapas', 
          },
          {
            name: 'options', 
            label: ' ',
            options: {
              sort : false,
              filter: false,
              searchable: false,
            }
          }
        ],
        data: [],
        datosGenerales: [],
      };
      let arreglo = [];
      const res = await request
        .input('IdPlantilla', ctx.params.idPlantilla)
        .execute('proc_obtenerPlantillaPlazas');

      response.data.push(res.recordset);
      return response;
    } catch (error) {
      ctx.response.badRequest('Error al obtener las plazas');
    }
  },

  obtenerEtapas: async (ctx) => {
    try {
      const response = {
        headers: [
          {
            name: 'IdEtapa',
            options: {
              display: false,
            },
          },
          {
            name: 'Etapa',
            label: 'Etapa',
          },
          {
            name: 'TiempoDeSLA',
            label: 'Tiempo de SLA',
          },
          {
            name: 'Temporal',
            options: {
              display: false,
            },
          },
          {
            name: 'Plaza',
            options: {
              display: false,
            },
          },
          {
            name: 'Dependencia',
            label: 'Dependencia',
          },
          {
            name: 'Responsable',
            label: 'Responsable',
          },
          {
            name: 'Puesto',
            label: 'Puesto',
          },
        ],
        data: [],
      };
      let arreglo = [];
      let header = '';
      const pool = await poolPromise;
      const req = await pool.request();
      const res = await req
        .input('IdPlantilla', sql.Int, ctx.params.idPlantilla)
        .input('IdPlaza', sql.Int, ctx.params.idPlaza)
        .execute('proc_obtenerPlantillaEtapas');
      response.data.push(res.recordset);
      response.headers.push(
        {
          name: 'options', 
          label: ' ',
          options: {
            sort : false,
            filter: false,
            searchable: false,
          }
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      ctx.response.badRequest('Error al obtener las etapas');
    }
  },

  eliminarEtapa: async(ctx) => {
    try {
      const pool = await poolPromise;
      const datos = ctx.request.body;
      console.log(datos,'ETAPAS PARA ELIMINAR');
      
      
      datos.forEach(async id => {
        await pool.request()
          .input('IdEtapa', sql.Int, id)
          .execute('proc_eliminarEtapaPlantilla');
      });
      
      ctx.response.status = 200;
      ctx.response.message = 'Se ha eliminado correctamente';
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Hubo un error al eliminar la etapa');
    }
  },

  eliminarPlaza: async(ctx) => {
    try {
      const pool = await poolPromise;
      const datos = ctx.request.body;
      datos.forEach(async id => {
        await pool.request()
          .input('IdPlaza', sql.Int, id)
          .execute('proc_eliminarPlazaPlantilla');
      });
      
      ctx.response.status = 200;
      ctx.response.message = 'Se ha eliminado correctamente';
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Hubo un error al eliminar la etapa');
    }
  },
  /**
   * Promise to edit a/an plantillatickets.
   *
   * @return {Promise}
   */

  edit: async (ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      const idPlantilla = ctx.params._id;
      await req
        .input('IdPlantilla', sql.Int, idPlantilla)
        .input('Nombre', sql.VarChar(255), datos.nombre)
        .input('IdTipo', sql.Int, datos.tipostickets)
        .input('IdDepartamento', sql.Int, datos.departamentos)
        .input('IdPriorizador', sql.Int, datos.empleados)
        .input('TiempoRespuesta', sql.Int, datos.tiempoRespuesta)
        .input('TiempoCierre', sql.Int, datos.cierreRespuesta)
        .input('Activo', sql.Bit, 1)
        .input('Configuracion', sql.NVarChar(sql.MAX), JSON.stringify(datos.tipoForma))
        .input('IdUsuario', sql.Int, 26921)
        .input('Catalogos', sql.NVarChar(4000), null)
        .input('TieneEtapas',sql.Int,datos.tieneEtapas)
        .execute('proc_guardarTicketPlantilla');
      let msj = 'Plantilla actualizada correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;
      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar la plantilla');
    }
  },

  /**
   * Promise para eliminar varias plantillatickets
   * 
   */
  eliminarPlantillaTickets: async(ctx) => {
    const datos = ctx.request.body;
    try {
      const pool = await poolPromise;
      datos.arregloId.forEach(async id => {
        await pool.request()
          .input('IdPlantilla', sql.Int, id)
          .execute('proc_eliminarTicketPlantilla');
      });
      ctx.response.status = 200;
      ctx.response.message = 'Se eliminó correctamente';
      return ctx.response;
    } catch (error) {

      return ctx.response,badRequest('Error al eliminar la(s) plantilla(s)');
    }
  },
  
  /**
   * Promise to remove a/an plantillatickets.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Plantillatickets.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Plantillatickets
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Plantillatickets.associations.map(async association => {
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
   * Promise to search a/an plantillatickets.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('plantillatickets', params);
    // Select field to populate.
    const populate = Plantillatickets.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Plantillatickets.attributes).reduce((acc, curr) => {
      switch (Plantillatickets.attributes[curr].type) {
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

    return Plantillatickets
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },
  obtenerNumeroDePuestos: async (ctx) => {
    console.log(ctx.params._id,'params');
    
    try {
      const pool = await poolPromise;
      const res = await pool.request() 
        .input('IdPuesto', ctx.params._id)
        .execute('proc_obtenerNumeroDePuestos');
      if(!res){
        return null;
      }
      return res.recordsets[0];
    } catch (error) {
      return error;
    }
  },
  
  obtenerEtapa: async(ctx) => {
    try {
      console.log(ctx.params);
      
      const pool = await poolPromise;
      const req = await pool.request();
      // const etapas = await ;
      console.log('id: ',ctx.params._id);
      const res = await req
        .input('IdTicket', ctx.params._id)
        .execute('proc_obtenerPlantillaEtapasPorId_Prueba');
        
      res.recordset.etapas = res.recordset;
     
      for (let j = 0; j < res.recordset.etapas.length; j++) {
        res.recordset.etapas[j].configuracion = JSON.parse(res.recordset.etapas[j].configuracion);
        // const tiempos = await pool.request()
        //   .input('IdEtapa', sql.Int,  res.recordset.etapas[j].IdEtapa)
        //   .execute('proc_obtenerEtapasTiempoPorId');
        // res.recordset.etapas[j].tiempos = tiempos.recordset;
        const reglas = await pool.request()
          .input('IdEtapa', sql.Int,  res.recordset.etapas[j].IdEtapa)
          .execute('proc_obtenerEtapasReglaPorId');
        res.recordset.etapas[j].reglas = reglas.recordset;
      }
     
      // const etapas = await req
      //     .input('IdPlantilla', sql.Int, res.recordset[i].IdPlantilla)
      //     .execute('proc_obtenerPlantillaEtapasPorId');
      //   res.recordset[i].etapas = etapas.recordset;

      //   for (let j = 0; j < etapas.recordset.length; j++) {
      //     res.recordset[i].etapas[j].configuracion = JSON.parse(res.recordset[i].etapas[j].configuracion);
      //     res.recordset[i].etapas[j].Catalogos = JSON.parse(res.recordset[i].etapas[j].Catalogos);
      //     const tiempos = await pool.request()
      //       .input('IdEtapa', sql.Int, etapas.recordset[j].IdEtapa)
      //       .execute('proc_obtenerEtapasTiempoPorId');
      //     res.recordset[i].etapas[j].tiempos = tiempos.recordset;
      //     const reglas = await pool.request()
      //       .input('IdEtapa', sql.Int, etapas.recordset[j].IdEtapa)
      //       .execute('proc_obtenerEtapasReglaPorId');
      //     res.recordset[i].etapas[j].reglas = reglas.recordset;
      //   }
      

      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener las plantillas');
    }
  },

  cambiarEstatusEtapasPlantillas : async (ctx) => {
    try{      
      console.log(ctx.params,'cambiarEstatusEtapasPlantillas');
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request()
        .input('IdEtapa',ctx.params.IdEtapa)
        .execute('proc_cambiarEstatusEtapaPlantilla');
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      ctx.response.badRequest('Error al obtener los resultados');
    }
  },
};