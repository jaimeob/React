import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  FormControl,
  // Button,
  // Typography,
  InputAdornment,
} from '@material-ui/core';
import { withHandlers } from 'recompose';
import Input from 'components/FormInput';
import Modal from 'components/Dialog/alertDialog';
import Seleccion from 'components/Seleccion';
import Success from 'components/BotonSuccess'
// import Nubesita from '@material-ui/icons/CloudUpload';
// import UploadFile from 'utils/lib/components/uploadFile';
import Cancelar from 'components/BotonCancelar'
import DataTable from 'components/DataTable'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
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
})

function PestanaSecciones(props){
  const {
    pestana,
    plantas,
    secciones,
    tipos,
    onInputChange,
    onInputChangeAccesorio,
    onInputChangePieza,
    // onUploadedFileProxy,
    onClickAgregarProxy,
    onClickAgregarPieza,
    onClickSiguiente,
    onEditarPieza,
    onEliminarAccesorio,
    // onClickAgregar,
    onEditarAccesorio,
    // onClickCancelarAccesorio,
    onClickCerrar,
    onClickGuardarProxy,
    onEditarAccesorioProxy,
    onEditarPiezaProxy,
    onClickCancelarAccesorioProxy,
    onEliminarAccesorioProxy,
    // classes,
  } = props;
  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'none',
    paginado: false,
    responsivo: "scroll",
    ordenar: false,
  };
  

  let funcModal = secciones.bandModal === 1 ? 
    onClickCerrar(false) : 
    onEditarAccesorioProxy(false);
  funcModal = secciones.bandModal === 3 ? onClickCancelarAccesorioProxy(false) :
    funcModal;
  funcModal = secciones.bandModal === 5 ? onEditarPiezaProxy(false) :
    funcModal;
  
  let funcModalCancelar = secciones.bandModal === 1 ? 
    onClickCerrar(true) : 
    onEditarAccesorioProxy(true)
  funcModalCancelar = secciones.bandModal === 3 ? onClickCancelarAccesorioProxy(true) :
    funcModalCancelar;
  funcModalCancelar = secciones.bandModal === 5 ? onEditarPiezaProxy(true) :
    funcModalCancelar;
  
  if(pestana === 1)
    return (
      <Grid
        container
        style={
          {
            padding: '8px 8px 0px 16px',
            height: '100%',
          }
        }
      >
        <Modal 
          open={secciones.abrirModal}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message={secciones.mensajeConfirmacion}
          onClickAccept={funcModal}
          onClickCancel={funcModalCancelar}
        />
        <Grid 
          container
          // style={
          //   {
          //     height: 'calc(35% - 50px)',
          //     overflowY: 'auto',
          //   }
          // }
        >
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
          <Grid
            item
            xs={5}
            sm={5}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControl
              style={{width: '90%', margin: '0'}}
            >
              <Input
                onChange={onInputChangePieza}
                nomCampo='Nombre de material:'
                longitud='50'
                focus
                valor={secciones.campos.pieza.valor}
                indice={0}
                requerido
                isComplete={secciones.campos.pieza.campoValido}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={3}
            sm={3}
            md={3}
            lg={3}
            xl={3}
          >
            <FormControl
              style={{width: '90%', margin: '0'}}
            >
              <Input
                onChange={onInputChangePieza}
                nomCampo='Identificador:'
                valor={secciones.campos.identificador.valor}
                indice={1}
                requerido
                longitud={5}
                isComplete={secciones.campos.identificador.campoValido}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={3}
            sm={3}
            md={3}
            lg={3}
            xl={3}
          >
            <FormControl
              style={{width: '90%', margin: '0'}}
            >
              <Input
                onChange={onInputChangePieza}
                nomCampo='Referencia:'
                valor={secciones.campos.numeracion.valor}
                indice={2}
                requerido
                // tipoInput='numero'
                isComplete={secciones.campos.numeracion.campoValido}
              />
            </FormControl>
          </Grid>
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
          <Grid
            item
            xs={5}
            sm={5}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControl
              style={{width: '90%'}}
            >
              <Seleccion
                opciones={tipos}
                idOpcion='id'
                nomOpcion='nombre'
                requerido
                valor={secciones.campos.forma.valor}
                onChange={onInputChangePieza}
                label='Tipo de forma:'
                indice={3}
                campoValido={secciones.campos.forma.campoValido}
              />
            </FormControl>
          </Grid>
          {secciones.campos.forma.valor === 0 || secciones.campos.forma.valor === '' ? 
            <React.Fragment>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                xl={3}
              >
                <FormControl
                  style={{width: '90%', margin: '0'}}
                >
                  <Input
                    onChange={onInputChangePieza}
                    nomCampo='Alto:'
                    valor={secciones.campos.alto.valor}
                    indice={4}
                    requerido
                    tipoInput='numero'
                    adornoFinal={
                      <InputAdornment position="end">m2</InputAdornment>
                    }
                    isComplete={secciones.campos.alto.campoValido}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                xl={3}
              >
                <FormControl
                  style={{width: '90%', margin: '0'}}
                >
                  <Input
                    onChange={onInputChangePieza}
                    nomCampo='Ancho:'
                    valor={secciones.campos.ancho.valor}
                    indice={5}
                    requerido
                    tipoInput='numero'
                    adornoFinal={
                      <InputAdornment position="end">m2</InputAdornment>
                    }
                    isComplete={secciones.campos.ancho.campoValido}
                  />
                </FormControl>
              </Grid>
            </React.Fragment> : 
            <React.Fragment>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                xl={3}
              >
                <FormControl
                  style={{width: '90%', margin: '0'}}
                >
                  <Input
                    onChange={onInputChangePieza}
                    nomCampo='Área:'
                    valor={secciones.campos.area.valor}
                    indice={7}
                    requerido
                    tipoInput='numero'
                    adornoFinal={
                      <InputAdornment position="end">m2</InputAdornment>
                    }
                    isComplete={secciones.campos.area.campoValido}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                xl={3}
              ></Grid>
            </React.Fragment>}
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
          <Grid
            item
            xs={5}
            sm={5}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControl
              style={{width: '90%', paddingTop: 4}}
            >
              <Input
                onChange={onInputChangePieza}
                nomCampo='Limite de usos:'
                valor={secciones.campos.usos.valor}
                indice={6}
                requerido
                tipoInput='numero'
                isComplete={secciones.campos.usos.campoValido}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={5}
            sm={5}
            md={6}
            lg={6}
            xl={6}
          >
            <Grid
              container
              justify="flex-end"
              style={
                {
                  marginTop: 16,
                }
              }
            >
              {secciones.idPieza !== null && secciones.hayCambio &&
              <Grid
                item
                style={
                  {
                    paddingRight: 16,
                  }
                }
              >
                <Cancelar 
                  onClick={onClickCancelarAccesorioProxy(false)}
                  label='Cancelar'
                />
              </Grid>}
              <Grid
                item
              >
                <Success 
                  onClick={onClickAgregarPieza}
                  label={secciones.idPieza !== null && !secciones.abrirModal ? 
                    'Actualizar' : 'Agregar'}
                  disabled={secciones.botonAgregar}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
        </Grid>
        <Grid
          container
          style={
            {
              height: '50%',
              paddingTop: 8,
            }
          }
        >
          <DataTable 
            data = {secciones.seccionSlc.datos}
            headers = {secciones.pieza.cabeceras}
            configuracion = {configuracion}
            admin
            opciones = {
              [
                {'icon' : 'ver', 'action': onEditarPieza},
                {'icon' : 'eliminar', 'action': onEliminarAccesorioProxy(0)},
              ]
            }
            temporal
            // acciones = {acciones}
            message='¿Esta seguro que desea eliminar la(s) NuevoMolde(s)?'
            params= {
              {
                height: 30,
                backgroundColor: '#fff',
              }
            }
            elevacion={0}
          />
        </Grid>
        <Grid
          container
          justify="flex-end"
          style={
            {
              marginTop: 16,
            }
          }
        >
          <Grid
            item
            style={
              {
                paddingRight: 16,
              }
            }
          >
            <Cancelar 
              onClick={onClickCerrar(false)}
              label='Cerrar'
            />
          </Grid>
          <Grid
            item
          >
            <Success 
              onClick={onClickGuardarProxy(0)}
              label='Guardar'
              disabled={secciones.guardarSeccion}
            />
          </Grid>
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
        </Grid>
      </Grid> 
    );
  if(pestana === 0 && !secciones.esAccesorio)
    return(
      <React.Fragment>
        <Grid
          container
          style={
            {
              padding: 8,
              paddingLeft: 16,
              height: 'calc(30% - 50px)',
            }
          }
        >
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
          <Grid
            item
            xs={6}
            sm={6}
            md={5}
            lg={5}
            xl={5}
          >
            <FormControl
              style={{width: '90%', margin: '0'}}
            >
              <Input
                onChange={onInputChange}
                nomCampo='Nombre de sección:'
                longitud='50'
                valor={secciones.campos.nombre.valor}
                indice={0}
                requerido
                isComplete={secciones.campos.nombre.campoValido}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={5}
            lg={5}
            xl={5}
          >
            <FormControl
              style={{width: '90%', paddingLeft: 16}}
            >
              <Seleccion
                opciones={plantas}
                idOpcion='id'
                nomOpcion='nombre'
                requerido
                valor={secciones.campos.planta.valor}
                onChange={onInputChange}
                label='Planta:'
                indice={1}
                campoValido={secciones.campos.planta.campoValido}
              />
            </FormControl>
          </Grid>
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
        </Grid>
        <Grid
          container
          style={
            {
              padding: 16,
            }
          }
        >
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            {/* <Typography
              variant='h6'
            >
              Planos
            </Typography> */}
          </Grid>
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            lg={2}
            xl={2}
          >
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={5}
            xl={5}
            style={
              {
                textAlign: 'right',
              }
            }
          >
            {/* <FormControl>
              <UploadFile
                id="upload-file"
                afterOnload={onUploadedFileProxy}
                label="upload file"
                createWebUrl
                transform="buffer"
              >
                <Button
                  size="small"
                  variant="contained"
                  component="span"
                  className={classes.success}
                >
                  <Nubesita
                    className={classes.leftIcon}
                  />
                  SUBIR IMAGEN
                </Button>
              </UploadFile>
            </FormControl> */}
          </Grid>
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            lg={1}
            xl={1}
          >
          </Grid>
        </Grid>
        <Grid
          container
          item
          justify="center"
          style={{ width:'100%', height: '50%'}}
        >
          <Grid
            item
            style={
              {
                height: '100%',
                width: '90%',
              }
            }
          >
            {secciones.campos.plano.url && 
              <img 
                src={secciones.campos.plano.url}
                style={{ width:'100%',height: '100%'}}
                alt=""
              /> 
            }
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-end"
          style={
            {
              padding: 16,
            }
          }
        >
          <Grid
            item
          >
            <Success 
              onClick={
                secciones.pestañaSlc === 0 ? 
                  onClickSiguiente :
                  onClickAgregarProxy(0)
              }
              label={
                secciones.pestañaSlc === 0 ? 'Siguiente' : 'Guardar'
              }
            />
          </Grid>
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
        </Grid>
      </React.Fragment>
    )
  if(secciones.seccionSlc.esAccesorio)
    return (
      <Grid
        container
        style={
          {
            padding: '8px 8px 0px 16px',
            height: '100%',
          }
        }
      >
        <Modal 
          open={secciones.abrirModal}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message={secciones.mensajeConfirmacion}
          onClickAccept={funcModal}
          onClickCancel={funcModalCancelar}
        />
        <Grid
          item
          container
          style={
            {
              height: 'calc(35% - 30px)',
              overflow: 'auto',
            }
          }
        >
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
          <Grid
            item
            xs={6}
            sm={6}
            md={5}
            lg={5}
            xl={5}
          >
            <FormControl
              style={{width: '90%', margin: '0'}}
            >
              <Input
                onChange={onInputChangeAccesorio}
                nomCampo='Nombre de la pieza:'
                longitud='50'
                valor={secciones.campos.pieza.valor}
                indice={0}
                name='nombrePieza'
                requerido
                isComplete={secciones.campos.pieza.campoValido}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={5}
            lg={5}
            xl={5}
          >
            <FormControl
              style={{width: '90%', margin: '0'}}
            >
              <Input
                onChange={onInputChangeAccesorio}
                nomCampo='Costo del material:'
                valor={secciones.campos.material.valor}
                indice={1}
                requerido
                tipoInput='numero'
                isComplete={secciones.campos.material.campoValido}
              />
            </FormControl>
          </Grid>
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
          <Grid
            item
            xs={6}
            sm={6}
            md={5}
            lg={5}
            xl={5}
          >
            <FormControl
              style={{width: '90%', margin: '0'}}
            >
              <Input
                onChange={onInputChangeAccesorio}
                nomCampo='Cantidad de piezas:'
                longitud='50'
                valor={secciones.campos.cantPiezas.valor}
                indice={2}
                requerido
                tipoInput='numero'
                isComplete={secciones.campos.cantPiezas.campoValido}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={5}
            lg={5}
            xl={5}
          >
            <FormControl
              style={{width: '90%', margin: '0'}}
            >
              <Input
                onChange={onInputChangeAccesorio}
                nomCampo='Tiempo de vida(usos):'
                longitud='50'
                valor={secciones.campos.tiempoVida.valor}
                indice={3}
                requerido
                tipoInput='numero'
                isComplete={secciones.campos.tiempoVida.campoValido}
              />
            </FormControl>
          </Grid>
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
          <Grid
            container
            justify="flex-end"
            style={
              {
                marginTop: 16,
              }
            }
          >
            {((secciones.idAccesorio !== null && !secciones.abrirModal) || (secciones.hayEdicion)) &&
            <Grid
              item
              style={
                {
                  paddingRight: 16,
                }
              }
            >
              <Cancelar 
                onClick={onClickCancelarAccesorioProxy(false)}
                label='Cancelar'
              />
            </Grid>}
            <Grid
              item
            >
              <Success 
                onClick={onClickAgregarProxy(1)}
                label={((secciones.idAccesorio !== null && !secciones.abrirModal) || (secciones.hayEdicion)) ? 
                  'Actualizar' : 'Agregar'}
                disabled={secciones.botonAgregar}
              />
            </Grid>
            <Grid 
              item
              xs={false}
              sm={false}
              md={1}
              lg={1}
              xl={1}
            />
          </Grid>
        </Grid>
        <Grid
          container
          style={
            {
              height: '50%',
            }
          }
        >
          <DataTable 
            data = {secciones.seccionSlc.datos}
            headers = {secciones.accesorio.cabeceras}
            configuracion = {configuracion}
            admin
            opciones = {
              [
                {'icon' : 'editar', 'action': onEditarAccesorio},
                {'icon' : 'eliminar', 'action': onEliminarAccesorioProxy(1)},
              ]
            }
            temporal
            // acciones = {acciones}
            message='¿Esta seguro que desea eliminar la(s) NuevoMolde(s)?'
            params= {
              {
                height: 30,
                backgroundColor: '#fff',
                padding: 0,
              }
            }
            elevacion={0}
          />
        </Grid>
        <Grid
          container
          justify="flex-end"
          style={
            {
              marginTop: 16,
            }
          }
        >
          <Grid
            item
            style={
              {
                paddingRight: 16,
              }
            }
          >
            <Cancelar 
              onClick={onClickCerrar(false)}
              label='Cerrar'
            />
          </Grid>
          <Grid
            item
          >
            <Success 
              onClick={onClickGuardarProxy(1)}
              label='Guardar'
              // disabled={secciones.seccionSlc.datos.length === 0}
            />
          </Grid>
          <Grid 
            item
            xs={false}
            sm={false}
            md={1}
            lg={1}
            xl={1}
          />
        </Grid>
      </Grid>
    )
}

