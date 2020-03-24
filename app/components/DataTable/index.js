/**
 *
 * DataTable
 *
 */

import React from 'react';
import T from 'prop-types';
// import styled from 'styled-components';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import {isObject, isEqual, omit, parseInt} from 'lodash'
import MUIDataTable from '@isaacoze/mui-datatables';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ToolbarTabla from 'components/ToolbarTabla';
import SinResultados from 'images/iconos/sinresultados.svg';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from 'images/iconos/edit.svg';
import EditIconColor from 'images/iconos/editColor.svg';
import DeleteIcon from 'images/iconos/delete.svg';
import Nubesita from '@material-ui/icons/CloudDownload'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Reply from '@material-ui/icons/Reply'
import DeleteIconColor from 'images/iconos/deleteColor.svg';
import RedirigirIcon from 'images/iconos/redirigir.svg';
import RedirigirIconColor from 'images/iconos/redirigirColor.svg';
import './style.css';

const styles = () => ({
  root: {
    width: "100%",
    overflowX: "auto",
    height: '100%',
    flexGrow: 1,
  },
});

const getMuiTheme = (params) =>
  createMuiTheme({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      border: '1px solid #dadde9',
    },
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MuiCheckbox: {
        colorPrimary: {
          color: '#28950f',
          '&$checked': {
            color: '#28950f !important',
          },
        },
        colorSecondary: {
          color: '#28950f',
          '&$checked': {
            color: '#28950f !important',
          },
        },
      },
      DataTableopciones: {
        display: 'none',
      },
      MUIDataTable: {
        root: {},
        responsiveScroll: {
          height: params.height ? `${params.height}vh` : '100%',
          maxHeight: params.height ? `${params.height}vh` : '100%',
          overflowY: 'auto',
          backgroundColor: params.backgroundColor || 'initial',
        },
        responsiveScrollMaxHeight: {
          overflow: params.scrollBonito ? 'unset' : 'auto',
          overflowX: params.scrollBonito ? 'unset' : 'auto',
        },
      },
      // MUIDataTableFilterList: {
      //   backgroundColor: params.backgroundColor || 'initial',
      // },
      MUIDataTableHeadCell:{
        root: {
          fontSize:12,
          color:'#00000',
          padding: 16,
          textAlign: 'justify',
          // position: 'inherit !important',
          backgroundColor: params.backgroundColor || 'initial',
        },
        data: {
          color:'black',
        },
        sortAction: {
          whiteSpace: params.whiteSpace ? params.whiteSpace : 'initial',
        },
        fixedHeader: {
          backgroundColor: params.backgroundColor || 'initial',
          position: params.noFixed ? 'initial' : 'sticky',
        },
      },
      MuiToolbar: {
        root: {
          display: !params.sinToolbar ? 'flex' : 'none !important',
          backgroundColor: params.backgroundColor || 'initial',
        },
      },
      MUIDataTableSelectCell: {
        headerCell: {
          backgroundColor: params.backgroundColor || 'initial',
        },
      },
      MUIDataTableFilter:{
        reset: {
          width: '100%',
        },
        resetLink: {
          marginRight: 20,
        },
      },
      MuiTableCell: {
        root: {
          '&:last-child': {
            padding: 8,
            paddingRight:  null,
            textAlign: 'center',
          },
          '&:first-child': {
            paddingLeft: 16,
            backgroundColor: params.backgroundColor || 'initial',
          },
          padding: 16,
        },
        
        paddingCheckbox: {
          backgroundColor: params.backgroundColor || 'initial',
          width: '1%',
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
        footer: {
          backgroundColor: params.backgroundColor || 'initial',
        },
      },
      MuiPaper: {
        root:{
          backgroundColor: params.backgroundColor || 'white',
        },
      },
      MuiTableFooter: {
        root: {
          border: 'none',
        },
      },
      MuiTableBody: {
        root: {
          border: 'none',
        },
      },
      MuiTableHead: {
        root: {
          border: 'none',
        },
      },
      MUIDataTableBodyCell:{
        root: {
          backgroundColor: params.backgroundColor || 'initial',
          fontSize:11,

        },
      },
      MUIDataTableToolbar: {
        root: {
          width: '100%',
          justifyContent: 'flex-end',
          display:  params.mostrarBarra != null ? 'none' : 'flex',
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
      numeric: {
        textAlign: 'right !important',
        color: 'red',
      },
    },
  });



const subEditar = (params, id, admin, onClickButton, temp, info) => (
  
  
  <div className={admin ? 'DataTableopciones' : ''}>
    {params.map((elem) => {
      switch(elem.icon) {
        case 'eliminar' : return <Tooltip key='buttonBorrar' title="Borrar"><IconButton tooltip="Borrar" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><img src={admin ? DeleteIcon : elem.gris ? DeleteIcon : DeleteIconColor } alt="" /></IconButton></Tooltip>
        case 'editar' : return <Tooltip key='buttonEditar' title="Editar"><IconButton tooltip="Editar" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><img src={admin ? EditIcon :  elem.gris ? EditIcon : EditIconColor} alt="" /></IconButton></Tooltip>
        case 'ver' : return <Tooltip key='ButtonVer' title="Ver Detalle"><IconButton tooltip="Ver" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><img src={admin ?  RedirigirIcon : elem.gris ? RedirigirIcon : RedirigirIconColor  } alt="" /></IconButton></Tooltip>
        case 'descargar' : return <Tooltip key='buttonDescargar' title="Descargar archivo"><IconButton tooltip="Descargar" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><Nubesita style={{color: '#28950F'}}/></IconButton></Tooltip>
        case 'regresar' : return <Tooltip key='buttonRegresar' title="Devolver"><IconButton tooltip="Devolver" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><Reply/></IconButton></Tooltip>
        case 'informacion' : return info ? <Tooltip key='tooltipMesagge' placement="top" title={elem.message}><IconButton tooltip="Tooltip" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><ErrorOutlineIcon style={{fill: 'red'}}/></IconButton></Tooltip> : null
        case 'responder' : return <Tooltip key='buttonResponder' title="Responder"><IconButton tooltip="Ver" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><img src={admin ?  RedirigirIcon : elem.gris ? RedirigirIcon : RedirigirIconColor  } alt="" /></IconButton></Tooltip>
        default : return null;
      }})}
  </div>
)

class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {bandFiltros : false, preBand : true};
    this.showFiltros = this.showFiltros.bind(this);
  }

  showFiltros() {
    const {
      bandFiltros,
    } = this.state;
    this.setState({bandFiltros: !bandFiltros, preBand : bandFiltros})
  }

  shouldComponentUpdate(nextProps){
    const datos = [];
    const datos2 = [];
    for (let i = 0; i < this.props.data.length; i+=1) {
      datos.push(omit(this.props.data[i], ['options']))
      datos2.push(omit(nextProps.data[i], ['options']))
    }

    return !isEqual(datos, datos2) || (isEqual(datos, datos2) &&
      this.state.bandFiltros !== this.state.preBand);
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
      filtros,
      menuItemUno,
      exportar,
      menuItemDos,
      onClickAgregar,
      nomCsv,
      nombreHoja,
      onClickexportar,
      width,
      scrollBonito,
      params,
      elevacion,
      onDelete,
      onClonar,
      onClickDescargar,
      mensajeTexto,
      mostrarBarra,
      permisos,
    } = this.props;

    const mostrarToolbar = mostrarBarra != null ? mostrarBarra : true
    // const columns = [
    //   {
    //    name: "Name",
    //    options: {
    //     filter: true,
    //     sort: false
    //     customBodyRender: (value,tableMeta) => {
    //       tableMeta.selectedRows=this.props.selectedRows
    //       return tableMeta
    //     },
    //    }
       
    //   },

    //  ];

    const options = {
      filter: configuracion.filtro,
      filterType: configuracion.filterType,
      search: configuracion.buscar != null ? configuracion.buscar : true,
      searchText: typeof configuracion.textoBusqueda !== 'undefined' ? configuracion.textoBusqueda : '',
      download: configuracion.descarga,
      viewColumns: configuracion.columnas,
      print: configuracion.imprimir,
      elevation: elevacion >= 0 && elevacion !== null ? elevacion : 4,
      responsive: configuracion.responsivo || "stacked",
      pagination: typeof configuracion.paginado !== 'undefined' ? configuracion.paginado  : true,
      expandableRows: configuracion.expandible,
      selectableRows: configuracion.seleccionable,
      selectAllDisabled: configuracion.deshabilitarSeleccionMultiple,
      disableToolbarSelect:typeof configuracion.disableToolbar !== 'undefined' ? configuracion.disableToolbar  : true,
      rowsPerPageOptions: configuracion.registrosPorPaginaMenu ? configuracion.registrosPorPaginaMenu : [5,10,25],
      rowsPerPage: configuracion.registrosPorPagina ? configuracion.registrosPorPagina : 5,
      sort: configuracion.ordenar,
      size:'small',
      textLabels: {
        body: {
          noMatch: 
          <Grid 
            key='gridPrincipalSinResultados'
            container 
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid
              key='gridSecundarioSinResultados'
            >
              <img
                // key="imagenKey"
                src={SinResultados}
                style={{ width:'200px',height: '175px'}}
                alt="logo-Pfd"
              />
            </Grid>
            <Grid
              key='gridTextoSinResultados'
            >
              {
                mensajeTexto || 'No se encontraron coincidencias'
              }
            </Grid>
          </Grid>,
          toolTip: "Ordenar",
        },
        pagination: {
          next: "Siguiente",
          previous: "Anterior",
          rowsPerPage: "Registros por página:",
          displayRows: "de",
        },
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
      // ctmcomment
      customToolbar: () => 
        mostrarToolbar ?  <ToolbarTabla
          onClickAgregar = {typeof permisos !== 'undefined' && permisos.normales.registrar === 1 ? onClickAgregar : null}
          message={message}
          showFiltros={this.showFiltros}
          filtros = {filtros}
          filtrosWidth = {width}
          nombreHoja= {nombreHoja}
          onClickDescargar={onClickDescargar}
          onClickExportar= {onClickexportar}
        /> : null
      ,
      customToolbarSelect: (selectedRows, displayData) => 
        mostrarToolbar ? <ToolbarTabla
          rows={selectedRows}
          displayData={displayData}
          exportar = {exportar}
          data={this.props.data}
          onMenuClick={this.props.onMenuClick}
          menuItemUno={menuItemUno}
          menuItemDos={menuItemDos}
          headers={headers}
          onDelete= {onDelete ? this.props.onDeleteSelected : null}
          message={message}
          nomCsv={nomCsv}
          onClonar={onClonar}
        /> : null
      ,
      onRowsDelete: this.props.onRowsDelete ? this.props.onRowsDelete : null,
      onRowsSelect: this.props.onRowsSelect,  
      onSearchChange: this.props.onSearchChange,  
      rowsSelected: this.props.rowsSelected,
      
    };
    if(opciones)
      for( let i = 0; i < data.length; i+=1){
        if(!isObject(data[i][data[i].length - 1])){
          data[i].options = subEditar(
            opciones, 
            data[i][idPosition], 
            admin,
            onClickButton,
            temporal ? i : null,
            data[i].info
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
        style={{padding: params.padding >= 0 ? `${params.padding}px` : '8px'}}
      >
        <Paper
          elevation = {elevacion >= 0 && elevacion !== null ? elevacion : 0}
          // style={{height: `${height}vh`}}
          // className={classes.root}
          // id={scrollBonito ? 'PaperMuiDatatable' : ''}
        >
          {this.state.bandFiltros ? filtros : null}
          <MuiThemeProvider theme={getMuiTheme(params)}>
            <MUIDataTable 
              theme={getMuiTheme}
              data={data}
              columns={headers}
              options={options}
              style = {{backgroundColor:'red'}}
            />
          </MuiThemeProvider>
        </Paper>
      </Grid>
    );
  }
}

DataTable.defaultProps = {
  params: {
    height: '',
    backgroundColor: 'white',
  },
}

DataTable.propTypes = {
  data: T.array,
  headers: T.array,
  configuracion: T.object,
  opciones: T.array,
  idPosition: T.string,
  admin: T.bool,
  exportar: T.bool,
  onClickButton: T.func,
  onRowsDelete : T.func,
  onRowsSelect : T.func,
  onSearchChange: T.func,
  scrollBonito: T.bool,
  gris: T.bool,
  // rowSeleccionado : T.number,
  onDeleteSelected: T.func,
  onMenuClick: T.func,
  onClickAgregar: T.func,
  message: T.string,
  temporal: T.bool,
  filtros: T.any,
  menuItemUno: T.any,
  menuItemDos: T.any,
  nomCsv: T.string,
  width: T.string,
  nombreHoja: T.string,
  onClickexportar: T.func,
  onClonar: T.func,
  onClickDescargar: T.func,
  mensajeTexto: T.string,
  onDelete: T.func,
  mostrarBarra: T.bool,
  params: T.shape({
    height: T.string,
    backgroundColor: T.string,
  }),
  elevacion: T.number,
  rowsSelected: T.array,
  permisos: T.object,
};

export default compose(
  withStyles(styles),
  withHandlers({
    onClickButton: () => (action, id) => () => {
      action(id)
    },
    onDeleteSelected: (props) => (rows) => {
      
      const {
        idPosition,
        onDelete,
      } = props;
      const arregloIds = rows.map((ele) => ele[idPosition]);
      onDelete(arregloIds);
    },
    onMenuClick: (props) => (rows, id) => {
      const {
        idPosition,
      } = props;
      const arregloIds = rows.map((ele) => ele[idPosition]);

      if(parseInt(id) === 1){
        const {
          onItemUno,
        } = props;
        onItemUno(arregloIds)
      } else {
        const {
          onItemDos,
        } = props;
        onItemDos(arregloIds);
      }
    },
  })
)(DataTable);