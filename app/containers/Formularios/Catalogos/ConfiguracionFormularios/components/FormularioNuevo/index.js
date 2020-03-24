/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
import grey from '@material-ui/core/colors/grey';
// import BotonSuccess from "components/BotonSuccess";
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import { compose } from 'redux';
import {isUndefined} from 'lodash';
// import Tabla from '../../../../../../components/DataTable';
// import Modal from '../../../../components/ListadoFormulario/components/Modal/alertDialog';
// import BotonCancelar from "../../../../../../components/BotonCancelar";
import './styles.css';
import {
  TransitionGroup,
} from 'react-transition-group';
import { AppBar, Toolbar, Typography, RadioGroup, FormControlLabel, Slide, Checkbox, Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BurgerIcon from '@material-ui/icons/CalendarViewDayOutlined';
import SaveIcon from '@material-ui/icons/Save';
import Input from 'components/FormInput';
import Radio from '@material-ui/core/Radio';
// import Seleccion from 'components/Seleccion';
import Modal from 'components/Dialog/alertDialog';
import TipoPregunta from '../TipoPregunta'
import TipoSeccion from '../TipoSeccion'
import { Container, OH, Grid95, Grid5, Grid70, Grid50 } from '../../styledComponents';
import ModalUsuario from '../Modal';
// const getMuiTheme = () =>
//   createMuiTheme({
//     overrides: {
//       MuiRadio: {
//         colorSecondary: {
//           color: '#28950f',
//           '&$checked': {
//             color: '#28950f',
//           },
//         },
//       },
//     },
//   })


// const arrayPreguntas = 
// const arraySecciones = 

const styles = () => ({
  radioVerde:{
    textTransform:'60px',
    overrides: {
      MuiRadio: {
        colorSecondary: {
          color: '#28950f',
          '&$checked': {
            color: '#28950f',
          },
        },
      },
    },
  },
  success: {
    // backgroundColor: '#28950F',
    // '&:disabled': {
    //   backgroundColor: 'rgba(0, 0, 0, 0.26)',
    // },
    // '&:hover': {
    //   backgroundColor: '#1d7109',
    // },
    colorSecondary:'#28950f',
    // color: 'white',
    // minWidth: 84.88,
  },
})

// eslint-disable-next-line react/prefer-stateless-function
export class FormularioNuevo extends React.Component {

  render() {
    const {
      // classes,
      regresarAction,
      // mostrarComponenteAction,
      // mostrarComponente,
      // onInputChangeProxy,
      onInputPreguntaChangeProxy,
      onInputSeccionChangeProxy,
      onInputDescripcionSeccionChangeProxy,
      onColorSeccionChange,
      onInputRespuestaChangeProxy,
      ordenarPreguntaProxy,
      eliminarPreguntaProxy,
      mostrarPreguntasProxy,
      copiarPreguntaProxy,
      onInputTipoPreguntaChangeProxy,
      // nombrePregunta,
      preguntas,
      tipoPreguntas,
      usuarios,
      onInputChangeProxy,
      onInputDatoPreguntaChange,
      onInputValorPreguntaChange,
      onInputCheckPreguntaChange,
      onInputCheckOpcionChange,
      ordenarDatosPregunta,
      eliminarDatosPregunta,
      onAgregarDatoPregunta,
      scrollToBottomProxy,
      modal,
      openModalAction,
      closeModalAction,
      onUsuarioChangeProxy,
      onAgregarUsuarioAction,
      onGuardarFormularioProxy,
      handleValidarCampos,
      datosModal,
      editar,
      removeRowAction,
      nuevoFormulario: {
        // preguntas,
        campos: {
          titulo,
          descripcion,
          tipoFormulario,
          validacion,
          permiteEditar,
          permiteCapturaLibre,
          usuario,
        },
        tablas: {
          usuariosAsignados,
        },
      },
    } = this.props;

    const arrayPreguntas = preguntas.filter(dato => dato.tipoPregunta !== 'SECCION')
    const arraySecciones = preguntas.filter(dato => dato.tipoPregunta === 'SECCION')

    return (
      <div>
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}> 
            <Tooltip title="Regresar" placement="bottom-end"> 
              <IconButton onClick={regresarAction}> 
                <ArrowBackIcon /> 
              </IconButton>
            </Tooltip>
            <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
              {editar?'Editar Configuración':'Nueva configuración'}
            </Typography> 
          </Toolbar> 
        </AppBar>
        <OH>
          <Grid95>
            <OH style={{padding: 0}}>
              <Container style={{paddingBottom: 15}}>
                <Modal 
                  open={datosModal.abrirModal}
                  typeAlert='Report'
                  typeOptions='Select'
                  title='Confirmar....'
                  message={datosModal.mensajeConfirmacion}
                  onClickAccept={onGuardarFormularioProxy(true)}
                  onClickCancel={onGuardarFormularioProxy(false)}
                />
                <OH>
                  <Grid50>
                    <div>
                      <Grid50 style={{paddingTop:'20px'}}>
                        <Input
                          onChange={onInputChangeProxy}
                          nomCampo='Titulo:'
                          tipoInput='text'
                          longitud='80'
                          requerido
                          isComplete={titulo.campoValido}
                          valor={titulo.valor}
                          indice={0}
                        />
                      </Grid50>
                    </div>
                    <div>
                      <Grid70 style={{marginTop: 19}}>
                        <Input
                          onChange={onInputChangeProxy}
                          nomCampo='Descripción:'
                          tipoInput='text'
                          longitud='80'
                          // requerido
                          isComplete={descripcion.campoValido}
                          valor={descripcion.valor}
                          indice={1}
                          key="descripcion"
                        />
                      </Grid70>
                    </div>
                  </Grid50>
                  <Grid50>
                    <OH>
                      <Grid50>
                        <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', marginTop: 10}}> 
                        Tipo de formulario
                        </Typography> 
                        <RadioGroup
                          name="tipoFormulario"
                          value={tipoFormulario.valor}
                          onChange={onInputChangeProxy(2)}
                          // id={2}
                        >
                          <FormControlLabel style={{margin: 0}} value='REFENC' control={<Radio style={{padding: 5,color: '#28950f'}} />} label="Encuesta" />
                          <FormControlLabel style={{margin: 0}} value='REFEVA' control={<Radio style={{padding: 5,color: '#28950f'}} />} label="Evaluación" />
                          <FormControlLabel style={{margin: 0}} value='REFFOR' control={<Radio style={{padding: 5,color: '#28950f'}} />} label="Formulario" />
                        </RadioGroup>
                      </Grid50>
                      <Grid50>
                        <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', marginTop: 10}}> 
                        Configuraciones
                        </Typography> 
                        <FormControlLabel

                          control={
                            <Checkbox
                              checked={validacion.valor}
                              onChange={onInputChangeProxy(3)} 
                              // value={validacion.valor}
                              style={{color:'#28950f'}}
                              disabled={tipoFormulario.valor ==='REFEVA'}
                            />
                          }
                          label= {tipoFormulario.valor ==='REFENC' || tipoFormulario.valor === 'REFEVA' ? "Requiere evaluación":"Requiere validación"}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={permiteEditar.valor}
                              onChange={onInputChangeProxy(4)}
                              style={{color: '#28950f'}}
                              value="checkedB"
                            />
                          }
                          label= "Permitir edición de respuesta"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={permiteCapturaLibre.valor}
                              onChange={onInputChangeProxy(5)}
                              style={{color: '#28950f'}}
                              value="checkedB"
                            />
                          }
                          label= "Permitir captura libre"
                        />

                        <Button onClick={openModalAction}>
                          MOSTRAR USUARIOS <br/> AUTORIZADOS
                        </Button>
                      </Grid50>
                    </OH>
                  </Grid50> 
                </OH>
              </Container>
            </OH>
          </Grid95>
          <Grid5 style={{position: 'fixed', right: 0}}>
            <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px 0'}}>
              <div>
                <div>
                  <Tooltip title="Agregar pregunta" placement="bottom-end"> 
                    <IconButton onClick={() => scrollToBottomProxy(this.questionsEnd,1)}> 
                      <AddCircleIcon/>
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Agregar sección" placement="bottom-end"> 
                    <IconButton onClick={() => scrollToBottomProxy(this.questionsEnd,0)}> 
                      <BurgerIcon/>
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Guardar" placement="bottom-end"> 
                    <IconButton onClick={handleValidarCampos}> 
                      <SaveIcon/>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Container>
          </Grid5>
        </OH>
        <Grid95>
          <TransitionGroup>
            {
              preguntas.map((pregunta,index) => (
              // <Container style={{height: 100, width: '100%'}}>
              //   {pregunta.orden}
              // </Container>
                pregunta.tipoPregunta !== 'SECCION'?
                  pregunta.mostrarPregunta?
                    <Slide key={`tipoPregunta ${pregunta.contador}`} direction="right" in mountOnEnter unmountOnExit >
                      <TipoPregunta
                        regresarAction ={regresarAction}
                        onInputPreguntaChangeProxy ={onInputPreguntaChangeProxy}
                        onInputRespuestaChangeProxy={onInputRespuestaChangeProxy}
                        ordenarPreguntaProxy={ordenarPreguntaProxy}
                        copiarPreguntaProxy={copiarPreguntaProxy}
                        eliminarPreguntaProxy={eliminarPreguntaProxy}
                        onInputTipoPreguntaChangeProxy ={onInputTipoPreguntaChangeProxy}
                        pregunta ={pregunta}
                        arrayPreguntas={arrayPreguntas}
                        indice ={index}
                        tipoPreguntas ={tipoPreguntas}
                        onInputDatoPreguntaChange={onInputDatoPreguntaChange}
                        onInputValorPreguntaChange={onInputValorPreguntaChange}
                        onInputCheckPreguntaChange={onInputCheckPreguntaChange}
                        onInputCheckOpcionChange={onInputCheckOpcionChange}
                        onAgregarDatoPregunta={onAgregarDatoPregunta}
                        ordenarDatosPregunta={ordenarDatosPregunta}
                        eliminarDatosPregunta={eliminarDatosPregunta}
                        totalPreguntas = {preguntas.length}
                        tipoFormulario = {tipoFormulario.valor}
                        validacion={validacion.valor}
                      />
                    </Slide>
                    :null
                  :
                  <Slide key={`tipoSeccion ${pregunta.contador}`} direction="right" in mountOnEnter unmountOnExit >
                    <TipoSeccion
                      regresarAction ={regresarAction}
                      onInputSeccionChangeProxy ={onInputSeccionChangeProxy}
                      onInputDescripcionSeccionChangeProxy={onInputDescripcionSeccionChangeProxy}
                      onColorSeccionChange={onColorSeccionChange}
                      onInputRespuestaChangeProxy={onInputRespuestaChangeProxy}
                      ordenarPreguntaProxy={ordenarPreguntaProxy}
                      copiarPreguntaProxy={copiarPreguntaProxy}
                      eliminarPreguntaProxy={eliminarPreguntaProxy}
                      mostrarPreguntasProxy={mostrarPreguntasProxy}
                      onInputTipoPreguntaChangeProxy ={onInputTipoPreguntaChangeProxy}
                      pregunta ={pregunta}
                      indice ={index}
                      tipoPreguntas ={tipoPreguntas}
                      onInputDatoPreguntaChange={onInputDatoPreguntaChange}
                      onInputValorPreguntaChange={onInputValorPreguntaChange}
                      onInputCheckPreguntaChange={onInputCheckPreguntaChange}
                      onAgregarDatoPregunta={onAgregarDatoPregunta}
                      ordenarDatosPregunta={ordenarDatosPregunta}
                      eliminarDatosPregunta={eliminarDatosPregunta}
                      arrayPreguntas={arrayPreguntas}
                      totalSecciones={arraySecciones.length}
                      totalPreguntas = {preguntas.length}
                      tipoFormulario = {tipoFormulario.valor}
                      validacion={validacion.valor}
                    />
                  </Slide>
              ))
            }
          </TransitionGroup>
          <div 
            style={{ float:"left", clear: "both"}}
            ref={(el) => { this.questionsEnd = el; }}
          >
          </div>
        </Grid95>
        <ModalUsuario
          modal={modal}
          closeModalAction={closeModalAction}
          disabled={usuario.disabled}
          usuarios={usuarios}
          onChangeCombo={onUsuarioChangeProxy}
          onAgregar={onAgregarUsuarioAction}
          valor={usuario.valor}
          datos={usuariosAsignados.datos}
          deleteRowAction={removeRowAction}
        />
      </div>
    );
  }
}

