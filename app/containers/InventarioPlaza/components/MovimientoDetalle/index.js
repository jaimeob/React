import React from 'react';
import T from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

import { Button } from '@material-ui/core';
import { Container } from './styledComponents';
import Tabla from '../../../../components/DataTable';

// eslint-disable-next-line react/prefer-stateless-function
export class MovimientoDetalle extends React.Component {

  render() {
    const {
      headers,
      movimientoDetalle,
      configuracion,
      regresarAction,
    } = this.props;
    return (
      <Container
        container
        item
        style={{ display: 'inline-block'}}>
        <AppBar style={{backgroundColor: grey[200]}} position="static"> 
          <Toolbar variant="dense" style={{paddingLeft: 8}}> 
            <Typography variant="h6" color="primary" style={{flexGrow: 1}}> 
              Detalle movimiento
            </Typography> 
          </Toolbar> 
        </AppBar>
        <Tabla
          data = {movimientoDetalle}
          headers = {headers}
          configuracion = {configuracion}
          opciones = {[{'icon' : 'ver'}]}
          admin
          small = {0}
        />
        <Button
          size="small"
          style={{background: '#d50000', color: '#fff', marginTop: 10, float: "right", marginRight:10}}
          component="span"
          type="submit"
          onClick={regresarAction}
        >
          Cerrar
        </Button>
      </Container>
    );
  }
}
MovimientoDetalle.propTypes = {
  headers: T.array,
  movimientoDetalle: T.array,
  configuracion: T.object,
  regresarAction: T.func,
};
export default MovimientoDetalle;