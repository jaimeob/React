import React, {  Fragment } from 'react';
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
import T from 'prop-types';
// MUI stuff
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
// Parte de la conexion
import config from 'config/config.development';
// Esta accion debera insertar
// import { inherits } from 'util';
import socketIOClient from "socket.io-client";
import Drawer from '@material-ui/core/Drawer';
import ClearIcon from '@material-ui/icons/Clear';
import ListItem from '@material-ui/core/ListItem';
import { uniqueId } from 'lodash';
// eslint-disable-next-line import/named
import { markNotificationsRead } from '../../actions';
// import { initialState } from '../../reducer';
import ImagenCampana from '../../../../images/Notifications.svg';


// Probando nuevo menu 
// import MenuList from '../MenuListComponent/MenuListComponent';



const socket = socketIOClient(config.api.socketURL);

class Notifications extends React.Component {
  state = {
    // anchorEl: null,
    color: 'inherit',
    abrir: false,
  };

  // handleOpen = (event) => {
  //   this.setState({ anchorEl: event.currentTarget  });
  //   this.setState({ color: 'secondary'});
  //   this.props.cambiarEstatusNotificacionAction(this.props.numUsuarioLogeado,this.props.idDepartamentoLogeado);
  //   setTimeout(this.aplicaSocket(),5000)
      
  // };



  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ abrir: open});
    if (open) {
      this.setState({ color: 'secondary'});
    }else{
      this.setState({ color: 'inherit'});
    }
    
    // this.props.cambiarEstatusNotificacionAction(this.props.numUsuarioLogeado,this.props.idDepartamentoLogeado);
    // console.log("El Usuario: ",this.props.numUsuarioLogeado," El Departamento: ",this.props.idDepartamentoLogeado)
    socket.emit('cambiarEstatusNotificacion',this.props.numUsuarioLogeado,this.props.idDepartamentoLogeado);
    // setTimeout(this.aplicaSocket(),5000)
  };



  aplicaSocket = () =>{
    // console.log("Estoy aplicando el socket")
    // socket.emit('obtenerNotificaciones',this.props.numUsuarioLogeado,this.props.idDepartamentoLogeado);
    // socket.on('enviarNotificaciones',this.props.obtenerNotificacionesAction);
    // Cambiar el props de notificaciones 
  }

  // handleClose = () => {
  //   this.setState({ anchorEl: null });
  //   this.setState({ color: 'inherit'})
  // };


  // Esta funcion es necesaria en caso que se quieran cambiar las notificaciones a leidas solo en caso de entrar en ellas
  // onMenuOpened = () => {
  //   const unreadNotificationsIds = this.props.notificaciones
  //     .filter((not) => !not.Leido)
  //     .map((not) => not.idNotificacion);
  //   // this.props.markNotificationsRead(unreadNotificationsIds);
  // };

  render() {

    const {
      numUsuarioLogeado,
      idDepartamentoLogeado,
      notificaciones,
    } = this.props;


    // eslint-disable-next-line prefer-destructuring
    // const notificaciones = this.props.notificaciones;
    // eslint-disable-next-line prefer-destructuring
    // const anchorEl = this.state.anchorEl;
    // eslint-disable-next-line prefer-destructuring
    const color = this.state.color;
    // eslint-disable-next-line prefer-destructuring
    // const cambiarEstatusNotificacionAction = this.props.cambiarEstatusNotificacionAction; 

    const sinNotificacion = () => (
      <div
        role="presentation"
        onKeyDown={this.toggleDrawer('right', false)}
      >
        {/* Esta parte aqui hecha es sin notificaciones */}
        <img
          className ="center"
          src={ImagenCampana}
          alt="Imagen_Campana"
          style={{ width:'200px',height: '200px', marginLeft: 'auto',marginRight: 'auto',display:'block',marginTop: '50px'}}
        />
        <Typography  
          color="primary"          
          variant="h5"
          // className={classes.grow}
          style={{
            padding:'40px 30px 0px 65px',
          }}
        >
                  ¡Sin notificaciones!
        </Typography>
   
        <Typography  
          color="primary"
          variant="body1"
          // className={classes.grow}
          style={{
            padding:'40px 20px 0px 75px',
          }}
        >
                        Una vez que se generen, 
        </Typography>
        <Typography  
          color="primary"
          variant="body1"
          // className={classes.grow}
          style={{
            padding:'0px 20px 0px 55px',
          }}
        >
                        se mostrarán en este apartado
        </Typography>
      </div>
    );

    // "not" es la variable que controla cada array
    let notificationsIcon;

    if (notificaciones && notificaciones.length > 0) {
      // eslint-disable-next-line no-unused-expressions
      notificaciones.filter((not) => not.Leido === false && not.IdUsuarioRecibe === numUsuarioLogeado && not.IdDepartamentoRecibe === idDepartamentoLogeado).length > 0
        ? (notificationsIcon = (
          <Badge
            badgeContent={
              notificaciones.filter((not) => not.Leido === false).length
            }
            color="secondary"
          >
            <NotificationsIcon color={color} style={this.props.style} />
          </Badge>
        ))
        : (notificationsIcon = <NotificationsIcon color={color} />);
    } else {
      notificationsIcon = <NotificationsIcon color={color}/>;
    }

    const bandejaNotificaciones =
    notificaciones.length > 0 ? (
      notificaciones.map((not) => {
        const mensajeNotificacion = not.Notificacion;
        const iconColor = not.Leido ? 'primary' : 'secondary';
        const cerrarNotificaciones =  !not.Direccion.length>0;
        const icon = <ChatIcon color={iconColor} style={{ marginRight: 10,fontSize:'default' }} onClick={this.toggleDrawer(cerrarNotificaciones)} />
        return ( 
                 
          <ListItem button  className="root" style={{fontSize: 14}} key={`${not.IdNotificacion}`} onClick={this.toggleDrawer(cerrarNotificaciones)}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="caption"
              to={`${not.Direccion}`}
            >
              {mensajeNotificacion.split('\n').map((val) => <React.Fragment key={uniqueId('frag_')}>{val}<br /></React.Fragment>)}
            </Typography>
          </ListItem>
        );
      })
    ) : (
      sinNotificacion()      
    );
    // "bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"
    return (
      <Fragment>
        <IconButton
          aria-owns="simple-menu"
          aria-haspopup="true"
          onClick={this.toggleDrawer(true)}
          color= 'inherit'
        >
          {notificationsIcon}
        </IconButton>
        <Drawer
          PaperProps={{
            style: {
              marginTop: 65,
              width:320,
              zIndex:0,
              height:'90%',
            },
          }}
          anchor="right" open={this.state.abrir} onClose={this.toggleDrawer(false)}>
          <IconButton 
            size="small" 
            onClick={this.toggleDrawer(false)}
            style={{
              padding: 0,
              width: 25,
              left: 'auto',
              marginLeft: 270,
            }}>
            <ClearIcon />
          </IconButton>
          {bandejaNotificaciones}
        </Drawer>
        {/* <MenuList/> */}
        {/* <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          // onEntered={this.onMenuOpened}
        >
          {notificationesDetalle}
        </Menu> */}
      </Fragment>
    );
  }
}

Notifications.propTypes ={
  numUsuarioLogeado: T.number,
  idDepartamentoLogeado :T.number,
  // obtenerNotificacionesAction: T.func,
  notificaciones:T.array,
  style:T.object,
  
};

const mapStateToProps = (state) => ({
  notifications: state.notificationes,
});
export default connect(
  mapStateToProps,
  { markNotificationsRead }
)(Notifications);