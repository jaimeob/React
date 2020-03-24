import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
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
import { lighten } from '@material-ui/core/styles/colorManipulator';
import DeleteIcon from 'images/iconos/deleteButtonList.png';
import isEmpty from 'lodash/isEmpty';

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

const rows = [
  { id: 'numDepto', numeric: false, disablePadding: true, label: '#' },
  { id: 'nomDepto', numeric: true, disablePadding: false, label: 'Departamento' },
  { id: 'estatus', numeric: true, disablePadding: false, label: 'Estatus' },
  { id: 'opcion', numeric: true, disablePadding: false, label: 'Opciones' },
];

// eslint-disable-next-line react/prefer-stateless-function
class EnhancedTableHead extends React.Component {
  // createSortHandler = property => event => {
  //   this.props.onRequestSort(event, property);
  // };

  render() {
    const { onSelectAllClick, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                align={row.numeric ? 'right' : 'left'}
                style={{color: "#000000"}}
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
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
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
});

let EnhancedTableToolbar = props => {
  const {
    numSelected,
    classes,
    onClickSearch,
    selectSearch,
  } = props;
 
  const buttonSearch = selectSearch ? <ClearIcon/> : <SearchIcon/>;
  const tooltipSearch = selectSearch ? "Limpar" : "Buscar";

  const showTextField = () => {
    let result = '';

    if (numSelected === 0){
      if(selectSearch){
        result = <TextField
          id="standard-search"
          label="Buscar"
          type="search"
          className={classes.textField}
          maxLength="5"
          style={{marginTop: 0, width: 300}}
          onBlur={onClickSearch}
        />
      }
    }

    return result;
  }

  return (
    <Toolbar
      // className={classNames(classes.root, {
      //   [classes.highlight]: numSelected > 0,
      // })}
    >
      <div className={classes.spacer} />
      {/* <div className={classes.actions}> */}

      <div>
        {showTextField()}
        {numSelected === 0 ? (
          <Tooltip title={tooltipSearch}>
            <IconButton onClick={onClickSearch} align="bottom">
              {buttonSearch}
            </IconButton>
          </Tooltip>
        ) : ('') }
        <Tooltip title="Filtro">
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Nuevo">
          <IconButton>
            <AddIcon/>
          </IconButton>
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Opciones">
          <IconButton>
            <OpcionIcon/>
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onClickSearch: PropTypes.func.isRequired,
  selectSearch: PropTypes.bool,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
    minHeight: 300,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'numDepto',
    selected: [],
    // data: [],
    page: 0,
    rowsPerPage: 5,
    selectSearch:false,
  };

  // componentDidMount(){
  //   this.setState({ data: this.props.dataList});
  // }

  // handleSelectAllClick = event => {
  //   if (event.target.checked) {
  //     this.setState(state => ({ selected: state.data.map(n => n.id) }));
  //     return;
  //   }
  //   this.setState({ selected: [] });
  // };

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

    this.setState({ selected: newSelected, selectSearch: false });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  onClickShearchAccion = () => {
    this.setState((state) => ({
      selectSearch: !state.selectSearch,
      // searchText: state.selectSearch ? '' : state.searchText,
    }));
  }

  render() {
    const { classes, data } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, selectSearch } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const showDetail = !isEmpty(data) ? (<TableBody>
      {stableSort(data, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(n => {
          const isSelected = this.isSelected(n.id);
          return (
            <TableRow
              hover
              onClick={event => this.handleClick(event, n.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={-1}
              key={n.id}
              selected={isSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isSelected} />
              </TableCell>
              <TableCell component="th" scope="row" padding="none">
                {n.departamentoId}
              </TableCell>
              <TableCell align="right">{n.nombre}</TableCell>
              <TableCell align="right">{(n.estatus ? 'ACTIVO' : 'INACTIVO')}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="Borrar">
                  <img
                    src={DeleteIcon}
                    style={{ width:'25px',height: '25px'}}
                    alt="logo-Pfd"
                  />
                </IconButton>
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
      : (<div>
        Sin resultados obtenidos
      </div>);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onClickSearch={this.onClickShearchAccion}
          selectSearch ={selectSearch}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={this.handleSelectAllClick}
              rowCount={data.length}
            />
            {showDetail}
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
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
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
};

export default withStyles(styles)(EnhancedTable);