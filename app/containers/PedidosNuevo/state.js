export default {
  pedidosNuevoTabla: {
    error: {
      value : false,
      texto: "",
    },
    disabled: true,
    cabeceras : [
      {
        Nombre: 'ID',
      },
      {
        Nombre: 'Módulo',
      },
      {
        Nombre: 'Articulo',
      },
      {
        Nombre: 'Existencia en plaza',
      },
      {
        Nombre: 'Cantidad',
      },
      {
        Nombre: 'Comentarios',
      },
      {
        Nombre: 'Eliminar',
      },
    ],
    articulos : [],
    agrupadores : [],
    modal : false,
    modal2 : false,
    modal3 : false,
    modal4 : false,
    stepper : 0,
    agrupadorSlc : [],
    materialSlc : [],
    rows  : [],
    pedido : {
      IdUsuario : null,
      Comentario : '',
      plaza : {
        Id : 2,
        Nombre : 'culiacan',
      },
      row:[],
      rows : [],
      datos: {
        Id: [],
        IdModulo: [],
        IdArticulo: [],
        Agrupador: [],
        Nombre: [],
        Precio: [],
        Cantidad: [],
        Existencia: 0,
        StockMaximo: 0,
        Comentario: [],
        CantidadAutorizada: 0,
        CantidadSolicitada: 0,
      },
    },
    guardo: false,
    regresar: false,
  },
}