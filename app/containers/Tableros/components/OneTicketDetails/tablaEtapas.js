import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { uniqBy,map,remove} from 'lodash'
import iconFile from 'images/iconos/file.png';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CheckIcon from '@material-ui/icons/CheckCircle';
import Offline from '@material-ui/icons/OfflinePin';
import Flecha from '@material-ui/icons/ArrowForward';
import moment from 'moment';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const changeCase = require('change-case')
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  avatar: {
    margin: 10,
  },
  listItemText:{
    fontSize:12,
  },

});


function TablaEtapas(props) {
  const { 
    classes,
    etapasEstatus,
    onClickDownloadFile,
  } = props;

  const etapasArr = uniqBy(etapasEstatus, 'IdTicketEtapa');
  
  // eslint-disable-next-line consistent-return
  const Arr = map(etapasArr, (item) => {
    if (item.CerradaPorRegla === false){
      return item;
    }

  });
  const ArregloEtapas= remove(Arr, (item) => item !== undefined);

  return (
    <Paper>
      <Table >
        <TableHead>
          <TableRow >
            <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}}></TableCell>
            <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}}>Fecha Inicio</TableCell>
            <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}}>Fecha Fin</TableCell>
            <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}}>Tiempo Retraso</TableCell>
            <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}}>Evidencia</TableCell>
            <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}}>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ArregloEtapas.map(etapa => (
            <TableRow>
              {/* <TableCell component="th" scope="row" colSpan={1}> */}
              <TableCell component="th" scope="row" style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}} colSpan={1}>
                <ListItem style={{paddingTop:0,paddingBottom:0}}>
                  <ListItemText  classes={{primary:classes.listItemText, secondary:classes.listItemText}} primary={changeCase.pascalCase(etapa.Nombre)}  secondary={etapa.Puesto ===null ? changeCase.pascalCase(etapa.Usuario) : changeCase.pascalCase(etapa.Puesto)} />
                </ListItem>
              </TableCell>
              <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}} >{etapa.FechaInicio !== null ? moment.utc(etapa.FechaInicio).format('MM/DD/YYYY'): ""}</TableCell>
              <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}}>{etapa.FechaTermino !== null ? moment.utc(etapa.FechaTermino).format('MM/DD/YYYY'): ""}</TableCell>
              <TableCell  align="center" style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}}>{etapa.TiempoRetrazado}</TableCell>
              <TableCell style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}}>
                { etapa.Evidencia !== null && (
                  <IconButton
                    target='_blank'
                    alt={etapa.Evidencia !== null}
                    onClick={onClickDownloadFile(etapa.ArchivoAdjunto,etapa.Evidencia)}
                  >
                    { <img
                      src={iconFile}
                      style={{ width:'25px',height: '25px'}}
                      alt="logo-xls"
                    />}
                  </IconButton>
                )}
              </TableCell>

              <TableCell   style={{padding: '4px 0px 4px 0px', fontFamily:'Roboto'}}>
                { etapa.Estatus === "En Proceso" && (<Flecha
                  style={{ 
                    marginLeft: '20px',
                    color:'#F9AA33',
                  }}>
                </Flecha>)}
                { etapa.Estatus === "Terminado" && (<CheckIcon
                  style={{ 
                    marginLeft: '20px',
                    color:'#28950F',
                  }}>
                </CheckIcon>)}
                { etapa.Estatus === "Pendiente" && (<Offline
                  style={{ 
                    marginLeft: '20px',
                    color:'#232F34',
                  }}>
                </Offline>)}
                { etapa.Estatus === "Retrazada" && (<Offline
                  style={{ 
                    marginLeft: '20px',
                    color:'#FF0023',
                  }}>
                </Offline>)}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

TablaEtapas.propTypes = {
  classes: PropTypes.object.isRequired,
  etapasEstatus: PropTypes.array,
  onClickDownloadFile: PropTypes.func,
};

export default compose(
  withStyles(styles),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      onClickDownloadFile:(ArchivoAdjunto,Evidencia) => () => {        
        axios({
          url: ArchivoAdjunto,
          method: 'GET',
          responseType: 'blob', // important
        }).then((response) => {
          
          // const tipo = response.config.url.split('.')[4];
          // const nomTipo = response.config.url.split('/')[4].split('.')[0];
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${Evidencia}`);
          document.body.appendChild(link);
          link.click();
          
        })
      }, 
    })
  ),
)(TablaEtapas);


// padding: '4px 0px 4px 0px', fontFamily:'Roboto'