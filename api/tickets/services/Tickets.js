'use strict';


/**
 * Tickets.js service
 *
 * @description: A set of functions similar to controller's actions to avoid 
 * code duplication.
 */

// Public dependencies.
const _ = require('lodash');
const sql = require('mssql');
const { 
  poolPromise,
  poolPromiseSifWeb,
  poolPromiseServDesarrollo,
} = require('./../../../config/functions/bootstrap');
// const env = process.env.NODE_ENV;

const obtenerConfiguracion = async (IdTicket, pool) => {
  let request = await pool.request();
  return request
    .input('IdTicket', IdTicket)
    .execute('proc_obtenerTicketConfiguracion');
};

const obtenerOpciones = async (IdTicketConfiguracion, pool) => {
  let request = await pool.request();
  return request
    .input('IdTicketConfiguracion', IdTicketConfiguracion)
    .execute('proc_obtenerTicketConfiguracionOpciones');
};

const obtenerTicketsPorEstatus = 
  async (
    IdEstatus, 
    IdEmpleado,
    IdPuesto,
    IdTipo, 
    pool, 
    IdTicket = null
  ) => {
    let request = await pool.request();

    return request
      .input('IdEstatus', IdEstatus)
      .input('IdEmpleado', IdEmpleado)
      .input('IdPuesto', IdPuesto)
      .input('IdTipo', IdTipo)
      .input('IdTicket', IdTicket)
      .execute('proc_obtenerTicketsUsuarioRol');
  };

const obtenerTicket = async(pool, idTicket) => {

  let arreglo = [];
  let IdConfiguracion = null;
  const tickets = await obtenerTicketsPorEstatus(0, 0, 0, 0, pool, idTicket);
  // for(let j = 0; j < tickets.recordset.length; j++){
  //   _.assign(tickets.recordset[j], {'tipoForma' : []});
  //   const datosConf = await obtenerConfiguracion(idTicket, pool);
  //   for(let k = 0; k < datosConf.recordset.length; k++){
  //     IdConfiguracion = datosConf.recordset[k].IdTicketConfiguracion;
  //     const confOpciones = await obtenerOpciones(IdConfiguracion, pool);
  //     _.assign(datosConf.recordset[k], {'opciones': confOpciones.recordset}); 
  //     arreglo.push(
  //       {
  //         'tipoComponenteId' : datosConf.recordset[k].tipoComponenteId, 
  //         'config': datosConf.recordset[k] 
  //       });
  //   } 
    
  //   tickets.recordset[j].tipoForma = arreglo;
  //   arreglo = [];
  // }
  tickets.recordset[0].tipoForma = JSON.parse(tickets.recordset[0].tipoForma);
  return tickets.recordset;

};

