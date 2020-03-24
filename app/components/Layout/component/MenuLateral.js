/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import uniqueId from 'lodash/uniqueId'; 
import T from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Divider, Typography } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ArrowRight from '@material-ui/icons/KeyboardArrowRight'
import clsx from 'clsx';
import StarBorder from '@material-ui/icons/StarBorder';
import Stars from '@material-ui/icons/Stars';
import Star from '@material-ui/icons/Star';
import { findIndex, uniq } from 'lodash';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import UserIcon from 'images/iconos/user.png';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Animate } from 'react-simple-animate';
import Procesos from '../../../images/iconos/Procesos.svg';
import Reportes from '../../../images/iconos/Reportes.svg';
import Catalogos from '../../../images/iconos/Catalogo.svg';
import FavoritosRPT from '../../../images/iconos/FavoritosRPT.svg';
import FavoritosCat from '../../../images/iconos/FavoritosCat.svg';
import FavoritoProcesos from '../../../images/iconos/FavoritoProcesos.svg';
import { getUsuarioConfiguracion, setUsuarioFavoritos, obtenerPermisos } from '../../../services/api';
import './styles.css';

function MenuLateral(props){
  const [ openMenuLateral, setToggleMenuLateral ] = useState(true);
  const [ openMenuFavoritos, setToggleOpenMenuFavoritos ] = useState(false);
  const [ selectedEmpresa, setEmpresaSelected ] = useState([]);
  const [ selectedModulo, setModuloSelected ] = useState([]);
  const [ selectedFuncion, setSelectedFuncion ] = useState(null);

  const [ selectedTipoAgrupador, setTipoAgrupadorSelected ] = useState([]);
  const [ selectedTipoAgrupadorFavoritos, setTipoAgrupadorFavoritosSelected ] = useState([]);

  const [ configuracion, setConfiguracion ] = useState([]);
  const [ favoritos, setFavoritos] = useState([]);

  const {
    classes,
    drawerOptions,
    // handleClickOption,
    usuario: {
      Imagen,
      Nombre,
      UsuarioId: usuarioId,
    },
    dispatch,
  } = props;
  
  // Similar a componentDidMount y componentDidUpdate
  useEffect(() => {
    if(openMenuLateral){
      document.getElementById('root-layout').style.width = 'calc(100% - 240px)';
    } else {
      document.getElementById('root-layout').style.width = '100%';
    }

    // Consultar configuración del usuario
    getUsuarioConfiguracion(usuarioId)
      .then(({status, data = []}) => {
        if(status === 200){
          setConfiguracion([...data.configuracion]);
          setFavoritos([...data.favoritos]);
        }
      }).catch(() => {
        dispatch(enqueueSnackbar({
          message: 'No se ha obtenido la configuración del usuario',
          options: {
            variant: 'error',
          },
        }))
      });
  }, []);

  function handleClickOption(url = '', empresaId = 0, idModulo = 0, funcionId = 0, state = null, idRolEmpresa = null){
    if(idModulo !== 0 && funcionId !== 0){
      // const idRolEmpresa = configuracion.filter(empresa => empresa.empresaId === empresaId).map(empresa => empresa.idRolEmpresa);
      setSelectedFuncion(funcionId);
      const payload = {
        // idRolEmpresa: idRolEmpresa[0],
        idRolEmpresa,
        idModulo,
        funcionId,
        idUsuario: usuarioId,
      }
      /*
      dispatch({
        type: 'boilerplate/App/SET_ROL_PERMISO_FUNCION',
        payload,
      });
      */
      obtenerPermisos(payload).then(({status, data = []}) => {
       
        if(status === 200){
          /*
          dispatch({
            type: 'boilerplate/App/SET_PERMISOS',
            payload: data.permisos,
          });
*/
          localStorage.setItem('permisos',JSON.stringify(data.permisos));

        }
        
      }).catch(() => {
        dispatch(enqueueSnackbar({
          message: 'Error al consultar los permisos del usuario',
          options: {
            variant: 'error',
          },
        }))
      });
    }

    if (url !== '' && props.history.location.pathname !== url) {
      props.history.push(url, state)
    }
  } 
  
  function handleClick(event, arraySelected, functionSelected, id, idModulo = 0, idEmpresa = 0) {
   
    const selectedIndex = arraySelected.indexOf(id+idModulo+idEmpresa);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(arraySelected, id+idModulo+idEmpresa);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(arraySelected.slice(1));
    } else if (selectedIndex === arraySelected.length - 1) {
      newSelected = newSelected.concat(arraySelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        arraySelected.slice(0, selectedIndex),
        arraySelected.slice(selectedIndex + 1),
      );
    }

    functionSelected(uniq(newSelected));
  }

  function renderIconoEmpresa(iconoEmpresa){
    if(iconoEmpresa !== ''){
      return iconoEmpresa;
    }

    return MenuIcon;
  }

  function renderIconoModulos(indexEmpresa, indexModulo){
    const modulo =  configuracion[indexEmpresa].modulos[indexModulo];
    const icono = drawerOptions.filter(option => modulo.moduloId === option.idModulo).map(option => option.MUIIcon);

    return icono.length > 0 ? icono[0] : <DashboardIcon className={classes.muiListItemImage} />;
  }

  function renderIconoTipoAgrupador(tipoAgrupadorId){
    switch(tipoAgrupadorId){
      case 1:
        return Catalogos;
      case 2:
        return Procesos;
      case 3:
        return Reportes;
      default:
        return DashboardIcon
    }
  }

  function handleStateReportes(url){
    const opcion = drawerOptions.filter(option => option.url === url);
    let idReporte = null;
   
    if(opcion.length > 0){
      if('state' in opcion[0]){
        idReporte = opcion[0].state;
      }
    }
    return idReporte;
  }

  // eslint-disable-next-line no-shadow
  function setUsuarioFavoritosAction({usuarioId, empresaId, moduloId, tipoAgrupadorId: idTipoAgrupador, funcionId: idFuncion, favorito}){
  
    setUsuarioFavoritos({usuarioId, empresaId, moduloId, idTipoAgrupador, idFuncion, favorito})
      .then(({status, data = []}) => {

        if(status === 200 && data.recordset.length > 0){
          
          if(data.recordset[0].totalFavoritos < 1){
           
            const indexEmpresa =  findIndex(configuracion, (empresa) => ( empresa.empresaId === empresaId ));
            const indexModulo = findIndex(configuracion[indexEmpresa].modulos, (modulo) => ( modulo.moduloId === moduloId ));
            const indexTipoAgrupador = findIndex(configuracion[indexEmpresa].modulos[indexModulo].tipoAgrupador, (tipoA) => ( tipoA.tipoAgrupadorId === idTipoAgrupador ))
            const indexFuncion = findIndex(configuracion[indexEmpresa].modulos[indexModulo].tipoAgrupador[indexTipoAgrupador].funciones, (funcion) => ( funcion.funcionId === idFuncion ))
            
            configuracion[indexEmpresa].modulos[indexModulo].tipoAgrupador[indexTipoAgrupador].funciones[indexFuncion].favorito = !favorito;

            const nuevaConfiguracion = [
              ...configuracion,
            ]

            setConfiguracion(nuevaConfiguracion);

            const indexTipoAgrupadorFavoritos = findIndex(favoritos, (fav) => ( fav.tipoAgrupadorId === idTipoAgrupador ));
            const funcionesTipoAgrupador = favoritos[indexTipoAgrupadorFavoritos].funciones;
            const indexFuncionFavoritos =  findIndex(funcionesTipoAgrupador, (funcion) => ( funcion.funcionId === idFuncion ));
            
            favoritos[indexTipoAgrupadorFavoritos].funciones[indexFuncionFavoritos].favorito = !favorito;

            const nuevosFavoritos = [
              ...favoritos,
            ]

            setFavoritos(nuevosFavoritos);
            
          } else {
            dispatch(
              enqueueSnackbar({
                message: 'Haz agregado el límite de (5) favoritos',
                options: {
                  variant: 'warning',
                },
              })
            );
          }
        }

      })
      .catch(() => {
        dispatch(enqueueSnackbar({
          message: 'Error al guardar favoritos',
          options: {
            variant: 'error',
          },
        }))
      })
  }

  function renderFunciones({funcionId, nombreFuncion, url, favorito, state = null, idRolEmpresa}, indexFuncion, indexTipoA,  empresaId, moduloId, tipoAgrupadorId){
    
    const params = {
      usuarioId,
      empresaId,
      moduloId,
      tipoAgrupadorId,
      funcionId,
      favorito,
    }
    
    state = handleStateReportes(url);

    return (
      <ListItem 
        button 
        // className={classes.nested}
        className={clsx(classes.nested, {[classes.muiListItemSelected]: selectedFuncion === funcionId })}
        key={uniqueId('funcion_')}
        onClick={() => handleClickOption(url, empresaId, moduloId, funcionId, state, idRolEmpresa)}
      >
        <ListItemIcon className={classes.muiListItemIcon}>
          <StarBorder 
            className={clsx(classes.estrella, { [classes.selectedFunction]: favorito })}
            onClick={() => setUsuarioFavoritosAction(params)}
          />
        </ListItemIcon>
        <ListItemText
          style={{...styles.muiListItemText, color: favorito ? '#f9aa33' : '#f0f0f0', fontSize: 11, padding: 0 }} 
          disableTypography
          primary={nombreFuncion}
        />
      </ListItem>
    )
  }

  function renderTipoAgrupador({tipoAgrupadorId = null, nombreAgrupador = '', funciones = []}, indexTipoA, indexModulo, empresaId, moduloId){
    return(
      <React.Fragment key={uniqueId('tipo-agrupador_')}>
        <ListItem
          button
          onClick={event => handleClick(event, selectedTipoAgrupador, setTipoAgrupadorSelected, tipoAgrupadorId, moduloId, empresaId)}          
          className={classes.nested}
        >
          <img
            src=
              {
                renderIconoTipoAgrupador(tipoAgrupadorId)
              }
            className={clsx([classes.muiListItemImage, classes.muiListItemIconTipoAgrupador])}
            alt="Icono tipoagrupador"
          />
          <ListItemText
            className={classes.muiListItemText}
            disableTypography
            primary={nombreAgrupador}
          />
          <ArrowRight className={clsx(classes.arrow, { [classes.arrowShift]: selectedTipoAgrupador.includes(tipoAgrupadorId+moduloId+empresaId) })} />
        </ListItem> 
        <Collapse in={selectedTipoAgrupador.includes(tipoAgrupadorId+moduloId+empresaId)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {
              funciones.map( (funcion, indexFuncion) => renderFunciones(funcion, indexFuncion, indexTipoA, empresaId, moduloId, tipoAgrupadorId) )              
            }
          </List>
        </Collapse>
      </React.Fragment>
    )
  }

  function renderModulos({moduloId = null, nombreModulo = '', tipoAgrupador = []}, indexModulo, indexEmpresa, empresaId){
    return(
      <React.Fragment key={uniqueId('modulo_')}>
        <ListItem 
          button 
          onClick={event => handleClick(event, selectedModulo, setModuloSelected, moduloId)}          
          // className={classes.nested}
          className={clsx(classes.nested, {[classes.muiListItemSelected]: selectedModulo.includes(moduloId) })}

        >
          <ListItemIcon className={clsx([classes.muiListItemIcon, classes.muiListItemIconModulo])}>
            {
              renderIconoModulos(indexEmpresa, indexModulo)
            }
          </ListItemIcon>
          <ListItemText
            className={classes.muiListItemText}
            disableTypography
            primary={nombreModulo}
          />
          <ArrowRight className={clsx(classes.arrow, { [classes.arrowShift]: selectedModulo.includes(moduloId) })} />
        </ListItem>
        <Collapse in={selectedModulo.includes(moduloId)}  timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {
              tipoAgrupador.map( (tipoA, indexTipoA) => renderTipoAgrupador(tipoA, indexTipoA, indexModulo, empresaId, moduloId) )
            }
          </List>
        </Collapse>
      </React.Fragment>
    )    
  }

  function renderEmpresas({ empresaId = null, nombre = '', modulos = [], iconoEmpresa}, indexEmpresa){
    return(
      <React.Fragment key={uniqueId('empresa_')}>
        <ListItem
          button
          onClick={event => handleClick(event, selectedEmpresa, setEmpresaSelected, empresaId)}
          className={classes.muiListItem}
        >
          <img 
            src={renderIconoEmpresa(iconoEmpresa)}
            alt={nombre}
            className={ clsx([classes.muiListItemImage, classes.muiListItemImageEmpresa]) }
          />
          <ListItemText
            className={classes.muiListItemText}
            disableTypography
            primary={nombre}
          />
        </ListItem>
        <Collapse 
          in={selectedEmpresa.includes(empresaId)}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {
              modulos.map( (modulo, indexModulo) => renderModulos(modulo, indexModulo, indexEmpresa, empresaId) )
            }
          </List>
        </Collapse>
      </React.Fragment>
    )
  }

  function renderUsuarioImagen(imagenUsuario){
    try {
      return imagenUsuario;
    } catch(e){
      return UserIcon;
    }
  }

  function renderUsuarioBienvenida(){
    return (
      <List className={classes.muiList}>
        <ListItem>
          <ListItemText 
            disableTypography
            className={classes.muiListItemText}
            primary={
              <div className={classes.wrapBienvenida}>
                <div className={classes.wrapImagen}>
                  <img
                    src=
                      { 
                        Imagen === '' 
                          ? UserIcon 
                          : renderUsuarioImagen(Imagen)
                      }
                    className={classes.userIcon}
                    alt="Usuario - avatar"
                  />
                </div>
                <div>
                  <Typography variant="h6" className={classes.muiTypography}>Bienvenid@</Typography>
                  <Typography variant="h6" className={classes.nombreUsuario}>{Nombre}</Typography>
                </div>
              </div>
            }
          />
        </ListItem>
        <Divider className={classes.divider}/>
      </List>
    )
  }

  function renderTipoAgrupadorFavoritos(tipoAgrupadorId){
    switch(tipoAgrupadorId){
      case 1:
        return FavoritosCat;
      case 2:
        return FavoritoProcesos;
      case 3:
        return FavoritosRPT;
      default:
        return DashboardIcon
    }
  }

  function renderFuncionesFavoritos({funcionId, url, empresaId, moduloId, nombreFuncion, state = null, idRolEmpresa}){
    return (
      <List component="div" disablePadding key={uniqueId('funciones-favoritos_')}>
        <ListItem
          button
          className={classes.nested}
          onClick={() => handleClickOption(url, empresaId, moduloId, funcionId, state, idRolEmpresa)}
        >
          <ListItemIcon className={ clsx([classes.muiListItemIcon, classes.muiListItemIconTipoAgrupador]) }>
            <Star className={classes.muiListItemImage} />
          </ListItemIcon>
          <ListItemText
            className={classes.muiListItemText}
            disableTypography
            primary={nombreFuncion}
          />
        </ListItem>
      </List>
    )
  }

  function renderFavoritos({tipoAgrupadorId, nombre, funciones}){
    return(
      <List 
        component="div"
        disablePadding 
        key={uniqueId('favoritos_')}
      >
        <ListItem
          button
          className={classes.nested}
          onClick={event => handleClick(event, selectedTipoAgrupadorFavoritos, setTipoAgrupadorFavoritosSelected, tipoAgrupadorId)}
        >
          <img 
            src= {
              renderTipoAgrupadorFavoritos(tipoAgrupadorId)
            } 
            alt={nombre}
            className={clsx([classes.muiListItemImage, classes.muiListItemIconModulo])}
          />
          <ListItemText
            className={classes.muiListItemText}
            disableTypography
            primary={nombre}
          />
        </ListItem>
        <Collapse in={selectedTipoAgrupadorFavoritos.includes(tipoAgrupadorId)} timeout="auto" unmountOnExit>
          {
            funciones.filter(funcion => funcion.favorito).map(renderFuncionesFavoritos)
          }
        </Collapse>
      </List>
    )
  }

  function renderUsuarioFavoritosCabecera(){
    return (
      <List className={classes.muiList}>
        <ListItem
          button
          className={classes.muiListItemFavoritosCabecera}
          onClick={() => setToggleOpenMenuFavoritos(!openMenuFavoritos)}
        >
          <ListItemIcon className={classes.muiListItemIcon}>
            <Stars className={ clsx([classes.muiListItemImage, classes.muiListItemImageEmpresa]) }/>
          </ListItemIcon>
          <ListItemText
            className={classes.muiListItemText}
            disableTypography
            primary="Favoritos"
          />
        </ListItem>
        <Collapse in={openMenuFavoritos} timeout="auto" unmountOnExit>
          {
            favoritos.map(renderFavoritos)
          }
        </Collapse>
        <Divider className={classes.divider}/>
      </List>
    )
  }

  return (
    <React.Fragment>
      <IconButton 
        color="inherit"
        className={classes.menuBoton} 
        onClick={() => {
          setToggleMenuLateral(!openMenuLateral)

          if(!openMenuLateral){
            document.getElementById('root-layout').style.width = 'calc(100% - 240px)';
          } else {
            document.getElementById('root-layout').style.width = '100%';
          }
        }}
      >
        <MenuIcon />
      </IconButton>
      {
        <Animate
          play={openMenuLateral} // Toggle when animation should start
          duration={0.3}
          start={{ transform: 'translateX(-280px)' }}
          end={{ transform: 'translateX(0px)' }}
        >
          <div className={classes.menuLateral} >
            {
              renderUsuarioBienvenida()
            }
            {
              renderUsuarioFavoritosCabecera()
            }
            {
              configuracion.map(renderEmpresas)
            }
          </div>
        </Animate>
      }
    </React.Fragment>
  );
}

