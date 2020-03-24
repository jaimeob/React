import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { 
  withStyles,
  Button,
  IconButton,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { 
  Clear,
  Search,  
} from "@material-ui/icons";

import { green, red } from '@material-ui/core/colors';
import { uniqueId, capitalize } from 'lodash'
const styles = () => ({
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
  },
  buttonError: {
    backgroundColor: '#FF0023',
    color: 'white',
    '&:hover': {
      background: red[900],
    },
  },
})
class ModalViewExplotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      explotionDetalle: {
        headersView: [],
        rowsView: [],
      },
      inputSearch: '',
      selectSearch: false,
    }
    this.handleIconSearch = this.handleIconSearch.bind(this)
    this.onChangeTextSearch = this.onChangeTextSearch.bind(this)

  }

  componentWillMount(){
    const {
      dataFile,
      headers,
    } =  this.props;
  
    this.setState({
      explotionDetalle: 
      { headersView: headers,
        rowsView: dataFile,
      },
    })
  }

  handleIconSearch() {
    const {
      selectSearch,
    } = this.state
    this.setState({selectSearch: ! selectSearch})
  }

  onChangeTextSearch(event) {
    const input = event.target.value.toString().toLowerCase();
    const {
      headers,
      dataFile,
    } = this.props;

    this.setState({
      inputSearch: input,
    })

    const result = dataFile.filter( row => Object.values(row).some( val => val.toString().toLowerCase().indexOf(input) > -1))

    this.setState({
      explotionDetalle: 
      { 
        headersView: headers,
        rowsView: result,
      },
    })
  }


  render() {
    const {
      explotionDetalle: {
        rowsView, 
        headersView,
      },
      inputSearch,
      selectSearch,
    } = this.state;

    const {
      classes,
      open, 
      closeModal,
      saveExplotions,
    } = this.props;

    const buttonSearch = selectSearch ? <Clear/> : <Search/>;
    const tooltipSearch = selectSearch ? "Limpar" : "Buscar";
    const showTextSearch = selectSearch ? "visible" : "hidden";

    return(
      <div>
        <Dialog
          open={open}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          maxWidth="xl"
          disableBackdropClick
          onExited={closeModal}
        >
          <DialogTitle id="scroll-dialog-title">Listado de insumos a explosionar</DialogTitle>
          <DialogContent>
            <Grid container justify="flex-end" style={{marginBottom: '1rem'}}>
              <Grid item xs={10} md={4} lg={4}>
                <TextField
                  id="standard-insumos"
                  label="Buscar Insumo"
                  type="text"
                  inputProps={{maxLength: '30'}}
                  style={{marginTop: 0, width: '80%', visibility: showTextSearch}}
                  value={inputSearch}
                  onChange={this.onChangeTextSearch}
                  autoFocus
                >
                </TextField>
                <Tooltip 
                  title={tooltipSearch} 
                >
                  <IconButton 
                    aria-label="SearchIcon"
                    onClick={this.handleIconSearch}
                  >
                    {buttonSearch}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Paper>
              <Table 
                style={{tableLayout: 'fixed' , overflowX: 'auto'}}
              >
                <TableHead>
                  {rowsView && rowsView.length > 0 ? 
                    <TableRow>
                      {headersView.map( col  => (
                        <TableCell 
                          align="left" 
                          key={uniqueId('col_')}
                          {...(col === 'descripcion' ? { width: '200px'} : {})}
                          {...(col === 'cantidad' ? { width: '100px'} : {})}
                        >
                          <b>{capitalize(col)}</b>
                        </TableCell>      
                      ))}
                    </TableRow>
                    : 
                    <TableRow>
                      <TableCell>
                        No hay información para mostrar...!!
                      </TableCell>
                    </TableRow>
                  }
                </TableHead>
                <TableBody>
                  { rowsView.map( row =>(
                    <TableRow
                      key={uniqueId(`row_${row.insumo}_`)}
                      hover
                    >
                      { headersView.map(prop => (
                        <TableCell 
                          key={`cell_${row.insumo}_${prop}`}
                          name= {uniqueId(`cell_${row.insumo}_${prop}`)}
                          {...(prop === 'descripcion' ? { align: 'left' } : {align: 'center'})}
                        >
                          {row[prop]}
                        </TableCell>    
                      ))}
                    </TableRow>
                  ))
                  }
                </TableBody> 
              </Table>
              
            </Paper>
          </DialogContent>
          <DialogActions style={{paddingRight: '15px'}}>
            <Button
              onClick={() => closeModal()} 
              className={classes.buttonError}
            >
              Salir
            </Button>
            <Button 
              onClick={() => saveExplotions()}
              className={classes.buttonSuccess}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ModalViewExplotion.propTypes = {
  open: PropTypes.bool,
  dataFile: PropTypes.array,
  headers: PropTypes.array,
  closeModal: PropTypes.func,
  saveExplotions: PropTypes.func,
};

// export default ModalViewExplotion;
export default compose(withStyles(styles),)(ModalViewExplotion);