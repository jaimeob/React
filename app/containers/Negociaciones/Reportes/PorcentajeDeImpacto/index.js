/**
 *
 * PorcentajeDeImpacto
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { 
  AppBar,
  Toolbar,
  Typography,
  Grid,
} from "@material-ui/core";

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPorcentajeDeImpacto from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';

import GeneralScreen from './components/generalScreen';
import DetailScreen from './components/detailScreen';


export class PorcentajeDeImpacto extends React.Component {
  constructor(props) {
    super(props);
    this.blured = false;
  }

  componentDidMount() {
    const {
      actions: {
        requestYearsPorcentImpactAction,
      },
    } = this.props;
    requestYearsPorcentImpactAction();
  }

  selectYear = val => {
    const {
      actions: {
        handleChangeYearPorcentImpactAction,
        requestPorcentImpactAction,
        requestDataImpactGeneralAction,
      },
    } = this.props
    handleChangeYearPorcentImpactAction(val);
    requestPorcentImpactAction(val);
    setTimeout(() => {
      requestDataImpactGeneralAction(val);
    }, (500));
  }

  clickViewDetail = (id, name) => {
    const {
      porcentajeDeImpacto: {
        generalScreen: {
          yearSelected,
        },
      },
      actions: {
        handleClickViewDetailAction,
        requestDataImpactDetailAction,
      },
    } = this.props
    handleClickViewDetailAction(id, name);
    requestDataImpactDetailAction(yearSelected, id);
  }

  getContentByStep = () => {
    const {
      porcentajeDeImpacto: {
        // topbarTitle,
        stepper: {
          selectedStep,
        },
        generalScreen: {
          years,
          yearSelected,
          porcentImpact,
          generalFamily,
          generalData,
          progressActive,
        },
        detailScreen: {
          familySelected,
          nameFamily,
          columns,
          rows,
          activeSearch,
          searchText,
          progressTableActive,
          openConfirmation,
        },
      },
      actions: {
        handleClickExitDetailAction,
        handleClickButtonSearchAction,
        handleChangeTextSearchAction,
        handleOpenModalConfirmationAction,
      },
    } = this.props

    const generalScreenParams = {
      years,
      yearSelected,
      porcentImpact,
      generalFamily,
      generalData,
      progressActive,
    }

    const detailScreenParams = {
      familySelected,
      nameFamily,
      columns,
      rows,
      activeSearch,
      searchText,
      progressTableActive,
      openConfirmation,
    }

    const detailScreenActions = {
      handleClickExitDetailAction,
      handleClickButtonSearchAction,
      handleChangeTextSearchAction,
      handleOpenModalConfirmationAction,
    }

    switch (selectedStep) {
      case 0:
        return (
          <GeneralScreen
            params={generalScreenParams}
            onChangeYear={this.selectYear}
            onClickDetail={this.clickViewDetail}
          />
        )
      case 1:
        return (
          <DetailScreen
            params={detailScreenParams}
            actions={detailScreenActions}
          />
        )
      default:
        return null;
    }
  }

  render() {
    const {
      porcentajeDeImpacto: {
        topbarTitle,
      },
    } = this.props

    const component = this.getContentByStep();

    return (
      <div>
        <Helmet>
          <title>PorcentajeDeImpacto</title>
          <meta name="description" content="Description of PorcentajeDeImpacto" />
        </Helmet>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {topbarTitle}
            </Typography>
          </Toolbar>
        </AppBar>
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
  stepper: T.shape({
    selectedStep: T.number,
    // totalSteps: 2,
  }),
  generalScreen: T.shape({
    years: T.array,
    yearSelected: T.number,
    porcentImpact: T.number,
    generalFamily: T.array,
    generalData: T.shape({
      ObraBlanca: T.shape({
        Porcentaje: T.number,
        Anterior: T.number,
        Actual: T.number,
        Diferencia: T.number,
      }),
      ObraNegra: T.shape({
        Porcentaje: T.number,
        Anterior: T.number,
        Actual: T.number,
        Diferencia: T.number,
      }),
      TotalEdificacion: T.shape({
        Porcentaje: T.number,
        Anterior: T.number,
        Actual: T.number,
        Diferencia: T.number,
      }),
    }),
    progressActive: T.bool,
  }),
  detailScreen: T.shape({
    familySelected: T.number,
    nameFamily: T.string,
    columns: T.array,
    rows: T.array,
    activeSearch: T.bool,
    searchText: T.string,
    progressTableActive: T.bool,
    openConfirmation: T.bool,
  }),
})

const listActions = T.shape({
  requestYearsPorcentImpactAction: T.func,
  handleChangeYearPorcentImpactAction: T.func,
  requestDataImpactGeneralAction: T.func,
  handleClickViewDetailAction: T.func,
  requestDataImpactDetailAction: T.func,
  handleClickExitDetailAction: T.func,
  handleClickButtonSearchAction: T.func,
  handleChangeTextSearchAction: T.func,
  handleOpenModalConfirmationAction: T.func,
})

PorcentajeDeImpacto.propTypes = {
  porcentajeDeImpacto: paramsState,
  actions: listActions,
};

const mapStateToProps = createStructuredSelector({
  porcentajeDeImpacto: makeSelectPorcentajeDeImpacto(),
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

const withReducer = injectReducer({ key: 'porcentajeDeImpacto', reducer });
const withSaga = injectSaga({ key: 'porcentajeDeImpacto', saga });
const withActions = Actions.bindReduxStore();

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(PorcentajeDeImpacto);
