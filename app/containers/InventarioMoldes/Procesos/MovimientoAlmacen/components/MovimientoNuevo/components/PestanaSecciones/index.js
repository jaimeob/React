/* eslint-disable radix */
import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { Grid, TextField, MenuItem} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Input from 'components/FormInput';
import Tabla from '../../../../../../../../components/DataTable';

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
})

function PestanaSecciones(props){
  const {
    pestana,
    piezas,
    accesorios,
    plantasPiezas,
    plantasAccesorios,
    handleChangeMontoProxy,
    onRowMoldeSelectProxy,
    onSearchProxy,
    plantaFilterAction,
    plantaSlcA,
    plantaSlcP,
  } = props;
  const headerPiezas = [
    {
      name: 'IdInsumo',
      label: 'ID',
      options: {
        filter: false,
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px',
                verticalAlign: 'middle', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff',
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
      name: 'Insumo',
      label: 'Descripción',
      options: {
        filter: false,
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'left',
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px',
                verticalAlign: 'middle', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff',
              } 
            } 
          > 
            {columnMeta.label} 
          </th> 
        ),
        setCellProps: () => ({ 
          style: {
            textAlign: 'left', 
            padding: 8, 
            width: '20%', 
          }, 
        }),
      },
    },
    {
      name: 'IdPlanta',
      label: 'Planta',
      options: {
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'center', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px',
                verticalAlign: 'middle', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff',
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
      name: 'Seccion',
      label: 'Seccion',
      options: {
        filter: false,
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'left', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px',
                verticalAlign: 'middle', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff',
              } 
            } 
          > 
            {columnMeta.label} 
          </th> 
        ),
        setCellProps: () => ({ 
          style: { 
            textAlign: 'left', 
            padding : '8px 8px',
            paddingTop: 0,
            paddingBottom: 0, 
            width: '20%', 
          }, 
        }),
      },
    },
    {
      name: 'Identificador',
      label: 'Identificador',
      options: {
        filter: false,
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'center', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px',
                verticalAlign: 'middle', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff',
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
  const headerAccesorios = [
    {
      name: 'IdInsumo',
      label: 'ID',
      options: {
        filter: false,
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px',
                verticalAlign: 'middle', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff',
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
      name: 'Insumo',
      label: 'Descripción',
      options: {
        filter: false,
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'left', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px',
                verticalAlign: 'middle', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff',
              } 
            } 
          > 
            {columnMeta.label} 
          </th> 
        ),
        setCellProps: () => ({ 
          style: {
            textAlign: 'left', 
            padding: 8, 
            width: '20%', 
          }, 
        }),
      },
    },
    {
      name: 'IdPlanta',
      label: 'Planta',
      options: {
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'center', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px',
                verticalAlign: 'middle', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff',
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
      name: 'Cantidad',
      label: 'Stock',
      options: {
        filter: false,
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'center', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px',
                verticalAlign: 'middle', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff',
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
      name: 'Input',
      label: 'Cantidad',
      options: {
        filter: false,
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'center', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px',
                verticalAlign: 'middle', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
                left: 0,
                background: '#fff', 
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
  
  headerAccesorios.forEach((accesorio,index) => {
 
    if (accesorio.name === "Input") { 
      headerAccesorios[index].options.customBodyRender = (value, tableMeta) =>
      // eslint-disable-next-laine no-nested-ternary
        tableMeta.rowData !== null && typeof tableMeta.rowData !== 'undefined' ?
          <Input  
            requerido 
            placeholder = 'Cantidad' 
            tipoInput = 'numero' 
            // inhabilitado = {tablas.accesorio.datos[tableMeta.rowIndex].Desactivado} 
            indice = {tableMeta.rowIndex} 
            valor = {value === null ? '' : value} 
            isComplete = {accesorios.datos[tableMeta.rowIndex].datos.campoValido} 
            onChange = {handleChangeMontoProxy} 
          /> 
          : null 
    } 
  })

  const configuracion = {
    filtro : true,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'multiple',
    registrosPorPagina:50,
    paginado: true,
    responsivo: "scroll",
    textoBusqueda: pestana === 0 ? piezas.textoBusqueda: accesorios.textoBusqueda,
  };
  
  if(pestana === 0)
    return (
      <div>
        <Grid
          item
          xs={6}
          sm={6}
        >
          <TextField
            select
            label="Planta"
            margin="normal"
            onChange={(e) => plantaFilterAction(e, 1)}
            value={plantaSlcP}
            fullWidth
            style={{marginLeft: 15, zIndex: 1}}
          >
            <MenuItem key={0} value={0}>Todas</MenuItem>
            {plantasPiezas.map(plantaPieza => (
              <MenuItem key={plantaPieza.Id} value={plantaPieza.Id}>
                {plantaPieza.Planta}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Tabla
          headers={headerPiezas}
          data={piezas.datos}
          params= {
            {
              height: 60,
              backgroundColor: '#fff',
            }
          }
          temporal
          elevacion={0}
          configuracion={configuracion}
          onRowsSelect={onRowMoldeSelectProxy}
          onSearchChange ={onSearchProxy}
          rowsSelected={piezas.seleccionados}
          mensajeTexto='No se encuentran piezas registradas'
        />
      </div>
    );
  if(pestana === 1)
    return(
      <div>
        <Grid
          item
          xs={6}
          sm={6}
        >
          <TextField
            select
            label="Planta"
            margin="normal"
            onChange={(e) => plantaFilterAction(e, 2)}
            value={plantaSlcA}
            fullWidth
            style={{marginLeft: 15, zIndex: 1}}
          >
            <MenuItem key={0} value={0}>Todas</MenuItem>
            {plantasAccesorios.map(plantaAccesorio => (
              <MenuItem key={plantaAccesorio.Id} value={plantaAccesorio.Id}>
                {plantaAccesorio.Planta}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        
        <Tabla
          headers={headerAccesorios}
          data={accesorios.datos}
          params= {
            {
              height: 82,
              backgroundColor: '#fff',
            }
          }
          temporal
          elevacion={0}
          configuracion={configuracion}
          onRowsSelect={onRowMoldeSelectProxy}
          onSearchChange ={onSearchProxy}
          rowsSelected={accesorios.seleccionados}
          mensajeTexto='No se encuentran accesorios registrados'
        />
      </div>
    )
}

PestanaSecciones.propTypes = {
  pestana: T.number,
};

export default compose(
  withStyles(styles),
  withHandlers({
    handleChangeMontoProxy: (props) => (index) => (event) => { 
      event.persist();
      const {
        accesorios,
        onInputCantidadAccesorioAction,
      } = props;

      const { 
        datos: { 
          [index]:{ 
            Cantidad,
          }, 
        }, 
      } = accesorios; 
 
      const max = Cantidad
       
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

      onInputCantidadAccesorioAction(value, index)
    },
    onRowMoldeSelectProxy:(props) => (rowSeleccionado,seleccionados) => {

      const {
        IdMolde,
        setInsumosSeleccionados,
        pestana,
      } = props
 
      const rowSeleccionados = []  
 
      seleccionados.forEach((seleccionado) => { 
        rowSeleccionados.push(seleccionado.dataIndex) 
      })
      
      setInsumosSeleccionados(rowSeleccionados, IdMolde, pestana) 
    },
    onSearchProxy: (props) => (searchText) => {
      const {
        onSearchChange,
        pestana,
      } = props
      onSearchChange(pestana,searchText)
    },
  })
)(PestanaSecciones);

