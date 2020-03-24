/**
 *
 * BotonSuccess
 *
 */

import React, { useState, useCallback } from 'react';
import T from 'prop-types';
import { uniqueId } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Confirmacion from 'components/Dialog/alertDialog';

const styles = () => ({
  success: {
    backgroundColor: '#FF0023',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: 'rgb(212, 8, 36)',
    },
    color: 'white',
    minWidth: 84.88,
  },
  root: {
    textTransform: 'initial',
  },
})

function BotonCancelar(props) {
  const [bandModal, modalHandler] = useState(false);

  const {
    classes,
    disabled,
    onClick,
    label,
    hayCambios,
    size,
  } = props;

  const modalHandlerProxy = useCallback((band) => () => {
    if(band === 1){
      band = false;
      onClick();
    }
    modalHandler(band)
  }, [bandModal])

  return (
    <div>
      <Confirmacion 
        open={bandModal}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmar....'
        message='Existen datos no guardados, ¿Desea continuar?'
        onClickAccept={modalHandlerProxy(1)}
        onClickCancel={modalHandlerProxy(false)}
      />
      <Button 
        className={classes.success}
        classes={
          {
            root: classes.root,
          }
        }
        key={uniqueId('success_')} 
        variant="contained"
        classes={
          {
            root: classes.root,
          }
        }
        disabled={disabled}
        onClick={hayCambios ? modalHandlerProxy(true) : onClick}
        size={size || 'medium'}
      >
        {label}
      </Button>
    </div>
  );
}

BotonCancelar.propTypes = {
  classes: T.object,
  disabled: T.bool,
  onClick: T.func,
  label: T.string,
  hayCambios: T.bool,
  size: T.string,
};

export default withStyles(styles)(BotonCancelar);
