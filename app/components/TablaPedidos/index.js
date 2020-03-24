import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip'; 
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const styles = ({
  root: {
  },
  table: {
    minWidth: 700,
  },
});

function TablePedidos(props) {
  const { classes, cabeceras, rows, removerRegistro } = props;
  return (
    <div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {cabeceras.map(cabecera => (
              <TableCell align="center">{cabecera.Nombre}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.IdArticulo}>
              <TableCell align="center">{row.IdArticulo}</TableCell>
              <TableCell align="center">{row.Agrupador}</TableCell>
              <TableCell align="center">{row.Nombre}</TableCell>
              <TableCell align="center">{row.Existencia} / {row.StockMaximo}</TableCell>
              <TableCell align="center">{row.Cantidad}</TableCell>
              <TableCell align="center">{row.Comentario}</TableCell>
              <TableCell align="center">
                <Tooltip title="Eliminar" placement="bottom-end"> 
                  <IconButton onClick={() => removerRegistro(row)}> 
                    <DeleteIcon /> 
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

TablePedidos.propTypes = {
  classes: T.object.isRequired,
  cabeceras: T.array,
  rows: T.array,
  removerRegistro: T.func,
};

export default withStyles(styles)(TablePedidos);