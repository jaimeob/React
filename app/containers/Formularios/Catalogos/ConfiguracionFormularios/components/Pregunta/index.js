import React from 'react';
import T from 'prop-types';
// import { uniqueId} from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
// import Input from 'components/FormInput';
import {isUndefined,parseInt} from 'lodash';
import {
  Grid,
  Typography,
  List,
  ListItem,
  IconButton,
  TextField,
  Tooltip,
  FormControlLabel,
  // AppBar,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import InputBase from '@material-ui/core/InputBase';
import SubirArchivoIcon from '@material-ui/icons/CloudUploadOutlined';
import RequeridoIcon from '@material-ui/icons/ErrorOutline';
import Switch from 'components/Switch';
import Divider from '@material-ui/core/Divider';
import RepeatIcon from '@material-ui/icons/Repeat';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import BlockIcon from '@material-ui/icons/Block'


import './styles.css';
// import { getTiposPreguntasApi } from '../../api';
// import Seleccion from 'components/Seleccion';
// import Switch from 'components/Switch';

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing.unit,
    flex: 1,
    fontSize:'14px',
    padding: '3px 0 5px',
  },
  iconButton: {
    padding: 50,
  },
  divider: {
    height: 20,
    width:1,
    margin: 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 33,
  },
  botonActivo:{
    width: '0.8em', 
    height: '0.8em',
    color: '#28950F',
    opacity: 0.75,
  },
  botonDesactivado:{
    width: '0.8em', 
    height: '0.8em',
    opacity: 0.75,
  },
})


// Array.prototype.move =function(from, to){this.splice(to,0,this.splice(from,1)[0]);};
// function mover(arreglo,origen,destino){
//   arreglo.splice(destino,0,arreglo.splice(origen,1)[0]);
// }


