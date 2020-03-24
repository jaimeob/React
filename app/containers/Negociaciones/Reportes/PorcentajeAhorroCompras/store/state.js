const COLUMNS_TABLE = [
  {
    id: "NombrePlaza",
    disablePadding: false,
    label: "",
    direction: 'left',
  },
  { id: "VsBase", disablePadding: false, label: "Vs Base", direction: 'center' },
  { id: "VsConvenio", disablePadding: false, label: "Vs Convenio", direction: 'center' },
  { id: "Ahorro", disablePadding: false, label: "Ahorro", direction: 'center' },
  { id: "PorcentAhorro", disablePadding: false, label: "% Ahorro", direction: 'center' },
  { id: "ImporteCompra", disablePadding: false, label: "Compra", direction: 'center' },
]
/*
const ROWS_TABLE = [
  {
    Id: 1,
    NombrePlaza: 'primero',
    VsBase: 1000,
    VsConvenio: 1000,
    Ahorro: 1000,
    PorcentAhorro: 1000,
    ImporteCompra: 1000,
    PorcentCumplimiento: 100,
  },
  { Id: 2, NombrePlaza: 'segundo', VsBase: 2000, VsConvenio: 2000, Ahorro: 2000, PorcentAhorro: 2000, ImporteCompra: 2000, PorcentCumplimiento: 200 },
  { Id: 3, NombrePlaza: 'tercero', VsBase: 3000, VsConvenio: 3000, Ahorro: 3000, PorcentAhorro: 3000, ImporteCompra: 3000, PorcentCumplimiento: 300 },
  { Id: 4, NombrePlaza: 'cuarto', VsBase: 4000, VsConvenio: 4000, Ahorro: 4000, PorcentAhorro: 4000, ImporteCompra: 4000, PorcentCumplimiento: 400 },
  { Id: 5, NombrePlaza: 'quinto', VsBase: 5000, VsConvenio: 5000, Ahorro: 5000, PorcentAhorro: 5000, ImporteCompra: 5000, PorcentCumplimiento: 500 },
]
*/

export default {
  topbarTitle: "% de Ahorro",
  goalPorcent: 0,
  showInfo: false,
  progressActive: false,
  stepper: {
    selectedStep: 0,
    // totalSteps: 2,
  },
  dateStart: null,
  dateEnd: null,
  fechaInput: null,
  Table: {
    columns: COLUMNS_TABLE,
    rows: [],
  },
};