/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
import { isNull } from 'lodash';
import grey from '@material-ui/core/colors/grey';
import { Grid, AppBar, Toolbar, Typography, TextField, MenuItem, Tabs, Tab } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Empty from 'images/iconos/empty.svg';
import { Container, Section, FormContainer } from '../../styledComponents';
import Tabla from '../../../../../../components/DataTable';
import Modal from '../../../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import PestanaSecciones from "./components/PestanaSecciones";
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
      disabled,
      tableText,
      regresarAction,
      onInputChange,
      pestanaSlc,
      classes,
      onChangeSeccionTabAction,
      openModalAction,
      getMoldesDestinoAction,
      setMoldeSeleccionadoAction,
      modal,
      closeModalAction,
      postMovimientoAction,
      plantaSlc,
      plantaFilterAction,
      nuevaTransformacion : {
        campos:{
          descripcion,
          plaza,
          observaciones,
          idMoldeOrigen,
          idMoldeDestino,
          inventario,
        },
        combos: {
          almacenes,
          plazas,
          plantas,
        },
        tablas: {
          moldesOrigen,
          moldesDestino,
          piezas,
          accesorios,
        },
      },
    } = this.props;
    const headerMoldes = [
      {
        name: 'idMolde',
        label: 'ID',
        options: {
          customHeadRender: (columnMeta) => ( 
            <th  
              // eslint-disable-next-line react/no-array-index-key 
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'center', 
                  backgroundColor: '#fff', 
                  color: 'rgba(0, 0, 0, 0.54)', 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  padding : '8px 8px', 
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  position: 'sticky',
                  top: 0,
                } 
              } 
            > 
              {columnMeta.label} 
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'center', 
              padding: 8, 
              width: '20%', 
            }, 
          }),
        },
      },
      {
        name: 'nombre',
        label: 'Molde',
        options: {
          customHeadRender: (columnMeta) => ( 
            <th  
              // eslint-disable-next-line react/no-array-index-key 
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'center', 
                  backgroundColor: '#fff', 
                  color: 'rgba(0, 0, 0, 0.54)', 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  padding : '8px 8px', 
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  position: 'sticky',
                  top: 0,
                } 
              } 
            > 
              {columnMeta.label} 
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'center', 
              padding: 8, 
              width: '25%', 
            }, 
          }),
        },
      },
      {
        name: 'version',
        label: 'Versión',
        options: {
          customHeadRender: (columnMeta) => ( 
            <th  
              // eslint-disable-next-line react/no-array-index-key 
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'center', 
                  backgroundColor: '#fff', 
                  color: 'rgba(0, 0, 0, 0.54)', 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  padding : '8px 8px', 
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  position: 'sticky',
                  top: 0, 
                } 
              } 
            > 
              {columnMeta.label} 
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'center', 
              padding : '8px 8px',
              paddingTop: 0,
              paddingBottom: 0, 
              width: '20%', 
            }, 
          }),
        },
      },
      {
        name: 'estatus',
        label: 'Estatus',
        options: {
          customHeadRender: (columnMeta) => ( 
            <th  
              // eslint-disable-next-line react/no-array-index-key 
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'center', 
                  backgroundColor: '#fff', 
                  color: 'rgba(0, 0, 0, 0.54)', 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  padding : '8px 8px', 
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  position: 'sticky',
                  top: 0, 
                } 
              } 
            > 
              {columnMeta.label} 
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'center', 
              padding : '8px 8px',
              paddingTop: 0,
              paddingBottom: 0, 
              width: '25%', 
            }, 
          }),
        },
      },
      {
        name: 'options',
        label: [],
        options: {
          filter: false,
          customHeadRender: (columnMeta) => ( 
            <th  
              // eslint-disable-next-line react/no-array-index-key 
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'center', 
                  backgroundColor: '#fff', 
                  color: 'rgba(0, 0, 0, 0.54)', 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  padding : '8px 8px', 
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  position: 'sticky',
                  top: 0, 
                } 
              } 
            >
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'center', 
              padding : '8px 8px',
              paddingTop: 0,
              paddingBottom: 0, 
              width: '10%', 
            }, 
          }),
        },
      },
    ]
    const configuracion = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: 'none',
      paginado: false,
      responsivo: "scroll",
    }

    for (let i = 0; i < moldesOrigen.datos.length; i+=1) {
      const color = /\(([^)]+)\)/.exec(moldesOrigen.datos[i].Color);
      if(typeof moldesOrigen.datos[i].estatus === 'string')
        moldesOrigen.datos[i].estatus = 
      <Chip
        avatar={<Avatar style={{backgroundColor: moldesOrigen.datos[i].Color, width: '22px', height: '20px'}}></Avatar>}
        label={moldesOrigen.datos[i].estatus} 
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
              Nuevo movimiento
            </Typography> 
          </Toolbar> 
        </AppBar>
        <Container>
          <Section
            style={{backgroundColor: '#fff'}}
          > 
            <FormContainer>
              <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', marginBottom: 15}}> 
                Información general
              </Typography>
              <Grid
                container
                spacing={16}
              >               
                <Grid
                  item
                  xs={6}
                  sm={6}
                  className={classes.paddingNone}
                >
                  <TextField
                    className={classes.formControl}
                    label="Descripción:"
                    error={descripcion.campoValido}
                    value={descripcion.valor}
                    helperText="* Requerido"
                    onChange={(e) => onInputChange(0, e)}
                    margin="normal"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  className={classes.paddingNone}
                >
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  className={classes.paddingNone}
                >
                  <TextField
                    select
                    className={classes.formControl}
                    label="Plaza"
                    margin="normal"
                    onChange={(e) => onInputChange(1, e)}
                    error={plaza.campoValido}
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
                  sm={6}
                  className={classes.paddingNone}
                >
                  <TextField
                    select
                    className={classes.formControl}
                    label="Almacén"
                    margin="normal"
                    disabled={inventario.disabled}
                    onChange={(e) => onInputChange(3, e)}
                    error={inventario.campoValido}
                    value={inventario.valor}
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
                <Grid
                  item
                  xs={6}
                  sm={6}
                  style={{paddingTop: 0}}
                >
                  <TextField
                    className={classes.formControl}
                    label="Observaciones:"
                    value={observaciones.valor}
                    onChange={(e) => onInputChange(2, e)}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </FormContainer>
            <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', marginLeft: 25, marginBottom: '-55px', position: 'relative', zIndex: 1, width: '70%'}}> 
              Selecciona el prototipo origen
            </Typography>
            <Tabla
              headers={headerMoldes}
              data={moldesOrigen.datos}
              configuracion={configuracion}
              idPosition = "IdMolde"
              admin
              mensajeTexto={tableText}
              opciones = {
                [
                  {'icon' : 'ver', 'action' : (index) => getMoldesDestinoAction(moldesOrigen.datos[index].idMolde, moldesOrigen.datos[index].idConfiguracionMolde, moldesOrigen.datos[index].plantas)},
                ]
              }
              params= {
                {
                  height: 50,
                  backgroundColor: '#fff',
                }
              }
              temporal
              elevacion={0}
            />
            <div
              className={classes.boton}
              style={{position: 'absolute', bottom: 15, right: 15}}
            >
              <BotonSuccess
                label='Guardar'
                className={classes.boton}
                disabled={disabled.boton}
                onClick={(e) => openModalAction(e, 3)}
              />
            </div>
            <div
              className={classes.boton}
              style={{position: 'absolute', bottom: 15, right: 125}}
            >
              <BotonCancelar
                label='Cerrar'
                className={classes.boton}
                onClick={(e) => {
                  if(
                    descripcion.valor !== '' ||
                    plaza.valor !== '' ||
                    observaciones.valor !== '' ||
                    idMoldeOrigen.valor !== '' ||
                    idMoldeDestino.valor !== ''
                  ) {
                    openModalAction(e, 2)
                  } else {
                    regresarAction()
                  }
                }}
              />
            </div>
          </Section>
          <Section 
            style={{backgroundColor: '##fff', borderLeft: '2px solid rgb(195, 193, 193)'}}
          >
            <AppBar 
              color="inherit" 
              position="static" 
              style={
                {
                  backgroundColor: '#fff',
                  boxShadow: 'none',
                }
              }
            >
              <Toolbar 
                variant="dense" 
                style={
                  {
                    padding: 'initial',
                    borderBottom: '2px solid rgb(195, 193, 193)',
                  }
                }
              >
                <Tabs 
                  value={pestanaSlc} 
                  onChange={onChangeSeccionTabAction} 
                  variant="fullWidth" 
                  style={
                    {
                      width: '100%',
                    }
                  }
                > 
                  <Tab className={classes.tab} disabled label="Moldes"/>
                </Tabs>
              </Toolbar>
              {!isNull(pestanaSlc) ?
                <PestanaSecciones 
                  pestana={pestanaSlc}
                  piezas={piezas}
                  accesorios={accesorios}
                  moldesDestino={moldesDestino}
                  plantas={plantas}
                  plantaSlc={plantaSlc}
                  plantaFilterAction={plantaFilterAction}
                  setMoldeSeleccionadoAction={setMoldeSeleccionadoAction}
                /> : 
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                  >
                    <img
                      style={{maxWidth:'100%', marginTop: 100}}
                      key="imagenKey"
                      src={Empty}
                      alt="logo-Pfd"
                    />
                  </Grid>
                  <Grid
                    item
                  >
                    <Typography
                      variant='h5'
                    >
                      Selecciona una opción para inciar la captura
                    </Typography>
                  </Grid>
                </Grid>
              }
            </AppBar>
            <Modal  
              open={modal.value} 
              typeAlert='Report' 
              typeOptions='Select' 
              title='Confirmar....' 
              message={modal.text}
              onClickCancel={closeModalAction}
              onClickAccept={() => {
                switch (modal.stepper){
                  case 2:
                    regresarAction()
                    break;
                  case 3:
                    postMovimientoAction()
                    break;
                  default:
                    break;
                }
              }}
            />
          </Section>
        </Container>
      </div>
    );
  }
}

MovimientoNuevo.propTypes = {
  regresarAction: T.func,
  onInputChange: T.func,
  pestanaSlc: T.number,
  classes: T.object,
  nuevaTransformacion: T.object,
  onChangeSeccionTabAction: T.func,
  openModalAction: T.func,
  getMoldesDestinoAction: T.func,
  setMoldeSeleccionadoAction: T.func,
  disabled: T.object,
  modal: T.object,
  closeModalAction: T.func,
  postMovimientoAction: T.func,
  plantaFilterAction: T.func,
  plantaSlc: T.number,
  tableText: T.string,
};

export default compose(
  withStyles(styles),
)(MovimientoNuevo);
