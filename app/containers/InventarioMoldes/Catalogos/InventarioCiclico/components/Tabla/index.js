/* eslint-disable react/no-did-update-set-state */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { uniqueId, isEqual } from 'lodash';
import SinResultados from 'images/iconos/EmptySinRegistrosbueno.svg';

import { 
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Grow,
  TextField,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import {
  FilterList, 
  Close, 
  Search, 
  CheckCircle, 
  DeleteForever,
  AddCircleOutline,
  MoreVert,
  FilterNone,
  CloudDownload,
  Edit,
} from '@material-ui/icons';

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

const GreenCheckbox = withStyles({
  root: {
    color: '#28950F',
    '&$checked': {
      color: '#28950F',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

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
            <GreenCheckbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.filter(row => 
            typeof row.show === 'undefined' || row.show === true)
            .map(
              row => (
                <TableCell
                  key={row.id}
                  align={row.numeric ? 'right' : 'left'}
                  padding={row.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === row.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
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
              this,
            )}
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
  rows: PropTypes.array,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
      }
      : {
        color: theme.palette.text.primary,
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
    openSearchText, 
    handleToggleSearchText, 
    searchText, 
    handleSearchText, 
    search, 
    filters, 
    openFilters, 
    handleToggleFilters,
    handleCloseFilters,
    handleFilterRecords,
    addNewRow,
    toolbarActions,
    openMenu,
    handleOpenMenu,
    handleCloseMenu,
    data,
    selected,
  } = props;
  
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {
          search && (
            <React.Fragment>
              <Grow 
                appear={openSearchText}
                timeout={300}
                in={openSearchText}
              >
                <TextField 
                  onChange={(e) => handleSearchText(e.target.value)}
                  className={classes.textField}
                  value={searchText}
                  placeholder="Realizar búsqueda"
                />
              </Grow> 
              <Tooltip title="Buscar">
                <IconButton aria-label="Buscar" onClick={handleToggleSearchText}>
                  { openSearchText 
                    ? ( <Close /> ) 
                    : ( <Search /> )
                  }
                </IconButton>
              </Tooltip>
            </React.Fragment>
          )
        }
        {
          filters && (
            <React.Fragment>
              <Tooltip title="Filtros">
                <IconButton aria-label="Filtros" onClick={handleToggleFilters}>
                  <FilterList />
                </IconButton>
              </Tooltip>
              <Popper open={openFilters} transition disablePortal className={classes.muilist}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseFilters}>
                        <MenuList>
                          <MenuItem onClick={() => handleFilterRecords()}>
                            <ListItemIcon className={classes.menuitem}>
                              <CheckCircle className={classes.activarIcon} />
                            </ListItemIcon>
                            <ListItemText inset primary="Activos" />
                          </MenuItem>
                          <MenuItem onClick={() => handleFilterRecords(false)} >
                            <ListItemIcon className={classes.menuitem}>
                              <DeleteForever className={classes.desactivarIcon} />
                            </ListItemIcon>
                            <ListItemText inset primary="Inactivos" />
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </React.Fragment>
          )
        }
        {
          addNewRow && (
            <Tooltip title="Agregar nuevo">
              <IconButton aria-label="Agregar nuevo" onClick={addNewRow}>
                <AddCircleOutline />
              </IconButton>
            </Tooltip>
          )
        }
        {
          toolbarActions && (
            <React.Fragment>
              <Tooltip title="Menu contextual">
                <div>
                  <IconButton aria-label="Menu contextual" onClick={handleOpenMenu} disabled={selected.length < 1}>
                    <MoreVert />
                  </IconButton>
                </div>
              </Tooltip>
              <Popper open={openMenu} transition disablePortal className={classes.muilist}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseMenu}>
                        <MenuList>
                          {
                            toolbarActions.filter(el => Object.keys(el).length > 0 ).map(el => (
                              <MenuItem 
                                key={uniqueId('menu_action_')}
                                onClick={() => el.action(
                                  data.filter(element => selected.includes(element.id))
                                )}
                              >
                                <ListItemIcon className={classes.menuitem}>
                                  {
                                    (() => {
                                      switch(el.icon){
                                        case 'activate': {
                                          return <CheckCircle className={classes.activarIcon} />;
                                        }
                                        case 'deactivate': {
                                          return <DeleteForever className={classes.desactivarIcon} />;
                                        }
                                        case 'download': {
                                          return <CloudDownload className={classes.descargarIcon} />;
                                        }
                                        default: {
                                          return <FilterNone />;
                                        }
                                      }
                                    })()
                                  }
                                </ListItemIcon>
                                <ListItemText inset primary={el.title} />
                              </MenuItem>
                            ))
                          }
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </React.Fragment>
          )
        }
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  openSearchText: PropTypes.bool,
  handleToggleSearchText: PropTypes.func,
  searchText: PropTypes.string, 
  handleSearchText: PropTypes.func, 
  search: PropTypes.bool, 
  filters: PropTypes.bool,
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
  tableOptions: {
    opacity: 0,
  },
  tableRow: {
    '&:hover':{
      '& div': {
        opacity: 1,
      },
    },
  },
  actionIcon: {
    maxWidth: 40,
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    openSearchText: false,
    searchText: '',
    openFilters: false,
    openMenu: false,
    data: [],
    filterData: [],
    page: 0,
    rowsPerPage: 500,
  };

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
      this.setState(state => ({ selected: state.filterData.map(n => n.id) }));
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

  handleToggleSearchText = () => {
    if(this.state.openSearchText){
      this.setState((state) => ({
        openSearchText: !state.openSearchText,
        searchText: '',
        filterData: state.data.filter(el => el.Estatus),
      }))
    } else {
      this.setState((state) => ({
        openSearchText: !state.openSearchText,
        searchText: '',
      }));
    }
  };

  handleSearchText = (searchText) => {
    const {
      data,
    } = this.state;

    this.setState({ searchText });

    if(searchText !== ''){
      const rows = this.props.rows.map(row => row.id);

      const newData = data.filter(el => {
        let itemFound = false;

        rows.forEach(row => {
          const itemSearch = el[row].toString().toLowerCase().includes(searchText.toLowerCase());
        
          if(itemSearch){
            itemFound = true;
          }
        })

        return itemFound;
      })

      this.setState({filterData: newData})
    } else {
      this.setState({filterData: data.filter(el => el.Estatus)})
    }
  }

  handleToggleFilters = () => {
    this.setState((state) => ({
      openFilters: !state.openFilters,  
    }))
  }

  handleCloseFilters = () => {
    this.setState({openFilters: false})
  }

  handleFilterRecords = (status = true) => {
    const {
      data,
    } = this.state;

    this.setState({
      filterData: data.filter(el => el.Estatus === status),
      openFilters: false,
      selected: [],
    })
  }

  handleOpenMenu = () => {
    this.setState((state) => ({
      openMenu: !state.openMenu, 
    }))
  }

  handleCloseMenu = () => {
    this.setState({openMenu: false})
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentDidMount(){
    const {
      data,
    } = this.props;

    this.setState({
      data,
      filterData: data.filter(el => el.Estatus), 
    });
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.data, this.props.data)) {
      this.setState({
        data: this.props.data,
        filterData: this.props.data.filter(el => el.Estatus),
        selected: [],
      })
    }
  }

  onClickAction(action, row){
    action(row);
  }

  render() {
    const { classes, rows, search, filters, actions, addNewRow, toolbarActions } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, openSearchText, searchText, filterData, openFilters, openMenu } = this.state;
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
   
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          openSearchText={openSearchText} 
          handleToggleSearchText={this.handleToggleSearchText}
          searchText={searchText}
          handleSearchText={this.handleSearchText}
          search={search}
          filters={filters}
          openFilters={openFilters}
          handleToggleFilters={this.handleToggleFilters}
          handleCloseFilters={this.handleCloseFilters}
          handleFilterRecords={this.handleFilterRecords}
          addNewRow={addNewRow}
          toolbarActions={toolbarActions}
          openMenu={openMenu}
          handleOpenMenu={this.handleOpenMenu}
          handleCloseMenu={this.handleCloseMenu}
          selected={selected}
          data={data}
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
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                      className={classes.tableRow}
                    >
                      <TableCell padding="checkbox">
                        <GreenCheckbox
                          onClick={event => this.handleClick(event, n.id)}
                          checked={isSelected}
                        />
                      </TableCell>
                      { tableCells() }
                      <TableCell align="left" padding="none">
                        {
                          selected.length < 1 && (
                            <div className={classes.tableOptions}>
                              {/* {
                                actions.filter(el => Object.keys(el).length > 0 ).map(el => (
                                  <Tooltip
                                    key={uniqueId('action_')}
                                    title={el.title}
                                    placement="bottom"
                                  >
                                    <IconButton aria-label={el.title} onClick={() => el.action(n)}> 
                                      {
                                        (() => {
                                          switch(el.icon){
                                            case 'edit': {
                                              return <Edit />;
                                            }
                                            case 'delete': {
                                              return <DeleteForever />;
                                            }
                                            case 'download': {
                                              return <CloudDownload />;
                                            }
                                            default: {
                                              return <FilterNone />;
                                            }
                                          }
                                        })()
                                      }
                                    </IconButton>
                                  </Tooltip> 
                                ))
                              }  */}
                            </div>
                          )
                        }
                      </TableCell>
                    </TableRow>
                  );
                }) : 
                <TableRow style={{ height: 49 }}>
                  <TableCell colSpan={6}>
                    <div style={{margin: '20px 0'}}>
                      <img
                        key="Sin resultados"
                        src={SinResultados}
                        style={{ width:'150px',height: '150px', display: 'block', margin: '0 auto'}}
                        alt="¡No se encontraron coincidencias! Sin resultados obtenidos."
                      />
                      <span style={{ textAlign: 'center', display: 'block' }}>
                        ¡No se encontraron coincidencias! Sin resultados obtenidos.
                      </span>
                    </div>
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </div>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          labelDisplayedRows={
            ({ from, to, count }) => `${from}-${to} de ${count}`
          }
          labelRowsPerPage="Registros por página"
        /> */}
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  rows: PropTypes.array,
  search: PropTypes.bool,
  filters: PropTypes.bool,
  actions: PropTypes.array,
  addNewRow: PropTypes.func,
  toolbarActions: PropTypes.array,
};

EnhancedTable.defaultProps = {
  delay: 100,
  rows: [],
  data: [],
  search: false, 
  filters: false,
}

export default withStyles(styles)(EnhancedTable);
