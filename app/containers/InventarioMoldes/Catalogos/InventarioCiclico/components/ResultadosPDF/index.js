// Resultados de conteo ciclico

/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import LogoImage from 'images/logo/fincamex-logo.png';
import moment from 'moment';
// Font.register({ family: 'Roboto', fonts: [
//   { src: RRegular, fontWeight: 'normal'}, // font-style: normal, font-weight: normal
//   { src: RLigth, fontWeight: 'light' },
//   { src: RMedium, fontWeight: 'medium' },
//   { src: RBold, fontWeight: 'bold' },
//   { src: RBlack, fontWeight: 'heavy' },
// ]});

const styles = ({
  body: {
    paddingTop: 65,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontSize: 8,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
  },
  w5: {
    width: '5%',
  },
  w6: {
    width: '6%',
  },
  w7: {
    width: '7%',
  },
  w8: {
    width: '8%',
  },
  w9: {
    width: '9%',
  },
  w10: {
    width: '10%',
  },
  w12: {
    width: '12%',
  },
  w17: {
    width: '17%',
  },
  w20: {
    width: '20%',
  },
  w23: {
    width: '23%',
  },
  w45: {
    width: '45%',
  },
  w50: {
    width: '50%',
  },
  w80: {
    width: '80%',
  },
  w100: {
    width: '100%',
  },
  header: {
    tabla: {
      display: "table", 
      width: "auto",
    },
    logo: {
      maxWidth: '100%',
      margin: 15,
    },
    w80: {
      margin: "auto", 
      flexDirection: "row",
    },
    sec30: {
      width: '30%',
    },
    sec40: {
      width: '40%',
      textAlign: 'center',
    },
    titulo: {
      fontSize: 14,
      marginTop: 10,
    },
    subtitulo: {
      fontSize: 12,
    },
    regularTXT: {
      fontSize: 8,
    },
    negritas: {
      fontFamily: 'Roboto',
      fontWeight: 'medium',
    },
  },
  borders: {borderStyle: "solid", borderBottomWidth: .5, borderTopWidth: .5},
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: .5, borderRightWidth: 0, borderBottomWidth: 0, borderTopWidth: 0 }, 
  tableRow: { margin: "auto", flexDirection: "row" }, 
  tableCol: { width: "25%", borderStyle: "solid", borderWidth: .5, borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0 }, 
  tableCell: { margin: "auto", marginTop: 5, marginBottom: 5},
  viewer: {width: '100%', height: 'calc(100vh - 64px)'},
  borderleft: {borderStyle: "solid", borderLeftWidth: .5},
  borderRight: {borderStyle: "solid", borderRightWidth: .5},
  borderTop: {borderStyle: "solid", borderTopWidth: .5},
  borderBottom: {borderStyle: "solid", borderBottomWidth: .5},
  borderNone: {borderWidth: 'none !important'},
  borderleftN: {borderLeftColor: 'white'},
  borderrightN: {borderRightColor: 'white'},
  textLeft: {textAlign: 'left'},
  textCenter: {textAlign: 'center'},
  textRight: {textAlign: 'right'},
  marginB: {marginBottom: 15},
  marginT: {marginTop: 10},
  marginT50: {marginTop: 100},
  marginNone: {margin: '0'},
  colorRojo: {color: 'red'},
  colorVerde: {color: 'green'},
  paddingLeft: {paddingLeft: 10},
  line: {
    height: 1,
    margin: '10px 50px',
    backgroundColor: 'black',
  },
  text10:{
    fontSize: 10,
    fontFamily: 'Roboto',
    fontWeight: 'medium',
  },
})

// const registros = [
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
//   {Id: 1, Planta: 'Nivel-1', Seccion: 'Seccion 1', IdInsumo: '1', Insumo: 'Insumo 1', Tipo: 'Pieza', Unidad: 1, Cantidad: 1, Diferencia: 123, Importe: 12334.234, TipoDiferencia : 'OK'},
// ]

