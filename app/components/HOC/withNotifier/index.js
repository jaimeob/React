import React, {
  Component,
} from 'react';
import T from 'prop-types';
import {
  bindActionCreators,
} from 'redux';
import {
  removeSnackbar,
} from 'reducers/notifications/actions';
import {
  connect,
} from 'react-redux';
import {
  withSnackbar,
} from 'notistack';
import {
  createStructuredSelector,
} from 'reselect';
import {
  compose,
  // onlyUpdateForKeys,
} from 'recompose';
import makeSelectNotifications from './selector';

export const withNotifier = (WrappedComponent) => {
  class Notifier extends Component {
    displayed = [];

    storeDisplayed = id => {
      this.displayed = [...this.displayed, id];
    };
  
    componentDidUpdate() {
      const {
        notifier: {
          notifications = [],
        },
      } = this.props;
  
      notifications.forEach(notification => {
        // console.log('notifications.forEach', notification);
        // Do nothing if snackbar is already displayed
        if (this.displayed.includes(notification.key)) return;
        // Display snackbar using notistack
        this.props.enqueueSnackbar(notification.message, notification.options);
        // Keep track of snackbars that we've displayed
        this.storeDisplayed(notification.key);
        // Dispatch action to remove snackbar from redux store
        this.props.removeSnackbar(notification.key);
      });
    }
  
    render() {
      const {
        enqueueSnackbar,
      } = this.props;
      const newProps = Object.assign({}, this.props, {
        notifier: enqueueSnackbar,
      })
      return <WrappedComponent {...newProps} />;
    }
  }
  
  Notifier.propTypes = {
    enqueueSnackbar: T.func.isRequired,
    removeSnackbar: T.func.isRequired,
    notifier: T.object,
  }
  
  const mapStateToProps = createStructuredSelector({
    notifier: makeSelectNotifications(),
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    removeSnackbar,
  }, dispatch);

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  // const withUpdatesForProp = onlyUpdateForKeys([
  //   'notifier',
  // ]);

  return compose(
    withConnect,
  )(withSnackbar(Notifier));
  
}

export default withNotifier;
