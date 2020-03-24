/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-array-index-key */
/**
 *
 * Funcionalidad: Mostrar los componentes configurados de la plantilla ticket
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers} from 'recompose';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import FormSelect from 'components/FormSelect';
import FormRadio from 'components/FormRadio';
import FormInput from 'components/FormInput';
import FormCheckbox from 'components/FormCheckbox';
import FormSelectMultiple from 'components/FormSelectMultiple';
import FormInputFile from 'components/FormInputFile';
import {size, isArray, slice, parseInt } from 'lodash';
import { Container } from '../../../../ConfiguracionTicket/styledComponents';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: '4px',
    // height: '55%',
    // maxHeight: '55%',
    // overflowY: 'auto',
  },
  rootInhabilitado: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: '4px',
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    // overflowY: 'auto',
  },
  paper: {
    paddingTop: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    margin: 'auto',
  },
  detalle: {
    paddingTop: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 4,
    margin: 'auto',
  },
  paper2: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    // margin: 'auto',
    paddingBottom: '10px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '90%',
    maxWidth: '90%',
  },
});

function DatosPlantilla(props) {
  const { 
    datos,
    classes,
    handleChangeInputFileProxy,
    handleChangeComponentProxy,
    deleteFile,
    inhabilitado,
    downloadTicketFile,
    // numUsuarioLogeado,
    tabSelected,

  } = props;

  const actionsCatalogos = {
    cambiarValorCatalogo: props.cambiarValorCatalogo,
  };
  
  return (
    <div className={inhabilitado ? classes.rootInhabilitado : classes.root}>
      <Container className={inhabilitado ? classes.detalle : classes.paper}>
        <Typography style={{fontSize: 14, fontWeight: 'bold'}}>
          Datos de la Solicitud
        </Typography>
      </Container>
      
      <Container 
        container 
        item 
        className={classes.paper2} 
        style={{display: 'inline-block'}}
      >
        <Grid container >
          {datos.tipoForma.map((elem, plantillaIndex) => {
            switch(elem.tipoComponenteId){
              case 0:
                return (
                  <React.Fragment 
                    key={`ReactTC_${elem.tipoComponenteId}_${plantillaIndex}`}
                  >
                    <Grid 
                      key={`textC_${elem.tipoComponenteId}_${plantillaIndex}`} 
                      item 
                      xs={12} 
                      sm={6} 
                      md={6}
                      lg={6}
                    >
                      <FormInput 
                        requerido = {elem.config.requerido}
                        indice = {plantillaIndex}
                        isComplete = {elem.config.isComplete}
                        inhabilitado = {inhabilitado}
                        onChange={handleChangeComponentProxy}
                        nomCampo = {elem.config.nomCampo}
                        valor = {elem.config.valor}
                        tipoInput = {elem.config.value}
                        longitud = {elem.config.longitud}
                      />
                    </Grid>
                  </React.Fragment>
                );
              case 1:
                return(
                  <Grid 
                    key={`textL_${elem.tipoComponenteId}_${plantillaIndex}`} 
                    item 
                    xs={12} 
                    sm={6} 
                    md={6}
                    lg={6}
                  >
                    <FormInput 
                      requerido = {elem.config.requerido}
                      indice = {plantillaIndex}
                      isComplete = {elem.config.isComplete}
                      inhabilitado = {inhabilitado}
                      onChange={handleChangeComponentProxy}
                      nomCampo = {elem.config.nomCampo}
                      valor = {elem.config.valor}
                      multiline
                      tipoInput = {elem.config.value}
                      longitud = {elem.config.longitud}
                    />
                  </Grid>
                );
              case 2:
                return(
                  <React.Fragment 
                    key={`reactSM_${elem.tipoComponenteId}_${plantillaIndex}`}
                  >
                    {size(elem.config.opciones) < 6 ?
                      <Grid container> 
                        <FormCheckbox 
                          requerido = {elem.config.requerido}
                          indice = {plantillaIndex}
                          isComplete = {elem.config.isComplete}
                          inhabilitado = {inhabilitado}
                          nomCampo = {elem.config.nomCampo}
                          valor = {elem.config.valor}
                          onChange = {handleChangeComponentProxy}
                          tipo = {elem.tipoComponenteId}
                          opciones = {elem.config.opciones}
                        />
                      </Grid> : 
                      <Grid item xs={10} sm={8} md={8}>
                        <FormSelectMultiple 
                          requerido = {elem.config.requerido}
                          indice = {plantillaIndex}
                          isComplete = {elem.config.isComplete}
                          inhabilitado = {inhabilitado}
                          nomCampo = {elem.config.nomCampo}
                          valor = {elem.config.valor}
                          onChange = {handleChangeComponentProxy}
                          tipo = {elem.tipoComponenteId}
                          opciones = {elem.config.opciones}
                        />
                      </Grid>}
                  </React.Fragment>
                );
              case 3:
                return(
                  <React.Fragment 
                    key={`reactRad_${elem.tipoComponenteId}_${plantillaIndex}`}
                  >
                    <Grid container>
                      <FormRadio 
                        requerido = {elem.config.requerido}
                        indice = {plantillaIndex}
                        isComplete = {elem.config.isComplete}
                        inhabilitado = {inhabilitado}
                        nomCampo = {elem.config.nomCampo}
                        valor = {elem.config.valor}
                        onChange = {handleChangeComponentProxy}
                        tipo = {elem.tipoComponenteId}
                        opciones = {elem.config.opciones}
                      />
                    </Grid>
                  </React.Fragment>
                );
              case 4:
                return(
                  <React.Fragment 
                    key={`reactSS_${elem.tipoComponenteId}_${plantillaIndex}`}
                  >
                    <Grid 
                      item 
                      xs={10} 
                      sm={6} 
                      md={6}
                      lg={6}
                    >
                      <FormSelect 
                        requerido = {elem.config.requerido}
                        indice = {plantillaIndex}
                        isComplete = {elem.config.isComplete}
                        inhabilitado = {inhabilitado}
                        nomCampo = {elem.config.nomCampo}
                        valor = {elem.config.valor}
                        onChange = {handleChangeComponentProxy}
                        tipo = {elem.tipoComponenteId}
                        opciones = {elem.config.opciones}
                      />
                    </Grid>
                  </React.Fragment>
                );
              case 5:
                return(
                  <Grid 
                    key={`inputF_${elem.tipoComponenteId}_${plantillaIndex}`} 
                    container 
                    style={{paddingTop: 8}}
                  >
                    <FormInputFile 
                      requerido = {elem.config.requerido}
                      indice = {plantillaIndex}
                      isComplete = {elem.config.isComplete}
                      inhabilitado = {inhabilitado}
                      nomCampo = {elem.config.nomCampo}
                      valor = {elem.config.valor}
                      tamaño = {elem.config.tamañoarchivos}
                      numArchivos = {elem.config.cantidadarchivos}
                      onChange = {handleChangeInputFileProxy}
                      downloadTicketFile = {downloadTicketFile}
                      deleteFile = {deleteFile}
                      opciones = {inhabilitado ? elem.config.opciones : elem.config.valor}
                    />
                  </Grid>
                );
                //             plazaUsuarioLogeado={plazaUsuarioLogeado}
                //             // plazasAutorizadas={plazasAutorizadas}
                //             tabSelected={tabSelected}
                //             valorNumero = {elem.config.valorNumero}
                //             requerido = {elem.config.requerido}
                //             relacionaOtro = {elem.config.relacionaOtro}
                //             requeridoRelacion = {elem.config.requeridoRelacion}
                //             relaciones = { elem.config.relaciones}
                //             itemsCatalogo = {elem.config.itemsCatalogo}
                //             idxCatalogo = {plantillaIndex}
                //             cargarDatosCatalogo2 = {cargarDatosCatalogo2}
                //             cargarRelaciones = {cargarRelaciones}
                //             // cargarPlazasAutorizadas={cargarPlazasAutorizadas}
                //             actions={actionsCatalogos}
                //           />
                //         </Grid>
                //       </React.Fragment>
                //     );
              default :
                return null;
            }
          })}

        </Grid>
      </Container>
    </div>
  )  
}
DatosPlantilla.propTypes = {
  datos: T.object,
  classes: T.object,
  handleChangeComponentProxy: T.func,
  handleChangeInputFileProxy: T.func,
  deleteFile:                 T.func,
  inhabilitado:               T.number,
  //   numUsuarioLogeado:          T.number,
  plazaUsuarioLogeado:        T.number,
  tabSelected:                T.number,
  downloadTicketFile:         T.func,
  //   plazasAutorizadas:          T.array,
  cargarDatosCatalogo2:       T.func,
  cargarRelaciones:           T.func,
  cambiarValorCatalogo:       T.func,
  //   cargarPlazasAutorizadas:    T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
    handleChangeComponentProxy: (props) => (index, cIndex) => (event) => {
      const {
        handleChangeComponent,
        datos,
      } = props;
      const long = datos.tipoForma[index].config.longitud;
      const tipo = datos.tipoForma[index].config.value;
      let {
        target: { value },
      } = event;
      if(!isArray(value)){
        value = value.replace(/^\s+/g,'');
        // eslint-disable-next-line no-nested-ternary
        value = (tipo === 'numero' ? (value > 0 ? (parseInt(value) < long ? parseInt(value) : long) : 0) : value)
      }       
      handleChangeComponent(index, value, cIndex)
    },
    deleteFile: (props) => (index, cIndex) => () => {
      const {
        deleteFile,
      } = props;
      deleteFile(index, cIndex)
    },
    handleChangeInputFileProxy: (props) => (index ,tamañoC, numArch) => (e) => {
      const archivosValidos = [
        'xlsx', 
        'xls', 
        'pdf', 
        'doc', 
        'docx', 
        'png', 
        'jpg', 
        'jpeg',
      ];
      const formData = new FormData();
      const arreglo = [];
      const {
        handleChangeInputFile,
        notificacion,
      } = props;
      let tipo = '';
      let tamaño = 0;
      let error = false;
      const files = slice(Array.from(e.target.files), 0, numArch);
      
      for(let i = 0; i < files.length; i+=1){
        tipo = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
        tipo = tipo.toLowerCase();
        tamaño += files[i].size;
        if(archivosValidos.includes(tipo) && 
          tamaño <= (tamañoC * 1048576)
        ){
          formData.append('files',files[i]);
          arreglo.push(files[i]);
        } else {
          error = true;
        }
      }
      if(error)
        notificacion({
          message: 'Archivos no admitidos',
          options: {
            variant: 'warning',
          },
        })
      handleChangeInputFile(index, arreglo, formData);
    },
    downloadTicketFile: (props) => (fileUrl, nomArchivo) => () => {
      const {
        downloadTicketFile,
      } = props;
      downloadTicketFile(fileUrl, nomArchivo);
    },
  }),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS DEL CHAT ]===================================
      cargarDatosCatalogo: (datos,idxCatalogo) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CARGAR_DATOS_CATALOGO_ACTION',
          datos,
          idxCatalogo,
          cambioA: 'propio',
        })
      },
      cargarDatosCatalogo2: (procedimiento,parametros,idxCatalogo,IdCatalogo) => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CARGAR_DATOS_CATALOGO2_ACTION',
          procedimiento,
          parametros,
          cambioA: 'propio',
          idxCatalogo,
          idxCatalogoPadre: idxCatalogo,
          IdCatalogo,
          from : 'DP',
        })
      },
      cargarRelaciones: (IdCatalogo,idxCatalogo) => {
       
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CARGAR_RELACIONES_ACTION',
          idxCatalogo,
          IdCatalogo,
        })
      },
      cambiarValorCatalogo: (idxCatalogo,relaciones,relacionaOtro) => event => {
        
        const {
          name,
          value,
        } = event.target;

        if(relacionaOtro === true && relaciones[0].ParaNombre !== null && relaciones[0].ParaNombre !== ''){
          dispatch({
            type: 'APP/CONTAINER/PLANDETRABAJO/CARGAR_DATOS_CATALOGO_RELACION_ACTION',
            procedimiento: relaciones[0].SP,
            parametros: relaciones[0].Parametros,
            cambioA: 'haciaRelacion',
            IdCatalogo: relaciones[0].Para,
            idxCatalogo,
            value,
            name,
          });
        }else{
          dispatch(
            {
              type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_VALOR_CATALOGOS_ACTION',
              value,
              idxCatalogo,
              cambioA:'propio',
              from : 'DP',
            },
          )
        }
      },
      cargarPlazasAutorizadas: (Usuario) => {
        dispatch(
          {
            type: 'APP/CONTAINER/PLANDETRABAJO/OBTENER_PLAZAS_AUTORIZADAS_ACTION',
            Usuario,
          },
        )
      },
    })
  ),
)(DatosPlantilla);
