/**
 *
 * Negociaciones
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import withNotifier from 'components/HOC/withNotifier';
import XLSX from 'xlsx';

import {
  Paper,
  Grid,
  withStyles,
  Divider,
  InputBase,
  Button,
  IconButton,
  Radio,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

import {
  Folder,
  ContactSupport,
  RemoveRedEye,
  CloudDownload,
} from "@material-ui/icons";
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { enqueueSnackbar} from 'reducers/notifications/actions';
import { map, capitalize } from 'lodash';
import { green } from '@material-ui/core/colors';
import makeSelectNegociaciones from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import ModalContentLayout from './components/ModalContenidoLayout/ModalContenidoLayout';
import ModalViewExplotion from './components/ModalViewExplotion/ModalViewExplotion';

const styles = (theme) => ({
  paperclasses: {
    background: 'red',
    '&:hover': {
      background: 'blue',
    },
  },
  enabledIconViewExplotion: {
    color: 'green',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    '& td:last-child': {
      paddingRight: '15px',
    },
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButtonPadding: {
    padding: 10,
  },
  iconHelper:{
    padding: 10,
    '&:hover': {
      color: '#42a5f5',
    },
  },
  iconFile:{
    padding: 10,
    '&:hover': {
      color: '#ffc107',
    },
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  buttonClass: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  spacing: [0,2,3,5,8],
  paperBreadcrumbs: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    background: "#344955",
    display: "inline-block",
  },
  buttonProgress: {
    color: '#4CAF50',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
  },
  buttonError: {
    backgroundColor: '#FF0023',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
  },
  buttonExport: {
    float: 'right',
    marginBottom: '1rem',
  },
})
export class Negociaciones extends React.Component {

  componentDidMount() {
    const {
      actions: {
        getCurrentDateTimeAction,
        showModalContentLayoutAction,
        showModalViewExplotionAction,
        setModalActiveAction,
        setIconViewExplotionAction,
        getLayoutNegociacionesAction,
        getPlazasAction,
        // setUserLoggedInAction,
        validatedFileAction,
        defaultStateAction,
      },
    } = this.props;

    getCurrentDateTimeAction()
    showModalContentLayoutAction(false)
    showModalViewExplotionAction(false)
    setModalActiveAction()
    setIconViewExplotionAction({enabled : false})
    getLayoutNegociacionesAction()
    getPlazasAction(0)
    // setUserLoggedInAction({
    //   nameUser: 'Cesar Adrian Mendoza Gonzalez',
    //   idUser: 22759,
    // })
    defaultStateAction({
      fileLoad: {
        cols: [],
        rows: [],
        name: '',
        size: 0,
      },
      explotionDetails: {
        headers: [],
        rows: [],
      },
      explotionSelected: {
        IdExplosion: 0,
        PlazaId: '',
        FechaCreacion: '',
        Nombre: '',
      },
    })
    validatedFileAction(false)
  }

  handleSelectedPlaza = (event) => {
    const {
      target: {
        value: plazaSelectedValue,
      },
    } = event;
    const {
      actions: {
        setPlazaSelectedAction,
      },
    } = this.props;
    setPlazaSelectedAction(plazaSelectedValue)
  }

  defaultExplotionSelected = () =>{
    const {
      actions: {
        explotionSelectedAction,
      },
    } = this.props;
    explotionSelectedAction({
      IdExplosion: 0,
      PlazaId: '',
      FechaCreacion: '',
      Nombre: '',
    })
  }

  handleSelectExplotion = (event) => {
    const {
      negociaciones: {
        backend: {
          datasources: {
            explotionList: {
              RowsList,
            },
          },
        },
      },
      actions: {
        getExplotionsDetailsAction,
        explotionSelectedAction,
        loadExportExplotionAction,
      },
    } = this.props;

    const rowSelected = RowsList.filter(row => parseInt(row.IdExplosion, 0) === parseInt(event.target.value, 0))[0]
    explotionSelectedAction({
      IdExplosion: rowSelected.IdExplosion,
      PlazaId: rowSelected.PlazaId,
      FechaCreacion: rowSelected.FechaCreacion,
      Nombre: rowSelected.Nombre,
    })
    getExplotionsDetailsAction(rowSelected.IdExplosion)
    loadExportExplotionAction(0)
  }

  handleExportExplotion = () => {
    const {
      actions: {
        loadExportExplotionAction,
      },
      negociaciones: {
        backend: {
          datasources: {
            explotionDetails: {
              HeaderList: HeaderListDetails,
              RowsList: RowsListDetails,
            },
          },
        },
        frontend: {
          explotionSelected: {
            IdExplosion,
            PlazaId,
            FechaCreacion,
            Nombre,
          },
        },
      },
    } = this.props;

    const NombreArchivo =
      Nombre.substring(Nombre.length - 4) === '.xsls' ?
        Nombre.substring(0, Nombre.length - 4)
        :
        Nombre

    loadExportExplotionAction(1)
    this.handleDownloadExcel(
      map(HeaderListDetails, 'Label'),
      RowsListDetails,
      `${IdExplosion}-${PlazaId}-${NombreArchivo}-${FechaCreacion}`
    )
  }

  defaultFile = () => {
    const {
      actions: {
        setIconViewExplotionAction,
        setDetalleInsumoAction,
        validatedFileAction,
      },
    } = this.props;
    setIconViewExplotionAction({enabled : false})
    setDetalleInsumoAction([])
    validatedFileAction(false)
  }

  fileHandler = (event) =>{
    const {
      actions: {
        setIconViewExplotionAction,
        requestAddExplotionAction,
        setFileLoadAction,
        validatedFileAction,
      },
      enqueueSnackbar: enqueueSnackbarAction,
      negociaciones: {
        backend:{
          datasources:{
            layoutNegociaciones:{
              Columns: columsRequired,
            },
          },
        },
      },
    } = this.props
    const rowsExplotion = []
    let validated = false
    this.defaultFile();
    requestAddExplotionAction({
      codigo: null,
      message: '',
    })
    if (event.target.value) {
      const fileObj = event.target.files[0];
      if (fileObj.size < 20800000) {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = e => {
            const workbook = XLSX.read(e.target.result, {
              type: 'binary',
            });
            if (workbook.Strings.length) {
              const firstSheet = workbook.SheetNames[0];
              const sheet = workbook.Sheets[firstSheet]
              const excelRows = XLSX.utils.sheet_to_row_object_array(sheet);

              const columsContent = [];
              const range = XLSX.utils.decode_range(sheet['!ref']);
              let C;
              const R = range.s.r;
              // eslint-disable-next-line no-plusplus
              for(C = range.s.c; C <= range.e.c; ++C) {
                const cell = sheet[XLSX.utils.encode_cell({c:C, r:R})]
                let hdr = `UNKNOWN  ${C}`;
                if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);
                columsContent.push(hdr);
              }
              if (!excelRows.length) {
                enqueueSnackbarAction({
                  message: 'Archivo sin información.',
                  options: { variant: 'warning' },
                })
              } else {
                const columsContentLowerCase = columsContent.map(col => col.toLocaleLowerCase())
                validated = this.validateColumnRequired(columsRequired, columsContentLowerCase)

                if ( validated.result){
                  excelRows.map( row => columsContent.forEach( k => {
                    if(k.toLowerCase() !== k) {
                      delete Object.assign(row, {[k.toLowerCase()]: row[k] })[k]
                    }
                  }))
                  rowsExplotion.push(...excelRows)
                  setIconViewExplotionAction({enabled : true})
                  // Si hay celdas vacias las llena con 0
                  columsContentLowerCase.forEach(col => {
                    rowsExplotion.forEach(row => {
                      if(!Object.keys(row).some(r => r === col)) {
                        Object.assign(row, { [col] : 0 })
                      }else{
                        // eslint-disable-next-line no-restricted-globals
                        Object.keys(row).forEach( r => { if(isNaN(row[r])) row[r] = 0 })
                      }
                    })
                  })
                  setFileLoadAction({
                    cols: columsRequired,
                    rows: rowsExplotion,
                    name: fileObj.name,
                    size: fileObj.size,
                  })
                  validatedFileAction(true)
                  this.obtenerDetalleInsumo(rowsExplotion)
                } else {
                  enqueueSnackbarAction({
                    message: validated.msjError,
                    options: { variant: 'warning' },
                  })
                  setFileLoadAction({
                    cols: [],
                    rows: [],
                    name: '',
                    size: 0,
                  })
                  validatedFileAction(false)
                }
              }
            }else{
              enqueueSnackbarAction({
                message: 'Archivo sin información.',
                options: { variant: 'warning' },
              })
            }
          };
          reader.readAsBinaryString(event.target.files[0]);
        }
      }else{
        enqueueSnackbarAction({
          message: 'Peso máximo de archivo es 20mb, favor de validar.',
          options: { variant: 'warning' },
        })
      }
    }else{
      setFileLoadAction({
        cols: [],
        rows: [],
        name: '',
        size: 0,
      })
      enqueueSnackbarAction({
        message: 'No seleccionaste archivo.',
        options: { variant: 'warning' },
      })
    }

  }

  handleDownloadExcel = ( Columns = [], Rows = [], FileName = 'Descarga') => {
    const {
      enqueueSnackbar: enqueueSnackbarAction,
      actions: {
        loadExportExplotionAction,
      },
    } = this.props ;
    if (Rows && Rows.length) {
      try{
        const dataLayoutNegociaciones = []
        dataLayoutNegociaciones.push(Columns)
        if(Array.isArray(Rows.Contenido)){
          dataLayoutNegociaciones.push(...Rows.map(row => row.Contenido.map(cont => cont.Value)))
        }else {
          dataLayoutNegociaciones.push(...map(Rows, 'Contenido').map( row => Object.values(row)))
        }
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.aoa_to_sheet(dataLayoutNegociaciones);
        XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');/* add worksheet to workbook */
        XLSX.writeFile(wb, FileName.concat('.xlsx'))/* write workbook */
        loadExportExplotionAction(-1)
      }catch(err){
        enqueueSnackbarAction({
          message: 'Ocurrio un problema al descargar, favor de comunicarse con Soporte.',
          options: { variant: 'error' },
        })
        loadExportExplotionAction(0)
      }
    }else{
      enqueueSnackbarAction({
        message: 'No existe información para descargar, favor de verificar.',
        options: { variant: 'error' },
      })
      loadExportExplotionAction(0)
    }
  }

  validateColumnRequired = ( columsRequired = [], columnsContent = []) => {
    const response = {
      result: false,
      errorsColumns: [],
      msjError: '',
    };
    if(columnsContent.length !== columsRequired.length) {
      response.msjError = 'Cantidad de columnas incorrectas, favor de consultar ayuda.'
    }else{

      columnsContent.forEach(cont => {

        if(!columsRequired.some(req => req === cont)) response.errorsColumns.push(cont)
      })
      if(response.errorsColumns.length > 0) {
        response.msjError = `Las siguientes columnas no coinciden "${response.errorsColumns}", favor de consultar ayuda.`
      }else{
        response.result = true
      }
    }
    return response
  }

  obtenerDetalleInsumo = (rowsExplotion = []) => {
    const {
      actions: {
        getDetalleInsumoAction,
      },
      enqueueSnackbar: enqueueSnackbarAction,
    } = this.props;
    try{
      const suppliesExplotion = rowsExplotion.map(r => r.insumo).toString()
      if (suppliesExplotion.length > 0) {
        getDetalleInsumoAction(suppliesExplotion, rowsExplotion)
      } else {
        enqueueSnackbarAction({
          message: 'No existe explosión cargada, favor de validar',
          options: { variant: 'error' },
        })
      }
    }catch(err){
      enqueueSnackbarAction({
        message: 'Error al obtener del detalle de insumos.',
        options: { variant: 'error' },
      })
    }
  }

  openModalContentLayout = () => {
    const {
      actions: {
        setModalActiveAction,
        showModalContentLayoutAction,
      },
    } = this.props;
    setModalActiveAction('Helper')
    showModalContentLayoutAction(true)
  }

  openModalViewExplotion = () => {
    const {
      actions: {
        setModalActiveAction,
        showModalViewExplotionAction,
      },
    } = this.props;
    setModalActiveAction('ViewExplotion')
    showModalViewExplotionAction(true)
  }

  closeModalViewExplotion = () => {
    const {
      actions: {
        setModalActiveAction,
        showModalViewExplotionAction,
      },
    } = this.props;
    setModalActiveAction('')
    showModalViewExplotionAction(false)
  }

  saveExplotions = () => {
    const {
      actions:{
        addExplotionsAction,
        setFileLoadAction,
        setIconViewExplotionAction,
      },
      negociaciones: {
        frontend: {
          ui: {
            selectPlazas: {
              plazaSelected,
            },
          },
          explotionDetails: {
            rows,
          },
          fileLoad: {
            name: nombreArchivo,
          },
          explotionSelected: {
            IdExplosion,
          },
        },
        backend: {
          datasources:{
            // userCredentials: {
            //   idUser,
            // },
            layoutNegociaciones:{
              Columns: columsRequired,
            },
            currentDateTime: {
              Year,
            },
          },
        },
      },
      usuarioGlobal:{
        IdEmpleado,
      },

    } = this.props;
    const JsonExplotion = {
      nombre: nombreArchivo,
      insumos: rows.length,
      plazaid: plazaSelected,
      empleadocreacionid: IdEmpleado,
    }
    const JsonExplotionDetails = [...rows]
    JsonExplotionDetails.forEach( row => {
      Object.keys(row).forEach( r => {
        if(!columsRequired.some( colum => colum === r))
          delete row[r]
      })
    })
    const additionalData = {
      idExplosion: IdExplosion,
      iPlaza: plazaSelected,
      anio: Year,
    }

    addExplotionsAction(JsonExplotion, JsonExplotionDetails, additionalData)
    this.closeModalViewExplotion()
    setFileLoadAction({
      cols: [],
      rows: [],
      name: '',
      size: 0,
    })
    setIconViewExplotionAction({enabled : false})
  }

  render() {

    const {
      classes,
      negociaciones,
    } = this.props;

    const {
      frontend:{
        ui:{
          selectPlazas: {
            arrPlazas,
            plazaSelected,
          },
          modalActive,
        },
        fileLoad: {
          name: nombreArchivo,
        },
        iconViewExplotion: {
          enabled: enabledIconViewExplotion,
        },
        explotionDetails: {
          headers,
          rows,
        },
        explotionSelected: {
          IdExplosion: IdExplosionSelected,
        },
      },
      backend: {
        datasources: {
          explotionList: {
            HeaderList,
            RowsList,
          },
          request: {
            addExplotion: {
              codigo: codigoRequest,
            },
          },
          currentDateTime: {
            Year,
          },
        },
      },
    } = negociaciones;
    return (
      <div>
        <Helmet>
          <title>Negociaciones</title>
          <meta name="description" content="Description of Negociaciones" />
        </Helmet>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Listado de Explosiones
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          alignItems="center"
          justify="center">
          <Grid item xs={12} style={{ margin: 10 }}>
            <Paper style={{ padding: 15 }}>
              <Grid container>
                <Grid item xs={2}>
                  <TextField
                    id="select-plaza"
                    select
                    label="Plaza"
                    value={plazaSelected}
                    onChange={this.handleSelectedPlaza}
                    margin="normal"
                  >
                    <MenuItem key="item0" value="0" disabled>
                      Seleccionar Plaza
                    </MenuItem>
                    {arrPlazas.map(option => (
                      <MenuItem
                        key={option.IdPlaza}
                        value={option.IdPlaza}>
                        {option.Nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Año"
                    value={Year}
                    className={classes.textField}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <h3>Selección de archivo</h3>
              <Paper style={{ padding: 20}}>
                <Paper className={classes.buttonClass} elevation={1} xs={12}>
                  <Tooltip
                    title="Ayuda de Layout"
                    aria-label="Ayuda de Layout"
                  >
                    <IconButton
                      className={classes.iconHelper}
                      aria-label="ContactSupport"
                      onClick={this.openModalContentLayout}
                    >
                      <ContactSupport />
                    </IconButton>
                  </Tooltip>
                  <Divider className={classes.divider} />
                  <input
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    style={{"display":"none"}}
                    id="contained-button-file"
                    multiple
                    type="file"
                    disabled={plazaSelected === 0}
                    onChange={this.fileHandler.bind(this)}
                    value=""
                  />
                  <label htmlFor="contained-button-file">
                    <Tooltip
                      title="Favor de Seleccionar Plaza"
                      aria-label="Favor de Seleccionar Plaza"
                      disableHoverListener={plazaSelected > 0}
                      disableFocusListener={plazaSelected > 0}
                      disableTouchListener={plazaSelected > 0}
                    >
                      <span>
                        <IconButton
                          component="span"
                          className={classes.iconFile}
                          aria-label="Folder"
                          {...(plazaSelected === 0 ? {disabled: true} : {} )}
                        >
                          <Folder />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </label>
                  <InputBase
                    className={classes.input}
                    placeholder={nombreArchivo}
                    disabled
                  />
                  <Divider className={classes.divider} />
                  <IconButton
                    className={`${classes.iconButtonPadding} ${enabledIconViewExplotion ? classes.enabledIconViewExplotion : null}`}
                    disabled={!enabledIconViewExplotion}
                    aria-label="RemoveRedEye"
                    onClick={this.openModalViewExplotion}
                  >
                    <RemoveRedEye />
                  </IconButton>
                </Paper>
              </Paper>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end">
                <Grid item xs={8}>
                  <h3>Listado de explosiones</h3>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    disabled={!IdExplosionSelected}
                    aria-label="CloudDownload"
                    onClick={this.handleExportExplotion}
                    className={`${classes.buttonSuccess} ${classes.buttonExport}`}
                  >
                    <CloudDownload style={{marginRight: '0.5rem'}} />
                    Exportar
                  </Button>
                </Grid>
              </Grid>
              <Paper>
                <div>
                  <Table className={classes.table}>
                    <TableHead>
                      {RowsList && RowsList.length > 0 ?
                        <TableRow>
                          <TableCell
                            padding="checkbox"
                          ></TableCell>
                          {HeaderList.map(head  => (
                            <TableCell
                              align="left"
                              padding="none"
                              key={`col_${head.Name}`}>
                              <b>{capitalize(head.Label)}</b>
                            </TableCell>
                          ))}
                        </TableRow>
                        :
                        <TableRow>
                          <TableCell>
                            <h2>No hay explosiones para el año actual</h2>
                          </TableCell>
                        </TableRow>
                      }
                    </TableHead>
                    <TableBody>
                      { RowsList.map( row =>(
                        <TableRow
                          key={`row_${row.IdExplosion}`}
                          hover
                          style={{'&td:lastChild': { backgroundColor: '#e6282b'}}}
                        >
                          <TableCell
                            align="left"
                            key={`cell_opt_${row.IdExplosion}`}
                            padding="checkbox"
                          >
                            <Radio
                              checked={IdExplosionSelected === row.IdExplosion}
                              value={row.IdExplosion}
                              aria-label={`${row.IdExplosion}`}
                              onClick={this.handleSelectExplotion}
                            />
                          </TableCell>
                          { HeaderList.map(prop => (
                            <TableCell
                              align={prop.Align ? prop.Align : 'inherit'}
                              padding="none"
                              key={`cell_${row.IdExplosion}_${prop.Name}`}
                            >
                              {row[prop.Name]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Paper>
            </Paper>
          </Grid>
        </Grid>
        {
          (()=> {
            switch(modalActive) {
              case 'Helper':
                return (
                  <ModalContentLayout
                    downLoadExcel={ this.handleDownloadExcel }
                  />
                );
              case 'ViewExplotion':
                return (
                  <ModalViewExplotion
                    open={codigoRequest !== 0}
                    closeModal={this.closeModalViewExplotion}
                    saveExplotions={this.saveExplotions}
                    headers={headers}
                    dataFile={rows}
                  />
                );
              default:
                return null;
            }
          })()
        }
      </div>
    );
  }
}

Negociaciones.propTypes = {
  enqueueSnackbar: PropTypes.func,
  actions: PropTypes.object,
  classes: PropTypes.object,
  negociaciones: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  negociaciones: makeSelectNegociaciones(),
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
const withReducer = injectReducer({ key: 'negociaciones', reducer });
const withSaga = injectSaga({ key: 'negociaciones', saga });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(Negociaciones);
