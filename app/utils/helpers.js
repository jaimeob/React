import React from 'react';
import uniqueId from 'lodash/uniqueId';
import MenuItem from '@material-ui/core/MenuItem';
import { NETWORK_STATUS_CODES } from './constants'; 

export const isBoolean = (arg) => typeof arg === 'boolean';

const getMenuItemsOpts  = {
  id: '',
  dataText: '',
  dataValue: '',
  MenuItemProps: {},
};

export const getMenuItems = (data = [], options = getMenuItemsOpts) => {
  const {
    id = uniqueId('mnu_itm_'),
    dataText = '',
    dataValue = '',
    MenuItemProps = {},
  } = options;


  return (data.length && dataText.length && dataValue.length) ?
    data.map((item, index) =>
      <MenuItem
        value={item[dataValue] || `${id}_idx_${index}`}
        key={item[dataValue]}
        {...MenuItemProps}
      >
        {item[dataText] || 'Seleccione'}
      </MenuItem>
    ) : (
      <MenuItem
        value=""
        {...MenuItemProps}
      >
        Sin opciones
      </MenuItem>
    )
}

// REQUEST VALIDATIONS
export const isRequestOk = (status) => NETWORK_STATUS_CODES[status] === 'OK';
export const requestHasConflicts = (status) => NETWORK_STATUS_CODES[status] === 'CONFLICT';


export default {
  getMenuItems,
  isRequestOk,
  requestHasConflicts,
}
