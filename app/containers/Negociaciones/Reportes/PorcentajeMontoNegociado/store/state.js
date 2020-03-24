export default {
  backend: {
    datasources: {
      plazas: [],
      familys: [],
      negotiatedAmounts: {
        Headers: [
          { Label: 'Sub-Familia', Name: 'SubFamilia', Align: 'left', Type: 'string', Static: true},
          { Label: 'Por negociar', Name: 'PorNegociar', Align: 'right', Type: 'money', Static: true},
          { Label: 'Negociado', Name: 'Negociado', Align: 'right', Type: 'money', Static: true},
          { Label: '% avance', Name: 'PorcentajeAvance', Align: 'right', Type: 'percent', Static: true},
          { Label: 'Sum. Vol. Ene.', Name: 'SumVolEnero', Align: 'right', Type: 'money', Static: false}, 
          { Label: 'Sum. Vol. Feb.', Name: 'SumVolFebrero', Align: 'right', Type: 'money', Static: false},  
          { Label: 'Sum. Vol. Mar.', Name: 'SumVolMarzo', Align: 'right', Type: 'money', Static: false},  
          { Label: 'Sum. Vol. Abr.', Name: 'SumVolAbril', Align: 'right', Type: 'money', Static: false},  
          { Label: 'Sum. Vol. May.', Name: 'SumVolMayo', Align: 'right', Type: 'money', Static: false},  
          { Label: 'Sum. Vol. Jun.', Name: 'SumVolJunio', Align: 'right', Type: 'money', Static: false},  
          { Label: 'Sum. Vol. Jul.', Name: 'SumVolJulio', Align: 'right', Type: 'money', Static: false},  
          { Label: 'Sum. Vol. Ago.', Name: 'SumVolAgosto', Align: 'right', Type: 'money', Static: false},  
          { Label: 'Sum. Vol. Sep.', Name: 'SumVolSeptiembre', Align: 'right', Type: 'money', Static: false},  
          { Label: 'Sum. Vol. Oct.', Name: 'SumVolOctubre', Align: 'right', Type: 'money', Static: false},  
          { Label: 'Sum. Vol. Nov.', Name: 'SumVolNoviembre', Align: 'right', Type: 'money', Static: false},  
          { Label: 'Sum. Vol. Dic.', Name: 'SumVolDiciembre', Align: 'right', Type: 'money', Static: false}, 
        ],
        Rows: [],
      },
    },
  },
  frontend: {
    ui: {
      plazaSelected: 0,
      familySelected: 0,
      spinner: false,
    },
  },
};
