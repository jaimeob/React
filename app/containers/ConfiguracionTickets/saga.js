import { call, put,takeLatest,select } from 'redux-saga/effects';              
import {parseInt} from 'lodash';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';

import {
  getTiposServicios,
  getDepartamentos,
  getPriorizadores,
  getPuestos,
  savePlantillaTickets,
  obtenerCatalogos,
  getRelacionesApi,
  eliminarEtapaApi,
  cambiarEstatusApi,
} from './api';


// DEPARTAMENTOS  y TIPO SERVICIOS
export function* getDatos() {
  try {

    const tipoServicios = yield call((getTiposServicios))
    const departamentos = yield call((getDepartamentos))
    const puestos = yield call((getPuestos))

    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_TIPOS_SERVICIOS', tipoServicios,
    });

    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_DEPARTAMENTOS', departamentos,
    });

    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_PUESTOS', puestos,
    });

  } catch (err) {
    yield put({
      // type: ('APP/CONTAINER/CONFIGURACIONTICKETS/REQUEST_DEPARTAMENTOS_FAILED', err),
    })
  }
}

export function* getPriorizador(action) {
  try {
    const priorizadores = yield call(getPriorizadores,action.event)
    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_PRIORIZADORES', priorizadores,
    });
  } catch (err) {
    yield put({
      // type: ('APP/CONTAINER/CONFIGURACIONTICKETS/REQUEST_DEPARTAMENTOS_FAILED', err),
    })
  }
}

export function* funObtenerCatalogos(){
  const {
    status,
    data,
  } = yield call(obtenerCatalogos);

  if(status === 200){
    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_CATALOGOS_ACTION',
      data,
    }); 
  }else{
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener catalogos!',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}
export function* obtenerDatosCatalogo(action){
  const {
    index,
    name,
    value,
    divSelecionado,
  } = action;

  const {
    status,
    data,
  } = yield call(getRelacionesApi,value);

  if(status === 200){
    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_VALUE_SELECTS_CATALOGOS_ACTION',
      data,
      index,
      name,
      value,
      divSelecionado,
    }); 
  }else{
    yield put(
      enqueueSnackbar({
        message: 'Error al obtener catalogos!',
        options: {
          variant: 'warning',
        },
      })
    );
  }
}



// METODO DE GUARDADO --------------------------------------------------------------------------------------------------------------------

