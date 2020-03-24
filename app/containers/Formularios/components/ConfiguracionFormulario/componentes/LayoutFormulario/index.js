/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

// lodash
import get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';
import sortBy from 'lodash/sortBy';
// Icons 
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';

import CloudUploadIcon from '@material-ui/icons/CloudUpload'; // agrupador
import PowerInputIcon from '@material-ui/icons/PowerInput'; // agrupador
import ViewArrayIcon from '@material-ui/icons/ViewArray'; // agregar columna
import ViewDayIcon from '@material-ui/icons/ViewDay'; // agregar fila
import DeleteIcon from '@material-ui/icons/Delete'; // agrupador

// import { noop } from 'redux-saga/utils';
import {
  Grid,
  Typography,
  withStyles,
  InputBase,
  InputAdornment,
  IconButton,
  Input,
  Divider,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  TableBody,
  withTheme,
  Button,
  Checkbox,
  Select,
} from '@material-ui/core';
import {
  compose,
  withState,
  withHandlers,
} from 'recompose';
import {
  GridContainerGrow,
  GroupContainer,
  CustomHeaderCell,
} from './styledComponents';

const noop = () => undefined;

let DynamicCell = (props) => {
  const {
    col: {
      dataType,
      autoincrement,
      textAlign,
    },
    idxComp,
    idxRow,
    idxCol,
    actions: {
      handleChangeRowColData,
      onSetRowAnchorEl,
      // handleSelectCellTable,
    },
    row,
    classes,
  } = props;
  const {
    // dataType: cellRowDataType = '',
    valor: cellRowValue = '',
    id: cellRowId = '',
    options: cellRowOptions = [],
    textAlign: cellTextAlign = 'center',
  } = get(row, ['data', idxCol], {});
  
  switch (true) {
    case dataType === 'number' && autoincrement: {
      return (
        <TableCell
          align={textAlign}
          style={{
            fontSize: 12,
          }}
        >
          {idxRow + 1}
        </TableCell>
      )
    }
    case dataType === 'text':
      return (
        <TableCell
          align={textAlign}
          onContextMenu={onSetRowAnchorEl(idxComp, idxCol, idxRow)}
        >
          <InputBase
            placeholder="Escriba aqui"
            multiline
            value={cellRowValue}
            fullWidth
            style={{
              fontSize: 12,
            }}
            inputProps={{
              style: {
                textAlign: cellTextAlign,
              },
            }}
            onChange={
              handleChangeRowColData(
                idxComp,
                idxRow,
                idxCol,
                'valor',
                null,
                { useEventInputValue: true },
              )}
          />
        </TableCell>
      )
    case dataType === 'number':
      return (
        <TableCell
          align={textAlign}
          style={{
            fontSize: 12,
          }}
          onContextMenu={onSetRowAnchorEl(idxComp, idxCol, idxRow)}
        >
          <InputBase
            placeholder="Escriba aqui"
            multiline
            value={cellRowValue}
            onChange={
              handleChangeRowColData(
                idxComp,
                idxRow,
                idxCol,
                'valor',
                null,
                { useEventInputValue: true },
              )
            }
          />
        </TableCell>
      )
    case dataType === "boolean":
      return (
        <TableCell
          align={textAlign}
          onContextMenu={onSetRowAnchorEl(idxComp, idxCol, idxRow)}
        >
          <Checkbox
            value="realizado"
            color="secondary"
            onChange={
              handleChangeRowColData(
                idxComp,
                idxRow,
                idxCol,
                'valor',
                null,
                { useEventInputChecked: true },
              )
            }
            checked={Boolean(cellRowValue)}
          />
        </TableCell>
      )
    case dataType === 'dropdown':
      return (
        <TableCell
          align={textAlign}
          onContextMenu={onSetRowAnchorEl(idxComp, idxCol, idxRow)}
        >
          <Select
            name={`slect_${cellRowId}`} 
            value={cellRowValue}
            displayEmpty
            inputProps={{
              style: {
                fontSize: 12,
              },
            }}
            onChange={
              handleChangeRowColData(
                idxComp,
                idxRow,
                idxCol,
                'valor',
                null,
                { useEventInputValue: true },
              )
            }
          >
            <MenuItem
              value=""
              disabled
            >
              <ListItemText primary="Seleccione" />
            </MenuItem>
            {cellRowOptions.length > 0 ?
              cellRowOptions.map((opt, ixop) => 
                <MenuItem
                  key={`opts_${opt.id}_${ixop}`}
                  value={opt.valor}
                >
                  {opt.label}
                </MenuItem>
              ) : (
                <MenuItem
                  value=""
                  disabled
                >
                  Sin opciones configuradas.
                </MenuItem>
              )
            }
          </Select>
        </TableCell>
      )
    case dataType === 'file': {
      const labelId =
        `contained-button-file_${idxComp}_${idxCol}_${idxRow}`
      return (
        <TableCell
          align={textAlign}
          onContextMenu={onSetRowAnchorEl(idxComp, idxCol, idxRow)}
        >
          <input
            accept="image/*"
            style={{
              display: 'none',
            }}
            id={labelId}
            multiple
            type="file"
          />
          <label
            htmlFor="contained-button-file"
          >
            <IconButton
              className={classes.uploadButton}
            >
              <CloudUploadIcon />
            </IconButton>
          </label>
        </TableCell>
      )
    }
    default:
      return null;
  }
}
DynamicCell.propTypes = {
  row: T.object,
  col: T.shape({
    dataType: T.string,
    autoincrement: T.bool,
    textAlign: T.string,
  }),
  idxRow: T.number,
  idxCol: T.number,
  actions: T.shape({
    handleSelectCellTable: T.func,
  }),
}
DynamicCell.defaultProps = {
  row: {},
  col: T.shape({
    dataType: '',
    autoincrement: -1,
    textAlign: '',
  }),
  idxRow: -1,
  idxCol: -1,
  actions: T.shape({
    handleSelectCellTable: noop,
  }),
}

