import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts'
import logo from 'images/logo/fincamex-logo-12.png';
import moment from 'moment';
import Actions from './actions';
import {
  getListado,
  setListadoActivar,
  setListadoDesactivar,
  getDownloadFile,
  getDownloadFiles,
  getPuestos,
  getRoles,
  getConfiguracion,
  getModulosPorEmpresa,
  postGenerarPDF,
  postUploadFile,
  postGuardarConfiguracion,
  getDownloadedFile,
  countDownloadFiles,
} from './api';

import { obtenerPermisos } from '../../services/api';

pdfMake.vfs = pdfFonts.pdfMake.vfs; 

export const {
  GET_LISTADO,
  GET_PUESTOS,
  SET_LISTADO_ACTIVAR,
  SET_LISTADO_DESACTIVAR,
  GET_DOWNLOAD_FILE,
  GET_DOWNLOAD_FILES,
  GET_CONFIGURACION,
  SET_LOADING,
  GET_ROLES,
  HANDLE_CLICK_LISTA,
  ON_CLICK_IMPRIMIR_FORMATO,
  ON_DESCARGAR_FORMATO,
  ON_GUARDAR_CONFIGURACION,
  ON_DESCARGAR_ARCHIVO,
  OBTENER_PERMISOS,
} = Actions.getConstants();
// Individual exports for testing

