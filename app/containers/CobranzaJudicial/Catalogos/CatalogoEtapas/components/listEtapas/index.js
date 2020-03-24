import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  Paper,
  TextField,
  MenuItem,
  Typography,
} from '@material-ui/core';
import {
  grey,
} from '@material-ui/core/colors';

import Table from './components/Table';
import ModalButtonNew from './components/ModalButtonNew';
import AlertDialog from './components/alertDialog';

const Styles = () => ({
  paperHeader: {
    padding: '10px',
  },
  paperTable: {
    // maxHeight: 100,
  },
  textField: {
    width: 350,
  },
  menu: {
    width: 200,
  },
});

const listEtapas = props => {
  const {
    classes,
    params: {
      processType,
      processSelected,
      columns,
      rows,
      searchText,
      activeSearch,
      filterOptions,
      menuFilterIndex,
      menuOptions,
      showModalNew,
      rowSelected,
      showDialogDelete,
      rowSelectedButton,
      changeWithButton,
      titleModalNew,
      tipoMovto,
      idEtapa,
      nameEtapa,
      DaysPlazaForeign,
      DaysPlazaLocal,
      comboEtapas,
      positionEtapaSelected,
      idEtapaCombo,
      titleComboModal,
      permisos,
      estatus,
      UsuarioId,
    },
    actions: {
      handleChangeTypeProcessAction,
      handleClickButtonSearchAction,
      handleChangeTextSearchAction,
      handleClickButtonNewAction,
      handleClickLeaveNewAction,
      handleClickCheckTableAction,
      handleOpenDialogAction,
      handleClickLeaveDialogAction,
      requestGetListEtapasAction,
      requestUpdateStatusEtapasAction,
      handleClickDeleteRowAction,
      handleChangeTextModalAction,
      requestEtapasTypeProcessAction,
      handleChangeComboEtapaAction,
      requestCreateEtapaAction,
      handleClickButtonEditAction,
      requestEditEtapaAction,
    },
  } = props

  const updateStatusEtapas = params => {
    requestUpdateStatusEtapasAction({
      ProcesoId: processType[processSelected - 1].Id,
      Estatus: params.state,
      rows: params.rows.map(row => row.IdEtapa),
      menuFilterIndex,
      currentStatus: filterOptions[menuFilterIndex],
    })
  }

  const changeStatus = params => {
    if(params.state === "Desactivar"){
      if(params.type === 'button'){
        handleClickDeleteRowAction(params.rows)
      }
      handleOpenDialogAction(params.dialog);
    } else {
      updateStatusEtapas(params);
    }
  }

  const onSelectTypeProcess = value => {
    handleChangeTypeProcessAction(value);
    requestGetListEtapasAction({ ProcesoId: processType[value - 1].Id, Estatus: filterOptions[menuFilterIndex], newIndex: menuFilterIndex});
  }

  const onClickFilterList = params => {
    requestGetListEtapasAction({ ProcesoId: processType[processSelected - 1].Id, Estatus: params.state, newIndex: params.newIndex});
  }

  const onClicknew = () => {
    handleClickButtonNewAction();
    requestEtapasTypeProcessAction({ProcesoId: processType[processSelected - 1].Id, TipoMovto: 1});
  }

  const onClickSave = () => {
    if(tipoMovto === 1) {
      requestCreateEtapaAction({
        procesoId: processType[processSelected - 1].Id,
        nomEtapa: nameEtapa,
        diasPlazaForanea: DaysPlazaForeign,
        diasPlazaLocal: DaysPlazaLocal,
        idEtapaDependencia: idEtapaCombo,
        empleado: UsuarioId,
        Estatus: filterOptions[menuFilterIndex],
        newIndex: menuFilterIndex,
      });
    } else {
      requestEditEtapaAction({
        procesoId: processType[processSelected - 1].Id,
        idEtapa,
        nomEtapa: nameEtapa,
        diasPlazaForanea: DaysPlazaForeign,
        diasPlazaLocal: DaysPlazaLocal,
        idEtapaDependencia: idEtapaCombo,
        empleado: UsuarioId,
        Estatus: filterOptions[menuFilterIndex],
        newIndex: menuFilterIndex,
      })
    }
  }

  const onClickEdit = rowSelect => {
    handleClickButtonEditAction(rowSelect);
    requestEtapasTypeProcessAction({ProcesoId: processType[processSelected - 1].Id, TipoMovto: 2});
  }

  return <div>
    <Paper className={classes.paperHeader}>
      <TextField
        id="standard-select-currency"
        select
        label="Tipo Proceso"
        className={classes.textField}
        value={processSelected}
        onChange={event => onSelectTypeProcess(event.target.value)}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        InputLabelProps={{
          style: {color: 'black'},
        }}
        margin="normal"
      >
        <MenuItem key="0" value="0" disabled>
          <Typography variant="caption" style={{color: grey[500]}}>
            Seleccione el Proceso
          </Typography>
        </MenuItem>
        {processType.map(option => (
          <MenuItem key={option.Id} value={option.Id}>
            {option.Nombre}
          </MenuItem>
        ))}
      </TextField>
    </Paper>
    <Paper className={classes.paperTable}>
      <AlertDialog
        open={showDialogDelete}
        typeAlert='Report'
        typeOptions='Select'
        title='Confirmación'
        message='¿Esta seguro que desea eliminar el registro?'
        onClickAccept={() => updateStatusEtapas({state: 'Desactivar', rows: changeWithButton ? rowSelectedButton : rowSelected})}
        onClickCancel={() => handleClickLeaveDialogAction('showDialogDelete')}
      />
      <ModalButtonNew
        open={showModalNew}
        title={titleModalNew}
        onClickLeave={() => handleClickLeaveNewAction()}
        onChangeText={handleChangeTextModalAction}
        onChangeCombo={handleChangeComboEtapaAction}
        onClickSaveList={() => onClickSave()}
        nameEtapa={nameEtapa}
        DaysPlazaForeign={DaysPlazaForeign}
        DaysPlazaLocal={DaysPlazaLocal}
        comboEtapas={comboEtapas}
        positionEtapaSelected={positionEtapaSelected}
        titleCombo={titleComboModal}
        permisos={permisos}
        estatus={estatus}
      />
      {processSelected > 0 ?
        <Table
          columns={columns}
          rows={rows}
          columnsToSearch={["Nombre"]}
          activeSearch={activeSearch}
          searchText={searchText}
          onClickSearch={handleClickButtonSearchAction}
          onChangeTextSearch={handleChangeTextSearchAction}
          menuFilterIndex={menuFilterIndex}
          menuFilters={filterOptions}
          menuOptions={menuOptions}
          onClickFilterList={onClickFilterList}
          onClickUpdateRow={changeStatus}
          onClickNew={() => onClicknew()}
          onClickEditItem={onClickEdit}
          showNew
          showFilter
          showOption
          showActions
          showChecks
          onClickCheck={handleClickCheckTableAction}
          selected={rowSelected}
          progress={false}
          permisos={permisos}
        />
        :
        null
      }
    </Paper>
  </div>
}

