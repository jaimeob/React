import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import SinResultados from 'images/iconos/EmptySinRegistrosbueno.svg';
import EditIconModulo from 'images/iconos/edit (1).svg';
import DeleteIcon from 'images/iconos/delete 1.svg';
import DownloadIcon from 'images/iconos/downloadButtonListGrey.png';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import uniqueId from 'lodash/uniqueId';

// Componentes
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import EnhancedTableHead from '../EnhancedTableHead';
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog'; 
import Loading from '../Loading';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 12,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

let textoModal = '¿Está seguro que desea eliminar el registro seleccionado?';

class EnhancedTable extends React.Component {
  handleEtiquetasFilas = (params) => `${params.from}-${params.to} de ${params.count}`;
  
  handleToggle = () => {
    const { setOpenFilterAction, open} = this.props;
    setOpenFilterAction(!open);
  };

  handleMenuFiltros = (estatus) => {
    const { setListadoFilterAction, data,stepper } = this.props;
    let datas,datosTabla; 
    if (stepper===0){
      datas = data.filter((item) => item.Activo == estatus)
    } else if(stepper===1){
      
       datosTabla = this.props.data.filter((item) => item.Activo == estatus);
       
           datas = datosTabla.map((funciones) => {
            return {
              'FuncionId': funciones.FuncionId,
              'NombreAgrupador': funciones.NombreAgrupador,
              'NombreFuncion': funciones.NombreFuncion,
              'URL': funciones.URL,
              'Activo': funciones.Activo,
            };
          })
      
    }

    setListadoFilterAction(datas);

    this.handleToggle();
  }

  openAgregarEditarFunciones(){

  }

  handleToggleSearch = () => {
    const { 
      setListadoFilterAction,
      setOpenSearchAction,
      setSearchTextAction,
      data,
      openSearch,
      searchText,
      stepper,
    } = this.props;

    setOpenSearchAction(!openSearch);
    setSearchTextAction(openSearch ? searchText : '');
    if (stepper===0){
      setListadoFilterAction(data.filter((item) => item.Activo));
    } else if(stepper===1){
      let datosTabla = this.props.data.filter((modulo) => modulo.Activo);

      let data = datosTabla.map((funciones) => {
        return {
          'FuncionId': funciones.FuncionId,
          'NombreAgrupador': funciones.NombreAgrupador,
          'NombreFuncion': funciones.NombreFuncion,
          'URL': funciones.URL,
          'Activo': funciones.Activo,
        };
      })
      setListadoFilterAction(data); 
      
    }
    
  }

  handleSearchText = (event) => {
    const { setListadoFilterAction, setSearchTextAction, data,stepper } = this.props;
    let datas;

    const texto = event.target.value;
    if (stepper===0){
      datas = [
        ...data,
      ]
    } else if(stepper===1){
      datas = data.map((funciones) => {
        return {
          'FuncionId': funciones.FuncionId,
          'NombreAgrupador': funciones.NombreAgrupador,
          'NombreFuncion': funciones.NombreFuncion,
          'URL': funciones.URL,
          'Activo': funciones.Activo,
        };
      })
    }

    if(texto.length === 0){
      setListadoFilterAction(datas);
      setSearchTextAction('');
    } else {
      setSearchTextAction(texto);

      setListadoFilterAction(datas.filter((item) => {
        // eslint-disable-next-line no-restricted-syntax
        for(const key in item){
          if(
            item[key].toString().toLowerCase().includes(texto.toLowerCase()) || 
            (item.Activo ? 'Activo' : 'Inactivo').toLowerCase().indexOf(texto.toLowerCase()) > -1
          ){
            return item;
          }
        }
      } 
      ));
    }
  }

  handleToggleModal = () => {
    const { setOpenModalAction, openModal } = this.props;
    //alert('eliminar');
    setOpenModalAction(!openModal);
  }

