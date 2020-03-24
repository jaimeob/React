import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import { green, yellow } from '@material-ui/core/colors';
import { CloudDownload, MoveToInbox } from '@material-ui/icons';


const stylesFilterTable = () => ({
  root: {
    margin: '1rem 0 0 0 ',
  },
  buttonDownload: {
    backgroundColor: 'rgba(249, 170, 51, 0.8)',
    '&:hover': {
      background: yellow[800],
    },
    margin: '0 .5rem;',
    textTransform: 'initial',
  },
  buttonExport: {
    backgroundColor: 'rgba(40, 149, 15, 0.4)',
    '&:hover': {
      background: green[300],
    },
    margin: '0 .5rem;',
    textTransform: 'initial',
  },
  container: {
  },

});

const FilterTable = props => {
  const {
    classes,
    propsFilterTable: {
      data: {
        company:{
          companys,
          selectedCompany,
        },
        attendance,
      },
      foo: {
        handleExportExcel,
        handleGenerateZip,
      },
    },
  }=props;


  const disabledButtonExport = () => attendance.length > 0

  return (
    <div className={classes.root}>
      <Grid container alignItems="flex-end">
        <Grid item xs={6}>
          <Typography variant="subtitle2">
            { selectedCompany ?
              `Empresa: ${ selectedCompany === '-1' ? 'TODAS': companys.find( company => company.EmpresaId === selectedCompany).Nombre}` : null }
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          <Button
            disabled={!attendance.some(attend => attend.Selected)}
            className={classes.buttonDownload}
            variant='contained'
            onClick={()=> handleGenerateZip()}>
            <CloudDownload style={{marginRight:'.5rem'}}/>
            Descargar
          </Button>
          <Button
            disabled={!disabledButtonExport()}
            className={classes.buttonExport}
            variant='contained'
            onClick={()=> handleExportExcel()}  >
            <MoveToInbox style={{marginRight:'.5rem'}}/>
            Exportar excel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

FilterTable.propTypes = {
  classes: PropTypes.object,
  propsFilterTable: PropTypes.object,
}

export default withStyles(stylesFilterTable)(FilterTable)
