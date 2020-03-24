import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
// import SimpleTable from './tables/simpleTable';
import List from './lists/list';

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
    indexTab,
    textSearch,
    onClickForm,
    dataList: {
      assigns,
      finished,
    },
  } = props;
  const {
    handleClickItemGroupListAction,
  } = props

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <SwipeableViews
      className={classes.root}
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={indexTab}
    >
      <TabContainer dir={theme.direction}>
        <List
          onClickItemGroup={handleClickItemGroupListAction}
          onClickForm={onClickForm}
          data={assigns}
          indexTab={indexTab}
          textSearch={textSearch}
        />
      </TabContainer>
      <TabContainer dir={theme.direction}>
        <List
          onClickItemGroup={handleClickItemGroupListAction}
          onClickForm={onClickForm}
          data={finished}
          indexTab={indexTab}
          textSearch={textSearch}
        />
      </TabContainer>
    </SwipeableViews>
  );
}

FullWidthTabs.propTypes = {
  classes: T.object.isRequired,
  theme: T.object.isRequired,
  indexTab: T.number,
  textSearch: T.string,
  onClickForm: T.func,
  dataList: T.shape({
    assigns: T.array,
    finished: T.array,
  }),
  handleClickItemGroupListAction: T.func,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
