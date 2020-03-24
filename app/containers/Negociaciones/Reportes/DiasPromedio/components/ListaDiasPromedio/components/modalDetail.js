import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  Dialog,
  Grid,
  Button,
  Paper,
  Typography,
} from '@material-ui/core';
import colorRed from '@material-ui/core/colors/red';
import colorGreen from '@material-ui/core/colors/green';
import Table from './simpleTable';

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
    minWidth: 860,
  },
});

const ListDialog = props => {
  // variables
  const {
    classes,
    open,
    columns,
    rows,
  } = props;
  // funciones
  const {
    onClickLeave,
  } = props

  return (
    <div>
      <Dialog
        open={open}
        disableBackdropClick
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <Paper style={{padding: 10}} className={classes.dialog}>
          <Grid container spacing={8}>
            <Grid item sm={12} xs={12}>
              <Typography variant="h6">
                Desglose de Tickets
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Paper>
                <Table
                  columns={columns}
                  rows={rows}
                  showActions={false}
                />
              </Paper>
            </Grid>
            <Grid item sm={12} xs={12} style={{marginTop: 10}}>
              <Grid container justify="flex-end">
                <Button
                  variant="contained"
                  className={classes.btnCancel}
                  onClick={onClickLeave}
                >
                  Cerrar
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
  columns: T.array,
  rows: T.array,
  onClickLeave: T.func,
}

ListDialog.defaultProps = {
  open: false,
}

export default withStyles(stylesDialog)(ListDialog);