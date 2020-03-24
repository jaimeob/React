/**
 *
 * ConfiguracionPeriodos
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Appbar from 'components/Appbar';
import { DAEMON } from 'utils/constants';
import makeSelectConfiguracionPeriodoss from './store/selectors';
import reducer from './store/reducer';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import saga from './store/saga';
import Actions from './store/actions';
import TableConfiguracionPeriodo from './Components/Table.js';
import RegistrarPeriodo from './Components/RegistrarPeriodo';
import Modal from '../Formularios/components/ListadoFormulario/components/Modal/alertDialog'; 
import EmptyPeriodos from './Components/EmptyPeriodos';
/* eslint-disable react/prefer-stateless-function */
export class ConfiguracionPeriodos extends React.Component {
  componentDidMount(){
    const {
      actions: {
        obtenerPermisosAction,
        requestGetPeriodsAction,
        requestGetPlazasAction,
      },
    } = this.props;
   
    // obtenerPermisosAction();
    requestGetPeriodsAction();
    requestGetPlazasAction();
  }

  componentWillUnmount(){
    const {
      actions: {
        setCloseModalAction,
        requestGetPlazasAction,
        setPeriodDetailAction,
        setStepperAction,
      },
    } = this.props;
    setCloseModalAction();
    requestGetPlazasAction();
    setPeriodDetailAction({
      periodId: 0,
      period: '',
      closePeriod: 0,
    });
    setStepperAction();
  }

  render() {
    const {
      permisos,
      actions: {
        setStepperAction,
        requestClosePeriodAction,
        setShowSearchTextAction,
        setSearchTextAction,
        setFilterDataAction,
        setShowFiltersAction,
        closeFiltersAction,
        setSelectedAction,
        setPageAction,
        setRowsPerPageAction,
        setDisabledAddButtonAction,
        setModalAction,
        setCloseModalAction,
        setPeriodAction,
        setClosePeriodAction,
        setProfitabilityAction,
        requestPostPeriodAction,
        requestEditPeriodAction,
        setPeriodDetailAction,
        requestGetPlazasAction,
        requestPeriodYearAction,
      },
      configuracionPeriodos: {
        configuracionPeriodo: {
          backend: {
            datasources: {
              data,
            },
          },
          frontend: {
            stepper,
            ui: {
              rows,
              options,
              order,
              orderBy,
              selected,
              page,
              rowsPerPage,
              showFilters,
              showSearchText,
              searchText,
              filterData,
              disabledAddButton,
              totalPlazas,
              modal: {
                show,
                title,
                variant,
                message,
                typeOptions,
              },
            },
          },
        },
        registrarPeriodo: {
          backend: {
            datasources: {
              plazas,
            },
          },
          frontend: {
            ui: {
              periodDetail: {
                periodId,
                period,
                closePeriod,
              },
              errors,
            },
          },
        },
      },
    } = this.props;
  
    let component = null;

    const paramsTableConfiguracionPeriodo = {
      data,
      rows,
      options,
      order,
      orderBy,
      selected,
      page,
      rowsPerPage,
      showFilters,
      showSearchText,
      searchText,
      filterData,
      disabledAddButton,
      totalPlazas,
      title,
    }

    const paramsRegistrarPeriodo = {
      plazas,
      period,
      closePeriod,
      periodId,
      errors,
    }

    const actionsTableConfiguracionPeriodo = {
      setStepperAction,
      requestClosePeriodAction,
      setShowSearchTextAction,
      setSearchTextAction,
      setFilterDataAction,
      setShowFiltersAction,
      closeFiltersAction,
      setSelectedAction,
      setPageAction,
      setRowsPerPageAction,
      setDisabledAddButtonAction,
      setModalAction,
      requestEditPeriodAction,
    }

    const actionsRegistrarPeriodo = {
      setPeriodAction,
      setClosePeriodAction,
      setProfitabilityAction,
      setModalAction,
      requestPostPeriodAction,
      requestPeriodYearAction,
    }

    const actionsEmptyPeriodos = {
      setStepperAction,
    }

    switch(stepper){
      case 0: 
        component = <React.Fragment>
          <Appbar 
            texto='Configuración periodo'
          // onClickRegresar={() => alert()}
          // hayCambios={false}
          />
          <div  
            style={
              {
                height: '85vh',
                padding: '0 8px 8px 8px',
                overflow: 'auto',
              }
            }>
            {
              data.length > 0
                ? <TableConfiguracionPeriodo 
                  permisos={permisos}
                  params={paramsTableConfiguracionPeriodo}
                  actions={actionsTableConfiguracionPeriodo}
                />
                : <EmptyPeriodos actions={actionsEmptyPeriodos} />
            }
          </div>
        </React.Fragment>
        break;
      case 1:
        component = <React.Fragment>
          <Appbar 
            texto='Registrar periodo'
            onClickRegresar={() => {
              setModalAction('Cancel')
              setPeriodDetailAction({
                periodId: 0,
                period: '',
                closePeriod: 0,
              });
            }}
          />
          <div  
            style={
              {
                height: '85vh',
                padding: '0 8px 8px 8px',
                overflow: 'auto',
              }
            }>
            <RegistrarPeriodo 
              permisos={permisos}
              params={paramsRegistrarPeriodo} 
              actions={actionsRegistrarPeriodo}
            />
          </div>
        </React.Fragment>
        break;
      default:
        break;
    }

    return (
      <div>
        <Helmet>
          <title>Configuración Periodos</title>
          <meta
            name="description"
            content="Description of Configuracion Periodos"
          />
        </Helmet>
        {component}
        <Modal 
          open={show}
          typeAlert={variant}
          title={title}
          message={message}
          onClickAccept={() => {
            setCloseModalAction();
            requestGetPlazasAction();
            setPeriodDetailAction({
              periodId: 0,
              period: '',
              closePeriod: 0,
            });
            setStepperAction();
          }}
          typeOptions={typeOptions}
          onClickCancel={() => setCloseModalAction()}
        />
      </div>
    )
  }
}

ConfiguracionPeriodos.propTypes = {
  configuracionPeriodos: T.object,
  actions: T.object,
};

const mapStateToProps = createStructuredSelector({
  configuracionPeriodos: makeSelectConfiguracionPeriodoss(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'configuracionPeriodos', reducer });
const withSaga = injectSaga({ key: 'configuracionPeriodos', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore()

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(ConfiguracionPeriodos);
