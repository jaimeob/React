import {
  Typography,
} from '@material-ui/core';
import React from 'react';

const Commas = (x) => {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export default {
  configuracion: {
    combos: {
      tiposReportes:[],
      // tiposMovimientos:[],
      tiposMovimientos:[],
      plazas:[],
      almacenes:[],
      moldes:[],
      años:[],
      periodos:[],
      datosOrigen:[],
      origenes:[],
      destinos:[],
      codigosInicio:[],
      codigosFinal:[],
      comboVacio:[
        {
          Id:-1,
          Nombre:"No hay información",
        },
      ],
    },
    campos: {
      tipoReporte: {
        valor: '',
        campoValido: true,
      },
      tipoMovimiento: {
        valor: '',
        campoValido: true,
      },
      plaza: {
        valor: '',
      },
      almacen: {
        valor: '',
      },
      molde: {
        valor: '',
        mostrar: false,
      },
      año: {
        valor: '',
        mostrar: false,
      },
      periodo: {
        valor: '',
        mostrar: false,
      },
      fechaInicio: {
        valor: '',
        mostrar: false,
      },
      fechaFinal: {
        valor: '',
        mostrar: false,
      },
      origen: {
        valor: '',
        mostrar: false,
      },
      destino: {
        valor: '',
        mostrar: false,
      },
      codigoInicio: {
        valor: '',
        mostrar: false,
      },
      codigoFinal: {
        valor: '',
        mostrar: false,
      },
    },
    datosReporte:[],
    headersReporteExistencia: [
      {
        name: 'NombrePlaza',
        label: 'Plaza',
      },
      {
        name: 'Inventario',
        label: 'Inventario',
      },
      {
        name: 'IdMolde',
        label: 'IdMolde',
      },
      {
        name: 'Molde',
        label: 'Molde',
      },
      {
        name: 'IdInsumo',
        label: 'IdInsumo',
      },
      {
        name: 'Insumo',
        label: 'Insumo',
      },
      {
        name: 'Identificador',
        label: 'Identificador',
      },         
      {
        name: 'Cantidad',
        label: 'Cantidad',
      },
      {
        name: 'Ubicacion',
        label: 'Ubicación',
      },
      {
        name: 'Usos',
        label: 'Usos',
      },
      // {
      //   name: 'Identificador',
      //   label: 'Identificador',
      //   options: {
      //     setCellProps: () => ({ 
      //       style: { 
      //         width: '15%', 
      //       }, 
      //     }),
      //   },
      // },
      // {
      //   name: 'Evidencia',
      //   label: 'Evidencia',
      //   options: {
      //     setCellProps: () => ({ 
      //       style: { 
      //         justifyContent:'left',
      //         width: '26%', 
      //       }, 
      //     }),
      //   },
      // },
      // {
      //   name: 'Estatus',
      //   label: 'Estatus',
      //   options: {
      //     setCellProps: () => ({ 
      //       style: { 
      //         textAlign: 'center', 
      //         width: '10%', 
      //       }, 
      //     }),
      //   },
      // },
    ],
    headersReporteValuacion: [
      {
        name: 'NombrePlaza',
        label: 'Plaza',
      },
      {
        name: 'Inventario',
        label: 'Inventario',
      },
      {
        name: 'IdMolde',
        label: 'IdMolde',
      },
      {
        name: 'Molde',
        label: 'Molde',
      },
      {
        name: 'IdInsumo',
        label: 'IdInsumo',
      },
      {
        name: 'Insumo',
        label: 'Insumo',
      },
      {
        name: 'Identificador',
        label: 'Identificador',
      },         
      {
        name: 'Ubicacion',
        label: 'Ubicación',
      },
      {
        name: 'Usos',
        label: 'Usos',
      },
      {
        name: 'Cantidad',
        label: 'Cantidad',
      },
      {
        name: 'Costo',
        label: 'Costo',
      },
      {
        name: 'Importe',
        label: 'Importe',
      },
    ],
    headersReporteKardex: [
      {
        name: 'Folio',
        label: 'Folio',
      },
      {
        name: 'Plaza',
        label: 'Plaza',
      },
      {
        name: 'Inventario',
        label: 'Inventario',
      },
      {
        name: 'TipoMovimiento',
        label: 'Tipo de movimiento',
      },
      {
        name: 'IdInsumo',
        label: 'ID Insumo',
      },
      {
        name: 'Insumo',
        label: 'Insumo',
      },
      {
        name: 'Identificador',
        label: 'Identificador',
      },         
      {
        name: 'Cantidad',
        label: 'Cantidad',
      },
      {
        name: 'Origen',
        label: 'Origen',
      },
      {
        name: 'Destino',
        label: 'Destino',
      },
      {
        name: 'Fecha',
        label: 'Fecha',
      },
    ],
    parametros: {
      fechaInicio: null,
      fechaFin: null,
      fechaInput: null,
    },
    configuracion : {
      filtro : true,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: 'none',
      paginado: false,
    },
    datosConfiabilidad:{
      cabeceras:{
        headerFamiliaImporte: [
          {
            name: 'Familia',
            label: 'Molde',
          },
          {
            name: 'ImporteFamilia',
            label: 'Importe Familia',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  // color: value > 0 ? 'red':'green', 
                  style={{fontSize:'0.71rem'}}
                >
                  {value>0?'$':'-$'}{Commas(Math.abs(value).toFixed(4))}
                  
                </Typography>
              ),
            },
          },
          {
            name: "ImporteDiferencia",
            label: 'Importe Diferencia',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  style={{color: value > 0 ? 'green':'red', fontSize:'0.71rem'}}
                >
                  {value>0?'$':'-$'}{Commas(Math.abs(value).toFixed(4))}
                </Typography>
              ),
              setCellProps: () => ({ 
                style: { 
                  textAlign: 'left', 
                }, 
              }),
            },
          },
          // {
          //   name: 'ImporteDiferencia',
          //   label: 'Importe Diferencia',

          // },
        ],
        headerFamiliaItems: [
          {
            name: 'Familia',
            label: 'Molde',
          },
          {
            name: 'ItemsFamilia',
            label: 'Items Familia',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  // color: value > 0 ? 'red':'green', 
                  style={{fontSize:'0.71rem'}}
                >
                  {Commas(value)}
                </Typography>
              ),
            },
          },
          {
            name: 'ItemsDiferencia',
            label: 'Items con diferencia',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  // color: value > 0 ? 'red':'green', 
                  style={{fontSize:'0.71rem'}}
                >
                  {Commas(value)}
                </Typography>
              ),
            },
          },
          {
            name: 'Confiablidad',
            label: 'Confiabilidad',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  // eslint-disable-next-line no-nested-ternary
                  style={{color: value >= 95 ? 'green':value>=90?'orange': 'red', fontSize:'0.71rem'}}
                >
                  {`${value.toFixed(2)}%`}
                </Typography>
              ),
              setCellProps: () => ({ 
                style: { 
                  textAlign: 'left', 
                }, 
              }),
            },
          },
        ],
        headerCostoInventario: [
          {
            name: 'CostoInventario',
            label: 'Costo de inventario',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  // color: value > 0 ? 'red':'green', 
                  style={{fontSize:'0.71rem'}}
                >
                  {value>0?'$':'-$'}{Commas(Math.abs(value).toFixed(4))}
                </Typography>
              ),
            },
          },
          {
            name: 'DiferenciaTotal',
            label: 'Diferencia total de inv.',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  style={{color: value > 0 ? 'green':'red', fontSize:'0.71rem'}}
                >
                  {value>0?'$':'-$'}{Commas(Math.abs(value).toFixed(4))}
                </Typography>
              ),
              setCellProps: () => ({ 
                style: { 
                  textAlign: 'left', 
                }, 
              }),
            },
          },
        ],
        headerTotalConteo: [
          {
            name: 'TotalContados',
            label: 'Total de items contados',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  // color: value > 0 ? 'red':'green', 
                  style={{fontSize:'0.71rem'}}
                >
                  {Commas(value)}
                </Typography>
              ),
            },
          },
          {
            name: 'TotalConDiferencia',
            label: 'Total de items con diferencia',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  // color: value > 0 ? 'red':'green', 
                  style={{fontSize:'0.71rem'}}
                >
                  {Commas(value)}
                </Typography>
              ),
            },
          },
          {
            name: 'ConfiabilidadInventario',
            label: 'Confiabilidad de inventario',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  // eslint-disable-next-line no-nested-ternary
                  style={{color: value >= 95 ? 'green':value>=90?'orange': 'red', fontSize:'0.71rem'}}
                >
                  {`${value.toFixed(2)}%`}
                </Typography>
              ),
              setCellProps: () => ({ 
                style: { 
                  textAlign: 'left', 
                }, 
              }),
            },
          },
        ],
        headerTotalConteosRealizados: [
          {
            name: 'TotalConteos',
            label: 'Total de conteos realizados',
          },
          {
            name: 'DiasConteo',
            label: 'Días habiles de conteo',
          },
          {
            name: 'EficienciaConteo',
            label: 'Eficiencia de conteo',
            options: {
              filter: false,
              customBodyRender: (value, tableMeta, updateValue) => (
                // eslint-disable-next-line react/react-in-jsx-scope
                <Typography
                  // variant="body2"
                  // eslint-disable-next-line no-nested-ternary
                  style={{color: value >= 95 ? 'green':value>=90?'orange': 'red', fontSize:'0.71rem'}}
                >
                  {`${value.toFixed(2)}%`}
                </Typography>
              ),
              setCellProps: () => ({ 
                style: { 
                  textAlign: 'left', 
                }, 
              }),
            },
          },
        ],
      },
      datos:{
        datosFamiliaImporte:[],
        datosFamiliaItems:[],
        datosCostoInventario:[],
        datosTotalConteo:[],
        datosConteosRealizados:[],
        datosEncabezado:[],
      },
    },    
  },
  usuarioLogeado:0,
  stepper: 0,
  cargando: false,
  habilitarConsulta: false,
  mostrarConfiabilidad: false,
}