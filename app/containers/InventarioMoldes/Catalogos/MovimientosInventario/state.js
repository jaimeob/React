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
  movimientoInventarioTabla: {
    disabled: false,
    show: false,
    esDetalleMovimiento: false,
    cabeceras: [

      {
        name: 'Folio',
        label: 'Folio',
        options: {
          filter:false,
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
        name: 'Nombre',
        label: 'Tipo de Movimiento',
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
        name: 'Plaza',
        label: 'Plaza',
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
              width: '15%', 
            }, 
          }),
        },
      },
      {
        name: 'NombreAlmacen',
        label: 'Almacén',
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
              width: '15%', 
            }, 
          }),
        },
      },
      {
        name: 'Solicitante',
        label: 'Usuario',
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
        name: 'FechaCreacion',
        label: 'Fecha',
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
    PDF: [],
    documentacion: {
      archivos: [],
      listaSlc: '',
      eliminarArchivo: false,
      idArchivoTempo: null,
    },
    configuracionNuevoMovimiento:{
      plazas:[],
      plazasDetalle:[],
      plazasDestino:[],
      tiposMovimientos:[],
      // tiposMovimientosDetalle:[],
      almacenes:[],
      almacenesDestino:[],
      almacenesDestinoValidos:[],
      comboVacio:[
        {
          Id:'',
          Almacen:"No hay información",
        },
      ],
      // Temporar molde
      mostrarMolde: false,
      moldeSeleccionado: '',
      pestañaSeleccionada: 0,
      hayMoldeSeleccionado:false,
      abrirModalAgregar: false,
      hayCambioConfiguracion:false,
      guardarMovimiento: false,
      mensajeConfirmacion: '',
      bandModal: 0,
      seleccionesRows:{
        rowMoldeSeleccionado: undefined,
        rowPiezasSeleccionadas: undefined,
        rowAccesoriosSeleccionados: undefined,
      },
      tablas:{
        molde: {
          datos:[],
          cabeceras: [
            {
              name: 'idMolde',
              label: 'ID',
            },
            {
              name: 'nombre',
              label: 'Molde',
            },
            {
              name: 'version',
              label: 'Versión',
              options: {
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
              name: 'estatus',
              label: 'Estatus',
              options: {
                setCellProps: () => ({
                  style: {
                    paddingRight: 1,
                    width: '15%',
                  },
                }),
                searchable: false,
              },
            },
          ],
          configuracion: {
            filtro : false,
            descarga : false,
            columnas : false,
            imprimir : false,
            seleccionable: 'single',
            registrosPorPagina:50,
            paginado: true,
            ordenar:false,
            responsivo: "scroll",
            textoBusqueda:'',
          },
        },
        pieza: {
          datos:[],
          textoBusqueda:'',
          cabeceras: [
            {
              name: 'Codigo',
              label: 'Código',
            },
            {
              name: 'Nombre',
              label: 'Descripción',
            },
            {
              name: 'Planta',
              label: 'Planta',
            },
            {
              name: 'Seccion',
              label: 'Sección',
            },
            {
              name: 'Identificador',
              label: 'Identificador',
            },
          ],
        },
        accesorio: {
          datos:[],
          textoBusqueda:'',
          cabeceras: [
            {
              name: 'Codigo',
              label: 'Código',
            },
            {
              name: 'Nombre',
              label: 'Descripción',
            },
            {
              name: 'Planta',
              label: 'Planta',
            },
            {
              name: 'Cantidad',
              label: 'Faltantes',
              options: {
                setCellProps: () => ({ 
                  style: { 
                    textAlign: 'center', 
                    width: '20%', 
                  }, 
                }),
              },
            },
            {
              name: 'Monto',
              label: 'Monto',
              options: {
                setCellProps: () => ({ 
                  style: { 
                    textAlign: 'center', 
                    width: '15%', 
                  }, 
                }),
              },
            },
          ],
          camposValidos: false,
        },
      },
    },
    combos: {
      plantas: [],
    },
    secciones: {
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
          name: 'plantaTabla',
          label: 'Planta',
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
          label: 'Área (cm2)',
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
        {
          idSeccion: null,
          plantaTabla: 'PB',
          nombreTabla: 'Accesorios',
          identificadorTabla: '',
          insumos: 0,
          area: 0,
          esAccesorio: true,
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
          datos: [],
        },
        {
          idSeccion: null,
          planta: {
            valor: 'PA',
            campoValido: true,
          },
          nombre: {
            valor: 'Accesorios',
            campoValido: true,
          },
          plano: {
            url: '',
          },
          pieza: {
            valor: '',
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
          plantaTabla: 'PA',
          nombreTabla: 'Accesorios',
          identificadorTabla: '',
          identificador: {
            valor: 'A1',
          },
          insumos: 0,
          area: 0,
          esAccesorio: true,
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
          datos: [],
        },
      ],
      seccionSlc: {},
      esAccesorio: false,
      guardarSeccion: false,
      indiceSeccion: null,
      idAccesorio: null,
      botonAgregar: false,
      hayCambio: false,
      hayCambioSeccion: false,
      hayCambioConfiguracion: false,
      abrirModal: false,
      abrirModalAgregar: false,
      mensajeConfirmacion: '',
      campos: {
        accesorio: {
          valor: '',
          campoValido: true,
        },
      },
    },
    campos: {
      plaza: {
        valor: '',
        campoValido: true,
      },
      plazaDestino: {
        valor: '',
        campoValido: true,
      },
      tipoMovimiento: {
        valor: '',
        campoValido: true,
      },
      observacion: {
        valor: '',
        campoValido: true,
      },
      folio: {
        valor: '',
        campoValido: true,
      },
      plantaPieza: {
        valor: 1,
        campoValido: true,
      },
      plantaAccesorio: {
        valor: 1,
        campoValido: true,
      },
      almacen: {
        valor: '',
        campoValido: true,
      },
      almacenDestino: {
        valor: '',
        campoValido: true,
      },
    },
    nuevoMovimiento: {
      idOrigen: [],
      idDestino: [],
      tasks: [],
      columns: [],
      columnOrder: [],
    },
    stepper: 0,
    usuarioLogeado:0,
    update: false,
    configuracion : {
      filtro : true,
      descarga : false,
      columnas : false,
      imprimir : false,
      ordenar: false,
      seleccionable: 'none',
      registrosPorPagina:50,
      paginado: true,
    },
  },
}