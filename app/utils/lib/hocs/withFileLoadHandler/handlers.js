import { assign } from "lodash";
// archivo con los manejadores del estado del archivo
export const updateFileState = ({ setFile }) => (nextFileState) =>
  setFile(file => assign({}, file, nextFileState));

export default updateFileState;

