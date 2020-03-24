'use strict';

/**
 * Usuario.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const { poolPromiseServDesarrollo, poolPromise } = require('./../../../config/functions/bootstrap');
const config = require('../../../config/environments/development/server.json');
const request = require('request');
const JSZip = require('jszip');
const ActiveDirectory = require('activedirectory');
const fs = require('fs');
const {
  SQLHandler,
} = require('./../../../config/functions/bootstrap');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
// const env = process.env.NODE_ENV;

module.exports = {

  /**
   * Promise to fetch all usuarios.
   *
   * @return {Promise}
   */

  fetchAll: async(ctx) => {
    try {
      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request();

      const res = await req.execute('proc_obtenerUsuarios');
      return res.recordset;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener los usuarios');
    }
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
          'proc_activarUsuario',
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
        { param: 'IdUsuario',
          type: sql.VarChar,
          value: ids 
        },
        { param: 'Activar',
          type: sql.VarChar(1),
          value: '0' 
        },
        { param: 'usuario',
          type: sql.VarChar(3000),
          value: '27493'
        },
      ];
      const res = await sqlh
        .execProcedure(
          'Proc_DesactivaroActivarUsuario',
          parameters
        ); 
      console.log(res);
      return res;

    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        'Ocurrió un error al ejecutar el método desactivar',
        error,
      );
    }
  },

  usuariosArchivos: async(ctx) => {
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
        { param: 'IdEmpleado',
          type: sql.Int,
          value: _id },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_obtenerUsuarioEvidencia',
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

  obtenerArchivosHistorial: async(ctx) => {
    try {
      const {
        params: {
          idUsuario,
        },
      } = ctx;

      if(!idUsuario){
        return ctx.badRequest('Hubo un error al descargar los archivos');
      }
    
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdUsuario', sql.Int, idUsuario)
        .execute('proc_obtenerArchivosHistorial');

      if(res.recordset.length == 1){
        return request(res.recordset[0].Ruta);
      } else if(res.recordset.length > 1) {
       
        var zip = new JSZip();

        for(let i = 0; i < res.recordset.length; i++){
          zip.file(res.recordset[i].NombreArchivo, request(res.recordset[i].Ruta));
        }

        const data = zip.generateAsync({type : 'nodebuffer'});

        return data;
      }
      
    } catch (error) {
      return ctx.response.badRequest('Error al descargar los archivos');
    }
  },

  usuariosArchivosMultiple: async(ctx) => {
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
          'proc_obtenerUsuarioEvidenciaMultiple',
          parameters
        );

      if(res.recordset.length == 1){
        return request(res.recordset[0].Ruta);
      } else if(res.recordset.length > 1) {
        
        var zip = new JSZip();

        for(let i = 0; i < res.recordset.length; i++){
          let nombreArchivo = (`${res.recordset[i].Nombre.trim()}_${res.recordset[i].NombreArchivo}`).replace(/\s/g, '_');

          zip.file(nombreArchivo, request(res.recordset[i].Ruta));
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

  login: async(ctx, body) => {
    const {
      usuarioDominio,
      contrasena,
    } = body;

    const bytes = CryptoJS.AES.decrypt(contrasena, 'ng:NARJtCHH*f/d');
    const contasenaDesencriptada = bytes.toString(CryptoJS.enc.Utf8);

    const config = { url: 'ldap://192.168.0.252/', baseDN: 'dc=domain,dc=com', };
    const ad = new ActiveDirectory(config);
    
    function obtenerUsuarioActiveDirectory() {
      return new Promise(function (resolve , reject) {
        ad.authenticate(`${usuarioDominio}@fincamex.local`, contasenaDesencriptada, function(err, auth){
          if(auth){
            resolve(auth);
          }
          else {
            reject(err);
          }
        });
      });
    }

    try {
      const usuarioAutenticado = await obtenerUsuarioActiveDirectory()
        .then((auth) => {return auth;})
        .catch((e) => { return e;});
    
      if( true){
        const options = { logResponses: false };
        const sqlh = new SQLHandler(options);
        const parameters = [
          { 
            param: 'UsuarioDominio',
            type: sql.VarChar,
            value: usuarioDominio,
          },
        ];
     
        let res = await sqlh
          .execProcedure(
            'proc_obtenerUsuarioLogin',
            parameters
          );
          /*
        let token = {};

        if(res.recordset.length > 0) {
          token = jwt.sign({ 
            usuarioId: res.recordset[0].UsuarioId,
            usuarioDominio: res.recordset[0].UsuarioDominio
          }, 'ng:NARJtCHH*f/d');

          res.token = token;
        }
        */
        return res;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al conectarse al directorio activo');
    }
  },

  intentosLogin: async(ctx, body) => {
    try {
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'UsuarioDominio',
          type: sql.VarChar,
          value: body.usuarioDominio },
        { param: 'Logueado',
          type: sql.Bit,
          value: body.logueado },
      ];
      
      const res = await sqlh
        .execProcedure(
          'proc_guardarIntentosLogin',
          parameters
        );

      return res;
   
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al conectarse al directorio activo');
    }
  },

  configuracion: async(ctx) => {
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
        { 
          param: 'UsuarioId',
          type: sql.Int,
          value: _id,
        },
      ];

      const res = await sqlh
        .execProcedure(
          'proc_obtenerUsuarioEmpresas',
          parameters
        );
        
      return res;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener la configuración');
    }
  },

  imagen: async(ctx) => {

    const  { 
      request:{
        query: {
          usuariodominio: usuarioDominio
        }
      } 
    } = ctx;
    
    function existeArchivo() {
      return new Promise(function (resolve , reject) {
        fs.access('./public/uploads/'+usuarioDominio+'.jpg', fs.constants.F_OK, (err) => {
          if(!err){
            resolve(true);
          }
          else {
            reject(false);
          }
        });
      });
    }
    try {

      const existeImagenUsuario = await existeArchivo()
        .then((err) => {return err;})
        .catch((e) => { return e;});

      if(existeImagenUsuario){
      
        const imagen = 'http://'+config.host+':'+config.port+'/uploads/'+usuarioDominio+'.jpg';
        
        return {
          status: 200,
          imagen:imagen
        };
        
      } else {
      
        const options = { logResponses: false };
        const sqlh = new SQLHandler(options);
        const parameters = [
          { 
            param: 'UsuarioDominio',
            type: sql.VarChar,
            value: usuarioDominio,
          },
        ];

        const res = await sqlh
          .execProcedure(
            'proc_obtenerUsuarioImagen',
            parameters
          );
        //console.log(res);
        //res.recordset[0].Imagen=res.recordset[0].Imagen.slice(2);
        //res.recordset[0].Imagen=Buffer.from(res.recordset[0].Imagen).toString('hex');
        //let base64Data;
        //base64Data = res.recordset[0].Imagen=Buffer.from(res.recordset[0].Imagen).toString('base64');

        
        if(res.recordset.length > 0){
          const hexStr = res.recordset[0].Imagen.slice(2);
          const buf = new ArrayBuffer(hexStr.length);
          const byteBuf = new Uint8Array(buf);
  
          for (let i=0; i<hexStr.length; i+=2) {
            byteBuf[i/2] = parseInt(hexStr.slice(i,i+2),16);
          }
  
          const directorioImagen =  __dirname+'/../../../public/uploads/';
          
          fs.writeFile(directorioImagen+usuarioDominio+'.jpg', byteBuf, 'binary', (err) => {
            console.log(err);
          });

          res.imagen = 'http://'+config.host+':'+config.port+'/uploads/'+usuarioDominio+'.jpg';
        } else {
          res.imagen = 'http://'+config.host+':'+config.port+'/uploads/user.png';
        }

        return res;
      }
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al obtener la imagen del usuario');
    }
  },
  
  consultaOpcionesUsuario: async(ctx) => {
    try {

      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdUsuario',sql.Int,ctx.params._id)
        .execute('Proc_ConsultaOpcionesUsuarios');
      
      // Arreglo para guardar las funciones favoritas
      const favoritos = _.uniqBy(res.recordset, 'IdTipoAgrupador').map(tipoAgrupador => ({
        tipoAgrupadorId: tipoAgrupador.IdTipoAgrupador,
        nombre: tipoAgrupador.NombreAgrupador,
        abrirFunciones: false,
        funciones: [],
      }));

      favoritos.forEach(favorito => {
        res.recordset.forEach(item => {
          if(item.IdTipoAgrupador === favorito.tipoAgrupadorId){
            favorito.funciones = favorito.funciones.concat([{
              funcionId: item.FuncionId,
              empresaId: item.EmpresaId,
              tipoAgrupadorId: item.IdTipoAgrupador,
              moduloId: item.ModuloId,
              nombreFuncion: item.NombreFuncion,
              url: item.URL,
              favorito: item.Favorito,
              idRolEmpresa: item.IdRolEmpresa,
            }]);
          }
        });
        favorito.funciones = _.uniqBy(favorito.funciones, 'funcionId');
      });
      
      // Arreglo para guardar empresas sin repetir
      const empresas = _.uniqBy(res.recordset, 'EmpresaId').map(empresa => ({
        empresaId: empresa.EmpresaId,
        nombre: empresa.Nombre,
        abrirModulo: false,
        iconoEmpresa: empresa['Icono_empresa'],
        modulos: [],
        // idRolEmpresa: empresa.IdRolEmpresa,
      }));

      // Arreglo para guardar módulos que pertenecen a cada empresa
      empresas.forEach(empresa => {
        res.recordset.forEach(item => {
          if(empresa.empresaId === item.EmpresaId){
            empresa.modulos.push({
              moduloId: item.ModuloId,
              nombreModulo: item.NombreModulo,
              abrirTipoAgrupador: false,
              tipoAgrupador: []
            });
          }
        });

        empresa.modulos = _.uniqBy(empresa.modulos, 'moduloId');
      });
      
      // Arreglo para guardar tipos agrupadores que pertenecen a cada módulo
      empresas.forEach(empresa => {
        empresa.modulos.forEach(modulo => {
          res.recordset.forEach(item => {
            if(modulo.moduloId === item.ModuloId){
              modulo.tipoAgrupador.push({
                tipoAgrupadorId: item.IdTipoAgrupador,
                nombreAgrupador: item.NombreAgrupador,
                abrirFunciones: false,
                funciones: []
              });
            }
          });

          modulo.tipoAgrupador = _.uniqBy(modulo.tipoAgrupador, 'tipoAgrupadorId');
        });
      });
    
      empresas.forEach(empresa => {
        empresa.modulos.forEach(modulo => {
          modulo.tipoAgrupador.forEach(tipoA => {
            res.recordset.forEach(item => {
              if(modulo.moduloId === item.ModuloId){
                if(tipoA.tipoAgrupadorId === item.IdTipoAgrupador){
                  tipoA.funciones.push({
                    funcionId: item.FuncionId,
                    nombreFuncion: item.NombreFuncion,
                    url: item.URL,
                    favorito: item.Favorito,
                    idRolEmpresa: item.IdRolEmpresa,
                  });
                }
              }
            });

            tipoA.funciones = _.uniqBy(tipoA.funciones, 'funcionId');
          });
        });
      });
    
      res.favoritos = favoritos;
    
      res.configuracion = empresas;

      return res;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al consultar las opciones del usuario');
    }
  },

  guardarFuncionesFavoritas: async(ctx, body) => {

    const {
      usuarioId,
      idTipoAgrupador,
      idFuncion,
      favorito
    } = body;
    
    try {
      const options = { logResponses: false };
      const sqlh = new SQLHandler(options);
      const parameters = [
        { param: 'UsuarioId',
          type: sql.Int,
          value: usuarioId },
        { param: 'IdTipoAgrupador',
          type: sql.Int,
          value: idTipoAgrupador },
        { param: 'IdFuncion',
          type: sql.Int,
          value: idFuncion },
        { param: 'Activo',
          type: sql.Bit,
          value: favorito },
      ];
      
      const res = await sqlh
        .execProcedure(
          'proc_guardarFuncionFavoritos',
          parameters
        );

      return res;
   
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al guardar las opciones favoritas');
    }
  },

  obtenerDetalleUsuario: async(ctx) => {
    try{
      const idUsuario = ctx.params.idUsuario;
      const datos = {
        idUsuario,
        nomUsuario: '',
        empleado: '',
        noEmpleado: null,
        enkontrol: '',
        correo: '',
        usuarioDominio: '',
        plaza: '',
        puesto: '',
        imagen: '',
        idPlaza: null,
        roles: [],
        historial: [],
      };

      const pool = await poolPromiseServDesarrollo;
      
      const res = await pool.request()
        .input('IdUsuario', sql.Int, idUsuario)
        .execute('proc_obtenerDetalleUsuario');

      datos.nomUsuario = res.recordsets[0][0].Nombre;
      datos.empleado = res.recordsets[0][0].Nombre;
      datos.noEmpleado = 
        { 
          value: res.recordsets[0][0].NoEmpleado,
          label: res.recordsets[0][0].Nombre,
        };
      datos.enkontrol = res.recordsets[0][0].Enkontrol || '';
      datos.correo = res.recordsets[0][0].Correo;
      datos.usuarioDominio = res.recordsets[0][0].UsuarioDominio;
      datos.plaza = res.recordsets[0][0].Plaza;
      datos.puesto = res.recordsets[0][0].Puesto;
      datos.imagen ='http://'+config.host+':'+config.port+'/uploads/'+res.recordsets[0][0].UsuarioDominio+'.jpg';
      datos.idPlaza = res.recordsets[0][0].IdPlaza;
      datos.historial = res.recordsets[1];
      datos.idUsuario = res.recordsets[0][0].UsuarioId;
      ctx.params.idEmpleado = res.recordsets[0][0].NoEmpleado;
      ctx.params.idPuesto = res.recordsets[0][0].IdPuesto;
      ctx.params.idUsuario = res.recordsets[0][0].UsuarioId;
      
      const roles = await strapi.services.rol.obtenerModulosPorPuesto(ctx);
      datos.roles = roles;
      return datos;
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Hubo un error al obtener la informacion del usuario');
    }
  },
  guardarUsuario: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      //console.log('datos',datos);

      const transaction = await pool.transaction();
      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            const ArchivoType = new sql.Table('ArchivoType');
            const PlazaTemporalType = new sql.Table('PlazaTemporalType');
            const RolAdicionalType = new sql.Table('RolAdicionalType');
            const RolEmpresaType = new sql.Table('RolEmpresaType');

            
            ArchivoType.columns.add('ruta',sql.VarChar(255));
            ArchivoType.columns.add('nombre',sql.VarChar(200));

            PlazaTemporalType.columns.add('idPlazaTemporal',sql.Int);
            PlazaTemporalType.columns.add('fechaInicio',sql.Date);
            PlazaTemporalType.columns.add('fechaFin',sql.Date);
            PlazaTemporalType.columns.add('ruta',sql.VarChar(255));
            PlazaTemporalType.columns.add('nombre',sql.VarChar(200));

            RolAdicionalType.columns.add('idRolEmpresa',sql.Int);
            RolAdicionalType.columns.add('fechaInicio',sql.Date);
            RolAdicionalType.columns.add('fechaFin',sql.Date);
            RolAdicionalType.columns.add('ruta',sql.VarChar(255));
            RolAdicionalType.columns.add('nombre',sql.VarChar(200));

            RolEmpresaType.columns.add('idRolEmpresa',sql.Int);
               

            const archivo = datos.archivos;
            const plazaTemporal = datos.plazaTemporal;
            const rolAdicional = datos.rolAdicional;
            const rolEmpresa = datos.rolesEmpresa;

            archivo.forEach(archivo => {
              ArchivoType.rows.add(
                archivo.ruta,
                archivo.nombre
              );
            });

            if(plazaTemporal.idPlazaTemporal)
              PlazaTemporalType.rows.add(
                plazaTemporal.idPlazaTemporal,
                new Date(plazaTemporal.fechaInicio),
                new Date(plazaTemporal.fechaFin),
                plazaTemporal.ruta,
                plazaTemporal.nombre                
              );
            
            if(rolAdicional.idRolEmpresa.length>0)
              RolAdicionalType.rows.add(
                rolAdicional.idRolEmpresa,
                new Date(rolAdicional.fechaInicio),
                new Date(rolAdicional.fechaFin),
                rolAdicional.ruta,
                rolAdicional.nombre                
              );

            rolEmpresa.forEach(rolEmpresa => {
              RolEmpresaType.rows.add(
                rolEmpresa,              
              );
            });
          
            /*for(let i = 0; i < empresas.length; i++){
              RolEmpresaType.rows.add(
                empresas[i].IdEmpresa,
                0,
              );
              //console.log('entro con empreasa');
              console.log('empresas',empresas);
              const modulos = empresas[i].Opciones;
              
              //console.log('modulos',modulos);
              for(let j = 0; j < modulos.length; j++){
                //console.log('entro con modulos');
                const funciones = modulos[j].opciones;
                //console.log(funciones);
                for(let k = 0; k < funciones.length; k++) {              
                  console.log('funciones especiales',funciones[k]);
                  const permisosNormales = funciones[k].permisosNormalesSeleccionados;
                  const permisosEspeciales = funciones[k].permisosEspecialesSeleccionados;
                  let sololectura = 0;
                  let registrar = 0;
                  let editar = 0;
                  let eliminar = 0;

                  console.log('mexicanada',empresas[i].hasOwnProperty('Nuevo'));
                  if(empresas[i].hasOwnProperty('Nuevo')===true){
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
                      console.log('entro con permisos especiales');
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

                  
                      
                  console.log('mexicanada 2',empresas[i].IdRolEmpresa);
                  RolPermisosFuncionType.rows.add(
                    funciones[k].funcionId,
                    empresas[i].IdEmpresa,
                    //empresas[i].IdRolEmpresa,
                    empresas[i].IdRolEmpresa,
                    sololectura,
                    registrar,
                    editar,
                    eliminar
                  );
                }
              }
            }**/
            
            console.log('RolEmpresaType',RolEmpresaType);
            const req = transaction.request()
              .input('IdUsuario', sql.Int, datos.idUsuario || null)
              .input('UsuarioDominio', sql.VarChar(50), datos.usuarioDominio)
              .input('NomCorreo', sql.VarChar(320), datos.correo)
              .input('NomEmpleado', sql.VarChar(320), datos.nomEmpleado)
              .input('IdPlaza', sql.Int,datos.idPlaza)
              .input('NumEmpleado', sql.Int,datos.noEmpleado)
              .input('EnKontrol', sql.VarChar(255),datos.enKontrol)
              .input('Usuario', sql.Int,datos.Usuario)
              .input('ArchivoType', ArchivoType)
              .input('PlazaTemporalType', PlazaTemporalType)
              .input('RolAdicionalType', RolAdicionalType)
              .input('RolEmpresaType', RolEmpresaType)
              .execute('Proc_GuardaUsuarios');

            Promise.resolve(req)
              .then(async () => {
                await transaction.commit();
                const res = await strapi.services.usuario.fetchAll(ctx.query);
                await resolve(res);
               
              })
              .catch( (err) => {
                console.log('error', err);
                transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
                reject('Ocurrio un error al guardar el usuario');
              });

          } catch(error) {
            console.log(error);
            await transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
            reject('Hubo un error al ejecutar el procedimiento almacenado Proc_GuardaUsuarios');
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

  usuariosContarArchivos: async(ctx) => {
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
        { param: 'IdEmpleado',
          type: sql.Int,
          value: _id },
      ];
      const res = await sqlh
        .execProcedure(
          'proc_obtenerUsuarioEvidencia',
          parameters
        );
    
        
      return res.recordset.length;
      
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al descargar los archivos');
    }
  },

};