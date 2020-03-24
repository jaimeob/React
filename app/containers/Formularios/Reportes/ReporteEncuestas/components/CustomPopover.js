import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { uniqueId } from 'lodash';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  link: {
    color: '#3f88c5',
    textDecoration: 'underline',
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    padding: 5,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
    marginTop: 0,
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    color: 'rgba(0, 0, 0, 0.54)',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  listSubHeader:{
    color: 'rgba(0, 0, 0, 0.87)',
  },
  popover: {
    padding: 5,
  },
});

class CustomPopover extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const {
      label,
      data,
      tipoFormulario,
    } = this.props;
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
   
    return (
      <div>
        <button
          type="button"
          onClick={this.handleClick}
          className={classes.link}
        >
          {label}
        </button>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {
            data.map(departamento => (
              <React.Fragment key={uniqueId('custom_popover')}>
                <ListSubheader className={classes.listSubHeader}>{departamento.Nombre}</ListSubheader>
                <ul className={classes.ul}>
                  {
                    departamento.Usuarios.map(usuario => 
                      (
                        tipoFormulario === 'REFEVA'
                          ? <ListItem key={usuario.UsuarioId} className={classes.listItem}>
                            <ListItemText
                              {...(usuario.TotalEvaluadores > 0 && usuario.TotalEvaluadores === usuario.TotalRespuestasEvaluadores 
                                ? {style: {...{textDecoration: 'line-through', textDecorationThickness: 3}}} 
                                : {})}
                              primary={usuario.Nombre} 
                            />
                          </ListItem>
                          : <ListItem key={usuario.UsuarioId} className={classes.listItem}>
                            <ListItemText
                              {...(usuario.Respondido
                                ? {style: {...{textDecoration: 'line-through', textDecorationThickness: 3}}} 
                                : {})}
                              primary={usuario.Nombre} 
                            />
                          </ListItem>
                      )  
                    )
                  }
                </ul>
              </React.Fragment>
            ))
          }
        </Popover>
      </div>
    );
  }
}

CustomPopover.propTypes = {
  classes: T.object.isRequired,
  label: T.oneOfType([
    T.string,
    T.number,
  ]),
  data: T.array,
  tipoFormulario: T.string,
};

CustomPopover.defaultProps = {
  label: '',
  data: [],
};

export default withStyles(styles)(CustomPopover);