import React from 'react';
import { compose } from 'redux';
import { find } from 'lodash';
import T from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect} from 'react-router-dom'
import Input from '@material-ui/core/Input';
import { createStructuredSelector } from 'reselect';
// import Chip from '@material-ui/core/Chip';
// eslint-disable-next-line import/no-duplicates
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// eslint-disable-next-line import/no-duplicates
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AutoCompletable from 'components/FiltroSeleccion';
import { withHandlers } from 'recompose';
import { Grid, AppBar, Toolbar,
  Paper, 
  Button, 
  // Divider,
  Card,
  CardContent,
  TextField,
  // Selection, 
  FormGroup,
  FormControlLabel,
  IconButton,
  Checkbox,
  RadioGroup,
  Radio,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import makeSelectConfiguracionTickets from '../../selectors';
// import { debug } from 'util';
import { Container } from '../../styledComponents';
import ButtomAddComponent from '../../../ConfiguracionTicket/components/ButtomAddComponent';
import InputAdded from '../../../ConfiguracionTicket/components/ComponentAdded';
import ComponentConfig from '../../../ConfiguracionTicket/components/ComponentConfig';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
}
const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiCheckbox: {
        colorSecondary: {
          color: '#28950f',
          '&$checked': {
            color: '#28950f !important',
          },
        },
      },
    },
  })
  
