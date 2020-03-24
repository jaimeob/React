import React from "react";
import T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
// import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import ActiveIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteIcon from 'images/iconos/deleteButtonListGrey.png';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import EditIcon from 'images/iconos/editButtonListGrey.png';
import EditIcon from 'images/iconos/redirigir.svg';

import FilterListIcon from "@material-ui/icons/FilterList";
// import ErrorOutLineIcon from "@material-ui/icons/ErrorOutline";
// import { lighten } from "@material-ui/core/styles/colorManipulator";
import {
  TrendingDown,
  TrendingFlat,
  TrendingUp,
} from '@material-ui/icons';
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import OpcionIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/ControlPoint";
import {
  green,
  red,
  grey,
  yellow,
} from "@material-ui/core/colors";
// import BlueColor from "@material-ui/core/colors/blue";
import { Grid } from "@material-ui/core";
import SinResultados from 'images/iconos/EmptySinRegistrosbueno.svg';

// const desc = (a, b, orderBy) => {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// const stableSort = (array, cmp) => {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = cmp(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }

// const getSorting = (order, orderBy) =>
//   order === "desc"
//     ? (a, b) => desc(a, b, orderBy)
//     : (a, b) => -desc(a, b, orderBy);

const useToolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(1),
  },
  // highlight:
  //   theme.palette.type === "light"
  //     ? {
  //         color: theme.palette.secondary.main,
  //         backgroundColor: lighten(theme.palette.secondary.light, 0.85)
  //       }
  //     : {
  //         color: theme.palette.text.primary,
  //         backgroundColor: theme.palette.secondary.dark
  //       },
  textField: {
    width: 250,
  },
  menus: {
    maxHeight: 300,
  },
});
// hastasjkdajdfbkalfbk fdjf
// asdfa
let EnhancedTableToolbar = props => {
  // const classes = useToolbarStyles();
  // variables
  const {
    classes,
    titleTable,
    activeSearch,
    numSelected,
    searchText,
    menuFilterIndex,
    menuFilters,
    anchorElFilter,
    menuOptions,
    anchorElOption,
    selected,
    showNew,
    showFilter,
    showOption,
    permisos,
  } = props;
  // funciones
  const {
    onClickSearch,
    onChangeTextSearch,
    handleClickFilt,
    handleCloseFilt,
    handleClickOpt,
    handleCloseOpt,
    onClickFilterList,
    onClickUpdateRow,
    onClickNew,
  } = props;

  const buttonSearch = activeSearch /* && numSelected === 0 */ ? <ClearIcon/> : <SearchIcon/>;
  const tooltipSearch = activeSearch ? "Limpar" : "Buscar";
  const showTextSearch = activeSearch ? "visible" : "hidden";
  const openMenuFilter = Boolean(anchorElFilter);
  const openMenuOption = Boolean(anchorElOption);

  return (
    <Toolbar
      className={classes.root}
    >
      <Grid item xs={5}>
        <Grid container justify="flex-start">
          <Typography variant="h6" id="tableTitle">
            {titleTable}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <Grid container justify="flex-end">
          <TextField
            id="standard-search"
            label="Buscar"
            type="search"
            value={searchText}
            className={classes.textField}
            inputProps={{maxLength: 30}}
            style={{visibility:showTextSearch}}
            autoFocus
            onChange={(event) => onChangeTextSearch(event.target.value)}
          />
          <Tooltip disableFocusListener title={tooltipSearch}>
            <IconButton
              onClick={onClickSearch}
            >
              {buttonSearch}
            </IconButton>
          </Tooltip>
          {showFilter ?
            <div>
              <Tooltip title="Filtrar" disableFocusListener>
                <span>
                  <IconButton
                    aria-label="Filter list"
                    aria-owns={openMenuFilter ? 'filter-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleClickFilt}
                    {...(numSelected > 0 ? {disabled: true} : {})}
                  >
                    <FilterListIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Menu
                id="filter-menu"
                className={classes.menus}
                anchorEl={anchorElFilter}
                open={openMenuFilter}
                onClose={handleCloseFilt}
              >
                {menuFilters.map((option, index) => (
                  <MenuItem
                    key={option}
                    onClick={() => {
                      onClickFilterList({
                        state: option,
                        newIndex: index,
                        index: menuFilterIndex,
                      });
                      handleCloseFilt()
                    }}
                  >
                    {option.toUpperCase() === 'ACTIVO' ?
                      <CheckCircleIcon style={{color: green[500]}}/>
                      :
                      <DeleteForeverIcon style={{color: red[500]}}/>
                    }
                    <span style={{padding: '0 16px'}}>{option}</span>
                  </MenuItem>
                ))}
              </Menu>
            </div>
            :
            null
          }
          {showNew && permisos.normales.registrar === 1 ? 
            <Tooltip title="Nuevo" disableFocusListener>
              <IconButton
                onClick={onClickNew}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            :
            null
          }
          {showOption && (permisos.especiales.activar === 1 || permisos.normales.eliminar === 1) ?
            <div>
              <Tooltip title="Opciones" disableFocusListener>
                <span>
                  <IconButton
                    aria-label="Option list"
                    aria-owns={openMenuOption ? 'option-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleClickOpt}
                    {...(numSelected === 0 ? {disabled: true} : {})}
                  >
                    <OpcionIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Menu
                id="option-menu"
                className={classes.menus}
                anchorEl={anchorElOption}
                open={openMenuOption}
                onClose={handleCloseOpt}
              >
                {
                  /*
                  menuOptions.map(option => (
                  <MenuItem
                    key={option}
                    onClick={() => {
                      if ((option.toUpperCase() === 'ACTIVAR' && menuFilterIndex === 1) ||
                          (option.toUpperCase() === 'DESACTIVAR' && menuFilterIndex === 0)
                      ){
                        onClickUpdateRow({
                          type: 'option',
                          rows: selected,
                          state: option,
                          dialog: 'showDialogDelete',
                          menuFilterIndex,
                        });
                      }
                      handleCloseOpt();
                    }}
                  >
                    {option ==='Activar' ?
                      <CheckCircleIcon style={{color: green[500]}}/>
                      :
                      <DeleteForeverIcon style={{color: red[500]}}/>
                    }
                    <span style={{padding: '0 16px'}}>{option}</span>
                  </MenuItem>
                ))
                */
                }
                {
                  permisos.especiales.activar === 1 ? (
                    <MenuItem
                      onClick={() => {
                        if (menuFilterIndex === 1 || menuFilterIndex === 0){
                          onClickUpdateRow({
                            type: 'option',
                            rows: selected,
                            state: 'Activar',
                            dialog: 'showDialogDelete',
                            menuFilterIndex,
                          });
                        }
                        handleCloseOpt();
                      }}
                    >
                      <ActiveIcon style={{color:green[700]}} />
                      Activar
                    </MenuItem>
                  ) : null
                }
                {
                  permisos.normales.eliminar === 1 ? (
                    <MenuItem
                      onClick={() => {
                        if (menuFilterIndex === 1 || menuFilterIndex === 0){
                          onClickUpdateRow({
                            type: 'option',
                            rows: selected,
                            state: 'Desactivar',
                            dialog: 'showDialogDelete',
                            menuFilterIndex,
                          });
                        }
                        handleCloseOpt();
                      }}
                    >
                      <ActiveIcon style={{color:red[700]}} />
                      Desactivar
                    </MenuItem>
                  ) : null
                }
              </Menu>
            </div>
            :
            null
          }
        </Grid>
      </Grid>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: T.object.isRequired,
  titleTable: T.string,
  activeSearch: T.bool,
  onClickSearch: T.func,
  searchText: T.string,
  onChangeTextSearch:T.func,
  numSelected: T.number.isRequired,
  menuFilterIndex: T.number,
  menuFilters: T.array,
  anchorElFilter: T.object,
  handleClickFilt: T.func,
  handleCloseFilt: T.func,
  menuOptions: T.array,
  anchorElOption: T.object,
  handleClickOpt: T.func,
  handleCloseOpt: T.func,
  onClickFilterList: T.func,
  selected: T.array,
  onClickUpdateRow: T.func,
  onClickNew: T.func,
  showNew: T.bool,
  showFilter: T.bool,
  showOption: T.bool,
};

EnhancedTableToolbar = withStyles(useToolbarStyles)(EnhancedTableToolbar);


const EnhancedTableHead = props => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    columns,
    // onRequestSort,
    showChecks,
  } = props;
  // const createSortHandler = property => event => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow>
        {showChecks ?
          <TableCell padding="checkbox">
            <Checkbox
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              style={{ color: green[800] }}
            />
          </TableCell>
          :
          null
        }
        {columns.map(
          row => (
            <TableCell
              key={row.id}
              align={row.direction}
              padding={row.disablePadding ? "none" : "default"}
              sortDirection={orderBy === row.id ? order : false}
              style={{fontSize: 12}}

            >
              {row.label}
            </TableCell>
          ),
          this
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  columns: T.array.isRequired,
  numSelected: T.number.isRequired,
  // onRequestSort: T.func.isRequired,
  onSelectAllClick: T.func.isRequired,
  order: T.string.isRequired,
  orderBy: T.string.isRequired,
  rowCount: T.number.isRequired,
  showChecks: T.bool,
};

const useStyles = theme => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing(3),
    marginTop: theme.spacing.unit * 3,
  },
  paper: {
    width: "100%",
    minHeight: 409,
    // marginBottom: theme.spacing(2),
    // marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
    '& th': {
      position: 'sticky',
      top: 0,
      background: 'white',
    },
    minHeight: '300px',
    // paddingRight: theme.spacing.unit * 2,
    // paddingLeft: theme.spacing.unit * 2,
  },
  tableWrapper: {
    width: '100%',
    maxHeight: 345,
    overflowY: "auto",
  },
  empty: {
    color: grey[500],
  },
});

