import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField'
import PersonAdd from '@material-ui/icons/PersonAdd';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid } from '@material-ui/core';
import ColorRed from '@material-ui/core/colors/red';
import ColorGreen from '@material-ui/core/colors/green';
import ColorGrey from '@material-ui/core/colors/grey';
import ColorBlueGrey from '@material-ui/core/colors/blueGrey';
import SearchIcon from "@material-ui/icons/Search";
// import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
import countBy from 'lodash/countBy';
import InputAdornment from '@material-ui/core/InputAdornment';
import { noop } from 'redux-saga/utils';
import Message from './dialog/alertDialog'

// const debugsty = (color = 'red') => ({ border: `1px solid ${color}` });

const styles = ({
  root: {
    maxHeight: 640,
    minHeight: 640,
    // ...debugsty('blue'),
  },
  flex: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'flex-end',
  },
  grid: {
    // minHeight: 300,
    height: 325,
    // display: 'flex',
    // flexGrow: 1,
    // ...debugsty('yellow'),
  },
  grid2: {
    // minHeight: 300,
    height: 325,
    // display: 'flex',
    // flexGrow: 1,
    // ...debugsty('yellow'),
  },
  list: {
    backgroundColor: "#fff",
    maxHeight: 160,
    overflow: 'auto',
    flexGrow: 1,
  },
  list2: {
    backgroundColor: "#fff",
    maxHeight: 215,
    overflow: 'auto',
    flexGrow: 1,
    // ...debugsty('blue'),
  },
  check:{
    height: 1,
    width: 1,
    color: ColorGreen[500],
  },
  buttonClose: {
    margin: 2,
    width: 100,
    backgroundColor: ColorRed[800],
    color: "#fff",
  },
  buttonSend: {
    margin: 2,
    width: 100,
    backgroundColor: ColorGreen[500],
    color: "#fff",
  },
  iconAddEnabled: {
    color: ColorBlueGrey[700],
    width:'18px',
    height: '18px',
  },
  iconAddDisabled: {
    color: ColorGrey[500],
    width:'18px',
    height: '18px',
  },
  empty: {
    height: 150,
    maxHeight: 150,
    paddingLeft: '7rem',
    color: ColorBlueGrey[200],
  },
});

class Administracion extends React.Component {

  searchData = (data = [], columns = [], sentence = '') => {
    let search = false;

    const newData = data.filter(items => {
      let find = false;
      Object.keys(items).forEach(n => {
        search = (columns.some(c => c.toUpperCase() === n.toString().toUpperCase()))
        if(search){
          if(items[n].toString().toUpperCase().indexOf(sentence.toUpperCase()) >= 0 )
            find = true;
        }
      })
      return find;
    });
  
    return newData;
  };

  handleClickAll = (propName = '') =>  (event) => {
    const {
      target: {
        checked,
      },
    } = event;
    const {
      onClickAll,
    } = this.props;
    onClickAll(checked, { propName });

  }

