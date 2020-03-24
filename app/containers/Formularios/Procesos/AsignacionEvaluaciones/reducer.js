/* eslint-disable object-shorthand */
/* eslint-disable no-else-return */
/*
 *
 * Transformacion reducer
 *
 */

import { fromJS, List } from 'immutable';
import { isNull } from 'util';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  NUEVA_ASIGNACION,
  REGRESAR,
  SET_PERMISOS,
  AGREGAR_PREGUNTA,
  SET_DATOS_GENERALES,
  SET_ASIGNACION_DETALLE,
  ON_INPUT_CHANGE,
  ON_CHANGE_COMBO,
  AGREGAR_REGISTRO,
  ASIGNAR_USUARIOS,
  REGRESAR_NUEVO,
  ON_INPUT_CHANGE_USUARIO,
  ON_CHANGE_COMBO_USUARIO,
  ON_CHANGE_PUESTOS,
  AGREGAR_REGISTRO_USUARIO,
  SET_USUARIOS_SELECCIONADOS,
  SET_USUARIOS_SELECCIONADOS_USUARIOS,
  ON_CHANGE_PUESTOS_USUARIO,
  REMOVE_ROW,
  REMOVE_ROW_USUARIOS,
  ON_CHANGE_DEPARTAMENTOS,
  SHOW_COLLAPSE,
  CLOSE_MODAL,
} = Actions.getConstants();

function asignacionEvaluacionesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:{
      return state;
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case SET_DATOS_GENERALES: {
      const {
        formularios,
        asignaciones,
        departamentos,
        puestos,
        usuarios,
      } = action.datosGenerales
      
      return state.setIn(['asignacionTabla', 'datos'], fromJS(asignaciones))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'formularios'], fromJS(formularios))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'departamentos'], fromJS(departamentos))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'puestos'], List(puestos))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'usuarios'], List(usuarios))
    }
    case REGRESAR: {

      const usuarios = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'usuarios']).toJS()
      const puestos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'puestos']).toJS()
      const formularios = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'formularios']).toJS()
      const departamentos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'departamentos']).toJS()

      const disabled = {
        agregar: true,
        guardar: true,
      }

      const modal = {
        value: false,
        stepper: 0,
        text: '',
        options: 'Select',
      }
    
      const nuevaAsignacion = {
        tipoFormulario: '',
        stepper: 0,
        campos: {
          descripcion: {
            valor: '',
            campoValido: true,
            disabled: false,
          },
          formulario: {
            valor: '',
            campoValido: true,
            disabled: false,
          },
          fechaInicio: {
            valor: null,
            campoValido: true,
            disabled: false,
          },
          fechaFinal: {
            valor: null,
            campoValido: true,
            disabled: false,
          },
          departamentosSlc: {
            valor: [],
            campoValido: true,
            disabled: false,
          },
          puestosSlc: {
            valor: [],
            campoValido: true,
            disabled: false,
          },
          usuario: {
            valor: '',
            campoValido: true,
            disabled: false,
          },
        },
        combos: {
          formularios: formularios,
          departamentos: departamentos,
          puestos: puestos,
          usuarios: usuarios,
        },
        tablas: {
          asignaciones: {
            seleccionados: [],
            datos: [],
          },
        },
      }
      
      return state.setIn(['asignacionTabla', 'nuevaAsignacion'], fromJS(nuevaAsignacion))
        .setIn(['asignacionTabla', 'disabled'], fromJS(disabled))
        .setIn(['asignacionTabla', 'stepper'], 0)
        .setIn(['asignacionTabla', 'idAsignacion'], '')
        .setIn(['asignacionTabla', 'update'], false)
        .setIn(['asignacionTabla', 'modal'], fromJS(modal))
        .setIn(['asignacionTabla', 'NombreUsuario'], '')

    }
    case NUEVA_ASIGNACION: {
      return state.setIn(['asignacionTabla', 'stepper'], 1)
    }
    case SET_ASIGNACION_DETALLE: {
      return state.setIn(['asignacionTabla', 'stepper'], 1)
        .setIn(['asignacionTabla', 'update'], true)
        .setIn(['asignacionTabla', 'idAsignacion'], action.idAsignacion)
        .setIn(['asignacionTabla', 'nuevaAsignacion'], fromJS(action.data));
    }
    case ON_INPUT_CHANGE: {
      const {
        campo,
        valor,
      } = action;

      let id;
      switch (campo) {
        case 1: {
          id = 'descripcion';
          break;
        }
        case 2: {
          id = 'formulario';
          break;
        }
        case 3: {
          id = 'fechaInicio';
          break;
        }
        case 4: {
          id = 'fechaFinal';
          break;
        }
        case 7: {
          id = 'usuario';
          break;
        }
        default: {
          break;
        }
      }
      
      if (campo === 2) {
        return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'campos', id, 'valor'], fromJS(valor))
          .setIn(['asignacionTabla', 'nuevaAsignacion', 'tipoFormulario'], valor.referencia)
      }
      
      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'campos', id, 'valor'], valor)
    }
    case ON_CHANGE_COMBO: {
      const {
        index,
        seleccionado,
      } = action;

      if(index === 5){
        const arreglo = seleccionado || [];
        let lista = [];
        for (let i = 0; i < arreglo.length; i += 1) {
          lista.push(
            {
              seleccionado: false,
              ...seleccionado[i],
            }
          )
        }

        if(lista.filter(reg => reg.value === 0).length > 0) {
          lista = lista.filter(reg => reg.value === 0)
        }

        return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'campos', 'departamentosSlc', 'valor'], List(lista))
      } else {
        const arreglo = seleccionado || [];
        const lista = [];
        for (let i = 0; i < arreglo.length; i += 1) {
          lista.push(
            {
              seleccionado: false,
              ...seleccionado[i],
            }
          )
        }
        
        return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'campos', 'puestosSlc', 'valor'], List(lista))
      }
    }
    case AGREGAR_REGISTRO: {
      const asignaciones = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos']).toJS()
      const campos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'campos']).toJS()
      const usuarios = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'usuarios']).toJS()
      const departamentos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'departamentos']).toJS()
      const puestos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'puestos']).toJS()

      const usuario = usuarios.filter(user => user.UsuarioId === campos.usuario.valor.UsuarioId)[0]
      const departamento = departamentos.filter(depto => depto.value === usuario.IdDepartamento)[0]
      const puesto = puestos.filter(psto => psto.value === usuario.IdPuesto)[0]
      
      const registro = {
        IdAsignacion : '',
        IdUsuario : usuario.UsuarioId,
        Usuario : usuario.Nombre,
        IdPlaza : usuario.IdPlaza,
        Plaza : usuario.Plaza,
        IdDepartamento : departamento.value,
        Departamento : departamento.label,
        IdPuesto : puesto.value,
        Puesto : puesto.label,
        Seleccionado: 1,
        info: true,
        update: false,
        Campos: {
          departamentosSlc: {
            valor: [],
            campoValido: true,
            disabled: false,
          },
          puestosSlc: {
            valor: [],
            campoValido: true,
            disabled: false,
          },
          usuario: {
            valor: '',
            campoValido: true,
            disabled: false,
          },
        },
        Tablas : {
          asignaciones: {
            seleccionados: [],
            datos: [],
          },
        },
      }
      asignaciones.push(registro)
      const seleccionados = []
      asignaciones.forEach((reg, index) => {
        reg.IdAsignacion = index + 1
        seleccionados.push(index)
      });

      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos'], fromJS(asignaciones))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'seleccionados'], fromJS(seleccionados))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'campos', 'usuario', 'valor'], '')
    }
    case ASIGNAR_USUARIOS: {
      const index = action.idAsignacion - 1;
      const asignaciones = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos']).toJS()
      const asignacion = asignaciones.filter(reg => reg.IdAsignacion === action.idAsignacion)[0]
      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'stepper'], 1)
        .setIn(['asignacionTabla', 'collapse'], false)
        .setIn(['asignacionTabla', 'asignacionSlc'], index)
        .setIn(['asignacionTabla', 'NombreUsuario'], asignacion.Usuario)
    }
    case REGRESAR_NUEVO: {
      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'stepper'], 0)
        .setIn(['asignacionTabla', 'collapse'], false)
    }
    case ON_INPUT_CHANGE_USUARIO: {
      const {
        valor,
      } = action;
      const asignacionSlc = state.getIn(['asignacionTabla', 'asignacionSlc'])

      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc , 'Campos', 'usuario', 'valor'], valor)
    }
    case ON_CHANGE_COMBO_USUARIO: {
      const {
        index,
        seleccionado,
      } = action;

      const asignacionSlc = state.getIn(['asignacionTabla', 'asignacionSlc'])
      
      if(index === 5){
        const arreglo = seleccionado || [];
        const lista = [];
        for (let i = 0; i < arreglo.length; i += 1) {
          lista.push(
            {
              seleccionado: false,
              ...seleccionado[i],
            }
          )
        }
        
        return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Campos', 'departamentosSlc', 'valor'], List(lista))
      } else {
        const arreglo = seleccionado || [];
        const lista = [];
        for (let i = 0; i < arreglo.length; i += 1) {
          lista.push(
            {
              seleccionado: false,
              ...seleccionado[i],
            }
          )
        }
        
        return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Campos', 'puestosSlc', 'valor'], List(lista))
      }
      
    }
    case AGREGAR_REGISTRO_USUARIO: {
      const asignacionSlc = state.getIn(['asignacionTabla', 'asignacionSlc'])

      const asignaciones = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'datos']).toJS()
      const campos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Campos']).toJS()
      const usuarios = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'usuarios']).toJS()
      const departamentos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'departamentos']).toJS()
      const puestos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'puestos']).toJS()

      const usuario = usuarios.filter(user => user.UsuarioId === campos.usuario.valor.UsuarioId)[0]
      const departamento = departamentos.filter(depto => depto.value === usuario.IdDepartamento)[0]
      const puesto = puestos.filter(psto => psto.value === usuario.IdPuesto)[0]
      
      const registro = {
        IdAsignacion : '',
        IdUsuario : usuario.UsuarioId,
        Usuario : usuario.Nombre,
        IdPlaza : usuario.IdPlaza,
        Plaza : usuario.Plaza,
        IdDepartamento : departamento.value,
        Departamento : departamento.label,
        IdPuesto : puesto.value,
        Puesto : puesto.label,
        Seleccionado: 1,
        update: false,
      }
      asignaciones.push(registro)
      const seleccionados = []

      asignaciones.forEach((reg, index) => {
        reg.IdAsignacion = index + 1
        seleccionados.push(index)
      });

      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'info'], false)
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'datos'], fromJS(asignaciones))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'seleccionados'], fromJS(seleccionados))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Campos', 'usuario', 'valor'], '')
    }
    case SET_USUARIOS_SELECCIONADOS: {

      const {
        seleccionados,
      } = action;
      const datosAsignaciones = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos']).toJS()
      const asignaciones = [...datosAsignaciones]
      asignaciones.forEach((asignacion,index) => {
        asignaciones[index].Seleccionado = 0
        asignaciones[index].info = false
      })
      
      seleccionados.forEach((row) => {
        asignaciones[row].Seleccionado = 1
        if (asignaciones[row].Seleccionado === 1 && asignaciones[row].Tablas.asignaciones.datos.length >= 0 && asignaciones[row].Tablas.asignaciones.seleccionados.length === 0){
          asignaciones[row].info = true
        } else {
          asignaciones[row].info = false
        }
      })
      
      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'seleccionados'], fromJS(seleccionados))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos'], fromJS(asignaciones))
    }
    case ON_CHANGE_PUESTOS_USUARIO: {
      const asignacionSlc = state.getIn(['asignacionTabla', 'asignacionSlc'])

      const asignaciones = [];
      const usuarios = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'usuarios']).toJS()
      const departamentos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'departamentos']).toJS()
      const puestos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'puestos']).toJS()

      const seleccionados = []

      action.seleccionado.forEach(seleccionado => {
        const usuariosSeleccionados = usuarios.filter(user => user.IdPuesto === seleccionado.value)
        usuariosSeleccionados.forEach(user => {
          const departamento = departamentos.filter(depto => depto.value === seleccionado.idDepartamento)[0]
          const puesto = puestos.filter(psto => psto.value === user.IdPuesto)[0]

          const registro = {
            IdAsignacion : '',
            IdUsuario : user.UsuarioId,
            Usuario : user.Nombre,
            IdPlaza : user.IdPlaza,
            Plaza : user.Plaza,
            IdDepartamento : departamento.value,
            Departamento : departamento.label,
            IdPuesto : puesto.value,
            Puesto : puesto.label,
            Seleccionado: 1,
            update: false,
          }
          asignaciones.push(registro)
        });
      });
      
      asignaciones.forEach((reg, index) => {
        reg.IdAsignacion = index + 1
        seleccionados.push(index)
      });

      const arreglo = action.seleccionado || [];
      const lista = [];
      for (let i = 0; i < arreglo.length; i += 1) {
        lista.push(
          {
            seleccionado: false,
            ...action.seleccionado[i],
          }
        )
      }

      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'info'], false)
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'datos'], fromJS(asignaciones))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'seleccionados'], fromJS(seleccionados))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Campos', 'puestosSlc', 'valor'], List(lista))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Campos', 'usuario', 'valor'], '')
    }
    case ON_CHANGE_DEPARTAMENTOS: {
      const asignaciones = [];
      const usuarios = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'usuarios']).toJS()
      const departamentos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'departamentos']).toJS()
      const puestos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'puestos']).toJS()
      const seleccionados = []
      
      if(isNull(action.seleccionado)) {
        action.seleccionado = []
      }
      
      action.seleccionado.forEach(seleccionado => {
        let usuariosSeleccionados

        if(seleccionado.value === -1) {
          usuariosSeleccionados = usuarios
        } else {
          usuariosSeleccionados = usuarios.filter(user => user.IdDepartamento === seleccionado.value)
        }

        usuariosSeleccionados.forEach(user => {
          const departamento = departamentos.filter(depto => depto.value === user.IdDepartamento)[0]
          const puesto = puestos.filter(psto => psto.value === user.IdPuesto)[0]

          const registro = {
            IdAsignacion : '',
            IdUsuario : user.UsuarioId,
            Usuario : user.Nombre,
            IdPlaza : user.IdPlaza,
            Plaza : user.Plaza,
            IdDepartamento : departamento.value,
            Departamento : departamento.label,
            IdPuesto : puesto.value,
            Puesto : puesto.label,
            Seleccionado: 1,
            info: true,
            update: false,
            Campos: {
              departamentosSlc: {
                valor: [],
                campoValido: true,
                disabled: false,
              },
              puestosSlc: {
                valor: [],
                campoValido: true,
                disabled: false,
              },
              usuario: {
                valor: '',
                campoValido: true,
                disabled: false,
              },
            },
            Tablas : {
              asignaciones: {
                seleccionados: [],
                datos: [],
              },
            },
          }

          asignaciones.push(registro)
        });
      });
      
      asignaciones.forEach((reg, index) => {
        reg.IdAsignacion = index + 1
        seleccionados.push(index)
      });
      
      const arreglo = action.seleccionado || [];
      const lista = [];
      for (let i = 0; i < arreglo.length; i += 1) {
        lista.push(
          {
            seleccionado: false,
            ...action.seleccionado[i],
          }
        )
      }
      
      let asignacionesFilter = [];

      if(action.seleccionado.length > 0) {
        if(action.seleccionado[0].value === -1) {
          asignacionesFilter = asignaciones;
        } else {
          asignacionesFilter = asignaciones.filter(el => lista.some(elem => elem.value === el.IdDepartamento));
        }
      } else {
        asignacionesFilter = asignaciones.filter(el => lista.some(elem => elem.value === el.IdDepartamento));
      }
      
      const puestosFilter = puestos.filter(el => action.seleccionado.some(elem => elem.value === el.idDepartamento))

      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos'], fromJS(asignaciones))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'seleccionados'], fromJS(seleccionados))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos'], fromJS(asignacionesFilter))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'campos', 'departamentosSlc', 'valor'], List(lista))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'campos', 'puestosSlc', 'valor'], List(puestosFilter))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'campos', 'usuario', 'valor'], '')
    }
    case ON_CHANGE_PUESTOS: {
      const asignaciones = [];
      const usuarios = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'usuarios']).toJS()
      const departamentos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'departamentos']).toJS()
      const puestos = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'combos', 'puestos']).toJS()
      
      const seleccionados = []
      
      if(isNull(action.seleccionado)) {
        action.seleccionado = []
      }
      
      action.seleccionado.forEach(seleccionado => {
        let usuariosSeleccionados

        if(seleccionado.value === 0) {
          usuariosSeleccionados = usuarios
        } else {
          usuariosSeleccionados = usuarios.filter(user => user.IdPuesto === seleccionado.value)
        }

        usuariosSeleccionados.forEach(user => {
          const departamento = departamentos.filter(depto => depto.value === seleccionado.idDepartamento)[0]
          const puesto = puestos.filter(psto => psto.value === user.IdPuesto)[0]

          const registro = {
            IdAsignacion : '',
            IdUsuario : user.UsuarioId,
            Usuario : user.Nombre,
            IdPlaza : user.IdPlaza,
            Plaza : user.Plaza,
            IdDepartamento : departamento.value,
            Departamento : departamento.label,
            IdPuesto : puesto.value,
            Puesto : puesto.label,
            Seleccionado: 1,
            info: true,
            update: false,
            Campos: {
              departamentosSlc: {
                valor: [],
                campoValido: true,
                disabled: false,
              },
              puestosSlc: {
                valor: [],
                campoValido: true,
                disabled: false,
              },
              usuario: {
                valor: '',
                campoValido: true,
                disabled: false,
              },
            },
            Tablas : {
              asignaciones: {
                seleccionados: [],
                datos: [],
              },
            },
          }

          asignaciones.push(registro)
        });
      });
      
      asignaciones.forEach((reg, index) => {
        reg.IdAsignacion = index + 1
        seleccionados.push(index)
      });
      
      const arreglo = action.seleccionado || [];
      const lista = [];
      for (let i = 0; i < arreglo.length; i += 1) {
        lista.push(
          {
            seleccionado: false,
            ...action.seleccionado[i],
          }
        )
      }
      
      let asignacionesFilter = [];

      if(action.seleccionado.length > 0) {
        if(action.seleccionado[0].value === 0) {
          asignacionesFilter = asignaciones;
        } else {
          asignacionesFilter = asignaciones.filter(el => lista.some(elem => elem.value === el.IdPuesto));
        }
      } else {
        asignacionesFilter = asignaciones.filter(el => lista.some(elem => elem.value === el.IdPuesto));
      }

      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos'], fromJS(asignaciones))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'seleccionados'], fromJS(seleccionados))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos'], fromJS(asignacionesFilter))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'campos', 'puestosSlc', 'valor'], List(lista))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'campos', 'usuario', 'valor'], '')
    }
    case SET_USUARIOS_SELECCIONADOS_USUARIOS: {

      const {
        seleccionados,
      } = action;
      const asignacionSlc = state.getIn(['asignacionTabla', 'asignacionSlc'])

      const datosAsignaciones = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'datos']).toJS()
      const asignacionInd = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc]).toJS()
      const asignaciones = [...datosAsignaciones]
      asignaciones.forEach((asignacion,index) => {
        asignaciones[index].Seleccionado = 0
      })
      
      seleccionados.forEach((row) => {
        asignaciones[row].Seleccionado = 1
      })

      if (asignacionInd.Seleccionado && seleccionados.length > 0) {
        asignacionInd.info = false
      } else {
        asignacionInd.info = true
      }

      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc], fromJS(asignacionInd))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'seleccionados'], fromJS(seleccionados))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'datos'], fromJS(asignaciones))
    }
    case REMOVE_ROW_USUARIOS: {
      const asignacionSlc = state.getIn(['asignacionTabla', 'asignacionSlc'])
      const asignacionInd = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc]).toJS()      
      const rows = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'datos']).toJS()
      const seleccionados = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'seleccionados']).toJS()
      const {row} = action;
      const asignaciones = rows.filter((asignacion) => asignacion.IdAsignacion !== row);
      
      const filterSlc = seleccionados.filter(seleccionado => seleccionado !== seleccionados[seleccionados.length - 1])
      
      if (asignacionInd.Seleccionado && filterSlc.length > 0) {
        asignacionInd.info = false
      } else {
        asignacionInd.info = true
      }
      
      return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc], fromJS(asignacionInd))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'datos'], fromJS(asignaciones))
        .setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos', asignacionSlc, 'Tablas', 'asignaciones', 'seleccionados'], fromJS(filterSlc))

    }
    case CLOSE_MODAL: {
      return state.setIn(['asignacionTabla', 'modal', 'open'], false)
    }
    case REMOVE_ROW: {
      const rows = state.getIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos']).toJS()
      
      const {
        row,
        data,
        bandera,
      } = action;
      
      if (data[0].length === 0 || bandera) {
        const asignaciones = rows.filter((asignacion) => asignacion.IdAsignacion !== row);
        return state.setIn(['asignacionTabla', 'nuevaAsignacion', 'tablas', 'asignaciones', 'datos'], fromJS(asignaciones))
          .setIn(['asignacionTabla', 'modal', 'open'], false)
      }

      if(data[0].length > 0){
        return state.setIn(['asignacionTabla', 'modal', 'open'], true)
          .setIn(['asignacionTabla', 'IdRegistro'], row)
      }

      return state;
    }
    case SHOW_COLLAPSE: {
      const collapse = state.getIn(['asignacionTabla', 'collapse'])
      return state.setIn(['asignacionTabla', 'collapse'], !collapse)
    }
    default: {
      return state;
    } 
  }
}

export default asignacionEvaluacionesReducer;
