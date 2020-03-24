import React from 'react';
import T from 'prop-types';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  // TablePagination,
  TableRow,
  Paper,
  // IconButton,
  // Tooltip,
  // TextField,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const BuildTableHead = props => {
  const { classes, headers } = props;
  // const paddingType = (disPandding) => disPandding===true ? "none" : "default";

  return (
    <TableHead>
      <TableRow>
        {headers.map(
          (row) => (
            <TableCell
              className={classes.headColumns}
              key={row.id}
              align='left'
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

BuildTableHead.propTypes = {
  classes: T.object.isRequired,
  headers: T.array.isRequired,
};

const BuildCellTable = (classes = {}, columnName, register = {}) => {
  let cell = null ;

  Object.keys(register).forEach(prop => {
    if(columnName.toUpperCase() === prop.toString().toUpperCase())
      cell = <TableCell className={classes.cell} align="left">
        {register[`${prop}`]}
      </TableCell>
  })

  return cell;
}

const BuildTableBody = props => {
  const {
    classes,
    columns,
    body,
  } = props;

  return (
    <TableBody>
      {body.map(row => {
        const tabI = -1;
        // const isSelected = this.isSelected(n.id);
        return (
          <TableRow
            key={row.id}
            className={classes.rows}
            hover
            // role="checkbox"
            // aria-checked={isSelected}
            tabIndex={tabI}
            // selected={isSelected}
            // onMouseEnter={() => this.rowWithMouse(n.id)}
            // onMouseLeave={() => this.cleanRow()}
          >
            {columns.map(column =>
              BuildCellTable(classes, column.dataKey, row)
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

BuildTableBody.propTypes = {
  classes: T.object.isRequired,
  columns: T.array.isRequired,
  body: T.array.isRequired,
}


const styles = theme => ({
  root: {
    height: 'calc(100vh - 165px)',
    minHeight: 512,
    width: '100%',
  },
  table:{
    fontFamily: theme.typography.fontFamily,
    maxHeight: 5,
  },
  headColumns: {
    minWidth: '20px',
    padding:'4px 24px',
  },
  cell: {
    padding:'4px 24px',
  },
});

const TableRegisters = props => {
  const {
    classes,
    columns,
    registers,
  } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <BuildTableHead
          classes={classes}
          headers={columns}
        />
        <BuildTableBody
          classes={classes}
          columns={columns}
          body={registers}
        />
      </Table>
    </Paper>
  );
}

TableRegisters.propTypes = {
  classes: T.object.isRequired,
  columns: T.array.isRequired,
  registers: T.array.isRequired,
}

export default withStyles(styles)(TableRegisters);