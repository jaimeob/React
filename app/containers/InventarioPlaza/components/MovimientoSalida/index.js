import React from 'react';
import T from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {Button} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip'; 
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import Tabla from '../../../../components/TablaPedidos';
import { Container } from './styledComponents';
import Modal from './components/Modal';
import ModalCancelar from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';

// eslint-disable-next-line react/prefer-stateless-function
export class MovimientoSalida extends React.Component {

  render() {

    const {
      getMaterialesAction,
      agregarArticuloAction,
      removeRowAction,
      postMovimientosAction,
      cabeceras,
      articulos,
      agrupadores,
      agrupadorSlc,
      modal,
      modal2,
      modal3,
      modal4,
      movimiento,
      setRowCantidadAction,
      setRowComentarioAction,
      regresarAction,
      openModalAction,
      closeModalAction,
      addByIdAction,
      setIdAction,
      setModuloAction,
      setArticuloAction,
      setComentarioAction,
      setCantidadAction,
      materialSlc,
      error,
      disabled,
      openModal2Action,
      closeModal2Action,
      openModal3Action,
      closeModal3Action,
      openModal4Action,
      closeModal4Action,
    } = this.props;

    return (
      <React.Fragment>
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}> 
            <Typography variant="h6" color="primary" style={{flexGrow: 1}}> 
              Registrar salida
            </Typography> 
          </Toolbar> 
        </AppBar>
        <Container
          container
          style={{ padding: 8}}>
          
          <Paper
            style= {{
              width: '100%',
              marginTop: 15,
              overflowX: 'auto',
              padding: 15,
            }}
          >
            <h2 style={{marginBottom:0}}>Registrar salida de Inventario</h2>
            <h3 style={{marginTop:0}}>Plaza : {movimiento.plaza.Nombre}</h3>
            <div style={{textAlign: 'right'}}>
              <Tooltip title="Agregar" placement="bottom-end"> 
                <IconButton onClick={openModalAction}> 
                  <AddCircleOutlineIcon /> 
                </IconButton>
              </Tooltip>
            </div>
            <Tabla
              cabeceras={cabeceras}
              rows={movimiento.rows}
              removerRegistro={openModal4Action}
              setRowCantidadAction={setRowCantidadAction}
              setRowComentarioAction={setRowComentarioAction}
            />

            <Button
              size="small"
              style={{background: green[500], color: '#fff', marginTop: 30, float: "right"}}
              component="span"
              type="submit"
              onClick={postMovimientosAction}
            >
              Guardar
            </Button>
            <Button
              size="small"
              style={{background: '#d50000', color: '#fff', marginTop: 30, float: "right", marginRight:15}}
              component="span"
              type="submit"
              onClick={
                movimiento.rows.length !== 0  ? openModal2Action : regresarAction
              }
            >
              Cerrar
            </Button>
            <Modal  
              modal={modal}
              modal3={modal3}
              closeModalAction={closeModalAction}
              agrupadores={agrupadores}
              agrupadorSlc={agrupadorSlc}
              getMaterialesAction={getMaterialesAction}
              articulos={articulos}
              addByIdAction={addByIdAction}
              datos={movimiento.datos}
              setIdAction={setIdAction}
              setModuloAction={setModuloAction}
              setArticuloAction={setArticuloAction}
              setComentarioAction={setComentarioAction}
              setCantidadAction={setCantidadAction}
              materialSlc={materialSlc}
              agregarArticuloAction={agregarArticuloAction}
              error={error}
              disabled={disabled}
              openModal3Action={openModal3Action}
              closeModal3Action={closeModal3Action}
            />
            <ModalCancelar  
              open={modal2} 
              typeAlert='Report' 
              typeOptions='Select' 
              title='Confirmar....' 
              message='¿Está seguro que desea cerrar el movimiento?' 
              onClickAccept={regresarAction} 
              onClickCancel={closeModal2Action} 
            />
            <ModalCancelar  
              open={modal4} 
              typeAlert='Report' 
              typeOptions='Select' 
              title='Confirmar....' 
              message='¿Está seguro que desea cerrar el movimiento?' 
              onClickAccept={()=>removeRowAction(movimiento.row)} 
              onClickCancel={closeModal4Action} 
            />
          </Paper>
            
        </Container>
      </React.Fragment> 
    );
  }
}
MovimientoSalida.propTypes = {
  getMaterialesAction: T.func,
  agregarArticuloAction: T.func,
  removeRowAction: T.func,
  postMovimientosAction: T.func,
  cabeceras: T.array,
  articulos: T.array,
  agrupadores: T.array,
  agrupadorSlc: T.array,
  modal: T.bool,
  modal2: T.bool,
  modal3: T.bool,
  modal4: T.bool,
  movimiento: T.object,
  setRowCantidadAction: T.func,
  setRowComentarioAction: T.func,
  regresarAction: T.func,
  openModalAction: T.func,
  closeModalAction: T.func,
  addByIdAction: T.func,
  setIdAction: T.func,
  setModuloAction: T.func,
  setArticuloAction: T.func,
  setComentarioAction: T.func,
  setCantidadAction: T.func,
  materialSlc: T.array,
  error: T.object,
  disabled: T.func,
  openModal2Action: T.func,
  closeModal2Action: T.func,
  openModal3Action: T.func,
  closeModal3Action: T.func,
  openModal4Action: T.func,
  closeModal4Action: T.func,
};
export default (MovimientoSalida);
