/**
 *
 * SeguimientoEtapas
 *
 */

import React, {Component} from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import Appbar from 'components/Appbar';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { DAEMON } from 'utils/constants';
import Topbar from './components/Topbar';
import TablaSeguimiento from './components/TablaSeguimiento';
import SeguimientoCliente from './components/SeguimientoCliente';
import makeSelectSeguimientoEtapas from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import ModalCambiarEtapas from './components/ModalCambiarEtapas';
import ModalFinalizarEtapas from './components/ModalFinalizarEtapas';

const styles = () => ({})
const moment = extendMoment(Moment);

export class SeguimientoEtapas extends Component {
  componentDidMount() {

    const {
      usuarioId,
      actions:{
        getPlazasAction,
        getClientesSeguimientoAction,
        obtenerPermisosAction,
      },
    } = this.props;
 
    getPlazasAction(0);
    getClientesSeguimientoAction(0, usuarioId);
    // obtenerPermisosAction();
  }

  handleChangePlazaAction = (value) => {
    const {
      actions: {
        setSelectedPlazaAction,
      },
    
    } = this.props;

    setSelectedPlazaAction(value)
  }

  handleSetClienteAction = (clienteId) => {
    const {
      actions: {
        setClienteAction,
        setStepperAction,
      },
      seguimientoEtapas: {
        seguimientoEtapas: {
          backend:{
            data,
          },
        },
      },
    } = this.props;

    const clienteSeleccionado = data.find(cliente => cliente.id === clienteId);
 
    setClienteAction(clienteSeleccionado);
    setStepperAction(1);
  }

  handleShowModalEtapaAction = () => {
    const {
      actions: {
        setShowModalEtapaAction,
      },
    
    } = this.props;

    setShowModalEtapaAction();
  }

  handleShowModalFinalizarEtapaAction = () => {
    const {
      actions: {
        setShowModalFinalizarEtapaAction,
      },
    
    } = this.props;

    setShowModalFinalizarEtapaAction();
  }

  handleFileAction = (input, event) => {
   
    const {
      // eslint-disable-next-line no-shadow
      enqueueSnackbar,
      actions: {
        handleChangeArchivoAction,
      },
    } = this.props;

    const archivosValidos = [
      'pdf', 
    ];
    const formData = new FormData();
    formData.append('refId', 'documentacion')

    const arreglo = [];
    let band = false;

    let tipo = '';
    const {
      target: {
        files,
      },
    } = event;
 
    tipo = files[0].name.substring(files[0].name.lastIndexOf('.') + 1);
    tipo = tipo.toLowerCase();
    if(archivosValidos.includes(tipo.toLowerCase())){
      if(files[0].size > 5242880){
        enqueueSnackbar({
          message: 'El tamaño del archivo sobrepasa el limite permitido',
          options: {
            variant: 'warning',
          },
        })
      } else {
        band = true;
        formData.append('files',files[0]);
        arreglo.push(files[0]);
      }
    } else {
      enqueueSnackbar({
        message: 'Archivos no admitidos',
        options: {
          variant: 'warning',
        },
      })
    }
    
    event.target.value = null;
    if(band)
    {
      handleChangeArchivoAction(input, arreglo);
    }
  }

  handleEtapasSeguimientoAction = () => {
    const {
      actions: {
        getEtapasSeguimientoAction,
      },
      seguimientoEtapas:{
        seguimientoAbogado: {
          frontend: {
            cliente: {
              clienteId,
              empresaId,
            },
          },
        },
      },
    }  = this.props;

    getEtapasSeguimientoAction(empresaId, clienteId);
  }

  handleGuardarSeguimientoAction = () => {
    const {
      actions: {
        guardarSeguimientoClienteAction,
      },
    } = this.props;

    guardarSeguimientoClienteAction();
  }
  
  handleChangeInputAction = (input, event) => {
    const {
      target: {
        value,
      },
    } = event

    const {
      actions: {
        onChangeInputAction,
      },
    } = this.props;

    onChangeInputAction(input, value);
  }

  handleChangeExpedienteAction = (event) => {
    const { 
      target: {
        value,
      },
    } = event;
    
    const {
      actions: {
        setExpedienteAction,
      },
    } = this.props;

    setExpedienteAction(value);
  }

