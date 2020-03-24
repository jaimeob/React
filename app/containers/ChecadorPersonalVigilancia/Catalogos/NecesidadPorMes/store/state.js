export default {
  backend: {
    datasources: {
      companys: [],
      plazas: [],
      years:[],
      currentDate: {
        Year: 1990,
        Week: 90,
      },
      needs: [],
      specialService: {
        quantity: 0,
        status: false,
      },
    },
  },
  frontend: {
    ui: {
      selectedCompany: 0,
      selectedYear: 0,
      selectedNeed: 0,
      selectedPlaza: 0,
      typeNeedSelected:0,
      reason: '',
      modal: false,
      modalReasonChange: false,
    },
    specialService: {
      quantity: 0,
      status: false,
    },
    steps: {
      last: 0,
      current: 0,
    },
    needPlazaSelected: {
      IdPlaza:0,
      Nombre:'',
      IdMes:0,
      NombreMes:'',
      Meses: {},
      necesidad:0,
      especialActivo: false,
      especial:0,
      motivoEdita:'',
    },
    month: 99,
    poolData: {
      IdPlaza:0,
      Nombre:'',
      IdMes:0,
      NombreMes:'',
      Meses: {},
      necesidad:0,
      especialActivo: false,
      especial:0,
      motivoEdita:"",
    },
    activeChanges: false,
  },
};