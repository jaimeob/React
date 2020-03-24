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
// import DeleteIcon from "@material-ui/icons/Delete";
import ActiveIcon from "@material-ui/icons/CheckCircleOutline";
// import DeleteIcon from 'images/iconos/deleteButtonListGrey.png';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import EditIcon from 'images/iconos/editButtonListGrey.png';
import FilterListIcon from "@material-ui/icons/FilterList";
// import ErrorOutLineIcon from "@material-ui/icons/ErrorOutline";
// import { lighten } from "@material-ui/core/styles/colorManipulator";

import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import OpcionIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/ControlPoint";
import GreenColor from "@material-ui/core/colors/green";
import RedColor from "@material-ui/core/colors/red";
import GreyColor from "@material-ui/core/colors/grey";
// import BlueColor from "@material-ui/core/colors/blue";
import { Grid } from "@material-ui/core";

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const getSorting = (order, orderBy) =>
  order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);

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
  spacer: {
    flex: "1 1 20%",
  },
  actions: {
    // padding:10,
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
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
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {titleTable}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
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
        <Tooltip title={tooltipSearch}>
          <IconButton
            onClick={onClickSearch}
          >
            {buttonSearch}
          </IconButton>
        </Tooltip>
        {showFilter ?
          <div>
            <Tooltip title="Filtrar" leaveTouchDelay={200}>
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
              {menuFilters.map((menu, index) => (
                <MenuItem
                  key={menu.option}
                  onClick={() => {
                    onClickFilterList({
                      state: menu.option,
                      newIndex: index,
                      index: menuFilterIndex,
                    });
                    handleCloseFilt()
                  }}
                >
                  <Checkbox
                    checked={menu.checked}
                    style={{color: GreenColor[700]}}
                  />
                  {menu.option}
                </MenuItem>
              ))}
            </Menu>
          </div>
          :
          null
        }
        {showNew ? 
          <Tooltip title="Nuevo">
            <IconButton
              // onClick={() => onClickNew(1)}
              onClick={onClickNew}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          :
          null
        }
        {showOption ? 
          <div>
            <Tooltip title="Opciones">
              <IconButton
                aria-label="Option list"
                aria-owns={openMenuOption ? 'option-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClickOpt}
                {...(numSelected === 0 ? {disabled: true} : {})}
              >
                <OpcionIcon />
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
                  onClick={() => onClickUpdateRow({idFamilys: selected, state: option})}
                >
                  {option ==='Activar' ?
                    <ActiveIcon style={{color:GreenColor[700]}} />
                    :
                    <DeleteForeverIcon style={{color: RedColor[700]}}/>
                  }
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
          :
          null
        }
      </div>
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
              style={{ color: GreenColor[800] }}
            />
          </TableCell>
          :
          null
        }
        {columns.map(
          row => (
            <TableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "default"}
              sortDirection={orderBy === row.id ? order : false}
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
    // marginBottom: theme.spacing(2),
    // marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
    // paddingRight: theme.spacing.unit * 2,
    // paddingLeft: theme.spacing.unit * 2,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  empty: {
    color: GreyColor[500],
  },
});

