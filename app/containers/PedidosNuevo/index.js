/**
 *
 * PedidosNuevo
 *
 */

import React from 'react';
import T from 'prop-types';
import { DAEMON } from 'utils/constants';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
import { Redirect} from 'react-router-dom'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip'; 
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import withNotifier from 'components/HOC/withNotifier';
import {enqueueSnackbar} from 'reducers/notifications/actions';
import Tabla from '../../components/TablaPedidos';
import makeSelectPedidosNuevo from './selectors';
import saga from './saga';
import Actions from './actions';
import reducer from './reducer';
import { Container } from './styledComponents';
import Modal from './components/Modal';
import ModalCancelar from '../Formularios/components/ListadoFormulario/components/Modal/alertDialog';



/* eslint-disable react/prefer-stateless-function */
export class PedidosNuevo extends React.Component {

  handleChange = agrupador => event => {
    this.setState({ [agrupador]: event.target.value });
  };
  
  componentWillMount() {
    const {
      actions: {
        getAgrupadoresAction,
        getPlazaAction,
      },
    } = this.props;
    getAgrupadoresAction()
    getPlazaAction()
  }

  componentWillUnmount() {
    const {
      actions: {
        limpiarStateAction,
      },
    } = this.props;
    limpiarStateAction();
  }

  render() {
    const {
      actions : {
        getMaterialesAction,
        agregarArticuloAction,
        removeRowAction,
        postPedidosAction,
        setRowCantidadAction,
        setRowComentarioAction,
        openModalAction,
        openModal2Action,
        openModal3Action,
        openModal4Action,
        regresarAction,
        closeModalAction,
        closeModal2Action,
        closeModal3Action,
        closeModal4Action,
        addByIdAction,
        setIdAction,
        setModuloAction,
        setArticuloAction,
        setComentarioAction,
        setCantidadAction,
      },
      pedidosNuevo : {
        pedidosNuevoTabla :{
          cabeceras,
          articulos,
          agrupadores,
          agrupadorSlc,
          modal,
          modal2,
          modal3,
          modal4,
          pedido,
          guardo,
          materialSlc,
          error,
          disabled,
          regresar,
        },
      },
      enqueueSnackbar : enqueueSnackbarAction,
    } = this.props;

    if(guardo)
      return <Redirect to={{pathname: '/pedidos-detalle'}}/>
    if(regresar)
      return <Redirect to={{pathname: '/pedidos-detalle'}}/>;
    return (
      <div>
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}> 
            <Typography variant="h6" color="primary" style={{flexGrow: 1}}> 
              Registrar pedido
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
            <h2 style={{marginBottom:0}}>Registrar pedido de materiales</h2>
            <h3 style={{marginTop:0}}>Plaza : {pedido.plaza.Nombre}</h3>
            <div style={{textAlign: 'right'}}>
              <Tooltip title="Agregar" placement="bottom-end"> 
                <IconButton onClick={openModalAction}> 
                  <AddCircleOutlineIcon /> 
                </IconButton>
              </Tooltip>
            </div>
            <Tabla
              cabeceras={cabeceras}
              rows={pedido.rows}
              removerRegistro={openModal4Action}
              setRowCantidadAction={setRowCantidadAction}
              setRowComentarioAction={setRowComentarioAction}
            />

            <Button
              size="small"
              style={{background: green[500], color: '#fff', marginTop: 30, float: "right"}}
              component="span"
              type="submit"
              onClick={postPedidosAction}
            >
              Guardar
            </Button>
            <Button
              size="small"
              style={{background: '#d50000', color: '#fff', marginTop: 30, float: "right", marginRight:15}}
              component="span"
              type="submit"
              onClick={
                pedido.rows.length !== 0  ? openModal2Action : regresarAction
              }
            >
              Cerrar
            </Button>
            <Modal
              notificacion={enqueueSnackbarAction}
              modal={modal}
              closeModalAction={closeModalAction}
              agrupadores={agrupadores}
              agrupadorSlc={agrupadorSlc}
              getMaterialesAction={getMaterialesAction}
              articulos={articulos}
              addByIdAction={addByIdAction}
              datos={pedido.datos}
              setIdAction={setIdAction}
              setModuloAction={setModuloAction}
              setArticuloAction={setArticuloAction}
              setComentarioAction={setComentarioAction}
              setCantidadAction={setCantidadAction}
              materialSlc={materialSlc}
              agregarArticuloAction={agregarArticuloAction}
              error={error}
              disabled={disabled}
              modal3={modal3}
              openModal3Action={openModal3Action}
              closeModal3Action={closeModal3Action}
            />
            <ModalCancelar  
              open={modal2} 
              typeAlert='Report' 
              typeOptions='Select' 
              title='Confirmar....' 
              message='¿Está seguro que desea cerrar el pedido?' 
              onClickAccept={regresarAction} 
              onClickCancel={closeModal2Action} 
            />
            <ModalCancelar  
              open={modal4} 
              typeAlert='Report' 
              typeOptions='Select' 
              title='Confirmar....' 
              message='¿Está seguro que desea eliminar el artículo?' 
              onClickAccept={()=>removeRowAction(pedido.row)} 
              onClickCancel={closeModal4Action} 
            />
          </Paper>
          
        </Container>
      </div>
    );
  }
}

PedidosNuevo.propTypes = {
  actions: T.object,
  pedidosNuevo: T.object,
  enqueueSnackbar: T.func,
};

const mapStateToProps = createStructuredSelector({
  pedidosNuevo: makeSelectPedidosNuevo(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
  }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'pedidosNuevo', reducer });
const withSaga = injectSaga({ key: 'pedidosNuevo', saga,  mode:DAEMON});

const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
)(PedidosNuevo);
