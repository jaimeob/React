/**
 *
 * Asynchronously loads the component for Formularios
 *
 */
import React from 'react';
import imageLogo from 'images/logo/fincamex-logo.png'
import loadable from '@loadable/component';
// import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {
    position: 'absolute',
    top: 160,
    left: 0,
    width: '100%',
    heigth: '100%',
  },
  image: {
    width: 200,
    heigth: 'auto',
  },
};


const loadableOptions = {
  fallback: (
    <div
      style={styles.root}
    >
      <img
        styles={styles.image}
        src={imageLogo}
        alt="logo"
      />
    </div>
  ),
};

const fnComponent = () => import('./index');
export default loadable(fnComponent, loadableOptions);;
