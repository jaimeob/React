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
import { grey } from '@material-ui/core/colors';
import { Close, CloudDownload } from '@material-ui/icons';

const stylesModalLayout = () => ({
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

const ModalLayout = props => {
  const {
    classes,
    propsModalLayout: {
      data: {
        modalContentLayout,
        layout: {
          content = [],
        },
        currentTypeLoad = null,
      },
      foo: {
        handleModalContentLayout,
        handleExportLayout,
        directionCell,
        transformValue,
      },
    },
  } = props;

  const cellSpecial = name => currentTypeLoad === 3 && name === 'Linea'

  const headers = content && content.length > 0 ? content[0].Content : [];

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={modalContentLayout}
        fullWidth
        maxWidth='lg'
      >
        <DialogTitle
          disableTypography
          className={classes.root}
        >
          <Typography
            style={{textTransform: 'capitalize'}}>
              Ayuda layout
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => handleModalContentLayout(false)}
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
                        key={header.Column}
                        className={
                          cellSpecial(header.Column) ?
                            classes.tableCellSpecial
                            :
                            classes.tableCellSimple
                        }
                        align={directionCell(header.Type)}
                      >
                        {header.Column.toLocaleUpperCase()}
                      </TableCell>)
                    :
                    null
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                { content ?
                  content.map(row => (
                    <TableRow key={`row_${row.Id}`}>
                      {
                        row.Content.map(td =>
                          <TableCell
                            component="td"
                            key={`td_${row.Id}_${td.Column}`}
                            className={
                              cellSpecial(td.Column) ?
                                classes.tableCellSpecial
                                :
                                classes.tableCellSimple
                            }
                            scope="row"
                            align={directionCell(td.Type)}
                          >
                            {transformValue(td.Type, td.Value)}
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
            onClick={() => handleExportLayout()}
            aria-label="CloudDownload"
            className={classes.buttonSuccess}>
            <CloudDownload style={{marginRight: '0.5rem'}} />
            Descargar
          </Button>
          <Button
            variant="contained"
            className={classes.buttonClose}
            onClick={() => handleModalContentLayout(false)}
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ModalLayout.propTypes = {
  classes: PropTypes.object,
  propsModalLayout: PropTypes.object,
}

export default withStyles(stylesModalLayout)(ModalLayout)
