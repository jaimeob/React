import React from 'react';
import T from 'prop-types';
import _ from 'lodash'// eslint-disable-line
import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import Grid from '@material-ui/core/Grid';
import config from 'config/config.development';
import injectSaga from 'utils/injectSaga';
import {
  compose,
  mapProps,  
  withStateHandlers,
  withHandlers,
} from 'recompose';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import SecondaryToolbar from 'components/SecondaryToolbar';
import withLogger from 'utils/lib/hocs/withLogger';
import Tabla from 'components/DataTable';
// eslint-disable-next-line no-unused-vars
import Loading from '../Modulos/componentes/Loading';
import saga from './saga';
import reducer from './reducer';
// relative paths
import { Container } from './styledComponents';
import STATE, { HANDLERS } from './state';
import makeSelectListadoTickets from './selectors';
import Modal from '../Formularios/components/ListadoFormulario/components/Modal/alertDialog';
const apiTickets = axios.create({
  baseURL: config.api.baseURL,
  timeout: 10000,
});

export class Listado extends React.Component {
  displayName = 'Listado'
  
  state = {
    table: {
      filterData: [],
      data: [],
      columns: [
        {
          name: 'NomDepartamento',
          label: 'Departamento',
        },
        {
          name: 'nombre',
          label: 'Descripción',
        },
        {
          name: 'NomEmpleado',
          label: 'Prioriza / Asigna',
        },
        {
          name: 'fechaCreacion',
          label: 'Fecha',
        },
        {
          name: 'IdPlantilla', 
          options: {
            display: false,
          },
        },
        {
          name: 'options',
          label: ' ', 
          options: {
          },
        },
      ],
    },
    redirect:false,
  };

  componentDidMount() {
    // consumir API
    const {
      stateUpdater,
      requestTickets,
      // obtenerTickets,
    } = this.props;
    
    this.checkForSavedElement();
    // obtenerTickets()
    requestTickets();
    stateUpdater('redirect',false)
    
  }

  deleteAllTickets = () => () =>  {
    const {
      stateUpdater,
      selectedIds,
      requestTickets,
    } = this.props;
  
    apiTickets.post('/plantillatickets/estatus',{ arregloId : selectedIds})
      .then(resp => {
        stateUpdater('data',resp)
        requestTickets()
      })
        .catch(error => {// eslint-disable-line
      });
    stateUpdater('openModal',false)
  }

  selectedRow = () => (allRowsSelected) =>  {
      const {// eslint-disable-line
      stateUpdater,
    } = this.props;
    allRowsSelected.forEach(id => {
      stateUpdater('selectedIds', id, true)
    })
    this.abrirModal();
  }

  checkForSavedElement = () => {
    const confTicket = localStorage.getItem('newTicket');
    if (confTicket && Object.keys(confTicket).length) {
      // insertar elemento confTicket en el estado o prop 
      localStorage.removeItem('newTicket'); 
    }
  }

  nuevoTicket = () => {
    this.setState({ redirect: true })
  }

  closeModalButtonDel= () => {
    const {// eslint-disable-line
      stateUpdater,
      requestTickets,
    } = this.props;
    stateUpdater('openModal',false)
    requestTickets()
  }

  abrirModal = (id) => {// eslint-disable-line
    const {
      stateUpdater,

    } = this.props;
    stateUpdater('selected',id)
    stateUpdater('openModal',true)
  };

  onClickModalButtonDel= (action) => {
    action();
  }
  
  
  render() {
    
    const {
      redirect,
    } = this.state;
    const {
      loading,
      data, 
      seleccionado, 
      borrarSeleccionado,
      filterData,
      // etapasArray,
      // eslint-disable-next-line react/prop-types
      carga,
      permisos,
    } = this.props;
    // console.log(this.props,"JAVIERSITA");
    

    const configuracion = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      seleccionable: true,
    };

    if (redirect) {
      return <Redirect to={{pathname: '/nuevo-configuracionTickets',state: { configuracion:this.props.configuracion,permisos }}} />
    }
    // Redireccionar con ticket
    // eslint-disable-next-line react/prop-types
    
    // console.log(this.props.etapasArray,"ARRAYS DE ETAPAS");
    
    // eslint-disable-next-line react/prop-types
    if(this.props.selected !== "" && this.props.redirect === true){
      // console.log(this.props.selected ,"el id perron");
      const ticketEditable = []
      const idP = this.props.selected
      data.forEach(element => {
        if(element.IdPlantilla === idP)
        {
          ticketEditable.push(element)
        }
      });

      // console.log(ticketEditable[0].etapas,"ticketEditable");
      if (ticketEditable[0].etapas !== undefined) {
        ticketEditable[0].options = null;
        if(ticketEditable[0].etapas.length > 0){
          ticketEditable[0].arrayEtapas = []
          ticketEditable[0].etapas.forEach((etapa) => {          
            if(etapa.IdDependencia === -1){
              etapa.IdDependencia = ""
            }
            if(etapa.configuracion === null || etapa.configuracion.length ===0){
              etapa.configuracion = this.props.configuracion.componentes
            }
            
          })
        }

        console.log(ticketEditable,"EL TICKET");
        return <Redirect to={{pathname: '/nuevo-configuracionTickets',state: { ticket: ticketEditable[0] }}}/> 
      }
    }  
    
