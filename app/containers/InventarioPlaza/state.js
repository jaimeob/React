import React from 'react';
export default {
  inventarioPlazaTabla: {
    error: {
      value : false,
      texto: "",
    },
    disabled: true,
    headers : [
      {
        name: 'Plaza',
        label: 'Plaza',
      },
      {
        name: 'Nombre',
        label: 'Tipo',
      },
      {
        name: 'Folio',
        label: 'Folio',
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
              {columnMeta.name} 
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'center', 
              paddingRight: 16, 
              width: '15%', 
            }, 
          }),
        },
      },
      {
        name: 'FechaCreacion',
        label: 'Fecha',
      },
      {
        name: 'Solicitante',
        label: 'Usuario',
      },
      {
        name: 'options',
        label: [],
      },
    ],
    headersReportes : [
      {
        name: 'Plaza',
        label: 'Plaza',
      },
      {
        name: 'Agrupador',
        label: 'Módulo',
      },
      {
        name: 'IdArticulo',
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
        name: 'Articulo',
        label: 'Artículo',
      },
      {
        name: 'Existencia',
        label: 'Existencia',
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
              {columnMeta.name} 
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
            }, 
          }),
        },
      },
      {
        name: 'StockMinimo',
        label: 'Stock Minimo',
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
              {columnMeta.name} 
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
        label: 'Stock Maximo',
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
              {columnMeta.name} 
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
    ],
    movimientos : [],
    reportes : [],
    articulos : [],
    agrupadores : [],
    modal : false,
    modal2 : false,
    modal3 : false,
    stepper : 0,
    agrupadorSlc : [],
    materialSlc : [],
    plaza: {
      id:2,
      nombre:'Culiacan',
    },
    row:[],
    rows  : [],
    movimiento : {
      cabeceras : [
        {
          Nombre: 'ID',
        },
        {
          Nombre: 'Módulo',
        },
        {
          Nombre: 'Articulo',
        },
        {
          Nombre: 'Existencia en plaza',
        },
        {
          Nombre: 'Cantidad',
        },
        {
          Nombre: 'Comentarios',
        },
        {
          Nombre: 'Eliminar',
        },
      ],
      IdUsuario : 26921,
      tipoMovimiento : 2,
      folio : '01-01',
      datos: {
        Id: [],
        IdModulo: [],
        IdArticulo: [],
        Agrupador: [],
        Nombre: [],
        Precio: [],
        Cantidad: [],
        Existencia: 0,
        StockMaximo: 0,
        Comentario: [],
        CantidadAutorizada: [],
        CantidadSolicitada: [],
      },
      plaza : {
        Id : 2,
        Nombre : 'culiacan',
      },
      rows : [],
    },
    movimientoDetalle : {
      headers: [
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
          name: 'Cantidad',
          label: 'Cantidad',
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
                {columnMeta.name} 
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
          name: 'Comentarios',
          label: 'Comentarios',
        },
      ],
      rows: [],
      configuracion: {
        filtro : false,
        descarga : false,
        columnas : false,
        imprimir : false,
        seleccionable: 'none',
        paginador: false,
        buscar: false,
      },
    },
    configuracion : {
      filtro : true,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: 'none',
      registrosPorPagina : 10,
    },
  },
}