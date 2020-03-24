/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import ChevronRight from '@material-ui/icons/ChevronRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowRight from '@material-ui/icons/ArrowRight';
import Assignment from '@material-ui/icons/Assignment';
// import colorGrey from '@material-ui/core/colors/grey';
// import colorOrange from '@material-ui/core/colors/orange';
import BlueGrey from '@material-ui/core/colors/blueGrey';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    height: 600,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${BlueGrey[100]}`,
    borderTop: 0,
    paddingTop: 0,
    overflow: 'auto',
    maxHeight: 650,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  itemGroup: {
    backgroundColor: BlueGrey[50],
  },
  contentItems: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  empty: {
    height: 600,
    maxHeight: 600,
    paddingLeft: '7rem',
    color: BlueGrey[200],
  },
});
const ShowItems = (props) => {
  const {
    data,
    classes,
    onClickItemGroup,
    indexTab,
    onClickForm,
  } = props;
  console.log('ShowItems props', props);
  return data.map((father, index) => (
    <div
      key={`agnd_${father.nombre}`}
      className={classes.contentItems}
    >
      <ListItem
        className={classes.itemGroup}
        button
        onClick={() => onClickItemGroup(index, indexTab)}
      >
        {father.open ? <ArrowDropDown /> : <ArrowRight />}
        <ListItemText inset primary={father.nombre}/>
      </ListItem>
      {father.formulario.map((kids, idx) => {
        console.log('onClickForm(kids, idx) -- kids', kids)
        return (
          <Collapse
            key={kids.formularioId}
            in={father.open}
            timeout="auto" unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={onClickForm(kids, idx)}
              >
                <ListItemIcon >
                  <Assignment />
                </ListItemIcon>
                <ListItemText inset primary={kids.NombreFormulario} />
              </ListItem>
            </List>
          </Collapse>
        )
      })}
    </div>
  )
  )
}

const NestedList = (props) => {
  // Variables
  const { 
    classes,
    data,
    indexTab,
    // textSearch,
  } = props;
  // Funciones
  const { onClickItemGroup, onClickForm } = props;
  // const dataTable = (searchData(data, textSearch));

  return (
    data.length > 0 ?
      <List
        component="nav"
        className={classes.root}
      >
        <ShowItems
          data={data}
          classes={classes}
          indexTab={indexTab}
          onClickItemGroup={onClickItemGroup}
          onClickForm={onClickForm}
        />
      </List>
      : <List className={classes.root}>
        <ListItem className={classes.empty}>
          <h3>Sin resultados obtenidos</h3>
        </ListItem>
      </List>
  );
}

NestedList.propTypes = {
  classes: T.object.isRequired,
  data: T.array,
  onClickItemGroup: T.func,
  indexTab: T.number,
  // textSearch: T.string,
  onClickForm: T.func,
};

export default withStyles(styles)(NestedList);
