/**
 *
 * IndicadoresDireccion
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Appbar from 'components/Appbar';
import {
  Grid,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import { withHandlers } from 'recompose';
import moment from 'moment';
import DataTable from 'components/DataTable';
import FincamexLogo from 'images/logo/fincamex-logo.png';
import { withStyles } from '@material-ui/core/styles';
import Nubesita from '@material-ui/icons/CloudDownload';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Combo from 'components/Seleccion';
// import ComboMultiple from 'components/FiltroSeleccion';
import Success from 'components/BotonSuccess';
import XLSX from 'xlsx';
import makeSelectIndicadoresDireccion from './selectors';
import reducer from './reducer';
import saga from './saga';
import Actions from './actions';
import './style.css';

const styles = () => ({
  paperPrincipal: {
    width: '98%',
    height: '100%',
    overflow: 'auto',
    margin: 'auto',
  },
  paperCampos: {
    width: '98%',
    overflow: 'auto',
    margin: 'auto',
    padding: '0px 12px 16px 12px',
    marginBottom: 8,
  },
  heightMax: {
    height: 'calc(100% - 152px)',
  },
  paperFecha: {
    fontFamily: '"Roboto","Medium"',
    fontSize: '13px',
    color: '#424242',
    textTransform: 'initial',
  },
  button: {
    height: '35px',
    margin: 'auto',
    backgroundColor: '#28950f',
    textTransform: 'initial',
    color: 'white',
    fontSize: '12px',
    "&:hover": {
      backgroundColor: '#1f710c',
    },
  },
  descargar: {
    marginRight: 8,
  },
  gridImagen: {
    textAlign: 'center',
    paddingTop: '12px',
    margin: 'auto 0 auto 0',
  },
  paperTitulo: {
    fontFamily: '"Roboto","Medium"',
    fontSize: '18px',
    fontWeight: '500',
    color: '#424242',
  },
})

// eslint-disable-next-line react/prefer-stateless-function
export class IndicadoresDireccion extends React.Component {

  updateDimensions() {
    // debugger;
    const {
      actions: {
        setHeightAction,
      },
    } = this.props;

    if(window.innerWidth < 1280) {
      if(window.innerHeight < 772)
        setHeightAction(274, 37.5 -((771 - window.innerHeight) / 10));
      else
        setHeightAction(274, 37.9);
    } else if(window.innerHeight < 772)
      setHeightAction(132, 54.5 -((771 - window.innerHeight) / 10));
    else
      setHeightAction(132, 54.9 + ((window.innerHeight - 772) / 25));
  }

  componentDidMount() {
    const {
      actions: {
        getFiltrosAction,
      },
    } = this.props;
    getFiltrosAction();
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  // componentDidMount(){
  //   const {
  //     actions: {
  //       getDatosAction,
  //     },
  //   } = this.props;
  //   getDatosAction();
  // }

  render() {

    const {
      classes,
      indicadoresDireccion: {
        principales: {
          filtros: {
            periodo,
            periodoSlc,
            direccion,
            direccionSlc,
            plaza,
            plazaSlc,
            departamento,
            departamentoSlc,
            puesto,
            puestoSlc,
            formatoEvaluacion,
            formatoEvalSlc,
          },
          height,
          tableHeight,
        },
        tabla: {
          cabeceras,
          datos,
        },
      },
      actions: {
        onClickFiltrarAction,
      },
      onChangeFiltroProxy,
      onClickDescargarProxy,
    } = this.props;
    
    const FechaActual = moment(new Date()).format("DD/MM/YYYY");
    const configuracion = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: 'none',
      paginado: false,
      buscar: false,
      responsivo: "scrollMaxHeight",
    };

    return (
      <React.Fragment>
        <Appbar 
          texto='Reporte Indicadores Dirección'
          // onClickRegresar={() => true}
          // hayCambios={true}
        />
        <Grid
          container
          style={
            {
              height: 'calc(100vh - 128px)',
            }
          }
          justify='flex-end'
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            spacing={12}
            ref={this.myInput}
          >
            <Paper
              id='paperIndicador'
              className={classes.paperCampos}
            >
              <Grid
                container
              >
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  lg={1}
                  xl={1}
                >
                  <Combo 
                    indice={0}
                    label='Periodo:'
                    valor={periodoSlc}
                    onChange={onChangeFiltroProxy}
                    opciones={periodo}
                    inhabilitado={periodo.length > 0 ? 0 : 1}
                    idOpcion='PeriodoId'
                    nomOpcion='Anio'
                    marginTop='25px'
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  lg={2}
                  xl={2}
                >
                  <Combo 
                    indice={1}
                    label='Dirección:'
                    campoValido
                    valor={direccionSlc}
                    onChange={onChangeFiltroProxy}
                    opciones={direccion}
                    inhabilitado={periodo.length > 0 ? 0 : 1}
                    idOpcion='IdDireccion'
                    nomOpcion='Nombre'
                    marginTop='25px'
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  lg={2}
                  xl={2}
                >
                  <Combo 
                    indice={2}
                    label='Plaza:'
                    valor={plazaSlc}
                    onChange={onChangeFiltroProxy}
                    opciones={plaza}
                    inhabilitado={periodo.length > 0 ? 0 : 1}
                    idOpcion='IdPlaza'
                    nomOpcion='Nombre'
                    marginTop='25px'
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  lg={2}
                  xl={2}
                >
                  <Combo 
                    indice={3}
                    label='Departamento:'
                    campoValido
                    valor={departamentoSlc}
                    onChange={onChangeFiltroProxy}
                    opciones={departamento}
                    inhabilitado={periodo.length > 0 ? 0 : 1}
                    idOpcion='IdDepartamento'
                    nomOpcion='Nombre'
                    marginTop='25px'
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  lg={2}
                  xl={2}
                >
                  <Combo 
                    indice={4}
                    label='Puesto:'
                    campoValido
                    valor={puestoSlc}
                    onChange={onChangeFiltroProxy}
                    opciones={puesto}
                    inhabilitado={departamentoSlc !== '' ? 0 : 1}
                    idOpcion='IdPuesto'
                    nomOpcion='Nombre'
                    marginTop='25px'
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  lg={2}
                  xl={2}
                >
                  <Combo 
                    indice={5}
                    label='Formato evaluación:'
                    campoValido
                    valor={formatoEvalSlc}
                    onChange={onChangeFiltroProxy}
                    opciones={formatoEvaluacion}
                    inhabilitado={periodo.length > 0 ? 0 : 1}
                    idOpcion='ConfiguracionBonoId'
                    nomOpcion='Grupo'
                    marginTop='25px'
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={12}
                  md={12}
                  lg={1}
                  xl={1}
                  style={{
                    marginTop: 'auto',
                    textAlign: 'center',
                    paddingTop: 12,
                  }}
                >
                  <Success 
                    label='Filtrar'
                    size='small'
                    disabled={periodo.length === 0}
                    onClick={onClickFiltrarAction}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            // className={classes.heightMax}
            style={{
              height: `calc(100% - ${height}px)`,
            }}
          >
            <Paper
              className={classes.paperPrincipal}
              id='paperIndicadorDireccion'
            >
              <Grid
                container
                style={
                  {
                    width: 'fit-content',
                  }
                }
              >
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={2}
                  lg={2}
                  xl={2}
                  className={classes.gridImagen}
                >
                  <img
                    alt='Error al cargar la imagen'
                    src={FincamexLogo}
                    style={{
                      width: '75%',
                      // height: '%',
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={8}
                  lg={8}
                  xl={8}
                  className={classes.gridImagen}
                >
                  <Typography
                    className={classes.paperTitulo}
                  >
                    FINCAMEX / DIRECCIÓN POR OBJETIVOS
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={2}
                  lg={2}
                  xl={2}
                  className={classes.gridImagen}
                >
                  <Typography
                    variant='subtitle1'
                    className={classes.paperFecha}
                  >
                    Fecha: {FechaActual}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    paddingTop: 26,
                    width: '100%',
                  }}
                >
                  <DataTable
                    data = {datos}
                    headers = {cabeceras}
                    configuracion = {configuracion}
                    temporal
                    params= {
                      {
                        height: tableHeight,
                        backgroundColor: 'white',
                        cabecerasColor: '#F5F5F5',
                        cabecerasFontS: 11,
                        whiteSpace: 'nowrap',
                        mostrarBarra: true,
                        sinToolbar: true,
                        padding: 0,
                        scrollBonito: true,
                        noFixed: true,
                      }
                    }
                    elevacion={0}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={3}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            style={{
              paddingRight: 24,
              textAlign: 'right',
            }}
          >
            {datos.length > 0 ?
              <Button 
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={onClickDescargarProxy}
              >
                <Nubesita className={classes.descargar} />
                Descargar
              </Button> : null}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

IndicadoresDireccion.propTypes = {
  actions: T.object,
  classes: T.object,
  indicadoresDireccion: T.object,
  onChangeFiltroProxy: T.func,
  onClickDescargarProxy: T.func,
};

const mapStateToProps = createStructuredSelector({
  indicadoresDireccion: makeSelectIndicadoresDireccion(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'indicadoresDireccion', reducer });
const withSaga = injectSaga({ key: 'indicadoresDireccion', saga });
const withActions = Actions.bindReduxStore();

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withHandlers({
    onChangeFiltroProxy: (props) => (id) => (e) => {
      const {
        actions: {
          onChangeFiltroAction,
          getDepartamentoPuestosAction,
        },
      } = props;
      onChangeFiltroAction(id, e.target.value);
      if(id === 3)
        getDepartamentoPuestosAction(e.target.value);
    },
    onClickDescargarProxy: (props) => () => {
      const {
        indicadoresDireccion: {
          tabla: {
            cabeceras,
            datos,
          },
        },
      } = props;
      const datosExcel = [];
      datosExcel.push(cabeceras.map(ele => ele.label));
      for (let i = 0; i < datos.length; i+=1) {
        datosExcel.push(
          [
            datos[i].NoEmpleado,
            datos[i].Trabajador,
            datos[i].FechaIngreso,
            datos[i].Direccion,
            datos[i].UbicacionPago,
            datos[i].Plaza,
            datos[i].Departamento,
            datos[i].Puesto,
            datos[i].Periodo,
            datos[i].Grupo,
            datos[i].AplicaIncentivo,
            datos[i].Sueldo,
            datos[i].Dias,
            datos[i].Porcentaje,
            datos[i].CalificacionFinal,
            datos[i].MontoPagar,
          ]
        ) 
      }
      
      const ws = XLSX.utils.aoa_to_sheet(datosExcel);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'HOJITA');
      XLSX.writeFile(wb, 'Reporte Direccion.xlsx', { type: "array", bookType: "xlsx" })
    },
  }),
)(IndicadoresDireccion);
