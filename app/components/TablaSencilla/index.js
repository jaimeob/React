/* eslint-disable no-nested-ternary */
/**
 *
 * TablaSencilla
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Avatar,
  FormControl,
  Button,
  Tooltip,
  Chip,
} from '@material-ui/core';
import Nubesita from '@material-ui/icons/CloudUpload';
import Archivito from '@material-ui/icons/InsertDriveFile';
import T from 'prop-types';
// import styled from 'styled-components';
import {uniqueId} from 'lodash';
import './style.css';
const styles = () => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: 24,
    width: '100%',
    overflowX: 'auto',
    marginBottom: 16,
  },
  paper2: {
    marginTop: 24,
    width: '100%',
    marginBottom: 16,
  },
  table: {
    minWidth: 650,
  },
  tablaAjustada: {
    padding: '6px 16px 6px 16px',
  },
  rowChico: {
    height: 'initial',
  },
})

const adornoInput = (adorno) => {
  switch(adorno){
    case '%':
      return <InputAdornment position="end">%</InputAdornment>
    default :
      return null;

  }
}

const Input = (
  func, 
  opc, 
  indice, 
  valor,
  length,
  adorno, 
  placeholder, 
  requerido,
  vacio,
  inhabilitado,
  variant,
) => {
  if(inhabilitado){
    return valor;
  }
  return <TextField 
    variant={variant} 
    onChange={func(opc, indice)} 
    value={valor}
    placeholder={placeholder}
    error={!vacio && requerido && !inhabilitado}
    disabled={inhabilitado === 1}
    helperText={requerido && !inhabilitado ? '*Requerido' : ''}
    style={{
      width: '100%',
    }}
    // eslint-disable-next-line no-return-assign
    key={`inputT${indice}`}
    inputProps={{
      style: {
        padding: 4,
        fontSize: 11,
      },
      maxLength: length,
    }}
    // eslint-disable-next-line react/jsx-no-duplicate-props
    InputProps={{
      endAdornment: adornoInput(adorno),
    }}
  />
}

const TextArea = (func, opc, indice, valor) => <TextField 
  variant='outlined' 
  onChange={func(indice, opc)} 
  value={valor}
  rows={2}
  multiline
  // eslint-disable-next-line no-return-assign
  key={`inputT${indice}`}
  inputProps={{
    style: {
      // padding: 4,
      fontSize: 11,
    },
    length: 255,
  }}
/>

const File = (funcFile, funcDescargar, funcEliminar, indice, ruta, nomArchivo, inhabilitado, deleteOpc, band) => 
  <React.Fragment>
    {!inhabilitado ?
      <FormControl>
        <input
          accept="*"
          style={{display: 'none'}}
          id={`uploadFile${band}${indice}`}
          onChange={funcFile(indice, band)}
          disabled={
            Array.isArray(ruta) ||
            ruta !== null
          }
          type="file"
        />
        {!(Array.isArray(ruta) ||
                ruta !== null) ?  
          <label 
            htmlFor={`uploadFile${band}${indice}`}
            style={{
              margin: 'initial',
            }}
          >
            <Button 
              variant="text" 
              component="span"
              disabled={
                Array.isArray(ruta) ||
                ruta !== null
              }
            >
              <Nubesita style={{color : '#F9AA33'}}/>
            </Button>
          </label> : null}
      </FormControl>
      : null }
    {Array.isArray(ruta) ||
        ruta !== null ?
      <Tooltip 
        key={`fileInputTool${band}${indice}`}
        title = {
          nomArchivo
        }
      >
        <Chip
          icon={<Archivito />}
          label={
            nomArchivo.substring(0,13)
          }
          id={indice}
          style={{fontSize: '0.7em'}}
          onClick={funcDescargar(indice, band)}
          onDelete={deleteOpc ? null 
            : funcEliminar(indice, band)}
        />
      </Tooltip> : null}
  </React.Fragment>;

const Chips = (indice, label, bColor) => {
  const color = /\(([^)]+)\)/.exec(bColor);
  return <Chip
    avatar={<Avatar style={{backgroundColor: bColor}}></Avatar>}
    label={label}
    key={`chipTablaSencilla${indice}`}
    style={{
      backgroundColor: 'white',
      borderColor: `rgba(${color[1]}, 0.5)`,
      width: '135px',
      justifyContent: 'start',
    }}
    variant="outlined"
  />
}

function TablaSencilla(props) {
  const {
    classes,
    rowsTamano,
    encabezados,
    cabeceras,
    datos,
    elevacion,
    sinBorde,
    id,
    idTabla,
    funcInput,
    funcFile,
    funcDescargar,
    funcEliminar,
    bandGuardar,
    eliminarArchivo,
    band,
    opc,
    adorno,
    stickyHeader,
    scrollEnDialog,
  } = props;

  return (
    <div style={{width : '100%'}}>
      <Paper 
        className={scrollEnDialog ? classes.paper2 : classes.paper}
        elevation={elevacion}
        id='paperTablaSencilla'
      >
        <Table 
          className={classes.table}
          id={idTabla || 'tablaSencilla'}
        >
          <TableHead
            style={
              {
                // border: sinBorde && 'initial',
              }
            }
          >
            {encabezados && 
              <TableRow
                key={uniqueId(`encabezado${id}`)}
                className={rowsTamano === 'small' && classes.rowChico}
              >
                {encabezados.map(enc => (
                  <TableCell 
                    key={uniqueId(`tablaencabezadoscell${id}`)} 
                    colSpan={enc.colSpan || null} 
                    align={enc.textAlign}
                    className={rowsTamano === 'small' && classes.tablaAjustada}
                    style={
                      {
                        backgroundColor: enc.backgroundColor || 'initial',
                        color: enc.color || 'initial',
                        fontSize: '12px',
                        width: enc.width,
                        // border: sinBorde && 'initial',
                      }
                    }
                  >
                    {enc.nombre}
                  </TableCell>
                ))}
              </TableRow>
            }
            <TableRow
              key={uniqueId(`cabecera${id}`)}
              className={rowsTamano === 'small' && classes.rowChico}
            >
              {cabeceras.map(cab => (
                <TableCell 
                  key={uniqueId(`tablaheadcell${id}`)} 
                  colSpan={cab.colSpan || 1} 
                  align={cab.textAlign}
                  className={rowsTamano === 'small' && classes.tablaAjustada}
                  style={
                    {
                      backgroundColor: cab.backgroundColor || '#fff',
                      color: cab.color || 'initial',
                      border: sinBorde && 'initial',
                      fontSize: '12px',
                      width: cab.width,
                      textAlign: 'center',
                      top: stickyHeader ? 0 : 'initial',
                      left: stickyHeader ? 0 : 'initial',
                      zIndex: 2,
                      position: stickyHeader ? 'sticky' : 'initial',
                    }
                  }
                >
                  {cab.nombre}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            style={
              {
                border: sinBorde && 'initial',
              }
            }
          >
            {datos.map((dat, indice) => (
              <TableRow 
                // eslint-disable-next-line react/no-array-index-key
                key={`tablabodyrow${id}${indice}`}
                className={rowsTamano === 'small' && classes.rowChico}
                style={
                  {
                    backgroundColor: dat.rowColor || 'white',
                  }
                }
              >
                {cabeceras.map((cab) => (
                  // typeof dat[cab.campo] !== 'undefined' &&
                  <TableCell 
                    // eslint-disable-next-line react/no-array-index-key
                    key={`tablabodycell${id}${cab.campo}`} 
                    colSpan={dat[`${cab.campo}ColSpan`] || cab.colSpan || 1} 
                    align={dat[`${cab.campo}Align`] || 'center'}
                    className={rowsTamano === 'small' && classes.tablaAjustada}
                    style={
                      {
                        border: sinBorde && 'initial',
                        backgroundColor: dat[`${cab.campo}bgColor`] || dat.rowColor || 'white',
                        color: dat[`${cab.campo}txtColor`] || '#424242',
                        fontSize: dat[`${cab.campo}fSize`] || '11px',
                        fontFamily: "'Roboto','medium'",
                        fontWeight: dat[`${cab.campo}fontW`] || 'initial',
                        textAlign: 'center',
                        padding: typeof dat[`${cab.campo}Input`] !== 'undefined' ? (dat[`${cab.campo}InputRequerido`]? '4px 12px 4px 12px' : '0px 12px 16px 12px') : '0px 16px 0px 16px', 
                        //   typeof dat[`${cab.campo}TextArea`] !== 'undefined' ? 'initial' : '4px 56px 4px 24px',
                      }
                    }
                  >
                    {
                      typeof dat[`${cab.campo}Input`] !== 'undefined' ? 
                        Input(
                          funcInput, 
                          opc || dat[`${cab.campo}InputPropiedad`], 
                          indice, 
                          dat[`${cab.campo}Input`],
                          dat[`${cab.campo}InputLength`],
                          adorno,
                          dat[`${cab.campo}InputPH`], 
                          dat[`${cab.campo}InputRequerido`], 
                          bandGuardar ? ( dat[`Band${cab.campo}Input`] === 1 
                            && dat[`${cab.campo}Input`]) : true, 
                          dat[`${cab.campo}InputInhabilitado`], 
                          dat[`${cab.campo}InputVariant`], 
                        ) : 
                        (dat[`${cab.campo}Chip`] ? 
                          Chips(indice, dat[`${cab.campo}Chip`], dat[`${cab.campo}ChipColor`]) :
                          (typeof dat[`${cab.campo}InputFile`] !== 'undefined' ? 
                            File(
                              funcFile, 
                              funcDescargar, 
                              funcEliminar, 
                              indice, 
                              dat[`${cab.campo}InputFile`], 
                              dat[`${cab.campo}NombreArchivo`], 
                              dat[`${cab.campo}InputFileInha`],
                              dat[`${cab.campo}InputFileEliminar`], 
                              dat[`${cab.campo}FileBand`]
                            ) : 
                            (typeof dat[`${cab.campo}TextArea`] !== 'undefined' ?
                              TextArea(funcInput, opc, indice, dat[`${cab.campo}TextArea`]) :
                              dat[cab.campo]
                            )
                          )
                        )
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

TablaSencilla.propTypes = {
  classes: T.object,
  rowsTamano: T.string,
  encabezados: T.array,
  cabeceras: T.array,
  datos: T.array,
  elevacion: T.number,
  sinBorde: T.bool,
  id: T.string,
  idTabla: T.string,
  funcInput: T.func,
  funcFile: T.func,
  funcDescargar: T.func,
  funcEliminar: T.func,
  eliminarArchivo: T.bool,
  band: T.number,
  opc: T.string,
  adorno: T.string,
  stickyHeader: T.bool,
  scrollEnDialog: T.bool,
};

export default withStyles(styles)(TablaSencilla);
