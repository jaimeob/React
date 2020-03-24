import React from 'react';
import T from 'prop-types';
// import { filter} from 'lodash';
import DataTable from 'components/DataTable';
// import Tooltip from '@material-ui/core/Tooltip';
import FormLabel from '@material-ui/core/FormLabel';
// import InputLabel from '@material-ui/core/InputLabel';
// import {maxBy} from 'lodash';
import Select from '@material-ui/core/Select';
import colorGreen from '@material-ui/core/colors/green';
import colorRed from '@material-ui/core/colors/red';
import AcceptIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import BotonCancelar from 'components/BotonCancelar';
import BotonSucces from 'components/BotonSuccess';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grey from '@material-ui/core/colors/grey'
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Redirect} from 'react-router-dom'
import ClonarIcon from 'images/iconos/clonar.svg';
import DeleteIconColor from 'images/iconos/deleteColor.svg';
import { Container } from '../../styledComponents';
import ModalBorrar from '../../../Formularios/components/ListadoFormulario/components/Modal/alertDialog';


const styles = {
  grow: {
    flexGrow: 1,
  },
  formControl: {
    minWidth: '1000%',
  },
  btnAccept: {
    x: '125px',
    y: '3285px',
    width: '80px',
    height: '30px',
    color: '#FFFFFF',
    fontFamily: 'Source Sans Pro',
    fontSize: '50px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'center',
    background: colorGreen[800],
    border: 'none',
    borderRadius: '5px',
    margin: '5px',
  },
  button: {
    
    paddingRight: '5px',
  },
  btnSuccess: {
    marginLeft: '5px',
  },
  btnCancel: {
    x: '125px',
    y: '3285px',
    width: '80px',
    height: '30px',
    color: '#FFFFFF',
    fontFamily: 'Source Sans Pro',
    fontSize: '50px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'center',
    background: colorRed[800],
    border: 'none',
    borderRadius: '5px',
    margin: '5px',
  },

}

