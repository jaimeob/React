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
// import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import DeleteIcon from "@material-ui/icons/Delete";
import ActiveIcon from "@material-ui/icons/CheckCircleOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteIcon from 'images/iconos/deleteButtonListGrey.png';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ListIcon from '@material-ui/icons/List';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from 'images/iconos/editButtonListGrey.png';
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
import { Grid, Typography } from "@material-ui/core";

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

const iconFilter = (icon) => {
  switch(icon){
    case "Activos":{
      return <CheckCircleIcon style={{color: GreenColor[600]}} />
    }
    case "Inactivos":{
      return <DeleteForeverIcon style={{color: RedColor[600]}}/>
    }
    default:
      return <ListIcon/>
  }
}

let EnhancedTableToolbar = props => {
  // const classes = useToolbarStyles();
  // variables
  const {
    classes,
    activeSearch,
    numSelected,
    searchText,
    menuFilterIndex,
    menuFilters,
    anchorElFilter,
    menuOptions,
    anchorElOption,
    selected,
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

  // const showIconFilter = (option) => {
  //   let icon;
  //   switch (option) {
  //     case 'Todos':
  //       icon = <ErrorOutLineIcon style={{color:GreenColor[700]}}/>
  //       break;
  //     case 'Activos':
  //       icon = <ActiveIcon style={{color:GreenColor[700]}}/>
  //       break;
  //     case 'Inactivos':
  //       icon = <DeleteForeverIcon style={{color:RedColor[700]}}/>
  //       break;
  //     default:
  //       icon = <ErrorOutLineIcon style={{color:BlueColor[700]}}/>
  //   }
  //   return icon;
  // }

  return (
    <Toolbar
      // className={clsx(classes.root, {
      //   [classes.highlight]: numSelected > 0
      // })}
      className={classes.root}
    >
      {/* <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div> */}
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <TextField
          id="standard-search"
          label="Buscar"
          type="search"
          value={searchText}
          className={classes.textField}
          maxLength="5"
          style={{visibility:showTextSearch}}
          autoFocus
          onChange={(event) => onChangeTextSearch(event.target.value)}
        />
        <Tooltip title={tooltipSearch}>
          <IconButton
            onClick={onClickSearch}
            // align= "bottom"
          >
            {buttonSearch}
          </IconButton>
        </Tooltip>
        <Tooltip title="Filtrar" leaveTouchDelay={200}>
          <span>
            <IconButton
              aria-label="Filter list"
              aria-owns={openMenuFilter ? 'filter-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClickFilt}
              disabled={numSelected > 0}
              // {...(numSelected > 0 ? {disabled: true} : {})}
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
              {iconFilter(menu.option)}
              {menu.option}
            </MenuItem>
          ))}
        </Menu>
        <Tooltip title="Nuevo">
          <IconButton
            onClick={() => onClickNew(1)}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Opciones">
          <span>
            <IconButton
              aria-label="Option list"
              aria-owns={openMenuOption ? 'option-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClickOpt}
              disabled={numSelected === 0}
              // {...(numSelected === 0 ? {disabled: true} : {})}
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
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: T.object.isRequired,
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
  } = props;
  // const createSortHandler = property => event => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            style={{ color: GreenColor[800] }}
          />
        </TableCell>
        {columns.map(
          row => (
            <TableCell
              key={row.id}
              align="left"
              padding="default"
              sortDirection={orderBy === row.id ? order : false}
            >
              {row.label}
              {/* <TableSortLabel
                active={orderBy === row.id}
                direction={order}
                // onClick={createSortHandler(row.id)}
              >
                {row.label}
              </TableSortLabel> */}
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
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 750,
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
    selected: [],
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

  handleSelectAllClick(event, dataTable) {
    if (event.target.checked) {
      this.setState(() => ({ selected: dataTable.map(n => n.Id) }));
      return;
    }
    this.setState({ selected: [] });
  }

  handleClick(event, id) {
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
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  rowWithMouse = (id) => this.setState({ rowIdHover: id });

  cleanRow = () => this.setState({ rowIdHover: -1 });

  showButtonsInRow = (id, status, name, onClickUpdateRow, onClickEditItem, onClickOpenModalCharges) => {
    const {
      selected,
      rowIdHover,
    } = this.state;
    /* const {
      onClickEditItem,
      onClickDeleteItem,
    } = this.props; */
    let resp;
    const labelEstatus = status === "Activo" ? "Desactivar" : "Activar";

    const propDelete = {
      src: DeleteIcon,
      width:'15px',
      height: '15px',
    }

    const propEdit= {
      src: EditIcon,
      width:'15px',
      height: '15px',
    }

    if(selected.length === 0 && id === rowIdHover) {
      resp = (
        <div>
          <Tooltip title="Agregar Puesto">
            <IconButton
              onClick={() => onClickOpenModalCharges({
                idFamilys: [id],
              })}
            >
              <PersonAddIcon style={{ width:'16px', height: '16px'}}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => onClickEditItem({id, name, step: 1})}
            >
              <img alt="logo-Pfd" {...propEdit}/>
            </IconButton>
          </Tooltip>
          <Tooltip title={labelEstatus}>
            <IconButton
              onClick={() => onClickUpdateRow({
                idFamilys: [id],
                state: status === "Activo" ?  'Desactivar' : 'Activar',
              })}
            >
              {status === "Activo" ?
                <img alt="logo-Pfd" {...propDelete}/>
                :
                <ActiveIcon style={{ width:'16px', height: '16px'}}/>
              }
            </IconButton>
          </Tooltip>
        </div>
      )
    } else {
      resp = null;
    }
    return resp
  }

  showDetail = (columns, row, isItemSelected, onClickUpdateRow, onClickEditItem, onClickOpenModalCharges) =>
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
      <TableCell padding="checkbox">
        <Checkbox
          style={{ color: GreenColor[800] }}
          checked={isItemSelected}
          onClick={event => this.handleClick(event, row.Id)}
        />
      </TableCell>
      {
        Object.keys(row).map(propName => {
          if(columns.some( col => col.id === propName )) {
            return propName === 'Id' ?
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
                align="left">{row[propName]}
              </TableCell>
          }
          return null;
        })
      }
      <TableCell align="right" style={{width:203}}>
        {this.showButtonsInRow(row.Id, row.Estatus, row.Nombre, onClickUpdateRow, onClickEditItem, onClickOpenModalCharges)}
      </TableCell>

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

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  showMessageEmpty = (classes, rows, emptyRows) =>
    rows.length <= 0 ?
      <TableBody>
        <TableRow style={{ height: 300 * emptyRows }}>
          <TableCell colSpan={6} align='center'>
            <Typography variant="h6" className={classes.empty}>
              Una vez que se registren familias, se mostrarán en este apartado.
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
      :
      <TableBody>
        <TableRow style={{ height: 300 * emptyRows }}>
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
      selected,
      rowsPerPage,
      page,
      anchorElFilter,
      anchorElOption,
      // modalChangeStatusChecks,
      // optionSelected,
    } = this.state;
    // variables
    const {
      classes,
      columns,
      rows,
      columnsToSearch,
      activeSearch,
      searchText,
      menuFilterIndex,
      menuFilters,
      menuOptions,
      // messageEmpty,
    }= this.props
    // funciones
    const {
      onClickSearch,
      onChangeTextSearch,
      onClickFilterList,
      onClickUpdateRow,
      onClickNew,
      onClickEditItem,
      onClickOpenModalCharges,
    } = this.props

    // const classes = useStyles();

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
              onClickOpenModalCharges={onClickOpenModalCharges}
              onClickNew={onClickNew}
            />
            <div className={classes.tableWrapper}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                // size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  columns={columns}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={event => this.handleSelectAllClick(event, dataTable)}
                  // onRequestSort={handleRequestSort}
                  rowCount={dataTable.length}
                />
                {dataTable.length > 0 ?
                  <TableBody>
                    {stableSort(dataTable,getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(row => {
                        const isSelected = this.isSelected(row.Id);
                        return (
                          this.showDetail(columns, row, isSelected, onClickUpdateRow, onClickEditItem, onClickOpenModalCharges)
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
  onClickOpenModalCharges: T.func,
  // messageEmpty: T.string,
};

export default withStyles(useStyles)(EnhancedTable);
