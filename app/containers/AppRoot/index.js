/**
 *
 * AppRoot
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { withRouter } from "react-router";
import makeSelectAppRoot from './selectors';
import reducer from './reducer';
import saga from './saga';

import Main from '../Main';
import Login from '../Login';

/* eslint-disable react/prefer-stateless-function */
export class AppRoot extends React.Component {

  componentWillMount(){
    const {
      history,
      location: {
        pathname,
      },
    } = this.props;

    // Redireccionar si el usuario trata de ingresar a una url diferente a inicio y no está logueado
    if(pathname !== '/'){
      history.push('/');
    }
  }

  render() {
    const usuario = this.props.appRoot.currentUser;

    return (
      <div>
        {
          usuario ? <Main dispatch={this.props.dispatch} /> : <Login dispatch={this.props.dispatch} />
          // <Main dispatch={this.props.dispatch} />
        }
      </div>
    );
  }
}

AppRoot.propTypes = {
  appRoot: T.object,
  history: T.object,
  location: T.object,
  dispatch: T.func,
};

const mapStateToProps = createStructuredSelector({
  appRoot: makeSelectAppRoot(),
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

const withReducer = injectReducer({ key: 'appRoot', reducer });
const withSaga = injectSaga({ key: 'appRoot', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(AppRoot);
