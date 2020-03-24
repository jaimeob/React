/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import T from 'prop-types';
import dateFns from "date-fns";
import es from "date-fns/locale/es";
import {
  
  Grid,
  Paper,
  IconButton,
  Typography,
} from '@material-ui/core';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withHandlers } from 'recompose';
// import Seleccion from 'components/Seleccion';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import SubirArchivoIcon from '@material-ui/icons/CloudUploadOutlined';
import BajarArchivoIcon from '@material-ui/icons/CloudDownloadOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import Badge from '@material-ui/core/Badge';
import Modal from 'components/Dialog/alertDialog';
import moment from 'moment';



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
  typography:{
    textTransform:'inherit',
    fontSize:'1rem',
  },
  botonBajar:{
    width: '1.5em', 
    height: '1.5em',
    color: '#28950F',
    opacity: 0.75,
    marginTop:'-7px',
  },
  botonSubir:{
    width: '1.5em', 
    height: '1.5em',
    opacity: 0.75,
    marginTop:'-7px',
  },
})



class Calendar extends React.Component {

  renderFecha() {
    const { 
      datosSeleccionados,
      // fechaSeleccionada, 
      setFechaSeleccionada,
    } = this.props;
    const formatoAño = "YYYY";
    const formatoMes = "MMMM";
    return (
      <div className="header row flex-middle">
        <div className="col col-center">
          {/* Años */}
          <div className="icon" onClick={() => setFechaSeleccionada(dateFns.subYears(datosSeleccionados.fechaSeleccionada, 1))}>chevron_left</div>
          <span className="textoHeader">{dateFns.format(datosSeleccionados.fechaSeleccionada, formatoAño,{ locale: es })}</span>
          <div className="icon" onClick={() => setFechaSeleccionada(dateFns.addYears(datosSeleccionados.fechaSeleccionada, 1))}>chevron_right</div> 
          {/* Meses */}
          <div className="icon" onClick={() => setFechaSeleccionada(dateFns.subMonths(datosSeleccionados.fechaSeleccionada, 1))}>chevron_left</div>
          <span className="textoHeader">{dateFns.format(datosSeleccionados.fechaSeleccionada, formatoMes,{ locale: es })}</span>
          <div className="icon" onClick={() => setFechaSeleccionada(dateFns.addMonths(datosSeleccionados.fechaSeleccionada, 1))}>chevron_right</div>
        </div>
      </div>
    );

  }

  renderDias() {
    const { 
      datosSeleccionados,
    } = this.props;
    const dateFormat = "dddd";
    const days = [];

    const startDate = dateFns.startOfWeek(datosSeleccionados.fechaSeleccionada);

    for (let i = 0; i < 7; i+=1) {
      days.push(
        <div className="col col-center" key={i}>
          <div className="textoDia">
            <span>{dateFns.format(dateFns.addDays(startDate, i), dateFormat,{ locale: es })}</span>
          </div>
        </div>
      );
    }

    return <div className="days row-calendario">{days}</div>;
  }

