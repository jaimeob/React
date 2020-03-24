/**
 *
 * ListadoFamilias
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
import Snackbar from '@material-ui/core/Snackbar';
import makeSelectListadoFamilias from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
// import messages from './store/messages';
import SecondaryToolbar from '../../../../components/SecondaryToolbar'
import ListadoPrincipal from './components/ListadoPrincipal';
import AdministracionFamilias from './components/AdministracionFamilias';


export class ListadoFamilias extends React.Component {
  constructor(props) {
    super(props);
    this.blured = false;
  }

  componentDidMount() {
    const {
      actions: {
        requestGetFamilyAction,
      },
    } = this.props
    requestGetFamilyAction({ state: 'Todos', newIndex: 0, index: 0});
  }

  getContentByStep = () => {
    const {
      listadoFamilias: {
        stepper: {
          selectedStep,
        },
        tableFamily: {
          messageEmptyFamily,
          toolBar: {
            columnsToSearch,
            activeSearch,
            searchText,
            filterFamily,
            preMenuFilterIndex,
            menuFilterIndex,
            menuFilters,
            menuOptions,
          },
          Haeder: {
            headersFamily,
          },
          body: {
            dataFamily,
          },
        },
        adminFamily: {
          idFamily,
          nameFamily,
          totalSubFamilys,
          openList,
          openModalSave,
          openModalSuccess,
          markRequired,
          openModalConfirmExit,
          openModalErrorSave,
          table: {
            toolBar: {
              titleTable,
              columnsToSearch: columnsToSearchAdmin,
              activeSearch: activeSearchAdmin,
              searchText: searchTextAdmin,
            },
            Haeder: {
              headersFamily: headersFamilyAdmin,
            },
            body: {
              dataSubFamily,
              rowsDeleteAdmin,
            },
          },
          listSubFamilys: {
            selectedList,
            toolBar: {
              activeSearch: activeSearchList,
              searchText: searchTextList,
              columnsToSearch: columnsToSearchList,
            },
            Haeder: {
              headersListSubFamilys,
            },
            body: {
              dataListSubFamily,
            },
          },
        },
        chargesFamily: {
          idFamilySelected,
          modalCharge,
          listChargesOrigin,
          listCharges,
        },
      },
      actions: {
        handleClickButtonSearchAction,
        handleChangeTextSearchAction,
        requestGetFamilyAction,
        requestUpdateStatusFamilyAction,
        getChargesDepartamentAction,
        changeModalChargesAction,
        selectedChargeAction,
        saveChargeFamilyAction,
        handleClickAddFamilyAction,
        handleClickBackFamilyAction,
        handleClickEditFamilyAction,
        handleClickButtonSearchAdminAction,
        handleChangeTextSearchAdminAction,
        handleClickDeleteRowAdminFamilyAction,
        handleChangeTextNameFamilyAction,
        handleClickButtonSearchListAction,
        handleChangeTextSearchListAction,
        handleClickCheckListAction,
        handleClickLeaveListAction,
        handleClickAddSubfamilyAction,
        handleClickSaveListAction,
        handleClickExitValidationAction,
        handleClickSaveValidationAction,
        requestSaveSubfamilysAction,
        showModalErrorSaveAction,
      },
    } = this.props;

    const ListadoPrincipalData = {
      tableFamily: {
        messageEmptyFamily,
        toolBar: {
          columnsToSearch,
          activeSearch,
          searchText,
          filterFamily,
          preMenuFilterIndex,
          menuFilterIndex,
          menuFilters,
          menuOptions,
        },
        Haeder: {
          headersFamily,
        },
        body: {
          dataFamily,
        },
      },
      chargesFamily: {
        idFamilySelected,
        modalCharge,
        listChargesOrigin,
        listCharges,
      },
    }

    const AdministracionFamiliasData = {
      adminFamily: {
        idFamily,
        nameFamily,
        totalSubFamilys,
        openList,
        openModalSave,
        openModalSuccess,
        markRequired,
        openModalConfirmExit,
        openModalErrorSave,
        table: {
          toolBar: {
            titleTable,
            columnsToSearchAdmin,
            activeSearchAdmin,
            searchTextAdmin,
          },
          Haeder: {
            headersFamilyAdmin,
          },
          body: {
            dataSubFamily,
            rowsDeleteAdmin,
          },
        },
        listSubFamilys: {
          selectedList,
          toolBar: {
            activeSearch: activeSearchList,
            searchText: searchTextList,
            columnsToSearch: columnsToSearchList,
          },
          Haeder: {
            headersListSubFamilys,
          },
          body: {
            dataListSubFamily,
          },
        },
      },
    }

    // console.log('idFamily: ', idFamily);
    // console.log('nameFamily: ', nameFamily);
    // console.log('saveSubFamilys: ', saveSubFamilys);
    // console.log('dataSubFamily: ', dataSubFamily);
    // console.log('dataListSubFamily: ', dataListSubFamily);
    // console.log('rowsDeleteAdmin: ', rowsDeleteAdmin);
    // console.log('selectedList: ', selectedList);
    /*
console.log('selectedStep: ', selectedStep);
console.log('dataSubFamily: ', dataSubFamily);
console.log('idFamily: ', idFamily);
console.log('totalSubFamilys: ', totalSubFamilys);
console.log('rowsDeleteAdmin: ', rowsDeleteAdmin);
*/
    const ListadoPrincipalActions = {
      handleClickButtonSearchAction,
      handleChangeTextSearchAction,
      requestGetFamilyAction,
      requestUpdateStatusFamilyAction,
      getChargesDepartamentAction,
      changeModalChargesAction,
      selectedChargeAction,
      saveChargeFamilyAction,
      handleClickAddFamilyAction,
      handleClickEditFamilyAction,
    }

    const AdministracionFamiliasActions = {
      handleClickButtonSearchAdminAction,
      handleChangeTextSearchAdminAction,
      handleClickDeleteRowAdminFamilyAction,
      handleChangeTextNameFamilyAction,
      handleClickAddSubfamilyAction,
      handleClickButtonSearchListAction,
      handleChangeTextSearchListAction,
      handleClickCheckListAction,
      handleClickLeaveListAction,
      handleClickSaveListAction,
      handleClickBackFamilyAction,
      handleClickExitValidationAction,
      handleClickSaveValidationAction,
      requestSaveSubfamilysAction,
      showModalErrorSaveAction,
    }

    switch (selectedStep) {
      case 0:
        return (
          <ListadoPrincipal
            ListadoPrincipal={ListadoPrincipalData}
            actions={ListadoPrincipalActions}
          />
        )
      case 1:
        return (
          <AdministracionFamilias
            AdministracionFamilias={AdministracionFamiliasData}
            actions={AdministracionFamiliasActions}
          />
        )
      // case 2:
      //   return <Paper/>;
      default:
        return null;
    }
  }

  render() {
    const {
      listadoFamilias: {
        topbarTitle,
        stepper: {
          selectedStep,
          // totalSteps,
        },
        adminFamily: {
          idFamily,
          nameFamily,
          saveSubFamilys,
          table: {
            body: {
              dataSubFamily,
            },
          },
        },
      },
      usuarioGlobal:{
        IdEmpleado,
      },
      actions: {
        handleClickBackFamilyAction,
        requestSaveSubfamilysAction,
      },
    } = this.props;

    const component = this.getContentByStep();

    // ejecuta el guardado
    if (saveSubFamilys) {
      requestSaveSubfamilysAction({
        idFamilys: idFamily,
        nameFamily,
        employe: IdEmpleado,
        subFamilys: dataSubFamily,
        modal: 'openModalSuccess',
      })
    }

    return (
      <div>
        <Helmet>
          <title>ListadoFamilias</title>
          <meta name="description" content="Description of ListadoFamilias" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <div>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal : 'right' }}
            key={`${'top'},${'right'}`}
            open={false}
            // onClose={handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Error</span>}
          />
          <SecondaryToolbar
            title={topbarTitle}
            // onClickBackButton={handleStepGoBackAction}
            onClickBackButton={() => handleClickBackFamilyAction(0)}
            showIcon={selectedStep > 0}
            leftIcon="arrow_back"
          />
          {component}
        </div>
      </div>
    );
  }
}

