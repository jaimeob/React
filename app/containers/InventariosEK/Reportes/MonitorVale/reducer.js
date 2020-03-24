/*
 *
 * MonitorVale reducer
 *
 */

import { fromJS } from 'immutable';
import React from 'react';
import {
  Chip,
  Avatar,
} from '@material-ui/core'
import { DEFAULT_ACTION } from './constants';
import STATE from './state';

export const initialState = fromJS(STATE);

function monitorValeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
   
    case 'APP/CONTAINERS/INVENTARIOSEK/REPORTES/MONITORVALE/GUARDAR_PREVALES': {

      for (let i = 0; i < action.data.length; i+=1) {
        // debugger;
        const color = /\(([^)]+)\)/.exec(action.data[i].Color);
        action.data[i].Estatus = <Chip
          avatar={<Avatar style={{backgroundColor: action.data[i].Color}}></Avatar>}
          label={action.data[i].Estatus} 
          style={{
            backgroundColor: 'white',
            borderColor: `rgba(124,124,124, 0.5)`,
            width: '135px',
            justifyContent: 'start',
          }}
          variant="outlined"
        />
      }
      return state.set(
        'datos',
        fromJS(action.data)
      );
    }
    default:
      return state;
  }
}

export default monitorValeReducer;
