/* eslint-disable no-restricted-globals */
/* eslint-disable no-fallthrough */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import T from 'prop-types';
import {Paper, Grid, Typography, Button} from '@material-ui/core';
import ComboMultiple from 'components/FiltroSeleccion';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { GetApp } from '@material-ui/icons'
import XLSX from 'xlsx';
import {groupBy} from 'lodash';
import Seccion from './Seccion';

const styles = () => ({
  grid: {
    marginBottom: 20,
  },
  reporte: {
    color: '#616161',
    fontWeight: 500,
    fontSize: 16,
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
})

/* eslint-disable react/prefer-stateless-function */
class ReporteEncuestasResultados extends React.Component {
  
  componentDidMount(){
    this.props.actions.requestGetDepartamentosPuestosAction();
  }

  exportarExcelEvaluacion(usuariosRespuestas, secciones){ 
    const data = [
      // Cabeceras
      ['Colaborador', 'Departamento', 'Puesto'].concat(secciones.map(seccion => seccion.Nombre), 'Promedio general'),
      
      // Usuarios y calificaciones
      ...usuariosRespuestas.map(usuarioRespuesta => {
        
        const promediosSeccion = secciones.map(seccion => seccion.respuestasSeccion
          .filter(respuesta => respuesta.UsuarioEvaluado === usuarioRespuesta.value && respuesta.Calificacion > 0)
          .map(respuesta => respuesta.Calificacion)
          .reduce( (accumulator, currentValue) => accumulator + currentValue, 0) / seccion.respuestasSeccion
          .filter(respuesta => respuesta.UsuarioEvaluado === usuarioRespuesta.value && respuesta.Calificacion > 0).length
        )

        // Reemplazar los NaN por 0
        const promedioSeccionFormateado = promediosSeccion.map(promedio => isNaN(promedio) ? 0 : promedio.toFixed(2));

        // Pronedio total por evaluado
        const promedioTotal = promedioSeccionFormateado
          .filter(promedio => promedio > 0)
          .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0) / promedioSeccionFormateado
          .filter(promedio => promedio > 0).length

        return ([
          usuarioRespuesta.label,
          usuarioRespuesta.Departamento,
          usuarioRespuesta.Puesto,
          ...promedioSeccionFormateado,
          promedioTotal,
        ])
      } ),
    ];
    
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

    secciones.forEach((seccion, indexSeccion) => {
      const wsSecciones = [];
      seccion.preguntas.forEach(pregunta => {
        switch(pregunta.TipoPregunta){
          case 'SM':
          case 'CV': {
            wsSecciones.push(
              [pregunta.Nombre],
              ['Respuestas', 'Cantidad'],
              ...pregunta.respuestas.map(respuesta => [
                respuesta.Nombre,
                respuesta.resultado.length,
              ],
              ),
              [''],
              [''],
            );
            break;
          } 
          case 'LD': {
            wsSecciones.push(
              [pregunta.Nombre],
              ['Respuestas', 'Cantidad', 'Calificación'],
              ...pregunta.respuestas.map(respuesta => [
                respuesta.Nombre,
                respuesta.resultado.length,
                respuesta.resultado
                  .filter(resultado => resultado.Calificacion > 0)
                  .map(resultado => resultado.Calificacion)
                  .reduce( (accumulator, currentValue) => accumulator + currentValue, 0) / respuesta.resultado.filter(resultado => resultado.Calificacion > 0).length,
              ],
              ),
              [''],
              [''],
            );
            break;
          }
          case 'PA': {
            wsSecciones.push(
              [pregunta.Nombre],
              ['Respuestas'],
              ...pregunta.respuestas
                .map(respuesta => respuesta.resultado
                  .filter(resultado => resultado.ValorTexto)
                  .map((resultado, index) => [`${index + 1} - ${resultado.ValorTexto}`])
                ).flat(),
              [''],
              [''],
            );
            break;
          }
          case 'SP': {
            wsSecciones.push(
              [pregunta.Nombre],
              ['Respuestas'],
              ...pregunta.respuestas.map(respuesta => [
                respuesta.Nombre,
                ...respuesta.resultado.map(resultado  => [
                  resultado.ValorTexto,
                ]),
              ]),
              [''],
              [''],
            );
            break;
          }
          case 'CVO': {
            // console.log(pregunta.respuestas.map(respuesta => respuesta.Nombre));
            pregunta.respuestasPreguntitas.forEach(respuesta => {
              pregunta.respuestas.forEach(pre => {
                const idsRespuesta = pre.resultado.map(res => res.IdRespuesta);
                if(!idsRespuesta.includes(respuesta.FormularioPreguntaDetalleId)){
                  pre.resultado.push({
                    IdRespuesta: respuesta.FormularioPreguntaDetalleId,
                  })
                }
              });
            });
            wsSecciones.push(
              [pregunta.Nombre],
              ['Preguntas', 'Calificaciones', ...pregunta.respuestasPreguntitas.map(respuestaPreguntita => respuestaPreguntita.Nombre)],
              ...pregunta.respuestas.map(respuesta => [
                respuesta.Nombre,
                respuesta.resultado
                  .filter(res => res.Calificacion > 0)
                  .map(res => res.Calificacion)
                  .reduce((accumulator, currentValue) => accumulator + currentValue, 0) / respuesta.resultado
                  .filter(res => res.Calificacion > 0).length,
                ...Object.values(groupBy(respuesta.resultado, 'IdRespuesta')).map(resultado => (
    
                  // Filtrar por el atributo IdFormularioPreguntaDetalle, si lo tiene quiere decir que hay una respuesta si no, poner 0 por default
                  resultado
                    .filter(res =>Object.prototype.hasOwnProperty
                      .call(res, 'IdFormularioPreguntaDetalle')).
                    length > 0 ? resultado.length : 0
                )),
              ]),          
              [''],
              [''],
            );
            break;
          }
          default:
            break;
        }
      })
      if(wsSecciones.length > 0){
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(wsSecciones), `${indexSeccion + 1}.${seccion.Nombre.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`.concat('.xlsx')  );
      }
    })
    XLSX.writeFile(wb, 'Reporte'.concat('.xlsx'));  
  }

  exportarExcelEncuesta(secciones){
    
    const wb = XLSX.utils.book_new();

    secciones.forEach((seccion, indexSeccion) => {
      const ws = [];
      seccion.preguntas.forEach(pregunta => {
        switch(pregunta.TipoPregunta){
          case 'SM':
          case 'CV': {
            ws.push(
              [pregunta.Nombre],
              ['Respuestas', 'Cantidad'],
              ...pregunta.respuestas.map(respuesta => [
                respuesta.Nombre,
                respuesta.resultado.length,
              ],
              ),
              [''],
              [''],
            );
            break;
          } 
          case 'LD': {
            ws.push(
              [pregunta.Nombre],
              ['Respuestas', 'Cantidad', 'Calificación'],
              ...pregunta.respuestas.map(respuesta => [
                respuesta.Nombre,
                respuesta.resultado.length,
                respuesta.resultado
                  .filter(resultado => resultado.Calificacion > 0)
                  .map(resultado => resultado.Calificacion)
                  .reduce( (accumulator, currentValue) => accumulator + currentValue, 0) / respuesta.resultado.filter(resultado => resultado.Calificacion > 0).length,
              ],
              ),
              [''],
              [''],
            );
            break;
          }
          case 'PA': {
            ws.push(
              [pregunta.Nombre],
              ['Respuestas'],
              ...pregunta.respuestas
                .map(respuesta => respuesta.resultado
                  .filter(resultado => resultado.ValorTexto)
                  .map((resultado, index) => [`${index + 1} - ${resultado.ValorTexto}`])
                ).flat(),
              [''],
              [''],
            );
            break;
          }
          case 'SP': {
            ws.push(
              [pregunta.Nombre],
              ['Respuestas'],
              ...pregunta.respuestas.map(respuesta => [
                respuesta.Nombre,
                ...respuesta.resultado.map(resultado  => [
                  resultado.ValorTexto,
                ]),
              ]),
              [''],
              [''],
            );
            break;
          }
          case 'CVO': {
            // console.log(pregunta.respuestas.map(respuesta => respuesta.Nombre));
            pregunta.respuestasPreguntitas.forEach(respuesta => {
              pregunta.respuestas.forEach(pre => {
                const idsRespuesta = pre.resultado.map(res => res.IdRespuesta);
                if(!idsRespuesta.includes(respuesta.FormularioPreguntaDetalleId)){
                  pre.resultado.push({
                    IdRespuesta: respuesta.FormularioPreguntaDetalleId,
                  })
                }
              });
            });
            ws.push(
              [pregunta.Nombre],
              ['Preguntas', 'Calificaciones', ...pregunta.respuestasPreguntitas.map(respuestaPreguntita => respuestaPreguntita.Nombre)],
              ...pregunta.respuestas.map(respuesta => [
                respuesta.Nombre,
                respuesta.resultado
                  .filter(res => res.Calificacion > 0)
                  .map(res => res.Calificacion)
                  .reduce((accumulator, currentValue) => accumulator + currentValue, 0) / respuesta.resultado
                  .filter(res => res.Calificacion > 0).length,
                ...Object.values(groupBy(respuesta.resultado, 'IdRespuesta')).map(resultado => (
    
                  // Filtrar por el atributo IdFormularioPreguntaDetalle, si lo tiene quiere decir que hay una respuesta si no, poner 0 por default
                  resultado
                    .filter(res =>Object.prototype.hasOwnProperty
                      .call(res, 'IdFormularioPreguntaDetalle')).
                    length > 0 ? resultado.length : 0
                )),
              ]),          
              [''],
              [''],
            );
            break;
          }
          default:
            break;
        }
      })
      if(ws.length > 0){
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(ws), `${indexSeccion + 1}.${seccion.Nombre.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)}`.concat('.xlsx')  );
      }
    })
      
    XLSX.writeFile(wb, `Reporte`.concat('.xlsx'));  
  }
  
  render() {
    const {
      classes,
      onInputChangeProxy,
      params: {
        departamentos,
        puestos,
        departamentosSeleccionados,
        puestosSeleccionados,
        asignacion,
        usuariosEvaluados,
        usuarioId,
        usuariosEvaluadosSeleccionados,
        usuariosAutorizados,
      },
    } = this.props;
    
    const puestosPorDepartamento = puestos.filter(el => departamentosSeleccionados.some(elem => elem.value === el.idDepartamento));

    // Calcular el promedio de la asignacion
    // filter: solamente tomar en cuenta las calificaciones mayores a 0
    // map: obtener un arreglo con todas las calificaciones
    // reduce: calcular el promedio
    let promedioAsignacion = asignacion.RequiereValidacion && asignacion.respuestasAsignacion
      .filter(respuestaAsignacion => respuestaAsignacion.Calificacion > 0)
      .map(respuestaAsignacion => respuestaAsignacion.Calificacion)
      .reduce( (accumulator, currentValue) => accumulator + currentValue, 0) 
      / asignacion.respuestasAsignacion.filter(respuestaAsignacion => respuestaAsignacion.Calificacion > 0).length;
   
    // variable que tiene todos los usuarios para los filtros

    let usuariosFiltro = [];

    // si el usuario es responsable puede ver el resultado de las personas a evaluar
    if(
      usuarioId === asignacion.UsuarioResponsable || 
      usuariosAutorizados.map(usuarioAutorizado => usuarioAutorizado.IdUsuarioAutorizado).includes(usuarioId)
    ){
      usuariosFiltro = usuariosEvaluados;
    } else {
      usuariosFiltro = usuariosEvaluados.filter(usuario => usuario.value === usuarioId);
    }

    // usuariosFiltro = asignacion.TipoFormulario === 'REFEVA' || asignacion.TipoFormulario === 'REFENC'
    // ? usuariosEvaluados 
    // : usuariosEvaluadores; 

    // filtro de usuarios para evaluaciones
    if(usuariosEvaluadosSeleccionados.length > 0){
      usuariosFiltro = usuariosEvaluadosSeleccionados;

      promedioAsignacion = asignacion.respuestasAsignacion
        .filter(respuestaAsignacion => respuestaAsignacion.Calificacion > 0 
          && 
          usuariosEvaluadosSeleccionados
            .map(usuarioSeleccionado => usuarioSeleccionado.value)
            .includes(respuestaAsignacion.UsuarioEvaluado))
        .map(respuestaAsignacion => respuestaAsignacion.Calificacion)
        .reduce( (accumulator, currentValue) => accumulator + currentValue, 0) / asignacion.respuestasAsignacion
        .filter(respuestaAsignacion => respuestaAsignacion.Calificacion > 0 
          &&
          usuariosEvaluadosSeleccionados
            .map(usuarioSeleccionado => usuarioSeleccionado.value)
            .includes(respuestaAsignacion.UsuarioEvaluado)).length;
    }

    if(departamentosSeleccionados.length > 0){
      const idsDepartamentos = departamentosSeleccionados.map(departamento => departamento.value);

      usuariosFiltro = usuariosEvaluados.filter(usuario => idsDepartamentos.includes(usuario.IdDepartamento));

      if(puestosSeleccionados.length > 0){
        const idsPuestos = puestosSeleccionados.map(puesto => puesto.value);

        usuariosFiltro = usuariosEvaluados.filter(usuario => idsPuestos.includes(usuario.IdPuesto));
      }

      promedioAsignacion = asignacion.respuestasAsignacion
        .filter(respuestaAsignacion => respuestaAsignacion.Calificacion > 0 
          && 
          usuariosEvaluadosSeleccionados
            .map(usuarioSeleccionado => usuarioSeleccionado.value)
            .includes(respuestaAsignacion.UsuarioId))
        .map(respuestaAsignacion => respuestaAsignacion.Calificacion)
        .reduce( (accumulator, currentValue) => accumulator + currentValue, 0) / asignacion.respuestasAsignacion
        .filter(respuestaAsignacion => respuestaAsignacion.Calificacion > 0 
          &&
          usuariosEvaluadosSeleccionados
            .map(usuarioSeleccionado => usuarioSeleccionado.value)
            .includes(respuestaAsignacion.UsuarioId)).length;
    }

    const seccionesFiltro = asignacion.secciones.map(seccion => ({
      ...seccion,
      
      // Filtro de usuarios seleccionados para el promedio de la sección
      respuestasSeccion: seccion.respuestasSeccion
        .filter(respuestaSeccion => asignacion.TipoFormulario === 'REFEVA' 
          ?  usuariosFiltro.map(usuarioFiltro => usuarioFiltro.value).includes(respuestaSeccion.UsuarioEvaluado)
          :  usuariosFiltro.map(usuarioFiltro => usuarioFiltro.value).includes(respuestaSeccion.IdUsuario)
        ),
      // Filtro de usuarios seleccionados para las preguntas y sus respuestas
      preguntas: seccion.preguntas.map(pregunta => 
        ({
          ...pregunta,
          respuestas: pregunta.respuestas.map(respuesta =>({
            ...respuesta,
            resultado: respuesta.resultado.filter(resultado => asignacion.TipoFormulario === 'REFEVA'
              ? usuariosFiltro.map(usuarioFiltro => usuarioFiltro.value).includes(resultado.UsuarioEvaluado)
              : usuariosFiltro.map(usuarioFiltro => usuarioFiltro.value).includes(resultado.IdUsuario)
            ),
          })),
        })
      ),
    }));

    return (
      <Grid container>
        <Grid className={classes.grid} container>
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={1}>
              <Grid container>
                <Typography 
                  className={classes.reporte}
                >
                  {asignacion.NombreAsignacion} {asignacion.RequiereValidacion && ` - Calificación: ${promedioAsignacion.toFixed(2)}`}
                </Typography>
              </Grid>
              <Grid container spacing={24}>
                {
                  asignacion.TipoFormulario === 'REFFOR' && (
                    usuarioId === asignacion.UsuarioResponsable ||  
                    usuariosAutorizados.map(usuarioAutorizado => usuarioAutorizado.IdUsuarioAutorizado).includes(usuarioId)) ? (
                      <React.Fragment>
                        <Grid item xs={5}>
                          <ComboMultiple
                            valor={departamentosSeleccionados}
                            onChange={onInputChangeProxy}
                            opciones={departamentos}
                            campoValido
                            multiple
                            label="Filtro por departamento/s"
                            indice={1}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <ComboMultiple
                            inhabilitado={departamentosSeleccionados.length === 0 && puestosSeleccionados.length === 0}
                            valor={puestosSeleccionados}
                            onChange={onInputChangeProxy}
                            opciones={puestosPorDepartamento}
                            campoValido
                            multiple
                            label="Filtro por area/s"
                            labelVacio="Seleccione un departamento"
                            indice={2}
                          />
                        </Grid>
                      </React.Fragment>
                    ) : null
                }
                {
                  (asignacion.TipoFormulario === 'REFEVA' || asignacion.TipoFormulario === 'REFENC') && (
                    usuarioId === asignacion.UsuarioResponsable ||  
                    usuariosAutorizados.map(usuarioAutorizado => usuarioAutorizado.IdUsuarioAutorizado).includes(usuarioId)) ? (
                      <Grid item xs={5}>
                        <ComboMultiple
                          valor={usuariosEvaluadosSeleccionados}
                          onChange={onInputChangeProxy}
                          opciones={usuariosEvaluados}
                          campoValido
                          multiple
                          label="Filtrar por usuario/s"
                          indice={3}
                        />
                      </Grid>
                    ) : null
                }
                <Grid 
                  item xs={
                    usuarioId === asignacion.UsuarioResponsable || 
                    usuariosAutorizados.map(usuarioAutorizado => usuarioAutorizado.IdUsuarioAutorizado).includes(usuarioId)
                      ? 2 
                      : 12} 
                  style={{textAlign: 'right' }}>
                  {
                    asignacion.RequiereValidacion ?
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classes.download}
                        disabled={usuariosFiltro.length === 0}
                        onClick={() => 
                          (asignacion.TipoFormulario === 'REFEVA' || asignacion.TipoFormulario === 'REFFOR')
                            ? this.exportarExcelEvaluacion(usuariosFiltro, seccionesFiltro) 
                            : this.exportarExcelEncuesta(seccionesFiltro)
                        }
                      >
                        <GetApp className={classes.downloadIcon} />
                        Exportar
                      </Button> : null
                  }
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {
          seccionesFiltro.map(seccion => 
            (
              <Seccion 
                key={seccion.FormularioSeccionId}
                {...(seccion.Color ? {color: seccion.Color} : {})}
                nombre={seccion.Nombre}
                descripcion={seccion.Descripcion}
                preguntas={seccion.preguntas}
                respuestas={seccion.respuestasSeccion}
                requiereValidacion={asignacion.RequiereValidacion}
                tipoFormulario={asignacion.TipoFormulario}
              />
            )
          )
        }
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

      onChangeComboAction(id, e);
    },
  }),
  withStyles(styles),
)(ReporteEncuestasResultados);