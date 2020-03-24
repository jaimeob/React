/**
 * PROGRAMADOR: JESUS ERUBIEL APODACA SOTO
 * 
 */
import _ from "lodash";
import {
  bindActionCreators,
} from 'redux';
import {
  connect,
} from 'react-redux';
import {
  setDisplayName,
  compose,
} from 'recompose';
const options = {
  prefix: "",
  subfix: "",
};

const getOptions = (prms) =>
  _.assign({}, options, prms);

export const bindDispActionFormater = (key, {
  action = '',
  /* eslint-disable-next-line no-unused-vars */
  prefix = '',
  subfix = '',
}) =>
  _.camelCase(`${action}${subfix}`); 

export const ActionsGenerator = function ActionsGenerator(prms = options) {
  this.options = getOptions(prms);
  this.prefix = this.options.prefix;
  this.subfix = this.options.subfix;
  this.constants = new Map();
  this.actions = new Map();
  this.name = function actionName(name = "") {
    const self = this;
    const id = `${this.prefix}${name}${this.subfix}`;
    const obj = {};
    if (!this.actions.get(name)
      && !this.constants.get(name)) {
      this.constants.set(name, id);
    }
    obj.set = function setAction(cb) {
      const fn = cb(id);
      if (_.isFunction(fn)) {
        self.actions.set(name, {
          id,
          fn,
        });
      }
    };
    return obj;
  };
  this.getAll = function getAllActions(cb = null) {
    const self = this;
    // const formaters = {
    //   fullName: () => 
    // }
    const actions = {};
    let prop = '';
    let cbArgs;
    this.actions.forEach((val, key) => {
      cbArgs = {
        action: key,
        prefix: self.prefix,
        subfix: self.subfix,
      }
      prop = _.isFunction(cb) ? cb(key, cbArgs) : key;
      actions[prop] = val.fn;
    });
    return actions;
  };
  // this.toCamelCase = function toCamelCase() {
  //   this.actions.forEach((val, key, act) => )
  // }
  this.get = function getAction(actionName = "") {
    const act = this.actions.get(actionName);
    return act;
  };
  this.getActionName = function getActionName(name = '') {
    const act = this.actions.get(name);
    return act.id || '';  
  }
  this.getConstants = function getConstants(keys = []) {
    const CONSTANTS = {};
    let temp;
    const iterateOverKeys = (key) => {
      temp = this.constants.get(key);
      if (!temp) temp = `__ACTION_NOT_FOUNDED__`;
      CONSTANTS[key] = temp;
    }
    const iterateOverMap = (value, key) => {
      CONSTANTS[key] = value;
    }
    
    if (!keys.length) {
      this.constants.forEach(iterateOverMap);
      return CONSTANTS;      
    } 
    keys.forEach(iterateOverKeys)
    return CONSTANTS;
  }
  this.bindReduxStore = function bindReduxStore(cb = _.noop) {
    const actions = this.getAll(bindDispActionFormater);
    const mapDispatchToProps = (dispatch, props) => {
      // console.log('actions IN bindReduxStore', actions)
      const ACTIONS = bindActionCreators(actions, dispatch);
      // console.log('ACTIONS IN bindReduxStore', ACTIONS)
      return {
        actions: ACTIONS,
        ...(cb(dispatch, ACTIONS, props) || {}),
      }
    };
    return compose(
      setDisplayName('bindReduxStore'),
      connect(
        null,
        mapDispatchToProps, 
      ),
    )
  }
  this.getActionsBySubfix = function getActionsBySubfix() {
    // TODO: Obtener las acciones dependiendo del subfijo
  }
}

export default ActionsGenerator;
