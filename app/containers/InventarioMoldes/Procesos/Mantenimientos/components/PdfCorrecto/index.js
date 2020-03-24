import React from 'react';
import { hydrate } from 'react-dom';
import T from 'prop-types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import slugify from 'slugify';
import {
  Button,
  // FormControl,
} from '@material-ui/core';
// import Download from '../table/assets/icon-download.svg';
// import colorRed from '@material-ui/core/colors/red';
// import colorGreen from '@material-ui/core/colors/green';
// import colorYellow from '@material-ui/core/colors/yellow';
import IconoDescarga from '@material-ui/icons/VerticalAlignBottomOutlined'
import {MantenimientosPDF} from '../MantenimientosPDF'

const styles = {
  buttons: {
    botonLila:{
      backgroundColor: '#3F51B5',
      '&:disabled': {
        backgroundColor: 'rgba(0, 0, 0, 0.26)',
      },
      '&:hover': {
        backgroundColor: '#3F51B5',
      },
      color: 'white',
      textTransform:'inherit',
    },
    botonDisabled:{
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
      color: 'white',
      textTransform:'inherit',
    },
    leftIcon: {
      marginRight: 8,
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
      registros,
    } = this.props;
    // CertificatePDF is a component that returns a PDF <Document />
    return <MantenimientosPDF 
      registros={registros}
    />;
  }

  render() {
    const {
      mostrar,
    } = this.props;
    return this.state.loading ? (
      <Button 
        style={!mostrar?styles.buttons.botonDisabled: styles.buttons.botonLila}
        variant="contained"
        size='medium'
        id="pdfButton"
        onClick={this.buildPDF}
        disabled={!mostrar}
      >
        <IconoDescarga
          className={styles.buttons.leftIcon}
        />
            Exportar
      </Button>
      // </div>
    ) : (
      <Button 
        style={!mostrar?styles.buttons.botonDisabled: styles.buttons.botonLila}
        variant="contained"
        size='medium'
        onClick={this.buildPDF}
        disabled={!mostrar}
      >
        <IconoDescarga
          className={styles.buttons.leftIcon}
        />
        Exportar
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
  registros: T.array,
  mostrar: T.bool,
};