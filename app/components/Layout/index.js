import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* MATERIAL UI COMPONENTS */

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Hidden from '@material-ui/core/Hidden';
import LogoImage from 'images/logo/fincamex-logo11.png';
import posed, { PoseGroup } from 'react-pose';


/* ICONS */
import DashboardIcon from '@material-ui/icons/Dashboard';
// import NotificationsIcon from '@material-ui/icons/Notifications';

// Opcion que funciona
// import Notificaciones from './component/Notificaciones.js';
// Desde el container y funciona
// import Notificaciones from '../../containers/Notificaciones/components/Notificaciones/Notificaciones';

import {
  // BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';
// import uid from 'lodash/uniqueId';
import {
  composeStateHandler,
} from 'utils/lib/hocs';
import { withRouter } from "react-router";
/* RECOMPOSE UTILITY */
import {
  compose,
  defaultProps,
  setDisplayName,
  mapProps,
} from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectReducer from 'utils/injectReducer';
// import AnimacionNotificacion from './component/AnimacionNotificacion';
// Correcto asi?
import Notificaciones from '../../containers/Notificaciones';
import STATE, { HANDLERS, CUSTOM_HANDLERS } from './state';

import Actions from '../../containers/Main/store/actions';
import reducer from '../../containers/Main/store/reducer';
import MenuLateral from './component/MenuLateral';
import BotonCerrarSesion from './component/BotonCerrarSesion';
import TicketsUsuario from './component/TicketsUsuario';
const drawerWidth = 240;

const renderNoop = () => null;

const STYLES =
  (theme) => ({
    root: {
      display: 'flex',
      position: 'absolute', 
      right: 0,
      transition: 'all 0.3s ease',      
    },
    topbarLogo: {
      width: 180,
      heigth: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: 104,
      },
    },
    grow: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      alignSelf: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      marginLeft: drawerWidth,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerShift: {
      width: 'auto',
      flexShrink: 0,
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    muiList: {
      backgroundColor: '#4A6572',
      padding: '0',
    },
    muiListItem: {
      padding: '8px',
    },
    muiListItemText: {
      color: '#f0f0f0',
      fontFamily: 'Roboto',
      padding: '0',
      fontSize: '14px',
    },
    muiTypography: {
      color: '#f0f0f0',
    },
    divider:{
      backgroundColor: '#f0f0f0',
    },
    hide: {
      display: 'none',
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#4a6572',
    },
    content: {
      flexGrow: 1,
      width: '100%',
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
  });

const DEFAULT_PROPS = {
  drawerOptions: [
    {
      id: '',
      nomOpcion: '',
      onClick: noop,
      MUIIcon: <DashboardIcon />,
      show: true,
    },
  ],
  colorNotificacion : 'inherit',
  render: () => null,
  title: 'Topbar',
  selectedOption: renderNoop,
};

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 },
});

class Layout extends Component {
  /*
   handleClickOption = (url = '', state = null) => () => {
    
     const {
       history,
       location: {
         pathname,
       },
     } = this.props;

     if (url !== '' && pathname !== url) {
       history.push(url, state)
     }
   } 
   */
   

  /*
  mapDrawerOptions = ({
    // id = uid(),
    nomOpcion = 'opcion',
    // onClick = noop,
    MUIIcon = null,
    show = true,
    url = '',
    state = {},
  } = {}, index) => show && (
    <ListItem
      button
      key={`lst-drw-opts-${index}`}
      onClick={this.handleClickOption(url, state)}
    >
      <ListItemIcon>
        {MUIIcon}
      </ListItemIcon>
      <ListItemText
        primary={nomOpcion}
      />
    </ListItem>
  )
  */

  mapDrawerRouter = ({
    component: Componente,
    url= '',
    state,
  } = {}, index) => (
    <Route
      key={`rte_${index}`}
      path={url}
      component={() => {
      
        // Validar si mandan propiedades en el location
        if(state){
          this.props.history.location.state = state;
        } 
        
        return (
          <Componente 
            usuarioGlobal={this.props.usuario} 
            usuarioId={this.props.usuario.UsuarioId} 
            nombreUsuario={this.props.usuario.Nombre} 
            location={this.props.history.location} 
            permisos={this.props.permisos}
          />)
      }
      }
    />
  )

  render() {
    const {
      classes,
      drawerOptions,
      state: {
        ui: {
          drawerLeft: {
            open: openDrawer,
          },
        },
      },
      handlers: {
        handleToggleDrawer,
      },
      theme,
      location,
    } = this.props;
    
    const toolbarContent = (
      <React.Fragment>
        <div className={classes.grow}>
          <img
            src={LogoImage}
            alt="Fincamex_logo"
            className={classes.topbarLogo}
            height="auto"
          />
          <MenuLateral 
            drawerOptions={drawerOptions} 
            // handleClickOption={this.handleClickOption} 
            history={this.props.history}
            usuario={this.props.usuario}
          />
        </div>
        <div className={classes.toolbarActions}>
          <TicketsUsuario
            idDepartamento={this.props.usuario.IdDepartamento}
            idPuesto={this.props.usuario.IdPuesto}
            idEmpleado={this.props.usuario.IdEmpleado}
          />
          <Notificaciones
            usuario={this.props.usuario}
          />
        </div>
      </React.Fragment>
    )

    const mobileDrawer = (
      <Drawer 
        variant="temporary"
        className={classes.drawer}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={openDrawer}
        onClose={handleToggleDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <div className={classes.toolbar} />              
        <MenuLateral 
          drawerOptions={drawerOptions} 
          // handleClickOption={this.handleClickOption} 
          history={this.props.history}
          usuario={this.props.usuario}
        />
      </Drawer>
    )

    return (
      <div className={classes.root} id="root-layout">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {toolbarContent}
            <BotonCerrarSesion imagenUsuario={this.props.usuario.Imagen} /> 
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          {/* SE OCULTA A PARTIR DEL BREACKPOINT SM Y MAYOR RESOLUCIÓN */}
          {mobileDrawer}
        </Hidden>
     
        <main className={classes.content}>
          <div className={classes.toolbar} />
          
          <PoseGroup flipMove={false}>
            <RouteContainer
              key={location.key || uniqueId('route_')}
            >
              <Switch location={location}>
                {drawerOptions.map(this.mapDrawerRouter)}
              </Switch>
            </RouteContainer>
          </PoseGroup>
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.object,
  history: PropTypes.object,
  drawerOptions: PropTypes.array,
  handlers: PropTypes.object,
  theme: PropTypes.object,
  location: PropTypes.object,
  // usuario: PropTypes.bool,
  usuario: PropTypes.object, 
  permisos: PropTypes.object,
  // colorNotificacion: PropTypes.string,
  // numeroNotificaciones: PropTypes.number,
  // animarNotificacion: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(dispatch);
}

const withConnect = connect(
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'layout', reducer });
const withActions = Actions.bindReduxStore();

export default compose(
  setDisplayName('Layout'),
  composeStateHandler(STATE, HANDLERS),
  withRouter,
  withReducer,
  defaultProps(DEFAULT_PROPS),
  mapProps(CUSTOM_HANDLERS),
  withStyles(STYLES, { withTheme: true }),
  withConnect,
  withActions,
)(Layout);