const changeCase = require('change-case')
export function TablaEtapas(props) {
  const {
    datosEtapa,
    cabecerasEtapa,
    datosPlaza,
    cabecerasPlaza,
    onClickPlaza,
    etapa,
    plaza,
    idPlaza,
    onDeleteEtapa,
    onClickAgregar,
    // onDeletePlaza,
    onCancelar,
    onClonarEtapa,
    redirect, 
    onClickRedirect,
    confEtapas,
    configuracionCampos,
    // etapas,
    changeEtapa,
    editEtapa,
    etapasTemporales,
    datosEtapasBorradas,
    modalClonar,
    handleChangePlazaClon,
    plazaClonSeleccionada,
    cerrarClonacion,  
    clonarEtapasPlazas,
    // onClonar,
    ajustarCampoEtapas,
    stepper,
    cerrarModalBorrado,
    abrirModalBorrado,
    modalBorrado,
    idEtapaBorrar,
    permisos,
  } = props;  


  if(stepper !== 2){
    ajustarCampoEtapas()
  }

  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'multiple',
    paginado : false,
  };

  const configuracionTabla1 = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'none',
    paginado : false,
  };

  const PlazaClones = []
  datosPlaza.forEach((item) => {
    if(item.IdPlaza !== idPlaza){
      PlazaClones.push(item)
    }
  })

  const acciones = 
  <div>
    <MenuItem>
      <IconButton 
        tooltip="Borrar" 
        style={{
          padding: 0, 
          fontSize: 12,
          color: 'rgba(0, 0, 0, 0.87)',
        }}
      >
        <img 
          src={DeleteIconColor} 
          alt=""
          style={{
            paddingRight: 8,
          }} 
        />
        Eliminar
      </IconButton>
    </MenuItem>
    <MenuItem>
      <IconButton 
        tooltip="Clonar" 
        style={{
          padding: 0, 
          fontSize: 12,
          color: 'rgba(0, 0, 0, 0.87)',
        }}
      >
        <img 
          src={ClonarIcon} 
          alt=""
          style={{
            paddingRight: 8,
          }} 
        />
        Clonar
      </IconButton>
    </MenuItem>
  </div>;

  const header = cabecerasPlaza.map((ele) => {    
    // ajustarCampoEtapas()
    if(ele.name === 'Etapas')
      return {
        name: 'Etapas',
	      options: {
          customBodyRender: (value) => {
            const data = value.split('|')[0];
            return (
              <FormLabel
                style={{color: 'rgba(0, 0, 0, 0.87)', fontSize: 14}}
              >
                {data}
              </FormLabel>
            );
          },
        },
      }
    return ele;
  })
  header.unshift({name:""})
  if(redirect)
    return <Redirect to={{pathname: '/nuevo-configuracionTickets',state: { datosEtapas: {confEtapas,configuracionCampos,etapasTemporales,datosEtapasBorradas}}}}/> 
  if(!etapa)
    return(
      
      <React.Fragment>
        <AppBar style={{backgroundColor: Grey[200]}} position="static">
          <Toolbar variant="dense" style={{paddingLeft: 8}}>
            {
              !etapa ? 
                <IconButton onClick={onCancelar}>
                  <ArrowBack/>
                </IconButton> : 
                null
            }
            <Typography variant="h6" color="primary" style={styles.grow}>
              Detalle de Plaza {changeCase.pascalCase(plaza)}
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <br />
          <FormLabel
            style={{
              color: 'rgba(0, 0, 0, 0.87)', 
              fontSize: 20,
              padding: 8,
            }}
          >
            {/* {changeCase.pascalCase(plaza)} */}
          </FormLabel>
          <Grid 
            container
          >
            <DataTable 
              data = {datosEtapa}
              headers = {cabecerasEtapa}
              configuracion = {configuracion}
              opciones = {
                [
                  {'icon' : 'editar', 'action': editEtapa},
                  {'icon' : 'eliminar', 'action': abrirModalBorrado},
                  // {'icon' : 'eliminar', 'action': abrirModal},
                ]
              }
              idPosition = "IdEtapa"
              admin
              acciones = {acciones}
              onClickAgregar = {onClickAgregar}
              onClonar = {onClonarEtapa}
              onDelete = {onDeleteEtapa}
            
              message="¿Esta seguro que desea eliminar la(s) etapa(s)?"
              permisos ={permisos}
            />
            <ModalBorrar
              open={modalBorrado} 
              typeAlert='Report' 
              typeOptions='Select' 
              title='Confirmar....' 
              message='¿Está seguro que desea borrar la etapa?' 
              onClickAccept={()  =>  onDeleteEtapa(idEtapaBorrar)} 
              onClickCancel={cerrarModalBorrado} 
            />
            {/* <Container
              flexDirection="row"
              justify="flex-end"
              alignItems="flex-end"
              style={{
                bottom: '0px',
                // position: 'absolute',
                padding: '10px 10px 30px 0px',
              }}
            > */}
            <Grid item sm={12}>
              <Grid container justify="flex-end">
                <BotonCancelar
                  id="1" 
                  variant="contained"
                  onClick={onCancelar}
                  label="CANCELAR"
                />
                <Grid style={{marginLeft:'5px',marginRight:'8px'}}>
                  <BotonSucces 
                    variant="contained" 
                    onClick={changeEtapa}
                    label="GUARDAR"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* 

            </Container>
 */}

          </Grid>

        </div>
        <Dialog 
          open={modalClonar}
          onClose={!modalClonar}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Seleccione la plaza a la  que se desea clonar las etapas</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* Seleccione la plaza a la  que se desea clonar las etapas */}
              <Grid item xs={12} sm={12} md={12}>
                <FormControl style={{width:400}}>
                  {/* <InputLabel style={{fontSize: 14}} htmlFor="departamento-id">Plaza</InputLabel> */}
                  <Select
                    value={plazaClonSeleccionada}
                    onChange={handleChangePlazaClon}
                    displayEmpty
                    style={{fontSize: 14}}
                    name="plazas"
                    MenuProps= {{
                      PaperProps: {
                        style : {
                          maxHeight: 60 * 4.5,
                        },
                      },
                    }}
                  >
                    {PlazaClones.map((elem) => 
                      <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.IdPlaza}`} key={`${elem.IdPlaza}`} value={elem.IdPlaza || ''}>{elem.Plaza}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions> 
            <Button  color="primary" style={styles.btnCancel} onClick={cerrarClonacion}>
              <CloseIcon style={{fontSize:'20px'}}/>
            </Button>
            <Button  color="primary" autoFocus  style={styles.btnAccept} onClick={clonarEtapasPlazas}>
              <AcceptIcon style={{fontSize:'20px'}}/>
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  return(
    <div>
      <AppBar style={{backgroundColor: Grey[200]}} position="static">
        <Toolbar variant="dense" style={{paddingLeft: 8}}>
          {
            <IconButton onClick={onClickRedirect}>
              <ArrowBack/>
            </IconButton>
          }
          <Typography variant="h6" color="primary" style={styles.grow}>
            Configuración de Etapas por Plaza
          </Typography>
        </Toolbar>
      </AppBar>
      <DataTable 
        data = {datosPlaza}
        headers = {header}
        configuracion = {configuracionTabla1}
        opciones = {
          [
            {'icon' : 'ver', 'action': onClickPlaza},
          ]
        }
        idPosition = "IdPlaza"
        admin
        acciones = {acciones}
        onClickAgregar = {onClickAgregar}
        permisos ={permisos}
      />
    

      <Container
        flexDirection="row"
        justify="flex-end"
        alignItems="flex-end"
        style={{
          bottom: '0px',
          // position: 'absolute',
          padding: '10px 10px 30px 0px',
        }}
      >
        <BotonSucces 
          variant="contained" 
          label="ACEPTAR"
          onClick={onClickRedirect}
          classes={styles.btnCancel}
        />
      </Container>
     
    </div>
  )
}

TablaEtapas.propTypes = {
  datosEtapa: T.array,
  cabecerasEtapa: T.array,
  datosPlaza: T.array,
  cabecerasPlaza: T.array,
  onClickPlaza: T.func,
  etapa: T.number,
  plaza: T.string,
  onDeleteEtapa: T.func,
  onClickAgregar: T.func,
  onCancelar: T.func,
  // onDeletePlaza: T.func,
  redirect: T.bool,
  onClickRedirect: T.func,
  confEtapas:T.object,
  configuracionCampos:T.object,
  // etapas:T.object,
  changeEtapa:T.func,
  editEtapa:T.func,
  etapasTemporales:T.array,
  modalClonar:T.bool,
  handleChangePlazaClon:T.func,
  plazaClonSeleccionada:T.string,
  cerrarClonacion:T.func,
  clonarEtapasPlazas:T.func,
  onClonarEtapa:T.func,
  idPlaza:T.number,
  ajustarCampoEtapas:T.func,
  stepper:T.number,
  datosEtapasBorradas:T.array,
  cerrarModalBorrado:T.func,
  abrirModalBorrado:T.func,
  modalBorrado:T.bool,
  idEtapaBorrar:T.string,
  permisos:T.object,
};

export default TablaEtapas;