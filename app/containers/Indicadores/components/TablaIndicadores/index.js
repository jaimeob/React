
import React from 'react';
import T from 'prop-types';
// import styled from 'styled-components';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import {isObject, isEqual} from 'lodash'
import MUIDataTable from '@isaacoze/mui-datatables';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import ToolbarTabla from 'components/ToolbarTabla';
import SinResultados from 'images/iconos/sinresultados.png';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from 'images/iconos/edit.svg';
import EditIconColor from 'images/iconos/editColor.svg';
import DeleteIcon from 'images/iconos/delete.svg';
import DeleteIconColor from 'images/iconos/deleteColor.svg';
import RedirigirIcon from 'images/iconos/redirigir.svg';
import RedirigirIconColor from 'images/iconos/redirigirColor.svg';

import './styles.css';

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
          padding: 0,
          textAlign: 'center',
          // '&:nth-child(2)': {
          //   width: 70,
          //   backgroundColor:'#4dce56',
          // },
        },
        sortAction: {
          display: 'none',
        },
      },
      MuiTableCell: {
        root: {
          '&:last-child': {
            padding: '0px !important',
            paddingRight:  null,
            textAlign: 'center',
          },
          padding: null,
          // backgroundColor: '#263238',
        },
        body:{
          padding:'0px !important',
        },
      },
      MuiTableRow:{
        root: {
          '&$hover': {
            '&:hover':{
              '& .DataTableopciones': {
                opacity: 1,
              },
            },
          },
        },
        hover: {},
      },
      MUIDataTableBodyCell:{
        root: {
          textAlign: 'center',
          padding: 16,
        },
      },
      MUIDataTableToolbar: {
        root: {
          width: '100%',
          justifyContent: 'flex-end',
          backgroundColor: '#263238',
          minHeight: '1px',
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
      // MuiSvgIcon:{
      //   path: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
          
      // },
    },
  });



const subEditar = (params, id, admin, onClickButton, temp) => (
  
  
  <div className={admin ? 'DataTableopciones' : ''}>
  
    {params.map((elem) => {
      switch(elem.icon) {
        case 'eliminar' : return <Tooltip key='buttonBorrar' title="Borrar"><IconButton tooltip="Borrar" onClick={onClickButton(elem.action, temp || id)} style={{padding: 8}}><img src={admin ? DeleteIcon : DeleteIconColor } alt="" /></IconButton></Tooltip>
        case 'editar' : return <Tooltip key='buttonEditar' title="Editar"><IconButton tooltip="Editar" onClick={onClickButton(elem.action, id)} style={{padding: 8}}><img src={admin ? EditIcon : EditIconColor } alt="" /></IconButton></Tooltip>
        case 'ver' : return <Tooltip key='ButtonVer' title="Ver Detalle"><IconButton tooltip="Ver" onClick={onClickButton(elem.action, id)} style={{padding: 8}}><img src={admin ? RedirigirIcon : RedirigirIconColor} alt="" /></IconButton></Tooltip>
        default : return null;
      }})}
  </div>
)

class DataTable extends React.Component {
  
  shouldComponentUpdate(nextProps){
    return !isEqual(this.props.data , nextProps.data);
  }
  
  render() {
    
    const {
      data,
      headers,
      configuracion,
      opciones,
      idPosition,
      admin,
      onClickButton,
      message,
      temporal,
      // eslint-disable-next-line react/prop-types
      onClickAgregar,
      getMuiThemeProps,
    } = this.props;

    const options = {
      pagination:false,
      sort: false,
      filter : configuracion.filtro,
      search : configuracion.buscar != null ? configuracion.buscar : true,
      download : configuracion.descarga,
      viewColumns : configuracion.columnas,
      print : configuracion.imprimir,
      responsive: "stacked",
      selectableRows: configuracion.seleccionable,
      rowsPerPageOptions: configuracion.registrosPorPaginaMenu ? configuracion.registrosPorPaginaMenu : [5,10,25],
      rowsPerPage: configuracion.registrosPorPagina ? configuracion.registrosPorPagina : 5,
      textLabels: {
        body: {
          noMatch: <React.Fragment><img
            key="imagenKey"
            src={SinResultados}
            style={{ width:'100px',height: '100px'}}
            alt="logo-Pfd"
          />No se encontraron coincidencias</React.Fragment>,
          toolTip: "Ordenar",
        },
        // pagination: {
        //   // next: "Siguiente",
        //   // previous: "Anterior",
        //   // rowsPerPage: "Registros por página:",
        //   displayRows: "de",
        // },
        
        toolbar: {
          search: "Búsqueda",
          filterTable: "Filtrar Tabla",
        },
        selectedRows: {
          text: "Registros(s) seleccionados",
          delete: "Eliminar",
          deleteAria: "Eliminar registros seleccionados",
        },
        filter: {
          all: "Todos",
          title: "Filtros",
          reset: "Limpiar",
        },

        
      },
      customToolbar: () => 
        <ToolbarTabla
          onClickAgregar = {onClickAgregar}
          message={message}
        />
      ,
      customToolbarSelect: (selectedRows, displayData) => 
        <ToolbarTabla
          rows={selectedRows}
          data={displayData}
          onDelete= {this.props.onDeleteSelected}
          message={message}
        />
      ,
      onRowsDelete: this.props.onRowsDelete ? this.props.onRowsDelete : null,
      onRowsSelect: this.props.onRowsSelect,
    };
    for( let i = 0; i < data.length; i+=1){
      if(!isObject(data[i][data[i].length - 1])){
        data[i].options = subEditar(
          opciones, 
          data[i][idPosition], 
          admin, 
          onClickButton,
          temporal ? i : null
        );
      }
    }
    
    return (
      
      <Grid 
        item
        xs={12} 
        sm={12} 
        md={12} 
        lg={12} 
        style={{
          width: '100%',
        }}
      >
        <MuiThemeProvider theme={getMuiThemeProps}>
          <MUIDataTable
            // theme={getMuiTheme}
            data={data}
            columns={headers}
            options={options}
          />
        </MuiThemeProvider>
      </Grid>
    );
  }
}

DataTable.propTypes = {
  data: T.array,
  headers: T.array,
  configuracion: T.object,
  opciones: T.array,
  idPosition: T.string,
  admin: T.bool,
  onClickButton: T.func,
  onRowsDelete : T.func,
  onRowsSelect : T.func,
  onDeleteSelected: T.func,
  message: T.string,
  temporal: T.bool,
};

export default compose(
  withHandlers({
    onClickButton: () => (action, id) => () => {
      action(id)
    },
    onDeleteSelected: (props) => (rows) => {
      const {
        idPosition,
        onDelete,
      } = props;
      const arregloIds = rows.map((ele) => ele.data[idPosition]);
      onDelete(arregloIds);
    },
  })
)(DataTable);
