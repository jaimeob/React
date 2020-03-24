import produce from 'immer';
import _ from 'lodash';
export const STATE = {
  loading: false,
  response: {},
  data: [],
  filterData: [],
  etapasArray:[],
  carga :true,
  // IdPlantilla,
  selected: "",
  stack: [],
  redirect:true,
  openModal : false,
  selectedIds:[],
  configuracion: {
    componentes: [
      {
        tipoComponenteId: 0,
        config: { 
          isComplete:true,
          valor: '',
          valorNumero: -1,
          nomCampo: 'Título',
          tipo: 'text',
          label: '',
          value: '',
          longitud: '',
          helpertextLongitud:'',
          error: false,
          errorTipo: false,
          errorLongitud: false,
          helpertext:'',
          helpertext2:'',
          requerido: false,
          colorearBorde: false,
          relacionaOtro: false,
          requeridoRelacion: false,
          cantidadarchivos: '',
          tamañoarchivos:'',
          tipoArchivo: 'picture',
          itemsCatalogo: [],
          relaciones: {},
          opciones: [
            {
              id: '',
              value: '',
              label:'Opcion',
              error:false,
              icon:'',
            },
          ],
          

        },
      },
      {
        tipoComponenteId: 1,
        config: {
          isComplete:true,
          valor: '',
          valorNumero: -1,
          nomCampo: 'Descripción',
          tipo: 'text',
          label: '',
          value: '',
          longitud: '',
          helpertextLongitud:'',
          error: false,
          error2: false,
          errorTipo: false,
          errorLongitud: false,
          helpertext:'',
          helpertext2:'',
          requerido: false,
          colorearBorde: false,
          relacionaOtro: false,
          requeridoRelacion: false,
          cantidadarchivos: '',
          tamañoarchivos: '',
          tipoArchivo: 'picture',
          itemsCatalogo: [],
          opciones: [
            {
              id: '',
              value: '',
              label:'Opcion',
              error:false,
              icon:'',
              isChecked:'',
            },
          ],
        },
      },
    ],
    etapasCheck:false,
    autorizacion:false,
    seguimiento:false,
    camposInvalidos:false,
    divSelecionado: 0,
    campoSelecionado: 0,
    selectionServicio:'',
    errores:{
      errorServicio:false,
      errorTiempoRespuesta:false,
      errorCierreRespuesta:false,
    },
    selectionTipo: '',
    selectionPrioriza: '',
    selectionPuesto:'',
    selectionDepartamento: '',
    selectionCierreRespuesta: '',
    selectionPermisosPuesto:[],
    tipoCierreRespuesta:'horas',
    selectionTiempoRespuesta: '',
    selectionTiempoSLA: '',
    tipoTiempoRespuesta:'horas',
    servicioPrioriza: [],
    servicioTipos: [],
    servicioDepartamentos: [],
    servicioPuestos: [],
    tiposCampos: [
      {
        id: 'textocorto',
        label: 'Texto corto',
        icono: 'shorttext',
      },
      {
        id: 'textolargo',
        label: 'Texto largo',
        icono: 'largetext',
      },
      {
        id: 'seleccionmulti',
        label: 'Selección múltiple',
        icono: 'checkbox',
      },
      {
        id: 'seleccionsimple',
        label: 'Selección simple',
        icono: 'simple',
      },
      {
        id: 'listadesplegable',
        label: 'Lista desplegable',
        icono: 'lista',
      },
      {
        id: 'archivo',
        label: 'Cargar archivo',
        icono: 'cloudupload',
      },
      {
        id: 'catalogo',
        label: 'Catálogo',
        icono: 'catalogo',
      },
    ],
    etapas:[],
    etapasParaBorrar:[],
    idPlantilla:"",
    arrCatalogos:[],
  },
}

export const HANDLERS = {
  methodo: (state) => (event, index) => {
    // console.log(JSON.parse(JSON.stringify(state)),"HANDLERS")
    const {
      target: {
        value,
      },
    } = event;
    // const nextState = produce(state)
    return produce(state, (nstate) => {
      nstate.items[index].nombre = value;
    });
  },
  stateUpdater: (state) =>
    (prop = '', val, isArray = false) => 
    
      produce(state, (draft) => {
        if (prop in draft) {
          if (isArray) {
            // console.log(val,"val")
            draft[prop].push(val);
            
          } else {
            draft[prop] = val; // eslint-disable-line 
          }
        }
      }),
  mergeState: (state) =>
    (obj = {}) => {
      if (_.isPlainObject(obj)) { // eslint-disable-line 
        const newState = _.assign({}, state, obj) // eslint-disable-line 
        return newState;
      }
      return state;
    },
  deleteIdx: (state) =>
    (prop = '', index = -1) => produce(state, (draft) => {
      const isValidObj = _.every([
        !_.isUndefined(draft[prop]),
        _.isArray(draft[prop]),
        index >= 0,
      ], Boolean)
      if (isValidObj) {
        draft[prop].splice(index, 1);
      }
    }),
};
export default STATE

