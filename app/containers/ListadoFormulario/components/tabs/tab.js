import React from "react";
import T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";
// import BlueGrey from '@material-ui/core/colors/blueGrey';
// import colorRed from '@material-ui/core/colors/red';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    margin: '5px, 5px, 5px, 3px',
    justifyContent: 'space-around',
  },
  gridContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  tabItem: {
    minWidth: 100,
    justifyContent: 'space-between',
  },
});

const onlyTab = props => {
  // variables
  const { classes, indexTab, tabs, selectedTemplate } = props;
  // acciones
  const { changeIndexTab } = props;

  return (
    <Grid
      container
      item
      xs={12}
      justify="space-between"
      id="id_root_grid"
    >
      <AppBar
        position="static"
        className={classes.root}
        // color="default"
      >
        <Grid item xs={12} id="tab_container">
          <Tabs
            value={indexTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            className={classes.gridContainer}
            id="container_tabs"
          >
            {tabs.map(tab => (
              <Tab
                className={classes.tabItem}
                key={tab.id}
                onClick={() => changeIndexTab(tab.id)}
                label={tab.label}
                disabled={!selectedTemplate && tab.id > 0}
              />
            ))}
          </Tabs>
        </Grid>
      </AppBar>
    </Grid>
  
  );
}

onlyTab.propTypes = {
  classes: T.object.isRequired,
  indexTab: T.number,
  changeIndexTab: T.func,
  tabs: T.array,
  selectedTemplate: T.bool,
};

export default withStyles(styles, { withTheme: true })(onlyTab);
