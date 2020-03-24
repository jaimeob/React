/**
 *
 * PedidosReporte
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import {withHandlers} from 'recompose';
import { compose, bindActionCreators} from 'redux';
import withNotifier from 'components/HOC/withNotifier';
import { withStyles } from '@material-ui/core/styles';
import {enqueueSnackbar} from 'reducers/notifications/actions';
import { DAEMON } from 'utils/constants';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Filtro from "@material-ui/icons/FilterList";
import XLSX from 'xlsx';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grey from '@material-ui/core/colors/grey'
import DataTable from 'components/DataTable';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPedidosReporte from './selectors';
import Actions from './actions';
import reducer from './reducer';
import TablaReporte from './components/TablaReporte';
import saga from './saga';

const stylesD = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
  paperPrincipal: {
    width: '98%',
    height: 'calc(100% - 14px)',
    overflow: 'auto',
    margin: 'auto',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  bodyyy: {
    padding: '16px',
    paddingTop: '10px',
    marginTop: '10px',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
})

export class PedidosReporte extends React.Component {

  componentDidMount() {
    const {
      actions: {
        limpiarStateAction,
        getReporteCoorporativoAction,
        getReportePedidosAction,
        getPlazasAction,
        getAgrupadoresAction,
        setMountedAction,
      },
      pedidosReporte: {
        mounted,
      },
      location: {
        state: {
          idReporte,
        },
      },
    } = this.props;
    if(mounted){
      limpiarStateAction();
    }else{
      setMountedAction();
    }
    getPlazasAction();
    getAgrupadoresAction();
    if(idReporte === 0){
      getReporteCoorporativoAction();
    } else {
      getReportePedidosAction();
    }
  } 

  render() {
    const styles = {
      grow: {
        flexGrow: 1,
      },
    };

    const configuracion = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: 'none',
      paginado: false,
    };

    const {
      actions: {
        onClickLimpiarFiltrosAction,
        changePlazaAction,
        changeAgrupadorAction,
        getReporteCoorporativoAction,
        getReportePedidosAction,
        onFechaInputAction,
        limpiarFiltrosAction,
        changeFechaAutorizacionAction,
        changeFechaInicioAction,
      },
      pedidosReporte: {
        coorporativo : {
          datos,
          cabeceras,
        },
        reporte: {
          hayDatos,
          reporteDatos,
          reporteCabeceras,
          parametros: {
            indicesPlazasReporte,
            indicesAgrupadorReporte,
            fechaAutorizacionInput,
            fechaSolicitudInput,
            fecSolicitudInicio,
            fecSolicitudFin,
            fecAutorizacionInicio,
            fecAutorizacionFin,
          },
        },
        plazas,
        agrupadores,
        indicesPlazas,
        indicesAgrupadores,
        limpio,
        idPlaza,
      },
      location: {
        state: {
          idReporte,
        },
      },
      usuarioGlobal: {
        IdPlaza: PlazaUsuario,
      },
      classes,
      onChangePlazaProxy,
      onChangeAgrupadorProxy,
      onClickExportarProxy,
    } = this.props;
    const header = cabeceras.map((ele, idx) => {
      if(ele.name === 'Precio'){
        return {
          name: ele.name,
          label: ele.label,
          options: {
            customHeadRender: (columnMeta) => (
              <th 
                // eslint-disable-next-line react/no-array-index-key
                key={`cabecera${idx}`} 
                style={
                  {
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    color: 'rgba(0, 0, 0, 0.54)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    padding : 16,
                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  }
                }
              >
                {columnMeta.name}
              </th>
            ),
            setCellProps: () => ({
              style: {
                textAlign: 'right',
                paddingRight: 16,
                width: '15%',
              },
            }),
          },
        }
      } 
      if(ele.name === 'Stock'){
        return {
          name: ele.name,
          label: ele.label,
          options: {
            customHeadRender: (columnMeta) => (
              <th 
                // eslint-disable-next-line react/no-array-index-key
                key={`cabecera${idx}`} 
                style={
                  {
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    color: 'rgba(0, 0, 0, 0.54)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
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
                width: '15%',
                textAlign: 'center',
              },
            }),
          },
          
        }
      }
      if(ele.name === 'Existencia'){
        return {
          name: ele.name,
          label: ele.label,
          options: {
            customHeadRender: (columnMeta) => (
              <th 
                // eslint-disable-next-line react/no-array-index-key
                key={`cabecera${idx}`} 
                style={
                  {
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    color: 'rgba(0, 0, 0, 0.54)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
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
                width: '15%',
                textAlign: 'center',
              },
            }),
          },
        }
      }
      return ele;
    });
    let filtros = null;
    if(idReporte === 0){
      filtros = 
    <Grid 
      container
      justify="flex-start"
    >
      <Grid
        item
        xs={idPlaza === 9 ? 2 : 3}
        sm={idPlaza === 9 ? 2 : 3}
        md={idPlaza === 9 ? 2 : 3}
        lg={idPlaza === 9 ? 2 : 3}
        style={{padding: '12px 8px 0px 16px'}}
      >
        <Typography
          style={{textAlign: 'left', fontSize: '0.9rem', fontWeight: 'bold'}}
        >
          FILTROS
        </Typography>
      </Grid>
      <Grid
        item
        xs={idPlaza === 9 ? 2 : 3}
        sm={idPlaza === 9 ? 2 : 3}
        md={idPlaza === 9 ? 2 : 3}
        lg={idPlaza === 9 ? 2 : 3}
        style={{paddingTop: 5}}
      >
        <Button 
          style={{color: '#3f51b5'}}
          onClick={onClickLimpiarFiltrosAction}
        >
          Limpiar
        </Button>
      </Grid>
      <Grid 
        item
        xs={8}
        sm={8}
        md={8}
        lg={8}
      />
      {idPlaza === 9 ?
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          style={{paddingLeft : 16, paddingBottom: 8}}
        >
          <FormControl 
            className={classes.formControl}
            disabled={plazas.length === 0}
          >
            <InputLabel 
              style={{fontSize: 14}} 
              htmlFor="plazasid"
            >
              {plazas.length > 0 ? 'Plaza' : 'No se han cargado'}
            </InputLabel>
            <Select
              multiple
              value={indicesPlazas}
              onChange={onChangePlazaProxy}
              name="Plaza"
              displayEmpty
              style={{fontSize: 14}}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map((value, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Chip key={`plazareporte${index}`} label={plazas[value-1].Nombre} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps= {{
                PaperProps: {
                  style : {
                    maxHeight: 45 * 4.5,
                  },
                },
              }}
              inputProps={{
                name: 'Plaza',
                id: 'plazasid',
              }}
            >
              {
                plazas.map((elem) => 
                  <MenuItem 
                    style={{fontSize: 14}} 
                    key={`menu${elem.IdPlaza}`} 
                    value={elem.IdPlaza}>
                    {elem.Nombre}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid> : null}
      <Grid
        item
        xs={idPlaza === 9 ? 6 : 12}
        sm={idPlaza === 9 ? 6 : 12}
        md={idPlaza === 9 ? 6 : 12}
        lg={idPlaza === 9 ? 6 : 12}
        style={{textAlign: 'center'}}
      >
        <FormControl 
          className={classes.formControl}
          disabled={agrupadores.length === 0}
        >
          <InputLabel 
            style={{fontSize: 14}} 
            htmlFor="agrupadorid"
          >
            {agrupadores.length > 0 ? 'Agrupador' : 'No se han cargado'}
          </InputLabel>
          <Select
            multiple
            value={indicesAgrupadores}
            onChange={onChangeAgrupadorProxy}
            name="Agrupador"
            displayEmpty
            style={{fontSize: 14}}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map((value, index) => 
                  // eslint-disable-next-line react/no-array-index-key
                  (<Chip key={`agrupadoresReporte_${index}`} label={agrupadores[value - 1].Nombre} className={classes.chip} />)
                )}
              </div>
            )}
            MenuProps= {{
              PaperProps: {
                style: {
                  maxHeight: 45 * 4.5,
                },
              },
            }}
            inputProps={{
              name: 'Agrupador',
              id: 'agrupadorid',
            }}
          >
            {
              agrupadores.map((elem) => 
                <MenuItem 
                  style={{fontSize: 14}} 
                  key={`menu${elem.IdAgrupador}`} 
                  value={elem.IdAgrupador}>
                  {elem.Nombre}
                </MenuItem>
              )
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid 
        container
        justify="flex-end"
        style={{paddingRight: 8, paddingTop: 8}}
      >
        <Grid 
          item
          xs={6}
          sm={6}
          md={4}
          lg={4}
          xl={3}
          style={{marginRight: 16}}
        >
          <Button
            color='primary'
            variant='contained'
            onClick={getReporteCoorporativoAction}
            style={
              {
                marginBottom: 8,
                backgroundColor: '#28950f',
                // color: 'white',
              }
            }
          >
            <Filtro />
            Filtrar
          </Button>
        </Grid>
      </Grid>
    </Grid>
    }

    if(idReporte === 0)
      return (
        <div>
          <AppBar style={{backgroundColor: Grey[200]}} position="static">
            <Toolbar variant="dense" style={{paddingLeft: 8}}>
              <Typography variant="h6" color="primary" style={styles.grow}>
                Reporte de inventarios
              </Typography>
            </Toolbar>
          </AppBar>
          <DataTable 
            headers = {header}
            data = {datos}
            configuracion = {configuracion}
            admin
            onClickexportar = {onClickExportarProxy}
            nomCsv= 'Reporte de Invetarios Coorporativo.csv'
            nombreHoja = 'Reporte de Inventario'
            filtros = {PlazaUsuario === 9 ? filtros : null}
            width = {idPlaza === 9 ? '600px' : '400px'}
          />
        </div>
      );
    return ( 
      <div>
        <AppBar style={{backgroundColor: Grey[200]}} position="static">
          <Toolbar variant="dense" style={{paddingLeft: 8}}>
            <Typography variant="h6" color="primary" style={styles.grow}>
              Reporte de pedidos
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          style={
            {
              height: 'calc(100vh - 128px)',
            }
          }
          alignContent='center'
          justify='flex-end'
        >
          <Paper
            className={classes.paperPrincipal}
            id='paperIndicador'
          >
            <TablaReporte
              datos = {reporteDatos}
              cabeceras = {reporteCabeceras}
              plaza = {indicesPlazasReporte}
              agrupador = {indicesAgrupadorReporte}
              agrupadores = {agrupadores}
              plazas = {plazas}
              plazaUsuario = {PlazaUsuario}
              lipio = {limpio}
              hayDatos = {hayDatos}
              onClickLimpiar = {limpiarFiltrosAction}
              onClickFiltrar = {getReportePedidosAction}
              fecSolicitudInicio = {fecSolicitudInicio}
              fecSolicitudFin = {fecSolicitudFin}
              fecAutorizacionInicio = {fecAutorizacionInicio}
              fecAutorizacionFin = {fecAutorizacionFin}
              fechaAutorizacionInput = {fechaAutorizacionInput}
              fechaSolicitudInput = {fechaSolicitudInput}
              onChangeFechaAutorizacion = {changeFechaAutorizacionAction}
              onChangeFechaSolicitud = {changeFechaInicioAction}
              onFechaInput = {onFechaInputAction}
              onChangePlaza = {changePlazaAction}
              onChangeAgrupador = {changeAgrupadorAction}
            />
          </Paper>
        </Grid>
      </div>
    )
  }
}

PedidosReporte.propTypes = {
  actions: T.object,
  pedidosReporte: T.object,
  classes: T.object,
  location: T.object,
  onChangePlazaProxy: T.func,
  onChangeAgrupadorProxy: T.func,
  onClickExportarProxy: T.func,
  usuarioGlobal: T.object,
};

const mapStateToProps = createStructuredSelector({
  pedidosReporte: makeSelectPedidosReporte(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
  }, dispatch);

}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'pedidosReporte', reducer });
const withSaga = injectSaga({ key: 'pedidosReporte', saga, mode : DAEMON  });
const withActions = Actions.bindReduxStore();

export default compose(
  withStyles(stylesD),
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withHandlers({
    onChangePlazaProxy: (props) => (e) => {
      const {
        actions: {
          changePlazaAction,
        },
      } = props;
      changePlazaAction(e, false)
    },
    onChangeAgrupadorProxy: (props) => (e) => {
      const {
        actions: {
          changeAgrupadorAction,
        },
      } = props;
      changeAgrupadorAction(e, false)
    },
    onClickExportarProxy: (props) => () => {
      const {
        pedidosReporte: {
          coorporativo: {
            cabeceras,
            datos,
          },
        },
      } = props;
      
      const arregloDatos = [];
      
      arregloDatos.push(cabeceras.map(cab => cab.label))
      for (let i = 0; i < datos.length; i+=1) {
        arregloDatos.push(
          [
            datos[i].NomPlaza,
            datos[i].NomAgrupador,
            datos[i].NomArticulo,
            datos[i].Existencia,
            datos[i].Stock,
            datos[i].Precio,
          ]
        ) 
      }
      const ws = XLSX.utils.aoa_to_sheet(arregloDatos);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Reporte Pedidos');
      /* generate XLSX file and send to client */
      XLSX.writeFile(wb, "Reporte de Pedidos.xlsx")
    },
  }),
)(PedidosReporte);
