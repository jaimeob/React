import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers} from 'recompose';
import CardHeader from '@material-ui/core/CardHeader';
import { 
  // Paper, 
  // Button, 
  Card,
  // CardContent,
  CardActions, 
  // Select,
  // InputLabel,
} from '@material-ui/core';
import IconoPortafolio from 'images/iconos/iconoPortafolio.svg';
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditarIcon from "@material-ui/icons/Edit";
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
// import { Container } from '../../styledComponents';
// eslint-disable-next-line no-unused-vars
const styles = _theme => ({
  root: {
    borderTopLeftRadius: '4px',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
  },
});


function OpcionesPortafolio(props) {

  const 
    {
      edicionPortafolio,
      classes,
      item,
      idx,
      // abrirPop,
      // abrirPopProxy,
      // onAbrirPop,
      redireccionarListado,

    } = props

  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {

    setAnchorEl(event.currentTarget);
    // onAbrirPop(true)
  }

  function handleClose() {
    setAnchorEl(null);
    // onAbrirPop(false)
  }

  // eslint-disable-next-line no-shadow
  const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

  // eslint-disable-next-line no-shadow
  const Link2 = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/getting-started/installation/" {...props} />
  ));

  const open = Boolean(anchorEl);  
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <Card  style={{backgroundColor:item.Color}}  elevation={8} className={classes.card2}>
        <CardHeader
          action={
            <IconButton aria-label="settings" style={{color:'white'}} onClick={handleClick} >
              <MoreHoriz />
            </IconButton>

          }
          style={{padding:'0px'}}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <List className={classes.root2}>
            {/* <ListItem style={{cursor:'pointer'}}>
              <Cbox style={{color:item.Color}}>
                <Cbox />
              </Cbox>
              <ListItemText id="switch-list-label-wifi" primary="Elige un color para el portafolio" />
            </ListItem> */}
            <ListItem style={{cursor:'pointer'}} onClick={edicionPortafolio(item,idx)} >
                      
              <EditarIcon>
                <EditarIcon />
              </EditarIcon>
              <ListItemText id="switch-list-label-bluetooth" primary="Editar Portafolio" />
            </ListItem>
          </List>
        </Popover>
        <CardActions style={{margin:'-30px',justifyContent: 'center',padding:"25px,4px",cursor:'pointer'}} onClick={redireccionarListado({item})}>
          <img src={IconoPortafolio} alt="" style={{width:'60%', padding:'0px',margin:'-10px'}} />
        </CardActions>
      </Card>
      <Router>
        <div>
          <Link component={Link1} onClick={redireccionarListado({item})} to="/">
            {item.NombrePortafolio}
          </Link>
          <br />
          <Link component={Link2} onClick={redireccionarListado({item})} to="/">{item.proyectos} Proyectos</Link>
        </div>
      </Router>
    </div>
  );  
}

OpcionesPortafolio.propTypes = {
  edicionPortafolio:T.func,
  classes:T.object,
  item:T.object,
  idx:T.number,
  redireccionarListado: T.func,
  // abrirPop : T.bool,
};

export default compose(
  withHandlers({
    abrirPopProxy: (props)=> (band)=> () => {
      const {
        onAbrirPop,
      } = props
      onAbrirPop(band)
    },
  }),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS ]===================================
       
      //   edicionPortafolio: (item) => {
      //     dispatch({
      //       type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_EDICION_PORTAFOLIO',
      //       item,
      //     })
      //   },
  
    })
  ),
)(OpcionesPortafolio);