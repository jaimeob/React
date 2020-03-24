import React from 'react';
import T from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { uniqueId } from 'lodash';

const styles = theme => ({
  root: {
    margin: 0,
    backgroundColor: '#F5F5F5',
    fontSize: '1rem',
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    right:10,
    top:10,
    color: theme.palette.grey[500],
    padding: 0,
  },
  dialogContent: {
    padding: 10,
  },
  table: {
    minWidth: 650,
    borderCollapse: 'collapse',
  },
  tableCell: {
    padding: 6,
    color: 'black',
  },
  buttonClose: {
    backgroundColor: '#FF0023',
    color: 'white',
    textTransform: 'initial',
    width: '84.88px',
    '&:hover': {
      backgroundColor: '#d40824 !important',
    },
  },
  buttonGuardar: {
    backgroundColor: '#28950F',
    color: 'white',
    textTransform: 'initial',
    width: '84.88px',
    '&:hover': {
      background: '#1d7109 !important',
    },
  },
});

const CargaBaseModal = (props) => {
  const {
    classes,
    permisos,
    propsCargaBaseModal: {
      data: {
        fileLoad: {
          rows,
          name,
        },
        modalCargaBase,
        companyLayout,
      },
      foo: {
        openModalViewExplotion,
        handlePostFile,
        directionCell,
      },
    },
  } = props;

  return (
    <div>
      <Dialog 
        aria-labelledby="customized-dialog-title"
        open={modalCargaBase}
        fullWidth
        maxWidth='lg'
      >
        <MuiDialogTitle 
          disableTypography
          className={classes.root}
        >
          <Typography variant="h6">{name}</Typography>
          <IconButton 
            aria-label="close" 
            className={classes.closeButton} 
            onClick={() => openModalViewExplotion(false)}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <div className={classes.dialogContent}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {
                  companyLayout.cabeceras.map((cabecera) => 
                    <TableCell 
                      key={uniqueId('cabecera_')} 
                      className={classes.tableCell}
                      align={directionCell(cabecera.TipoDato)}
                    >
                      {cabecera.Column}
                    </TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={uniqueId('row_')}>
                  {
                    companyLayout.cabeceras.map(cabecera => (
                      <TableCell component="th" key={uniqueId('col_')} align={directionCell(cabecera.TipoDato)} className={classes.tableCell} scope="row">
                        {row[cabecera.Column.toLowerCase()]}
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogActions>
          <Button 
            className={classes.buttonClose} 
            onClick={() => openModalViewExplotion(false)}
            color="primary"
          >
            Cerrar
          </Button>
          {
            permisos.normales.registrar ? (
              <Button 
                className={classes.buttonGuardar} 
                onClick={handlePostFile}
                color="primary"
              >
                Guardar
              </Button>
            ) : null
          }
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

CargaBaseModal.propTypes = {
  classes: T.object,
  propsCargaBaseModal: T.object,
  permisos: T.object,
}

const withStyle = withStyles(styles)

export default compose(
  withStyle,
)(CargaBaseModal);