/**
 *
 * DiasPromedio
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
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'
import makeSelectDiasPromedio from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';

import ListaDiasPromedio from './components/ListaDiasPromedio';

export class DiasPromedio extends React.Component {
  constructor(props) {
    super(props);
    this.blured = false;
  }

  getContentByStep = () => {
    const {
      diasPromedio: {
        goal,
        showInfo,
        progressActive,
        openDetail,
        stepper: {
          selectedStep,
        },
        dateStart,
        dateEnd,
        dateInput,
        Table: {
          columns,
          rows,
        },
        Modal: {
          columnsM,
          rowsM,
        },
      },
      actions: {
        handleChangeDateAction,
        requestGoalDaysAction,
        requestDaysAverageDetailAction,
        handleCloseDetailAction,
        changeFechasAction,
        handleDateClickAction,
      },
    } = this.props

    const generalScreenParams = {
      goal,
      showInfo,
      progressActive,
      openDetail,
      columns,
      rows,
      dateStart,
      dateEnd,
      dateInput,
      columnsM,
      rowsM,
    }

    const generalScreenActions = {
      handleChangeDateAction,
      requestGoalDaysAction,
      requestDaysAverageDetailAction,
      handleCloseDetailAction,
      changeFechasAction,
      handleDateClickAction,
    }

    switch (selectedStep) {
      case 0:
        return (
          <ListaDiasPromedio
            params={generalScreenParams}
            actions={generalScreenActions}
          />
        )
      default:
        return null;
    }
  }

  render() {
    const {
      diasPromedio: {
        topbarTitle,
      },
    } = this.props

    const component = this.getContentByStep();

    return (
      <div>
        <Helmet>
          <title>DiasPromedio</title>
          <meta name="description" content="Description of DiasPromedio" />
        </Helmet>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              {topbarTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        {component}
      </div>
    );
  }
}

const paramsState = T.shape({
  topbarTitle: T.string,
  goal: T.number,
  showInfo: T.bool,
  progressActive: T.bool,
  openDetail: T.bool,
  stepper: T.shape({
    selectedStep: T.number,
  }),
  dateStart: T.object,
  dateEnd: T.object,
  dateInput: T.string,
  Table: T.shape({
    columns: T.array,
    rows: T.array,
  }),
  Modal: T.shape({
    columnsM: T.array,
    rowsM: T.array,
  }),
})

const actionsList = T.shape({
  handleChangeDateAction: T.func,
  requestGoalDaysAction: T.func,
  requestDaysAverageDetailAction: T.func,
  handleCloseDetailAction: T.func,
  changeFechasAction: T.func,
  handleDateClickAction: T.func,
})

DiasPromedio.propTypes = {
  diasPromedio: paramsState,
  actions: actionsList,
};

const mapStateToProps = createStructuredSelector({
  diasPromedio: makeSelectDiasPromedio(),
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

const withReducer = injectReducer({ key: 'diasPromedio', reducer });
const withSaga = injectSaga({ key: 'diasPromedio', saga });
const withActions = Actions.bindReduxStore();

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(DiasPromedio);
