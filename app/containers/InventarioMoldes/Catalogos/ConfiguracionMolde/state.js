import {
  Typography,
} from '@material-ui/core';
import React from 'react';

export default {
  catalogo: {
    cabeceras: [
      {
        name: 'idMolde',
        label: 'ID',
      },
      {
        name: 'nombre',
        label: 'Nombre',
      },
      {
        name: 'version',
        label: 'Versión',
      },
      {
        name: 'proveedor',
        label: 'Proveedor',
      },
      {
        name: 'tipoMaterial',
        label: 'Tipo de material',
      },
      {
        name: 'area',
        label: 'Área (m2)',
      },
      {
        name: 'costoTabla',
        label: 'Costo',
      },
      {
        name: 'options', 
        label: ' ',
        options: {
          sort : false,
          filter: false,
          searchable: false,
        },
      },
    ],
    datos: [],
  },
  configuracion: {
    documentacion: {
      archivos: [],
      planos: [],
      listaSlc: '',
      eliminarArchivo: false,
      idArchivoTempo: null,
    },
    combos: {
      proveedores: [],
      materiales: [],
      puestos: [],
      tipos: [
        {
          id: 0,
          nombre: 'Regular',
        },
        {
          id: 1,
          nombre: 'Irregular',
        },
      ],
      pisos: [
        {
          id: 0,
          nombre: 1,
        },
        {
          id: 1,
          nombre: 2,
        },
      ],
      plantas: [],
    },
    general: {
      nombre: {
        valor: '',
        campoValido: true,
      },
      version: {
        valor: '',
        campoValido: true,
      },
      numPlantas: {
        valor: '',
        valorAnterior: '',
        campoValido: true,
      },
      costo: {
        valor: '',
        campoValido: true,
      },
      proveedor: {
        valor: '',
        campoValido: true,
      },
      material: {
        valor: '',
        campoValido: true,
      },
    },

    
    secciones: {
      accesorio: {
        cabeceras: [
          {
            name: 'id',
            label: '#',
          },
          {
            name: 'nombre',
            label: 'Material',
          },
          {
            name: 'tiempoVida',
            label: 'Tiempo de vida',
          },
          {
            name: 'cantPiezas',
            label: 'Cantidad',
          },
          {
            name: 'material',
            label: 'Costo',
          },
          {
            name: 'options', 
            label: ' ',
            options: {
              sort : false,
              filter: false,
              searchable: false,
            },
          },
        ],
      },

      pieza: {
        cabeceras: [
          {
            name: 'id',
            label: '#',
          },
          {
            name: 'nombre',
            label: 'Material',
          },
          {
            name: 'area',
            label: 'Área (m2)',
          },
          {
            name: 'limiteUsos',
            label: 'Limite de usos',
          },
          {
            name: 'pieza',
            label: 'Pieza',
          },
          {
            name: 'options', 
            label: ' ',
            options: {
              sort : false,
              filter: false,
              searchable: false,
            },
          },
        ],
      },

      planos: {
        datos:[],
        cabeceras: [
          {
            name: 'nombrePlanta',
            label: 'Planta',
          },
          {
            name: 'secciones',
            label: 'Secciones',
          },
          {
            name: 'planos',
            label: 'Planos',
            options: {
              setCellProps: () => ({ 
                style: { 
                  display:'flex',
                }, 
              }),
            },
          },
        ],
        configuracion: {
          filtro : false,
          descarga : false,
          columnas : false,
          imprimir : false,
          buscar   : false,
          seleccionable: 'none',
          paginado: false,
          responsivo: "scroll",
          ordenar: false,
        },
      },
      cabeceras: [
        {
          name: 'idSeccion',
          label: '',
          options: {
            filter: false,
            searchable: false,
            display: false,
          },
        },
        {
          name: 'planta',
          label: 'Planta',
          options: {
            filter: false,
            sortDirection:'asc',
            customBodyRender: (value, tableMeta, updateValue) => (
              // eslint-disable-next-line react/react-in-jsx-scope
              <Typography
                // variant="body2"
                style={{fontSize:'0.71rem'}}
              >
                {value === 1?'Planta baja':`Nivel ${value-1}`}
              </Typography>
            ),
          },
        },
        {
          name: 'nombreTabla',
          label: 'Nombre',
        },
        {
          name: 'identificadorTabla',
          label: 'Identificador',
        },
        {
          name: 'insumos',
          label: 'Insumos',
        },
        {
          name: 'area',
          label: 'Área (m2)',
        },
        {
          name: 'options', 
          label: ' ',
          options: {
            sort : false,
            filter: false,
            searchable: false,
          },
        },
      ],
      datos: [
        // {
        //   idSeccion: null,
        //   plantaTabla: 'PB',
        //   nombreTabla: 'Accesorios',
        //   identificadorTabla: '',
        //   insumos: 0,
        //   area: 0,
        //   esAccesorio: true,
        //   cabeceras: [
        //     {
        //       name: 'id',
        //       label: '#',
        //     },
        //     {
        //       name: 'nombre',
        //       label: 'Material',
        //     },
        //     {
        //       name: 'tiempoVida',
        //       label: 'Tiempo de vida',
        //     },
        //     {
        //       name: 'cantPiezas',
        //       label: 'Cantidad',
        //     },
        //     {
        //       name: 'material',
        //       label: 'Costo',
        //     },
        //     {
        //       name: 'options', 
        //       label: ' ',
        //       options: {
        //         sort : false,
        //         filter: false,
        //         searchable: false,
        //       },
        //     },
        //   ],
        //   datos: [],
        // },
        // {
        //   idSeccion: null,
        //   planta: {
        //     valor: 'PA',
        //     campoValido: true,
        //   },
        //   nombre: {
        //     valor: 'Accesorios',
        //     campoValido: true,
        //   },
        //   plano: {
        //     url: '',
        //   },
        //   pieza: {
        //     valor: '',
        //     campoValido: true,
        //   },
        //   material: {
        //     valor: '',
        //     campoValido: true,
        //   },
        //   cantPiezas: {
        //     valor: '',
        //     campoValido: true,
        //   },
        //   tiempoVida: {
        //     valor: '',
        //     campoValido: true,
        //   },
        //   plantaTabla: 'PA',
        //   nombreTabla: 'Accesorios',
        //   identificadorTabla: '',
        //   identificador: {
        //     valor: 'A1',
        //   },
        //   insumos: 0,
        //   area: 0,
        //   esAccesorio: true,
        //   cabeceras: [
        //     {
        //       name: 'id',
        //       label: '#',
        //     },
        //     {
        //       name: 'nombre',
        //       label: 'Material',
        //     },
        //     {
        //       name: 'tiempoVida',
        //       label: 'Tiempo de vida',
        //     },
        //     {
        //       name: 'cantPiezas',
        //       label: 'Cantidad',
        //     },
        //     {
        //       name: 'material',
        //       label: 'Costo',
        //     },
        //     {
        //       name: 'options', 
        //       label: ' ',
        //       options: {
        //         sort : false,
        //         filter: false,
        //         searchable: false,
        //       },
        //     },
        //   ],
        //   datos: [],
        // },
      ],
      datosTemporales:[],
      seccionSlc: {},
      esAccesorio: false,
      pestañaSlc: 0,
      guardarSeccion: false,
      indiceSeccion: null,
      idAccesorio: null,
      botonAgregar: false,
      hayCambio: false,
      hayCambioSeccion: false,
      hayCambioConfiguracion: false,
      abrirModal: false,
      abrirModalAgregar: false,
      abrirModalAviso: false,
      permitirImportacion: true,
      mensajeConfirmacion: '',
      campos: {
        planta: {
          valor: '',
          campoValido: true,
        },
        nombre: {
          valor: '',
          campoValido: true,
        },
        plano: {
          file: {},
        },
        numeracion: {
          valor: '',
          campoValido: true,
        },
        forma: {
          valor: '',
          campoValido: true,
        },
        alto: {
          valor: '',
          campoValido: true,
        },
        ancho: {
          valor: '',
          campoValido: true,
        },
        area: {
          valor: '',
          campoValido: true,
        },
        usos: {
          valor: '',
          campoValido: true,
        },
        pieza: {
          valor: 'Cimbra',
          campoValido: true,
        },
        material: {
          valor: '',
          campoValido: true,
        },
        cantPiezas: {
          valor: '',
          campoValido: true,
        },
        tiempoVida: {
          valor: '',
          campoValido: true,
        },
        identificador: {
          valor: '',
          campoValido: true,
        },
      },
    },
    
    guardarCompleto: false,
    eliminarModal: false,
    idMoldeEliminar: null,
    faltaArchivo: false,
    pestañaSlc: 0,
    etapaNuevoMolde:0,
    primerPaso: false,
    segundoPaso: false,
    tercerPaso: false,
    esDetalleMolde:false, 
  },
  usuario:0,
  idMolde: null,
  stepper: 0,
}