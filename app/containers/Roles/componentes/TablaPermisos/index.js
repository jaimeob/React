import React from "react";
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import _ from 'lodash';

// Iconos
import LockIcon from '@material-ui/icons/Lock';

import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';

// eslint-disable-next-line react/prefer-stateless-function
export class TablaPermisos extends React.Component {

  handleToggleModalPermisosEspeciales = (value, indexOpcion) => {
    this.props.setOpenModalPermisosEspecialesAction({value, indexOpcion});
  }

  handleSelectAllClick = (event, value, indexOpcion) => {
    if (event.target.checked) {
      const newSelected = this.props.ele.opciones[indexOpcion].permisosNormales.map(permiso => permiso.nombrePermiso);
      this.props.setSelectedPermisosNormalesAction({newSelected, value, indexOpcion}); 

      return;
    }

    this.props.setSelectedPermisosNormalesAction({newSelected: [], value, indexOpcion}); 
  };

  handleSelectEspecialesAllClick = (event, value, indexOpcion) => {
    if (event.target.checked) {
      const newSelected = this.props.ele.opciones[indexOpcion].permisosEspeciales.map(permiso => permiso.idPermiso);
      this.props.setSelectedPermisosEspecialesAction({newSelected, value, indexOpcion}); 

      return;
    }

    this.props.setSelectedPermisosEspecialesAction({newSelected: [], value, indexOpcion}); 
  };

