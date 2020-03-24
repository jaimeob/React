import React from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";
import fileHandler from "../../hocs/withFileLoadHandler";
import InputFile from "../InputFile";

export const UploadFile = ({
  id = uniqueId('file_'),
  openFileEventHandler,
  file,
  loadingComponent,
  children,
  ...rest
}) => {
  const fileInput = (
    <InputFile openFileEventHandler={openFileEventHandler} id={id} {...rest}>
      {children}
    </InputFile>
  );
  return file.isLoading && loadingComponent ?
    loadingComponent : fileInput;
};
UploadFile.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  openFileEventHandler: PropTypes.func,
  handleLoadFile: PropTypes.func,
  loadingComponent: PropTypes.element,
  children: PropTypes.element,
  createWebUrl: PropTypes.bool,
};
UploadFile.defaultProps = {
  id: uniqueId("file_"),
  label: "",
  openFileEventHandler: PropTypes.noop,
  handleLoadFile: PropTypes.noop,
  children: null,
  loadingComponent: <div>Cargando archivo</div>,
  createWebUrl: false,
};
export default fileHandler(UploadFile);
