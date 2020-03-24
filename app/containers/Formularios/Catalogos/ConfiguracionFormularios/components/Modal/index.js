/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
import { Modal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ComboMultiple from 'components/FiltroSeleccion';
import BotonSuccess from "../../../../../../components/BotonSuccess";
import BotonCancelar from "../../../../../../components/BotonCancelar";
import Tabla from '../../../../../../components/DataTable';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

// eslint-disable-next-line react/prefer-stateless-function
export class ModalUsuarios extends React.Component {

  render() {
    const {
      disabled,
      usuarios,
      modal,
      closeModalAction,
      onChangeCombo,
      valor,
      classes,
      datos,
      deleteRowAction,
      onAgregar,
    } = this.props;

    const cabecera = [
      {
        name: 'IdAsignacion',
        label: 'ID',
      },
      {
        name: 'Nombre',
        label: 'Usuario',
      },
      {
        name: 'Plaza',
        label: 'Plaza',
      },
      {
        name: 'Departamento',
        label: 'Departamento',
      },
      {
        name: 'Puesto',
        label: 'Puesto',
        options: {
          setCellProps: () => ({ 
            style: { 
              textAlign: 'left', 
              padding: 8, 
              width: '25%', 
            }, 
          }),
        },
      },
      {
        name: 'options',
        label: [],
      },
    ]

    const configuracion = {
      filtro : false,
      descarga : false,
      columnas : false,
      imprimir : false,
      ordenar: false,
      seleccionable: 'none',
      registrosPorPagina: 10,
    }
    
    const filteredUsers =  usuarios;
    const filteredUsers2 =  datos.length === 0 ? filteredUsers : filteredUsers.filter(fu => !datos.map(dato => dato.UsuarioId).includes(fu.UsuarioId))

    return (
      <Modal
        open={modal.value}
        onClose={closeModalAction}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <div style={{overflow: 'hidden'}}>
            <div style={{width: '50%', float: 'left'}}>
              <ComboMultiple
                inhabilitado={disabled}
                valor={valor}
                onChange={onChangeCombo}
                opciones={filteredUsers2}
                campoValido
                requerido
                label="Selecciona usuario"
                indice={0}
              />
            </div>
            <div style={{width: '50%', float: 'left'}}>
              <div style={{marginLeft: 30, marginTop: 15}}>
                <BotonSuccess
                  label='Agregar'
                  onClick={onAgregar}
                />
              </div>
            </div>
          </div>

          <Tabla
            data={datos}
            headers = {cabecera}
            configuracion = {configuracion}
            idPosition = "IdAsignacion"
            admin
            opciones = {
              [
                {'icon' : 'eliminar', 'action' : deleteRowAction},
              ]
            }
            elevacion={0}
            small = {0}
          />

          <div style={{float: 'right'}}>
            <BotonSuccess
              label='Guardar'
              onClick={closeModalAction}
            />
          </div>
          <div style={{float: 'right', marginRight: 15}}>
            <BotonCancelar
              label='Cerrar'
              onClick={closeModalAction}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

ModalUsuarios.propTypes = {
  modal: T.object,
  disabled: T.bool,
  usuarios: T.object,
  closeModalAction: T.func,
  onChangeCombo: T.func,
  valor: T.number,
  classes: T.object,
  datos: T.object,
  deleteRowAction: T.func,
  onAgregar: T.func,
};

const SimpleModalWrapped = withStyles(styles)(ModalUsuarios);

export default SimpleModalWrapped;
