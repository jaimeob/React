import React from 'react';
import {
  compose,
  bindActionCreators,
} from 'redux';
import {
  // compose,
  // mapProps, 
  // withStateHandlers,
  withHandlers,
} from 'recompose';
import T from 'prop-types';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import config from 'config/config.development';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import { connect } from 'react-redux';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel, TextField, Card } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import withNotifier from 'components/HOC/withNotifier';
import _ from 'lodash';
import axios from 'axios';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import nextState from 'immer';
import { Redirect} from 'react-router-dom'

import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import { isRequestOk } from 'utils/helpers';
import FormHelperText from '@material-ui/core/FormHelperText';

import makeSelecConfiguracionTicket from './selectors';
import reducer from './reducer';
import ComponentConfig from './components/ComponentConfig';
import InputAdded from './components/ComponentAdded';
import ButtomAddComponent from './components/ButtomAddComponent';
import Selection from './components/Selection';
import { Container } from './styledComponents';
import { getPlantillaTicketsApi,updatePlantillaTicketsApi } from './api';





const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});



export class ConfiguracionTicket extends React.Component {
  state = {
    componentes: [
      {
        tipoComponenteId: 0,
        config: { 
          isComplete:true,
          valor: '',
          nomCampo: 'Título',
          tipo: 'text',
          label: '',
          value: '',
          longitud: '',
          helpertextLongitud:'',
          error: false,
          errorTipo: false,
          errorLongitud: false,
          helpertext:'',
          helpertext2:'',
          requerido: false,
          colorearBorde: false,
          cantidadarchivos: '',
          tamañoarchivos:'',
          tipoArchivo: 'picture',
          opciones: [
            {
              id: '',
              value: '',
              label:'Opcion',
              error:false,
              icon:'',
            },
          ],
          

        },
      },
      {
        tipoComponenteId: 1,
        config: { 
          isComplete:true,
          valor: '',
          nomCampo: 'Descripción',
          tipo: 'text',
          label: '',
          value: '',
          longitud: '',
          helpertextLongitud:'',
          error: false,
          error2: false,
          errorTipo: false,
          errorLongitud: false,
          helpertext:'',
          helpertext2:'',
          requerido: false,
          colorearBorde: false,
          cantidadarchivos: '',
          tamañoarchivos: '',
          tipoArchivo: 'picture',
          opciones: [
            {
              id: '',
              value: '',
              label:'Opcion',
              error:false,
              icon:'',
              isChecked:'',
            },
          ],
        },
      },
    ],
    checkEtapas:false,
    permisosPorPuesto:[{id:1,nombre:"Opcion 1"},{id:2,nombre:"Opcion 2"}],
    redireccionarEtapas:false,
    camposInvalidos:false,
    divSelecionado: 0,
    campoSelecionado: 0,
    selectionServicio:'',
    selectionTipo: '',
    selectionPrioriza: '',
    selectionDepartamento: '',
    selectionPuesto:"",
    selectionCierreRespuesta: '',
    tipoCierreRespuesta:'horas',
    selectionTiempoRespuesta: '',
    tipoTiempoRespuesta:'horas',
    servicioPrioriza: [],
    servicioTipos: [],
    servicioDepartamentos: [],
    tiposCampos: [
      {
        id: 'textocorto',
        label: 'Texto corto',
        icono: 'shorttext',
      },
      {
        id: 'textolargo',
        label: 'Texto largo',
        icono: 'largetext',
      },
      {
        id: 'seleccionmulti',
        label: 'Selección múltiple',
        icono: 'checkbox',
      },
      {
        id: 'seleccionsimple',
        label: 'Selección simple',
        icono: 'simple',
      },
      {
        id: 'listadesplegable',
        label: 'Lista desplegable',
        icono: 'lista',
      },
      {
        id: 'archivo',
        label: 'Cargar archivo',
        icono: 'cloudupload',
      },
    ],
    redirect: false,
    formVisibility:false,
  };

  


  componentDidUpdate(prevProps, prevState) {
    
    if (
      this.state.selectionDepartamento !== '' &&
      !_.isEqual(prevState.selectionDepartamento,this.state.selectionDepartamento)
    ) {
      axios
        .get(
          `${config.api.baseURL}/departamentos/empleados/${
            this.state.selectionDepartamento
          }`,
        )
        .then(response => {
          this.setState(() => ({
            selectionDepartamento: response.data[0].IdDepartamento,
            servicioPrioriza: response.data,
          }));
        })
        .catch(error => {
          this.setState(state => ({
            stack: [...state.stack, error],
          }));
        });
    }


      
  }