FormularioNuevo.propTypes = {
  // classes: T.object,
  regresarAction: T.func,
  // mostrarComponenteAction: T.func,
  // mostrarComponente: T.bool,
  onInputChangeProxy: T.func,
  onInputPreguntaChangeProxy: T.func,
  onInputSeccionChangeProxy: T.func,
  onInputDescripcionSeccionChangeProxy: T.func,
  onColorSeccionChange:T.func,
  onInputRespuestaChangeProxy:T.func,
  ordenarPreguntaProxy:T.func,
  copiarPreguntaProxy:T.func,
  eliminarPreguntaProxy:T.func,
  mostrarPreguntasProxy:T.func,
  onInputTipoPreguntaChangeProxy: T.func,
  // nombrePregunta: T.object,
  preguntas: T.array,
  tipoPreguntas: T.array,
  usuarios:T.array,
  nuevoFormulario: T.object,
  scrollToBottomProxy: T.func,
  onInputDatoPreguntaChange: T.func,
  onInputValorPreguntaChange:T.func,
  onInputCheckPreguntaChange:T.func,
  onInputCheckOpcionChange:T.func,
  onGuardarFormularioProxy: T.func,
  // onAbrirModalProxy: T.func,
  onAgregarDatoPregunta: T.func,
  ordenarDatosPregunta: T.func,
  eliminarDatosPregunta:T.func,
  datosModal: T.object,
  editar:T.bool,
  handleValidarCampos: T.func,
  modal: T.object,
  openModalAction: T.func,
  closeModalAction: T.func,
  onUsuarioChangeProxy: T.func,
  onAgregarUsuarioAction: T.func,
  removeRowAction: T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => (campo) => (event) => {
      const {            
        nuevoFormulario: {
          existeAsignacion,
        },        
        notificacion,
        onInputChange,
      } = props;
      const cambiar = !isUndefined(event)
      let aplicarCambio = true
      if(campo === 2 && existeAsignacion){
        aplicarCambio=false
      }
      
      if (cambiar && aplicarCambio){
        if(campo !== 3 && campo !== 4 && campo !== 5)
          onInputChange(campo, event.target.value);
        else
          onInputChange(campo, event.target.checked);
      }
      if(!aplicarCambio){
        notificacion({
          message: 'Existen asignaciones para esta configuración, no se puede cambiar el tipo de formulario',
          options: {
            variant: 'warning',
          },
        })
      }

    },
    onUsuarioChangeProxy: (props) => () => (e) => {
      const {
        onChangeUsuarioAction,
      } = props;
      onChangeUsuarioAction(e)
    },
    scrollToBottomProxy: (props) => (questionsEnd,tipo) => {
      const {
        agregarPreguntaAction,
      } = props;
      agregarPreguntaAction(tipo)
      setTimeout(() => {questionsEnd.scrollIntoView({ behavior: "smooth" })}, 100)
    },
    onInputPreguntaChangeProxy: (props) => (indice) => (event) => {
      const {
        onInputPreguntaChange,
      } = props;
      if (!isUndefined(event))
        onInputPreguntaChange(indice, event.target.value);
    },
    onInputSeccionChangeProxy: (props) => (indice) => (event) => {
      const {
        onInputNombreSeccionChange,
      } = props;
      onInputNombreSeccionChange(indice, event.target.value);
    },
    onInputDescripcionSeccionChangeProxy: (props) => (indice) => (event) => {
      const {
        onInputDescripcionSeccionChange,
      } = props;
      // if (!isUndefined(event))
      onInputDescripcionSeccionChange(indice, event.target.value);
    },
    onInputRespuestaChangeProxy: (props) => (indice,tipo) => () => {
      const {
        onInputRespuestaChange,
      } = props;
      onInputRespuestaChange(indice,tipo);
    },
    ordenarPreguntaProxy: (props) => (tipo,tipoOrdenamiento,indice) => () => {
      const {
        ordenarPregunta,
      } = props;
      ordenarPregunta(tipo,tipoOrdenamiento,indice);
    },
    copiarPreguntaProxy: (props) => (indice,tipo) => () => {
      const {
        copiarPregunta,
      } = props;
      copiarPregunta(indice,tipo);
    },
    eliminarPreguntaProxy: (props) => (indice) => () => {
      const {
        eliminarPregunta,
      } = props;
      eliminarPregunta(indice);
    },
    mostrarPreguntasProxy: (props) => (indice,band) => () => {
      const {
        mostrarPreguntas,
      } = props;
      mostrarPreguntas(indice,band);
    },
    
    onInputTipoPreguntaChangeProxy: (props) => (indice) => (event) => {
      const {
        onInputTipoPreguntaChange,
      } = props;
      if (!isUndefined(event))
        onInputTipoPreguntaChange(indice, event.target.value);
    },
    onGuardarFormularioProxy: (props) => (band) => () => {
      const {
        guardarFormulario,
      } = props;
      guardarFormulario(band);
      
    },
    // onAbrirModalProxy: (props) => () => () => {
    //   const {
    //     handleValidarCampos,
    //   } = props;
    //   handleValidarCampos();
    // },
  })
)(FormularioNuevo);