/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
import grey from '@material-ui/core/colors/grey';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import ComboMultiple from 'components/FiltroSeleccion';
import Input from 'components/FormInput';
import DatePicker from 'components/SingleDatePicker';
import { withHandlers } from 'recompose';
import { Container, OH, Grid50 } from '../../styledComponents';
import AsignarUsuarios from "../AsignarUsuarios";

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
export class MovimientoNuevo extends React.Component {

  render() {
    const {
      regresarAction,
      onInputChangeProxy,
      onInputChangeAction,
      agregarRegistroAction,
      asignarUsuariosAction,
      asignacionSlc,
      regresarNuevoAction,
      agregarRegistroUsuarioAction,
      onRowUsuarioSelectProxy,
      postAsignacionAction,
      update,
      updateAsignacionAction,
      removeRowAction,
      removeRowUsuariosAction,
      collapse,
      showCollapseAction,
      checkUserAction,
      closeModalAction,
      modal,
      IdRegistro,
      NombreUsuario,
      nuevaAsignacion: {
        tipoFormulario,
        stepper,
        campos,
        combos,
        tablas,
        requiereValidacion,
      },
    } = this.props;

    const today = moment().startOf("day").utc().format('YYYY-MM-DD')
    const condicionFechas = campos.fechaFinal.valor ? today > campos.fechaFinal.valor.format('YYYY-MM-DD') : false

    return (
      <div>
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}> 
            <Tooltip title="Regresar" placement="bottom-end"> 
              <IconButton onClick={regresarAction}> 
                <ArrowBackIcon /> 
              </IconButton>
            </Tooltip>
            <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
              Nueva aplicación
            </Typography> 
          </Toolbar> 
        </AppBar>
        <OH>
          <Container style={{padding: '15px 0'}}>
            <OH style={{minHeight: 70}}>
              <Grid50>
                <Input
                  width='100%'
                  onChange={onInputChangeProxy}
                  nomCampo='Titulo de asignacion:'
                  tipoInput='text'
                  longitud='50'
                  inhabilitado={condicionFechas}
                  isComplete={campos.descripcion.campoValido}
                  valor={campos.descripcion.valor}
                  indice={1}
                />
              </Grid50>
            </OH>
            <OH style={{minHeight: 70}}>
              <Grid50>
                <ComboMultiple
                  inhabilitado={condicionFechas}
                  valor={campos.formulario.valor}
                  onChange={onInputChangeProxy}
                  opciones={combos.formularios}
                  campoValido
                  requerido
                  label="Selecciona formulario"
                  indice={2}
                  labelVacio="No existen formularios"
                />
              </Grid50>
              <Grid50>
                <OH style={{minHeight: 70}}>
                  <Grid50>
                    <DatePicker
                      fecha={campos.fechaInicio.valor}
                      onDateChange={onInputChangeAction}
                      idPosition={3}
                      campoValido={campos.fechaInicio.campoValido}
                      paddingRight={15}
                      paddingLeft={15}
                      label='Fecha inicio'
                      requerido
                      disabled={condicionFechas}
                    />
                  </Grid50>
                  <Grid50>
                    <DatePicker
                      fecha={campos.fechaFinal.valor}
                      onDateChange={onInputChangeAction}
                      idPosition={4}
                      campoValido={campos.fechaFinal.campoValido}
                      paddingRight={15}
                      paddingLeft={15}
                      label='Fecha final'
                      requerido
                      disabled={condicionFechas}
                    />
                  </Grid50>
                </OH>
              </Grid50>
            </OH>
          </Container>
        </OH>
        {
          stepper === 0 ? (
            <AsignarUsuarios
              updateAsignacionAction={updateAsignacionAction}
              update={update}
              campos={campos}
              combos={combos}
              tablas={tablas}
              removeRowAction={removeRowAction}
              disabled={campos.formulario.valor === ''}
              agregarRegistroAction={agregarRegistroAction}
              asignarUsuariosAction={asignarUsuariosAction}
              tipoFormulario={tipoFormulario}
              onInputChangeProxy={onInputChangeProxy}
              onCancelar={regresarAction}
              stepper={stepper}
              onRowsSelect={onRowUsuarioSelectProxy}
              rowsSelected={tablas.asignaciones.seleccionados}
              onGuardar={postAsignacionAction}
              collapse={collapse}
              showCollapseAction={showCollapseAction}
              checkUserAction={checkUserAction}
              modal={modal}
              closeModalAction={closeModalAction}
              IdRegistro={IdRegistro}
              requiereValidacion={requiereValidacion}
            />
          ) : (
            <AsignarUsuarios
              campos={tablas.asignaciones.datos[asignacionSlc].Campos}
              combos={combos}
              tablas={tablas.asignaciones.datos[asignacionSlc].Tablas}
              removeRowAction={removeRowUsuariosAction}
              disabled={campos.formulario.valor === ''}
              agregarRegistroAction={agregarRegistroUsuarioAction}
              asignarUsuariosAction={asignarUsuariosAction}
              tipoFormulario={tipoFormulario}
              onInputChangeProxy={onInputChangeProxy}
              onGuardar={regresarNuevoAction}
              asignacionSlc={asignacionSlc}
              stepper={stepper}
              onRowsSelect={onRowUsuarioSelectProxy}
              rowsSelected={tablas.asignaciones.datos[asignacionSlc].Tablas.asignaciones.seleccionados}
              collapse={collapse}
              showCollapseAction={showCollapseAction}
              checkUserAction={checkUserAction}
              modal={modal}
              closeModalAction={closeModalAction}
              IdRegistro={IdRegistro}
              requiereValidacion={requiereValidacion}
              NombreUsuario={NombreUsuario}
            />
          )
        }
      </div>
    );
  }
}

