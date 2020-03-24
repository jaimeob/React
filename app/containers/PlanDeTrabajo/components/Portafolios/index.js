/* eslint-disable react/no-unused-state */
import React from 'react';
import T from 'prop-types';
import AddIcon from "@material-ui/icons/Add";
import { SketchPicker  } from 'react-color'
import { Grid,
  Divider,
  Card,
  TextField,
  FormControl,
  CardActions,
} from '@material-ui/core';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import IconoPortafolio from 'images/iconos/iconoPortafolio.svg';
import IconAddFolder from 'images/iconos/addFolder.svg';
import { connect } from 'react-redux';
import { compose, withHandlers} from 'recompose';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import BotonSucces from 'components/BotonSuccess';
import BotonCancelar from 'components/BotonCancelar';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiThemeProvider, createMuiTheme,withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import saga from '../../saga';

// import TextfieldEspecial from 'react-input-mask';
import OpcionesPortafolios from './opcionesPortafolio';
import { Container } from '../../styledComponents';
// eslint-disable-next-line no-unused-vars
const styles = _theme => ({
  root: {
    borderTopLeftRadius: '4px',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
  },
  root2: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: _theme.palette.background.paper,
  },
  paper: {
    padding: _theme.spacing.unit * 2,
    textAlign: 'center',
    color: _theme.palette.text.secondary,
    height: '79vh',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  bullet: {
    display: 'inline-block',
    transform: 'scale(0.8)',
  },
  card: {
    // display: 'block',
    width: '150px',
    transitionDuration: '0.3s',
    height: '130px',
    backgroundColor:'#DCDCDC',
    background: '#fff',
    borderRadius: '5px',
    display: 'inline-block',
    margin: '1rem',
    position: 'relative',
    // width: '300px',
    // '&:hover': {
    //   backgroundColor: 'rgba(0,0,0,0.25)',
    // },
  },
  card2: {
    // display: 'block',
    width: '150px',
    height: '130px',
    backgroundColor:'#DCDCDC',
    background: '#fff',
    borderRadius: '5px',
    display: 'inline-block',
    margin: '1rem',
    position: 'relative',

  },
  cardAction: {
    // '&:hover': {
    //   backgroundColor: 'rgba(0,0,0,0.25)',
    // },
  },
  largeIcon: {
    width: 100,
    height: 100,
    backgroundColor:'#DCDCDC',
    // '&:hover': {
    //   backgroundColor: 'rgba(0,0,0,0.25)',
    // },
  },
  body: {
    alignSelf: "end",
    textAlign: "center",
    padding:"25px,4px",
    color:"#989898",
  },
  iconHover: {
    '&:hover': {
      color: red[800],
    },
  },
  Icono: {
    width: 60,
    height: 60,
  },
  typography: {
    padding: _theme.spacing.unit * 2,
  },
});


const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiDialogTitle: {
        root: {
          backgroundColor: "#989898",
          '& h6': {
            color: 'red',
          },
          padding:'5px 10px 5px',
        },
      },
    },
  })
  
  
// eslint-disable-next-line react/prefer-stateless-function
class Portafolios extends React.Component {
  constructor(props) {
    super(props)
    this.state = { errorText: '', value: props.value }
  }

  onChange(event) {
    if (event.target.value.match(phoneRegex)) {
      this.setState({ errorText: '' })
    } else {
      this.setState({ errorText: 'Invalid format: ###-###-####' })
    }
  }

  componentDidMount(){
    const {
      obtenerPortafolios,
      numUsuarioLogeado,
  
    } = this.props;

    obtenerPortafolios(numUsuarioLogeado)
  }

