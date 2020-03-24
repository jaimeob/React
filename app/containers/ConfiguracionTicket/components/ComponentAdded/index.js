/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import T from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import {
  InputLabel,
  Select,
  MenuItem,
  Grid,
  ListItemIcon,
  Card,
  CardContent,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Code from '@material-ui/icons/Code';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import DeleteIcon from '../../../../images/iconos/deleteButtonList.png'
import icons from './icons';
import { Container } from '../../styledComponents';
import Input from '../Input';

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
  prueba: {
    backgroundColor: 'red',
  },
});

export class InputAdded extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     open: false,
  //   };
  // }

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  // handleOpen = () => {
  //   this.setState({ open: true });
  // };

  handleClickField = () => {
    const { indexId, onClickCard } = this.props;
    onClickCard(indexId);
  };

  render() {
    const {
      tiposCampos,
      indexId,
      titulo,
      onClickedDeleted,
      onClicked,
      totalForms,
      onChangeTitle,
      tipoComponenteVal,
      onChangeTipo,
    } = this.props;
    const classes = this.props;
    return (
      <Grid item sm={12} xs={12} md={12}>
        
        <div onClick={onClicked}>
          <Card 
            overflow="hidden"
            className={classes.backgroundColor}
            style={this.props.colorearBorde ? {
              marginBottom: '10px',
              boxShadow: '0px 1px 3px 2px rgba(0,0,0,0.2)',
              border:1,
              borderStyle: 'solid',
              borderColor: 'red',
            }:{marginBottom: '10px',
              boxShadow: '0px 1px 3px 2px rgba(0,0,0,0.2)',
              border:1,
              borderStyle: 'solid',
              borderColor: 'white'}}
          >
            
            <CardContent  
              style={{ marginTop:'-15px'}}
            >
              <Container flexDirection="column" >

                <Container container flexDirection="row" style={{ alignItems: 'flex-end' }} justify="flex-end">
                  <IconButton
                    disabled={totalForms === 1}
                    aria-label="Delete" onClick={onClickedDeleted} >
                    <img
                      src={DeleteIcon}
                      style={{ width:'20px',height: '20px'}}
                      alt="logo-Pfd"
                    />
                  </IconButton>


                </Container>

                <Container flexDirection="row" style={{ alignItems: 'flex-end' }}>
                  <Grid item xs={5} sm={5} md={5}>
                    <Input 
                      titulo={titulo}
                      onChangeTitle={onChangeTitle}
                      index={indexId}
                    />
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} style={{ paddingLeft: '20px' }}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor={`idx_${indexId}`}>
                        Seleccione el tipo de campo
                      </InputLabel>
                      <Select
                        inputProps={{
                          name: `idx_${indexId}`,
                          id: `idx_${indexId}`,
                        }}
                        value={tipoComponenteVal}
                        // open={this.state.open}
                        onChange={onChangeTipo(indexId)}
                        // onClose={this.handleClose}
                        // onOpen={this.handleOpen}
                        renderValue={value => (
                          <ListItem>
                            {value >= 0 ? (
                              <React.Fragment>
                                <ListItemIcon>
                                  {icons[tiposCampos[value].icono] || <Code />}
                                </ListItemIcon>
                                <ListItemText
                                  primary={tiposCampos[value].label}
                                />
                              </React.Fragment>
                            ) : (
                              <ListItemText primary="Seleccione un elemento" />
                            )}
                          </ListItem>
                        )}
                      >
                        {/* <Arreglo componentes/> */}
                        {tiposCampos.map((item, index) => (
                          <MenuItem
                            value={index}
                            // eslint-disable-next-line react/no-array-index-key
                            key={`item_${item.id}_${index}`}
                          >
                            <ListItemIcon>
                              {icons[item.icono] || <Code />}
                            </ListItemIcon>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Container>
              </Container>

            </CardContent>
          </Card>
        </div>
      </Grid>
    );
  }
}

InputAdded.propTypes = {
  indexId: T.oneOfType([T.string, T.object, T.number]),
  onClickCard: T.func,
  onChangeTipo: T.func,
  tipoComponenteVal: T.oneOfType([T.string, T.object, T.number]),
  tiposCampos: T.arrayOf(T.object),
  onClickedDeleted: T.func,
  onClicked: T.func,
  onChangeTitle: T.func,
  totalForms: T.number,
  titulo: T.string,
  colorearBorde: T.bool, 
};
export default withStyles(styles)(InputAdded);
