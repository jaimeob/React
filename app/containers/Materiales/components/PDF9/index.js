// TRANSFORMACION

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
  { src: RLigth, fontWeight: 'light'},
  { src: RMedium, fontWeight: 'medium'},
  { src: RBold, fontWeight: 'bold'},
  { src: RBlack, fontWeight: 'heavy'},
]});

const styles = ({
  body: {
    paddingTop: 65,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontSize: 8,
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
  w20: {
    width: '20%',
  },
  w26: {
    width: '26%',
  },
  w30: {
    width: '30%',
  },
  w45: {
    width: '45%',
  },
  w50: {
    width: '50%',
  },
  w70: {
    width: '70%',
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
    margin: '10px 20px',
    backgroundColor: 'black',
  },
  text10:{
    fontSize: 10,
  },
})

const registros = [
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
  {Id: 1, CodigoOrigen:1, InsumoOrigen: 'Insumo 1', IdentificadorOrigen: 'A-1', CodigoDestino: 2, InsumoDestino: 'Insumo 2', IdentificadorDestino: 'A-2', Cantidad: 10},
]

export const MyDocument = () => (
  <Document>
    <Page wrap style={styles.body}>
      <View fixed style={styles.header}>
        <View style={styles.header.w80}>

          {/* LOGO */}
          <View style={styles.header.sec30}>
            <Image src={LogoImage} style={styles.header.logo}></Image>
          </View>

          {/* TITULO */}
          <View style={styles.header.sec40}>
            <Text style={[styles.header.titulo, styles.header.negritas]}>CONSTRUCTORA FINCASIN, S.A DE C.V.</Text>
            <Text style={[styles.header.subtitulo, styles.header.negritas]}>Transformación</Text>
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

        {/* ALMACEN - MOLDE - CABECERA DE LA TABLA */}
        <View style={[styles.marginB, styles.marginT]}>
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
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Almacén Culiacan</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.tableCol, styles.w10]}></View>
              <View style={[styles.tableCol, styles.w45, styles.borders]}>
                <View style={[styles.table, styles.borderNone]}>
                  <View style={[styles.tableRow, styles.textCenter]}>
                    <View style={[styles.tableCol, styles.w100, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>DETALLE DE TRANSFORMACION</Text>
                    </View>
                  </View>
                  <View style={[styles.tableRow, styles.textLeft]}>
                    <View style={[styles.tableCol, styles.w30, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Origen:</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w70, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Imperial</Text>
                    </View>
                  </View>
                  <View style={[styles.tableRow, styles.textLeft]}>
                    <View style={[styles.tableCol, styles.w30, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Destino:</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w70, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Cataluña</Text>
                    </View>
                  </View>
                </View>
              </View>
              
            </View>
          </View>
        </View>
        {/* header */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.header.negritas, styles.textCenter]}>
            <View style={[styles.tableCol, styles.w9, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Codigo</Text>
            </View>
            <View style={[styles.tableCol, styles.w26, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Insumo Origen</Text>
            </View>
            <View style={[styles.tableCol, styles.w9, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>ID</Text>
            </View>
            <View style={[styles.tableCol, styles.w9, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Codigo</Text>
            </View>
            <View style={[styles.tableCol, styles.w26, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Insumo Destino</Text>
            </View>
            <View style={[styles.tableCol, styles.w9, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>ID</Text>
            </View>
            <View style={[styles.tableCol, styles.w12, styles.borders]}>
              <Text style={[styles.tableCell, styles.marginNone]}>Cantidad</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* TABLA */}
      {
        registros.map((registro, index) => {

          if(registros.length - 1 === index){
            return(
              <View style={styles.borderTop}></View>
            )
          }

          return(
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.w9, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{registro.CodigoOrigen}</Text>
                </View>
                <View style={[styles.tableCol, styles.w26, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{registro.InsumoOrigen}</Text>
                </View>
                <View style={[styles.tableCol, styles.w9, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{registro.IdentificadorOrigen}</Text>
                </View>
                <View style={[styles.tableCol, styles.w9, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{registro.CodigoDestino}</Text>
                </View>
                <View style={[styles.tableCol, styles.w26, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{registro.InsumoDestino}</Text>
                </View>
                <View style={[styles.tableCol, styles.w9, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{registro.IdentificadorDestino}</Text>
                </View>
                <View style={[styles.tableCol, styles.w12, styles.textCenter]}>
                  <Text style={[styles.tableCell, styles.marginNone]}>{registro.Cantidad}</Text>
                </View>
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
              </View>
              <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                <View style={styles.line}></View>
                <View><Text style={styles.text10}>Nombre</Text></View>
              </View>
            </View>
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
          <MyDocument/>
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
