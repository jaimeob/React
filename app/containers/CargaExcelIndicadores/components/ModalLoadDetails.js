import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogActions,
  Button,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Close } from '@material-ui/icons';
import { uniqueId } from 'lodash';

const stylesModalLoadDetails = () => ({
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
      padding: '0 .2rem',
    },
    '& th': {
      padding: '0 .2rem',
    },
  },
  tableCell: {
    padding: 0,
    color: 'black',
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


const ModalLoadDetails = props => {
  const {
    classes,
    propsModalLoadDetails: {
      data: {
        modalLoadDetails,
        cols,
        rows,
      },
      foo: {
        handleModalLoadDetails,
        handleSave,
        directionCell,
        transformValue,
      },
    },
  } = props;

  return (
    <div className={classes.root}>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={modalLoadDetails}
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
            Listado base
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => handleModalLoadDetails(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  { cols.length > 0 ?
                    cols.map((col) =>
                      <TableCell
                        key={col.Column}
                        className={classes.tableCell}
                        align={directionCell(col.Type)}
                      >
                        {col.Label.toLocaleUpperCase()}
                      </TableCell>)
                    :
                    null
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                { rows ?
                  rows.map(row => (
                    <TableRow key={uniqueId('row_')}>
                      {
                        cols.map(td =>
                          <TableCell
                            component="td"
                            key={uniqueId(`td_${td.Column}`)}
                            className={classes.tableCell}
                            scope="row"
                            align={directionCell(td.Type)}
                          >
                            {transformValue(td.Type, row[td.Column])}
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
            onClick={() => handleSave()}
            className={classes.buttonSuccess}>
            Guardar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleModalLoadDetails(false)}
            className={classes.buttonClose}
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ModalLoadDetails.propTypes = {
  classes: PropTypes.object,
  propsModalLoadDetails: PropTypes.object,
}

export default withStyles(stylesModalLoadDetails)(ModalLoadDetails)
