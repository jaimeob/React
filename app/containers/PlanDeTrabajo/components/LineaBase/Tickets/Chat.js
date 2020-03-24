/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { ThemeProvider, Avatar, Message, MessageText,MessageGroup, MessageList } from '@livechat/ui-kit';// eslint-disable-line
import T from 'prop-types';
import {
  Grid,
  TextField, Typography, Icon, Divider,Paper} from '@material-ui/core';
import config from 'config/config.development';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import iconFile from 'images/iconos/file.png';
import withNotifier from 'components/HOC/withNotifier';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import { withHandlers } from 'recompose';
import OfficeImage from 'images/iconos/office.jpg'
import Actions from '../../../actions';
import { Container } from '../../../../ConfiguracionTicket/styledComponents';

const noop = () => undefined;
const styles = theme => ({
  vars: {
    'primary-color': '#427fe1',
    'secondary-color': '#fbfbfb',
    'tertiary-color': '#fff',
    'avatar-border-color': 'blue',
  },
  AgentBar: {
    Avatar: {
      size: '42px',
    },
    css: {
      backgroundColor: 'var(--secondary-color)',
      borderColor: 'var(--avatar-border-color)',
    },
  },
  Message: {
    css: {
      fontWeight: 'bold',
      color:'black',
    },
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: 'black',
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: 'gray',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#647882',
      color:'#4d6571',
    },
  },
  notchedOutline: {},
  button: {
    margin: theme.spacing.unit,
  },
  tr: {
    '&:hover': {
      WebkitFilter: 'grayscale(150%)',
      backgroundImage: `url(${<OfficeImage></OfficeImage>})`,
    },
  },
  
});

const FORM_HANDLERS = {}

const socket = socketIOClient(config.api.socketURL);

socket.on('connect', () => {
  //
});

// eslint-disable-next-line react/prefer-stateless-function
export class Chat extends React.Component{


  componentDidMount() {    
    const {
      // actions:{
      //   // getImagenAvatarAction,
      // },
      idTicketSelected, 
    } = this.props;
    // getImagenAvatarAction()

    socket.emit('obtenerMensajesChat',idTicketSelected,socket.id);
    socket.on('enviarMensajeChat',this.imprimeMensajesChat);
    
  }

  componentDidUpdate(prevProps){
    if (prevProps && (this.props.mensajesChat.length > prevProps.mensajesChat.length)) {
      this.chatRef.scrollTop = 10000; 
    }
  }

  imprimeMensajesChat = (response) => {
    const {
      actions:{
        setMensajesChatAction,
      },
    } = this.props;
    
    setMensajesChatAction(response);

  };


