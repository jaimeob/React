import React from 'react';
export default {
  usuariosAlmacenes: {
    cabecerasAP: [
      {
        name: 'IdRegistro',
        label: 'Folio',
        options: {
          customHeadRender: (columnMeta) => ( 
            <th  
              // eslint-disable-next-line react/no-array-index-key 
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'center',
                  // backgroundColor: '#fff',
                  color: 'rgba(0, 0, 0, 0.54)',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  padding : 18,
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  position: 'sticky',
                  top: 0,
                  left: 0,
                  background: '#fff',
                } 
              } 
            > 
              <span style={{height: 10, cursor: 'pointer', display: 'block', outline: 'none'}}>{columnMeta.label}</span> 
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
        name: 'Plaza',
        label: 'Plaza',
      },
      {
        name: 'Almacen',
        label: 'Almacén',
      },
      {
        name: 'options',
        label: [],
        options: {
          filter: false,
          options: {
            filter: false,
          },
        },
      },
    ],
    cabecerasAU: [
      {
        name: 'IdRegistro',
        label: 'Folio',
        options: {
          customHeadRender: (columnMeta) => ( 
            <th  
              // eslint-disable-next-line react/no-array-index-key 
              key={`cabecera${columnMeta.label}`}  
              style={ 
                { 
                  textAlign: 'center',
                  // backgroundColor: '#fff',
                  color: 'rgba(0, 0, 0, 0.54)',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  padding : 18,
                  borderBottom: '1px solid rgba(224, 224, 224, 1)',
                  position: 'sticky',
                  top: 0,
                  left: 0,
                  background: '#fff',              
                } 
              } 
            > 
              <span style={{height: 10, cursor: 'pointer', display: 'block', outline: 'none'}}>{columnMeta.label}</span> 
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
        name: 'Usuario',
        label: 'Usuario',
      },
      {
        name: 'Plaza',
        label: 'Plaza',
      },
      {
        name: 'Almacen',
        label: 'Almacén',
      },
      {
        name: 'options',
        label: [],
        options: {
          filter: false,
        },
      },
    ],
    configuracion : {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      ordenar: false,
      seleccionable: 'none',
      registrosPorPagina: 10,
      paginado: false,
      responsivo: "scroll",
    },
    nuevoAP: {
      disabled: {
        boton: true,
      },
      combos: {
        plazas: [],
        almacenes: [],
      },
      campos: {
        plaza: {
          valor: '',
          error: false,
        },
        almacen: {
          valor: '',
          error: false,
        },
      },
      tablas: {
        tablaAP: [],
      },
    },
    nuevoAU: {
      disabled: {
        boton: true,
      },
      combos: {
        plazas: [],
        almacenes: [],
        usuarios: [],
      },
      campos: {
        plaza: {
          valor: '',
          error: false,
        },
        almacen: {
          valor: '',
          error: false,
        },
        usuario: {
          valor: '',
          error: false,
        },
      },
      tablas: {
        tablaAU: [],
      },
    },
    modal: {
      value: false,
      stepper: 0,
      text: '',
    },
    update: false,
    updateAU: false,
    idRegistroSlc: null,
  },
}