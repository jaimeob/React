/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
import grey from '@material-ui/core/colors/grey';
// import BotonSuccess from "components/BotonSuccess";
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import { compose } from 'redux';
// import {isUndefined} from 'lodash';
// import Tabla from '../../../../../../components/DataTable';
// import Modal from '../../../../components/ListadoFormulario/components/Modal/alertDialog';
// import BotonCancelar from "../../../../../../components/BotonCancelar";
// import './styles.css';
import {
  TransitionGroup,
} from 'react-transition-group';
import { AppBar, Toolbar, Typography, Fab, Slide, Checkbox,TextField, Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import BurgerIcon from '@material-ui/icons/CalendarViewDayOutlined';
import SaveIcon from '@material-ui/icons/Save';
// import Input from 'components/FormInput';
// import Radio from '@material-ui/core/Radio';
// import Seleccion from 'components/Seleccion';
import Modal from 'components/Dialog/alertDialog';
import Pregunta from '../Pregunta'
import Seccion from '../Seccion'
import { Container, OH, Grid5, GridCompleto, Grid70, Grid50 } from '../../styledComponents';
// import ModalUsuario from '../Modal';

// const styles = () => ({
//   radioVerde:{
//     textTransform:'60px',
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
//   },
//   success: {
//     colorSecondary:'#28950f',
//   },
// })


// eslint-disable-next-line react/prefer-stateless-function
export class RespuestaNueva extends React.Component {

  render() {
    const {
      classes,
      regresarAction,
      mostrarPreguntasProxy,
      datosModal,
      nuevaRespuesta: {
        // preguntas,
        titulo,
        descripcion,
        preguntas,
        permiteEditar,
        cabecerasArchivos,
      },
      documentacion,
      onPreguntaListaChange,
      onChangeRespuestaMultiple,
      onChangeInputRespuesta,
      onGuardarRespuestasProxy,
      handleValidarCampos,
      tituloFormulario,
      tipoFormulario,
      handleChangeArchivo,
      onRowsSeleccionadosChange,
      handleDownloadArchivo,
      handleDeleteArchivo,
      notificacion,
      nombreEvaluado,
    } = this.props;

    const arrayPreguntas = preguntas.filter(dato => dato.tipoPregunta !== 'SECCION')
    const arraySecciones = preguntas.filter(dato => dato.tipoPregunta === 'SECCION')

    return (
      <div>
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}> 
            <Tooltip title="Regresar" placement="bottom-end"> 
              <IconButton className="icon" onClick={regresarAction}> 
                <ArrowBackIcon /> 
              </IconButton>
            </Tooltip>
            <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
              {`Responder ${tituloFormulario}`}
            </Typography> 
          </Toolbar> 
        </AppBar>
        <OH>
          <GridCompleto>
            <OH style={{padding: 0}}>
              <Container style={{paddingBottom: 15}}>
                <Modal 
                  open={datosModal.abrirModal}
                  typeAlert='Report'
                  typeOptions='Select'
                  title='Confirmar....'
                  message={datosModal.mensajeConfirmacion}
                  onClickAccept={onGuardarRespuestasProxy(true)}
                  onClickCancel={onGuardarRespuestasProxy(false)}
                />
                <OH>
                  <Grid50>
                    <div>
                      <GridCompleto style={{minHeight: 'auto'}}>
                        {/* Lo mas seguro que aqui vaya un textfield */}
                        <Typography variant="h6" color="primary" style={{fontSize: 24, flexGrow: 1, textTransform: 'none', marginTop: 10, color: '#616161'}}> 
                          {titulo}
                        </Typography>
                        {/* Aqui va la descripcion */}
                        <Typography variant="h5" color="primary" style={{fontSize: 20, fontWeight: 500, flexGrow: 1, textTransform: 'none', marginTop: 10, color: '#616161'}}> 
                          {descripcion}
                        </Typography>
                        {tipoFormulario === 'REFEVA'?
                          <Typography variant="h5" color="primary" style={{fontSize: 20, fontWeight: 500, flexGrow: 1, textTransform: 'none', marginTop: 10, color: '#616161'}}> 
                            {`Usuario a evaluar: ${nombreEvaluado}`}
                          </Typography>  
                          :null
                        }
 

                      </GridCompleto>
                    </div>
                  </Grid50>
                </OH>
              </Container>
            </OH>
          </GridCompleto>
          {/* <Grid5 style={{position: 'fixed', right: 0}}>
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
          </Grid5> */}
        </OH>
        <GridCompleto style={{position:'relative'}}>
          <TransitionGroup>
            {
              preguntas.map((pregunta,index) => (
              // <Container style={{height: 100, width: '100%'}}>
              //   {pregunta.orden}
              // </Container>
                pregunta.tipoPregunta !== 'SECCION'?
                  pregunta.mostrarPregunta?
                    <Slide key={`tipoPregunta ${pregunta.contador}`} direction="right" in mountOnEnter unmountOnExit >
                      <Pregunta
                        key={`tipoPregunta ${pregunta.contador}`}
                        regresarAction ={regresarAction}
                        pregunta ={pregunta}
                        indice ={index}
                        totalPreguntas = {preguntas.length}
                        onPreguntaListaChange={onPreguntaListaChange}
                        onChangeRespuestaMultiple={onChangeRespuestaMultiple}
                        onChangeInputRespuesta={onChangeInputRespuesta}
                        classes={classes}
                        permiteEditar={permiteEditar}
                        documentacion={documentacion}
                        cabecerasArchivos={cabecerasArchivos}
                        handleChangeArchivo={handleChangeArchivo}
                        handleDownloadArchivo={handleDownloadArchivo}
                        handleDeleteArchivo={handleDeleteArchivo}
                        onRowsSeleccionadosChange={onRowsSeleccionadosChange}
                        notificacion={notificacion}
                      />
                    </Slide>
                    :null
                  :
                  <Slide autoFocus={!pregunta.datosValidos} key={`tipoSeccion ${pregunta.contador}`} direction="right" in mountOnEnter unmountOnExit >
                    <Seccion
                      regresarAction ={regresarAction}
                      pregunta ={pregunta}
                      indice ={index}
                      arrayPreguntas={arrayPreguntas}
                      totalSecciones={arraySecciones.length}
                      totalPreguntas = {preguntas.length}
                      mostrarPreguntasProxy={mostrarPreguntasProxy}
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

        </GridCompleto>
        {/* <Grid5 style={{position: 'fixed', right: '1%',bottom:'2%'}}>
          <div>
            <div> */}

        {permiteEditar?
          <Tooltip title="Guardar" placement="bottom-end"> 
            <Fab
              onClick={handleValidarCampos}
              style={{position: 'fixed',width:'3rem', height:'3rem',right: '1.2%',bottom:'3%',backgroundColor:'#28950f',color:'white'}}
            > 
              <SaveIcon/>
            </Fab>
          </Tooltip>
          :
          <Tooltip title="Regresar" placement="bottom-end"> 
            <Fab
              onClick={regresarAction}
              style={{position: 'fixed',width:'3rem', height:'3rem',right: '1.2%',bottom:'3%',backgroundColor:'#28950f',color:'white'}}
            > 
              <ArrowBackIcon />
            </Fab>
          </Tooltip>
        }

      </div>
    );
  }
}

RespuestaNueva.propTypes = {
  classes: T.object,
  regresarAction: T.func,
  onPreguntaListaChange: T.func,
  onChangeRespuestaMultiple:T.func, 
  onChangeInputRespuesta:T.func,
  mostrarPreguntasProxy:T.func,
  nuevaRespuesta: T.object,
  datosModal: T.object,
  onGuardarRespuestasProxy:T.func,
  handleValidarCampos:T.func,
  tituloFormulario: T.string,
  nombreEvaluado:T.string,
  tipoFormulario:T.string,
  documentacion:T.object,
  handleChangeArchivo: T.func,
  onRowsSeleccionadosChange:T.func,
  handleDownloadArchivo: T.func,
  handleDeleteArchivo:T.func,
  notificacion:T.func,
  
};



export default compose(
  // withStyles(styles),
  withHandlers({
    mostrarPreguntasProxy: (props) => (indice,band) => () => {
      const {
        mostrarPreguntas,
      } = props;
      mostrarPreguntas(indice,band);
    },
    onGuardarRespuestasProxy: (props) => (band) => () => {
      const {
        guardarRespuesta,
      } = props;
      guardarRespuesta(band);
      
    },
    // handleAbrirModalProxy: (props) => (band) => () => {
    //   const {
    //     handleAbrirModal,
    //   } = props;
    //   handleAbrirModal(band);
      
    // },
    
  })
)(RespuestaNueva);

