import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { noop } from 'redux-saga/utils';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: T.node.isRequired,
  dir: T.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    maxWidth: 520,
    minWidth: 520,
  },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const {
      classes,
      theme,
      tabItems,
      selectedIndexTabs,
      handleChangeIndex,
      handleChangeTabs,
      TabsProps,
    } = this.props;
    const { value } = this.state;
    console.log('value', value)
    
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={selectedIndexTabs}
            className={classes.tabs}
            onChange={handleChangeTabs}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            {...TabsProps}
          >
            {tabItems.length > 0
                && tabItems.map(({ label }) =>
                  <Tab label={label} />
                )}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={selectedIndexTabs}
          onChangeIndex={handleChangeIndex}
        >
          {tabItems.length > 0
              && tabItems.map(({ content }) =>
                <TabContainer
                  dir={theme.direction}
                >
                  {content}
                </TabContainer>
              )}
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  tabItems: T.arrayOf(
    T.shape({
      label: T.string,
      content: T.node,
    })
  ),
  TabsProps: T.object,
  selectedIndexTabs: T.number,
  classes: T.object.isRequired,
  theme: T.object.isRequired,
  handleChangeIndex: T.func.isRequired,
  handleChangeTabs: T.func.isRequired,
};

FullWidthTabs.defaultProps = {
  tabItems: [{
    label: 'Tab label',
    content: (
      <Typography
        variant="subtitle1"
      >
        Tab content
      </Typography>
    ),
  }],
  classes: {},
  theme: {},
  handleChangeIndex: noop,
  selectedIndexTabs: 0,
  handleChangeTabs: noop,
  TabsProps: {},
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
