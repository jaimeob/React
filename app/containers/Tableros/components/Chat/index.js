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
// import downloadImage from 'images/iconos/downloadImage.png'
// import Settings from '@material-ui/icons/cloudDownload';


import Actions from '../../actions';// eslint-disable-line
import { Container } from '../../../ConfiguracionTicket/styledComponents';


import ModalJustificacion from '../ModalJustificacion';


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
let socketCliente = ""
socket.on('connect', () => {
  //
  
});


// eslint-disable-next-line react/prefer-stateless-function
export class Chat extends React.Component{

  // componentWillUnmount () {
  //   socket.off('obtenerMensajesChat')
  //   socket.close() 
  // }

  componentDidMount() {
    // const action = this.props.ActionInsertar;
    
    const {
      idTicketSelected,
      // chatActions: {
      //    reqTicketsComentariosAction,
      // },
    } = this.props;
    // reqTicketsComentariosAction(idTicketSelected);
    socketCliente = socket.id
    
    socket.emit('obtenerMensajesChat',idTicketSelected,socket.id);
    socket.on('enviarMensajeChat',this.imprimeMensajesChat) ;
    
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
      // cambiarEstatus,
      // onClickCancel,
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
                maxHeight: '52vh',
                minHeight: '52vh',
                padding:'10px',
                position:'relative',
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
                            // backgroundColor:'#567382',
                            padding:'0px',
                            marginBottom:'0px',
                          }}
                        >
                          <MessageGroup
                            style={{ marginBottom:'0px' }}
                          >
                            <Message 
                              // authorName="Alexis"
                              // date="07-02-2019 04:20:04"
                            >
                              <Container flexDirection="row" style={{ alignItems:"center" }}>
                                {/* <Avatar
                                  imgUrl="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
                                >
                                  AF</Avatar> */}
                                {item.IdEmisor !== numUsuarioLogeado ?
                                  <Avatar
                                    imgUrl= {item.UrlImagenEmisor}
                                  >
                                  AF</Avatar>: null}
                                {/* {item.ArchivoAdjunto !== '' && item.IdEmisor !== numUsuarioLogeado ? 
                                  <Tooltip title = {item.NomArchivo}>
                                    <IconButton
                                      target='_blank'
                                      alt={item.NomArchivo}
                                      onClick={onClickDownloadFile(item.ArchivoAdjunto,item.NomArchivo)}
                                    >
                                      { <img
                                        src={iconFile}
                                        style={{ width:'25px',height: '25px'}}
                                        alt={item.NomArchivo}
                                      />}
                                    </IconButton>
                                  </Tooltip> : null  
                                } */}

                                <Container flexDirection="column">
                              
                                 
                                  <Paper
                                    style={{     
                                      // backgroundColor: '#ff9100',
                                      backgroundColor: '#ffffff',
                                      fontSize: '11px',
                                      fontFamily: 'inherit',
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
                                  {/* {item.ArchivoAdjunto !== '' && item.IdEmisor !== numUsuarioLogeado ? 
                                   
                                    <IconButton
                                      target='_blank'
                                      alt={item.NomArchivo}
                                      onClick={onClickDownloadFile(item.ArchivoAdjunto,item.NomArchivo)}
                                    

                                    >
                                      { <img
                                        src={item.ArchivoAdjunto.includes('docx') ? OfficeImage:item.ArchivoAdjunto }
                                        // // eslint-disable-next-line no-return-assign
                                        // onMouseOver={e => (e.currentTarget.src = downloadImage)}
                                        // // eslint-disable-next-line no-return-assign
                                        // onMouseLeave={e => (e.currentTarget.src = item.ArchivoAdjunto)}
                                        style={{ width:'200px',height: '120px'}}
                                        alt={item.NomArchivo}
                                        className={classes.tr}
                                      
                                      />}
                                    </IconButton>
                                    : null  
                                    // <ImageUpload item.ArchivoAdjunto />:null
                                  } */}

                                  {item.ArchivoAdjunto !== '' && item.Emisor !== numUsuarioLogeado ? 
                                   
                                    <IconButton
                                      target='_blank'
                                      alt={item.NomArchivo}
                                      onClick={onClickDownloadFile(item.ArchivoAdjunto,item.NomArchivo)}
                                    

                                    >
                                      
                                      {/* item.ArchivoAdjunto.includes(['docx','pdf' )
                                      conditions.some(el => str1.includes(el)); */}
                                      { <img
                                        src={conditions.some(el => item.ArchivoAdjunto.includes(el)) ? iconFile : item.ArchivoAdjunto }
                                        // // eslint-disable-next-line no-return-assign
                                        // onMouseOver={e => (e.currentTarget.src = downloadImage)}
                                        // // eslint-disable-next-line no-return-assign
                                        // onMouseLeave={e => (e.currentTarget.src = item.ArchivoAdjunto)}
                                        style={{ width:'40px',height: '40px'}}

                                        
                                        alt={item.NomArchivo}
                                        className={classes.tr}
                                      
                                      />}   
                                    </IconButton>
                                    : null  
                                    // <ImageUpload item.ArchivoAdjunto />:null
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
                                
                                {/* {item.ArchivoAdjunto !== '' && item.IdEmisor === numUsuarioLogeado ? 
                                  <IconButton
                                    target='_blank'
                                    onClick={onClickDownloadFile(item.ArchivoAdjunto,item.NomArchivo)}
                                  >
                                    { <img
                                      src={iconFile}
                                      style={{ width:'25px',height: '25px'}}
                                      alt="logo-xls"
                                    />}
                                  </IconButton>
                                  : null  
                                } */}
             
                                {item.IdEmisor === numUsuarioLogeado ?
                                  <Avatar
                                    // imgUrl = 'http://192.168.8.210:1337/uploads/alexis.felix.jpg'
                                    imgUrl={imagenAvatar}
                                  ></Avatar>: null}
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
                position:'absolute',
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
                  disabled={estatusTicketSelected !== 3}
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
                    disabled={estatusTicketSelected !== 3}
                  >
                    <Icon
                      style={{ color:'#fbbb3d'}}
                    >attach_file
                    </Icon>
                  </IconButton>
                </label>
                <TextField
                  fullWidth
                  disabled={estatusTicketSelected !== 3}
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
                  disabled={estatusTicketSelected !== 3 }
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

                {/* {(estatusTicketSelected !== 2 && estatusTicketSelected !== 3)
                  ?
                  null
                  :
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={onClickCancel}
                  >
                    {nomBotonCerrar}
                  </Button>
                }
                
                {estatusTicketSelected === 2 && tabSelected ===1
                  ?<Button 
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={cambiarEstatus(idTicketSelected,3)}
                  > 
                    Iniciar Seguimiento
                  </Button>
                  : null} */}
                
              </Container>
            </Grid>
          </Container>
        </Grid>
        <Container
        >
          <ModalJustificacion
            handleClose={handleClose}
            onChangeTextModal={onChangeTextModal}
            onUploadFile={onUploadFile}
            onClickEnviarMensajeModal={onClickEnviarMensajeModal}

            open={openModal}
            tipoJustificacion={tipoJustificacion}
            leyenda={leyenda}
            valueTextModal={valueTextModal}
            idTicketSelected={idTicketSelected}
            numUsuarioLogeado={numUsuarioLogeado}
            nomUsuarioLogeado={nomUsuarioLogeado}
            imagenAvatar={imagenAvatar}
            tabSelected={tabSelected}
          />
        </Container>
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
        const actionId = 'APP/CONTAINER/TABLEROS/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION';        
        if (estatusTicketSelected === 3 && obj.Mensaje !=="" ||estatusTicketSelected === 3 &&  imagen !== "" ) {
          // mensajeValue.trim() === ''
          if (indiceEtapa !== undefined) {
            obj.indiceEtapa = indiceEtapa
          }
          
          dispatch({
            type: 'APP/CONTAINER/TABLEROS/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION',
            data: obj,
            actionId,
            from: 'chat',
          })
        }
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
            type: 'APP/CONTAINER/TABLEROS/GUARDAR_IMG_ACTION',
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
          
          // const tipo = response.config.url.split('.')[4];
          // const nomTipo = response.config.url.split('/')[4].split('.')[0];
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
          type: 'APP/CONTAINER/TABLEROS/REQ_POST_INSERT_TICKETS_COMENTARIOS_ACTION',
          data: obj,
          from: 'modal',
          nuevoEstatus,
        });

        
        

      },
      cambiarEstatus: (idTicketSelected,status) => () => {

        const actionId = 'APP/CONTAINER/TABLEROS/CAMBIAR_ESTATUS_ACTION';

        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CAMBIAR_ESTATUS_ACTION',
          data: {
            IdTicket: idTicketSelected,
            IdEstatus: status,
          },
          actionId,
        })
        
      },
      onClickCancel: () => {
        const actionId = 'APP/CONTAINER/TABLEROS/OPEN_MODAL_ACTION';

        dispatch({
          type: 'APP/CONTAINER/TABLEROS/OPEN_MODAL_ACTION',
          data: true,
          actionId,
        })
      },
      handleClose: () => {
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CLOSE_MODAL_ACTION',
          data: false,
        })
      },
      onChangeTextModal: (event) => {
        
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/CHANGE_TEXT_MODAL_ACTION',
          data: event.target.value,
        })
      },
    })
  ),
  withHandlers(FORM_HANDLERS),
  withNotifier,
)(Chat);
