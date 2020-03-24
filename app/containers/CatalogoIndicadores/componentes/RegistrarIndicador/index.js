import React from 'react';
import T from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { TextField, Grid } from '@material-ui/core';
import Appbar from 'components/Appbar';


// Componentes
import Success from 'components/BotonSuccess';
import Cancelar from 'components/BotonCancelar'
import Modal from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
import { Container } from './styledComponents';


const styles = {
  grow: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: '1000%',
  },
  textFld: { 
    width: '90%', margin:20,
  },
  success: {
    marginRight: 10,
  },
}
  
export class RegistrarIndicador extends React.Component {
 
  validaTexfield(e) {
    const { setTextfieldNombreAction, setTextfieldDescripcionAction } = this.props;
    //if (!/[^0-9a-zA-Z-ñÑáéíóúÁÉÍÓÚ\s]+/.test(e.target.value)) {
      if(e.target.name==="indicador"){
        setTextfieldNombreAction(e.target.value);
      } else if (e.target.name==="descripcion") {
        setTextfieldDescripcionAction(e.target.value);
      }
    //}
    
  }

  salirModulo(){
    const {setOpenmodulosalirAction,setStepperAction,setTextfieldNombreAction,setSelectedAction,
      setTextfieldDescripcionAction,consultaIndicadorAction,setModoLecturaAction}=this.props;
    setTextfieldNombreAction('');
    setTextfieldDescripcionAction('');
    consultaIndicadorAction();
    setModoLecturaAction(true);
    setOpenmodulosalirAction(false);
    setSelectedAction([]);
    setStepperAction(0);
  }

  validaExisteModulo(){
    const {nombreSinActualizar,setVacioNombreAction,getValidaExisteAction,textFieldNombre}=this.props;
    
    if(nombreSinActualizar.trim()!==textFieldNombre.trim())
    {
      getValidaExisteAction(textFieldNombre.trim());
    }else{
      setVacioNombreAction(false,textFieldNombre.trim());
    }
  }

  cancelaSalirModulo(){
    this.props.setOpenmodulosalirAction(false);
  }

  componentWillUnmount(){
    const {setOpenmodulosalirAction,setStepperAction,setTextfieldNombreAction,setSelectedAction,
      setTextfieldDescripcionAction,consultaIndicadorAction,setModoLecturaAction}=this.props;
    setTextfieldNombreAction('');
    setTextfieldDescripcionAction('');
    consultaIndicadorAction();
    setModoLecturaAction(true);
    setOpenmodulosalirAction(false);
    setSelectedAction([]);
    setStepperAction(0);
  }

  componentDidMount(){
    const {setMensajeLabelAction,setTextfieldDescripcionAction,idIndicador,filterData,
      selected,setTextfieldNombreAction,setNombreSinActualizarAction,setModoLecturaAction,
    }=this.props;
    
    setMensajeLabelAction(false,"indicador");
    setMensajeLabelAction(false,"descripcion");
    setTextfieldNombreAction('');
    setNombreSinActualizarAction('');
    setTextfieldDescripcionAction('');
    setModoLecturaAction(true);

    if(idIndicador>0){
      const dato = filterData.filter((datos) => 
        datos.id === selected[0]);
      
      setTextfieldNombreAction(dato[0].Nombre);
      setNombreSinActualizarAction(dato[0].Nombre);
      setTextfieldDescripcionAction(dato[0].Descripcion);
      setModoLecturaAction(dato[0].Activo);
    }
  }

  render() {
    const {
      mensajeLabelGrupo,
      textFieldNombre,
      textFieldDescripcion,
      vacioGrupo,
      vacioDias,
      setOpenmodulosalirAction,
      openModalAddModulo,
      idIndicador,
      moduloSoloLectura,
      postGuardaIndicadorAction,
      setVacioNombreAction,
    } = this.props;
    

    return ( 
      <React.Fragment>
        <Appbar 
          texto='Registrar indicador'
          onClickRegresar={() => setOpenmodulosalirAction(true)}
        />
        <div style={{textAlign:"center"}}>
        Indique el nombre y descripcion del indicador que desea registrar.
        </div>
        <Container
          container
          style={{ padding: 8, width: 800, margin: '0 auto', display: 'block'}}
        >
          <Paper
            style= {{
              width: '100%',
              overflowX: 'auto',
              paddingBottom: 20,
            }}
          >
            <Grid item xs={12}>
              <TextField
                id="indicador"
                label="Indique el nombre del indicador"
                onChange={(e) => this.validaTexfield(e) }
                type="text"
                fullWidth
                style = {styles.textFld}
                margin="normal"
                name="indicador"
                value={textFieldNombre}
                error={vacioGrupo}
                helperText={mensajeLabelGrupo}
                inputProps={{ maxLength: 200}}
                autoFocus
                disabled={moduloSoloLectura}
                onBlur ={() => this.validaExisteModulo() }
              />
            </Grid>
            <Grid item xs={12}>

              <TextField
                id="descripcion"
                label="Capture una breve descripción si asi lo desea"
                onChange={(e) => this.validaTexfield(e) }
                type="text"
                fullWidth
                style = {styles.textFld}
                margin="normal"
                name="descripcion"

                multiline

                value={textFieldDescripcion}
                inputProps={{ maxLength: 500 }}
                error={vacioDias}
                disabled={moduloSoloLectura}
              />
            </Grid>
          </Paper>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            style={
              {
                paddingTop: 16,
                paddingRight: 32,
                height: 'calc(15% - 32px)',
                display: 'block',
              }
            }
          >
            <Modal 
              open={openModalAddModulo}
              typeAlert='Report'
              typeOptions='Select'
              title='Confirmar....'
              message='Existen datos no guardados, ¿Desea continuar?'
              onClickAccept={() => this.salirModulo()}
              onClickCancel={() => this.cancelaSalirModulo() }
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
              <div style={{marginRight: 10}}>
                <Cancelar 
                  label='Cerrar' 
                  onClick={() => setOpenmodulosalirAction(true)} 
                /> 
              </div> 
              <Success 
                style={styles.success}
                label= {idIndicador === 0 ? 'Guardar' : 'Actualizar'}
                disabled={moduloSoloLectura}
                onClick={ ()=> textFieldNombre.trim()==='' || vacioGrupo===true  ? setVacioNombreAction(true,textFieldNombre) : postGuardaIndicadorAction()}
              />
            </div>
          </Grid>
        </Container>
        
      </React.Fragment> 
    );
  }
}


RegistrarIndicador.propTypes = {
  mensajeLabelGrupo:T.string,
  setTextfieldNombreAction:T.func,
  setTextfieldDescripcionAction:T.func,
  textFieldDescripcion:T.string,
  vacioGrupo:T.bool,
  vacioDias:T.bool,
  setMensajeLabelAction:T.func,
  openModalAddModulo:T.bool,
  setStepperAction:T.func,
  filterData:T.func,
  idIndicador:T.number,
  moduloSoloLectura:T.bool,
  postGuardaIndicadorAction:T.func,
  selected:T.array,
  setSelectedAction:T.func,
  setNombreSinActualizarAction:T.func,
  nombreSinActualizar:T.string,
  setVacioNombreAction:T.func,
  getValidaExisteAction:T.func,
  textFieldNombre:T.string,
  setModoLecturaAction:T.func,
  consultaIndicadorAction:T.func,
  setOpenmodulosalirAction:T.func,
};

export default RegistrarIndicador;