const Commas = (x) => {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const ResultadosPDF = (props) => {
  const {
    piezas,
    accesorios,
  } = props;

  const NombrePlaza = piezas.length>0 ? piezas[0].NombrePlaza : '';
  const Inventario = piezas.length>0 ? piezas[0].NombreAlmacen : '';
  const Molde = piezas.length>0 ? piezas[0].NombreMolde : '';
  const Fecha = moment(Date.now()).format("DD/MM/YYYY");
  const Hora =  moment(Date.now()).format("hh:mm:ss");
 
  const registros = []
  // {id: 1, planta: 'Nivel-1', seccion: 'Seccion 1', idInsumo: '1', insumo: 'Insumo 1', tipo: 'Pieza', unidad: 1, cantidad: 1},
  // if (!isUndefined(piezas)){
  piezas.forEach((pieza) => {
    registros.push({Id: 1, Planta: pieza.NombrePlanta, Seccion: pieza.Seccion, IdInsumo: pieza.IdInsumo, Insumo: pieza.Nombre, Identificador: pieza.Identificador, Tipo: 'PZA', Cantidad: pieza.Seleccionado && pieza.IdEstatus !== 'NOINV' && pieza.IdEstatus !== 'REFINC' ?pieza.Cantidad:0, Diferencia: pieza.Seleccionado && pieza.IdEstatus !== 'NOINV' && pieza.IdEstatus !== 'REFINC'?0:1, Importe: pieza.Seleccionado && pieza.IdEstatus !== 'NOINV' && pieza.IdEstatus !== 'REFINC'?0:pieza.Costo})
  })
  // }
  // if (!isUndefined(accesorios)){
  accesorios.forEach((accesorio) => {
    registros.push({Id: 1, Planta: accesorio.NombrePlanta, Seccion: accesorio.Seccion, IdInsumo: accesorio.IdInsumo, Insumo: accesorio.Nombre,Identificador: accesorio.Identificador,Tipo: 'ACC', Cantidad: accesorio.Seleccionado?accesorio.Cantidad:0,Diferencia: accesorio.Seleccionado?accesorio.Cantidad-accesorio.Monto:accesorio.Cantidad, Importe: accesorio.Seleccionado?accesorio.Monto*accesorio.Costo:accesorio.Cantidad*accesorio.Costo})
  })

  return(
    <Document>
      <Page wrap style={styles.body}>
        <View fixed style={[styles.header, styles.marginB]}>
          <View style={styles.header.w80}>

            {/* LOGO */}
            <View style={styles.header.sec30}>
              <Image src={LogoImage} style={styles.header.logo}></Image>
            </View>

            {/* TITULO */}
            <View style={styles.header.sec40}>
              <Text style={[styles.header.titulo, styles.header.negritas]}>FINCASIN, S.A DE C.V.</Text>
              <Text style={[styles.header.subtitulo, styles.header.negritas]}>REPORTE DE RESULTADOS DE INVENTARIO CICLICO</Text>
            </View>

            {/* FECHA Y HORA */}
            <View style={styles.header.sec30}>
              <View style={styles.marginT}>
                <View style={[styles.table, styles.borderNone]}>
                  <View style={[styles.tableRow, styles.textRight]}>
                    <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Fecha:</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.marginNone, styles.paddingLeft]}>{Fecha}</Text>
                    </View>
                  </View>
                  <View  style={[styles.tableRow, styles.textRight]}>
                    <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Hora:</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.marginNone, styles.paddingLeft]}>{Hora}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View>
          {/* ALMACEN - MOLDE - CABECERA DE LA TABLA */}
          <View style={[styles.marginB]}>
            <View style={[styles.table]}>
              <View style={[styles.tableRow, styles.textLeft]}>
                <View style={[styles.tableCol, styles.w45, styles.borders]}>
                  <View style={[styles.table, styles.borderNone]}>
                    <View style={[styles.tableRow, styles.textCenter]}>
                      <View style={[styles.tableCol, styles.w100, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>DATOS GENERALES</Text>
                      </View>
                    </View>
                    <View style={[styles.tableRow, styles.textLeft]}>
                      <View style={[styles.tableCol, styles.w20, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Plaza:</Text>
                      </View>
                      <View style={[styles.tableCol, styles.w80, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>{NombrePlaza}</Text>
                      </View>
                    </View>
                    <View style={[styles.tableRow, styles.textLeft]}>
                      <View style={[styles.tableCol, styles.w20, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Almacen:</Text>
                      </View>
                      <View style={[styles.tableCol, styles.w80, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>{Inventario}</Text>
                      </View>
                    </View>
                    <View style={[styles.tableRow, styles.textLeft]}>
                      <View style={[styles.tableCol, styles.w20, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Molde:</Text>
                      </View>
                      <View style={[styles.tableCol, styles.w80, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>{Molde}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={[styles.tableCol, styles.w10, styles.borderrightN]}></View>
                <View style={[styles.tableCol, styles.w45, styles.borderNone, styles.borderleftN]}></View>
              </View>
            </View>
          </View>
        </View>

        <View fixed style={styles.header}>

          {/* header */}
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.header.negritas, styles.textCenter]}>
              <View style={[styles.tableCol, styles.w5, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>No.</Text>
              </View>
              <View style={[styles.tableCol, styles.w10, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Planta</Text>
              </View>
              <View style={[styles.tableCol, styles.w10, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Sección</Text>
              </View>
              <View style={[styles.tableCol, styles.w6, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>ID</Text>
              </View>
              <View style={[styles.tableCol, styles.w23, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Insumo</Text>
              </View>
              <View style={[styles.tableCol, styles.w9, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Identificador</Text>
              </View>
              <View style={[styles.tableCol, styles.w6, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Tipo</Text>
              </View>
              <View style={[styles.tableCol, styles.w7, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Cantidad</Text>
              </View>
              <View style={[styles.tableCol, styles.w7, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Diferencia</Text>
              </View>
              <View style={[styles.tableCol, styles.w17, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Importe diferencia</Text>
              </View>
              {/* <View style={[styles.tableCol, styles.w7, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Tipo Dif.</Text>
              </View> */}
            </View>
          </View>
        </View>
      
        {/* TABLA */}
        {
          registros.map((registro, index) => {

            if(registros.length - 1 === index){
              return(
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.w5, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{index + 1}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Planta}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Seccion}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w6, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.IdInsumo}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w23, styles.textLeft, styles.paddingLeft]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Insumo}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w9, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Identificador}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w6, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Tipo}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Cantidad}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Diferencia}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w17, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone,registro.Diferencia>0?styles.colorRojo: styles.colorVerde]}>{registro.Diferencia>0?'-$':'$'} {Commas(registro.Importe.toFixed(4))}</Text>
                    </View>
                    {/* <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.TipoDiferencia}</Text>
                    </View> */}
                  </View>
                  <View style={styles.borderTop}></View>
                </View>
              )
            }

            return(
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, styles.w5, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{index + 1}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Planta}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Seccion}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w6, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.IdInsumo}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w23, styles.textLeft, styles.paddingLeft]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Insumo}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w9, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Identificador}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w6, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Tipo}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Cantidad}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Diferencia}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w17, styles.textCenter]}>
                    <Text style={[styles.tableCell,styles.marginNone, registro.Diferencia>0?styles.colorRojo: styles.colorVerde]}>{registro.Diferencia>0?'-$':'$'} {Commas(registro.Importe.toFixed(4))}</Text>
                  </View>
                  {/* <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.TipoDiferencia}</Text>
                  </View> */}
                </View>
              </View>
            )
          })
        }
        <View>
          <View style={styles.marginT50}>
            <View style={[styles.table, styles.borderNone]}>
              <View style={[styles.tableRow, styles.textCenter]}>
                <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                  <View style={styles.line}></View>
                  <View><Text style={styles.text10}>Auxiliar de Almacén</Text></View>                  
                </View>
                <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                  <View style={styles.line}></View>
                  <View><Text style={styles.text10}>Jefe de Almacén Plaza</Text></View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
};

// eslint-disable-next-line react/prefer-stateless-function
// export class PDFResultados extends React.Component {
  
//   render() {
//     const {
//       piezas,
//       accesorios,
//     } = this.props;
//     return (
//       <div>

//         <PDFViewer style={styles.viewer}>
//           <ResultadosPDF 
//             piezas={piezas}
//             accesorios={accesorios}
//           />
//         </PDFViewer>

//       </div>
//     );
//   }
// }

ResultadosPDF.propTypes = {
  piezas: T.array,
  accesorios: T.array,
};

// PDFResultados.propTypes = {
//   piezas: T.array,
//   accesorios: T.array,
// };
// export default compose(
//   withStyles(styles),
// )(PDFResultados);