  componentDidMount() {
    console.log(this.props.location,"ARREGLANDO")
    
    if(this.props.location.state !== undefined)// eslint-disable-line
    {
      const  ticketEditable = this.props.location.state.ticket // eslint-disable-line
      if(ticketEditable)
        if(ticketEditable.idDepartamento ){
          this.setState(({ 
            componentes: JSON.parse(ticketEditable.tipoForma),
            selectionServicio: ticketEditable.nombre,
            selectionTipo: ticketEditable.idTipo,
            selectionPrioriza: ticketEditable.idPriorizador ? ticketEditable.idPriorizador :  '',
            selectionDepartamento: ticketEditable.idDepartamento,
            selectionCierreRespuesta: ticketEditable.cierreRespuesta % 24 === 0 ? ticketEditable.cierreRespuesta/24 : ticketEditable.cierreRespuesta,
            selectionTiempoRespuesta: ticketEditable.tiempoRespuesta % 24 === 0 ? ticketEditable.tiempoRespuesta/24 : ticketEditable.tiempoRespuesta,
            tipoCierreRespuesta: ticketEditable.cierreRespuesta % 24 === 0 ? 'dias' : 'horas',
            tipoTiempoRespuesta: ticketEditable.tiempoRespuesta % 24 === 0 ? 'dias' : 'horas',
          stack: [], // eslint-disable-line
            tiposCampos: [
              {
                id: 'textocorto',
                label: 'Texto corto',
                icono: 'shorttext',
              },
              {
                id: 'textolargo',
                label: 'Texto largo',
                icono: 'largetext',
              },
              {
                id: 'seleccionmulti',
                label: 'Selección múltiple',
                icono: 'checkbox',
              },
              {
                id: 'seleccionsimple',
                label: 'Selección simple',
                icono: 'simple',
              },
              {
                id: 'listadesplegable',
                label: 'Lista desplegable',
                icono: 'lista',
              },
              {
                id: 'archivo',
                label: 'Cargar archivo',
                icono: 'cloudupload',
              },
            ],
               
          }));
        }
      
    }
    /* CONSUMO SERVICIO TIPOS */
    axios
      .get(`${config.api.baseURL}/tipostickets`)
      .then(response => {
        this.setState(() => ({
          servicioTipos: response.data,
        }));
      })
      .catch(error => {
        this.setState(state => ({
          stack: [...state.stack, error],
        }));
      });

    /* CONSUMO SERVICIO DEPARTAMENTOS */
    axios
      .get(`${config.api.baseURL}/departamentos/rd`)
      .then(response => {
        this.setState(() => ({
          servicioDepartamentos: response.data,
        }));
      })
      .catch(error => {
        this.setState(state => ({
          stack: [...state.stack, error],
        }));
      });
    /* CONSUMO SERVICIO PUESTOS */
    axios
      .get(`${config.api.baseURL}/roles`)
      .then(response => {
        this.setState(() => ({
          servicioPuestos: response.data,
        }));
      })
      .catch(error => {
        this.setState(state => ({
          stack: [...state.stack, error],
        }));
      });
    
  }

  

  handleChangeTipo = (index) => cls => {
    
    this.setState(nextState((state) => {
      state.componentes[index].tipoComponenteId = cls.target.value;
      state.componentes[index].config.longitud = cls.target.value > 1 ? 0 : '';
      state.componentes[index].config.valor = cls.target.value > 1 ? [] : '';
    }))

  }

  handleChangeEtapas = (event)  => {
    const check = event.target.checked
    this.setState(() => ({
      checkEtapas:check,
    }));
    

  }

  handleSelectChange = event => {
    const {
      target: { value, name },
    } = event;
    switch (name) {
      case 'selectionTipo':
        this.setState(nextState((nstate) => {
          nstate.selectionPrioriza = '';
          nstate[name] = value;
        }))
        break;
      case 'selectionPrioriza':
        this.setState(nextState((nstate) => {
          nstate.selectionPuesto = '';
          nstate[name] = value;
        }))
        break;
      case 'selectionPuesto':
        this.setState(nextState((nstate) => {
          nstate.selectionPrioriza = '';
          nstate[name] = value;
        }))
        break;
      default:
        this.setState(nextState((nstate) => {
          nstate[name] = value;
        }))
    }

  }

  agregarCampo = () => {
    const componente = {
      tipoComponenteId: 0,
      config: { 
        isComplete:true,
        valor: "",
        nomCampo: 'Descripción',
        tipo: 'text',
        label: '',
        value: '',
        longitud: '',
        error: false,
        helpertext:'',
        helpertext2:'',
        requerido: false,
        colorearBorde: false,
        cantidadarchivos: '',
        tamañoarchivos: '',
        opciones: [
          {
            id: '',
            value: '',
            label:'Opcion',
            error:false,
            icon:'',
          },
        ],
        tipoCierreRespuesta:"",
        tipoTiempoRespuesta:"",
      },
    };
    this.setState(state => ({
      componentes: [...state.componentes, componente],
    }));
  };

  handleClickField = (event, index) => {

    this.setState(nextState((stte) => {
      stte.campoSelecionado = stte.componentes[index].tipoComponenteId;
      stte.divSelecionado = index;
    }));

    event.stopPropagation();
  }

  onClickedAdd = () => {
    const opcion =  {
      id:'',
      value: '',
      label:'Opcion',
      error: false,
      icon:'',
    };

    this.setState(nextState((state) => {
      state.componentes[state.divSelecionado].config.opciones.push(opcion);
    })) 
  }

  onClickedDelete = (index) => {
    this.setState(nextState((state) => {
      state.componentes[state.divSelecionado].config.opciones.splice(index,1);
    }))
  };

