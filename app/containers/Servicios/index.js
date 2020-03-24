/**
 *
 * Servicios
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  TextField,
} from '@material-ui/core'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';


import MetaHelmet from 'components/MetaHelmet';
import makeSelectServicios from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import {
  // changeTopbarTitleAction,
  Actions, // eslint-disable-line
} from './store/actions';


/* eslint-disable react/prefer-stateless-function */
export class Servicios extends React.Component {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'APP/CONTAINERS/SERVICIOS/UPDATE_NAME',
    //   value: 'Erubiel'
    // });

  }

  onInputChange(event) {
    this.props.actions.updateTopbarTitleAction(event) // eslint-disable-line
  }

  render() {
    return (
      <div>
        <MetaHelmet
          title="Nuevo servicio"
        />
        <TextField
          label="Titulo de topbar"
          onChange={(e) => this.props.dispatch({
            type: 'APP/CONTAINERS/SERVICIOS/UPDATE_TOPBAR_TITLE_ACTION',
            topbarTitle: e.target.value,
          })}
        />
        <TextField
          label="Titulo de topbar"
          onChange={this.props.actions.updateTopbarTitleAction}
        />
      </div>
    );
  }
}

Servicios.propTypes = {
  dispatch: T.func.isRequired,
  actions: T.shape({
    updateTopbarTitleAction: T.func,
  }),
};

const mapStateToProps = createStructuredSelector({
  servicios: makeSelectServicios(),
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

const withReducer = injectReducer({ key: 'servicios', reducer });
const withSaga = injectSaga({ key: 'servicios', saga });
const withActions = Actions.bindReduxStore();
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(Servicios);
