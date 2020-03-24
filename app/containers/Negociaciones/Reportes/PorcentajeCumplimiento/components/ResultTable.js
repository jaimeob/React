import React from 'react';
import PropTypes from 'prop-types';
import { 
  withStyles,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow, 
  TableCell,
  Typography,
} from '@material-ui/core';
import SinResultados from "images/iconos/EmptySinRegistrosbueno.svg";
import { uniqueId } from 'lodash';

const stylesResultTable = () => ({
  root: {
    padding: '1rem',
  },
  table: {
    '& th': {
      position: 'sticky',
      top: 0,
      background: 'white',
    },
  },
});


const ResultTable = props => {
  const {
    classes,
    propsResultTable: {
      data: {
        compliancePercentage: {
          Headers,
          Rows,
        },
      },
    },
  } = props;

  return (
    <div className={classes.root}>
      <Paper>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              { 
                Headers.length > 0 ?
                  Headers.map(head => (
                    <TableCell 
                      key={head.Name}
                      align={head.Align}
                    >
                      {head.Label}
                    </TableCell>
                  ))
                  : null
              }
            </TableRow>
          </TableHead>
          <TableBody>
            { Rows.length > 0 ?
              Rows.map(row => (
                <TableRow key={uniqueId('row-')}>
                  {Headers.map(head => (
                    <TableCell
                      key={uniqueId(`cell-${head.name}-`)}
                      align={head.Align}
                    >
                      { 
                        head.Type === 'percent' ? 
                          row[head.Name].toLocaleString('es-MX', { style:'percent', minimumFractionDigits: 0, maximumFractionDigits: 4})
                          : 
                          row[head.Name]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
              :
              <TableRow>
                <TableCell 
                  colSpan={5}
                  align="center"
                >
                  <Typography variant="h6">
                    <img
                      key="sinResultados"
                      src={SinResultados}
                      style={{
                        width: '200px', 
                        height: '175px',
                      }}
                      alt='Logo-pfd'
                    />     
                  </Typography>
                  <Typography 
                    variant="subtitle1"
                  >
                    No se encontraron resultados
                  </Typography>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

ResultTable.propTypes = {
  classes: PropTypes.object,
  propsResultTable: PropTypes.object,
}

export default withStyles(stylesResultTable)(ResultTable)