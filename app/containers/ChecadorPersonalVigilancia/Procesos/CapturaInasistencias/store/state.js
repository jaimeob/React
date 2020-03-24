/*
const EMPRESAS = [
  { EmpresaId: 1, Nombre: "PROMOTORA SINALOENSE DE VIVIENDA"},
  { EmpresaId: 2, Nombre: "Famex"},
  { EmpresaId: 10, Nombre: "FINAMO"},
]

const PLAZAS = [
  { PlazaId: 1, Nombre: "CABO SAN LUCAS"},
  { PlazaId: 2, Nombre: "CULIACAN"},
  { PlazaId: 3, Nombre: "ENSENADA"},
]
*/
/*
const FILES_DUMMI = [
  {name: "archivo1aaaaaaaaaaaaaaaaaaa", otraprop: 1},
  {name: "archivo2aaaa", otraprop: 1},
  {name: "archivo3aaaaaaaaaaaaaaaaaaaaa", otraprop: 1},
  {name: "archivo4", otraprop: 1},
  {name: "archivo4", otraprop: 1},
  {name: "archivo4", otraprop: 1},
  {name: "archivo4", otraprop: 1},
  {name: "archivo4", otraprop: 1},
]
*/

export default {
  selectedStep: 0,
  topbarTitle: "Captura de Inasistencias",
  backend: {
    companys: [],
    plazas: [],
    weekData: {},
  },
  frontend: {
    companySelected: 0,
    plazaSelected: 0,
    absence: '',
    filesReady: [],
    dialogClean: false,
    required: {
      companysFill: true,
      plazasFill: true,
      absenceFill: true,
      filesFill: true,
    },
  },
};