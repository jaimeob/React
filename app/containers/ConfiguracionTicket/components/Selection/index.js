import React from 'react';
import T from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { uniqueId, isFunction } from 'lodash';

export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const {
      onSelectChange,
      indice,
      reglaSeleccionada,
    } = this.props;
    return (
      <form display="flex" style={{ ...this.props.style }}>
        <FormControl fullWidth>
          <InputLabel htmlFor={this.props.id}>{this.props.titulo}</InputLabel>
          <Select
            
            name={this.props.nombre}
            value={this.props.value}
            id={this.props.id}
            placeholder={this.props.placeholder}
            onChange={(event) => onSelectChange(event,indice,reglaSeleccionada)}
            open={this.state.open}
            disabled={this.props.disabled}
            // onChange={this.props.onChangeTipo(indexId)}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
          >
            <MenuItem value="" disabled id={`opt_${this.props.id}_empty`}>
              Seleccione una opción
            </MenuItem>
            {this.props.data.map((item, index) => (
              <MenuItem
                value={item[this.props.valueKey] || { index }}
                id={`opt_${this.props.id}_${index}`}
                // eslint-disable-next-line react/no-array-index-key
                key={`item_${item.id}_${index}`}
              >
                {isFunction(this.props.formatText)
                  ? this.props.formatText(item)
                  : item[this.props.textKey]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

Input.propTypes = {
  data: T.array,
  id: T.string,
  formatText: T.func,
  onSelectChange: T.func,
  value: T.oneOfType([T.string, T.object, T.number]),
  style: T.object,
  nombre: T.string,
  placeholder: T.string,
  titulo: T.string,
  disabled: T.bool,
  valueKey: T.oneOfType([T.string, T.object, T.number]),
  textKey: T.string,
  indice:   T.number,
  reglaSeleccionada: T.number,
};

Input.defaultProps = {
  data: [],
  id: uniqueId('slc_'),
  value: '',
  textKey: '',
  valueKey: '',
  placeholder: 'Seleccione...',
  formatText: null,
};

Input.displayName = 'Input';

export default Input;
