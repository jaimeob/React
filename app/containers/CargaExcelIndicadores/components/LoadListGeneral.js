import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Card, Table, TableHead, TableRow, TableCell, TableBody, Typography,
} from '@material-ui/core';
import SinResultados from "images/iconos/EmptySinRegistrosbueno.svg";

const stylesLoadListGeneral = () => ({
  root: {
    marginTop: '1rem',
  },
  table: {
    '& th:first-child': {
      paddingLeft: '1rem',
    },
    '& td:first-child': {
      paddingLeft: '1rem',
    },
    '& th:last-child': {
      paddingRight: '1rem',
    },
    '& td:last-child': {
      paddingRight: '1rem',
    },
  },
  subtitle: {
    marginBottom: '.5rem',
    paddingLeft: '.2rem',
    fontSize: 16,
  },
});

const LoadListGeneral = props => {
  const {
    classes,
    propsLoadListGeneral: {
      data: {
        periodicity,
        headers,
        rows,
      },
      foo: {
        directionCell,
      },
    },
  }=props;

  return (
    <div className={classes.root}>
      <h3 className={classes.subtitle}>Listado de cargas</h3>
      <Card>
        <Table padding='none'className={classes.table}>
          <TableHead>
            {rows.length > 0 ?
              <TableRow>
                {headers.map(head =>
                  <TableCell
                    key={head.column}
                    component="th"
                    align={directionCell(head.type)}
                  >
                    {(() => {
                      let {label} = head;
                      if(head.column  === 'Periodo') {
                        switch (periodicity) {
                          case 'M':
                            label = 'Mes'
                            break;
                          case 'S':
                            label = 'Semana'
                            break;
                          default:
                            label = 'Día'
                            break;
                        }
                      }
                      return label
                    })()}
                  </TableCell>
                )}
              </TableRow>
              :
              null
            }
          </TableHead>
          <TableBody>
            { rows.length > 0 ?
              rows.map(row => (
                <TableRow key={row.IdRow}>
                  {headers.map(head =>
                    <TableCell
                      key={`${row.IdRow}_${row[head.column]}`}
                      component="td"
                      align={directionCell(head.type)}
                    >
                      {row[head.column]}
                    </TableCell>
                  )}
                </TableRow>
              ))
              :
              (
                <TableRow>
                  <TableCell
                    colSpan="3"
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
              )
            }
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

LoadListGeneral.propTypes = {
  classes: PropTypes.object,
  propsLoadListGeneral: PropTypes.object,
}

export default withStyles(stylesLoadListGeneral)(LoadListGeneral)
