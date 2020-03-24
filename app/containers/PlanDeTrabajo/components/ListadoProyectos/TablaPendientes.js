import React from 'react';
import T from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Circulo from '@material-ui/icons/Lens';
// FILTRO import FilterListIcon from '@material-ui/icons/FilterList';
import { DAEMON } from 'utils/constants';
// FILTRO import Popper from '@material-ui/core/Popper';
// FILTRO import Fade from '@material-ui/core/Fade';
// FILTRO import Paper from '@material-ui/core/Paper';
import { withHandlers } from 'recompose';
import { withStyles } from "@material-ui/core/styles";
import { compose } from 'redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RedirigirIcon from 'images/iconos/redirigir.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { Line } from 'rc-progress';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SecondaryToolbar from 'components/SecondaryToolbar';
import Persona from 'images/iconos/user.png';
import moment from 'moment';
import IconoProyecto from 'images/iconos/ProyectoIcono.svg';
import reducer from '../../reducer';
import saga from '../../saga';
import LineaBase from "../LineaBase";
import makeSelectPlanDeTrabajo from '../../selectors';
import TipoComponente from "../TipoComponente/index";
import Actions from '../../actions';
// import Filtro from './Filtro'

export class TablaPendientes extends React.Component {
  // constructor(props) {
  //   super(props);
   
  // }
  // state = {modal : false, bandFiltros : false, anchorEl : null}
 // eslint-disable-next-line react/no-unused-state
 state = {modal : false, bandFiltros : false, anchorEl : null};
 

 componentDidMount(){
   const {
     actions:{
       obtenerPrPendientesAction,
       obtenerEmpleadosAction,
       cambiarStepperAction,
     },
     usuarioGlobal: {
       IdDepartamento,
       IdEmpleado,
       IdPlaza,
       IdPuesto,
       Imagen,
       Nombre,
       // UsuarioDominio,
       // UsuarioId,
     },
     insertCurrentUserState,
   } = this.props;    
   obtenerPrPendientesAction()
   obtenerEmpleadosAction()
   cambiarStepperAction(0)

   const currentUser = {
     IdDepartamento,
     IdEmpleado,
     IdPlaza,
     IdPuesto,
     Imagen,
     Nombre,
   }

   insertCurrentUserState(currentUser);
 }

 componentWillUnmount(){
   const {
     actions:{
       limpiarStateProyectosPendientesAction,
     },
   } = this.props;
   limpiarStateProyectosPendientesAction()
 }

 openModal() {
   const {
     modal,
   } = this.state
   this.setState({modal : !modal})
 }

  showFiltros = event => {
    const {
      bandFiltros,
    } = this.state;
    // eslint-disable-next-line react/no-unused-state
    this.setState({'bandFiltros': !bandFiltros, anchorEl: event.currentTarget})
  }

