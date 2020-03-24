/**
 *
 * ConfiguracionJerarquia
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Appbar from 'components/Appbar';
import EmptyJerarquia from 'images/iconos/EmptyFormPublicadoJerarquia.svg';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Spinner from 'components/Spinner';
import JSZip from 'jszip'
import{enqueueSnackbar}from'reducers/notifications/actions';
import * as FileSaver from 'file-saver';
import makeSelectConfiguracionJerarquia from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import Empty from './components/Empty';
import Table from './components/Tabla';
import Modal from '../Formularios/components/ListadoFormulario/components/Modal/alertDialog'; 
import RegistrarJerarquia from './components/RegistrarJerarquia';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

/* eslint-disable react/prefer-stateless-function */
export class ConfiguracionJerarquia extends React.Component {
  componentDidMount(){
    const {
      actions: {
        requestGetDataAction,
        // obtenerPermisosAction,
      },
    } = this.props;
    
    requestGetDataAction();
    // obtenerPermisosAction();   
  }
  
  componentWillUnmount(){
    this.props.actions.resetContainerAction();
  }

  editRow = row => {
    const {
      actions: {
        requestEditJerarquiaAction,
        setActiveAction,
      },
    } = this.props;

    requestEditJerarquiaAction(row.id);
    setActiveAction(row.Estatus);
  }

  deActivateRows = (rows) => {
    const {
      actions: {
        setModalDeleteAction,
        setSelectedItemsAction,
      },
    } = this.props;

    setModalDeleteAction();
    setSelectedItemsAction(rows);
  }

  downloadFile(row){
    try {
      pdfMake.createPdf({
        // pageOrientation: 'landscape',
        left: 60, // the left position
        right: 60, // the right position
        content: [
          {
            image: row.Archivo,
            width: 595.28,
          },
        ],
        
      }).download('Jerarquía');
    } catch(err) {
      this.props.dispatch(enqueueSnackbar({
        message: 'Error al descargar el archivo',
        options: { 
          variant: 'error', 
        }, 
      }));
    }
  }

  zipFile(pdfDocGenerator){
    return new Promise((resolve, reject) => {
      pdfDocGenerator.getBlob((data, err) => {
        if(data){
          resolve(data);
        } else {
          reject(err);
        }
      })
    });
  }

  downloadRows(rows){
    const zip = new JSZip();

    try {
      rows.forEach((row, index) => {
        const pdfDocGenerator = pdfMake.createPdf({
          // pageOrientation: 'landscape',
          left: 60, // the left position
          right: 60, // the right position
          content: [
            {
              image: row.Archivo,
              width: 595.28,
            },
          ],
        });
  
        const file = this.zipFile(pdfDocGenerator).then(data => (data))
      
        zip.file(`Archivo_${index}.pdf`, file, { binary: true });
      })
  
      zip.generateAsync({type:"blob"})
        .then((content) => {
        /*
          const blob = new Blob([content])
          const btnDownloadZip = document.createElement('a')
  
          btnDownloadZip.href = URL.createObjectURL(blob)
          btnDownloadZip.setAttribute('download', 'Jerarquias.zip')
          btnDownloadZip.click()
        */
          FileSaver.saveAs(content, "Jerarquias.zip");
        });
    } catch(err) {
      this.props.dispatch(enqueueSnackbar({
        message: 'Error al descargar los archivos',
        options: { 
          variant: 'error', 
        }, 
      }));
    }
  }
  
