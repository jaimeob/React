import React from 'react';
import T from 'prop-types';

import {
  Grid,
  Typography,
  withStyles,
  // InputBase,
  // InputAdornment,
  // IconButton,
  // Input,
  // Divider,
  // Table,
  // Paper,
  // TableHead,
  // TableRow,
  // TableCell,
  // MenuItem,
  // Menu,
  // ListItemIcon,
  // ListItemText,
  // TableBody,
  // withTheme,
  // Button,
} from '@material-ui/core';
// import {
//   compose,
//   withState,
//   withHandlers,
// } from 'recompose';
import {
  GridContainerGrow,
  // GroupContainer,
} from './styleComponents';


// let
const ComponentLayout = props => {
  const {
    conf: {
      tipo,
      value,
    },
  } = props

  switch (tipo) {
    case 'etiqueta': {
      return value;
    }
    case 'textocorto' || 'textolargo': {
      return null;
    }
    case 'tabla': {
      return null;
    }
    case 'archivo': {
      return null;
    }
    default:
      return null;
  }
}

ComponentLayout.propTypes = {
  conf: T.shape({
    tipo: T.string,
    value: T.any,
  }),
};

const NotFoundedComponents = withStyles({
  root: {
    flexGrow: 1,
  },
})(({
  classes,
}) => (
  <div className={classes.root}>
    <Grid
      container
      item
      xs={12}
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <Typography variant="body2">
          Agregue componentes utilizando el panel lateral.
        </Typography>
      </Grid>
    </Grid>
  </div>
))


const LayoutFormulario = props => {
  const {
    components,
    layoutActions,
  } = props;

  return (
    <GridContainerGrow
      container
      xs={12}
      item
    >
      {components.length > 0 ?
        components.map((cmp, idx) =>
          <ComponentLayout
            conf={cmp}
            // eslint-disable-next-line react/no-array-index-key
            key={`cmp_${cmp.id}_${idx}`}
            idx={idx}
            actions={layoutActions}
          />
        )
        : (
          <NotFoundedComponents />
        )
      }
    </GridContainerGrow>
  );
}

LayoutFormulario.propTypes = {
  components: T.array,
  layoutActions: T.object,
}
  
// LayoutFormulario.defaultProps = {
//     components: [],
//     layoutActions: {},
//   }

export default LayoutFormulario;