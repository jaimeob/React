import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  TableHead,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Toolbar,
  TextField,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from '@material-ui/core';
import {
  grey,
} from '@material-ui/core/colors'
import SinResultados from 'images/iconos/EmptySinRegistrosbueno.svg';
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import FilterListIcon from "@material-ui/icons/FilterList";
import ActiveIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteIcon from 'images/iconos/deleteButtonListGrey.png';
import EditIcon from 'images/iconos/editButtonListGrey.png';
import PersonAdd from '@material-ui/icons/PersonAddOutlined';

const useToolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: "1 1 20%",
  },
  actions: {
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

let EnhancedTableToolbar = props => {
  // variables
  const {
    classes,
    activeSearch,
    searchText,
    menuFilterIndex,
    menuFilters,
    anchorElFilter,
    permisos,
  } = props;
  // console.log('permisos',permisos.normales.editar)
  // funciones
  const {
    onClickSearch,
    onChangeTextSearch,
    handleClickFilt,
    handleCloseFilt,
    onClickFilterList,
  } = props;
 
  const buttonSearch = activeSearch ? <ClearIcon/> : <SearchIcon/>;
  const tooltipSearch = activeSearch ? "Limpar" : "Buscar";
  const showTextSearch = activeSearch ? "visible" : "hidden";
  const openMenuFilter = Boolean(anchorElFilter);

  return (
    <Toolbar
      className={classes.root}
    >
      {/* <div className={classes.spacer} />
      <div className={classes.actions}> */}
      <Grid container justify='flex-end'>
        <TextField
          id="standard-search"
          label="Buscar"
          type="search"
          value={searchText}
          className={classes.textField}
          inputProps={{maxLength: 50}}
          style={{visibility:showTextSearch}}
          autoFocus
          onChange={(event) => onChangeTextSearch(event.target.value)}
        />
        <Tooltip title={tooltipSearch} disableFocusListener>
          <IconButton
            onClick={onClickSearch}
          >
            {buttonSearch}
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Filtrar" disableFocusListener>
          <span>
            <IconButton
              aria-label="Filter list"
              aria-owns={openMenuFilter ? 'filter-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClickFilt}
            >
              <FilterListIcon />
            </IconButton>
          </span>
    </Tooltip> */}
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
              {/* <Checkbox
                checked={menu.checked}
                style={{color: GreenColor[700]}}
              />
              {iconFilter(menu.option)} */}
              {menu.option}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      {/* </div> */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: T.object.isRequired,
  activeSearch: T.bool,
  onClickSearch: T.func,
  searchText: T.string,
  onChangeTextSearch:T.func,
  menuFilterIndex: T.number,
  menuFilters: T.array,
  anchorElFilter: T.object,
  handleClickFilt: T.func,
  handleCloseFilt: T.func,
  onClickFilterList: T.func,
};

EnhancedTableToolbar = withStyles(useToolbarStyles)(EnhancedTableToolbar);

const useStyles = ({
  root: {
    width: '100%',
    maxHeight: 500,
    overflowY: 'auto',
  },
  table: {
    minWidth: 650,
    '& th': {
      position: 'sticky',
      top: 0,
      background: 'white',
    },
  },
  empty: {
    color: grey[500],
  },
});

const Header = props => {
  const {
    columns,
  } = props;

  return (
    <TableHead>
      <TableRow>
        {columns.map(
          row => (
            <TableCell
              key={row.id}
              align={row.align}
              padding="default"
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

Header.propTypes = {
  columns: T.array.isRequired,
};

class DenseTable extends React.Component {
  state = {
    rowIdHover: -1,
    anchorElFilter: null,
  };

  handleClickFilt = event => {
    this.setState({ anchorElFilter: event.currentTarget });
  };

  handleCloseFilt = () => {
    this.setState({ anchorElFilter: null });
  };

  rowWithMouse = (id) => this.setState({ rowIdHover: id });

  cleanRow = () => this.setState({ rowIdHover: -1 });

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

  showButtonsInRow = (id, status, name, onClickDelete, onClickAssign, haveLawyer) => {
    const {
      rowIdHover,
    } = this.state;
    /* const {
      onClickEditItem,
      onClickDeleteItem,
    } = this.props; */
    let resp;
    const labelEstatus = status === "ACTIVO" ? "Desactivar" : "Activar";
  
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
  
    if(id === rowIdHover) {
      resp = (
        <div>
          {
            this.props.permisos.normales.editar === 1 ?
              <Tooltip title="Editar">
                <IconButton
                  onClick={() => onClickAssign({id, name})}
                >
                  {haveLawyer ?
                    <img alt="logo-Pfd" {...propEdit}/>
                    :
                    <PersonAdd style={{width:'15px', height: '15px'}}/>
                  }
                </IconButton>
              
              </Tooltip>
              : null 
          }
          { status === "ACTIVO" && this.props.permisos.normales.eliminar === 1 ?
            <Tooltip title={labelEstatus}>
              <IconButton
                onClick={() => onClickDelete({
                  idFamilys: [id],
                  state: 'Desactivar',
                })}
              >
                {status === "ACTIVO" ?
                  <img alt="logo-Pfd" {...propDelete}/>
                  :
                  <ActiveIcon style={{ width:'16px', height: '16px'}}/>
                }
              </IconButton>
            </Tooltip>
            :null
          }

          { status !== "ACTIVO" && this.props.permisos.normales.activar === 1 ? 
            <Tooltip title={labelEstatus}>
              <IconButton
                onClick={() => onClickDelete({
                  idFamilys: [id],
                  state: 'Activar',
                })}
              >
                {status === "ACTIVO" ?
                  <img alt="logo-Pfd" {...propDelete}/>
                  :
                  <ActiveIcon style={{ width:'16px', height: '16px'}}/>
                }
                
              </IconButton>
            </Tooltip>
            :null
          }
        </div>
      )
    } else {
      resp = null;
    }
    return resp
  }

  showDetail = (columns, row, onClickDelete, onClickAssign) =>
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.Id}
      onMouseEnter={() => this.rowWithMouse(row.Id)}
      onMouseLeave={() => this.cleanRow()}
    >
      {
        columns.map(column => 
          Object.keys(row).map(propName => {
            if(column.id === propName ) {
              return <TableCell
                key={`cel_${row.Id}_${propName}`}
                scope="row"
                padding="default"
                align={columns.find( col => col.id === propName).align}
                style={ row.idAbogado !== 0 ? {color: '#C9C9C9', fontSize:10} : {fontSize:10} }
              >
                {row[propName]}
              </TableCell>
            }
            return null;
          })
        )
      }
      <TableCell align="right" style={{width:203}}>
        {/* {this.showButtonsInRow(row.Id, row.Estatus, row.Nombre, onClickUpdateRow, onClickEditItem)} */}
        {this.showButtonsInRow(row.Id, 'ACTIVO', row.Nombre, onClickDelete, onClickAssign)}
      </TableCell>
    </TableRow>

  render() {
    const {
      anchorElFilter,
    } = this.state;
    // params
    const {
      classes,
      columns,
      rows,
      activeSearch,
      searchText,
      columnsToSearch,
      menuFilterIndex,
      menuFilters,
      permisos,
    } = this.props
    // actions
    const {
      onClickSearch,
      onChangeTextSearch,
      onClickDelete,
      onClickAssign,
    } = this.props

    const dataTable = this.searchData(rows, columnsToSearch, searchText);
  
    return (
      <div>
        <EnhancedTableToolbar
          activeSearch={activeSearch}
          onClickSearch={onClickSearch}
          searchText={searchText}
          onChangeTextSearch={onChangeTextSearch}
          menuFilterIndex={menuFilterIndex}
          menuFilters={menuFilters}
          anchorElFilter={anchorElFilter}
          handleClickFilt={event => this.handleClickFilt(event)}
          handleCloseFilt={this.handleCloseFilt}
          // onClickFilterList={onClickFilterList}
          // onClickFilterList={() => console.log('clickFilter')}
          permisos={permisos}
        />
        <div className={classes.root} style={dataTable.length > 0 ? {height: 380} : {height: 380}}>
          <Table className={classes.table}>
            <Header
              columns={columns}
            />
            {dataTable.length > 0 ?
              <TableBody>
                {dataTable.map(row => this.showDetail(columns, row, onClickDelete, onClickAssign))}
              </TableBody>
              :
              <TableBody>
                <TableRow style={{ height: 300 }}>
                  <TableCell colSpan={12} align='center'>
                    <img
                      key="imagenKey"
                      src={SinResultados}
                      style={{ width:'200px',height: '175px'}}
                      alt="logo-Pfd"
                    />
                    <span style={{display: 'block'}}>No existen datos para mostrar en las fechas seleccionada.</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            }
          </Table>
        </div>
      </div>
    );
  }
}

DenseTable.propTypes = {
  classes: T.object.isRequired,
  columns: T.array.isRequired,
  rows: T.array,
  activeSearch: T.bool,
  searchText: T.string,
  columnsToSearch: T.array,
  menuFilterIndex: T.number,
  menuFilters: T.array,
  onClickSearch: T.func,
  onChangeTextSearch: T.func,
  onClickDelete: T.func,
  onClickAssign: T.func,
  permisos:T.object,
}

export default withStyles(useStyles)(DenseTable);