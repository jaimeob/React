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
} from '@material-ui/core';
import {
  grey,
} from '@material-ui/core/colors'
import SinResultados from 'images/iconos/EmptySinRegistrosbueno.svg';

const useStyles = ({
  root: {
    width: '100%',
    maxHeight: 200,
    overflowY: 'scroll',
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
              align={row.direction}
              padding="default"
              // sortDirection={orderBy === row.id ? order : false}
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
  // order: T.string.isRequired,
  // orderBy: T.string.isRequired,
};

const showDetail = (columns, row) =>
  <TableRow
    hover
    role="checkbox"
    tabIndex={-1}
    key={row.Id}
  >
    {
      Object.keys(row).map(propName => {
        if(columns.some( col => col.id === propName )) {
          return <TableCell
            key={`cel_${row.Id}_${propName}`}
            scope="row"
            padding="default"
            align={columns.find( col => col.id === propName).direction}
          >
            {row[propName]}
          </TableCell>
        }
        return null;
      })
    }
  </TableRow>

const DenseTable = props => {
  const {
    classes,
    columns,
    rows,
  } = props

  return (
    <div className={classes.root} style={rows.length > 0 ? {maxHeight: 200} : {maxHeight: 600}}>
      <Table className={classes.table}>
        <Header
          columns={columns}
        />
        {rows.length > 0 ?
          <TableBody>
            {rows.map(row => showDetail(columns, row))}
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
                <Typography variant="h6" className={classes.empty}>
                  No existen datos para mostrar en las fechas seleccionada.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        }
      </Table>
    </div>
  );
}

DenseTable.propTypes = {
  classes: T.object.isRequired,
  columns: T.array.isRequired,
  rows: T.array,
}

export default withStyles(useStyles)(DenseTable);