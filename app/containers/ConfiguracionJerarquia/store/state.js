const HEADERS = [
  { id: 'id', numeric: false, disablePadding: true, label: '#' },
  { id: 'NombreDepartamento', numeric: false, disablePadding: true, label: 'Departamento' },
  { id: 'FechaModificacion', numeric: false, disablePadding: true, label: 'Fecha Modificación' },
  { id: 'Archivo', numeric: false, disablePadding: true, label: '', show: false },
  { id: 'Estatus', numeric: false, disablePadding: true, label: 'Estatus' },
]

export default {
  stepper: 0,
  modalDelete: false,
  modalBack: false,
  permisos: {
    normales: {
      sololectura: 0,
      registrar: 0,
      editar: 0,
      eliminar: 0,
    },
    especiales: {},
  },
  listadoJerarquias: {
    backend: {
      data: [],
    },
    frontend: {
      rows: HEADERS,
      selectedItems: [],
    },
  },
  registrarJerarquia: {
    backend: {
      departments: [],
      positions: [],
    },
    frontend: {
      openModal: false,
      idJerarquia: 0,
      name: '',
      errorLabel: '',
      error: false,
      active: true,
      selectedDepartment: [],
      jerarquia: [],
      totalPositions: 0,
      imageFile: '',
    },
  },
};