module.exports = {

  /**
   * Promise to fetch all tickets.
   *
   * @return {Promise}
   */
  fetchAll: async (ctx) => {
  },

  /**
   * Promise to fetch a/an tickets.
   *
   * @return {Promise}
   */

  fetch: async(ctx) => {
    try{
      const pool = await poolPromise;
      // let pool = await sql.connect(config);
      let arreglo = [];
      
      let request = await pool.request()
        .input('PestañaTipo', ctx.params._id)
        .execute('proc_obtenerTicketEstatus');
      for(let i = 0; i < request.recordset.length; i++){
        const tickets = await obtenerTicketsPorEstatus(
          request.recordset[i].IdEstatus, 
          ctx.params.idEmpleado, 
          ctx.params._id, 
          pool
        );
        for(let j = 0; j < tickets.recordset.length; j++){
        //   _.assign(tickets.recordset[j], {'tipoForma' : []});
        //   const datosConfig = await obtenerConfiguracion(
        //     tickets.recordset[j].IdTicket, 
        //     pool
        //   );
          // for(let k = 0; k < datosConfig.recordset.length; k++){
          //   const configOpciones = await obtenerOpciones(
          //     datosConfig.recordset[k].IdTicketConfiguracion, 
          //     pool
          //   );
          //   _.assign(
          //     datosConfig.recordset[k], 
          //     {'opciones': configOpciones.recordset}
          //   ); 
          //   arreglo.push(
          //     {
          //       'tipoComponenteId' : datosConfig.recordset[k].tipoComponenteId, 
          //       'config': datosConfig.recordset[k] 
          //     });
          // } 
          
          // tickets.recordset[j].tipoForma = arreglo;
          // arreglo = [];
          
          tickets.recordset[j].tipoForma = JSON.parse(tickets.recordset[j].tipoForma);
        }
        _.assign(request.recordset[i], {'tickets': tickets.recordset});
      }
      return request.recordset;
    } catch(err) {
      console.log(err);
      return ctx.response.badRequest('Error al obtener el listado de tickets');
    } 
  },

  /**
   * Promise to count tickets.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('tickets', params);

    return Tickets
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an tickets.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Tickets.associations.map(ast => ast.alias));
    const data = _.omit(values, Tickets.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Tickets.create(data);

    // Create relational data and return the entry.
    return Tickets.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an tickets.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Tickets.associations.map(a => a.alias));
    const data = _.omit(values, Tickets.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Tickets.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Tickets.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an tickets.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Tickets.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Tickets
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Tickets.associations.map(async association => {
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
   * Promise to search a/an tickets.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('tickets', params);
    // Select field to populate.
    const populate = Tickets.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Tickets.attributes).reduce((acc, curr) => {
      switch (Tickets.attributes[curr].type) {
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

    return Tickets
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },
  
  obtenerTicketsPorEmpleado: async(ctx) => {
    try{
      const {
        IdTipo,
        IdEmpleado,
        IdPuesto,
      } = ctx.request.body;
      const pool = await poolPromise;
      let arreglo = [];
      
      let request = await pool.request()
        .input('PestañaTipo', IdTipo)
        .execute('proc_obtenerTicketEstatus');
      for(let i = 0; i < request.recordset.length; i++){
        const tickets = await obtenerTicketsPorEstatus(
          request.recordset[i].IdEstatus, 
          IdEmpleado,
          IdPuesto,
          IdTipo,
          pool
        );
        for(let j = 0; j < tickets.recordset.length; j++){
          tickets.recordset[j].tipoForma = JSON.parse(tickets.recordset[j].tipoForma);
        }
        _.assign(request.recordset[i], {'tickets': tickets.recordset});
      }
      return request.recordset;
    } catch(err) {
      return ctx.response.badRequest('Error al obtener el listado de tickets');
    } 
  },
  cambiarEstatus: async (ctx) => {
    try {
  
      const {
        ticketSelected,
        tipo,
        usuarioAsignado,
      } = ctx.request.body;

      const pool = await poolPromise;
      const req = await pool.request()
        .input('IdTicket',ticketSelected)
        .input('Tipo',tipo)
        .input('UsuarioSeleccionado',usuarioAsignado)
        .execute('proc_cambiarEstatusTicket_Nuevo')

      ctx.response.status = 200;
      return ctx.response;
    } catch (error) {
      return ctx.response.badRequest('Error Al Cambiar Estatus');
    }
  },
  autorizarTicket: async (ctx) => {
    try {
      const {
        ticketSelected,
      } = ctx.request.body;

      const pool = await poolPromise;
      const res = await pool.request() 
        .input('IdTicket', ticketSelected)
        .execute('proc_autorizarTicket');

      ctx.response.status = 200;
      return ctx.response; 
    } catch (error) {
      return ctx.response.badRequest('Error Al Autorizar Ticket');
    }
  },
  obtenerPlazasUsuario: async (ctx) => {
    try {
      
      const {
        Usuario,
        IdTicket,
      } = ctx.request.body;
    
      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request() 
        .input('IdUsuario', Usuario)
        .input('IdTicket', IdTicket)
        .execute('proc_obtenerPlazasUsuario');

      return res.recordsets[0];
    } catch (error) {
      return ctx.response.badRequest('Error Al Obtener Plazas');
    }
  },
  obtenerComentarios: async (params) => {
    
    try {
      const pool = await poolPromise;
      const res = await pool.request() 
        .input('IdTicket', params._id)
        .execute('proc_obtenerComentariosTickets');
      if(!res){
        return null;
      }
      return res.recordsets[0];
    } catch (error) {
      return error;
    }
  },
  guardarEtapa: async (ctx) => {
    try {
      
      const {
        IdEtapa,
        configuracion,
      } = ctx.request.body;

      const pool = await poolPromiseServDesarrollo;
      const res = await pool.request() 
        .input('IdEtapa', IdEtapa)
        .input('Configuracion',sql.VarChar(sql.MAX), JSON.stringify(configuracion)) 
        .execute('proc_guardarEtapa');

      ctx.response.status = 200;
      return ctx.response; 
    } catch (error) {
      return ctx.response.badRequest('Error Al Obtener Plazas');
    }
  },
  obtenerTicketEspecifico: async (params) => {
    
    try {
      const pool = await poolPromise;
      const res = await pool.request() 
        .input('IdTicket', params._id)
        .execute('proc_obtenerTicketEspecifico');
      if(!res){
        return null;
      }
      return res.recordsets[0];
    } catch (error) {
      return error;
    }
  },

  obtenerDifusiones: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdDepartamento', ctx.params._id)  
        .input('IdEmpleado', ctx.params.EmpleadoId)
        .execute('proc_ObtenerDifusionesPorUsuario');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener las difusiones');
    }
  },

  cambiarEstatusDifusion: async (ctx) => {
    try{
      const {
        DepartamentoId,
        IdDifusion,
        IdEmpleado,
      } = ctx.request.body;
      const pool = await poolPromise;
      let res = await pool.request()
        .input('IdDepartamento', sql.Int, DepartamentoId)
        .input('IdDifusion', sql.Int, IdDifusion)
        .input('IdEmpleado', sql.Int, IdEmpleado)
        .execute('proc_cambiarEstatusDifusiones');
      return res;
    }
    catch(error){
      return ctx.response.badRequest('Error');
    }
  },
  datosIndicadoresDesempenioOCKyOE: async (ctx) => {
    try {
      const {
        SemanaRetail,
        AnioCorte,
        IdPlaza,
        IdPlantilla,
      } = ctx.request.body;
      const pool = await poolPromise;
      let res = await pool.request()
        .input('SemanaRetail', sql.Int, SemanaRetail)
        .input('AnioCorte', sql.Int, AnioCorte)
        .input('IdPlaza', sql.Int, IdPlaza)
        .input('IdPlantilla', sql.Int, IdPlantilla)
        .execute('proc_obtenerDatosIndicadorDesempenio');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error');
    }
  },
  datosGraficaDesempenioPuesto: async (ctx) => {
    try {
      const {
        SemanaRetail,
        AnioCorte,
        IdPlaza,
        IdPlantilla,
      } = ctx.request.body;
      const pool = await poolPromise;
      let res = await pool.request()
        .input('SemanaRetail', sql.Int, SemanaRetail)
        .input('AnioCorte', sql.Int, AnioCorte)
        .input('IdPlaza', sql.Int, IdPlaza)
        .input('IdPlantilla', sql.Int, IdPlantilla)
        .execute('[proc_obtenerGraficaDesempenioPuesto]');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error');
    }
  },
  datosGraficaDesempenioProceso: async (ctx) => {
    try {
      const {
        SemanaRetail,
        AnioCorte,
        IdPlaza,
        IdPlantilla,
      } = ctx.request.body;
      const pool = await poolPromise;
      let res = await pool.request()
        .input('SemanaRetail', sql.Int, SemanaRetail)
        .input('AnioCorte', sql.Int, AnioCorte)
        .input('IdPlaza', sql.Int, IdPlaza)
        .input('IdPlantilla', sql.Int, IdPlantilla)
        .execute('proc_obtenerGraficaDesempenioProceso');
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error');
    }
  },
  datosCombosIndicadores: async (ctx) => {
    try {
      const {
        Dato,
        IdPlaza,
        Anio,
        IdPlantilla,
        IdDepartamento,
      } = ctx.request.body;
      const pool = await poolPromise;
      let res = await pool.request()
        .input('Dato', Dato)
        .input('IdPlaza', sql.Int, IdPlaza)
        .input('Anio', sql.Int, Anio)
        .input('IdPlantilla', sql.Int, IdPlantilla)
        .input('IdDepartamento',sql.Int,IdDepartamento)
        .execute('proc_obtenerDatosCombosIndicadores');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error');
    }
  },

  insertarComentarios: async (ctx) => {
    try {
      const params = ctx.request.body;
      const pool = await poolPromise;
      const req = await pool.request();
      
      for (let key in params) {
        req.input(key,params[key]);
      }
      const res = await req.execute('proc_insertarComentariosTickets');
      return res;
    } catch (error) {
      return ctx.response.badRequest('Error Al Insertar Comentario');
    }
    
  },
  obtenerDifusionSeleccionada: async (ctx) => {
    const pool = await poolPromise;
    const res = await pool.request() 
      .input('IdDifusion', ctx.params._id)
      .execute('proc_obtenerDifusiones');
    
    return res.recordsets[0];
  },
  obtenerEmpleados: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdDepartamento', ctx.params._id)
        .execute('proc_obtenerEmpleadosPorDepartamento');
      return res.recordsets[0];
    } catch (err) {
      return ctx.response.badRequest('Error Al Obtener Los Empleados');
    }
  },
  obtenerImagenUrl: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdUsuario', ctx.params._id)
        .execute('proc_obtenerImagenUrl');
      return res.recordset;
    } catch (err) {
      return ctx.response.badRequest('Error Al Obtener El Url');
    }
  },
  obtenerRelacion: async (ctx) => {
    try{
      const {
        IdCatalogo,
      } = ctx.request.body;
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdCatalogo', IdCatalogo)
        .execute('proc_obtenerRelacionesEntreCatalogos');
      return res.recordsets[0];
    } catch(err) {
      const msj = 'Error Al Obtener La Relación De Un Catalogo';
      return ctx.response.badRequest(msj);
    }
  },
  estatusEnviar: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdTicket', ctx.params._id)  
        .execute('proc_ObtenerEstatusTicket');
      return res.recordsets[0];
    } catch(err) {
      const msj = 'Error Al Obtener Estatus para Enviar Mensaje';
      return ctx.response.badRequest(msj);
    }
  },

  obtenerPrioridades: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        .execute('proc_obtenerPrioridades');
      return res.recordset;
    } catch (err) {  
      return ctx.response.badRequest('Error Al Obtener Las Prioridades');
    }
  },
  //Asi hacer lo de notificacionesPorDepartamento
  insertarDifusiones: async (ctx) => {
    try {
      const params = ctx.request.body;
      const pool = await poolPromise;
      const departamentos = params.DepartamentoId;
      const req = await pool.request(); 
      for (let index = 0; index < departamentos.length; index++) {
        req.input('Asunto', params.Asunto)
          .input('Mensaje', params.Mensaje)
          .input('UrlArchivo', params.UrlArchivo)
          .input('EmpleadoEnvia', params.EmpleadoEnvia)
          .input('IdDepartamento', departamentos[index]);
        const res = await req.execute('proc_insertarDifusiones');  
      }
      return ctx.response;
    } catch (error) {
      return ctx.response.badRequest('Error Al Insertar Comentario');
     
    }
  },
  send: async (ctx) => {
    try{
      const datosTicket = ctx.request.body;
      const forma = datosTicket.datos.tipoForma;
      let PlazaSeleccionada = null;

      let response = {
        ticket:0,
        message: '',
        status:0,
      };

      for(let i=0; i<forma.length; i++){
        if(forma[i].tipoComponenteId === 6){
          if(forma[i].config.relaciones[0].Nombre === 'Plazas'){
            for(let x=0; x< forma[i].config.itemsCatalogo.length; x++){
              if(forma[i].config.itemsCatalogo[x].Id === forma[i].config.value)
                PlazaSeleccionada = forma[i].config.itemsCatalogo[x].IdPlazaReal;
            }
          }
        }
      }

      const pool = await poolPromiseServDesarrollo;
      const req = await pool.request(); 
      const res = await req
        .input('Nombre', sql.VarChar(255), datosTicket.datos.Nombre)
        .input('IdDepartamento', sql.Int, datosTicket.datos.IdDepartamento)
        .input('IdPriorizador', sql.Int, datosTicket.datos.IdPriorizador)
        .input('IdRolAsignado', sql.Int, datosTicket.datos.IdRolAsignado)
        .input('IdUsuarioEnvia', sql.Int, datosTicket.datos.idUsuario)
        .input('IdTipoTicket', sql.Int, datosTicket.datos.IdTipo)
        .input('TiempoRespuesta', sql.Int, datosTicket.datos.TiempoRespuesta)
        .input('TiempoCierre', sql.Int, datosTicket.datos.TiempoCierre)
        .input('Estatus', sql.Bit, 1)
        .input('Configuracion', sql.VarChar(sql.MAX), JSON.stringify(forma))
        .input('IdPlantilla',sql.Int,datosTicket.datos.IdPlantilla)
        .input('PlazaUsuario',sql.Int,datosTicket.PlazaUsuario)
        .input('PlazaSeleccionada',sql.Int,PlazaSeleccionada)
        .execute('proc_guardarTicketNuevo');
      
      let msj = 'Ticket generado correctamente con el folio: ';
      msj += `${res.recordset[0].IdTicket}`;
      // ctx.response.status = 200;
      // ctx.response.message = msj;
      response.message = msj;
      response.ticket= res.recordset[0].IdTicket;
      response.status=200;
      // ctx.response.ticket=res.recordset[0].IdTicket;
      return response; 
    } catch (err) {
      return ctx.response.badRequest('Error Al Enviar Ticket');
    }
  },
  asignarUsuario: async(ctx) => {
    const idTicket = ctx.params.idTicket;
    const datos = ctx.request.body;
    try{
      const pool = await poolPromise;
      await pool.request()
        .input('IdTicket', sql.Int, _.toSafeInteger(idTicket))
        .input('IdEmpleado', sql.Int, _.toSafeInteger(datos.idEmpleado))
        .input('IdPrioridad', sql.Int, datos.idPrioridad)
        .execute('proc_asignarTicketUsuario');
      ctx.response.status = 200;
      ctx.response.message = 'Ticket Asignado Correctamente!';
      return ctx.response;
    } catch (err) {
      return ctx.response.badRequest('Error Al Asignar Usuario');
    }
  },
  obtenerTicketsPorDepartamento: async(ctx) => {
    try{
      const response = {
        headers: [
          'Folio',
          {
            name: 'Descripcion',
            label: 'Descripción',
          },
          {
            name: 'EmpleadoEnvia',
            label: 'Empleado Envía',
          },
          'Prioridad',
          {
            name: 'EmpleadoAsignado',
            label: 'Empleado Asignado',
          },
          'Estatus',
          {
            name: 'FechaFin',
            label: 'Fecha Fin',
          },
          {
            name: 'options',
            label: ' ',
            options: {
              sort : false,
              filter: false,
              searchable: false,
            }
          },
        ],
        data: [],
      };
      const idDepartamento = ctx.params.idDepartamento;
      const pool = await poolPromise;
      const datos = await pool.request()
        .input('IdDepartamento', sql.Int, _.toSafeInteger(idDepartamento))
        .execute('proc_obtenerTicketsPorDepartamento');
      response.data.push(datos.recordset);
      return response;
    } catch (err) {
      return ctx.response.badRequest('Error Al Obtener Los Tickets');
    }
  },
  obtenerTicket: async (ctx) => {
    try{
      const pool = await poolPromise;
      // let pool = await sql.connect(config);
      const ticket = await obtenerTicket(pool, ctx.params.idTicket);
      return ticket;
    } catch(err) {
      return ctx.response.badRequest('Error al obtener el listado de tickets');
    } 
  },

  obtenerPlazas: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        .execute('proc_obtenerPlazasHabilitadas');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener las plazas');
    }
  },

  obtenerTodasPlazas: async (ctx) => {
    
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        .execute('proc_obtenerPlazas');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener las plazas');
    }
  },

  obtenerRoles: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        // .input('DepartamentoId', ctx.params._id)  
        // .input('IdEmpleado', ctx.params.EmpleadoId)
        .execute('proc_obtenerPuestos');        
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los roles');
    }
  },
  obtenerCatalogos: async (ctx) => {
    try {
      const pool = await poolPromise;
      let res = await pool.request().execute('proc_obtenerCatalogoClasificadores');
      return res.recordset;

    } catch (error) {
      return ctx.response.badRequest('Error');
    }
  },
  obtenerItemsCatalogos: async (ctx) => {
    try {
      const {
        Tipo,
        Empresa,
        Plaza,
        Desarrollo,
        Etapa,
        CC,
        Relacionado,
        IdCatalogo
      } = ctx.request.body;

      const pool = await poolPromiseServDesarrollo;
      let res = await pool.request()
        .input('Tipo',Tipo)
        .input('Empresa',Empresa)
        .input('Plaza',Plaza)
        .input('Desarrollo',Desarrollo)
        .input('Etapa',Etapa)
        .input('CC',CC)
        .input('Relacionado',Relacionado)
        .input('IdCatalogo',IdCatalogo)
        .execute('proc_obtenerCatalogoIndicado');
      return res.recordsets[0];
    } catch (error) {
      return ctx.response.badRequest('Error');
    }
  },
  obtenerItemsCatalogos2: async (ctx) => {
    try {
      let {
        procedimiento,
        parametros,
      } = ctx.request.body;
      const pool = await poolPromise;
      let res = await pool.request()
        .input('Parametros',parametros)
        .execute(`${procedimiento}`);
      return res.recordsets;
    } catch (error) {
      return ctx.response.badRequest('Error');
    }
  },
  obtenerUsuariosPlaza: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        .input('IdPlaza', ctx.params._id)  
        // .input('IdEmpleado', ctx.params.EmpleadoId)
        .execute('proc_obtenerEmpleadosPorPlaza');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los roles');
    }
  },
  
  obtenerFecha: async (ctx) => {
    try{
      const pool = await poolPromise;
      const res = await pool.request()
        .execute('plng_obtenerFechaHora');
      return res.recordsets[0];
    } catch(err) {
      return ctx.response.badRequest('Error Al obtener los roles');
    }
  },

  cambiarEstatusNotificaciones: async (ctx) => {
   
    try{
      const {
        idUsuario,
        idDepartamento,
      } = ctx.request.body;
      const pool = await poolPromise;
      // const pool = await poolPromise;
      const res = await pool.request()
        .input('IdUsuario', idUsuario)
        .input('IdDepartamento', idDepartamento)
        .execute('proc_cambiarEstatusNotificaciones');
      return res;
      
    } catch (err) {
      return ctx.response.badRequest('Error');
    }
  },
  obtenerEstatusTicketsEtapas: async(ctx) => {
    try {
     
      const pool = await poolPromise;
      const req = await pool.request();
    
      const res = await req
        .input('IdTicket', ctx.params._id)
        .execute('proc_obtenerEstatusTicketEtapas');
      return res.recordset;
    } catch (error) {
      return ctx.response.badRequest('Error al obtener las plantillas');
    }
  },
};
