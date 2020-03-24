/* eslint-disable no-nested-ternary */
import React from "react";
import T from 'prop-types';
import {compose, withHandlers } from 'recompose';
import {compact} from 'lodash';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import IconButton from "@material-ui/core/IconButton";
import ClonarIcon from 'images/iconos/clonar.svg'
import DeleteIconColor from 'images/iconos/deleteColor.svg';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Popper from '@material-ui/core/Popper';
// eslint-disable-next-line import/no-unresolved
import Button from '@material-ui/core/Button';
import XLSX from 'xlsx';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import AddIcon from "@material-ui/icons/AddCircleOutline";
import FilterListIcon from "@material-ui/icons/FilterList";
import { withStyles } from "@material-ui/core/styles";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Nubesita from '@material-ui/icons/CloudDownload';
import Modal from 'containers/Formularios/components/ListadoFormulario/components/Modal/alertDialog';
const defaultToolbarStyles = {
  iconButton: {
    '&:hover': {
      color: '#3f51b1',
    },
  },
  button: {
    height: '35px',
    margin: 'auto',
    backgroundColor: '#28950f',
    color: 'white',
    fontSize: '12px',
    "&:hover": {
      backgroundColor: '#1f710c',
    },
  },
  descargar: {
    marginRight: 8,
    width: '16px',
    heigth: '16px',
  },
};

export class ToolbarTabla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modal : false, bandFiltros : false, anchorEl : null};
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    const {
      modal,
    } = this.state
    this.setState({modal : !modal})
  }

  showFiltros = event => {

    const {
      bandFiltros,
    } = this.state;
    this.setState({'bandFiltros': !bandFiltros, anchorEl: event.currentTarget})
  }

  render() {
    const { 
      classes,
      onClickAgregar,
      onDeleteProxy,
      onDelete,
      rows,
      data,
      message,
      onClonar,
      filtros,
      menuItemUno,
      menuItemDos,
      onClickMenu,
      exportar,
      displayData,
      headers,
      descargarExcel,
      filtrosWidth = '600px',
      onClickExportar,
      onClickDescargar,
    } = this.props;
    
    
    
    let datosCsv = [];
    let cabeceras = [];

    if(rows){
      // debugger;
      cabeceras = headers.map(head => head.name !== 'options' ? head.label : null)
      cabeceras = compact(cabeceras);
      const ids = rows.data.map(id => id.dataIndex);
      datosCsv = displayData.map(id => ids.includes(id.dataIndex) ? id.data : null)
      datosCsv = compact(datosCsv);
      datosCsv.splice(0,0,cabeceras);
    }
    
    const id = this.state.bandFiltros ? 'simple-popper' : null;
    return (
      <React.Fragment>
        {!rows ? 
          <React.Fragment>
            {onClickAgregar ? 
              <Tooltip title='Agregar'>
                <IconButton className={classes.iconButton} onClick={onClickAgregar}>
                  <AddIcon/>
                </IconButton>
              </Tooltip>
              : null}
            {onClickDescargar ? 
              <Tooltip title='Descargar'>
                <IconButton className={classes.iconButton} onClick={onClickDescargar}>
                  <Nubesita />
                </IconButton>
              </Tooltip>
              : null}
            {filtros ? 
              <div
                key='filtrosKeyDatatable'
              >
                <Tooltip title='Filtros'>
                  <IconButton 
                    onClick={this.showFiltros}
                    aria-describedby={id}
                  >
                    <FilterListIcon/>
                  </IconButton>
                </Tooltip>
                <Popper id={id} open={this.state.bandFiltros} anchorEl={this.state.anchorEl} transition style={{zIndex: 1000}}>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper style={{float: 'right', width: filtrosWidth, maxWidth: filtrosWidth, zIndex: 1005}}>
                        {filtros}
                      </Paper> 
                    </Fade>
                  )}
                </Popper>
              </div> : null }
            {onClickExportar && 
              <Tooltip title='Exportar'>
                <Button 
                  variant="contained" 
                  color="primary" 
                  className={classes.button}
                  onClick={onClickExportar}
                >
                  <Nubesita className={classes.descargar} />
                  Exportar
                </Button>
              </Tooltip>}
          </React.Fragment> :
          <PopupState variant="popover" popupId="demo-popup-menu">
            {popupState => (
              <React.Fragment>
                <IconButton
                  {...bindTrigger(popupState)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <Modal 
                    open={this.state.modal}
                    typeAlert='Report'
                    typeOptions='Select'
                    title='Confirmar....'
                    message={message}
                    onClickAccept={onDeleteProxy(rows, data, this.openModal)}
                    onClickCancel={this.openModal}
                  />
                  {menuItemUno ? 
                    <React.Fragment>
                      <MenuItem id={1} onClick={onClickMenu(rows, data)}>
                        {menuItemUno}
                      </MenuItem>
                    </React.Fragment> : null}
                  {menuItemDos ? 
                    <React.Fragment>
                      <MenuItem id={1} onClick={onClickMenu(rows, data)}>
                        {menuItemDos}
                      </MenuItem>
                    </React.Fragment> : null}
                  {exportar ? 
                    <MenuItem style={{fontSize: '14px'}} onClick={descargarExcel(datosCsv)}>
                      <Nubesita style={{paddingRight: 8}} />
                      Descargar
                    </MenuItem> 
                    
                    : null}
                  {onDelete && onClonar === undefined ?
                    <MenuItem onClick={onDeleteProxy(rows, data,this.openModal)}>
                      <IconButton 
                        tooltip="Borrar" 
                        style={{
                          padding: 0, 
                          fontSize: 12,
                          color: 'rgba(0, 0, 0, 0.87)',
                        }}
                      >
                        <img 
                          src={DeleteIconColor} 
                          alt=""
                          style={{
                            paddingRight: 8,
                          }} 
                        />
                      Eliminar
                      </IconButton>
                    </MenuItem>:null}
                  {onClonar ?
                    <MenuItem onClick={() => onClonar(data,rows)}>
                      <IconButton 
                      
                        tooltip="Clonar" 
                      
                        style={{
                          padding: 0, 
                          fontSize: 12,
                          color: 'rgba(0, 0, 0, 0.87)',
                        }}
                      
                      >
                        <img 
                          src={ClonarIcon} 
                          alt=""
                          style={{
                            paddingRight: 8,
                          }} 
                        />
                      Clonar
                      </IconButton>
                    </MenuItem>
                    :null}
                </Menu>
              </React.Fragment>
            )}
          </PopupState>}
      </React.Fragment>
    );
  }
}

