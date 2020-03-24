import React, { useState } from 'react';
import { ClickAwayListener, Popper, Grow, Button, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import UserIcon from 'images/iconos/user.png';
import T from 'prop-types';

function BotonCerrarSesion(props) {
  // Declara una nueva variable de estado, la cual llamaremos “count”
  const [openCerrarSesion, setOpenCerrarSesion] = useState(false);
  const {
    imagenUsuario,
    dispatch,
  } = props;
  function renderUsuarioImagen(){
    try {
      return imagenUsuario
    } catch(e){
      return UserIcon;
    }
  }
   
  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={() => setOpenCerrarSesion(false)}>
        <Button
          type="button"
          onClick={() => setOpenCerrarSesion(!openCerrarSesion)}
        >
          <img
            src=
              { 
                imagenUsuario === '' 
                  ? UserIcon 
                  : renderUsuarioImagen(imagenUsuario)
              }
            style={styles.userIconRight}
            alt="Usuario - avatar"
          />
        </Button>
      </ClickAwayListener>
      <Popper open={openCerrarSesion === true} transition disablePortal style={styles.popperCerrarSesion}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <Button 
                variant="outlined"
                style={styles.buttonCerrarSesion}
                onClick={() => dispatch({ type: 'boilerplate/App/LOGOUT_USUARIO_INACTIVO'})}>
                  Cerrar Sesión
              </Button>
            </Paper>
          </Grow>
        )}
      </Popper>  
    </React.Fragment>
  );
}

BotonCerrarSesion.propTypes = {
  imagenUsuario: T.string,
  dispatch: T.func,
}

const styles = {
  userIconRight: {
    borderRadius: '50%',
    height: '40px',
    width: '40px',
  },
  popperCerrarSesion: {
    right: '20px',
    position: 'absolute',
    zIndex: 1,
    top: '56px', 
  },
  buttonCerrarSesion: {
    color: '#1976d2',
    border: '1px solid rgba(25, 118, 210, 0.5)',
  },
}

export default connect()(BotonCerrarSesion);
