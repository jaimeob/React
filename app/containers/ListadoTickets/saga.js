import { call, put,takeLatest } from 'redux-saga/effects';
import {
  getTickets,
} from './api';


export function* obtenerTickets() {
  try {
    console.log("te entratodaaaaaaaaaaa");

    const {
      data,
      status
    }= yield call(getTickets)
    console.log(data,"data ");
    
    if(status === 200){
      debugger;
      yield put({
        type: 'APP/CONTAINER/listadoTickets/SET_TICKETS',
        data,
      });
    }
    // console.log(tickets,"si jala masiso");
    
    // yield put({
    //   type: 'APP/CONTAINER/listadoTickets/SET_TICKETS',
    // });
  } catch (err) {
    yield put({
      // type: ('APP/CONTAINER/CONFIGURACIONTICKETS/REQUEST_DEPARTAMENTOS_FAILED', err),
    })
  }
}

// METODO DE GUARDADO --------------------------------------------------------------------------------------------------------------------

// export function* guardarConfigTicket(action) {
//   try {

//   } catch (err) {
//     yield put({
//       // type: ('APP/CONTAINER/CONFIGURACIONTICKETS/REQUEST_DEPARTAMENTOS_FAILED', err),
//     })
//   }
// }
// --------////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Individual exports for testing
export default function* listadoTicketsSaga() {
  yield takeLatest(('APP/CONTAINER/listadoTickets/GET_TICKETS'), obtenerTickets);
  
}


