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
      selectedDay: null,
      focusedDay: false,
      modalContentLayout: false,
      modalCargaBase: false,
      modalLoadDetails: false,
      modalLoadingErrors: false,
      iconViewExplotion: false,
    },
    fileLoad: {
      cols: [],
      rows: [],
      name: '',
      size: 0,
    },
    loadingErrors: {
      colsLayout: [],
      rowsLoaded: [],
      rowsErrors: [],
    },
    validatedFile: false,
    currentTypeLoad: 0,
    periodicity: null,
  },
};
