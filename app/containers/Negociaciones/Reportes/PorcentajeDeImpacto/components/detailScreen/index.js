import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  Button,
  Grid,
  CircularProgress,
  Dialog,
} from '@material-ui/core';
import ExportIcon from '@material-ui/icons/SaveAlt'
import RedColor from '@material-ui/core/colors/red'
import GreenColor from '@material-ui/core/colors/green'
import { enqueueSnackbar } from 'reducers/notifications/actions';
import XLSX from 'xlsx';
import Table from './components/Table'
import DialogMessage from '../../../../../../components/Dialog/alertDialog';

const useStyles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  gridLeft: {
    paddingLeft: 100,
  },
  gridRight: {
    paddingRight: 100,
  },
  gridUnder: {
    paddingTop: 150,
    paddingLeft: 100,
  },
  gridConteinerData:{
    paddingTop: 40,
  },
  buttonExit: {
    width: 120,
    color: "white",
    backgroundColor: RedColor[500],
  },
  buttonExport: {
    width: 120,
    color: "white",
    backgroundColor: GreenColor[500],
  },
  backDrop: {
    backgroundColor: '#00000015',
  },
  paper: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'hidden',
  },
});


const detailScreen = props => {
  const {
    classes,
    params: {
      nameFamily,
      columns,
      rows,
      activeSearch,
      searchText,
      progressTableActive,
      openConfirmation,
    },
    actions: {
      handleClickExitDetailAction,
      handleClickButtonSearchAction,
      handleChangeTextSearchAction,
      handleOpenModalConfirmationAction,
    },
  } = props

  const handleExportExcel = (FileName = 'Descarga') => {
    try{
      const header = columns.map(obj => obj.label)
      const contentExcel = []
      contentExcel.push(header)
      contentExcel.push(...rows.map(obj =>
        Object.keys(obj).filter(prop =>
          prop !== 'Id').map(prop =>
          obj[prop]
        )
      ))
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.aoa_to_sheet(contentExcel);
      XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');/* add worksheet to workbook */
      XLSX.writeFile(wb, FileName.concat('.xlsx'))/* write workbook */
    }catch(err){
      enqueueSnackbar({
        message: 'Ocurrio un problema al descargar, favor de comunicarse con Soporte.',
        options: { variant: 'error' },
      })
    }
  }

  return <div>
    <Dialog
      open={progressTableActive}
      BackdropProps={{
        classes: { root: classes.backDrop },
      }}
      PaperProps={{
        classes: { root: classes.paper },
      }}
    >
      <CircularProgress
        color="secondary"
        size={60}
      />
    </Dialog>
    <DialogMessage
      open={openConfirmation}
      typeAlert='Warning'
      typeOptions='Select'
      title='Confirmación'
      message='¿Desea salir del listado?'
      onClickAccept={() => handleClickExitDetailAction(-1,"")}
      onClickCancel={() => handleOpenModalConfirmationAction(false)}
    />
    <Grid container direction="column" spacing={16}>
      <Grid item sm={12}>
        <Table
          titleTable={nameFamily}
          columns={columns}
          rows={rows}
          columnsToSearch={["Nombre"]}
          activeSearch={activeSearch}
          searchText={searchText}
          onClickSearch={handleClickButtonSearchAction}
          onChangeTextSearch={handleChangeTextSearchAction}
          showNew={false}
          showFilter={false}
          showOption={false}
          showActions={false}
          showChecks={false}
          selected={[]}
          progress={progressTableActive}
        />
      </Grid>
      <Grid item sm={12}>
        <Grid container justify='flex-end'>
          <Grid item sm={5}>
            <Grid container justify='flex-end'>
              <Grid item sm={4}>
                <Grid container justify='flex-end'>
                  <Button
                    className={classes.buttonExit}
                    variant="contained"
                    onClick={() => handleOpenModalConfirmationAction(true)}
                  >
                    Salir
                  </Button>
                </Grid>  
              </Grid>
              <Grid item sm={4}>
                <Grid container justify='flex-end'>
                  <Button
                    className={classes.buttonExport}
                    variant="contained"
                    onClick={() => handleExportExcel('Porcentaje_de_Impacto_Negociaciones')}
                    disabled={rows.length === 0}
                  >
                    <ExportIcon/>
                    Exportar
                  </Button>
                </Grid>  
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
};

detailScreen.propTypes = {
  classes: T.object.isRequired,
  params: T.shape({
    nameFamily: T.string,
    columns: T.array,
    rows: T.array,
    activeSearch: T.bool,
    searchText: T.string,
    progressTableActive: T.bool,
    openConfirmation: T.bool,
  }),
  actions: T.shape({
    handleClickExitDetailAction: T.func,
    handleClickButtonSearchAction: T.func,
    handleChangeTextSearchAction: T.func,
    handleOpenModalConfirmationAction: T.func,
  }),
}

export default withStyles(useStyles)(detailScreen);