    return (
     
      <React.Fragment>
        <SecondaryToolbar
          title="Listado de servicios"
          showIcon={false}
         
        />
        <Container width={100}  style={{cursor : carga === false ? "wait": null}}>
          {/* <CircularProgress/> */}
          <Grid container alignItems="center" >
            <Grid item xs={12} sm={12} md={12} >
              <Container flexDirection="column">
                {
                  loading ? (
                    <div>Cargando datos de la tabla</div>
                  ) : (
                    <Tabla
                      data = {filterData}
                      headers = {this.state.table.columns}
                      configuracion = {configuracion}
                      opciones = {[{'icon' : 'editar', 'action':  seleccionado},{'icon' : 'eliminar', 'action': this.abrirModal}]}
                      idPosition = "IdPlantilla"
                      admin
                      // small = {0}
                      onRowsDelete = {this.abrirModal} 
                      onDelete = {this.selectedRow()}
                      onClickAgregar = {this.nuevoTicket}
                      permisos = {permisos}
                    />
                    
                  )
                }
                <Modal 
                  open={this.props.openModal}
                  typeAlert='Report'
                  typeOptions='Select'
                  title='Confirmar....'
                  message='¿Está seguro que desea eliminar el registro seleccionado?'
                  onClickAccept={() => this.onClickModalButtonDel(() => borrarSeleccionado())}
                  onClickCancel={() => this.closeModalButtonDel()}
                />
              </Container>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

const withPropUpdater = mapProps((props) => {
  // eslint-disable-next-line no-shadow
  const apiTickets = axios.create({
    baseURL: config.api.baseURL,
    timeout: 10000,
  });

  return {
    ...props,
    requestTickets: () => {
      const {
        stateUpdater,
      } = props;
      stateUpdater('loading', true);
      apiTickets.get('/plantillatickets')
        .then(Response => {
          stateUpdater('response', Response);
          stateUpdater('data', Response.data);
          stateUpdater('filterData', Response.data);
          stateUpdater('loading', false);
        })
        .catch(error => {
          console.log(error,"error");
          
          stateUpdater('stack', error, true);
          stateUpdater('loading', false);
        });
    },    
  }
})

const mapStateToProps = createStructuredSelector({
  listadoTickets: makeSelectListadoTickets(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// const withStyle = withStyles()
const withReducer = injectReducer({ key: 'listadoTickets', reducer });
const withSaga = injectSaga({ key: 'listadoTickets', saga });
Listado.propTypes = {
  loading: T.bool,
  data: T.array,
  seleccionado: T.func,
  borrarSeleccionado: T.func,
  configuracion: T.object,
  stateUpdater: T.func,
  filterData: T.array,
  openModal: T.bool,
  redirect: T.bool,
  selectedIds: T.array,
  requestTickets:T.func,
  permisos: T.object,
};
export default compose(
  // withStyle,
  withReducer,
  withSaga,
  withStateHandlers(STATE, HANDLERS),
  withPropUpdater,
  withLogger({ debug: true }),
  withConnect,
  withHandlers({
    seleccionado: props => id => { // eslint-disable-line
      const {
        stateUpdater,
        data,
      } = props;
      stateUpdater('selected', id);
      stateUpdater('redirect', true);
      stateUpdater('carga', false);
      // console.log(id,"IDPLANTILLA");
      apiTickets.get(`/plantillatickets/verPlantilla/${id}`)
        .then(resp => {
          // console.log(resp,"resultado");
          stateUpdater('etapasArray', resp.data);
          data.forEach(plantilla => {
            if(plantilla.IdPlantilla === id){
              plantilla.etapas = resp.data
            }
          })
          // console.log(data,"MI LISTADO");
          stateUpdater('data', data)
        })
        .catch(error => {// eslint-disable-line
        });

      // <Redirect to={{pathname: '/nuevo-configuracionTickets',state: { ticket: ticketEditable[0] }}}/>
   
    },
    borrarSeleccionado: props => { // eslint-disable-line
      const {
        stateUpdater,
        requestTickets,
        selectedIds,
        selected,
      } = props;
      
      apiTickets.post('/plantillatickets/estatus',{ arregloId : selected !== undefined ? [selected] : selectedIds})
        .then(resp => {
          stateUpdater('data',resp)
          requestTickets()
        })
          .catch(error => {// eslint-disable-line
        });
      stateUpdater('openModal',false)
    },

    obtenerTickets: props => {
      const {
        dispatch,
      } = props;
      
      dispatch({
        type: 'APP/CONTAINER/listadoTickets/GET_TICKETS',
      });
    },
  }),

)(Listado);