const paramsProps = T.shape({
  processType: T.array,
  processSelected: T.number,
  columns: T.array,
  rows: T.array,
  searchText: T.string,
  activeSearch: T.bool,
  filterOptions: T.array,
  menuFilterIndex: T.number,
  menuOptions: T.array,
  showModalNew: T.bool,
  rowSelected: T.array,
  showDialogDelete: T.bool,
  rowSelectedButton: T.array,
  changeWithButton: T.bool,
  titleModalNew: T.string,
  tipoMovto: T.number,
  idEtapa: T.number,
  nameEtapa: T.string,
  DaysPlazaForeign: T.string,
  DaysPlazaLocal: T.string,
  comboEtapas: T.array,
  positionEtapaSelected: T.number,
  titleComboModal: T.string,
})

const actionList = T.shape({
  handleChangeTypeProcessAction: T.func,
  handleClickButtonSearchAction: T.func,
  handleChangeTextSearchAction: T.func,
  handleClickButtonNewAction: T.func,
  handleClickLeaveNewAction: T.func,
  handleClickCheckTableAction: T.func,
  handleOpenDialogAction: T.func,
  handleClickLeaveDialogAction: T.func,
  requestGetListEtapasAction: T.func,
  requestUpdateStatusEtapasAction: T.func,
  handleClickDeleteRowAction: T.func,
  handleChangeTextModalAction: T.func,
  requestEtapasTypeProcessAction: T.func,
  handleChangeComboEtapaAction: T.func,
  requestCreateEtapaAction: T.func,
  handleClickButtonEditAction: T.func,
})

listEtapas.propTypes ={
  classes: T.object.isRequired,
  params: paramsProps,
  actions: actionList,
}

export default withStyles(Styles)(listEtapas);