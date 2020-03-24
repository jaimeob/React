/* eslint-disable radix */
import React from 'react';
import T from 'prop-types';
import { isNull } from 'lodash';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { Grid, TextField, MenuItem} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tabla from '../../../../../../../../components/DataTable';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '80%',
    maxWidth: '80%',
    width: '80%',
  },
  success: {
    backgroundColor: '#28950F',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#1d7109',
    },
    color: 'white',
  },
  leftIcon: {
    marginRight: 8,
  },
})

function PestanaSecciones(props){
  const {
    pestana,
    moldesDestino,
    plantas,
    plantaFilterAction,
    plantaSlc,
    onRowMoldeSelectProxy,
  } = props;
  
  const headerPiezas = [
    {
      name: 'nombre',
      label: 'Molde',
      options: {
        filter: false,
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'center', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0,
              } 
            } 
          > 
            {columnMeta.label} 
          </th> 
        ),
        setCellProps: () => ({ 
          style: {
            textAlign: 'center', 
            padding: 8, 
            width: '50%', 
          }, 
        }),
      },
    },
    {
      name: 'version',
      label: 'Versión',
      options: {
        filter: false,
        customHeadRender: (columnMeta) => ( 
          <th  
            // eslint-disable-next-line react/no-array-index-key 
            key={`cabecera${columnMeta.label}`}  
            style={ 
              { 
                textAlign: 'center', 
                 
                color: 'rgba(0, 0, 0, 0.54)', 
                fontSize: '0.75rem', 
                fontWeight: '500', 
                padding : '8px 8px', 
                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                position: 'sticky',
                top: 0, 
              } 
            } 
          > 
            {columnMeta.label} 
          </th> 
        ),
        setCellProps: () => ({ 
          style: { 
            textAlign: 'center', 
            padding : '8px 8px',
            paddingTop: 0,
            paddingBottom: 0, 
            width: '50%', 
          }, 
        }),
      },
    },
  ]

  const configuracion = {
    filtro : true,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'single',
    paginado: false,
    responsivo: "scroll",
  };
  
  if(pestana === 0)
    return (
      <div>
        <Grid
          item
          xs={6}
          sm={6}
        >
          <TextField
            select
            label="Planta"
            margin="normal"
            onChange={(e) => plantaFilterAction(e)}
            value={plantaSlc}
            fullWidth
            style={{marginLeft: 15, zIndex: 1}}
          >
            <MenuItem key={0} value={0}>
              Todas
            </MenuItem>
            {plantas.map(planta => (
              <MenuItem key={planta.Id} value={planta.Id}>
                {planta.Planta}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {
          !isNull(plantaSlc) ? 
            <Tabla
              headers={headerPiezas}
              data={moldesDestino.datos}
              params= {
                {
                  height: 82,
                  backgroundColor: '#fff',
                }
              }
              temporal
              elevacion={0}
              configuracion={configuracion}
              onRowsSelect={onRowMoldeSelectProxy}
              rowsSelected={moldesDestino.seleccionados}
              mensajeTexto='No se encuentran moldes registrados'
            /> : null
        }
        
      </div>
    );
}

PestanaSecciones.propTypes = {
  pestana: T.number,
  plantasPiezas: T.object,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onRowMoldeSelectProxy:(props) => (rowSeleccionado,seleccionados) => {

      const {
        plantaSlc,
        setMoldeSeleccionadoAction,
      } = props
      const rowSeleccionados = [] 
      seleccionados.forEach((seleccionado) => { 
        rowSeleccionados.push(seleccionado.index) 
      })
      setMoldeSeleccionadoAction(rowSeleccionados, plantaSlc) 
    },
  })
)(PestanaSecciones);
