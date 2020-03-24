import React from 'react';
export default {
  permisos: {
    normales: {
      sololectura: 0,
      registrar: 0,
      editar: 0,
      eliminar: 0,
    },
    especiales: {
    },
  },
  transformacionTabla: {
    tableText: "Seleccione una plaza y un almacen",
    stepper: 0,
    disabled: {
      boton: true,
    },
    cabeceras: [
      {
        name: 'IdMovimientoTransformacion',
        label: 'Folio',
        options: {
          filter: false,
        },
      },
      {
        name: 'Descripcion',
        label: 'Descripción',
      },
      {
        name: 'MoldeOrigen',
        label: 'Origen',
      },
      {
        name: 'MoldeDestino',
        label: 'Destino',
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
        name: 'Usuario',
        label: 'Usuario',
      },
      {
        name: 'Fecha',
        label: 'Fecha',
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
              width: '10%', 
            }, 
          }),
        },
      },
    ],
    datos: [],
    update: false,
    plantaSlc: null,
    pestanaSlc: null,
    almacenes: [],
    transformaciones: [],
    moldes: [],
    nuevaTransformacion: {
      campos: {
        descripcion: {
          valor: '',
          campoValido: false,
        },
        plaza: {
          valor: '',
          campoValido: false,
        },
        inventario: {
          valor: '',
          campoValido: false,
          disabled: true,
        },
        idMoldeOrigen: {
          valor: '',
          campoValido: false,
        },
        idCMoldeOrigen: {
          valor: '',
          campoValido: false,
        },
        idMoldeDestino: {
          valor: '',
          campoValido: false,
        },
        molde: {
          valor: '',
          campoValido: false,
        },
        observaciones: {
          valor: '',
          campoValido: false,
        },
      },
      combos: {
        almacenes: [],
        plazas: [],
        plantas: [],
      },
      tablas: {
        moldesOrigen:{
          seleccionados: [],
          datos: [],
        },
        moldesDestino:{
          seleccionados: [],
          datos: [],
        },
        piezas: {
          seleccionados: [],
          datos: [],
        },
        accesorios: {
          seleccionados: [],
          datos: [],
        },
      },
    },
    modal: {
      value: false,
      stepper: 0,
      text: '',
    },
    configuracion : {
      filtro : true,
      descarga : false,
      columnas : false,
      imprimir : false,
      ordenar: false,
      seleccionable: 'none',
      registrosPorPagina: 10,
    },
  },
}