/**
 *
 * BandejaDifusiones
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import withNotifier from 'components/HOC/withNotifier';
import {
  lifecycle,withHandlers,
} from 'recompose';
import { Container } from '../ConfiguracionTicket/styledComponents';
import makeSelectBandejaDifusiones from './selectors';
import reducer from './reducer';
import Actions from './actions';
import saga from './saga';
import Mensajes from './components/mensajes';
import FormDifusiones from './components/formDifusion';
import DifusionSeleccionada from './components/difusion';

const styles = ({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: "#232f34",
    color: "#ffffff",
  },
});


const FORM_HANDLERS = {}

function BandejaDifusiones(props) {
  const {
    actions: {
      handleChangeTabDifusionesAction,
      selectedTabAction,
      handleChangeComentariosAction,
      postInsertDifusionsAction,
      getDepartamentosAction,
      openDifusionAction,
      insercionDifusionAction ,
    },
    bandejaDifusiones: {
      bandejaDifusiones: {
        tabSelected,
      },
    },
    getDifusiones,
    bandejaDifusiones,

  } = props;    
  // eslint-disable-next-line no-console
  if(bandejaDifusiones.bandejaDifusiones.difusiones.length === 0){
    // selectedTabAction(0)
    getDifusiones()
  }
  
  

  return (
    
    <div style={{height: '100%'}}>
      <Container container item xs={12} sm={12} md={12} style={{ display: 'inline-block', height: '100%', paddingTop: '5px'}}>
      
        <Grid container style={{height: '100%'}}>
          <Grid item xs={12} sm={5} md={5} style={{height: '100%', paddingRight: '4px', paddingLeft:'3px'}}>
            <Container flexDirection="column" style={{height: '100%', position: 'relative'}}>
              <Paper style={{height: '100%', overflowY: 'auto'}}>
                <AppBar color="inherit" position="static" style={{borderTopRightRadius: '8px'}}>
                  <Tabs value={tabSelected } onChange={handleChangeTabDifusionesAction}  variant="fullWidth">
                    <Tab label="Todos" id={0} onClick={() => {selectedTabAction(0); getDifusiones()}}/>
                    <Tab label="No Leído" id={1} onClick={() => {selectedTabAction(1);getDifusiones()}} />
                  </Tabs>
                 

                </AppBar>
                <Mensajes
                  difusiones = {bandejaDifusiones.bandejaDifusiones.difusiones}
                  tabSelected = {tabSelected}
                  openDifusion ={openDifusionAction}
                >
                </Mensajes>
                <Fab style={styles.fab} color="primary"  onClick={getDepartamentosAction}>
                  <AddIcon />
                </Fab>
              </Paper>
            </Container>
          </Grid>
          <Grid item xs={12} sm={7} md={7} style={{height: '100%'}}>
            <Container flexDirection="column" style={{height: '100%'}}>
              <AppBar color="inherit" position="static" style={{height: '100%', borderTopLeftRadius: '8px', borderBottomLeftRadius:  '6px'}}>
                {bandejaDifusiones.bandejaDifusiones.mostrarForm && (
                  <FormDifusiones
                    difusiones = {bandejaDifusiones.bandejaDifusiones.difusiones}
                    mensaje = {bandejaDifusiones.mensaje}
                    handleChangeComentarios = {handleChangeComentariosAction}
                    postInsertDifusions = {postInsertDifusionsAction}
                    insertardifucion = {insercionDifusionAction}
                    departamentos = {bandejaDifusiones.bandejaDifusiones.departamentos}
                  /> 
                )}
                {bandejaDifusiones.bandejaDifusiones.mostrarDifusionSeleccionada && (
                  <DifusionSeleccionada
                    difusion = {bandejaDifusiones.bandejaDifusiones.difusion}
                  /> 
                )}
                
              </AppBar>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </div>
  );

  
}

BandejaDifusiones.propTypes = {
  actions: T.object,
  bandejaDifusiones: T.object,
  getDifusiones: T.func,
};

const mapStateToProps = createStructuredSelector({
  bandejaDifusiones: makeSelectBandejaDifusiones(),
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

const withReducer = injectReducer({ key: 'bandejaDifusiones', reducer });
const withSaga = injectSaga({ key: 'bandejaDifusiones', saga });
const withActions = Actions.bindReduxStore();

const withLifecycle = lifecycle({
});

export default compose(
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS]===================================


    })
  ),
  withHandlers(FORM_HANDLERS),
  withLifecycle,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withNotifier,
)(BandejaDifusiones);
