import React from 'react';
import T from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { TextField, Grid } from '@material-ui/core';
import Appbar from 'components/Appbar';
import { MuiThemeProvider } from "@material-ui/core/styles";
import getMuiTheme from 'containers/Modulos/style';

// Componentes
import Tabla from 'containers/Modulos/componentes/Tabla';
import SinResultados from 'images/iconos/EmptyFuncion.svg';
import Success from 'components/BotonSuccess';
import Cancelar from 'components/BotonCancelar';
import ModalAddModulos from '../AgregarFuncion';
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import { Container } from './styledComponents';

const styles = {
  grow: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: '1000%',
  },
  textFld: { 
    width: '40%', height: 40,margin:20,
  },
  success: {
    marginRight: 10,
  },
}
  
export class AgregarNuevoModulo extends React.Component {
 
  validarNumLetras(e) {
    if (!/[^0-9a-zA-Z-ñÑáéíóúÁÉÍÓÚ\s]+/.test(e.target.value)) {
      const { setTextfielddescripcionTextAction, setTextfieldmoduloTextAction } = this.props;
      if(e.target.name==="nombreModulo"){
        setTextfieldmoduloTextAction(e.target.value);
      } else if (e.target.name==="descripcion") {
        setTextfielddescripcionTextAction(e.target.value);
      }
    }
  }

  salirModulo(){
    const {setOpenmodulosalirAction,setTextfieldmoduloTextAction,setTextfielddescripcionTextAction,
      setIdmoduloAction,getListadoAction,setStepperAction, setOpenSearchAction, 
      setSearchTextAction,setModulosdisableAction,setDatosguardarAction}=this.props;
    setOpenSearchAction(false);
    setSearchTextAction("");
    setModulosdisableAction(false);
    setOpenmodulosalirAction(false);
    setTextfieldmoduloTextAction('');
    setTextfielddescripcionTextAction('');
    setDatosguardarAction([]);
    setIdmoduloAction(0);
    getListadoAction();
    setStepperAction(0);
  }

  validaExisteModulo(){
    const {nombreModuloSinActualizar,setVacioNombreModuloAction,getValidaexistemoduloAction,textFieldModulo}=this.props;
    
    if(nombreModuloSinActualizar.trim()!==textFieldModulo.trim())
    {
      getValidaexistemoduloAction(textFieldModulo.trim());
    }else{
      setVacioNombreModuloAction(false,textFieldModulo.trim());
    }
  }

  cancelaSalirModulo(){
    this.props.setOpenmodulosalirAction(false);
  }

  componentDidMount(){
    const {setVacioNombreModuloAction,setOpenSearchAction,setSearchTextAction,
      IdModulo,setVisualizatablaAction,getModulofuncionAction,setTextfieldmoduloTextAction,
      setTextfielddescripcionTextAction,setListadoAction,setListadoFilterAction,setSelectedAction,
    }=this.props;
    setVacioNombreModuloAction(false);
    setOpenSearchAction(false);
    setSearchTextAction("");
    if(IdModulo>0){
      setVisualizatablaAction(true);
      getModulofuncionAction(IdModulo);
    } else{
      setTextfieldmoduloTextAction("");
      setTextfielddescripcionTextAction("");
      setVisualizatablaAction(false);
      setListadoAction([]);
      setListadoFilterAction([]);
      setSelectedAction([]);
    }
  }

