
import React from 'react';
import noop from 'lodash/noop';
import Grey from '@material-ui/core/colors/grey';
import T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core/styles';
import {
  compose,
  setPropTypes,
  defaultProps,
} from 'recompose';
import { AppBar, Toolbar, Grid, IconButton, Icon, Typography } from '@material-ui/core';

export const SecondaryToolbar = compose(
  withStyles(() => ({
    appbar: {
      backgroundColor: Grey[200],
    },
  })),
  setPropTypes({
    onClickBackButton: T.func,
    leftIcon: T.string,
    title: T.string,
    classes: T.object,
    showIcon: T.bool,
  }),
  defaultProps({
    onClickBackButton: noop,
    leftIcon: 'menu',
    title: 'topbarTitle',
    classes: {},
    showIcon: false,
  }),
)((props) => {
  const {
    onClickBackButton,
    leftIcon,
    title,
    classes,
    showIcon,
  } = props;
  return (
    <AppBar
      position="static"
    >
      <Toolbar
        variant="dense"
        disableGutters
        className={classes.appbar}
      >
        <Grid
          container
          alignItems="center"
          justify="flex-start"
          spacing={16}
        >
          <Grid
            item
          >
            {showIcon && (
              <IconButton
                onClick={onClickBackButton}
              >
                <Icon>{leftIcon}</Icon>
              </IconButton>
            )}
          </Grid>
          <Grid
            item
          >
            <Typography
              variant="h5"
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
});

export default SecondaryToolbar;