ToolbarTabla.propTypes = {
  classes: T.object,
  onClickAgregar: T.func,
};

export default compose(
  withStyles(
    defaultToolbarStyles, 
    { name: "CustomToolbar" }
  ),
  withHandlers({
    descargarExcel: (props) => (datosCsv) => () => {
      const {
        nomCsv,
        nombreHoja,
      } = props;
      const ws = XLSX.utils.aoa_to_sheet(datosCsv);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nombreHoja);
      XLSX.writeFile(wb, nomCsv, { type: "array", bookType: "xlsx" })
    },
    // eslint-disable-next-line no-unused-vars
    onDeleteProxy: (props) => (rows, data, openModal) => () => {
      const {
        onDelete,
      } = props
      
      // debugger
      const indices = rows.data.map((ele) => ele.index);
      const arreglo = [];
      for (let i = 0; i < data.length; i+=1) {
        if(indices.includes(i))
          arreglo.push(data[i]);
      }
      onDelete(arreglo);
    },
    
    onClickMenu: (props) => (rows, data) => (event) => {
      const indices = rows.data.map((ele) => ele.index);
      const arreglo = [];
      for (let i = 0; i < data.length; i+=1) {
        if(indices.includes(i))
          arreglo.push(data[i]);
      }
      const {
        onMenuClick,
      } = props;
      onMenuClick(arreglo, event.currentTarget.id)
    },
  })
)(ToolbarTabla);