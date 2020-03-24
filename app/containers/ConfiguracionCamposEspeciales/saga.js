import { takeLatest, call, put, select } from 'redux-saga/effects';
import { isNumber,isEmpty,filter } from 'lodash';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import Actions from './actions';

import {
  getPlazas,
  getPlazasHabilitadas,
  getPuestos,
  getUsuariosPlaza,
  deletePlaza,
  getTodasPlazas,
  obtenerCatalogos,
  getRelacionesApi,
  // getEtapasPlaza,
  getNumeroDepuestos,
} from './api';

export const {
  GET_ETAPAS,
  SET_ETAPAS,
  GET_PLAZAS,
  DELETE_ETAPA,
  DELETE_PLAZA,
  SELECCIONAR_USARIOS_ROLES,
  HANDLE_CHANGE_PLAZA_DESTINO,
  GET_PLAZAS_HABILITADAS,
  AGREGAR_ETAPA_PLAZA2,
  AGREGAR_ETAPA_PLAZA,
  ACTUALIZAR_ETAPA_TEMPORAL,
  HANDLE_CHANGE_TIPO,
  HANDLE_CHANGE_PLAZA,

} = Actions.getConstants();

export function* getEtapasAction(action) {
  const cabeceras = [
    // {name: "IdEtapa"},
    {name: "Etapa", label: "Etapa"},
    {name: "TiempoDeSLA", label: "Tiempo de SLA"},
    // {name: "Temporal"},
    {name: "Plaza"},
    {name: "Dependencia", label: "Dependencia"},
    {name: "Responsable", label: "Responsable"},
    {name: "Puesto", label: "Puesto"},
    {name: "options", label: " "}]

  // const IdPlantilla = yield select((state) => state.getIn(['configuracionCamposEspeciales', 'tabla', 'idPlantilla']));
  const data =[]
  data.data = []
  data.headers = cabeceras
  data.data[0] = []

  // INSERTAR PLAZA TEMPORAL
  // if(data.data[0][0].length === 0 || data.data[0].length === undefined ){
  const datosEtapas = yield select((state) => state.getIn(['configuracionCamposEspeciales', 'tabla', 'etapasTemporales']));
  const etapasTemporales = JSON.parse(JSON.stringify(datosEtapas));


  const Usuarios = []
  const Puestos = yield call(getPuestos);

  const item =  filter(etapasTemporales, {'IdPlaza': action.id });
  
  item.forEach((ob) => 
  {
    if(ob.plazaDestinoSeleccionada){
      if(ob.plazaDestinoSeleccionada.id){
        ob.plazaDestinoSeleccionada = ob.plazaDestinoSeleccionada.id
      }
    }
  })
 
  for (let i = 0; i < item.length; i+=1) {
    let empleados = []
    if(item[i].plazaDestinoSeleccionada){
      if(item[i].plazaDestinoSeleccionada.id ===""){
        empleados = yield call(getUsuariosPlaza,item[i].plazaDestinoSeleccionada)
      }else{
        empleados = yield call(getUsuariosPlaza,item[i].plazaDestinoSeleccionada)
      }
    }
   
    empleados.data.forEach((ob) => 
    {
      
      Usuarios.push(ob)
    })
  }
  
  item.forEach((etapa) => {
    etapa.usuarios = Usuarios
    etapa.puestos = Puestos.data
  })

  // ----------------------------------------
  if(!isEmpty(item))
    data.data[0].push(item)
  yield put(
    Actions.get('SET_ETAPAS').fn(data, action.id,Usuarios.data)
  );
}

export function* getPlazasAction(item) {  
  if(item.IdPlantilla === ""){
    const data = []
    data.etapasTemporales = item.array
    yield put(
      Actions.get('SET_ETAPAS').fn( data.etapasTemporales )
    );
  }else{
    const {
      status,
      data = [],
    } = yield call(getPlazas,item.IdPlantilla);
    
    data.etapasTemporales = item.array
    data.IdPlantilla = item.IdPlantilla
    if (status === 200) {
      yield put(
        Actions.get('SET_PLAZAS').fn(data)
      );
    } else {
      
      yield put(
        Actions.get('SET_ETAPAS').fn(data.item.array)
      );
    }
  }
}


export function* deletePlazaAction(action) {
  const datos = isNumber(action.id) ? [action.id] : action.id;
  const {
    status,
    data,
  } = yield call(deletePlaza, datos);

  if (status === 200) {
    yield put(
      enqueueSnackbar({
        message: data.message,
        options: {
          variant: 'success',
        },
      })
    );
    yield put(
      Actions.get('GET_PLAZAS').fn()
    );
  } else {
    yield put(
      Actions.get('GET_PLAZAS').fn()
    );
  }
}

export function* getPlazasHabilitadasAction() {
  try {
    // Obteniendo todas las plazas 
    const plazas = yield call(getTodasPlazas);

    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_TODAS_PLAZAS', plazas,
    });

    // Obteniendo plazas Habilitadas
    const plazasHabilitadas = yield call(getPlazasHabilitadas);
    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/GET_PLAZAS_HABILITADAS', plazasHabilitadas,
    });

  } catch (err) {
    yield put({
      // type: ('APP/CONTAINER/BANDEJADIFUSIONES/REQUEST_DEPARTAMENTOS_FAILED', err),
    })
  }

}

