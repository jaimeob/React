import { fromJS } from 'immutable';
import STATE from './state';

// export { default as INIT_STATE } from './reducer'
// export const initialState = fromJS({
//   ticket: {},
//   // estado de la pantalla equivalente al estado de una clase
// })
// export const initialState = fromJS({
//   // ticket: {},
//   ...STATE,
//   // estado de la pantalla equivalente al estado de una clase
// })

export const initialState = fromJS(STATE);

export const listadoTickets = function reducer(state = initialState, action) {
  switch (action.type) {
    // case 'APP/CONTAINERS/CONFIGTKS/UPDATE_TICKET': {
    //   const {
    //     data,
    //   } = action;
      
    //   if (!data) return state;
    //   return state.set('ticket', data)
    // }

    case 'APP/CONTAINER/listadoTickets/SET_TICKETS': {
      console.log(action);
      
      return state
    }

    default:
      return state;
  }
}

export default listadoTickets; 


//   apiTickets.get('/plantillatickets')
//     //     .then(Response => {
//     //       // const otherData = Response.data.map(item => ({ 
//     //       //   nombre: item.nombre || "",
//     //       //   departamentos: item.NomDepartamento,
//     //       //   empleados: item.idTipo === 1 ? item.NomEmpleado : 'No Aplica',
//     //       //   createdAt: moment(item.createdAt).format("YYYY/MM/DD"),
//     //       //   id :item.IdPlantilla,
            
//     //       // }));
          
//     //       // const ticketsArray = otherData.map(obj => Object.values(obj));
//     //       stateUpdater('response', Response);
//     //       stateUpdater('data', Response.data);
//     //       stateUpdater('filterData', Response.data);
//     //       stateUpdater('loading', false);
//     //     })
//     //     .catch(error => {
//     //       stateUpdater('stack', error, true);
//     //       stateUpdater('loading', false);
//     //     });
//     // }, 