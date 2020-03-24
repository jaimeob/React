import React from 'react';
import T from 'prop-types';
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  withStyles,
} from "@material-ui/core";
import GreenColor from "@material-ui/core/colors/green";
import RedColor from "@material-ui/core/colors/red";
// import AddIcon from "@material-ui/icons/AddCircle";
import Table from "./components/Table";
import ListDialog from "./components/Dialog";
import DialogMessage from '../../../../../../components/Dialog/alertDialog';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
  },
  textField: {
    minWidth: 200,
  },
  button1: {
    background: GreenColor[700],
    color: "white",
    minWidth: 100,
    marginLeft: 5,
  },
  button2: {
    background: RedColor[700],
    color: "white",
    minWidth: 100,
  },
});

// const handleChange = (event, func) => {
//   console.log('event:', event);
//   console.log('event.target.value:', event.target.value);
//   func(event.target.value);
// }

const AdministracionFamilias = props => {
  const {
    classes,
    AdministracionFamilias: {
      adminFamily: {
        idFamily,
        nameFamily,
        totalSubFamilys,
        openList,
        openModalSave,
        openModalSuccess,
        markRequired,
        openModalConfirmExit,
        openModalErrorSave,
        table: {
          toolBar: {
            titleTable,
            columnsToSearchAdmin,
            activeSearchAdmin, 
            searchTextAdmin,
          },
          Haeder: {
            headersFamilyAdmin,
          },
          body: {
            dataSubFamily,
            rowsDeleteAdmin,
          },
        },
        listSubFamilys: {
          selectedList,
          toolBar: {
            activeSearch: activeSearchList,
            searchText: searchTextList,
            columnsToSearch: columnsToSearchList,
          },
          Haeder: {
            headersListSubFamilys,
          },
          body: {
            dataListSubFamily,
          },
        },
      },
    },
    actions: {
      handleClickButtonSearchAdminAction,
      handleChangeTextSearchAdminAction,
      handleClickDeleteRowAdminFamilyAction,
      handleChangeTextNameFamilyAction,
      handleClickAddSubfamilyAction,
      handleClickButtonSearchListAction,
      handleChangeTextSearchListAction,
      handleClickCheckListAction,
      handleClickLeaveListAction,
      handleClickSaveListAction,
      handleClickBackFamilyAction,
      handleClickExitValidationAction,
      handleClickSaveValidationAction,
      showModalErrorSaveAction,
    },
  } = props

  return <div>
    <Grid
      container
      // spacing={8}
      direction="column"
      style={{padding: 5}}
      alignItems="stretch"
    >
      <DialogMessage
        open={Boolean(openModalErrorSave)}
        typeAlert='Report'
        title='Nombre de Familia..'
        message='“Nombre de familia duplicado, favor de validar.'
        onClickAccept={() => showModalErrorSaveAction('openModalErrorSave', false)}
      />
      <DialogMessage
        open={Boolean(openModalConfirmExit)}
        typeAlert='Warning'
        typeOptions='Select'
        title='Advertencia.'
        message='Al continuar se perderán los cambios, ¿Desea continuar?'
        onClickAccept={() => handleClickBackFamilyAction(0)}
        onClickCancel={() => handleClickExitValidationAction(false)}
      />
      <DialogMessage
        open={Boolean(openModalSave)}
        typeAlert='Report'
        // typeOptions='Select'
        title='Nombre de Familia.'
        message='Campos requeridos, favor de validar'
        onClickAccept={() => handleClickSaveValidationAction(1)}
      />
      <DialogMessage
        open={Boolean(openModalSuccess)}
        typeAlert='Check'
        title='Éxito.'
        message='Se registro la información correctamente'
        onClickAccept={() => handleClickBackFamilyAction(0)}
      />
      <Grid item sm={12} xs={12}>
        <Typography variant="h6">
          Información General
        </Typography>
      </Grid>
      <Grid item sm={12} xs={12} >
        <Paper className={classes.paper}>
          <Grid container style={{padding: 5}}>
            <Grid item sm={4}>
              <Grid container alignItems="flex-end">
                <TextField
                  id="name"
                  label="Nombre"
                  className={classes.textField}
                  value={nameFamily}
                  onChange={event => handleChangeTextNameFamilyAction(event.target.value)}
                  margin="normal"
                  disabled={idFamily > 0}
                  inputProps={{maxLength: 30}}
                  error={markRequired}
                  autoFocus={markRequired}
                  required
                />
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Grid container alignItems="flex-end">
                <TextField
                  id="countSubFamily"
                  label="Total Sub-Familias"
                  value={totalSubFamilys}
                  margin="normal"
                  disabled
                />
              </Grid>
            </Grid>
            {/* <Grid item sm={4}>
              <Grid
                container
                justify="flex-end"
                alignItems="flex-end"
              >
                <Button
                  variant="contained"
                  className={classes.button1}
                  onClick={() => handleClickAddSubfamilyAction(dataSubFamily)}
                >
                  <AddIcon style={{paddingRight: 2}}/>
                  Agregar sub-familia
                </Button>
              </Grid>
            </Grid> */}
            <ListDialog
              open={Boolean(openList)}
              columns={headersListSubFamilys}
              rows={dataListSubFamily}
              columnsToSearch={columnsToSearchList}
              activeSearch={activeSearchList}
              searchText={searchTextList}
              onClickSearchButton={handleClickButtonSearchListAction}
              onChangeTextSearch={handleChangeTextSearchListAction}
              onClickCheck={handleClickCheckListAction}
              selected={selectedList}
              onClickLeave={() => handleClickLeaveListAction()}
              onClickSaveList={() => handleClickSaveListAction(dataSubFamily)}
            />
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={12} xs={12}>
        {/* <Paper className={classes.paper}> */}
        <Grid
          container
          spacing={8}
          direction="column"
          style={{padding: 5}}
          alignItems="stretch"
        >
          <Grid item sm={12}>
            <Table
              titleTable={titleTable}
              columns={headersFamilyAdmin}
              rows={dataSubFamily}
              columnsToSearch={columnsToSearchAdmin}
              activeSearch={activeSearchAdmin}
              searchText={searchTextAdmin}
              onClickSearch={() => handleClickButtonSearchAdminAction()}
              onChangeTextSearch={handleChangeTextSearchAdminAction}
              onClickUpdateRow={handleClickDeleteRowAdminFamilyAction}
              selected = {[]}
              showActions
              showNew
              onClickNew={() => handleClickAddSubfamilyAction(dataSubFamily, rowsDeleteAdmin)}
            />
          </Grid>
          <Grid item sm={12}>
            <Grid container justify="flex-end">
              <Button
                variant="contained"
                className={classes.button2}
                // onClick={() => handleClickBackFamilyAction(0)}
                onClick={() => handleClickExitValidationAction(true)}
              >
                Salir
              </Button>
              <Button
                variant="contained"
                className={classes.button1}
                onClick={() => handleClickSaveValidationAction(0)}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* </Paper> */}
      </Grid>
    </Grid>
  </div>
}

