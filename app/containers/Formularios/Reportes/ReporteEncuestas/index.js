/**
 *
 * ReporteEncuestas
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Appbar from 'components/Appbar';
import Spinner from 'components/Spinner';
import Tabla from '../../../../components/DataTable';
import makeSelectReporteEncuestas from './store/selectors';
import reducer from './store/reducer';
import Actions from './store/actions';
import saga from './store/saga';
import CustomPopover from './components/CustomPopover';
import ReporteEncuestasResultados from './components/ReporteEncuestasResultados';
/* eslint-disable react/prefer-stateless-function */
export class ReporteEncuestas extends React.Component {
  componentDidMount(){
    this.props.actions.requestGetEncuestasAction(this.props.location.state.tipoFormulario);
  }

  componentWillUnmount(){
    this.props.actions.limpiarEstadoAction();
  }

  render() {
    const {
      usuarioGlobal:{
        UsuarioId : usuarioId,
      },
      location: {
        state: {
          tipoFormulario,
        },
      },
      actions:{
        requestShowEncuestaAction,
        requestGetDepartamentosPuestosAction,
        onChangeComboAction,
        limpiarEstadoAction,
        requestGetEncuestasAction,
      },
      reporteEncuestas: {
        stepper,
        encuestasTabla: {
          backend: {
            data,
          },
        },
        encuestasNuevo: {
          backend: {
            departamentos,
            puestos,
            asignacion,
            usuariosEvaluados,
            usuariosEvaluadores,
            usuariosAutorizados,
          },
          frontend: {
            departamentosSeleccionados,
            puestosSeleccionados,
            usuariosEvaluadosSeleccionados,
            usuariosEvaluadoresSeleccionados,
          },
        },
      },
    } = this.props;
    
    let tituloFormulario = '';

    switch(tipoFormulario){
      case 'REFENC':
        tituloFormulario = 'Encuestas'
        break;
      case 'REFEVA':
        tituloFormulario = 'Evaluaciones'
        break;
      default:
        tituloFormulario = 'Formularios'
        break;
    }

    const styles = {
      mainContainer: {
        height: '85vh',
        padding: '0 8px 8px 8px',
      },
    };

    const cabeceras = [
      {
        name: 'Id',
        label: 'Folio',
        options: {
          filter: false,
        },
      },
      {
        name: 'Nombre',
        label: 'Nombre',
      },
      {
        name: 'Responsable',
        label: 'Responsable',
      },
      {
        name: 'FechaInicio',
        label: 'Fecha Inicio',
      },
      {
        name: 'FechaFinal',
        label: 'Fecha Final',
      },
      {
        name: 'Participantes',
        label: tipoFormulario === 'REFEVA' ? 'Evaluados' : 'Participantes',
        options: {
          filter: false,
          customBodyRender: (value, opcionales) => {
            // validar que el usuario logueado no sea el responsable
            if(usuarioId === data[opcionales.rowIndex].UsuarioIdResponsable){
              return (
                <CustomPopover 
                  label={value}
                  data={data[opcionales.rowIndex].UsuariosDepartamentos}
                  tipoFormulario={tipoFormulario}
                />
              );
            } 

            return <span>No Aplica</span>;
          },
          customHeadRender: (columnMeta) => ( 
            <th  
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'center', 
                  backgroundColor: '#fff', 
                  color: 'rgba(0, 0, 0, 0.54)', 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  verticalAlign: 'middle',
                  padding : 16, 
                  borderBottom: '1px solid rgba(224, 224, 224, 1)', 
                } 
              } 
            > 
              {columnMeta.label}
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'center', 
              paddingRight: 16, 
              width: '10%', 
            }, 
          }),
        },
      },
      {
        name: 'options',
        label: [],
        options: {
          filter: false,
        },
      },
    ];

    const configuracion = {
      filtro : true,
      descarga : false,
      columnas : false,
      ordenar: false,
      imprimir : false,
      seleccionable: 'none',
      registrosPorPagina: 10,
    };

    let component = null;
    
    switch(stepper) {
      case 0:
        component = (
          <React.Fragment>
            <Appbar 
              texto={`${tituloFormulario} aplicadas`}
            />
            <div style={styles.mainContainer}>
              <Tabla
                data={data}
                headers={cabeceras}
                configuracion={configuracion}
                idPosition="Id"
                admin
                opciones={
                  [
                    {'icon' : 'ver', 'action' : (id) => requestShowEncuestaAction(id)},
                  ]
                }
                small={0}
              />
            </div>
          </React.Fragment>
        );
        break;
      case 1:
        component = (
          <React.Fragment>
            <Appbar 
              texto='Reporte de resultados'
              onClickRegresar={() => { 
                requestGetEncuestasAction(tipoFormulario);
                limpiarEstadoAction();
              }}
            />
            <div style={styles.mainContainer}>
             
            
              <ReporteEncuestasResultados
                actions={{
                  requestGetDepartamentosPuestosAction,
                  onChangeComboAction,
                }}
                params={{
                  departamentos,
                  puestos,
                  departamentosSeleccionados,
                  puestosSeleccionados,
                  asignacion,
                  usuariosEvaluados,
                  usuariosEvaluadores,
                  usuariosAutorizados,
                  usuarioId,
                  usuariosEvaluadosSeleccionados,
                  usuariosEvaluadoresSeleccionados,
                }}
              />
             
            </div>
          </React.Fragment>
        );
        break;
      default:
        break;
    }

    return (
      <div>
        <Helmet>
          <title>ReporteEncuestas</title>
          <meta name="description" content="Description of ReporteEncuestas" />
        </Helmet>
        <Spinner />
        {component}
      </div>
    );
  }
}

ReporteEncuestas.propTypes = {
  reporteEncuestas: T.object,
  actions: T.object,
  location: T.object,
  usuarioGlobal: T.object,
};

const mapStateToProps = createStructuredSelector({
  reporteEncuestas: makeSelectReporteEncuestas(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'reporteEncuestas', reducer });
const withSaga = injectSaga({ key: 'reporteEncuestas', saga });
const withActions = Actions.bindReduxStore();

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(ReporteEncuestas);
