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
// import BajarArchivoIcon from '@material-ui/icons/CloudDownloadOutlined';
import {FormatoConteoPDF} from '../FormatoConteoPDF'


const styles = {
  botones:{
    width: '2em', 
    height: '2em',
    color: '#28950F',
    cursor:'pointer',
    opacity: 0.75,
  },
  botonAmarillo:{
    backgroundColor: '#F9AA33',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#F9AA33',
    },
    color: 'white',
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
    if (!this.state.loading) {
      this.setState({ loading: true }, () => {
        this.createAndDownloadPDF(
          this.generatePDF(),
          `${slugify(this.props.title)}.pdf`,
          `${slugify(this.props.title)}`,
          () => this.setState({ loading: false })
        );
      });
    }
  }

  generatePDF() {
    const {
      piezas,   
      accesorios,
      molde,
      version,
    } = this.props;

    // CertificatePDF is a component that returns a PDF <Document />

    return <FormatoConteoPDF 
      piezas={piezas}
      accesorios={accesorios}
      molde={molde}
      version={version}
    />;
  }


  render() {
    return this.state.loading ? (
      // <div id="pdfButton">
      <Button
        style={styles.botonAmarillo}
        // style={{textTransform:'inherit'}} 
        size='medium'
        variant="contained"
        name="btnDialog_aceptar"
        id="pdfButton"
        // onClick={this.buildPDF}
      >
        {"Formato de conteo"}
      </Button>
      // </div>
    ) : (
      <Button
        style={styles.botonAmarillo}
        size='medium'
        variant="contained"
        name="btnDialog_aceptar"
        onClick={this.buildPDF}
      >
        {"Formato de conteo"}
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
  piezas: T.array,
  accesorios: T.array,
  molde:T.string,
  version:T.string,
};