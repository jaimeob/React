/**
 *
 * PorcentajeCumplimiento
 *
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import moment from 'moment';
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
import { enqueueSnackbar} from 'reducers/notifications/actions';
import XLSX from 'xlsx';
import Spinner from 'components/Spinner';
import { green } from '@material-ui/core/colors';
import { map } from 'lodash';
import makeSelectPorcentajeCumplimiento from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import FilterHeader from './components/FilterHeader';
import ResultTable from './components/ResultTable';

const styles = () => ({
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

export class PorcentajeCumplimiento extends Component {
  componentDidMount() {
    const {
      actions: {
        getPlazasAction,
      },
    } = this.props;
    getPlazasAction()
  }

  onDatesChange = (event) => {
    const {
      actions: {
        setStartDateAction,
        setEndDateAction,
      },
    } = this.props;
    setStartDateAction(event.startDate)
    setEndDateAction(event.endDate)
  }

  onFocusChange = (event) => {
    const {
      actions: {
        setFocusedInputAction,
      },
    } = this.props;
    setFocusedInputAction(event)
  }

  handleGetCompilancePercentage = () => {
    const {
      actions: {
        getCompliancePercentageAction,
      },
      porcentajeCumplimiento: {
        frontend: {
          ui: {
            plazaSelected,
            startDate,
            endDate,
          },
        },
      },
    } = this.props;
    getCompliancePercentageAction(
      plazaSelected, 
      moment(startDate).format('YYYY-MM-DD'), 
      moment(endDate).format('YYYY-MM-DD')
    )
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
        resetCompliancePercentageAction,
      },
      porcentajeCumplimiento: {
        backend: {
          datasources: {
            compliancePercentage: {
              Rows,
            },
          },
        },
      },
    } = this.props;
    setPlazaSelectedAction(plazaSelectedValue)
    if(Rows.length) resetCompliancePercentageAction()
  }

  handleExportExplotion = () => {
    const {
      porcentajeCumplimiento: {
        backend: {
          datasources: {
            compliancePercentage: {
              Headers, 
              Rows,
            },
          },
        },
      },
    } = this.props;
    this.handleDownloadExcel(map(Headers, 'Label'), Rows, 'PorcentajeCumplimiento')
  }

  handleDownloadExcel = ( Columns = [], Rows = [], FileName = 'Descarga') => {
    const {
      enqueueSnackbar: enqueueSnackbarAction,
    } = this.props ;

    if (Rows && Rows.length) {  
      try{
        const dataLayoutPorcentajeCumplimiento = []
        dataLayoutPorcentajeCumplimiento.push(Columns)
        dataLayoutPorcentajeCumplimiento.push(...Rows.map(row => Object.values(row)))
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.aoa_to_sheet(dataLayoutPorcentajeCumplimiento);
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
      porcentajeCumplimiento: rdxStore,
    } = this.props;
    
    const { 
      backend: {
        datasources: {
          plazas,
          compliancePercentage,
        },
      },
      frontend: {
        ui: {
          plazaSelected,
          focusedInput,
          startDate,
          endDate,
        },
      },
    } = rdxStore;
    const propsFilterHeader = {
      data: {
        plaza: {
          plazas,
          plazaSelected,
        },
        dates: {
          focusedInput,
          startDate,
          endDate,
        },
      },
      function: {
        handleSelectedPlaza: this.handleSelectedPlaza,
        handleGetCompilancePercentage: this.handleGetCompilancePercentage,
        onDatesChange: this.onDatesChange,
        onFocusChange: this.onFocusChange,
      },
    }
    const propsResultTable = {
      data: {
        compliancePercentage,
      },
    }
    return (
      <div>
        <Helmet>
          <title>PorcentajeCumplimiento</title>
          <meta
            name="description"
            content="Description of PorcentajeCumplimiento"
          />
        </Helmet>
        <Spinner/>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Porcentaje de Cumplimiento
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          justify="center"
          alignItems="flex-start"
        >
          <Paper
            style={{width: '100%', minHeight:'75vh', margin: 10}}
          >
            <FilterHeader 
              propsFilterHeader={propsFilterHeader}
            />
            <ResultTable
              propsResultTable={propsResultTable}
            />
            <Button
              variant="contained" 
              aria-label="CloudDownload" 
              disabled={compliancePercentage.Rows.length === 0}
              onClick={this.handleExportExplotion}
              className={`${classes.buttonSuccess} ${classes.buttonExport}`}
            > 
              <CloudDownload style={{marginRight: '0.5rem'}} />
              Exportar
            </Button>
          </Paper>
        </Grid>
      </div>
    );
  }
}

PorcentajeCumplimiento.propTypes = {
  enqueueSnackbar: PropTypes.func,
  actions: PropTypes.object,
  classes: PropTypes.object,
  porcentajeCumplimiento: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  porcentajeCumplimiento: makeSelectPorcentajeCumplimiento(),
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

const withReducer = injectReducer({ key: 'porcentajeCumplimiento', reducer });
const withSaga = injectSaga({ key: 'porcentajeCumplimiento', saga });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(PorcentajeCumplimiento);
