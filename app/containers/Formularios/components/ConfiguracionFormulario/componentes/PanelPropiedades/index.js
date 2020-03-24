/* eslint-disable react/no-array-index-key */
/*
  PanelPropiedades / index
*/

import React, {
// Fragment,
} from 'react';
import T from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import noop from 'lodash/noop';

import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import withNotifier from 'components/HOC/withNotifier';

import { compose } from 'recompose';


import {
  Paper,
  Grid,
  Typography,
  TextField,
  Switch,
  FormLabel,
  Radio,
  Fade,
  withStyles,
  IconButton,
  Tooltip,
  MenuItem,
  Divider,
  Checkbox,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  withTheme,
} from '@material-ui/core';

const STYLES = () => ({
  rootInpLength: {
    maxWidth: '128px',
  },
  focusedInputs: {
    maxWidth: '100%',
  },
})

const DEFAULT_COL = {
  id: '',
  name: '',
  textAlign: '',
  dataType: '',
  label: '',
  value: '',
  placeholder: '',
  autoincrement: false,
  options: [],
  optionsText: '',
  fileType: '',
  fileSize: '',
  fileLimit: 1,
} 

export function PanelPropiedades(props) {
  const {
    showTypesFor: {
      tipo = '',
      longitudMinima = '',
      longitudMaxima = '',
      placeholder = '',
      textAlign = '',
      requerido = false,
      dataType = '',
      tableCols = [],
      fileType = '',
      fileLimit = 0,
    },
    selectedCell = -1, // header cell index
    classes,
    actions: {
      handleUpdateComponentProp,
      handleUpdateMinMaxLengths,
      handleUpdateComponentCellProp,
      handleAddCellOptions,
      handleAddOptions,
      deleteCellSelectOpt,
    },
  } = props;
  // onClick={(col, idx, idc)}
  const tableCell = selectedCell >= 0 ? tableCols[selectedCell] : DEFAULT_COL;
  const {
    placeholder: cllPlaceholder = '',
  } = tableCell;
  let component = null;
  const useEventValOpts = {
    useEventInputValue: true,
  };
  const useEventCheckedOpts = {
    useEventInputChecked: true,
  };
  const args = {
    chngPlaceholder: [
      null,
      'placeholder',
      null,
      useEventValOpts,
    ],
    chngMinLength: [
      'longitudMinima',
    ],
    chngMaxLength: [
      'longitudMaxima',
    ],
    alignLeft: [
      null,
      'textAlign',
      'left',
    ],
    alignCenter: [
      null,
      'textAlign',
      'center',
    ],
    alignRight: [
      null,
      'textAlign',
      'right',
    ],
    chngRequired: [
      null,
      'requerido',
      null,
      useEventCheckedOpts,
    ],
    chngDataType: [
      null,
      'dataType',
      null,
      useEventValOpts,
    ],
    /* TABLE CELL ARGS */
    chngLabelCell: [
      'label',
      null,
      useEventValOpts,
    ],
    alignLeftCell: [
      null,
      'textAlign',
      'left',
    ],
    alignCenterCell: [
      null,
      'textAlign',
      'center',
    ],
    alignRightCell: [
      null,
      'textAlign',
      'right',
    ],
    chngColDataType: [
      null,
      'dataType',
      null,
      useEventValOpts,
    ],
  };
  switch (true) {
    case tipo === 'etiqueta':
      component = (
        <Fade in={tipo === 'etiqueta'}>
          <Grid
            xs={12}
            item
            container
          >
            <Grid
              item
              xs={12}
            >
              <Grid
                item
                xs
              >

              </Grid>
              <Grid
                item
                xs
              >
                <TextField
                  label="Nombre de Etiqueta"
                  placeholder="Indique el nombre o ID de la etiqueta"
                  fullWidth
                  value={placeholder}
                  onChange={
                    handleUpdateComponentProp(
                      ...args.chngPlaceholder
                    )
                  }
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography
                variant="subtitle1"
                align="center"
              >
                Alineamientos de etiqueta
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              item
              xs={12}
              justify="center"
            >
              <Grid
                container
                item
                xs
                justify="center"
              >
                <Tooltip title="Alinear a la izquierda">
                  <IconButton
                    color={textAlign === 'left' ? 'secondary' : 'primary'}
                    onClick={
                      handleUpdateComponentProp(
                        ...args.alignLeft
                      )
                    }
                  >
                    <FormatAlignLeftIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid
                container
                item
                xs
                justify="center"
              >
                <Tooltip
                  title="Alinear al centro"
                >
                  <IconButton
                    color={textAlign === 'center' ? 'secondary' : 'primary'}
                    onClick={
                      handleUpdateComponentProp(
                        ...args.alignCenter,
                      )
                    }
                  >
                    <FormatAlignCenterIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid
                container
                item
                xs
                justify="center"
              >
                <Tooltip
                  title="Alinear a la derecha"
                >
                  <IconButton
                    color={textAlign === 'right' ? 'secondary' : 'primary'}
                    onClick={
                      handleUpdateComponentProp(
                        ...args.alignRight,
                      )
                    }
                  >
                    <FormatAlignRightIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      )
      break;
    case tipo === 'textocorto' || tipo === 'textolargo':
      component = (
        <Fade in={tipo === 'textocorto' || tipo === 'textolargo'}>
          <Grid
            item
            container
            xs={12}
            direction="column"
            spacing={16}
          >
            <TextField
              label="Nombre del campo"
              placeholder="Indique el nombre de la caja de texto"
              fullWidth
              value={placeholder}
              onChange={
                handleUpdateComponentProp(
                  ...args.chngPlaceholder,
                )
              }
              margin="normal"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={requerido}
                  onChange={
                    handleUpdateComponentProp(
                      ...args.chngRequired,
                    )
                  }
                  color="secondary"
                  value={requerido}
                />
              }
              label="Requerido"
            />
            <RadioGroup
              aria-label="Tipo de datos"
              onChange={
                handleUpdateComponentProp(
                  ...args.chngDataType,
                )
              }
              value={dataType}
              style={{
                marginTop: 16,
              }}
            >
              <FormLabel
              >
                Tipo de datos
              </FormLabel>
              <FormControlLabel
                value="text"
                control={
                  <Radio
                    color="secondary"
                  />
                }
                label="Texto"
              />
              <FormControlLabel
                value="number"
                control={
                  <Radio
                    color="secondary"    
                  />
                }
                label="Número"
              />
              <FormControlLabel
                value="alphanumeric"
                control={
                  <Radio
                    color="secondary"
                  />
                }
                label="Alfanumérico"
              />
            </RadioGroup>
            <TextField
              label="Mínimo"
              placeholder="Indique el mínimo numero de letras aceptables"
              fullWidth
              InputProps={{
                classes: {
                  focused: classes.focusedInputs,
                  root: classes.rootInpLength,
                },
              }}
              value={longitudMinima}
              onChange={
                handleUpdateMinMaxLengths(
                  ...args.chngMinLength
                )
              }
              
            />
            <TextField
              label="Máximo"
              placeholder="Indique el máximo número de letras aceptables"
              fullWidth
              InputProps={{
                classes: {
                  focused: classes.focusedInputs,
                  root: classes.rootInpLength,
                },
              }}
              value={longitudMaxima}
              onChange={
                handleUpdateMinMaxLengths(
                  ...args.chngMaxLength
                )
              }
            />
          </Grid>
        </Fade>
      );
      break;
    case tipo === 'tabla': {
      component = (
        <Fade in={tipo === 'tabla'}>
          <Grid
            xs={12}
            item
            container
          >
            <Grid
              item
              xs={12}
            >
              <Grid
                item
                xs
              >
                <TextField
                  label="Nombre de la columna"
                  placeholder="Indique el nombre de la celda"
                  fullWidth
                  value={cllPlaceholder}
                  onChange={
                    handleUpdateComponentCellProp(
                      null,
                      'placeholder',
                      null,
                      useEventValOpts,
                    )
                  }
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography
                variant="subtitle1"
                align="center"
              >
                Alineamientos de celda
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              item
              xs={12}
              justify="center"
            >
              <Grid
                container
                item
                xs
                justify="center"
              >
                <Tooltip title="Alinear a la izquierda">
                  <IconButton
                    color={tableCell.textAlign === 'left' ? 'secondary' : 'primary'}
                    onClick={
                      handleUpdateComponentCellProp(
                        ...args.alignLeftCell
                      )
                    }
                  >
                    <FormatAlignLeftIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid
                container
                item
                xs
                justify="center"
              >
                <Tooltip
                  title="Alinear al centro"
                >
                  <IconButton
                    color={tableCell.textAlign === 'center' ? 'secondary' : 'primary'}
                    onClick={
                      handleUpdateComponentCellProp(
                        ...args.alignCenterCell,
                      )
                    }
                  >
                    <FormatAlignCenterIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid
                container
                item
                xs
                justify="center"
              >
                <Tooltip
                  title="Alinear a la derecha"
                >
                  <IconButton
                    color={tableCell.textAlign === 'right' ? 'secondary' : 'primary'}
                    onClick={
                      handleUpdateComponentCellProp(
                        ...args.alignRightCell,
                      )
                    }
                  >
                    <FormatAlignRightIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              item
              xs={12}
              justify="center"
            >
              <Divider />
              <RadioGroup
                aria-label="Tipo de datos"
                style={{
                  marginTop: 16,
                }}
              >
                <FormControlLabel
                  label="Texto"
                  control={
                    <Radio
                      value="text"
                      color="secondary"
                      checked={tableCell.dataType === 'text'}
                      onChange={
                        handleUpdateComponentCellProp(
                          null,
                          'dataType',
                          null,
                          useEventValOpts,
                        )
                      }
                    />
                  }
                />
                <FormControlLabel
                  label="Número"
                  control={
                    <Radio
                      value="number"
                      color="secondary"
                      checked={tableCell.dataType === 'number'}
                      onChange={
                        handleUpdateComponentCellProp(
                          null,
                          'dataType',
                          null,
                          useEventValOpts,
                        )
                      }
                    />
                  }
                />
                {tableCell.dataType === 'number' && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="autoincrement"
                        color="secondary"
                        style={{ marginLeft: `${8*3}px` }}
                        onChange={
                          handleUpdateComponentCellProp(
                            null,
                            'autoincrement',
                            null,
                            useEventCheckedOpts,
                          )
                        }
                        checked={tableCell.autoincrement}
                      />
                    }
                    label="Autoincremental"
                  />
                )}
                <FormControlLabel
                  label="Lista de selección"
                  control={
                    <Radio
                      color="secondary"
                      value="dropdown"
                      checked={tableCell.dataType === 'dropdown'}
                      onChange={
                        handleUpdateComponentCellProp(
                          null,
                          'dataType',
                          null,
                          useEventValOpts,
                        )
                      }
                    />
                  }
                />
                {tableCell.dataType === 'dropdown' && (
                  <Grid
                    container
                    justify="center"
                    direction="column"
                  >
                    <List
                      dense
                      style={{
                        maxHeight: '72px',
                        overflowY: 'auto',
                        boxShadow: tableCell.options.length > 0 ?
                          '0px 5px 5px -3px rgba(0,0,0,0.2) inset' : '',
                      }}
                    >
                      {tableCell.options.map((opt, i) =>
                        <ListItem
                          dense
                          key={opt.id}
                        >
                          <ListItemText>
                            {opt.label}
                          </ListItemText>
                          <ListItemIcon>
                            <IconButton
                              onClick={deleteCellSelectOpt(i)}
                            >
                              <Icon>{opt.icon}</Icon>
                            </IconButton>
                          </ListItemIcon>
                        </ListItem>
                      )}
                    </List>
                    <TextField
                      placeholder="Nombre de la opcion"
                      value={tableCell.optionsText}
                      fullWidth
                      onChange={handleAddCellOptions}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddOptions}
                      disabled={
                        tableCell.optionsText.length === 0
                        || tableCell.options.length >= 10
                      }
                      style={{
                        fontSize: 12,
                        marginTop: '8px',
                      }}
                    >
                      Agregar
                    </Button>
                  </Grid>
                )}
                <FormControlLabel
                  label="Casilla de verificacion"
                  control={
                    <Radio
                      color="secondary"
                      value="boolean"
                      onChange={
                        handleUpdateComponentCellProp(
                          null,
                          'dataType',
                          null,
                          useEventValOpts,
                        )
                      }
                      checked={tableCell.dataType === 'boolean'}
                    />
                  }
                />
                <FormControlLabel
                  label="Evidencia"
                  control={
                    <Radio
                      value="file"
                      color="secondary"
                      onChange={
                        handleUpdateComponentCellProp(
                          null,
                          'dataType',
                          null,
                          useEventValOpts,
                        )
                      }
                      checked={tableCell.dataType === 'file'}
                    />
                  }
                />
                {tableCell.dataType === 'file' && (
                  <Grid
                    container
                    item
                    style={{
                      marginLeft: 8,
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      container
                      direction="column"
                    >
                      <FormLabel>
                        Tipos de archivos
                      </FormLabel>
                      <TextField
                        select
                        margin="normal"
                        value={tableCell.fileType}
                        onChange={
                          handleUpdateComponentCellProp(
                            null,
                            'fileType',
                            null,
                            useEventValOpts,
                          )
                        }
                      >
                        <MenuItem value="">
                          Seleccione un tipo
                        </MenuItem>
                        <MenuItem value="pdf">PDF</MenuItem>                      
                        <MenuItem value="jpg">JPG</MenuItem>
                        <MenuItem value="jpeg">JPEG</MenuItem>
                        <MenuItem value="png">PNG</MenuItem>
                        <MenuItem value="xls">XLS</MenuItem>
                      </TextField>
                      <TextField
                        label="Número de archivos"
                        value={tableCell.fileLimit}
                        onChange={
                          handleUpdateComponentCellProp(
                            null,
                            'fileLimit',
                            null,
                            {
                              useEventInputValue: true,
                              filterType: 'number',
                            },
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                )}
              </RadioGroup>
            </Grid>
          </Grid>
        </Fade>
      )
      break;
    }
    case tipo === 'archivo': {
      component = (
        <Fade in={tipo === 'archivo'}>
          <Grid
            container
            item
            style={{
              marginLeft: 8,
            }}
          >
            <Grid
              item
              xs={12}
              container
              direction="column"
            >
              <FormLabel>
                Tipos de archivos
              </FormLabel>
              <TextField
                select
                margin="normal"
                value={fileType}
                SelectProps={{
                  displayEmpty: true,
                }}
                onChange={
                  handleUpdateComponentProp(
                    null,
                    'fileType',
                    null,
                    useEventValOpts,
                  )
                }
              >
                <MenuItem value="">
                  Seleccione un tipo
                </MenuItem>
                <MenuItem value="pdf">PDF</MenuItem>                      
                <MenuItem value="jpg">JPG</MenuItem>
                <MenuItem value="jpeg">JPEG</MenuItem>
                <MenuItem value="png">PNG</MenuItem>
                <MenuItem value="xls">XLS</MenuItem>
              </TextField>
              <TextField
                label="Número de archivos"
                type="number"
                value={fileLimit}
                onChange={
                  handleUpdateComponentProp(
                    null,
                    'fileLimit',
                    null,
                    {
                      useEventInputValue: true,
                      filterType: 'number',
                    },
                  )
                }
                // endAdornment=
              />
            </Grid>
          </Grid>
        </Fade>
      );
      break;
    }
    default:
      component = null;
  }
  return tipo.length > 0 && (
    <Grid
      item
      container
      xs
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Paper
        style={{
          flexGrow: 1,
          padding: 16,
          maxHeight: '512px',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        <Typography
          variant="h6"
          align="center"
        >
          Propiedades
        </Typography>
        {component}
      </Paper>
    </Grid>
  );
}

/* TYPE DEFINITIONS */

const errorType = T.shape({
  required: T.string,
  longitudMinima: T.string,
  longitudMaxima: T.string,
});

const optinosType = T.arrayOf(
  T.shape({
    id: T.string,
    valor: T.string,
    label: T.string,
    icon: T.string,
  })
);

const componentTemplateType = T.shape({
  tipo: T.oneOf([
    'textocorto',
    'textolargo',
    'etiqueta',
    'tabla',
    'archivo',
    '',
  ]),
  nomCampo: T.string,
  componentId: T.string,
  label: T.string,
  dataType: T.string,
  textAlign: T.string,
  placeholder: T.string,
  value: T.string,
  requerido: T.bool,
  longitudMinima: T.string,
  longitudMaxima: T.string,
  icon: T.string,
  errors: errorType,
  opciones: optinosType,
  files: [],
});


PanelPropiedades.propTypes = {
  onCheckRequired: T.func,
  checkedRequired: T.bool,
  onChangeDataType: T.func,
  classes: T.object,
  showTypesFor: componentTemplateType,
};

PanelPropiedades.defaultProps = {
  onCheckRequired: noop,
  checkedRequired: false,
  onChangeDataType: noop,
  showTypesFor: {
    id: '',
    nomCampo: '',
    componentId: '',
    tipo: '',
    label: '',
    dataType: '',
    textAlign: '',
    placeholder: '',
    value: '',
    requerido: false,
    longitudMinima: '',
    longitudMaxima: '',
    icon: '',
    errors: {
      required: '',
      longitudMinima: '',
      longitudMaxima: '',
    },
    tableCols: [],
    tableRows: [],
    opciones: [],
    files: [],
  },
}

export default compose(
  withNotifier,
  withStyles(STYLES),
  withTheme(),
)(PanelPropiedades);
