
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
    indiceEtapa,
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
            accept="*"
            style={{display: 'none'}}
            id="contained-button-file4"
            onChange={onChange(indiceEtapa,indice, tamaño, numArchivos)}
            multiple
            disabled={inhabilitado === 1}
            type="file"
          />
          <label htmlFor="contained-button-file4">
            <Button 
              variant="contained" 
              // disabled={inhabilitado === 1} 
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
                title={file.url === undefined ? file.name : file.value}
              >
                <Chip
                  label={file.url === undefined ? file.name : file.value}
                  id={fileIndex}
                  style={{fontSize: '0.7em'}}
                  onClick={downloadTicketFile(file)}
                  onDelete={deleteFile(indiceEtapa,fileIndex,indice)}
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
  indiceEtapa: T.number,
};

export default FormInputFile;