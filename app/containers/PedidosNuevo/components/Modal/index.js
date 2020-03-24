import React from 'react';
import T from 'prop-types';
import {Grid, TextField, Button, Typography, MenuItem} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ModalCancelar from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 10,
    outline: 'none',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    marginTop: 0,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  backdrop :{
    pointerEvents: 'none',
  },
});

// eslint-disable-next-line react/prefer-stateless-function
export class ModalPedidos extends React.Component {
  

  render() {;

    const {
      modal,
      modal3,
      closeModalAction,
      closeModal3Action,
      openModal3Action,
      classes,
      agrupadores,
      getMaterialesAction,
      articulos,
      addByIdAction,
      datos,
      setIdAction,
      agrupadorSlc,
      // setModuloAction,
      setArticuloAction,
      setComentarioAction,
      setCantidadAction,
      materialSlc,
      agregarArticuloAction,
      error,
      disabled,
    } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modal}
          onClose={closeModalAction}
          BackdropProps={{
            classes: {
              root: classes.backdrop,
            },
          }}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div style={{background: "#E0E0E0", padding: "5px 0", marginBottom: 10}}>
              <Typography variant="h6" style={{marginLeft: 30}}>Agregar artículo</Typography>
            </div>
            <div style={{padding: "0 24px"}}>
              <Grid
                container
                xs={12}
              >
                <Grid
                  xs={6}
                  item
                >
                  <TextField
                    id="standard-name"
                    label="ID"
                    className={classes.textField}
                    margin="normal"
                    type="number"
                    value={datos.Id}
                    onChange={setIdAction}
                    onKeyDown={event => {
                      if (event.keyCode === 13 || event.keyCode === 9) {
                        addByIdAction(datos.Id)
                      }
                    }}
                  />
                </Grid>
                <Grid
                  xs={6}
                  item
                >
                </Grid>
                <Grid
                  xs={6}
                  item
                >
                  <TextField
                    style={{marginTop:0}}
                    id="standard-select-currency"
                    select
                    label="Módulo"
                    margin="normal"
                    className={classes.textField}
                    fullWidth
                    onChange={getMaterialesAction}
                    value={agrupadorSlc}
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
                  xs={6}
                  item
                >
                  <TextField
                    style={{marginTop:0}}
                    id="standard-select-currency"
                    select
                    label="Artículo"
                    margin="normal"
                    className={classes.textField}
                    fullWidth
                    name="Articulo"
                    onChange={setArticuloAction}
                    value={materialSlc}
                  >
                    {articulos.map(articulo => (
                      <MenuItem key={articulo.IdArticulo} value={articulo.IdArticulo}>
                        {articulo.Nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  xs={6}
                  item
                >
                  <TextField
                    id="standard-name"
                    label="Cantidad"
                    type="number"
                    error={error.value}
                    helperText={error.texto}
                    disabled={disabled}
                    value={datos.Cantidad}
                    className={classes.textField}
                    onChange={setCantidadAction}
                    margin="normal"
                  />
                </Grid>
                <Grid
                  xs={6}
                  item
                >
                </Grid>
                <Grid
                  xs={3}
                  item
                >
                  <div
                    style={{textAlign: "center", fontSize: 14, marginTop:15}}
                  >
                    Existencia actual
                  </div>
                  <div
                    style={{textAlign: "center", fontSize: 25, marginBottom: 15}}
                  >
                    {datos.Existencia}
                  </div>
                </Grid>
                <Grid
                  xs={3}
                  item
                >
                  <div
                    style={{textAlign: "center", fontSize: 14, marginTop:15}}
                  >
                    Por autorizar
                  </div>
                  <div
                    style={{textAlign: "center", fontSize: 25, marginBottom: 15}}
                  >
                    {datos.CantidadSolicitada}
                  </div>
                </Grid>
                <Grid
                  xs={3}
                  item
                >
                  <div
                    style={{textAlign: "center", fontSize: 14, marginTop:15}}
                  >
                    Por recibir
                  </div>
                  <div
                    style={{textAlign: "center", fontSize: 25, marginBottom: 15}}
                  >
                    {datos.CantidadAutorizada}
                  </div>
                </Grid>
                <Grid
                  xs={3}
                  item
                >
                  <div
                    style={{textAlign: "center", fontSize: 14, marginTop:15}}
                  >
                    Stock máximo
                  </div>
                  <div
                    style={{textAlign: "center", fontSize: 25, marginBottom: 15}}
                  >
                    {datos.StockMaximo}
                  </div>
                </Grid>
                <Grid
                  xs={12}
                  item
                >
                  <TextField
                    id="filled-multiline-static"
                    label="Comentario"
                    multiline
                    rows="4"
                    value={datos.Comentario}
                    className={classes.textField}
                    onChange={setComentarioAction}
                    style={{width:"calc(100% - 8px)", background: "transparent"}}
                    margin="normal"
                    variant="filled"
                  />
                </Grid>
                <Grid
                  xs={12}
                >
                  <Button
                    size="small"
                    style={{background: "#4caf50", color: '#fff', float: "right"}}
                    component="span"
                    type="submit"
                    onClick={()=>agregarArticuloAction(datos)}
                  >
                    Agregar
                  </Button>
                  <Button
                    size="small"
                    style={{background: '#d50000', color: '#fff', float: "right", marginRight:15}}
                    component="span"
                    type="submit"
                    onClick={
                      datos.Id.length !== 0 || agrupadorSlc.length !== 0 || materialSlc.length !== 0 || datos.Cantidad.length !== 0  ? openModal3Action : closeModalAction
                    }
                  >
                    Cerrar
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </Modal>
        <ModalCancelar  
          open={modal3} 
          typeAlert='Report' 
          typeOptions='Select' 
          title='Confirmar....' 
          message='Existen datos no guardados, ¿Desea continuar?' 
          onClickAccept={closeModalAction} 
          onClickCancel={closeModal3Action} 
        />
      </div>
    );
  }
}
ModalPedidos.propTypes = {
  modal: T.bool,
  modal3: T.bool,
  closeModalAction: T.func,
  closeModal3Action: T.func,
  openModal3Action: T.func,
  classes: T.object.isRequired,
  agrupadores: T.array,
  getMaterialesAction: T.func,
  articulos: T.array,
  addByIdAction: T.func,
  datos: T.object,
  setIdAction: T.func,
  // setModuloAction: T.func,
  setArticuloAction: T.func,
  setComentarioAction: T.func,
  setCantidadAction: T.func,
  agrupadorSlc: T.array,
  materialSlc: T.array,
  agregarArticuloAction: T.func,
  error: T.object,
  disabled: T.bool,
};
const SimpleModalWrapped = withStyles(styles)(ModalPedidos);
export default SimpleModalWrapped;