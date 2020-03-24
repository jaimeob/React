export default {
  selected: {
    leidos:0,
  },
  mensaje: {
    id:0,
    comentarios: "",
    asunto:"",
    archivo:"",
    departamentoId : 1,
    empleadoId:1,
    tipo  :0,
    leido :0,
    fechaCreacion:new Date() ,
    checked:false,
    arregloDepartamentos:[],
    dataBlop: '',
  },
  bandejaDifusiones:{
    totalDifusiones: [],
    
    departamentos: [],
    difusiones:[],
    mostrarForm:false,
    mostrarDifusionSeleccionada:false,
    difusionSeleccionada: [],
    tabSelected : 0,

  },
}