/*
const DUMMY_ANIOS = [
  2016,
  2017,
]

const DUMMY_FAMILYS = [
  {Id: 1, Clave: 'ObraNegra', Nombre: "Obra Negra" },
  {Id: 2, Clave: 'ObraBlanca', Nombre: "Obra Blanca" },
]

const DUMMY_DATOS_GNRL = {
  ObraBlanca: {
    Porcentaje: -8.6,
    Anterior: 100000.20,
    Actual: 1512515.55,
    Diferencia: 216542.28,
  },
  ObraNegra: {
    Porcentaje: 8.6,
    Anterior: 100000.20,
    Actual: 1512515.55,
    Diferencia: 216542.28,
  },
  TotalEdificacion: {
    Porcentaje: 0.0,
    Anterior: 100000.20,
    Actual: 1512515.55,
    Diferencia: 216542.28,
  },
}
*/

const COLUMNS_TABLE = [
  {
    id: "Nombre",
    disablePadding: false,
    label: "Sub-Familia",
    direction: 'left',
  },
  { id: "Anterior", disablePadding: false, label: "Convenio Anterior", direction: 'right' },
  { id: "Actual", disablePadding: false, label: "Convenio Actual", direction: 'right' },
  { id: "Diferencia", disablePadding: false, label: "Diferencia", direction: 'right' },
  { id: "Porcentaje", disablePadding: false, label: "% Impacto", direction: 'center' },
]

export default {
  topbarTitle: "% de Impacto",
  stepper: {
    selectedStep: 0,
    // totalSteps: 2,
  },
  generalScreen: {
    years: [],
    yearSelected: 0,
    porcentImpact: 0.00,
    generalFamily: [],
    generalData: {},
    progressActive: false,
  },
  detailScreen:{
    familySelected: -1,
    nameFamily: '',
    columns: COLUMNS_TABLE,
    rows: [],
    activeSearch: false,
    searchText: '',
    progressTableActive: false,
    openConfirmation: false,
  },
};