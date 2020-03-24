/**
 *
 * Spinner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import injectReducer from 'utils/injectReducer';

import { 
  Dialog,
} from '@material-ui/core';

import { withStyles } from "@material-ui/core/styles";
import { css } from '@emotion/core';
import { RingLoader } from 'react-spinners';
import makeSelectSpinner from './store/selectors';
import reducer from './store/reducer';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
const styles = () => ({
  root: {
    backgroundColor: "#00000015",
  },
  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden",
  },
})

class Spinner extends React.PureComponent {
  render() {
    const {
      classes,
      spinner: {
        spinner,
      },
    } = this.props;
    
    return (
      <div>
        <Dialog 
          disableBackdropClick
          disableEscapeKeyDown
          open={spinner}
          className={classes.root}
          aria-labelledby="simple-dialog-title"
          BackdropProps={{
            classes: { root: classes.root },
          }}
          PaperProps={{
            classes: { root: classes.paper },
          }}
        >  
          <div className='sweet-loading'>
            <RingLoader
              css={override}
              sizeUnit='px'
              size={100}
              color='teal'
              loading={spinner}
            />
          </div> 
        </Dialog>
      </div>
    );
  }
}


Spinner.propTypes = {
  classes: PropTypes.object,
  spinner: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  spinner: makeSelectSpinner(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'spinner', reducer });
const withStyle = withStyles(styles)

export default compose(withReducer, withConnect, withStyle)(Spinner);