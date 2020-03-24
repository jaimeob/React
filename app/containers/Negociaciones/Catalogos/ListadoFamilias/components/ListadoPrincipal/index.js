import React from 'react';
import T from 'prop-types';
import Table from './components/Table'
import ModalCharge from './components/ModalCharges'

const ListadoPrincipal = props => {
  const {
    ListadoPrincipal: {
      tableFamily: {
        messageEmptyFamily,
        toolBar: {
          columnsToSearch,
          activeSearch,
          searchText,
          filterFamily,
          preMenuFilterIndex,
          menuFilterIndex,
          menuFilters,
          menuOptions,
        },
        Haeder:{
          headersFamily,
        },
        body: {
          dataFamily,
        },
      },
      chargesFamily,
    },
    actions: {
      handleClickButtonSearchAction,
      handleChangeTextSearchAction,
      requestGetFamilyAction,
      requestUpdateStatusFamilyAction,
      getChargesDepartamentAction,
      changeModalChargesAction,
      selectedChargeAction,
      saveChargeFamilyAction,
      handleClickAddFamilyAction,
      handleClickEditFamilyAction,
    },
  } = props;

  const onClickEditItem = id => {
    handleClickEditFamilyAction(id);
    handleClickAddFamilyAction(2);
  }

  const onClickUpdateRow = tableParams => {
    const params = {
      ...tableParams,
      filterFamily,
      preMenuFilterIndex,
      menuFilterIndex,
    }
    requestUpdateStatusFamilyAction(params);
  }

  const onClickOpenModalCharges = tableParams => {
    getChargesDepartamentAction(
      tableParams.idFamilys[0],
      true,
    );
  }
  const onClickCloseModalCharges = () => {
    changeModalChargesAction(
      0,
      false,
    );
  }
  const handleChangeCharge = (IdPuesto, Checked) => {
    selectedChargeAction(
      IdPuesto,
      Checked,
    );
  }
  const handleSaveChargeFamily = () => {
    const [add, del] = [[], []]
    const {
      listChargesOrigin,
      listCharges,
    } = chargesFamily;

    listCharges.forEach(charge => {
      const chargeOrigin = listChargesOrigin.find(chargeO => chargeO.IdPuesto === charge.IdPuesto);
      if (!(chargeOrigin.Checked === charge.Checked)) {
        if (chargeOrigin.Checked){
          del.push(charge.IdPuesto)
        } else {
          add.push(charge.IdPuesto)
        }
      }
    })
    saveChargeFamilyAction(chargesFamily.idFamilySelected, add.toString(), del.toString());
  }

  const propsModalCharges = {
    data: { chargesFamily },
    foo: {
      onClickCloseModalCharges,
      handleChangeCharge,
      handleSaveChargeFamily,
    },
  }

  return (
    <div>
      <Table
        columns={headersFamily}
        rows={dataFamily}
        columnsToSearch={columnsToSearch}
        activeSearch={activeSearch}
        searchText={searchText}
        onClickSearch={() => handleClickButtonSearchAction()}
        onChangeTextSearch={handleChangeTextSearchAction}
        menuFilterIndex={menuFilterIndex}
        menuFilters={menuFilters}
        menuOptions={menuOptions}
        onClickFilterList={requestGetFamilyAction}
        onClickUpdateRow={onClickUpdateRow}
        onClickOpenModalCharges={onClickOpenModalCharges}
        // onClickUpdateRow={requestUpdateStatusFamilyAction}
        onClickNew={handleClickAddFamilyAction}
        onClickEditItem={onClickEditItem}
        messageEmpty={messageEmptyFamily}
      />
      <ModalCharge
        propsModalCharges={propsModalCharges}
      />
    </div>
  );
}

const ListadoPrincipalState = T.shape({
  tableFamily: T.shape({
    messageEmptyFamily: T.string,
    toolBar: T.shape({
      columnsToSearch: T.array,
      activeSearch: T.bool,
      searchText: T.string,
      filterFamily: T.string,
      preMenuFilterIndex: T.number,
      menuFilterIndex: T.number,
      menuFilters: T.array,
      menuOptions: T.array,
    }),
    Haeder: T.shape({
      headersFamily: T.array,
    }),
    body: T.shape({
      dataFamily: T.array,
    }),
  }),
  chargesFamily: T.shape({
    idFamilySelected: T.number,
    modalCharge: T.bool,
    listChargesOrigin: T.array,
    listCharges: T.array,
  }),
})

// const familyActions = T.shape({
//   handleClickButtonSearchAction: T.func,
// })

ListadoPrincipal.propTypes = {
  ListadoPrincipal: ListadoPrincipalState,
  // actions: familyActions,
  actions: T.shape({
    handleClickButtonSearchAction: T.func,
    handleChangeTextSearchAction: T.func,
    requestGetFamilyAction: T.func,
    requestUpdateStatusFamilyAction: T.func,
    getChargesDepartamentAction: T.func,
    changeModalChargesAction: T.func,
    selectedChargeAction: T.func,
    saveChargeFamilyAction: T.func,
    handleClickAddFamilyAction: T.func,
    handleClickEditFamilyAction: T.func,
  }),
};

export default ListadoPrincipal;