const listadoFamiliasState = T.shape({
  topbarTitle: T.string,
  stepper: T.shape({
    selectedStep: T.number,
    totalSteps: T.number,
  }),
  tableFamily: T.shape({
    messageEmptyFamily: T.string,
    toolBar: T.shape({
      columnsToSearch: T.array,
      activeSearch: T.bool,
      searchText: T.string,
      filterFamily: T.string,
      preMenuFilterIndex: T.number,
      menuFilterIndex: T.number,
      menuFilters: T.array,
      menuOptions: T.array,
    }),
    Haeder: T.shape({
      headersFamily: T.array,
    }),
    body: T.shape({
      dataFamily: T.array,
    }),
  }),
  adminFamily: T.shape({
    idFamily: T.number,
    nameFamily: T.string,
    totalSubFamilys: T.number,
    openList: T.bool,
    openModalSave: T.bool,
    saveSubFamilys: T.bool,
    openModalSuccess: T.bool,
    markRequired: T.bool,
    openModalConfirmExit: T.bool,
    openModalErrorSave: T.bool,
    table: T.shape({
      toolBar: T.shape({
        titleTable: T.string,
        columnsToSearch: T.array,
        activeSearch: T.bool,
        searchText: T.string,
      }),
      Haeder: T.shape({
        headersFamily: T.array,
      }),
      body: T.shape({
        dataSubFamily: T.array,
        rowsDeleteAdmin: T.array,
      }),
    }),
    listSubFamilys: T.shape({
      selectedList: T.array,
      toolBar: T.shape({
        activeSearch: T.bool,
        searchText: T.string,
        columnsToSearch: T.array,
      }),
      Haeder: T.shape({
        headersListSubFamilys: T.array,
      }),
      body: T.shape({
        dataListSubFamily: T.array,
      }),
    }),
  }),
  chargesFamily: T.shape({
    idFamilySelected: T.number,
    modalCharge: T.bool,
    listChargesOrigin: T.array,
    listCharges: T.array,
  }),
})

