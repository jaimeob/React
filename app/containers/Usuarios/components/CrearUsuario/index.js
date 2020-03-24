import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
import { uniqueId } from 'lodash';

import {
  Grid,
  FormControl,
  Button,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Toolbar,
  Collapse,
  Chip,
  Tooltip,
  FormHelperText,
  IconButton,
  Checkbox,
  Avatar,
  Paper,
  Typography,
} from '@material-ui/core';
import Nubesita from '@material-ui/icons/CloudUpload';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Izquierda from "@material-ui/icons/KeyboardArrowLeft";
import Derecha from "@material-ui/icons/KeyboardArrowRight";
import ExpandMore from '@material-ui/icons/ExpandMore';
import Archivito from '@material-ui/icons/InsertDriveFile';
import FiltroSeleccion from 'components/FiltroSeleccion';
import Combo from 'components/Seleccion';
import Modal from 'components/Dialog/alertDialog';
import DataTable from 'components/DataTable';
import Success from 'components/BotonSuccess';
import Cancelar from 'components/BotonCancelar'
import Input from 'components/FormInput';
import Ventana from 'components/Ventana';
import IconPlaza from 'images/iconos/persona.svg';
import IconRol from 'images/iconos/supervisor.svg';
import Calendario from "components/DateRangerPicker";
import RedirigirIconColor from 'images/iconos/redirigirVerde.svg';
import TablaPermisos from '../../../Roles/componentes/TablaPermisos';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
  root: {
    padding: 'initial',
  },
  verdesito:{
    backgroundColor: '#28950f5e',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#28950f8a',
    },
    color: '#545050',
    textTransform: 'initial',
  },
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80,
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
    fontSize: '20px',
    color: '#28950F',
  },
  lista: {
    height: '100%',
    padding: 'unset',
  },
  paperPrincipal: {
    width: '98%',
    height: 'calc(100% - 48px)',
    overflow: 'auto',
    margin: 'auto 0 auto auto',
  },
  paperPrincipal2: {
    width: '98%',
    height: 'calc(100% - 12px)',
    margin: 'auto',
  },
  heightMax: {
    height: 'calc(100% - 56px)',
  },
})

