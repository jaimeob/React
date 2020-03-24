import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  Typography,
  Tooltip,
} from '@material-ui/core';
import {parseInt,uniqueId} from 'lodash';
import {withHandlers,lifecycle} from 'recompose';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
// import Success from 'components/BotonSuccess'
// import Cancelar from 'components/BotonCancelar'
import DataTable from 'components/DataTable';
import SubirArchivoIcon from '@material-ui/icons/CloudUploadOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Input from 'components/FormInput';
import Archivo from '@material-ui/icons/Attachment';
import moment from 'moment';
import { Container } from './styledComponents';
import Tabla from '../Tabla'

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




function CapturaInsumo(props){
  const {
    insumoSeleccionado,
    tablas,
    estatus,
    seleccionesRows,
    documentacion,
    onRowSelectProxy,
    onSearchProxy,
    handleChangeSelectionProxy,
    handleChangeMontoProxy,
    handleChangeArchivoProxy,
    handleDeleteArchivoProxy,
    handleDownloadArchivoProxy,
    classes,
    esDetalleInventario,
  } = props;


  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable:  esDetalleInventario ? 'none' : 'multiple',
    registrosPorPagina:50,
    paginado: true,
    responsivo: "scroll",
    ordenar: false,
    textoBusqueda: insumoSeleccionado === 1 ? tablas.piezas.textoBusqueda:tablas.accesorios.textoBusqueda,
  };
 
  const cambiarCeldasEstatus = (i,label,IdEstatus,color) => {
    if(!esDetalleInventario)
      return <Select
        value={IdEstatus}
        variant="outlined"
        onChange={handleChangeSelectionProxy(0,i)}
        // id={tablas.piezas.datos[i].IdPieza}
        displayEmpty
        input={<InputBase inputProps={{'aria-label': 'naked' }} />}
        name="Molde"
      // className="selectVacio"
      >
    
        {/* <MenuItem value="">
      <em style= {{color:'blue'}}>Select Estatus</em>
    </MenuItem>  */}
        {estatus.map((elem) => 
          <MenuItem 
            style={{fontSize: 14}}  
            id={`piezas_${elem.IdEstatus}`} 
            key={`${elem.IdEstatus}`} 
            value={elem.IdEstatus || ''}>
            <Chip
              avatar={<Avatar style={{backgroundColor: elem.Color, width: '22px', height: '20px'}}></Avatar>}
              label={elem.Estatus} 
              style={{
                backgroundColor: 'white',
                borderColor: `rgba(${elem.Color[1]}, 0.5)`,
                width: '130px',
                height: '20px',
                justifyContent: 'start',
              }}
              variant="outlined"
            />
          </MenuItem>)}
      </Select>
      
    return <Chip
      avatar={<Avatar style={{backgroundColor: color, width: '22px', height: '20px'}}></Avatar>}
      label={label} 
      style={{
        backgroundColor: 'white',
        borderColor: `rgba(${color[1]}, 0.5)`,
        width: '130px',
        height: '20px',
        justifyContent: 'start',
      }}
      variant="outlined"
    />
    // obtenerNotificacionesAction(response)
  };
  const cambiarCeldasEvidencia = (i,label,datosEvidencia,nombre,tipo) =>{
    const tipoInsumo = tipo === 0?'pieza':'accesorio'
    if(esDetalleInventario){
      if(label!==''){
        return<Grid
          item
        >
          <Tooltip 
          // eslint-disable-next-line react/no-array-index-key
            key={uniqueId('archivodocumentacion_')}
            title = {label}
          >
            <Chip
              icon={<Archivo/>}
              label={label.substring(0,40)}
              style={{fontSize: '1em', marginRight: 8,maxHeight: 45}}
              onClick={handleDownloadArchivoProxy(tipo,i)}
            // onDelete={handleDeleteArchivoProxy(0,i)}
            />
          </Tooltip>
        </Grid>
      }
      return<Grid
        item
        // margin-right: 31px;
      >
        <Typography
          variant="subitile2"
          className={classes.typography}
        >
          No se subió evidencia
        </Typography>
      </Grid>

        
    }        
    if (datosEvidencia.length>0) {
      return <Grid
        item
      >
        <Tooltip 
        // eslint-disable-next-line react/no-array-index-key
          key={uniqueId('archivodocumentacion_')}
          title = {nombre}
        >
          <Chip
            icon={<Archivo/>}
            label={nombre.substring(0,40)}
            style={{fontSize: '1em', marginRight: 8}}
            onClick={handleDownloadArchivoProxy(tipo,i)}
            onDelete={handleDeleteArchivoProxy(tipo,i)}
          />
        </Tooltip>
      </Grid>
    }
    return <Container flexDirection="row" justify="flex-end" style={{ padding: '5px 5px',justifyContent:'left'}}>
      <input
        accept="*"
        style={{display: 'none'}}
        id={`subirArchivosPieza_${i}`}
        onChange={handleChangeArchivoProxy(tipo,i)}
        type="file"
      />
      <label htmlFor={`subirArchivos${tipoInsumo}_${i}`}>
        <SubirArchivoIcon
          style={{cursor: 'pointer'}} 
          // onClick = {handleChangeArchivoProxy(0,i)}
          // className={classes.botones}
          // onClick = {regresar}
        />
      </label>
      {/* </UploadFile> */}
    </Container> 
  };
  const cambiarCeldasMonto = (value,tableMeta) =>{     
    if (!esDetalleInventario) {
      return <Input 
        requerido
        placeholder = 'monto'
        tipoInput = 'numero'
        // inhabilitado = {tablas.accesorio.datos[tableMeta.rowIndex].Desactivado}
        indice = {tableMeta.rowIndex}
        valor = {value === null ? '' : value}
        isComplete = {tablas.accesorios.datos[tableMeta.rowIndex].CampoValido}
        onChange = {handleChangeMontoProxy}
      />
    }
    return value
  };

  for (let i = 0; i < tablas.piezas.datos.length; i+=1) {
    // let color;
    if(typeof tablas.piezas.datos[i].Estatus === 'string'){
      tablas.piezas.datos[i].Estatus = cambiarCeldasEstatus(i,tablas.piezas.datos[i].Estatus,tablas.piezas.datos[i].IdEstatus,tablas.piezas.datos[i].Color)
      // onChangeCelda(i,0,'Estatus',tablas.piezas.datos[i].Estatus)
      // handleChangeCeldaProxy(i,0,'Estatus',tablas.piezas.datos[i].Estatus)
    }

    

    if(tablas.piezas.datos[i].Evidencia === ''){
      const archivo = documentacion.archivos.filter(datoArchivo=> datoArchivo.IdInsumo === tablas.piezas.datos[i].IdInsumo)
      // eslint-disable-next-line no-nested-ternary
      const nombre = archivo.length > 0 ?  esDetalleInventario?`${archivo[0].Nombre}`: archivo[0].Nombre?`${archivo[0].Nombre}`:`${archivo[0].File.name}`: ''
      tablas.piezas.datos[i].Evidencia = cambiarCeldasEvidencia(i,tablas.piezas.datos[i].NombreEvidencia,tablas.piezas.datos[i].Evidencia,nombre,0)
      // onChangeCelda(i,0,'Evidencia',tablas.piezas.datos[i].Evidencia)
    }
    // eslint-disable-next-line no-nested-ternary
    
  }

  tablas.accesorios.cabeceras.forEach((accesorio,index) => {
    if (accesorio.name === "Monto") {
      tablas.accesorios.cabeceras[index].options.customBodyRender = (value, tableMeta) =>
      // eslint-disable-next-line no-nested-ternary
        tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' ?
        // (tablas.accesorio.datos[tableMeta.rowIndex].Desactivado === 0 ? 
          cambiarCeldasMonto(value,tableMeta)
          : null
    }
    // if (accesorio.name === "Evidencia") {
    //   tablas.accesorios.cabeceras[index].options.customBodyRender = (value, tableMeta) =>
    //   // eslint-disable-next-line no-nested-ternary
    //     tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' ?
    //       <SubirArchivoIcon
    //         style={{cursor: 'pointer'}} 
    //         // className={classes.botones}
    //         // onClick = {regresar}
    //       />
    //       : null
    // }
  })

  for (let i = 0; i < tablas.accesorios.datos.length; i+=1) {
    // let color;
    // if(typeof tablas.accesorios.datos[i].Estatus === 'string'){
    //   tablas.accesorios.datos[i].Estatus =  
    //   !esDetalleInventario ?
    //     <Select
    //       value={tablas.accesorios.datos[i].IdEstatus}
    //       variant="outlined"
    //       onChange={handleChangeSelectionProxy(1,i)}
    //       displayEmpty
    //       input={<InputBase inputProps={{'aria-label': 'naked' }} />}
    //       name="Molde"
    //       // className="selectVacio"
    //     >
        
    //       {/* <MenuItem value="">
    //       <em style= {{color:'blue'}}>Select Estatus</em>
    //     </MenuItem>  */}
    //       {estatus.map((elem) => 
    //         <MenuItem 
    //           style={{fontSize: 14}}  
    //           id={`piezas_${elem.IdEstatus}`} 
    //           key={`${elem.IdEstatus}`} 
    //           value={elem.IdEstatus || ''}>
    //           <Chip
    //             avatar={<Avatar style={{backgroundColor: elem.Color, width: '22px', height: '20px'}}></Avatar>}
    //             label={elem.Estatus} 
    //             style={{
    //               backgroundColor: 'white',
    //               borderColor: `rgba(${elem.Color[1]}, 0.5)`,
    //               width: '130px',
    //               height: '20px',
    //               justifyContent: 'start',
    //             }}
    //             variant="outlined"
    //           />
    //         </MenuItem>)}
    //     </Select>
    //     :
    //     <Chip
    //       avatar={<Avatar style={{backgroundColor: tablas.accesorios.datos[i].Color, width: '22px', height: '20px'}}></Avatar>}
    //       label={tablas.accesorios.datos[i].Estatus} 
    //       style={{
    //         backgroundColor: 'white',
    //         borderColor: `rgba(${tablas.accesorios.datos[i].Color[1]}, 0.5)`,
    //         width: '130px',
    //         height: '20px',
    //         justifyContent: 'start',
    //       }}
    //       variant="outlined"
    //     />
    // }
    const archivo = documentacion.archivos.filter(datoArchivo=> datoArchivo.IdInsumo === tablas.accesorios.datos[i].IdInsumo)
    // eslint-disable-next-line no-nested-ternary
    const nombre = archivo.length > 0 ?  esDetalleInventario?`${archivo[0].Nombre}`: archivo[0].Nombre?`${archivo[0].Nombre}`:`${archivo[0].File.name}`: ''
    tablas.accesorios.datos[i].Evidencia = cambiarCeldasEvidencia(i,tablas.accesorios.datos[i].NombreEvidencia,tablas.accesorios.datos[i].Evidencia,nombre,1)
    // eslint-disable-next-line no-nested-ternary
    // esDetalleInventario ? 
    //   tablas.accesorios.datos[i].NombreEvidencia !== ''?
    //     <Grid
    //       item
    //     // margin-right: 31px;
    //     >
    //       <Tooltip 
    //       // eslint-disable-next-line react/no-array-index-key
    //         key={uniqueId('archivodocumentacion_')}
    //         title = {tablas.accesorios.datos[i].NombreEvidencia}
    //       >
    //         <Chip
    //           icon={<Archivo/>}
    //           label={tablas.accesorios.datos[i].NombreEvidencia.substring(0,40)}
    //           style={{fontSize: '1em', marginRight: 8}}
    //           onClick={handleDownloadArchivoProxy(1,i)}
    //         />
    //       </Tooltip>
    //     </Grid>
    //     : 
    //     <Grid
    //       item
    //       // margin-right: 31px;
    //     >
    //       <Typography
    //         variant="subitile2"
    //         className={classes.typography}
    //       >
    //         No se subió evidencia
    //       </Typography>
    //     </Grid>
    //   :
    //   tablas.accesorios.datos[i].Evidencia.length>0 ?
    //     <Grid
    //       item
    //     // margin-right: 31px;
    //     >
    //       <Tooltip 
    //       // eslint-disable-next-line react/no-array-index-key
    //         key={uniqueId('archivodocumentacion_')}
    //         title = {nombre}
    //       >
    //         <Chip
    //           icon={<Archivo/>}
    //           label={nombre.substring(0,40)}
    //           style={{fontSize: '1em', marginRight: 8}}
    //           onClick={handleDownloadArchivoProxy(1,i)}
    //           onDelete={handleDeleteArchivoProxy(1,i)}
    //         />
    //       </Tooltip>
    //     </Grid>
    //     :
    //     <Container flexDirection="row" justify="flex-end" style={{ padding: '5px 5px',justifyContent:'left'}}>
    //       <input
    //         accept="*"
    //         style={{display: 'none'}}
    //         id={`subirArchivosAccesorio_${i}`}
    //         onChange={handleChangeArchivoProxy(1,i)}
    //         type="file"
    //       />
    //       <label htmlFor={`subirArchivosAccesorio_${i}`}>
    //         <SubirArchivoIcon
    //           style={{cursor: 'pointer'}} 
    //           // className={classes.botones}
    //           // onClick = {regresar}
    //         />
    //       </label>
    //       {/* </UploadFile> */}
    //     </Container> 
  }

  if(insumoSeleccionado === 1)
    return (
      <Grid
        container
        style={
          {
            padding: '8px 8px 0px 16px',
            height: '100%',
            overflow:'auto',
          }
        }
      >
        <Grid
          container
          style={
            {
              height: '100%',
              paddingTop: 8,
            }
          }
        >
          {/* <Grid
            item
            container
            style={
              {
                justifyContent:"center",
              }
            }
          >
            <Typography
              variant="h6"
              className={classes.typography}
            >
            Piezas
            </Typography>
          </Grid> */}
          {/* <Grid
            container
            item
            style={{overflow:'auto'}}
          >
            <Tabla
              rows={headers}
              data={tablas.piezas.datos}
              search
              filters
            // addNewRow={() => setStepperAction(1)}
            // toolbarActions={
            //   [
            //     {...(permisos.especiales.activar  === 1 ? (
            //       {
            //         title: 'Activar', icon: 'activate', action: (selectedRows) => requestUpdateStatusDataAction(1, selectedRows.map(el => el.id)),
            //       }
            //     ) : null )},
            //     {...(permisos.normales.eliminar  === 1 ? (
            //       {
            //         title: 'Inactivar', icon: 'deactivate', action: (selectedRows) => this.deActivateRows(selectedRows.map(el => el.id)),
            //       }
            //     ) : null )},
            //     {
            //     },
            //     {...(permisos.especiales.descargararchivo  === 1 ? (
            //       {
            //         title: 'Descargar', icon: 'download', action: (selectedRows) => this.downloadRows(selectedRows),
            //       }
            //     ) : null )},
            //   ]
            // }
            // actions={
            //   [
            //     {...(permisos.normales.editar  === 1 || permisos.normales.sololectura === 1 ? (
            //       {
            //         title: 'Editar', icon: 'edit', action: (row) => this.editRow(row),
            //       }
            //     ) : null )},
            //     {...(permisos.normales.eliminar  === 1 ? (
            //       {
            //         title: 'Eliminar', icon: 'delete', action: (row) => this.deActivateRows([row.id]),
            //       }
            //     ) : null )},
            //     {...(permisos.especiales.descargararchivo  === 1 ? (
            //       {
            //         title: 'Descargar', icon: 'download', action: (row) => this.downloadFile(row),
            //       }
            //     ) : null )},
            //   ]
            // }
            />
          </Grid> */}

          <DataTable 
            data = {tablas.piezas.datos}
            headers = {tablas.piezas.cabeceras}
            configuracion = {configuracion}
            onRowsSelect  = {onRowSelectProxy}
            onSearchChange ={onSearchProxy}
            rowsSelected = {seleccionesRows.piezasSeleccionadas}
            
            // opciones = {
            //   [
            //     {'icon' : 'ver', 'action': onEditarPieza},
            //     {'icon' : 'eliminar', 'action': onEliminarAccesorio},
            //   ]
            // }
            temporal
            // acciones = {acciones}
            // message='¿Esta seguro que desea eliminar la(s) NuevoMolde(s)?'
            params= {
              {
                height: '57',
                backgroundColor: '#fff',
              }
            }
            elevacion={0}
            titulo='Piezas'
          />
        </Grid>
      </Grid>
    );
  

  if(insumoSeleccionado === 2)
    return (
      <Grid
        container
        style={
          {
            padding: '8px 8px 0px 16px',
            height: '100%',
          }
        }
      >
        <Grid
          container
          style={
            {
              height: '100%',
              paddingTop: 8,
            }
          }
        >
          {/* <Grid
            item
            container
            style={
              {
                justifyContent:"center",
              }
            }
          >
            <Typography
              variant="h6"
              align = "center"
              className={classes.typography}
            >
          Accesorios
            </Typography>
          </Grid> */}
          <DataTable 
            data = {tablas.accesorios.datos}
            headers = {tablas.accesorios.cabeceras}
            configuracion = {configuracion}
            onRowsSelect  = {onRowSelectProxy}
            onSearchChange ={onSearchProxy}
            rowsSelected = {seleccionesRows.accesoriosSeleccionados}
          
            // opciones = {
            //   [
            //     {'icon' : 'ver', 'action': onEditarPieza},
            //     {'icon' : 'eliminar', 'action': onEliminarAccesorio},
            //   ]
            // }
            temporal
            // acciones = {acciones}
            // message='¿Esta seguro que desea eliminar la(s) NuevoMolde(s)?'
            params= {
              {
                height: '57',
                backgroundColor: '#fff',
                key:'2',
                id:'2',
              }
            }
            elevacion={0}
            titulo='Accesorios'
          />
        </Grid>
      </Grid>
    );
}

