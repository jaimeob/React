/*
 *
 * ReporteAsistencia constants
 *
 */

export const DEFAULT_ACTION = 'app/ReporteAsistencia/DEFAULT_ACTION';

export const REPORT_LIST = {
  headers: [
    {
      name: 'NombreEmpresa',
      label: 'Empresa',
      align:'left',
      type: 'string',
    },
    {
      name: 'NombrePlaza',
      label: 'Plaza',
      align:'left',
      type: 'string',
    },
    {
      name: 'SemanaInicioFin',
      label: 'Semana',
      align:'left',
      type: 'string',
    },
    {
      name: 'Necesidad',
      label: 'Necesidad',
      align:'center',
      type: 'int',
    },
    {
      name: 'Asistencia',
      label: 'Asistencias',
      align:'center',
      type: 'int',
    },
    {
      name: 'ServicioEspecial',
      label: 'Ser. Esp.',
      align: 'center',
      type: 'int',
    },
    {
      name: 'Inasistencia',
      label: 'Inasistencias',
      align:'center',
      type: 'int',
    },
    {
      name: 'PorcentajeCumplimiento',
      label: '% cumplimiento',
      align:'center',
      type: 'percent',
    },
  ],
}