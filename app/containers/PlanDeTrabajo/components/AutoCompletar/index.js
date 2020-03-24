
import React from 'react';
import T from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import CancelIcon from '@material-ui/icons/Cancel';
import Arrow from '@material-ui/icons/ArrowDropDown';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import {
  startCase,
} from 'lodash';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    paddingTop: 21,
    paddingBottom: 'initial',
    cursor: 'pointer',
  },
  deleteIcon:{
    height: '20px',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `0px ${theme.spacing.unit / 4}px ${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    height: '22px',
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 14,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    // marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    maxWidth: '500px',
  },
  divider: {
    height: theme.spacing.unit * 4,
    width: 10,
  },
});


function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      No se encontraron resultados
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function IndicatorSeparator() {
  return null;
}

// eslint-disable-next-line react/prop-types
function DropdownIndicator({ inputRef }) {
  return <div ref={inputRef} >
    <Arrow 
      style={
        {
          color: 'rgba(0, 0, 0, 0.54)',
        }
      }
    />
  </div>;
}

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;
  
  return (
    <TextField
      // required={props.selectProps.required}
      error={!props.selectProps.error}
      helperText={(props.selectProps.required && !props.selectProps.disabled)
        || (props.selectProps.requeridoDesactivo) ? '*Requerido' : ''}
      fullWidth
      disabled={props.selectProps.disabled}
      InputProps={{
        style: {
          marginTop: 'unset',
        },
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      style={
        {
          // eslint-disable-next-line no-nested-ternary
          color: !props.selectProps.error ? 'red' : (props.selectProps.disabled ? 'rgba(0, 0, 0, 0.38)' : 'grey'),
        }
      }
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  // eslint-disable-next-line react/prop-types
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      classes={{
        deleteIcon: props.selectProps.classes.deleteIcon,
      }}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      size='small'
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper style={{zIndex: 1000,maxWidth: '500px'}} square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  DropdownIndicator,
  IndicatorSeparator,
};

function FiltroSeleccion(props) {
  const {
    valor,
    opciones,
    onChange,
    label,
    indice,
    // campoValido,
    requerido,
    classes,
    theme,
    multiple,
    inhabilitado,
    requeridoDesactivo,
  } = props;

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    clearIndicator: base => ({
      ...base,
      padding: 'unset',
    }),
  };

  const arrOpciones = opciones.map(opcion => ({value:opcion.Id,label: startCase(opcion.Nombre)}))
const campoValido  = true
  return (
    <React.Fragment>
      <Select
        value={valor}
        onChange={onChange}
        options={arrOpciones}
        isMulti={multiple}
        isDisabled={inhabilitado}
        disabled={inhabilitado}
        components={components}
        error={campoValido}
        inputId={label}
        closeMenuOnSelect={!multiple}
        requerido
        campoValido
        indice={1}
        // TextFieldProps={
        //   {
        //     // label: valor ,
        //     InputLabelProps: {
        //       // htmlFor: valor,
        //       shrink: true,
        //       style: {
        //         fontSize: '32x',
        //       },
        //     },
            
        //   }
        // }
        required={false}
        isSearchable
        menuPortalTarget={document.body}
        classes={classes}
        styles={selectStyles}
        placeholder={opciones.length ? label : 'No hay información'}
      />
    </React.Fragment>
  );
}

FiltroSeleccion.propTypes = {
  valor: T.oneOfType([
    T.string,
    T.number,
    T.array,
    T.object,
  ]),
  multiple: T.bool,
  opciones: T.array,
  onChange: T.func,
  label: T.string,
  indice: T.number,
  classes: T.object,
  theme: T.object,
  campoValido: T.bool,
  requerido: T.bool,
  inhabilitado: T.bool,
  requeridoDesactivo: T.bool,
};

export default withStyles(styles, { withTheme: true })(FiltroSeleccion);