const GreenRadio = withStyles({
  root: {
    color: '#28950f',
    '&$checked': {
      color: '#28950f',
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '79vh',
  },
  card: {
    padding: '10px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});


// eslint-disable-next-line react/prefer-stateless-function


export class Configuracion extends React.Component {
  // class LineaBase extends React.Component {
  
  render() {
    // const { componentes, tiposCampos } = this.state;

    const {
      configuracion:{
        componentes,
        tiposCampos,
        campoSelecionado,
        divSelecionado,
        servicioTipos,
        selectionTipo,
        servicioDepartamentos,
        selectionDepartamento,
        servicioPrioriza,
        selectionPrioriza,
        servicioPuestos,
        selectionPuesto,
        autorizacion,
        seguimiento,
        etapasCheck,
        selectionServicio,
        selectionTiempoRespuesta,
        idPlantilla,
        etapas,
        selectionPermisosPuesto,
        selectionCierreRespuesta,
        tipoTiempoRespuesta,
        tipoCierreRespuesta,
        arrCatalogos,
        errores,
        redirectCamposEspeciales,
      },
      redirect,
      onchageDepartamentos,
      permisos,
      actions:{
        handleClickField,
        handleChangeTipo,
        onChangeLongitud,
        onChangeTitle,
        onClickedDelCampo,
        agregarCampo,
        onChangeTipoTextoCorto,
        onChangeObligatorio,
        onChangeText,
        onClickedAdd,
        onClickedDelete,
        onInputChange,
        onChangeTamañosArchivos,
        onChangeTipoArchivo,
        cancelarCofigCampos,
        onChangeNomServicio,
        handleChangeTipoServicio,
        handleChangePriorizador,
        handleChangePuesto,
        redirigirEtapas,
        checkEtapas,
        checkAutorizacion,
        checkSeguimiento,
        onChangeNomTiempoRespuesta,
        handleChangePermisos,
        onChangeNomCierreFaltaRespuesta,
        onChangeTipoTiempoRespuesta,
        onChangeTipoCierreRespuesta,
        obtenerCatalogos,
        onChangeValueCatalogo,
        onChangeSwitchRelacion,
        onChangeSwitchRelacionaOtro,
        guardarTicket,
        actualizarTicket,
        redirigirEspeciales,
        handleChangeDepartamento,        
      },
    } = this.props;

    console.log(this.props,"confi normal ----------------------");
    const departamentosArray = servicioDepartamentos.map(item => ({ value: item.IdDepartamento, label: item.Nombre }))    
    let selectionDepartamentoValue = {}
    if(selectionDepartamento.value === undefined)
    {
      selectionDepartamentoValue = find(servicioDepartamentos,['IdDepartamento',selectionDepartamento])
      // console.log(selectionDepartamentoValue);
      if(selectionDepartamentoValue !== undefined)  
        selectionDepartamentoValue = {value:selectionDepartamentoValue.IdDepartamento,label:selectionDepartamentoValue.Nombre}

    }
    // console.log(selectionDepartamentoValue,"selectionDepartamentoValue ----------------------");


    // console.log("Que envio como Etapas",etapas)
    // REDIRIGIR ETAPAS
    if(redirect)
      return <Redirect to={{pathname: 'configuracion-campos-especiales',state: { IdPlantilla:idPlantilla,Etapas:etapas,componentes,permisos }}} />
      // return <Redirect to='/nuevo-configuracionTickets'  />  

    if(redirectCamposEspeciales){
      if (etapas.length > 0) {
        return <Redirect to={{pathname: 'configuracion-campos-especiales',state: { redirectCamposEspeciales,camposEspeciales:etapas[0].configuracion,IdEtapa:etapas[0].IdEtapa,tiempos:etapas[0].tiempos}}} />
      }
      return <Redirect to={{pathname: 'configuracion-campos-especiales',state: { redirectCamposEspeciales,camposEspeciales:[]}}} />

    }

    const classes = this.props;
    return (
      <div
        className = {classes.body}
      >
        <Grid
          container
        >
          <Container
            flexDirection="column"
          >
            {/* HEADER */}
            <AppBar style={{backgroundColor: grey[200]}} position="static"> 
              <Toolbar variant="dense" style={{paddingLeft: 8}}> 
                <Typography variant="h6" color="primary" style={{flexGrow: 1}}> 
                Configuración de nuevo servicio 
                </Typography> 
              </Toolbar> 
            </AppBar>
            {/* BODY */}
            <Container name = "body" flexDirection="row" style={{display: 'inline-block',height: '100%'}} >
              <Grid
                container
              >

                {/* Primera parte */}
                <Grid 
                  item 
                  xs={12} 
                  sm={12} 
                  md={6}
                  style={ {
                    padding: '10px 5px 10px 10px',
                    position: 'relative',
                  } }
                >
                  <Paper 
                    className={classes.paper}
                    style={{ 
                      height:'25vh',
                    }}
                  >
                    <Container
                      flexDirection="column"
                      style={{
                        height:'100%',
                      }}
                    >
                      {/* <Grid item sm={12} xs={12} md={12}> */}
                      <Card 
                        className={classes.backgroundColor}
                        style={
                          {
                            height:'100%',
                            overflow:'auto',
                            borderColor: 'white'}}>
                        <CardContent  
                         
                        >
                          <Container flexDirection="column" >
                            <Container container flexDirection="row" style={{ alignItems: 'flex-end' }} justify="flex-end">
                              <FormControl fullWidth>
                                <TextField
                                  label="Nombre del Servicio"
                                  type="text"
                                  value={selectionServicio}
                                  error={errores.errorServicio}
                                  onChange={ onChangeNomServicio}
                                  onBlur={this.handleBlur}
                                  helperText="*Requerido"
                                />
                              </FormControl>
                            </Container>
                            <Container flexDirection="row" style={{ alignItems: 'flex-end' }}>
                              

                              <Grid item xs={5} sm={5} md={5}  >
                                <FormControl fullWidth>
                                  <InputLabel style={{fontSize: 14}} htmlFor="departamento-id">Tipo</InputLabel>
                
                                  <Select
                                    value={selectionTipo}
                                    onChange={handleChangeTipoServicio}
                                    displayEmpty
                                    style={{fontSize: 14}}
                                    name="selectionTipo"
                                    MenuProps= {{
                                      PaperProps: {
                                        style : {
                                          maxHeight: 60 * 4.5,
                                        },
                                      },  
                                    }}
                                  >
                                    {servicioTipos.map((elem) => 
                                      <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.IdTipo}`} key={`${elem.IdTipo}`} value={elem.IdTipo || ''}>{elem.Nombre}</MenuItem>)}
                                  </Select>
                                </FormControl> 
                              </Grid> 
                              <Grid item xs={1} sm={1} md={1}></Grid>
                              <Grid item xs={5} sm={5} md={5} style={{ paddingTop:'10px'}}>
                                <AutoCompletable
                                  valor={selectionDepartamentoValue !== undefined ? selectionDepartamentoValue : selectionDepartamento}
                                  onChange={handleChangeDepartamento}
                                  opciones={departamentosArray}
                                  // campoValido={errores.errorTipoProyecto}
                                  campoValido
                                  label='Departamentos'
                                  indice={1}
                                  // inhabilitado ={idProyecto > 0}
                                />
                              </Grid>
                                                            
                              {/* -- COMBO DE DEPARTAMENTOS  */}
{/* 
                              <Grid item xs={5} sm={5} md={5}  > 
                                <FormControl fullWidth>
                                  <InputLabel style={{fontSize: 14}} htmlFor="departamento-id">Departamento</InputLabel>
                                  <Select
                                    value={selectionDepartamento}
                                    onChange={handleChangeDepartamento}
                                    style={{fontSize: 14}}
                                    displayEmpty
                                    name="Departamentos"
                                    MenuProps= {{
                                      PaperProps: {
                                        style : {
                                          maxHeight: 60 * 4.5,
                                        },
                                      },
                                    }}
                                  >
                                    {selectionTipo === 2 && (
                                      <MenuItem key={0} value={99999999} style={{fontSize: 14}}>
                                        Todos
                                      </MenuItem>
                                    )}
                                    {servicioDepartamentos.map((elem) => 
                                      <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.IdDepartamento}`} key={`${elem.IdDepartamento}`} value={elem.IdDepartamento || ''}>{elem.Nombre}</MenuItem>)}
                                  </Select>
                                </FormControl>
                              </Grid> */}


                              {/* <Grid
                                item
                                xs={6}
                              >
                                <TextField
                                  style={{marginTop: 0, marginLeft: 15}}
                                  select
                                  label="Sección"
                                  margin="normal"
                                  fullWidth
                                  name="molde"
                                  value={origen.idSeccion}
                                  onChange={(e) => seccionFilterAction(e, 1)}
                                >
                                  <MenuItem key={0} value={0}>
                            Todos
                                  </MenuItem>
                                  {origen.secciones.map(seccion => (
                                    <MenuItem key={seccion.IdSeccion} value={seccion.IdSeccion}>
                                      {seccion.Nombre}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </Grid>  */}




                            </Container>
                          </Container>
                        </CardContent>
                      </Card>
                    </Container>
                  </Paper> 
                </Grid>
                <Grid 
                  item 
                  xs={12} 
                  sm={12} 
                  md={6}
                  style={ {
                    padding: '10px 10px 10px 5px',
                    position: 'relative',
                  } }
                >

                  <Paper 
                    className={classes.paper}
                    style={{ 
                      height:'25vh',
                    }}
                  >
                    <Card 
                      className={classes.backgroundColor}
                      style={
                        {
                          height:'100%',
                          overflow:'auto',
                          borderColor: 'white'}}>
                      <Grid item xs={12} sm={12} md={12}  style={{ padding: '3px 8px 12px 6px' }}>
                        <Grid container >
                          <Grid item xs={7} sm={7} md={7} style={{ padding: '5px 10px' }}>
                            {/* <Grid container style={{ padding: '5px 20px',backgroundColor: 'yellowgreen'  }}  > */}
                            <FormControl fullWidth>
                              <InputLabel style={{fontSize: 14}} htmlFor="departamento-id">Priorizador</InputLabel>
                              <Select
                                value={selectionTipo === 2 ? 99999999 : selectionPrioriza}
                                onChange={handleChangePriorizador}
                                style={{fontSize: 14}}
                                displayEmpty
                                name="selectionPrioriza"
                                MenuProps= {{
                                  PaperProps: {
                                    style : {
                                      maxHeight: 60 * 4.5,
                                    },
                                  },
                                }}
                                error={errores.errorPriorizador}
                                disabled={
                                  selectionDepartamento === '' || selectionTipo ===2 || etapasCheck
                                }
                              >
                                {servicioPrioriza.map((elem) => 
                                  <MenuItem 
                                    style={{fontSize: 14}}  
                                    id={`departamentos_${elem.NoEmpleado}`} 
                                    key={`${elem.NoEmpleado}`} value={elem.NoEmpleado || ''}>
                                    {`${elem.Nombre} ${elem.ApellidoPaterno} ${elem.ApellidoMaterno}`}
                                  </MenuItem>)}
                              </Select>
                            </FormControl>
                            <FormControl fullWidth>
                              <InputLabel style={{fontSize: 14}} htmlFor="departamento-id">Puesto</InputLabel>
                              <Select
                                value={selectionPuesto}
                                onChange={handleChangePuesto}
                                style={{fontSize: 14}}
                                displayEmpty
                                name="servicioPuestos"
                                MenuProps= {{
                                  PaperProps: {
                                    style : {
                                      maxHeight: 60 * 4.5,
                                    },
                                  },
                                }}
                                disabled={selectionTipo ===2}
                              >
                                {servicioPuestos.map((elem) => 
                                  <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.IdPuesto}`} key={`${elem.IdPuesto}`} value={elem.IdPuesto || ''}>{elem.Nombre}</MenuItem>)}
                              </Select>
                              
                            </FormControl>
                            <FormControl fullWidth>
                              <InputLabel style={{fontSize: 14}} htmlFor="departamento-id">Permisos por puesto</InputLabel>
                              <Select
                                multiple
                                value={selectionPermisosPuesto}
                                input={<Input id="select-multiple-checkbox" />}
                                onChange={handleChangePermisos}
                                MenuProps={MenuProps}
                                disabled={selectionTipo ===2}
                              >

                                {servicioPuestos.map((elem) => 
                                  <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.IdPuesto}`} key={`${elem.IdPuesto}`} value={elem.IdPuesto || ''}>{elem.Nombre}</MenuItem>)}
                              </Select>
                            </FormControl>
                            {/* </Grid> */}
                            {/* </Grid> */}
                          </Grid>
                          <Grid item xs={5} sm={5} md={5} style={{ padding: '5px 10px' }}>
                            <MuiThemeProvider theme={getMuiTheme}>
                              <FormGroup row>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={etapasCheck}
                                      onChange={(e) => {
                                        checkEtapas(e);
                                      } }
                                      value={etapasCheck}
                                      // disabled={selectionPrioriza }
                                    />
                                  }
                                  label="Etapas"
                                  // disabled={selectionPrioriza || selectionTipo ===2}
                                />
                                {etapasCheck  && (
                                  <IconButton aria-label="Editar"  onClick={selectionTipo ===2 ? redirigirEspeciales :redirigirEtapas}>
                                    <EditIcon   />
                                  </IconButton>)}
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={autorizacion}
                                      onChange={(e) => {
                                        checkAutorizacion(e);
                                      }}
                                      value={autorizacion}
                                    />
                                    
                                  }
                                  disabled={selectionPrioriza || selectionTipo ===2}
                                  label="Requiere Autorización"
                                />
                                
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={seguimiento}
                                      onChange={(e) => {
                                        checkSeguimiento(e);
                                      } }
                                      value={seguimiento}
                                    />
                                  }
                                  label="Requiere iniciar Seguimiento"
                                />
                              </FormGroup>
                            </MuiThemeProvider> 
                          </Grid>   
                        </Grid> 
                        {/* </Card> */}
                      </Grid>
                    </Card>
                  </Paper>
                </Grid>

              </Grid>
              {selectionTipo && selectionServicio && selectionDepartamento && (
                <Grid container>
                  <Grid 
                    item 
                    xs={12} 
                    sm={12} 
                    md={6}
                    style={ {padding: '10px 5px 10px 10px', height: '79vh'}}
                  >
                    <Paper 
                      className={classes.paper}
                      style={{ 
                        height:'79vh',
                      }}
                    >
                      <Container
                        flexDirection="column"
                      >
                        {/* <Typography 
                        variant="h6"
                        gutterBottom
                        align="center"
                        fontWeight="fontWeightLight"
                      >
                        Configuración
                      </Typography> */}
                        <Typography 
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            margin: '5px 0px 5px 0px',
                          }}
                          align="center"
                          gutterBottom
                        >
                        Configuración
                        </Typography>

                        <Container
                          flexDirection="row"
                          justify="space-between"
                          style={{
                            padding: '10px 10px 5px 20px',
                            alignItems: 'center',
                          }}
                        
                        >
                          <Typography 
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                            }}
                          >
                          Datos del servicio:
                          </Typography>
                          <ButtomAddComponent
                            onClick={agregarCampo}
                          // ref={instance => {
                          //   this.inputAddedIns = instance;
                          // }}
                          />
                        </Container>

                        <Container
                          flexDirection="column"
                          style={{
                            overflowY: 'auto',
                            maxHeight: '60vh',
                            padding: '10px 20px',
                          }}
                        >
                          {componentes.map((element, index) => (
                            <InputAdded
                            
                              // eslint-disable-next-line react/no-array-index-key
                              key={`comp_especial_${index}`}
                              onClicked={handleClickField(index)}
                              titulo={element.config.nomCampo}
                              onChangeTipo={handleChangeTipo}
                              tipoComponenteVal={element.tipoComponenteId}
                              colorearBorde={element.config.colorearBorde}
                              indexId={index}
                              tiposCampos={tiposCampos}
                              onChangeTitle={onChangeTitle} 
                              divSelecionado={index}
                              onClickedDeleted={onClickedDelCampo(index)}
                              totalForms={componentes.length}
                            />
                          ))}
                        </Container> 
                     
                      </Container>
                    </Paper>

                  </Grid>
                  <Grid 
                    item 
                    xs={12} 
                    sm={12} 
                    md={6}
                    style={ {
                      padding: '10px 10px 10px 5px',
                      position: 'relative',
                    } }
                  >
                    <Paper 
                      className={classes.paper}
                      style={{ 
                        height:'79vh',
                      }}
                    >
                      <Container
                        flexDirection="column"
                      >
                        <Typography 
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            margin: '5px 0px 10px 0px',
                          }}
                          align="center"
                          gutterBottom
                        >
                        Propiedades del campo
                        </Typography>   
                        <Container
                          flexDirection="column"
                          style={{
                            paddingTop: '20px',
                            padding: '0px 20px',
                          }}
                        >
                          <ComponentConfig
                            idTipoComponente={campoSelecionado}
                            componentes={componentes}
                            onClickedButtom ={onClickedAdd}
                            onClickedDelete={onClickedDelete}
                            onInputChange={onInputChange}
                            divSelecionado={divSelecionado}
                            titulo={componentes[divSelecionado].config.nomCampo}
                            onChangeTipo ={onChangeTipoTextoCorto}
                            valor={componentes[divSelecionado].config.value}
                            valorNumero={componentes[divSelecionado].config.valorNumero}
                            onChangeObligatorio={onChangeObligatorio}
                            requerido={componentes[divSelecionado].config.requerido}
                            relacionaOtro={componentes[divSelecionado].config.relacionaOtro}
                            requeridoRelacion={componentes[divSelecionado].config.requeridoRelacion}
                            longitud={componentes[divSelecionado].config.longitud}
                            onChangeLongitud={onChangeLongitud}
                            error={componentes[divSelecionado].config.error}
                            error2={componentes[divSelecionado].config.error2}
                            errorTipo={componentes[divSelecionado].config.errorTipo}
                            errorLongitud={componentes[divSelecionado].config.errorLongitud}
                            helpertext={componentes[divSelecionado].config.helpertext}
                            helpertext2={componentes[divSelecionado].config.helpertext2}
                            CantidadArchivos={componentes[divSelecionado].config.cantidadarchivos}
                            TamañoArchivos={componentes[divSelecionado].config.tamañoarchivos}
                            onChangeText={onChangeText}
                            tipoArchivo={componentes[divSelecionado].config.tipoArchivo}
                            onChangeTamañosArchivos={onChangeTamañosArchivos}
                            onChangeTipoArchivo={onChangeTipoArchivo}
                            arrCatalogos={arrCatalogos}
                            obtenerCatalogos={obtenerCatalogos}
                            onChangeValueCatalogo={onChangeValueCatalogo}
                            onChangeSwitchRelacion={onChangeSwitchRelacion}
                            onChangeSwitchRelacionaOtro={onChangeSwitchRelacionaOtro}
                          />
                        </Container>
                        <Container
                          flexDirection="row"
                          justify="flex-end"
                          style={{
                            bottom: '0px',
                            position: 'absolute',
                            padding: '0px 30px 30px 0px',
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            className={classes.button}
                            style={{ 
                              marginLeft: '20px',
                              backgroundColor:'#FF0023',
                              color:'#F7F7F7',
                            }}
                            // color='#FF0023'
                            onClick={cancelarCofigCampos}
                          >
                        Cerrar
                          </Button>
                          {!idPlantilla && (
                            <Button
                              variant="contained"

                              size="small"
                              className={classes.button}
                              style={{ 
                                marginLeft: '20px',
                                backgroundColor:'#28950F',
                                color:'#F7F7F7',
                              }}
                              onClick={guardarTicket}
                            >
                          Guardar
                            </Button>)}
                          {idPlantilla && (
                            <Button
                              variant="contained"

                              size="small"
                              className={classes.button}
                              style={{ 
                                marginLeft: '20px',
                                backgroundColor:'#28950F',
                                color:'#F7F7F7',
                              }}
                              onClick={actualizarTicket}
                            >
                          Actualizar
                            </Button>)}

                        </Container>
                        <Container
                          flexDirection="columm"
                          style={{ padding: '10px 20px' }}
                        >
                          <Grid container item xs={12} sm={12} md={12}>
                            <Container
                              flexDirection="row"
                              style={{ marginBottom: '10px', alignItems: 'center' }}
                            >
                              {!etapasCheck && (
                                <Grid item xs={6} sm={5} md={7}>
                                  <TextField
                                    label="Tiempo de Respuesta"
                                    fullWidth
                                    type="number"
                                    value={selectionTiempoRespuesta}
                                    error={errores.errorTiempoRespuesta}
                                    onChange={onChangeNomTiempoRespuesta}
                                    disabled={etapasCheck}
                                  />
                                </Grid>)}
                              {etapasCheck && (
                                <Grid item xs={6} sm={5} md={7}>
                                  <TextField
                                    label="Tiempo de Respuesta"
                                    fullWidth
                                    type="number"
                                    value={selectionTiempoRespuesta}
                                    error={errores.errorTiempoRespuesta}
                                    onChange={onChangeNomTiempoRespuesta}  
                                    disabled={etapasCheck}                           
                                  />
                                </Grid>)}
                              
                              <Grid
                                container
                                item
                                xs={6}
                                sm={7}
                                md={5}
                                style={{ alignItems: 'center' }}
                              >
                                <Container
                                  flexDirection="row"
                                  style={{ alignItems: 'center' }}
                                >
                                  <RadioGroup
                                    row
                                    name="tiempoRespuesta"
                                    value={etapasCheck ? 'horas':tipoTiempoRespuesta}
                                    onChange={onChangeTipoTiempoRespuesta}
                                    style={{ display: 'flex', flexDirection: 'row' }}
                                  >
                                    {/* {selectionTiempoSLA !== "" && ( */}
                                    <FormControlLabel
                                      value="dias"
                                      control={<GreenRadio />}
                                      label="Días"
                                      disabled={etapasCheck}
                                    />
                                    {/* )} */}
                                    
                                    <FormControlLabel
                                      value="horas"
                                      control={<GreenRadio />}
                                      label="Horas"
                                                                
                                    />
                                  </RadioGroup>
                                </Container>
                              </Grid>
                            
                            </Container>
                            {/* CIERRE POR FALTA DE RESPUESTA */}
                            <Container flexDirection="row">
                              <Grid item xs={6} sm={5} md={7}>
                                <TextField
                                  label="Cierre Por Falta de Respuesta"
                                  fullWidth
                                  type="number"
                                  value={selectionCierreRespuesta}
                                  error={errores.errorCierreRespuesta}
                                  onChange={onChangeNomCierreFaltaRespuesta}
                                  // disabled={etapasCheck}                             
                                />
                              </Grid>

                              <Grid item xs={6} sm={7} md={5}>
                                <Container flexDirection="row">
                                  <RadioGroup
                                    row
                                    name="cierreTiempoRespuesta"
                                    value={etapasCheck ? 'horas' : tipoCierreRespuesta}
                                    onChange={onChangeTipoCierreRespuesta}
                                    style={{ display: 'flex', flexDirection: 'row' }}
                                    disabled={etapasCheck}
                                  >
                                  
                                    <FormControlLabel
                                      value="dias"
                                      control={<GreenRadio disabled={etapasCheck}/>}
                                      label="Días" 
                          
                                    />
                                  
                                    <FormControlLabel
                                      value="horas"
                                      control={<GreenRadio />}
                                      label="Horas"
                                      checked={false}
                                    />
                                  </RadioGroup>
                                </Container>
                              </Grid>
                            </Container>
                          </Grid>
                        </Container>
                      </Container>                  
                    </Paper>                
                  </Grid>
                </Grid>)}
            </Container>
          </Container>
        </Grid>
      </div>
    );
  }
}

Configuracion.propTypes = {
  configuracion: T.object,
  actions: T.object,
  redirect: T.bool,
};
const mapStateToProps = createStructuredSelector({
  planDeTrabajo: makeSelectConfiguracionTickets(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

Configuracion.defaultProps = {

}

export default compose(
  withStyles(styles),
  // withConnect,
  withHandlers({
    onInputChangeProxy: (props) => () => (e) => {      
      const {
        actions:{
          handleChangeDepartamento,
        },
      } = props;
    
      console.log(props,"collective paranoioa");

      handleChangeDepartamento(e)
      
    },
  }),
  
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      insertCurrentUserState: (currentUser) => {         
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/INSERT_CURRENT_USER_ACTION',
          currentUser,
        });
      },
      onchageDepartamentos: (event) => {     
        
        console.log(event,"Sickness");
        
        // dispatch({
        //   type: 'APP/CONTAINER/TABLEROS/INSERT_CURRENT_USER_ACTION',
        //   currentUser,
        // });
      },

      
    })
  ),
)(Configuracion);