function Pregunta(props){
  const {
    classes,
    indicePregunta,
    // regresarAction,
    pregunta,
    onInputDatoPreguntaChangeProxy,
    onInputValorPreguntaChangeProxy,
    onInputCheckPreguntaChangeProxy,
    ordenarDatosPreguntaProxy,
    eliminarDatosPreguntaProxy,
    onAgregarDatoPregunta,
    tipoFormulario,
    validacion,
  } = props;
  const valorBooleano = true;
  // const nombre = "1. AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA bbbb cccceeee "
  // const nombre = "1. Primeira pregunta"
  // if (tipoPregunta === 'CVO')
  const datosValidos = pregunta.datosPreguntas.filter(dato=> dato.id !== '')
  const mostrarValor = tipoFormulario === 'REFEVA' || (tipoFormulario === 'REFENC' && validacion)
  return (
    <Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Typography 
          variant="body1" 
          // color="primary" 
          style={{marginTop:'10px'}}
        > 
          {pregunta.tipoPregunta === 'CVO'||pregunta.tipoPregunta === 'SP'?'Preguntas':'Opciones'}
        </Typography> 
      </Grid>
      <Grid
        // container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <List 
          dense={valorBooleano}
        >
          {pregunta.datosPreguntas.map((dato,indice) => (
            <ListItem
              key={`pregunta ${dato.id}`} 
              style={{padding:0,alignItems:'end'}}
            >
              <Typography 
                variant="body2" 
              > 
                {`${indice+1}.`} 
              </Typography> 
              <InputBase
                className={classes.input}
                placeholder={pregunta.tipoPregunta === 'CVO'||pregunta.tipoPregunta === 'SP'?"Añadir pregunta...":"Añadir opciones..."}
                inputProps={{ 'aria-label': 'search google maps' }}
                value={dato.nombre}
                error={dato.errorNombre}
                multiline
                onChange= {onInputDatoPreguntaChangeProxy(0,indice,indicePregunta)}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    onAgregarDatoPregunta(0,indice,indicePregunta)
                    ev.preventDefault()
                  }
                }}
                autoFocus={dato.id === ''}
              />
              {/* {dato.id === '' ?
                <FormControlLabel
                  style={{height:0}}
                  control={
                    <Switch
                      checked={pregunta.solicitarRespuesta}
                      // onChange={onInputRespuestaChangeProxy(indice)}  
                    />
                  }
                  label="Añadir opción otros"
                  labelPlacement="start"
                />
                :null} */}

    
              {/* <TextField
                label="Valor"
                // fullWidth
                type="number"
                value={dato.valor}
                // error={errores.errorTiempoRespuesta}
                onChange={onInputValorPreguntaChangeProxy(0,indice,indicePregunta)}  
                InputLabelProps={{
                  shrink:true,
                  style:{
                    fontSize: 14,
                  },
                }}
                // disabled={disabled}                           
              /> */}
              {(pregunta.tipoPregunta === 'LD' || pregunta.tipoPregunta === 'SM') && dato.id !== '' && !dato.noAplica && mostrarValor && pregunta.tieneCalificacion?
                <>
                  <TextField
                    id="standard-bare"
                    className={classes.textField}
                    value={dato.valor}
                    error={dato.errorValor}
                    placeholder="Valor"
                    // margin="normal"
                    type="number"
                    onChange={onInputValorPreguntaChangeProxy(0,0,indice,indicePregunta)}  
                    inputProps={{ 
                      'aria-label': 'bare',
                      shrink:true,
                      style:{
                        fontSize: 14,
                        paddingBottom:0,
                      },
                    }}
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                    }}
                  />
                  <Divider className={classes.divider} orientation="vertical" />
                  </>
                :null}

              { (pregunta.tipoPregunta === 'CV' || pregunta.tipoPregunta === 'SM') && dato.id !== ''?
                  <>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Permitir captura - <font color={dato.captura?"green":"red"}>{dato.captura?'Activado':'Desactivado'}</font></Typography>
                          {"Al habilitarlo se permitirá al usuario la captura libre de texto para esta opción."}
                        </React.Fragment>
                      }
                    >
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={onInputCheckPreguntaChangeProxy(3,indice,indicePregunta)}
                        style={{width:'1em', height:'1em'}}
                      >
                        <TextFieldsIcon 
                          className={dato.captura?classes.botonActivo:classes.botonDesactivado}
                          style={{position:'absolute'}}                        
                        />
                      </IconButton>
                    </HtmlTooltip>
                  <Divider className={classes.divider} orientation="vertical" />
                </>
                :null}
              {dato.id !== '' && (pregunta.tipoPregunta === 'SA' || pregunta.tipoPregunta === 'SP')?
                <>
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">Obligatorio - <font color={dato.requerido?"green":"red"}>{dato.requerido?'Activado':'Desactivado'}</font></Typography>
                      {"Se utiliza cuando se requiere la selección o respuesta de manera obligatoria."}
                    </React.Fragment>
                  }
                >
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={onInputCheckPreguntaChangeProxy(0,indice,indicePregunta)}
                    style={{width:'1em', height:'1em'}}
                  >
                    <RequeridoIcon 
                      className={dato.requerido?classes.botonActivo:classes.botonDesactivado}
                      style={{position:'absolute'}}                        
                    />
                  </IconButton>
                </HtmlTooltip>
                <Divider className={classes.divider} orientation="vertical" />
                </>
                :null}
              {pregunta.tipoPregunta === 'SA' && dato.id !== ''?
                  <>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Subir archivo - <font color={dato.archivo?"green":"red"}>{dato.archivo?'Activado':'Desactivado'}</font></Typography>
                          {"Se utiliza cuando la opción permitirá subir un archivo de documentación o evidencia."}
                        </React.Fragment>
                      }
                    >
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={onInputCheckPreguntaChangeProxy(1,indice,indicePregunta)}
                        style={{width:'1em', height:'1em'}}
                      >
                        <SubirArchivoIcon 
                          className={dato.archivo?classes.botonActivo:classes.botonDesactivado}
                          style={{position:'absolute'}}                        
                        />
                      </IconButton>
                    </HtmlTooltip>
                  <Divider className={classes.divider} orientation="vertical" />
                </>
                :null}
              {pregunta.tipoPregunta === 'CVO' && dato.id !== '' && mostrarValor  && pregunta.tieneCalificacion?
                  <>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Valor invertido - <font color={dato.invertido?"green":"red"}>{dato.invertido?'Activado':'Desactivado'}</font></Typography>
                          {"Se utiliza cuando la pregunta requiere que el valor de las opciones se calcule invertido (ej. preguntas negadas)."}
                        </React.Fragment>
                      }
                    >
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={onInputCheckPreguntaChangeProxy(2,indice,indicePregunta)}
                        style={{width:'1em', height:'1em'}}
                      >
                        <RepeatIcon 
                          className={dato.invertido?classes.botonActivo:classes.botonDesactivado}
                          style={{position:'absolute'}}                        
                        />
                      </IconButton>
                    </HtmlTooltip>
                  <Divider className={classes.divider} orientation="vertical" />
                </>
                :null}
              {/* <Input
                onChange={onInputValorPreguntaChangeProxy(0,indice,indicePregunta)}
                // onChange={onInputChangeProxy(0,i)}
                nomCampo='Valor'
                // requerido
                // focus
                // isComplete={nombrePregunta.campoValido}
                // width='100%'
                mostrarShrink
                label = "Label"
                tipoInput='numero'
                longitud='150'
                valor={dato.valor}
                indice={indice}
              />  */}
              {(pregunta.tipoPregunta === 'LD' || pregunta.tipoPregunta === 'SM') && dato.id !== '' && mostrarValor && pregunta.tieneCalificacion ?
              <>
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">No aplica - <font color={dato.noAplica?"green":"red"}>{dato.noAplica?'Activado':'Desactivado'}</font></Typography>
                          {"Al activarlo, la opción no contara en el calculo de la calificación."}
                        </React.Fragment>
                      }
                    >
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={onInputCheckPreguntaChangeProxy(4,indice,indicePregunta)}
                        style={{width:'1em', height:'1em'}}
                      >
                        <BlockIcon 
                          className={dato.noAplica?classes.botonActivo:classes.botonDesactivado}
                          style={{position:'absolute'}}                        
                        />
                      </IconButton>
                    </HtmlTooltip>
                  <Divider className={classes.divider} orientation="vertical" />
                </>
                :null}
              {dato.id !== ''?
              <>
              <Tooltip title="Mover opción hacia abajo" placement="bottom">
                <IconButton 
                  edge="end" 
                  aria-label="delete"
                  onClick={ordenarDatosPreguntaProxy(0,0,indice,indicePregunta)}
                  style={{width:'1rem', height:'1rem'}}
                  disabled={indice+1 === datosValidos.length || dato.id === ''}
                >
                  <ArrowDown 
                    style={{position:'absolute'}}                        
                  />
                </IconButton>
              </Tooltip>
                <Divider className={classes.divider} orientation="vertical" />

                <Tooltip title="Mover opción hacia arriba" placement="bottom">
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={ordenarDatosPreguntaProxy(0,1,indice,indicePregunta)}
                    style={{width:'1rem', height:'1rem'}}
                    disabled={indice+1 === 1 || dato.id === ''}
                  >
                    <ArrowUp 
                      style={{position:'absolute'}}                        
                    />
                  </IconButton>
                </Tooltip>
                <Divider className={classes.divider} orientation="vertical" />

                <Tooltip title="Eliminar" placement="bottom">
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={eliminarDatosPreguntaProxy(0,indice,indicePregunta)}
                    style={{width:'1rem', height:'1rem'}}
                    disabled={datosValidos.length<2}
                  >
                    <ClearIcon 
                      style={{position:'absolute'}} 
                      fontSize='small'                       
                    />
                  </IconButton>
                </Tooltip>
              </>
                :null}
            </ListItem>
          ))
          }
        </List>
      </Grid>
    </Grid>
  );
}

Pregunta.propTypes = {
//   pestañaSeleccionada: T.number,
  classes: T.object,
  // preguntas: T.object,
  // regresarAction: T.func,
  onInputDatoPreguntaChangeProxy: T.func,
  onInputValorPreguntaChangeProxy: T.func,
  onInputCheckPreguntaChangeProxy: T.func,
  ordenarDatosPreguntaProxy: T.func,
  eliminarDatosPreguntaProxy: T.func,
  onAgregarDatoPregunta: T.func,
  indicePregunta: T.number,
  pregunta: T.object,
  tipoFormulario: T.string,
  validacion:T.bool,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onInputCheckPreguntaChangeProxy: (props) => (tipo,indice, indicePregunta) => (event) => {
      const {
        onInputCheckPreguntaChange,
      } = props;
      if (!isUndefined(event))
        onInputCheckPreguntaChange(tipo,indice,indicePregunta,event.target.value);
    },
  })
)(Pregunta);

