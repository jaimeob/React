export default {
  backend: {
    datasources: {
      negocios: [],
      tableLayoutCols: [],
      layoutNegociaciones: {
        Labels: [],
        Columns: [],
        Rows: [],
      },
      detalleInsumo: [],
      explotionList: {
        HeaderList: [],
        RowsList: [],
      },
      explotionDetails: {
        HeaderList: [],
        RowsList: [],
      },
      // userCredentials: {
      //   nameUser: '',
      //   idUser: 0,
      // },
      request: {
        addExplotion: {
          message: '',
          codigo: null,
        },
      },
      currentDateTime: {
        Day: 0,
        Month: 0,
        Year: 0,
        Date: '01/01/2019',
        DateComplete: '',
        Time: '23:59:59',
      },
    },
  },
  frontend: {
    ui: {
      modalContentLayout: false,
      modalViewExplotion: false,
      mounted: false,
      modalActive: '',
      selectPlazas: {
        arrPlazas: [],
        plazaSelected: 0,
      },
      insumosExplotion: {
        staticProps: {
          poolInsumosExplotion: [],
          poolRowsPerPage: [],
          rowsPerPage: 0,
          countPages: 0,
        },
        dinamicProps: {
          pageActiveArray: [],
          pageActive: 0,
        },
      },
      loadExportExplotion: 0,
    },
    layoutNegociaciones: {
      Colums: [],
      Rows: [],
    },
    form: {
      nombre: {
        value: '',
      },
    },
    fileLoad: {
      cols: [],
      rows: [],
      name: '',
      size: 0,
    },
    iconViewExplotion: {
      enabled: false,
    },
    explotionDetails: {
      headers: [],
      rows: [],
    },
    explotionSelected : {
      IdExplosion: 0,
      PlazaId: '',
      FechaCreacion: '',
      Nombre: '',
    },
    validatedFile: false,
  },
};
