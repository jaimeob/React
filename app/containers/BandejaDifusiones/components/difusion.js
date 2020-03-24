import React from 'react';
import T from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withHandlers } from 'recompose';
import UserImage from 'images/iconos/user.png';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import red from '@material-ui/core/colors/red';
import { Container } from '../../ConfiguracionTicket/styledComponents';
// eslint-disable-next-line no-unused-vars
const styles = _theme => ({
  root: {
    borderTopLeftRadius: '4px',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },

  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  grow: {
    backgroundColor: red[500],
  },
});
  
// const FORM_HANDLERS = {}
function Difusion(props) {
  const classes = styles();
  const {
    difusion,
  } = props;
  
  return (
    <div >
      <Container style={{height: '100%'}}>
        <Grid item xs={12} sm={12} md={12}>
          <Card  style={{height: 530}}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" src={UserImage}>
            
                </Avatar>
              }
              action={
                // {moment(difusion.fechaCreacion).format('YYYY-MM-DD HH:mm:ss')}
                <Typography component="span" color="textPrimary">
                  <div>
                    <Typography  gutterBottom>
                      {/* {moment(difusion.FechaCreacion).format('YYYY-MM-DD HH:mm:ss')} */}
                      {difusion.FechaInsercion.substring(0,10).concat(' ',difusion.FechaInsercion.substring(19,11))}
                      
                    </Typography>
                  </div> 
                </Typography>
              }
              title="Jaime Ojeda"
              subheader={difusion.Asunto}
            />
            
            {difusion.UrlArchivo && (
              <div className={classes.grow} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <img src={difusion.UrlArchivo} alt="imagen" width={600} height={300} />
              </div>)}
            
            <CardContent>
              <Typography component="p">
                {difusion.Mensaje}
              </Typography>
            </CardContent>
            <CardActions  disableActionSpacing>
            </CardActions>
          </Card>
        </Grid>
      </Container>
    </div>
  );
  
  
}

Difusion.propTypes = {
  difusion: T.arrayOf,
};


export default compose(
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS]===================================
      // onUploadFile:(formData) => {
      //   // PRUEBA
      //   dispatch({
      //     type: 'APP/CONTAINER/BANDEJADIFUSIONES/GUARDAR_IMG_ACTION',
      //     data: formData,
      //   })
          
      // },


    })
  ),
  withHandlers(),

)(Difusion);
