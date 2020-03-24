// SALIDAD DE INVENTARIO

/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
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
  w10: {
    width: '10%',
  },
  w12: {
    width: '12%',
  },
  w15: {
    width: '15%',
  },
  w20: {
    width: '20%',
  },
  w22: {
    width: '22%',
  },
  w31: {
    width: '31%',
  },
  w60: {
    width: '60%',
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

const Commas = (x) => {
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const MyDocument = (props) => {
  const {
    datos: {
      generales,
      accesorios,
      piezas,
    },
  } = props;

  const registros = []

  accesorios.forEach(accesorio => {
    registros.push(accesorio)
  });
  piezas.forEach(pieza => {
    registros.push(pieza)
  });

  let cantidad = 0;
  let costo = 0;
  let importe = 0;
  
  // eslint-disable-next-line array-callback-return
  registros.map(registro => {
    cantidad += registro.Cantidad;
    costo += registro.Costo;
    importe += (registro.Cantidad * registro.Costo);
  })

  return (
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
              <Text style={[styles.header.titulo, styles.header.negritas]}>CONSTRUCTORA FINCASIN, S.A DE C.V.</Text>
              <Text style={[styles.header.subtitulo, styles.header.negritas]}>{generales.Movimiento}</Text>
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
                      <Text style={[styles.tableCell, styles.marginNone, styles.paddingLeft]}>{generales.Fecha}</Text>
                    </View>
                  </View>
                  <View  style={[styles.tableRow, styles.textRight]}>
                    <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Hora:</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w50, styles.borderNone]}>
                      <Text style={[styles.tableCell, styles.marginNone, styles.paddingLeft]}>{generales.Hora}</Text>
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
                <View style={[styles.tableCol, styles.w60, styles.borders]}>
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
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>{generales.Plaza}</Text>
                      </View>
                    </View>
                    <View style={[styles.tableRow, styles.textLeft]}>
                      <View style={[styles.tableCol, styles.w20, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Almacén:</Text>
                      </View>
                      <View style={[styles.tableCol, styles.w80, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>{generales.Almacen}</Text>
                      </View>
                    </View>
                    <View style={[styles.tableRow, styles.textLeft]}>
                      <View style={[styles.tableCol, styles.w20, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Folio:</Text>
                      </View>
                      <View style={[styles.tableCol, styles.w80, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>{generales.IdMovimiento}</Text>
                      </View>
                    </View>
                    {generales.TipoMovimiento < 5?
                      <View style={[styles.tableRow, styles.textLeft]}>
                        <View style={[styles.tableCol, styles.w20, styles.borderNone]}>
                          <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>Proveedor:</Text>
                        </View>
                        <View style={[styles.tableCol, styles.w80, styles.borderNone]}>
                          <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}>{generales.Proveedor}</Text>
                        </View>
                      </View>
                      :null}

                  </View>
                </View>
                <View style={[styles.tableCol, styles.w10, styles.borderNone]}></View>
                <View style={[styles.tableCol, styles.w45, styles.borderNone]}>
                  <View style={[styles.table, styles.borderNone]}>
                    <View style={[styles.tableRow, styles.textCenter]}>
                      <View style={[styles.tableCol, styles.w100, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}></Text>
                      </View>
                    </View>
                    <View style={[styles.tableRow, styles.textLeft]}>
                      <View style={[styles.tableCol, styles.w20, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}></Text>
                      </View>
                      <View style={[styles.tableCol, styles.w80, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}></Text>
                      </View>
                    </View>
                    <View style={[styles.tableRow, styles.textLeft]}>
                      <View style={[styles.tableCol, styles.w20, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}></Text>
                      </View>
                      <View style={[styles.tableCol, styles.w80, styles.borderNone]}>
                        <Text style={[styles.tableCell, styles.header.regularTXT, styles.header.negritas, styles.borderNone, styles.marginNone, styles.paddingLeft]}></Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View fixed style={styles.header}>      
          {/* header */}
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.header.negritas, styles.textCenter]}>
              <View style={[styles.tableCol, styles.w10, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>#</Text>
              </View>
              <View style={[styles.tableCol, styles.w31, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Insumo</Text>
              </View>
              <View style={[styles.tableCol, styles.w10, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>ID</Text>
              </View>
              <View style={[styles.tableCol, styles.w12, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Cantidad</Text>
              </View>
              <View style={[styles.tableCol, styles.w15, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Precio</Text>
              </View>
              <View style={[styles.tableCol, styles.w22, styles.borders]}>
                <Text style={[styles.tableCell, styles.marginNone]}>Importe</Text>
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
                    <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Codigo}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w31, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Nombre}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Identificador}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w12, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{registro.Cantidad}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w15, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${Commas(registro.Costo.toFixed(4))}`}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.w22, styles.textCenter]}>
                      <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${Commas((registro.Costo * registro.Cantidad).toFixed(4))}`}</Text>
                    </View>
                  </View>
                  <View style={styles.borderTop}></View>
                </View>
              )
            }

            return(
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Codigo}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w31, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Nombre}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w10, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Identificador}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w12, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{registro.Cantidad}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w15, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${Commas(registro.Costo.toFixed(4))}`}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.w22, styles.textCenter]}>
                    <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${Commas((registro.Costo * registro.Cantidad).toFixed(4))}`}</Text>
                  </View>
                </View>
              </View>
            )
          })
        }

        <View style={[styles.table, styles.borderleftN]}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.borderNone, styles.w10, styles.textCenter]}>
              <Text style={[styles.tableCell, styles.marginNone]}></Text>
            </View>
            <View style={[styles.tableCol, styles.borderNone, styles.w31, styles.textCenter, styles.borderRight]}>
              <Text style={[styles.tableCell, styles.marginNone]}></Text>
            </View>
            <View style={[styles.tableCol, styles.w10, styles.textCenter, styles.borderBottom]}>
              <Text style={[styles.tableCell, styles.marginNone, styles.header.negritas]}>Total:</Text>
            </View>
            <View style={[styles.tableCol, styles.w12, styles.textCenter, styles.borderBottom]}>
              <Text style={[styles.tableCell, styles.marginNone]}>{cantidad}</Text>
            </View>
            <View style={[styles.tableCol, styles.w15, styles.textCenter, styles.borderBottom]}>
              <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${Commas(costo.toFixed(4))}`}</Text>
            </View>
            <View style={[styles.tableCol, styles.w22, styles.textCenter, styles.borderBottom]}>
              <Text style={[styles.tableCell, styles.marginNone]}>{`$ ${Commas(importe.toFixed(4))}`}</Text>
            </View>
          </View>
        </View>

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
  )
};

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

MyDocument.propTypes = {
  datos: T.object,
};

export default compose(
  withStyles(styles),
)(PDF);