function CrearUsuario(props){
  const {
    idUsuario,
    nomUsuario,
    cabecerasHistorial,
    datosHistorial,
    hayCambios,
    pestañaSlc,
    onChangePestaña,
    empleado,
    empleados,
    enkontrol,
    nombre,
    puesto,
    imagen,
    correo,
    dominios,
    dominio,
    usuarioDominio,
    plaza,
    plazas,
    plazasTemp,
    archivos,
    abrirPlazaTemporal,
    onClickPlazaTemporal,
    onDeleteArchivo,
    onDeleteArchivoProxy,
    onClickArchivoProxy,
    plazaTemp,
    fecInicio,
    fecFin,
    fecInput,
    onChangeFecha,
    onFechaInput,
    fechaValida,
    archivosTemp,
    onClickDescargarArchivoTemp,
    onUploadedFileTempProxy,
    abrirModalPlaza,
    getNextFileProxy,
    onDeleteArchivoTemp,
    onDeleteArchivoTempModal,
    archivosPage,
    hayCambiosTemp,
    archivoTempValido,
    onAsignarPlazaTemporal,
    asignarValido,
    onClickCerrarPlazaTemporal,
    onClickRolAdicional,
    abrirRolAdicional,
    onClickCerrarRolAdicional,
    puestoAdi,
    puestosAdi,
    rolesAdi,
    rolAdi,
    empresasAdi,
    empresaAdi,
    empresaDetalle,
    rolDetalle,
    onClickVerDetalleProxy,
    abrirDetalleRol,
    fecInicioRol,
    fecFinRol,
    fecInputRol,
    fechaValidaRol,
    onChangeFechaRol,
    onFechaInputRol,
    archivosRol,
    onAsignarRolAdicional,
    archivoRolValido,
    asignarValidoRol,
    hayCambiosRol,
    onUploadedFileRolProxy,
    modulos,
    modulosCabecera,
    onClickCheckProxy,
    rolDatos,
    abrirPermisosEspeciales,
    onClickCerrarRolDetalle,
    onClickRegresar,
    onClickGuardar,
    guardarConfiguracion,
    onClickDescargarHistorial,
    onClickDescargarTodoHistorial,
    abrirModalArchivo,
    onInputChangeProxy,
    handleClickListaProxy,
    onClickListaDetalleProxy,
    onUploadedFileProxy,
    classes,
  } = props;


  if(modulos.length > 0){
    for (let i = 0; i < modulos.length; i+=1) {
      for (let j = 0; j < modulos[i].datos.length; j+=1) {
        modulos[i].datos[j].select = <React.Fragment>
          <Checkbox
            checked={modulos[i].datos[j].checked === '1'}
            value={modulos[i].datos[j].checked}
            onChange={onClickCheckProxy(i, j)}
            classes={{
              root: classes.root,
            }}
          />
        </React.Fragment>
      }
    }
  }
  
  const configuracion = {
    filtro : true,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: false,
    paginado: false,
    responsivo: "scroll",
  };

  const iconoTitulo = 
    <IconButton 
      style={{padding: 8}}
      disabled
    >
      <img src={IconPlaza} alt="" />
    </IconButton>

  const iconoTituloRol = 
    <IconButton 
      style={{padding: 8}}
      disabled
    >
      <img src={IconRol} alt="" />
    </IconButton>

  const iconoRolDetalle =
    <IconButton 
      style={{padding: 8}}
      disabled
    >
      <img src={RedirigirIconColor} alt="" />
    </IconButton>
  const plazaTemporal =
    <React.Fragment>
      <img
        style={
          {
            marginRight: 8,
          }
        } 
        src={IconPlaza} alt="" 
      />
      Plaza temporal
    </React.Fragment>

  const rolAdicional =
    <React.Fragment>
      <img 
        style={
          {
            marginRight: 8,
          }
        } 
        src={IconRol} 
        alt="" 
      />
      Rol adicional
    </React.Fragment>

  const body = 
    <React.Fragment>
      <Grid
        container
        alignItems="flex-end"
      >
        <Grid
          item
          xs={5}
          sm={5}
          md={5}
          lg={5}
          xl={5}
        >
          <Combo 
            indice={4}
            valor={plazaTemp.valor}
            label="Plaza:"
            requerido
            campoValido={plazaTemp.campoValido}
            onChange={onInputChangeProxy}
            opciones={plazasTemp}
            idOpcion='IdPlaza'
            nomOpcion='Nombre'
            fullWidth
          />
        </Grid>
        <Grid 
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
        />
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Calendario 
            label = 'Periodo:'
            fecInicio = {fecInicio}
            fecFin = {fecFin}
            fechaInput = {fecInput}
            onChangeFecha = {onChangeFecha}
            onFechaInput = {onFechaInput}
            id = {0}
            requerido
            campoValido={fechaValida}
            paddingRight = {0}
            paddingLeft = {0}
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={
          {
            paddingTop: 16,
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
          <FormControl>
            <input
              accept="*"
              style={{display: 'none'}}
              id='subirArchivosTemp'
              onChange={onUploadedFileTempProxy}
              type="file"
            />
            <label htmlFor='subirArchivosTemp'>
              <Button 
                size="small"
                variant="contained"
                component="span"
                className={classes.verdesito}
              >
                <Nubesita 
                  className={classes.leftIcon}
                /> Subir archivos
              </Button>
            </label>
            <FormHelperText
              style={
                {
                  color: !archivoTempValido ? 'red' : 'gray',
                }
              }
            >
              *Requerido
            </FormHelperText>
          </FormControl>
        </Grid>
        {archivosTemp.length > 0 && 
          <Grid
            item
            style={{paddingTop: 8}}
          >
            <Tooltip 
              key={uniqueId('archivosTemp_')}
              title = {
                archivosTemp[0].name
              }
            >
              <Chip
                icon={<Archivito />}
                label={
                  archivosTemp[0].name.substring(0,35)
                }
                style={{fontSize: '0.7em', marginRight: 8}}
                onClick={onClickDescargarArchivoTemp}
                onDelete={onDeleteArchivoTempModal}
              />
            </Tooltip>
          </Grid>
        }
      </Grid>
    </React.Fragment>

  const bodyDetalleRol = 
    <React.Fragment>
      <Grid
        container
        justify="center"
        style={
          {
            padding: 8,
          }
        }
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Input 
            indice={10}
            valor={empresaDetalle}
            onChange={onInputChangeProxy}
            inhabilitado={1}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Input 
            indice={11}
            onChange={onInputChangeProxy}
            valor={rolDetalle}
            inhabilitado={1}
          />
        </Grid>
      </Grid>
      {rolDatos.map((ele, index) => 
        <Grid
          item
          style={
            {
              width: '100%',
            }
          }
        >
          <List
            component="nav"
            className={classes.lista}
            key={uniqueId('listDetalle_')}
          >
            <ListItem 
              button 
              onClick={onClickListaDetalleProxy(index)} 
              divider
              style={
                {
                  backgroundColor: '#E0E0E0',
                }
              }
            >
              {ele.seleccionado ? <ExpandMore /> : <ChevronRight />}
              <ListItemText 
                primary={`Rol: ${ele.label}`} 
              />
            </ListItem>
            <Collapse in={ele.seleccionado} timeout="auto" unmountOnExit>
              <TablaPermisos
                ele={ele}
                setOpenModalPermisosEspecialesAction={abrirPermisosEspeciales}
                openModalAddModulo={false}
                moduloSoloLectura
              />
            </Collapse>
          </List>
        </Grid>
      )}
    </React.Fragment>

  const bodyRol = 
    <React.Fragment>
      <Grid
        container
        alignItems="flex-end"
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          style={
            {
              paddingRight: 8,
            }
          }
        >
          <Combo 
            indice={6}
            valor={puestoAdi.valor}
            label="Puesto:"
            requerido
            campoValido={puestoAdi.campoValido}
            onChange={onInputChangeProxy}
            opciones={puestosAdi}
            idOpcion='IdPuesto'
            nomOpcion='Nombre'
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          style={
            {
              paddingLeft: 8,
            }
          }
        >
          <Combo 
            indice={7}
            valor={rolAdi.valor}
            label="Rol:"
            requerido
            inhabilitado={puestoAdi.valor === ''}
            campoValido={rolAdi.campoValido}
            onChange={onInputChangeProxy}
            opciones={rolesAdi}
            idOpcion='IdRol'
            nomOpcion='Nombre'
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          style={
            {
              paddingRight: 8,
            }
          }
        >
          <FiltroSeleccion
            valor={empresaAdi.valor}
            onChange={onInputChangeProxy}
            opciones={empresasAdi}
            campoValido={empresaAdi.campoValido}
            inhabilitado={rolAdi.valor === ''}
            requerido
            multiple
            requeridoDesactivo
            label='Empresa:'
            indice={8}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          style={
            {
              paddingLeft: 8,
            }
          }
        >
          <Calendario 
            label = 'Periodo:'
            fecInicio = {fecInicioRol}
            fecFin = {fecFinRol}
            fechaInput = {fecInputRol}
            onChangeFecha = {onChangeFechaRol}
            onFechaInput = {onFechaInputRol}
            id = {1}
            requerido
            campoValido={fechaValidaRol}
            paddingRight = {0}
            paddingLeft = {0}
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={
          {
            paddingTop: 16,
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
          <FormControl>
            <input
              accept="*"
              style={{display: 'none'}}
              id='subirArchivosTemp'
              onChange={onUploadedFileRolProxy}
              type="file"
            />
            <label htmlFor='subirArchivosTemp'>
              <Button 
                size="small"
                variant="contained"
                component="span"
                className={classes.verdesito}
              >
                <Nubesita 
                  className={classes.leftIcon}
                /> Subir archivos
              </Button>
            </label>
            <FormHelperText
              style={
                {
                  color: !archivoRolValido ? 'red' : 'gray',
                }
              }
            >
              *Requerido
            </FormHelperText>
          </FormControl>
        </Grid>
        {archivosRol.length > 0 && 
          <Grid
            item
            style={{paddingTop: 8}}
          >
            <Tooltip 
              key={uniqueId('archivoRol_')}
              title = {
                archivosRol[0].name
              }
            >
              <Chip
                icon={<Archivito />}
                label={
                  archivosRol[0].name.substring(0,35)
                }
                style={{fontSize: '0.7em', marginRight: 8}}
                onClick={onClickDescargarArchivoTemp}
                onDelete={onDeleteArchivoTempModal}
              />
            </Tooltip>
          </Grid>
        }
      </Grid>
    </React.Fragment>

  let aceptarModal = abrirModalPlaza ? onDeleteArchivoTemp : null;
  aceptarModal = abrirModalArchivo ? onDeleteArchivo : aceptarModal;

  let cancelarModal = abrirModalPlaza ? onDeleteArchivoTempModal : null;
  cancelarModal = abrirModalArchivo ? onDeleteArchivoProxy(true) : cancelarModal;

  return (
    <Grid
      container
      style={
        {
          height: 'calc(100vh - 128px)',
        }
      }
      alignContent='center'
      justify='flex-end'
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.heightMax }
      >
        <Modal 
          open={abrirModalArchivo || abrirModalPlaza}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message='¿Esta seguro que desea eliminar el archivo?'
          onClickAccept={aceptarModal}
          onClickCancel={cancelarModal}
        />
        <Ventana 
          abrir={abrirPlazaTemporal}
          titulo='Asignar plaza temporal'
          hayCambios={hayCambiosTemp}
          successLabel='Asignar'
          onClickSuccess={onAsignarPlazaTemporal}
          successDisabled={asignarValido}
          iconoTitulo={iconoTitulo}
          body={body}
          onClickCerrar={onClickCerrarPlazaTemporal}
          chico
        />
        <Ventana 
          abrir={abrirRolAdicional}
          titulo='Asignar rol adicional'
          hayCambios={hayCambiosRol}
          successLabel='Asignar'
          onClickSuccess={onAsignarRolAdicional}
          successDisabled={asignarValidoRol}
          iconoTitulo={iconoTituloRol}
          body={bodyRol}
          onClickCerrar={onClickCerrarRolAdicional}
          width='700px'
          chico
        />
        <Ventana 
          abrir={abrirDetalleRol}
          titulo={`Detalle ${rolDetalle}`}
          onClickSuccess={onAsignarRolAdicional}
          successDisabled={asignarValidoRol}
          iconoTitulo={iconoRolDetalle}
          body={bodyDetalleRol}
          onClickCerrar={onClickCerrarRolDetalle}
          chico
          overflow
        />
        
        <Paper
          className={classes.paperPrincipal2}
        >
          <Toolbar 
            variant="dense" 
            style={
              {
                borderBottom: '1px solid #e8e8e8',
              }
            }
          >
            <Tabs value={pestañaSlc} onChange={onChangePestaña} >
              <Tab label="Datos Generales" id="0"/>
              <Tab label="Historial" id="1"/>
            </Tabs>
          </Toolbar>
          {pestañaSlc === 0 ?
            <Grid
              container
              justify="center"
              className={classes.paperPrincipal}
              id='paperIndicador'
            >
              <Grid
                item
                container
                justify="center"
                alignItems="center"
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={
                  {
                    marginBottom: 16,
                    // height: '18%',
                  }
                }
              >
                <Grid
                  item
                  container
                  justify="center"
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                >
                  <Grid
                    item
                    style={
                      {
                        width: '90%',
                        paddingBottom: 8,
                      }
                    }
                  >
                    <FiltroSeleccion
                      valor={empleado.valor}
                      onChange={onInputChangeProxy}
                      opciones={empleados}
                      campoValido={empleado.campoValido}
                      requerido
                      inhabilitado={idUsuario !== null}
                      label='Empleado:'
                      indice={0}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={5}
                  lg={5}
                  xl={5}
                  style={
                    {
                      paddingBottom: idUsuario ? 8 : 26,
                    }
                  }
                >
                  <Input
                    onChange={onInputChangeProxy}
                    nomCampo='No EnKontrol:'
                    tipoInput='text'
                    longitud='10'
                    valor={enkontrol.valor}
                    indice={1}
                  />
                </Grid>
                <Grid
                  item
                  container
                  justify="center"
                  alignItems="center"
                  direction="column"
                  xs={6}
                  sm={6}
                  md={2}
                  lg={2}
                  xl={2}
                >
                  <Grid
                    item
                  >
                    <FormControl>
                      <input
                        accept="*"
                        multiple
                        style={{display: 'none'}}
                        id='subirArchivos'
                        onChange={onUploadedFileProxy}
                        type="file"
                      />
                      <label htmlFor='subirArchivos'>
                        <Button 
                          size="small"
                          variant="contained"
                          component="span"
                          className={classes.verdesito}
                        >
                          <Nubesita 
                            className={classes.leftIcon}
                          /> Subir archivo
                        </Button>
                      </label>
                    </FormControl>
                  </Grid>
                  {archivos.length > 0 && 
                    <Grid
                      item
                      container
                      direction="row"
                      style={{paddingTop: 16}}
                    >
                      <Grid
                        item
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                        style={
                          {
                            textAlign: 'center',
                          }
                        }
                      >
                        {
                          archivosPage > 0 &&
                            <IconButton
                              onClick={getNextFileProxy(false)}
                            >
                              <Izquierda fontSize="small" />
                            </IconButton>
                        }
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                      >
                        <Tooltip 
                          key={uniqueId('archivos_')}
                          title = {
                            archivos[archivosPage].name}
                        >
                          <Chip
                            icon={<Archivito />}
                            label={ 
                              archivos[archivosPage].name.substring(0,15)
                            }
                            style={
                              {
                                fontSize: '0.7em', 
                                margin: '0px 4px 0px 4px',
                              }
                            }
                            onClick={onClickArchivoProxy(archivosPage)}
                            onDelete={onDeleteArchivoProxy(archivosPage)}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                        style={
                          {
                            textAlign: 'center',
                          }
                        }
                      >
                        {
                          archivosPage < archivos.length - 1 &&
                            <IconButton
                              onClick={getNextFileProxy(true)}
                            >
                              <Derecha fontSize="small" />
                            </IconButton>
                        }
                      </Grid>
                    </Grid>
                  }
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={
                  {
                    height: '64%',
                    paddingRight: 32,
                  }
                }
              >
                { empleado.valor &&
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    style={
                      {
                        height: '100%',
                      }
                    }
                  >
                    <fieldset
                      style={
                        {
                          border: '1px solid rgb(214, 209, 209)',
                          borderRadius: 4,
                          margin: '0px 2px 15px 2px',
                          padding: '.35em .625em .75em',
                        }
                      }
                    >
                      <legend
                        style={
                          {
                            width: 'initial',
                            padding: '0px 8px 0px 8px',
                            fontFamily: 'roboto',
                            fontSize: 14,
                          }
                        }
                      >
                        Datos del empleado
                      </legend>
                      <Grid
                        container
                      >
                        <Grid
                          item
                          container
                          justify="center"
                          xs={12}
                          sm={12}
                          md={2}
                          lg={2}
                          xl={1}
                          style={
                            {
                              height: '80%',
                            }
                          }
                        >
                          <Grid
                            item
                          >
                            <Avatar 
                              alt="Remy Sharp" 
                              src={imagen}
                              className={classes.bigAvatar} 
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          justify='flex-end'
                          alignItems="center"
                          xs={12}
                          sm={12}
                          md={10}
                          lg={10}
                          xl={11}
                        >
                          <Grid
                            item
                            xs={2}
                            sm={2}
                            md={1}
                            lg={1}
                            xl={1}
                            style={
                              {
                                textAlign: 'center',
                              }
                            }
                          >
                            <Typography>
                              Nombre:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={2}
                            md={3}
                            lg={3}
                            xl={3}
                          >
                            <Typography>
                              {nombre}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={1}
                            md={1}
                            lg={1}
                            xl={1}
                            style={
                              {
                                textAlign: 'center',
                              }
                            }
                          >
                            <Typography>
                              Correo:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            alignItems='flex-start'
                            xs={2}
                            sm={3}
                            md={3}
                            lg={3}
                            xl={3}
                          >
                            <Grid
                              item
                              xs={6}
                              sm={6}
                              md={6}
                              lg={6}
                              xl={6}
                            >
                              <Input 
                                indice={2}
                                valor={correo.valor}
                                requerido
                                isComplete={correo.campoValido}
                                inhabilitado={idUsuario !== null ? 1 : 0}
                                onChange={onInputChangeProxy}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sm={6}
                              md={6}
                              lg={6}
                              xl={6}
                            >
                              <Combo 
                                indice={3}
                                valor={dominio}
                                onChange={onInputChangeProxy}
                                opciones={dominios}
                                inhabilitado={idUsuario !== null}
                                idOpcion='IdDominio'
                                nomOpcion='Nombre'
                                fullWidth
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={2}
                            md={2}
                            lg={1}
                            xl={2}
                            style={
                              {
                                paddingLeft: 8,
                                textAlign: 'center',
                              }
                            }
                          >
                            <Typography>
                              Usuario dominio:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={2}
                            md={2}
                            lg={3}
                            xl={2}
                          >
                            <Typography>
                              {usuarioDominio}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={2}
                            md={1}
                            lg={1}
                            xl={1}
                            style={
                              {
                                textAlign: 'center',
                              }
                            }
                          >
                            <Typography>
                              Puesto:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={2}
                            md={3}
                            lg={3}
                            xl={3}
                          >
                            <Typography>
                              {puesto}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={1}
                            md={1}
                            lg={1}
                            xl={1}
                            style={
                              {
                                textAlign: 'center',
                              }
                            }
                          >
                            <Typography>
                              Plaza:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={3}
                            md={3}
                            lg={3}
                            xl={3}
                            style={
                              {
                                wordBreak: 'break-all',
                              }
                            }
                          >
                            <Combo 
                              indice={5}
                              valor={plaza.valor}
                              requerido
                              campoValido={plaza.campoValido}
                              onChange={onInputChangeProxy}
                              opciones={plazas}
                              idOpcion='IdPlaza'
                              nomOpcion='Nombre'
                              fullWidth
                            />
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            sm={4}
                            md
                            lg
                            xl
                          />
                          <Grid
                            item
                            container
                            justify="center"
                            xs={12}
                            sm={12}
                            md={2}
                            lg={2}
                            xl={2}
                          >
                            <Grid
                              item
                            >
                              <Success 
                                label={plazaTemporal}
                                size='small'
                                verdesito
                                disabled={!plaza.valor}
                                onClick={onClickPlazaTemporal}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </fieldset>
                    <fieldset
                      style={
                        {
                          border: '1px solid rgb(214, 209, 209)',
                          borderRadius: 4,
                          margin: '0px 2px 15px 2px',
                          padding: '.35em .625em .75em',
                        }
                      }
                    >
                      <legend
                        style={
                          {
                            width: 'initial',
                            padding: '0px 8px 0px 8px',
                            fontFamily: 'roboto',
                            fontSize: 14,
                          }
                        }
                      >
                        Asignar rol
                      </legend>
                      <Grid
                        container
                      >
                        <Grid
                          item
                          container
                          justify="flex-end"
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                        >
                          <Grid
                            item
                            xs={8}
                            sm={8}
                            md={10}
                            lg={10}
                            xl={10}
                          />
                          <Grid
                            item
                            container
                            justify="center"
                            xs={4}
                            sm={4}
                            md={2}
                            lg={2}
                            xl={2}
                          >
                            <Grid
                              item
                              xs={1}
                              sm={1}
                              md={1}
                              lg={1}
                              xl={1}
                            />
                            <Grid
                              item
                            >
                              <Success 
                                label={rolAdicional}
                                size='small'
                                verdesito
                                onClick={onClickRolAdicional}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                          style={
                            {
                              paddingTop: 16,
                              height: '100%',
                            }
                          }
                        >
                          <Grid
                            container
                            direction="column"
                            style={
                              {
                                overflow: 'auto',
                                height: 'calc(70% - 54px)',
                                flexWrap: 'unset',
                              }
                            }
                          >
                            {modulos.map((ele, index) => 
                              <Grid
                                item
                                style={
                                  {
                                    width: '100%',
                                  }
                                }
                                key={uniqueId('listasd_')}
                              >
                                <List
                                  component="nav"
                                  aria-labelledby="nested-list-subheader"
                                  className={classes.lista}
                                  key={uniqueId('list_')}
                                >
                                  <ListItem 
                                    button 
                                    onClick={handleClickListaProxy(index)} 
                                    divider
                                    style={
                                      {
                                        backgroundColor: '#E0E0E0',
                                      }
                                    }
                                    key={uniqueId('listitem_')}
                                  >
                                    {ele.seleccionado ? <ExpandMore /> : <ChevronRight />}
                                    <ListItemText 
                                      primary={`Rol: ${ele.Nombre}`} 
                                    />
                                  </ListItem>
                                  <Collapse in={ele.seleccionado} timeout="auto" unmountOnExit>
                                    <Grid
                                      container
                                    >
                                      <DataTable 
                                        data = {ele.datos}
                                        headers = {modulosCabecera}
                                        configuracion = {configuracion}
                                        temporal
                                        admi
                                        params = {
                                          {
                                            height: 0,
                                          }
                                        }
                                        opciones = {
                                          [
                                            {
                                              'icon' : 'ver', 
                                              'action': onClickVerDetalleProxy(ele),
                                            },
                                          ]
                                        }
                                        elevacion={0}
                                      />
                                    </Grid>
                                  </Collapse>
                                </List>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </fieldset>
                  </Grid>
                }
              </Grid>
            </Grid> :
            <Grid
              container
              style={
                {
                  marginTop: 16,
                  margin: 'auto',
                  width: '98%',
                  height: 'calc(100% - 49px)',
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
                style={
                  {
                    backgroundColor: 'rgb(224, 224, 224)',
                    padding: 16,
                    marginTop: 16,
                  }
                }
              >
                <Typography
                  variant="subtitle2"
                >
                  Movimientos del usuario: {nomUsuario}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                style={
                  {
                    height: 'calc(100% - 85px)',
                  }
                }
              >
                <DataTable 
                  data = {datosHistorial}
                  headers = {cabecerasHistorial}
                  configuracion = {configuracion}
                  temporal
                  onClickDescargar= {datosHistorial.length > 0 ? onClickDescargarTodoHistorial : null}
                  admi
                  params = {
                    {
                      height: 50,
                      padding: 0,
                    }
                  }
                  opciones = {
                    [
                      {
                        'icon' : 'descargar', 
                        'action': onClickDescargarHistorial,
                      },
                    ]
                  }
                  elevacion={0}
                />
              </Grid>
            </Grid>
          }
        </Paper>
      </Grid>
      { empleado.valor &&
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            style={
              {
                paddingRight: 32,
              }
            }
          >
            <Grid
              item
              style={
                {
                  paddingRight: 4,
                }
              }
            >
              <Cancelar 
                label='Cerrar'
                hayCambios={hayCambios}
                onClick={onClickRegresar}
                small
              />
            </Grid>
            <Grid
              item
              style={
                {
                  paddingLeft: 4,
                }
              }
            >
              <Success 
                label={idUsuario ? 'Actualizar' : 'Guardar'}
                small
                disabled={guardarConfiguracion}
                onClick={onClickGuardar}
              />
            </Grid>
          </Grid>
      }
    </Grid>
  )
}

CrearUsuario.propTypes = {
  pestañaSlc: T.number,
  hayCambios: T.bool,
  cabecerasHistorial: T.array,
  datosHistorial: T.array,
  idUsuario: T.number,
  nomUsuario: T.string,
  onChangePestaña: T.func,
  empleado: T.object,
  empleados: T.array,
  enkontrol: T.object,
  nombre: T.string,
  puesto: T.string,
  imagen: T.any,
  onDeleteArchivo: T.func,
  onDeleteArchivoProxy: T.func,
  onClickArchivoProxy: T.func,
  correo: T.object,
  dominios: T.array,
  dominio: T.number,
  usuarioDominio: T.string,
  plaza: T.object,
  plazas: T.array,
  plazasTemp: T.array,
  archivos: T.array,
  abrirPlazaTemporal: T.bool,
  onClickPlazaTemporal: T.func,
  plazaTemp: T.object,
  fecInicio: T.object,
  fecFin: T.object,
  fecInput: T.string,
  fecInicioRol: T.object,
  fecFinRol: T.object,
  fecInputRol: T.string,
  fechaValidaRol: T.bool,
  onChangeFecha: T.func,
  archivosRol: T.array,
  archivoRolValido: T.bool,
  asignarValidoRol: T.bool, 
  onClickListaDetalleProxy: T.func,
  onFechaInput: T.func,
  fechaValida: T.bool,
  onUploadedFileTempProxy: T.func,
  archivosTemp: T.array,
  onClickDescargarArchivoTemp: T.func,
  onClickRolAdicional: T.func,
  abrirRolAdicional: T.bool,
  onClickCerrarRolAdicional: T.func,
  getNextFileProxy: T.func,
  abrirModalPlaza: T.bool,
  onDeleteArchivoTemp: T.func,
  onDeleteArchivoTempModal: T.func,
  archivosPage: T.number,
  hayCambiosTemp: T.bool,
  archivoTempValido: T.bool,
  onAsignarPlazaTemporal: T.func,
  asignarValido: T.bool,
  onClickCerrarPlazaTemporal: T.func,
  puestoAdi: T.object,
  rolAdi: T.object,
  puestosAdi: T.array,
  rolesAdi: T.array,
  empresasAdi: T.array,
  empresaAdi: T.object,
  onChangeFechaRol: T.func,
  onFechaInputRol: T.func,
  hayCambiosRol: T.bool,
  onUploadedFileRolProxy: T.func,
  onAsignarRolAdicional: T.func,
  modulos: T.array,
  modulosCabecera: T.array,
  onClickCheckProxy: T.func,
  empresaDetalle: T.string,
  rolDetalle: T.string,
  onClickVerDetalleProxy: T.func,
  abrirDetalleRol: T.bool,
  rolDatos: T.array,
  abrirPermisosEspeciales: T.func,
  onClickCerrarRolDetalle: T.func,
  onClickRegresar: T.func,
  onClickGuardar: T.func,
  guardarConfiguracion: T.bool,
  onClickDescargarHistorial: T.func,
  onClickDescargarTodoHistorial: T.func,
  onInputChangeProxy: T.func,
  handleClickListaProxy: T.func,
  onUploadedFileProxy: T.func,
  classes: T.object,
  abrirModalArchivo: T.bool,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => (id) => (e) => {
      const {
        onChangeParametros,
        onChangeEmpleado,
        onChangePuesto,
        onChangeRol,
      } = props;
      
      if(id === 0)
        onChangeEmpleado(id, e)
      else if(id === 6)
        onChangePuesto(id, e.target.value)
      else if(id === 7)
        onChangeRol(id, e.target.value)
      else if(id === 8)
        onChangeParametros(id, e)
      else
        onChangeParametros(id, e.target.value)
    },
    handleClickListaProxy: (props) => (id) => () => {
      const {
        handleClickLista,
      } = props;
      
      handleClickLista(id);
    },
    onClickListaDetalleProxy: (props) => (id) => () => {
      const {
        onClickListaDetalle,
        onClickListaDetalleCerrar,
        rolDatos,
      } = props;
      
      if(rolDatos[id].opciones.length > 0)
        onClickListaDetalleCerrar(id)  
      else
        onClickListaDetalle(id)
    },
    onClickCheckProxy: (props) => (i, j) => () =>{
      const {
        onClickCheck,
      } = props;
      onClickCheck(i, j);
    },
    onUploadedFileProxy: (props) => (event)  => {
      const {
        subirArchivos,
        notificacion,
        archivos,
      } = props;

      const {
        target: {
          files,
        },
      } = event;

      const formData = new FormData();
      formData.append('refId', 'formato');

      let tipo = '';
      let band = true;
      
      for(let i = 0; i < files.length; i+=1){
        tipo = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
        tipo = tipo.toLowerCase();
        if(tipo.toLowerCase() === 'pdf'){
          archivos.push(files[i])
        } else {
          band = false;
        }
      }

      if(band){
        for (let j = 0; j < archivos.length; j+=1) {
          formData.append('files', archivos[j], archivos[j].name);
        }
        subirArchivos(formData, archivos)
      } else{
        notificacion({
          message: 'El tipo de archivo debe estar en formato pdf',
          options: {
            variant: 'warning',
          },
        })
      }
      
    },
    onUploadedFileTempProxy: (props) => (event)  => {
      const {
        subirArchivosTemp,
        notificacion,
      } = props;

      const {
        target: {
          files,
        },
      } = event;
      const archivos = [];
      let tipo = '';

      tipo = files[0].name.substring(files[0].name.lastIndexOf('.') + 1);
      tipo = tipo.toLowerCase();
      if(tipo.toLowerCase() === 'pdf'){
        archivos.push(files[0])
        subirArchivosTemp(archivos)
      } else {
        notificacion({
          message: 'El tipo de archivo debe estar en formato pdf',
          options: {
            variant: 'warning',
          },
        })
      }
    },
    onUploadedFileRolProxy: (props) => (event)  => {
      const {
        subirArchivoRol,
        notificacion,
      } = props;

      const {
        target: {
          files,
        },
      } = event;
      const archivos = [];
      let tipo = '';

      tipo = files[0].name.substring(files[0].name.lastIndexOf('.') + 1);
      tipo = tipo.toLowerCase();
      if(tipo.toLowerCase() === 'pdf'){
        archivos.push(files[0])
        subirArchivoRol(archivos)
      } else {
        notificacion({
          message: 'El tipo de archivo debe estar en formato pdf',
          options: {
            variant: 'warning',
          },
        })
      }
    },
    onCancelarArchivoProxy: (props) => (band) => () => {
      const {
        onCancelarArchivo,
      } = props;
      onCancelarArchivo(band);
    },

    onClickArchivoProxy: (props) => (id) => () => {
      const {
        onClickArchivo,
      } = props;
      onClickArchivo(id);
    },
    onDeleteArchivoProxy: (props) => (id) => () => {
      const {
        onDeleteArchivoModal,
      } = props;
      onDeleteArchivoModal(id);
    },
    getNextFileProxy: (props) => (band) => () => {
      const {
        getNextFile,
      } = props;
      getNextFile(band);
    },
    onClickVerDetalleProxy: (props) => (datos) => (indice) => {
      const {
        onClickVerDetalle,
      } = props;
      onClickVerDetalle(datos, indice);
    },
  })
)(CrearUsuario);