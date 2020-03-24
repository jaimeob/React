/**
 *
 * AsignacionAbogados
 *
 */

import React, {Component} from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import Appbar from 'components/Appbar';

import { 
  withStyles,
  Toolbar,
  Typography,
  Grid,
} from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import { DAEMON } from 'utils/constants';
import makeSelectAsignacionAbogados from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';

import Asignacion from './components/Asignacion'
import Topbar from '../SeguimientoEtapas/components/Topbar';

const styles = () => ({})

export class AsignacionAbogados extends Component {
  componentDidMount() {
   

    const {
      actions: {
        requestGetCompanysAction,
        requestGetYearAction,
        obtenerPermisosAction,
        requestGetTypesCarterasAction,
        requestGetLawyersAction,
      },
    } = this.props;
    requestGetYearAction();
    requestGetCompanysAction();
    requestGetTypesCarterasAction();
    requestGetLawyersAction();
    // obtenerPermisosAction();
  }

  getContentByStep = () => {
    const {
      permisos,
      asignacionAbogados: {
        selectedStep,
        backend:{
          rows,
        },
        frontend: {
          year,
          companys,
          dates,
          companySelected,
          dateSelected,
          retailWeek,
          textComboDate,
          columns,
          activeSearch,
          searchText,
          columnsToSearch,
          menuFilterIndex,
          menuFilters,
          modalDelete,
          reason,
          modalAssign,
          comboCartera,
          carteraSelected,
          comboLawyer,
          lawyerSelected,
          clientSelected,
        },
      },
      actions: {
        handleChangeCompanyAction,
        handleChangeDateAction,
        handleClickButtonSearchAction,
        handleChangeTextSearchAction,
        requestGetDatesAction,
        requestGetListClientsAction,
        handleOpenModalAction,
        handleChangeTextModalAction,
        handleClickLeaveDialogAction,
        handleChangeCarteraAction,
        handleChangeLawyerAction,
        handleClickLeaveAssignAction,
        requestGetLawyersAction,
        requestGetTypesCarterasAction,
        setClientSelectedAction,
        postGuardarAsignacionAction,
        desactivarAsignacionAction,
      },
    } = this.props

    const paramsAsignacion = {
      year,
      companys,
      dates,
      companySelected,
      dateSelected,
      retailWeek,
      textComboDate,
      columns,
      rows,
      activeSearch,
      searchText,
      columnsToSearch,
      menuFilterIndex,
      menuFilters,
      modalDelete,
      reason,
      modalAssign,
      comboCartera,
      carteraSelected,
      comboLawyer,
      lawyerSelected,
      clientSelected,
    }

    const actionsAsignacion = {
      handleChangeCompanyAction,
      handleChangeDateAction,
      handleClickButtonSearchAction,
      handleChangeTextSearchAction,
      requestGetDatesAction,
      requestGetListClientsAction,
      handleOpenModalAction,
      handleChangeTextModalAction,
      handleClickLeaveDialogAction,
      handleChangeCarteraAction,
      handleChangeLawyerAction,
      handleClickLeaveAssignAction,
      requestGetLawyersAction,
      requestGetTypesCarterasAction,
      setClientSelectedAction,
      postGuardarAsignacionAction,
      desactivarAsignacionAction,
    }

    switch (selectedStep) {
      case 0:
        return (
          <Asignacion
            params={paramsAsignacion}
            actions={actionsAsignacion}
            permisos = {permisos}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {
      asignacionAbogados: {
        topbarTitle,
      },
    } = this.props

    const component = this.getContentByStep();

    return (
      <div>
        <Helmet>
          <title>AsignacionAbogados</title>
          <meta
            name="description"
            content="Description of AsignacionAbogados"
          />
        </Helmet>
        <Appbar 
          texto={topbarTitle}
        />
        <Grid container style={{padding: 10}}>
          <Grid item sm={12} >
            {component}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const paramsState = T.shape({
  topbarTitle: T.string,
  selectedStep: T.number,
  backend: {
    rows: T.array,
  },
  frontend: {
    year: T.number,
    companys: T.array,
    dates: T.array,
    companySelected: T.number,
    dateSelected: T.object,
    retailWeek: T.number,
    textComboDate: T.string,
    columns: T.array,
    activeSearch: T.bool,
    searchText: T.string,
    columnsToSearch: T.array,
    menuFilterIndex: T.number,
    menuFilters: T.array,
    modalDelete: T.bool,
    reason: T.string,
    modalAssign: T.bool,
    comboCartera: T.array,
    carteraSelected: T.number,
    comboLawyer: T.array,
    lawyerSelected: T.number,
  },
})

const actionList = T.shape({
  requestGetCompanysAction: T.func,
  handleChangeCompanyAction: T.func,
  handleChangeDateAction: T.func,
  handleClickButtonSearchAction: T.func,
  handleChangeTextSearchAction: T.func,
  requestGetDatesAction: T.func,
  requestGetListClientsAction: T.func,
  handleOpenModalAction: T.func,
  handleChangeTextModalAction: T.func,
  handleClickLeaveDialogAction: T.func,
  handleChangeCarteraAction: T.func,
  handleChangeLawyerAction: T.func,
  handleClickLeaveAssignAction: T.func,
  requestGetLawyersAction: T.func,
  requestGetTypesCarterasAction: T.func,
})

AsignacionAbogados.propTypes = {
  asignacionAbogados: paramsState,
  actions: actionList,
  // classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  asignacionAbogados: makeSelectAsignacionAbogados(),
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

const withReducer = injectReducer({ key: 'asignacionAbogados', reducer });
const withSaga = injectSaga({ key: 'asignacionAbogados', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(AsignacionAbogados);
