/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */

import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers} from 'recompose';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {size, slice } from 'lodash';

import FormSelect from '../CamposEspeciales/FormSelect'
import FormRadio from '../CamposEspeciales/FormRadio'
import FormInput from '../CamposEspeciales/FormInput'
// import FormCheckbox from '../CamposEspeciales/FormCheckbox'
import FormCheckbox from '../CamposEspeciales/FormCheckbox'
import FormSelectMultiple from '../CamposEspeciales/FormSelectMultiple'
import FormInputFile from '../CamposEspeciales/FormInputFile'
import CatalogoComponent from '../CamposEspeciales/Catalogo'

import { Container } from '../../../ConfiguracionTicket/styledComponents';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: '4px',
    height: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
    width:'100%',
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
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 4,
    // margin: 'auto',
  },
  detalle: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
    // margin: 'auto',
  },
  paper2: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    // margin: 'auto',
    paddingBottom: '10px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '100%',
    width: '100%',
    maxWidth: '100%',
  },
});

function DatosPlantillaEspeciales(props) {
  const { 
    datos,
    classes,
    onInputChange,
    onChangeValueCheckBox,
    handleChangeInputFile,
    numUsuarioLogeado,
    idRolUsuarioLogeado,
    deleteFile,
    inhabilitado,
    downloadTicketFile,
    
    onChangeValuee,
    cargarDatosCatalogo2,
  } = props;

  const actionsCatalogos = {
    cambiarValorCatalogo: props.cambiarValorCatalogo,
  };

  let componentes = [];

  let indiceEtapa = -1;
  for(let x=0; x<datos.etapas.length;x++){
    
    if((datos.etapas[x].IdUsuario === numUsuarioLogeado || datos.etapas[x].rolUsuarioSelected === idRolUsuarioLogeado) && datos.etapas[x].Activo){
      componentes = datos.etapas[x].configuracion;
      indiceEtapa = x;
    }
    
  }
  
  return (
    <div className={inhabilitado ? classes.rootInhabilitado : classes.root}>
      {componentes.length > 0 ? 
        <Fragment>
          <Container className={inhabilitado ? classes.detalle : classes.paper}>
            <Typography style={{fontSize: 14, fontWeight: 'bold'}}>
              Datos Especiales
            </Typography>
          </Container>
          
          <Container 
            container 
            item 
            className={classes.paper2} 
            style={{display: 'inline-block'}}
          >
            <Grid container >
              {componentes.map((elem, plantillaIndex) => {
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
                            indiceEtapa={indiceEtapa}
                            onChange={onChangeValuee}
                            onInputChange={onInputChange}
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
                          indiceEtapa={indiceEtapa}
                          onChange={onChangeValuee}
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
                              indiceEtapa={indiceEtapa}
                              nomCampo = {elem.config.nomCampo}
                              valor = {elem.config.valor}
                              onChange = {onChangeValueCheckBox}
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
                              indiceEtapa={indiceEtapa}
                              nomCampo = {elem.config.nomCampo}
                              valor = {elem.config.valor}
                              onChange = {onChangeValuee}
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
                            indiceEtapa={indiceEtapa}
                            nomCampo = {elem.config.nomCampo}
                            valor = {elem.config.valor}
                            onChange = {onChangeValueCheckBox}
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
                            indiceEtapa={indiceEtapa}
                            nomCampo = {elem.config.nomCampo}
                            valor = {elem.config.valor}
                            onChange = {onChangeValuee}
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
                          indiceEtapa={indiceEtapa}
                          nomCampo = {elem.config.nomCampo}
                          valor = {elem.config.valor}
                          tamaño = {elem.config.tamañoarchivos}
                          numArchivos = {elem.config.cantidadarchivos}
                          onChange = {handleChangeInputFile}
                          downloadTicketFile = {downloadTicketFile}
                          deleteFile = {deleteFile}
                          opciones = {elem.config.files === undefined ? [] : elem.config.files}
                        />
                      </Grid>
                    );
                  case 6:
                    return(
                      <React.Fragment
                        key={`reactCat_${elem.tipoComponenteId}_${plantillaIndex}`}
                      >
                        <Grid
                          item
                          xs={10}
                          sm={6}
                          md={6}
                          lg={6}
                        >
                          <CatalogoComponent
                            inhabilitado={inhabilitado}
                            indiceEtapa={indiceEtapa}
                            nombre = {elem.config.nomCampo}
                            valor = {elem.config.value}
                            requerido = {elem.config.requerido}
                            relacionaOtro = {elem.config.relacionaOtro}
                            requeridoRelacion = {elem.config.requeridoRelacion}
                            relaciones = { elem.config.relaciones}
                            itemsCatalogo = {elem.config.itemsCatalogo}
                            idxCatalogo = {plantillaIndex}
                            cargarDatosCatalogo2 = {cargarDatosCatalogo2}
                            actions={actionsCatalogos}
                          />
                        </Grid>
                      </React.Fragment>
                    );
                  default :
                    return null;
                }
              })}

            </Grid>
          </Container>
        </Fragment>
        : null }
    </div>
  )  
}
DatosPlantillaEspeciales.propTypes = {
  datos:                      T.object,
  classes:                    T.object,
  handleChangeInputFile:      T.func,
  deleteFile:                 T.func,
  inhabilitado:               T.number,
  numUsuarioLogeado:          T.number,
  idRolUsuarioLogeado:        T.number,
  downloadTicketFile:         T.func,
  onChangeValuee:             T.func,
  onChangeValueCheckBox:     T.func,
  cargarDatosCatalogo2:       T.func,
  cambiarValorCatalogo:       T.func,
  onInputChange:              T.func,
};

