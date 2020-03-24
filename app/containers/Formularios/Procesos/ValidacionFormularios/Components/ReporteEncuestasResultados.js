/* eslint-disable no-fallthrough */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import T from 'prop-types';
import {Paper, Grid, Typography, Button, Modal} from '@material-ui/core';
import ComboMultiple from 'components/FiltroSeleccion';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Input from 'components/FormInput';

import { GetApp } from '@material-ui/icons'
import XLSX from 'xlsx';
import { rotate90 } from '2d-array-rotation';
import Seccion from '../../../Reportes/ReporteEncuestas/components/Seccion';
import BotonSuccess from "../../../../../components/BotonSuccess";
import BotonCancelar from "../../../../../components/BotonCancelar";
import { chunk } from 'lodash';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: 'relative',
    padding: 15,
    backgroundColor: '#fff',
    width: '50%',
  };
}

const styles = () => ({
  grid: {
    marginBottom: 20,
  },
  reporte: {
    color: '#616161',
    fontWeight: 500,
    fontSize: 26,
  },
  download: {
    color: 'white',
    backgroundColor: '#28950F',
    fontWeight: 'normal',
    position: 'relative',
    top: 10,
    '&:hover': {
      backgroundColor: '#28950FAA',
    },
  },
  downloadIcon: {
    marginRight: 5,
  },
  paper: {
    position: 'relative',
    padding: 20,
  },
  estatusLabel: {
    fontSize: 11,
  },
  estatus: {
    marginTop: 9,
    fontSize: 15,
  },
})

/* eslint-disable react/prefer-stateless-function */
class ReporteEncuestasResultados extends React.Component {
  
  componentDidMount(){
    this.props.actions.requestGetDepartamentosPuestosAction();
  }

