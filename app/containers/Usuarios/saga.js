import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';

import {
  getPermisosFuncion,
} from 'containers/Roles/api';

import Actions from './actions';

import {
  getListado,
  setListadoActivar,
  setListadoDesactivar,
  getDownloadFile,
  getDownloadFiles,
  getEmpleados,
  getInfoEmpleado,
  getPlazas,
  getPuestos,
  getRoles,
  getDownloadedFile,
  getEmpresasPorRol,
  getConfiguracionRoles,
  getDetalleUsuario,
  postGuardarUsuario,
  postUploadFile,
  getDownloadFilesHistorial,
  countDownloadFiles,
} from './api';

export const {
  GET_LISTADO,
  SET_LISTADO_ACTIVAR,
  SET_LISTADO_DESACTIVAR,
  GET_DOWNLOAD_FILE,
  GET_DOWNLOAD_FILES,
  SET_LOADING,
  GET_EMPLEADOS,
  ON_CHANGE_EMPLEADO,
  GET_PLAZAS,
  ON_CLICK_ARCHIVO,
  GET_PUESTOS,
  ON_CHANGE_PUESTO,
  ON_CHANGE_ROL,
  ON_CLICK_VER_DETALLE,
  ON_CLICK_LISTA_DETALLE,
  ON_VER_DETALLE_USUARIO,
  ON_CLICK_GUARDAR,
  ON_CLICK_DESCARGAR_HISTORIAL,
  ON_CLICK_DESCARGAR_TODO_HISTORIAL,
} = Actions.getConstants();
// Individual exports for testing

export function* getListadoAction() {
  try {
    const {
      status,
      data = [],
    } = yield call(getListado);
    
    if(status === 200 ){
      if(data.length > 0)
      {
        yield put(
          Actions.get('SET_LISTADO').fn(data)
        );
        yield put(
          Actions.get('SET_LISTADO_FILTER').fn(data.filter((modulo) => modulo.Activo))
        );
      }
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al obtener los Usuarios',
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Usuarios',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setListadoActivarAction(params) {
  try {
    const {
      status,
    } = yield call(setListadoActivar, params.datos);
    if(status === 200){
      const { data = []} = yield call(getListado);
      yield put(
        Actions.get('SET_LISTADO').fn(data)
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(data.filter((modulo) => modulo.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al activar los Usuarios',
          options: {
            variant: 'error',
          },
        })
      );
    }
 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Usuarios',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* setListadoDesactivarAction(params) {
  try {
    const {
      status,
    } = yield call(setListadoDesactivar, params.datos)
    if(status === 200){
      const { data = []} = yield call(getListado);
      yield put(
        Actions.get('SET_LISTADO').fn(data)
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(data.filter((modulo) => modulo.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al desactivar los Usuarios',
          options: {
            variant: 'error',
          },
        })
      );
    }
 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al desactivar los Usuarios',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getDownloadFileAction(params) {
  try {
    const {
      status,
      data = [],
    } = yield call(getDownloadFile, params.datos);
    
    if(status === 200){

      const {
        status: statusDos,
        data: dataDos,
      } = yield call(countDownloadFiles, params.datos);
    
      if(statusDos === 200 && dataDos >= 1){
        const blob = new Blob([data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        if(dataDos === 1){
          link.setAttribute('download', 'Evidencia.pdf');
        } else if(dataDos > 1) {
          link.setAttribute('download', 'Evidencias.zip');
        }

        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else if (statusDos === 200 && dataDos === 0){
        yield put(
          enqueueSnackbar({
            message: 'El Usuario no cuenta con archivos',
            options: {
              variant: 'warning',
            },
          })
        );
      }

    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al descargar el archivo',
          options: {
            variant: 'error',
          },
        })
      );
    }
 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Puestos - Roles',
        options: {
          variant: 'error',
        },
      })
    );
  }
  yield put(
    Actions.get('SET_LOADING').fn(false)
  )
}

export function* getDownloadFilesAction(params) {
  try {
    const {
      status,
      data = [],
    } = yield call(getDownloadFiles, params.datos);
    
    if(status === 200){

      const {
        status: statusDos,
        data: dataDos,
      } = yield call(countDownloadFiles, params.datos);
    
      if(statusDos === 200 && dataDos >= 1){
        const blob = new Blob([data]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        if(dataDos === 1){
          link.setAttribute('download', 'Evidencia.pdf');
        } else if(dataDos > 1) {
          link.setAttribute('download', 'Evidencias.zip');
        }

        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else if (statusDos === 200 && dataDos === 0){
        yield put(
          enqueueSnackbar({
            message: 'El Usuario no cuenta con archivos',
            options: {
              variant: 'warning',
            },
          })
        );
      }

    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al descargar el archivo',
          options: {
            variant: 'error',
          },
        })
      );
    }
 
  } catch (error) {
    console.log(error);
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Usuarios',
        options: {
          variant: 'error',
        },
      })
    );
  }
  yield put(
    Actions.get('SET_LOADING').fn(false)
  )
}

