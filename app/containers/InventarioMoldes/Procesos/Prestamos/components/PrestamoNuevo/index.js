/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
import grey from '@material-ui/core/colors/grey';
import { Grid, AppBar, Toolbar, Typography, TextField, MenuItem} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Container, FormContainer } from '../../styledComponents';
import Tabla from '../../../../../../components/DataTable';
import Modal from '../../../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import BotonSuccess from "../../../../../../components/BotonSuccess";
import BotonCancelar from "../../../../../../components/BotonCancelar";

const styles = ({
  formControl: {
    marginTop: 0,
    marginBottom: 0,
    width: '100%',
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
      onInputChangeAction,
      classes,
      agregarPrestamoAction,
      disabled,
      removeRowAction,
      editRowAction,
      editarPrestamoAction,
      updateRegistro,
      idxRegistro,
      postPrestamosAction,
      openModalAction,
      closeModalAction,
      modal,
      nuevoPrestamo : {
        campos: {
          descripcion,
          plaza,
          almacen,
          moldeOrigen,
          moldeDestino,
          piezaOrigen,
          piezaDestino,
        },
        combos: {
          plazas,
          almacenes,
          moldesOrigen,
          moldesDestino,
          piezasOrigen,
          piezasDestino,
        },
        tablas: {
          prestamos,
        },
      },
    } = this.props;

    const cabeceraPrestamo = [
      {
        name: 'CodigoOrigen',
        label: 'Código origen',
      },
      {
        name: 'InsumoOrigen',
        label: 'Pieza origen',
      },
      {
        name: 'IdentificadorOrigen',
        label: 'Identificador origen',
      },
      {
        name: 'CodigoDestino',
        label: 'Código destino',
      },
      {
        name: 'InsumoDestino',
        label: 'Pieza destino',
      },
      {
        name: 'IdentificadorDestino',
        label: 'Identificador destino',
      },
      {
        name: 'Monto',
        label: 'Cantidad',
      },
      {
        name: 'options',
        label: [],
      },
    ]
    
    const configuracion = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      ordenar: false,
      seleccionable: 'none',
      registrosPorPagina: 10,
    }

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
              Nuevo prestamo
            </Typography> 
          </Toolbar> 
        </AppBar>
        <Container>
          <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', marginLeft: 25, marginTop: 15}}> 
            Información general
          </Typography>
          <FormContainer>
            <Grid
              container
              spacing={16}
            >
              <Grid
                item
                container
                spacing={16}
                xs={5}
              >
                <TextField
                  className={classes.formControl}
                  label="Descripción"
                  margin="normal"
                  disabled={descripcion.disabled}
                  onChange={(e) => onInputChangeAction(0, e)}
                  error={descripcion.error}
                  value={descripcion.valor}
                  helperText="* Requerido"
                  fullWidth
                />
                <Grid
                  item
                  xs={6}
                  style={{paddingLeft: 0}}
                >
                  <TextField
                    select
                    className={classes.formControl}
                    label="Plaza"
                    margin="normal"
                    disabled={plaza.disabled}
                    onChange={(e) => onInputChangeAction(1, e)}
                    error={plaza.error}
                    value={plaza.valor}
                    helperText="* Requerido"
                    fullWidth
                  >
                    {plazas.map(plazaInd => (
                      <MenuItem key={plazaInd.IdPlaza} value={plazaInd.IdPlaza}>
                        {plazaInd.Nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{paddingRight: 0}}
                >
                  <TextField
                    select
                    className={classes.formControl}
                    label="Almacen"
                    margin="normal"
                    disabled={almacen.disabled}
                    onChange={(e) => onInputChangeAction(2, e)}
                    error={almacen.error}
                    value={almacen.valor}
                    helperText="* Requerido"
                    fullWidth
                  >

                    {almacenes.map(almacenInd => (
                      <MenuItem key={almacenInd.IdAlmacen} value={almacenInd.IdAlmacen}>
                        {almacenInd.Almacen}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid
                item
                xs={5}
              ></Grid>
              <Grid
                item
                xs={2}
              ></Grid>
              <Grid
                container
                spacing={16}
                xs={12}
              >
                <Grid
                  item
                  xs={5}
                >
                  <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', marginTop: 15}}> 
                    Origen
                  </Typography>
                  <Grid
                    item
                    xs={6}
                    style={{paddingRight: 0}}
                  >
                    <TextField
                      select
                      className={classes.formControl}
                      label="Molde"
                      margin="normal"
                      disabled={moldeOrigen.disabled}
                      onChange={(e) => onInputChangeAction(3, e)}
                      error={moldeOrigen.error}
                      value={moldeOrigen.valor}
                      helperText="* Requerido"
                      fullWidth
                    >
                      {moldesOrigen.map(moldeInd => (
                        <MenuItem key={moldeInd.IdMolde} value={moldeInd.IdMolde}>
                          {`${moldeInd.IdMolde} - ${moldeInd.Nombre} - ${moldeInd.Version}`}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{paddingRight: 0}}
                  >
                    <TextField
                      select
                      className={classes.formControl}
                      label="Pieza"
                      margin="normal"
                      disabled={piezaOrigen.disabled}
                      onChange={(e) => onInputChangeAction(4, e)}
                      error={piezaOrigen.error}
                      value={piezaOrigen.valor}
                      helperText="* Requerido"
                      fullWidth
                    >
                      {piezasOrigen.map(piezaInd => (
                        <MenuItem key={piezaInd.IdCodigo} value={piezaInd.IdCodigo}>
                          {`${piezaInd.IdCodigo} - ${piezaInd.Insumo} - ${piezaInd.Identificador}`}                          
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={5}
                >
                  <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', marginTop: 15}}> 
                    Destino
                  </Typography>
                  <Grid
                    item
                    xs={6}
                    style={{paddingRight: 0}}
                  >
                    <TextField
                      select
                      className={classes.formControl}
                      label="Molde"
                      margin="normal"
                      disabled={moldeDestino.disabled}
                      onChange={(e) => onInputChangeAction(5, e)}
                      error={moldeDestino.error}
                      value={moldeDestino.valor}
                      helperText="* Requerido"
                      fullWidth
                    >
                      {moldesDestino.map(moldeInd => (
                        <MenuItem key={moldeInd.IdMolde} value={moldeInd.IdMolde}>
                          {`${moldeInd.IdMolde} - ${moldeInd.Nombre} - ${moldeInd.Version}`}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{paddingRight: 0}}
                  >
                    <TextField
                      select
                      className={classes.formControl}
                      label="Pieza"
                      margin="normal"
                      disabled={piezaDestino.disabled}
                      onChange={(e) => onInputChangeAction(6, e)}
                      error={piezaDestino.error}
                      value={piezaDestino.valor}
                      helperText="* Requerido"
                      fullWidth
                    >
                      {piezasDestino.map(piezaInd => (
                        <MenuItem key={piezaInd.IdCodigo} value={piezaInd.IdCodigo}>
                          {`${piezaInd.IdCodigo} - ${piezaInd.Insumo} - ${piezaInd.Identificador}`}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid
                  xs={2}
                  style={{position: 'relative'}}
                >
                  <div
                    style={{position: 'absolute', bottom: 28, left: 15}}
                  >
                    <BotonSuccess
                      label={updateRegistro ? 'Actualizar' : 'Agregar'}
                      disabled={disabled.agregar}
                      onClick={ updateRegistro ? () => editarPrestamoAction(idxRegistro) : agregarPrestamoAction}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </FormContainer>
          <Tabla
            data = {prestamos.datos}
            headers = {cabeceraPrestamo}
            configuracion = {configuracion}
            idPosition = "IdRegistro"
            admin
            opciones = {
              [
                // {'icon' : 'descargar'},
                {'icon' : 'editar', 'action' : (e, index) => editRowAction(e, index)},
                {'icon' : 'eliminar', 'action' :(e) => removeRowAction(e)},
              ]
            }
            elevacion={0}
            small = {0}
          />
          <div
            style={{float:'right', margin: 15}}
          >
            <BotonSuccess
              label='Guardar'
              disabled={disabled.guardar}
              onClick={(e) => openModalAction(e, 1)}
            />
          </div>
          <div
            style={{float:'right', margin: 15, marginRight: 0}}
          >
            <BotonCancelar
              label='Cerrar'
              onClick={(e) => {
                if(
                  descripcion.valor !== '' ||
                  plaza.valor !== '' ||
                  almacen.valor !== '' ||
                  moldeOrigen.valor !== '' ||
                  moldeDestino.valor !== '' ||
                  piezaOrigen.valor !== '' ||
                  moldeDestino.valor !== ''
                ) {
                  openModalAction(e, 2)
                } else {
                  regresarAction()
                }
              }}
            />
          </div>
          <Modal  
            open={modal.value} 
            typeAlert='Report' 
            typeOptions={modal.options}
            title='Confirmar....' 
            message={modal.text}
            onClickCancel={closeModalAction}
            onClickAccept={() => {
              switch (modal.stepper){
                case 1:
                  postPrestamosAction()
                  break;
                case 2:
                  regresarAction()
                  break;
                default:
                  break;
              }
            }}
          />
        </Container>
      </div>
    );
  }
}

MovimientoNuevo.propTypes = {
  regresarAction: T.func,
  onInputChangeAction: T.func,
  nuevoPrestamo: T.object,
  agregarPrestamoAction: T.func,
  removeRowAction: T.func,
  editRowAction: T.func,
  editarPrestamoAction: T.func,
  updateRegistro: T.bool,
  postPrestamosAction: T.func,
  idxRegistro: T.number,
  disabled: T.object,
  classes: T.object,
  openModalAction: T.func,
  closeModalAction: T.func,
  modal: T.object,
};

export default compose(
  withStyles(styles),
)(MovimientoNuevo);
