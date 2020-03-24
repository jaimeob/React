import React, { useState, useEffect } from 'react';
import {IconButton, Typography} from '@material-ui/core';
import config from 'config/config.development';
import socketIOClient from "socket.io-client";
import { withRouter } from "react-router-dom";
import T from 'prop-types';
import AnnouncementIcon from '@material-ui/icons/Announcement';

const socket = socketIOClient(config.api.socketURL);

const styles = {
  iconButton: {
    marginRight: 10,
  },
  totalTickets: {
    color: 'white',
    marginLeft: 5,
  },
};

function TicketsUsuario({idDepartamento, idPuesto, idEmpleado, history}) {
  const [totalTickets, setTotalTickets] = useState(0);

  useEffect(() => {
    
    // Consultar tickets del usuario
    socket.emit('obtenerTotalesTicketsDifusiones', idDepartamento, idPuesto, idEmpleado);
    socket.on('enviarTotalesTicketsDifusiones', (res) => {
      setTotalTickets(res[0].TotalTickets);
    }) ;
  }, []);

  return (
    <IconButton 
      onClick={() => history.push('/tableros')} 
      style={styles.iconButton}
    > 
      <AnnouncementIcon style={{fill: 'white'}} />
      <Typography style={styles.totalTickets}>
        <sub>({totalTickets})</sub>
      </Typography>
    </IconButton>
  );
}

TicketsUsuario.propTypes = {
  idDepartamento: T.number,
  idPuesto: T.number,
  idEmpleado: T.number,
  history: T.object,
}

export default withRouter(TicketsUsuario);