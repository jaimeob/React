import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ActivarIcon from '@material-ui/icons/CheckCircle';
import AgregarIcon from '@material-ui/icons/AddCircleOutline';
import DesactivarIcon from '@material-ui/icons/DeleteForever';
import DescargarIcon from '@material-ui/icons/CloudDownload';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CerrarIcon from '@material-ui/icons/Close';
import ListItemText from '@material-ui/core/ListItemText';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SearchIcon from '@material-ui/icons/Search';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
      }
      : {
        color: theme.palette.text.primary,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    display: 'flex',
    color: theme.palette.text.secondary,
    zIndex: 150,
  },
  title: {
    flex: '0 0 auto',
  },
  muilist: {
    top: 0,
    right: 65,
    zIndex: 150,
  },
  menuitem: {
    marginRight: 0,
  },
  activarIcon: {
    fill: '#28950F',
  },
  desactivarIcon: {
    fill: '#FF0023',
  },
  descargarIcon: {
    fill: '#F9AA33',
  },
  textField: {
    marginRight: 5,
    minWidth: 200,
  },
});
 
const EnhancedTableToolbar = props => {
  const { 
    numSelected,
    classes, 
    open, 
    handleToggle,
    handleMenuFiltros,
    handleSearchText,
    openSearch,
    searchText,
    handleToggleSearch,
    handleToggleMenuContextual,
    openMenuContextual,
    handleStepper,
    nuevaFuncion,
    handleActivarRegistros,
    stepper,
    download,
    handleMultipleDownload,
    moduloSoloLectura,
    permisos,
  } = props;
  
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Grow 
          appear={openSearch}
          timeout={300}
          in={openSearch}
        >
          <TextField 
            onChange={handleSearchText}
            className={classes.textField}
            value={searchText}
            placeholder="Realizar búsqueda"
          />
        </Grow> 
        <Tooltip title="Buscar">
          <IconButton aria-label="Buscar" onClick={handleToggleSearch} disabled={moduloSoloLectura}>
            { openSearch 
              ? ( <CerrarIcon /> ) 
              : ( <SearchIcon /> )
            }
          </IconButton>
        </Tooltip>
        <Tooltip title="Filtros">
          <IconButton aria-label="Filtros" onClick={handleToggle} disabled={moduloSoloLectura}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Popper open={open} transition disablePortal className={classes.muilist}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleToggle}>
                  <MenuList>
                    <MenuItem onClick={() => handleMenuFiltros(1)}>
                      <ListItemIcon className={classes.menuitem}>
                        <ActivarIcon className={classes.activarIcon} />
                      </ListItemIcon>
                      <ListItemText inset primary="Activos" />
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuFiltros(0)} >
                      <ListItemIcon className={classes.menuitem}>
                        <DesactivarIcon className={classes.desactivarIcon} />
                      </ListItemIcon>
                      <ListItemText inset primary="Inactivos" />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        { permisos.normales.registrar ===1 ?
          <Tooltip title="Agregar">
            <IconButton aria-label="Agregar" onClick={handleStepper}>
              <AgregarIcon />
            </IconButton>
          </Tooltip> 
          :null
        }

        { permisos.normales.eliminar ===1 || permisos.especiales.activar ===1 || permisos.especiales.descargararchivo === 1?
          <Tooltip title="Activar / Desactivar">
            <div>
              <IconButton aria-label="Activar / Desactivar" disabled={numSelected < 1}  onClick={handleToggleMenuContextual}>
                <MoreVertIcon />
              </IconButton>
              <Popper open={openMenuContextual} transition disablePortal className={classes.muilist}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleToggleMenuContextual}>
                        <MenuList>
                          {permisos.especiales.activar ===1 ?
                            <MenuItem onClick={() => handleActivarRegistros(1)}>
                              <ListItemIcon className={classes.menuitem}>
                                <ActivarIcon className={classes.activarIcon} />
                              </ListItemIcon>
                              <ListItemText inset primary="Activar" />
                            </MenuItem>
                            :null
                          }
                          {permisos.especiales.eliminar ===1 ?
                            <MenuItem onClick={() => handleActivarRegistros(0)}>
                              <ListItemIcon className={classes.menuitem}>
                                <DesactivarIcon className={classes.desactivarIcon} />
                              </ListItemIcon>
                              <ListItemText inset primary="Inactivar" />
                            </MenuItem>
                            :null
                          }
                          { permisos.especiales.descargararchivo === 1 && download === true ?
                            <MenuItem onClick={() => handleMultipleDownload()}>
                              <ListItemIcon className={classes.menuitem}>
                                <DescargarIcon className={classes.descargarIcon} />
                              </ListItemIcon>
                              <ListItemText inset primary="Descargar Archivos" />
                            </MenuItem>
                            :null
                          }
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Tooltip>
          :null
        }
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};
  
export default withStyles(toolbarStyles)(EnhancedTableToolbar);