import React from 'react';
import { Grid, Card, TextField } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import iconXls from 'images/iconos/xls.png';
import iconDoc from 'images/iconos/doc.png';
import iconPdf from 'images/iconos/pdf.png';
import iconPicture from 'images/iconos/picture.png';
import Switch from '../../../../components/Switch';
import { Container } from '../../styledComponents';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});
// const GreenSwitch = withStyles({
//   switchBase: {
//     color: '#28950f',
//     '&$checked + $bar': {
//       color: '#28950f',
//       backgroundColor: '#28950f',
//     },
//     '&$checked': {
//       color: '#28950f',
//     },
//   },
//   checked: {},
//   track: {},
//   bar: {},
// })(Switch);

// eslint-disable-next-line react/prefer-stateless-function
export class ListDesplegable extends React.Component {
  
  render(){
    const {
      classes,
      divSelecionado,
      requerido,
      onChangeObligatorio,
      TamañoArchivos,
      CantidadArchivos,
      tipoArchivo,
      onChangeTipoArchivo,
      error,
      error2,
      helpertext,
      helpertext2,
      onChangeTamañosArchivos,
    } = this.props;
    
    return(
      
      <div className={classes.root}>
        <Card
          style={{
            boxShadow: '0px 1px 2px 1px rgba(0,0,0,0.2)',
          }}>
          <Grid container item md={12} alignItems='center' spacing={16}>
            <Container flexDirection='column' style={{ padding:'20px 20px 0px 20px' }}>
              <Container flexDirection='row' container style={{ paddingLeft:'20px' }}>
                <ToggleButtonGroup value={tipoArchivo}  >
                  <ToggleButton value="picture" onClick={() => onChangeTipoArchivo('picture',divSelecionado)}>
                    <img
                      src={iconPicture}
                      style={{ width:'25px',height: '25px'}}
                      alt="logo-picture1"
                    />
                  </ToggleButton>
                  <ToggleButton value="pdf" onClick={() => onChangeTipoArchivo('pdf',divSelecionado)}>
                    <img
                      src={iconPdf}
                      style={{ width:'25px',height: '25px'}}
                      alt="logo-Pfd"
                    />
                  </ToggleButton>
                  <ToggleButton value="xls" onClick={() => onChangeTipoArchivo('xls',divSelecionado)}>
                    <img
                      src={iconXls}
                      style={{ width:'25px',height: '25px'}}
                      alt="logo-xls"
                    />
                  </ToggleButton>
                  <ToggleButton value="doc" onClick={() => onChangeTipoArchivo('doc',divSelecionado)}>
                    <img
                      src={iconDoc}
                      style={{ width:'25px',height: '25px'}}
                      alt="logo-Doc"
                    />
                  </ToggleButton>
                </ToggleButtonGroup>

              </Container>
              <Container container flexDirection='column' style={{ marginTop:'15px' }}>
                <Container flexDirection='row' style={{ alignItems:'center'  }}>
                  <Typography variant="body2" gutterBottom>
                    Cantidad Maxima de Archivos:
                  </Typography>
                  <TextField
                    style={{ padding:'0px 0px 12px 39px' }}
                    value={CantidadArchivos}
                    type="number"
                    name="cantidadarchivos"
                    autoComplete= "false"
                    onChange={( { target }) => onChangeTamañosArchivos(target.value,divSelecionado,0)}
                    error={error}
                    helperText={helpertext}
                  />
                </Container>
                <Container flexDirection='row' style={{ alignItems:'center'}} >
                  <Typography variant="body2" gutterBottom>
                    Tamaño maximo de archivos(MB):
                  </Typography>
                  <TextField
                    style={{ padding:'0px 0px 12px 15px'}}
                    value={TamañoArchivos}
                    type="number"
                    name="tamañoarchivos"
                    onChange={({ target }) => onChangeTamañosArchivos(target.value,divSelecionado,1)}
                    error={error2}
                    helperText={helpertext2}
                    
                  />
                </Container>
                <FormControlLabel
                  style={{ alignSelf:"flex-end" }}
                  control={
                    <Switch
                      checked={requerido}
                      onChange={onChangeObligatorio(divSelecionado)}  
                    />
                  }
                  label="Obligatorio"
                />
                
                
              </Container>
            </Container>
          </Grid>
        </Card>
      </div>
    );
  }
}

ListDesplegable.propTypes = {
  classes: T.object.isRequired,
  divSelecionado: T.number,
  requerido: T.bool,
  onChangeObligatorio: T.func,
  TamañoArchivos: T.string,
  CantidadArchivos: T.string,
  tipoArchivo: T.string,
  onChangeTipoArchivo: T.func,
  error: T.bool,
  error2: T.bool,
  helpertext: T.string,
  helpertext2: T.string,
  onChangeTamañosArchivos: T.func,
};

export default withStyles(styles)(ListDesplegable);