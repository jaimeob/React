// const DUMMY_LIST_FORMS = {
//   assigns:[
//     { id: '123456789',
//       nombre: 'Administración',
//       open: true,
//       fomularios: [
//         { id: '123456789', nombre: 'uno'},
//         { id: '323456789', nombre: 'tres'},
//         { id: '43456789', nombre: 'cuatro'},
//       ]},
//     { id: '223456789',
//       nombre: 'Finanzas',
//       open: true,
//       fomularios: [
//         { id: '223456789', nombre: 'dos'},
//       ]},
//     { id: '323456789',
//       open: true,
//       nombre: 'Sistemas',
//       fomularios: [
//         { id: '523456789', nombre: 'cinco'},
//         { id: '623456789', nombre: 'seis'},
//       ]},
//     { id: '423456789',
//       nombre: 'Recursos Humanos',
//       open: true,
//       fomularios: [
//         { id: '723456789', nombre: 'siete'},
//         { id: '823456789', nombre: 'ocho'},
//         { id: '93456789', nombre: 'nueve'},
//       ]},
//     { id: '523456789',
//       nombre: 'Finanzas',
//       open: true,
//       fomularios: [
//         { id: '133456789', nombre: 'diez'},
//       ],
//     },
//   ],
//   finished : [
//     { id: '423456789',
//       nombre: 'Recursos Humanos',
//       open: true,
//       fomularios: [
//         { id: '723456789', nombre: 'siete'},
//         { id: '823456789', nombre: 'ocho'},
//         { id: '93456789', nombre: 'nueve'},
//       ]},
//     { id: '523456789',
//       nombre: 'Finanzas',
//       open: true,
//       fomularios: [
//         { id: '133456789', nombre: 'diez'},
//       ],
//     },
//   ],
// }

export default {
  backend: {
    datasources: {
      assignedForms: [],
    },
    request:{
    },
  },
  frontend: {
    selectedUser: {},
    selectedForm: {},
    ui: {
      openModalFormulario: false,
      loadingSaveChanges: false,
    },
    tabs: {
      indexTab: 0,
    },
    list: {
      data:{
        assigns: [],
        finished: [],
        users: [],
      },
    },
    search: {
      searchActive: false,
      textSearch: '',
    },
    forms: {
      nombreListado: {
        value: '',
      },
    },
  },
}
