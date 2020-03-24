/**
 *
 * PorcentajeAhorroCompras
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
  Grid,
} from '@material-ui/core'

import makeSelectPorcentajeAhorroCompras from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';

import PorcentajeAhorro from './components/PorcentajeAhorro'


export class PorcentajeAhorroCompras extends React.Component {
  constructor(props) {
    super(props);
    this.blured = false;
  }

  getContentByStep = () => {
    const {
      porcentajeAhorroCompras: {
        goalPorcent,
        showInfo,
        progressActive,
        stepper: {
          selectedStep,
        },
        dateStart,
        dateEnd,
        fechaInput,
        Table: {
          columns,
          rows,
        },
      },
      actions: {
        // handleChangeDateAction,
        requestGoalPorcentSaveAction,
        handleDateClickAction,
        changeFechasAction,
      },
    } = this.props

    const generalScreenParams = {
      goalPorcent,
      showInfo,
      progressActive,
      columns,
      rows,
      dateStart,
      dateEnd,
      fechaInput,
    }

    const generalScreenActions = {
      // handleChangeDateAction,
      requestGoalPorcentSaveAction,
      handleDateClickAction,
      changeFechasAction,
    }

    switch (selectedStep) {
      case 0:
        return (
          <PorcentajeAhorro
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
      porcentajeAhorroCompras: {
        topbarTitle,
      },
    } = this.props

    const component = this.getContentByStep();

    return (
      <div>
        <Helmet>
          <title>PorcentajeAhorroCompras</title>
          <meta
            name="description"
            content="Description of PorcentajeAhorroCompras"
          />
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
  goalPorcent: T.number,
  showInfo: T.bool,
  progressActive: T.bool,
  stepper: T.shape({
    selectedStep: T.number,
  }),
  dateStart: T.object,
  dateEnd: T.object,
  fechaInput: T.string,
  Table: T.shape({
    columns: T.array,
    rows: T.array,
  }),
})

const actionsList = T.shape({
  // handleChangeDateAction: T.func,
  requestGoalPorcentSaveAction: T.func,
  handleDateClickAction: T.func,
  changeFechasAction: T.func,
})

PorcentajeAhorroCompras.propTypes = {
  porcentajeAhorroCompras: paramsState,
  actions: actionsList,
};

const mapStateToProps = createStructuredSelector({
  porcentajeAhorroCompras: makeSelectPorcentajeAhorroCompras(),
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

const withReducer = injectReducer({ key: 'porcentajeAhorroCompras', reducer });
const withSaga = injectSaga({ key: 'porcentajeAhorroCompras', saga });
const withActions = Actions.bindReduxStore();

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(PorcentajeAhorroCompras);
