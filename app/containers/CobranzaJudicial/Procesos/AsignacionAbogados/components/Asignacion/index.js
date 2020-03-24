import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Input,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  grey,
  green,
} from '@material-ui/core/colors';

import { MuiThemeProvider } from "@material-ui/core/styles";
import Table from './components/simpleTable';
import ModalDelete from './components/ModalDelete'
import ModalAssignLawyer from './components/ModalAssignLawyer'
import getMuiTheme from '../../../../../Modulos/style';

const Styles = () => ({
  paperHeader: {
    padding: '10px',
  },
  paperTable: {
    padding: '10px',
    marginTop: '10px',
    // maxHeight: 100,
  },
  textFieldYear: {
    width: 100,
    margin: '0px 10px',
  },
  textFieldCompany: {
    width: 200,
    margin: '0px 10px',
  },
  textField: {
    width: 300,
    margin: '0px 10px',
  },
  menu: {
    width: 200,
  },
  btnAccept: {
    background: green[700],
    color: "white",
    minWidth: 100,
    margin: 10,
  },
});

const asignacion = props => {
  const {
    permisos,
    classes,
    params: {
      year,
      companys,
      dates,
      companySelected,
      dateSelected,
      retailWeek,
      textComboDate,
      columns,
      rows,
      activeSearch,
      searchText,
      columnsToSearch,
      menuFilterIndex,
      menuFilters,
      modalDelete,
      reason,
      modalAssign,
      comboCartera,
      carteraSelected,
      comboLawyer,
      lawyerSelected,
      clientSelected,
    },
    actions:{
      handleChangeCompanyAction,
      handleChangeDateAction,
      handleClickButtonSearchAction,
      handleChangeTextSearchAction,
      requestGetDatesAction,
      requestGetListClientsAction,
      handleOpenModalAction,
      handleChangeTextModalAction,
      handleClickLeaveDialogAction,
      handleChangeCarteraAction,
      handleChangeLawyerAction,
      handleClickLeaveAssignAction,
      requestGetLawyersAction,
      requestGetTypesCarterasAction,
      setClientSelectedAction,
      postGuardarAsignacionAction,
      desactivarAsignacionAction,
    },
  } = props
  // console.log('permisos 1',permisos)
  const onChangeCombo = (event,option) => {
    switch (option) {
      case 'COMPANY': {
        handleChangeCompanyAction(event.target.value);
        requestGetDatesAction(event.target.value);
        break;
      }
      case 'DATE': {
        handleChangeDateAction(event.target.value);
        requestGetListClientsAction({year,companySelected,dateId: companySelected === 2 ? event.target.value.MesRetail : event.target.value.SemanaRetail})
        break;
      }
      case 'CARTERA': {
        handleChangeCarteraAction(event.target.value);
        break;
      }
      case 'LAWYER': {
        handleChangeLawyerAction(event.target.value);
        break;
      }
      default:
        break;
    }
  }

  const onClickDelete = (para) => {
    const {
      idFamilys,
      state,
    } = para;
    handleOpenModalAction(true, 'modalDelete');
    setClientSelectedAction(idFamilys[0]);

    // console.log('console: ', idFamilys, state);
  }

  const onClickAssign = (para) => {
    const {
      id,
      // name,
    } = para;
    handleOpenModalAction(true, 'modalAssign');
    // requestGetTypesCarterasAction();
    // requestGetLawyersAction();
    setClientSelectedAction(id);
    // console.log('onClickAssign: ', id, name);
  }

  const onClickSave = () => {
    const asignacionAbogado = {
      carteraSelected,
      clientSelected,
      lawyerSelected,
      retailWeek,
      year,
      companySelected,
    }

    postGuardarAsignacionAction(asignacionAbogado);
  }

  const onClickDesactivar = () => {
    const asignacionAbogado = {
      clientSelected,
      reason,
      retailWeek,
      year,
      companySelected,
    };

    desactivarAsignacionAction(asignacionAbogado);
  }

  return (
    <React.Fragment>
      <div 
        style={
          {
            height: '85vh',
            padding: '0 8px 8px 8px',
            overflow: 'auto',
          }
        }
      >
        <MuiThemeProvider theme={getMuiTheme}>
          <ModalDelete
            open={modalDelete}
            onClickLeave={() => handleClickLeaveDialogAction('modalDelete', 'reason')}
            onClickSave={() => onClickDesactivar()}
            onChangeText={handleChangeTextModalAction}
            reason={reason}
          />
          <ModalAssignLawyer
            open={modalAssign}
            title='Asignación:'
            onClickLeave={() => handleClickLeaveAssignAction()}
            onClickSave={() => onClickSave()}
            onChangeText={handleChangeTextModalAction}
            reason={reason}
            comboCartera={comboCartera}
            carteraSelected={carteraSelected}
            onChangeCombo={onChangeCombo}
            comboLawyer={comboLawyer}
            lawyerSelected={lawyerSelected}
          />
          <Grid container style={{backgroundColor: 'white', borderRadius: 5, padding:20, border: '1px solid #e6e6e6'}}>
            <Grid item xs={12} sm={8}>
              <Grid container>
                <TextField
                  id="standard-year"
                  label="Año"
                  placeholder="Capture el año"
                  className={classes.textFieldYear}
                  value={year}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    style: {color: 'black', fontSize: 12},
                  }}
                  inputProps={{maxLength: 3, style: {fontSize: 10}}}
                  disabled
                />
                <TextField
                  id="standard-select-currency"
                  select
                  label="Empresa"
                  className={classes.textFieldCompany}
                  value={companySelected}
                  onChange={event => onChangeCombo(event,'COMPANY')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  InputLabelProps={{
                    style: {color: 'black', fontSize: 12},
                  }}
                  margin="normal"
                >
                  <MenuItem key="0" value="0" disabled>
                    <Typography variant="caption" style={{color: grey[500], fontSize: 10}}>
                      Seleccione la Empresa
                    </Typography>
                  </MenuItem>
                  {companys.map(option => (
                    <MenuItem key={option.EmpresaId} value={option.EmpresaId}>
                      {option.Nombre}
                    </MenuItem>
                  ))}
                </TextField>
                <Grid item>
                  <Grid container direction="column">
                    <InputLabel
                      htmlFor="select-week"
                      style={{fontSize: 10, color: 'black', margin: '0px 10px', marginBottom: '6px'}}
                    >
                      {textComboDate}
                    </InputLabel>
                    <Select
                      className={classes.textField}
                      value={dateSelected}
                      onChange={event => onChangeCombo(event,'DATE')}
                      input={<Input id="select-week" />}
                      renderValue={selected => (
                        selected.FechaInicio ? `${selected.FechaInicio} - ${selected.FechaFin}`
                          :
                          <Typography variant="caption" style={{color: grey[500], fontSize: 10}}>
                            Seleccione la Fecha
                          </Typography>
                      )}
                      disabled={companySelected === 0}
                    >
                      <MenuItem key="0" value="0" disabled>
                        <Typography variant="caption" style={{color: grey[500]}}>
                          Seleccione la Fecha
                        </Typography>
                      </MenuItem>
                      {dates.map(option => (
                        <MenuItem 
                          disableGutters
                          key={companySelected === 2 ? `M${option.MesRetail}` : `S${option.SemanaRetail}`}
                          value={option}
                        >
                          <List>
                            <ListItem>
                              <ListItemText
                                primary={`${companySelected === 2 ? option.MesRetail : option.SemanaRetail}`}
                                secondary={`${option.FechaInicio} - ${option.FechaFin}`}
                              />
                            </ListItem>
                          </List>
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container justify='flex-end'>
                {companySelected !== 10 && dateSelected.SemanaRetail ?
                  <Typography variant="h6"  style={ {fontSize:14}} >
                    {`Semana: ${retailWeek}`}
                  </Typography>
                  :
                  null
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid container style={{backgroundColor: 'white', borderRadius: 5, padding:20, border: '1px solid #e6e6e6', marginTop: 30}}>
            <Grid item xs={12} sm={12}>
              <Table
                columns={columns}
                rows={rows}
                activeSearch={activeSearch}
                searchText={searchText}
                columnsToSearch={columnsToSearch}
                menuFilterIndex={menuFilterIndex}
                menuFilters={menuFilters}
                onClickSearch={handleClickButtonSearchAction}
                onChangeTextSearch={handleChangeTextSearchAction}
                onClickDelete={onClickDelete}
                onClickAssign={onClickAssign}
                permisos={permisos}
              />
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    </React.Fragment>
  );
}

const paramsProps = T.shape({
  year: T.number,
  companys: T.array,
  dates: T.array,
  companySelected: T.number,
  dateSelected: T.object,
  retailWeek: T.number,
  textComboDate: T.string,
  columns: T.array,
  rows:T.array,
  activeSearch: T.bool,
  searchText: T.string,
  columnsToSearch: T.array,
  menuFilterIndex: T.number,
  menuFilters: T.array,
  modalDelete: T.bool,
  reason: T.string,
  modalAssign: T.bool,
  comboCartera: T.array,
  carteraSelected: T.number,
  comboLawyer: T.array,
  lawyerSelected: T.number,
})

const actionList = T.shape({
  handleChangeCompanyAction: T.func,
  handleChangeDateAction: T.func,
  handleClickButtonSearchAction: T.func,
  handleChangeTextSearchAction: T.func,
  requestGetListClientsAction: T.func,
  handleOpenModalAction: T.func,
  handleChangeTextModalAction: T.func,
  handleClickLeaveDialogAction: T.func,
  handleChangeCarteraAction: T.func,
  handleChangeLawyerAction: T.func,
  handleClickLeaveAssignAction: T.func,
  requestGetLawyersAction: T.func,
  requestGetTypesCarterasAction: T.func,
})

asignacion.propTypes ={
  classes: T.object.isRequired,
  params: paramsProps,
  actions: actionList,
  permisos:T.object,
}

export default withStyles(Styles)(asignacion);