  render() {
    const {
      permisos,
      dispatch,
      actions: {
        setStepperAction,
        setModalDeleteAction,
        requestUpdateStatusDataAction,
        requestGetDepartmentsAndPositionsAction,
        onChangeComboAction,
        setJerarquiaAction,
        requestPostJerarquiaAction,
        regresarListadoAction,
        setModalBackAction,
        setTotalPositionsAction,
        setImageFileAction,
        setNameAction,
        setActiveAction,
        requestNameAction,
        setToggleModalAction,
      },
      configuracionJerarquia: {
        stepper,
        modalDelete,
        modalBack,
        listadoJerarquias: {
          backend: {
            data,
          },
          frontend: {
            rows,
            selectedItems,
          },
        },
        registrarJerarquia: {
          backend: {
            departments,
            positions,
          },
          frontend: {
            openModal,
            active,
            selectedDepartment,
            idJerarquia,
            name,
            jerarquia,
            totalPositions,
            errorLabel,
            error,
          },
        },
      },
    } = this.props;

    let component = null;

    const registrarJerarquiaParams = {
      departments,
      positions,
      selectedDepartment,
      idJerarquia,
      jerarquia,
      totalPositions,
      permisos,
      active,
      name,
      errorLabel,
      error,
      openModal,
    }

    const registrarJerarquiaActions = {
      requestGetDepartmentsAndPositionsAction,
      onChangeComboAction,
      setJerarquiaAction,
      requestPostJerarquiaAction,
      setModalBackAction,
      setTotalPositionsAction,
      setImageFileAction,
      dispatch,
      setNameAction,
      requestNameAction,
      setToggleModalAction,
    }

    switch(stepper) {
      case 0:
        component = <React.Fragment>
          <Appbar 
            texto='Configuración jerarquia'
          />
          <div  
            style={
              {
                height: '85vh',
                padding: '0 16px 16px 16px',
                overflow: 'auto',
              }
            }>
            {
              data.length > 0
                ? <Table
                  rows={rows}
                  data={data}
                  search
                  filters
                  addNewRow={() => {
                    setActiveAction(true);
                    setStepperAction(1);
                  }}
                  toolbarActions={
                    [
                      {...(permisos.especiales.activar  === 1 ? (
                        {
                          title: 'Activar', icon: 'activate', action: (selectedRows) => requestUpdateStatusDataAction(1, selectedRows.map(el => el.id)),
                        }
                      ) : null )},
                      {...(permisos.normales.eliminar  === 1 ? (
                        {
                          title: 'Inactivar', icon: 'deactivate', action: (selectedRows) => this.deActivateRows(selectedRows.map(el => el.id)),
                        }
                      ) : null )},
                      {
                      },
                      {...(permisos.especiales.descargararchivo  === 1 ? (
                        {
                          title: 'Descargar', icon: 'download', action: (selectedRows) => this.downloadRows(selectedRows),
                        }
                      ) : null )},
                    ]
                  }
                  actions={
                    [
                      {...(permisos.normales.editar  === 1 || permisos.normales.sololectura === 1 ? (
                        {
                          title: 'Editar', icon: 'edit', action: (row) => this.editRow(row),
                        }
                      ) : null )},
                      {...(permisos.normales.eliminar  === 1 ? (
                        {
                          title: 'Eliminar', icon: 'delete', action: (row) => this.deActivateRows([row.id]),
                        }
                      ) : null )},
                      {...(permisos.especiales.descargararchivo  === 1 ? (
                        {
                          title: 'Descargar', icon: 'download', action: (row) => this.downloadFile(row),
                        }
                      ) : null )},
                    ]
                  }
                />
                : <Empty 
                  image={EmptyJerarquia} 
                  onClickButton={() =>{ 
                    setActiveAction(true);
                    setStepperAction(1);
                  }} 
                  buttonTitle="AGREGAR JERARQUIA"
                  text="Una vez que se registren jerarquías se visualizarán en este apartado. Para registrar una jerarquía debe dar clic en el botón"
                />
            }
          </div>
        </React.Fragment>
        break;
      case 1:
        component = <React.Fragment>
          <Appbar 
            texto='Registrar jerarquia'
            onClickRegresar={setModalBackAction}
          />
          <div  
            style={
              {
                height: '85vh',
                padding: '0 8px 8px 8px',
                overflow: 'auto',
              }
            }>
            <RegistrarJerarquia 
              params={registrarJerarquiaParams}
              actions={registrarJerarquiaActions}
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
          <title>Configuración de Jerarquía</title>
          <meta
            name="description"
            content="Description of ConfiguracionJerarquia"
          />
        </Helmet>
        <Spinner />
        {component}
        <Modal 
          open={modalDelete}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message="¿Está seguro que desea eliminar el registro seleccionado?"
          onClickAccept={() => this.props.actions.requestUpdateStatusDataAction(0, selectedItems) }
          onClickCancel={setModalDeleteAction}
        />
        <Modal 
          open={modalBack}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message="Existen datos no guardados, ¿Está seguro de que desea cerrar?"
          onClickAccept={regresarListadoAction}
          onClickCancel={setModalBackAction}
        />
      </div>
    );
  }
}

ConfiguracionJerarquia.propTypes = {
  configuracionJerarquia: T.object,
  actions: T.object,
  dispatch: T.func,
  permisos: T.object,
};

const mapStateToProps = createStructuredSelector({
  configuracionJerarquia: makeSelectConfiguracionJerarquia(),
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

const withReducer = injectReducer({ key: 'configuracionJerarquia', reducer });
const withSaga = injectSaga({ key: 'configuracionJerarquia', saga, mode: DAEMON });
const withActions = Actions.bindReduxStore()

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(ConfiguracionJerarquia);
