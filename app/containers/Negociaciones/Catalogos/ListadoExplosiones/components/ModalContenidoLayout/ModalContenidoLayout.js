import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import withNotifier from 'components/HOC/withNotifier';
// import { enqueueSnackbar} from 'reducers/notifications/actions';
import {
  withStyles,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { CloudDownload } from "@material-ui/icons";
import injectReducer from 'utils/injectReducer';
import { green, red } from '@material-ui/core/colors';
import { uniqueId, capitalize } from 'lodash';
import makeSelectNegociaciones from '../../store/selectors';
import reducer from '../../store/reducer';
import Actions from '../../store/actions';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    width: '100%',
    tableLayout: 'fixed',
  },
  buttonClass: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
  },
  buttonError: {
    backgroundColor: '#FF0023',
    color: 'white',
    '&:hover': {
      background: red[900],
    },
  },
})
export class ModalContentLayout extends React.Component{

  handleGoOut = () => {
    const {
      actions: {
        showModalContentLayoutAction,
      },
    } = this.props;
    showModalContentLayoutAction(false)
  }

  render(){
    const {
      classes,
      negociaciones: {
        backend:{
          datasources:{
            layoutNegociaciones:{
              Labels: layoutLabels,
              Columns: layoutColunms,
              Rows: layoutRows,
            },
          },
        },
        frontend:{
          ui:{
            modalContentLayout: openModal,
          },
        },
      },
      downLoadExcel,
    } = this.props;
    
    return(
      <div>
        <Dialog
          open={openModal}
          onClose={this.handleGoOut}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          maxWidth="lg"
          disableBackdropClick
        >
          <DialogTitle id="scroll-dialog-title">Contenido de layout</DialogTitle>
          <DialogContent>
            <Paper>
              <Table className={classes.table}>
                <TableHead>
                  {layoutLabels && layoutLabels.length > 0 ? 
                    <TableRow>
                      { layoutLabels.map(col => (
                        // eslint-disable-next-line react/no-array-index-key
                        <TableCell 
                          align="left" 
                          key={uniqueId(`col_${col}_`)}
                        >
                          {capitalize(col)}
                        </TableCell>      
                      ))}
                    </TableRow>
                    : 
                    <TableRow>
                      <TableCell></TableCell>
                    </TableRow>
                  }
                </TableHead>
                <TableBody>
                  { layoutRows && layoutRows.length > 0 ?
                    layoutRows.map( row => (
                      <TableRow 
                        className={classes.row} 
                        key={`row${row.Id}`} 
                        hover
                      >
                        {
                          row.Contenido.map( cell => (
                            <TableCell 
                              align="center"
                              
                              key={uniqueId('cell_')}
                            >
                              {cell.Value}
                            </TableCell>  
                          ))
                        }
                      </TableRow>
                    ))
                    : 
                    <TableRow>
                      <TableCell>
                        <p>No hay layout cargado...</p>
                      </TableCell>
                    </TableRow>
                  }
                </TableBody> 
              </Table>
            </Paper>
          </DialogContent>
          <DialogActions style={{paddingRight: '15px'}}>
            <Button 
              onClick={this.handleGoOut} 
              className={classes.buttonError}>
              Salir
            </Button>
            <Button 
              onClick={() => downLoadExcel(layoutColunms, layoutRows, 'Layout_Explosiones')} 
              variant="contained"
              className={classes.buttonSuccess} >
              <CloudDownload style={{marginRight: '0.5rem'}} />
              Descargar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
ModalContentLayout.propTypes = {
  // enqueueSnackbar: PropTypes.func,
  actions: PropTypes.object,
  classes: PropTypes.object,
  negociaciones: PropTypes.object,
  downLoadExcel: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  negociaciones: makeSelectNegociaciones(),
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // enqueueSnackbar,      
  }, dispatch);
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'negociaciones', reducer });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)
export default compose(
  withNotifier,
  withReducer,
  withConnect,
  withActions,
  withStyle,
)(ModalContentLayout);