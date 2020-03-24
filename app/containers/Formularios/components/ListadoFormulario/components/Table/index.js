import React from 'react';
import isNull from 'lodash/isNull';
import T from 'prop-types';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  TextField,
  withStyles,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import OpcionIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/ControlPoint';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import DeleteIcon from 'images/iconos/deleteButtonListGrey.png';
import EditIcon from 'images/iconos/editButtonListGrey.png';
import isEmpty from 'lodash/isEmpty';
import Dialog from "../Modal/alertDialog";

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
  return order === 'asc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


const EnhancedTableHead = props => {

  const { onSelectAllClick, numSelected, rowCount, headers } = props;
  const paddingType = (disPandding) => disPandding===true ? "none" : "default";

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            style={{color:'#28950f'}}
          />
        </TableCell>
        {headers.map(
          (row) => (
            <TableCell
              align={row.align}
              style={{color: "#000000", minWidth: '300px'}}
              padding={paddingType(row.disablePadding)}
              key={row.id}
            >
              {row.label}

            </TableCell>
          ),
          this,
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: T.number.isRequired,
  onSelectAllClick: T.func.isRequired,
  rowCount: T.number.isRequired,
  headers: T.array,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 50%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  menus: {
    maxHeight: 300,
  },
});

let EnhancedTableToolbar = props => {
  const {
    numSelected,
    classes,
    onClickSearch,
    selectSearch,
    onChangeTextSearch,
    textPut,
    menuFilters,
    anchorElFilter,
    handleClickFilt,
    handleCloseFilt,
    onClickFilterList,
    refreshData,
    anchorElOption,
    handleClickOpt,
    handleCloseOpt,
    menuOptions,
    handleStepGoNextAction,
    onClickOption,
    functionUpdate,
    modalChangeStatusChecks,
    showModalOptions,
    optionSelected,
    closeModalOptions,
    onClickModalOptions,
  } = props;

  const cp = {
    buttonSearch: {
      onClick: onClickSearch,
      align: "bottom",
      ...(numSelected > 0 ? {disabled: true} : {}),
    },
  }

  const buttonSearch = selectSearch && numSelected === 0 ? <ClearIcon/> : <SearchIcon/>;
  const tooltipSearch = selectSearch ? "Limpar" : "Buscar";
  const showTextSearch = selectSearch ? "visible" : "hidden";
  const openMenuFilter = Boolean(anchorElFilter);
  const openMenuOption = Boolean(anchorElOption);

  return (
    <Toolbar
    >
      <div className={classes.spacer} />
      {/* <div className={classes.actions}> */}
      <div>
        <TextField
          id="standard-search"
          label="Buscar"
          type="search"
          className={classes.textField}
          maxLength="5"
          style={{marginTop: 0, width: 300, visibility: showTextSearch}}
          {...(numSelected > 0 ? {disabled: true} : {})}
          onChange={(event) => onChangeTextSearch(event.target.value)}
          value={textPut}
          autoFocus
        />
        <Tooltip title={tooltipSearch} >
          <IconButton {...cp.buttonSearch}>
            {buttonSearch}
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Filtro">
          <IconButton
            aria-label="Filter list"
            aria-owns={openMenuFilter ? 'filter-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClickFilt}
            {...(numSelected > 0 ? {disabled: true} : {})}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="filter-menu"
          className={classes.menus}
          anchorEl={anchorElFilter}
          open={openMenuFilter}
          onClose={handleCloseFilt}
        >
          {menuFilters.map(option => (
            <MenuItem
              key={option}
              onClick={() => onClickFilterList(refreshData, option === 'Activos' ? 'A' : 'I')}
            >
              {option ==='Activos' ? <CheckCircleIcon style={{color:'#28950f'}} /> : <DeleteForeverIcon style={{color:'#ff0023'}}/>}
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <div>
        <Tooltip title="Nuevo">
          <IconButton onClick={event => handleStepGoNextAction(event)}>
            <AddIcon/>
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Opciones">
          <IconButton
            aria-label="Option list"
            aria-owns={openMenuOption ? 'option-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClickOpt}
            {...(numSelected === 0 ? {disabled: true} : {})}
          >
            <OpcionIcon/>
          </IconButton>
        </Tooltip>
        <Menu
          id="option-menu"
          className={classes.menus}
          anchorEl={anchorElOption}
          open={openMenuOption}
          onClose={handleCloseOpt}
        >
          {menuOptions.map(option => (
            <MenuItem
              key={option}
              onClick={() => option ==='Activar' ? onClickOption(functionUpdate, true) : showModalOptions(option === 'Activar')}
            >
              {option ==='Activar' ? <CheckCircleIcon style={{color:'#28950f'}} /> : <DeleteForeverIcon style={{color:'#ff0023'}}/>}
              {option}
            </MenuItem>
          ))}
        </Menu>
        {!optionSelected ?
          <Dialog
            open={Boolean(modalChangeStatusChecks)}
            typeAlert='Report'
            typeOptions='Select'
            title='Eliminar Formulario.'
            message='¿Está seguro que desea eliminar los registros seleccionados?'
            onClickAccept={() => onClickModalOptions(() => onClickOption(functionUpdate, optionSelected))}
            onClickCancel={() => closeModalOptions()}
            handleCloseModal={() => closeModalOptions()}
          /> : null}
      </div>
    </Toolbar>
  );
};


EnhancedTableToolbar.propTypes = {
  classes: T.object.isRequired,
  numSelected: T.number.isRequired,
  onClickSearch: T.func.isRequired,
  selectSearch: T.bool,
  onChangeTextSearch: T.func,
  textPut: T.string,
  menuFilters: T.array,
  anchorElFilter: T.object,
  handleClickFilt: T.func,
  handleCloseFilt: T.func,
  anchorElOption: T.object,
  handleClickOpt: T.func,
  handleCloseOpt: T.func,
  onClickFilterList: T.func,
  refreshData: T.func,
  menuOptions: T.array,
  handleStepGoNextAction: T.func,
  onClickOption: T.func,
  functionUpdate: T.func,
  modalChangeStatusChecks: T.bool,
  showModalOptions: T.func,
  optionSelected: T.bool,
  closeModalOptions: T.func,
  onClickModalOptions: T.func,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '98.5%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: 10,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
    minHeight: 300,
  },
  rows: {
    maxHeight: 40,
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'nombre',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    rowIdHover: '',
    anchorElFilter: null,
    anchorElOption: null,
    filterList: 'A',
    modalChangeStatusChecks: false,
    optionSelected: false,
  };

  handleClickFilt = event => {
    this.setState({ anchorElFilter: event.currentTarget });
  };

  handleCloseFilt = () => {
    this.setState({ anchorElFilter: null });
  };

  handleClickOpt = event => {
    this.setState({ anchorElOption: event.currentTarget });
  };

  handleCloseOpt = () => {
    this.setState({ anchorElOption: null });
  };

  handleSelectAllClick = (event, dataTable) => {
    if (event.target.checked) {
      this.setState(() => ({ selected: dataTable.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
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

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;




  showModalOptions= (option) => this.setState({ modalChangeStatusChecks: true, optionSelected: option });

  closeModalOptions = () => {
    this.handleCloseOpt();
    this.setState({ modalChangeStatusChecks: false });
  }

  onClickModalOptions = (action) => {
    this.handleCloseOpt();
    action();
    this.closeModalOptions();
  }

  showButtonsInRow = (id, fechaPublicacion = null) => {
    const {
      selected,
      rowIdHover,
    } = this.state;
    const {
      onClickEditItem,
      onClickDeleteItem,
    } = this.props;
    let resp;

    if(selected.length === 0 && rowIdHover.length > 0 && id === rowIdHover) {
      resp = (
        <div>
          {isNull(fechaPublicacion) && (
            <Tooltip title="Editar">
              <IconButton
                onClick={onClickEditItem(id)}
              >
                <img
                  src={EditIcon}
                  style={{ width:'15px',height: '15px'}}
                  alt="logo-Pfd"
                />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Desactivar">
            <IconButton onClick={onClickDeleteItem(id)}>
              <img
                src={DeleteIcon}
                style={{ width:'15px', height: '15px'}}
                alt="logo-Pfd"
              />
            </IconButton>
          </Tooltip>          
        </div>
      )
    } else {
      resp = null;
    }
    return resp
  }

  rowWithMouse = (id) => this.setState({ rowIdHover: id });

  cleanRow = () => this.setState({ rowIdHover: '' });

  searchData = (data = [], columns = [], sentence) => {
    let search = false;
    
    const newData = data.filter(items => {
      let find = false;
      Object.keys(items).forEach(n => {
        search = (columns.some(c => c.toUpperCase() === n.toString().toUpperCase()))
        if(search){
          if(items[n].toString().toUpperCase().indexOf(sentence.toUpperCase()) >= 0 ) find = true;
        }
      })
      return find;
    });

    return newData;
  }

  onClickFilter = (onClickFilterList, val) => {
    onClickFilterList(val);
    this.setState({ filterList: val });
    this.handleCloseFilt();
  }

  onClickOption = (requestUpdateStatusFormsList, val) => {
    const { selected, filterList } = this.state;
    const cantSelected = selected.length;
    const idsSelected = [];

    for(let i = 0; i < cantSelected; i += 1) {
      idsSelected[i] = ({"_id": selected[i]});
    }

    const bodyRequest = {
      "arrayParams": idsSelected,
      "values": { "estatus": val },
    }

    if(selected.length > 0) requestUpdateStatusFormsList(bodyRequest, filterList);

    this.setState({selected: []});
    this.handleCloseOpt();
  }

  
  render() {

    const {
      classes,
      selectSearch,
      data,
      onClickShearchAccion,
      onChangeTextSearch,
      headers,
      textSearch,
      menuFilters,
      onClickFilterList,
      menuOptions,
      handleStepGoNextAction,
      requestUpdateStatusFormsList,
      onAcceptDeleteForm,
      onClickCancelDelete,
      openDeleteModal,
    } = this.props;
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      anchorElFilter,
      anchorElOption,
      modalChangeStatusChecks,
      optionSelected,
    } = this.state;
    const dataTable = (this.searchData(data, ['nombreFormulario'],textSearch));
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const showDetail = !isEmpty(dataTable) ? (<TableBody>
      {stableSort(dataTable, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(n => {
          const isSelected = this.isSelected(n.id);
          return (
            <TableRow
              className={classes.rows}
              hover
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={-1}
              key={n.id}
              selected={isSelected}
              onMouseEnter={() => this.rowWithMouse(n.id)}
              onMouseLeave={() => this.cleanRow()}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  onClick={event => this.handleClick(event, n.id)}
                  checked={isSelected}
                  style={{color:'#28950f'}}
                />
              </TableCell>
              <TableCell align="left">{n.nombreDepartamento}</TableCell>
              <TableCell align="left">{n.nombreFormulario}</TableCell>
              <TableCell align="right">{n.estatus}</TableCell>
              <TableCell align="right" style={{width:203}}>
                {this.showButtonsInRow(n.id, n.fechaPublicacion)}
              </TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 49 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>)
      :
      (<TableBody>
        <TableRow style={{ height: 245 }}>
          <TableCell colSpan={6} align="center" style={{ color:'#757575', fontSize: '1.5rem' }}>
            Sin resultados obtenidos
          </TableCell>
        </TableRow>
      </TableBody>);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onClickSearch={onClickShearchAccion}
          selectSearch ={selectSearch}
          onChangeTextSearch={onChangeTextSearch}
          textPut={textSearch}
          menuFilters={menuFilters}
          handleClickFilt={event => this.handleClickFilt(event)}
          handleCloseFilt={this.handleCloseFilt}
          onClickFilterList={this.onClickFilter}
          refreshData={onClickFilterList}
          anchorElFilter={anchorElFilter}
          anchorElOption={anchorElOption}
          menuOptions={menuOptions}
          handleClickOpt={event => this.handleClickOpt(event)}
          handleCloseOpt={this.handleCloseOpt}
          handleStepGoNextAction={handleStepGoNextAction}
          onClickOption={this.onClickOption}
          functionUpdate={requestUpdateStatusFormsList}
          modalChangeStatusChecks={modalChangeStatusChecks}
          showModalOptions={this.showModalOptions}
          optionSelected={optionSelected}
          closeModalOptions={this.closeModalOptions}
          onClickModalOptions={this.onClickModalOptions}
          onClickConfirmDelete={onAcceptDeleteForm}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              dataTable={dataTable}
              onSelectAllClick={event => this.handleSelectAllClick(event, dataTable)}
              rowCount={dataTable.length}
              headers={headers}
            />
            {showDetail}
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataTable.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage='Registros por Pagina'
          page={page}
          backIconButtonProps={{
            'aria-label': 'Pagina Anterior',
          }}
          nextIconButtonProps={{
            'aria-label': 'Pagina Siguiente',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <Dialog
          open={openDeleteModal}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message='¿Está seguro que desea eliminar el registro seleccionado?'
          onClickAccept={onAcceptDeleteForm}
          onClickCancel={onClickCancelDelete}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: T.object.isRequired,
  selectSearch: T.bool,
  data: T.array,
  onAcceptDeleteForm: T.func,
  onClickShearchAccion: T.func,
  onChangeTextSearch: T.func,
  headers: T.array,
  textSearch: T.string,
  menuFilters: T.array,
  onClickFilterList: T.func,
  menuOptions: T.array,
  handleStepGoNextAction: T.func,
  requestUpdateStatusFormsList: T.func,
  onClickEditItem: T.func,
  onClickCancelDelete: T.func,
  onClickDeleteItem: T.func,
  openDeleteModal: T.bool,
};

export default withStyles(styles)(EnhancedTable);