export function* getUsuariosRolesAction(action) {  
  try {
    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_RADIO_BUTTON', action,
    });

    const plaza = yield select((state) => state.getIn(['configuracionCamposEspeciales', 'confEtapas', 'plazaSelected']));
    const plazaId = yield select((state) => state.getIn(['configuracionCamposEspeciales', 'tabla', 'idPlaza']));

    if(plaza){
      plaza.id = plaza.id === undefined ? plazaId : plaza.id
    }

    const tipoBusqueda = action.event === "Rol" ? yield call(getPuestos) : yield call(getUsuariosPlaza, plaza.id);
    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_USUARIOS_ROLES', tipoBusqueda,
    });



  } catch (err) {
    yield put({
    })
  }
}

export function* getEtapasPorPlazaAction(action) {
  try {

    const plazaId = action.event.id
    const radioRol = yield select((state) => state.getIn(['configuracionCamposEspeciales', 'confEtapas', 'radioRol']));

    const tipoBusqueda = radioRol === "Rol" ? yield call(getPuestos) : yield call(getUsuariosPlaza, plazaId);
    
    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_USUARIOS_ROLES', tipoBusqueda,
    });

  } catch (err) {
    yield put({
      // type: ('APP/CONTAINER/BANDEJADIFUSIONES/REQUEST_DEPARTAMENTOS_FAILED', err),
    })
  }
}

export function* deleteComponenteEspecial(action){
  const {
    index,
    nombre,
  } = action;

  const reglas = yield select((state) => state.getIn(['configuracionCamposEspeciales','etapas','reglas',0,'config']));
  const arr = JSON.parse(JSON.stringify(reglas));  
  const dato = arr.find(elem => {
    let band;
    if(elem.campo === nombre)
      band = elem.campo
    return band;
  })

  if(dato){
    // yield put(
    //   enqueueSnackbar({ QUIEN SABE POR QUE NO JALA ESTA WEA FOME, EL QUE PUEDA DIGAME xD!
    //     message: 'Este Campo Esta Siendo Utilizado',
    //     options: {
    //       variant: 'warning',
    //     },
    //   })
    // );
    // eslint-disable-next-line no-alert
    // alert('no se puede borrar este componente, esta siendo utilizado por una regla!');
    yield put(
      enqueueSnackbar({
        message: 'no se puede borrar este componente, esta siendo utilizado por una regla!',
        options: {
          variant: 'error',
        },
      })
    ); 
  }else{
    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICK_COMPONENTE_ACTION',
      index,
      nombre,
    }); 
  }

}

export function* funObtenerCatalogos(){
  const {
    status,
    data,
  } = yield call(obtenerCatalogos);

  if(status === 200){
    yield put({
      type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/SET_CATALOGOS_ACTION',
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


export function* validacionesEtapas() {
  try {
    const validacionTiempo = yield select((state) => state.getIn(['configuracionCamposEspeciales','confEtapas','validacionesConfEtapas']));
    if(validacionTiempo === false){
      yield put(
        enqueueSnackbar({
          message: 'Campos Incompletos',
          options: {
            variant: 'error',   
          },
        })
      ); 
      return 
    }
    yield put(
      enqueueSnackbar({
        message: 'Etapa Guardada',
        options: {
          variant: 'success',
        },
      })
    ); 
    return 

 

  } catch (err) {
    yield put({
      // type: ('APP/CONTAINER/BANDEJADIFUSIONES/REQUEST_DEPARTAMENTOS_FAILED', err),
    })
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
      type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_VALUE_SELECTS_CATALOGOS_ACTION',
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


export function* obtenerNumeroDePuestos(action){
  const radio = yield select((state) => state.getIn(['configuracionCamposEspeciales','confEtapas','radioRol'])); 
  if(radio !== "Usuario"){
    const {
      status,
      data,
    } = yield call(getNumeroDepuestos,action.event.id);
    let requiere ={}
    if(status === 200){
      if(data[0].numero > 1){
        requiere = {seguimiento:true,numeroPuestos:data[0].numero}
        yield put({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REQUIERE_SEGUIMIENTO',requiere,
        }); 
      }else{
        requiere = {seguimiento:false,numeroPuestos:0}
        yield put({
          type: 'APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/REQUIERE_SEGUIMIENTO', requiere,
        });
      } 
    }
  }
}

// Individual exports for testing
export default function* configuracionCamposEspecialesSaga() {
  yield [
    takeLatest(
      GET_ETAPAS,
      getEtapasAction
    ),
    takeLatest(
      GET_PLAZAS,
      getPlazasAction
    ),
    takeLatest(
      GET_PLAZAS_HABILITADAS,
      getPlazasHabilitadasAction
    ),
    takeLatest(
      SELECCIONAR_USARIOS_ROLES,
      getUsuariosRolesAction
    ),
    takeLatest(
      HANDLE_CHANGE_PLAZA_DESTINO,
      getEtapasPorPlazaAction
    ),
    takeLatest(
      DELETE_PLAZA,
      deletePlazaAction
    ),
    takeLatest(
      HANDLE_CHANGE_TIPO,
      obtenerNumeroDePuestos,
    ),
    // takeLatest(
    //   HANDLE_CHANGE_PLAZA,
    //   asignarPlazaPuesto,
    // ),
    takeLatest('APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCLICKK_COMPONENTE_ACTION',deleteComponenteEspecial),
    takeLatest('APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/OBTENER_CATALOGOS_ACTION',funObtenerCatalogos),
    takeLatest(('APP/CONTAINER/CONFIGURACIONCAMPOSESPECIALES/ONCHANGE_VALUE_SELECTS_CATALOGOS_SAGA_ACTION'), obtenerDatosCatalogo),
  ]

}