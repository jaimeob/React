/* eslint-disable radix */
import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
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
    onRowMoldeSelectProxy,
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
                textAlign: 'center', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px', 
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
      name: 'Planta',
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
                textAlign: 'center', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px', 
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
                textAlign: 'center', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px', 
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
      name: 'Planta',
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
      label: 'Monto',
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

  const configuracion = {
    filtro : true,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'none',
    paginado: false,
    responsivo: "scroll",
  };
  
  if(pestana === 0)
    return (
      <Tabla
        headers={headerPiezas}
        data={piezas.datos}
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
        rowsSelected={piezas.seleccionados}
      />
    );
  if(pestana === 1)
    return(
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
        rowsSelected={accesorios.seleccionados}
      />
    )
}

PestanaSecciones.propTypes = {
  pestana: T.number,
};

export default compose(
  withStyles(styles)
)(PestanaSecciones);
