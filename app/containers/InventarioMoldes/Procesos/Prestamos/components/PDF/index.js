/* eslint-disable no-nested-ternary */
import React from 'react';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { PDFViewer, Page, Text, View, Document, Image } from '@react-pdf/renderer';
import LogoImage from 'images/logo/fincamex-logo.png';


const styles = ({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  w10: {
    width: '10%',
  },
  w12: {
    width: '12%',
  },
  w15: {
    width: '15%',
  },
  w22: {
    width: '22%',
  },
  w31: {
    width: '31%',
  },
  m40: {
    height: 50,
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
    w100: {
      margin: "auto", 
      flexDirection: "row",
      backgroundColor: 'blue',
    },
    sec30: {
      width: '30%',
      backgroundColor: 'red',
    },
    sec40: {
      width: '40%',
      backgroundColor: 'yellow',
    },
  },
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 }, 
  tableRow: { margin: "auto", flexDirection: "row" }, 
  tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 }, 
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
  viewer: {width: '100%', height: 'calc(100vh - 64px)'},
})

const registros = [
  {id: 1, familia: 'Aceros', codigo: 1010735, descripcion: 'descripcion 1', unidad: 'PZA', cantidad: 1},
  {id: 2, familia: 'Aceros', codigo: 1010736, descripcion: 'descripcion 2', unidad: 'PZA', cantidad: 1},
  {id: 3, familia: 'Metales', codigo: 1010737, descripcion: 'descripcion 3', unidad: 'ACC', cantidad: 123},
  {id: 4, familia: 'Aceros', codigo: 1010738, descripcion: 'descripcion 4', unidad: 'PZA', cantidad: 1},
  {id: 5, familia: 'Madera', codigo: 1010739, descripcion: 'descripcion 5', unidad: 'ACC', cantidad: 434},
  {id: 6, familia: 'Madera', codigo: 1010740, descripcion: 'descripcion 6', unidad: 'ACC', cantidad: 654},
  {id: 7, familia: 'Aceros', codigo: 1010741, descripcion: 'descripcion 7', unidad: 'PZA', cantidad: 1},
  {id: 8, familia: 'Plasticos', codigo: 1010742, descripcion: 'descripcion 8', unidad: 'ACC', cantidad: 23},
  {id: 9, familia: 'Aceros', codigo: 1010743, descripcion: 'descripcion 9', unidad: 'PZA', cantidad: 1},
  {id: 10, familia: 'Plasticos', codigo: 1010744, descripcion: 'descripcion 10', unidad: 'ACC', cantidad: 453},{id: 1, familia: 'Aceros', codigo: 1010735, descripcion: 'descripcion 1', unidad: 'PZA', cantidad: 1},
  {id: 2, familia: 'Aceros', codigo: 1010736, descripcion: 'descripcion 2', unidad: 'PZA', cantidad: 1},
  {id: 3, familia: 'Metales', codigo: 1010737, descripcion: 'descripcion 3', unidad: 'ACC', cantidad: 123},
  {id: 4, familia: 'Aceros', codigo: 1010738, descripcion: 'descripcion 4', unidad: 'PZA', cantidad: 1},
  {id: 5, familia: 'Madera', codigo: 1010739, descripcion: 'descripcion 5', unidad: 'ACC', cantidad: 434},
  {id: 6, familia: 'Madera', codigo: 1010740, descripcion: 'descripcion 6', unidad: 'ACC', cantidad: 654},
  {id: 7, familia: 'Aceros', codigo: 1010741, descripcion: 'descripcion 7', unidad: 'PZA', cantidad: 1},
  {id: 8, familia: 'Plasticos', codigo: 1010742, descripcion: 'descripcion 8', unidad: 'ACC', cantidad: 23},
  {id: 9, familia: 'Aceros', codigo: 1010743, descripcion: 'descripcion 9', unidad: 'PZA', cantidad: 1},
  {id: 10, familia: 'Plasticos', codigo: 1010744, descripcion: 'descripcion 10', unidad: 'ACC', cantidad: 453},{id: 1, familia: 'Aceros', codigo: 1010735, descripcion: 'descripcion 1', unidad: 'PZA', cantidad: 1},
  {id: 2, familia: 'Aceros', codigo: 1010736, descripcion: 'descripcion 2', unidad: 'PZA', cantidad: 1},
  {id: 3, familia: 'Metales', codigo: 1010737, descripcion: 'descripcion 3', unidad: 'ACC', cantidad: 123},
  {id: 4, familia: 'Aceros', codigo: 1010738, descripcion: 'descripcion 4', unidad: 'PZA', cantidad: 1},
  {id: 5, familia: 'Madera', codigo: 1010739, descripcion: 'descripcion 5', unidad: 'ACC', cantidad: 434},
  {id: 6, familia: 'Madera', codigo: 1010740, descripcion: 'descripcion 6', unidad: 'ACC', cantidad: 654},
  {id: 7, familia: 'Aceros', codigo: 1010741, descripcion: 'descripcion 7', unidad: 'PZA', cantidad: 1},
  {id: 8, familia: 'Plasticos', codigo: 1010742, descripcion: 'descripcion 8', unidad: 'ACC', cantidad: 23},
  {id: 9, familia: 'Aceros', codigo: 1010743, descripcion: 'descripcion 9', unidad: 'PZA', cantidad: 1},
  {id: 10, familia: 'Plasticos', codigo: 1010744, descripcion: 'descripcion 10', unidad: 'ACC', cantidad: 453},{id: 1, familia: 'Aceros', codigo: 1010735, descripcion: 'descripcion 1', unidad: 'PZA', cantidad: 1},
  {id: 2, familia: 'Aceros', codigo: 1010736, descripcion: 'descripcion 2', unidad: 'PZA', cantidad: 1},
  {id: 3, familia: 'Metales', codigo: 1010737, descripcion: 'descripcion 3', unidad: 'ACC', cantidad: 123},
  {id: 4, familia: 'Aceros', codigo: 1010738, descripcion: 'descripcion 4', unidad: 'PZA', cantidad: 1},
  {id: 5, familia: 'Madera', codigo: 1010739, descripcion: 'descripcion 5', unidad: 'ACC', cantidad: 434},
  {id: 6, familia: 'Madera', codigo: 1010740, descripcion: 'descripcion 6', unidad: 'ACC', cantidad: 654},
  {id: 7, familia: 'Aceros', codigo: 1010741, descripcion: 'descripcion 7', unidad: 'PZA', cantidad: 1},
  {id: 8, familia: 'Plasticos', codigo: 1010742, descripcion: 'descripcion 8', unidad: 'ACC', cantidad: 23},
  {id: 9, familia: 'Aceros', codigo: 1010743, descripcion: 'descripcion 9', unidad: 'PZA', cantidad: 1},
  {id: 10, familia: 'Plasticos', codigo: 1010744, descripcion: 'descripcion 10', unidad: 'ACC', cantidad: 453},{id: 1, familia: 'Aceros', codigo: 1010735, descripcion: 'descripcion 1', unidad: 'PZA', cantidad: 1},
  {id: 2, familia: 'Aceros', codigo: 1010736, descripcion: 'descripcion 2', unidad: 'PZA', cantidad: 1},
  {id: 3, familia: 'Metales', codigo: 1010737, descripcion: 'descripcion 3', unidad: 'ACC', cantidad: 123},
  {id: 4, familia: 'Aceros', codigo: 1010738, descripcion: 'descripcion 4', unidad: 'PZA', cantidad: 1},
  {id: 5, familia: 'Madera', codigo: 1010739, descripcion: 'descripcion 5', unidad: 'ACC', cantidad: 434},
  {id: 6, familia: 'Madera', codigo: 1010740, descripcion: 'descripcion 6', unidad: 'ACC', cantidad: 654},
  {id: 7, familia: 'Aceros', codigo: 1010741, descripcion: 'descripcion 7', unidad: 'PZA', cantidad: 1},
  {id: 8, familia: 'Plasticos', codigo: 1010742, descripcion: 'descripcion 8', unidad: 'ACC', cantidad: 23},
  {id: 9, familia: 'Aceros', codigo: 1010743, descripcion: 'descripcion 9', unidad: 'PZA', cantidad: 1},
  {id: 10, familia: 'Plasticos', codigo: 1010744, descripcion: 'descripcion 10', unidad: 'ACC', cantidad: 453},{id: 1, familia: 'Aceros', codigo: 1010735, descripcion: 'descripcion 1', unidad: 'PZA', cantidad: 1},
  {id: 2, familia: 'Aceros', codigo: 1010736, descripcion: 'descripcion 2', unidad: 'PZA', cantidad: 1},
  {id: 3, familia: 'Metales', codigo: 1010737, descripcion: 'descripcion 3', unidad: 'ACC', cantidad: 123},
  {id: 4, familia: 'Aceros', codigo: 1010738, descripcion: 'descripcion 4', unidad: 'PZA', cantidad: 1},
  {id: 5, familia: 'Madera', codigo: 1010739, descripcion: 'descripcion 5', unidad: 'ACC', cantidad: 434},
  {id: 6, familia: 'Madera', codigo: 1010740, descripcion: 'descripcion 6', unidad: 'ACC', cantidad: 654},
  {id: 7, familia: 'Aceros', codigo: 1010741, descripcion: 'descripcion 7', unidad: 'PZA', cantidad: 1},
  {id: 8, familia: 'Plasticos', codigo: 1010742, descripcion: 'descripcion 8', unidad: 'ACC', cantidad: 23},
  {id: 9, familia: 'Aceros', codigo: 1010743, descripcion: 'descripcion 9', unidad: 'PZA', cantidad: 1},
  {id: 10, familia: 'Plasticos', codigo: 1010744, descripcion: 'descripcion 10', unidad: 'ACC', cantidad: 453},{id: 1, familia: 'Aceros', codigo: 1010735, descripcion: 'descripcion 1', unidad: 'PZA', cantidad: 1},
  {id: 2, familia: 'Aceros', codigo: 1010736, descripcion: 'descripcion 2', unidad: 'PZA', cantidad: 1},
  {id: 3, familia: 'Metales', codigo: 1010737, descripcion: 'descripcion 3', unidad: 'ACC', cantidad: 123},
  {id: 4, familia: 'Aceros', codigo: 1010738, descripcion: 'descripcion 4', unidad: 'PZA', cantidad: 1},
  {id: 5, familia: 'Madera', codigo: 1010739, descripcion: 'descripcion 5', unidad: 'ACC', cantidad: 434},
  {id: 6, familia: 'Madera', codigo: 1010740, descripcion: 'descripcion 6', unidad: 'ACC', cantidad: 654},
  {id: 7, familia: 'Aceros', codigo: 1010741, descripcion: 'descripcion 7', unidad: 'PZA', cantidad: 1},
  {id: 8, familia: 'Plasticos', codigo: 1010742, descripcion: 'descripcion 8', unidad: 'ACC', cantidad: 23},
  {id: 9, familia: 'Aceros', codigo: 1010743, descripcion: 'descripcion 9', unidad: 'PZA', cantidad: 1},
  {id: 10, familia: 'Plasticos', codigo: 1010744, descripcion: 'descripcion 10', unidad: 'ACC', cantidad: 453},{id: 1, familia: 'Aceros', codigo: 1010735, descripcion: 'descripcion 1', unidad: 'PZA', cantidad: 1},
  {id: 2, familia: 'Aceros', codigo: 1010736, descripcion: 'descripcion 2', unidad: 'PZA', cantidad: 1},
  {id: 3, familia: 'Metales', codigo: 1010737, descripcion: 'descripcion 3', unidad: 'ACC', cantidad: 123},
  {id: 4, familia: 'Aceros', codigo: 1010738, descripcion: 'descripcion 4', unidad: 'PZA', cantidad: 1},
  {id: 5, familia: 'Madera', codigo: 1010739, descripcion: 'descripcion 5', unidad: 'ACC', cantidad: 434},
  {id: 6, familia: 'Madera', codigo: 1010740, descripcion: 'descripcion 6', unidad: 'ACC', cantidad: 654},
  {id: 7, familia: 'Aceros', codigo: 1010741, descripcion: 'descripcion 7', unidad: 'PZA', cantidad: 1},
  {id: 8, familia: 'Plasticos', codigo: 1010742, descripcion: 'descripcion 8', unidad: 'ACC', cantidad: 23},
  {id: 9, familia: 'Aceros', codigo: 1010743, descripcion: 'descripcion 9', unidad: 'PZA', cantidad: 1},
  {id: 10, familia: 'Plasticos', codigo: 1010744, descripcion: 'descripcion 10', unidad: 'ACC', cantidad: 453},{id: 1, familia: 'Aceros', codigo: 1010735, descripcion: 'descripcion 1', unidad: 'PZA', cantidad: 1},
  {id: 2, familia: 'Aceros', codigo: 1010736, descripcion: 'descripcion 2', unidad: 'PZA', cantidad: 1},
  {id: 3, familia: 'Metales', codigo: 1010737, descripcion: 'descripcion 3', unidad: 'ACC', cantidad: 123},
  {id: 4, familia: 'Aceros', codigo: 1010738, descripcion: 'descripcion 4', unidad: 'PZA', cantidad: 1},
  {id: 5, familia: 'Madera', codigo: 1010739, descripcion: 'descripcion 5', unidad: 'ACC', cantidad: 434},
  {id: 6, familia: 'Madera', codigo: 1010740, descripcion: 'descripcion 6', unidad: 'ACC', cantidad: 654},
  {id: 7, familia: 'Aceros', codigo: 1010741, descripcion: 'descripcion 7', unidad: 'PZA', cantidad: 1},
  {id: 8, familia: 'Plasticos', codigo: 1010742, descripcion: 'descripcion 8', unidad: 'ACC', cantidad: 23},
  {id: 9, familia: 'Aceros', codigo: 1010743, descripcion: 'descripcion 9', unidad: 'PZA', cantidad: 1},
  {id: 10, familia: 'Plasticos', codigo: 1010744, descripcion: 'descripcion 10', unidad: 'ACC', cantidad: 453},{id: 1, familia: 'Aceros', codigo: 1010735, descripcion: 'descripcion 1', unidad: 'PZA', cantidad: 1},
  {id: 2, familia: 'Aceros', codigo: 1010736, descripcion: 'descripcion 2', unidad: 'PZA', cantidad: 1},
  {id: 3, familia: 'Metales', codigo: 1010737, descripcion: 'descripcion 3', unidad: 'ACC', cantidad: 123},
  {id: 4, familia: 'Aceros', codigo: 1010738, descripcion: 'descripcion 4', unidad: 'PZA', cantidad: 1},
  {id: 5, familia: 'Madera', codigo: 1010739, descripcion: 'descripcion 5', unidad: 'ACC', cantidad: 434},
  {id: 6, familia: 'Madera', codigo: 1010740, descripcion: 'descripcion 6', unidad: 'ACC', cantidad: 654},
  {id: 7, familia: 'Aceros', codigo: 1010741, descripcion: 'descripcion 7', unidad: 'PZA', cantidad: 1},
  {id: 8, familia: 'Plasticos', codigo: 1010742, descripcion: 'descripcion 8', unidad: 'ACC', cantidad: 23},
  {id: 9, familia: 'Aceros', codigo: 1010743, descripcion: 'descripcion 9', unidad: 'PZA', cantidad: 1},
  {id: 123213123, familia: 'Plasticos', codigo: 1010744, descripcion: 'descripcion 10', unidad: 'ACC', cantidad: 453},
]