export function* guardarConfigTicket() {
  try {
    let etapas =[]

    // configuracionTickets:{
    //   configuracion,
    //   etapas,
    //   configuracionCampos,
    // },

    // data:configuracion,
    // etapas:etapas !== undefined ? this.props.location.state.datos.datosEtapas.etpasTemporales : [],
    // configuracionCampos:configuracionCampos !== undefined ? configuracionCampos : [],

    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONTICKETS/VALIDAR_CAMPOS_ACTION',
    });

    const camposInvalidos = yield select((state) => state.getIn(['configuracionTickets','configuracion','camposInvalidos']));
    const arreglo = yield select((state) => state.getIn(['configuracionTickets','configuracion']));
    const data = JSON.parse(JSON.stringify(arreglo)) 
    
    // -------------------------------------
    if (camposInvalidos){
    // if(validacion === true || validacionHorarios === true){      
    }else{
      
      
      if(data.etapas.length > 0){
        let tiempos = []
        data.etapas.forEach(item => {
          
          item.reglas.forEach(regla => {
            if(regla.config){
              item.reglasArray =  regla.config 
              item.reglaEtapa  = item.reglasArray.map(objeto => ({
                nombre: item.reglas[0].nombre ,
                condicion : parseInt(objeto.condicion),
                campo : objeto.campo,
                valor : objeto.valor,
                valores : parseInt(objeto.valores),
                campoEspecial : objeto.campoEspecial,
                componentes : JSON.stringify(objeto.componentes),
                nombreEtapa : objeto.nombreEtapa,
              }))   
            }
          })
          if(item.reglaEtapa){
            if(item.reglaEtapa[0].campo ==="" || item.reglaEtapa[0].campo===undefined){
              item.reglaEtapa = []
            }        
          }

          // TIEMPOS ------------------------------------------------------------------------------------------------------------------------
        
          if(item.tiempos[0].HoraInicio){
            tiempos =[{
              idTiempo: item.tiempos[0].IdTiempo === undefined ? null : item.tiempos[0].IdTiempo  , 
              horaInicio: item.tiempos[0].HoraInicio === undefined ?  null : item.tiempos[0].horaInicio ,
              horaFin: item.tiempos[0].HoraFin === undefined ?  null :item.tiempos[0].horaFin,
              SLA: item.tiempos[0].SLA,
              
            }]

          }else{
          // eslint-disable-next-line prefer-destructuring
            tiempos = item.tiempos
          }

          if(tiempos[1].horaFin === ""){
            tiempos = [tiempos[0]]
          }


          if(item.rolUsuarioSelected === undefined){
            item.rolUsuarioSelected = {}
            item.rolUsuarioSelected.id =item.IdRol || item.IdUsuario
          }

          
          if(item.reglaEtapa.length > 0){
            if(item.reglaEtapa[0].campo==="")
            {
              item.reglaEtapa = []
            }
          }

          if(item.rolUsuarioSelected){
            if(item.rolUsuarioSelected.id){
              item.rolUsuarioSelected = item.rolUsuarioSelected.id
            }
          }
          
          if(item.configuracion.componentes === undefined){
            item.configuracion.componentes = item.configuracion
          }

          let configVacia = false
          item.configuracion.componentes.forEach(ob => {
            if(ob.tipoComponenteId === 0 && ob.config.value === "" && ob.config.longitud === ""){
              configVacia = true
            }
          })

          if(configVacia === true ){
            item.configuracion = undefined
          }

        
          const etapa = { 
            nombre: item.Etapa || item.NombreEtapa, 
            idPlaza: item.IdPlaza,
            idPlazaDestino: item.plazaDestinoSeleccionada.id,
            orden:  item.IdDependencia === ""  ? 0 : item.IdDependencia +1,

            idRol: item.IdRol || item.Responsable === "No Aplica" ? item.rolUsuarioSelected : null,  //

            // eslint-disable-next-line no-nested-ternary
            idUsuario: item.Puesto ==="No Aplica" ? item.rolUsuarioSelected : null,
            // idUsuario: null,
            // eslint-disable-next-line no-nested-ternary
            cancelar: item.permitirCancelacion === true ? 1 :0 || item.OpcionCancelar === true ? 1:0,
            // eslint-disable-next-line no-nested-ternary
            seguimiento:item.requiereSeguimiento === true ? 1 : 0 || item.OpcionSeguimiento === true ? 1:0,
            reglas:  item.reglaEtapa !== undefined? item.reglaEtapa  : [],
         
            tiempos: tiempos !== undefined ? tiempos : [],
            configuracion: item.configuracion !==undefined ? JSON.stringify(item.configuracion.componentes) :  JSON.stringify([]),
            catalogos: [],
          }
          etapas.push(etapa)
        });
  
      }
    
      const itemCierreRespuesta =  parseInt(data.selectionCierreRespuesta)
      const itemTiempoRespuesta = parseInt(data.selectionTiempoRespuesta)
      
      // SI EL CHECK DE ETAPAS ESTA O NO SELECCIONADO
      if(data.etapasCheck === false){
        etapas = []
      }
      console.log(data,"CORONAO");
      
      const ticketData={
        nombre:data.selectionServicio,
        tipoForma:data.componentes,
        departamentos:data.selectionDepartamento[0].value,
        tipostickets:data.selectionTipo,
        idPuesto:data.selectionPuesto !== "" ?  data.selectionPuesto : null,
        idPlantilla:data.idPlantilla !== "" ? data.idPlantilla : 0,
        autorizacion:data.autorizacion === true ? 1 :0,
        seguimiento:data.seguimiento === true ? 1 :0,
        cierreRespuesta: data.tipoCierreRespuesta === 'dias' ? itemCierreRespuesta * 24 : itemCierreRespuesta, // poner      
        tiempoRespuesta : data.tipoTiempoRespuesta === 'dias' ? itemTiempoRespuesta * 24 : itemTiempoRespuesta || data.selectionTiempoSLA,
        tipoCierreRespuesta:data.tipoCierreRespuesta, // poner
        tipoTiempoRespuesta:data.tipoTiempoRespuesta, // poner
        estatus:true,
        priorizador:data.selectionPrioriza !=="" ? data.selectionPrioriza : null,
        etapas:etapas !== undefined ? etapas : [], 
        catalogos: [],
        permisosPuestos: data.selectionPermisosPuesto,
        tieneEtapas : etapas.length > 0 ? 1 : 0,
      }
      console.log(ticketData,'GUARDADOOOO ------------------------------------------------------------------');
      
      const  ticket = yield call(savePlantillaTickets,ticketData)
        
      console.log(ticket,"TICKET YA GUARDADOOO");
      if(ticket.status === 200){
        yield put(
          enqueueSnackbar({
            message: 'Guardado con éxito.',
            options: {
              variant: 'success',
            },
          })
        );
        yield put({
          type: ('APP/CONTAINER/CONFIGURACIONTICKETS/REDIRIGIR_LISTADOTICKETS'),
        })

      }else{      
        enqueueSnackbar({
          message: 'Hubo un error al guardar.',
          options: {
            variant: 'error',
          },
        })
      }
      //-------------
    }
  } catch (err) {
    yield put({
    })
  }
}
// ----------------------------------/////////////////////////////////////////////////////////////

