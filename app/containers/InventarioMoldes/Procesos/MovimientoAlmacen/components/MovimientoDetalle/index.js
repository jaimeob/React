/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
import { isNull } from 'lodash';
// import { PDFDownloadLink } from '@react-pdf/renderer';
import grey from '@material-ui/core/colors/grey';
import { Grid, AppBar, Toolbar, Typography, TextField, MenuItem, Tabs, Tab } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'; 
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Empty from 'images/iconos/empty.svg';
import { Container, Section, FormContainer } from '../../styledComponents';
import Tabla from '../../../../../../components/DataTable';
import PestanaSecciones from "./components/PestanaSecciones";
import PdfCorrecto from "../PdfCorrecto";
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
})
// eslint-disable-next-line react/prefer-stateless-function
export class MovimientoDetalle extends React.Component {

  render() {

    const {
      regresarAction,
      onInputChange,
      pestanaSlc,
      classes,
      onChangeSeccionTabAction,
      onInputCantidadAccesorioAction,
      setInsumosSeleccionadosAction,
      PDF,
      nuevoMovimiento: {
        IdMolde,
        IdDetalle,
        campos:{
          descripcion,
          almacenOrigen,
          almacenDestino,
        },
        combos: {
          ubicacionesOrigen,
          ubicacionesDestino,
        },
        tablas: {
          moldes,
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
              width: '10%', 
            }, 
          }),
        },
      },
      {
        name: 'Nombre',
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
              width: '10%', 
            }, 
          }),
        },
      },
      {
        name: 'Version',
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
        name: 'Estatus',
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
    ]
    const configuracion1 = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: 'none',
      paginado: false,
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
              Detalle movimiento
            </Typography> 
          </Toolbar> 
        </AppBar>
        <Container>
          <Section
            style={{backgroundColor: '#fff'}}
          > 
            <FormContainer>
              <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none'}}> 
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
                >
                  <TextField
                    className={classes.formControl}
                    label="Descripción:"
                    error={descripcion.campoValido}
                    value={descripcion.valor}
                    disabled
                    helperText="* Requerido"
                    onChange={(e) => onInputChange(0, e)}
                    margin="normal"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                >
                </Grid>
               
                <Grid
                  item
                  xs={6}
                  sm={6}
                >
                  <TextField
                    select
                    className={classes.formControl}
                    label="Origen"
                    disabled
                    margin="normal"
                    onChange={(e) => onInputChange(2, e)}
                    error={almacenOrigen.campoValido}
                    value={almacenOrigen.valor}
                    helperText="* Requerido"
                    fullWidth
                  >
                    {ubicacionesOrigen.map(ubicacionOrigen => (
                      <MenuItem key={ubicacionOrigen.IdAlmacen} value={ubicacionOrigen.IdAlmacen}>
                        {ubicacionOrigen.Nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                >
                  <TextField
                    select
                    className={classes.formControl}
                    label="Destino"
                    margin="normal"
                    disabled
                    onChange={(e) => onInputChange(3, e)}
                    error={almacenDestino.campoValido}
                    value={almacenDestino.valor}
                    helperText="* Requerido"
                    fullWidth
                  >
                    {ubicacionesDestino.map(ubicacionDestino => (
                      <MenuItem key={ubicacionDestino.IdAlmacen} value={ubicacionDestino.IdAlmacen}>
                        {ubicacionDestino.Nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                
              </Grid>
            </FormContainer>
            <Typography variant="h6" color="primary" style={{flexGrow: 1, textTransform: 'none', marginLeft: 25, marginBottom: '-55px', position: 'relative', zIndex: 1, width: '50%'}}> 
              Selecciona el molde origen
            </Typography>
            <Tabla
              headers={headerMoldes}
              data={moldes.datos}
              configuracion={configuracion1}
              idPosition = "IdConfiguracionMolde"
              admin
              mensajeTexto='Seleccione una plaza y un origen'
              temporal
              elevacion={0}
            />
            <div
              className={classes.boton}
              style={{position: 'absolute', bottom: 15, right: 15}}
            >
              <PdfCorrecto
                pdf={PDF} 
                title={`DetalleMovimientoAlmacen-${IdDetalle}`}
              />
              {/* <PDFDownloadLink document={<MyDocument datos={PDF} />} fileName={`DetalleMovimientoAlmacen-${IdDetalle}`}>
                <BotonSuccess
                  label='Descargar detalle'
                />
              </PDFDownloadLink> */}

              
            </div>
            <div
              className={classes.boton}
              style={{position: 'absolute', bottom: 15, right: 175}}
            >
              <BotonCancelar
                label='Cerrar'
                onClick={regresarAction}
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
                  <Tab className={classes.tab} label="Piezas"/> 
                  <Tab className={classes.tab} label="Accesorios"/>
                </Tabs>
              </Toolbar>
              {!isNull(pestanaSlc) ?
                <PestanaSecciones 
                  pestana={pestanaSlc}
                  piezas={piezas}
                  accesorios={accesorios}
                  moldes={moldes}
                  IdMolde={IdMolde}
                  onInputCantidadAccesorioAction={onInputCantidadAccesorioAction}
                  setInsumosSeleccionados={setInsumosSeleccionadosAction}
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
              {   
                !pestanaSlc === null ? null :
                  pestanaSlc === 0 ? 
                    <div>
                      <div
                        className={classes.boton}
                        style={{position: 'absolute', bottom: 15, right: 15}}
                      >
                        <BotonSuccess
                          label='Siguiente'
                          onClick={(e) => onChangeSeccionTabAction(e,1)}
                        />
                      </div>
                    </div> :
                    pestanaSlc === 1 ?
                      <div>
                        <div
                          className={classes.boton}
                          style={{position: 'absolute', bottom: 15, right: 15}}
                        >
                          <BotonSuccess
                            label='Regresar'
                            onClick={(e) => onChangeSeccionTabAction(e,0)}
                          />
                        </div>
                      </div> :
                      null
              }
            </AppBar>
            
            
          </Section>
        </Container>
      </div>
    );
  }
}

MovimientoDetalle.propTypes = {
  regresarAction: T.func,
  onInputChange: T.func,
  pestanaSlc: T.number,
  classes: T.object,
  nuevoMovimiento: T.object,
  onChangeSeccionTabAction: T.func,
  onInputCantidadAccesorioAction: T.func,
  setInsumosSeleccionadosAction: T.func,
  PDF: T.array,
};

export default compose(
  withStyles(styles),
)(MovimientoDetalle);
