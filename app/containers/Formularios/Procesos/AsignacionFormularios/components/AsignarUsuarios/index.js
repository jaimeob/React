/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
import {Typography, Button} from '@material-ui/core';
import { compose } from 'redux';
import moment from 'moment';
import { isNull } from 'util';
import { withStyles } from '@material-ui/core/styles';
import ComboMultiple from 'components/FiltroSeleccion';
import { Container, OH, Grid50 } from '../../styledComponents';
import Tabla from '../../../../../../components/DataTable';
import BotonSuccess from "../../../../../../components/BotonSuccess";
import BotonCancelar from "../../../../../../components/BotonCancelar";
import Modal from '../../../../components/ListadoFormulario/components/Modal/alertDialog';

const styles = ({
  formControl: {
    marginTop: 0,
    marginBottom: 0,
    width: '100%',
    maxWidth: '100%',
  },
  tab: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 1,
  },
  boton: {
    float: 'right !important',
    marginLeft: '15px !important',
  },
  paddingNone: {
    paddingTop : '0 !important',
    paddingBottom: '0 !important',
  },
})

// eslint-disable-next-line react/prefer-stateless-function
export class AsignarUsuarios extends React.Component {

  render() {
    const {
      collapse,
      campos,
      combos,
      tablas,
      agregarRegistroAction,
      stepper,
      asignarUsuariosAction,
      onInputChangeProxy,
      onCancelar,
      // disabled,
      onRowsSelect,
      rowsSelected,
      onGuardar,
      update,
      updateAsignacionAction,
      showCollapseAction,
      checkUserAction,
      closeModalAction,
      modal,
      IdRegistro,
      requiereValidacion,
      NombreUsuario,
    } = this.props;

    let filterDepartamentos
    if (campos.departamentosSlc.valor.length > 0){
      if (campos.departamentosSlc.valor[0].value === 0) {
        filterDepartamentos = combos.departamentos.filter(depto => depto.value === 0)
      } else {
        filterDepartamentos = combos.departamentos
      }
    } else {
      filterDepartamentos = combos.departamentos
    }
   
    const filteredPositions =  combos.puestos.filter(el => campos.departamentosSlc.valor.some(elem => elem.value ===  el.idDepartamento));
    const filteredUsers =  combos.usuarios;
    const filteredUsers2 =  tablas.asignaciones.datos.length === 0 ? filteredUsers : filteredUsers.filter(fu => !tablas.asignaciones.datos.map(dato => dato.IdUsuario).includes(fu.UsuarioId))

    const cabeceraAsignacion = [
      {
        name: 'IdAsignacion',
        label: 'ID',
      },
      {
        name: 'Usuario',
        label: 'Usuario',
      },
      {
        name: 'Plaza',
        label: 'Plaza',
      },
      {
        name: 'Departamento',
        label: 'Departamento',
      },
      {
        name: 'Puesto',
        label: 'Puesto',
        options: {
          setCellProps: () => ({ 
            style: { 
              textAlign: 'left', 
              padding: 8, 
              width: '25%', 
            }, 
          }),
        },
      },
      {
        name: 'options',
        label: [],
      },
    ]

    // const incompletas = []
    
    // tablas.asignaciones.datos.forEach(asignacion => {
    //   if(asignacion.info) {
    //     incompletas.push(asignacion)
    //   }
    // });

    const configuracion = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      ordenar: false,
      seleccionable: 'multiple',
      registrosPorPagina: 10,
    }

    const today = moment().startOf("day").utc().format('YYYY-MM-DD')
    const fechaInicioBool = campos.fechaInicio ? isNull(campos.fechaInicio.valor) : false
    const formularioBool = campos.formulario ? campos.formulario.valor === '' : false
    const descripcionBool = campos.descripcion ? campos.descripcion.valor === '' : false
    const condicionFechas = campos.fechaFinal ? campos.fechaFinal.valor ? today > campos.fechaFinal.valor.format('YYYY-MM-DD') : false : false

