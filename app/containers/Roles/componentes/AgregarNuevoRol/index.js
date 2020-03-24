import React from 'react';
import T from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {  TextField, Button } from '@material-ui/core';
import green from '@material-ui/core/colors/green'
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Grey from '@material-ui/core/colors/grey';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import getMuiTheme from 'containers/Modulos/style';

// Componentes
import SinResultados from 'images/iconos/EmptyRol.svg';
import Tabla from '../Tabla';
import ModalAddModulos from '../AgregarFuncion'
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import { Container } from './styledComponents';
import Loading from '../../../Modulos/componentes/Loading';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: '1000%',
  },
  textFld: { 
    width: '40%', height: 40,margin:20,
  },
  botonAgregar: {
    backgroundColor: green[500],
    color: '#fff',
    marginTop: 30,
    float: 'right',
    marginLeft:15,
    width: 100,
    marginRight: 10,
    '&:hover': {
      backgroundColor: 'rgba(76,175,80, 0.8)',
    },
  },
  botonAgregarDesabilitado: {
    backgroundColor: '#d7d7d7',
  },
})
  
class AgregarNuevoModulo extends React.Component {
  
  validarNumLetras(e) {
    if (!/[^0-9a-zA-Z-ñÑáéíóúÁÉÍÓÚ\s]+/.test(e.target.value)) {
      const { setTextfielddescripcionTextAction, setTextfieldnombrerolTextAction } = this.props;
      if(e.target.name==="nombreModulo"){
        setTextfieldnombrerolTextAction(e.target.value);
      } else if (e.target.name==="descripcion") {
        setTextfielddescripcionTextAction(e.target.value);
      }
    }
  }

  salirModulo(){
    const {
      setOpenmodulosalirAction,
      setTextfieldnombrerolTextAction,
      setTextfielddescripcionTextAction,
      setIdmoduloAction,
      getListadoAction,
      setStepperAction,
      setOpenSearchAction,
      setSearchTextAction,
      setModulosdisableAction,
      setActualizaPermisosAction,
      setSelectedAction,
      setSoloLecturaRolAction,
    }=this.props;

    setOpenSearchAction(false);
    setSearchTextAction("");
    setModulosdisableAction(false);
    setActualizaPermisosAction(false);
    setOpenmodulosalirAction(false);
    setTextfieldnombrerolTextAction('');
    setTextfielddescripcionTextAction('');
    setIdmoduloAction(0);
    getListadoAction();
    setStepperAction(0);
    setSelectedAction([]);
    setSoloLecturaRolAction(false);
  }

  validaExisteRol(){
    const {nombreModuloSinActualizar,setVacioNombreModuloAction,
      getValidaexisterolAction,textFieldModulo}=this.props;
    if(nombreModuloSinActualizar.trim()!==textFieldModulo.trim())
    {
      getValidaexisterolAction(textFieldModulo.trim());
    }else{
      setVacioNombreModuloAction(false,textFieldModulo.trim());
    }
  }

  cancelaSalirModulo(){
    this.props.setOpenmodulosalirAction(false);
  }

  componentDidMount(){
    const {
      setVacioNombreModuloAction,
      setOpenSearchAction,
      setSearchTextAction,
      IdRol,
      setVisualizatablaAction,
      setTextfieldnombrerolTextAction,
      setTextfielddescripcionTextAction,
      setListadoAction,
      setListadoFilterAction,
      setSelectedAction,
      getRolesAction,
      filterData,
      setSoloLecturaRolAction,
      setSoloLecturaEmpresaAction,
    } = this.props;
    
    setVacioNombreModuloAction(false);
    setOpenSearchAction(false);
    setSearchTextAction("");
    
    if(IdRol>0){
      setVisualizatablaAction(true);

      const rolAEditar = filterData.filter(ele => (ele.RolId === IdRol)).map(ele => ele.Activo)[0];
      
      if(rolAEditar){
        setSoloLecturaRolAction(false);
        setSoloLecturaEmpresaAction(false);
      } else {
        setSoloLecturaRolAction(true);
        setSoloLecturaEmpresaAction(true);
      }

      getRolesAction(IdRol);
    } else{
      setTextfieldnombrerolTextAction("");
      setTextfielddescripcionTextAction("");
      setVisualizatablaAction(false);
      setListadoAction([]);
      setListadoFilterAction([]);
      setSelectedAction([]);
    }
  }

