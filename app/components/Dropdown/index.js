/**
 *
 * Dropdown
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Dropdown() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Dropdown.propTypes = {};

export default Dropdown;