MenuLateral.propTypes = {
  drawerOptions: T.array,
  usuario: T.object,
  // handleClickOption: T.func,
  dispatch: T.func,
  classes: T.object,
  history: T.object,
}

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  menuLateral: {
    backgroundColor: '#4a6572',
    width: '240px',
    position: 'absolute',
    left: '-24px',
    height: 'calc(100vh - 64px)',
    top: '8px',
    overflowX: 'auto',
  },
  menuBoton: {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'rotate(90deg) !important',
    },
  },
  muiList: {
    backgroundColor: '#4A6572',
    padding: '0',
  },
  divider:{
    backgroundColor: '#f0f0f0',
  },
  muiListItem: {
    borderBottom: '1px solid #f0f0f0',
    minHeight: 46,
    padding: 0,  
  },
  muiListItemSelected: {
    backgroundColor: '#728791',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    '&:hover': {
      backgroundColor: '#728791',
    },
  },
  muiListItemFavoritosCabecera:{
    borderBottom: 'none',
    minHeight: 46,
    padding: 0,
  },
  muiListItemImage: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  muiListItemImageEmpresa: {
    marginLeft: 8,
  },
  estrella: {
    width: 18,
    height: 18,
    marginLeft: 20,
  },
  muiListItemText: {
    color: '#f0f0f0',
    fontFamily: 'Roboto',
    padding: 0,
    fontSize: '11px',
  },
  nested: {
    minHeight: 46,
    padding: 0,
  },
  muiListItemIcon: {
    color: '#BFBFBF',
    marginRight: '5px',
  },
  muiListItemIconModulo: {
    marginLeft: 12,
  },
  muiListItemIconTipoAgrupador: {
    marginLeft: 16,
  },
  arrow: {
    transition: 'all 0.3 ease', 
    marginRight: 10,
  },
  arrowShift: {
    transform: 'rotate(90deg)',
    transition: 'all 0.3 ease',
  },
  selectedFunction: {
    color: '#f9aa33',
  },
  wrapBienvenida: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#4a6572',
  },
  wrapImagen: {
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  muiTypography: {
    color: '#f0f0f0',
  },
  nombreUsuario: {
    color: '#f0f0f0',
    fontSize: '11px',
  },
  userIcon: {
    borderRadius: '50%',
    height: '50px',
    width: '50px',
  },
})

export default connect()(withStyles(styles)(MenuLateral))
