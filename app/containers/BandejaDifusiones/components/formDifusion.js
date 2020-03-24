import React from 'react';import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme,withStyles } from '@material-ui/core/styles';
import T from 'prop-types';
import { compose,withHandlers} from 'recompose';
import { connect } from 'react-redux';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload'; // agrupador
// import UploadFile from 'utils/lib/components/uploadFile';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Typography from '@material-ui/core/Typography';
// import ListItemText from '@material-ui/core/ListItemText';
// import Textarea from '@material-ui/core/Textarea';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import BotonCancelar from 'components/BotonCancelar';
import BotonSuccess from 'components/BotonSuccess';
import { Container } from '../../ConfiguracionTicket/styledComponents';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
}
const FORM_HANDLERS = {
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

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: '4px',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '90%',
  },

  paper: {
    paddingTop: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    margin: 'auto',
  },
  paper2: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    margin: 'auto',
  },
  
  encabezado: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    margin: 'auto',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

function FormDifusion(props) {
  const { 
    classes,
    // eslint-disable-next-line react/prop-types
    mensaje,
    // eslint-disable-next-line react/prop-types
    handleChangeComentarios,
    // eslint-disable-next-line react/prop-types
    postInsertDifusions,
    onUploadFile,// eslint-disable-line
    departamentos,// eslint-disable-line
    changeAsunto,// eslint-disable-line
    ocultarForm,// eslint-disable-line
    selectedDepts, // eslint-disable-line    
    seleccionarTodos, // eslint-disable-line  
  } = props;
  // let todosSeleccionados = false
  const opciones = departamentos.map((opcion) => (
    <MenuItem  value={opcion}>
      {opcion.Nombre}
    </MenuItem>
  ))
  

  return (
    <div  >
      <Grid container item xs={12} sm={12} md={12} style={{paddingLeft:'33px'}}  >
        {/* <Container className={classes.paper2}> */}
        <Grid item xs={6} sm={6} md={6} style={{paddingTop:'25px'}} >
          {/* {datos.tipoForma.map((elem, plantillaIndex) => { */}
          <FormControl fullWidth>
          
            <InputLabel style={{fontSize: 14}}  htmlFor="select-multiple-chip">Departamentos</InputLabel>
            <Select
              multiple
              value={mensaje.arregloDepartamentos}
              input={<Input id="select-multiple-checkbox" />}
              onChange={selectedDepts}
              MenuProps={MenuProps}
              disabled = {mensaje.checked}

              // renderValue={selected => (
              //   <div className={classes.chips}>
              //     {selected.map((value) => (                    
              //       <Chip   label={value.Nombre} className={classes.chip} />
              //     ))}
              //   </div>
              // )}
            >
              {mensaje.checked?<MenuItem style={{fontSize: 14}}  id="departamentos_0" key="Todos" value={"Todos" || ''}>Todos</MenuItem>:departamentos.map((elem) => 
                <MenuItem style={{fontSize: 14}}  id={`departamentos_${elem.IdDepartamento}`} key={`${elem.IdDepartamento}`} value={elem.IdDepartamento || ''}>{elem.Nombre}</MenuItem>)}
            </Select>
            
          </FormControl> 
        </Grid>

        <Grid item xs={3} sm={3} md={3}  style={{marginTop:'10px',marginLeft:'15px'}} >
          <MuiThemeProvider theme={getMuiTheme}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={mensaje.checked}
                  onChange={(e) => {
                    seleccionarTodos(e);
          
                  } }
                  value={mensaje.checked}
                />
              }
              label="Seleccionar todos"
              style={{height:100}}
            />
          </MuiThemeProvider>
        </Grid>
      </Grid>

      
      <Grid   className={classes.paper2}>
        <TextField
          fullWidth
          // disabled={estatusTicketSelected !== 3}
          // className={classes.margin}
          // value={mensajeValue}
          // onChange={onChangeTextFieldEscribirMensaje}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
          label="Asunto"
          variant="outlined"
          id="custom-css-outlined-input"
          value={mensaje.Asunto}
          onChange={changeAsunto}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Redactar mensaje"
          multiline
          rows="8"
          rowsMax="4"
          // onInput={(e)=>{ 
          //   e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)
          // }}
          onChange={handleChangeComentarios}
          value={mensaje.Comentarios}
          className={classes.textField}
          margin="normal"
          // helperText="hello"
          variant="outlined"
          fullWidth
          maxLength="5"
           

        />
        
        <input
          accept="image/*"
          // style={{display: 'none'}}
          id="contained-button-file"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            const formData = new FormData()
            formData.append('files',files[0]);            
            onUploadFile(formData);
          } }
          type="file"
        />

        {/* <Button 
          size = "small"
          variant="contained"  
          type="file"
          accept="image/*"
          // style={{display: 'none'}}
          id="contained-button-file"
          style={{background: "#a5d6a7", color: '#424242', width:'150px',height:'30px'}}
          onClick ={(e) => {
            const files = Array.from(e.target.files);
            const formData = new FormData()
            formData.append('files',files[0]);            
            onUploadFile(formData);
          }}>

          <CloudUploadIcon  style={{color: '#28950f', marginLeft: -20}}/>
          <Typography
            variant="body2"
            color="inherit"
            style={{
              fontSize: 12,
            }}
            align="center"
          >
            SUBIR ARCHIVO
          </Typography>
        </Button> */}





        {/* <UploadFile
          accept="image/*"
          // style={{display: 'none'}}
          id="contained-button-file"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            const formData = new FormData()
            formData.append('files',files[0]); 
            console.log(formData)          
            onUploadFile(formData);
          } }
          type="file"
        >
          <Button
            size="small"
            color="primary"
            component="span"
            className={classes.button}
          >
            <CloudUploadIcon
              className={classes.leftIcon}
            />
        Subir Imagen
          </Button>
        </UploadFile> */}


      </Grid>
      <Grid container className={classes.encabezado} style={{height: '10%'}}>
        <Grid container item xs={12} sm={12} md={12} justify="flex-end" direction="row">
          <BotonCancelar color="secondary" variant="contained" label = "Cancelar" onClick={ocultarForm}></BotonCancelar>
          <Grid style={{marginLeft:'5px',marginRight:'8px'}}></Grid>
          <BotonSuccess
            variant="contained" 
            color="primary"
            onClick={() => postInsertDifusions(mensaje)}
            label = "Enviar"
            style={{marginLeft: 8}}
          >
          </BotonSuccess>
        </Grid>
      </Grid> 
    </div>
  );
}

