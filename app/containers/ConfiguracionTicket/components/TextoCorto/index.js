import React from 'react';
import T from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { MenuItem, Grid, FormControl, Card, Typography, Divider} from '@material-ui/core';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '../../../../components/Switch';
// import { connect } from 'react-redux';
import { Container } from '../../styledComponents';

// import { default as MainActions } from 'containers/Main/actions';

/* eslint-disable react/prefer-stateless-function */

export class TextoCorto extends React.Component {
  render() {
    const {
      titulo,
      divSelecionado,
      requerido,
      longitud,
      valor,
      onChangeTipo,
      onChangeObligatorio,
      onChangeLongitud,
      // eslint-disable-next-line no-unused-vars
      error,
      errorTipo,
      errorLongitud,
      // eslint-disable-next-line no-unused-vars
      helpertext,
      idTipoComponente,
    } = this.props;


    return (
      <form>
        <Card
          style={{
            marginBottom: '10px',
            boxShadow: '0px 1px 2px 1px rgba(0,0,0,0.2)',
          }}
        >
          <Grid container item md={12}>
            <Container flexDirection='column' style={{ padding:'15px 20px 0px 20px' }}>
              <Container  >
                <Grid item md={12}>
                  <Typography inline variant="body1" gutterBottom>
                    {titulo}
                    <Divider />
                  </Typography>
                </Grid>
              
              </Container>
              <Container flexDirection='row'>
                <Grid item xs={6} sm={6} md={6}>
                  <FormControl fullWidth>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Tipo"
                      value={valor}
                      error={errorTipo}
                      onChange={({ target }) => onChangeTipo(target.value,divSelecionado)}
                      helperText="*Requerido"
                      margin="normal"
                    >
                      <MenuItem value='texto' key='texto'>Texto</MenuItem>
                      <MenuItem value='numero'  key='numero'>Número</MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={6} md={6} style={{ paddingLeft:'20px',paddingTop:'16px' }}>
                  <TextField  
                    onInput = {idTipoComponente === 1 ? (e) =>{e.target.value = Math.max(0, parseInt(e.target.value, 10) ).toString().slice(0,1000000000)}
                      :(e) =>{e.target.value = Math.max(0, parseInt(e.target.value, 10) ).toString().slice(0,1000000000)}}
                    label={valor === 'numero'? "Longitud" : "Tamaño"}
                    fullWidth
                    type='number'
                    value= {longitud}
                    onChange={(event) => onChangeLongitud(event.target.value,divSelecionado,idTipoComponente)}
                    error={errorLongitud}
                    helperText='*Requerido'
                  />
                </Grid>
              </Container>
              <Container container flexDirection='row' justify="flex-end" >
                <FormControlLabel
                  control={
                    <Switch 
                      checked={requerido}
                      onChange={onChangeObligatorio(divSelecionado)}      
                    />
                    // <Switch
                    // checked={true}
                    // onChange={({ target }) => onChangeObligatorio(target.checked,divSelecionado)}      
                    // />
                    
                  }
                  label="Obligatorio"
                />
              </Container>
            </Container>
          </Grid>
        </Card>
      </form>
    );
  }
}

TextoCorto.propTypes = {
  titulo: T.string,
  divSelecionado: T.number,
  longitud: T.string,
  valor: T.string,
  onChangeTipo: T.func,
  onChangeObligatorio: T.func,
  onChangeLongitud: T.func,
  error: T.bool,
  errorTipo: T.bool,
  errorLongitud: T.bool,
  requerido: T.bool,
  helpertext: T.string,
  idTipoComponente: T.number,
}

export default TextoCorto;
