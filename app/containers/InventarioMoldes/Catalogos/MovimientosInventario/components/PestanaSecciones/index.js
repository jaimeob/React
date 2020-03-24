import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  Typography,
} from '@material-ui/core';
import {parseInt} from 'lodash';
import { withHandlers } from 'recompose';
// import Success from 'components/BotonSuccess'
// import Cancelar from 'components/BotonCancelar'
import DataTable from 'components/DataTable';
import Seleccion from 'components/Seleccion';
import Empty from 'images/iconos/empty.svg';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Input from 'components/FormInput';
import Button from '@material-ui/core/Button';
import { Container, Grid50, OH} from './styledComponents';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
  success: {
    backgroundColor: '#28950F',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#1d7109',
    },
    color: 'white',
  },
  leftIcon: {
    marginRight: 8,
  },
  typography:{
    textTransform:'inherit',
    fontWeight:'400',
  },
})

function PestanaSecciones(props){
  const {
    pestañaSeleccionada,
    plantas,
    plazasDestino,
    almacenesDestino,
    // secciones,
    campos,
    tablas,
    tipoMovimientoSeleccionado,
    hayMoldeSeleccionado,
    seleccionesRows,
    // tipos,
    onInputChange,
    onRowMoldeSelectProxy,
    onSearchProxy,
    handleChangeMontoProxy,
    cambiarPestaña,
    comboVacio,
    // onInputChangeAccesorio,
    // onInputChangePieza,
    // onUploadedFileProxy,
    // onClickAgregarProxy,
    // onClickAgregarPieza,
    // onClickSiguiente,
    // onEditarPieza,
    // onEliminarAccesorio,
    // onClickAgregar,
    // onEditarAccesorio,
    // onClickCancelarAccesorio,
    // onClickCerrar,
    // onClickGuardarProxy,
    // onEditarAccesorioProxy,
    // onEditarPiezaProxy,
    // onClickCancelarAccesorioProxy,
    esDetalleMovimiento,
    classes,
    // almacenSeleccionado,
  } = props;

  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable:  esDetalleMovimiento ? 'none' : 'multiple',
    registrosPorPagina:50,
    paginado: true,
    ordenar: false,
    responsivo: "scroll",
    // eslint-disable-next-line no-nested-ternary
    textoBusqueda: esDetalleMovimiento?tablas.molde.configuracion.textoBusqueda:pestañaSeleccionada === 1 ? tablas.pieza.textoBusqueda:tablas.accesorio.textoBusqueda,
  };
 

  const salidaInventario = tipoMovimientoSeleccionado === 6 || tipoMovimientoSeleccionado === 7 || tipoMovimientoSeleccionado === 8
  const cabecerasPiezas = [
    {
      name: 'Codigo',
      label: 'Código',
    },
    {
      name: 'Nombre',
      label: 'Descripción',
    },
    {
      name: 'Planta',
      label: 'Planta',
    },
    {
      name: 'Ubicacion',
      label: 'Ubicación',
    },
    {
      name: 'Seccion',
      label: 'Sección',
    },
    {
      name: 'Identificador',
      label: 'Identificador',
    },
  ]
  const cabecerasAccesorios = [
    {
      name: 'Codigo',
      label: 'Código',
    },
    {
      name: 'Nombre',
      label: 'Descripción',
    },
    {
      name: 'Planta',
      label: 'Planta',
    },
    {
      name: 'Ubicacion',
      label: 'Ubicación',
    },
    {
      name: 'Cantidad',
      label: 'Faltantes',
      options: {
        setCellProps: () => ({ 
          style: { 
            textAlign: 'center', 
            width: '20%', 
          }, 
        }),
      },
    },
    {
      name: 'Monto',
      label: 'Monto',
      options: {
        setCellProps: () => ({ 
          style: { 
            textAlign: 'center', 
            width: '15%', 
          }, 
        }),
      },
    },
  ]
  tablas.pieza.cabeceras = salidaInventario ? cabecerasPiezas :tablas.pieza.cabeceras
  tablas.accesorio.cabeceras = salidaInventario ? cabecerasAccesorios :tablas.accesorio.cabeceras
  
  const idPlantaPieza = campos.plantaPieza.valor
  const idPlantaAccesorio = campos.plantaAccesorio.valor
  

  const textoSeleccionar =tipoMovimientoSeleccionado === 6 ? 'Selecciona molde a traspasar' : 'Selecciona un molde de inventario'

  const datosPiezasFiltradas= tablas.pieza.datos.filter(datoPieza => datoPieza.Planta === idPlantaPieza)
  const datosAccesoriosFiltrados= tablas.accesorio.datos.filter(datoAccesorio => datoAccesorio.Planta === idPlantaAccesorio)
  

  tablas.molde.cabeceras.forEach((molde,index) => {
    if (tipoMovimientoSeleccionado === 3 && molde.name === "idMolde" && !esDetalleMovimiento ) {
      tablas.molde.cabeceras[index].label="ID Configuración"
    } 
    if (tipoMovimientoSeleccionado === 3 && molde.name === "estatus") {
      tablas.molde.cabeceras.splice(index,1)
    } 
  })

  tablas.accesorio.cabeceras.forEach((accesorio,index) => {
    if (tipoMovimientoSeleccionado === 3 && accesorio.name === "Cantidad") {
      tablas.accesorio.cabeceras[index].label="Stock Máximo"
    } 
    if ((tipoMovimientoSeleccionado === 7 || tipoMovimientoSeleccionado === 8) && accesorio.name === "Cantidad") {
      tablas.accesorio.cabeceras[index].label= esDetalleMovimiento ?"Existencia Anterior":"Existencia"
    } 
    if (tipoMovimientoSeleccionado === 6 && accesorio.name === "Cantidad") {
      tablas.accesorio.cabeceras[index].label= esDetalleMovimiento ?"Existencia Anterior":"Existencia"
    } 

    if (accesorio.name === "Monto") {
      tablas.accesorio.cabeceras[index].options.customBodyRender = (value, tableMeta) =>
      // eslint-disable-next-line no-nested-ternary
        tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' ?
          (!esDetalleMovimiento ?
          // (tablas.accesorio.datos[tableMeta.rowIndex].Desactivado === 0 ? 
            <Input 
              requerido
              placeholder = 'monto'
              tipoInput = 'numero'
              // inhabilitado = {tablas.accesorio.datos[tableMeta.rowIndex].Desactivado}
              indice = {tableMeta.rowIndex}
              valor = {value === null ? '' : value}
              isComplete = {tablas.accesorio.datos[tableMeta.rowIndex].CampoValido}
              onChange = {handleChangeMontoProxy}
            />
            : value) 
          : null
    }
  })
  
  if (tipoMovimientoSeleccionado !==3){
    for (let i = 0; i < tablas.molde.datos.length; i+=1) {
      const color = /\(([^)]+)\)/.exec(tablas.molde.datos[i].Color);
      if(typeof tablas.molde.datos[i].estatus === 'string')
        tablas.molde.datos[i].estatus = 
      <Chip
        avatar={<Avatar style={{backgroundColor: tablas.molde.datos[i].Color, width: '22px', height: '20px'}}></Avatar>}
        label={tablas.molde.datos[i].estatus} 
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
  }


  const arrayAlmacenesDestino = almacenesDestino.filter(almacen=> almacen.IdAlmacen !== campos.almacen.valor)

  // let funcModal = secciones.bandModal === 1 ? 
  //   onClickCerrar(false) : 
  //   onEditarAccesorioProxy(false);
  // funcModal = secciones.bandModal === 3 ? onClickCancelarAccesorioProxy(false) :
  //   funcModal;
  // funcModal = secciones.bandModal === 5 ? onEditarPiezaProxy(false) :
  //   funcModal;
  
  // let funcModalCancelar = secciones.bandModal === 1 ? 
  //   onClickCerrar(true) : 
  //   onEditarAccesorioProxy(true)
  // funcModalCancelar = secciones.bandModal === 3 ? onClickCancelarAccesorioProxy(true) :
  //   funcModalCancelar;
  // funcModalCancelar = secciones.bandModal === 5 ? onEditarPiezaProxy(true) :
  //   funcModalCancelar;
  if(pestañaSeleccionada === 0)
    return (
      <Container>
        {tipoMovimientoSeleccionado === 6 ?
          <div>
            <Typography
              variant="h6"
              className={classes.typography}
            >
                  Seleccione un almacen destino
            </Typography>
            <OH>
              <Grid50>
                <Seleccion
                  opciones={plazasDestino}
                  idOpcion='IdPlaza'
                  nomOpcion='Nombre'
                  // requerido
                  valor={campos.plazaDestino.valor}
                  onChange={onInputChange}
                  label='Plaza Destino:'
                  indice={2}
                  campoValido={campos.plazaDestino.campoValido}
                  inhabilitado = {esDetalleMovimiento}
                /> 
              </Grid50>
              <Grid50>
                <Seleccion
                  opciones={arrayAlmacenesDestino.length>0?arrayAlmacenesDestino:comboVacio}
                  idOpcion='IdAlmacen'
                  nomOpcion='Almacen'
                  // requerido
                  valor={campos.almacenDestino.valor}
                  onChange={onInputChange}
                  label='Almacen Destino:'
                  indice={3}
                  campoValido={campos.plazaDestino.campoValido}
                  inhabilitado = {esDetalleMovimiento}
                /> 
              </Grid50>
            </OH>
          </div>
          :null}
        <div>
          
          <div style={{marginBottom: 100}}>
            <DataTable 
              data = {tablas.molde.datos}
              headers = {tablas.molde.cabeceras}
              configuracion = {esDetalleMovimiento ? configuracion : tablas.molde.configuracion}
              onRowsSelect  = {onRowMoldeSelectProxy}
              rowsSelected = {seleccionesRows.rowMoldeSeleccionado}
              onSearchChange ={onSearchProxy}
              temporal
              params= {
                {
                  height: 57,
                  backgroundColor: '#fff',
                }
              }
              elevacion={0}
            />
          </div>
          <div style={{position: 'absolute', bottom: 15, right: 15}}>
            <Button 
              style={{color: '#3f51b5'}}
              onClick={(e)=> cambiarPestaña(e,1)}
              disabled = {!hayMoldeSeleccionado}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </Container> 
    );
  

  if(pestañaSeleccionada === 1)
    return (
      <Container>
        {hayMoldeSeleccionado ? 
          <div>
            <OH>
              <Grid50>
                <Seleccion
                  opciones={plantas}
                  idOpcion='id'
                  nomOpcion='nombre'
                  requerido
                  valor={campos.plantaPieza.valor}
                  onChange={onInputChange}
                  label='Planta:'
                  indice={0}
                  campoValido={campos.plantaPieza.campoValido}
                />
              </Grid50>
            </OH>
            <div>
              <DataTable 
                data = {datosPiezasFiltradas}
                headers = {tablas.pieza.cabeceras}
                configuracion = {configuracion}
                onRowsSelect  = {onRowMoldeSelectProxy}
                rowsSelected = {seleccionesRows.rowPiezasSeleccionadas}
                onSearchChange ={onSearchProxy}
                temporal
                params= {
                  {
                    height: 57,
                    backgroundColor: '#fff',
                  }
                }
                elevacion={0}
              />
            </div>
            <div style={{position: 'absolute', bottom: 15, right: 115}}>
              <Button 
                style={{color: '#3f51b5'}}
                onClick={(e)=> cambiarPestaña(e,0)}
              >
                Regresar
              </Button>
            </div>
            <div style={{position: 'absolute', bottom: 15, right: 15}}>
              <Button 
                style={{color: '#3f51b5'}}
                onClick={(e)=> cambiarPestaña(e,2)}
              >
                Siguiente
              </Button>
            </div>
          </div> : 
          <Grid
            container
            direction="column"
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
              Selecciona un molde para iniciar
              </Typography>
            </Grid>
          </Grid>
        }
      </Container>
    );

  if(pestañaSeleccionada === 2)
    return (
      <Container>
        {hayMoldeSeleccionado ? 
          <div>
            <OH>
              <Grid50>
                <Seleccion
                  opciones={plantas}
                  idOpcion='id'
                  nomOpcion='nombre'
                  requerido
                  valor={campos.plantaAccesorio.valor}
                  onChange={onInputChange}
                  label='Planta:'
                  indice={1}
                  campoValido={campos.plantaAccesorio.campoValido}
                />
              </Grid50>
            </OH>
            <DataTable 
              data = {datosAccesoriosFiltrados}
              headers = {tablas.accesorio.cabeceras}
              configuracion = {configuracion}
              onRowsSelect  = {onRowMoldeSelectProxy}
              onSearchChange ={onSearchProxy}
              rowsSelected = {seleccionesRows.rowAccesoriosSeleccionados} 
              temporal
              params= {
                {
                  height: 57,
                  backgroundColor: '#fff',
                }
              }
              elevacion={0}
            />
            <div style={{position: 'absolute', right: 15, bottom: 15}}>
              <Button 
                style={{color: '#3f51b5'}}
                onClick={(e)=> cambiarPestaña(e,1)}
              >
                  Regresar
              </Button>
            </div>
          </div>
          : 
          <Grid
            container
            direction="column"
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
              Selecciona un molde para iniciar
              </Typography>
            </Grid>
          </Grid>

        }
      </Container>
    );
        
  // if(pestaña === 0 && !secciones.esAccesorio)
  //   return(
  //     <React.Fragment>
  //       <Grid
  //         container
  //         style={
  //           {
  //             padding: 8,
  //             paddingLeft: 16,
  //             height: 'calc(30% - 50px)',
  //           }
  //         }
  //       >
  //         <Grid 
  //           item
  //           xs={false}
  //           sm={false}
  //           md={1}
  //           lg={1}
  //           xl={1}
  //         />
  //         <Grid
  //           item
  //           xs={6}
  //           sm={6}
  //           md={5}
  //           lg={5}
  //           xl={5}
  //         >
  //           <FormControl
  //             style={{width: '90%', margin: '0'}}
  //           >
  //             <Input
  //               onChange={onInputChange}
  //               nomCampo='Nombre de sección:'
  //               longitud='50'
  //               valor={secciones.campos.nombre.valor}
  //               indice={0}
  //               requerido
  //               isComplete={secciones.campos.nombre.campoValido}
  //             />
  //           </FormControl>
  //         </Grid>
  //         <Grid
  //           item
  //           xs={6}
  //           sm={6}
  //           md={5}
  //           lg={5}
  //           xl={5}
  //         >
  //           <FormControl
  //             style={{width: '90%', paddingLeft: 16}}
  //           >
  //             <Seleccion
  //               opciones={plantas}
  //               idOpcion='id'
  //               nomOpcion='nombre'
  //               requerido
  //               valor={secciones.campos.planta.valor}
  //               onChange={onInputChange}
  //               label='Planta:'
  //               indice={1}
  //               campoValido={secciones.campos.planta.campoValido}
  //             />
  //           </FormControl>
  //         </Grid>
  //         <Grid 
  //           item
  //           xs={false}
  //           sm={false}
  //           md={1}
  //           lg={1}
  //           xl={1}
  //         />
  //       </Grid>
  //       <Grid
  //         container
  //         style={
  //           {
  //             padding: 16,
  //           }
  //         }
  //       >
  //         <Grid
  //           item
  //           xs={4}
  //           sm={4}
  //           md={4}
  //           lg={4}
  //           xl={4}
  //         >
  //           <Typography
  //             variant='h6'
  //           >
  //             Planos
  //           </Typography>
  //         </Grid>
  //         <Grid
  //           item
  //           xs={2}
  //           sm={2}
  //           md={2}
  //           lg={2}
  //           xl={2}
  //         >
  //         </Grid>
  //         <Grid
  //           item
  //           xs={4}
  //           sm={4}
  //           md={4}
  //           lg={5}
  //           xl={5}
  //           style={
  //             {
  //               textAlign: 'right',
  //             }
  //           }
  //         >
  //           <FormControl>
  //             <UploadFile
  //               id="upload-file"
  //               afterOnload={onUploadedFileProxy}
  //               label="upload file"
  //               createWebUrl
  //               transform="buffer"
  //             >
  //               <Button
  //                 size="small"
  //                 variant="contained"
  //                 component="span"
  //                 className={classes.success}
  //               >
  //                 <Nubesita
  //                   className={classes.leftIcon}
  //                 />
  //                 SUBIR IMAGEN
  //               </Button>
  //             </UploadFile>
  //           </FormControl>
  //         </Grid>
  //         <Grid
  //           item
  //           xs={2}
  //           sm={2}
  //           md={2}
  //           lg={1}
  //           xl={1}
  //         >
  //         </Grid>
  //       </Grid>
  //       <Grid
  //         container
  //         item
  //         justify="center"
  //         style={{ width:'100%', height: '50%'}}
  //       >
  //         <Grid
  //           item
  //           style={
  //             {
  //               height: '100%',
  //               width: '90%',
  //             }
  //           }
  //         >
  //           {secciones.campos.plano.url && 
  //             <img 
  //               src={secciones.campos.plano.url}
  //               style={{ width:'100%',height: '100%'}}
  //               alt=""
  //             /> 
  //           }
  //         </Grid>
  //       </Grid>
  //       <Grid
  //         container
  //         direction="row"
  //         justify="flex-end"
  //         style={
  //           {
  //             padding: 16,
  //           }
  //         }
  //       >
  //         <Grid
  //           item
  //         >
  //           <Success 
  //             onClick={
  //               secciones.pestañaSlc === 0 ? 
  //                 onClickSiguiente :
  //                 onClickAgregarProxy(0)
  //             }
  //             label={
  //               secciones.pestañaSlc === 0 ? 'Siguiente' : 'Guardar'
  //             }
  //           />
  //         </Grid>
  //         <Grid 
  //           item
  //           xs={false}
  //           sm={false}
  //           md={1}
  //           lg={1}
  //           xl={1}
  //         />
  //       </Grid>
  //     </React.Fragment>
  //   )



  // if(secciones.seccionSlc.esAccesorio)
  //   return (
  //     <Grid
  //       container
  //       style={
  //         {
  //           padding: '8px 8px 0px 16px',
  //           height: '100%',
  //         }
  //       }
  //     >
  //       <Modal 
  //         open={secciones.abrirModal}
  //         typeAlert='Report'
  //         typeOptions='Select'
  //         title='Confirmar....'
  //         message={secciones.mensajeConfirmacion}
  //         onClickAccept={funcModal}
  //         onClickCancel={funcModalCancelar}
  //       />
  //       <Grid
  //         item
  //         container
  //         style={
  //           {
  //             height: 'calc(35% - 30px)',
  //             overflow: 'auto',
  //           }
  //         }
  //       >
  //         <Grid 
  //           item
  //           xs={false}
  //           sm={false}
  //           md={1}
  //           lg={1}
  //           xl={1}
  //         />
  //         <Grid
  //           item
  //           xs={6}
  //           sm={6}
  //           md={5}
  //           lg={5}
  //           xl={5}
  //         >
  //           <FormControl
  //             style={{width: '90%', margin: '0'}}
  //           >
  //             <Input
  //               onChange={onInputChangeAccesorio}
  //               nomCampo='Nombre de la pieza:'
  //               longitud='50'
  //               valor={secciones.campos.pieza.valor}
  //               indice={0}
  //               name='nombrePieza'
  //               requerido
  //               isComplete={secciones.campos.pieza.campoValido}
  //             />
  //           </FormControl>
  //         </Grid>
  //         <Grid
  //           item
  //           xs={6}
  //           sm={6}
  //           md={5}
  //           lg={5}
  //           xl={5}
  //         >
  //           <FormControl
  //             style={{width: '90%', margin: '0'}}
  //           >
  //             <Input
  //               onChange={onInputChangeAccesorio}
  //               nomCampo='Costo del material:'
  //               valor={secciones.campos.material.valor}
  //               indice={1}
  //               requerido
  //               tipoInput='numero'
  //               isComplete={secciones.campos.material.campoValido}
  //             />
  //           </FormControl>
  //         </Grid>
  //         <Grid 
  //           item
  //           xs={false}
  //           sm={false}
  //           md={1}
  //           lg={1}
  //           xl={1}
  //         />
  //         <Grid 
  //           item
  //           xs={false}
  //           sm={false}
  //           md={1}
  //           lg={1}
  //           xl={1}
  //         />
  //         <Grid
  //           item
  //           xs={6}
  //           sm={6}
  //           md={5}
  //           lg={5}
  //           xl={5}
  //         >
  //           <FormControl
  //             style={{width: '90%', margin: '0'}}
  //           >
  //             <Input
  //               onChange={onInputChangeAccesorio}
  //               nomCampo='Cantidad de piezas:'
  //               longitud='50'
  //               valor={secciones.campos.cantPiezas.valor}
  //               indice={2}
  //               requerido
  //               tipoInput='numero'
  //               isComplete={secciones.campos.cantPiezas.campoValido}
  //             />
  //           </FormControl>
  //         </Grid>
  //         <Grid
  //           item
  //           xs={6}
  //           sm={6}
  //           md={5}
  //           lg={5}
  //           xl={5}
  //         >
  //           <FormControl
  //             style={{width: '90%', margin: '0'}}
  //           >
  //             <Input
  //               onChange={onInputChangeAccesorio}
  //               nomCampo='Tiempo de vida(usos):'
  //               longitud='50'
  //               valor={secciones.campos.tiempoVida.valor}
  //               indice={3}
  //               requerido
  //               tipoInput='numero'
  //               isComplete={secciones.campos.tiempoVida.campoValido}
  //             />
  //           </FormControl>
  //         </Grid>
  //         <Grid 
  //           item
  //           xs={false}
  //           sm={false}
  //           md={1}
  //           lg={1}
  //           xl={1}
  //         />
  //         <Grid
  //           container
  //           justify="flex-end"
  //           style={
  //             {
  //               marginTop: 16,
  //             }
  //           }
  //         >
  //           {((secciones.idAccesorio !== null && !secciones.abrirModal) || (secciones.hayEdicion)) &&
  //           <Grid
  //             item
  //             style={
  //               {
  //                 paddingRight: 16,
  //               }
  //             }
  //           >
  //             <Cancelar 
  //               onClick={onClickCancelarAccesorioProxy(false)}
  //               label='Cancelar'
  //             />
  //           </Grid>}
  //           <Grid
  //             item
  //           >
  //             <Success 
  //               onClick={onClickAgregarProxy(1)}
  //               label={((secciones.idAccesorio !== null && !secciones.abrirModal) || (secciones.hayEdicion)) ? 
  //                 'Actualizar' : 'Agregar'}
  //               disabled={secciones.botonAgregar}
  //             />
  //           </Grid>
  //           <Grid 
  //             item
  //             xs={false}
  //             sm={false}
  //             md={1}
  //             lg={1}
  //             xl={1}
  //           />
  //         </Grid>
  //       </Grid>
  //       <Grid
  //         container
  //         style={
  //           {
  //             height: '50%',
  //           }
  //         }
  //       >
  //         <DataTable 
  //           data = {secciones.seccionSlc.datos}
  //           headers = {secciones.accesorio.cabeceras}
  //           configuracion = {configuracion}
  //           opciones = {
  //             [
  //               {'icon' : 'editar', 'action': onEditarAccesorio},
  //               {'icon' : 'eliminar', 'action': onEliminarAccesorio},
  //             ]
  //           }
  //           temporal
  //           // acciones = {acciones}
  //           message='¿Esta seguro que desea eliminar la(s) NuevoMolde(s)?'
  //           params= {
  //             {
  //               height: 30,
  //               backgroundColor: 'rgb(245, 245, 245)',
  //               padding: 0,
  //             }
  //           }
  //           elevacion={0}
  //         />
  //       </Grid>
  //       <Grid
  //         container
  //         justify="flex-end"
  //         style={
  //           {
  //             marginTop: 16,
  //           }
  //         }
  //       >
  //         <Grid
  //           item
  //           style={
  //             {
  //               paddingRight: 16,
  //             }
  //           }
  //         >
  //           <Cancelar 
  //             onClick={onClickCerrar(false)}
  //             label='Cerrar'
  //           />
  //         </Grid>
  //         <Grid
  //           item
  //         >
  //           <Success 
  //             onClick={onClickGuardarProxy(1)}
  //             label='Guardar'
  //             disabled={secciones.seccionSlc.datos.length === 0}
  //           />
  //         </Grid>
  //         <Grid 
  //           item
  //           xs={false}
  //           sm={false}
  //           md={1}
  //           lg={1}
  //           xl={1}
  //         />
  //       </Grid>
  //     </Grid>
  //   )
}