  render() {
    const {
      classes,
      dataSent,
      dataUsers,
      allUserSent,
      textSearch,
      addUsers,
      flagMessage,
      cancelSend,
      idMongoDepartament,
      onClickCheckSelect,
      onChangeTextSearch,
      onClickAddUsers,
      showModal,
      onClickEnviar,
    } = this.props;
    const dataFilter = (
      this.searchData(
        dataUsers,['ApellidoPaterno', 'ApellidoMaterno', 'Nombre'],textSearch
      )
    );
    const count = countBy(dataUsers, (usr) => usr.checked === true);
    const indeterminate = count.true > 0 && count.true < dataUsers.length;
    const allSelected = count.true === dataUsers.length;
    console.log('indeterminate', indeterminate);
    console.log('allSelected', allSelected);
    console.log('this.props UsersList', this.props)
    return (
      <Paper className={classes.root}>
        <Grid className={classes.flex} container component='div' direction='column'>
          <Grid item className={classes.grid}>
            <ListItem>
              <ListItemText primary="Administrar usuarios" />
            </ListItem>
            <Divider component='h1'/>
            <ListItem>
              <ListItemText secondary="Usuarios con acceso:" />
              <IconButton
                onClick={() => onClickAddUsers(idMongoDepartament)}
                disabled={!!addUsers}
              >
                <Tooltip title="Agregar Usuario">
                  <PersonAdd
                    className={addUsers ? classes.iconAddDisabled : classes.iconAddEnabled}
                  />
                </Tooltip>
              </IconButton>
            </ListItem>
            <ListItem>
              <Checkbox
                checked={allUserSent}
                className={classes.check}
                style={{color: ColorGreen[500]}}
                onClick={this.handleClickAll('dataSent')}
              />
              <ListItemText primary="Todos"/>
            </ListItem>
            {dataSent.length > 0 ?
              <List className={classes.list} component="nav">
                {dataSent.map((user, index) => {
                  console.log('user in dataSent', user)
                  return (
                    <ListItem key={user.NoEmpleado} dense button>
                      <Checkbox
                        className={classes.check}
                        style={{
                          color: ColorGreen[500]}}
                        checked={user.checked}
                        onClick={(e) => onClickCheckSelect(index, 'dataSent', e.target.checked, user)}
                        tabIndex={-1}
                        // checkedIcon={
                        //   <AddCircleIcon/>
                        // }
                        // icon={<RemoveCircleIcon />}
                        disableRipple
                      />
                      <ListItemText
                        primary={`${user.ApellidoPaterno}
                                  ${user.ApellidoMaterno}
                                  ${user.Nombre}`}
                      />
                    </ListItem>
                  )
                })}
              </List>
              :
              <List className={classes.root}>
                <ListItem className={classes.empty}>
                  <h3>Sin resultados obtenidos</h3>
                </ListItem>
              </List>}
          </Grid>
          <Grid item className={classes.grid} >
            {addUsers ?
              <div>
                <Divider component='h1'/>
                <ListItem>
                  <ListItemText secondary="Agregar Usuarios:"/>
                </ListItem>
                <ListItem>
                  <Checkbox
                    checked={allSelected}
                    indeterminate={indeterminate}
                    className={classes.check}
                    style={{color: ColorGreen[500]}}
                    onClick={this.handleClickAll('dataUsers')}
                  />
                  <ListItemText primary="Todos"/>
                  <div>
                    <TextField
                      placeholder='Buscar...'
                      type="search"
                      value={textSearch}
                      onChange={(event) => onChangeTextSearch(event.target.value)}
                      InputProps={{
                        startAdornment:(<InputAdornment position="start">
                          <SearchIcon style={{color:ColorGrey[500]}}/>
                        </InputAdornment>),
                      }}
                    />
                  </div>
                </ListItem>
                {dataFilter.length > 0 ?
                  <List className={classes.list2} component="nav">
                    {dataFilter.map( (user, index) => {
                      console.log('user in dataFilter', user)
                      return (
                        <ListItem key={user.NoEmpleado} dense button>
                          <Checkbox
                            className={classes.check}
                            style={{
                              color: ColorGreen[800],
                            }}
                            checked={user.checked}
                            onClick={(event) => onClickCheckSelect(index, 'dataUsers', event.target.checked, user)}
                            tabIndex={-1}
                            // checkedIcon={<RemoveCircleIcon />}
                            // icon={<AddCircleIcon />}
                            disableRipple
                          />
                          <ListItemText
                            primary={`${user.ApellidoPaterno}
                                      ${user.ApellidoMaterno}
                                      ${user.Nombre}`}
                            
                          />
                        </ListItem>
                      )
                    })}
                  </List>
                  :
                  <List className={classes.root}>
                    <ListItem className={classes.empty}>
                      <h3>Sin resultados obtenidos</h3>
                    </ListItem>
                  </List>}
              </div>
              : null}
          </Grid>
          <Grid item xs={12}>
            <div align='right' style={{padding: '10px 10px 0px 0px'}}>
              <Button
                variant="contained"
                className={classes.buttonClose}
                onClick={() => showModal(true)}
              >
                Limpiar
              </Button>
              <Button
                variant="contained"
                className={classes.buttonSend}
                onClick={onClickEnviar}
              >
                Enviar
              </Button>
            </div>
          </Grid>
        </Grid>
        {flagMessage ?
          <Message
            open={Boolean(flagMessage)}
            typeAlert='Report'
            typeOptions='Select'
            title='Confirmar....'
            message='¿Está seguro que desea cerrar la asignación del formulario?'
            onClickAccept={() => cancelSend()}
            onClickCancel={() => showModal(false)}
          />
          : null
        }
      </Paper>
    );
  }
}

Administracion.propTypes = {
  classes: T.object.isRequired,
  dataSent: T.array.isRequired,
  dataUsers: T.array.isRequired,
  allUserSent: T.bool,
  // allUser: T.bool,
  onClickCheckSelect: T.func,
  onClickAll: T.func,
  textSearch: T.string,
  onChangeTextSearch: T.func,
  addUsers: T.bool,
  flagMessage: T.bool,
  showModal: T.func,
  cancelSend: T.func,
  idMongoDepartament: T.string,
  onClickAddUsers: T.func,
  onClickEnviar: T.func, 
  // requestToggleAssignations: T.func,
};

Administracion.defaultProps = {
  onClickEnviar: noop,
}

export default withStyles(styles)(Administracion);
