/**
 *
 * CatalogoEtapas
 *
 */

import React, {Component} from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import Appbar from 'components/Appbar';
import { DAEMON } from 'utils/constants';
import makeSelectCatalogoEtapas from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import ListEtapas from './components/listEtapas';

const styles = () => ({})

export class CatalogoEtapas extends Component {

  componentDidMount() {
    const {
      actions: {
        requestGetTypeProcessAction,
      },
    } = this.props;

    requestGetTypeProcessAction();
  }

  getContentByStep = () => {
    const {
      permisos,
      catalogoEtapas: {
        selectedStep,
        showModalNew,
        showDialogDelete,
        changeWithButton,
        backend: {
          rows,
        },
        frontend: {
          processType,
          processSelected,
          columns,
          searchText,
          activeSearch,
          filterOptions,
          menuFilterIndex,
          menuOptions,
          rowSelected,
          rowSelectedButton,
          titleModalNew,
          tipoMovto,
          idEtapa,
          nameEtapa,
          DaysPlazaForeign,
          DaysPlazaLocal,
          comboEtapas,
          positionEtapaSelected,
          idEtapaCombo,
          titleComboModal,
          estatus,
        },
      },
      actions: {
        handleChangeTypeProcessAction,
        handleClickButtonSearchAction,
        handleChangeTextSearchAction,
        handleClickButtonNewAction,
        handleClickLeaveNewAction,
        handleClickCheckTableAction,
        handleOpenDialogAction,
        handleClickLeaveDialogAction,
        requestGetListEtapasAction,
        requestUpdateStatusEtapasAction,
        handleClickDeleteRowAction,
        handleChangeTextModalAction,
        requestEtapasTypeProcessAction,
        handleChangeComboEtapaAction,
        requestCreateEtapaAction,
        handleClickButtonEditAction,
        requestEditEtapaAction,
      },
      usuarioGlobal:{
        UsuarioId,
      },
    } = this.props
  
    const startParams = {
      processType,
      processSelected,
      columns,
      rows,
      searchText,
      activeSearch,
      filterOptions,
      menuFilterIndex,
      menuOptions,
      showModalNew,
      rowSelected,
      showDialogDelete,
      rowSelectedButton,
      changeWithButton,
      titleModalNew,
      tipoMovto,
      idEtapa,
      nameEtapa,
      DaysPlazaForeign,
      DaysPlazaLocal,
      comboEtapas,
      positionEtapaSelected,
      idEtapaCombo,
      titleComboModal,
      permisos,
      estatus,
      UsuarioId,
    }

    const startActions = {
      handleChangeTypeProcessAction,
      handleClickButtonSearchAction,
      handleChangeTextSearchAction,
      handleClickButtonNewAction,
      handleClickLeaveNewAction,
      handleClickCheckTableAction,
      handleOpenDialogAction,
      handleClickLeaveDialogAction,
      requestGetListEtapasAction,
      requestUpdateStatusEtapasAction,
      handleClickDeleteRowAction,
      handleChangeTextModalAction,
      requestEtapasTypeProcessAction,
      handleChangeComboEtapaAction,
      requestCreateEtapaAction,
      handleClickButtonEditAction,
      requestEditEtapaAction,
    }

    switch (selectedStep) {
      case 0:
        return (
          <ListEtapas
            params={startParams}
            actions={startActions}
          />
        )
      default:
        return null;
    }
  }

  render() {
    const {
      catalogoEtapas: {
        topbarTitle,
      },
    } = this.props
    
    const component = this.getContentByStep();

    return (
      <div>
        <Helmet>
          <title>Catálogo de Etapas</title>
          <meta name="description" content="Description of CatalogoEtapas" />
        </Helmet>
        <Appbar 
          texto={topbarTitle}
        />
        <Grid container style={{padding: 10}}>
          <Grid item sm={12}>
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
  showModalNew: T.bool,
  showDialogDelete: T.bool,
  changeWithButton: T.bool,
  backend: {
    rows: T.array,
  },
  frontend: {
    processType: T.array,
    processSelected: T.number,
    columns: T.array,
    searchText: T.string,
    activeSearch: T.bool,
    filterOptions: T.array,
    menuFilterIndex: T.number,
    menuOptions: T.array,
    rowSelected: T.array,
    rowSelectedButton: T.array,
    titleModalNew: T.string,
    tipoMovto: T.number,
    idEtapa: T.number,
    nameEtapa: T.string,
    DaysPlazaForeign: T.string,
    DaysPlazaLocal: T.string,
    comboEtapas: T.array,
    positionEtapaSelected: T.number,
    idEtapaCombo: T.number,
    titleComboModal: T.string,
  },
})

const actionList = T.shape({
  handleChangeTypeProcessAction: T.func,
  handleClickButtonSearchAction: T.func,
  handleChangeTextSearchAction: T.func,
  handleClickButtonNewAction: T.func,
  handleClickLeaveNewAction: T.func,
  handleClickCheckTableAction: T.func,
  handleOpenDialogAction: T.func,
  handleClickLeaveDialogAction: T.func,
  requestGetTypeProcessAction: T.func,
  requestGetListEtapasAction: T.func,
  requestUpdateStatusEtapasAction: T.func,
  handleClickDeleteRowAction: T.func,
  handleChangeTextModalAction: T.func,
  requestEtapasTypeProcessAction: T.func,
  handleChangeComboEtapaAction: T.func,
  requestCreateEtapaAction: T.func,
  handleClickButtonEditAction: T.func,
  requestEditEtapaAction: T.func,
})

CatalogoEtapas.propTypes = {
  permisos: T.object,
  catalogoEtapas: paramsState,
  actions: actionList,
  usuarioGlobal: T.object,
};

const mapStateToProps = createStructuredSelector({
  catalogoEtapas: makeSelectCatalogoEtapas(),
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

const withReducer = injectReducer({ key: 'catalogoEtapas', reducer });
const withSaga = injectSaga({ key: 'catalogoEtapas', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(CatalogoEtapas);
