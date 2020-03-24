
export default {
  backend: {
    datasources: {
      project: {},
      fakeDate: {},
    },
    stack: {},
    loadingRequest: false,
  },
  frontend: {
    ui: {
      mounted: false,
      loadingProject: false,
      loadingRequest: false,
    },
    formEMpleado: {
      nombre: {
        value: '',
        required: false,
      },
    },
    toolbar: {
      img: '',
      title: '',
    },
    toggleCerrarSesion: false,
    toggleFavoritos: false,
    configuracion: [],
    favoritos: [],
  },
};