const MyDocument = () => (
  <Document>
    <Page wrap style={styles.body}>
      <View fixed style={styles.header}>
        <View style={styles.header.w100}>
          <View style={styles.header.sec30}>
            <Image src={LogoImage} style={styles.header.logo}></Image>
          </View>
          <View style={styles.header.sec40}>
            <Text>ALKAJSD</Text>
          </View>
          <View style={styles.header.sec30}>
            <Text>ALKAJSD</Text>
          </View>
        </View>
      </View>
      {/* header */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.w10]}>
            <Text style={styles.tableCell}>No.</Text>
          </View>
          <View style={[styles.tableCol, styles.w31]}>
            <Text style={styles.tableCell}>Familia</Text>
          </View>
          <View style={[styles.tableCol, styles.w10]}>
            <Text style={styles.tableCell}>Código</Text>
          </View>
          <View style={[styles.tableCol, styles.w12]}>
            <Text style={styles.tableCell}>Descripción Insumo</Text>
          </View>
          <View style={[styles.tableCol, styles.w15]}>
            <Text style={styles.tableCell}>Unidad</Text>
          </View>
          <View style={[styles.tableCol, styles.w22]}>
            <Text style={styles.tableCell}>Cantidad Física</Text>
          </View>
        </View>
      </View>

      {/* content */}
      {
        registros.map(registro => 
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCol, styles.w10]}>
                <Text style={styles.tableCell}>{registro.id}</Text>
              </View>
              <View style={[styles.tableCol, styles.w31]}>
                <Text style={styles.tableCell}>{registro.familia}</Text>
              </View>
              <View style={[styles.tableCol, styles.w10]}>
                <Text style={styles.tableCell}>{registro.codigo}</Text>
              </View>
              <View style={[styles.tableCol, styles.w12]}>
                <Text style={styles.tableCell}>{registro.descripcion}</Text>
              </View>
              <View style={[styles.tableCol, styles.w15]}>
                <Text style={styles.tableCell}>{registro.unidad}</Text>
              </View>
              <View style={[styles.tableCol, styles.w22]}>
                <Text style={styles.tableCell}>{registro.cantidad}</Text>
              </View>
            </View>
          </View>
        )
      }
      
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
        <img src={LogoImage} alt="fdsd"></img>
      </div>
    );
  }
}

PDF.propTypes = {
};

export default compose(
  withStyles(styles),
)(PDF);
