import { Record, List, Map as IMMap } from 'immutable';

export const ComponentType = Record({
  id: '',
  nombre: '',
  tipo: '',
  icon: '',
}, 'ComponentType')


export const FileMeta = Record({
  size: 0,
  type: '',
  buffer: '',
  url: '',
  id: '',
}, 'FileMeta');

export const Opcion = Record({
  id: '',
  valor: '',
  label: '',
  icon: '',
}, 'Opcion');

export const TableRows = Record({
  id: '',
  isGroup: false,
  groupText: '',
  groupId: '',
  groupLabelText: '',
  backgroundColor: '',
  data: List(),
})

export const TableCols = Record({
  id: '',
  name: '',
  textAlign: '',
  dataType: '',
  label: '',
  valor: '',
  placeholder: '',
  autoincrement: false,
  options: List(),
  optionsText: '',
  fileType: '',
  fileSize: '',
  fileLimit: 1,
}, 'TableCols')

/*


*/

// TODO: Inserta este record como valor por defecto de los inpputs
export const ComponentTemplate = Record({
  id: '',
  nomCampo: '',
  componentId: '',
  tipo: '',
  label: '',
  dataType: '',
  textAlign: '',
  placeholder: '',
  valor: '', // cambiar por valor
  requerido: false,
  longitudMinima: '',
  longitudMaxima: '',
  icon: '',
  configured: true, // cambiar por falso
  errors: IMMap({
    required: '',
    longitudMinima: '',
    longitudMaxima: '',
  }),
  optionsText: '',
  increment: 0,
  tableCols: List(),
  tableRows: List(),
  options: List(),
  files: List(),
  fileType: '',
  fileSize: '',
  fileLimit: 1,
  order: 0,
}, 'ComponentTemplate');

export default {
  FileMeta,
  Opcion,
  ComponentTemplate,
  ComponentType,
}