PestanaSecciones.propTypes = {
  pestana: T.number,
  plantas: T.array,
  secciones: T.object,
  onInputChange: T.func,
  onEliminarAccesorioProxy: T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onEditarAccesorioProxy: (props) => (band) => () => {
      const {
        onEditarAccesorio,
      } = props;
      onEditarAccesorio(band);
    },
    onEditarPiezaProxy: (props) => (band) => () => {
      const {
        onEditarPieza,
      } = props;
      onEditarPieza(band);
    },
    onClickCancelarAccesorioProxy: (props) => (band) => () => {
      const {
        onClickCancelarAccesorio,
      } = props;
      onClickCancelarAccesorio(band);
    },

    onEliminarAccesorioProxy: (props) => (tipo) => (id) => {
      const {
        onEliminarAccesorio,
        secciones,
        notificacion,
      } = props;
      if(tipo === 0){
        if(secciones.idPieza !== null){
          notificacion({
            message: 'No se puede eliminar mientras edita una Pieza.',
            options: {
              variant: 'warning',
            },
          })
        }else{
          onEliminarAccesorio(id);
        }
      }
      if (tipo === 1){
        if(secciones.idAccesorio !== null){
          notificacion({
            message: 'No se puede eliminar mientras edita un Accesorio.',
            options: {
              variant: 'warning',
            },
          })
        }else{
          onEliminarAccesorio(id);
        }
      }

    },
    

  })
)(PestanaSecciones);
