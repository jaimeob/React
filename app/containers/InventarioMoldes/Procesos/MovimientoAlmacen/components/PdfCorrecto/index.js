import React from 'react';
import { hydrate } from 'react-dom';
import T from 'prop-types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import slugify from 'slugify';
// import {
//   Button,
//   Typography,
//   // FormControl,
// } from '@material-ui/core';
// import Download from '../table/assets/icon-download.svg';
// import colorRed from '@material-ui/core/colors/red';
// import colorGreen from '@material-ui/core/colors/green';
// import colorYellow from '@material-ui/core/colors/yellow';
import Success from 'components/BotonSuccess'
import { MyDocument } from '../PDF';


// const styles = {
//   buttons: {
//     btnCancel: {
//       x: '125px',
//       y: '3285px',
//       width: '80px',
//       height: '30px',
//       color: '#FFFFFF',
//       fontFamily: 'Source Sans Pro',
//       fontSize: '50px',
//       fontWeight: 'normal',
//       fontStyle: 'normal',
//       textTransform:'inherit',
//       textDecoration: 'none',
//       textAlign: 'center',
//       background: colorRed[800],
//       border: 'none',
//       borderRadius: '5px',
//       margin: '5px',
//     },
//     btnAccept: {
//       x: '125px',
//       y: '3285px',
//       width: '80px',
//       height: '30px',
//       color: '#FFFFFF',
//       fontFamily: 'Source Sans Pro',
//       fontSize: '50px',
//       fontWeight: 'normal',
//       fontStyle: 'normal',
//       textTransform:'inherit',
//       textDecoration: 'none',
//       textAlign: 'center',
//       background: colorGreen[800],
//       border: 'none',
//       borderRadius: '5px',
//       margin: '5px',
//     },
//     btnGenerar: {
//       x: '125px',
//       y: '3285px',
//       width: '80px',
//       height: '30px',
//       color: '#FFFFFF',
//       fontFamily: 'Source Sans Pro',
//       fontSize: '50px',
//       fontWeight: 'normal',
//       fontStyle: 'normal',
//       textTransform:'inherit',
//       textDecoration: 'none',
//       textAlign: 'center',
//       background: colorYellow[800],
//       border: 'none',
//       borderRadius: '5px',
//       margin: '5px',
//     },
//   },
// };
  

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
      pdf,   
    } = this.props;

    // CertificatePDF is a component that returns a PDF <Document />
    return <MyDocument 
      datos={pdf}
    />;
  }

  render() {
    return this.state.loading ? (
      // <div id="pdfButton">
      <Success
        id="pdfButton"
        label='Descargar detalle'
      />
      // </div>
    ) : (
      <Success
        label='Descargar detalle'
        onClick={this.buildPDF}
      />
    );
  }
}

PDFLink.propTypes = {
  /* User name on the certificate */
  // name: T.string.isRequired,
  /* Title of the course */
  title: T.string.isRequired,
  /* Date of completion */
  // date: T.string.isRequired,
  /* Number of credits earned */
  // credits: T.string.isRequired,
  pdf:T.object,
};