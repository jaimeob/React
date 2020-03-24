import React from 'react';
import T from 'prop-types';
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
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { compose } from 'redux';
import Success from 'components/BotonSuccess';
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
  btn: {
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

class ModalAddModulos extends React.Component {
  
  salirAgregarFuncion = () => {
    const { setStepperaddmoduloAction,setTipoagrupadoresAction,tipoAgrupador,
      setUrlfuncionAction,urlFuncion,setTextfieldnombrefuncionTextAction,setOpenmodulosalirfuncionAction,
      setActualizafuncionAction,setSelectedAction,setModalfuncionesdisableAction,
    } = this.props;
    setOpenmodulosalirfuncionAction(false);
    setModalfuncionesdisableAction(false);
    setSelectedAction([]);
    setStepperaddmoduloAction(false);
    setTipoagrupadoresAction(tipoAgrupador,tipoAgrupador);
    setTextfieldnombrefuncionTextAction("");
    setActualizafuncionAction(false);
    setUrlfuncionAction(urlFuncion,urlFuncion);
  };

  cancelaSalirAgregarFuncion(){
    this.props.setOpenmodulosalirfuncionAction(false);
  }

  agregarFuncionSinguardar(IdModulo,tipoAgrupadorSlc,tipoAgrupador,textFieldNombreFuncion,urlFuncion,urlFuncionSlc,usuario){
    const {setListadoAction,data,setVisualizatablaAction,setListadoFilterAction,
      setDatosguardarAction,filterData,selected,actualizaFuncion} 
  = this.props;

    const agrupador = tipoAgrupador.filter((tipoagrupador) => 
      tipoagrupador.TipoAgrupadorId=== parseInt(tipoAgrupadorSlc,10));
    
    const url = urlFuncion.filter((urlfuncion) => 
      urlfuncion.URLFuncionId=== parseInt(urlFuncionSlc,10));

    let idVirtualFuncion=0;
    
    if(data.length>0){
      const arreglo = data[data.length-1];
      idVirtualFuncion = arreglo.FuncionId+1;
    } else{
      idVirtualFuncion=1;
    }
    if(!actualizaFuncion)
    {
    
      const dataGuardar = [{
        'FuncionId' : idVirtualFuncion,     
        'idModulo':IdModulo,
        'IdTipoAgrupador':tipoAgrupadorSlc,
        'NombreFuncion' : textFieldNombreFuncion,
        'IdURLFuncion':urlFuncionSlc,
        'UsuarioCreacion':usuario,
      }];
      let datosGuardar = JSON.parse(JSON.stringify(dataGuardar));

      const dataGrid = [{
        'FuncionId' : idVirtualFuncion,
        'NombreAgrupador':agrupador[0].NombreAgrupador,
        'NombreFuncion' : textFieldNombreFuncion,
        'URL' : url[0].URL,
        'Activo' : true,
        'Acciones':'',
      }];

      let datosGrid = JSON.parse(JSON.stringify(dataGrid));

      const datafull = [{
        'FuncionId' : idVirtualFuncion,
        'NombreAgrupador':agrupador[0].NombreAgrupador,
        'NombreFuncion' : textFieldNombreFuncion,
        'URL' : url[0].URL,
        'Activo' : true,
        'IdTipoAgrupador':tipoAgrupadorSlc,
        'IdURLFuncion':urlFuncionSlc,
        'Modulos':1,
      }];
          
      let datosFull = JSON.parse(JSON.stringify(datafull));
          
      if(data.length>0) {
        datosFull = data.concat(datosFull);
      }

      if(this.props.datosGuardar.length>0) {
        datosGuardar = this.props.datosGuardar.concat(datosGuardar);
      }
          
      if(filterData.length > 0 ){ 
        datosGrid = filterData.concat(datosGrid);
      }
      
      
      setVisualizatablaAction(true);
      setListadoAction(datosFull);
      setListadoFilterAction(datosGrid);
      setDatosguardarAction(datosGuardar);
      this.salirAgregarFuncion();
    }else{

      let datosActualizados = filterData.filter((funcion) => 
        funcion.FuncionId !== selected[0]);
      
      const datoGuarda = this.props.datosGuardar.filter((funcion) => 
        funcion.FuncionId !== selected[0]);

      let dataActualizados;
      if(IdModulo>0){
        
        dataActualizados = data.filter((funcion) => 
          funcion.FuncionId !== selected[0]);
        
        datosActualizados = dataActualizados.map((funciones) => (
          {
            'FuncionId': funciones.FuncionId,
            'NombreAgrupador': funciones.NombreAgrupador,
            'NombreFuncion': funciones.NombreFuncion,
            'URL': funciones.URL,
            'Activo': funciones.Activo,
          })
        )
      }else{
        dataActualizados={}
      }
      setListadoAction([]);
      setListadoFilterAction([]);

      const dataGrid = [{
        'FuncionId' : selected[0],
        'NombreAgrupador':agrupador[0].NombreAgrupador,
        'NombreFuncion' : textFieldNombreFuncion,
        'URL' : url[0].URL,
        'Activo' : true,
        'Acciones':'',
      }];

      let datosGrids = JSON.parse(JSON.stringify(dataGrid));

      const dataGuardar = [{
        'FuncionId' : selected[0],     
        'idModulo':IdModulo,
        'IdTipoAgrupador':tipoAgrupadorSlc,
        'NombreFuncion' : textFieldNombreFuncion,
        'IdURLFuncion':urlFuncionSlc,
        'UsuarioCreacion':usuario,
      }];
      let datosGuardar = JSON.parse(JSON.stringify(dataGuardar));

      const datafull = [{
        'FuncionId' : selected[0],
        'NombreAgrupador':agrupador[0].NombreAgrupador,
        'NombreFuncion' : textFieldNombreFuncion,
        'URL' : url[0].URL,
        'Activo' : true,
        'IdTipoAgrupador':tipoAgrupadorSlc,
        'IdURLFuncion':urlFuncionSlc,
        'Modulos':1,
      }];
      
      let datosFull = JSON.parse(JSON.stringify(datafull));
      
      if(dataActualizados.length>0) {
        datosFull = dataActualizados.concat(datosFull);
      }

      if(datoGuarda.length>0) {
        datosGuardar = datoGuarda.concat(datosGuardar);
      }

      datosGrids = datosGrids.concat(datosActualizados);
      
      datosGrids=datosGrids.sort((a, b)=> 
        (a.FuncionId - b.FuncionId)
      )
      setListadoAction(datosFull);
      setListadoFilterAction(datosGrids.filter((datos) => datos.Activo));
      setDatosguardarAction(datosGuardar);
      this.salirAgregarFuncion();
    }

  }

  validarNumLetras(e) {
    if (!/[^0-9a-zA-Z-ñÑáéíóúÁÉÍÓÚ\s]+/.test(e.target.value)) {
      const { setTextfieldnombrefuncionTextAction} = this.props;
      if(e.target.name==="nombreFuncion"){
        setTextfieldnombrefuncionTextAction(e.target.value);
      } 
    } 
  }

  componentDidMount(){
    const {setSelecturlfuncionAction,setTextfieldnombrefuncionTextAction,getTipoagrupadoresAction,
      getUrlfuncionAction,actualizaFuncion,selected,data,
      setSelecttipoagrupadorAction,datosGuardar,IdModulo} 
      = this.props;
    setTextfieldnombrefuncionTextAction("");
    getTipoagrupadoresAction();
    getUrlfuncionAction();
    let datos;
    if(actualizaFuncion===true && IdModulo>0){
      // console.log('data',data);
      // console.log('selected[0]',selected[0]);
      datos = data.filter((datosFiltro) => 
        datosFiltro.FuncionId === selected[0]);
      // console.log('datos',datos);
      setSelecttipoagrupadorAction(datos[0].IdTipoAgrupador);
      setTextfieldnombrefuncionTextAction(datos[0].NombreFuncion);
      setSelecturlfuncionAction(datos[0].IdURLFuncion);
    } else if(actualizaFuncion===true && this.props.IdModulo===0){
      if(datosGuardar.length>0){
        datos = datosGuardar.filter((datosFiltro) => 
          datosFiltro.FuncionId=== selected[0]);
      } else {
        datos = data.filter((datosFiltro) => 
          datosFiltro.FuncionId=== selected[0]);
      }
      setSelecttipoagrupadorAction(datos[0].IdTipoAgrupador);
      setTextfieldnombrefuncionTextAction(datos[0].NombreFuncion);
      setSelecturlfuncionAction(datos[0].IdURLFuncion);
    }
  }

  render() {
    const {
      openM,
      textFieldNombreFuncion,
      tipoAgrupador,
      setTipoagrupadoresAction,
      tipoAgrupadorSlc,
      urlFuncion,
      urlFuncionSlc,
      setUrlfuncionAction,
      usuario,
      labelTipoAgrupador,
      labelNombreFuncion,
      labelUrlFuncion,
      openMensajeSalirFuncion,
      setOpenmodulosalirfuncionAction,
      IdModulo,
      modalFuncionesDisable,
    } = this.props;

    return (
      <div>
        <Dialog
          onClose={() => setOpenmodulosalirfuncionAction(true)}
          aria-labelledby="customized-dialog-title"
          open={openM}
          disableBackdropClick
        >
          <div style={{width: 500, maxWidth: 500}}>
            <DialogTitle style={{backgroundColor:'red'}} id="customized-dialog-title" onClose={() => setOpenmodulosalirfuncionAction(true)}>
            Agregar función
            </DialogTitle>
            <DialogContent>
              <TextField
                id="tipoAgrupador"
                select
                label="Tipo agrupador"
                margin="normal"
                fullWidth
                onChange={setTipoagrupadoresAction}
                value={tipoAgrupadorSlc}
                disabled={modalFuncionesDisable}
                name="tipoAgrupador"
                helperText={labelTipoAgrupador}
              >
                {tipoAgrupador.map(tipoagrupador => (
                  <MenuItem key={tipoagrupador.TipoAgrupadorId} value={tipoagrupador.TipoAgrupadorId}>
                    {tipoagrupador.NombreAgrupador}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="nombreFuncion"
                label="Nombre función"
                onChange={(e) => this.validarNumLetras(e) }
                type="text"
                fullWidth
                margin="normal"
                name="nombreFuncion"
                disabled={modalFuncionesDisable}
                value={textFieldNombreFuncion}
                inputProps={{ maxLength: 50}}
                helperText={labelNombreFuncion}
              />
              <TextField
                style={{marginTop:0}}
                id="standard-select-currency"
                select
                label="URL"
                margin="normal"
                fullWidth
                onChange={setUrlfuncionAction}
                disabled={modalFuncionesDisable}
                value={urlFuncionSlc}
                name="urlFuncion"
                helperText={labelUrlFuncion}
              >
                {urlFuncion.map(urlfuncion => (
                  <MenuItem key={urlfuncion.URLFuncionId} value={urlfuncion.URLFuncionId}>
                    {urlfuncion.URL}
                  </MenuItem>
                ))}
              </TextField>
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
              <Success
                label={this.props.actualizaFuncion === false ?"Agregar" : "Actualizar"}
                disabled={!(tipoAgrupadorSlc !==-1 && textFieldNombreFuncion.trim() !=='' && urlFuncionSlc !==-1 ) || modalFuncionesDisable}
                onClick={()=>{this.agregarFuncionSinguardar(IdModulo,tipoAgrupadorSlc,tipoAgrupador,textFieldNombreFuncion,urlFuncion,urlFuncionSlc,usuario)}}
              />
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

ModalAddModulos.propTypes = {
  tipoAgrupador: T.array,
  tipoAgrupadorSlc: T.oneOfType([
    T.string,
    T.number,
  ]),
  setTipoagrupadoresAction: T.func,
  urlFuncion: T.array,
  urlFuncionSlc: T.number,
  setUrlfuncionAction: T.func,
  setSelecturlfuncionAction : T.func,
  setStepperaddmoduloAction : T.func,
  setTextfieldnombrefuncionTextAction : T.func,
  setOpenmodulosalirfuncionAction : T.func,
  setActualizafuncionAction: T.func,
  datosGuardar: T.array,
  setSelectedAction: T.func,
  setModalfuncionesdisableAction: T.func,
  setListadoAction:T.func,
  data:T.array,
  setVisualizatablaAction: T.func,
  setListadoFilterAction: T.func,
  setDatosguardarAction: T.func,
  filterData:T.array,
  selected:T.array,
  actualizaFuncion: T.bool,
  openMensajeSalirFuncion: T.bool,
  modalFuncionesDisable:T.bool,
  openM: T.bool,
  textFieldNombreFuncion: T.string,
  usuario:T.number,
  labelTipoAgrupador:T.string,
  labelNombreFuncion:T.string,
  labelUrlFuncion:T.string,
  getTipoagrupadoresAction: T.func,
  getUrlfuncionAction: T.func,
  setSelecttipoagrupadorAction:T.func,
  IdModulo:T.number,
};


export default compose(
  withStyles(styles),
)(ModalAddModulos);