  render(){
    const {
      classes,
      onChangeTextFieldEscribirMensaje,
      onClickEnviarMensajeProxy,
      onClickEnviarMensajeModal,
      onUploadFile,
      onClickDownloadFile,
      chatMounted,
      handleClose,
      onChangeTextModal,
      mensajesChat,
      mensajeValue,
      idTicketSelected,
      openModal,
      valueTextModal,
      numUsuarioLogeado,
      nomUsuarioLogeado,
      estatusTicketSelected,
      tabSelected,
      imagenAvatar,
      indiceEtapa,
    } = this.props;
    this.state = {hovered: false};
    
    // eslint-disable-next-line no-unused-vars
    let nomBotonCerrar = "";
    let tipoJustificacion = "";
    let leyenda = "";

    switch (tabSelected) {
      case 0:
        nomBotonCerrar = "CANCELAR TICKET"
        tipoJustificacion='Razón de Cancelación'
        leyenda='Capture Razón'
        break;
      case 1:
        nomBotonCerrar = "CERRAR TICKET"
        tipoJustificacion='Solución'
        leyenda='Capture Solución'
        break;
      default:
        break;
    }

    
    const conditions = ["docx", "pdf", "xslx"];
    if (!chatMounted) return <div>Cargando comentarios</div>;
    return(
      <Paper
        style={
          {
            height:'100%',
            position:"inherit",
          }
        }
      >
        <Grid item md={12}>
          <Container flexDirection="column" >
            <Container
              id="chat"
              flexDirection="column"
              ref={(ins) => { this.chatRef = ins; }}
              style={{ 
                // backgroundColor: '#567382',
                overflow: 'auto',
                maxHeight: '67vh',
                minHeight: '52vh',
                padding:'10px',
                position:'inherit',
                // border: '#bcbcbc solid 1px',
              }}
            >
              <ThemeProvider>
                <div >
                  
                  {
                    mensajesChat.map((item,index)=>
                      <Grid
                        // eslint-disable-next-line react/no-array-index-key
                        key={`grid_message_${index}`}
                        container
                        {...item.IdEmisor === numUsuarioLogeado ?
                          {justify:'flex-end'} :
                          {justify:'flex-start'}
                        }
                      >
                        <MessageList 
                          active
                          style={{ 
                            padding:'0px',
                            marginBottom:'0px',
                          }}
                        >
                          <MessageGroup
                            style={{ marginBottom:'0px' }}
                          >
                            <Message 
                            >
                              <Container flexDirection="row" style={{ alignItems:"center" }}>
                                {/* {item.IdEmisor !== numUsuarioLogeado ?
                                  <Avatar
                                    imgUrl= {item.UrlImagenEmisor}
                                  >
                                  AF</Avatar>: null} */}

                                <Container flexDirection="column">
                                 
                                  <Paper
                                    style={{     
                                      backgroundColor: '#ffffff',
                                      fontSize: '11px',
                                      fontFamily: 'roboto',
                                      position:'inherit',
                                      ...((item.IdEmisor !== numUsuarioLogeado ?
                                        {
                                          marginLeft:'7px',
                                          borderRadius:'20px 12px 12px 0px',
                                          alignSelf:"flex-start",
                                        }:
                                        {
                                          alignSelf:"flex-end",
                                          marginRight:'7px',
                                          borderRadius:'12px 20px 0px 12px'}
                                      )),
                                    }}>
                                    {item.Mensaje && 
                                    <MessageText
                                      style = {{
                                        color:'#4d6571',
                                        fontSize:'14px',
                                      }}
                                    >{item.Mensaje}
                                    </MessageText>
                                    }
                                    
                                  </Paper>
                                  {item.ArchivoAdjunto !== '' && item.Emisor !== numUsuarioLogeado ? 
                                   
                                    <IconButton
                                      target='_blank'
                                      alt={item.NomArchivo}
                                      onClick={onClickDownloadFile(item.ArchivoAdjunto,item.NomArchivo)}
                                    >
                                      
                                      { <img
                                        src={conditions.some(el => item.ArchivoAdjunto.includes(el)) ? iconFile : item.ArchivoAdjunto }
                                        style={{ width:'40px',height: '40px'}}
                                        alt={item.NomArchivo}
                                        className={classes.tr}
                                      
                                      />}   
                                    </IconButton>
                                    : null  
                                  }
                                  <Typography
                                    variant="overline"
                                    align='right'
                                    style={{
                                      color:'#5b7988',
                                      fontSize:'9px',
                                    }}
                                  >
                                    {item.NomEmisor} : {item.Fecha.substring(0,10).concat(' ',item.Fecha.substring(19,11))}
                                  </Typography>

                                </Container>
                                {/* {item.IdEmisor === numUsuarioLogeado ?
                                  <Avatar
                                    imgUrl={imagenAvatar}
                                  ></Avatar>: null} */}
                                <Divider/>
                              </Container>
                              <Divider/>
                            </Message>
                          </MessageGroup>
                        </MessageList>
                      </Grid> 
                    )    
                  }
                </div>
              </ThemeProvider>
            </Container>
            <Grid
              container
              item
              md={12}
              style={{
                backgroundColor:'#ffffff',
                padding:'10px 10px',
                flexBasis: '0%',
                borderTop: 'solid 1px #cecece',
                position:'inherit',
                bottom:'0',
              }}
            >
              <Container 
                flexDirection="row"
                justify="space-between"
                style={{ 
                  alignItems:'center',
                }}
              >
                <input
                  // disabled={estatusTicketSelected !== 3}
                  accept="image/*"
                  style={{display: 'none'}}
                  id="contained-button-file"
                  onChange={onUploadFile}
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <IconButton 
                    variant="contained"
                    component="span"
                    //  disabled={estatusTicketSelected !== 3}
                  >
                    <Icon
                      style={{ color:'#fbbb3d'}}
                    >attach_file
                    </Icon>
                  </IconButton>
                </label>
                <TextField
                  fullWidth
                  // disabled={estatusTicketSelected !== 3}
                  className={classes.margin}
                  value={mensajeValue}
                  onChange={onChangeTextFieldEscribirMensaje}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  backgroundColor= '#2ca94e'
                  color= '#4d6571'
                  label="Escriba un Mensaje"
                  variant="outlined"
                  id="custom-css-outlined-input"
                />

                <IconButton
                  // disabled={estatusTicketSelected !== 3 }
                  aria-label="Enviar"
                  onClick={onClickEnviarMensajeProxy({
                    
                    IdTicket: idTicketSelected,
                    Mensaje: mensajeValue,
                    ArchivoAdjunto: "",
                    NomArchivo: "",
                    Emisor: numUsuarioLogeado,
                    NomEmisor: nomUsuarioLogeado,
                    UrlImagenEmisor: imagenAvatar,
                  },estatusTicketSelected
                  ,indiceEtapa)}
                >
                  <Icon
                    style={{ color:'#2ca94e'}}
                  >send</Icon>
                </IconButton>
              </Container>
              <Container flexDirection="row" justify='flex-end'>
                {/* BOTONES */}
                
              </Container>
            </Grid>
          </Container>
        </Grid>
      </Paper>
    );
  }
}

