import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  Dialog,
  Grid,
  Button,
  Paper,
} from '@material-ui/core';
import colorRed from '@material-ui/core/colors/red';
import colorGreen from '@material-ui/core/colors/green';
import Table from './Table';

// import { noop } from 'redux-saga/utils';

const stylesDialog  = () => ({
  btnAccept: {
    background: colorGreen[700],
    color: "white",
    minWidth: 100,
    marginLeft: 5,
  },
  btnCancel: {
    background: colorRed[700],
    color: "white",
    minWidth: 100,
  },
  dialog: {
    minWidth: 845,
  },
});

const ListDialog = props => {
  // variables
  const {
    classes,
    open,
    activeSearch,
    searchText,
    columnsToSearch,
    columns,
    rows,
    selected,
  } = props;
  // funciones
  const {
    onClickSearchButton,
    onChangeTextSearch,
    onClickCheck,
    onClickLeave,
    onClickSaveList,
  } = props

  return (
    <div>
      <Dialog
        open={open}
        disableBackdropClick
        // onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <Paper style={{padding: 10}} className={classes.dialog}>
          <Grid container>
            <Grid item sm={12} xs={12}>
              <Table
                columns={columns}
                rows={rows}
                columnsToSearch={columnsToSearch}
                activeSearch={activeSearch}
                searchText={searchText}
                showChecks
                onClickSearch={() => onClickSearchButton()}
                onChangeTextSearch={onChangeTextSearch}
                onClickCheck={onClickCheck}
                selected={selected}
                titleTable="Agregar sub-familias"
              />
            </Grid>
            <Grid item sm={12} xs={12} style={{marginTop: 10}}>
              <Grid container justify="flex-end">
                <Button
                  variant="contained"
                  className={classes.btnCancel}
                  onClick={onClickLeave}
                >
                  Salir
                </Button>
                <Button
                  variant="contained"
                  className={classes.btnAccept}
                  onClick={onClickSaveList}
                >
                  Aceptar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
    </div>
  );
}

ListDialog.propTypes = {
  classes: T.object.isRequired,
  open: T.oneOfType([
    T.bool,
  ]),
  activeSearch: T.bool,
  searchText: T.string,
  columnsToSearch: T.array,
  columns: T.array,
  rows: T.array,
  onClickSearchButton: T.func,
  onChangeTextSearch: T.func,
  onClickCheck: T.func,
  selected: T.array,
  onClickLeave: T.func,
  onClickSaveList: T.func,
}

ListDialog.defaultProps = {
  open: false,
}

export default withStyles(stylesDialog)(ListDialog);