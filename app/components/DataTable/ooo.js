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
import Cloud from '@material-ui/icons/CloudDownload';
import EditIcon from 'images/iconos/edit.svg';
import EditIconColor from 'images/iconos/editColor.svg';
import DeleteIcon from 'images/iconos/delete.svg';
import Nubesita from '@material-ui/icons/CloudDownload'
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
    
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MuiCheckbox: {
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
          height: params.height ? `${params.height}vh` : '100%',
          overflow: 'auto',
          overflowX: 'auto',
          backgroundColor: params.backgroundColor || 'initial',
          maxHeight: params.height ? `${params.height}vh` : '499px',
        },
      },
      // MUIDataTableFilterList: {
      //   backgroundColor: params.backgroundColor || 'initial',
      // },
      MUIDataTableHeadCell:{
        root: {
          fontSize: params.cabecerasFontS || 12,
          whiteSpace: params.whiteSpace || 'initial',
          color:'#00000',
          padding: 16,
          textAlign: 'justify',
          // position: 'inherit !important',
          backgroundColor: params.cabecerasColor || params.backgroundColor || 'initial',
        },
        data: {
          color:'black',
        },
        sortAction: {
          display: 'none',
        },
        fixedHeader: {
          backgroundColor: params.cabecerasColor || params.backgroundColor || 'white',
        },
      },
      MuiToolbar: {
        root: {
          display: !params.sinToolbar ? 'initial' : 'none',
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
            backgroundColor: params.cabecerasColor || params.backgroundColor || 'initial',
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
      // MUIDataTableToolbarSelect: {
      //   root: {
      //     display:'none',
      //   },
      // },
      numeric: {
        textAlign: 'right !important',
        color: 'red',
      },
    },
  });



const subEditar = (params, id, admin, onClickButton, temp) => (
  
  
  <div className={admin ? 'DataTableopciones' : ''}>
  
    {params.map((elem) => {
      switch(elem.icon) {
        case 'eliminar' : return <Tooltip key='buttonBorrar' title="Borrar"><IconButton tooltip="Borrar" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><img src={admin ? DeleteIcon : DeleteIconColor } alt="" /></IconButton></Tooltip>
        case 'editar' : return <Tooltip key='buttonEditar' title="Editar"><IconButton tooltip="Editar" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><img src={admin ? EditIcon : EditIconColor } alt="" /></IconButton></Tooltip>
        case 'ver' : return <Tooltip key='ButtonVer' title="Ver Detalle"><IconButton tooltip="Ver" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><img src={admin ? RedirigirIcon : RedirigirIconColor} alt="" /></IconButton></Tooltip>
        case 'descargar' : return <Tooltip key='buttonDescargar' title="Descargar archivo"><IconButton tooltip="Ver" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><Nubesita style={{color: '#28950F'}}/></IconButton></Tooltip>
        case 'regresar' : return <Tooltip key='buttonRegresar' title="Devolver"><IconButton tooltip="Devolver" onClick={onClickButton(elem.action, temp >= 0 && temp !== null ? temp : id)} style={{padding: 8}}><Reply/></IconButton></Tooltip>
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
      params,
      elevacion,
      onClonar,
      onClickDescargar,
      mensajeTexto,
      scrollBonito,
    } = this.props;

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


    // Quiza estoy ya no es necesario...
    // let rowSeleccionado
    // if (this.props.rowSeleccionado !== undefined) {
    //   // eslint-disable-next-line prefer-destructuring
    //   rowSeleccionado=this.props.rowSeleccionado
    // }
    
    

    const options = {
      filter: configuracion.filtro,
      filterType: configuracion.filterType,
      search: configuracion.buscar != null ? configuracion.buscar : true,
      download: configuracion.descarga,
      viewColumns: configuracion.columnas,
      print: configuracion.imprimir,
      elevation: elevacion >= 0 && elevacion !== null ? elevacion : 4,
      responsive: configuracion.responsivo || "stacked",
      pagination: typeof configuracion.paginado !== 'undefined' ? configuracion.paginado  : true,
      expandableRows: configuracion.expandible,
      selectableRows: configuracion.seleccionable,
      rowsPerPageOptions: configuracion.registrosPorPaginaMenu ? configuracion.registrosPorPaginaMenu : [5,10,25],
      rowsPerPage: configuracion.registrosPorPagina ? configuracion.registrosPorPagina : 5,
      size:'small',
      textLabels: {
        body: {
          noMatch: 
          <Grid 
            container 
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid>
              <img
                // key="imagenKey"
                src={SinResultados}
                style={{ width:'200px',height: '175px'}}
                alt="logo-Pfd"
              />
            </Grid>
            <Grid>
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
        <ToolbarTabla
          onClickAgregar = {onClickAgregar}
          message={message}
          showFiltros={this.showFiltros}
          filtros = {filtros}
          filtrosWidth = {width}
          nombreHoja= {nombreHoja}
          onClickDescargar={onClickDescargar}
          onClickExportar= {onClickexportar}
        />
      ,
      customToolbarSelect: (selectedRows, displayData) => 
        <ToolbarTabla
          rows={selectedRows}
          displayData={displayData}
          exportar = {exportar}
          data={this.props.data}
          onMenuClick={this.props.onMenuClick}
          menuItemUno={menuItemUno}
          menuItemDos={menuItemDos}
          headers={headers}
          onDelete= {this.props.onDeleteSelected}
          message={message}
          nomCsv={nomCsv}
          onClonar={onClonar}
        />
      ,
      onRowsDelete: this.props.onRowsDelete ? this.props.onRowsDelete : null,
      onRowsSelect: this.props.onRowsSelect,  
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
        style={{padding: params.padding >= 0 ? `${params.padding}px` : '8px'}}
      >
        <Paper
          elevation = {elevacion >= 0 && elevacion !== null ? elevacion : 0}
          // style={{height: `${height}vh`}}
          // className={classes.root}
          id={scrollBonito ? 'PaperMuiDatatable' : ''}
        >
          {this.state.bandFiltros ? filtros : null}
          <MuiThemeProvider theme={getMuiTheme(params)}>
            <MUIDataTable 
              theme={getMuiTheme}
              data={data}
              columns={headers}
              options={options}
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
  params: T.shape({
    height: T.string,
    backgroundColor: T.string,
  }),
  elevacion: T.number,
  rowsSelected: T.array,
  scrollBonito: T.bool,
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