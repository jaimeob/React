/**
 *
 * Login
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from "react-router";

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import LogoSIIF from 'images/logo/siif-logo.svg';
import LogoFincamex from 'images/logo/fincamex-logo.png';
import UserIcon from 'images/iconos/user.png';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import withNotifier from 'components/HOC/withNotifier';
import saga from './saga';
import reducer from './reducer';
import Actions from './actions';
import makeSelectLogin from './selectors';
import Loading from '../Modulos/componentes/Loading';

/* eslint-disable react/prefer-stateless-function */

export class Login extends React.Component { 

  componentWillMount(){
    this.props.history.push('/');
  }

  componentDidMount(){
    const { 
      actions: {
        setUsuarioDominioAction,
        setContrasenaAction,
        setLoadingAction,
        setUsuarioImagenAction,
      },
    } = this.props;
   
    setUsuarioDominioAction('');
    setContrasenaAction(''); 
    setLoadingAction(false);  
    setUsuarioImagenAction('');                     
  }

  handleLogin = (e) => {
    const { 
      actions: {
        getUsuarioLoginAction,
      },
      login: {
        usuario,
      },
    } = this.props;

    e.preventDefault();
    getUsuarioLoginAction(usuario);
  }

  handleUsuarioDominio = (e) => {
    const {
      dispatch,
    } = this.props;

    const { actions: { setUsuarioDominioAction } } = this.props;
    const usuarioDominio = e.target.value;

    if(usuarioDominio.length > 0 && usuarioDominio === usuarioDominio.toUpperCase()){
      dispatch(enqueueSnackbar({
        message: 'Favor de desactivar mayúsculas',
        options: {
          variant: 'warning',
        },
      }))
      
      return;
    }

    if (/^[a-z,]*\.?[a-z,]*$/.test(usuarioDominio)) {
      setUsuarioDominioAction(usuarioDominio);
    }
  }

  handleContrasena = (e) => {
    const { actions: { setContrasenaAction } } = this.props;
    const contrasena = e.target.value;
    
    setContrasenaAction(contrasena);
  }

  handleUsuarioImagen = () => {
    const { 
      actions: { 
        getUsuarioImagenAction,
      },
      login: { 
        usuario: {
          usuarioDominio,
        },
      }, 
    } = this.props;
    
    if(usuarioDominio !== ''){
      getUsuarioImagenAction(usuarioDominio);
    }
  }

  render() {
    const {
      classes,
      login: {
        usuario:{
          usuarioDominio,
          usuarioImagen,
          contrasena,
          loading,
        },
      },
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>Sistema Integral de Indicadores Fincamex - Login</title>
          <meta name="description" content="Login de Sistema Integral de Indicadores Fincamex" />
        </Helmet>
        <div className={classes.root}>
          {
            loading && <Loading />
          }
          <Grid 
            className={classes.grid}
            container
            spacing={24}>
            <Grid
              className={classes.item} 
              item xs={8}>
              <div>
                <img 
                  src={LogoSIIF}
                  className={classes.logoSIIF}
                  alt="Sistema Integral de Indicadores Fincamex - logo"
                />
              </div>
              <div>
                <Typography
                  className={classes.heading}
                  variant="h1"
                  component="h1"
                  gutterBottom
                >
                  Sistema Integral de <br /> Indicadores Fincamex
                </Typography>
              </div>
              <div>
                <img 
                  src={LogoFincamex}
                  className={classes.logoFincamex}
                  alt="Fincamex - logo"
                />
              </div>
            </Grid>
            <Grid
              className={classes.item}              
              item xs={4}>
              <div>
                <img
                  src=
                    {
                      usuarioImagen === '' 
                        ? UserIcon 
                        : usuarioImagen
                    }
                  className={classes.userIcon}
                  alt="Usuario - avatar"
                />
                <Typography
                  className={classes.smallHeading}
                  variant="h4"
                  component="h4"
                  gutterBottom
                >
                  Iniciar sesión
                </Typography>
              </div>
              <form>
                <FormControl className={classes.formControl} fullWidth>
                  <div className={classes.iconWrap}>
                    <PersonIcon className={classes.icon} />
                    <span className={classes.span}>Usuario:</span>
                  </div>
                  <TextField
                    id="standard-text-input"
                    placeholder="Ingresa tu usuario de dominio"
                    className={classes.textField}
                    margin="normal"
                    onChange={(e) => this.handleUsuarioDominio(e)}
                    onBlur={this.handleUsuarioImagen}
                    value={usuarioDominio}          
                  />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <div className={classes.iconWrap}>
                    <LockIcon className={classes.icon} />
                    <span className={classes.span}>Contraseña:</span>
                  </div>
                  <TextField
                    id="standard-password-input"
                    placeholder="Ingresa tu contraseña"
                    className={classes.textField}
                    type="password"
                    margin="normal"
                    onChange={(e) => this.handleContrasena(e)}  
                    value={contrasena}                    
                  />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <Button 
                    variant="contained"
                    className={classes.button}
                    onClick={this.handleLogin}
                    disabled={!(!!usuarioDominio && !!contrasena)}
                    type="submit"
                  >
                    Iniciar Sesión
                  </Button>
                </FormControl>
              </form>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    borderRadius: '8px',    
    maxWidth: '900px',
    margin: '0 auto',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '2px solid #e5e5e5',
  },
  heading: {
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '60px',
  },
  smallHeading: {
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    margin: '15px 0 0 0',
  },
  logoSIIF: {
    maxWidth: '500px',
    display: 'block',
    margin: '30px auto',
  },
  userIcon: {
    width: '100px',
    height: '100px',
    display: 'block',
    margin: '0 auto',
    borderRadius: '50%',
  },
  logoFincamex: {
    maxWidth: '200px',
    display: 'block',
    margin: '0 auto',
  },
  iconWrap: {
    marginBottom: '10px',
  },
  icon: {
    color: '#4c4c4c',
    width: '20px',
    position: 'relative',
    top: '-2px',
  },
  textField: {
    margin: '0',
  },
  span: {
    fontFamily: 'Roboto',
  },
  formControl: {
    marginTop: '30px',
  },
  button: {
    backgroundColor: '#28950F',
    color: 'white',
    fontWeight: 'bold',
    position: 'relative',
    top: '-15px',
    '&:hover': {
      backgroundColor:'#28950F',
      transition: 'opacity ease-in-out 0.5s',
      opacity: '0.8',
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

Login.propTypes = {
  actions: T.object,
  // usuario: T.object,
  // enqueueSnackbar: T.func,
  classes: T.object,
  login: T.object,
  dispatch: T.func,
  history: T.object,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
  }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });
const withActions = Actions.bindReduxStore();

export default compose(
  withNotifier,
  withRouter,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyles(styles),
)(Login);
