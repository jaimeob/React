import React, { useState, useEffect } from 'react';
import T from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CloudDownload from '@material-ui/icons/CloudDownload';
import {withStyles} from '@material-ui/core';

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

function EnhancedTableHead(props) {
  const { order, orderBy, headRows } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel style={{fontSize: 12}}>
              <span>{row.label}</span>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const styles = {
  root:{ 
    width: '100%',
    marginTop: '1.5rem',
  },
  exportButton: {
    color: 'white',
    backgroundColor: '#28950f',
    float: 'right',
  },
  icon: {
    marginRight: 10,
    color: 'white',
  },
  title: { 
    paddingLeft: '.2rem',
    fontSize: 16,
  },
  taleCell: {
    color: '#28950F !important',
  },
}

function EnhancedTable({ classes, propsListadoArchivos : { data: { rows, idFila, headRows }, foo: { handleExportarExcel } }, permisos}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if(selectedIndex === -1){
      newSelected.push(name);
    } else {
      newSelected = [];
    }
    
    setSelected(newSelected);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Listado del mes</h3>
      {
        permisos.especiales.descargararchivo === 1 ? (
          <Button 
            variant="contained" 
            disabled={selected.length === 0}
            onClick={() => handleExportarExcel(selected)}
            className={classes.exportButton}
          >
            <CloudDownload className={classes.icon} />
            Exportar
          </Button>
        ) : null
      }
      <Table        
        aria-labelledby="tableTitle"
      >
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
          headRows={headRows}
        />
        <TableBody>
          {stableSort(rows, getSorting(order, orderBy))
            .map((row, index) => {

              // Validar para mostrar el campo de la tabla
              const keys = headRows.filter(key => (typeof key.show === 'undefined' || key.show === 'true')).map(key => key.id)
            
              const tableCells = () => keys.map((item, indexKey) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableCell key={`cell-${indexKey}`} align="left" padding="none" style={{fontSize: 11}}>
                  {
                    row[item] 
                  }
                </TableCell>
              ))

              const isItemSelected = isSelected(row[idFila]);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  onClick={event => handleClick(event, row[idFila])}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row[idFila]}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                      className={classes.taleCell}
                    />
                  </TableCell>
                  {
                    tableCells()
                  }
                  <TableCell align="right">{row.calories}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

EnhancedTable.propTypes = {
  classes: T.object, 
  propsListadoArchivos: T.object,
};

EnhancedTableHead.propTypes = {
  order: T.string,
  orderBy: T.string,
  headRows: T.array,
};

export default withStyles(styles)(EnhancedTable);
