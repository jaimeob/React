import React from 'react';
import { hydrate } from 'react-dom';
import T from 'prop-types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import slugify from 'slugify';
import {
  Button,
  Typography,
  // FormControl,
} from '@material-ui/core';
// import Download from '../table/assets/icon-download.svg';
import colorRed from '@material-ui/core/colors/red';
import colorGreen from '@material-ui/core/colors/green';
import colorYellow from '@material-ui/core/colors/yellow';
import BajarArchivoIcon from '@material-ui/icons/CloudDownloadOutlined';
import {ResultadosPDF} from '../ResultadosPDF'
import {FormatoConteoPDF} from '../FormatoConteoPDF'


const styles = {
  botones:{
    width: '2em', 
    height: '2em',
    color: '#28950F',
    cursor:'pointer',
    opacity: 0.75,
  },
  buttons: {
    btnCancel: {
      x: '125px',
      y: '3285px',
      width: '80px',
      height: '30px',
      color: '#FFFFFF',
      fontFamily: 'Source Sans Pro',
      fontSize: '50px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textTransform:'inherit',
      textDecoration: 'none',
      textAlign: 'center',
      background: colorRed[800],
      border: 'none',
      borderRadius: '5px',
      margin: '5px',
    },
    btnAccept: {
      x: '125px',
      y: '3285px',
      width: '80px',
      height: '30px',
      color: '#FFFFFF',
      fontFamily: 'Source Sans Pro',
      fontSize: '50px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textTransform:'inherit',
      textDecoration: 'none',
      textAlign: 'center',
      background: colorGreen[800],
      border: 'none',
      borderRadius: '5px',
      margin: '5px',
    },
    btnGenerar: {
      x: '125px',
      y: '3285px',
      width: '80px',
      height: '30px',
      color: '#FFFFFF',
      fontFamily: 'Source Sans Pro',
      fontSize: '50px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textTransform:'inherit',
      textDecoration: 'none',
      textAlign: 'center',
      background: colorYellow[800],
      border: 'none',
      borderRadius: '5px',
      margin: '5px',
    },
  },
};
  

export default class PDFLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.generatePDF = this.generatePDF.bind(this);
    this.buildPDF = this.buildPDF.bind(this);
    this.createAndDownloadPDF = this.createAndDownloadPDF.bind(this);
  }

  download = (filename, url) => {
    const element = document.createElement('a');
    element.setAttribute('href', `${url}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  createAndDownloadPDF(pdfContent, filename, divId, callback) {
    setTimeout(() => {
      const link = (
        <div id={divId}>
          <PDFDownloadLink document={pdfContent} fileName={filename}>
            {({  blob, loading }) => {
              if (!loading) {
                this.download(filename, URL.createObjectURL(blob));
                callback();
              }
            }}
          </PDFDownloadLink>
        </div>
      );
      const elem = document.createElement('div');
      document.getElementById('pdfButton').appendChild(elem);
      hydrate(link, elem);
    }, 50);
  }

  buildPDF() {
    const {
      onClickAccept,
      tipoPdf,
    } = this.props;
    if (!this.state.loading) {
      this.setState({ loading: true }, () => {
        this.createAndDownloadPDF(
          this.generatePDF(),
          `${slugify(this.props.title)}.pdf`,
          `${slugify(this.props.title)}`,
          () => this.setState({ loading: false })
        );
      });
      if(tipoPdf===1)
        onClickAccept()
    }
  }

  generatePDF() {
    const {
      piezas,   
      accesorios,
      tipoPdf,
    } = this.props;

    // CertificatePDF is a component that returns a PDF <Document />
    if(tipoPdf === 0){
      return <FormatoConteoPDF 
        piezas={piezas}
        accesorios={accesorios}
      />;
    }
    return <ResultadosPDF 
      piezas={piezas}
      accesorios={accesorios}
    />;
    
  }


  render() {
    const {
      tipoBoton,
    } = this.props;
  
    if (tipoBoton === 0)
      return this.state.loading ? (
        // <div id="pdfButton">
        <BajarArchivoIcon
          style={styles.botones} 
          // className={styles.botones}
          id="pdfButton"
        // onClick = {handleDownloadExcelProxy(0)}
        />
        // </div>
      ) : (
        <BajarArchivoIcon
          style={styles.botones} 
          // className={styles.botones}
          onClick = {this.buildPDF}
        />
      );

    if (tipoBoton === 1)
      return this.state.loading ? (
        // <div id="pdfButton">
        <Typography
          variant="subtitle2"
          id="pdfButton"
          // className={classes.typography}
          style={{cursor: 'pointer',fontWeight: '400',textTransform:'inherit'}} 
          // onClick = {this.buildPDF}
        >
          {'Formato de conteo'}
        </Typography>
        // </div>
      ) : (
        <Typography
          variant="subtitle2"
          // className={classes.typography}
          style={{cursor: 'pointer',fontWeight: '400',textTransform:'inherit'}} 
          onClick = {this.buildPDF}
        >
          {'Formato de conteo'}
        </Typography>
      );

    return this.state.loading ? (
      // <div id="pdfButton">
      <Button
        style={styles.buttons.btnAccept}
        variant="contained"
        name="btnDialog_aceptar"
        id="pdfButton"
        // onClick={this.buildPDF}
      >
        <Typography
          variant='h6'
          style={{fontSize:'11px',color: 'white',textTransform:'inherit'}}
        > 
              Generar
        </Typography>
      </Button>
      // </div>
    ) : (
      <Button
        style={styles.buttons.btnAccept}
        variant="contained"
        name="btnDialog_aceptar"
        onClick={this.buildPDF}
      >
        <Typography
          variant='h6'
          style={{fontSize:'11px',color: 'white',textTransform:'inherit'}}
        > 
              Generar
        </Typography>
      </Button>
    );
  }
}

PDFLink.propTypes = {
  /* User name on the certificate */
  /* Title of the course */
  title: T.string.isRequired,
  /* Date of completion */
  /* Number of credits earned */
  onClickAccept:T.func,
  piezas: T.array,
  accesorios: T.array,
  tipoPdf:T.number,
  tipoBoton:T.number,
};