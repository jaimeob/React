/* eslint-disable react/no-array-index-key */
/**
 *
 * Funcionalidad: Listar los tickets por pestaña
 *
 */

import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Grey from '@material-ui/core/colors/grey'
import Divider from '@material-ui/core/Divider';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { withHandlers, compose } from 'recompose';
import { Container } from '../../../ConfiguracionTicket/styledComponents';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  selected: {
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: Grey[300],
  },
  itemTextL: {
    textAlign: 'left', 
    margin: 'auto', 
    width: '49%', 
    display: 'inline-block', 
    fontSize: 10,
    fontFamily: "Roboto",
    letterSpacing: 1,
  },
  itemTextR: {
    textAlign: 'right', 
    margin: 'auto', 
    width: '49%', 
    display: 'inline-block', 
    fontSize: 10,
    fontFamily: "Roboto",
    letterSpacing: 1,
  },
  listItemText:{
    fontSize:11,// Insert your required size
    fontFamily: "Roboto",
    letterSpacing: 1,
  },
  listItemText2:{
    fontSize:13,// Insert your required size
    fontFamily: "Roboto",
    letterSpacing: 1,
  },
  list:{
    paddingBottom:5, paddingTop:5,
  },
});

function Tickets(props) {

  const { 
    tipo, 
    toggleTipo,
    tickets,
    onClickItem,
    idTicket,
    classes,
  } = props;
  
  // Convierte la primera letra de cada palabra en una cadena a mayusculas
  const upperText = (nombre) =>
    nombre.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  // Si la pestaña es de Enviados o Asignados los Muestra por Categoria
  if( tipo === 0 || tipo === 1){
    return (
      
      <div>
        <Container style={{height: '100%'}}>
          <Grid item xs={12} sm={12} md={12}>
            <List component="div"  >

              {tickets.map((ele, index) =>
                <React.Fragment key={`react${ele.IdEstatus}`}>
                  <ListItem 
                    id={`${ele.IdEstatus}_${index}`} 
                    button 
                    onClick={toggleTipo} 
                    divider
                  >
                    <ListItemIcon>
                      {ele.toggled === ele.IdEstatus ? 
                        <KeyboardArrowDownIcon /> : 
                        <KeyboardArrowRightIcon />
                      }
                    </ListItemIcon>
                    <ListItemText primary={ele.Nombre}  classes={{primary:classes.listItemText2}} />
                  </ListItem>
                  <Collapse 
                    in={ele.toggled === ele.IdEstatus} 
                    timeout="auto" 
                    unmountOnExit
                  >
                    <List disablePadding  >
                      {ele.tickets.map((ticketsDet, idx) =>  
                        <ListItem  
                          style={{paddingBottom:0, paddingTop:0}}
                          key={`list_${ele.IdEstatus}_${idx}`}
                          button 
                          name={`tket_${index}`}
                          ContainerProps={{ 
                            name: `tket_${index}`,
                          }}
                          onClick={
                            onClickItem(
                              idx, index, ticketsDet.IdTicket, ele.IdEstatus,ticketsDet.IdPlantilla
                            )
                          }
                          className={
                            idTicket === ticketsDet.IdTicket ? 
                              classes.selected : 
                              classes.nested
                          }
                        >
                          <Avatar style={{width:30,height:30, backgroundColor:'#263238 '}}>
                            {ticketsDet.SoloNombre
                              .match(/\b(\w)/g).join('').toUpperCase()}
                          </Avatar>
                          <ListItemText 
                            inset 
                            primary={
                              `Folio: <${ticketsDet.IdTicket}> - 
                              ${upperText(ticketsDet.NomSolicitante)}`
                            }
                            classes={{primary:classes.listItemText}}
                            
                            secondary={
                              <React.Fragment>
                                <Typography 
                                  component='span' 
                                  className={classes.itemTextL}

                                >
                                  {ticketsDet.Nombre}
                                </Typography>
                                <Typography 
                                  component='span' 
                                  className={classes.itemTextR}
                                >
                                  {ticketsDet.Fecha}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      )}
                    </List>
                  </Collapse>
                </React.Fragment>
              )}
            </List>
          </Grid>
        </Container>
      </div>
    );
  } 

  // Si la pestaña es de pendientes por asignar los tickets no tienen categoria
  return (
    <div>
      <Container style={{height: '100%'}}>
        <Grid item xs={12} sm={12} md={12}>
          <List component="div">
            {tickets[0].tickets.map((ticketsDet, idx) => 
              <React.Fragment key={`pendientes${ticketsDet.IdTicket}`}>
                <ListItem 
                  key={`list_${ticketsDet.IdTicket}`}
                  button name={`tket_${idx}`}
                  id='212'
                  ContainerProps={{ 
                    name: `tket_${idx}`,
                  }}
                  onClick={onClickItem(idx, 0, ticketsDet.IdTicket)}
                  className={
                    idTicket === ticketsDet.IdTicket ? 
                      classes.selected : 
                      classes.nested
                  }
                >
                  <Avatar>
                    {ticketsDet.SoloNombre
                      .match(/\b(\w)/g).join('').toUpperCase()}
                  </Avatar>
                  <ListItemText 
                    inset 
                    primary={
                      `Folio: <${ticketsDet.IdTicket}> - 
                      ${upperText(ticketsDet.NomSolicitante)}`
                    } 
                    
                    secondary={
                      <React.Fragment>
                        <Typography 
                          component='span' 
                          className={classes.itemTextL}
                        >
                          {ticketsDet.Nombre}
                        </Typography>
                        <Typography 
                          component='span' 
                          className={classes.itemTextR}
                        >
                          {ticketsDet.Fecha}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider/>
              </React.Fragment>
            )}
          </List>
        </Grid>
      </Container>
    </div>
  );
  
}

Tickets.propTypes = {
  tipo: T.number,
  toggleTipo: T.func,
  onClickItem: T.func,
  tickets: T.array,
  idTicket: T.number,
  classes: T.object,
};


export default compose(
  withStyles(styles),
  withHandlers({
    onClickItem: (props) => (index, cIndex, idTicket, IdEstatus) => () => {
      const {
        onClickTicketSelected,
        onClickTicketEtapas,
        getEtapasEstatus,
      } = props;

      onClickTicketSelected(index, cIndex, idTicket, IdEstatus);
      onClickTicketEtapas(idTicket)
      getEtapasEstatus(idTicket)

    },
  }),
)(Tickets);
