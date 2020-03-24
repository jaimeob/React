/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// import _ from "lodash";
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isBuffer from 'lodash/isBuffer';
import isSymbol from 'lodash/isSymbol';
import isDate from 'lodash/isDate';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import isInteger from 'lodash/isInteger';
import isUndefined from 'lodash/isUndefined';
import conformsTo from 'lodash/conformsTo';
import omit from 'lodash/omit';
const VALIDATOR = {
  types: {
    function: isFunction,
    string: isString,
    number: isNumber,
    buffer: isBuffer,
    symbol: isSymbol,
    date: isDate,
    array: isArray,
    object: isPlainObject,
    integer: isInteger,
  },
  keys() {
    return Object.keys(
      omit(this.types, ['keys'])
    );
  },
  getValidator(type = '') {
    return this.types[type] || undefined;
  },
};
export const isValidSchema = (
  obj = {},
  shape = {},
  {
    message = 'Invalid shape!',
    requiredAll = false,
  } = {}
) => {
  const formatedShape = {};
  let key;
  let validShape = false;
  let isValidObj = true;
  // eslint-disable-next-line no-restricted-syntax
  for (key in shape) {
    if (Object.hasOwnProperty.call(shape, key)) {
      const value = shape[key] || '';
      const fnValidator = VALIDATOR.getValidator(value); // get(VALIDATOR, PATH, null)
      if (isFunction(fnValidator)) {
        formatedShape[key] = fnValidator;
      }
      if (requiredAll) {
        if (isUndefined(obj[key])) {
          isValidObj = false;
          // eslint-disable-next-line no-console
          console.log(`(Restricted) Key [${key}] not defined in object: `, obj);
          // eslint-disable-next-line no-console
          console.log(`Keys must match with the given schema definition: `, shape);
          break;
        }
      }
    }
    if (!isValidObj) return isValidObj
    validShape = conformsTo(obj, formatedShape);
    // eslint-disable-next-line no-console
    if (!validShape) console.log(message);
  }
    
  return validShape;
};

export default isValidSchema;

/*

const persona = {
  nombre: 'Erubiel',
  apellidoPaterno: 'Apodaca',
  apellidoMaterno: '',
  edad: 25,
};

const objectShapes = {
  nombre: 'string',
  apellidoPaterno: 'string',
  apellidoMaterno: 'string',
  edad: 'number',
  sumar: 'func'
};
isValidSchema(persona, objectShapes, { requiredAll: true });

 */