  handleToggleMenuContextual = () => {
    const { setOpenMenuContextualAction, openMenuContextual } = this.props;
    setOpenMenuContextualAction(!openMenuContextual);
  };

  handleRequestSort = (event, property) => {
    const { setOrderAction, setOrderByAction, order, orderBy } = this.props;

    const orderByTabla = property;
    let orderTabla = 'desc';

    if (orderBy === property && order === 'desc') {
      orderTabla = 'asc';
    }

    setOrderAction(orderTabla);
    setOrderByAction(orderByTabla);
  };

  handleSelectAllClick = (event) => {
    const { setSelectedAction, filterData, idFila } = this.props;
    
    if (event.target.checked) {
      setSelectedAction(filterData.map(n => n[idFila]));
      return;
    }

    setSelectedAction([]);
  };

  handleClick = (event, id) => {
    const { setSelectedAction, selected } = this.props;
   
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelectedAction(newSelected);
  };

  handleChangePage = (event, page) => {
    const { setPageAction } = this.props;
    setPageAction(page);
  };

  handleChangeRowsPerPage = (event) => {
    const { setRowsPerPageAction } = this.props;
    setRowsPerPageAction(event.target.value)
  };

  handleStepper = () => {
    const { setStepperAction,setIdAction,setOpenmodulosalirAction } = this.props;
    setIdAction(0);
    setOpenmodulosalirAction(false);
    setStepperAction(1);
  }

  nuevaFuncion = () => {
    const { setStepperaddmoduloAction } = this.props;
      setStepperaddmoduloAction(true);
  }

  verDetalleModulo=(idFila,activo) =>{
    const { setStepperAction,setTextfieldmoduloTextAction,
      setIdmoduloAction,setTextfielddescripcionTextAction,filterData,setModulosdisableAction,setNombreSinActualizarAction } = this.props;

    let datosModulos = filterData.filter((datosModulos) => 
      datosModulos.ModuloId== idFila);
    if(!activo){
      setModulosdisableAction(true);
    }
    
    setNombreSinActualizarAction(datosModulos[0].NombreModulo);
    setTextfieldmoduloTextAction(datosModulos[0].NombreModulo);
    setTextfielddescripcionTextAction(datosModulos[0].Descripcion);
    setIdmoduloAction(datosModulos[0].ModuloId);
    setStepperAction(1);
  }

  verDetalleFuncion=(idFila) =>{
    const { setStepperaddmoduloAction,setSelectedAction,setActualizaAction,
      setModalfuncionesdisableAction } = this.props;
    if(idFila!=null){
      setSelectedAction([idFila]);
      setModalfuncionesdisableAction(true);
      setActualizaAction(true);
      setStepperaddmoduloAction(true);
    }
  }

  actualizar = (idFila) => {
    const { setStepperAction,setSelectedAction,setIdAction,setOpenmodulosalirAction,
      setTextfieldGrupoAction,setTextfieldDiasAction } = this.props;
    
    if(idFila!=null){
      setSelectedAction([idFila]);
      
      setStepperAction(1);
      setIdAction(idFila);
      setOpenmodulosalirAction(false);

    }
  }


  handleActivarInactivar = () => {
    const { 
      selected,
      setListadoActivarAction,
      setListadoDesactivarAction,
      activarRegistros,
      stepper,
      setListadoDesactivarFuncionesAction,
      setListadoActivarFuncionesAction,
    } = this.props;
    
    // Validar para activar/desactivar multiples registros o eliminar un registro 
    if(activarRegistros === 1) {
      if(stepper===0){
        setListadoActivarAction(selected);
      }else if(stepper===1){
        setListadoActivarFuncionesAction(selected);
      }
    } else if (activarRegistros === 0) {
      if(stepper===0){
        setListadoDesactivarAction(selected);
      }else if(stepper===1){
        setListadoDesactivarFuncionesAction(selected);
      }
    }
    this.handleToggleModal();
  }

