import React from 'react';
// import _ from 'lodash'
import T from 'prop-types';
import Tabla from './components/Table';

// eslint-disable-next-line
function ListadoFormularios (props) { 
  const {
    // screen,
    selectSearch,
    data,
    actions: {
      handleClickButtonSearchListAction,
      handleTextSearchChangeListAction,
      handleStepGoNextAction,
      requestFormsListAction,
      requestUpdateStatusFormsListAction,
      handleClickEdit,
      handleClickDeactivateCfgForm,
      handleClickDeleteModal,
      handleClickCloseDeleteModal,
    },
    ui: {
      openDeleteModal = false,
    },
    textSearch,
  } = props

  const headers = ([
    // { id: '0', numeric: false, disablePadding: true,  align: 'left', label: '#' },
    {
      id: '0',
      numeric: true,
      disablePadding: false,
      align: 'left',
      label: 'Departamento',
      dataKey: ['departamento', 'nombre'],
    },
    { id: '1',
      numeric: true,
      disablePadding: false,
      align: 'left',
      label: 'Formulario',
      dataKey: ['nombre'],
    },
    {
      id: '2',
      numeric: true,
      disablePadding: false,
      align: 'right',
      label: 'Estatus',
      dataKey: (row) => row.activo ? 'Activo' : 'Inactivo',
    },
    { 
      id: '3',
      numeric: true,
      disablePadding: false,
      align: 'right',
      label: 'Opciones',
    },
  ])

  const menuFilters = [
    'Activos',
    'Inactivos',
  ]

  const menuOptions = [
    'Activar',
    'Desactivar',
  ]

  return (
    <div>
      <Tabla
        headers={headers}
        selectSearch={selectSearch}
        data={data}
        onClickShearchAccion={handleClickButtonSearchListAction}
        onChangeTextSearch={handleTextSearchChangeListAction}
        textSearch={textSearch}
        menuFilters={menuFilters}
        onClickFilterList={requestFormsListAction}
        onClickEditItem={handleClickEdit}
        onClickDeleteItem={handleClickDeleteModal}
        onClickCancelDelete={handleClickCloseDeleteModal}
        onAcceptDeleteForm={handleClickDeactivateCfgForm}
        openDeleteModal={openDeleteModal}
        menuOptions={menuOptions}
        handleStepGoNextAction={handleStepGoNextAction}
        requestUpdateStatusFormsList={requestUpdateStatusFormsListAction}
      />
    </div>
  );
}

ListadoFormularios.propTypes = {
  // screen: T.string,
  selectSearch: T.bool,
  data: T.array,
  ui: T.shape({
    openDeleteModal: T.bool,
  }),
  actions: T.shape({
    handleClickButtonSearchListAction: T.func,
    handleTextSearchChangeListAction: T.func,
    handleStepGoNextAction: T.func,
    requestFormsListAction: T.func,
    requestUpdateStatusFormsListAction: T.func,
    handleClickDeleteModal: T.func,
  }),
  textSearch: T.string,
}

export default ListadoFormularios;