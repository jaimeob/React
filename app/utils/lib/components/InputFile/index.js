import React from 'react';
import {
  uniqueId,
  isNull,
} from 'lodash';
import types from 'prop-types';
const InputFile = ({
  id,
  children,
  // eslint-disable-next-line react/prop-types
  openFileEventHandler,
  style,
  // eslint-disable-next-line no-unused-vars
  accepts,
}) => {
  if (isNull(children)) {
    return (
      <input
        type="file"
        id={id}
        multiple
        onChange={openFileEventHandler}
        style={style}
      />
    );
  }
  return (
    <div>
      <input
        type="file"
        id={id}
        multiple
        onChange={openFileEventHandler}
        style={{ display: 'none' }}
        accept={accepts}
      />
      <label htmlFor={id}>
        {children}
      </label>
    </div>
  );
  
}

const uniqueFileId = uniqueId('file_');
InputFile.propTypes = {
  id: types.string,
  children: types.element,
  style: types.object,
  // hiddenLabel: types.bool,
  accepts: types.string,
  openFileEventHandler: types.func,
}
InputFile.defaultProps = {
  id: uniqueFileId,
  children: null,
  // hiddenLabel: true,
  style: {},
  accepts: '*/*',
}

export default InputFile;
