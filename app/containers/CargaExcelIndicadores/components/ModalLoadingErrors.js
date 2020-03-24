import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogActions,
  Button,
  DialogContent,
  Paper,
} from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import { Close } from '@material-ui/icons';

const stylesModalLoadingErrors = () => ({
  root: {
    margin: 0,
    backgroundColor: '#F5F5F5',
    padding: '8px 10px',
  },
  paper:{
    marginTop: '1rem',
    overflowX: 'scroll',
  },
  closeButton: {
    position: 'absolute',
    right:10,
    top:10,
    color: grey[500],
    padding: 0,
  },
  dialogContent: {
    padding: 10,
  },
  dialogActions: {
    marginRight: '1rem',
  },
  table: {
    minWidth: 650,
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
    '& td': {
      padding: '0 .5rem',
    },
    '& th': {
      padding: '0 .5rem',
    },
  },
  cellHead: {
    padding: 0,
    color: 'black',
    fontSize: '12px',
  },
  tableCell: {
    padding: 0,
    color: 'black',
    fontSize: '12px',
  },
  tableCellError: {
    color: 'white',
    padding: 0,
    fontSize: '12px',
    backgroundColor: red[500],
  },
  buttonClose: {
    backgroundColor: '#FF0023',
    color: 'white',
    textTransform: 'initial',
    '&:hover': {
      backgroundColor: '#d40824 !important',
    },
  },
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    textTransform: 'initial',
    '&:hover': {
      background: '#1d7109 !important',
    },
  },
});

const ModalLoadingErrors = props => {
  const {
    classes,
    propsModalLoadingErrors: {
      data: {
        modalLoadingErrors,
        colsLayout,
        rowsErrors,
        rowsLoaded,
      },
      foo: {
        handleModalLoadingErrors,
      },
    },
  } = props;

  const headers = colsLayout && colsLayout.length > 0 ? colsLayout.map(col => col.Column.toLowerCase()) : [];
  headers.unshift("renglon");

  const rowsContent = [];
  rowsLoaded.forEach((row, idxRow) => {
    Object.keys(row).forEach(r => {
      const rowErr = rowsErrors.find(err => err.row === idxRow) || {};
      if (!rowsContent.some((res, idxRes) => idxRes === idxRow)) {
        rowsContent.push({
          renglon: { value: idxRow+1 },
          [r]: {
            value: row[r],
            error: Object.keys(rowErr).length > 0 ? rowErr.cell.some(err => err.column === r) : false,
          },
        })
      } else {
        Object.assign(rowsContent[idxRow], {
          [r]: {
            value: row[r],
            error: Object.keys(rowErr).length > 0 ? rowErr.cell.some(err => err.column === r) : false,
          },
        })
      }
    })
  })
  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={modalLoadingErrors}
        fullWidth
        maxWidth='lg'
      >
        <DialogTitle
          disableTypography
          className={classes.root}
        >
          <Typography
            style={{textTransform: 'capitalize'}}
          >
            Errores de carga
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => handleModalLoadingErrors(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  { headers.length > 0 ?
                    headers.map((header) =>
                      <TableCell
                        key={header}
                        className={classes.cellHead}
                      >
                        {header.toUpperCase()}
                      </TableCell>)
                    :
                    null
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                { rowsErrors ?
                  rowsContent.map(row => (
                    <TableRow key={`ro w_${row.renglon.value}`}>
                      {
                        headers.map(td =>
                          <TableCell
                            component="td"
                            key={`td_${row.renglon.value}_${td}`}
                            className={
                              row[td].error ?
                                classes.tableCellError
                                :
                                classes.tableCell
                            }
                            scope="row"
                          >
                            {row[td].value}
                          </TableCell>
                        )
                      }
                    </TableRow>
                  ))
                  :
                  null
                }
              </TableBody>
            </Table>
          </Paper>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            variant="contained"
            className={classes.buttonClose}
            onClick={() => handleModalLoadingErrors(false)}
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ModalLoadingErrors.propTypes = {
  classes: PropTypes.object,
  propsModalLoadingErrors: PropTypes.object,
}

export default withStyles(stylesModalLoadingErrors)(ModalLoadingErrors)
