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
const { poolPromise } = require('./../../../config/functions/bootstrap');
const {
  SQLHandler,
} = require('./../../../config/functions/bootstrap');
const moment = require('moment');
// const env = process.env.NODE_ENV;

module.exports = {

  /**
   * Promise to fetch all rols.
   *
   * @return {Promise}
   */

  fetchAll: async() => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerRoles');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los roles');
    }
  },

  /**
   * Promise to fetch a/an rol.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Rol.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Rol
      .findOne(_.pick(params, _.keys(Rol.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count rols.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('rol', params);

    return Rol
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an rol.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Rol.associations.map(ast => ast.alias));
    const data = _.omit(values, Rol.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Rol.create(data);

    // Create relational data and return the entry.
    return Rol.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an rol.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Rol.associations.map(a => a.alias));
    // Update relational data and return the entry.
    return Rol.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an rol.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Rol.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Rol
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Rol.associations.map(async association => {
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
   * Promise to search a/an rol.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('rol', params);
    // Select field to populate.
    const populate = Rol.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Rol.attributes).reduce((acc, curr) => {
      switch (Rol.attributes[curr].type) {
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

    return Rol
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to activar a/an rol.
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
          'proc_activarRol',
          parameters
        );
      
      return res.recordsets;

    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método remove',
        error,
      );
    }
  },

  /**
   * Promise to desactivar a/an rol.
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
          'proc_desactivarRol',
          parameters
        ); 

      return res;

    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método remove',
        error,
      );
    }
  },
  /**
   * consultaNombreRol to search a/an rol.
   *
   * @return {Promise}
   */
  consultaNombreRol: async(ctx) => {
    try {
      const pool = await poolPromise;
      const res = await pool.request()
        .input('NombreRol',ctx.params._id)
        .execute('Proc_ValidaExisteRol');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al validar si existe el nombre rol');
    }
  },
  consultaEmpresas: async(ctx) => {
    try {
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdEmpresa',ctx.params._id)
        .execute('Proc_ConsultaEmpresas');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener las empresas');
    }
  },
  consultaModulos: async() => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const res = await req.execute('Proc_ConsultaModulos');

      res.recordset.forEach(modulo => {
        modulo.opciones = [];
      });
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los modulos');
    }
  },
  consultaPermisosFunciones: async(ctx) => {
    try {
      // console.log('entro a consultaPermisosFunciones');
      // console.log('ctx.params._id',ctx.params._id);
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdRolEmpresa', ctx.params._idRolEmpresa)
        //.input('IdRol', ctx.params._idRol)
        .input('IdModulo',ctx.params._id)
        .execute('Proc_ConsultaPermisosFunciones');
      // console.log('res.recordset',res.recordset);
      const permisos = _.uniqBy(res.recordset, 'FuncionId').map(funcion => { 
        // console.log('funcion',funcion);
        let permisosNormales = [];
        let permisosEspeciales = [];
        
        _.forIn(funcion, (value, key) => {
          if(key.includes('PERN')){
            permisosNormales.push({
              nombrePermiso: key,
              valorPermiso: value,
            });
          }
        });


        permisosEspeciales = res.recordset.filter(record => (funcion.FuncionId === record.FuncionId)).map(record => (
          { 
            idPermiso: record.IdPermisoEspecial,
            nombrePermiso: record.NombrePermiso,
            tienePermiso: record.tienePermiso,
          }
        ));

        return {
          funcionId: funcion.FuncionId,
          abrirModalPermisosEspeciales: false,
          nombreFuncion: funcion.NombreFuncion,
          permisosNormales: permisosNormales,
          permisosNormalesSeleccionados: permisosNormales.filter(permiso => (
            permiso.valorPermiso
          )).map(permiso => (permiso.nombrePermiso)),
          permisoEspecial: funcion.permisoEspecial,
          permisosEspeciales: permisosEspeciales,
          permisosEspecialesSeleccionados: permisosEspeciales.filter(permiso => (
            permiso.tienePermiso
          )).map(permiso => (permiso.idPermiso)),
        };
      });
      // console.log('res.permisos',permisos);
      res.permisos = permisos;
      // console.log('res.permisos',res.permisos);
      // console.log(res.recordset);
      return res;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener permisos funciones');
    }
  },
  consultaRoles: async(ctx) => {
    try {
      console.log('entro a consultaRoles');
      const pool = await poolPromise;
      const idRolEmpresa = ctx.params.idRolEmpresa != 0 ? ctx.params.idRolEmpresa : null;

      const res = await pool.request()
        .input('IdRol',ctx.params._id)
        .input('IdRolEmpresa', idRolEmpresa)
        .execute('Proc_ConsultaRoles');

      // Arreglo para guardar las funciones favoritas
      const empresas = _.uniqBy(res.recordset, 'IdRolEmpresa').map(empresa => ({
        IdRolEmpresa: empresa.IdRolEmpresa, 
        IdEmpresa: empresa.IdEmpresa,
        Nombre: empresa.Nombre,
        Modulos:  new Set(),
        Activo: empresa.activoRolEmpresa,
        Opciones: new Set(),
        SelectEmpresa: [],
      }));

      empresas.forEach(empresa => {
        res.recordset.forEach(modulo => {
          if(empresa.IdEmpresa === modulo.IdEmpresa){
            empresa.Modulos.add(modulo.Modulos);
            empresa.SelectEmpresa = [{
              value: modulo.IdEmpresa,
              label: modulo.Nombre,
            }];
            empresa.Opciones.add({
              value: modulo.IdModulo,
              label: modulo.Modulos,
              Descripcion: modulo.Descripcion,
              opciones: [],
             
            });
          }
        });
        const modulos = Array.from(empresa.Modulos).join(', ');

        empresa.Modulos = modulos;
        empresa.Opciones = _.uniqBy(Array.from(empresa.Opciones), 'value');
      });

      res.empresas = empresas;

      return res.empresas;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los rol');
    }
  },
  obtenerRolesConfigurados: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdPuesto', ctx.params.idPuesto)
        .execute('proc_obtenerRolesConfigurados');
      console.log(res);
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los roles');
    }
  },
  guardarRol: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      //console.log('datos',datos);

      const transaction = await pool.transaction();
      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            const RolEmpresaType = new sql.Table('TypeRolEmpresas');
            const RolPermisosFuncionType = new sql.Table('TypeRolPermisosFuncion');
            const RolPermisosEspecialesFuncionType = new sql.Table('TypeRolPermisoEspecial');


            RolEmpresaType.columns.add('IdEmpresa',sql.Int);
            RolEmpresaType.columns.add('IdUsuario',sql.Int);

            RolPermisosFuncionType.columns.add('funcionId',sql.Int);
            RolPermisosFuncionType.columns.add('IdEmpresa',sql.Int);
            RolPermisosFuncionType.columns.add('IdRolEmpresas',sql.Int);
            RolPermisosFuncionType.columns.add('SoloLectura',sql.Bit);
            RolPermisosFuncionType.columns.add('Registrar',sql.Bit);
            RolPermisosFuncionType.columns.add('Editar',sql.Bit);
            RolPermisosFuncionType.columns.add('Eliminar',sql.Bit);
            

            RolPermisosEspecialesFuncionType.columns.add('idRol',sql.Int);
            RolPermisosEspecialesFuncionType.columns.add('funcionId',sql.Int);
            RolPermisosEspecialesFuncionType.columns.add('IdEmpresa',sql.Int);
            RolPermisosEspecialesFuncionType.columns.add('IdRolEmpresas',sql.Int);
            RolPermisosEspecialesFuncionType.columns.add('idPermisoEspecial',sql.Int);
               
           

            const empresas = datos.datosGuardar.empresas;
          
            for(let i = 0; i < empresas.length; i++){
              RolEmpresaType.rows.add(
                empresas[i].IdEmpresa,
                datos.usuarioId || 0,
              );
              //console.log('entro con empreasa');
              //console.log('empresas',empresas);
              const modulos = empresas[i].Opciones;
              
              //console.log('modulos',modulos);
              for(let j = 0; j < modulos.length; j++){
                //console.log('entro con modulos');
                const funciones = modulos[j].opciones;
                //console.log(funciones);
                for(let k = 0; k < funciones.length; k++) {              
                  //console.log('funciones especiales',funciones[k]);
                  const permisosNormales = funciones[k].permisosNormalesSeleccionados;
                  const permisosEspeciales = funciones[k].permisosEspecialesSeleccionados;
                  let sololectura = 0;
                  let registrar = 0;
                  let editar = 0;
                  let eliminar = 0;

                  //console.log('mexicanada',empresas[i].hasOwnProperty('Nuevo'));
                  if(empresas[i].Nuevo===true){
                    empresas[i].IdRolEmpresa=0;
                  }

                  for(let z = 0; z < permisosNormales.length; z++) {
                    console.log('entro con permisosn');      
                    switch (permisosNormales[z]) {
                      case 'PERN_sololectura':
                        sololectura = 1;
                        break;
                      case 'PERN_Registrar':
                        registrar = 1;
                        break;
                      case 'PERN_Editar':
                        editar = 1;
                        break;
                      case 'PERN_Eliminar':
                        eliminar = 1;
                        break;
                      default:
                        break;
                    }
                  }

                  if(permisosEspeciales.length>0){
                    for(let e = 0; e < permisosEspeciales.length; e++) {
                      //console.log('entro con permisos especiales');
                      RolPermisosEspecialesFuncionType.rows.add(
                        datos.idRol,
                        funciones[k].funcionId,
                        empresas[i].IdEmpresa,
                        empresas[i].IdRolEmpresa,
                        permisosEspeciales[e]
                      );      
                    }
                  } else {
                    RolPermisosEspecialesFuncionType.rows.add(
                      datos.idRol,
                      funciones[k].funcionId,
                      empresas[i].IdEmpresa,
                      empresas[i].IdRolEmpresa,
                      0
                    ); 
                  }

                  
                      
                  console.log('permisosEspeciales',permisosEspeciales);
                  RolPermisosFuncionType.rows.add(
                    funciones[k].funcionId,
                    empresas[i].IdEmpresa,
                    empresas[i].IdRolEmpresa,
                    sololectura,
                    registrar,
                    editar,
                    eliminar,
                  );
                }
              }
            }
            
            console.log('RolEmpresaType',RolEmpresaType);
            const req = transaction.request()
              .input('IdRol', sql.Int, datos.idRol)
              .input('NombreRol', sql.VarChar(150), datos.datosGuardar.nombreRol)
              .input('DescripcionRol', sql.VarChar(150), datos.datosGuardar.descripcion)
              .input('Usuario', sql.Int, 0)
              .input('RolEmpresaType', RolEmpresaType)
              .input('RolPermisosFuncion', RolPermisosFuncionType)
              .input('RolPermisosEspecialesFuncion', RolPermisosEspecialesFuncionType)
              .execute('Proc_guardaRol');

            Promise.resolve(req)
              .then(async () => {
                await transaction.commit();
                const res = await strapi.services.rol.fetchAll(ctx.query);
                await resolve(res);
               
              })
              .catch( (err) => {
                console.log('error', err);
                transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
                reject('Ocurrio un error al guardar la configuración');
              });

          } catch(error) {
            console.log(error);
            await transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
            reject('Hubo un error al ejecutar el procedimiento almacenado');
          }
        });
      });
      return Promise.resolve(prom)
        .then(r => {
          return r;
        })
        .catch(err => ctx.response.badRequest(err));
    } catch (err) {
      return ctx.response.badRequest('Ocurrió un error al guardar en la base de datos');
    }
  },


  /**
  * Promise to desactivarFunciones a/an modulo.
  *
  * @return {Promise}
  */
  desactivarEmpresas: async (ctx, body) => {
    console.log('body',body);
    console.log('body.selected',body.selected);
    try {
      const ids = body.selected.join(',');
      console.log('ids',ids);
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'IdRol',
          type: sql.VarChar,
          value: body.IdRol
        },
        { param: 'IdRolEmpresa',
          type: sql.VarChar,
          value: ids
        },
        { param: 'Activo',
          type: sql.VarChar,
          value: 0 
        },
      ];
      const res = await sqlh
        .execProcedure(
          'Proc_ActivarDesactivarRolEmpresa',
          parameters
        ); 
      console.log('return res.recordsets;',res);  
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al desactivar empresa rol y permisos',
        error,
      );
    }
  },
  /**
  * Promise to desactivarEmpresas a/an modulo.
  *
  * @return {Promise}
  */
  activarEmpresas: async (ctx, body) => {
    console.log('body',body);
    console.log('body.selected',body.selected);
    try {
      const ids = body.selected.join(',');
      console.log('ids',ids);
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'IdRol',
          type: sql.VarChar,
          value: body.IdRol
        },
        { param: 'IdRolEmpresa',
          type: sql.VarChar,
          value: ids
        },
        { param: 'Activo',
          type: sql.VarChar,
          value: 1
        },
      ];
      const res = await sqlh
        .execProcedure(
          'Proc_ActivarDesactivarRolEmpresa',
          parameters
        );   
      return res.recordsets;
    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al activar empresa rol y permisos',
        error,
      );
    }
  },
  obtenerModulosPorEmpresa: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const idRol = ctx.params.idRol;
      const res = await request
        .input('IdRol', sql.Int, idRol)
        .input('IdUsuario', sql.Int, null)
        .execute('proc_obtenerEmpresasConFunciones');
      for (let j = 0; j < res.recordset.length; j++) {
        const nombreModulos = await pool.request()
          .input('IdEmpresa', sql.Int, res.recordset[j].IdEmpresa)
          .input('IdRol', sql.Int, idRol)
          .execute('proc_obtenerCadenaModulosPorEmpresa');
        res.recordset[j].modulos = nombreModulos.recordset[0].modulos;
      }
      
      return res.recordset;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener los modulos');
    }
  },
  obtenerModulosPorPuesto: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      
      ctx.params.idEmpleado = ctx.params.idEmpleado || null;
      const roles = await strapi.services.rol.obtenerRolesConfigurados(ctx);
      console.log(roles);
      for (let i = 0; i < roles.length; i++) {
        roles[i].seleccionado = false;
        const res = await request
          .input('IdRol', sql.Int, roles[i].IdRol)
          .input('IdUsuario', sql.Int, ctx.params.idUsuario)
          .execute('proc_obtenerEmpresasConFunciones');
        for (let j = 0; j < res.recordset.length; j++) {
          const nombreModulos = await pool.request()
            .input('IdEmpresa', sql.Int, res.recordset[j].IdEmpresa)
            .input('IdRol', sql.Int, roles[i].IdRol)
            .execute('proc_obtenerCadenaModulosPorEmpresa');
          res.recordset[j].modulos = nombreModulos.recordset[0].modulos;
        }
        roles[i].datos = res.recordset;
      }
      
      return roles;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener los modulos');
    }
  },
  obtenerEmpresasRol: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdRol', ctx.params.idRol)
        .execute('proc_obtenerEmpresasPorRol');
      
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener las empresas');
    }
  },
  obtenerConfiguracion: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const response = {
        lista: [],
        rol: {
          valor: '',
          campoValido: true,
        },
        archivo: {
          formData: null,
          archivos: [],
        },
      };

      const {
        params: {
          idPuesto,
        }
      } = ctx;
      const archivos = [];
      const res = await request
        .input('IdPuesto', sql.Int, idPuesto)
        .execute('proc_obtenerConfiguracionPuesto');
      
      response.rol.valor = res.recordsets[0];
      const fecha = moment().format('DD/MM/YYYY');
      if(res.recordsets[1].length > 0){
        for (let i = 0; i < res.recordsets[1].length; i+=1) {
          archivos.push(
            {
              id: i+1,
              nombre: res.recordsets[1][i].Nombre,
              fecha,
              usuario: res.recordsets[1][i].Usuario,
            }
          );
          response.archivo.archivos.push(
            {
              url: res.recordsets[1][i].Ruta,
              name: res.recordsets[1][i].Nombre,
              idArchivo: res.recordsets[1][i].IdArchivo,
            }
          );
        }
        response.lista.push(
          {
            seleccionado: false,
            esArchivo: true,
            datos: archivos,
            label: 'Archivos Adjuntos',
          }
        );
      }
      for (let j = 0; j < res.recordsets[0].length; j+=1) {
        response.lista.push(
          {
            seleccionado: false,
            datos: [],
            label: res.recordsets[0][j].label,
            value: res.recordsets[0][j].value,
          }
        );
      }
      
      return response;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener la configuracion');
    }
  },
  obtenerModulosPorEmpleado: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      
      const roles = await strapi.services.rol.obtenerRolesAdicionales(ctx);
      
      for (let i = 0; i < roles.length; i++) {
        roles[i].seleccionado = false;
        const res = await request
          .input('IdRol', sql.Int, roles[i].IdRol)
          .input('IdUsuario', sql.Int, ctx.params.idUsuario)
          .execute('proc_obtenerEmpresasConFunciones');
        for (let j = 0; j < res.recordset.length; j++) {
          const nombreModulos = await pool.request()
            .input('IdEmpresa', sql.Int, res.recordset[j].IdEmpresa)
            .input('IdRol', sql.Int, roles[i].IdRol)
            .execute('proc_obtenerCadenaModulosPorEmpresa');
          res.recordset[j].modulos = nombreModulos.recordset[0].modulos;
        }
        roles[i].datos = res.recordset;
      }
      
      return roles;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener los modulos');
    }
  },
  generarFormatoPDF: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const datos = ctx.request.body;
      const rolesType = new sql.Table('IdType');
      const response = {
        datos: [],
        puesto: [],
      };

      rolesType.columns.add('Id', sql.Int);
      for (let i = 0; i < datos.roles.length; i+=1) {
        rolesType.rows.add(
          datos.roles[i],
        );
      }
      const res = await request
        .input('RolesType', rolesType)
        .execute('proc_obtenerFuncionesModuloPorRol');
      
      const resPuesto = await pool.request()
        .input('IdPuesto', sql.Int, datos.puesto.value)
        .execute('proc_obtenerPuestoPorId');

      response.puesto.push(resPuesto.recordset[0]);

      const obj = _.flow(
        _.partialRight(_.groupBy, x => x.NombreEmpresa),
        _.partialRight(_.map, (value, key) => (
          {
            NombreEmpresa: key, 
            Modulos: _.flow(
              _.partialRight(_.groupBy, x => x.NombreModulo),
              _.partialRight(_.map, (value2, key2) => (
                {
                  NombreModulo: [
                    [
                      {
                        colSpan: 2, 
                        alignment: 'center', 
                        text: key2,
                        style: 'tableHeader',
                      }, 
                      {}
                    ],
                    value2.map(
                      (ele, index) => [index === value2.length - 1 ? 
                        `${ele.NombreFuncion} \n\n` :
                        `${ele.NombreFuncion} \n`
                      ])
                  ],
                  // Funciones: value2.map(ele => ele.NombreFuncion),
                }
              ))
            )(value)
          }
        )),
      )(res.recordset);

      let body = [];

      for(let i=0; i< obj.length; i++){ 
        const tamano = Math.round(obj[i].Modulos.length / 2);
        for (let l = 0; l < tamano; l+=1) {
          body.push(
            {
              columns: [],
            }
          );
        }
        for(let j=0; j< obj[i].Modulos.length; j++){
          for(let k=0; k<obj[i].Modulos[j].NombreModulo[1].length; k++){
            if(k + 1 === obj[i].Modulos[j].NombreModulo[1].length){
              obj[i].Modulos[j].NombreModulo[1][k] = 
                _.concat(obj[i].Modulos[j].NombreModulo[1][k], '');
              
            } else{
              obj[i].Modulos[j].NombreModulo[1][k] = _.concat(obj[i].Modulos[j].NombreModulo[1][k], obj[i].Modulos[j].NombreModulo[1][k + 1]) 
              obj[i].Modulos[j].NombreModulo[1].splice(k+1, 1)
              // k++;
            }
          }
          obj[i].Modulos[j].NombreModulo = _.concat([obj[i].Modulos[j].NombreModulo[0]], obj[i].Modulos[j].NombreModulo[1])
          body[parseInt(j/2)].columns.push({
            style: 'tableExample',
            width: '45%',
            table: {
              widths: ['50%', '50%'],
              headerRows: 2,
              body: obj[i].Modulos[j].NombreModulo,
            },
            layout: 'bordeTabla'
          });
          // if(j % 2 === 0)
          //   obj[i].Modulos[j] = body[j/2].columns;
        }
        obj[i].Modulos = body;
        body = [];
      }
     
      response.datos = obj;
      return response;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener los modulos');
    }
  },
  guardarPuestoRol: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      
      const transaction = await pool.transaction();
      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            const archivosType = new sql.Table('Archivo');
            const rolesType = new sql.Table('IdType');

            archivosType.columns.add('Id', sql.Int);
            archivosType.columns.add('IdArchivo', sql.Int);
            archivosType.columns.add('Ruta', sql.VarChar(255));
            archivosType.columns.add('Nombre', sql.VarChar(255));

            rolesType.columns.add('Id', sql.Int);
            for (let i = 0; i < datos.roles.length; i+=1) {
              rolesType.rows.add(
                datos.roles[i],
              );
            }
            const archivos = datos.archivos;

            for (let i = 0; i < archivos.length; i++) {
              archivosType.rows.add(
                i+1,
                archivos[i].idArchivo || null,
                archivos[i].url,
                archivos[i].name,
              );
            }
            
            const req = transaction.request()
              .input('IdPuesto', sql.Int, datos.idPuesto)
              .input('RolesType', rolesType)
              .input('ArchivosType', archivosType)
              .input('IdUsuario', sql.Int, datos.idUsuario)
              .execute('proc_guardarPuestoRol');

            Promise.resolve(req)
              .then(async () => {
                await transaction.commit();
                const res = await strapi.services.puestos.puestosRoles(ctx);
                await resolve(res);
              })
              .catch( (err) => {
                console.log(err);
                transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
                reject('Ocurrio un error al guardar los archivos');
              });
          } catch(error) {
            console.log(error);
            await transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
            reject('Hubo un error al ejecutar el procedimiento almacenado');
          }
        });
      });
      return Promise.resolve(prom)
        .then(r => {
          return r;
        })
        .catch(err => ctx.response.badRequest(err));
    } catch (err) {
      return ctx.response.badRequest('Ocurrió un error al guardar en la base de datos');
    }
  },
  obtenerRolesAdicionales: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      console.log(ctx.params);
      const res = await request
        .input('IdEmpleado', ctx.params.idEmpleado)
        .input('IdPuesto', ctx.params.idPuesto)
        .execute('proc_obtenerRolesAdicionales');
      console.log(res);
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener los roles');
    }
  },
};