  exportarExcelEvaluacion(usuariosRespuestas, secciones){
    // Calcular la fila de los totales
    const totales = rotate90(usuariosRespuestas.map(usuarioRespuesta => 
      usuarioRespuesta.EMP[0].FRS.map(formularioRespuestaSeccion => formularioRespuestaSeccion.Calificacion),
    )).map(el => el.reduce((accumulator, currentValue) => Math.round( (accumulator + currentValue) * 100  ) / 100));

    const data = [
      // Cabeceras
      ['Colaborador', 'Departamento', 'Puesto'].concat(secciones.map(seccion => seccion.Nombre)).concat('Promedio general'),

      // Usuarios y calificaciones
      ...usuariosRespuestas.map(usuarioRespuesta => [
        usuarioRespuesta.Nombre,
        usuarioRespuesta.EMP[0].Departamento,
        usuarioRespuesta.EMP[0].Puesto,
        ...usuarioRespuesta.EMP[0].FRS.map(formularioRespuestaSeccion => formularioRespuestaSeccion.Calificacion)
          .concat(usuarioRespuesta.EMP[0].FRS
            .map(formularioRespuestaSeccion => formularioRespuestaSeccion.Calificacion)
            .reduce((accumulator, currentValue) => Math.round((accumulator + currentValue) * 100) / 100)),
      ]),

      // Totales
      ['Total general', '', '', ...totales],
    ];

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'Reporte'.concat('.xlsx'));  
  }

  exportarExcelEncuesta(secciones){
 
    const wb = XLSX.utils.book_new();

    secciones.forEach(seccion => {
      
      const ws = [];
      seccion.FormularioPreguntas.forEach(formularioPregunta => {
        switch(formularioPregunta.TipoPregunta){
          case 'SM':
          case 'CV': {
            ws.push(
              [formularioPregunta.Nombre],
              ['Respuestas', 'Cantidad'],
              ...formularioPregunta.FormularioPreguntasDetalle
                .map(formularioPreguntaDetalle => 
                  [
                    formularioPreguntaDetalle.Nombre,
                    formularioPreguntaDetalle.Resultado 
                      ? [formularioPreguntaDetalle.Resultado.length] 
                      : [0],
                  ]),
              [''],
              [''],
            );
            break;
          } 
          case 'LD': {
            ws.push(
              [formularioPregunta.Nombre],
              ['Respuestas', 'Cantidad', 'Calificación'],
              ...formularioPregunta.FormularioPreguntasDetalle
                .map(formularioPreguntaDetalle => 
                  [
                    formularioPreguntaDetalle.Nombre,
                    formularioPreguntaDetalle.Resultado 
                      ? [formularioPreguntaDetalle.Resultado.length] 
                      : [0],
                    formularioPreguntaDetalle.Resultado
                      ? formularioPreguntaDetalle.Resultado.map(resultado => resultado.Calificacion).reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
                      : [0],
                  ]),
              [''],
              [''],
            );
            break;
          }
          case 'PA': {
            ws.push(
              [formularioPregunta.Nombre],
              ['Respuestas'],
              ...(formularioPregunta.FormularioPreguntasDetalle[0].RespuestasPA.map((respuesta, index) => [`${index + 1} - ${respuesta.ValorTexto}`])),
              [''],
              [''],
            )
            break;
          }
          case 'SP': {
            ws.push(
              [formularioPregunta.Nombre],
              ['Preguntas'],
              ...formularioPregunta.FormularioPreguntasDetalle.map((formularioPreguntaDetalle, index) => {
                return [[`${index + 1} - ${formularioPreguntaDetalle.Nombre}`]].concat(formularioPreguntaDetalle.RespuestasPA.map(resultado => [' ', resultado.ValorTexto])).concat([''])
              }).flat(),
              [''],
              [''],
            )
            break;
          }
          case 'CVO': {
            ws.push(
              [formularioPregunta.Nombre],
              ['Preguntas', 'Calificaciones'].concat(formularioPregunta.RespuestasCVO.map(respuestaCVO => respuestaCVO.Nombre)),
              ...formularioPregunta.FormularioPreguntasDetalle.map((formularioPreguntaDetalle, index) => {
                return [`${index + 1} - ${formularioPreguntaDetalle.Nombre}`].concat( (
                  formularioPreguntaDetalle.CalificacionRespuesta.length === 1 
                    ? formularioPreguntaDetalle.CalificacionRespuesta[0].CalificacionPreguntita
                    : (formularioPreguntaDetalle.CalificacionRespuesta.map(calificacionRespuesta => calificacionRespuesta.CalificacionPreguntita).reduce((accumulator, currentValue) => accumulator + currentValue)) / (formularioPreguntaDetalle.CalificacionRespuesta.length)
                )).concat((
                  formularioPreguntaDetalle.Resultado.map(resultado =>  resultado.FR.length === 1 
                    ? resultado.FR[0].Respondidos
                    : resultado.FR.map(formularioRespuesta => formularioRespuesta.Respondidos).reduce((accumulator, currentValue) => accumulator + currentValue))
                ))
              }),
              [''],
              [''],
            )
            break;
          }
          default:
            break;
        }
        
      })
      if(ws.length > 0){
        
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(ws), seccion.Nombre.substring(0, 30));
      }
    })
    
    XLSX.writeFile(wb, `Reporte ${this.props.params.reporte.NombreAsignacion}`.concat('.xlsx'));  
  }
  
  render() {
    const {
      classes,
      onInputChangeProxy,
      actions:{
        openModalAction,
        closeModalAction,
        postValidacionAction,
      },
      params: {
        departamentos,
        puestos,
        departamentosSeleccionados,
        puestosSeleccionados,
        reporte,
        usuariosAsignados,
        usuariosAsignadosSeleccionados,
        usuarioId,
        usuarios,
        usuario,
        modal,
        comentario,
        show,
      },
    } = this.props;
    
    const puestosPorDepartamento = puestos.filter(el => departamentosSeleccionados.some(elem => elem.value === el.idDepartamento));

    let seccionesFiltro = [];
    
    let usuariosFiltro  = [];

    // Filtrar usuarios por departamento
    if(departamentosSeleccionados.length > 0){
      usuariosFiltro = reporte.UsuariosRespuestas.filter(usuarioRespuesta => departamentosSeleccionados.some(elem => elem.value === usuarioRespuesta.EMP[0].IdDepartamento))
      
      // Filtrar usuarios por puesto
      if(puestosSeleccionados.length > 0){
        usuariosFiltro = reporte.UsuariosRespuestas.filter(usuarioRespuesta => puestosSeleccionados.some(elem => elem.value === usuarioRespuesta.EMP[0].IdPuesto))
      }
      
    } else {
      // seccionesFiltro = reporte.Secciones;
      // usuariosFiltro = reporte.UsuariosRespuestas;
    } 

    // Filtro evaluaciones
    if(usuariosAsignadosSeleccionados.length > 0){
      usuariosFiltro = reporte.UsuariosRespuestas.filter(usuarioRespuesta => usuariosAsignadosSeleccionados.some(elem => elem.value === usuarioRespuesta.UsuarioId));
    } 

    // Secciones y usuarios por default si no han seleccionado nada en los filtros
    if(departamentosSeleccionados.length === 0 && usuariosAsignadosSeleccionados.length === 0){
      seccionesFiltro = reporte.Secciones;
      usuariosFiltro = reporte.UsuariosRespuestas;
    } else if(departamentosSeleccionados.length > 0 || usuariosAsignadosSeleccionados.length > 0){
      seccionesFiltro = reporte.Secciones.filter(seccion => { 
        if(usuariosFiltro.filter(usuarioFiltro => usuarioFiltro.EMP[0].FRS.some(elem => elem.IdFormularioSeccion === seccion.FormularioSeccionId)).length > 0 ){
          return seccion;
        }
      }).map(seccion => ({
        ...seccion,
        PromedioSeccion: seccion.PromedioSeccion.filter(promedioSeccion => {
          if(usuariosFiltro.map(usuarioFiltro => usuarioFiltro.UsuarioId).includes(promedioSeccion.IdUsuarioCreacion)){
            return promedioSeccion
          }
        }),
        FormularioPreguntas: seccion.FormularioPreguntas.map(formularioPregunta => ({
          ...formularioPregunta,
          PromedioRepuesta: formularioPregunta.PromedioRepuesta 
            ? formularioPregunta.PromedioRepuesta.filter(promedioRespuesta => {
              if(usuariosFiltro.map(usuarioFiltro => usuarioFiltro.UsuarioId).includes(promedioRespuesta.IdUsuarioCreacion)){
                return promedioRespuesta
              } 
            })
            : [],
          FormularioPreguntasDetalle: formularioPregunta.FormularioPreguntasDetalle.map(formularioPreguntaDetalle => ({
            ...formularioPreguntaDetalle,
            RespuestasPA: (() => {
              switch(formularioPregunta.TipoPregunta){
                case 'PA':{
                  return formularioPreguntaDetalle.RespuestasPA.filter((respuestaPa) =>  {
                    if(usuariosFiltro.map(usuarioFiltro => usuarioFiltro.UsuarioId).includes(respuestaPa.IdUsuarioCreacion)){
                      return respuestaPa
                    }
                  })
                }
                default:
                  return formularioPreguntaDetalle.RespuestasPA;
              }
            })(),
            CalificacionRespuesta: (() => {
              switch(formularioPregunta.TipoPregunta){
                case 'CVO':{
                  return formularioPreguntaDetalle.CalificacionRespuesta.filter((calificacionRespuesta) =>  {
                    if(usuariosFiltro.map(usuarioFiltro => usuarioFiltro.UsuarioId).includes(calificacionRespuesta.IdUsuarioCreacion)){
                      return calificacionRespuesta
                    }
                  })
                }
                default:
                  return formularioPreguntaDetalle.CalificacionRespuesta;
              }
            })(),
            Resultado: (() => {
              switch(formularioPregunta.TipoPregunta){
                case 'CVO': {
                  return formularioPreguntaDetalle.Resultado.map(res => {
                    return {
                      ...res,
                      FR: res.FR.filter(formularioRespuesta => {
                        if(usuariosFiltro.map(usuarioFiltro => usuarioFiltro.UsuarioId).includes(formularioRespuesta.IdUsuario)){
                          return formularioRespuesta;
                        }
                      }),
                    }
                  })
                }
                case 'SM': 
                case 'CV':
                case 'SP':
                case 'LD': {
                  if(typeof formularioPreguntaDetalle.Resultado !== 'undefined'){
                    return formularioPreguntaDetalle.Resultado.filter(res => {
                      if(usuariosFiltro.map(usuarioFiltro => usuarioFiltro.UsuarioId).includes(res.IdUsuarioCreacion)){
                        return res;
                      }
                    })
                  } 
                  return [];
                }
                default:
                  return formularioPreguntaDetalle.Resultado;
              }
            })(),
          })),
        })),
      }))
    }

    let promedioAsignacion = 0;

    if(reporte.PromedioAsignacion){
      if(reporte.PromedioAsignacion.length > 0){
        
        // Filtro para el promedio de la asignación 
        const promediosFiltro = reporte.PromedioAsignacion.filter(promedio => usuariosFiltro.some(usuario => promedio.IdUsuarioCreacion === usuario.UsuarioId))
        
        promedioAsignacion = promediosFiltro.length > 0 
          ? (promediosFiltro.map(prom => prom.Calificacion).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / promediosFiltro.length).toFixed(2)
          : 0
      } else {
        promedioAsignacion = 0;
      }
    }
    
    return (
      <Grid container>
        <Grid className={classes.grid} container>
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={1}>
              <Grid container>
                <Typography 
                  className={classes.reporte}
                >
                  {reporte.NombreAsignacion}
                </Typography>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <ComboMultiple
                    valor={usuario}
                    onChange={onInputChangeProxy}
                    opciones={usuariosAsignados}
                    campoValido
                    label="Formulario realizado por:"
                    indice={1}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography style={{fontSize: 11}}>
                    Estatus
                  </Typography>
                  <Typography style={{color: reporte.Estatus ? reporte.Estatus === 'REFAPR' ? 'green' : 'red' : 'black', marginTop: 9, fontSize: 15}}>
                    {
                      // eslint-disable-next-line no-nested-ternary
                      reporte.Estatus ? reporte.Estatus === 'REFAPR' ? 'Aprobado' : 'Rechazado' : 'Pendiente de validación'
                    }  
                  </Typography>
                </Grid>
                {
                  // eslint-disable-next-line no-nested-ternary
                  show ? (
                    reporte.Comentario ? (
                      <Grid item xs={4}>
                        <Typography style={{fontSize: 11}}>
                          Comentario
                        </Typography>
                        <Typography style={{marginTop: 9, fontSize: 15}}>
                          {
                            // eslint-disable-next-line no-nested-ternary
                            reporte.Comentario
                          }  
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid item xs={4}>
                        <div style={{float: 'left', marginTop: 12}}>
                          <BotonCancelar
                            label='Rechazar'
                            onClick={()=> openModalAction('REFREC')}
                          />
                        </div>
                        <div style={{float: 'left', marginTop: 12, marginLeft: 15}}>
                          <BotonSuccess
                            label='Aprobar'
                            onClick={()=> openModalAction('REFAPR')}
                          />
                        </div>
                      </Grid>
                    )
                  ) : null 
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {
          show ? 
            seccionesFiltro.map(seccion => 
              (
                <Seccion 
                  key={seccion.FormularioSeccionId}
                  {...(seccion.Color ? {color: seccion.Color} : {})}
                  nombre={seccion.Nombre}
                  descripcion={seccion.Descripcion}
                  formularioPreguntas={seccion.FormularioPreguntas}
                  promedio={seccion.PromedioSeccion}
                  tipoFormulario={reporte.TipoFormulario}
                />
              )
            )
            : null
          
        }
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modal.open}
        >
          <div style={getModalStyle()}>
            <Grid container style={{textAlign: 'center'}}>
              <Typography style={{fontSize: 18, fontWeight: 600, margin: 'auto'}}>
                Aprobar / Rechazar  <br/> Ingrese comentario de aprobado o rechazado
              </Typography>
            </Grid>
            <Input
              width='100%'
              onChange={onInputChangeProxy}
              nomCampo='Comentarios:'
              tipoInput='text'
              longitud='200'
              isComplete
              multiline
              rows={6}
              valor={comentario}
              indice={2}
              variant="outlined"
              styles={{marginTop: 30}}
            />
            <div style={{overflow: 'hidden'}}>
              <div style={{float: 'right'}}>
                <div style={{float: 'left', marginTop: 12}}>
                  <BotonCancelar
                    label='Cerrar'
                    onClick={closeModalAction}
                  />
                </div>
                <div style={{float: 'left', marginTop: 12, marginLeft: 15}}>
                  <BotonSuccess
                    label='Aceptar'
                    onClick={postValidacionAction}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </Grid>
    )  
  }
}

ReporteEncuestasResultados.propTypes = {
  actions: T.object,
  params: T.object,
  onInputChangeProxy: T.func,
};

export default compose(
  withHandlers({
    onInputChangeProxy: (props) => (id) => (e) => { 
      const {
        actions: {
          onChangeComboAction,
        },
      } = props;
      let value
      
      if (id === 1)
        value = e
      else
        // eslint-disable-next-line prefer-destructuring
        value = e.target.value
      onChangeComboAction(id, value);
    },
  }),
  withStyles(styles),
)(ReporteEncuestasResultados);