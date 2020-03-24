/* eslint-disable no-return-assign */
import React from 'react';
import T from 'prop-types';
import ComboMultiple from 'components/FiltroSeleccion';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button, TextField } from '@material-ui/core';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import Cancelar from 'components/BotonCancelar';
import Success from 'components/BotonSuccess';
import htmlToImage from 'html-to-image';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import{enqueueSnackbar}from'reducers/notifications/actions';
import {RemoveRedEye} from '@material-ui/icons';
import Tree from './Tree/index';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const styles = () => ({
  paper: {
    width: '100%',
    paddingBottom: 20,
    padding: 24,
    maxWidth: 1000,
    margin: '16px auto 0 auto',
  },
  typography: {
    color: 'gray',
    padding: 8,
    fontSize: 14,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  cancel: {
    marginRight: 10,
  },
  previewIcon: {
    marginRight: 5,
  },
  buttonDownload: {
    float: 'right',
    backgroundColor: '#F9AA33',
    color: 'white',
    '&:hover': {
      backgroundColor: '#F9AA33CC',
    },
  },
});

// eslint-disable-next-line react/prefer-stateless-function
export class RegistrarJerarquia extends React.Component {
  componentDidMount(){
    const {
      actions: {
        requestGetDepartmentsAndPositionsAction,
      },
    } = this.props;
    
    requestGetDepartmentsAndPositionsAction();
  }

  guardarJerarquia = () => {
    const node = document.getElementById('my-node');
    const {
      actions:{
        setImageFileAction,
        requestPostJerarquiaAction,
      },
    } = this.props;

    htmlToImage.toPng(node)
      .then((dataUrl) => {
        setImageFileAction(dataUrl);
        requestPostJerarquiaAction();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }

  downloadFile = () => {
    const node = document.getElementById('my-node');
   
    htmlToImage.toPng(node)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        pdfMake.createPdf({ 
          // pageOrientation: 'landscape',
          left: 60,
          right: 60,
          content: [
            {
              image: dataUrl,
              width: 595.28,
            },
          ],
          
        }).download('Jerarquía');
        this.props.actions.setToggleModalAction()
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
        this.props.actions.dispatch(enqueueSnackbar({
          message: 'Error al descargar el archivo',
          options: { 
            variant: 'error', 
          }, 
        }));
      });
  }

  render() {
    const {
      classes,
      onInputChangeProxy,
      params: {
        departments,
        positions,
        selectedDepartment,
        idJerarquia,
        jerarquia,
        // totalPositions,
        permisos,
        active,
        name,
        errorLabel,
        error,
        openModal,
      },
      actions: {
        setJerarquiaAction,
        setModalBackAction,
        setTotalPositionsAction,
        setNameAction,
        requestNameAction,
        setToggleModalAction,
      },
    } = this.props;
   
    // Nuevo arreglo con los puestos que pertenecen a ese departamento
    const filteredPositions = positions.filter(el => selectedDepartment.some(elem => elem.value === el.idDepartamento));
    let hijosJerarquia = false;

    if(jerarquia.length > 0){
      if(jerarquia[0].children.length > 0){
        hijosJerarquia = true;
      }
    }

    return <React.Fragment>
      <Typography className={classes.typography} align="center">
        Seleccione el departamento al que desea configurarle la jerarquía
      </Typography>
      <Paper className={classes.paper}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            {
              permisos.especiales.descargararchivo && (
                <Button
                  className={classes.buttonDownload}
                  variant="contained" 
                  color="primary"
                  disabled={jerarquia.length === 0} 
                  onClick={setToggleModalAction}
                >
                  <RemoveRedEye className={classes.previewIcon}/>
                  Vista previa
                </Button>
              ) 
            }
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextField
              id="jerarquia-descripcion"
              value={name}
              onChange={(e) => setNameAction(e.target.value)}
              onBlur={(e) => requestNameAction(e.target.value)}
              placeholder="Capture el nombre de la jerarquía"
              margin="normal"
              fullWidth
              inputProps={{ maxLength: 100 }}
              error={error}
              helperText={errorLabel}
            />
          </Grid>
          <Grid item xs={6}>
            <ComboMultiple
              inhabilitado={idJerarquia > 0}
              valor={selectedDepartment}
              onChange={onInputChangeProxy}
              opciones={departments}
              campoValido
              requerido
              multiple
              label="Departamento"
              indice={1}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <Typography className={classes.typography}>Listado de Puestos</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.typography}>Configurar Jerarquía</Typography>
          </Grid>
          <Grid item xs={12}>
            {
              filteredPositions.length > 0 && idJerarquia === 0 ?
                <Tree
                  positions={filteredPositions}
                  setJerarquiaAction={setJerarquiaAction}
                  // Vacio para que al cambiar de departamento limpie el combo de jerarquía
                  jerarquia={[]}
                  setTotalPositionsAction={setTotalPositionsAction}
                  idJerarquia={idJerarquia}
                  permisos={permisos}
                  openModal={openModal}
                  setToggleModalAction={setToggleModalAction}
                  onClickDownload={this.downloadFile}
                />
                : null
            }
            {
              filteredPositions.length > 0 && idJerarquia > 0 ?
                <Tree
                  positions={filteredPositions}
                  setJerarquiaAction={setJerarquiaAction}
                  jerarquia={jerarquia}
                  setTotalPositionsAction={setTotalPositionsAction}
                  idJerarquia={idJerarquia}
                  permisos={permisos}
                  openModal={openModal}
                  setToggleModalAction={setToggleModalAction}
                  onClickDownload={this.downloadFile}
                />
                : null
            }
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item className={classes.buttons} xs={12}>
            <div className={classes.cancel} >
              <Cancelar label='Cerrar' onClick={setModalBackAction} /> 
            </div>
            <Success 
              label="Guardar"
              disabled={ 
                selectedDepartment.length === 0 || 
                // totalPositions > 0 || 
                (permisos.normales.registrar === 0 && permisos.especiales.activar) ||
                active === false || 
                name === '' ||
                error ||
                hijosJerarquia === false
              }
              onClick={this.guardarJerarquia}
            />
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  }
}

RegistrarJerarquia.propTypes = {
  actions: T.object,
  classes: T.object,
  params: T.object,
  onInputChangeProxy: T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => (id) => (e) => { 
      const {
        actions: {
          onChangeComboAction,
        },
      } = props;

      onChangeComboAction(id, e);
    },
  })
)(RegistrarJerarquia);