'use strict';

/**
 * Pedidos.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const { poolPromise, transporter } = require('./../../../config/functions/bootstrap');

const upperText = (nombre) =>
  nombre.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

module.exports = {

  /**
   * Promise to fetch all pedidos.
   *
   * @return {Promise}
   */

  obtenerPlazasDos: async(ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdPlaza', sql.Int, null)
        .execute('proc_obtenerPlazasReales');
      
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener las plazas');
    }
  },
  obtenerPedidos: async(ctx) => {
    try {
      const datos = ctx.request.body;
      const response = {
        cabeceras: [
          {
            name: 'IdPedido',
            label: 'Folio',
            options: {
              filter: false,
              display: false,
              searchable: false,
            },
          },
          {
            name: 'Folio',
            label: 'Folio',
            options: {
              filter: false,
            },
          },
          {
            name: 'Plaza',
            label: 'Plaza',
            options: {
              filter: true,
              searchable: false,
            },
          },
          {
            name: 'Solicitante',
            label: 'Solicitante',
            options: {
              filter: false,
              searchable: false,
            },
          },
          {
            name: 'FechaSolicitud',
            label: 'Fecha de Solicitud',
            options: {
              filter: false,
              searchable: false,
            },
          },
          {
            name: 'FechaAutorizacion',
            label: 'Fecha de Autorización',
            options: {
              filter: false,
              searchable: false,
            },
          },
          {
            name: 'Estatus',
            label: 'Estatus',
            options: {
              filter: false,
              searchable: false,
            },
          },
          {
            name: 'Color',
            label: 'Color',
            options: {
              filter: false,
              display: false,
              searchable: false,
            },
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
        datos: [],
      };
      const pool = await poolPromise;
      const req = await pool.request();
      const fecSolInicio = datos.fecSolicitudInicio !== null ? new Date(datos.fecSolicitudInicio) : null;
      const fecSolFin = datos.fecSolicitudFin !== null ? new Date(datos.fecSolicitudFin) : null;
      const fecAutInicio = datos.fecAutorizacionInicio !== null ? new Date(datos.fecAutorizacionInicio) : null;
      const fecAutFin = datos.fecAutorizacionFin !== null ? new Date(datos.fecAutorizacionFin) : null;
      
      const res = await req
        .input('IdPedido', sql.Int, datos.idPedido)
        .input('IdPlaza', sql.Int, datos.idPlaza)
        .input('IdEstatus', sql.Int, datos.idEstatus)
        .input('FechaSolicitudInicio', sql.DateTime, fecSolInicio)
        .input('FechaSolicitudFin', sql.DateTime, fecSolFin)
        .input('FechaAutorizacionInicio', sql.DateTime, fecAutInicio)
        .input('FechaAutorizacionFin', sql.DateTime, fecAutFin)
        .execute('proc_obtenerPedidos');
      
      for (let i = 0; i < res.recordset.length; i++) {
        res.recordset[i].Plaza = upperText(res.recordset[i].Plaza);
        res.recordset[i].Solicitante = upperText(res.recordset[i].Solicitante);
      }
      response.datos.push(res.recordset);
      return response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Hubo un error al obtener los pedidos');
    }
  },

  obtenerReportePedido: async(ctx) =>{
    try {
      const datos = ctx.request.body;
      const response = {
        cabeceras: [
          {
            name: 'Plaza',
            id: 0,
            label: 'Plaza',
            options: {
              filter: true,
            },
          },
          {
            name: 'Folio',
            id: 1,
            label: 'ID pedido',
            options: {
              filter: true,
            },
          },
          {
            name: 'Articulo',
            id: 2,
            label: 'Artículo',
            options: {
              filter: false,
            },
          },
          {
            name: 'CantSolicitada',
            id: 3,
            label: 'Ped.',
            options: {
              filter: false,
            },
          },
          {
            name: 'Existencia',
            id: 4,
            label: 'Ext.',
            options: {
              filter: false,
            },
          },
          {
            name: 'Autorizado',
            id: 5,
            label: 'Aut.',
            options: {
              filter: false,
            },
          },
          {
            name: 'Recibido',
            id: 6,
            label: 'Rec.',
            options: {
              filter: false,
            },
          },
          {
            name: 'Importe',
            id: 7,
            label: 'Importe',
            options: {
              filter: false,
            },
          },
          {
            name: 'Solicitante',
            id: 8,
            label: 'Empleado plaza',
            options: {
              filter: false,
            },
          },
          {
            name: 'Autorizador',
            id: 9,
            label: 'Empleado comercial',
            options: {
              filter: false,
            },
          },
          {
            name: 'FechaSolicitud',
            id: 10,
            label: 'Fecha de solicitud',
            options: {
              filter: false,
            },
          },
          {
            name: 'FechaRecibido',
            id: 11,
            label: 'Fecha recibido',
            options: {
              filter: false,
            },
          },
          {
            name: 'DiasAtencion',
            id: 12,
            label: 'Días de atención',
            options: {
              filter: false,
            },
          },   
        ],
        datos: [],
        hayDatos: false,
      };
      
      const pool = await poolPromise;
      const req = await pool.request();
      const req2 = await pool.request();
      let hayDatos = false;
      const plazasType = new sql.Table('IdType');
      plazasType.columns.add('Id', sql.Int);
      
      let i = 0;
      for (i = 0; i < datos.plazas.length; i++) {
        plazasType.rows.add(datos.plazas[i])  ;
      }

      let agrup = [];
      const arregloFinal = [];
      const fecSolInicio = datos.fecSolicitudInicio !== null ? new Date(datos.fecSolicitudInicio) : null;
      const fecSolFin = datos.fecSolicitudFin !== null ? new Date(datos.fecSolicitudFin) : null;
      const fecAutInicio = datos.fecAutorizacionInicio !== null ? new Date(datos.fecAutorizacionInicio) : null;
      const fecAutFin = datos.fecAutorizacionFin !== null ? new Date(datos.fecAutorizacionFin) : null;

      
      if(datos.agrupadores.length > 0){
        for (i = 0; i < datos.agrupadores.length; i++) {
          agrup = await req
            .input('IdAgrupador', sql.Int, datos.agrupadores[i])
            .execute('proc_obtenerAgrupador'); 
          for (let j = 0; j < agrup.recordset.length; j++) {
            arregloFinal.push({
              nomAgrupador : agrup.recordset[j].Nombre.toUpperCase(),
              color: agrup.recordset[j].Color,
            });
    
            const res = await req2
              .input('Plazas', plazasType)
              .input('IdAgrupador', sql.Int, agrup.recordset[j].IdAgrupador)
              .input('FechaSolicitudInicio', sql.DateTime, fecSolInicio)
              .input('FechaSolicitudFin', sql.DateTime, fecSolFin)
              .input('FechaRecibidoInicio', sql.DateTime, fecAutInicio)
              .input('FechaRecibidoFin', sql.DateTime, fecAutFin)
              .execute('proc_generarReportePedidos');
            if(!response.hayDatos)
              response.hayDatos = res.recordset.length > 0;

            for (let i = 0; i < res.recordset.length; i++) {
              res.recordset[i].Plaza = upperText(res.recordset[i].Plaza);
              arregloFinal.push(res.recordset[i]);
            }
          }
        }
      } else {
        agrup = await req.execute('proc_obtenerAgrupador');
        for (let j = 0; j < agrup.recordset.length; j++) {
          arregloFinal.push({
            nomAgrupador : agrup.recordset[j].Nombre.toUpperCase(),
            color: agrup.recordset[j].Color,
          });
  
          const res = await req2
            .input('Plazas', plazasType)
            .input('IdAgrupador', sql.Int, agrup.recordset[j].IdAgrupador)
            .input('FechaSolicitudInicio', sql.DateTime, fecSolInicio)
            .input('FechaSolicitudFin', sql.DateTime, fecSolFin)
            .input('FechaRecibidoInicio', sql.DateTime, fecAutInicio)
            .input('FechaRecibidoFin', sql.DateTime, fecAutFin)
            .execute('proc_generarReportePedidos');
          if(!response.hayDatos)
            response.hayDatos = res.recordset.length > 0;

          for (let i = 0; i < res.recordset.length; i++) {
            res.recordset[i].Plaza = upperText(res.recordset[i].Plaza);
            arregloFinal.push(res.recordset[i]);
          }
  
        }
      }
      
      response.datos = arregloFinal;
      return response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Hubo un error al obtener el reporte');
    }
  },

  obtenerReporte: async(ctx) => {
    try {
      const datos = ctx.request.body;
      const response = {
        cabeceras: [
          {
            name: 'NomPlaza',
            label: 'Plaza',
            options: {
              filter: true,
            },
          },
          {
            name: 'NomAgrupador',
            label: 'Módulo',
            options: {
              filter: true,
            },
          },
          {
            name: 'NomArticulo',
            label: 'Articulo',
            options: {
              filter: false,
            },
          },
          {
            name: 'Existencia',
            label: 'Existencia',
            options: {
              filter: false,
            },
          },
          {
            name: 'Stock',
            label: 'Stock mínimo / Stock máximo',
            options: {
              filter: false,
            },
          },
          {
            name: 'Precio',
            label: 'Precio unitario',
            options: {
              filter: false,
            },
          },     
        ],
        datos: [],
      };
      const plazasType = new sql.Table('IdType');
      const agrupadoresType = new sql.Table('IdType');

      plazasType.columns.add('Id', sql.Int);
      agrupadoresType.columns.add('Id', sql.Int);
      
      let i = 0;
      for (i = 0; i < datos.plazas.length; i++) {
        plazasType.rows.add(datos.plazas[i])  ;
      }
      for (i = 0; i < datos.agrupadores.length; i++) {
        agrupadoresType.rows.add(datos.agrupadores[i])  ;
      }

      const pool = await poolPromise;
      const req = await pool.request();
      
      const res = await req
        .input('Plazas', plazasType)
        .input('Agrupadores', agrupadoresType)
        .execute('proc_obtenerInventario');
      
      for (let i = 0; i < res.recordset.length; i++) {
        res.recordset[i].NomPlaza = upperText(res.recordset[i].NomPlaza);
        
      }
      response.datos.push(res.recordset);
      return response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Hubo un error al obtener el reporte');
    }
  },

  recibirPedido: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      const transaction = await pool.transaction();
      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            let datosTabla = '';
            let cabeceras = '';
            let negritas = '';
            let link = '';
            const detalleType = new sql.Table('PedidoDetalle');
            const archivosType = new sql.Table('PedidoCotizacion');

            detalleType.columns.add('IdDetalle', sql.Int);
            detalleType.columns.add('Autorizado', sql.Int);
            detalleType.columns.add('Importe', sql.Decimal(19,4));
            detalleType.columns.add('Comentarios', sql.VarChar(255));
            detalleType.columns.add('Guia', sql.VarChar(255));
            detalleType.columns.add('Paqueteria', sql.VarChar(255));
            detalleType.columns.add('Evidencia', sql.VarChar(255));
            detalleType.columns.add('NombreArchivo', sql.VarChar(255));

            archivosType.columns.add('Id', sql.Int);
            archivosType.columns.add('IdPedido', sql.Int);
            archivosType.columns.add('RutaArchivo', sql.VarChar(255));
            archivosType.columns.add('IdCotizacion', sql.Int);


            for (let j = 0; j < datos.cotizaciones.length; j++) {
              archivosType.rows.add(
                j+1,
                datos.idPedido,
                datos.cotizaciones[j].url,
                datos.cotizaciones[j].IdCotizacion || null
              );
            }
            let mensaje = '';
            for (let i = 0; i < datos.detalle.length; i+=1) {
              detalleType.rows.add(
                datos.detalle[i].IdDetalle,
                datos.detalle[i].RecibidoInput,
                0,
                datos.detalle[i].ComentariosRecepcionInput,
                null,
                null,
                datos.detalle[i].RutaEvidenciaRecepcionInputFile,
                datos.detalle[i].RutaEvidenciaRecepcionNombreArchivo,
              );
            }
            const req = await transaction.request()
              .input('IdPedido', sql.Int, datos.idPedido)
              .input('DetalleType', detalleType)
              .input('IdUsuario', sql.Int, datos.idUsuario)
              .input('Comentarios', sql.VarChar(255), datos.comGenerales)
              .execute('proc_recibirPedido');

            if(req.recordset[0].IdEstatus === 7){
              for (let j = 0; j < datos.detalle.length; j++) {
                link = datos.detalle[j].RutaEvidenciaRecepcionNombreArchivo ? `<a href='${datos.detalle[j].RutaEvidenciaRecepcionInputFile}'>${datos.detalle[j].RutaEvidenciaRecepcionNombreArchivo}</a>` : '';
                mensaje += `<tr><td>${datos.detalle[j].IdArticulo}</td>`;
                mensaje += `<td>${datos.detalle[j].Modulo}</td>`;
                mensaje += `<td>${datos.detalle[j].Articulo}</td>`;
                mensaje += `<td>${datos.detalle[j].RecibidoInput}</td>`;
                mensaje += `<td>${req.recordset[0].NomPlaza}</td>`;
                mensaje += `<td>${upperText(req.recordset[j].NomRecibio)}</td>`;
                mensaje += `<td>${req.recordset[j].FechaRecibio}</td>`;
                mensaje += `<td>${req.recordset[j].NomEstatus}</td>`;
                mensaje += `<td>${link}</td></tr>`;
              }
              datosTabla = `Tu pedido con el folio: <b>${req.recordset[0].Folio}</b> `;
              datosTabla += 'fue recibicido exitosamente';
              datosTabla += '<br /> A continuación, se muestra el pedido detallado:';
              cabeceras = '<tr><th>ID</th><th>MÓDULO</th><th>ARTICULO</th><th>RECIBIDO</th><th>PLAZA</th>';
              cabeceras += '<th>USUARIO</th><th>FECHA</th><th>ESTATUS</th><th>EVIDENCIA</th></tr>';
            } else {
              for (let j = 0; j < datos.detalle.length; j++) {
                link = datos.detalle[j].RutaEvidenciaRecepcionNombreArchivo ? `<a href='${datos.detalle[j].RutaEvidenciaRecepcionInputFile}'>${datos.detalle[j].RutaEvidenciaRecepcionNombreArchivo}</a>` : '';
                negritas = Array.isArray(datos.detalle[j].EvidenciaRec) ? `style="font-weight: bold"` : null;
                mensaje += `<tr ${negritas}><td>${datos.detalle[j].IdArticulo}</td>`;
                mensaje += `<td>${datos.detalle[j].Modulo}</td>`;
                mensaje += `<td>${datos.detalle[j].Articulo}</td>`;
                mensaje += `<td>${req.recordset[0].NomPlaza}</td>`;
                mensaje += `<td>${upperText(req.recordset[j].NomRecibio)}</td>`;
                mensaje += `<td>${req.recordset[j].FechaRecibio}</td>`;
                mensaje += `<td>${req.recordset[j].NomEstatus}</td>`;
                mensaje += `<td>${link}</td></tr>`;
              }

              datosTabla = `Tu pedido con el ticket: <b>${req.recordset[0].Folio}</b> `;
              datosTabla += 'fueron recibidos los siguientes articulos';
              datosTabla += '<br /> A continuación, se muestra el pedido detallado:';
              cabeceras = '<tr><th>ID</th><th>MÓDULO</th><th>ARTICULO</th><th>PLAZA</th>';
              cabeceras += '<th>USUARIO</th><th>FECHA</th><th>ESTATUS</th><th>EVIDENCIA</th></tr>';
            }
            console.log(req.recordset[0].Correo)
            const tabla = `<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><p>${datosTabla}</p><table><thead>${cabeceras}</thead><tbody>${mensaje}</tbody></table>`;
            transporter.sendMail({
              from: 'david.silva@fincamex.com.mx', 
              to: req.recordset[0].Correo, 
              subject: 'Recepción de Pedido', 
              text: '', 
              html: tabla
            });

            Promise.resolve(req)
              .then(async (r) => {
                await transaction.commit();
                await resolve('Se ha recibido correctamente')
              })
              .catch(async err => {
                console.log(err);
                await transaction.rollback();
                await reject('Ocurrio un error al enviar el correo')
              });
          } catch(error) {
            console.log(error);
            transaction.rollback();
            reject('Hubo un error al ejecutar el procedimiento almacenado');
          }
        });
      });
      return Promise.resolve(prom)
        .then(r => {
          ctx.response.status = 200;
          ctx.response.message = r;
          return ctx.response;
        })
        .catch(err => ctx.response.badRequest(err));
    } catch (err) {
      return ctx.response.badRequest('Ocurrió un error al guardar en la base de datos');
    }
  },
  autorizarPedido: async(ctx) => {
    try{
      const pool = await poolPromise;
      const datos = ctx.request.body;
      const transaction = await pool.transaction();
      const prom = new Promise((resolve, reject) => {
        transaction.begin(async err  => {
          if(err) reject(err);
          try{
            let datosTabla = '';
            let cabeceras = '';
            let link = '';
            let titulo = '';
            let info = '';
            const detalleType = new sql.Table('PedidoDetalle');
            const archivosType = new sql.Table('PedidoCotizacion');

            detalleType.columns.add('IdDetalle', sql.Int);
            detalleType.columns.add('Autorizado', sql.Int);
            detalleType.columns.add('Importe', sql.Decimal(19,3));
            detalleType.columns.add('Comentarios', sql.VarChar(255));
            detalleType.columns.add('Guia', sql.VarChar(255));
            detalleType.columns.add('Paqueteria', sql.VarChar(255));
            detalleType.columns.add('Evidencia', sql.VarChar(255));
            detalleType.columns.add('NombreArchivo', sql.VarChar(255));

            archivosType.columns.add('Id', sql.Int);
            archivosType.columns.add('IdPedido', sql.Int);
            archivosType.columns.add('IdMongo', sql.VarChar(255));
            archivosType.columns.add('RutaArchivo', sql.VarChar(255));
            archivosType.columns.add('NombreArchivo', sql.VarChar(255));
            archivosType.columns.add('IdCotizacion', sql.Int);

            let mensaje = '';
            for (let j = 0; j < datos.cotizaciones.length; j++) {
              archivosType.rows.add(
                j+1,
                datos.idPedido,
                datos.cotizaciones[j].idMongo,
                datos.cotizaciones[j].url,
                datos.cotizaciones[j].nombreArchivo,
                datos.cotizaciones[j].IdCotizacion || null
              );
            }
            for (let i = 0; i < datos.detalle.length; i+=1) {
              detalleType.rows.add(
                datos.detalle[i].IdDetalle,
                datos.detalle[i].AutorizadoInput,
                datos.detalle[i].ImporteInput,
                datos.detalle[i].ComentariosInput,
                datos.detalle[i].GuiaInput,
                datos.detalle[i].PaqueteriaInput,
                datos.detalle[i].InformacionEnvioInputFile,
                datos.detalle[i].InformacionEnvioNombreArchivo,
              );
              
              if(datos.idEstatus === 12){
                mensaje += `<tr><td>${datos.detalle[i].IdDetalle}</td>`;
                mensaje += `<td>${datos.detalle[i].Modulo}</td>`;
                mensaje += `<td>${datos.detalle[i].Articulo}</td>`;
                mensaje += `<td>${datos.detalle[i].CantSolicitada}</td>`;
                mensaje += `<td>${datos.detalle[i].AutorizadoInput}</td>`;
                mensaje += `<td>${datos.detalle[i].ImporteInput}</td>`;
                mensaje += `<td>${datos.detalle[i].ComentariosInput || ''}</td></tr>`;
              } else {
                link = datos.detalle[i].InformacionEnvioNombreArchivo ? `<a href='${datos.detalle[i].InformacionEnvioInputFile}'>${datos.detalle[i].InformacionEnvioNombreArchivo}</a>` : '';
                mensaje += `<tr><td>${datos.detalle[i].IdDetalle}</td>`;
                mensaje += `<td>${datos.detalle[i].Modulo}</td>`;
                mensaje += `<td>${datos.detalle[i].Articulo}</td>`;
                mensaje += `<td>${datos.detalle[i].Autorizado}</td>`;
                mensaje += `<td>${datos.detalle[i].GuiaInput ? 
                  datos.detalle[i].GuiaInput : 'Pendiente'}</td>`;
                mensaje += `<td>${datos.detalle[i].PaqueteriaInput ? 
                  datos.detalle[i].PaqueteriaInput : 'Pendiente'}</td>`;
                mensaje += `<td>${link}</td></tr>`;
              }
            }
            const req = await transaction.request()
              .input('IdPedido', sql.Int, datos.idPedido)
              .input('DetalleType', detalleType)
              .input('CotizacionesType', archivosType)
              .input('IdUsuario', sql.Int, datos.idUsuario)
              .input('Comentarios', sql.VarChar(255), datos.comGenerales)
              .execute('proc_autorizarPedido');
              
            if(req.recordset[0].IdEstatus === 8 && !datos.soloCoti){
              datosTabla = `Tu pedido con el folio: <b>${req.recordset[0].Folio}</b> `;
              datosTabla += `fue autorizado por ${upperText(req.recordset[0].NomUsuario)}`;
              datosTabla += '<br /> A continuación, se muestra el pedido detallado:';
              cabeceras = '<tr><th>ID</th><th>MÓDULO</th>';
              cabeceras += '<th>ARTICULO</th><th>PEDIDO</th><th>AUTORIZADO</th>';
              cabeceras += '<th>IMPORTE</th><th>COMENTARIOS</th></tr>';
              titulo = 'Autorización de Pedido';
            } else if(req.recordset[0].IdEstatus === 11 && !datos.soloCoti) {
              datosTabla = `Tu pedido con el folio: <b>${req.recordset[0].Folio}</b> `;
              datosTabla += `fue enviado parcial por ${upperText(req.recordset[0].NomUsuario)}`;
              datosTabla += '<br /> A continuación, se muestra el pedido detallado:';
              cabeceras = '<tr><th>ID</th><th>MÓDULO</th>';
              cabeceras += '<th>ARTICULO</th><th>ENVIADO</th><th>GUIA</th>';
              cabeceras += '<th>PAQUETERÍA</th><th>EVIDENCIA</th></tr>';
              titulo = 'Envío Parcial de Pedido';
            } else if(req.recordset[0].IdEstatus === 13 && !datos.soloCoti){
              datosTabla = `Tu pedido con el folio: <b>${req.recordset[0].Folio}</b> `;
              datosTabla += `fue enviado por ${upperText(req.recordset[0].NomUsuario)}`;
              datosTabla += '<br /> A continuación, se muestra el pedido detallado:';
              cabeceras = '<tr><th>ID</th><th>MÓDULO</th>';
              cabeceras += '<th>ARTICULO</th><th>ENVIADO</th><th>GUIA</th>';
              cabeceras += '<th>PAQUETERÍA</th><th>EVIDENCIA</th></tr>';
              titulo = 'Envío de Pedido';
            }

            if(titulo !== ''){
              const tabla = `<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><p>${datosTabla}</p><table><thead>${cabeceras}</thead><tbody>${mensaje}</tbody></table>`;
              info = transporter.sendMail({
                from: 'david.silva@fincamex.com.mx', 
                to: req.recordset[0].Correo, 
                subject: 'Autorizacion de Pedido', 
                text: '', 
                html: tabla
              });
            }
            // const promesas = [ info, req];
            Promise.resolve(req)
              .then(async (res) => {
                await transaction.commit();
                const msj = res.recordset[0].Mensaje + res.recordset[0].Folio;
                await resolve(msj);
              })
              .catch(async err => {
                console.log(err);
                await transaction.rollback();
                await reject('Ocurrio un error al enviar el correo')
              });
          } catch(error) {
            console.log(error);
            transaction.rollback()
              // .then((r) => resolve(r))
              // .catch(() => reject('Ocurrió un error interno'));
            reject('Hubo un error al ejecutar el procedimiento almacenado');
          }
        });
      });
      return Promise.resolve(prom)
        .then(r => {
          ctx.response.status = 200;
          ctx.response.message = r;
          return ctx.response;
        })
        .catch(err => ctx.response.badRequest(err));
    } catch (err) {
      console.log(err);
      return ctx.response.badRequest('Ocurrió un error al guardar en la base de datos');
    }
  },

  obtenerEstatus: async(ctx) => {
    try {
      const pool = await poolPromise;
      const req = await pool.request();
      const res = await req.execute('proc_obtenerPedidosEstatus');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Hubo un error al obtener los estatus');
    }
  },

  obtenerArticulos : async (ctx) => {
    try{
      const pool = await poolPromise;
      const request = await pool.request();
      const res = await request
        .input('IdAgrupador', ctx.params.idAgrupador)
        .execute('proc_obtenerArticulosAgrupadores');
      
      return res;
    } catch (error) {
      ctx.response.badRequest('Error al obtener los articulos');
    }
  },
  /**
   * Promise to fetch a/an pedidos.
   *
   * @return {Promise}
   */

  obtenerDetalle: async(ctx) => {
    try {
      const plaza = parseInt(ctx.params.plaza);
      let band = false;
      const response = {
        datos: [],
        infoPedido: {
          plaza: '',
          idPedido: null,
          solicitante: '',
          folio: null,
          comentariosGen: '',
        },
        cotizaciones: [],
      };

      const pool = await poolPromise;
      const req = await pool.request();
      const res = await req
        .input('IdPedido', sql.Int, ctx.params.idPedido)
        .execute('proc_obtenerPedidoDetalle');
      if(plaza === 0){
        if(res.recordsets[0][0].IdEstatus === 12){
          response.cabeceras = [
            {
              campo: 'IdArticulo',
              nombre: 'ID',
              options: {
                searchable: true,
              },
            },
            {
              campo: 'Modulo',
              nombre: 'Modulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Articulo',
              nombre: 'Articulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'CantSolicitada',
              nombre: 'Pedido',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'ComentariosSol',
              nombre: 'Comentarios solicitud',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'Existencia',
              nombre: 'Existencia',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Autorizado',
              nombre: 'Autorizado',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Importe',
              nombre: 'Importe',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Comentarios',
              nombre: 'Comentarios',
              options: {
                searchable: false,
              },
            }, 
          ];
        } else if(res.recordsets[0][0].IdEstatus === 8 || res.recordsets[0][0].IdEstatus === 11
          || res.recordsets[0][0].IdEstatus === 13){
          response.cabeceras = [
            {
              campo: 'IdArticulo',
              nombre: 'ID',
              options: {
                searchable: true,
              },
            },
            {
              campo: 'Modulo',
              nombre: 'Modulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Articulo',
              nombre: 'Articulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'CantSolicitada',
              nombre: 'Pedido',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Autorizado',
              nombre: 'Autorizado',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Comentarios',
              nombre: 'Comentarios',
              options: {
                searchable: false,
              },
            }, 
            {
              campo: 'Guia',
              nombre: 'Guía',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'Paqueteria',
              nombre: 'Paquetería',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'InformacionEnvio',
              nombre: 'Evidencia',
              options: {
                searchable: false,
                display: true,
              },
            },
          ];
        } else if(res.recordsets[0][0].IdEstatus === 9){
          response.cabeceras = [
            {
              campo: 'IdArticulo',
              nombre: 'ID',
              options: {
                searchable: true,
              },
            },
            {
              campo: 'Modulo',
              nombre: 'Modulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Articulo',
              nombre: 'Articulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'CantSolicitada',
              nombre: 'Pedido',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Existencia',
              nombre: 'Existencia',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Autorizado',
              nombre: 'Autorizado',
              options: {
                searchable: false,
              },
            },
          ];
        } else {
          response.cabeceras = [
            {
              campo: 'IdArticulo',
              nombre: 'ID',
              options: {
                searchable: true,
              },
            },
            {
              campo: 'Modulo',
              nombre: 'Modulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Articulo',
              nombre: 'Articulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'CantSolicitada',
              nombre: 'Pedido',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Autorizado',
              nombre: 'Autorizado',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Recibido',
              nombre: 'Recibido',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'Importe',
              nombre: 'Importe',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'Comentarios',
              nombre: 'Comentarios',
              options: {
                searchable: false,
              },
            }, 
            {
              campo: 'RutaEvidenciaRecepcion',
              nombre: 'Evidencia',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'InformacionEnvio',
              nombre: 'Información de Envio',
              options: {
                searchable: false,
                display: true,
              },
            } 
          ];
        }
      } else {
        if(res.recordsets[0][0].IdEstatus === 12){
          response.cabeceras = [
            {
              campo: 'IdArticulo',
              nombre: 'ID',
              options: {
                searchable: true,
              },
            },
            {
              campo: 'Modulo',
              nombre: 'Modulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Articulo',
              nombre: 'Articulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'CantSolicitada',
              nombre: 'Pedido',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'ComentariosSol',
              nombre: 'Comentarios solicitud',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'Existencia',
              nombre: 'Existencia',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Autorizado',
              nombre: 'Autorizado',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Comentarios',
              nombre: 'Comentarios',
              options: {
                searchable: false,
              },
            }, 
          ];
        } else if(res.recordsets[0][0].IdEstatus === 9){
          response.cabeceras = [
            {
              campo: 'IdArticulo',
              nombre: 'ID',
              options: {
                searchable: true,
              },
            },
            {
              campo: 'Modulo',
              nombre: 'Modulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Articulo',
              nombre: 'Articulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'CantSolicitada',
              nombre: 'Pedido',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Existencia',
              nombre: 'Existencia',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Autorizado',
              nombre: 'Autorizado',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Comentarios',
              nombre: 'Comentarios',
              options: {
                searchable: false,
              },
            }, 
          ];
        } else if(res.recordsets[0][0].IdEstatus === 8){
          response.cabeceras = [
            {
              campo: 'IdArticulo',
              nombre: 'ID',
              options: {
                searchable: true,
              },
            },
            {
              campo: 'Modulo',
              nombre: 'Modulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Articulo',
              nombre: 'Articulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'CantSolicitada',
              nombre: 'Pedido',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Autorizado',
              nombre: 'Autorizado',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Comentarios',
              nombre: 'Comentarios',
              options: {
                searchable: false,
              },
            }, 
          ];
        } else if(res.recordsets[0][0].IdEstatus === 11 || res.recordsets[0][0].IdEstatus === 13) {
          response.cabeceras = [
            {
              campo: 'IdArticulo',
              nombre: 'ID',
              options: {
                searchable: true,
              },
            },
            {
              campo: 'Modulo',
              nombre: 'Modulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Articulo',
              nombre: 'Articulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'CantSolicitada',
              nombre: 'Pedido',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Autorizado',
              nombre: 'Autorizado',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Comentarios',
              nombre: 'Comentarios',
              options: {
                searchable: false,
              },
            }, 
            {
              campo: 'Guia',
              nombre: 'Guía',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'Paqueteria',
              nombre: 'Paquetería',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'InformacionEnvio',
              nombre: 'Evidencia',
              options: {
                searchable: false,
                display: true,
              },
            },
          ];
        } else {
          response.cabeceras = [
            {
              campo: 'IdArticulo',
              nombre: 'ID',
              options: {
                searchable: true,
              },
            },
            {
              campo: 'Modulo',
              nombre: 'Modulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Articulo',
              nombre: 'Articulo',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'CantSolicitada',
              nombre: 'Pedido',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Autorizado',
              nombre: 'Autorizado',
              options: {
                searchable: false,
              },
            },
            {
              campo: 'Recibido',
              nombre: 'Recibido',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'ComentariosRecepcion',
              nombre: 'Comentarios',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'RutaEvidenciaRecepcion',
              nombre: 'Evidencia',
              options: {
                searchable: false,
                display: true,
              },
            },
            {
              campo: 'InformacionEnvio',
              nombre: 'Información de Envio',
              options: {
                searchable: false,
                display: true,
              },
            }
          ];
        }
      }
      // if(res.recordsets[0][0].IdEstatus === 7){
      //   for (let i = 0; i < response.cabeceras.length; i++) {
      //     if(
      //       [
      //         'Guia', 
      //         'Paqueteria', 
      //         'Existencia',
      //         'Evidencia',
      //         'Comentarios',
      //       ].includes(response.cabeceras[i].campo)){
      //       response.cabeceras.splice(i, 1);
      //       i--;
      //     } 
      //   }
      //   band = true;
      // }else if(res.recordsets[0][0].IdEstatus === 9){
      //   for (let i = 0; i < response.cabeceras.length; i++) {
      //     if(
      //       [
      //         'Guia', 
      //         'Paqueteria', 
      //         'Recibido',
      //         'Evidencia',
      //         'Comentarios',
      //         'ComentariosRecepcion',
      //         'RutaEvidenciaRecepcion',
      //         'InformacionEnvio',
      //         'RutaEvidenciaRecepcion',
      //       ].includes(response.cabeceras[i].campo)){
      //       response.cabeceras.splice(i, 1);
      //       i--;
      //     } 
      //   }
      // }else if(res.recordsets[0][0].IdEstatus === 12){
      //   response.cabeceras = [
      //     {
      //       campo: 'IdArticulo',
      //       nombre: 'ID',
      //       options: {
      //         searchable: true,
      //       },
      //     },
      //     {
      //       campo: 'Articulo',
      //       nombre: 'Articulo',
      //       options: {
      //         searchable: false,
      //       },
      //     },
      //     {
      //       campo: 'Modulo',
      //       nombre: 'Modulo',
      //       options: {
      //         searchable: false,
      //       },
      //     },
      //     {
      //       campo: 'CantSolicitada',
      //       nombre: 'Pedido',
      //       options: {
      //         searchable: false,
      //       },
      //     },
      //     {
      //       campo: 'ComentariosSol',
      //       nombre: 'Comentarios solicitud',
      //       options: {
      //         searchable: false,
      //         display: true,
      //       },
      //     },
      //     {
      //       campo: 'Existencia',
      //       nombre: 'Existencia',
      //       options: {
      //         searchable: false,
      //       },
      //     },
      //     {
      //       campo: 'Autorizado',
      //       nombre: 'Autorizado',
      //       options: {
      //         searchable: false,
      //       },
      //     },
      //     {
      //       campo: 'Comentarios',
      //       nombre: 'Comentarios',
      //       options: {
      //         searchable: false,
      //       },
      //     }, 
      //   ];
      // } else if(plaza !== 1){
      //   for (let i = 0; i < response.cabeceras.length; i++) {
      //     if(
      //       [
      //         'Recibido',
      //         'ComentariosRecepcion',
      //         'RutaEvidenciaRecepcion',
      //         'Existencia',
      //         'InformacionEnvio',
      //       ].includes(response.cabeceras[i].campo)){
      //       response.cabeceras.splice(i, 1);
      //       i--;
      //     } 
      //   }   
      // } else {
      //   for (let i = 0; i < response.cabeceras.length; i++) {
      //     if(
      //       [
      //         'Existencia',
      //         'Evidencia',
      //         'InformacionEnvio',
      //       ].includes(response.cabeceras[i].campo)){
      //       response.cabeceras.splice(i, 1);
      //       i--;
      //     } 
      //   }   
      // }
      for (let j = 0; j < res.recordsets[0].length; j++) {
        if(res.recordsets[0][j].DetalleEstatus === 13)
          band = true;
        if(plaza === 0){
          if(!res.recordsets[0][j].Desactivado){
            const {
              recordsets:{
                [0]:{
                  [j]:{
                    Autorizado,
                    Comentarios,
                    Importe,
                    ...otherProps
                  },
                },
              },
            } = res;
            res.recordsets[0][j] = {
              AutorizadoInput: Autorizado,
              AutorizadoInputLength: (res.recordsets[0][j].CantSolicitada + '').length,
              AutorizadoInputPropiedad: 'AutorizadoInput',
              AutorizadoInputPH: 'Ingrese monto',
              ImporteInput: Importe,
              ImporteInputLength: 20,
              ImporteInputPropiedad: 'ImporteInput',
              ImporteInputPH: 'Ingrese el importe',
              ComentariosInput: Comentarios,
              ComentariosInputLength: 75,
              ComentariosInputPropiedad: 'ComentariosInput',
              ComentariosInputPH: 'Ingrese comentarios',
              ComentariosInputRequerido: false,
              BandComentariosInput: 1,
              ...otherProps
            };
          } 
          if(res.recordsets[0][j].DetalleEstatus !== 9){
            if(res.recordsets[0][j].DetalleEstatus === 13){
              const {
                recordsets:{
                  [0]:{
                    [j]:{
                      Guia,
                      Paqueteria,
                      ...otherProps
                    },
                  },
                },
              } = res;
              res.recordsets[0][j] = {
                GuiaInput: Guia,
                GuiaInputInhabilitado: 1,
                PaqueteriaInput: Paqueteria,
                PaqueteriaInputInhabilitado: 1,
                InformacionEnvioInputFileEliminar: 1,
                ...otherProps
              };
            } else if(res.recordsets[0][j].DetalleEstatus !== 13 || res.recordsets[0][j].DetalleEstatus !== 7){
              const {
                recordsets:{
                  [0]:{
                    [j]:{
                      Guia,
                      Paqueteria,
                      ...otherProps
                    },
                  },
                },
              } = res;
              res.recordsets[0][j] = {
                GuiaInput: Guia,
                GuiaInputPropiedad: 'GuiaInput',
                GuiaInputLength: 75,
                GuiaInputPH: 'Ingrese guía',
                PaqueteriaInput: Paqueteria,
                PaqueteriaInputPropiedad: 'PaqueteriaInput',
                PaqueteriaInputLength: 50,
                PaqueteriaInputPH: 'Ingrese paquetería',
                ...otherProps
              };
            }
          }
        } else {
          if(res.recordsets[0][j].DetalleEstatus === 13 || res.recordsets[0][j].DetalleEstatus === 11){
            const {
              recordsets:{
                [0]:{
                  [j]:{
                    Guia,
                    Paqueteria,
                    RutaEvidenciaEnvioNombreArchivo,
                    InformacionEnvioNombreArchivo,
                    ComentariosRecepcion,
                    Recibido,
                    ...otherProps
                  },
                },
              },
            } = res;
            res.recordsets[0][j] = {
              GuiaInput: Guia,
              GuiaInputInhabilitado: 1,
              PaqueteriaInput: Paqueteria,
              PaqueteriaInputInhabilitado: 1,
              InformacionEnvioInputFileEliminar: 1,
              InformacionEnvioNombreArchivo: RutaEvidenciaEnvioNombreArchivo,
              ComentariosRecepcionInput: ComentariosRecepcion,
              ComentariosRecepcionInputLength: 75,
              ComentariosRecepcionInputPropiedad: 'ComentariosRecepcionInput',
              ComentariosRecepcionInputPH: 'Ingrese comentarios',
              RecibidoInput: Recibido, 
              RecibidoInputLength: (res.recordsets[0][j].Autorizado + '').length,
              RecibidoInputPropiedad: 'RecibidoInput',
              RecibidoInputPH: 'Ingrese cantidad',
              ...otherProps
            };
          }
        }
        if(res.recordsets[0][j].IdEstatus === 7) {
          const {
            recordsets:{
              [0]:{
                [j]:{
                  informacionEnvio,
                  ...otherProps
                },
              },
            },
          } = res;
          res.recordsets[0][j] = {
            informacionEnvioFile: informacionEnvio,
            ...otherProps
          };
        }
      }
      response.datos.push(res.recordsets[0]);
      response.infoPedido.plaza = res.recordsets[0][0].Plaza;
      response.infoPedido.idPedido = res.recordsets[0][0].IdPedido;
      response.infoPedido.folio = res.recordsets[0][0].Folio;
      response.infoPedido.solicitante = res.recordsets[0][0].Solicitante;
      response.infoPedido.guardar = res.recordsets[0][0].Guardar;
      response.infoPedido.idEstatus = res.recordsets[0][0].IdEstatus;
      response.infoPedido.comentariosGen = res.recordsets[0][0].ComentariosGeneral;
      response.infoPedido.titulo = res.recordsets[0][0].Titulo;
      response.infoPedido.recibir = band;
      response.cotizaciones = res.recordsets[1];
      return response;
    } catch (error) {
      return ctx.response.badRequest('Hubo un error al obtener el detalle');
    }
  },

  /**
   * Promise to count pedidos.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('pedidos', params);

    return Pedidos
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an pedidos.
   *
   * @return {Promise}
   */

  add: async (ctx) => {
    try {
      
      const pool = await poolPromise;
      const req = await pool.request();
      const datos = ctx.request.body;
      //const object = datos.reduce((o, a) => Object.assign(o, { [a.ds100]: a }));
      let datosTabla = '';
      let cabeceras = '';
      let mensaje = '';
      const pedido = await req
        .input('IdPlaza', sql.Int, datos.plaza.Id)
        .input('IdSolicitante', sql.Int, datos.IdUsuario)
        .input('IdAutorizo', sql.Int, null)
        .input('IdEstatus', sql.Int, 12)
        .input('IdUsuarioCreacion', sql.Int, datos.IdUsuario)
        .input('IdUsuarioActualizacion', sql.Int, null)
        .input('Comentario', sql.VarChar(255), datos.Comentario)
        .execute('proc_guardarPedido');

      for(const row of datos.rows){
        const req2 = await pool.request();
        await req2
          .input('IdPedido', sql.Int, pedido.recordset[0]['IdPedido'])
          .input('IdArticulo', sql.Int, row.IdArticulo)
          .input('IdEstatus', sql.Int, 12)
          .input('CantidadSolicitada', sql.Decimal, row.Cantidad)
          .input('Precio', sql.Decimal, row.Precio)
          .input('ComentarioSolicitud', sql.VarChar(255), row.Comentario)
          .input('IdUsuarioCreacion', sql.Int, datos.IdUsuario)
          .execute('proc_guardarPedidoDetalle');

        mensaje += `<tr><td>${row.IdArticulo}</td>`;
        mensaje += `<td>${row.Agrupador}</td>`;
        mensaje += `<td>${row.Nombre}</td>`;
        mensaje += `<td>${row.Cantidad}</td>`;
        mensaje += `<td>${datos.Plaza}</td>`;
        mensaje += `<td>${datos.Usuario}</td>`;
      }

      let msj = 'Pedido generado correctamente';
      ctx.response.status = 200;
      ctx.response.message = msj;

      
      
      datosTabla = 'Se realizo un pedido de los siguientes articulos:';
      datosTabla += '<br /> A continuación, se muestra el pedido detallado:';
      cabeceras = '<tr><th>ID</th><th>MÓDULO</th><th>ARTICULO</th><th>CANTIDAD</th><th>PLAZA</th>';
      cabeceras += '<th>USUARIO</th></tr>';


      const tabla = `<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><p>${datosTabla}</p><table><thead>${cabeceras}</thead><tbody>${mensaje}</tbody></table>`;
      let info = '';
      info = transporter.sendMail({
        from: 'soporte.siif@fincamex.com.mx', 
        to: 'eddie.osuna@fincamex.com.mx', 
        subject: 'Recepción de Pedido', 
        text: '', 
        html: tabla
      });

      return ctx.response;
    } catch (error) {
      console.log(error);
      return ctx.response.badRequest('Error al generar el pedido');
    }
  },

  /**
   * Promise to edit a/an pedidos.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Pedidos.associations.map(a => a.alias));
    const data = _.omit(values, Pedidos.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Pedidos.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Pedidos.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an pedidos.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Pedidos.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Pedidos
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Pedidos.associations.map(async association => {
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
   * Promise to search a/an pedidos.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('pedidos', params);
    // Select field to populate.
    const populate = Pedidos.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Pedidos.attributes).reduce((acc, curr) => {
      switch (Pedidos.attributes[curr].type) {
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

    return Pedidos
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
