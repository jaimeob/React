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
import Assignment from '@material-ui/icons/AssignmentTurnedInOutlined';
// import colorGrey from '@material-ui/core/colors/grey';
// import colorOrange from '@material-ui/core/colors/orange';
import BlueGrey from '@material-ui/core/colors/blueGrey';
import Grid from '@material-ui/core/Grid';
import { noop } from 'redux-saga/utils';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${BlueGrey[100]}`,
    borderTop: 0,
    paddingTop: 0,
    overflow: 'auto',
    minHeight: 640,
    maxHeight: 640,
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
    paddingLeft: '2rem',
    paddingRight: '2rem',
    color: BlueGrey[200],
  },
});

// const showSubItems = (configFormulario, classes, open, onClickForm, departamentId, _Iddepartament) => {
//   const forms = (configFormulario.map(kids => {
//     console.log('configFormulario kid', kids)
//     return (
//       <Collapse
//         key={kids.id}
//         in={open}
//         timeout="auto" unmountOnExit
//       >
//         <List
//           component="div"
//           key={kids.id}
//           disablePadding
//         >
//           <ListItem
//             button
//             className={classes.nested}
//             onClick={() => onClickForm(kids, departamentId, _Iddepartament, )}
//           >
//             <ListItemIcon >
//               <Assignment style={{color:BlueGrey[800]}}/>
//             </ListItemIcon>
//             <ListItemText inset primary={kids.NombreFormulario} />
//           </ListItem>
//         </List>
//       </Collapse>
//     );
//   }));

//   return forms;
// }

const ShowItems = (props) => {
  const {
    data,
    classes,
    onClickItemGroup,
    onClickForm,
  } = props;

  const handleClickItemGroup = (index) =>
    (event) => {
      event.stopPropagation();
      onClickItemGroup(index)
    }  
  
  const handleCLickChildItem = (
    kids,
    departamentId,
    id,
  ) => (event) => {
    event.stopPropagation();
    onClickForm(kids, departamentId, id)
  } 

  const items = (data.map((father, index) => {
    console.log('father', father)

    
    // const itemKid = showSubItems(
    //   father.configuracionformulario  , classes, father.open, onClickForm, father.departamentoId, father.id
    // );

    return (
      <Grid
        // eslint-disable-next-line react/no-array-index-key
        key={`grp${father.FormularioId}_${index}`}
        className={classes.contentItems}
        item
        xs={12}
        id="paper-id"
      >
        <ListItem
          className={classes.itemGroup}
          button
          onClick={handleClickItemGroup(index)}
        >
          {father.open ? <ArrowDropDown /> : <ArrowRight />}
          <ListItemText inset primary={father.nombre}/>
        </ListItem>
        {
          father.configuracionformulario.map(kids => {
            console.log('configFormulario kid', kids)
            return (
              <Collapse
                key={`clps-${kids.FormularioId}`}
                in={father.open}
                timeout="auto" unmountOnExit
              >
                <List
                  component="div"
                  key={`chld-clps-${kids.FormularioId}`}
                  disablePadding
                >
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={handleCLickChildItem(kids, father.departamentId, father.id)}
                  >
                    <ListItemIcon >
                      <Assignment style={{color:BlueGrey[800]}}/>
                    </ListItemIcon>
                    <ListItemText inset primary={kids.NombreFormulario} />
                  </ListItem>
                </List>
              </Collapse>
            );
          })
        }
      </Grid>
    );
  }));

  return items;
}

ShowItems.propTypes = {
  data: T.array,
  classes: T.object,
  onClickItemGroup: T.func,
  onClickForm: T.func,
}

ShowItems.defaultProps = {
  data: [],
  classes: {},
  onClickItemGroup: noop,
  onClickForm: noop,
}

const searchData = (data = [], sentence = '') => data.filter(form =>
  form.nombre.toUpperCase().includes(sentence.toUpperCase())
)

const NestedList = (props) => {
  const { classes, data, textSearch } = props;
  // Funciones
  const { onClickItemGroup, onClickForm } = props;
  const dataTable = (searchData(data, textSearch));

  return (
    dataTable.length > 0 ?
      <List
        component="nav"
        className={classes.root}
      >
        <ShowItems
          data={data}
          classes={classes}
          onClickItemGroup={onClickItemGroup}
          onClickForm={onClickForm}
        />
      </List>
      : <List className={classes.root}>
        <ListItem className={classes.empty}>
          <h3 style={{textAlign: 'justify'}}>
            {data.length === 0 ? 'Una vez que se registren formularios, se mostrarán en este apartado.' : 'Sin resultados obtenidos.'}
          </h3>
        </ListItem>
      </List>
  );
}

NestedList.propTypes = {
  classes: T.object.isRequired,
  data: T.array,
  onClickItemGroup: T.func,
  textSearch: T.string,
  onClickForm: T.func,
};

NestedList.defaultProps = {
  onClickItemGroup: noop,
}

export default withStyles(styles)(NestedList);
