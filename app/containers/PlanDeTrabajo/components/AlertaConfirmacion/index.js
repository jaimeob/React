import React from 'react';
import T from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {
  Icon,
  Grid,
  Typography,
}from '@material-ui/core';

import './styles.css';
import { Container } from '../../../ConfiguracionTicket/styledComponents';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function AlertDialogSlide(props) {

  const {
    open,
    textoContenido,
    onClickCancelar,
    onClickAceptar,
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle 
          id="alert-dialog-slide-title"
          style={{
            // fontSize: '1rem',
            // color: 'black',
            // paddingTop: '3px',
            // marginTop: '2vh',
            // // margin: '10px 0px 10px 0px',
            // // padding: '10px 0px 10px 10px',
            // backgroundColor: 'rgba(255, 0, 35, 0.37)',
            // borderRadius: '4px',
            // alignContent:'center',
            height: '6vh',
            padding: '1vh 1vw 2vh 1vw',
            backgroundColor: 'rgb(255, 0, 35,0.4)',    
            marginTop: '9px',
          }}
        >
          <Container
            flexDirection='row'
          >
            <Icon 
              style={{ 
                alignSelf: 'center',
                marginRight: '3px',
                fontSize: '5vh',
                color: 'rgb(255, 0, 35)',
              }}
            >
              report
            </Icon>
            <Typography 
              style={{
                alignSelf:'center',
                marginBottom: 0,
                fontSize:'15px',
                color:'black',
              }}
              variant="h6" gutterBottom>
              Confirmar...
            </Typography>
          </Container>
        </DialogTitle>
        <DialogContent style={{ padding: '2px 10px 3px 10px' }}>
          <DialogContentText 
            id="alert-dialog-slide-description"
            style={{
              fontSize: '1rem',
              textAlign: 'center',
              color: 'black',
              marginTop: '2vh',
            }}
          >
            {textoContenido}
          </DialogContentText>
        </DialogContent>
        <DialogActions 
          style={{
            fontSize: '1rem',
            textAlign: 'center',
            color: 'black',
            marginTop: '2vh',
            justifyContent: 'center',
          }}
        >
          <Button 
            onClick={onClickCancelar}
            color="primary"
            style={{
              color:'white',
              backgroundColor:'#FF0023',
              lineHeight: '1.4',
            }}
          >
           X
          </Button>
          <Button 
            onClick={onClickAceptar}
            color="primary"
            style={{
              color:'white',
              backgroundColor:'#28950F',
              lineHeight: '1.4',
            }}
          >
            ✓
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialogSlide.propTypes = {
  open: T.bool,
  textoContenido:   T.string,
  onClickCancelar:  T.func,
  onClickAceptar:   T.func,
};