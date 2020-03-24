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
  Checkbox,
} from '@material-ui/core';
import { grey, green } from '@material-ui/core/colors';
import { Close, CloudDownload, PersonAdd } from '@material-ui/icons';

const stylesModalCharges = () => ({
  root: {
    margin: 0,
    backgroundColor: '#F5F5F5',
    padding: '8px 10px',
  },
  paper:{
    marginTop: '1rem',
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
  tableCellSimple: {
    padding: 0,
    color: 'black',
  },
  tableCellSpecial: {
    padding: 0,
    color: 'black',
    minWidth: '300px',
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

const ModalCharges = props => {
  const {
    classes,
    propsModalCharges:{
      data: {
        chargesFamily: {
          modalCharge,
          listCharges,
        },
      },
      foo: {
        onClickCloseModalCharges,
        handleChangeCharge,
        handleSaveChargeFamily,
      },
    },
  } = props;

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={modalCharge}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle
          disableTypography
          className={classes.root}
        >
          <Typography
            style={{textTransform: 'capitalize'}}>
            <PersonAdd style={{marginRight: '0.5rem', color: 'gray'}} />
              Asignación
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => onClickCloseModalCharges()}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell> </TableCell>
                  <TableCell>
                    Puesto
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { listCharges ?
                  listCharges.map(row => (
                    <TableRow key={`row_${row.IdPuesto}`}>
                      <TableCell>
                        <Checkbox
                          defaultChecked={!!row.Checked}
                          onChange={() => handleChangeCharge(row.IdPuesto, row.Checked)}
                          style={{ color: green[800] }}
                        />
                      </TableCell>
                      <TableCell
                        component="td"
                        scope="row"
                      >
                        {row.Nombre}
                      </TableCell>
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
            onClick={() => handleSaveChargeFamily()}
            aria-label="CloudDownload"
            className={classes.buttonSuccess}>
            <CloudDownload style={{marginRight: '0.5rem'}} />
            Guardar
          </Button>
          <Button
            variant="contained"
            className={classes.buttonClose}
            onClick={() => onClickCloseModalCharges()}
            color="primary"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ModalCharges.propTypes = {
  classes: PropTypes.object,
  propsModalCharges: PropTypes.object,
}

export default withStyles(stylesModalCharges)(ModalCharges)