// const EnhancedTable = props => {
class EnhancedTable extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'Nombre',
    page: 0,
    rowsPerPage: this.props.rowsPerPage || 5,
    rowIdHover: -1,
    anchorElFilter: null,
    anchorElOption: null,
  };

  searchData = (data = [], columns = [], sentence) => {
    let search = false;

    const newData = data.filter(items => {
      let find = false;
      Object.keys(items).forEach(n => {
        search = (columns.some(c => c.toUpperCase() === n.toString().toUpperCase()))
        if(search){
          if(items[n].toString().toUpperCase().indexOf(sentence.toUpperCase()) >= 0 )
            find = true;
        }
      })
      return find;
    });

    return newData;
  }

  handleSelectAllClick(event, dataTable, onClickCheck) {
    if (event.target.checked) {
      const newSelected = dataTable.map(n => n);
      onClickCheck(newSelected);
      return;
    }
    onClickCheck([]);
  }

  handleClick(event, row, onClickCheck, selected) {
    const newSelected = selected.map(n => n);

    if(event.target.checked){
      newSelected.push(row);
    } else {
      const indexArray = newSelected.findIndex(arr => arr.id === row.id);
      newSelected.splice(indexArray, 1);
    }

    onClickCheck(newSelected);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  rowWithMouse = (id) => this.setState({ rowIdHover: id });

  cleanRow = () => this.setState({ rowIdHover: -1 });

  showButtonsInRow = (rowSelect, onClickUpdateRow, selected, onClickEditItem) => {
    const {
      rowIdHover,
    } = this.state;
    const {
      menuFilterIndex,
    } = this.props;
    let resp;
    const labelEstatus =  menuFilterIndex === 0 ? "Eliminar" : "Activar";

    const propDelete = {
      color: grey[500],
      width:'15px',
      height: '15px',
    }
  
    if(selected.length === 0 && rowSelect.Id === rowIdHover) {
      resp = (
        <div>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => onClickEditItem(rowSelect)}
            >
              <img
                src={EditIcon}
                style={{ width:'15px',height: '15px'}}
                alt="logo-Pfd"
              />
            </IconButton>
          </Tooltip>
          {
            this.props.permisos.normales.eliminar === 1 && rowSelect.Estatus === 'Activo' ? (
              <Tooltip title={labelEstatus} disableFocusListener>
                <IconButton
                  onClick={() => onClickUpdateRow({
                    type: 'button',
                    rows: [rowSelect],
                    state: menuFilterIndex === 0 ? "Desactivar" : "Activar",
                    dialog: 'showDialogDelete',
                    menuFilterIndex}
                  )}
                >
                  {menuFilterIndex === 0 ?
                    <img
                      src={DeleteIcon}
                      style={{ width:'15px',height: '15px'}}
                      alt="logo-Pfd"
                    />
                    :
                    <CheckCircleIcon style={{...propDelete}}/>
                  }
                </IconButton>
              </Tooltip>
            ) : null
          }
          {
            this.props.permisos.especiales.activar === 1 &&  rowSelect.Estatus === 'Inactivo' ? (
              <Tooltip title={labelEstatus} disableFocusListener>
                <IconButton
                  onClick={() => onClickUpdateRow({
                    type: 'button',
                    rows: [rowSelect],
                    state: menuFilterIndex === 0 ? "Desactivar" : "Activar",
                    dialog: 'showDialogDelete',
                    menuFilterIndex}
                  )}
                >
                  {menuFilterIndex === 0 ?
                    <img
                      src={DeleteIcon}
                      style={{ width:'15px',height: '15px'}}
                      alt="logo-Pfd"
                    />
                    :
                    <CheckCircleIcon style={{...propDelete}}/>
                  }
                </IconButton>
              </Tooltip>
            ) : null
          }
        </div>
      )
    } else {
      resp = null;
    }
    return resp
  }

  showIconPorcent = (propName, value) => {
    if (propName ==='Porcentaje') {
      if(value > 0){
        return <TrendingUp style={{color: green[700], width: 15, height: 15}}/>
      }
      if(value < 0){
        return <TrendingDown style={{color: red[700], width: 15, height: 15}}/>
      }
      return <TrendingFlat style={{color: yellow[700], width: 15, height: 15}}/>
    }
    return null;
  }

  showDetail = (columns, row, isItemSelected, onClickUpdateRow, showActions, showChecks, onClickCheck, selected, onClickEditItem) =>
    <TableRow
      hover
      // onClick={event => this.handleClick(event, row.Id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={`row_${row.Id}`}
      selected={isItemSelected}
      onMouseEnter={() => this.rowWithMouse(row.Id)}
      onMouseLeave={() => this.cleanRow()}
    >
      {showChecks ?
        <TableCell padding="checkbox">
          <Checkbox
            style={{ color: green[800] }}
            checked={isItemSelected}
            onClick={event => this.handleClick(event, row, onClickCheck, selected)}
          />
        </TableCell>
        :
        null
      }
      {
        Object.keys(row).map(propName => {
          if(columns.some( col => col.id === propName )) {
            return <TableCell
              key={`cel_${row.Id}_${propName}`}
              scope="row"
              padding="default"
              align={columns.find( col => col.id === propName).direction}
              style={{fontSize: 11}}
            >
              {this.showIconPorcent(propName, row[propName])}
              {columns.find( col => col.id === propName).direction === 'right' ?
                row[propName].toLocaleString('es-MX', { style:'currency', currency:'MXN', minimumFractionDigits: 0, maximumFractionDigits: 2})
                :
                row[propName]
              }
            </TableCell>
          }
          return null;
        })
      }
      {showActions ?
        <TableCell align="right" style={{width:203}}>
          {this.showButtonsInRow(row, onClickUpdateRow, selected, onClickEditItem)}
        </TableCell>
        :
        null
      }
      
    </TableRow>
  
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

  // isSelected = id => this.props.selected.indexOf(id) !== -1;
  isSelected = id => this.props.selected.some(row => row.Id === id);

  // handleClickAccept = (clickAcceptList, selected, action) =>
  //   clickAcceptList ? action({selected}) : null

  showMessageEmpty = (classes, rows, emptyRows, progress, cantColumns) =>
    rows.length <= 0 ?
      <TableBody>
        <TableRow style={{ height: 49 * emptyRows }}>
          {progress ?
            <TableCell colSpan={cantColumns} align='center'>
              <Typography variant="h6" className={classes.empty}>
                Cargando Datos...
              </Typography>
            </TableCell>
            :
            <TableCell colSpan={cantColumns} align='center'>
              <img
                key="imagenKey"
                src={SinResultados}
                style={{ width:'200px',height: '175px'}}
                alt="logo-Pfd"
              />
              <span style={{display: 'block'}}>¡No se encontraron coincidencias! Sin resultados obtenidos.</span>              
            </TableCell>
          }
        </TableRow>
      </TableBody> 
      :
      <TableBody>
        <TableRow style={{ height: 240 * 1 }}>
          <TableCell colSpan={cantColumns} align='center'>
            <img
              key="imagenKey"
              src={SinResultados}
              style={{ width:'200px',height: '175px'}}
              alt="logo-Pfd"
            />
            <span style={{display: 'block'}}>¡No se encontraron coincidencias! Sin resultados obtenidos.</span>
          </TableCell>
        </TableRow>
      </TableBody>

  render() {
    const {
      order,
      orderBy,
      rowsPerPage,
      page,
      anchorElFilter,
      anchorElOption,
    } = this.state;
    // variables
    const {
      classes,
      titleTable,
      columns,
      rows,
      columnsToSearch,
      activeSearch,
      searchText,
      menuFilterIndex,
      menuFilters,
      menuOptions,
      showNew,
      showFilter,
      showOption,
      showActions,
      showChecks,
      selected,
      progress,
      permisos,
    }= this.props

    // funciones
    const {
      onClickSearch,
      onChangeTextSearch,
      onClickFilterList,
      onClickUpdateRow,
      onClickNew,
      onClickCheck = () =>{},
      onClickEditItem,
    } = this.props

    // this.handleClickAccept(clickAcceptList, selected)
    const dataTable = this.searchData(rows, columnsToSearch, searchText);
    const emptyRows = rowsPerPage - Math.min(
      rowsPerPage, rows.length - page * rowsPerPage
    );
     
    return (
      <Grid className={classes.root} container component='div' direction='column'>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar
              titleTable={titleTable}
              activeSearch={activeSearch}
              numSelected={selected.length}
              onClickSearch={onClickSearch}
              searchText={searchText}
              onChangeTextSearch={onChangeTextSearch}
              menuFilterIndex={menuFilterIndex}
              menuFilters={menuFilters}
              anchorElFilter={anchorElFilter}
              handleClickFilt={event => this.handleClickFilt(event)}
              handleCloseFilt={this.handleCloseFilt}
              menuOptions={menuOptions}
              anchorElOption={anchorElOption}
              handleClickOpt={event => this.handleClickOpt(event)}
              handleCloseOpt={this.handleCloseOpt}
              onClickFilterList={onClickFilterList}
              selected={selected}
              onClickUpdateRow={onClickUpdateRow}
              onClickNew={onClickNew}
              showNew={showNew}
              showFilter={showFilter}
              showOption={showOption}
              permisos={permisos}
            />
            <div className={classes.tableWrapper}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
              >
                <EnhancedTableHead
                  columns={columns}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={event => this.handleSelectAllClick(event, dataTable, onClickCheck)}
                  rowCount={dataTable.length}
                  showChecks={showChecks}
                />
                {dataTable.length > 0 ?
                  <TableBody>
                    {// stableSort(dataTable,getSorting(order, orderBy) /* , getSorting(order, orderBy) */)
                      dataTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      // dataTable.map(row => {
                        .map(row => {
                          const isSelected = this.isSelected(row.Id);
                          return (
                            this.showDetail(columns, row, isSelected, onClickUpdateRow,showActions, showChecks, onClickCheck, selected, onClickEditItem)
                          );
                        })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={columns.length} />
                      </TableRow>
                    )}
                  </TableBody>
                  :
                  this.showMessageEmpty(classes, rows, emptyRows, progress, showChecks ? columns.length + 1 : columns.length)
                }
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataTable.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              labelRowsPerPage="Renglones por Pagina:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

EnhancedTable.propTypes = {
  classes: T.object.isRequired,
  titleTable: T.string,
  columns: T.array.isRequired,
  rows: T.array.isRequired,
  columnsToSearch: T.array.isRequired,
  activeSearch: T.bool,
  searchText: T.string,
  onClickSearch: T.func,
  onChangeTextSearch: T.func,
  menuFilterIndex: T.number,
  menuFilters: T.array,
  menuOptions: T.array,
  onClickFilterList: T.func,
  onClickUpdateRow: T.func,
  onClickNew: T.func,
  onClickEditItem: T.func,
  showNew: T.bool,
  showFilter: T.bool,
  showOption: T.bool,
  showActions: T.bool,
  showChecks: T.bool,
  onClickCheck: T.func,
  selected: T.array,
  progress: T.bool,
  permisos: T.object,
};

export default withStyles(useStyles)(EnhancedTable);