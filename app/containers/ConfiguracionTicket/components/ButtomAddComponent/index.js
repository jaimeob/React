import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { compose } from 'recompose';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  boton: {},
});

/* eslint-disable react/prefer-stateless-function */
export class ButtomAddComponent extends React.Component {
  render() {
    return (
      <div>
        <Tooltip
          title="Agregar"
        >
          <Fab
            size="small"
            onClick={this.props.onClick}
            // color="secondary"
            aria-label="Add"
            className={this.props.classes.fab}
            style={{
              color: '#FFFFFF',
              backgroundColor:'#28950F',
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    );
  }
}

ButtomAddComponent.propTypes = {
  classes: T.object.isRequired,
  onClick: T.func,
};

export default compose(withStyles(styles))(ButtomAddComponent);
