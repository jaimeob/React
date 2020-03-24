/**
 *
 * MetaHelmet
 *
 */

import React from 'react';
import T from 'prop-types';
import { Helmet } from 'react-helmet';

// import styled from 'styled-components';

function MetaHelmet({
  title = '',
  helmetProps = {},
  metas = [],
}) {
  return (
    <Helmet {...helmetProps} >
      <title>{title}</title>
      {metas.length && metas.map((metaProps) => 
        <meta {...metaProps} />
      )}
    </Helmet>  
  );
}

MetaHelmet.propTypes = {
  title: T.string,
  helmetProps: T.object,
  metas: T.arrayOf(T.object),
};

MetaHelmet.defaultProps = {
  metas: [],
  helmetProps: {},
};

export default MetaHelmet;
