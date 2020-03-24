import React from 'react';
import classNames from 'classnames';
import PropTypes, { element } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import TextField from "@material-ui/core/TextField";
import Grow from "@material-ui/core/Grow";
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CerrarIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {uniqueId} from 'lodash';
import {
  grey,
  green,
} from '@material-ui/core/colors';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import espanol from 'moment/src/locale/es';

import { DateRangePicker } from 'react-dates';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Chip from '@material-ui/core/Chip';
import MoreVert from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import SinResultados from 'images/iconos/EmptySinRegistrosbueno.svg';

const moment = extendMoment(Moment);

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
         
          </TableCell>
          {
            rows.filter(row => (
              typeof row.show === 'undefined' || row.show === 'true'
            )).map(row => (
              <TableCell
                key={uniqueId('table_head')}
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
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  rows: PropTypes.array,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  activarIcon: {
    fill: '#28950F',
  },
  desactivarIcon: {
    fill: '#FF0023',
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
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
    zIndex: 150,
  },
  title: {
    flex: '0 0 auto',
  },
  muilist: {
    top: 0,
    right: 85,
    zIndex: 150,
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
    showFilters, 
    onClickShowFilters, 
    onClickAwayFilters, 
    showSearchTextField, 
    onClickShowSearchTextField, 
    onChangeSearchTextField, 
    searchTextField,
    startDate,
    endDate,
    focusedInput,
    onClickFocusedInput,
    onChangeDates,
  } = props;

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Grow 
          appear={showSearchTextField}
          timeout={300}
          in={showSearchTextField}
        >
          <TextField 
            onChange={(e) => onChangeSearchTextField(e.target.value)}
            className={classes.textField}
            value={searchTextField}
            placeholder="Realizar búsqueda"
          />
        </Grow> 
        <Tooltip title="Buscar">
          <IconButton aria-label="Buscar" onClick={() => onClickShowSearchTextField()}>
            {showSearchTextField 
              ? ( <CerrarIcon /> ) 
              : ( <SearchIcon /> )
            }
          </IconButton>
        </Tooltip>
        <Tooltip title="Filtros" onClick={() => onClickShowFilters()}>
          <IconButton aria-label="Filtros">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Popper open={showFilters} transition disablePortal className={classes.muilist}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                {/*<ClickAwayListener onClickAway={onClickAwayFilters}>*/}

                <DateRangePicker
                  startDate={startDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={endDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={(dates) => onChangeDates(dates)} // PropTypes.func.isRequired,
                  numberOfMonths={1}
                  showClearDates
                  isOutsideRange={() => false}
                  small
                  startDatePlaceholderText="Fecha Inicio"
                  endDatePlaceholderText="Fecha Fin"
                  renderMonthElement={
                    ({ month }) => moment(month).local('es', espanol).format('LL')
                  }
                  phrases={
                    {
                      closeDatePicker: 'Cerrar',
                      clearDates: 'Limpiar',
                      calendarLabel: 'Calendario',
                    }
                  }                 
                  focusedInput={focusedInput} 
                  onFocusChange={(focused) => onClickFocusedInput(focused)} // PropTypes.func.isRequired,
                />
                
                 
                {/*</ClickAwayListener>*/}
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
  chip: {
    margin: theme.spacing.unit,
    width: 100,
    position: 'relative',
    fontWeight: 'bold',
    height: 20,
    left: -13,
  },
  chipEnTiempo: {
    color: 'green',
    borderColor: 'green',
  },
  chipAtrasado: {
    color: 'red',
    borderColor: 'red',
  },
  chipFinalizado: {
    color: 'gray',
    borderColor: 'gray',
  },
  spanChip: {
    position: 'absolute',
    left: 30,
    fontWeight: 300,
    fontSize: 11,
  },
  avatar: {
    left: 0,
    position: 'absolute',
    height: 20,
    width: 20,
  },
  avatarEnTiempo: {
    backgroundColor: 'green',
  },
  avatarAtrasado: {
    backgroundColor: 'red',
  },
  avatarFinalizado: {
    backgroundColor: 'gray',
  },
  menuAcciones: {
    position: 'absolute',
    right: 50,
    zIndex: 150,
  },
  fila: {
    position: 'relative',
  },
  downloadIcon: {
    fill: '#f9aa33',
  },
  downloadText: {
    color: '#f9aa33',
    padding: '0 16px',
  },
  detailText: {
    padding: '0 16px',
  },
  empty: {
    color: grey[500],
  },
  taleCell: {
    color: '#28950F !important',
  },
});

class EnhancedTable extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      showSearchTextField: false,
      showAcciones: 0,
    };
  }

  componentWillMount(){
    const {
      foo: {
        handleSearchTextFieldAction,
      },
    } = this.props;
    handleSearchTextFieldAction('');
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleTableData = () => {
    this.setState(prevState => ({ 
      filterData: prevState.data,
      selected: [],
    }));
  }

  handleToggleShowSearchTextField = () => {
    this.setState(prevState => ({ 
      showSearchTextField: !prevState.showSearchTextField,
      searchTextField: '',
      filterData: prevState.data,
    }));
  }

  handleShowAcciones = (id) => {
    this.setState({ showAcciones: id});
  }

  renderClaseSeguimientoEtapas = (etapa) => {
    switch(etapa){
      case 'En Tiempo':
        return this.props.classes.avatarEnTiempo;
      case 'Atrasado':
        return this.props.classes.avatarAtrasado;
      default:
        return this.props.classes.avatarFinalizado;
    }
  }

  renderClaseChipSeguimientoEtapas = (etapa) => {
    switch(etapa){
      case 'En Tiempo':
        return this.props.classes.chipEnTiempo;
      case 'Atrasado':
        return this.props.classes.chipAtrasado;
      default:
        return this.props.classes.chipFinalizado;
    }
  }

  isSelected = id => this.props.params.selected.indexOf(id) !== -1;

  render() {
    const { 
      classes,
      foo: {
        handleSetClienteAction,
        handleDownloadFilesAction,
        handleShowSearchTextFieldAction,
        handleSearchTextFieldAction,
        handleShowFiltersAction,
        handleFocusedInputAction,
        handleChangeDatesAction,
        handleSelectedAction,
        handleRowsPerPageAction,
        handleChangePageAction,
      },
      params: {
        filterData,
        order,
        orderBy,
        selected, 
        rowsPerPage,
        page,
        showFilters,
        showSearchTextField,
        searchTextField, 
        startDate, 
        endDate, 
        focusedInput,
        rows,
      },
      permisos,
    } = this.props;

    // const { filterData, order, orderBy, selected, rowsPerPage, page, showFilters, showSearchTextField, searchTextField, startDate, endDate, focusedInput } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filterData.length - page * rowsPerPage);
    
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length}
          showFilters={showFilters}
          onClickShowFilters={handleShowFiltersAction}
          onChangeSelectedPlaza={this.handleTableData}
          onClickAwayFilters={this.handleCloseFilters}
          showSearchTextField={showSearchTextField}
          onClickShowSearchTextField={handleShowSearchTextFieldAction}
          onChangeSearchTextField={handleSearchTextFieldAction}
          searchTextField={searchTextField}
          startDate={startDate}
          endDate={endDate}
          focusedInput={focusedInput}
          onClickFocusedInput={handleFocusedInputAction}
          onChangeDates={handleChangeDatesAction}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={filterData.length}
              rows={rows}
            />
            <TableBody>
              {stableSort(filterData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                
                  // Validar para mostrar el campo de la tabla
                  const keys = rows.filter(row => (typeof row.show === 'undefined' || row.show === 'true')).map(row => row.id)
                  const tableCells = () => keys.filter(item => item !== 'Acciones').map((item) => (
                    <TableCell key={uniqueId('cell_')} align="left" style={{ padding: '0 10px', fontSize: 11}}>
                      { 
                        item === 'Estatus' 
                          ? (
                            <Chip
                              avatar={
                                <Avatar className={`${classes.avatar} ${this.renderClaseSeguimientoEtapas(n[item])}`}></Avatar>}
                              label={<span className={classes.spanChip}>{n[item]}</span>}
                              className={`${classes.chip} ${ this.renderClaseChipSeguimientoEtapas(n[item]) }`}
                              color="primary"
                              variant="outlined"
                            />)
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
                      key={uniqueId('row_')}
                      selected={isSelected}
                      className={classes.fila}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox onClick={event => handleSelectedAction(event, n.id)} checked={isSelected} style={{color: '#28950F'}} />
                      </TableCell>
                      {
                        tableCells()
                      }
                      <TableCell key={uniqueId('cell_')} align="center" padding="none">
                        {
                          n.Estatus ? (
                            <IconButton disabled={!isSelected || n.Estatus === 'Finalizado'} onClick={() => this.handleShowAcciones(n.id) }>
                              <MoreVert />
                            </IconButton>
                          ) : (
                            <IconButton disabled={!isSelected} onClick={() => this.handleShowAcciones(n.id) }>
                              <MoreVert />
                            </IconButton>
                          )
                        }
                        <Popper open={this.state.showAcciones === n.id && isSelected} transition disablePortal className={classes.menuAcciones}>
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              id="menu-list-grow"
                              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                              <Paper>
                                {permisos.especiales.descargararchivo === 1 ?
                                  <MenuItem onClick={() => handleDownloadFilesAction(n.id)}>
                                    <CloudDownloadIcon className={classes.downloadIcon} />
                                    <span className={classes.downloadText}>Descargar documentos</span>
                                  </MenuItem>
                                  : 
                                  null
                                }
                                <MenuItem onClick={() => handleSetClienteAction(n.id)}>
                                  <KeyboardTabIcon />
                                  <span className={classes.detailText}>Seguimiento cliente</span>
                                </MenuItem>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={12} style={{ textAlign: 'center'}}>
                    <React.Fragment>
                      <img
                        key="Sin resultados"
                        src={SinResultados}
                        style={{ width:'150px',height: '150px', display: 'block', margin: '0 auto'}}
                        alt="¡No se encontraron coincidencias! Sin resultados obtenidos."
                      />
                      <span style={{display: 'block'}}>¡No se encontraron coincidencias! Sin resultados obtenidos.</span>
                    </React.Fragment>
                  </TableCell>

                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filterData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Registros por tabla"
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePageAction}
          onChangeRowsPerPage={(event) => handleRowsPerPageAction(event.target.value)}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  foo: PropTypes.object,
  permisos:PropTypes.object,
};

export default withStyles(styles)(EnhancedTable);
