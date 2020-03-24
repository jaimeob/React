import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { useAnimateKeyframes } from "react-simple-animate";
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import "./styles.css";

function App({animarNotificacion}) {

  const { play, style, isPlaying,pause} = useAnimateKeyframes({
    iterationCount: 15,
    direction: "normal",
    duration: 0.2,
    keyframes: [
      "transform: rotateZ(0)",
      "transform: rotateZ(-0.7rad)",
      "transform: rotateZ(0.7rad)",
      // "transform: rotateZ(0.50turn)",
    ],
  });

  useEffect(() => {
    if(!animarNotificacion){
      pause(!animarNotificacion)
    }
    setInterval(() => { play(isPlaying)}, 3000)    
  }, [isPlaying]);
  // Esta funcion deberia lograr que cada cierto tiempo se vuelva a ejecutar
  // setInterval(function(){ useEffect()}, 3000)
  return (  
    <NotificationsIcon style={style} />
  );
}

export default App;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
