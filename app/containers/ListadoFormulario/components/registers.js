import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
// import SimpleTable from './tables/simpleTable';
import VirtualizeTable from './tables/virtualizeTable';
import {columnas} from '../store/state';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 1 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: T.node.isRequired,
  dir: T.string.isRequired,
};

const styles = () => ({
  root: {
    backgroundColor: "#fff",
    width: '100%',
    padding: 0,
  },
});

const FullWidthTabs = (props) => {
  const {
    classes,
    theme,
    index,
    dataList: {
      finalized,
      inProcess,
      pending,
    },
    // dataList,
  } = props;
  return (
    <SwipeableViews
      className={classes.root}
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={index}
    >
      <TabContainer dir={theme.direction}>
        <VirtualizeTable
          columns={columnas.finalized}
          registers={finalized}
        />
      </TabContainer>
      <TabContainer dir={theme.direction}>
        <VirtualizeTable
          columns={columnas.inProcess}
          registers={inProcess}
        />
      </TabContainer>
      <TabContainer dir={theme.direction}>
        <VirtualizeTable
          columns={columnas.pending}
          registers={pending}
        />
      </TabContainer>
    </SwipeableViews>
  );
}

FullWidthTabs.propTypes = {
  classes: T.object.isRequired,
  theme: T.object.isRequired,
  index: T.number,
  dataList: T.shape({
    finalized: T.array,
    inProcess: T.array,
    pending: T.array,
  }),
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);