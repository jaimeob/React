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
  // AppBar,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import BlockIcon from '@material-ui/icons/Block'
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
  textFieldNormal: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 33,
  },
  textFieldInvertido: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 33,
  },
  botonAyuda:{
    width: '0.8em', 
    height: '0.8em',
    opacity: 1,
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


function Opcion(props){
  const {
    classes,
    indicePregunta,
    // regresarAction,
    pregunta,
    onInputDatoPreguntaChangeProxy,
    onInputValorPreguntaChangeProxy,
    ordenarDatosPreguntaProxy,
    eliminarDatosPreguntaProxy,
    onAgregarDatoPregunta,
    tipoFormulario,
    validacion,
    onInputCheckOpcionChangeProxy,
  } = props;
  const valorBooleano = true;
  // const nombre = "1. AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA bbbb cccceeee "
  // const nombre = "1. Primeira pregunta"
  // if (tipoPregunta === 'CVO')
  const datosValidos = pregunta.datosOpciones.filter(dato=> dato.id !== '')  
  const existenValores = pregunta.datosOpciones.filter(dato=> dato.id !== '' && !dato.noAplica)  
  const mostrarValor = tipoFormulario === 'REFEVA' || (tipoFormulario === 'REFENC' && validacion)
  return (
    <Grid
      container>
      <Grid
        // container
        item
        xs={7}
        sm={7}
        md={7}
        lg={7}
        xl={7}
      >
        <Typography 
          variant="body1" 
          // color="primary" 
          style={{marginTop:'10px'}}
        > 
        Opciones
          {/* {pregunta.tipoPregunta === 'CVO'?'Preguntas':'Opciones'} */}
        </Typography> 
      </Grid>
      {mostrarValor && pregunta.tieneCalificacion && existenValores.length>0 ?
        <>  
          <Grid
            // container
            item
            xs={1}
            sm={1}
            md={1}
            lg={1}
            xl={1}
          >
            <Typography 
              variant="body1" 
              // color="primary" 
              style={{marginTop:'10px'}}
            > 
              Valores
              {/* {pregunta.tipoPregunta === 'CVO'?'Preguntas':'Opciones'} */}
            </Typography> 
          </Grid>
          <Grid
            // container
            item
            xs={2}
            sm={2}
            md={2}
            lg={2}
            xl={2}
          >
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Valores</Typography>
                  {`Se captura un valor normal y un valor invertido, el valor invertido se usara en preguntas que esten marcadas como "Invertida"`}
                </React.Fragment>
              }
            >
              <HelpOutlineIcon 
                className={classes.botonAyuda}
                style={{marginTop:'12px',marginLeft:'15px',position:'absolute',color:'#ff9100'}}                        
              />
            </HtmlTooltip>
          </Grid>
        </>
        :null
      }
      

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
          {pregunta.datosOpciones.map((dato,indice) => (
            <ListItem 
              key={`opcion ${dato.id}`}
              style={{padding:0,alignItems:'end'}}
            >
              <Typography 
                variant="body2" 
              > 
                {`${indice+1}.`} 
              </Typography> 
              <InputBase
                className={classes.input}
                placeholder="Añadir opción..."
                inputProps={{ 'aria-label': 'search google maps' }}
                value={dato.nombre}
                error={dato.errorNombre}
                multiline
                onChange= {onInputDatoPreguntaChangeProxy(1,indice,indicePregunta)}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    onAgregarDatoPregunta(1,indice,indicePregunta)
                    ev.preventDefault()
                  }
                }}
                autoFocus={dato.id === ''}
              /> 
              {pregunta.tipoPregunta === 'CVO' && dato.id !== '' && !dato.noAplica && mostrarValor && pregunta.tieneCalificacion ?
              <>
                  <TextField
                    id="standard-bare"
                    className={classes.textFieldNormal}
                    value={dato.valor}
                    error={dato.errorValor}
                    placeholder="Norm"
                    // margin="normal"
                    type="number"
                    onChange={onInputValorPreguntaChangeProxy(1,0,indice,indicePregunta)}  
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

              {pregunta.tipoPregunta === 'CVO' && !dato.noAplica  && dato.id !== '' && mostrarValor && pregunta.tieneCalificacion ?
              <>
                  <TextField
                    id="standard-bare"
                    className={classes.textFieldInvertido}
                    value={dato.valorInvertido}
                    error={dato.errorValorInvertido}
                    placeholder="Inver"
                    // margin="normal"
                    type="number"
                    onChange={onInputValorPreguntaChangeProxy(1,1,indice,indicePregunta)}  
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
              {pregunta.tipoPregunta === 'CVO' && dato.id !== '' && mostrarValor && pregunta.tieneCalificacion ?
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
                        onClick={onInputCheckOpcionChangeProxy(indice,indicePregunta)}
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
                  onClick={ordenarDatosPreguntaProxy(1,0,indice,indicePregunta)}
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
                    onClick={ordenarDatosPreguntaProxy(1,1,indice,indicePregunta)}
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
                    onClick={eliminarDatosPreguntaProxy(1,indice,indicePregunta)}
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
                :null }

            </ListItem>
          ))
          }



        </List>
      </Grid>
    </Grid>
  );
}

Opcion.propTypes = {
//   pestañaSeleccionada: T.number,
  classes: T.object,
  // preguntas: T.object,
  // regresarAction: T.func,
  onInputDatoPreguntaChangeProxy: T.func,
  onInputValorPreguntaChangeProxy: T.func,
  ordenarDatosPreguntaProxy: T.func,
  eliminarDatosPreguntaProxy: T.func,
  onAgregarDatoPregunta: T.func,
  indicePregunta: T.number,
  pregunta: T.object,
  tipoFormulario: T.string,
  validacion:T.bool,
  onInputCheckOpcionChangeProxy:T.func,
};



export default compose(
  withStyles(styles),
  withHandlers({
    onInputCheckOpcionChangeProxy: (props) => (indice,indicePregunta) => (event) => {
      const {
        onInputCheckOpcionChange,
      } = props;
      if (!isUndefined(event))
        onInputCheckOpcionChange(indice,indicePregunta,event.target.value);
    },
  })
)(Opcion);
