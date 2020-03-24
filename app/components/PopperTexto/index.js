/**
 *
 * PopperTexto
 *
 */

import React from 'react';
import T from 'prop-types';
// import styled from 'styled-components';

import {
  Paper,
  Popper,
  Fade,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ErrorIcon from '@material-ui/icons/Error';
import DoneIcon from '@material-ui/icons/Done';

import Malo from 'images/iconos/estatusMalo.gif';
import Regular from 'images/iconos/estatusRegular.gif';
import Bueno from 'images/iconos/estatusBueno.gif';
import { uniqueId } from 'lodash';
class PopperTexto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imagenActiva : false, anchorEl : null};
  }
  
  mostrarImagen = event => {
    this.setState({imagenActiva: true, anchorEl: event.currentTarget})
    this.props.mostrarPopper(1);
  }

  ocultarImagen = () => {
    this.setState({'imagenActiva': false, anchorEl: null})
    this.props.ocultarPopper(1)
  }

  obtenerGif = (estatus) => {
    switch(estatus){
      case 1: return Malo;
      case 2: return Regular;
      case 3: return Bueno;
      default: return null;
    }
  }

  obtenerComponente = (estatus, id) => {
    switch(estatus){
      case 1: 
        return (
          <ClearIcon
            fontSize='small' 
            color="secondary" 
            aria-label="Add" 
            onMouseOver={this.mostrarImagen}
            onFocus={this.mostrarImagen}
            onMouseLeave={this.ocultarImagen}
            aria-describedby={id}
            style={{
              backgroundColor: 'red',
              borderRadius: 12,
              color: 'white',
            }}
          />
        )
      case 2: 
        return (
          <ErrorIcon
            fontSize="small" 
            color="secondary" 
            aria-label="Add" 
            onMouseOver={this.mostrarImagen}
            onFocus={this.mostrarImagen}
            onMouseLeave={this.ocultarImagen}
            aria-describedby={id}
            style={{
              backgroundColor: 'orange',
              borderRadius: 12,
              color: 'white',
            }}
          />
        )
    
      case 3: 
        return (
          <DoneIcon
            fontSize="small" 
            color="secondary" 
            aria-label="Add" 
            onMouseOver={this.mostrarImagen}
            onFocus={this.mostrarImagen}
            onMouseLeave={this.ocultarImagen}
            aria-describedby={id}
            style={{
              backgroundColor: 'green',
              borderRadius: 12,
              color: 'white',
            }}
          />
        )
      default:
        return null;
    }
  }

  render() {
    const {
      id,
      estatus,
    } = this.props;
    
    if(estatus > 0)
      return(
        <div>
          {this.obtenerComponente(estatus, id)}
          <Popper
            id={id}
            key={uniqueId('popperTexto')}
            open={this.state.imagenActiva} 
            anchorEl={this.state.anchorEl} 
            transition
            // disablePortal={true}
            placement='left'
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  style={{
                    border: 'double 4px transparent',
                    borderRadius: '80px',
                    backgroundImage: 'linear-gradient(#FF623C, #96178D, #36B244, #203CE2), radial-gradient(circle at top left, #f00,#3020ff)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: '"content-box", "border-box"',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    alt='Error al cargar imagen'
                    src={this.obtenerGif(estatus)}
                    style={{
                      width: '100px',
                      height: '100px',
                    }}
                  /> 
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )
    return null;
  };
}

PopperTexto.propTypes = {
  id: T.string,
  estatus: T.number,
};

export default PopperTexto;
