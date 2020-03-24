/**
 *
 * PorcentajeMontoNegociado
 *
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import withNotifier from 'components/HOC/withNotifier';
import { 
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Paper,
  Button,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Spinner from 'components/Spinner';
import { enqueueSnackbar} from 'reducers/notifications/actions';
import XLSX from 'xlsx';
import { map } from 'lodash';
import { green } from '@material-ui/core/colors';
import makeSelectPorcentajeMontoNegociado from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import FilterHeader from './components/FilterHeader';
import ResultsTable from './components/ResultsTable';
// import Spinner from './components/Spinner';

const styles = (theme) => ({
  paperclasses: {
    background: 'red',
    '&:hover': {
      background: 'blue',
    },
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
  },
  buttonExport: {
    float: 'right',
    marginBottom: '1rem',
    marginRight: '1rem',
  },
})

export class PorcentajeMontoNegociado extends Component {

  componentDidMount() {    
    const {
      actions: {
        getPlazasAction,
        getFamilysAction,
      },
    } = this.props;

    getPlazasAction()
    getFamilysAction('ACTIVOS')

  }

  handleSelectedPlaza = (event) => {
    const {
      target: {
        value: plazaSelectedValue,
      },
    } = event;
    const {
      actions: {
        setPlazaSelectedAction,
        setFamilySelectedAction,
        resetNegotiatedAmountAction,
      },
      porcentajeMontoNegociado: {
        backend: {
          datasources: {
            negotiatedAmounts: {
              Rows,
            },
          },
        },
      },
    } = this.props;
    setPlazaSelectedAction(plazaSelectedValue)
    setFamilySelectedAction(0)
    if(Rows.length) resetNegotiatedAmountAction()
  }
  
  handleSelectedFamily = (event) => {
    const {
      target: {
        value: familySelectedValue,
      },
    } = event;

    const {
      actions: {
        setFamilySelectedAction,
        getNegotiatedAmountAction,
      },
      porcentajeMontoNegociado: {
        frontend: {
          ui: {
            plazaSelected,
          },
        },
      },
    } = this.props;
    setFamilySelectedAction(familySelectedValue)
    getNegotiatedAmountAction(plazaSelected, familySelectedValue)
    
  }

  handleExportExplotion = () => {
    const {
      porcentajeMontoNegociado: {
        backend: {
          datasources: {
            negotiatedAmounts: {
              Headers, 
              Rows,
            },
          },
        },
      },
    } = this.props;
    this.handleDownloadExcel(map(Headers, 'Name'), Rows, 'PorcentajeMontoNegociado')
  }

  handleDownloadExcel = ( Columns = [], Rows = [], FileName = 'Descarga') => {
    const {
      enqueueSnackbar: enqueueSnackbarAction,
    } = this.props ;

    if (Rows && Rows.length) {  
      try{
        const dataLayoutNegociaciones = []
        const Totals = [
          { Label: 'Por Negociar',
            Name: 'porNegociar',
            Value: 0,
          },
          { Label: 'Negociado',
            Name: 'negociado',
            Value: 0,
          },
        ]
        Rows.forEach( row => { 
          Totals[0].Value += row.PorNegociar
          Totals[1].Value += row.Negociado
        })
        dataLayoutNegociaciones.push(Columns)
        dataLayoutNegociaciones.push(...Rows.map(row => Object.values(row).slice(1)))
        dataLayoutNegociaciones.push([Totals[0].Label, Totals[0].Value, Totals[1].Label, Totals[1].Value])
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.aoa_to_sheet(dataLayoutNegociaciones);
        XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');/* add worksheet to workbook */
        XLSX.writeFile(wb, FileName.concat('.xlsx'))/* write workbook */
      }catch(err){
        enqueueSnackbarAction({
          message: 'Ocurrio un problema al descargar, favor de comunicarse con Soporte.',
          options: { variant: 'error' },
        })
      }
    }else{
      enqueueSnackbarAction({
        message: 'No existe información para descargar, favor de verificar.',
        options: { variant: 'error' },
      })
    }
  }

  render() {
    const {
      classes,
      porcentajeMontoNegociado: rdxStore,
    } = this.props;
    
    const { 
      backend: {
        datasources: {
          plazas,
          familys,
          negotiatedAmounts,
        },
      },
      frontend: {
        ui: {
          plazaSelected,
          familySelected,
        },
      },
    } = rdxStore;

    const porcentTotal = {
      porNegociar: 0,
      negociado: 0,
    }

    negotiatedAmounts.Rows.forEach(row => {
      porcentTotal.porNegociar += row.PorNegociar
      porcentTotal.negociado += row.Negociado
    })
    
    const porcent = porcentTotal.negociado / porcentTotal.porNegociar
    
    const propsFilterHeader = {
      data: {
        plaza: {
          plazas,
          plazaSelected,
        },
        family: {
          familys,
          familySelected,
        },
        percentTotal: porcent,
      },
      function: {
        handleSelectedPlaza: this.handleSelectedPlaza,
        handleSelectedFamily: this.handleSelectedFamily,
      },
    }

    const propsResultsTable = {
      data: { ...negotiatedAmounts },
    }

    return (
      <div>
        <Helmet>
          <title>Porcentaje de Monto Negociado</title>
          <meta
            name="description"
            content="Description of PorcentajeMontoNegociado"
          />
        </Helmet>
        <Spinner/>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Porcentaje de Monto Negociado
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid 
          container
          justify="center"
          alignItems="flex-start"
        > 
          <Grid item xs={12} style={{ margin: 10 }}>
            <Paper>
              <FilterHeader 
                propsFilterHeader={propsFilterHeader}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container >
          <Grid item xs={12} style={{ width: '100vh' }}>
            <ResultsTable 
              propsResultsTable={propsResultsTable}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained" 
              aria-label="CloudDownload" 
              disabled={negotiatedAmounts.Rows.length === 0}
              onClick={this.handleExportExplotion}
              className={`${classes.buttonSuccess} ${classes.buttonExport}`}
            > 
              <CloudDownload style={{marginRight: '0.5rem'}} />
              Exportar
            </Button>
          </Grid>
        </Grid>
            
      </div>
    );
  }
}

PorcentajeMontoNegociado.propTypes = {
  enqueueSnackbar: PropTypes.func,
  actions: PropTypes.object,
  classes: PropTypes.object,
  porcentajeMontoNegociado: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  porcentajeMontoNegociado: makeSelectPorcentajeMontoNegociado(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
  }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'porcentajeMontoNegociado', reducer });
const withSaga = injectSaga({ key: 'porcentajeMontoNegociado', saga });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(PorcentajeMontoNegociado);
