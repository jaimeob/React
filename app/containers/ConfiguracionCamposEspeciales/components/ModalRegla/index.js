import React, { Fragment } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText'; 
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Typography, Select, MenuItem, FormControl, InputLabel, Fab, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { Container } from '../../styledComponents';
// import Selection from '../../../ConfiguracionTicket/components/Selection';
// import ButtomAddComponent from '../../../ConfiguracionTicket/components/ButtomAddComponent';
import CamposRegla from '../CamposRegla';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export class ModalRegla extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => { 
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };



  data = {
    valores:[
      {
        IdValores: '0',
        Nombre: 'Culiacan',
      },
      {
        IdValores: '1',
        Nombre: 'Mazatlan',
      },
    ],
  };

  componentDidUpdate(prevProps){

    if (prevProps && (this.props.dataReglas.length > prevProps.dataReglas.length)) {
      // this.myTextInput.scrollTop = 10000; 
    }
    
  }

  validarCamposReglas = () =>{
    const {
      reglaSeleccionada,
      dataReglas,
      acciones:{
        onClickAddStateRegla,
        onChangeErrorReglas,
      },
    } = this.props;

    let error = false;
  
    if (reglaSeleccionada !== -1 && reglaSeleccionada !== 99999999){
      dataReglas[reglaSeleccionada].config.map((regla,indexRegla) =>  (
        onChangeErrorReglas(regla,reglaSeleccionada,indexRegla)
      ))
      error = dataReglas[reglaSeleccionada].config.filter((regla) => 
        regla.valores === "" || 
        regla.campo === "" || 
        regla.condicion === "" || 
        regla.valor<=0).length > 0;

    }

    // campo: ""
    // condicion: ""
    // valor: ""
    // valores: ""


    if(!error){
      onClickAddStateRegla(); 
      this.handleClose()
    }
  }

  render() {

    const {
      dataReglas,
      componentesEspeciales,
      configuracionCampos,
      componentesFiltrados,
      reglaSeleccionada,
      acciones:{
        onHandleChangeValueModal,
        onHandleChangeInputValueModal,
        onClickAgregarRegla,
        onClickBorrarRegla,
        handleChangeRegla,
        onClickDeleteStateRegla,
        agregarReglaTemporal,
      },
      nuevoValor,
    } = this.props;
    
    const classes = this.props;
    return (
      <Fragment>
        <Button 
          size = "small"
          variant="contained"  
          style={{background: "#a5d6a7", color: '#424242', width:'150px',height:'30px'}}
          onClick ={() => {agregarReglaTemporal(); this.handleClickOpen()}}>
          <Icon 
            style={{color: '#28950f', marginLeft: -20}}
          >
            perm_data_setting
          </Icon>
          <Typography
            variant="body2"
            color="inherit"
            style={{
              fontSize: 12,
            }}
            align="center"
          >
            Agregar Regla
          </Typography>
            
        </Button>
        <Container
          id="prro"
          style={{
            // width: '150vh',
            // maxWidth: '150vh !important',
            // height:'60vh',
          }}
        >
          <Dialog
            disableBackdropClick
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            width="120vh"
            maxWidth="md"
            // height="60vh"
            fullWidth
            
          >
            <DialogTitle 
              id="alert-dialog-slide-title"
              style={{
                padding: '15px 24px 1px',
              }}
            >
              {"Configuración de reglas"}
            </DialogTitle>
            <DialogContent
              style={{
                height:'70vh',
              }}
              
              
            >
              <Container
                flexDirection="column"
                // ref={(ref) => {this.myTextInput = ref}}
              >
                <Container
                  flexDirection="row"
                 
                >
                  {/* <Selection
                    nombre="selectionRegla"
                    data={this.data.valores}
                    placeholder="Seleccione una opcion"
                    titulo="Seleccione una Regla"
                    valueKey="IdValores"
                    textKey="Nombre"
                    // disabled={this.state.selectionTipo === ''}
                    // onSelectChange={this.handleSelectChange}
                    // value={this.state.selectionDepartamento}
                    style={{ 
                      margin: '2vh 2vh 0vh 2vh',
                      width:'30vh',
                      fontSize:'14px',
                    }}
                  /> */}
                  <FormControl
                    className={classes.formControl}
                    fullWidth
                    style={{
                      margin:'10px 0px 0px 20px',
                    }}
                  >
                    <InputLabel htmlFor="reglas">Reglas</InputLabel>
                    <Select
                      value={reglaSeleccionada !== -1 || reglaSeleccionada === '' ? reglaSeleccionada: ''}
                      onChange={handleChangeRegla}
                      style={{
                        width:'40%',
                      }}
                      inputProps={{
                        name: 'reglas',
                        id: 'reglas',
                      }}
                    >
                      <MenuItem value="" disabled>
                        Selecione una opción
                      </MenuItem>
                      <MenuItem value={99999999} >
                        Sin Regla
                      </MenuItem>
                      {dataReglas.map((regla,index) => (
                        <MenuItem
                          value={index}
                          // eslint-disable-next-line react/no-array-index-key
                          key={`regla_${index}`}
                        >
                          {regla.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Container>
                <Divider
                  style={{
                    margin:'4vh 0vh 0vh 0vh',
                    // backgroundColor: '#a59999',
                  }}
                  
                />
                <Container
                  flexDirection="row"
                  justify="space-between"
                  style={{
                    alignItems:'center',
                    marginTop:'10px',
                  }}
                >
                  <Typography 
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      margin: '5px 10px 5px 10px',
                    }}
                    align="center"
                    gutterBottom
                  >
                    Configurar Reglas
                  </Typography>
                  {/* <ButtomAddComponent
                    onClick={onClickAgregarRegla}
                    reglaSeleccionada={reglaSeleccionada}
                  /> */}
                  <Tooltip title="Agregar Condición" aria-label="Add">
                    <Fab
                      disabled={reglaSeleccionada === 99999999}
                      size="small"
                      onClick={onClickAgregarRegla(reglaSeleccionada)}
                      // color="secondary"
                      aria-label="Add"
                      // className={this.props.classes.fab}
                      style={{
                        color: '#FFFFFF',
                        backgroundColor:'#28950F',
                      }}
                    >
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                </Container>
                <Container
                  flexDirection="column"
                  fullWidth
                >
                  {reglaSeleccionada !== -1 && reglaSeleccionada !== 99999999?
                    <CamposRegla
                      reglaSeleccionada={reglaSeleccionada}
                      // ref={(ins) => { this.contentRef = ins; }}
                      onHandleChangeValueModal={onHandleChangeValueModal}
                      onHandleChangeInputValueModal={onHandleChangeInputValueModal}
                      onClickBorrarRegla={onClickBorrarRegla}
                      dataReglas={dataReglas[reglaSeleccionada].config}
                      componentesEspeciales={componentesEspeciales}
                      configuracionCampos ={configuracionCampos}
                      componentesFiltrados ={componentesFiltrados}
                      nuevoValor = {nuevoValor}
                    />
                    : null}
                </Container>
              
              </Container>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
                style={{ 
                  marginLeft: '20px',
                  backgroundColor:'#FF0023',
                  color:'#F7F7F7',
                }}
                onClick ={() => {onClickDeleteStateRegla(); this.handleClose()}}

                // color='#FF0023'
                // onClick={this.redirigirListado}
                
              >
              Cerrar
              </Button>
              <Button
                variant="contained"
                // onClick={this.validaciones}
                size="small"
                className={classes.button}
                style={{ 
                  marginLeft: '20px',
                  backgroundColor:'#28950F',
                  color:'#F7F7F7',
                }}
                onClick ={this.validarCamposReglas}
                // onClick ={() => {onClickAddStateRegla(); this.handleClose()}}
                // onClick ={{onClickDeleteStateRegla; this.onClose}}  
                // onClick={function(event){ func1(); func2()}}    
              >
                Agregar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Fragment>
    );
  }
}

ModalRegla.propTypes = {
  acciones:         T.object,
  dataReglas:       T.array,
  reglaSeleccionada:T.number,
  componentesEspeciales:  T.array,
  configuracionCampos: T.array,
  componentesFiltrados:T.array,
};

export default compose(
  withStyles(styles),
)(ModalRegla);