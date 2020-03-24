import React from 'react';
import T from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { CloudDownload } from "@material-ui/icons";
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

const CompanyLayout = (props) => {
  const {
    classes,
    propsCompanyLayout: {
      data: {
        modalContentLayout,
        companyLayout,
      },
      foo: {
        handleModalContentLayout,
        handleExportLayout,
        directionCell,
        transformValue,
      },
    },
  } = props;

  return (
    <div>
      <Dialog 
        aria-labelledby="customized-dialog-title"
        open={modalContentLayout}
        fullWidth
        maxWidth='lg'
      >
        <MuiDialogTitle 
          disableTypography
          className={classes.root}
        >
          <Typography variant="h6">Ayuda Layout</Typography>
          <IconButton 
            aria-label="close" 
            className={classes.closeButton} 
            onClick={() => handleModalContentLayout(false)}
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
                      {cabecera.Column.toLocaleUpperCase()}
                    </TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {companyLayout.contenido.map(contenido => (
                <TableRow key={uniqueId('contenido_fila_')}>
                  {
                    contenido.map((cont, idx) => (
                      <TableCell 
                        component="th" 
                        key={uniqueId('contenido_columna_')} 
                        className={classes.tableCell} 
                        scope="row"
                        align={directionCell(companyLayout.cabeceras[idx].TipoDato)}
                      >
                        {transformValue(companyLayout.cabeceras[idx].TipoDato, cont.Value)}
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
            variant="contained" 
            onClick={handleExportLayout}
            aria-label="CloudDownload" 
            className={classes.buttonSuccess}> 
            <CloudDownload style={{marginRight: '0.5rem'}} />
            Exportar
          </Button>
          <Button className={classes.buttonClose} onClick={() => handleModalContentLayout(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CompanyLayout.propTypes = {
  classes: T.object,
  propsCompanyLayout: T.object,
}

const withStyle = withStyles(styles)

export default compose(
  withStyle,
)(CompanyLayout);