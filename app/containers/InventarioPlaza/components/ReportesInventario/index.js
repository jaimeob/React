import React from 'react';
import T from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line no-unused-vars
import styles from '../../styles.css';
import { Container } from './styledComponents';

import Tabla from '../../../../components/DataTable';

// eslint-disable-next-line react/prefer-stateless-function
export class ReportesInventario extends React.Component {

  render() {
    const {
      headers,
      reportes,
      configuracion,
    } = this.props;

    return (
      <React.Fragment>
        <Container
          container
          item
          style={{ display: 'inline-block', backgroundColor:'#ece6e6'}}>
          <AppBar style={{backgroundColor: 'rgb(238, 238, 238)'}} position="static">
            <Toolbar>
              <Typography  variant="h6" gutterBottom style={{marginBottom: 0, lineHeight: 0}}>
              Reporte de Inventario
              </Typography>
            </Toolbar>
          </AppBar>
          <Tabla
            data = {reportes}
            headers = {headers}
            configuracion = {configuracion}
            opciones = {[{'icon' : 'ver'}]}
            admin
            small = {0}
          />
        </Container>
      </React.Fragment> 
    );
  }
}

ReportesInventario.propTypes = {
  headers: T.array,
  reportes: T.array,
  configuracion: T.object,
};

export default ReportesInventario;
