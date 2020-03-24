import React from 'react';
import T from 'prop-types';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green'
import { compose } from 'redux';
import ComboMultiple from 'components/FiltroSeleccion';
import { withHandlers } from 'recompose';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { findIndex, uniq  } from 'lodash';
import TablaPermisos from '../TablaPermisos';
import ModalSalirAgregarFuncion from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    background: '#e2e2e2',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit * 1,
    top: theme.spacing.unit * 1,
    color: theme.palette.grey[500],
  },
  tio: {
    background: green[500], color: '#fff', marginTop: 30, float: "right",marginLeft:15,
    '&:disabled': {
      color: 'rgba(0, 0, 0, 0.26)',
      boxShadow: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
    '&:hover':{
      opacity: '0.8',
      transition: 'opacity ease-in-out 0.5s',
      backgroundColor: '#28950F',
    },
  },
  lista: {
    height: '100%',
    padding: 'unset',
  },
  combo: {
    display: 'inline-block',
    width: '50%',
    padding: '10px',
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 1,
  },
}))(MuiDialogActions);

let empresasRepetidas = [];

class ModalAddModulos extends React.Component {

  salirAgregarFuncion = () => {
    const { setStepperopenmodaladdAction, setOpenmodulosalirmodalAction, onChangeParametros, setIdRolEmpresaAction,} = this.props;
    onChangeParametros(1,[]);
    onChangeParametros(2,[]);
    setOpenmodulosalirmodalAction(false);
    setStepperopenmodaladdAction(false);
    setIdRolEmpresaAction(0);
  };

  cancelaSalirAgregarFuncion(){
    this.props.setOpenmodulosalirmodalAction(false);
  }

  agregarFuncionSinguardar(){
    const {
      setListadoAction,
      data,
      filterData,
      setVisualizatablaAction,
      setListadoFilterAction,
      setDatosGuardarAction,
      setSelectedAction,
      selected,
      actualizaPermisos,
      selectEmpresa,
      lista,
      notificacion, 
    } = this.props;
    
    if(!actualizaPermisos)
    { 
      const dataNueva = data.concat(selectEmpresa.map((empresa, index ) => {  

        const empresaSeleccionada =  filterData.filter(ele => (ele.IdEmpresa === empresa.value)).map(ele=> ({ IdRolEmpresa: ele.IdRolEmpresa, Nombre: ele.Nombre }));
        
        let idRolEmpresa = null;
        let nuevo = false;

        if(empresaSeleccionada.length > 0){
          empresasRepetidas.push(empresaSeleccionada[0]);
          idRolEmpresa = empresaSeleccionada[0].IdRolEmpresa;
        } else {
          idRolEmpresa = data.length + (index + 1)
          nuevo = true;
        }

        let modulos = '';

        lista.forEach(ele => {
          modulos += `${ele.label}, `;  
        })

        return {
          IdRolEmpresa: idRolEmpresa,
          IdEmpresa: empresa.value,
          Nombre: empresa.label,
          Modulos: modulos.slice(0, modulos.length - 2),
          Activo: true,
          Nuevo: nuevo,
          Opciones: lista,
          SelectEmpresa: selectEmpresa,
        }
      }));

      const rolGuardar = {
        empresas: dataNueva,
      }
      const idsEmpresas = rolGuardar.empresas.filter(ele => ele.Activo).map(ele => ele.IdEmpresa);
  
      const esDuplicado = uniq(idsEmpresas).length !== idsEmpresas.length;

      if(esDuplicado){
        
        let nombresEmpresas = '';

        empresasRepetidas.forEach(ele => {
          nombresEmpresas += `${ele.Nombre}, `
        })
        
        notificacion({
          message: `La(s) empresa(s) ${nombresEmpresas.slice(0, nombresEmpresas.length - 2)} ya está(n) dada(s) de alta, favor de checar sus permisos`,
          options: {
            variant: 'warning',
          },
        });

        empresasRepetidas = [];
        return;
      }

      setVisualizatablaAction(true);
      setListadoAction(dataNueva);
      setListadoFilterAction(dataNueva.filter(dato => dato.Activo));
      setDatosGuardarAction(rolGuardar);

    } else {
      const dataActualizar = data.filter(item => item.IdRolEmpresa === selected[0] )
      
      if(dataActualizar.length > 0){
        let modulos = '';

        lista.forEach(ele => {
          modulos += `${ele.label}, `;  
        })
        
        dataActualizar[0].Modulos = modulos.slice(0, modulos.length - 2);

        dataActualizar[0].Opciones = [
          ...lista,
        ];

        setDatosGuardarAction(dataActualizar[0]);
      }
    }

    this.salirAgregarFuncion();
    setSelectedAction([]);
  }

