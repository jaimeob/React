/**
 *
 * FormInput
 *
 */

import React, { useState, useCallback } from 'react';
import T from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';

import Grey from '@material-ui/core/colors/grey'
import ArrowBack from '@material-ui/icons/ArrowBack';
import Modal from 'components/Dialog/alertDialog';

function Appbar(props) {
  const [bandModal, modalHandler] = useState(false);

  const {
    onClickRegresar,
    texto,
    hayCambios,
  } = props

  const modalHandlerProxy = useCallback((band) => () => {
    modalHandler(band)
  }, [bandModal])

  return (
    <React.Fragment>
      <Modal 
        open={bandModal}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message='Existen datos no guardados, ¿Desea continuar?'
        onClickAccept={onClickRegresar}
        onClickCancel={modalHandlerProxy(false)}
      />
      <AppBar 
        position="static"
        style={
          {
            backgroundColor: Grey[200], 
            marginBottom: 16,
            boxShadow: 'none',
          }
        } 
      >
        <Toolbar 
          variant="dense" 
          style={
            {
              paddingLeft: 8,
            }
          }
        >
          {onClickRegresar && 
            <IconButton 
              onClick={hayCambios ? modalHandlerProxy(true) : onClickRegresar}
            >
              <ArrowBack/>
            </IconButton>
          }
          <Typography
            variant='h5'
            style={{fontSize: 16}}
          >
            {texto}
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Appbar.propTypes = {
  onClickRegresar: T.func,
  texto: T.string,
  hayCambios: T.bool,
};

export default Appbar;