// const familyActions = T.shape({
//   handleClickButtonSearchAction: T.func,
// })

ListadoFamilias.propTypes = {
  listadoFamilias: listadoFamiliasState,
  usuarioGlobal: T.object,
  // actions: familyActions,
  actions: T.shape({
    handleClickButtonSearchAction: T.func,
    handleChangeTextSearchAction: T.func,
    requestGetFamilyAction: T.func,
    requestUpdateStatusFamilyAction: T.func,
    getChargesDepartamentAction: T.func,
    changeModalChargesAction: T.func,
    selectedChargeAction: T.func,
    saveChargeFamilyAction: T.func,
    handleClickAddFamilyAction: T.func,
    handleClickBackFamilyAction: T.func,
    handleClickEditFamilyAction: T.func,
    handleClickButtonSearchAdminAction: T.func,
    handleChangeTextSearchAdminAction: T.func,
    handleClickDeleteRowAdminFamilyAction: T.func,
    handleChangeTextNameFamilyAction: T.func,
    handleClickAddSubfamilyAction: T.func,
    handleClickButtonSearchListAction: T.func,
    handleChangeTextSearchListAction: T.func,
    handleClickCheckListAction: T.func,
    handleClickLeaveListAction: T.func,
    handleClickSaveListAction: T.func,
    handleClickExitValidationAction: T.func,
    handleClickSaveValidationAction: T.func,
    requestSaveSubfamilysAction: T.func,
    showModalErrorSaveAction: T.func,
  }),
};

const mapStateToProps = createStructuredSelector({
  listadoFamilias: makeSelectListadoFamilias(),
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

const withReducer = injectReducer({ key: 'listadoFamilias', reducer });
const withSaga = injectSaga({ key: 'listadoFamilias', saga });
const withActions = Actions.bindReduxStore();

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(ListadoFamilias);
