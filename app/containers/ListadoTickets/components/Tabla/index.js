import React from 'react';
import classNames from 'classnames';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import config from 'config/config.development';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'; 
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import DeleteIcon from '../../../../images/iconos/deleteButtonList.png'



function desc(a, b, orderBy) {
  // console.log(a,b,orderBy)
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
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      columns,// eslint-disable-line
      allCheck,// eslint-disable-line
    } = this.props;
    // console.log(this.props,"las props")
    return (
      <TableHead className="table-header " >
        <TableRow >
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onClick={onSelectAllClick}
            />
          </TableCell>
          {columns.map(
            col =>  (
              <TableCell
                key={col.id}
                align={col.numeric ? 'right' : 'left'}
                padding={col.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === col.id ? order : false}
              >
                {/* <Tooltip
                  title="Ordenar"
                  placement={col.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                > */}
                <TableSortLabel
                  active={orderBy === col.id}
                  direction={order}
                  onClick={this.createSortHandler(col.id)}
                >
                  {col.label}
                </TableSortLabel>
                {/* </Tooltip> */}
              </TableCell>
            ),this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: T.number.isRequired,
  onRequestSort: T.func.isRequired,
  onSelectAllClick: T.func.isRequired,
  order: T.string.isRequired,
  orderBy: T.string.isRequired,
  rowCount: T.number.isRequired,
// columns: T.func.isRequired,
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
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  fab: {
    right: theme.spacing.unit,
    bottom: theme.spacing.unit,
    position: 'absolute',
  },
});

let EnhancedTableToolbar = props => {

  const {
    numSelected,// eslint-disable-line
    classes,// eslint-disable-line
    onDeleteClick,// eslint-disable-line
    onChangeSearchValue,// eslint-disable-line
    onClickIconSearch,// eslint-disable-line
    searchValue,// eslint-disable-line
    iconsSearch: bolIconSearch,// eslint-disable-line
    handleKeyPress,// eslint-disable-line
    actualizarfiltro,// eslint-disable-line 
  } = props;
  

  const textComponent = bolIconSearch ? (
    <TextField
      className="search-input"
      id="input-with-icon-textfield"
      // label="TextField"
      onKeyUp={actualizarfiltro}
    />
  ) : null;

  const searchIconButton = 
    bolIconSearch ?
      <SearchIcon /> : <SearchIcon /> ;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 1 ? (
          <div>
            <IconButton aria-label="Borrar" onClick={onDeleteClick}>
              <img
                src={DeleteIcon}
                style={{ width:'20px',height: '20px'}}
                alt="logo-Pfd"
              />
            </IconButton>
          </div>
        ) : textComponent }
      </div>
      
      <div>
        <IconButton aria-label="Buscar"  onClick={onClickIconSearch}  >
          {searchIconButton}
        </IconButton>
      </div>
    </Toolbar>
  );
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
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit,
  },
});

class TableComponent extends React.Component {
  state = {
    order: 'asc',
    orderBy: '',
    selected: [],
    data: [],// eslint-disable-line
    filterData: [],// eslint-disable-line
    page: 0,
    rowsPerPage: 5,
    openModal: false,
    dialog:'',// eslint-disable-line
    searchText: '',// eslint-disable-line
    idsSeleccionados:[],// eslint-disable-line
    iconsSearch : false,
    redirect: false,
  };

  
  
  mostrarBuscador = () => this.setState((state) => ({ iconsSearch: !state.iconsSearch }));

  handleRequestSort = (event, property) => {
    
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    const {
      filterData, // eslint-disable-line
    } = this.props;
    if (event.target.checked) {
      this.setState(() => ({
        // selected: state.data.map(n => n.id)
        selected: filterData.map(n => n.id),
      }));
      return;
    }
    this.setState({ selected: [] });
  };


  isSelected = id => this.state.selected.indexOf(id) !== -1;
  

  handleClick = (...args) => {

    const [
      event,// eslint-disable-line
      item,
    ] = args;
    const {
      id,
    } = item;
    this.setState((state) => {
      // BUSCAR EL ID EN EL ARREGLO DE ID SELECCIONADOS
      const index = state.selected.findIndex(mappedId => mappedId === id);
      if (index < 0) {
        return { // inserta id
          selected: [
            ...state.selected,
            id,
          ],
        };
      }
      // si es mayor o igual a 0
      return {
        selected: [
          ...state.selected.slice(0, index),
          ...state.selected.slice(index + 1),
        ],
      }
    })
  }

  handleClickIndividual = (...args) => {
    const [
      event,// eslint-disable-line
      item,
    ] = args;
    const {
      id,
    } = item;
    this.setState((state) => {
      // BUSCAR EL ID EN EL ARREGLO DE ID SELECCIONADOS
      const index = state.selected.findIndex(mappedId => mappedId === id);
      if (index < 0) {
        return { // inserta id
          selected: [
            ...state.selected,
            id,
          ],
        };
      }
      // si es mayor o igual a 0
      return {
        selected: [
          ...state.selected.slice(0, index),
          ...state.selected.slice(index + 1),
        ],
      }
    })
    this.setState({ openModal: true});
    
  }

  toggleSearch = () => {
    this.setState((state) => ({
      iconsSearch: !state.iconsSearch,
      searchText: !state.iconsSearch ? '' : state.searchText,
    }));
  }


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  

