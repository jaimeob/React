/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField, IconButton, FormControl, MenuItem } from '@material-ui/core';
import { includes} from 'lodash';
import Input from 'components/FormInput'

import Grid from '@material-ui/core/Grid';
import DeleteIcon from '../../../../images/iconos/deleteButtonList.png'
// import Selection from '../../../ConfiguracionTicket/components/Selection';
import { Container } from '../../../ConfiguracionTicket/styledComponents';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


export class CamposRegla extends React.Component{

  data = {
    valores:[
      {
        IdValores: '0',
        Nombre: 'Número',
      },
      {
        IdValores: '1',
        Nombre: 'Texto',
      },
    ],
    campos: [
      {
        IdCampo: '1',
        Nombre: 'Texto corto',
      },
      {
        IdCampo: '2',
        Nombre: 'Texto largo',
      },
      {
        IdCampo: '3',
        Nombre: 'Selección múltiple',
      },
      {
        IdCampo: '4',
        Nombre: 'Selección simple',
      },
      {
        IdCampo: '5',
        Nombre: 'Lista desplegable',
      },
      {
        IdCampo: '6',
        Nombre: 'Cargar archivo',
      },
    ],
    condicion:[
      {
        IdCondicion: '1',
        Nombre: 'Igual a',
      },
      {
        IdCondicion: '2',
        Nombre: 'No igual a',
      },
      {
        IdCondicion: '3',
        Nombre: 'Mayor que',
      },
      {
        IdCondicion: '4',
        Nombre: 'Menor que',
      },
      {
        IdCondicion: '5',
        Nombre: 'Mayor o igual que',
      },
      {
        IdCondicion: '6',
        Nombre: 'Menor o igual que',
      },
    ],
    componentesFiltrados:[],
  };

