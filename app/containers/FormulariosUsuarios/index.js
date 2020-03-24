/**
 *
 * FormulariosUsuarios
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import {
  compose,
} from 'redux';

import { Grid, Select, FormControl, MenuItem, ListItemText, ListItem, withStyles, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
// import { Grid, TextField } from '@material-ui/core';
// import colorBlue from '@material-ui/core/colors/blue';
// import colorRed from '@material-ui/core/colors/red';
import colorGreen from '@material-ui/core/colors/green';
import isBoolean from 'lodash/isBoolean';
// import Breakpoint from 'components/BreakpointViewer';

// import colorYellow from '@material-ui/core/colors/yellow';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// import posed from 'react-pose';
import makeSelectFormulariosUsuarios from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import TabContainer from './components/tabs/tab';
import ListForms from './components/listForms';
import SearchList from './components/search/searchList';
import LayoutFormulario from './components/LayoutFormulario';



// const AnimationLayout = posed.div({
//   enter: {
//     opacity: 1,
//     scale: 1,
//   },
//   exit: {
//     opacity: 0,
//     scale: 0.5,
//   },
// });


/* eslint-disable r
eact/prefer-stateless-function */

// const colorb = (color = 'red') => ({
//   border: `1px solid ${color}`,
// });

const styles = (theme) => ({
  selectOption: {
    margin: theme.spacing.unit,
  },
  layoutFormulario: {
    maxWidth: 512,
  },
  layoutPaper: {
    maxWidth: 512,
    display: 'flex',
    minWidth: 512,
    minHeight: 640,
  },
  layoutGrid: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 6,
  },
  todoButton: {
    margin: theme.spacing.unit * 3,
    backgroundColor: colorGreen[500],
    color: '#FFFFFF',
  },
  primaryActionsButtons: {
    backgroundColor: colorGreen[500],
    color: '#FFFFFF',
  },
}) 


const dfOptionsCompProp = {
  useEventInputValue: false,
  useEventInputName: false,
  useEventInputChecked: false,
  filterType: 'none',
};
export class FormulariosUsuarios extends React.Component {

  componentDidMount = () => {
    const {
      actions: {
        requestGetFormsUserAction,
        requestGetAssignedFormsAction,
      },
    } = this.props
    requestGetFormsUserAction(157);
    requestGetAssignedFormsAction();
  }

  handleChangeUser = (event) => {
    const {
      target: {
        value: user,
      },
    } = event;
    const {
      actions: {
        changeSelectedUserAction,
      },
      formulariosUsuarios: {
        frontend: {
          selectedUser: {
            NoEmpleado: prevId,
          },
        },
      },
    } = this.props;
    changeSelectedUserAction(user, prevId);
  }

