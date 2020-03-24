import React from 'react';
import T from 'prop-types';
// import { uniqueId} from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
// import Input from 'components/FormInput';
// import Modal from 'components/Dialog/alertDialog';
// import Seleccion from 'components/Seleccion';
import {
  Grid,
  Typography,
  // AppBar,
} from '@material-ui/core';

// import Modal from 'components/Dialog/alertDialog';
import DataTable from 'components/DataTable';
// import PruebaTabla from "../PruebaTabla";
import imageLogo from 'images/logo/fincamex-logo.png'
import'./styles.css'



const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
  padding: {
    padding: 8,
    height: '100%',
  },
  principal: {
    padding: 8,
    height: '100%',
  },
  tab: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 1,
  },
  nubesita: {
    color : '#F9AA33',
  },
  nubesitaTriste: {
    color : 'rgba(0, 0, 0, 0.26)',
  },
  success: {
    backgroundColor: '#28950F',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#1d7109',
    },
    color: 'white',
  },
  leftIcon: {
    marginRight: 8,
  },
  typography:{
    textTransform:'inherit',
  },
})

function ConfiabilidadInventario(props){
  const {
    classes,
    datos,
    cabeceras,
  } = props;
  const configuracion = {
    buscar : false,
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'none',
    paginado: false,
    responsivo: "scroll",
  };
  return (
    <div
      id="containerPDF"
      style={{
        margin:'10px 0px 20px 0px',
      }}
    >
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={
          {
            paddingTop: 4,
            // height: '100%',
          }
        }
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >                      
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            direction="column"
            // justify="center"
            // alignItems="center"
            // style={{ backgroundColor:'green'}}
          >
            <img
              key="imagenKey"
              // styles={classes.image}
              src={imageLogo}
              alt="logo"
              style={{width: '300px'}}
            />
          </Grid>
          <Grid
            container
            // direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography
              variant='h6'
              className={classes.typography}
            >
                RESULTADOS Y CALCULO DE CONFIABILIDAD DE INVENTARIOS
            </Typography>
          </Grid>

          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            // style={{ backgroundColor:'red'}}
          >
            <Grid
              container
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              justify="flex-end"
              alignItems="flex-end"
              // style={{ backgroundColor:'blue'}}
            >
              <Typography
                variant='subtitle2'
                className={classes.typography}
              >
                SUCURSAL
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
              <Typography
                variant='body1'
                className={classes.typography}
              >
                {datos.datosEncabezado[0].Sucursal}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              justify="flex-end"
              alignItems="flex-end"
              // style={{ backgroundColor:'blue'}}
            >
              <Typography
                variant='subtitle2'
                className={classes.typography}
              >
                FECHA
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
              <Typography
                variant='body1'
                className={classes.typography}
              >
                {datos.datosEncabezado[0].Fecha}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            // style={{ backgroundColor:'red'}}
          >
            <Grid
              container
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              justify="flex-end"
              alignItems="flex-end"
              // style={{ backgroundColor:'blue'}}
            >
              <Typography
                variant='subtitle2'
                className={classes.typography}
              >
                INVENTARIO
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
              <Typography
                variant='body1'
                className={classes.typography}
              >
                {datos.datosEncabezado[0].Inventario}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              justify="flex-end"
              alignItems="flex-end"
              // style={{ backgroundColor:'blue'}}
            >
              <Typography
                variant='subtitle2'
                className={classes.typography}
              >
                PERIODO EVALUADO
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
              <Typography
                variant='body1'
                // className={classes.typography}
              >
                {datos.datosEncabezado[0].NombrePeriodo}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            // style={{ backgroundColor:'red'}}
          >
            <Grid
              container
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              justify="flex-end"
              alignItems="flex-end"
              // style={{ backgroundColor:'blue'}}
            >
              {/* <Typography
                variant='subtitle2'
                className={classes.typography}
              >
                JEFE DE ALMACÉN
              </Typography> */}
            </Grid>
            <Grid
              container
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
              {/* <Typography
                variant='body1'
                className={classes.typography}
              >
                {datos.datosEncabezado[0].JefeAlmacen}
              </Typography> */}
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            // style={{ backgroundColor:'red'}}
          >
            <Grid
              container
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              direction="column"
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
              <Grid
                container
                // direction="column"
                justify="center"
                alignItems="center"
              >
                <DataTable
                  data = {datos.datosFamiliaImporte}
                  headers = {cabeceras.headerFamiliaImporte}
                  configuracion = {configuracion}
                  idPosition = "0"
                  elevacion={0}
                  admin
                  params= {
                    {
                      // height: 20,
                      backgroundColor: 'white',
                      mostrarBarra: false,
                    }
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={1}
              sm={1}
              md={1}
              lg={1}
              xl={1}
              direction="column"
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            />
            <Grid
              container
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              direction="column"
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
              <Grid
                container
                // direction="column"
                justify="center"
                alignItems="center"
              >
                <DataTable
                  data = {datos.datosFamiliaItems}
                  headers = {cabeceras.headerFamiliaItems}
                  configuracion = {configuracion}
                  idPosition = "0"
                  elevacion={0}
                  admin
                  params= {
                    {
                      // height: 20,
                      backgroundColor: 'white',
                      mostrarBarra: false,
                    }
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            // style={{ backgroundColor:'red'}}
          >
            <Grid
              container
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              direction="column"
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
              <Grid
                container
                // direction="column"
                justify="center"
                alignItems="center"
              >
                <DataTable
                  data = {datos.datosCostoInventario}
                  headers = {cabeceras.headerCostoInventario}
                  configuracion = {configuracion}
                  idPosition = "0"
                  elevacion={0}
                  admin
                  params= {
                    {
                      // height: 20,
                      backgroundColor: 'white',
                      mostrarBarra: false,
                    }
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={1}
              sm={1}
              md={1}
              lg={1}
              xl={1}
              direction="column"
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            />
            <Grid
              container
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              direction="column"
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
              <Grid
                container
                // direction="column"
                justify="center"
                alignItems="center"
              >
                <DataTable
                  data = {datos.datosTotalConteo}
                  headers = {cabeceras.headerTotalConteo}
                  configuracion = {configuracion}
                  idPosition = "0"
                  elevacion={0}
                  admin
                  params= {
                    {
                      // height: 20,
                      backgroundColor: 'white',
                      mostrarBarra: false,
                    }
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            // style={{ backgroundColor:'red'}}
          >
            <Grid
              container
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              direction="column"
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
            </Grid>
            <Grid
              container
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              direction="column"
              justify="center"
              alignItems="center"
              // style={{ backgroundColor:'blue'}}
            >
              <Grid
                container
                // direction="column"
                justify="center"
                alignItems="center"
              >
                <DataTable
                  data = {datos.datosConteosRealizados}
                  headers = {cabeceras.headerTotalConteosRealizados}
                  configuracion = {configuracion}
                  idPosition = "0"
                  elevacion={0}
                  admin
                  params= {
                    {
                      // height: 20,
                      backgroundColor: 'white',
                      mostrarBarra: false,
                    }
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

ConfiabilidadInventario.propTypes = {
//   pestañaSeleccionada: T.number,
  classes: T.object,
  datos: T.object,
  cabeceras: T.object,
};



export default compose(
  withStyles(styles),
  withHandlers({
    // onInputChangeAccesorioProxy: (props) => (id) => (e) => {
    //   const {
    //     onInputChangeAccesorio,
    //   } = props;
    //   let {
    //     target: {
    //       value,
    //     },
    //   } = e;
      
    //   if(id !== 0){
    //     value = value <= 0 && value !== '' ? 0 : value;
    //   }

    //   onInputChangeAccesorio(id, value);
    // },
  })
)(ConfiabilidadInventario);
