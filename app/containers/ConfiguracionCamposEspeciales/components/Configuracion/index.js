/* eslint-disable prefer-destructuring */
import React from 'react';
import { compose } from 'redux';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {assign,isEmpty} from 'lodash'
import { connect } from 'react-redux';
import { Grid, AppBar, Toolbar, Paper, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Redirect} from 'react-router-dom'
import { Container } from '../../styledComponents';
import ButtomAddComponent from '../../../ConfiguracionTicket/components/ButtomAddComponent';
import InputAdded from '../../../ConfiguracionTicket/components/ComponentAdded';

import ComponentConfig from '../../../ConfiguracionTicket/components/ComponentConfig';

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
});

// eslint-disable-next-line react/prefer-stateless-function
export class Configuracion extends React.Component {

  componentDidMount() {
    // console.log("componentDidMount ",this.props.location);
    const {
      // configuracion:{
      //   componentes,
      //   soloConfigEspeciales,
      //   datosEtapas,
        
      // },
      actions:{
        desactivarCamposEspeciales,
      },
    } = this.props;

    desactivarCamposEspeciales()
  }


  validarCampos = () =>{
    // Validar que aqui el tipo de componente 
    // dependiendo el tipoComponenteId
    let error = false;
    let guardar = true;
    const {
      configuracion:{
        componentes,
        soloConfigEspeciales,        
      },
      
      actions:{
        onChangeErrorTipo,
        onChangeErrorLongitud,
        onChangeErrorOpcion,
        onChangeErrorComponente,
        onChangeErrorCantidadArchivos,
        onChangeErrorTamañoArchivos,
        onChangeErrorCatalogo,
        redireccionarCofig,
        guardarConfig,
      },
    } = this.props;
    // console.log(this.props,"PROS EN CONFIG ESPECIALES");
  
    // const etapaSeleccionada.reglas.map(item => ({})
    componentes.forEach((componente,index) => {
      switch(componente.tipoComponenteId){
        case 0:
          onChangeErrorTipo(componentes[index].config.value === "",index)
          onChangeErrorLongitud(componentes[index].config.longitud <=0,index)
          error = componentes[index].config.value === "" || componentes[index].config.longitud<=0;
          break;
        case 1:
          onChangeErrorTipo(componentes[index].config.value=== "",index)
          onChangeErrorLongitud(componentes[index].config.longitud<=0,index)
          error = componentes[index].config.value === "" || componentes[index].config.longitud<=0;
          break;
        case 2:
          componente.config.opciones.map((opt,indexOpcion) => (
            onChangeErrorOpcion(opt.value.trim() ==="",index,indexOpcion)
          ))
          error = componente.config.opciones.filter((opt) => opt.value.trim() === "").length > 0; 
          break;
        case 3:
          componente.config.opciones.map((opt,indexOpcion) => (
            onChangeErrorOpcion(opt.value.trim() ==="",index,indexOpcion)    
          ))
          error = componente.config.opciones.filter((opt) => opt.value.trim() === "").length > 0;
          break;
        case 4:
          componente.config.opciones.map((opt,indexOpcion) => (
            onChangeErrorOpcion(opt.value.trim() ==="",index,indexOpcion)    
          ))
          error = componente.config.opciones.filter((opt) => opt.value.trim() === "").length > 0;
          break;
        case 5:
          onChangeErrorCantidadArchivos( componentes[index].config.cantidadarchivos<=0,index)
          onChangeErrorTamañoArchivos( componentes[index].config.tamañoarchivos<=0,index)
          error = componentes[index].config.cantidadarchivos<=0 || componentes[index].config.tamañoarchivos<=0;
          break;
        case 6:
          onChangeErrorCatalogo( componentes[index].config.valorNumero<=0,index)
          error = componentes[index].config.valorNumero<=0;
          break;
          // componentes[campoSelecionado].config.opciones.map((opt,index) => (
          //   error = true,
          //   ))
        default:
          error = true;
          break;
      }
      // Si hay algun error no dejara guardar
      if (error){
        guardar=false
      }
      onChangeErrorComponente(error,index)    
    })
    if(guardar && soloConfigEspeciales === false){
      
      redireccionarCofig()
    }
    if(guardar && soloConfigEspeciales === true){
      guardarConfig(componentes)
    }
    
  }
  
