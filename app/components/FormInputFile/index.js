/**
 *
 * FormInputFile
 *
 */

import React from 'react';
import T from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';


function FormInputFile(props) {
  const {
    requerido,
    indice,
    isComplete,
    inhabilitado,
    nomCampo,
    onChange,
    downloadTicketFile,
    deleteFile,
    opciones,
    tamaño,
    numArchivos,
  } = props;

  const desactivado = !isComplete && requerido && !inhabilitado;

  return (
    <React.Fragment>
      <Grid 
        item 
        xs={12} 
        sm={12} 
        md={12} 
        lg={4}
      >
        <FormControl>
          <input
            accept="image/*"
            style={{display: 'none'}}
            id="contained-button-file"
            onChange={onChange(indice, tamaño, numArchivos)}
            multiple
            disabled={inhabilitado === 1}
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button 
              variant="contained" 
              disabled={inhabilitado === 1} 
              component="span"
            >
              {nomCampo}
            </Button>
          </label>
          <FormHelperText
            style={{color: desactivado ? 'red' : 'gray'}}
          >
            {desactivado ? 'Campo Requerido *' : ''}
          </FormHelperText>
        </FormControl>
      </Grid>
      {
        opciones.map((file, fileIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={`inputFile${fileIndex}`}>
            {
              fileIndex === 2 ? 
                <Grid 
                  item 
                  xs={false} 
                  sm={false} 
                  md={false} 
                  lg={4}
                /> : 
                null
            }
            <Grid 
              item 
              xs={6} 
              sm={6} 
              md={6} 
              lg={4} 
              style={{paddingBottom: 4}}
            >
              <Tooltip 
                key='fileInputTool' 
                title={inhabilitado ? file.value : file.name}
              >
                <Chip
                  label={inhabilitado ? file.value.substring(0,25) : file.name.substring(0,25)}
                  id={fileIndex}
                  style={{fontSize: '0.7em'}}
                  onClick={inhabilitado ? downloadTicketFile(file.url, file.value) : null}
                  onDelete={!inhabilitado ? deleteFile(fileIndex, indice) : null}
                />
              </Tooltip>
            </Grid>
          </React.Fragment>
        ))}
    </React.Fragment>
  );
}

FormInputFile.propTypes = {
  requerido: T.bool,
  indice: T.number,
  isComplete: T.bool,
  inhabilitado: T.number,
  nomCampo: T.string,
  tamaño: T.string,
  numArchivos: T.string,
  onChange: T.func,
  opciones: T.array,
  downloadTicketFile: T.func,
  deleteFile: T.func,
};

export default FormInputFile;