  handleActivarRegistros = (value = null, idFila = null) => {

    const { setActivarRegistrosAction, setSelectedAction } = this.props;

    // Validar para selección multiple
    if(value === 1){
      textoModal = '¿Está seguro que desea activar los registros seleccionados?';
      setActivarRegistrosAction(value);
    } else if (value === 0){
      textoModal = '¿Está seguro que desea inactivar los registros seleccionados?';
      setActivarRegistrosAction(value);
    } else {
      textoModal = '¿Está seguro que desea eliminar el registro seleccionado?';
    }

    // Validar para eliminar un registro
    if(idFila !== null){
      setSelectedAction([idFila]);
      setActivarRegistrosAction(0);
    }

    this.handleToggleModal();
  }

  handleDownload = (id) => {
    const { getDownloadFileAction, setLoadingAction } = this.props;
    setLoadingAction(true);
    getDownloadFileAction(id);
  }

  handleMultipleDownload = () => {
    const { getDownloadFilesAction, selected, setLoadingAction } = this.props;
    setLoadingAction(true);
    getDownloadFilesAction(selected);
  }

  handleCancelarActivarInactivar = () => {
    const { setSelectedAction } = this.props;
    setSelectedAction([]);
    this.handleToggleModal();
  }
  
  render() {
    const {
      filterData,
      order,
      orderBy,
      selected,
      rowsPerPage,
      rowsPerPageOptions,
      page,
      classes,
      rows,
      open,
      openSearch,
      openModal,
      searchText,
      openMenuContextual,
      download,
      loading,
      idFila,
      stepper,
      soloId,
      onEditar,
      moduloSoloLectura,
      permisos,
    } = this.props;
    const isSelected = id => selected.indexOf(id) !== -1;
    
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length}
          open={open}
          handleToggle={this.handleToggle}
          handleMenuFiltros={this.handleMenuFiltros}
          handleSearchText={this.handleSearchText}
          openSearch={openSearch}
          searchText={searchText}
          handleToggleSearch={this.handleToggleSearch}
          handleToggleMenuContextual={this.handleToggleMenuContextual}
          openMenuContextual={openMenuContextual}
          handleStepper={this.handleStepper}
          nuevaFuncion ={this.nuevaFuncion}
          handleToggleModal={this.handleToggleModal}
          handleActivarRegistros={this.handleActivarRegistros}
          stepper={stepper}
          download={download}
          handleMultipleDownload={this.handleMultipleDownload}
          moduloSoloLectura={moduloSoloLectura}
          permisos={permisos}
        />
        <div className={classes.tableWrapper}>
          {
            loading && <Loading />
          }
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rows={rows}
              rowCount={filterData.length}
              
