import React from 'react';
import T from 'prop-types';
// import { PDFDownloadLink} from '@react-pdf/renderer'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AcceptIcon from '@material-ui/icons/Check';
// import CloseIcon from '@material-ui/icons/Close';
import ReportIcon from '@material-ui/icons/Report';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import colorBlue from '@material-ui/core/colors/blue';
import colorRed from '@material-ui/core/colors/red';
import colorGreen from '@material-ui/core/colors/green';
import colorYellow from '@material-ui/core/colors/yellow';
import {
  // Grid,
  Typography,
  // FormControl,
} from '@material-ui/core';
import { noop } from 'redux-saga/utils';
// import BajarArchivoIcon from '@material-ui/icons/CloudDownloadOutlined';
// import {FormatoConteoPDF} from '../FormatoConteoPDF'
// import {ResultadosPDF} from '../ResultadosPDF'
import PdfCorrecto from '../PdfCorrecto'


// import { withStyles } from '@material-ui/core';


const stylesDialog = {
  title: {
    width:'20rem',
    fontSize:'18px',
    padding: '5px 10px 5px 10px',
    info: {
      background: colorBlue[200],
      marginTop: '10px',
      marginBottom: '10px',
      paddingTop: '0px',
      border: '0px',
      height: '45px',
    },
    report: {
      background: colorRed[200],
      marginTop: '10px',
      marginBottom: '10px',
      paddingTop: '0px',
      border: '0px',
      height: '45px',
    },
    check: {
      background: colorGreen[200],
      marginTop: '10px',
      marginBottom: '10px',
      paddingTop: '0px',
      border: '0px',
      height: '45px',
    },
    warning: {
      background: colorYellow[200],
      marginTop: '10px',
      marginBottom: '10px',
      paddingTop: '0px',
      border: '0px',
      height: '45px',
    },
    cancel: {
      background: colorRed[200],
      marginTop: '10px',
      marginBottom: '10px',
      paddingTop: '0px',
      border: '0px',
      height: '45px',
    },
  },
  icons: {
    info: {
      color: colorBlue[700],
      width:'35px',
      height: '35px',
    },
    report: {
      color: colorRed[700],
      width:'35px',
      height: '35px',
    },
    check: {
      color: colorGreen[700],
      width:'35px',
      height: '35px',
    },
    warning: {
      color: colorYellow[700],
      width:'35px',
      height: '35px',
    },
    cancel: {
      color: colorRed[700],
      width:'35px',
      height: '35px',
    },
  },
  message: {
    color: "#616161",
    height: '100px',
    width: '500px',
    padding: '20px',
    fontSize: '18px',
    textAlign: 'center',
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
  actions: {
    margin: 'auto',
    marginTop: '15px',
    marginBottom: '15px',
  },
};

const headerAlert = (typeAlert, title) => {
  let header = null;

  switch (typeAlert) {
    case 'Report':
      header = <div style={stylesDialog.title.report}>
        <DialogTitle
          style={stylesDialog.title}
          id="alert-dialog-title"
          disableTypography
        >
          <ReportIcon style={stylesDialog.icons.report}/>
          {title}
        </DialogTitle>
      </div>;
      break;
    case 'Check':
      header = <div style={stylesDialog.title.check}>
        <DialogTitle
          style={stylesDialog.title}
          id="alert-dialog-title"
          disableTypography
        >
          <CheckIcon style={stylesDialog.icons.check}/>
          {title}
        </DialogTitle>
      </div>;
      break;
    case 'Warning':
      header = <div style={stylesDialog.title.warning}>
        <DialogTitle
          style={stylesDialog.title}
          id="alert-dialog-title"
          disableTypography
        >
          <WarningIcon style={stylesDialog.icons.warning}/>
          {title}
        </DialogTitle>
      </div>;
      break;
    case 'Cancel':
      header = <div style={stylesDialog.title.cancel}>
        <DialogTitle
          style={stylesDialog.title}
          id="alert-dialog-title"
          disableTypography
        >
          <CancelIcon style={stylesDialog.icons.cancel}/>
          {title}
        </DialogTitle>
      </div>;
      break;
    default:
      header = <div style={stylesDialog.title.info}>
        <DialogTitle
          style={stylesDialog.title}
          id="alert-dialog-title"
          disableTypography
        >
          <InfoIcon style={stylesDialog.icons.info}/>
          {title}
        </DialogTitle>
      </div>;
      break;
  }

  return header;
}

const OptionsAlert = (option, onClickCancel, onClickAccept,onClickDescargar,piezas,accesorios,habilitar) => {
  let buttons = null;
  switch (option) {
    case 'Select': 
      buttons = <div>
        <Button
          
          style={stylesDialog.buttons.btnCancel}
          name="btnDialog_cancelar"
          onClick={onClickCancel}
          autoFocus
        >
          {/* <CloseIcon style={{fontSize:'20px'}}/> */}
          <Typography
            variant='h6'
            style={{fontSize:'11px',color: 'white',textTransform:'inherit'}}
          > 
              Cerrar
          </Typography>
        </Button>
        {habilitar?
          <PdfCorrecto
            piezas={piezas}
            accesorios={accesorios}
            onClickAccept={onClickAccept}
            title="Reporte-resultados"
            tipoPdf={1}
            tipoBoton={3}
          />
          // <PDFDownloadLink 
          //   document={<ResultadosPDF
          //     piezas={piezas}
          //     accesorios={accesorios}
          //     valor={1}
          //   />} 
          //   fileName="Reporte-resultados.pdf">
          //   <Button
          //     style={stylesDialog.buttons.btnAccept}
          //     variant="contained"
          //     name="btnDialog_aceptar"
          //     onClick={onClickAccept}
          //   >
          //     <Typography
          //       variant='h6'
          //       style={{fontSize:'11px',color: 'white'}}
          //     > 
          //           Generar
          //     </Typography>
          //   </Button>
          // </PDFDownloadLink>
          :null}

        {/* <PDFDownloadLink 
          document={<ResultadosPDF
            piezas={piezasNormal}
            accesorios={accesoriosNormal}
            valor={2}
          />} 
          fileName="Reporte-resultados.pdf">
          <Button
            style={stylesDialog.buttons.btnAccept}
            variant="contained"
            name="btnDialog_descargar"
            onClick={onClickCancel}
          >
            <Typography
              variant='h6'
              style={{fontSize:'11px',color: 'white'}}
            > 
              Descargar
            </Typography>
          </Button>
        </PDFDownloadLink> */}

      </div>
      break;
    default:
      buttons = <Button
        style={stylesDialog.buttons.btnAccept}
        variant="contained"
        name="btnDialog_aceptar"
        onClick={onClickAccept}
      >
        <AcceptIcon style={{fontSize:'20px'}}/>
      </Button>
      break;
  }

  return buttons;
}


function ModalInventario(props) {
  const {
    open,
    typeAlert,
    typeOptions,
    title,
    message,
    onClickAccept,
    onClickCancel,
    onClickDescargar,
    handleCloseModal,
    contentElement,
    piezas,
    accesorios,
    piezasNormal,
    accesoriosNormal,
    habilitar,
  } = props;
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        {headerAlert(typeAlert, title)}
        <DialogContent
          style={stylesDialog.message}
        >
          {message}
          {contentElement}
        </DialogContent>
        <DialogActions
          style={stylesDialog.actions}
        >
          {OptionsAlert(typeOptions, onClickCancel, onClickAccept,onClickDescargar,piezas,accesorios,piezasNormal,accesoriosNormal,habilitar)}
        </DialogActions>
      </Dialog>
    </div>
  );
}

ModalInventario.propTypes = {
  open: T.oneOfType([
    T.bool,
  ]),
  typeAlert: T.oneOf([
    'Report',
    'Check',
    'Warning',
    'Cancel',
    'Info',
  ]),
  typeOptions: T.string,
  title: T.node,
  message: T.node,
  contentElement: T.node,
  handleCloseModal: T.func,
  onClickAccept: T.func,
  onClickCancel: T.func,
  onClickDescargar:T.func,
  piezas:T.array,
  accesorios:T.array,
  piezasNormal:T.array,
  accesoriosNormal:T.array,
  habilitar:T.bool,
}

ModalInventario.defaultProps = {
  open: false,
  typeAlert: 'Info',
  typeOptions: '',
  title: '',
  message: '',
  contentElement: null,
  handleCloseModal: noop,
  onClickAccept: noop,
  onClickCancel: noop,
}

export default ModalInventario;