export function* getListadoAction(usuario) {
  try {
    const {
      status,
      data = [],
    } = yield call(getListado);
    const objUsuario = {
      idUsuario: usuario.usuarioId,
      nombre: usuario.nombreUsuario,
    }
    if(status === 200){
      yield put(
        Actions.get('SET_LISTADO').fn(data, objUsuario)
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
          message: 'Hubo un error al obtener los Puestos - Roles',
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
}

export function* getRolesSaga() {
  try {
    const {
      status,
      data = [],
    } = yield call(getRoles);
    
    if(status === 200){
      yield put(
        Actions.get('SET_ROLES').fn(data)
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
        message: 'Hubo un error al obtener la información',
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
        message: 'Hubo un error al obtener la información',
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
          message: 'Hubo un error al activar los Puestos - Roles',
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
}

export function* setListadoDesactivarAction(params) {
  try {
    const {
      status,
      data = [],
    } = yield call(setListadoDesactivar, params.datos)
    
    if(status === 200 && data.recordset[0].desactivado === 1){
      const usuario = yield select((state) => state.getIn(['global', 'currentUser']).toJS())

      const objUsuario = {
        idUsuario: usuario.UsuarioId,
        nombre: usuario.Nombre,
      }

      yield put(
        Actions.get('GET_LISTADO').fn(objUsuario)
      );
      /*
      const { dataDos = []} = yield call(getListado);
      yield put(
        Actions.get('SET_LISTADO').fn(dataDos)
      );
      yield put(
        Actions.get('SET_LISTADO_FILTER').fn(dataDos.filter((modulo) => modulo.Activo))
      );
      yield put(
        Actions.get('SET_SELECTED').fn([])
      );
      */
    } else if(status === 200 && data.recordset[0].desactivado === 0) {
      yield put(
        enqueueSnackbar({
          message: 'No se puede eliminar el registro ya que existen usuarios activos asignados al puesto - rol.',
          options: {
            variant: 'warning',
          },
        })
      );
    }
 
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al desactivar los Puestos - Roles',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* handleClickSaga(action) {
  try {
    const idRol = yield select((state) => state
      .getIn(
        ['puestoRol', 'registrar', 'lista', action.id, 'value']
      ))
    const {
      status,
      data = [],
    } = yield call(getModulosPorEmpresa, idRol);
    
    if(status === 200){
      yield put(
        Actions.get('SET_MODULOS').fn(action.id, data)
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
        message: 'Hubo un error al obtener la información',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getConfiguracionSaga(action) {
  try {
    const {
      status,
      data = [],
    } = yield call(getConfiguracion, action.id);
    
    if(status === 200){
      yield put(
        Actions.get('SET_CONFIGURACION').fn(action.id, data)
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
        message: 'Hubo un error al obtener la configuración',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onDescargarArchivoSaga(action) {
  try {

    let file = yield select((state) => state
      .getIn(
        ['puestoRol', 'registrar', 'parametros', 'archivo', 'archivos', action.id]
      )
    )

    let url = '';
    let band = true;
    
    if(file.type){
      url = window.URL.createObjectURL(new Blob([file]));
    } else {
      file = file.toJS();
      const {
        status,
        data,
      } = yield call (getDownloadedFile, file.url);
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
      link.setAttribute('download', file.name);
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

export function* onGuardarConfiguracionSaga() {
  try {
    const roles = yield select((state) => state
      .getIn(
        ['puestoRol', 'registrar', 'parametros', 'rol', 'valor']
      ).toJS()
    )
    
    const puesto = yield select((state) => state
      .getIn(
        ['puestoRol', 'registrar', 'parametros', 'puesto', 'valor', 'value']
      )
    )

    const datos = {
      roles: [],
      idPuesto: puesto,
      archivos: [],
      idUsuario: 26921,
    };

    for (let i = 0; i < roles.length; i+=1) {
      datos.roles.push(roles[i].value)
    }

    const files = yield select((state) => state
      .getIn(
        ['puestoRol','registrar', 'parametros', 'archivo', 'formData']
      ));
    
    const archivos = yield select((state) => state
      .getIn(
        ['puestoRol','registrar', 'parametros', 'archivo', 'archivos']
      ).toJS()
    );

    datos.archivos = archivos;
    
    if(files){
        
      const {
        status : estatusDos,
        data : file,
      } = yield call(postUploadFile, files)
      if(estatusDos === 200){
        for (let k = 0; k < file.length; k+=1) {
          datos.archivos[k]= {
            url: file[k].url,
            idArchivo: null,
            name: file[k].name,
          };
        }
      }
    }
      
    const {
      status,
      data = [],
    } = yield call(postGuardarConfiguracion, datos);
    
    if(status === 200){
      yield put(
        enqueueSnackbar({
          message: 'Datos guardados con éxito',
          options: {
            variant: 'success',
          },
        })
      );
      yield put(
        Actions.get('SET_LISTADO_GUARDAR').fn(data)
      );
      yield put(
        Actions.get('GET_PUESTOS').fn()
      );
      yield put(
        Actions.get('GET_ROLES').fn()
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
    console.log(error);
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar la configuración',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onDescargarFormatoSaga() {
  try {
    const roles = yield select((state) => state
      .getIn(
        ['puestoRol', 'registrar', 'parametros', 'rol', 'valor']
      ).toJS()
    )

    const puesto = yield select((state) => state
      .getIn(
        ['puestoRol', 'registrar', 'parametros', 'puesto', 'valor']
      )
    )

    const datos = {
      roles : [],
      puesto,
    };

    for (let i = 0; i < roles.length; i+=1) {
      datos.roles.push(roles[i].value)
    }
      
    const {
      status,
      data = [],
    } = yield call(postGenerarPDF, datos);
    if(status === 200){
      const bodyPdf = data.datos.map(ele => (
        [{
          style: "Empresas",
          table: {
            widths: ["100%"],
            body: [
              [
                {
                  text: ele.NombreEmpresa,
                  style: 'EmpresasText',
                },
              ],
            ],
          },
          layout: {
            fillColor () {
              return '#f9f7f7';
            },
            hLineWidth (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 0;
            },
            vLineWidth () {
              return 0;
            },
            hLineColor () {
              return '#E0E0E0';
            },
          },
        },
        ele.Modulos,
        ]
      ))
      const fecha = moment().format('DD/MM/YYYY')

      const pdf = {
        pageMargins: [ 0, 80, 0, 120 ],
        footer () {
          return {
            style: 'footer',
            columns: [
              {
                width: '32%',
                table: {
                  widths: ['100%'],
                  headerRows: 1,
                  body: [
                    [
                      {text: 'Solicita\n\n\n\n', alignment: 'center'},
                    ],
                    [
                      {text: `Gerente de Departamento`, alignment: 'center'},  
                    ],
                  ],
                },
                layout: {
                  hLineWidth (i) {
                    return i === 1  ? 2 : 0;
                  },
                  vLineWidth () {
                    return 0;
                  },
                  hLineColor () {
                    return 'black';
                  },
                },
              },
              {
                width: '36%',
                style: 'footerMedio',
                table: {
                  widths: ['100%'],
                  headerRows: 1,
                  // keepWithHeaderRows: 1,
                  body: [
                    [
                      {text: 'Autoriza\n\n\n\n', alignment: 'center'},
                    ],
                    [
                      {text: "Gerente de Sistemas", alignment: 'center'},  
                    ],
                  ],
                },
                layout: {
                  hLineWidth (i) {
                    return i === 1  ? 2 : 0;
                  },
                  vLineWidth () {
                    return 0;
                  },
                  hLineColor () {
                    return 'black';
                  },
                },
              },
              {
                width: '32%',
                table: {
                  widths: ['100%'],
                  headerRows: 1,
                  body: [
                    [
                      {text: 'Autoriza\n\n\n\n', alignment: 'center'},
                    ],
                    [
                      {text: "Gerente de Recursos Humanos", alignment: 'center'},  
                    ],
                  ],
                },
                layout: {
                  hLineWidth (i) {
                    return i === 1  ? 2 : 0;
                  },
                  vLineWidth () {
                    return 0;
                  },
                  hLineColor () {
                    return 'black';
                  },
                },
              },
            ],
          };
        },
        header() {
          return {
            style: 'tableExample5',
            color: '#444',
            table: {
              widths: [175, 250, 140],
              headerRows: 2,
              body: [
                [
                  {
                    image: logo, 
                    colSpan: 1, 
                    rowSpan: 2, 
                    alignment: 'center',
                  }, 
                  {
                    text: data.puesto[0].Departamento, 
                    style: 'tableHeader', 
                    alignment: 'center',
                  }, 
                  {
                    text: `Fecha: ${fecha}`, 
                    style: 'fecha',
                    rowSpan: 2, 
                    alignment: 'right',
                  },
                ],
                ['', {text: data.puesto[0].Nombre.toUpperCase(), alignment: 'center', style: 'tableHeader'}, ''],
              ],
            },
            layout: {
              hLineColor () {
                return 'white';
              },
              vLineColor () {
                return 'white';
              },
            },
          };
        },
        content: [
          bodyPdf,
        ],
        
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
          },
          subheader: {
            fontSize: 16,
            bold: true,
            alignment: "center",
          },
          EmpresasText: {
            margin: [5,5,0,5],
          },
          fecha: {
            fontSize: 10,
          },
          footerMedio: {
            margin: [10,0,10,0],
          },
          footer: {
            margin: [30,0,20,0],
          },
          tableExample: {
            margin: [30,15,0,15],
            // fontSize: 11,
          },
          tableExample2: {
            margin: [0,0,0,15],
          },
          tableExample5: {
            margin: [0,20,0,0],
          },
          tableExample3: {
            margin: [0,15,-25,15],
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: "black",
          },
          Empresas: {
            margin: [0,0,0,0],
          },
        },
      }
      pdfMake.tableLayouts = {
        bordeTabla: {
          hLineWidth (i, node) {
            return (i < 2 || i === node.table.body.length) ? 1 : 0;
          },
          vLineWidth () {
            return 1;
          },
          hLineColor () {
            return '#E0E0E0';
          },
          vLineColor () {
            return '#E0E0E0';
          },
        },
      }
      // if(status === 200){
      pdfMake.createPdf(pdf).download();
      // } else {
      //   yield put(
      //     enqueueSnackbar({
      //       message: data.message,
      //       options: {
      //         variant: 'error',
      //       },
      //     })
      //   );
      // }
    }
  } catch (error) {
    console.log(error);
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al descargar el formato',
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
            message: 'El puesto rol no cuenta con archivos',
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
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', 'Evidencias.zip');
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

export function* obtenerPermisosSaga(){
  const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  
  const {
    status,
    data,
  } = yield call(obtenerPermisos, {...paramsPermisos, idUsuario});

  if(status === 200){
    yield put(
      Actions.get('SET_PERMISOS').fn(data.permisos),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los permisos',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export default function* puestoRolSaga() {
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
      GET_PUESTOS,
      getPuestosSaga,
    ),
    takeLatest(
      GET_ROLES,
      getRolesSaga,
    ),
    takeLatest(
      HANDLE_CLICK_LISTA,
      handleClickSaga,
    ),
    takeLatest(
      ON_DESCARGAR_FORMATO,
      onDescargarFormatoSaga,
    ),
    takeLatest(
      ON_GUARDAR_CONFIGURACION,
      onGuardarConfiguracionSaga,
    ),
    takeLatest(
      GET_CONFIGURACION,
      getConfiguracionSaga,
    ),
    takeLatest(
      ON_DESCARGAR_ARCHIVO,
      onDescargarArchivoSaga,
    ),
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosSaga
    ),
  ]
}
