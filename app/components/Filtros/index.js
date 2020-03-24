/**
 *
 * Filtros
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import T from 'prop-types';


/* eslint-disable react/prefer-stateless-function */
class Filtros extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {bandFiltros : false};
    this.showFiltros = this.showFiltros.bind(this);
  }

  showFiltros(){
    const {
      bandFiltros,
    } = this.state;
    this.setState({bandFiltros: !bandFiltros})
  }

  render() {
    const {
      filtros,
    } = this.props;
    return (
      this.state.bandFiltros ? filtros : null
    );
  }
}

Filtros.propTypes = {
  filtros: T.any,
};

export default Filtros;
