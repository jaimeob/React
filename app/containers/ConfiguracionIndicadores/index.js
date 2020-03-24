/**
 *
 * ConfiguracionIndicadores
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {DAEMON} from 'utils/constants';
import Appbar from 'components/Appbar';
import DataTable from 'components/DataTable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectConfiguracionIndicadores from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import EmptyConfiguracionIndicador from './components/EmptyConfiguracionIndicador';
import Table from "../CobranzaJudicial/Catalogos/CatalogoEtapas/components/listEtapas/components/Table";
import AlertDialog from "../CobranzaJudicial/Catalogos/CatalogoEtapas/components/listEtapas/components/alertDialog";
import RegistrarIndicador from './components/RegistrarIndicador';

/* eslint-disable react/prefer-stateless-function */


export class ConfiguracionIndicadores extends React.Component {
 
  updateStatusEtapas = params => {
    const {
      actions: {
        requestChangeIndicatorStatusAction,
        setMenuFilterIndexAction,
      },
      configuracionIndicadores:{
        detalleIndicador:{
          frontend:{
            ui:{
              changeWithButton,
            },
          },
        },
      },
      usuarioGlobal: {
        UsuarioId,
      },
    } = this.props;

    const {
      rows,
      state,
    } = params;

    if(changeWithButton){
      requestChangeIndicatorStatusAction([{
        idDepartamento: rows[0].IdDepartamento,
        idPuesto: rows[0].IdPuesto,
        idIndicadorDetalle: rows[0].Id,
        Activo: state === 'Desactivar' ? 0 : 1,
        idUsuario: UsuarioId,
      }])
    } else {
      const filas = rows.map(row => ({
        idDepartamento: row.IdDepartamento,
        idPuesto: row.IdPuesto,
        idIndicadorDetalle: row.Id,
        Activo: state === 'Desactivar' ? 0 : 1,
        idUsuario: UsuarioId,
      }))

      requestChangeIndicatorStatusAction(filas)
      setMenuFilterIndexAction(0);
    }
  }

  changeStatus = params => {
    if(params.state === "Desactivar"){
      if(params.type === 'button'){
        this.props.actions.handleClickDeleteRowAction(params.rows)
      }
      this.props.actions.handleOpenDialogAction(params.dialog);
    } else {
      this.updateStatusEtapas(params);
    }
  }

  editIndicator = params => {
    const {
      actions: {
        requestEditIndicatorAction,
        setEditAction,
      },
    } = this.props;

    const {
      Id,
      IdDepartamento,
      IdPuesto,
    } = params;
    
    setEditAction(true);
    requestEditIndicatorAction(Id, IdDepartamento, IdPuesto);
  }

  componentDidMount(){
    const {
      actions: {
        requestIndicatorConfigurationAction,
        requestGetCombosAction,
        getGruposAction,
      },
    } = this.props;
    getGruposAction();
    requestIndicatorConfigurationAction();
    requestGetCombosAction();
  }

  componentWillUnmount(){
    const {
      actions: {
        setEditAction,
        requestGetCombosAction,
        resetIndicatorDataAction,
        setIndicatorsAction,
        setStepperAction,
      },
    } = this.props;
   
    setEditAction(false);
    requestGetCombosAction();
    resetIndicatorDataAction();
    setIndicatorsAction();
    setStepperAction(0)
  }