CapturaInsumo.propTypes = {
  pestana: T.number,
  plantas: T.array,
  plazasDestino: T.array,
  accesorios: T.array,
  estatus: T.array,
  secciones: T.object,
  // campos: T.object,
  handleChangeEstatus: T.func,
  // datosInsumos: T.object,
  documentacion: T.object,
  seleccionesRows: T.object,
  onInputChange: T.func,
  onRowSelectProxy: T.func,
  onSearchProxy:T.func,
  handleChangeArchivoProxy: T.func,
  handleDeleteArchivoProxy: T.func,
  handleDownloadArchivoProxy: T.func,
  handleChangeMontoProxy: T.func,
  handleChangeSelectionProxy: T.func,
  cambiarPestaña: T.func,
  esDetalleMovimiento: T.bool,
  onChangeCelda: T.func,
};


// const withLifecycle = lifecycle({
//   componentWillReceiveProps(nextProps) {
//     // eslint-disable-next-line no-restricted-syntax
//     for (const index in nextProps) {
//       if (nextProps[index] !== this.props[index]) {
//       }else{
//       }
//     }
//   },
// });

export default compose(
  withStyles(styles),
  withHandlers({
    handleChangeMontoProxy: (props) => (index) => (event) => {
      const {
        onInputMontoMolde,
        // tablas,
      } = props;

      // const {
      //   datos: {
      //     [index]:{
      //       Cantidad,
      //       // Monto,
      //     },
      //   },
      // } = tablas.accesorios;

      // const max = Cantidad
      // const max = Monto > Cantidad ? Cantidad : Monto;
      
      let {
        target: { value },
      } = event;

      value = value.replace(/^\s+/g,'');

      if(value <= 0){
        value = value === '' ? '' : 0;
      } else {
        value = parseInt(value);
      }
      
      onInputMontoMolde(index, value)
    },
    handleChangeSelectionProxy: (props) => (tipoInsumo,indice) => (event) => {
      const valor = event.target.value;
      const {
        handleChangeEstatus,
      } = props;
      handleChangeEstatus(tipoInsumo,indice,valor)
    },

    // handleChangeCeldaProxy: (props) => (indice,tipo,nombre,celda) => () => {
    //   const {
    //     onChangeCelda,
    //   } = props;
    //   onChangeCelda(indice,tipo,nombre,celda)
    // },
    onSearchProxy: (props) => (searchText) => {
      const {
        onSearchChange,
        insumoSeleccionado,
      } = props
      onSearchChange(insumoSeleccionado,searchText)
    },

    onRowSelectProxy: (props) => (rowSeleccionado,seleccionados) => {
      const {
        insumoSeleccionado,
        onRowsSeleccionadosChange,
      } = props

      const rowSeleccionados = [] 

      seleccionados.forEach((seleccionado) => {
        rowSeleccionados.push(seleccionado.dataIndex)
      })
      onRowsSeleccionadosChange(rowSeleccionados,insumoSeleccionado)
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
  })
)(CapturaInsumo);
