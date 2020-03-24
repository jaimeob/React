
import React from "react";
import PropTypes from 'prop-types';
import {
  withStyles,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  TableBody,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  Edit,
  NotificationImportantOutlined,
} from "@material-ui/icons";
import { capitalize } from 'lodash';
import { yellow } from '@material-ui/core/colors';
import SinResultados from "images/iconos/EmptySinRegistrosbueno.svg";
import FilterHeader from "./FilterHeader";
import FilterTable from "./FilterTable";
import { LIST_NEEDS } from "../store/constants";

const stylesListNeedsMonth = () => ({
  root:{},
  table: {
    '& th:first-child': {
      paddingLeft: '1rem',
    },
    '& td:first-child': {
      paddingLeft: '1rem',
    },
    '& th:last-child': {
      paddingRight: '1rem',
    },
    '& td:last-child': {
      paddingRight: '1rem',
    },
    '& td':{
      fontSize: '11px',
    },
    '& th':{
      fontSize: '12px',
    },
  },
  iconSpecialServices: {
    fontSize: '1rem',
    marginBottom: '1rem',
    color: yellow[700],
  },
})

const statusEdit = ( selectedYear, currentYear ) => {
  let result = true
  if (selectedYear > 0 && selectedYear !== currentYear){
    result = false
  }
  return result
}

const ListNeedsMonth = props => {
  const {
    classes,

    propsListNeedsMonth: {
      data:{
        needs,
        selectedYear,
        currentYear,
      },
      foo:{
        handleEditMesPlaza,
      },
    },
    propsFilterHeader,
    propsFilterTable,
  } = props;

  const {
    headers,
  } = LIST_NEEDS;

  return (
    <div className={classes.root}>
      <FilterHeader propsFilterHeader={propsFilterHeader}/>
      <FilterTable propsFilterTable={propsFilterTable}/>
      <Paper>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headers.map( head => (
                <TableCell
                  align={head.align}
                  padding="none"
                  key={`col_${head.name}`}>
                  <b>{capitalize(head.label)}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {needs.length > 0 ?
              needs.map( need => (
                <TableRow key={`row_${need.IdPlaza}`}>
                  <TableCell>
                    { need.Nombre}
                  </TableCell>
                  { headers.slice(1,headers.length-1).map( head => {
                    let especialActivo = false
                    return (
                      <TableCell
                        key={`${need.IdPlaza}_${head.name}`}
                        align={head.align}
                        padding="none">
                        {(()=>{
                          if(need.Meses && need.Meses[head.name]){
                            if(need.Meses[head.name].especialActivo){
                              especialActivo = true
                              return need.Meses[head.name].necesidad + need.Meses[head.name].especial
                            }
                            return need.Meses[head.name].necesidad ? need.Meses[head.name].necesidad : 0
                          }
                          return 0
                        })()}
                        {(()=>{
                          if(especialActivo){
                            return (<Tooltip
                              title={`${need.Meses[head.name].especial} Especiales`}
                              aria-label={`${need.Meses[head.name].especial} Especiales`}>
                              <span>
                                <NotificationImportantOutlined
                                  className={classes.iconSpecialServices}/>
                              </span>
                            </Tooltip>
                            )}
                          return null
                        })()}
                      </TableCell>
                    )
                  })}
                  <TableCell>
                    {need.IdMesEditar && statusEdit(selectedYear, currentYear) ?
                      <IconButton
                        className={classes.iconHelper}
                        aria-label="Edit"
                        onClick={()=> handleEditMesPlaza(need.IdPlaza)}>
                        <Edit />
                      </IconButton>
                      :
                      null
                    }
                  </TableCell>
                </TableRow>
              ))
              :
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  align="center">
                  <Typography variant="h6">
                    <img
                      key="sinResultados"
                      src={SinResultados}
                      style={{
                        width: '200px',
                        height: '175px',
                      }}
                      alt='Logo-pfd'/>
                  </Typography>
                  <Typography
                    variant="subtitle1">
                    No se encontraron resultados
                  </Typography>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>

    </div>
  )
};

ListNeedsMonth.propTypes = {
  classes: PropTypes.object,
  propsListNeedsMonth: PropTypes.object,
  propsFilterHeader: PropTypes.object,
  propsFilterTable: PropTypes.object,
}

export default withStyles(stylesListNeedsMonth)(ListNeedsMonth)