  render() {
    const {
      permisos,
      actions: {
        setStepperAction,
        requestIndicatorsDepartmentPositionAction,
        handleClickButtonSearchAction,
        handleChangeTextSearchAction,
        handleChangeTypeProcessAction,
        handleClickCheckTableAction,
        handleClickLeaveDialogAction,
        setTextFieldAction,
        onChangeComboAction,
        setBonusAction,
        requestGetCombosAction,
        requestPostIndicatorAction,
        validateInputMinimumLengthAction,
        validateSemaphoreAction,
        requestIndicatorsWeightAction,
        resetIndicatorDataAction,
        setEditAction,
        setIndicatorsAction,
        setDialogBackAction,
      },
      configuracionIndicadores: {
        configuracionIndicadores: {
          backend: {
            datasources: {
              data,
            },
          },
          frontend: {
            stepper,
            ui: {
              headers,
              configuration,
            },
          },
        },
        detalleIndicador: {
          backend: {
            datasources: {
              dataIndicators,
            },
          },
          frontend: {
            ui: {
              edit,
              headersIndicators,
              nombreDepartamento,
              nombrePuesto,
              activeSearch,
              searchText,
              menuFilterIndex,
              filterOptions,
              menuOptions,
              rowSelected,
              showDialogDelete,
              changeWithButton,
              rowSelectedButton,
              idDepartamento,
              idPuesto,
            },
          },
        },
        registrarIndicador: {
          backend: {
            datasources: {
              indicators,
              departments,
              positions,
              indicatorType,
              indicatorMeasurement,
              indicatorDataTypes,
              indicatorOptimization,
              modules,
              storedProcedures,
              indicatorCuts,
              indicatorCutsPeriod,
              moduleOptions,
              grupos,
            },
          },
          frontend: {
            ui:{
              showDialogBack,
              indicatorDescription,
              selectedIndicator,
              selectedGrupo,
              selectedDepartment,
              selectedPosition,
              selectedIndicatorType,
              selectedIndicatorMeasurement,
              indicatorWeight,
              indicatorObjective,
              indicatorMinimum,
              indicatorMaximum,
              bonus,
              selectedIndicatorDataType,
              comparisonValue,
              selectedOptimization,
              selectedModule,
              selectedStoredProcedure,
              selectedIndicatorCut,
              selectedIndicatorCutPeriod,
              selectedModuleOption,
              maloMin,
              maloMax,
              regularMin,
              regularMax,
              buenoMin,
              buenoMax,
              errors,
              selectedIndicatorDetail,
            },
          },
        },
      },
    } = this.props;
   
    let component = null;

    let activeIndicator = -1;
    let idsIndicators = [];

    if(dataIndicators.length > 0 && selectedIndicatorDetail !== 0){
      const indicadorSeleccionado = dataIndicators.find(el => el.Id === selectedIndicatorDetail);
      activeIndicator = indicadorSeleccionado.Estatus === filterOptions[0] ? 1 : 0;
    }

    if(dataIndicators.length > 0){
      idsIndicators = dataIndicators.map(el => el.idIndicador);
    }

    const indicatorParams = {
      indicatorDescription,
      selectedIndicator,
      selectedDepartment,
      selectedPosition,
      indicators,
      departments,
      positions,
      indicatorType,
      selectedIndicatorType,
      indicatorMeasurement,
      selectedIndicatorMeasurement,
      indicatorWeight,
      indicatorObjective,
      indicatorMinimum,
      indicatorMaximum,
      bonus,
      indicatorDataTypes,
      selectedIndicatorDataType,
      comparisonValue,
      indicatorOptimization,
      selectedOptimization,
      modules,
      selectedModule,
      storedProcedures,
      selectedStoredProcedure,
      indicatorCuts,
      selectedIndicatorCut,
      indicatorCutsPeriod,
      selectedIndicatorCutPeriod,
      maloMin,
      maloMax,
      regularMin,
      regularMax,
      buenoMin,
      buenoMax,
      moduleOptions,
      selectedModuleOption,
      errors,
      edit,
      activeIndicator,
      selectedIndicatorDetail,
      idsIndicators,
      grupos,
      selectedGrupo,
    }

    const indicatorActions = {
      setTextFieldAction,
      onChangeComboAction,
      setBonusAction,
      requestGetCombosAction,
      requestPostIndicatorAction,
      validateInputMinimumLengthAction,
      validateSemaphoreAction,
      requestIndicatorsWeightAction,
    }

    const emptyConfiguracionIndicadorActions = {
      setStepperAction,
      resetIndicatorDataAction,
    }

    switch(stepper){
      case 0: 
        component = 
         <React.Fragment>
           <Appbar 
             texto='Configuración indicador por puesto'
           />
           <div  
             style={
               {
                 height: '85vh',
                 padding: '0 8px 8px 8px',
                 overflow: 'auto',
               }
             }>
          
             {
               data.length > 0
                 ? <DataTable 
                   data = {data}
                   headers = {headers}
                   configuracion = {configuration}
                   idPosition = 'id'
                   permisos={permisos}
                   {...(permisos.normales.registrar === 1 ? {
                     onClickAgregar: () => {
                       resetIndicatorDataAction(); 
                       setEditAction(false);
                       setStepperAction(2);
                     },
                   } : {} )}
                   
                   opciones = {
                     [
                       {...(permisos.normales.editar === 1 ? {'icon' : 'ver', 'action': (index) => { 
                         requestIndicatorsDepartmentPositionAction(data[index]);
                       }} : {} )},
                       // {'icon' : 'eliminar', 'action': () => alert('Eliminar')},
                     ]
                   }
                   // acciones = {acciones}
                   temporal 
                   message='¿Esta seguro que desea eliminar la(s) NuevoMolde(s)?'
                   mensajeTexto="¡No se encontraron coincidencias! Sin resultados obtenidos."
                   params= {
                     {
                       height: '40',
                     }
                   }
                   titulo='Secciones'
                 />
                 : <EmptyConfiguracionIndicador actions={emptyConfiguracionIndicadorActions} />
             }
           </div>
         </React.Fragment>
        break;
      case 1:
        component = <React.Fragment>
          <Appbar 
            texto={`Indicadores ${nombreDepartamento} - ${nombrePuesto}`}
            onClickRegresar={() => {
              resetIndicatorDataAction();
              requestGetCombosAction();
              setIndicatorsAction();
              setStepperAction(0);
            }}
            hayCambios={false}
          />
          <div  
            style={
              {
                height: '85vh',
                padding: '0 8px 8px 8px',
                overflow: 'auto',
              }
            }>
            <AlertDialog
              open={showDialogDelete}
              typeAlert='Report'
              typeOptions='Select'
              title='Confirmación'
              message='¿Esta seguro que desea eliminar el registro?'
              onClickAccept={() => this.updateStatusEtapas({state: 'Desactivar', rows: changeWithButton ? rowSelectedButton : rowSelected})}
              onClickCancel={() => handleClickLeaveDialogAction('showDialogDelete')}
            />
            <Table
              permisos={permisos}
              columns={headersIndicators}
              rows={dataIndicators}
              columnsToSearch={["Nombre"]}
              activeSearch={activeSearch}
              rowsPerPage={10}
              searchText={searchText}
              onClickSearch={handleClickButtonSearchAction}
              onChangeTextSearch={handleChangeTextSearchAction}
              menuFilterIndex={menuFilterIndex}
              menuFilters={filterOptions}
              menuOptions={menuOptions}
              onClickFilterList={handleChangeTypeProcessAction}
              onClickUpdateRow={this.changeStatus}
              onClickNew={() => {
                setEditAction(true);
                onChangeComboAction(13, {value: 2, label: 'Puesto'});
                onChangeComboAction(2, {value: idDepartamento, label: nombreDepartamento});
                onChangeComboAction(3, {value: idPuesto, label: nombrePuesto});
                setStepperAction(2);
              }}
              onClickEditItem={this.editIndicator}
              showNew
              showFilter
              showOption
              showActions
              showChecks
              onClickCheck={handleClickCheckTableAction}
              selected={rowSelected}
              progress={false}
            />
          </div>
        </React.Fragment>
        break;
      case 2:
        component = <React.Fragment>
          <AlertDialog
            open={showDialogBack}
            typeAlert='Report'
            typeOptions='Select'
            title='Confirmación'
            message='Existen datos no guardados, ¿Desea continuar?'
            onClickAccept={() =>{
              setDialogBackAction();
              setEditAction(false);
              requestGetCombosAction();
              resetIndicatorDataAction();
              setIndicatorsAction();
              setStepperAction(0)
            }}
            onClickCancel={setDialogBackAction}
          />
          <Appbar 
            texto={selectedIndicatorDetail !== 0 ? 'Actualizar indicador' : 'Registrar indicador'}
            onClickRegresar={setDialogBackAction}
            // hayCambios={false}
          />
          <div  
            style={
              {
                height: '85vh',
                padding: '0 8px 8px 8px',
                overflow: 'auto',
              }
            }>
            <RegistrarIndicador
              params={indicatorParams}
              actions={indicatorActions}
              permisos={permisos}
            />
          </div>
        </React.Fragment>
        break;
      default:
        break;
    }
    
    return (
      <div>
        <Helmet>
          <title>ConfiguracionIndicadores</title>
          <meta
            name="description"
            content="Description of ConfiguracionIndicadores"
          />
        </Helmet>
        {component}
      </div>
    );
  }
}

ConfiguracionIndicadores.propTypes = {
  dispatch: T.func,
  configuracionIndicadores: T.object,
  actions: T.object,
  usuarioGlobal: T.object,
};

const mapStateToProps = createStructuredSelector({
  configuracionIndicadores: makeSelectConfiguracionIndicadores(),
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

const withReducer = injectReducer({ key: 'configuracionIndicadores', reducer });
const withSaga = injectSaga({ key: 'configuracionIndicadores', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore()

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(ConfiguracionIndicadores);
