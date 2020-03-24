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
    moldesDestino,
    accesorios,
    piezas,
    onRowMoldeSelectProxy,
  } = props;
  const headerMoldes = [
    {
      name: 'nombre',
      label: 'Molde',
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
            width: '50%', 
          }, 
        }),
      },
    },
    {
      name: 'version',
      label: 'Versión',
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
            width: '50%', 
          }, 
        }),
      },
    },
  ]

  const headerPiezas = [
    {
      name: 'PiezaDestino',
      label: 'Descripcion',
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
      name: 'IPO',
      label: 'Identificador Origen',
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
      name: 'IPD',
      label: 'Identificador Destino',
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
            textAlign: 'left', 
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
      name: 'PiezaDestino',
      label: 'Descripcion',
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
            textAlign: 'left', 
            padding: 8, 
            width: '33%', 
          }, 
        }),
      },
    },
    {
      name: 'IdPlanta',
      label: 'Planta',
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
            textAlign: 'left', 
            padding : '8px 8px',
            paddingTop: 0,
            paddingBottom: 0, 
            width: '33%', 
          }, 
        }),
      },
    },
    {
      name: 'Cantidad',
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
            width: '34%', 
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
  };
  
  if(pestana === 0)
    return (
      <Tabla
        headers={headerMoldes}
        data={moldesDestino.datos}
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
        rowsSelected={moldesDestino.seleccionados}
        mensajeTexto='No se encuentran moldes registrados'
      />
    );
  if(pestana === 1)
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
        mensajeTexto='No se encuentran moldes registrados'
      />
    );
  if(pestana === 2)
    return (
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
        mensajeTexto='No se encuentran moldes registrados'
      />
    );
}

PestanaSecciones.propTypes = {
  pestana: T.number,
  piezas: T.object,
  accesorios: T.object,
};

export default compose(
  withStyles(styles),
)(PestanaSecciones);