export function* onChangeEmpleadoSaga(action) {
  try {
    
    const idEmpleado = action.valor.value;
    const {
      status,
      data = [],
    } = yield call(getInfoEmpleado, idEmpleado);
    
    if(status === 200){
      yield put(
        Actions.get('SET_INFO_EMPLEADOS').fn(data, action.valor)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener la información del empleado',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onChangePuestoSaga(action) {
  try {
    const idEmpleado = yield select(state => state.getIn(
      ['usuarios', 'registrar', 'parametros', 'empleado', 'valor', 'value']
    ))
    const {
      status,
      data = [],
    } = yield call(getRoles, action.valor, idEmpleado);
    
    if(status === 200){
      yield put(
        Actions.get('SET_ROLES').fn(data, action.valor)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener la información del empleado',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onClickArchivoSaga(action) {
  try {
    let archivo = yield select(
      state => state.getIn(
        ['usuarios', 'registrar', 'parametros', 'archivos', action.id]
      )
    )

    let url = '';
    let band = true;
    
    if(archivo.type){
      url = window.URL.createObjectURL(new Blob([archivo]));
    } else {
      archivo = archivo.toJS();
      const {
        status,
        data,
      } = yield call (getDownloadedFile, archivo.url);
      if(status === 200){
        url = window.URL.createObjectURL(new Blob([data]));
      } else {
        yield put(
          enqueueSnackbar({
            message: 'Hubo un error al descargar el archivo',
            options: {
              variant: 'error',
            },
          })
        )
        band = false;
      }
    }
    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', archivo.name);
      document.body.appendChild(link);
      link.click();
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al descargar el archivo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onClickDescargarHistorialSaga(action) {
  try {
    const archivo = yield select(
      state => state.getIn(
        ['usuarios', 'registrar', 'historial', 'datosHistorial', action.id]
      ).toJS()
    )

    let url = '';
    let band = true;
    
    const {
      status,
      data,
    } = yield call (getDownloadedFile, archivo.Ruta);
    if(status === 200){
      url = window.URL.createObjectURL(new Blob([data]));
    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al descargar el archivo',
          options: {
            variant: 'error',
          },
        })
      )
      band = false;
    }
    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', archivo.Nombre);
      document.body.appendChild(link);
      link.click();
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al descargar el archivo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getEmpleadosSaga() {
  try {
    const {
      status,
      data = [],
    } = yield call(getEmpleados);
    
    if(status === 200){
      yield put(
        Actions.get('SET_EMPLEADOS').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los empleados',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getPlazasSaga() {
  try {
    const {
      status,
      data = [],
    } = yield call(getPlazas);
    
    if(status === 200){
      yield put(
        Actions.get('SET_PLAZAS').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las plazas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getPuestosSaga() {
  try {
    const {
      status,
      data = [],
    } = yield call(getPuestos);
    
    if(status === 200){
      yield put(
        Actions.get('SET_PUESTOS').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las plazas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onChangeRolSaga(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getEmpresasPorRol, action.valor);
    
    if(status === 200){
      yield put(
        Actions.get('SET_EMPRESAS').fn(data, action.valor)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener las empresas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onClickListaDetalleSaga(action) {
  try {

    const idModulo = yield select(state => state.getIn(
      ['usuarios', 'registrar', 'parametros', 'rolDatos', action.id, 'value']
    ))
      
    const IdRolEmpresa = yield select(state => state.getIn(
      ['usuarios', 'registrar', 'parametros', 'idRolEmpresa']
    ))

    const datos = {
      idModulo,
      IdRol: 0,
      IdRolEmpresa,
    }
    
    const {
      status,
      data,
    } = yield call(
      getPermisosFuncion,
      datos,
    );
    
    if(status === 200){
      yield put(
        Actions.get('ON_CLICK_LISTA_DETALLE_OPCIONES').fn(action.id, data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el detalle',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onClickVerDetalleSaga(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(
      getConfiguracionRoles, 
      action.datos.IdRol,
      action.datos.datos[action.id].IdRolEmpresa
    );
    
    if(status === 200){
      yield put(
        Actions.get('SET_DETALLE_ROL').fn(action.datos, action.id, data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el detalle',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onVerDetalleUsuarioSaga(action) {
  try {
    
    const {
      status,
      data = [],
    } = yield call(getDetalleUsuario, action.id);
    
    if(status === 200){
      yield put(
        Actions.get('SET_DETALLE_USUARIO').fn(data)
      );
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el detalle',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onClickGuardarSaga() {
  try {
    const info = yield select(state => 
      state.getIn(
        ['usuarios', 'registrar', 'info']
      ).toJS()
    )

    const idUsuario = yield select(state => 
      state.getIn(
        ['usuarios', 'registrar', 'idUsuario']
      )
    )

    const parametros = yield select(state => 
      state.getIn(
        ['usuarios', 'registrar', 'parametros']
      ).toJS()
    )

    if((!idUsuario && info.correo.valor !== '' &&
      info.plaza.valor !== '' &&
      parametros.archivos.length > 0 &&
      parametros.idsSelecionados.length > 0) || (
      idUsuario && (info.plaza.valor !== info.plazaPrev || 
        parametros.idsSelecionados.length > 0)
    )
    ){

      const plazaTemporal = yield select(state => 
        state.getIn(
          ['usuarios', 'registrar', 'parametros', 'plazaTemporal']
        ).toJS()
      )
      
      const rolAdicional = yield select(state => 
        state.getIn(
          ['usuarios', 'registrar', 'parametros', 'rolAdicional']
        ).toJS()
      )
  
      const dominios = yield select(state => 
        state.getIn(
          ['usuarios', 'registrar', 'combos', 'dominios']
        ).toJS()
      )

      const archivos = yield select(state => 
        state.getIn(
          ['usuarios', 'registrar', 'parametros', 'archivos']
        ).toJS()
      )

      const Usuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));

      const formData = new FormData();
      formData.append('refId', 'generalesUsuario');

      for (let i = 0; i < archivos.length; i+=1) {
        if(archivos[i].size)
          formData.append('files', archivos[i], archivos[i].name);
      }

      const archivosD = [];

      const {
        status : estatusDos,
        data : file,
      } = yield call(postUploadFile, formData)

      if(estatusDos === 200){
        for (let k = 0; k < file.length; k+=1) {
          archivosD[k]= {
            ruta: file[k].url,
            nombre: file[k].name,
          };
        }
      }
      
      const datos = {
        Usuario,
        idUsuario,
        nomEmpleado: parametros.empleado.valor.label,
        noEmpleado: parametros.empleado.valor.value,
        enKontrol: parametros.enkontrol.valor,
        correo: `${info.correo.valor}@${dominios[info.dominio].Nombre}`,
        usuarioDominio: info.usuarioDominio,
        idPlaza: info.plaza.valor,
        archivos: archivosD,
        rolesEmpresa: parametros.idsSelecionados,
        plazaTemporal: {
          idPlaza: plazaTemporal.plazaTemp.valor || null,
          fechaInicio: plazaTemporal.fecInicio || null,
          fechaFin: plazaTemporal.fecFin || null,
          ruta: '',
          nombre: '',
        },
        rolAdicional: {
          idRolEmpresa: rolAdicional.empresaAdi.valor.map(ele => ele.value),
          fechaInicio: rolAdicional.fecInicioRol,
          fechaFin: rolAdicional.fecFinRol,
          ruta: '',
          nombre: '',
        },
      }

      if(plazaTemporal.plazaTemp.valor){
        const formDataDos = new FormData();

        formDataDos.append('files', plazaTemporal.archivosTemp[0]);

        const {
          status : estatusTres,
          data : fileTemp,
        } = yield call(postUploadFile, formDataDos)

        if(estatusTres === 200){
          datos.plazaTemporal.ruta = fileTemp[0].url;
          datos.plazaTemporal.nombre = fileTemp[0].name;
        }
      }

      if(rolAdicional.puestoAdi.valor){
        const formDataTres = new FormData();

        formDataTres.append('files', rolAdicional.archivosRol[0]);

        const {
          status : estatusTres,
          data : fileRol,
        } = yield call(postUploadFile, formDataTres)
        
        if(estatusTres === 200){
          datos.rolAdicional.ruta = fileRol[0].url;
          datos.rolAdicional.nombre = fileRol[0].name;
        }
      }


      const {
        status,
        data = [],
      } = yield call(postGuardarUsuario, datos);
      
      if(status === 200){
        yield put(
          Actions.get('SET_LISTADO_GUARDAR').fn(data)
        );
          
        yield put(
          enqueueSnackbar({
            message: 'Se ha guardado correctamente el usuario',
            options: {
              variant: 'success',
            },
          })
        );
      } else {
        yield put(
          enqueueSnackbar({
            message: data.message,
            options: {
              variant: 'error',
            },
          })
        );
      }

    } else {

      info.correo.campoValido = info.correo.valor !== ''
      info.plaza.campoValido = info.plaza.valor !== ''
      parametros.archivoValido = parametros.archivos.length > 0

      if(parametros.idsSelecionados.length === 0) {
        yield put(
          enqueueSnackbar({
            message: 'Favor de seleccionar al menos un rol',
            options: {
              variant: 'warning',
            },
          })
        );
      }
      yield put(
        Actions.get('SET_CAMPOS_INVALIDOS').fn(info, parametros)
      );
    }
  } catch (error) {
    console.log(error);
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar la configuracion',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onClickDescargarTodoHistorialSaga() {
  try {
    const idUsuario = yield select(state => 
      state.getIn(
        ['usuarios', 'registrar', 'idUsuario']
      )
    )

    const nomUsuario = yield select(state => 
      state.getIn(
        ['usuarios', 'registrar', 'info', 'nombre']
      )
    )

    const {
      status,
      data = [],
    } = yield call(getDownloadFilesHistorial, idUsuario);
    
    yield put(
      Actions.get('SET_LOADING').fn(true)
    )

    if(status === 200){
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      
      if(data.type === 'application/pdf'){
        link.setAttribute('download', `Historial-${nomUsuario}.pdf`);
      } else {
        link.setAttribute('download', `Historial-${nomUsuario}.zip`);
      }

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

    } else {
      yield put(
        enqueueSnackbar({
          message: 'Hubo un error al descargar el archivo',
          options: {
            variant: 'error',
          },
        })
      );
    }

    yield put(
      Actions.get('SET_LOADING').fn(false)
    )
 
  } catch (error) {
    console.log(error);
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener los Usuarios',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export default function* usuariosSaga() {
  yield [
    takeLatest(
      GET_LISTADO,
      getListadoAction,
    ),
    takeLatest(
      SET_LISTADO_ACTIVAR,
      setListadoActivarAction,
    ),
    takeLatest(
      SET_LISTADO_DESACTIVAR,
      setListadoDesactivarAction,
    ),
    takeLatest(
      GET_DOWNLOAD_FILE,
      getDownloadFileAction,
    ),
    takeLatest(
      GET_DOWNLOAD_FILES,
      getDownloadFilesAction,
    ),
    takeLatest(
      GET_EMPLEADOS,
      getEmpleadosSaga,
    ),
    takeLatest(
      ON_CHANGE_EMPLEADO,
      onChangeEmpleadoSaga,
    ),
    takeLatest(
      GET_PLAZAS,
      getPlazasSaga,
    ),
    takeLatest(
      GET_PUESTOS,
      getPuestosSaga,
    ),
    takeLatest(
      ON_CLICK_ARCHIVO,
      onClickArchivoSaga,
    ),
    takeLatest(
      ON_CHANGE_PUESTO,
      onChangePuestoSaga,
    ),
    takeLatest(
      ON_CHANGE_ROL,
      onChangeRolSaga,
    ),
    takeLatest(
      ON_CLICK_VER_DETALLE,
      onClickVerDetalleSaga,
    ),
    takeLatest(
      ON_CLICK_LISTA_DETALLE,
      onClickListaDetalleSaga,
    ),
    takeLatest(
      ON_VER_DETALLE_USUARIO,
      onVerDetalleUsuarioSaga,
    ),
    takeLatest(
      ON_CLICK_GUARDAR,
      onClickGuardarSaga,
    ),
    takeLatest(
      ON_CLICK_DESCARGAR_HISTORIAL,
      onClickDescargarHistorialSaga,
    ),
    takeLatest(
      ON_CLICK_DESCARGAR_TODO_HISTORIAL,
      onClickDescargarTodoHistorialSaga,
    ),
  ]
}