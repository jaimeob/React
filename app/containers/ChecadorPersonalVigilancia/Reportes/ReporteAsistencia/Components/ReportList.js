import React from 'react';
import PropTypes from 'prop-types';
import { 
  withStyles,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  Checkbox,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { CloudDownload } from '@material-ui/icons';
import SinResultados from 'images/iconos/EmptySinRegistrosbueno.svg';
import { REPORT_LIST } from '../store/constants';

const stylesReportList = () => ({
  root: {
    marginTop: '1rem',
  },
  tableWrapper:{
    maxHeight: '75vh',
    overflowY: 'scroll',
  },
  table:{
    '& th': {
      position: 'sticky',
      top: 0,
      background: 'white',
    },
  },
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
    marginTop: '1rem',
  },
  buttonExport: {
    float: 'right',
    marginBottom: '1rem',
    marginRight: '1rem',
    marginTop: '1rem',
  },
  container: {
  },
});

const ReportList = props => {
  const {
    classes,
    propsReportList: {
      data:{
        attendance,
      },
      foo:{
        handleSelectAllClick,
        handleSelectAttendance,
        handleGenerateZip,
      },
    },
  }=props;

  const {headers} = REPORT_LIST
  const allSelectedAttendance = attendance.every(attend => attend.Selected) && attendance.length > 0
  
  return (
    <div className={classes.root}>
      <Paper style={{height:'100%'}}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" style={{zIndex:'1'}}>
                  { attendance.length > 0 ?
                    <Checkbox 
                      style={{color: green[700]}} 
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': `checkbox all selected`}}
                      checked={allSelectedAttendance}
                    />
                    :
                    null }
                </TableCell>
                {headers.map( head => (
                  <TableCell
                    align={head.align}
                    padding="none"
                    key={`col_${head.name}`}>
                    <b>{head.label}</b>
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.length > 0 ?
                attendance.map( attend => (
                  <TableRow
                    hover
                    key={`row_${attend.Id}`} 
                    role="checkbox"
                    aria-checked={attend.Selected}
                    selected={attend.Selected}>
                    <TableCell 
                      padding="checkbox"
                      key={`chk_${attend.Id}`}>
                      <Checkbox 
                        checked={attend.Selected}
                        value={attend.Id}
                        
                        onChange={handleSelectAttendance}
                        style={{color: green[700]}}/>
                    </TableCell>
                    { headers.map( head => 
                      <TableCell 
                        key={`cell_${attend.Id}
                          _${attend.EmpresaId}
                          _${attend.PlazaId}
                          _${attend.AnioRetail}
                          _${attend.SemanaRetail}
                          _${head.name}`}
                        align={head.align}
                        padding="none">
                        { attend[head.name] }
                      </TableCell>
                    )}
                    <TableCell 
                      align="center" 
                      padding="none"
                      key={`btn_${attend.Id}`}
                    >
                      { JSON.parse(attend.Archivo).length > 0 ?
                        <IconButton
                          aria-label="cloud-download" 
                          color="secondary"
                          onClick={()=>handleGenerateZip(attend.Id)}>
                          <CloudDownload />
                        </IconButton>
                        :
                        null }
                    </TableCell>
                  </TableRow>
                ))
                :
                <TableRow>
                  <TableCell 
                    colSpan={headers.length + 2}
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
        </div>    
      </Paper>
    </div>
  );
}

ReportList.propTypes = {
  classes: PropTypes.object,
  propsReportList: PropTypes.object,
}

export default withStyles(stylesReportList)(ReportList)