  render(){
    const { 
      actions:{
        handleChangeTabDetailsAction,
        // onChangeEstatusAction,
        // onChangeResponsableAction, 
        // onFechaInputResAction,
        // changeFechaAction, 
        // changeFechaResponsableAction,
        // onClickLimpiarAction,
        // onClickFiltrarAction,
        // onClickFiltrarPendientesAction,
        // onFechaInputAction,
        setMensajesChatAction,
        onChangeTextFieldEscribirMensajeAction,
        // cambiarStepperAction,
        // obtenerPrPendientesAction,
        // obtenerEmpleadosAction,
        IdUsuarioAutorizador,
      },
      planDeTrabajo:{
        listadoProyectos:{
          // empleados,
          proyectos,
          // fechas,
          // filtrosWidth = '600px',
          // estatusSeleccionado,
          // responsableSeleccionado,
          // responsableEstatus,
          // idPortafolio,
          numUsuarioLogeado,
          nomUsuarioLogeado,
          openModalObservaciones,
          idProyecto,
          observaciones,
          
        },
        lineaBase,
        stepper,
        // cambiarStepperProxy,
      },
      cambiarStepperProxy,
      classes,
     
    } = this.props;
    
    const propsLineaBase ={
      lineaBase,
    }
    const propsListadoBase = {
      observaciones,
      openModalObservaciones,
      idProyecto,
    }

    // const estatusProyectos = [
    //   {id:2,nombre:"Autorizado"},
    //   {id:1,nombre:"Pendiente"},
    //   {id:3,nombre:"Rechazado"},
    // ]
    // const tablaPendientes = true
    
    // const id = this.state.bandFiltros ? 'simple-popper' : null;
    this.openModal = this.openModal.bind(this);

    const tabla = (
      <div>
        <SecondaryToolbar
          title ='Proyectos Pendientes de autorizar'
          style ={{fontSize:"14px"}}
        />
      
        <Table  style={{height:'100%',overflowY:'auto'}}>
          <TableHead>
            <TableRow >
              <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto',width:'25%'}} > 
              </TableCell>
              <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'10%'}}>Estatus</TableCell>
              <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'10%'}}>Progreso</TableCell>
              <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'15%'}}>Fechas</TableCell>
              <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'10%'}}>Prioridad</TableCell>
              <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'15%'}}>Responsable</TableCell>
              {/* <TableCell align="center"  style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto',fontSize:'13px',width:'15%'}}>
                <div>
                  <Tooltip title='Filtros'>
                    <IconButton 
                      onClick={this.showFiltros}
                      aria-describedby={id}
                    >
                      <FilterListIcon/>
                    </IconButton>
                  </Tooltip>
                  <Popper id={id} onClose={this.handleClose} open={this.state.bandFiltros} anchorEl={this.state.anchorEl} transition style={{zIndex: 1000}}>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{float: 'right', width: filtrosWidth, maxWidth: filtrosWidth, zIndex: 1005}}>
                          <Filtro
                            classes ={classes}
                            fechas ={fechas}
                            onFechaInput ={onFechaInputAction}
                            onChangeEstatus = {onChangeEstatusAction}
                            estatusSeleccionado ={estatusSeleccionado}
                            responsableSeleccionado = {responsableSeleccionado}
                            onChangeResponsable = {onChangeResponsableAction}
                            onFechaInputRes= {onFechaInputResAction}
                            changeFecha ={changeFechaAction}
                            changeFechaResponsable = {changeFechaResponsableAction}
                            onClickLimpiar={onClickLimpiarAction}
                            onClickFiltrar={onClickFiltrarAction}
                            estatusProyectos={estatusProyectos}
                            empleados ={empleados}
                            responsableEstatus={responsableEstatus}
                            idPortafolio={idPortafolio}
                            tablaPendientes={tablaPendientes}
                            onClickFiltrarPendientes={onClickFiltrarPendientesAction}
                          />
                        </Paper> 
                      </Fade>
                    )}
                  </Popper>
                </div> 
              </TableCell> */}
            </TableRow>
          </TableHead>
          {proyectos.length !== 0 && (
            <TableBody>
              {proyectos.map(item => (
                <TableRow>
                  <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}} > 
                    <List component="nav" aria-label="main mailbox folders" style={{padding: '0px 0px 0px 0px'}} >
                      <ListItem  >
                        <ListItemIcon style={{padding:'0px 0px 0px 0px',fontFamily:'Roboto',fontSize:"10px"}}>
                          <img src={IconoProyecto} alt="" style={{fontFamily:'Roboto', fontSize:'14px', width:'60%',backgroundColor:item.Color, borderRadius:'5px'}} /> 
                        </ListItemIcon>
                        <ListItemText primary={item.NombreProyecto}  classes={{primary:classes.listItemText}} style={{marginLeft:'-50px',fontFamily:'Roboto',fontSize:"10px"}}/>
                      </ListItem>
                    </List>
                  </TableCell>
                  {(item.AutorizacionEstatus === 1 && 
                <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}}  >
                  <Circulo style={{color:"#FFE352"}}/>
                  <Typography variant="caption" display="block" gutterBottom style={{fontFamily:'Roboto',fontSize:"12px",marginLeft:"0px"}}>
                      Pendiente
                  </Typography>
                </TableCell>)}
                  {(item.AutorizacionEstatus === 2 && 
                <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}}  >
                  <Circulo style={{color:"#0FC221"}}/>
                  <Typography variant="caption" display="block" gutterBottom style={{fontFamily:'Roboto',fontSize:"12px",marginLeft:"0px"}}>
                      Finalizado
                  </Typography>
                </TableCell>)}
                  {(item.AutorizacionEstatus === 3 && 
                <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}}  >
                  <Circulo style={{color:"#FF0023"}}/>
                  <Typography variant="caption" display="block" gutterBottom style={{fontFamily:'Roboto',fontSize:"12px",marginLeft:"0px"}}>
                      Rechazado
                  </Typography>
                </TableCell>)}
                  <TableCell  align="center" style={{fontFamily:'Roboto',padding: '4px 5px 4px 4px'}}  alignitems="center" >  
                    <TipoComponente
                      tipo={8}
                      cell={3}
                      style={{
                        textAlign:'center',
                      }}
                      valor={0}
                    />
                  </TableCell>
                  <TableCell  align="center" component="th" scope="row" style={{padding: '4px 4px 4px 4px',  fontFamily:'Roboto'}} colSpan={1}>
                    {moment.utc(item.FechaCreacion).format('DD/MM/YYYY')} - 00/00/0000
                  </TableCell>
                  <TableCell  align="center" style={{padding: '4px 4px 4px 4px', fontFamily:'Roboto'}} >  
                    {(item.Prioridad === 'Baja' && 
               <Chip
                 label={item.Prioridad}
                 style={{backgroundColor:'#0FC221',opacity:56}}
                 color="primary"
               />)}
                    {(item.Prioridad === 'Alta' && 
               <Chip
                 label={item.Prioridad}
                 style={{backgroundColor:'#C20F0F',opacity:34}}
                 color="primary"
               />)}
                    {(item.Prioridad === 'Mediana' && 
                <Chip
                  label={item.Prioridad}
                  className={classes.chipMedio}
                  style={{backgroundColor:'#FFE352',opacity:49}}
                  color="primary"
                />)}
                  </TableCell>
                  <TableCell align="center"   style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto', width:'10%'}}>
                    <Tooltip title={item.NombreResponsable}>
                      <Avatar alt="Remy Sharp" src={item.imagen ? item.imagen : Persona} className={classes.avatar}  style={{marginLeft:'37%'}}/>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" >
                    <IconButton tooltip="Ver"  style={{padding: 8}} onClick={cambiarStepperProxy(2,item.IdPortafolio,item.IdProyecto,item.AutorizacionEstatus,item.Tipo,item.Responsable)} ><img src={RedirigirIcon} alt="" /></IconButton>
                  </TableCell>
                </TableRow> 
              ))}
            </TableBody> )}
        </Table>  
      </div>)
  
    switch (stepper) {
      case 0:
      // COMPONENTE DE JAIME 
        return tabla
      case 1:
      // COMPONENTE DE JAIME 
        return tabla
      case 2:
      // COMPONENTE DE ALEXIS
        return(
          <LineaBase 
            propsLineaBase = {propsLineaBase}
            handleChangeTabDetails={handleChangeTabDetailsAction}
            setMensajesChat = {setMensajesChatAction}
            onChangeTextFieldEscribirMensaje = {onChangeTextFieldEscribirMensajeAction}
            numUsuarioLogeado = {numUsuarioLogeado}
            nomUsuarioLogeado = {nomUsuarioLogeado}
            IdUsuarioAutorizador = {IdUsuarioAutorizador}
            listadoProyectos = {propsListadoBase}
          />
        );
      default:
        return null;
    }
  }
}

TablaPendientes.propTypes = {
  classes:T.object,
  planDeTrabajo: T.object,
  actions: T.object,
  usuarioGlobal:T.object,
  cambiarStepperProxy:T.func,
  insertCurrentUserState:T.func,
};

const mapStateToProps = createStructuredSelector({
  planDeTrabajo: makeSelectPlanDeTrabajo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
  
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'planDeTrabajo', reducer });
const withSaga = injectSaga({ key: 'planDeTrabajo', saga,mode: DAEMON });


const withActions = Actions.bindReduxStore();
export default compose(
  withStyles(),
  withReducer,
  withSaga,
  withActions,
  withConnect,
  withHandlers({
    cambiarStepperProxy: (props) => (id,idPortafolio,IdProyecto,AutorizacionEstatus,IdPlantilla,Responsable) => () => {
      const{
        actions:{
          cambiarStepperAction,
          asignarProyectoAction,
        },
      } = props;

      cambiarStepperAction(id,idPortafolio,IdProyecto,IdPlantilla);
      // cambiarStepper(id,idPortafolio,IdProyecto,IdPlantilla);
      const item = {IdProyecto,AutorizacionEstatus,Responsable}
      asignarProyectoAction(item)
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

    })
  ),
)(TablaPendientes);