import React from 'react';
export default {
  materialesTabla: {
    cabeceras: [
      {
        name: 'IdArticulo',
        label: 'ID',
      },
      {
        name: 'Agrupador',
        label: 'Módulo',
      },
      {
        name: 'Nombre',
        label: 'Artículo',
      },
      {
        name: 'Precio',
        label: 'Precio',
        options: {
          customHeadRender: (columnMeta) => ( 
            <th  
              // eslint-disable-next-line react/no-array-index-key 
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'right', 
                  backgroundColor: '#fff', 
                  color: 'rgba(0, 0, 0, 0.54)', 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  padding : 16, 
                  borderBottom: '1px solid rgba(224, 224, 224, 1)', 
                } 
              } 
            > 
              {columnMeta.name} 
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'right', 
              paddingRight: 16, 
              width: '10%', 
            }, 
          }),
        },
      },
      {
        name: 'StockMinimo',
        label: 'Stock mínimo',
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
                  padding : 16, 
                  borderBottom: '1px solid rgba(224, 224, 224, 1)', 
                } 
              } 
            > 
              {columnMeta.label} 
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'center', 
              paddingRight: 16,
            }, 
          }),
        },
      },
      {
        name: 'StockMaximo',
        label: 'Stock máximo',
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
                  padding : 16, 
                  borderBottom: '1px solid rgba(224, 224, 224, 1)', 
                } 
              } 
            > 
              {columnMeta.label} 
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'center', 
              paddingRight: 16,
            }, 
          }),
        },
      },
      {
        name: 'options',
        label: [],
        options: {
          filter: false,
        },
      },
    ],
    datos: [],
    openModal: false,
    stepper: 0,
    articuloSelec: 0,
    agrupadores: [],
    agrupadorSlc : [],
    update: false,
    configuracion : {
      filtro : true,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: 'none',
      registrosPorPagina: 10,
    },
    materialNuevo: {
      idUsuario : 26921,
      idMaterial : {
        error : false,
        texto : "",
        value : [],
      },
      idAgrupador : {
        error : false,
        texto : "",
        value : [],
      },
      nombre : {
        error : false,
        texto : "",
        value : [],
      },
      precio : {
        error : false,
        texto : "",
        value : [],
      },
      stockMinimo : {
        error : false,
        texto : "",
        value : [],
      },
      stockMaximo : {
        error : false,
        texto : "",
        value : [],
      },
    },
  },
}