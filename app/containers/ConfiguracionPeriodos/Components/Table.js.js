import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/LockOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import MenuItem from "@material-ui/core/MenuItem";
import Popper from '@material-ui/core/Popper';
import Grow from "@material-ui/core/Grow";
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ActivarIcon from '@material-ui/icons/CheckCircle';
import DesactivarIcon from '@material-ui/icons/DeleteForever';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CerrarIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import SinResultados from 'images/iconos/EmptySinRegistrosbueno.svg';

import { uniqueId } from 'lodash';

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

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, rows } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {/*
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
            */}
          </TableCell>
          {
            rows.filter(row => (
              typeof row.show === 'undefined' || row.show === 'true'
            )).map(row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Ordenar"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this)
          }
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    display: 'flex',
    color: theme.palette.text.secondary,
    zIndex: 150,
  },
  title: {
    flex: '0 0 auto',
  },
  muilist: {
    top: 0,
    right: 65,
    zIndex: 150,
  },
  menuitem: {
    marginRight: 0,
  },
  activarIcon: {
    fill: '#28950F',
  },
  desactivarIcon: {
    fill: '#FF0023',
  },
  descargarIcon: {
    fill: '#F9AA33',
  },
  textField: {
    marginRight: 5,
    minWidth: 200,
  },
});

let EnhancedTableToolbar = props => {
  const { 
    numSelected, 
    classes, 
    options, 
    showFilters, 
    onShowFilters, 
    onClickFilters, 
    onCloseFilters, 
    showSearchText, 
    searchText,
    onShowSearchText,
    onSearchText,
    setStepperAction,
    disabledAddButton,
    permisos,
  } = props;

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Grow 
          appear={showSearchText}
          timeout={300}
          in={showSearchText}
        >
          <TextField 
            onChange={(e) => onSearchText(e.target.value)}
            className={classes.textField}
            value={searchText}
            placeholder="Realizar búsqueda"
          />
        </Grow> 
        <Tooltip title="Buscar">
          <IconButton aria-label="Buscar" onClick={onShowSearchText}>
            { showSearchText 
              ? ( <CerrarIcon /> ) 
              : ( <SearchIcon /> )
            }
          </IconButton>
        </Tooltip>
        <Tooltip title="Filtros">
          <IconButton aria-label="Filtros" onClick={onShowFilters}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        {
          permisos.normales.registrar ? (
            <Tooltip title="Agregar">
              <IconButton aria-label="Agregar" disabled={disabledAddButton} onClick={() => setStepperAction(1)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          ) : null
        }
        <Popper open={showFilters} transition disablePortal className={classes.muilist}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={onCloseFilters}>
                  <MenuList>
                    <MenuItem onClick={() => onClickFilters(options[0])}>
                      <ListItemIcon className={classes.menuitem}>
                        <ActivarIcon className={classes.activarIcon} />
                      </ListItemIcon>
                      <ListItemText inset primary={options[0]} />
                    </MenuItem>
                    <MenuItem  onClick={() => onClickFilters(options[1])} >
                      <ListItemIcon className={classes.menuitem}>
                        <DesactivarIcon className={classes.desactivarIcon} />
                      </ListItemIcon>
                      <ListItemText inset primary={options[1]} />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  editIcon: {
    fill: '#28950F',
  },
  lockIcon: {
    fill: '#FF0023',
  },
  lockOpenIcon: {
    fill: '#ffa000',
  },
  tableCell: {
    fontSize: 12,
  },
});

class EnhancedTable extends React.Component {

