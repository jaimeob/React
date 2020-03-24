import { createMuiTheme } from "@material-ui/core/styles";

const getMuiTheme = () =>
  createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    overrides: {
      DataTableopciones: {
        display: 'none',
      },
      MUIDataTable: {
        responsiveScroll: {
          height: '100%',
          maxHeight: '499px',
          overflowY: 'auto',
        },
      },
      MUIDataTableHeadCell:{
        root: {
          padding: 16,
          textAlign: 'justify',
        },
        sortAction: {
          display: 'none',
        },
      },
      MuiTableCell: {
        root: {
          '&:last-child': {
            padding: 8,
            paddingRight:  null,
          },
          padding: null,
        },
      },
      MuiTableRow:{
        root: {
          '&$hover': {
            '&:hover':{
              '& .DataTableopciones': {
                opacity: 1,
              },
             // boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.75)'
            },
          },
        },
        hover: {},
      },
      MUIDataTableBodyCell:{
        root: {
          textAlign: 'justify',
          padding: 16,
        },
      },
      MUIDataTableToolbar: {
        root: {
          width: '100%',
          justifyContent: 'flex-end',
        },
        actions: {
          flex: '0',
          display: 'inherit',
        },
        left: {
          flex: '-1',
          width: '35%',
        },
      },
      MuiCheckbox: {
        root: {
          '&$checked': {
            color: '#28950F !important'
          },
          color: '#28950F'
        },
      },
      MUIDataTableToolbarSelect: {
       root:{
         //display: 'none',
        justifyContent: 'flex-end',
        boxShadow: 'none !important',
        backgroundColor: 'white !important',
        padding: '0 24px',
       },
       title: {
         color: 'transparent'
       }
      },
    },
  });

export default getMuiTheme;