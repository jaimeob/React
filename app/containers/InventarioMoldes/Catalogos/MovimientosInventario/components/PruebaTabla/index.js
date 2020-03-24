import MUIDataTable from '@isaacoze/mui-datatables';

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";


const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiCheckbox: {
        colorSecondary: {
          color: '#28950f',
          '&$checked': {
            color: '#28950f !important',
          },
        },
      },
    },
  });


const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "company",
    label: "Company",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "city",
    label: "City",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "state",
    label: "State",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
];

const options = {
  filterType: 'dropdown',
};

function PruebaTabla(props){

  return (
    <div>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title="Employee List"
          data={data}
          columns={columns}
          options={options}
          onRowsSelect = {props.onRowsSelect}
          style={{
            border: '1px solid black',
            borderRadius: '5px!important',
          }}
        />
      </MuiThemeProvider>
    </div>    
  );
}

PruebaTabla.propTypes = {
};

export default (PruebaTabla);