  abrirModal = (flag) => {// eslint-disable-line
    this.setState({ openModal: true});
  };

  handleCloseModal = (flag) => () => this.setState({ openModal: flag, selected: [] })


  borrarColumna = (...args) => { // eslint-disable-line
    axios.post(`${config.api.baseURL}/plantillatickets/estatus`, { arregloId : this.state.selected})
      .then(resp => {// eslint-disable-line
      })
      .catch(error => {// eslint-disable-line
      });
    this.setState(() => ({openModal : false, selected: []}))
    const indices = this.state.selected
    const {
      filterData,// eslint-disable-line
    } = this.props;
    this.props.updateDataTable({
      value: indices,
      filterData,
    })
  } 

  configuracionTickets = (...args) => {
    const [
      event,// eslint-disable-line
      item,
    ] = args;
    const {
      id,
    } = item;
    this.setState((state) => { // eslint-disable-line
      // BUSCAR EL ID EN EL ARREGLO DE ID SELECCIONADOS
      const index = state.selected.findIndex(mappedId => mappedId === id);
      if (index < 0) {
        return { // inserta id
          selected: [
            ...state.selected,
            id,
          ],
        };
      }
    })
    this.setState({ redirect: true })
  };

  nuevoTicket = () => {
    this.setState({ redirect: true })
  }

  render() {
    const { classes, columns, filterData, onChangeSearchValue, actualizarfiltro } = this.props;// eslint-disable-line
    const { 
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      redirect,
      // rowCount,
    } = this.state;

    if (redirect) {
      if(this.state.selected.length !== 0){ 
        const ticketEditable = []
        const id = this.state.selected[0]
        filterData .forEach(element => {
          if(element.id === id)
          {
            ticketEditable.push(element)
          }
        });
        return <Redirect to={{pathname: '/configurar-ticket',state: { ticket: ticketEditable[0] }}}/> 
      }
      return <Redirect to='/configurar-ticket' />
    }
              
    filterData.forEach((item) => {
      if(item.empleados === undefined){
        item.empleados = {nombre : "No aplica"}
      }
      if(item.departamentos === undefined){
        item.departamentos = {nombre : "no aplica",id:-1}
      }

    });
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, filterData.length - page * rowsPerPage);
    const confirmModal = (
      <Dialog
        open={this.state.openModal}
        onClose={this.handleCloseModal(true)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
      >
        {this.state.selected.length === 1 ? (
          <DialogTitle id="alert-dialog-title">¿Está seguro que desea eliminar el servicio seleccionado?</DialogTitle>
        ) : <DialogTitle id="alert-dialog-title">¿Está seguro que desea eliminar los servicios seleccionados?</DialogTitle> }
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.borrarColumna} color="primary">
          Si
          </Button>
          <Button onClick={this.handleCloseModal(false)} color="primary" autoFocus>
          No
          </Button>
        </DialogActions>
      </Dialog>
    )
    return (
      <React.Fragment>
        <Grid
          container
          direction="column"
        >
          <Grid
            item
            xs={12}
          >
            <Paper className={classes.root}>
              {confirmModal}
              <EnhancedTableToolbar
                numSelected={selected.length}
                onDeleteClick={this.abrirModal}
                onChangeSearchValue={onChangeSearchValue}
                onClickIconSearch={this.toggleSearch}
                iconsSearch={this.state.iconsSearch}
                actualizarfiltro={actualizarfiltro}
                
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
                    columns={columns}
                    iconsSearch = {this.state.iconsSearch}
                  />
                  <TableBody >
                    
                    
                    {stableSort(filterData, getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(n => {
                    
                        const isSelected = this.isSelected(n.id);
                        // if(){}
                        return (
                          <TableRow
                            hover       
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.id}
                            selected={isSelected}
                            
                          >
                            <TableCell padding="checkbox" >
                              <Checkbox 
                                checked={isSelected} 
                                onClick={event => this.handleClick(event, n)}
                              />
                            </TableCell>
                            <TableCell>
                              {n.nombre}
                            </TableCell>
                            <TableCell>{n.departamentos.nombre}</TableCell>
                            <TableCell>{n.empleados === null ? 'No aplica' : n.empleados.nombre}</TableCell> 
                            <TableCell>
                              {moment(n.createdAt).format('YYYY/MM/DD')}
                            </TableCell>
                            <TableCell>
                              <div style={{width:100}}>
                                <IconButton aria-label="Editar" onClick={event => this.configuracionTickets(event, n)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton aria-label="Borrar" onClick={event => this.handleClickIndividual(event, n)}> 
                                  <img
                                    src={DeleteIcon}
                                    style={{ width:'20px',height: '20px'}}
                                    alt="logo-Pfd"
                                  />
                                </IconButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>

              
              </div>
              
              <TablePagination
                style={{ paddingLeft : 0 }}
                labelRowsPerPage	="Registros por pagina"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filterData.length}
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
              />
            </Paper>
          </Grid>
          <Grid item xs>
            <Fab 
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={this.nuevoTicket}>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        
        <div style={{ flexGrow: 1 }}>
          <Grid
            container
            style={{ padding:10 }}
            justify="flex-end"
          >
            
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

TableComponent.propTypes = {
  classes: T.object.isRequired,
  updateSearchData: T.func,// eslint-disable-line
  updateDataTable: T.func,
};

export default withStyles(styles)(TableComponent);