  // Esta parte es para cada uno de los dias del mes, ya se le quito el fondo
  renderCells() {
    // const { currentMonth, selectedDate, diaActual } = this.state;

    const { 
      classes,
      // fechaActual, 
      // diaSeleccionado, 
      // fechaSeleccionada,
      // almacenSeleccionado,
      // moldeSeleccionado,
      permisosNormales,
      datosSeleccionados,
      nuevaCaptura,
      // campos,
      moldes,
      handleChangeMolde,
      setDiaSeleccionado, 
      inventariosCiclicos,
      evidenciasCalendario,
      handleChangeArchivoEvidenciaProxy,
      // handleDeleteArchivoEvidenciaProxy,
      handleDownloadArchivoEvidenciaProxy,
      // handleEditarInventarioProxy,
      handleObtenerDetalleInventarioProxy,
      onClickEliminarEvidenciaProxy,
      fechaInicial,
      cargando,
    } = this.props;

    

    const colorBoton = datosSeleccionados.moldeSeleccionado === '' ? 'white' : 'grey'
    const diaHabilitado = false
    // const fechaInicial = '2019-08-12T17:39:52.243Z';
    

    const monthStart = dateFns.startOfMonth(datosSeleccionados.fechaSeleccionada);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    // const boolInsertarChip = true;
    
    let days = [];
    let day = startDate;
    let formattedDate = "";

    

    
    while (day <= endDate) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 7; i++) {


        const FinDeSemana = i === 0 // || i === 6 
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        let estatus = "";
        let evidenciaDia = "";
        let evidenciaId = "";
        let nombreInventario = "";
        let IdInventarioCiclico = "";

        const FechaValida = moment(day).format('DD/MM/YYYY');
        
        // eslint-disable-next-line no-loop-func
        inventariosCiclicos.forEach((inventario) => {
          if (estatus !== "Dia inventariado" && estatus !== "Dia anterior"){
            if(FechaValida === inventario.FechaInventario && dateFns.isSameDay(day, datosSeleccionados.fechaActual)){
              estatus = inventario.Estatus === "CERRADO" ? "Dia anterior" :"Dia inventariado"
              nombreInventario = inventario.MoldeInventariado
              IdInventarioCiclico = inventario.InventarioCiclicoId
            }else if (FechaValida === inventario.FechaInventario){
              estatus = inventario.Estatus === "CERRADO" ? "Dia anterior" : "No encontrado"
              nombreInventario = inventario.MoldeInventariado
              IdInventarioCiclico = inventario.InventarioCiclicoId
            }else{
              estatus = "No encontrado"
            }
          }
        })
        // eslint-disable-next-line no-loop-func
        evidenciasCalendario.forEach((evidencia) => {
          if(dateFns.isSameDay(day, evidencia.FechaInventario)){
            evidenciaDia = evidencia.Nombre
            evidenciaId = evidencia.EvidenciaInventarioId
          }
        })

        days.push(
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            className={`col cell ${
              // eslint-disable-next-line no-nested-ternary
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, datosSeleccionados.diaSeleccionado) ? "selected" : ""
            }`}
            key={day}
            onClick={() => setDiaSeleccionado(dateFns.parse(cloneDay))}
          >
            {!dateFns.isSameMonth(day, monthStart) ? null 
            
              :(dateFns.isAfter(day, fechaInicial) || dateFns.isSameDay(day, fechaInicial)) &&  !dateFns.isAfter(day, datosSeleccionados.fechaActual) && datosSeleccionados.almacenSeleccionado !== '' && fechaInicial !== null && !FinDeSemana?
                inventariosCiclicos.length>0?
                  estatus === "Dia inventariado"?
                    <div className="row-middle" >
                      <IconButton
                        aria-label="inventario"
                        size = "small"
                        style = {{ backgroundColor: 'yellow', color:'black'}}
                        // disabled = {!diaHabilitado}
                        onClick={permisosNormales.editar === 1?handleObtenerDetalleInventarioProxy(IdInventarioCiclico,0):handleObtenerDetalleInventarioProxy(IdInventarioCiclico,1)}
                      >
                        <Avatar style={{backgroundColor: 'yellow' ,color:'black', width: '25px', height: '25px'}}>
                          <span>
                            {formattedDate.toString()}
                          </span>
                        </Avatar>
                      </IconButton>
                      <Grid
                        container
                        className = "componenteCalendario"
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        <Typography
                          variant='h6'
                          className={classes.typography}
                          // style={{fontSize:'1rem'}}
                        > 
                          {nombreInventario}
                        </Typography>
                      </Grid>
                    </div>
                    :
                    estatus === "Dia anterior"? 
                      <div className="row-middle" >
                        <IconButton
                          aria-label="inventario"
                          size = "small"
                          style = {{ backgroundColor: 'green', color:'black'}}
                          // disabled = {!diaHabilitado}
                          onClick={handleObtenerDetalleInventarioProxy(IdInventarioCiclico,1)}
                        >
                          <Avatar style={{backgroundColor: 'green' ,color:'black', width: '25px', height: '25px'}}>
                            <span>
                              {formattedDate.toString()}
                            </span>
                          </Avatar>
                        </IconButton>
                        <Grid
                          container
                          className = "componenteCalendario"
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                        >
                          <Typography
                            variant='h6'
                            className={classes.typography}
                            // style={{fontSize:'1rem'}}
                          > 
                            {nombreInventario}
                          </Typography>
                        </Grid>
                      </div>
                      :
                      dateFns.isSameDay(day, datosSeleccionados.fechaActual) ? 
                        <div className="row-middle" >
                          <IconButton
                            aria-label="inventario"
                            size = "small"
                            style = {{ backgroundColor: colorBoton, color:'black' }}
                            onClick={nuevaCaptura}
                            disabled = {datosSeleccionados.moldeSeleccionado === '' || permisosNormales.registrar === 0}
                          >
                            <Avatar style={{backgroundColor: colorBoton,color:'black', width: '25px', height: '25px'}}>
                              <span>
                                {formattedDate.toString()}
                              </span>
                            </Avatar>
                          </IconButton>
                          <Grid
                            container
                            className = "selectVacio"
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                            <Select
                              value={datosSeleccionados.idSeleccionMolde}
                              variant="outlined"
                              onChange={handleChangeMolde}
                              displayEmpty
                              input={<InputBase inputProps={{'aria-label': 'naked' }} />}
                              name="Molde"
                              disabled = {datosSeleccionados.almacenSeleccionado === ''}

                              // className="selectVacio"
                            >
                              {datosSeleccionados.idSeleccionMolde === '' 
                                ? <MenuItem value="">
                                  <em style= {{color:'blue',fontStyle:'normal'}}>Selecciona molde</em>
                                </MenuItem> 
                                : null}
                              {moldes.map((elem) => 
                                <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.Id}`} key={`${elem.Id}`} value={elem.Id || ''}>{`${elem.IdMolde}-${elem.Nombre} ${elem.Planta}` }</MenuItem>)}

                            </Select>
                          </Grid>
                        </div>
                        :
                        <div className="row-middle" >
                          <IconButton
                            aria-label="inventario"
                            size = "small"
                            style = {{ backgroundColor: 'red', color:'black'}}
                            disabled = {!diaHabilitado}
                          // onClick={onClickBorrarRegla(index,reglaSeleccionada)}
                          >
                            <Avatar style={{backgroundColor: 'red' ,color:'black', width: '25px', height: '25px'}}>
                              <span>
                                {formattedDate.toString()}
                              </span>
                            </Avatar>
                          </IconButton>
                          <Grid
                            container
                            className = "componenteCalendario"
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                            {evidenciaDia !== "" ? 
                              <Grid
                                item
                                align="center"
                              >
                                <Badge
                                  badgeContent={
                                    <ClearIcon 
                                      style={{cursor: 'pointer',width: '0.5em'}}
                                      // aqui mandar un modal n_n
                                      onClick = {onClickEliminarEvidenciaProxy(true,evidenciaId)}
                                      disabled = {permisosNormales.eliminar === 0}
                                    />
                                  }
                                  color="secondary"
                                >
                                  <BajarArchivoIcon
                                    className={classes.botonBajar}
                                    style={{cursor: 'pointer'}} 
                                    // onClick = {handleChangeArchivoProxy(0,i)}
                                    // className={classes.botones}
                                    onClick = {handleDownloadArchivoEvidenciaProxy(evidenciaId)}
                                  />
                                </Badge>
                              </Grid>
                              :
                              <Grid
                                item
                                align="center"
                              >
                                <input
                                  accept="*"
                                  style={{display: 'none'}}
                                  id={`subirArchivoResultados_${formattedDate.toString()}`}
                                  onChange={handleChangeArchivoEvidenciaProxy(day)}
                                  type="file"
                                />
                                <label htmlFor={`subirArchivoResultados_${formattedDate.toString()}`}>
                                  <SubirArchivoIcon
                                    className={classes.botonSubir}
                                    style={{cursor: 'pointer'}} 
                                    // onClick = {handleChangeArchivoProxy(0,i)}
                                    // className={classes.botones}
                                    // onClick = {regresar}
                                  />
                                </label>
                              </Grid>
                            }
                          </Grid>
                        </div>
                  :dateFns.isSameDay(day, datosSeleccionados.fechaActual) ? 
                    <div className="row-middle" >
                      <IconButton
                        aria-label="inventario"
                        size = "small"
                        style = {{ backgroundColor: colorBoton, color:'black' }}
                        onClick={nuevaCaptura}
                        disabled = {datosSeleccionados.moldeSeleccionado === ''}
                      >
                        <Avatar style={{backgroundColor: colorBoton,color:'black', width: '25px', height: '25px'}}>
                          <span>
                            {formattedDate.toString()}
                          </span>
                        </Avatar>
                      </IconButton>
                      {moldes.length>0?
                        <Grid
                          container
                          className = "selectVacio"
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                        >
                          <Select
                            value={datosSeleccionados.idSeleccionMolde}
                            variant="outlined"
                            onChange={handleChangeMolde}
                            displayEmpty
                            input={<InputBase inputProps={{'aria-label': 'naked' }} />}
                            name="Molde"
                            disabled = {datosSeleccionados.almacenSeleccionado === ''}

                          // className="selectVacio"
                          >
                            {datosSeleccionados.idSeleccionMolde === '' 
                              ? <MenuItem value="">
                                <em style= {{color:'blue'}}>
                                Seleccione Molde
                                </em>
                              </MenuItem> 
                              : null}
                            {moldes.map((elem) => 
                              <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.Id}`} key={`${elem.Id}`} value={elem.Id || ''}>{`${elem.IdMolde}-${elem.Nombre} ${elem.Planta}` }</MenuItem>)}

                          </Select>  
                        </Grid>
                        :
                        <Grid
                          container
                          className = "componenteCalendario"
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                        >
                          <Typography
                            variant='h6'
                            className={classes.typography}
                            style={{marginTop:'-16px'}}
                          > 
                            No hay moldes en este almacen
                          </Typography>
                        </Grid> }
                    </div>
                    :     
                    <div className="row-middle" >
                      <IconButton
                        aria-label="inventario"
                        size = "small"
                        style = {{ backgroundColor: 'red', color:'black'}}
                        disabled = {!diaHabilitado}
                        // onClick={onClickBorrarRegla(index,reglaSeleccionada)}
                      >
                        <Avatar style={{backgroundColor: 'red' ,color:'black', width: '25px', height: '25px'}}>
                          <span>
                            {formattedDate.toString()}
                          </span>
                        </Avatar>
                      </IconButton>
                      <Grid
                        container
                        className = "componenteCalendario"
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        {evidenciaDia !== "" ? 
                          <Grid
                            item
                            align="center"
                          >
                            <Badge
                              badgeContent={
                                <ClearIcon 
                                  style={{cursor: 'pointer',width: '0.5em'}}
                                  onClick = {onClickEliminarEvidenciaProxy(true,evidenciaId)}
                                  // onClick = {handleDeleteArchivoEvidenciaProxy(evidenciaId)}
                                />
                              }
                              color="secondary"
                            >
                              <BajarArchivoIcon
                                className={classes.botonBajar}
                                style={{cursor: 'pointer'}} 
                                // onClick = {handleChangeArchivoProxy(0,i)}
                                // className={classes.botones}
                                onClick = {handleDownloadArchivoEvidenciaProxy(evidenciaId)}
                              />
                            </Badge>
                          </Grid>
                          :
                          <Grid
                            item
                            align="center"
                          >
                            <input
                              accept="*"
                              style={{display: 'none'}}
                              id={`subirArchivoResultados_${formattedDate.toString()}`}
                              onChange={handleChangeArchivoEvidenciaProxy(day)}
                              type="file"
                            />
                            <label htmlFor={`subirArchivoResultados_${formattedDate.toString()}`}>
                              <SubirArchivoIcon
                                className={classes.botonSubir}
                                style={{cursor: 'pointer'}} 
                                // onClick = {handleChangeArchivoProxy(0,i)}
                                // className={classes.botones}
                                // onClick = {regresar}
                              />
                            </label>
                          </Grid>
                        }
                      </Grid>
                    </div>
                :datosSeleccionados.almacenSeleccionado!== '' && dateFns.isSameDay(day, datosSeleccionados.fechaActual) && !cargando ? 
                  <div className="row-middle" >
                    <IconButton
                      aria-label="inventario"
                      size = "small"
                      style = {{ backgroundColor: colorBoton, color:'black' }}
                      onClick={nuevaCaptura}
                      disabled = {datosSeleccionados.moldeSeleccionado === ''}
                    >
                      <Avatar style={{backgroundColor: colorBoton,color:'black', width: '25px', height: '25px'}}>
                        <span>
                          {formattedDate.toString()}
                        </span>
                      </Avatar>
                    </IconButton>
                    <Grid
                      container
                      className = "componenteCalendario"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <Typography
                        variant='h6'
                        className={classes.typography}
                        style={{marginTop:'-16px'}}
                      > 
                      No hay moldes en este almacen
                      </Typography>
                    </Grid> 
                  </div>
                  :
                  <div className="row-middle" >
                    <IconButton
                      aria-label="inventario"
                      size = "small"
                      style = {{ backgroundColor: 'white', color:'black' }}
                      disabled = {!diaHabilitado}
                    // onClick={onClickBorrarRegla(index,reglaSeleccionada)}
                    >
                      <Avatar style={{backgroundColor: 'white',color:'black', width: '30px', height: '30px'}}>
                        <span>
                          {formattedDate.toString()}
                        </span>
                      </Avatar>
                    </IconButton>
                  </div>
            }




          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row-middle" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  render() {
    const {
      // campos,
      datosSeleccionados,
      almacenes,
      handleChangeAlmacen,
      handleDeleteArchivoEvidenciaProxy,
      abrirEliminarModal,
      mensajeConfirmacion,
    } = this.props;


    // const onAceptarModal onGuardarInventarioProxy(true) :
    // const onCerrarModal = bandModal === 2 ? onGuardarInventarioProxy(false) 

    return (
      <Grid 
        item
        xs={12} 
        sm={12} 
        md={12} 
        lg={12} 
        style={{padding:'8px'}}
      >
        <Modal 
          open={abrirEliminarModal}
          typeAlert='Report'
          typeOptions='Select'
          title='Confirmar....'
          message={mensajeConfirmacion}
          onClickAccept={handleDeleteArchivoEvidenciaProxy(true)}
          onClickCancel={handleDeleteArchivoEvidenciaProxy(false)}
        />
        <Paper
          elevation = {1}
        >
          <Grid
            item
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            justify="center"
            alignItems="center"
          >
            <Select
              value={datosSeleccionados.almacenSeleccionado}
              variant="outlined"
              onChange={handleChangeAlmacen}
              displayEmpty
              input={<InputBase 
                inputProps={{ 'aria-label': 'naked' }} 
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontFamily: 'Roboto',
                  fontSize: '130%',
                  color: '#172B4D',
                  fontStyle: 'normal',
                  // lineHeight: 1.42857142857143,
                }}
              />}
              name="Almacen"
              indice={0}
              // className="selectVacio"
            >
              {datosSeleccionados.almacenSeleccionado === '' 
                ? <MenuItem value=""> 
                  <em style= {{color:'blue',fontStyle:'normal'}}>Selecciona un almacen </em>
                </MenuItem> 
                : null}
              {almacenes.map((elem) => 
                <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.IdAlmacen}`} key={`${elem.IdAlmacen}`} value={elem.IdAlmacen || ''}>{elem.Almacen}</MenuItem>)}
            </Select>
          </Grid>
          <div className="calendar">
            {/* {this.renderAños()} */}
            {this.renderFecha()}
            {this.renderDias()}
            {this.renderCells()}
          </div>


        </Paper>
      </Grid>
    );
  }
}



Calendar.propTypes = {
  
  // fechaActual: T.any,
  // diaSeleccionado: T.any,
  // fechaSeleccionada: T.any,
  // almacenSeleccionado: T.any,
  // moldeSeleccionado: T.any,
  // plantaSeleccionada: T.any,
  // setFechas: T.func,
  // getAlmacenes: T.func,
  fechaInicial: T.any,
  setFechaSeleccionada: T.func,
  setDiaSeleccionado:T.func,
  // handleMostrarDetalle:T.func,
  nuevaCaptura:T.func,
  // campos: T.object,
  almacenes: T.array,
  moldes: T.array,
  inventariosCiclicos: T.array,
  evidenciasCalendario: T.array,
  // usuarioLogeado: T.number,
  classes: T.object,
  datosSeleccionados: T.object,
  // inventarioCiclico: T.object,
  // actions: T.object,
  handleChangeAlmacen: T.func,
  handleChangeMolde:   T.func,
  handleChangeArchivoEvidenciaProxy:   T.func,
  handleDeleteArchivoEvidenciaProxy:   T.func,
  handleDownloadArchivoEvidenciaProxy: T.func,
  // handleEditarInventarioProxy: T.func,
  handleObtenerDetalleInventarioProxy: T.func,
  onClickEliminarEvidenciaProxy: T.func,
  abrirEliminarModal:T.bool,
  mensajeConfirmacion:T.string,
  cargando:T.bool,
  permisosNormales:T.object,
  // handleDeleteArchivoEvidenciaProxy: T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
    handleChangeArchivoEvidenciaProxy: (props) => (fecha) => (event) => {
      const archivosValidos = [
        'xlsx', 
        'xls', 
        'pdf', 
        'doc', 
        'docx', 
        'png', 
        'jpg', 
        'jpeg',
      ];
      const formData = new FormData();
      const arreglo = [];
      let band = false;
  
      const {
        notificacion,
        onSubirArchivoEvidencia,
      } = props;
  
  
      let tipo = '';
      const {
        target: {
          files,
        },
      } = event;
  
      for(let i = 0; i < files.length; i+=1){
        tipo = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
        tipo = tipo.toLowerCase();
        if(archivosValidos.includes(tipo.toLowerCase())){
          if(files[i].size > 5242880){
            notificacion({
              message: 'El tamaño del archivo sobrepasa el limite permitido',
              options: {
                variant: 'warning',
              },
            })
          } else {
            band = true;
            formData.append('files',files[i]);
            arreglo.push(files[i]);
          }
        } else {
          notificacion({
            message: 'Archivos no admitidos',
            options: {
              variant: 'warning',
            },
          })
        }
      }
      event.target.value = null;
      if(band){
        onSubirArchivoEvidencia(formData, arreglo,fecha);
      }
    },
  
    handleDeleteArchivoEvidenciaProxy: (props) => (eliminar) => () => {
      const {
        onDeleteArchivoEvidencia,
      } = props;
      onDeleteArchivoEvidencia(eliminar)
    },
  
    onClickEliminarEvidenciaProxy: (props) => (band,IdEvidencia) => () => {
      const {
        handleEliminarModal,
      } = props;
      handleEliminarModal(band,IdEvidencia);
    },

    handleDownloadArchivoEvidenciaProxy: (props) => (IdEvidencia) => () => {
      const {
        onDownloadArchivoEvidencia,
      } = props;
      onDownloadArchivoEvidencia(IdEvidencia);
    },

    handleObtenerDetalleInventarioProxy: (props) => (IdInventarioCiclico,tipoDetalle) => () => {
      const {
        handleObtenerDetalleInventario,
      } = props;
      handleObtenerDetalleInventario(IdInventarioCiclico,tipoDetalle);
    },

    


    // onInputChangeProxy: (props) => (id) => (e) => {
    //   const {
    //     onInputChange,
    //     onInputFolio,
    //     campos,
    //   } = props;
      
    //   // Aqui mandar a llamar el molde con ese folio
    //   if (campos.tipoMovimiento.valor === 5 && id === 3 && e.keyCode === 13 || e.keyCode === 9){
    //     onInputFolio(id,e.target.value)
    //   }else{
    //     onInputChange(id, e.target.value);
    //   }
    // },

    // handleDeleteArchivoProxy: (props) => (band) => () => {
    //   const {
    //     handleDeleteArchivo,
    //   } = props;
    //   handleDeleteArchivo(band);
    // },
    // onCancelarNuevoMovimientoProxy: (props) => (band) => () => {
    //   const {
    //     onCancelarNuevoMovimiento,
    //   } = props;
    //   onCancelarNuevoMovimiento(band);
    // },
  })
)(Calendar);
// export default Calendar;