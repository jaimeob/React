/**
 *
 * ConfiguracionEbitda
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {DAEMON} from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Appbar from 'components/Appbar';
import makeSelectConfiguracionEbitda from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import Tabla from '../CobranzaJudicial/Catalogos/CatalogoEtapas/components/listEtapas/components/Table';
import AlertDialog from '../CobranzaJudicial/Catalogos/CatalogoEtapas/components/listEtapas/components/alertDialog';
import EmptyEbitda from './components/EmptyEbitda';
import RegistrarEbitda from './components/RegistrarEbitda';

/* eslint-disable react/prefer-stateless-function */
export class ConfiguracionEbitda extends React.Component {

  componentDidMount(){
    const {
      actions: {
        requestGetEbitdasAction,
        requestGetPlazasAction,
        obtenerPermisosAction,
      },
    } = this.props;

    requestGetEbitdasAction();
    requestGetPlazasAction();
    // obtenerPermisosAction();
  }

  componentWillUnmount(){
    const {
      actions: {
        handleClickLeaveDialogAction,
        setEbitdaDetailAction,
        requestGetPlazasAction,
        setStepperAction,
      },
    } = this.props;

    handleClickLeaveDialogAction('showDialogReturn');
    setEbitdaDetailAction({
      period: '',
      ebitdaId: 0,
      active: true,
    });
    requestGetPlazasAction();
    setStepperAction(0);
  }

  render() {
    const {
      permisos,
      actions: {
        requestGetEbitdasAction,
        handleClickButtonSearchAction,
        handleChangeTextSearchAction,
        handleClickCheckTableAction,
        handleClickDeleteRowAction,
        handleOpenDialogAction,
        handleClickLeaveDialogAction,
        requestUpdateStatusEbitdaAction,
        setStepperAction,
        setPeriodAction,
        requestPostEbitdaAction,
        requestEbitdaYearAction,
        setProfitabilityAction,
        setEbitdaDetailAction,
        requestGetPlazasAction,
        setMenuFilterIndexAction,
      },
      configuracionEbitda:{
        stepper,
        showDialogDelete,
        showDialogReturn,
        changeWithButton,
        configuracionEbitda: {
          backend: {
            datasources: {
              rows,
            },
          },
          frontend: {
            ui: {
              columns,
              activeSearch,
              rowSelected,
              rowSelectedButton,
              searchText,
              filterOptions,
              menuFilterIndex,
              menuOptions,
            },
          },
        },
        registrarEbitda: {
          frontend: {
            ebitda: {
              period,
              ebitdaId,
              active,
            },
            errors,
          },
          backend: {
            datasources: {
              plazas,
            },
          },
        },
      },
    } = this.props;

    const onClickFilterList = params => {
      let estatus = -1;

      if(params.state === filterOptions[0]){
        estatus = 1;
      } else {
        estatus = 0;
      }
      setMenuFilterIndexAction(params.newIndex)
      requestGetEbitdasAction(estatus);
    }

    const updateStatusEtapas = params => {

      let estatus = -1;
      
      if(params.state === menuOptions[0]){
        estatus = 1;
      } else {
        estatus = 0;
      }

      requestUpdateStatusEbitdaAction({
        rows: params.rows.map(row => row.Id),
        Estatus: estatus,
      })
    }

    const changeStatus = params => {

      if(params.state === "Desactivar"){
        if(params.type === 'button'){
          handleClickDeleteRowAction(params.rows)
        }
        handleOpenDialogAction(params.dialog);
      } else {
        updateStatusEtapas(params);
      }
    }

    const onClickEdit = rowSelect => {
      this.props.actions.requestEditEbitdaAction(rowSelect.Id);
      this.props.actions.setStepperAction(1);
    }

    let component = null;

    const actionsEmptyEbitda = {
      setStepperAction,
    }

    const paramsRegistrarEbitda = {
      period,
      ebitdaId,
      errors,
      plazas,
      active,
    }

    const actionsRegistrarEbitda = {
      setPeriodAction,
      requestPostEbitdaAction,
      handleOpenDialogAction,
      requestEbitdaYearAction,
      setProfitabilityAction,
    }

    switch(stepper){
      case 0: 
        component = <React.Fragment>
          <Appbar 
            texto='Configuración Ebitda'
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
              rows.length > 0 
                ? <Tabla 
                  columns={columns}
                  rows={rows}
                  columnsToSearch={["Anio"]}
                  activeSearch={activeSearch}
                  searchText={searchText}
                  onClickSearch={handleClickButtonSearchAction}
                  onChangeTextSearch={handleChangeTextSearchAction}
                  menuFilterIndex={menuFilterIndex}
                  menuFilters={filterOptions}
                  menuOptions={menuOptions}
                  onClickFilterList={onClickFilterList}
                  onClickUpdateRow={changeStatus}
                  onClickNew={() => setStepperAction(1)}
                  onClickEditItem={onClickEdit}
                  showNew
                  showFilter
                  showOption
                  showActions
                  showChecks
                  onClickCheck={handleClickCheckTableAction}
                  selected={rowSelected}
                  progress={false}
                  permisos={permisos}
                />
                : <EmptyEbitda actions={actionsEmptyEbitda} />
            }
          </div>
        </React.Fragment>
        break;
      case 1:
        component = <React.Fragment>
          <Appbar 
            texto='Registrar ebitda'
            onClickRegresar={() => {
              handleOpenDialogAction('showDialogReturn')
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
            <RegistrarEbitda 
              permisos={permisos} 
              params={paramsRegistrarEbitda} 
              actions={actionsRegistrarEbitda} 
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
          <title>ConfiguracionEbitda</title>
          <meta
            name="description"
            content="Description of ConfiguracionEbitda"
          />
        </Helmet>
        <AlertDialog
          open={showDialogDelete}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmación'
          message='¿Esta seguro que desea eliminar el registro?'
          onClickAccept={() => updateStatusEtapas({state: 'Desactivar', rows: changeWithButton ? rowSelectedButton : rowSelected})}
          onClickCancel={() => handleClickLeaveDialogAction('showDialogDelete')}
        />
        <AlertDialog
          open={showDialogReturn}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmación'
          message='Existen datos no guardados, ¿Desea continuar?'
          onClickAccept={() => {
            handleClickLeaveDialogAction('showDialogReturn');
            setEbitdaDetailAction({
              period: '',
              ebitdaId: 0,
              active: true,
            });
            requestGetPlazasAction();
            setStepperAction(0);
          }}
          onClickCancel={() => handleClickLeaveDialogAction('showDialogReturn')}
        />
        {component}
      </div>
    );
  }
}

ConfiguracionEbitda.propTypes = {
  actions: T.object,
  configuracionEbitda: T.object,
};

const mapStateToProps = createStructuredSelector({
  configuracionEbitda: makeSelectConfiguracionEbitda(),
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

const withReducer = injectReducer({ key: 'configuracionEbitda', reducer });
const withSaga = injectSaga({ key: 'configuracionEbitda', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore()

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(ConfiguracionEbitda);
