import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const loading = () => {
  return (<div style={styles.mask}>
    <Fade in={true}>
      <CircularProgress style={styles.circle} />
    </Fade>
  </div>)
}

const styles = {
  mask: {
    background: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: 0, 
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  circle: {
    color: '#28950F',
  },
}

loading.propTypes = {
  loading: PropTypes.bool,
}

export default loading;