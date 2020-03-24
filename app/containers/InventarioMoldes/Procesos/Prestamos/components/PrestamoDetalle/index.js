/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
import grey from '@material-ui/core/colors/grey';
import { Grid, AppBar, Toolbar, Typography, TextField, MenuItem} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Container, FormContainer } from '../../styledComponents';
import Tabla from '../../../../../../components/DataTable';
import Modal from '../../../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
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
export class PrestamoDetalle extends React.Component {

  render() {

    const {
      regresarAction,
      onInputChangeAction,
      classes,
      devolverPrestamoAction,
      prestamoSlc,
      openModalAction,
      closeModalAction,
      modal,
      normales,
      nuevoPrestamo : {
        campos: {
          descripcion,
          plaza,
          almacen,
          moldeOrigen,
          moldeDestino,
        },
        combos: {
          plazas,
          almacenes,
          moldesOrigen,
          moldesDestino,
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
        name: 'PiezaOrigen',
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
        name: 'PiezaDestino',
        label: 'Pieza destino',
      },
      {
        name: 'IdentificadorDestino',
        label: 'Identificador destino',
      },
      {
        name: 'CantPrestada',
        label: 'Cantidad',
      },
      {
        name: 'Estatus',
        label: 'Estatus',
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

    for (let i = 0; i < prestamos.datos.length; i+=1) {
      const color = /\(([^)]+)\)/.exec(prestamos.datos[i].Color);
      if(typeof prestamos.datos[i].Estatus === 'string')
        prestamos.datos[i].Estatus = 
      <Chip
        avatar={<Avatar style={{backgroundColor: prestamos.datos[i].Color, width: '22px', height: '20px'}}></Avatar>}
        label={prestamos.datos[i].Estatus} 
        style={{
          backgroundColor: 'white',
          borderColor: `rgba(${color[1]}, 0.5)`,
          width: '110px',
          height: '20px',
          justifyContent: 'start',
        }}
        variant="outlined"
      />
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
              Detalle de prestamo
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
                  disabled
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
                    disabled
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
                    disabled
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
                      disabled
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
                      disabled
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
                </Grid>
              </Grid>
            </Grid>
          </FormContainer>
          <Tabla
            data = {prestamos.datos}
            headers = {cabeceraPrestamo}
            configuracion = {configuracion}
            idPosition = "IdPrestamoDetalle"
            {...(normales.editar === 1 ? {
              opciones: [{'icon' : 'regresar', 'action' : (e) => openModalAction(e, 3)}],
            } : {
              opciones: [{}],
            } )}
            elevacion={0}
            small = {0}
          />
          <div
            style={{float:'right', margin: 15}}
          >
            <BotonCancelar
              style={{textTransform: 'initial'}}
              label='Cerrar'
              onClick={regresarAction}
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
                case 2:
                  regresarAction()
                  break;
                case 3:
                  devolverPrestamoAction(prestamoSlc)
                  break;
                case 4:
                  closeModalAction()
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

PrestamoDetalle.propTypes = {
  regresarAction: T.func,
  onInputChangeAction: T.func,
  nuevoPrestamo: T.object,
  devolverPrestamoAction: T.func,
  prestamoSlc: T.number,
  openModalAction: T.func,
  closeModalAction: T.func,
  modal: T.object,
  classes: T.object,
  normales: T.object,
};

export default compose(
  withStyles(styles),
)(PrestamoDetalle);
