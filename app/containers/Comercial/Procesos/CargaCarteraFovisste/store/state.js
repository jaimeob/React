export default {
  backend: {
    currentDate: {
      Year: 1990,
      Week: 90,
    },
    weeks: [],
    months: [],
    plazas: [],
    layout: {
      content: [],
      layoutName: "Descarga",
      typeLoadId: 0,
    },
    listGeneral: [],
  },
  frontend: {
    ui: {
      selectedPlaza: 0,
      selectedWeek: 0,
      selectedMonth: 0,
      selectedDay: 0,
      modalContentLayout: false,
      modalCargaBase: false,
      modalLoadDetails: false,
      iconViewExplotion: false,
    },
    fileLoad: {
      cols: [],
      rows: [],
      name: '',
      size: 0,
    },
    validatedFile: false,
    currentTypeLoad: 0,
    periodicity: null,
  },
};
