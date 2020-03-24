import React from 'react';
import T from 'prop-types';
import TextField from '@material-ui/core/TextField';

/* eslint-disable react/prefer-stateless-function */
export class Input extends React.Component {


  render() {

    const {
      divSelecionado,
      index,
      tipo,
      titulo,
      onChangeTitle,
    } = this.props;
    return (
      <div style={{ ...this.props.style }}>
        <TextField
          label="Nombre del Campo"
          value={titulo}
          fullWidth
          type={tipo}
          onChange={({ target }) => onChangeTitle(target.value,index,divSelecionado)}
        />
      </div>
    );
  }
}

Input.propTypes = {
  style: T.oneOfType([T.string, T.object]),
  divSelecionado: T.number,
  index: T.number,
  tipo: T.string,
  titulo: T.string,
  onChangeTitle: T.func,
};

export default Input;
