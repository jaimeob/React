import React from 'react';
import {Grid, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';
import { compose } from 'redux';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Container } from '../../../ConfiguracionTicket/styledComponents';
import ModalJustificacion from '../ModalJustificacion';
// import { connect } from 'ngrok';

const noop = () => undefined;
const styles = theme => ({
  formControll: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    minWidth: 280,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

// eslint-disable-next-line react/prefer-stateless-function
export class AsignarA extends React.Component{
  
  componentDidMount(){
    const {
      obtenerDatosPorAsignar,
    } = this.props;
    // obtenerEmpleados();
    // obtenerPrioridades();
    obtenerDatosPorAsignar();
  }

  // componentDidUpdate(prevProps, prevState){
  //   const {
  //     idTicketSelected,
  //   } = this.props;

  //   if (!_.isEqual(prevState.idTicketSelected,idTicketSelected)) {

  //   }
  // }

  render(){

    
    const {
      classes,
      handleClose,
      onChangeTextModal,
      onUploadFile,
      onClickEnviarMensajeModal,
      cambiarEstatus,

      empleadosAsignarA,
      prioridades,
      asignarEmpleado,
      asignarPrioridad,
      empleadoAsignado,
      prioridadAsignada,
      openModal,
      valueTextModal,
      idTicketSelected,
      numUsuarioLogeado,
      nomUsuarioLogeado,
      tabSelected,
    } = this.props;


    return (
      
      <Grid
        item
        container
        md={12}
        xs={12}
        sm={12}
        style={{ flexBasis: '0%'}}
      >
        
        <Container flexDirection="row" justify="flex-start" >
          
          <form>
            <Grid
              item
              md={6}
              xs={12}
              sm={12}
            >
              <FormControl className={classes.formControll}>
                <InputLabel
                  style={{ paddingLeft: '20px', paddingTop:'15px' }}
                  htmlFor="SelectAsignarA"
                >
                Asignar A:
                </InputLabel>
                <Select
                  value={empleadoAsignado}
                  id="SelectAsignarA"
                  placeholder="Selecione"
                  onChange={asignarEmpleado}
                >
                  <MenuItem value="" disabled>
                  SELECIONE UN EMPLEADO
                  </MenuItem>
                  
                  {empleadosAsignarA.map((empleado,index) => 
                    // eslint-disable-next-line react/no-array-index-key
                    <MenuItem key={`key_empleado_${index}`} value={empleado.NoEmpleado}>{`${empleado.Nombre} ${empleado.ApellidoPaterno} ${empleado.ApellidoMaterno}`}</MenuItem>
                  )}
                </Select>
                
              </FormControl>
            </Grid>
          
          </form>
          <form>
            <Grid
              item
              md={6}
              xs={12}
              sm={12}
            >
              <FormControl className={classes.formControll}>
                <InputLabel
                  htmlFor="SelectPrioridad"
                  style={{ paddingLeft: '20px', paddingTop:'15px' }}
                >
                Asignar Prioridad:
                </InputLabel>
                <Select
                  value={prioridadAsignada === 0 ? "" : prioridadAsignada}
                  id="SelectPrioridad"
                  placeholder="Selecione"
                  onChange={asignarPrioridad}
                >
                  <MenuItem  value="" disabled>
                  SELECIONE PRIORIDAD
                  </MenuItem>
                  {prioridades.map((prioridad,index) => 
                    // eslint-disable-next-line react/no-array-index-key
                    <MenuItem key={`key_prioridad_${index}`} value={prioridad.IdPrioridad}>{prioridad.Nombre}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            
          </form>
        </Container>
        <Container 
          flexDirection="row"
          justify="flex-end"
          style={{ padding: '0px 30px 0px 0px' }}
        >
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={cambiarEstatus(idTicketSelected,'Rechazar')}
          >
            Rechazar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            style={{ marginLeft:'20px' }}
            // onClick={onClickAsignar}
            onClick={cambiarEstatus(idTicketSelected,'Asignar')}
            disabled = {empleadoAsignado === "" || prioridadAsignada === 0 }  
          >
            Asignar
          </Button>
        </Container>
        <Container
        >
          <ModalJustificacion
            handleClose={handleClose}
            onChangeTextModal={onChangeTextModal}
            onUploadFile={onUploadFile}
            onClickEnviarMensajeModal={onClickEnviarMensajeModal}

            open={openModal}
            tipoJustificacion='Rechazar'
            leyenda='Capture una Justificación'
            valueTextModal={valueTextModal}
            idTicketSelected={idTicketSelected}
            numUsuarioLogeado={numUsuarioLogeado}
            nomUsuarioLogeado={nomUsuarioLogeado}
            tabSelected={tabSelected}
          />
        </Container>
      </Grid>

    );
  }
}

AsignarA.propTypes = {
  classes: T.object,
  obtenerDatosPorAsignar: T.func,
  handleClose: T.func,
  onChangeTextModal: T.func,
  onUploadFile: T.func,
  onClickEnviarMensajeModal: T.func,
  asignarEmpleado: T.func,
  asignarPrioridad: T.func,
  cambiarEstatus:   T.func,

  empleadosAsignarA: T.array,
  prioridades: T.array,

  empleadoAsignado: T.string,
  prioridadAsignada: T.number,
  openModal: T.bool,
  valueTextModal: T.string,
  idTicketSelected: T.number,
  numUsuarioLogeado: T.string,
  nomUsuarioLogeado: T.string,
  tabSelected: T.number,
}

AsignarA.defaultProps = {
  obtenerDatosPorAsignar: noop,
}

export default compose(
  withStyles(styles),
  connect(
    null,
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS DEL CHAT ]===================================
      onClickEnviarMensajeModal: (obj,nuevoEstatus) => () =>{
        const actionId = 'APP/CONTAINER/TABLEROS/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION';
        
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION',
          data: obj,
          actionId,
          from: 'modal',
          nuevoEstatus,
        });
        
      },
      asignarEmpleado: (event) => {
        const val = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/ASIGNAR_EMPLEADO_ACTION',
          data:val,
        })
      },
      asignarPrioridad: (event) => {
        const val = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/ASIGNAR_PRIORIDAD_ACTION',
          data: val,
        })
      },
      obtenerDatosPorAsignar: () => {
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/OBTENER_DATO_POR_ASIGNAR_ACTION',
        })
      },
      onClickAsignar: () => {
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/ASIGNAR_TICKET_A_EMPLEADO_ACTION',
        })
      },
      // EVENTOS MODAL
      onClickRechazar: () => {
        const actionId = 'APP/CONTAINER/TABLEROS/OPEN_MODAL_ACTION';
        
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/OPEN_MODAL_ACTION',
          data: true,
          actionId,
        })
      },
      handleClose: () => {
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CLOSE_MODAL_ACTION',
          data: false,
        })
      },
      onChangeTextModal: (event) => {
        const val = event.target.value;
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CHANGE_TEXT_MODAL_ACTION',
          data: val,
        })
      },
      onUploadFile:(formData) => {
        // JALA
        // const actionId = 'APP/CONTAINER/TABLEROS/POST_INSERT_FILES_COMENTARIOS_ACTION';

        // dispatch({
        //   type: 'APP/CONTAINER/TABLEROS/POST_INSERT_FILES_COMENTARIOS_ACTION',
        //   data: formData,
        //   actionId,
        // })

        // PRUEBA
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/GUARDAR_IMG_ACTION',
          data: formData,
        })
        
      },
      cambiarEstatus: (ticketSelected, tipo) => () => {
       
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CAMBIAR_ESTATUS_ACTION',
          ticketSelected,
          tipo,
        })
      }, 
      
    })
  ),
)(AsignarA);


// connect(
//   /* mapStateToProps */
//   null,
//   /* mapDispatchToProps */
//   (dispatch) => ({
//     dispatch,
//     //= ===========================[ EVENTOS DEL CHAT ]===================================
//     onClickEnviarMensajeProxy: (obj,estatusTicketSelected) => () => {
//       const actionId = 'APP/CONTAINER/TABLEROS/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION';

//       if (estatusTicketSelected === 3) {
//         dispatch({
//           type: 'APP/CONTAINER/TABLEROS/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION',
//           data: obj,
//           actionId,
//           from: 'chat',
//         });
//       }

//     }})
