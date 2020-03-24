export default {
  permisos: {
    normales: {
      sololectura:0,
      registrar:0,
      editar:0,
      eliminar:0,
    },
    especiales: {
  
    },
  },
  backend: {
    datasources: {
      companys: [],
      weeksRetail: [],
      currentDate: {
        Year: 1990,
        Week: 90,
      },
      layout:{
        columsRequired: [],
      },
    },
  },
  frontend: {
    ui: {
      selectedCompany: 0,
      selectedWeek: 0,
      modalContentLayout: false,
      modalCargaBase: false,
      listadoArchivosMes: [],
      companyLayout: {
        cabeceras: [],
        contenido: [],
      },
    },
    iconViewExplotion: {
      enabled: false,
    },
    fileLoad: {
      cols: [],
      rows: [],
      name: '',
      size: 0,
    },
    validatedFile: false,
  },
};