  render(){
    const {
      onHandleChangeValueModal,
      onHandleChangeInputValueModal, 
      onClickBorrarRegla,
      dataReglas, 
      componentesEspeciales,
      reglaSeleccionada,
      configuracionCampos,
      componentesFiltrados,
      nuevoValor,
    } = this.props;
    this.data.componentesFiltrados = componentesFiltrados
 console.log(dataReglas,"dataReglas");
 
    return(
      <Fragment>
        {dataReglas.map((regla,index) => (
          <Fragment
            // eslint-disable-next-line react/no-array-index-key
            key={`campos_regla_${index}`}
          >
            <Container
              flexDirection="column"
              ref={(ins) => { this.contentRef = ins; }}
            >
              <Grid container item xs={12} sm={12} md={12}  >
                {/* <Grid item xs={2} sm={2} md={2} style={{ padding: '10px 10px' }}></Grid> */}
                <Grid item xs={2} sm={2} md={2} style={{ padding: '10px 10px',marginLeft: '25px' }}>
                  <FormControl fullWidth>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Valores"
                      value={regla.valores}
                      error={regla.errorValores}
                      inputProps={{
                        name: 'valores',
                        id: 'valores',
                      }}
                      InputLabelProps={{
                        style:{
                          fontSize: 14,
                        },
                      }}
                      onChange={(event) => onHandleChangeValueModal(event,index,reglaSeleccionada)}
                      margin="normal"
                      helperText={regla.errorValores ? 'Campo Requerido *' : ''}
                      //                      helperText="*Requerido"
                    >
                      <MenuItem value="" disabled id={`opt_${index}_empty`}>
                      Seleccione una opción
                      </MenuItem>
                      {this.data.valores.map((item,indexValor)  => (
                        <MenuItem
                          // value={regla.valores === 0 ? componente.config.nomCampo : }
                          value={item.IdValores || { indexValor }}
                          // eslint-disable-next-line react/no-array-index-key
                          key={`item_${item.id}_${indexValor}`}
                        >
                          { item.Nombre }
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={3} sm={3} md={3} style={{ padding: '10px 10px' }}>
                  <FormControl
                    fullWidth
                  >
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Campos"
                      value={regla.campo}
                      error={regla.errorCampo}
                      inputProps={{
                        name: 'campo',
                        id: 'campo',
                      }}
                      InputLabelProps={{
                        style:{
                          fontSize: 14,
                        },
                      }}
                      onChange={(event) => onHandleChangeValueModal(event,index,reglaSeleccionada)}
                      margin="normal"
                      helperText={regla.errorCampo ? 'Campo Requerido *' : ''}
                      // helperText="*Requerido"
                    >
                      <MenuItem value="" disabled>
                        Selecione una opción
                      </MenuItem>
                      
                      {regla.componentes.map((componente,indexCampo)  => {
                        return(
                          <MenuItem
                            // value={regla.valores === 0 ? componente.config.nomCampo : }
                            value={componente.config.nomCampo}
                            // eslint-disable-next-line react/no-array-index-key
                            key={`item_${componente.id}_${indexCampo}`}
                          >
                            {componente.config.nomCampo}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </FormControl>
                </Grid>

                <Grid item xs={3} sm={3} md={3} style={{ padding: '10px 10px' }}>
                  <FormControl fullWidth>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Condicion"
                      value={regla.condicion}
                      error={regla.errorCondicion}
                      inputProps={{
                        name: 'condicion',
                        id: 'condicion',
                      }}
                      InputLabelProps={{
                        style:{
                          fontSize: 14,
                        },
                      }}
                      onChange={(event) => onHandleChangeValueModal(event,index,reglaSeleccionada)}
                      margin="normal"
                      helperText={regla.errorCondicion ? 'Campo Requerido *' : ''}
                      // helperText="*Requerido"
                    >
                      <MenuItem value="" disabled id={`opt_${index}_empty`}>
                      Seleccione una opción 
                      </MenuItem>
                      {this.data.condicion.map((item,indexCondicion)  => (
                        <MenuItem
                          // value={regla.valores === 0 ? componente.config.nomCampo : }
                          value={item.IdCondicion || { indexCondicion }}
                          // eslint-disable-next-line react/no-array-index-key
                          key={`item_${item.id}_${indexCondicion}`}
                        >
                          { item.Nombre }
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>

                {/* <form
                  display="flex"
                  style={{ 
                    margin: '0vh 1vh -1.2vh 2.5vh',
                    width:'25vh',
                    fontSize:'14px',
                  }}
                > */}
                <Grid item xs={3} sm={3} md={3} style={{ padding: '27px 10px 0px 5px' }}>
                  <FormControl fullWidth>
                    <Input
                      // eslint-disable-next-line react/no-array-index-key
                      key={`txt_valor_${index}`}
                      // onSelectChange={onHandleChangeValueModal(index)}
                      onChange={onHandleChangeInputValueModal(reglaSeleccionada)}
                      name="valor"
                      nomCampo="Campos"
                      indice = {index}
                      valor={regla.valor}
                      // error={regla.errorValor}
                      requerido = {regla.errorValor}
                      // helperText="*Requerido"
                      // fullWidth
                      tipoInput={regla.valores === '0' ? 'numero' : 'text'}
                    
                    />

                    {/* <TextField    
                    // eslint-disable-next-line react/no-array-index-key
                    key={`txt_valor_${index}`}
                    // onSelectChange={onHandleChangeValueModal(index)}
                    onChange={(event) => onHandleChangeValueModal(event,index,reglaSeleccionada)}
                    name="valor"
                    label="Valor"
                    indice = {index}
                    value={regla.valor}
                    error={regla.errorValor}
                    helperText="*Requerido"
                    // fullWidth
                    tipoInput={dataReglas[0].valores === '0' ? 'numero' : 'text'}
                    
                  /> */}

                    {/* {dataReglas[0].valores === '1' && (
                    <TextField
                      // eslint-disable-next-line react/no-array-index-key
                      key={`txt_valor_${index}`}
                      // onSelectChange={onHandleChangeValueModal(index)}
                      onChange={(event) => onHandleChangeValueModal(event,index,reglaSeleccionada)}
                      name="valor"
                      label="Valor"
                      value={regla.valor}
                      error={regla.errorValor}
                      helperText="*Requerido"
                      // fullWidth
                      type="TEXT"
                      style={{
                        fontSize:'14px',
                      }}
                    /> )} */}
                    {/* </form> */}
                  </FormControl>
                </Grid>
                {/* <form
                  display="flex"
                  style={{ 
                    margin: '-5vh 0vh -3vh 0vh',
                    width:'5vh',
                    fontSize:'14px',
                  }}
                > */}
                <Grid item xs={1} sm={1} md={1} style={{ marginLeft: '-26px',marginTop: '30px' }}>
                  <IconButton
                    aria-label="Delete"
                    disabled = { dataReglas.length === 1}
                    onClick={onClickBorrarRegla(index,reglaSeleccionada)}
                   
                  >
                    <img
                      src={DeleteIcon}
                      style={{ width:'20px',height: '20px'}}
                      alt="logo-Pfd"
                    />
                  </IconButton>
                </Grid>
                {/* </form> */}
              </Grid>
            </Container>
          </Fragment>
        ))}
      </Fragment>
    );
  }
};

CamposRegla.propTypes = {
  onHandleChangeValueModal:  T.func,
  onHandleChangeInputValueModal:  T.func,
  onClickBorrarRegla:        T.func,
  dataReglas:         T.array,
  reglaSeleccionada:  T.number,
  componentesEspeciales:     T.array,
  configuracionCampos: T.array,
};

export default compose(
  withStyles(styles),
)(CamposRegla);