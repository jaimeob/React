/**
 *
 * withFileLoadHandler
 * 
 * Programador: Jesús Erubiel Apodaca Soto
 * Descripción: crea un manejador de eventos para la carga de archivos
 * dinámicos, realizando dicha acción de forma más sencilla.
 */

import React from "react";
import PropTypes, { noop } from "prop-types";
import { getDisplayName, withState, compose, withHandlers } from "recompose";
import { isFunction, assign } from "lodash";
import fileHandler from './handlers'; 
import initFileState from "./state";

const withFileLoadHandler = InputFileBase => {
  class WithFileLoadHandler extends React.Component {
    // eslint-disable-line
    static displayName = `withFileLoadHandler(${getDisplayName(
      InputFileBase
    )})`;

    constructor(props) {
      super(props);
      // eslint-disable-next-line no-shadow
      const { updateFileState, setFile } = props;
      this.transformMethod = {
        buffer: "readAsArrayBuffer",
        url: "readAsDataURL",
      };
      this.state = {
        fileReader: (() => {
          const fileReader = new FileReader();
          fileReader.onload = (file) => {
            // TODO: Agrgear validaciones por tipo de archivos
            const data = fileReader.result;
            const nextState = { buffer: data, success: true, isLoading: false, file };
            setFile(f => {
              const nextFile = assign(f, nextState);
              this.afterLoad(nextFile);
              return nextFile;
            });
          };
          fileReader.onabort = () => {
            updateFileState(initFileState);
          };
          fileReader.onloadstart = () => {
            updateFileState({ isLoading: true });
          };
          fileReader.onerror = e => {
            updateFileState({
              error: e,
              success: false,
            });
          };
          return fileReader;
        })(),
      };
    }

    openFileEventHandler = ({ target }) => {
      const { fileReader } = this.state;
      // eslint-disable-next-line no-shadow
      const { updateFileState, transform, createWebUrl } = this.props;
      // Por el momento, se asume que solo se permite seleccionar un solo archivo.
      const file = target.files[0];
      const url = createWebUrl ?  window.URL.createObjectURL(target.files[0]) : '';
      // const localImageUrl =  window.URL.createObjectURL(files[0]);
      if (file) {
        updateFileState({
          name: file.name,
          size: file.size,
          type: file.type,
          url,
          event: file, 
        });
        const transformMethod = this.transformMethod[transform];
        if (Object.keys(this.transformMethod).includes(transform)) {
          fileReader[transformMethod](file); 
        }
      }
    };

    afterLoad = newFile => {
      const { afterOnload } = this.props;
      if (isFunction(afterOnload)) {
        afterOnload(newFile);
      }
    };

    render() {
      const { fileReader } = this.state;
      const props = Object.assign({}, this.props, {
        fileReader,
        openFileEventHandler: this.openFileEventHandler,
      });
      return <InputFileBase {...props} />;
    }
  }

  WithFileLoadHandler.propTypes = {
    setFile: PropTypes.func,
    updateFileState: PropTypes.func,
    afterOnload: PropTypes.func,
    transform: PropTypes.oneOf(["buffer", "url", ""]),
    createWebUrl: PropTypes.bool,
    onValidateFile: PropTypes.any,
  };
  WithFileLoadHandler.defaultProps = {
    transform: '',
    setFile: noop,
    updateFileState: noop,
    afterOnload: noop,
    createWebUrl: false,
    onValidateFile: null,
  };

  return compose(
    withState("file", "setFile", initFileState),
    withHandlers({
      updateFileState: fileHandler,
    })
  )(WithFileLoadHandler);
};

export default withFileLoadHandler;
