import React from 'react';
export default {
  transformacionesTabla: {
    disabled: false,
    show: false,
    snackbar: 0,
    cabeceras: [
      {
        name: 'IdTransformacion',
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
              width: '10%', 
            }, 
          }),
        },
      },
      {
        name: 'MoldeOrigen',
        label: 'Prototipo origen',
        options: {
          customHeadRender: (columnMeta) => ( 
            <th  
              // eslint-disable-next-line react/no-array-index-key 
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'left', 
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
              textAlign: 'left', 
              paddingRight: 16, 
              width: '25%', 
            }, 
          }),
        },
      },
      {
        name: 'MoldeDestino',
        label: 'Prototipo destino',
        options: {
          customHeadRender: (columnMeta) => ( 
            <th  
              // eslint-disable-next-line react/no-array-index-key 
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'left', 
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
              textAlign: 'left', 
              paddingRight: 16, 
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
                  padding : 16, 
                  borderBottom: '1px solid rgba(224, 224, 224, 1)', 
                } 
              } 
            > 
            </th> 
          ),
          setCellProps: () => ({ 
            style: { 
              textAlign: 'center', 
              paddingRight: 16, 
              width: '25%', 
            }, 
          }),
        },
      },
    ],
    datos: [],
    moldes:[],
    secciones: [],
    origen: {
      idPlanta: 0,
      idSeccion: 0,
      moldes: [],
      secciones: [],
      piezas: [],
      plantas: [],
      datos: {
        value: [],
        error: false,
        text: '',
      },
    },
    destino: {
      idPlanta: 0,
      idSeccion: 0,
      moldes: [],
      secciones: [],
      piezas: [],
      plantas: [],
      datos: {
        value: [],
        error: false,
        text: '',
      },
    },
    nuevaTransformacion: {
      idOrigen: [],
      idDestino: [],
      tasks: [],
      columns: [],
      columnOrder: [],
    },
    agrupadores: [],
    transformacionSelec: 0,
    modal: {
      value: false,
      stepper: 0,
      text: '',
    },
    stepper: 0,
    update: false,
    configuracion : {
      filtro : true,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: 'none',
      registrosPorPagina: 10,
    },
  },
}