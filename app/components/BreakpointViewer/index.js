import React from 'react';
import T from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  withWidth,
} from '@material-ui/core';
import {
  compose,
} from 'recompose';

/* MUI ICONS */
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import TabletIcon from '@material-ui/icons/Tablet';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import TvIcon from '@material-ui/icons/Tv';

const breakpointColor = (match, bp, nbp) =>
  (match === bp || match === (nbp !== '' ? nbp : bp)) ?
    'secondary' : 'default';

const breakpointString = (bp = '') => {
  const breakpoints = {
    xs: 'Celular',
    sm: 'Tablet Vertical',
    md: 'Tablet Horizontal',
    lg: 'Escritorio',
    xl: 'Televisor / Pantalla',
  }
  return breakpoints[bp] || '';
}

let BreakpointsViewer = (props) => {
  const {
    classes,
    width: bp,
  } = props;
  const bpString = breakpointString(bp);
  return (
    <AppBar
      position="static"
      color="default"
      className={classes.root}
    >
      <Toolbar
        className={classes.toolbar}
      >
        <div className={classes.breakpointIcons} >
          <PhoneAndroidIcon
            color={breakpointColor(bp, 'xs')}
            className={classes.muicon}
          />
          <TabletAndroidIcon
            color={breakpointColor(bp, 'sm')}
            className={classes.muicon}
          />
          <TabletIcon
            color={breakpointColor(bp, 'md')}
            className={classes.muicon}
          />
          <DesktopWindowsIcon
            color={breakpointColor(bp, 'lg')}
            className={classes.muicon}
          />
          <TvIcon
            color={breakpointColor(bp, 'xl')}
            className={classes.muicon}
          />
        </div>
        <Typography
          variant="h6"
          color="inherit"
          align="center"
        >
          {bpString}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
        >
          {bp}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

BreakpointsViewer.propTypes = {
  classes: T.object,
  width: T.string,
}

BreakpointsViewer.defaultProps = {
  classes: {},
  width: '',
}

export default BreakpointsViewer = compose(
  withStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    breakpointIcons: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    muicon: {
      margin: theme.spacing.unit,
    },
  })),
  withWidth(),
)(BreakpointsViewer);