// METODO DE ACTUALIZAR ----------------------------------///////////////////////////////////////////////////////////////
export function* actualizarTicket() {
  try {
    
    const etapasCheck = yield select((state) => state.getIn(['configuracionTickets','configuracion','etapasCheck']));
    if(etapasCheck ===false || etapasCheck ===undefined ){
      const arreglo = yield select((state) => state.getIn(['configuracionTickets','configuracion']));
      const data = JSON.parse(JSON.stringify(arreglo)) 
      // eslint-disable-next-line no-plusplus
      for(let i=0;i < data.etapas.length; i++){
        
        if(data.etapas[i].Etapa !=="Etapa Verificacion De Resultado"){
          const {
            status:exito,
          } = yield call (cambiarEstatusApi,data.etapas[i].IdEtapa);
          if(exito===200){
            console.log('Etapa borrada con exito');
          }
        }
      }

    }

    
    const etapasB = yield select((state) => state.getIn(['configuracionTickets','configuracion','etapasParaBorrar']));
    let etapasParaBorrar = '' 
    if(etapasB !== undefined){
      etapasParaBorrar = JSON.parse(JSON.stringify(etapasB)) 
    }
    // const etapasParaBorrar = JSON.parse(JSON.stringify(etapasB)) 
    // console.log(etapasParaBorrar);

    const etapas =[]
    // console.log(etapas);
    const idsEtapasBorrar =[]
    
    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONTICKETS/VALIDAR_CAMPOS_ACTION',
    });

    const camposInvalidos = yield select((state) => state.getIn(['configuracionTickets','configuracion','camposInvalidos']));
    const arreglo = yield select((state) => state.getIn(['configuracionTickets','configuracion']));
    const data = JSON.parse(JSON.stringify(arreglo)) 
    
    if (camposInvalidos){
    // if(validacion === true || validacionHorarios === true){  
      console.log('CAMPOS INVALIDOS');
      
    }else{
      if(data.etapas.length > 0){
        let tiempos = []
        data.etapas.forEach((item) => {
          
          // ----REGLAS-------------------------------------------------------------------------------------------------------------------------------------------------
          if(item.reglas.length > 0) {
            item.reglas.forEach(regla => {          
              
              // FORMATEO
              if(regla.IdCampo !== ""){
                item.reglasArray =  item.reglas
                item.reglaEtapa  = item.reglasArray.map(objeto => ({
                  nombre: item.reglas[0].Nombre ,
                  condicion : objeto.IdCondicion,
                  campo : objeto.IdCampo,
                  valor : objeto.Valor,
                  valores : objeto.Valores,
                  idEtapa : objeto.IdEtapa,
                  idRegla : objeto.IdRegla,
                  campoEspecial : objeto.campoEspecial,
                  componentes : JSON.stringify(objeto.componentes),
                  nombreEtapa : objeto.nombreEtapa,
                }))       
              }              
    
              if(regla.config){
                item.reglasArray =  regla.config
                item.reglaEtapa  = item.reglasArray.map(objeto => ({
                  nombre: item.reglas[0].nombre ,
                  condicion : parseInt(objeto.condicion),
                  campo : objeto.campo,
                  valor : objeto.valor,
                  valores : parseInt(objeto.valores),
                  campoEspecial : objeto.campoEspecial,
                  componentes : JSON.stringify(objeto.componentes),
                  idEtapa : objeto.IdEtapa,
                  idRegla:objeto.IdRegla,
                  nombreEtapa : objeto.nombreEtapa,
                })) 

                item.reglaEtapa = item.reglaEtapa[0].campo ==="" ?  [] : item.reglaEtapa
              }else{
                item.reglasArray = []
              }
            })
            if(item.reglaEtapa.length > 0){
              if(item.reglaEtapa[0].campo ==="" || item.reglaEtapa[0].campo===undefined){
                item.reglaEtapa = []
              }
            }
          }
          
          // ---------------------------------------------------------------------------------------------------------------------------------------------------------
          
          // TIEMPOS -------------------------------------------------------------------------------------------------------------------------------------------------
          if(item.tiempos.length > 0){
            tiempos =[{
              idTiempo:  item.tiempos[0].idTiempo  , 
              horaInicio: item.tiempos[0].horaInicio ,
              horaFin: item.tiempos[0].horaFin,
              SLA: item.tiempos[0].SLA,
              idEtapa: item.tiempos[0].idTiempo === undefined ? null :item.IdEtapa,
            }]
          }
          if(item.tiempos.length > 1){
            if(item.tiempos[1].SLA > 0){ 
              tiempos =[{
                idTiempo:  item.tiempos[0].idTiempo  , 
                horaInicio: item.tiempos[0].horaInicio ,
                horaFin: item.tiempos[0].horaFin,
                SLA: item.tiempos[0].SLA,
                idEtapa: item.tiempos[0].idTiempo === undefined ? null :item.IdEtapa,
              },
              {
                idTiempo:  item.tiempos[1].idTiempo  , 
                horaInicio: item.tiempos[1].horaInicio ,
                horaFin: item.tiempos[1].horaFin,
                SLA: item.tiempos[1].SLA,
                idEtapa: item.tiempos[1].idTiempo === undefined ? null :item.IdEtapa,
              },
              ]
            }else{
              tiempos =[{
                idTiempo:  item.tiempos[0].idTiempo  , 
                horaInicio: item.tiempos[0].horaInicio ,
                horaFin: item.tiempos[0].horaFin,
                SLA: item.tiempos[0].SLA,
                idEtapa: item.tiempos[0].idTiempo === undefined ? null :item.IdEtapa,
              }]
            }
          }
          
          // -------------------------------------------------------------------------------------------------------------------------------------------------------------
          if(item.rolUsuarioSelected === undefined){
            item.rolUsuarioSelected = {}
            item.rolUsuarioSelected.id =item.IdRol || item.IdUsuario
          }

          if(item.rolUsuarioSelected){    
            if(item.rolUsuarioSelected.id){
              item.rolUsuarioSelected = item.rolUsuarioSelected.id
            }
          }

          if(item.plazaDestinoSeleccionada){    
            if(item.plazaDestinoSeleccionada.id){
              item.plazaDestinoSeleccionada = item.plazaDestinoSeleccionada.id
            }
          }
          if(item.configuracion.componentes)
          {
            item.configuracion  =  item.configuracion.componentes
          }

          if(item.IdUsuario){
            if(item.IdUsuario.id){
              item.IdUsuario = item.IdUsuario.id
            }
          }

          if(item.IdUsuario > 0 ){
            item.rolUsuarioSelected =null
          }
          
          let configVacia = false
          item.configuracion.forEach(ob => {
            if(ob.tipoComponenteId === 0 && ob.config.value === "" && ob.config.longitud === ""){
              configVacia = true
            }
          })

          if(configVacia === true){
            item.configuracion = [] 
          }
          
          const etapa = { 
            idEtapa:tiempos[0].idTiempo === undefined ? null : item.IdEtapa,
            nombre: item.Etapa || item.NombreEtapa, 
            idPlaza: item.IdPlaza,
            idPlazaDestino: item.plazaDestinoSeleccionada,
            orden: item.IdDependencia = item.IdDependencia === "" ? 0 :item.IdDependencia + 1,

            idRol: item.rolUsuarioSelected !== null ? item.rolUsuarioSelected: null,  //
            idUsuario: item.rolUsuarioSelected ===undefined ? null :item.IdUsuario,
            // eslint-disable-next-line no-nested-ternary
            cancelar: item.permitirCancelacion === true ? 1 :0 || item.OpcionCancelar === true ? 1:0,
            // eslint-disable-next-line no-nested-ternary
            seguimiento:item.requiereSeguimiento === true ? 1 : 0 || item.OpcionSeguimiento === true ? 1:0,
            reglas:  item.reglaEtapa === undefined ?  [] : item.reglaEtapa,
            tiempos: tiempos !== undefined ? tiempos : [],
            configuracion: item.configuracion !== undefined ? JSON.stringify(item.configuracion) : JSON.stringify([]),
            catalogos: [],
            Activo:item.Activo !== undefined ? item.Activo : null,
          }
          etapas.push(etapa)
        });
      }
      
      const itemCierreRespuesta =  parseInt(data.selectionCierreRespuesta)
      const itemTiempoRespuesta = parseInt(data.selectionTiempoRespuesta)
      
      console.log(data,"CLAANDOOOOOOo");
      
      const ticketData={
        nombre:data.selectionServicio,
        tipoForma:data.componentes,
        departamentos:data.selectionDepartamento > 0 ? data.selectionDepartamento : data.selectionDepartamento[0].value,
        tipostickets:data.selectionTipo,
        idPermisoPuesto:1,
        idPuesto:data.selectionPuesto !== "" ?  data.selectionPuesto : null,
        idPlantilla:data.idPlantilla !== "" ? data.idPlantilla : 0,
        autorizacion:data.autorizacion === true ? 1 :0,
        seguimiento:data.seguimiento === true ? 1 :0,
        cierreRespuesta: data.tipoCierreRespuesta === 'dias' ? itemCierreRespuesta * 24 : itemCierreRespuesta, // poner      
        tiempoRespuesta : data.tipoTiempoRespuesta === 'dias' ? itemTiempoRespuesta * 24 : itemTiempoRespuesta || data.selectionTiempoSLA,

        tipoCierreRespuesta:data.tipoCierreRespuesta, // poner
        tipoTiempoRespuesta:data.tipoTiempoRespuesta, // poner
        estatus:true,
        priorizador:data.selectionPrioriza !=="" ? data.selectionPrioriza : null,
        etapas:etapas !== undefined ? etapas : [],
        catalogos: [],
        permisosPuestos: data.selectionPermisosPuesto,
        tieneEtapas : etapas.length > 0 ? 1 : 0,  
      }
      
      console.log(ticketData,"TICKET DE ACTUALIZADO ")
      const ticket = yield call(savePlantillaTickets,ticketData)
      console.log(ticket,"TICKET YA GUARDADOOO");
      if(ticket.status === 200){
        yield put(
          enqueueSnackbar({
            message: 'Guardado con éxito.',
            options: {
              variant: 'success',
            },
          })
        );
        yield put({
          type: ('APP/CONTAINER/CONFIGURACIONTICKETS/REDIRIGIR_LISTADOTICKETS'),
        })
      }else{      
        enqueueSnackbar({
          message: 'Hubo un error al guardar.',
          options: {
            variant: 'error',
          },
        })
      }

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < etapasParaBorrar.length; index++) {
        if(etapasParaBorrar[index].temporal !== true){
          idsEtapasBorrar.push(etapasParaBorrar[index].IdEtapa)
        }    
      }
      if(etapasParaBorrar.length > 0){
        // eslint-disable-next-line no-empty-pattern
        const {
          // eslint-disable-next-line no-shadow
        } = yield call (eliminarEtapaApi,  idsEtapasBorrar);
      }

    }} catch (err) {
    yield put({
    })
  }
}

