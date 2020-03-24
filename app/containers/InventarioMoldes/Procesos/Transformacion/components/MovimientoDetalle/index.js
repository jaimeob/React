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
import PestanaSecciones from "./components/PestanaSecciones";
import Modal from '../../../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import BotonCancelar from "../../../../../../components/BotonCancelar";
import BotonSuccess from "../../../../../../components/BotonSuccess";
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
export class MovimientoDetalle extends React.Component {

  render() {

    const {
      regresarAction,
      pestanaSlc,
      classes,
      onChangeSeccionTabAction,
      devolverAction,
      modal,
      openModalAction,
      closeModalAction,
      nuevaTransformacion : {
        estatus,
        campos:{
          descripcion,
          plaza,
          observaciones,
        },
        combos: {
          plazas,
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
              width: '20%', 
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
        name: 'planta',
        label: 'Planta',
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
              width: '20%', 
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
              Transformacion detalle
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
                    margin="normal"
                    disabled
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
                    error={plaza.campoValido}
                    value={plaza.valor}
                    helperText="* Requerido"
                    fullWidth
                    disabled
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
                    margin="normal"
                    disabled
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
              idPosition = "IdConfiguracionMolde"
              admin
              mensajeTexto='Seleccione una plaza y un origen'
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
              <BotonCancelar
                label='Cerrar'
                onClick={regresarAction}
              />
            </div>
            <div
              className={classes.boton}
              style={{position: 'absolute', bottom: 15, right: 115}}
            >
              <BotonSuccess
                {...(estatus === 'DEVUELTO' ? {disabled: true} : {} )}
                label='Devolver'
                onClick={(e) => openModalAction(e, 4)}
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
                  <Tab className={classes.tab} label="Moldes"/>
                  <Tab className={classes.tab} disabled={piezas.datos.length === 0} label="Piezas"/>
                  <Tab className={classes.tab} disabled={accesorios.datos.length === 0} label="Accesorios"/>
                </Tabs>
              </Toolbar>
              {!isNull(pestanaSlc) ?
                <PestanaSecciones 
                  pestana={pestanaSlc}
                  piezas={piezas}
                  accesorios={accesorios}
                  moldesDestino={moldesDestino}
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
          </Section>
        </Container>
        <Modal  
          open={modal.value} 
          typeAlert='Report' 
          typeOptions='Select' 
          title='Confirmar....' 
          message={modal.text}
          onClickCancel={closeModalAction}
          onClickAccept={devolverAction}
        />
      </div>
    );
  }
}

MovimientoDetalle.propTypes = {
  regresarAction: T.func,
  pestanaSlc: T.number,
  classes: T.object,
  nuevaTransformacion: T.object,
  onChangeSeccionTabAction: T.func,
  devolverAction: T.func,
  modal: T.object,
  closeModalAction: T.func,
  openModalAction: T.func,
};

export default compose(
  withStyles(styles),
)(MovimientoDetalle);