const AdministracionFamiliasState = T.shape({
  adminFamily: T.shape({
    idFamily: T.number,
    nameFamily: T.string,
    totalSubFamilys: T.number,
    openList: T.bool,
    openModalSave: T.bool,
    openModalSuccess: T.bool,
    markRequired: T.bool,
    openModalConfirmExit: T.bool,
    openModalErrorSave: T.bool,
    table: T.shape({
      toolBar: T.shape({
        titleTable: T.string,
        columnsToSearchAdmin: T.array,
        activeSearchAdmin: T.bool,
        searchTextAdmin: T.string,
      }),
      Haeder: T.shape({
        headersFamilyAdmin: T.array,
      }),
      body: T.shape({
        dataSubFamily: T.array,
        rowsDeleteAdmin: T.array,
      }),
    }),
    listSubFamilys: T.shape({
      selectedList: T.array,
      toolBar: T.shape({
        activeSearch: T.bool,
        searchText: T.string,
        columnsToSearch: T.array,
      }),
      Haeder: T.shape({
        headersListSubFamilys: T.array,
      }),
      body: T.shape({
        dataListSubFamily: T.array,
      }),
    }),
  }),
})

AdministracionFamilias.propTypes = {
  classes: T.object.isRequired,
  AdministracionFamilias: AdministracionFamiliasState,
  actions: T.shape({
    handleClickButtonSearchAdminAction: T.func,
    handleChangeTextSearchAdminAction: T.func,
    handleClickDeleteRowAdminFamilyAction: T.func,
    handleChangeTextNameFamilyAction: T.func,
    handleClickAddSubfamilyAction: T.func,
    handleClickButtonSearchListAction: T.func,
    handleChangeTextSearchListAction: T.func,
    handleClickCheckListAction: T.func,
    handleClickLeaveListAction: T.func,
    handleClickSaveListAction: T.func,
    handleClickBackFamilyAction: T.func,
    handleClickExitValidationAction: T.func,
    handleClickSaveValidation: T.func,
    showModalErrorSaveAction: T.func,
  }),
};

export default withStyles(styles)(AdministracionFamilias);