Chat.propTypes = {
  chatActions: T.shape({
    reqTicketsComentariosAction: T.func,
  }),
}

Chat.defaultProps = {
  chatActions: {
    reqTicketsComentariosAction: noop,
  },
}

const withActions = Actions.bindReduxStore();
let imagen = ""
export default compose(
  withActions,
  withStyles(styles),
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      //= ===========================[ EVENTOS DEL CHAT ]===================================
      onClickEnviarMensajeProxy: (obj,estatusTicketSelected,indiceEtapa) => () => {
        const actionId = 'APP/CONTAINER/PLANDETRABAJO/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION';        
        //  if (estatusTicketSelected === 3 && obj.Mensaje !=="" ||estatusTicketSelected === 3 &&  imagen !== "" ) {
        // mensajeValue.trim() === ''
        if (indiceEtapa !== undefined) {
          obj.indiceEtapa = indiceEtapa
        }
          
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION',
          data: obj,
          actionId,
          from: 'chat',
        })
        // }
      },
      
      
      onUploadFile: (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData()
        const archivosValidos = ['xlsx', 'xls', 'pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'];
        
        const ext = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase();
        const tamaño = files[0].size;

        const tamañoRequerido = 100 * 1048576;
        imagen = formData
        if (archivosValidos.includes(ext) && tamaño <= tamañoRequerido) {
          formData.append('files',files[0]);
          
          dispatch({
            type: 'APP/CONTAINER/PLANDETRABAJO/GUARDAR_IMG_ACTION',
            data: formData,
          });
        };
      },
      onClickDownloadFile:(ArchivoAdjunto,NomArchivo) => () => {
        
        axios({
          url: ArchivoAdjunto,
          method: 'GET',
          responseType: 'blob', // important
        }).then((response) => {

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${NomArchivo}`);
          document.body.appendChild(link);
          link.click();
          
        })
      }, 
      //= ================[ EVENTOS DEL MODAL ] ========================
      onClickEnviarMensajeModal: (obj,nuevoEstatus) => () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION',
          data: obj,
          from: 'modal',
          nuevoEstatus,
        });

      },
      cambiarEstatus: (idTicketSelected,status) => () => {

        const actionId = 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_ESTATUS_ACTION';

        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CAMBIAR_ESTATUS_ACTION',
          data: {
            IdTicket: idTicketSelected,
            IdEstatus: status,
          },
          actionId,
        })
        
      },
      onClickCancel: () => {
        const actionId = 'APP/CONTAINER/PLANDETRABAJO/OPEN_MODAL_ACTION';

        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/OPEN_MODAL_ACTION',
          data: true,
          actionId,
        })
      },
      handleClose: () => {
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CLOSE_MODAL_ACTION',
          data: false,
        })
      },
      onChangeTextModal: (event) => {
        
        dispatch({
          type: 'APP/CONTAINER/PLANDETRABAJO/CHANGE_TEXT_MODAL_ACTION',
          data: event.target.value,
        })
      },
    })
  ),

  withHandlers(FORM_HANDLERS),
  withNotifier,
)(Chat);
