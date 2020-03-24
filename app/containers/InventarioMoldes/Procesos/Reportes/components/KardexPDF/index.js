// KARDEX

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
  w4: {
    width: '4%',
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
  w11: {
    width: '11%',
  },
  w17: {
    width: '17%',
  },
  w20: {
    width: '20%',
  },
  w50: {
    width: '50%',
  },
  w80: {
    width: '80%',
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
  borderNone: {border: 'none !important'},
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

export const KardexPDF  = (props) => {
  const {
    registros,
  } = props;

  const Fecha = registros.length>0 ? registros[0].Fecha : '';
  const Hora = registros.length>0 ? registros[0].Hora : '';

  return(
    <Document>
      <Page wrap style={styles.body} orientation='landscape'>
        <View fixed style={styles.header}>
          <View style={styles.header.w80}>

            {/* LOGO */}
            <View style={styles.header.sec30}>
              <Image src={LogoImage} style={styles.header.logo}></Image>
            </View>

            {/* TITULO */}
            <View style={styles.header.sec40}>
              <Text style={[styles.header.titulo, styles.header.negritas]}>CONSTRUCTORA FINCASIN, S.A DE C.V.</Text>
              <Text style={[styles.header.subtitulo, styles.header.negritas]}>Kardex de Insumo por Almacén</Text>
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

          {/* header */}
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.header.negritas, styles.textCenter]}>
              <View style={[styles.tableCol, styles.w5, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Folio</Text>
              </View>
              <View style={[styles.tableCol, styles.w6, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Plaza</Text>
              </View>
              <View style={[styles.tableCol, styles.w6, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Inventario</Text>
              </View>
              <View style={[styles.tableCol, styles.w11, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Tipo de Movimiento</Text>
              </View>
              <View style={[styles.tableCol, styles.w5, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>ID Molde</Text>
              </View>
              <View style={[styles.tableCol, styles.w10, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Molde</Text>
              </View>
              <View style={[styles.tableCol, styles.w5, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>ID</Text>
              </View>
              <View style={[styles.tableCol, styles.w17, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Insumo</Text>
              </View>
              <View style={[styles.tableCol, styles.w4, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Tipo</Text>
              </View>
              {/* <View style={[styles.tableCol, styles.w5, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Unidad</Text>
              </View> */}
              <View style={[styles.tableCol, styles.w6, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Cant.</Text>
              </View>
              <View style={[styles.tableCol, styles.w9, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Origen</Text>
              </View>
              <View style={[styles.tableCol, styles.w9, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Destino</Text>
              </View>
              <View style={[styles.tableCol, styles.w7, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Fecha</Text>
              </View>
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
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Folio}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w6, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Plaza}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w6, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Inventario}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w11, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.TipoMovimiento}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w5, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.IdMolde}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Molde}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w5, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.IdInsumo}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w17, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Insumo}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w4, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Tipo}</Text>
                    </View>
                    {/* <View style={[styles.tableCol, styles.w5, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Unidad}</Text>
                  </View> */}
                    <View style={[styles.tableCol, styles.w6, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Cantidad}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w9, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Origen}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w9, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Destino}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Fecha}</Text>
                    </View>
                  </View>
                  <View style={styles.borderTop}></View>
                </View>
              )
            }

            return(
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, styles.w5, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Folio}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w6, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Plaza}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w6, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Inventario}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w11, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.TipoMovimiento}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w5, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.IdMolde}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Molde}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w5, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.IdInsumo}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w17, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Insumo}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w4, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Tipo}</Text>
                  </View>
                  {/* <View style={[styles.tableCol, styles.w5, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Unidad}</Text>
                  </View> */}
                  <View style={[styles.tableCol, styles.w6, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Cantidad}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w9, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Origen}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w9, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Destino}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w7, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Fecha}</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
        {/* <View>
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
        </View> */}
      </Page>
    </Document>
  )
};

// eslint-disable-next-line react/prefer-stateless-function
export class PDF extends React.Component {

  render() {
    return (
      <div>
        <PDFViewer style={styles.viewer}>
          <KardexPDF />
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