  componentDidMount(){
    const {
      actions: {
        setDisabledAddButtonAction,
      },
      params: {
        data,
        options,
      },
    } = this.props;

    if(data.length > 0){
      const total = data.filter(el => el.Estatus === options[0]);
      
      setDisabledAddButtonAction( total.length > 0 );
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.props.params;
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

    this.props.actions.setSelectedAction(newSelected);
  };

  handleChangePage = (event, page) => {
    this.props.actions.setPageAction(page);
  };

  handleChangeRowsPerPage = event => {
    this.props.actions.setRowsPerPageAction(event.target.value);
  };

  handleShowFilters = () => {
    const {
      actions: {
        setShowFiltersAction,
      },
    } = this.props;

    setShowFiltersAction();
  }

  handleCloseFilters = () => {
    const {
      actions: {
        closeFiltersAction,
      },
    } = this.props;

    closeFiltersAction();
  }

  handleFilters = (option) => {
    const {
      actions: {
        setFilterDataAction,
      },
      params: {
        data,
      },
    } = this.props;

    setFilterDataAction(data.filter(el => el.Estatus === option));
  }

  handleShowSearchText = () => {
    const {
      actions: {
        setShowSearchTextAction,
        setSearchTextAction,
        setFilterDataAction,
      },
      params: {
        data,
      },
    } = this.props;
   
    setShowSearchTextAction();
    setSearchTextAction();
    setFilterDataAction(data);
  }

  handleSearchText = (value) => {
    const {
      actions: {
        setSearchTextAction,
        setFilterDataAction,
      },
      params: {
        data,
        options,
      },
    } = this.props;

    if(value.length === 0){
      setFilterDataAction(data);
      setSearchTextAction();    
    } else {
      setSearchTextAction(value);
      // eslint-disable-next-line array-callback-return
      setFilterDataAction(data.filter(el => {
        // eslint-disable-next-line no-restricted-syntax
        for(const key in el){
          if(
            el[key].toString().toLowerCase().includes(value.toLowerCase()) || 
            (el.Estatus ? options[0] : options[1] ).toLowerCase().indexOf(value.toLowerCase()) > -1
          ){
            return el;
          }
        }
      }));  
    }
  }

  handleClosePeriod = ({id, NumeroPlazas}) => {
    const {
      actions: {
        setModalAction,
        requestClosePeriodAction,
      },
      params: {
        totalPlazas,
      },
    } = this.props;

    if(NumeroPlazas < totalPlazas){
      setModalAction();
    } else {
      requestClosePeriodAction(id);
    }
  }

  isSelected = id => this.props.params.selected.indexOf(id) !== -1;

  render() {
    const { 
      classes,
      permisos,
      actions: {
        setStepperAction,
        requestEditPeriodAction,
      },
      params : {
        data,
        rows,
        options,
        order,
        orderBy,
        selected,
        page,
        rowsPerPage,
        showFilters,
        showSearchText,
        searchText,
        filterData,
        disabledAddButton,
      },
    } = this.props;
     
    return (
      <Paper className={classes.root}>    
        <EnhancedTableToolbar 
          permisos={permisos}
          numSelected={selected.length} 
          options={options} 
          showFilters={showFilters} 
          onShowFilters={this.handleShowFilters} 
          onClickFilters={this.handleFilters}
          onCloseFilters={this.handleCloseFilters}
          showSearchText={showSearchText}
          searchText={searchText}
          onShowSearchText={this.handleShowSearchText}
          onSearchText={this.handleSearchText}
          setStepperAction={setStepperAction}
          filterData={filterData}
          disabledAddButton={disabledAddButton}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={filterData.length}
              rows={rows}
            />
            <TableBody>
              {filterData.length > 0 ? stableSort(filterData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);

                  // Validar para mostrar el campo de la tabla
                  const keys = rows.filter(row => (typeof row.show === 'undefined' || row.show === 'true')).map(row => row.id)
                  const tableCells = () => keys.map((item) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TableCell key={uniqueId('cell_')} align="left" padding="none" className={classes.tableCell}>
                      {n[item]}
                    </TableCell>
                  ))

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      { tableCells() }
                      <TableCell padding="checkbox">
                        <Tooltip
                          title="Editar"
                          placement="bottom"
                        >
                          <IconButton aria-label="Editar" onClick={() => requestEditPeriodAction(n.id)}>
                            <EditIcon className={classes.editIcon} />                                 
                          </IconButton>
                        </Tooltip>
                        {
                          n.Estatus === options[0] && permisos.normales.eliminar
                            ? ( 
                              <Tooltip
                                title="Cerrar periodo"
                                placement="bottom"
                              >
                                <IconButton
                                  onClick={() => this.handleClosePeriod(n)}
                                  disabled={!permisos.normales.eliminar}
                                >
                                  <LockOpenIcon className={classes.lockOpenIcon} />
                                </IconButton>
                              </Tooltip>
                            )
                            : null
                        }
                        {
                          n.Estatus === options[1] && (
                            <IconButton disabled>
                              <LockIcon className={classes.lockIcon} />
                            </IconButton> 
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
                        style={{ width:'150px',height: '150px', display: 'block', margin: '20px auto 0 auto'}}
                        alt="¡No se encontraron coincidencias! Sin resultados obtenidos."
                      />
                      <Typography style={{textAlign: 'center', marginBottom: 20}}>
                      ¡No se encontraron coincidencias! Sin resultados obtenidos.
                      </Typography>
                    </React.Fragment>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Página Anterior',
          }}
          nextIconButtonProps={{
            'aria-label': 'Siguiente Página',
          }}
          labelDisplayedRows= {({ from, to, count }) => `${from}-${to} de ${count}`}
          labelRowsPerPage='Registros por página'
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  params: PropTypes.object,
  actions: PropTypes.object,
  permisos: PropTypes.object,
};

export default withStyles(styles)(EnhancedTable);
