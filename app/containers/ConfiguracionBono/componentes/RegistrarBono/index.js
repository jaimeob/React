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
// import Drag from '../Drag';
import Drag from '../Drag/index-respaldo';

const styles = {
  grow: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: '1000%',
  },
  textFld: { 
    width: '40%', 
    height: 40, 
    margin: '20px 20px 40px 20px',
  },
  success: {
    marginRight: 10,
  },
}
  
export class RegistrarBono extends React.Component {
 
  validaTexfield(e) {
    const { setTextfieldGrupoAction, setTextfieldDiasAction } = this.props;
    if(e.target.name==="nombreGrupo"){
      if (!/[^0-9a-zA-Z-ñÑáéíóúÁÉÍÓÚ\s]+/.test(e.target.value)) {
        setTextfieldGrupoAction(e.target.value);
      }
    } else if (e.target.name==="dias") {
      if (!/[^0-9]+/.test(e.target.value)) {
        setTextfieldDiasAction(e.target.value);
      }
    }
    
  }

  salirModulo(){
    const {setOpenmodulosalirAction,setStepperAction,setModulosdisableAction,setTextfieldGrupoAction
      ,setTextfieldDiasAction,setSelectedAction,setIdAction}=this.props;
    setTextfieldGrupoAction('');
    setTextfieldDiasAction('');
    setIdAction(0);
    setSelectedAction([]);
    setModulosdisableAction(false);
    setOpenmodulosalirAction(false);
    setStepperAction(0);
  }

  validaExisteModulo(e){
    const {nombreSinActualizar,setVacioNombreAction,getValidaExisteAction,textFieldGrupo}=this.props;
    
    if(nombreSinActualizar.trim()!==textFieldGrupo.trim())
    {
      
      getValidaExisteAction(textFieldGrupo.trim());
    }else{
      
      setVacioNombreAction(false,textFieldGrupo.trim(),e.target.name);
    }
  }

  cancelaSalirModulo(){
    this.props.setOpenmodulosalirAction(false);
  }

  componentWillUnmount(){
    const {setOpenmodulosalirAction,setStepperAction,setModulosdisableAction,setTextfieldGrupoAction
      ,setTextfieldDiasAction,setSelectedAction,setIdAction}=this.props;
    setTextfieldGrupoAction('');
    setTextfieldDiasAction('');
    setIdAction(0);
    setSelectedAction([]);
    setModulosdisableAction(false);
    setOpenmodulosalirAction(false);
    setStepperAction(0);
  }

  componentDidMount(){
    const {setMensajeLabelAction,puestosConfiguracionBonoAction,idConfiguracionBono,
      filterData,selected,setTextfieldGrupoAction,setTextfieldDiasAction,
      setNombreSinActualizarAction,setPuestosAsignadosAction,setModulosdisableAction,
    }=this.props;
    setPuestosAsignadosAction([]);
    setMensajeLabelAction(false,"nombreGrupo");
    setMensajeLabelAction(false,"dias");
    
    if(idConfiguracionBono>0){
      
      const dato = filterData.filter((datos) => 
        datos.ConfiguracionBonoId === selected[0]);
      
      if(dato.length>0){
        if(dato[0].Activo===false){setModulosdisableAction(true);}
        
        setTextfieldGrupoAction(dato[0].Grupo);
        setNombreSinActualizarAction(dato[0].Grupo);
        setTextfieldDiasAction(dato[0].Dias);
        puestosConfiguracionBonoAction(idConfiguracionBono);
      }
      
    } else{
      puestosConfiguracionBonoAction(0);
    }
  }

