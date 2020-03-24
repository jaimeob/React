import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import { 
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow, 
  TableCell,
  Typography,
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { uniqueId } from 'lodash'
import SinResultados from "images/iconos/EmptySinRegistrosbueno.svg";
// Constante para el tamaño de las columnas fijas
const pxlCellFix = 120

const stylesResultsTable = () => ({
  root: {
    padding:10,
  },
  paper: {
    overflowX: 'scroll',
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
  cellFixed: {
    position: 'sticky', 
    backgroundColor: '#f5f5f5',
    width: `${pxlCellFix}px`,
    minWidth: `${pxlCellFix}px`,
  },
  cellInherit: {
    position: 'inherit', 
    width: `${pxlCellFix}px`,
    minWidth: `${pxlCellFix}px`,
  },
});
const ResultsTable = props => {
  const {
    classes,
    propsResultsTable: {
      data: {
        Headers,
        Rows,
      },
    },
  } = props;
  
  const propsCellFixed = {
    cellFixed: Headers.filter( col => col.Static),
    get countFixed(){
      // eslint-disable-next-line react/no-this-in-sfc
      return this.cellFixed.length
    },
    cellInherit: Headers.filter( col => !col.Static),
    get countInherit(){
      // eslint-disable-next-line react/no-this-in-sfc
      return this.cellInherit.length
    },
    countHeaders: Headers.length,
  }
  const propsTotalAmounts = {
    Totals: [
      { Label: 'Por Negociar',
        Name: 'porNegociar',
        Value: 0,
      },
      { Label: 'Negociado',
        Name: 'negociado',
        Value: 0,
      },
    ],
    Visible: Rows.length > 0,
  }
  Rows.forEach( row => { 
    propsTotalAmounts.Totals[0].Value += row.PorNegociar
    propsTotalAmounts.Totals[1].Value += row.Negociado
  })
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table padding='none'className={classes.table}>
          <TableHead>
            <TableRow>
              <HeadCell
                propsCellFixed={propsCellFixed}
                classes={classes}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            <BodyCell
              propsCellFixed={propsCellFixed}
              classes={classes}
              rows={Rows}
            />
          </TableBody>
        </Table>
        <TotalAmounts
          propsTotalAmounts= {propsTotalAmounts}
          classes= {classes}
        />
        
      </Paper>
    </div>
  );
}

const HeadCell = props => {
  const {
    classes,
    propsCellFixed: {
      cellFixed,
      countFixed,
      cellInherit,
    },
  } = props;
  return(
    <Fragment>
      {cellFixed.map((col, idxCol) => (
        <TableCell 
          key={`cell_${col.Name}`}
          align={col.Align}
          className={classes.cellFixed}
          style={{
            left: idxCol === 0 ? '0px' : `calc(${idxCol * pxlCellFix}px)`,
            paddingRight: Number(idxCol) === (Number(countFixed)-1) && '1rem',
          }}
        > 
          {col.Label}
        </TableCell>
      ))}
      {cellInherit.map((col, idxCol) => (
        <TableCell 
          key={`cell_${col.Name}`}
          align={col.Align}
          className={classes.cellInherit}
          style={{
            paddingLeft: idxCol === 0 && '5px',
          }}
        > 
          {col.Label}
        </TableCell>
      ))}
    </Fragment>
  )
}

const BodyCell = props => {
  const {
    classes,
    propsCellFixed: {
      cellFixed,
      cellInherit,
      countFixed,
    },
    rows,
  } = props;
  return(
    <Fragment>
      {
        rows.length > 0 ?
          rows.map(row => (
            <TableRow
              hover
              key={uniqueId()}
            >
              {[...cellFixed.map((col, idxCol) => (
                <TableCell 
                  key={`${col.Name}_${row.IdSubFamilia}`}
                  align={col.Align}
                  className={classes.cellFixed}
                  style={{ 
                    left: idxCol === 0 ? '0px' : `calc(${idxCol * pxlCellFix}px)`,
                    paddingRight: Number(idxCol) === (Number(countFixed)-1) && '1rem',
                  }}
                > 
                  {
                    (()=>{
                      switch(col.Type) {
                        case 'money':
                          return (row[col.Name].toLocaleString('es-MX', { style:'currency', currency:'MXN', minimumFractionDigits: 0, maximumFractionDigits: 4}));
                        case 'percent':
                          return (row[col.Name].toLocaleString('es-MX', { style:'percent', minimumFractionDigits: 0, maximumFractionDigits: 4}));
                        default:
                          return (row[col.Name]);
                      }
                    })()
                  }
                </TableCell>
              )),
              ...cellInherit.map((col, idxCol) => (
                <TableCell 
                  key={`${col.Name}_${row.IdSubFamilia}`}
                  align={col.Align}
                  className={classes.cellInherit}
                  style={{
                    paddingLeft: idxCol === 0 && '5px',
                  }}
                > 
                  {row[col.Name].toLocaleString('es-MX', { style:'currency', currency:'MXN', minimumFractionDigits: 0, maximumFractionDigits: 4})}
                </TableCell>
              ))]}
            </TableRow>
          ))
          :
          (
            <TableRow>
              <TableCell 
                colSpan={countFixed}
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
    </Fragment>
  )
}

const TotalAmounts = props => {
  const {
    propsTotalAmounts: {
      Totals,
      Visible,
    },
  } = props
  const stylesTypography = {
    position: 'sticky', 
    left: '0px', 
    padding: '1rem 1rem 0 1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
  }
  return (
    <Fragment>
      { 
        Visible ?
          Totals.map(total => (
            <Typography
              key={uniqueId()}
              variant='body1'
              style={{...stylesTypography}}
            >
              <b style={{marginRight: '1rem'}}>{total.Label}</b>
              {total.Value.toLocaleString('es-MX', { style:'currency', currency:'MXN', minimumFractionDigits: 0, maximumFractionDigits: 4})}
            </Typography>
          ))
          :
          null
      }
    </Fragment>
  )
}
ResultsTable.propTypes = {
  classes: PropTypes.object,
  propsResultsTable: PropTypes.object,
}

HeadCell.propTypes = {
  classes: PropTypes.object,
  propsCellFixed: PropTypes.object,
}

BodyCell.propTypes = {
  classes: PropTypes.object,
  propsCellFixed: PropTypes.object,
  rows: PropTypes.array,
}

TotalAmounts.propTypes = {
  propsTotalAmounts: PropTypes.object,
}

export default withStyles(stylesResultsTable)(ResultsTable)