DynamicCell = compose(
  withStyles((theme) => ({
    uploadButton: {
      margin: theme.spacing.unit,
    },
  }))
)(DynamicCell)


const NotFoundedComponents = withStyles({
  root: {
    flexGrow: 1,
  },
})(({
  classes,
}) => (
  <div className={classes.root}>
    <Grid
      container
      item
      xs={12}
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <Typography variant="body2">
          Agregue componentes utilizando el panel lateral.
        </Typography>
      </Grid>
    </Grid>
  </div>
))

const TableCellMenu = (props) => {
  const {
    open,
    anchorEl,
    onClose,
    onSelectedOption,
    id,
    idx,
    disabledActions,
    actions: {
      handleDeleteComp,
    },
  } = props;
  
  const options = [
    {
      label: 'Agregar agrupador',
      value: 'add_group',
      disabled: false,
      icon: <PowerInputIcon />,
    },
    {
      label: 'Agregar nueva columna',
      value: 'add_column',
      disabled: disabledActions.addColumn,
      icon: <ViewArrayIcon />,
    },
    {
      label: 'Agregar nueva fila',
      value: 'add_row',
      disabled: disabledActions.addRow,
      icon: <ViewDayIcon />,
    },
  ];
  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      {options.map(option => (
        <MenuItem
          key={option.value}
          button
          onClick={onSelectedOption(option.value, idx, onClose)}
          disabled={option.disabled}
          style={{
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          <ListItemIcon>
            {option.icon}
          </ListItemIcon>
          <ListItemText>
            {option.label}
          </ListItemText>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem
        button
        onClick={handleDeleteComp(idx)}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText>
          Eliminar tabla
        </ListItemText>
      </MenuItem>
    </Menu>
  )
};

TableCellMenu.propTypes = {
  open: T.bool,
  anchorEl: T.any,
  onClose: T.func,
  onSelectedOption: T.func,
  id: T.string,
  idx: T.number,
  disabledActions: T.shape({
    addColumn: T.bool,
    addRow: T.bool,
    addGroup: T.bool,
  }),
  actions: T.shape({
    handleDeleteComp: T.func,
  }),
}

TableCellMenu.defaultProps = {
  open: false,
  anchorEl: null,
  onClose: noop,
  onSelectedOption: noop,
  id: uniqueId('lyu_mnu_'),
  idx: -1,
}


let ComponentLayout = (
  props,
) => {
  const {
    conf: {
      tipo = '',
      valor = null,
      idxOrder = -1,
      textAlign: align = 'left',
      placeholder = '',
      label = '',
      tableCols = [],
      tableRows = [],
      configured = false,
    },
    actions: {
      handleClickComponentLayout,
      handleDeleteComp,
      handleAddComp,
      handleUpdateComponentProp,
      handleSelectCellTable,
      handleSelectTableOption,
      handleChangeGroupText,
      handleChangeRowColData,
      handleUpdateComponentCellProp,
    },
    idx,
    onSetRowAnchorEl,
    onSetAnchorEl,
    anchorEl,
    rowAnchorEl,
    onCloseRowMenu,
    onCloseMenu,
    onDeleteColumn,
    onDeleteRow,
    coordinates,
    theme: {
      palette: {
        text: {
          secondary: secColor,
        },
        grey: {
          200: grey300,
        },
      },
    },
  } = props;

  const tableCellActions = {
    handleDeleteComp,
  };
  const maxColumnCells = 8;
  const isConfiguredTable = tableCols.length > 0 ?
    tableCols.every((col) => col.dataType.trim() !== '') : false;
  const disabledMenuActions = {
    addGroup: false,
    addRow: !isConfiguredTable,
    addColumn: tableCols.length + 1 > maxColumnCells,
  };
  const idu = idxOrder < 0
    ? uniqueId('id') : idxOrder;
  const customName = `${idx}_comp_${tipo}_idx_${idu}`;
  const containerName = `${idx}_div_${tipo}_idx_${idu}`;
  const useEventValOpts = {
    useEventInputValue: true,
  };
  const args = {
    setLabelValue: [
      null,
      'label',
      null,
      useEventValOpts,
    ],
    addComp: [
      { tipo },
      idx,
    ],
    delComp: [
      idx,
    ],
    textComp: [
      {
        tipo,
        valor: 'Texto corto',
      },
      idx,
    ],
  };
  // const menuTitlePath = idxCol >= 0
  function getMenuTitlePath(idxCom, idxCol, idxRow) {
    let titleMenu = '';
    if (idxCol >= 0 && idxRow < 0) {
      titleMenu = get(
        tableCols, [
          idxCol,
          'placeholder',
        ],
        ''
      );
      return titleMenu;
    }
    if (idxCol >= 0 && idxRow >= 0) {
      titleMenu = get(
        tableRows, [
          idxRow,
          'data',
          idxCol,
          'placeholder',
        ],
        ''
      )
      return titleMenu;
    }
    return titleMenu;
  }
  switch (true) {
    case tipo === 'etiqueta':
      return (
        <Grid
          item
          xs={12}
        >
          <GroupContainer
            onClick={handleClickComponentLayout}
            name={containerName}
            id={containerName}
            className="wrapper-container"
          >
            <InputBase
              value={label}
              name={customName}
              id={customName}
              fullWidth
              placeholder={placeholder}
              multiline
              inputProps={{
                style: {
                  textAlign: align,
                },
              }}
              onChange={
                handleUpdateComponentProp(
                  ...args.setLabelValue,
                )
              }
              endAdornment={
                <InputAdornment
                  position="end"
                  className={
                    `cls_actions_andorments andorment_${customName}`
                  }
                >
                  <IconButton
                    onClick={
                      handleAddComp(
                        ...args.addComp,
                      )
                    }
                    className="grp-acts"
                    style={{
                      padding: '4px',
                    }}
                  >
                    <AddCircleIcon
                      color="secondary"
                    />
                  </IconButton>
                  <IconButton
                    onClick={
                      handleDeleteComp(
                        ...args.delComp
                      )
                    }
                    className="grp-acts"
                    style={{
                      padding: '4px',
                    }}
                  >
                    <CancelIcon
                      color="error"
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </GroupContainer>
        </Grid>
      )
    case tipo === 'textocorto' || tipo === 'textolargo':
      return (
        <Grid
          item
          xs={12}
          sm={tipo === 'textocorto' ? 6 : 12}
        >
          <GroupContainer
            onClick={handleClickComponentLayout}
            name={containerName}
            id={containerName}
            className="wrapper-container"
          >
            <Input
              value={valor}
              name={customName}
              id={customName}
              placeholder={placeholder}
              onChange={
                handleUpdateComponentProp
              }
              fullWidth
              endAdornment={
                <InputAdornment
                  position="end"
                  className={`cls_actions_andorments andorment_${customName}`}
                >
                  <IconButton
                    className="grp-acts"
                    style={{
                      padding: '4px',
                    }}
                    onClick={handleAddComp(
                      ...args.textComp,
                    )}
                  >
                    <AddCircleIcon
                      color="secondary"
                    />
                  </IconButton>
                  <IconButton
                    onClick={handleDeleteComp(idx)}
                    className="grp-acts"
                    style={{
                      padding: '4px',
                    }}
                  >
                    <CancelIcon color="error" />
                  </IconButton> 
                </InputAdornment>
              }
            />
          </GroupContainer>
        </Grid>
      )
    case tipo === 'tabla': {
      return (
        <Grid
          container
          item
          style={{
            flexGrow: 1,
          }}
          xs={12}
        >
          <Grid
            container
            item
            xs={12}
            style={{
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
          >
            <div>
              <IconButton
                name="btn_add"
                onClick={onSetAnchorEl}
              >
                <AddIcon />
              </IconButton>
              <TableCellMenu
                id="custom_tbl_mnu"
                open={Boolean(anchorEl)}
                onSelectedOption={handleSelectTableOption}
                disabledActions={{
                  ...disabledMenuActions,
                  isConfiguredTable,
                }}
                actions={tableCellActions}
                onClose={onCloseMenu}
                anchorEl={anchorEl}
                idx={idx}
              />
            </div>
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Paper
              style={{
                width: '100%',
              }}
            >
              <Menu
                id={`tbl_cntx_menu_${idx}`}
                anchorEl={rowAnchorEl}
                open={Boolean(rowAnchorEl)}
                onClose={onCloseRowMenu}
              >
                <MenuItem disabled>
                  <ListItemText
                    secondary={
                      getMenuTitlePath(
                        coordinates.idxComp,
                        coordinates.idxCol,
                        coordinates.idxRow,
                      )
                    }
                  />
                </MenuItem>
                {
                  coordinates.idxCol >= 0 && 
                  <MenuItem
                    button
                    onClick={onDeleteColumn}
                  >
                    <ListItemText>
                      Eliminar Columna
                    </ListItemText>
                    <ListItemIcon>
                      <ViewArrayIcon />
                    </ListItemIcon>
                  </MenuItem>
                }
                {
                  coordinates.idxRow >= 0 && 
                  <MenuItem
                    button
                    onClick={onDeleteRow}
                  >
                    <ListItemText>
                      Eliminar Registro
                    </ListItemText>
                    <ListItemIcon>
                      <ViewDayIcon />
                    </ListItemIcon>
                  </MenuItem>
                }
              </Menu>
              <Table padding="none" >
                <TableHead>
                  <TableRow key="uniqueHeaderId" >
                    {tableCols.length > 0 && tableCols.map((col, idc) =>
                      <CustomHeaderCell
                        key={col.id}
                        onContextMenu={onSetRowAnchorEl(idx, idc)}
                        align="center"
                      >
                        <InputBase
                          multiline
                          placeholder={col.placeholder}
                          onChange={
                            handleUpdateComponentCellProp(
                              idc,
                              'label',
                              null,
                              useEventValOpts,
                            )
                          }
                          value={col.label}
                          inputProps={{
                            style: {
                              textAlign: col.textAlign,
                              fontSize: 12,
                              padding: '8px 0',
                            },
                          }}
                          fullWidth
                          onFocus={handleSelectCellTable(col, idx, idc)}
                        />
                      </CustomHeaderCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRows.length > 0 && tableRows.map((row, idxRow) => 
                    <TableRow
                      key={`tbl_row_${idxRow}`}
                      style={{
                        backgroundColor: row.isGroup ? grey300 : '',
                      }}
                    >
                      {row.isGroup && configured ? (
                        <TableCell
                          colSpan={tableCols.length}
                          // onContextMenu={onSetRowAnchorEl(idx, null, idxRow)}
                        >
                          <InputBase
                            placeholder={label}
                            value={row.groupText}
                            multiline
                            fullWidth
                            className={row.groupId}
                            inputProps={{
                              style: {
                                color: secColor,
                                paddingLeft: '8px',
                                fontSize: 14,
                              },
                            }}
                            onChange={
                              handleChangeGroupText(
                                idx,
                                idxRow,
                              )
                            }
                          />
                        </TableCell>
                      ) : tableCols.map((col, idxCol) => 
                        <DynamicCell
                          key={`row.id_${idxCol}`}
                          row={row}
                          col={col}
                          idxComp={idx}
                          idxCol={idxCol}
                          idxRow={idxRow}
                          actions={{
                            handleSelectCellTable,
                            handleChangeRowColData,
                            onDeleteColumn,
                            onSetRowAnchorEl,
                            onDeleteRow,
                          }}
                        />
                      )}
                    </TableRow>  
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      )
    }
    case tipo === 'archivo': {
      return (
        <Grid
          item
          xs={12}
          sm={6}
        >
          <GroupContainer
            onClick={handleClickComponentLayout}
            name={containerName}
            id={containerName}
            className="wrapper-container"
          >
            <Button
              name={customName}
              id={customName}
              variant="outlined"
              aria-label="Delete"
              component="div"
            >
              Subir Archivo
              <CloudUploadIcon
                style={{
                  marginLeft: 8,
                }}
              />
            </Button>            
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
              className={`cls_actions_andorments andorment_${customName}`}
            >
              <IconButton
                onClick={
                  handleAddComp(
                    ...args.addComp,
                  )
                }
                className="grp-acts"
                style={{
                  padding: '4px',
                  alignSelf: 'flex-end',
                }}
              >
                <AddCircleIcon
                  color="secondary"
                />
              </IconButton>
              <IconButton
                onClick={
                  handleDeleteComp(
                    ...args.delComp
                  )
                }
                className="grp-acts"
                style={{
                  padding: '4px',
                  alignSelf: 'flex-end',
                }}
              >
                <CancelIcon
                  color="error"
                />
              </IconButton>
            </div>
          </GroupContainer>
        </Grid>
      )
    }
    default:
      return null;
  }
}
ComponentLayout.propTypes = {
  conf: T.shape({
    tipo: T.string,
    value: T.any,
  }),
  actions: T.shape({
    textocorto: T.object,
    textolargo: T.object,
    handleSelectCellTable: T.func,
    handleClickComponentLayout: T.func,
    handleDeleteComp: T.func,
    handleAddComp: T.func,
    handleUpdateComponentProp: T.func,
    handleSelectTableOption: T.func,
    handleChangeGroupText: T.func,
    handleChangeRowColData: T.func,
    handleUpdateComponentCellProp: T.func,
  }),
  onDeleteColumn: T.func,
  onChangeComponent: T.func,
  onDeleteRow: T.func,
}
ComponentLayout.defaultProps = {
  conf: {},
  actions: {
    handleSelectCellTable: noop,
    handleClickComponentLayout: noop,
    handleDeleteComp: noop,
    handleAddComp: noop,
    handleUpdateComponentProp: noop,
    handleSelectTableOption: noop,
    handleChangeGroupText: noop,
    handleChangeRowColData: noop,
    handleUpdateComponentCellProp: noop,
  },
}

const defaultCoords = {
  idxComp: -1,
  idxCol: -1,
  idxRow: -1,
};

ComponentLayout = compose(
  withState('anchorEl', 'setAnchorEl', null),
  withState('rowAnchorEl', 'setRowAnchoEl', null),
  withState('coordinates', 'setCoordinates', defaultCoords),
  withHandlers({
    onDeleteRow: ({ setRowAnchoEl, coordinates, actions }) =>
      () => {
        const {
          idxComp,
          idxCol,
          idxRow,
        } = coordinates;
        const {
          handleDeleteRowColumn,
        } = actions;
        if (idxComp >= 0 && (idxCol >= 0 || idxRow >= 0)) {
          setRowAnchoEl(() => null);
          handleDeleteRowColumn(idxComp, null, idxRow)
        }
      },
    onDeleteColumn: ({ setRowAnchoEl, coordinates, actions }) =>
      () => {
        const {
          idxComp,
          idxCol,
          idxRow,
        } = coordinates;
        const {
          handleDeleteRowColumn,
        } = actions;
        if (idxComp >= 0 && (idxCol >= 0 || idxRow >= 0)) {
          setRowAnchoEl(() => null);
          handleDeleteRowColumn(idxComp, idxCol, null)
        }
      },
    onCloseRowMenu: ({ setRowAnchoEl, setCoordinates }) =>
      () => {
        setRowAnchoEl(() => null);
        setCoordinates((cords) => ({
          ...cords,
          idxComp: -1,
          idxCol: -1,
          idxRow: -1,
        }))
      },
    onSetRowAnchorEl: ({ setRowAnchoEl, setCoordinates }) =>
      (idxComp = -1, idxCol = -1, idxRow = -1) => 
        (event) => {
          const {
            currentTarget,
          } = event;
          event.preventDefault();
          setRowAnchoEl(() => currentTarget);
          setCoordinates((cords) => ({
            ...cords,
            idxComp,
            idxCol,
            idxRow,
          }))
        },
    onSetAnchorEl: ({ setAnchorEl }) =>
      (event) => {
        const {
          currentTarget,
        } = event;
        setAnchorEl(() => currentTarget)
      },
    onCloseMenu: ({ setAnchorEl }) => 
      () => {
        setAnchorEl(() => null)
      },  
  }),
  withTheme(),
)(ComponentLayout);

// eslint-disable-next-line no-unused-vars
export function LayoutFormulario(props) {
  const {
    components,
    layoutActions,
  } = props;
  return (
    <GridContainerGrow
      container
      xs={12}
      item
    >
      {components.length > 0 ?
        sortBy(components, ['order'])
          .map((cmp, idx) =>
            <ComponentLayout
              conf={cmp}
              key={`cmp_${cmp.id}_${idx}`}
              idx={idx}
              actions={layoutActions}
            />
          )
        : (
          <NotFoundedComponents />
        )
      }
    </GridContainerGrow>
  )
}

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
  valor: T.string,
  requerido: T.bool,
  longitudMinima: T.string,
  longitudMaxima: T.string,
  icon: T.string,
  opciones: T.arrayOf(
    T.shape({
      label: T.string,
      valor: T.any,
      icon: T.string,
    })
  ),
  files: [],
});

LayoutFormulario.propTypes = {
  components: T.arrayOf(componentTemplateType),
  layoutActions: T.shape({

  }),
}

LayoutFormulario.defaultProps = {
  components: [],
  layoutActions: {},
}

export default LayoutFormulario;