  render() {
    const {
      setStepperaddmoduloAction,
      stepper,
      setStepperAction,
      textFieldModulo,
      textFieldDescripcion,//
      setListadoFilterAction,
      setSelectedAction,
      setOpenSearchAction,
      setSearchTextAction,
      setOpenFilterAction,
      setOpenMenuContextualAction,
      setOpenModalAction,
      setOrderAction,
      setOrderByAction,
      setPageAction,
      setRowsPerPageAction,
      setListadoActivarAction,
      setListadoDesactivarAction,
      setActivarRegistrosAction,
      setTextoModalAction,
      notificacion,
      order,
      orderBy,
      selected,
      data,
      filterData,
      page,
      rowsPerPage,
      open,
      openSearch,
      searchText,
      openModal,
      openMenuContextual,
      activarRegistros,
      openM,
      textFieldNombreFuncion,
      setTextfieldnombrefuncionTextAction,
      nombreBottonModalAddFuncion,
      tipoAgrupador,
      setTipoagrupadoresAction,
      tipoAgrupadorSlc,
      urlFuncion,
      urlFuncionSlc,
      setUrlfuncionAction,
      guardaModulo,
      guardaFuncion,
      mensajeLabel,
      vacioNombreModulo,
      setVacioNombreModuloAction,
      openModalAddModulo,
      setOpenmodulosalirAction,
      FuncionId,
      IdModulo,
      usuario,
      labelTipoAgrupador,
      labelNombreFuncion,
      labelUrlFuncion,
      openMensajeSalirFuncion,
      setOpenmodulosalirfuncionAction,
      getTipoagrupadoresAction,
      setTipoagrupadoresTextAction,
      getUrlfuncionAction,
      setUrlfuncionSelectAction,
      setVisualizatablaAction,
      visualizaTabla,
      nombreTipoAgrupador,
      setDatosguardarAction,
      datosGuardar,
      setActualizafuncionAction,
      actualizaFuncion,
      setSelecttipoagrupadorAction,
      setSelecturlfuncionAction,
      setListadoAction,
      setListadoDesactivarFuncionesAction,
      setListadoActivarFuncionesAction,
      setModalfuncionesdisableAction,
      modalFuncionesDisable,
      moduloSoloLectura,
      setModulosdisableAction,
      permisos,
    } = this.props;
    
    const rows = [
      { id: 'FuncionId', numeric: false, disablePadding: false, label: '#', filter: true },
      { id: 'NombreAgrupador', numeric: false, disablePadding: false, label: 'Agrupador', filter: true },
      { id: 'NombreFuncion', numeric: false, disablePadding: false, label: 'Funcion', filter: true },
      { id: 'URL', numeric: false, disablePadding: false, label: 'URL', filter: true },
      { id: 'Activo', numeric: false, disablePadding: false, label: 'Estatus', filter: true },
      { id: 'Acciones', numeric: false, disablePadding: false, label: ' ' },
    ];

    return ( 
      <React.Fragment>
        <Appbar 
          texto='Registrar módulo'
          onClickRegresar={() => setOpenmodulosalirAction(true)}
          hayCambios={openM}
        />
        <Container
          container
          style={{ padding: 8}}>

          <Paper
            style= {{
              width: '100%',
              overflowX: 'auto',
              paddingBottom: 20,
            }}
          >
            <TextField
              id="nombreModulo"
              label="Nombre módulo"
              onChange={(e) => this.validarNumLetras(e) }
              type="text"
              fullWidth
              style = {styles.textFld}
              margin="normal"
              name="nombreModulo"
              value={textFieldModulo}
              error={vacioNombreModulo}
              helperText={mensajeLabel}
              inputProps={{ maxLength: 50}}
              autoFocus
              disabled={moduloSoloLectura}
              onBlur ={() => this.validaExisteModulo() }
            />
            <TextField
              id="descripcion"
              label="Descripción"
              onChange={(e) => this.validarNumLetras(e) }
              type="text"
              fullWidth
              style = {styles.textFld}
              margin="normal"
              name="descripcion"
              multiline
              rows="1"
              value={textFieldDescripcion}
              inputProps={{ maxLength: 250 }}
              disabled={moduloSoloLectura}
            />
            <br></br>
            <MuiThemeProvider theme={getMuiTheme}>
              { visualizaTabla === true ?
                <Tabla
                  // Cabeceras de la tabla
                  rows={rows}

                  // idFila
                  idFila="FuncionId"

                  // Actions
                  setListadoFilterAction={setListadoFilterAction}
                  setSelectedAction={setSelectedAction}
                  setOpenSearchAction={setOpenSearchAction}
                  setSearchTextAction={setSearchTextAction}
                  setOpenFilterAction={setOpenFilterAction}
                  setOpenMenuContextualAction={setOpenMenuContextualAction}
                  setOpenModalAction={setOpenModalAction}
                  setOrderAction={setOrderAction}
                  setOrderByAction={setOrderByAction}
                  setPageAction={setPageAction}
                  setRowsPerPageAction={setRowsPerPageAction}
                  setStepperAction={setStepperAction}
                  setListadoActivarAction={setListadoActivarAction}
                  setListadoDesactivarAction={setListadoDesactivarAction}
                  setActivarRegistrosAction={setActivarRegistrosAction}
                  setTextoModalAction={setTextoModalAction}
                  notificacion = {notificacion}
                  setStepperaddmoduloAction = {setStepperaddmoduloAction}
                  setActualizafuncionAction={setActualizafuncionAction}
                  setModalfuncionesdisableAction={setModalfuncionesdisableAction}
                  moduloSoloLectura={moduloSoloLectura}
                  setModulosdisableAction={setModulosdisableAction}
                  // State
                  order={order}
                  orderBy={orderBy}
                  selected={selected}
                  data={data} 
                  filterData={filterData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  open={open}
                  openSearch={openSearch}
                  searchText={searchText}
                  openModal={openModal}
                  openMenuContextual={openMenuContextual}
                  stepper={stepper}
                  activarRegistros={activarRegistros}
                  setListadoDesactivarFuncionesAction={setListadoDesactivarFuncionesAction}
                  setListadoActivarFuncionesAction={setListadoActivarFuncionesAction}
                  permisos={permisos}
                  
                  // Paginador
                  rowsPerPageOptions={[5, 10, 25]} 
                /> : 
                <div>
                  <br></br>
                 
                  <Appbar 
                    texto='Funciones'
                  />
                  <br></br>
                  <div style={{textAlign: 'center'}}>
                    <React.Fragment>
                      <img
                        key="Sin resultados"
                        src={SinResultados}
                        style={{ width:'100px',height: '100px'}}
                        alt="Una vez que agregue funciones, se mostrarán en este apartado."
                      />
                      <p style={{ marginBottom: 12 }}>Una vez que agregue funciones, se mostrarán en este apartado.</p>
                      {
                        textFieldModulo.trim() !=='' &&  (
                          <Success 
                            label="Agregar"
                            onClick={()=> setStepperaddmoduloAction(true)}
                          /> 
                        )
                      }
                    </React.Fragment>
                  </div>
                </div>
              }
            </MuiThemeProvider>
            {openM &&
              <ModalAddModulos
                openM ={openM}
                setStepperaddmoduloAction = {setStepperaddmoduloAction}
                textFieldNombreFuncion ={textFieldNombreFuncion}
                setTextfieldnombrefuncionTextAction = {setTextfieldnombrefuncionTextAction}
                nombreBottonModalAddFuncion = {nombreBottonModalAddFuncion}
                tipoAgrupador = {tipoAgrupador}
                setTipoagrupadoresAction={setTipoagrupadoresAction}
                tipoAgrupadorSlc ={tipoAgrupadorSlc}
                urlFuncion = {urlFuncion}
                urlFuncionSlc ={urlFuncionSlc}
                setUrlfuncionAction ={setUrlfuncionAction}
                guardaFuncion ={guardaFuncion}
                FuncionId = {FuncionId}
                IdModulo={IdModulo}
                labelTipoAgrupador={labelTipoAgrupador}
                labelNombreFuncion={labelNombreFuncion}
                labelUrlFuncion={labelUrlFuncion}
                openMensajeSalirFuncion={openMensajeSalirFuncion}
                setOpenmodulosalirfuncionAction={setOpenmodulosalirfuncionAction}
                getTipoagrupadoresAction={getTipoagrupadoresAction}
                setTipoagrupadoresTextAction={setTipoagrupadoresTextAction}
                getUrlfuncionAction={getUrlfuncionAction}
                setUrlfuncionSelectAction={setUrlfuncionSelectAction}
                setListadoFilterAction={setListadoFilterAction}
                setVisualizatablaAction={setVisualizatablaAction}
                nombreTipoAgrupador ={nombreTipoAgrupador}
                textFieldModulo={textFieldModulo}
                usuario={usuario}
                setDatosguardarAction ={setDatosguardarAction}
                textFieldDescripcion ={textFieldDescripcion}
                datosGuardar={datosGuardar}
                selected = {selected}
                setActualizafuncionAction={setActualizafuncionAction}
                actualizaFuncion={actualizaFuncion}
                setSelecttipoagrupadorAction={setSelecttipoagrupadorAction}
                setSelecturlfuncionAction={setSelecturlfuncionAction}
                setListadoAction={setListadoAction}
                data={data}
                filterData={filterData}
                setSelectedAction={setSelectedAction}
                setModalfuncionesdisableAction={setModalfuncionesdisableAction}
                modalFuncionesDisable={modalFuncionesDisable}
              />
            }
            <Modal 
              open={openModalAddModulo}
              typeAlert='Report'
              typeOptions='Select'
              title='Confirmar....'
              message='Existen datos no guardados, ¿Desea continuar?'
              onClickAccept={() => this.salirModulo()}
              onClickCancel={() => this.cancelaSalirModulo() }
            />
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={
                {
                  paddingTop: 16,
                  paddingRight: 32,
                  height: 'calc(15% - 32px)',
                }
              }
            >
              <Grid
                item
                style={
                  {
                    paddingRight: 4,
                  }
                }
              >
                <Cancelar label='Cerrar' onClick={() => setOpenmodulosalirAction(true)} />              
              </Grid>
              <Grid
                item
                style={
                  {
                    paddingLeft: 4,
                  }
                }
              >
                <Success 
                  style={styles.success}
                  label={this.props.IdModulo  === 0 ? "Guardar" : "Actualizar"}
                  disabled={moduloSoloLectura}
                  onClick={()=> textFieldModulo.trim()==='' || vacioNombreModulo===true  ? setVacioNombreModuloAction(true,textFieldModulo) : guardaModulo()}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </React.Fragment> 
    );
  }
}


AgregarNuevoModulo.propTypes = {
  setTextfielddescripcionTextAction: T.func,
  setTextfieldmoduloTextAction: T.func,
  setOpenmodulosalirAction:T.func,
  setIdmoduloAction:T.func,
  getListadoAction:T.func,
  setStepperAction:T.func, 
  setOpenSearchAction:T.func, 
  setSearchTextAction:T.func,
  setModulosdisableAction:T.func,
  nombreModuloSinActualizar:T.string,
  getValidaexistemoduloAction:T.func,
  setVacioNombreModuloAction:T.func,
  IdModulo:T.number,
  setVisualizatablaAction:T.func,
  getModulofuncionAction:T.func,
  setListadoAction:T.func,
  setListadoFilterAction:T.func,
  setSelectedAction:T.func,
  setStepperaddmoduloAction:T.func,
  stepper:T.number,
  textFieldModulo:T.string,
  textFieldDescripcion:T.string,
  setOpenFilterAction:T.func,
  setOpenMenuContextualAction:T.func,
  setOpenModalAction:T.func,
  setOrderAction:T.func,
  setOrderByAction:T.func,
  setPageAction:T.func,
  setRowsPerPageAction:T.func,
  setListadoActivarAction:T.func,
  setListadoDesactivarAction:T.func,
  setActivarRegistrosAction:T.func,
  setTextoModalAction:T.func,
  order:T.string,
  orderBy:T.string,
  selected:T.array,
  data:T.array,
  filterData:T.array,
  page:T.number,
  rowsPerPage:T.number,
  open:T.bool,
  openSearch:T.bool,
  searchText:T.string,
  openModal:T.bool,
  openMenuContextual:T.bool,
  activarRegistros:T.array,
  openM: T.bool,
  textFieldNombreFuncion: T.string,
  setTextfieldnombrefuncionTextAction: T.func,
  nombreBottonModalAddFuncion: T.number,
  tipoAgrupador: T.array,
  setTipoagrupadoresAction: T.func,
  tipoAgrupadorSlc: T.oneOfType([
    T.string,
    T.number,
  ]),
  urlFuncion: T.array,
  urlFuncionSlc: T.oneOfType([
    T.string,
    T.number,
  ]),
  setUrlfuncionAction: T.func,
  guardaModulo: T.func,
  guardaFuncion: T.func,
  mensajeLabel: T.string,
  vacioNombreModulo: T.bool,
  openModalAddModulo: T.bool,
  FuncionId: T.number,
  usuario: T.number,
  labelTipoAgrupador: T.string,
  labelNombreFuncion: T.string,
  labelUrlFuncion: T.string,
  openMensajeSalirFuncion: T.bool,
  setOpenmodulosalirfuncionAction: T.func,
  getTipoagrupadoresAction: T.func,
  setTipoagrupadoresTextAction: T.func,
  getUrlfuncionAction: T.func,
  setUrlfuncionSelectAction: T.func,
  visualizaTabla: T.bool,
  nombreTipoAgrupador: T.string,
  setDatosguardarAction: T.func,
  datosGuardar: T.array,
  setActualizafuncionAction: T.func,
  actualizaFuncion: T.bool,
  setSelecttipoagrupadorAction: T.func,
  setSelecturlfuncionAction: T.func,
  setListadoDesactivarFuncionesAction: T.func,
  setListadoActivarFuncionesAction: T.func,
  setModalfuncionesdisableAction: T.func,
  modalFuncionesDisable: T.bool,
  moduloSoloLectura: T.bool,
  notificacion: T.func,
};

export default AgregarNuevoModulo;