  componentDidMount(){
    const {
      actualizaPermisos,
      IdRol,
      getEmpresasAction,
      getModulosAction,
      onChangeParametros,
      filterData,
      selected,
      IdEmpresa,
      setSoloLecturaEmpresaAction,
    } = this.props;

    getEmpresasAction(IdEmpresa);
    getModulosAction();

    if(actualizaPermisos === true && IdRol > 0){
      const indexFilterData = findIndex(filterData, (o) => ( o.IdRolEmpresa ===  selected[0] ));

      const opciones = filterData[indexFilterData].Opciones;      
      const empresa =  filterData[indexFilterData].SelectEmpresa;
      
      onChangeParametros(2, opciones);
      onChangeParametros(1, empresa);

      if(filterData[indexFilterData].Activo === false){
        setSoloLecturaEmpresaAction(true);
      } else {
        setSoloLecturaEmpresaAction(false);

      }

    } else if(actualizaPermisos === true && IdRol === 0){
      const opciones = filterData[ (selected[0] - 1) ].Opciones;
      const empresa =  filterData[ (selected[0] - 1) ].SelectEmpresa;
 
      onChangeParametros(2, opciones);
      onChangeParametros(1, empresa);
    }
  }

  render() {
    const {
      openM,
      classes,
      openMensajeSalirFuncion,
      setOpenmodulosalirmodalAction,
      getEmpresas,
      selectEmpresa,
      onInputChangeProxy,
      getModulos,
      selectModulos,
      lista,
      handleClickListaProxy,
      setSelectedPermisosNormalesAction,
      setSelectedPermisosEspecialesAction,
      setOpenModalPermisosEspecialesAction,
      openModalAddModulo,
      IdRolEmpresa,
      actualizaPermisos,
      moduloSoloLecturaRol,
      moduloSoloLecturaEmpresa,
    } = this.props;
    let banderaAgregarPermisos = false;
    
    lista.forEach(modulos => {
      modulos.opciones.forEach(modulo => {
        if(modulo.permisosNormalesSeleccionados.length > 0 || modulo.permisosEspecialesSeleccionados.length > 0){
          banderaAgregarPermisos = true;
        }
      })
    })

    return (
      <Dialog
        onClose={() => setOpenmodulosalirmodalAction(true)}
        aria-labelledby="customized-dialog-title"
        open={openM}
        disableBackdropClick
        fullWidth
        maxWidth='lg'
      >
        <DialogTitle id="customized-dialog-title" onClose={() => setOpenmodulosalirmodalAction(true)}>
          Agregar permisos
        </DialogTitle>
        <DialogContent>
          <div className={classes.combo}>
            <ComboMultiple
              valor={selectEmpresa}
              onChange={onInputChangeProxy}
              opciones={getEmpresas}
              multiple
              campoValido
              requerido
              label='Empresa:'
              indice={1}
              inhabilitado={actualizaPermisos || moduloSoloLecturaRol}
            />
          </div>
          <div className={classes.combo}>
            <ComboMultiple
              valor={selectModulos}
              onChange={onInputChangeProxy}
              opciones={getModulos}
              multiple
              campoValido
              requerido
              label='Modulo:'
              indice={2}
              inhabilitado={moduloSoloLecturaRol || moduloSoloLecturaEmpresa}
            />
          </div>
          {
            selectModulos.length > 0 && 
              lista.map((ele, index) => 
                <Grid
                  item
                  key={`funciones-listado-${ele.value}`}
                >
                  <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.lista}
                  >
                    <ListItem 
                      button 
                      onClick={handleClickListaProxy(index, ele.value, IdRolEmpresa)} 
                      style={
                        {
                          backgroundColor: '#E0E0E0',
                        }
                      }
                    >
                      {ele.seleccionado ? <ExpandMore /> : <ChevronRight />}
                      <ListItemText primary={`Módulo: ${ele.label}`} />
                    </ListItem>                   
                    {<Collapse in={ele.seleccionado} timeout="auto" unmountOnExit>
                      <TablaPermisos
                        ele={ele}
                        setSelectedPermisosNormalesAction={setSelectedPermisosNormalesAction}
                        setSelectedPermisosEspecialesAction={setSelectedPermisosEspecialesAction}
                        setOpenModalPermisosEspecialesAction={setOpenModalPermisosEspecialesAction}
                        openModalAddModulo={openModalAddModulo}
                        moduloSoloLectura={moduloSoloLecturaRol}
                        moduloSoloLecturaEmpresa={moduloSoloLecturaEmpresa}
                      />
                    </Collapse>}
                  </List>
                </Grid>
              )
          }
          <ModalSalirAgregarFuncion 
            open={openMensajeSalirFuncion}
            typeAlert='Report'
            typeOptions='Select'
            title='Confirmar....'
            message='Existen datos no guardados, ¿Desea continuar?'
            onClickAccept={() => this.salirAgregarFuncion()}
            onClickCancel={() => this.cancelaSalirAgregarFuncion() }
          />
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            className={this.props.classes.tio}
            disabled={ (selectEmpresa.length === 0) || (selectModulos.length === 0) || (moduloSoloLecturaRol) || banderaAgregarPermisos === false }
            onClick={ 
              ()=>{this.agregarFuncionSinguardar()}}
          >
            {this.props.actualizaPermisos === false ? "Agregar": "Actualizar"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ModalAddModulos.propTypes = {
  classes: T.object,
  setStepperopenmodaladdAction: T.func,
  setOpenmodulosalirmodalAction: T.func,
  setListadoAction: T.func,
  data: T.array,
  setVisualizatablaAction: T.func,
  setListadoFilterAction: T.func,
  filterData: T.array,
  selected: T.array,
  actualizaPermisos: T.bool,
  IdRol:T.number,
  getEmpresasAction: T.func,
  openM : T.bool,
  openMensajeSalirFuncion: T.bool,
  getEmpresas: T.array,
  selectEmpresa: T.array,
  onInputChangeProxy: T.func,
  getModulos: T.array,
  selectModulos: T.array,
  getModulosAction:T.func,
  lista:T.array,
  handleClickListaProxy:T.func,
  onChangeParametros:T.func,
  setSelectedPermisosNormalesAction: T.func,
  setOpenModalPermisosEspecialesAction: T.func,
  openModalAddModulo: T.bool,
  setSelectedPermisosEspecialesAction: T.func,
  IdRolEmpresa: T.number,
  setDatosGuardarAction: T.func,
  setSelectedAction: T.func,
  IdEmpresa: T.number,
  setIdRolEmpresaAction: T.func,
  moduloSoloLecturaRol: T.bool,
  notificacion: T.func,
  moduloSoloLecturaEmpresa: T.bool,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => (id) => (e) => {
      const {
        onChangeParametros,
      } = props;
      if(id === 1)
        onChangeParametros(id, e);
      else if(id === 2)
        onChangeParametros(id, e);
      else
        onChangeParametros(id, e);
    },
    handleClickListaProxy: (props) => (idArray, idModulo, IdRolEmpresa) => () => {
      const {
        handleClickLista,
        getModuloFuncionAction,
        IdRol,
      } = props;
      getModuloFuncionAction({idModulo, IdRol, IdRolEmpresa});
      handleClickLista(idArray);
    },
  })
)(ModalAddModulos);