  handleChangeSelectedEtapaAction = (selectedEtapa) => {
    const {
      actions: {
        onChangeSelectedEtapaAction,
      },
    } = this.props;

    onChangeSelectedEtapaAction(selectedEtapa);
  }

  handleStepperAction = (stepper) => {
    const {
      actions: {
        setStepperAction,
      },
    } = this.props;
    
    setStepperAction(stepper)
  }

  handleDownloadFilesAction = (clienteId) => {
    const {
      actions: {
        downloadFilesAction,
      },
    } = this.props;
    downloadFilesAction(clienteId);
  }

  handleShowSearchTextFieldAction = () => {
    const {
      actions: {
        setShowSearchTextFieldAction,
        setFilterClientesSeguimientoAction,
      },
      seguimientoEtapas: {
        seguimientoEtapas: {
          backend: {
            data,
          },
          frontend: {
            tabla: {
              showSearchTextField,
            },
          },
        },
      },
    } = this.props;
    
    if(showSearchTextField){
      setFilterClientesSeguimientoAction(data);
    }

    setShowSearchTextFieldAction();
  }

  handleSearchTextFieldAction = (searchTextField) => {
    const {
      actions: {
        setSearchTextFieldAction,
        setFilterClientesSeguimientoAction,
      },
      seguimientoEtapas: {
        seguimientoEtapas: {
          backend: {
            data,
          },
        },
      },
    } = this.props;

    if(searchTextField.length === 0){
      setFilterClientesSeguimientoAction(data)
      setSearchTextFieldAction('');
    } else {
      setSearchTextFieldAction(searchTextField);      
    
      const newData = data.filter((item) => {
        // eslint-disable-next-line no-restricted-syntax
        for(const key in item){
          if(item[key].toString().toLowerCase().includes(searchTextField.toLowerCase())){
            return item;
          }
        }
      } 
      );

      setFilterClientesSeguimientoAction(newData)
    }
  }

  handleShowFiltersAction = () => {
    const {
      actions: {
        setShowFiltersAction,
      },
    } = this.props;

    setShowFiltersAction();
  }

  handleFocusedInputAction = (focusedInput) => {
   
    const {
      actions: {
        setFocusedInputAction,
      },
    } = this.props;
    setFocusedInputAction(focusedInput);
  }