// const EnhancedTable = props => {
class EnhancedTable extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'Nombre',
    // selected: [],
    page: 0,
    rowsPerPage: 5,
    rowIdHover: -1,
    anchorElFilter: null,
    anchorElOption: null,
    // filterList: 'A',
    // modalChangeStatusChecks: false,
    // optionSelected: false,
  };
  // const { data } = props
  // console.log(data);
  // const [order, setOrder] = React.useState("asc");
  // const [orderBy, setOrderBy] = React.useState("calories");
  // const [selected, setSelected] = React.useState([]);
  // const [page, setPage] = React.useState(0);
  // const [dense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // function handleRequestSort(event, property) {
  //   const isDesc = orderBy === property && order === "desc";
  //   setOrder(isDesc ? "asc" : "desc");
  //   setOrderBy(property);
  // }

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
      const newSelected = dataTable.map(n => n.Id);
      onClickCheck({newSelected});
      // this.setState(() => ({ selected: dataTable.map(n => n.Id) }));
      return;
    }
    onClickCheck({newSelected: []});
    // this.setState({ selected: [] });
  }

  handleClick(event, id, onClickCheck, selected) {
    // const { selected } = this.state;
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

    onClickCheck({newSelected});
    // this.setState({ selected: newSelected });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  rowWithMouse = (id) => this.setState({ rowIdHover: id });

  cleanRow = () => this.setState({ rowIdHover: -1 });

  showButtonsInRow = (rowDelete, rowsActives, onClickUpdateRow, selected) => {
    const {
      // selected,
      rowIdHover,
    } = this.state;
    let resp;
    const labelEstatus = "Eliminar";

    const propDelete = {
      color: RedColor[500],
      width:'15px',
      height: '15px',
    }

    if(selected.length === 0 && rowDelete.Id === rowIdHover) {
      resp = (
        <div>
          <Tooltip title={labelEstatus}>
            <IconButton
              onClick={() => onClickUpdateRow({rowDelete, rowsActives})}
            >
              <DeleteForeverIcon style={{...propDelete}}/>
            </IconButton>
          </Tooltip>
        </div>
      )
    } else {
      resp = null;
    }
    return resp
  }

  showDetail = (columns, row, isItemSelected, onClickUpdateRow, rowsActives, showActions, showChecks, onClickCheck, selected) =>
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
        <TableCell component="th" padding="checkbox">
          <Checkbox
            style={{ color: GreenColor[800] }}
            checked={isItemSelected}
            onClick={event => this.handleClick(event, row.Id, onClickCheck, selected)}
          />
        </TableCell>
        :
        null
      }
      {
        Object.keys(row).map(propName => {
          if(columns.some( col => col.id === propName )) {
            return propName === 'Id' || propName === 'Nombre' ?
              <TableCell
                key={`cel_${row.Id}_${propName}`}
                component="th"
                scope="row"
                padding="default"
              >
                {row[propName]}
              </TableCell>
              :
              <TableCell
                key={`cel_${row.Id}_${propName}`}
                align="right"
              >
                {row[propName]}
              </TableCell>
          }
          return null;
        })
      }
      {showActions ?
        <TableCell align="right" style={{width:203}}>
          {this.showButtonsInRow(row, rowsActives, onClickUpdateRow, selected)}
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

  isSelected = id => this.props.selected.indexOf(id) !== -1;

  // handleClickAccept = (clickAcceptList, selected, action) =>
  //   clickAcceptList ? action({selected}) : null

  showMessageEmpty = (classes, rows, emptyRows) =>
    rows.length <= 0 ?
      <TableBody>
        <TableRow style={{ height: 49 * emptyRows }}>
          <TableCell colSpan={6} align='center'>
            <Typography variant="h6" className={classes.empty}>
              No existen sub-familias asignadas a esta familia.
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody> 
      :
      <TableBody>
        <TableRow style={{ height: 240 * 1 }}>
          <TableCell colSpan={6} align='center'>
            <Typography variant="h6" className={classes.empty}>
              Sin resultados obtenidos.
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>

  render() {
    const {
      order,
      orderBy,
      // selected,
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
    }= this.props

    // funciones
    const {
      onClickSearch,
      onChangeTextSearch,
      onClickFilterList,
      onClickUpdateRow,
      onClickNew,
      onClickCheck = () =>{},
    } = this.props

    // this.handleClickAccept(clickAcceptList, selected)
    // const isSelected = name => selected.indexOf(name) !== -1;
    const dataTable = this.searchData(rows, columnsToSearch, searchText);
    const emptyRows = rowsPerPage - Math.min(
      rowsPerPage, rows.length - page * rowsPerPage
    );

    return (
      <Grid className={classes.root} container component='div' direction='column'>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar
              // classes={classes}
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
                    {stableSort(dataTable,getSorting(order, orderBy) /* , getSorting(order, orderBy) */)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(row => {
                        const isSelected = this.isSelected(row.Id);
                        return (
                          this.showDetail(columns, row, isSelected, onClickUpdateRow, rows,showActions, showChecks, onClickCheck, selected)
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  :
                  this.showMessageEmpty(classes, rows, emptyRows)
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
  // onClickEditItem: T.func,
  showNew: T.bool,
  showFilter: T.bool,
  showOption: T.bool,
  showActions: T.bool,
  showChecks: T.bool,
  onClickCheck: T.func,
  selected: T.array,
};

export default withStyles(useStyles)(EnhancedTable);