  onClickedDelCampo = (index) => (event) => {
    if (this.state.componentes.length > 1) {
      this.setState(nextState((state) => {
        state.divSelecionado = 0;
      }))
      this.setState(nextState((state) => {
        state.componentes.splice(index,1);
      }))
      event.stopPropagation();
    }
  };

  onInputChange = (value, index, idTipoComponenteId, divSelecionado) =>
  {
    
    this.setState(
      nextState((state) => {
        state.componentes[divSelecionado].config.opciones[index].value = value;
      })
    )
  };

  onChangeNomServicio = (value) =>
  {
    this.setState(
      nextState((state) => {
        state.selectionServicio = value;
      })
    )
  };
  
  onChangeNomCierreFaltaRespuesta = (value) =>
  {
    this.setState(
      nextState((state) => {
        state.selectionCierreRespuesta = value;
      })
    )
  };

  onChangeNomTiempoRespuesta = (value) =>
  {
    this.setState(
      nextState((state) => {
        state.selectionTiempoRespuesta = value;
      })
    )
  };
  
  onChangeTipoTiempoRespuesta = (value) => {
    this.setState(
      nextState((state) => {
        state.tipoTiempoRespuesta = value;
      })
    )
  }

  onChangeTipoCierreRespuesta = (value) => {
    this.setState(
      nextState((state) => {
        state.tipoCierreRespuesta = value;
      })
    )
  }


  onClickUpdate= () => {
    const idTicket = this.props.location.state.ticket.id  // eslint-disable-line
    if(this.state.selectionDepartamento !== undefined && this.state.selectionTipo && 
      this.state.selectionServicio !== "" ){
      axios.put(`${config.api.baseURL}/plantillatickets/${idTicket}`,  {
        nombre: this.state.selectionServicio,
        tipoForma : this.state.componentes,
        servicio : this.state.tipoForma,
        departamentos : this.state.selectionDepartamento,
        empleados : this.state.selectionPrioriza = this.state.selectionPrioriza === "" ? null : this.state.selectionPrioriza  ,
        tipostickets : this.state.selectionTipo,
        cierreRespuesta : this.state.selectionCierreRespuesta,
        tiempoRespuesta : this.state.selectionTiempoRespuesta,
        tipoTiempoRespuesta : this.state.tipoTiempoRespuesta,
        tipoCierreRespuesta : this.state.tipoCierreRespuesta,

      })
        .then(response => {
        console.log(response,"resultado  de guardado") // eslint-disable-line
        })
        .catch(error => {
        console.log(error,"error al guardar") // eslint-disable-line
        });
      this.setState(
        nextState((state) => {
          state.redirect = true;
        })
      )
    }else{
      const {
        enqueueSnackbar: enqueueSnackbarAction, // eslint-disable-line
      } = this.props;
      enqueueSnackbarAction({
        message: 'Es necesario llenar los campos  requeridos   ',
        options: {
          variant: 'warning',
        },
      })
      this.setState({ camposInvalidos : true });
    }
    
  } 

  redirigirListado = () => {
    this.setState(
      nextState((state) => {
        state.redirect = true;
      })
    )
  }

  redirigirEtapas = () => {
    this.setState(
      nextState((state) => {
        state.redireccionarEtapas = true;
      })
    )
  }

  onClickSave = async () => { 
    this.state.selectionServicio = this.state.selectionServicio==='' ?  this.state.selectionServicio .trim() : this.state.selectionServicio;
    const {
      enqueueSnackbar: enqueueSnackbarAction, // eslint-disable-line
    } = this.props;
    if(this.state.selectionDepartamento !== undefined && this.state.selectionTipo && 
        this.state.selectionServicio !== "" ){
      const data = {
        nombre: this.state.selectionServicio,
        tipoForma : this.state.componentes,
        servicio : this.state.tipoForma,
        departamentos : this.state.selectionDepartamento,
        empleados : this.state.selectionPrioriza !== ''  ? this.state.selectionPrioriza : undefined ,
        tipostickets : this.state.selectionTipo,
        cierreRespuesta : this.state.tipoCierreRespuesta === 'dias' ? this.state.selectionCierreRespuesta * 24 : this.state.selectionCierreRespuesta,
        tiempoRespuesta : this.state.tipoTiempoRespuesta === 'dias' ? this.state.selectionTiempoRespuesta * 24 : this.state.selectionTiempoRespuesta,
        tipoCierreRespuesta: this.state.tipoCierreRespuesta,
        tipoTiempoRespuesta: this.state.tipoTiempoRespuesta,
        estatus : true,
      };
      getPlantillaTicketsApi(data)
        .then(({
          status,
          data: responseData,
        }) => {
          if (isRequestOk(status)) {
            if (responseData && Object.keys(responseData).length) {
              localStorage.removeItem('newTicket');
              localStorage.setItem('newTicket', JSON.stringify(responseData, null, 2));
              this.setState(
                nextState((state) => { 
                  state.redirect = true;
                })
              )
            }
          }
        })
        .catch((err) => 
          // console.log('err');
          err
        )
    }else 
    // eslint-disable-next-line no-empty
    {
      enqueueSnackbarAction({
        message: 'Es necesario llenar los campos  requeridos   ',
        options: {
          variant: 'warning',
        },
      })
      this.setState({ camposInvalidos : true });
    }
  }