  render() {
    // const { componentes, tiposCampos } = this.state;

    const {
      configuracion:{
        componentes,
        tiposCampos,
        campoSelecionado,
        divSelecionado,
        arrCatalogos,
        soloConfigEspeciales,
        salirConfiguracion,
        datosEtapas,
      },
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
        obtenerCatalogos,
        onChangeValueCatalogo,
        onChangeSwitchRelacion,
        notificacion,
        onChangeSwitchRelacionaOtro,
        redirectConf,
      //   agregarCamposEspecialesEtapa,
      },
      redirigirConfig,
      guardarConfig,
    } = this.props;

    
    // console.log(this.props,componentes,"LAS PROPS DE ESPECIALES ------------------....");
    // console.log(componentes,divSelecionado,"LOS COMPONENTES PAP ------------------....");
    
    const classes = this.props;
    const tipoDecamposSinCatalago = []
    
    if(soloConfigEspeciales){
      console.log(tiposCampos,"tiposCampos");
      
      for (let i = 0; i < tiposCampos.length; i++) {
        if(tiposCampos[i].id === "textocorto" || tiposCampos[i].id === "textolargo" || tiposCampos[i].id === "seleccionmulti" || tiposCampos[i].id === "seleccionsimple" || tiposCampos[i].id === "listadesplegable"){
          tipoDecamposSinCatalago.push(tiposCampos[i])
        }
      }
    }
    
    if(salirConfiguracion){
      return <Redirect to={{pathname: '/nuevo-configuracionTickets',state:datosEtapas.length > 0 ? { datosEtapas: {etapasTemporales:datosEtapas},salirConfig:false}:{}}}/> 
    }

console.log(componentes,"TODOS LOS COMPONENTES");

    // <Redirect to={{pathname: '/nuevo-configuracionTickets',state: { datosEtapas: {confEtapas,configuracionCampos,etapasTemporales,datosEtapasBorradas}}}}/> 
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
            <AppBar
              position="static"
              color="default"
            >
              <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Configuración componentes
                </Typography>
              </Toolbar>
            </AppBar>
            {/* BODY */}
            <Container 
              name="body"
              flexDirection="row" 
              style={{
                // display: 'inline-block',
                height: '100%',
              }}
            >
            
              <Grid container>
                <Grid 
                  item 
                  xs={12} 
                  sm={12} 
                  md={6}
                  style={ {
                    padding: '10px 5px 10px 10px', 
                    height: '79vh',
                  }}
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
                        {componentes.map((element, index)  => (
                          
                          <InputAdded
                            // eslint-disable-next-line react/no-array-index-key
                            key={`comp_especial_${index}`}
                            onClicked={handleClickField(index)}
                            titulo={element.config.nomCampo}
                            colorearBorde={element.config.colorearBorde}
                            onChangeTipo={handleChangeTipo}
                            tipoComponenteVal={element.tipoComponenteId}
                            indexId={index}
                            tiposCampos={soloConfigEspeciales === true ? tipoDecamposSinCatalago :tiposCampos}
                            onChangeTitle={onChangeTitle} 
                            divSelecionado={index}
                            onClickedDeleted={onClickedDelCampo(element.config.nomCampo,index)}
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
                    // position: 'relative',
                  } }
                >
                  <Paper 
                    className={classes.paper}
                    style={{ 
                      // height:'79vh',
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
                        Configuración del Campo
                      </Typography> */}
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
                          requeridoRelacion={componentes[divSelecionado].config.requeridoRelacion}
                          relacionaOtro={componentes[divSelecionado].config.relacionaOtro}
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
                          notificacion={notificacion}
                          // relacionaOtro={componentes[divSelecionado].config.relacionaOtro}
                          // onChangeSwitchRelacionaOtro={onChangeSwitchRelacionaOtro}
                        />

                        {/* <MultipleSelection/> */}
                      </Container>
                      
                      <Container
                        flexDirection="row"
                        justify="flex-end"
                        alignItems="flex-end"
                        style={{
                          bottom: '0px',
                          // position: 'absolute',
                          padding: '20px 30px 30px 0px',
                        }}
                      >
                        {soloConfigEspeciales === true && ( 
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
                          
                            onClick={redirectConf}

                          >
                        Cerrar
                          </Button>)}
                        {soloConfigEspeciales === false && ( 
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
                        )}
                        <Button
                          variant="contained"

                          size="small"
                          className={classes.button}
                          style={{ 
                            marginLeft: '20px',
                            backgroundColor:'#28950F',
                            color:'#F7F7F7',
                          }}
                          // Validar en vez de redirecciona
                          onClick={this.validarCampos} 
                        >
                          Guardar
                        </Button>

                      </Container>
                    </Container>
                  </Paper>
                </Grid>
              </Grid>
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
};

Configuracion.defaultProps = {

}

export default compose(
  withStyles(styles),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
    
    
    })
  )

)(Configuracion);