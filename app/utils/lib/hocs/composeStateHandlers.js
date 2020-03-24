import _ from 'lodash';
import {
  compose,
  setDisplayName,
  mapProps,
  withStateHandlers,
} from 'recompose';

const UNIQUE_ID = `${_.uniqueId()}`; // IMPLICIT CAST TO STRING;
const noop = () => { };

const stateFormater = (props) => {
  const {
    keys: {
      state: keysState,
      handlers: keysHandlers,
    },
  } = props;
  const ommitedProps = [];
  const state = {};
  const handlers = {};
  keysState.forEach((skey) => {
    if (skey in props) {
      state[skey] = props[skey];
      ommitedProps.push(skey);
    }
  });
  keysHandlers.forEach((skey) => {
    if (skey in props) {
      handlers[skey] = props[skey];
      ommitedProps.push(skey);
    }
  });
  const cleanedProps = _.omit(props, [...ommitedProps, 'keys']);
  return {
    ...cleanedProps,
    state,
    handlers,
  };
}

const withPropKeys = (state, handlers) =>
  mapProps((props) => {
    const keys = { state: [], handlers: [] };
    if (!_.isPlainObject(state)
      && !_.isPlainObject(handlers)
    ) return { ...props, keys };
    keys.state = Object.keys(state);
    keys.handlers = Object.keys(handlers);
    return { ...props, keys };
  });
const withFormatedHandlers = mapProps(stateFormater);



export const composeStateHandler = (state = noop, handlers = {}, id = UNIQUE_ID) => {
  const HOCS = [
    setDisplayName('composeStateHandler'),
    // TODO 
  ];
  if (_.isFunction(state) && _.isPlainObject(handlers)) {
    HOCS.push(
      withPropKeys(state(), handlers),
      withStateHandlers(state, handlers),
      withFormatedHandlers,
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(`Error en ${id}: El estado o manejador proporcionado no son válidos`);
  }

  return compose(...HOCS);
}

export default composeStateHandler;