MovimientoNuevo.propTypes = {
  updateAsignacionAction: T.func,
  update: T.func,
  regresarAction: T.func,
  nuevaAsignacion: T.object,
  onInputChangeProxy: T.func,
  onInputChangeAction: T.func,
  agregarRegistroAction: T.func,
  asignacionSlc: T.number,
  asignarUsuariosAction: T.func,
  regresarNuevoAction: T.func,
  agregarRegistroUsuarioAction: T.func,
  onRowUsuarioSelectProxy: T.func,
  postAsignacionAction: T.func,
  removeRowAction: T.func,
  removeRowUsuariosAction: T.func,
  collapse: T.bool,
  showCollapseAction: T.func,
  checkUserAction: T.func,
  closeModalAction: T.func,
  modal: T.object,
  IdRegistro: T.number,
  NombreUsuario: T.string,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => (id) => (e) => {
      const {
        onChangeComboUsuarioAction,
        onInputChangeAction,
        onInputChangeUsuarioAction,
        onChangePuestosAction,
        onChangePuestosUsuarioAction,
        onChangeDepartamentosAction,
        nuevaAsignacion: {
          stepper,
        },
      } = props;
      
      if (stepper !== 1) {
        if (id === 5 || id === 6)
          if(id === 6)
            onChangePuestosAction(id, e)
          else
            onChangeDepartamentosAction(id, e);
        else 
          onInputChangeAction(id, e)
      } else {
        
        // eslint-disable-next-line no-lonely-if
        if (id === 5 || id === 6)
          if(id === 6)
            onChangePuestosUsuarioAction(id, e)
          else
            onChangeComboUsuarioAction(id, e);
        else
          onInputChangeUsuarioAction(id, e)
      }
        
    },
    onRowUsuarioSelectProxy:(props) => (rowSeleccionado,seleccionados) => {
      
      const {
        setUsuariosSeleccionadosAction,
        setUsuariosSeleccionadosUsuariosAction,
        nuevaAsignacion: {
          stepper,
        },
      } = props
 
      const rowSeleccionados = []
 
      seleccionados.forEach((seleccionado) => { 
        rowSeleccionados.push(seleccionado.index) 
      })

      if (stepper !== 1)
        setUsuariosSeleccionadosAction(rowSeleccionados)
      else
        setUsuariosSeleccionadosUsuariosAction(rowSeleccionados)
    },
  })
)(MovimientoNuevo);
