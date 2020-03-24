'use strict';

/**
 * Molde.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */
const toNumber = require('lodash/toNumber');
// Public dependencies.
const sql = require('mssql');
const { 
  poolPromise,
  // poolPromiseServDesarrollo,
} = require('./../../../config/functions/bootstrap');
// const upperText = (nombre) =>
//   nombre.replace(/\w\S*/g, (txt) => 
//     txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

module.exports = {


  obtenerCombos: async(ctx) => {
    try{
      const response = {
        proveedores: [],
        materiales: [],
      };

      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdProveedor', sql.Int, null)
        .input('IdTipo', sql.Int, null)
        .execute('proc_obtenerCombosMolde');
      response.proveedores = res.recordsets[0];
      response.materiales = res.recordsets[1];
      return response;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener los campos');
    }
  },
 
  
  obtenerCombosReportes: async(ctx) => {
    try{
      const response = {
        tiposReportes: [],
        plazas: [],
        tiposMovimiento:[],
      };

      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        // .input('IdProveedor', sql.Int, null)
        .input('IdUsuario', sql.Int, ctx.params._usuarioId)
        .execute('proc_obtenerCombosReportes');
      response.tiposReportes = res.recordsets[0];
      response.plazas = res.recordsets[1];
      response.tiposMovimiento = res.recordsets[2];
      return response;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener los campos');
    }
  },

  
  obtenerDatosMantenimiento: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        // .input('IdProveedor', sql.Int, null)
        .input('IdUsuario', sql.Int, ctx.params._usuarioId)
        .execute('proc_obtenerMantenimientosInventarios');
      return res.recordsets[0];
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener los campos');
    }
  },

  
  obtenerDetalleMantenimientos: async (ctx) => {
    const {
      IdUsuario,
      IdMolde,
      IdAlmacen,
      IdPlanta,
    } = ctx.request.body;
    try{
      const pool = await poolPromise;
      const res = await pool.request()  
        .input('IdUsuario', sql.Int, IdUsuario)
        .input('IdMolde', sql.Int, IdMolde)
        .input('IdAlmacen', sql.Int, IdAlmacen)
        .input('IdPlanta', sql.Int, IdPlanta)
        .execute('proc_obtenerMantenimientosInventariosDetalle');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener el detalle del mantenimiento');
    }
  },
  
  obtenerPlazas: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        
        .execute('proc_obtenerPlazasReales');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener las plazas');
    }
  },
  obtenerTiposMovimientos: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        // .input('IdTipo', sql.Int, null)
        .input('Referencia', sql.VarChar(10), ctx.params._referencia)
        .execute('proc_obtenerTiposMovimientos');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los tipos de Movimiento');
    }
  },

  obtenerDatosFolio: async (ctx) => {
    const {
      folio,
      idPlazaSeleccionada,
      idAlmacen,
    } = ctx.request.body;
    try{  
      const response = {
        moldes: [],
        piezas: [],
        accesorios: [],
        folio: [],
      };
      const pool = await poolPromise;
      const res = await pool.request()
        .input('Folio', sql.VarChar(50), folio)
        .input('IdPlaza', sql.Int, idPlazaSeleccionada)
        .input('IdAlmacen', sql.Int, idAlmacen)
        .execute('proc_obtenerDatosMovimientoInventario');

      response.moldes = res.recordsets[0];
      response.piezas = res.recordsets[1];
      response.accesorios = res.recordsets[2];
      response.folio = res.recordsets[3];

      return response;
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los datos del folio');
    }
  },

  obtenerPiezasMolde: async (ctx) => {
    const {
      idMolde,
    } = ctx.request.body;
    try{
      const pool = await poolPromise;
      const res = await pool.request()  
        .input('IdMolde', sql.Int, idMolde)
        .execute('proc_obtenerPiezasMolde');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los tipos de Movimiento');
    }
  },

  obtenerAccesoriosMolde: async (ctx) => {
    const {
      idMolde,
      idPlazaSeleccionada
    } = ctx.request.body;

    try{
      const pool = await poolPromise;
      const res = await pool.request()  
        .input('IdMolde', sql.Int, idMolde)
        .input('IdPlaza', sql.Int, idPlazaSeleccionada)
        .execute('proc_obtenerAccesoriosMolde');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los tipos de Movimiento');
    }
  },
  


  eliminarMolde: async(ctx) => {
    try{
      const datos = ctx.request.body;
      let response = {
        datos: [],
        message: '',
      };
      
      const idMolde = datos.idProtected;
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdMolde', sql.Int, idMolde)
        .execute('proc_eliminarTicketMolde');

      response.datos = await strapi.services.molde.obtenerMoldes(ctx);
      response.message = res.recordset.length > 0 ? 
        'Se ha eliminado correctamente' : 
        'Hubo un error al eliminar la configuración del molde';
      ctx.response.status = res.recordset.length > 0 ? 200 : 404;
      return response;
    } catch (err) {
      return ctx.response.badRequest('Hubo un error al eliminar la configuración del molde');
    }
  },

  obtenerMoldes: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdMolde', sql.Int, null)
        .execute('proc_obtenerMoldes');
      for (let i = 0; i < res.recordset.length; i+=1) {
        const seccion = await pool.request()
          .input('IdMolde', sql.Int, res.recordset[i].idMolde)
          .execute('proc_obtenerSeccionesPorMolde');
        const archivos = await pool.request()
          .input('IdMolde', sql.Int, res.recordset[i].idMolde)
          .execute('proc_obtenerArchivosPorMolde');
        const archivosPlanos = await pool.request()
          .input('IdMolde', sql.Int, res.recordset[i].idMolde)
          .execute('proc_obtenerArchivosPlanosPorMolde');
        res.recordset[i].archivos = archivos.recordset;
        res.recordset[i].archivosPlanos = archivosPlanos.recordset;
        res.recordset[i].secciones = seccion.recordset;
        for (let j = 0; j < seccion.recordset.length; j+=1) {
          const insumo = await pool.request()
            .input('IdSeccion', sql.Int, seccion.recordset[j].idSeccion)
            .execute('proc_obtenerInsumosPorSeccion');
          res.recordset[i].secciones[j].datos = insumo.recordset;
        }
      }
      
      return res.recordset;
    } catch (err) {
      return ctx.response.badRequest('Error al obtener los campos');
    }
  },

  obtenerMoldesInexistentes: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .execute('proc_obtenerMoldesInexistentes');
      return res.recordset;
    } catch (err) {
      return ctx.response.badRequest('Error al obtener los campos');
    }
  },

  eliminarArchivosDocumentacion: async(ctx) => {
    try{
      const datos = ctx.request.body;
      
      const idArchivo = datos.idProtected;
      if(idArchivo === null){
        return ctx.response.badRequest('Hubo un error al eliminar el archivo');
      }
      const pool = await poolPromise;
      const request = await pool.request();
      await request
        .input('IdArchivo', sql.Int, idArchivo)
        .execute('proc_eliminarArchivo');

      ctx.response.status = 200;
      ctx.response.message = 'Se ha eliminado correctamente';
      return ctx.response;
    } catch (err) {
      return ctx.response.badRequest('Hubo un error al eliminar el archivo');
    }
  },

  guardarArchivosDocumentacion: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;

      const transaction = await pool.transaction();
      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            const archivosType = new sql.Table('Archivo');

            archivosType.columns.add('Id', sql.Int);
            archivosType.columns.add('IdArchivo', sql.Int);
            archivosType.columns.add('Ruta', sql.VarChar(255));
            archivosType.columns.add('Nombre', sql.VarChar(255));

            const archivos = datos.archivos;

            for (let i = 0; i < archivos.length; i++) {
              archivosType.rows.add(
                i+1,
                archivos.idArchivo || null,
                archivos[i].rutaArchivo,
                archivos[i].name,
              );
            }

            const req = transaction.request()
              .input('IdMolde', sql.Int, datos.idMolde)
              .input('ArchivosType', archivosType)
              .input('IdUsuario', sql.Int, 26921)
              .execute('proc_guardarArchivosMolde');

            Promise.resolve(req)
              .then(async () => {
                await transaction.commit();
                await resolve('Se han guardado correctamente');
              })
              .catch( (err) => {
                console.log('error', err);
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

  guardarConfiguracionMolde: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;

      const transaction = await pool.transaction();
      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            const seccionesType = new sql.Table('Seccion');
            const accesoriosType = new sql.Table('Accesorio');
            const piezasType = new sql.Table('Pieza');
            const archivosType = new sql.Table('Archivo');
            const planosType = new sql.Table('ArchivoInventario');

            seccionesType.columns.add('Id', sql.Int);
            seccionesType.columns.add('IdSeccion', sql.Int);
            seccionesType.columns.add('Nombre', sql.VarChar(255));
            seccionesType.columns.add('Planta', sql.Int);
            // seccionesType.columns.add('IdArchivo', sql.Int);
            // seccionesType.columns.add('RutaArchivo', sql.VarChar(255));
            // seccionesType.columns.add('NombreArchivo', sql.VarChar(255));
            seccionesType.columns.add('EsPieza', sql.Bit);
            seccionesType.columns.add('Activo', sql.Bit);
            
            accesoriosType.columns.add('Id', sql.Int);
            accesoriosType.columns.add('IdAccesorio', sql.Int);
            accesoriosType.columns.add('Nombre', sql.VarChar(50));
            accesoriosType.columns.add('Costo', sql.Decimal(19,4));
            accesoriosType.columns.add('Usos', sql.Int);
            accesoriosType.columns.add('Cantidad', sql.Decimal(19,4));
            accesoriosType.columns.add('IdSeccion', sql.Int);
            accesoriosType.columns.add('Activo', sql.Bit);

            piezasType.columns.add('Id', sql.Int);
            piezasType.columns.add('IdPieza', sql.Int);
            piezasType.columns.add('Nombre', sql.VarChar(50));
            piezasType.columns.add('Identificador', sql.VarChar(50));
            piezasType.columns.add('Referencia', sql.VarChar(50));
            piezasType.columns.add('EsRegular', sql.Bit);
            piezasType.columns.add('Alto', sql.Decimal(19,4));
            piezasType.columns.add('Ancho', sql.Decimal(19,4));
            piezasType.columns.add('Area', sql.Decimal(19,4));
            piezasType.columns.add('Usos', sql.Int);
            piezasType.columns.add('IdSeccion', sql.Int);
            piezasType.columns.add('Activo', sql.Bit);

            archivosType.columns.add('Id', sql.Int);
            archivosType.columns.add('IdArchivo', sql.Int);
            archivosType.columns.add('Ruta', sql.VarChar(255));
            archivosType.columns.add('Nombre', sql.VarChar(255));

            planosType.columns.add('Id', sql.Int);
            planosType.columns.add('IdArchivo', sql.Int);
            planosType.columns.add('Ruta', sql.VarChar(255));
            planosType.columns.add('Nombre', sql.VarChar(255));
            planosType.columns.add('IdOrigen', sql.Int);

            const secciones = datos.secciones;
            const archivos = datos.arregloArchivos;
            const planos = datos.arregloPlanos;
            let cont = 0;
            let idSeccion = 0;
            
            
            for (let i = 0; i < archivos.length; i++) {
              archivosType.rows.add(
                i+1,
                archivos.idArchivo || null,
                archivos[i].url,
                archivos[i].nombre,
              );
            }
            
            for (let i = 0; i < planos.length; i++) {
              planosType.rows.add(
                i+1,
                planos.idArchivo || null,
                planos[i].rutaArchivo,
                planos[i].name,
                planos[i].planta,
              );
            }
            
            for (let i = 0; i < secciones.length; i++) {
              
              
              seccionesType.rows.add(
                i+1,
                secciones[i].idSeccion || null,
                secciones[i].nombreTabla,
                secciones[i].planta,
                // secciones[i].idArchivo || null,
                // secciones[i].rutaArchivo || null,
                // secciones[i].nomArchivo || null,
                secciones[i].esAccesorio ? 0 : 1,
                1
              );

              if(!secciones[i].idSeccion)
                idSeccion++;
              
              for (let j = 0; j < secciones[i].datos.length; j++) {
                cont++;
                
                if(secciones[i].datos[j].esAccesorio){
                  accesoriosType.rows.add(
                    cont,
                    secciones[i].datos[j].idAccesorio || null,
                    secciones[i].datos[j].nombre,
                    toNumber(secciones[i].datos[j].material),
                    toNumber(secciones[i].datos[j].tiempoVida),
                    toNumber(secciones[i].datos[j].cantPiezas),
                    secciones[i].idSeccion || idSeccion,
                    1,
                  );
                }
                else
                  piezasType.rows.add(
                    cont,
                    secciones[i].datos[j].idPieza || null,
                    secciones[i].datos[j].nombre,
                    secciones[i].datos[j].identificador,
                    secciones[i].datos[j].numeracion,
                    secciones[i].datos[j].forma === 0 ? 1 : 0,
                    toNumber(secciones[i].datos[j].alto),
                    toNumber(secciones[i].datos[j].ancho),
                    toNumber(secciones[i].datos[j].area),
                    toNumber(secciones[i].datos[j].limiteUsos),
                    secciones[i].idSeccion || idSeccion,
                    1,
                  );
              }
            }
            
            const req = transaction.request()
              .input('IdMolde', sql.Int, datos.idMolde)
              .input('Nombre', sql.VarChar(50), datos.nombre)
              .input('Version', sql.VarChar(30), datos.version)
              .input('NumPlantas', sql.Int, datos.numPlantas)
              .input('Costo', sql.Decimal(19,4), datos.costo)
              .input('IdProveedor', sql.Int, datos.idProveedor)
              .input('IdTipoMaterial', sql.Int, datos.idMaterial)
              .input('SeccionesType', seccionesType)
              .input('AccesoriosType', accesoriosType)
              .input('PiezasType', piezasType)
              .input('ArchivosType', archivosType)
              .input('PlanosType', planosType)
              .input('IdUsuario', sql.Int, datos.usuario)
              .execute('proc_guardarConfiguracionMolde');

            Promise.resolve(req)
              .then(async () => {
                await transaction.commit();
                const res = await strapi.services.molde.obtenerMoldes(ctx);
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

  guardarNuevoMovimiento: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      const transaction = await pool.transaction();
      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            const archivosType = new sql.Table('Archivo');
            const piezasType = new sql.Table;
            const accesoriosType = new sql.Table;
            
            
            archivosType.columns.add('Id', sql.Int);
            archivosType.columns.add('IdArchivo', sql.Int);
            archivosType.columns.add('Ruta', sql.VarChar(255));
            archivosType.columns.add('Nombre', sql.VarChar(255));

            accesoriosType.columns.add('IdAccesorio', sql.Int);
            accesoriosType.columns.add('IdSeccion', sql.Int);
            accesoriosType.columns.add('Cantidad', sql.Int);
            accesoriosType.columns.add('Identificador', sql.VarChar(50));
            accesoriosType.columns.add('Molde', sql.VarChar(50));
            accesoriosType.columns.add('Monto', sql.Int);
            accesoriosType.columns.add('Nombre', sql.VarChar(50));
            accesoriosType.columns.add('Planta', sql.Int);
            accesoriosType.columns.add('Seccion', sql.VarChar(50));
            accesoriosType.columns.add('Seleccionado', sql.Bit);
            accesoriosType.columns.add('Usos', sql.Int);
            accesoriosType.columns.add('IdUbicacion', sql.Int);
            accesoriosType.columns.add('Estatus', sql.Int);
            accesoriosType.columns.add('IdInsumo', sql.Int);

            piezasType.columns.add('IdPieza', sql.Int);
            piezasType.columns.add('IdSeccion', sql.Int);
            piezasType.columns.add('Cantidad', sql.Int);
            piezasType.columns.add('Identificador', sql.VarChar(50));
            piezasType.columns.add('Molde', sql.VarChar(50));
            piezasType.columns.add('Nombre', sql.VarChar(50));
            piezasType.columns.add('Planta', sql.Int);
            piezasType.columns.add('Seccion', sql.VarChar(50));
            piezasType.columns.add('Seleccionado', sql.Bit);
            piezasType.columns.add('Usos', sql.Int);
            piezasType.columns.add('IdUbicacion', sql.Int);
            piezasType.columns.add('Estatus', sql.Int);
            piezasType.columns.add('IdInsumo', sql.Int);

            const piezas = datos.piezasSeleccionadas;
            const accesorios = datos.accesoriosSeleccionados;
            const archivos = datos.archivos;
            
            for (let i = 0; i < archivos.length; i++) {
              archivosType.rows.add(
                i+1,
                i+1,
                archivos[i].rutaArchivo,
                archivos[i].name,
              );
            }
            
            for (let i = 0; i < piezas.length; i++) {
              piezasType.rows.add(
                piezas[i].IdPieza || null,
                piezas[i].IdSeccion || null,
                1, // Cantidad
                piezas[i].Identificador,
                piezas[i].Molde,
                piezas[i].Nombre,
                piezas[i].Planta,
                piezas[i].Seccion,
                piezas[i].Seleccionado ? 1 : 0,
                piezas[i].Usos,
                piezas[i].IdUbicacion || null,
                '',
                0 
              );
            }
            for (let i = 0; i < accesorios.length; i++) {
              accesoriosType.rows.add(
                accesorios[i].IdAccesorio || null,
                accesorios[i].IdSeccion,
                accesorios[i].Cantidad,
                accesorios[i].Identificador,
                accesorios[i].Molde,
                accesorios[i].Monto,
                accesorios[i].Nombre,
                accesorios[i].Planta,
                accesorios[i].Seccion,
                accesorios[i].Seleccionado ? 1 : 0,
                accesorios[i].Usos,
                accesorios[i].IdUbicacion || null,
                '',
                0
              );
            }
            
            const req = transaction.request()
              .input('Proceso', sql.VarChar(10), datos.proceso)
              .input('IdMolde', sql.Int, datos.moldeSeleccionado)
              .input('IdPlazaSeleccionada', sql.Int, datos.idPlazaSeleccionada)
              .input('IdTipoMovimiento', sql.Int, datos.idTipoMovimiento)
              .input('Observaciones', sql.VarChar(80), datos.observaciones)
              .input('ArchivosMoldeType', archivosType)
              .input('AccesoriosMoldeType',accesoriosType)
              .input('PiezasMoldeType', piezasType)
              .input('IdUsuario', sql.Int, datos.usuario)
              .input('IdPlazaDestino', sql.Int, datos.idPlazaDestino)
              .input('IdInventario', sql.Int, datos.idInventario)
              .input('IdInventarioDestino', sql.Int, datos.idInventarioDestino)
              .execute('proc_guardarMovimientoInventario');
            
            Promise.resolve(req)
              .then(async () => {
                await transaction.commit();
                const res = await strapi.services.molde.obtenerMovimientos(datos.usuario);
                await resolve(res);
              })
              .catch( (err) => {
                console.log('error', err);
                transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
                reject('Ocurrio un error al guardar nuevo movimiento');
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
  obtenerMovimientos: async (ctx) => {
    try{
      let idUsuario;
      if (ctx.params){
        idUsuario = ctx.params._idUsuario; 
      }else{
        idUsuario = ctx;
      }
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdUsuario', sql.VarChar(10), idUsuario)
        .execute('proc_obtenerMovimientos');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los Movimientos');
    }
  },
  obtenerMovimientoDetalle: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()  
        .input('IdMovimiento', sql.Int, ctx.params._IdMovimiento)
        .execute('proc_obtenerMovimientoInventarioDetalle');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los tipos de Movimiento');
    }
  },

  obtenerAlmacenesPorUsuario: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()  
        .input('IdUsuario', sql.Int, ctx.params._usuarioLogeado)
        .execute('proc_obtenerAlmacenesPorUsuario');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error al obtener los almacenes');
    }
  },
  obtenerAlmacenesPlazaUsuario: async (ctx) => {
    try{
      const {
        usuario,
        idPlaza,
      } = ctx.request.body;
      const pool = await poolPromise;
      const res = await pool.request()  
        .input('IdUsuario', sql.Int, usuario)
        .input('IdPlaza', sql.Int,idPlaza)
        .execute('proc_obtenerAlmacenesPorUsuario');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error al obtener los almacenes');
    }
  },
  
  
  obtenerAlmacenPlaza: async (ctx) => {
    try{
      const pool = await poolPromise;

      if (ctx.params._IdPlaza != 0) {
        const res = await pool.request()
          .input('IdPlaza', sql.Int, ctx.params._IdPlaza)
          .execute('proc_obtenerAlmacenes');
        return res.recordsets[0];
      }
      return [];
    } catch(err) {
      return ctx.response.badRequest('Error al obtener los almacenes');
    }
  },


  obtenerMoldesAlmacen: async (ctx) => {
    try{
      const pool = await poolPromise;
      
      if (ctx.params._IdAlmacen != 0) {
        const res = await pool.request()  
          .input('IdAlmacen', sql.Int, ctx.params._IdAlmacen)
          .execute('proc_obtenerMoldesAlmacen');
        return res.recordsets[0];
      } else {
        const res = await pool.request()
          .execute('proc_obtenerMoldesAlmacen');
        return res.recordsets[0];
      }
    } catch(err) {
      return ctx.response.badRequest('Error al obtener los almacenes');
    }
  },

  obtenerMoldesAlmacenReporte: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()  
        .input('IdAlmacen', sql.Int, ctx.params._IdAlmacen)
        .execute('proc_obtenerMoldesAlmacenReporte');
      return res.recordsets[0];

    } catch(err) {
      return ctx.response.badRequest('Error al obtener los almacenes');
    }
  },
  
  obtenerOrigenesAlmacen: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()  
        .input('IdTipoMovimiento', sql.Int, ctx.params._IdTipoMovimiento)
        .execute('proc_obtenerOrigenesAlmacen');
      return res.recordsets[0];

    } catch(err) {
      return ctx.response.badRequest('Error al obtener los almacenes');
    }
  },

  obtenerMoldesExistentes: async (ctx) => {
    const {
      IdPlaza,
      IdTipoMovimiento,
      IdAlmacen,
    } = ctx.request.body;
    try{
      const pool = await poolPromise;
      const res = await pool.request()  
        .input('IdPlaza', sql.Int, IdPlaza)
        .input('IdTipoMovimiento', sql.Int, IdTipoMovimiento)
        .input('IdInventario', sql.Int, IdAlmacen)
        .execute('proc_obtenerMoldesExistentes');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los moldes');
    }
  },

  
  obtenerAniosAlmacen: async (ctx) => {
    const {
      idPlaza,
      idAlmacen,
    } = ctx.request.body;
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdAlmacen', sql.Int, idAlmacen)
        .input('IdPlaza', sql.Int, idPlaza)
        .execute('proc_obtenerAniosAlmacen');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener el reporte');
    }
  },
  obtenerPeriodosAlmacen: async (ctx) => {
    const {
      idPlaza,
      idAlmacen,
      año,
    } = ctx.request.body;
    
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdPlaza', sql.Int, idPlaza)
        .input('IdAlmacen', sql.Int, idAlmacen)
        .input('año', sql.Int, año)
        .execute('proc_obtenerPeriodosAlmacen');

      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener el reporte');
    }
  },

  obtenerReporteInventarios: async (ctx) => {
    const {
      idPlaza,
      idAlmacen,
      idMolde,
      usuario,
    } = ctx.request.body;
    
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdPlaza', sql.Int, idPlaza)
        .input('IdAlmacen', sql.Int, idAlmacen)
        .input('IdMolde', sql.Int, idMolde)
        .input('IdUsuario', sql.Int, usuario)
        .execute('proc_obtenerReporteExistenciaInventario');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener el reporte');
    }
  },

  obtenerReporteKardexInventario: async (ctx) => {
    const {
      idPlaza,
      idAlmacen,
      fechaInicio,
      fechaFin,
      tipoMovimiento,
      origen,
      destino,
      codigoInicio,
      codigoFinal,
      usuario,
    } = ctx.request.body;
    
    
    const fechaInicioValida = fechaInicio !== null ? new Date(fechaInicio) : null;
    const fechaFinValida = fechaFin !== null ? new Date(fechaFin) : null;

    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdPlaza', idPlaza)
        .input('IdAlmacen', idAlmacen)
        .input('FechaInicio',fechaInicioValida)
        .input('FechaFin',fechaFinValida)
        .input('TipoMovimiento', tipoMovimiento)
        .input('Origen', origen)
        .input('Destino', destino)
        .input('CodigoInicio', codigoInicio)
        .input('CodigoFinal', codigoFinal)
        .input('IdUsuario', usuario)
        .execute('proc_obtenerReporteKardexAlmacen');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener el reporte');
    }
  },


  obtenerReporteConfiabilidadInventario: async (ctx) => {
    const {
      idPlaza,
      idAlmacen,
      año,
      periodo,
      usuario,
    } = ctx.request.body;
    const response = {
      datosFamiliaImporte: [],
      datosFamiliaItems: [],
      datosCostoInventario: [],
      datosTotalConteo: [],
      datosConteosRealizados: [],
      datosEncabezado: [],
    };

    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdPlaza',sql.Int, idPlaza)
        .input('IdAlmacen',sql.Int,  idAlmacen)
        .input('IdAño',sql.Int, año)
        .input('IdPeriodo',sql.Int, periodo)
        .input('IdUsuario',sql.Int,  usuario)
        .execute('proc_obtenerReporteConfiabilidadInventario');
      response.datosEncabezado = res.recordsets[0];
      response.datosFamiliaImporte = res.recordsets[1];
      response.datosFamiliaItems = res.recordsets[2];
      response.datosCostoInventario = res.recordsets[3];
      response.datosTotalConteo = res.recordsets[4];
      response.datosConteosRealizados = res.recordsets[5];
      return response;
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener el reporte');
    }
  },
  obtenerInsumosExistentes: async (ctx) => {
    const {
      idMolde,
      idPlazaSeleccionada,
      idTipoMovimiento,
      idAlmacen,
    } = ctx.request.body;
    
    try{
      const response = {
        piezas: [],
        accesorios: [],
      };

      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdMolde', sql.Int, idMolde)
        .input('IdPlaza', sql.Int, idPlazaSeleccionada)
        .input('IdTipoMovimiento', sql.Int, idTipoMovimiento)
        .input('IdAlmacen', sql.Int, idAlmacen)
        .execute('proc_obtenerInsumosExistentes');
      response.piezas = res.recordsets[0];
      response.accesorios = res.recordsets[1];
      return response;
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los tipos de Movimiento');
    }
  },
  obtenerTablasMovimiento: async(ctx) => {
    try{
      const response = {
        archivos: [],
        molde: [],
        piezas: [],
        accesorios: [],
        almacenes:[],
        almacenesDestino:[],
        // tiposMovimientos:[],
      };
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdMovimiento', sql.Int, ctx.params._IdMovimiento)
        .execute('proc_obtenerTablasMovimiento');
      response.archivos = res.recordsets[0];
      response.molde = res.recordsets[1];
      response.piezas = res.recordsets[2];
      response.accesorios = res.recordsets[3];
      response.almacenes = res.recordsets[4];
      response.almacenesDestino = res.recordsets[5];
      // response.tiposMovimientos = res.recordsets[6];
      return response;
    } catch (err) {
      sql.close();
      return ctx.response.badRequest('Error al obtener los campos');
    }
  },
  obtenerInsumosAlmacen: async (ctx) => {
    const {
      IdMolde,
      IdAlmacen,  
      IdPlanta,
    } = ctx.request.body;
    
    try{
      const response = {
        piezas: [],
        accesorios: [],
      };

      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdMolde', sql.Int, IdMolde)
        .input('IdAlmacen', sql.Int, IdAlmacen)
        .input('IdPlanta', sql.Int, IdPlanta)
        .execute('proc_obtenerInsumosAlmacen');
      response.piezas = res.recordsets[0];
      response.accesorios = res.recordsets[1];

      
      return response;
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener insumos de almacen');
    }
  },
  obtenerEstatusInventario: async (ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .execute('proc_obtenerEstatusInventarioCiclico');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los estatus de inventario');
    }
  },
  guardarInventarioCiclico: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      const transaction = await pool.transaction();

      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            const evidenciasType = new sql.Table('ArchivoInventario');
            const formatoConteoType = new sql.Table('ArchivoInventario');
            const reporteResultadosType = new sql.Table('ArchivoInventario');
            const piezasType = new sql.Table;
            const accesoriosType = new sql.Table;
            
            evidenciasType.columns.add('Id', sql.Int);
            evidenciasType.columns.add('IdArchivo', sql.Int);
            evidenciasType.columns.add('Ruta', sql.VarChar(255));
            evidenciasType.columns.add('Nombre', sql.VarChar(255));
            evidenciasType.columns.add('IdOrigen', sql.Int); 

            formatoConteoType.columns.add('Id', sql.Int);
            formatoConteoType.columns.add('IdArchivo', sql.Int);
            formatoConteoType.columns.add('Ruta', sql.VarChar(255));
            formatoConteoType.columns.add('Nombre', sql.VarChar(255));
            formatoConteoType.columns.add('IdOrigen', sql.Int);

            reporteResultadosType.columns.add('Id', sql.Int);
            reporteResultadosType.columns.add('IdArchivo', sql.Int);
            reporteResultadosType.columns.add('Ruta', sql.VarChar(255));
            reporteResultadosType.columns.add('Nombre', sql.VarChar(255));
            reporteResultadosType.columns.add('IdOrigen', sql.Int);

            accesoriosType.columns.add('IdAccesorio', sql.Int);
            accesoriosType.columns.add('IdSeccion', sql.Int);
            accesoriosType.columns.add('Cantidad', sql.Int);
            accesoriosType.columns.add('Identificador', sql.VarChar(50));
            accesoriosType.columns.add('Molde', sql.VarChar(50));
            accesoriosType.columns.add('Monto', sql.Int);
            accesoriosType.columns.add('Nombre', sql.VarChar(50));
            accesoriosType.columns.add('Planta', sql.Int);
            accesoriosType.columns.add('Seccion', sql.VarChar(50));
            accesoriosType.columns.add('Seleccionado', sql.Bit);
            accesoriosType.columns.add('Usos', sql.Int);
            accesoriosType.columns.add('IdUbicacion', sql.Int);
            accesoriosType.columns.add('Estatus', sql.VarChar(50));
            accesoriosType.columns.add('IdInsumo', sql.Int);

            piezasType.columns.add('IdPieza', sql.Int);
            piezasType.columns.add('IdSeccion', sql.Int);
            piezasType.columns.add('Cantidad', sql.Int);
            piezasType.columns.add('Identificador', sql.VarChar(50));
            piezasType.columns.add('Molde', sql.VarChar(50));
            piezasType.columns.add('Nombre', sql.VarChar(50));
            piezasType.columns.add('Planta', sql.Int);
            piezasType.columns.add('Seccion', sql.VarChar(50));
            piezasType.columns.add('Seleccionado', sql.Bit);
            piezasType.columns.add('Usos', sql.Int);
            piezasType.columns.add('IdUbicacion', sql.Int);
            piezasType.columns.add('Estatus', sql.VarChar(50));
            piezasType.columns.add('IdInsumo', sql.Int);


            const piezas = datos.piezas;
            const accesorios = datos.accesorios;
            const evidencias = datos.evidencias;
            const formatoConteo = datos.formatoConteo;
            const reporteResultados = datos.reporteResultados;
            
            for (let i = 0; i < evidencias.length; i++) {
              evidenciasType.rows.add(
                i+1,
                i+1,
                evidencias[i].rutaArchivo,
                evidencias[i].name,
                evidencias[i].idInsumo,
              );
            }

            for (let i = 0; i < formatoConteo.length; i++) {
              formatoConteoType.rows.add(
                i+1,
                formatoConteo[i].idArchivo,
                formatoConteo[i].rutaArchivo,
                formatoConteo[i].name,
                datos.moldeSeleccionado
              );
            }

            for (let i = 0; i < reporteResultados.length; i++) {
              reporteResultadosType.rows.add(
                i+1,
                reporteResultados[i].idArchivo,
                reporteResultados[i].rutaArchivo,
                reporteResultados[i].name,
                datos.moldeSeleccionado
              );
            }
            
            
            for (let i = 0; i < piezas.length; i++) {
              piezasType.rows.add(
                piezas[i].IdPieza || null,
                piezas[i].IdSeccion || null,
                1, // Cantidad
                piezas[i].Identificador,
                piezas[i].Molde,
                piezas[i].Nombre,
                piezas[i].Planta,
                piezas[i].Seccion,
                piezas[i].Seleccionado ? 1 : 0,
                piezas[i].Usos, 
                piezas[i].IdUbicacion,
                piezas[i].IdEstatus, 
                piezas[i].IdInsumo, 
                
              );
            }

            for (let i = 0; i < accesorios.length; i++) {
              accesoriosType.rows.add(
                accesorios[i].IdAccesorio || null,
                accesorios[i].IdSeccion,
                accesorios[i].Cantidad,
                accesorios[i].Identificador,
                accesorios[i].Molde,
                accesorios[i].Monto,
                accesorios[i].Nombre,
                accesorios[i].Planta,
                accesorios[i].Seccion,
                accesorios[i].Seleccionado ? 1 : 0,
                accesorios[i].Usos,
                accesorios[i].IdUbicacion,
                accesorios[i].IdEstatus, 
                accesorios[i].IdInsumo, 
              );
            }
            

            const req = transaction.request()
              .input('Proceso', sql.VarChar(10), datos.proceso)
              .input('IdMolde', sql.Int, datos.moldeSeleccionado)
              .input('IdAlmacen', sql.Int, datos.almacenSeleccionado)
              .input('IdPlanta', sql.Int, datos.plantaSeleccionada)
              .input('EvidenciasInsumos', evidenciasType)
              .input('FormatoConteo', formatoConteoType)
              .input('ReporteResultados', reporteResultadosType)
              .input('PiezasInventario', piezasType)
              .input('AccesoriosInventario',accesoriosType)
              .input('IdUsuario', sql.Int, datos.usuarioLogeado)
              .input('Estatus', sql.VarChar(50), datos.estatus)
              .input('Resultados', sql.VarChar(50), datos.cantidadResultados)
              .execute('proc_guardarInventarioCicliclo');
            
            
            Promise.resolve(req)
              .then(async () => {
                await transaction.commit();
                const res = await strapi.services.molde.obtenerInventarioCiclicos(datos.almacenSeleccionado);
                await resolve(res);
              })
              .catch( (err) => {
                console.log('error', err);
                transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
                reject('Ocurrio un error al guardar el inventario');
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

  obtenerInventarioCiclicos: async (ctx) => {
    try{
      let almacen;
      if (ctx.params){
        almacen = ctx.params._almacen; 
      }else{
        almacen = ctx;
      }
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdAlmacen', sql.Int, almacen)
        .execute('proc_obtenerInventariosCiclicos');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los inventarios ciclicos');
    }
  },

  obtenerAlmacenFechaInicial: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdAlmacen', sql.Int, ctx.params._IdAlmacen)
        .execute('proc_obtenerInventarioFechaInicial');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener la fecha inicial');
    }
  },
  
  eliminarArchivoEvidencia: async (ctx) => {
    try{
      const datos = ctx.request.body;
      
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdEvidencia', sql.Int, datos.idEvidencia)
        .input('IdAlmacen', sql.Int, datos.idAlmacen)
        .execute('proc_elminarArchivoEvidencia');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al borrar el archivo de evidencia');
    }
  },

  obtenerEvidenciasInventariosCiclicos: async (ctx) => {
    try{
      let almacen;
      if (ctx.params){
        almacen = ctx.params._almacen; 
      }else{
        almacen = ctx;
      }
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdAlmacen', sql.Int, almacen)
        .execute('proc_obtenerEvidenciasInventarioCiclico');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener las evidencias de inventario ciclico');
    }
  },

  guardarArchivosEvidencia: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      const transaction = await pool.transaction();

      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{

            
            const fecha = datos.fechaInventario !== null ? new Date(datos.fechaInventario) : null;
            
            const req = transaction.request()
              .input('Ruta', sql.VarChar(255), datos.rutaArchivo)
              .input('Nombre', sql.VarChar(255), datos.nombre)
              .input('IdAlmacen', sql.Int, datos.almacenSeleccionado)
              .input('FechaInventario', sql.DateTime, fecha)
              .input('IdUsuario', sql.Int, datos.usuarioLogeado)
              .execute('proc_guardarEvidenciaInventarioCicliclo');
            
            
            Promise.resolve(req)
              .then(async () => {
                await transaction.commit();
                const res = await strapi.services.molde.obtenerEvidenciasInventariosCiclicos(datos.almacenSeleccionado);
                await resolve(res);
              })
              .catch( (err) => {
                console.log('error', err);
                transaction.rollback().then(r => resolve(r)).catch(() => reject('Ocurrio un error interno'));
                reject('Ocurrio un error al guardar el inventario');
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
  obtenerDetalleInventarioCiclico: async (ctx) => {
    try{
      const response = {
        datosDetalle: [],
        piezas: [],
        accesorios: [],
      };

      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdInventarioCiclico', sql.Int, ctx.params._idInventarioCiclico)
        .execute('proc_obtenerDetalleInventarioCiclico');
      
      response.datosDetalle = res.recordsets[0];
      response.piezas = res.recordsets[1];
      response.accesorios = res.recordsets[2];

      return response;
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los tipos de Movimiento');
    }
  },

  cambiarResultadosInventario: async (ctx) => {
    try {
  
      const {
        idInventario,
        cantidad,
      } = ctx.request.body;

      const pool = await poolPromise;
      const req = await pool.request()
        .input('IdInventarioCiclico',idInventario)
        .input('Cantidad',cantidad)
        .execute('proc_cambiarResultadosInventario');

      ctx.response.status = 200;
      return ctx.response;
    } catch (error) {
      return ctx.response.badRequest('Error al cambiar la cantidad de resultados');
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

};

