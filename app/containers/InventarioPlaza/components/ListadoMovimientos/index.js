import React from 'react';
import T from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { Container } from './styledComponents';
import Tabla from '../../../../components/DataTable';


// eslint-disable-next-line react/prefer-stateless-function
export class ListadoMovimientos extends React.Component {
  render() {
    const {
      headers,
      movimientos,
      configuracion,
      agregarNuevoAction,
      getMovimientoDetalleAction,
      permisos,
      usuarioGlobal: {
        IdPlaza,
      }
    } = this.props;
    
    return (
      <Container
        container
        item
        style={{ display: 'inline-block'}}>
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}> 
            <Typography variant="h6" color="primary" style={{flexGrow: 1}}> 
              Historial de entrada / salida
            </Typography> 
          </Toolbar> 
        </AppBar>
        <Tabla
          permisos={permisos}
          {...(IdPlaza !== 9 ? {
            onClickAgregar: () => {
              agregarNuevoAction()
            },
          } : {} )}
          data = {movimientos}
          headers = {headers}
          configuracion = {configuracion}
          idPosition = "IdMovimiento"
          opciones = {
            [
              {'icon' : 'ver', 'action': getMovimientoDetalleAction},
            ]
          }
          admin
          small = {0}
        />
      </Container>
    );
  }
}
ListadoMovimientos.propTypes = {
  headers: T.array,
  movimientos: T.array,
  configuracion: T.object,
  agregarNuevoAction: T.func,
  getMovimientoDetalleAction: T.func,
  permisos: T.object,
  usuarioGlobal: T.object,
};
export default ListadoMovimientos;
