import React from 'react';
import T from 'prop-types';
import { MenuItem, TextField, Grid, Button } from '@material-ui/core';
import green from '@material-ui/core/colors/green'
import {
  FormContainer,
  Container,
} from './styledComponents';
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';

// eslint-disable-next-line react/prefer-stateless-function
export class MaterialNuevo extends React.Component {
  

  render() {
    const {
      guardarMaterial,
      regresarAction,
      agrupadores,
      setAgrupadorAction,
      agrupadorSlc,
      setNombreAction,
      setPrecioAction,
      setStockMinimoAction,
      setStockMaximoAction,
      materialNuevo,
      update,
      actualizarMaterialAction,
      closeModalAction,
      openModalAction,
      openModal,
    } = this.props;
    return (
      <React.Fragment>
        <Container>
          <FormContainer style={{maxWidth: "calc(100% - 16px)", margin: 8}}>
            <Grid
              container
              alignItems="center"
            >
              <Grid
                container
                item
                xs={12}
                spacing={16}
              >
                <Grid
                  item
                  xs={6}
                >
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Módulo"
                    margin="normal"
                    onChange={setAgrupadorAction}
                    error={materialNuevo.idAgrupador.error}
                    helperText={materialNuevo.idAgrupador.texto}
                    value={agrupadorSlc}
                    fullWidth
                    name="agrupador"
                  >
                    {agrupadores.map(agrupador => (
                      <MenuItem key={agrupador.IdAgrupador} value={agrupador.IdAgrupador}>
                        {agrupador.Nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <TextField
                    id="standard-name"
                    label="Nombre material"
                    onChange={setNombreAction}
                    value={materialNuevo.nombre.value}
                    error={materialNuevo.nombre.error}
                    helperText={materialNuevo.nombre.texto}
                    type="text"
                    fullWidth
                    margin="normal"
                    name="nombre"
                  />
                </Grid> 
            
                <Grid
                  item
                  xs={6}
                  container
                  direction="column"
                >
                  <TextField
                    id="standard-name"
                    label="Precio material"
                    margin="normal"
                    max="7"
                    value={materialNuevo.precio.value}
                    error={materialNuevo.precio.error}
                    helperText={materialNuevo.precio.texto}
                    onChange={setPrecioAction}
                    type="number"
                    fullWidth
                    name="precio"
                  />
                </Grid> 
                <Grid
                  item
                  xs={3}
                  container
                >
                  <TextField
                    id="standard-name"
                    label="Stock mínimo"
                    value={materialNuevo.stockMinimo.value}
                    onChange={setStockMinimoAction}
                    margin="normal"
                    error={materialNuevo.stockMinimo.error}
                    helperText={materialNuevo.stockMinimo.texto}
                    type="number"
                    fullWidth
                    name="stockMinimo"
                  />
                </Grid> 
                <Grid
                  item
                  xs={3}
                  container
                >
                  <TextField
                    id="standard-name"
                    label="Stock máximo"
                    value={materialNuevo.stockMaximo.value}
                    onChange={setStockMaximoAction}
                    margin="normal"
                    error={materialNuevo.stockMaximo.error}
                    helperText={materialNuevo.stockMaximo.texto}                    
                    type="number"
                    fullWidth
                    name="stockMaximo"
                  />
                </Grid>
              </Grid>
              <div style={{width : '100%'}}>
                {
                  !update ? 
                    (
                      <Button
                        size="small"
                        style={{background: green[500], color: '#fff', marginTop: 30, float: 'right', display: 'block'}}
                        onClick={guardarMaterial}
                      >
                        Guardar
                      </Button>
                    ):
                    update && 
                    (
                      <Button
                        size="small"
                        style={{background: green[500], color: '#fff', marginTop: 30, float: 'right', display: 'block'}}
                        onClick={actualizarMaterialAction}
                      >
                        Actualizar
                      </Button>
                    ) 
                }
                <Button
                  size="small"
                  style={{background: '#d50000', color: '#fff', marginTop: 30, marginRight:15, float: 'right', display: 'block'}}
                  
                  onClick={
                    agrupadorSlc.length !== 0 || materialNuevo.nombre.value .length !== 0 || materialNuevo.precio.value .length !== 0 || materialNuevo.stockMinimo.value .length !== 0 || materialNuevo.stockMaximo.value .length !== 0 ? openModalAction : regresarAction
                  }
                >
                  Cerrar
                </Button>
              </div>
            </Grid>
          </FormContainer>
        </Container>
        <Modal  
          open={openModal} 
          typeAlert='Report' 
          typeOptions='Select' 
          title='Confirmar....' 
          message='Existen datos no guardados, ¿Desea continuar?' 
          onClickAccept={regresarAction} 
          onClickCancel={closeModalAction} 
        />
      </React.Fragment> 
    );
  }
}

MaterialNuevo.propTypes = {
  guardarMaterial: T.func,
  regresarAction: T.func,
  agrupadores: T.array,
  agrupadorSlc: T.array,
  setAgrupadorAction: T.func,
  setNombreAction: T.func,
  setPrecioAction: T.func,
  setStockMinimoAction: T.func,
  setStockMaximoAction: T.func,
  materialNuevo: T.object,
  update: T.bool,
  actualizarMaterialAction: T.func,
  closeModalAction: T.func,
  openModalAction: T.func,
  openModal: T.bool,
};

export default MaterialNuevo;
