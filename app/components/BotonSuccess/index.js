/**
 *
 * BotonSuccess
 *
 */

import React from 'react';
import T from 'prop-types';
import { uniqueId } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = () => ({
  success: {
    backgroundColor: '#28950F',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#1d7109',
    },
    color: 'white',
    minWidth: 84.88,
  },
  verdesito:{
    backgroundColor: '#28950f5e',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#28950f8a',
    },
    color: '#545050',
  },
  root: {
    textTransform: 'initial',
  },
})

function BotonSuccess(props) {
  const {
    classes,
    disabled,
    onClick,
    label,
    size,
    verdesito,
    id,
  } = props;

  return (
    <div>
      <Button 
        className={verdesito ? classes.verdesito : classes.success}
        key={uniqueId('success_')} 
        variant="contained"
        disabled = {disabled}
        id={id}
        classes={
          {
            root: classes.root,
          }
        }
        onClick ={onClick}
        size={size || 'medium'}
      >
        {label}
      </Button>
    </div>
  );
}

BotonSuccess.propTypes = {
  classes: T.object,
  verdesito: T.bool,
  disabled: T.bool,
  onClick: T.func,
  label: T.oneOfType([
    T.string,
    T.element,
  ]),
  size: T.string,
  id: T.string,
};

export default withStyles(styles)(BotonSuccess);