            />
            <TableBody>
              {filterData.length > 0 ? stableSort(filterData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {   

                  const seleccionado = isSelected(n[idFila]);

                  // Validar para mostrar el campo de la tabla
                  const keys = rows.filter(row => (typeof row.show === 'undefined' || row.show === 'true')).map(row => row.id)
                  const tableCells = () => keys.map((item, indexKey) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TableCell key={`cell-${indexKey}`} align="left" padding="none">
                      {
                        // eslint-disable-next-line no-nested-ternary
                        n[item] === true 
                          ? 'Activo'
                          : n[item] === false
                            ? 'Inactivo'
                            : n[item] 
                      }
                    </TableCell>
                  ))

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={seleccionado}
                      tabIndex={-1}
                      key={uniqueId('row_')}
                      selected={seleccionado}
                      
                    >
                      <TableCell padding="checkbox">
                        <Checkbox 
                          checked={seleccionado}
                          onClick={event => this.handleClick(event, n[idFila])}
                        />
                      </TableCell>
                      {
                        tableCells()
                      }
                      <TableCell align="left" padding="none">
                        { selected.length < 2 &&
                          (
                            <div className="DataTableopciones">
                              { download === true &&
                              <Tooltip
                                title="Descargar"
                                placement="bottom"
                              >
                                <IconButton aria-label="Descargar" onClick={() => this.handleDownload(n[idFila])}> 
                                  <img src={DownloadIcon} style={{width: 16}} alt="Descargar" />
                                </IconButton>
                              </Tooltip>
                              }
                              
                              
                              { permisos.normales.editar === 1 ?
                                <Tooltip
                                  title="Editar"
                                  placement="bottom"
                                >
                                  <IconButton aria-label="Editar" onClick={()=>this.actualizar(n[idFila])}>
                                    <img src={EditIconModulo} style={{width: 16}} alt="Editar" />                                  
                                  </IconButton>
                                </Tooltip>
                                :null
                              } 
                              { permisos.normales.eliminar === 1 && n.Activo ?
                                <Tooltip
                                  title="Eliminar"
                                  placement="bottom"
                                >
                                  <IconButton aria-label="Eliminar" onClick={() => this.handleActivarRegistros(null, n[idFila])}> 
                                    <img src={DeleteIcon} style={{width: 16}} alt="Borrar" />
                                  </IconButton>
                                </Tooltip>
                                :null
                              } 
                            </div>
                          )
                        }
                      </TableCell>
                    </TableRow>
                  );
                }) : 
                <TableRow style={{ height: 49 }}>
                  <TableCell colSpan={6}>
                    <React.Fragment>
                      <img
                        key="Sin resultados"
                        src={SinResultados}
                        style={{ width:'150px',height: '150px', display: 'block', margin: '0 auto'}}
                        alt="¡No se encontraron coincidencias! Sin resultados obtenidos."
                      /><div style={{textAlign:'center'}}>¡No se encontraron coincidencias! Sin resultados obtenidos.</div>
                    </React.Fragment>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={filterData.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage='Registros por tabla'
          labelDisplayedRows={this.handleEtiquetasFilas}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          disabled={moduloSoloLectura}
        />
        <Modal 
          open={openModal}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message={textoModal}
          onClickAccept={() => this.handleActivarInactivar() }
          onClickCancel={() => this.handleCancelarActivarInactivar() }
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  setListadoFilterAction: PropTypes.func.isRequired,
  setSelectedAction: PropTypes.func.isRequired,
  setOpenSearchAction: PropTypes.func.isRequired,
  setSearchTextAction: PropTypes.func.isRequired,
  setOpenFilterAction: PropTypes.func.isRequired,
  setOpenMenuContextualAction: PropTypes.func.isRequired,
  setOpenModalAction: PropTypes.func.isRequired,
  setOrderAction: PropTypes.func.isRequired,
  setOrderByAction: PropTypes.func.isRequired,
  setPageAction: PropTypes.func.isRequired,
  setRowsPerPageAction: PropTypes.func.isRequired,
  setStepperAction: PropTypes.func.isRequired,
  nuevaFuncion: PropTypes.func,
  setActualizaAction: PropTypes.func,
  setListadoActivarAction: PropTypes.func.isRequired,
  setListadoDesactivarAction: PropTypes.func.isRequired,
  setActivarRegistrosAction: PropTypes.func.isRequired,
  getDownloadFileAction: PropTypes.func,
  getDownloadFilesAction: PropTypes.func,
  setLoadingAction: PropTypes.func,
  idFila: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  filterData: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  openSearch: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired,
  openModal: PropTypes.bool.isRequired,
  openMenuContextual: PropTypes.bool.isRequired,
  download: PropTypes.bool,
  loading: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  rowsPerPageOptions: PropTypes.array.isRequired,
  soloId: PropTypes.bool,
  onEditar: PropTypes.func,
  setIdAction:PropTypes.func,
  setOpenmodulosalirAction:PropTypes.func,
  permisos:PropTypes.object,
  setTextfieldGrupoAction:PropTypes.func,
  setTextfieldDiasAction:PropTypes.func,
};

EnhancedTable.defaultProps = {
  loading: false,
}

export default withStyles(styles)(EnhancedTable);