  onClickUpdate= () => {
    // console.log(this.state,"this.state")
    const {
      dispatch, // eslint-disable-line  
    } = this.props;
    const idTicket = this.props.location.state.ticket.IdPlantilla  // eslint-disable-line
    if(this.state.selectionDepartamento !== undefined && this.state.selectionTipo && 
      this.state.selectionServicio !== "" ){
      const data = {
        nombre: this.state.selectionServicio,
        tipoForma : this.state.componentes,
        departamentos : this.state.selectionDepartamento,
        empleados : this.state.selectionPrioriza = this.state.selectionPrioriza === "" ? null : this.state.selectionPrioriza  ,
        tipostickets : this.state.selectionTipo,
        cierreRespuesta : this.state.tipoCierreRespuesta === 'dias' ? this.state.selectionCierreRespuesta * 24 : this.state.selectionCierreRespuesta,
        tiempoRespuesta : this.state.tipoTiempoRespuesta === 'dias' ? this.state.selectionTiempoRespuesta * 24 : this.state.selectionTiempoRespuesta,
        tipoTiempoRespuesta : this.state.tipoTiempoRespuesta,
        tipoCierreRespuesta : this.state.tipoCierreRespuesta,
      };
      updatePlantillaTicketsApi(data,idTicket)
        .then(({
          status,
          data: responseData,
        }) => {
          if (isRequestOk(status)) {
            // console.log("cotizp")
            if (responseData && Object.keys(responseData).length) {
              this.setState(
                nextState((state) => { 
                  state.redirect = true;
                })
              )
              dispatch({
                type: 'APP/CONTAINERS/CONFIGTKS/UPDATE_TICKET',
                data: responseData,
              })
              
            }
          }
          
        })
        .catch((err) => err)
    }else{
      const {
        enqueueSnackbar: enqueueSnackbarAction, // eslint-disable-line
      } = this.props;
      enqueueSnackbarAction({
        message: 'Es necesario llenar los campos  requeridos   ',
        options: {
          variant: 'warning',
        },
      })
      this.setState({ camposInvalidos : true });
    }
    
  } 


  validaciones = () => { 
    
     
    let isValid = false;
    let textosValid = false;
    let longValid = false;
    let datosServicio = false;
    let tipoPlanTrabajo = false;
    let tiempoRespuesta = false;
       
    tipoPlanTrabajo = this.state.servicioTipos[0].id === this.state.selectionTipo
    
    if(tipoPlanTrabajo === true){
      tiempoRespuesta = true
    }else{
      // eslint-disable-next-line no-lonely-if
      if(this.state.selectionCierreRespuesta === "" && this.state.selectionTiempoRespuesta ===""  && this.state.selectionPrioriza === "" ||
      this.state.selectionCierreRespuesta === null && this.state.selectionTiempoRespuesta ===null && this.state.selectionPrioriza === null){
        tiempoRespuesta = false
      }else{
        tiempoRespuesta = true
      }
    }  


    this.state.componentes.forEach((item) => {
      // VALIDACION DATOS DE SERVICIO

      datosServicio = _.every(item.config.nomCampo, (itm) => itm.nomCampo === '' ? itm.nomCampo.trim() === '' : itm.nomCampo);
      

      // VALIDACION TEXTO CORTO Y LARGO
      if(item.tipoComponenteId < 2){
        if(item.config.value === "")
          textosValid = _.every(item.config.value, (itm) => itm.value.trim() === '');
        if(item.config.longitud === "")
          longValid = _.every(item.config.longitud, (itm) => itm.longitud.trim() !== '');
      }else{
        if(item.tipoComponenteId >= 2 === undefined)
          textosValid = false 
        longValid = false
      }

      // VALIDACION Listas desplegables
      if(item.tipoComponenteId === 5){
        isValid = !(item.config.cantidadarchivos && item.config.tamañoarchivos);
      } else if(item.tipoComponenteId >= 2){
        isValid = _.every(item.config.opciones, (itm) => itm.value.trim() === '');  
      }else if(item.tipoComponenteId < 2 === undefined)
        isValid = false
                
    })
    
    if(textosValid !==true  && isValid !==true && longValid !== true && datosServicio !== true && tiempoRespuesta === true){
      if(this.props.location.state){

        this.onClickUpdate()
      }else{

        this.onClickSave()
      }
    }else{
      const {
        enqueueSnackbar: enqueueSnackbarAction, // eslint-disable-line
      } = this.props;
      
      enqueueSnackbarAction({
        message: 'Es necesario llenar los campos  ',
        options: {
          variant: 'warning',
        },
      })
    }
  }


  onChangeTitle = (value,index) =>{
    this.setState(
      nextState((state) => {
        state.componentes[index].config.nomCampo = value;
      })
    )
  };

  onChangeTipoArchivo = (tipoArchivo,divSelecionado) =>{
    this.setState(
      nextState((state) => {
        state.componentes[divSelecionado].config.tipoArchivo = tipoArchivo;
      })
    )
  };

  onChangeTipoTextoCorto = (value,divSelecionado) => {
    this.setState(
      nextState((state) => {
        state.componentes[divSelecionado].config.value = value
      })
    )
  };

