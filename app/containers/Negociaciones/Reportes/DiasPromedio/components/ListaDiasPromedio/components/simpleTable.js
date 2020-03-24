import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  TableHead,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';

import {
  Cancel,
  CheckCircle,
} from "@material-ui/icons";
import {
  green,
  red,
  grey,
} from '@material-ui/core/colors';
import SinResultados from 'images/iconos/EmptySinRegistrosbueno.svg';
import RedirigirIcon from 'images/iconos/redirigir.svg';

const useStyles = ({
  root: {
    width: '100%',
    maxHeight: 400,
    minHeight: 400,
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

const showIconCheck = value =>
  value === 1 ?
    <CheckCircle
      style={{ color: green[400], margin: '0 1rem'}}
    />
    :
    <Cancel
      style={{ color: red[400], margin: '0 1rem'}}
    />

const showDetail = (columns, row, showActions, onClickDetail) =>
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
    {showActions &&
      <TableCell align='right'>
        {showIconCheck(row.CumpleMeta)}
        <Tooltip
          title="Ver Detalle"
          placement="bottom"
          disableFocusListener
        >
          <IconButton
            size="small"
            onClick={() => onClickDetail(row.Id)}
          >
            <img
              key="RedirigirIcon"
              src={RedirigirIcon}
              style={{ width:'15px',height: '15px'}}
              alt="logo-Pfd"
            />
          </IconButton>
        </Tooltip>
      </TableCell>
    }
  </TableRow>

const DenseTable = props => {
  // params
  const {
    classes,
    columns,
    rows,
    showActions,
  } = props
  // actions
  const {
    onClickDetail,
  } = props

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <Header
          columns={columns}
        />
        {rows.length > 0 ?
          <TableBody>
            {rows.map(row => showDetail(columns, row, showActions, onClickDetail))}
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
  showActions: T.bool,
  onClickDetail: T.func,
}

export default withStyles(useStyles)(DenseTable);