FormDifusion.propTypes = {
  classes: T.object,
  seleccionarTodos: T.func,
  // handleChangeInput: T.func,
};


export default compose(
  
  withStyles(styles),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS]===================================
      selectedDepts: (event) => {
        dispatch({
          type: 'APP/CONTAINER/BANDEJADIFUSIONES/HANDLE_CHANGE_DEPARTAMENTOS',
          event:event.target.value,
        })
      },
      borrarSeleccionado: (event) => {
        dispatch({
          type: 'APP/CONTAINER/BANDEJADIFUSIONES/ERASE_SELECTED',
          data: event,
        })
      },
      inicial: (event) => {
        dispatch({
          type: 'APP/CONTAINER/BANDEJADIFUSIONES/ERASE_SELECTED',
          data: event,
        })
      },
      seleccionarTodos:(event) => {
        // console.log(event.target.checked)
        dispatch({
          type: 'APP/CONTAINER/BANDEJADIFUSIONES/SELECT_ALL_DEPARTAMENTS',
          data: event.target.checked,
        })
        
      },
      onUploadFile:(formData) => {
        // PRUEBA
        dispatch({
          type: 'APP/CONTAINER/BANDEJADIFUSIONES/GUARDAR_IMG_ACTION',
          data: formData,
        })
        
      },
      changeAsunto:(event) => {         
        dispatch({
          type: 'APP/CONTAINER/BANDEJADIFUSIONES/CHANGE_ASUNTO',
          data: event.target.value,
        })
      },
      ocultarForm:() => {        
        dispatch({
          type: 'APP/CONTAINER/BANDEJADIFUSIONES/HIDE_FORM',
        })
      },
    })
  ),
  
  withHandlers(FORM_HANDLERS),
  
  
)(FormDifusion);