    return (
      <OH>
        <Container style={{paddingBottom: 15}}>
          <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', paddingLeft: 15, paddingTop: 15}}> 
            {
              stepper === 1 ? `Usuarios evaluadores de ${ NombreUsuario }` : 'Usuarios asignados'
            }
          </Typography>
          <OH style={{overflow: 'hidden'}}>
            <Grid50>
              <ComboMultiple
                inhabilitado={condicionFechas}                
                valor={campos.usuario.valor}
                onChange={onInputChangeProxy}
                opciones={filteredUsers2}
                campoValido
                requerido
                label="Selecciona usuario:"
                indice={7}
              />
            </Grid50>
            <Grid50>
              <div style={{marginTop: 11, float: 'left'}}>
                <BotonSuccess
                  disabled={
                    campos.departamentosSlc.valor === [] ||
                    campos.puestosSlc.valor === [] ||
                    campos.usuario.valor === ''
                  }
                  label='Agregar'
                  onClick={agregarRegistroAction}
                />
              </div>
              <div style={{marginTop: 11, float: 'left', marginLeft: 15}}>
                <Button
                  style={{color: 'blue'}}
                  onClick={showCollapseAction}
                >
                  {
                    collapse ? 'Mostrar filtros' : 'Ocultar filtros'
                  }
                </Button>
              </div>
            </Grid50>
          </OH> 
          {
            !collapse ? 
              <OH style={{overflow: 'hidden'}}>
                <Grid50>
                  <ComboMultiple
                    inhabilitado={condicionFechas}
                    valor={campos.departamentosSlc.valor}
                    onChange={onInputChangeProxy}
                    opciones={filterDepartamentos}
                    campoValido
                    requerido
                    multiple
                    label="Selecciona deptos. a aplicar"
                    indice={5}
                  />
                </Grid50>
                <Grid50>
                  <ComboMultiple
                    inhabilitado={condicionFechas}                
                    valor={campos.puestosSlc.valor}
                    onChange={onInputChangeProxy}
                    opciones={filteredPositions}
                    campoValido
                    requerido
                    multiple
                    label="Selecciona puestos a aplicar"
                    indice={6}
                  />
                </Grid50>
              </OH> : null
          }
          
          <OH>
            <Tabla
              data = {tablas.asignaciones.datos}
              headers = {cabeceraAsignacion}
              configuracion = {configuracion}
              idPosition = "IdAsignacion"
              opciones = {
                [
                  {...(requiereValidacion && stepper === 0 ?  {'icon' : 'informacion', 'message' : 'Es necesario capturar al menos un usuario evaluador..', 'action' : (IdAsignacion) => asignarUsuariosAction(IdAsignacion)} : null )},
                  {...(requiereValidacion && stepper === 0 ?  {'icon' : 'ver', 'action' : (IdAsignacion) => asignarUsuariosAction(IdAsignacion)} : null), 'gris' : true},
                  {'icon' : 'eliminar', 'action' : (IdAsignacion) => checkUserAction(IdAsignacion), 'gris' : true},
                ]
              }
              elevacion={0}
              small={0}
              onRowsSelect={onRowsSelect}
              rowsSelected={rowsSelected}
            />
            <OH style={{overflow: 'hidden'}}>
              {
                update ? condicionFechas ? null : (
                  <div style={{float: 'right', marginRight: 15}}>
                    <BotonSuccess
                      disabled={
                        fechaInicioBool ||
                        formularioBool ||
                        descripcionBool ||
                        condicionFechas
                      }
                      label='Actualizar'
                      onClick={updateAsignacionAction}
                    />
                  </div>
                ) : (
                  <div style={{float: 'right', marginRight: 15}}>
                    <BotonSuccess
                      disabled={
                        fechaInicioBool ||
                        formularioBool ||
                        descripcionBool ||
                        condicionFechas
                      }
                      label={ stepper === 0 ? 'Guardar' : 'Atras'}
                      onClick={onGuardar}
                    />
                  </div>
                )
              }
              
              {
                onCancelar ? (
                  <div style={{float: 'right', marginRight: 15}}>
                    <BotonCancelar
                      label='Cerrar'
                      onClick={onCancelar}
                    />
                  </div>
                ) : null
              }
            </OH>
          </OH>
        </Container>
        <Modal  
          open={modal.open} 
          typeAlert='Report' 
          typeOptions='Select' 
          title='Confirmar....' 
          message='El usuario ya contesto el formulario, ¿desea continuar?'
          onClickCancel={closeModalAction}
          onClickAccept={() => checkUserAction(IdRegistro, true)}
        />
      </OH>
    );
  }
}

AsignarUsuarios.propTypes = {
  collapse: T.bool,
  update: T.bool,
  stepper: T.number,
  campos: T.object,
  combos: T.object,
  tablas: T.object,
  onCancelar: T.func,
  onInputChangeProxy: T.func,
  agregarRegistroAction: T.func,
  asignarUsuariosAction: T.func,
  // disabled: T.bool,
  onRowsSelect: T.func,
  rowsSelected: T.array,
  onGuardar: T.func,
  updateAsignacionAction: T.func,
  requiereValidacion: T.bool,
  showCollapseAction: T.func,
  checkUserAction: T.func,
  modal:T.object,
  closeModalAction: T.object,
  IdRegistro: T.number,
  NombreUsuario: T.string,
};

export default compose(
  withStyles(styles),
)(AsignarUsuarios);
