import React from 'react';
import T from 'prop-types';
import {compose, withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
import SinResultados from 'images/iconos/sinresultados.png';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import XLSX from 'xlsx';
import {
  uniqueId,
} from 'lodash';
import Tooltip from "@material-ui/core/Tooltip";
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from '@material-ui/core/Button';
import Nubesita from '@material-ui/icons/CloudDownload';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Calendario from 'containers/Pedidos/components/DateRangerPicker';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


// const actionsStyles = theme => ({
//   root: {
//     flexShrink: 0,
//     color: theme.palette.text.secondary,
//     marginLeft: theme.spacing.unit * 2.5,
//   },
// });

// class TablePaginationActions extends React.Component {
//   handleFirstPageButtonClick = event => {
//     this.props.onChangePage(event, 0);
//   };

//   handleBackButtonClick = event => {
//     this.props.onChangePage(event, this.props.page - 1);
//   };

//   handleNextButtonClick = event => {
//     this.props.onChangePage(event, this.props.page + 1);
//   };

//   handleLastPageButtonClick = event => {
//     this.props.onChangePage(
//       event,
//       Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
//     );
//   };

//   render() {
//     const { classes, count, page, rowsPerPage, theme } = this.props;

//     return (
//       <div className={classes.root}>
//         <IconButton
//           onClick={this.handleBackButtonClick}
//           disabled={page === 0}
//           aria-label="Previous Page"
//         >
//           {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//         </IconButton>
//         <IconButton
//           onClick={this.handleNextButtonClick}
//           disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//           aria-label="Next Page"
//         >
//           {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//         </IconButton>
//       </div>
//     );
//   }
// }

// TablePaginationActions.propTypes = {
//   classes: T.object.isRequired,
//   count: T.number.isRequired,
//   onChangePage: T.func.isRequired,
//   page: T.number.isRequired,
//   rowsPerPage: T.number.isRequired,
//   theme: T.object.isRequired,
// };

// const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
//   TablePaginationActions,
// );


const styles = theme => ({
  root: {
    // margin: 'auto',
    // marginLeft: 16,
    // marginRight: 16,
    // marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',

  },
  table: {
    minWidth: 1000,
    // width: '100%',
  },
  tableCellUlt: {
    paddingRight: '8px !important',
    width: '15px',
  },
  tableCell: {
    padding: '0 8px 4px 8px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  button: {
    backgroundColor: '#28950f',
    color: 'white',
    fontSize: '12px',
    "&:hover": {
      backgroundColor: '#1f710c',
    },
  },
  descargar: {
    marginRight: 8,
    width: '16px',
    heigth: '16px',
  },
});

class TablaReporte extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bandFiltros : false, 
      anchorEl : null,
      // page: 0,
      // rowsPerPage: 10,
    };
  }

  showFiltros = event => {

    const {
      bandFiltros,
    } = this.state;
    this.setState({'bandFiltros': !bandFiltros, anchorEl: event.currentTarget})
  }

  // handleChangePage = (event, page) => {
  //   this.setState({ page });
  // };

  // handleChangeRowsPerPage = event => {
  //   this.setState({ page: 0, rowsPerPage: event.target.value });
  // };

  render() {
    const {
      datos,
      cabeceras,
      classes,
      plazaUsuario,
      fecSolicitudInicio,
      fecSolicitudFin,
      fecAutorizacionInicio,
      fecAutorizacionFin,
      fechaSolicitudInput,
      onChangeFechaSolicitud,
      onChangeFechaAutorizacion,
      fechaAutorizacionInput,
      onClickFiltrar,
      plazas,
      agrupadores,
      plaza,
      agrupador,
      onFechaInput,
      onClickLimpiar,
      limpio,
      hayDatos,
      onChangePlazaProxy,
      exportarReporteProxy,
      onChangeAgrupadorProxy,
    } = this.props;
    
    const poperStyle = {
      float: 'right', 
      width: '600px', 
      maxWidth: '600px', 
      zIndex: 1005,
    };

    const filtros = 
  <Grid 
    container
  >
    <Grid
      item
      xs={2}
      sm={2}
      md={2}
      lg={2}
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
      xs={2}
      sm={2}
      md={2}
      lg={2}
      style={{paddingTop: 5}}
    >
      <Button 
        style={{color: '#3f51b5'}}
        onClick={onClickLimpiar}
      >
        Limpiar
      </Button>
    </Grid>
    <Grid 
      item 
      xs={2}
      sm={2}
      md={8}
      lg={8}
    ></Grid>
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      lg={4}
      style={{textAlign: 'center'}}
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
          value={plaza}
          onChange={onChangePlazaProxy(true)}
          name="Plazas"
          displayEmpty
          style={{fontSize: 14}}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map((value, index) => (
                <Chip 
                  // eslint-disable-next-line react/no-array-index-key
                  key={`plazasPedreporte_${index}`} 
                  label={plazas[value-1].Nombre} 
                  className={classes.chip} 
                />
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
            name: 'Plazas',
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
    </Grid>
    <Calendario 
      label = 'Fecha Solicitud:'
      fecInicio = {fecSolicitudInicio}
      fecFin = {fecSolicitudFin}
      fechaInput = {fechaSolicitudInput}
      onChangeFecha = {onChangeFechaSolicitud}
      onFechaInput = {onFechaInput}
      id = {0}
      paddingRight = {22}
      paddingLeft = {0}
    />
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      lg={4}
      style={{textAlign: 'center'}}
    >
      <FormControl 
        className={classes.formControl}
        disabled={agrupadores.length === 0}
      >
        <InputLabel 
          style={{fontSize: 14}} 
          htmlFor="agrupadoresid"
        >
          {agrupadores.length > 0 ? 'Agrupador' : 'No se han cargado'}
        </InputLabel>
        <Select
          multiple
          value={agrupador}
          onChange={onChangeAgrupadorProxy(true)}
          name="Agrupador"
          displayEmpty
          style={{fontSize: 14}}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map((value, index) => (
                <Chip 
                  // eslint-disable-next-line react/no-array-index-key
                  key={`agrupadorInvRepo${index}`}  
                  label={agrupadores[value-1].Nombre} 
                  className={classes.chip} 
                />
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
            name: 'Agrupador',
            id: 'agrupadoresid',
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
    <Calendario 
      label = 'Fecha Recibido:'
      fecInicio = {fecAutorizacionInicio}
      fecFin = {fecAutorizacionFin}
      fechaInput = {fechaAutorizacionInput}
      onChangeFecha = {onChangeFechaAutorizacion}
      onFechaInput = {onFechaInput}
      id = {1}
      paddingRight = {22}
      paddingLeft = {0}
    />
    <Grid 
      container
      justify="flex-end"
      style={{paddingRight: 8, paddingTop: 8}}
    >
      <Grid 
        item
        xs={2}
        sm={2}
        md={2}
        lg={2}
        style={{marginRight: 16}}
      >
        <Button
          color='primary'
          variant='contained'
          onClick={onClickFiltrar}
          style={
            {
              marginBottom: 8,
              backgroundColor: '#28950f',
            }
          }
        >
          <FilterListIcon />
          Filtrar
        </Button>
      </Grid>
    </Grid>
  </Grid>


    // const { rowsPerPage, page } = this.state;
    
    const upperText = (nombre) =>
      nombre.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    return (
      <Paper className={classes.root} elevation='0'>
        <Grid
          container
          direction='row'
          justify='flex-end'
          style={{paddingRight: 8, paddingTop: 8}}
        >
          <Grid
            item
            // style={{textAlign: 'right', margin: 'auto'}}
          >
            {plazaUsuario === 9 && <Tooltip title='Filtros'>
              <IconButton 
                onClick={this.showFiltros}
                aria-describedby="filtros1"
                id="filtros"
              >
                <FilterListIcon/>
              </IconButton>
            </Tooltip>
            }
            <Popper 
              id="popper1" 
              open={this.state.bandFiltros} 
              anchorEl={this.state.anchorEl} 
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper style={poperStyle}>
                    {filtros}
                  </Paper>
                </Fade>
              )}
            </Popper>
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.button}
              id="filtros2"
              onClick={exportarReporteProxy(datos)}
            >
              <Nubesita className={classes.descargar} />
              Exportar
            </Button>
          </Grid>
          {/* <Grid
            item
            xs={2}
            sm={2}
            md={1}
            lg={1}
            xl={1}
            style={{textAlign: 'right'}}
          >
            <Tooltip title='Filtros'>
              <IconButton 
                onClick={this.showFiltros}
                aria-describedby="filtros1"
              >
                <FilterListIcon/>
              </IconButton>
            </Tooltip>
            <Popper 
              id="popper1" 
              open={this.state.bandFiltros} 
              anchorEl={this.state.anchorEl} 
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper style={poperStyle}>
                    {filtros}
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Grid> */}
        </Grid>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cabeceras.map(
                  row => (
                    <TableCell
                      key={row.id}
                      padding='default'
                      className={row.id === 12 ? classes.tableCellUlt : classes.tableCell}
                    >
                      {row.label}
                    </TableCell>
                  ),
                  this,
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {!hayDatos ? 
                <TableRow style={{textAlign: 'center'}}>
                  <TableCell
                    colSpan={13} 
                    component="th" 
                    scope="row" 
                    style={{textAlign: 'center'}}
                  >
                    <img
                      key="imagenKey"
                      src={SinResultados}
                      style={{ width:'100px',height: '100px'}}
                      alt="logo-Pfd"
                    />No se encontraron coincidencias
                  </TableCell>
                </TableRow>
                : datos.map(row => (
                  <React.Fragment>
                    {typeof row.nomAgrupador === 'string' ?
                      <TableRow key={row.id} style={{backgroundColor: row.color}}>
                        <TableCell 
                          colSpan={13} 
                          component="th" 
                          scope="row" 
                          size='small'
                          style={
                            {
                              fontSize: '18px', 
                              fontWeight: 'bold', 
                              paddingRight: null,
                            }
                          }
                        >
                          {row.nomAgrupador}
                        </TableCell>
                        <TableCell className={classes.tableCellUlt}/>
                      </TableRow>
                      : 
                      <TableRow key={row.id}>
                        <TableCell 
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                          size='small'
                        >
                          {row.Plaza}
                        </TableCell>
                        <TableCell 
                          className={classes.tableCell} 
                          style={
                            {
                              padding: 0,
                            }
                          }
                          component="th" 
                          scope="row"
                          size='small'
                        >
                          {row.Folio}
                        </TableCell>
                        <TableCell 
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                        >
                          {row.Articulo}
                        </TableCell>
                        <TableCell  
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                        >
                          {row.CantSolicitada}
                        </TableCell>
                        <TableCell  
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                        >
                          {row.Existencia}
                        </TableCell>
                        <TableCell  
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                        >
                          {row.Autorizado}
                        </TableCell>
                        <TableCell  
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                        >
                          {row.Recibido}
                        </TableCell>
                        <TableCell  
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                        >
                          {row.Importe}
                        </TableCell>
                        <TableCell 
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                        >
                          {upperText(row.Solicitante)}
                        </TableCell>
                        <TableCell 
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                        >
                          {upperText(row.Autorizador)}
                        </TableCell>
                        <TableCell 
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                        >
                          {row.FechaSolicitud}
                        </TableCell>
                        <TableCell 
                          className={classes.tableCell} 
                          component="th" 
                          scope="row"
                        >
                          {row.FechaRecibido}
                        </TableCell>
                        <TableCell 
                          className={classes.tableCellUlt} 
                          component="th" 
                          scope="row"
                        >
                          {row.DiasAtencion}
                        </TableCell>
                      </TableRow>}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </div>
        {/* <TablePagination
          rowsPerPageOptions={[20, 30, 50]}
          component="div"
          labelRowsPerPage='Registros por página'
          labelDisplayedRows={
            ({ from, to, count }) => `${from}-${to} de ${count}`
          }
          colSpan={3}
          count={datos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            native: true,
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActionsWrapped}
        /> */}
      </Paper>
    );
  }
}

TablaReporte.propTypes = {
  classes: T.object.isRequired,
  datos: T.array,
  cabeceras: T.array,
  fecSolicitudInicio: T.object,
  fecSolicitudFin: T.object,
  fecAutorizacionInicio: T.object,
  fecAutorizacionFin: T.object,
  onChangeFechaSolicitud: T.func,
  fechaSolicitudInput: T.string,
  fechaAutorizacionInput: T.string,
  onFechaInput: T.func,
  onClickLimpiar: T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onChangePlazaProxy: (props) => (band) => (e) => {
      const {
        onChangePlaza,
      } = props;
      onChangePlaza(e, band);
    },
    onChangeAgrupadorProxy: (props) => (band) => (e) => {
      const {
        onChangeAgrupador,
      } = props;
      onChangeAgrupador(e, band);
    },
    exportarReporteProxy: (props) => (datosCsv) => () => {
      const {
        cabeceras,
      } = props;
      
      const arregloDatos = [];
      arregloDatos.push(cabeceras.map(cab => cab.label))
      for (let i = 0; i < datosCsv.length; i+=1) {
        if(typeof datosCsv[i].nomAgrupador === 'string')
          arregloDatos.push(
            [
              datosCsv[i].nomAgrupador,
            ]
          )
        else
          arregloDatos.push(
            [
              datosCsv[i].Plaza,
              datosCsv[i].Folio,
              datosCsv[i].Articulo,
              datosCsv[i].CantSolicitada,
              datosCsv[i].Existencia,
              datosCsv[i].Autorizado,
              datosCsv[i].Recibido,
              datosCsv[i].Importe,
              datosCsv[i].Solicitante,
              datosCsv[i].Autorizador,
              datosCsv[i].FechaSolicitud,
              datosCsv[i].FechaRecibido,
              datosCsv[i].DiasAtencion,
            ]
          ) 
      }
      const ws = XLSX.utils.aoa_to_sheet(arregloDatos);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Reporte Pedidos');
      /* generate XLSX file and send to client */
      XLSX.writeFile(wb, "Reporte de Pedidos.xlsx")
    },
  }))(TablaReporte)