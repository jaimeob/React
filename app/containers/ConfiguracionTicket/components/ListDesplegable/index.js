import React from 'react';
import { List , ListItem, TextField, Grid, Card, Button, Divider } from '@material-ui/core';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '../../../../images/iconos/deleteButtonList.png'
import Switch from '../../../../components/Switch';
import { Container } from '../../styledComponents';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});
// const GreenSwitch = withStyles({
//   switchBase: {
//     color: '#28950f',
//     '&$checked + $bar': {
//       color: '#28950f',
//       backgroundColor: '#28950f',
//     },
//     '&$checked': {
//       color: '#28950f',
//     },
//   },
//   checked: {},
//   track: {},
//   bar: {},
// })(Switch);
// eslint-disable-next-line react/prefer-stateless-function
export class ListDesplegable extends React.Component {
  
  render(){
    const {
      classes,
      opciones,
      idTipoComponente,
      divSelecionado,
      titulo,
      requerido,
      onInputChange,
      onClickedDelete,
      onChangeObligatorio,
      onClickedButtom,
    } = this.props;

    return(
      <div className={classes.root}>
        <Card
          style={{
            boxShadow: '0px 1px 2px 1px rgba(0,0,0,0.2)',
          }}>
          <Grid container item md={12} alignItems='center'>
            <Container flexDirection = 'column'   >
              <Container  style={{ padding:'10px 20px 0px 20px', color:'#ff9100' }}>
                <Grid item md={12}>
                  <Typography inline variant="subtitle1" gutterBottom>
                    {titulo}
                    <Divider></Divider>
                  </Typography>
                </Grid>
              </Container>
              <Container container style={{ overflowY: 'auto',maxHeight:'200px' }} flexDirection='row' justify="center" >
                <List style={{ width:'100%' }}>
                  {opciones.map((opt,index) => (
                    <ListItem
                      
                      // eslint-disable-next-line react/no-array-index-key
                      key={`k_${index}`}
                      style={{ paddingTop:'2px',paddingBottom:'7px'}}>

                      <TextField 
                        value={opt.value}
                        fullWidth
                        label="Opción"
                        error={opt.error}
                        onChange={({ target }) => onInputChange(target.value, index, idTipoComponente, divSelecionado)}
                      />
                      {opciones.length > 1 && (
                        <IconButton aria-label="Delete" onClick={() => onClickedDelete(divSelecionado,index)}>
                          <img
                            src={DeleteIcon}
                            style={{ width:'20px',height: '20px'}}
                            alt="logo-Pfd"
                          />
                        </IconButton>
                      )}
                      
                    </ListItem>
                  ))}
                </List>
              </Container>  

              <Container container flexDirection='row' style={{ justifyContent:"space-between", padding:'0px 20px'}} >
                <Button
                  onClick={() => onClickedButtom(divSelecionado)}
                >
                  <u style={{ fontSize:'13px' }}>Agregar Opción</u>
                </Button>
                <FormControlLabel
                  style={{ alignSelf:"flex-end" }}
                  control={
                    <Switch
                      checked={requerido}
                      onChange={onChangeObligatorio(divSelecionado)}  
                    />
                  }
                  label="Obligatorio"
                />
              </Container>
            </Container>
          </Grid>
        </Card>
      </div>
    );
  }
}

ListDesplegable.propTypes = {
  classes: T.object.isRequired,
  opciones: T.arrayOf(T.object),
  idTipoComponente: T.number,
  divSelecionado: T.number,
  titulo: T.string,
  requerido: T.bool,
  onInputChange: T.func,
  onClickedDelete: T.func,
  onChangeObligatorio: T.func,
  onClickedButtom: T.func,
};

export default withStyles(styles)(ListDesplegable);