  render(){
    const {
      classes,
      portafolios:{
        modalFormulario,
        colorPortafolio,
        nombrePortafolio,
        carpetas,
        errores,
        abrirPop,
        idPortafolio,
      },
      // METODOS
      abrirModalFormulario,
      cerrarModalFormulario,
      changeColorPortafolio,
      guardarPortafolio,
      ajustarNombre,
      edicionPortafolio,
      // abrirEdicionPortafolio,
      onAbrirPop,
      redireccionarListado,
      changeStepper,
    } = this.props;
   
    return (
      <div className={classes.body}>
        <MuiThemeProvider theme={getMuiTheme}>
          <Grid item xs={12} sm={12} md={12}  >
            <Grid 
              container 
              style={{ padding:"40px 100px 40px 100px"}} 
            >
              <Grid item xs={3} sm={3} md={3}  >
                <Card className={classes.card}  onClick={abrirModalFormulario} elevation={8}>
                  <CardActions  style={{cursor:'pointer',justifyContent: 'center',padding:"25px,10px",marginTop:"8px",}}>
                    <AddIcon className={classes.largeIcon}  ></AddIcon>
                  </CardActions>
                </Card>
              </Grid>
              {carpetas.map((item,idx) =>  
                <Grid item xs={3} sm={3} md={3}  >
                  <OpcionesPortafolios
                    item = {item}
                    edicionPortafolio = {edicionPortafolio}
                    classes ={classes}
                    idx = {idx}
                    abrirPop = {abrirPop}
                    onAbrirPop = {onAbrirPop}
                    redireccionarListado = {redireccionarListado}
                    // dispatch = {dispatch}
                    changeStepper = {changeStepper}
                  />
                </Grid>)}
            </Grid>
          </Grid>
          <Dialog  aria-labelledby="customized-dialog-title" open={modalFormulario} fullWidth>
            <DialogTitle id="customized-dialog-title"   style={{backgroundColor:"#E0E0E0"}}>
           
              <img src={IconAddFolder} alt=""/> {idPortafolio > 0 ? "Editar Portafolio" : 'Nuevo Portafolio'}
            </DialogTitle>
            <Container justify="space-between">
              <Divider/>
              <DialogContent dividers>
                <DialogContentText>
                  <Grid item xs={12} sm={12} md={12}  >
                    <Grid container >
                      <Grid item xs={6} sm={6} md={6}  >
                        <FormControl fullWidth>
                          <TextField
                            label="Nombre del Portafolio"
                            type="text"
                            value={nombrePortafolio}
                            onChange={ajustarNombre}
                            helperText={errores.errorNombrePortafolio  !==  true ? "*Requerido" : "*El nombre del portafolio ya se encuentra registrado" }
                            error={errores.errorNombrePortafolio}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}  >
                      <Grid container >
                        <Grid item xs={2} sm={2} md={2}  >
                          <IconButton  iconStyle={styles.largeIcon}>
                            <img src={IconoPortafolio} alt="" style={{width:'100%',backgroundColor:colorPortafolio.hex, borderRadius:'12px'}} />
                          </IconButton>
                        </Grid>
                        <Grid item xs={5} sm={5} md={5}  >
                          <Typography variant="caption" display="block" gutterBottom style={{padding:'35px 0',fontFamily:'Roboto',fontSize:"17px"}}>
                    Elige un color para el Portafolio
                          </Typography>
                        </Grid>
                        <Grid item xs={5} sm={5} md={5}  >
                          <SketchPicker  
                            color={ colorPortafolio.hex}
                            onChangeComplete={changeColorPortafolio }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                
                </DialogContentText>
              </DialogContent>
            </Container>
        
            <DialogActions>
              <BotonCancelar
                label="CERRAR" 
                onClick={cerrarModalFormulario}>
                Cerrar
              </BotonCancelar>
              <Grid></Grid>
              <BotonSucces
                onClick={guardarPortafolio}
                label="GUARDAR">
              </BotonSucces>
            </DialogActions>
          </Dialog>
     
        </MuiThemeProvider>
      </div>

    ); 
  }
}

Portafolios.propTypes = {
  cerrarModalFormulario:T.func,
  abrirModalFormulario:T.func,
  portafolios:T.object,
  changeColorPortafolio:T.func,
  guardarPortafolio:T.func,
  ajustarNombre:T.func,
  classes:T.object,
  obtenerPortafolios:T.func,
  edicionPortafolio:T.func,
  onAbrirPop:T.func,
  redireccionarListado:T.func,
  changeStepper:T.func,
};
const withSaga = injectSaga({ key: 'planDeTrabajo', saga,mode: DAEMON });
export default compose(
  withStyles(styles),
  withSaga,
  withHandlers({
    edicionPortafolio: (props)=> (item,idx)=> () => {
      item.idx = idx
      const {
        abrirEdicionPortafolio,
      } = props
      abrirEdicionPortafolio(item)
    },
    redireccionarListado: (props)=> (item)=> () => {      
      const {
        changeStepper,
      } = props
      changeStepper(item)
    },
  }),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS ]===================================
     
      // edicionPortafolio: (item) => {
      //   dispatch({
      //     type: 'APP/CONTAINER/PLANDETRABAJO/ABRIR_EDICION_PORTAFOLIO',
      //     item,
      //   })
      // },

    })
  ),
)(Portafolios);


