import lower from 'lodash/toLower';
import isObject from 'lodash/isPlainObject';
import _ from 'lodash'
import isUndefined from './isUndefined';
const defaultOptions = {
  defaultData: [],
  exact: false,
}

const getDefaults = (obj) => isObject(obj) ? Object.assign({}, defaultOptions, obj) : defaultOptions;

export default function filtrar(arr = [], valor = '', options = defaultOptions) {
  const {
    defaultData = [],
    exact = false,
  } = getDefaults(options);
  if (!valor) return defaultData || [];
  const filtrados = arr.slice().map((item) => {
    
    let isValidItem = false;
    const itemProps = Object.keys(item);
    itemProps.forEach(prop => {
      if(prop === 'nombre' || prop === 'empleados' || prop === 'departamentos' || prop === "createdAt" ){
        if(prop === 'createdAt')
          item[prop] = item[prop].toString().substring(0,10)
        const valProp = !exact ? lower(_.isObject(item[prop]) ? item[prop].nombre.toString() : item[prop].toString()) : item[prop].toString();
        const formatedVal = !exact ? lower(valor) : valor;
        if (valProp.indexOf(formatedVal) >= 0) {
          isValidItem = true;
        }
      }
  
    })
    return isValidItem ? item : undefined;
  });
  return filtrados.filter((item) => !isUndefined(item));
  
}

// export default function filtrar(arr = [], valor = '', options = defaultOptions) {
//   const {
//     defaultData = [],
//     exact = true,
//   } = getDefaults(options);
//   if (!valor) return defaultData || [];
//   const filtrados = arr.slice().map((item) => {
    
//     let isValidItem = false;
//     const itemProps = Object.keys(item);
//    // console.log(itemProps,'itemProps')
//     itemProps.forEach(prop => {
//       // console.log("filtrarArreglo itemmmmm",prop )
//       const valProp = !exact ? lower(item[prop].toString()) : item[prop].toString();
//       // console.log(valProp,"valProp")
//       const formatedVal = !exact ? lower(valor) : valor;
//       if (valProp.indexOf(formatedVal) >= 0) {
//         isValidItem = true;
//       }
//     })
    
//     // console.log("filtrarArr eglo itemmmmm",item )
//     return isValidItem ? item : undefined;
//   });
// //  console.log("isUndefined" )
//   return filtrados.filter((item) => !isUndefined(item));
// }