export function* ajustarEtapas(action) {
  try {
    if(action.datos.datosEtapas)
    {
      // eslint-disable-next-line prefer-destructuring
      const datosEtapas = action.datos.datosEtapas   
      yield put({
        type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_ETAPAS',datosEtapas,
      });
    }else{
      const departamentos = yield call((getDepartamentos))
      const priorizadores = yield call(getPriorizadores,action.datos.ticket.idDepartamento)
      // eslint-disable-next-line prefer-destructuring
      const ticket = action.datos.ticket
      ticket.servicioDepartamentos =departamentos.data
      ticket.servicioPrioriza =priorizadores.data
      // console.log(ticket,"TICKETSON");
      yield put({
        type: 'APP/CONTAINER/CONFIGURACIONTICKETS/SET_ETAPAS', ticket,
      });
    }
  } catch (err) {
    yield put({
    })
  }
}

// --------////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Individual exports for testing
export default function* configuracionTicketsSaga() {
  yield takeLatest(('APP/CONTAINER/CONFIGURACIONTICKETS/OBTENER_TIPOS'), getDatos);
  yield takeLatest(('APP/CONTAINER/CONFIGURACIONTICKETS/HANDLE_CHANGE_DEPARTAMENTOS'), getPriorizador);
  yield takeLatest(('APP/CONTAINER/CONFIGURACIONTICKETS/GUARDAR_TICKET'), guardarConfigTicket);
  yield takeLatest(('APP/CONTAINER/CONFIGURACIONTICKETS/OBTENER_CATALOGOS_ACTION'),funObtenerCatalogos);  
  yield takeLatest(('APP/CONTAINER/CONFIGURACIONTICKETS/ACTUALIZAR_TICKET'), actualizarTicket);
  yield takeLatest(('APP/CONTAINER/CONFIGURACIONTICKETS/ONCHANGE_VALUE_SELECTS_CATALOGOS_SAGA_ACTION'), obtenerDatosCatalogo);
  yield takeLatest(('APP/CONTAINER/CONFIGURACIONTICKETS/SET_ETAPAS_CONF'), ajustarEtapas);
}


