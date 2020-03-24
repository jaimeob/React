import React from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: '300px 50px 100px 20px',
    // paddingTop: theme.spacing.unit * 35,
    // paddingBottom: theme.spacing.unit * 35,
    // paddingRight: theme.spacing.unit * 20,
    height: 'calc(100vh - 120px)',
    minHeight: 512,
  },
});

const showView = (view) => {
  if(view.length === 0) {
    return <Typography component="h2" variant="display1" gutterBottom>
     Seleccione un Formulario
    </Typography>
  } 

  return view[0]
}


function PaperSheet(props) {
  console.log('FormView props', props);
  const { classes, view } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        {showView(view)}
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: T.object.isRequired,
  view: T.array,
};

export default withStyles(styles)(PaperSheet);