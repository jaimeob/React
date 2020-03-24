import React from 'react';
export default {
  // permisos: {
  //   normales: {
  //     sololectura: 0,
  //     registrar: 0,
  //     editar: 0,
  //     eliminar: 0,
  //   },
  //   especiales: {
  //   },
  // },
  inventarioCiclicoTabla: {
    disabled: false,
    show: false,
    esDetalleInventario: false,
    editarInventario: false,
    existeInventario: false,
    cantidadResultados: 3,
    fechaInicial:null,
    idInventarioCiclico: '',
    generoResultados: false,
    cargando: false,
    datos: [],
    inventariosCiclicos: [],
    evidenciasCalendario: [],
    piezasTemporales:[],
    accesoriosTemporales:[],
    configuracionCalendario:{
      datosSeleccionados:{
        fechaActual: '',
        diaSeleccionado: '',
        fechaSeleccionada: '',
        almacenSeleccionado: '',
        idSeleccionMolde: '',
        moldeSeleccionado: '',
        plantaSeleccionada: '',
      },
      insumoSeleccionado: 0,
      guardarInventario: false,
      tipoGuardado: 0,
      bandModal: 0,
      abrirModal: false,
      abrirEliminarModal:false,
      idEvidenciaCalendario:'',
      mensajeConfirmacion: '',
      hayCambioConfiguracion: false,
      almacenes:[],
      moldes:[],
      estatus:[],
      seleccionesRows:{
        piezasSeleccionadas: undefined,
        accesoriosSeleccionados: undefined,
      },
      datosInsumos:{
        piezasInventariadas: 0,
        accesoriosInventariados: 0,
        piezasTotales: 0,
        accesoriosTotales: 0,
      },
      tablas:{
        piezas: {
          datos:[],
          textoBusqueda:'',
          cabeceras: [
            {
              name: 'Nombre',
              label: 'Descripción',
            },
            {
              name: 'Seccion',
              label: 'Sección',
            },
            {
              name: 'Ubicacion',
              label: 'Ubicación',
            },
            {
              name: 'Identificador',
              label: 'Identificador',
              options: {
                setCellProps: () => ({ 
                  style: { 
                    width: '15%', 
                  }, 
                }),
              },
            },
            {
              name: 'Evidencia',
              label: 'Evidencia',
              options: {
                setCellProps: () => ({ 
                  style: { 
                    textAlign: 'left', 
                    justifyContent:'left',
                    width: '26%', 
                  }, 
                }),
              },
            },
            {
              name: 'Estatus',
              label: 'Estatus',
              options: {
                customHeadRender: (columnMeta) => (
                  <th 
                    // eslint-disable-next-line react/no-array-index-key
                    key={`cabecera${1}`} 
                    style={
                      {
                        textAlign: 'left',
                        // backgroundColor: '#fff',
                        color: 'rgba(0, 0, 0, 0.54)',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        paddingTop : 20,
                        borderBottom: '1px solid rgba(224, 224, 224, 1)',
                        top: '0px',
                        left: '0px',
                        zIndex: '100',
                        position: 'sticky',
                        backgroundColor:'#fff',
                      }
                    }
                  >
                    {columnMeta.label}
                  </th>
                ),
                setCellProps: () => ({ 
                  style: { 
                    textAlign: 'left', 
                    justifyContent:'left',
                    width: '10%', 
                  }, 
                }),
              },
            },
          ],
          // configuracion: {
          //   filtro : false,
          //   descarga : false,
          //   columnas : false,
          //   imprimir : false,
          //   seleccionable: 'multiple',
          //   paginado: false,
          //   responsivo: "scroll",
          // },
        },
        accesorios: {
          datos:[],
          textoBusqueda:'',
          cabeceras: [
            {
              name: 'Nombre',
              label: 'Descripción',
            },
            {
              name: 'Ubicacion',
              label: 'Ubicación',
            },
            {
              name: 'Cantidad',
              label: 'Inv.Teórico',
            },
            {
              name: 'Monto',
              label: 'Cantidad Física',
              options: {
                setCellProps: () => ({ 
                  style: { 
                    textAlign: 'left', 
                    width: '20%', 
                  }, 
                }),
              },
            },
            {
              name: 'Evidencia',
              label: 'Evidencia',
              options: {
                customHeadRender: (columnMeta) => (
                  <th 
                    // eslint-disable-next-line react/no-array-index-key
                    key={`cabecera${1}`} 
                    style={
                      {
                        textAlign: 'left',
                        // backgroundColor: '#fff',
                        color: 'rgba(0, 0, 0, 0.54)',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        paddingTop : 20,
                        borderBottom: '1px solid rgba(224, 224, 224, 1)',
                        top: '0px',
                        left: '0px',
                        zIndex: '100',
                        position: 'sticky',
                        backgroundColor:'#fff',
                      }
                    }
                  >
                    {columnMeta.label}
                  </th>
                ),
                setCellProps: () => ({ 
                  style: { 
                    justifyContent:'left',
                    textAlign: 'left', 
                    width: '26%', 
                  }, 
                }),
              },
            },
          ],
          
          // configuracion: {
          //   filtro : false,
          //   descarga : false,
          //   columnas : false,
          //   imprimir : false,
          //   seleccionable: 'multiple',
          //   paginado: false,
          //   responsivo: "scroll",
          // },
          camposValidos: false,
        },
      },
    },
    documentacion: {
      archivos: [],
      formatoConteo: [],
      idFormatoConteo: null,
      reporteResultados: [],
      idReporteResultados: null,
      planos: [],
      eliminarArchivo: false,
    },
    // configuracionNuevoMovimiento:{
    //   plazas:[],
    //   plazasDestino:[],
    //   tiposMovimientos:[],
    //   bandModal: 0,
    //   tablas:{
    //     molde: {
    //       datos:[],
    //       cabeceras: [
    //         {
    //           name: 'idMolde',
    //           label: 'ID',
    //         },
    //         {
    //           name: 'nombre',
    //           label: 'Molde',
    //         },
    //         {
    //           name: 'version',
    //           label: 'Version',
    //           options: {
    //             setCellProps: () => ({ 
    //               style: { 
    //                 textAlign: 'left', 
    //                 paddingRight: 16, 
    //                 width: '25%', 
    //               }, 
    //             }),
    //           },
    //         },
    //         {
    //           name: 'estatus',
    //           label: 'Estatus',
    //           options: {
    //             setCellProps: () => ({
    //               style: {
    //                 paddingRight: 1,
    //                 width: '15%',
    //               },
    //             }),
    //             searchable: false,
    //           },
    //         },
    //       ],
    //       configuracion: {
    //         filtro : false,
    //         descarga : false,
    //         columnas : false,
    //         imprimir : false,
    //         seleccionable: 'single',
    //         paginado: false,
    //         responsivo: "scroll",
    //       },
    //     },
    //     pieza: {
    //       datos:[],
    //       cabeceras: [
    //         {
    //           name: 'Nombre',
    //           label: 'Descripción',
    //         },
    //         {
    //           name: 'Planta',
    //           label: 'Planta',
    //         },
    //         {
    //           name: 'Seccion',
    //           label: 'Sección',
    //         },
    //         {
    //           name: 'Identificador',
    //           label: 'Identificador',
    //         },
    //       ],
    //     },
    //     accesorio: {
    //       datos:[],
    //       cabeceras: [
    //         {
    //           name: 'Nombre',
    //           label: 'Descripcion',
    //         },
    //         {
    //           name: 'Planta',
    //           label: 'Planta',
    //         },
    //         {
    //           name: 'Cantidad',
    //           label: 'Faltantes',
    //           options: {
    //             setCellProps: () => ({ 
    //               style: { 
    //                 textAlign: 'center', 
    //                 width: '20%', 
    //               }, 
    //             }),
    //           },
    //         },
    //         {
    //           name: 'Monto',
    //           label: 'Monto',
    //           options: {
    //             setCellProps: () => ({ 
    //               style: { 
    //                 textAlign: 'center', 
    //                 width: '15%', 
    //               }, 
    //             }),
    //           },
    //         },
    //       ],
    //       camposValidos: false,
    //     },
    //   },
    // },
    combos: {
      plantas: [
        {
          id: 0,
          nombre: 'PB',
        },
        {
          id: 1,
          nombre: 'PA',
        },
      ],
    },
    campos: {
      // almacen: {
      //   valor: '',
      //   campoValido: true,
      // },
      // molde: {
      //   valor: '',
      //   campoValido: true,
      // },
      estatus: {
        valor: '',
        campoValido: true,
      },
    },
    stepper: 0,
    usuarioLogeado: 0,
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
