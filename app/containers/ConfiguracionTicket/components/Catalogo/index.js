/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import T from 'prop-types';
import { 
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControl,
  Card,
  Typography,
  Divider,
  FormControlLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Switch from 'components/Switch'
import { Container } from '../../styledComponents';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  fab: {
    margin: theme.spacing.unit,
  },
  icon: {
    // margin: theme.spacing.unit * 1,
    fontSize: 35,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: 'white',
    },
  },
});

export class Catalogo extends React.Component{
  componentDidMount(){
    const {
      obtenerCatalogos,
    } = this.props;
    obtenerCatalogos();
  }
  
  render() {
    const {
      titulo,
      divSelecionado,
      requerido,
      relacionaOtro,
      requeridoRelacion,
      onChangeObligatorio,
      onChangeSwitchRelacion,
      onChangeSwitchRelacionaOtro,
      valorNumero,
      error,
      // eslint-disable-next-line no-unused-vars
      helpertext,
      arrCatalogos,
      onChangeValueCatalogo,
    } = this.props;

    console.log('relacionaOtro ', relacionaOtro,' rrequeridoRelacion ',requeridoRelacion,);
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
              <Container
                // alignItem="center"
              >
                <Grid item md={11}>
                  <Typography inline variant="subtitle1" gutterBottom>
                    {titulo}
                    <Divider />
                  </Typography>
                </Grid>
                {/* <Grid item md={1}>
                  <Tooltip title="Agregar">
                    <Fab
                      size="small"
                      onClick={
                        () => {
                          arrRelaciones[arrRelaciones.length-1].relacion !== '' ?
                            agregarRelacion(divSelecionado)
                            : notificacion({
                              message: 'Seleccione Relacion',
                              options: {
                                variant: 'warning',
                              },
                            })
                        }
                      }
                      aria-label="Add"
                      className={this.props.classes.fab}
                      style={{
                        color: '#F7F7F7',
                        backgroundColor:'#616161',
                      }}
                    >
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                </Grid> */}
              </Container>
              <Container
                flexDirection="column"
                style={{
                  marginTop:'10px',
                }}
              >
                <Grid item xs={5} sm={5} md={5}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="catalogo">Catálogo</InputLabel>
                    <Select
                      inputProps={{
                        name: "catalogo",
                        id: `select_catalogo`,
                      }}
                      // disabled = {index > 0}
                      style={{
                        fontSize:'0.8rem',
                      }}
                      key='catalogo'
                      value={valorNumero === -1 ? '' : valorNumero}
                      onChange={onChangeValueCatalogo(divSelecionado)}
                      error={error}>
                      
                      {arrCatalogos.map((catalogo,idxCat) => (
                        <MenuItem 
                          // disabled = {catalogo.IdCatalogo === arrRelaciones[index].relacion}
                          // disabled = {arrCombosSeleccionados.includes(catalogo.IdCatalogo)}
                          value={catalogo.IdCatalogo}
                          key={`texto_catalogo_${idxCat}`}
                        >
                          {catalogo.Nombre}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* {index > 0 ? null : <FormHelperText>*Requerido</FormHelperText>} */}
                  </FormControl>
                </Grid>
                {/* {
                  arrRelaciones.map((relacion,index) => (
                    <div
                      key={`div_${index}`}
                    >
                      <Container
                        flexDirection='row'
                        style={{
                          marginTop:'10px',
                        }}
                      >
                        <Grid item xs={5} sm={5} md={5}>
                          <FormControl fullWidth>
                            <InputLabel htmlFor="catalogo">Catálogo</InputLabel>
                            <Select
                              inputProps={{
                                name: "catalogo",
                                id: `select_catalogo${index}`,
                              }}
                              disabled = {index > 0}
                              key={`catalogo_${index}`}
                              value={relacion.catalogo}
                              onChange={onChangeValueCatalogo(divSelecionado,index)}>
                              {arrCatalogos.map((catalogo,idxCat) => (
                                <MenuItem 
                                  // disabled = {catalogo.IdCatalogo === arrRelaciones[index].relacion}
                                  disabled = {arrCombosSeleccionados.includes(catalogo.IdCatalogo)}
                                  value={catalogo.IdCatalogo}
                                  key={`texto_catalogo_${idxCat}`}
                                >
                                  {catalogo.Nombre}
                                </MenuItem>
                              ))}
                            </Select>
                            {index > 0 ? null : <FormHelperText>*Requerido</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} style={{ paddingLeft:'20px' }}>
                          <FormControl fullWidth>
                            <InputLabel htmlFor="relacion">Relación</InputLabel>
                            <Select
                              inputProps={{
                                name: "relacion",
                                id: `select_relacion${index}`,
                              }}
                              disabled = {!requeridoRelacion}
                              key={`relacion_${index}`}
                              value={relacion.relacion}
                              onChange={onChangeValueCatalogo(divSelecionado,index)}>
                              {arrCatalogos.map((catalogo,idxRel) => (
                                <MenuItem 
                                  // disabled = {catalogo.IdCatalogo === arrRelaciones[index].catalogo}
                                  disabled = {arrCombosSeleccionados.includes(catalogo.IdCatalogo)}
                                  // disabled = {
                                  //   // arrRelaciones.includes(catalogo.IdCatalogo) ? true : false
                                  //   // arrRelaciones.map((rel) => catalogo.IdCatalogo === rel.relacion)
                                  // }
                                  value={catalogo.IdCatalogo}
                                  key={`texto_relacion_${idxRel}`}
                                >
                                  {catalogo.Nombre}
                                </MenuItem>
                              ))}
                            </Select>
                            {requeridoRelacion ? <FormHelperText>*Requerido</FormHelperText> : null}
                          </FormControl>
                        </Grid>
                        {/* {arrRelaciones.length > 1 ?
                          <Grid
                            style={{
                              padding: '11px 0px 0px 5px',
                            }}
                          >
                            <IconButton 
                              aria-label="Delete"
                              onClick={borrarRelacion(divSelecionado,index)}
                            >
                              <DeleteIcon 
                                fontSize="small"
                                color="primary"
                              />
                            </IconButton>
                          </Grid> : null
                        } 
                        
                      </Container>
                    </div>
                  ))
                } */}
              </Container>
              <Container
                container
                flexDirection='row'
                justify="flex-end"
              >
                <FormControlLabel
                  control={
                    <Switch
                      inputProps={{
                        name: "switchRelaciona",
                        id: `switch_relaciona`,
                      }}
                      checked={relacionaOtro}
                      color="secondary"
                      onChange={onChangeSwitchRelacionaOtro(divSelecionado)}
                    />
                  }
                  label="Relaciona"
                />
                <FormControlLabel
                  control={
                    <Switch
                      inputProps={{
                        name: "switchRelacion",
                        id: `switch_relacion`,
                      }}
                      checked={requeridoRelacion}
                      color="secondary"
                      onChange={onChangeSwitchRelacion(divSelecionado)}  
                    />
                  }
                  label="Relacionado"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={requerido}
                      color="secondary"
                      onChange={onChangeObligatorio(divSelecionado)}
                    />
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

Catalogo.propTypes = {
  titulo: T.string,
  divSelecionado: T.number,
  requerido: T.bool,
  relacionaOtro: T.bool,
  requeridoRelacion: T.bool,
  error:T.bool,
  onChangeObligatorio: T.func,
  valorNumero: T.number,
  // error: T.bool,
  helpertext: T.string,
  arrCatalogos: T.array,
  obtenerCatalogos: T.func,
  onChangeValueCatalogo: T.func,
  onChangeSwitchRelacion:  T.func,
  onChangeSwitchRelacionaOtro: T.func,
}

export default withStyles(styles)(Catalogo);
