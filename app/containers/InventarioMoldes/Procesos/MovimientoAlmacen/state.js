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

  movimientosAlmacenesTabla: {
    stepper: 0,
    cabeceras: [
      {
        name: 'IdMovimientoAlmacen',
        label: 'Folio',
        options: {
          filter: false,
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
        name: 'AlmacenOrigen',
        label: 'Almacén origen',
      },
      {
        name: 'AlmacenDestino',
        label: 'Almacén destino',
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
                  verticalAlign: 'middle',
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
    disabled: {
      pestana: true,
      boton: true,
    },
    moldes:[],
    plantas:[],
    insumos:[],
    insumosSlc:[],
    almacenes: [],
    PDF: [],
    update: false,
    movimientoSelec: 0,
    plantaSlcP: 0,
    plantaSlcA: 0,
    pestanaSlc: null,
    nuevoMovimiento: {
      guardarCompleto: false,
      IdMolde: '',
      IdDetalle: '',
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
        almacenOrigen: {
          valor: '',
          campoValido: false,
          disabled: true,
        },
        almacenDestino: {
          valor: '',
          campoValido: false,
          disabled: true,
        },
        observaciones: {
          valor: '',
          campoValido: false,
        },
        usos: {
          valor: '',
          campoValido: false,
        },
      },
      combos: {
        almacenes: [],
        plazas: [],
        ubicaciones: [],
        ubicacionesOrigen: [],
        ubicacionesDestino: [],
        plantasPiezas: [],
        plantasAccesorios: [],
      },
      tablas: {
        moldes:{
          seleccionados: [],
          datos: [],
          textoBusqueda:'',
        },
        piezas: {
          seleccionados: [],
          datos: [],
          textoBusqueda:'',
        },
        accesorios: {
          seleccionados: [],
          datos: [],
          textoBusqueda:'',
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
      seleccionable: 'none',
      registrosPorPagina: 10,
      ordenar: false,
    },
  },
}