  handleChangeDatesAction = ({startDate, endDate}) => {
    const {
      actions: {
        onChangeDatesAction,
        setFilterClientesSeguimientoAction,
      },
      seguimientoEtapas: {
        seguimientoEtapas: {
          backend: {
            data,
          },
        },
      },
    } = this.props;

    onChangeDatesAction(startDate, endDate);
    if(startDate !== null && endDate !== null){
      // Filtro para fechas
      
      setFilterClientesSeguimientoAction( data.filter(el => {
        const fechaAsignacionSplit = el.FechaAsignacionEtapa.split('/');
        let fechaAsignacionFormateada = `${fechaAsignacionSplit[2]}-${fechaAsignacionSplit[1]}-${fechaAsignacionSplit[0]}`
    
        if(fechaAsignacionFormateada === 'undefined-undefined-'){
          fechaAsignacionFormateada = '';
        }

        const fechaDemandaSplit = el.FehaDemanda.split('/');
        let fechaDemandaFormateada = `${fechaDemandaSplit[2]}-${fechaDemandaSplit[1]}-${fechaDemandaSplit[0]}`
    
        if(fechaDemandaFormateada === 'undefined-undefined-'){
          fechaDemandaFormateada = '';
        }

        return(
          moment(fechaAsignacionFormateada).isBetween(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), null, '[]') ||
          moment(fechaDemandaFormateada).isBetween(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), null, '[]') ? el : null
        )
      }))
    } else if(startDate === null && endDate === null){
      setFilterClientesSeguimientoAction(data)
    }
    if(startDate !== null && endDate !== null){
      // Filtro para fechas
      
      setFilterClientesSeguimientoAction( data.filter(el => {
        const fechaAsignacionSplit = el.FechaAsignacionEtapa.split('/');
        let fechaAsignacionFormateada = `${fechaAsignacionSplit[2]}-${fechaAsignacionSplit[1]}-${fechaAsignacionSplit[0]}`
    
        if(fechaAsignacionFormateada === 'undefined-undefined-'){
          fechaAsignacionFormateada = '';
        }

        const fechaDemandaSplit = el.FehaDemanda.split('/');
        let fechaDemandaFormateada = `${fechaDemandaSplit[2]}-${fechaDemandaSplit[1]}-${fechaDemandaSplit[0]}`
    
        if(fechaDemandaFormateada === 'undefined-undefined-'){
          fechaDemandaFormateada = '';
        }

        return(
          moment(fechaAsignacionFormateada).isBetween(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), null, '[]') ||
          moment(fechaDemandaFormateada).isBetween(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), null, '[]') ? el : null
        )
      }))
    } else if(startDate === null && endDate === null){
      setFilterClientesSeguimientoAction(data)
    }
  }

  handleSelectedAction = (event,id) => {
    const { 
      actions: {
        setSelectedAction,
      },
      seguimientoEtapas: {
        seguimientoEtapas: {
          frontend: {
            tabla: {
              selected,
            },
          },
        },
      },
    } = this.props;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if(selectedIndex === -1){
      newSelected.push(id);
    } else {
      newSelected = [];
    }
  
    setSelectedAction(newSelected);
    // setSelectedAction({ selected: newSelected, showAcciones: 0 });
  }

  handleRowsPerPageAction = (rowsPerPage) => {
    const {
      actions: {
        setRowsPerPageAction,
      },
    } = this.props;
    setRowsPerPageAction(rowsPerPage);
  }

  handleChangePageAction = (event, page) => {
    const {
      actions: {
        setPageAction,
      },
    } = this.props;
    setPageAction(page);
  }
  
  render() {

    const {
      permisos,
      nombreUsuario,
      seguimientoEtapas: {
        seguimientoEtapas: {
          backend:{
            plazas,
            data,
          },
          frontend: {
            selectedPlaza,
            stepper,
            tabla: {
              rows,
              order,
              orderBy,
              selected,
              filterData,
              showFilters,
              showSearchTextField,
              searchTextField,
              startDate,
              endDate,
              page,
              rowsPerPage,
              focusedInput,
              showAcciones,
            },
          },
        },
        seguimientoAbogado: {
          frontend: {
            showModalEtapa,
            showModalFinalizarEtapa,
            cliente: {
              clienteId,
              nombreCliente,
              plaza,
              fechaAsignacion,
              montoReclamado,
              diasTranscurridos,
            },
            etapa: {
              selectedEtapa,
              nombreEtapa,
              fechaEtapa,
              diasTranscurridosEtapa,
              archivoEtapaSubido,
              archivoEtapa,
              nombreArchivoEtapa,
              notaEtapa,
              observacionEtapa,
              observacionFinalizarEtapa,
              archivoFinalizarEtapaSubido,
              archivoFinalizarEtapa,
              nombreArchivoFinalizarEtapa,
            },
            demanda: {
              antecedente,
              expediente,
              juzgado,
              fechaDemanda,
            },
          },
          backend: {
            etapas,
          },
        },
      },
    } = this.props
    // console.log('this.props principal',this.props);

    const paramsSeguimientoEtapas = {
      nombreUsuario,
      plazas,
      selectedPlaza,
    }

    const functionsSeguimientoEtapas = {
      handleChangePlazaAction: this.handleChangePlazaAction,
    }

    const paramsTablaSeguimiento = {
      data,
      rows,
      stepper,
      order,
      orderBy,
      selected,
      filterData,
      showFilters,
      showSearchTextField,
      searchTextField,
      startDate,
      endDate,
      page,
      rowsPerPage,
      focusedInput,
      showAcciones,
    }

    const functionsTablaSeguimiento = {
      handleSetClienteAction: this.handleSetClienteAction,
      handleDownloadFilesAction: this.handleDownloadFilesAction,
      handleShowSearchTextFieldAction: this.handleShowSearchTextFieldAction,
      handleSearchTextFieldAction: this.handleSearchTextFieldAction,
      handleShowFiltersAction: this.handleShowFiltersAction,
      handleFocusedInputAction: this.handleFocusedInputAction,
      handleChangeDatesAction: this.handleChangeDatesAction,
      handleSelectedAction: this.handleSelectedAction,
      handleRowsPerPageAction: this.handleRowsPerPageAction,
      handleChangePageAction: this.handleChangePageAction,
    }

    const paramsSeguimientoCliente = {
      clienteId,
      nombreCliente,
      plaza,
      fechaAsignacion,
      fechaDemanda,
      nombreEtapa,
      montoReclamado,
      diasTranscurridos,
      fechaEtapa,
      diasTranscurridosEtapa,
      showModalEtapa,
      antecedente,
      expediente,
      juzgado,
      notaEtapa,
      selectedEtapa,
      archivoFinalizarEtapaSubido,
    }

    const functionsSeguimientoCliente = {
      handleShowModalEtapaAction: this.handleShowModalEtapaAction,
      handleEtapasSeguimientoAction: this.handleEtapasSeguimientoAction,
      handleGuardarSeguimientoAction: this.handleGuardarSeguimientoAction,
      handleChangeInputAction: this.handleChangeInputAction,
      handleStepperAction: this.handleStepperAction,
      handleShowModalFinalizarEtapaAction: this.handleShowModalFinalizarEtapaAction,
    }

    const paramsModalCambiarEtapa = {
      showModalEtapa,
      archivoEtapaSubido,
      archivoEtapa,
      nombreArchivoEtapa,
      etapas,
      selectedEtapa,
      observacionEtapa,
    }

    const functionsModalCambiarEtapa = {
      handleShowModalEtapaAction: this.handleShowModalEtapaAction,
      handleFileAction: this.handleFileAction,
      handleChangeSelectedEtapaAction: this.handleChangeSelectedEtapaAction,
      handleChangeInputAction: this.handleChangeInputAction,
    }

    const paramsModalFinalizarEtapa = {
      showModalFinalizarEtapa,
      observacionFinalizarEtapa,
      archivoFinalizarEtapaSubido,
      archivoFinalizarEtapa,
      nombreArchivoFinalizarEtapa,
    }

    const functionsModalFinalizarEtapa = {
      handleShowModalFinalizarEtapaAction: this.handleShowModalFinalizarEtapaAction,
      handleChangeInputAction: this.handleChangeInputAction,
      handleFileAction: this.handleFileAction,
    }

    switch(stepper){
      case 0: 
        return (
          <React.Fragment>
            <Appbar 
              texto='Seguimiento etapas'
            />
            <div
              style={
                {
                  height: '85vh',
                  padding: '0 8px 8px 8px',
                  overflow: 'auto',
                }
              }
            >
              <Helmet>
                <title>Seguimiento de etapas</title>
                <meta name="description" content="Description of SeguimientoEtapas" />
              </Helmet>
              <Grid container style={{padding: 10}}>
                <Grid item sm={12}>
                  <Topbar
                    params={paramsSeguimientoEtapas}
                    foo={functionsSeguimientoEtapas}
                  />
                  {
                    <TablaSeguimiento 
                      params={paramsTablaSeguimiento}
                      foo={functionsTablaSeguimiento}
                      permisos={permisos}
                    />
                  }
                </Grid>
              </Grid>
            </div>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Appbar 
              texto='Seguimiento cliente'
              onClickRegresar ={() => this.props.actions.setStepperAction()}
            />
            <div
              style={
                {
                  height: '85vh',
                  padding: '0 8px 8px 8px',
                  overflow: 'auto',
                }
              }
            >
              <Helmet>
                <title>Seguimiento de cliente</title>
                <meta name="description" content="Description of SeguimientoCliente" />
              </Helmet>
              <Grid container style={{padding: 10}}>
                <Grid item sm={12}>
                  <SeguimientoCliente
                    params={paramsSeguimientoCliente}
                    foo={functionsSeguimientoCliente}
                    permisos={permisos}
                  />
                </Grid>
              </Grid>
              <ModalCambiarEtapas 
                params={paramsModalCambiarEtapa} 
                foo={functionsModalCambiarEtapa}
                permisos={permisos}
              />
              <ModalFinalizarEtapas 
                params={paramsModalFinalizarEtapa} 
                foo={functionsModalFinalizarEtapa}
                permisos={permisos}
              />
            </div>
          </React.Fragment>
        );
      default:
        return null;
    }
  }
}

SeguimientoEtapas.propTypes = {
  nombreUsuario: T.string,
  seguimientoEtapas: T.object,
  actions: T.object,
  enqueueSnackbar: T.func,
  usuarioId: T.number,
  // classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  seguimientoEtapas: makeSelectSeguimientoEtapas(),
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

const withReducer = injectReducer({ key: 'seguimientoEtapas', reducer });
const withSaga = injectSaga({ key: 'seguimientoEtapas', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(SeguimientoEtapas);