  onChangeObligatorio = (checked,divSelecionado) => {
    
    this.setState(
      nextState((state) => {
        state.componentes[divSelecionado].config.requerido = checked
      })
    )
  };

  handleBlur = () => {
    let tipo = ''
    this.state.servicioTipos.forEach((item) => {
      if(this.state.selectionTipo === item.IdTipo){
        tipo = item.Nombre
      }
    });
    if(tipo === "Plan de Trabajo"){
      
      if(this.state.selectionDepartamento !== "" && this.selectionServicio !== ""
      && this.state.selectionTipo !== "" )
      {
        this.setState({ formVisibility: true});
      }
    }else if(this.state.selectionDepartamento !== "" && this.selectionServicio !== ""
    && this.state.selectionTipo !== "" && this.state.selectionPrioriza)
    {
      this.setState({ formVisibility: true});
    }
  };

  onChangeLongitud = (value,divSelecionado,idTipoComponente) => {
    
    let long = 20;
    let longitudMaxima = "";
    
    if(parseInt(idTipoComponente,0) === 0){
      long = 255;
      longitudMaxima = "Longitud Maxima 255"
    }

    if(parseInt(idTipoComponente,0) === 1){
      long = 500;
      longitudMaxima = "Longitud Maxima 500"
    }
    
    if(parseInt(value,0) > long){
      this.setState(
        nextState((state) => {
          state.componentes[divSelecionado].config.error = true;
          state.componentes[divSelecionado].config.helpertext = longitudMaxima;
        })
      )
      return;
    }
    if(this.state.componentes[divSelecionado].config.error === true && parseInt(value,0) <= long) {
      this.setState(
        nextState((state) => {
          state.componentes[divSelecionado].config.error = false;
          state.componentes[divSelecionado].config.helpertext = '';
        })
      )
    }
    this.setState(
      nextState((state) => {
        state.componentes[divSelecionado].config.longitud = value;
      })
    )
  };

  onChangeText = (name,value,divSelecionado) => {
    if(name === "tamañoarchivos"){
      this.setState(
        nextState((state) => {
          state.componentes[divSelecionado].config.tamañoarchivos = parseInt(value,0);
        })
      )
      return;
    }
    if(name === "cantidadarchivos"){
      this.setState(
        nextState((state) => {
          state.componentes[divSelecionado].config.cantidadarchivos = parseInt(value,0);
        })
      );
    }
  };

  onChangeTamañosArchivos = (value,divSelecionado,idTipoComponente) => {
    
    let long = 0;
    let longitudMaxima = "";
    
    if(parseInt(idTipoComponente,0) === 0){
      long = 5;
      longitudMaxima = "Cantidad Maxima 5"
    }

    if(parseInt(idTipoComponente,0) === 1){
      long = 100;
      longitudMaxima = "Tamaño Maximo 100"
    }
    
    if(parseInt(idTipoComponente,0) === 0 && parseInt(value,0) > long){
      this.setState(
        nextState((state) => {
          state.componentes[divSelecionado].config.error = true;
          state.componentes[divSelecionado].config.helpertext = longitudMaxima;
        })
      )
      return;
    }
    
    if(parseInt(idTipoComponente,0) === 0 && this.state.componentes[divSelecionado].config.error === true && parseInt(value,0) <= long) {
      this.setState(
        nextState((state) => {
          state.componentes[divSelecionado].config.error = false;
          state.componentes[divSelecionado].config.helpertext = '';
          
        })
      )
    }

    if(parseInt(idTipoComponente,0) === 1 && parseInt(value,0) > long){

      this.setState(
        nextState((state) => {
          state.componentes[divSelecionado].config.error2 = true;
          state.componentes[divSelecionado].config.helpertext2 = longitudMaxima;
        })
      )
      return;
    }

        
    if(parseInt(idTipoComponente,0) === 1 && this.state.componentes[divSelecionado].config.error2 === true && parseInt(value,0) <= long) {
      this.setState(
        nextState((state) => {
          state.componentes[divSelecionado].config.error2 = false;
          state.componentes[divSelecionado].config.helpertext2 = '';
          
        })
      )
    }

    if(parseInt(idTipoComponente,0) === 0){
      this.setState(
        nextState((state) => {
          state.componentes[divSelecionado].config.cantidadarchivos = value;
        })
      )
    }
    if(parseInt(idTipoComponente,0) === 1){
      this.setState(
        nextState((state) => {
          state.componentes[divSelecionado].config.tamañoarchivos = value;
        })
      )
    }

  };

  formatText = item =>
    `${item.Nombre.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}
      ${_.capitalize(item.ApellidoPaterno,)} 
      ${_.capitalize(item.ApellidoMaterno)}`;