  render() {
    const {
      mensajeLabelGrupo,
      textFieldGrupo,
      textFieldDias,
      vacioGrupo,
      mensajeLabelDias,
      vacioDias,
      setOpenmodulosalirAction,
      openModalAddModulo,
      puestos,
      puestosAsigandos,
      setPuestosDragAction,
      idConfiguracionBono,
      setVacioNombreAction,
      postGuardarAction,
      puestosIds,
      moduloSoloLectura,
    } = this.props;
    
    const dragActions = {
      setPuestosDragAction,
    }
    
    return ( 
      <React.Fragment>
        <Appbar 
          texto='Registrar configuracion de bono'
          onClickRegresar={() => setOpenmodulosalirAction(true)}
          
        />
        <div style={{textAlign:"center"}}>
        Indique por puesto el total de dias a pagar para el indicador
        </div>
        <Container
          container
          style={{ padding: 8}}
        >
          <Paper
            style= {{
              width: '100%',
              overflowX: 'auto',
              paddingBottom: 20,
            }}
          >
            <TextField
              id="nombreGrupo"
              label="Indique el nombre del grupo"
              onChange={(e) => this.validaTexfield(e) }
              type="text"
              fullWidth
              style = {styles.textFld}
              margin="normal"
              name="nombreGrupo"
              value={textFieldGrupo}
              error={vacioGrupo}
              helperText={mensajeLabelGrupo}
              inputProps={{ maxLength: 50}}
              autoFocus
              onBlur ={(e) => this.validaExisteModulo(e) }
              disabled={moduloSoloLectura}
              
              
            />
            <TextField
              id="dias"
              label="Indique la cantidad de dias para el bono"
              onChange={(e) => this.validaTexfield(e)}
              type="text"
              fullWidth
              style = {styles.textFld}
              margin="normal"
              name="dias"
              multiline
              rows="1"
              value={textFieldDias}
              inputProps={{ maxLength: 3 }}
              error={vacioDias}
              helperText={mensajeLabelDias}
              disabled={moduloSoloLectura}
            />
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              style={
                {
                  paddingTop: 16,
                  // paddingRight: 32,
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
                onClickCancel={() => this.cancelaSalirModulo()}
              />
              

              { idConfiguracionBono > 0 && puestos.length > 0 && puestosAsigandos.length > 0 ? 
                <Drag 
                  puestos={puestos} 
                  puestosAsigandos={puestosAsigandos} 
                  actions={dragActions} 
                  moduloSoloLectura={moduloSoloLectura}
                /> 
                : null 
              }
              { idConfiguracionBono === 0 && puestos.length > 0 ? 
                <Drag 
                  puestos={puestos} 
                  puestosAsigandos={puestosAsigandos} 
                  actions={dragActions} 
                  moduloSoloLectura={moduloSoloLectura}
                /> 
                : null 
              } 
              <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <div style={{marginRight: 10}}>
                  <Cancelar 
                    label='Cerrar' 
                    onClick={() => setOpenmodulosalirAction(true)} 
                  /> 
                </div> 
                <Success 
                  style={styles.success}
                  label={idConfiguracionBono === 0 ? 'Guardar' : 'Actualizar'}
                  disabled={(puestosIds.length === 0 && idConfiguracionBono === 0 ) || textFieldGrupo.trim()==='' || textFieldDias.trim()==='' || moduloSoloLectura }
                  onClick={ ()=> textFieldGrupo.trim()==='' || vacioGrupo===true  || vacioDias===true ? setVacioNombreAction(true,vacioGrupo ? textFieldGrupo :textFieldDias,vacioGrupo ? 'nombreGrupo' :'dias') : postGuardarAction()}
                />
              </div>
            </Grid>
          </Paper>
        </Container>
      </React.Fragment> 
    );
  }
}


RegistrarBono.propTypes = {
  mensajeLabelGrupo:T.string,
  mensajeLabelDias:T.string,
  setTextfieldGrupoAction:T.func,
  setTextfieldDiasAction:T.func,
  textFieldDias:T.string,
  vacioGrupo:T.bool,
  vacioDias:T.bool,
  setMensajeLabelAction:T.func,
  openModalAddModulo:T.bool,
  setStepperAction:T.func,
  puestosConfiguracionBonoAction:T.func,
  idConfiguracionBono:T.number,
  puestos:T.object,
  puestosAsigandos:T.array,
  nombreSinActualizar:T.bool,
  setVacioNombreAction:T.func,
  getValidaExisteAction:T.func,
  textFieldGrupo:T.string,
  postGuardarAction:T.func,
  setSelectedAction:T.func,
  filterData:T.array,
  selected:T.array,
  setNombreSinActualizarAction:T.func,
  setPuestosAsignadosAction:T.func,
  setIdAction:T.func,
  puestosIds:T.array,
  moduloSoloLectura:T.bool,
  setModulosdisableAction:T.func,
  setOpenmodulosalirAction:T.func,
  setPuestosDragAction:T.func,
};

export default RegistrarBono;
