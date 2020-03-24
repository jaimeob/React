/**
 *
 * Prueba
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPrueba from './selectors';
import reducer from './reducer';
import saga from './saga';
import TablaMagica from './components/tablaMagica';

/* eslint-disable react/prefer-stateless-function */
export class Prueba extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Prueba</title>
          <meta name="description" content="Description of Prueba" />
        </Helmet>
        <TablaMagica />
      </div>
    );
  }
}

// Prueba.propTypes = {
// };

const mapStateToProps = createStructuredSelector({
  prueba: makeSelectPrueba(),
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

const withReducer = injectReducer({ key: 'prueba', reducer });
const withSaga = injectSaga({ key: 'prueba', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Prueba);
