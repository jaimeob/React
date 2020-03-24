/**
 *
 * MonitorVale
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Tabla from 'components/TablaSencilla';
import AppBar from '@material-ui/core/AppBar';
import {
  Toolbar,
  Typography,
  Grid,
} from '@material-ui/core';
import Grey from '@material-ui/core/colors/grey'
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { consultarPrevalesAction } from './actions';
import makeSelectMonitorVale from './selectors';
import reducer from './reducer';
import saga from './saga';
import { subscribeToTimer } from './api';
import { setTimeout } from 'worker-timers';


const styles = () => ({
  paperPrincipal: {
    width: '98%',
    height: 'calc(100% - 48px)',
    overflow: 'auto',
    margin: 'auto',
  },
})

/* eslint-disable react/prefer-stateless-function */
export class MonitorVale extends React.Component {

  componentDidMount(){
    const{
      onConsultarPrevalesAction,
    } = this.props;

    onConsultarPrevalesAction();
  }

  componentDidUpdate(){
    const{
      onConsultarPrevalesAction,
    } = this.props;
    setTimeout(() => onConsultarPrevalesAction(), 10000)
  }

  render() {

    const {
      monitorVale: {
        cabeceras,
        datos,
      },
      classes,
    } = this.props;

    const style = {
      grow: {
        flexGrow: 1,
      },
    };
    return (
      <div>
        <AppBar style={{backgroundColor: Grey[200]}} position="static">
          <Toolbar variant="dense" style={{paddingLeft: 8}}>
            <Typography variant="h6" color="primary" style={style.grow}>
              Monitor de vales
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          justify="center"
          className={classes.paperPrincipal}
          id='gridMonitorVales'
        >
          <Tabla
            // rowsTamano='small'
            sinBorde
            key='tablaMonitorVales'
            id='tablaMonitorVales'
            elevacion={2}
            cabeceras={cabeceras}
            datos={datos}
          />
        </Grid>
      </div>
    );
  }
}

MonitorVale.propTypes = {
  onConsultarPrevalesAction: T.func,
  monitorVale : T.object,
};

const mapStateToProps = createStructuredSelector({
  monitorVale: makeSelectMonitorVale(),
});

function mapDispatchToProps(dispatch) {
  return {
    onConsultarPrevalesAction: () => dispatch(consultarPrevalesAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'monitorVale', reducer });
const withSaga = injectSaga({ key: 'monitorVale', saga });

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect
)(MonitorVale);
