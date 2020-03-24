import React from "react";
import T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BlueGrey from '@material-ui/core/colors/blueGrey';
// import colorRed from '@material-ui/core/colors/red';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    border: '0 0 1px 0',
    borderBottom: BlueGrey[100],
    margin: '5px, 5px, 5px, 3px',
  },
});

const onlyTab = props => {
  // variables
  const { classes, indexTab, tabs } = props;
  // acciones
  const { changeIndexTab } = props;

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={classes.root}
      >
        <Tabs
          value={indexTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              onClick={() => changeIndexTab(tab.id)}
              label={tab.label}
            />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}

onlyTab.propTypes = {
  classes: T.object.isRequired,
  indexTab: T.number,
  changeIndexTab: T.func,
  tabs: T.array,
};

export default withStyles(styles, { withTheme: true })(onlyTab);
