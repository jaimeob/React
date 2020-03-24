// Valuacion de Inventario por almacen

/* eslint-disable no-nested-ternary */
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { PDFViewer, Page, Text, View, Document, Image, Font } from '@react-pdf/renderer';
import LogoImage from 'images/logo/fincamex-logo.png';
import RBlack from 'fonts/Roboto-Black.ttf'
import RLigth from 'fonts/Roboto-Light.ttf'
import RRegular from 'fonts/Roboto-Regular.ttf'
import RMedium from 'fonts/Roboto-Medium.ttf'
import RBold from 'fonts/Roboto-Bold.ttf'

Font.register({ family: 'Roboto', fonts: [
  { src: RRegular, fontWeight: 'normal'}, // font-style: normal, font-weight: normal
  { src: RLigth, fontWeight: 'light' },
  { src: RMedium, fontWeight: 'medium' },
  { src: RBold, fontWeight: 'bold' },
  { src: RBlack, fontWeight: 'heavy' },
]});

const styles = ({
  body: {
    paddingTop: 65,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontSize: 8,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
  },
  w7: {
    width: '7%',
  },
  w7: {
    width: '7%',
  },
  w8: {
    width: '8%',
  },
  w10: {
    width: '10%',
  },
  w12: {
    width: '12%',
  },
  w16: {
    width: '16%',
  },
  w20: {
    width: '20%',
  },
  w45: {
    width: '45%',
  },
  w50: {
    width: '50%',
  },
  w80: {
    width: '79.9%',
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
      fontWeight: 'heavy',
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

const almacen = {
  idAlmacen: 44,
  almacen: 'Tuxpan Valle Alto',
  plaza: 'Tuxpan',
}

const piezas = [
  {IdInsumo: '1', Insumo: 'Pieza 1', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '2', Insumo: 'Pieza 2', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '3', Insumo: 'Pieza 3', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '4', Insumo: 'Pieza 4', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '5', Insumo: 'Pieza 5', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '6', Insumo: 'Pieza 6', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '7', Insumo: 'Pieza 7', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '8', Insumo: 'Pieza 8', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Pieza 9', Plaza: 'Culiacan', Inventario: 'Almacén Culiacan', IdMolde: 1, Molde: 'Cataluña', Ubicacion: 'Obra', Usos: 100, Cantidad: 1, Costo: 5000, Importe: 5000},
]

const accesorios = [
  {IdInsumo: '1', Insumo: 'Accesorio 1', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 153, Costo: 5000, Importe: 5000},
  {IdInsumo: '2', Insumo: 'Accesorio 2', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 200, Costo: 5000, Importe: 5000},
  {IdInsumo: '3', Insumo: 'Accesorio 3', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 153, Costo: 5000, Importe: 5000},
  {IdInsumo: '4', Insumo: 'Accesorio 4', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 33, Costo: 5000, Importe: 5000},
  {IdInsumo: '5', Insumo: 'Accesorio 5', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 153, Costo: 5000, Importe: 5000},
  {IdInsumo: '6', Insumo: 'Accesorio 6', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 12, Costo: 5000, Importe: 5000},
  {IdInsumo: '7', Insumo: 'Accesorio 7', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 13, Costo: 5000, Importe: 5000},
  {IdInsumo: '8', Insumo: 'Accesorio 8', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 23, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Accesorio 9', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 100, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Accesorio 9', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 100, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Accesorio 9', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 100, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Accesorio 9', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 100, Costo: 5000, Importe: 5000},
  {IdInsumo: '9', Insumo: 'Accesorio 9', Plaza: 'Mazatlan', Inventario: 'Almacén Mazatlan', IdMolde: 2, Molde: 'Imperial', Ubicacion: 'Almacen', Usos: 100, Cantidad: 100, Costo: 5000, Importe: 5000},
]

let cantidadP = 0;
let costoP = 0;
let importeP = 0;

let cantidadA = 0;
let costoA = 0;
let importeA = 0;

piezas.map(pieza => {
  cantidadP += pieza.Cantidad;
  costoP += pieza.Costo;
  importeP += pieza.Importe;
})

accesorios.map(accesorio => {
  cantidadA += accesorio.Cantidad;
  costoA += accesorio.Costo;
  importeA += accesorio.Importe;
})

const MyDocument = () => (
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
            <Text style={[styles.header.subtitulo, styles.header.negritas]}>Valuación de Inventario por Almacén</Text>
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
                    <Text style={[styles.tableCell, styles.marginNone, styles.paddingLeft]}>2019-05-08</Text>
                  </View>
                </View>
                <View  style={[styles.tableRow, styles.textRight]}>
                  <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                    <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Hora:</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                    <Text style={[styles.tableCell, styles.marginNone, styles.paddingLeft]}>10:31:09</Text>
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
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Culiacan</Text>
                    </View>
                  </View>
                  <View style={[styles.tableRow, styles.textLeft]}>
                    <View style={[styles.tableCol, styles.w20, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Almacen:</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w80, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Almacen Culiacan</Text>
                    </View>
                  </View>
                  <View style={[styles.tableRow, styles.textLeft]}>
                    <View style={[styles.tableCol, styles.w20, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Molde:</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w80, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Cataluña</Text>
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
            <View style={[styles.tableCol, styles.w8, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Plaza</Text>
            </View>
            <View style={[styles.tableCol, styles.w8, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Inventario</Text>
            </View>
            <View style={[styles.tableCol, styles.w7, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>ID Molde</Text>
            </View>
            <View style={[styles.tableCol, styles.w12, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Molde</Text>
            </View>
            <View style={[styles.tableCol, styles.w7, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>ID</Text>
            </View>
            <View style={[styles.tableCol, styles.w16, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Insumo</Text>
            </View>
            <View style={[styles.tableCol, styles.w8, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Ubicacion</Text>
            </View>
            <View style={[styles.tableCol, styles.w7, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Usos</Text>
            </View>
            <View style={[styles.tableCol, styles.w7, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Cantidad</Text>
            </View>
            <View style={[styles.tableCol, styles.w10, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Costo</Text>
            </View>
            <View style={[styles.tableCol, styles.w10, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Importe</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.table]}>
        <View style={[styles.tableRow, styles.textLeft]}>
          <View style={[styles.tableCol, styles.w20, styles.borders]}>
            <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.marginNone, styles.paddingLeft]}>Tipo Insumos:</Text>
          </View>
          <View style={[styles.tableCol, styles.w80, styles.borders]}>
            <Text style={[styles.tableCell, styles.marginNone, styles.paddingLeft]}>Piezas</Text>
          </View>
        </View>
      </View>
      {/* TABLA */}
      {
        piezas.map((pieza, index) => {

          if(piezas.length - 1 === index){
            return(
              <View style={styles.borderTop}></View>
            )
          }
          return(
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.w8, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{pieza.Plaza}</Text>
                </View>
                <View style={[styles.tableCol, styles.w8, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{pieza.Inventario}</Text>
                </View>
                <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{pieza.IdMolde}</Text>
                </View>
                <View style={[styles.tableCol, styles.w12, styles.textLeft, styles.paddingLeft]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{pieza.Molde}</Text>
                </View>
                <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{pieza.IdInsumo}</Text>
                </View>
                <View style={[styles.tableCol, styles.w16, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{pieza.Insumo}</Text>
                </View>
                <View style={[styles.tableCol, styles.w8, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{pieza.Ubicacion}</Text>
                </View>
                <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{pieza.Usos}</Text>
                </View>
                <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{pieza.Cantidad}</Text>
                </View>
                <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${pieza.Costo}`}</Text>
                </View>
                <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${pieza.Importe}`}</Text>
                </View>
              </View>
            </View>
          )
        })
      }
      <View style={[styles.table, styles.borderleftN]}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.borderNone, styles.w8, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w8, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w7, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w12, styles.textLeft, styles.paddingLeft]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w7, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w16, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w8, styles.textCenter, styles.borderRight]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.w7, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone, styles.header.negritas]}>Suma:</Text>
          </View>
          <View style={[styles.tableCol, styles.w7, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone]}>{cantidadP}</Text>
          </View>
          <View style={[styles.tableCol, styles.w10, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${costoP}`}</Text>
          </View>
          <View style={[styles.tableCol, styles.w10, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${importeP}`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.marginT30}>
        <View style={[styles.table]}>
          <View style={[styles.tableRow, styles.textLeft]}>
            <View style={[styles.tableCol, styles.w20, styles.borders]}>
              <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.marginNone, styles.paddingLeft]}>Tipo Insumos:</Text>
            </View>
            <View style={[styles.tableCol, styles.w80, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone, styles.paddingLeft]}>Accesorios</Text>
            </View>
          </View>
        </View>
      </View>
      {
        accesorios.map((accesorio, index) => {
          if(accesorios.length - 1 === index){
            return(
              <View style={styles.borderTop}></View>
            )
          }
          return(
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.w8, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{accesorio.Plaza}</Text>
                </View>
                <View style={[styles.tableCol, styles.w8, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{accesorio.Inventario}</Text>
                </View>
                <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{accesorio.IdMolde}</Text>
                </View>
                <View style={[styles.tableCol, styles.w12, styles.textLeft, styles.paddingLeft]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{accesorio.Molde}</Text>
                </View>
                <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{accesorio.IdInsumo}</Text>
                </View>
                <View style={[styles.tableCol, styles.w16, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{accesorio.Insumo}</Text>
                </View>
                <View style={[styles.tableCol, styles.w8, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{accesorio.Ubicacion}</Text>
                </View>
                <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{accesorio.Usos}</Text>
                </View>
                <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{accesorio.Cantidad}</Text>
                </View>
                <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${accesorio.Costo}`}</Text>
                </View>
                <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${accesorio.Importe}`}</Text>
                </View>
              </View>
            </View>
          )
        })
      }

      <View style={[styles.table, styles.borderleftN]}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.borderNone, styles.w8, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w8, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w7, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w12, styles.textLeft, styles.paddingLeft]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w7, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w16, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w8, styles.textCenter, styles.borderRight]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.w7, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone, styles.header.negritas]}>Suma:</Text>
          </View>
          <View style={[styles.tableCol, styles.w7, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone]}>{cantidadA}</Text>
          </View>
          <View style={[styles.tableCol, styles.w10, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${costoA}`}</Text>
          </View>
          <View style={[styles.tableCol, styles.w10, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${importeA}`}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.table, styles.borderleftN]}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.borderNone, styles.w8, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w8, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w7, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w12, styles.textLeft, styles.paddingLeft]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w7, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w16, styles.textCenter]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.borderNone, styles.w8, styles.textCenter, styles.borderRight]}>
            <Text style={[styles.tableCell, styles.marginNone]}></Text>
          </View>
          <View style={[styles.tableCol, styles.w7, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone, styles.header.negritas]}>Total:</Text>
          </View>
          <View style={[styles.tableCol, styles.w7, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone]}>{cantidadA + cantidadP}</Text>
          </View>
          <View style={[styles.tableCol, styles.w10, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${costoA + costoP}`}</Text>
          </View>
          <View style={[styles.tableCol, styles.w10, styles.textCenter, styles.borderBottom]}>
            <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${importeA + importeP}`}</Text>
          </View>
        </View>
      </View>

    </Page>
  </Document>
);

// eslint-disable-next-line react/prefer-stateless-function
export class PDF extends React.Component {

  render() {
    return (
      <div>
        <PDFViewer style={styles.viewer}>
          <MyDocument />
        </PDFViewer>
      </div>
    );
  }
}

PDF.propTypes = {
};

export default compose(
  withStyles(styles),
)(PDF);