export default compose(
  withStyles(styles),
  withHandlers({
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
          type: 'APP/CONTAINER/TABLEROS/CARGAR_DATOS_CATALOGO_ACTION',
          datos,
          idxCatalogo,
          cambioA: 'propio',
        })
      },
      cargarDatosCatalogo2: (procedimiento,parametros,idxCatalogo,IdCatalogo,indiceEtapa) => {
        
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CARGAR_DATOS_CATALOGO2_ACTION',
          procedimiento,
          parametros,
          cambioA: 'propio',
          idxCatalogo,
          IdCatalogo,
          from : 'DPE',
          indiceEtapa,
        })
      },
      cargarRelaciones: (IdCatalogo,idxCatalogo) => {
       
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CARGAR_RELACIONES_ACTION',
          idxCatalogo,
          IdCatalogo,
        })
      },
      onChangeValuee: (indiceEtapa,indice) => event => {
        const {
          value,
        } = event.target;

        dispatch(
          {
            type: 'APP/CONTAINER/TABLEROS/CAMBIAR_VALOR_CAMPOS_ESPECIALES_BANDEJA_ACTION',
            value,
            indice,
            indiceEtapa,
          },
        )
      },
      onChangeValueCheckBox: (indiceEtapa,indice,campoIndex) => event => {
        
        const value = event.currentTarget.type === 'radio' ? event.currentTarget.value : event.target.checked;

        dispatch(
          {
            type: 'APP/CONTAINER/TABLEROS/CAMBIAR_VALOR_CHECKBOX_CAMPOS_ESPECIALES_BANDEJA_ACTION',
            value,
            indice,
            indiceEtapa,
            campoIndex,
            from : event.currentTarget.type === 'radio' ? 'radio' : 'check',
          },
        )
      },
      
      cambiarValorCatalogo: (idxCatalogo,relaciones,relacionaOtro,indiceEtapa = 0) => event => {
        const {
          name,
          value,
        } = event.target;
        
        if(relacionaOtro === true && relaciones[0].ParaNombre !== null && relaciones[0].ParaNombre !== ''){
          dispatch({
            type: 'APP/CONTAINER/TABLEROS/CARGAR_DATOS_CATALOGO_RELACION_ACTION',
            procedimiento: relaciones[0].SP,
            parametros: relaciones[0].Parametros,
            cambioA: 'haciaRelacion',
            IdCatalogo: relaciones[0].Para,
            idxCatalogo,
            value,
            name,
            indiceEtapa,
            from : 'DPE',
          });
        }else{
          dispatch(
            {
              type: 'APP/CONTAINER/TABLEROS/CAMBIAR_VALOR_CATALOGOS_ACTION',
              value,
              idxCatalogo,
              indiceEtapa,
              cambioA:'propio',
              from : 'DPE',
            },
          )
        }
      },
      handleChangeInputFile: (indiceEtapa, index ,tamañoC, numArch) => e =>{

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

        let tipo = '';
        let tamaño = 0;
      
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
          }
        }

        dispatch(
          {
            type: 'APP/CONTAINER/TABLEROS/INPUTFILE_CAMPOS_ESPECIALES_BANDEJA_ACTION',
            indiceEtapa,
            index,
            arreglo,
            formData,
          },
        )
      },
      downloadTicketFile: (file) => () => {
        dispatch(
          {
            type: 'APP/CONTAINER/TABLEROS/DOWNLOAD_TICKET_FILE_FORMDATA_ACTION',
            file,
          },
        )
      },
      deleteFile: (indiceEtapa,fileIndex,indice) => () => {
        dispatch(
          {
            type: 'APP/CONTAINER/TABLEROS/DELETE_TICKET_FILE_ACTION',
            indiceEtapa,
            fileIndex,
            indice,
          },
        )
      },
    })
  ),
)(DatosPlantillaEspeciales);