  render() {
    const {
      classes,
      setStepperopenmodaladdAction,
      stepper,
      setStepperAction,
      textFieldModulo,
      textFieldDescripcion,
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
      notificacion ,
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
      openModalAddModulo,
      activarRegistros,
      textoModal,
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
      postRolAction,
      guardaFuncion,
      mensajeLabel,
      vacioNombreModulo,
      setVacioNombreModuloAction,
      setOpenmodulosalirAction,
      FuncionId,
      IdRol,
      labelTipoAgrupador,
      labelNombreFuncion,
      labelUrlFuncion,
      openMensajeSalirFuncion,
      setOpenmodulosalirmodalAction,
      getTipoagrupadoresAction,
      setTipoagrupadoresTextAction,
      getUrlfuncionAction,
      setUrlfuncionSelectAction,
      setVisualizatablaAction,
      visualizaTabla,
      nombreTipoAgrupador,
      setDatosGuardarAction,
      datosGuardar,
      setActualizafuncionAction,
      actualizaPermisos,
      setSelecttipoagrupadorAction,
      setSelecturlfuncionAction,
      setListadoAction,
      setListadoDesactivarEmpresasAction,
      setListadoActivarEmpresasAction,
      setModalfuncionesdisableAction,
      modalFuncionesDisable,
      moduloSoloLecturaRol,
      setModulosdisableAction,
      getEmpresasAction,
      getModulosAction,
      getEmpresas,
      selectEmpresa,
      setSelectEmpresasAction,
      onChangeParametros,
      getModulos,
      selectModulos,
      lista,
      handleClickLista,
      getModuloFuncionAction,
      opciones,
      setStepperaddmoduloAction,
      setSelectedPermisosNormalesAction,
      setSelectedPermisosEspecialesAction,
      setOpenModalPermisosEspecialesAction,
      IdRolEmpresa,
      usuarioId,
      setActualizaPermisosAction,
      IdEmpresa,
      setIdRolEmpresaAction,
      loading,
      setSoloLecturaRolAction,
      moduloSoloLecturaEmpresa,
      setSoloLecturaEmpresaAction,
    } = this.props;

    let datosGuardarActualizado = {};
    
    datosGuardarActualizado = {
      nombreRol: textFieldModulo,
      descripcion: textFieldDescripcion,
      empresas: [...data.filter(ele => ele.Activo)],
    }

    const rows = [
      { id: 'IdRolEmpresa', numeric: false, disablePadding: false, label: '#', filter: true },
      { id: 'IdEmpresa', numeric: false, disablePadding: false, label: '#', filter: true, show: false },
      { id: 'Nombre', numeric: false, disablePadding: false, label: 'Empresas', filter: true },
      { id: 'Modulos', numeric: false, disablePadding: false, label: 'Modulos', filter: true },
      { id: 'Opciones', numeric: false, disablePadding: false, label: 'Opciones', filter: false, show: false },
      { id: 'Activo', numeric: false, disablePadding: false, label: 'Estatus', filter: true },
      { id: 'Nuevo', numeric: false, disablePadding: false, label: 'Nuevo', filter: false, show: false },     
      { id: 'Acciones', numeric: false, disablePadding: false, label: ' ' },
    ];

    return ( 
      <React.Fragment>
        {
          loading && <Loading />
        }
        <AppBar style={{backgroundColor: Grey[200]}} position="static">
          <Toolbar variant="dense" style={{paddingLeft: 8}}>
            {
              <IconButton onClick={() => setOpenmodulosalirAction(true) }>
                <ArrowBack/>
              </IconButton>
            }
            <Typography variant="h6" color="primary" style={styles.grow}>
              Registrar rol
            </Typography>
          </Toolbar>
        </AppBar>
        <Container
          container
          style={{ padding: 8}}
        >
          <Paper
            style= {{
              width: '100%',
              marginTop: 15,
              overflowX: 'auto',
              padding: 0,
            }}
          >    
            <TextField
              id="nombreModulo"
              label="Nombre Rol"
              onChange={(e) => this.validarNumLetras(e) }
              type="text"
              fullWidth
              className = {classes.textFld}
              margin="normal"
              name="nombreModulo"
              value={textFieldModulo}
              error={vacioNombreModulo}
              helperText={mensajeLabel}
              inputProps={{ maxLength: 50}}
              autoFocus 
              disabled={moduloSoloLecturaRol}
              onBlur ={() => this.validaExisteRol() }
            />
            <TextField
              id="descripcion"
              label="Descripción"
              onChange={(e) => this.validarNumLetras(e) }
              type="text"
              fullWidth
              className = {classes.textFld}
              margin="normal"
              name="descripcion"
              multiline
              rows="1"
              value={textFieldDescripcion}
              inputProps={{ maxLength: 250 }}
              disabled={moduloSoloLecturaRol}
            />
            <br></br>    
            <MuiThemeProvider theme={getMuiTheme}>
              { visualizaTabla === true ?
                <Tabla
                  // Cabeceras de la tabla
                  rows={rows}

                  // idFila
                  idFila="IdRolEmpresa"

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
                  setStepperopenmodaladdAction = {setStepperopenmodaladdAction}
                  setActualizafuncionAction={setActualizafuncionAction}
                  setModalfuncionesdisableAction={setModalfuncionesdisableAction}
                  moduloSoloLecturaRol={moduloSoloLecturaRol}
                  setModulosdisableAction={setModulosdisableAction}
                  setStepperaddmoduloAction={setStepperaddmoduloAction}

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
                  textoModal={textoModal}
                  setListadoDesactivarEmpresasAction={setListadoDesactivarEmpresasAction}
                  setListadoActivarEmpresasAction={setListadoActivarEmpresasAction}
                  setActualizaPermisosAction={setActualizaPermisosAction}
                  onChangeParametros={onChangeParametros}
                  IdRol={IdRol}
                  setIdRolEmpresaAction={setIdRolEmpresaAction}
                  setSoloLecturaRolAction={setSoloLecturaRolAction}

                  // Paginador
                  rowsPerPageOptions={[5, 10, 25]} 
                /> : 
                <div>
                  <br></br>
                  <AppBar style={{backgroundColor: Grey[200]}} position="static">
                    <Toolbar variant="dense" style={{paddingLeft: 8}}>
                      <Typography variant="h6" style={styles.grow}>
                        Permisos
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <br></br>
                  <div style={{textAlign: 'center'}}>
                    <React.Fragment>
                      <img
                        key="Sin resultados"
                        src={SinResultados}
                        style={{ width:'100px',height: '100px'}}
                        alt="Una vez que agreguen permisos, se mostrarán en este apartado."
                      />
                      <p>Una vez que agreguen permisos, se mostrarán en este apartado.</p>
                      <p>
                        {textFieldModulo !=='' && <Button
                          size="large"
                          style={{background: green[500], color: '#fff', marginTop: 30,marginLeft:15}}
                          component="span"
                          type="submit"
                          onClick={()=> setStepperopenmodaladdAction(true) }
                          disabled={moduloSoloLecturaRol}
                        >
                          Agregar
                        </Button> }
                      </p>
                    </React.Fragment>
                  </div>
                </div>
              }
            </MuiThemeProvider>
            {openM &&
              <ModalAddModulos
                openM ={openM}
                setStepperopenmodaladdAction = {setStepperopenmodaladdAction}
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
                IdRol={IdRol}
                labelTipoAgrupador={labelTipoAgrupador}
                labelNombreFuncion={labelNombreFuncion}
                labelUrlFuncion={labelUrlFuncion}
                openMensajeSalirFuncion={openMensajeSalirFuncion}
                setOpenmodulosalirmodalAction={setOpenmodulosalirmodalAction}
                getTipoagrupadoresAction={getTipoagrupadoresAction}
                setTipoagrupadoresTextAction={setTipoagrupadoresTextAction}
                getUrlfuncionAction={getUrlfuncionAction}
                setUrlfuncionSelectAction={setUrlfuncionSelectAction}
                setListadoFilterAction={setListadoFilterAction}
                setVisualizatablaAction={setVisualizatablaAction}
                nombreTipoAgrupador ={nombreTipoAgrupador}
                textFieldModulo={textFieldModulo}
                setDatosGuardarAction ={setDatosGuardarAction}
                textFieldDescripcion ={textFieldDescripcion}
                datosGuardar={datosGuardar}
                selected = {selected}
                setActualizafuncionAction={setActualizafuncionAction}
                actualizaPermisos={actualizaPermisos}
                setSelecttipoagrupadorAction={setSelecttipoagrupadorAction}
                setSelecturlfuncionAction={setSelecturlfuncionAction}
                setListadoAction={setListadoAction}
                data={data}
                filterData={filterData}
                setSelectedAction={setSelectedAction}
                setModalfuncionesdisableAction={setModalfuncionesdisableAction}
                modalFuncionesDisable={modalFuncionesDisable}
                getEmpresasAction={getEmpresasAction}
                getModulosAction={getModulosAction}
                getEmpresas={getEmpresas}
                selectEmpresa={selectEmpresa}
                setSelectEmpresasAction={setSelectEmpresasAction}
                onChangeParametros={onChangeParametros}
                getModulos={getModulos}
                selectModulos={selectModulos}
                lista={lista}
                handleClickLista={handleClickLista}
                getModuloFuncionAction={getModuloFuncionAction}
                opciones={opciones}
                setSelectedPermisosNormalesAction={setSelectedPermisosNormalesAction}
                setSelectedPermisosEspecialesAction={setSelectedPermisosEspecialesAction}
                setOpenModalPermisosEspecialesAction={setOpenModalPermisosEspecialesAction}
                openModalAddModulo={openModalAddModulo}
                IdRolEmpresa={IdRolEmpresa}
                IdEmpresa={IdEmpresa}
                setIdRolEmpresaAction={setIdRolEmpresaAction}
                moduloSoloLecturaRol={moduloSoloLecturaRol}
                notificacion={notificacion}
                moduloSoloLecturaEmpresa={moduloSoloLecturaEmpresa}
                setSoloLecturaRolAction={setSoloLecturaRolAction}
                setSoloLecturaEmpresaAction={setSoloLecturaEmpresaAction}
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
            <Button
              size="large"
              className={clsx(classes.botonAgregar, {[classes.botonAgregarDesabilitado]: moduloSoloLecturaRol || !Object.prototype.hasOwnProperty.call(datosGuardarActualizado, 'empresas') || textFieldModulo === '' })}
              component="span"
              type="submit"
              onClick={()=> textFieldModulo.trim()==='' || vacioNombreModulo===true ? setVacioNombreModuloAction(true,textFieldModulo) : postRolAction({idRol: IdRol, usuarioId, datosGuardar: datosGuardarActualizado}) }
              disabled={moduloSoloLecturaRol || !Object.prototype.hasOwnProperty.call(datosGuardarActualizado, 'empresas') || textFieldModulo === ''}
            >
              {this.props.IdRol  === 0 ?"Guardar": "Actualizar"}
            </Button>
            <Button
              size="large"
              style={{background: '#d50000', color: '#fff', marginTop: 30, float: "right",width: 80,marginBottom: 30}}
              component="span"
              type="submit"
              onClick={() => setOpenmodulosalirAction(true)}
            >
                Cerrar
            </Button>
          </Paper>
        </Container>
      </React.Fragment> 
    );
  }
}
// textFieldDescripcion, textFieldModulo
AgregarNuevoModulo.propTypes = {
  setTextfielddescripcionTextAction: T.func, 
  setTextfieldnombrerolTextAction: T.func,
  setOpenmodulosalirAction: T.func,
  setIdmoduloAction: T.func,
  getListadoAction: T.func,
  setStepperAction: T.func, 
  setOpenSearchAction: T.func, 
  setSearchTextAction: T.func,
  setModulosdisableAction: T.func,
  nombreModuloSinActualizar: T.string,
  setVacioNombreModuloAction: T.func,
  getValidaexisterolAction: T.func,
  IdRol: T.number,
  setListadoAction: T.func,
  setListadoFilterAction: T.func,
  setSelectedAction: T.func,
  setVisualizatablaAction: T.func,
  setStepperopenmodaladdAction: T.func,
  stepper: T.number,
  textFieldModulo: T.string,
  textFieldDescripcion: T.string,
  setOpenFilterAction: T.func,
  setOpenMenuContextualAction: T.func,
  setOpenModalAction: T.func,
  setOrderAction: T.func,
  setOrderByAction: T.func,
  setPageAction: T.func,
  setRowsPerPageAction: T.func,
  setListadoActivarAction: T.func,
  setListadoDesactivarAction: T.func,
  setActivarRegistrosAction: T.func,
  setTextoModalAction: T.func,
  order: T.string,
  orderBy: T.string,
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
  activarRegistros:T.number,
  textoModal:T.string,
  openM:T.bool,
  textFieldNombreFuncion:T.string,
  setTextfieldnombrefuncionTextAction: T.func,
  nombreBottonModalAddFuncion:T.number,
  tipoAgrupador:T.array,
  setTipoagrupadoresAction: T.func,
  tipoAgrupadorSlc:T.number,
  urlFuncion:T.array,
  urlFuncionSlc:T.number,
  setUrlfuncionAction: T.func,
  postRolAction: T.func,
  guardaFuncion: T.func,
  mensajeLabel:T.string,
  vacioNombreModulo:T.bool,
  openModalAddModulo:T.bool,
  FuncionId:T.number,
  labelTipoAgrupador:T.string,
  labelNombreFuncion:T.string,
  labelUrlFuncion:T.string,
  openMensajeSalirFuncion:T.bool,
  setOpenmodulosalirmodalAction: T.func,
  getTipoagrupadoresAction: T.func,
  setTipoagrupadoresTextAction: T.func,
  getUrlfuncionAction: T.func,
  setUrlfuncionSelectAction: T.func,
  visualizaTabla:T.bool,
  nombreTipoAgrupador:T.string,
  setDatosGuardarAction: T.func,
  datosGuardar:T.object,
  setActualizafuncionAction: T.func,
  actualizaPermisos:T.bool,
  setSelecttipoagrupadorAction: T.func,
  setSelecturlfuncionAction: T.func,
  setListadoDesactivarEmpresasAction: T.func,
  setListadoActivarEmpresasAction: T.func,
  setModalfuncionesdisableAction: T.func,
  modalFuncionesDisable:T.bool,
  moduloSoloLecturaRol:T.bool,
  getEmpresasAction:T.func,
  getModulosAction:T.func,
  getEmpresas:T.array,
  selectEmpresa:T.array,
  setSelectEmpresasAction: T.func,
  notificacion: T.func,
  onChangeParametros: T.func,
  getModulos: T.array,
  selectModulos: T.array,
  lista:T.array,
  handleClickLista: T.func,
  getModuloFuncionAction: T.func,
  opciones: T.array,
  getRolesAction: T.func,
  setStepperaddmoduloAction: T.func,
  setSelectedPermisosNormalesAction: T.func,
  setOpenModalPermisosEspecialesAction: T.func,
  IdRolEmpresa: T.number,
  setSelectedPermisosEspecialesAction: T.func,
  usuarioId: T.number,
  setActualizaPermisosAction: T.func,
  IdEmpresa: T.number,
  setIdRolEmpresaAction: T.func,
  loading: T.bool,
  setSoloLecturaRolAction: T.func,
  setSoloLecturaEmpresaAction: T.func,
  moduloSoloLecturaEmpresa: T.bool,
};

export default withStyles(styles)(AgregarNuevoModulo);