  handleClick = (nombrePermiso, value, indexOpcion) => {
    const { permisosNormalesSeleccionados: selected } = this.props.ele.opciones[indexOpcion];
 
    const selectedIndex = selected.indexOf(nombrePermiso);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nombrePermiso);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    
    this.props.setSelectedPermisosNormalesAction({newSelected, value, indexOpcion}); 
  };

  handleClickPermisoEspecial = (idPermiso, value, indexOpcion, indexPermisoEspecial) => {
    const { permisosEspecialesSeleccionados: selected } = this.props.ele.opciones[indexOpcion];
 
    const selectedIndex = selected.indexOf(idPermiso);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, idPermiso);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.props.setSelectedPermisosEspecialesAction({newSelected, value, indexOpcion, indexPermisoEspecial}); 
  }

  render(){
    const { 
      ele: {
        value,
        opciones = [],
      },
      classes,
      openModalAddModulo,
      moduloSoloLectura,
      moduloSoloLecturaEmpresa,
    } = this.props;
    
    return(
      <React.Fragment>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="left">Opción</TableCell>
              <TableCell className={classes.tableHead} align="center">Todos</TableCell>
              <TableCell className={classes.tableHead} align="center">Solo Lectura</TableCell>
              <TableCell className={classes.tableHead} align="center">Registrar</TableCell>
              <TableCell className={classes.tableHead} align="center">Editar</TableCell>
              <TableCell className={classes.tableHead} align="center">Eliminar</TableCell>
              <TableCell className={classes.tableHead} align="center">Especiales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {opciones.map((row, index) => {
              const isSelected = nombrePermiso => row.permisosNormalesSeleccionados.indexOf(nombrePermiso) !== -1;
              const isSelectedEspecial = idPermiso => row.permisosEspecialesSeleccionados.indexOf(idPermiso) !== -1;
              
              return (
                <React.Fragment key={`funcion-${row.funcionId}`}>
                  <TableRow> 
                    <TableCell 
                      component="th" 
                      scope="row"
                      className={classes.tableCell}
                    >
                      {row.nombreFuncion}
                    </TableCell>
                    <TableCell padding="none" align="center">
                      <Checkbox
                        indeterminate={null}
                        checked={row.permisosNormalesSeleccionados.length === row.permisosNormales.length}
                        onChange={(event) => this.handleSelectAllClick(event, value, index) }  
                        inputProps={{ "aria-label": "Select all desserts" }}
                        className={classes.checkbox}
                        disabled={moduloSoloLectura || moduloSoloLecturaEmpresa}
                      /> 
                    </TableCell>
                    {
                      row.permisosNormales.map(permiso => {
                        const permisoSeleccionado = isSelected(permiso.nombrePermiso);
                        return(
                          <TableCell padding="none" align="center" key={`permiso-${permiso.nombrePermiso}`}>
                            <Checkbox
                              indeterminate={null}
                              checked={permisoSeleccionado}
                              onChange={() => this.handleClick(permiso.nombrePermiso, value, index)}
                              inputProps={{ "aria-label": "Select all desserts" }}
                              className={classes.checkbox}
                              disabled={moduloSoloLectura || moduloSoloLecturaEmpresa}
                            /> 
                          </TableCell>
                        )
                      })
                    } 
                    <TableCell padding="none" align="center" className={classes.lockCell}>
                      <Button
                        disabled={row.permisoEspecial === 0}
                        onClick={() => this.handleToggleModalPermisosEspeciales(value, index)}
                        className={classes.lock}
                      >
                        <LockIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <Dialog
                    open={row.abrirModalPermisosEspeciales}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                  >
                    <DialogTitle 
                      className={classes.titulo}
                      id="alert-dialog-title"
                    >
                      Asignar Permisos Especiales
                      <IconButton 
                        aria-label="Close"
                        className={classes.closeButton}
                        onClick={() => this.handleToggleModalPermisosEspeciales(value, index)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                      <List>
                        <ListItem>
                          <Checkbox
                            indeterminate={null}
                            checked={row.permisosEspecialesSeleccionados.length === row.permisosEspeciales.length}
                            onChange={(event) => this.handleSelectEspecialesAllClick(event, value, index) }  
                            inputProps={{ "aria-label": "Select all desserts" }}
                            className={classes.checkbox}
                            disabled={moduloSoloLectura || moduloSoloLecturaEmpresa}
                          />
                          <span className={classes.permisoEspecialNombre}>Todos</span>
                        </ListItem>
                        {
                          row.permisosEspeciales.map((permisoEspecial, indexPermisoEspecial) => {
                            const permisoSeleccionado = isSelectedEspecial(permisoEspecial.idPermiso);
                            return (
                              <ListItem key={_.uniqueId('permiso_especial_')}>
                                <Checkbox
                                  indeterminate={null}
                                  checked={permisoSeleccionado}
                                  inputProps={{ "aria-label": "Select all desserts" }}
                                  className={classes.checkbox}
                                  onChange={() => this.handleClickPermisoEspecial(permisoEspecial.idPermiso, value, index, indexPermisoEspecial)}
                                  disabled={moduloSoloLectura || moduloSoloLecturaEmpresa}
                                />
                                <span className={classes.permisoEspecialNombre}>{permisoEspecial.nombrePermiso}</span>
                              </ListItem>
                            )
                          })
                        }
                      </List>
                    </DialogContent>
                    <DialogActions className={classes.dialogActions}>
                      <Button 
                        variant="contained"
                        className={classes.botonAsignar}
                        onClick={() => this.handleToggleModalPermisosEspeciales(value, index)}
                        disabled={moduloSoloLectura || moduloSoloLecturaEmpresa}
                      >
                        Asignar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
        <Modal 
          open={openModalAddModulo}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message='Existen datos no guardados, ¿Desea continuar?'
          onClickAccept={() => this.salirModulo()}
          onClickCancel={() => this.cancelaSalirModulo() }
        />
      </React.Fragment>
    )
  }
}

TablaPermisos.propTypes = {
  classes: T.object,
  ele: T.object,
  opciones: T.array,
  setSelectedPermisosNormalesAction: T.func,
  setSelectedPermisosEspecialesAction: T.func,
  setOpenModalPermisosEspecialesAction: T.func,
  openModalAddModulo: T.bool,
  permisosEspecialesSeleccionados: T.array,
  moduloSoloLectura: T.bool,
  moduloSoloLecturaEmpresa: T.bool,
};

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  table: {
    minWidth: 650,
  },
  tableHead: {
    padding: '0',
    color: '#263238',
    '&:first-child': {
      paddingLeft: '24px',
    },
  },
  tableCell: {
    paddingLeft: '24px !important',
  },
  checkbox: {
    padding: 0,
    color: '#28950F !important',
  },
  lockCell: {
    paddingRight: '24px !important',
  },
  lock:{
    color: '#9d9d9d',
    cursor: 'pointer',
    '&:hover': {
      color:'#28950F',
    },
  },
  titulo: {
    backgroundColor: '#eeeeee',
    position: 'relative',
  },
  botonAsignar: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      backgroundColor:'#28950F',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit * 1,
    top: theme.spacing.unit * 2,
    color: theme.palette.grey[500],
  },
  dialogContent: {
    paddingTop: '24px',
  },
  dialogActions: {
    borderTop: '1px solid #e7e7e7',
    paddingTop: '10px',
  },
  permisoEspecialNombre: {
    marginLeft: '20px',
  },
});

export default compose(
  withStyles(styles),
)(TablaPermisos);
