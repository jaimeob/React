export default {
  configuracion: {
    datosMantenimiento: {
      datos:[],
      cabeceras: [
        {
          name: 'NombrePlaza',
          label: 'Plaza',
        },
        {
          name: 'Almacen',
          label: 'Almacén',
        },
        {
          name: 'IdMolde',
          label: 'ID',
        },
        {
          name: 'Molde',
          label: 'Molde',
        },
        {
          name: 'Version',
          label: 'Versión',
        },
        {
          name: 'Usos',
          label: 'Usos',
        },
        // {
        //   name: 'UltimoMantenimiento',
        //   label: 'Ultimo Mantenimiento',
        //   options: {
        //     setCellProps: () => ({ 
        //       style: { 
        //         textAlign: 'left', 
        //         width: '15%', 
        //       }, 
        //     }),
        //   },
        // },
        {
          name: 'Estatus',
          label: 'Estatus',
          options: {
            setCellProps: () => ({ 
              style: { 
                textAlign: 'left', 
                justifyContent:'left',
              }, 
            }),
          },
        },
      ],
      configuracion : {
        filtro : true,
        descarga : false,
        columnas : false,
        imprimir : false,
        seleccionable: 'single',
        paginado : false,
        ordenar:false,
      },
    },
    datosDetalle:[],
    rowSeleccionado: undefined,
    usuarioLogeado:0,
    habilitarExportar:false,
  },
  stepper: 0,
  cargando: false,
}
// molde: {
//     datos:[],
//     cabeceras: [
//       {
//         name: 'idMolde',
//         label: 'ID',
//       },
//       {
//         name: 'nombre',
//         label: 'Molde',
//       },
//       {
//         name: 'version',
//         label: 'Version',
//         options: {
//           setCellProps: () => ({ 
//             style: { 
//               textAlign: 'left', 
//               paddingRight: 16, 
//               width: '25%', 
//             }, 
//           }),
//         },
//       },
//       {
//         name: 'estatus',
//         label: 'Estatus',
//         options: {
//           setCellProps: () => ({
//             style: {
//               paddingRight: 1,
//               width: '15%',
//             },
//           }),
//           searchable: false,
//         },
//       },
//     ],
//     configuracion: {
//       filtro : false,
//       descarga : false,
//       columnas : false,
//       imprimir : false,
//       seleccionable: 'single',
//       paginado: false,
//       responsivo: "scroll",
//     },
//   },