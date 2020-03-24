/**
 *
 * ListadoFormulario
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withStyles, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { noop } from 'redux-saga/utils';
import saga from './store/saga';
import reducer from './store/reducer';
import Actions from './store/actions';
import makeSelectListadoFormulario from './store/selectors';

import List from './components/lists/list';
import SearchList from './components/search/searchList';
import TabView from './components/tabs/tab';
import TabsViewer from './components/tabs';
// import FormView from './components/papers/view';
import UsersList from './components/usersList'
// import Registers from './components/registers';
import LayoutFormulario from './components/LayoutFormulario';

/* eslint-disable react/prefer-stateless-function */
const styles = theme => ({
  layoutFormulario: {
    maxHeight: 640,
    minHeight: 640,
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'flex-start',
    border: '1px solid blue',
  },
  layoutGrid: {
    flexGrow: 1,
  },
  layoutPaper: {
    maxWidth: 512,
    minWidth: 512,
    display: 'flex',
    minHeight: 640,
  },
  // paper: { 
  //   maxHeight: 640,
  //   minHeight: 640,
  //   flexGrow: 1,
  //   display: 'flex',
  //   [theme.breakpoints.down('md')]: {
  //     width: '100%',
  //   },
  // },
  subMenu: {
    flexGrow: 1,
    padding: 10,
  },
  subItem: {
    padding: 0,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: 0,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
});

const headerTabs = [
  { id: 0, label: 'Vista General' },
  { id: 1, label: 'Asignar' },
  { id: 2, label: 'Registros' },
]

// const headerTabsList = [
//   { id: 0, label: 'Finalizado' },
//   { id: 1, label: 'En Proceso' },
//   { id: 2, label: 'Pendiente' },
// ]

export class ListadoFormulario extends React.Component {

  componentDidMount() {
    const {
      actions: {
        requestDepartamentsFormsListAction,
      },
    } = this.props;
    requestDepartamentsFormsListAction('00000');
  }

  showGrid = (
    indexTab,
    indexTabList,
    handleChangeIndexTabsListAction,
    dataList,
    dataSent,
    dataUsers,
    handleClickCheckUsersAction,
    allUserSent,
    allUser,
    handleClickCheckAllAction,
    textSearchAssing,
    handleTextSearchChangeListAction,
    addUsers,
    handleClickButtonAddUsersAction,
    flagMessage,
    handleClickButtonsAssingAction,
    handleClickAcceptClearAction,
    idMongoDepartament,
  ) => {
    const {
      actions: {
        handleChangeIndexTabsAction,
        requestToggleAssignationsAction,
      },
    } = this.props;

    let view;
    switch (indexTab) {
      case 0:
        view = null;
        break;
      case 1:
        view = (
          <div>
            <UsersList
              dataSent={dataSent}
              dataUsers={dataUsers}
              onClickCheckSelect={handleClickCheckUsersAction}
              allUserSent={allUserSent}
              allUser={allUser}
              onClickAll={handleClickCheckAllAction}
              textSearch={textSearchAssing}
              onChangeTextSearch={handleTextSearchChangeListAction}
              addUsers={addUsers}
              flagMessage={flagMessage}
              showModal={handleClickButtonsAssingAction}
              cancelSend={handleClickAcceptClearAction}
              idMongoDepartament={idMongoDepartament}
              onClickAddUsers={handleClickButtonAddUsersAction}
              onClickEnviar={requestToggleAssignationsAction}
            />
          </div>
        )
        break;
      case 2:
        view = (
          <TabsViewer
            tabItems={[
              { label: 'Finalizado', content: <h2>Content 1</h2> },
              { label: 'Asignados', content: <h2>Content 2</h2> },
              { label: 'Pendiente', content: <h2>Content 3</h2> },
            ]}
            TabsProps={{
              variant: "scrollable",
              scrollButtons: 'auto',
            }}
            handleChangeTabs={handleChangeIndexTabsAction}
            handleChangeIndex={handleChangeIndexTabsListAction}
            selectedIndexTabs={indexTabList}
          /> 
        )
        break;
      default:
        break;
    }

    return view;
  }

  render() {
    const {
      classes,
      listadoFormulario: {
        frontend: {
          configuracionformulario: {
            Componentes = [],
          },
          selectedTemplate,
          idMongoDepartament,
          search: {
            searchActive,
            textSearch,
          },
          list: {
            data,
          },
          firstTabs: {
            indexTab,
          },
          // preview: {
          //   view,
          // },
          tabList: {
            indexTabList,
            dataList,
          },
          assignList: {
            dataSent,
            dataUsers,
            allUser,
            allUserSent,
            textSearchAssing,
            addUsers,
            flagMessage,
          },
        },
      },
      actions: {
        handleClickItemGroupListAction,
        handleClickButtonSearchAction,
        handleChangeTextSearchAction,
        handleClickCheckUsersAction,
        handleClickCheckAllAction,
        handleChangeIndexTabsViewAction,
        handleChangeIndexTabsListAction,
        handleTextSearchChangeListAction,
        handleClickButtonAddUsersAction,
        handleClickButtonsAssingAction,
        handleClickAcceptClearAction,
        requestFormsTemplatesAction,
        requestToggleAssignationsAction,
      },
    } = this.props;

    return (
      <div>
        <Grid
          container
          justify="center"
          className={classes.root}
          spacing={8}
        >
          <Grid item xs={12} sm={3}>
            <SearchList 
              searchActive={searchActive}
              textSearch={textSearch}
              onClickSearch={handleClickButtonSearchAction}
              onChangeTextSearch={handleChangeTextSearchAction}
            />
            <List
              onClickItemGroup={handleClickItemGroupListAction}
              data={data}
              textSearch={textSearch}
              onClickForm={requestFormsTemplatesAction}
            />
          </Grid> {/** LEFT PANEL */}
          <Grid
            item
            xs={12}
            sm={5}
          >
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
            > 
              <Grid item xs={12}>
                <TabView
                  indexTab={indexTab}
                  changeIndexTab={handleChangeIndexTabsViewAction}
                  tabs={headerTabs}
                  selectedTemplate={selectedTemplate}
                />
                <Paper
                  className={classes.layoutPaper}
                >
                  <Grid
                    item
                    xs={12}
                    id="root-layout-formulario"
                  >
                    <LayoutFormulario
                      components={Componentes}
                      containerProps={{
                        className: classes.layoutFormulario,
                      }}
                      showAddComponentAction={false}
                      showDeleteComponentAction={false}
                      hideTableOptions
                      notFoundMessage="Sin componentes"
                    />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            {this.showGrid(
              indexTab,
              indexTabList,
              handleChangeIndexTabsListAction,
              dataList,
              dataSent,
              dataUsers,
              handleClickCheckUsersAction,
              allUserSent,
              allUser,
              handleClickCheckAllAction,
              textSearchAssing,
              handleTextSearchChangeListAction,
              addUsers,
              handleClickButtonAddUsersAction,
              flagMessage,
              handleClickButtonsAssingAction,
              handleClickAcceptClearAction,
              idMongoDepartament,
              requestToggleAssignationsAction,
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const stateProps = T.shape({
  frontend: T.shape({
    selectedTemplate: T.bool,
    idMongoDepartament: T.string,
    // tabViewActive: T.bool,
    list: T.shape({
      data: T.array,
      data2: T.array,
    },),
    search: T.shape({
      searchActive: T.bool,
      textSearch: T.string,
    },),
    firstTabs: T.shape({
      indexTab: T.number,
    },),
    // preview: T.shape({
    //   view: T.array,
    // },),
    tabsList: T.shape({
      indexTabList: T.number,
      dataList: T.shape({
        finalized: T.array,
        inProcess: T.array,
        pending: T.array,
      }),
    },),
    assignList: T.shape({
      dataSent: T.array,
      dataUsers: T.array,
      allUser: T.bool,
      allUserSent: T.bool,
      textSearchAssing: T.string,
      addUsers: T.bool,
      flagMessage: T.bool,
    }),
  },),
});

const reduxActionsType = T.shape({
  handleClickItemGroupListAction: T.func,
  handleClickButtonSearchAction: T.func,
  handleChangeTextSearchAction: T.func,
  handleClickCheckUsersAction: T.func,
  handleClickCheckAllAction: T.func,
  handleChangeIndexTabsViewAction: T.func,
  handleChangeIndexTabsListAction: T.func,
  handleTextSearchChangeListAction: T.func,
  handleClickButtonAddUsersAction: T.func,
  handleClickButtonsAssingAction: T.func,
  handleClickAcceptClearAction: T.func,
  requestDeptosFormsListAction: T.func,
  requestFormsTemplatesSuccessAction: T.func,
  requestToggleAssignationsAction: T.func,
})

ListadoFormulario.propTypes = {
  classes: T.object,
  listadoFormulario: stateProps,
  actions: reduxActionsType,
};

ListadoFormulario.defaultProps = {
  actions: {
    handleClickItemGroupListAction: noop,
    handleClickButtonSearchAction: noop,
    handleChangeTextSearchAction: noop,
    handleClickCheckUsersAction: noop,
    handleClickCheckAllAction: noop,
    handleChangeIndexTabsViewAction: noop,
    handleChangeIndexTabsListAction: noop,
    handleTextSearchChangeListAction: noop,
    handleClickButtonAddUsersAction: noop,
    handleClickButtonsAssingAction: noop,
    handleClickAcceptClearAction: noop,
    requestDeptosFormsListAction: noop,
    requestFormsTemplatesSuccessAction: noop,
    requestToggleAssignationsAction: noop,
  },
}

const mapStateToProps = createStructuredSelector({
  listadoFormulario: makeSelectListadoFormulario(),
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

const withReducer = injectReducer({ key: 'listadoFormulario', reducer });
const withSaga = injectSaga({ key: 'listadoFormulario', saga });
const withActions = Actions.bindReduxStore();
const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withStyle,
  withConnect,
  withActions,
  withSaga,
)(ListadoFormulario);
