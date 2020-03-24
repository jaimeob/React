import React from 'react';
/**
 * Componentes de Alto Orden tienen un patró de estructura del ćodigo de reactJS, 

Para que un HOC sea una HOC, se debe de respetar ESTRICAMENTE las siguientes reglas.

1.- un High Order Component (HOC) es SIEMPRE UNA FUNCION (!!IMPORTANTE), que recibe como parametro un componente.
2.- un HOC siempre debe devolver el mismo componente enviado con nuevas propiedades.
3.- al HOC no se le deben de eliminar propiedades ni hacer cambios al mismo componente enviado, unicamente se le podra
    añadir nuevas propiedades.


 * 
 */


import moment from 'moment';

export const withLogger = ({ debug = false }) => (Componente) => {
  class OtroComponente extends React.Component {
    state = {
      log: [],
    }

    logger = (el) => {
      const date = new Date;
      const fecActual = moment(date).format('DD/MM/YYYY');
      const logStringHeader = `---------------------------------------
      ${debug ? `
      [Fecha: ${fecActual}]
      [Tipo dato: ${typeof(el)}]
      [Componente: ${Componente.displayName || this.props.location.pathname}]
      [ruta: ${this.props.location.pathname}]
      ` : ''}`;
      const logStringFooter = `---------------------------------------
      `;
      // eslint-disable-next-line no-console
      console.log(logStringHeader)
      // eslint-disable-next-line no-console
      console.log(el)
      // eslint-disable-next-line no-console
      console.log(logStringFooter)
      // this.setState((state) => {
      //   return {
      //     log: [
      //       ...state.log,
      //       `${logStringHeader}
      //        ${logStringFooter}
      //       `,
      //     ],
      //   };
      // })
    }

    render() {
      const newprops = Object.assign({}, this.props, {
        log: this.logger,
        logStack: this.state.log,
      })
      return <Componente {...newprops} />
    }
  }
  OtroComponente.displayName = 'WithLogger';
  return OtroComponente;
}

export default withLogger;