  render() {
    const { componentes, tiposCampos, formVisibility } = this.state; // eslint-disable-line
    const classes = this.props;   

    // REDIRIGIR A LISTADO DE SERVICIOS
    if(this.state.redirect === true){
      return <Redirect to='/listado-tickets' /> 
    }
    if(!formVisibility)
    {
      this.handleBlur()
    }

    // REDIRIGIR A ETAPAS
    if(this.state.redireccionarEtapas === true){
      // return <Redirect to='/configuracion-campos-especiales' />
      if(this.props.location.state.ticket){
        const  ticketEditable = this.props.location.state.ticket
        // console.log(ticketEditable)
        return <Redirect to={{pathname: '/configuracion-campos-especiales',state: { ticket: ticketEditable}}}/> 
      }
      return <Redirect to={{pathname: '/configuracion-campos-especiales'}}/> 
      
      
    }

    return (
      <Container
        container
        item
        xs={12}
        sm={12}
        md={12}
        style={{ display: 'inline-block', backgroundColor:'#ece6e6'}}
      >
        <AppBar style={{backgroundColor: 'rgb(238, 238, 238)'}} position="static">
          <Toolbar>
            <Typography  variant="h6" gutterBottom style={{marginBottom: 0, lineHeight: 0}}>
              CONFIGURACIÓN DE TICKETS
            </Typography>
          </Toolbar>
        </AppBar>
 
        {/* Nuevo Servicio */}
        {/* <Card style={{ margin: '10px 8px 6px 8px', padding: '6px 3px 9px 4px' }}> */}
        {/* Selectiones */}

        {/* </Card> */}
        <Grid container>
          <Grid item xs={12} sm={6} md={6}  style={{ padding: '10px' }}>
            <Card style={{ padding: '10px' }}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} style={{ padding: '10px 20px' }}>
               
                  {/* <Container flexDirection="column" style={{ padding: '10px 20px' }}> */}
                  <TextField
                    label="Nombre del Servicio"
                    fullWidth
                    type="text"
                    value={this.state.selectionServicio}
                    onChange={({ target }) => this.onChangeNomServicio(target.value)}
                    onBlur={this.handleBlur}
                    helperText="*Requerido"
                    error={this.state.selectionServicio === "" && this.state.camposInvalidos === true}
                  
                  />
                  <FormHelperText></FormHelperText>
                  <Grid container>
                    <Grid item xs={6} sm={6} md={6} >
                      <Selection
                        nombre="selectionTipo"
                        data={this.state.servicioTipos}
                        placeholder="Seleccione una opcion"
                        titulo="Tipo"
                        valueKey="IdTipo"
                        textKey="Nombre"
                        onSelectChange={this.handleSelectChange}
                        value={this.state.selectionTipo}
                      />

                      
                      <FormHelperText></FormHelperText>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} ></Grid>
                    <Grid item xs={5} sm={5} md={5}  >
                     

