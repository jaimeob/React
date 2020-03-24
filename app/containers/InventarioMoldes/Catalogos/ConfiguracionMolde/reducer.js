/*
 *
 * ConfiguracionMolde reducer
 *
 */

import { fromJS } from 'immutable';
import { parseInt,isBoolean,isUndefined,isInteger,upperCase, find, flow, map,  groupBy, partialRight} from 'lodash';
import React,{ Fragment } from 'react';
// import { array } from 'prop-types';
// import { PropagateLoader } from 'react-spinners';
// import { isNumber } from 'util';
import Actions from './actions';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';

export const {
  SET_USUARIO,
  ON_INPUT_CHANGE,
  ON_INPUT_CHANGE_ACCESORIO,
  ON_INPUT_CHANGE_SECCION,
  ON_INPUT_CHANGE_PIEZA,
  SET_COMBOS,
  SET_MOLDES,
  SET_PUESTOS,
  ON_CHANGE_PUESTOS,
  VER_PLANO,
  HANDLE_CHANGE_ARCHIVO_EDITAR,
  HANDLE_CHANGE_ARCHIVO_PLANO,
  DESACTIVAR_GUARDAR_PIEZA,
  DESACTIVAR_GUARDAR_MOLDE,
  ON_ELIMINAR_MOLDE_MODAL,
  SET_ARCHIVOS_GUARDADOS,
  ON_CLICK_DETALLE,
  ON_CLICK_AGREGAR,
  ON_CLICK_AGREGAR_MOLDE,
  ON_HANDLE_CLICK_LIST,
  ON_CHANGE_SECCION_TAB,
  ON_CHANGE_CONFIGURACION_TAB,
  UPLOAD_PLANO,
  ON_CLICK_SIGUIENTE,
  ON_CLICK_AGREGAR_ACCESORIO,
  ON_CLICK_AGREGAR_PIEZA,
  ON_CLICK_GUARDAR_ACCESORIO,
  ON_CLICK_GUARDAR_PIEZA_VALIDADA,
  ON_CLICK_CERRAR,
  ON_CLICK_CANCELAR_ACCESORIO,
  ON_ELIMINAR_ACCESORIO,
  ON_ELIMINAR_MOLDE,
  ON_EDITAR_ACCESORIO,
  ON_EDITAR_PIEZA,
  ON_EDITAR_MOLDE,
  LIMPIAR_STATE,
  HANDLE_DELETE_ARCHIVO,
  HANDLE_DELETE_ARCHIVO_EDICION,
  HANDLE_DELETE_ARCHIVO_PLANO,
  HANDLE_DOWNLOAD_ARCHIVO_PLANO,
  ON_AGREGAR_SECCIONES,
  ON_ACTIVAR_MODAL_AVISO,
} = Actions.getConstants();

export const initialState = fromJS(STATE);

function configuracionMoldeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LIMPIAR_STATE: 
      return initialState;
    default:
      return state;
    case SET_PUESTOS: {
      return state.setIn(
        [
          'configuracion',
          'combos',
          'puestos',
        ],
        fromJS(action.datos),
      )
    }
    case SET_USUARIO: {
      return state
        .set('usuario',action.usuarioId)
    }
    

    case HANDLE_DELETE_ARCHIVO: {
      if(isBoolean(action.id))
        return state.updateIn(
          [
            'configuracion',
            'documentacion',
          ],
          stt => stt.merge({
            eliminarArchivo: false,
            idArchivo: null,
          })
        )
      
      return state.updateIn(
        [
          'configuracion',
          'documentacion',
        ],
        stt => stt.merge({
          eliminarArchivo: true,
          idArchivoTempo: action.id,
        })
      )
    }

    case SET_ARCHIVOS_GUARDADOS: {
      const archivos = state.getIn(
        [
          'configuracion',
          'documentacion',
          'archivos',
        ]
      ).toJS()

      for (let i = 0; i < action.archivos.length; i+=1) {
        archivos.push(action.archivos[i])
      }

      return state.setIn(
        [
          'configuracion',
          'documentacion',
          'archivos',
        ],
        fromJS(archivos)
      );
    }

    case HANDLE_DELETE_ARCHIVO_EDICION: {
      return state.updateIn(
        [
          'configuracion',
          'documentacion',
        ],
        stt => stt.merge({
          archivos : fromJS(action.archivos),
          eliminarArchivo: false,
          idArchivoTempo: null,
        })
      )
    }

    case ON_ELIMINAR_MOLDE_MODAL: {
      const {
        id,
      } = action;
      
      const idMolde = state.getIn(
        [
          'catalogo',
          'datos',
          id,
          'idMolde',
        ]
      )
      
      return state.updateIn(
        [
          'configuracion',
        ],
        stt => stt.merge({
          eliminarModal: !isBoolean(id),
          idMoldeEliminar: isBoolean(id) ? null : idMolde,
        })
      )
    }

    case VER_PLANO: {
      
      const imagen = state.getIn(
        [
          'configuracion',
          'secciones',
          'datos',
          action.id + 2,
          'plano',
          'url',
        ]
      )

      return state.setIn(
        [
          'configuracion',
          'documentacion',
          'imagenSlc',
        ],
        imagen,
      )
    }
    case ON_ACTIVAR_MODAL_AVISO: {
      if(isUndefined(action.datos) && action.bandera){
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            abrirModalAviso: action.bandera,
            mensajeConfirmacion: action.bandera?
              <Fragment>Al disminuir el numero de plantas, se eliminaran los datos capturados de las plantas excluidas. <br />¿Deseá continuar?</Fragment>
              :'',
            
            datosTemporales: [],
          })
        );
      }
      return state.updateIn(
        [
          'configuracion',
          'secciones',
        ],
        stt => stt.merge({
          abrirModalAviso: action.bandera,
          mensajeConfirmacion: action.bandera?
            <Fragment>Se encontro un número mayor de plantas en el archivo de importación.<br/> ¿Deseá continuar?</Fragment>
            :'',
          datosTemporales: action.bandera?action.datos:[],
        })
      );
    }
    

    case ON_HANDLE_CLICK_LIST: {
      // const arrayPlantas = []
      // const arraySecciones = []
      const numPlantas = state.getIn(
        [
          'configuracion',
          'general',
          'numPlantas',
          'valor',
        ]
      )
      const cabeceraPredefinida= [
        {
          name: 'id',
          label: '#',
        },
        {
          name: 'nombre',
          label: 'Material',
        },
        {
          name: 'tiempoVida',
          label: 'Tiempo de vida',
        },
        {
          name: 'cantPiezas',
          label: 'Cantidad',
        },
        {
          name: 'material',
          label: 'Costo',
        },
        {
          name: 'options', 
          label: ' ',
          options: {
            sort : false,
            filter: false,
            searchable: false,
          },
        },
      ]

      if (action.band === 1){
        const secciones = state.getIn(
          [
            'configuracion',
            'secciones',
            'datos',
          ]
        ).toJS()
        const planos = state.getIn(
          [
            'configuracion',
            'documentacion',
            'planos',
          ]
        ).toJS()
        const arraySecciones = secciones.filter(seccion =>  seccion.planta <= numPlantas)
        const archivosPlanos = planos.filter(plano =>  plano.planta <= numPlantas)
        // Eliminar numero de plantas excedentes
        // for (let i = 0; i < arraySecciones.length; i+=1) {
        //   // if(arraySecciones[i].planta > numPlantas){
        //   //   arraySecciones.splice(i,1)
        //   // }
        // }

        // arraySecciones.forEach((seccion,index) => {
        //   if(seccion.planta > numPlantas){
        //     arraySecciones.splice(index,1)
        //   }
        // })

        const arrayPlantas = state.getIn(
          [
            'configuracion',
            'combos',
            'plantas',
          ]
        ).toJS()

        // Eliminar numero de plantas excedentes
        arrayPlantas.forEach((planta,index) => {
          if(planta.id > numPlantas){
            arrayPlantas.splice(index,1)
          }
        })
        for (let i = 0; i < numPlantas; i+=1) {
          const seccionExistente = arraySecciones.filter(seccion => seccion.planta === i+1 && seccion.esAccesorio)
          const plantaExistente = arrayPlantas.filter(planta => planta.id === i+1)

          if(seccionExistente.length === 0){
            arraySecciones.push({idSeccion: null, plantaTabla:i=== 0 ?`Planta Baja`:`Nivel ${i}`,
              nombreTabla:'Accesorios',insumos:0, area:parseFloat(0), identificadorTabla: '',planta:i+1,
              esAccesorio:true,datos:[],cabeceras:cabeceraPredefinida})
          }
          if(plantaExistente.length === 0){
            arrayPlantas.push({id:i+1,nombre:i=== 0 ?`Planta Baja`:`Nivel ${i}`})
          }
        }

        return state.setIn(
          [
            'configuracion',
            'etapaNuevoMolde',
          ],
          action.band
        ).setIn(
          [
            'configuracion',
            'secciones',
            'datos',
          ],
          fromJS(arraySecciones)
        ).setIn(
          [
            'configuracion',
            'combos',
            'plantas',
          ],
          fromJS(arrayPlantas)
        ).setIn(
          [
            'configuracion',
            'documentacion',
            'planos',
          ],
          fromJS(archivosPlanos)
        ).setIn(
          [
            'configuracion',
            'general',
            'numPlantas',
            'valorAnterior',
          ],
          numPlantas
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            abrirModalAviso: false,
            mensajeConfirmacion: '',
            datosTemporales: [],
          })
        );


        
      }

      if (action.band === 2){
        const arrayPlanos = []
        const archivosPlanos = state.getIn(
          [
            'configuracion',
            'documentacion',
            'planos',
          ]
        ).toJS()


        const secciones = state.getIn(
          [
            'configuracion',
            'secciones',
            'datos',
          ]
        ).toJS()


        // falta hacer el proceso que si ya existe solo agregue las faltantes
        for (let i = 0; i < numPlantas; i+=1) { 
          // calcular secciones
          const seccionesPlanta = secciones.filter(seccion => seccion.planta === i+1 && seccion.datos.length>0 && !seccion.esAccesorio)
          const archivoPlano = archivosPlanos.filter(plano => plano.planta === i+1)
          // eslint-disable-next-line no-nested-ternary
          const nombrePlano = archivoPlano.length>0? archivoPlano[0].File? `${archivoPlano[0].File.name}`: `${archivoPlano[0].name}`:''
          
          if(seccionesPlanta.length>0)
            arrayPlanos.push({planta:i+1, nombrePlanta:i=== 0 ?`Planta Baja`:`Nivel ${i}`,secciones:seccionesPlanta.length,planos:nombrePlano})
        }

        const planosExistentes = arrayPlanos.filter(plano => plano.planos !== '')
        // const seccionesPlanta = secciones.filter(seccion => seccion.datos.length>0 && !seccion.esAccesorio)
        const tercerPaso = planosExistentes.length === arrayPlanos.length
        


        return state.setIn(
          [
            'configuracion',
            'etapaNuevoMolde',
          ],
          action.band
        ).setIn(
          [
            'configuracion',
            'secciones',
            'planos',
            'datos',
          ],
          fromJS(arrayPlanos)
        ).setIn(
          [
            'configuracion',
            'tercerPaso',
          ],
          tercerPaso
        )
      }
      return state.setIn(
        [
          'configuracion',
          'etapaNuevoMolde',
        ],
        action.band
      ).setIn(
        [
          'configuracion',
          'general',
          'numPlantas',
          'valorAnterior',
        ],
        numPlantas
      ).updateIn(
        [
          'configuracion',
          'secciones',
        ],
        stt => stt.merge({
          abrirModalAviso: false,
          mensajeConfirmacion: '',
          datosTemporales: [],
        })
      );
      // return state.setIn(
      //   [
      //     'configuracion',
      //     'documentacion',
      //     'listaSlc',
      //   ],
      //   action.band
      // )
    }

    case ON_AGREGAR_SECCIONES: {
      // const arraySecciones = []
      const arraySecciones = state.getIn(
        [
          'configuracion',
          'secciones',
          'datos',
        ]
      ).toJS()
      const numeroPlantasActual = state.getIn(
        [
          'configuracion',
          'general',
          'numPlantas',
          'valor',
        ]
      )
      const arrayPlantas = state.getIn(
        [
          'configuracion',
          'combos',
          'plantas',
        ]
      ).toJS()
      
      let numeroPlantasNuevo = 0
      const seccionesAgregadas = []
      let banderaAgregar = true
      let agregarAccesorio = true

      // const lineaError = 0
      const cabeceraPredefinida= [
        {
          name: 'id',
          label: '#',
        },
        {
          name: 'nombre',
          label: 'Material',
        },
        {
          name: 'tiempoVida',
          label: 'Tiempo de vida',
        },
        {
          name: 'cantPiezas',
          label: 'Cantidad',
        },
        {
          name: 'material',
          label: 'Costo',
        },
        {
          name: 'options', 
          label: ' ',
          options: {
            sort : false,
            filter: false,
            searchable: false,
          },
        },
      ]

      numeroPlantasNuevo=numeroPlantasActual
      // action.secciones.
      const seccionesPlanta = action.secciones.filter(seccion => seccion.planta > numeroPlantasActual)
      seccionesPlanta.forEach((seccionplanta) => {
        numeroPlantasNuevo = seccionplanta.planta>numeroPlantasActual ? seccionplanta.planta : numeroPlantasActual
      })
      

      for (let i = 0; i < numeroPlantasNuevo; i+=1) { 
        // Validar si ya existe
        if(numeroPlantasActual <= i){
          arraySecciones.push({idSeccion: null, plantaTabla:i=== 0 ?`Planta Baja`:`Nivel ${i}`,
            nombreTabla:'Accesorios',insumos:0, area:0, identificadorTabla: '',planta:i+1,
            esAccesorio:true,datos:[],cabeceras:cabeceraPredefinida})
          arrayPlantas.push({id:i+1,nombre:i=== 0 ?`Planta Baja`:`Nivel ${i}`})
        }
      }
      // action.secciones.every((secciones, indice) => {

        
      //   return true
      // });
      
      action.secciones.forEach((secciones) => {
        // const secciones = action.secciones[i]
        // debugger
        const datosSeccion = []
        let areaSeccion = 0
        banderaAgregar=true
        agregarAccesorio=true
        
      
        // Sacar el ultimo indice de esa seccion y ese sera + 1
        // Si no existe pues ponerle 1 


        // planta	seccion	insumo	alto	ancho	area	usos	identificador	cantidad
        areaSeccion = secciones.area ? secciones.area : secciones.alto * secciones.ancho
        areaSeccion = parseFloat(areaSeccion).toFixed(2)
        if(secciones.seccion.toLowerCase() !== 'accesorios'){
          datosSeccion.push({
            alto:secciones.alto,ancho:secciones.ancho,area:areaSeccion,
            identificador:secciones.identificador,limiteUsos:secciones.limusos,
            nombre:secciones.insumo,numeracion:secciones.numeracion,forma:secciones.area ? 1:0,id:1,
            pieza:`${secciones.identificador}-${secciones.numeracion}`,
          })

          arraySecciones.forEach((seccionExistente,index) => {
            if(seccionExistente.planta === secciones.planta && seccionExistente.nombreTabla.toLowerCase() === secciones.seccion.toLowerCase()){
              banderaAgregar=false
              arraySecciones[index].insumos+=1 
              arraySecciones[index].area += parseFloat(areaSeccion)
              datosSeccion[0].id=arraySecciones[index].datos.length+1
              arraySecciones[index].datos.push(datosSeccion[0])
            }
          })


        }else{
          datosSeccion.push({
            id:1,nombre:secciones.insumo, tiempoVida:secciones.limusos,
            esAccesorio:true, cantPiezas:secciones.cantidad, material:secciones.costo,
          })
          arraySecciones.forEach((seccionExistente,index) => {
            if(seccionExistente.planta === secciones.planta && seccionExistente.nombreTabla.toLowerCase() === secciones.seccion.toLowerCase()){
              banderaAgregar=false
              arraySecciones[index].insumos+=1 
              // arraySecciones[index].area += parseFloat(areaSeccion)
              datosSeccion[0].id=arraySecciones[index].datos.length+1
              arraySecciones[index].datos.push(datosSeccion[0])
            }
          })
        }

        if(banderaAgregar){
          if(secciones.seccion.toLowerCase() !== 'accesorios'){
            arraySecciones.push({idSeccion: null, plantaTabla:secciones.planta === 1 ?`Planta Baja`:`Nivel ${secciones.planta-1}`,
              nombreTabla:secciones.seccion,insumos:1, area:parseFloat(areaSeccion), 
              identificadorTabla: secciones.identificador,esAccesorio:false,planta:secciones.planta,
              datos:datosSeccion,cabeceras:cabeceraPredefinida})
            seccionesAgregadas.push(secciones)
          }else{
            // arraySecciones.forEach((seccionExistente,index) => {
            //   if(seccionExistente.planta === secciones.planta && seccionExistente.nombreTabla.toLowerCase() === secciones.seccion.toLowerCase()){
            //     agregarAccesorio = false
            //     arraySecciones[index]={idSeccion: null, plantaTabla:secciones.planta === 1 ?`Planta Baja`:`Nivel ${secciones.planta-1}`,
            //       nombreTabla:secciones.seccion,insumos:1, area:parseFloat(0), planta:secciones.planta,
            //       identificadorTabla: secciones.identificador,esAccesorio:true,
            //       datos:datosSeccion,cabeceras:cabeceraPredefinida}
            //   }
            // })
            // if (agregarAccesorio)
            arraySecciones.push({idSeccion: null, plantaTabla:secciones.planta === 1 ?`Planta Baja`:`Nivel ${secciones.planta-1}`,
              nombreTabla:secciones.seccion,insumos:1, area:parseFloat(0), 
              identificadorTabla: secciones.identificador,esAccesorio:true,planta:secciones.planta,
              datos:datosSeccion,cabeceras:cabeceraPredefinida})
          }
        }
      })
    
      return state.updateIn(
        [
          'configuracion',
          'secciones',
        ],
        stt => stt.merge({
          datos: fromJS(arraySecciones),
          permitirImportacion: false,
          nu: action.bandera?action.datos:[],
        })
      ).setIn(
        [
          'configuracion',
          'general',
          'numPlantas',
          'valor',
        ],
        numeroPlantasNuevo
      ).setIn(
        [
          'configuracion',
          'combos',
          'plantas',
        ],
        fromJS(arrayPlantas)
      ).setIn(
        [
          'configuracion',
          'segundoPaso',
        ],
        true
      )



      // return state.setIn(
      //   [
      //     'configuracion',
      //     'secciones',
      //     'datos',
      //   ],
      //   fromJS(arraySecciones)
      // ).setIn(
      //   [
      //     'configuracion',
      //     'secciones',
      //     'permitirImportacion',
      //   ],
      //   false
      // )
      
    }

    case DESACTIVAR_GUARDAR_PIEZA: {
      return state.setIn(
        [
          'configuracion',
          'secciones',
          'guardarSeccion',
        ],
        true
      );
    }
    case DESACTIVAR_GUARDAR_MOLDE: {
      const campos = state.getIn(
        [
          'configuracion',
          'general',
        ]
      ).toJS();

      campos.nombre.campoValido = campos.nombre.valor !== '';
      campos.version.campoValido = campos.version.valor !== '';
      campos.numPlantas.campoValido = campos.numPlantas.valor !== '';
      campos.costo.campoValido = campos.costo.valor !== '' && campos.costo.valor > 0;
      campos.proveedor.campoValido = campos.proveedor.valor !== '';
      campos.material.campoValido = campos.material.valor !== '';
      

      return state.setIn(
        [
          'configuracion',
          'guardarCompleto',
        ],
        false,
      ).setIn(
        [
          'configuracion',
          'general',
        ],
        fromJS(campos),
      )
    }
    
    case ON_CLICK_SIGUIENTE: {
      return state.setIn(
        [
          'configuracion',
          'secciones',
          'pestañaSlc',
        ],
        1,
      )
    }

    case ON_CLICK_AGREGAR_MOLDE: {
      const datos = state.getIn(
        [
          'catalogo', 
          'datos',
        ]
      )

      const secciones = state.getIn(
        [
          'configuracion',
          'secciones',
        ]
      ).toJS()
      if(state.get('stepper') === 1){
        if(action.cancelar)
          return state.updateIn(
            [
              'configuracion',
              'secciones',
            ],
            stt => stt.merge({
              bandModal: 0,
              abrirModalAgregar: false,
            })
          )
        if(secciones.abrirModalAgregar){
          const combos = state.getIn(
            [
              'configuracion',
              'combos',
            ]
          ).toJS();
      
          const usuario = state.getIn(
            [
              'usuario',
            ]
          )

          return initialState.setIn(
            [
              'catalogo',
              'datos',
            ],
            datos,
          ).set('stepper', 0).updateIn(
            [
              'configuracion',
              'combos',
            ],
            stt => stt.merge({
              proveedores: fromJS(combos.proveedores),
              materiales: fromJS(combos.materiales),
            })
          ).set('usuario',usuario)
        }
        if(secciones.hayCambioConfiguracion)
          return state.updateIn(
            [
              'configuracion',
              'secciones',
            ],
            stt => stt.merge({
              abrirModalAgregar: true,
              bandModal: 5,
              mensajeConfirmacion: '¿Está seguro que desea salir?',
            })
          )
        const combos = state.getIn(
          [
            'configuracion',
            'combos',
          ]
        ).toJS();
        return initialState.setIn(
          [
            'catalogo',
            'datos',
          ],
          datos,
        ).set('stepper', 0).updateIn(
          [
            'configuracion',
            'combos',
          ],
          stt => stt.merge({
            proveedores: fromJS(combos.proveedores),
            materiales: fromJS(combos.materiales),
          })
        )
      }
      return state.set('stepper', 1)
    }
    
    case ON_CLICK_CERRAR: {
      const secciones = state.getIn(
        [
          'configuracion',
          'secciones',
        ]
      ).toJS();
      
      if(action.cancelar)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            bandModal: 0,
            abrirModal: false,
          })
        )

      if(secciones.abrirModal)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            seccionSlc: {},
            abrirModal: false,
            hayCambio: false,
            indiceSeccion: null,
            hayCambioSeccion: false,
            bandModal: 0,
            mensajeConfirmacion: '',
          })
        );

      if(secciones.hayCambio)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            abrirModal: true,
            bandModal: 1,
            mensajeConfirmacion: '¿Está seguro que desea salir?',
          })
        )

      return state.updateIn(
        [
          'configuracion',
          'secciones',
        ],
        stt => stt.merge({
          seccionSlc: {},
          abrirModal: false,
          hayCambio: false,
          bandModal: 0,
          indiceSeccion: null,
          hayCambioSeccion: false,
          mensajeConfirmacion: '',
        })
      );
    }

    case ON_CLICK_CANCELAR_ACCESORIO: {
      const secciones = state.getIn(
        [
          'configuracion',
          'secciones',
        ]
      ).toJS();
      const idPieza = state.getIn(
        [
          'configuracion',
          'secciones',
          'idPieza',
        ]
      )
      
      if(action.cancelar)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            bandModal: 0,
            abrirModal: false,
          })
        )

      if(secciones.abrirModal)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            abrirModal: false,
            hayCambio: false,
            bandModal: 0,
            hayEdicion: false,
            mensajeConfirmacion: '',
            idAccesorio: null,
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
          ],
          stt => stt.merge({
            pieza: {
              valor: idPieza !== null ?secciones.seccionSlc.datos[idPieza].nombre: '',
              campoValido: true,
            },
            material: {
              valor: '',
              campoValido: true,
            },
            cantPiezas: {
              valor: '',
              campoValido: true,
            },
            tiempoVida: {
              valor: '',
              campoValido: true,
            },
          })
        );

      if(secciones.hayCambio)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            abrirModal: true,
            bandModal: 3,
            hayEdicion: true,
            mensajeConfirmacion: '¿Está seguro que desea cancelar la edición?',
          })
        )

      return state.updateIn(
        [
          'configuracion',
          'secciones',
        ],
        stt => stt.merge({
          abrirModal: false,
          hayCambio: false,
          idAccesorio: null,
          bandModal: 0,
          mensajeConfirmacion: '',
        })
      ).updateIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ],
        stt => stt.merge({
          pieza: {
            valor: idPieza !== null ?secciones.seccionSlc.datos[idPieza].nombre: '',
            campoValido: true,
          },
          material: {
            valor: '',
            campoValido: true,
          },
          cantPiezas: {
            valor: '',
            campoValido: true,
          },
          tiempoVida: {
            valor: '',
            campoValido: true,
          },
        })
      );
    }

    case ON_EDITAR_PIEZA: {
      const secciones = state.getIn(
        [
          'configuracion',
          'secciones',
        ]
      ).toJS();

      const idPiezaSelec = state.getIn(
        [
          'configuracion',
          'secciones',
          'idPiezaSeleccionada',
        ]
      )
      const idPiezaSeleccionada = isBoolean(action.id)?idPiezaSelec:secciones.seccionSlc.datos[action.id].id
      

      if(action.id && isBoolean(action.id))
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            bandModal: 0,
            abrirModal: false,
            idPieza: null,
            idPiezaSeleccionada: null,
            mensajeConfirmacion: '',
            hayCambio: true,
          })
        )

      if(secciones.hayCambio)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            bandModal: 5,
            abrirModal: true,
            hayCambio: false,
            mensajeConfirmacion: <Fragment>Se perderá la informacion capturada.<br/> ¿Deseá continuar?</Fragment>,
            idPieza: action.id,
            idPiezaSeleccionada,
          })
        )
        
      if(action.id >= 0 && !isBoolean(action.id))
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            abrirModal: false,
            bandModal: 0,
            hayCambio: false,
            hayCambioSeccion: true,
            idPieza: action.id,
            idPiezaSeleccionada,
            mensajeConfirmacion: '',
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
          ],
          stt2 => stt2.merge({
            pieza: {
              valor: secciones.seccionSlc.datos[action.id].nombre,
              campoValido: true,
            },
            numeracion: {
              valor: secciones.seccionSlc.datos[action.id].pieza.split('-')[1],
              campoValido: true,
            },
            forma: {
              valor: secciones.seccionSlc.datos[action.id].forma,
              campoValido: true,
            },
            alto: {
              valor: secciones.seccionSlc.datos[action.id].alto,
              campoValido: true,
            },
            ancho: {
              valor: secciones.seccionSlc.datos[action.id].ancho,
              campoValido: true,
            },
            area: {
              valor: parseInt(secciones.seccionSlc.datos[action.id].area).toFixed(2),
              campoValido: true,
            },
            usos: {
              valor: secciones.seccionSlc.datos[action.id].limiteUsos,
              campoValido: true,
            },
            identificador: {
              valor: upperCase(secciones.seccionSlc.datos[action.id].pieza.split('-')[0]),
              campoValido: true,
            },
          })
        )

      const idPieza = state.getIn(
        [
          'configuracion',
          'secciones',
          'idPieza',
        ]
      )

      return state.updateIn(
        [
          'configuracion',
          'secciones',
        ],
        stt => stt.merge({
          abrirModal: false,
          bandModal: 0,
          hayCambio: false,
          hayCambioSeccion: true,
          mensajeConfirmacion: '',
        })
      ).updateIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ],
        stt2 => stt2.merge({
          pieza: {
            valor: secciones.seccionSlc.datos[idPieza].nombre,
            campoValido: true,
          },
          numeracion: {
            valor: secciones.seccionSlc.datos[idPieza].numeracion,
            campoValido: true,
          },
          forma: {
            valor: secciones.seccionSlc.datos[idPieza].forma,
            campoValido: true,
          },
          alto: {
            valor: secciones.seccionSlc.datos[idPieza].alto,
            campoValido: true,
          },
          ancho: {
            valor: secciones.seccionSlc.datos[idPieza].ancho,
            campoValido: true,
          },
          usos: {
            valor: secciones.seccionSlc.datos[idPieza].limiteUsos,
            campoValido: true,
          },
          identificador: {
            valor: upperCase(secciones.seccionSlc.datos[idPieza].identificador),
            campoValido: true,
          },
        })
      )
    }

    case ON_EDITAR_ACCESORIO: {
      const secciones = state.getIn(
        [
          'configuracion',
          'secciones',
        ]
      ).toJS();
      
      if(action.id && isBoolean(action.id))
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            bandModal: 0,
            abrirModal: false,
            idAccesorio: null,
            mensajeConfirmacion: '',
            hayCambio: true,
          })
        )

      if(secciones.hayCambio)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            bandModal: 2,
            abrirModal: true,
            hayCambio: false,
            mensajeConfirmacion: <Fragment>Se perderá la informacion capturada.<br/> ¿Deseá continuar?</Fragment>,
            idAccesorio: action.id,
          })
        )
        
      if(action.id >= 0 && !isBoolean(action.id))
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            abrirModal: false,
            bandModal: 0,
            hayCambio: false,
            hayCambioSeccion: true,
            idAccesorio: action.id,
            mensajeConfirmacion: '',
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
          ],
          stt2 => stt2.merge({
            pieza: {
              valor: secciones.seccionSlc.datos[action.id].nombre,
              campoValido: true,
            },
            material: {
              valor: secciones.seccionSlc.datos[action.id].material,
              campoValido: true,
            },
            cantPiezas: {
              valor: secciones.seccionSlc.datos[action.id].cantPiezas,
              campoValido: true,
            },
            tiempoVida: {
              valor: secciones.seccionSlc.datos[action.id].tiempoVida,
              campoValido: true,
            },
          })
        )
      return state.updateIn(
        [
          'configuracion',
          'secciones',
        ],
        stt => stt.merge({
          abrirModal: false,
          bandModal: 0,
          hayCambio: false,
          hayCambioSeccion: true,
        })
      ).updateIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ],
        stt2 => stt2.merge({
          pieza: {
            valor: secciones.seccionSlc.datos[secciones.idAccesorio].nombre,
            campoValido: true,
          },
          material: {
            valor: secciones.seccionSlc.datos[secciones.idAccesorio].material,
            campoValido: true,
          },
          cantPiezas: {
            valor: secciones.seccionSlc.datos[secciones.idAccesorio].cantPiezas,
            campoValido: true,
          },
          tiempoVida: {
            valor: secciones.seccionSlc.datos[secciones.idAccesorio].tiempoVida,
            campoValido: true,
          },
        })
      )
    }

    case ON_EDITAR_MOLDE: {
      const arrayPlantas = []
      const seccion = state.getIn(
        [
          'catalogo',
          'datos',
          action.id,
        ]
      ).toJS();


      const idMolde = state.getIn(
        [
          'catalogo',
          'datos',
          action.id,
          'idMolde',
        ]
      )
      
      for (let i = 0; i < seccion.plantas; i+=1) { 
        arrayPlantas.push({id:i+1,nombre:i=== 0 ?`Planta Baja`:`Nivel ${i}`})
      }


      return state
        .set('stepper', 1)
        .set('idMolde', idMolde)
        .setIn(
          [
            'configuracion',
            'primerPaso',
          ],
          true
        )
        .setIn(
          [
            'configuracion',
            'segundoPaso',
          ],
          true
        )
        .setIn(
          [
            'configuracion',
            'documentacion',
            'archivos',
          ],
          fromJS(seccion.archivos)
        )
        .setIn(
          [
            'configuracion',
            'documentacion',
            'planos',
          ],
          fromJS(seccion.archivosPlanos)
        )
        .updateIn(
          [
            'configuracion',
            'general',
          ],
          stt => stt.merge({
            nombre: {
              valor: seccion.nombre,
              campoValido: true,
            },
            version: {
              valor: seccion.version,
              campoValido: true,
            },
            numPlantas: {
              valor: seccion.plantas,
              campoValido: true,
            },
            costo: {
              valor: seccion.costo,
              campoValido: true,
            },
            proveedor: {
              valor: seccion.IdProveedor,
              campoValido: true,
            },
            material: {
              valor: seccion.IdMaterial,
              campoValido: true,
            },
          })
        ).setIn(
          [
            'configuracion',
            'secciones',
            'datos',
          ],
          fromJS(seccion.secciones),
        ).setIn(
          [
            'configuracion',
            'esDetalleMolde',
          ],
          true
        ).setIn(
          [
            'configuracion',
            'guardarCompleto',
          ],
          true
        ).setIn(
          [
            'configuracion',
            'combos',
            'plantas',
          ],
          fromJS(arrayPlantas)
        ).setIn(
          [
            'configuracion',
            'tercerPaso',
          ],
          true
        )
        
    }

    case ON_ELIMINAR_ACCESORIO: {
      const seccion = state.getIn(
        [
          'configuracion',
          'secciones',
          'seccionSlc',
        ]
      ).toJS();

      seccion.datos.splice(action.id, 1)
      seccion.insumos -= 1;
      return state.setIn(
        [
          'configuracion',
          'secciones',
          'seccionSlc',
        ],
        fromJS(seccion)
      )

    }

    case ON_CLICK_GUARDAR_PIEZA_VALIDADA: {
      const indice = state.getIn(
        [
          'configuracion',
          'secciones',
          'indiceSeccion',
        ]
      );
      const camposDefault = {
        pieza: {
          valor: '',
          campoValido: true,
        },
        numeracion: {
          valor: '',
          campoValido: true,
        },
        forma: {
          valor: '',
          campoValido: true,
        },
        alto: {
          valor: '',
          campoValido: true,
        },
        ancho: {
          valor: '',
          campoValido: true,
        },
        usos: {
          valor: '',
          campoValido: true,
        },
        identificador: {
          valor: '',
          campoValido: true,
        },
        nombre: {
          valor: '',
          campoValido: true,
        },
        planta: {
          valor: '',
          campoValido: true,
        },
        plano: {
          valor: '',
        },
      }

      const plantaSeleccionada = state.getIn(
        [
          'configuracion',
          'secciones',
          'campos',
          'planta', 
          'valor',
        ]
      )
      const seccion = state.updateIn(
        [
          'configuracion',
          'secciones',
          'seccionSlc',
        ],
        stt => stt.merge({
          nombreTabla: state.getIn(
            [
              'configuracion',
              'secciones',
              'campos',
              'nombre', 
              'valor',
            ]
          ),
          plantaTabla: plantaSeleccionada === 1 ? 'Planta baja' : `Nivel ${plantaSeleccionada-1}`,
          planta:plantaSeleccionada,
          // aqui esta mal el guardado de la tabla
          esAccesorio: false,
          plano: state.getIn(
            [
              'configuracion',
              'secciones',
              'campos',
              'plano', 
            ]
          ),
          rutaArchivo: state.getIn(
            [
              'configuracion',
              'secciones',
              'campos',
              'plano', 
              'url',
            ]
          ),
        })
      );
      
      const obj = seccion.getIn(
        [
          'configuracion',
          'secciones',
          'seccionSlc',
        ]
      ).toJS();

      if(indice !== null && obj.datos.length>0){
        let area = 0;
        for (let i = 0; i < obj.datos.length; i+=1) {
          area += parseFloat(obj.datos[i].area);
        }
        // debugger;
        obj.area = area;
        return state.setIn(
          [
            'configuracion',
            'secciones',
            'datos',
            indice,
          ],
          fromJS(obj)
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            campos : camposDefault,
            indiceSeccion: null,
            hayCambioSeccion: false,
            permitirImportacion: false,
            seccionSlc : {},
          })
        )
      }

      const secciones = state.getIn(
        [
          'configuracion',
          'secciones',
          'datos',
        ]
      ).toJS()
      secciones.push(seccion.getIn(
        [
          'configuracion',
          'secciones',
          'seccionSlc',
        ]
      ).toJS())
      

      const seccionesValidas = secciones.filter(seccionValida =>  seccionValida.insumos>0 || seccionValida.esAccesorio)
      seccionesValidas.forEach((dato,index) => {
        if(dato.nombreTabla === obj.nombreTabla && obj.datos.length === 0){
          seccionesValidas.splice(index,1)
        }
      })

      const datosAgregados = secciones.filter(seccionValida =>  seccionValida.insumos>0)

      return state.setIn(
        [
          'configuracion',
          'secciones',
          'datos',
        ],
        fromJS(seccionesValidas)
      ).updateIn(
        [
          'configuracion',
          'secciones',
        ],
        stt => stt.merge({
          campos: camposDefault,
          seccionSlc : {},
          indiceSeccion: null,
          permitirImportacion: datosAgregados.length === 0,
          hayCambioSeccion: false,
        })
      ).setIn(
        [
          'configuracion',
          'segundoPaso',
        ],
        datosAgregados.length>0
      )
      
    }

    case ON_CLICK_GUARDAR_ACCESORIO: {
      const indice = state.getIn(
        [
          'configuracion',
          'secciones',
          'indiceSeccion',
        ]
      );

      const seccion = state.updateIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ],
        stt => stt.merge({
          pieza: {
            valor: '',
            campoValido: true,
          },
          tiempoVida: {
            valor: '',
            campoValido: true,
          },
          cantPiezas: {
            valor: '',
            campoValido: true,
          },
          material: {
            valor: '',
            campoValido: true,
          },
        })
      );

      return state.setIn(
        [
          'configuracion',
          'secciones',
          'datos',
          indice,
        ],
        seccion.getIn(
          [
            'configuracion',
            'secciones',
            'seccionSlc',
          ]
        )
      ).updateIn(
        [
          'configuracion',
          'secciones',
        ],
        stt => stt.merge({
          seccionSlc : {},
          indiceSeccion: null,
          hayCambioSeccion: false,
        })
      ).setIn(
        [
          'configuracion',
          'segundoPaso',
        ],
        true
      )
    }
    
    case ON_CLICK_AGREGAR_ACCESORIO: {
      const campos = state.getIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ]
      ).toJS();

      const idAccesorio = state.getIn(
        [
          'configuracion',
          'secciones',
          'idAccesorio',
        ]
      )

      const accesorio = state.getIn(
        [
          'configuracion',
          'secciones',
          'seccionSlc',
        ]
      ).toJS()
      
      if(idAccesorio !== null){
        accesorio.datos[idAccesorio].nombre = campos.pieza.valor;
        accesorio.datos[idAccesorio].tiempoVida = campos.tiempoVida.valor;
        accesorio.datos[idAccesorio].cantPiezas = campos.cantPiezas.valor;
        accesorio.datos[idAccesorio].material = campos.material.valor;
        accesorio.insumos = accesorio.datos.length;
        campos.pieza.valor = '';
        campos.material.valor = '';
        campos.cantPiezas.valor = '';
        campos.tiempoVida.valor = '';
        
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            idAccesorio : null,
            seccionSlc: accesorio,
            campos: fromJS(campos),
            hayCambio: false,
            hayCambioSeccion: true,
          })
        )
      }

      if(campos.pieza.valor && 
        campos.material.valor && 
        campos.cantPiezas.valor && 
        campos.tiempoVida.valor
      ){
        accesorio.datos.push(
          {
            id: accesorio.datos.length > 0 ? 
              accesorio.datos[accesorio.datos.length - 1].id + 1 : 1,
            nombre: campos.pieza.valor,
            tiempoVida: campos.tiempoVida.valor,
            cantPiezas: campos.cantPiezas.valor,
            material: campos.material.valor,
            esAccesorio: true,
          }
        )
        accesorio.insumos = accesorio.datos.length;
        campos.pieza.valor = '';
        campos.material.valor = '';
        campos.cantPiezas.valor = '';
        campos.tiempoVida.valor = '';


        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            seccionSlc: fromJS(accesorio),
            hayCambio: false,
            hayCambioSeccion: true,
            campos: fromJS(campos),
          })
        )
      }
      campos.pieza.campoValido = campos.pieza.valor !== '';  
      campos.material.campoValido = (
        campos.material.valor > 0 && campos.material.valor !== ''
      ); 
      campos.cantPiezas.campoValido = (
        campos.cantPiezas.valor > 0 && campos.cantPiezas.valor !== ''
      ); 
      campos.tiempoVida.campoValido = (
        campos.tiempoVida.valor > 0 && campos.tiempoVida.valor !== ''
      );
      return state.setIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ],
        fromJS(campos),
      )
      
    }

    case ON_CLICK_AGREGAR_PIEZA: {
      let area = 0;
      let identificadorIgual = false
      // let valorNumeracion = 0;
      const pieza = state.getIn(
        [
          'configuracion',
          'secciones',
          'seccionSlc',
        ]
      ).toJS();


      const campos = state.getIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ]
      ).toJS();

      const idPieza = state.getIn(
        [
          'configuracion',
          'secciones',
          'idPieza',
        ]
      )

      const idPiezaSeleccionada = state.getIn(
        [
          'configuracion',
          'secciones',
          'idPiezaSeleccionada',
        ]
      )
      pieza.datos.forEach((datoPieza) => {
        if(datoPieza.identificador === campos.identificador.valor && datoPieza.numeracion === campos.numeracion.valor && datoPieza.id !== idPiezaSeleccionada){
          identificadorIgual = true
        }
      })

      if (identificadorIgual){
        campos.numeracion.campoValido = false;
        return state.setIn(
          [
            'configuracion',
            'secciones',
            'campos',
          ],
          fromJS(campos),
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            agregoPieza: false,
          })
        )
      }

      if(idPieza !== null){
        pieza.datos[idPieza].nombre = campos.pieza.valor;
        pieza.datos[idPieza].alto = campos.alto.valor;
        pieza.datos[idPieza].ancho = campos.ancho.valor;
        pieza.datos[idPieza].area = campos.forma.valor === 0 ? 
          parseFloat(campos.alto.valor * campos.ancho.valor).toFixed(2) : 
          parseFloat(campos.area.valor).toFixed(2);
        pieza.datos[idPieza].limiteUsos = campos.usos.valor;
        pieza.datos[idPieza].forma = campos.forma.valor;
        pieza.datos[idPieza].identificador = campos.identificador.valor
        pieza.datos[idPieza].numeracion = campos.numeracion.valor;
        pieza.datos[idPieza].pieza = 
          `${campos.identificador.valor}-${campos.numeracion.valor}`;
        
        campos.pieza.valor = 'Cimbra';
        campos.numeracion.valor = '';
        campos.forma.valor = 0;
        campos.alto.valor = '';
        campos.ancho.valor = '';
        campos.area.valor = '';
        campos.alto.campoValido = true;
        campos.ancho.campoValido = true;
        campos.area.campoValido = true;
        campos.forma.campoValido = true;
        campos.numeracion.campoValido = true;
        // campos.usos.valor = '';
        campos.identificador.valor = '';
        
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            idPieza : null,
            idPiezaSeleccionada : null,
            seccionSlc: fromJS(pieza),
            campos: fromJS(campos),
            hayCambio: false,
            hayCambioSeccion: true,
          })
        )
      }
      
      if(campos.pieza.valor &&
        campos.numeracion.valor &&
        ((campos.forma.valor === 0 &&
        campos.alto.valor &&
        campos.ancho.valor) || 
        (campos.forma.valor === 1 &&
          campos.area.valor)) &&
        campos.usos.valor &&
        campos.identificador.valor
      ){
        pieza.datos.push(
          {
            id: pieza.datos.length > 0 ? 
              pieza.datos[pieza.datos.length - 1].id + 1 : 1,
            nombre: campos.pieza.valor,
            alto: campos.alto.valor,
            ancho: campos.ancho.valor,
            forma: campos.forma.valor,
            area: campos.forma.valor === 0 ? 
              parseFloat(campos.alto.valor * campos.ancho.valor).toFixed(2) : 
              parseFloat(campos.area.valor).toFixed(2),
            limiteUsos: campos.usos.valor,
            identificador: campos.identificador.valor,
            numeracion: campos.numeracion.valor,
            pieza: `${campos.identificador.valor}-${campos.numeracion.valor}`,
          }
        )
        const valorNumeracion = parseInt(campos.numeracion.valor)>0? parseInt(campos.numeracion.valor) :campos.numeracion.valor;
        campos.pieza.valor = 'Cimbra';
        campos.numeracion.valor = valorNumeracion + 1;
        campos.forma.valor = 0;
        campos.alto.valor = '';
        campos.ancho.valor = '';
        campos.area.valor = '';
        campos.alto.campoValido = true;
        campos.ancho.campoValido = true;
        campos.area.campoValido = true;
        campos.forma.campoValido = true;
        // campos.usos.valor = '';
        // campos.identificador.valor = '';
        

        for (let i = 0; i < pieza.datos.length; i+=1) {
          area += parseFloat(pieza.datos[i].area);
        }

        const obj = flow(
          partialRight(groupBy, x => x.identificador),
          partialRight(map, (value, key) => ({identificador: key, arreglos: value})),
        )(pieza.datos)

        
        let tamanoInicial = obj[0].arreglos.length;
        let {
          0 : {
            identificador,
          },
        } = obj;
        
        for (let j = 1; j < obj.length; j+=1) {
          if(obj[j].arreglos.length > tamanoInicial){
            tamanoInicial = obj[j].arreglos.length;
            // eslint-disable-next-line prefer-destructuring
            identificador = obj[j].identificador;
          }
        }

        pieza.area = parseFloat(area).toFixed(2);
        pieza.identificadorTabla = identificador;
        pieza.insumos = pieza.datos.length;

        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            seccionSlc: fromJS(pieza),
            hayCambio: false,
            campos: fromJS(campos),
            hayCambioSeccion: true,
            agregoPieza: true,
          })
        )
      }
      campos.pieza.campoValido = campos.pieza.valor !== '';
      campos.numeracion.campoValido = campos.numeracion.valor !== '';

      campos.alto.campoValido = (
        campos.alto.valor > 0 && campos.alto.valor !== ''
      );
      campos.area.campoValido = (
        campos.area.valor > 0 && campos.area.valor !== ''
      );
      campos.ancho.campoValido = (
        campos.ancho.valor > 0 && campos.ancho.valor !== ''
      );
      campos.usos.campoValido = (
        campos.usos.valor > 0 && campos.usos.valor !== ''
      ); 
      campos.identificador.campoValido = campos.identificador.valor !== '';
      
      return state.setIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ],
        fromJS(campos),
      )
    }

    case HANDLE_CHANGE_ARCHIVO_EDITAR: {
      const archivos = state.getIn(
        [
          'configuracion',
          'documentacion',
          'archivos',
        ]
      ).toJS()
      
      for (let i = 0; i < action.file.formData.length; i+=1) {
        archivos.push(action.file.formData[i])
      }
      
      return state.setIn(
        [
          'configuracion',
          'documentacion',
          'archivos',
        ],
        fromJS(archivos),
      )
    }

    case HANDLE_CHANGE_ARCHIVO_PLANO: {
      // const datos = state.getIn(['configuracion','secciones', 'planos','datos',action.indice])
      // const datoPlano = JSON.parse(JSON.stringify(datos))
      let bandGuardar = true
      let indice = -1

      const datosPlanos = state.getIn(
        [
          'configuracion',
          'secciones',
          'planos',
          'datos',
        ]
      ).toJS()

      datosPlanos.forEach((dato,index) => {
        if (dato.planta !== action.indice && dato.planos === ""){
          bandGuardar=false
        }
        if(dato.planta === action.indice){
          indice=index
        }
      })


      const archivosPlanos = state.getIn(
        [
          'configuracion',
          'documentacion',
          'planos',
        ]
      ).toJS()
      for (let i = 0; i < action.formData.length; i+=1) {
        archivosPlanos.push({File:action.formData[i],planta:action.indice})
      }
      return state.setIn(
        [
          'configuracion',
          'documentacion',
          'planos',
        ],
        fromJS(archivosPlanos),
      ).updateIn(
        [
          'configuracion',
          'secciones',
          'planos',
          'datos',
          indice,
        ],
        stt => stt.merge({
          planos: `Archivo ${action.indice}`,
        })
      ).setIn(
        [
          'configuracion',
          'tercerPaso',
        ],
        bandGuardar
      )
    }

    case HANDLE_DELETE_ARCHIVO_PLANO: {
      // const datos = state.getIn(['configuracion','secciones', 'planos','datos',action.indice])
      // const datoPlano = JSON.parse(JSON.stringify(datos))

      const archivosPlanos = state.getIn(
        [
          'configuracion',
          'documentacion',
          'planos',
        ]
      ).toJS()
      archivosPlanos.forEach((archivo,index) => {
        if (archivo.planta === action.indice+1)
          archivosPlanos.splice(index,1)
      })
      return state.setIn(
        [
          'configuracion',
          'documentacion',
          'planos',
        ],
        fromJS(archivosPlanos),
      ).updateIn(
        [
          'configuracion',
          'secciones',
          'planos',
          'datos',
          action.indice,
        ],
        stt => stt.merge({
          planos: "",
        })
      ).setIn(
        [
          'configuracion',
          'tercerPaso',
        ],
        false
      )
    }



    case UPLOAD_PLANO:{
      const {
        file: {
          name,
          size,
          type,
          buffer,
          url,
        },
        formData,
      } = action;

      const filePathState = [
        'configuracion',
        'secciones',
        'campos',
        'plano',
      ];
      
      if (buffer) {
        const fileState = state
          .getIn(filePathState);
        const updatedFileState = fileState
          .merge({
            name,
            size,
            type,
            buffer,
            url,
            formData,
          });
        return state
          .setIn(filePathState, updatedFileState)
          .setIn(
            [
              'configuracion',
              'secciones',
              'guardarSeccion',
            ],
            false
          );
      }
      return state;
    }

    case ON_CHANGE_SECCION_TAB: {
      return state.setIn(
        [
          'configuracion',
          'secciones',
          'pestañaSlc',
        ],
        action.id,
      )
    }

    case ON_CHANGE_CONFIGURACION_TAB: {
      return state.setIn(
        [
          'configuracion',
          'pestañaSlc',
        ],
        action.id
      )
    }

    case ON_CLICK_AGREGAR: {
      const secciones = state.getIn(
        [
          'configuracion',
          'secciones',
        ]
      ).toJS();
      const usos = state.getIn(
        [
          'configuracion',
          'secciones',
          'campos',
          'usos',
          'valor',
        ]
      )

      if(action.cancelar)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            bandModal: 0,
            abrirModalAgregar: false,
            hayCambioSeccion: true,
            hayCambio: true,
          })
        )

      if(secciones.hayCambioSeccion || secciones.hayCambio)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            abrirModalAgregar: true,
            bandModal: 4,
            hayCambioSeccion: false,
            hayCambio: false,
            mensajeConfirmacion: '¿Está seguro que desea salir?',
          })
        )
        
      return state.updateIn(
        [
          'configuracion',
          'secciones',
        ], 
        stt => stt.merge({
          seccionSlc : fromJS(
            {
              idSeccion: null,
              plantaTabla: '',
              nombreTabla: '',
              identificadorTabla: '',
              insumos: 0,
              area: 0,
              esAccesorio: true,
              datos: [],
            },
          ),
          esAccesorio: false,
          pestañaSlc: 0,
          abrirModalAgregar: false,
          hayCambioSeccion: false,
          bandModal: 0,
          idPieza: null,
          idPiezaSeleccionada: null,
          indiceSeccion: null,
          mensajeConfirmacion: '',
        })
      ).updateIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ],
        stt => stt.merge({
          nombre : {
            valor: '',
            campoValido: true,
          },
          planta : {
            valor: '',
            campoValido: true,
          },
          pieza : {
            valor: 'Cimbra',
            campoValido: true,
          },
          identificador : {
            valor: '',
            campoValido: true,
          },
          numeracion : {
            valor: '',
            campoValido: true,
          },
          forma : {
            valor: 0,
            campoValido: true,
          },
          alto : {
            valor: '',
            campoValido: true,
          },
          ancho : {
            valor: '',
            campoValido: true,
          },
          usos : {
            valor: usos,
            campoValido: true,
          },
          area : {
            valor: '',
            campoValido: true,
          },
          material : {
            valor: '',
            campoValido: true,
          },
          cantPiezas : {
            valor: '',
            campoValido: true,
          },
          tiempoVida : {
            valor: '',
            campoValido: true,
          },
        })
      )
    }

    case ON_CLICK_DETALLE: {
      const seccion = state.getIn(
        [
          'configuracion',
          'secciones',
          'datos',
          action.id,
        ]
      ).toJS()

      return state.updateIn(
        [
          'configuracion',
          'secciones',
        ],
        stt => stt.merge({
          seccionSlc: fromJS(seccion),
          esAccesorio: seccion.esAccesorio,
          pestañaSlc: 0,
          idPieza: null,
          idPiezaSeleccionada: null,
          indiceSeccion: action.id,
        })
      ).updateIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ],
        stt => stt.merge({
          nombre : {
            valor: seccion.nombreTabla,
            campoValido: true,
          },
          planta : {
            valor: seccion.planta,
            campoValido: true,
          },
          pieza : {
            valor: seccion.esAccesorio === 0 ?'Cimbra':'',
            campoValido: true,
          },
          plano : {
            url: seccion.rutaArchivo,
          },
          identificador : {
            valor: '',
            campoValido: true,
          },
          numeracion : {
            valor: '',
            campoValido: true,
          },
          forma : {
            valor: 0,
            campoValido: true,
          },
          alto : {
            valor: '',
            campoValido: true,
          },
          ancho : {
            valor: '',
            campoValido: true,
          },
          usos : {
            valor: '',
            campoValido: true,
          },
          area : {
            valor: '',
            campoValido: true,
          },
          material : {
            valor: '',
            campoValido: true,
          },
          cantPiezas : {
            valor: '',
            campoValido: true,
          },
          tiempoVida : {
            valor: '',
            campoValido: true,
          },
        })
      );
    }

    case SET_COMBOS: {
      return state.updateIn(
        [
          'configuracion',
          'combos',
        ],
        stt => stt.merge({
          proveedores: fromJS(action.datos.proveedores),
          materiales: fromJS(action.datos.materiales),
        })
      )
    }

    case SET_MOLDES: {
      const combos = state.getIn(
        [
          'configuracion',
          'combos',
        ]
      ).toJS();
      
      const usuario = state.getIn(
        [
          'usuario',
        ]
      )

      return initialState.setIn(
        [
          'catalogo', 
          'datos',
        ],
        fromJS(action.datos),
      ).updateIn(
        [
          'configuracion',
          'combos',
        ],
        stt => stt.merge({
          proveedores: fromJS(combos.proveedores),
          materiales: fromJS(combos.materiales),
          puestos: fromJS(combos.puestos),
        })
      ).set('usuario',usuario)
    }

    case ON_INPUT_CHANGE: {
      const campos = state.getIn(
        [
          'configuracion',
          'general',
        ]
      ).toJS()

      if(action.campo === 0){
        const bandera = action.valor !== '' &&
          campos.version.campoValido &&
          campos.numPlantas.campoValido &&
          campos.costo.campoValido &&
          campos.proveedor.campoValido &&
          campos.material.campoValido;

        const primerPaso = action.valor !== '' &&
          campos.version.valor !== '' &&
          campos.numPlantas.valor !== '' &&
          campos.costo.valor !== '' &&
          campos.proveedor.valor !== '' &&
          campos.material.valor !== '';
        

        return state.updateIn(
          [
            'configuracion',
            'general',
            'nombre',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: action.valor !== '',
          })
        ).setIn(
          [
            'configuracion',
            'secciones',
            'hayCambioConfiguracion',
          ],
          true
        ).setIn(
          [
            'configuracion',
            'guardarCompleto',
          ],
          bandera
        ).setIn(
          [
            'configuracion',
            'primerPaso',
          ],
          primerPaso
        )
      }
      if(action.campo === 1){
        const bandera = (action.valor > 0 && action.valor !== '') &&
          campos.nombre.campoValido &&
          campos.numPlantas.campoValido &&
          campos.costo.campoValido &&
          campos.proveedor.campoValido &&
          campos.material.campoValido;

        const primerPaso = action.valor !== '' &&
          campos.nombre.valor !== '' &&
          campos.numPlantas.valor !== '' &&
          campos.costo.valor !== '' &&
          campos.proveedor.valor !== '' &&
          campos.material.valor !== '';

        return state.updateIn(
          [
            'configuracion',
            'general',
            'version',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor > 0 && action.valor !== ''),
          })
        ).setIn(
          [
            'configuracion',
            'secciones',
            'hayCambioConfiguracion',
          ],
          true
        ).setIn(
          [
            'configuracion',
            'guardarCompleto',
          ],
          bandera
        ).setIn(
          [
            'configuracion',
            'primerPaso',
          ],
          primerPaso
        )
      }
      if(action.campo === 2){
        const cantidad = action.valor >0 ? action.valor : ''
        const bandera = campos.nombre.campoValido &&
          campos.version.campoValido &&
          campos.costo.campoValido &&
          campos.proveedor.campoValido &&
          campos.material.campoValido;

        const primerPaso = cantidad !== '' &&
          campos.nombre.valor !== '' &&
          campos.version.valor !== '' &&
          campos.costo.valor !== '' &&
          campos.proveedor.valor !== '' &&
          campos.material.valor !== '';

        return state.updateIn(
          [
            'configuracion',
            'general',
            'numPlantas',
          ],
          stt => stt.merge({
            valor: cantidad,
            campoValido: true,
          })
        ).setIn(
          [
            'configuracion',
            'secciones',
            'hayCambioConfiguracion',
          ],
          true
        ).setIn(
          [
            'configuracion',
            'guardarCompleto',
          ],
          bandera
        ).setIn(
          [
            'configuracion',
            'primerPaso',
          ],
          primerPaso
        )
      }
      if(action.campo === 3){
        const bandera = (action.valor > 0 && action.valor !== '') &&
          campos.nombre.campoValido &&
          campos.numPlantas.campoValido &&
          campos.version.campoValido &&
          campos.proveedor.campoValido &&
          campos.material.campoValido;
        
        const primerPaso = action.valor !== '' &&
          campos.nombre.valor !== '' &&
          campos.version.valor !== '' &&
          campos.numPlantas.valor !== '' &&
          campos.proveedor.valor !== '' &&
          campos.material.valor !== '';

        return state.updateIn(
          [
            'configuracion',
            'general',
            'costo',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor > 0 && action.valor !== ''),
          })
        ).setIn(
          [
            'configuracion',
            'secciones',
            'hayCambioConfiguracion',
          ],
          true
        ).setIn(
          [
            'configuracion',
            'guardarCompleto',
          ],
          bandera
        ).setIn(
          [
            'configuracion',
            'primerPaso',
          ],
          primerPaso
        )
      }
      if(action.campo === 4){
        const bandera = campos.nombre.campoValido &&
          campos.numPlantas.campoValido &&
          campos.version.campoValido &&
          campos.costo.campoValido &&
          campos.material.campoValido;

        const primerPaso = action.valor !== '' &&
          campos.nombre.valor !== '' &&
          campos.version.valor !== '' &&
          campos.numPlantas.valor !== '' &&
          campos.costo.valor !== '' &&
          campos.material.valor !== '';

        return state.updateIn(
          [
            'configuracion',
            'general',
            'proveedor',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        ).setIn(
          [
            'configuracion',
            'secciones',
            'hayCambioConfiguracion',
          ],
          true
        ).setIn(
          [
            'configuracion',
            'guardarCompleto',
          ],
          bandera
        ).setIn(
          [
            'configuracion',
            'primerPaso',
          ],
          primerPaso
        )
      }
      if(action.campo === 5){
        const bandera = campos.nombre.campoValido &&
          campos.numPlantas.campoValido &&
          campos.version.campoValido &&
          campos.costo.campoValido &&
          campos.proveedor.campoValido;

        const primerPaso = action.valor !== '' &&
          campos.nombre.valor !== '' &&
          campos.version.valor !== '' &&
          campos.numPlantas.valor !== '' &&
          campos.costo.valor !== '' &&
          campos.proveedor.valor !== '';

        return state.updateIn(
          [
            'configuracion',
            'general',
            'material',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        ).setIn(
          [
            'configuracion',
            'secciones',
            'hayCambioConfiguracion',
          ],
          true
        ).setIn(
          [
            'configuracion',
            'guardarCompleto',
          ],
          bandera
        ).setIn(
          [
            'configuracion',
            'primerPaso',
          ],
          primerPaso
        )
      }
      return state;
    }

    case ON_INPUT_CHANGE_ACCESORIO: {
      const campos = state.getIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ]
      ).toJS();

      if(action.campo === 0){
        const bandera = action.valor !== '' &&
          campos.material.campoValido &&
          campos.cantPiezas.campoValido &&
          campos.tiempoVida.campoValido;

        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'pieza',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: action.valor !== '',
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }
      if(action.campo === 1){
        const bandera = campos.pieza.campoValido &&
          (action.valor > 0 && action.valor !== '') &&
          campos.cantPiezas.campoValido &&
          campos.tiempoVida.campoValido;

        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'material',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor > 0 && action.valor !== ''),
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }
      if(action.campo === 2){
        const bandera = campos.pieza.campoValido &&
          campos.material.campoValido &&
          (action.valor > 0 && action.valor !== '') &&
          campos.tiempoVida.campoValido;

        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'cantPiezas',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor > 0 && action.valor !== ''),
          })  
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }
      if(action.campo === 3){
        const bandera = campos.pieza.campoValido &&
          campos.material.campoValido &&
          campos.cantPiezas.campoValido &&
          (action.valor > 0 && action.valor !== '');

        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'tiempoVida',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor > 0 && action.valor !== ''),
          })  
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }
      return state;
    }
    
    case ON_INPUT_CHANGE_SECCION: {
      
      if(action.campo === 0)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'nombre',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: action.valor !== '',
          })
        )
      if(action.campo === 1)
        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'planta',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor >= 0),
          })
        )
      return state;
    }

    case ON_INPUT_CHANGE_PIEZA: {
      const campos = state.getIn(
        [
          'configuracion',
          'secciones',
          'campos',
        ]
      ).toJS();
      let identificadorIgual = false

      /**
       * Actualiza el campo nombre de la pieza, valida que todos los campos
       * sean validos para permitir agregar
       */
      if(action.campo === 0){
        const bandera = campos.identificador.campoValido &&
          campos.forma.campoValido &&
          (
            (
              campos.alto.campoValido &&
              campos.ancho.campoValido
            ) || 
            (
              campos.area.campoValido
            )
          ) &&
          campos.usos.campoValido && 
          campos.numeracion.campoValido && action.valor !== '';
          
        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'pieza',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: action.valor !== '',
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }

      /**
       * Actualiza el campo identificador, valida que todos los campos sean
       * validos para permitir agrear, actualiza el campo numeracion con
       * la numeracion mas proxima disponible del identificador capturado
       */
      if(action.campo === 1){

        const bandera = campos.pieza.campoValido &&
          campos.forma.campoValido &&
          (
            (
              campos.alto.campoValido &&
              campos.ancho.campoValido
            ) || 
            (
              campos.area.campoValido
            )
          ) &&
          campos.usos.campoValido && 
          action.valor !== '';

        const piezas = state.getIn(
          [
            'configuracion',
            'secciones',
            'seccionSlc',
            'datos',
          ]
        ).toJS()

        const obj = flow(
          partialRight(groupBy, x => x.identificador),
          partialRight(map, (value, key) => ({identificador: key, arreglo: value})),
        )(piezas)
        
        const obj2 = find(obj, {'identificador': action.valor.toUpperCase().trim()})
        let numeracionSig = 1;
        if(obj2)
          for (let i = 0; i < obj2.arreglo.length; i+=1){
            if(numeracionSig.toString() === 1 && (i + 1).toString() !==  obj2.arreglo[i].numeracion   )
              numeracionSig = i + 1;
            else if(numeracionSig === 1 && i === obj2.arreglo.length - 1)
              numeracionSig = obj2.arreglo.length + 1;
          }
          
        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'identificador',
          ],
          stt => stt.merge({
            valor: action.valor.toUpperCase().trim(),
            campoValido: action.valor !== '',
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'numeracion',
          ],
          stt => stt.merge({
            valor: action.valor !== '' ? numeracionSig : '',
            campoValido: action.valor !== '',
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }
      if(action.campo === 2){
        const piezas = state.getIn(
          [
            'configuracion',
            'secciones',
            'seccionSlc',
            'datos',
          ]
        ).toJS()
        const secciones = state.getIn(
          [
            'configuracion',
            'secciones',
          ]
        ).toJS()
        
        const idPiezaActual = secciones.idPiezaSeleccionada !== null ? secciones.idPiezaSeleccionada : -1

        const bandera = campos.pieza.campoValido &&
          campos.forma.campoValido &&
          (
            (
              campos.alto.campoValido &&
              campos.ancho.campoValido
            ) || 
            (
              campos.area.campoValido
            )
          ) &&
          campos.usos.campoValido && 
          campos.identificador.campoValido && action.valor !== '';


        piezas.forEach((datoPieza) => {
          if(datoPieza.identificador === campos.identificador.valor && datoPieza.numeracion.toString() === action.valor.toString() && datoPieza.id !== idPiezaActual){
            identificadorIgual=true
          }
        })  
        if (identificadorIgual){
          return state.updateIn(
            [
              'configuracion',
              'secciones',
              'campos',
              'numeracion',
            ],
            stt => stt.merge({
              valor: action.valor,
              campoValido: false,
            })
          ).updateIn(
            [
              'configuracion',
              'secciones',
            ],
            stt => stt.merge({
              botonAgregar: true,
              hayCambio: true,
            })
          )
        }
      
        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'numeracion',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: action.valor !== '',
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }
      /**
       * Actualiza el campo tipo de forma, valida que todos los campos sean
       * validos para permitir agrear
       */
      if(action.campo === 3){

        const bandera = campos.pieza.campoValido &&
          campos.identificador.campoValido &&
          (
            (
              action.valor === 0 && campos.alto.campoValido &&
              campos.ancho.campoValido
            ) || 
            (
              action.valor === 1 && campos.area.campoValido
            ) 
          ) &&
          campos.usos.campoValido && campos.numeracion.campoValido 
          ;

        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'forma',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: true,
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }


      if(action.campo === 4){

        const bandera = campos.pieza.campoValido &&
          campos.identificador.campoValido &&
          (
            campos.ancho.campoValido
          ) &&
          campos.usos.campoValido && 
          campos.numeracion.campoValido &&
          (action.valor > 0 && action.valor !== '');

        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'alto',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor > 0 && action.valor !== ''),
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }
      if(action.campo === 5){

        const bandera = campos.pieza.campoValido &&
          campos.identificador.campoValido &&
          (
            campos.alto.campoValido
          ) &&
          campos.usos.campoValido && 
          campos.numeracion.campoValido &&
          (action.valor > 0 && action.valor !== '');

        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'ancho',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor > 0 && action.valor !== ''),
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }
      if(action.campo === 6){

        const bandera = campos.pieza.campoValido &&
          campos.identificador.campoValido &&
          (
            (
              campos.alto.campoValido &&
              campos.ancho.campoValido
            ) || 
            (
              campos.area.campoValido
            )
          ) &&
          campos.numeracion.campoValido &&
          (action.valor > 0 && action.valor !== '');

        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'usos',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor > 0 && action.valor !== ''),
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }
      if(action.campo === 7){

        const bandera = campos.pieza.campoValido &&
          campos.identificador.campoValido &&
          (
            (
              campos.alto.campoValido &&
              campos.ancho.campoValido
            ) || 
            (
              campos.area.campoValido
            )
          ) &&
          (action.valor > 0 && action.valor !== '');
          
        return state.updateIn(
          [
            'configuracion',
            'secciones',
            'campos',
            'area',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: (action.valor > 0 && action.valor !== ''),
          })
        ).updateIn(
          [
            'configuracion',
            'secciones',
          ],
          stt => stt.merge({
            botonAgregar: !bandera,
            hayCambio: true,
          })
        )
      }
      return state;
    }

  }
}

export default configuracionMoldeReducer;
