import React, { useEffect,useRef } from 'react';
import { useAnimateKeyframes } from "react-simple-animate";
import T from 'prop-types';
import Notificacion from '../Notificaciones/Notificaciones';



function App(props) {
  const {
    notificaciones,
    animarNotificacion,
    numUsuarioLogeado,
    cambiarEstatusNotificacionAction,
    obtenerNotificacionesAction,
    idDepartamentoLogeado, 
  } = props;
  
  const { play, style, isPlaying} = useAnimateKeyframes({
    iterationCount: 15,
    direction: "normal",
    duration: 0.3,
    keyframes: [
      "transform-origin: top center",
      // "animation-timing-function: linear",
      "transform: rotateZ(-0.7rad)",
      "transform: rotateZ(1.0rad)",
      // "transform: rotateZ(0.50turn)",
    ],
  });

  // useEffect(() => {
  //   console.log(isPlaying,'actual is playing (efect)')
  //   console.log(animarNotificacion,'animar notificacion (efect) ')

  //   if(animarNotificacion){
  //     play(animarNotificacion)
  //   }
  // }, [isPlaying]);
  // Esta funcion deberia lograr que cada cierto tiempo se vuelva a ejecutar
  // setInterval(function(){ useEffect()}, 3000)

  // Codigo para que se este repitiendo
  useInterval(() => {
    
    // console.log(isPlaying,'actual is playing (intervalo)')
    // console.log(animarNotificacion,'animar notificacion (intervalo) ')
    if(animarNotificacion){
      if (isPlaying) {
        play(!animarNotificacion)
      }else{
        play(animarNotificacion)
      }
      
      
    }
  }, 5000);
  
  function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Aqui se haplica el efecto
    // eslint-disable-next-line consistent-return
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  return (  
  // <NotificationsIcon style={style} />
    
    <Notificacion 
      style={style} 
      notificaciones={notificaciones} 
      numUsuarioLogeado = {numUsuarioLogeado}
      cambiarEstatusNotificacionAction = {cambiarEstatusNotificacionAction}
      obtenerNotificacionesAction = {obtenerNotificacionesAction}
      idDepartamentoLogeado = {idDepartamentoLogeado}
    >
    </Notificacion>
  );
}

App.propTypes = {
  animarNotificacion: T.bool,
  cambiarEstatusNotificacionAction: T.func,
  notificaciones:T.array,
  numUsuarioLogeado: T.number,
  obtenerNotificacionesAction: T.func,
  idDepartamentoLogeado: T.number,
};

export default App;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