                      <Selection
                        nombre="selectionDepartamento"
                        data={this.state.servicioDepartamentos}
                        placeholder="Seleccione una opcion"
                        titulo="Departamento"
                        valueKey="IdDepartamento"
                        textKey="Nombre"
                        disabled={this.state.selectionTipo === ''}
                        onSelectChange={this.handleSelectChange}
                        value={this.state.selectionDepartamento}
                      />
                    </Grid>
                  </Grid>    
                </Grid>

              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}  style={{ padding: '10px',backgroundColor: 'red' }}>
            <Card style={{ padding: '10px' }}>
              <Grid container>
                <Grid item xs={7} sm={7} md={7} style={{ padding: '10px 20px' }}>
                  <Grid container>
                    <Grid item xs={6} sm={6} md={6} >
                      <Selection
                        nombre="selectionPrioriza"
                        data={this.state.servicioPrioriza}
                        onSelectChange={this.handleSelectChange}
                        valueKey="NoEmpleado"
                        formatText={this.formatText}
                        titulo="Priorizador"
                        value={this.state.selectionPrioriza}
                        disabled={
                          this.state.selectionDepartamento === '' ||
                          this.state.selectionTipo === 2
                        }
                      />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} style={{ backgroundColor: 'red' }} ></Grid>
                    <Grid item xs={5} sm={5} md={5} style={{ padding: ' ' }}>
                      <Selection
                        nombre="selectionPuesto"
                        data={this.state.servicioPuestos}
                        onSelectChange={this.handleSelectChange}
                        valueKey="IdPuesto"
                        formatText={this.formatText}
                        titulo="Puesto"
                        value={this.state.selectionPuesto}
                        
                        // style={{ marginTop: '15px' }}
                      />
                      <FormHelperText></FormHelperText>
                    </Grid>
                  </Grid>
                  <Selection
                    nombre="permisosPorPuesto"
                    data={this.state.permisosPorPuesto}
                    placeholder="Permisos por puesto"
                    titulo="Permisos por puesto"
                    valueKey="id"
                    textKey="nombre"
                    disabled
                    // onSelectChange={this.handleSelectChange}
                    value={this.state.permisosPorPuesto}
                    style={{ marginTop: '20px' }}
                  />
                  
                  
                </Grid>
                <Grid item xs={5} sm={5} md={5} style={{ padding: '16px' }}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkEtapas}
                          onChange={(e) => {
                            this.handleChangeEtapas(e);
                  
                          } }
                          value={this.state.checkEtapas}
                        />
                      }
                      label="Etapas"
                    />
                    {this.state.checkEtapas  && (
                      <IconButton aria-label="Editar"  onClick={this.redirigirEtapas}>
                        <EditIcon   />
                      </IconButton>)}
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={this.state.checkedA}
                          // onChange={this.handleChange('checkedA')}
                          value="Requiere Autorización"
                        />
                      }
                      label="Requiere Autorización"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={this.state.checkedA}
                          // onChange={this.handleChange('checkedA')}
                          value="Requiere iniciar Seguimiento"
                        />
                      }
                      label="Requiere iniciar Seguimiento"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>    
        
       
        {/* Datos y Configuración */}

        {formVisibility && (
          <Grid container>
            {/* Datos del Servicio */}
          
            <Grid item xs={12} sm={6} md={6}  style={{ padding: '10px' }}>
              <Card style={{ padding: '10px' }}>
                <Container flexDirection="column" style={{ paddingTop: '20px',paddingLeft:'15px' }}>
                  <Container
                    flexDirection="row"
                    justify="space-between"
                    style={{ padding: '10px 20px', alignItems: 'center' }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Datos del servicio:
                    </Typography>
                    <ButtomAddComponent
                      onClick={this.agregarCampo}
                      ref={instance => {
                        this.inputAddedIns = instance;
                      }}
                    />
                  </Container>
                  {/* Contenedor de Componentes Agregados */}
                  <Container
                    flexDirection="column"
                    style={{
                      overflowY: 'auto',
                      maxHeight: '327px',
                      padding: '10px 20px',
                    }}
                  >
                    {this.state.componentes.map((element, index) => (
                      <InputAdded
                        
                        // eslint-disable-next-line react/no-array-index-key
                        key={`comp_${index}`}
                        onClicked={(event) => this.handleClickField(event, index)}
                        titulo={element.config.nomCampo}
                        onChangeTipo={this.handleChangeTipo}
                        tipoComponenteVal={element.tipoComponenteId}
                        indexId={index}
                        tiposCampos={tiposCampos}
                        onChangeTitle={this.onChangeTitle} 
                        divSelecionado={index}
                        onClickedDeleted={this.onClickedDelCampo(index)}
                        totalForms={componentes.length}
                      />
                    ))}
                  </Container>
                </Container>
              </Card>
            </Grid>

          
            {/* Configuracion del Campo */}
            <Grid item xs={12} sm={6} md={6} style={{ padding: '10px' }}>
              <Card style={{ padding: '10px' }}>
                <Container flexDirection="column" style={{ paddingTop: '20px',paddingLeft:'15px' }}>
                  <Grid container>
                    <Container justify="center">
                      <Typography variant="h6" gutterBottom>
                        Configuracion del campo
                      </Typography>
                    </Container>
                    {/* Campo a Configurar */}
                    <Container
                      flexDirection="column"
                      style={{
                        paddingTop: '20px',
                        padding: '0px 20px',
                      }}
                    >
                      <ComponentConfig
                        idTipoComponente={this.state.campoSelecionado}
                        componentes={this.state.componentes}
                        onClickedButtom ={this.onClickedAdd}
                        onClickedDelete={this.onClickedDelete}
                        onInputChange={this.onInputChange}
                        divSelecionado={this.state.divSelecionado}
                        titulo={this.state.componentes[this.state.divSelecionado].config.nomCampo}
                        onChangeTipo ={this.onChangeTipoTextoCorto}
                        valor={this.state.componentes[this.state.divSelecionado].config.value}
                        onChangeObligatorio={this.onChangeObligatorio}
                        requerido={this.state.componentes[this.state.divSelecionado].config.requerido}
                        longitud={this.state.componentes[this.state.divSelecionado].config.longitud}
                        onChangeLongitud={this.onChangeLongitud}
                        error={this.state.componentes[this.state.divSelecionado].config.error}
                        error2={this.state.componentes[this.state.divSelecionado].config.error2}
                        helpertext={this.state.componentes[this.state.divSelecionado].config.helpertext}
                        helpertext2={this.state.componentes[this.state.divSelecionado].config.helpertext2}
                        CantidadArchivos={this.state.componentes[this.state.divSelecionado].config.cantidadarchivos}
                        TamañoArchivos={this.state.componentes[this.state.divSelecionado].config.tamañoarchivos}
                        onChangeText={this.onChangeText}
                        tipoArchivo={this.state.componentes[this.state.divSelecionado].config.tipoArchivo}
                        onChangeTamañosArchivos={this.onChangeTamañosArchivos}
                        onChangeTipoArchivo={this.onChangeTipoArchivo}
                      />

                      {/* <MultipleSelection/> */}
                    </Container>

                    {/* Tiempo de Respuesta */}
                    <Container
                      flexDirection="columm"
                      style={{ padding: '10px 20px' }}
                    >
                      <Grid container item xs={12} sm={12} md={12}>
                        <Container
                          flexDirection="row"
                          style={{ marginBottom: '10px', alignItems: 'center' }}
                        >
                          <Grid item xs={6} sm={5} md={7}>
                            <TextField
                              label="Tiempo de Respuesta"
                              fullWidth
                              type="number"
                              value={this.state.selectionTiempoRespuesta}
                              onChange={({ target }) => this.onChangeNomTiempoRespuesta(target.value)}
                              disabled={
                                this.state.selectionDepartamento === '' ||
                                this.state.selectionTipo === '5c462f9418511e0f848bf7bd'
                              }
                             
                            />
                          </Grid>

                          <Grid
                            container
                            item
                            xs={6}
                            sm={7}
                            md={5}
                            style={{ alignItems: 'center' }}
                          >
                            <Container
                              flexDirection="row"
                              style={{ alignItems: 'center' }}
                            >
                              <RadioGroup
                                row
                                name="tiempoRespuesta"
                                value={this.state.tipoTiempoRespuesta}
                                onChange={({ target }) => this.onChangeTipoTiempoRespuesta(target.value)}
                                style={{ display: 'flex', flexDirection: 'row' }}
                              >
                                <FormControlLabel
                                  value="dias"
                                  control={<Radio color="default" />}
                                  label="Días"
                                  disabled={
                                    this.state.selectionDepartamento === '' ||
                                    this.state.selectionTipo === '5c462f9418511e0f848bf7bd'
                                  }                              />
                                <FormControlLabel
                                  value="horas"
                                  control={<Radio color="default" />}
                                  label="Horas"
                                  disabled={
                                    this.state.selectionDepartamento === '' ||
                                    this.state.selectionTipo === '5c462f9418511e0f848bf7bd'
                                  }                             />
                              </RadioGroup>
                            </Container>
                          </Grid>
                        </Container>
                        {/* CIERRE POR FALTA DE RESPUESTA */}
                        <Container flexDirection="row">
                          <Grid item xs={6} sm={5} md={7}>
                            <TextField
                              label="Cierre Por Falta de Respuesta"
                              fullWidth
                              type="number"
                              value={this.state.selectionCierreRespuesta}
                              onChange={({ target }) => this.onChangeNomCierreFaltaRespuesta(target.value)}
                              disabled={
                                this.state.selectionDepartamento === '' ||
                                this.state.selectionTipo === '5c462f9418511e0f848bf7bd'
                              }                                />
                          </Grid>

                          <Grid item xs={6} sm={7} md={5}>
                            <Container flexDirection="row">
                              <RadioGroup
                                row
                                name="cierreTiempoRespuesta"
                                value={this.state.tipoCierreRespuesta}
                                onChange={({ target }) => this.onChangeTipoCierreRespuesta(target.value)}
                                style={{ display: 'flex', flexDirection: 'row' }}
                                disabled={
                                  this.state.selectionDepartamento === '' ||
                                  this.state.selectionTipo === '5c462f9418511e0f848bf7bd'
                                }
                              >
                                <FormControlLabel
                                  value="dias"
                                  control={<Radio color="default" />}
                                  label="Días"
                                  disabled={
                                    this.state.selectionDepartamento === '' ||
                                    this.state.selectionTipo === '5c462f9418511e0f848bf7bd'
                                  }                             />
                                <FormControlLabel
                                  value="horas"
                                  control={<Radio color="default" />}
                                  label="Horas"
                                  disabled={
                                    this.state.selectionDepartamento === '' ||
                                    this.state.selectionTipo === '5c462f9418511e0f848bf7bd'
                                  }                               />
                              </RadioGroup>
                            </Container>
                          </Grid>
                        </Container>
                      </Grid>
                    </Container>
                    
                  </Grid>
                </Container>
                {/** Botones */}
                <Container flexDirection="row" style={{ padding: '20px 20px' }}>
                  <Grid item container sm={12} xs={12} md={12}>
                    <Container flexDirection="row" justify="flex-end">
                      <Button
                        variant="contained"
                        size="small"
                        className={classes.button}
                        style={{ marginLeft: '20px' }}
                        color='primary'
                        onClick={this.redirigirListado}

                      >
                        Cancelar
                      </Button>
                      {this.props.location.state === undefined && 

                    <Button
                      variant="contained"
                      onClick={this.validaciones}

                      size="small"
                      className={classes.button}
                      style={{ marginLeft: '20px' }}
                      color='primary'
                    >
                      Guardar
                    </Button>}
                      {this.props.location.state  && <Button
                        variant="contained"
                        size="small"
                        className={classes.button} 
                        style={{ marginLeft: '20px' }}
                        color='primary'
                        onClick={this.validaciones}>
                        Actualizar 
                      </Button>}

                    </Container>
                  </Grid>
                </Container>
              </Card>
            </Grid>
          </Grid>
        )} 
      </Container>
    );
  }
}

ConfiguracionTicket.propTypes = {
  dispatch: T.func,
}

const mapStateToProps = createStructuredSelector({
  configuracionTicket: makeSelecConfiguracionTicket(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,dispatch,
  }, dispatch);
}



const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withStyle = withStyles(styles)
const withReducer = injectReducer({ key: 'configuracionTicket', reducer });
// const withSaga = injectSaga({ key: 'configuracionTicket', saga });

export default compose(
  withNotifier,
  withStyle,
  withReducer,
  // withSaga,
  withConnect,
  withHandlers({
    seleccionado: props => (event) =>  { // eslint-disable-line
      const {
        dispatch,
      } = props;
      dispatch({
        type: 'APP/CONTAINER/CONF_TICKETS/CALANDO_REDUCER',
        data: event,
      })
   
    },
  }),
  
)(ConfiguracionTicket);