PestanaSecciones.propTypes = {
  pestana: T.number,
  plantas: T.array,
  plazasDestino: T.array,
  accesorios: T.array,
  secciones: T.object,
  campos: T.object,
  seleccionesRows: T.object,
  onInputChange: T.func,
  handleChangeMontoProxy: T.func,
  onSearchProxy: T.func,
  cambiarPestaña: T.func,
  esDetalleMovimiento: T.bool,
  
};

export default compose(
  withStyles(styles),
  withHandlers({
    handleChangeMontoProxy: (props) => (index) => (event) => {

      const {
        onInputMontoMolde,
        tablas,
      } = props;
      const {
        datos: {
          [index]:{
            Cantidad,
            // Monto,
          },
        },
      } = tablas.accesorio;

      const max = Cantidad
      // const max = Monto > Cantidad ? Cantidad : Monto;
      
      let {
        target: { value },
      } = event;

      value = value.replace(/^\s+/g,'');

      if(value <= 0){
        value = value === '' ? '' : 0;
      } else if(parseInt(value) < max){
        value = parseInt(value);
      } else {
        value = max;
      }
      
      onInputMontoMolde(index, value)
    },


    onEditarAccesorioProxy: (props) => (band) => () => {
      const {
        onEditarAccesorio,
      } = props;
      onEditarAccesorio(band);
    },
    onEditarPiezaProxy: (props) => (band) => () => {
      const {
        onEditarPieza,
      } = props;
      onEditarPieza(band);
    },
    onClickCancelarAccesorioProxy: (props) => (band) => () => {
      const {
        onClickCancelarAccesorio,
      } = props;
      onClickCancelarAccesorio(band);
    },
    onSearchProxy: (props) => (searchText) => {
      const {
        onSearchChange,
        pestañaSeleccionada,
      } = props
      onSearchChange(pestañaSeleccionada,searchText)
    },
  })
)(PestanaSecciones);
