import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toSafeInteger } from 'lodash'
import XLSX from 'xlsx';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import ActionsSpinner from 'components/Spinner/store/actions';
import Actions from './actions';

import {
  addMolde,
  getCombos,
  // getPuestos,
  getMoldes,
  deleteMolde,
  postUploadFile,
  getDownloadedFile,
  // postGuardarArchivo,
  // deleteArchivo,
} from './api';

export const {
  GET_COMBOS,
  GET_MOLDES,
  GET_PUESTOS,
  ON_ELIMINAR_MOLDE,
  GUARDAR_MOLDE,
  ON_CLICK_GUARDAR_PIEZA,
  HANDLE_DOWNLOAD_ARCHIVO,
  HANDLE_CHANGE_ARCHIVO,
  ON_ELIMINAR_ARCHIVO_DOCUMENTACION,
  HANDLE_DOWNLOAD_ARCHIVO_PLANO,
  HANDLE_IMPORTAR_EXCEL,
} = Actions.getConstants();

const {
  CHANGE_SPINNER,
} = ActionsSpinner.getConstants();

export function* getCombosSaga() {
  try {
    const {
      status,
      data = [],
    } = yield call(getCombos);
    if(status === 200){
      yield put(
        Actions.get('SET_COMBOS').fn(data)
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

export function* onClickGuardarPiezaSaga() {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  try {
    yield put(
      Actions.get('ON_CLICK_GUARDAR_PIEZA_VALIDADA').fn()
    );
    // }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar la seccion',
        options: {
          variant: 'error',
        },
      })
    );
  }
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* getMoldesSaga() {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  try {
    const {
      status,
      data = [],
    } = yield call(getMoldes);
    if(status === 200){
      yield put(
        Actions.get('SET_MOLDES').fn(data)
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
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* onEliminarMoldeSaga() {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  try {
    const idProtected = yield select((state) => state
      .getIn(
        [
          'configuracionMolde', 
          'configuracion', 
          'idMoldeEliminar',
        ]
      ))
        
    const datos = {
      idProtected,
    };

    const {
      status,
      data = [],
    } = yield call(deleteMolde, datos);
    
    if(status === 200){
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'success',
          },
        })
      );
      yield put(
        Actions.get('SET_MOLDES').fn(data.datos)
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
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* onGuardarMoldeSaga() {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  try {
    let planosValido = true
    const general = JSON.parse(
      JSON.stringify(
        yield select(
          (state) => state
            .getIn(
              [
                'configuracionMolde', 
                'configuracion', 
                'general',
              ]
            )
        )
      )
    )
    const idMolde = yield select((state) => state.getIn(
      [
        'configuracionMolde',
        'idMolde',
      ]
    ))

    const usuarioId = yield select((state) => state.getIn(
      [
        'configuracionMolde',
        'usuario',
      ]
    ))
    if(
      general.nombre.valor !== '' &&
      general.version.valor !== '' &&
      general.numPlantas.valor !== '' &&
      (general.costo.valor !== '' && general.costo.valor > 0) &&
      general.proveedor.valor !== '' &&
      general.material.valor !== ''
    ){

      const secciones = JSON.parse(
        JSON.stringify(
          yield select(
            (state) => state
              .getIn(
                [
                  'configuracionMolde', 
                  'configuracion', 
                  'secciones',
                  'datos',
                ]
              )
          )
        )
      );

      const datosPlanos = JSON.parse(
        JSON.stringify(
          yield select(
            (state) => state
              .getIn(
                [
                  'configuracionMolde', 
                  'configuracion', 
                  'secciones',
                  'planos',
                ]
              )
          )
        )
      );


      datosPlanos.datos.forEach((dato) => {
        if (dato.planos === "" && planosValido){
          planosValido = false
        }
      })

      // debugger
      if (planosValido){
        const archivos = yield select(
          (state) => state
            .getIn(
              [
                'configuracionMolde',
                'configuracion',
                'documentacion',
                'archivos',
              ]
            ).toJS()
        )
        const planos = yield select((state) => 
          state.getIn(
            [
              'configuracionMolde',
              'configuracion',
              'documentacion',
              'planos',
            ]
          ).toJS()
        )
    

        const arregloArchivos = [];
        const arregloPlanos = [];
      


        if (archivos.length>0){
          const formData = new FormData()
          formData.append('refId', 'documentacion')
      
          for (let k = 0; k < archivos.length; k+=1) {
            if(!archivos[k].idArchivo){
              formData.append('files', archivos[k], archivos[k].name)
            }else{
              arregloArchivos.push(
                {
                  'idArchivo':archivos[k].idArchivo,
                  'url': archivos[k].rutaArchivo,
                  'nombre': archivos[k].name,
                }
              ) 
            }
              
          }

          const {
            status: statusFi,
            data : dataFi,
          } = yield call(postUploadFile, formData);
      
          if(statusFi === 200){
            for (let k = 0; k < dataFi.length; k+=1) {
              arregloArchivos.push(
                {
                  'url': dataFi[k].url,
                  'nombre': dataFi[k].name,
                }
              ) 
            }
          }
        }

        if (planos.length>0){

          // const idPlantas = [];
          for (let k = 0; k < planos.length; k+=1) {
            // if (planos[k].File || planos[k].Ruta){
            if(planos[k].File){
              const formDataPlanos = new FormData()
              formDataPlanos.append('refId', 'documentacion')
              formDataPlanos.append('files', planos[k].File, planos[k].File.name)
              const {
                status: statusFi,
                data : dataFi,
              } = yield call(postUploadFile, formDataPlanos);
              if(statusFi === 200){
                arregloPlanos.push(
                  {
                    'rutaArchivo': dataFi[0].url,
                    'name': dataFi[0].name,
                    'planta': planos[k].planta,
                  }
                ) 
              }
              // idPlantas.push(planos[k].planta)
            }else{
              arregloPlanos.push(
                {
                  'idArchivo':planos[k].idArchivo,
                  'rutaArchivo': planos[k].rutaArchivo,
                  'name': planos[k].name,
                  'planta': planos[k].planta,
                }
              ) 
            }
            // } 
          }
          // if (idPlantas.length>0){
          //   if(statusFi === 200){
          //     for (let k = 0; k < dataFi.length; k+=1) {
          //       arregloPlanos.push(
          //         {
          //           'rutaArchivo': dataFi[k].url,
          //           'name': dataFi[k].name,
          //           'planta': idPlantas[k],
          //         }
          //       ) 
          //     }
          //   }
          // }
        }

        const datos = {
          secciones,
          idMolde,
          arregloArchivos,
          arregloPlanos,
          nombre: general.nombre.valor,
          version: general.version.valor,
          numPlantas: toSafeInteger(general.numPlantas.valor),
          costo: general.costo.valor,
          idProveedor: toSafeInteger(general.proveedor.valor),
          idMaterial: toSafeInteger(general.material.valor),
          usuario:usuarioId,
        };
        // posiblemente esto ya no lo ocupe
        for (let i = 0; i < secciones.length; i+=1) {
          if(!secciones[i].esAccesorio){
            const file = yield select((state) => state.getIn(
              [
                'configuracionMolde', 
                'configuracion', 
                'secciones', 
                'datos', 
                i, 
                'plano',
                'formData',
              ]
            ))
            if(file){
              const {
                status,
                data = [],
              } = yield call(postUploadFile, file);
              if(status === 200){
                secciones[i].rutaArchivo = data[0].url;
                secciones[i].nomArchivo = data[0].name;
              } else {
                yield put(
                  enqueueSnackbar({
                    message: 'Hubo un error al subir el plano',
                    options: {
                      variant: 'error',
                    },
                  })
                );
              }
            } 
          }
        }

        const {
          status: statusAdd,
          data: dataAdd = [],
        } = yield call(addMolde, datos);

        if(statusAdd === 200){
          yield put(
            enqueueSnackbar({
              message: 'Se ha guardado correctamente',
              options: {
                variant: 'success',
              },
            })
          );

          yield put(
            Actions.get('SET_MOLDES').fn(dataAdd)
          );
        } else {
          yield put(
            enqueueSnackbar({
              message: dataAdd.message,
              options: {
                variant: 'error',
              },
            })
          );
        }
      }else{
        yield put(
          enqueueSnackbar({
            message: 'Es necesario subir los planos de las plantas registradas para guardar',
            options: {
              variant: 'warning',
            },
          })
        );
      }
    } else {

      yield put(
        Actions.get('DESACTIVAR_GUARDAR_MOLDE').fn()
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar la configuración',
        options: {
          variant: 'error',
        },
      })
    );
  }
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* handleChangeArchivoSaga(action) {
  try {
    yield put(
      Actions.get('HANDLE_CHANGE_ARCHIVO_EDITAR').fn(action)
    )
  } catch (error) {
    // yield put(
    //   enqueueSnackbar({
    //     message: 'Hubo un error al subir el archivo',
    //     options: {
    //       variant: 'error',
    //     },
    //   })
    // );
  }
}
export function* handleDeleteArchivoSaga(action) {
  try {
    // const indice = yield select(state => state.getIn(
    //   [
    //     'configuracionMolde',
    //     'configuracion',
    //     'documentacion',
    //     'idArchivoTempo',        
    //   ]
    // ))
    const archivos = yield select((state) => 
      state.getIn(
        [
          'configuracionMolde',
          'configuracion',
          'documentacion',
          'archivos',
        ]
      ).toJS()
    )
    archivos.splice(action.id, 1);

    yield put(
      Actions.get('HANDLE_DELETE_ARCHIVO_EDICION').fn(archivos)
    );

  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al eliminar el archivo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* handleDownloadArchivoSaga(action) {
  try {
    let url = '';
    let band = true;
    let nombreArchivo;
    let ruta;
    let file;
    const detalleMolde = yield select((state) => 
      state.getIn(
        [
          'configuracionMolde',
          'configuracion',
          'esDetalleMolde',
        ]
      )
    )
    const archivos = yield select((state) => 
      state.getIn(
        [
          'configuracionMolde',
          'configuracion',
          'documentacion',
          'archivos',

        ]
      ).toJS()
    )

    if (detalleMolde || archivos[0].idArchivo){
      archivos.forEach((archivo,index) => {
        if (index === action.id){
          ruta = archivo.rutaArchivo
          nombreArchivo = archivo.name
        }
        
      })
      const {
        status,
        data,
      } = yield call (getDownloadedFile, ruta);
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
    }else{
      
      archivos.forEach((archivo,index) => {
        if (index === action.id)
          file = archivo
      })
      url = window.URL.createObjectURL(new Blob([file]));
      nombreArchivo=file.name
    }
    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombreArchivo);
      document.body.appendChild(link);
      link.click();
      yield put(
        enqueueSnackbar({
          message: 'Se ha descargado el archivo correctamente.',
          options: {
            variant: 'success',
          },
        })
      );
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

export function* handleDownloadArchivoPlanoSaga(action) {
  try {
    let url = '';
    let band = true;
    let file;
    let nombreArchivo
    let ruta;

    const detalleMolde = yield select((state) => 
      state.getIn(
        [
          'configuracionMolde',
          'configuracion',
          'esDetalleMolde',
        ]
      )
    )

    // const datos = yield select((state) => 
    //   state.getIn(
    //     [
    //       'configuracionMolde',
    //       'configuracion',
    //       'secciones',
    //       'planos',
    //       'datos',
    //       action.indice,
    //     ]
    //   )
    // )
    // const datoPlano = JSON.parse(JSON.stringify(datos))
    // const idInsumo = action.tipoInsumo === 0 ? datoInsumo.IdPieza : datoInsumo.IdAccesorio
    const archivos = yield select((state) => 
      state.getIn(
        [
          'configuracionMolde',
          'configuracion',
          'documentacion',
          'planos',

        ]
      ).toJS()
    )


    if (detalleMolde || archivos[0].idArchivo){
      archivos.forEach((archivo) => {
        if (archivo.planta === action.indice+1){
          ruta = archivo.rutaArchivo
          nombreArchivo = archivo.name
        }
        
      })
      const {
        status,
        data,
      } = yield call (getDownloadedFile, ruta);
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
    }else{
      archivos.forEach((archivo) => {
        if (archivo.planta === action.indice+1)
          file = archivo.File
      })
      url = window.URL.createObjectURL(new Blob([file]));
      nombreArchivo=file.name

    }


    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombreArchivo);
      document.body.appendChild(link);
      link.click();
      yield put(
        enqueueSnackbar({
          message: 'Se ha descargado el archivo correctamente.',
          options: {
            variant: 'success',
          },
        })
      );
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
export function* handleImportarExcelSaga (action) {
  const evento = action.event;
  try {

    let arregloExcel = []
    if (evento.target.value) {
      const fileObj = evento.target.files[0];
      if (fileObj.size < 20800000) {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {

          reader.onload = e => {
            const workbook = XLSX.read(e.target.result, {
              type: 'binary',
            });
            
            if (workbook.Strings.length) {              
              const firstSheet = workbook.SheetNames[0];
              const sheet = workbook.Sheets[firstSheet]
              // const excelRows = XLSX.utils.sheet_to_row_object_array(sheet);
              arregloExcel = XLSX.utils.sheet_to_json(sheet);

              // const columsContent = [];
              // const range = XLSX.utils.decode_range(sheet['!ref']);

              if (!arregloExcel.length) {
                enqueueSnackbar({
                  message: 'Archivo sin información.',
                  options: { variant: 'warning' },
                })
              } 
            }else{
              enqueueSnackbar({
                message: 'Archivo sin información.',
                options: { variant: 'warning' },
              })
            }
          };

          // if(arregloExcel.length>0){
          //   yield put(
          //     Actions.get('ON_AGREGAR_SECCIONES').fn(arregloExcel)
          //   ); 
          // }
          
 
          reader.readAsBinaryString(evento.target.files[0]);
        }
      }else{
        enqueueSnackbar({
          message: 'Peso máximo de archivo es 20mb, favor de validar.',
          options: { variant: 'warning' },
        })
      }
    }else{
    // setFileLoadAction({
    //   cols: [],
    //   rows: [],
    //   name: '',
    //   size: 0,
    // })
      enqueueSnackbar({
        message: 'No seleccionaste archivo.',
        options: { variant: 'warning' },
      })
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
export default function* configuracionMoldeSaga() {
  yield [
    takeLatest(
      GET_COMBOS,
      getCombosSaga,
    ),
    takeLatest(
      GET_MOLDES,
      getMoldesSaga,
    ),
    takeLatest(
      ON_ELIMINAR_MOLDE,
      onEliminarMoldeSaga,
    ),
    takeLatest(
      GUARDAR_MOLDE,
      onGuardarMoldeSaga,
    ),
    takeLatest(
      ON_CLICK_GUARDAR_PIEZA,
      onClickGuardarPiezaSaga,
    ),
    takeLatest(
      HANDLE_DOWNLOAD_ARCHIVO,
      handleDownloadArchivoSaga,
    ),
    takeLatest(
      HANDLE_CHANGE_ARCHIVO,
      handleChangeArchivoSaga,
    ),
    takeLatest(
      ON_ELIMINAR_ARCHIVO_DOCUMENTACION,
      handleDeleteArchivoSaga,
    ),
    takeLatest(
      HANDLE_DOWNLOAD_ARCHIVO_PLANO,
      handleDownloadArchivoPlanoSaga,
    ),
    takeLatest(
      HANDLE_IMPORTAR_EXCEL,
      handleImportarExcelSaga,
    ),
    
    // takeLatest(
    //   GET_PUESTOS,
    //   getPuestosSaga,
    // ),
  ]
  // See example in containers/HomePage/saga.js
}