  renderSelectVal = (user = {}) => {
    const primaryText = user.NombreCompletoEmpleado
      || 'Seleccione un empleado';
    const secondaryText = user.Puesto
      || 'Puesto del empleado';
    return (
      <ListItem
        disabled={Object.keys(user) === 0}
        value={user}
        style={{
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <ListItemText
          primary={primaryText}
          secondary={secondaryText}
        />
      </ListItem>
    )
  }

  handleClickForm = (formulario, index) => () => {
    const {
      actions: {
        changeSelectedFormAction,
      },
    } = this.props;
    changeSelectedFormAction(formulario, index);
  }

  // handleCloseFormulario = (event) => {

  // }

  handleOpenModal = (data) => () => {
    const {
      actions: {
        updateDataUiAction,
      },
    } = this.props;
    updateDataUiAction(data);
  }

  handleClickSaveChanges = () => {
    const {
      actions: {
        requestSaveChangesAction,
      },
    } = this.props;
    requestSaveChangesAction();
  }

  handleClickFinalize = () => {
    const {
      actions: {
        requestSaveChangesAction,
      },
    } = this.props;
    requestSaveChangesAction(true)
  }

  handleUpdateComponentProp = (
    idx = null,
    prop = '',
    value = '',
    opts = dfOptionsCompProp,
    order = -1,
  ) => (event) => {
    const {
      actions: {
        updateComponentPropAction,
      },
    } = this.props;
    const {
      target: {
        value: eventValue = '',
        checked: checkedValue = null,
      },
    } = event;
    const {
      useEventInputValue = false,
      useEventInputChecked = false,
    } = opts;
    const isCehckedValue = useEventInputChecked && isBoolean(checkedValue)
    if (useEventInputValue) value = eventValue;
    if (isCehckedValue) value = checkedValue;
    updateComponentPropAction(idx, prop, value, order);
  }

  render() {
    const {
      props: {
        classes,
        formulariosUsuarios: {
          frontend: {
            selectedUser,
            selectedForm,
            selectedForm: {
              Componentes = [],
              FechaFinalizacion = null,
            },
            ui: {
              openModalFormulario,
            },
            tabs: {
              indexTab,
            },
            list: {
              data,
            },
            search: {
              searchActive,
              textSearch,
            },
          },
        },
        actions: {
          handleChangeIndexTabsAction,
          handleClickItemGroupListAction,
          handleClickButtonSearchAction,
          handleChangeTextSearchAction,
        },
      },
      handleUpdateComponentProp,
    } = this;

    const isSelectedForm = _.get(
      selectedForm,
      'FormularioId',
      false
    );
    // const isSelectedUser = _.get(
    //   selectedUser,
    //   'NoEmpleado',
    //   false,
    // );

    // const debugear = false;
    const tabsList = [
      { id: 0, label: 'Asignados' },
      { id: 1, label: 'Finalizados' },
    ];
    const layoutActions = {
      handleUpdateComponentProp,
    };
    const debug = true;
    return (
      <React.Fragment>
        <div style={{height: 'calc(100vh - 64px)', maxHeight: '750px', minHeight: '600px'}}>
          <Helmet>
            <title>FormulariosUsuarios</title>
            <meta
              name="description"
              content="Description of FormulariosUsuarios"
            />
          </Helmet>
          <Grid
            container
            direction='row'
            spacing={8}
            item
            lg={12}
          >
            <Grid item md={4} xs={12} >
              <Grid item xs={12} >
                <SearchList 
                  searchActive={searchActive}
                  textSearch={textSearch}
                  onClickSearch={handleClickButtonSearchAction}
                  onChangeTextSearch={handleChangeTextSearchAction}
                />
              </Grid>
              <Grid item xs={12} >
                <TabContainer
                  indexTab={indexTab}
                  changeIndexTab={handleChangeIndexTabsAction}
                  tabs={tabsList}
                />
              </Grid>
              {debug && (
                <Grid item xs={12} >
                  <FormControl fullWidth>
                    <Select
                      value={selectedUser}
                      onChange={this.handleChangeUser}
                      renderValue={this.renderSelectVal}
                    >
                      {data.users.map(user => (
                        <MenuItem
                          key={user.NoEmpleado}
                          value={user}
                          className={classes.selectOption}
                        >
                          <ListItemText
                            primary={user.NombreCompletoEmpleado}
                            secondary={user.Puesto}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <ListForms
                indexTab={indexTab}
                textSearch={textSearch}
                dataList={data}
                handleClickItemGroupListAction={handleClickItemGroupListAction}
                onClickForm={this.handleClickForm}
              />
            </Grid> {/** END LEFT PANEÑ */}
            <Grid
              item
              md={8}
              xs={12}
            >
              {isSelectedForm && Componentes.length > 0 && (
                <React.Fragment>
                  <Grid
                    container
                    item
                    xs={12}
                    md={8}
                    id="id-layout-formulario"
                  >
                    <Paper
                      className={classes.layoutPaper}
                    >
                      <Grid
                        item
                        xs={12}
                        id="id-layout-formulario"
                      >
                        <LayoutFormulario
                          components={Componentes}
                          containerProps={{
                            className: classes.layoutFormulario,
                          }}
                          showAddComponentAction={false}
                          showDeleteComponentAction={false}
                          hideTableOptions
                          notFoundMessage="Sin componentes"
                        />
                      </Grid>
                    </Paper>
                    {
                      _.isEmpty(FechaFinalizacion) && (
                        <Grid
                          item
                          xs={12}
                          id="id_button_realizar"
                          container
                          justify="center"
                        >
                          <Button
                            variant="contained"
                            onClick={this.handleOpenModal({ openModalFormulario: true })}
                            className={classes.todoButton}
                          >
                            Realizar Formulario
                          </Button>
                        </Grid>
                      )
                    }
                  </Grid>
                </React.Fragment>
              )
              }
            </Grid> {/** END CENTER PANEL */}
          </Grid>
        </div>
        <Dialog
          open={openModalFormulario}
          onClose={
            this.handleOpenModal({ openModalFormulario: false })
          }
          maxWidth="lg"
        >
          <DialogTitle>Titulo del formulario</DialogTitle>
          <DialogContent>
            <Paper
              className={classes.layoutPaper}
            >
              <Grid
                item
                xs={12}
              >
                <LayoutFormulario
                  components={Componentes}
                  containerProps={{
                    className: classes.layoutFormulario,
                  }}
                  notFoundMessage="Sin componentes"
                  showAddComponentAction={false}
                  showDeleteComponentAction={false}
                  hideTableOptions
                  layoutActions={layoutActions}
                />
              </Grid>
            </Paper>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClickSaveChanges}
              variant="outlined"
            >
              Guardar Cambios
            </Button>
            <Button
              onClick={this.handleClickFinalize}
              variant="contained"
              className={classes.primaryActionsButtons}
            >
              Finalizar Formulario
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const stateProps = T.shape({
  frontend: T.shape({
    tabs: T.shape({
      indexTab: T.number,
    },),
    list: T.shape({
      data: T.shape({
        assigns: T.array,
        finished: T.array,
      }),
    },),
    search: T.shape({
      searchActive: T.bool,
      textSearch: T.string,
    },),
  },),
});

const MUIStylesProp = T.shape({
  selectOption: T.object,
})

const reduxActionsType = T.shape({
  handleChangeIndexTabsActions: T.func,
  handleClickItemGroupListAction: T.func,
  handleClickButtonSearchAction: T.func,
  requestGetFormsUserAction: T.func,
  requestGetAssignedFormsAction: T.func,
})

FormulariosUsuarios.propTypes = {
  formulariosUsuarios: stateProps,
  actions: reduxActionsType,
  classes: MUIStylesProp,
};

const mapStateToProps = createStructuredSelector({
  formulariosUsuarios: makeSelectFormulariosUsuarios(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'formulariosUsuarios', reducer });
const withSaga = injectSaga({ key: 'formulariosUsuarios', saga });
const withActions = Actions.bindReduxStore();
const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(FormulariosUsuarios);
